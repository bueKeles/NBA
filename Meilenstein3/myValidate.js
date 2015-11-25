/**
 * Created by nurcan_oez on 20.11.15.
 */
var regexAlpha = /^([a-zA-ZäöüÄÖÜß]+[\s]+)*[a-zA-ZäöüÄÖÜß]+$/;
var regexNumber = /^[4-9]$|^1[0-5]$/g;
var regexYear = /^\d{4}$/;
var wrongElem = undefined;


function test(elem, regex, validate, actionWrong)
{
    if(actionWrong != undefined && typeof(actionWrong) == 'function') // action when validation failed
    {
        if(validate != undefined && typeof(validate) == 'function') // extra validate function
        {
            if(elem.value.match(regex) && validate(elem))
                return true;
            else
            {
                actionWrong(elem);
                return false;
            }
        }
        else
        {
            if(elem.value.match(regex))
                return true;
            else
            {
                actionWrong(elem);
                return false;
            }
        }
    }
    else
    {
        if(validate != undefined && typeof(validate) == 'function')
            return elem.value.match(regex) && validate(elem);
        else
            return elem.value.match(regex);
    }
}

function validateYear(elem)
{
    var curYear=new Date().getFullYear();
    return elem.value <= curYear;
}

function markAsWrong(elem)
{
    elem.classList.add("wrongInput");

    if(wrongElem == undefined)
        wrongElem = elem;
}

function removeAllMarkings()
{
    var elements = document.getElementsByClassName("wrongInput");

    for(var elem = 0; elem < elements.length; elem++)
        removeMarking(elements[elem]);
}

function removeMarking(elem)
{
    elem.classList.remove("wrongInput");
    wrongElem = undefined;
}

function checkPlayer()
{
    removeAllMarkings();

    var vorname = document.getElementById("vorname");
    var nachname = document.getElementById("name");
    var verein = document.getElementById("verein");
    var hcoach = document.getElementById("hcoach");
    var acoach = document.getElementById("acoach");
    var number = document.getElementById("number");
    var jahr = document.getElementById("jahr");

    var flag = test(vorname, regexAlpha, null, markAsWrong) & test(nachname, regexAlpha, null, markAsWrong)
        & test(verein,regexAlpha,null,markAsWrong) & test(hcoach,regexAlpha,null,markAsWrong) & test(acoach,regexAlpha,null,markAsWrong) &
            test(number,regexNumber,null,markAsWrong) & test(jahr,regexYear,validateYear,markAsWrong);

    if(!flag)
        alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben");

    if(wrongElem != undefined)
        wrongElem.focus();

    return flag ? true : false;
}

