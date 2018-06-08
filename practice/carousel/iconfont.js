;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-iconfont93" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M64 800h896c35.344 0 64-28.656 64-64v-448c0-35.344-28.656-64-64-64h-896c-35.344 0-64 28.656-64 64v448c0 35.344 28.656 64 64 64zM48 320c0-35.344 12.656-48 48-48h832c35.344 0 48 12.656 48 48v384c0 35.344-12.656 48-48 48h-832c-35.344 0-48-12.656-48-48v-384z" fill="#d81e06" ></path>' +
    '' +
    '<path d="M160 704h256c35.344 0 64-28.656 64-64v-256c0-35.344-28.656-64-64-64h-256c-35.344 0-64 28.656-64 64v256c0 35.344 28.656 64 64 64z" fill="#d81e06" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconfont931" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M960 224 64 224c-35.344 0-64 28.656-64 64l0 448c0 35.344 28.656 64 64 64l896 0c35.344 0 64-28.656 64-64L1024 288C1024 252.656 995.344 224 960 224zM976 704c0 35.344-12.656 48-48 48L96 752c-35.344 0-48-12.656-48-48L48 320c0-35.344 12.656-48 48-48l832 0c35.344 0 48 12.656 48 48L976 704z"  ></path>' +
    '' +
    '<path d="M864 320 608 320c-35.344 0-64 28.656-64 64l0 256c0 35.344 28.656 64 64 64l256 0c35.344 0 64-28.656 64-64L928 384C928 348.656 899.344 320 864 320z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)