"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var e,
    t = require("react"),
    n = (e = t) && "object" == typeof e && "default" in e ? e.default : e;
function a(e, t, n) {
    return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
}
function r() {
    return (r =
        Object.assign ||
        function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            }
            return e;
        }).apply(this, arguments);
}
function o(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
            (a = a.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, a);
    }
    return n;
}
function i(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
            ? o(Object(n), !0).forEach(function (t) {
                  a(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : o(Object(n)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
              });
    }
    return e;
}
function c(e, t) {
    if (null == e) return {};
    var n,
        a,
        r = (function (e, t) {
            if (null == e) return {};
            var n,
                a,
                r = {},
                o = Object.keys(e);
            for (a = 0; a < o.length; a++) (n = o[a]), t.indexOf(n) >= 0 || (r[n] = e[n]);
            return r;
        })(e, t);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (a = 0; a < o.length; a++) (n = o[a]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]));
    }
    return r;
}
function l(e, t) {
    return (
        (function (e) {
            if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
            if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
            var n = [],
                a = !0,
                r = !1,
                o = void 0;
            try {
                for (var i, c = e[Symbol.iterator](); !(a = (i = c.next()).done) && (n.push(i.value), !t || n.length !== t); a = !0);
            } catch (e) {
                (r = !0), (o = e);
            } finally {
                try {
                    a || null == c.return || c.return();
                } finally {
                    if (r) throw o;
                }
            }
            return n;
        })(e, t) ||
        (function () {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        })()
    );
}
function s(e) {
    return (
        (function (e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
                return n;
            }
        })(e) ||
        (function (e) {
            if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
        })(e) ||
        (function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance");
        })()
    );
}
var u = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
    d = function (e, t) {
        return Array.from(Array(e).keys()).map(function (e) {
            return { value: e + 1, id: "".concat(t, "-").concat(e) };
        });
    },
    m = function (e, t) {
        return !(!e || !t) && e.day === t.day && e.month === t.month && e.year === t.year;
    },
    f = function (e) {
        return 1 === e.toString().length ? "0".concat(e) : e;
    },
    h = function (e) {
        return i({}, e);
    },
    y = function (e, t) {
        var n = "NEXT" === t ? 1 : -1,
            a = e.month + n,
            r = e.year;
        return a < 1 && ((a = 12), (r -= 1)), a > 12 && ((a = 1), (r += 1)), { year: r, month: a, day: 1 };
    },
    g = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e || {}, t);
    },
    p = function (e) {
        if (Array.isArray(e)) return "MUTLI_DATE";
        if (g(e, "from") && g(e, "to")) return "RANGE";
        if (!e || (g(e, "year") && g(e, "month") && g(e, "day"))) return "SINGLE_DATE";
        throw new TypeError("The passed value is malformed! Please make sure you're using one of the valid value types for date picker.");
    },
    v = {
        toJalaali: function (e, t, n) {
            "[object Date]" === Object.prototype.toString.call(e) && ((n = e.getDate()), (t = e.getMonth() + 1), (e = e.getFullYear()));
            return C(N(e, t, n));
        },
        toGregorian: function (e, t, n) {
            return w(E(e, t, n));
        },
        isValidJalaaliDate: function (e, t, n) {
            return e >= -61 && e <= 3177 && t >= 1 && t <= 12 && n >= 1 && n <= S(e, t);
        },
        isLeapJalaaliYear: D,
        jalaaliMonthLength: S,
        jalCal: b,
        j2d: E,
        d2j: C,
        g2d: N,
        d2g: w,
    };
function D(e) {
    return 0 === b(e).leap;
}
function S(e, t) {
    return t <= 6 ? 31 : t <= 11 || D(e) ? 30 : 29;
}
function b(e) {
    var t,
        n,
        a,
        r,
        o,
        i,
        c = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178],
        l = c.length,
        s = e + 621,
        u = -14,
        d = c[0];
    if (e < d || e >= c[l - 1]) throw new Error("Invalid Jalaali year " + e);
    for (i = 1; i < l && ((n = (t = c[i]) - d), !(e < t)); i += 1) (u = u + 8 * _(n, 33) + _(A(n, 33), 4)), (d = t);
    return (
        (u = u + 8 * _((o = e - d), 33) + _(A(o, 33) + 3, 4)),
        4 === A(n, 33) && n - o == 4 && (u += 1),
        (r = 20 + u - (_(s, 4) - _(3 * (_(s, 100) + 1), 4) - 150)),
        n - o < 6 && (o = o - n + 33 * _(n + 4, 33)),
        -1 === (a = A(A(o + 1, 33) - 1, 4)) && (a = 4),
        { leap: a, gy: s, march: r }
    );
}
function E(e, t, n) {
    var a = b(e);
    return N(a.gy, 3, a.march) + 31 * (t - 1) - _(t, 7) * (t - 7) + n - 1;
}
function C(e) {
    var t,
        n = w(e).gy,
        a = n - 621,
        r = b(a);
    if ((t = e - N(n, 3, r.march)) >= 0) {
        if (t <= 185) return { jy: a, jm: 1 + _(t, 31), jd: A(t, 31) + 1 };
        t -= 186;
    } else (a -= 1), (t += 179), 1 === r.leap && (t += 1);
    return { jy: a, jm: 7 + _(t, 30), jd: A(t, 30) + 1 };
}
function N(e, t, n) {
    var a = _(1461 * (e + _(t - 8, 6) + 100100), 4) + _(153 * A(t + 9, 12) + 2, 5) + n - 34840408;
    return (a = a - _(3 * _(e + 100100 + _(t - 8, 6), 100), 4) + 752);
}
function w(e) {
    var t, n, a, r;
    return (t = (t = 4 * e + 139361631) + 4 * _(3 * _(4 * e + 183187720, 146097), 4) - 3908), (n = 5 * _(A(t, 1461), 4) + 308), (a = _(A(n, 153), 5) + 1), (r = A(_(n, 153), 12) + 1), { gy: _(t, 1461) - 100100 + _(8 - r, 6), gm: r, gd: a };
}
function _(e, t) {
    return ~~(e / t);
}
function A(e, t) {
    return e - ~~(e / t) * t;
}
var O = {
        en: {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekDays: [
                { name: "Sunday", short: "S", isWeekend: !0 },
                { name: "Monday", short: "M" },
                { name: "Tuesday", short: "T" },
                { name: "Wednesday", short: "W" },
                { name: "Thursday", short: "T" },
                { name: "Friday", short: "F" },
                { name: "Saturday", short: "S", isWeekend: !0 },
            ],
            weekStartingIndex: 0,
            getToday: function (e) {
                return e;
            },
            toNativeDate: function (e) {
                return new Date(e.year, e.month - 1, e.day);
            },
            getMonthLength: function (e) {
                return new Date(e.year, e.month, 0).getDate();
            },
            transformDigit: function (e) {
                return e;
            },
            nextMonth: "Next Month",
            previousMonth: "Previous Month",
            openMonthSelector: "Open Month Selector",
            openYearSelector: "Open Year Selector",
            closeMonthSelector: "Close Month Selector",
            closeYearSelector: "Close Year Selector",
            from: "from",
            to: "to",
            defaultPlaceholder: "Select...",
            digitSeparator: ",",
            yearLetterSkip: 0,
            isRtl: !1,
        },
        fa: {
            months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
            weekDays: [
                { name: "شنبه", short: "ش" },
                { name: "یکشنبه", short: "ی" },
                { name: "دوشنبه", short: "د" },
                { name: "سه شنبه", short: "س" },
                { name: "چهارشنبه", short: "چ" },
                { name: "پنجشنبه", short: "پ" },
                { name: "جمعه", short: "ج", isWeekend: !0 },
            ],
            weekStartingIndex: 1,
            getToday: function (e) {
                var t = e.year,
                    n = e.month,
                    a = e.day,
                    r = v.toJalaali(t, n, a);
                return { year: r.jy, month: r.jm, day: r.jd };
            },
            toNativeDate: function (e) {
                var t = v.toGregorian.apply(
                    v,
                    s(
                        (function (e) {
                            return [e.year, e.month, e.day];
                        })(e)
                    )
                );
                return new Date(t.gy, t.gm - 1, t.gd);
            },
            getMonthLength: function (e) {
                return v.jalaaliMonthLength(e.year, e.month);
            },
            transformDigit: function (e) {
                return e
                    .toString()
                    .split("")
                    .map(function (e) {
                        return u[Number(e)];
                    })
                    .join("");
            },
            nextMonth: "ماه بعد",
            previousMonth: "ماه قبل",
            openMonthSelector: "نمایش انتخابگر ماه",
            openYearSelector: "نمایش انتخابگر سال",
            closeMonthSelector: "بستن انتخابگر ماه",
            closeYearSelector: "بستن انتخابگر ماه",
            from: "از",
            to: "تا",
            defaultPlaceholder: "انتخاب...",
            digitSeparator: "،",
            yearLetterSkip: -2,
            isRtl: !0,
        },
    },
    k = function (e) {
        return "string" == typeof e ? O[e] : e;
    },
    T = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "en",
            t = "string" == typeof e ? k(e) : e,
            n = t.months,
            a = t.getToday,
            r = t.toNativeDate,
            o = t.getMonthLength,
            c = t.weekStartingIndex,
            l = t.transformDigit,
            s = function () {
                var e = new Date(),
                    t = e.getFullYear(),
                    n = e.getMonth() + 1,
                    r = e.getDate();
                return a({ year: t, month: n, day: r });
            },
            u = function (e) {
                return n[e - 1];
            },
            d = function (e) {
                return n.indexOf(e) + 1;
            },
            m = function (e) {
                return (r(i({}, e, { day: 1 })).getDay() + c) % 7;
            },
            f = function (e, t) {
                return !(!e || !t) && r(e) < r(t);
            },
            h = function (e) {
                var t = e.day,
                    n = e.from,
                    a = e.to;
                if (!t || !n || !a) return !1;
                var o = r(t),
                    i = r(n),
                    c = r(a);
                return o > i && o < c;
            };
        return { getToday: s, getMonthName: u, getMonthNumber: d, getMonthLength: o, getMonthFirstWeekday: m, isBeforeDate: f, checkDayInDayRange: h, getLanguageDigits: l };
    },
    M = function (e) {
        return t.useMemo(
            function () {
                return T(e);
            },
            [e]
        );
    },
    L = function (e) {
        return t.useMemo(
            function () {
                return k(e);
            },
            [e]
        );
    },
    x = function (e) {
        var t = e.parent,
            n = e.isInitialActiveChild,
            a = e.activeDate,
            r = e.monthChangeDirection;
        if (!t) return n ? a : y(a, "NEXT");
        var o = t.children[n ? 0 : 1];
        return o.classList.contains("-shown") || o.classList.contains("-shownAnimated") ? a : y(a, r);
    },
    R = function (e) {
        var t = e.parent,
            n = e.direction,
            a = Array.from(t.children),
            r = a.find(function (e) {
                return e.classList.contains("-shown");
            }),
            o = a.find(function (e) {
                return e !== r;
            }),
            i = r.classList[0],
            c = "NEXT" === n,
            l = function (e) {
                return e ? "-hiddenNext" : "-hiddenPrevious";
            };
        (o.style.transition = "none"), (r.style.transition = ""), (r.className = "".concat(i, " ").concat(l(!c))), (o.className = "".concat(i, " ").concat(l(c))), o.classList.add("-shownAnimated");
    },
    P = function (e) {
        var t = e.target;
        t.classList.remove("-hiddenNext"), t.classList.remove("-hiddenPrevious"), t.classList.replace("-shownAnimated", "-shown");
    },
    j = function (e) {
        var a = e.maximumDate,
            o = e.minimumDate,
            c = e.onMonthChange,
            l = e.activeDate,
            u = e.monthChangeDirection,
            d = e.onMonthSelect,
            f = e.onYearSelect,
            h = e.isMonthSelectorOpen,
            y = e.isYearSelectorOpen,
            g = e.locale,
            p = t.useRef(null),
            v = t.useRef(null),
            D = M(g),
            S = D.getMonthName,
            b = D.isBeforeDate,
            E = D.getLanguageDigits,
            C = L(g),
            N = C.isRtl,
            w = C.nextMonth,
            _ = C.previousMonth,
            A = C.openMonthSelector,
            O = C.closeMonthSelector,
            k = C.openYearSelector,
            T = C.closeYearSelector;
        t.useEffect(
            function () {
                u && R({ direction: u, parent: v.current });
            },
            [u]
        ),
            t.useEffect(
                function () {
                    var e = h || y,
                        t = p.current.querySelector(".Calendar__monthYear.-shown .Calendar__monthText"),
                        n = t.nextSibling,
                        a = function (e) {
                            return e.classList.contains("-activeBackground");
                        };
                    if (!(!e && !a(t) && !a(n))) {
                        var r = s(p.current.querySelectorAll(".Calendar__monthArrowWrapper")),
                            o = h || a(t),
                            i = o ? t : n,
                            c = o ? n : t,
                            l = o ? 1 : -1;
                        N && (l *= -1);
                        var u = e ? 1 : 0.95,
                            d = e ? "".concat((l * c.offsetWidth) / 2) : 0;
                        e ? c.setAttribute("aria-hidden", !0) : c.removeAttribute("aria-hidden"),
                            c.setAttribute("tabindex", e ? "-1" : "0"),
                            (c.style.transform = ""),
                            (i.style.transform = "scale(".concat(u, ") ").concat(d ? "translateX(".concat(d, "px)") : "")),
                            i.classList.toggle("-activeBackground"),
                            c.classList.toggle("-hidden"),
                            r.forEach(function (e) {
                                var t = e.classList.contains("-hidden");
                                e.classList.toggle("-hidden"), t ? (e.removeAttribute("aria-hidden"), e.setAttribute("tabindex", "0")) : (e.setAttribute("aria-hidden", !0), e.setAttribute("tabindex", "-1"));
                            });
                    }
                },
                [h, y]
            );
        var j = a && b(a, i({}, l, { month: l.month + 1, day: 1 })),
            I = o && (b(i({}, l, { day: 1 }), o) || m(o, i({}, l, { day: 1 }))),
            Y = function (e) {
                Array.from(v.current.children).some(function (e) {
                    return e.classList.contains("-shownAnimated");
                }) || c(e);
            },
            W = [!0, !1].map(function (e) {
                var t = (function (e) {
                        var t = x({ isInitialActiveChild: e, monthChangeDirection: u, activeDate: l, parent: v.current }),
                            n = E(t.year);
                        return { month: S(t.month), year: n };
                    })(e),
                    a = t.month,
                    o = t.year,
                    c = a === S(l.month),
                    s = i({}, c ? {} : { "aria-hidden": !0 });
                return n.createElement(
                    "div",
                    r({ onAnimationEnd: P, className: "Calendar__monthYear ".concat(e ? "-shown" : "-hiddenNext"), role: "presentation", key: String(e) }, s),
                    n.createElement("button", r({ onClick: d, type: "button", className: "Calendar__monthText", "aria-label": h ? O : A, tabIndex: c ? "0" : "-1" }, s), a),
                    n.createElement("button", r({ onClick: f, type: "button", className: "Calendar__yearText", "aria-label": y ? T : k, tabIndex: c ? "0" : "-1" }, s), o)
                );
            });
        return n.createElement(
            "div",
            { ref: p, className: "Calendar__header" },
            n.createElement(
                "button",
                {
                    className: "Calendar__monthArrowWrapper -right",
                    onClick: function () {
                        Y("PREVIOUS");
                    },
                    "aria-label": _,
                    type: "button",
                    disabled: I,
                },
                n.createElement("span", { className: "Calendar__monthArrow" })
            ),
            n.createElement("div", { className: "Calendar__monthYearContainer", ref: v, "data-testid": "month-year-container" }, " ", W),
            n.createElement(
                "button",
                {
                    className: "Calendar__monthArrowWrapper -left",
                    onClick: function () {
                        Y("NEXT");
                    },
                    "aria-label": w,
                    type: "button",
                    disabled: j,
                },
                n.createElement("span", { className: "Calendar__monthArrow" })
            )
        );
    },
    I = function (e, t) {
        var n = t.allowVerticalArrows,
            a = document.activeElement,
            r = function (e, t) {
                return e ? e.children[t] : null;
            },
            o = function (e) {
                return e && (e.hasAttribute("aria-hidden") ? null : e);
            },
            i = a.parentElement,
            c = i.nextSibling,
            l = i.previousSibling,
            s = o(a.nextSibling || r(c, 0)),
            u = l ? l.children.length - 1 : 0,
            d = o(a.previousSibling || r(l, u)),
            m = function (e) {
                return r(e, Array.from(a.parentElement.children).indexOf(a));
            },
            f = o(m(c)),
            h = o(m(l));
        "true" === a.dataset.isDefaultSelectable || (a.tabIndex = "-1");
        var y = function (t) {
            e.preventDefault(), t && (t.setAttribute("tabindex", "0"), t.focus());
        };
        switch (e.key) {
            case "ArrowRight":
                y(s);
                break;
            case "ArrowLeft":
                y(d);
                break;
            case "ArrowDown":
                n && y(f);
                break;
            case "ArrowUp":
                n && y(h);
        }
    },
    Y = function (e) {
        var a = e.activeDate,
            o = e.maximumDate,
            c = e.minimumDate,
            l = e.onMonthSelect,
            s = e.isOpen,
            u = e.locale,
            d = t.useRef(null);
        t.useEffect(
            function () {
                var e = s ? "add" : "remove";
                d.current.classList[e]("-open");
            },
            [s]
        );
        var f = M(u),
            h = f.getMonthNumber,
            y = f.isBeforeDate,
            g = L(u).months;
        return n.createElement(
            "div",
            r({ role: "presentation", className: "Calendar__monthSelectorAnimationWrapper" }, s ? {} : { "aria-hidden": !0 }),
            n.createElement(
                "div",
                {
                    role: "presentation",
                    "data-testid": "month-selector-wrapper",
                    className: "Calendar__monthSelectorWrapper",
                    onKeyDown: function (e) {
                        I(e, { allowVerticalArrows: !1 });
                    },
                },
                n.createElement(
                    "ul",
                    { ref: d, className: "Calendar__monthSelector", "data-testid": "month-selector" },
                    g.map(function (e) {
                        var t = h(e),
                            r = { day: 1, month: t, year: a.year },
                            u = o && y(o, i({}, r, { month: t })),
                            d = c && (y(i({}, r, { month: t + 1 }), c) || m(i({}, r, { month: t + 1 }), c)),
                            f = t === a.month;
                        return n.createElement(
                            "li",
                            { key: e, className: "Calendar__monthSelectorItem ".concat(f ? "-active" : "") },
                            n.createElement(
                                "button",
                                {
                                    tabIndex: f && s ? "0" : "-1",
                                    onClick: function () {
                                        l(t);
                                    },
                                    className: "Calendar__monthSelectorItemText",
                                    type: "button",
                                    disabled: u || d,
                                    "aria-pressed": f,
                                    "data-is-default-selectable": f,
                                },
                                e
                            )
                        );
                    })
                )
            )
        );
    },
    W = function (e) {
        for (
            var a = e.isOpen,
                o = e.activeDate,
                i = e.onYearSelect,
                c = e.selectorStartingYear,
                l = e.selectorEndingYear,
                s = e.maximumDate,
                u = e.minimumDate,
                d = e.locale,
                m = t.useRef(null),
                f = t.useRef(null),
                h = M(d),
                y = h.getLanguageDigits,
                g = h.getToday,
                p = c || g().year - 100,
                v = l || g().year + 50,
                D = [],
                S = p;
            S <= v;
            S += 1
        )
            D.push(S);
        t.useEffect(
            function () {
                var e = a ? "add" : "remove",
                    t = m.current.querySelector(".Calendar__yearSelectorItem.-active");
                if (!t)
                    throw new RangeError(
                        "Provided value for year is out of selectable year range. You're probably using a wrong locale prop value or your provided value's locale is different from the date picker locale. Try changing the 'locale' prop or the value you've provided."
                    );
                m.current.classList[e]("-faded"), (f.current.scrollTop = t.offsetTop - 5 * t.offsetHeight), f.current.classList[e]("-open");
            },
            [a]
        );
        return n.createElement(
            "div",
            r({ className: "Calendar__yearSelectorAnimationWrapper", role: "presentation" }, a ? {} : { "aria-hidden": !0 }),
            n.createElement(
                "div",
                {
                    ref: m,
                    className: "Calendar__yearSelectorWrapper",
                    role: "presentation",
                    "data-testid": "year-selector-wrapper",
                    onKeyDown: function (e) {
                        I(e, { allowVerticalArrows: !1 });
                    },
                },
                n.createElement(
                    "ul",
                    { ref: f, className: "Calendar__yearSelector", "data-testid": "year-selector" },
                    D.map(function (e) {
                        var t = s && e > s.year,
                            r = u && e < u.year,
                            c = o.year === e;
                        return n.createElement(
                            "li",
                            { key: e, className: "Calendar__yearSelectorItem ".concat(c ? "-active" : "") },
                            n.createElement(
                                "button",
                                {
                                    tabIndex: c && a ? "0" : "-1",
                                    className: "Calendar__yearSelectorText",
                                    type: "button",
                                    onClick: function () {
                                        i(e);
                                    },
                                    disabled: t || r,
                                    "aria-pressed": c,
                                    "data-is-default-selectable": c,
                                },
                                y(e)
                            )
                        );
                    })
                )
            )
        );
    };
W.defaultProps = { selectorStartingYear: 0, selectorEndingYear: 0 };
var B = function (e) {
    var a = e.activeDate,
        o = e.value,
        l = e.monthChangeDirection,
        u = e.onSlideChange,
        f = e.disabledDays,
        h = e.onDisabledDayError,
        y = e.minimumDate,
        g = e.maximumDate,
        v = e.onChange,
        D = e.locale,
        S = e.calendarTodayClassName,
        b = e.calendarSelectedDayClassName,
        E = e.calendarRangeStartClassName,
        C = e.calendarRangeEndClassName,
        N = e.calendarRangeBetweenClassName,
        w = e.shouldHighlightWeekends,
        _ = e.isQuickSelectorOpen,
        A = e.customDaysClassName,
        O = t.useRef(null),
        k = L(D),
        T = k.isRtl,
        j = k.weekDays,
        Y = M(D),
        W = Y.getToday,
        B = Y.isBeforeDate,
        F = Y.checkDayInDayRange,
        G = Y.getMonthFirstWeekday,
        J = Y.getMonthLength,
        U = Y.getLanguageDigits,
        H = Y.getMonthName,
        V = W();
    t.useEffect(
        function () {
            l && R({ direction: l, parent: O.current });
        },
        [l]
    );
    var K = function (e) {
            var t,
                n =
                    ((t = o),
                    JSON.parse(
                        JSON.stringify(t, function (e, t) {
                            return void 0 === t ? null : t;
                        })
                    )),
                a = n.from && n.to ? { from: null, to: null } : n,
                r = a.from ? "to" : "from";
            a[r] = e;
            var i = a.from,
                c = a.to;
            B(a.to, a.from) && ((a.from = c), (a.to = i));
            var l = f.find(function (e) {
                return F({ day: e, from: a.from, to: a.to });
            });
            return l ? (h(l), o) : a;
        },
        X = function (e) {
            var t = (function () {
                switch (p(o)) {
                    case "SINGLE_DATE":
                        return e;
                    case "RANGE":
                        return K(e);
                    case "MUTLI_DATE":
                        return (function (e) {
                            var t = o.some(function (t) {
                                    return m(t, e);
                                }),
                                n = [].concat(s(o), [e]),
                                a = o.filter(function (t) {
                                    return !m(t, e);
                                });
                            return t ? a : n;
                        })(e);
                }
            })();
            v(t);
        },
        q = function (e) {
            var t,
                n,
                a = m(e, V),
                r =
                    ((t = e),
                    "SINGLE_DATE" === (n = p(o))
                        ? m(t, o)
                        : "MUTLI_DATE" === n
                        ? o.some(function (e) {
                              return m(e, t);
                          })
                        : void 0),
                i = o || {},
                c = i.from,
                l = i.to;
            return { isToday: a, isSelected: r, isStartingDayRange: m(e, c), isEndingDayRange: m(e, l), isWithinRange: F({ day: e, from: c, to: l }) };
        },
        Q = function (e) {
            var t = e.isDisabled,
                n = c(e, ["isDisabled"]);
            t ? h(n) : X(n);
        },
        z = function (e, t) {
            var o = e.id,
                c = e.value,
                l = e.month,
                s = e.year,
                u = e.isStandard,
                d = { day: c, month: l, year: s },
                h = f.some(function (e) {
                    return m(d, e);
                }),
                p = B(d, y),
                v = B(g, d),
                D = h || (u && (p || v)),
                O = j.some(function (e, n) {
                    return e.isWeekend && n === t;
                }),
                k = (function (e) {
                    var t = q(e),
                        n = t.isToday,
                        a = t.isSelected,
                        r = t.isStartingDayRange,
                        o = t.isEndingDayRange,
                        i = t.isWithinRange,
                        c = A.find(function (t) {
                            return m(e, t);
                        });
                    return ""
                        .concat(n && !a ? " -today ".concat(S) : "")
                        .concat(e.isStandard ? "" : " -blank")
                        .concat(e.isWeekend && w ? " -weekend" : "")
                        .concat(c ? " ".concat(c.className) : "")
                        .concat(a ? " -selected ".concat(b) : "")
                        .concat(r ? " -selectedStart ".concat(E) : "")
                        .concat(o ? " -selectedEnd ".concat(C) : "")
                        .concat(i ? " -selectedBetween ".concat(N) : "")
                        .concat(e.isDisabled ? " -disabled" : "");
                })(i({}, d, { isWeekend: O, isStandard: u, isDisabled: D })),
                M = "".concat(j[t].name, ", ").concat(c, " ").concat(H(l), " ").concat(s),
                L = l === a.month,
                x = q(d),
                R = x.isSelected,
                P = x.isStartingDayRange,
                I = x.isEndingDayRange,
                Y = x.isWithinRange,
                W = (function (e) {
                    var t = e.isOnActiveSlide,
                        n = e.isStandard,
                        a = e.isSelected,
                        r = e.isStartingDayRange,
                        o = e.isToday,
                        i = e.day;
                    return !(_ || !t || !n) && (!!(a || r || o || 1 === i) || void 0);
                })(i({}, d, {}, x, { isOnActiveSlide: L, isStandard: u }));
            return n.createElement(
                "div",
                r(
                    {
                        tabIndex: W ? "0" : "-1",
                        key: o,
                        className: "Calendar__day -".concat(T ? "rtl" : "ltr", " ").concat(k),
                        onClick: function () {
                            Q(i({}, d, { isDisabled: D }));
                        },
                        onKeyDown: function (e) {
                            "Enter" === e.key && Q(i({}, d, { isDisabled: D }));
                        },
                        "aria-disabled": D,
                        "aria-label": M,
                        "aria-selected": R || P || I || Y,
                    },
                    u && L && !_ ? {} : { "aria-hidden": !0 },
                    { role: "gridcell", "data-is-default-selectable": W }
                ),
                u ? U(c) : ""
            );
        },
        Z = function (e) {
            var t = (function (e) {
                var t = d(G(e), "starting-blank"),
                    n = d(J(e)).map(function (t) {
                        return i({}, t, { isStandard: !0, month: e.month, year: e.year });
                    });
                return [].concat(s(t), s(n));
            })(x({ activeDate: a, isInitialActiveChild: e, monthChangeDirection: l, parent: O.current }));
            return Array.from(Array(6).keys()).map(function (e) {
                var a = t.slice(7 * e, 7 * e + 7).map(z);
                return n.createElement("div", { key: String(e), className: "Calendar__weekRow", role: "row" }, a);
            });
        };
    return n.createElement(
        "div",
        {
            ref: O,
            className: "Calendar__sectionWrapper",
            role: "presentation",
            "data-testid": "days-section-wrapper",
            onKeyDown: function (e) {
                I(e, { allowVerticalArrows: !0 });
            },
        },
        n.createElement(
            "div",
            {
                onAnimationEnd: function (e) {
                    P(e), u();
                },
                className: "Calendar__section -shown",
                role: "rowgroup",
            },
            Z(!0)
        ),
        n.createElement(
            "div",
            {
                onAnimationEnd: function (e) {
                    P(e), u();
                },
                className: "Calendar__section -hiddenNext",
                role: "rowgroup",
            },
            Z(!1)
        )
    );
};
B.defaultProps = {
    onChange: function () {},
    onDisabledDayError: function () {},
    disabledDays: [],
    calendarTodayClassName: "",
    calendarSelectedDayClassName: "",
    calendarRangeStartClassName: "",
    calendarRangeBetweenClassName: "",
    calendarRangeEndClassName: "",
    shouldHighlightWeekends: !1,
};
var F = function (e) {
    var r = e.value,
        o = e.onChange,
        c = e.onDisabledDayError,
        s = e.calendarClassName,
        u = e.calendarTodayClassName,
        d = e.calendarSelectedDayClassName,
        m = e.calendarRangeStartClassName,
        f = e.calendarRangeBetweenClassName,
        g = e.calendarRangeEndClassName,
        v = e.disabledDays,
        D = e.colorPrimary,
        S = e.colorPrimaryLight,
        b = e.slideAnimationDuration,
        E = e.minimumDate,
        C = e.maximumDate,
        N = e.selectorStartingYear,
        w = e.selectorEndingYear,
        _ = e.locale,
        A = e.shouldHighlightWeekends,
        O = e.renderFooter,
        k = e.customDaysClassName,
        T = t.useRef(null),
        x = l(t.useState({ activeDate: null, monthChangeDirection: "", isMonthSelectorOpen: !1, isYearSelectorOpen: !1 }), 2),
        R = x[0],
        P = x[1];
    t.useEffect(function () {
        var e = function (e) {
            "Tab" === e.key && T.current.classList.remove("-noFocusOutline");
        };
        return (
            
            T.current.addEventListener("keyup", e, !1),
            function () {
                if(T.current)
                T.current.removeEventListener("keyup", e, !1);
            }
        );
    });
    var I,
        F = M(_).getToday,
        G = L(_),
        J = G.weekDays,
        U = G.isRtl,
        H = F(),
        V = function (e) {
            return function () {
                P(i({}, R, a({}, e, !R[e])));
            };
        },
        K = V("isMonthSelectorOpen"),
        X = V("isYearSelectorOpen"),
        q = R.activeDate ? h(R.activeDate) : "MUTLI_DATE" === (I = p(r)) && r.length ? h(r[0]) : "SINGLE_DATE" === I && r ? h(r) : "RANGE" === I && r.from ? h(r.from) : h(H),
        Q = J.map(function (e) {
            return n.createElement("abbr", { key: e.name, title: e.name, className: "Calendar__weekDay" }, e.short);
        });
    return n.createElement(
        "div",
        { className: "Calendar -noFocusOutline ".concat(s, " -").concat(U ? "rtl" : "ltr"), role: "grid", style: { "--cl-color-primary": D, "--cl-color-primary-light": S, "--animation-duration": b }, ref: T },
        n.createElement(j, {
            maximumDate: C,
            minimumDate: E,
            activeDate: q,
            onMonthChange: function (e) {
                P(i({}, R, { monthChangeDirection: e }));
            },
            onMonthSelect: K,
            onYearSelect: X,
            monthChangeDirection: R.monthChangeDirection,
            isMonthSelectorOpen: R.isMonthSelectorOpen,
            isYearSelectorOpen: R.isYearSelectorOpen,
            locale: _,
        }),
        n.createElement(Y, {
            isOpen: R.isMonthSelectorOpen,
            activeDate: q,
            onMonthSelect: function (e) {
                P(i({}, R, { activeDate: i({}, q, { month: e }), isMonthSelectorOpen: !1 }));
            },
            maximumDate: C,
            minimumDate: E,
            locale: _,
        }),
        n.createElement(W, {
            isOpen: R.isYearSelectorOpen,
            activeDate: q,
            onYearSelect: function (e) {
                P(i({}, R, { activeDate: i({}, q, { year: e }), isYearSelectorOpen: !1 }));
            },
            selectorStartingYear: N,
            selectorEndingYear: w,
            maximumDate: C,
            minimumDate: E,
            locale: _,
        }),
        n.createElement("div", { className: "Calendar__weekDays" }, Q),
        n.createElement(B, {
            activeDate: q,
            value: r,
            monthChangeDirection: R.monthChangeDirection,
            onSlideChange: function () {
                P(i({}, R, { activeDate: y(q, R.monthChangeDirection), monthChangeDirection: "" }));
            },
            disabledDays: v,
            onDisabledDayError: c,
            minimumDate: E,
            maximumDate: C,
            onChange: o,
            calendarTodayClassName: u,
            calendarSelectedDayClassName: d,
            calendarRangeStartClassName: m,
            calendarRangeEndClassName: g,
            calendarRangeBetweenClassName: f,
            locale: _,
            shouldHighlightWeekends: A,
            customDaysClassName: k,
            isQuickSelectorOpen: R.isYearSelectorOpen || R.isMonthSelectorOpen,
        }),
        n.createElement("div", { className: "Calendar__footer" }, O())
    );
};
F.defaultProps = {
    minimumDate: null,
    maximumDate: null,
    colorPrimary: "#0eca2d",
    colorPrimaryLight: "#cff4d5",
    slideAnimationDuration: "0.4s",
    calendarClassName: "",
    locale: "en",
    value: null,
    renderFooter: function () {
        return null;
    },
    customDaysClassName: [],
};
var G = n.forwardRef(function (e, t) {
    var a = e.value,
        r = e.inputPlaceholder,
        o = e.inputClassName,
        i = e.inputName,
        c = e.formatInputText,
        l = e.renderInput,
        s = e.locale,
        u = M(s).getLanguageDigits,
        d = L(s),
        m = d.from,
        h = d.to,
        y = d.yearLetterSkip,
        g = d.digitSeparator,
        v = d.defaultPlaceholder,
        D = d.isRtl,
        S = function () {
            if (c()) return c();
            switch (p(a)) {
                case "SINGLE_DATE":
                    return (function () {
                        if (!a) return "";
                        var e = u(a.year),
                            t = u(f(a.month)),
                            n = u(f(a.day));
                        return "".concat(e, "/").concat(t, "/").concat(n);
                    })();
                case "RANGE":
                    return (function () {
                        if (!a.from || !a.to) return "";
                        var e = a.from,
                            t = a.to,
                            n = ""
                                .concat(u(f(e.year)).toString().slice(y), "/")
                                .concat(u(f(e.month)), "/")
                                .concat(u(f(e.day))),
                            r = ""
                                .concat(u(f(t.year)).toString().slice(y), "/")
                                .concat(u(f(t.month)), "/")
                                .concat(u(f(t.day)));
                        return "".concat(m, " ").concat(n, " ").concat(h, " ").concat(r);
                    })();
                case "MUTLI_DATE":
                    return a
                        .map(function (e) {
                            return u(e.day);
                        })
                        .join("".concat(g, " "));
            }
        },
        b = r || v;
    return (
        l({ ref: t }) || n.createElement("input", { "data-testid": "datepicker-input", readOnly: !0, ref: t, value: S(), name: i, placeholder: b, className: "DatePicker__input -".concat(D ? "rtl" : "ltr", " ").concat(o), "aria-label": b })
    );
});
G.defaultProps = {
    formatInputText: function () {
        return "";
    },
    renderInput: function () {
        return null;
    },
    inputPlaceholder: "",
    inputClassName: "",
    inputName: "",
};
var J = function (e) {
    var a = e.value,
        r = e.onChange,
        o = e.formatInputText,
        i = e.inputPlaceholder,
        c = e.inputClassName,
        s = e.inputName,
        u = e.renderInput,
        d = e.wrapperClassName,
        m = e.calendarClassName,
        f = e.calendarTodayClassName,
        h = e.calendarSelectedDayClassName,
        y = e.calendarRangeStartClassName,
        g = e.calendarRangeBetweenClassName,
        v = e.calendarRangeEndClassName,
        D = e.calendarPopperPosition,
        S = e.disabledDays,
        b = e.onDisabledDayError,
        E = e.colorPrimary,
        C = e.colorPrimaryLight,
        N = e.slideAnimationDuration,
        w = e.minimumDate,
        _ = e.maximumDate,
        A = e.selectorStartingYear,
        O = e.selectorEndingYear,
        k = e.locale,
        T = e.shouldHighlightWeekends,
        M = e.renderFooter,
        L = e.customDaysClassName,
        x = t.useRef(null),
        R = t.useRef(null),
        P = t.useRef(!1),
        j = l(t.useState(!1), 2),
        I = j[0],
        Y = j[1];
    t.useEffect(function () {
        var e = function () {
            Y(!1);
        };
        return (
            window.addEventListener("blur", e, !1),
            function () {
                window.removeEventListener("blur", e, !1);
            }
        );
    }, []),
        t.useEffect(
            function () {
                var e = p(a);
                "MUTLI_DATE" !== e && ("SINGLE_DATE" === e ? !I : !I && a.from && a.to) && R.current.blur();
            },
            [a, I]
        );
    t.useLayoutEffect(
        function () {
            if (I) {
                var e = x.current.getBoundingClientRect(),
                    t = e.left,
                    n = e.width,
                    a = e.height,
                    r = e.top,
                    o = document.documentElement,
                    i = o.clientWidth,
                    c = o.clientHeight,
                    l = t + n > i,
                    s = t < 0,
                    u = r + a > c;
                (x.current.style.left = (function () {
                    var e = t + n - i;
                    if (l || s) {
                        var a = Math.abs(t),
                            r = s ? a : 0;
                        return l ? "calc(50% - ".concat(e, "px)") : "calc(50% + ".concat(r, "px)");
                    }
                })()),
                    (("auto" === D && u) || "top" === D) && x.current.classList.add("-top");
            }
        },
        [I]
    );
    return (
        t.useEffect(
            function () {
                !I && P.current && (R.current.focus(), (P.current = !1));
            },
            [P, I]
        ),
        n.createElement(
            "div",
            {
                onFocus: function () {
                    P.current || Y(!0);
                },
                onBlur: function (e) {
                    if ((e.persist(), I)) {
                        var t = x.current.contains(e.relatedTarget);
                        P.current ? ((P.current = !1), R.current.focus()) : t && e.relatedTarget ? e.relatedTarget.focus() : Y(!1);
                    }
                },
                onKeyUp: function (e) {
                    switch (e.key) {
                        case "Enter":
                            Y(!0);
                            break;
                        case "Escape":
                            Y(!1), (P.current = !0);
                    }
                },
                className: "DatePicker ".concat(d),
                role: "presentation",
            },
            n.createElement(G, { ref: R, formatInputText: o, value: a, inputPlaceholder: i, inputClassName: c, renderInput: u, inputName: s, locale: k }),
            I &&
                n.createElement(
                    n.Fragment,
                    null,
                    n.createElement(
                        "div",
                        {
                            ref: x,
                            className: "DatePicker__calendarContainer",
                            "data-testid": "calendar-container",
                            role: "presentation",
                            onMouseDown: function () {
                                P.current = !0;
                            },
                        },
                        n.createElement(F, {
                            value: a,
                            onChange: function (e) {
                                var t = p(a);
                                r(e), ("SINGLE_DATE" === t || ("RANGE" === t && e.from && e.to)) && Y(!1);
                            },
                            calendarClassName: m,
                            calendarTodayClassName: f,
                            calendarSelectedDayClassName: h,
                            calendarRangeStartClassName: y,
                            calendarRangeBetweenClassName: g,
                            calendarRangeEndClassName: v,
                            disabledDays: S,
                            colorPrimary: E,
                            colorPrimaryLight: C,
                            slideAnimationDuration: N,
                            onDisabledDayError: b,
                            minimumDate: w,
                            maximumDate: _,
                            selectorStartingYear: A,
                            selectorEndingYear: O,
                            locale: k,
                            shouldHighlightWeekends: T,
                            renderFooter: M,
                            customDaysClassName: L,
                        })
                    ),
                    n.createElement("div", { className: "DatePicker__calendarArrow" })
                )
        )
    );
};
(J.defaultProps = { wrapperClassName: "", locale: "en", calendarPopperPosition: "auto" }), (exports.Calendar = F), (exports.default = J), (exports.utils = T);
