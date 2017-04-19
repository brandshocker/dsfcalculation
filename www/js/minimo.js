/////////////////////////// COMMON VARIABLES
var activePage = "calculation";

/////////////////////////// IMPORTANT
function o(i){ console.log(i); }

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
}

// Close Navigation
navClose = function()
{
    // o('Navigation panel close');
    
    $('#sidenav').css('width', '0px');
    $('#headerImage').css('left', 'calc(100% - 200px)');
    
    $('#main').css('margin-left', '0px');
    $('#menuCloser').css('visibility','visible');
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
}

// Show minimo box
showMinimo = function() 
{
    $('#minimo').css({"left":"0px","visibility":"visible","opacity":"1"});
    navClose();
}

// Hide minimo box
hideMinimo = function()
{
$('#minimo').css('opacity','0');
    setTimeout(function() {
        $('#minimo').css({"left":"200px","visibility":"hidden"});
    }, 1000);
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
    o('Closing preloader');
    
    $("#loader").hide();
}

// Preload jquery
$(function()
{
    o( "Initializing application" );
    
    // hide the preloader
    $("#loader").hide();
});