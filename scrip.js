// Функции для смены ипотечной программы (оставляем, если они нужны)
function btnClicked() {
  document.getElementById('ipoteka-modal-form-span').innerHTML = "Стандартная программа от 23%";
  document.getElementById('mortgage-program').value = "Стандартная программа от 23%";
}
function btn2Clicked() {
  document.getElementById('ipoteka-modal-form-span').innerHTML = "Семейная ипотека от 6.0%";
  document.getElementById('mortgage-program').value = "Семейная ипотека от 6.0%";
}


// Функция округления числа до двух знаков
var rounded = function(number) {
  return +number.toFixed(2);
}

// Функция форматирования числа в денежный формат
var moneyFormat = function(n) {
  return parseFloat(n)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ")
    .replace('.', ',');
}

// Получаем элементы из DOM
var matKap = document.querySelectorAll(".form-control-range");
var formGroo = document.querySelector(".range-out")
var rectangleSection = document.querySelector(".blue-rectangle");
var mortgageSection = document.querySelector(".form-grop");
var creditSumm = document.getElementById("credit-summ");
var monthPay = document.getElementById("month-pay");
var monthPayWithUs = document.getElementById("month-pay-with-us");
var yourSafe = document.getElementById("your-safe");

var slider = document.getElementById("object-price");
var hidden = document.getElementById("object-price-hidden");
var output = document.getElementById("object-price-output");
output.value = moneyFormat(slider.value);

var firstPaymentSlider = document.getElementById("first-payment");
var firstPaymentOutput = document.getElementById("first-payment-output");
var firstHidden = document.getElementById("first-payment-hidden");
firstPaymentOutput.value = moneyFormat(firstPaymentSlider.value);

var anotherFirstSlider = document.getElementById("another-first");
var anotherFirstOutput = document.getElementById("another-first-output");
var anotherHidden = document.getElementById("another-first-hidden");
anotherFirstOutput.value = moneyFormat(anotherFirstSlider.value);

var years = document.getElementById("years");
var yearsOutput = document.getElementById("years-output");
yearsOutput.value = years.value;

var percentSelect = document.getElementById("bank-select");
var bankPercent = document.getElementById("bank-percent-span");

// Элемент переключателя рассрочки
var matToggle = document.getElementById("mat-toggle")
var installmentToggle = document.getElementById("installment-toggle");

// Функция пересчёта
function recalc() {
  var propertyPrice = parseFloat(slider.value);
  var firstPayment = parseFloat((firstPaymentSlider.value));
  var anotherFirst = parseFloat(anotherFirstSlider.value);
  firstPaymentSlider.max = ((propertyPrice - anotherFirst) * 0.8).toString();
  firstPaymentOutput.value = moneyFormat(firstPaymentSlider.value);
  
  // Расчёт суммы кредита
  var credit = propertyPrice - firstPayment - anotherFirst;
  if (credit < 0) credit = 0;
  
  // Определяем срок кредита (в годах и месяцах)
  var termYears = parseFloat(years.value);
  // Если включён режим рассрочки – ограничиваем срок 4 годами
  if (installmentToggle && installmentToggle.checked) {
      if (termYears > 4) {
        termYears = 4;
        years.value = 4;
      }
      yearsOutput.value = years.value;
  }
  var termInMonths = termYears * 12;
  
  var monthPaySumm;
  
  if (installmentToggle && installmentToggle.checked) {
      // Режим рассрочки: беспроцентная рассрочка – просто делим сумму кредита на кол-во месяцев
      monthPaySumm = credit / termInMonths;
      
      // Для рассрочки «с нами» используем тот же расчёт, а экономия равна 0
      
  } else {
      // Режим ипотеки с процентной ставкой: стандартный аннуитетный расчёт
      var monthlyInterestRate = (parseFloat(percentSelect.value) / 12) / 100;
      var annuityFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termInMonths)) /
                          (Math.pow(1 + monthlyInterestRate, termInMonths) - 1);
      monthPaySumm = credit * annuityFactor;
      
      // Расчёт для варианта «с нами»
  }
  
  monthPay.innerHTML = moneyFormat(monthPaySumm);
  creditSumm.innerHTML = moneyFormat(credit);
}

// Обработчики событий для обновления значений и вызова пересчёта

// Стоимость объекта
slider.oninput = function() {
  hidden.value = this.value;
  output.value = moneyFormat(this.value);
  recalc();
}
output.oninput = function() {
  hidden.value = this.value.replace(/ /g, "").replace(",00", "");
  slider.value = hidden.value;
  recalc();
}

// Первоначальный взнос
firstPaymentSlider.oninput = function() {
  firstHidden.value = this.value;
  firstPaymentOutput.value = moneyFormat(firstHidden.value);
  recalc();
}
firstPaymentOutput.oninput = function() {
  firstHidden.value = this.value.replace(/ /g, "").replace(",00", "");
  firstPaymentSlider.value = firstHidden.value;
  recalc();
}

anotherFirstSlider.oninput = function () {
  anotherHidden.value=this.value;
  anotherFirstOutput.value = moneyFormat(anotherHidden.value);
  recalc();
}

anotherFirstOutput.oninput=function () {
  anotherHidden.value = this.value.replace(/ /g, "").replace(",00", "");
  anotherFirstSlider.value = anotherHidden.value;
  recalc();
}

// Срок кредита
years.oninput = function() {
  yearsOutput.value = this.value;
  recalc();
}
yearsOutput.oninput = function() {
  years.value = this.value;
  recalc();
}

// Изменение процентной ставки
percentSelect.onchange = function() {
  bankPercent.value = this.value;
  recalc();
}
bankPercent.oninput = function() {
  this.value = this.value.replace(",", '.');
  recalc();
}

// Переключатель режима рассрочки
if (installmentToggle) {
  installmentToggle.addEventListener("change", function(){
    
    if (this.checked) {
      years.max = 4;
      if (years.value > 4) {
        years.value = 4;
        yearsOutput.value = 4;
      }
      // Отключаем ввод процентной ставки в режиме рассрочки
      percentSelect.disabled = true;
      bankPercent.disabled = true;
      
      mortgageSection.classList.add("disabled-section");
      rectangleSection.classList.remove("dis-sec");
      rectangleSection.classList.add("dis-section");
      document.getElementById("years-label").label="4"
    } else {
      years.max = 30;
      percentSelect.disabled = false;
      bankPercent.disabled = false;
      mortgageSection.classList.remove("disabled-section");
      rectangleSection.classList.remove("dis-section");
      rectangleSection.classList.add("dis-sec");
      document.getElementById("years-label").label="30"
    }
    recalc();
  });
}

if(matToggle) {
  matToggle.addEventListener("change", function(){

    if (this.checked) {
      matKap[2].classList.remove("disabled-section");
      formGroo.classList.remove("disabled-section");
      anotherFirstSlider.value = 690000;
      anotherFirstOutput.value = moneyFormat(anotherFirstSlider.value);
      recalc();

    } else {
      matKap[2].classList.add("disabled-section");
      formGroo.classList.add("disabled-section");
      anotherFirstSlider.value = 0;
      anotherFirstOutput.value = moneyFormat(anotherFirstSlider.value);
      recalc();
    }
    recalc();

  });
}

matKap[2].classList.add("disabled-section");
formGroo.classList.add("disabled-section");
rectangleSection.classList.add("dis-sec");
recalc();
