var animationTime = 100;
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
        setTopOut( $(this));
        setBottomOut($("#barBottom"));
        $("#map").animate({top: '0',height: '100%'},animationTime)
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
        setBottomOut( $(this));
        setTopOut($("#barTop"));
        $("#map").animate({top: '0',height: '100%'},animationTime)
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
    setTimeout(function(){
        elem.slideDown();
    }, animationTime)
}
var setTopOut = function(elem){
    elem.hide();
    setTimeout(function(){
    }, animationTime)
}
var setBottomEnter = function(elem){
    setTimeout(function(){
        elem.slideUp();
    }, animationTime)
}
var setBottomOut = function(elem){
    elem.hide();
    setTimeout(function(){
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