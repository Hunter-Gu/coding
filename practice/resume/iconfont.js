;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-3" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M432.437943 84.352153 293.200762 84.3542l0 219.479737 139.238204-0.684592L432.438966 84.352153zM392.656915 243.47729l-59.671031 0 0-99.453083 59.671031 0L392.656915 243.47729zM730.799238 84.3542l-139.236158-0.002047 0 218.796168 139.236158 0.684592L730.799238 84.3542zM691.016163 243.47729l-59.672054 0 0-99.453083 59.672054 0L691.016163 243.47729zM790.468223 163.91421l0 59.672054 79.562057 0L870.030279 879.974769 153.969721 879.974769l0.001023-656.389528 79.56308 0 0-59.672054L94.298689 163.913187l-0.001023 775.733637 835.403644 0 0.001023-775.733637L790.468223 163.913187zM551.781028 163.91421l-79.562057 0 0 59.672054 79.562057 0L551.781028 163.91421zM730.796168 462.273459 293.203832 462.273459l0 59.672054 437.592336 0L730.796168 462.273459zM293.203832 661.178601l437.592336 0 0-59.672054L293.203832 601.506547 293.203832 661.178601z"  ></path>' +
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