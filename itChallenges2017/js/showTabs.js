var animationTime = 500;
var mouseEntered = false;
$('#barTop').mouseenter(function() {
    if(!mouseEntered){
        mouseEntered = true;
        setTopEnter( $(this));
        setBottomEnter($("#barBottom"));
        $("#map").animate({top: '48px',height: '-=96px'},animationTime)
    }
});
$('#barTop').mouseleave(function() {
    if(mouseEntered){
        mouseEntered = false;
        $("#map").animate({top: '0',height: '100%'},animationTime)
        setTopOut( $(this));
        setBottomOut($("#barBottom"));
    }
});
$('#barBottom').mouseenter(function() {
    if(!mouseEntered){
        mouseEntered = true;
        setBottomEnter( $(this));
        setTopEnter($("#barTop"));
        $("#map").animate({top: '48px',height: '-=96px'},animationTime)
    }
});
$('#barBottom').mouseleave(function() {
    if(mouseEntered){
        mouseEntered = false;
        $("#map").animate({top: '0',height: '100%'},animationTime)
        setBottomOut( $(this));
        setTopOut($("#barTop"));
    }
});
$('#barTop .searchButton').click(function(){
    showSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
});
$('#barBottom .searchButton').click(function(){
    showSearchToolbar($('#barBottom .searchBar'), $('#barBottom .markersBar'))
});
$('#barTop .exitButton').click(function(){
    hideSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
});

$('#barBottom .exitButton').click(function(){
    hideSearchToolbar($('#barBottom .searchBar'), $('#barBottom .markersBar'))
});

var setTopEnter = function(elem){
    elem.css({left:'0'}).width('100%');
    setTimeout(function(){
        elem.fadeTo(animationTime,1,"swing");
    }, animationTime)
}
var setTopOut = function(elem){
    elem.fadeTo(animationTime,0,"swing");
    setTimeout(function(){
        elem.css({left:'10%'}).width('90%');
    }, animationTime)
}
var setBottomEnter = function(elem){
    elem.css({right:'0'}).width('100%');
    setTimeout(function(){
        elem.fadeTo(animationTime,1,"swing");
    }, animationTime)
}
var setBottomOut = function(elem){
    elem.fadeTo(animationTime,0,"swing");
    setTimeout(function(){
        elem.css({right:'4%'}).width('96%');
    }, animationTime)
}
var showSearchToolbar = function(searchBar, tagsBar){
    tagsBar.css({visibility:'hidden'});
    tagsBar.fadeTo(animationTime, 0, "swing");
    searchBar.css({visibility:'visible'});
    searchBar.fadeTo(animationTime,1,"swing");
}
var hideSearchToolbar = function(searchBar, tagsBar){
    searchBar.css({visibility:'hidden'});
    searchBar.fadeTo(animationTime,0,"swing");
    tagsBar.css({visibility:'visible'});
    tagsBar.fadeTo(animationTime, 1, "swing");
}