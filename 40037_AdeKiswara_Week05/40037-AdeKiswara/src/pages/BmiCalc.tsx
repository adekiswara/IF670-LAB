import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonCol, IonContent, IonCard, IonGrid, IonHeader, IonInput, IonRouterOutlet, IonRow, IonToolbar, IonTitle, IonItem, IonLabel, IonIcon, IonCardContent, IonCardTitle, IonCardSubtitle, IonAlert, IonPage } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';

import InputControl from '../components/InputControl';
import BmiControls from '../components/BmiControls';
import BmiResult from '../components/BmiResult';

const BmiCalc: React.FC = () => {
    const [ calculatedBMI, setCalculatedBMI ] = useState<number>();
    const [ description, setDesciption ] = useState<string>();
    const [ error, setError ] = useState<string>();
    const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);

    const calculateBMI = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;

        if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
        setError( 'Please enter a valid (non-negative) input number');
        return;
        }

        const weightConversion = calcUnits === 'cmkg' ? 1 : 2.2;
        const heightConversion = calcUnits === 'cmkg' ? 1 : 0.0328;

        const convertedWeight = +enteredWeight / weightConversion;
        const convertedHeight = +enteredHeight / heightConversion;

        const bmi = convertedWeight / ((convertedHeight/100) * (convertedHeight/100));

        setCalculatedBMI(bmi);

        if(bmi >= 18.5 && bmi <= 24.9) {
        setDesciption('Normal');
        } else if(bmi >= 25 && bmi <= 29.9){
            setDesciption('Gemuk');
        } else if(bmi < 18.5){
            setDesciption('Kurus');
        } else if(bmi >= 30){
            setDesciption('Obesitas');
        }
    };

    const resetInputs = () => {
        weightInputRef.current!.value = '';
        heightInputRef.current!.value = '';
    };

    const clearError = () => {
        setError('')
    }

    const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
        setCalcUnits(selectedValue);
    };

return (
    <>
        <IonAlert 
            isOpen={!!error}
            message={error}
            backdropDismiss={false}
            buttons={[{
            text: 'Okay',
            handler: clearError
            }]}
        />
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>BMI Calculator</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                            <IonGrid className="ion-no-padding">
                                <IonRow>
                                    <IonCol>
                                        <InputControl 
                                        selectedValue={calcUnits}
                                        onSelectValue={selectCalcUnitHandler}
                                        onReset={resetInputs}
                                        />
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                                            <IonInput ref={heightInputRef} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                                            <IonInput ref={weightInputRef} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <BmiControls
                                onCalculate={calculateBMI}
                                onReset={resetInputs}
                                />
                                {calculatedBMI && (
                                    <BmiResult
                                        result={calculatedBMI}
                                        description={description!}
                                    />
                                )}
                            </IonGrid>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    </>
    );
};
    
export default BmiCalc;