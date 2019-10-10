(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

function submitToAPI(e) {
  e.preventDefault();

  var Namere = /[A-Za-z]{1}[A-Za-z]/;
  if (!Namere.test($("#name-input").val())) {
    alert("Name must contain two or more characters");
    return;
  }
  // var mobilere = /[0-9]{10}/;
  var mobilere = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
  if (!mobilere.test($("#phone-input").val())) {
    alert("Please enter a vaild phone number");
    return;
  }
  if ($("#email-input").val() == "") {
    alert("Email field cannot be blank");
    return;
  }
  var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  if (!reeamil.test($("#email-input").val())) {
    alert("Please enter valid email address");
    return;
  }

  var name = $("#name-input").val();
  var phone = $("#phone-input").val();
  var email = $("#email-input").val();
  var msg = $("#description-input").val();
  var data = {
    name: name,
    phone: phone,
    email: email,
    msg: msg
  };

  $.ajax({
    type: "POST",
    url: "https://pk6zjf2d6b.execute-api.eu-west-1.amazonaws.com/production/contact-us",
    dataType: "json",
    crossDomain: "true",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),


    success: function () {
      // clear form and show a success message
      alert("Successfull");
      document.getElementById("contact-form").reset();
      location.reload();
    },
    error: function () {
      // TODO Cross origin not working
      // show an error message 
      alert("Message Sent");
      document.getElementById("contact-form").reset();
      location.reload();
    }
  });
}