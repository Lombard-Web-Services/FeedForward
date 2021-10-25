(function($, undefined) {
  '$:nomunge'; // Used by YUI compressor.
  $.fn.serializeObject = function() {
    var obj = {};
    $.each(this.serializeArray(), function(i, o) {
      var n = o.name,
        v = o.value;
      obj[n] = obj[n] === undefined ? v : $.isArray(obj[n]) ? obj[n].concat(v) : [obj[n], v];
    });
    return obj;
  };
})(jQuery);
jQuery.extend({
  compare: function(a, b) {
    var obj_str = '[object Object]',
      arr_str = '[object Array]',
      a_type = Object.prototype.toString.apply(a),
      b_type = Object.prototype.toString.apply(b);
    if (a_type !== b_type) {
      return false;
    } else if (a_type === obj_str) {
      return $.compareObject(a, b);
    } else if (a_type === arr_str) {
      return $.compareArray(a, b);
    }
    return (a === b);
  }
});
jQuery.extend({
  compareArray: function(arrayA, arrayB) {
    var a, b, i, a_type, b_type;
    // References to each other?
    if (arrayA === arrayB) {
      return true;
    }
    if (arrayA.length != arrayB.length) {
      return false;
    }
    // sort modifies original array
    // (which are passed by reference to our method!)
    // so clone the arrays before sorting
    a = jQuery.extend(true, [], arrayA);
    b = jQuery.extend(true, [], arrayB);
    a.sort();
    b.sort();
    for (i = 0, l = a.length; i < l; i += 1) {
      a_type = Object.prototype.toString.apply(a[i]);
      b_type = Object.prototype.toString.apply(b[i]);
      if (a_type !== b_type) {
        return false;
      }
      if ($.compare(a[i], b[i]) === false) {
        return false;
      }
    }
    return true;
  }
});
jQuery.extend({
  compareObject: function(objA, objB) {
    var i, a_type, b_type;
    // Compare if they are references to each other 
    if (objA === objB) {
      return true;
    }
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }
    for (i in objA) {
      if (objA.hasOwnProperty(i)) {
        if (typeof objB[i] === 'undefined') {
          return false;
        } else {
          a_type = Object.prototype.toString.apply(objA[i]);
          b_type = Object.prototype.toString.apply(objB[i]);
          if (a_type !== b_type) {
            return false;
          }
        }
      }
      if ($.compare(objA[i], objB[i]) === false) {
        return false;
      }
    }
    return true;
  }
});
$(document).ready(function() {
  resizeImage = function(base64Str, maxWidth, maxHeight) {
    img = new Image();
    img.src = base64Str;
    canvas = document.createElement('canvas');
    MAX_WIDTH = maxWidth;
    MAX_HEIGHT = maxHeight;
    width = maxWidth;
    height = maxHeight;
    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL();
  }
  // module linguistique.
  // object contenant les images :
  questionsimageob = {};
  dummy_step2;
  dummy_imagedepresentation;
  //configure la durée du formulaire de création de quiz
  $(".timing").timingfield();
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  steps = $("fieldset").length;

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%")
  }
  // formulaire d'upload d'images
  ////////////////////////////////////////////////////////////////////////
  $(document).on('click', '[id^=imageuploadform]', function() {
    Unid = parseInt(this.id.substring(15));
    imageuploadcool(Unid);
  });
  imageuploadcool = function(Unid) {
    input = document.querySelector('.iux' + Unid);
    preview = document.getElementById('.preview_imagedepresentationx' + Unid);
    input.style.opacity = 0;
    input.addEventListener('change', updateImageDisplay);
    mylang = JSON.parse(localStorage['lang'] || 'defaultValue');

    function updateImageDisplay() {
      preview = document.querySelector('.preview_imagedepresentationx' + Unid);
      var buid;
      while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
      }
      curFiles = input.files;
      if (curFiles.length === 0) {
        var para = document.createElement('p');
        para.textContent = window.langageObject['mots_' + mylang]['selectionnezfichier'];
        preview.appendChild(para);
      } else {
        for (var i = 0; i < curFiles.length; i++) {
          var para = document.createElement('p');
          if (validFileType(curFiles[i])) {
            var image = document.createElement('img');
            image.setAttribute('id', 'prvw' + Unid);
            image.setAttribute('width', '20%');
            para.setAttribute('style', 'line-height:2em;');
            image.setAttribute('style', 'clear:both;float:right;vertical-align:middle;');
            image.src = window.URL.createObjectURL(curFiles[i]);
            myimg = document.getElementById('prvw' + Unid);
            para.textContent = 'Nom : ' + curFiles[i].name + ' Taille : ' + returnFileSize(curFiles[i].size) + '.';
            //console.log('Nom : ' + curFiles[i].name + ' Taille : ' + returnFileSize(curFiles[i].size) + '.');		
            preview.appendChild(para);
            para.appendChild(image);
            var DOMURL = window.URL || window.webkitURL || window;
            var mime = curFiles[i].type + ';charset=utf-8';
            var png = new Blob([curFiles[i]], {
              type: mime
            });
            var url = DOMURL.createObjectURL(png);
            var b64imagedepresentation;
            var reader = new window.FileReader();
            // added
            reader.onload = function(e) {
              image.src = e.target.result
            }
            reader.readAsDataURL(png);
            //fin added
            //////////////////////////////////////////
            reader.onloadend = function() {
              b64imagedepresentation0 = reader.result;
              b64imagedepresentation = resizeImage(b64imagedepresentation0, 854, 480);
              //console.log('image found from updateimagedisplay:');
              //console.log(b64imagedepresentation);
              $('#b64imagedepresentation' + Unid).val(b64imagedepresentation);
            }
            preview.appendChild(para);
          }
        }
      }
    }
    var fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png']

    function validFileType(file) {
      for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
          return true;
        }
      }
      return false;
    }

    function returnFileSize(number) {
      if (number < 1024) {
        return number + ' octets';
      } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + ' Ko';
      } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + ' Mo';
      }
    }

    function blobToDataURL(blob, callback) {
      var a = new FileReader();
      a.onload = function(e) {
        callback(e.target.result);
      }
      a.readAsDataURL(blob);
    }

    function getBase64Image(img, wi, he) {
      var canvas = document.createElement("canvas");
      canvas.width = parseInt(wi);
      canvas.height = parseInt(he);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      return dataURL;
    }
  }
  // fin du formulaire d'upload d'images
  // a decommenter pour validation du formulaire avec jquery validate
  jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^[\w.]+$/i.test(value);
  }, "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">" + langageObject['mots_' + mylang]['seulslettresnombresacceptes'] + "</i>");
  //hide the current fieldset with style
  setProgressBar(current);
  // Début du form validation
  //form create quiz validate
  var form = $("#create-quiz");
  form.validate({
    ignore: ".ignore, :hidden",
    errorElement: 'div',
    errorClass: 'help-block',
    highlight: function(element, errorClass, validClass) {
      $(element).closest('.form-wrapper').addClass("has-error");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).closest('.form-wrapper').removeClass("has-error");
    },
    rules: {
      intitule: {
        required: true,
        minlength: 4,
      },
      description: {
        minlength: 4,
        required: true,
      },
      timing: {
        required: true,
        number: true
      },
    },
    messages: {
      intitule: {
        required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">" + langageObject['mots_' + mylang]['titrerequis'] + "</i>",
      },
      description: {
        required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">" + langageObject['mots_' + mylang]['descriptionrequise'] + "</i>",
      },
      timing: {
        required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">" + langageObject['mots_' + mylang]['dureesuperieurzero'] + "</i>",
      },
      categorie: {
        required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">" + langageObject['mots_' + mylang]['categorierequise'] + "</i>",
      }
    }
  });
  $(document).on('click', '.next1', function() {
    if (isNaN(parseInt($('.timing').val()))) {
      tv = 0;
    } else {
      tv = parseInt($('.timing').val());
    }
    var form = $("#create-quiz");
    form.validate();
    if (form.valid() === true) {
      //configuration de l'ajout des images en page1
      getbdui = $("#b64imagedepresentation0").val();
      if ((typeof getbdui === 'undefined' || getbdui == '')) {
        getbdui = dummy_imagedepresentation;
        //console.log('getbdui '+getbdui);
        //document.write('<img src="'+getbdui+'" />');
        //$('.messagemodal').html('Image de présentation absente , la dimension de l\'image doît être de 400px (largeur) x 200px (hauteur) minimum ou un multiple valide.');
        //throwmodal();
        //return false;
      } else {
        getbdui = $("#b64imagedepresentation0").val();
        //console.log('step 1 image found added into object questionsimageob' );
      }
      questionsimageob[0] = getbdui;
      //document.write('	<img src="'+getbdui+'" width="100%" height="100%" />');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // fin de configuration de la fin des images en page1	
      current_fs = $(this).parent();
      next_fs = $(this).parent().next();
      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
      //show the next fieldset
      next_fs.show();
      $('.forceshow').show();
      $('.forceshow').css({
        'opacity': 1
      });
      $('.previous2').css({
        'opacity': 1
      });
      $('.next2').css({
        'opacity': 1
      });
      //hide the current fieldset with style
      current_fs.animate({
        opacity: 0
      }, {
        step: function(now) {
          // for making fielset appear animation
          opacity = 1 - now;
          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          next_fs.css({
            'opacity': opacity
          });
        },
        duration: 500
      });
      setProgressBar(++current);
    };
  });
  $(".previous").click(function() {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function(now) {
        // for making fielset appear animation
        opacity = 1 - now;
        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        previous_fs.css({
          'opacity': opacity
        });
      },
      duration: 500
    });
    setProgressBar(--current);
  });
  $(".submit").click(function() {
    // créé l'empreinte navigateur
    var fp4 = new Fingerprint();
    var fg = fp4.get();
    var ts = fg.toString();
    var hash = CryptoJS.RIPEMD160(ts);
    $("[name='fingerprint']").val(hash);
    leformulaire = $('form').serializeObject();
  });
});
