import React, { useContext } from "react";
import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react"
import { addOutline } from "ionicons/icons";
import MemoriesContext from "../data/memories-context";
import MemoryItem from "../components/MemoryItem";

const GoodMemories: React.FC = () => {
    const memoriesCtx = useContext(MemoriesContext);
    const goodMemories = memoriesCtx.memories.filter(memory => memory.type === 'good');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Good Memories</IonTitle>
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
                {/* <IonGrid>
                    {goodMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No good memories found.</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {goodMemories.map(memory => (
                        <IonRow key={memory.id}>
                            <IonCol>
                                <IonCard>
                                    <img src={memory.base64Url} alt={memory.title} />
                                    <IonCardHeader>
                                        <IonCardTitle>{memory.title}</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>*/}
                <MemoryItem type="good" />
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

export default GoodMemories;