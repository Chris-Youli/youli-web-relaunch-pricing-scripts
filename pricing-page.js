$(function () {
    // links to elements on the page
    var uiStorage = {

        billingCheckbox: $("#billingCheckbox"),
        billingToggleDot: $("#billing-toggle-dot"),
        currencySelectField: $("#currency-select-field"),
        currencyText: $(".currency-class-identifier"),
        currencyTextLeft: $(".package-left-currency"),


        //cost amount array
        //containing cost amount label for desktop view and mobile view
        explorerCostAmountLeft: $(".explorer-cost-amount-left"),
        byoCostAmountLeft: $(".byo-cost-amount-left"),
        pnpCostAmountLeft: $(".pnp-cost-amount-left"),


        explorerCostAmount: $("#explorer-cost-amount"),
        byoCostAmount: $("#byo-cost-amount"),
        pnpCostAmount: $("#pnp-cost-amount"),


        packageSelectionRadioButton: $(".package-card-radio-button"),

        packageCardLeftExplorer: $(".pricing-left.explorer"),
        packageCardLeftBYO: $(".pricing-left.byo"),
        packageCardLeftPNP: $(".pricing-left.pnp"),
        packageCardLeftEnterprise: $(".pricing-left.enterprise"),




        //pricing page calculator stuff
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
        calculatorToggleDot: $("#calculator-toggle-dot"),
        calculatorPerMonthText: $("#calculator-per-month-label"),
        calculatorEnterpriseCallUsLabel: $("#calculator-enterprise-call-us-label"),
        calculatorCardTransition: $("#calculator-card-transition"),
        calculatorBillingBlock: $("#calculator-billing-block"),


        //pricing table ui storage stuff
        //amount in the table header
        pricingTableAmountExplorer: $("#pricing-table-amount-explorer"),
        pricingTablAmounteByo: $("#pricing-table-amount-byo"),
        pricingTableAmountPnp: $("#pricing-table-amount-pnp"),

        //currency in the table header
        pricingTableCurrency: $(".pricing-table-currency"),

        //calculator error message
        calculatorErrorMessage: $("#calculator-error-message")


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
        pnp: "Pro+ Website",
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

        byoUSDAnnual: "55",
        byoUSDMonthly: "60",
        byoAUDAnnual: "73",
        byoAUDMonthly: "80",

        pnpUSDAnnual: "73",
        pnpUSDMonthly: "80",
        pnpAUDAnnual: "100",
        pnpAUDMonthly: "110"
    };

    var currencyTextAndSign = {
        currencyUSD: "US$",
        currencyAUD: "A$"
    }

    var billingFrequencyAnnual;

    var uiColorSet = {
        formErrorBorderColor: "#a94442",
        formNormalBorderColor: "#c7d0d5"
    }

    //set initial values on UI elements
    uiStorage.billingCheckbox.prop('checked', false);
    uiStorage.billingToggleDot.css({ float: "left" });
    uiStorage.currencySelectField.val('usd');
    uiStorage.currencyText.each(function () {
        $(this).html(currencyTextAndSign.currencyUSD);
    });
    uiStorage.currencyTextLeft.each(function () {
        $(this).html(currencyTextAndSign.currencyUSD);
    });



    //cost amount array
    //containing cost amount label for desktop view and mobile view
    uiStorage.explorerCostAmountLeft.each(function () {
        $(this).html(packageCostPerMonth.explorerUSDAnnual);
    });
    uiStorage.byoCostAmountLeft.each(function () {
        $(this).html(packageCostPerMonth.byoUSDAnnual);
    });
    uiStorage.pnpCostAmountLeft.each(function () {
        $(this).html(packageCostPerMonth.pnpUSDAnnual);
    });


    uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerUSDAnnual);
    uiStorage.byoCostAmount.html(packageCostPerMonth.byoUSDAnnual);
    uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpUSDAnnual);


    //radio button defaults is set in the designer via custom attribute
    //packageSelectionRadioButton: $(".package-card-radio-button"),


    uiStorage.packageCardLeftExplorer.show();
    //the display of the rest are set in the designer
    //because those are hidden on desktop but shown on mobile 
    // uiStorage.packageCardLeftBYO.hide();
    // uiStorage.packageCardLeftPNP.hide();
    // uiStorage.packageCardLeftEnterprise.hide();


    //pricing page calculator stuff
    uiStorage.calculatorBillingCheckbox.prop('checked', false);
    uiStorage.calculatorCardBlank.show();
    uiStorage.calculatorCardSwappable.hide();

    uiStorage.calculatorErrorMessage.hide();
    //end of initial value setup


    //calculating methods
    uiStorage.billingCheckbox.change(function () {
        if (uiStorage.billingCheckbox.is(':checked')) {
            uiStorage.billingToggleDot.css({ float: "right" });
        } else {
            uiStorage.billingToggleDot.css({ float: "left" });
        }
        //uiStorage.billingCheckbox.is(':checked')? true: false;
        costSwitch();
    });

    uiStorage.currencySelectField.change(function () {
        costSwitch();
    })



    uiStorage.packageSelectionRadioButton.change(function () {
        cardSwitch();
    })




    uiStorage.calculateButton.click(function () {
        showCalculatorResult();
    })

    var calculatorErrorState = function () {
        uiStorage.calculatorCardBlank.show();
        uiStorage.calculatorCardSwappable.hide();
        uiStorage.calculatorCardTransition.hide();
        uiStorage.calculatorErrorMessage.show();
    }

    var showCalculatorResult = function () {
        if (uiStorage.calculatorRevenueInput.val().length === 0 || uiStorage.calculatorNumberOfTeamInput.val().length === 0) {
            if(uiStorage.calculatorRevenueInput.val().length === 0){
                uiStorage.calculatorRevenueInput.css("border-color", uiColorSet.formErrorBorderColor);
            }else{
                uiStorage.calculatorRevenueInput.css("border-color", uiColorSet.formNormalBorderColor);
            }
            if(uiStorage.calculatorNumberOfTeamInput.val().length === 0){
                uiStorage.calculatorNumberOfTeamInput.css("border-color", uiColorSet.formErrorBorderColor);
            }else{
                uiStorage.calculatorNumberOfTeamInput.css("border-color", uiColorSet.formNormalBorderColor);
            }
            calculatorErrorState();
            return;
        } else if (getRevenueInput() < 0 || getNumberOfTeam() < 0) {
            if(getRevenueInput() < 0){
                uiStorage.calculatorRevenueInput.css("border-color", uiColorSet.formErrorBorderColor);
            }else{
                uiStorage.calculatorRevenueInput.css("border-color", uiColorSet.formNormalBorderColor);
            }
            if(getNumberOfTeam() < 0){
                uiStorage.calculatorNumberOfTeamInput.css("border-color", uiColorSet.formErrorBorderColor);
            }else{
                uiStorage.calculatorNumberOfTeamInput.css("border-color", uiColorSet.formNormalBorderColor);
            }
            calculatorErrorState();
            return;
        }


        uiStorage.calculatorCardBlank.hide();
        //hide card to show transition block
        uiStorage.calculatorCardSwappable.hide();
        uiStorage.calculatorErrorMessage.hide();
        uiStorage.calculatorCardTransition.show();
        uiStorage.calculatorRevenueInput.css("border-color", uiColorSet.formNormalBorderColor);
        uiStorage.calculatorNumberOfTeamInput.css("border-color", uiColorSet.formNormalBorderColor);

        setTimeout(function () {
            uiStorage.calculatorCardTransition.hide();
            uiStorage.calculatorCardSwappable.show();
        }, 1000);

        if (isCrmApiPhoneSupportChecked()) {
            //alert("enterprise");

            showEnterpriseOnCalculator();
        } else {
            if (getNumberOfTeam() > 3) {
                showEnterpriseOnCalculator();
            } else if (getNumberOfTeam() <= 3 && getNumberOfTeam() >= 0) {


                if (getRevenueInput() < 25000 && getRevenueInput() >= 0) {
                    if (isWebsiteChecked()) {
                        showPnpOnCalculator();
                    } else {
                        showExplorerOnCalculator();
                    }
                } else if (getRevenueInput() >= 25000 && getRevenueInput() < 572000) {
                    if (isWebsiteChecked()) {
                        showPnpOnCalculator();
                    } else {
                        showByoOnCalculator();
                    }
                } else {
                    showEnterpriseOnCalculator();
                }
            }

        }

        //console.log("outter methods + " + console.log(uiStorage.calculatorCardSwappable.css("display")));
    }


    uiStorage.calculatorBillingCheckbox.change(function () {
        if (uiStorage.calculatorBillingCheckbox.is(':checked')) {
            uiStorage.billingCheckbox.prop('checked', true);
            uiStorage.billingToggleDot.css({ float: "right" });
            //console.log("calculator checked");
        } else {
            uiStorage.billingCheckbox.prop('checked', false);
            //console.log(uiStorage.billingCheckbox.prop('checked'));

            uiStorage.billingToggleDot.css({ float: "left" });
            //console.log("calculator unchecked");
        }

        costSwitch();
    })

    var getRevenueInput = function () {
        //console.log(uiStorage.calculatorRevenueInput.val());

        return parseFloat(uiStorage.calculatorRevenueInput.val());
    }

    var getNumberOfTeam = function () {
        //console.log(uiStorage.calculatorNumberOfTeamInput.val());
        return parseFloat(uiStorage.calculatorNumberOfTeamInput.val());
    }


    var isWebsiteChecked = function () {
        if (uiStorage.calculatorWebsiteCheckbox.is(':checked')) {
            return true;
        } else {
            return false;
        }
    }

    var isCrmApiPhoneSupportChecked = function () {
        if (uiStorage.calculatorCrmCheckbox.is(':checked') || uiStorage.calculatorApiCheckbox.is(':checked') || uiStorage.calculatorPhoneSupportCheckbox.is(':checked')) {
            return true;
        } else {
            return false;
        }
    }


    var showExplorerOnCalculator = function () {
        calculatorResult = calculatorResultOptions.explorer;

        uiStorage.calculatorLottieExplorer.show();
        uiStorage.calculatorLottieByo.hide();
        uiStorage.calculatorLottiePnp.hide();
        uiStorage.calculatorLottieEnterprise.hide();

        uiStorage.calculatorBillingBlock.show();


        //set checkbox unchecked(annual)
        //set initial state of toggle to left(annual)

        checkBillingFrenquencyAnnual();

        uiStorage.calculatorPackageLabel.html(packageNameText.explorer);

        var selectedCurrency = uiStorage.currencySelectField.val().toLowerCase();

        switch (selectedCurrency) {
            //select usd, initial state is annual cost
            case 'usd':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyUSD);
                uiStorage.calculatorCost.html(!billingFrequencyAnnual ? packageCostPerMonth.explorerUSDAnnual : packageCostPerMonth.explorerUSDMonthly);
                break;

            //select aud, initial state is annual cost
            case 'aud':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyAUD);
                uiStorage.calculatorCost.html(!billingFrequencyAnnual ? packageCostPerMonth.explorerAUDAnnual : packageCostPerMonth.explorerAUDMonthly);
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

    var showByoOnCalculator = function () {
        calculatorResult = calculatorResultOptions.byo;

        uiStorage.calculatorLottieExplorer.hide();
        uiStorage.calculatorLottieByo.show();
        uiStorage.calculatorLottiePnp.hide();
        uiStorage.calculatorLottieEnterprise.hide();

        uiStorage.calculatorBillingBlock.show();

        //set checkbox unchecked(annual)
        //set initial state of toggle to left(annual)
        checkBillingFrenquencyAnnual();


        uiStorage.calculatorPackageLabel.html(packageNameText.byo);


        var selectedCurrency = uiStorage.currencySelectField.val().toLowerCase();

        switch (selectedCurrency) {
            //select usd, initial state is annual cost
            case 'usd':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyUSD);
                uiStorage.calculatorCost.html(!billingFrequencyAnnual ? packageCostPerMonth.byoUSDAnnual : packageCostPerMonth.byoUSDMonthly);
                break;

            //select aud, initial state is annual cost
            case 'aud':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyAUD);
                uiStorage.calculatorCost.html(!billingFrequencyAnnual ? packageCostPerMonth.byoAUDAnnual : packageCostPerMonth.byoAUDMonthly);
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

    var showPnpOnCalculator = function () {
        calculatorResult = calculatorResultOptions.pnp;

        uiStorage.calculatorLottieExplorer.hide();
        uiStorage.calculatorLottieByo.hide();
        uiStorage.calculatorLottiePnp.show();
        uiStorage.calculatorLottieEnterprise.hide();

        uiStorage.calculatorBillingBlock.show();

        //set checkbox unchecked(annual)
        //set initial state of toggle to left(annual)
        checkBillingFrenquencyAnnual();

        uiStorage.calculatorPackageLabel.html(packageNameText.pnp);

        var selectedCurrency = uiStorage.currencySelectField.val().toLowerCase();

        switch (selectedCurrency) {
            //select usd, initial state is annual cost
            case 'usd':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyUSD);
                uiStorage.calculatorCost.html(!billingFrequencyAnnual ? packageCostPerMonth.pnpUSDAnnual : packageCostPerMonth.pnpUSDMonthly);
                break;

            //select aud, initial state is annual cost
            case 'aud':
                uiStorage.calculatorCurrencyLabel.html(currencyTextAndSign.currencyAUD);
                uiStorage.calculatorCost.html(!billingFrequencyAnnual ? packageCostPerMonth.pnpAUDAnnual : packageCostPerMonth.pnpAUDMonthly);
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

    var showEnterpriseOnCalculator = function () {
        calculatorResult = calculatorResultOptions.enterprise;

        uiStorage.calculatorLottieExplorer.hide();
        uiStorage.calculatorLottieByo.hide();
        uiStorage.calculatorLottiePnp.hide();
        uiStorage.calculatorLottieEnterprise.show();

        uiStorage.calculatorBillingBlock.hide();

        //set checkbox unchecked(annual)
        //set initial state of toggle to left(annual)
        checkBillingFrenquencyAnnual();

        uiStorage.calculatorPackageLabel.html(packageNameText.enterprise);


        //hide cost and currency label, show Call us label
        uiStorage.calculatorEnterpriseCallUsLabel.show();
        uiStorage.calculatorCurrencyLabel.hide();
        uiStorage.calculatorCost.hide();
        uiStorage.calculatorPerMonthText.hide();

        var selectedCurrency = uiStorage.currencySelectField.val().toLowerCase();
        uiStorage.calculatorBookingFee.html(bookingFeeLabel.enterpriseBookingFee);

    }

    var checkBillingFrenquencyAnnual = function () {
        billingFrequencyAnnual = uiStorage.billingCheckbox.is(':checked') ? true : false;

        // console.log('checkBillingFrequencyAnnual is    ' + uiStorage.billingCheckbox.prop('checked'));

        //if billing block is switched to monthly
        if (billingFrequencyAnnual) {

            // if(uiStorage.calculatorBillingCheckbox.not(':checked')){
            uiStorage.calculatorBillingCheckbox.prop('checked', true);
            uiStorage.calculatorToggleDot.css({ float: "right" });
            //     console.log("check billing frequency annual checked");

            // }  

        } else {
            //if billing block is switched to annualy    
            // if(uiStorage.calculatorBillingCheckbox.is(':checked')){
            uiStorage.calculatorBillingCheckbox.prop('checked', false);
            uiStorage.calculatorToggleDot.css({ float: "left" });
            // console.log("check billing frequency annual unchecked");
            // }
        }
    }






















    var cardSwitch = function () {

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



    var costSwitch = function () {
        //switching to usd

        if (uiStorage.currencySelectField.val().toLowerCase() === "usd") {
            //alert(uiStorage.currencySelectField.val());
            if (uiStorage.billingCheckbox.is(':checked')) {
                //switch to monthly

                uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerUSDMonthly);
                uiStorage.byoCostAmount.html(packageCostPerMonth.byoUSDMonthly);
                uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpUSDMonthly);


                //updating cost amount label on the left hand side
                uiStorage.explorerCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.explorerUSDMonthly);
                });
                uiStorage.byoCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.byoUSDMonthly);
                });
                uiStorage.pnpCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.pnpUSDMonthly);
                });



            } else {
                //alert("switch to annually");
                uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerUSDAnnual);
                uiStorage.byoCostAmount.html(packageCostPerMonth.byoUSDAnnual);
                uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpUSDAnnual);

                uiStorage.explorerCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.explorerUSDAnnual);
                });
                uiStorage.byoCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.byoUSDAnnual);
                });
                uiStorage.pnpCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.pnpUSDAnnual);
                });

            }

            uiStorage.currencyText.each(function () {
                $(this).html(currencyTextAndSign.currencyUSD);
            });

            uiStorage.currencyTextLeft.each(function () {
                $(this).html(currencyTextAndSign.currencyUSD);
            });


        } else {


            //switching to aud
            if (uiStorage.billingCheckbox.is(':checked')) {
                //alert("switch to monthly");
                uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerAUDMonthly);
                uiStorage.byoCostAmount.html(packageCostPerMonth.byoAUDMonthly);
                uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpAUDMonthly);


                uiStorage.explorerCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.explorerAUDMonthly);
                });
                uiStorage.byoCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.byoAUDMonthly);
                });
                uiStorage.pnpCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.pnpAUDMonthly);
                });

            } else {
                //alert("switch to annually");
                uiStorage.explorerCostAmount.html(packageCostPerMonth.explorerAUDAnnual);
                uiStorage.byoCostAmount.html(packageCostPerMonth.byoAUDAnnual);
                uiStorage.pnpCostAmount.html(packageCostPerMonth.pnpAUDAnnual);

                uiStorage.explorerCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.explorerAUDAnnual);
                });
                uiStorage.byoCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.byoAUDAnnual);
                });
                uiStorage.pnpCostAmountLeft.each(function () {
                    $(this).html(packageCostPerMonth.pnpAUDAnnual);
                });
            }

            uiStorage.currencyText.each(function () {
                $(this).html(currencyTextAndSign.currencyAUD);
            });

            uiStorage.currencyTextLeft.each(function () {
                $(this).html(currencyTextAndSign.currencyAUD);
            });
        }

        updatePricingTable();
        if (calculatorResult != null) {
            showCalculatorResult();
            // console.log('cost switch is called');
        }
    }



    var updatePricingTable = function () {
        //switching to usd

        if (uiStorage.currencySelectField.val().toLowerCase() === "usd") {
            //alert(uiStorage.currencySelectField.val());
            if (uiStorage.billingCheckbox.is(':checked')) {
                //switch to monthly

                uiStorage.pricingTableAmountExplorer.html(packageCostPerMonth.explorerUSDMonthly);
                uiStorage.pricingTablAmounteByo.html(packageCostPerMonth.byoUSDMonthly);
                uiStorage.pricingTableAmountPnp.html(packageCostPerMonth.pnpUSDMonthly);

            } else {
                //alert("switch to annually");
                uiStorage.pricingTableAmountExplorer.html(packageCostPerMonth.explorerUSDAnnual);
                uiStorage.pricingTablAmounteByo.html(packageCostPerMonth.byoUSDAnnual);
                uiStorage.pricingTableAmountPnp.html(packageCostPerMonth.pnpUSDAnnual);
            }

            uiStorage.pricingTableCurrency.each(function () {
                $(this).html(currencyTextAndSign.currencyUSD);
            });
        } else {


            //switching to aud
            if (uiStorage.billingCheckbox.is(':checked')) {
                //alert("switch to monthly");
                uiStorage.pricingTableAmountExplorer.html(packageCostPerMonth.explorerAUDMonthly);
                uiStorage.pricingTablAmounteByo.html(packageCostPerMonth.byoAUDMonthly);
                uiStorage.pricingTableAmountPnp.html(packageCostPerMonth.pnpAUDMonthly);
            } else {
                //alert("switch to annually");
                uiStorage.pricingTableAmountExplorer.html(packageCostPerMonth.explorerAUDAnnual);
                uiStorage.pricingTablAmounteByo.html(packageCostPerMonth.byoAUDAnnual);
                uiStorage.pricingTableAmountPnp.html(packageCostPerMonth.pnpAUDAnnual);

            }

            uiStorage.pricingTableCurrency.each(function () {
                $(this).html(currencyTextAndSign.currencyAUD);
            });
        }
    }

});


