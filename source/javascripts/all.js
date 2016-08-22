// This is where it all goes :)
//main

var previews = document.querySelectorAll(".episode-preview");

var bgColors = [
// bianco     rosso      blu       giallo    arancio   viola     azzurro
  '#F0F8EA', '#FF6663', '#424B54', '#EEC643', '#FF934F', '#4C2B36', '#424B54', '#009FB7', '#113254', '#1C5389', '#007587'
];

function hex2rgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    red: parseInt(result[1], 16) / 255,
    green: parseInt(result[2], 16) / 255,
    blue: parseInt(result[3], 16) / 255
  } : null;
}

function hue(color){
  var r = color.red, b = color.blue, g = color.green;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
    h = s = 0; // achromatic
  }else{
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return h * 360;
}

function rotate(hue, degrees) {
  var hue = (hue + degrees) % 360;
      hue = hue < 0 ? 360 + hue : hue;

  return hue;
}

function brightness(color) {
  return 0.2126 * color.red + 0.7152 * color.green + 0.0722 * color.blue;
}

function isVisible(el) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  return isVisible;
}

[].forEach.call(previews, function(preview) {
  var url = preview.getAttribute("data-preview");
  if (!url) { return; }

  var handleScroll = function() {
    if (isVisible(preview)) {
      window.removeEventListener('scroll', handleScroll);

      fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        var color = response.dominant_colors.vibrant_light;
        var rotatedHue = rotate(hue(color), 180);
        var bestColor = null;
        var bestHue = null;

        bgColors.forEach(function(color) {
          var bgHue = hue(hex2rgb(color));

          if (
            !bestHue ||
            Math.abs(bgHue - rotatedHue) < Math.abs(bestHue - rotatedHue)
          ) {
            bestHue = bgHue;
            bestColor = color;
          }
        });

        preview.style.backgroundColor = bestColor;
        preview.classList.add(
          brightness(hex2rgb(bestColor)) < .6 ?
            "episode-preview--dark" :
            "episode-preview--light"
        );
      })
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

