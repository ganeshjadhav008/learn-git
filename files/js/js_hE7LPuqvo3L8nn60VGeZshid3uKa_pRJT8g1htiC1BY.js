/*!
	Colorbox 1.6.4
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(A+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in x[0]&&!x[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),x.focus())}function c(t){c.str!==t&&(x.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){A=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),A=W.index(_.el),-1===A&&(W=W.add(_.el),A=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!U){U=$=!0,c(_.get("className")),x.css({visibility:"hidden",display:"block",opacity:""}),I=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(I),j=T.height()+k.height()+b.outerHeight(!0)-b.height(),D=C.width()+H.width()+b.outerWidth(!0)-b.width(),N=I.outerHeight(!0),z=I.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=Math.max((l!==!1?Math.min(h,a(l,"x")):h)-z-D,0),_.h=Math.max((f!==!1?Math.min(s,a(f,"y")):s)-N-j,0),I.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(F).hide(),x.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}var p=parseFloat(_.get("opacity"));v.css({opacity:p===p?p:"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){x||(V=!1,E=t(i),x=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),L=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),y=n(se,"Wrapper"),b=n(se,"Content").append(F=n(se,"Title"),R=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),S=t('<button type="button"/>').attr({id:Z+"Slideshow"}),L),B=t('<button type="button"/>').attr({id:Z+"Close"}),y.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(R).add(S)),e.body&&!x.parent().length&&t(e.body).append(v,x.append(y,M))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return x?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;U&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),U&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if($=!0,q=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-N-j:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-z-D:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-z-D,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-N-j,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){L.show()},100),_.get("inline")){var c=t(e).eq(0);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),q=_.get("createImg"),t(q).addClass(Z+"Photo").bind("error."+Z,function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;_.get("retinaImage")&&i.devicePixelRatio>1&&(q.height=q.height/i.devicePixelRatio,q.width=q.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){q.height-=q.height*e,q.width-=q.width*e},_.mw&&q.width>_.mw&&(e=(q.width-_.mw)/q.width,o()),_.mh&&q.height>_.mh&&(e=(q.height-_.mh)/q.height,o())),_.h&&(q.style.marginTop=Math.max(_.mh-q.height,0)/2+"px"),W[1]&&(_.get("loop")||W[A+1])&&(q.style.cursor="pointer",t(q).bind("click."+Z,function(){J.next()})),q.style.width=q.width+"px",q.style.height=q.height+"px",h(q)},1)}),q.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,x,y,b,T,C,H,k,W,E,I,M,L,F,R,S,K,P,B,O,_,j,D,N,z,A,q,U,$,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title},createImg:function(){var e=new Image,i=t(this).data("cbox-img-attrs");return"object"==typeof i&&t.each(i,function(t,i){e[t]=i}),e},createIframe:function(){var i=e.createElement("iframe"),n=t(this).data("cbox-iframe-attrs");return"object"==typeof n&&t.each(n,function(t,e){i[t]=e}),"frameBorder"in i&&(i.frameBorder=0),"allowTransparency"in i&&(i.allowTransparency="true"),i.name=(new Date).getTime(),i.allowFullscreen=!0,i}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[A+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){S.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),x.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),S.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),x.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,S.hide(),t(),ae.unbind(ne,e).unbind(ie,t),x.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),S.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;return e=e||{},t.isFunction(o)&&(o=t("<a/>"),e.open=!0),o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(x[0].style.width,10)-D+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(x[0].style.height,10)-j+"px"}var r,h,s,l=0,d=0,c=x.offset();if(E.unbind("resize."+Z),x.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,x.css({position:"fixed"})):(l=h,d=s,x.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-z-D-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-z-D,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-N-j-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-N-j,0)/2),x.css({top:c.top,left:c.left,visibility:"visible"}),y[0].style.width=y[0].style.height="9999px",r={width:_.w+z+D,height:_.h+N+j,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||x.css(r),x.dequeue().animate(r,{duration:e||0,complete:function(){n(),$=!1,y[0].style.width=_.w+z+D+"px",y[0].style.height=_.h+N+j+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),t.isFunction(i)&&i()},step:n})},J.resize=function(t){var e;U&&(t=t||{},t.width&&(_.w=a(t.width,"x")-z-D),t.innerWidth&&(_.w=a(t.innerWidth,"x")),I.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-N-j),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=I.scrollTop(),I.css({height:"auto"}),_.h=I.height()),I.css({height:_.h}),e&&I.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||I.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||I.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if(U){var d,g="none"===_.get("transition")?0:_.get("speed");I.remove(),I=n(se,"LoadedContent").append(i),I.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(q).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&x[0].style.removeAttribute("filter")}var n,o,a=W.length;U&&(o=function(){clearTimeout(Q),L.hide(),u(ne),_.get("onComplete")},F.html(_.get("title")).show(),I.show(),a>1?("string"==typeof _.get("current")&&R.html(_.get("current").replace("{current}",A+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>A?"show":"hide"]().html(_.get("next")),P[_.get("loop")||A?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=_.get("createIframe"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),"class":Z+"Iframe"}).one("load",o).appendTo(I),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?x.fadeTo(g,1,i):i())},"fade"===_.get("transition")?x.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!$&&W[1]&&(_.get("loop")||W[A+1])&&(A=h(1),f(W[A]))},J.prev=function(){!$&&W[1]&&(_.get("loop")||A)&&(A=h(-1),f(W[A]))},J.close=function(){U&&!G&&(G=!0,U=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),x.stop().fadeTo(_.get("fadeOut")||0,0,function(){x.hide(),v.hide(),u(he),I.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){x&&(x.stop(),t[Y].close(),x.stop(!1,!0).remove(),v.remove(),G=!1,x=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);;
/**
 * @file
 * Colorbox module init js.
 */

(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    // Use "data-colorbox-gallery" if set otherwise use "rel".
    settings.colorbox.rel = function () {
      if ($(this).data('colorbox-gallery')) {
        return $(this).data('colorbox-gallery');
      }
      else {
        return $(this).attr('rel');
      }
    };

    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);

    $(context).bind('cbox_complete', function () {
      Drupal.attachBehaviors('#cboxLoadedContent');
    });
  }
};

})(jQuery);
;
/**
 * @file
 * Colorbox module style js.
 */

(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(context).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
/**
 * @file
 * Colorbox module load js.
 */
(function ($) {

Drupal.behaviors.initColorboxLoad = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $.urlParams = function (url) {
      var p = {},
          e,
          a = /\+/g,  // Regex for replacing addition symbol with a space.
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
          q = url.split('?');
      while (e = r.exec(q[1])) {
        e[1] = d(e[1]);
        e[2] = d(e[2]);
        switch (e[2].toLowerCase()) {
          case 'true':
          case 'yes':
            e[2] = true;
            break;
          case 'false':
          case 'no':
            e[2] = false;
            break;
        }
        if (e[1] == 'width') { e[1] = 'innerWidth'; }
        if (e[1] == 'height') { e[1] = 'innerHeight'; }
        p[e[1]] = e[2];
      }
      return p;
    };
    $('.colorbox-load', context)
      .once('init-colorbox-load', function () {
        var params = $.urlParams($(this).attr('href'));
        $(this).colorbox($.extend({}, settings.colorbox, params));
      });
  }
};

})(jQuery);
;
/**
 * @file
 * Colorbox module inline js.
 */

(function ($) {

Drupal.behaviors.initColorboxInline = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      var mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $.urlParam = function(name, url){
      if (name == 'fragment') {
        var results = new RegExp('(#[^&#]*)').exec(url);
      }
      else {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
      }
      if (!results) { return ''; }
      return results[1] || '';
    };
    $('.colorbox-inline', context).once('init-colorbox-inline').colorbox({
      transition:settings.colorbox.transition,
      speed:settings.colorbox.speed,
      opacity:settings.colorbox.opacity,
      slideshow:settings.colorbox.slideshow,
      slideshowAuto:settings.colorbox.slideshowAuto,
      slideshowSpeed:settings.colorbox.slideshowSpeed,
      slideshowStart:settings.colorbox.slideshowStart,
      slideshowStop:settings.colorbox.slideshowStop,
      current:settings.colorbox.current,
      previous:settings.colorbox.previous,
      next:settings.colorbox.next,
      close:settings.colorbox.close,
      overlayClose:settings.colorbox.overlayClose,
      maxWidth:settings.colorbox.maxWidth,
      maxHeight:settings.colorbox.maxHeight,
      innerWidth:function(){
        return $.urlParam('width', $(this).attr('href'));
      },
      innerHeight:function(){
        return $.urlParam('height', $(this).attr('href'));
      },
      title:function(){
        return decodeURIComponent($.urlParam('title', $(this).attr('href')));
      },
      iframe:function(){
        return $.urlParam('iframe', $(this).attr('href'));
      },
      inline:function(){
        return $.urlParam('inline', $(this).attr('href'));
      },
      href:function(){
        return $.urlParam('fragment', $(this).attr('href'));
      }
    });
  }
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').once().before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;
/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

/*global window, jQuery */
(function($) {
    // Default configuration properties.
    var defaults = {
        vertical: false,
        rtl: false,
        start: 1,
        offset: 1,
        size: null,
        scroll: 3,
        visible: null,
        animation: 'normal',
        easing: 'swing',
        auto: 0,
        wrap: null,
        initCallback: null,
        setupCallback: null,
        reloadCallback: null,
        itemLoadCallback: null,
        itemFirstInCallback: null,
        itemFirstOutCallback: null,
        itemLastInCallback: null,
        itemLastOutCallback: null,
        itemVisibleInCallback: null,
        itemVisibleOutCallback: null,
        animationStepCallback: null,
        buttonNextHTML: '<div></div>',
        buttonPrevHTML: '<div></div>',
        buttonNextEvent: 'click',
        buttonPrevEvent: 'click',
        buttonNextCallback: null,
        buttonPrevCallback: null,
        itemFallbackDimension: null
    }, windowLoaded = false;

    $(window).bind('load.jcarousel', function() { windowLoaded = true; });

    /**
     * The jCarousel object.
     *
     * @constructor
     * @class jcarousel
     * @param e {HTMLElement} The element to create the carousel for.
     * @param o {Object} A set of key/value pairs to set as configuration properties.
     * @cat Plugins/jCarousel
     */
    $.jcarousel = function(e, o) {
        this.options    = $.extend({}, defaults, o || {});

        this.locked          = false;
        this.autoStopped     = false;

        this.container       = null;
        this.clip            = null;
        this.list            = null;
        this.buttonNext      = null;
        this.buttonPrev      = null;
        this.buttonNextState = null;
        this.buttonPrevState = null;

        // Only set if not explicitly passed as option
        if (!o || o.rtl === undefined) {
            this.options.rtl = ($(e).attr('dir') || $('html').attr('dir') || '').toLowerCase() == 'rtl';
        }

        this.wh = !this.options.vertical ? 'width' : 'height';
        this.lt = !this.options.vertical ? (this.options.rtl ? 'right' : 'left') : 'top';

        // Extract skin class
        var skin = '', split = e.className.split(' ');

        for (var i = 0; i < split.length; i++) {
            if (split[i].indexOf('jcarousel-skin') != -1) {
                $(e).removeClass(split[i]);
                skin = split[i];
                break;
            }
        }

        if (e.nodeName.toUpperCase() == 'UL' || e.nodeName.toUpperCase() == 'OL') {
            this.list      = $(e);
            this.clip      = this.list.parents('.jcarousel-clip');
            this.container = this.list.parents('.jcarousel-container');
        } else {
            this.container = $(e);
            this.list      = this.container.find('ul,ol').eq(0);
            this.clip      = this.container.find('.jcarousel-clip');
        }

        if (this.clip.size() === 0) {
            this.clip = this.list.wrap('<div></div>').parent();
        }

        if (this.container.size() === 0) {
            this.container = this.clip.wrap('<div></div>').parent();
        }

        if (skin !== '' && this.container.parent()[0].className.indexOf('jcarousel-skin') == -1) {
            this.container.wrap('<div class=" '+ skin + '"></div>');
        }

        this.buttonPrev = $('.jcarousel-prev', this.container);

        if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !== null) {
            this.buttonPrev = $(this.options.buttonPrevHTML).appendTo(this.container);
        }

        this.buttonPrev.addClass(this.className('jcarousel-prev'));

        this.buttonNext = $('.jcarousel-next', this.container);

        if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !== null) {
            this.buttonNext = $(this.options.buttonNextHTML).appendTo(this.container);
        }

        this.buttonNext.addClass(this.className('jcarousel-next'));

        this.clip.addClass(this.className('jcarousel-clip')).css({
            position: 'relative'
        });

        this.list.addClass(this.className('jcarousel-list')).css({
            overflow: 'hidden',
            position: 'relative',
            top: 0,
            margin: 0,
            padding: 0
        }).css((this.options.rtl ? 'right' : 'left'), 0);

        this.container.addClass(this.className('jcarousel-container')).css({
            position: 'relative'
        });

        if (!this.options.vertical && this.options.rtl) {
            this.container.addClass('jcarousel-direction-rtl').attr('dir', 'rtl');
        }

        var di = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
        var li = this.list.children('li');

        var self = this;

        if (li.size() > 0) {
            var wh = 0, j = this.options.offset;
            li.each(function() {
                self.format(this, j++);
                wh += self.dimension(this, di);
            });

            this.list.css(this.wh, (wh + 100) + 'px');

            // Only set if not explicitly passed as option
            if (!o || o.size === undefined) {
                this.options.size = li.size();
            }
        }

        // For whatever reason, .show() does not work in Safari...
        this.container.css('display', 'block');
        this.buttonNext.css('display', 'block');
        this.buttonPrev.css('display', 'block');

        this.funcNext   = function() { self.next(); };
        this.funcPrev   = function() { self.prev(); };
        this.funcResize = function() { 
            if (self.resizeTimer) {
                clearTimeout(self.resizeTimer);
            }

            self.resizeTimer = setTimeout(function() {
                self.reload();
            }, 100);
        };

        if (this.options.initCallback !== null) {
            this.options.initCallback(this, 'init');
        }

        if (!windowLoaded && $.browser.safari) {
            this.buttons(false, false);
            $(window).bind('load.jcarousel', function() { self.setup(); });
        } else {
            this.setup();
        }
    };

    // Create shortcut for internal use
    var $jc = $.jcarousel;

    $jc.fn = $jc.prototype = {
        jcarousel: '0.2.8'
    };

    $jc.fn.extend = $jc.extend = $.extend;

    $jc.fn.extend({
        /**
         * Setups the carousel.
         *
         * @method setup
         * @return undefined
         */
        setup: function() {
            this.first       = null;
            this.last        = null;
            this.prevFirst   = null;
            this.prevLast    = null;
            this.animating   = false;
            this.timer       = null;
            this.resizeTimer = null;
            this.tail        = null;
            this.inTail      = false;

            if (this.locked) {
                return;
            }

            this.list.css(this.lt, this.pos(this.options.offset) + 'px');
            var p = this.pos(this.options.start, true);
            this.prevFirst = this.prevLast = null;
            this.animate(p, false);

            $(window).unbind('resize.jcarousel', this.funcResize).bind('resize.jcarousel', this.funcResize);

            if (this.options.setupCallback !== null) {
                this.options.setupCallback(this);
            }
        },

        /**
         * Clears the list and resets the carousel.
         *
         * @method reset
         * @return undefined
         */
        reset: function() {
            this.list.empty();

            this.list.css(this.lt, '0px');
            this.list.css(this.wh, '10px');

            if (this.options.initCallback !== null) {
                this.options.initCallback(this, 'reset');
            }

            this.setup();
        },

        /**
         * Reloads the carousel and adjusts positions.
         *
         * @method reload
         * @return undefined
         */
        reload: function() {
            if (this.tail !== null && this.inTail) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + this.tail);
            }

            this.tail   = null;
            this.inTail = false;

            if (this.options.reloadCallback !== null) {
                this.options.reloadCallback(this);
            }

            if (this.options.visible !== null) {
                var self = this;
                var di = Math.ceil(this.clipping() / this.options.visible), wh = 0, lt = 0;
                this.list.children('li').each(function(i) {
                    wh += self.dimension(this, di);
                    if (i + 1 < self.first) {
                        lt = wh;
                    }
                });

                this.list.css(this.wh, wh + 'px');
                this.list.css(this.lt, -lt + 'px');
            }

            this.scroll(this.first, false);
        },

        /**
         * Locks the carousel.
         *
         * @method lock
         * @return undefined
         */
        lock: function() {
            this.locked = true;
            this.buttons();
        },

        /**
         * Unlocks the carousel.
         *
         * @method unlock
         * @return undefined
         */
        unlock: function() {
            this.locked = false;
            this.buttons();
        },

        /**
         * Sets the size of the carousel.
         *
         * @method size
         * @return undefined
         * @param s {Number} The size of the carousel.
         */
        size: function(s) {
            if (s !== undefined) {
                this.options.size = s;
                if (!this.locked) {
                    this.buttons();
                }
            }

            return this.options.size;
        },

        /**
         * Checks whether a list element exists for the given index (or index range).
         *
         * @method get
         * @return bool
         * @param i {Number} The index of the (first) element.
         * @param i2 {Number} The index of the last element.
         */
        has: function(i, i2) {
            if (i2 === undefined || !i2) {
                i2 = i;
            }

            if (this.options.size !== null && i2 > this.options.size) {
                i2 = this.options.size;
            }

            for (var j = i; j <= i2; j++) {
                var e = this.get(j);
                if (!e.length || e.hasClass('jcarousel-item-placeholder')) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Returns a jQuery object with list element for the given index.
         *
         * @method get
         * @return jQuery
         * @param i {Number} The index of the element.
         */
        get: function(i) {
            return $('>.jcarousel-item-' + i, this.list);
        },

        /**
         * Adds an element for the given index to the list.
         * If the element already exists, it updates the inner html.
         * Returns the created element as jQuery object.
         *
         * @method add
         * @return jQuery
         * @param i {Number} The index of the element.
         * @param s {String} The innerHTML of the element.
         */
        add: function(i, s) {
            var e = this.get(i), old = 0, n = $(s);

            if (e.length === 0) {
                var c, j = $jc.intval(i);
                e = this.create(i);
                while (true) {
                    c = this.get(--j);
                    if (j <= 0 || c.length) {
                        if (j <= 0) {
                            this.list.prepend(e);
                        } else {
                            c.after(e);
                        }
                        break;
                    }
                }
            } else {
                old = this.dimension(e);
            }

            if (n.get(0).nodeName.toUpperCase() == 'LI') {
                e.replaceWith(n);
                e = n;
            } else {
                e.empty().append(s);
            }

            this.format(e.removeClass(this.className('jcarousel-item-placeholder')), i);

            var di = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
            var wh = this.dimension(e, di) - old;

            if (i > 0 && i < this.first) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - wh + 'px');
            }

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) + wh + 'px');

            return e;
        },

        /**
         * Removes an element for the given index from the list.
         *
         * @method remove
         * @return undefined
         * @param i {Number} The index of the element.
         */
        remove: function(i) {
            var e = this.get(i);

            // Check if item exists and is not currently visible
            if (!e.length || (i >= this.first && i <= this.last)) {
                return;
            }

            var d = this.dimension(e);

            if (i < this.first) {
                this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + d + 'px');
            }

            e.remove();

            this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) - d + 'px');
        },

        /**
         * Moves the carousel forwards.
         *
         * @method next
         * @return undefined
         */
        next: function() {
            if (this.tail !== null && !this.inTail) {
                this.scrollTail(false);
            } else {
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'last') && this.options.size !== null && this.last == this.options.size) ? 1 : this.first + this.options.scroll);
            }
        },

        /**
         * Moves the carousel backwards.
         *
         * @method prev
         * @return undefined
         */
        prev: function() {
            if (this.tail !== null && this.inTail) {
                this.scrollTail(true);
            } else {
                this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'first') && this.options.size !== null && this.first == 1) ? this.options.size : this.first - this.options.scroll);
            }
        },

        /**
         * Scrolls the tail of the carousel.
         *
         * @method scrollTail
         * @return undefined
         * @param b {Boolean} Whether scroll the tail back or forward.
         */
        scrollTail: function(b) {
            if (this.locked || this.animating || !this.tail) {
                return;
            }

            this.pauseAuto();

            var pos  = $jc.intval(this.list.css(this.lt));

            pos = !b ? pos - this.tail : pos + this.tail;
            this.inTail = !b;

            // Save for callbacks
            this.prevFirst = this.first;
            this.prevLast  = this.last;

            this.animate(pos);
        },

        /**
         * Scrolls the carousel to a certain position.
         *
         * @method scroll
         * @return undefined
         * @param i {Number} The index of the element to scoll to.
         * @param a {Boolean} Flag indicating whether to perform animation.
         */
        scroll: function(i, a) {
            if (this.locked || this.animating) {
                return;
            }

            this.pauseAuto();
            this.animate(this.pos(i), a);
        },

        /**
         * Prepares the carousel and return the position for a certian index.
         *
         * @method pos
         * @return {Number}
         * @param i {Number} The index of the element to scoll to.
         * @param fv {Boolean} Whether to force last item to be visible.
         */
        pos: function(i, fv) {
            var pos  = $jc.intval(this.list.css(this.lt));

            if (this.locked || this.animating) {
                return pos;
            }

            if (this.options.wrap != 'circular') {
                i = i < 1 ? 1 : (this.options.size && i > this.options.size ? this.options.size : i);
            }

            var back = this.first > i;

            // Create placeholders, new list width/height
            // and new list position
            var f = this.options.wrap != 'circular' && this.first <= 1 ? 1 : this.first;
            var c = back ? this.get(f) : this.get(this.last);
            var j = back ? f : f - 1;
            var e = null, l = 0, p = false, d = 0, g;

            while (back ? --j >= i : ++j < i) {
                e = this.get(j);
                p = !e.length;
                if (e.length === 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    c[back ? 'before' : 'after' ](e);

                    if (this.first !== null && this.options.wrap == 'circular' && this.options.size !== null && (j <= 0 || j > this.options.size)) {
                        g = this.get(this.index(j));
                        if (g.length) {
                            e = this.add(j, g.clone(true));
                        }
                    }
                }

                c = e;
                d = this.dimension(e);

                if (p) {
                    l += d;
                }

                if (this.first !== null && (this.options.wrap == 'circular' || (j >= 1 && (this.options.size === null || j <= this.options.size)))) {
                    pos = back ? pos + d : pos - d;
                }
            }

            // Calculate visible items
            var clipping = this.clipping(), cache = [], visible = 0, v = 0;
            c = this.get(i - 1);
            j = i;

            while (++visible) {
                e = this.get(j);
                p = !e.length;
                if (e.length === 0) {
                    e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                    // This should only happen on a next scroll
                    if (c.length === 0) {
                        this.list.prepend(e);
                    } else {
                        c[back ? 'before' : 'after' ](e);
                    }

                    if (this.first !== null && this.options.wrap == 'circular' && this.options.size !== null && (j <= 0 || j > this.options.size)) {
                        g = this.get(this.index(j));
                        if (g.length) {
                            e = this.add(j, g.clone(true));
                        }
                    }
                }

                c = e;
                d = this.dimension(e);
                if (d === 0) {
                    throw new Error('jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...');
                }

                if (this.options.wrap != 'circular' && this.options.size !== null && j > this.options.size) {
                    cache.push(e);
                } else if (p) {
                    l += d;
                }

                v += d;

                if (v >= clipping) {
                    break;
                }

                j++;
            }

             // Remove out-of-range placeholders
            for (var x = 0; x < cache.length; x++) {
                cache[x].remove();
            }

            // Resize list
            if (l > 0) {
                this.list.css(this.wh, this.dimension(this.list) + l + 'px');

                if (back) {
                    pos -= l;
                    this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - l + 'px');
                }
            }

            // Calculate first and last item
            var last = i + visible - 1;
            if (this.options.wrap != 'circular' && this.options.size && last > this.options.size) {
                last = this.options.size;
            }

            if (j > last) {
                visible = 0;
                j = last;
                v = 0;
                while (++visible) {
                    e = this.get(j--);
                    if (!e.length) {
                        break;
                    }
                    v += this.dimension(e);
                    if (v >= clipping) {
                        break;
                    }
                }
            }

            var first = last - visible + 1;
            if (this.options.wrap != 'circular' && first < 1) {
                first = 1;
            }

            if (this.inTail && back) {
                pos += this.tail;
                this.inTail = false;
            }

            this.tail = null;
            if (this.options.wrap != 'circular' && last == this.options.size && (last - visible + 1) >= 1) {
                var m = $jc.intval(this.get(last).css(!this.options.vertical ? 'marginRight' : 'marginBottom'));
                if ((v - m) > clipping) {
                    this.tail = v - clipping - m;
                }
            }

            if (fv && i === this.options.size && this.tail) {
                pos -= this.tail;
                this.inTail = true;
            }

            // Adjust position
            while (i-- > first) {
                pos += this.dimension(this.get(i));
            }

            // Save visible item range
            this.prevFirst = this.first;
            this.prevLast  = this.last;
            this.first     = first;
            this.last      = last;

            return pos;
        },

        /**
         * Animates the carousel to a certain position.
         *
         * @method animate
         * @return undefined
         * @param p {Number} Position to scroll to.
         * @param a {Boolean} Flag indicating whether to perform animation.
         */
        animate: function(p, a) {
            if (this.locked || this.animating) {
                return;
            }

            this.animating = true;

            var self = this;
            var scrolled = function() {
                self.animating = false;

                if (p === 0) {
                    self.list.css(self.lt,  0);
                }

                if (!self.autoStopped && (self.options.wrap == 'circular' || self.options.wrap == 'both' || self.options.wrap == 'last' || self.options.size === null || self.last < self.options.size || (self.last == self.options.size && self.tail !== null && !self.inTail))) {
                    self.startAuto();
                }

                self.buttons();
                self.notify('onAfterAnimation');

                // This function removes items which are appended automatically for circulation.
                // This prevents the list from growing infinitely.
                if (self.options.wrap == 'circular' && self.options.size !== null) {
                    for (var i = self.prevFirst; i <= self.prevLast; i++) {
                        if (i !== null && !(i >= self.first && i <= self.last) && (i < 1 || i > self.options.size)) {
                            self.remove(i);
                        }
                    }
                }
            };

            this.notify('onBeforeAnimation');

            // Animate
            if (!this.options.animation || a === false) {
                this.list.css(this.lt, p + 'px');
                scrolled();
            } else {
                var o = !this.options.vertical ? (this.options.rtl ? {'right': p} : {'left': p}) : {'top': p};
                // Define animation settings.
                var settings = {
                    duration: this.options.animation,
                    easing:   this.options.easing,
                    complete: scrolled
                };
                // If we have a step callback, specify it as well.
                if ($.isFunction(this.options.animationStepCallback)) {
                    settings.step = this.options.animationStepCallback;
                }
                // Start the animation.
                this.list.animate(o, settings);
            }
        },

        /**
         * Starts autoscrolling.
         *
         * @method auto
         * @return undefined
         * @param s {Number} Seconds to periodically autoscroll the content.
         */
        startAuto: function(s) {
            if (s !== undefined) {
                this.options.auto = s;
            }

            if (this.options.auto === 0) {
                return this.stopAuto();
            }

            if (this.timer !== null) {
                return;
            }

            this.autoStopped = false;

            var self = this;
            this.timer = window.setTimeout(function() { self.next(); }, this.options.auto * 1000);
        },

        /**
         * Stops autoscrolling.
         *
         * @method stopAuto
         * @return undefined
         */
        stopAuto: function() {
            this.pauseAuto();
            this.autoStopped = true;
        },

        /**
         * Pauses autoscrolling.
         *
         * @method pauseAuto
         * @return undefined
         */
        pauseAuto: function() {
            if (this.timer === null) {
                return;
            }

            window.clearTimeout(this.timer);
            this.timer = null;
        },

        /**
         * Sets the states of the prev/next buttons.
         *
         * @method buttons
         * @return undefined
         */
        buttons: function(n, p) {
            if (n == null) {
                n = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'first') || this.options.size === null || this.last < this.options.size);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'first') && this.options.size !== null && this.last >= this.options.size) {
                    n = this.tail !== null && !this.inTail;
                }
            }

            if (p == null) {
                p = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'last') || this.first > 1);
                if (!this.locked && (!this.options.wrap || this.options.wrap == 'last') && this.options.size !== null && this.first == 1) {
                    p = this.tail !== null && this.inTail;
                }
            }

            var self = this;

            if (this.buttonNext.size() > 0) {
                this.buttonNext.unbind(this.options.buttonNextEvent + '.jcarousel', this.funcNext);

                if (n) {
                    this.buttonNext.bind(this.options.buttonNextEvent + '.jcarousel', this.funcNext);
                }

                this.buttonNext[n ? 'removeClass' : 'addClass'](this.className('jcarousel-next-disabled')).attr('disabled', n ? false : true);

                if (this.options.buttonNextCallback !== null && this.buttonNext.data('jcarouselstate') != n) {
                    this.buttonNext.each(function() { self.options.buttonNextCallback(self, this, n); }).data('jcarouselstate', n);
                }
            } else {
                if (this.options.buttonNextCallback !== null && this.buttonNextState != n) {
                    this.options.buttonNextCallback(self, null, n);
                }
            }

            if (this.buttonPrev.size() > 0) {
                this.buttonPrev.unbind(this.options.buttonPrevEvent + '.jcarousel', this.funcPrev);

                if (p) {
                    this.buttonPrev.bind(this.options.buttonPrevEvent + '.jcarousel', this.funcPrev);
                }

                this.buttonPrev[p ? 'removeClass' : 'addClass'](this.className('jcarousel-prev-disabled')).attr('disabled', p ? false : true);

                if (this.options.buttonPrevCallback !== null && this.buttonPrev.data('jcarouselstate') != p) {
                    this.buttonPrev.each(function() { self.options.buttonPrevCallback(self, this, p); }).data('jcarouselstate', p);
                }
            } else {
                if (this.options.buttonPrevCallback !== null && this.buttonPrevState != p) {
                    this.options.buttonPrevCallback(self, null, p);
                }
            }

            this.buttonNextState = n;
            this.buttonPrevState = p;
        },

        /**
         * Notify callback of a specified event.
         *
         * @method notify
         * @return undefined
         * @param evt {String} The event name
         */
        notify: function(evt) {
            var state = this.prevFirst === null ? 'init' : (this.prevFirst < this.first ? 'next' : 'prev');

            // Load items
            this.callback('itemLoadCallback', evt, state);

            if (this.prevFirst !== this.first) {
                this.callback('itemFirstInCallback', evt, state, this.first);
                this.callback('itemFirstOutCallback', evt, state, this.prevFirst);
            }

            if (this.prevLast !== this.last) {
                this.callback('itemLastInCallback', evt, state, this.last);
                this.callback('itemLastOutCallback', evt, state, this.prevLast);
            }

            this.callback('itemVisibleInCallback', evt, state, this.first, this.last, this.prevFirst, this.prevLast);
            this.callback('itemVisibleOutCallback', evt, state, this.prevFirst, this.prevLast, this.first, this.last);
        },

        callback: function(cb, evt, state, i1, i2, i3, i4) {
            if (this.options[cb] == null || (typeof this.options[cb] != 'object' && evt != 'onAfterAnimation')) {
                return;
            }

            var callback = typeof this.options[cb] == 'object' ? this.options[cb][evt] : this.options[cb];

            if (!$.isFunction(callback)) {
                return;
            }

            var self = this;

            if (i1 === undefined) {
                callback(self, state, evt);
            } else if (i2 === undefined) {
                this.get(i1).each(function() { callback(self, this, i1, state, evt); });
            } else {
                var call = function(i) {
                    self.get(i).each(function() { callback(self, this, i, state, evt); });
                };
                for (var i = i1; i <= i2; i++) {
                    if (i !== null && !(i >= i3 && i <= i4)) {
                        call(i);
                    }
                }
            }
        },

        create: function(i) {
            return this.format('<li></li>', i);
        },

        format: function(e, i) {
            e = $(e);
            var split = e.get(0).className.split(' ');
            for (var j = 0; j < split.length; j++) {
                if (split[j].indexOf('jcarousel-') != -1) {
                    e.removeClass(split[j]);
                }
            }
            e.addClass(this.className('jcarousel-item')).addClass(this.className('jcarousel-item-' + i)).css({
                'float': (this.options.rtl ? 'right' : 'left'),
                'list-style': 'none'
            }).attr('jcarouselindex', i);
            return e;
        },

        className: function(c) {
            return c + ' ' + c + (!this.options.vertical ? '-horizontal' : '-vertical');
        },

        dimension: function(e, d) {
            var el = $(e);

            if (d == null) {
                return !this.options.vertical ?
                       (el.outerWidth(true) || $jc.intval(this.options.itemFallbackDimension)) :
                       (el.outerHeight(true) || $jc.intval(this.options.itemFallbackDimension));
            } else {
                var w = !this.options.vertical ?
                    d - $jc.intval(el.css('marginLeft')) - $jc.intval(el.css('marginRight')) :
                    d - $jc.intval(el.css('marginTop')) - $jc.intval(el.css('marginBottom'));

                $(el).css(this.wh, w + 'px');

                return this.dimension(el);
            }
        },

        clipping: function() {
            return !this.options.vertical ?
                this.clip[0].offsetWidth - $jc.intval(this.clip.css('borderLeftWidth')) - $jc.intval(this.clip.css('borderRightWidth')) :
                this.clip[0].offsetHeight - $jc.intval(this.clip.css('borderTopWidth')) - $jc.intval(this.clip.css('borderBottomWidth'));
        },

        index: function(i, s) {
            if (s == null) {
                s = this.options.size;
            }

            return Math.round((((i-1) / s) - Math.floor((i-1) / s)) * s) + 1;
        }
    });

    $jc.extend({
        /**
         * Gets/Sets the global default configuration properties.
         *
         * @method defaults
         * @return {Object}
         * @param d {Object} A set of key/value pairs to set as configuration properties.
         */
        defaults: function(d) {
            return $.extend(defaults, d || {});
        },

        intval: function(v) {
            v = parseInt(v, 10);
            return isNaN(v) ? 0 : v;
        },

        windowLoaded: function() {
            windowLoaded = true;
        }
    });

    /**
     * Creates a carousel for all matched elements.
     *
     * @example $("#mycarousel").jcarousel();
     * @before <ul id="mycarousel" class="jcarousel-skin-name"><li>First item</li><li>Second item</li></ul>
     * @result
     *
     * <div class="jcarousel-skin-name">
     *   <div class="jcarousel-container">
     *     <div class="jcarousel-clip">
     *       <ul class="jcarousel-list">
     *         <li class="jcarousel-item-1">First item</li>
     *         <li class="jcarousel-item-2">Second item</li>
     *       </ul>
     *     </div>
     *     <div disabled="disabled" class="jcarousel-prev jcarousel-prev-disabled"></div>
     *     <div class="jcarousel-next"></div>
     *   </div>
     * </div>
     *
     * @method jcarousel
     * @return jQuery
     * @param o {Hash|String} A set of key/value pairs to set as configuration properties or a method name to call on a formerly created instance.
     */
    $.fn.jcarousel = function(o) {
        if (typeof o == 'string') {
            var instance = $(this).data('jcarousel'), args = Array.prototype.slice.call(arguments, 1);
            return instance[o].apply(instance, args);
        } else {
            return this.each(function() {
                var instance = $(this).data('jcarousel');
                if (instance) {
                    if (o) {
                        $.extend(instance.options, o);
                    }
                    instance.reload();
                } else {
                    $(this).data('jcarousel', new $jc(this, o));
                }
            });
        }
    };

})(jQuery);
;
jQuery(document).ready(function($) {

/**
 * [description]
 * @param  {[type]} Basic Page Quick links Scroll
 * @return {[type]}       [description]
 */
 // Open search filter
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
  var value = getUrlVars()["f[0]"];
  if (value != undefined) {
    jQuery('div.akdn-filter-js-wrapper').css('display', 'block');
  }

  // Open 'In the media slide link in new tab'
  jQuery('.slide.In').find("a").attr("target", "_blank");
  jQuery('.accordian-quick-links a').click(function(){
    jQuery('html, body').animate({
        scrollTop: jQuery(jQuery(this).attr('href') ).offset().top
    }, 500);
    return false;
  });

  // What we do Body summary Text
jQuery(".what-we-do-body-more .morelink").click(function(){
  jQuery(this).hide();
  jQuery(".what-we-do-body-more-body").removeClass("collapse");
});

jQuery(".what-we-do-body-more-body .lesslink").click(function(){
  jQuery(".what-we-do-body-more .morelink").show();
  jQuery(".what-we-do-body-more-body").addClass("collapse");
});


  // to hide what's News label
  what_found = jQuery('#what-is-new-nofound').hasClass('nofound');
  what_news_found = jQuery('#what-is-new-news-nofound').hasClass('nofound');
  if (what_found && what_news_found) {
    jQuery('#what-is-new-nofound').addClass('hide');
  }
  // remove () from file size
  // var content = jQuery(".file-size").text().replace(/[()]/g,'');
  // alert('HERE');
  // jQuery(".file-size").html(content);

  // hide the open quotations
  jQuery('.toggle-quote-display').click(function(){
    jQuery(this).closest(".other-quotes").toggle();
  });

  // toggle quote finder
  jQuery('#block-akdn-custom-akdn-speech-tools .item-list > h3').siblings().css("display", "none");
  jQuery('#block-akdn-custom-akdn-speech-tools .item-list > h3').addClass("facet-api-close");
  jQuery('#block-akdn-custom-akdn-speech-tools .item-list > h3').click(function(){
    jQuery(this).siblings().toggle();
    jQuery(this).toggleClass("facet-api-close");
    jQuery(this).toggleClass("facet-api-open");
  });

  // Toggle date filters.
  jQuery('#block-akdn-custom-akdn-date-filter .block-title').addClass("facet-api-open");
  jQuery('#block-akdn-custom-akdn-date-filter .block-title').click(function(){
    jQuery(this).siblings().toggle();
    jQuery(this).toggleClass("facet-api-close");
    jQuery(this).toggleClass("facet-api-open");
  });

  // toggle speaker list
  jQuery('div#speech-speakers-list > h3').siblings().hide();
  jQuery('div#speech-speakers-list > h3').click(function(){
    jQuery(this).siblings().toggle();
  });

  jQuery('div#speech-speakers-list-more > h3').siblings().hide();
  jQuery('div#speech-speakers-list-more > h3').click(function(){
    jQuery(this).siblings().toggle();
    jQuery(this).toggle();
    jQuery('div#speech-speakers-list-more-hide > h3').show();
  });

  jQuery('div#speech-speakers-list-more-hide > h3').hide();
  jQuery('div#speech-speakers-list-more-hide > h3').click(function(){
    jQuery(this).toggle();
    jQuery('div#speech-speakers-list-more > h3').siblings().hide();
    jQuery('div#speech-speakers-list-more > h3').show();
    jQuery('#speech-speakers-list').focus();
  });

  // Toggle facets.
  jQuery('section.block-facetapi > div > h2').addClass("facet-api-open");
  jQuery('section.block-facetapi > div > h2').click(function(){
    jQuery(this).siblings().toggle();
    jQuery(this).toggleClass("facet-api-close");
    jQuery(this).toggleClass("facet-api-open");
  });

   // toggle quote finder
  //jQuery('.page-speech-quotes .views-row-1').siblings().css('display', 'none');
  //jQuery('.page-speech-quotes .views-row-1').siblings('h3').css('display', 'block');

 /* jQuery('.more-quotes').click(function() {
  	var moreQuotes = jQuery(this).find('span:first').attr('class');
  	jQuery('.' + moreQuotes).css('display', 'block');
  });*/
    // toggle quote finder more
  /*  jQuery('.views-row-first', context).nextAll().hide();
    jQuery('.more-quotes span').click(function(){
        var classs = jQuery(this).attr('class');
        jQuery('div.'+classs).toggle();
    });*/

/* hide More Quotations link if there is only one Quotations */
jQuery(".view-id-solr_quotes .view-grouping-content").each(function(){
      var check = jQuery(this).find('div.views-row:nth-child(3)').length;
     if(check == 0){
      jQuery(this).find('.more-quotes').hide();
     }
});

  if (jQuery('.flexslider li').length == 1 ) {
  	jQuery('.flexslider .field-content .slide-text').css('display', 'block');
  }
  // $('#block-views-exp-speeches-page #edit-field-publish-date-value-wrapper select').selectToUISlider().hide();

  // Set up for jCarousel project display.
  var breaks = {
    normal: 980,
    narrow: 740
  };
  var w = $(window).width();
  var vis = 0;
  if (w >= breaks.normal) {
    vis = 3;
  }
  else if (w < breaks.normal && w >= breaks.narrow) {
    vis = 2;
  }
  else {
    vis = 1;
  }
  var select = '';
  /*if ($('#block-views-projects-block .carousel').length > 0) {
    select = '#block-views-projects-block .carousel';
  } else if ($('.view-id-projects.view-display-id-block_3 .carousel').length > 0) {
    select = '.view-id-projects.view-display-id-block_3 .carousel';
  }*/
  /*if ($('.view-id-projects .carousel').length > 0) {
    select = '.view-id-projects .carousel';
  }
  var numProjects = $(select + ' li').length;
  if (numProjects <= vis) {
    $(select).jcarousel({
      visible: vis,
      scroll: vis,
      buttonNextHTML: null,
      buttonPrevHTML: null
    });
  } else {
    $(select).jcarousel({
      visible: vis,
      scroll: vis,
      buttonNextHTML: "<div></div>",
      buttonPrevHTML: "<div></div>",
    });
  }*/

  var views_ids = new Array("#views-exposed-form-press-releases-page","#views-exposed-form-articles-page","#views-exposed-form-speeches-page","#views-exposed-form-projects-page-1","#views-exposed-form-publications-page","#views-exposed-form-galleries-page","#views-exposed-form-podcasts-page","#views-exposed-form-events-page-past","#views-exposed-form-articles-page-1","#views-exposed-form-speech-themes-block-1");

  for (x in views_ids) {
    if ($(views_ids[x]).length) {
      $(views_ids[x]+" #edit-field-agency-tid-wrapper select, "+views_ids[x]+" #edit-field-focus-area-tid-wrapper select, "+views_ids[x]+" #edit-field-country-tid-wrapper select, "+views_ids[x]+" #edit-tid-wrapper select, "+views_ids[x]+" #edit-field-speech-speaker-nid, "+views_ids[x]+" #edit-field-speech-themes-tid-wrapper select").chosen();
    }
  }

  views_id = "#views-exposed-form-akaa-projects-page";
  if ($("#views-exposed-form-akaa-projects-page").length) {
    $(views_id+" #edit-field-region-tid-wrapper select, "+views_id+" #edit-field-arch-country-tid-wrapper select, "+views_id+" #edit-field-city-tid-wrapper select, "+views_id+" #edit-field-building-type-tid-wrapper select").chosen();
  }
    ap_views_id = '#views-exposed-form-akmi-performance-page';//'#block-views-exp-akmi-performance-page';
    if ($("#views-exposed-form-akmi-performance-page").length) {
        $(ap_views_id + " #edit-field-related-artists-nid-wrapper select").chosen({placeholder_text_multiple: "Select Artists"});
        $(ap_views_id + " ##edit-field-performance-year-tid-wrapper select").chosen({placeholder_text_multiple: "Select Year"});
        $(ap_views_id + " #edit-field-artist-country-origin-tid-wrapper select").chosen({placeholder_text_multiple: "Select Country"});
        $(ap_views_id + " #edit-field-artist-related-instruments-nid-wrapper select").chosen({placeholder_text_multiple: "Select Intruments"});
        //$(ap_views_id+" #edit-field-related-artists-nid-wrapper .chzn-choices").prepend("<option>Select Artists</option>");
        // $(ap_views_id+" #edit-field-performance-year-tid-wrapper select, "+ap_views_id+" #edit-field-artist-country-origin-tid-wrapper select, "+ap_views_id+" #edit-field-artist-related-instruments-nid-wrapper select").chosen();
    }
});

(function ($) {

  Drupal.behaviors.akdnCustom = {
    attach: function (context, settings) {
      var x, w;
      var breaks = {
        normal: 980,
        narrow: 740,
        curr: ''
      };
      var howMany = {
        normal: 3,
        narrow: 2,
        mobile: 1
      };
      w = $(window).width();
      if (w >= breaks.normal) {
        breaks.curr = 'normal';
      }
      else if (w < breaks.normal && w >= breaks.narrow) {
        breaks.curr = 'narrow';
      }
      else {
        breaks.curr = 'mobile';
      }

      function resizedw(){
        var width = $(window).width();
        var change = false;
        var toChange = '';
        //figure out which display we currently have && what the new display is
        if (width >= breaks.normal) {
          if (breaks.curr != 'normal') {
            change = true;
            toChange = 'normal';
          }
        }
        else if (width < breaks.normal && width >= breaks.narrow) {
          if (breaks.curr != 'narrow') {
            change = true;
            toChange = 'narrow';
          }
        }
        else {
          if (breaks.curr != 'mobile') {
            change = true;
            toChange = 'mobile';
          }
        }
        //console.log(toChange);
        if (change) {
        /*  var oldCl = 'jcarousel-skin-akdn';
          if (breaks.curr != 'normal') {
            oldCl += '-' + breaks.curr;
          }
          var newCl = 'jcarousel-skin-akdn';
          if (toChange != 'normal') {
            newCl += '-' + toChange;
          }
          $('#block-views-projects-block ul').removeClass(oldCl);
          $('#block-views-projects-block ul').addClass(newCl);
        */
          breaks.curr = toChange;
          var vis = howMany[toChange];

          var select = '';
          /*if ($('#block-views-projects-block .carousel').length > 0) {
            select = '#block-views-projects-block .carousel';
          } else if ($('.view-id-projects.view-display-id-block_3 .carousel').length > 0) {
            select = '.view-id-projects.view-display-id-block_3 .carousel';
          }*/
          /*if ($('.view-id-projects .carousel').length > 0) {
            select = '.view-id-projects .carousel';
          }
          var numProjects = $(select + ' li').length;
          //$('#block-views-projects-block .carousel').jcarousel('destroy');
          if (numProjects <= vis) {
            $(select).jcarousel({
              visible: vis,
              scroll: vis,
              //buttonNextHTML: null,
              //buttonPrevHTML: null
            });
          } else {
            $(select).jcarousel({
              visible: vis,
              scroll: vis,
              //buttonNextHTML: "<div></div>",
              //buttonPrevHTML: "<div></div>",
            });
          }
          $(select).jcarousel('reload');*/
          /*if ($('.view-id-projects.view-display-id-block_3 .carousel').length > 0) {
            $('.view-id-projects.view-display-id-block_3 .carousel').jcarousel({
              visible: vis,
              scroll: vis,
            });
            $('.view-id-projects.view-display-id-block_3 .carousel').jcarousel('reload');
          }*/
        }

      }

      $(window).resize(function() {
          clearTimeout(x);
          x = setTimeout(function() {
              resizedw();
          }, 100);
      });

      // Hide the submit button on the contact form when no body field is available.
      // We hook in to the settings that webform conditional is provididng.
      /*if ($('form#webform-client-form-4310').length){
        var showOn = Drupal.settings.webform_conditional.fields.subject.dependent_fields.message.monitor_field_value;
        $('form#webform-client-form-4310 #edit-submitted-subject').change(function(){
          if(jQuery.inArray($(this).val(), showOn) == -1){
            $('form#webform-client-form-4310 #edit-submit').show();
          }
          else {
            $('form#webform-client-form-4310 #edit-submit').hide();
          }

        });
      }*/

      //language switcher
      var width = $(window).width();
      if(width< 768){
        $('.top-navbar .content ul li.language_switcher > a', context).click(function(event) {
          $(".top-navbar .content ul li.language_switcher .language-switcher-locale-url").toggle();
          event.stopPropagation();
        });
        $(document, context).click(function() {
          $(".top-navbar .content ul li.language_switcher .language-switcher-locale-url").hide();
        });
      }

    /*
     * display none numeric facet filters.
     */
    jQuery('ul.facetapi-facetapi-checkbox-links li.leaf a').each(function(){
       var string = jQuery(this).text(); 
       console.log(string);
       var arr = string.split('(');
       if(jQuery.isNaN(arr[0]) == false){
           jQuery(this).parent().css('display','none');
       }

    });

    },
    detach: function (context, settings) {

    }
  };

}(jQuery));

function accordian_click(param) {
  jQuery('.accordian-icon').removeClass('active');
 if (jQuery(param).parent().find('.according-related-heading').hasClass("collapse")) {
      jQuery('.accordian-icon').not(jQuery(param)).parent().find('.according-related-heading').removeClass("rel-extend");
      jQuery('.accordian-icon').not(jQuery(param)).parent().find('.according-related-heading').addClass("collapse");
      jQuery('.accordian-icon').not(jQuery(param)).removeClass('active');
      jQuery(param).parent().find('.according-related-heading').removeClass("collapse");
      jQuery(param).parent().find('.according-related-heading').addClass('rel-extend');
 }
 else{
  jQuery(param).parent().find('.according-related-heading').removeClass("rel-extend");
  jQuery(param).parent().find('.according-related-heading').addClass('collapse');
  jQuery(param).removeClass('active');
 }
 if (jQuery(param).parent().find('.accordian-main-body').hasClass("collapse")) {
    jQuery('.accordian-icon').not(jQuery(param)).parent().find('.accordian-main-body').removeClass("extend");
    jQuery('.accordian-icon').not(jQuery(param)).parent().find('.accordian-main-body').addClass('collapse');
    jQuery('.accordian-icon').not(jQuery(param)).parent().find('.according-related-heading').removeClass("rel-extend");
    jQuery('.accordian-icon').not(jQuery(param)).parent().find('.according-related-heading').addClass("collapse");
    jQuery(param).parent().find('.accordian-main-body').removeClass("collapse");
    jQuery(param).parent().find('.accordian-main-body').addClass('extend');
    jQuery(param).addClass('active');
 }
 else{
   jQuery(param).parent().find('.accordian-main-body').removeClass("extend");
   jQuery(param).parent().find('.accordian-main-body').addClass('collapse');
   jQuery(param).removeClass('active');
 }
}
jQuery('.accordian-image-rel-wrapper').each(function(){
if(!jQuery(this).children('.image').length > 0) {
 jQuery(this).addClass('hide');
}
});

// Show/hide twitter-instagram home page blocks
var twitter_block = jQuery('.home-page-twitter-pane');
var instagram_block = jQuery('.home-page-instagram-pane');
var img = twitter_block.find('img');
if (img.length) {
  twitter_block.show();
  instagram_block.hide();
}
else {
  twitter_block.hide();
  instagram_block.show();
}

// Hide Active Languge name
jQuery('.language-switcher-locale-url').find('.active').hide();

// Open 'In the media slide link in new tab'
jQuery('.slide.In').find("a").attr("target", "_blank");

// On colorbox popup Caption and Copyright appears on gallery/pages
jQuery(".gallery-slide a img").each(function() {
  jQuery(this).attr('alt');
  jQuery(this).parent().attr('title');
  var temp = jQuery(this).parent().attr('title') + '<br/>' + jQuery(this).attr('alt');
  jQuery(this).parent().attr('title', temp);
});
(jQuery);

var base_url = window.location.origin;
var getUrl = window.location;
var lang = ['en', 'fr', 'ar', 'zh-hans', 'de','it','ky','ms','fa','pt','ru','es','tg','ur'];
//var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
jQuery('.accordian-main-body a').each(function() {
  var href_val = jQuery(this).attr('href');
  var updated_href = update_language_url(href_val);
  if ((jQuery.inArray(getUrl.pathname.split('/')[1], lang) != -1) && updated_href) {
    jQuery(this).attr('href', updated_href);
  }
});
jQuery('.basic-page-accordian-summary a').each(function() {
  var href_val = jQuery(this).attr('href');
  if (href_val.indexOf('http')) {
    var updated_href = update_language_url(href_val);
    if ((jQuery.inArray(getUrl.pathname.split('/')[1], lang) != -1) && updated_href) {
      jQuery(this).attr('href', updated_href);
    }
  }
});
jQuery('.body-summary a').each(function() {
  var href_val = jQuery(this).attr('href');
  if (href_val.indexOf('http')) {
    var updated_href = update_language_url(href_val);
    if ((jQuery.inArray(getUrl.pathname.split('/')[1], lang) != -1) && updated_href) {
      jQuery(this).attr('href', updated_href);
    }
  }
});
jQuery('.pane-node-body a').each(function() {
  var href_val = jQuery(this).attr('href');
  if (href_val.indexOf('http')) {
    var updated_href = update_language_url(href_val);
    if ((jQuery.inArray(getUrl.pathname.split('/')[1], lang) != -1) && updated_href) {
      jQuery(this).attr('href', updated_href);
    }
  }
});
jQuery('.accordian-summary a').each(function() {
  var href_val = jQuery(this).attr('href');
  if (href_val.indexOf('http')) {
    var updated_href = update_language_url(href_val);
    if ((jQuery.inArray(getUrl.pathname.split('/')[1], lang) != -1) && updated_href) {
      jQuery(this).attr('href', updated_href);
    }
  }
});
/*
 * append language with urls.
 * @param {type} url
 * @returns {String}]]
 * 
 */
function update_language_url(url) {
  if (url.indexOf(getUrl.pathname.split('/')[1] + '/') == -1) {
    if (url.indexOf('/')) {
      return '/' + getUrl.pathname.split('/')[1] + '/' + url;
    }
  }
  return '/' + getUrl.pathname.split('/')[1] + url;
}

;
/**
 * File: jquery.parss.js
 * Author: Brad Westness
 * Date: 02/07/2011
 * Purpose: Append the contents of an RSS feed
 * to a set of list elements.
 */
(function(jQuery){ 
	jQuery.fn.PaRSS = function(feed_url, item_count, date_format, show_descriptions, callback_function) {
    var ul_set = this,
    data = {
      feed_url: feed_url,
      item_count: item_count,
      date_format: date_format,
      show_descriptions: show_descriptions,
      callback_function: callback_function
    };
    
    /**
     * Initialize the Google Feed object and
     * load the actual feed
     */
    function initializeFeed() {
      var feed = new google.feeds.Feed(feed_url);
      if(data.item_count) {
        feed.setNumEntries(data.item_count);
      }
      feed.load(function(result) {
        if(!result.error){
          getItems(result.feed.entries);              
        }
      });
    }
    
    /**
     * Pull the content from the feed
     * items and add it to the ul
     */
    function getItems(entries){
      var list = "";
      jQuery.each(entries, function(i, entry) {
        var list_item = "<span class='parss-title'><a href='" + entry.link + "'>" + entry.title + "</a></span>";
        
        if(data.date_format && data.date_format.length > 0) {
          list_item += "<span class='parss-date'>" + getFormattedDate(entry.publishedDate, data.date_format) + "</span>";
        }
        
        switch (data.show_descriptions) {
          case "image":
            var img = getImageFromContent(entry.content);
            if(img) {
              list_item += "<span class='parss-image'>" + img + "</span>";
            }
            list_item += "<span class='parss-description'>" + entry.contentSnippet + "</span>";
            break;
          case "content":
            list_item += "<span class='parss-description'>" + entry.content + "</span>";
            break;
          case true: case "true":
            list_item += "<span class='parss-description'>" + entry.contentSnippet + "</span>";
            break;
          default:
            break;
        }
        
        //
        // Add the item to the list
        list += "<li>" + list_item + "</li>";         
      });
      
      //
      // Add the list to the page
      jQuery(ul_set).empty().append(list);     
      
      //
      // Perform callback function (if any)      
      if (typeof callback_function == 'function') {
        callback_function.call(this);
      }
    }
    
    /**
     * Format a date according to a supplied
     * format string using PHP date format
     * http://php.net/manual/en/function.date.php
     */
    function getFormattedDate(date, format) {
      var months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
      days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      date = new Date(Date.parse(date)),
      formatted_date = "";
      
      for (var i = 0; i < format.length; i += 1) {
        switch(format.charAt(i)) {
          case 'd':
            // Day of the month, 2 digits with leading zeros
            formatted_date += prependZeros(date.getDate());
            break;
          case 'D':
            // A textual representatino of a day, three letters
            formatted_date += days[date.getDay()].substring(0,3);
            break;
          case 'j':
            // Day of the month without leading zeros
            formatted_date += date.getDate();          
            break;
          case 'l':
            // A full textual representation of the day of the week
            formatted_date += days[date.getDay()];
            break;
          case 'N':
            // Numeric representation of the day of the week (1 - 7)
            formatted_date += date.getDay() + 1;
            break;
          case 'S':
            // English ordian suffix for the day of the month, 2 characters (st, nd, rd)
            formatted_date += getDateSuffix(date.getDate());
            break;
          case 'w':
            // Numeric representation of the day of the week (0 - 6)
            formatted_date += date.getDay();
            break;
          case 'z':
            // The day of the year (starting from 0)
            // not implemented
            break;
          case 'W':
            // Week number of year, weeks starting on Monday
            // not implemented
            break;
          case 'F':
            // A full textural representation of a month, such as 'January' or 'March'
            formatted_date += months[date.getMonth()];
            break;
          case 'm':
            // Numeric representation of a month, with leading zeroes (01 - 12)
            formatted_date += prependZeros(date.getMonth() + 1);
            break;
          case 'M':
            // A short textural representation of a month, three letters ('Jan' - 'Dec')
            formatted_date += months[date.getMonth()].substring(0,3);
            break;
          case 'n':
            // Numeric representation of a month, without leading zeros (1 - 12)
            formatted_date += date.getMonth() + 1;
            break;
          case 't':
            // Number of days in the given month
            // Not implemented
            break;
          case 'L':
            // Whether it's a leap year
            // Not implemented
            break;
          case 'o':
          case 'Y':
            // A full numeric representation of a year, 4 digits
            formatted_date += date.getFullYear();
            break;
          case 'y':
            // A two-digit representation of a year
            formatted_date += date.getFullYear().toString().substring(-2);
            break;
          case 'a':
            // Lowercase Ante meridiem and Post meridiem
            formatted_date += (date.getHours() < 12) ? "am" : "pm";
            break;
          case 'A':
            // Uppercase Ante meridiem and Post meridiem
            formatted_date += (date.getHours() < 12) ? "AM" : "PM";
            break;
          case 'B':
            // Swatch internet time
            // not implemented
            break;
          case 'g':
            // 12-hour format of an hour without leading zeros (1 - 12)
            formatted_date += (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
            break;
          case 'G':
            // 24-hour format of an hour without leading zeros (1 - 24)
            formatted_date += date.getHours();
            break;
          case 'h':
            // 12-hour format of an hour with leading zeros (01 - 12)
            formatted_date += prependZeros((date.getHours() > 12) ? date.getHours() - 12 : date.getHours());
            break;
          case 'H':
            // 24-hour format of an hour with leading zeros (01 - 24)
            formatted_date += prependZeros(date.getHours());
            break;
          case 'i':
            // Minutes, with leading zeros (00 - 59)
            formatted_date += prependZeros(date.getMinutes());
            break;
          case 's':
            // Seconds, with leading zeros (00 - 59)
            formatted_date += prependZeros(date.getDate());
            break;
          case 'u':
            // Microseconds (654321)
            formatted_date += date.getMilliseconds();
            break;
          case 'e':
            // Timezone identifier ('UTC', 'GMT')
            // not implemented
            break;
          case 'O':
          case 'P':
            // Difference to Greenwich time (GMT) in hours (+0200)
            formatted_date += date.getTimezoneOffset();
            break;
          case 'T':
            // Timezone abbreviation ('EST', 'MDT')
            // not implemented
            break;
          case 'Z':
            // Timezone offset in seconds
            // not implemented
            break;
          case 'c':
            // Full UTC date
            formatted_date += date.toUTCString();
            break;
          case 'r':
            // Full date string
            formatted_date += date.toDateString();
            break;
          case 'U':
            // Seconds since the epoch
            formatted_date += date.valueOf();
            break;
          default:
            // Non-meaningful character, just append it
            formatted_date += format.charAt(i);
            break;
        }
      }
      
      return formatted_date;
    }
    
    /**
     * Determine the correct suffix
     * for a date of the month
     */
    function getDateSuffix(date) {
      var day = parseInt(date.toString().substring(date.toString().length-1));
      switch (day) {
        case 1:
          return "st";
          break;
        case 2:
          return "nd";
          break;
        case 3:
          return "rd";
          break;
        default:
          return "th";
          break;
      }
    }
     
    
    /**
     * Add a leading zero to single-digit numbers
     */
    function prependZeros(input) {
      var str = input.toString();
      if(str.length < 2) {
        str = "0" + str;
      }
      return str;
    }

    /**
     * Pull the first image from an feed item's content 
     * and return it as an HTML <img /> element
     */
    function getImageFromContent(content) {
      var img = content.match(/<img[^>+]*>/i);
      if(img) {
        var source = img[0].match(/src="[^"+]*"/i),
        alt = img[0].match(/alt="[^"+]*"/i);
        return "<img " + source + " " + alt + " />";
      }
      return false;
    }
    
    /**
     * Load the Google Feed API
     * and load the feed
     */
    jQuery.getScript("https://www.google.com/jsapi", function() {
      google.load("feeds", "1", {"callback": initializeFeed});      
    });    
  }
})(jQuery, this);;
/**
 * Attaches the calendar behavior to all required fields
 */
(function($) {
  function makeFocusHandler(e) {
    if (!$(this).hasClass('date-popup-init')) {
      var datePopup = e.data;
      // Explicitely filter the methods we accept.
      switch (datePopup.func) {
        case 'datepicker':
          $(this)
            .datepicker(datePopup.settings)
            .addClass('date-popup-init');
          $(this).click(function(){
            $(this).focus();
          });
          if (datePopup.settings.syncEndDate) {
            $('.start-date-wrapper').each(function(){
              var start_date_wrapper = this;
              $(this).find('input:eq(0)').change(function(){
                $(start_date_wrapper).next('.end-date-wrapper').find('input:eq(0)').val($(this).val());
              });
            });
          }
          break;

        case 'timeEntry':
          $(this)
            .timeEntry(datePopup.settings)
            .addClass('date-popup-init');
          $(this).click(function(){
            $(this).focus();
          });
          break;

        case 'timepicker':
          // Translate the PHP date format into the style the timepicker uses.
          datePopup.settings.timeFormat = datePopup.settings.timeFormat
            // 12-hour, leading zero,
            .replace('h', 'hh')
            // 12-hour, no leading zero.
            .replace('g', 'h')
            // 24-hour, leading zero.
            .replace('H', 'HH')
            // 24-hour, no leading zero.
            .replace('G', 'H')
            // AM/PM.
            .replace('A', 'p')
            // Minutes with leading zero.
            .replace('i', 'mm')
            // Seconds with leading zero.
            .replace('s', 'ss');

          datePopup.settings.startTime = new Date(datePopup.settings.startTime);
          $(this)
            .timepicker(datePopup.settings)
            .addClass('date-popup-init');
          $(this).click(function(){
            $(this).focus();
          });
          break;
      }
    }
  }

  Drupal.behaviors.date_popup = {
    attach: function (context) {
      for (var id in Drupal.settings.datePopup) {
        $('#'+ id).bind('focus', Drupal.settings.datePopup[id], makeFocusHandler);
      }
    }
  };
})(jQuery);
;
