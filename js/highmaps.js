/*
 Highmaps JS v5.0.6 (2016-12-07)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(K, a) {
    "object" === typeof module && module.exports ? module.exports = K.document ? a(K) : a : K.Highcharts = a(K)
})("undefined" !== typeof window ? window : this, function(K) {
    K = function() {
        var a = window,
            z = a.document,
            D = a.navigator && a.navigator.userAgent || "",
            C = z && z.createElementNS && !!z.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            B = /(edge|msie|trident)/i.test(D) && !window.opera,
            d = !C,
            h = /Firefox/.test(D),
            q = h && 4 > parseInt(D.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highmaps",
            version: "5.0.6",
            deg2rad: 2 * Math.PI / 360,
            doc: z,
            hasBidiBug: q,
            hasTouch: z && void 0 !== z.documentElement.ontouchstart,
            isMS: B,
            isWebKit: /AppleWebKit/.test(D),
            isFirefox: h,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(D),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: C,
            vml: d,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {}
        }
    }();
    (function(a) {
        var z = [],
            D = a.charts,
            C = a.doc,
            B = a.win;
        a.error = function(d, h) {
            d = a.isNumber(d) ? "Highcharts error #" +
                d + ": www.highcharts.com/errors/" + d : d;
            if (h) throw Error(d);
            B.console && console.log(d)
        };
        a.Fx = function(a, h, q) {
            this.options = h;
            this.elem = a;
            this.prop = q
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    h = this.paths[1],
                    q = [],
                    t = this.now,
                    g = a.length,
                    p;
                if (1 === t) q = this.toD;
                else if (g === h.length && 1 > t)
                    for (; g--;) p = parseFloat(a[g]), q[g] = isNaN(p) ? a[g] : t * parseFloat(h[g] - p) + p;
                else q = h;
                this.elem.attr("d", q, null, !0)
            },
            update: function() {
                var a = this.elem,
                    h = this.prop,
                    q = this.now,
                    t = this.options.step;
                if (this[h + "Setter"]) this[h +
                    "Setter"]();
                else a.attr ? a.element && a.attr(h, q, null, !0) : a.style[h] = q + this.unit;
                t && t.call(a, q, this)
            },
            run: function(a, h, q) {
                var d = this,
                    g = function(a) {
                        return g.stopped ? !1 : d.step(a)
                    },
                    p;
                this.startTime = +new Date;
                this.start = a;
                this.end = h;
                this.unit = q;
                this.now = this.start;
                this.pos = 0;
                g.elem = this.elem;
                g.prop = this.prop;
                g() && 1 === z.push(g) && (g.timerId = setInterval(function() {
                    for (p = 0; p < z.length; p++) z[p]() || z.splice(p--, 1);
                    z.length || clearInterval(g.timerId)
                }, 13))
            },
            step: function(a) {
                var d = +new Date,
                    q, t = this.options;
                q = this.elem;
                var g = t.complete,
                    p = t.duration,
                    f = t.curAnim,
                    n;
                if (q.attr && !q.element) q = !1;
                else if (a || d >= p + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = f[this.prop] = !0;
                    for (n in f) !0 !== f[n] && (a = !1);
                    a && g && g.call(q);
                    q = !1
                } else this.pos = t.easing((d - this.startTime) / p), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0;
                return q
            },
            initPath: function(d, h, q) {
                function t(a) {
                    var r, c;
                    for (b = a.length; b--;) r = "M" === a[b] || "L" === a[b], c = /[a-zA-Z]/.test(a[b + 3]), r && c && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b +
                        2])
                }

                function g(a, r) {
                    for (; a.length < e;) {
                        a[0] = r[e - a.length];
                        var c = a.slice(0, k);
                        [].splice.apply(a, [0, 0].concat(c));
                        F && (c = a.slice(a.length - k), [].splice.apply(a, [a.length, 0].concat(c)), b--)
                    }
                    a[0] = "M"
                }

                function p(a, b) {
                    for (var r = (e - a.length) / k; 0 < r && r--;) c = a.slice().splice(a.length / u - k, k * u), c[0] = b[e - k - r * k], v && (c[k - 6] = c[k - 2], c[k - 5] = c[k - 1]), [].splice.apply(a, [a.length / u, 0].concat(c)), F && r--
                }
                h = h || "";
                var f, n = d.startX,
                    w = d.endX,
                    v = -1 < h.indexOf("C"),
                    k = v ? 7 : 3,
                    e, c, b;
                h = h.split(" ");
                q = q.slice();
                var F = d.isArea,
                    u = F ? 2 : 1,
                    r;
                v && (t(h), t(q));
                if (n && w) {
                    for (b = 0; b < n.length; b++)
                        if (n[b] === w[0]) {
                            f = b;
                            break
                        } else if (n[0] === w[w.length - n.length + b]) {
                        f = b;
                        r = !0;
                        break
                    }
                    void 0 === f && (h = [])
                }
                h.length && a.isNumber(f) && (e = q.length + f * u * k, r ? (g(h, q), p(q, h)) : (g(q, h), p(h, q)));
                return [h, q]
            }
        };
        a.extend = function(a, h) {
            var d;
            a || (a = {});
            for (d in h) a[d] = h[d];
            return a
        };
        a.merge = function() {
            var d, h = arguments,
                q, t = {},
                g = function(d, f) {
                    var n, p;
                    "object" !== typeof d && (d = {});
                    for (p in f) f.hasOwnProperty(p) && (n = f[p], a.isObject(n, !0) && "renderTo" !== p && "number" !== typeof n.nodeType ?
                        d[p] = g(d[p] || {}, n) : d[p] = f[p]);
                    return d
                };
            !0 === h[0] && (t = h[1], h = Array.prototype.slice.call(h, 2));
            q = h.length;
            for (d = 0; d < q; d++) t = g(t, h[d]);
            return t
        };
        a.pInt = function(a, h) {
            return parseInt(a, h || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(d, h) {
            return d && "object" === typeof d && (!h || !a.isArray(d))
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase =
            function(a, h) {
                for (var d = a.length; d--;)
                    if (a[d] === h) {
                        a.splice(d, 1);
                        break
                    }
            };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(d, h, q) {
            var t, g;
            if (a.isString(h)) a.defined(q) ? d.setAttribute(h, q) : d && d.getAttribute && (g = d.getAttribute(h));
            else if (a.defined(h) && a.isObject(h))
                for (t in h) d.setAttribute(t, h[t]);
            return g
        };
        a.splat = function(d) {
            return a.isArray(d) ? d : [d]
        };
        a.syncTimeout = function(a, h, q) {
            if (h) return setTimeout(a, h, q);
            a.call(0, q)
        };
        a.pick = function() {
            var a = arguments,
                h, q, t = a.length;
            for (h =
                0; h < t; h++)
                if (q = a[h], void 0 !== q && null !== q) return q
        };
        a.css = function(d, h) {
            a.isMS && !a.svg && h && void 0 !== h.opacity && (h.filter = "alpha(opacity\x3d" + 100 * h.opacity + ")");
            a.extend(d.style, h)
        };
        a.createElement = function(d, h, q, t, g) {
            d = C.createElement(d);
            var p = a.css;
            h && a.extend(d, h);
            g && p(d, {
                padding: 0,
                border: "none",
                margin: 0
            });
            q && p(d, q);
            t && t.appendChild(d);
            return d
        };
        a.extendClass = function(d, h) {
            var q = function() {};
            q.prototype = new d;
            a.extend(q.prototype, h);
            return q
        };
        a.pad = function(a, h, q) {
            return Array((h || 2) + 1 - String(a).length).join(q ||
                0) + a
        };
        a.relativeLength = function(a, h) {
            return /%$/.test(a) ? h * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function(a, h, q) {
            var d = a[h];
            a[h] = function() {
                var a = Array.prototype.slice.call(arguments),
                    p = arguments,
                    f = this;
                f.proceed = function() {
                    d.apply(f, arguments.length ? arguments : p)
                };
                a.unshift(d);
                a = q.apply(this, a);
                f.proceed = null;
                return a
            }
        };
        a.getTZOffset = function(d) {
            var h = a.Date;
            return 6E4 * (h.hcGetTimezoneOffset && h.hcGetTimezoneOffset(d) || h.hcTimezoneOffset || 0)
        };
        a.dateFormat = function(d, h, q) {
            if (!a.defined(h) || isNaN(h)) return a.defaultOptions.lang.invalidDate ||
                "";
            d = a.pick(d, "%Y-%m-%d %H:%M:%S");
            var t = a.Date,
                g = new t(h - a.getTZOffset(h)),
                p, f = g[t.hcGetHours](),
                n = g[t.hcGetDay](),
                w = g[t.hcGetDate](),
                v = g[t.hcGetMonth](),
                k = g[t.hcGetFullYear](),
                e = a.defaultOptions.lang,
                c = e.weekdays,
                b = e.shortWeekdays,
                F = a.pad,
                t = a.extend({
                    a: b ? b[n] : c[n].substr(0, 3),
                    A: c[n],
                    d: F(w),
                    e: F(w, 2, " "),
                    w: n,
                    b: e.shortMonths[v],
                    B: e.months[v],
                    m: F(v + 1),
                    y: k.toString().substr(2, 2),
                    Y: k,
                    H: F(f),
                    k: f,
                    I: F(f % 12 || 12),
                    l: f % 12 || 12,
                    M: F(g[t.hcGetMinutes]()),
                    p: 12 > f ? "AM" : "PM",
                    P: 12 > f ? "am" : "pm",
                    S: F(g.getSeconds()),
                    L: F(Math.round(h %
                        1E3), 3)
                }, a.dateFormats);
            for (p in t)
                for (; - 1 !== d.indexOf("%" + p);) d = d.replace("%" + p, "function" === typeof t[p] ? t[p](h) : t[p]);
            return q ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
        };
        a.formatSingle = function(d, h) {
            var q = /\.([0-9])/,
                t = a.defaultOptions.lang;
            /f$/.test(d) ? (q = (q = d.match(q)) ? q[1] : -1, null !== h && (h = a.numberFormat(h, q, t.decimalPoint, -1 < d.indexOf(",") ? t.thousandsSep : ""))) : h = a.dateFormat(d, h);
            return h
        };
        a.format = function(d, h) {
            for (var q = "{", t = !1, g, p, f, n, w = [], v; d;) {
                q = d.indexOf(q);
                if (-1 === q) break;
                g = d.slice(0,
                    q);
                if (t) {
                    g = g.split(":");
                    p = g.shift().split(".");
                    n = p.length;
                    v = h;
                    for (f = 0; f < n; f++) v = v[p[f]];
                    g.length && (v = a.formatSingle(g.join(":"), v));
                    w.push(v)
                } else w.push(g);
                d = d.slice(q + 1);
                q = (t = !t) ? "}" : "{"
            }
            w.push(d);
            return w.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(d, h, q, t, g) {
            var p, f = d;
            q = a.pick(q, 1);
            p = d / q;
            h || (h = g ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === q ? h = a.grep(h, function(a) {
                return 0 === a % 1
            }) : .1 >= q && (h = [1 / q])));
            for (t = 0; t < h.length && !(f = h[t], g && f * q >= d || !g && p <= (h[t] + (h[t + 1] || h[t])) / 2); t++);
            return f * q
        };
        a.stableSort = function(a, h) {
            var d = a.length,
                t, g;
            for (g = 0; g < d; g++) a[g].safeI = g;
            a.sort(function(a, f) {
                t = h(a, f);
                return 0 === t ? a.safeI - f.safeI : t
            });
            for (g = 0; g < d; g++) delete a[g].safeI
        };
        a.arrayMin = function(a) {
            for (var d = a.length, q = a[0]; d--;) a[d] < q && (q = a[d]);
            return q
        };
        a.arrayMax = function(a) {
            for (var d = a.length, q = a[0]; d--;) a[d] > q && (q = a[d]);
            return q
        };
        a.destroyObjectProperties = function(a, h) {
            for (var d in a) a[d] && a[d] !== h && a[d].destroy &&
                a[d].destroy(), delete a[d]
        };
        a.discardElement = function(d) {
            var h = a.garbageBin;
            h || (h = a.createElement("div"));
            d && h.appendChild(d);
            h.innerHTML = ""
        };
        a.correctFloat = function(a, h) {
            return parseFloat(a.toPrecision(h || 14))
        };
        a.setAnimation = function(d, h) {
            h.renderer.globalAnimation = a.pick(d, h.options.chart.animation, !0)
        };
        a.animObject = function(d) {
            return a.isObject(d) ? a.merge(d) : {
                duration: d ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat =
            function(d, h, q, t) {
                d = +d || 0;
                h = +h;
                var g = a.defaultOptions.lang,
                    p = (d.toString().split(".")[1] || "").length,
                    f, n, w = Math.abs(d); - 1 === h ? h = Math.min(p, 20) : a.isNumber(h) || (h = 2);
                f = String(a.pInt(w.toFixed(h)));
                n = 3 < f.length ? f.length % 3 : 0;
                q = a.pick(q, g.decimalPoint);
                t = a.pick(t, g.thousandsSep);
                d = (0 > d ? "-" : "") + (n ? f.substr(0, n) + t : "");
                d += f.substr(n).replace(/(\d{3})(?=\d)/g, "$1" + t);
                h && (t = Math.abs(w - f + Math.pow(10, -Math.max(h, p) - 1)), d += q + t.toFixed(h).slice(2));
                return d
            };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI *
                a) - 1)
        };
        a.getStyle = function(d, h) {
            return "width" === h ? Math.min(d.offsetWidth, d.scrollWidth) - a.getStyle(d, "padding-left") - a.getStyle(d, "padding-right") : "height" === h ? Math.min(d.offsetHeight, d.scrollHeight) - a.getStyle(d, "padding-top") - a.getStyle(d, "padding-bottom") : (d = B.getComputedStyle(d, void 0)) && a.pInt(d.getPropertyValue(h))
        };
        a.inArray = function(a, h) {
            return h.indexOf ? h.indexOf(a) : [].indexOf.call(h, a)
        };
        a.grep = function(a, h) {
            return [].filter.call(a, h)
        };
        a.find = function(a, h) {
            return [].find.call(a, h)
        };
        a.map = function(a,
            h) {
            for (var d = [], t = 0, g = a.length; t < g; t++) d[t] = h.call(a[t], a[t], t, a);
            return d
        };
        a.offset = function(a) {
            var d = C.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (B.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                left: a.left + (B.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
            }
        };
        a.stop = function(a, h) {
            for (var d = z.length; d--;) z[d].elem !== a || h && h !== z[d].prop || (z[d].stopped = !0)
        };
        a.each = function(a, h, q) {
            return Array.prototype.forEach.call(a, h, q)
        };
        a.addEvent = function(d, h, q) {
            function t(a) {
                a.target = a.srcElement ||
                    B;
                q.call(d, a)
            }
            var g = d.hcEvents = d.hcEvents || {};
            d.addEventListener ? d.addEventListener(h, q, !1) : d.attachEvent && (d.hcEventsIE || (d.hcEventsIE = {}), d.hcEventsIE[q.toString()] = t, d.attachEvent("on" + h, t));
            g[h] || (g[h] = []);
            g[h].push(q);
            return function() {
                a.removeEvent(d, h, q)
            }
        };
        a.removeEvent = function(d, h, q) {
            function t(a, f) {
                d.removeEventListener ? d.removeEventListener(a, f, !1) : d.attachEvent && (f = d.hcEventsIE[f.toString()], d.detachEvent("on" + a, f))
            }

            function g() {
                var a, g;
                if (d.nodeName)
                    for (g in h ? (a = {}, a[h] = !0) : a = f, a)
                        if (f[g])
                            for (a =
                                f[g].length; a--;) t(g, f[g][a])
            }
            var p, f = d.hcEvents,
                n;
            f && (h ? (p = f[h] || [], q ? (n = a.inArray(q, p), -1 < n && (p.splice(n, 1), f[h] = p), t(h, q)) : (g(), f[h] = [])) : (g(), d.hcEvents = {}))
        };
        a.fireEvent = function(d, h, q, t) {
            var g;
            g = d.hcEvents;
            var p, f;
            q = q || {};
            if (C.createEvent && (d.dispatchEvent || d.fireEvent)) g = C.createEvent("Events"), g.initEvent(h, !0, !0), a.extend(g, q), d.dispatchEvent ? d.dispatchEvent(g) : d.fireEvent(h, g);
            else if (g)
                for (g = g[h] || [], p = g.length, q.target || a.extend(q, {
                        preventDefault: function() {
                            q.defaultPrevented = !0
                        },
                        target: d,
                        type: h
                    }), h = 0; h < p; h++)(f = g[h]) && !1 === f.call(d, q) && q.preventDefault();
            t && !q.defaultPrevented && t(q)
        };
        a.animate = function(d, h, q) {
            var t, g = "",
                p, f, n;
            a.isObject(q) || (t = arguments, q = {
                duration: t[2],
                easing: t[3],
                complete: t[4]
            });
            a.isNumber(q.duration) || (q.duration = 400);
            q.easing = "function" === typeof q.easing ? q.easing : Math[q.easing] || Math.easeInOutSine;
            q.curAnim = a.merge(h);
            for (n in h) a.stop(d, n), f = new a.Fx(d, q, n), p = null, "d" === n ? (f.paths = f.initPath(d, d.d, h.d), f.toD = h.d, t = 0, p = 1) : d.attr ? t = d.attr(n) : (t = parseFloat(a.getStyle(d,
                n)) || 0, "opacity" !== n && (g = "px")), p || (p = h[n]), p.match && p.match("px") && (p = p.replace(/px/g, "")), f.run(t, p, g)
        };
        a.seriesType = function(d, h, q, t, g) {
            var p = a.getOptions(),
                f = a.seriesTypes;
            p.plotOptions[d] = a.merge(p.plotOptions[h], q);
            f[d] = a.extendClass(f[h] || function() {}, t);
            f[d].prototype.type = d;
            g && (f[d].prototype.pointClass = a.extendClass(a.Point, g));
            return f[d]
        };
        a.uniqueKey = function() {
            var a = Math.random().toString(36).substring(2, 9),
                h = 0;
            return function() {
                return "highcharts-" + a + "-" + h++
            }
        }();
        B.jQuery && (B.jQuery.fn.highcharts =
            function() {
                var d = [].slice.call(arguments);
                if (this[0]) return d[0] ? (new(a[a.isString(d[0]) ? d.shift() : "Chart"])(this[0], d[0], d[1]), this) : D[a.attr(this[0], "data-highcharts-chart")]
            });
        C && !C.defaultView && (a.getStyle = function(d, h) {
            var q = {
                width: "clientWidth",
                height: "clientHeight"
            }[h];
            if (d.style[h]) return a.pInt(d.style[h]);
            "opacity" === h && (h = "filter");
            if (q) return d.style.zoom = 1, Math.max(d[q] - 2 * a.getStyle(d, "padding"), 0);
            d = d.currentStyle[h.replace(/\-(\w)/g, function(a, g) {
                return g.toUpperCase()
            })];
            "filter" ===
            h && (d = d.replace(/alpha\(opacity=([0-9]+)\)/, function(a, g) {
                return g / 100
            }));
            return "" === d ? 1 : a.pInt(d)
        });
        Array.prototype.forEach || (a.each = function(a, h, q) {
            for (var d = 0, g = a.length; d < g; d++)
                if (!1 === h.call(q, a[d], d, a)) return d
        });
        Array.prototype.indexOf || (a.inArray = function(a, h) {
            var d, t = 0;
            if (h)
                for (d = h.length; t < d; t++)
                    if (h[t] === a) return t;
            return -1
        });
        Array.prototype.filter || (a.grep = function(a, h) {
            for (var d = [], t = 0, g = a.length; t < g; t++) h(a[t], t) && d.push(a[t]);
            return d
        });
        Array.prototype.find || (a.find = function(a, h) {
            var d,
                t = a.length;
            for (d = 0; d < t; d++)
                if (h(a[d], d)) return a[d]
        })
    })(K);
    (function(a) {
        var z = a.each,
            D = a.isNumber,
            C = a.map,
            B = a.merge,
            d = a.pInt;
        a.Color = function(d) {
            if (!(this instanceof a.Color)) return new a.Color(d);
            this.init(d)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [d(a[1]), d(a[2]), d(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                parse: function(a) {
                    return [d(a[1],
                        16), d(a[2], 16), d(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [d(a[1]), d(a[2]), d(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(d) {
                var h, t, g, p;
                if ((this.input = d = this.names[d] || d) && d.stops) this.stops = C(d.stops, function(f) {
                    return new a.Color(f[1])
                });
                else
                    for (g = this.parsers.length; g-- && !t;) p = this.parsers[g], (h = p.regex.exec(d)) && (t = p.parse(h));
                this.rgba = t || []
            },
            get: function(a) {
                var d = this.input,
                    h = this.rgba,
                    g;
                this.stops ?
                    (g = B(d), g.stops = [].concat(g.stops), z(this.stops, function(p, f) {
                        g.stops[f] = [g.stops[f][0], p.get(a)]
                    })) : g = h && D(h[0]) ? "rgb" === a || !a && 1 === h[3] ? "rgb(" + h[0] + "," + h[1] + "," + h[2] + ")" : "a" === a ? h[3] : "rgba(" + h.join(",") + ")" : d;
                return g
            },
            brighten: function(a) {
                var h, t = this.rgba;
                if (this.stops) z(this.stops, function(g) {
                    g.brighten(a)
                });
                else if (D(a) && 0 !== a)
                    for (h = 0; 3 > h; h++) t[h] += d(255 * a), 0 > t[h] && (t[h] = 0), 255 < t[h] && (t[h] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function(d) {
            return new a.Color(d)
        }
    })(K);
    (function(a) {
        function z() {
            var d = a.defaultOptions.global,
                g, p = d.useUTC,
                f = p ? "getUTC" : "get",
                n = p ? "setUTC" : "set";
            a.Date = g = d.Date || q.Date;
            g.hcTimezoneOffset = p && d.timezoneOffset;
            g.hcGetTimezoneOffset = p && d.getTimezoneOffset;
            g.hcMakeTime = function(a, f, k, e, c, b) {
                var n;
                p ? (n = g.UTC.apply(0, arguments), n += B(n)) : n = (new g(a, f, h(k, 1), h(e, 0), h(c, 0), h(b, 0))).getTime();
                return n
            };
            C("Minutes Hours Day Date Month FullYear".split(" "), function(a) {
                g["hcGet" + a] = f + a
            });
            C("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),
                function(a) {
                    g["hcSet" + a] = n + a
                })
        }
        var D = a.color,
            C = a.each,
            B = a.getTZOffset,
            d = a.merge,
            h = a.pick,
            q = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com/5.0.6/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: D("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(h) {
            a.defaultOptions = d(!0, a.defaultOptions, h);
            z();
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        z()
    })(K);
    (function(a) {
        var z, D, C = a.addEvent,
            B = a.animate,
            d = a.attr,
            h = a.charts,
            q = a.color,
            t = a.css,
            g = a.createElement,
            p = a.defined,
            f = a.deg2rad,
            n = a.destroyObjectProperties,
            w = a.doc,
            v = a.each,
            k = a.extend,
            e = a.erase,
            c = a.grep,
            b = a.hasTouch,
            F = a.isArray,
            u = a.isFirefox,
            r = a.isMS,
            y = a.isObject,
            G = a.isString,
            I = a.isWebKit,
            l = a.merge,
            x = a.noop,
            J = a.pick,
            L = a.pInt,
            N = a.removeEvent,
            m = a.stop,
            A = a.svg,
            P = a.SVG_NS,
            M = a.symbolSizes,
            R = a.win;
        z = a.SVGElement = function() {
            return this
        };
        z.prototype = {
            opacity: 1,
            SVG_NS: P,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
            init: function(a, H) {
                this.element = "span" === H ? g(H) : w.createElementNS(this.SVG_NS,
                    H);
                this.renderer = a
            },
            animate: function(E, H, m) {
                H = a.animObject(J(H, this.renderer.globalAnimation, !0));
                0 !== H.duration ? (m && (H.complete = m), B(this, E, H)) : this.attr(E, null, m);
                return this
            },
            colorGradient: function(E, H, m) {
                var b = this.renderer,
                    r, c, A, e, y, k, f, g, x, n, G, u = [],
                    d;
                E.linearGradient ? c = "linearGradient" : E.radialGradient && (c = "radialGradient");
                if (c) {
                    A = E[c];
                    y = b.gradients;
                    f = E.stops;
                    n = m.radialReference;
                    F(A) && (E[c] = A = {
                        x1: A[0],
                        y1: A[1],
                        x2: A[2],
                        y2: A[3],
                        gradientUnits: "userSpaceOnUse"
                    });
                    "radialGradient" === c && n && !p(A.gradientUnits) &&
                        (e = A, A = l(A, b.getRadialAttr(n, e), {
                            gradientUnits: "userSpaceOnUse"
                        }));
                    for (G in A) "id" !== G && u.push(G, A[G]);
                    for (G in f) u.push(f[G]);
                    u = u.join(",");
                    y[u] ? n = y[u].attr("id") : (A.id = n = a.uniqueKey(), y[u] = k = b.createElement(c).attr(A).add(b.defs), k.radAttr = e, k.stops = [], v(f, function(E) {
                        0 === E[1].indexOf("rgba") ? (r = a.color(E[1]), g = r.get("rgb"), x = r.get("a")) : (g = E[1], x = 1);
                        E = b.createElement("stop").attr({
                            offset: E[0],
                            "stop-color": g,
                            "stop-opacity": x
                        }).add(k);
                        k.stops.push(E)
                    }));
                    d = "url(" + b.url + "#" + n + ")";
                    m.setAttribute(H,
                        d);
                    m.gradient = u;
                    E.toString = function() {
                        return d
                    }
                }
            },
            applyTextOutline: function(a) {
                var E = this.element,
                    m, b, c, r; - 1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(E.style.fill)));
                this.fakeTS = !0;
                this.ySetter = this.xSetter;
                m = [].slice.call(E.getElementsByTagName("tspan"));
                a = a.split(" ");
                b = a[a.length - 1];
                (c = a[0]) && "none" !== c && (c = c.replace(/(^[\d\.]+)(.*?)$/g, function(a, E, m) {
                        return 2 * E + m
                    }), v(m, function(a) {
                        "highcharts-text-outline" === a.getAttribute("class") && e(m, E.removeChild(a))
                    }),
                    r = E.firstChild, v(m, function(a, m) {
                        0 === m && (a.setAttribute("x", E.getAttribute("x")), m = E.getAttribute("y"), a.setAttribute("y", m || 0), null === m && E.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        d(a, {
                            "class": "highcharts-text-outline",
                            fill: b,
                            stroke: b,
                            "stroke-width": c,
                            "stroke-linejoin": "round"
                        });
                        E.insertBefore(a, r)
                    }))
            },
            attr: function(a, H, b, c) {
                var E, r = this.element,
                    A, l = this,
                    e;
                "string" === typeof a && void 0 !== H && (E = a, a = {}, a[E] = H);
                if ("string" === typeof a) l = (this[a + "Getter"] || this._defaultGetter).call(this, a, r);
                else {
                    for (E in a) H =
                        a[E], e = !1, c || m(this, E), this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(E) && (A || (this.symbolAttr(a), A = !0), e = !0), !this.rotation || "x" !== E && "y" !== E || (this.doTransform = !0), e || (e = this[E + "Setter"] || this._defaultSetter, e.call(this, H, E, r), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(E) && this.updateShadows(E, H, e));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                b && b();
                return l
            },
            updateShadows: function(a, m, b) {
                for (var E = this.shadows, H = E.length; H--;) b.call(E[H],
                    "height" === a ? Math.max(m - (E[H].cutHeight || 0), 0) : "d" === a ? this.d : m, a, E[H])
            },
            addClass: function(a, m) {
                var E = this.attr("class") || ""; - 1 === E.indexOf(a) && (m || (a = (E + (E ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== d(this.element, "class").indexOf(a)
            },
            removeClass: function(a) {
                d(this.element, "class", (d(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function(a) {
                var E = this;
                v("x y r start end width height innerR anchorX anchorY".split(" "), function(m) {
                    E[m] =
                        J(a[m], E[m])
                });
                E.attr({
                    d: E.renderer.symbols[E.symbolName](E.x, E.y, E.width, E.height, E)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, m) {
                var E, H = {},
                    b;
                m = m || a.strokeWidth || 0;
                b = Math.round(m) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + b;
                a.y = Math.floor(a.y || this.y || 0) + b;
                a.width = Math.floor((a.width || this.width || 0) - 2 * b);
                a.height = Math.floor((a.height || this.height || 0) - 2 * b);
                p(a.strokeWidth) && (a.strokeWidth = m);
                for (E in a) this[E] !== a[E] && (this[E] = H[E] =
                    a[E]);
                return H
            },
            css: function(a) {
                var m = this.styles,
                    E = {},
                    b = this.element,
                    c, l, e = "";
                c = !m;
                a && a.color && (a.fill = a.color);
                if (m)
                    for (l in a) a[l] !== m[l] && (E[l] = a[l], c = !0);
                if (c) {
                    c = this.textWidth = a && a.width && "text" === b.nodeName.toLowerCase() && L(a.width) || this.textWidth;
                    m && (a = k(m, E));
                    this.styles = a;
                    c && !A && this.renderer.forExport && delete a.width;
                    if (r && !A) t(this.element, a);
                    else {
                        m = function(a, m) {
                            return "-" + m.toLowerCase()
                        };
                        for (l in a) e += l.replace(/([A-Z])/g, m) + ":" + a[l] + ";";
                        d(b, "style", e)
                    }
                    this.added && (c && this.renderer.buildText(this),
                        a && a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0
            },
            on: function(a, m) {
                var E = this,
                    H = E.element;
                b && "click" === a ? (H.ontouchstart = function(a) {
                    E.touchEventFired = Date.now();
                    a.preventDefault();
                    m.call(H, a)
                }, H.onclick = function(a) {
                    (-1 === R.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (E.touchEventFired || 0)) && m.call(H, a)
                }) : H["on" + a] = m;
                return this
            },
            setRadialReference: function(a) {
                var m = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                m && m.radAttr && m.animate(this.renderer.getRadialAttr(a, m.radAttr));
                return this
            },
            translate: function(a, m) {
                return this.attr({
                    translateX: a,
                    translateY: m
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    m = this.translateY || 0,
                    b = this.scaleX,
                    c = this.scaleY,
                    r = this.inverted,
                    l = this.rotation,
                    A = this.element;
                r && (a += this.attr("width"), m += this.attr("height"));
                a = ["translate(" + a + "," + m + ")"];
                r ? a.push("rotate(90) scale(-1,1)") :
                    l && a.push("rotate(" + l + " " + (A.getAttribute("x") || 0) + " " + (A.getAttribute("y") || 0) + ")");
                (p(b) || p(c)) && a.push("scale(" + J(b, 1) + " " + J(c, 1) + ")");
                a.length && A.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, m, b) {
                var E, c, H, r, l = {};
                c = this.renderer;
                H = c.alignedObjects;
                var A, y;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = m, !b || G(b)) this.alignTo = E = b || "renderer", e(H, this), H.push(this), b = null
                } else a = this.alignOptions, m = this.alignByTranslate,
                    E = this.alignTo;
                b = J(b, c[E], c);
                E = a.align;
                c = a.verticalAlign;
                H = (b.x || 0) + (a.x || 0);
                r = (b.y || 0) + (a.y || 0);
                "right" === E ? A = 1 : "center" === E && (A = 2);
                A && (H += (b.width - (a.width || 0)) / A);
                l[m ? "translateX" : "x"] = Math.round(H);
                "bottom" === c ? y = 1 : "middle" === c && (y = 2);
                y && (r += (b.height - (a.height || 0)) / y);
                l[m ? "translateY" : "y"] = Math.round(r);
                this[this.placed ? "animate" : "attr"](l);
                this.placed = !0;
                this.alignAttr = l;
                return this
            },
            getBBox: function(a, m) {
                var b, E = this.renderer,
                    c, H = this.element,
                    l = this.styles,
                    A, e = this.textStr,
                    y, g = E.cache,
                    x = E.cacheKeys,
                    n;
                m = J(m, this.rotation);
                c = m * f;
                A = l && l.fontSize;
                void 0 !== e && (n = e.toString(), -1 === n.indexOf("\x3c") && (n = n.replace(/[0-9]/g, "0")), n += ["", m || 0, A, H.style.width, H.style["text-overflow"]].join());
                n && !a && (b = g[n]);
                if (!b) {
                    if (H.namespaceURI === this.SVG_NS || E.forExport) {
                        try {
                            (y = this.fakeTS && function(a) {
                                v(H.querySelectorAll(".highcharts-text-outline"), function(m) {
                                    m.style.display = a
                                })
                            }) && y("none"), b = H.getBBox ? k({}, H.getBBox()) : {
                                width: H.offsetWidth,
                                height: H.offsetHeight
                            }, y && y("")
                        } catch (S) {}
                        if (!b || 0 > b.width) b = {
                            width: 0,
                            height: 0
                        }
                    } else b = this.htmlGetBBox();
                    E.isSVG && (a = b.width, E = b.height, r && l && "11px" === l.fontSize && "16.9" === E.toPrecision(3) && (b.height = E = 14), m && (b.width = Math.abs(E * Math.sin(c)) + Math.abs(a * Math.cos(c)), b.height = Math.abs(E * Math.cos(c)) + Math.abs(a * Math.sin(c))));
                    if (n && 0 < b.height) {
                        for (; 250 < x.length;) delete g[x.shift()];
                        g[n] || x.push(n);
                        g[n] = b
                    }
                }
                return b
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var m =
                    this;
                m.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        m.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var m = this.renderer,
                    b = this.element,
                    c;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && m.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) c = this.zIndexSetter();
                c || (a ? a.element : m.box).appendChild(b);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var m = a.parentNode;
                m && m.removeChild(a)
            },
            destroy: function() {
                var a = this.element || {},
                    b = this.renderer.isSVG &&
                    "SPAN" === a.nodeName && this.parentGroup,
                    c, r;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                m(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (r = 0; r < this.stops.length; r++) this.stops[r] = this.stops[r].destroy();
                    this.stops = null
                }
                this.safeRemoveChild(a);
                for (this.destroyShadows(); b && b.div && 0 === b.div.childNodes.length;) a = b.parentGroup, this.safeRemoveChild(b.div), delete b.div, b = a;
                this.alignTo && e(this.renderer.alignedObjects, this);
                for (c in this) delete this[c];
                return null
            },
            shadow: function(a, m, b) {
                var c = [],
                    r, l, E = this.element,
                    A, H, e, y;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    H = J(a.width, 3);
                    e = (a.opacity || .15) / H;
                    y = this.parentInverted ? "(-1,-1)" : "(" + J(a.offsetX, 1) + ", " + J(a.offsetY, 1) + ")";
                    for (r = 1; r <= H; r++) l = E.cloneNode(0), A = 2 * H + 1 - 2 * r, d(l, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": e * r,
                        "stroke-width": A,
                        transform: "translate" + y,
                        fill: "none"
                    }), b && (d(l, "height", Math.max(d(l, "height") - A, 0)), l.cutHeight = A), m ? m.element.appendChild(l) : E.parentNode.insertBefore(l,
                        E), c.push(l);
                    this.shadows = c
                }
                return this
            },
            destroyShadows: function() {
                v(this.shadows || [], function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = J(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, m, b) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                b.setAttribute(m,
                    a);
                this[m] = a
            },
            dashstyleSetter: function(a) {
                var m, b = this["stroke-width"];
                "inherit" === b && (b = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (m = a.length; m--;) a[m] = L(a[m]) * b;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function(a, m, b) {
                this[m] = a;
                b.setAttribute(m, a)
            },
            titleSetter: function(a) {
                var m = this.element.getElementsByTagName("title")[0];
                m || (m = w.createElementNS(this.SVG_NS, "title"), this.element.appendChild(m));
                m.firstChild && m.removeChild(m.firstChild);
                m.appendChild(w.createTextNode(String(J(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a,
                m, b) {
                "string" === typeof a ? b.setAttribute(m, a) : a && this.colorGradient(a, m, b)
            },
            visibilitySetter: function(a, m, b) {
                "inherit" === a ? b.removeAttribute(m) : b.setAttribute(m, a)
            },
            zIndexSetter: function(a, m) {
                var b = this.renderer,
                    c = this.parentGroup,
                    r = (c || b).element || b.box,
                    l, A = this.element,
                    e;
                l = this.added;
                var H;
                p(a) && (A.zIndex = a, a = +a, this[m] === a && (l = !1), this[m] = a);
                if (l) {
                    (a = this.zIndex) && c && (c.handleZ = !0);
                    m = r.childNodes;
                    for (H = 0; H < m.length && !e; H++) c = m[H], l = c.zIndex, c !== A && (L(l) > a || !p(a) && p(l) || 0 > a && !p(l) && r !== b.box) && (r.insertBefore(A,
                        c), e = !0);
                    e || r.appendChild(A)
                }
                return e
            },
            _defaultSetter: function(a, m, b) {
                b.setAttribute(m, a)
            }
        };
        z.prototype.yGetter = z.prototype.xGetter;
        z.prototype.translateXSetter = z.prototype.translateYSetter = z.prototype.rotationSetter = z.prototype.verticalAlignSetter = z.prototype.scaleXSetter = z.prototype.scaleYSetter = function(a, m) {
            this[m] = a;
            this.doTransform = !0
        };
        z.prototype["stroke-widthSetter"] = z.prototype.strokeSetter = function(a, m, b) {
            this[m] = a;
            this.stroke && this["stroke-width"] ? (z.prototype.fillSetter.call(this, this.stroke,
                "stroke", b), b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === m && 0 === a && this.hasStroke && (b.removeAttribute("stroke"), this.hasStroke = !1)
        };
        D = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        D.prototype = {
            Element: z,
            SVG_NS: P,
            init: function(a, m, b, c, r, l) {
                var A;
                c = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(c));
                A = c.element;
                a.appendChild(A); - 1 === a.innerHTML.indexOf("xmlns") && d(A, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = A;
                this.boxWrapper = c;
                this.alignedObjects = [];
                this.url = (u || I) && w.getElementsByTagName("base").length ? R.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(w.createTextNode("Created with Highmaps 5.0.6"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = l;
                this.forExport = r;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(m, b, !1);
                var e;
                u && a.getBoundingClientRect && (m = function() {
                    t(a, {
                        left: 0,
                        top: 0
                    });
                    e = a.getBoundingClientRect();
                    t(a, {
                        left: Math.ceil(e.left) - e.left + "px",
                        top: Math.ceil(e.top) - e.top + "px"
                    })
                }, m(), this.unSubPixelFix = C(R, "resize", m))
            },
            getStyle: function(a) {
                return this.style = k({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                n(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var m = new this.Element;
                m.init(this, a);
                return m
            },
            draw: x,
            getRadialAttr: function(a, m) {
                return {
                    cx: a[0] - a[2] / 2 + m.cx * a[2],
                    cy: a[1] - a[2] / 2 + m.cy * a[2],
                    r: m.r * a[2]
                }
            },
            buildText: function(a) {
                for (var m = a.element, b = this, r = b.forExport, l = J(a.textStr, "").toString(), e = -1 !== l.indexOf("\x3c"), y = m.childNodes, k, E, f, g, x = d(m, "x"), n = a.styles, u = a.textWidth, G = n &&
                        n.lineHeight, p = n && n.textOutline, F = n && "ellipsis" === n.textOverflow, I = y.length, h = u && !a.added && this.box, M = function(a) {
                            var c;
                            c = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : n && n.fontSize || b.style.fontSize || 12;
                            return G ? L(G) : b.fontMetrics(c, a.getAttribute("style") ? a : m).h
                        }; I--;) m.removeChild(y[I]);
                e || p || F || u || -1 !== l.indexOf(" ") ? (k = /<.*class="([^"]+)".*>/, E = /<.*style="([^"]+)".*>/, f = /<.*href="(http[^"]+)".*>/, h && h.appendChild(m), l = e ? l.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,
                    '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [l], l = c(l, function(a) {
                    return "" !== a
                }), v(l, function(c, l) {
                    var e, y = 0;
                    c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                    e = c.split("|||");
                    v(e, function(c) {
                        if ("" !== c || 1 === e.length) {
                            var H = {},
                                G = w.createElementNS(b.SVG_NS, "tspan"),
                                p, v;
                            k.test(c) && (p = c.match(k)[1], d(G, "class", p));
                            E.test(c) && (v = c.match(E)[1].replace(/(;| |^)color([ :])/,
                                "$1fill$2"), d(G, "style", v));
                            f.test(c) && !r && (d(G, "onclick", 'location.href\x3d"' + c.match(f)[1] + '"'), t(G, {
                                cursor: "pointer"
                            }));
                            c = (c.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                            if (" " !== c) {
                                G.appendChild(w.createTextNode(c));
                                y ? H.dx = 0 : l && null !== x && (H.x = x);
                                d(G, H);
                                m.appendChild(G);
                                !y && l && (!A && r && t(G, {
                                    display: "block"
                                }), d(G, "dy", M(G)));
                                if (u) {
                                    H = c.replace(/([^\^])-/g, "$1- ").split(" ");
                                    p = "nowrap" === n.whiteSpace;
                                    for (var I = 1 < e.length || l || 1 < H.length && !p, h, J, L = [], N = M(G), T = a.rotation,
                                            q = c, O = q.length;
                                        (I || F) && (H.length || L.length);) a.rotation = 0, h = a.getBBox(!0), J = h.width, !A && b.forExport && (J = b.measureSpanWidth(G.firstChild.data, a.styles)), h = J > u, void 0 === g && (g = h), F && g ? (O /= 2, "" === q || !h && .5 > O ? H = [] : (q = c.substring(0, q.length + (h ? -1 : 1) * Math.ceil(O)), H = [q + (3 < u ? "\u2026" : "")], G.removeChild(G.firstChild))) : h && 1 !== H.length ? (G.removeChild(G.firstChild), L.unshift(H.pop())) : (H = L, L = [], H.length && !p && (G = w.createElementNS(P, "tspan"), d(G, {
                                            dy: N,
                                            x: x
                                        }), v && d(G, "style", v), m.appendChild(G)), J > u && (u = J)), H.length &&
                                        G.appendChild(w.createTextNode(H.join(" ").replace(/- /g, "-")));
                                    a.rotation = T
                                }
                                y++
                            }
                        }
                    })
                }), g && a.attr("title", a.textStr), h && h.removeChild(m), p && a.applyTextOutline && a.applyTextOutline(p)) : m.appendChild(w.createTextNode(l.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            getContrast: function(a) {
                a = q(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, m, b, c, A, e, y, f, g) {
                var H = this.label(a, m, b, g, null, null, null, null, "button"),
                    E = 0;
                H.attr(l({
                    padding: 8,
                    r: 2
                }, A));
                var n, x, G, u;
                A = l({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, A);
                n = A.style;
                delete A.style;
                e = l(A, {
                    fill: "#e6e6e6"
                }, e);
                x = e.style;
                delete e.style;
                y = l(A, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, y);
                G = y.style;
                delete y.style;
                f = l(A, {
                    style: {
                        color: "#cccccc"
                    }
                }, f);
                u = f.style;
                delete f.style;
                C(H.element, r ? "mouseover" : "mouseenter", function() {
                    3 !== E && H.setState(1)
                });
                C(H.element, r ? "mouseout" : "mouseleave", function() {
                    3 !== E && H.setState(E)
                });
                H.setState = function(a) {
                    1 !== a &&
                        (H.state = E = a);
                    H.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    H.attr([A, e, y, f][a || 0]).css([n, x, G, u][a || 0])
                };
                H.attr(A).css(k({
                    cursor: "default"
                }, n));
                return H.on("click", function(a) {
                    3 !== E && c.call(H, a)
                })
            },
            crispLine: function(a, m) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - m % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + m % 2 / 2);
                return a
            },
            path: function(a) {
                var m = {
                    fill: "none"
                };
                F(a) ? m.d = a : y(a) && k(m, a);
                return this.createElement("path").attr(m)
            },
            circle: function(a, m, b) {
                a = y(a) ? a : {
                    x: a,
                    y: m,
                    r: b
                };
                m = this.createElement("circle");
                m.xSetter = m.ySetter = function(a, m, b) {
                    b.setAttribute("c" + m, a)
                };
                return m.attr(a)
            },
            arc: function(a, m, b, c, l, r) {
                y(a) && (m = a.y, b = a.r, c = a.innerR, l = a.start, r = a.end, a = a.x);
                a = this.symbol("arc", a || 0, m || 0, b || 0, b || 0, {
                    innerR: c || 0,
                    start: l || 0,
                    end: r || 0
                });
                a.r = b;
                return a
            },
            rect: function(a, m, b, c, l, r) {
                l = y(a) ? a.r : l;
                var A = this.createElement("rect");
                a = y(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: m,
                    width: Math.max(b, 0),
                    height: Math.max(c, 0)
                };
                void 0 !== r && (a.strokeWidth =
                    r, a = A.crisp(a));
                a.fill = "none";
                l && (a.r = l);
                A.rSetter = function(a, m, b) {
                    d(b, {
                        rx: a,
                        ry: a
                    })
                };
                return A.attr(a)
            },
            setSize: function(a, m, b) {
                var c = this.alignedObjects,
                    l = c.length;
                this.width = a;
                this.height = m;
                for (this.boxWrapper.animate({
                        width: a,
                        height: m
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: J(b, !0) ? void 0 : 0
                    }); l--;) c[l].align()
            },
            g: function(a) {
                var m = this.createElement("g");
                return a ? m.attr({
                    "class": "highcharts-" + a
                }) : m
            },
            image: function(a, m, b, c, l) {
                var r = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && k(r, {
                    x: m,
                    y: b,
                    width: c,
                    height: l
                });
                r = this.createElement("image").attr(r);
                r.element.setAttributeNS ? r.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : r.element.setAttribute("hc-svg-href", a);
                return r
            },
            symbol: function(a, m, b, c, l, r) {
                var A = this,
                    e, y = this.symbols[a],
                    H = p(m) && y && y(Math.round(m), Math.round(b), c, l, r),
                    f = /^url\((.*?)\)$/,
                    n, x;
                y ? (e = this.path(H), e.attr("fill", "none"), k(e, {
                    symbolName: a,
                    x: m,
                    y: b,
                    width: c,
                    height: l
                }), r && k(e, r)) : f.test(a) && (n = a.match(f)[1], e = this.image(n),
                    e.imgwidth = J(M[n] && M[n].width, r && r.width), e.imgheight = J(M[n] && M[n].height, r && r.height), x = function() {
                        e.attr({
                            width: e.width,
                            height: e.height
                        })
                    }, v(["width", "height"], function(a) {
                        e[a + "Setter"] = function(a, m) {
                            var b = {},
                                c = this["img" + m],
                                l = "width" === m ? "translateX" : "translateY";
                            this[m] = a;
                            p(c) && (this.element && this.element.setAttribute(m, c), this.alignByTranslate || (b[l] = ((this[m] || 0) - c) / 2, this.attr(b)))
                        }
                    }), p(m) && e.attr({
                        x: m,
                        y: b
                    }), e.isImg = !0, p(e.imgwidth) && p(e.imgheight) ? x() : (e.attr({
                        width: 0,
                        height: 0
                    }), g("img", {
                        onload: function() {
                            var a =
                                h[A.chartIndex];
                            0 === this.width && (t(this, {
                                position: "absolute",
                                top: "-999em"
                            }), w.body.appendChild(this));
                            M[n] = {
                                width: this.width,
                                height: this.height
                            };
                            e.imgwidth = this.width;
                            e.imgheight = this.height;
                            e.element && x();
                            this.parentNode && this.parentNode.removeChild(this);
                            A.imgCount--;
                            if (!A.imgCount && a && a.onload) a.onload()
                        },
                        src: n
                    }), this.imgCount++));
                return e
            },
            symbols: {
                circle: function(a, m, b, c) {
                    var l = .166 * b;
                    return ["M", a + b / 2, m, "C", a + b + l, m, a + b + l, m + c, a + b / 2, m + c, "C", a - l, m + c, a - l, m, a + b / 2, m, "Z"]
                },
                square: function(a, m, b, c) {
                    return ["M",
                        a, m, "L", a + b, m, a + b, m + c, a, m + c, "Z"
                    ]
                },
                triangle: function(a, m, b, c) {
                    return ["M", a + b / 2, m, "L", a + b, m + c, a, m + c, "Z"]
                },
                "triangle-down": function(a, m, b, c) {
                    return ["M", a, m, "L", a + b, m, a + b / 2, m + c, "Z"]
                },
                diamond: function(a, m, b, c) {
                    return ["M", a + b / 2, m, "L", a + b, m + c / 2, a + b / 2, m + c, a, m + c / 2, "Z"]
                },
                arc: function(a, m, b, c, l) {
                    var r = l.start;
                    b = l.r || b || c;
                    var A = l.end - .001;
                    c = l.innerR;
                    var e = l.open,
                        y = Math.cos(r),
                        k = Math.sin(r),
                        H = Math.cos(A),
                        A = Math.sin(A);
                    l = l.end - r < Math.PI ? 0 : 1;
                    return ["M", a + b * y, m + b * k, "A", b, b, 0, l, 1, a + b * H, m + b * A, e ? "M" : "L", a + c * H, m + c * A,
                        "A", c, c, 0, l, 0, a + c * y, m + c * k, e ? "" : "Z"
                    ]
                },
                callout: function(a, m, b, c, l) {
                    var r = Math.min(l && l.r || 0, b, c),
                        A = r + 6,
                        e = l && l.anchorX;
                    l = l && l.anchorY;
                    var y;
                    y = ["M", a + r, m, "L", a + b - r, m, "C", a + b, m, a + b, m, a + b, m + r, "L", a + b, m + c - r, "C", a + b, m + c, a + b, m + c, a + b - r, m + c, "L", a + r, m + c, "C", a, m + c, a, m + c, a, m + c - r, "L", a, m + r, "C", a, m, a, m, a + r, m];
                    e && e > b ? l > m + A && l < m + c - A ? y.splice(13, 3, "L", a + b, l - 6, a + b + 6, l, a + b, l + 6, a + b, m + c - r) : y.splice(13, 3, "L", a + b, c / 2, e, l, a + b, c / 2, a + b, m + c - r) : e && 0 > e ? l > m + A && l < m + c - A ? y.splice(33, 3, "L", a, l + 6, a - 6, l, a, l - 6, a, m + r) : y.splice(33, 3, "L",
                        a, c / 2, e, l, a, c / 2, a, m + r) : l && l > c && e > a + A && e < a + b - A ? y.splice(23, 3, "L", e + 6, m + c, e, m + c + 6, e - 6, m + c, a + r, m + c) : l && 0 > l && e > a + A && e < a + b - A && y.splice(3, 3, "L", e - 6, m, e, m - 6, e + 6, m, b - r, m);
                    return y
                }
            },
            clipRect: function(m, b, c, l) {
                var r = a.uniqueKey(),
                    e = this.createElement("clipPath").attr({
                        id: r
                    }).add(this.defs);
                m = this.rect(m, b, c, l, 0).add(e);
                m.id = r;
                m.clipPath = e;
                m.count = 0;
                return m
            },
            text: function(a, m, b, c) {
                var l = !A && this.forExport,
                    r = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(a, m, b);
                r.x = Math.round(m || 0);
                b && (r.y = Math.round(b));
                if (a || 0 === a) r.text = a;
                a = this.createElement("text").attr(r);
                l && a.css({
                    position: "absolute"
                });
                c || (a.xSetter = function(a, m, b) {
                    var c = b.getElementsByTagName("tspan"),
                        l, r = b.getAttribute(m),
                        e;
                    for (e = 0; e < c.length; e++) l = c[e], l.getAttribute(m) === r && l.setAttribute(m, a);
                    b.setAttribute(m, a)
                });
                return a
            },
            fontMetrics: function(a, m) {
                a = a || m && m.style && m.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? L(a) : /em/.test(a) ? parseFloat(a) * (m ? this.fontMetrics(null, m.parentNode).f : 16) : 12;
                m = 24 > a ? a + 3 : Math.round(1.2 *
                    a);
                return {
                    h: m,
                    b: Math.round(.8 * m),
                    f: a
                }
            },
            rotCorr: function(a, m, b) {
                var c = a;
                m && b && (c = Math.max(c * Math.cos(m * f), 4));
                return {
                    x: -a / 3 * Math.sin(m * f),
                    y: c
                }
            },
            label: function(a, m, b, c, r, e, A, y, f) {
                var n = this,
                    x = n.g("button" !== f && "label"),
                    g = x.text = n.text("", 0, 0, A).attr({
                        zIndex: 1
                    }),
                    G, u, H = 0,
                    d = 3,
                    F = 0,
                    I, h, J, M, w, L = {},
                    P, t, E = /^url\((.*?)\)$/.test(c),
                    q = E,
                    R, T, O, Q;
                f && x.addClass("highcharts-" + f);
                q = E;
                R = function() {
                    return (P || 0) % 2 / 2
                };
                T = function() {
                    var a = g.element.style,
                        m = {};
                    u = (void 0 === I || void 0 === h || w) && p(g.textStr) && g.getBBox();
                    x.width =
                        (I || u.width || 0) + 2 * d + F;
                    x.height = (h || u.height || 0) + 2 * d;
                    t = d + n.fontMetrics(a && a.fontSize, g).b;
                    q && (G || (x.box = G = n.symbols[c] || E ? n.symbol(c) : n.rect(), G.addClass(("button" === f ? "" : "highcharts-label-box") + (f ? " highcharts-" + f + "-box" : "")), G.add(x), a = R(), m.x = a, m.y = (y ? -t : 0) + a), m.width = Math.round(x.width), m.height = Math.round(x.height), G.attr(k(m, L)), L = {})
                };
                O = function() {
                    var a = F + d,
                        m;
                    m = y ? 0 : t;
                    p(I) && u && ("center" === w || "right" === w) && (a += {
                        center: .5,
                        right: 1
                    }[w] * (I - u.width));
                    if (a !== g.x || m !== g.y) g.attr("x", a), void 0 !== m && g.attr("y",
                        m);
                    g.x = a;
                    g.y = m
                };
                Q = function(a, m) {
                    G ? G.attr(a, m) : L[a] = m
                };
                x.onAdd = function() {
                    g.add(x);
                    x.attr({
                        text: a || 0 === a ? a : "",
                        x: m,
                        y: b
                    });
                    G && p(r) && x.attr({
                        anchorX: r,
                        anchorY: e
                    })
                };
                x.widthSetter = function(a) {
                    I = a
                };
                x.heightSetter = function(a) {
                    h = a
                };
                x["text-alignSetter"] = function(a) {
                    w = a
                };
                x.paddingSetter = function(a) {
                    p(a) && a !== d && (d = x.padding = a, O())
                };
                x.paddingLeftSetter = function(a) {
                    p(a) && a !== F && (F = a, O())
                };
                x.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== H && (H = a, u && x.attr({
                        x: J
                    }))
                };
                x.textSetter = function(a) {
                    void 0 !==
                        a && g.textSetter(a);
                    T();
                    O()
                };
                x["stroke-widthSetter"] = function(a, m) {
                    a && (q = !0);
                    P = this["stroke-width"] = a;
                    Q(m, a)
                };
                x.strokeSetter = x.fillSetter = x.rSetter = function(a, m) {
                    "fill" === m && a && (q = !0);
                    Q(m, a)
                };
                x.anchorXSetter = function(a, m) {
                    r = a;
                    Q(m, Math.round(a) - R() - J)
                };
                x.anchorYSetter = function(a, m) {
                    e = a;
                    Q(m, a - M)
                };
                x.xSetter = function(a) {
                    x.x = a;
                    H && (a -= H * ((I || u.width) + 2 * d));
                    J = Math.round(a);
                    x.attr("translateX", J)
                };
                x.ySetter = function(a) {
                    M = x.y = Math.round(a);
                    x.attr("translateY", M)
                };
                var B = x.css;
                return k(x, {
                    css: function(a) {
                        if (a) {
                            var m = {};
                            a = l(a);
                            v(x.textProps, function(b) {
                                void 0 !== a[b] && (m[b] = a[b], delete a[b])
                            });
                            g.css(m)
                        }
                        return B.call(x, a)
                    },
                    getBBox: function() {
                        return {
                            width: u.width + 2 * d,
                            height: u.height + 2 * d,
                            x: u.x - d,
                            y: u.y - d
                        }
                    },
                    shadow: function(a) {
                        a && (T(), G && G.shadow(a));
                        return x
                    },
                    destroy: function() {
                        N(x.element, "mouseenter");
                        N(x.element, "mouseleave");
                        g && (g = g.destroy());
                        G && (G = G.destroy());
                        z.prototype.destroy.call(x);
                        x = n = T = O = Q = null
                    }
                })
            }
        };
        a.Renderer = D
    })(K);
    (function(a) {
        var z = a.attr,
            D = a.createElement,
            C = a.css,
            B = a.defined,
            d = a.each,
            h = a.extend,
            q =
            a.isFirefox,
            t = a.isMS,
            g = a.isWebKit,
            p = a.pInt,
            f = a.SVGRenderer,
            n = a.win,
            w = a.wrap;
        h(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var k = this.element;
                if (k = a && "SPAN" === k.tagName && a.width) delete a.width, this.textWidth = k, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = h(this.styles, a);
                C(this.element, a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        k = this.element,
                        e = this.translateX || 0,
                        c = this.translateY || 0,
                        b = this.x || 0,
                        f = this.y || 0,
                        n = this.textAlign || "left",
                        r = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[n],
                        y = this.styles;
                    C(k, {
                        marginLeft: e,
                        marginTop: c
                    });
                    this.shadows && d(this.shadows, function(a) {
                        C(a, {
                            marginLeft: e + 1,
                            marginTop: c + 1
                        })
                    });
                    this.inverted && d(k.childNodes, function(b) {
                        a.invertChild(b, k)
                    });
                    if ("SPAN" === k.tagName) {
                        var G = this.rotation,
                            I = p(this.textWidth),
                            l = y && y.whiteSpace,
                            x = [G,
                                n, k.innerHTML, this.textWidth, this.textAlign
                            ].join();
                        x !== this.cTT && (y = a.fontMetrics(k.style.fontSize).b, B(G) && this.setSpanRotation(G, r, y), C(k, {
                            width: "",
                            whiteSpace: l || "nowrap"
                        }), k.offsetWidth > I && /[ \-]/.test(k.textContent || k.innerText) && C(k, {
                            width: I + "px",
                            display: "block",
                            whiteSpace: l || "normal"
                        }), this.getSpanCorrection(k.offsetWidth, y, r, G, n));
                        C(k, {
                            left: b + (this.xCorr || 0) + "px",
                            top: f + (this.yCorr || 0) + "px"
                        });
                        g && (y = k.offsetHeight);
                        this.cTT = x
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, k, e) {
                var c = {},
                    b = t ? "-ms-transform" : g ? "-webkit-transform" : q ? "MozTransform" : n.opera ? "-o-transform" : "";
                c[b] = c.transform = "rotate(" + a + "deg)";
                c[b + (q ? "Origin" : "-origin")] = c.transformOrigin = 100 * k + "% " + e + "px";
                C(this.element, c)
            },
            getSpanCorrection: function(a, k, e) {
                this.xCorr = -a * e;
                this.yCorr = -k
            }
        });
        h(f.prototype, {
            html: function(a, k, e) {
                var c = this.createElement("span"),
                    b = c.element,
                    n = c.renderer,
                    f = n.isSVG,
                    r = function(a, b) {
                        d(["opacity", "visibility"], function(c) {
                            w(a, c + "Setter", function(a, c, r, e) {
                                a.call(this, c, r, e);
                                b[r] = c
                            })
                        })
                    };
                c.textSetter =
                    function(a) {
                        a !== b.innerHTML && delete this.bBox;
                        b.innerHTML = this.textStr = a;
                        c.htmlUpdateTransform()
                    };
                f && r(c, c.element.style);
                c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function(a, b) {
                    "align" === b && (b = "textAlign");
                    c[b] = a;
                    c.htmlUpdateTransform()
                };
                c.attr({
                    text: a,
                    x: Math.round(k),
                    y: Math.round(e)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                b.style.whiteSpace = "nowrap";
                c.css = c.htmlCss;
                f && (c.add = function(a) {
                    var e, y = n.box.parentNode,
                        l = [];
                    if (this.parentGroup =
                        a) {
                        if (e = a.div, !e) {
                            for (; a;) l.push(a), a = a.parentGroup;
                            d(l.reverse(), function(a) {
                                var b, k = z(a.element, "class");
                                k && (k = {
                                    className: k
                                });
                                e = a.div = a.div || D("div", k, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, e || y);
                                b = e.style;
                                h(a, {
                                    on: function() {
                                        c.on.apply({
                                            element: l[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: function(c, m) {
                                        b.left = c + "px";
                                        a[m] = c;
                                        a.doTransform = !0
                                    },
                                    translateYSetter: function(c, m) {
                                        b.top =
                                            c + "px";
                                        a[m] = c;
                                        a.doTransform = !0
                                    }
                                });
                                r(a, b)
                            })
                        }
                    } else e = y;
                    e.appendChild(b);
                    c.added = !0;
                    c.alignOnAdd && c.htmlUpdateTransform();
                    return c
                });
                return c
            }
        })
    })(K);
    (function(a) {
        var z, D, C = a.createElement,
            B = a.css,
            d = a.defined,
            h = a.deg2rad,
            q = a.discardElement,
            t = a.doc,
            g = a.each,
            p = a.erase,
            f = a.extend;
        z = a.extendClass;
        var n = a.isArray,
            w = a.isNumber,
            v = a.isObject,
            k = a.merge;
        D = a.noop;
        var e = a.pick,
            c = a.pInt,
            b = a.SVGElement,
            F = a.SVGRenderer,
            u = a.win;
        a.svg || (D = {
                docMode8: t && 8 === t.documentMode,
                init: function(a, b) {
                    var c = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
                        r = ["position: ", "absolute", ";"],
                        l = "div" === b;
                    ("shape" === b || l) && r.push("left:0;top:0;width:1px;height:1px;");
                    r.push("visibility: ", l ? "hidden" : "visible");
                    c.push(' style\x3d"', r.join(""), '"/\x3e');
                    b && (c = l || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = C(c));
                    this.renderer = a
                },
                add: function(a) {
                    var b = this.renderer,
                        c = this.element,
                        r = b.box,
                        l = a && a.inverted,
                        r = a ? a.element || a : r;
                    a && (this.parentGroup = a);
                    l && b.invertChild(c, r);
                    r.appendChild(c);
                    this.added = !0;
                    this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                    if (this.onAdd) this.onAdd();
                    this.className && this.attr("class", this.className);
                    return this
                },
                updateTransform: b.prototype.htmlUpdateTransform,
                setSpanRotation: function() {
                    var a = this.rotation,
                        b = Math.cos(a * h),
                        c = Math.sin(a * h);
                    B(this.element, {
                        filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none"
                    })
                },
                getSpanCorrection: function(a, b, c, k, l) {
                    var r = k ? Math.cos(k * h) : 1,
                        y = k ? Math.sin(k * h) : 0,
                        n = e(this.elemHeight, this.element.offsetHeight),
                        f;
                    this.xCorr = 0 > r && -a;
                    this.yCorr = 0 > y && -n;
                    f = 0 > r * y;
                    this.xCorr += y * b * (f ? 1 - c : c);
                    this.yCorr -= r * b * (k ? f ? c : 1 - c : 1);
                    l && "left" !== l && (this.xCorr -= a * c * (0 > r ? -1 : 1), k && (this.yCorr -= n * c * (0 > y ? -1 : 1)), B(this.element, {
                        textAlign: l
                    }))
                },
                pathToVML: function(a) {
                    for (var b = a.length, c = []; b--;) w(a[b]) ? c[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                    return c.join(" ") || "x"
                },
                clip: function(a) {
                    var b =
                        this,
                        c;
                    a ? (c = a.members, p(c, b), c.push(b), b.destroyClip = function() {
                        p(c, b)
                    }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                        clip: b.docMode8 ? "inherit" : "rect(auto)"
                    });
                    return b.css(a)
                },
                css: b.prototype.htmlCss,
                safeRemoveChild: function(a) {
                    a.parentNode && q(a)
                },
                destroy: function() {
                    this.destroyClip && this.destroyClip();
                    return b.prototype.destroy.apply(this)
                },
                on: function(a, b) {
                    this.element["on" + a] = function() {
                        var a = u.event;
                        a.target = a.srcElement;
                        b(a)
                    };
                    return this
                },
                cutOffPath: function(a, b) {
                    var e;
                    a = a.split(/[ ,]/);
                    e = a.length;
                    if (9 === e || 11 === e) a[e - 4] = a[e - 2] = c(a[e - 2]) - 10 * b;
                    return a.join(" ")
                },
                shadow: function(a, b, k) {
                    var r = [],
                        l, y = this.element,
                        f = this.renderer,
                        n, g = y.style,
                        m, A = y.path,
                        u, d, p, G;
                    A && "string" !== typeof A.value && (A = "x");
                    d = A;
                    if (a) {
                        p = e(a.width, 3);
                        G = (a.opacity || .15) / p;
                        for (l = 1; 3 >= l; l++) u = 2 * p + 1 - 2 * l, k && (d = this.cutOffPath(A.value, u + .5)), m = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', u, '" filled\x3d"false" path\x3d"', d, '" coordsize\x3d"10 10" style\x3d"', y.style.cssText, '" /\x3e'], n = C(f.prepVML(m), null, {
                            left: c(g.left) +
                                e(a.offsetX, 1),
                            top: c(g.top) + e(a.offsetY, 1)
                        }), k && (n.cutOff = u + 1), m = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', G * l, '"/\x3e'], C(f.prepVML(m), null, null, n), b ? b.element.appendChild(n) : y.parentNode.insertBefore(n, y), r.push(n);
                        this.shadows = r
                    }
                    return this
                },
                updateShadows: D,
                setAttr: function(a, b) {
                    this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
                },
                classSetter: function(a) {
                    (this.added ? this.element : this).className = a
                },
                dashstyleSetter: function(a, b, c) {
                    (c.getElementsByTagName("stroke")[0] ||
                        C(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] = a || "solid";
                    this[b] = a
                },
                dSetter: function(a, b, c) {
                    var e = this.shadows;
                    a = a || [];
                    this.d = a.join && a.join(" ");
                    c.path = a = this.pathToVML(a);
                    if (e)
                        for (c = e.length; c--;) e[c].path = e[c].cutOff ? this.cutOffPath(a, e[c].cutOff) : a;
                    this.setAttr(b, a)
                },
                fillSetter: function(a, b, c) {
                    var e = c.nodeName;
                    "SPAN" === e ? c.style.color = a : "IMG" !== e && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
                },
                "fill-opacitySetter": function(a, b, c) {
                    C(this.renderer.prepVML(["\x3c",
                        b.split("-")[0], ' opacity\x3d"', a, '"/\x3e'
                    ]), null, null, c)
                },
                opacitySetter: D,
                rotationSetter: function(a, b, c) {
                    c = c.style;
                    this[b] = c[b] = a;
                    c.left = -Math.round(Math.sin(a * h) + 1) + "px";
                    c.top = Math.round(Math.cos(a * h)) + "px"
                },
                strokeSetter: function(a, b, c) {
                    this.setAttr("strokecolor", this.renderer.color(a, c, b, this))
                },
                "stroke-widthSetter": function(a, b, c) {
                    c.stroked = !!a;
                    this[b] = a;
                    w(a) && (a += "px");
                    this.setAttr("strokeweight", a)
                },
                titleSetter: function(a, b) {
                    this.setAttr(b, a)
                },
                visibilitySetter: function(a, b, c) {
                    "inherit" === a &&
                        (a = "visible");
                    this.shadows && g(this.shadows, function(c) {
                        c.style[b] = a
                    });
                    "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");
                    c.style[b] = a
                },
                xSetter: function(a, b, c) {
                    this[b] = a;
                    "x" === b ? b = "left" : "y" === b && (b = "top");
                    this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
                },
                zIndexSetter: function(a, b, c) {
                    c.style[b] = a
                }
            }, D["stroke-opacitySetter"] = D["fill-opacitySetter"], a.VMLElement = D = z(b, D), D.prototype.ySetter = D.prototype.widthSetter = D.prototype.heightSetter =
            D.prototype.xSetter, D = {
                Element: D,
                isIE8: -1 < u.navigator.userAgent.indexOf("MSIE 8.0"),
                init: function(a, b, c) {
                    var e, l;
                    this.alignedObjects = [];
                    e = this.createElement("div").css({
                        position: "relative"
                    });
                    l = e.element;
                    a.appendChild(e.element);
                    this.isVML = !0;
                    this.box = l;
                    this.boxWrapper = e;
                    this.gradients = {};
                    this.cache = {};
                    this.cacheKeys = [];
                    this.imgCount = 0;
                    this.setSize(b, c, !1);
                    if (!t.namespaces.hcv) {
                        t.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                        try {
                            t.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        } catch (x) {
                            t.styleSheets[0].cssText +=
                                "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        }
                    }
                },
                isHidden: function() {
                    return !this.box.offsetWidth
                },
                clipRect: function(a, b, c, e) {
                    var l = this.createElement(),
                        r = v(a);
                    return f(l, {
                        members: [],
                        count: 0,
                        left: (r ? a.x : a) + 1,
                        top: (r ? a.y : b) + 1,
                        width: (r ? a.width : c) - 1,
                        height: (r ? a.height : e) - 1,
                        getCSS: function(a) {
                            var b = a.element,
                                c = b.nodeName,
                                m = a.inverted,
                                l = this.top - ("shape" === c ? b.offsetTop : 0),
                                e = this.left,
                                b = e + this.width,
                                r = l + this.height,
                                l = {
                                    clip: "rect(" + Math.round(m ?
                                        e : l) + "px," + Math.round(m ? r : b) + "px," + Math.round(m ? b : r) + "px," + Math.round(m ? l : e) + "px)"
                                };
                            !m && a.docMode8 && "DIV" === c && f(l, {
                                width: b + "px",
                                height: r + "px"
                            });
                            return l
                        },
                        updateClipping: function() {
                            g(l.members, function(a) {
                                a.element && a.css(l.getCSS(a))
                            })
                        }
                    })
                },
                color: function(b, c, e, k) {
                    var l = this,
                        r, n = /^rgba/,
                        f, y, m = "none";
                    b && b.linearGradient ? y = "gradient" : b && b.radialGradient && (y = "pattern");
                    if (y) {
                        var A, u, d = b.linearGradient || b.radialGradient,
                            p, F, H, h, v, w = "";
                        b = b.stops;
                        var G, I = [],
                            t = function() {
                                f = ['\x3cfill colors\x3d"' + I.join(",") +
                                    '" opacity\x3d"', H, '" o:opacity2\x3d"', F, '" type\x3d"', y, '" ', w, 'focus\x3d"100%" method\x3d"any" /\x3e'
                                ];
                                C(l.prepVML(f), null, null, c)
                            };
                        p = b[0];
                        G = b[b.length - 1];
                        0 < p[0] && b.unshift([0, p[1]]);
                        1 > G[0] && b.push([1, G[1]]);
                        g(b, function(m, b) {
                            n.test(m[1]) ? (r = a.color(m[1]), A = r.get("rgb"), u = r.get("a")) : (A = m[1], u = 1);
                            I.push(100 * m[0] + "% " + A);
                            b ? (H = u, h = A) : (F = u, v = A)
                        });
                        if ("fill" === e)
                            if ("gradient" === y) e = d.x1 || d[0] || 0, b = d.y1 || d[1] || 0, p = d.x2 || d[2] || 0, d = d.y2 || d[3] || 0, w = 'angle\x3d"' + (90 - 180 * Math.atan((d - b) / (p - e)) / Math.PI) + '"',
                                t();
                            else {
                                var m = d.r,
                                    q = 2 * m,
                                    B = 2 * m,
                                    z = d.cx,
                                    D = d.cy,
                                    K = c.radialReference,
                                    S, m = function() {
                                        K && (S = k.getBBox(), z += (K[0] - S.x) / S.width - .5, D += (K[1] - S.y) / S.height - .5, q *= K[2] / S.width, B *= K[2] / S.height);
                                        w = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + q + "," + B + '" origin\x3d"0.5,0.5" position\x3d"' + z + "," + D + '" color2\x3d"' + v + '" ';
                                        t()
                                    };
                                k.added ? m() : k.onAdd = m;
                                m = h
                            }
                        else m = A
                    } else n.test(b) && "IMG" !== c.tagName ? (r = a.color(b), k[e + "-opacitySetter"](r.get("a"), e, c), m = r.get("rgb")) : (m = c.getElementsByTagName(e),
                        m.length && (m[0].opacity = 1, m[0].type = "solid"), m = b);
                    return m
                },
                prepVML: function(a) {
                    var b = this.isIE8;
                    a = a.join("");
                    b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
                    return a
                },
                text: F.prototype.html,
                path: function(a) {
                    var b = {
                        coordsize: "10 10"
                    };
                    n(a) ? b.d =
                        a : v(a) && f(b, a);
                    return this.createElement("shape").attr(b)
                },
                circle: function(a, b, c) {
                    var e = this.symbol("circle");
                    v(a) && (c = a.r, b = a.y, a = a.x);
                    e.isCircle = !0;
                    e.r = c;
                    return e.attr({
                        x: a,
                        y: b
                    })
                },
                g: function(a) {
                    var b;
                    a && (b = {
                        className: "highcharts-" + a,
                        "class": "highcharts-" + a
                    });
                    return this.createElement("div").attr(b)
                },
                image: function(a, b, c, e, l) {
                    var k = this.createElement("img").attr({
                        src: a
                    });
                    1 < arguments.length && k.attr({
                        x: b,
                        y: c,
                        width: e,
                        height: l
                    });
                    return k
                },
                createElement: function(a) {
                    return "rect" === a ? this.symbol(a) : F.prototype.createElement.call(this,
                        a)
                },
                invertChild: function(a, b) {
                    var e = this;
                    b = b.style;
                    var k = "IMG" === a.tagName && a.style;
                    B(a, {
                        flip: "x",
                        left: c(b.width) - (k ? c(k.top) : 1),
                        top: c(b.height) - (k ? c(k.left) : 1),
                        rotation: -90
                    });
                    g(a.childNodes, function(b) {
                        e.invertChild(b, a)
                    })
                },
                symbols: {
                    arc: function(a, b, c, e, l) {
                        var k = l.start,
                            r = l.end,
                            n = l.r || c || e;
                        c = l.innerR;
                        e = Math.cos(k);
                        var f = Math.sin(k),
                            m = Math.cos(r),
                            A = Math.sin(r);
                        if (0 === r - k) return ["x"];
                        k = ["wa", a - n, b - n, a + n, b + n, a + n * e, b + n * f, a + n * m, b + n * A];
                        l.open && !c && k.push("e", "M", a, b);
                        k.push("at", a - c, b - c, a + c, b + c, a + c * m,
                            b + c * A, a + c * e, b + c * f, "x", "e");
                        k.isArc = !0;
                        return k
                    },
                    circle: function(a, b, c, e, l) {
                        l && d(l.r) && (c = e = 2 * l.r);
                        l && l.isCircle && (a -= c / 2, b -= e / 2);
                        return ["wa", a, b, a + c, b + e, a + c, b + e / 2, a + c, b + e / 2, "e"]
                    },
                    rect: function(a, b, c, e, l) {
                        return F.prototype.symbols[d(l) && l.r ? "callout" : "square"].call(0, a, b, c, e, l)
                    }
                }
            }, a.VMLRenderer = z = function() {
                this.init.apply(this, arguments)
            }, z.prototype = k(F.prototype, D), a.Renderer = z);
        F.prototype.measureSpanWidth = function(a, b) {
            var c = t.createElement("span");
            a = t.createTextNode(a);
            c.appendChild(a);
            B(c,
                b);
            this.box.appendChild(c);
            b = c.offsetWidth;
            q(c);
            return b
        }
    })(K);
    (function(a) {
        var z = a.correctFloat,
            D = a.defined,
            C = a.destroyObjectProperties,
            B = a.isNumber,
            d = a.merge,
            h = a.pick,
            q = a.deg2rad;
        a.Tick = function(a, g, d, f) {
            this.axis = a;
            this.pos = g;
            this.type = d || "";
            this.isNew = !0;
            d || f || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    g = a.options,
                    p = a.chart,
                    f = a.categories,
                    n = a.names,
                    w = this.pos,
                    v = g.labels,
                    k = a.tickPositions,
                    e = w === k[0],
                    c = w === k[k.length - 1],
                    n = f ? h(f[w], n[w], w) : w,
                    f = this.label,
                    k = k.info,
                    b;
                a.isDatetimeAxis &&
                    k && (b = g.dateTimeLabelFormats[k.higherRanks[w] || k.unitName]);
                this.isFirst = e;
                this.isLast = c;
                g = a.labelFormatter.call({
                    axis: a,
                    chart: p,
                    isFirst: e,
                    isLast: c,
                    dateTimeLabelFormat: b,
                    value: a.isLog ? z(a.lin2log(n)) : n
                });
                D(f) ? f && f.attr({
                    text: g
                }) : (this.labelLength = (this.label = f = D(g) && v.enabled ? p.renderer.text(g, 0, 0, v.useHTML).css(d(v.style)).add(a.labelGroup) : null) && f.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var g =
                    this.axis,
                    d = a.x,
                    f = g.chart.chartWidth,
                    n = g.chart.spacing,
                    w = h(g.labelLeft, Math.min(g.pos, n[3])),
                    n = h(g.labelRight, Math.max(g.pos + g.len, f - n[1])),
                    v = this.label,
                    k = this.rotation,
                    e = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[g.labelAlign],
                    c = v.getBBox().width,
                    b = g.getSlotWidth(),
                    F = b,
                    u = 1,
                    r, y = {};
                if (k) 0 > k && d - e * c < w ? r = Math.round(d / Math.cos(k * q) - w) : 0 < k && d + e * c > n && (r = Math.round((f - d) / Math.cos(k * q)));
                else if (f = d + (1 - e) * c, d - e * c < w ? F = a.x + F * (1 - e) - w : f > n && (F = n - a.x + F * e, u = -1), F = Math.min(b, F), F < b && "center" === g.labelAlign && (a.x += u * (b - F - e * (b - Math.min(c,
                        F)))), c > F || g.autoRotation && (v.styles || {}).width) r = F;
                r && (y.width = r, (g.options.labels.style || {}).textOverflow || (y.textOverflow = "ellipsis"), v.css(y))
            },
            getPosition: function(a, g, d, f) {
                var n = this.axis,
                    p = n.chart,
                    h = f && p.oldChartHeight || p.chartHeight;
                return {
                    x: a ? n.translate(g + d, null, null, f) + n.transB : n.left + n.offset + (n.opposite ? (f && p.oldChartWidth || p.chartWidth) - n.right - n.left : 0),
                    y: a ? h - n.bottom + n.offset - (n.opposite ? n.height : 0) : h - n.translate(g + d, null, null, f) - n.transB
                }
            },
            getLabelPosition: function(a, g, d, f, n, h, v,
                k) {
                var e = this.axis,
                    c = e.transA,
                    b = e.reversed,
                    p = e.staggerLines,
                    u = e.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    r = n.y;
                D(r) || (r = 0 === e.side ? d.rotation ? -8 : -d.getBBox().height : 2 === e.side ? u.y + 8 : Math.cos(d.rotation * q) * (u.y - d.getBBox(!1, 0).height / 2));
                a = a + n.x + u.x - (h && f ? h * c * (b ? -1 : 1) : 0);
                g = g + r - (h && !f ? h * c * (b ? 1 : -1) : 0);
                p && (d = v / (k || 1) % p, e.opposite && (d = p - d - 1), g += e.labelOffset / p * d);
                return {
                    x: a,
                    y: Math.round(g)
                }
            },
            getMarkPath: function(a, g, d, f, n, h) {
                return h.crispLine(["M", a, g, "L", a + (n ? 0 : -d), g + (n ? d : 0)], f)
            },
            render: function(a, g, d) {
                var f = this.axis,
                    n = f.options,
                    p = f.chart.renderer,
                    v = f.horiz,
                    k = this.type,
                    e = this.label,
                    c = this.pos,
                    b = n.labels,
                    F = this.gridLine,
                    u = k ? k + "Tick" : "tick",
                    r = f.tickSize(u),
                    y = this.mark,
                    G = !y,
                    I = b.step,
                    l = {},
                    x = !0,
                    J = f.tickmarkOffset,
                    L = this.getPosition(v, c, J, g),
                    q = L.x,
                    L = L.y,
                    m = v && q === f.pos + f.len || !v && L === f.pos ? -1 : 1,
                    A = k ? k + "Grid" : "grid",
                    P = n[A + "LineWidth"],
                    M = n[A + "LineColor"],
                    t = n[A + "LineDashStyle"],
                    A = h(n[u + "Width"], !k && f.isXAxis ? 1 : 0),
                    u = n[u + "Color"];
                d = h(d, 1);
                this.isActive = !0;
                F || (l.stroke = M, l["stroke-width"] = P, t && (l.dashstyle = t), k || (l.zIndex =
                    1), g && (l.opacity = 0), this.gridLine = F = p.path().attr(l).addClass("highcharts-" + (k ? k + "-" : "") + "grid-line").add(f.gridGroup));
                if (!g && F && (c = f.getPlotLinePath(c + J, F.strokeWidth() * m, g, !0))) F[this.isNew ? "attr" : "animate"]({
                    d: c,
                    opacity: d
                });
                r && (f.opposite && (r[0] = -r[0]), G && (this.mark = y = p.path().addClass("highcharts-" + (k ? k + "-" : "") + "tick").add(f.axisGroup), y.attr({
                    stroke: u,
                    "stroke-width": A
                })), y[G ? "attr" : "animate"]({
                    d: this.getMarkPath(q, L, r[0], y.strokeWidth() * m, v, p),
                    opacity: d
                }));
                e && B(q) && (e.xy = L = this.getLabelPosition(q,
                    L, e, v, b, J, a, I), this.isFirst && !this.isLast && !h(n.showFirstLabel, 1) || this.isLast && !this.isFirst && !h(n.showLastLabel, 1) ? x = !1 : !v || f.isRadial || b.step || b.rotation || g || 0 === d || this.handleOverflow(L), I && a % I && (x = !1), x && B(L.y) ? (L.opacity = d, e[this.isNew ? "attr" : "animate"](L)) : e.attr("y", -9999), this.isNew = !1)
            },
            destroy: function() {
                C(this, this.axis)
            }
        }
    })(K);
    (function(a) {
        var z = a.arrayMax,
            D = a.arrayMin,
            C = a.defined,
            B = a.destroyObjectProperties,
            d = a.each,
            h = a.erase,
            q = a.merge,
            t = a.pick;
        a.PlotLineOrBand = function(a, d) {
            this.axis =
                a;
            d && (this.options = d, this.id = d.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var a = this,
                    d = a.axis,
                    f = d.horiz,
                    n = a.options,
                    h = n.label,
                    v = a.label,
                    k = n.to,
                    e = n.from,
                    c = n.value,
                    b = C(e) && C(k),
                    F = C(c),
                    u = a.svgElem,
                    r = !u,
                    y = [],
                    G, I = n.color,
                    l = t(n.zIndex, 0),
                    x = n.events,
                    y = {
                        "class": "highcharts-plot-" + (b ? "band " : "line ") + (n.className || "")
                    },
                    J = {},
                    L = d.chart.renderer,
                    N = b ? "bands" : "lines",
                    m = d.log2lin;
                d.isLog && (e = m(e), k = m(k), c = m(c));
                F ? (y = {
                    stroke: I,
                    "stroke-width": n.width
                }, n.dashStyle && (y.dashstyle = n.dashStyle)) : b && (I && (y.fill =
                    I), n.borderWidth && (y.stroke = n.borderColor, y["stroke-width"] = n.borderWidth));
                J.zIndex = l;
                N += "-" + l;
                (I = d[N]) || (d[N] = I = L.g("plot-" + N).attr(J).add());
                r && (a.svgElem = u = L.path().attr(y).add(I));
                if (F) y = d.getPlotLinePath(c, u.strokeWidth());
                else if (b) y = d.getPlotBandPath(e, k, n);
                else return;
                if (r && y && y.length) {
                    if (u.attr({
                            d: y
                        }), x)
                        for (G in n = function(b) {
                                u.on(b, function(m) {
                                    x[b].apply(a, [m])
                                })
                            }, x) n(G)
                } else u && (y ? (u.show(), u.animate({
                    d: y
                })) : (u.hide(), v && (a.label = v = v.destroy())));
                h && C(h.text) && y && y.length && 0 < d.width &&
                    0 < d.height && !y.flat ? (h = q({
                        align: f && b && "center",
                        x: f ? !b && 4 : 10,
                        verticalAlign: !f && b && "middle",
                        y: f ? b ? 16 : 10 : b ? 6 : -4,
                        rotation: f && !b && 90
                    }, h), this.renderLabel(h, y, b, l)) : v && v.hide();
                return a
            },
            renderLabel: function(a, d, f, n) {
                var g = this.label,
                    h = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = n, this.label = g = h.text(a.text, 0, 0, a.useHTML).attr(g).add(), g.css(a.style));
                n = [d[1], d[4], f ? d[6] : d[1]];
                d = [d[2], d[5],
                    f ? d[7] : d[2]
                ];
                f = D(n);
                h = D(d);
                g.align(a, !1, {
                    x: f,
                    y: h,
                    width: z(n) - f,
                    height: z(d) - h
                });
                g.show()
            },
            destroy: function() {
                h(this.axis.plotLinesAndBands, this);
                delete this.axis;
                B(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function(a, d) {
                d = this.getPlotLinePath(d, null, null, !0);
                (a = this.getPlotLinePath(a, null, null, !0)) && d ? (a.flat = a.toString() === d.toString(), a.push(d[4], d[5], d[1], d[2], "z")) : a = null;
                return a
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a,
                    "plotLines")
            },
            addPlotBandOrLine: function(d, h) {
                var f = (new a.PlotLineOrBand(this, d)).render(),
                    n = this.userOptions;
                f && (h && (n[h] = n[h] || [], n[h].push(d)), this.plotLinesAndBands.push(f));
                return f
            },
            removePlotBandOrLine: function(a) {
                for (var g = this.plotLinesAndBands, f = this.options, n = this.userOptions, w = g.length; w--;) g[w].id === a && g[w].destroy();
                d([f.plotLines || [], n.plotLines || [], f.plotBands || [], n.plotBands || []], function(d) {
                    for (w = d.length; w--;) d[w].id === a && h(d, d[w])
                })
            }
        }
    })(K);
    (function(a) {
        var z = a.addEvent,
            D = a.animObject,
            C = a.arrayMax,
            B = a.arrayMin,
            d = a.AxisPlotLineOrBandExtension,
            h = a.color,
            q = a.correctFloat,
            t = a.defaultOptions,
            g = a.defined,
            p = a.deg2rad,
            f = a.destroyObjectProperties,
            n = a.each,
            w = a.extend,
            v = a.fireEvent,
            k = a.format,
            e = a.getMagnitude,
            c = a.grep,
            b = a.inArray,
            F = a.isArray,
            u = a.isNumber,
            r = a.isString,
            y = a.merge,
            G = a.normalizeTickInterval,
            I = a.pick,
            l = a.PlotLineOrBand,
            x = a.removeEvent,
            J = a.splat,
            L = a.syncTimeout,
            N = a.Tick;
        a.Axis = function() {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, c) {
                var m = c.isX;
                this.chart = a;
                this.horiz = a.inverted ? !m : m;
                this.isXAxis = m;
                this.coll = this.coll || (m ? "xAxis" : "yAxis");
                this.opposite = c.opposite;
                this.side = c.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(c);
                var e = this.options,
                    l = e.type;
                this.labelFormatter = e.labels.formatter ||
                    this.defaultLabelFormatter;
                this.userOptions = c;
                this.minPixelPadding = 0;
                this.reversed = e.reversed;
                this.visible = !1 !== e.visible;
                this.zoomEnabled = !1 !== e.zoomEnabled;
                this.hasNames = "category" === l || !0 === e.categories;
                this.categories = e.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === l;
                this.isDatetimeAxis = "datetime" === l;
                this.isLinked = g(e.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange =
                    e.minRange || e.maxZoom;
                this.range = e.range;
                this.offset = e.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = I(e.crosshair, J(a.options.tooltip.crosshairs)[m ? 0 : 1], !1);
                var A;
                c = this.options.events; - 1 === b(this, a.axes) && (m ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && m && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (A in c) z(this,
                    A, c[A]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function(a) {
                this.options = y(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], y(t[this.coll], a))
            },
            defaultLabelFormatter: function() {
                var b = this.axis,
                    c = this.value,
                    e = b.categories,
                    l = this.dateTimeLabelFormat,
                    d = t.lang,
                    n = d.numericSymbols,
                    d = d.numericSymbolMagnitude || 1E3,
                    r = n && n.length,
                    f, u = b.options.labels.format,
                    b = b.isLog ? c : b.tickInterval;
                if (u) f = k(u, this);
                else if (e) f = c;
                else if (l) f = a.dateFormat(l, c);
                else if (r && 1E3 <= b)
                    for (; r-- && void 0 === f;) e = Math.pow(d, r + 1), b >= e && 0 === 10 * c % e && null !== n[r] && 0 !== c && (f = a.numberFormat(c / e, -1) + n[r]);
                void 0 === f && (f = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return f
            },
            getSeriesExtremes: function() {
                var a = this,
                    b = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                n(a.series, function(m) {
                    if (m.visible || !b.options.chart.ignoreHiddenSeries) {
                        var e = m.options,
                            l = e.threshold,
                            A;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= l && (l = null);
                        if (a.isXAxis) e = m.xData, e.length && (m = B(e), u(m) || m instanceof Date || (e = c(e, function(a) {
                            return u(a)
                        }), m = B(e)), a.dataMin = Math.min(I(a.dataMin, e[0]), m), a.dataMax = Math.max(I(a.dataMax, e[0]), C(e)));
                        else if (m.getExtremes(), A = m.dataMax, m = m.dataMin, g(m) && g(A) && (a.dataMin = Math.min(I(a.dataMin, m), m), a.dataMax = Math.max(I(a.dataMax, A), A)), g(l) && (a.threshold = l), !e.softThreshold || a.isLog) a.softThreshold = !1
                    }
                })
            },
            translate: function(a, b, c, e, l, k) {
                var m = this.linkedParent || this,
                    A = 1,
                    d = 0,
                    n = e ? m.oldTransA : m.transA;
                e = e ? m.oldMin : m.min;
                var r = m.minPixelPadding;
                l = (m.isOrdinal || m.isBroken || m.isLog && l) && m.lin2val;
                n || (n = m.transA);
                c && (A *= -1, d = m.len);
                m.reversed && (A *= -1, d -= A * (m.sector || m.len));
                b ? (a = (a * A + d - r) / n + e, l && (a = m.lin2val(a))) : (l && (a = m.val2lin(a)), a = A * (a - e) * n + d + A * r + (u(k) ? n * k : 0));
                return a
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, b, c, e, l) {
                var m = this.chart,
                    A = this.left,
                    k = this.top,
                    d, n, r = c && m.oldChartHeight || m.chartHeight,
                    f = c && m.oldChartWidth || m.chartWidth,
                    g;
                d = this.transB;
                var x = function(a, b, m) {
                    if (a < b || a > m) e ? a = Math.min(Math.max(b, a), m) : g = !0;
                    return a
                };
                l = I(l, this.translate(a, null, null, c));
                a = c = Math.round(l + d);
                d = n = Math.round(r - l - d);
                u(l) ? this.horiz ? (d = k, n = r - this.bottom, a = c = x(a, A, A + this.width)) : (a = A, c = f - this.right, d = n = x(d,
                    k, k + this.height)) : g = !0;
                return g && !e ? null : m.renderer.crispLine(["M", a, d, "L", c, n], b || 1)
            },
            getLinearTickPositions: function(a, b, c) {
                var m, e = q(Math.floor(b / a) * a),
                    l = q(Math.ceil(c / a) * a),
                    A = [];
                if (b === c && u(b)) return [b];
                for (b = e; b <= l;) {
                    A.push(b);
                    b = q(b + a);
                    if (b === m) break;
                    m = b
                }
                return A
            },
            getMinorTickPositions: function() {
                var a = this.options,
                    b = this.tickPositions,
                    c = this.minorTickInterval,
                    e = [],
                    l, k = this.pointRangePadding || 0;
                l = this.min - k;
                var k = this.max + k,
                    d = k - l;
                if (d && d / c < this.len / 3)
                    if (this.isLog)
                        for (k = b.length, l = 1; l < k; l++) e =
                            e.concat(this.getLogTickPositions(c, b[l - 1], b[l], !0));
                    else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) e = e.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), l, k, a.startOfWeek));
                else
                    for (b = l + (b[0] - l) % c; b <= k && b !== e[0]; b += c) e.push(b);
                0 !== e.length && this.trimTicks(e, a.startOnTick, a.endOnTick);
                return e
            },
            adjustForMinRange: function() {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    e, l = this.dataMax - this.dataMin >= this.minRange,
                    k, d, r, f, u, x;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (g(a.min) ||
                    g(a.max) ? this.minRange = null : (n(this.series, function(a) {
                        f = a.xData;
                        for (d = u = a.xIncrement ? 1 : f.length - 1; 0 < d; d--)
                            if (r = f[d] - f[d - 1], void 0 === k || r < k) k = r
                    }), this.minRange = Math.min(5 * k, this.dataMax - this.dataMin)));
                c - b < this.minRange && (x = this.minRange, e = (x - c + b) / 2, e = [b - e, I(a.min, b - e)], l && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = C(e), c = [b + x, I(a.max, b + x)], l && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = B(c), c - b < x && (e[0] = c - x, e[1] = I(a.min, c - x), b = C(e)));
                this.min = b;
                this.max = c
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : n(this.series, function(b) {
                    var c = b.closestPointRange,
                        m = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && g(c) && m && (a = g(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function(a) {
                var c = F(this.categories),
                    m = c ? this.categories : this.names,
                    e = a.options.x,
                    l;
                a.series.requireSorting = !1;
                g(e) || (e = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b(a.name, m)); - 1 === e ? c || (l = m.length) : l = e;
                this.names[l] = a.name;
                return l
            },
            updateNames: function() {
                var a = this;
                0 < this.names.length &&
                    (this.names.length = 0, this.minRange = void 0, n(this.series || [], function(b) {
                        b.xIncrement = null;
                        if (!b.points || b.isDirtyData) b.processData(), b.generatePoints();
                        n(b.points, function(c, m) {
                            var e;
                            c.options && void 0 === c.options.x && (e = a.nameToX(c), e !== c.x && (c.x = e, b.xData[m] = e))
                        })
                    }))
            },
            setAxisTranslation: function(a) {
                var b = this,
                    c = b.max - b.min,
                    m = b.axisPointRange || 0,
                    e, l = 0,
                    k = 0,
                    d = b.linkedParent,
                    f = !!b.categories,
                    u = b.transA,
                    x = b.isXAxis;
                if (x || f || m) e = b.getClosest(), d ? (l = d.minPointOffset, k = d.pointRangePadding) : n(b.series, function(a) {
                    var c =
                        f ? 1 : x ? I(a.options.pointRange, e, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    m = Math.max(m, c);
                    b.single || (l = Math.max(l, r(a) ? 0 : c / 2), k = Math.max(k, "on" === a ? 0 : c))
                }), d = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = l *= d, b.pointRangePadding = k *= d, b.pointRange = Math.min(m, c), x && (b.closestPointRange = e);
                a && (b.oldTransA = u);
                b.translationSlope = b.transA = u = b.len / (c + k || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = u * l
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(b) {
                var c =
                    this,
                    m = c.chart,
                    l = c.options,
                    k = c.isLog,
                    d = c.log2lin,
                    r = c.isDatetimeAxis,
                    f = c.isXAxis,
                    x = c.isLinked,
                    y = l.maxPadding,
                    h = l.minPadding,
                    F = l.tickInterval,
                    p = l.tickPixelInterval,
                    w = c.categories,
                    J = c.threshold,
                    L = c.softThreshold,
                    t, N, B, z;
                r || w || x || this.getTickAmount();
                B = I(c.userMin, l.min);
                z = I(c.userMax, l.max);
                x ? (c.linkedParent = m[c.coll][l.linkedTo], m = c.linkedParent.getExtremes(), c.min = I(m.min, m.dataMin), c.max = I(m.max, m.dataMax), l.type !== c.linkedParent.options.type && a.error(11, 1)) : (!L && g(J) && (c.dataMin >= J ? (t = J, h = 0) : c.dataMax <=
                    J && (N = J, y = 0)), c.min = I(B, t, c.dataMin), c.max = I(z, N, c.dataMax));
                k && (!b && 0 >= Math.min(c.min, I(c.dataMin, c.min)) && a.error(10, 1), c.min = q(d(c.min), 15), c.max = q(d(c.max), 15));
                c.range && g(c.max) && (c.userMin = c.min = B = Math.max(c.min, c.minFromRange()), c.userMax = z = c.max, c.range = null);
                v(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(w || c.axisPointRange || c.usePercentage || x) && g(c.min) && g(c.max) && (d = c.max - c.min) && (!g(B) && h && (c.min -= d * h), !g(z) && y && (c.max += d * y));
                u(l.floor) ? c.min = Math.max(c.min,
                    l.floor) : u(l.softMin) && (c.min = Math.min(c.min, l.softMin));
                u(l.ceiling) ? c.max = Math.min(c.max, l.ceiling) : u(l.softMax) && (c.max = Math.max(c.max, l.softMax));
                L && g(c.dataMin) && (J = J || 0, !g(B) && c.min < J && c.dataMin >= J ? c.min = J : !g(z) && c.max > J && c.dataMax <= J && (c.max = J));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : x && !F && p === c.linkedParent.options.tickPixelInterval ? F = c.linkedParent.tickInterval : I(F, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, w ? 1 : (c.max - c.min) * p / Math.max(c.len,
                    p));
                f && !b && n(c.series, function(a) {
                    a.processData(c.min !== c.oldMin || c.max !== c.oldMax)
                });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !F && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                b = I(l.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !F && c.tickInterval < b && (c.tickInterval = b);
                r || k || F || (c.tickInterval = G(c.tickInterval, null, e(c.tickInterval), I(l.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    b, c = a.tickPositions,
                    e = a.tickPositioner,
                    l = a.startOnTick,
                    k = a.endOnTick,
                    d;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b =
                    c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);
                this.isLinked || (this.trimTicks(b, l, k), this.min ===
                    this.max && g(this.min) && !this.tickAmount && (d = !0, this.min -= .5, this.max += .5), this.single = d, c || e || this.adjustTickAmount())
            },
            trimTicks: function(a, b, c) {
                var m = a[0],
                    e = a[a.length - 1],
                    l = this.minPointOffset || 0;
                if (b) this.min = m;
                else
                    for (; this.min - l > a[0];) a.shift();
                if (c) this.max = e;
                else
                    for (; this.max + l < a[a.length - 1];) a.pop();
                0 === a.length && g(m) && a.push((e + m) / 2)
            },
            alignToOthers: function() {
                var a = {},
                    b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || n(this.chart[this.coll], function(c) {
                    var m =
                        c.options,
                        m = [c.horiz ? m.left : m.top, m.width, m.height, m.pane].join();
                    c.series.length && (a[m] ? b = !0 : a[m] = 1)
                });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !g(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    e = this.finalTickAmt,
                    l = b && b.length;
                if (l < c) {
                    for (; b.length < c;) b.push(q(b[b.length - 1] + a));
                    this.transA *= (l - 1) / (c - 1);
                    this.max = b[b.length - 1]
                } else l > c && (this.tickInterval *= 2, this.setTickPositions());
                if (g(e)) {
                    for (a = c = b.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function() {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                n(this.series, function(b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function(a, b, c, e, l) {
                var m = this,
                    k = m.chart;
                c = I(c, !0);
                n(m.series, function(a) {
                    delete a.kdTree
                });
                l = w(l, {
                    min: a,
                    max: b
                });
                v(m, "setExtremes", l, function() {
                    m.userMin = a;
                    m.userMax = b;
                    m.eventArgs = l;
                    c && k.redraw(e)
                })
            },
            zoom: function(a, b) {
                var c = this.dataMin,
                    m = this.dataMax,
                    e = this.options,
                    l = Math.min(c, I(e.min, c)),
                    e = Math.max(m, I(e.max, m));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (g(c) && (a < l && (a = l), a > e && (a = e)), g(m) && (b < l && (b = l), b > e && (b = e))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function() {
                var a = this.chart,
                    b = this.options,
                    c = b.offsetLeft ||
                    0,
                    e = this.horiz,
                    l = I(b.width, a.plotWidth - c + (b.offsetRight || 0)),
                    k = I(b.height, a.plotHeight),
                    d = I(b.top, a.plotTop),
                    b = I(b.left, a.plotLeft + c),
                    c = /%$/;
                c.test(k) && (k = Math.round(parseFloat(k) / 100 * a.plotHeight));
                c.test(d) && (d = Math.round(parseFloat(d) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = d;
                this.width = l;
                this.height = k;
                this.bottom = a.chartHeight - k - d;
                this.right = a.chartWidth - l - b;
                this.len = Math.max(e ? l : k, 0);
                this.pos = e ? b : d
            },
            getExtremes: function() {
                var a = this.isLog,
                    b = this.lin2log;
                return {
                    min: a ? q(b(this.min)) : this.min,
                    max: a ? q(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var b = this.isLog,
                    c = this.lin2log,
                    m = b ? c(this.min) : this.min,
                    b = b ? c(this.max) : this.max;
                null === a ? a = m : m > a ? a = m : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (I(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var b = this.options,
                    c = b[a + "Length"],
                    m = I(b[a + "Width"], "tick" === a && this.isXAxis ?
                        1 : 0);
                if (m && c) return "inside" === b[a + "Position"] && (c = -c), [c, m]
            },
            labelMetrics: function() {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    e = c,
                    l = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    k, d = a.rotation,
                    r = this.labelMetrics(),
                    f, x = Number.MAX_VALUE,
                    u, y = function(a) {
                        a /= l || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * c
                    };
                b ? (u = !a.staggerLines && !a.step &&
                    (g(d) ? [d] : l < I(a.autoRotationLimit, 80) && a.autoRotation)) && n(u, function(a) {
                    var b;
                    if (a === d || a && -90 <= a && 90 >= a) f = y(Math.abs(r.h / Math.sin(p * a))), b = f + Math.abs(a / 360), b < x && (x = b, k = a, e = f)
                }) : a.step || (e = y(r.h));
                this.autoRotation = u;
                this.labelRotation = I(k, d);
                return e
            },
            getSlotWidth: function() {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    l = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * a.plotWidth / e || !b && (l && l - a.spacing[3] ||
                    .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    e = this.ticks,
                    l = this.options.labels,
                    k = this.horiz,
                    d = this.getSlotWidth(),
                    f = Math.max(1, Math.round(d - 2 * (l.padding || 5))),
                    x = {},
                    u = this.labelMetrics(),
                    g = l.style && l.style.textOverflow,
                    h, F = 0,
                    p, v;
                r(l.rotation) || (x.rotation = l.rotation || 0);
                n(c, function(a) {
                    (a = e[a]) && a.labelLength > F && (F = a.labelLength)
                });
                this.maxLabelLength = F;
                if (this.autoRotation) F > f && F > u.h ? x.rotation = this.labelRotation : this.labelRotation = 0;
                else if (d &&
                    (h = {
                        width: f + "px"
                    }, !g))
                    for (h.textOverflow = "clip", p = c.length; !k && p--;)
                        if (v = c[p], f = e[v].label) f.styles && "ellipsis" === f.styles.textOverflow ? f.css({
                            textOverflow: "clip"
                        }) : e[v].labelLength > d && f.css({
                            width: d + "px"
                        }), f.getBBox().height > this.len / c.length - (u.h - u.f) && (f.specCss = {
                            textOverflow: "ellipsis"
                        });
                x.rotation && (h = {
                    width: (F > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, g || (h.textOverflow = "ellipsis"));
                if (this.labelAlign = l.align || this.autoLabelAlign(this.labelRotation)) x.align = this.labelAlign;
                n(c,
                    function(a) {
                        var b = (a = e[a]) && a.label;
                        b && (b.attr(x), h && b.css(y(h, b.specCss)), delete b.specCss, a.rotation = x.rotation)
                    });
                this.tickRotCorr = b.rotCorr(u.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || g(this.min) && g(this.max) && !!this.tickPositions
            },
            addTitle: function(a) {
                var b = this.chart.renderer,
                    c = this.horiz,
                    e = this.opposite,
                    m = this.options.title,
                    l;
                this.axisTitle || ((l = m.textAlign) || (l = (c ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: e ? "right" : "left",
                    middle: "center",
                    high: e ? "left" : "right"
                })[m.align]), this.axisTitle = b.text(m.text, 0, 0, m.useHTML).attr({
                    zIndex: 7,
                    rotation: m.rotation || 0,
                    align: l
                }).addClass("highcharts-axis-title").css(m.style).add(this.axisGroup), this.axisTitle.isNew = !0);
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    e = a.options,
                    l = a.tickPositions,
                    k = a.ticks,
                    d = a.horiz,
                    f = a.side,
                    r = b.inverted ? [1, 0, 3, 2][f] : f,
                    x, u, y = 0,
                    h, F = 0,
                    p = e.title,
                    v = e.labels,
                    J = 0,
                    w = b.axisOffset,
                    b = b.clipOffset,
                    G = [-1, 1, 1, -1][f],
                    L, q = e.className,
                    t =
                    a.axisParent,
                    B = this.tickSize("tick");
                x = a.hasData();
                a.showAxis = u = x || I(e.showEmpty, !0);
                a.staggerLines = a.horiz && v.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: e.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (q || "")).add(t), a.axisGroup = c.g("axis").attr({
                    zIndex: e.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (q || "")).add(t), a.labelGroup = c.g("axis-labels").attr({
                    zIndex: v.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (q ||
                    "")).add(t));
                if (x || a.isLinked) n(l, function(b) {
                    k[b] ? k[b].addLabel() : k[b] = new N(a, b)
                }), a.renderUnsquish(), !1 === v.reserveSpace || 0 !== f && 2 !== f && {
                    1: "left",
                    3: "right"
                }[f] !== a.labelAlign && "center" !== a.labelAlign || n(l, function(a) {
                    J = Math.max(k[a].getLabelSize(), J)
                }), a.staggerLines && (J *= a.staggerLines, a.labelOffset = J * (a.opposite ? -1 : 1));
                else
                    for (L in k) k[L].destroy(), delete k[L];
                p && p.text && !1 !== p.enabled && (a.addTitle(u), u && (y = a.axisTitle.getBBox()[d ? "height" : "width"], h = p.offset, F = g(h) ? 0 : I(p.margin, d ? 5 : 10)));
                a.renderLine();
                a.offset = G * I(e.offset, w[f]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === f ? -a.labelMetrics().h : 2 === f ? a.tickRotCorr.y : 0;
                F = Math.abs(J) + F;
                J && (F = F - c + G * (d ? I(v.y, a.tickRotCorr.y + 8 * G) : v.x));
                a.axisTitleMargin = I(h, F);
                w[f] = Math.max(w[f], a.axisTitleMargin + y + G * a.offset, F, x && l.length && B ? B[0] : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[r] = Math.max(b[r], e)
            },
            getLinePath: function(a) {
                var b = this.chart,
                    c = this.opposite,
                    e = this.offset,
                    l = this.horiz,
                    m = this.left + (c ? this.width : 0) + e,
                    e = b.chartHeight - this.bottom -
                    (c ? this.height : 0) + e;
                c && (a *= -1);
                return b.renderer.crispLine(["M", l ? this.left : m, l ? e : this.top, "L", l ? b.chartWidth - this.right : m, l ? e : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    e = this.len,
                    l = this.options.title,
                    k = a ? b : c,
                    d =
                    this.opposite,
                    f = this.offset,
                    r = l.x || 0,
                    n = l.y || 0,
                    x = this.chart.renderer.fontMetrics(l.style && l.style.fontSize, this.axisTitle).f,
                    e = {
                        low: k + (a ? 0 : e),
                        middle: k + e / 2,
                        high: k + (a ? e : 0)
                    }[l.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (d ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? x : 0);
                return {
                    x: a ? e + r : b + (d ? this.width : 0) + f + r,
                    y: a ? b + n - (d ? this.height : 0) + f : e + n
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    e = a.options,
                    k = a.isLog,
                    d = a.lin2log,
                    f = a.isLinked,
                    r = a.tickPositions,
                    x = a.axisTitle,
                    g = a.ticks,
                    y = a.minorTicks,
                    h = a.alternateBands,
                    F = e.stackLabels,
                    p = e.alternateGridColor,
                    v = a.tickmarkOffset,
                    J = a.axisLine,
                    w = b.hasRendered && u(a.oldMin),
                    G = a.showAxis,
                    I = D(c.globalAnimation),
                    q, t;
                a.labelEdge.length = 0;
                a.overlap = !1;
                n([g, y, h], function(a) {
                    for (var b in a) a[b].isActive = !1
                });
                if (a.hasData() || f) a.minorTickInterval && !a.categories && n(a.getMinorTickPositions(), function(b) {
                    y[b] || (y[b] = new N(a, b, "minor"));
                    w && y[b].isNew && y[b].render(null, !0);
                    y[b].render(null, !1, 1)
                }), r.length && (n(r, function(b, c) {
                    if (!f || b >= a.min && b <= a.max) g[b] || (g[b] = new N(a, b)), w && g[b].isNew &&
                        g[b].render(c, !0, .1), g[b].render(c)
                }), v && (0 === a.min || a.single) && (g[-1] || (g[-1] = new N(a, -1, null, !0)), g[-1].render(-1))), p && n(r, function(c, e) {
                    t = void 0 !== r[e + 1] ? r[e + 1] + v : a.max - v;
                    0 === e % 2 && c < a.max && t <= a.max + (b.polar ? -v : v) && (h[c] || (h[c] = new l(a)), q = c + v, h[c].options = {
                        from: k ? d(q) : q,
                        to: k ? d(t) : t,
                        color: p
                    }, h[c].render(), h[c].isActive = !0)
                }), a._addedPlotLB || (n((e.plotLines || []).concat(e.plotBands || []), function(b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                n([g, y, h], function(a) {
                    var c, e, l = [],
                        m = I.duration;
                    for (c in a) a[c].isActive ||
                        (a[c].render(c, !1, 0), a[c].isActive = !1, l.push(c));
                    L(function() {
                        for (e = l.length; e--;) a[l[e]] && !a[l[e]].isActive && (a[l[e]].destroy(), delete a[l[e]])
                    }, a !== h && b.hasRendered && m ? m : 0)
                });
                J && (J[J.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(J.strokeWidth())
                }), J.isPlaced = !0, J[G ? "show" : "hide"](!0));
                x && G && (x[x.isNew ? "attr" : "animate"](a.getTitlePosition()), x.isNew = !1);
                F && F.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function() {
                this.visible && (this.render(), n(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                n(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var c = this,
                    e = c.stacks,
                    l, m = c.plotLinesAndBands,
                    k;
                a || x(c);
                for (l in e) f(e[l]), e[l] = null;
                n([c.ticks, c.minorTicks, c.alternateBands], function(a) {
                    f(a)
                });
                if (m)
                    for (a = m.length; a--;) m[a].destroy();
                n("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
                    c[a] && (c[a] = c[a].destroy())
                });
                for (k in c) c.hasOwnProperty(k) && -1 === b(k, c.keepProps) && delete c[k]
            },
            drawCrosshair: function(a, b) {
                var c, e = this.crosshair,
                    l = I(e.snap, !0),
                    m, k = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (g(b) || !l) ? (l ? g(b) && (m = this.isXAxis ? b.plotX : this.len - b.plotY) : m = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), g(m) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : I(b.stackY, b.y)), null, null, null, m) || null), g(c) ? (b = this.categories && !this.isRadial, k || (this.cross = k = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " :
                    "thin ") + e.className).attr({
                    zIndex: I(e.zIndex, 2)
                }).add(), k.attr({
                    stroke: e.color || (b ? h("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": I(e.width, 1)
                }), e.dashStyle && k.attr({
                    dashstyle: e.dashStyle
                })), k.show().attr({
                    d: c
                }), b && !e.width && k.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        };
        w(a.Axis.prototype, d)
    })(K);
    (function(a) {
        var z = a.Axis,
            D = a.getMagnitude,
            C = a.map,
            B = a.normalizeTickInterval,
            d = a.pick;
        z.prototype.getLogTickPositions = function(a, q, t, g) {
            var h = this.options,
                f = this.len,
                n = this.lin2log,
                w = this.log2lin,
                v = [];
            g || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), v = this.getLinearTickPositions(a, q, t);
            else if (.08 <= a)
                for (var f = Math.floor(q), k, e, c, b, F, h = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < t + 1 && !F; f++)
                    for (e = h.length, k = 0; k < e && !F; k++) c = w(n(f) * h[k]), c > q && (!g || b <= t) && void 0 !== b && v.push(b), b > t && (F = !0), b = c;
            else q = n(q), t = n(t), a = h[g ? "minorTickInterval" : "tickInterval"], a = d("auto" ===
                a ? null : a, this._minorAutoInterval, h.tickPixelInterval / (g ? 5 : 1) * (t - q) / ((g ? f / this.tickPositions.length : f) || 1)), a = B(a, null, D(a)), v = C(this.getLinearTickPositions(a, q, t), w), g || (this._minorAutoInterval = a / 5);
            g || (this.tickInterval = a);
            return v
        };
        z.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        z.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(K);
    (function(a) {
        var z = a.dateFormat,
            D = a.each,
            C = a.extend,
            B = a.format,
            d = a.isNumber,
            h = a.map,
            q = a.merge,
            t = a.pick,
            g = a.splat,
            p = a.syncTimeout,
            f = a.timeUnits;
        a.Tooltip =
            function() {
                this.init.apply(this, arguments)
            };
        a.Tooltip.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split
            },
            cleanSplit: function(a) {
                D(this.chart.series, function(d) {
                    var f = d && d.tt;
                    f && (!f.isActive || a ? d.tt = f.destroy() : f.isActive = !1)
                })
            },
            getLabel: function() {
                var a = this.chart.renderer,
                    d = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, d.shape ||
                    "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius
                }), this.label.attr({
                    fill: d.backgroundColor,
                    "stroke-width": d.borderWidth
                }).css(d.style).shadow(d.shadow)), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart, q(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function(a, d, f, k) {
                var e = this,
                    c = e.now,
                    b = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(a - c.x) || 1 < Math.abs(d - c.y)),
                    n = e.followPointer || 1 < e.len;
                C(c, {
                    x: b ? (2 * c.x + a) / 3 : a,
                    y: b ? (c.y + d) / 2 : d,
                    anchorX: n ? void 0 : b ? (2 * c.anchorX + f) / 3 : f,
                    anchorY: n ? void 0 : b ? (c.anchorY + k) / 2 : k
                });
                e.getLabel().attr(c);
                b && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    e && e.move(a, d, f, k)
                }, 32))
            },
            hide: function(a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = t(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer =
                    p(function() {
                        d.getLabel()[a ? "fadeOut" : "hide"]();
                        d.isHidden = !0
                    }, a))
            },
            getAnchor: function(a, d) {
                var f, k = this.chart,
                    e = k.inverted,
                    c = k.plotTop,
                    b = k.plotLeft,
                    n = 0,
                    u = 0,
                    r, y;
                a = g(a);
                f = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = k.pointer.normalize(d)), f = [d.chartX - k.plotLeft, d.chartY - c]);
                f || (D(a, function(a) {
                    r = a.series.yAxis;
                    y = a.series.xAxis;
                    n += a.plotX + (!e && y ? y.left - b : 0);
                    u += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && r ? r.top - c : 0)
                }), n /= a.length, u /= a.length, f = [e ? k.plotWidth - u : n, this.shared &&
                    !e && 1 < a.length && d ? d.chartY - c : e ? k.plotHeight - n : u
                ]);
                return h(f, Math.round)
            },
            getPosition: function(a, d, f) {
                var k = this.chart,
                    e = this.distance,
                    c = {},
                    b = f.h || 0,
                    n, u = ["y", k.chartHeight, d, f.plotY + k.plotTop, k.plotTop, k.plotTop + k.plotHeight],
                    r = ["x", k.chartWidth, a, f.plotX + k.plotLeft, k.plotLeft, k.plotLeft + k.plotWidth],
                    g = !this.followPointer && t(f.ttBelow, !k.inverted === !!f.negative),
                    h = function(a, l, d, m, k, f) {
                        var r = d < m - e,
                            n = m + e + d < l,
                            x = m - e - d;
                        m += e;
                        if (g && n) c[a] = m;
                        else if (!g && r) c[a] = x;
                        else if (r) c[a] = Math.min(f - d, 0 > x - b ? x : x - b);
                        else if (n) c[a] = Math.max(k, m + b + d > l ? m : m + b);
                        else return !1
                    },
                    p = function(a, b, l, m) {
                        var d;
                        m < e || m > b - e ? d = !1 : c[a] = m < l / 2 ? 1 : m > b - l / 2 ? b - l - 2 : m - l / 2;
                        return d
                    },
                    l = function(a) {
                        var b = u;
                        u = r;
                        r = b;
                        n = a
                    },
                    x = function() {
                        !1 !== h.apply(0, u) ? !1 !== p.apply(0, r) || n || (l(!0), x()) : n ? c.x = c.y = 0 : (l(!0), x())
                    };
                (k.inverted || 1 < this.len) && l();
                x();
                return c
            },
            defaultFormatter: function(a) {
                var d = this.points || g(this),
                    f;
                f = [a.tooltipFooterHeaderFormatter(d[0])];
                f = f.concat(a.bodyFormatter(d));
                f.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return f
            },
            refresh: function(a,
                d) {
                var f = this.chart,
                    k, e = this.options,
                    c, b, n = {},
                    u = [];
                k = e.formatter || this.defaultFormatter;
                var n = f.hoverPoints,
                    r = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = g(a)[0].series.tooltipOptions.followPointer;
                b = this.getAnchor(a, d);
                d = b[0];
                c = b[1];
                !r || a.series && a.series.noSharedTooltip ? n = a.getLabelConfig() : (f.hoverPoints = a, n && D(n, function(a) {
                    a.setState()
                }), D(a, function(a) {
                    a.setState("hover");
                    u.push(a.getLabelConfig())
                }), n = {
                    x: a[0].category,
                    y: a[0].y
                }, n.points = u, this.len = u.length, a = a[0]);
                n = k.call(n,
                    this);
                r = a.series;
                this.distance = t(r.tooltipOptions.distance, 16);
                !1 === n ? this.hide() : (k = this.getLabel(), this.isHidden && k.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(n, f.hoverPoints) : (k.attr({
                    text: n && n.join ? n.join("") : n
                }), k.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(a.colorIndex, r.colorIndex)), k.attr({
                    stroke: e.borderColor || a.color || r.color || "#666666"
                }), this.updatePosition({
                    plotX: d,
                    plotY: c,
                    negative: a.negative,
                    ttBelow: a.ttBelow,
                    h: b[2] || 0
                })), this.isHidden = !1)
            },
            renderSplit: function(d,
                f) {
                var n = this,
                    k = [],
                    e = this.chart,
                    c = e.renderer,
                    b = !0,
                    g = this.options,
                    u, r = this.getLabel();
                D(d.slice(0, d.length - 1), function(a, d) {
                    d = f[d - 1] || {
                        isHeader: !0,
                        plotX: f[0].plotX
                    };
                    var y = d.series || n,
                        l = y.tt,
                        x = d.series || {},
                        h = "highcharts-color-" + t(d.colorIndex, x.colorIndex, "none");
                    l || (y.tt = l = c.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + h).attr({
                        padding: g.padding,
                        r: g.borderRadius,
                        fill: g.backgroundColor,
                        stroke: d.color || x.color || "#333333",
                        "stroke-width": g.borderWidth
                    }).add(r));
                    l.isActive = !0;
                    l.attr({
                        text: a
                    });
                    l.css(g.style);
                    a = l.getBBox();
                    x = a.width + l.strokeWidth();
                    d.isHeader ? (u = a.height, x = Math.max(0, Math.min(d.plotX + e.plotLeft - x / 2, e.chartWidth - x))) : x = d.plotX + e.plotLeft - t(g.distance, 16) - x;
                    0 > x && (b = !1);
                    a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0);
                    a -= e.plotTop;
                    k.push({
                        target: d.isHeader ? e.plotHeight + u : a,
                        rank: d.isHeader ? 1 : 0,
                        size: y.tt.getBBox().height + 1,
                        point: d,
                        x: x,
                        tt: l
                    })
                });
                this.cleanSplit();
                a.distribute(k, e.plotHeight + u);
                D(k, function(a) {
                    var c = a.point,
                        d = c.series;
                    a.tt.attr({
                        visibility: void 0 ===
                            a.pos ? "hidden" : "inherit",
                        x: b || c.isHeader ? a.x : c.plotX + e.plotLeft + t(g.distance, 16),
                        y: a.pos + e.plotTop,
                        anchorX: c.isHeader ? c.plotX + e.plotLeft : c.plotX + d.xAxis.pos,
                        anchorY: c.isHeader ? a.pos + e.plotTop - 15 : c.plotY + d.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var d = this.chart,
                    f = this.getLabel(),
                    f = (this.options.positioner || this.getPosition).call(this, f.width, f.height, a);
                this.move(Math.round(f.x), Math.round(f.y || 0), a.plotX + d.plotLeft, a.plotY + d.plotTop)
            },
            getXDateFormat: function(a, d, g) {
                var k;
                d = d.dateTimeLabelFormats;
                var e = g && g.closestPointRange,
                    c, b = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    n, u = "millisecond";
                if (e) {
                    n = z("%m-%d %H:%M:%S.%L", a.x);
                    for (c in f) {
                        if (e === f.week && +z("%w", a.x) === g.options.startOfWeek && "00:00:00.000" === n.substr(6)) {
                            c = "week";
                            break
                        }
                        if (f[c] > e) {
                            c = u;
                            break
                        }
                        if (b[c] && n.substr(b[c]) !== "01-01 00:00:00.000".substr(b[c])) break;
                        "week" !== c && (u = c)
                    }
                    c && (k = d[c])
                } else k = d.day;
                return k || d.year
            },
            tooltipFooterHeaderFormatter: function(a, f) {
                var n = f ? "footer" : "header";
                f = a.series;
                var k = f.tooltipOptions,
                    e = k.xDateFormat,
                    c = f.xAxis,
                    b = c && "datetime" === c.options.type && d(a.key),
                    n = k[n + "Format"];
                b && !e && (e = this.getXDateFormat(a, k, c));
                b && e && (n = n.replace("{point.key}", "{point.key:" + e + "}"));
                return B(n, {
                    point: a,
                    series: f
                })
            },
            bodyFormatter: function(a) {
                return h(a, function(a) {
                    var d = a.series.tooltipOptions;
                    return (d.pointFormatter || a.point.tooltipFormatter).call(a.point, d.pointFormat)
                })
            }
        }
    })(K);
    (function(a) {
        var z = a.addEvent,
            D = a.attr,
            C = a.charts,
            B = a.color,
            d = a.css,
            h = a.defined,
            q = a.doc,
            t = a.each,
            g = a.extend,
            p = a.fireEvent,
            f = a.offset,
            n = a.pick,
            w = a.removeEvent,
            v = a.splat,
            k = a.Tooltip,
            e = a.win;
        a.Pointer = function(a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function(a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                k && b.tooltip.enabled && (a.tooltip = new k(a, b.tooltip), this.followTouchMove = n(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    e = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (e = n(c.pinchType,
                    e));
                this.zoomX = a = /x/.test(e);
                this.zoomY = e = /y/.test(e);
                this.zoomHor = a && !b || e && b;
                this.zoomVert = e && !b || a && b;
                this.hasZoom = a || e
            },
            normalize: function(a, b) {
                var c, d;
                a = a || e.event;
                a.target || (a.target = a.srcElement);
                d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = f(this.chart.container));
                void 0 === d.pageX ? (c = Math.max(a.x, a.clientX - b.left), b = a.y) : (c = d.pageX - b.left, b = d.pageY - b.top);
                return g(a, {
                    chartX: Math.round(c),
                    chartY: Math.round(b)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                t(this.chart.axes, function(c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            runPointActions: function(c) {
                var b = this.chart,
                    e = b.series,
                    d = b.tooltip,
                    k = d ? d.shared : !1,
                    f = !0,
                    g = b.hoverPoint,
                    h = b.hoverSeries,
                    l, x, p, v = [],
                    w;
                if (!k && !h)
                    for (l = 0; l < e.length; l++)
                        if (e[l].directTouch || !e[l].options.stickyTracking) e = [];
                h && (k ? h.noSharedTooltip : h.directTouch) && g ? v = [g] : (k || !h || h.options.stickyTracking || (e = [h]), t(e, function(a) {
                    x = a.noSharedTooltip && k;
                    p = !k && a.directTouch;
                    a.visible && !x && !p && n(a.options.enableMouseTracking, !0) && (w = a.searchPoint(c, !x && 1 === a.kdDimensions)) && w.series && v.push(w)
                }), v.sort(function(a, b) {
                    var c = a.distX - b.distX,
                        e = a.dist - b.dist,
                        l = b.series.group.zIndex - a.series.group.zIndex;
                    return 0 !== c && k ? c : 0 !== e ? e : 0 !== l ? l : a.series.index > b.series.index ? -1 : 1
                }));
                if (k)
                    for (l = v.length; l--;)(v[l].x !== v[0].x || v[l].series.noSharedTooltip) && v.splice(l, 1);
                if (v[0] && (v[0] !== this.prevKDPoint || d && d.isHidden)) {
                    if (k && !v[0].series.noSharedTooltip) {
                        for (l = 0; l <
                            v.length; l++) v[l].onMouseOver(c, v[l] !== (h && h.directTouch && g || v[0]));
                        v.length && d && d.refresh(v.sort(function(a, b) {
                            return a.series.index - b.series.index
                        }), c)
                    } else if (d && d.refresh(v[0], c), !h || !h.directTouch) v[0].onMouseOver(c);
                    this.prevKDPoint = v[0];
                    f = !1
                }
                f && (e = h && h.tooltipOptions.followPointer, d && e && !d.isHidden && (e = d.getAnchor([{}], c), d.updatePosition({
                    plotX: e[0],
                    plotY: e[1]
                })));
                this.unDocMouseMove || (this.unDocMouseMove = z(q, "mousemove", function(b) {
                    if (C[a.hoverChartIndex]) C[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
                }));
                t(k ? v : [n(g, v[0])], function(a) {
                    t(b.axes, function(b) {
                        (!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(c, a)
                    })
                })
            },
            reset: function(a, b) {
                var c = this.chart,
                    e = c.hoverSeries,
                    d = c.hoverPoint,
                    k = c.hoverPoints,
                    f = c.tooltip,
                    n = f && f.shared ? k : d;
                a && n && t(v(n), function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) f && n && (f.refresh(n), d && (d.setState(d.state, !0), t(c.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, d)
                })));
                else {
                    if (d) d.onMouseOut();
                    k && t(k, function(a) {
                        a.setState()
                    });
                    if (e) e.onMouseOut();
                    f && f.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    t(c.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = c.hoverPoints = c.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var c = this.chart,
                    e;
                t(c.series, function(d) {
                    e = a || d.getPlotBox();
                    d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(e), d.markerGroup && (d.markerGroup.attr(e), d.markerGroup.clip(b ? c.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(e))
                });
                c.clipRect.attr(b || c.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    e = a.chartX,
                    d = a.chartY,
                    k = this.zoomHor,
                    f = this.zoomVert,
                    n = b.plotLeft,
                    l = b.plotTop,
                    x = b.plotWidth,
                    g = b.plotHeight,
                    h, p = this.selectionMarker,
                    m = this.mouseDownX,
                    v = this.mouseDownY,
                    q = c.panKey && a[c.panKey + "Key"];
                p && p.touch || (e < n ? e = n : e > n + x && (e = n + x), d < l ? d = l : d > l + g && (d = l + g), this.hasDragged = Math.sqrt(Math.pow(m - e, 2) + Math.pow(v - d, 2)), 10 < this.hasDragged &&
                    (h = b.isInsidePlot(m - n, v - l), b.hasCartesianSeries && (this.zoomX || this.zoomY) && h && !q && !p && (this.selectionMarker = p = b.renderer.rect(n, l, k ? 1 : x, f ? 1 : g, 0).attr({
                        fill: c.selectionMarkerFill || B("#335cad").setOpacity(.25).get(),
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add()), p && k && (e -= m, p.attr({
                        width: Math.abs(e),
                        x: (0 < e ? 0 : e) + m
                    })), p && f && (e = d - v, p.attr({
                        height: Math.abs(e),
                        y: (0 < e ? 0 : e) + v
                    })), h && !p && c.panning && b.pan(a, c.panning)))
            },
            drop: function(a) {
                var b = this,
                    c = this.chart,
                    e = this.hasPinched;
                if (this.selectionMarker) {
                    var k = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        f = this.selectionMarker,
                        n = f.attr ? f.attr("x") : f.x,
                        v = f.attr ? f.attr("y") : f.y,
                        l = f.attr ? f.attr("width") : f.width,
                        x = f.attr ? f.attr("height") : f.height,
                        J;
                    if (this.hasDragged || e) t(c.axes, function(c) {
                        if (c.zoomEnabled && h(c.min) && (e || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[c.coll]])) {
                            var d = c.horiz,
                                m = "touchend" === a.type ? c.minPixelPadding : 0,
                                f = c.toValue((d ? n : v) + m),
                                d = c.toValue((d ? n + l : v + x) - m);
                            k[c.coll].push({
                                axis: c,
                                min: Math.min(f, d),
                                max: Math.max(f, d)
                            });
                            J = !0
                        }
                    }), J && p(c, "selection", k, function(a) {
                        c.zoom(g(a,
                            e ? {
                                animation: !1
                            } : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    e && this.scaleGroups()
                }
                c && (d(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function(c) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(c)
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(c) {
                var b = C[a.hoverChartIndex];
                b && (c.relatedTarget || c.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(c) {
                var b = this.chart;
                h(a.hoverChartIndex) && C[a.hoverChartIndex] && C[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index);
                c = this.normalize(c);
                c.returnValue = !1;
                "mousedown" === b.mouseIsDown && this.drag(c);
                !this.inClass(c.target, "highcharts-tracker") && !b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop) || b.openMenu || this.runPointActions(c)
            },
            inClass: function(a, b) {
                for (var c; a;) {
                    if (c = D(a, "class")) {
                        if (-1 !== c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!b || !a || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") ||
                        this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    e = b.plotLeft,
                    d = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (p(c.series, "click", g(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (g(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - d) && p(b, "click", a)))
            },
            setDOMEvents: function() {
                var c = this,
                    b = c.chart.container;
                b.onmousedown =
                    function(a) {
                        c.onContainerMouseDown(a)
                    };
                b.onmousemove = function(a) {
                    c.onContainerMouseMove(a)
                };
                b.onclick = function(a) {
                    c.onContainerClick(a)
                };
                z(b, "mouseleave", c.onContainerMouseLeave);
                1 === a.chartCount && z(q, "mouseup", c.onDocumentMouseUp);
                a.hasTouch && (b.ontouchstart = function(a) {
                    c.onContainerTouchStart(a)
                }, b.ontouchmove = function(a) {
                    c.onContainerTouchMove(a)
                }, 1 === a.chartCount && z(q, "touchend", c.onDocumentTouchEnd))
            },
            destroy: function() {
                var c;
                w(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount ||
                    (w(q, "mouseup", this.onDocumentMouseUp), w(q, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (c in this) this[c] = null
            }
        }
    })(K);
    (function(a) {
        var z = a.charts,
            D = a.each,
            C = a.extend,
            B = a.map,
            d = a.noop,
            h = a.pick;
        C(a.Pointer.prototype, {
            pinchTranslate: function(a, d, g, h, f, n) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, d, g, h, f, n);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, g, h, f, n)
            },
            pinchTranslateDirection: function(a, d, g, h, f, n, w, v) {
                var k = this.chart,
                    e = a ? "x" : "y",
                    c = a ? "X" : "Y",
                    b = "chart" +
                    c,
                    p = a ? "width" : "height",
                    u = k["plot" + (a ? "Left" : "Top")],
                    r, y, q = v || 1,
                    I = k.inverted,
                    l = k.bounds[a ? "h" : "v"],
                    x = 1 === d.length,
                    J = d[0][b],
                    L = g[0][b],
                    t = !x && d[1][b],
                    m = !x && g[1][b],
                    A;
                g = function() {
                    !x && 20 < Math.abs(J - t) && (q = v || Math.abs(L - m) / Math.abs(J - t));
                    y = (u - L) / q + J;
                    r = k["plot" + (a ? "Width" : "Height")] / q
                };
                g();
                d = y;
                d < l.min ? (d = l.min, A = !0) : d + r > l.max && (d = l.max - r, A = !0);
                A ? (L -= .8 * (L - w[e][0]), x || (m -= .8 * (m - w[e][1])), g()) : w[e] = [L, m];
                I || (n[e] = y - u, n[p] = r);
                n = I ? 1 / q : q;
                f[p] = r;
                f[e] = d;
                h[I ? a ? "scaleY" : "scaleX" : "scale" + c] = q;
                h["translate" + c] = n *
                    u + (L - n * J)
            },
            pinch: function(a) {
                var q = this,
                    g = q.chart,
                    p = q.pinchDown,
                    f = a.touches,
                    n = f.length,
                    w = q.lastValidTouch,
                    v = q.hasZoom,
                    k = q.selectionMarker,
                    e = {},
                    c = 1 === n && (q.inClass(a.target, "highcharts-tracker") && g.runTrackerClick || q.runChartClick),
                    b = {};
                1 < n && (q.initiated = !0);
                v && q.initiated && !c && a.preventDefault();
                B(f, function(a) {
                    return q.normalize(a)
                });
                "touchstart" === a.type ? (D(f, function(a, b) {
                    p[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), w.x = [p[0].chartX, p[1] && p[1].chartX], w.y = [p[0].chartY, p[1] && p[1].chartY], D(g.axes, function(a) {
                    if (a.zoomEnabled) {
                        var b =
                            g.bounds[a.horiz ? "h" : "v"],
                            c = a.minPixelPadding,
                            e = a.toPixels(h(a.options.min, a.dataMin)),
                            d = a.toPixels(h(a.options.max, a.dataMax)),
                            k = Math.max(e, d);
                        b.min = Math.min(a.pos, Math.min(e, d) - c);
                        b.max = Math.max(a.pos + a.len, k + c)
                    }
                }), q.res = !0) : q.followTouchMove && 1 === n ? this.runPointActions(q.normalize(a)) : p.length && (k || (q.selectionMarker = k = C({
                    destroy: d,
                    touch: !0
                }, g.plotBox)), q.pinchTranslate(p, f, e, k, b, w), q.hasPinched = v, q.scaleGroups(e, b), q.res && (q.res = !1, this.reset(!1, 0)))
            },
            touch: function(d, t) {
                var g = this.chart,
                    p, f;
                if (g.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = g.index;
                1 === d.touches.length ? (d = this.normalize(d), (f = g.isInsidePlot(d.chartX - g.plotLeft, d.chartY - g.plotTop)) && !g.openMenu ? (t && this.runPointActions(d), "touchmove" === d.type && (t = this.pinchDown, p = t[0] ? 4 <= Math.sqrt(Math.pow(t[0].chartX - d.chartX, 2) + Math.pow(t[0].chartY - d.chartY, 2)) : !1), h(p, !0) && this.pinch(d)) : t && this.reset()) : 2 === d.touches.length && this.pinch(d)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(d) {
                z[a.hoverChartIndex] && z[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(K);
    (function(a) {
        var z = a.addEvent,
            D = a.charts,
            C = a.css,
            B = a.doc,
            d = a.extend,
            h = a.noop,
            q = a.Pointer,
            t = a.removeEvent,
            g = a.win,
            p = a.wrap;
        if (g.PointerEvent || g.MSPointerEvent) {
            var f = {},
                n = !!g.PointerEvent,
                w = function() {
                    var a, e = [];
                    e.item = function(a) {
                        return this[a]
                    };
                    for (a in f) f.hasOwnProperty(a) && e.push({
                        pageX: f[a].pageX,
                        pageY: f[a].pageY,
                        target: f[a].target
                    });
                    return e
                },
                v = function(d, e, c, b) {
                    "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !D[a.hoverChartIndex] || (b(d), b = D[a.hoverChartIndex].pointer, b[e]({
                        type: c,
                        target: d.currentTarget,
                        preventDefault: h,
                        touches: w()
                    }))
                };
            d(q.prototype, {
                onContainerPointerDown: function(a) {
                    v(a, "onContainerTouchStart", "touchstart", function(a) {
                        f[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    v(a, "onContainerTouchMove", "touchmove", function(a) {
                        f[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    v(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete f[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, n ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, n ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(B, n ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            p(q.prototype, "init", function(a, e, c) {
                a.call(this, e, c);
                this.hasZoom &&
                    C(e.container, {
                        "-ms-touch-action": "none",
                        "touch-action": "none"
                    })
            });
            p(q.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(z)
            });
            p(q.prototype, "destroy", function(a) {
                this.batchMSEvents(t);
                a.call(this)
            })
        }
    })(K);
    (function(a) {
        var z, D = a.addEvent,
            C = a.css,
            B = a.discardElement,
            d = a.defined,
            h = a.each,
            q = a.extend,
            t = a.isFirefox,
            g = a.marginNames,
            p = a.merge,
            f = a.pick,
            n = a.setAnimation,
            w = a.stableSort,
            v = a.win,
            k = a.wrap;
        z = a.Legend = function(a, c) {
            this.init(a, c)
        };
        z.prototype = {
            init: function(a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), D(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function(a) {
                var c = f(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = p(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = c;
                this.initialItemY = c - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = f(a.symbolWidth, 16);
                this.pages = []
            },
            update: function(a, c) {
                var b =
                    this.chart;
                this.setOptions(p(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                f(c, !0) && b.redraw()
            },
            colorizeItem: function(a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options,
                    e = a.legendItem,
                    d = a.legendLine,
                    f = a.legendSymbol,
                    k = this.itemHiddenStyle.color,
                    b = c ? b.itemStyle.color : k,
                    n = c ? a.color || k : k,
                    g = a.options && a.options.marker,
                    l = {
                        fill: n
                    },
                    x;
                e && e.css({
                    fill: b,
                    color: b
                });
                d && d.attr({
                    stroke: n
                });
                if (f) {
                    if (g && f.isMarker && (l = a.pointAttribs(), !c))
                        for (x in l) l[x] =
                            k;
                    f.attr(l)
                }
            },
            positionItem: function(a) {
                var c = this.options,
                    b = c.symbolPadding,
                    c = !c.rtl,
                    e = a._legendItemPos,
                    d = e[0],
                    e = e[1],
                    f = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(c ? d : this.legendWidth - d - 2 * b - 4, e);
                f && (f.x = d, f.y = e)
            },
            destroyItem: function(a) {
                var c = a.checkbox;
                h(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                c && B(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                h(this.getAllItems(), function(c) {
                    h(["legendItem",
                        "legendGroup"
                    ], a, c)
                });
                h(["box", "title", "group"], a, this);
                this.display = null
            },
            positionCheckboxes: function(a) {
                var c = this.group && this.group.alignAttr,
                    b, e = this.clipHeight || this.legendHeight,
                    d = this.titleHeight;
                c && (b = c.translateY, h(this.allItems, function(f) {
                    var k = f.checkbox,
                        n;
                    k && (n = b + d + k.y + (a || 0) + 3, C(k, {
                        left: c.translateX + f.checkboxOffset + k.x - 20 + "px",
                        top: n + "px",
                        display: n > b - 6 && n < b + e - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function() {
                var a = this.padding,
                    c = this.options.title,
                    b = 0;
                c.text && (this.title || (this.title = this.chart.renderer.label(c.text,
                    a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(c.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: b
                }));
                this.titleHeight = b
            },
            setText: function(e) {
                var c = this.options;
                e.legendItem.attr({
                    text: c.labelFormat ? a.format(c.labelFormat, e) : c.labelFormatter.call(e)
                })
            },
            renderItem: function(a) {
                var c = this.chart,
                    b = c.renderer,
                    e = this.options,
                    d = "horizontal" === e.layout,
                    k = this.symbolWidth,
                    n = e.symbolPadding,
                    g = this.itemStyle,
                    h = this.itemHiddenStyle,
                    l = this.padding,
                    x = d ? f(e.itemDistance, 20) : 0,
                    v = !e.rtl,
                    q = e.width,
                    w = e.itemMarginBottom || 0,
                    m = this.itemMarginTop,
                    A = this.initialItemX,
                    t = a.legendItem,
                    M = !a.series,
                    B = !M && a.series.drawLegendSymbol ? a.series : a,
                    E = B.options,
                    E = this.createCheckboxForItem && E && E.showCheckbox,
                    H = e.useHTML;
                t || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + B.type + "-series highcharts-color-" + a.colorIndex + (a.options.className ? " " + a.options.className : "") + (M ? " highcharts-series-" + a.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup),
                    a.legendItem = t = b.text("", v ? k + n : -n, this.baseline || 0, H).css(p(a.visible ? g : h)).attr({
                        align: v ? "left" : "right",
                        zIndex: 2
                    }).add(a.legendGroup), this.baseline || (g = g.fontSize, this.fontMetrics = b.fontMetrics(g, t), this.baseline = this.fontMetrics.f + 3 + m, t.attr("y", this.baseline)), B.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, t, H), E && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                b = t.getBBox();
                k = a.checkboxOffset = e.itemWidth || a.legendItemWidth || k + n + b.width + x + (E ? 20 :
                    0);
                this.itemHeight = n = Math.round(a.legendItemHeight || b.height);
                d && this.itemX - A + k > (q || c.chartWidth - 2 * l - A - e.x) && (this.itemX = A, this.itemY += m + this.lastLineHeight + w, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, k);
                this.lastItemY = m + this.itemY + w;
                this.lastLineHeight = Math.max(n, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                d ? this.itemX += k : (this.itemY += m + n + w, this.lastLineHeight = n);
                this.offsetWidth = q || Math.max((d ? this.itemX - A - x : k) + l, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                h(this.chart.series, function(c) {
                    var b = c && c.options;
                    c && f(b.showInLegend, d(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                });
                return a
            },
            adjustMargins: function(a, c) {
                var b = this.chart,
                    e = this.options,
                    k = e.align.charAt(0) + e.verticalAlign.charAt(0) + e.layout.charAt(0);
                e.floating || h([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(n, h) {
                    n.test(k) && !d(a[h]) && (b[g[h]] = Math.max(b[g[h]], b.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] *
                        e[h % 2 ? "x" : "y"] + f(e.margin, 12) + c[h]))
                })
            },
            render: function() {
                var a = this,
                    c = a.chart,
                    b = c.renderer,
                    d = a.group,
                    k, f, n, g, p = a.box,
                    l = a.options,
                    x = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                d || (a.group = d = b.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(d), a.scrollGroup = b.g().add(a.contentGroup));
                a.renderTitle();
                k = a.getAllItems();
                w(k, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                l.reversed &&
                    k.reverse();
                a.allItems = k;
                a.display = f = !!k.length;
                a.lastLineHeight = 0;
                h(k, function(b) {
                    a.renderItem(b)
                });
                n = (l.width || a.offsetWidth) + x;
                g = a.lastItemY + a.lastLineHeight + a.titleHeight;
                g = a.handleOverflow(g);
                g += x;
                p || (a.box = p = b.rect().addClass("highcharts-legend-box").attr({
                    r: l.borderRadius
                }).add(d), p.isNew = !0);
                p.attr({
                    stroke: l.borderColor,
                    "stroke-width": l.borderWidth || 0,
                    fill: l.backgroundColor || "none"
                }).shadow(l.shadow);
                0 < n && 0 < g && (p[p.isNew ? "attr" : "animate"](p.crisp({
                        x: 0,
                        y: 0,
                        width: n,
                        height: g
                    }, p.strokeWidth())),
                    p.isNew = !1);
                p[f ? "show" : "hide"]();
                a.legendWidth = n;
                a.legendHeight = g;
                h(k, function(b) {
                    a.positionItem(b)
                });
                f && d.align(q({
                    width: n,
                    height: g
                }, l), !0, "spacingBox");
                c.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(a) {
                var c = this,
                    b = this.chart,
                    e = b.renderer,
                    d = this.options,
                    k = d.y,
                    b = b.spacingBox.height + ("top" === d.verticalAlign ? -k : k) - this.padding,
                    k = d.maxHeight,
                    n, g = this.clipRect,
                    p = d.navigation,
                    l = f(p.animation, !0),
                    x = p.arrowSize || 12,
                    v = this.nav,
                    q = this.pages,
                    w = this.padding,
                    m, t = this.allItems,
                    B = function(a) {
                        a ?
                            g.attr({
                                height: a
                            }) : g && (c.clipRect = g.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + w + "px,9999px," + (w + a) + "px,0)" : "auto")
                    };
                "horizontal" !== d.layout || "middle" === d.verticalAlign || d.floating || (b /= 2);
                k && (b = Math.min(b, k));
                q.length = 0;
                a > b && !1 !== p.enabled ? (this.clipHeight = n = Math.max(b - 20 - this.titleHeight - w, 0), this.currentPage = f(this.currentPage, 1), this.fullHeight = a, h(t, function(a, b) {
                        var c = a._legendItemPos[1];
                        a = Math.round(a.legendItem.getBBox().height);
                        var e = q.length;
                        if (!e || c - q[e - 1] > n && (m || c) !== q[e - 1]) q.push(m || c), e++;
                        b === t.length - 1 && c + a - q[e - 1] > n && q.push(c);
                        c !== m && (m = c)
                    }), g || (g = c.clipRect = e.clipRect(0, w, 9999, 0), c.contentGroup.clip(g)), B(n), v || (this.nav = v = e.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = e.symbol("triangle", 0, 0, x, x).on("click", function() {
                        c.scroll(-1, l)
                    }).add(v), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation").css(p.style).add(v), this.down = e.symbol("triangle-down", 0, 0, x, x).on("click", function() {
                        c.scroll(1, l)
                    }).add(v)), c.scroll(0),
                    a = b) : v && (B(), v.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, c) {
                var b = this.pages,
                    e = b.length;
                a = this.currentPage + a;
                var d = this.clipHeight,
                    k = this.options.navigation,
                    f = this.pager,
                    g = this.padding;
                a > e && (a = e);
                0 < a && (void 0 !== c && n(c, this.chart), this.nav.attr({
                    translateX: g,
                    translateY: d + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), f.attr({
                    text: a + "/" + e
                }), this.down.attr({
                    x: 18 +
                        this.pager.getBBox().width,
                    "class": a === e ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({
                    fill: 1 === a ? k.inactiveColor : k.activeColor
                }).css({
                    cursor: 1 === a ? "default" : "pointer"
                }), this.down.attr({
                    fill: a === e ? k.inactiveColor : k.activeColor
                }).css({
                    cursor: a === e ? "default" : "pointer"
                }), c = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: c
                }), this.currentPage = a, this.positionCheckboxes(c))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, c) {
                var b = a.options,
                    e = b.symbolHeight ||
                    a.fontMetrics.f,
                    b = b.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, b ? e : a.symbolWidth, e, f(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(c.legendGroup)
            },
            drawLineMarker: function(a) {
                var c = this.options,
                    b = c.marker,
                    e = a.symbolWidth,
                    d = this.chart.renderer,
                    k = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var f;
                f = {
                    "stroke-width": c.lineWidth || 0
                };
                c.dashStyle && (f.dashstyle = c.dashStyle);
                this.legendLine = d.path(["M", 0, a, "L",
                    e, a
                ]).addClass("highcharts-graph").attr(f).add(k);
                b && !1 !== b.enabled && (c = 0 === this.symbol.indexOf("url") ? 0 : b.radius, this.legendSymbol = b = d.symbol(this.symbol, e / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(k), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(v.navigator.userAgent) || t) && k(z.prototype, "positionItem", function(a, c) {
            var b = this,
                e = function() {
                    c._legendItemPos && a.call(b, c)
                };
            e();
            setTimeout(e)
        })
    })(K);
    (function(a) {
        var z = a.addEvent,
            D = a.animate,
            C = a.animObject,
            B = a.attr,
            d = a.doc,
            h = a.Axis,
            q = a.createElement,
            t = a.defaultOptions,
            g = a.discardElement,
            p = a.charts,
            f = a.css,
            n = a.defined,
            w = a.each,
            v = a.extend,
            k = a.find,
            e = a.fireEvent,
            c = a.getStyle,
            b = a.grep,
            F = a.isNumber,
            u = a.isObject,
            r = a.isString,
            y = a.Legend,
            G = a.marginNames,
            I = a.merge,
            l = a.Pointer,
            x = a.pick,
            J = a.pInt,
            L = a.removeEvent,
            N = a.seriesTypes,
            m = a.splat,
            A = a.svg,
            P = a.syncTimeout,
            M = a.win,
            R = a.Renderer,
            E = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, b, c) {
            return new E(a, b, c)
        };
        E.prototype = {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (r(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b, c) {
                var e, l = b.series;
                b.series = null;
                e = I(t, b);
                e.series = b.series = l;
                this.userOptions = b;
                this.respRules = [];
                b = e.chart;
                l = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var d;
                this.index = p.length;
                p.push(this);
                a.chartCount++;
                if (l)
                    for (d in l) z(this, d, l[d]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount =
                    this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            },
            initSeries: function(b) {
                var c = this.options.chart;
                (c = N[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            isInsidePlot: function(a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                var c = this.axes,
                    l = this.series,
                    d = this.pointer,
                    m = this.legend,
                    k = this.isDirtyLegend,
                    f, n, g = this.hasCartesianSeries,
                    x = this.isDirtyBox,
                    h = l.length,
                    r = h,
                    p = this.renderer,
                    u = p.isHidden(),
                    y = [];
                a.setAnimation(b, this);
                u && this.cloneRenderTo();
                for (this.layOutTitles(); r--;)
                    if (b = l[r], b.options.stacking && (f = !0, b.isDirty)) {
                        n = !0;
                        break
                    }
                if (n)
                    for (r = h; r--;) b = l[r], b.options.stacking && (b.isDirty = !0);
                w(l, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), k = !0);
                    a.isDirtyData && e(a, "updatedData")
                });
                k && m.options.enabled && (m.render(), this.isDirtyLegend = !1);
                f && this.getStacks();
                g && w(c, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                g && (w(c, function(a) {
                    a.isDirty &&
                        (x = !0)
                }), w(c, function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, y.push(function() {
                        e(a, "afterSetExtremes", v(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (x || f) && a.redraw()
                }));
                x && this.drawChartBox();
                w(l, function(a) {
                    (x || a.isDirty) && a.visible && a.redraw()
                });
                d && d.reset(!0);
                p.draw();
                e(this, "redraw");
                u && this.cloneRenderTo(!0);
                w(y, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function b(b) {
                    return b.id === a || b.options.id === a
                }
                var c, e = this.series,
                    l;
                c = k(this.axes, b) || k(this.series, b);
                for (l = 0; !c && l < e.length; l++) c =
                    k(e[l].points || [], b);
                return c
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = m(b.xAxis || {}),
                    b = b.yAxis = m(b.yAxis || {});
                w(c, function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                w(b, function(a, b) {
                    a.index = b
                });
                c = c.concat(b);
                w(c, function(b) {
                    new h(a, b)
                })
            },
            getSelectedPoints: function() {
                var a = [];
                w(this.series, function(c) {
                    a = a.concat(b(c.points || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return b(this.series, function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, c) {
                var e = this,
                    l = e.options,
                    d;
                d = l.title = I({
                    style: {
                        color: "#333333",
                        fontSize: l.isStock ? "16px" : "18px"
                    }
                }, l.title, a);
                l = l.subtitle = I({
                    style: {
                        color: "#666666"
                    }
                }, l.subtitle, b);
                w([
                    ["title", a, d],
                    ["subtitle", b, l]
                ], function(a, b) {
                    var c = a[0],
                        l = e[c],
                        d = a[1];
                    a = a[2];
                    l && d && (e[c] = l = l.destroy());
                    a && a.text && !l && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), e[c].update = function(a) {
                        e.setTitle(!b && a, b && a)
                    }, e[c].css(a.style))
                });
                e.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, e =
                    this.renderer,
                    l = this.spacingBox;
                w(["title", "subtitle"], function(a) {
                    var c = this[a],
                        d = this.options[a],
                        m;
                    c && (m = d.style.fontSize, m = e.fontMetrics(m, c).b, c.css({
                        width: (d.width || l.width + d.widthAdjust) + "px"
                    }).align(v({
                        y: b + m + ("title" === a ? -3 : 2)
                    }, d), !1, "spacingBox"), d.floating || d.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && x(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var a = this.options.chart,
                    b = a.width,
                    a = a.height,
                    e = this.renderToClone || this.renderTo;
                n(b) || (this.containerWidth = c(e, "width"));
                n(a) || (this.containerHeight = c(e, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, x(a, 19 < this.containerHeight ? this.containerHeight : 400))
            },
            cloneRenderTo: function(a) {
                var b = this.renderToClone,
                    c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;) this.renderTo.appendChild(b.firstChild);
                        g(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c),
                    this.renderToClone = b = this.renderTo.cloneNode(0), f(b, {
                        position: "absolute",
                        top: "-9999px",
                        display: "block"
                    }), b.style.setProperty && b.style.setProperty("display", "block", "important"), d.body.appendChild(b), c && b.appendChild(c)
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var b, c = this.options,
                    e = c.chart,
                    l, m;
                b = this.renderTo;
                var k = a.uniqueKey(),
                    f;
                b || (this.renderTo = b = e.renderTo);
                r(b) && (this.renderTo = b = d.getElementById(b));
                b || a.error(13, !0);
                l = J(B(b,
                    "data-highcharts-chart"));
                F(l) && p[l] && p[l].hasRendered && p[l].destroy();
                B(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                e.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                l = this.chartWidth;
                m = this.chartHeight;
                f = v({
                    position: "relative",
                    overflow: "hidden",
                    width: l + "px",
                    height: m + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, e.style);
                this.container = b = q("div", {
                    id: k
                }, f, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer =
                    new(a[e.renderer] || R)(b, l, m, null, e.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(e.className);
                this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function(a) {
                var b = this.spacing,
                    c = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !n(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c, b);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin &&
                    (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && w(a.axes, function(a) {
                    a.visible && a.getOffset()
                });
                w(G, function(e, l) {
                    n(c[l]) || (a[e] += b[l])
                });
                a.setChartSize()
            },
            reflow: function(a) {
                var b = this,
                    e = b.options.chart,
                    l = b.renderTo,
                    m = n(e.width),
                    k = e.width || c(l, "width"),
                    e = e.height || c(l, "height"),
                    l = a ? a.target : M;
                if (!m && !b.isPrinting && k && e && (l === M || l === d)) {
                    if (k !== b.containerWidth || e !== b.containerHeight) clearTimeout(b.reflowTimeout),
                        b.reflowTimeout = P(function() {
                            b.container && b.setSize(void 0, void 0, !1)
                        }, a ? 100 : 0);
                    b.containerWidth = k;
                    b.containerHeight = e
                }
            },
            initReflow: function() {
                var a = this,
                    b;
                b = z(M, "resize", function(b) {
                    a.reflow(b)
                });
                z(a, "destroy", b)
            },
            setSize: function(b, c, l) {
                var d = this,
                    m = d.renderer;
                d.isResizing += 1;
                a.setAnimation(l, d);
                d.oldChartHeight = d.chartHeight;
                d.oldChartWidth = d.chartWidth;
                void 0 !== b && (d.options.chart.width = b);
                void 0 !== c && (d.options.chart.height = c);
                d.getChartSize();
                b = m.globalAnimation;
                (b ? D : f)(d.container, {
                    width: d.chartWidth +
                        "px",
                    height: d.chartHeight + "px"
                }, b);
                d.setChartSize(!0);
                m.setSize(d.chartWidth, d.chartHeight, l);
                w(d.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                d.isDirtyLegend = !0;
                d.isDirtyBox = !0;
                d.layOutTitles();
                d.getMargins();
                d.setResponsive && d.setResponsive(!1);
                d.redraw(l);
                d.oldChartHeight = null;
                e(d, "resize");
                P(function() {
                    d && e(d, "endResize", null, function() {
                        --d.isResizing
                    })
                }, C(b).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    c = this.renderer,
                    e = this.chartWidth,
                    l = this.chartHeight,
                    d = this.options.chart,
                    m = this.spacing,
                    k = this.clipOffset,
                    f, n, g, x;
                this.plotLeft = f = Math.round(this.plotLeft);
                this.plotTop = n = Math.round(this.plotTop);
                this.plotWidth = g = Math.max(0, Math.round(e - f - this.marginRight));
                this.plotHeight = x = Math.max(0, Math.round(l - n - this.marginBottom));
                this.plotSizeX = b ? x : g;
                this.plotSizeY = b ? g : x;
                this.plotBorderWidth = d.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: m[3],
                    y: m[0],
                    width: e - m[3] - m[1],
                    height: l - m[0] - m[2]
                };
                this.plotBox = c.plotBox = {
                    x: f,
                    y: n,
                    width: g,
                    height: x
                };
                e = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(e,
                    k[3]) / 2);
                c = Math.ceil(Math.max(e, k[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(e, k[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(e, k[2]) / 2 - c))
                };
                a || w(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var a = this,
                    b = a.options.chart;
                w(["margin", "spacing"], function(c) {
                    var e = b[c],
                        l = u(e) ? e : [e, e, e, e];
                    w(["Top", "Right", "Bottom", "Left"], function(e, d) {
                        a[c][d] = x(b[c + e], l[d])
                    })
                });
                w(G, function(b, c) {
                    a[b] = x(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    e = this.chartHeight,
                    l = this.chartBackground,
                    d = this.plotBackground,
                    m = this.plotBorder,
                    k, f = this.plotBGImage,
                    n = a.backgroundColor,
                    g = a.plotBackgroundColor,
                    x = a.plotBackgroundImage,
                    h, r = this.plotLeft,
                    p = this.plotTop,
                    u = this.plotWidth,
                    v = this.plotHeight,
                    y = this.plotBox,
                    J = this.clipRect,
                    q = this.clipBox,
                    w = "animate";
                l || (this.chartBackground = l = b.rect().addClass("highcharts-background").add(), w = "attr");
                k =
                    a.borderWidth || 0;
                h = k + (a.shadow ? 8 : 0);
                n = {
                    fill: n || "none"
                };
                if (k || l["stroke-width"]) n.stroke = a.borderColor, n["stroke-width"] = k;
                l.attr(n).shadow(a.shadow);
                l[w]({
                    x: h / 2,
                    y: h / 2,
                    width: c - h - k % 2,
                    height: e - h - k % 2,
                    r: a.borderRadius
                });
                w = "animate";
                d || (w = "attr", this.plotBackground = d = b.rect().addClass("highcharts-plot-background").add());
                d[w](y);
                d.attr({
                    fill: g || "none"
                }).shadow(a.plotShadow);
                x && (f ? f.animate(y) : this.plotBGImage = b.image(x, r, p, u, v).add());
                J ? J.animate({
                    width: q.width,
                    height: q.height
                }) : this.clipRect = b.clipRect(q);
                w = "animate";
                m || (w = "attr", this.plotBorder = m = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                m.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                m[w](m.crisp({
                    x: r,
                    y: p,
                    width: u,
                    height: v
                }, -m.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, e = a.options.series,
                    l, d;
                w(["inverted", "angular", "polar"], function(m) {
                    c = N[b.type || b.defaultSeriesType];
                    d = b[m] || c && c.prototype[m];
                    for (l = e && e.length; !d && l--;)(c = N[e[l].type]) &&
                        c.prototype[m] && (d = !0);
                    a[m] = d
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                w(b, function(a) {
                    a.linkedSeries.length = 0
                });
                w(b, function(b) {
                    var c = b.options.linkedTo;
                    r(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = x(b.options.visible, c.options.visible, b.visible))
                })
            },
            renderSeries: function() {
                w(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && w(b.items, function(c) {
                    var e =
                        v(b.style, c.style),
                        l = J(e.left) + a.plotLeft,
                        d = J(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(c.html, l, d).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    e, l, d;
                this.setTitle();
                this.legend = new y(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                e = this.plotHeight -= 21;
                w(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                l = 1.1 < c / this.plotWidth;
                d = 1.05 < e / this.plotHeight;
                if (l || d) w(a, function(a) {
                    (a.horiz &&
                        l || !a.horiz && d) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && w(a, function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = I(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click",
                    function() {
                        a.href && (M.location.href = a.href)
                    }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var b = this,
                    c = b.axes,
                    l = b.series,
                    d = b.container,
                    m, k = d && d.parentNode;
                e(b, "destroy");
                p[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                L(b);
                for (m = c.length; m--;) c[m] = c[m].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (m =
                    l.length; m--;) l[m] = l[m].destroy();
                w("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                d && (d.innerHTML = "", L(d), k && g(d));
                for (m in b) delete b[m]
            },
            isReadyToRender: function() {
                var a = this;
                return A || M != M.top || "complete" === d.readyState ? !0 : (d.attachEvent("onreadystatechange", function() {
                    d.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === d.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function() {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    e(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    w(b.series || [], function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    e(a, "beforeRender");
                    l && (a.pointer = new l(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.cloneRenderTo(!0)
                }
            },
            onload: function() {
                w([this.callback].concat(this.callbacks), function(a) {
                    a && void 0 !== this.index &&
                        a.apply(this, [this])
                }, this);
                e(this, "load");
                n(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        }
    })(K);
    (function(a) {
        var z, D = a.each,
            C = a.extend,
            B = a.erase,
            d = a.fireEvent,
            h = a.format,
            q = a.isArray,
            t = a.isNumber,
            g = a.pick,
            p = a.removeEvent;
        z = a.Point = function() {};
        z.prototype = {
            init: function(a, d, h) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d, h);
                a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter], d = d.length, h = a.colorCounter,
                    a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : h = a.colorIndex;
                this.colorIndex = g(this.colorIndex, h);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function(a, d) {
                var f = this.series,
                    n = f.options.pointValKey || f.pointValKey;
                a = z.prototype.optionsToObject.call(this, a);
                C(this, a);
                this.options = this.options ? C(this.options, a) : a;
                a.group && delete this.group;
                n && (this.y = this[n]);
                this.isNull = g(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 ===
                    d && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
                void 0 === this.x && f && (this.x = void 0 === d ? f.autoIncrement(this) : d);
                return this
            },
            optionsToObject: function(a) {
                var d = {},
                    f = this.series,
                    g = f.options.keys,
                    k = g || f.pointArrayMap || ["y"],
                    e = k.length,
                    c = 0,
                    b = 0;
                if (t(a) || null === a) d[k[0]] = a;
                else if (q(a))
                    for (!g && a.length > e && (f = typeof a[0], "string" === f ? d.name = a[0] : "number" === f && (d.x = a[0]), c++); b < e;) g && void 0 === a[c] || (d[k[b]] = a[c]), c++, b++;
                else "object" === typeof a && (d = a, a.dataLabels && (f._hasPointLabels = !0), a.marker &&
                    (f._hasPointMarkers = !0));
                return d
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className : "")
            },
            getZone: function() {
                var a = this.series,
                    d = a.zones,
                    a = a.zoneAxis || "y",
                    g = 0,
                    h;
                for (h = d[g]; this[a] >= h.value;) h = d[++g];
                h && h.color && !this.options.color && (this.color = h.color);
                return h
            },
            destroy: function() {
                var a = this.series.chart,
                    d = a.hoverPoints,
                    g;
                a.pointCount--;
                d && (this.setState(), B(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) p(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this) this[g] = null
            },
            destroyElements: function() {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, g = 6; g--;) d = a[g], this[d] &&
                    (this[d] = this[d].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var d = this.series,
                    f = d.tooltipOptions,
                    p = g(f.valueDecimals, ""),
                    k = f.valuePrefix || "",
                    e = f.valueSuffix || "";
                D(d.pointArrayMap || ["y"], function(c) {
                    c = "{point." + c;
                    if (k || e) a = a.replace(c + "}", k + c + "}" + e);
                    a = a.replace(c + "}", c + ":,." + p + "f}")
                });
                return h(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function(a, g, h) {
                var f = this,
                    k = this.series.options;
                (k.point.events[a] || f.options && f.options.events && f.options.events[a]) && this.importEvents();
                "click" === a && k.allowPointSelect && (h = function(a) {
                    f.select && f.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                d(this, a, g, h)
            },
            visible: !0
        }
    })(K);
    (function(a) {
        var z = a.addEvent,
            D = a.animObject,
            C = a.arrayMax,
            B = a.arrayMin,
            d = a.correctFloat,
            h = a.Date,
            q = a.defaultOptions,
            t = a.defaultPlotOptions,
            g = a.defined,
            p = a.each,
            f = a.erase,
            n = a.extend,
            w = a.fireEvent,
            v = a.grep,
            k = a.isArray,
            e = a.isNumber,
            c = a.isString,
            b = a.merge,
            F = a.pick,
            u = a.removeEvent,
            r = a.splat,
            y = a.SVGElement,
            G = a.syncTimeout,
            I = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null ===
                        this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a,
                b) {
                var c = this,
                    d, e, l = a.series,
                    k;
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                n(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                e = b.events;
                for (d in e) z(c, d, e[d]);
                if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                p(c.parallelArrays, function(a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                l.length && (k = l[l.length - 1]);
                c._i = F(k && k._i, -1) + 1;
                for (a =
                    this.insert(l); a < l.length; a++) l[a].index = a, l[a].name = l[a].name || "Series " + (l[a].index + 1)
            },
            insert: function(a) {
                var b = this.options.index,
                    c;
                if (e(b)) {
                    for (c = a.length; c--;)
                        if (b >= F(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return F(c, a.length - 1)
            },
            bindAxes: function() {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e;
                p(b.axisTypes || [], function(l) {
                    p(d[l], function(a) {
                        e = a.options;
                        if (c[l] === e.index || void 0 !== c[l] && c[l] === e.id || void 0 === c[l] && 0 === e.index) b.insert(a.series),
                            b[l] = a, a.isDirty = !0
                    });
                    b[l] || b.optionalAxis === l || a.error(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var c = a.series,
                    d = arguments,
                    l = e(b) ? function(d) {
                        var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
                        c[d + "Data"][b] = e
                    } : function(a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                p(c.parallelArrays, l)
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    b = F(b, a.pointStart, 0);
                this.pointInterval = c = F(this.pointInterval, a.pointInterval, 1);
                d && (a = new h(b), "day" ===
                    d ? a = +a[h.hcSetDate](a[h.hcGetDate]() + c) : "month" === d ? a = +a[h.hcSetMonth](a[h.hcGetMonth]() + c) : "year" === d && (a = +a[h.hcSetFullYear](a[h.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function(a) {
                var c = this.chart,
                    d = c.options.plotOptions,
                    c = c.userOptions || {},
                    e = c.plotOptions || {},
                    l = d[this.type];
                this.userOptions = a;
                d = b(l, d.series, a);
                this.tooltipOptions = b(q.tooltip, q.plotOptions[this.type].tooltip, c.tooltip, e.series && e.series.tooltip, e[this.type] && e[this.type].tooltip, a.tooltip);
                null === l.marker &&
                    delete d.marker;
                this.zoneAxis = d.zoneAxis;
                a = this.zones = (d.zones || []).slice();
                !d.negativeColor && !d.negativeFillColor || d.zones || a.push({
                    value: d[this.zoneAxis + "Threshold"] || d.threshold || 0,
                    className: "highcharts-negative",
                    color: d.negativeColor,
                    fillColor: d.negativeFillColor
                });
                a.length && g(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return d
            },
            getCyclic: function(a, b, c) {
                var d, e = this.userOptions,
                    l = a + "Index",
                    k = a + "Counter",
                    f = c ? c.length : F(this.chart.options.chart[a + "Count"], this.chart[a +
                        "Count"]);
                b || (d = F(e[l], e["_" + l]), g(d) || (e["_" + l] = d = this.chart[k] % f, this.chart[k] += 1), c && (b = c[d]));
                void 0 !== d && (this[l] = d);
                this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function(b, d, f, g) {
                var l = this,
                    m = l.points,
                    n = m && m.length ||
                    0,
                    h, r = l.options,
                    x = l.chart,
                    u = null,
                    y = l.xAxis,
                    v = r.turboThreshold,
                    q = this.xData,
                    t = this.yData,
                    I = (h = l.pointArrayMap) && h.length;
                b = b || [];
                h = b.length;
                d = F(d, !0);
                if (!1 !== g && h && n === h && !l.cropped && !l.hasGroupedData && l.visible) p(b, function(a, b) {
                    m[b].update && a !== r.data[b] && m[b].update(a, !1, null, !1)
                });
                else {
                    l.xIncrement = null;
                    l.colorCounter = 0;
                    p(this.parallelArrays, function(a) {
                        l[a + "Data"].length = 0
                    });
                    if (v && h > v) {
                        for (f = 0; null === u && f < h;) u = b[f], f++;
                        if (e(u))
                            for (f = 0; f < h; f++) q[f] = this.autoIncrement(), t[f] = b[f];
                        else if (k(u))
                            if (I)
                                for (f =
                                    0; f < h; f++) u = b[f], q[f] = u[0], t[f] = u.slice(1, I + 1);
                            else
                                for (f = 0; f < h; f++) u = b[f], q[f] = u[0], t[f] = u[1];
                        else a.error(12)
                    } else
                        for (f = 0; f < h; f++) void 0 !== b[f] && (u = {
                            series: l
                        }, l.pointClass.prototype.applyOptions.apply(u, [b[f]]), l.updateParallelArrays(u, f));
                    c(t[0]) && a.error(14, !0);
                    l.data = [];
                    l.options.data = l.userOptions.data = b;
                    for (f = n; f--;) m[f] && m[f].destroy && m[f].destroy();
                    y && (y.minRange = y.userMinRange);
                    l.isDirty = x.isDirtyBox = !0;
                    l.isDirtyData = !!m;
                    f = !1
                }
                "point" === r.legendType && (this.processData(), this.generatePoints());
                d && x.redraw(f)
            },
            processData: function(b) {
                var c = this.xData,
                    d = this.yData,
                    e = c.length,
                    l;
                l = 0;
                var m, k, f = this.xAxis,
                    g, n = this.options;
                g = n.cropThreshold;
                var h = this.getExtremesFromAll || n.getExtremesFromAll,
                    r = this.isCartesian,
                    n = f && f.val2lin,
                    p = f && f.isLog,
                    u, y;
                if (r && !this.isDirty && !f.isDirty && !this.yAxis.isDirty && !b) return !1;
                f && (b = f.getExtremes(), u = b.min, y = b.max);
                if (r && this.sorted && !h && (!g || e > g || this.forceCrop))
                    if (c[e - 1] < u || c[0] > y) c = [], d = [];
                    else if (c[0] < u || c[e - 1] > y) l = this.cropData(this.xData, this.yData, u, y), c = l.xData,
                    d = l.yData, l = l.start, m = !0;
                for (g = c.length || 1; --g;) e = p ? n(c[g]) - n(c[g - 1]) : c[g] - c[g - 1], 0 < e && (void 0 === k || e < k) ? k = e : 0 > e && this.requireSorting && a.error(15);
                this.cropped = m;
                this.cropStart = l;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = k
            },
            cropData: function(a, b, c, d) {
                var e = a.length,
                    l = 0,
                    k = e,
                    f = F(this.cropShoulder, 1),
                    g;
                for (g = 0; g < e; g++)
                    if (a[g] >= c) {
                        l = Math.max(0, g - f);
                        break
                    }
                for (c = g; c < e; c++)
                    if (a[c] > d) {
                        k = c + f;
                        break
                    }
                return {
                    xData: a.slice(l, k),
                    yData: b.slice(l, k),
                    start: l,
                    end: k
                }
            },
            generatePoints: function() {
                var a =
                    this.options.data,
                    b = this.data,
                    c, d = this.processedXData,
                    e = this.processedYData,
                    m = this.pointClass,
                    k = d.length,
                    f = this.cropStart || 0,
                    g, n = this.hasGroupedData,
                    h, p = [],
                    u;
                b || n || (b = [], b.length = a.length, b = this.data = b);
                for (u = 0; u < k; u++) g = f + u, n ? (h = (new m).init(this, [d[u]].concat(r(e[u]))), h.dataGroup = this.groupMap[u]) : (h = b[g]) || void 0 === a[g] || (b[g] = h = (new m).init(this, a[g], d[u])), h.index = g, p[u] = h;
                if (b && (k !== (c = b.length) || n))
                    for (u = 0; u < c; u++) u !== f || n || (u += k), b[u] && (b[u].destroyElements(), b[u].plotX = void 0);
                this.data =
                    b;
                this.points = p
            },
            getExtremes: function(a) {
                var b = this.yAxis,
                    c = this.processedXData,
                    d, l = [],
                    m = 0;
                d = this.xAxis.getExtremes();
                var f = d.min,
                    g = d.max,
                    n, h, r, p;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (p = 0; p < d; p++)
                    if (h = c[p], r = a[p], n = (e(r, !0) || k(r)) && (!b.isLog || r.length || 0 < r), h = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[p + 1] || h) >= f && (c[p - 1] || h) <= g, n && h)
                        if (n = r.length)
                            for (; n--;) null !== r[n] && (l[m++] = r[n]);
                        else l[m++] = r;
                this.dataMin = B(l);
                this.dataMax = C(l)
            },
            translate: function() {
                this.processedXData ||
                    this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    c = this.xAxis,
                    k = c.categories,
                    f = this.yAxis,
                    m = this.points,
                    n = m.length,
                    h = !!this.modifyValue,
                    r = a.pointPlacement,
                    p = "between" === r || e(r),
                    u = a.threshold,
                    y = a.startFromThreshold ? u : 0,
                    v, q, t, I, w = Number.MAX_VALUE;
                "between" === r && (r = .5);
                e(r) && (r *= F(a.pointRange || c.pointRange));
                for (a = 0; a < n; a++) {
                    var G = m[a],
                        B = G.x,
                        z = G.y;
                    q = G.low;
                    var C = b && f.stacks[(this.negStacks && z < (y ? 0 : u) ? "-" : "") + this.stackKey],
                        D;
                    f.isLog && null !== z && 0 >= z && (G.isNull = !0);
                    G.plotX = v = d(Math.min(Math.max(-1E5,
                        c.translate(B, 0, 0, 0, 1, r, "flags" === this.type)), 1E5));
                    b && this.visible && !G.isNull && C && C[B] && (I = this.getStackIndicator(I, B, this.index), D = C[B], z = D.points[I.key], q = z[0], z = z[1], q === y && I.key === C[B].base && (q = F(u, f.min)), f.isLog && 0 >= q && (q = null), G.total = G.stackTotal = D.total, G.percentage = D.total && G.y / D.total * 100, G.stackY = z, D.setOffset(this.pointXOffset || 0, this.barW || 0));
                    G.yBottom = g(q) ? f.translate(q, 0, 1, 0, 1) : null;
                    h && (z = this.modifyValue(z, G));
                    G.plotY = q = "number" === typeof z && Infinity !== z ? Math.min(Math.max(-1E5, f.translate(z,
                        0, 1, 0, 1)), 1E5) : void 0;
                    G.isInside = void 0 !== q && 0 <= q && q <= f.len && 0 <= v && v <= c.len;
                    G.clientX = p ? d(c.translate(B, 0, 0, 0, 1, r)) : v;
                    G.negative = G.y < (u || 0);
                    G.category = k && void 0 !== k[G.x] ? k[G.x] : G.x;
                    G.isNull || (void 0 !== t && (w = Math.min(w, Math.abs(v - t))), t = v);
                    G.zone = this.zones.length && G.getZone()
                }
                this.closestPointRangePx = w
            },
            getValidPoints: function(a, b) {
                var c = this.chart;
                return v(a || this.points || [], function(a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    e = b.inverted,
                    l = this.clipBox,
                    k = l || b.clipBox,
                    f = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, k.height, c.xAxis, c.yAxis].join(),
                    g = b[f],
                    n = b[f + "m"];
                g || (a && (k.width = 0, b[f + "m"] = n = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[f] = g = d.clipRect(k), g.count = {
                    length: 0
                });
                a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || l ? g : b.clipRect), this.markerGroup.clip(n), this.sharedClipKey = f);
                a || (g.count[this.index] &&
                    (delete g.count[this.index], --g.count.length), 0 === g.count.length && f && b[f] && (l || (b[f] = b[f].destroy()), b[f + "m"] && (b[f + "m"] = b[f + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = D(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                w(this, "afterAnimate")
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    c, d, k, m, f = this.options.marker,
                    g, n, h, r, p = this.markerGroup,
                    u = F(f.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * f.radius);
                if (!1 !== f.enabled || this._hasPointMarkers)
                    for (d = a.length; d--;) k = a[d], c = k.plotY, m = k.graphic, g = k.marker || {}, n = !!k.marker, h = u && void 0 === g.enabled || g.enabled, r = k.isInside, h && e(c) && null !== k.y ? (c = F(g.symbol, this.symbol), k.hasImage = 0 === c.indexOf("url"), h = this.markerAttribs(k, k.selected && "select"), m ? m[r ? "show" : "hide"](!0).animate(h) : r && (0 < h.width || k.hasImage) && (k.graphic = m = b.renderer.symbol(c, h.x, h.y,
                        h.width, h.height, n ? g : f).add(p)), m && m.attr(this.pointAttribs(k, k.selected && "select")), m && m.addClass(k.getClassName(), !0)) : m && (k.graphic = m.destroy())
            },
            markerAttribs: function(a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    e = d && d.marker || {},
                    d = F(e.radius, c.radius);
                b && (c = c.states[b], b = e.states && e.states[b], d = F(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
                a.hasImage && (d = 0);
                a = {
                    x: Math.floor(a.plotX) - d,
                    y: a.plotY - d
                };
                d && (a.width = a.height = 2 * d);
                return a
            },
            pointAttribs: function(a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    e = d && d.marker || {},
                    l = this.color,
                    k = d && d.color,
                    f = a && a.color,
                    d = F(e.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                l = k || a || f || l;
                a = e.fillColor || c.fillColor || l;
                l = e.lineColor || c.lineColor || l;
                b && (c = c.states[b], b = e.states && e.states[b] || {}, d = F(b.lineWidth, c.lineWidth, d + F(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, l = b.lineColor || c.lineColor || l);
                return {
                    stroke: l,
                    "stroke-width": d,
                    fill: a
                }
            },
            destroy: function() {
                var a = this,
                    b = a.chart,
                    c = /AppleWebKit\/533/.test(I.navigator.userAgent),
                    d, e = a.data || [],
                    k, g, n;
                w(a, "destroy");
                u(a);
                p(a.axisTypes || [], function(b) {
                    (n = a[b]) && n.series && (f(n.series, a), n.isDirty = n.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (d = e.length; d--;)(k = e[d]) && k.destroy && k.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (g in a) a[g] instanceof y && !a[g].survive && (d = c && "group" === g ? "hide" : "destroy", a[g][d]());
                b.hoverSeries === a && (b.hoverSeries = null);
                f(b.series, a);
                for (g in a) delete a[g]
            },
            getGraphPath: function(a, b, c) {
                var d = this,
                    e = d.options,
                    l =
                    e.step,
                    k, f = [],
                    n = [],
                    h;
                a = a || d.points;
                (k = a.reversed) && a.reverse();
                (l = {
                    right: 1,
                    center: 2
                }[l] || l && 3) && k && (l = 4 - l);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                p(a, function(k, m) {
                    var r = k.plotX,
                        p = k.plotY,
                        u = a[m - 1];
                    (k.leftCliff || u && u.rightCliff) && !c && (h = !0);
                    k.isNull && !g(b) && 0 < m ? h = !e.connectNulls : k.isNull && !b ? h = !0 : (0 === m || h ? m = ["M", k.plotX, k.plotY] : d.getPointSpline ? m = d.getPointSpline(a, k, m) : l ? (m = 1 === l ? ["L", u.plotX, p] : 2 === l ? ["L", (u.plotX + r) / 2, u.plotY, "L", (u.plotX + r) / 2, p] : ["L", r, u.plotY], m.push("L", r, p)) : m = ["L", r, p], n.push(k.x), l && n.push(k.x), f.push.apply(f, m), h = !1)
                });
                f.xMap = n;
                return d.graphPath = f
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    d = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ];
                p(this.zones, function(c, e) {
                    d.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
                });
                p(d, function(d, e) {
                    var l = d[0],
                        k = a[l];
                    k ? (k.endX = c.xMap, k.animate({
                            d: c
                        })) : c.length &&
                        (a[l] = a.chart.renderer.path(c).addClass(d[1]).attr({
                            zIndex: 1
                        }).add(a.group), k = {
                            stroke: d[2],
                            "stroke-width": b.lineWidth,
                            fill: a.fillGraph && a.color || "none"
                        }, d[3] ? k.dashstyle = d[3] : "square" !== b.linecap && (k["stroke-linecap"] = k["stroke-linejoin"] = "round"), k = a[l].attr(k).shadow(2 > e && b.shadow));
                    k && (k.startX = c.xMap, k.isArea = c.isArea)
                })
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    e, k, f = this.clips || [],
                    g, n = this.graph,
                    h = this.area,
                    r = Math.max(b.chartWidth, b.chartHeight),
                    u = this[(this.zoneAxis ||
                        "y") + "Axis"],
                    y, v, q = b.inverted,
                    t, I, w, G, B = !1;
                d.length && (n || h) && u && void 0 !== u.min && (v = u.reversed, t = u.horiz, n && n.hide(), h && h.hide(), y = u.getExtremes(), p(d, function(d, l) {
                    e = v ? t ? b.plotWidth : 0 : t ? 0 : u.toPixels(y.min);
                    e = Math.min(Math.max(F(k, e), 0), r);
                    k = Math.min(Math.max(Math.round(u.toPixels(F(d.value, y.max), !0)), 0), r);
                    B && (e = k = u.toPixels(y.max));
                    I = Math.abs(e - k);
                    w = Math.min(e, k);
                    G = Math.max(e, k);
                    u.isXAxis ? (g = {
                        x: q ? G : w,
                        y: 0,
                        width: I,
                        height: r
                    }, t || (g.x = b.plotHeight - g.x)) : (g = {
                        x: 0,
                        y: q ? G : w,
                        width: r,
                        height: I
                    }, t && (g.y = b.plotWidth -
                        g.y));
                    q && c.isVML && (g = u.isXAxis ? {
                        x: 0,
                        y: v ? w : G,
                        height: g.width,
                        width: b.chartWidth
                    } : {
                        x: g.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: g.height,
                        height: b.chartHeight
                    });
                    f[l] ? f[l].animate(g) : (f[l] = c.clipRect(g), n && a["zone-graph-" + l].clip(f[l]), h && a["zone-area-" + l].clip(f[l]));
                    B = d.value > y.max
                }), this.clips = f)
            },
            invertGroups: function(a) {
                function b() {
                    var b = {
                        width: c.yAxis.len,
                        height: c.xAxis.len
                    };
                    p(["group", "markerGroup"], function(d) {
                        c[d] && c[d].attr(b).invert(a)
                    })
                }
                var c = this,
                    d;
                c.xAxis && (d = z(c.chart, "resize", b), z(c, "destroy",
                    d), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, d, e) {
                var l = this[a],
                    k = !l;
                k && (this[a] = l = this.chart.renderer.g(b).attr({
                    zIndex: d || .1
                }).add(e), l.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                l.attr({
                    visibility: c
                })[k ? "attr" : "animate"](this.getPlotBox());
                return l
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ?
                        c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, d = a.options,
                    e = !!a.animate && b.renderer.isSVG && D(d.animation).duration,
                    k = a.visible ? "inherit" : "hidden",
                    f = d.zIndex,
                    g = a.hasRendered,
                    n = b.seriesGroup,
                    h = b.inverted;
                c = a.plotGroup("group", "series", k, f, n);
                a.markerGroup = a.plotGroup("markerGroup", "markers", k, f, n);
                e && a.animate(!0);
                c.inverted = a.isCartesian ? h : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !==
                    a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(h);
                !1 === d.clip || a.sharedClipKey || g || c.clip(b.clipRect);
                e && a.animate();
                g || (a.animationTimeout = G(function() {
                    a.afterAnimate()
                }, e));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: F(d && d.left, a.plotLeft),
                    translateY: F(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c, d, e) {
                    var k, l;
                    if (l = c && c.length) return k = b.kdAxisArray[d % e], c.sort(function(a, b) {
                        return a[k] - b[k]
                    }), l = Math.floor(l / 2), {
                        point: c[l],
                        left: a(c.slice(0, l), d + 1, e),
                        right: a(c.slice(l + 1), d + 1, e)
                    }
                }
                var b = this,
                    c = b.kdDimensions;
                delete b.kdTree;
                G(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, f, m) {
                    var n = b.point,
                        h = d.kdAxisArray[f % m],
                        r, u, p = n;
                    u = g(a[e]) && g(n[e]) ? Math.pow(a[e] - n[e], 2) : null;
                    r = g(a[k]) && g(n[k]) ? Math.pow(a[k] - n[k], 2) : null;
                    r = (u || 0) + (r || 0);
                    n.dist = g(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    n.distX = g(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                    h = a[h] - n[h];
                    r = 0 > h ? "left" : "right";
                    u = 0 > h ? "right" : "left";
                    b[r] && (r = c(a, b[r], f + 1, m), p = r[l] <
                        p[l] ? r : n);
                    b[u] && Math.sqrt(h * h) < p[l] && (a = c(a, b[u], f + 1, m), p = a[l] < p[l] ? a : p);
                    return p
                }
                var d = this,
                    e = this.kdAxisArray[0],
                    k = this.kdAxisArray[1],
                    l = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        })
    })(K);
    (function(a) {
        var z = a.addEvent,
            D = a.animate,
            C = a.Axis,
            B = a.createElement,
            d = a.css,
            h = a.defined,
            q = a.each,
            t = a.erase,
            g = a.extend,
            p = a.fireEvent,
            f = a.inArray,
            n = a.isNumber,
            w = a.isObject,
            v = a.merge,
            k = a.pick,
            e = a.Point,
            c = a.Series,
            b = a.seriesTypes,
            F = a.setAnimation,
            u = a.splat;
        g(a.Chart.prototype, {
            addSeries: function(a, b, c) {
                var d, e = this;
                a && (b = k(b, !0), p(e, "addSeries", {
                    options: a
                }, function() {
                    d = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    b && e.redraw(c)
                }));
                return d
            },
            addAxis: function(a, b, c, d) {
                var e = b ? "xAxis" : "yAxis",
                    f = this.options;
                a = v(a, {
                    index: this[e].length,
                    isX: b
                });
                new C(this, a);
                f[e] = u(f[e] || {});
                f[e].push(a);
                k(c, !0) && this.redraw(d)
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    e = b.loadingDiv,
                    k = c.loading,
                    f = function() {
                        e && d(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop +
                                "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = B("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = B("span", {
                    className: "highcharts-loading-inner"
                }, null, e), z(b, "redraw", f));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                d(e, g(k.style, {
                    zIndex: 10
                }));
                d(b.loadingSpan, k.labelStyle);
                b.loadingShown || (d(e, {
                    opacity: 0,
                    display: ""
                }), D(e, {
                    opacity: k.style.opacity || .5
                }, {
                    duration: k.showDuration || 0
                }));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", D(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        d(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),
            update: function(a, b) {
                var c, d = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    e = a.chart,
                    g, r;
                if (e) {
                    v(!0, this.options.chart, e);
                    "className" in e && this.setClassName(e.className);
                    if ("inverted" in e || "polar" in e) this.propFromSeries(), g = !0;
                    for (c in e) e.hasOwnProperty(c) && (-1 !== f("chart." + c, this.propsRequireUpdateSeries) && (r = !0), -1 !== f(c, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in e && this.renderer.setStyle(e.style)
                }
                for (c in a) {
                    if (this[c] && "function" === typeof this[c].update) this[c].update(a[c], !1);
                    else if ("function" === typeof this[d[c]]) this[d[c]](a[c]);
                    "chart" !== c && -1 !== f(c, this.propsRequireUpdateSeries) && (r = !0)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && v(!0, this.options.plotOptions, a.plotOptions);
                q(["xAxis", "yAxis", "series"], function(b) {
                    a[b] && q(u(a[b]), function(a) {
                        var c = h(a.id) && this.get(a.id) || this[b][0];
                        c && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                g && q(this.axes, function(a) {
                    a.update({}, !1)
                });
                r && q(this.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && v(!0, this.options.loading, a.loading);
                c = e && e.width;
                e = e && e.height;
                n(c) && c !== this.chartWidth || n(e) && e !== this.chartHeight ? this.setSize(c, e) : k(b, !0) && this.redraw()
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a)
            }
        });
        g(e.prototype, {
            update: function(a, b, c, d) {
                function e() {
                    f.applyOptions(a);
                    null === f.y && n && (f.graphic = n.destroy());
                    w(a, !0) && (n && n.element && a && a.marker && a.marker.symbol && (f.graphic = n.destroy()),
                        a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));
                    h = f.index;
                    g.updateParallelArrays(f, h);
                    r.data[h] = w(r.data[h], !0) ? f.options : a;
                    g.isDirty = g.isDirtyData = !0;
                    !g.fixedBox && g.hasCartesianSeries && (m.isDirtyBox = !0);
                    "point" === r.legendType && (m.isDirtyLegend = !0);
                    b && m.redraw(c)
                }
                var f = this,
                    g = f.series,
                    n = f.graphic,
                    h, m = g.chart,
                    r = g.options;
                b = k(b, !0);
                !1 === d ? e() : f.firePointEvent("update", {
                    options: a
                }, e)
            },
            remove: function(a, b) {
                this.series.removePoint(f(this, this.series.data), a, b)
            }
        });
        g(c.prototype, {
            addPoint: function(a,
                b, c, d) {
                var e = this.options,
                    f = this.data,
                    g = this.chart,
                    n = this.xAxis && this.xAxis.names,
                    h = e.data,
                    m, r, u = this.xData,
                    p, v;
                b = k(b, !0);
                m = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(m, [a]);
                v = m.x;
                p = u.length;
                if (this.requireSorting && v < u[p - 1])
                    for (r = !0; p && u[p - 1] > v;) p--;
                this.updateParallelArrays(m, "splice", p, 0, 0);
                this.updateParallelArrays(m, p);
                n && m.name && (n[v] = m.name);
                h.splice(p, 0, a);
                r && (this.data.splice(p, 0, null), this.processData());
                "point" === e.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ?
                    f[0].remove(!1) : (f.shift(), this.updateParallelArrays(m, "shift"), h.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(d)
            },
            removePoint: function(a, b, c) {
                var d = this,
                    e = d.data,
                    f = e[a],
                    g = d.points,
                    n = d.chart,
                    h = function() {
                        g && g.length === e.length && g.splice(a, 1);
                        e.splice(a, 1);
                        d.options.data.splice(a, 1);
                        d.updateParallelArrays(f || {
                            series: d
                        }, "splice", a, 1);
                        f && f.destroy();
                        d.isDirty = !0;
                        d.isDirtyData = !0;
                        b && n.redraw()
                    };
                F(c, n);
                b = k(b, !0);
                f ? f.firePointEvent("remove", null, h) : h()
            },
            remove: function(a, b, c) {
                function d() {
                    e.destroy();
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    k(a, !0) && f.redraw(b)
                }
                var e = this,
                    f = e.chart;
                !1 !== c ? p(e, "remove", null, d) : d()
            },
            update: function(a, c) {
                var d = this,
                    e = this.chart,
                    f = this.userOptions,
                    n = this.type,
                    h = a.type || f.type || e.options.chart.type,
                    r = b[n].prototype,
                    p = ["group", "markerGroup", "dataLabelsGroup"],
                    m;
                if (h && h !== n || void 0 !== a.zIndex) p.length = 0;
                q(p, function(a) {
                    p[a] = d[a];
                    delete d[a]
                });
                a = v(f, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a);
                this.remove(!1, null, !1);
                for (m in r) this[m] =
                    void 0;
                g(this, b[h || n].prototype);
                q(p, function(a) {
                    d[a] = p[a]
                });
                this.init(e, a);
                e.linkSeries();
                k(c, !0) && e.redraw(!1)
            }
        });
        g(C.prototype, {
            update: function(a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = v(this.userOptions, a);
                this.destroy(!0);
                this.init(c, g(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                k(b, !0) && c.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) d[e] && d[e].remove(!1);
                t(b.axes, this);
                t(b[c], this);
                b.options[c].splice(this.options.index, 1);
                q(b[c],
                    function(a, b) {
                        a.options.index = b
                    });
                this.destroy();
                b.isDirtyBox = !0;
                k(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(K);
    (function(a) {
        var z = a.animObject,
            D = a.color,
            C = a.each,
            B = a.extend,
            d = a.isNumber,
            h = a.merge,
            q = a.pick,
            t = a.Series,
            g = a.seriesType,
            p = a.svg;
        g("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                t.prototype.init.apply(this, arguments);
                var a = this,
                    d = a.chart;
                d.hasRendered && C(d.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    d = a.options,
                    g = a.xAxis,
                    h = a.yAxis,
                    k = g.reversed,
                    e, c = {},
                    b = 0;
                !1 === d.grouping ? b = 1 : C(a.chart.series, function(d) {
                    var k = d.options,
                        f = d.yAxis,
                        l;
                    d.type === a.type && d.visible && h.len === f.len && h.pos === f.pos && (k.stacking ? (e = d.stackKey, void 0 === c[e] && (c[e] = b++), l = c[e]) : !1 !== k.grouping && (l = b++), d.columnIndex = l)
                });
                var p = Math.min(Math.abs(g.transA) * (g.ordinalSlope || d.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
                    u = p * d.groupPadding,
                    r = (p - 2 * u) / b,
                    d = Math.min(d.maxPointWidth || g.len, q(d.pointWidth, r * (1 - 2 * d.pointPadding)));
                a.columnMetrics = {
                    width: d,
                    offset: (r - d) / 2 + (u + ((a.columnIndex || 0) + (k ? 1 : 0)) * r - p / 2) * (k ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, d, g, h) {
                var k = this.chart,
                    e = this.borderWidth,
                    c = -(e % 2 ? .5 : 0),
                    e = e % 2 ? .5 : 1;
                k.inverted && k.renderer.isVML && (e += 1);
                g = Math.round(a + g) + c;
                a = Math.round(a) + c;
                h = Math.round(d + h) + e;
                c = .5 >= Math.abs(d) && .5 < h;
                d = Math.round(d) + e;
                h -= d;
                c && h && (--d, h += 1);
                return {
                    x: a,
                    y: d,
                    width: g - a,
                    height: h
                }
            },
            translate: function() {
                var a = this,
                    d = a.chart,
                    g = a.options,
                    h = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    h = a.borderWidth = q(g.borderWidth,
                        h ? 0 : 1),
                    k = a.yAxis,
                    e = a.translatedThreshold = k.getThreshold(g.threshold),
                    c = q(g.minPointLength, 5),
                    b = a.getColumnMetrics(),
                    p = b.width,
                    u = a.barW = Math.max(p, 1 + 2 * h),
                    r = a.pointXOffset = b.offset;
                d.inverted && (e -= .5);
                g.pointPadding && (u = Math.ceil(u));
                t.prototype.translate.apply(a);
                C(a.points, function(b) {
                    var f = q(b.yBottom, e),
                        g = 999 + Math.abs(f),
                        g = Math.min(Math.max(-g, b.plotY), k.len + g),
                        l = b.plotX + r,
                        h = u,
                        n = Math.min(g, f),
                        v, y = Math.max(g, f) - n;
                    Math.abs(y) < c && c && (y = c, v = !k.reversed && !b.negative || k.reversed && b.negative, n = Math.abs(n -
                        e) > c ? f - c : e - (v ? c : 0));
                    b.barX = l;
                    b.pointWidth = p;
                    b.tooltipPos = d.inverted ? [k.len + k.pos - d.plotLeft - g, a.xAxis.len - l - h / 2, y] : [l + h / 2, g + k.pos - d.plotTop, y];
                    b.shapeType = "rect";
                    b.shapeArgs = a.crispCol.apply(a, b.isNull ? [b.plotX, k.len / 2, 0, 0] : [l, n, h, y])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, d) {
                var f = this.options,
                    g, k = this.pointAttrToOptions || {};
                g = k.stroke || "borderColor";
                var e = k["stroke-width"] || "borderWidth",
                    c = a && a.color || this.color,
                    b = a[g] || f[g] || this.color || c,
                    h = a[e] || f[e] || this[e] || 0,
                    k = f.dashStyle;
                a && this.zones.length && (c = (c = a.getZone()) && c.color || a.options.color || this.color);
                d && (a = f.states[d], d = a.brightness, c = a.color || void 0 !== d && D(c).brighten(a.brightness).get() || c, b = a[g] || b, h = a[e] || h, k = a.dashStyle || k);
                g = {
                    fill: c,
                    stroke: b,
                    "stroke-width": h
                };
                f.borderRadius && (g.r = f.borderRadius);
                k && (g.dashstyle = k);
                return g
            },
            drawPoints: function() {
                var a = this,
                    g = this.chart,
                    p = a.options,
                    v = g.renderer,
                    k = p.animationLimit || 250,
                    e;
                C(a.points, function(c) {
                    var b = c.graphic;
                    if (d(c.plotY) && null !== c.y) {
                        e = c.shapeArgs;
                        if (b) b[g.pointCount < k ? "animate" : "attr"](h(e));
                        else c.graphic = b = v[c.shapeType](e).attr({
                            "class": c.getClassName()
                        }).add(c.group || a.group);
                        b.attr(a.pointAttribs(c, c.selected && "select")).shadow(p.shadow, null, p.stacking && !p.borderRadius)
                    } else b && (c.graphic = b.destroy())
                })
            },
            animate: function(a) {
                var d = this,
                    f = this.yAxis,
                    g = d.options,
                    k = this.chart.inverted,
                    e = {};
                p && (a ? (e.scaleY = .001, a = Math.min(f.pos +
                    f.len, Math.max(f.pos, f.toPixels(g.threshold))), k ? e.translateX = a - f.len : e.translateY = a, d.group.attr(e)) : (e[k ? "translateX" : "translateY"] = f.pos, d.group.animate(e, B(z(d.options.animation), {
                    step: function(a, b) {
                        d.group.attr({
                            scaleY: Math.max(.001, b.pos)
                        })
                    }
                })), d.animate = null))
            },
            remove: function() {
                var a = this,
                    d = a.chart;
                d.hasRendered && C(d.series, function(d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                t.prototype.remove.apply(a, arguments)
            }
        })
    })(K);
    (function(a) {
        var z = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function() {
                this.options.lineWidth && z.prototype.drawGraph.call(this)
            }
        })
    })(K);
    (function(a) {
        var z = a.addEvent,
            D = a.arrayMax,
            C = a.defined,
            B = a.each,
            d = a.extend,
            h = a.format,
            q = a.map,
            t = a.merge,
            g = a.noop,
            p = a.pick,
            f = a.relativeLength,
            n = a.Series,
            w = a.seriesTypes,
            v = a.stableSort;
        a.distribute = function(a, d) {
            function c(a, b) {
                return a.target - b.target
            }
            var b, e = !0,
                k = a,
                f = [],
                g;
            g = 0;
            for (b = a.length; b--;) g += a[b].size;
            if (g > d) {
                v(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (g = b = 0; g <= d;) g += a[b].size, b++;
                f = a.splice(b - 1, a.length)
            }
            v(a, c);
            for (a = q(a, function(a) {
                    return {
                        size: a.size,
                        targets: [a.target]
                    }
                }); e;) {
                for (b =
                    a.length; b--;) e = a[b], g = (Math.min.apply(0, e.targets) + Math.max.apply(0, e.targets)) / 2, e.pos = Math.min(Math.max(0, g - e.size / 2), d - e.size);
                b = a.length;
                for (e = !1; b--;) 0 < b && a[b - 1].pos + a[b - 1].size > a[b].pos && (a[b - 1].size += a[b].size, a[b - 1].targets = a[b - 1].targets.concat(a[b].targets), a[b - 1].pos + a[b - 1].size > d && (a[b - 1].pos = d - a[b - 1].size), a.splice(b, 1), e = !0)
            }
            b = 0;
            B(a, function(a) {
                var c = 0;
                B(a.targets, function() {
                    k[b].pos = a.pos + c;
                    c += k[b].size;
                    b++
                })
            });
            k.push.apply(k, f);
            v(k, c)
        };
        n.prototype.drawDataLabels = function() {
            var a =
                this,
                e = a.options,
                c = e.dataLabels,
                b = a.points,
                f, g, n = a.hasRendered || 0,
                q, v, w = p(c.defer, !0),
                l = a.chart.renderer;
            if (c.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(c), v = a.plotGroup("dataLabelsGroup", "data-labels", w && !n ? "hidden" : "visible", c.zIndex || 6), w && (v.attr({
                opacity: +n
            }), n || z(a, "afterAnimate", function() {
                a.visible && v.show(!0);
                v[e.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), g = c, B(b, function(b) {
                var k, n = b.dataLabel,
                    r, m, u = b.connector,
                    y = !0,
                    x, w = {};
                f = b.dlOptions || b.options &&
                    b.options.dataLabels;
                k = p(f && f.enabled, g.enabled) && null !== b.y;
                if (n && !k) b.dataLabel = n.destroy();
                else if (k) {
                    c = t(g, f);
                    x = c.style;
                    k = c.rotation;
                    r = b.getLabelConfig();
                    q = c.format ? h(c.format, r) : c.formatter.call(r, c);
                    x.color = p(c.color, x.color, a.color, "#000000");
                    if (n) C(q) ? (n.attr({
                        text: q
                    }), y = !1) : (b.dataLabel = n = n.destroy(), u && (b.connector = u.destroy()));
                    else if (C(q)) {
                        n = {
                            fill: c.backgroundColor,
                            stroke: c.borderColor,
                            "stroke-width": c.borderWidth,
                            r: c.borderRadius || 0,
                            rotation: k,
                            padding: c.padding,
                            zIndex: 1
                        };
                        "contrast" ===
                        x.color && (w.color = c.inside || 0 > c.distance || e.stacking ? l.getContrast(b.color || a.color) : "#000000");
                        e.cursor && (w.cursor = e.cursor);
                        for (m in n) void 0 === n[m] && delete n[m];
                        n = b.dataLabel = l[k ? "text" : "label"](q, 0, -9999, c.shape, null, null, c.useHTML, null, "data-label").attr(n);
                        n.addClass("highcharts-data-label-color-" + b.colorIndex + " " + (c.className || "") + (c.useHTML ? "highcharts-tracker" : ""));
                        n.css(d(x, w));
                        n.add(v);
                        n.shadow(c.shadow)
                    }
                    n && a.alignDataLabel(b, n, c, null, y)
                }
            })
        };
        n.prototype.alignDataLabel = function(a, e, c, b,
            f) {
            var k = this.chart,
                g = k.inverted,
                h = p(a.plotX, -9999),
                n = p(a.plotY, -9999),
                q = e.getBBox(),
                l, v = c.rotation,
                t = c.align,
                w = this.visible && (a.series.forceDL || k.isInsidePlot(h, Math.round(n), g) || b && k.isInsidePlot(h, g ? b.x + 1 : b.y + b.height - 1, g)),
                F = "justify" === p(c.overflow, "justify");
            w && (l = c.style.fontSize, l = k.renderer.fontMetrics(l, e).b, b = d({
                x: g ? k.plotWidth - n : h,
                y: Math.round(g ? k.plotHeight - h : n),
                width: 0,
                height: 0
            }, b), d(c, {
                width: q.width,
                height: q.height
            }), v ? (F = !1, g = k.renderer.rotCorr(l, v), g = {
                x: b.x + c.x + b.width / 2 + g.x,
                y: b.y +
                    c.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    }[c.verticalAlign] * b.height
            }, e[f ? "attr" : "animate"](g).attr({
                align: t
            }), h = (v + 720) % 360, h = 180 < h && 360 > h, "left" === t ? g.y -= h ? q.height : 0 : "center" === t ? (g.x -= q.width / 2, g.y -= q.height / 2) : "right" === t && (g.x -= q.width, g.y -= h ? 0 : q.height)) : (e.align(c, null, b), g = e.alignAttr), F ? this.justifyDataLabel(e, c, g, q, b, f) : p(c.crop, !0) && (w = k.isInsidePlot(g.x, g.y) && k.isInsidePlot(g.x + q.width, g.y + q.height)), c.shape && !v && e.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            w || (e.attr({
                y: -9999
            }), e.placed = !1)
        };
        n.prototype.justifyDataLabel =
            function(a, d, c, b, f, g) {
                var e = this.chart,
                    k = d.align,
                    h = d.verticalAlign,
                    n, l, p = a.box ? 0 : a.padding || 0;
                n = c.x + p;
                0 > n && ("right" === k ? d.align = "left" : d.x = -n, l = !0);
                n = c.x + b.width - p;
                n > e.plotWidth && ("left" === k ? d.align = "right" : d.x = e.plotWidth - n, l = !0);
                n = c.y + p;
                0 > n && ("bottom" === h ? d.verticalAlign = "top" : d.y = -n, l = !0);
                n = c.y + b.height - p;
                n > e.plotHeight && ("top" === h ? d.verticalAlign = "bottom" : d.y = e.plotHeight - n, l = !0);
                l && (a.placed = !g, a.align(d, null, f))
            };
        w.pie && (w.pie.prototype.drawDataLabels = function() {
            var d = this,
                e = d.data,
                c, b = d.chart,
                f = d.options.dataLabels,
                g = p(f.connectorPadding, 10),
                h = p(f.connectorWidth, 1),
                v = b.plotWidth,
                t = b.plotHeight,
                w, l = f.distance,
                x = d.center,
                z = x[2] / 2,
                C = x[1],
                N = 0 < l,
                m, A, P, M, R = [
                    [],
                    []
                ],
                E, H, K, Q, O = [0, 0, 0, 0];
            d.visible && (f.enabled || d._hasPointLabels) && (n.prototype.drawDataLabels.apply(d), B(e, function(a) {
                a.dataLabel && a.visible && (R[a.half].push(a), a.dataLabel._pos = null)
            }), B(R, function(e, k) {
                var h, n, p = e.length,
                    u, r, y;
                if (p)
                    for (d.sortByAngle(e, k - .5), 0 < l && (h = Math.max(0, C - z - l), n = Math.min(C + z + l, b.plotHeight), u = q(e, function(a) {
                            if (a.dataLabel) return y =
                                a.dataLabel.getBBox().height || 21, {
                                    target: a.labelPos[1] - h + y / 2,
                                    size: y,
                                    rank: a.y
                                }
                        }), a.distribute(u, n + y - h)), Q = 0; Q < p; Q++) c = e[Q], P = c.labelPos, m = c.dataLabel, K = !1 === c.visible ? "hidden" : "inherit", r = P[1], u ? void 0 === u[Q].pos ? K = "hidden" : (M = u[Q].size, H = h + u[Q].pos) : H = r, E = f.justify ? x[0] + (k ? -1 : 1) * (z + l) : d.getX(H < h + 2 || H > n - 2 ? r : H, k), m._attr = {
                        visibility: K,
                        align: P[6]
                    }, m._pos = {
                        x: E + f.x + ({
                            left: g,
                            right: -g
                        }[P[6]] || 0),
                        y: H + f.y - 10
                    }, P.x = E, P.y = H, null === d.options.size && (A = m.width, E - A < g ? O[3] = Math.max(Math.round(A - E + g), O[3]) : E + A > v - g &&
                        (O[1] = Math.max(Math.round(E + A - v + g), O[1])), 0 > H - M / 2 ? O[0] = Math.max(Math.round(-H + M / 2), O[0]) : H + M / 2 > t && (O[2] = Math.max(Math.round(H + M / 2 - t), O[2])))
            }), 0 === D(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(), N && h && B(this.points, function(a) {
                var c;
                w = a.connector;
                if ((m = a.dataLabel) && m._pos && a.visible) {
                    K = m._attr.visibility;
                    if (c = !w) a.connector = w = b.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(d.dataLabelsGroup), w.attr({
                        "stroke-width": h,
                        stroke: f.connectorColor ||
                            a.color || "#666666"
                    });
                    w[c ? "attr" : "animate"]({
                        d: d.connectorPath(a.labelPos)
                    });
                    w.attr("visibility", K)
                } else w && (a.connector = w.destroy())
            }))
        }, w.pie.prototype.connectorPath = function(a) {
            var d = a.x,
                c = a.y;
            return p(this.options.dataLabels.softConnector, !0) ? ["M", d + ("left" === a[6] ? 5 : -5), c, "C", d, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", d + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, w.pie.prototype.placeDataLabels = function() {
            B(this.points, function(a) {
                var d = a.dataLabel;
                d && a.visible && ((a = d._pos) ?
                    (d.attr(d._attr), d[d.moved ? "animate" : "attr"](a), d.moved = !0) : d && d.attr({
                        y: -9999
                    }))
            })
        }, w.pie.prototype.alignDataLabel = g, w.pie.prototype.verifyDataLabelOverflow = function(a) {
            var d = this.center,
                c = this.options,
                b = c.center,
                g = c.minSize || 80,
                k, h;
            null !== b[0] ? k = Math.max(d[2] - Math.max(a[1], a[3]), g) : (k = Math.max(d[2] - a[1] - a[3], g), d[0] += (a[3] - a[1]) / 2);
            null !== b[1] ? k = Math.max(Math.min(k, d[2] - Math.max(a[0], a[2])), g) : (k = Math.max(Math.min(k, d[2] - a[0] - a[2]), g), d[1] += (a[0] - a[2]) / 2);
            k < d[2] ? (d[2] = k, d[3] = Math.min(f(c.innerSize ||
                0, k), k), this.translate(d), this.drawDataLabels && this.drawDataLabels()) : h = !0;
            return h
        });
        w.column && (w.column.prototype.alignDataLabel = function(a, d, c, b, f) {
            var e = this.chart.inverted,
                g = a.series,
                k = a.dlBox || a.shapeArgs,
                h = p(a.below, a.plotY > p(this.translatedThreshold, g.yAxis.len)),
                q = p(c.inside, !!this.options.stacking);
            k && (b = t(k), 0 > b.y && (b.height += b.y, b.y = 0), k = b.y + b.height - g.yAxis.len, 0 < k && (b.height -= k), e && (b = {
                x: g.yAxis.len - b.y - b.height,
                y: g.xAxis.len - b.x - b.width,
                width: b.height,
                height: b.width
            }), q || (e ? (b.x += h ?
                0 : b.width, b.width = 0) : (b.y += h ? b.height : 0, b.height = 0)));
            c.align = p(c.align, !e || q ? "center" : h ? "right" : "left");
            c.verticalAlign = p(c.verticalAlign, e || q ? "middle" : h ? "top" : "bottom");
            n.prototype.alignDataLabel.call(this, a, d, c, b, f)
        })
    })(K);
    (function(a) {
        var z = a.Chart,
            D = a.each,
            C = a.pick,
            B = a.addEvent;
        z.prototype.callbacks.push(function(a) {
            function d() {
                var d = [];
                D(a.series, function(a) {
                    var g = a.options.dataLabels,
                        h = a.dataLabelCollections || ["dataLabel"];
                    (g.enabled || a._hasPointLabels) && !g.allowOverlap && a.visible && D(h, function(f) {
                        D(a.points,
                            function(a) {
                                a[f] && (a[f].labelrank = C(a.labelrank, a.shapeArgs && a.shapeArgs.height), d.push(a[f]))
                            })
                    })
                });
                a.hideOverlappingLabels(d)
            }
            d();
            B(a, "redraw", d)
        });
        z.prototype.hideOverlappingLabels = function(a) {
            var d = a.length,
                q, t, g, p, f, n, w, v, k, e = function(a, b, d, e, f, g, k, h) {
                    return !(f > a + d || f + k < a || g > b + e || g + h < b)
                };
            for (t = 0; t < d; t++)
                if (q = a[t]) q.oldOpacity = q.opacity, q.newOpacity = 1;
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (t = 0; t < d; t++)
                for (g = a[t], q = t + 1; q < d; ++q)
                    if (p = a[q], g && p && g.placed && p.placed && 0 !==
                        g.newOpacity && 0 !== p.newOpacity && (f = g.alignAttr, n = p.alignAttr, w = g.parentGroup, v = p.parentGroup, k = 2 * (g.box ? 0 : g.padding), f = e(f.x + w.translateX, f.y + w.translateY, g.width - k, g.height - k, n.x + v.translateX, n.y + v.translateY, p.width - k, p.height - k)))(g.labelrank < p.labelrank ? g : p).newOpacity = 0;
            D(a, function(a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(K);
    (function(a) {
        var z = a.Axis,
            D = a.each,
            C = a.pick;
        a = a.wrap;
        a(z.prototype, "getSeriesExtremes", function(a) {
            var d = this.isXAxis,
                h, q, t = [],
                g;
            d && D(this.series, function(a, d) {
                a.useMapGeometry && (t[d] = a.xData, a.xData = [])
            });
            a.call(this);
            d && (h = C(this.dataMin, Number.MAX_VALUE), q = C(this.dataMax, -Number.MAX_VALUE), D(this.series, function(a, d) {
                a.useMapGeometry && (h = Math.min(h, C(a.minX, h)), q = Math.max(q, C(a.maxX, h)), a.xData = t[d], g = !0)
            }), g && (this.dataMin = h, this.dataMax = q))
        });
        a(z.prototype, "setAxisTranslation", function(a) {
            var d = this.chart,
                h = d.plotWidth /
                d.plotHeight,
                d = d.xAxis[0],
                q;
            a.call(this);
            "yAxis" === this.coll && void 0 !== d.transA && D(this.series, function(a) {
                a.preserveAspectRatio && (q = !0)
            });
            if (q && (this.transA = d.transA = Math.min(this.transA, d.transA), a = h / ((d.max - d.min) / (this.max - this.min)), a = 1 > a ? this : d, h = (a.max - a.min) * a.transA, a.pixelPadding = a.len - h, a.minPixelPadding = a.pixelPadding / 2, h = a.fixTo)) {
                h = h[1] - a.toValue(h[0], !0);
                h *= a.transA;
                if (Math.abs(h) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) h = 0;
                a.minPixelPadding -= h
            }
        });
        a(z.prototype, "render",
            function(a) {
                a.call(this);
                this.fixTo = null
            })
    })(K);
    (function(a) {
        var z = a.Axis,
            D = a.Chart,
            C = a.color,
            B, d = a.each,
            h = a.extend,
            q = a.isNumber,
            t = a.Legend,
            g = a.LegendSymbolMixin,
            p = a.noop,
            f = a.merge,
            n = a.pick,
            w = a.wrap;
        B = a.ColorAxis = function() {
            this.init.apply(this, arguments)
        };
        h(B.prototype, z.prototype);
        h(B.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify"
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItem", "legendSymbol"].concat(z.prototype.keepProps),
            init: function(a, d) {
                var e = "vertical" !== a.options.legend.layout,
                    c;
                this.coll = "colorAxis";
                c = f(this.defaultColorAxisOptions, {
                    side: e ? 2 : 1,
                    reversed: !e
                }, d, {
                    opposite: !e,
                    showEmpty: !1,
                    title: null
                });
                z.prototype.init.call(this, a, c);
                d.dataClasses && this.initDataClasses(d);
                this.initStops(d);
                this.horiz = e;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            tweenColors: function(a,
                d, e) {
                var c;
                d.rgba.length && a.rgba.length ? (a = a.rgba, d = d.rgba, c = 1 !== d[3] || 1 !== a[3], a = (c ? "rgba(" : "rgb(") + Math.round(d[0] + (a[0] - d[0]) * (1 - e)) + "," + Math.round(d[1] + (a[1] - d[1]) * (1 - e)) + "," + Math.round(d[2] + (a[2] - d[2]) * (1 - e)) + (c ? "," + (d[3] + (a[3] - d[3]) * (1 - e)) : "") + ")") : a = d.input || "none";
                return a
            },
            initDataClasses: function(a) {
                var g = this,
                    e = this.chart,
                    c, b = 0,
                    h = e.options.chart.colorCount,
                    n = this.options,
                    p = a.dataClasses.length;
                this.dataClasses = c = [];
                this.legendItems = [];
                d(a.dataClasses, function(a, d) {
                    a = f(a);
                    c.push(a);
                    a.color ||
                        ("category" === n.dataClassColor ? (d = e.options.colors, h = d.length, a.color = d[b], a.colorIndex = b, b++, b === h && (b = 0)) : a.color = g.tweenColors(C(n.minColor), C(n.maxColor), 2 > p ? .5 : d / (p - 1)))
                })
            },
            initStops: function(a) {
                this.stops = a.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                d(this.stops, function(a) {
                    a.color = C(a[1])
                })
            },
            setOptions: function(a) {
                z.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function() {
                var a = this.legendSymbol,
                    d = this.chart,
                    e = d.options.legend || {},
                    c, b;
                a ? (this.left = e = a.attr("x"), this.top = c = a.attr("y"), this.width = b = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - e - b, this.bottom = d.chartHeight - c - a, this.len = this.horiz ? b : a, this.pos = this.horiz ? e : c) : this.len = (this.horiz ? e.symbolWidth : e.symbolHeight) || this.defaultLegendLength
            },
            toColor: function(a, d) {
                var e = this.stops,
                    c, b, f = this.dataClasses,
                    g, k;
                if (f)
                    for (k = f.length; k--;) {
                        if (g = f[k], c = g.from, e = g.to, (void 0 === c || a >= c) && (void 0 === e || a <= e)) {
                            b = g.color;
                            d && (d.dataClass = k, d.colorIndex =
                                g.colorIndex);
                            break
                        }
                    } else {
                        this.isLog && (a = this.val2lin(a));
                        a = 1 - (this.max - a) / (this.max - this.min || 1);
                        for (k = e.length; k-- && !(a > e[k][0]););
                        c = e[k] || e[k + 1];
                        e = e[k + 1] || c;
                        a = 1 - (e[0] - a) / (e[0] - c[0] || 1);
                        b = this.tweenColors(c.color, e.color, a)
                    }
                return b
            },
            getOffset: function() {
                var a = this.legendGroup,
                    d = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, z.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
            },
            setLegendColor: function() {
                var a,
                    d = this.options,
                    e = this.reversed;
                a = e ? 1 : 0;
                e = e ? 0 : 1;
                a = this.horiz ? [a, 0, e, 0] : [0, e, 0, a];
                this.legendColor = {
                    linearGradient: {
                        x1: a[0],
                        y1: a[1],
                        x2: a[2],
                        y2: a[3]
                    },
                    stops: d.stops || [
                        [0, d.minColor],
                        [1, d.maxColor]
                    ]
                }
            },
            drawLegendSymbol: function(a, d) {
                var e = a.padding,
                    c = a.options,
                    b = this.horiz,
                    f = n(c.symbolWidth, b ? this.defaultLegendLength : 12),
                    g = n(c.symbolHeight, b ? 12 : this.defaultLegendLength),
                    k = n(c.labelPadding, b ? 16 : 30),
                    c = n(c.itemDistance, 10);
                this.setLegendColor();
                d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, g).attr({
                    zIndex: 1
                }).add(d.legendGroup);
                this.legendItemWidth = f + e + (b ? c : k);
                this.legendItemHeight = g + e + (b ? k : 0)
            },
            setState: p,
            visible: !0,
            setVisible: p,
            getSeriesExtremes: function() {
                var a;
                this.series.length && (a = this.series[0], this.dataMin = a.valueMin, this.dataMax = a.valueMax)
            },
            drawCrosshair: function(a, d) {
                var e = d && d.plotX,
                    c = d && d.plotY,
                    b, f = this.pos,
                    g = this.len;
                d && (b = this.toPixels(d[d.series.colorKey]), b < f ? b = f - 2 : b > f + g && (b = f + g + 2), d.plotX = b, d.plotY = this.len - b, z.prototype.drawCrosshair.call(this, a, d), d.plotX = e, d.plotY = c, this.cross && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),
                    this.cross.attr({
                        fill: this.crosshair.color
                    })))
            },
            getPlotLinePath: function(a, d, e, c, b) {
                return q(b) ? this.horiz ? ["M", b - 4, this.top - 6, "L", b + 4, this.top - 6, b, this.top, "Z"] : ["M", this.left, b, "L", this.left - 6, b + 6, this.left - 6, b - 6, "Z"] : z.prototype.getPlotLinePath.call(this, a, d, e, c)
            },
            update: function(a, g) {
                var e = this.chart,
                    c = e.legend;
                d(this.series, function(a) {
                    a.isDirtyData = !0
                });
                a.dataClasses && c.allItems && (d(c.allItems, function(a) {
                    a.isDataClass && a.legendGroup.destroy()
                }), e.isDirtyLegend = !0);
                e.options[this.coll] = f(this.userOptions,
                    a);
                z.prototype.update.call(this, a, g);
                this.legendItem && (this.setLegendColor(), c.colorizeItem(this, !0))
            },
            getDataClassLegendSymbols: function() {
                var f = this,
                    k = this.chart,
                    e = this.legendItems,
                    c = k.options.legend,
                    b = c.valueDecimals,
                    n = c.valueSuffix || "",
                    u;
                e.length || d(this.dataClasses, function(c, q) {
                    var r = !0,
                        v = c.from,
                        l = c.to;
                    u = "";
                    void 0 === v ? u = "\x3c " : void 0 === l && (u = "\x3e ");
                    void 0 !== v && (u += a.numberFormat(v, b) + n);
                    void 0 !== v && void 0 !== l && (u += " - ");
                    void 0 !== l && (u += a.numberFormat(l, b) + n);
                    e.push(h({
                        chart: k,
                        name: u,
                        options: {},
                        drawLegendSymbol: g.drawRectangle,
                        visible: !0,
                        setState: p,
                        isDataClass: !0,
                        setVisible: function() {
                            r = this.visible = !r;
                            d(f.series, function(a) {
                                d(a.points, function(a) {
                                    a.dataClass === q && a.setVisible(r)
                                })
                            });
                            k.legend.colorizeItem(this, r)
                        }
                    }, c))
                });
                return e
            },
            name: ""
        });
        d(["fill", "stroke"], function(d) {
            a.Fx.prototype[d + "Setter"] = function() {
                this.elem.attr(d, B.prototype.tweenColors(C(this.start), C(this.end), this.pos), null, !0)
            }
        });
        w(D.prototype, "getAxes", function(a) {
            var d = this.options.colorAxis;
            a.call(this);
            this.colorAxis = [];
            d && new B(this, d)
        });
        w(t.prototype, "getAllItems", function(a) {
            var f = [],
                e = this.chart.colorAxis[0];
            e && e.options && (e.options.showInLegend && (e.options.dataClasses ? f = f.concat(e.getDataClassLegendSymbols()) : f.push(e)), d(e.series, function(a) {
                a.options.showInLegend = !1
            }));
            return f.concat(a.call(this))
        });
        w(t.prototype, "colorizeItem", function(a, d, e) {
            a.call(this, d, e);
            e && d.legendColor && d.legendSymbol.attr({
                fill: d.legendColor
            })
        })
    })(K);
    (function(a) {
        var z = a.defined,
            D = a.each,
            C = a.noop,
            B = a.seriesTypes;
        a.colorPointMixin = {
            isValid: function() {
                return null !== this.value
            },
            setVisible: function(a) {
                var d = this,
                    q = a ? "show" : "hide";
                D(["graphic", "dataLabel"], function(a) {
                    if (d[a]) d[a][q]()
                })
            },
            setState: function(d) {
                a.Point.prototype.setState.call(this, d);
                this.graphic && this.graphic.attr({
                    zIndex: "hover" === d ? 1 : 0
                })
            }
        };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: C,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: B.column.prototype.pointAttribs,
            translateColors: function() {
                var a = this,
                    h = this.options.nullColor,
                    q = this.colorAxis,
                    t = this.colorKey;
                D(this.data, function(d) {
                    var g = d[t];
                    if (g = d.options.color || (d.isNull ? h : q && void 0 !== g ? q.toColor(g, d) : d.color || a.color)) d.color = g
                })
            },
            colorAttribs: function(a) {
                var d = {};
                z(a.color) && (d[this.colorProp || "fill"] = a.color);
                return d
            }
        }
    })(K);
    (function(a) {
        var z = a.color,
            D = a.ColorAxis,
            C = a.colorPointMixin,
            B = a.each,
            d = a.extend,
            h = a.isNumber,
            q = a.map,
            t = a.merge,
            g = a.noop,
            p = a.pick,
            f = a.isArray,
            n = a.Point,
            w = a.Series,
            v = a.seriesType,
            k = a.seriesTypes,
            e = a.splat,
            c = void 0 !== a.doc.documentElement.style.vectorEffect;
        v("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            turboThreshold: 0,
            tooltip: {
                followPointer: !0,
                pointFormat: "{point.name}: {point.value}\x3cbr/\x3e"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    brightness: .2,
                    halo: null
                },
                select: {
                    color: "#cccccc"
                }
            }
        }, t(a.colorSeriesMixin, {
            type: "map",
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: g,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function(b) {
                var c = Number.MAX_VALUE,
                    d = -c,
                    e = c,
                    f = -c,
                    g = c,
                    k = c,
                    l = this.xAxis,
                    n = this.yAxis,
                    q;
                B(b || [], function(b) {
                    if (b.path) {
                        "string" === typeof b.path && (b.path = a.splitPath(b.path));
                        var l = b.path || [],
                            m = l.length,
                            n = !1,
                            u = -c,
                            r = c,
                            t = -c,
                            v = c,
                            y = b.properties;
                        if (!b._foundBox) {
                            for (; m--;) h(l[m]) &&
                                (n ? (u = Math.max(u, l[m]), r = Math.min(r, l[m])) : (t = Math.max(t, l[m]), v = Math.min(v, l[m])), n = !n);
                            b._midX = r + (u - r) * (b.middleX || y && y["hc-middle-x"] || .5);
                            b._midY = v + (t - v) * (b.middleY || y && y["hc-middle-y"] || .5);
                            b._maxX = u;
                            b._minX = r;
                            b._maxY = t;
                            b._minY = v;
                            b.labelrank = p(b.labelrank, (u - r) * (t - v));
                            b._foundBox = !0
                        }
                        d = Math.max(d, b._maxX);
                        e = Math.min(e, b._minX);
                        f = Math.max(f, b._maxY);
                        g = Math.min(g, b._minY);
                        k = Math.min(b._maxX - b._minX, b._maxY - b._minY, k);
                        q = !0
                    }
                });
                q && (this.minY = Math.min(g, p(this.minY, c)), this.maxY = Math.max(f, p(this.maxY, -c)), this.minX = Math.min(e, p(this.minX, c)), this.maxX = Math.max(d, p(this.maxX, -c)), l && void 0 === l.options.minRange && (l.minRange = Math.min(5 * k, (this.maxX - this.minX) / 5, l.minRange || c)), n && void 0 === n.options.minRange && (n.minRange = Math.min(5 * k, (this.maxY - this.minY) / 5, n.minRange || c)))
            },
            getExtremes: function() {
                w.prototype.getExtremes.call(this, this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax =
                    this.maxY
            },
            translatePath: function(a) {
                var b = !1,
                    c = this.xAxis,
                    d = this.yAxis,
                    e = c.min,
                    f = c.transA,
                    c = c.minPixelPadding,
                    g = d.min,
                    l = d.transA,
                    d = d.minPixelPadding,
                    k, n = [];
                if (a)
                    for (k = a.length; k--;) h(a[k]) ? (n[k] = b ? (a[k] - e) * f + c : (a[k] - g) * l + d, b = !b) : n[k] = a[k];
                return n
            },
            setData: function(b, c, d, g) {
                var k = this.options,
                    n = this.chart.options.chart,
                    p = n && n.map,
                    l = k.mapData,
                    u = k.joinBy,
                    r = null === u,
                    v = k.keys || this.pointArrayMap,
                    z = [],
                    m = {},
                    A, F = this.chart.mapTransforms;
                !l && p && (l = "string" === typeof p ? a.maps[p] : p);
                r && (u = "_i");
                u = this.joinBy =
                    e(u);
                u[1] || (u[1] = u[0]);
                b && B(b, function(a, c) {
                    var d = 0;
                    if (h(a)) b[c] = {
                        value: a
                    };
                    else if (f(a)) {
                        b[c] = {};
                        !k.keys && a.length > v.length && "string" === typeof a[0] && (b[c]["hc-key"] = a[0], ++d);
                        for (var e = 0; e < v.length; ++e, ++d) v[e] && (b[c][v[e]] = a[d])
                    }
                    r && (b[c]._i = c)
                });
                this.getBox(b);
                if (this.chart.mapTransforms = F = n && n.mapTransforms || l && l["hc-transform"] || F)
                    for (A in F) F.hasOwnProperty(A) && A.rotation && (A.cosAngle = Math.cos(A.rotation), A.sinAngle = Math.sin(A.rotation));
                if (l) {
                    "FeatureCollection" === l.type && (this.mapTitle = l.title,
                        l = a.geojson(l, this.type, this));
                    this.mapData = l;
                    this.mapMap = {};
                    for (A = 0; A < l.length; A++) n = l[A], p = n.properties, n._i = A, u[0] && p && p[u[0]] && (n[u[0]] = p[u[0]]), m[n[u[0]]] = n;
                    this.mapMap = m;
                    b && u[1] && B(b, function(a) {
                        m[a[u[1]]] && z.push(m[a[u[1]]])
                    });
                    k.allAreas ? (this.getBox(l), b = b || [], u[1] && B(b, function(a) {
                        z.push(a[u[1]])
                    }), z = "|" + q(z, function(a) {
                        return a && a[u[0]]
                    }).join("|") + "|", B(l, function(a) {
                        u[0] && -1 !== z.indexOf("|" + a[u[0]] + "|") || (b.push(t(a, {
                            value: null
                        })), g = !1)
                    })) : this.getBox(z)
                }
                w.prototype.setData.call(this,
                    b, c, d, g)
            },
            drawGraph: g,
            drawDataLabels: g,
            doFullTranslate: function() {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
            },
            translate: function() {
                var a = this,
                    c = a.xAxis,
                    d = a.yAxis,
                    e = a.doFullTranslate();
                a.generatePoints();
                B(a.data, function(b) {
                    b.plotX = c.toPixels(b._midX, !0);
                    b.plotY = d.toPixels(b._midY, !0);
                    e && (b.shapeType = "path", b.shapeArgs = {
                        d: a.translatePath(b.path)
                    })
                });
                a.translateColors()
            },
            pointAttribs: function(a, d) {
                d = k.column.prototype.pointAttribs.call(this, a, d);
                a.isFading &&
                    delete d.fill;
                c ? d["vector-effect"] = "non-scaling-stroke" : d["stroke-width"] = "inherit";
                return d
            },
            drawPoints: function() {
                var a = this,
                    d = a.xAxis,
                    e = a.yAxis,
                    f = a.group,
                    g = a.chart,
                    n = g.renderer,
                    h, l, p, q, v = this.baseTrans,
                    t, m, w, z, C;
                a.transformGroup || (a.transformGroup = n.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(f), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (g.hasRendered && B(a.points, function(b) {
                        b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                    }), a.group = a.transformGroup, k.column.prototype.drawPoints.apply(a),
                    a.group = f, B(a.points, function(a) {
                        a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
                    }), this.baseTrans = {
                        originX: d.min - d.minPixelPadding / d.transA,
                        originY: e.min - e.minPixelPadding / e.transA + (e.reversed ? 0 : e.len / e.transA),
                        transAX: d.transA,
                        transAY: e.transA
                    }, this.transformGroup.animate({
                        translateX: 0,
                        translateY: 0,
                        scaleX: 1,
                        scaleY: 1
                    })) : (h = d.transA / v.transAX,
                    l = e.transA / v.transAY, p = d.toPixels(v.originX, !0), q = e.toPixels(v.originY, !0), .99 < h && 1.01 > h && .99 < l && 1.01 > l && (l = h = 1, p = Math.round(p), q = Math.round(q)), t = this.transformGroup, g.renderer.globalAnimation ? (m = t.attr("translateX"), w = t.attr("translateY"), z = t.attr("scaleX"), C = t.attr("scaleY"), t.attr({
                        animator: 0
                    }).animate({
                        animator: 1
                    }, {
                        step: function(a, b) {
                            t.attr({
                                translateX: m + (p - m) * b.pos,
                                translateY: w + (q - w) * b.pos,
                                scaleX: z + (h - z) * b.pos,
                                scaleY: C + (l - C) * b.pos
                            })
                        }
                    })) : t.attr({
                        translateX: p,
                        translateY: q,
                        scaleX: h,
                        scaleY: l
                    }));
                c || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] / (h || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function() {
                w.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function() {
                var a = this,
                    c = w.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function() {
                    c.call(a)
                }) : c.call(a)
            },
            animate: function(a) {
                var b = this.options.animation,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis,
                    f = d.pos,
                    g = e.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = {
                    duration: 1E3
                }), a ? c.attr({
                    translateX: f + d.len / 2,
                    translateY: g + e.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : (c.animate({
                    translateX: f,
                    translateY: g,
                    scaleX: 1,
                    scaleY: 1
                }, b), this.animate = null))
            },
            animateDrilldown: function(a) {
                var b = this.chart.plotBox,
                    c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = c.bBox,
                    e = this.chart.options.drilldown.animation;
                a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: d.x,
                    translateY: d.y
                }, B(this.points, function(a) {
                    a.graphic && a.graphic.attr(c.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, e)
                }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function(a) {
                k.column.prototype.animateDrillupFrom.call(this, a)
            },
            animateDrillupTo: function(a) {
                k.column.prototype.animateDrillupTo.call(this, a)
            }
        }), d({
            applyOptions: function(a, c) {
                a = n.prototype.applyOptions.call(this, a, c);
                c = this.series;
                var b = c.joinBy;
                c.mapData &&
                    ((b = void 0 !== a[b[1]] && c.mapMap[a[b[1]]]) ? (c.xyFromShape && (a.x = b._midX, a.y = b._midY), d(a, b)) : a.value = a.value || null);
                return a
            },
            onMouseOver: function(a) {
                clearTimeout(this.colorInterval);
                if (null !== this.value) n.prototype.onMouseOver.call(this, a);
                else this.series.onMouseOut(a)
            },
            onMouseOut: function() {
                var a = this,
                    c = +new Date,
                    d = z(this.series.pointAttribs(a).fill),
                    e = z(this.series.pointAttribs(a, "hover").fill),
                    f = a.series.options.states.normal.animation,
                    g = f && (f.duration || 500);
                g && 4 === d.rgba.length && 4 === e.rgba.length &&
                    "select" !== a.state && (clearTimeout(a.colorInterval), a.colorInterval = setInterval(function() {
                        var b = (new Date - c) / g,
                            f = a.graphic;
                        1 < b && (b = 1);
                        f && f.attr("fill", D.prototype.tweenColors.call(0, e, d, b));
                        1 <= b && clearTimeout(a.colorInterval)
                    }, 13), a.isFading = !0);
                n.prototype.onMouseOut.call(a);
                a.isFading = null
            },
            zoomTo: function() {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, C))
    })(K);
    (function(a) {
        function z(a) {
            a && (a.preventDefault && a.preventDefault(),
                a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }
        var D = a.addEvent,
            C = a.Chart,
            B = a.doc,
            d = a.each,
            h = a.extend,
            q = a.merge,
            t = a.pick;
        a = a.wrap;
        h(C.prototype, {
            renderMapNavigation: function() {
                var a = this,
                    d = this.options.mapNavigation,
                    f = d.buttons,
                    n, w, v, k, e, c = function(b) {
                        this.handler.call(a, b);
                        z(b)
                    };
                if (t(d.enableButtons, d.enabled) && !a.renderer.forExport)
                    for (n in a.mapNavButtons = [], f) f.hasOwnProperty(n) && (v = q(d.buttonOptions, f[n]), w = v.theme, w.style = q(v.theme.style, v.style), e = (k = w.states) && k.hover, k = k && k.select,
                        w = a.renderer.button(v.text, 0, 0, c, w, e, k, 0, "zoomIn" === n ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                            width: v.width,
                            height: v.height,
                            title: a.options.lang[n],
                            padding: v.padding,
                            zIndex: 5
                        }).add(), w.handler = v.onclick, w.align(h(v, {
                            width: w.width,
                            height: 2 * w.height
                        }), null, v.alignTo), D(w.element, "dblclick", z), a.mapNavButtons.push(w))
            },
            fitToBox: function(a, h) {
                d([
                    ["x", "width"],
                    ["y", "height"]
                ], function(d) {
                    var f = d[0];
                    d = d[1];
                    a[f] + a[d] > h[f] + h[d] && (a[d] > h[d] ? (a[d] = h[d], a[f] = h[f]) : a[f] = h[f] + h[d] -
                        a[d]);
                    a[d] > h[d] && (a[d] = h[d]);
                    a[f] < h[f] && (a[f] = h[f])
                });
                return a
            },
            mapZoom: function(a, d, f, h, q) {
                var g = this.xAxis[0],
                    k = g.max - g.min,
                    e = t(d, g.min + k / 2),
                    c = k * a,
                    k = this.yAxis[0],
                    b = k.max - k.min,
                    n = t(f, k.min + b / 2),
                    b = b * a,
                    e = this.fitToBox({
                        x: e - c * (h ? (h - g.pos) / g.len : .5),
                        y: n - b * (q ? (q - k.pos) / k.len : .5),
                        width: c,
                        height: b
                    }, {
                        x: g.dataMin,
                        y: k.dataMin,
                        width: g.dataMax - g.dataMin,
                        height: k.dataMax - k.dataMin
                    }),
                    c = e.x <= g.dataMin && e.width >= g.dataMax - g.dataMin && e.y <= k.dataMin && e.height >= k.dataMax - k.dataMin;
                h && (g.fixTo = [h - g.pos, d]);
                q && (k.fixTo = [q - k.pos, f]);
                void 0 === a || c ? (g.setExtremes(void 0, void 0, !1), k.setExtremes(void 0, void 0, !1)) : (g.setExtremes(e.x, e.x + e.width, !1), k.setExtremes(e.y, e.y + e.height, !1));
                this.redraw()
            }
        });
        a(C.prototype, "render", function(a) {
            var d = this,
                f = d.options.mapNavigation;
            d.renderMapNavigation();
            a.call(d);
            (t(f.enableDoubleClickZoom, f.enabled) || f.enableDoubleClickZoomTo) && D(d.container, "dblclick", function(a) {
                d.pointer.onContainerDblClick(a)
            });
            t(f.enableMouseWheelZoom, f.enabled) && D(d.container, void 0 === B.onmousewheel ?
                "DOMMouseScroll" : "mousewheel",
                function(a) {
                    d.pointer.onContainerMouseWheel(a);
                    z(a);
                    return !1
                })
        })
    })(K);
    (function(a) {
        var z = a.extend,
            D = a.pick,
            C = a.Pointer;
        a = a.wrap;
        z(C.prototype, {
            onContainerDblClick: function(a) {
                var d = this.chart;
                a = this.normalize(a);
                d.options.mapNavigation.enableDoubleClickZoomTo ? d.pointer.inClass(a.target, "highcharts-tracker") && d.hoverPoint && d.hoverPoint.zoomTo() : d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(.5, d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY),
                    a.chartX, a.chartY)
            },
            onContainerMouseWheel: function(a) {
                var d = this.chart,
                    h;
                a = this.normalize(a);
                h = a.detail || -(a.wheelDelta / 120);
                d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity, h), d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
        });
        a(C.prototype, "zoomOption", function(a) {
            var d = this.chart.options.mapNavigation;
            D(d.enableTouchZoom, d.enabled) && (this.chart.options.chart.pinchType = "xy");
            a.apply(this, [].slice.call(arguments,
                1))
        });
        a(C.prototype, "pinchTranslate", function(a, d, h, q, t, g, p) {
            a.call(this, d, h, q, t, g, p);
            "map" === this.chart.options.chart.type && this.hasZoom && (a = q.scaleX > q.scaleY, this.pinchTranslateDirection(!a, d, h, q, t, g, p, a ? q.scaleX : q.scaleY))
        })
    })(K);
    (function(a) {
        var z = a.seriesType,
            D = a.seriesTypes;
        z("mapline", "map", {
            lineWidth: 1,
            fillColor: "none"
        }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function(a, z) {
                a = D.map.prototype.pointAttribs.call(this, a, z);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: D.line.prototype.drawLegendSymbol
        })
    })(K);
    (function(a) {
        var z = a.merge,
            D = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", {
            dataLabels: {
                enabled: !0,
                formatter: function() {
                    return this.point.name
                },
                crop: !1,
                defer: !1,
                overflow: !1,
                style: {
                    color: "#000000"
                }
            }
        }, {
            type: "mappoint",
            forceDL: !0
        }, {
            applyOptions: function(a, B) {
                a = void 0 !== a.lat && void 0 !== a.lon ? z(a, this.series.chart.fromLatLonToPoint(a)) : a;
                return D.prototype.applyOptions.call(this, a, B)
            }
        })
    })(K);
    (function(a) {
        var z =
            a.arrayMax,
            D = a.arrayMin,
            C = a.Axis,
            B = a.color,
            d = a.each,
            h = a.isNumber,
            q = a.noop,
            t = a.pick,
            g = a.pInt,
            p = a.Point,
            f = a.Series,
            n = a.seriesType,
            w = a.seriesTypes;
        n("bubble", "scatter", {
            dataLabels: {
                formatter: function() {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            marker: {
                lineColor: null,
                lineWidth: 1,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                }
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            bubblePadding: !0,
            zoneAxis: "z",
            markerAttribs: null,
            pointAttribs: function(a, d) {
                var e = t(this.options.marker.fillOpacity, .5);
                a = f.prototype.pointAttribs.call(this, a, d);
                1 !== e && (a.fill = B(a.fill).setOpacity(e).get("rgba"));
                return a
            },
            getRadii: function(a, d, e, c) {
                var b, f, g, k = this.zData,
                    h = [],
                    n = this.options,
                    p = "width" !== n.sizeBy,
                    l = n.zThreshold,
                    q = d - a;
                f = 0;
                for (b = k.length; f < b; f++) g = k[f], n.sizeByAbsoluteValue && null !== g && (g =
                    Math.abs(g - l), d = Math.max(d - l, Math.abs(a - l)), a = 0), null === g ? g = null : g < a ? g = e / 2 - 1 : (g = 0 < q ? (g - a) / q : .5, p && 0 <= g && (g = Math.sqrt(g)), g = Math.ceil(e + g * (c - e)) / 2), h.push(g);
                this.radii = h
            },
            animate: function(a) {
                var f = this.options.animation;
                a || (d(this.points, function(a) {
                    var c = a.graphic;
                    a = a.shapeArgs;
                    c && a && (c.attr("r", 1), c.animate({
                        r: a.r
                    }, f))
                }), this.animate = null)
            },
            translate: function() {
                var a, d = this.data,
                    e, c, b = this.radii;
                w.scatter.prototype.translate.call(this);
                for (a = d.length; a--;) e = d[a], c = b ? b[a] : 0, h(c) && c >= this.minPxSize /
                    2 ? (e.shapeType = "circle", e.shapeArgs = {
                        x: e.plotX,
                        y: e.plotY,
                        r: c
                    }, e.dlBox = {
                        x: e.plotX - c,
                        y: e.plotY - c,
                        width: 2 * c,
                        height: 2 * c
                    }) : e.shapeArgs = e.plotY = e.dlBox = void 0
            },
            drawLegendSymbol: function(a, d) {
                var e = this.chart.renderer,
                    c = e.fontMetrics(a.itemStyle && a.itemStyle.fontSize, d.legendItem).f / 2;
                d.legendSymbol = e.circle(c, a.baseline - c, c).attr({
                    zIndex: 3
                }).add(d.legendGroup);
                d.legendSymbol.isMarker = !0
            },
            drawPoints: w.column.prototype.drawPoints,
            alignDataLabel: w.column.prototype.alignDataLabel,
            buildKDTree: q,
            applyZones: q
        }, {
            haloPath: function(a) {
                return p.prototype.haloPath.call(this, 0 === a ? 0 : this.shapeArgs.r + a)
            },
            ttBelow: !1
        });
        C.prototype.beforePadding = function() {
            var a = this,
                f = this.len,
                e = this.chart,
                c = 0,
                b = f,
                n = this.isXAxis,
                p = n ? "xData" : "yData",
                q = this.min,
                w = {},
                G = Math.min(e.plotWidth, e.plotHeight),
                I = Number.MAX_VALUE,
                l = -Number.MAX_VALUE,
                x = this.max - q,
                B = f / x,
                C = [];
            d(this.series, function(b) {
                var c = b.options;
                !b.bubblePadding || !b.visible && e.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, C.push(b), n && (d(["minSize", "maxSize"],
                    function(a) {
                        var b = c[a],
                            d = /%$/.test(b),
                            b = g(b);
                        w[a] = d ? G * b / 100 : b
                    }), b.minPxSize = w.minSize, b.maxPxSize = Math.max(w.maxSize, w.minSize), b = b.zData, b.length && (I = t(c.zMin, Math.min(I, Math.max(D(b), !1 === c.displayNegative ? c.zThreshold : -Number.MAX_VALUE))), l = t(c.zMax, Math.max(l, z(b))))))
            });
            d(C, function(d) {
                var e = d[p],
                    f = e.length,
                    g;
                n && d.getRadii(I, l, d.minPxSize, d.maxPxSize);
                if (0 < x)
                    for (; f--;) h(e[f]) && a.dataMin <= e[f] && e[f] <= a.dataMax && (g = d.radii[f], c = Math.min((e[f] - q) * B - g, c), b = Math.max((e[f] - q) * B + g, b))
            });
            C.length && 0 <
                x && !this.isLog && (b -= f, B *= (f + c - b) / f, d([
                    ["min", "userMin", c],
                    ["max", "userMax", b]
                ], function(b) {
                    void 0 === t(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / B)
                }))
        }
    })(K);
    (function(a) {
        var z = a.merge,
            D = a.Point,
            C = a.seriesType,
            B = a.seriesTypes;
        B.bubble && C("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: B.map.prototype.getMapData,
            getBox: B.map.prototype.getBox,
            setData: B.map.prototype.setData
        }, {
            applyOptions: function(a,
                h) {
                return a && void 0 !== a.lat && void 0 !== a.lon ? D.prototype.applyOptions.call(this, z(a, this.series.chart.fromLatLonToPoint(a)), h) : B.map.prototype.pointClass.prototype.applyOptions.call(this, a, h)
            },
            ttBelow: !1
        })
    })(K);
    (function(a) {
        function z(a, d) {
            var f, g, h, p = !1,
                k = a.x,
                e = a.y;
            a = 0;
            for (f = d.length - 1; a < d.length; f = a++) g = d[a][1] > e, h = d[f][1] > e, g !== h && k < (d[f][0] - d[a][0]) * (e - d[a][1]) / (d[f][1] - d[a][1]) + d[a][0] && (p = !p);
            return p
        }
        var D = a.Chart,
            C = a.each,
            B = a.extend,
            d = a.format,
            h = a.merge,
            q = a.win,
            t = a.wrap;
        D.prototype.transformFromLatLon =
            function(d, h) {
                if (void 0 === q.proj4) return a.error(21), {
                    x: 0,
                    y: null
                };
                d = q.proj4(h.crs, [d.lon, d.lat]);
                var f = h.cosAngle || h.rotation && Math.cos(h.rotation),
                    g = h.sinAngle || h.rotation && Math.sin(h.rotation);
                d = h.rotation ? [d[0] * f + d[1] * g, -d[0] * g + d[1] * f] : d;
                return {
                    x: ((d[0] - (h.xoffset || 0)) * (h.scale || 1) + (h.xpan || 0)) * (h.jsonres || 1) + (h.jsonmarginX || 0),
                    y: (((h.yoffset || 0) - d[1]) * (h.scale || 1) + (h.ypan || 0)) * (h.jsonres || 1) - (h.jsonmarginY || 0)
                }
            };
        D.prototype.transformToLatLon = function(d, h) {
            if (void 0 === q.proj4) a.error(21);
            else {
                d = {
                    x: ((d.x - (h.jsonmarginX || 0)) / (h.jsonres || 1) - (h.xpan || 0)) / (h.scale || 1) + (h.xoffset || 0),
                    y: ((-d.y - (h.jsonmarginY || 0)) / (h.jsonres || 1) + (h.ypan || 0)) / (h.scale || 1) + (h.yoffset || 0)
                };
                var f = h.cosAngle || h.rotation && Math.cos(h.rotation),
                    g = h.sinAngle || h.rotation && Math.sin(h.rotation);
                h = q.proj4(h.crs, "WGS84", h.rotation ? {
                    x: d.x * f + d.y * -g,
                    y: d.x * g + d.y * f
                } : d);
                return {
                    lat: h.y,
                    lon: h.x
                }
            }
        };
        D.prototype.fromPointToLatLon = function(d) {
            var g = this.mapTransforms,
                f;
            if (g) {
                for (f in g)
                    if (g.hasOwnProperty(f) && g[f].hitZone && z({
                                x: d.x,
                                y: -d.y
                            },
                            g[f].hitZone.coordinates[0])) return this.transformToLatLon(d, g[f]);
                return this.transformToLatLon(d, g["default"])
            }
            a.error(22)
        };
        D.prototype.fromLatLonToPoint = function(d) {
            var g = this.mapTransforms,
                f, h;
            if (!g) return a.error(22), {
                x: 0,
                y: null
            };
            for (f in g)
                if (g.hasOwnProperty(f) && g[f].hitZone && (h = this.transformFromLatLon(d, g[f]), z({
                        x: h.x,
                        y: -h.y
                    }, g[f].hitZone.coordinates[0]))) return h;
            return this.transformFromLatLon(d, g["default"])
        };
        a.geojson = function(a, h, f) {
            var g = [],
                p = [],
                q = function(a) {
                    var d, c = a.length;
                    p.push("M");
                    for (d = 0; d < c; d++) 1 === d && p.push("L"), p.push(a[d][0], -a[d][1])
                };
            h = h || "map";
            C(a.features, function(a) {
                var d = a.geometry,
                    c = d.type,
                    d = d.coordinates;
                a = a.properties;
                var b;
                p = [];
                "map" === h || "mapbubble" === h ? ("Polygon" === c ? (C(d, q), p.push("Z")) : "MultiPolygon" === c && (C(d, function(a) {
                    C(a, q)
                }), p.push("Z")), p.length && (b = {
                    path: p
                })) : "mapline" === h ? ("LineString" === c ? q(d) : "MultiLineString" === c && C(d, q), p.length && (b = {
                    path: p
                })) : "mappoint" === h && "Point" === c && (b = {
                    x: d[0],
                    y: -d[1]
                });
                b && g.push(B(b, {
                    name: a.name || a.NAME,
                    properties: a
                }))
            });
            f && a.copyrightShort && (f.chart.mapCredits = d(f.chart.options.credits.mapText, {
                geojson: a
            }), f.chart.mapCreditsFull = d(f.chart.options.credits.mapTextFull, {
                geojson: a
            }));
            return g
        };
        t(D.prototype, "addCredits", function(a, d) {
            d = h(!0, this.options.credits, d);
            this.mapCredits && (d.href = null);
            a.call(this, d);
            this.credits && this.mapCreditsFull && this.credits.attr({
                title: this.mapCreditsFull
            })
        })
    })(K);
    (function(a) {
        function z(a, d, g, h, k, e, c, b) {
            return ["M", a + k, d, "L", a + g - e, d, "C", a + g - e / 2, d, a + g, d + e / 2, a + g, d + e, "L", a + g, d + h - c, "C", a +
                g, d + h - c / 2, a + g - c / 2, d + h, a + g - c, d + h, "L", a + b, d + h, "C", a + b / 2, d + h, a, d + h - b / 2, a, d + h - b, "L", a, d + k, "C", a, d + k / 2, a + k / 2, d, a + k, d, "Z"
            ]
        }
        var D = a.Chart,
            C = a.defaultOptions,
            B = a.each,
            d = a.extend,
            h = a.merge,
            q = a.pick,
            t = a.Renderer,
            g = a.SVGRenderer,
            p = a.VMLRenderer;
        d(C.lang, {
            zoomIn: "Zoom in",
            zoomOut: "Zoom out"
        });
        C.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {
                    fontSize: "15px",
                    fontWeight: "bold"
                },
                theme: {
                    "stroke-width": 1,
                    "text-align": "center"
                }
            },
            buttons: {
                zoomIn: {
                    onclick: function() {
                        this.mapZoom(.5)
                    },
                    text: "+",
                    y: 0
                },
                zoomOut: {
                    onclick: function() {
                        this.mapZoom(2)
                    },
                    text: "-",
                    y: 28
                }
            },
            mouseWheelSensitivity: 1.1
        };
        a.splitPath = function(a) {
            var d;
            a = a.replace(/([A-Za-z])/g, " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (d = 0; d < a.length; d++) /[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
            return a
        };
        a.maps = {};
        g.prototype.symbols.topbutton = function(a, d, g, h, k) {
            return z(a - 1, d - 1, g, h, k.r, k.r, 0, 0)
        };
        g.prototype.symbols.bottombutton = function(a, d, g, h, k) {
            return z(a - 1, d - 1, g, h, 0, 0, k.r, k.r)
        };
        t === p && B(["topbutton",
            "bottombutton"
        ], function(a) {
            p.prototype.symbols[a] = g.prototype.symbols[a]
        });
        a.Map = a.mapChart = function(d, g, p) {
            var f = "string" === typeof d || d.nodeName,
                k = arguments[f ? 1 : 0],
                e = {
                    endOnTick: !1,
                    visible: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    startOnTick: !1
                },
                c, b = a.getOptions().credits;
            c = k.series;
            k.series = null;
            k = h({
                chart: {
                    panning: "xy",
                    type: "map"
                },
                credits: {
                    mapText: q(b.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),
                    mapTextFull: q(b.mapTextFull, "{geojson.copyright}")
                },
                tooltip: {
                    followTouchMove: !1
                },
                xAxis: e,
                yAxis: h(e, {
                    reversed: !0
                })
            }, k, {
                chart: {
                    inverted: !1,
                    alignTicks: !1
                }
            });
            k.series = c;
            return f ? new D(d, k, p) : new D(k, g)
        }
    })(K);
    (function(a) {
        var z = a.colorPointMixin,
            D = a.each,
            C = a.merge,
            B = a.noop,
            d = a.pick,
            h = a.Series,
            q = a.seriesType,
            t = a.seriesTypes;
        q("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: null,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, C(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            supportsDrilldown: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                var a;
                t.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = d(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function() {
                var a = this.options,
                    d = this.xAxis,
                    f = this.yAxis,
                    h = function(a, d, f) {
                        return Math.min(Math.max(d, a), f)
                    };
                this.generatePoints();
                D(this.points, function(g) {
                    var n = (a.colsize || 1) / 2,
                        k = (a.rowsize || 1) / 2,
                        e = h(Math.round(d.len - d.translate(g.x - n, 0, 1, 0, 1)), -d.len, 2 * d.len),
                        n = h(Math.round(d.len - d.translate(g.x + n, 0, 1, 0, 1)), -d.len, 2 * d.len),
                        c = h(Math.round(f.translate(g.y - k, 0, 1, 0, 1)), -f.len, 2 * f.len),
                        k = h(Math.round(f.translate(g.y + k, 0, 1, 0, 1)), -f.len, 2 * f.len);
                    g.plotX = g.clientX = (e + n) / 2;
                    g.plotY = (c + k) / 2;
                    g.shapeType = "rect";
                    g.shapeArgs = {
                        x: Math.min(e, n),
                        y: Math.min(c, k),
                        width: Math.abs(n - e),
                        height: Math.abs(k - c)
                    }
                });
                this.translateColors()
            },
            drawPoints: function() {
                t.column.prototype.drawPoints.call(this);
                D(this.points, function(a) {
                    a.graphic.attr(this.colorAttribs(a))
                }, this)
            },
            animate: B,
            getBox: B,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: t.column.prototype.alignDataLabel,
            getExtremes: function() {
                h.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                h.prototype.getExtremes.call(this)
            }
        }), z)
    })(K);
    (function(a) {
        var z = a.addEvent,
            D = a.Chart,
            C = a.createElement,
            B = a.css,
            d = a.defaultOptions,
            h = a.defaultPlotOptions,
            q = a.each,
            t = a.extend,
            g = a.fireEvent,
            p = a.hasTouch,
            f = a.inArray,
            n = a.isObject,
            w = a.Legend,
            v = a.merge,
            k = a.pick,
            e = a.Point,
            c = a.Series,
            b = a.seriesTypes,
            F = a.svg;
        a = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    d = function(a) {
                        for (var c = a.target, d; c && !d;) d = c.point, c = c.parentNode;
                        if (void 0 !== d && d !== b.hoverPoint) d.onMouseOver(a)
                    };
                q(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (q(a.trackerGroups, function(b) {
                    if (a[b]) {
                        a[b].addClass("highcharts-tracker").on("mouseover",
                            d).on("mouseout", function(a) {
                            c.onTrackerMouseOut(a)
                        });
                        if (p) a[b].on("touchstart", d);
                        a.options.cursor && a[b].css(B).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length,
                    g = a.chart,
                    f = g.pointer,
                    h = g.renderer,
                    k = g.options.tooltip.snap,
                    n = a.tracker,
                    m, t = function() {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    },
                    w = "rgba(192,192,192," + (F ? .0001 : .002) + ")";
                if (e && !c)
                    for (m = e + 1; m--;) "M" === d[m] && d.splice(m + 1, 0, d[m +
                        1] - k, d[m + 2], "L"), (m && "M" === d[m] || m === e) && d.splice(m, 0, "L", d[m - 2] + k, d[m - 1]);
                n ? n.attr({
                    d: d
                }) : a.graph && (a.tracker = h.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: w,
                    fill: c ? w : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * k),
                    zIndex: 2
                }).add(a.group), q([a.tracker, a.markerGroup], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", t).on("mouseout", function(a) {
                        f.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (p) a.on("touchstart", t)
                }))
            }
        };
        b.column &&
            (b.column.prototype.drawTracker = a.drawTrackerPoint);
        b.pie && (b.pie.prototype.drawTracker = a.drawTrackerPoint);
        b.scatter && (b.scatter.prototype.drawTracker = a.drawTrackerPoint);
        t(w.prototype, {
            setItemEvents: function(a, b, c) {
                var d = this,
                    e = d.chart,
                    f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    e.seriesGroup.addClass(f);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function() {
                    b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
                    e.seriesGroup.removeClass(f);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : g(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = C("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                z(a.checkbox, "click", function(b) {
                    g(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        d.legend.itemStyle.cursor =
            "pointer";
        t(D.prototype, {
            showResetZoom: function() {
                var a = this,
                    b = d.lang,
                    c = a.options.chart.resetZoomButton,
                    e = c.theme,
                    g = e.states,
                    f = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                    a.zoomOut()
                }, e, g && g.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
            },
            zoomOut: function() {
                var a = this;
                g(a, "selection", {
                    resetSelection: !0
                }, function() {
                    a.zoom()
                })
            },
            zoom: function(a) {
                var b, c = this.pointer,
                    d = !1,
                    e;
                !a || a.resetSelection ? q(this.axes, function(a) {
                    b = a.zoom()
                }) : q(a.xAxis.concat(a.yAxis), function(a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
                });
                e = this.resetZoomButton;
                d && !e ? this.showResetZoom() : !d && n(e) && (this.resetZoomButton = e.destroy());
                b && this.redraw(k(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && q(d, function(a) {
                    a.setState()
                });
                q("xy" === b ? [1, 0] : [1], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        g = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        f = c[d],
                        h = (b.pointRange || 0) / 2,
                        l = b.getExtremes(),
                        k = b.toValue(f - g, !0) + h,
                        h = b.toValue(f + b.len - g, !0) - h,
                        n = h < k,
                        f = n ? h : k,
                        k = n ? k : h,
                        h = Math.min(l.dataMin, l.min) - f,
                        l = k - Math.max(l.dataMax, l.max);
                    b.series.length && 0 > h && 0 > l && (b.setExtremes(f, k, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = g
                });
                e && c.redraw(!1);
                B(c.container, {
                    cursor: "move"
                })
            }
        });
        t(e.prototype, {
            select: function(a, b) {
                var c = this,
                    d = c.series,
                    e = d.chart;
                a = k(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    d.options.data[f(c, d.data)] = c.options;
                    c.setState(a && "select");
                    b || q(e.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[f(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a, b) {
                var c = this.series,
                    d = c.chart,
                    e = d.tooltip,
                    f = d.hoverPoint;
                if (this.series) {
                    if (!b) {
                        if (f && f !== this) f.onMouseOut();
                        if (d.hoverSeries !== c) c.onMouseOver();
                        d.hoverPoint = this
                    }!e || e.shared &&
                        !c.noSharedTooltip ? e || this.setState("hover") : (this.setState("hover"), e.refresh(this, a));
                    this.firePointEvent("mouseOver")
                }
            },
            onMouseOut: function() {
                var a = this.series.chart,
                    b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== f(this, b) || (this.setState(), a.hoverPoint = null)
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var a = v(this.series.options.point, this.options).events,
                        b;
                    this.events = a;
                    for (b in a) z(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    e = this.series,
                    f = e.options.states[a] || {},
                    g = h[e.type].marker && e.options.marker,
                    n = g && !1 === g.enabled,
                    q = g && g.states && g.states[a] || {},
                    p = !1 === q.enabled,
                    m = e.stateMarkerGraphic,
                    r = this.marker || {},
                    u = e.chart,
                    w = e.halo,
                    v, z = g && e.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === f.enabled || a && (p || n && !1 === q.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
                    z && (v = e.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" +
                        this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.attr(e.pointAttribs(this, a)), v && this.graphic.animate(v, k(u.options.chart.animation, q.animation, g.animation)), m && m.hide();
                    else {
                        if (a && q) {
                            g = r.symbol || e.symbol;
                            m && m.currentSymbol !== g && (m = m.destroy());
                            if (m) m[b ? "animate" : "attr"]({
                                x: v.x,
                                y: v.y
                            });
                            else g && (e.stateMarkerGraphic = m = u.renderer.symbol(g, v.x, v.y, v.width, v.height).add(e.markerGroup), m.currentSymbol = g);
                            m && m.attr(e.pointAttribs(this, a))
                        }
                        m && (m[a && u.isInsidePlot(c, d, u.inverted) ?
                            "show" : "hide"](), m.element.point = this)
                    }(c = f.halo) && c.size ? (w || (e.halo = w = u.renderer.path().add(z ? e.markerGroup : e.group)), w[b ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    }), w.attr({
                        "class": "highcharts-halo highcharts-color-" + k(this.colorIndex, e.colorIndex)
                    }), w.point = this, w.attr(t({
                        fill: this.color || e.color,
                        "fill-opacity": c.opacity,
                        zIndex: -1
                    }, c.attributes))) : w && w.point && w.point.haloPath && w.animate({
                        d: w.point.haloPath(0)
                    });
                    this.state = a
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        t(c.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && g(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && g(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c =
                    b.options,
                    d = b.graph,
                    e = c.states,
                    g = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (q([b.group, b.markerGroup], function(c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (g = e[a].lineWidth || g + (e[a].lineWidthPlus || 0)), d && !d.dashstyle))
                    for (e = {
                            "stroke-width": g
                        }, d.attr(e); b["zone-graph-" + c];) b["zone-graph-" + c].attr(e), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    f, h = d.options.chart.ignoreHiddenSeries,
                    k = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                q(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && q(d.series, function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                q(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                h && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                g(c, f)
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                g(this, a ? "select" : "unselect")
            },
            drawTracker: a.drawTrackerGraph
        })
    })(K);
    (function(a) {
        var z = a.Chart,
            D = a.each,
            C = a.inArray,
            B = a.isObject,
            d = a.pick,
            h = a.splat;
        z.prototype.setResponsive = function(a) {
            var d = this.options.responsive;
            d && d.rules && D(d.rules, function(d) {
                this.matchResponsiveRule(d, a)
            }, this)
        };
        z.prototype.matchResponsiveRule = function(h, t) {
            var g = this.respRules,
                p = h.condition,
                f;
            f = p.callback || function() {
                return this.chartWidth <= d(p.maxWidth, Number.MAX_VALUE) && this.chartHeight <= d(p.maxHeight, Number.MAX_VALUE) && this.chartWidth >= d(p.minWidth, 0) && this.chartHeight >= d(p.minHeight, 0)
            };
            void 0 === h._id && (h._id = a.uniqueKey());
            f = f.call(this);
            !g[h._id] && f ? h.chartOptions && (g[h._id] = this.currentOptions(h.chartOptions), this.update(h.chartOptions, t)) : g[h._id] && !f && (this.update(g[h._id], t), delete g[h._id])
        };
        z.prototype.currentOptions = function(a) {
            function d(a, g, n) {
                var f, p;
                for (f in a)
                    if (-1 <
                        C(f, ["series", "xAxis", "yAxis"]))
                        for (a[f] = h(a[f]), n[f] = [], p = 0; p < a[f].length; p++) n[f][p] = {}, d(a[f][p], g[f][p], n[f][p]);
                    else B(a[f]) ? (n[f] = {}, d(a[f], g[f] || {}, n[f])) : n[f] = g[f] || null
            }
            var g = {};
            d(a, this.options, g);
            return g
        }
    })(K);
    return K
});
