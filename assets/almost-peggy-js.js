$(document).ready(function() {

  // get the full URL at the address bar
  var url = window.location.href;

  // passes on every "a" tag
  $(".main-nav a").each(function() {
    // checks if its the same on the address bar
    if (url == (this.href)) {
      $(this).closest("li").addClass("active");
    }
  });

  $('[data-toggle="popover"]').popover({
    container: 'body',
    html : true
  });
  
  // header sticky to top
  $('.sticky-header').stick_in_parent({parent:'body'});

  
  if($('.add-to-cart-button').click(function() {
    // show cart updated modal
    $('#cart-updated-modal').modal('show');
    // re-load page on modal close to update cart
    $('#cart-updated-modal').on('hidden.bs.modal', function () {
        location.reload();
    });

  }));

});

//this is where we apply opacity to the arrow
$(window).scroll( function(){

  //get scroll position
  var topWindow = $(window).scrollTop();
  //multipl by 1.5 so the arrow will become transparent half-way up the page
  var topWindow = topWindow * 1.5;
  
  //get height of window
  var windowHeight = $(window).height();
      
  //set position as percentage of how far the user has scrolled 
  var position = topWindow / windowHeight;
  //invert the percentage
  position = 1 - position;

  //define arrow opacity as based on how far up the page the user has scrolled
  //no scrolling = 1, half-way up the page = 0
  $('.arrow-wrap').css('opacity', position);

});


//Code stolen from css-tricks for smooth scrolling:
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

