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

  }));

    $('#cart-updated-modal').on('hidden.bs.modal', function (e) {
      location.reload();
    })

});

