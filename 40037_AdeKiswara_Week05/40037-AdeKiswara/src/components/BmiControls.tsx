import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react';
import { attachProps } from '@ionic/react/dist/types/components/utils';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import React from 'react';

const BmiControls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => {
    return (
        <IonRow>
            <IonCol size="12" size-md="6" className="ion-text-center">
                <IonButton expand="block" color="success" onClick={props.onCalculate}>
                    <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol size="12" size-md="6" className="ion-text-center">
                <IonButton fill="clear" color="medium" onClick={props.onReset}>
                    <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>        
    );
};

export default BmiControls;