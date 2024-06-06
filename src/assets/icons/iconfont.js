;(window._iconfont_svg_string_4357030 =
  '<svg><symbol id="icon-shebei" viewBox="0 0 1024 1024"><path d="M936.32 761.6 622.912 761.6l23.744 140.8c3.392 12.864-5.76 25.6-18.368 25.6L395.712 928c-12.608 0-21.76-12.736-18.368-25.6l23.744-140.8L87.68 761.6c-41.344 0-74.88-35.456-74.88-79.232L12.8 175.232C12.8 131.456 46.336 96 87.68 96l848.64 0c41.344 0 74.88 35.456 74.88 79.232l0 507.136C1011.2 726.144 977.664 761.6 936.32 761.6zM743.616 306.112l-27.648-26.112c-7.616-7.232-19.968-7.232-27.648 0L505.152 454.912 408.512 363.456c-7.616-7.232-19.968-7.232-27.648 0L353.216 389.632C345.6 396.8 345.6 408.512 353.216 415.744l138.112 130.624c7.616 7.232 19.968 7.232 27.648 0l224.64-214.144C751.232 325.056 751.232 313.344 743.616 306.112z"  ></path></symbol><symbol id="icon-setting" viewBox="0 0 1024 1024"><path d="M881 512c0-52.4 32.9-96.8 79-114.5-11-43.2-28-83.9-50.2-121.3C864.6 296.3 810 288.1 773 251c-37-37-45.2-91.7-25.1-136.8C710.4 92 669.7 75 626.5 64c-17.8 46.1-62.2 79-114.5 79-52.4 0-96.8-32.9-114.5-79-43.2 11-83.9 28-121.3 50.2 20.1 45.2 11.9 99.8-25.1 136.8-37 37-91.7 45.2-136.8 25.2C92 313.6 75 354.3 64 397.5c46.1 17.8 79 62.2 79 114.5 0 52.4-32.9 96.8-79 114.5 11 43.2 28 83.9 50.2 121.3C159.4 727.7 214 735.9 251 773c37 37 45.2 91.7 25.1 136.8C313.6 932 354.3 949 397.5 960c17.8-46.1 62.2-79 114.5-79 52.4 0 96.8 32.9 114.5 79 43.2-11 83.9-28 121.3-50.2-20.1-45.2-11.9-99.8 25.1-136.8 37-37 91.7-45.2 136.8-25.2C932 710.4 949 669.7 960 626.5c-46.1-17.7-79-62.1-79-114.5zM512 635c-67.9 0-123-55.1-123-123s55.1-123 123-123 123 55.1 123 123-55.1 123-123 123z"  ></path></symbol><symbol id="icon-zhexian" viewBox="0 0 1024 1024"><path d="M126.2 898.2V64H64V960h896v-61.8z" fill="#7D7B81" ></path><path d="M897 192L576 513 381 384 192 640v192h705z" fill="#7D7B81" ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName('script'))[t.length - 1],
      e = t.getAttribute('data-injectcss'),
      t = t.getAttribute('data-disable-injectsvg')
    if (!t) {
      var i,
        o,
        c,
        d,
        l,
        s = function (t, e) {
          e.parentNode.insertBefore(t, e)
        }
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
          )
        } catch (t) {
          console && console.log(t)
        }
      }
      ;(i = function () {
        let t,
          e = document.createElement('div')
        ;(e.innerHTML = n._iconfont_svg_string_4357030),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild
              ? s(e, t.firstChild)
              : t.appendChild(e))
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(i, 0)
            : ((o = function () {
                document.removeEventListener('DOMContentLoaded', o, !1), i()
              }),
              document.addEventListener('DOMContentLoaded', o, !1))
          : document.attachEvent &&
            ((c = i),
            (d = n.document),
            (l = !1),
            r(),
            (d.onreadystatechange = function () {
              'complete' == d.readyState && ((d.onreadystatechange = null), a())
            }))
    }
    function a() {
      l || ((l = !0), c())
    }
    function r() {
      try {
        d.documentElement.doScroll('left')
      } catch (t) {
        return void setTimeout(r, 50)
      }
      a()
    }
  })(window)
