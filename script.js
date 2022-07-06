//posted on slack but how to make button to go to otp of screen
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {       
        $('.return-to-top').fadeIn(200);
    } else {
        $('.return-to-top').fadeOut(200);  
    }
});
$('.return-to-top').click(function() {      
    $('body,html').animate({
        scrollTop : 0                       
    }, 500);
});
// makes dark and light mode 
$(".mode").click(function(){
    $("body").toggleClass("dark");
    $("body").toggleClass("body");
    $("#nav").toggleClass("topnav")
    $("#nav").toggleClass("topnav2")
    $("input").toggleClass("input")
    $("input").toggleClass("input2")
    $("#sun").toggleClass("fa-moon")
    $("#sun").toggleClass("fa-sun")
});

