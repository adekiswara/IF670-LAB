import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { ban, banSharp, create, trash } from "ionicons/icons";
import { useRef } from "react";

export const FRIENDS_DATA = [
    {id: 'f1', name: 'John Thor' },
    {id: 'f2', name: 'John Ness' },
    {id: 'f3', name: 'John Doe' }
];

const Meet: React.FC = () => {
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    
    const callFriendHandler = () => {
        console.log("Calling...");
    };
    
    const blockFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Blocking...");
    };

    const editFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Editing...");
    };

    const deleteFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Deleting...")
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Meet</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton />                        
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonList>
                    {FRIENDS_DATA.map(friend => (
                    <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                        <IonItemOptions side="start">
                            <IonItemOption color="danger" onClick={blockFriendHandler}>
                                <IonIcon slot="icon-only" icon={ban} />
                            </IonItemOption>
                            <IonItemOption color="warning" onClick={deleteFriendHandler}>
                                <IonIcon slot="icon-only" icon={trash} />
                            </IonItemOption>
                        </IonItemOptions>
                        <IonItemOptions side="end">
                            <IonItemOption color="warning" onClick={editFriendHandler}>
                                <IonIcon slot="icon-only" icon={create} />
                            </IonItemOption>
                        </IonItemOptions>
                        <IonItem lines="full" button onClick={callFriendHandler}>
                            <IonAvatar>
                                <IonImg src={`https://avatars.dicebear.com/api/miniavs/${friend.id}.svg`} alt={`${friend.name}`} />
                            </IonAvatar>
                            <IonLabel>{friend.name}</IonLabel>
                        </IonItem>
                    </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Meet;