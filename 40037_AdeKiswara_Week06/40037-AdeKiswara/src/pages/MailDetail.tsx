import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router";
import { MAIL_DATA } from "./Mail";

const MailDetail: React.FC = () => {
    const mId = useParams<{mailId: string}>().mailId;
    const selectedMail = MAIL_DATA.find(m => m.id === mId);
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" >
                        <IonTitle>
                            {selectedMail ? selectedMail?.subject : 'No mail found'}
                        </IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>Mail ID: {mId}</h2>
            </IonContent>
        </IonPage>
    );
}

export default MailDetail;