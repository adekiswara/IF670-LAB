const calculateBtn = document.querySelector('ion-button');
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');
const categoryBmi = document.getElementById('catgor');
const hasilBmi = document.getElementById('hasil');
const resetBtn = document.getElementById('reset-btn');
const hasilTampil = document.querySelector('ion-card');

const calculateBMI = () => {
    let category;
    const enteredHeight = +heightInput.value / 100; // tinggi dalam meter
    const enteredWeight = +weightInput.value; // berat dalam kg

    if(!enteredHeight || !enteredWeight) {
        return;
    }

    const bmi = enteredWeight / (enteredHeight * enteredHeight);

    if(bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal";
    } else if(bmi >= 25 && bmi <= 29.9){
        category = "Gemuk";
    } else if(bmi < 18.5){
        category = "Kurus";
    } else if(bmi >= 30){
        category = "Obesitas";
    }

    categoryBmi.innerHTML = category;
    hasilBmi.innerHTML = bmi;
    saveTag.classList.remove('ion-hide');

    console.log(bmi);
};

calculateBtn.addEventListener('click', calculateBMI);

resetBtn.addEventListener('click', function() {
    heightInput.value = "";
    weightInput.value = "";
    categoryBmi.innerHTML = "-";
    hasilBmi.innerHTML = "-";
    hasilTampil.classList.add('ion-hide');
});
