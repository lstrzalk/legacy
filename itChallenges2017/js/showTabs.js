var animationTime = 500;
var mouseEntered = false;
var searchClicked = false;
// $('#barTop').mouseenter(function() {
//     if(!mouseEntered){
//         mouseEntered = true;
//         setTopEnter( $(this));
//         setBottomEnter($("#barBottom"));
//         $("#map").animate({top: '48px',height: '-=96px'},animationTime)
//     }
// });
// $('#barTop').mouseleave(function() {
//     if(mouseEntered){
//         mouseEntered = false;
//         $("#map").animate({top: '0',height: '100%'},animationTime)
//         setTopOut( $(this));
//         setBottomOut($("#barBottom"));
//     }
// });
// $('#barBottom').mouseenter(function() {
//     if(!mouseEntered){
//         mouseEntered = true;
//         setBottomEnter( $(this));
//         setTopEnter($("#barTop"));
//         $("#map").animate({top: '48px',height: '-=96px'},animationTime)
//     }
// });
// $('#barBottom').mouseleave(function() {
//     if(mouseEntered){
//         mouseEntered = false;
//         $("#map").animate({top: '0',height: '100%'},animationTime)
//         setBottomOut( $(this));
//         setTopOut($("#barTop"));
//     }
// });
$('body,html').mousemove(function(event){
    if(!searchClicked){
        if(event.pageY > 10 && event.pageY < 48 ){
            if(event.pageX > $(window).width() / 10 ){
                if(!mouseEntered){
                    mouseEntered = true;
                    setTopEnter($("#barTop"));
                    setBottomEnter($("#barBottom"));
                    $("#map").animate({top: '48px',height: '-=96px'},animationTime)
                }
            }
        }
        else if(event.pageY < $(window).height() - 10 && event.pageY > $(window).height() - 48){
            if(event.pageX < $(window).width() * 0.96 ){
                if(!mouseEntered){
                    mouseEntered = true;
                    setBottomEnter($("#barBottom"));
                    setTopEnter($("#barTop"));
                    $("#map").animate({top: '48px',height: '-=96px'},animationTime)
                }
            }
        }
        else{
            if(mouseEntered){
                mouseEntered = false;
                $("#map").animate({top: '0',height: '100%'},animationTime)
                setTopOut($("#barTop"));
                setBottomOut($("#barBottom"));
            }
        }
    }
});
$('.deleteButton').click(function(){
    mouseEntered = false;
    searchClicked = false;
    $("#map").animate({top: '0',height: '100%'},animationTime)
    setTopOut($("#barTop"));
    setBottomOut($("#barBottom"));
    hideSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
})
$('#barTop .searchButton').click(function(){
    searchClicked = true;
    showSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
});
$('#barBottom .searchButton').click(function(){
    showSearchToolbar($('#barBottom .searchBar'), $('#barBottom .markersBar'))
});
$('#barTop .exitButton').click(function(){
    searchClicked = false;
    hideSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
});
$('input[name=topInput]').focus(
    function(){
        $(this).val('');
});
$(document).keypress(function(e) {
    if(e.which == 13) {
        hideSearchToolbar($('#barTop .searchBar'), $('#barTop .markersBar'))
    }
});
$(document).click(function(event) {
    event.stopImmediatePropagation();
});
var setTopEnter = function(elem){
        elem.fadeTo(animationTime,1,"swing");
}
var setTopOut = function(elem){
    elem.fadeTo(animationTime,0,"swing");
}
var setBottomEnter = function(elem){
        elem.fadeTo(animationTime,1,"swing");
}
var setBottomOut = function(elem){
    elem.fadeTo(animationTime,0,"swing");
}
var showSearchToolbar = function(searchBar, tagsBar){
    tagsBar.css({visibility:'hidden'});
    tagsBar.fadeTo(animationTime, 0, "swing");
    searchBar.css({visibility:'visible'});
    searchBar.fadeTo(animationTime,1,"swing");
    $('#topInput').focus()
}
var hideSearchToolbar = function(searchBar, tagsBar){
    searchBar.css({visibility:'hidden'});
    searchBar.fadeTo(animationTime,0,"swing");
    tagsBar.css({visibility:'visible'});
    tagsBar.fadeTo(animationTime, 1, "swing");
}