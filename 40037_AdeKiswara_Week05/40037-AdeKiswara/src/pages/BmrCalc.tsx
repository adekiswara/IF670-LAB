import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton, IonCol, IonContent, IonCard, IonGrid, IonHeader, IonInput, IonRouterOutlet, IonRow, IonToolbar, IonTitle, IonItem, IonLabel, IonIcon, IonCardContent, IonCardTitle, IonCardSubtitle, IonAlert, IonPage, IonRadioGroup, IonListHeader, IonRadio } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';

import InputControl from '../components/InputControl';
import BmiControls from '../components/BmiControls';
import BmrResult from '../components/BmrResult';

const BmrCalc: React.FC = () => {
    const [ calculatedBMR, setCalculatedBMR ] = useState<number>();
    const [ gender, setGender ] = useState<'male' | 'female'>('male');
    const [ error, setError ] = useState<string>();
    const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const ageInputRef = useRef<HTMLIonInputElement>(null);

    const calculateBMR = () => {
        const enteredWeight = weightInputRef.current!.value;
        const enteredHeight = heightInputRef.current!.value;
        const enteredAge = ageInputRef.current!.value;

        if(!enteredWeight || !enteredHeight || !enteredAge || +enteredHeight <= 0 || +enteredWeight <= 0 || +enteredAge <= 0) {
            setError( 'Please enter a valid (non-negative) input number');
            return;
        }

        const weightConversion = calcUnits === 'cmkg' ? 1 : 2.2;
        const heightConversion = calcUnits === 'cmkg' ? 1 : 0.0328;

        const convertedWeight = +enteredWeight / weightConversion;
        const convertedHeight = +enteredHeight / heightConversion;
        
        const genderKey = gender === 'male' ? 66 : 655;
        const weightMultiplier = gender === 'male' ? 13.7 : 9.6;
        const heightMultiplier = gender === 'male' ? 5 : 1.8;
        const ageMultiplier = gender === 'male' ? 6.8 : 4.7;

        const multipliedWeight = convertedWeight * weightMultiplier;
        const multipliedHeight = convertedHeight * heightMultiplier;
        const multipliedAge = +enteredAge * ageMultiplier;

        const bmr = genderKey + multipliedWeight + multipliedHeight - multipliedAge;

        setCalculatedBMR(bmr);
        };

        const resetInputs = () => {
        weightInputRef.current!.value = '';
        heightInputRef.current!.value = '';
        ageInputRef.current!.value = '';
        setCalculatedBMR(undefined);
        };

        const clearError = () => {
        setError('');
        };

        const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
        setCalcUnits(selectedValue);
        };

        const selectGenderHandler = (selectedValue: 'male' | 'female') => {
        setGender(selectedValue);
        };

    return (
        <>
        <IonAlert
            isOpen={!!error}
            message={error}
            backdropDismiss={false}
            buttons={[{
                text: 'Okay', handler: clearError
            }]} 
        />

        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>BMR Calculator</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol sizeSm="8" offsetSm="2" sizeMd="6" offsetMd="3"> 
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
                                        <IonLabel position="floating">Age</IonLabel>
                                        <IonInput ref={ageInputRef} />
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonRadioGroup value={gender} onIonChange={(event: CustomEvent) => selectGenderHandler(event.detail.value)}>
                                        <IonListHeader>
                                            <IonLabel>Gender</IonLabel>
                                        </IonListHeader>
                                        <IonRow>
                                            <IonCol>
                                            <IonItem>
                                                <IonLabel>Male</IonLabel>
                                                <IonRadio slot="start" value="male" />
                                            </IonItem>
                                            </IonCol>
                                            <IonCol>
                                            <IonItem>
                                                <IonLabel>Female</IonLabel>
                                                <IonRadio slot="start" value="female" />
                                            </IonItem>
                                            </IonCol>
                                        </IonRow>
                                        </IonRadioGroup>
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
                                onCalculate={calculateBMR}
                                onReset={resetInputs}
                                />
                                {calculatedBMR && (
                                <BmrResult
                                    result={calculatedBMR}
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

export default BmrCalc;