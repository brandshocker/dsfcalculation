/////////////////////////// COMMON VARIABLES
active = "calculation";

/////////////////////////// IMPORTANT
o = function(i){ console.log(i); }
w = function(i,c){$(i).html(c)}

/////////////////////////// COMMON FUNCTION

// Open Navigation
navOpen = function()
{
    // o('Navigation panel opened');

    $('#sidenav').css('width', '200px');
    $('#headerImage').css('left', '120%');
    $('#newCalc').css('top', '150%');
    $('#main').css('margin-left', '200px');
    $('#menuCloser').css('visibility','visible');
    $('#menuCloser').css('opacity','0.8');
    active = "nav";
}

// Close Navigation
navClose = function()
{
    // o('Navigation panel close');
    
    $('#sidenav').css('width', '0px');
    $('#headerImage').css('left', 'calc(100% - 200px)');
    
    $('#main').css('margin-left', '0px');
    $('#menuCloser').css('opacity','0');
    setTimeout(function(){
        $('#menuCloser').css('visibility','hidden');
        // check if the page is calculation 
        if(activePage == "calculation"){
            $('#newCalc').css('top', '150%');
        } else {
            $('#newCalc').css('top', 'calc(100% - 100px)');
        }
    }, 100); 
    active = "none"
}

// Show minimo box
showMinimo = function() 
{
    $('#minimo').css({"left":"0px","visibility":"visible","opacity":"1"});
    navClose();
    active = "minimo";
    StatusBar.hide();
}

// Hide minimo box
hideMinimo = function()
{
$('#minimo').css('opacity','0');
    setTimeout(function() {
        $('#minimo').css({"left":"200px","visibility":"hidden"});
    }, 1000);
    active = "none";
    StatusBar.show();
}

function showPopup()
{
    $('#popup').css('margin-left','0%');
    active = "popup";
    StatusBar.hide();
}

function hidePopup()
{
    $('#popup').css('margin-left','100%');
    active = "none";
    StatusBar.show();
}

function setPopup(ele, val)
{
    if(val==null)
    {
        val="&nbsp;";
    }
    $(ele).html(val);
}

toast = function(i)
{
    w('#toast-message',i);
    $('#toast').css({'display':'block','opacity':'1'});
    o('Toast : ' + i);
    navigator.vibrate(50);
}

hideToast = function()
{
    $('#toast').css('opacity','0');
    setTimeout(function(){$('#toast').css('display','none');},250);
}

shareSms = function()
{
    hideShare();
}

shareWa = function()
{
    hideShare();
}

showShare = function(i)
{
    w('#toast-message',i);
    $('#popup-toast').css({'display':'block','opacity':'1'});
    $('#popup-share').css('opacity','0');

    navigator.vibrate(50);
    active = "share";
}

hideShare = function()
{
    $('#popup-toast').css('opacity','0');
    $('#popup-share').css('opacity','1');
    setTimeout(function(){$('#popup-toast').css('display','none');},250);
    active = "popup";
}

selectCalculation = function(e)
{
    if(e == "auto")
        {
            o('Calculation mode : Auto');
            $("#tabAuto").attr('class', 'calcTabActive');
            $("#tabManual").attr('class', 'calcTab');
            $("#tabMarker").css('margin-left','5%');
            $("#calcBlock").css('margin-left','0%');
        }
    if(e == "manual")
        {       
            o('Calculation mode : Manual');
            $("#tabAuto").attr('class', 'calcTab');
            $("#tabManual").attr('class', 'calcTabActive');
            $("#tabMarker").css('margin-left','55%');
            $("#calcBlock").css('margin-left','-100%');
        }
    
}


// Content seletor
selectContent = function(i)
{
    if(i == "calculation")
    {
        navClose();
        activePage = "calculation";
        $('#container').css('margin-left','0%');
        $('#mark').css('top','0px');
        $('#shadow').css('opacity', '0');
        
        setTimeout(function(){
            $('#shadow').css('display', 'none');
        }, 100); 
    } else {
        // not calculation
        $('#shadow').css('display', 'block');
        $('#shadow').css('opacity', '1');
    }

    if(i == "package")
    {
        navClose();
        activePage = "package";
        $('#container').css('margin-left','-100%');
        $('#mark').css('top','45px');
    }

    if(i == "news")
    {
        navClose();
        activePage = "news";
        $('#container').css('margin-left','-200%');
        $('#mark').css('top','90px');
    }
    
    if(i == "help")
    {
        navClose();
        activePage = "help";
        $('#container').css('margin-left','-300%');
        $('#mark').css('top','135px');
    }
    
    o('Page : ' + activePage);
}

// Trigger when windows is loaded
window.onload = function()
{
    o('Minimo Core v 1.2');
    o('Preload Complete');
    o('Ready to go ...');
    o('===================');
    
    $("#loader").hide();
}


// Preload jquery
$(function()
{
    o( "Initializing application" );
    
    // hide the preloader
    $("#loader").hide();
    
    // disable enter and tab
    $(document).keydown(function(objEvent) {
        if (objEvent.keyCode == 9) {  //tab pressed
            objEvent.preventDefault(); // stops its action
        }
        if (objEvent.keyCode == 13) {  //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    })
    
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener('deviceready', function(){
    StatusBar.backgroundColorByHexString('#b72025');});
});



/////////////////////////////////////////////////////////////////////////////// FORM HANDLING ///////////////////////////////

r   = function(input)
{
    return $(input).val();
}

onBackKeyDown = function()
{
    switch(active){
        case "minimo":
            hideMinimo();
            break;
        case "popup":
            hidePopup();
            break;
        case "nav":
            navClose();
            break;
        case "share":
            hideShare();
            break;
        default:
            navigator.app.backHistory();
    }
}

rc = function (i) 
{   
    var obj = window[i];
    o(i + " : " + obj); 
};

function numberize(input)
{
    var nStr = input.value + '';
    nStr = nStr.replace( /\,/g, "");
    var x = nStr.split( '.' );
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while ( rgx.test(x1) ) {
        x1 = x1.replace( rgx, '$1' + ',' + '$2' );
    }
    input.value = x1 + x2;
}

// function number Focus
numberFocus = function(i)
{
    var str = $(i).val();
    str = str.replace( /\,/g, "");
    $(i).val(Number(str));
}

format = function(val)
{
    var nStr = val + '';
    nStr = nStr.replace( /\,/g, "");
    var x = nStr.split( '.' );
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while ( rgx.test(x1) ) {
        x1 = x1.replace( rgx, '$1' + '.' + '$2' );
    }
    return x1 + x2;
}

reround = function(num)
{
    num     = Math.ceil(num);

    num     = num.toString();

    if(num.length > 3)
        {
            var last    = num.substring(num.length - 3);
            var first   = num.substring(0, num.length - 3) + "000";
            // p(num + " : " + last);
            if(last == "000"){
                first = Number(first);
            } else {
                if(last <= 500)
                {
                    first = Number(first) + 500;
                } else {
                    first = Number(first) + 1000;
                }
            }
        } else {
            first = num;
        }


    return first; 
}

numberBlur = function(i)
{
    $(i).attr('type','text');
    numberize(i);
}

// percentize
inputPercentize = function (input)
{
    var str = input.value.replace(/%/g, "");
    
    if(str == "")
        {
            input.value = "";
        } else {
            str     = str + "%";
            input.value = str;
        }
};

removePercent = function(input)
{
    var str = input.replace(/%/g, "");
    str = str.replace(/,/g, ".");
    str = str / 100;
    return Number(str);
}

validateNumber  = function(input)
{
    var str = input.replace(/[^0-9\.]+/g, "");
    return Number(str);
}

advFormSubmit = function()
{
    
    // GET FORM DATA
    
    advOtr          = validateNumber(r('#adv-otr'));
    advTenor        = r('#adv-tenor');
    advRate         = removePercent(r('#adv-rate'));
    advInsurance    = r('#adv-insurance');
    advAdm          = validateNumber(r('#adv-adm'));
    advTjh          = validateNumber(r('#adv-tjh'));
    advProvision    = removePercent(r('#adv-provision'));
    advInsInclude   = r('#adv-insInclude');
    advAddb         = r('#adv-addb');
    advMethod       = r('#adv-method');
    advExpectDp     = r('#adv-expectDp');
    advExpectTdp    = validateNumber(r('#adv-expectTdp'));
    advExpectUsl    = validateNumber(r('#adv-expectUsl'));
    
//    rc("advOtr");
//    rc("advTenor");
//    rc("advRate");
//    rc("advInsurance");
//    rc("advAdm");
//    rc("advTjh");
//    rc("advProvision");
//    rc("advInsInclude");
//    rc("advAddb");
//    rc("advExpectDp");
//    rc("advExpectTdp");
//    rc("advExpectUsl");
    
    // validating form
    
    if(advOtr == '')
        {
            toast('Silahkan masukan harga OTR');
        } 
    else if(advRate == '')
        {
           toast('Silahkan masukan rate bunga');
        } 
    else if(advAdm == '')
        {
            toast('Anda belum menginput biaya administrasi');
        }
    else
        {
            //var path = window.location.href.replace('index.html', '');
            $.getJSON("insurance.json", function(myIns)
            {
                    
                // insurance selector
                var otr1 = advOtr * myIns['depr1'];
                var otr2 = advOtr * myIns['depr2'];
                var otr3 = advOtr * myIns['depr3'];
                var otr4 = advOtr * myIns['depr4'];
                var otr5 = advOtr * myIns['depr5'];

                switch(advInsurance){
                    case "CV":
                        o('Insurance is CV Allrisk');
                        var ins1 = otr1 * ((myIns['cvAllrisk']/100).toFixed(4));
                        var ins2 = otr2 * ((myIns['cvAllrisk']/100).toFixed(4));
                        var ins3 = otr3 * ((myIns['cvAllrisk']/100).toFixed(4));
                        var ins4 = otr4 * ((myIns['cvAllrisk']/100).toFixed(4));
                        var ins5 = otr5 * ((myIns['cvAllrisk']/100).toFixed(4));

                        break;

                    case "TLO":
                        o('Insurance is CV TLO');
                        var ins1 = otr1 * ((myIns['cvTlo']/100).toFixed(4));
                        var ins2 = otr2 * ((myIns['cvTlo']/100).toFixed(4));
                        var ins3 = otr3 * ((myIns['cvTlo']/100).toFixed(4));
                        var ins4 = otr4 * ((myIns['cvTlo']/100).toFixed(4));
                        var ins5 = otr5 * ((myIns['cvTlo']/100).toFixed(4));

                        break;

                    case "BUS":
                        o('Insurance is BUS Allrisk');
                        var ins1 = otr1 * ((myIns['busAllrisk']/100).toFixed(4));
                        var ins2 = otr2 * ((myIns['busAllrisk']/100).toFixed(4));
                        var ins3 = otr3 * ((myIns['busAllrisk']/100).toFixed(4));
                        var ins4 = otr4 * ((myIns['busAllrisk']/100).toFixed(4));
                        var ins5 = otr5 * ((myIns['busAllrisk']/100).toFixed(4));

                        break;

                    case "BUSTLO":
                        o('Insurance is BUS Allrisk');
                        var ins1 = otr1 * ((myIns['busTlo']/100).toFixed(4));
                        var ins2 = otr2 * ((myIns['busTlo']/100).toFixed(4));
                        var ins3 = otr3 * ((myIns['busTlo']/100).toFixed(4));
                        var ins4 = otr4 * ((myIns['busTlo']/100).toFixed(4));
                        var ins5 = otr5 * ((myIns['busTlo']/100).toFixed(4));

                        break;

                    case "PC":
                        var ins1 = Math.round( otr1 * insurancePick(otr1, myIns));
                        var ins2 = Math.round( otr2 * insurancePick(otr2, myIns));
                        var ins3 = Math.round( otr3 * insurancePick(otr3, myIns));
                        var ins4 = Math.round( otr4 * insurancePick(otr4, myIns));
                        var ins5 = Math.round( otr5 * insurancePick(otr5, myIns));

                      /*o((otr1) + " : rate " + insurancePick(otr1, myIns));
                        o((otr2) + " : rate " + insurancePick(otr2, myIns));
                        o((otr3) + " : rate " + insurancePick(otr3, myIns));
                        o((otr4) + " : rate " + insurancePick(otr4, myIns));
                        o((otr5) + " : rate " + insurancePick(otr5, myIns));*/
                        break;
                    default:
                        toast('Invalid insurance type : err001');
                } /* SWITCH INSURANCE*/

                switch(advTenor){
                    case "12":
                        o('tenor is 12 month');
                        var insuranceTotal  = ins1;
                        var tjhTotal        = advTjh;
                        break;
                    case "24":
                        o('tenor is 24 month');
                        var insuranceTotal  = ins1 + ins2;
                        var tjhTotal        = advTjh * 2;
                        break;
                    case "25":
                        o('tenor is 25 month');
                        var insuranceTotal = ins1 + ins2;
                        var tjhTotal       = advTjh * 2;
                        break;
                    case "36":
                        o('tenor is 36 month');
                        var insuranceTotal = ins1 + ins2 + ins3;
                        var tjhTotal       = advTjh * 3;
                        break;
                    case "48":
                        o('tenor is 48 month');
                        var insuranceTotal = ins1 + ins2 + ins3 + ins4;
                        var tjhTotal       = advTjh * 4;
                        break;
                    case "60":
                        o('tenor is 60 month');
                        var insuranceTotal = ins1 + ins2 + ins3 + ins4 + ins5;
                        var tjhTotal       = advTjh * 5;
                        break;
                    default:
                        toast('Invalid tenor occured : err002');
                } /*SWITCH TENOR*/

                // GET THE NI INSURANCE 2,3,4,5
                var insuranceNI = (insuranceTotal - ins1) + (tjhTotal - advTjh)

                switch(advMethod){
                    case "DP":
                        o('Calculate by DP');
                        calculate(advOtr,advTenor,advExpectDp,advAdm,advRate,ins1,insuranceTotal,advTjh,insuranceNI,advProvision,advInsInclude,advAddb)
                        break;
                    case "TDP":
                        o('Calculate by TDP');
                        break;
                    case "USL":
                        o('Calculate by USL');
                        break;
                    default:
                        toast('Invalid method selected : err003');
                } /*SWITCH ADVMETHOD*/
            });
        }
};

calculate = function(otr,tenor,dp,adm,rate,ins1,ins2,tjh,insPh,provision,insInc,addb)
{
    // o('Calculate \n{ \n   otr : ' + otr + "\n   tenor : " + tenor + "\n   dp : " + dp + "\n   adm : " + adm + "\n   rate : " + rate + "\n   ins1 : " + ins1 + "\n   ins2 : " + ins2 + "\n   tjh : " + tjh + "\n   insPh : " + insPh + "\n   provision : " + provision + "\n   insIncl : " + insInc + "\n   addb : " + addb + "\n}")
    var ADM         = adm;
    var DP          = otr * dp;
    var DP_PERCENT  = ((dp * 100).toFixed(2)) + " %";
    var NI_PURE     = otr - DP;
    var PROVISION   = NI_PURE * provision;
    
    // o('DP : ' + DP + ', NI PURE : ' + NI_PURE + ", PROVISION : " + PROVISION); // CHECK RESULT

    if(insInc == 'yes')
        {
            NI_TOTAL    = NI_PURE + insPh;
            INSURANCE   = ins1;
            INSTEXT     = 'Th Pertama'
        } else {
            NI_TOTAL    = NI_PURE;
            INSURANCE   = ins2
            INSTEXT     = 'Dimuka'
        }
    
    // CALCULATE USL
    var USL = (NI_TOTAL + ((NI_TOTAL * rate) * (tenor / 12))) / tenor;
    
    if(addb == "no")
        {
            var TDP     = DP + ADM + INSURANCE + PROVISION + USL;
            var TENOR   = '' + (tenor - 1);  
        } else {
            var TDP     = DP + ADM + INSURANCE + PROVISION;
            var TENOR   = '' + tenor + ' [ADDB]';
        }
    
    //o('Calculate \n{ \n   otr : ' + otr + "\n   tenor : " + TENOR + "\n   dp : " + DP + "\n   adm : " + ADM + "\n   rate : " + rate + "\n   asuransi : " + INSURANCE + "\n   usl : " + USL + "\n   tpd : " + TDP + "\n   provisi : " + PROVISION + "/ " + provision + "\n   insurance incl : " + insInc + "\n   addb : " + addb + "\n}");
    
    var strWa = ('OTR : Rp. ' + format(Math.ceil(otr)) + "\nTenor : x " + TENOR + "\nDP : Rp. " + format(Math.ceil(DP)) + " / " + DP_PERCENT + "\nAdm : Rp. " + format(Math.ceil(ADM)) + "\nRate : " + ((rate * 100).toFixed(2) + "%") + "\nAsuransi : Rp. " + format(Math.ceil(INSURANCE)) + " " + INSTEXT + "\nProvisi : Rp. " + format(Math.ceil(PROVISION)) + " / " + ((provision * 100).toFixed(2) + "%\nAngsuran : Rp. " + format(reround(USL)) + "\nTDP : Rp. " + format(reround(TDP))) + "\n(DSF Angga - 08112754802, brandshocker@gmail.com)")
    
    var strSms = ('OTR : ' + format(Math.ceil(otr)) + ", Tenor : x " + TENOR + ", DP : " + format(Math.ceil(DP)) + " / " + ((dp * 100).toFixed(2) + "%2525") + ", Adm : " + format(Math.ceil(ADM)) + ", Rate : " + ((rate * 100).toFixed(2) + "%2525") + ", Asuransi : " + format(Math.ceil(INSURANCE)) + " " + INSTEXT + ", Provisi : " + format(Math.ceil(PROVISION)) + " / " + ((provision * 100).toFixed(2) + "%2525, Angsuran : " + format(reround(USL)) + ", TDP : " + format(reround(TDP))) + ", (DSF Angga - 08112754802, brandshocker@gmail.com)")
    
    var shareTextWa = encodeURIComponent(strWa);
    var shareTextSms = encodeURIComponent(strSms);
    
    $('#pop-share-wa').on('click',function(){ window.open('whatsapp://send?text=' + shareTextWa, '_system'); });
    $('#pop-share-sms').on('click',function(){ window.open('sms:?body=' + strSms, '_system'); });
    
    // DISPLAY ON POPUP CONTAINER
    setPopup('#popup-otr',format(Math.ceil(otr)));
    setPopup('#popup-csp',format(Math.ceil(DP)));
    setPopup('#popup-adm',format(Math.ceil(ADM)));
    setPopup('#popup-insurance',format(Math.ceil(INSURANCE)));
    setPopup('#popup-tjh',format(Math.ceil(advTjh)));
    setPopup('#popup-provision',format(Math.ceil(PROVISION)));
    setPopup('#popup-usl',format(reround(USL)));
    setPopup('#popup-tdp',format(reround(TDP)));
    setPopup('#popup-tenor',TENOR);
    setPopup('#popup-insText',INSTEXT);
    setPopup('#popup-dpText',DP_PERCENT);
    setPopup('#popup-rate',(rate * 100).toFixed(2) + "%");
    setPopup('#popup-textProvision',(provision * 100).toFixed(2) + "%");
    
    showPopup();
    navigator.vibrate(50);
}

advMethodSelector = function()
{
    navigator.vibrate(40);
    var sel = r('#adv-method');
    switch(sel){
        case "DP":
            $('#adv-expectDp').css('display','block');
            $('#adv-expectTdp').css('display','none');
            $('#adv-expectUsl').css('display','none');
            break;
        case "TDP":
            $('#adv-expectDp').css('display','none');
            $('#adv-expectTdp').css('display','block');
            $('#adv-expectUsl').css('display','none');
            break;
        case "USL":
            $('#adv-expectDp').css('display','none');
            $('#adv-expectTdp').css('display','none');
            $('#adv-expectUsl').css('display','block');
            break;
     }
}

insurancePick = function (price, arr)
{
    if(price > 0 && price <= 125000000){
        return (arr['pc1']/100).toFixed(4);
    }
    else if(price > 125000000 && price <= 200000000){
        return (arr['pc2']/100).toFixed(4);
    }
    else if(price > 200000000 && price <= 400000000){
        return (arr['pc3']/100).toFixed(4);
    }
    else if(price > 400000000 && price <= 800000000){
        return (arr['pc4']/100).toFixed(4);
    }
    else if(price > 800000000){
        return (arr['pc5']/100).toFixed(4);
    }
}

function advInsIncToggle()
{
    navigator.vibrate(50);
    
    if($('#adv-insInclude').val() == "no"){
        $('#adv-insIncToggle').css('background-position','bottom');
        $('#adv-insInclude').val('yes');
        o('Insurance include NI');
    } else {
        $('#adv-insIncToggle').css('background-position','top');
        $('#adv-insInclude').val('no');
         o('Insurance in Advance');
    }
}

function advAddbToggle()
{
    navigator.vibrate(50);
    
    if($('#adv-addb').val() == "no"){
        $('#adv-addbToggle').css('background-position','bottom');
        $('#adv-addb').val('yes');
        o('Installment in Arrear');
    } else {
        $('#adv-addbToggle').css('background-position','top');
        $('#adv-addb').val('no');
        o('Installment in Advance');
    }
}