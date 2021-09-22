import React from 'react';
import { IonCard, IonCardContent, IonCol, IonRow } from '@ionic/react';
import './BmiResult.css';

const BmiResult: React.FC<{
    result: number,
    description: string
}> = (props) => {

    if (!props.result) {
        return null;
    }
    
    const cardColor = () => {
        switch (props.description) {
        case 'Normal':
            return 'ion-card-success';
        case 'Gemuk':
        case 'Kurus':
            return 'ion-card-warning';
        case 'Obesitas':
            return 'ion-card-danger';
        }
    };

    return (
        <IonRow>
            <IonCol>
                <IonCard id="result" className={cardColor()}>
                    <IonCardContent className="ion-text-center">
                        <h2>{props.result.toFixed(2)}</h2>
                        <h1>{props.description}</h1>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
};


export default BmiResult;