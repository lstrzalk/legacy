/*******************************
**********CONFIGURE VARS********
*******************************/
var animationTime = 200;
var mouseEntered = false;
var searchClicked = false;
var inputDirty = false;
/*******************************
**********SHOW/HIDE BARS********
*******************************/
$('body,html').mousemove(function(event){
    if(!searchClicked){
        if(event.pageY > 10 && event.pageY < 48 ){
            if(!mouseEntered){
                mouseEntered = true;
                setBarEnter($("#barTop"));
                setBarEnter($("#barBottom"));
                $("#map").animate({top: '48px',height: '-=96px'},animationTime)
            }
        }
        else if(event.pageY < $(window).height() - 10 && event.pageY > $(window).height() - 48){
            if(!mouseEntered){
                mouseEntered = true;
                setBarEnter($("#barBottom"));
                setBarEnter($("#barTop"));
                $("#map").animate({top: '48px',height: '-=96px'},animationTime)
            }
        }
        else{
            if(readyToCompute != true && mouseEntered){
                mouseEntered = false;
                $("#map").animate({top: '0',height: '100%'},animationTime)
                setBarOut($("#barTop"));
                setBarOut($("#barBottom"));
            }
        }
    }
});
//Action for delete everything button
$('#deleteButton').click(function(){
    mouseEntered = false;
    searchClicked = false;
    $("#map").animate({top: '0',height: '100%'},animationTime)
    setBarOut($("#barTop"));
    setBarOut($("#barBottom"));
    hideSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
})
//Triggering search box
$('#barTop #searchButton').click(function(){
    searchClicked = true;
    showSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
});
// $('#barBottom #searchButton').click(function(){
//     showSearchToolbar($('#barBottom .searchBar'), $('#barBottom .markersBar'))
// });
//Exit from search box
$('#barTop #exitButton').click(function(){
    searchClicked = false;
    hideSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
});
//Spy input for change
$('#topInput').on('input',function(e){
     inputDirty = true;
});
//When go to search box clear input from last search
$('input[name=topInput]').focus(
    function(){
        $(this).val('');
});
/*******************************
START PRINTING BUTTONS USE CASES
*******************************/
$('#focusButton').mouseover(function(){
    if(readyToCompute == true){
        if(computed == true){
            $("#topInfo").css({right:"48px"});
            $("#topInfo").css({top:"96px"});
        }else{
            $("#topInfo").css({right:"48px"});
        }
    }
    $("#topInfo").css({'font-size':"20px"});
    $("#topInfo").height("auto");
    $("#topInfo").html("<b>Adjust Map to all markers</b>");
    $("#topInfo").show(200);
});
$('#focusButton').mouseout(function(){
    if(readyToCompute == true){
        if(computed == true){
            $("#topInfo").css({right:"0"});
            $("#topInfo").css({top:"48px"});
        }else{
            $("#topInfo").css({right:"0"});
        }
    }
    $("#topInfo").html("");
    $("#topInfo").hide(200);
    $("#topInfo").css({'font-size':"48px"});
    $("#topInfo").height("48px");
});
$('#searchButton').mouseover(function(){
    if(readyToCompute == true){
        if(computed == true){
            $("#topInfo").css({right:"48px"});
            $("#topInfo").css({top:"96px"});
        }else{
            $("#topInfo").css({right:"48px"});
        }
    }
    $("#topInfo").css({'font-size':"20px"});
    $("#topInfo").height("auto");
    $("#topInfo").html("<b>Find place with Google</b>");
    $("#topInfo").show(200);
});
$('#searchButton').mouseout(function(){
    if(readyToCompute == true){
        if(computed == true){
            $("#topInfo").css({right:"0"});
            $("#topInfo").css({top:"48px"});
        }else{
            $("#topInfo").css({right:"0"});
        }
    }
    $("#topInfo").html("");
    $("#topInfo").hide(200);
    $("#topInfo").css({'font-size':"48px"});
    $("#topInfo").height("48px");
});

$('#computeButton').mouseover(function(){
    if(readyToCompute == true){
        if(computed == true){
            $("#topInfo").css({top:"96px"});
        }
        $("#topInfo").css({right:"48px"});
        $("#topInfo").css({'font-size':"20px"});
        $("#topInfo").height("auto");
        $("#topInfo").html("<b>Get distance</b>");
        $("#topInfo").show(200);
    }
});
$('#computeButton').mouseout(function(){
    if(readyToCompute == true){
        if(computed == true){
            $("#topInfo").css({top:"48px"});
        }
        $("#topInfo").css({right:"0"});
        $("#topInfo").html("");
        $("#topInfo").hide(200);
        $("#topInfo").css({'font-size':"48px"});
        $("#topInfo").height("48px");
    }
});

$('#cancelButton').mouseover(function(){
    if(readyToCompute == true){
        $("#topInfo").css({right:"48px"});
        $("#topInfo").css({top:"96px"});
        $("#topInfo").css({'font-size':"20px"});
        $("#topInfo").height("auto");
        $("#topInfo").html("<b>Close</b>");
        $("#topInfo").show(200);
    }
});
$('#cancelButton').mouseout(function(){
    if(readyToCompute == true){
        $("#topInfo").css({right:"0"});
        $("#topInfo").css({top:"48px"});
        $("#topInfo").html("");
        $("#topInfo").hide(200);
        $("#topInfo").css({'font-size':"48px"});
        $("#topInfo").height("48px");
    }
});
$('#cancelButton').click(function(){
    if(readyToCompute == false){
        $("#topInfo").css({right:"0"});
        $("#topInfo").css({top:"48px"});
        $("#topInfo").html("");
        $("#topInfo").hide(200);
        $("#topInfo").css({'font-size':"48px"});
        $("#topInfo").height("48px");
    }
});

$('#deleteButton').mouseover(function(){
    $("#bottomInfo").show(200);
});
$('#deleteButton').mouseout(function(){
    $("#bottomInfo").hide(200);
});
/*******************************
*END PRINTING BUTTONS USE CASES*
*******************************/

//Event handler for pressing enter
$(document).keypress(function(e) {
    if(e.which == 13) {
        hideSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
    }
});

//Event for hiding search bar after clicking, not hiting enter
$(document).click(function(event) {
    if(inputDirty){
        inputDirty = false;
        hideSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
    }
});
//Function to make bar visible
var setBarEnter = function(elem){
    elem.fadeTo(animationTime,1,"swing");
}
// function to make bar invisible
var setBarOut = function(elem){
    elem.fadeTo(animationTime,0,"swing");
}
// shows search tab
var showSearchToolbar = function(searchBar, tagsBar){
    tagsBar.css({visibility:'hidden'});
    tagsBar.fadeTo(animationTime, 0, "swing");
    searchBar.css({visibility:'visible'});
    searchBar.fadeTo(animationTime,1,"swing");
    $('#topInput').focus()
}
//hides search tab
var hideSearchToolbar = function(searchBar, tagsBar){
    searchBar.css({visibility:'hidden'});
    searchBar.fadeTo(animationTime,0,"swing");
    tagsBar.css({visibility:'visible'});
    tagsBar.fadeTo(animationTime, 1, "swing");
}
//Show distance
function showComputingWindow(){
    if(readyToCompute == true){
        setBarEnter($("#barBottom"));
        setBarEnter($("#barTop"));
        $("#rightPannel").show(100)
        setBarEnter($("#rightPannel"));
    }
}
//Hide old computing with all computing stuff
function hideComputingWindow(){
    if(readyToCompute == false){
        $("#map").animate({top: '0',height: '100%'},animationTime);
        $("#rightPannel").hide(100);
        setBarOut($("#barTop"));
        setBarOut($("#barBottom"));
        setBarOut($("#rightPannel"));
        hideResult();
    }
}
//Put prepared distance into html element and show it
function printDistance(distance){
    $("#computeResult").html(distance);
    $("#computeResult").show();
}
//hide only div with distance
function hideResult(){
    $("#computeResult").hide();
}