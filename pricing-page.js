
$(function(){
    // links to elements on the page
    var uiStorage = {

        billingCheckbox: $("#billingCheckbox"),
        currencySelectField: $("#currency-select-field"),
        currencyText: $(".currency-class-identifier"),
        currencyTextLeft: $(".package-left-currency"),


        //cost amount array
        //containing cost amount label for desktop view and mobile view
        explorerCostAmountLeft:$(".explorer-cost-amount-left"),
        byoCostAmountLeft:$(".byo-cost-amount-left"),
        pnpCostAmountLeft:$(".pnp-cost-amount-left"),


        explorerCostAmount:$("#explorer-cost-amount"),
        byoCostAmount:$("#byo-cost-amount"),
        pnpCostAmount:$("#pnp-cost-amount"),


        packageSelectionRadioButton: $(".package-card-radio-button"),

        packageCardLeftExplorer: $(".pricing-left.explorer"),
        packageCardLeftBYO: $(".pricing-left.byo"),
        packageCardLeftPNP: $(".pricing-left.pnp"),
        packageCardLeftEnterprise: $(".pricing-left.enterprise"),


        calculatorBillingCheckbox: $("#calculator-billing-toggle"),
        calculateButton: $("#calculator-form-calculate-button"),
        calculatorCardBlank: $("#calculator-card-blank"),
        calculatorCardSwappable: $("#calculator-package-swappable-block"),
        calculatorRevenueInput: $("#calculator-revenue-input"),
        calculatorNumberOfTeamInput: $("#calculator-number-of-team-input"),
        calculatorWebsiteCheckbox: $("#calculator-website-checkbox"),
        calculatorCrmCheckbox: $("#calculator-crm-checkbox"),
        calculatorApiCheckbox: $("#calculator-api-access"),
        calculatorPhoneSupportCheckbox: $("#calculator-phone-support"),

        calculatorLottieExplorer: $("#calculator-lottie-explorer"),
        calculatorLottieByo: $("#calculator-lottie-byo"),
        calculatorLottiePnp: $("#calculator-lottie-pnp"),
        calculatorLottieEnterprise: $("#calculator-lottie-enterprise"),
        calculatorPackageLabel: $("#calculator-package-label"),
        calculatorCurrencyLabel: $("#calculator-currency-label"),
        calculatorCost: $("#calculator-amount"),
        calculatorBookingFee: $("#calculator-booking-fee"),
        calculatorBillingToggle: $("#calculator-billing-toggle"),
        calculatorToggleDot: $("#calculator-toggle-dot"),
        calculatorPerMonthText: $("#calculator-per-month-label"),
        calculatorEnterpriseCallUsLabel: $("#calculator-enterprise-call-us-label"),
        calculatorCardTransition: $("#calculator-card-transition")


    };

    var bookingFeeLabel = {
        explorerBookingFee: "+4% booking fees",
        byoBookingFee: "+1% booking fees",
        pnpBookingFee: "+1% booking fees",
        enterpriseBookingFee: "0% booking fees & more"

    }

    var packageNameText = {
        explorer: "explorer",
        byo: "pro byo website",
        pnp: "Pro PLUG N PLay",
        enterprise: "enterprise"
    }

    var calculatorResult;
    var calculatorResultOptions = {
        explorer: "explorer",
        byo: "byo",
        pnp: "pnp",
        enterprise: "enterprise"
    }

    var packageCostPerMonth = {
        explorerUSDAnnual: "0",
        explorerUSDMonthly: "0",
        explorerAUDAnnual: "0",
        explorerAUDMonthly: "0",

        byoUSDAnnual:"55",
        byoUSDMonthly: "60",
        byoAUDAnnual: "73",
        byoAUDMonthly: "80",

        pnpUSDAnnual: "65",
        pnpUSDMonthly: "70",
        pnpAUDAnnual: "82",
        pnpAUDMonthly: "90"
    };

    var currencyTextAndSign = {
        currencyUSD: "US$",
        currencyAUD: "A$"
    }



    uiStorage.billingCheckbox.change(function() {
        costSwitch();
    });

    uiStorage.currencySelectField.change(function(){
        costSwitch();
    })



    uiStorage.packageSelectionRadioButton.change(function() {
        cardSwitch();
    })




    uiStorage.calculateButton.click(function(){
      
        uiStorage.calculatorCardBlank.hide();
        //hide card to show transition block
        uiStorage.calculatorCardSwappable.hide();
        uiStorage.calculatorCardTransition.show();
        setTimeout(function(){
            uiStorage.calculatorCardTransition.hide();
            uiStorage.calculatorCardSwappable.show();
        }, 1000);

        if(isCrmApiPhoneSupportChecked()){
            //alert("enterprise");
            
            showEnterpriseOnCalculator();
        }else{

            if(getNumberOfTeam() > 3){
                //alert("enterprise");
                showEnterpriseOnCalculator();
            }else{
                if(getRevenueInput() < 25000){
                    if(isWebsiteChecked()){
                        //alert("pnp");
                        showPnpOnCalculator();
                    }else{
                        //alert("explorer");
                        showExplorerOnCalculator();
                    }
                }else if(getRevenueInput() >= 25000 && getRevenueInput() < 125000){
                    if(isWebsiteChecked()){
                        //alert("pnp");
                        showPnpOnCalculator();
                    }else{
                        //alert("byo");
                        showByoOnCalculator();
                    }
                }else{
                    //alert("enterprise");
                    showEnterpriseOnCalculator();
                }
            }

        }
    })

    uiStorage.calculatorBillingCheckbox.change(function(){
        if(uiStorage.calculatorBillingCheckbox.is(':checked')){
            alert("calculator toggle checked");
        }else{
            alert("calculator not checked");
        }
    })

    var getRevenueInput = function(){
        return parseFloat(uiStorage.calculatorRevenueInput.val());
    }

    var getNumberOfTeam = function(){
        return parseFloat(uiStorage.calculatorNumberOfTeamInput.val());
    }


    var isWebsiteChecked = function(){
        if(uiStorage.calculatorWebsiteCheckbox.is(':checked')){
            return true;
        }else{
            return false;
        }
    }

    var isCrmApiPhoneSupportChecked = function(){
        if(uiStorage.calculatorCrmCheckbox.is(':checked') || uiStorage.calculatorApiCheckbox.is(':checked') || uiStorage.calculatorPhoneSupportCheckbox.is(':checked')){
            return true;
        }else{
            return false;
        }
    }

    var showExplorerOnCalculator = function(){
        calculatorResult = calculatorResultOptions.explorer;

        uiStorage.calculatorLottieExplorer.show();
        uiStorage.calculatorLottieByo.hide();
        uiStorage.calculatorLottiePnp.hide();
        uiStorage.calculatorLottieEnterprise.hide();

        //set checkbox unchecked(annual)
        //set initial state of toggle to left(annual)
        uiStorage.calculatorBillingCheckbox.prop('checked', false);
        uiStorage.calculatorToggleDot.css({float: "left"});

        uiStorage.calculatorPackageLabel.html(packageNameText.explorer);

        var selectedCurrency = uiStorage.currencySelectField.val().toLowerCase();
        //alert(selectedCurrency);

        switch(selectedCurrency){
            //select usd, initial state is annual cost
            case 'usd':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyUSD);
                uiStorage.calculatorCost.html(packageCostPerMonth.explorerUSDAnnual);
                break;

            //select aud, initial state is annual cost
            case 'aud':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyAUD);
                uiStorage.calculatorCost.html(packageCostPerMonth.explorerAUDAnnual);
                break;

            default:
                alert("unexpected currency selected in the dropdown");
        }

        //alert("run after switch");
        uiStorage.calculatorEnterpriseCallUsLabel.hide();
        uiStorage.calculatorCurrencyLabel.show();
        uiStorage.calculatorCost.show();
        uiStorage.calculatorPerMonthText.show();
        uiStorage.calculatorBookingFee.html(bookingFeeLabel.explorerBookingFee);

    }

    var showByoOnCalculator = function(){
        calculatorResult = calculatorResultOptions.byo;

        uiStorage.calculatorLottieExplorer.hide();
        uiStorage.calculatorLottieByo.show();
        uiStorage.calculatorLottiePnp.hide();
        uiStorage.calculatorLottieEnterprise.hide();

        //set checkbox unchecked(annual)
        //set initial state of toggle to left(annual)
        uiStorage.calculatorBillingCheckbox.prop('checked', false);
        uiStorage.calculatorToggleDot.css({float: "left"});

        uiStorage.calculatorPackageLabel.html(packageNameText.byo);


        var selectedCurrency = uiStorage.currencySelectField.val().toLowerCase();

        switch(selectedCurrency){
            //select usd, initial state is annual cost
            case 'usd':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyUSD);
                uiStorage.calculatorCost.html(packageCostPerMonth.byoUSDAnnual);
                break;

            //select aud, initial state is annual cost
            case 'aud':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyAUD);
                uiStorage.calculatorCost.html(packageCostPerMonth.byoAUDAnnual);
                break;

            default:
                alert("unexpected currency selected in the dropdown");
        }
        
        
        uiStorage.calculatorEnterpriseCallUsLabel.hide();
        uiStorage.calculatorCurrencyLabel.show();
        uiStorage.calculatorCost.show();
        uiStorage.calculatorPerMonthText.show();
        uiStorage.calculatorBookingFee.html(bookingFeeLabel.byoBookingFee);

    }

    var showPnpOnCalculator = function(){
        calculatorResult = calculatorResultOptions.pnp;

        uiStorage.calculatorLottieExplorer.hide();
        uiStorage.calculatorLottieByo.hide();
        uiStorage.calculatorLottiePnp.show();
        uiStorage.calculatorLottieEnterprise.hide();

        //set checkbox unchecked(annual)
        //set initial state of toggle to left(annual)
        uiStorage.calculatorBillingCheckbox.prop('checked', false);
        uiStorage.calculatorToggleDot.css({float: "left"});

        uiStorage.calculatorPackageLabel.html(packageNameText.pnp);


        var selectedCurrency = uiStorage.currencySelectField.val().toLowerCase();

        switch(selectedCurrency){
            //select usd, initial state is annual cost
            case 'usd':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyUSD);
                uiStorage.calculatorCost.html(packageCostPerMonth.pnpUSDAnnual);
                break;

            //select aud, initial state is annual cost
            case 'aud':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyAUD);
                uiStorage.calculatorCost.html(packageCostPerMonth.pnpAUDAnnual);
                break;

            default:
                alert("unexpected currency selected in the dropdown");
        }


        uiStorage.calculatorEnterpriseCallUsLabel.hide();
        uiStorage.calculatorCurrencyLabel.show();
        uiStorage.calculatorCost.show();
        uiStorage.calculatorPerMonthText.show();
        uiStorage.calculatorBookingFee.html(bookingFeeLabel.pnpBookingFee);

    }

    var showEnterpriseOnCalculator = function(){
        calculatorResult = calculatorResultOptions.enterprise;

        uiStorage.calculatorLottieExplorer.hide();
        uiStorage.calculatorLottieByo.hide();
        uiStorage.calculatorLottiePnp.hide();
        uiStorage.calculatorLottieEnterprise.show();

        //set checkbox unchecked(annual)
        //set initial state of toggle to left(annual)
        uiStorage.calculatorBillingCheckbox.prop('checked', false);
        uiStorage.calculatorToggleDot.css({float: "left"});

        uiStorage.calculatorPackageLabel.html(packageNameText.enterprise);

        
        //hide cost and currency label, show Call us label
        uiStorage.calculatorEnterpriseCallUsLabel.show();
        uiStorage.calculatorCurrencyLabel.hide();
        uiStorage.calculatorCost.hide();
        uiStorage.calculatorPerMonthText.hide();

        var selectedCurrency = uiStorage.currencySelectField.val().toLowerCase();
        uiStorage.calculatorBookingFee.html(bookingFeeLabel.enterpriseBookingFee);

    }






















    var cardSwitch = function() {

        var checkedPackageCard = $("input[type='radio'][name='Package-card']:checked").val();
        switch (checkedPackageCard) { 
            case 'explorer': 
                uiStorage.packageCardLeftExplorer.show();
                uiStorage.packageCardLeftBYO.hide();
                uiStorage.packageCardLeftPNP.hide();
                uiStorage.packageCardLeftEnterprise.hide();
                break;

            case 'byo': 
                uiStorage.packageCardLeftExplorer.hide();
                uiStorage.packageCardLeftBYO.show();
                uiStorage.packageCardLeftPNP.hide();
                uiStorage.packageCardLeftEnterprise.hide();
                break;

            case 'pnp': 
                uiStorage.packageCardLeftExplorer.hide();
                uiStorage.packageCardLeftBYO.hide();
                uiStorage.packageCardLeftPNP.show();
                uiStorage.packageCardLeftEnterprise.hide();
                break;      

            case 'enterprise': 
                uiStorage.packageCardLeftExplorer.hide();
                uiStorage.packageCardLeftBYO.hide();
                uiStorage.packageCardLeftPNP.hide();
                uiStorage.packageCardLeftEnterprise.show();
                break;
            default:
                alert('Nobody Wins!');
        }
    }



    var costSwitch = function() {
        //switching to usd

        if(uiStorage.currencySelectField.val().toLowerCase() === "usd"){
            //alert(uiStorage.currencySelectField.val());
            if(uiStorage.billingCheckbox.is(':checked')){
                //switch to monthly
                uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerUSDMonthly);
                uiStorage.byoCostAmount.html(packageCostPerMonth.byoUSDMonthly);
                uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpUSDMonthly);


                //updating cost amount label on the left hand side
                uiStorage.explorerCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.explorerUSDMonthly);
                 });
                uiStorage.byoCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.byoUSDMonthly);
                 });
                uiStorage.pnpCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.pnpUSDMonthly);
                 });



            }else{
                //alert("switch to annually");
                uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerUSDAnnual);
                uiStorage.byoCostAmount.html(packageCostPerMonth.byoUSDAnnual);
                uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpUSDAnnual);

                uiStorage.explorerCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.explorerUSDAnnual);
                 });
                uiStorage.byoCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.byoUSDAnnual);
                 });
                uiStorage.pnpCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.pnpUSDAnnual);
                 });

            }

            uiStorage.currencyText.each(function() {
                $(this).html(currencyTextAndSign.currencyUSD);
            });

            uiStorage.currencyTextLeft.each(function() {
                $(this).html(currencyTextAndSign.currencyUSD);
            });


        }else{


            //switching to aud
            if(uiStorage.billingCheckbox.is(':checked')){
                //alert("switch to monthly");
                uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerAUDMonthly);
                uiStorage.byoCostAmount.html(packageCostPerMonth.byoAUDMonthly);
                uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpAUDMonthly);


                uiStorage.explorerCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.explorerAUDMonthly);
                 });
                uiStorage.byoCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.byoAUDMonthly);
                 });
                uiStorage.pnpCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.pnpAUDMonthly);
                 });

            }else{
                //alert("switch to annually");
                uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerAUDAnnual);
                uiStorage.byoCostAmount.html(packageCostPerMonth.byoAUDAnnual);
                uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpAUDAnnual);

                uiStorage.explorerCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.explorerAUDAnnual);
                 });
                uiStorage.byoCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.byoAUDAnnual);
                 });
                uiStorage.pnpCostAmountLeft.each(function() {
                    $(this).html(packageCostPerMonth.pnpAUDAnnual);
                 });
            }

            uiStorage.currencyText.each(function() {
                $(this).html(currencyTextAndSign.currencyAUD);
            });

            uiStorage.currencyTextLeft.each(function() {
                $(this).html(currencyTextAndSign.currencyAUD);
            });
        }

}

});


