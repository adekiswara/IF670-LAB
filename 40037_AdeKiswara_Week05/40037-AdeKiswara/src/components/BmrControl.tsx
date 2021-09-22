import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import React from 'react';

const BmrControl: React.FC<{
    onCalculate: () => void,
    onReset: () => void
}> = (props) => (
<IonRow>
    <IonCol className="ion-text-left">
        <IonButton onClick={props.onCalculate}>
            <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
            Calculate
            </IonButton>
        </IonCol>
        <IonCol className="ion-text-right">
            <IonButton onClick={props.onReset}>
                <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                Reset
            </IonButton>
        </IonCol>
    </IonRow>
);

export default BmrControl;