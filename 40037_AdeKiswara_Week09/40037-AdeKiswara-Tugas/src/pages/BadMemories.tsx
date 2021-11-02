import React, { useContext } from "react";
import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { isPlatform } from "@ionic/core";
import { addOutline } from "ionicons/icons";
import MemoriesContext from "../data/memories-context";
import MemoryItem from "../components/MemoryItem";

const BadMemories: React.FC = () => {
    const memoriesCtx = useContext(MemoriesContext);
    const badMemories = memoriesCtx.memories.filter(memory => memory.type === 'bad');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Bad Memories</IonTitle>
                    {!isPlatform('android') && (
                        <IonButtons slot="end">
                            <IonButton routerLink="new">
                                <IonIcon icon={addOutline} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>            
            </IonHeader>
            <IonContent>
                <MemoryItem type="bad" />
                {isPlatform('android') && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton color="secondary" routerLink="/new">
                            <IonIcon icon={addOutline} />
                        </IonFabButton>
                    </IonFab>
                )}
            </IonContent>
        </IonPage>
    );
};

export default BadMemories;