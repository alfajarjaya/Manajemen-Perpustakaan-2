!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define([], t)
      : "object" == typeof exports
        ? (exports.AOS = t())
        : (e.AOS = t());
})(this, function () {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var i = (n[o] = { exports: {}, id: o, loaded: !1 });
      return e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = "dist/"), t(0);
  })([
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        },
        r = n(1),
        a = (o(r), n(6)),
        u = o(a),
        c = n(7),
        f = o(c),
        s = n(8),
        d = o(s),
        l = n(9),
        p = o(l),
        m = n(10),
        b = o(m),
        v = n(11),
        y = o(v),
        g = n(14),
        h = o(g),
        w = [],
        k = !1,
        x = document.all && !window.atob,
        j = {
          offset: 120,
          delay: 0,
          easing: "ease",
          duration: 400,
          disable: !1,
          once: !1,
          startEvent: "DOMContentLoaded",
          throttleDelay: 99,
          debounceDelay: 50,
          disableMutationObserver: !1,
        },
        O = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if ((e && (k = !0), k))
            return (w = (0, y.default)(w, j)), (0, b.default)(w, j.once), w;
        },
        _ = function () {
          (w = (0, h.default)()), O();
        },
        S = function () {
          w.forEach(function (e, t) {
            e.node.removeAttribute("data-aos"),
              e.node.removeAttribute("data-aos-easing"),
              e.node.removeAttribute("data-aos-duration"),
              e.node.removeAttribute("data-aos-delay");
          });
        },
        z = function (e) {
          return (
            e === !0 ||
            ("mobile" === e && p.default.mobile()) ||
            ("phone" === e && p.default.phone()) ||
            ("tablet" === e && p.default.tablet()) ||
            ("function" == typeof e && e() === !0)
          );
        },
        A = function (e) {
          return (
            (j = i(j, e)),
            (w = (0, h.default)()),
            z(j.disable) || x
              ? S()
              : (document
                .querySelector("body")
                .setAttribute("data-aos-easing", j.easing),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-duration", j.duration),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-delay", j.delay),
                "DOMContentLoaded" === j.startEvent &&
                  ["complete", "interactive"].indexOf(document.readyState) > -1
                  ? O(!0)
                  : "load" === j.startEvent
                    ? window.addEventListener(j.startEvent, function () {
                      O(!0);
                    })
                    : document.addEventListener(j.startEvent, function () {
                      O(!0);
                    }),
                window.addEventListener(
                  "resize",
                  (0, f.default)(O, j.debounceDelay, !0)
                ),
                window.addEventListener(
                  "orientationchange",
                  (0, f.default)(O, j.debounceDelay, !0)
                ),
                window.addEventListener(
                  "scroll",
                  (0, u.default)(function () {
                    (0, b.default)(w, j.once);
                  }, j.throttleDelay)
                ),
                j.disableMutationObserver || (0, d.default)("[data-aos]", _),
                w)
          );
        };
      e.exports = { init: A, refresh: O, refreshHard: _ };
    },
    function (e, t, n) {
      "use strict";
      e.exports = n(2);
    },
    function (e, t, n) {
      "use strict";
      e.exports = function (e, t) {
        function n() {
          (r = null), a && (o.apply(i, u), a.apply(i, u));
        }
        var o,
          i,
          r,
          a,
          u;
        t = t || {};
        var c = !1,
          f = [],
          s = !0,
          d = !1;
        if ("function" != typeof e) throw new TypeError("Expected function");
        function l(e) {
          var t = e.timeStamp || e.originalEvent.timeStamp,
            n = Date.now() - t;
          clearTimeout(r),
            n >= 0
              ? ((r = setTimeout(n)), c || ((c = !0), i.apply(o, u)))
              : ((d = !0),
                setTimeout(function () {
                  (d = !1), l(e);
                }, -n));
        }
        function p(e) {
          (o = this),
            (i = arguments),
            (u = e),
            (r = r || setTimeout(n, 0)),
            s && !c && ((c = !0), o.apply(i, u));
        }
        return (
          (t = t || {}),
          (o = this),
          (i = arguments),
          (u = t.arguments || []),
          (a = t.leading),
          (s = void 0 === t.leading ? s : t.leading),
          (d = "maxWait" in t),
          (d = d ? Math.max(t.maxWait || 0, 0) : d),
          (f = "trailing" in t ? !!t.trailing : f),
          p.cancel = function () {
            clearTimeout(r), (c = !1);
          },
          p.flush = function () {
            n();
          },
          p
        );
      };
    },
    function (e, t, n) {
      "use strict";
      var o = n(3),
        i = n(4),
        r = n(5);
      e.exports = function (e, t) {
        function n() {
          if (a) {
            var e = Date.now() - c;
            e < t && e >= 0 ? (o = setTimeout(n, t - e)) : ((o = null), r || ((r = setTimeout(i, e)), (u = Date.now())));
          }
        }
        var r,
          a,
          u,
          c,
          f = !1,
          s = [];
        if ("function" != typeof e) throw new TypeError("Expected a function");
        function d() {
          (a = !1), f && ((f = !1), n());
        }
        function l() {
          r && clearTimeout(r), (o = u = r = null);
        }
        function p() {
          (o = null), (u = Date.now()), (a = f = !0), (r = setTimeout(i, t)), (c = u + t);
        }
        function m() {
          var n = Date.now() - u;
          n < t && n >= 0 ? (o = setTimeout(m, t - n)) : ((o = null), (r || !s) && e.apply(void 0, s), l());
        }
        function b() {
          (o = null), (r = null), (u = c = Date.now()), e.apply(void 0, s);
        }
        return (
          (t = i(t) || 0),
          r || t < 0
            ? p()
            : (o || (u = Date.now()), (o = setTimeout(m, t))),
          (p.cancel = function () {
            r && clearTimeout(r), o && clearTimeout(o), (u = 0), (o = r = null);
          }),
          (p.flush = function () {
            o && (e.apply(void 0, s), clearTimeout(o), (u = Date.now()), (o = r = null));
          }),
          p
        );
      };
    },
    function (e, t, n) {
      "use strict";
      e.exports = function (e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 2147483647;
      };
    },
    function (e, t, n) {
      "use strict";
      e.exports = function (e) {
        return setTimeout(e, 1);
      };
    },
    function (e, t, n) {
      "use strict";
      function o() {
        return (
          !!("undefined" != typeof window && window.document && window.document.createElement) &&
          (!(function () {
            var e = document.createElement("div");
            e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", !e.getElementsByTagName("i").length;
          })() ||
            (document.documentMode && document.documentMode <= 9))
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = {
        phone: function () {
          return window.innerWidth < 768;
        },
        tablet: function () {
          return window.innerWidth <= 991 && window.innerWidth >= 768;
        },
        mobile: function () {
          return window.innerWidth <= 991;
        },
      };
      (t.default = {
        mobile: function () {
          return i.mobile();
        },
        phone: function () {
          return i.phone();
        },
        tablet: function () {
          return i.tablet();
        },
        ie9: o,
      }),
        (e.exports = t.default);
    },
    function (e, t, n) {
      "use strict";
      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
        r = n(12),
        a = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(r),
        u = (function () {
          function e() {
            o(this, e), (this.reconnectMutationObserver = this.reconnectMutationObserver.bind(this));
          }
          return (
            i(e, [
              {
                key: "handleMutations",
                value: function (e) {
                  e.forEach(function (e) {
                    (0, a.default)(e.target, { attribute: !0 });
                  });
                },
              },
              {
                key: "reconnectMutationObserver",
                value: function () {
                  this.observer.disconnect(), this.observe();
                },
              },
              {
                key: "observe",
                value: function () {
                  var e = this;
                  (this.observer = new MutationObserver(function (t) {
                    e.handleMutations(t);
                  })),
                    this.observer.observe(document.body, {
                      attributes: !0,
                      childList: !0,
                      subtree: !0,
                    });
                },
              },
            ]),
            e
          );
        })();
      t.default = u;
    },
    function (e, t, n) {
      "use strict";
      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
        r = n(13),
        a = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(r),
        u = (function () {
          function e() {
            o(this, e);
          }
          return (
            i(e, [
              {
                key: "detect",
                value: function () {
                  var e = !1;
                  try {
                    var t = Object.defineProperty({}, "passive", {
                      get: function () {
                        e = !0;
                      },
                    });
                    window.addEventListener("test", null, t);
                  } catch (e) {}
                  return e;
                },
              },
              {
                key: "addEventListener",
                value: function (e, t, n) {
                  var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                  e.addEventListener(
                    t,
                    n,
                    (0, a.default)({ passive: o ? !1 : this.detect() })
                  );
                },
              },
            ]),
            e
          );
        })();
      t.default = u;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(0),
        r = o(i),
        a = n(15),
        u = o(a),
        c = n(16),
        f = o(c),
        s = n(17),
        d = o(s);
      window.AOS = {
        init: function (e) {
          return (0, u.default)(e);
        },
        refresh: function () {
          return (0, f.default)();
        },
        refreshHard: function () {
          return (0, d.default)();
        },
      };
      var l = document.currentScript || document.scripts[document.scripts.length - 1];
      "complete" === document.readyState
        ? ((0, u.default)(), l.parentNode.removeChild(l))
        : window.addEventListener("load", function () {
          (0, u.default)(), l.parentNode.removeChild(l);
        }),
        (t.default = r.default);
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(1),
        r = o(i),
        a = n(2),
        u = o(a),
        c = n(3),
        f = o(c),
        s = n(4),
        d = o(s),
        l = n(5),
        p = o(l),
        m = n(18),
        b = o(m),
        v = function () {
          return new Date().getTime();
        },
        y = function (e, t, n, o, i) {
          var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
          if (r) return (0, u.default)(e, t, n);
          var a = v();
          if (a - p.default > o) return (0, u.default)(e, t, n), (0, b.default)();
          var c = (o - (a - p.default)) * Math.random() * 0.01;
          return (
            setTimeout(function () {
              return y(e, t, n, o, i, !0);
            }, c),
            !1
          );
        };
      t.default = function () {
        var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : { startEvent: "DOMContentLoaded" };
        return (
          f.default.cancel(),
          (0, d.default)(),
          document.querySelectorAll("[data-aos]").length <= 0
            ? (console.warn("[AOS] No [data-aos] elements found. Add a data-aos on at least one element."), !1)
            : ((0, r.default)(e),
              y(function () {
                (0, b.default)(), (0, u.default)(function () {}, 20);
              }, e.throttleDelay, e.startEvent, e.delay, e.throttleDelay))
        );
      };
    },
    function (e, t, n) {
      "use strict";
      function o() {
        return "complete" === document.readyState;
      }
      function i() {
        var e = new Date().getTime();
        e - r > 16
          ? (a.default(), (r = e))
          : clearTimeout(u),
          (u = setTimeout(function () {
            a.default();
          }, 10));
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = 0,
        a = (function (e) {
          return e && e.__esModule ? e : { default: e };
        })(n(13)),
        u = void 0;
      t.default = function () {
        return o() ? a.default() : void window.addEventListener("load", function () {
          return a.default();
        });
      };
    },
    function (e, t, n) {
      "use strict";
      function o() {
        var e = document.querySelectorAll("[data-aos]");
        return (
          Array.from(e).map(function (e) {
            return e.getAttribute("data-aos-id");
          }),
          Array.from(e)
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = function () {
          var e = document.querySelectorAll("[data-aos]");
          return (
            Array.from(e).map(function (e) {
              return e.getAttribute("data-aos-id");
            }),
            Array.from(e)
          );
        }),
        (e.exports = t.default);
    },
  ]);
});
