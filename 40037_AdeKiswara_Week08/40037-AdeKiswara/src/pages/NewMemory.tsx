import React, { useContext, useRef, useState } from "react";
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { camera } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { base64FromPath } from '@ionic/react-hooks/filesystem';
import { useHistory } from "react-router";
import MemoriesContext from "../data/memories-context";
import './NewMemory.css'

const NewMemory: React.FC = () => {
    const [takenPhoto, setTakenPhoto] = useState<{
        path: string | undefined; // will store original URL
        preview: string // will store preview URL for web
    }>();

    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');

    const titleRef = useRef<HTMLIonInputElement>(null);
    const memoriesCtx = useContext(MemoriesContext);
    const history = useHistory();

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        console.log(photo);

        if(!photo || /*!photo.path ||*/ !photo.webPath) {
            return;
        }

        setTakenPhoto({
            path: photo.path,
            preview: photo.webPath,
        });
    };    

    const addMemoryHandler = async () => {
        const enteredTitle = titleRef.current?.value;
        if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType) {
            return;
        }

        const fileName = new Date().getTime() + '.jpeg';
        const base64 = await base64FromPath(takenPhoto!.preview);
        await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: Directory.Data
        });

        memoriesCtx.addMemory(fileName, base64, enteredTitle.toString(), chosenMemoryType);
        history.length > 0 ? history.goBack() : history.replace('/good')
    };

    const selectMemoryTypeHandler = (event: CustomEvent) => {
        const selectedMemoryType = event.detail.value;
        setChosenMemoryType(selectedMemoryType);
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>New Memory</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Memory Title</IonLabel>
                                <IonInput type="text" ref={titleRef} />
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Memory Type</IonLabel>
                                    <IonSelect value={chosenMemoryType} onIonChange={selectMemoryTypeHandler}>
                                    <IonSelectOption value="good">Good Memory</IonSelectOption>
                                    <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-text-center">
                        <IonCol>
                            <div className="image-preview">
                                {!takenPhoto && <h3>No photo choosen.</h3>}
                                {takenPhoto && <img src={takenPhoto.preview} alt="preview" />}
                            </div>
                            <IonButton fill="clear" onClick={takePhotoHandler}>
                                <IonIcon slot="start" icon={camera} />
                                <IonLabel>Take Photo</IonLabel>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-margin-top">
                        <IonCol className="ion-text-center">
                            <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default NewMemory;