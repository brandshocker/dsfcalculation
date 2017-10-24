/////////////////////////// COMMON VARIABLES
appVersion = "1.3.0";
API = "https://dsfcalculation.000webhostapp.com/api/";
active = "calculation";
activePage = "calculation";
signature = localStorage.getItem('signature');
iteration = 1;
admNpwp = 2325000;
admNonNpwp = 2625000;
advSeek = false;
dpSeek = 0.9;
/////////////////////////// IMPORTANT
o = function (i) {
    console.log(i);
}
w = function (i, c) {
    $(i).html(c)
}

/////////////////////////// COMMON FUNCTION

// Open Navigation
navOpen = function () {
    // o('Navigation panel opened');

    $('#sidenav').css('width', '200px');
    $('#headerImage').css('left', '120%');
    $('#newCalc').css('top', '150%');
    $('#main').css('margin-left', '200px');
    $('#menuCloser').css('visibility', 'visible');
    $('#menuCloser').css('opacity', '0.8');
    active = "nav";
}

pop = function (msg, t) {

    if (t == null) {
        t = 2000;
    }

    $('#pop').html(msg);
    $('#pop').css('top', '90%');
    $('#pop').css('opacity', '1');

    setTimeout(function () {
        $('#pop').css('opacity', '0');
    }, t);

    setTimeout(function () {
        $('#pop').css('top', '110%');
    }, t + 600);

}

navClose = function () {
    // o('Navigation panel close');

    $('#sidenav').css('width', '0px');
    $('#headerImage').css('left', 'calc(100% - 200px)');

    $('#main').css('margin-left', '0px');
    $('#menuCloser').css('opacity', '0');
    setTimeout(function () {
        $('#menuCloser').css('visibility', 'hidden');
        // check if the page is calculation 
        if (activePage == "calculation") {
            $('#newCalc').css('top', '150%');
        } else if (activePage == "package") {
            $('#newCalc').css('top', '150%');
        } else {
            $('#newCalc').css('top', 'calc(100% - 100px)');
        }
    }, 100);
    active = "none"
}

showMinimo = function () {
    $('#minimo').css({
        "left": "0px",
        "visibility": "visible",
        "opacity": "1"
    });
    navClose();
    active = "minimo";
    StatusBar.hide();
}

hideMinimo = function () {
    $('#minimo').css('opacity', '0');
    setTimeout(function () {
        $('#minimo').css({
            "left": "200px",
            "visibility": "hidden"
        });
    }, 1000);
    active = "none";
    StatusBar.show();
}

registerProcess = function () {
    if (network == "online") {
        $("#loader").show();

        var uname = $('#reg-username').val().toLowerCase();
        var email = $('#reg-email').val();
        var pass = $('#reg-password').val();
        var pass2 = $('#reg-password-2').val();
        var data = "username=" + uname + "&email=" + email + "&password=" + pass + "&gps_lat=" + gps_lat + "&gps_long=" + gps_long;

        if (uname == '') {
            $("#loader").hide();
            toast('Silahkan masukan username');
        } else if (email == '') {
            $("#loader").hide();
            toast('Silahkan masukan Email anda');
        } else if (pass == '') {
            $("#loader").hide();
            toast('Masukan Password anda');
        } else if (pass != pass2) {
            $("#loader").hide();
            toast('Konfirmasi password salah');
        } else {
            o('Do Register');
            // AJAX Code To Submit Form.
            $.ajax({
                type: "GET",
                url: API + "mod_register.php?",
                data: data,
                cache: false,
                success: function (result) {
                    $("#loader").hide();
                    switch (result) {
                        case "success":
                            localStorage.setItem('uname', uname);
                            localStorage.setItem('pass', pass);
                            pop('Registrasi berhasil')
                            $('#login').css('margin-left', '300%');
                            break;
                        case "failed":
                            toast('Registrasi gagal');
                            break;
                        default:
                            toast(result);
                    }
                }
            });
        }
    } else {
        toast('Silahkan cek koneksi anda');
    }
}

logout = function () {
    $('#login').css('margin-left', '0%');
    localStorage.setItem('uname', 'null');
    localStorage.setItem('pass', 'null');
    hideMinimo();
    login_check();

}

loginProcess = function () {
    if (network == "online") {
        $('#loader').show();
        var username = $('#login-username').val().toLocaleLowerCase();
        var password = $('#login-password').val()
        var data = "username=" + username + "&password=" + password;

        $.ajax({
            type: "GET",
            url: API + "mod_check.php?",
            data: data,
            cache: false,
            success: function (result) {
                $("#loader").hide();
                switch (result) {
                    case "logged":
                        localStorage.setItem('uname', username);
                        localStorage.setItem('pass', password);
                        $('#login').css('margin-left', '100%');
                        $.ajax({
                            type: "GET",
                            url: API + "mod_userprofile.php?",
                            data: "username=" + username,
                            cache: false,
                            success: function (result) {
                                pop('Profile loaded');
                                localStorage.setItem('signature', result);
                            }
                        });

                        if (gps_lat != "") {
                            var data1 = "username=" + username + "&gps_lat=" + gps_lat + "&gps_long=" + gps_long;


                            $.ajax({
                                type: "GET",
                                url: API + "mod_update_loc.php?",
                                data: data1,
                                cache: false,
                                success: function (result) {

                                }
                            });
                        }

                        return true;
                        break;
                    case "false":
                        $('#loader').hide();
                        toast('Username dan password salah');
                        $('#login').css('margin-left', '0%');
                        $('#login-container').css('margin-left', '-100%');
                        return false;
                        break;
                    default:
                        $('#loader').hide();
                        toast('Username dan password salah');
                        $('#login').css('margin-left', '0%');
                        $('#login-container').css('margin-left', '-100%');
                        return false;
                }
            }
        });
    } else {
        toast('Silahkan cek koneksi anda');
    }
}

login_check = function (username, password, gps_lat, gps_long, getTime) {
    var data = "username=" + username + "&password=" + password;

    if (localStorage.getItem('uname') != 'null') {
        $('#login').css('margin-left', '100%');
        if (gps_lat != "") {
            var data1 = "username=" + username + "&gps_lat=" + gps_lat + "&gps_long=" + gps_long + "&getTime=" + getTime;

            $.ajax({
                type: "GET",
                url: API + "mod_update_loc.php?",
                data: data1,
                cache: false,
                success: function (result) {

                }
            });
        }
    } else {
        $('#login').css('margin-left', '0%');
        $('#login-container').css('margin-left', '-200%');
        return false;
    }

}

formLogin = function () {
    $('#login-container').css('margin-left', '-100%');
}

formRegister = function () {
    $('#login-container').css('margin-left', '0');
}

showPopup = function () {
    $('#popup').css('margin-left', '0%');
    active = "popup";
    StatusBar.hide();
}

hidePopup = function () {
    $('#popup').css('margin-left', '100%');
    active = "none";
    StatusBar.show();
}

calcCount = function () {
    if (network == "online") {
        $.ajax({
            type: "GET",
            url: API + "mod_calcCount.php?",
            data: "username=" + localStorage.getItem('uname'),
            cache: false,
            success: function (result) {

            }
        });
    }
}

setPopup = function (ele, val) {
    if (val == null) {
        val = "&nbsp;";
    }
    $(ele).html(val);
}

toast = function (i) {
    w('#toast-message', i);
    $('#toast').css({
        'display': 'block',
        'opacity': '1'
    });
    o('Toast : ' + i);
    navigator.vibrate(50);
}

hideToast = function () {
    $('#toast').css('opacity', '0');
    setTimeout(function () {
        $('#toast').css('display', 'none');
    }, 250);
}

shareSms = function () {
    hideShare();
}

shareWa = function () {
    hideShare();
}

showShare = function (i) {
    w('#toast-message', i);
    $('#popup-toast').css({
        'display': 'block',
        'opacity': '1'
    });
    $('#popup-share').css('opacity', '0');

    active = "share";
}

hideShare = function () {
    $('#popup-toast').css('opacity', '0');
    $('#popup-share').css('opacity', '1');
    setTimeout(function () {
        $('#popup-toast').css('display', 'none');
    }, 250);
    active = "popup";
}

selectCalculation = function (e) {
    if (e == "auto") {
        o('Calculation mode : Auto');
        $("#tabAuto").attr('class', 'calcTabActive');
        $("#tabManual").attr('class', 'calcTab');
        $("#tabMarker").css('margin-left', '5%');
        $("#calcBlock").css('margin-left', '0%');
    }
    if (e == "manual") {
        o('Calculation mode : Manual');
        $("#tabAuto").attr('class', 'calcTab');
        $("#tabManual").attr('class', 'calcTabActive');
        $("#tabMarker").css('margin-left', '55%');
        $("#calcBlock").css('margin-left', '-100%');
    }

}

selectContent = function (i) {
    if (i == "calculation") {
        navClose();
        activePage = "calculation";
        $('#container').css('margin-left', '0%');
        $('#mark').css('top', '0px');
        $('#shadow').css('opacity', '0');

        setTimeout(function () {
            $('#shadow').css('display', 'none');
        }, 100);
    } else {
        // not calculation
        $('#shadow').css('display', 'block');
        $('#shadow').css('opacity', '1');
    }

    if (i == "package") {
        navClose();
        activePage = "package";
        $('#container').css('margin-left', '-100%');
        $('#mark').css('top', '45px');
        if (network == "online") {
            getUser();
        } else {
            toast('Silahkan coba lagi ketika ada koneksi internet');
            selectContent('calculation');
        }
    }

    if (i == "news") {
        navClose();
        activePage = "news";
        $('#container').css('margin-left', '-200%');
        $('#mark').css('top', '90px');

        if (network == "online") {
            loadNews('#content-news', API + 'mod_news.php');
        } else {
            toast('Silahkan coba lagi ketika ada koneksi internet');
            selectContent('calculation');
        }
    }

    if (i == "help") {
        navClose();
        activePage = "help";
        $('#container').css('margin-left', '-300%');
        $('#mark').css('top', '135px');

        if (network == "online") {
            loadNews('#content-help', API + 'mod_help.php');
        } else {
            toast('Silahkan coba lagi ketika ada koneksi internet');
            selectContent('calculation');
        }
    }

    o('Page : ' + activePage);
}

// Trigger when windows is loaded
window.onload = function () {
    o('Minimo Core v 1.2');
    o('Preload Complete');
    o('Ready to go ...');
    o('===================');

}

// Preload jquery
$(function () {
    o("Initializing application");

    // hide the preloader
    $("#loader").hide();

    document.addEventListener('deviceready', function () {
        document.addEventListener("backbutton", onBackKeyDown, false);

        if (window.cordova && StatusBar) {
            StatusBar.backgroundColorByHexString('#b72025');
        }

    }); // on device ready

    // disable enter and tab
    $(document).keydown(function (objEvent) {
        if (objEvent.keyCode == 9) { //tab pressed
            objEvent.preventDefault(); // stops its action
        }
        if (objEvent.keyCode == 13) { //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    })


    // check version
    $.getJSON(API + "mod_config.php", function (config) {
        var curVersion = config["appversion"];
        if (curVersion != appVersion) {
            $('#version').html('latest version : ' + curVersion);
            $('#update').show();
        } else {
            $('#update').hide();
        }
    });

    // check login
    var site_user = localStorage.getItem('uname');
    var site_pass = localStorage.getItem('pass');

    if (site_user == null) {
        localStorage.setItem('uname', 'null');
        localStorage.setItem('pass', 'null');
    }

    gps_lat = 0;
    gps_long = 0;
    // Get Coordinate
    var onSuccess = function (position) {
        o('Lat: ' + position.coords.latitude + '\n' + 'Long: ' + position.coords.longitude + '\n');
        gps_lat = position.coords.latitude;
        gps_long = position.coords.longitude;

        login_check(site_user, site_pass, position.coords.latitude, position.coords.longitude, getDateTime());
    };

    network = "offline";

    onOnline = function () {
        o('Network : Online');
        network = "online";
    }

    onOffline = function () {
        o('Network : Offline')
        network = "offline";
    }

    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);

    // onError Callback receives a PositionError object
    //
    function onError(error) {

    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);



});



/////////////////////////////////////////////////////////////////////////////// FORM HANDLING ///////////////////////////////

r = function (input) {
    return $(input).val();
}

onBackKeyDown = function () {
    switch (active) {
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
            pop('long press to exit')
            navigator.Backbutton.goHome(function () {
                console.log('success')
            }, function () {
                console.log('fail')
            });
    }
}

rc = function (i) {
    var obj = window[i];
    o(i + " : " + obj);
};

numberize = function (input) {
    var nStr = input.value + '';
    nStr = nStr.replace(/\,/g, "");
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    input.value = x1 + x2;
}

// function number Focus
numberFocus = function (i) {
    var str = $(i).val();
    str = str.replace(/\,/g, "");
    str = str.replace(/\%/g, "");
    $(i).val(Number(str));
    $(i).attr('type', 'number');
    if ($(i).val() == "") {

    } else {
        $(i).val(Number(str));
    }
}

getDateTime = function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        var month = '0' + month;
    }
    if (day.toString().length == 1) {
        var day = '0' + day;
    }
    if (hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        var second = '0' + second;
    }
    var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}

format = function (val) {
    var nStr = val + '';
    nStr = nStr.replace(/\,/g, "");
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

reround = function (num) {
    num = Math.ceil(num);

    num = num.toString();

    if (num.length > 3) {
        var last = num.substring(num.length - 3);
        var first = num.substring(0, num.length - 3) + "000";
        // p(num + " : " + last);
        if (last == "000") {
            first = Number(first);
        } else {
            if (last <= 500) {
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

numberBlur = function (i) {
    $(i).attr('type', 'text');
    numberize(i);
}

inputPercentize = function (input) {
    var str = input.value.replace(/%/g, "");

    if (str == "") {
        input.value = "";
    } else {
        str = str + "%";
        $(input).attr('type', 'decimal');
        input.value = str;
    }
};

removePercent = function (input) {
    var str = input.replace(/%/g, "");
    str = str.replace(/,/g, ".");
    str = str / 100;
    return Number(str);
}

validateNumber = function (input) {
    var str = input.replace(/[^0-9\.]+/g, "");
    return Number(str);
}

autoFormSubmit = function () {
    autoOtr = validateNumber(r('#auto-otr'));
    autoTenor = r('#auto-tenor');
    autoInsurance = r('#auto-insurance');
    autoTjh = validateNumber(r('#auto-tjh'));
    autoProvision = removePercent(r('#auto-provision'));
    autoInsInclude = r('#auto-insInclude');
    autoAddb = r('#auto-addb');
    autoMethod = r('#auto-method');
    autoExpectDp = r('#auto-expectDp');
    autoExpectTdp = validateNumber(r('#auto-expectTdp'));
    autoExpectUsl = validateNumber(r('#auto-expectUsl'));
    autoMaxOtr = r('#auto-maxOtr');
    autoMinDp = r('#auto-minDp');

    o('autoMaxOtr : ' + autoMaxOtr);

    if (r('#auto-npwp') == 'yes') {
        autoAdm = admNpwp;
    } else {
        autoAdm = admNonNpwp;
    }

    autoType = $('#auto-type').val();
    autoType = $("#auto-type option[value='" + autoType + "']").text();
    autoType = autoType.replace(/\ /g, "_");

    if (autoType == "--_Silahkan_pilih_kategori") {
        toast('Silahkan pilih tipe kendaraan')
    } else if (autoOtr == "") {
        toast('Silahkan masukan harga OTR kendaraan');
    } else if (autoOtr > autoMaxOtr) {
        toast('Harga maksimal kendaraan Rp. ' + format(autoMaxOtr))
    } else if (autoTenor == "") {
        toast('Pilih tenor kredit')
    } else if (autoInsurance == '') {
        toast('Pilih tipe asuransi')
    } else {
        $.getJSON("json/" + autoType + ".json", function (package) {

            $.getJSON("json/insurance.json", function (myIns) {
                // insurance selector
                var otr1 = autoOtr * myIns['depr1'];
                var otr2 = autoOtr * myIns['depr2'];
                var otr3 = autoOtr * myIns['depr3'];
                var otr4 = autoOtr * myIns['depr4'];
                var otr5 = autoOtr * myIns['depr5'];

                switch (autoInsurance) {
                    case "CV":
                        o('Insurance is CV Allrisk');
                        var ins1 = otr1 * ((myIns['cvAllrisk'] / 100).toFixed(4));
                        var ins2 = otr2 * ((myIns['cvAllrisk'] / 100).toFixed(4));
                        var ins3 = otr3 * ((myIns['cvAllrisk'] / 100).toFixed(4));
                        var ins4 = otr4 * ((myIns['cvAllrisk'] / 100).toFixed(4));
                        var ins5 = otr5 * ((myIns['cvAllrisk'] / 100).toFixed(4));

                        break;

                    case "TLO":
                        o('Insurance is CV TLO');
                        var ins1 = otr1 * ((myIns['cvTlo'] / 100).toFixed(4));
                        var ins2 = otr2 * ((myIns['cvTlo'] / 100).toFixed(4));
                        var ins3 = otr3 * ((myIns['cvTlo'] / 100).toFixed(4));
                        var ins4 = otr4 * ((myIns['cvTlo'] / 100).toFixed(4));
                        var ins5 = otr5 * ((myIns['cvTlo'] / 100).toFixed(4));

                        break;

                    case "BUS":
                        o('Insurance is BUS Allrisk');
                        var ins1 = otr1 * ((myIns['busAllrisk'] / 100).toFixed(4));
                        var ins2 = otr2 * ((myIns['busAllrisk'] / 100).toFixed(4));
                        var ins3 = otr3 * ((myIns['busAllrisk'] / 100).toFixed(4));
                        var ins4 = otr4 * ((myIns['busAllrisk'] / 100).toFixed(4));
                        var ins5 = otr5 * ((myIns['busAllrisk'] / 100).toFixed(4));

                        break;

                    case "BUSTLO":
                        o('Insurance is BUS Allrisk');
                        var ins1 = otr1 * ((myIns['busTlo'] / 100).toFixed(4));
                        var ins2 = otr2 * ((myIns['busTlo'] / 100).toFixed(4));
                        var ins3 = otr3 * ((myIns['busTlo'] / 100).toFixed(4));
                        var ins4 = otr4 * ((myIns['busTlo'] / 100).toFixed(4));
                        var ins5 = otr5 * ((myIns['busTlo'] / 100).toFixed(4));

                        break;

                    case "PC":
                        var ins1 = Math.round(otr1 * insurancePick(otr1, myIns));
                        var ins2 = Math.round(otr2 * insurancePick(otr2, myIns));
                        var ins3 = Math.round(otr3 * insurancePick(otr3, myIns));
                        var ins4 = Math.round(otr4 * insurancePick(otr4, myIns));
                        var ins5 = Math.round(otr5 * insurancePick(otr5, myIns));

                        break;
                    default:
                        toast('Invalid insurance type : err001');
                } /* SWITCH INSURANCE*/

                switch (autoTenor) {
                    case "12":
                        o('tenor is 12 month');
                        var insuranceTotal = ins1;
                        var tjhTotal = autoTjh;
                        break;
                    case "24":
                        o('tenor is 24 month');
                        var insuranceTotal = ins1 + ins2;
                        var tjhTotal = autoTjh * 2;
                        break;
                    case "25":
                        o('tenor is 25 month');
                        var insuranceTotal = ins1 + ins2;
                        var tjhTotal = autoTjh * 2;
                        break;
                    case "36":
                        o('tenor is 36 month');
                        var insuranceTotal = ins1 + ins2 + ins3;
                        var tjhTotal = autoTjh * 3;
                        break;
                    case "48":
                        o('tenor is 48 month');
                        var insuranceTotal = ins1 + ins2 + ins3 + ins4;
                        var tjhTotal = autoTjh * 4;
                        break;
                    case "60":
                        o('tenor is 60 month');
                        var insuranceTotal = ins1 + ins2 + ins3 + ins4 + ins5;
                        var tjhTotal = autoTjh * 5;
                        break;
                    default:
                        toast('Invalid tenor occured : err002');
                } /*SWITCH TENOR*/

                // GET THE NI INSURANCE 2,3,4,5
                var insuranceNI = (insuranceTotal - ins1) + (tjhTotal - autoTjh);

                switch (autoMethod) {
                    case "DP":
                        o('Auto calculation by DP');
                        autoCalculate(package, autoOtr, autoTenor, autoExpectDp, autoAdm, ins1, insuranceTotal, autoTjh, tjhTotal, insuranceNI, autoProvision, autoInsInclude, autoAddb);
                        break;
                    case "TDP":
                        o('Auto calculation by USL');
                        var proceed = false;
                        if (autoExpectTdp == '') {
                            toast('Silahkan masukan TDP');
                        } else {
                            var expectDp = autoTdpCalculate(autoExpectTdp, autoOtr, autoTenor, 0.5, autoAdm, package, ins1, insuranceTotal, autoTjh, tjhTotal, insuranceNI, autoProvision, autoInsInclude, autoAddb);
                            if (expectDp == false) {
                                toast('Perhitungan tidak ditemukan');
                            } else {
                                switch (autoInsurance) {
                                    case "PC":
                                        if (expectDp < 0.2) {
                                            toast('DP untuk PC minimal 20%')
                                        } else {
                                            proceed = true;
                                        }
                                        break;
                                    default:
                                        if (expectDp < 0.05) {
                                            toast('DP minimal 5%')
                                        } else {
                                            proceed = true;
                                        }
                                        break;
                                }

                                if (proceed == true) {
                                    autoCalculate(package, autoOtr, autoTenor, expectDp, autoAdm, ins1, insuranceTotal, autoTjh, tjhTotal, insuranceNI, autoProvision, autoInsInclude, autoAddb);
                                }
                            }
                        }
                        break;
                    case "USL":
                        o('Auto calculation by USL');
                        var proceed = false;
                        if (autoExpectUsl == '') {
                            toast('Silahkan masukan TDP');
                        } else {
                            var expectDp = autoUslCalculate(autoExpectUsl, autoOtr, autoTenor, 0.5, autoAdm, package, ins1, insuranceTotal, autoTjh, tjhTotal, insuranceNI, autoProvision, autoInsInclude, autoAddb);
                            if (expectDp == false) {
                                toast('Perhitungan tidak ditemukan');
                            } else {
                                switch (autoInsurance) {
                                    case "PC":
                                        if (expectDp < 0.2) {
                                            toast('DP untuk PC minimal 20%')
                                        } else {
                                            proceed = true;
                                        }
                                        break;
                                    default:
                                        if (expectDp < 0.05) {
                                            toast('DP minimal 5%')
                                        } else {
                                            proceed = true;
                                        }
                                        break;
                                }

                                if (proceed == true) {
                                    autoCalculate(package, autoOtr, autoTenor, expectDp, autoAdm, ins1, insuranceTotal, autoTjh, tjhTotal, insuranceNI, autoProvision, autoInsInclude, autoAddb);
                                }
                            }
                        }
                        break;
                    default:
                        toast('Invalid method')
                }
            });
        }); // END OF JSON LOADING
    }


}

advFormSubmit = function () {
    // GET FORM DATA

    advOtr = validateNumber(r('#adv-otr'));
    advTenor = r('#adv-tenor');
    advRate = removePercent(r('#adv-rate'));
    advInsurance = r('#adv-insurance');
    advAdm = validateNumber(r('#adv-adm'));
    advTjh = validateNumber(r('#adv-tjh'));
    advProvision = removePercent(r('#adv-provision'));
    advInsInclude = r('#adv-insInclude');
    advAddb = r('#adv-addb');
    advMethod = r('#adv-method');
    advExpectDp = r('#adv-expectDp');
    advExpectTdp = validateNumber(r('#adv-expectTdp'));
    advExpectUsl = validateNumber(r('#adv-expectUsl'));


    // validating form

    if (advOtr == '') {
        toast('Silahkan masukan harga OTR');
    } else if (advAdm == '') {
        toast('Anda belum menginput biaya administrasi');
    } else {
        $('#loader').show();

        $.getJSON("json/insurance.json", function (myIns) {

            // insurance selector
            var otr1 = advOtr * myIns['depr1'];
            var otr2 = advOtr * myIns['depr2'];
            var otr3 = advOtr * myIns['depr3'];
            var otr4 = advOtr * myIns['depr4'];
            var otr5 = advOtr * myIns['depr5'];

            switch (advInsurance) {
                case "CV":
                    o('Insurance is CV Allrisk');
                    var ins1 = otr1 * ((myIns['cvAllrisk'] / 100).toFixed(4));
                    var ins2 = otr2 * ((myIns['cvAllrisk'] / 100).toFixed(4));
                    var ins3 = otr3 * ((myIns['cvAllrisk'] / 100).toFixed(4));
                    var ins4 = otr4 * ((myIns['cvAllrisk'] / 100).toFixed(4));
                    var ins5 = otr5 * ((myIns['cvAllrisk'] / 100).toFixed(4));

                    break;

                case "TLO":
                    o('Insurance is CV TLO');
                    var ins1 = otr1 * ((myIns['cvTlo'] / 100).toFixed(4));
                    var ins2 = otr2 * ((myIns['cvTlo'] / 100).toFixed(4));
                    var ins3 = otr3 * ((myIns['cvTlo'] / 100).toFixed(4));
                    var ins4 = otr4 * ((myIns['cvTlo'] / 100).toFixed(4));
                    var ins5 = otr5 * ((myIns['cvTlo'] / 100).toFixed(4));

                    break;

                case "BUS":
                    o('Insurance is BUS Allrisk');
                    var ins1 = otr1 * ((myIns['busAllrisk'] / 100).toFixed(4));
                    var ins2 = otr2 * ((myIns['busAllrisk'] / 100).toFixed(4));
                    var ins3 = otr3 * ((myIns['busAllrisk'] / 100).toFixed(4));
                    var ins4 = otr4 * ((myIns['busAllrisk'] / 100).toFixed(4));
                    var ins5 = otr5 * ((myIns['busAllrisk'] / 100).toFixed(4));

                    break;

                case "BUSTLO":
                    o('Insurance is BUS Allrisk');
                    var ins1 = otr1 * ((myIns['busTlo'] / 100).toFixed(4));
                    var ins2 = otr2 * ((myIns['busTlo'] / 100).toFixed(4));
                    var ins3 = otr3 * ((myIns['busTlo'] / 100).toFixed(4));
                    var ins4 = otr4 * ((myIns['busTlo'] / 100).toFixed(4));
                    var ins5 = otr5 * ((myIns['busTlo'] / 100).toFixed(4));

                    break;

                case "PC":
                    var ins1 = Math.round(otr1 * insurancePick(otr1, myIns));
                    var ins2 = Math.round(otr2 * insurancePick(otr2, myIns));
                    var ins3 = Math.round(otr3 * insurancePick(otr3, myIns));
                    var ins4 = Math.round(otr4 * insurancePick(otr4, myIns));
                    var ins5 = Math.round(otr5 * insurancePick(otr5, myIns));

                    /*o((otr1) + " : rate " + insurancePick(otr1, myIns));
                      o((otr2) + " : rate " + insurancePick(otr2, myIns));
                      o((otr3) + " : rate " + insurancePick(otr3, myIns));
                      o((otr4) + " : rate " + insurancePick(otr4, myIns));
                      o((otr5) + " : rate " + insurancePick(otr5, myIns));*/
                    break;
                default:
                    toast('Invalid insurance type : err001');
            } /* SWITCH INSURANCE*/

            switch (advTenor) {
                case "12":
                    o('tenor is 12 month');
                    var insuranceTotal = ins1;
                    var tjhTotal = advTjh;
                    break;
                case "24":
                    o('tenor is 24 month');
                    var insuranceTotal = ins1 + ins2;
                    var tjhTotal = advTjh * 2;
                    break;
                case "25":
                    o('tenor is 25 month');
                    var insuranceTotal = ins1 + ins2;
                    var tjhTotal = advTjh * 2;
                    break;
                case "36":
                    o('tenor is 36 month');
                    var insuranceTotal = ins1 + ins2 + ins3;
                    var tjhTotal = advTjh * 3;
                    break;
                case "48":
                    o('tenor is 48 month');
                    var insuranceTotal = ins1 + ins2 + ins3 + ins4;
                    var tjhTotal = advTjh * 4;
                    break;
                case "60":
                    o('tenor is 60 month');
                    var insuranceTotal = ins1 + ins2 + ins3 + ins4 + ins5;
                    var tjhTotal = advTjh * 5;
                    break;
                default:
                    toast('Invalid tenor occured : err002');
            } /*SWITCH TENOR*/

            // GET THE NI INSURANCE 2,3,4,5
            var insuranceNI = (insuranceTotal - ins1) + (tjhTotal - advTjh);

            switch (advMethod) {
                case "DP":
                    o('Calculate by DP');
                    var proceed = false;

                    if (advInsurance == "PC") {
                        if (advExpectDp < 0.2) {
                            $('#loader').hide();
                            toast('Minimal DP untuk PC 20%')
                        } else {
                            proceed = true;
                        }
                    } else {
                        proceed = true;
                    }

                    if (proceed) {
                        $('#loader').hide();
                        calculate(advOtr, advTenor, advExpectDp, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb);
                    }

                    break;
                case "TDP":
                    o('Calculate by TDP');
                    var proceed = false;

                    if (advExpectTdp == "") {
                        toast('Silahkan masukan TDP yang diinginkan');
                    } else {
                        var findDp = advTdpCalculate(advExpectTdp, advOtr, advTenor, 0.05, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb);

                        if (findDp == false) {
                            toast('Perhitungan tidak ditemukan')
                        } else {
                            switch (advInsurance) {
                                case "PC":
                                    if (findDp < 0.2) {
                                        var minTDP = calculateValue(advOtr, advTenor, 0.2, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb, "TDP");
                                        $('#loader').hide();
                                        toast('Minimum DP untuk PC 20% (Total pembayaran Rp. ' + format(minTDP) + ")");
                                    } else {
                                        proceed = true;
                                    }
                                    break;
                                default:
                                    if (findDp < 0.05) {
                                        var minTDP = calculateValue(advOtr, advTenor, 0.05, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb, "TDP");
                                        toast('Minimum DP 5% (Total pembayaran Rp. ' + format(minTDP) + ")");
                                    } else {
                                        proceed = true;
                                    }
                            }

                            if (findDp > 1) {
                                toast('DP tidak boleh melebihi harga kendaraan')
                            } else {
                                if (proceed) {
                                    calculate(advOtr, advTenor, findDp, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb);
                                }
                            }
                        }
                    }

                    break;
                case "USL":
                    o('Calculate by USL');

                    if (advExpectUsl == "") {
                        $('#loader').hide();
                        toast('Silahkan masukan USL yang diinginkan');
                    } else {
                        var findDp = advUslCalculate(advExpectUsl, advOtr, advTenor, 0.2, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb);

                        if (findDp == false) {
                            toast('Perhitungan tidak ditemukan')
                        } else {
                            switch (advInsurance) {
                                case "PC":
                                    if (findDp < 0.2) {
                                        var maxUsl = calculateValue(advOtr, advTenor, 0.2, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb, "USL");
                                        toast('Minimum DP untuk PC 20% (Maximum angsuran Rp. ' + format(maxUsl) + ")");
                                    } else {
                                        proceed = true;
                                    }
                                    break;
                                default:
                                    if (findDp < 0.05) {
                                        var maxUsl = calculateValue(advOtr, advTenor, 0.05, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb, "USL");
                                        toast('Minimum DP 5% (Maksimum angsuran Rp. ' + format(maxUsl) + ")");
                                    } else {
                                        proceed = true;
                                    }
                            }

                            if (findDp > 1) {
                                toast('DP tidak boleh melebihi harga kendaraan');
                            } else {
                                if (proceed) {
                                    calculate(advOtr, advTenor, findDp, advAdm, advRate, ins1, insuranceTotal, advTjh, tjhTotal, insuranceNI, advProvision, advInsInclude, advAddb);
                                }
                            }
                        }
                    }
                    break;
                default:
                    $('#loader').hide();
                    toast('Invalid method selected : err003');
            } /*SWITCH ADVMETHOD*/
        });
    }
};

autoCalculate = function (package, otr, tenor, dp, adm, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb) {
    // o('Calculate \n{ \n   otr : ' + otr + "\n   tenor : " + tenor + "\n   dp : " + dp + "\n   adm : " + adm + "\n   rate : " + rate + "\n   ins1 : " + ins1 + "\n   ins2 : " + ins2 + "\n   tjh : " + tjh + "\n   insPh : " + insPh + "\n   provision : " + provision + "\n   insIncl : " + insInc + "\n   addb : " + addb + "\n}")
    var ADM = adm;
    var DP = otr * dp;
    var DP_PERCENT = ((dp * 100).toFixed(2)) + " %";
    var NI_PURE = otr - DP;
    var PROVISION = NI_PURE * provision;
    var TJH = tjh;
    var rate = 0;
    var TIPE = package['type'];
    switch (tenor) {
        case "12":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['a1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['a2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['a3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['a4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['a5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['a6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['a7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['a8'];
            }
            break;
        case "24":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['b1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['b2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['b3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['b4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['b5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['b6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['b7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['b8'];
            }
            break;
        case "25":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['b1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['b2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['b3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['b4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['b5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['b6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['b7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['b8'];
            }
            break;
        case "36":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['c1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['c2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['c3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['c4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['c5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['c6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['c7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['c8'];
            }
            break;
        case "48":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['d1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['d2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['d3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['d4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['d5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['d6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['d7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['8'];
            }
            break;
        case "60":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['e1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['e2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['e3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['e4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['e5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['e6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['e7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['e8'];
            }
            break;
    }

    rate = rate / 100;

    // o('DP : ' + DP + ', NI PURE : ' + NI_PURE + ", PROVISION : " + PROVISION); // CHECK RESULT

    if (insInc == 'yes') {
        var NI_TOTAL = NI_PURE + insPh;
        var INSURANCE = ins1;
        var INSTEXT = 'Th Pertama'
        TJH = tjh;
    } else {
        var NI_TOTAL = NI_PURE;
        var INSURANCE = ins2;
        var INSTEXT = 'Dimuka';
        var TJH = tjhTotal;
    }

    // CALCULATE USL
    var USL = (NI_TOTAL + ((NI_TOTAL * rate) * (tenor / 12))) / tenor;

    if (addb == "no") {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH + USL;
        var TENOR = '' + (tenor - 1);
    } else {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH;
        var TENOR = '' + tenor + ' [ADDB]';
    }

    //o('Calculate \n{ \n   otr : ' + otr + "\n   tenor : " + TENOR + "\n   dp : " + DP + "\n   adm : " + ADM + "\n   rate : " + rate + "\n   asuransi : " + INSURANCE + "\n   usl : " + USL + "\n   tpd : " + TDP + "\n   provisi : " + PROVISION + "/ " + provision + "\n   insurance incl : " + insInc + "\n   addb : " + addb + "\n}");
    signature = localStorage.getItem('signature');

    var strWa = ('Tipe : ' + TIPE + '\nOTR : Rp. ' + format(Math.ceil(otr)) + "\nTenor : x " + tenor + "\nDP : Rp. " + format(Math.ceil(DP)) + " / " + DP_PERCENT + "\nAdm : Rp. " + format(Math.ceil(ADM)) + "\nRate : " + ((rate * 100).toFixed(2) + "%") + "\nAsuransi : Rp. " + format(Math.ceil(INSURANCE)) + " " + INSTEXT + "\nProvisi : Rp. " + format(Math.ceil(PROVISION)) + " / " + ((provision * 100).toFixed(2) + "%\nAngsuran : Rp. " + format(reround(USL)) + " x " + TENOR + "\nTDP : Rp. " + format(reround(TDP))) + "\n" + signature)

    var strSms = ('Tipe : ' + TIPE + ', OTR : ' + format(Math.ceil(otr)) + ", Tenor : x " + tenor + ", DP : " + format(Math.ceil(DP)) + " / " + ((dp * 100).toFixed(2) + "%2525") + ", Adm : " + format(Math.ceil(ADM)) + ", Rate : " + ((rate * 100).toFixed(2) + "%2525") + ", Asuransi : " + format(Math.ceil(INSURANCE)) + " " + INSTEXT + ", Provisi : " + format(Math.ceil(PROVISION)) + " / " + ((provision * 100).toFixed(2) + "%2525, Angsuran : " + format(reround(USL)) + " x " + TENOR + ", TDP : " + format(reround(TDP))) + ", " + signature)

    var shareTextWa = encodeURIComponent(strWa);

    $('#pop-share-wa').on('click', function () {
        window.open('whatsapp://send?text=' + shareTextWa, '_system');
    });
    $('#pop-share-sms').on('click', function () {
        window.open('sms:?body=' + strSms, '_system');
    });

    // DISPLAY ON POPUP CONTAINER
    setPopup('#popup-tipe', TIPE);
    setPopup('#popup-otr', format(Math.ceil(otr)));
    setPopup('#popup-csp', format(Math.ceil(DP)));
    setPopup('#popup-adm', format(Math.ceil(ADM)));
    setPopup('#popup-insurance', format(Math.ceil(INSURANCE)));
    setPopup('#popup-tjh', format(Math.ceil(tjh)));
    setPopup('#popup-provision', format(Math.ceil(PROVISION)));
    setPopup('#popup-usl', format(reround(USL)));
    setPopup('#popup-tdp', format(reround(TDP)));
    setPopup('#popup-tenor', TENOR);
    setPopup('#popup-insText', INSTEXT);
    setPopup('#popup-dpText', DP_PERCENT);
    setPopup('#popup-rate', (rate * 100).toFixed(2) + "%");
    setPopup('#popup-textProvision', (provision * 100).toFixed(2) + "%");

    calcCount();
    showPopup();
    navigator.vibrate(50);
}

autoTdpCalculate = function (findTdp, otr, tenor, dp, adm, package, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb) {
    var ADM = adm;
    var DP = otr * dp;
    var DP_PERCENT = ((dp * 100).toFixed(2)) + " %";
    var NI_PURE = otr - DP;
    var PROVISION = NI_PURE * provision;
    var TJH = tjh;

    if (insInc == 'yes') {
        NI_TOTAL = NI_PURE + insPh;
        INSURANCE = ins1;
        INSTEXT = 'Th Pertama'
        TJH = tjh;
    } else {
        NI_TOTAL = NI_PURE;
        INSURANCE = ins2;
        INSTEXT = 'Dimuka';
        TJH = tjhTotal;
    }

    rate = ratePicker(package, tenor, dp);

    // CALCULATE USL
    var USL = (NI_TOTAL + ((NI_TOTAL * rate) * (tenor / 12))) / tenor;

    if (addb == "no") {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH + USL;
        var TENOR = '' + (tenor - 1);
    } else {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH;
        var TENOR = '' + tenor + ' [ADDB]';
    }

    if (TDP == findTdp) {
        iteration = 1;
        $('#loader').hide();
        return dp;
    } else {
        if (iteration < 500) {
            iteration++
            var newDp = ((DP / (TDP / Number(findTdp))));
            newDp = (newDp / otr);
            o(iteration + ' > tdp : ' + format(TDP) + ' Expect : ' + format(findTdp));
            return autoTdpCalculate(findTdp, otr, tenor, newDp, adm, package, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb);
        } else {
            $('#loader').hide();
            iteration = 1;
            return false;
        }

    }
};

advTdpCalculate = function (findTdp, otr, tenor, dp, adm, rate, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb) {
    var ADM = adm;
    var DP = otr * dp;
    var DP_PERCENT = ((dp * 100).toFixed(2)) + " %";
    var NI_PURE = otr - DP;
    var PROVISION = NI_PURE * provision;
    var TJH = tjh;

    if (insInc == 'yes') {
        NI_TOTAL = NI_PURE + insPh;
        INSURANCE = ins1;
        INSTEXT = 'Th Pertama'
        TJH = tjh;
    } else {
        NI_TOTAL = NI_PURE;
        INSURANCE = ins2;
        INSTEXT = 'Dimuka';
        TJH = tjhTotal;
    }

    // CALCULATE USL
    var USL = (NI_TOTAL + ((NI_TOTAL * rate) * (tenor / 12))) / tenor;

    if (addb == "no") {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH + USL;
        var TENOR = '' + (tenor - 1);
    } else {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH;
        var TENOR = '' + tenor + ' [ADDB]';
    }

    if (TDP == findTdp) {
        iteration = 1;
        $('#loader').hide();
        return dp;
    } else {
        if (iteration < 500) {
            iteration++
            var newDp = ((DP / (TDP / Number(findTdp))));
            newDp = (newDp / otr);
            o(iteration + ' > tdp : ' + format(TDP) + ' Expect : ' + format(findTdp));
            return advTdpCalculate(findTdp, otr, tenor, newDp, adm, rate, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb);
        } else {
            $('#loader').hide();
            iteration = 1;
            return false;
        }

    }
};

autoUslCalculate = function (findUsl, otr, tenor, dp, adm, package, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb) {
    var ADM = adm;
    var DP = otr * dp;
    var DP_PERCENT = ((dp * 100).toFixed(2)) + " %";
    var NI_PURE = otr - DP;
    var PROVISION = NI_PURE * provision;
    var TJH = tjh;

    if (insInc == 'yes') {
        NI_TOTAL = NI_PURE + insPh;
        INSURANCE = ins1;
        TJH = tjh;
    } else {
        NI_TOTAL = NI_PURE;
        INSURANCE = ins2;
        TJH = tjhTotal;
    }

    rate = ratePicker(package, tenor, dp);

    // CALCULATE USL
    var USL = (NI_TOTAL + ((NI_TOTAL * rate) * (tenor / 12))) / tenor;

    if (addb == "no") {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH + USL;
        var TENOR = '' + (tenor - 1);
    } else {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH;
        var TENOR = '' + tenor + ' [ADDB]';
    }
    var spread = USL - findUsl;
    
    if (iteration == 2999 && advSeek == false) {
        if (spread < 1000 && spread > -1000) {
            USL = findUsl;
        }
    }
    
    if(advSeek == true){
        if(spread < 1000 && spread > -1000){
            USL = findUsl;
        }
    }

    if (USL == findUsl) {
        iteration = 1;
        $('#loader').hide();
        return dp;
    } else {
        if (advSeek == false) {
            if (iteration < 3000) {
                iteration++
                //var newDp = ((DP / (Number(findUsl) / USL)));
                var newDp = ((DP / (Number(findUsl) / USL)));

                newDp = (newDp / otr);

                // o(iteration + ' > usl : ' + format(USL) + ' Expect : ' + format(findUsl) + '  dp : ' + newDp);
                return autoUslCalculate(findUsl, otr, tenor, newDp, adm, package, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb);
            } else {
                advSeek = true;
                iteration = 1;
                return autoUslCalculate(findUsl, otr, tenor, dpSeek, adm, package, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb);
            }
        } else {
            if (iteration < 3000) {
                dpSeek = dpSeek - 0.0001;
               //  o(dpSeek + " : " + iteration);
                iteration++;
                return autoUslCalculate(findUsl, otr, tenor, dpSeek, adm, package, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb);        
            } else {
                $('#loader').hide();
                iteration = 1;
                dpSeek = 1;
                advSeek = false;
                return false;
            }

        }


    }
};

advUslCalculate = function (findUsl, otr, tenor, dp, adm, rate, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb) {
    var ADM = adm;
    var DP = otr * dp;
    var NI_PURE = otr - DP;
    var PROVISION = NI_PURE * provision;
    var TJH = tjh;

    if (insInc == 'yes') {
        NI_TOTAL = NI_PURE + insPh;
        INSURANCE = ins1;
        INSTEXT = 'Th Pertama'
        TJH = tjh;
    } else {
        NI_TOTAL = NI_PURE;
        INSURANCE = ins2;
        INSTEXT = 'Dimuka';
        TJH = tjhTotal;
    }

    // CALCULATE USL
    var USL = (NI_TOTAL + ((NI_TOTAL * rate) * (tenor / 12))) / tenor;

    if (addb == "no") {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH + USL;
    } else {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH;
    }
    
    var spread = USL - findUsl;
    
    if (iteration == 999 && advSeek == false) {
        
        if (spread < 1000 && spread > -1000) {
            USL = findUsl;
        }
    }
    
    if(advSeek == true){
        if(spread < 1000 && spread > -1000){
            USL = findUsl;
        }
    }
    
    if (USL == findUsl) {
        iteration = 1;
        $('#loader').hide();
        return dp;
    } else {
        if (advSeek == false) {
            if (iteration < 3000) {
                iteration++
                iteration++
            var newDp = (DP / (Number(findUsl) / USL));
            newDp = (newDp / otr);
            o(iteration + ' > Usl : ' + format(USL) + ' Expect : ' + format(findUsl) + ' Dp : ' + newDp);
            return advUslCalculate(findUsl, otr, tenor, newDp, adm, rate, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb);
            } else {
                advSeek = true;
                iteration = 1;
                return advUslCalculate(findUsl, otr, tenor, dpSeek, adm, rate, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb);
            }
        } else {
            if (iteration < 3000) {
                dpSeek = dpSeek - 0.0001;
               //  o(dpSeek + " : " + iteration);
                iteration++;
                return advUslCalculate(findUsl, otr, tenor, dpSeek, adm, rate, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb);        
            } else {
                $('#loader').hide();
                iteration = 1;
                dpSeek = 0.9;
                advSeek = false;
                return false;
            }

        }


    }
};

calculate = function (otr, tenor, dp, adm, rate, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb) {
    // o('Calculate \n{ \n   otr : ' + otr + "\n   tenor : " + tenor + "\n   dp : " + dp + "\n   adm : " + adm + "\n   rate : " + rate + "\n   ins1 : " + ins1 + "\n   ins2 : " + ins2 + "\n   tjh : " + tjh + "\n   insPh : " + insPh + "\n   provision : " + provision + "\n   insIncl : " + insInc + "\n   addb : " + addb + "\n}")
    var ADM = adm;
    var DP = otr * dp;
    var DP_PERCENT = ((dp * 100).toFixed(2)) + " %";
    var NI_PURE = otr - DP;
    var PROVISION = NI_PURE * provision;
    var TJH = tjh;

    // o('DP : ' + DP + ', NI PURE : ' + NI_PURE + ", PROVISION : " + PROVISION); // CHECK RESULT

    if (insInc == 'yes') {
        NI_TOTAL = NI_PURE + insPh;
        INSURANCE = ins1;
        INSTEXT = 'Th Pertama'
        TJH = tjh;
    } else {
        NI_TOTAL = NI_PURE;
        INSURANCE = ins2;
        INSTEXT = 'Dimuka';
        TJH = tjhTotal;
    }

    // CALCULATE USL
    var USL = (NI_TOTAL + ((NI_TOTAL * rate) * (tenor / 12))) / tenor;

    if (addb == "no") {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH + USL;
        var TENOR = '' + (tenor - 1);
    } else {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH;
        var TENOR = '' + tenor + ' [ADDB]';
    }

    //o('Calculate \n{ \n   otr : ' + otr + "\n   tenor : " + TENOR + "\n   dp : " + DP + "\n   adm : " + ADM + "\n   rate : " + rate + "\n   asuransi : " + INSURANCE + "\n   usl : " + USL + "\n   tpd : " + TDP + "\n   provisi : " + PROVISION + "/ " + provision + "\n   insurance incl : " + insInc + "\n   addb : " + addb + "\n}");

    signature = localStorage.getItem('signature');

    if (r('#adv-unit') == '') {
        var Unit = "Non Paket";
    } else {
        var Unit = r('#adv-unit');
    }

    var strWa = (Unit + ' \nOTR : Rp. ' + format(Math.ceil(otr)) + "\nTenor : x " + tenor + "\nDP : Rp. " + format(Math.ceil(DP)) + " / " + DP_PERCENT + "\nAdm : Rp. " + format(Math.ceil(ADM)) + "\nRate : " + ((rate * 100).toFixed(2) + "%") + "\nAsuransi : Rp. " + format(Math.ceil(INSURANCE)) + " " + INSTEXT + "\nProvisi : Rp. " + format(Math.ceil(PROVISION)) + " / " + ((provision * 100).toFixed(2) + "%\nAngsuran : Rp. " + format(reround(USL)) + " x " + TENOR + "\nTDP : Rp. " + format(reround(TDP))) + "\n" + signature)

    var strSms = (Unit + ', OTR : ' + format(Math.ceil(otr)) + ", Tenor : x " + TENOR + ", DP : " + format(Math.ceil(DP)) + " / " + ((dp * 100).toFixed(2) + "%2525") + ", Adm : " + format(Math.ceil(ADM)) + ", Rate : " + ((rate * 100).toFixed(2) + "%2525") + ", Asuransi : " + format(Math.ceil(INSURANCE)) + " " + INSTEXT + ", Provisi : " + format(Math.ceil(PROVISION)) + " / " + ((provision * 100).toFixed(2) + "%2525, Angsuran : " + format(reround(USL)) + " x " + TENOR + ", TDP : " + format(reround(TDP))) + ", " + signature)

    var shareTextWa = encodeURIComponent(strWa);

    $('#pop-share-wa').on('click', function () {
        window.open('whatsapp://send?text=' + shareTextWa, '_system');
    });
    $('#pop-share-sms').on('click', function () {
        window.open('sms:?body=' + strSms, '_system');
    });

    // DISPLAY ON POPUP CONTAINER
    setPopup('#popup-tipe', Unit);
    setPopup('#popup-otr', format(Math.ceil(otr)));
    setPopup('#popup-csp', format(Math.ceil(DP)));
    setPopup('#popup-adm', format(Math.ceil(ADM)));
    setPopup('#popup-insurance', format(Math.ceil(INSURANCE)));
    setPopup('#popup-tjh', format(Math.ceil(advTjh)));
    setPopup('#popup-provision', format(Math.ceil(PROVISION)));
    setPopup('#popup-usl', format(reround(USL)));
    setPopup('#popup-tdp', format(reround(TDP)));
    setPopup('#popup-tenor', TENOR);
    setPopup('#popup-insText', INSTEXT);
    setPopup('#popup-dpText', DP_PERCENT);
    setPopup('#popup-rate', (rate * 100).toFixed(2) + "%");
    setPopup('#popup-textProvision', (provision * 100).toFixed(2) + "%");

    showPopup();
    navigator.vibrate(50);

    calcCount();
}

calculateValue = function (otr, tenor, dp, adm, rate, ins1, ins2, tjh, tjhTotal, insPh, provision, insInc, addb, result) {
    // o('Calculate \n{ \n   otr : ' + otr + "\n   tenor : " + tenor + "\n   dp : " + dp + "\n   adm : " + adm + "\n   rate : " + rate + "\n   ins1 : " + ins1 + "\n   ins2 : " + ins2 + "\n   tjh : " + tjh + "\n   insPh : " + insPh + "\n   provision : " + provision + "\n   insIncl : " + insInc + "\n   addb : " + addb + "\n}")
    var ADM = adm;
    var DP = otr * dp;
    var DP_PERCENT = ((dp * 100).toFixed(2)) + " %";
    var NI_PURE = otr - DP;
    var PROVISION = NI_PURE * provision;
    var TJH = tjh;

    // o('DP : ' + DP + ', NI PURE : ' + NI_PURE + ", PROVISION : " + PROVISION); // CHECK RESULT

    if (insInc == 'yes') {
        NI_TOTAL = NI_PURE + insPh;
        INSURANCE = ins1;
        INSTEXT = 'Th Pertama'
        TJH = tjh;
    } else {
        NI_TOTAL = NI_PURE;
        INSURANCE = ins2;
        INSTEXT = 'Dimuka';
        TJH = tjhTotal;
    }

    // CALCULATE USL
    var USL = (NI_TOTAL + ((NI_TOTAL * rate) * (tenor / 12))) / tenor;

    if (addb == "no") {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH + USL;
        var TENOR = '' + (tenor - 1);
    } else {
        var TDP = DP + ADM + INSURANCE + PROVISION + TJH;
        var TENOR = '' + tenor + ' [ADDB]';
    }

    switch (result) {
        case "TDP":
            return TDP;
            break;
        case "USL":
            return USL;
            break;
    }
}

updateUser = function () {
    $('#loader').show();
    var dataPost = {
        "username": $('#user_username').val(),
        "name": $('#user_name').val(),
        "email": $('#user_email').val(),
        "dealer": $('#user_dealer').val(),
        "signature": $('#user_signature').val()
    };

    var dataString = JSON.stringify(dataPost);

    $.ajax({
        url: API + 'mod_update.php',
        data: {
            myData: dataString
        },
        type: 'POST',
        success: function (response) {
            $('#loader').hide();
            pop('Data disimpan');
            localStorage.setItem('signature', $('#user_signature').val());
        }
    });
}

getUser = function () {
    $('#loader').show();
    var username = localStorage.getItem('uname');
    $.getJSON(API + "mod_user.php?username=" + username, function (user) {
        $('#user_username').val(user['username']);
        $('#user_name').val(user['name']);
        $('#user_email').val(user['email']);
        $('#user_dealer').val(user['dealer']);
        $('#user_signature').val(user['signature']);
        $('#loader').hide();
    });
}

loadNews = function (target, url) {
    $('#loader').show();
    $(target).load(url, function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success")
            $('#loader').hide();
        // pop("Content loaded successfully!");

        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;

                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
        if (statusTxt == "error")
            $('#loader').hide();
        // toast("Error: Couldn't connect to internet " + xhr.status + ": " + xhr.statusText);
    });
}

ratePicker = function (package, tenor, dp) {
    switch (tenor) {
        case "12":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['a1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['a2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['a3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['a4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['a5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['a6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['a7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['a8'];
            }
            break;
        case "24":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['b1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['b2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['b3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['b4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['b5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['b6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['b7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['b8'];
            }
            break;
        case "25":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['b1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['b2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['b3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['b4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['b5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['b6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['b7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['b8'];
            }
            break;
        case "36":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['c1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['c2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['c3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['c4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['c5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['c6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['c7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['c8'];
            }
            break;
        case "48":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['d1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['d2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['d3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['d4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['d5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['d6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['d7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['8'];
            }
            break;
        case "60":
            if (dp >= 0.05 && dp < 0.1){
                rate = package['e1'];  
            } else if (dp >= 0.1 && dp < 0.15) {
                rate = package['e2'];
            } else if (dp >= 0.15 && dp < 0.2) {
                rate = package['e3'];
            } else if (dp >= 0.2 && dp < 0.25) {
                rate = package['e4'];
            } else if (dp >= 0.25 && dp < 0.3) {
                rate = package['e5'];
            } else if (dp >= 0.3 && dp < 0.35) {
                rate = package['e6'];
            } else if (dp >= 0.35 && dp < 0.4) {
                rate = package['e7'];
            } else if (dp >= 0.4 && dp < 1) {
                rate = package['e8'];
            }
            break;
    }

    rate = rate / 100;
    return rate;
}

selectType = function () {
    var selected = $('#auto-type').val();
    selected = $("#auto-type option[value='" + selected + "']").text();
    selected = selected.replace(/\ /g, "_");

    $.ajax({
        url: "json/" + selected + ".json",
        type: 'HEAD',
        error: function () {
            toast('Tipe yang anda pilih belum tersedia');
            $('#auto-type').val(0);
        },
        success: function () {
            $.getJSON("json/" + selected + ".json", function (type) {
                $('#auto-otr').attr('placeholder', 'Harga maksimal : Rp. ' + format(type['maxPrice']));
                $('#auto-maxOtr').val(type['maxPrice']);
                $('#auto-minDp').val(type['minCsp']);
            });
        }
    });


}

var carsAndModels = {};
carsAndModels['Pajero'] = ['-- Silahkan pilih kategori', 'DAKAR 4X2 AT ULTIMATE', 'DAKAR 4X2 AT', 'GLX 4x4 MT', 'EXCEED 4x2 AT', 'EXCEED 4X2 MT'];
carsAndModels['Mirage'] = ['-- Silahkan pilih kategori', 'Mirage Exceed', 'Mirage GLS', 'Mirage GLX'];
carsAndModels['Xpander'] = ['-- Silahkan pilih kategori', 'Xpander Paket A', 'Xpander Paket B'];
carsAndModels['Outlander'] = ['-- Silahkan pilih kategori', 'Outlander PX', 'Outlander GLS', 'Outlander GLX'];
carsAndModels['Fuso'] = ['-- Silahkan pilih kategori', 'FM 517 HS', 'FM 517 HL', 'FM 517 HL LONG', 'FN 517 ML2', 'FN 517 ML2 SUPER LONG', 'FN 527 MS', 'FN 527 ML', 'FJ 2523', 'FJ 2528', 'FI 1217', 'FZ 4928 TH', 'FZ 4028 TH'];
carsAndModels['FE Normal'] = ['-- Silahkan pilih kategori', 'FE 71', 'FE 71 (ESPASIO)', 'FE 71 BC', 'FE 71 L - FE 71 LCB - FL 71 PS', 'FE 73', 'FE 73 HD', 'FE 74 HDV', 'FE 74 S', 'FE 83 BC', 'FE 83 G HDL', 'FE 84 G BC', 'FE 83 G HDL', 'FE 84 G BC'];
carsAndModels['FE Spesial'] = ['-- Silahkan pilih kategori', 'SP FE 71', 'SP FE 71 (ESPASIO)', 'SP FE 71 BC', 'SP FE 71 L - FE 71 LCB - FL 71 PS', 'SP FE 73', 'SP FE 73 HD', 'SP FE 74 HDV', 'SP FE 74 S', 'SP FE 83 BC', 'SP FE 83 G HDL', 'SP FE 84 G BC', 'SP FE 83 G HDL', 'SP FE 84 G BC'];
carsAndModels['L300'] = ['-- Silahkan pilih kategori', 'L300 FB-FD', 'L300 Standard', 'L300 Minibus'];
carsAndModels['Triton DC'] = ['-- Silahkan pilih kategori', 'All New Triton DC Exceed AT', 'All New Triton DC Exceed AT Limited', 'All New Triton DC Exceed MT', 'All New Triton DC Exceed MT Limited', 'All New Triton DC GLS', 'All New Triton DC HDX']
carsAndModels['Triton SC'] = ['-- Silahkan pilih kategori', 'All New Triton SC HDX']
carsAndModels['ColtT'] = ['-- Silahkan pilih kategori', 'Colt T120 SS FB-FD', 'Colt T120 SS Standard'];

ChangeCatList = function () {
    var carList = document.getElementById("auto-category");
    var modelList = document.getElementById("auto-type");
    var selCar = carList.options[carList.selectedIndex].value;
    switch (selCar) {
        case "Pajero":
            var type = "PC";
            break;
        case "Mirage":
            var type = "PC";
            break;
        case "Outlander":
            var type = "PC";
            break;
        case "Triton DC":
            var type = "PC"
        default:
            var type = "CV";
    }

    $("#auto-tenor").val("");
    $("#auto-insurance").val("");

    switch (type) {
        case "PC":
            $("#auto-tenor option[value='12']").show();
            $("#auto-tenor option[value='24']").show();
            $("#auto-tenor option[value='25']").hide();
            $("#auto-tenor option[value='36']").show();
            $("#auto-tenor option[value='48']").show();
            $("#auto-tenor option[value='60']").show();

            $("#auto-insurance option[value='CV']").hide();
            $("#auto-insurance option[value='TLO']").hide();
            $("#auto-insurance option[value='PC']").show();
            $("#auto-insurance option[value='BUS']").hide();
            $("#auto-insurance option[value='BUSTLO']").hide();
            break;
        case "CV":
            $("#auto-tenor option[value='12']").show();
            $("#auto-tenor option[value='24']").hide();
            $("#auto-tenor option[value='25']").show();
            $("#auto-tenor option[value='36']").show();
            $("#auto-tenor option[value='48']").show();
            $("#auto-tenor option[value='60']").hide();

            $("#auto-insurance option[value='CV']").show();
            $("#auto-insurance option[value='TLO']").show();
            $("#auto-insurance option[value='PC']").hide();
            $("#auto-insurance option[value='BUS']").show();
            $("#auto-insurance option[value='BUSTLO']").show();
            break;
    }

    while (modelList.options.length) {
        modelList.remove(0);
    }
    var cars = carsAndModels[selCar];
    if (cars) {
        var i;
        for (i = 0; i < cars.length; i++) {
            var car = new Option(cars[i], i);
            modelList.options.add(car);
        }
    }
}

advMethodSelector = function () {
    navigator.vibrate(40);
    var sel = r('#adv-method');
    switch (sel) {
        case "DP":
            $('#adv-expectDp').css('display', 'block');
            $('#adv-expectTdp').css('display', 'none');
            $('#adv-expectUsl').css('display', 'none');
            break;
        case "TDP":
            $('#adv-expectDp').css('display', 'none');
            $('#adv-expectTdp').css('display', 'block');
            $('#adv-expectUsl').css('display', 'none');
            break;
        case "USL":
            $('#adv-expectDp').css('display', 'none');
            $('#adv-expectTdp').css('display', 'none');
            $('#adv-expectUsl').css('display', 'block');
            break;
    }
}

autoMethodSelector = function () {
    navigator.vibrate(40);
    var sel = r('#auto-method');
    switch (sel) {
        case "DP":
            $('#auto-expectDp').css('display', 'block');
            $('#auto-expectTdp').css('display', 'none');
            $('#auto-expectUsl').css('display', 'none');
            break;
        case "TDP":
            $('#auto-expectDp').css('display', 'none');
            $('#auto-expectTdp').css('display', 'block');
            $('#auto-expectUsl').css('display', 'none');
            break;
        case "USL":
            $('#auto-expectDp').css('display', 'none');
            $('#auto-expectTdp').css('display', 'none');
            $('#auto-expectUsl').css('display', 'block');
            break;
    }
}

insurancePick = function (price, arr) {
    if (price > 0 && price <= 125000000) {
        return (arr['pc1'] / 100).toFixed(4);
    } else if (price > 125000000 && price <= 200000000) {
        return (arr['pc2'] / 100).toFixed(4);
    } else if (price > 200000000 && price <= 400000000) {
        return (arr['pc3'] / 100).toFixed(4);
    } else if (price > 400000000 && price <= 800000000) {
        return (arr['pc4'] / 100).toFixed(4);
    } else if (price > 800000000) {
        return (arr['pc5'] / 100).toFixed(4);
    }
}

autoInsIncToggle = function () {
    navigator.vibrate(30);

    if ($('#auto-insInclude').val() == "no") {
        $('#auto-insIncToggle').css('background-position', 'bottom');
        $('#auto-insInclude').val('yes');
        o('Insurance include NI');
    } else {
        $('#auto-insIncToggle').css('background-position', 'top');
        $('#auto-insInclude').val('no');
        o('Insurance in Advance');
    }
}

autoAddbToggle = function () {
    navigator.vibrate(30);

    if ($('#auto-addb').val() == "no") {
        $('#auto-addbToggle').css('background-position', 'bottom');
        $('#auto-addb').val('yes');
        o('Installment in Arrear');
    } else {
        $('#auto-addbToggle').css('background-position', 'top');
        $('#auto-addb').val('no');
        o('Installment in Advance');
    }
};

autoNpwpToggle = function () {
    navigator.vibrate(30);

    if ($('#auto-npwp').val() == "no") {
        $('#auto-npwpToggle').css('background-position', 'bottom');
        $('#auto-npwp').val('yes');
        o('Tanpa NPWP');
    } else {
        $('#auto-npwpToggle').css('background-position', 'top');
        $('#auto-npwp').val('no');
        o('Dengan NPWP');
    }
};

advInsIncToggle = function () {
    navigator.vibrate(30);

    if ($('#adv-insInclude').val() == "no") {
        $('#adv-insIncToggle').css('background-position', 'bottom');
        $('#adv-insInclude').val('yes');
        o('Insurance include NI');
    } else {
        $('#adv-insIncToggle').css('background-position', 'top');
        $('#adv-insInclude').val('no');
        o('Insurance in Advance');
    }
}

advAddbToggle = function () {
    navigator.vibrate(30);

    if ($('#adv-addb').val() == "no") {
        $('#adv-addbToggle').css('background-position', 'bottom');
        $('#adv-addb').val('yes');
        o('Installment in Arrear');
    } else {
        $('#adv-addbToggle').css('background-position', 'top');
        $('#adv-addb').val('no');
        o('Installment in Advance');
    }
}
