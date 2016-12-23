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

  // add instagram feed to all pages
  if (Theme.showInstagramWidget) {
      return getInstagramImages();
    }
    function getInstagramImages() {
    var instagramWidget, photoContainer, url;
    instagramWidget = this.$('.home-instagram');
    photoContainer = this.$('.instagram-photos');
    if (Theme.showInstagramTag) {
      url = "https://api.instagram.com/v1/tags/" + Theme.instagramTag + "/media/recent?access_token=" + Theme.instagramAccessToken + "&count=6&callback=";
    } else {
      url = "https://api.instagram.com/v1/users/self/media/recent?access_token=" + Theme.instagramAccessToken + "&count=6&callback=";
    }
    return $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: url,
      success: (function(_this) {
        return function(response) {
          var i, len, photo, ref, results;
          if (response.meta.code === 200) {
            ref = response.data;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              photo = ref[i];
              results.push(photoContainer.append("<a class='instagram-photo' target='_blank' href='" + photo.link + "'><img src='" + photo.images.low_resolution.url + "'/></a>"));
            }
            return results;
          } else {
            instagramWidget.remove();
            return console.log("Instagram error: " + response.meta.error_message);
          }
        };
      })(this),
      error: (function(_this) {
        return function(response) {
          instagramWidget.remove();
          return console.log("Instagram error: " + response.meta.error_message);
        };
      })(this)
    });
  };
  // end instagram

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


