"use strict";

function getTheTime() {
	var offset = 2;
	var x = new Date( new Date().getTime() + offset * 3600 * 1000)
	var hoursIn24Format = x.getUTCHours();
	var hours = hoursIn24Format > 12 ? hoursIn24Format - 12 : hoursIn24Format;
	var getMinutes = x.getUTCMinutes();
	var amOrPm = hoursIn24Format > 12 ? 'PM' : 'AM'
	var isNight = hoursIn24Format > 19 || hoursIn24Format < 7 ? true : false;
	var isOnes  = getMinutes < 10 ? true : false;
	var minutes;

	//print time
	if( isOnes ){
		minutes = '0'+getMinutes;
	} else {
		minutes = getMinutes;
	}

	$( "#timeOne, #timeTwo" ).text(hours + ':' + minutes + '' + amOrPm);
	return isNight;
}

function setInitialLight() {
   var isNight = getTheTime();
		//change lighting
	if( isNight ){
		$( "body" ).addClass( "in-the-dark" );
	} else {
		$( "body" ).removeClass( "in-the-dark" );
	}
}




var player;
function onYouTubePlayerAPIReady() {player = new YT.Player('player');}

$(document).ready(function() {
  //print temp
  $.simpleWeather({
    location: 'Tel Aviv, Israel',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      var html = weather.temp+'&deg;'+weather.units.temp;
  
      $( "#weatherOne, #weatherTwo" ).html(html);
    },
    error: function(error) {
      $( "#weatherOne, #weatherTwo" ).html(error);
    }
  });

  //set lighting on page load according to time in TLV
  setInitialLight();

  //get live time in TLV
  setInterval(function(){
  	getTheTime();
  }, 1000);

  //wire up the switch
  $( "#switch" ).click(function() {
  	$('body').toggleClass( "in-the-dark" );
	});

  //toggle more-stuff
  $( "footer" ).click(function() {
  	$(this).toggleClass( "show" );
	});

  // close more-stuff if clicking away
  $( "body > main" ).click(function() {
  		$( "footer" ).removeClass( "show" );
  });

  //animate switch chupchik
  $( "#chupchik" ).click(function() {
      $( "#chupchik" ).toggleClass( "up" );
  });

  //open info-lightbox
  $( "#info-contact" ).click(function() {
    $( ".info-lightbox" ).addClass( "is-visible" );
    $( "main" ).addClass( "locked" );
    $( "footer" ).addClass( "hidden" );
  });

  //close info-lightbox
  $( ".info-lightbox > #close" ).click(function() {
    $( ".info-lightbox" ).removeClass( "is-visible" );
    $( "main" ).removeClass( "locked" );
    $( "footer" ).removeClass( "hidden peek" );
    window.scrollTo(0,0);
  });

  //open helix-lightbox
  $( "#whats-helix" ).click(function() {
    $( ".helix-lightbox" ).addClass( "is-visible" );
    $( "body" ).addClass( "locked" );
    // $( "footer" ).addClass( "hidden" );
    player.playVideo();
  });

  //close helix-lightbox
  $( "#close, .helix-lightbox > .lightbox-bg" ).click(function() {
    $( ".helix-lightbox" ).removeClass( "is-visible" );
    $( "body" ).removeClass( "locked" );
    // $( "footer" ).removeClass( "hidden peek" );
    player.stopVideo();
  });


  //switch images in info-lightbox
  $( ".subgrid > div" ).hover(
  function() {
      var infoImgUrl = $( this ).data("info-img");
      $( ".info-img" ).css('background-image', 'url(' + infoImgUrl + ')');
    }, function() {
      $( ".info-img" ).css('background-image', 'url(assets/images/me-b&w.jpg)');
    }
  );

});


$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
       $('footer').addClass('peek');
   } else {
   		$('footer').removeClass('peek');
   }
});



$(document).ready(function() {
  $('#drag').draggable();
});



