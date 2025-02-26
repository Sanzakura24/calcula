function btnClicked() {
    document.getElementById('ipoteka-modal-form-span').innerHTML = "Льготная ипотека для новостроек от 6,5%";
    document.getElementById('mortgage-program').value = "Льготная ипотека для новостроек от 6,5%";
    }
    function btn2Clicked() {
    document.getElementById('ipoteka-modal-form-span').innerHTML = "Семейная ипотека от 4,9%";
    document.getElementById('mortgage-program').value = "Семейная ипотека от 4,9%";
    }
    function btn3Clicked() {
    document.getElementById('ipoteka-modal-form-span').innerHTML = "Сельская ипотека от 2,7%";
    document.getElementById('mortgage-program').value = "Сельская ипотека от 2,7%";
    }
    function btn4Clicked() {
    document.getElementById('ipoteka-modal-form-span').innerHTML = "Покупка квартиры в новосторойке от 3,7%";
    document.getElementById('mortgage-program').value = "Покупка квартиры в новосторойке от 3,7%";
    }
    function btn5Clicked() {
    document.getElementById('ipoteka-modal-form-span').innerHTML = "Покупка вторичного жилья от 8,9%";
    document.getElementById('mortgage-program').value = "Покупка вторичного жилья от 8,9%";
    }
        //Для калькулятора
    
        //округление
        var rounded = function(number){
        return +number.toFixed(2);
        }
    
        //вывод в денежный формат
        var moneyFormat = function(n) {
        return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
        }
    
        //Переменные вывода значений в правом столбце
        var creditSumm = document.getElementById("credit-summ");
        var credit;
    
        var monthPay = document.getElementById("month-pay");
        var monthly;
    
        var overPay;
        var overPayWithUs;
        var yourSafe = document.getElementById("your-safe");
        var monthPayWithUs = document.getElementById("month-pay-with-us");
        
        //Переменные для расчета ежемесячного платежа
        var monthSumm;
        var monthPercent;
        var ann;
        var monthPaySumm;
    
    
    
        //range стоимости объекта
        var slider = document.getElementById("object-price");
        var hidden = document.getElementById("object-price-hidden");
        var output = document.getElementById("object-price-output");
    
        output.value = moneyFormat(slider.value);
    
        slider.oninput = function() {
          hidden.value = this.value;
          output.value = moneyFormat(hidden.value);
          //Подсчет суммы кредита
          creditSumm.innerHTML = moneyFormat(this.value - firstPaymentSlider.value);
          credit = this.value - firstPaymentSlider.value;
          if(credit <= 0) {
              creditSumm.innerHTML = "0,00";
          }
    
          //Подсчет ежемесячного платежа
          monthSumm = years.value * 12;
          monthPercent = (percentSelect.options[percentSelect.selectedIndex].value / 12) / 100;
          ann = (monthPercent * ((1 + monthPercent)**monthSumm)) / (((1 + monthPercent)**monthSumm) - 1);
          monthPaySumm = credit * ann;
    
          monthPay.innerHTML = moneyFormat(monthPaySumm);
          monthly = rounded(monthPaySumm);
          if(monthPaySumm <= 0) {
              monthPay.innerHTML = "0,00";
          }
    
          //Подсчет переплаты по кредиту
          overPay = rounded(monthly * monthSumm - credit);
    
          //Подсчет переплаты по кредиту с нами
          var monthPercentWithUs = ((percentSelect.options[percentSelect.selectedIndex].value - 0.7) / 12) / 100;
          var annWithUs = (monthPercentWithUs * ((1 + monthPercentWithUs)**monthSumm)) / (((1 + monthPercentWithUs)**monthSumm) - 1);
          var monthPaySummWithUs = credit * annWithUs;
          overPayWithUs = rounded(monthPaySummWithUs * monthSumm - credit);
    
          //Подсчет сэкономленной суммы
          monthPayWithUs.innerHTML = moneyFormat(monthPaySummWithUs);
          yourSafe.innerHTML = moneyFormat(overPay - overPayWithUs);
          if(monthPaySummWithUs <= 0) {
              monthPayWithUs.innerHTML = "0,00";
          }
    
          if(overPay - overPayWithUs <= 0) {
              yourSafe.innerHTML = "0,00";
          }
    
    
        }
    
        output.oninput = function() {	
          hidden.value = this.value.replace(/ /g, "").replace(",00", "");
          slider.value = hidden.value;
    
    
        //Подсчет суммы кредита
          creditSumm.innerHTML = moneyFormat(hidden.value - firstPaymentSlider.value);
          credit = hidden.value - firstPaymentSlider.value;
          if(credit <= 0) {
              creditSumm.innerHTML = "0,00";
          }
          //Подсчет ежемесячного платежа
          monthSumm = years.value * 12;
          monthPercent = (percentSelect.options[percentSelect.selectedIndex].value / 12) / 100;
          ann = (monthPercent * ((1 + monthPercent)**monthSumm)) / (((1 + monthPercent)**monthSumm) - 1);
          monthPaySumm = credit * ann;
    
          monthPay.innerHTML = moneyFormat(monthPaySumm);
          monthly = rounded(monthPaySumm);
           if(monthPaySumm <= 0) {
              monthPay.innerHTML = "0,00";
          }
          //Подсчет переплаты по кредиту
          overPay = rounded(monthly * monthSumm - credit);
    
          //Подсчет переплаты по кредиту с нами
          var monthPercentWithUs = ((percentSelect.options[percentSelect.selectedIndex].value - 0.7) / 12) / 100;
          var annWithUs = (monthPercentWithUs * ((1 + monthPercentWithUs)**monthSumm)) / (((1 + monthPercentWithUs)**monthSumm) - 1);
          var monthPaySummWithUs = credit * annWithUs;
          overPayWithUs = rounded(monthPaySummWithUs * monthSumm - credit);
    
          //Подсчет сэкономленной суммы
          monthPayWithUs.innerHTML = moneyFormat(monthPaySummWithUs);
          yourSafe.innerHTML = moneyFormat(overPay - overPayWithUs);
          if(monthPaySummWithUs <= 0) {
              monthPayWithUs.innerHTML = "0,00";
          }
    
          if(overPay - overPayWithUs <= 0) {
              yourSafe.innerHTML = "0,00";
          }
        }
    
        //range первоначального взноса
        var firstPaymentSlider = document.getElementById("first-payment");
        var firstPaymentOutput = document.getElementById("first-payment-output");
        var firstHidden = document.getElementById("first-payment-hidden");
        firstPaymentOutput.value = moneyFormat(firstPaymentSlider.value);
    
        firstPaymentSlider.oninput = function() {
    
         firstHidden.value = this.value;
         firstPaymentOutput.value = moneyFormat(firstHidden.value);
    
         //Подсчет суммы кредита
         creditSumm.innerHTML = moneyFormat(slider.value - this.value);
         credit = slider.value - this.value;
         if(credit <= 0) {
              creditSumm.innerHTML = "0,00";
          }
    
         //Подсчет ежемесячного платежа
          monthSumm = years.value * 12;
          monthPercent = (percentSelect.options[percentSelect.selectedIndex].value / 12) / 100;
          ann = (monthPercent * ((1 + monthPercent)**monthSumm)) / (((1 + monthPercent)**monthSumm) - 1);
          monthPaySumm = credit * ann;
    
          monthPay.innerHTML = moneyFormat(monthPaySumm);
          monthly = rounded(monthPaySumm);
          if(monthPaySumm <= 0) {
              monthPay.innerHTML = "0,00";
          }
    
          //Подсчет переплаты по кредиту
          overPay = rounded(monthly * monthSumm - credit);
    
          //Подсчет переплаты по кредиту с нами
          var monthPercentWithUs = ((percentSelect.options[percentSelect.selectedIndex].value - 0.7) / 12) / 100;
          var annWithUs = (monthPercentWithUs * ((1 + monthPercentWithUs)**monthSumm)) / (((1 + monthPercentWithUs)**monthSumm) - 1);
          var monthPaySummWithUs = credit * annWithUs;
          overPayWithUs = rounded(monthPaySummWithUs * monthSumm - credit);
    
          //Подсчет сэкономленной суммы
          monthPayWithUs.innerHTML = moneyFormat(monthPaySummWithUs);
          yourSafe.innerHTML = moneyFormat(overPay - overPayWithUs);
          if(monthPaySummWithUs <= 0) {
              monthPayWithUs.innerHTML = "0,00";
          }
    
          if(overPay - overPayWithUs <= 0) {
              yourSafe.innerHTML = "0,00";
          }
    
        }
    
        firstPaymentOutput.oninput = function() {
            firstHidden.value = this.value.replace(/ /g, "").replace(",00", "");
            firstPaymentSlider.value = firstHidden.value;
    
             //Подсчет суммы кредита
             creditSumm.innerHTML = moneyFormat(slider.value - firstHidden.value);
             credit = slider.value - firstHidden.value;
             if(credit <= 0) {
                  creditSumm.innerHTML = "0,00";
              }
    
             //Подсчет ежемесячного платежа
              monthSumm = years.value * 12;
              monthPercent = (percentSelect.options[percentSelect.selectedIndex].value / 12) / 100;
              ann = (monthPercent * ((1 + monthPercent)**monthSumm)) / (((1 + monthPercent)**monthSumm) - 1);
              monthPaySumm = credit * ann;
    
              monthPay.innerHTML = moneyFormat(monthPaySumm);
              monthly = rounded(monthPaySumm);
              if(monthPaySumm <= 0) {
                  monthPay.innerHTML = "0,00";
              }
    
              //Подсчет переплаты по кредиту
              overPay = rounded(monthly * monthSumm - credit);
    
              //Подсчет переплаты по кредиту с нами
              var monthPercentWithUs = ((percentSelect.options[percentSelect.selectedIndex].value - 0.7) / 12) / 100;
              var annWithUs = (monthPercentWithUs * ((1 + monthPercentWithUs)**monthSumm)) / (((1 + monthPercentWithUs)**monthSumm) - 1);
              var monthPaySummWithUs = credit * annWithUs;
              overPayWithUs = rounded(monthPaySummWithUs * monthSumm - credit);
    
              //Подсчет сэкономленной суммы
              monthPayWithUs.innerHTML = moneyFormat(monthPaySummWithUs);
              yourSafe.innerHTML = moneyFormat(overPay - overPayWithUs);
              if(monthPaySummWithUs <= 0) {
                  monthPayWithUs.innerHTML = "0,00";
              }
    
              if(overPay - overPayWithUs <= 0) {
                  yourSafe.innerHTML = "0,00";
              }
        }
    
        //range срока кредита
        var years = document.getElementById("years");
        var yearsOutput = document.getElementById("years-output");
        yearsOutput.value = years.value;
    
        years.oninput = function() {
         yearsOutput.value = this.value;
    
          credit = slider.value - firstPaymentSlider.value;
         //Подсчет ежемесячного платежа
          monthSumm = years.value * 12;
          monthPercent = (percentSelect.options[percentSelect.selectedIndex].value / 12) / 100;
          ann = (monthPercent * ((1 + monthPercent)**monthSumm)) / (((1 + monthPercent)**monthSumm) - 1);
          monthPaySumm = credit * ann;
    
          monthPay.innerHTML = moneyFormat(monthPaySumm);
          monthly = rounded(monthPaySumm);
          if(monthPaySumm <= 0) {
                  monthPay.innerHTML = "0,00";
          }
    
          //Подсчет переплаты по кредиту
          overPay = rounded(monthly * monthSumm - credit);
    
          //Подсчет переплаты по кредиту с нами
          var monthPercentWithUs = ((percentSelect.options[percentSelect.selectedIndex].value - 0.7) / 12) / 100;
          var annWithUs = (monthPercentWithUs * ((1 + monthPercentWithUs)**monthSumm)) / (((1 + monthPercentWithUs)**monthSumm) - 1);
          var monthPaySummWithUs = credit * annWithUs;
          overPayWithUs = rounded(monthPaySummWithUs * monthSumm - credit);
    
          //Подсчет сэкономленной суммы
          monthPayWithUs.innerHTML = moneyFormat(monthPaySummWithUs);
          yourSafe.innerHTML = moneyFormat(overPay - overPayWithUs);
          if(monthPaySummWithUs <= 0) {
                  monthPayWithUs.innerHTML = "0,00";
              }
    
              if(overPay - overPayWithUs <= 0) {
                  yourSafe.innerHTML = "0,00";
              }
    
        }
    
        yearsOutput.oninput = function() {
            years.value = this.value;
              credit = slider.value - firstPaymentSlider.value;
             //Подсчет ежемесячного платежа
              monthSumm = years.value * 12;
              monthPercent = (percentSelect.options[percentSelect.selectedIndex].value / 12) / 100;
              ann = (monthPercent * ((1 + monthPercent)**monthSumm)) / (((1 + monthPercent)**monthSumm) - 1);
              monthPaySumm = credit * ann;
    
              monthPay.innerHTML = moneyFormat(monthPaySumm);
              monthly = rounded(monthPaySumm);
              if(monthPaySumm <= 0) {
                      monthPay.innerHTML = "0,00";
              }
    
              //Подсчет переплаты по кредиту
              overPay = rounded(monthly * monthSumm - credit);
    
              //Подсчет переплаты по кредиту с нами
              var monthPercentWithUs = ((percentSelect.options[percentSelect.selectedIndex].value - 0.7) / 12) / 100;
              var annWithUs = (monthPercentWithUs * ((1 + monthPercentWithUs)**monthSumm)) / (((1 + monthPercentWithUs)**monthSumm) - 1);
              var monthPaySummWithUs = credit * annWithUs;
              overPayWithUs = rounded(monthPaySummWithUs * monthSumm - credit);
    
              //Подсчет сэкономленной суммы
              monthPayWithUs.innerHTML = moneyFormat(monthPaySummWithUs);
              yourSafe.innerHTML = moneyFormat(overPay - overPayWithUs);
              if(monthPaySummWithUs <= 0) {
                  monthPayWithUs.innerHTML = "0,00";
              }
    
              if(overPay - overPayWithUs <= 0) {
                  yourSafe.innerHTML = "0,00";
              }
        }
        //Изменение процентной ставки
        
        var percentSelect = document.getElementById("bank-select");
        var bankPercent = document.getElementById("bank-percent-span");
        
        percentSelect.onchange = function() {
            bankPercent.value = this.options[this.selectedIndex].value;
    
              credit = slider.value - firstPaymentSlider.value;
                //Подсчет ежемесячного платежа
              monthSumm = years.value * 12;
              monthPercent = (percentSelect.options[percentSelect.selectedIndex].value / 12) / 100;
              ann = (monthPercent * ((1 + monthPercent)**monthSumm)) / (((1 + monthPercent)**monthSumm) - 1);
              monthPaySumm = credit * ann;
    
              monthPay.innerHTML = moneyFormat(monthPaySumm);
              monthly = rounded(monthPaySumm);
              if(monthPaySumm <= 0) {
                      monthPay.innerHTML = "0,00";
              }
    
              //Подсчет переплаты по кредиту
              overPay = rounded(monthly * monthSumm - credit);
    
              //Подсчет переплаты по кредиту с нами
              var monthPercentWithUs = ((percentSelect.options[percentSelect.selectedIndex].value - 0.7) / 12) / 100;
              var annWithUs = (monthPercentWithUs * ((1 + monthPercentWithUs)**monthSumm)) / (((1 + monthPercentWithUs)**monthSumm) - 1);
              var monthPaySummWithUs = credit * annWithUs;
              overPayWithUs = rounded(monthPaySummWithUs * monthSumm - credit);
    
              //Подсчет сэкономленной суммы
              monthPayWithUs.innerHTML = moneyFormat(monthPaySummWithUs);
              yourSafe.innerHTML = moneyFormat(overPay - overPayWithUs);
              if(monthPaySummWithUs <= 0) {
                  monthPayWithUs.innerHTML = "0,00";
              }
    
              if(overPay - overPayWithUs <= 0) {
                  yourSafe.innerHTML = "0,00";
              }
        }
    
        bankPercent.oninput = function() {
              this.value = this.value.replace(",", '.');
              credit = slider.value - firstPaymentSlider.value;
              //Подсчет ежемесячного платежа
              monthSumm = years.value * 12;
              monthPercent = (this.value / 12) / 100;
              ann = (monthPercent * ((1 + monthPercent)**monthSumm)) / (((1 + monthPercent)**monthSumm) - 1);
              monthPaySumm = credit * ann;
    
              monthPay.innerHTML = moneyFormat(monthPaySumm);
              monthly = rounded(monthPaySumm);
              if(monthPaySumm <= 0) {
                      monthPay.innerHTML = "0,00";
              }
    
              //Подсчет переплаты по кредиту
              overPay = rounded(monthly * monthSumm - credit);
    
              //Подсчет переплаты по кредиту с нами
              var monthPercentWithUs = ((this.value - 0.7) / 12) / 100;
              var annWithUs = (monthPercentWithUs * ((1 + monthPercentWithUs)**monthSumm)) / (((1 + monthPercentWithUs)**monthSumm) - 1);
              var monthPaySummWithUs = credit * annWithUs;
              overPayWithUs = rounded(monthPaySummWithUs * monthSumm - credit);
    
              //Подсчет сэкономленной суммы
              monthPayWithUs.innerHTML = moneyFormat(monthPaySummWithUs);
              yourSafe.innerHTML = moneyFormat(overPay - overPayWithUs);
              if(monthPaySummWithUs <= 0) {
                  monthPayWithUs.innerHTML = "0,00";
              }
    
              if(overPay - overPayWithUs <= 0) {
                  yourSafe.innerHTML = "0,00";
              }
        }
    