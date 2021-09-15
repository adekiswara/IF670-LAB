import React from 'react';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonRow } from '@ionic/react';

const BmiResult: React.FC<{
    result: number,
    description: string
}> = (props) => (
    <IonRow>
        <IonCol>
            <IonCard className="ion-padding-vertical">
                <IonCardContent className="ion-text-center">
                <IonCardSubtitle>{props.result.toFixed(2)}</IonCardSubtitle>
                <IonCardTitle>{props.description}</IonCardTitle>
                </IonCardContent>
            </IonCard>
        </IonCol>
    </IonRow>
);

export default BmiResult;