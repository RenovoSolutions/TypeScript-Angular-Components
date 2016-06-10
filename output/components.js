"bundle";
(function() {
var define = System.amdDefine;
!function(a, b) {
  if ("function" == typeof define && define.amd)
    define("libraries/angular-bootstrap-slider/bootstrap-slider.min", ["jquery"], b);
  else if ("object" == typeof module && module.exports) {
    var c;
    try {
      c = require("jquery");
    } catch (d) {
      c = null;
    }
    module.exports = b(c);
  } else
    a.Slider = b(a.jQuery);
}(this, function(a) {
  var b;
  return function(a) {
    "use strict";
    function b() {}
    function c(a) {
      function c(b) {
        b.prototype.option || (b.prototype.option = function(b) {
          a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
        });
      }
      function e(b, c) {
        a.fn[b] = function(e) {
          if ("string" == typeof e) {
            for (var g = d.call(arguments, 1),
                h = 0,
                i = this.length; i > h; h++) {
              var j = this[h],
                  k = a.data(j, b);
              if (k)
                if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                  var l = k[e].apply(k, g);
                  if (void 0 !== l && l !== k)
                    return l;
                } else
                  f("no such method '" + e + "' for " + b + " instance");
              else
                f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'");
            }
            return this;
          }
          var m = this.map(function() {
            var d = a.data(this, b);
            return d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d)), a(this);
          });
          return !m || m.length > 1 ? m : m[0];
        };
      }
      if (a) {
        var f = "undefined" == typeof console ? b : function(a) {
          console.error(a);
        };
        return a.bridget = function(a, b) {
          c(b), e(a, b);
        }, a.bridget;
      }
    }
    var d = Array.prototype.slice;
    c(a);
  }(a), function(a) {
    function c(b, c) {
      function d(a, b) {
        var c = "data-slider-" + b.replace(/_/g, "-"),
            d = a.getAttribute(c);
        try {
          return JSON.parse(d);
        } catch (e) {
          return d;
        }
      }
      this._state = {
        value: null,
        enabled: null,
        offset: null,
        size: null,
        percentage: null,
        inDrag: !1,
        over: !1
      }, "string" == typeof b ? this.element = document.querySelector(b) : b instanceof HTMLElement && (this.element = b), c = c ? c : {};
      for (var f = Object.keys(this.defaultOptions),
          g = 0; g < f.length; g++) {
        var h = f[g],
            i = c[h];
        i = "undefined" != typeof i ? i : d(this.element, h), i = null !== i ? i : this.defaultOptions[h], this.options || (this.options = {}), this.options[h] = i;
      }
      "vertical" !== this.options.orientation || "top" !== this.options.tooltip_position && "bottom" !== this.options.tooltip_position ? "horizontal" !== this.options.orientation || "left" !== this.options.tooltip_position && "right" !== this.options.tooltip_position || (this.options.tooltip_position = "top") : this.options.tooltip_position = "right";
      var j,
          k,
          l,
          m,
          n,
          o = this.element.style.width,
          p = !1,
          q = this.element.parentNode;
      if (this.sliderElem)
        p = !0;
      else {
        this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
        var r = document.createElement("div");
        if (r.className = "slider-track", k = document.createElement("div"), k.className = "slider-track-low", j = document.createElement("div"), j.className = "slider-selection", l = document.createElement("div"), l.className = "slider-track-high", m = document.createElement("div"), m.className = "slider-handle min-slider-handle", n = document.createElement("div"), n.className = "slider-handle max-slider-handle", r.appendChild(k), r.appendChild(j), r.appendChild(l), this.ticks = [], Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
          for (g = 0; g < this.options.ticks.length; g++) {
            var s = document.createElement("div");
            s.className = "slider-tick", this.ticks.push(s), r.appendChild(s);
          }
          j.className += " tick-slider-selection";
        }
        if (r.appendChild(m), r.appendChild(n), this.tickLabels = [], Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0)
          for (this.tickLabelContainer = document.createElement("div"), this.tickLabelContainer.className = "slider-tick-label-container", g = 0; g < this.options.ticks_labels.length; g++) {
            var t = document.createElement("div");
            t.className = "slider-tick-label", t.innerHTML = this.options.ticks_labels[g], this.tickLabels.push(t), this.tickLabelContainer.appendChild(t);
          }
        var u = function(a) {
          var b = document.createElement("div");
          b.className = "tooltip-arrow";
          var c = document.createElement("div");
          c.className = "tooltip-inner", a.appendChild(b), a.appendChild(c);
        },
            v = document.createElement("div");
        v.className = "tooltip tooltip-main", u(v);
        var w = document.createElement("div");
        w.className = "tooltip tooltip-min", u(w);
        var x = document.createElement("div");
        x.className = "tooltip tooltip-max", u(x), this.sliderElem.appendChild(r), this.sliderElem.appendChild(v), this.sliderElem.appendChild(w), this.sliderElem.appendChild(x), this.tickLabelContainer && this.sliderElem.appendChild(this.tickLabelContainer), q.insertBefore(this.sliderElem, this.element), this.element.style.display = "none";
      }
      if (a && (this.$element = a(this.element), this.$sliderElem = a(this.sliderElem)), this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), e[this.options.scale] && (this.options.scale = e[this.options.scale]), p === !0 && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "top", "width", "height"].forEach(function(a) {
        this._removeProperty(this.trackLow, a), this._removeProperty(this.trackSelection, a), this._removeProperty(this.trackHigh, a);
      }, this), [this.handle1, this.handle2].forEach(function(a) {
        this._removeProperty(a, "left"), this._removeProperty(a, "top");
      }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function(a) {
        this._removeProperty(a, "left"), this._removeProperty(a, "top"), this._removeProperty(a, "margin-left"), this._removeProperty(a, "margin-top"), this._removeClass(a, "right"), this._removeClass(a, "top");
      }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = o, this.options.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth"), this._setTooltipPosition(), Array.isArray(this.options.ticks) && this.options.ticks.length > 0 && (this.options.max = Math.max.apply(Math, this.options.ticks), this.options.min = Math.min.apply(Math, this.options.ticks)), Array.isArray(this.options.value) ? (this.options.range = !0, this._state.value = this.options.value) : this._state.value = this.options.range ? [this.options.value, this.options.max] : this.options.value, this.trackLow = k || this.trackLow, this.trackSelection = j || this.trackSelection, this.trackHigh = l || this.trackHigh, "none" === this.options.selection && (this._addClass(this.trackLow, "hide"), this._addClass(this.trackSelection, "hide"), this._addClass(this.trackHigh, "hide")), this.handle1 = m || this.handle1, this.handle2 = n || this.handle2, p === !0)
        for (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"), g = 0; g < this.ticks.length; g++)
          this._removeClass(this.ticks[g], "round triangle hide");
      var y = ["round", "triangle", "custom"],
          z = -1 !== y.indexOf(this.options.handle);
      if (z)
        for (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle), g = 0; g < this.ticks.length; g++)
          this._addClass(this.ticks[g], this.options.handle);
      this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos], this.setValue(this._state.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 1), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.mousedown = this._mousedown.bind(this), this.touchCapable && this.sliderElem.addEventListener("touchstart", this.mousedown, !1), this.sliderElem.addEventListener("mousedown", this.mousedown, !1), "hide" === this.options.tooltip ? (this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide")) : "always" === this.options.tooltip ? (this._showTooltip(), this._alwaysShowTooltip = !0) : (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1), this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)), this.options.enabled ? this.enable() : this.disable();
    }
    var d = {
      formatInvalidInputErrorMsg: function(a) {
        return "Invalid input value '" + a + "' passed in";
      },
      callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
    },
        e = {
          linear: {
            toValue: function(a) {
              var b = a / 100 * (this.options.max - this.options.min);
              if (this.options.ticks_positions.length > 0) {
                for (var c,
                    d,
                    e,
                    f = 0,
                    g = 0; g < this.options.ticks_positions.length; g++)
                  if (a <= this.options.ticks_positions[g]) {
                    c = g > 0 ? this.options.ticks[g - 1] : 0, e = g > 0 ? this.options.ticks_positions[g - 1] : 0, d = this.options.ticks[g], f = this.options.ticks_positions[g];
                    break;
                  }
                if (g > 0) {
                  var h = (a - e) / (f - e);
                  b = c + h * (d - c);
                }
              }
              var i = this.options.min + Math.round(b / this.options.step) * this.options.step;
              return i < this.options.min ? this.options.min : i > this.options.max ? this.options.max : i;
            },
            toPercentage: function(a) {
              if (this.options.max === this.options.min)
                return 0;
              if (this.options.ticks_positions.length > 0) {
                for (var b,
                    c,
                    d,
                    e = 0,
                    f = 0; f < this.options.ticks.length; f++)
                  if (a <= this.options.ticks[f]) {
                    b = f > 0 ? this.options.ticks[f - 1] : 0, d = f > 0 ? this.options.ticks_positions[f - 1] : 0, c = this.options.ticks[f], e = this.options.ticks_positions[f];
                    break;
                  }
                if (f > 0) {
                  var g = (a - b) / (c - b);
                  return d + g * (e - d);
                }
              }
              return 100 * (a - this.options.min) / (this.options.max - this.options.min);
            }
          },
          logarithmic: {
            toValue: function(a) {
              var b = 0 === this.options.min ? 0 : Math.log(this.options.min),
                  c = Math.log(this.options.max),
                  d = Math.exp(b + (c - b) * a / 100);
              return d = this.options.min + Math.round((d - this.options.min) / this.options.step) * this.options.step, d < this.options.min ? this.options.min : d > this.options.max ? this.options.max : d;
            },
            toPercentage: function(a) {
              if (this.options.max === this.options.min)
                return 0;
              var b = Math.log(this.options.max),
                  c = 0 === this.options.min ? 0 : Math.log(this.options.min),
                  d = 0 === a ? 0 : Math.log(a);
              return 100 * (d - c) / (b - c);
            }
          }
        };
    if (b = function(a, b) {
      return c.call(this, a, b), this;
    }, b.prototype = {
      _init: function() {},
      constructor: b,
      defaultOptions: {
        id: "",
        min: 0,
        max: 10,
        step: 1,
        precision: 0,
        orientation: "horizontal",
        value: 5,
        range: !1,
        selection: "before",
        tooltip: "show",
        tooltip_split: !1,
        handle: "round",
        reversed: !1,
        enabled: !0,
        formatter: function(a) {
          return Array.isArray(a) ? a[0] + " : " + a[1] : a;
        },
        natural_arrow_keys: !1,
        ticks: [],
        ticks_positions: [],
        ticks_labels: [],
        ticks_snap_bounds: 0,
        scale: "linear",
        focus: !1,
        tooltip_position: null
      },
      getElement: function() {
        return this.sliderElem;
      },
      getValue: function() {
        return this.options.range ? this._state.value : this._state.value[0];
      },
      setValue: function(a, b, c) {
        a || (a = 0);
        var d = this.getValue();
        this._state.value = this._validateInputValue(a);
        var e = this._applyPrecision.bind(this);
        this.options.range ? (this._state.value[0] = e(this._state.value[0]), this._state.value[1] = e(this._state.value[1]), this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0])), this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]))) : (this._state.value = e(this._state.value), this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))], this._addClass(this.handle2, "hide"), this._state.value[1] = "after" === this.options.selection ? this.options.max : this.options.min), this._state.percentage = this.options.max > this.options.min ? [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), 100 * this.options.step / (this.options.max - this.options.min)] : [0, 0, 100], this._layout();
        var f = this.options.range ? this._state.value : this._state.value[0];
        return b === !0 && this._trigger("slide", f), d !== f && c === !0 && this._trigger("change", {
          oldValue: d,
          newValue: f
        }), this._setDataVal(f), this;
      },
      destroy: function() {
        this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), a && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"));
      },
      disable: function() {
        return this._state.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this;
      },
      enable: function() {
        return this._state.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this;
      },
      toggle: function() {
        return this._state.enabled ? this.disable() : this.enable(), this;
      },
      isEnabled: function() {
        return this._state.enabled;
      },
      on: function(a, b) {
        return this._bindNonQueryEventHandler(a, b), this;
      },
      off: function(b, c) {
        a ? (this.$element.off(b, c), this.$sliderElem.off(b, c)) : this._unbindNonQueryEventHandler(b, c);
      },
      getAttribute: function(a) {
        return a ? this.options[a] : this.options;
      },
      setAttribute: function(a, b) {
        return this.options[a] = b, this;
      },
      refresh: function() {
        return this._removeSliderEventHandlers(), c.call(this, this.element, this.options), a && a.data(this.element, "slider", this), this;
      },
      relayout: function() {
        return this._layout(), this;
      },
      _removeSliderEventHandlers: function() {
        this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.handle2.removeEventListener("focus", this.handle2Keydown, !1), this.handle2.removeEventListener("blur", this.handle2Keydown, !1), this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.mousedown, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1);
      },
      _bindNonQueryEventHandler: function(a, b) {
        void 0 === this.eventToCallbackMap[a] && (this.eventToCallbackMap[a] = []), this.eventToCallbackMap[a].push(b);
      },
      _unbindNonQueryEventHandler: function(a, b) {
        var c = this.eventToCallbackMap[a];
        if (void 0 !== c)
          for (var d = 0; d < c.length; d++)
            if (c[d] === b) {
              c.splice(d, 1);
              break;
            }
      },
      _cleanUpEventCallbacksMap: function() {
        for (var a = Object.keys(this.eventToCallbackMap),
            b = 0; b < a.length; b++) {
          var c = a[b];
          this.eventToCallbackMap[c] = null;
        }
      },
      _showTooltip: function() {
        this.options.tooltip_split === !1 ? (this._addClass(this.tooltip, "in"), this.tooltip_min.style.display = "none", this.tooltip_max.style.display = "none") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in"), this.tooltip.style.display = "none"), this._state.over = !0;
      },
      _hideTooltip: function() {
        this._state.inDrag === !1 && this.alwaysShowTooltip !== !0 && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this._state.over = !1;
      },
      _layout: function() {
        var a;
        if (a = this.options.reversed ? [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]] : [this._state.percentage[0], this._state.percentage[1]], this.handle1.style[this.stylePos] = a[0] + "%", this.handle2.style[this.stylePos] = a[1] + "%", Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
          var b = Math.max.apply(Math, this.options.ticks),
              c = Math.min.apply(Math, this.options.ticks),
              d = "vertical" === this.options.orientation ? "height" : "width",
              e = "vertical" === this.options.orientation ? "marginTop" : "marginLeft",
              f = this._state.size / (this.options.ticks.length - 1);
          if (this.tickLabelContainer) {
            var g = 0;
            if (0 === this.options.ticks_positions.length)
              this.tickLabelContainer.style[e] = -f / 2 + "px", g = this.tickLabelContainer.offsetHeight;
            else
              for (h = 0; h < this.tickLabelContainer.childNodes.length; h++)
                this.tickLabelContainer.childNodes[h].offsetHeight > g && (g = this.tickLabelContainer.childNodes[h].offsetHeight);
            "horizontal" === this.options.orientation && (this.sliderElem.style.marginBottom = g + "px");
          }
          for (var h = 0; h < this.options.ticks.length; h++) {
            var i = this.options.ticks_positions[h] || 100 * (this.options.ticks[h] - c) / (b - c);
            this.ticks[h].style[this.stylePos] = i + "%", this._removeClass(this.ticks[h], "in-selection"), this.options.range ? i >= a[0] && i <= a[1] && this._addClass(this.ticks[h], "in-selection") : "after" === this.options.selection && i >= a[0] ? this._addClass(this.ticks[h], "in-selection") : "before" === this.options.selection && i <= a[0] && this._addClass(this.ticks[h], "in-selection"), this.tickLabels[h] && (this.tickLabels[h].style[d] = f + "px", void 0 !== this.options.ticks_positions[h] && (this.tickLabels[h].style.position = "absolute", this.tickLabels[h].style[this.stylePos] = this.options.ticks_positions[h] + "%", this.tickLabels[h].style[e] = -f / 2 + "px"));
          }
        }
        var j;
        if (this.options.range) {
          j = this.options.formatter(this._state.value), this._setText(this.tooltipInner, j), this.tooltip.style[this.stylePos] = (a[1] + a[0]) / 2 + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px"), "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
          var k = this.options.formatter(this._state.value[0]);
          this._setText(this.tooltipInner_min, k);
          var l = this.options.formatter(this._state.value[1]);
          this._setText(this.tooltipInner_max, l), this.tooltip_min.style[this.stylePos] = a[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_min, "margin-top", -this.tooltip_min.offsetHeight / 2 + "px") : this._css(this.tooltip_min, "margin-left", -this.tooltip_min.offsetWidth / 2 + "px"), this.tooltip_max.style[this.stylePos] = a[1] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_max, "margin-top", -this.tooltip_max.offsetHeight / 2 + "px") : this._css(this.tooltip_max, "margin-left", -this.tooltip_max.offsetWidth / 2 + "px");
        } else
          j = this.options.formatter(this._state.value[0]), this._setText(this.tooltipInner, j), this.tooltip.style[this.stylePos] = a[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
        if ("vertical" === this.options.orientation)
          this.trackLow.style.top = "0", this.trackLow.style.height = Math.min(a[0], a[1]) + "%", this.trackSelection.style.top = Math.min(a[0], a[1]) + "%", this.trackSelection.style.height = Math.abs(a[0] - a[1]) + "%", this.trackHigh.style.bottom = "0", this.trackHigh.style.height = 100 - Math.min(a[0], a[1]) - Math.abs(a[0] - a[1]) + "%";
        else {
          this.trackLow.style.left = "0", this.trackLow.style.width = Math.min(a[0], a[1]) + "%", this.trackSelection.style.left = Math.min(a[0], a[1]) + "%", this.trackSelection.style.width = Math.abs(a[0] - a[1]) + "%", this.trackHigh.style.right = "0", this.trackHigh.style.width = 100 - Math.min(a[0], a[1]) - Math.abs(a[0] - a[1]) + "%";
          var m = this.tooltip_min.getBoundingClientRect(),
              n = this.tooltip_max.getBoundingClientRect();
          m.right > n.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = this.tooltip_min.style.top);
        }
      },
      _removeProperty: function(a, b) {
        a.style.removeProperty ? a.style.removeProperty(b) : a.style.removeAttribute(b);
      },
      _mousedown: function(a) {
        if (!this._state.enabled)
          return !1;
        this._state.offset = this._offset(this.sliderElem), this._state.size = this.sliderElem[this.sizePos];
        var b = this._getPercentage(a);
        if (this.options.range) {
          var c = Math.abs(this._state.percentage[0] - b),
              d = Math.abs(this._state.percentage[1] - b);
          this._state.dragged = d > c ? 0 : 1;
        } else
          this._state.dragged = 0;
        this._state.percentage[this._state.dragged] = b, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !0;
        var e = this._calculateValue();
        return this._trigger("slideStart", e), this._setDataVal(e), this.setValue(e, !1, !0), this._pauseEvent(a), this.options.focus && this._triggerFocusOnHandle(this._state.dragged), !0;
      },
      _triggerFocusOnHandle: function(a) {
        0 === a && this.handle1.focus(), 1 === a && this.handle2.focus();
      },
      _keydown: function(a, b) {
        if (!this._state.enabled)
          return !1;
        var c;
        switch (b.keyCode) {
          case 37:
          case 40:
            c = -1;
            break;
          case 39:
          case 38:
            c = 1;
        }
        if (c) {
          if (this.options.natural_arrow_keys) {
            var d = "vertical" === this.options.orientation && !this.options.reversed,
                e = "horizontal" === this.options.orientation && this.options.reversed;
            (d || e) && (c = -c);
          }
          var f = this._state.value[a] + c * this.options.step;
          return this.options.range && (f = [a ? this._state.value[0] : f, a ? f : this._state.value[1]]), this._trigger("slideStart", f), this._setDataVal(f), this.setValue(f, !0, !0), this._setDataVal(f), this._trigger("slideStop", f), this._layout(), this._pauseEvent(b), !1;
        }
      },
      _pauseEvent: function(a) {
        a.stopPropagation && a.stopPropagation(), a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.returnValue = !1;
      },
      _mousemove: function(a) {
        if (!this._state.enabled)
          return !1;
        var b = this._getPercentage(a);
        this._adjustPercentageForRangeSliders(b), this._state.percentage[this._state.dragged] = b, this._layout();
        var c = this._calculateValue(!0);
        return this.setValue(c, !0, !0), !1;
      },
      _adjustPercentageForRangeSliders: function(a) {
        if (this.options.range) {
          var b = this._getNumDigitsAfterDecimalPlace(a);
          b = b ? b - 1 : 0;
          var c = this._applyToFixedAndParseFloat(a, b);
          0 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[1], b) < c ? (this._state.percentage[0] = this._state.percentage[1], this._state.dragged = 1) : 1 === this._state.dragged && this._applyToFixedAndParseFloat(this._state.percentage[0], b) > c && (this._state.percentage[1] = this._state.percentage[0], this._state.dragged = 0);
        }
      },
      _mouseup: function() {
        if (!this._state.enabled)
          return !1;
        this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this._state.inDrag = !1, this._state.over === !1 && this._hideTooltip();
        var a = this._calculateValue(!0);
        return this._layout(), this._setDataVal(a), this._trigger("slideStop", a), !1;
      },
      _calculateValue: function(a) {
        var b;
        if (this.options.range ? (b = [this.options.min, this.options.max], 0 !== this._state.percentage[0] && (b[0] = this._toValue(this._state.percentage[0]), b[0] = this._applyPrecision(b[0])), 100 !== this._state.percentage[1] && (b[1] = this._toValue(this._state.percentage[1]), b[1] = this._applyPrecision(b[1]))) : (b = this._toValue(this._state.percentage[0]), b = parseFloat(b), b = this._applyPrecision(b)), a) {
          for (var c = [b, 1 / 0],
              d = 0; d < this.options.ticks.length; d++) {
            var e = Math.abs(this.options.ticks[d] - b);
            e <= c[1] && (c = [this.options.ticks[d], e]);
          }
          if (c[1] <= this.options.ticks_snap_bounds)
            return c[0];
        }
        return b;
      },
      _applyPrecision: function(a) {
        var b = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
        return this._applyToFixedAndParseFloat(a, b);
      },
      _getNumDigitsAfterDecimalPlace: function(a) {
        var b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0;
      },
      _applyToFixedAndParseFloat: function(a, b) {
        var c = a.toFixed(b);
        return parseFloat(c);
      },
      _getPercentage: function(a) {
        !this.touchCapable || "touchstart" !== a.type && "touchmove" !== a.type || (a = a.touches[0]);
        var b = a[this.mousePos],
            c = this._state.offset[this.stylePos],
            d = b - c,
            e = d / this._state.size * 100;
        return e = Math.round(e / this._state.percentage[2]) * this._state.percentage[2], this.options.reversed && (e = 100 - e), Math.max(0, Math.min(100, e));
      },
      _validateInputValue: function(a) {
        if ("number" == typeof a)
          return a;
        if (Array.isArray(a))
          return this._validateArray(a), a;
        throw new Error(d.formatInvalidInputErrorMsg(a));
      },
      _validateArray: function(a) {
        for (var b = 0; b < a.length; b++) {
          var c = a[b];
          if ("number" != typeof c)
            throw new Error(d.formatInvalidInputErrorMsg(c));
        }
      },
      _setDataVal: function(a) {
        this.element.setAttribute("data-value", a), this.element.setAttribute("value", a), this.element.value = a;
      },
      _trigger: function(b, c) {
        c = c || 0 === c ? c : void 0;
        var d = this.eventToCallbackMap[b];
        if (d && d.length)
          for (var e = 0; e < d.length; e++) {
            var f = d[e];
            f(c);
          }
        a && this._triggerJQueryEvent(b, c);
      },
      _triggerJQueryEvent: function(a, b) {
        var c = {
          type: a,
          value: b
        };
        this.$element.trigger(c), this.$sliderElem.trigger(c);
      },
      _unbindJQueryEventHandlers: function() {
        this.$element.off(), this.$sliderElem.off();
      },
      _setText: function(a, b) {
        "undefined" != typeof a.innerText ? a.innerText = b : "undefined" != typeof a.textContent && (a.textContent = b);
      },
      _removeClass: function(a, b) {
        for (var c = b.split(" "),
            d = a.className,
            e = 0; e < c.length; e++) {
          var f = c[e],
              g = new RegExp("(?:\\s|^)" + f + "(?:\\s|$)");
          d = d.replace(g, " ");
        }
        a.className = d.trim();
      },
      _addClass: function(a, b) {
        for (var c = b.split(" "),
            d = a.className,
            e = 0; e < c.length; e++) {
          var f = c[e],
              g = new RegExp("(?:\\s|^)" + f + "(?:\\s|$)"),
              h = g.test(d);
          h || (d += " " + f);
        }
        a.className = d.trim();
      },
      _offsetLeft: function(a) {
        return a.getBoundingClientRect().left;
      },
      _offsetTop: function(a) {
        for (var b = a.offsetTop; (a = a.offsetParent) && !isNaN(a.offsetTop); )
          b += a.offsetTop;
        return b;
      },
      _offset: function(a) {
        return {
          left: this._offsetLeft(a),
          top: this._offsetTop(a)
        };
      },
      _css: function(b, c, d) {
        if (a)
          a.style(b, c, d);
        else {
          var e = c.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(a, b) {
            return b.toUpperCase();
          });
          b.style[e] = d;
        }
      },
      _toValue: function(a) {
        return this.options.scale.toValue.apply(this, [a]);
      },
      _toPercentage: function(a) {
        return this.options.scale.toPercentage.apply(this, [a]);
      },
      _setTooltipPosition: function() {
        var a = [this.tooltip, this.tooltip_min, this.tooltip_max];
        if ("vertical" === this.options.orientation) {
          var b = this.options.tooltip_position || "right",
              c = "left" === b ? "right" : "left";
          a.forEach(function(a) {
            this._addClass(a, b), a.style[c] = "100%";
          }.bind(this));
        } else
          a.forEach("bottom" === this.options.tooltip_position ? function(a) {
            this._addClass(a, "bottom"), a.style.top = "22px";
          }.bind(this) : function(a) {
            this._addClass(a, "top"), a.style.top = -this.tooltip.outerHeight - 14 + "px";
          }.bind(this));
      }
    }, a) {
      var f = a.fn.slider ? "bootstrapSlider" : "slider";
      a.bridget(f, b);
    }
  }(a), b;
});

})();
System.registerDynamic("libraries/angular-bootstrap-slider/slider", ["./bootstrap-slider.min"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Slider = $__require('./bootstrap-slider.min');
  angular.module('ui.bootstrap-slider', []).directive('slider', ['$parse', '$timeout', '$rootScope', function($parse, $timeout, $rootScope) {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div><input class="slider-input" type="text" style="width:100%" /></div>',
      require: 'ngModel',
      scope: {
        max: "=",
        min: "=",
        step: "=",
        value: "=",
        ngModel: '=',
        ngDisabled: '=',
        range: '=',
        sliderid: '=',
        ticks: '=',
        ticksLabels: '=',
        ticksSnapBounds: '=',
        ticksPositions: '=',
        scale: '=',
        formatter: '&',
        onStartSlide: '&',
        onStopSlide: '&',
        onSlide: '&'
      },
      link: function($scope, element, attrs, ngModelCtrl, $compile) {
        var ngModelDeregisterFn,
            ngDisabledDeregisterFn;
        initSlider();
        function initSlider() {
          var options = {};
          function setOption(key, value, defaultValue) {
            options[key] = value || defaultValue;
          }
          function setFloatOption(key, value, defaultValue) {
            options[key] = value || value === 0 ? parseFloat(value) : defaultValue;
          }
          function setBooleanOption(key, value, defaultValue) {
            options[key] = value ? value + '' === 'true' : defaultValue;
          }
          function getArrayOrValue(value) {
            return (angular.isString(value) && value.indexOf("[") === 0) ? angular.fromJson(value) : value;
          }
          setOption('id', $scope.sliderid);
          setOption('orientation', attrs.orientation, 'horizontal');
          setOption('selection', attrs.selection, 'before');
          setOption('handle', attrs.handle, 'round');
          setOption('tooltip', attrs.sliderTooltip || attrs.tooltip, 'show');
          setOption('tooltip_position', attrs.sliderTooltipPosition, 'top');
          setOption('tooltipseparator', attrs.tooltipseparator, ':');
          setOption('ticks', $scope.ticks);
          setOption('ticks_labels', $scope.ticksLabels);
          setOption('ticks_snap_bounds', $scope.ticksSnapBounds);
          setOption('ticks_positions', $scope.ticksPositions);
          setOption('scale', $scope.scale, 'linear');
          setFloatOption('min', $scope.min, 0);
          setFloatOption('max', $scope.max, 10);
          setFloatOption('step', $scope.step, 1);
          var strNbr = options.step + '';
          var decimals = strNbr.substring(strNbr.lastIndexOf('.') + 1);
          setFloatOption('precision', attrs.precision, decimals);
          setBooleanOption('tooltip_split', attrs.tooltipsplit, false);
          setBooleanOption('enabled', attrs.enabled, true);
          setBooleanOption('naturalarrowkeys', attrs.naturalarrowkeys, false);
          setBooleanOption('reversed', attrs.reversed, false);
          setBooleanOption('range', $scope.range, false);
          if (options.range) {
            if (angular.isArray($scope.value)) {
              options.value = $scope.value;
            } else if (angular.isString($scope.value)) {
              options.value = getArrayOrValue($scope.value);
              if (!angular.isArray(options.value)) {
                var value = parseFloat($scope.value);
                if (isNaN(value))
                  value = 5;
                if (value < $scope.min) {
                  value = $scope.min;
                  options.value = [value, options.max];
                } else if (value > $scope.max) {
                  value = $scope.max;
                  options.value = [options.min, value];
                } else {
                  options.value = [options.min, options.max];
                }
              }
            } else {
              options.value = [options.min, options.max];
            }
            $scope.ngModel = options.value;
          } else {
            setFloatOption('value', $scope.value, 5);
          }
          if ($scope.formatter)
            options.formatter = $scope.$eval($scope.formatter);
          if ('$' in window && $.fn.slider) {
            $.fn.slider.constructor.prototype.disable = function() {
              this.picker.off();
            };
            $.fn.slider.constructor.prototype.enable = function() {
              this.picker.on();
            };
          }
          if (element[0].__slider)
            element[0].__slider.destroy();
          var slider = new Slider(element[0].getElementsByClassName('slider-input')[0], options);
          element[0].__slider = slider;
          var updateEvent = getArrayOrValue(attrs.updateevent);
          if (angular.isString(updateEvent)) {
            updateEvent = [updateEvent];
          } else {
            updateEvent = ['slide'];
          }
          angular.forEach(updateEvent, function(sliderEvent) {
            slider.on(sliderEvent, function(ev) {
              ngModelCtrl.$setViewValue(ev);
              $timeout(function() {
                $scope.$apply();
              });
            });
          });
          slider.on('change', function(ev) {
            ngModelCtrl.$setViewValue(ev.newValue);
            $timeout(function() {
              $scope.$apply();
            });
          });
          var sliderEvents = {
            slideStart: 'onStartSlide',
            slide: 'onSlide',
            slideStop: 'onStopSlide'
          };
          angular.forEach(sliderEvents, function(sliderEventAttr, sliderEvent) {
            var fn = $parse(attrs[sliderEventAttr]);
            slider.on(sliderEvent, function(ev) {
              if ($scope[sliderEventAttr]) {
                var callback = function() {
                  fn($scope.$parent, {
                    $event: ev,
                    value: ev
                  });
                };
                if ($rootScope.$$phase) {
                  $scope.$evalAsync(callback);
                } else {
                  $scope.$apply(callback);
                }
              }
            });
          });
          if (angular.isFunction(ngDisabledDeregisterFn)) {
            ngDisabledDeregisterFn();
            ngDisabledDeregisterFn = null;
          }
          ngDisabledDeregisterFn = $scope.$watch('ngDisabled', function(value) {
            if (value) {
              slider.disable();
            } else {
              slider.enable();
            }
          });
          if (angular.isFunction(ngModelDeregisterFn))
            ngModelDeregisterFn();
          ngModelDeregisterFn = $scope.$watch('ngModel', function(value) {
            if ($scope.range) {
              slider.setValue(value);
            } else {
              slider.setValue(parseFloat(value));
            }
          }, true);
        }
        var watchers = ['min', 'max', 'step', 'range', 'scale'];
        angular.forEach(watchers, function(prop) {
          $scope.$watch(prop, function() {
            initSlider();
          });
        });
      }
    };
  }]);
  ;
  return module.exports;
});

System.registerDynamic("components/behaviors/alias/alias", ["angular"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.behaviors.alias';
  exports.directiveName = 'rlAlias';
  exports.controllerName = 'AliasController';
  var AliasController = (function() {
    function AliasController($scope, $attrs, $parse, $interpolate) {
      this.$scope = $scope;
      this.$attrs = $attrs;
      this.$parse = $parse;
      this.$interpolate = $interpolate;
      var initialValue = this.getValue();
      this.resolveAlias(initialValue);
      $scope.$watch(this.getValue.bind(this), this.resolveAlias.bind(this));
    }
    AliasController.prototype.getValue = function() {
      this.expression = this.$attrs.rlAlias.split(' as ');
      return this.$parse(this.expression[0])(this.$scope);
    };
    AliasController.prototype.resolveAlias = function(value) {
      var alias = this.$interpolate(this.expression[1])(this.$scope);
      if (alias != null) {
        this.$scope[alias] = value;
      }
    };
    AliasController.$inject = ['$scope', '$attrs', '$parse', '$interpolate'];
    return AliasController;
  }());
  exports.AliasController = AliasController;
  function alias() {
    return {
      restrict: 'A',
      controller: exports.controllerName
    };
  }
  exports.alias = alias;
  angular.module(exports.moduleName, []).directive(exports.directiveName, alias).controller(exports.controllerName, AliasController);
  return module.exports;
});

System.registerDynamic("components/behaviors/alternatingClass/alternatingClass", ["angular"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.behaviors.alternatingClass';
  exports.directiveName = 'rlAlternatingClass';
  exports.controllerName = 'AlternatingClassController';
  var AlternatingClassController = (function() {
    function AlternatingClassController($scope, $attrs) {
      this.$scope = $scope;
      this.$attrs = $attrs;
    }
    AlternatingClassController.prototype.$onInit = function() {
      var odd = this.checkForOdd(this.$scope);
      if (odd === false) {
        this.$attrs.$set('class', this.$attrs.class + ' ' + this.$attrs.rlAlternatingClass);
      }
    };
    AlternatingClassController.prototype.checkForOdd = function(scope) {
      if (scope.$odd == null && scope.$parent) {
        return this.checkForOdd(scope.$parent);
      } else {
        return scope.$odd;
      }
    };
    AlternatingClassController.$inject = ['$scope', '$attrs'];
    return AlternatingClassController;
  }());
  exports.AlternatingClassController = AlternatingClassController;
  function alternatingClass() {
    return {
      restrict: 'A',
      controller: exports.controllerName
    };
  }
  angular.module(exports.moduleName, []).directive(exports.directiveName, alternatingClass).controller(exports.controllerName, AlternatingClassController);
  return module.exports;
});

System.registerDynamic("components/behaviors/autosave/autosave", ["angular", "../../services/parentChild/parentChild.service", "../../services/autosave/autosave.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var parentChild_service_1 = $__require('../../services/parentChild/parentChild.service');
  var autosave_service_1 = $__require('../../services/autosave/autosave.service');
  exports.moduleName = 'rl.ui.behaviors.autosave';
  exports.directiveName = 'rlAutosave';
  exports.controllerName = 'AutosaveController';
  var AutosaveController = (function() {
    function AutosaveController($scope, $attrs, $parse, $element, autosaveFactory, parentChildBehavior) {
      this.$scope = $scope;
      this.$attrs = $attrs;
      this.$parse = $parse;
      this.$element = $element;
      this.autosaveFactory = autosaveFactory;
      this.parentChildBehavior = parentChildBehavior;
    }
    AutosaveController.prototype.$onInit = function() {
      var _this = this;
      this.keyupListener = function(callback) {
        _this.$element.on('keyup', function() {
          _this.$scope.$apply(callback);
        });
        return function() {
          _this.$element.off('keyup');
        };
      };
      var saveExpression = this.$parse(this.$attrs.save);
      var save = function() {
        return saveExpression(_this.$scope);
      };
      var debounce = this.$parse(this.$attrs.debounceDuration)(this.$scope);
      this.autosave = this.autosaveFactory.getInstance({
        save: save,
        contentForm: this.form,
        debounceDuration: debounce,
        triggers: this.$attrs.triggers,
        setChangeListener: this.keyupListener,
        saveWhenInvalid: this.$parse(this.$attrs.saveWhenInvalid)(this.$scope)
      });
      var behavior = {autosave: this.autosave.autosave};
      var childLink = this.$parse(this.$attrs.rlAutosave)(this.$scope);
      this.parentChildBehavior.registerChildBehavior(childLink, behavior);
    };
    AutosaveController.$inject = ['$scope', '$attrs', '$parse', '$element', autosave_service_1.factoryName, parentChild_service_1.serviceName];
    return AutosaveController;
  }());
  exports.AutosaveController = AutosaveController;
  function autosave() {
    'use strict';
    return {
      restrict: 'A',
      priority: 1000,
      require: {form: '?form'},
      controller: exports.controllerName,
      bindToController: true
    };
  }
  exports.autosave = autosave;
  angular.module(exports.moduleName, [autosave_service_1.moduleName, parentChild_service_1.moduleName]).directive(exports.directiveName, autosave).controller(exports.controllerName, AutosaveController);
  return module.exports;
});

System.registerDynamic("components/behaviors/popover/popover", ["angular", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  exports.moduleName = 'rl.ui.behaviors.popover';
  exports.directiveName = 'rlPopover';
  exports.controllerName = 'PopoverController';
  var PopoverController = (function() {
    function PopoverController($attrs, $element, $compile, $scope, $parse, $templateCache, guid) {
      this.$attrs = $attrs;
      this.$element = $element;
      this.$compile = $compile;
      this.$scope = $scope;
      this.$parse = $parse;
      this.$templateCache = $templateCache;
      this.guid = guid;
    }
    PopoverController.prototype.$onInit = function() {
      if (this.$parse(this.$attrs.textOnly)(this.$scope)) {
        this.$element.attr('uib-popover', this.$attrs.rlPopover);
      } else {
        var templatePath = this.guid.random() + '.html';
        var templateContent = '<div>' + this.$parse(this.$attrs.rlPopover)(this.$scope) + '</div>';
        if (templateContent != null) {
          this.$templateCache.put(templatePath, templateContent);
          this.$element.attr('uib-popover-template', '\'' + templatePath + '\'');
        }
      }
      this.$element.removeAttr('rl-popover');
      this.$compile(this.$element)(this.$scope);
    };
    PopoverController.$inject = ['$attrs', '$element', '$compile', '$scope', '$parse', '$templateCache', typescript_angular_utilities_1.downgrade.guidServiceName];
    return PopoverController;
  }());
  exports.PopoverController = PopoverController;
  function popover() {
    'use strict';
    return {
      restrict: 'A',
      priority: 300,
      controller: exports.controllerName
    };
  }
  exports.popover = popover;
  angular.module(exports.moduleName, []).directive(exports.directiveName, popover).controller(exports.controllerName, PopoverController);
  return module.exports;
});

System.registerDynamic("components/behaviors/behaviors.module", ["angular", "./alias/alias", "./alternatingClass/alternatingClass", "./autosave/autosave", "./popover/popover", "./required/required"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var alias = $__require('./alias/alias');
  exports.alias = alias;
  var alternatingClass = $__require('./alternatingClass/alternatingClass');
  var autosave = $__require('./autosave/autosave');
  exports.autosave = autosave;
  var popover = $__require('./popover/popover');
  exports.popover = popover;
  var required = $__require('./required/required');
  exports.required = required;
  exports.moduleName = 'rl.ui.behaviors';
  angular.module(exports.moduleName, [alias.moduleName, alternatingClass.moduleName, autosave.moduleName, popover.moduleName, required.moduleName]);
  return module.exports;
});

System.registerDynamic("components/components/busy/busy", ["angular", "../componentsDefaultTheme"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var componentsDefaultTheme_1 = $__require('../componentsDefaultTheme');
  exports.moduleName = 'rl.ui.components.busy';
  exports.componentName = 'rlBusy';
  var BusyController = (function() {
    function BusyController(useDefaultTheme) {
      this.useDefaultTheme = useDefaultTheme;
    }
    BusyController.$inject = [componentsDefaultTheme_1.defaultThemeValueName];
    return BusyController;
  }());
  var busy = {
    template: "<i class=\"busy rl-{{::busy.size}}\" ng-class=\"{ 'default-theme': busy.useDefaultTheme }\" ng-show=\"busy.loading\"></i>",
    controller: BusyController,
    controllerAs: 'busy',
    bindings: {
      loading: '<',
      size: '@'
    }
  };
  angular.module(exports.moduleName, []).component(exports.componentName, busy);
  return module.exports;
});

System.registerDynamic("components/components/buttonLink/buttonLink.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<a class=\"btn {{::button.types}} {{::button.configuredSize}}\" ng-href=\"{{button.link}}\" ng-disabled=\"button.ngDisabled\" target=\"{{::button.target}}\">\r\n\t<span ng-transclude></span>\r\n</a>";
  return module.exports;
});

System.registerDynamic("components/components/buttonLink/buttonLink", ["angular", "../button/button", "./buttonLink.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var button_1 = $__require('../button/button');
  exports.moduleName = 'rl.ui.components.buttonLink';
  exports.componentName = 'rlButtonLink';
  exports.controllerName = 'ButtonLinkController';
  var ButtonLinkController = (function(_super) {
    __extends(ButtonLinkController, _super);
    function ButtonLinkController() {
      _super.call(this);
      this.target = this.newTab ? '_blank' : '_self';
    }
    return ButtonLinkController;
  }(button_1.ButtonController));
  exports.ButtonLinkController = ButtonLinkController;
  var buttonLink = button_1.buildButton({
    template: $__require('./buttonLink.html'),
    bindings: {
      link: '@',
      newTab: '<?',
      action: null
    },
    controller: exports.controllerName
  });
  angular.module(exports.moduleName, []).component(exports.componentName, buttonLink).controller(exports.controllerName, ButtonLinkController);
  return module.exports;
});

System.registerDynamic("components/components/buttonSubmit/buttonSubmit.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<button type=\"submit\" class=\"btn {{::button.types}} {{::button.configuredSize}}\" ng-disabled=\"button.saving || button.ngDisabled\">\r\n\t<rl-busy ng-if=\"::button.rightAligned\" loading=\"button.saving\"></rl-busy>\r\n\t<span ng-transclude></span>\r\n\t<rl-busy ng-if=\"::!button.rightAligned\" loading=\"button.saving\"></rl-busy>\r\n</button>";
  return module.exports;
});

System.registerDynamic("components/components/buttonSubmit/buttonSubmit", ["angular", "../button/button", "./buttonSubmit.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var button_1 = $__require('../button/button');
  exports.moduleName = 'rl.ui.components.buttonSubmit';
  exports.componentName = 'rlButtonSubmit';
  var buttonSubmit = button_1.buildButton({
    template: $__require('./buttonSubmit.html'),
    bindings: {
      rightAligned: '<?',
      saving: '<?',
      action: null
    }
  });
  angular.module(exports.moduleName, []).component(exports.componentName, buttonSubmit);
  return module.exports;
});

System.registerDynamic("components/components/buttonToggle/buttonToggle.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<button type=\"button\" class=\"btn {{::buttonToggle.types}} {{::buttonToggle.configuredSize}}\"\r\n\t\tng-class=\"{ active : buttonToggle.checked }\" ng-click=\"buttonToggle.clicked()\" ng-disabled=\"buttonToggle.ngDisabled\">\r\n\t<i ng-show=\"buttonToggle.checked\" class=\"fa fa-check completed\"></i> <span ng-transclude></span>\r\n</button>";
  return module.exports;
});

System.registerDynamic("components/components/buttonToggle/buttonToggle", ["angular", "../button/button", "./buttonToggle.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var button_1 = $__require('../button/button');
  exports.moduleName = 'rl.ui.components.buttonToggle';
  exports.componentName = 'rlButtonToggle';
  exports.controllerName = 'ButtonToggleController';
  var ButtonToggleController = (function(_super) {
    __extends(ButtonToggleController, _super);
    function ButtonToggleController() {
      _super.call(this);
    }
    Object.defineProperty(ButtonToggleController.prototype, "checked", {
      get: function() {
        return this.ngModel.$viewValue;
      },
      set: function(value) {
        this.ngModel.$setViewValue(value);
      },
      enumerable: true,
      configurable: true
    });
    ButtonToggleController.prototype.clicked = function() {
      if (!this.ngDisabled) {
        this.checked = !this.checked;
        this.onToggle({value: this.checked});
      }
    };
    return ButtonToggleController;
  }(button_1.ButtonController));
  exports.ButtonToggleController = ButtonToggleController;
  var buttonToggle = button_1.buildButton({
    require: {ngModel: '^ngModel'},
    template: $__require('./buttonToggle.html'),
    controller: exports.controllerName,
    controllerAs: 'buttonToggle',
    bindings: {
      onToggle: '&',
      action: null
    }
  });
  angular.module(exports.moduleName, []).component(exports.componentName, buttonToggle).controller(exports.controllerName, ButtonToggleController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/card/headerColumn/headerColumn", ["typescript-angular-utilities", "../card"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  var card_1 = $__require('../card');
  exports.directiveName = 'rlCardHeaderColumn';
  exports.controllerName = 'CardHeaderColumnController';
  var HeaderColumnController = (function() {
    function HeaderColumnController() {
      var _this = this;
      this.update = function() {
        _this.value = __transform.getValue(_this.item, _this.column.getValue);
      };
    }
    HeaderColumnController.prototype.$onInit = function() {
      this.update();
      this.cardController.refresh.subscribe(this.update);
    };
    return HeaderColumnController;
  }());
  exports.HeaderColumnController = HeaderColumnController;
  headerColumn.$inject = ['$compile'];
  function headerColumn($compile) {
    'use strict';
    return {
      restrict: 'E',
      require: {cardController: '^' + card_1.componentName},
      template: "\n\t\t\t<div rl-size-for-breakpoints=\"header.column.size\" styling=\"::header.column.styling\" title=\"{{::header.column.description}}\">\n\t\t\t\t<div class=\"template-container\"></div>\n\t\t\t</div>\n\t\t",
      controller: exports.controllerName,
      controllerAs: 'header',
      scope: {},
      bindToController: {
        column: '<',
        item: '<',
        alias: '<'
      },
      compile: function() {
        return {
          pre: function(scope) {
            var header = scope.header;
            if (header.alias != null) {
              scope[header.alias] = header.item;
            }
            var column = header.column;
            if (column.templateUrl != null) {
              header.renderedTemplate = $compile('<div ng-include="\'' + column.templateUrl + '\'"></div>')(scope);
            } else if (column.template != null) {
              header.renderedTemplate = $compile(column.template)(scope);
            } else {
              header.renderedTemplate = $compile('<span>{{header.value}}</span>')(scope);
            }
          },
          post: function(scope, element) {
            var container = element.find('.template-container');
            container.append(scope.header.renderedTemplate);
          }
        };
      }
    };
  }
  exports.headerColumn = headerColumn;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/card/headerColumn/sizeForBreakpoints", ["typescript-angular-utilities", "../../../../services/breakpoints/breakpoint"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var breakpoint_1 = $__require('../../../../services/breakpoints/breakpoint');
  exports.sizeForBreakpointsName = 'rlSizeForBreakpoints';
  sizeForBreakpoints.$inject = ['$parse', typescript_angular_utilities_1.downgrade.stringServiceName];
  function sizeForBreakpoints($parse, stringUtility) {
    'use strict';
    return {
      restrict: 'A',
      link: linkDirective
    };
    function linkDirective(scope, element, attributes) {
      var sizes = $parse(attributes.rlSizeForBreakpoints)(scope);
      var styling = $parse(attributes.styling)(scope);
      var classes = [];
      classes.push(getColumnClass(sizes, breakpoint_1.xs));
      classes.push(getColumnClass(sizes, breakpoint_1.sm));
      classes.push(getColumnClass(sizes, breakpoint_1.md));
      classes.push(getColumnClass(sizes, breakpoint_1.lg));
      element.addClass(classes.join(' '));
      if (styling != null) {
        element.addClass(styling);
      }
    }
    function getColumnClass(columnSizes, attribute) {
      var value = columnSizes[attribute];
      if (value > 0 && value !== 'hidden') {
        return stringUtility.substitute('col-{0}-{1}', attribute, value);
      } else {
        return 'hidden-' + attribute;
      }
    }
  }
  exports.sizeForBreakpoints = sizeForBreakpoints;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/card/headerColumn/headerColumn.module", ["angular", "typescript-angular-utilities", "./headerColumn", "./sizeForBreakpoints"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var headerColumn_1 = $__require('./headerColumn');
  var sizeForBreakpoints_1 = $__require('./sizeForBreakpoints');
  exports.moduleName = 'rl.ui.components.cardContainer.card.headerColumn';
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).directive(sizeForBreakpoints_1.sizeForBreakpointsName, sizeForBreakpoints_1.sizeForBreakpoints).directive(headerColumn_1.directiveName, headerColumn_1.headerColumn).controller(headerColumn_1.controllerName, headerColumn_1.HeaderColumnController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/card/card.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<rl-generic-container selector=\"__card.selectable\">\r\n\t<template when-selector=\"false\" default>\r\n\t\t<div class=\"card\" ng-class=\"{ 'selected': __card.item.viewData.selected }\">\r\n\t\t\t<div class=\"header\" ng-click=\"__card.toggleContent()\" ng-class=\"{ 'active': __card.hasBody || !__card.permanentFooter }\">\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div ng-repeat=\"column in __card.columns\">\r\n\t\t\t\t\t\t<rl-card-header-column column=\"column\" item=\"__card.item\" alias=\"__card.cardAs\"></rl-card-header-column>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div ng-show=\"__card.showContent\">\r\n\t\t\t\t<ng-form rl-autosave=\"__card.autosaveLink\" save=\"__card.saveCard()\" save-when-invalid=\"__card.saveWhenInvalid\">\r\n\t\t\t\t\t<div class=\"body\" ng-class=\"{ 'active': __card.clickable }\" ng-click=\"__card.clickCard()\">\r\n\t\t\t\t\t\t<div class=\"content-template\"></div>\r\n\t\t\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</ng-form>\r\n\t\t\t</div>\r\n\t\t\t<div ng-show=\"__card.hasFooter && (__card.showContent || __card.permanentFooter)\">\r\n\t\t\t\t<div class=\"footer\">\r\n\t\t\t\t\t<div class=\"footer-template\"></div>\r\n\t\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</template>\r\n\t<template when-selector=\"true\">\r\n\t\t<div class=\"select-group\">\r\n\t\t\t<div class=\"select-column\">\r\n\t\t\t\t<input type=\"checkbox\" class=\"stand-alone-checkbox\" ng-model=\"__card.item.viewData.selected\" ng-change=\"__card.selectionChanged()\"\r\n\t\t\t\t\t   ng-disabled=\"__card.item.viewData.disabledSelection\" title=\"{{__card.item.viewData.selectionTitle}}\" />\r\n\t\t\t</div>\r\n\t\t\t<div class=\"select-content\">\r\n\r\n\t\t\t\t<div class=\"card selectable\" ng-class=\"{ 'selected': __card.item.viewData.selected }\">\r\n\t\t\t\t\t<div class=\"header active\" ng-click=\"__card.toggleContent()\">\r\n\t\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t\t<div ng-repeat=\"column in __card.columns\">\r\n\t\t\t\t\t\t\t\t<rl-card-header-column column=\"column\" item=\"__card.item\"></rl-card-header-column>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div ng-show=\"__card.showContent\">\r\n\t\t\t\t\t\t<ng-form rl-autosave=\"__card.autosaveLink\" save=\"__card.saveCard()\" save-when-invalid=\"__card.saveWhenInvalid\">\r\n\t\t\t\t\t\t\t<div class=\"body\" ng-class=\"{ 'active': __card.clickable }\" ng-click=\"__card.clickCard()\">\r\n\t\t\t\t\t\t\t\t<div class=\"content-template\"></div>\r\n\t\t\t\t\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</ng-form>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div ng-show=\"__card.hasFooter && (__card.showContent || __card.permanentFooter)\">\r\n\t\t\t\t\t\t<div class=\"footer\">\r\n\t\t\t\t\t\t\t<div class=\"footer-template\"></div>\r\n\t\t\t\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</template>\r\n</rl-generic-container>";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/card/card", ["angular", "lodash", "rxjs", "typescript-angular-utilities", "../../../services/parentChild/parentChild.service", "./headerColumn/headerColumn.module", "./card.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var Rx = $__require('rxjs');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var parentChild_service_1 = $__require('../../../services/parentChild/parentChild.service');
  var headerColumn_module_1 = $__require('./headerColumn/headerColumn.module');
  exports.moduleName = 'rl.ui.components.cardContainer.card';
  exports.componentName = 'rlCard';
  exports.controllerName = 'CardController';
  var CardController = (function() {
    function CardController($scope, $controller, $q, $element, parentChild, object) {
      var _this = this;
      this.$scope = $scope;
      this.$q = $q;
      this.$element = $element;
      this.parentChild = parentChild;
      this.showContent = false;
      this.dirty = false;
      this.autosaveLink = {};
      this.autosave = function() {
        if (_this.showContent === false) {
          return true;
        }
        return _this.parentChild.triggerChildBehavior(_this.autosaveLink, function(behavior) {
          if (behavior.autosave()) {
            _this.showContent = false;
            return true;
          } else {
            return false;
          }
        });
      };
      if (this.cardAs) {
        $scope[this.cardAs] = this.item;
      }
      $scope.collapse = this.autosave;
      $scope.setSelected = this.setSelected.bind(this);
      this.refresh = new Rx.Subject();
      $scope.refresh = function() {
        _this.source.refresh();
        _this.refresh.next(null);
      };
      $scope.remove = function() {
        _this.source.remove(_this.item);
      };
      $scope.containerData = this.containerData;
      if (object.isNullOrWhitespace(this.cardController) === false) {
        var controller = $controller(this.cardController, {$scope: $scope});
        if (object.isNullOrWhitespace(this.cardControllerAs) === false) {
          $scope[this.cardControllerAs] = controller;
        }
      }
      parentChild.registerChildBehavior(this.item, {close: this.autosave});
    }
    CardController.prototype.toggleContent = function() {
      if (!this.showContent) {
        this.open();
      } else {
        this.autosave();
      }
    };
    CardController.prototype.validateCard = function() {
      var behavior = this.parentChild.getChildBehavior(this.item);
      if (_.isFunction(behavior.validateCard)) {
        return behavior.validateCard();
      } else {
        return true;
      }
    };
    CardController.prototype.saveCard = function() {
      var behavior = this.parentChild.getChildBehavior(this.item);
      if (_.isFunction(behavior.saveCard)) {
        return behavior.saveCard();
      } else {
        return this.$q.when();
      }
    };
    CardController.prototype.clickCard = function() {
      this.parentChild.triggerChildBehavior(this.item, function(behavior) {
        if (_.isFunction(behavior.clickCard)) {
          return behavior.clickCard();
        }
      });
    };
    CardController.prototype.$postLink = function() {
      var _this = this;
      this.cardContainer.makeCard(this.$scope, function(content) {
        var contentArea = _this.$element.find('.content-template');
        contentArea.append(content);
        _this.hasBody = content.length > 0;
      }, null, 'contentSlot');
      this.cardContainer.makeCard(this.$scope, function(footer) {
        _this.hasFooter = (footer.length > 0);
        if (_this.hasFooter) {
          var footerArea = _this.$element.find('.footer-template');
          footerArea.append(footer);
        }
      }, null, 'footerSlot');
    };
    CardController.prototype.open = function() {
      this.parentChild.triggerChildBehavior(this.item, function(behavior) {
        if (_.isFunction(behavior.initCard)) {
          behavior.initCard();
        }
      });
      if (this.cardContainer.openCard()) {
        this.showContent = true;
      }
    };
    CardController.prototype.setSelected = function(value) {
      if (_.isUndefined(this.item.viewData)) {
        this.item.viewData = {};
      }
      this.item.viewData.selected = value;
      this.selectionChanged();
    };
    CardController.$inject = ['$scope', '$controller', '$q', '$element', parentChild_service_1.serviceName, typescript_angular_utilities_1.downgrade.objectServiceName];
    return CardController;
  }());
  exports.CardController = CardController;
  var card = {
    template: $__require('./card.html'),
    require: {cardContainer: '^^rlCardContainer'},
    controller: exports.controllerName,
    controllerAs: '__card',
    bindings: {
      columns: '<?',
      item: '=',
      clickable: '<?',
      source: '=',
      containerData: '<?',
      cardController: '<?',
      cardControllerAs: '<?',
      cardAs: '<?',
      permanentFooter: '<?',
      selectable: '<?',
      selectionChanged: '&',
      saveWhenInvalid: '<?'
    }
  };
  angular.module(exports.moduleName, [parentChild_service_1.moduleName, typescript_angular_utilities_1.downgrade.moduleName, headerColumn_module_1.moduleName]).component(exports.componentName, card).controller(exports.controllerName, CardController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/cardSearch/cardSearch.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"input-group\" ng-show=\"cardSearch.hasSearchFilter\" ng-class=\"{ 'has-error': cardSearch.searchLengthError }\">\r\n\t<input class=\"form-control\" type=\"text\" placeholder=\"{{cardSearch.searchPlaceholder}}\" ng-model=\"cardSearch.searchText\"\r\n\t\t   rl-popover=\"cardSearch.minSearchError\" popover-trigger=\"mouseenter\" popover-enable=\"cardSearch.searchLengthError\" />\r\n\t<div class=\"input-group-btn\">\r\n\t\t<button type=\"button\" class=\"btn btn-default\" ng-disabled=\"cardSearch.searchText | isEmpty\" ng-click=\"cardSearch.searchText = null\">\r\n\t\t\t<i class=\"fa fa-times\"></i>\r\n\t\t</button>\r\n\t</div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/cardSearch/cardSearch", ["angular", "./cardSearch.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.components.cardContainer.cardSearch';
  exports.componentName = 'rlCardSearch';
  exports.controllerName = 'CardSearchController';
  exports.defaultSearchPlaceholder = 'Search';
  exports.defaultSearchDelay = 1000;
  var CardSearchController = (function() {
    function CardSearchController($timeout) {
      this.$timeout = $timeout;
      this.searchLengthError = false;
      this.hasSearchFilter = true;
    }
    Object.defineProperty(CardSearchController.prototype, "searchText", {
      get: function() {
        return this.searchFilter ? this.searchFilter.searchText : null;
      },
      set: function(search) {
        this.searchFilter.searchText = search;
        this.minSearchLength = this.searchFilter.minSearchLength;
        this.validateSearchLength(search, this.minSearchLength);
        if (this.timer != null) {
          this.$timeout.cancel(this.timer);
        }
        this.timer = this.$timeout(this.cardContainer.dataSource.refresh.bind(this.cardContainer.dataSource), this.delay);
      },
      enumerable: true,
      configurable: true
    });
    CardSearchController.prototype.$onInit = function() {
      var _this = this;
      if (this.cardContainer == null) {
        return;
      }
      this.minSearchError = 'You must enter at least {{cardSearch.minSearchLength}} characters to perform a search';
      if (this.searchFilter == null) {
        var filter = this.cardContainer.searchFilter;
        this.searchFilter = filter;
        if (filter == null) {
          this.hasSearchFilter = false;
        }
      }
      if (this.hasSearchFilter) {
        this.searchPlaceholder = exports.defaultSearchPlaceholder;
        this.delay = this.delay != null ? this.delay : exports.defaultSearchDelay;
        this.searchFilter.subscribe(function() {
          _this.searchText = _this.searchFilter.searchText;
        });
      }
    };
    CardSearchController.prototype.validateSearchLength = function(search, minLength) {
      this.searchLengthError = search != null && search.length > 0 && search.length < minLength;
    };
    CardSearchController.$inject = ['$timeout'];
    return CardSearchController;
  }());
  exports.CardSearchController = CardSearchController;
  var cardSearch = {
    require: {cardContainer: '?^^rlCardContainer'},
    template: $__require('./cardSearch.html'),
    controller: exports.controllerName,
    controllerAs: 'cardSearch',
    bindings: {
      delay: '<?searchDelay',
      searchFilter: '<?'
    }
  };
  angular.module(exports.moduleName, []).component(exports.componentName, cardSearch).controller(exports.controllerName, CardSearchController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/columnHeader/columnHeader", ["angular", "../sorts/sortDirection"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var sortDirection_1 = $__require('../sorts/sortDirection');
  exports.moduleName = 'rl.ui.components.cardContainer.columnHeader';
  exports.directiveName = 'rlColumnHeader';
  cardColumnHeader.$inject = ['$compile'];
  function cardColumnHeader($compile) {
    'use strict';
    return {
      restrict: 'E',
      template: "\n\t\t\t<div rl-size-for-breakpoints=\"column.size\" ng-click=\"sort()\" title=\"{{::column.description}}\"\n\t\t\t\t\tclass=\"column-header\">\n\t\t\t\t<div class=\"template-container\"></div>\n\t\t\t\t<i ng-show=\"sorting === sortDirection.ascending\" class=\"fa fa-sort-asc\"></i>\n\t\t\t\t<i ng-show=\"sorting === sortDirection.descending\" class=\"fa fa-sort-desc\"></i>\n\t\t\t</div>\n\t\t",
      scope: {
        column: '=',
        sorting: '=',
        sort: '&'
      },
      compile: function() {
        return {
          pre: function(scope) {
            var column = scope.column;
            if (column.headerTemplateUrl != null) {
              scope.renderedTemplate = $compile('<div ng-include="\'' + column.headerTemplateUrl + '\'"></div>')(scope);
            } else if (column.headerTemplate != null) {
              scope.renderedTemplate = $compile(column.headerTemplate)(scope);
            } else {
              scope.renderedTemplate = ('<h5>' + column.label + '</h5');
            }
          },
          post: function(scope, element) {
            if (scope.column.displayColumnHeader != null && scope.column.displayColumnHeader === false) {
              element.remove();
              return;
            }
            var container = element.find('.template-container');
            container.append(scope.renderedTemplate);
            scope.sortDirection = sortDirection_1.SortDirection;
          }
        };
      }
    };
  }
  exports.cardColumnHeader = cardColumnHeader;
  angular.module(exports.moduleName, []).directive(exports.directiveName, cardColumnHeader);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/cardContainerFilters.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div ng-repeat=\"filter in controller.renderableFilters\">\r\n\t<rl-template-renderer template=\"filter.template\"></rl-template-renderer>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/cardContainerFilters", ["angular", "lodash", "./cardContainerFilters.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  exports.moduleName = 'rl.ui.components.cardContainer.filters.cardContainerFilters';
  exports.componentName = 'rlCardContainerFilters';
  exports.controllerName = 'CardContainerFiltersController';
  var CardContainerFiltersController = (function() {
    function CardContainerFiltersController($rootScope) {
      this.$rootScope = $rootScope;
    }
    CardContainerFiltersController.prototype.$onInit = function() {
      var _this = this;
      this.renderableFilters = _(this.filters).filter(function(filter) {
        return filter.template != null;
      }).map(function(filter) {
        var scope = _this.$rootScope.$new();
        scope.filter = filter;
        scope.dataSource = _this.source;
        filter.template = {
          template: filter.template,
          scope: scope
        };
        return filter;
      }).value();
    };
    CardContainerFiltersController.$inject = ['$rootScope'];
    return CardContainerFiltersController;
  }());
  exports.CardContainerFiltersController = CardContainerFiltersController;
  var cardContainerFilters = {
    template: $__require('./cardContainerFilters.html'),
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
      filters: '<',
      source: '<'
    }
  };
  angular.module(exports.moduleName, []).component(exports.componentName, cardContainerFilters).controller(exports.controllerName, CardContainerFiltersController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filters.module", ["angular", "./columnSearchFilter/columnSearchFilter.service", "./dateFilter/dateFilter.module", "./filterGroup/filterGroup.module", "./selectFilter/selectFilter.module", "./cardContainerFilters"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var columnSearchFilter = $__require('./columnSearchFilter/columnSearchFilter.service');
  exports.columnSearchFilter = columnSearchFilter;
  var dateFilter = $__require('./dateFilter/dateFilter.module');
  var filterGroup = $__require('./filterGroup/filterGroup.module');
  exports.filterGroup = filterGroup;
  var selectFilter = $__require('./selectFilter/selectFilter.module');
  exports.selectFilter = selectFilter;
  var cardContainerFilters = $__require('./cardContainerFilters');
  __export($__require('./cardContainerFilters'));
  exports.moduleName = 'rl.ui.components.cardContainer.filters';
  angular.module(exports.moduleName, [columnSearchFilter.moduleName, dateFilter.moduleName, filterGroup.moduleName, selectFilter.moduleName, cardContainerFilters.moduleName]);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/itemCount/itemCount.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<p ng-show=\"!itemCount.cardContainer.dataSource.loadingDataSet\">\r\n\tShowing <strong>{{itemCount.cardContainer.dataSource.dataSet.length}} of {{itemCount.cardContainer.dataSource.count}}</strong> total items\r\n</p>";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/itemCount/itemCount", ["angular", "./itemCount.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.components.cardContainer.itemCount';
  exports.componentName = 'rlItemCount';
  var itemCount = {
    require: {cardContainer: '?^^rlCardContainer'},
    template: $__require('./itemCount.html'),
    controllerAs: 'itemCount'
  };
  angular.module(exports.moduleName, []).component(exports.componentName, itemCount);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/pager/pager.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<nav ng-if=\"::pager.pager\">\r\n\t<ul class=\"pagination\">\r\n\t\t<li title=\"Go to first page\" ng-click=\"pager.first()\"\r\n\t\t\tng-class=\"{ 'disabled': !pager.canGoBack }\">\r\n\t\t\t<a><i class=\"fa fa-angle-double-left\"></i></a>\r\n\t\t</li>\r\n\t\t<li title=\"Go to previous page\" ng-click=\"pager.previous()\"\r\n\t\t\tng-class=\"{ 'disabled': !pager.canGoBack }\">\r\n\t\t\t<a><i class=\"fa fa-angle-left\"></i></a>\r\n\t\t</li>\r\n\t\t<li title=\"Go to page {{::page}}\" ng-click=\"pager.goto(page)\"\r\n\t\t\tng-repeat=\"page in pager.pages\"\r\n\t\t\tng-class=\"{ 'active': pager.currentPage == page }\">\r\n\t\t\t<a>{{::page}}</a>\r\n\t\t</li>\r\n\t\t<li title=\"Go to next page\" ng-click=\"pager.next()\"\r\n\t\t\tng-class=\"{ 'disabled': !pager.canGoForward }\">\r\n\t\t\t<a><i class=\"fa fa-angle-right\"></i></a>\r\n\t\t</li>\r\n\t\t<li title=\"Go to last page\" ng-click=\"pager.last()\"\r\n\t\t\tng-class=\"{ 'disabled': !pager.canGoForward }\">\r\n\t\t\t<a><i class=\"fa fa-angle-double-right\"></i></a>\r\n\t\t</li>\r\n\t</ul>\r\n</nav>\r\n";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/pager/pager", ["angular", "lodash", "./pager.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  exports.moduleName = 'rl.ui.components.cardContainer.pager';
  exports.componentName = 'rlPager';
  exports.controllerName = 'PagerController';
  exports.defaultVisiblePageCount = 5;
  var PagerController = (function() {
    function PagerController() {
      var _this = this;
      this.canGoBack = false;
      this.canGoForward = false;
      this.updatePageCount = function() {
        var totalItems = _this.dataSource.count;
        var newLastPage = Math.ceil(totalItems / _this.pager.pageSize);
        if (newLastPage !== _this.lastPage) {
          _this.lastPage = newLastPage;
          _this.currentPage = 1;
        }
        _this.updatePaging();
      };
    }
    Object.defineProperty(PagerController.prototype, "currentPage", {
      get: function() {
        return this.pager.pageNumber;
      },
      set: function(page) {
        this.pager.pageNumber = page;
        this.updatePaging();
      },
      enumerable: true,
      configurable: true
    });
    PagerController.prototype.$onInit = function() {
      if (this.cardContainer == null) {
        return;
      }
      this.pager = this.cardContainer.dataSource.pager;
      if (this.pager) {
        this.visiblePageCount = this.pageCount != null ? this.pageCount : exports.defaultVisiblePageCount;
        this.lastPage = 1;
        this.dataSource = this.cardContainer.dataSource;
        this.dataSource.countChanges.subscribe(this.updatePageCount);
        this.pager.pageSizeChanges.subscribe(this.updatePageCount);
        this.updatePageCount();
      }
    };
    PagerController.prototype.updatePaging = function() {
      var page = this.currentPage;
      this.canGoBack = page > 1;
      this.canGoForward = page < this.lastPage;
      var nonCurrentVisiblePages = this.visiblePageCount - 1;
      var before = Math.floor(nonCurrentVisiblePages / 2);
      var after = Math.ceil(nonCurrentVisiblePages / 2);
      var startPage = page - before;
      var endPage = page + after;
      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(this.visiblePageCount, this.lastPage);
      } else if (endPage > this.lastPage) {
        endPage = this.lastPage;
        startPage = Math.max(this.lastPage - nonCurrentVisiblePages, 1);
      }
      this.pages = _.range(startPage, endPage + 1);
    };
    PagerController.prototype.first = function() {
      this.currentPage = 1;
    };
    PagerController.prototype.previous = function() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    };
    PagerController.prototype.goto = function(page) {
      if (page >= 1 && page <= this.lastPage) {
        this.currentPage = page;
      }
    };
    PagerController.prototype.next = function() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
      }
    };
    PagerController.prototype.last = function() {
      this.currentPage = this.lastPage;
    };
    return PagerController;
  }());
  exports.PagerController = PagerController;
  var pager = {
    require: {cardContainer: '?^^rlCardContainer'},
    template: $__require('./pager.html'),
    controller: exports.controllerName,
    controllerAs: 'pager',
    bindings: {pageCount: '<?visiblePages'}
  };
  angular.module(exports.moduleName, []).component(exports.componentName, pager).controller(exports.controllerName, PagerController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/pageSize/pageSize.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div ng-if=\"::controller.pager\">\r\n\t<select class=\"form-control\" title=\"Cards per page\" ng-model=\"controller.selectedPageSize\"\r\n\t\t\tng-options=\"pageSize for pageSize in controller.pageSizes\"></select>\r\n</div>\r\n";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/pageSize/pageSize", ["angular", "./pageSize.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.components.cardContainer.pageSize';
  exports.componentName = 'rlPageSize';
  exports.controllerName = 'PageSizeController';
  exports.availablePageSizes = [10, 25, 50, 100];
  exports.defaultPageSize = 10;
  var PageSizeController = (function() {
    function PageSizeController() {}
    Object.defineProperty(PageSizeController.prototype, "selectedPageSize", {
      get: function() {
        if (this.pager != null) {
          return this.pager.pageSize;
        }
        return null;
      },
      set: function(value) {
        if (this.pager != null) {
          this.pager.pageSize = value;
        }
      },
      enumerable: true,
      configurable: true
    });
    PageSizeController.prototype.$onInit = function() {
      if (this.cardContainer == null) {
        return;
      }
      this.selectedPageSize = exports.defaultPageSize;
      this.pageSizes = exports.availablePageSizes;
      this.pager = this.cardContainer.dataSource.pager;
    };
    return PageSizeController;
  }());
  exports.PageSizeController = PageSizeController;
  var pageSize = {
    require: {cardContainer: '?^^rlCardContainer'},
    template: $__require('./pageSize.html'),
    controller: exports.controllerName,
    controllerAs: 'controller'
  };
  angular.module(exports.moduleName, []).component(exports.componentName, pageSize).controller(exports.controllerName, PageSizeController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/selectionControl/selectionControl.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div>\r\n\t<div style=\"margin-bottom: 5px\">\r\n\t\t<span><strong>{{selection.selectedItems}}</strong> items selected</span>\r\n\t</div>\r\n\t<div style=\"margin-bottom: 5px\" ng-if=\"selection.pagingEnabled\">\r\n\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"selection.selectPage()\">Select page</button>\r\n\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"selection.clearPage()\">Clear page</button>\r\n\t</div>\r\n\t<div>\r\n\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"selection.selectAll()\">Select all</button>\r\n\t\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"selection.clearAll()\">Clear all</button>\r\n\t</div>\r\n</div>\r\n";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/selectionControl/selectionControl", ["angular", "lodash", "typescript-angular-utilities", "./selectionControl.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  exports.moduleName = 'rl.ui.components.cardContainer.selectionControl';
  exports.componentName = 'rlSelectionControl';
  exports.controllerName = 'SelectionControlController';
  var SelectionControlController = (function() {
    function SelectionControlController(bool) {
      this.bool = bool;
    }
    SelectionControlController.prototype.$onInit = function() {
      var _this = this;
      if (this.cardContainer == null) {
        return;
      }
      this.selectedItems = this.cardContainer.numberSelected;
      this.pagingEnabled = this.bool.toBool(this.cardContainer.dataSource.pager);
      this.dataSource = this.cardContainer.dataSource;
      this.cardContainer.numberSelectedChanges.subscribe(function(value) {
        _this.selectedItems = value;
      });
    };
    SelectionControlController.prototype.selectPage = function() {
      _.each(this.dataSource.dataSet, function(item) {
        item.viewData.selected = true;
      });
      this.cardContainer.selectionChanged();
    };
    SelectionControlController.prototype.selectAll = function() {
      _.each(this.dataSource.filteredDataSet, function(item) {
        item.viewData.selected = true;
      });
      this.cardContainer.selectionChanged();
    };
    SelectionControlController.prototype.clearPage = function() {
      _.each(this.dataSource.dataSet, function(item) {
        item.viewData.selected = false;
      });
      this.cardContainer.selectionChanged();
    };
    SelectionControlController.prototype.clearAll = function() {
      _.each(this.dataSource.filteredDataSet, function(item) {
        item.viewData.selected = false;
      });
      this.cardContainer.selectionChanged();
    };
    SelectionControlController.$inject = [typescript_angular_utilities_1.downgrade.booleanServiceName];
    return SelectionControlController;
  }());
  exports.SelectionControlController = SelectionControlController;
  var selectionControl = {
    require: {cardContainer: '?^^rlCardContainer'},
    template: $__require('./selectionControl.html'),
    controller: exports.controllerName,
    controllerAs: 'selection'
  };
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).component(exports.componentName, selectionControl).controller(exports.controllerName, SelectionControlController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/cardContainer.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"row\">\r\n\t<div class=\"col-md-3 col-xs-12\" ng-if=\"cardContainer.renderFilters\">\r\n\t\t<rl-card-container-filters filters=\"cardContainer.filters\" source=\"cardContainer.dataSource\"></rl-card-container-filters>\r\n\t</div>\r\n\t<div class=\"col-xs-12\" ng-class=\"{ 'col-md-9': cardContainer.renderFilters }\">\r\n\t\t<div class=\"card-container\">\r\n\t\t\t<div>\r\n\t\t\t\t<div class=\"card-container-header\">\r\n\t\t\t\t\t<div ng-transclude=\"containerHeaderSlot\">\r\n\t\t\t\t\t\t<rl-default-card-container-header></rl-default-card-container-header>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<rl-generic-container selector=\"cardContainer.selectableCards\">\r\n\t\t\t\t\t<template when-selector=\"false\" default>\r\n\t\t\t\t\t\t<div class=\"card-columns-header\">\r\n\t\t\t\t\t\t\t<div ng-repeat=\"column in cardContainer.columns\">\r\n\t\t\t\t\t\t\t\t<rl-column-header sort=\"cardContainer.sort(column)\" sorting=\"column.sortDirection\" column=\"column\"></rl-column-header>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</template>\r\n\t\t\t\t\t<template when-selector=\"true\">\r\n\t\t\t\t\t\t<div class=\"card-columns-header\">\r\n\t\t\t\t\t\t\t<div class=\"select-group\">\r\n\t\t\t\t\t\t\t\t<div class=\"select-column\">\r\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-check\" style=\"margin-left: 6px; cursor: pointer\" ng-click=\"cardContainer.sortSelected()\"></i>\r\n\t\t\t\t\t\t\t\t\t<i ng-show=\"cardContainer.sortColumn.sortDirection === cardContainer.sortDirection.ascending\" class=\"fa fa-sort-asc\"></i>\r\n\t\t\t\t\t\t\t\t\t<i ng-show=\"cardContainer.sortColumn.sortDirection === cardContainer.sortDirection.descending\" class=\"fa fa-sort-desc\"></i>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"select-content\">\r\n\t\t\t\t\t\t\t\t\t<div ng-repeat=\"column in cardContainer.columns\">\r\n\t\t\t\t\t\t\t\t\t\t<rl-column-header sort=\"cardContainer.sort(column)\" sorting=\"column.sortDirection\" column=\"column\"></rl-column-header>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</template>\r\n\t\t\t\t</rl-generic-container>\r\n\r\n\t\t\t\t<div ng-if=\"cardContainer.dataSource.dataSet | isEmpty:false\">\r\n\t\t\t\t\t<div class=\"card-item-repeat\" ng-repeat=\"card in cardContainer.dataSource.dataSet\">\r\n\t\t\t\t\t\t<rl-card columns=\"cardContainer.columns\" item=\"card\"\r\n\t\t\t\t\t\t\t\tclickable=\"cardContainer.clickableCards\"\r\n\t\t\t\t\t\t\t\tselectable=\"cardContainer.selectableCards\"\r\n\t\t\t\t\t\t\t\tselection-changed=\"cardContainer.selectionChanged()\"\r\n\t\t\t\t\t\t\t\tcontainer-data=\"cardContainer.containerData\"\r\n\t\t\t\t\t\t\t\tsource=\"cardContainer.dataSource\"\r\n\t\t\t\t\t\t\t\tpermanent-footer=\"cardContainer.permanentFooters\"\r\n\t\t\t\t\t\t\t\tcard-controller=\"cardContainer.cardController\"\r\n\t\t\t\t\t\t\t\tcard-controller-as=\"cardContainer.cardControllerAs\"\r\n\t\t\t\t\t\t\t\tcard-as=\"cardContainer.cardAs\"\r\n\t\t\t\t\t\t\t\tsave-when-invalid=\"cardContainer.saveWhenInvalid\"></rl-card>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div ng-if=\"cardContainer.dataSource.needsRefinedSearch\">\r\n\t\t\t\t\tPlease refine your search results\r\n\t\t\t\t</div>\r\n\t\t\t\t<div ng-if=\"cardContainer.dataSource.isEmpty\">\r\n\t\t\t\t\tThere are no items to show\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<rl-busy loading=\"cardContainer.dataSource.loadingDataSet\" size=\"2x\"></rl-busy>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class=\"card-container-footer\">\r\n\t\t\t\t\t<div ng-transclude=\"containerFooterSlot\">\r\n\t\t\t\t\t\t<rl-default-card-container-footer></rl-default-card-container-footer>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/cardContainer", ["lodash", "rxjs", "typescript-angular-utilities", "../../services/parentChild/parentChild.service", "./dataSources/dataSources.module", "./sorts/sorts.module", "../../services/breakpoints/breakpoint", "./cardContainer.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var Rx = $__require('rxjs');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var parentChild_service_1 = $__require('../../services/parentChild/parentChild.service');
  var dataSources_module_1 = $__require('./dataSources/dataSources.module');
  var sorts_module_1 = $__require('./sorts/sorts.module');
  var breakpoint_1 = $__require('../../services/breakpoints/breakpoint');
  exports.componentName = 'rlCardContainer';
  exports.controllerName = 'CardContainerController';
  exports.defaultMaxColumnSorts = 2;
  exports.defaultSelectionTitle = 'Select card';
  var CardContainerController = (function() {
    function CardContainerController($scope, $attrs, $transclude, object, array, dataPagerFactory, parentChild) {
      var _this = this;
      this.$scope = $scope;
      this.object = object;
      this.array = array;
      this.dataPagerFactory = dataPagerFactory;
      this.parentChild = parentChild;
      this.numberSelected = 0;
      this.addViewData = function() {
        _.each(_this.dataSource.rawDataSet, function(item) {
          if (_.isUndefined(item.viewData)) {
            item.viewData = {selected: false};
          }
        });
        _this.updateDisabledSelections();
      };
      this.clearFilteredSelections = function() {
        var nonVisibleItems = _.difference(_this.dataSource.rawDataSet, _this.dataSource.filteredDataSet);
        _.each(nonVisibleItems, function(item) {
          if (_.isUndefined(item.viewData)) {
            item.viewData = {selected: false};
          }
          item.viewData.selected = false;
          item.viewData.selectionTitle = exports.defaultSelectionTitle;
        });
        _this.updateSelected();
      };
      this.updateSelected = function() {
        _this.numberSelected = _.filter(_this.dataSource.filteredDataSet, function(item) {
          return item.viewData != null && item.viewData.selected;
        }).length;
        _this.numberSelectedChanges.next(_this.numberSelected);
      };
      this.updateDisabledSelections = function() {
        if (_this.disablingSelections) {
          _.each(_this.dataSource.rawDataSet, function(item) {
            var disabledReason = _this.disableSelection({item: item});
            item.viewData.disabledSelection = (disabledReason != null);
            item.viewData.selectionTitle = (item.viewData.disabledSelection ? disabledReason : exports.defaultSelectionTitle);
          });
        }
      };
      if (this.builder != null) {
        this.builder.setCardContainerProperties(this);
      }
      this.makeCard = $transclude;
      this.dataSource = this.source;
      this.permanentFooters = _.isUndefined(this.permanentFooters) ? false : this.permanentFooters;
      this.maxColSorts = this.maxColumnSorts != null ? this.maxColumnSorts : exports.defaultMaxColumnSorts;
      this.disablingSelections = object.isNullOrWhitespace($attrs.disableSelection) === false;
      this.sortDirection = sorts_module_1.SortDirection;
      this.numberSelectedChanges = new Rx.Subject();
      this.syncFilters();
      this.setupPaging();
      this.buildColumnSizes();
      if (this.selectableCards) {
        $scope.$on('updateDisabledSelections', this.updateDisabledSelections);
        this.dataSource.changed.subscribe(this.addViewData);
        this.dataSource.redrawing.subscribe(this.clearFilteredSelections);
        this.addViewData();
        this.selectionColumn = {
          label: null,
          size: null,
          getValue: function(item) {
            return item.viewData.selected;
          },
          flipSort: true
        };
      }
      if (this.dataSource.sorts == null) {
        this.dataSource.sorts = [];
      }
      $scope.containerData = this.containerData;
    }
    CardContainerController.prototype.sortSelected = function() {
      this.sort(this.selectionColumn);
    };
    CardContainerController.prototype.openCard = function() {
      var behaviors = this.parentChild.getAllChildBehaviors(this.dataSource.dataSet);
      return _.every(_.map(behaviors, function(behavior) {
        return behavior.close();
      }));
    };
    CardContainerController.prototype.sort = function(column) {
      var sortList = this.dataSource.sorts;
      var firstSort = sortList[0];
      if (firstSort != null && firstSort.column === column) {
        firstSort.direction = sorts_module_1.SortDirection.toggle(firstSort.direction);
        if (firstSort.direction === sorts_module_1.SortDirection.none) {
          this.clearVisualSortIndicator(firstSort);
          firstSort = null;
          if (column.secondarySorts != null) {
            sortList.length = 0;
          } else {
            sortList.shift();
          }
        }
      } else {
        this.array.remove(sortList, function(sort) {
          return column === sort.column;
        });
        var newSort = {
          column: column,
          direction: sorts_module_1.SortDirection.ascending
        };
        sortList.unshift(newSort);
        firstSort = newSort;
      }
      this.updateVisualColumnSorting();
      if (firstSort != null && column.secondarySorts != null) {
        sortList.length = 0;
        var secondarySorts = this.buildSecondarySorts(firstSort.direction, column.secondarySorts);
        sortList.push(firstSort);
        sortList.push.apply(sortList, secondarySorts);
      } else {
        this.dataSource.sorts = _.take(sortList, this.maxColSorts);
      }
      this.dataSource.onSortChange();
    };
    CardContainerController.prototype.selectionChanged = function() {
      this.updateSelected();
      this.selectionChangedEvent();
    };
    CardContainerController.prototype.syncFilters = function() {
      if (!this.object.isNullOrEmpty(this.filters)) {
        this.dataSource.filters = this.filters;
        this.dataSource.refresh();
      } else if (this.dataSource.filters != null) {
        this.filters = this.dataSource.filters;
      }
    };
    CardContainerController.prototype.setupPaging = function() {
      if (this.paging != null) {
        if (this.paging === false) {
          this.dataSource.pager = null;
        } else {
          this.builder._pager = this.dataPagerFactory.getInstance();
          this.dataSource.pager = this.builder._pager;
        }
      } else if (this.dataSource.pager) {
        this.builder._pager = this.dataSource.pager;
      }
      this.dataSource.initPager();
    };
    CardContainerController.prototype.buildColumnSizes = function() {
      var _this = this;
      _.each(this.columns, function(column) {
        var sizes = column.size;
        if (_.isObject(sizes)) {
          sizes[breakpoint_1.xs] = _this.object.valueOrDefault(sizes[breakpoint_1.xs], 0);
          sizes[breakpoint_1.sm] = _this.object.valueOrDefault(sizes[breakpoint_1.sm], sizes[breakpoint_1.xs]);
          sizes[breakpoint_1.md] = _this.object.valueOrDefault(sizes[breakpoint_1.md], sizes[breakpoint_1.sm]);
          sizes[breakpoint_1.lg] = _this.object.valueOrDefault(sizes[breakpoint_1.lg], sizes[breakpoint_1.md]);
        } else {
          column.size = {
            xs: sizes,
            sm: sizes,
            md: sizes,
            lg: sizes
          };
        }
      });
    };
    CardContainerController.prototype.lookupColumn = function(label) {
      return _.find(this.columns, function(column) {
        return column.label === label;
      });
    };
    CardContainerController.prototype.buildSecondarySorts = function(direction, secondarySorts) {
      var _this = this;
      var sortList = secondarySorts[sorts_module_1.SortDirection.getFullName(direction)];
      return _.map(sortList, function(sort) {
        return {
          direction: sort.direction,
          column: _this.lookupColumn(sort.column)
        };
      });
    };
    CardContainerController.prototype.updateVisualColumnSorting = function() {
      var _this = this;
      _.each(this.dataSource.sorts, function(sort, index) {
        if (index === 0) {
          _this.updateVisualSortIndicator(sort);
        } else {
          _this.clearVisualSortIndicator(sort);
        }
      });
    };
    CardContainerController.prototype.updateVisualSortIndicator = function(sort) {
      sort.column.sortDirection = sort.direction;
    };
    CardContainerController.prototype.clearVisualSortIndicator = function(sort) {
      sort.column.sortDirection = null;
    };
    CardContainerController.$inject = ['$scope', '$attrs', '$transclude', typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, dataSources_module_1.dataPager.factoryName, parentChild_service_1.serviceName];
    return CardContainerController;
  }());
  exports.CardContainerController = CardContainerController;
  exports.cardContainer = {
    transclude: {
      'containerHeaderSlot': '?rlContainerHeader',
      'containerFooterSlot': '?rlContainerFooter',
      'contentSlot': '?rlCardContent',
      'footerSlot': '?rlCardFooter'
    },
    template: $__require('./cardContainer.html'),
    controller: exports.controllerName,
    controllerAs: 'cardContainer',
    bindings: {
      builder: '=?',
      cardController: '@',
      cardControllerAs: '@',
      cardAs: '@',
      selectionChangedEvent: '&selectionChanged'
    }
  };
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/sorts/sorts.module", ["angular", "./mergeSort/mergeSort.service", "./sorter/sorter.service", "./sort", "./sortDirection"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var mergeSort = $__require('./mergeSort/mergeSort.service');
  exports.mergeSort = mergeSort;
  var sorter = $__require('./sorter/sorter.service');
  exports.sorter = sorter;
  __export($__require('./sort'));
  __export($__require('./sortDirection'));
  exports.moduleName = 'rl.ui.components.cardContainer.sorts';
  angular.module(exports.moduleName, [mergeSort.moduleName, sorter.moduleName]);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/clientServerDataSource/clientServerDataSource.service", ["angular", "lodash", "typescript-angular-utilities", "../asyncDataSource.service", "../dataSourceProcessor.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var asyncDataSource_service_1 = $__require('../asyncDataSource.service');
  var dataSourceProcessor_service_1 = $__require('../dataSourceProcessor.service');
  exports.moduleName = 'rl.ui.components.cardContainer.dataSources.clientServerDataSource';
  exports.factoryName = 'clientServerDataSource';
  var ClientServerDataSource = (function(_super) {
    __extends(ClientServerDataSource, _super);
    function ClientServerDataSource(getDataSet, searchFilter, getFilterModel, validateModel, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
      _super.call(this, getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
      this.searchFilter = searchFilter;
      this.getFilterModel = getFilterModel;
      this.validateModel = validateModel;
      this.object = object;
      this.minSearchLength = 4;
      this.getFilterModel = this.getFilterModel || function() {
        return null;
      };
      this.validateModel = this.validateModel || function() {
        return true;
      };
      this.countFilterGroups = true;
      this.search = searchFilter.searchText;
      this.filterModel = _.clone(this.getFilterModel());
      searchFilter.minSearchLength = this.minSearchLength;
    }
    ClientServerDataSource.prototype.refresh = function() {
      if (this.searchFilter.searchText !== this.search || this.filterModelChanged()) {
        this.reload();
      } else {
        _super.prototype.refresh.call(this);
      }
    };
    ClientServerDataSource.prototype.reload = function() {
      this.search = this.searchFilter.searchText;
      this.filterModel = _.clone(this.getFilterModel());
      var hasValidSearch = !this.object.isNullOrEmpty(this.search) && this.search.length >= this.minSearchLength;
      var hasValidFilterModel = this.filterModel != null && this.validateModel(this.filterModel);
      if (!hasValidSearch && !hasValidFilterModel) {
        this.resolveReload(null);
        return;
      }
      _super.prototype.reload.call(this);
    };
    ClientServerDataSource.prototype.filterModelChanged = function() {
      return !this.object.areEqual(this.getFilterModel(), this.filterModel);
    };
    ClientServerDataSource.prototype.getParams = function() {
      var searchModel = this.getFilterModel();
      if (searchModel != null) {
        searchModel.search = this.search;
      } else {
        searchModel = this.search;
      }
      return searchModel;
    };
    return ClientServerDataSource;
  }(asyncDataSource_service_1.AsyncDataSource));
  exports.ClientServerDataSource = ClientServerDataSource;
  clientServerDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.synchronizedRequestsServiceName];
  function clientServerDataSourceFactory(dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {getInstance: function(getDataSet, searchFilter, getFilterModel, validateModel) {
        return new ClientServerDataSource(getDataSet, searchFilter, getFilterModel, validateModel, dataSourceProcessor, array, object, synchronizedRequestsFactory);
      }};
  }
  exports.clientServerDataSourceFactory = clientServerDataSourceFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, clientServerDataSourceFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/dataPager/dataPager.service", ["angular", "lodash", "rxjs"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var Rx = $__require('rxjs');
  exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataPager';
  exports.factoryName = 'dataPager';
  exports.defaultPageSize = 10;
  var DataPager = (function() {
    function DataPager() {
      this._pageNumber = 1;
      this._pageSize = exports.defaultPageSize;
      this.pageNumberChanges = new Rx.Subject();
      this.pageSizeChanges = new Rx.Subject();
    }
    Object.defineProperty(DataPager.prototype, "pageNumber", {
      get: function() {
        return this._pageNumber;
      },
      set: function(value) {
        this._pageNumber = value;
        this.pageNumberChanges.next(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DataPager.prototype, "pageSize", {
      get: function() {
        return this._pageSize;
      },
      set: function(value) {
        this._pageSize = value;
        this.pageSizeChanges.next(value);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DataPager.prototype, "startItem", {
      get: function() {
        return (this.pageNumber - 1) * this.pageSize;
      },
      enumerable: true,
      configurable: true
    });
    DataPager.prototype.filter = function(dataSet) {
      return _(dataSet).drop(this.startItem).take(this.pageSize).value();
    };
    return DataPager;
  }());
  exports.DataPager = DataPager;
  function dataPagerFactory() {
    'use strict';
    return {getInstance: function() {
        return new DataPager();
      }};
  }
  exports.dataPagerFactory = dataPagerFactory;
  angular.module(exports.moduleName, []).factory(exports.factoryName, dataPagerFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/dataServiceDataSource/dataServiceDataSource.service", ["angular", "lodash", "typescript-angular-utilities", "../asyncDataSource.service", "../dataSourceProcessor.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var asyncDataSource_service_1 = $__require('../asyncDataSource.service');
  var dataSourceProcessor_service_1 = $__require('../dataSourceProcessor.service');
  exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataServiceDataSource';
  exports.factoryName = 'dataServiceDataSource';
  var DataServiceDataSource = (function(_super) {
    __extends(DataServiceDataSource, _super);
    function DataServiceDataSource(getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory) {
      _super.call(this, getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
      this.countFilterGroups = true;
      if (_.isFunction(getDataSet)) {
        this.reload();
      }
    }
    return DataServiceDataSource;
  }(asyncDataSource_service_1.AsyncDataSource));
  exports.DataServiceDataSource = DataServiceDataSource;
  dataServiceDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, typescript_angular_utilities_1.downgrade.synchronizedRequestsServiceName];
  function dataServiceDataSourceFactory(dataSourceProcessor, array, synchronizedRequests) {
    'use strict';
    return {getInstance: function(getDataSet) {
        return new DataServiceDataSource(getDataSet, dataSourceProcessor, array, synchronizedRequests);
      }};
  }
  exports.dataServiceDataSourceFactory = dataServiceDataSourceFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, dataServiceDataSourceFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/serverSideDataSource/serverSideDataSource.service", ["angular", "lodash", "typescript-angular-utilities", "../asyncDataSource.service", "../dataSourceProcessor.service", "../../sorts/sort"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var asyncDataSource_service_1 = $__require('../asyncDataSource.service');
  var dataSourceProcessor_service_1 = $__require('../dataSourceProcessor.service');
  var sort_1 = $__require('../../sorts/sort');
  exports.moduleName = 'rl.ui.components.cardContainer.dataSources.serverSideDataSource';
  exports.factoryName = 'serverSideDataSource';
  var ServerSideDataSource = (function(_super) {
    __extends(ServerSideDataSource, _super);
    function ServerSideDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
      _super.call(this, getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
      this.object = object;
    }
    ServerSideDataSource.prototype.refresh = function() {
      this.reload();
    };
    ServerSideDataSource.prototype.getParams = function() {
      var filterDictionary = this.array.toDictionary(this.filters, function(filter) {
        return filter.type;
      });
      return {
        filters: _.mapValues(filterDictionary, function(filter) {
          if (_.isFunction(filter.serialize)) {
            return filter.serialize();
          }
          return null;
        }),
        sorts: _.map(this.sorts, function(sort) {
          return {
            column: sort.column.label,
            direction: sort_1.SortDirection.getFullName(sort.direction)
          };
        }),
        paging: {
          pageNumber: this.pager.pageNumber,
          pageSize: this.pager.pageSize
        }
      };
    };
    ServerSideDataSource.prototype.resolveReload = function(result) {
      var data = result;
      _super.prototype.resolveReload.call(this, data.dataSet);
      this.setProcessedData({
        count: data.count,
        filteredDataSet: data.dataSet,
        dataSet: data.dataSet
      });
      this.redrawing.next(null);
    };
    return ServerSideDataSource;
  }(asyncDataSource_service_1.AsyncDataSource));
  exports.ServerSideDataSource = ServerSideDataSource;
  serverSideDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.synchronizedRequestsServiceName];
  function serverSideDataSourceFactory(dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {getInstance: function(getDataSet) {
        return new ServerSideDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory);
      }};
  }
  exports.serverSideDataSourceFactory = serverSideDataSourceFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, serverSideDataSourceFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/simpleDataSource/simpleDataSource.service", ["angular", "typescript-angular-utilities", "../dataSourceBase.service", "../dataSourceProcessor.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var dataSourceBase_service_1 = $__require('../dataSourceBase.service');
  var dataSourceProcessor_service_1 = $__require('../dataSourceProcessor.service');
  exports.moduleName = 'rl.ui.components.cardContainer.dataSources.simpleDataSource';
  exports.factoryName = 'simpleDataSource';
  var SimpleDataSource = (function(_super) {
    __extends(SimpleDataSource, _super);
    function SimpleDataSource(data, dataSourceProcessor, array) {
      _super.call(this, dataSourceProcessor, array);
      this.countFilterGroups = false;
      this.rawDataSet = data;
      this.processData();
    }
    return SimpleDataSource;
  }(dataSourceBase_service_1.DataSourceBase));
  exports.SimpleDataSource = SimpleDataSource;
  simpleDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName];
  function simpleDataSourceFactory(dataSourceProcessor, array) {
    'use strict';
    return {getInstance: function(data) {
        return new SimpleDataSource(data, dataSourceProcessor, array);
      }};
  }
  exports.simpleDataSourceFactory = simpleDataSourceFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, simpleDataSourceFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/asyncDataSource.service", ["rxjs", "./dataSourceBase.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var rxjs_1 = $__require('rxjs');
  var dataSourceBase_service_1 = $__require('./dataSourceBase.service');
  var AsyncDataSource = (function(_super) {
    __extends(AsyncDataSource, _super);
    function AsyncDataSource(getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory) {
      _super.call(this, dataSourceProcessor, array);
      this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
      this.reloaded = new rxjs_1.Subject();
    }
    Object.defineProperty(AsyncDataSource.prototype, "getDataSet", {
      set: function(value) {
        this.synchronizedRequests.dataProvider = value;
      },
      enumerable: true,
      configurable: true
    });
    AsyncDataSource.prototype.reload = function() {
      this.dataSet = null;
      this.rawDataSet = null;
      this.loadingDataSet = true;
      this.synchronizedRequests.getData(this.getParams());
    };
    AsyncDataSource.prototype.resolveReload = function(data) {
      this.loadingDataSet = false;
      this.rawDataSet = data;
      this.processData();
      this.reloaded.next(null);
      this.redrawing.next(null);
      this.changed.next(null);
    };
    AsyncDataSource.prototype.getParams = function() {
      return null;
    };
    return AsyncDataSource;
  }(dataSourceBase_service_1.DataSourceBase));
  exports.AsyncDataSource = AsyncDataSource;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/sorts/sort", ["./sortDirection"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./sortDirection'));
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/smartDataSource/smartDataSource.service", ["angular", "lodash", "typescript-angular-utilities", "../asyncDataSource.service", "../dataSourceProcessor.service", "../../sorts/sort"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var asyncDataSource_service_1 = $__require('../asyncDataSource.service');
  var dataSourceProcessor_service_1 = $__require('../dataSourceProcessor.service');
  var sort_1 = $__require('../../sorts/sort');
  exports.moduleName = 'rl.ui.components.cardContainer.dataSources.smartDataSource';
  exports.factoryName = 'smartDataSource';
  var SmartDataSource = (function(_super) {
    __extends(SmartDataSource, _super);
    function SmartDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
      _super.call(this, getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
      this.object = object;
      this.throttled = true;
      this.throttleLimit = 200;
    }
    Object.defineProperty(SmartDataSource.prototype, "filters", {
      get: function() {
        return this._filters;
      },
      set: function(value) {
        this._filters = value;
        this.setupSubscriptions();
      },
      enumerable: true,
      configurable: true
    });
    SmartDataSource.prototype.onSortChange = function() {
      if (this.throttled) {
        this.reload();
      } else {
        _super.prototype.onSortChange.call(this);
      }
    };
    SmartDataSource.prototype.refresh = function() {
      if (this.throttled) {
        this.reload();
      } else {
        _super.prototype.refresh.call(this);
      }
    };
    SmartDataSource.prototype.getParams = function() {
      this.updateAppliedFilters();
      return {
        filters: this.appliedFilters,
        sorts: _.map(this.sorts, function(sort) {
          return {
            column: sort.column.label,
            direction: sort_1.SortDirection.getFullName(sort.direction)
          };
        }),
        paging: {
          pageNumber: 1,
          pageSize: this.throttleLimit
        }
      };
    };
    SmartDataSource.prototype.updateAppliedFilters = function() {
      var filterDictionary = this.array.toDictionary(this.filters, function(filter) {
        return filter.type;
      });
      this.appliedFilters = _.mapValues(filterDictionary, function(filter) {
        if (_.isFunction(filter.serialize)) {
          return filter.serialize();
        }
        return null;
      });
      this.appliedFilters = _.omitBy(this.appliedFilters, function(value) {
        return value == null;
      });
    };
    SmartDataSource.prototype.setupSubscriptions = function() {
      var _this = this;
      _.each(this.subscriptions, function(subscription) {
        subscription.unsubscribe();
      });
      this.subscriptions = [];
      _.each(this.filters, function(filter) {
        if (_.isFunction(filter.subscribe)) {
          _this.subscriptions.push(filter.subscribe(function() {
            _this.onFilterChange(filter);
          }));
        }
      });
    };
    SmartDataSource.prototype.onFilterChange = function(filter) {
      if (_.has(this.appliedFilters, filter.type)) {
        this.reload();
      }
    };
    SmartDataSource.prototype.resolveReload = function(result) {
      var data = result;
      this.throttled = (data.count > data.dataSet.length);
      _super.prototype.resolveReload.call(this, data.dataSet);
      this.count = data.count;
      this.isEmpty = data.isEmpty;
    };
    return SmartDataSource;
  }(asyncDataSource_service_1.AsyncDataSource));
  exports.SmartDataSource = SmartDataSource;
  smartDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.synchronizedRequestsServiceName];
  function smartDataSourceFactory(dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {getInstance: function(getDataSet) {
        return new SmartDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory);
      }};
  }
  exports.smartDataSourceFactory = smartDataSourceFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, smartDataSourceFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/sorts/sortDirection", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SortDirection = (function() {
    function SortDirection(value) {
      this.value = value;
    }
    SortDirection.toggle = function(direction) {
      if (direction === SortDirection.ascending) {
        return SortDirection.descending;
      } else if (direction === SortDirection.descending) {
        return SortDirection.none;
      } else {
        return SortDirection.ascending;
      }
    };
    SortDirection.getFullName = function(direction) {
      'use strict';
      if (direction === SortDirection.ascending) {
        return 'ascending';
      } else if (direction === SortDirection.descending) {
        return 'descending';
      } else {
        return 'none';
      }
    };
    SortDirection.none = new SortDirection(0);
    SortDirection.ascending = new SortDirection(1);
    SortDirection.descending = new SortDirection(2);
    return SortDirection;
  }());
  exports.SortDirection = SortDirection;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/sorts/mergeSort/mergeSort.service", ["angular", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  exports.moduleName = 'rl.ui.components.cardContainer.sorts.mergeSort';
  exports.serviceName = 'mergeSort';
  var MergeSort = (function() {
    function MergeSort() {}
    MergeSort.prototype.sort = function(data, compare) {
      if (data.length < 2) {
        return data;
      }
      if (compare == null) {
        compare = this.defaultCompare;
      }
      var mid;
      var left;
      var right;
      mid = data.length / 2;
      left = this.sort(data.slice(0, mid), compare);
      right = this.sort(data.slice(mid, data.length), compare);
      return this.merge(left, right, compare);
    };
    MergeSort.prototype.defaultCompare = function(a, b) {
      return a < b ? typescript_angular_utilities_1.types.CompareResult.less : (a > b ? typescript_angular_utilities_1.types.CompareResult.greater : typescript_angular_utilities_1.types.CompareResult.equal);
    };
    MergeSort.prototype.merge = function(left, right, compare) {
      var result = [];
      while (left.length && right.length) {
        if (compare(left[0], right[0]) === typescript_angular_utilities_1.types.CompareResult.greater) {
          result.push(right.shift());
        } else {
          result.push(left.shift());
        }
      }
      if (left.length) {
        result.push.apply(result, left);
      }
      if (right.length) {
        result.push.apply(result, right);
      }
      return result;
    };
    return MergeSort;
  }());
  exports.MergeSort = MergeSort;
  angular.module(exports.moduleName, []).service(exports.serviceName, MergeSort);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/sorts/sorter/sorter.service", ["angular", "lodash", "typescript-angular-utilities", "../sortDirection", "../mergeSort/mergeSort.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  var sortDirection_1 = $__require('../sortDirection');
  var mergeSort_service_1 = $__require('../mergeSort/mergeSort.service');
  exports.moduleName = 'rl.ui.components.cardContainer.sorts.sorter';
  exports.serviceName = 'sorter';
  var Sorter = (function() {
    function Sorter(mergeSort) {
      this.mergeSort = mergeSort;
    }
    Sorter.prototype.sort = function(data, sort) {
      var _this = this;
      if (sort === null) {
        return data;
      }
      if (_.isArray(sort)) {
        var reverseSorts = _.clone(sort);
        reverseSorts.reverse();
        return _.reduce(reverseSorts, function(sortedData, nextSort) {
          return _this.singleSort(sortedData, nextSort);
        }, data);
      }
      return this.singleSort(data, sort);
    };
    Sorter.prototype.singleSort = function(data, sort) {
      var compareFunction = this.buildSortFunction(sort);
      return this.mergeSort.sort(data, compareFunction);
    };
    Sorter.prototype.buildSortFunction = function(sort) {
      return function(a, b) {
        if (sort.direction === sortDirection_1.SortDirection.none) {
          return typescript_angular_utilities_1.types.CompareResult.equal;
        }
        var valueOfA = __transform.getValue(a, sort.column.getValue);
        var valueOfB = __transform.getValue(b, sort.column.getValue);
        var greaterResult = typescript_angular_utilities_1.types.CompareResult.greater;
        var lessResult = typescript_angular_utilities_1.types.CompareResult.less;
        var descendingSort = (sort.direction === sortDirection_1.SortDirection.descending);
        var flip = sort.column.flipSort;
        if ((descendingSort || flip) && !(descendingSort && flip)) {
          greaterResult = typescript_angular_utilities_1.types.CompareResult.less;
          lessResult = typescript_angular_utilities_1.types.CompareResult.greater;
        }
        return valueOfA > valueOfB ? greaterResult : (valueOfA < valueOfB ? lessResult : typescript_angular_utilities_1.types.CompareResult.equal);
      };
    };
    Sorter.$inject = [mergeSort_service_1.serviceName];
    return Sorter;
  }());
  exports.Sorter = Sorter;
  angular.module(exports.moduleName, []).service(exports.serviceName, Sorter);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/dataSourceProcessor.service", ["lodash", "typescript-angular-utilities", "../sorts/sorter/sorter.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var sorter_service_1 = $__require('../sorts/sorter/sorter.service');
  exports.processorServiceName = 'dataSourceProcessor';
  var DataSourceProcessor = (function() {
    function DataSourceProcessor(object, sorter) {
      this.object = object;
      this.sorter = sorter;
    }
    DataSourceProcessor.prototype.process = function(sorts, filters, pager, data) {
      var processedData = data;
      processedData = this.sort(processedData, sorts);
      if (this.object.isNullOrEmpty(filters) === false) {
        processedData = _.reduce(filters, function(filteredData, filter) {
          return _.filter(filteredData, filter.filter.bind(filter));
        }, processedData);
      }
      var result = {
        count: (processedData != null ? processedData.length : 0),
        filteredDataSet: processedData,
        dataSet: processedData
      };
      result.dataSet = this.page(processedData, pager);
      return result;
    };
    DataSourceProcessor.prototype.processAndCount = function(sorts, filters, pager, data) {
      var _this = this;
      if (this.object.isNullOrEmpty(filters) || _.some(filters, function(filter) {
        return _.isFunction(filter.updateOptionCounts);
      }) === false) {
        return this.process(sorts, filters, pager, data);
      }
      var processedData = data;
      processedData = this.sort(processedData, sorts);
      var wrappedData = this.wrapData(processedData);
      _.each(filters, function(filter) {
        _.each(wrappedData, function(item) {
          item.filterData[filter.type] = filter.filter(item.data);
        });
      });
      _.each(filters, function(filter) {
        if (_.isFunction(filter.updateOptionCounts)) {
          var otherFiltersApplied = _.filter(wrappedData, function(item) {
            var filterData = _.omit(item.filterData, filter.type);
            return _.every(_.values(filterData));
          });
          filter.updateOptionCounts(_this.unwrapData(otherFiltersApplied));
        }
      });
      wrappedData = _.filter(wrappedData, function(item) {
        return _.every(_.values(item.filterData));
      });
      processedData = this.unwrapData(wrappedData);
      var result = {
        count: processedData.length,
        filteredDataSet: processedData,
        dataSet: processedData
      };
      result.dataSet = this.page(processedData, pager);
      return result;
    };
    DataSourceProcessor.prototype.sort = function(data, sorts) {
      if (this.object.isNullOrEmpty(sorts) === false) {
        return this.sorter.sort(data, sorts);
      }
      return data;
    };
    DataSourceProcessor.prototype.page = function(data, pager) {
      if (pager != null) {
        return pager.filter(data);
      }
      return data;
    };
    DataSourceProcessor.prototype.wrapData = function(data) {
      return _.map(data, function(item) {
        return {
          data: item,
          filterData: {}
        };
      });
    };
    DataSourceProcessor.prototype.unwrapData = function(data) {
      return _.map(data, function(item) {
        return item.data;
      });
    };
    DataSourceProcessor.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName, sorter_service_1.serviceName];
    return DataSourceProcessor;
  }());
  exports.DataSourceProcessor = DataSourceProcessor;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/dataSourceBase.service", ["rxjs", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var rxjs_1 = $__require('rxjs');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __object = typescript_angular_utilities_1.services.object;
  var DataSourceBase = (function() {
    function DataSourceBase(dataSourceProcessor, array) {
      this.dataSourceProcessor = dataSourceProcessor;
      this.array = array;
      this.sorts = [];
      this.filters = [];
      this._count = 0;
      this.countFilterGroups = false;
      this.loadingDataSet = false;
      this.countChanges = new rxjs_1.Subject();
      this.redrawing = new rxjs_1.Subject();
      this.changed = new rxjs_1.Subject();
      this.added = new rxjs_1.Subject();
      this.removed = new rxjs_1.Subject();
      this.replaced = new rxjs_1.Subject();
    }
    Object.defineProperty(DataSourceBase.prototype, "count", {
      get: function() {
        return this._count;
      },
      set: function(value) {
        this._count = value;
        this.countChanges.next(value);
      },
      enumerable: true,
      configurable: true
    });
    DataSourceBase.prototype.initPager = function() {
      if (this.pager) {
        this.pager.pageSizeChanges.subscribe(this.onPagingChange.bind(this));
        this.pager.pageNumberChanges.subscribe(this.onPagingChange.bind(this));
      }
    };
    Object.defineProperty(DataSourceBase.prototype, "needsRefinedSearch", {
      get: function() {
        var noItemsDisplayed = __object.objectUtility.isNullOrEmpty(this.dataSet);
        var moreItemsOnServer = this._isEmpty === false || (this.rawDataSet != null && this.rawDataSet.length < this.count);
        return noItemsDisplayed && moreItemsOnServer;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DataSourceBase.prototype, "isEmpty", {
      get: function() {
        return __object.objectUtility.isNullOrEmpty(this.rawDataSet) && (this._isEmpty != null ? this._isEmpty : true);
      },
      set: function(value) {
        this._isEmpty = value;
      },
      enumerable: true,
      configurable: true
    });
    DataSourceBase.prototype.processData = function() {
      var processedData;
      if (this.countFilterGroups) {
        processedData = this.dataSourceProcessor.processAndCount(this.sorts, this.filters, this.pager, this.rawDataSet);
      } else {
        processedData = this.dataSourceProcessor.process(this.sorts, this.filters, this.pager, this.rawDataSet);
      }
      this.setProcessedData(processedData);
    };
    DataSourceBase.prototype.processDataNoClientFilters = function() {
      var processedData;
      if (this.countFilterGroups) {
        processedData = this.dataSourceProcessor.processAndCount(this.sorts, null, this.pager, this.rawDataSet);
      } else {
        processedData = this.dataSourceProcessor.process(this.sorts, null, this.pager, this.rawDataSet);
      }
      this.setProcessedData(processedData);
    };
    DataSourceBase.prototype.setProcessedData = function(processedData) {
      this.count = processedData.count;
      this.dataSet = processedData.dataSet;
      this.filteredDataSet = processedData.filteredDataSet;
    };
    DataSourceBase.prototype.onSortChange = function() {
      if (!this.loadingDataSet) {
        this.filteredDataSet = this.dataSourceProcessor.sort(this.filteredDataSet, this.sorts);
        this.dataSet = this.dataSourceProcessor.page(this.filteredDataSet, this.pager);
        this.redrawing.next(null);
      }
    };
    DataSourceBase.prototype.onPagingChange = function() {
      if (!this.loadingDataSet) {
        this.dataSet = this.dataSourceProcessor.page(this.filteredDataSet, this.pager);
        this.redrawing.next(null);
      }
    };
    DataSourceBase.prototype.refresh = function() {
      if (!this.loadingDataSet) {
        this.processData();
        this.redrawing.next(null);
      }
    };
    DataSourceBase.prototype.remove = function(data) {
      var item = this.array.remove(this.rawDataSet, data);
      if (item != null) {
        this.removed.next(null);
        this.changed.next(null);
        this.refresh();
      }
    };
    DataSourceBase.prototype.push = function(data) {
      this.rawDataSet.push(data);
      this.added.next(null);
      this.changed.next(null);
      this.refresh();
    };
    DataSourceBase.prototype.replace = function(oldData, newData) {
      var locationOfOldData = this.rawDataSet.indexOf(oldData);
      if (locationOfOldData >= 0) {
        this.array.replace(this.rawDataSet, oldData, newData);
        this.replaced.next(null);
        this.changed.next(null);
        this.refresh();
      }
    };
    return DataSourceBase;
  }());
  exports.DataSourceBase = DataSourceBase;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/dataSources/dataSources.module", ["angular", "typescript-angular-utilities", "../sorts/sorts.module", "./clientServerDataSource/clientServerDataSource.service", "./dataPager/dataPager.service", "./dataServiceDataSource/dataServiceDataSource.service", "./serverSideDataSource/serverSideDataSource.service", "./simpleDataSource/simpleDataSource.service", "./smartDataSource/smartDataSource.service", "./dataSourceProcessor.service", "./dataSourceBase.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var sorts_module_1 = $__require('../sorts/sorts.module');
  var clientServerDataSource = $__require('./clientServerDataSource/clientServerDataSource.service');
  exports.clientServerDataSource = clientServerDataSource;
  var dataPager = $__require('./dataPager/dataPager.service');
  exports.dataPager = dataPager;
  var dataServiceDataSource = $__require('./dataServiceDataSource/dataServiceDataSource.service');
  exports.dataServiceDataSource = dataServiceDataSource;
  var serverSideDataSource = $__require('./serverSideDataSource/serverSideDataSource.service');
  exports.serverSideDataSource = serverSideDataSource;
  var simpleDataSource = $__require('./simpleDataSource/simpleDataSource.service');
  exports.simpleDataSource = simpleDataSource;
  var smartDataSource = $__require('./smartDataSource/smartDataSource.service');
  exports.smartDataSource = smartDataSource;
  var dataSourceProcessor = $__require('./dataSourceProcessor.service');
  exports.dataSourceProcessor = dataSourceProcessor;
  var dataSourceBase = $__require('./dataSourceBase.service');
  exports.dataSourceBase = dataSourceBase;
  exports.moduleName = 'rl.ui.components.cardContainer.dataSources';
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, sorts_module_1.moduleName, clientServerDataSource.moduleName, dataPager.moduleName, dataServiceDataSource.moduleName, serverSideDataSource.moduleName, simpleDataSource.moduleName, smartDataSource.moduleName]).service(dataSourceProcessor.processorServiceName, dataSourceProcessor.DataSourceProcessor);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filterGroup/filterOption/filterOption.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"row filter-option\" ng-class=\"{ 'active': filter.isActive }\" ng-click=\"filter.activate()\">\r\n\t<div class=\"col-xs-1\">\r\n\t\t<i class='fa fa-arrow-right' ng-show=\"filter.isActive == true\"></i>\r\n\t</div>\r\n\t<div class=\"col-xs-1\" ng-if=\"filter.hasIcon\" ng-bind-html=\"filter.option.icon\"></div>\r\n\t<div ng-class=\"{ 'col-xs-6': filter.hasIcon, 'col-xs-7': !filter.hasIcon }\">\r\n\t\t{{filter.option.label}}\r\n\t</div>\r\n\t<div class=\"col-xs-3 text-right\" ng-show=\"filter.option.count != null\">\r\n\t\t({{filter.option.count}})\r\n\t</div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filterGroup/filterOption/filterOption", ["angular", "./filterOption.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.filterOption';
  exports.componentName = 'rlFilterOption';
  var filterOption = {
    template: $__require('./filterOption.html'),
    controllerAs: 'filter',
    bindings: {
      activate: '&',
      isActive: '=active',
      option: '='
    }
  };
  angular.module(exports.moduleName, []).component(exports.componentName, filterOption);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filterGroup/modeFilterGroup/modeFilterGroup.service", ["angular", "lodash", "typescript-angular-utilities", "../filterGroup.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  var filterGroup_service_1 = $__require('../filterGroup.service');
  exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.modeFilterGroup';
  exports.factoryName = 'modeFilterGroup';
  var ModeFilterGroup = (function(_super) {
    __extends(ModeFilterGroup, _super);
    function ModeFilterGroup(settings, object) {
      _super.call(this, settings, object);
      this.getValue = settings.getValue;
      settings.options = _.map(settings.options, this.buildModeOption.bind(this));
      this.initOptions();
    }
    ModeFilterGroup.prototype.serialize = function() {
      var activeOption = this.activeOption;
      if (activeOption.displayAll) {
        return null;
      }
      return activeOption.value;
    };
    ModeFilterGroup.prototype.buildModeOption = function(option) {
      var _this = this;
      var modeOption = option;
      modeOption.filter = function(item) {
        if (modeOption.displayAll) {
          return true;
        }
        return __transform.getValue(item, _this.getValue) === modeOption.value;
      };
      return modeOption;
    };
    return ModeFilterGroup;
  }(filterGroup_service_1.FilterGroup));
  exports.ModeFilterGroup = ModeFilterGroup;
  modeFilterGroupFactory.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName];
  function modeFilterGroupFactory(object) {
    'use strict';
    return {getInstance: function(settings) {
        return new ModeFilterGroup(settings, object);
      }};
  }
  exports.modeFilterGroupFactory = modeFilterGroupFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, modeFilterGroupFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filterGroup/rangeFilterGroup/rangeFilterGroup.service", ["angular", "lodash", "typescript-angular-utilities", "../filterGroup.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  var filterGroup_service_1 = $__require('../filterGroup.service');
  exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup.rangeFilterGroup';
  exports.factoryName = 'rangeFilterGroup';
  var RangeFilterGroup = (function(_super) {
    __extends(RangeFilterGroup, _super);
    function RangeFilterGroup(settings, object) {
      _super.call(this, settings, object);
      this.getValue = settings.getValue;
      settings.options = _.map(settings.options, this.buildRangeOption.bind(this));
      this.initOptions();
    }
    RangeFilterGroup.prototype.serialize = function() {
      var activeOption = this.activeOption;
      if (this.isNullOption(activeOption)) {
        return null;
      }
      return {
        highInclusive: activeOption.highInclusive,
        highExclusive: activeOption.highExclusive,
        lowInclusive: activeOption.lowInclusive,
        lowExclusive: activeOption.lowExclusive
      };
    };
    RangeFilterGroup.prototype.buildRangeOption = function(option) {
      var _this = this;
      var modeOption = option;
      modeOption.filter = function(item) {
        var value = __transform.getValue(item, _this.getValue);
        var result = true;
        if (_.isUndefined(option.highExclusive) === false) {
          result = value < option.highExclusive;
        } else if (_.isUndefined(option.highInclusive) === false) {
          result = value <= option.highInclusive;
        }
        if (_.isUndefined(option.lowExclusive) === false) {
          result = result && value > option.lowExclusive;
        } else if (_.isUndefined(option.lowInclusive) === false) {
          result = result && value >= option.lowInclusive;
        }
        return result;
      };
      return modeOption;
    };
    RangeFilterGroup.prototype.isNullOption = function(option) {
      return option.highInclusive == null && option.highExclusive == null && option.lowInclusive == null && option.lowExclusive == null;
    };
    return RangeFilterGroup;
  }(filterGroup_service_1.FilterGroup));
  rangeFilterGroupFactory.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName];
  function rangeFilterGroupFactory(object) {
    'use strict';
    return {getInstance: function(settings) {
        return new RangeFilterGroup(settings, object);
      }};
  }
  exports.rangeFilterGroupFactory = rangeFilterGroupFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, rangeFilterGroupFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filterGroup/filterGroup.service", ["lodash", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  exports.factoryName = 'filterGroup';
  var FilterGroup = (function(_super) {
    __extends(FilterGroup, _super);
    function FilterGroup(settings, object) {
      _super.call(this);
      this.settings = settings;
      this.object = object;
      this.template = '<rl-filter-group filter-group="filter" source="dataSource"></rl-filter-group>';
      this.label = settings.label;
      this.type = settings.type != null ? settings.type : settings.label;
      this.initOptions();
    }
    FilterGroup.prototype.initOptions = function() {
      var _this = this;
      this.options = this.settings.options;
      this.activeOption = this.setDefaultOption();
      _.each(this.options, function(option) {
        if (_.isUndefined(option.type)) {
          option.type = option.label;
        }
        option.type = _this.object.toString(option.type).toLowerCase();
      });
    };
    Object.defineProperty(FilterGroup.prototype, "activeOption", {
      get: function() {
        return this._activeOption;
      },
      set: function(value) {
        this._activeOption = value;
        this.onChange(false);
      },
      enumerable: true,
      configurable: true
    });
    FilterGroup.prototype.setDefaultOption = function() {
      var defaultOption = this.options[0];
      _.each(this.options, function(item) {
        if (item.active != null && item.active === true) {
          defaultOption = item;
        }
      });
      return defaultOption;
    };
    FilterGroup.prototype.filter = function(item) {
      return this.activeOption.filter(item);
    };
    FilterGroup.prototype.serialize = function() {
      if (_.isFunction(this.settings.serialize)) {
        return this.settings.serialize();
      }
      if (_.isFunction(this.activeOption.serialize)) {
        return this.activeOption.serialize();
      }
      return this.activeOption.value;
    };
    FilterGroup.prototype.setActiveOption = function(index) {
      if (index >= 0 && index < this.options.length) {
        this.activeOption = this.options[index];
      }
    };
    FilterGroup.prototype.setOptionCounts = function(counts) {
      _.each(this.options, function(option) {
        if (_.has(counts, option.type)) {
          option.count = counts[option.type];
        }
      });
    };
    FilterGroup.prototype.updateOptionCounts = function(filteredDataSet) {
      _.each(this.options, function(option) {
        option.count = _.filter(filteredDataSet, option.filter.bind(option)).length;
      });
    };
    return FilterGroup;
  }(typescript_angular_utilities_1.filters.SerializableFilter));
  exports.FilterGroup = FilterGroup;
  filterGroupFactory.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName];
  function filterGroupFactory(object) {
    'use strict';
    return {getInstance: function(settings) {
        return new FilterGroup(settings, object);
      }};
  }
  exports.filterGroupFactory = filterGroupFactory;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filterGroup/filterGroup.directive.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"filter-group\">\r\n\t<div class=\"row filter-header\" ng-click=\"controller.toggleChildren()\">\r\n\t\t<div class=\"col-sm-12\">\r\n\t\t\t<i class=\"collapse-icon fa fa-caret-down fa-2x\" ng-show=\"controller.showChildren\" title=\"Hide filter list\"></i>\r\n\t\t\t<i class=\"collapse-icon fa fa-caret-right fa-2x\" ng-hide=\"controller.showChildren\" title=\"Show filter list\"></i>\r\n\t\t\t<div class=\"filter-option\">\r\n\t\t\t\t<div style=\"display:inline-block\" ng-show=\"controller.hasIcon\" ng-bind-html=\"controller.icon\"></div>\r\n\t\t\t\t<h4 style=\"display: inline-block\">{{controller.filterGroup.label}}: {{controller.filterGroup.activeOption.label}}</h4>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div ng-show=\"controller.showChildren\" ng-repeat=\"filterOption in controller.filterGroup.options\">\r\n\t\t<rl-filter-option option=\"filterOption\" active=\"filterGroup.activeOption === filterOption\" activate=\"controller.selectOption(filterOption)\"></rl-filter-option>\r\n\t</div>\r\n</div>\r\n";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filterGroup/filterGroup.directive", ["./filterGroup.directive.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.componentName = 'rlFilterGroup';
  exports.controllerName = 'FilterGroupController';
  var FilterGroupController = (function() {
    function FilterGroupController($scope) {
      this.$scope = $scope;
      this.hasIcon = this.icon != null && this.icon !== '';
      this.showChildren = true;
    }
    FilterGroupController.prototype.toggleChildren = function() {
      this.showChildren = !this.showChildren;
    };
    FilterGroupController.prototype.selectOption = function(option) {
      this.filterGroup.activeOption = option;
      this.showChildren = false;
      if (this.source != null) {
        this.source.refresh();
      } else {
        this.$scope.$emit('dataSource.requestRefresh');
      }
    };
    FilterGroupController.$inject = ['$scope'];
    return FilterGroupController;
  }());
  exports.FilterGroupController = FilterGroupController;
  exports.filterGroup = {
    template: $__require('./filterGroup.directive.html'),
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
      icon: '=',
      filterGroup: '=',
      source: '='
    }
  };
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/filterGroup/filterGroup.module", ["angular", "typescript-angular-utilities", "./filterOption/filterOption", "./modeFilterGroup/modeFilterGroup.service", "./rangeFilterGroup/rangeFilterGroup.service", "./filterGroup.service", "./filterGroup.directive"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var filterOption = $__require('./filterOption/filterOption');
  exports.filterOption = filterOption;
  var modeFilterGroup = $__require('./modeFilterGroup/modeFilterGroup.service');
  exports.modeFilterGroup = modeFilterGroup;
  var rangeFilterGroup = $__require('./rangeFilterGroup/rangeFilterGroup.service');
  exports.rangeFilterGroup = rangeFilterGroup;
  var filterGroup_service_1 = $__require('./filterGroup.service');
  var filterGroup_directive_1 = $__require('./filterGroup.directive');
  __export($__require('./filterGroup.directive'));
  __export($__require('./filterGroup.service'));
  exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup';
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, filterOption.moduleName, modeFilterGroup.moduleName, rangeFilterGroup.moduleName]).factory(filterGroup_service_1.factoryName, filterGroup_service_1.filterGroupFactory).component(filterGroup_directive_1.componentName, filterGroup_directive_1.filterGroup).controller(filterGroup_directive_1.controllerName, filterGroup_directive_1.FilterGroupController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/selectFilter/selectFilter.service", ["typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __object = typescript_angular_utilities_1.services.object;
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  exports.factoryName = 'rlSelectFilterFactory';
  var SelectFilter = (function() {
    function SelectFilter(settings) {
      this.type = 'selectFilter';
      this.valueSelector = settings.valueSelector;
      this.comparer = settings.comparer;
      this.options = settings.options;
      this.getOptions = settings.getOptions;
      this.label = settings.label;
      this.displayNameSelector = settings.displayNameSelector;
      this.nullOption = settings.nullOption;
      this.template = "<rl-select-filter filter=\"filter\" source=\"dataSource\" options=\"filter.options\" get-options=\"filter.getOptions()\"\n\t\t\t\t\t\t\t\t\t\t   label=\"{{filter.label}}\" selector=\"filter.displayNameSelector\" null-option=\"{{filter.nullOption}}\"></rl-select-filter>";
    }
    SelectFilter.prototype.filter = function(item) {
      if (this.selectedValue == null) {
        return true;
      }
      if (this.comparer != null) {
        return this.comparer(this.getValue(item), this.selectedValue);
      }
      return __object.objectUtility.areEqual(this.getValue(item), this.selectedValue);
    };
    SelectFilter.prototype.getValue = function(item) {
      return __transform.getValue(item, this.valueSelector);
    };
    return SelectFilter;
  }());
  function selectFilterFactory() {
    return {getInstance: function(settings) {
        return new SelectFilter(settings);
      }};
  }
  exports.selectFilterFactory = selectFilterFactory;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/selectFilter/selectFilter.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"filter-group\">\r\n\t<rl-select ng-model=\"filter.selectedValue\" options=\"filter.options\" label=\"{{filter.label}}\"\r\n\t\t\t   transform=\"filter.transform\" get-options=\"filter.getOptions()\" null-option=\"{{filter.nullOption}}\" item-as=\"{{filter.itemAs}}\" template=\"filter.template\"></rl-select>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/selectFilter/selectFilter.component", ["../../../../services/jquery/jquery.service", "./selectFilter.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var jquery_service_1 = $__require('../../../../services/jquery/jquery.service');
  exports.componentName = 'rlSelectFilter';
  exports.controllerName = 'SelectFilterController';
  var SelectFilterController = (function() {
    function SelectFilterController($scope, $transclude, jqueryUtility) {
      var _this = this;
      this.$scope = $scope;
      this.transform = this.transform || this.selector;
      $transclude(function(clone) {
        if (clone.length) {
          _this.template = jqueryUtility.getHtml(clone);
        }
      });
    }
    Object.defineProperty(SelectFilterController.prototype, "selectedValue", {
      get: function() {
        return this.filter.selectedValue;
      },
      set: function(value) {
        this.filter.selectedValue = value;
        if (this.source != null) {
          this.source.refresh();
        } else {
          this.$scope.$emit('dataSource.requestRefresh');
        }
      },
      enumerable: true,
      configurable: true
    });
    SelectFilterController.$inject = ['$scope', '$transclude', jquery_service_1.serviceName];
    return SelectFilterController;
  }());
  exports.SelectFilterController = SelectFilterController;
  exports.selectFilter = {
    transclude: true,
    template: $__require('./selectFilter.html'),
    controller: exports.controllerName,
    controllerAs: 'filter',
    bindings: {
      filter: '<',
      options: '<?',
      getOptions: '&',
      source: '<?',
      label: '@',
      transform: '<?',
      nullOption: '@',
      itemAs: '@',
      selector: '<?'
    }
  };
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/selectFilter/selectFilter.module", ["angular", "./selectFilter.service", "./selectFilter.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var selectFilter_service_1 = $__require('./selectFilter.service');
  var selectFilter_component_1 = $__require('./selectFilter.component');
  exports.moduleName = 'rl.ui.components.cardContainer.filters.selectFilter';
  __export($__require('./selectFilter.service'));
  __export($__require('./selectFilter.component'));
  angular.module(exports.moduleName, []).factory(selectFilter_service_1.factoryName, selectFilter_service_1.selectFilterFactory).component(selectFilter_component_1.componentName, selectFilter_component_1.selectFilter).controller(selectFilter_component_1.controllerName, selectFilter_component_1.SelectFilterController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/dateFilter/dateFilter.service", ["moment", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var moment = $__require('moment');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  exports.factoryName = 'rlDateFilterFactory';
  var DateFilter = (function() {
    function DateFilter(settings, dateUtility) {
      this.dateUtility = dateUtility;
      this.valueSelector = settings.valueSelector;
      this.type = settings.type;
      this.clearButton = settings.clearButton;
      this.includeDateRange = settings.includeDateRange;
      this.includeTime = settings.includeTime != null ? settings.includeTime : false;
      this.label = settings.label;
      this.template = "<rl-date-filter filter=\"filter\" source=\"dataSource\" label=\"{{filter.label}}\" include-time=\"filter.includeTime\"\n\t\t\t\t\t\t\t\t\t     include-date-range=\"filter.includeDateRange\" clear-button=\"filter.clearButton\"></rl-date-filter>";
    }
    DateFilter.prototype.filter = function(item) {
      if (!this.dateUtility.isDate(this.selectedDate1)) {
        return true;
      }
      if (this.dateRange) {
        var itemDate = this.getValue(item);
        var selectedDate1 = void 0;
        if (this.includeTime) {
          selectedDate1 = moment(this.selectedDate1);
        } else {
          selectedDate1 = moment(this.selectedDate1).add(1, 'days');
        }
        return this.dateUtility.dateInRange(itemDate, this.selectedDate2, this.selectedDate1);
      } else {
        if (this.includeTime) {
          return this.dateUtility.sameDateTime(this.getValue(item), this.selectedDate1);
        } else {
          return this.dateUtility.sameDate(this.getValue(item), this.selectedDate1);
        }
      }
    };
    DateFilter.prototype.getValue = function(item) {
      return __transform.getValue(item, this.valueSelector);
    };
    return DateFilter;
  }());
  dateFilterFactory.$inject = [typescript_angular_utilities_1.downgrade.dateServiceName];
  function dateFilterFactory(dateUtility) {
    return {getInstance: function(settings) {
        return new DateFilter(settings, dateUtility);
      }};
  }
  exports.dateFilterFactory = dateFilterFactory;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/dateFilter/dateFilter.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"filter-group spinner-container\">\r\n\t<div class=\"content-group\">\r\n\t\t<label>{{::filter.label}}</label>\r\n\t\t<rl-date-time ng-model=\"filter.selectedDate1\" use-time=\"filter.includeTime\" clear-button=\"filter.clearButton\" on-clear-event=\"filter.clearCount()\"\r\n\t\tclass=\"pull-left\"></rl-date-time>\r\n\t</div>\r\n\t<div ng-if=\"filter.includeDateRange\" class=\"content-group\">\r\n\t\t<label>Add previous</label>\r\n\t\t<div class=\"input-group\">\r\n\t\t<span class=\"input-group-btn\">\r\n\t\t\t<button  class=\"btn btn-default\" ng-click=\"filter.decreaseCount();\">\r\n\t\t\t\t<i class=\"fa fa-minus\"></i>\r\n\t\t\t</button>\r\n\t\t</span>\r\n\t\t<input type=\"number\" class=\"form-control\" ng-model=\"filter.count\" ng-change=\"filter.countChange();\" />\r\n\t\t<span class=\"input-group-btn\">\r\n\t\t\t<button class=\"btn btn-default\" ng-click=\"filter.toggle();\">\r\n\t\t\t{{filter.type}}\r\n\t\t\t</button>\r\n\t\t</span>\r\n\t\t<span class=\"input-group-btn\">\r\n\t\t\t<button class=\"btn btn-default\" ng-click=\"filter.increaseCount();\">\r\n\t\t\t\t<i class=\"fa fa-plus\"></i>\r\n\t\t\t</button>\r\n\t\t</span>\r\n\t\t</div>\r\n\t</div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/dateFilter/dateFilter.component", ["moment", "typescript-angular-utilities", "./dateFilter.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var moment = $__require('moment');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  exports.componentName = 'rlDateFilter';
  exports.controllerName = 'rlDateFilterController';
  var DateOptions;
  (function(DateOptions) {
    DateOptions[DateOptions["Day"] = 0] = "Day";
    DateOptions[DateOptions["Week"] = 1] = "Week";
    DateOptions[DateOptions["Month"] = 2] = "Month";
  })(DateOptions || (DateOptions = {}));
  ;
  var DateFilterController = (function() {
    function DateFilterController($scope, dateUtility, $element) {
      var _this = this;
      this.$scope = $scope;
      this.dateUtility = dateUtility;
      this.$element = $element;
      this.count = 0;
      this.type = "days";
      this.filter.includeTime = this.includeTime;
      this.inputField = this.$element.find('rl-date-time input');
      this.filter.dateRange = false;
      if (this.clearButton == null)
        this.clearButton = true;
      $scope.$watch('filter.selectedDate1', function(date) {
        if (date == null) {
          _this.inputField.val('');
          _this.clearCount();
        }
        _this.filter.selectedDate1 = date;
        _this.refreshDataSource();
      });
    }
    Object.defineProperty(DateFilterController.prototype, "selectedDate2", {
      get: function() {
        return this.filter.selectedDate2;
      },
      set: function(date) {
        this.filter.selectedDate2 = date;
        this.refreshDataSource();
      },
      enumerable: true,
      configurable: true
    });
    DateFilterController.prototype.refreshDataSource = function() {
      if (this.source != null) {
        this.source.refresh();
      } else {
        this.$scope.$emit('dataSource.requestRefresh');
      }
    };
    DateFilterController.prototype.clearCount = function() {
      this.count = 0;
      this.countChange();
    };
    DateFilterController.prototype.decreaseCount = function() {
      this.count -= 1;
      this.setDateTimeNowIfNull();
      if (this.count < 0 || this.count === 0) {
        this.count = 0;
      }
      this.countChange();
    };
    DateFilterController.prototype.countChange = function() {
      if (this.count == null) {
        this.count = 0;
      }
      if (this.count > 0) {
        this.filter.dateRange = true;
        this.selectedDate2 = moment(this.selectedDate1).add((this.count * -1), this.type);
      } else if (this.count == 0) {
        if (this.filter.dateRange) {
          this.filter.dateRange = false;
          this.selectedDate2 = null;
        }
      }
    };
    DateFilterController.prototype.increaseCount = function() {
      this.count += 1;
      this.setDateTimeNowIfNull();
      this.countChange();
    };
    DateFilterController.prototype.setDateTimeNowIfNull = function() {
      if (this.selectedDate1 == null) {
        this.selectedDate1 = this.dateUtility.getNow();
      }
    };
    DateFilterController.prototype.toggle = function() {
      if (this.type === 'days') {
        this.type = 'weeks';
      } else {
        this.type = 'days';
      }
      this.countChange();
    };
    DateFilterController.$inject = ['$scope', typescript_angular_utilities_1.downgrade.dateServiceName, '$element'];
    return DateFilterController;
  }());
  exports.DateFilterController = DateFilterController;
  exports.dateFilter = {
    template: $__require('./dateFilter.html'),
    controller: exports.controllerName,
    controllerAs: 'filter',
    bindings: {
      filter: '<',
      source: '<?',
      label: '@',
      includeTime: '<?',
      includeDateRange: '<?',
      clearButton: '<?'
    }
  };
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/dateFilter/dateFilter.module", ["angular", "typescript-angular-utilities", "./dateFilter.service", "./dateFilter.component"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var dateFilter_service_1 = $__require('./dateFilter.service');
  var dateFilter_component_1 = $__require('./dateFilter.component');
  exports.moduleName = 'rl.ui.components.cardContainer.filters.dateFilter';
  __export($__require('./dateFilter.service'));
  __export($__require('./dateFilter.component'));
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(dateFilter_service_1.factoryName, dateFilter_service_1.dateFilterFactory).component(dateFilter_component_1.componentName, dateFilter_component_1.dateFilter).controller(dateFilter_component_1.controllerName, dateFilter_component_1.DateFilterController);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/filters/columnSearchFilter/columnSearchFilter.service", ["angular", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  exports.moduleName = 'rl.ui.components.cardContainer.filters.columnSearchFilter';
  exports.factoryName = 'columnSearchFilter';
  exports.filterName = 'column-search';
  var ColumnSearchFilter = (function() {
    function ColumnSearchFilter(object, string) {
      this.object = object;
      this.string = string;
      this.type = exports.filterName;
    }
    ColumnSearchFilter.prototype.filter = function(item) {
      if (this.column == null) {
        return true;
      }
      var value = this.object.toString(__transform.getValue(item, this.column.getValue));
      var search = this.searchText;
      if (!this.caseSensitive) {
        search = search.toLowerCase();
        value = value.toLowerCase();
      }
      return this.string.contains(value, search);
    };
    return ColumnSearchFilter;
  }());
  exports.ColumnSearchFilter = ColumnSearchFilter;
  columnSearchFilterFactory.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.stringServiceName];
  function columnSearchFilterFactory(object, string) {
    'use strict';
    return {getInstance: function() {
        return new ColumnSearchFilter(object, string);
      }};
  }
  exports.columnSearchFilterFactory = columnSearchFilterFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, columnSearchFilterFactory);
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/cardContainerBuilder.service", ["lodash", "typescript-angular-utilities", "./dataSources/dataSources.module", "./filters/filterGroup/filterGroup.module", "./filters/selectFilter/selectFilter.module", "./filters/dateFilter/dateFilter.module", "./filters/columnSearchFilter/columnSearchFilter.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var dataSources = $__require('./dataSources/dataSources.module');
  var filterGroup = $__require('./filters/filterGroup/filterGroup.module');
  var selectFilter = $__require('./filters/selectFilter/selectFilter.module');
  var dateFilter = $__require('./filters/dateFilter/dateFilter.module');
  var columnSearchFilter_service_1 = $__require('./filters/columnSearchFilter/columnSearchFilter.service');
  exports.factoryName = 'cardContainerBuilder';
  var CardContainerBuilder = (function() {
    function CardContainerBuilder($injector) {
      this.$injector = $injector;
      this.dataSource = new DataSourceBuilder($injector, this);
      this.filters = new FilterBuilder($injector, this);
      this._columns = [];
    }
    CardContainerBuilder.prototype.useSearch = function(tokenized) {
      var factory = this.$injector.get(typescript_angular_utilities_1.downgrade.genericSearchFilterServiceName);
      this._searchFilter = factory.getInstance(tokenized);
      return this._searchFilter;
    };
    CardContainerBuilder.prototype.searchFilter = function(filter) {
      this._searchFilter = filter;
      return this._searchFilter;
    };
    CardContainerBuilder.prototype.usePaging = function() {
      this._paging = true;
    };
    CardContainerBuilder.prototype.addColumn = function(column) {
      this._columns.push(column);
    };
    CardContainerBuilder.prototype.useClickableCards = function() {
      this._clickableCards = true;
    };
    CardContainerBuilder.prototype.usePermanentFooters = function() {
      this._permanentFooters = true;
    };
    CardContainerBuilder.prototype.useSelection = function() {
      this._selectableCards = true;
    };
    CardContainerBuilder.prototype.renderFilters = function() {
      this._renderFilters = true;
    };
    CardContainerBuilder.prototype.saveWhenInvalid = function() {
      this._saveWhenInvalid = true;
    };
    Object.defineProperty(CardContainerBuilder.prototype, "disableSelection", {
      set: function(value) {
        if (!this._selectableCards) {
          this.useSelection();
        }
        this._disableSelection = value;
      },
      enumerable: true,
      configurable: true
    });
    CardContainerBuilder.prototype.setCardContainerProperties = function(cardContainer) {
      if (this._searchFilter != null) {
        this._filters.push(this._searchFilter);
      }
      cardContainer.source = this._dataSource;
      cardContainer.filters = this._filters;
      cardContainer.searchFilter = this._searchFilter;
      cardContainer.paging = this._paging;
      cardContainer.columns = this._columns;
      cardContainer.containerData = this.containerData;
      cardContainer.clickableCards = this._clickableCards;
      cardContainer.maxColumnSorts = this.maxColumnSorts;
      cardContainer.permanentFooters = this._permanentFooters;
      cardContainer.selectableCards = this._selectableCards;
      cardContainer.disableSelection = this._disableSelection;
      cardContainer.renderFilters = this._renderFilters;
      cardContainer.saveWhenInvalid = this._saveWhenInvalid;
      if (cardContainer.cardController == null) {
        cardContainer.cardController = this.cardController;
      }
      if (cardContainer.cardControllerAs == null) {
        cardContainer.cardControllerAs = this.cardControllerAs;
      }
      if (cardContainer.cardAs == null) {
        cardContainer.cardAs = this.cardAs;
      }
    };
    return CardContainerBuilder;
  }());
  exports.CardContainerBuilder = CardContainerBuilder;
  var DataSourceBuilder = (function() {
    function DataSourceBuilder($injector, parent) {
      this.$injector = $injector;
      this.parent = parent;
      var factory = this.$injector.get(dataSources.simpleDataSource.factoryName);
      parent._dataSource = factory.getInstance([]);
    }
    DataSourceBuilder.prototype.buildSimpleDataSource = function(data) {
      var factory = this.$injector.get(dataSources.simpleDataSource.factoryName);
      this.parent._dataSource = factory.getInstance(data);
      return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildDataServiceDataSource = function(getDataSet) {
      var factory = this.$injector.get(dataSources.dataServiceDataSource.factoryName);
      this.parent._dataSource = factory.getInstance(getDataSet);
      return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildClientServerDataSource = function(getDataSet, getFilterModel, validateModel) {
      if (_.isUndefined(this.parent._searchFilter)) {
        this.parent.useSearch();
      }
      var factory = this.$injector.get(dataSources.clientServerDataSource.factoryName);
      this.parent._dataSource = factory.getInstance(getDataSet, this.parent._searchFilter, getFilterModel, validateModel);
      return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildServerSideDataSource = function(getDataSet) {
      var factory = this.$injector.get(dataSources.serverSideDataSource.factoryName);
      this.parent._dataSource = factory.getInstance(getDataSet);
      return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildSmartDataSource = function(getDataSet) {
      var factory = this.$injector.get(dataSources.smartDataSource.factoryName);
      this.parent._dataSource = factory.getInstance(getDataSet);
      return this.parent._dataSource;
    };
    DataSourceBuilder.prototype.buildCustomDataSource = function(dataSource) {
      this.parent._dataSource = dataSource;
      return this.parent._dataSource;
    };
    return DataSourceBuilder;
  }());
  exports.DataSourceBuilder = DataSourceBuilder;
  var FilterBuilder = (function() {
    function FilterBuilder($injector, parent) {
      this.$injector = $injector;
      this.parent = parent;
      this.parent._filters = [];
    }
    FilterBuilder.prototype.buildFilterGroup = function(settings) {
      var factory = this.$injector.get(filterGroup.factoryName);
      var filter = factory.getInstance(settings);
      this.parent._filters.push(filter);
      return filter;
    };
    FilterBuilder.prototype.buildModeFilterGroup = function(settings) {
      var factory = this.$injector.get(filterGroup.modeFilterGroup.factoryName);
      var filter = factory.getInstance(settings);
      this.parent._filters.push(filter);
      return filter;
    };
    FilterBuilder.prototype.buildRangeFilterGroup = function(settings) {
      var factory = this.$injector.get(filterGroup.rangeFilterGroup.factoryName);
      var filter = factory.getInstance(settings);
      this.parent._filters.push(filter);
      return filter;
    };
    FilterBuilder.prototype.buildSelectFilter = function(settings) {
      var factory = this.$injector.get(selectFilter.factoryName);
      var filter = factory.getInstance(settings);
      this.parent._filters.push(filter);
      return filter;
    };
    FilterBuilder.prototype.buildDateFilter = function(settings) {
      var factory = this.$injector.get(dateFilter.factoryName);
      var filter = factory.getInstance(settings);
      this.parent._filters.push(filter);
      return filter;
    };
    FilterBuilder.prototype.buildColumnSearchFilter = function() {
      var factory = this.$injector.get(columnSearchFilter_service_1.factoryName);
      var filter = factory.getInstance();
      this.parent._filters.push(filter);
      return filter;
    };
    FilterBuilder.prototype.addCustomFilter = function(filter) {
      this.parent._filters.push(filter);
    };
    return FilterBuilder;
  }());
  exports.FilterBuilder = FilterBuilder;
  cardContainerBuilderFactory.$inject = ['$injector'];
  function cardContainerBuilderFactory($injector) {
    return {
      useMock: false,
      getInstance: function() {
        return this.useMock ? this.mockBuilder : new CardContainerBuilder($injector);
      },
      mockBuilder: new CardContainerBuilder($injector)
    };
  }
  exports.cardContainerBuilderFactory = cardContainerBuilderFactory;
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/defaultCardContainerHeader.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"row\">\r\n\t<div class=\"col-xs-12 col-sm-9\">\r\n\t\t<rl-card-search></rl-card-search>\r\n\t</div>\r\n\t<div class=\"hidden-xs col-sm-3\">\r\n\t\t<rl-page-size></rl-page-size>\r\n\t</div>\r\n</div>\r\n";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/defaultCardContainerFooter.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"row\">\r\n\t<div ng-if=\"!cardContainer.selectableCards\" class=\"col-sm-6\">\r\n\t\t<rl-item-count></rl-item-count>\r\n\t</div>\r\n\t<span ng-if=\"cardContainer.selectableCards\">\r\n\t\t<div class=\"col-sm-3\">\r\n\t\t\t<rl-selection-control></rl-selection-control>\r\n\t\t</div>\r\n\t\t<div class=\"col-sm-3\">\r\n\t\t\t<rl-item-count></rl-item-count>\r\n\t\t</div>\r\n\t</span>\r\n\t<div class=\"col-sm-6\">\r\n\t\t<rl-pager class=\"pull-right\"></rl-pager>\r\n\t</div>\r\n</div>\r\n";
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/defaultComponents", ["./defaultCardContainerHeader.html", "./defaultCardContainerFooter.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.headerComponentName = 'rlDefaultCardContainerHeader';
  exports.footerComponentName = 'rlDefaultCardContainerFooter';
  exports.defaultContainerHeader = {template: $__require('./defaultCardContainerHeader.html')};
  exports.defaultContainerFooter = {template: $__require('./defaultCardContainerFooter.html')};
  return module.exports;
});

System.registerDynamic("components/components/cardContainer/cardContainer.module", ["angular", "typescript-angular-utilities", "../../services/parentChild/parentChild.service", "./card/card", "./cardSearch/cardSearch", "./columnHeader/columnHeader", "./dataSources/dataSources.module", "./filters/filters.module", "./itemCount/itemCount", "./pager/pager", "./pageSize/pageSize", "./selectionControl/selectionControl", "./sorts/sorts.module", "./cardContainer", "./cardContainerBuilder.service", "./defaultComponents"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var parentChild_service_1 = $__require('../../services/parentChild/parentChild.service');
  var card = $__require('./card/card');
  exports.card = card;
  var cardSearch = $__require('./cardSearch/cardSearch');
  exports.cardSearch = cardSearch;
  var columnHeader = $__require('./columnHeader/columnHeader');
  exports.columnHeader = columnHeader;
  var dataSources = $__require('./dataSources/dataSources.module');
  exports.dataSources = dataSources;
  var filters = $__require('./filters/filters.module');
  exports.filters = filters;
  var itemCount = $__require('./itemCount/itemCount');
  exports.itemCount = itemCount;
  var pager = $__require('./pager/pager');
  exports.pager = pager;
  var pageSize = $__require('./pageSize/pageSize');
  exports.pageSize = pageSize;
  var selectionControl = $__require('./selectionControl/selectionControl');
  exports.selectionControl = selectionControl;
  var sorts = $__require('./sorts/sorts.module');
  exports.sorts = sorts;
  var cardContainer_1 = $__require('./cardContainer');
  var builder = $__require('./cardContainerBuilder.service');
  exports.builder = builder;
  var defaultComponents_1 = $__require('./defaultComponents');
  __export($__require('./cardContainer'));
  exports.moduleName = 'rl.ui.components.cardContainer';
  angular.module(exports.moduleName, [dataSources.dataPager.moduleName, typescript_angular_utilities_1.downgrade.moduleName, parentChild_service_1.moduleName, card.moduleName, cardSearch.moduleName, columnHeader.moduleName, itemCount.moduleName, pager.moduleName, pageSize.moduleName, selectionControl.moduleName, dataSources.moduleName, filters.moduleName, sorts.moduleName]).component(cardContainer_1.componentName, cardContainer_1.cardContainer).controller(cardContainer_1.controllerName, cardContainer_1.CardContainerController).factory(builder.factoryName, builder.cardContainerBuilderFactory).component(defaultComponents_1.headerComponentName, defaultComponents_1.defaultContainerHeader).component(defaultComponents_1.footerComponentName, defaultComponents_1.defaultContainerFooter);
  return module.exports;
});

System.registerDynamic("components/components/checkbox/checkbox.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<span ng-click=\"checkbox.toggle()\" ng-transclude\r\n\t  ng-class=\"{ 'rl-checkbox': !checkbox.checked\r\n\t  , 'rl-checkbox-checked': checkbox.checked\r\n\t  , 'disabled': checkbox.ngDisabled\r\n\t  , 'default-theme': checkbox.useDefaultTheme }\"></span>";
  return module.exports;
});

System.registerDynamic("components/components/checkbox/checkbox", ["angular", "../componentsDefaultTheme", "./checkbox.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var componentsDefaultTheme_1 = $__require('../componentsDefaultTheme');
  exports.moduleName = 'rl.ui.components.checkbox';
  exports.componentName = 'rlCheckbox';
  exports.controllerName = 'CheckboxController';
  var CheckboxController = (function() {
    function CheckboxController(useDefaultTheme) {
      this.useDefaultTheme = useDefaultTheme;
    }
    Object.defineProperty(CheckboxController.prototype, "checked", {
      get: function() {
        return this.ngModel.$viewValue;
      },
      set: function(value) {
        this.ngModel.$setViewValue(value);
      },
      enumerable: true,
      configurable: true
    });
    CheckboxController.prototype.toggle = function() {
      if (this.active && !this.ngDisabled) {
        this.checked = !this.checked;
        this.onToggle({value: this.checked});
      }
    };
    CheckboxController.prototype.$onInit = function() {
      this.active = this.active != null ? this.active : true;
    };
    CheckboxController.$inject = [componentsDefaultTheme_1.defaultThemeValueName];
    return CheckboxController;
  }());
  exports.CheckboxController = CheckboxController;
  var checkbox = {
    require: {ngModel: 'ngModel'},
    transclude: true,
    template: $__require('./checkbox.html'),
    controller: exports.controllerName,
    controllerAs: 'checkbox',
    bindings: {
      ngDisabled: '<?',
      active: '<?',
      onToggle: '&'
    }
  };
  angular.module(exports.moduleName, []).component(exports.componentName, checkbox).controller(exports.controllerName, CheckboxController);
  return module.exports;
});

System.registerDynamic("components/components/commaList/commaList", ["angular", "lodash", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  exports.moduleName = 'rl.ui.components.commaList';
  exports.componentName = 'rlCommaList';
  exports.controllerName = 'CommaListController';
  var CommaListController = (function() {
    function CommaListController(object) {
      this.remainingItems = 0;
      this.list = this.getFirstItems(this.inList);
    }
    CommaListController.prototype.getFirstItems = function(list) {
      var _this = this;
      if (this.transform != null) {
        list = _.map(list, function(item) {
          return __transform.getValue(item, _this.transform);
        });
      }
      ;
      var newList;
      if (this.max != null) {
        newList = _.take(list, this.max);
        this.remainingItems = list.length - this.max;
      } else {
        newList = _.clone(list);
      }
      return newList;
    };
    CommaListController.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName];
    return CommaListController;
  }());
  exports.CommaListController = CommaListController;
  var commaList = {
    template: "\n\t\t<span>\n\t\t\t<span ng-repeat=\"item in commaList.list track by $index\">\n\t\t\t\t<span>{{item}}</span><span ng-hide=\"$last\">, </span>\n\t\t\t</span>\n\t\t\t<span ng-show=\"commaList.remainingItems > 0\">... {{commaList.remainingItems}} more items</span>\n\t\t</span>\n\t",
    controller: exports.controllerName,
    controllerAs: 'commaList',
    bindings: {
      inList: '<list',
      max: '<?',
      transform: '<?'
    }
  };
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).component(exports.componentName, commaList).controller(exports.controllerName, CommaListController);
  return module.exports;
});

(function() {
var define = System.amdDefine;
;
(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define("libraries/bootstrap-datetimepicker/bootstrap-datetimepicker", ["jquery", "moment"], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'), require('moment'));
  } else {
    if (!jQuery) {
      throw new Error('bootstrap-datetimepicker requires jQuery to be loaded first');
    }
    if (!moment) {
      throw new Error('bootstrap-datetimepicker requires moment.js to be loaded first');
    }
    factory(root.jQuery, moment);
  }
}(this, function($, moment) {
  'use strict';
  if (typeof moment === 'undefined') {
    throw new Error('momentjs is required');
  }
  var dpgId = 0,
      DateTimePicker = function(element, options) {
        var defaults = $.fn.datetimepicker.defaults,
            icons = {
              time: 'fa fa-clock-o',
              date: 'fa fa-calendar',
              up: 'fa fa-chevron-up',
              down: 'fa fa-chevron-down'
            },
            picker = this,
            errored = false,
            dDate,
            init = function() {
              var icon = false,
                  localeData,
                  rInterval;
              picker.options = $.extend({}, defaults, options);
              picker.options.icons = $.extend({}, icons, picker.options.icons);
              picker.element = $(element);
              dataToOptions();
              if (!(picker.options.pickTime || picker.options.pickDate)) {
                throw new Error('Must choose at least one picker');
              }
              picker.id = dpgId++;
              moment.locale(picker.options.language);
              picker.date = moment();
              picker.unset = false;
              picker.isInput = picker.element.is('input');
              picker.component = false;
              if (picker.element.hasClass('input-group')) {
                if (picker.element.find('.datepickerbutton').size() === 0) {
                  picker.component = picker.element.find('[class^="input-group-"]');
                } else {
                  picker.component = picker.element.find('.datepickerbutton');
                }
              }
              picker.format = picker.options.format;
              localeData = moment().localeData();
              if (!picker.format) {
                picker.format = (picker.options.pickDate ? localeData.longDateFormat('L') : '');
                if (picker.options.pickDate && picker.options.pickTime) {
                  picker.format += ' ';
                }
                picker.format += (picker.options.pickTime ? localeData.longDateFormat('LT') : '');
                if (picker.options.useSeconds) {
                  if (localeData.longDateFormat('LT').indexOf(' A') !== -1) {
                    picker.format = picker.format.split(' A')[0] + ':ss A';
                  } else {
                    picker.format += ':ss';
                  }
                }
              }
              picker.use24hours = (picker.format.toLowerCase().indexOf('a') < 0 && picker.format.indexOf('h') < 0);
              if (picker.component) {
                icon = picker.component.find('span');
              }
              if (picker.options.pickTime) {
                if (icon) {
                  icon.addClass(picker.options.icons.time);
                }
              }
              if (picker.options.pickDate) {
                if (icon) {
                  icon.removeClass(picker.options.icons.time);
                  icon.addClass(picker.options.icons.date);
                }
              }
              picker.options.widgetParent = typeof picker.options.widgetParent === 'string' && picker.options.widgetParent || picker.element.parents().filter(function() {
                return 'scroll' === $(this).css('overflow-y');
              }).get(0) || 'body';
              picker.widget = $(getTemplate()).appendTo(picker.options.widgetParent);
              picker.minViewMode = picker.options.minViewMode || 0;
              if (typeof picker.minViewMode === 'string') {
                switch (picker.minViewMode) {
                  case 'months':
                    picker.minViewMode = 1;
                    break;
                  case 'years':
                    picker.minViewMode = 2;
                    break;
                  default:
                    picker.minViewMode = 0;
                    break;
                }
              }
              picker.viewMode = picker.options.viewMode || 0;
              if (typeof picker.viewMode === 'string') {
                switch (picker.viewMode) {
                  case 'months':
                    picker.viewMode = 1;
                    break;
                  case 'years':
                    picker.viewMode = 2;
                    break;
                  default:
                    picker.viewMode = 0;
                    break;
                }
              }
              picker.viewMode = Math.max(picker.viewMode, picker.minViewMode);
              picker.options.disabledDates = indexGivenDates(picker.options.disabledDates);
              picker.options.enabledDates = indexGivenDates(picker.options.enabledDates);
              picker.startViewMode = picker.viewMode;
              picker.setMinDate(picker.options.minDate);
              picker.setMaxDate(picker.options.maxDate);
              fillDow();
              fillMonths();
              fillHours();
              fillMinutes();
              fillSeconds();
              update();
              showMode();
              if (!getPickerInput().prop('disabled')) {
                attachDatePickerEvents();
              }
              if (picker.options.defaultDate !== '' && getPickerInput().val() === '') {
                picker.setValue(picker.options.defaultDate);
              }
              if (picker.options.minuteStepping !== 1) {
                rInterval = picker.options.minuteStepping;
                picker.date.minutes((Math.round(picker.date.minutes() / rInterval) * rInterval) % 60).seconds(0);
              }
            },
            getPickerInput = function() {
              var input;
              if (picker.isInput) {
                return picker.element;
              }
              input = picker.element.find('.datepickerinput');
              if (input.size() === 0) {
                input = picker.element.find('input');
              } else if (!input.is('input')) {
                throw new Error('CSS class "datepickerinput" cannot be applied to non input element');
              }
              return input;
            },
            dataToOptions = function() {
              var eData;
              if (picker.element.is('input')) {
                eData = picker.element.data();
              } else {
                eData = picker.element.find('input').data();
              }
              if (eData.dateFormat !== undefined) {
                picker.options.format = eData.dateFormat;
              }
              if (eData.datePickdate !== undefined) {
                picker.options.pickDate = eData.datePickdate;
              }
              if (eData.datePicktime !== undefined) {
                picker.options.pickTime = eData.datePicktime;
              }
              if (eData.dateUseminutes !== undefined) {
                picker.options.useMinutes = eData.dateUseminutes;
              }
              if (eData.dateUseseconds !== undefined) {
                picker.options.useSeconds = eData.dateUseseconds;
              }
              if (eData.dateUsecurrent !== undefined) {
                picker.options.useCurrent = eData.dateUsecurrent;
              }
              if (eData.calendarWeeks !== undefined) {
                picker.options.calendarWeeks = eData.calendarWeeks;
              }
              if (eData.dateMinutestepping !== undefined) {
                picker.options.minuteStepping = eData.dateMinutestepping;
              }
              if (eData.dateMindate !== undefined) {
                picker.options.minDate = eData.dateMindate;
              }
              if (eData.dateMaxdate !== undefined) {
                picker.options.maxDate = eData.dateMaxdate;
              }
              if (eData.dateShowtoday !== undefined) {
                picker.options.showToday = eData.dateShowtoday;
              }
              if (eData.dateCollapse !== undefined) {
                picker.options.collapse = eData.dateCollapse;
              }
              if (eData.dateLanguage !== undefined) {
                picker.options.language = eData.dateLanguage;
              }
              if (eData.dateDefaultdate !== undefined) {
                picker.options.defaultDate = eData.dateDefaultdate;
              }
              if (eData.dateDisableddates !== undefined) {
                picker.options.disabledDates = eData.dateDisableddates;
              }
              if (eData.dateEnableddates !== undefined) {
                picker.options.enabledDates = eData.dateEnableddates;
              }
              if (eData.dateIcons !== undefined) {
                picker.options.icons = eData.dateIcons;
              }
              if (eData.dateUsestrict !== undefined) {
                picker.options.useStrict = eData.dateUsestrict;
              }
              if (eData.dateDirection !== undefined) {
                picker.options.direction = eData.dateDirection;
              }
              if (eData.dateSidebyside !== undefined) {
                picker.options.sideBySide = eData.dateSidebyside;
              }
              if (eData.dateDaysofweekdisabled !== undefined) {
                picker.options.daysOfWeekDisabled = eData.dateDaysofweekdisabled;
              }
            },
            place = function() {
              var position = 'absolute',
                  offset = picker.component ? picker.component.offset() : picker.element.offset(),
                  $window = $(window),
                  placePosition;
              picker.width = picker.component ? picker.component.outerWidth() : picker.element.outerWidth();
              offset.top = offset.top + picker.element.outerHeight();
              if (picker.options.direction === 'up') {
                placePosition = 'top';
              } else if (picker.options.direction === 'bottom') {
                placePosition = 'bottom';
              } else if (picker.options.direction === 'auto') {
                if (offset.top + picker.widget.height() > $window.height() + $window.scrollTop() && picker.widget.height() + picker.element.outerHeight() < offset.top) {
                  placePosition = 'top';
                } else {
                  placePosition = 'bottom';
                }
              }
              if (placePosition === 'top') {
                offset.bottom = $window.height() - offset.top + picker.element.outerHeight() + 3;
                picker.widget.addClass('top').removeClass('bottom');
              } else {
                offset.top += 1;
                offset.top += picker.options.elementHeight;
                picker.widget.addClass('bottom').removeClass('top');
              }
              if (picker.options.width !== undefined) {
                picker.widget.width(picker.options.width);
              }
              if (picker.options.orientation === 'left') {
                picker.widget.addClass('left-oriented');
                offset.left = offset.left - picker.widget.width() + 20;
              }
              if (isInFixed()) {
                position = 'fixed';
                offset.top -= $window.scrollTop();
                offset.left -= $window.scrollLeft();
              }
              if ($window.width() < offset.left + picker.widget.outerWidth()) {
                offset.right = $window.width() - offset.left - picker.width;
                offset.left = 'auto';
                picker.widget.addClass('pull-right');
              } else {
                offset.right = 'auto';
                picker.widget.removeClass('pull-right');
              }
              if (placePosition === 'top') {
                picker.widget.css({
                  position: position,
                  bottom: offset.bottom,
                  top: 'auto',
                  left: offset.left,
                  right: offset.right
                });
              } else {
                picker.widget.css({
                  position: position,
                  top: offset.top,
                  bottom: 'auto',
                  left: offset.left,
                  right: offset.right
                });
              }
            },
            notifyChange = function(oldDate, eventType) {
              if (moment(picker.date).isSame(moment(oldDate)) && !errored) {
                return;
              }
              errored = false;
              picker.element.trigger({
                type: 'dp.change',
                date: moment(picker.date),
                oldDate: moment(oldDate)
              });
              if (eventType !== 'change') {
                picker.element.change();
              }
            },
            notifyError = function(date) {
              errored = true;
              picker.element.trigger({
                type: 'dp.error',
                date: moment(date, picker.format, picker.options.useStrict)
              });
            },
            update = function(newDate) {
              moment.locale(picker.options.language);
              var dateStr = newDate;
              if (!dateStr) {
                dateStr = getPickerInput().val();
                if (dateStr) {
                  picker.date = moment(dateStr, picker.format, picker.options.useStrict);
                }
                if (!picker.date) {
                  picker.date = moment();
                }
              }
              picker.viewDate = moment(picker.date).startOf('month');
              fillDate();
              fillTime();
            },
            fillDow = function() {
              moment.locale(picker.options.language);
              var html = $('<tr>'),
                  weekdaysMin = moment.weekdaysMin(),
                  i;
              if (picker.options.calendarWeeks === true) {
                html.append('<th class="cw">#</th>');
              }
              if (moment().localeData()._week.dow === 0) {
                for (i = 0; i < 7; i++) {
                  html.append('<th class="dow">' + weekdaysMin[i] + '</th>');
                }
              } else {
                for (i = 1; i < 8; i++) {
                  if (i === 7) {
                    html.append('<th class="dow">' + weekdaysMin[0] + '</th>');
                  } else {
                    html.append('<th class="dow">' + weekdaysMin[i] + '</th>');
                  }
                }
              }
              picker.widget.find('.datepicker-days thead').append(html);
            },
            fillMonths = function() {
              moment.locale(picker.options.language);
              var html = '',
                  i,
                  monthsShort = moment.monthsShort();
              for (i = 0; i < 12; i++) {
                html += '<span class="month">' + monthsShort[i] + '</span>';
              }
              picker.widget.find('.datepicker-months td').append(html);
            },
            fillDate = function() {
              if (!picker.options.pickDate) {
                return;
              }
              moment.locale(picker.options.language);
              var year = picker.viewDate.year(),
                  month = picker.viewDate.month(),
                  startYear = picker.options.minDate.year(),
                  startMonth = picker.options.minDate.month(),
                  endYear = picker.options.maxDate.year(),
                  endMonth = picker.options.maxDate.month(),
                  currentDate,
                  prevMonth,
                  nextMonth,
                  html = [],
                  row,
                  clsName,
                  i,
                  days,
                  yearCont,
                  currentYear,
                  months = moment.months();
              picker.widget.find('.datepicker-days').find('.disabled').removeClass('disabled');
              picker.widget.find('.datepicker-months').find('.disabled').removeClass('disabled');
              picker.widget.find('.datepicker-years').find('.disabled').removeClass('disabled');
              picker.widget.find('.datepicker-days th:eq(1)').text(months[month] + ' ' + year);
              prevMonth = moment(picker.viewDate, picker.format, picker.options.useStrict).subtract(1, 'months');
              days = prevMonth.daysInMonth();
              prevMonth.date(days).startOf('week');
              if ((year === startYear && month <= startMonth) || year < startYear) {
                picker.widget.find('.datepicker-days th:eq(0)').addClass('disabled');
              }
              if ((year === endYear && month >= endMonth) || year > endYear) {
                picker.widget.find('.datepicker-days th:eq(2)').addClass('disabled');
              }
              nextMonth = moment(prevMonth).add(42, 'd');
              while (prevMonth.isBefore(nextMonth)) {
                if (prevMonth.weekday() === moment().startOf('week').weekday()) {
                  row = $('<tr>');
                  html.push(row);
                  if (picker.options.calendarWeeks === true) {
                    row.append('<td class="cw">' + prevMonth.week() + '</td>');
                  }
                }
                clsName = '';
                if (prevMonth.year() < year || (prevMonth.year() === year && prevMonth.month() < month)) {
                  clsName += ' old';
                } else if (prevMonth.year() > year || (prevMonth.year() === year && prevMonth.month() > month)) {
                  clsName += ' new';
                }
                if (prevMonth.isSame(moment({
                  y: picker.date.year(),
                  M: picker.date.month(),
                  d: picker.date.date()
                }))) {
                  clsName += ' active';
                }
                if (isInDisableDates(prevMonth, 'day') || !isInEnableDates(prevMonth)) {
                  clsName += ' disabled';
                }
                if (picker.options.showToday === true) {
                  if (prevMonth.isSame(moment(), 'day')) {
                    clsName += ' today';
                  }
                }
                if (picker.options.daysOfWeekDisabled) {
                  for (i = 0; i < picker.options.daysOfWeekDisabled.length; i++) {
                    if (prevMonth.day() === picker.options.daysOfWeekDisabled[i]) {
                      clsName += ' disabled';
                      break;
                    }
                  }
                }
                row.append('<td class="day' + clsName + '">' + prevMonth.date() + '</td>');
                currentDate = prevMonth.date();
                prevMonth.add(1, 'd');
                if (currentDate === prevMonth.date()) {
                  prevMonth.add(1, 'd');
                }
              }
              picker.widget.find('.datepicker-days tbody').empty().append(html);
              currentYear = picker.date.year();
              months = picker.widget.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');
              if (currentYear === year) {
                months.eq(picker.date.month()).addClass('active');
              }
              if (year - 1 < startYear) {
                picker.widget.find('.datepicker-months th:eq(0)').addClass('disabled');
              }
              if (year + 1 > endYear) {
                picker.widget.find('.datepicker-months th:eq(2)').addClass('disabled');
              }
              for (i = 0; i < 12; i++) {
                if ((year === startYear && startMonth > i) || (year < startYear)) {
                  $(months[i]).addClass('disabled');
                } else if ((year === endYear && endMonth < i) || (year > endYear)) {
                  $(months[i]).addClass('disabled');
                }
              }
              html = '';
              year = parseInt(year / 10, 10) * 10;
              yearCont = picker.widget.find('.datepicker-years').find('th:eq(1)').text(year + '-' + (year + 9)).parents('table').find('td');
              picker.widget.find('.datepicker-years').find('th').removeClass('disabled');
              if (startYear > year) {
                picker.widget.find('.datepicker-years').find('th:eq(0)').addClass('disabled');
              }
              if (endYear < year + 9) {
                picker.widget.find('.datepicker-years').find('th:eq(2)').addClass('disabled');
              }
              year -= 1;
              for (i = -1; i < 11; i++) {
                html += '<span class="year' + (i === -1 || i === 10 ? ' old' : '') + (currentYear === year ? ' active' : '') + ((year < startYear || year > endYear) ? ' disabled' : '') + '">' + year + '</span>';
                year += 1;
              }
              yearCont.html(html);
            },
            fillHours = function() {
              moment.locale(picker.options.language);
              var table = picker.widget.find('.timepicker .timepicker-hours table'),
                  html = '',
                  current,
                  i,
                  j;
              table.parent().hide();
              if (picker.use24hours) {
                current = 0;
                for (i = 0; i < 6; i += 1) {
                  html += '<tr>';
                  for (j = 0; j < 4; j += 1) {
                    html += '<td class="hour">' + padLeft(current.toString()) + '</td>';
                    current++;
                  }
                  html += '</tr>';
                }
              } else {
                current = 1;
                for (i = 0; i < 3; i += 1) {
                  html += '<tr>';
                  for (j = 0; j < 4; j += 1) {
                    html += '<td class="hour">' + padLeft(current.toString()) + '</td>';
                    current++;
                  }
                  html += '</tr>';
                }
              }
              table.html(html);
            },
            fillMinutes = function() {
              var table = picker.widget.find('.timepicker .timepicker-minutes table'),
                  html = '',
                  current = 0,
                  i,
                  j,
                  step = picker.options.minuteStepping;
              table.parent().hide();
              if (step === 1) {
                step = 5;
              }
              for (i = 0; i < Math.ceil(60 / step / 4); i++) {
                html += '<tr>';
                for (j = 0; j < 4; j += 1) {
                  if (current < 60) {
                    html += '<td class="minute">' + padLeft(current.toString()) + '</td>';
                    current += step;
                  } else {
                    html += '<td></td>';
                  }
                }
                html += '</tr>';
              }
              table.html(html);
            },
            fillSeconds = function() {
              var table = picker.widget.find('.timepicker .timepicker-seconds table'),
                  html = '',
                  current = 0,
                  i,
                  j;
              table.parent().hide();
              for (i = 0; i < 3; i++) {
                html += '<tr>';
                for (j = 0; j < 4; j += 1) {
                  html += '<td class="second">' + padLeft(current.toString()) + '</td>';
                  current += 5;
                }
                html += '</tr>';
              }
              table.html(html);
            },
            fillTime = function() {
              if (!picker.date) {
                return;
              }
              var timeComponents = picker.widget.find('.timepicker span[data-time-component]'),
                  hour = picker.date.hours(),
                  period = picker.date.format('A');
              if (!picker.use24hours) {
                if (hour === 0) {
                  hour = 12;
                } else if (hour !== 12) {
                  hour = hour % 12;
                }
                picker.widget.find('.timepicker [data-action=togglePeriod]').text(period);
              }
              timeComponents.filter('[data-time-component=hours]').text(padLeft(hour));
              timeComponents.filter('[data-time-component=minutes]').text(padLeft(picker.date.minutes()));
              timeComponents.filter('[data-time-component=seconds]').text(padLeft(picker.date.second()));
            },
            click = function(e) {
              e.stopPropagation();
              e.preventDefault();
              picker.unset = false;
              var target = $(e.target).closest('span, td, th'),
                  month,
                  year,
                  step,
                  day,
                  oldDate = moment(picker.date);
              if (target.length === 1) {
                if (!target.is('.disabled')) {
                  switch (target[0].nodeName.toLowerCase()) {
                    case 'th':
                      switch (target[0].className) {
                        case 'picker-switch':
                          showMode(1);
                          break;
                        case 'prev':
                        case 'next':
                          step = dpGlobal.modes[picker.viewMode].navStep;
                          if (target[0].className === 'prev') {
                            step = step * -1;
                          }
                          picker.viewDate.add(step, dpGlobal.modes[picker.viewMode].navFnc);
                          fillDate();
                          break;
                      }
                      break;
                    case 'span':
                      if (target.is('.month')) {
                        month = target.parent().find('span').index(target);
                        picker.viewDate.month(month);
                      } else {
                        year = parseInt(target.text(), 10) || 0;
                        picker.viewDate.year(year);
                      }
                      if (picker.viewMode === picker.minViewMode) {
                        picker.date = moment({
                          y: picker.viewDate.year(),
                          M: picker.viewDate.month(),
                          d: picker.viewDate.date(),
                          h: picker.date.hours(),
                          m: picker.date.minutes(),
                          s: picker.date.seconds()
                        });
                        set();
                        notifyChange(oldDate, e.type);
                      }
                      showMode(-1);
                      fillDate();
                      break;
                    case 'td':
                      if (target.is('.day')) {
                        day = parseInt(target.text(), 10) || 1;
                        month = picker.viewDate.month();
                        year = picker.viewDate.year();
                        if (target.is('.old')) {
                          if (month === 0) {
                            month = 11;
                            year -= 1;
                          } else {
                            month -= 1;
                          }
                        } else if (target.is('.new')) {
                          if (month === 11) {
                            month = 0;
                            year += 1;
                          } else {
                            month += 1;
                          }
                        }
                        picker.date = moment({
                          y: year,
                          M: month,
                          d: day,
                          h: picker.date.hours(),
                          m: picker.date.minutes(),
                          s: picker.date.seconds()
                        });
                        picker.viewDate = moment({
                          y: year,
                          M: month,
                          d: Math.min(28, day)
                        });
                        fillDate();
                        set();
                        notifyChange(oldDate, e.type);
                      }
                      break;
                  }
                }
              }
            },
            actions = {
              incrementHours: function() {
                checkDate('add', 'hours', 1);
              },
              incrementMinutes: function() {
                checkDate('add', 'minutes', picker.options.minuteStepping);
              },
              incrementSeconds: function() {
                checkDate('add', 'seconds', 1);
              },
              decrementHours: function() {
                checkDate('subtract', 'hours', 1);
              },
              decrementMinutes: function() {
                checkDate('subtract', 'minutes', picker.options.minuteStepping);
              },
              decrementSeconds: function() {
                checkDate('subtract', 'seconds', 1);
              },
              togglePeriod: function() {
                var hour = picker.date.hours();
                if (hour >= 12) {
                  hour -= 12;
                } else {
                  hour += 12;
                }
                picker.date.hours(hour);
              },
              showPicker: function() {
                picker.widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                picker.widget.find('.timepicker .timepicker-picker').show();
              },
              showHours: function() {
                picker.widget.find('.timepicker .timepicker-picker').hide();
                picker.widget.find('.timepicker .timepicker-hours').show();
              },
              showMinutes: function() {
                picker.widget.find('.timepicker .timepicker-picker').hide();
                picker.widget.find('.timepicker .timepicker-minutes').show();
              },
              showSeconds: function() {
                picker.widget.find('.timepicker .timepicker-picker').hide();
                picker.widget.find('.timepicker .timepicker-seconds').show();
              },
              selectHour: function(e) {
                var hour = parseInt($(e.target).text(), 10);
                if (!picker.use24hours) {
                  if (picker.date.hours() >= 12) {
                    if (hour !== 12) {
                      hour += 12;
                    }
                  } else {
                    if (hour === 12) {
                      hour = 0;
                    }
                  }
                }
                picker.date.hours(hour);
                actions.showPicker.call(picker);
              },
              selectMinute: function(e) {
                picker.date.minutes(parseInt($(e.target).text(), 10));
                actions.showPicker.call(picker);
              },
              selectSecond: function(e) {
                picker.date.seconds(parseInt($(e.target).text(), 10));
                actions.showPicker.call(picker);
              }
            },
            doAction = function(e) {
              var oldDate = moment(picker.date),
                  action = $(e.currentTarget).data('action'),
                  rv = actions[action].apply(picker, arguments);
              stopEvent(e);
              if (!picker.date) {
                picker.date = moment({y: 1970});
              }
              set();
              fillTime();
              notifyChange(oldDate, e.type);
              return rv;
            },
            stopEvent = function(e) {
              e.stopPropagation();
              e.preventDefault();
            },
            keydown = function(e) {
              if (e.keyCode === 27) {
                picker.hide();
              }
            },
            change = function(e) {
              moment.locale(picker.options.language);
              var input = $(e.target),
                  oldDate = moment(picker.date),
                  newDate = moment(input.val(), picker.format, picker.options.useStrict);
              if (newDate.isValid() && !isInDisableDates(newDate) && isInEnableDates(newDate)) {
                update();
                picker.setValue(newDate);
                notifyChange(oldDate, e.type);
                set();
              } else {
                picker.viewDate = oldDate;
                picker.unset = true;
                notifyChange(oldDate, e.type);
                notifyError(newDate);
              }
            },
            showMode = function(dir) {
              if (dir) {
                picker.viewMode = Math.max(picker.minViewMode, Math.min(2, picker.viewMode + dir));
              }
              picker.widget.find('.datepicker > div').hide().filter('.datepicker-' + dpGlobal.modes[picker.viewMode].clsName).show();
            },
            attachDatePickerEvents = function() {
              var $this,
                  $parent,
                  expanded,
                  closed,
                  collapseData;
              picker.widget.on('click', '.datepicker *', $.proxy(click, this));
              picker.widget.on('click', '[data-action]', $.proxy(doAction, this));
              picker.widget.on('mousedown', $.proxy(stopEvent, this));
              picker.element.on('keydown', $.proxy(keydown, this));
              if (picker.options.pickDate && picker.options.pickTime) {
                picker.widget.on('click.togglePicker', '.accordion-toggle', function(e) {
                  e.stopPropagation();
                  $this = $(this);
                  $parent = $this.closest('ul');
                  expanded = $parent.find('.in');
                  closed = $parent.find('.collapse:not(.in)');
                  if (expanded && expanded.length) {
                    collapseData = expanded.data('collapse');
                    if (collapseData && collapseData.transitioning) {
                      return;
                    }
                    expanded.collapse('hide');
                    closed.collapse('show');
                    $this.find('span').toggleClass(picker.options.icons.time + ' ' + picker.options.icons.date);
                    if (picker.component) {
                      picker.component.find('span').toggleClass(picker.options.icons.time + ' ' + picker.options.icons.date);
                    }
                  }
                });
              }
              if (picker.isInput) {
                picker.element.on({
                  'click': $.proxy(picker.show, this),
                  'focus': $.proxy(picker.show, this),
                  'change': $.proxy(change, this),
                  'blur': $.proxy(picker.hide, this)
                });
              } else {
                picker.element.on({'change': $.proxy(change, this)}, 'input');
                if (picker.component) {
                  picker.component.on('click', $.proxy(picker.show, this));
                  picker.component.on('mousedown', $.proxy(stopEvent, this));
                } else {
                  picker.element.on('click', $.proxy(picker.show, this));
                }
              }
              picker.widget.on('click.togglePicker', '#today-button', function(e) {
                if (picker.options.minuteStepping !== 1) {
                  var mDate = moment(),
                      rInterval = picker.options.minuteStepping;
                  mDate.minutes((Math.round(mDate.minutes() / rInterval) * rInterval) % 60).seconds(0);
                  picker.setValue(mDate.format(picker.format));
                } else {
                  picker.setValue(moment().format(picker.format));
                }
                notifyChange('', e.type);
                set();
              });
              picker.widget.on('click.togglePicker', '#clear-button', function(e) {
                picker.setValue(null);
                notifyChange('', e.type);
              });
              picker.widget.on('click.togglePicker', '#close-button', function(e) {
                picker.hide();
              });
            },
            attachDatePickerGlobalEvents = function() {
              $(window).on('resize.datetimepicker' + picker.id, $.proxy(place, this));
              if (!picker.isInput) {
                $(document).on('mousedown.datetimepicker' + picker.id, $.proxy(picker.hide, this));
              }
            },
            detachDatePickerEvents = function() {
              picker.widget.off('click', '.datepicker *', picker.click);
              picker.widget.off('click', '[data-action]');
              picker.widget.off('mousedown', picker.stopEvent);
              if (picker.options.pickDate && picker.options.pickTime) {
                picker.widget.off('click.togglePicker');
              }
              if (picker.isInput) {
                picker.element.off({
                  'focus': picker.show,
                  'change': change,
                  'click': picker.show,
                  'blur': picker.hide
                });
              } else {
                picker.element.off({'change': change}, 'input');
                if (picker.component) {
                  picker.component.off('click', picker.show);
                  picker.component.off('mousedown', picker.stopEvent);
                } else {
                  picker.element.off('click', picker.show);
                }
              }
            },
            detachDatePickerGlobalEvents = function() {
              $(window).off('resize.datetimepicker' + picker.id);
              if (!picker.isInput) {
                $(document).off('mousedown.datetimepicker' + picker.id);
              }
            },
            isInFixed = function() {
              if (picker.element) {
                var parents = picker.element.parents(),
                    inFixed = false,
                    i;
                for (i = 0; i < parents.length; i++) {
                  if ($(parents[i]).css('position') === 'fixed') {
                    inFixed = true;
                    break;
                  }
                }
                return inFixed;
              } else {
                return false;
              }
            },
            set = function() {
              moment.locale(picker.options.language);
              var formatted = '';
              if (!picker.unset) {
                formatted = moment(picker.date).format(picker.format);
              }
              getPickerInput().val(formatted);
              picker.element.data('date', formatted);
              if (!picker.options.pickTime) {
                picker.hide();
              }
            },
            checkDate = function(direction, unit, amount) {
              moment.locale(picker.options.language);
              var newDate;
              if (direction === 'add') {
                newDate = moment(picker.date);
                if (newDate.hours() === 23) {
                  newDate.add(amount, unit);
                }
                newDate.add(amount, unit);
              } else {
                newDate = moment(picker.date).subtract(amount, unit);
              }
              if (isInDisableDates(moment(newDate.subtract(amount, unit))) || isInDisableDates(newDate)) {
                notifyError(newDate.format(picker.format));
                return;
              }
              if (direction === 'add') {
                picker.date.add(amount, unit);
              } else {
                picker.date.subtract(amount, unit);
              }
              picker.unset = false;
            },
            isInDisableDates = function(date, timeUnit) {
              moment.locale(picker.options.language);
              var maxDate = moment(picker.options.maxDate, picker.format, picker.options.useStrict),
                  minDate = moment(picker.options.minDate, picker.format, picker.options.useStrict);
              if (timeUnit) {
                maxDate = maxDate.endOf(timeUnit);
                minDate = minDate.startOf(timeUnit);
              }
              if (date.isAfter(maxDate) || date.isBefore(minDate)) {
                return true;
              }
              if (picker.options.disabledDates === false) {
                return false;
              }
              return picker.options.disabledDates[date.format('YYYY-MM-DD')] === true;
            },
            isInEnableDates = function(date) {
              moment.locale(picker.options.language);
              if (picker.options.enabledDates === false) {
                return true;
              }
              return picker.options.enabledDates[date.format('YYYY-MM-DD')] === true;
            },
            indexGivenDates = function(givenDatesArray) {
              var givenDatesIndexed = {},
                  givenDatesCount = 0,
                  i;
              for (i = 0; i < givenDatesArray.length; i++) {
                if (moment.isMoment(givenDatesArray[i]) || givenDatesArray[i] instanceof Date) {
                  dDate = moment(givenDatesArray[i]);
                } else {
                  dDate = moment(givenDatesArray[i], picker.format, picker.options.useStrict);
                }
                if (dDate.isValid()) {
                  givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
                  givenDatesCount++;
                }
              }
              if (givenDatesCount > 0) {
                return givenDatesIndexed;
              }
              return false;
            },
            padLeft = function(string) {
              string = string.toString();
              if (string.length >= 2) {
                return string;
              }
              return '0' + string;
            },
            getTemplate = function() {
              var headTemplate = '<thead>' + '<tr>' + '<th class="prev">&lsaquo;</th><th colspan="' + (picker.options.calendarWeeks ? '6' : '5') + '" class="picker-switch"></th><th class="next">&rsaquo;</th>' + '</tr>' + '</thead>',
                  contTemplate = '<tbody><tr><td colspan="' + (picker.options.calendarWeeks ? '8' : '7') + '"></td></tr></tbody>',
                  template = '<div class="datepicker-days">' + '<table class="table-condensed">' + headTemplate + '<tbody></tbody></table>' + '</div>' + '<div class="datepicker-months">' + '<table class="table-condensed">' + headTemplate + contTemplate + '</table>' + '</div>' + '<div class="datepicker-years">' + '<table class="table-condensed">' + headTemplate + contTemplate + '</table>' + '</div>',
                  ret = '';
              if (picker.options.pickDate && picker.options.pickTime) {
                ret = '<div class="bootstrap-datetimepicker-widget' + (picker.options.sideBySide ? ' timepicker-sbs' : '') + (picker.use24hours ? ' usetwentyfour' : '') + ' dropdown-menu" style="z-index:9999 !important;">';
                if (picker.options.sideBySide) {
                  ret += '<div class="row">' + '<div class="col-sm-6 datepicker">' + template + '</div>' + '<div class="col-sm-6 timepicker">' + tpGlobal.getTemplate() + '</div>' + '</div>';
                } else {
                  ret += '<ul class="list-unstyled">' + '<li' + (picker.options.collapse ? ' class="collapse in"' : '') + '>' + '<div class="datepicker">' + template + '</div>' + '</li>' + '<li>' + '<span class="btn-group" style="float:left; margin-left:4px">' + '<button class="btn btn-info"" id="today-button"> Now </button>' + '<button class="btn btn-danger" id="clear-button"> Clear </button>' + '</span>' + '<button class="btn btn-success" id="close-button" style="float:right; margin-right:4px;">Done</button>' + '<div style="clear:both; padding-bottom:5px;"></div>' + '</li>' + '<li' + (picker.options.collapse ? ' class="collapse"' : '') + '>' + '<div class="timepicker">' + tpGlobal.getTemplate() + '</div>' + '</li>' + '</ul>';
                }
                ret += '</div>';
                return ret;
              }
              if (picker.options.pickTime) {
                return ('<div class="bootstrap-datetimepicker-widget dropdown-menu">' + '<div class="timepicker">' + tpGlobal.getTemplate() + '</div>' + '</div>');
              }
              return ('<div class="bootstrap-datetimepicker-widget dropdown-menu">' + '<div class="datepicker">' + template + '</div>' + '</div>');
            },
            dpGlobal = {modes: [{
                clsName: 'days',
                navFnc: 'month',
                navStep: 1
              }, {
                clsName: 'months',
                navFnc: 'year',
                navStep: 1
              }, {
                clsName: 'years',
                navFnc: 'year',
                navStep: 10
              }]},
            tpGlobal = {
              hourTemplate: '<span data-action="showHours"   data-time-component="hours"   class="timepicker-hour"></span>',
              minuteTemplate: '<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',
              secondTemplate: '<span data-action="showSeconds"  data-time-component="seconds" class="timepicker-second"></span>'
            };
        tpGlobal.getTemplate = function() {
          return ('<div class="timepicker-picker">' + '<table class="table-condensed">' + '<tr>' + '<td><a href="#" class="btn" data-action="incrementHours"><span class="' + picker.options.icons.up + '"></span></a></td>' + '<td class="separator"></td>' + '<td>' + (picker.options.useMinutes ? '<a href="#" class="btn" data-action="incrementMinutes"><span class="' + picker.options.icons.up + '"></span></a>' : '') + '</td>' + (picker.options.useSeconds ? '<td class="separator"></td><td><a href="#" class="btn" data-action="incrementSeconds"><span class="' + picker.options.icons.up + '"></span></a></td>' : '') + (picker.use24hours ? '' : '<td class="separator"></td>') + '<td></td>' + '</tr>' + '<tr>' + '<td>' + tpGlobal.hourTemplate + '</td> ' + '<td class="separator">:</td>' + '<td>' + (picker.options.useMinutes ? tpGlobal.minuteTemplate : '<span class="timepicker-minute">00</span>') + '</td> ' + (picker.options.useSeconds ? '<td class="separator">:</td><td>' + tpGlobal.secondTemplate + '</td>' : '') + (picker.use24hours ? '' : '<td class="separator"></td>' + '<td><button type="button" class="btn btn-primary" data-action="togglePeriod"></button></td>') + '</tr>' + '<tr>' + '<td><a href="#" class="btn" data-action="decrementHours"><span class="' + picker.options.icons.down + '"></span></a></td>' + '<td class="separator"></td>' + '<td>' + (picker.options.useMinutes ? '<a href="#" class="btn" data-action="decrementMinutes"><span class="' + picker.options.icons.down + '"></span></a>' : '') + '</td>' + (picker.options.useSeconds ? '<td class="separator"></td><td><a href="#" class="btn" data-action="decrementSeconds"><span class="' + picker.options.icons.down + '"></span></a></td>' : '') + (picker.use24hours ? '' : '<td class="separator"></td>') + '<td></td>' + '</tr>' + '</table>' + '</div>' + '<div class="timepicker-hours" data-action="selectHour">' + '<table class="table-condensed"></table>' + '</div>' + '<div class="timepicker-minutes" data-action="selectMinute">' + '<table class="table-condensed"></table>' + '</div>' + (picker.options.useSeconds ? '<div class="timepicker-seconds" data-action="selectSecond"><table class="table-condensed"></table></div>' : ''));
        };
        picker.destroy = function() {
          detachDatePickerEvents();
          detachDatePickerGlobalEvents();
          picker.widget.remove();
          picker.element.removeData('DateTimePicker');
          if (picker.component) {
            picker.component.removeData('DateTimePicker');
          }
        };
        picker.show = function(e) {
          if (getPickerInput().prop('disabled')) {
            return;
          }
          if (picker.options.useCurrent) {
            if (getPickerInput().val() === '') {
              if (picker.options.fillEmpty) {
                if (picker.options.minuteStepping !== 1) {
                  var mDate = moment(),
                      rInterval = picker.options.minuteStepping;
                  mDate.minutes((Math.round(mDate.minutes() / rInterval) * rInterval) % 60).seconds(0);
                  picker.setValue(mDate.format(picker.format));
                } else {
                  picker.setValue(moment().format(picker.format));
                }
                notifyChange('', e.type);
              }
            } else
              picker.setValue(getPickerInput().val());
          }
          if (e && e.type === 'click' && picker.isInput && picker.widget.hasClass('picker-open')) {
            return;
          }
          if (picker.widget.hasClass('picker-open')) {
            picker.widget.hide();
            picker.widget.removeClass('picker-open');
          } else {
            picker.widget.show();
            picker.widget.addClass('picker-open');
          }
          picker.height = picker.component ? picker.component.outerHeight() : picker.element.outerHeight();
          place();
          picker.element.trigger({
            type: 'dp.show',
            date: moment(picker.date)
          });
          attachDatePickerGlobalEvents();
          if (e) {
            stopEvent(e);
          }
        };
        picker.disable = function() {
          var input = getPickerInput();
          if (input.prop('disabled')) {
            return;
          }
          input.prop('disabled', true);
          detachDatePickerEvents();
        };
        picker.enable = function() {
          var input = getPickerInput();
          if (!input.prop('disabled')) {
            return;
          }
          input.prop('disabled', false);
          attachDatePickerEvents();
        };
        picker.hide = function() {
          var collapse = picker.widget.find('.collapse'),
              i,
              collapseData;
          for (i = 0; i < collapse.length; i++) {
            collapseData = collapse.eq(i).data('collapse');
            if (collapseData && collapseData.transitioning) {
              return;
            }
          }
          picker.widget.hide();
          picker.widget.removeClass('picker-open');
          picker.viewMode = picker.startViewMode;
          showMode();
          picker.element.trigger({
            type: 'dp.hide',
            date: moment(picker.date)
          });
          detachDatePickerGlobalEvents();
        };
        picker.setValue = function(newDate) {
          moment.locale(picker.options.language);
          if (!newDate) {
            picker.unset = true;
            set();
          } else {
            picker.unset = false;
          }
          if (!moment.isMoment(newDate)) {
            newDate = (newDate instanceof Date) ? moment(newDate) : moment(newDate, picker.format, picker.options.useStrict);
          } else {
            newDate = newDate.locale(picker.options.language);
          }
          if (newDate.isValid()) {
            picker.date = newDate;
            set();
            picker.viewDate = moment({
              y: picker.date.year(),
              M: picker.date.month()
            });
            fillDate();
            fillTime();
          } else {
            notifyError(newDate);
          }
        };
        picker.getDate = function() {
          if (picker.unset) {
            return null;
          }
          return moment(picker.date);
        };
        picker.setDate = function(date) {
          var oldDate = moment(picker.date);
          if (!date) {
            picker.setValue(null);
          } else {
            picker.setValue(date);
          }
          notifyChange(oldDate, 'function');
        };
        picker.setDisabledDates = function(dates) {
          picker.options.disabledDates = indexGivenDates(dates);
          if (picker.viewDate) {
            update();
          }
        };
        picker.setEnabledDates = function(dates) {
          picker.options.enabledDates = indexGivenDates(dates);
          if (picker.viewDate) {
            update();
          }
        };
        picker.setMaxDate = function(date) {
          if (date === undefined) {
            return;
          }
          if (moment.isMoment(date) || date instanceof Date) {
            picker.options.maxDate = moment(date);
          } else {
            picker.options.maxDate = moment(date, picker.format, picker.options.useStrict);
          }
          if (picker.viewDate) {
            update();
          }
        };
        picker.setMinDate = function(date) {
          if (date === undefined) {
            return;
          }
          if (moment.isMoment(date) || date instanceof Date) {
            picker.options.minDate = moment(date);
          } else {
            picker.options.minDate = moment(date, picker.format, picker.options.useStrict);
          }
          if (picker.viewDate) {
            update();
          }
        };
        init();
      };
  $.fn.datetimepicker = function(options) {
    return this.each(function() {
      var $this = $(this),
          data = $this.data('DateTimePicker');
      if (!data) {
        $this.data('DateTimePicker', new DateTimePicker(this, options));
      }
    });
  };
  $.fn.datetimepicker.defaults = {
    format: false,
    pickDate: true,
    pickTime: true,
    useMinutes: true,
    useSeconds: false,
    useCurrent: true,
    calendarWeeks: false,
    minuteStepping: 1,
    minDate: moment({y: 1900}),
    maxDate: moment().add(100, 'y'),
    showToday: true,
    collapse: false,
    language: moment.locale(),
    defaultDate: '',
    disabledDates: false,
    enabledDates: false,
    icons: {},
    useStrict: false,
    direction: 'auto',
    sideBySide: false,
    daysOfWeekDisabled: [],
    widgetParent: false,
    fillEmpty: false
  };
}));

})();
System.registerDynamic("libraries/bootstrap-datetimepicker/index", ["./bootstrap-datetimepicker"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('./bootstrap-datetimepicker');
  return module.exports;
});

System.registerDynamic("components/components/dateTime/dateTime.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"field date-time\" ng-class=\"{ 'has-warning': !dateTime.validFormat, 'error': dateTime.ngModel.$invalid, 'datepicker-with-clear': dateTime.clearButton }\">\r\n\t<span class=\"show-date-picker\">\r\n\t\t<label class=\"label-slide angular-animate\" ng-show=\"dateTime.ngModel.$viewValue | isEmpty:false && dateTime.label\">{{dateTime.label}}</label>\r\n\t\t<input type=\"text\" class=\"form-control\" ng-model=\"dateTime.ngModel.$viewValue\" placeholder=\"{{dateTime.label}}\"/>\r\n\t\t<span class=\"input-group-btn\">\r\n\t\t\t<button class=\"btn btn-default\" ng-click=\"toggle()\"><i class=\"fa fa-calendar\"></i></button>\r\n\t\t</span>\r\n\t\t<span class=\"timezone\" ng-if=\"dateTime.useDate\">{{dateTime.timezone.display}}</span>\r\n\t</span>\r\n\t<span class=\"datepicker-clear\" ng-if=\"::dateTime.clearButton\">\r\n\t\t<button type=\"button\" class=\"btn btn-default\"  ng-disabled=\"dateTime.ngModel.$viewValue | isEmpty\" ng-click=\"dateTime.onClearClick()\" >\r\n\t\t\t<i class=\"fa fa-times\"></i>\r\n\t\t</button>\r\n\t</span>\r\n\t<span class=\"error-string angular-animate\" ng-if=\"dateTime.inputValidator.error | isEmpty:false\">{{dateTime.inputValidator.error}}</span>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/dateTime/dateTime", ["../../../libraries/bootstrap-datetimepicker/index", "angular", "moment", "lodash", "typescript-angular-utilities", "../input/input", "../../services/componentValidator/componentValidator.service", "./dateTime.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  $__require('../../../libraries/bootstrap-datetimepicker/index');
  var angular = $__require('angular');
  var moment = $__require('moment');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __dateTimeFormatStrings = typescript_angular_utilities_1.services.date;
  var __object = typescript_angular_utilities_1.services.object;
  var __timezone = typescript_angular_utilities_1.services.timezone;
  var input_1 = $__require('../input/input');
  var componentValidator_service_1 = $__require('../../services/componentValidator/componentValidator.service');
  exports.moduleName = 'rl.ui.components.dateTime';
  exports.componentName = 'rlDateTime';
  exports.controllerName = 'DateTimeController';
  var DateTimeController = (function(_super) {
    __extends(DateTimeController, _super);
    function DateTimeController($scope, $attrs, componentValidatorFactory, $element) {
      _super.call(this, $scope, $attrs, componentValidatorFactory);
      this.$element = $element;
      this.inputType = 'date-time';
      this.useDate = _.isUndefined(this.useDate) ? true : this.useDate;
      this.useTime = _.isUndefined(this.useTime) ? true : this.useTime;
    }
    DateTimeController.prototype.onClearClick = function() {
      this.ngModel.$setViewValue(null);
      this.onClearEvent();
    };
    DateTimeController.prototype.$postLink = function() {
      var _this = this;
      var defaults = this.$element.datetimepicker.defaults;
      var min = this.min != null ? this.min : defaults.minDate;
      var max = this.max != null ? this.max : defaults.maxDate;
      this.setValidity(this.ngModel.$viewValue);
      this.ngModel.$formatters.push(function(value) {
        if (value == null) {
          _this.timezone = __timezone.timezoneService.currentTimezone;
          return null;
        }
        var date = moment(value);
        _this.setValidity(date);
        _this.timezone = __timezone.timezones.get(date.tz());
        return date.format(_this.getFormatOrDefault());
      });
      this.ngModel.$parsers.push(function(value) {
        if (__object.objectUtility.isNullOrEmpty(value)) {
          return null;
        }
        var newMoment = __timezone.timezoneService.buildMomentWithTimezone(value, _this.timezone, _this.getFormatOrDefault());
        _this.setValidity(newMoment);
        return newMoment;
      });
      this.$element.find('.show-date-picker').datetimepicker({
        stepping: this.minuteStepping || 1,
        format: this.getFormatOrDefault(),
        direction: 'bottom',
        elementHeight: 2,
        pickDate: this.useDate,
        pickTime: this.useTime,
        minDate: min,
        maxDate: max
      }).on('change.dp', function() {
        var newValue = _this.$element.find('input').val();
        _this.ngModel.$setViewValue(newValue);
        _this.$scope.$apply();
      });
    };
    DateTimeController.prototype.getFormatOrDefault = function() {
      return this.format || this.defaultFormat(this.useDate, this.useTime);
    };
    DateTimeController.prototype.defaultFormat = function(hasDate, hasTime) {
      if (hasDate && hasTime) {
        return __dateTimeFormatStrings.defaultFormats.dateTimeFormat;
      } else if (hasDate) {
        return __dateTimeFormatStrings.defaultFormats.dateFormat;
      } else if (hasTime) {
        return __dateTimeFormatStrings.defaultFormats.timeFormat;
      } else {
        return false;
      }
    };
    DateTimeController.prototype.setValidity = function(date) {
      this.validFormat = __object.objectUtility.isNullOrEmpty(date) ? true : moment(date).isValid();
    };
    DateTimeController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName, '$element'];
    return DateTimeController;
  }(input_1.InputController));
  exports.DateTimeController = DateTimeController;
  var dateTime = input_1.buildInput({
    template: $__require('./dateTime.html'),
    controller: exports.controllerName,
    controllerAs: 'dateTime',
    bindings: {
      minuteStepping: '<?',
      useDate: '<?',
      useTime: '<?',
      min: '<?',
      max: '<?',
      clearButton: '<?',
      onClearEvent: '&'
    }
  });
  angular.module(exports.moduleName, [input_1.moduleName]).component(exports.componentName, dateTime).controller(exports.controllerName, DateTimeController);
  return module.exports;
});

System.registerDynamic("components/components/dateTimeStatic/dateTimeStatic.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<span class=\"rl-date-time-static\">{{view.dateValue | rlDate:view.includeTime}}</span>";
  return module.exports;
});

System.registerDynamic("components/components/dateTimeStatic/dateTimeStatic", ["angular", "./dateTimeStatic.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.components.dateTimeStatic';
  exports.componentName = 'rlDateTimeStatic';
  var dateTimeStaticComponent = {
    template: $__require('./dateTimeStatic.html'),
    controllerAs: 'view',
    bindings: {
      dateValue: '<',
      includeTime: '<?'
    }
  };
  angular.module(exports.moduleName, []).component(exports.componentName, dateTimeStaticComponent);
  return module.exports;
});

System.registerDynamic("components/components/form/form", ["angular", "../../services/parentChild/parentChild.service", "../../services/autosave/autosave.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var parentChild_service_1 = $__require('../../services/parentChild/parentChild.service');
  var autosave_service_1 = $__require('../../services/autosave/autosave.service');
  exports.moduleName = 'rl.ui.components.form';
  exports.componentName = 'rlForm';
  exports.controllerName = 'rlFormController';
  var FormController = (function() {
    function FormController($element, $scope, $timeout, $q, autosaveFactory, parentChild) {
      this.$element = $element;
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.$q = $q;
      this.autosaveFactory = autosaveFactory;
      this.parentChild = parentChild;
    }
    FormController.prototype.$onInit = function() {
      var _this = this;
      this.$timeout(function() {
        _this.form = _this.$scope.rlForm;
        _this.autosave = _this.autosaveFactory.getInstance({
          save: _this.saveForm.bind(_this),
          contentForm: _this.$scope.rlForm,
          triggers: 'none'
        });
        _this.parentChild.registerChildBehavior(_this.childLink, {save: _this.autosave.validateAndSave.bind(_this.autosave)});
      });
    };
    FormController.prototype.saveForm = function() {
      var _this = this;
      this.saving = true;
      return this.$q.when(this.save()).then(function() {
        _this.saving = false;
      }).catch(function() {
        _this.saving = false;
      });
    };
    FormController.$inject = ['$element', '$scope', '$timeout', '$q', autosave_service_1.factoryName, parentChild_service_1.serviceName];
    return FormController;
  }());
  exports.FormController = FormController;
  var form = {
    transclude: true,
    template: "<form ng-transclude name=\"rlForm\" ng-submit=\"controller.autosave.validateAndSave()\"></form>",
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {
      saving: '=?',
      save: '&',
      form: '=?',
      childLink: '=?'
    }
  };
  angular.module(exports.moduleName, [autosave_service_1.moduleName]).component(exports.componentName, form).controller(exports.controllerName, FormController);
  return module.exports;
});

System.registerDynamic("components/components/genericContainer/genericContainer", ["angular", "lodash", "typescript-angular-utilities", "../../services/jquery/jquery.service", "../../services/templateLoader/templateLoader.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var jquery_service_1 = $__require('../../services/jquery/jquery.service');
  var templateLoader_service_1 = $__require('../../services/templateLoader/templateLoader.service');
  exports.moduleName = 'rl.ui.components.genericContainer';
  exports.componentName = 'rlGenericContainer';
  exports.controllerName = 'GenericContainerController';
  var GenericContainerController = (function() {
    function GenericContainerController($element, $transclude, $compile, object, jquery, templateLoader) {
      this.$element = $element;
      this.$transclude = $transclude;
      this.$compile = $compile;
      this.object = object;
      this.jquery = jquery;
      this.templateLoader = templateLoader;
    }
    GenericContainerController.prototype.$onChanges = function(changes) {
      if (this.container && changes.selector) {
        var template = this.resolveTemplate(changes.selector.currentValue);
        this.swapTemplates(template);
      }
    };
    GenericContainerController.prototype.refresh = function() {
      var template = this.resolveTemplate(this.selector);
      this.swapTemplates(template);
    };
    GenericContainerController.prototype.resolveTemplate = function(type) {
      if (_.has(this.templates, type)) {
        return this.templates[type];
      } else {
        return this.default;
      }
    };
    GenericContainerController.prototype.$postLink = function() {
      this.initDefaults();
      this.container = this.$element.find('#container');
      var templateResult = this.templateLoader.loadTemplates(this.$transclude);
      this.templates = _.extend(this.templates, templateResult.templates);
      this.default = templateResult.default;
      this.templateScope = templateResult.transclusionScope;
      if (!this.default) {
        this.default = '<div></div>';
      }
      this.refresh();
    };
    GenericContainerController.prototype.initDefaults = function() {
      this.default = this.defaultTemplate;
      this.templates = this.configuredTemplates ? this.configuredTemplates : {};
    };
    GenericContainerController.prototype.swapTemplates = function(template) {
      var content = angular.element(template);
      this.jquery.replaceContent(this.container, content);
      this.$compile(content)(this.templateScope);
    };
    GenericContainerController.$inject = ['$element', '$transclude', '$compile', typescript_angular_utilities_1.downgrade.objectServiceName, jquery_service_1.serviceName, templateLoader_service_1.serviceName];
    return GenericContainerController;
  }());
  exports.GenericContainerController = GenericContainerController;
  var genericContainer = {
    template: '<div id="container"></div>',
    transclude: true,
    controller: exports.controllerName,
    controllerAs: 'genericContainer',
    bindings: {
      selector: '<',
      configuredTemplates: '<templates',
      defaultTemplate: '<'
    }
  };
  angular.module(exports.moduleName, [jquery_service_1.moduleName, typescript_angular_utilities_1.downgrade.moduleName, templateLoader_service_1.moduleName]).component(exports.componentName, genericContainer).controller(exports.controllerName, GenericContainerController);
  return module.exports;
});

System.registerDynamic("components/components/lazyLoad/lazyLoad", ["angular"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.components.lazyLoad';
  exports.componentName = 'rlLazyLoad';
  exports.controllerName = 'LazyLoadController';
  var LazyLoadController = (function() {
    function LazyLoadController() {
      this.init = false;
    }
    LazyLoadController.prototype.$onInit = function() {
      this.init = this.show;
    };
    LazyLoadController.prototype.$onChanges = function(changes) {
      if (!this.init && changes.show && changes.show.currentValue) {
        this.init = true;
      }
    };
    return LazyLoadController;
  }());
  exports.LazyLoadController = LazyLoadController;
  var lazyLoad = {
    transclude: true,
    template: "\n\t\t<div ng-if=\"lazyLoad.init\">\n\t\t\t<div ng-show=\"lazyLoad.show\">\n\t\t\t\t<div ng-transclude></div>\n\t\t\t</div>\n\t\t</div>\n\t",
    controller: exports.controllerName,
    controllerAs: 'lazyLoad',
    bindings: {show: '<'}
  };
  angular.module(exports.moduleName, []).component(exports.componentName, lazyLoad).controller(exports.controllerName, LazyLoadController);
  return module.exports;
});

System.registerDynamic("components/components/button/button.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<button type=\"button\" class=\"btn {{::button.types}} {{::button.configuredSize}}\" ng-click=\"button.action()\" ng-disabled=\"button.ngDisabled\">\r\n\t<span ng-transclude></span>\r\n</button>";
  return module.exports;
});

System.registerDynamic("components/components/button/button", ["lodash", "angular", "./button.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.components.button';
  exports.componentName = 'rlButton';
  exports.controllerName = 'ButtonController';
  var ButtonController = (function() {
    function ButtonController() {
      this.type = this.type != null ? this.type : 'default';
      this.configuredSize = this.size != null && this.size !== '' ? 'btn-' + this.size : null;
    }
    Object.defineProperty(ButtonController.prototype, "types", {
      get: function() {
        var typesList = this.type.split(' ');
        typesList.forEach(function(type, index) {
          if (type.indexOf('btn-') === -1) {
            type = 'btn-' + type;
          }
          typesList[index] = type;
        });
        return typesList.join(' ');
      },
      enumerable: true,
      configurable: true
    });
    return ButtonController;
  }());
  exports.ButtonController = ButtonController;
  var button = {
    transclude: true,
    template: $__require('./button.html'),
    bindings: {
      action: '&',
      type: '@',
      ngDisabled: '<?',
      size: '@'
    },
    controller: exports.controllerName,
    controllerAs: 'button'
  };
  function buildButton(options) {
    var clone = _.clone(button);
    clone.require = options.require;
    clone.transclude = options.transclude != null ? options.transclude : clone.transclude;
    clone.template = options.template;
    clone.controller = options.controller || clone.controller;
    clone.controllerAs = options.controllerAs || clone.controllerAs;
    clone.bindings = _.assign({}, clone.bindings, options.bindings);
    _.each(clone.bindings, function(binding, key) {
      if (binding == null) {
        delete clone.bindings[key];
      }
    });
    return clone;
  }
  exports.buildButton = buildButton;
  angular.module(exports.moduleName, []).component(exports.componentName, button).controller(exports.controllerName, ButtonController);
  return module.exports;
});

System.registerDynamic("components/components/buttonAsync/buttonAsync.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<button type=\"button\" class=\"btn {{::button.types}} {{::button.configuredSize}}\" ng-click=\"button.trigger()\" ng-disabled=\"button.busy || button.ngDisabled\">\r\n\t<rl-busy ng-if=\"::button.rightAligned\" loading=\"button.busy\"></rl-busy>\r\n\t<span ng-transclude></span>\r\n\t<rl-busy ng-if=\"::!button.rightAligned\" loading=\"button.busy\"></rl-busy>\r\n</button>";
  return module.exports;
});

System.registerDynamic("components/components/buttonAsync/buttonAsync", ["angular", "lodash", "../../services/promise/promise.service", "../button/button", "./buttonAsync.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var promise_service_1 = $__require('../../services/promise/promise.service');
  var button_1 = $__require('../button/button');
  exports.moduleName = 'rl.ui.components.buttonAsync';
  exports.componentName = 'rlButtonAsync';
  exports.controllerName = 'ButtonAsyncController';
  var ButtonAsyncController = (function(_super) {
    __extends(ButtonAsyncController, _super);
    function ButtonAsyncController(promiseUtility) {
      _super.call(this);
      this.promiseUtility = promiseUtility;
    }
    ButtonAsyncController.prototype.trigger = function() {
      var _this = this;
      if (!this.busy) {
        this.busy = true;
        var result = this.action();
        if (this.promiseUtility.isPromise(result) && _.isFunction(result.finally)) {
          result.finally(function() {
            _this.busy = false;
          });
        } else if (result !== true) {
          this.busy = false;
        }
      }
    };
    ButtonAsyncController.$inject = [promise_service_1.serviceName];
    return ButtonAsyncController;
  }(button_1.ButtonController));
  exports.ButtonAsyncController = ButtonAsyncController;
  var buttonAsync = button_1.buildButton({
    template: $__require('./buttonAsync.html'),
    bindings: {
      busy: '<?',
      rightAligned: '<?'
    },
    controller: exports.controllerName
  });
  angular.module(exports.moduleName, [promise_service_1.moduleName]).component(exports.componentName, buttonAsync).controller(exports.controllerName, ButtonAsyncController);
  return module.exports;
});

System.registerDynamic("components/components/longClickButton/longClickButton.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<button class=\"btn btn-long-click {{button.types}} {{button.configuredSize}}\"\r\n\t\tng-mousedown=\"button.startAction()\" ng-mouseleave=\"button.stopAction()\" ng-mouseup=\"button.stopAction()\"\r\n\t\tng-disabled=\"button.busy || button.ngDisabled\">\r\n\t<rl-busy loading=\"button.busy\" ng-if=\"button.rightAligned\"></rl-busy>\r\n\t<span ng-transclude class=\"long-click-text\">\r\n\t\t<i ng-show=\"button.icon != null\" class=\"fa fa-{{button.icon}}\"></i> {{button.text}}\r\n\t</span>\r\n\t<rl-busy loading=\"button.busy\" ng-if=\"!button.rightAligned\"></rl-busy>\r\n\t<div class=\"long-click-progress\"></div>\r\n</button>";
  return module.exports;
});

System.registerDynamic("components/components/longClickButton/longClickButton", ["angular", "typescript-angular-utilities", "../../services/promise/promise.service", "../button/button", "../buttonAsync/buttonAsync", "./longClickButton.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var promise_service_1 = $__require('../../services/promise/promise.service');
  var button_1 = $__require('../button/button');
  var buttonAsync_1 = $__require('../buttonAsync/buttonAsync');
  exports.moduleName = 'rl.ui.components.longClickButton';
  exports.componentName = 'rlLongClickButton';
  exports.controllerName = 'LongClickButtonController';
  var LongClickButtonController = (function(_super) {
    __extends(LongClickButtonController, _super);
    function LongClickButtonController($interval, $timeout, objectUtility, promise, notification) {
      _super.call(this, promise);
      this.$interval = $interval;
      this.$timeout = $timeout;
      this.objectUtility = objectUtility;
      this.notification = notification;
      this.duration = 2000;
    }
    LongClickButtonController.prototype.startAction = function() {
      var _this = this;
      if (this.active || this.busy) {
        return;
      }
      this.active = true;
      this.actionTimeout = this.$timeout(function() {
        _this.cleanup();
        _this.trigger();
      }, this.duration);
    };
    LongClickButtonController.prototype.stopAction = function() {
      if (this.active) {
        if (this.actionTimeout != null) {
          this.warn();
        }
        this.cleanup();
      }
    };
    LongClickButtonController.prototype.cleanup = function() {
      this.$timeout.cancel(this.actionTimeout);
      this.actionTimeout = null;
      this.active = false;
    };
    LongClickButtonController.prototype.warn = function() {
      var warning = this.warning || this.onShortClickText || 'Press and hold to complete this action';
      this.notification.warning(warning);
    };
    LongClickButtonController.$inject = ['$interval', '$timeout', typescript_angular_utilities_1.downgrade.objectServiceName, promise_service_1.serviceName, typescript_angular_utilities_1.downgrade.notificationServiceName];
    return LongClickButtonController;
  }(buttonAsync_1.ButtonAsyncController));
  exports.LongClickButtonController = LongClickButtonController;
  var longClickButton = button_1.buildButton({
    template: $__require('./longClickButton.html'),
    controller: exports.controllerName,
    bindings: {
      warning: '@',
      busy: '<?',
      rightAligned: '<?',
      onShortClickText: '@',
      icon: '@',
      text: '@'
    }
  });
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, promise_service_1.moduleName]).component(exports.componentName, longClickButton).controller(exports.controllerName, LongClickButtonController);
  return module.exports;
});

System.registerDynamic("components/components/messageLog/editedByPopover.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div>Last edited by: {{entry.lastUpdatedBy.name}}</div>\r\n<div>{{ entry.lastUpdatedDate | rlDate:true }}</div>";
  return module.exports;
});

System.registerDynamic("components/components/messageLog/messageLogEditDialog.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<rl-dialog autosave=\"true\">\r\n\t<rl-dialog-content>\r\n\t\t<ng-form name=\"noteForm\">\r\n\t\t\t<div class=\"form-group\">\r\n\t\t\t\t<rl-textbox ng-model=\"dialog.entry.message\" label=\"Message:\" maxlength=\"250\"></rl-textbox>\r\n\t\t\t</div>\r\n\t\t</ng-form>\r\n\t</rl-dialog-content>\r\n</rl-dialog>";
  return module.exports;
});

System.registerDynamic("components/components/messageLog/messageLog.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div>\r\n\t<rl-busy loading=\"log.loadingInitial\" size=\"2x\"></rl-busy>\r\n\t<div class=\"content-group\" ng-repeat=\"entry in log.messages\" rl-alias=\"entry as {{log.messageAs}}\" ng-class=\"{ 'system-note': entry.isSystemNote }\">\r\n\t\t<rl-generic-container selector=\"log.getEntrySelector(entry)\" templates=\"log.templates\">\r\n\t\t\t<template default>\r\n\t\t\t\t<div class=\"message-body\">\r\n\t\t\t\t\t<div class=\"message-content\">\r\n\t\t\t\t\t\t<div ng-bind-html=\"entry.message\"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<span class=\"message-button\" ng-if=\"log.canEditEntry(entry)\">\r\n\t\t\t\t\t\t<rl-button-async type=\"message-default flat\" action=\"log.editMessage(entry)\" size=\"xs\"><i class=\"fa fa-edit\"></i></rl-button-async>\r\n\t\t\t\t\t</span>\r\n\t\t\t\t\t<span class=\"message-button\" ng-if=\"log.canDeleteEntry(entry)\">\r\n\t\t\t\t\t\t<rl-button-async type=\"message-danger flat\" action=\"log.messageLog.deleteMessage(entry)\" size=\"xs\"><i class=\"fa fa-remove\"></i></rl-button-async>\r\n\t\t\t\t\t</span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"message-byline\">\r\n\t\t\t\t\t<div class=\"byline\">{{entry.createdBy.name}}</div>\r\n\t\t\t\t\t<div class=\"byline\">\r\n\t\t\t\t\t\t{{ entry.createdDate | rlDate:true }}\r\n\t\t\t\t\t\t<span  ng-if=\"entry.edited\" class=\"edited-note\" rl-popover=\"log.tooltipTemplate\" popover-trigger=\"mouseenter\">(edited)</span></div>\r\n\t\t\t\t</div>\r\n\t\t\t</template>\r\n\t\t</rl-generic-container>\r\n\t</div>\r\n\t<div class=\"content-group\" ng-if=\"(log.messages | isEmpty) && !log.loadingInitial\">No existing messages</div>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-xs-12\">\r\n\t\t\t<div class=\"text-center\">\r\n\t\t\t\t<rl-button-async action=\"log.getTop()\" ng-disabled=\"log.loading\" button-right-aligned=\"true\">\r\n\t\t\t\t\t<span ng-show=\"log.hasPreviousPage\">Top <i class=\"fa fa-caret-up\"></i></span>\r\n\t\t\t\t\t<span ng-hide=\"log.hasPreviousPage\"><i class=\"fa fa-refresh\"></i> Refresh</span>\r\n\t\t\t\t</rl-button-async>\r\n\t\t\t\t<rl-button-async ng-disabled=\"log.hasNextPage == false || log.loading\" action=\"log.getOlder()\">\r\n\t\t\t\t\tOlder <i class=\"fa fa-caret-right\"></i>\r\n\t\t\t\t</rl-button-async>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n";
  return module.exports;
});

System.registerDynamic("components/components/messageLog/messageLog.directive", ["lodash", "typescript-angular-utilities", "../../services/jquery/jquery.service", "./messageLog.service", "../../services/services.module", "../../services/templateLoader/templateLoader.service", "./editedByPopover.html", "./messageLogEditDialog.html", "./messageLog.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var jquery_service_1 = $__require('../../services/jquery/jquery.service');
  var messageLog_service_1 = $__require('./messageLog.service');
  var componentServices = $__require('../../services/services.module');
  var __dialog = componentServices.dialog;
  var templateLoader_service_1 = $__require('../../services/templateLoader/templateLoader.service');
  exports.directiveName = 'rlMessageLog';
  exports.controllerName = 'MessageLogController';
  (function(DeletePermissions) {
    DeletePermissions[DeletePermissions["deleteMine"] = 0] = "deleteMine";
    DeletePermissions[DeletePermissions["deleteAll"] = 1] = "deleteAll";
    DeletePermissions[DeletePermissions["deleteNone"] = 2] = "deleteNone";
  })(exports.DeletePermissions || (exports.DeletePermissions = {}));
  var DeletePermissions = exports.DeletePermissions;
  (function(EditPermissions) {
    EditPermissions[EditPermissions["editMine"] = 0] = "editMine";
    EditPermissions[EditPermissions["editAll"] = 1] = "editAll";
    EditPermissions[EditPermissions["editNone"] = 2] = "editNone";
  })(exports.EditPermissions || (exports.EditPermissions = {}));
  var EditPermissions = exports.EditPermissions;
  var MessageLogController = (function() {
    function MessageLogController(dialog, $scope, messageLogFactory) {
      var _this = this;
      this.dialog = dialog;
      this.messageLog = this.messageLogBinding || messageLogFactory.getInstance();
      $scope.$watch(function() {
        return _this.messageLog.visibleMessages;
      }, function(value) {
        _this.messages = value;
      });
      $scope.$watch(function() {
        return _this.messageLog.hasForwardMessages;
      }, function(value) {
        _this.hasNextPage = value;
      });
      $scope.$watch(function() {
        return _this.messageLog.hasBackwardMessages;
      }, function(value) {
        _this.hasPreviousPage = value;
      });
      $scope.$watch(function() {
        return _this.messageLog.busy;
      }, function(value) {
        if (!value) {
          _this.loading = false;
          _this.loadingInitial = false;
        } else {
          _this.loading = true;
        }
      });
      $scope.$watch(function() {
        return _this.service;
      }, function(service) {
        _this.messageLog.dataService = service;
        _this.loadingInitial = true;
      });
      this.messageLog.pageSize = this.pageSize != null ? this.pageSize : 8;
      this.tooltipTemplate = $__require('./editedByPopover.html');
    }
    MessageLogController.prototype.getEntrySelector = function(entry) {
      if (_.isString(this.selector)) {
        return entry[this.selector];
      } else if (_.isFunction(this.selector)) {
        return this.selector(entry);
      }
    };
    MessageLogController.prototype.getOlder = function() {
      return this.messageLog.getNextPage();
    };
    MessageLogController.prototype.getTop = function() {
      return this.messageLog.getTopPage();
    };
    MessageLogController.prototype.canDeleteEntry = function(entry) {
      if (entry.isSystemNote) {
        return false;
      }
      switch (this.canDelete) {
        case DeletePermissions.deleteAll:
          return true;
        case DeletePermissions.deleteMine:
          return (this.currentUser == null || this.currentUser.id === entry.createdBy.id);
        default:
          return false;
      }
    };
    MessageLogController.prototype.canEditEntry = function(entry) {
      if (entry.isSystemNote) {
        return false;
      }
      switch (this.canEdit) {
        case EditPermissions.editAll:
          return true;
        case EditPermissions.editMine:
          return (this.currentUser == null || this.currentUser.id === entry.createdBy.id);
        default:
          return false;
      }
    };
    MessageLogController.prototype.editMessage = function(entry) {
      var editedEntry = _.clone(entry);
      this.dialog.openForm({
        save: this.updateNote.bind(this),
        data: {
          entry: editedEntry,
          originalEntry: entry
        },
        template: $__require('./messageLogEditDialog.html')
      });
    };
    MessageLogController.prototype.updateNote = function(data) {
      return this.messageLog.updateMessage(data.entry);
    };
    MessageLogController.prototype.saveNote = function(data) {
      return this.messageLog.addMessage(data.entry);
    };
    MessageLogController.$inject = [__dialog.serviceName, '$scope', messageLog_service_1.factoryName];
    return MessageLogController;
  }());
  exports.MessageLogController = MessageLogController;
  messageLog.$inject = ['$interpolate', jquery_service_1.serviceName, templateLoader_service_1.serviceName, typescript_angular_utilities_1.downgrade.objectServiceName];
  function messageLog($interpolate, jquery, templateLoader, object) {
    'use strict';
    return {
      restrict: 'E',
      template: $__require('./messageLog.html'),
      transclude: true,
      controller: exports.controllerName,
      controllerAs: 'log',
      scope: {messageData: "="},
      bindToController: {
        service: '=',
        selector: '=',
        pageSize: '=',
        messageLogBinding: '=messageLog',
        messageAs: "@",
        currentUser: '=?',
        canDelete: '=?',
        canEdit: '=?'
      },
      link: function(scope, element, attributes, controller, transclude) {
        controller.templates = templateLoader.loadTemplates(transclude).templates;
      }
    };
  }
  exports.messageLog = messageLog;
  return module.exports;
});

System.registerDynamic("components/components/messageLog/messageLog.service", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.factoryName = 'messageLog';
  exports.defaultPageSize = 10;
  var MessageLog = (function() {
    function MessageLog() {
      this.currentStartingMessage = 0;
      this._hasForwardMessages = false;
      this._hasBackwardMessages = false;
      this._pageSize = exports.defaultPageSize;
    }
    Object.defineProperty(MessageLog.prototype, "pageSize", {
      get: function() {
        return this._pageSize;
      },
      set: function(value) {
        this._pageSize = value;
        this.updateCurrentPage();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(MessageLog.prototype, "hasForwardMessages", {
      get: function() {
        return this._hasForwardMessages;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(MessageLog.prototype, "hasBackwardMessages", {
      get: function() {
        return this._hasBackwardMessages;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(MessageLog.prototype, "dataService", {
      get: function() {
        return this._dataService;
      },
      set: function(value) {
        this._dataService = value;
        if (value != null) {
          this.visibleMessages = null;
          this.updateCurrentPage();
        }
      },
      enumerable: true,
      configurable: true
    });
    MessageLog.prototype.addMessage = function(message) {
      var _this = this;
      return this.dataService.saveMessage(message).then(function() {
        _this.getTopPage();
      });
    };
    MessageLog.prototype.updateMessage = function(message) {
      var _this = this;
      return this.dataService.updateMessage(message).then(function() {
        _this.getTopPage();
      });
    };
    MessageLog.prototype.deleteMessage = function(message) {
      var _this = this;
      return this.dataService.deleteMessage(message).then(function() {
        _this.refresh();
      });
    };
    MessageLog.prototype.getNextPage = function() {
      if (!this.hasForwardMessages) {
        return;
      }
      this.currentStartingMessage += this.pageSize;
      return this.updateCurrentPage();
    };
    MessageLog.prototype.getPreviousPage = function() {
      if (!this.hasBackwardMessages) {
        return;
      }
      this.currentStartingMessage -= this.pageSize;
      if (this.currentStartingMessage < 0) {
        this.currentStartingMessage = 0;
      }
      return this.updateCurrentPage();
    };
    MessageLog.prototype.getTopPage = function() {
      this.currentStartingMessage = 0;
      return this.updateCurrentPage();
    };
    MessageLog.prototype.refresh = function() {
      return this.updateCurrentPage();
    };
    MessageLog.prototype.updateCurrentPage = function() {
      var _this = this;
      if (this.dataService == null) {
        return null;
      }
      this.busy = true;
      return this.dataService.getMessages(this.currentStartingMessage, this.pageSize).then(function(result) {
        _this.visibleMessages = result.messages;
        _this._hasForwardMessages = result.hasMoreMessages;
        _this._hasBackwardMessages = (_this.currentStartingMessage > 0);
        _this.busy = false;
      });
    };
    return MessageLog;
  }());
  exports.MessageLog = MessageLog;
  function messageLogFactory() {
    'use strict';
    return {getInstance: function() {
        return new MessageLog();
      }};
  }
  exports.messageLogFactory = messageLogFactory;
  return module.exports;
});

System.registerDynamic("components/components/messageLog/editableMessageLog", ["typescript-angular-utilities", "./messageLog.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var messageLog_service_1 = $__require('./messageLog.service');
  exports.directiveName = 'rlEditableMessageLog';
  exports.controllerName = 'EditableMessageLogController';
  var EditableMessageLogController = (function() {
    function EditableMessageLogController($scope, messageLogFactory, object) {
      var _this = this;
      this.object = object;
      this.messageLogService = messageLogFactory.getInstance();
      $scope.$watch(function() {
        return _this.messageLogService.busy;
      }, function(value) {
        if (value === false) {
          _this.busy = false;
          _this.savingMessage = false;
        } else {
          _this.busy = true;
        }
      });
    }
    EditableMessageLogController.prototype.add = function() {
      if (this.object.isNullOrWhitespace(this.newMessage)) {
        return null;
      }
      this.savingMessage = true;
      var message = this.newMessage;
      this.newMessage = '';
      return this.messageLogService.addMessage({message: message});
    };
    EditableMessageLogController.$inject = ['$scope', messageLog_service_1.factoryName, typescript_angular_utilities_1.downgrade.objectServiceName];
    return EditableMessageLogController;
  }());
  exports.EditableMessageLogController = EditableMessageLogController;
  function editableMessageLog() {
    'use strict';
    return {
      restrict: 'E',
      template: "\n\t\t\t<form ng-submit=\"log.add()\">\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"log.newMessage\" placeholder=\"Enter log message\" />\n\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t<button class=\"btn btn-default\" type=\"submit\" ng-disabled=\"log.busy\">\n\t\t\t\t\t\t\t<rl-busy loading=\"log.savingMessage\"></rl-busy> Add\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"message-log\">\n\t\t\t\t\t<rl-message-log service=\"log.service\" page-size=\"log.pageSize\" message-log=\"log.messageLogService\"\n\t\t\t\t\t\t\t\t\tcurrent-user=\"log.currentUser\" can-delete=\"log.canDelete\"></rl-message-log>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t",
      controller: exports.controllerName,
      controllerAs: 'log',
      scope: {},
      bindToController: {
        service: '=',
        pageSize: '=',
        currentUser: '=?',
        canDelete: '=?'
      }
    };
  }
  exports.editableMessageLog = editableMessageLog;
  return module.exports;
});

System.registerDynamic("components/components/messageLog/messageLog.module", ["angular", "typescript-angular-utilities", "../../services/jquery/jquery.service", "./messageLog.service", "./messageLog.directive", "./editableMessageLog", "../../services/services.module", "../../services/templateLoader/templateLoader.service", "../../filters/date/date.filter"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var jquery_service_1 = $__require('../../services/jquery/jquery.service');
  var messageLog_service_1 = $__require('./messageLog.service');
  var messageLog_directive_1 = $__require('./messageLog.directive');
  var editableMessageLog_1 = $__require('./editableMessageLog');
  var componentServices = $__require('../../services/services.module');
  var __dialog = componentServices.dialog;
  var templateLoader_service_1 = $__require('../../services/templateLoader/templateLoader.service');
  var date_filter_1 = $__require('../../filters/date/date.filter');
  __export($__require('./messageLog.service'));
  __export($__require('./messageLog.directive'));
  exports.moduleName = 'rl.ui.components.messageLog';
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, jquery_service_1.moduleName, templateLoader_service_1.moduleName, __dialog.moduleName, date_filter_1.moduleName]).factory(messageLog_service_1.factoryName, messageLog_service_1.messageLogFactory).directive(messageLog_directive_1.directiveName, messageLog_directive_1.messageLog).controller(messageLog_directive_1.controllerName, messageLog_directive_1.MessageLogController).directive(editableMessageLog_1.directiveName, editableMessageLog_1.editableMessageLog).controller(editableMessageLog_1.controllerName, editableMessageLog_1.EditableMessageLogController);
  return module.exports;
});

System.registerDynamic("components/components/multiStepIndicator/multiStepIndicator.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"multi-step checked\" ng-class=\"{ 'numbered': breadcrumb.numbered }\">\r\n\t<ol>\r\n\t\t<li ng-repeat=\"step in breadcrumb.steps\" ng-click=\"breadcrumb.onClick(step)\"\r\n\t\t\tng-class=\"{ 'completed': step.getCompleted(), 'current': step.isCurrent, 'active': !step.inactive && !breadcrumb.anyLoading() }\">\r\n\t\t\t<div class=\"wrap\">\r\n\t\t\t\t<p class=\"badge\" ng-show=\"step.hasCount\">{{step.count()}}</p>\r\n\t\t\t\t<p class=\"error\" ng-if=\"!step.getValid()\"></p>\r\n\t\t\t\t<p class=\"title\">{{step.title}} <rl-busy loading=\"step.loading\"></rl-busy></p>\r\n\t\t\t\t<p class=\"subtitle\">{{step.subtitle}}</p>\r\n\t\t\t</div>\r\n\t\t</li>\r\n\t</ol>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/multiStepIndicator/multiStepIndicator", ["angular", "lodash", "typescript-angular-utilities", "./multiStepIndicator.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  exports.moduleName = 'rl.ui.components.multiStepIndicator';
  exports.componentName = 'rlMultiStepIndicator';
  exports.controllerName = 'MultiStepIndicatorController';
  var MultiStepIndicatorController = (function() {
    function MultiStepIndicatorController($state, $q, object) {
      this.$state = $state;
      this.$q = $q;
      this.object = object;
      this.configureSteps();
    }
    MultiStepIndicatorController.prototype.onClick = function(step) {
      if (!this.anyLoading()) {
        step.loading = true;
        this.$q.when(step.onClick()).then(function() {
          step.loading = false;
        });
      }
    };
    MultiStepIndicatorController.prototype.anyLoading = function() {
      return _.some(this.steps, function(step) {
        return step.loading;
      });
    };
    MultiStepIndicatorController.prototype.configureSteps = function() {
      var _this = this;
      _.each(this.steps, function(step) {
        step.hasCount = _.isFunction(step.count);
        step.getCompleted = function() {
          return _this.getIsCompleted(step);
        };
        step.getValid = function() {
          return _this.getIsValid(step);
        };
        if (!_.isFunction(step.onClick)) {
          if (_this.object.isNullOrWhitespace(step.stateName)) {
            step.inactive = true;
          } else {
            step.onClick = function() {
              return _this.redirectToState(step);
            };
            if (_this.$state.includes(step.stateName)) {
              step.isCurrent = true;
            }
          }
        }
      });
    };
    MultiStepIndicatorController.prototype.redirectToState = function(step) {
      var _this = this;
      return this.$state.go(step.stateName).then(function() {
        _this.clearCurrentState();
        step.isCurrent = true;
      });
    };
    MultiStepIndicatorController.prototype.clearCurrentState = function() {
      _.each(this.steps, function(step) {
        step.isCurrent = false;
      });
    };
    MultiStepIndicatorController.prototype.getIsCompleted = function(step) {
      return _.isFunction(step.isCompleted) ? step.isCompleted() : step.isCompleted;
    };
    MultiStepIndicatorController.prototype.setIsCompleted = function(step, isCompleted) {
      if (!_.isFunction(step.isCompleted)) {
        step.isCompleted = isCompleted;
      }
    };
    MultiStepIndicatorController.prototype.getIsValid = function(step) {
      if (_.isFunction(step.isValid)) {
        return step.isValid();
      } else if (!_.isUndefined(step.isValid != null)) {
        return step.isValid;
      } else {
        return true;
      }
    };
    MultiStepIndicatorController.$inject = ['$state', '$q', typescript_angular_utilities_1.downgrade.objectServiceName];
    return MultiStepIndicatorController;
  }());
  exports.MultiStepIndicatorController = MultiStepIndicatorController;
  var multiStepIndicator = {
    template: $__require('./multiStepIndicator.html'),
    controller: exports.controllerName,
    controllerAs: 'breadcrumb',
    bindings: {
      steps: '=',
      numbered: '='
    }
  };
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).component(exports.componentName, multiStepIndicator).controller(exports.controllerName, MultiStepIndicatorController);
  return module.exports;
});

System.registerDynamic("components/components/radio/radioGroup", ["typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __guid = typescript_angular_utilities_1.services.guid;
  exports.directiveName = 'rlRadioGroup';
  exports.controllerName = 'RadioGroupController';
  var RadioGroup = (function() {
    function RadioGroup(ngModel, name) {
      this.ngModel = ngModel;
      this.name = name;
    }
    Object.defineProperty(RadioGroup.prototype, "selection", {
      get: function() {
        return this.ngModel.$viewValue;
      },
      set: function(value) {
        this.ngModel.$setViewValue(value);
      },
      enumerable: true,
      configurable: true
    });
    return RadioGroup;
  }());
  exports.RadioGroup = RadioGroup;
  var RadioGroupController = (function() {
    function RadioGroupController($attrs, object) {
      this.$attrs = $attrs;
      this.object = object;
    }
    RadioGroupController.prototype.$onInit = function() {
      var name;
      if (!this.object.isNullOrWhitespace(this.$attrs.rlRadioGroup)) {
        name = this.$attrs.rlRadioGroup;
      } else if (!this.object.isNullOrWhitespace(this.$attrs.name)) {
        name = this.$attrs.name;
      } else {
        name = 'RadioGroup-' + __guid.guid.random();
      }
      this.group = new RadioGroup(this.ngModel, name);
    };
    RadioGroupController.$inject = ['$attrs', typescript_angular_utilities_1.downgrade.objectServiceName];
    return RadioGroupController;
  }());
  exports.RadioGroupController = RadioGroupController;
  function radioGroup() {
    'use strict';
    return {
      restrict: 'AE',
      require: {ngModel: 'ngModel'},
      controller: exports.controllerName,
      bindToController: true
    };
  }
  exports.radioGroup = radioGroup;
  return module.exports;
});

System.registerDynamic("components/components/radio/radio", ["./radioGroup"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var radioGroup_1 = $__require('./radioGroup');
  exports.componentName = 'rlRadio';
  exports.controllerName = 'RadioController';
  var RadioController = (function() {
    function RadioController() {}
    RadioController.prototype.$onInit = function() {
      if (this.groupController != null) {
        this.radioGroup = this.groupController.group;
      } else {
        this.radioGroup = new radioGroup_1.RadioGroup(this.ngModel);
      }
    };
    return RadioController;
  }());
  exports.RadioController = RadioController;
  exports.radio = {
    require: {
      groupController: '?^^rlRadioGroup',
      ngModel: '?ngModel'
    },
    transclude: true,
    template: "\n\t\t<label>\n\t\t\t<input id=\"radio\" type=\"radio\" name=\"{{::radio.radioGroup.name}}\" ng-model=\"radio.radioGroup.selection\" ng-value=\"::radio.value\" />\n\t\t\t<span ng-transclude></div>\n\t\t</label>\n\t",
    controller: exports.controllerName,
    controllerAs: 'radio',
    bindings: {value: '<'}
  };
  return module.exports;
});

System.registerDynamic("components/components/radio/radio.module", ["angular", "typescript-angular-utilities", "./radioGroup", "./radio"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var radioGroup_1 = $__require('./radioGroup');
  exports.radioGroupDirectiveName = radioGroup_1.directiveName;
  exports.radioGroup = radioGroup_1.radioGroup;
  exports.radioGroupControllerName = radioGroup_1.controllerName;
  exports.RadioGroupController = radioGroup_1.RadioGroupController;
  var radio_1 = $__require('./radio');
  exports.radioComponentName = radio_1.componentName;
  exports.radio = radio_1.radio;
  exports.radioControllerName = radio_1.controllerName;
  exports.RadioController = radio_1.RadioController;
  exports.moduleName = 'rl21.components.radio';
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).directive(radioGroup_1.directiveName, radioGroup_1.radioGroup).controller(radioGroup_1.controllerName, radioGroup_1.RadioGroupController).component(radio_1.componentName, radio_1.radio).controller(radio_1.controllerName, radio_1.RadioController);
  return module.exports;
});

System.registerDynamic("components/components/ratingBar/ratingBarBackgrounds.service", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var RatingBarBackgroundService = (function() {
    function RatingBarBackgroundService() {
      this.standard = {
        type: 'standard',
        class: 'background'
      };
      this.dark = {
        type: 'dark',
        class: 'background-dark'
      };
      this.transparent = {
        type: 'transparent',
        class: 'background-transparent'
      };
    }
    RatingBarBackgroundService.prototype.getBackground = function(type) {
      if (type === this.dark.type) {
        return this.dark.class;
      } else if (type === this.transparent.type) {
        return this.transparent.class;
      } else {
        return this.standard.class;
      }
    };
    return RatingBarBackgroundService;
  }());
  exports.RatingBarBackgroundService = RatingBarBackgroundService;
  return module.exports;
});

System.registerDynamic("components/components/ratingBar/ratingBarClass.service", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var RatingBarClassService = (function() {
    function RatingBarClassService() {}
    RatingBarClassService.prototype.getClass = function(confidence) {
      if (confidence >= 0.8) {
        return 'very-high';
      } else if (confidence >= 0.6) {
        return 'high';
      } else if (confidence >= 0.4) {
        return 'medium';
      } else if (confidence >= 0.2) {
        return 'low';
      } else {
        return 'very-low';
      }
    };
    return RatingBarClassService;
  }());
  exports.RatingBarClassService = RatingBarClassService;
  return module.exports;
});

System.registerDynamic("components/components/ratingBar/ratingBar", ["angular", "../componentsDefaultTheme", "./ratingBarBackgrounds.service", "./ratingBarClass.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var componentsDefaultTheme_1 = $__require('../componentsDefaultTheme');
  var ratingBarBackgrounds_service_1 = $__require('./ratingBarBackgrounds.service');
  var ratingBarClass_service_1 = $__require('./ratingBarClass.service');
  exports.moduleName = 'rl.ui.components.ratingBar';
  exports.componentName = 'rlRatingBar';
  exports.controllerName = 'RatingBarController';
  var RatingBarController = (function() {
    function RatingBarController(useDefaultTheme) {
      this.useDefaultTheme = useDefaultTheme;
      var ratingBarBackgrounds = new ratingBarBackgrounds_service_1.RatingBarBackgroundService;
      this.ratingBarClass = new ratingBarClass_service_1.RatingBarClassService;
      this.backgroundClass = ratingBarBackgrounds.getBackground(this.background);
      if (this.value == null) {
        this.value = 0;
      }
      this.updateValue(this.value);
      this.updateDimensions(this.totalWidth);
    }
    RatingBarController.prototype.$onChanges = function(changes) {
      if (changes.value) {
        this.updateValue(changes.value.currentValue);
      }
      if (changes.totalWidth) {
        this.updateDimensions(changes.totalWidth.currentValue);
      }
    };
    RatingBarController.prototype.updateValue = function(newValue) {
      var confidenceScore = (newValue - this.min) / (this.max - this.min);
      this.barClass = this.ratingBarClass.getClass(confidenceScore);
      this.width = Math.round(confidenceScore * this.totalWidth);
    };
    RatingBarController.prototype.updateDimensions = function(totalWidth) {
      this.dimensions = {
        width: totalWidth + 2,
        height: this.height + 2
      };
      this.updateValue(this.value);
    };
    RatingBarController.$inject = [componentsDefaultTheme_1.defaultThemeValueName];
    return RatingBarController;
  }());
  exports.RatingBarController = RatingBarController;
  var ratingBar = {
    template: "\n\t\t<div class=\"rating-bar\">\n\t\t\t<div class=\"{{ratingBar.backgroundClass}}\" ng-class=\"{ empty: ratingBar.value == ratingBar.min, 'default-theme': ratingBar.useDefaultTheme }\" ng-style=\"ratingBar.dimensions\">\n\t\t\t\t<div ng-class=\"ratingBar.barClass\" ng-style=\"{ width: ratingBar.width, height: ratingBar.height }\"></div>\n\t\t\t</div>\n\t\t</div>\n\t",
    controller: exports.controllerName,
    controllerAs: 'ratingBar',
    bindings: {
      totalWidth: '<width',
      height: '<',
      value: '<',
      min: '<',
      max: '<',
      background: '<'
    }
  };
  angular.module(exports.moduleName, []).component(exports.componentName, ratingBar).controller(exports.controllerName, RatingBarController);
  return module.exports;
});

System.registerDynamic("node_modules/ng-wig/dist/ng-wig", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    angular.module('ngWig', ['ngwig-app-templates']);
    angular.module('ngWig').directive('ngWig', ["$window", "$document", "ngWigToolbar", function($window, $document, ngWigToolbar) {
      return {
        scope: {
          content: '=ngWig',
          onPaste: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'ng-wig/views/ng-wig.html',
        link: function(scope, element, attrs) {
          scope.formElementName = attrs.name;
          element.removeAttr('name');
          scope.isRequired = !!attrs.required;
          scope.isSourceModeAllowed = Object.keys(attrs).indexOf('sourceModeAllowed') !== -1 ? true : false;
          scope.editMode = false;
          scope.toolbarButtons = ngWigToolbar.getToolbarButtons(attrs.buttons && string2array(attrs.buttons));
          function string2array(keysString) {
            return keysString.split(',').map(Function.prototype.call, String.prototype.trim);
          }
          scope.toggleEditMode = function() {
            scope.editMode = !scope.editMode;
            if ($window.getSelection().removeAllRanges) {
              $window.getSelection().removeAllRanges();
            }
          };
          scope.execCommand = function(command, options) {
            if (scope.editMode)
              return false;
            if (command === 'createlink') {
              options = prompt('Please enter the URL', 'http://');
              if (!options) {
                return;
              }
            }
            scope.$broadcast('execCommand', {
              command: command,
              options: options
            });
          };
          if (attrs.ngDisabled != null || attrs.disabled != null) {
            scope.$watch(function() {
              return !!attrs.disabled;
            }, function(isDisabled) {
              scope.isDisabled = isDisabled;
              scope.$broadcast('nw-disabled', isDisabled);
            });
          }
        }
      };
    }]);
    angular.module('ngWig').directive('ngWigEditable', ["$document", function($document) {
      function init(scope, $element, attrs, ngModelController) {
        $element.attr('contenteditable', true);
        ngModelController.$render = function() {
          $element.html(ngModelController.$viewValue || '');
        };
        function viewToModel() {
          ngModelController.$setViewValue($element.html());
        }
        var eventsToBind = ['blur', 'keyup', 'change', 'focus', 'click'];
        if (angular.isFunction(scope.onPaste)) {
          $element.on('paste', function(e) {
            scope.onPaste(e, $element.html()).then(function(val) {
              $element.html(val);
            });
          });
        } else {
          eventsToBind.push('paste');
        }
        $element.bind(eventsToBind.join(' '), function() {
          viewToModel();
          scope.$applyAsync();
        });
        scope.isEditorActive = function() {
          return $element[0] === $document[0].activeElement;
        };
        scope.$on('execCommand', function(event, params) {
          $element[0].focus();
          var ieStyleTextSelection = $document[0].selection,
              command = params.command,
              options = params.options;
          if (ieStyleTextSelection) {
            var textRange = ieStyleTextSelection.createRange();
          }
          if ($document[0].queryCommandSupported && !$document[0].queryCommandSupported(command)) {
            throw 'The command "' + command + '" is not supported';
          }
          $document[0].execCommand(command, false, options);
          if (ieStyleTextSelection) {
            textRange.collapse(false);
            textRange.select();
          }
          viewToModel();
        });
        scope.$on('nw-disabled', function(event, isDisabled) {
          $element.attr('contenteditable', !isDisabled);
        });
      }
      return {
        restrict: 'A',
        require: 'ngModel',
        replace: true,
        link: init
      };
    }]);
    angular.module('ngWig').directive('ngWigPlugin', ["$compile", function($compile) {
      return {
        restrict: 'E',
        link: function(scope, element) {
          var template = '<' + scope.button.pluginName + ' />',
              compiled = $compile(template)(scope);
          element.replaceWith(compiled);
        }
      };
    }]);
    angular.module('ngWig').provider('ngWigToolbar', function() {
      var buttonLibrary = {
        list1: {
          title: 'Unordered List',
          command: 'insertunorderedlist',
          styleClass: 'list-ul'
        },
        list2: {
          title: 'Ordered List',
          command: 'insertorderedlist',
          styleClass: 'list-ol'
        },
        bold: {
          title: 'Bold',
          command: 'bold',
          styleClass: 'bold'
        },
        italic: {
          title: 'Italic',
          command: 'italic',
          styleClass: 'italic'
        },
        link: {
          title: 'Link',
          command: 'createlink',
          styleClass: 'link'
        }
      };
      var defaultButtonsList = ['list1', 'list2', 'bold', 'italic', 'link'];
      var isButtonActive = function() {
        return this.command && document.queryCommandState(this.command);
      };
      this.setButtons = function(buttons) {
        if (!angular.isArray(buttons)) {
          throw 'Argument "buttons" should be an array';
        }
        defaultButtonsList = buttons;
      };
      this.addStandardButton = function(name, title, command, styleClass) {
        if (!name || !title || !command) {
          throw 'Arguments "name", "title" and "command" are required';
        }
        styleClass = styleClass || '';
        buttonLibrary[name] = {
          title: title,
          command: command,
          styleClass: styleClass
        };
        defaultButtonsList.push(name);
      };
      this.addCustomButton = function(name, pluginName) {
        if (!name || !pluginName) {
          throw 'Arguments "name" and "pluginName" are required';
        }
        buttonLibrary[name] = {
          pluginName: pluginName,
          isComplex: true
        };
        defaultButtonsList.push(name);
      };
      this.$get = function() {
        return {getToolbarButtons: function(list) {
            var toolbarButtons = [];
            (list || defaultButtonsList).forEach(function(buttonKey) {
              if (!buttonLibrary[buttonKey]) {
                throw 'There is no "' + buttonKey + '" in your library. Possible variants: ' + Object.keys(buttonLibrary);
              }
              var button = angular.copy(buttonLibrary[buttonKey]);
              if (!angular.isFunction(button.isActive)) {
                button.isActive = isButtonActive;
              }
              toolbarButtons.push(button);
            });
            return toolbarButtons;
          }};
      };
    });
    angular.module('ngWig').config(['ngWigToolbarProvider', function(ngWigToolbarProvider) {
      ngWigToolbarProvider.addCustomButton('formats', 'nw-formats-button');
    }]).directive('nwFormatsButton', function() {
      return {
        restrict: 'E',
        replace: true,
        template: '<select class="nw-select" ng-model="format" ng-change="execCommand(\'formatblock\', format.value)" ng-options="format.name for format in formats" ng-disabled="editMode || isDisabled"></select>',
        link: function(scope) {
          scope.formats = [{
            name: 'Normal text',
            value: 'p'
          }, {
            name: 'Header 1',
            value: 'h1'
          }, {
            name: 'Header 2',
            value: 'h2'
          }, {
            name: 'Header 3',
            value: 'h3'
          }];
          scope.format = scope.formats[0];
        }
      };
    });
    angular.module('ngwig-app-templates', ['ng-wig/views/ng-wig.html']);
    angular.module("ng-wig/views/ng-wig.html", []).run(["$templateCache", function($templateCache) {
      $templateCache.put("ng-wig/views/ng-wig.html", "<div class=\"ng-wig\">\n" + "  <ul class=\"nw-toolbar\">\n" + "    <li class=\"nw-toolbar__item\" ng-repeat=\"button in toolbarButtons\" >\n" + "        <div ng-if=\"!button.isComplex\">\n" + "          <button type=\"button\" class=\"nw-button {{button.styleClass}}\" title=\"{{button.title}}\" ng-click=\"execCommand(button.command)\" ng-class=\"{ 'nw-button--active': isEditorActive() && button.isActive() }\" ng-disabled=\"editMode || isDisabled\">\n" + "            {{ button.title }}\n" + "          </button>\n" + "        </div>\n" + "        <div ng-if=\"button.isComplex\">\n" + "          <ng-wig-plugin plugin=\"{{button}}\"></ng-wig-plugin>\n" + "        </div>\n" + "    </li><!--\n" + "    --><li class=\"nw-toolbar__item\">\n" + "      <button type=\"button\" class=\"nw-button nw-button--source\" title=\"Edit HTML\" ng-class=\"{ 'nw-button--active': editMode }\" ng-show=\"isSourceModeAllowed\" ng-click=\"toggleEditMode()\" ng-disabled=\"isDisabled\">\n" + "        Edit HTML\n" + "      </button>\n" + "    </li>\n" + "  </ul>\n" + "\n" + "  <div class=\"nw-editor-container\">\n" + "    <div class=\"nw-editor__src-container\" ng-show=\"editMode\">\n" + "      <textarea ng-required=\"isRequired\" ng-disabled=\"isDisabled\" class=\"nw-editor__src\" ng-model=\"content\"></textarea>\n" + "    </div>\n" + "    <div class=\"nw-editor\" ng-class=\"{ 'nw-disabled': isDisabled }\">\n" + "      <div name=\"{{formElementName}}\" ng-required=\"isRequired\" tabindex=\"-1\" ng-class=\"{'nw-invisible': editMode}\" class=\"nw-editor__res\" ng-model=\"content\" ng-wig-editable on-paste=\"onPaste\"></div>\n" + "    </div>\n" + "  </div>\n" + "</div>\n" + "");
    }]);
  })();
  return _retrieveGlobal();
});

System.registerDynamic("components/components/richTextEditor/richTextEditor.config", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.providerName = 'richTextEditor';
  richTextEditorProvider.$inject = ['ngWigToolbarProvider'];
  function richTextEditorProvider(ngWigToolbarProvider) {
    'use strict';
    return {
      addCustomButton: function(name, component) {
        ngWigToolbarProvider.addCustomButton(name, component);
      },
      addStandardButton: function(name, tooltip, command, icon) {
        ngWigToolbarProvider.addStandardButton(name, toolbar, command, 'fa-' + icon);
      },
      $get: function() {
        ngWigToolbarProvider.addCustomButton('paragraph', 'rl-paragraph-button');
        ngWigToolbarProvider.addCustomButton('h1', 'rl-header-button');
        ngWigToolbarProvider.addStandardButton('underline', 'Underline', 'underline', 'fa-underline');
        ngWigToolbarProvider.addStandardButton('indent', 'Indent', 'indent', 'fa-indent');
        ngWigToolbarProvider.addStandardButton('outdent', 'Outdent', 'outdent', 'fa-outdent');
      }
    };
  }
  exports.richTextEditorProvider = richTextEditorProvider;
  return module.exports;
});

System.registerDynamic("components/components/richTextEditor/headerButton", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.headerButtonDirectiveName = 'rlHeaderButton';
  function headerButton() {
    'use strict';
    return {
      restrict: 'E',
      template: "\n\t\t\t<button type=\"button\" class=\"nw-button header\" ng-click=\"trigger()\" ng-disabled=\"editMode || isDisabled\" title=\"Header 1\"></button>\n\t\t",
      link: function(scope) {
        scope.trigger = function() {
          scope.execCommand('formatblock', 'h1');
        };
      }
    };
  }
  exports.headerButton = headerButton;
  return module.exports;
});

System.registerDynamic("components/components/richTextEditor/paragraphButton", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.paragraphButtonDirectiveName = 'rlParagraphButton';
  function paragraphButton() {
    'use strict';
    return {
      restrict: 'E',
      template: "\n\t\t\t<button type=\"button\" class=\"nw-button paragraph\" ng-click=\"trigger()\" ng-disabled=\"editMode || isDisabled\" title=\"paragraph\"></button>\n\t\t",
      link: function(scope) {
        scope.trigger = function() {
          scope.execCommand('formatblock', 'p');
        };
      }
    };
  }
  exports.paragraphButton = paragraphButton;
  return module.exports;
});

System.registerDynamic("components/components/richTextEditor/richTextEditor.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<textarea class=\"rich-text-editor\" ng-wig=\"editor.ngModel\" buttons=\"{{editor.toolbar}}\" ng-disabled=\"editor.ngDisabled\"></textarea>";
  return module.exports;
});

System.registerDynamic("components/components/richTextEditor/richTextEditor", ["ng-wig/dist/ng-wig", "angular", "typescript-angular-utilities", "./richTextEditor.config", "./headerButton", "./paragraphButton", "./richTextEditor.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('ng-wig/dist/ng-wig');
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var richTextEditor_config_1 = $__require('./richTextEditor.config');
  var headerButton_1 = $__require('./headerButton');
  var paragraphButton_1 = $__require('./paragraphButton');
  var externalProviderName = richTextEditor_config_1.providerName + 'Provider';
  exports.providerName = externalProviderName;
  exports.moduleName = 'rl.ui.components.richTextEditor';
  exports.componentName = 'rlRichTextEditor';
  exports.controllerName = 'RichTextEditorController';
  var RichTextEditorController = (function() {
    function RichTextEditorController(object, provider) {
      this.toolbar = 'h1, paragraph, bold, italic, underline, list1, list2, indent, outdent';
      if (!object.isNullOrEmpty(this.customButtons)) {
        this.toolbar += ', ' + this.customButtons;
      }
    }
    RichTextEditorController.$inject = [typescript_angular_utilities_1.downgrade.objectServiceName, richTextEditor_config_1.providerName];
    return RichTextEditorController;
  }());
  exports.RichTextEditorController = RichTextEditorController;
  var richTextEditor = {
    template: $__require('./richTextEditor.html'),
    controller: exports.controllerName,
    controllerAs: 'editor',
    bindings: {
      ngModel: '=',
      customButtons: '=',
      ngDisabled: '='
    }
  };
  angular.module(exports.moduleName, ['ngWig', typescript_angular_utilities_1.downgrade.moduleName]).component(exports.componentName, richTextEditor).controller(exports.controllerName, RichTextEditorController).directive(headerButton_1.headerButtonDirectiveName, headerButton_1.headerButton).directive(paragraphButton_1.paragraphButtonDirectiveName, paragraphButton_1.paragraphButton).provider(richTextEditor_config_1.providerName, richTextEditor_config_1.richTextEditorProvider);
  return module.exports;
});

System.registerDynamic("node_modules/ui-select/dist/select", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    (function() {
      "use strict";
      var KEY = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        COMMAND: 91,
        MAP: {
          91: "COMMAND",
          8: "BACKSPACE",
          9: "TAB",
          13: "ENTER",
          16: "SHIFT",
          17: "CTRL",
          18: "ALT",
          19: "PAUSEBREAK",
          20: "CAPSLOCK",
          27: "ESC",
          32: "SPACE",
          33: "PAGE_UP",
          34: "PAGE_DOWN",
          35: "END",
          36: "HOME",
          37: "LEFT",
          38: "UP",
          39: "RIGHT",
          40: "DOWN",
          43: "+",
          44: "PRINTSCREEN",
          45: "INSERT",
          46: "DELETE",
          48: "0",
          49: "1",
          50: "2",
          51: "3",
          52: "4",
          53: "5",
          54: "6",
          55: "7",
          56: "8",
          57: "9",
          59: ";",
          61: "=",
          65: "A",
          66: "B",
          67: "C",
          68: "D",
          69: "E",
          70: "F",
          71: "G",
          72: "H",
          73: "I",
          74: "J",
          75: "K",
          76: "L",
          77: "M",
          78: "N",
          79: "O",
          80: "P",
          81: "Q",
          82: "R",
          83: "S",
          84: "T",
          85: "U",
          86: "V",
          87: "W",
          88: "X",
          89: "Y",
          90: "Z",
          96: "0",
          97: "1",
          98: "2",
          99: "3",
          100: "4",
          101: "5",
          102: "6",
          103: "7",
          104: "8",
          105: "9",
          106: "*",
          107: "+",
          109: "-",
          110: ".",
          111: "/",
          112: "F1",
          113: "F2",
          114: "F3",
          115: "F4",
          116: "F5",
          117: "F6",
          118: "F7",
          119: "F8",
          120: "F9",
          121: "F10",
          122: "F11",
          123: "F12",
          144: "NUMLOCK",
          145: "SCROLLLOCK",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'"
        },
        isControl: function(e) {
          var k = e.which;
          switch (k) {
            case KEY.COMMAND:
            case KEY.SHIFT:
            case KEY.CTRL:
            case KEY.ALT:
              return true;
          }
          if (e.metaKey)
            return true;
          return false;
        },
        isFunctionKey: function(k) {
          k = k.which ? k.which : k;
          return k >= 112 && k <= 123;
        },
        isVerticalMovement: function(k) {
          return ~[KEY.UP, KEY.DOWN].indexOf(k);
        },
        isHorizontalMovement: function(k) {
          return ~[KEY.LEFT, KEY.RIGHT, KEY.BACKSPACE, KEY.DELETE].indexOf(k);
        },
        toSeparator: function(k) {
          var sep = {
            ENTER: "\n",
            TAB: "\t",
            SPACE: " "
          }[k];
          if (sep)
            return sep;
          return KEY[k] ? undefined : k;
        }
      };
      if (angular.element.prototype.querySelectorAll === undefined) {
        angular.element.prototype.querySelectorAll = function(selector) {
          return angular.element(this[0].querySelectorAll(selector));
        };
      }
      if (angular.element.prototype.closest === undefined) {
        angular.element.prototype.closest = function(selector) {
          var elem = this[0];
          var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
          while (elem) {
            if (matchesSelector.bind(elem)(selector)) {
              return elem;
            } else {
              elem = elem.parentElement;
            }
          }
          return false;
        };
      }
      var latestId = 0;
      var uis = angular.module('ui.select', []).constant('uiSelectConfig', {
        theme: 'bootstrap',
        searchEnabled: true,
        sortable: false,
        placeholder: '',
        refreshDelay: 1000,
        closeOnSelect: true,
        dropdownPosition: 'auto',
        generateId: function() {
          return latestId++;
        },
        appendToBody: false
      }).service('uiSelectMinErr', function() {
        var minErr = angular.$$minErr('ui.select');
        return function() {
          var error = minErr.apply(this, arguments);
          var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');
          return new Error(message);
        };
      }).directive('uisTranscludeAppend', function() {
        return {link: function(scope, element, attrs, ctrl, transclude) {
            transclude(scope, function(clone) {
              element.append(clone);
            });
          }};
      }).filter('highlight', function() {
        function escapeRegexp(queryToEscape) {
          return ('' + queryToEscape).replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        }
        return function(matchItem, query) {
          return query && matchItem ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
        };
      }).factory('uisOffset', ['$document', '$window', function($document, $window) {
        return function(element) {
          var boundingClientRect = element[0].getBoundingClientRect();
          return {
            width: boundingClientRect.width || element.prop('offsetWidth'),
            height: boundingClientRect.height || element.prop('offsetHeight'),
            top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
            left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
          };
        };
      }]);
      uis.directive('uiSelectChoices', ['uiSelectConfig', 'uisRepeatParser', 'uiSelectMinErr', '$compile', '$window', function(uiSelectConfig, RepeatParser, uiSelectMinErr, $compile, $window) {
        return {
          restrict: 'EA',
          require: '^uiSelect',
          replace: true,
          transclude: true,
          templateUrl: function(tElement) {
            tElement.addClass('ui-select-choices');
            var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
            return theme + '/choices.tpl.html';
          },
          compile: function(tElement, tAttrs) {
            if (!tAttrs.repeat)
              throw uiSelectMinErr('repeat', "Expected 'repeat' expression.");
            return function link(scope, element, attrs, $select, transcludeFn) {
              var groupByExp = attrs.groupBy;
              var groupFilterExp = attrs.groupFilter;
              $select.parseRepeatAttr(attrs.repeat, groupByExp, groupFilterExp);
              $select.disableChoiceExpression = attrs.uiDisableChoice;
              $select.onHighlightCallback = attrs.onHighlight;
              $select.dropdownPosition = attrs.position ? attrs.position.toLowerCase() : uiSelectConfig.dropdownPosition;
              if (groupByExp) {
                var groups = element.querySelectorAll('.ui-select-choices-group');
                if (groups.length !== 1)
                  throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-group but got '{0}'.", groups.length);
                groups.attr('ng-repeat', RepeatParser.getGroupNgRepeatExpression());
              }
              var choices = element.querySelectorAll('.ui-select-choices-row');
              if (choices.length !== 1) {
                throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row but got '{0}'.", choices.length);
              }
              choices.attr('ng-repeat', $select.parserResult.repeatExpression(groupByExp)).attr('ng-if', '$select.open');
              if ($window.document.addEventListener) {
                choices.attr('ng-mouseenter', '$select.setActiveItem(' + $select.parserResult.itemName + ')').attr('ng-click', '$select.select(' + $select.parserResult.itemName + ',false,$event)');
              }
              var rowsInner = element.querySelectorAll('.ui-select-choices-row-inner');
              if (rowsInner.length !== 1)
                throw uiSelectMinErr('rows', "Expected 1 .ui-select-choices-row-inner but got '{0}'.", rowsInner.length);
              rowsInner.attr('uis-transclude-append', '');
              if (!$window.document.addEventListener) {
                rowsInner.attr('ng-mouseenter', '$select.setActiveItem(' + $select.parserResult.itemName + ')').attr('ng-click', '$select.select(' + $select.parserResult.itemName + ',false,$event)');
              }
              $compile(element, transcludeFn)(scope);
              scope.$watch('$select.search', function(newValue) {
                if (newValue && !$select.open && $select.multiple)
                  $select.activate(false, true);
                $select.activeIndex = $select.tagging.isActivated ? -1 : 0;
                if (!attrs.minimumInputLength || $select.search.length >= attrs.minimumInputLength) {
                  $select.refresh(attrs.refresh);
                } else {
                  $select.items = [];
                }
              });
              attrs.$observe('refreshDelay', function() {
                var refreshDelay = scope.$eval(attrs.refreshDelay);
                $select.refreshDelay = refreshDelay !== undefined ? refreshDelay : uiSelectConfig.refreshDelay;
              });
            };
          }
        };
      }]);
      uis.controller('uiSelectCtrl', ['$scope', '$element', '$timeout', '$filter', 'uisRepeatParser', 'uiSelectMinErr', 'uiSelectConfig', '$parse', '$injector', function($scope, $element, $timeout, $filter, RepeatParser, uiSelectMinErr, uiSelectConfig, $parse, $injector) {
        var ctrl = this;
        var EMPTY_SEARCH = '';
        ctrl.placeholder = uiSelectConfig.placeholder;
        ctrl.searchEnabled = uiSelectConfig.searchEnabled;
        ctrl.sortable = uiSelectConfig.sortable;
        ctrl.refreshDelay = uiSelectConfig.refreshDelay;
        ctrl.paste = uiSelectConfig.paste;
        ctrl.removeSelected = false;
        ctrl.closeOnSelect = true;
        ctrl.search = EMPTY_SEARCH;
        ctrl.activeIndex = 0;
        ctrl.items = [];
        ctrl.open = false;
        ctrl.focus = false;
        ctrl.disabled = false;
        ctrl.selected = undefined;
        ctrl.dropdownPosition = 'auto';
        ctrl.focusser = undefined;
        ctrl.resetSearchInput = true;
        ctrl.multiple = undefined;
        ctrl.disableChoiceExpression = undefined;
        ctrl.tagging = {
          isActivated: false,
          fct: undefined
        };
        ctrl.taggingTokens = {
          isActivated: false,
          tokens: undefined
        };
        ctrl.lockChoiceExpression = undefined;
        ctrl.clickTriggeredSelect = false;
        ctrl.$filter = $filter;
        ctrl.$animate = (function() {
          try {
            return $injector.get('$animate');
          } catch (err) {
            return null;
          }
        })();
        ctrl.searchInput = $element.querySelectorAll('input.ui-select-search');
        if (ctrl.searchInput.length !== 1) {
          throw uiSelectMinErr('searchInput', "Expected 1 input.ui-select-search but got '{0}'.", ctrl.searchInput.length);
        }
        ctrl.isEmpty = function() {
          return angular.isUndefined(ctrl.selected) || ctrl.selected === null || ctrl.selected === '' || (ctrl.multiple && ctrl.selected.length === 0);
        };
        function _findIndex(collection, predicate, thisArg) {
          if (collection.findIndex) {
            return collection.findIndex(predicate, thisArg);
          } else {
            var list = Object(collection);
            var length = list.length >>> 0;
            var value;
            for (var i = 0; i < length; i++) {
              value = list[i];
              if (predicate.call(thisArg, value, i, list)) {
                return i;
              }
            }
            return -1;
          }
        }
        function _resetSearchInput() {
          if (ctrl.resetSearchInput || (ctrl.resetSearchInput === undefined && uiSelectConfig.resetSearchInput)) {
            ctrl.search = EMPTY_SEARCH;
            if (ctrl.selected && ctrl.items.length && !ctrl.multiple) {
              ctrl.activeIndex = _findIndex(ctrl.items, function(item) {
                return angular.equals(this, item);
              }, ctrl.selected);
            }
          }
        }
        function _groupsFilter(groups, groupNames) {
          var i,
              j,
              result = [];
          for (i = 0; i < groupNames.length; i++) {
            for (j = 0; j < groups.length; j++) {
              if (groups[j].name == [groupNames[i]]) {
                result.push(groups[j]);
              }
            }
          }
          return result;
        }
        ctrl.activate = function(initSearchValue, avoidReset) {
          if (!ctrl.disabled && !ctrl.open) {
            if (!avoidReset)
              _resetSearchInput();
            $scope.$broadcast('uis:activate');
            ctrl.open = true;
            ctrl.activeIndex = ctrl.activeIndex >= ctrl.items.length ? 0 : ctrl.activeIndex;
            if (ctrl.activeIndex === -1 && ctrl.taggingLabel !== false) {
              ctrl.activeIndex = 0;
            }
            var container = $element.querySelectorAll('.ui-select-choices-content');
            if (ctrl.$animate && ctrl.$animate.enabled(container[0])) {
              ctrl.$animate.on('enter', container[0], function(elem, phase) {
                if (phase === 'close') {
                  $timeout(function() {
                    ctrl.focusSearchInput(initSearchValue);
                  });
                }
              });
            } else {
              $timeout(function() {
                ctrl.focusSearchInput(initSearchValue);
              });
            }
          }
        };
        ctrl.focusSearchInput = function(initSearchValue) {
          ctrl.search = initSearchValue || ctrl.search;
          ctrl.searchInput[0].focus();
          if (!ctrl.tagging.isActivated && ctrl.items.length > 1) {
            _ensureHighlightVisible();
          }
        };
        ctrl.findGroupByName = function(name) {
          return ctrl.groups && ctrl.groups.filter(function(group) {
            return group.name === name;
          })[0];
        };
        ctrl.parseRepeatAttr = function(repeatAttr, groupByExp, groupFilterExp) {
          function updateGroups(items) {
            var groupFn = $scope.$eval(groupByExp);
            ctrl.groups = [];
            angular.forEach(items, function(item) {
              var groupName = angular.isFunction(groupFn) ? groupFn(item) : item[groupFn];
              var group = ctrl.findGroupByName(groupName);
              if (group) {
                group.items.push(item);
              } else {
                ctrl.groups.push({
                  name: groupName,
                  items: [item]
                });
              }
            });
            if (groupFilterExp) {
              var groupFilterFn = $scope.$eval(groupFilterExp);
              if (angular.isFunction(groupFilterFn)) {
                ctrl.groups = groupFilterFn(ctrl.groups);
              } else if (angular.isArray(groupFilterFn)) {
                ctrl.groups = _groupsFilter(ctrl.groups, groupFilterFn);
              }
            }
            ctrl.items = [];
            ctrl.groups.forEach(function(group) {
              ctrl.items = ctrl.items.concat(group.items);
            });
          }
          function setPlainItems(items) {
            ctrl.items = items;
          }
          ctrl.setItemsFn = groupByExp ? updateGroups : setPlainItems;
          ctrl.parserResult = RepeatParser.parse(repeatAttr);
          ctrl.isGrouped = !!groupByExp;
          ctrl.itemProperty = ctrl.parserResult.itemName;
          var originalSource = ctrl.parserResult.source;
          var createArrayFromObject = function() {
            var origSrc = originalSource($scope);
            $scope.$uisSource = Object.keys(origSrc).map(function(v) {
              var result = {};
              result[ctrl.parserResult.keyName] = v;
              result.value = origSrc[v];
              return result;
            });
          };
          if (ctrl.parserResult.keyName) {
            createArrayFromObject();
            ctrl.parserResult.source = $parse('$uisSource' + ctrl.parserResult.filters);
            $scope.$watch(originalSource, function(newVal, oldVal) {
              if (newVal !== oldVal)
                createArrayFromObject();
            }, true);
          }
          ctrl.refreshItems = function(data) {
            data = data || ctrl.parserResult.source($scope);
            var selectedItems = ctrl.selected;
            if (ctrl.isEmpty() || (angular.isArray(selectedItems) && !selectedItems.length) || !ctrl.removeSelected) {
              ctrl.setItemsFn(data);
            } else {
              if (data !== undefined) {
                var filteredItems = data.filter(function(i) {
                  return selectedItems && selectedItems.indexOf(i) < 0;
                });
                ctrl.setItemsFn(filteredItems);
              }
            }
            if (ctrl.dropdownPosition === 'auto' || ctrl.dropdownPosition === 'up') {
              $scope.calculateDropdownPos();
            }
          };
          $scope.$watchCollection(ctrl.parserResult.source, function(items) {
            if (items === undefined || items === null) {
              ctrl.items = [];
            } else {
              if (!angular.isArray(items)) {
                throw uiSelectMinErr('items', "Expected an array but got '{0}'.", items);
              } else {
                ctrl.refreshItems(items);
                ctrl.ngModel.$modelValue = null;
              }
            }
          });
        };
        var _refreshDelayPromise;
        ctrl.refresh = function(refreshAttr) {
          if (refreshAttr !== undefined) {
            if (_refreshDelayPromise) {
              $timeout.cancel(_refreshDelayPromise);
            }
            _refreshDelayPromise = $timeout(function() {
              $scope.$eval(refreshAttr);
            }, ctrl.refreshDelay);
          }
        };
        ctrl.isActive = function(itemScope) {
          if (!ctrl.open) {
            return false;
          }
          var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
          var isActive = itemIndex == ctrl.activeIndex;
          if (!isActive || (itemIndex < 0 && ctrl.taggingLabel !== false) || (itemIndex < 0 && ctrl.taggingLabel === false)) {
            return false;
          }
          if (isActive && !angular.isUndefined(ctrl.onHighlightCallback)) {
            itemScope.$eval(ctrl.onHighlightCallback);
          }
          return isActive;
        };
        ctrl.isDisabled = function(itemScope) {
          if (!ctrl.open)
            return;
          var itemIndex = ctrl.items.indexOf(itemScope[ctrl.itemProperty]);
          var isDisabled = false;
          var item;
          if (itemIndex >= 0 && !angular.isUndefined(ctrl.disableChoiceExpression)) {
            item = ctrl.items[itemIndex];
            isDisabled = !!(itemScope.$eval(ctrl.disableChoiceExpression));
            item._uiSelectChoiceDisabled = isDisabled;
          }
          return isDisabled;
        };
        ctrl.select = function(item, skipFocusser, $event) {
          if (item === undefined || !item._uiSelectChoiceDisabled) {
            if (!ctrl.items && !ctrl.search && !ctrl.tagging.isActivated)
              return;
            if (!item || !item._uiSelectChoiceDisabled) {
              if (ctrl.tagging.isActivated) {
                if (ctrl.taggingLabel === false) {
                  if (ctrl.activeIndex < 0) {
                    item = ctrl.tagging.fct !== undefined ? ctrl.tagging.fct(ctrl.search) : ctrl.search;
                    if (!item || angular.equals(ctrl.items[0], item)) {
                      return;
                    }
                  } else {
                    item = ctrl.items[ctrl.activeIndex];
                  }
                } else {
                  if (ctrl.activeIndex === 0) {
                    if (item === undefined)
                      return;
                    if (ctrl.tagging.fct !== undefined && typeof item === 'string') {
                      item = ctrl.tagging.fct(item);
                      if (!item)
                        return;
                    } else if (typeof item === 'string') {
                      item = item.replace(ctrl.taggingLabel, '').trim();
                    }
                  }
                }
                if (ctrl.selected && angular.isArray(ctrl.selected) && ctrl.selected.filter(function(selection) {
                  return angular.equals(selection, item);
                }).length > 0) {
                  ctrl.close(skipFocusser);
                  return;
                }
              }
              $scope.$broadcast('uis:select', item);
              var locals = {};
              locals[ctrl.parserResult.itemName] = item;
              $timeout(function() {
                ctrl.onSelectCallback($scope, {
                  $item: item,
                  $model: ctrl.parserResult.modelMapper($scope, locals)
                });
              });
              if (ctrl.closeOnSelect) {
                ctrl.close(skipFocusser);
              }
              if ($event && $event.type === 'click') {
                ctrl.clickTriggeredSelect = true;
              }
            }
          }
        };
        ctrl.close = function(skipFocusser) {
          if (!ctrl.open)
            return;
          if (ctrl.ngModel && ctrl.ngModel.$setTouched)
            ctrl.ngModel.$setTouched();
          _resetSearchInput();
          ctrl.open = false;
          $scope.$broadcast('uis:close', skipFocusser);
        };
        ctrl.setFocus = function() {
          if (!ctrl.focus)
            ctrl.focusInput[0].focus();
        };
        ctrl.clear = function($event) {
          ctrl.select(undefined);
          $event.stopPropagation();
          $timeout(function() {
            ctrl.focusser[0].focus();
          }, 0, false);
        };
        ctrl.toggle = function(e) {
          if (ctrl.open) {
            ctrl.close();
            e.preventDefault();
            e.stopPropagation();
          } else {
            ctrl.activate();
          }
        };
        ctrl.isLocked = function(itemScope, itemIndex) {
          var isLocked,
              item = ctrl.selected[itemIndex];
          if (item && !angular.isUndefined(ctrl.lockChoiceExpression)) {
            isLocked = !!(itemScope.$eval(ctrl.lockChoiceExpression));
            item._uiSelectChoiceLocked = isLocked;
          }
          return isLocked;
        };
        var sizeWatch = null;
        ctrl.sizeSearchInput = function() {
          var input = ctrl.searchInput[0],
              container = ctrl.searchInput.parent().parent()[0],
              calculateContainerWidth = function() {
                return container.clientWidth * !!input.offsetParent;
              },
              updateIfVisible = function(containerWidth) {
                if (containerWidth === 0) {
                  return false;
                }
                var inputWidth = containerWidth - input.offsetLeft - 10;
                if (inputWidth < 50)
                  inputWidth = containerWidth;
                ctrl.searchInput.css('width', inputWidth + 'px');
                return true;
              };
          ctrl.searchInput.css('width', '10px');
          $timeout(function() {
            if (sizeWatch === null && !updateIfVisible(calculateContainerWidth())) {
              sizeWatch = $scope.$watch(calculateContainerWidth, function(containerWidth) {
                if (updateIfVisible(containerWidth)) {
                  sizeWatch();
                  sizeWatch = null;
                }
              });
            }
          });
        };
        function _handleDropDownSelection(key) {
          var processed = true;
          switch (key) {
            case KEY.DOWN:
              if (!ctrl.open && ctrl.multiple)
                ctrl.activate(false, true);
              else if (ctrl.activeIndex < ctrl.items.length - 1) {
                ctrl.activeIndex++;
              }
              break;
            case KEY.UP:
              if (!ctrl.open && ctrl.multiple)
                ctrl.activate(false, true);
              else if (ctrl.activeIndex > 0 || (ctrl.search.length === 0 && ctrl.tagging.isActivated && ctrl.activeIndex > -1)) {
                ctrl.activeIndex--;
              }
              break;
            case KEY.TAB:
              if (!ctrl.multiple || ctrl.open)
                ctrl.select(ctrl.items[ctrl.activeIndex], true);
              break;
            case KEY.ENTER:
              if (ctrl.open && (ctrl.tagging.isActivated || ctrl.activeIndex >= 0)) {
                ctrl.select(ctrl.items[ctrl.activeIndex]);
              } else {
                ctrl.activate(false, true);
              }
              break;
            case KEY.ESC:
              ctrl.close();
              break;
            default:
              processed = false;
          }
          return processed;
        }
        ctrl.searchInput.on('keydown', function(e) {
          var key = e.which;
          if (~[KEY.ENTER, KEY.ESC].indexOf(key)) {
            e.preventDefault();
            e.stopPropagation();
          }
          $scope.$apply(function() {
            var tagged = false;
            if (ctrl.items.length > 0 || ctrl.tagging.isActivated) {
              _handleDropDownSelection(key);
              if (ctrl.taggingTokens.isActivated) {
                for (var i = 0; i < ctrl.taggingTokens.tokens.length; i++) {
                  if (ctrl.taggingTokens.tokens[i] === KEY.MAP[e.keyCode]) {
                    if (ctrl.search.length > 0) {
                      tagged = true;
                    }
                  }
                }
                if (tagged) {
                  $timeout(function() {
                    ctrl.searchInput.triggerHandler('tagged');
                    var newItem = ctrl.search.replace(KEY.MAP[e.keyCode], '').trim();
                    if (ctrl.tagging.fct) {
                      newItem = ctrl.tagging.fct(newItem);
                    }
                    if (newItem)
                      ctrl.select(newItem, true);
                  });
                }
              }
            }
          });
          if (KEY.isVerticalMovement(key) && ctrl.items.length > 0) {
            _ensureHighlightVisible();
          }
          if (key === KEY.ENTER || key === KEY.ESC) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
        ctrl.searchInput.on('paste', function(e) {
          var data;
          if (window.clipboardData && window.clipboardData.getData) {
            data = window.clipboardData.getData('Text');
          } else {
            data = (e.originalEvent || e).clipboardData.getData('text/plain');
          }
          data = ctrl.search + data;
          if (data && data.length > 0) {
            if (ctrl.taggingTokens.isActivated) {
              var separator = KEY.toSeparator(ctrl.taggingTokens.tokens[0]);
              var items = data.split(separator || ctrl.taggingTokens.tokens[0]);
              if (items && items.length > 0) {
                var oldsearch = ctrl.search;
                angular.forEach(items, function(item) {
                  var newItem = ctrl.tagging.fct ? ctrl.tagging.fct(item) : item;
                  if (newItem) {
                    ctrl.select(newItem, true);
                  }
                });
                ctrl.search = oldsearch || EMPTY_SEARCH;
                e.preventDefault();
                e.stopPropagation();
              }
            } else if (ctrl.paste) {
              ctrl.paste(data);
              ctrl.search = EMPTY_SEARCH;
              e.preventDefault();
              e.stopPropagation();
            }
          }
        });
        ctrl.searchInput.on('tagged', function() {
          $timeout(function() {
            _resetSearchInput();
          });
        });
        function _ensureHighlightVisible() {
          var container = $element.querySelectorAll('.ui-select-choices-content');
          var choices = container.querySelectorAll('.ui-select-choices-row');
          if (choices.length < 1) {
            throw uiSelectMinErr('choices', "Expected multiple .ui-select-choices-row but got '{0}'.", choices.length);
          }
          if (ctrl.activeIndex < 0) {
            return;
          }
          var highlighted = choices[ctrl.activeIndex];
          var posY = highlighted.offsetTop + highlighted.clientHeight - container[0].scrollTop;
          var height = container[0].offsetHeight;
          if (posY > height) {
            container[0].scrollTop += posY - height;
          } else if (posY < highlighted.clientHeight) {
            if (ctrl.isGrouped && ctrl.activeIndex === 0)
              container[0].scrollTop = 0;
            else
              container[0].scrollTop -= highlighted.clientHeight - posY;
          }
        }
        $scope.$on('$destroy', function() {
          ctrl.searchInput.off('keyup keydown tagged blur paste');
        });
      }]);
      uis.directive('uiSelect', ['$document', 'uiSelectConfig', 'uiSelectMinErr', 'uisOffset', '$compile', '$parse', '$timeout', function($document, uiSelectConfig, uiSelectMinErr, uisOffset, $compile, $parse, $timeout) {
        return {
          restrict: 'EA',
          templateUrl: function(tElement, tAttrs) {
            var theme = tAttrs.theme || uiSelectConfig.theme;
            return theme + (angular.isDefined(tAttrs.multiple) ? '/select-multiple.tpl.html' : '/select.tpl.html');
          },
          replace: true,
          transclude: true,
          require: ['uiSelect', '^ngModel'],
          scope: true,
          controller: 'uiSelectCtrl',
          controllerAs: '$select',
          compile: function(tElement, tAttrs) {
            var match = /{(.*)}\s*{(.*)}/.exec(tAttrs.ngClass);
            if (match) {
              var combined = '{' + match[1] + ', ' + match[2] + '}';
              tAttrs.ngClass = combined;
              tElement.attr('ng-class', combined);
            }
            if (angular.isDefined(tAttrs.multiple))
              tElement.append('<ui-select-multiple/>').removeAttr('multiple');
            else
              tElement.append('<ui-select-single/>');
            if (tAttrs.inputId)
              tElement.querySelectorAll('input.ui-select-search')[0].id = tAttrs.inputId;
            return function(scope, element, attrs, ctrls, transcludeFn) {
              var $select = ctrls[0];
              var ngModel = ctrls[1];
              $select.generatedId = uiSelectConfig.generateId();
              $select.baseTitle = attrs.title || 'Select box';
              $select.focusserTitle = $select.baseTitle + ' focus';
              $select.focusserId = 'focusser-' + $select.generatedId;
              $select.closeOnSelect = function() {
                if (angular.isDefined(attrs.closeOnSelect)) {
                  return $parse(attrs.closeOnSelect)();
                } else {
                  return uiSelectConfig.closeOnSelect;
                }
              }();
              $select.onSelectCallback = $parse(attrs.onSelect);
              $select.onRemoveCallback = $parse(attrs.onRemove);
              $select.limit = (angular.isDefined(attrs.limit)) ? parseInt(attrs.limit, 10) : undefined;
              $select.ngModel = ngModel;
              $select.choiceGrouped = function(group) {
                return $select.isGrouped && group && group.name;
              };
              if (attrs.tabindex) {
                attrs.$observe('tabindex', function(value) {
                  $select.focusInput.attr('tabindex', value);
                  element.removeAttr('tabindex');
                });
              }
              scope.$watch('searchEnabled', function() {
                var searchEnabled = scope.$eval(attrs.searchEnabled);
                $select.searchEnabled = searchEnabled !== undefined ? searchEnabled : uiSelectConfig.searchEnabled;
              });
              scope.$watch('sortable', function() {
                var sortable = scope.$eval(attrs.sortable);
                $select.sortable = sortable !== undefined ? sortable : uiSelectConfig.sortable;
              });
              attrs.$observe('disabled', function() {
                $select.disabled = attrs.disabled !== undefined ? attrs.disabled : false;
              });
              attrs.$observe('resetSearchInput', function() {
                var resetSearchInput = scope.$eval(attrs.resetSearchInput);
                $select.resetSearchInput = resetSearchInput !== undefined ? resetSearchInput : true;
              });
              attrs.$observe('paste', function() {
                $select.paste = scope.$eval(attrs.paste);
              });
              attrs.$observe('tagging', function() {
                if (attrs.tagging !== undefined) {
                  var taggingEval = scope.$eval(attrs.tagging);
                  $select.tagging = {
                    isActivated: true,
                    fct: taggingEval !== true ? taggingEval : undefined
                  };
                } else {
                  $select.tagging = {
                    isActivated: false,
                    fct: undefined
                  };
                }
              });
              attrs.$observe('taggingLabel', function() {
                if (attrs.tagging !== undefined) {
                  if (attrs.taggingLabel === 'false') {
                    $select.taggingLabel = false;
                  } else {
                    $select.taggingLabel = attrs.taggingLabel !== undefined ? attrs.taggingLabel : '(new)';
                  }
                }
              });
              attrs.$observe('taggingTokens', function() {
                if (attrs.tagging !== undefined) {
                  var tokens = attrs.taggingTokens !== undefined ? attrs.taggingTokens.split('|') : [',', 'ENTER'];
                  $select.taggingTokens = {
                    isActivated: true,
                    tokens: tokens
                  };
                }
              });
              if (angular.isDefined(attrs.autofocus)) {
                $timeout(function() {
                  $select.setFocus();
                });
              }
              if (angular.isDefined(attrs.focusOn)) {
                scope.$on(attrs.focusOn, function() {
                  $timeout(function() {
                    $select.setFocus();
                  });
                });
              }
              function onDocumentClick(e) {
                if (!$select.open)
                  return;
                var contains = false;
                if (window.jQuery) {
                  contains = window.jQuery.contains(element[0], e.target);
                } else {
                  contains = element[0].contains(e.target);
                }
                if (!contains && !$select.clickTriggeredSelect) {
                  var focusableControls = ['input', 'button', 'textarea', 'select'];
                  var targetController = angular.element(e.target).controller('uiSelect');
                  var skipFocusser = targetController && targetController !== $select;
                  if (!skipFocusser)
                    skipFocusser = ~focusableControls.indexOf(e.target.tagName.toLowerCase());
                  $select.close(skipFocusser);
                  scope.$digest();
                }
                $select.clickTriggeredSelect = false;
              }
              $document.on('click', onDocumentClick);
              scope.$on('$destroy', function() {
                $document.off('click', onDocumentClick);
              });
              transcludeFn(scope, function(clone) {
                var transcluded = angular.element('<div>').append(clone);
                var transcludedMatch = transcluded.querySelectorAll('.ui-select-match');
                transcludedMatch.removeAttr('ui-select-match');
                transcludedMatch.removeAttr('data-ui-select-match');
                if (transcludedMatch.length !== 1) {
                  throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-match but got '{0}'.", transcludedMatch.length);
                }
                element.querySelectorAll('.ui-select-match').replaceWith(transcludedMatch);
                var transcludedChoices = transcluded.querySelectorAll('.ui-select-choices');
                transcludedChoices.removeAttr('ui-select-choices');
                transcludedChoices.removeAttr('data-ui-select-choices');
                if (transcludedChoices.length !== 1) {
                  throw uiSelectMinErr('transcluded', "Expected 1 .ui-select-choices but got '{0}'.", transcludedChoices.length);
                }
                element.querySelectorAll('.ui-select-choices').replaceWith(transcludedChoices);
              });
              var appendToBody = scope.$eval(attrs.appendToBody);
              if (appendToBody !== undefined ? appendToBody : uiSelectConfig.appendToBody) {
                scope.$watch('$select.open', function(isOpen) {
                  if (isOpen) {
                    positionDropdown();
                  } else {
                    resetDropdown();
                  }
                });
                scope.$on('$destroy', function() {
                  resetDropdown();
                });
              }
              var placeholder = null,
                  originalWidth = '';
              function positionDropdown() {
                var offset = uisOffset(element);
                placeholder = angular.element('<div class="ui-select-placeholder"></div>');
                placeholder[0].style.width = offset.width + 'px';
                placeholder[0].style.height = offset.height + 'px';
                element.after(placeholder);
                originalWidth = element[0].style.width;
                $document.find('body').append(element);
                element[0].style.position = 'absolute';
                element[0].style.left = offset.left + 'px';
                element[0].style.top = offset.top + 'px';
                element[0].style.width = offset.width + 'px';
              }
              function resetDropdown() {
                if (placeholder === null) {
                  return;
                }
                placeholder.replaceWith(element);
                placeholder = null;
                element[0].style.position = '';
                element[0].style.left = '';
                element[0].style.top = '';
                element[0].style.width = originalWidth;
                $select.setFocus();
              }
              var dropdown = null,
                  directionUpClassName = 'direction-up';
              scope.$watch('$select.open', function() {
                if ($select.dropdownPosition === 'auto' || $select.dropdownPosition === 'up') {
                  scope.calculateDropdownPos();
                }
              });
              var setDropdownPosUp = function(offset, offsetDropdown) {
                offset = offset || uisOffset(element);
                offsetDropdown = offsetDropdown || uisOffset(dropdown);
                dropdown[0].style.position = 'absolute';
                dropdown[0].style.top = (offsetDropdown.height * -1) + 'px';
                element.addClass(directionUpClassName);
              };
              var setDropdownPosDown = function(offset, offsetDropdown) {
                element.removeClass(directionUpClassName);
                offset = offset || uisOffset(element);
                offsetDropdown = offsetDropdown || uisOffset(dropdown);
                dropdown[0].style.position = '';
                dropdown[0].style.top = '';
              };
              scope.calculateDropdownPos = function() {
                if ($select.open) {
                  dropdown = angular.element(element).querySelectorAll('.ui-select-dropdown');
                  if (dropdown.length === 0) {
                    return;
                  }
                  dropdown[0].style.opacity = 0;
                  $timeout(function() {
                    if ($select.dropdownPosition === 'up') {
                      setDropdownPosUp();
                    } else {
                      element.removeClass(directionUpClassName);
                      var offset = uisOffset(element);
                      var offsetDropdown = uisOffset(dropdown);
                      var scrollTop = $document[0].documentElement.scrollTop || $document[0].body.scrollTop;
                      if (offset.top + offset.height + offsetDropdown.height > scrollTop + $document[0].documentElement.clientHeight) {
                        setDropdownPosUp(offset, offsetDropdown);
                      } else {
                        setDropdownPosDown(offset, offsetDropdown);
                      }
                    }
                    dropdown[0].style.opacity = 1;
                  });
                } else {
                  if (dropdown === null || dropdown.length === 0) {
                    return;
                  }
                  dropdown[0].style.position = '';
                  dropdown[0].style.top = '';
                  element.removeClass(directionUpClassName);
                }
              };
            };
          }
        };
      }]);
      uis.directive('uiSelectMatch', ['uiSelectConfig', function(uiSelectConfig) {
        return {
          restrict: 'EA',
          require: '^uiSelect',
          replace: true,
          transclude: true,
          templateUrl: function(tElement) {
            tElement.addClass('ui-select-match');
            var theme = tElement.parent().attr('theme') || uiSelectConfig.theme;
            var multi = tElement.parent().attr('multiple');
            return theme + (multi ? '/match-multiple.tpl.html' : '/match.tpl.html');
          },
          link: function(scope, element, attrs, $select) {
            $select.lockChoiceExpression = attrs.uiLockChoice;
            attrs.$observe('placeholder', function(placeholder) {
              $select.placeholder = placeholder !== undefined ? placeholder : uiSelectConfig.placeholder;
            });
            function setAllowClear(allow) {
              $select.allowClear = (angular.isDefined(allow)) ? (allow === '') ? true : (allow.toLowerCase() === 'true') : false;
            }
            attrs.$observe('allowClear', setAllowClear);
            setAllowClear(attrs.allowClear);
            if ($select.multiple) {
              $select.sizeSearchInput();
            }
          }
        };
      }]);
      uis.directive('uiSelectMultiple', ['uiSelectMinErr', '$timeout', function(uiSelectMinErr, $timeout) {
        return {
          restrict: 'EA',
          require: ['^uiSelect', '^ngModel'],
          controller: ['$scope', '$timeout', function($scope, $timeout) {
            var ctrl = this,
                $select = $scope.$select,
                ngModel;
            if (angular.isUndefined($select.selected))
              $select.selected = [];
            $scope.$evalAsync(function() {
              ngModel = $scope.ngModel;
            });
            ctrl.activeMatchIndex = -1;
            ctrl.updateModel = function() {
              ngModel.$setViewValue(Date.now());
              ctrl.refreshComponent();
            };
            ctrl.refreshComponent = function() {
              $select.refreshItems();
              $select.sizeSearchInput();
            };
            ctrl.removeChoice = function(index) {
              var removedChoice = $select.selected[index];
              if (removedChoice._uiSelectChoiceLocked)
                return;
              var locals = {};
              locals[$select.parserResult.itemName] = removedChoice;
              $select.selected.splice(index, 1);
              ctrl.activeMatchIndex = -1;
              $select.sizeSearchInput();
              $timeout(function() {
                $select.onRemoveCallback($scope, {
                  $item: removedChoice,
                  $model: $select.parserResult.modelMapper($scope, locals)
                });
              });
              ctrl.updateModel();
            };
            ctrl.getPlaceholder = function() {
              if ($select.selected && $select.selected.length)
                return;
              return $select.placeholder;
            };
          }],
          controllerAs: '$selectMultiple',
          link: function(scope, element, attrs, ctrls) {
            var $select = ctrls[0];
            var ngModel = scope.ngModel = ctrls[1];
            var $selectMultiple = scope.$selectMultiple;
            $select.multiple = true;
            $select.removeSelected = true;
            $select.focusInput = $select.searchInput;
            ngModel.$parsers.unshift(function() {
              var locals = {},
                  result,
                  resultMultiple = [];
              for (var j = $select.selected.length - 1; j >= 0; j--) {
                locals = {};
                locals[$select.parserResult.itemName] = $select.selected[j];
                result = $select.parserResult.modelMapper(scope, locals);
                resultMultiple.unshift(result);
              }
              return resultMultiple;
            });
            ngModel.$formatters.unshift(function(inputValue) {
              var data = $select.parserResult.source(scope, {$select: {search: ''}}),
                  locals = {},
                  result;
              if (!data)
                return inputValue;
              var resultMultiple = [];
              var checkFnMultiple = function(list, value) {
                if (!list || !list.length)
                  return;
                for (var p = list.length - 1; p >= 0; p--) {
                  locals[$select.parserResult.itemName] = list[p];
                  result = $select.parserResult.modelMapper(scope, locals);
                  if ($select.parserResult.trackByExp) {
                    var propsItemNameMatches = /(\w*)\./.exec($select.parserResult.trackByExp);
                    var matches = /\.([^\s]+)/.exec($select.parserResult.trackByExp);
                    if (propsItemNameMatches && propsItemNameMatches.length > 0 && propsItemNameMatches[1] == $select.parserResult.itemName) {
                      if (matches && matches.length > 0 && result[matches[1]] == value[matches[1]]) {
                        resultMultiple.unshift(list[p]);
                        return true;
                      }
                    }
                  }
                  if (angular.equals(result, value)) {
                    resultMultiple.unshift(list[p]);
                    return true;
                  }
                }
                return false;
              };
              if (!inputValue)
                return resultMultiple;
              for (var k = inputValue.length - 1; k >= 0; k--) {
                if (!checkFnMultiple($select.selected, inputValue[k])) {
                  if (!checkFnMultiple(data, inputValue[k])) {
                    resultMultiple.unshift(inputValue[k]);
                  }
                }
              }
              return resultMultiple;
            });
            scope.$watchCollection(function() {
              return ngModel.$modelValue;
            }, function(newValue, oldValue) {
              if (oldValue != newValue) {
                ngModel.$modelValue = null;
                $selectMultiple.refreshComponent();
              }
            });
            ngModel.$render = function() {
              if (!angular.isArray(ngModel.$viewValue)) {
                if (angular.isUndefined(ngModel.$viewValue) || ngModel.$viewValue === null) {
                  $select.selected = [];
                } else {
                  throw uiSelectMinErr('multiarr', "Expected model value to be array but got '{0}'", ngModel.$viewValue);
                }
              }
              $select.selected = ngModel.$viewValue;
              scope.$evalAsync();
            };
            scope.$on('uis:select', function(event, item) {
              if ($select.selected.length >= $select.limit) {
                return;
              }
              $select.selected.push(item);
              $selectMultiple.updateModel();
            });
            scope.$on('uis:activate', function() {
              $selectMultiple.activeMatchIndex = -1;
            });
            scope.$watch('$select.disabled', function(newValue, oldValue) {
              if (oldValue && !newValue)
                $select.sizeSearchInput();
            });
            $select.searchInput.on('keydown', function(e) {
              var key = e.which;
              scope.$apply(function() {
                var processed = false;
                if (KEY.isHorizontalMovement(key)) {
                  processed = _handleMatchSelection(key);
                }
                if (processed && key != KEY.TAB) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              });
            });
            function _getCaretPosition(el) {
              if (angular.isNumber(el.selectionStart))
                return el.selectionStart;
              else
                return el.value.length;
            }
            function _handleMatchSelection(key) {
              var caretPosition = _getCaretPosition($select.searchInput[0]),
                  length = $select.selected.length,
                  first = 0,
                  last = length - 1,
                  curr = $selectMultiple.activeMatchIndex,
                  next = $selectMultiple.activeMatchIndex + 1,
                  prev = $selectMultiple.activeMatchIndex - 1,
                  newIndex = curr;
              if (caretPosition > 0 || ($select.search.length && key == KEY.RIGHT))
                return false;
              $select.close();
              function getNewActiveMatchIndex() {
                switch (key) {
                  case KEY.LEFT:
                    if (~$selectMultiple.activeMatchIndex)
                      return prev;
                    else
                      return last;
                    break;
                  case KEY.RIGHT:
                    if (!~$selectMultiple.activeMatchIndex || curr === last) {
                      $select.activate();
                      return false;
                    } else
                      return next;
                    break;
                  case KEY.BACKSPACE:
                    if (~$selectMultiple.activeMatchIndex) {
                      $selectMultiple.removeChoice(curr);
                      return prev;
                    } else
                      return last;
                    break;
                  case KEY.DELETE:
                    if (~$selectMultiple.activeMatchIndex) {
                      $selectMultiple.removeChoice($selectMultiple.activeMatchIndex);
                      return curr;
                    } else
                      return false;
                }
              }
              newIndex = getNewActiveMatchIndex();
              if (!$select.selected.length || newIndex === false)
                $selectMultiple.activeMatchIndex = -1;
              else
                $selectMultiple.activeMatchIndex = Math.min(last, Math.max(first, newIndex));
              return true;
            }
            $select.searchInput.on('keyup', function(e) {
              if (!KEY.isVerticalMovement(e.which)) {
                scope.$evalAsync(function() {
                  $select.activeIndex = $select.taggingLabel === false ? -1 : 0;
                });
              }
              if ($select.tagging.isActivated && $select.search.length > 0) {
                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || KEY.isVerticalMovement(e.which)) {
                  return;
                }
                $select.activeIndex = $select.taggingLabel === false ? -1 : 0;
                if ($select.taggingLabel === false)
                  return;
                var items = angular.copy($select.items);
                var stashArr = angular.copy($select.items);
                var newItem;
                var item;
                var hasTag = false;
                var dupeIndex = -1;
                var tagItems;
                var tagItem;
                if ($select.tagging.fct !== undefined) {
                  tagItems = $select.$filter('filter')(items, {'isTag': true});
                  if (tagItems.length > 0) {
                    tagItem = tagItems[0];
                  }
                  if (items.length > 0 && tagItem) {
                    hasTag = true;
                    items = items.slice(1, items.length);
                    stashArr = stashArr.slice(1, stashArr.length);
                  }
                  newItem = $select.tagging.fct($select.search);
                  newItem.isTag = true;
                  if (stashArr.filter(function(origItem) {
                    return angular.equals(origItem, $select.tagging.fct($select.search));
                  }).length > 0) {
                    return;
                  }
                  newItem.isTag = true;
                } else {
                  tagItems = $select.$filter('filter')(items, function(item) {
                    return item.match($select.taggingLabel);
                  });
                  if (tagItems.length > 0) {
                    tagItem = tagItems[0];
                  }
                  item = items[0];
                  if (item !== undefined && items.length > 0 && tagItem) {
                    hasTag = true;
                    items = items.slice(1, items.length);
                    stashArr = stashArr.slice(1, stashArr.length);
                  }
                  newItem = $select.search + ' ' + $select.taggingLabel;
                  if (_findApproxDupe($select.selected, $select.search) > -1) {
                    return;
                  }
                  if (_findCaseInsensitiveDupe(stashArr.concat($select.selected))) {
                    if (hasTag) {
                      items = stashArr;
                      scope.$evalAsync(function() {
                        $select.activeIndex = 0;
                        $select.items = items;
                      });
                    }
                    return;
                  }
                  if (_findCaseInsensitiveDupe(stashArr)) {
                    if (hasTag) {
                      $select.items = stashArr.slice(1, stashArr.length);
                    }
                    return;
                  }
                }
                if (hasTag)
                  dupeIndex = _findApproxDupe($select.selected, newItem);
                if (dupeIndex > -1) {
                  items = items.slice(dupeIndex + 1, items.length - 1);
                } else {
                  items = [];
                  items.push(newItem);
                  items = items.concat(stashArr);
                }
                scope.$evalAsync(function() {
                  $select.activeIndex = 0;
                  $select.items = items;
                });
              }
            });
            function _findCaseInsensitiveDupe(arr) {
              if (arr === undefined || $select.search === undefined) {
                return false;
              }
              var hasDupe = arr.filter(function(origItem) {
                if ($select.search.toUpperCase() === undefined || origItem === undefined) {
                  return false;
                }
                return origItem.toUpperCase() === $select.search.toUpperCase();
              }).length > 0;
              return hasDupe;
            }
            function _findApproxDupe(haystack, needle) {
              var dupeIndex = -1;
              if (angular.isArray(haystack)) {
                var tempArr = angular.copy(haystack);
                for (var i = 0; i < tempArr.length; i++) {
                  if ($select.tagging.fct === undefined) {
                    if (tempArr[i] + ' ' + $select.taggingLabel === needle) {
                      dupeIndex = i;
                    }
                  } else {
                    var mockObj = tempArr[i];
                    if (angular.isObject(mockObj)) {
                      mockObj.isTag = true;
                    }
                    if (angular.equals(mockObj, needle)) {
                      dupeIndex = i;
                    }
                  }
                }
              }
              return dupeIndex;
            }
            $select.searchInput.on('blur', function() {
              $timeout(function() {
                $selectMultiple.activeMatchIndex = -1;
              });
            });
          }
        };
      }]);
      uis.directive('uiSelectSingle', ['$timeout', '$compile', function($timeout, $compile) {
        return {
          restrict: 'EA',
          require: ['^uiSelect', '^ngModel'],
          link: function(scope, element, attrs, ctrls) {
            var $select = ctrls[0];
            var ngModel = ctrls[1];
            ngModel.$parsers.unshift(function(inputValue) {
              var locals = {},
                  result;
              locals[$select.parserResult.itemName] = inputValue;
              result = $select.parserResult.modelMapper(scope, locals);
              return result;
            });
            ngModel.$formatters.unshift(function(inputValue) {
              var data = $select.parserResult.source(scope, {$select: {search: ''}}),
                  locals = {},
                  result;
              if (data) {
                var checkFnSingle = function(d) {
                  locals[$select.parserResult.itemName] = d;
                  result = $select.parserResult.modelMapper(scope, locals);
                  return result == inputValue;
                };
                if ($select.selected && checkFnSingle($select.selected)) {
                  return $select.selected;
                }
                for (var i = data.length - 1; i >= 0; i--) {
                  if (checkFnSingle(data[i]))
                    return data[i];
                }
              }
              return inputValue;
            });
            scope.$watch('$select.selected', function(newValue) {
              if (ngModel.$viewValue !== newValue) {
                ngModel.$setViewValue(newValue);
              }
            });
            ngModel.$render = function() {
              $select.selected = ngModel.$viewValue;
            };
            scope.$on('uis:select', function(event, item) {
              $select.selected = item;
            });
            scope.$on('uis:close', function(event, skipFocusser) {
              $timeout(function() {
                $select.focusser.prop('disabled', false);
                if (!skipFocusser)
                  $select.focusser[0].focus();
              }, 0, false);
            });
            scope.$on('uis:activate', function() {
              focusser.prop('disabled', true);
            });
            var focusser = angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");
            $compile(focusser)(scope);
            $select.focusser = focusser;
            $select.focusInput = focusser;
            element.parent().append(focusser);
            focusser.bind("focus", function() {
              scope.$evalAsync(function() {
                $select.focus = true;
              });
            });
            focusser.bind("blur", function() {
              scope.$evalAsync(function() {
                $select.focus = false;
              });
            });
            focusser.bind("keydown", function(e) {
              if (e.which === KEY.BACKSPACE) {
                e.preventDefault();
                e.stopPropagation();
                $select.select(undefined);
                scope.$apply();
                return;
              }
              if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                return;
              }
              if (e.which == KEY.DOWN || e.which == KEY.UP || e.which == KEY.ENTER || e.which == KEY.SPACE) {
                e.preventDefault();
                e.stopPropagation();
                $select.activate();
              }
              scope.$digest();
            });
            focusser.bind("keyup input", function(e) {
              if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC || e.which == KEY.ENTER || e.which === KEY.BACKSPACE) {
                return;
              }
              $select.activate(focusser.val());
              focusser.val('');
              scope.$digest();
            });
          }
        };
      }]);
      uis.directive('uiSelectSort', ['$timeout', 'uiSelectConfig', 'uiSelectMinErr', function($timeout, uiSelectConfig, uiSelectMinErr) {
        return {
          require: '^^uiSelect',
          link: function(scope, element, attrs, $select) {
            if (scope[attrs.uiSelectSort] === null) {
              throw uiSelectMinErr('sort', 'Expected a list to sort');
            }
            var options = angular.extend({axis: 'horizontal'}, scope.$eval(attrs.uiSelectSortOptions));
            var axis = options.axis;
            var draggingClassName = 'dragging';
            var droppingClassName = 'dropping';
            var droppingBeforeClassName = 'dropping-before';
            var droppingAfterClassName = 'dropping-after';
            scope.$watch(function() {
              return $select.sortable;
            }, function(newValue) {
              if (newValue) {
                element.attr('draggable', true);
              } else {
                element.removeAttr('draggable');
              }
            });
            element.on('dragstart', function(event) {
              element.addClass(draggingClassName);
              (event.dataTransfer || event.originalEvent.dataTransfer).setData('text/plain', scope.$index);
            });
            element.on('dragend', function() {
              element.removeClass(draggingClassName);
            });
            var move = function(from, to) {
              this.splice(to, 0, this.splice(from, 1)[0]);
            };
            var dragOverHandler = function(event) {
              event.preventDefault();
              var offset = axis === 'vertical' ? event.offsetY || event.layerY || (event.originalEvent ? event.originalEvent.offsetY : 0) : event.offsetX || event.layerX || (event.originalEvent ? event.originalEvent.offsetX : 0);
              if (offset < (this[axis === 'vertical' ? 'offsetHeight' : 'offsetWidth'] / 2)) {
                element.removeClass(droppingAfterClassName);
                element.addClass(droppingBeforeClassName);
              } else {
                element.removeClass(droppingBeforeClassName);
                element.addClass(droppingAfterClassName);
              }
            };
            var dropTimeout;
            var dropHandler = function(event) {
              event.preventDefault();
              var droppedItemIndex = parseInt((event.dataTransfer || event.originalEvent.dataTransfer).getData('text/plain'), 10);
              $timeout.cancel(dropTimeout);
              dropTimeout = $timeout(function() {
                _dropHandler(droppedItemIndex);
              }, 20);
            };
            var _dropHandler = function(droppedItemIndex) {
              var theList = scope.$eval(attrs.uiSelectSort);
              var itemToMove = theList[droppedItemIndex];
              var newIndex = null;
              if (element.hasClass(droppingBeforeClassName)) {
                if (droppedItemIndex < scope.$index) {
                  newIndex = scope.$index - 1;
                } else {
                  newIndex = scope.$index;
                }
              } else {
                if (droppedItemIndex < scope.$index) {
                  newIndex = scope.$index;
                } else {
                  newIndex = scope.$index + 1;
                }
              }
              move.apply(theList, [droppedItemIndex, newIndex]);
              scope.$apply(function() {
                scope.$emit('uiSelectSort:change', {
                  array: theList,
                  item: itemToMove,
                  from: droppedItemIndex,
                  to: newIndex
                });
              });
              element.removeClass(droppingClassName);
              element.removeClass(droppingBeforeClassName);
              element.removeClass(droppingAfterClassName);
              element.off('drop', dropHandler);
            };
            element.on('dragenter', function() {
              if (element.hasClass(draggingClassName)) {
                return;
              }
              element.addClass(droppingClassName);
              element.on('dragover', dragOverHandler);
              element.on('drop', dropHandler);
            });
            element.on('dragleave', function(event) {
              if (event.target != element) {
                return;
              }
              element.removeClass(droppingClassName);
              element.removeClass(droppingBeforeClassName);
              element.removeClass(droppingAfterClassName);
              element.off('dragover', dragOverHandler);
              element.off('drop', dropHandler);
            });
          }
        };
      }]);
      uis.service('uisRepeatParser', ['uiSelectMinErr', '$parse', function(uiSelectMinErr, $parse) {
        var self = this;
        self.parse = function(expression) {
          var match;
          var isObjectCollection = /\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)/.test(expression);
          match = expression.match(/^\s*(?:([\s\S]+?)\s+as\s+)?(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(([\w\.]+)?\s*(|\s*[\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
          if (!match) {
            throw uiSelectMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", expression);
          }
          if (!match[6] && isObjectCollection) {
            throw uiSelectMinErr('iexp', "Expected expression in form of '_item_ as (_key_, _item_) in _ObjCollection_ [ track by _id_]' but got '{0}'.", expression);
          }
          return {
            itemName: match[4] || match[2],
            keyName: match[3],
            source: $parse(!match[3] ? match[5] : match[6]),
            sourceName: match[6],
            filters: match[7],
            trackByExp: match[8],
            modelMapper: $parse(match[1] || match[4] || match[2]),
            repeatExpression: function(grouped) {
              var expression = this.itemName + ' in ' + (grouped ? '$group.items' : '$select.items');
              if (this.trackByExp) {
                expression += ' track by ' + this.trackByExp;
              }
              return expression;
            }
          };
        };
        self.getGroupNgRepeatExpression = function() {
          return '$group in $select.groups';
        };
      }]);
    }());
    angular.module("ui.select").run(["$templateCache", function($templateCache) {
      $templateCache.put("bootstrap/choices.tpl.html", "<ul class=\"ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu\" role=\"listbox\" ng-show=\"$select.items.length > 0\"><li class=\"ui-select-choices-group\" id=\"ui-select-choices-{{ $select.generatedId }}\"><div class=\"divider\" ng-show=\"$select.isGrouped && $index > 0\"></div><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label dropdown-header\" ng-bind=\"$group.name\"></div><div id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\" role=\"option\"><a href=\"\" class=\"ui-select-choices-row-inner\"></a></div></li></ul>");
      $templateCache.put("bootstrap/match-multiple.tpl.html", "<span class=\"ui-select-match\"><span ng-repeat=\"$item in $select.selected\"><span class=\"ui-select-match-item btn btn-default btn-xs\" tabindex=\"-1\" type=\"button\" ng-disabled=\"$select.disabled\" ng-click=\"$selectMultiple.activeMatchIndex = $index;\" ng-class=\"{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span class=\"close ui-select-match-close\" ng-hide=\"$select.disabled\" ng-click=\"$selectMultiple.removeChoice($index)\">&nbsp;&times;</span> <span uis-transclude-append=\"\"></span></span></span></span>");
      $templateCache.put("bootstrap/match.tpl.html", "<div class=\"ui-select-match\" ng-hide=\"$select.open\" ng-disabled=\"$select.disabled\" ng-class=\"{\'btn-default-focus\':$select.focus}\"><span tabindex=\"-1\" class=\"btn btn-default form-control ui-select-toggle\" aria-label=\"{{ $select.baseTitle }} activate\" ng-disabled=\"$select.disabled\" ng-click=\"$select.activate()\" style=\"outline: 0;\"><span ng-show=\"$select.isEmpty()\" class=\"ui-select-placeholder text-muted\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"ui-select-match-text pull-left\" ng-class=\"{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}\" ng-transclude=\"\"></span> <i class=\"caret pull-right\" ng-click=\"$select.toggle($event)\"></i> <a ng-show=\"$select.allowClear && !$select.isEmpty()\" aria-label=\"{{ $select.baseTitle }} clear\" style=\"margin-right: 10px\" ng-click=\"$select.clear($event)\" class=\"btn btn-xs btn-link pull-right\"><i class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></i></a></span></div>");
      $templateCache.put("bootstrap/select-multiple.tpl.html", "<div class=\"ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control\" ng-class=\"{open: $select.open}\"><div><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"false\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" class=\"ui-select-search input-xs\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-click=\"$select.activate()\" ng-model=\"$select.search\" role=\"combobox\" aria-label=\"{{ $select.baseTitle }}\" ondrop=\"return false;\"></div><div class=\"ui-select-choices\"></div></div>");
      $templateCache.put("bootstrap/select.tpl.html", "<div class=\"ui-select-container ui-select-bootstrap dropdown\" ng-class=\"{open: $select.open}\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"false\" tabindex=\"-1\" aria-expanded=\"true\" aria-label=\"{{ $select.baseTitle }}\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"form-control ui-select-search\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-show=\"$select.searchEnabled && $select.open\"><div class=\"ui-select-choices\"></div></div>");
      $templateCache.put("select2/choices.tpl.html", "<ul class=\"ui-select-choices ui-select-choices-content select2-results\"><li class=\"ui-select-choices-group\" ng-class=\"{\'select2-result-with-children\': $select.choiceGrouped($group) }\"><div ng-show=\"$select.choiceGrouped($group)\" class=\"ui-select-choices-group-label select2-result-label\" ng-bind=\"$group.name\"></div><ul role=\"listbox\" id=\"ui-select-choices-{{ $select.generatedId }}\" ng-class=\"{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }\"><li role=\"option\" id=\"ui-select-choices-row-{{ $select.generatedId }}-{{$index}}\" class=\"ui-select-choices-row\" ng-class=\"{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}\"><div class=\"select2-result-label ui-select-choices-row-inner\"></div></li></ul></li></ul>");
      $templateCache.put("select2/match-multiple.tpl.html", "<span class=\"ui-select-match\"><li class=\"ui-select-match-item select2-search-choice\" ng-repeat=\"$item in $select.selected\" ng-class=\"{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}\" ui-select-sort=\"$select.selected\"><span uis-transclude-append=\"\"></span> <a href=\"javascript:;\" class=\"ui-select-match-close select2-search-choice-close\" ng-click=\"$selectMultiple.removeChoice($index)\" tabindex=\"-1\"></a></li></span>");
      $templateCache.put("select2/match.tpl.html", "<a class=\"select2-choice ui-select-match\" ng-class=\"{\'select2-default\': $select.isEmpty()}\" ng-click=\"$select.toggle($event)\" aria-label=\"{{ $select.baseTitle }} select\"><span ng-show=\"$select.isEmpty()\" class=\"select2-chosen\">{{$select.placeholder}}</span> <span ng-hide=\"$select.isEmpty()\" class=\"select2-chosen\" ng-transclude=\"\"></span> <abbr ng-if=\"$select.allowClear && !$select.isEmpty()\" class=\"select2-search-choice-close\" ng-click=\"$select.clear($event)\"></abbr> <span class=\"select2-arrow ui-select-toggle\"><b></b></span></a>");
      $templateCache.put("select2/select-multiple.tpl.html", "<div class=\"ui-select-container ui-select-multiple select2 select2-container select2-container-multi\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}\"><ul class=\"select2-choices\"><span class=\"ui-select-match\"></span><li class=\"select2-search-field\"><input type=\"text\" autocomplete=\"false\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"select2-input ui-select-search\" placeholder=\"{{$selectMultiple.getPlaceholder()}}\" ng-disabled=\"$select.disabled\" ng-hide=\"$select.disabled\" ng-model=\"$select.search\" ng-click=\"$select.activate()\" style=\"width: 34px;\" ondrop=\"return false;\"></li></ul><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"ui-select-choices\"></div></div></div>");
      $templateCache.put("select2/select.tpl.html", "<div class=\"ui-select-container select2 select2-container\" ng-class=\"{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}\"><div class=\"ui-select-match\"></div><div class=\"ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active\" ng-class=\"{\'select2-display-none\': !$select.open}\"><div class=\"select2-search\" ng-show=\"$select.searchEnabled\"><input type=\"text\" autocomplete=\"false\" autocorrect=\"false\" autocapitalize=\"off\" spellcheck=\"false\" role=\"combobox\" aria-expanded=\"true\" aria-owns=\"ui-select-choices-{{ $select.generatedId }}\" aria-label=\"{{ $select.baseTitle }}\" aria-activedescendant=\"ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}\" class=\"ui-select-search select2-input\" ng-model=\"$select.search\"></div><div class=\"ui-select-choices\"></div></div></div>");
      $templateCache.put("selectize/choices.tpl.html", "<div ng-show=\"$select.open\" class=\"ui-select-choices ui-select-dropdown selectize-dropdown single\"><div class=\"ui-select-choices-content selectize-dropdown-content\"><div class=\"ui-select-choices-group optgroup\" role=\"listbox\"><div ng-show=\"$select.isGrouped\" class=\"ui-select-choices-group-label optgroup-header\" ng-bind=\"$group.name\"></div><div role=\"option\" class=\"ui-select-choices-row\" ng-class=\"{active: $select.isActive(this), disabled: $select.isDisabled(this)}\"><div class=\"option ui-select-choices-row-inner\" data-selectable=\"\"></div></div></div></div></div>");
      $templateCache.put("selectize/match.tpl.html", "<div ng-hide=\"($select.open || $select.isEmpty())\" class=\"ui-select-match\" ng-transclude=\"\"></div>");
      $templateCache.put("selectize/select.tpl.html", "<div class=\"ui-select-container selectize-control single\" ng-class=\"{\'open\': $select.open}\"><div class=\"selectize-input\" ng-class=\"{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}\" ng-click=\"$select.open && !$select.searchEnabled ? $select.toggle($event) : $select.activate()\"><div class=\"ui-select-match\"></div><input type=\"text\" autocomplete=\"false\" tabindex=\"-1\" class=\"ui-select-search ui-select-toggle\" ng-click=\"$select.toggle($event)\" placeholder=\"{{$select.placeholder}}\" ng-model=\"$select.search\" ng-hide=\"!$select.searchEnabled || ($select.selected && !$select.open)\" ng-disabled=\"$select.disabled\" aria-label=\"{{ $select.baseTitle }}\"></div><div class=\"ui-select-choices\"></div></div>");
    }]);
  })();
  return _retrieveGlobal();
});

System.registerDynamic("node_modules/ui-select/index", ["./dist/select.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('./dist/select.js');
  module.exports = 'ui.select';
  return module.exports;
});

System.registerDynamic("components/components/select/select.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"field\" ng-class=\"{ 'error': select.ngModel.$invalid }\">\r\n\t<label ng-show=\"select.selection\" class=\"label-slide angular-animate\">\r\n\t\t{{::select.label}}\r\n\t</label>\r\n\t<ui-select ng-model=\"select.selection\" search-enabled=\"false\" theme=\"bootstrap\" ng-disabled=\"select.ngDisabled\">\r\n\t\t<ui-select-match placeholder=\"{{::select.label}}\">{{select.getDisplayName($select.selected)}}</ui-select-match>\r\n\t\t<ui-select-choices repeat=\"$item in select.options\">\r\n\t\t\t<div ng-switch=\"$item.__isNullOption\">\r\n\t\t\t\t<div ng-switch-when=\"true\">{{select.nullOption}}</div>\r\n\t\t\t\t<div ng-switch-default>\r\n\t\t\t\t\t<rl-template-renderer template=\"select.template\" rl-alias=\"$item as {{select.itemAs}}\"></rl-template-renderer>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</ui-select-choices>\r\n\t</ui-select>\r\n\t<span class=\"error-string angular-animate\" ng-if=\"select.inputValidator.error | isEmpty:false\">{{select.inputValidator.error}}</span>\r\n\t<rl-busy loading=\"select.loading\"></rl-busy>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/select/select", ["ui-select", "angular", "lodash", "typescript-angular-utilities", "../input/input", "../../services/componentValidator/componentValidator.service", "../../services/jquery/jquery.service", "./select.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  $__require('ui-select');
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  var input_1 = $__require('../input/input');
  var componentValidator_service_1 = $__require('../../services/componentValidator/componentValidator.service');
  var jquery_service_1 = $__require('../../services/jquery/jquery.service');
  exports.moduleName = 'rl.ui.components.select';
  exports.componentName = 'rlSelect';
  exports.controllerName = 'SelectController';
  var SelectController = (function(_super) {
    __extends(SelectController, _super);
    function SelectController($scope, $attrs, $q, $transclude, object, componentValidatorFactory, jqueryUtility) {
      var _this = this;
      _super.call(this, $scope, $attrs, componentValidatorFactory);
      this.$q = $q;
      this.object = object;
      this._nullOption = {__isNullOption: true};
      this.inputType = 'select';
      this.transform = this.transform || this.selector;
      if (!this.template) {
        $transclude(function(clone) {
          if (clone.length) {
            _this.template = jqueryUtility.getHtml(clone);
          } else {
            _this.template = '{{select.getDisplayName($item)}}';
          }
        });
      }
    }
    Object.defineProperty(SelectController.prototype, "selection", {
      get: function() {
        return this.ngModel.$viewValue;
      },
      set: function(value) {
        if (value.__isNullOption) {
          this.ngModel.$setViewValue(null);
        } else {
          this.ngModel.$setViewValue(value);
        }
        this.select({item: this.ngModel.$viewValue});
      },
      enumerable: true,
      configurable: true
    });
    SelectController.prototype.$onInit = function() {
      var _this = this;
      _super.prototype.$onInit.call(this);
      if (_.isUndefined(this.options)) {
        this.loading = true;
        this.loadItems().then(function(options) {
          _this.options = options;
          _this.loading = false;
        });
      } else {
        this.options = this.configureOptions(this.options);
      }
    };
    SelectController.prototype.getDisplayName = function(item) {
      return __transform.getValue(item, this.transform);
    };
    SelectController.prototype.loadItems = function() {
      var _this = this;
      var promise;
      promise = this.getOptions();
      if (promise == null) {
        promise = this.$q.when(this.options);
      }
      return promise.then(function(options) {
        return _this.configureOptions(options);
      });
    };
    SelectController.prototype.configureOptions = function(options) {
      if (!this.object.isNullOrWhitespace(this.nullOption)) {
        options.unshift(this._nullOption);
      }
      return options;
    };
    SelectController.$inject = ['$scope', '$attrs', '$q', '$transclude', typescript_angular_utilities_1.downgrade.objectServiceName, componentValidator_service_1.factoryName, jquery_service_1.serviceName];
    return SelectController;
  }(input_1.InputController));
  exports.SelectController = SelectController;
  var select = input_1.buildInput({
    transclude: true,
    template: $__require('./select.html'),
    controller: exports.controllerName,
    controllerAs: 'select',
    bindings: {
      options: '<?',
      getOptions: '&',
      transform: '<?',
      ngDisabled: '<?',
      nullOption: '@',
      select: '&',
      itemAs: '@',
      selector: '<?',
      template: '<?'
    }
  });
  angular.module(exports.moduleName, ['ui.select', typescript_angular_utilities_1.downgrade.moduleName, input_1.moduleName, jquery_service_1.moduleName]).component(exports.componentName, select).controller(exports.controllerName, SelectController);
  return module.exports;
});

(function() {
var define = System.amdDefine;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define("node_modules/signature_pad/signature_pad", [], function() {
      return (root['SignaturePad'] = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root['SignaturePad'] = factory();
  }
}(this, function() {
  var SignaturePad = (function(document) {
    "use strict";
    var SignaturePad = function(canvas, options) {
      var self = this,
          opts = options || {};
      this.velocityFilterWeight = opts.velocityFilterWeight || 0.7;
      this.minWidth = opts.minWidth || 0.5;
      this.maxWidth = opts.maxWidth || 2.5;
      this.dotSize = opts.dotSize || function() {
        return (this.minWidth + this.maxWidth) / 2;
      };
      this.penColor = opts.penColor || "black";
      this.backgroundColor = opts.backgroundColor || "rgba(0,0,0,0)";
      this.onEnd = opts.onEnd;
      this.onBegin = opts.onBegin;
      this._canvas = canvas;
      this._ctx = canvas.getContext("2d");
      this.clear();
      this._handleMouseDown = function(event) {
        if (event.which === 1) {
          self._mouseButtonDown = true;
          self._strokeBegin(event);
        }
      };
      this._handleMouseMove = function(event) {
        if (self._mouseButtonDown) {
          self._strokeUpdate(event);
        }
      };
      this._handleMouseUp = function(event) {
        if (event.which === 1 && self._mouseButtonDown) {
          self._mouseButtonDown = false;
          self._strokeEnd(event);
        }
      };
      this._handleTouchStart = function(event) {
        if (event.targetTouches.length == 1) {
          var touch = event.changedTouches[0];
          self._strokeBegin(touch);
        }
      };
      this._handleTouchMove = function(event) {
        event.preventDefault();
        var touch = event.targetTouches[0];
        self._strokeUpdate(touch);
      };
      this._handleTouchEnd = function(event) {
        var wasCanvasTouched = event.target === self._canvas;
        if (wasCanvasTouched) {
          event.preventDefault();
          self._strokeEnd(event);
        }
      };
      this._handleMouseEvents();
      this._handleTouchEvents();
    };
    SignaturePad.prototype.clear = function() {
      var ctx = this._ctx,
          canvas = this._canvas;
      ctx.fillStyle = this.backgroundColor;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this._reset();
    };
    SignaturePad.prototype.toDataURL = function(imageType, quality) {
      var canvas = this._canvas;
      return canvas.toDataURL.apply(canvas, arguments);
    };
    SignaturePad.prototype.fromDataURL = function(dataUrl) {
      var self = this,
          image = new Image(),
          ratio = window.devicePixelRatio || 1,
          width = this._canvas.width / ratio,
          height = this._canvas.height / ratio;
      this._reset();
      image.src = dataUrl;
      image.onload = function() {
        self._ctx.drawImage(image, 0, 0, width, height);
      };
      this._isEmpty = false;
    };
    SignaturePad.prototype._strokeUpdate = function(event) {
      var point = this._createPoint(event);
      this._addPoint(point);
    };
    SignaturePad.prototype._strokeBegin = function(event) {
      this._reset();
      this._strokeUpdate(event);
      if (typeof this.onBegin === 'function') {
        this.onBegin(event);
      }
    };
    SignaturePad.prototype._strokeDraw = function(point) {
      var ctx = this._ctx,
          dotSize = typeof(this.dotSize) === 'function' ? this.dotSize() : this.dotSize;
      ctx.beginPath();
      this._drawPoint(point.x, point.y, dotSize);
      ctx.closePath();
      ctx.fill();
    };
    SignaturePad.prototype._strokeEnd = function(event) {
      var canDrawCurve = this.points.length > 2,
          point = this.points[0];
      if (!canDrawCurve && point) {
        this._strokeDraw(point);
      }
      if (typeof this.onEnd === 'function') {
        this.onEnd(event);
      }
    };
    SignaturePad.prototype._handleMouseEvents = function() {
      this._mouseButtonDown = false;
      this._canvas.addEventListener("mousedown", this._handleMouseDown);
      this._canvas.addEventListener("mousemove", this._handleMouseMove);
      document.addEventListener("mouseup", this._handleMouseUp);
    };
    SignaturePad.prototype._handleTouchEvents = function() {
      this._canvas.style.msTouchAction = 'none';
      this._canvas.style.touchAction = 'none';
      this._canvas.addEventListener("touchstart", this._handleTouchStart);
      this._canvas.addEventListener("touchmove", this._handleTouchMove);
      this._canvas.addEventListener("touchend", this._handleTouchEnd);
    };
    SignaturePad.prototype.on = function() {
      this._handleMouseEvents();
      this._handleTouchEvents();
    };
    SignaturePad.prototype.off = function() {
      this._canvas.removeEventListener("mousedown", this._handleMouseDown);
      this._canvas.removeEventListener("mousemove", this._handleMouseMove);
      document.removeEventListener("mouseup", this._handleMouseUp);
      this._canvas.removeEventListener("touchstart", this._handleTouchStart);
      this._canvas.removeEventListener("touchmove", this._handleTouchMove);
      this._canvas.removeEventListener("touchend", this._handleTouchEnd);
    };
    SignaturePad.prototype.isEmpty = function() {
      return this._isEmpty;
    };
    SignaturePad.prototype._reset = function() {
      this.points = [];
      this._lastVelocity = 0;
      this._lastWidth = (this.minWidth + this.maxWidth) / 2;
      this._isEmpty = true;
      this._ctx.fillStyle = this.penColor;
    };
    SignaturePad.prototype._createPoint = function(event) {
      var rect = this._canvas.getBoundingClientRect();
      return new Point(event.clientX - rect.left, event.clientY - rect.top);
    };
    SignaturePad.prototype._addPoint = function(point) {
      var points = this.points,
          c2,
          c3,
          curve,
          tmp;
      points.push(point);
      if (points.length > 2) {
        if (points.length === 3)
          points.unshift(points[0]);
        tmp = this._calculateCurveControlPoints(points[0], points[1], points[2]);
        c2 = tmp.c2;
        tmp = this._calculateCurveControlPoints(points[1], points[2], points[3]);
        c3 = tmp.c1;
        curve = new Bezier(points[1], c2, c3, points[2]);
        this._addCurve(curve);
        points.shift();
      }
    };
    SignaturePad.prototype._calculateCurveControlPoints = function(s1, s2, s3) {
      var dx1 = s1.x - s2.x,
          dy1 = s1.y - s2.y,
          dx2 = s2.x - s3.x,
          dy2 = s2.y - s3.y,
          m1 = {
            x: (s1.x + s2.x) / 2.0,
            y: (s1.y + s2.y) / 2.0
          },
          m2 = {
            x: (s2.x + s3.x) / 2.0,
            y: (s2.y + s3.y) / 2.0
          },
          l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1),
          l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2),
          dxm = (m1.x - m2.x),
          dym = (m1.y - m2.y),
          k = l2 / (l1 + l2),
          cm = {
            x: m2.x + dxm * k,
            y: m2.y + dym * k
          },
          tx = s2.x - cm.x,
          ty = s2.y - cm.y;
      return {
        c1: new Point(m1.x + tx, m1.y + ty),
        c2: new Point(m2.x + tx, m2.y + ty)
      };
    };
    SignaturePad.prototype._addCurve = function(curve) {
      var startPoint = curve.startPoint,
          endPoint = curve.endPoint,
          velocity,
          newWidth;
      velocity = endPoint.velocityFrom(startPoint);
      velocity = this.velocityFilterWeight * velocity + (1 - this.velocityFilterWeight) * this._lastVelocity;
      newWidth = this._strokeWidth(velocity);
      this._drawCurve(curve, this._lastWidth, newWidth);
      this._lastVelocity = velocity;
      this._lastWidth = newWidth;
    };
    SignaturePad.prototype._drawPoint = function(x, y, size) {
      var ctx = this._ctx;
      ctx.moveTo(x, y);
      ctx.arc(x, y, size, 0, 2 * Math.PI, false);
      this._isEmpty = false;
    };
    SignaturePad.prototype._drawCurve = function(curve, startWidth, endWidth) {
      var ctx = this._ctx,
          widthDelta = endWidth - startWidth,
          drawSteps,
          width,
          i,
          t,
          tt,
          ttt,
          u,
          uu,
          uuu,
          x,
          y;
      drawSteps = Math.floor(curve.length());
      ctx.beginPath();
      for (i = 0; i < drawSteps; i++) {
        t = i / drawSteps;
        tt = t * t;
        ttt = tt * t;
        u = 1 - t;
        uu = u * u;
        uuu = uu * u;
        x = uuu * curve.startPoint.x;
        x += 3 * uu * t * curve.control1.x;
        x += 3 * u * tt * curve.control2.x;
        x += ttt * curve.endPoint.x;
        y = uuu * curve.startPoint.y;
        y += 3 * uu * t * curve.control1.y;
        y += 3 * u * tt * curve.control2.y;
        y += ttt * curve.endPoint.y;
        width = startWidth + ttt * widthDelta;
        this._drawPoint(x, y, width);
      }
      ctx.closePath();
      ctx.fill();
    };
    SignaturePad.prototype._strokeWidth = function(velocity) {
      return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
    };
    var Point = function(x, y, time) {
      this.x = x;
      this.y = y;
      this.time = time || new Date().getTime();
    };
    Point.prototype.velocityFrom = function(start) {
      return (this.time !== start.time) ? this.distanceTo(start) / (this.time - start.time) : 1;
    };
    Point.prototype.distanceTo = function(start) {
      return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
    };
    var Bezier = function(startPoint, control1, control2, endPoint) {
      this.startPoint = startPoint;
      this.control1 = control1;
      this.control2 = control2;
      this.endPoint = endPoint;
    };
    Bezier.prototype.length = function() {
      var steps = 10,
          length = 0,
          i,
          t,
          cx,
          cy,
          px,
          py,
          xdiff,
          ydiff;
      for (i = 0; i <= steps; i++) {
        t = i / steps;
        cx = this._point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
        cy = this._point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
        if (i > 0) {
          xdiff = cx - px;
          ydiff = cy - py;
          length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        }
        px = cx;
        py = cy;
      }
      return length;
    };
    Bezier.prototype._point = function(t, start, c1, c2, end) {
      return start * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * c1 * (1.0 - t) * (1.0 - t) * t + 3.0 * c2 * (1.0 - t) * t * t + end * t * t * t;
    };
    return SignaturePad;
  })(document);
  return SignaturePad;
}));

})();
System.registerDynamic("components/components/signaturePad/signaturePad", ["angular", "signature_pad"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var SignaturePad = $__require('signature_pad');
  exports.moduleName = 'rl.ui.components.signaturePad';
  exports.directiveName = 'rlSignaturePad';
  function signaturePad() {
    'use strict';
    return {
      restrict: 'E',
      require: 'ngModel',
      template: "\n\t\t\t<canvas class=\"signature-pad\" ng-if=\"!ngDisabled\"></canvas>\n\t\t\t<img ng-src=\"{{ngModel.$viewValue}}\" ng-style=\"style\" ng-if=\"ngDisabled\" />\n\t\t",
      scope: {
        pad: '=?',
        height: '=',
        width: '=',
        ngDisabled: '='
      },
      link: function(scope, element, attrs, ngModel) {
        scope.$watch('ngDisabled', function(disabled) {
          scope.ngModel = ngModel;
          if (disabled) {
            scope.style = {
              height: scope.height != null ? scope.height : 100,
              width: scope.width != null ? scope.width : 200
            };
          } else {
            var canvas = element.find('.signature-pad').get(0);
            var options = {backgroundColor: 'rgb(255, 255, 255)'};
            scope.pad = new SignaturePad(canvas, options);
            canvas.height = scope.height != null ? scope.height : 100;
            canvas.width = scope.width != null ? scope.width : 200;
            scope.$watch(function() {
              return ngModel.$viewValue;
            }, function(value) {
              if (value != null) {
                scope.pad.fromDataURL(value);
              }
            });
            scope.$watch(function() {
              return scope.pad.toDataURL();
            }, function(value) {
              if (value != null) {
                ngModel.$setViewValue(value);
              }
            });
          }
        });
      }
    };
  }
  exports.signaturePad = signaturePad;
  angular.module(exports.moduleName, []).directive(exports.directiveName, signaturePad);
  return module.exports;
});

System.registerDynamic("components/components/simpleCardList/simpleCard.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"card col-xs-12 {{card.cardType}}\" rl-alternating-class=\"card-odd\">\r\n\t<div class=\"header row\" ng-class=\"{ 'active': card.canOpen && !card.alwaysOpen, 'error': cardForm.$invalid }\" ng-click=\"card.toggleContent()\">\r\n\t\t<div ng-transclude=\"headerSlot\"></div>\r\n\t\t<div class=\"clearfix\"></div>\r\n\t</div>\r\n\r\n\t<ng-form name=\"cardForm\" rl-autosave=\"card.autosaveLink\" save=\"card.save()\" save-when-invalid=\"card.saveWhenInvalid\">\r\n\t\t<div ng-show=\"card.showContent || card.alwaysOpen\">\r\n\t\t\t<div class=\"body row\">\r\n\t\t\t\t<div ng-transclude=\"contentSlot\"></div>\r\n\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"footer row\">\r\n\t\t\t\t<div ng-transclude=\"footerSlot\"></div>\r\n\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</ng-form>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/simpleCardList/simpleCard", ["rxjs", "../../services/parentChild/parentChild.service", "./simpleCard.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var rxjs_1 = $__require('rxjs');
  var parentChild_service_1 = $__require('../../services/parentChild/parentChild.service');
  exports.componentName = 'rlSimpleCard';
  exports.controllerName = 'SimpleCardController';
  var SimpleCardController = (function() {
    function SimpleCardController(parentChild) {
      var _this = this;
      this.parentChild = parentChild;
      this.showContent = false;
      this.autosaveLink = {};
      this.close = function() {
        if (_this.showContent === false || _this.alwaysOpen) {
          return true;
        }
        return _this.autosave();
      };
    }
    SimpleCardController.prototype.$onInit = function() {
      if (this.canOpen == null) {
        this.canOpen = true;
      }
      if (this.listController == null) {
        this.listController = this.noList();
      }
      var behavior = {
        autosave: this.autosave.bind(this),
        close: this.close
      };
      this.listController.alwaysOpenChanges.subscribe(this.updateAlwaysOpen.bind(this));
      this.listController.registerCard(behavior);
      this.parentChild.registerChildBehavior(this.childLink, behavior);
      this.updateAlwaysOpen(this.alwaysOpen);
    };
    SimpleCardController.prototype.$onChanges = function(changes) {
      if (changes.alwaysOpen) {
        this.updateAlwaysOpen(changes.alwaysOpen.currentValue);
      }
    };
    SimpleCardController.prototype.toggleContent = function() {
      if (this.showContent) {
        this.close();
      } else {
        this.open();
      }
    };
    SimpleCardController.prototype.open = function() {
      if (this.canOpen && this.listController.openCard()) {
        this.showContent = true;
        this.onOpen();
      }
    };
    SimpleCardController.prototype.autosave = function() {
      var _this = this;
      return this.parentChild.triggerChildBehavior(this.autosaveLink, function(behavior) {
        var canClose = behavior.autosave();
        if (canClose) {
          _this.showContent = false;
        }
        return canClose;
      });
    };
    SimpleCardController.prototype.noList = function() {
      return {
        alwaysOpenChanges: new rxjs_1.Subject(),
        openCard: function() {
          return true;
        },
        registerCard: function(behavior) {
          return null;
        }
      };
    };
    SimpleCardController.prototype.updateAlwaysOpen = function(alwaysOpen) {
      if (alwaysOpen) {
        this.showContent = true;
      } else {
        this.close();
      }
    };
    SimpleCardController.$inject = [parentChild_service_1.serviceName];
    return SimpleCardController;
  }());
  exports.SimpleCardController = SimpleCardController;
  exports.simpleCard = {
    transclude: {
      'headerSlot': '?rlCardHeader',
      'contentSlot': '?rlCardContent',
      'footerSlot': '?rlCardFooter'
    },
    require: {listController: '?^^rlSimpleCardList'},
    template: $__require('./simpleCard.html'),
    controller: exports.controllerName,
    controllerAs: 'card',
    bindings: {
      onOpen: '&',
      canOpen: '<?',
      alwaysOpen: '<?',
      childLink: '=?',
      save: '&',
      saveWhenInvalid: '<?',
      cardType: '@'
    }
  };
  return module.exports;
});

System.registerDynamic("components/components/simpleCardList/simpleCardList", ["lodash", "rxjs"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var rxjs_1 = $__require('rxjs');
  exports.directiveName = 'rlSimpleCardList';
  exports.controllerName = 'SimpleCardListController';
  var SimpleCardListController = (function() {
    function SimpleCardListController($scope, $attrs, $parse) {
      this.cards = [];
      this.alwaysOpenChanges = new rxjs_1.Subject();
      $scope.$watch(function() {
        return $parse($attrs.alwaysOpen)($scope);
      }, this.alwaysOpenChange.bind(this));
      $attrs.$addClass('card-list');
    }
    SimpleCardListController.prototype.registerCard = function(behavior) {
      this.cards.push(behavior);
    };
    SimpleCardListController.prototype.openCard = function() {
      return _.every(this.cards, function(card) {
        return card.close();
      });
    };
    SimpleCardListController.prototype.alwaysOpenChange = function(value) {
      this.alwaysOpen = value;
      this.alwaysOpenChanges.next(value);
    };
    SimpleCardListController.$inject = ['$scope', '$attrs', '$parse'];
    return SimpleCardListController;
  }());
  exports.SimpleCardListController = SimpleCardListController;
  function simpleCardList() {
    'use strict';
    return {
      restrict: 'AE',
      controller: exports.controllerName
    };
  }
  exports.simpleCardList = simpleCardList;
  return module.exports;
});

System.registerDynamic("components/components/simpleCardList/simpleCardList.module", ["angular", "typescript-angular-utilities", "../../services/parentChild/parentChild.service", "./simpleCard", "./simpleCardList"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var parentChild_service_1 = $__require('../../services/parentChild/parentChild.service');
  var card = $__require('./simpleCard');
  exports.simpleCard = card;
  var list = $__require('./simpleCardList');
  exports.simpleCardList = list;
  exports.moduleName = 'rl.ui.components.simpleCardList';
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, parentChild_service_1.moduleName]).directive(list.directiveName, list.simpleCardList).controller(list.controllerName, list.SimpleCardListController).component(card.componentName, card.simpleCard).controller(card.controllerName, card.SimpleCardController);
  return module.exports;
});

System.registerDynamic("libraries/bootstrap-touchspin/jquery.bootstrap-touchspin", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    (function($) {
      'use strict';
      var _currentSpinnerId = 0;
      function _scopedEventName(name, id) {
        return name + '.touchspin_' + id;
      }
      function _scopeEventNames(names, id) {
        return $.map(names, function(name) {
          return _scopedEventName(name, id);
        });
      }
      $.fn.TouchSpin = function(options) {
        if (options === 'destroy') {
          this.each(function() {
            var originalinput = $(this),
                originalinput_data = originalinput.data();
            $(document).off(_scopeEventNames(['mouseup', 'touchend', 'touchcancel', 'mousemove', 'touchmove', 'scroll', 'scrollstart'], originalinput_data.spinnerid).join(' '));
          });
          return;
        }
        var defaults = {
          min: 0,
          max: 100,
          initval: '',
          step: 1,
          decimals: 0,
          stepinterval: 100,
          forcestepdivisibility: 'round',
          stepintervaldelay: 500,
          verticalbuttons: false,
          verticalupclass: 'glyphicon glyphicon-chevron-up',
          verticaldownclass: 'glyphicon glyphicon-chevron-down',
          prefix: '',
          postfix: '',
          prefix_extraclass: '',
          postfix_extraclass: '',
          booster: true,
          boostat: 10,
          maxboostedstep: false,
          mousewheel: true,
          buttondown_class: 'btn btn-default',
          buttonup_class: 'btn btn-default',
          buttondown_txt: '-',
          buttonup_txt: '+'
        };
        var attributeMap = {
          min: 'min',
          max: 'max',
          initval: 'init-val',
          step: 'step',
          decimals: 'decimals',
          stepinterval: 'step-interval',
          verticalbuttons: 'vertical-buttons',
          verticalupclass: 'vertical-up-class',
          verticaldownclass: 'vertical-down-class',
          forcestepdivisibility: 'force-step-divisibility',
          stepintervaldelay: 'step-interval-delay',
          prefix: 'prefix',
          postfix: 'postfix',
          prefix_extraclass: 'prefix-extra-class',
          postfix_extraclass: 'postfix-extra-class',
          booster: 'booster',
          boostat: 'boostat',
          maxboostedstep: 'max-boosted-step',
          mousewheel: 'mouse-wheel',
          buttondown_class: 'button-down-class',
          buttonup_class: 'button-up-class',
          buttondown_txt: 'button-down-txt',
          buttonup_txt: 'button-up-txt'
        };
        return this.each(function() {
          var settings,
              originalinput = $(this),
              originalinput_data = originalinput.data(),
              container,
              elements,
              value,
              downSpinTimer,
              upSpinTimer,
              downDelayTimeout,
              upDelayTimeout,
              spincount = 0,
              spinning = false;
          init();
          function init() {
            if (originalinput.data('alreadyinitialized')) {
              return;
            }
            originalinput.data('alreadyinitialized', true);
            _currentSpinnerId += 1;
            originalinput.data('spinnerid', _currentSpinnerId);
            if (!originalinput.is('input')) {
              console.log('Must be an input.');
              return;
            }
            _initSettings();
            _setInitval();
            _checkValue();
            _buildHtml();
            _initElements();
            _hideEmptyPrefixPostfix();
            _bindEvents();
            _bindEventsInterface();
            elements.input.css('display', 'block');
          }
          function _setInitval() {
            if (settings.initval !== '' && originalinput.val() === '') {
              originalinput.val(settings.initval);
            }
          }
          function changeSettings(newsettings) {
            _updateSettings(newsettings);
            _checkValue();
            var value = elements.input.val();
            if (value !== '') {
              value = Number(elements.input.val());
              elements.input.val(value.toFixed(settings.decimals));
            }
          }
          function _initSettings() {
            settings = $.extend({}, defaults, originalinput_data, _parseAttributes(), options);
          }
          function _parseAttributes() {
            var data = {};
            $.each(attributeMap, function(key, value) {
              var attrName = 'bts-' + value + '';
              if (originalinput.is('[data-' + attrName + ']')) {
                data[key] = originalinput.data(attrName);
              }
            });
            return data;
          }
          function _updateSettings(newsettings) {
            settings = $.extend({}, settings, newsettings);
          }
          function _buildHtml() {
            var initval = originalinput.val(),
                parentelement = originalinput.parent();
            if (initval !== '') {
              initval = Number(initval).toFixed(settings.decimals);
            }
            originalinput.data('initvalue', initval).val(initval);
            originalinput.addClass('form-control');
            if (parentelement.hasClass('input-group')) {
              _advanceInputGroup(parentelement);
            } else {
              _buildInputGroup();
            }
          }
          function _advanceInputGroup(parentelement) {
            parentelement.addClass('bootstrap-touchspin');
            var prev = originalinput.prev(),
                next = originalinput.next();
            var downhtml,
                uphtml,
                prefixhtml = '<span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span>',
                postfixhtml = '<span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span>';
            if (prev.hasClass('input-group-btn')) {
              downhtml = '<button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button>';
              prev.append(downhtml);
            } else {
              downhtml = '<span class="input-group-btn"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button></span>';
              $(downhtml).insertBefore(originalinput);
            }
            if (next.hasClass('input-group-btn')) {
              uphtml = '<button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button>';
              next.prepend(uphtml);
            } else {
              uphtml = '<span class="input-group-btn"><button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button></span>';
              $(uphtml).insertAfter(originalinput);
            }
            $(prefixhtml).insertBefore(originalinput);
            $(postfixhtml).insertAfter(originalinput);
            container = parentelement;
          }
          function _buildInputGroup() {
            var html;
            if (settings.verticalbuttons) {
              html = '<div class="input-group bootstrap-touchspin"><span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span><span class="input-group-btn-vertical"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-up" type="button"><i class="' + settings.verticalupclass + '"></i></button><button class="' + settings.buttonup_class + ' bootstrap-touchspin-down" type="button"><i class="' + settings.verticaldownclass + '"></i></button></span></div>';
            } else {
              html = '<div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button></span><span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span><span class="input-group-btn"><button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button></span></div>';
            }
            container = $(html).insertBefore(originalinput);
            $('.bootstrap-touchspin-prefix', container).after(originalinput);
            if (originalinput.hasClass('input-sm')) {
              container.addClass('input-group-sm');
            } else if (originalinput.hasClass('input-lg')) {
              container.addClass('input-group-lg');
            }
          }
          function _initElements() {
            elements = {
              down: $('.bootstrap-touchspin-down', container),
              up: $('.bootstrap-touchspin-up', container),
              input: $('input', container),
              prefix: $('.bootstrap-touchspin-prefix', container).addClass(settings.prefix_extraclass),
              postfix: $('.bootstrap-touchspin-postfix', container).addClass(settings.postfix_extraclass)
            };
          }
          function _hideEmptyPrefixPostfix() {
            if (settings.prefix === '') {
              elements.prefix.hide();
            }
            if (settings.postfix === '') {
              elements.postfix.hide();
            }
          }
          function _bindEvents() {
            originalinput.on('keydown', function(ev) {
              var code = ev.keyCode || ev.which;
              if (code === 38) {
                if (spinning !== 'up') {
                  upOnce();
                  startUpSpin();
                }
                ev.preventDefault();
              } else if (code === 40) {
                if (spinning !== 'down') {
                  downOnce();
                  startDownSpin();
                }
                ev.preventDefault();
              }
            });
            originalinput.on('keyup', function(ev) {
              var code = ev.keyCode || ev.which;
              if (code === 38) {
                stopSpin();
              } else if (code === 40) {
                stopSpin();
              }
            });
            originalinput.on('blur', function() {
              _checkValue();
            });
            elements.down.on('keydown', function(ev) {
              var code = ev.keyCode || ev.which;
              if (code === 32 || code === 13) {
                if (spinning !== 'down') {
                  downOnce();
                  startDownSpin();
                }
                ev.preventDefault();
              }
            });
            elements.down.on('keyup', function(ev) {
              var code = ev.keyCode || ev.which;
              if (code === 32 || code === 13) {
                stopSpin();
              }
            });
            elements.up.on('keydown', function(ev) {
              var code = ev.keyCode || ev.which;
              if (code === 32 || code === 13) {
                if (spinning !== 'up') {
                  upOnce();
                  startUpSpin();
                }
                ev.preventDefault();
              }
            });
            elements.up.on('keyup', function(ev) {
              var code = ev.keyCode || ev.which;
              if (code === 32 || code === 13) {
                stopSpin();
              }
            });
            elements.down.on('mousedown.touchspin', function(ev) {
              elements.down.off('touchstart.touchspin');
              if (originalinput.is(':disabled')) {
                return;
              }
              downOnce();
              startDownSpin();
              ev.preventDefault();
              ev.stopPropagation();
            });
            elements.down.on('touchstart.touchspin', function(ev) {
              elements.down.off('mousedown.touchspin');
              if (originalinput.is(':disabled')) {
                return;
              }
              downOnce();
              startDownSpin();
              ev.preventDefault();
              ev.stopPropagation();
            });
            elements.up.on('mousedown.touchspin', function(ev) {
              elements.up.off('touchstart.touchspin');
              if (originalinput.is(':disabled')) {
                return;
              }
              upOnce();
              startUpSpin();
              ev.preventDefault();
              ev.stopPropagation();
            });
            elements.up.on('touchstart.touchspin', function(ev) {
              elements.up.off('mousedown.touchspin');
              if (originalinput.is(':disabled')) {
                return;
              }
              upOnce();
              startUpSpin();
              ev.preventDefault();
              ev.stopPropagation();
            });
            elements.up.on('mouseout touchleave touchend touchcancel', function(ev) {
              if (!spinning) {
                return;
              }
              ev.stopPropagation();
              stopSpin();
            });
            elements.down.on('mouseout touchleave touchend touchcancel', function(ev) {
              if (!spinning) {
                return;
              }
              ev.stopPropagation();
              stopSpin();
            });
            elements.down.on('mousemove touchmove', function(ev) {
              if (!spinning) {
                return;
              }
              ev.stopPropagation();
              ev.preventDefault();
            });
            elements.up.on('mousemove touchmove', function(ev) {
              if (!spinning) {
                return;
              }
              ev.stopPropagation();
              ev.preventDefault();
            });
            $(document).on(_scopeEventNames(['mouseup', 'touchend', 'touchcancel'], _currentSpinnerId).join(' '), function(ev) {
              if (!spinning) {
                return;
              }
              ev.preventDefault();
              stopSpin();
            });
            $(document).on(_scopeEventNames(['mousemove', 'touchmove', 'scroll', 'scrollstart'], _currentSpinnerId).join(' '), function(ev) {
              if (!spinning) {
                return;
              }
              ev.preventDefault();
              stopSpin();
            });
            originalinput.on('mousewheel DOMMouseScroll', function(ev) {
              if (!settings.mousewheel || !originalinput.is(':focus')) {
                return;
              }
              var delta = ev.originalEvent.wheelDelta || -ev.originalEvent.deltaY || -ev.originalEvent.detail;
              ev.stopPropagation();
              ev.preventDefault();
              if (delta < 0) {
                downOnce();
              } else {
                upOnce();
              }
            });
          }
          function _bindEventsInterface() {
            originalinput.on('touchspin.uponce', function() {
              stopSpin();
              upOnce();
            });
            originalinput.on('touchspin.downonce', function() {
              stopSpin();
              downOnce();
            });
            originalinput.on('touchspin.startupspin', function() {
              startUpSpin();
            });
            originalinput.on('touchspin.startdownspin', function() {
              startDownSpin();
            });
            originalinput.on('touchspin.stopspin', function() {
              stopSpin();
            });
            originalinput.on('touchspin.updatesettings', function(e, newsettings) {
              changeSettings(newsettings);
            });
          }
          function _forcestepdivisibility(value) {
            switch (settings.forcestepdivisibility) {
              case 'round':
                return (Math.round(value / settings.step) * settings.step).toFixed(settings.decimals);
              case 'floor':
                return (Math.floor(value / settings.step) * settings.step).toFixed(settings.decimals);
              case 'ceil':
                return (Math.ceil(value / settings.step) * settings.step).toFixed(settings.decimals);
              default:
                return value;
            }
          }
          function _checkValue() {
            var val,
                parsedval,
                returnval;
            val = originalinput.val();
            if (val === '') {
              return;
            }
            if (settings.decimals > 0 && val === '.') {
              return;
            }
            parsedval = parseFloat(val);
            if (isNaN(parsedval)) {
              parsedval = 0;
            }
            returnval = parsedval;
            if (parsedval.toString() !== val) {
              returnval = parsedval;
            }
            if (parsedval < settings.min) {
              returnval = settings.min;
            }
            if (parsedval > settings.max) {
              returnval = settings.max;
            }
            returnval = _forcestepdivisibility(returnval);
            if (Number(val).toString() !== returnval.toString()) {
              originalinput.val(returnval);
              originalinput.trigger('change');
            }
          }
          function _getBoostedStep() {
            if (!settings.booster) {
              return settings.step;
            } else {
              var boosted = Math.pow(2, Math.floor(spincount / settings.boostat)) * settings.step;
              if (settings.maxboostedstep) {
                if (boosted > settings.maxboostedstep) {
                  boosted = settings.maxboostedstep;
                  value = Math.round((value / boosted)) * boosted;
                }
              }
              return Math.max(settings.step, boosted);
            }
          }
          function upOnce() {
            _checkValue();
            value = parseFloat(elements.input.val());
            if (isNaN(value)) {
              value = 0;
            }
            var initvalue = value,
                boostedstep = _getBoostedStep();
            value = value + boostedstep;
            if (value > settings.max) {
              value = settings.max;
              originalinput.trigger('touchspin.on.max');
              stopSpin();
            }
            elements.input.val(Number(value).toFixed(settings.decimals));
            if (initvalue !== value) {
              originalinput.trigger('change');
            }
          }
          function downOnce() {
            _checkValue();
            value = parseFloat(elements.input.val());
            if (isNaN(value)) {
              value = 0;
            }
            var initvalue = value,
                boostedstep = _getBoostedStep();
            value = value - boostedstep;
            if (value < settings.min) {
              value = settings.min;
              originalinput.trigger('touchspin.on.min');
              stopSpin();
            }
            elements.input.val(value.toFixed(settings.decimals));
            if (initvalue !== value) {
              originalinput.trigger('change');
            }
          }
          function startDownSpin() {
            stopSpin();
            spincount = 0;
            spinning = 'down';
            originalinput.trigger('touchspin.on.startspin');
            originalinput.trigger('touchspin.on.startdownspin');
            downDelayTimeout = setTimeout(function() {
              downSpinTimer = setInterval(function() {
                spincount++;
                downOnce();
              }, settings.stepinterval);
            }, settings.stepintervaldelay);
          }
          function startUpSpin() {
            stopSpin();
            spincount = 0;
            spinning = 'up';
            originalinput.trigger('touchspin.on.startspin');
            originalinput.trigger('touchspin.on.startupspin');
            upDelayTimeout = setTimeout(function() {
              upSpinTimer = setInterval(function() {
                spincount++;
                upOnce();
              }, settings.stepinterval);
            }, settings.stepintervaldelay);
          }
          function stopSpin() {
            clearTimeout(downDelayTimeout);
            clearTimeout(upDelayTimeout);
            clearInterval(downSpinTimer);
            clearInterval(upSpinTimer);
            switch (spinning) {
              case 'up':
                originalinput.trigger('touchspin.on.stopupspin');
                originalinput.trigger('touchspin.on.stopspin');
                break;
              case 'down':
                originalinput.trigger('touchspin.on.stopdownspin');
                originalinput.trigger('touchspin.on.stopspin');
                break;
            }
            spincount = 0;
            spinning = false;
          }
        });
      };
    })(jQuery);
  })();
  return _retrieveGlobal();
});

System.registerDynamic("libraries/bootstrap-touchspin/index", ["jquery", "./jquery.bootstrap-touchspin"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  jQuery = $__require('jquery');
  $__require('./jquery.bootstrap-touchspin');
  return module.exports;
});

System.registerDynamic("components/components/spinner/spinner.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<rl-generic-container selector=\"spinner.ngDisabled\" class=\"spinner-container\">\r\n\t<template default>\r\n\t\t<div class=\"field\" ng-class=\"{ 'error': spinner.ngModel.$invalid }\">\r\n\t\t\t<label class=\"label-slide angular-animate\" ng-show=\"spinner.ngModel.$viewValue | isEmpty:false && spinner.label\">{{spinner.label}}</label>\r\n\t\t\t<input name=\"{{::spinner.name}}\" class=\"spinner\" id=\"{{::spinner.spinnerId}}\" type=\"text\" placeholder=\"{{spinner.label}}\"/>\r\n\t\t\t<span class=\"error-string\" ng-if=\"spinner.inputValidator.error | isEmpty:false\">{{spinner.inputValidator.error}}</span>\r\n\t\t</div>\r\n\t</template>\r\n\t<template when-selector=\"true\">\r\n\t\t<div class=\"input-group field\">\r\n\t\t\t<label class=\"label-slide angular-animate\" ng-show=\"spinner.ngModel.$viewValue | isEmpty:false && spinner.label\">{{spinner.label}}</label>\r\n\t\t\t<span class=\"input-group-addon\" ng-if=\"::spinner.prefix != null\">{{::spinner.prefix}}</span>\r\n\t\t\t<input class=\"form-control\" disabled=\"true\" type=\"text\" ng-model=\"spinner.ngModel.$viewValue\" placeholder=\"{{spinner.label}}\" />\r\n\t\t\t<span class=\"input-group-addon\" ng-if=\"::spinner.postfix != null\">{{::spinner.postfix}}</span>\r\n\t\t</div>\r\n\t</template>\r\n</rl-generic-container>";
  return module.exports;
});

System.registerDynamic("components/components/spinner/spinner", ["../../../libraries/bootstrap-touchspin/index", "angular", "lodash", "typescript-angular-utilities", "../input/input", "../../services/componentValidator/componentValidator.service", "./spinner.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  $__require('../../../libraries/bootstrap-touchspin/index');
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __string = typescript_angular_utilities_1.services.string;
  var __number = typescript_angular_utilities_1.services.number;
  var input_1 = $__require('../input/input');
  var componentValidator_service_1 = $__require('../../services/componentValidator/componentValidator.service');
  exports.moduleName = 'rl.ui.components.spinner';
  exports.componentName = 'rlSpinner';
  exports.controllerName = 'SpinnerController';
  exports.defaultMaxValue = 100000000000000000000;
  var SpinnerController = (function(_super) {
    __extends(SpinnerController, _super);
    function SpinnerController($scope, $attrs, componentValidatorFactory, $element, $timeout) {
      _super.call(this, $scope, $attrs, componentValidatorFactory);
      this.$element = $element;
      this.$timeout = $timeout;
      this.inputType = 'spinner';
    }
    SpinnerController.prototype.$postLink = function() {
      this.setDisabled(this.ngDisabled);
    };
    SpinnerController.prototype.$onChanges = function(changes) {
      if (changes.ngDisabled) {
        this.setDisabled(changes.ngDisabled.currentValue);
      }
    };
    SpinnerController.prototype.round = function(num) {
      if (num != null && this.roundToStep) {
        num = __number.numberUtility.roundToStep(num, this.step);
        num = __number.numberUtility.preciseRound(num, this.decimals);
      }
      return num;
    };
    SpinnerController.prototype.setDisabled = function(disabled) {
      var _this = this;
      if (disabled) {
        if (_.isFunction(this.unbindWatches)) {
          this.unbindWatches();
        }
      } else {
        this.$timeout(function() {
          var touchspin = _this.$element.find('input.spinner').TouchSpin({
            min: (_this.min != null ? _this.min : 0),
            max: (_this.max != null ? _this.max : exports.defaultMaxValue),
            step: _this.step,
            prefix: _this.prefix,
            postfix: _this.postfix,
            decimals: _this.decimals,
            initval: _this.ngModel.$viewValue,
            forcestepdivisibility: _this.roundToStep ? 'round' : 'none'
          });
          touchspin.on('change', function() {
            _this.$scope.$apply(function() {
              var spinValue = touchspin.val();
              _this.ngModel.$setViewValue(__string.stringUtility.toNumber(spinValue));
            });
          });
          var unbindViewWatch = _this.$scope.$watch(function() {
            return _this.ngModel.$viewValue;
          }, function(newValue) {
            touchspin.val(newValue != null ? newValue.toString() : '');
          });
          var unbindModelWatch = _this.$scope.$watch(function() {
            return _this.ngModel.$modelValue;
          }, function(newModel) {
            _this.ngModel.$modelValue = _this.round(newModel);
          });
          _this.unbindWatches = function() {
            unbindViewWatch();
            unbindModelWatch();
          };
        });
      }
    };
    SpinnerController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName, '$element', '$timeout'];
    return SpinnerController;
  }(input_1.InputController));
  exports.SpinnerController = SpinnerController;
  var spinner = input_1.buildInput({
    template: $__require('./spinner.html'),
    controller: exports.controllerName,
    controllerAs: 'spinner',
    bindings: {
      min: '<?',
      max: '<?',
      step: '<?',
      decimals: '<?',
      prefix: '@',
      postfix: '@',
      roundToStep: '<?',
      ngDisabled: '<?',
      spinnerId: '@'
    }
  });
  angular.module(exports.moduleName, [input_1.moduleName]).component(exports.componentName, spinner).controller(exports.controllerName, SpinnerController);
  return module.exports;
});

System.registerDynamic("components/components/stringWithWatermark/stringWithWatermark", ["angular"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.components.stringWithWatermark';
  exports.componentName = 'rlStringWithWatermark';
  var stringWithWatermark = {
    template: "\n\t\t<rl-generic-container selector=\"controller.string | isEmpty\">\n\t\t\t<template when-selector=\"true\"><span class=\"watermark\">{{controller.watermark}}</span></template>\n\t\t\t<template default><span>{{controller.string}}</span></template>\n\t\t</rl-generic-container>\n\t",
    controllerAs: 'controller',
    bindings: {
      string: '@',
      watermark: '@'
    }
  };
  angular.module(exports.moduleName, []).component(exports.componentName, stringWithWatermark);
  return module.exports;
});

System.registerDynamic("components/components/tabs/tab.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"tab-pane\" ng-class=\"{ 'active': tab.header.isVisible }\">\r\n\t<div class=\"tab-body\">\r\n\t\t<div ng-transclude=\"contentSlot\" ng-form=\"tabForm\"></div>\r\n\t\t<div class=\"clearfix\"></div>\r\n\t</div>\r\n\t<div class=\"tab-footer\">\r\n\t\t<div ng-transclude=\"footerSlot\"></div>\r\n\t\t<div class=\"clearfix\"></div>\r\n\t</div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/tabs/tab", ["./tab.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.componentName = 'rlTab';
  exports.controllerName = 'rlTabController';
  var TabController = (function() {
    function TabController($scope, $element, $transclude) {
      var _this = this;
      this.$element = $element;
      this.$transclude = $transclude;
      $scope.$watch('tabForm.$valid', function(isValid) {
        _this.header.isValid = isValid != null ? isValid : true;
      });
    }
    TabController.prototype.$postLink = function() {
      var _this = this;
      this.$transclude(function(header) {
        _this.header = {
          template: header.html(),
          isValid: true
        };
        _this.tabset.registerTab(_this.$element, _this.header);
      }, null, 'headerSlot');
    };
    TabController.$inject = ['$scope', '$element', '$transclude'];
    return TabController;
  }());
  exports.TabController = TabController;
  exports.tab = {
    transclude: {
      'headerSlot': '?rlTabHeader',
      'contentSlot': '?rlTabContent',
      'footerSlot': '?rlTabFooter'
    },
    require: {tabset: '^^rlTabset'},
    template: $__require('./tab.html'),
    controller: exports.controllerName,
    controllerAs: 'tab'
  };
  return module.exports;
});

System.registerDynamic("components/components/tabs/tabset.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"nav-tabs-dropshadow\">\r\n\t<ul class=\"nav nav-tabs\">\r\n\t\t<li ng-repeat=\"tabHeader in tabset.tabHeaders\" ng-click=\"tabset.select(tabHeader)\"\r\n\t\t\tng-class=\"{ 'active': tabHeader.isVisible, 'error': !tabHeader.isValid }\">\r\n\t\t\t<a><span ng-bind-html=\"tabHeader.template\"></span></a>\r\n\t\t</li>\r\n\t</ul>\r\n\t<div class=\"tab-content\">\r\n\t\t<div ng-transclude></div>\r\n\t</div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/tabs/tabset", ["lodash", "typescript-angular-utilities", "./tabset.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __array = typescript_angular_utilities_1.services.array;
  exports.componentName = 'rlTabset';
  exports.controllerName = 'rlTabsetController';
  var TabsetController = (function() {
    function TabsetController($element) {
      this.$element = $element;
      this.tabHeaders = [];
    }
    TabsetController.prototype.registerTab = function(element, header) {
      var index = this.findPosition(element);
      if (__array.arrayUtility.has(this.tabHeaders, index)) {
        header.isVisible = this.tabHeaders[index].isVisible;
      } else {
        header.isVisible = (index === 0);
      }
      this.tabHeaders[index] = header;
    };
    TabsetController.prototype.select = function(tab) {
      _.each(this.tabHeaders, function(otherTab) {
        otherTab.isVisible = false;
      });
      tab.isVisible = true;
    };
    TabsetController.prototype.findPosition = function(tabElement) {
      var tabs = this.$element.find('rl-tab');
      var num;
      _.each(tabs, function(elem, index) {
        if (tabElement[0] === elem) {
          num = index;
          return false;
        }
      });
      return num;
    };
    TabsetController.$inject = ['$element'];
    return TabsetController;
  }());
  exports.TabsetController = TabsetController;
  exports.tabset = {
    transclude: true,
    template: $__require('./tabset.html'),
    controller: exports.controllerName,
    controllerAs: 'tabset'
  };
  return module.exports;
});

System.registerDynamic("components/components/tabs/tabs.module", ["angular", "./tab", "./tabset"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var tab_1 = $__require('./tab');
  exports.tabComponentName = tab_1.componentName;
  exports.tab = tab_1.tab;
  exports.tabControllerName = tab_1.controllerName;
  exports.TabController = tab_1.TabController;
  var tabset_1 = $__require('./tabset');
  exports.tabsetComponentName = tabset_1.componentName;
  exports.tabset = tabset_1.tabset;
  exports.tabsetControllerName = tabset_1.controllerName;
  exports.TabsetController = tabset_1.TabsetController;
  exports.moduleName = 'rl.ui.components.tabs';
  angular.module(exports.moduleName, []).component(tab_1.componentName, tab_1.tab).controller(tab_1.controllerName, tab_1.TabController).component(tabset_1.componentName, tabset_1.tabset).controller(tabset_1.controllerName, tabset_1.TabsetController);
  return module.exports;
});

System.registerDynamic("components/components/templateRenderer/templateRenderer", ["angular", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  exports.moduleName = 'rl.ui.components.templateRenderer';
  exports.componentName = 'rlTemplateRenderer';
  exports.controllerName = 'TemplateRendererController';
  var TemplateRendererController = (function() {
    function TemplateRendererController($compile, $element, $scope) {
      if (_.isString(this.template)) {
        var templateString = this.template;
        this.template = {
          template: templateString,
          scope: $scope.$parent.$new()
        };
      }
      var target = $element.find('.template-target');
      var template = target.append(this.template.template);
      $compile(template)(this.template.scope);
    }
    TemplateRendererController.$inject = ['$compile', '$element', '$scope'];
    return TemplateRendererController;
  }());
  exports.TemplateRendererController = TemplateRendererController;
  var templateRenderer = {
    template: '<div class="template-target"></div>',
    controller: exports.controllerName,
    controllerAs: 'controller',
    bindings: {template: '<'}
  };
  angular.module(exports.moduleName, []).component(exports.componentName, templateRenderer).controller(exports.controllerName, TemplateRendererController);
  return module.exports;
});

System.registerDynamic("components/components/textarea/textarea.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"field\" ng-class=\"{ 'error': input.ngModel.$invalid }\">\r\n\t<label ng-show=\"input.inputValue && input.label\" class=\"label-slide angular-animate\">{{::input.label}}</label>\r\n\t<textarea class=\"form-control\" ng-model=\"input.inputValue\" rows=\"{{::input.rows}}\" maxlength=\"{{::input.maxlength}}\" ng-disabled=\"input.ngDisabled\" placeholder=\"{{::input.label}}\"></textarea>\r\n\t<span class=\"error-string angular-animate\" ng-if=\"input.inputValidator.error | isEmpty:false\">{{input.inputValidator.error}}</span>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/textarea/textarea", ["angular", "../input/input", "./textarea.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var input_1 = $__require('../input/input');
  exports.moduleName = 'rl.ui.components.textarea';
  exports.componentName = 'rlTextarea';
  var textarea = input_1.buildInput({
    template: $__require('./textarea.html'),
    bindings: {
      rows: '<?',
      ngDisabled: '<?',
      maxlength: '<?'
    }
  });
  angular.module(exports.moduleName, [input_1.moduleName]).component(exports.componentName, textarea);
  return module.exports;
});

System.registerDynamic("components/components/textbox/textbox.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"field\" ng-class=\"{ 'error': input.ngModel.$invalid }\">\r\n\t<label ng-show=\"input.inputValue && input.label\" class=\"label-slide angular-animate\">{{::input.label}}</label>\r\n\t<input  type=\"text\" class=\"form-control angular-animate\" ng-model=\"input.inputValue\" placeholder=\"{{::input.label}}\" maxlength=\"{{::input.maxlength}}\" />\r\n\t<span class=\"error-string angular-animate\" ng-if=\"input.inputValidator.error | isEmpty:false\">{{input.inputValidator.error}}</span>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/textbox/textbox", ["angular", "../input/input", "./textbox.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var input_1 = $__require('../input/input');
  exports.moduleName = 'rl.ui.components.textbox';
  exports.componentName = 'rlTextbox';
  var textbox = input_1.buildInput({
    template: $__require('./textbox.html'),
    bindings: {maxlength: '<?'}
  });
  angular.module(exports.moduleName, [input_1.moduleName]).component(exports.componentName, textbox);
  return module.exports;
});

System.registerDynamic("components/behaviors/required/required", ["angular"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.ui.behaviors.required';
  exports.directiveName = 'rlRequired';
  exports.controllerName = 'RequiredController';
  var RequiredController = (function() {
    function RequiredController($scope, $attrs, $interpolate) {
      this.$scope = $scope;
      this.$attrs = $attrs;
      this.$interpolate = $interpolate;
      this.message = this.$interpolate(this.$attrs.rlRequired)(this.$scope);
    }
    RequiredController.$inject = ['$scope', '$attrs', '$interpolate'];
    return RequiredController;
  }());
  exports.RequiredController = RequiredController;
  function required() {
    return {
      restrict: 'A',
      controller: exports.controllerName
    };
  }
  angular.module(exports.moduleName, []).directive(exports.directiveName, required).controller(exports.controllerName, RequiredController);
  return module.exports;
});

System.registerDynamic("components/components/input/input", ["angular", "lodash", "typescript-angular-utilities", "../../behaviors/required/required", "../../services/componentValidator/componentValidator.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __object = typescript_angular_utilities_1.services.object;
  var __guid = typescript_angular_utilities_1.services.guid;
  var __array = typescript_angular_utilities_1.services.array;
  var required_1 = $__require('../../behaviors/required/required');
  var componentValidator_service_1 = $__require('../../services/componentValidator/componentValidator.service');
  exports.moduleName = 'rl.ui.components.input';
  exports.controllerName = 'InputController';
  var InputController = (function() {
    function InputController($scope, $attrs, componentValidatorFactory) {
      this.$scope = $scope;
      this.$attrs = $attrs;
      this.componentValidatorFactory = componentValidatorFactory;
      this.inputType = 'input';
    }
    Object.defineProperty(InputController.prototype, "inputValue", {
      get: function() {
        return this.ngModel.$viewValue;
      },
      set: function(value) {
        this.ngModel.$setViewValue(value);
      },
      enumerable: true,
      configurable: true
    });
    InputController.prototype.$onInit = function() {
      var _this = this;
      var validators = [];
      if (!_.isUndefined(this.validator)) {
        validators = validators.concat(__array.arrayUtility.arrayify(this.validator));
      }
      if (!_.isUndefined(this.validators)) {
        validators = validators.concat(__array.arrayUtility.arrayify(this.validators));
      }
      if (__object.objectUtility.isNullOrEmpty(this.$attrs.name)) {
        this.$attrs.$set('name', this.inputType + '-' + __guid.guid.random());
      }
      if (this.required != null) {
        validators.push({
          name: 'rlRequired',
          validate: function() {
            return !__object.objectUtility.isNullOrEmpty(_this.ngModel.$viewValue);
          },
          errorMessage: this.required.message
        });
      }
      if (_.some(validators)) {
        this.inputValidator = this.componentValidatorFactory.getInstance({
          ngModel: this.ngModel,
          $scope: this.$scope,
          validators: validators
        });
      }
    };
    InputController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName];
    return InputController;
  }());
  exports.InputController = InputController;
  var baseInputOptions = {
    require: {
      ngModel: 'ngModel',
      required: '?' + required_1.directiveName
    },
    template: '',
    controller: exports.controllerName,
    controllerAs: 'input',
    bindings: {
      validator: '<?',
      validators: '<?',
      label: '@',
      name: '@'
    }
  };
  function buildInput(options) {
    var clone = _.clone(baseInputOptions);
    clone.transclude = options.transclude;
    clone.template = options.template;
    clone.controller = options.controller || clone.controller;
    clone.controllerAs = options.controllerAs || clone.controllerAs;
    clone.bindings = _.assign({}, clone.bindings, options.bindings);
    return clone;
  }
  exports.buildInput = buildInput;
  angular.module(exports.moduleName, [componentValidator_service_1.moduleName]).controller(exports.controllerName, InputController);
  return module.exports;
});

System.registerDynamic("components/components/typeahead/typeahead.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"field typeahead\" ng-class=\"{ 'error': typeahead.ngModel.$invalid }\">\r\n\t<label ng-show=\"typeahead.selection\" class=\"label-slide angular-animate\">\r\n\t\t{{::typeahead.label}}\r\n\t</label>\r\n\t<div ng-if=\"!typeahead.collapsed\">\r\n\t\t<ui-select ng-model=\"typeahead.selection\" theme=\"bootstrap\" ng-disabled=\"typeahead.ngDisabled\">\r\n\t\t\t<ui-select-match placeholder=\"{{::typeahead.placeholder}}\">{{typeahead.getDisplayName($select.selected)}}</ui-select-match>\r\n\t\t\t<ui-select-choices repeat=\"item in typeahead.visibleItems\"\r\n\t\t\t\t\t\t\t\trefresh=\"typeahead.refresh($select.search)\"\r\n\t\t\t\t\t\t\t\trefresh-delay=\"typeahead.loadDelay\">\r\n\t\t\t\t{{typeahead.getDisplayName(item)}}\r\n\t\t\t</ui-select-choices>\r\n\t\t</ui-select>\r\n\t</div>\r\n\t<div class=\"collapsed\" ng-if=\"typeahead.collapsed\">\r\n\t\t<span>{{typeahead.getDisplayName(typeahead.selection)}}</span>\r\n\t\t<rl-button type=\"default flat\" action=\"typeahead.clear()\"><i class=\"fa fa-remove\"></i></rl-button>\r\n\t</div>\r\n\t<span class=\"error-string angular-animate\" ng-if=\"typeahead.inputValidator.error | isEmpty:false\">{{typeahead.inputValidator.error}}</span>\r\n\t<rl-busy loading=\"typeahead.loading\"></rl-busy>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/typeahead/typeahead", ["angular", "lodash", "typescript-angular-utilities", "../../services/parentChild/parentChild.service", "../input/input", "../../services/componentValidator/componentValidator.service", "./typeahead.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __search = typescript_angular_utilities_1.services.search;
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  var parentChild_service_1 = $__require('../../services/parentChild/parentChild.service');
  var input_1 = $__require('../input/input');
  var componentValidator_service_1 = $__require('../../services/componentValidator/componentValidator.service');
  exports.moduleName = 'rl.ui.components.typeahead';
  exports.componentName = 'rlTypeahead';
  exports.controllerName = 'TypeaheadController';
  var TypeaheadController = (function(_super) {
    __extends(TypeaheadController, _super);
    function TypeaheadController($scope, $q, $attrs, $timeout, parentChild, object, array, componentValidatorFactory) {
      _super.call(this, $scope, $attrs, componentValidatorFactory);
      this.$q = $q;
      this.$timeout = $timeout;
      this.parentChild = parentChild;
      this.object = object;
      this.array = array;
      this.loading = false;
      this.collapsed = false;
      this.hasSearchOption = false;
      this._searchOption = {__isSearchOption: true};
      this.inputType = 'typeahead';
    }
    Object.defineProperty(TypeaheadController.prototype, "selection", {
      get: function() {
        return this.ngModel.$viewValue;
      },
      set: function(value) {
        if (value != null) {
          if (value.__isSearchOption) {
            value = this.create({value: value.text});
          }
          this.select({value: value});
          if (this.collapseOnSelect) {
            this.collapsed = true;
            this.ngModel.$setViewValue(value);
          }
        }
      },
      enumerable: true,
      configurable: true
    });
    TypeaheadController.prototype.$onInit = function() {
      var _this = this;
      _super.prototype.$onInit.call(this);
      this.loadDelay = this.useClientSearching ? 100 : 500;
      this.prefix = this.prefix || 'Search for';
      this.placeholder = this.label != null ? this.prefix + ' ' + this.label.toLowerCase() : 'Search';
      var $attrs = this.$attrs;
      this.collapseOnSelect = this.allowCollapse || this.object.isNullOrEmpty($attrs.select);
      this.allowCustomOption = !this.object.isNullOrEmpty($attrs.create);
      this.$timeout(function() {
        if (_this.collapseOnSelect && !_this.object.isNullOrEmpty(_this.ngModel.$viewValue)) {
          _this.collapsed = true;
        }
      });
      this.parentChild.registerChildBehavior(this.childLink, {
        add: this.addItem.bind(this),
        remove: this.removeItem.bind(this)
      });
      this.$scope.$watch(function() {
        return _this.ngModel.$viewValue;
      }, function(value) {
        if (value != null && _this.collapseOnSelect) {
          _this.collapsed = true;
        }
      });
    };
    TypeaheadController.prototype.getDisplayName = function(item) {
      if (item != null && item.__isSearchOption) {
        return item.text;
      }
      return __transform.getValue(item, this.transform);
    };
    TypeaheadController.prototype.refresh = function(search) {
      var _this = this;
      if (this.object.isNullOrEmpty(search)) {
        this.visibleItems = [];
        return null;
      }
      this.loading = true;
      return this.loadItems(search).then(function() {
        _this.loading = false;
        _this._searchOption.text = search;
        if (_this.showCustomSearch(search)) {
          _this.hasSearchOption = true;
          _this.visibleItems.unshift(_this._searchOption);
        }
      });
    };
    TypeaheadController.prototype.loadItems = function(search) {
      var _this = this;
      if (!this.useClientSearching) {
        return this.$q.when(this.getItems({search: search})).then(function(items) {
          _this.visibleItems = items;
        });
      } else {
        if (this.cachedItems != null) {
          this.visibleItems = this.filter(this.cachedItems, search);
          return this.$q.when();
        } else {
          return this.$q.when(this.getItems()).then(function(items) {
            _this.cachedItems = items;
            _this.visibleItems = _this.filter(items, search);
          });
        }
      }
    };
    TypeaheadController.prototype.clear = function() {
      this.ngModel.$setViewValue(null);
      this.collapsed = false;
    };
    TypeaheadController.prototype.showCustomSearch = function(search) {
      var _this = this;
      return this.allowCustomOption && !this.hasSearchOption && !_.find(this.visibleItems, function(item) {
        return _this.getDisplayName(item) === search;
      });
    };
    TypeaheadController.prototype.filter = function(list, search) {
      return _.filter(list, function(item) {
        return __search.searchUtility.tokenizedSearch(item, search);
      });
    };
    TypeaheadController.prototype.addItem = function(item) {
      if (this.cachedItems != null) {
        this.cachedItems.push(item);
      }
    };
    TypeaheadController.prototype.removeItem = function(item) {
      if (this.cachedItems != null) {
        this.array.remove(this.cachedItems, item);
      }
    };
    TypeaheadController.$inject = ['$scope', '$q', '$attrs', '$timeout', parentChild_service_1.serviceName, typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, componentValidator_service_1.factoryName];
    return TypeaheadController;
  }(input_1.InputController));
  exports.TypeaheadController = TypeaheadController;
  var typeahead = input_1.buildInput({
    template: $__require('./typeahead.html'),
    controller: exports.controllerName,
    controllerAs: 'typeahead',
    bindings: {
      childLink: '=?',
      select: '&',
      create: '&',
      allowCollapse: '<?',
      transform: '<?',
      getItems: '&',
      prefix: '@',
      useClientSearching: '<?',
      ngDisabled: '<?'
    }
  });
  angular.module(exports.moduleName, [parentChild_service_1.moduleName, typescript_angular_utilities_1.downgrade.moduleName, input_1.moduleName]).component(exports.componentName, typeahead).controller(exports.controllerName, TypeaheadController);
  return module.exports;
});

System.registerDynamic("components/services/parentChild/parentChild.service", ["angular", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  exports.moduleName = 'rl.utilities.services.parentChildBehavior';
  exports.serviceName = 'parentChildBehavior';
  var ParentChildBehaviorService = (function() {
    function ParentChildBehaviorService() {}
    ParentChildBehaviorService.prototype.getChildBehavior = function(child) {
      return child && child.viewData != null ? child.viewData.behavior : null;
    };
    ParentChildBehaviorService.prototype.triggerChildBehavior = function(child, action) {
      var behavior = this.getChildBehavior(child);
      if (behavior == null) {
        return null;
      } else {
        return action(behavior);
      }
    };
    ParentChildBehaviorService.prototype.triggerAllChildBehaviors = function(childList, action) {
      var behaviors = this.getAllChildBehaviors(childList);
      return _.map(behaviors, function(behavior) {
        return action(behavior);
      });
    };
    ParentChildBehaviorService.prototype.getAllChildBehaviors = function(childList) {
      var _this = this;
      return _(childList).map(function(child) {
        return _this.getChildBehavior(child);
      }).filter(function(behavior) {
        return behavior != null;
      }).value();
    };
    ParentChildBehaviorService.prototype.registerChildBehavior = function(child, behavior) {
      if (child == null) {
        return;
      }
      if (child.viewData == null) {
        child.viewData = {behavior: null};
      }
      var currentBehavior = child.viewData.behavior;
      if (currentBehavior == null) {
        child.viewData.behavior = behavior;
      } else {
        child.viewData.behavior = _.extend(currentBehavior, behavior);
      }
    };
    return ParentChildBehaviorService;
  }());
  exports.ParentChildBehaviorService = ParentChildBehaviorService;
  angular.module(exports.moduleName, []).service(exports.serviceName, ParentChildBehaviorService);
  return module.exports;
});

System.registerDynamic("components/components/typeaheadList/defaultListItem.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"col-xs-10\">{{$transform($item)}}</div>\r\n<div class=\"col-xs-2\">\r\n\t<rl-button-async type=\"danger\" action=\"$remove($item)\"><i class=\"fa fa-remove\"></i></rl-button-async>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/typeaheadList/typeaheadItem", ["./defaultListItem.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.componentName = 'rlTypeaheadListItem';
  var TypeaheadItemController = (function() {
    function TypeaheadItemController($scope, $element, $compile) {
      this.$scope = $scope;
      this.$element = $element;
      this.$compile = $compile;
    }
    TypeaheadItemController.prototype.$onInit = function() {
      var itemScope = this.$scope.$parent.$new();
      var contentArea = this.$element.find('.content-target');
      if (this.transclude.isSlotFilled('listItemSlot')) {
        this.transclude(itemScope, function(template) {
          contentArea.append(template);
        }, null, 'listItemSlot');
      } else {
        var template = contentArea.append($__require('./defaultListItem.html'));
        this.$compile(template)(itemScope);
      }
    };
    TypeaheadItemController.$inject = ['$scope', '$element', '$compile'];
    return TypeaheadItemController;
  }());
  exports.typeaheadItem = {
    bindings: {transclude: '<'},
    controller: TypeaheadItemController,
    template: "<div class=\"content-target\"></div>"
  };
  return module.exports;
});

System.registerDynamic("components/components/typeaheadList/typeaheadList.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<rl-generic-container selector=\"list.disableSearching\">\r\n\t<template when-selector=\"true\">\r\n\t\t<rl-select ng-if=\"list.cachedItems | isEmpty:false\" ng-model=\"list.model\" select=\"list.addItem(item)\" transform=\"list.transform\"\r\n\t\t\t\t   options=\"list.cachedItems\" label=\"{{list.label}}\" ng-disabled=\"list.ngDisabled\"></rl-select>\r\n\t</template>\r\n\t<template default>\r\n\t\t<rl-typeahead ng-model=\"list.model\" select=\"list.addItem(value)\" allow-collapse=\"false\"\r\n\t\t\t\t\t  transform=\"list.transform\" get-items=\"list.searchItems(search)\" label=\"{{list.label}}\"\r\n\t\t\t\t\t  prefix=\"{{list.prefix}}\" ng-disabled=\"list.ngDisabled\"></rl-typeahead>\r\n\t</template>\r\n</rl-generic-container>\r\n<div class=\"table-container col-xs-12\">\r\n\t<div class=\"row table-header\" ng-show=\"list.ngModel.$viewValue | isEmpty:false\">\r\n\t\t<div ng-transclude=\"headerSlot\">\r\n\t\t\t<div class=\"col-xs-12\">Name</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"row table-row\" ng-repeat=\"$item in list.ngModel.$viewValue\" rl-alias=\"$item as {{list.itemAs}}\">\r\n\t\t<rl-typeahead-list-item transclude=\"list.$transclude\"></rl-typeahead-list-item>\r\n\t</div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/typeaheadList/typeaheadList", ["angular", "lodash", "typescript-angular-utilities", "../../services/parentChild/parentChild.service", "./typeaheadItem", "./typeaheadList.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __array = typescript_angular_utilities_1.services.array;
  var __transform = typescript_angular_utilities_1.services.transform.transform;
  var __search = typescript_angular_utilities_1.services.search;
  var parentChild_service_1 = $__require('../../services/parentChild/parentChild.service');
  var typeaheadItem_1 = $__require('./typeaheadItem');
  exports.moduleName = 'rl.ui.components.typeaheadList';
  exports.componentName = 'rlTypeaheadList';
  exports.controllerName = 'TypeaheadListController';
  var TypeaheadListController = (function() {
    function TypeaheadListController($scope, $transclude, $q, parentChild) {
      this.$scope = $scope;
      this.$transclude = $transclude;
      this.$q = $q;
      this.parentChild = parentChild;
    }
    TypeaheadListController.prototype.$onInit = function() {
      var _this = this;
      this.$scope.$remove = this.removeItem.bind(this);
      this.$scope.$transform = function(item) {
        return __transform.getValue(item, _this.transform);
      };
      this.$scope.listData = this.listData;
      this.parentChild.registerChildBehavior(this.childLink, {
        add: this.addItem.bind(this),
        remove: this.removeItem.bind(this)
      });
      if (this.disableSearching) {
        this.loadCachedItems();
      }
    };
    TypeaheadListController.prototype.$onChanges = function(changes) {
      if (changes.disableSearching && changes.disableSearching.currentValue && !this.cachedItems) {
        this.loadCachedItems();
      }
    };
    TypeaheadListController.prototype.loadItems = function(search) {
      if (this.useClientSearching || this.disableSearching) {
        if (this.cachedItems != null) {
          return this.$q.when(this.cachedItems);
        } else {
          return this.$q.when(this.getItems());
        }
      } else {
        return this.getItems({search: search});
      }
    };
    TypeaheadListController.prototype.searchItems = function(search) {
      var _this = this;
      return this.loadItems(search).then(function(items) {
        return _this.filter(items, search);
      });
    };
    TypeaheadListController.prototype.addItem = function(item) {
      var _this = this;
      return this.$q.when(this.add({item: item})).then(function(newItem) {
        newItem = newItem || item;
        _this.ngModel.$viewValue.push(newItem);
        _this.ngModel.$setDirty();
        if (_this.cachedItems != null) {
          __array.arrayUtility.remove(_this.cachedItems, item);
        }
        _this.model = null;
        return newItem;
      });
    };
    TypeaheadListController.prototype.removeItem = function(item) {
      var _this = this;
      return this.$q.when(this.remove({item: item})).then(function() {
        __array.arrayUtility.remove(_this.ngModel.$viewValue, item);
        _this.ngModel.$setDirty();
        if (_this.cachedItems != null) {
          _this.cachedItems.push(item);
        }
      });
    };
    TypeaheadListController.prototype.filter = function(list, search) {
      var _this = this;
      var filteredList = _.filter(list, function(item) {
        return !_.find(_this.ngModel.$viewValue, item);
      });
      if (this.useClientSearching) {
        this.cachedItems = filteredList;
        return _.filter(filteredList, function(item) {
          return __search.searchUtility.tokenizedSearch(item, search);
        });
      } else {
        return filteredList;
      }
    };
    TypeaheadListController.prototype.loadCachedItems = function() {
      var _this = this;
      this.searchItems().then(function(items) {
        _this.cachedItems = items;
      });
    };
    TypeaheadListController.$inject = ['$scope', '$transclude', '$q', parentChild_service_1.serviceName];
    return TypeaheadListController;
  }());
  exports.TypeaheadListController = TypeaheadListController;
  var typeaheadList = {
    require: {ngModel: 'ngModel'},
    transclude: {
      headerSlot: '?rlListHeader',
      listItemSlot: '?rlListItem'
    },
    template: $__require('./typeaheadList.html'),
    controller: exports.controllerName,
    controllerAs: 'list',
    bindings: {
      getItems: '&',
      add: '&',
      remove: '&',
      transform: '<?',
      label: '@',
      prefix: '@',
      useClientSearching: '<?',
      ngDisabled: '<?',
      itemAs: '@',
      childLink: '=?',
      listData: '<?',
      disableSearching: '<?'
    }
  };
  angular.module(exports.moduleName, [parentChild_service_1.moduleName]).component(exports.componentName, typeaheadList).controller(exports.controllerName, TypeaheadListController).component(typeaheadItem_1.componentName, typeaheadItem_1.typeaheadItem);
  return module.exports;
});

System.registerDynamic("components/components/userRating/userRating", ["angular", "lodash", "../componentsDefaultTheme"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var componentsDefaultTheme_1 = $__require('../componentsDefaultTheme');
  exports.moduleName = 'rl.components.userRating';
  exports.componentName = 'rlUserRating';
  exports.controllerName = 'UserRatingController';
  var UserRatingController = (function() {
    function UserRatingController($timeout, useDefaultTheme) {
      this.$timeout = $timeout;
      this.useDefaultTheme = useDefaultTheme;
    }
    UserRatingController.prototype.$onInit = function() {
      var _this = this;
      this.stars = [];
      var rangeSize = this.range != null ? this.range : 5;
      var range = _.range(1, rangeSize + 1).reverse();
      _.each(range, function(rating) {
        _this.stars.push({
          value: rating,
          filled: false
        });
      });
      this.$timeout(function() {
        _this.updateStarView(_this.ngModel.$viewValue);
      });
    };
    UserRatingController.prototype.setRating = function(rating) {
      this.ngModel.$setViewValue(rating);
      this.updateStarView(rating);
    };
    UserRatingController.prototype.updateStarView = function(rating) {
      _.each(this.stars, function(star) {
        if (star.value <= rating) {
          star.filled = true;
        } else {
          star.filled = false;
        }
      });
    };
    UserRatingController.$inject = ['$timeout', componentsDefaultTheme_1.defaultThemeValueName];
    return UserRatingController;
  }());
  exports.UserRatingController = UserRatingController;
  var userRating = {
    require: {ngModel: 'ngModel'},
    template: "\n\t\t<span class=\"rating\" ng-class=\"{ 'default-theme': userRating.useDefaultTheme }\">\n\t\t\t<span class=\"star\" ng-repeat=\"star in userRating.stars\" ng-class=\"{ 'filled': star.filled }\" ng-click=\"userRating.setRating(star.value)\"></span>\n\t\t</span>\n\t",
    controller: exports.controllerName,
    controllerAs: 'userRating',
    bindings: {range: '='}
  };
  angular.module(exports.moduleName, []).component(exports.componentName, userRating).controller(exports.controllerName, UserRatingController);
  return module.exports;
});

System.registerDynamic("components/components/validationGroup/validationGroup.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"content-group\" ng-form=\"validationGroupForm\">\r\n\t<div class=\"error-message\" ng-if=\"validationGroupForm.$error.customValidation\">\r\n\t\t<label>{{group.groupValidator.error}}</label>\r\n\t</div>\r\n\t<div ng-transclude></div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/components/validationGroup/validationGroup", ["angular", "lodash", "typescript-angular-utilities", "../../services/componentValidator/componentValidator.service", "./validationGroup.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __array = typescript_angular_utilities_1.services.array;
  var componentValidator_service_1 = $__require('../../services/componentValidator/componentValidator.service');
  exports.moduleName = 'rl.ui.components.validationGroup';
  exports.componentName = 'rlValidationGroup';
  exports.controllerName = 'ValidationGroupController';
  var ValidationGroupController = (function() {
    function ValidationGroupController($scope, $timeout, componentValidatorFactory) {
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.componentValidatorFactory = componentValidatorFactory;
    }
    ValidationGroupController.prototype.$onInit = function() {
      var _this = this;
      this.$timeout(function() {
        _this.validators = __array.arrayUtility.arrayify(_this.validator).concat(__array.arrayUtility.arrayify(_this.validators));
        if (!_.isUndefined(_this.validator)) {
          _this.groupValidator = _this.componentValidatorFactory.getInstance({
            form: _this.$scope.validationGroupForm,
            $scope: _this.$scope,
            validators: _this.validators
          });
        }
      });
    };
    ValidationGroupController.$inject = ['$scope', '$timeout', componentValidator_service_1.factoryName];
    return ValidationGroupController;
  }());
  exports.ValidationGroupController = ValidationGroupController;
  var validationGroup = {
    transclude: true,
    template: $__require('./validationGroup.html'),
    controller: exports.controllerName,
    controllerAs: 'group',
    bindings: {
      validator: '<?',
      validators: '<?'
    }
  };
  angular.module(exports.moduleName, [componentValidator_service_1.moduleName]).component(exports.componentName, validationGroup).controller(exports.controllerName, ValidationGroupController);
  return module.exports;
});

System.registerDynamic("components/components/componentsDefaultTheme", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.defaultThemeValueName = 'useDefaultTheme';
  exports.defaultThemeValue = true;
  return module.exports;
});

System.registerDynamic("components/components/components.module", ["angular", "./busy/busy", "./button/button", "./buttonAsync/buttonAsync", "./buttonLink/buttonLink", "./buttonSubmit/buttonSubmit", "./buttonToggle/buttonToggle", "./cardContainer/cardContainer.module", "./checkbox/checkbox", "./commaList/commaList", "./dateTime/dateTime", "./dateTimeStatic/dateTimeStatic", "./dialog/dialog", "./form/form", "./genericContainer/genericContainer", "./lazyLoad/lazyLoad", "./longClickButton/longClickButton", "./messageLog/messageLog.module", "./multiStepIndicator/multiStepIndicator", "./radio/radio.module", "./ratingBar/ratingBar", "./richTextEditor/richTextEditor", "./select/select", "./signaturePad/signaturePad", "./simpleCardList/simpleCardList.module", "./spinner/spinner", "./stringWithWatermark/stringWithWatermark", "./tabs/tabs.module", "./templateRenderer/templateRenderer", "./textarea/textarea", "./textbox/textbox", "./typeahead/typeahead", "./typeaheadList/typeaheadList", "./userRating/userRating", "./validationGroup/validationGroup", "./componentsDefaultTheme"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var busy = $__require('./busy/busy');
  exports.busy = busy;
  var button = $__require('./button/button');
  exports.button = button;
  var buttonAsync = $__require('./buttonAsync/buttonAsync');
  exports.buttonAsync = buttonAsync;
  var buttonLink = $__require('./buttonLink/buttonLink');
  exports.buttonLink = buttonLink;
  var buttonSubmit = $__require('./buttonSubmit/buttonSubmit');
  exports.buttonSubmit = buttonSubmit;
  var buttonToggle = $__require('./buttonToggle/buttonToggle');
  exports.buttonToggle = buttonToggle;
  var cardContainer = $__require('./cardContainer/cardContainer.module');
  exports.cardContainer = cardContainer;
  var checkbox = $__require('./checkbox/checkbox');
  exports.checkbox = checkbox;
  var commaList = $__require('./commaList/commaList');
  exports.commaList = commaList;
  var dateTime = $__require('./dateTime/dateTime');
  exports.dateTime = dateTime;
  var dateTimeStatic = $__require('./dateTimeStatic/dateTimeStatic');
  exports.dateTimeStatic = dateTimeStatic;
  var dialog = $__require('./dialog/dialog');
  exports.dialog = dialog;
  var form = $__require('./form/form');
  exports.form = form;
  var genericContainer = $__require('./genericContainer/genericContainer');
  exports.genericContainer = genericContainer;
  var lazyLoad = $__require('./lazyLoad/lazyLoad');
  exports.lazyLoad = lazyLoad;
  var longClickButton = $__require('./longClickButton/longClickButton');
  exports.longClickButton = longClickButton;
  var messageLog = $__require('./messageLog/messageLog.module');
  exports.messageLog = messageLog;
  var multiStepIndicator = $__require('./multiStepIndicator/multiStepIndicator');
  exports.multiStepIndicator = multiStepIndicator;
  var radio = $__require('./radio/radio.module');
  exports.radio = radio;
  var ratingBar = $__require('./ratingBar/ratingBar');
  exports.ratingBar = ratingBar;
  var richTextEditor = $__require('./richTextEditor/richTextEditor');
  exports.richTextEditor = richTextEditor;
  var select = $__require('./select/select');
  exports.select = select;
  var signaturePad = $__require('./signaturePad/signaturePad');
  exports.signaturePad = signaturePad;
  var simpleCardList = $__require('./simpleCardList/simpleCardList.module');
  exports.simpleCardList = simpleCardList;
  var spinner = $__require('./spinner/spinner');
  exports.spinner = spinner;
  var stringWithWatermark = $__require('./stringWithWatermark/stringWithWatermark');
  exports.stringWithWatermark = stringWithWatermark;
  var tabs = $__require('./tabs/tabs.module');
  exports.tabs = tabs;
  var templateRenderer = $__require('./templateRenderer/templateRenderer');
  exports.templateRenderer = templateRenderer;
  var textarea = $__require('./textarea/textarea');
  exports.textarea = textarea;
  var textbox = $__require('./textbox/textbox');
  exports.textbox = textbox;
  var typeahead = $__require('./typeahead/typeahead');
  exports.typeahead = typeahead;
  var typeaheadList = $__require('./typeaheadList/typeaheadList');
  exports.typeaheadList = typeaheadList;
  var userRating = $__require('./userRating/userRating');
  exports.userRating = userRating;
  var validationGroup = $__require('./validationGroup/validationGroup');
  exports.validationGroup = validationGroup;
  var componentsDefaultTheme_1 = $__require('./componentsDefaultTheme');
  exports.defaultThemeValueName = componentsDefaultTheme_1.defaultThemeValueName;
  exports.moduleName = 'rl.ui.components';
  angular.module(exports.moduleName, [busy.moduleName, button.moduleName, buttonAsync.moduleName, buttonLink.moduleName, buttonSubmit.moduleName, buttonToggle.moduleName, cardContainer.moduleName, checkbox.moduleName, commaList.moduleName, dateTime.moduleName, dateTimeStatic.moduleName, dialog.moduleName, form.moduleName, genericContainer.moduleName, lazyLoad.moduleName, longClickButton.moduleName, messageLog.moduleName, multiStepIndicator.moduleName, radio.moduleName, ratingBar.moduleName, richTextEditor.moduleName, select.moduleName, signaturePad.moduleName, simpleCardList.moduleName, spinner.moduleName, stringWithWatermark.moduleName, tabs.moduleName, templateRenderer.moduleName, textarea.moduleName, textbox.moduleName, typeahead.moduleName, typeaheadList.moduleName, userRating.moduleName, validationGroup.moduleName]).value(componentsDefaultTheme_1.defaultThemeValueName, componentsDefaultTheme_1.defaultThemeValue);
  return module.exports;
});

System.registerDynamic("components/filters/date/date.filter", ["angular", "moment", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var moment = $__require('moment');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __date = typescript_angular_utilities_1.services.date;
  var __object = typescript_angular_utilities_1.services.object;
  exports.moduleName = 'rl.ui.filters.date';
  exports.filterName = 'rlDate';
  function dateFilter() {
    'use strict';
    return function(date, includeTime) {
      if (__object.objectUtility.isNullOrEmpty(date)) {
        return '';
      }
      var momentDate = moment(date);
      if (includeTime) {
        return momentDate.format(__date.defaultFormats.dateTimeFormat) + ' ' + momentDate.zoneAbbr();
      } else {
        return momentDate.format(__date.defaultFormats.dateFormat);
      }
    };
  }
  angular.module(exports.moduleName, []).filter(exports.filterName, dateFilter);
  return module.exports;
});

System.registerDynamic("components/filters/localizeStringDates/localizeStringDates.filter", ["angular", "moment", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var moment = $__require('moment');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var __date = typescript_angular_utilities_1.services.date;
  var __object = typescript_angular_utilities_1.services.object;
  var __timezones = typescript_angular_utilities_1.services.timezone;
  exports.moduleName = 'rl21.ui.filters.localizeStringDates';
  exports.filterName = 'rlLocalizeStringDates';
  function localizeStringDates() {
    'use strict';
    return function(input) {
      if (input == null) {
        return '';
      }
      var timezone = __timezones.timezoneService.currentTimezone.momentName;
      var regex = /([1-9]|1[0-2])\/([1-9]|1\d|2\d|3[01])\/(19|20)\d{2} ([1-9]|1[0-9])\:([0-9])([0-9])(?:\:([0-9])([0-9]))? (AM|PM)(?: UTC)?/g;
      var messageLogText = input;
      var datesToReplace = messageLogText.match(regex);
      if (datesToReplace == null) {
        return messageLogText;
      }
      datesToReplace.forEach(function(date) {
        messageLogText = messageLogText.replace(date, formatDate(date, timezone));
      });
      return messageLogText;
    };
    function formatDate(date, timezone) {
      'use strict';
      var utcString = 'UTC';
      if (__object.objectUtility.isNullOrEmpty(date)) {
        return '';
      }
      if (date.indexOf(utcString) === -1) {
        date = date + ' ' + utcString;
      }
      var momentDate = moment(date);
      return momentDate.tz(timezone).format(__date.defaultFormats.dateTimeFormat) + ' ' + momentDate.tz(timezone).zoneAbbr();
    }
  }
  exports.localizeStringDates = localizeStringDates;
  angular.module(exports.moduleName, []).filter(exports.filterName, localizeStringDates);
  return module.exports;
});

System.registerDynamic("components/filters/filters.module", ["angular", "./date/date.filter", "./localizeStringDates/localizeStringDates.filter"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var date = $__require('./date/date.filter');
  exports.date = date;
  var localizeStringDates = $__require('./localizeStringDates/localizeStringDates.filter');
  exports.localizeStringDates = localizeStringDates;
  exports.moduleName = 'rl.ui.filters';
  angular.module(exports.moduleName, [date.moduleName, localizeStringDates.moduleName]);
  return module.exports;
});

System.registerDynamic("components/services/breakpoints/visibleBreakpoint.service", ["jquery"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $ = $__require('jquery');
  exports.visibleBreakpointServiceName = 'visibleBreakpoint';
  var VisibleBreakpointService = (function() {
    function VisibleBreakpointService() {}
    VisibleBreakpointService.prototype.isVisible = function(breakpoint) {
      return $('.device-' + breakpoint).is(':visible');
    };
    return VisibleBreakpointService;
  }());
  exports.VisibleBreakpointService = VisibleBreakpointService;
  return module.exports;
});

System.registerDynamic("components/services/breakpoints/breakpoints.service", ["lodash", "rxjs", "../windowWrapper/windowWrapper.service", "./visibleBreakpoint.service", "./breakpoint"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var rxjs_1 = $__require('rxjs');
  var windowWrapper_service_1 = $__require('../windowWrapper/windowWrapper.service');
  var visibleBreakpoint_service_1 = $__require('./visibleBreakpoint.service');
  var breakpoint_1 = $__require('./breakpoint');
  exports.breakpointServiceName = 'breakpoints';
  var BreakpointService = (function() {
    function BreakpointService($rootScope, visibleBreakpoints, resizeDebounceMilliseconds, windowService) {
      var _this = this;
      this.$rootScope = $rootScope;
      this.visibleBreakpoints = visibleBreakpoints;
      this.updateBreakpoint = function() {
        var newBreakPoint = _this.getBreakpoint();
        if (newBreakPoint !== _this.currentBreakpoint) {
          _this.$rootScope.$apply(function() {
            _this.currentBreakpoint = newBreakPoint;
            _this.breakpointChanges.next(_this.currentBreakpoint);
          });
        }
      };
      this.breakpointChanges = new rxjs_1.Subject();
      this.currentBreakpoint = this.getBreakpoint();
      var efficientResize = _.debounce(this.updateBreakpoint, resizeDebounceMilliseconds, {
        leading: true,
        trailing: true,
        maxWait: resizeDebounceMilliseconds
      });
      windowService.resize(efficientResize);
    }
    BreakpointService.prototype.getBreakpoint = function() {
      if (this.visibleBreakpoints.isVisible(breakpoint_1.lg)) {
        return breakpoint_1.lg;
      } else if (this.visibleBreakpoints.isVisible(breakpoint_1.md)) {
        return breakpoint_1.md;
      } else if (this.visibleBreakpoints.isVisible(breakpoint_1.sm)) {
        return breakpoint_1.sm;
      } else {
        return breakpoint_1.xs;
      }
    };
    BreakpointService.prototype.isBreakpoint = function(breakpoint) {
      return this.currentBreakpoint === breakpoint;
    };
    BreakpointService.$inject = ['$rootScope', visibleBreakpoint_service_1.visibleBreakpointServiceName, 'resizeDebounceMilliseconds', windowWrapper_service_1.serviceName];
    return BreakpointService;
  }());
  exports.BreakpointService = BreakpointService;
  return module.exports;
});

System.registerDynamic("components/services/breakpoints/breakpoint", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.lg = 'lg';
  exports.md = 'md';
  exports.sm = 'sm';
  exports.xs = 'xs';
  exports.all = [exports.xs, exports.sm, exports.md, exports.lg];
  return module.exports;
});

System.registerDynamic("components/services/breakpoints/breakpoints.module", ["angular", "../windowWrapper/windowWrapper.service", "./visibleBreakpoint.service", "./breakpoints.service", "./breakpoint"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var windowWrapper_service_1 = $__require('../windowWrapper/windowWrapper.service');
  var visibleBreakpoint_service_1 = $__require('./visibleBreakpoint.service');
  var breakpoints_service_1 = $__require('./breakpoints.service');
  __export($__require('./breakpoint'));
  __export($__require('./visibleBreakpoint.service'));
  __export($__require('./breakpoints.service'));
  exports.moduleName = 'rl.ui.services.breakpoints';
  angular.module(exports.moduleName, [windowWrapper_service_1.moduleName]).constant('resizeDebounceMilliseconds', 500).service(visibleBreakpoint_service_1.visibleBreakpointServiceName, visibleBreakpoint_service_1.VisibleBreakpointService).service(breakpoints_service_1.breakpointServiceName, breakpoints_service_1.BreakpointService);
  return module.exports;
});

System.registerDynamic("components/services/componentValidator/componentValidator.service", ["angular", "lodash", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  exports.moduleName = 'rl.ui.services.componentValidator';
  exports.factoryName = 'componentValidator';
  var ComponentValidator = (function() {
    function ComponentValidator(validationService, options) {
      var _this = this;
      this.$scope = options.$scope;
      this.ngModel = options.ngModel;
      this.form = options.form;
      this.validator = validationService.buildCustomValidator(function(error, name) {
        _this.error = error;
        _this.errorType = name || 'customValidation';
      });
      _.each(options.validators, function(customValidator) {
        _this.validator.registerValidationHandler(customValidator);
      });
      this.setValidator();
    }
    ComponentValidator.prototype.setValidator = function() {
      var _this = this;
      return this.$scope.$watch(this.validator.validate.bind(this.validator), function(value) {
        if (value) {
          _this.error = null;
        }
        if (!_.isUndefined(_this.ngModel)) {
          _this.ngModel.$setValidity(_this.errorType, value);
          _this.ngModel.rlErrorMessage = _this.error;
        } else if (!_.isUndefined(_this.form)) {
          _this.form.$setValidity(_this.errorType, value, 'group');
          _this.form.rlErrorMessage = _this.error;
        } else if (_.isFunction(_this.setValidity)) {
          _this.setValidity(value);
        }
      });
    };
    return ComponentValidator;
  }());
  exports.ComponentValidator = ComponentValidator;
  componentValidatorFactory.$inject = [typescript_angular_utilities_1.downgrade.validationServiceName];
  function componentValidatorFactory(validationService) {
    return {getInstance: function(options) {
        return new ComponentValidator(validationService, options);
      }};
  }
  exports.componentValidatorFactory = componentValidatorFactory;
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).factory(exports.factoryName, componentValidatorFactory);
  return module.exports;
});

System.registerDynamic("components/services/contentProvider/contentProvider.service", ["angular", "lodash", "rxjs"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ng = $__require('angular');
  var _ = $__require('lodash');
  var rxjs_1 = $__require('rxjs');
  exports.moduleName = 'rl.utilities.services.contentProvider';
  exports.serviceName = 'contentProviderFactory';
  var ContentProviderService = (function() {
    function ContentProviderService() {
      var _this = this;
      this.setTranscludeContent = function(transcludeFunction) {
        var scope = null;
        if (_.isFunction(transcludeFunction)) {
          transcludeFunction(function(clone, transcludeScope) {
            _this.setContent(clone, transcludeScope);
          });
        } else {
          _this.setContent(null);
        }
      };
      this.contentChanges = new rxjs_1.BehaviorSubject({newContent: ng.element('')});
    }
    ContentProviderService.prototype.setContent = function(content, scope) {
      this.content = content;
      this.scope = scope;
      this.contentChanges.next({
        newContent: content,
        scope: scope
      });
    };
    ContentProviderService.prototype.getContent = function(selector) {
      if (selector != null) {
        return this.content.filter(selector);
      }
      return this.content;
    };
    return ContentProviderService;
  }());
  contentProviderServiceFactory.$inject = [];
  function contentProviderServiceFactory() {
    'use strict';
    return {getInstance: function() {
        return new ContentProviderService();
      }};
  }
  ng.module(exports.moduleName, []).factory(exports.serviceName, contentProviderServiceFactory);
  return module.exports;
});

System.registerDynamic("components/services/dialog/bootstrapModalDialog/bootstrapModalDialog.controller", ["./bootstrapModalDialog.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var bootstrapModalDialog_service_1 = $__require('./bootstrapModalDialog.service');
  exports.controllerName = 'BootstrapModalDialogController';
  var BootstrapModalDialogController = (function() {
    function BootstrapModalDialogController($scope, $controller, baseDialog) {
      var controller;
      if ($scope.modalController != null) {
        var locals = $scope.resolveData || {};
        $scope.resolveData = null;
        locals.$scope = $scope;
        controller = $controller($scope.modalController, locals);
      }
      $scope.$on('modal.closing', baseDialog.modalClosing);
      return controller;
    }
    BootstrapModalDialogController.$inject = ['$scope', '$controller', bootstrapModalDialog_service_1.serviceName];
    return BootstrapModalDialogController;
  }());
  exports.BootstrapModalDialogController = BootstrapModalDialogController;
  return module.exports;
});

System.registerDynamic("components/services/dialog/bootstrapModalDialog/bootstrapModalDialog.service", ["lodash", "../../promise/promise.service", "./bootstrapModalDialog.controller"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var promise_service_1 = $__require('../../promise/promise.service');
  var bootstrapModalDialog_controller_1 = $__require('./bootstrapModalDialog.controller');
  exports.serviceName = 'uiBootstrapModelDialog';
  var BootstrapModalDialogService = (function() {
    function BootstrapModalDialogService($modal, $rootScope, promise) {
      var _this = this;
      this.$modal = $modal;
      this.$rootScope = $rootScope;
      this.promise = promise;
      this.modalClosing = function(event, reason, explicitlyClosed) {
        var canClose = true;
        if (_.isFunction(_this.closeHandler)) {
          canClose = _this.closeHandler(explicitlyClosed);
        }
        if (!canClose) {
          event.preventDefault();
        }
      };
    }
    BootstrapModalDialogService.prototype.open = function(options, closeHandler) {
      var _this = this;
      if (options == null) {
        options = {};
      }
      var dialogInstance = {
        close: function() {},
        dismiss: function() {}
      };
      this.promise.resolvePromises(options.resolve).then(function(results) {
        _this.closeHandler = closeHandler;
        options = _this.configureModalSettings(options, results);
        var modalInstance = _this.$modal.open(options);
        dialogInstance.close = modalInstance.close;
        dialogInstance.dismiss = modalInstance.dismiss;
      });
      return dialogInstance;
    };
    BootstrapModalDialogService.prototype.prompt = function(options, template) {
      var acceptHandler = options.acceptHandler || function() {};
      var cancelHandler = options.cancelHandler || function() {};
      options.acceptHandler = null;
      options.cancelHandler = null;
      var modalScope = this.$rootScope.$new();
      modalScope.prompt = options;
      var settings = {
        scope: modalScope,
        template: template,
        controller: bootstrapModalDialog_controller_1.controllerName
      };
      var modalInstance = this.$modal.open(settings);
      var accept = function() {
        acceptHandler();
        modalInstance.close();
      };
      var cancel = function() {
        cancelHandler();
        modalInstance.close();
      };
      modalScope.$accept = accept;
      modalScope.$cancel = cancel;
      return {
        accept: accept,
        cancel: cancel,
        close: modalInstance.close,
        dismiss: modalInstance.dismiss
      };
    };
    BootstrapModalDialogService.prototype.configureModalSettings = function(options, resolveData) {
      var modalScope = options.scope;
      if (modalScope == null) {
        modalScope = this.$rootScope.$new();
      }
      if (options.resolveToDialog) {
        if (options.dialogAs != null) {
          modalScope[options.dialogAs] = resolveData;
        } else {
          modalScope = _.extend(modalScope, resolveData);
        }
      } else {
        modalScope.resolveData = resolveData;
      }
      modalScope.modalController = options.controller;
      options.resolve = null;
      options.controller = bootstrapModalDialog_controller_1.controllerName;
      options.scope = modalScope;
      return options;
    };
    BootstrapModalDialogService.$inject = ['$uibModal', '$rootScope', promise_service_1.serviceName];
    return BootstrapModalDialogService;
  }());
  exports.BootstrapModalDialogService = BootstrapModalDialogService;
  return module.exports;
});

System.registerDynamic("components/services/dialog/bootstrapModalDialog/bootstrapModalDialog.module", ["angular", "typescript-angular-utilities", "./bootstrapModalDialog.controller", "./bootstrapModalDialog.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var bootstrapModalDialog_controller_1 = $__require('./bootstrapModalDialog.controller');
  var bootstrapModalDialog_service_1 = $__require('./bootstrapModalDialog.service');
  __export($__require('./bootstrapModalDialog.controller'));
  __export($__require('./bootstrapModalDialog.service'));
  exports.moduleName = 'rl.ui.services.dialog.bootstrapModalDialog';
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).controller(bootstrapModalDialog_controller_1.controllerName, bootstrapModalDialog_controller_1.BootstrapModalDialogController).service(bootstrapModalDialog_service_1.serviceName, bootstrapModalDialog_service_1.BootstrapModalDialogService);
  return module.exports;
});

System.registerDynamic("components/services/autosaveAction/autosaveAction.service", ["angular"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ng = $__require('angular');
  exports.moduleName = 'rl.utilities.services.autosaveAction';
  exports.serviceName = 'autosaveAction';
  var AutosaveActionService = (function() {
    function AutosaveActionService($timeout) {
      var _this = this;
      this.$timeout = $timeout;
      this.completeMessageDuration = 1000;
      this.autosaveSuccessful = function(data) {
        return _this.resolveAutosave(data, true);
      };
      this.autosaveFailed = function(data) {
        return _this.resolveAutosave(data, false);
      };
      this.resolveAutosave = function(data, success) {
        _this._saving = false;
        _this._complete = true;
        _this._successful = success;
        _this.$timeout(function() {
          _this._complete = false;
        }, _this.completeMessageDuration);
        return data;
      };
    }
    Object.defineProperty(AutosaveActionService.prototype, "saving", {
      get: function() {
        return this._saving;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AutosaveActionService.prototype, "complete", {
      get: function() {
        return this._complete;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AutosaveActionService.prototype, "successful", {
      get: function() {
        return this._successful;
      },
      enumerable: true,
      configurable: true
    });
    AutosaveActionService.prototype.trigger = function(promise) {
      this._saving = true;
      return promise.then(this.autosaveSuccessful).catch(this.autosaveFailed);
    };
    AutosaveActionService.$inject = ['$timeout'];
    return AutosaveActionService;
  }());
  ng.module(exports.moduleName, []).service(exports.serviceName, AutosaveActionService);
  return module.exports;
});

System.registerDynamic("components/services/autosave/triggers/onChangeTrigger", ["lodash", "./trigger"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var _ = $__require('lodash');
  var trigger_1 = $__require('./trigger');
  var OnChangeTrigger = (function(_super) {
    __extends(OnChangeTrigger, _super);
    function OnChangeTrigger($rootScope, $timeout) {
      _super.call(this, 'onChange');
      this.$rootScope = $rootScope;
      this.$timeout = $timeout;
      this.debounceDuration = 1000;
    }
    OnChangeTrigger.prototype.setTrigger = function(autosave) {
      var _this = this;
      if (_.isUndefined(this.settings)) {
        return;
      }
      this.initListeners();
      this.$rootScope.$watch(function() {
        return _this.settings.form != null ? _this.settings.form.$dirty : false;
      }, function() {
        _this.triggerSaveAction(autosave);
      });
      this.$rootScope.$watch(function() {
        return _this.settings.form != null ? _this.settings.form.$valid : false;
      }, function() {
        _this.triggerSaveAction(autosave);
      });
    };
    OnChangeTrigger.prototype.triggerSaveAction = function(autosave) {
      var _this = this;
      if (this.settings.form.$dirty && (this.settings.form.$valid || this.settings.saveWhenInvalid)) {
        this.setTimer(autosave);
        this.clearListener = this.setListener(function() {
          _this.setTimer(autosave);
        });
      }
    };
    OnChangeTrigger.prototype.setTimer = function(autosave) {
      var _this = this;
      if (this.timer != null) {
        this.$timeout.cancel(this.timer);
      }
      this.timer = this.$timeout(function() {
        _this.clearListener();
        autosave();
      }, this.debounceDuration);
    };
    OnChangeTrigger.prototype.initListeners = function() {
      this.setListener = this.settings.setChangeListener || this.nullSetListener;
      this.clearListener = this.nullClearListener;
    };
    OnChangeTrigger.prototype.nullSetListener = function() {
      console.log('No change listener available');
      return this.nullClearListener;
    };
    OnChangeTrigger.prototype.nullClearListener = function() {
      console.log('No change listener register');
    };
    return OnChangeTrigger;
  }(trigger_1.Trigger));
  exports.OnChangeTrigger = OnChangeTrigger;
  return module.exports;
});

System.registerDynamic("components/services/autosave/triggers/trigger", ["lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var Trigger = (function() {
    function Trigger(aliases, triggerAction) {
      this.triggerAction = triggerAction;
      this.aliases = aliases.split(' ');
    }
    Trigger.prototype.setTrigger = function(autosave) {
      if (_.isFunction(this.triggerAction)) {
        this.triggerAction(this.settings);
      }
    };
    Trigger.prototype.hasMatch = function(triggers) {
      var _this = this;
      var triggerList = triggers.split(' ');
      return _.some(triggerList, function(trigger) {
        return _.some(_this.aliases, function(alias) {
          return trigger === alias;
        });
      });
    };
    Trigger.prototype.configure = function(settings) {
      this.settings = settings;
    };
    return Trigger;
  }());
  exports.Trigger = Trigger;
  return module.exports;
});

System.registerDynamic("components/services/autosave/triggers/triggers.service", ["angular", "lodash", "./onChangeTrigger", "./trigger"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var onChangeTrigger_1 = $__require('./onChangeTrigger');
  var trigger_1 = $__require('./trigger');
  __export($__require('./onChangeTrigger'));
  __export($__require('./trigger'));
  exports.defaultTriggers = 'onChange';
  exports.moduleName = 'rl.ui.services.autosave.triggers';
  exports.factoryName = 'autosaveTriggers';
  var TriggerService = (function() {
    function TriggerService($rootScope, $timeout) {
      this.triggers = {
        onChange: new onChangeTrigger_1.OnChangeTrigger($rootScope, $timeout),
        none: new trigger_1.Trigger('none')
      };
    }
    TriggerService.prototype.setTriggers = function(triggerString, autosave) {
      if (triggerString == null) {
        triggerString = exports.defaultTriggers;
      }
      _.each(this.triggers, function(trigger) {
        if (trigger.hasMatch(triggerString)) {
          trigger.setTrigger(autosave);
        }
      });
    };
    return TriggerService;
  }());
  triggerServiceFactory.$inject = ['$rootScope', '$timeout'];
  function triggerServiceFactory($rootScope, $timeout) {
    return {getInstance: function() {
        return new TriggerService($rootScope, $timeout);
      }};
  }
  angular.module(exports.moduleName, []).factory(exports.factoryName, triggerServiceFactory);
  return module.exports;
});

System.registerDynamic("components/services/autosave/autosave.service", ["angular", "lodash", "typescript-angular-utilities", "../autosaveAction/autosaveAction.service", "./triggers/triggers.service", "../form/form.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var autosaveAction_service_1 = $__require('../autosaveAction/autosaveAction.service');
  var triggers = $__require('./triggers/triggers.service');
  exports.triggers = triggers;
  var form_service_1 = $__require('../form/form.service');
  exports.moduleName = 'rl.ui.services.autosave';
  exports.factoryName = 'autosaveFactory';
  var AutosaveService = (function() {
    function AutosaveService(notification, autosaveService, options, triggerServiceFactory, formService) {
      var _this = this;
      this.notification = notification;
      this.autosaveService = autosaveService;
      this.formService = formService;
      this.autosave = function() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          data[_i - 0] = arguments[_i];
        }
        var result = _this.validateAndSave.apply(_this, data);
        if (_.isBoolean(result)) {
          return result;
        } else {
          _this.autosaveService.trigger(result);
          return true;
        }
      };
      this.contentForm = options.contentForm || this.nullForm();
      this.save = options.save;
      this.saveWhenInvalid = options.saveWhenInvalid;
      this.triggerService = triggerServiceFactory.getInstance();
      this.configureTriggers(options);
      this.triggerService.setTriggers(options.triggers, this.autosave);
    }
    AutosaveService.prototype.validateAndSave = function() {
      var _this = this;
      var data = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        data[_i - 0] = arguments[_i];
      }
      if (this.contentForm.$pristine) {
        return true;
      }
      if (this.contentForm.$valid || this.saveWhenInvalid) {
        var promise = this.save.apply(this, data);
        if (!_.isUndefined(promise)) {
          return promise.then(function() {
            if (_this.contentForm != null) {
              _this.contentForm.$setPristine();
            }
          });
        }
        return true;
      } else {
        this.notification.warning(this.formService.getAggregateError(this.contentForm));
        return false;
      }
    };
    AutosaveService.prototype.configureTriggers = function(options) {
      this.triggerService.triggers.onChange.configure({
        form: options.contentForm,
        setChangeListener: options.setChangeListener,
        debounceDuration: options.debounceDuration,
        saveWhenInvalid: options.saveWhenInvalid
      });
    };
    AutosaveService.prototype.nullForm = function() {
      return {
        $pristine: false,
        $dirty: true,
        $valid: true,
        $setPristine: function() {
          return;
        }
      };
    };
    return AutosaveService;
  }());
  autosaveServiceFactory.$inject = [typescript_angular_utilities_1.downgrade.notificationServiceName, autosaveAction_service_1.serviceName, triggers.factoryName, form_service_1.serviceName];
  function autosaveServiceFactory(notification, autosaveService, triggerServiceFactory, formService) {
    'use strict';
    return {getInstance: function(options) {
        return new AutosaveService(notification, autosaveService, options, triggerServiceFactory, formService);
      }};
  }
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName, autosaveAction_service_1.moduleName, triggers.moduleName, form_service_1.moduleName]).factory(exports.factoryName, autosaveServiceFactory);
  return module.exports;
});

System.registerDynamic("components/components/dialog/autosaveDialogFooter.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<rl-button type=\"danger\" action=\"dialog.close()\"><i class=\"fa fa-times\"></i> Cancel</rl-button>\r\n<rl-button-async type=\"success\" action=\"dialog.saveAndClose()\"><i class=\"fa fa-check\"></i> Save</rl-button-submit>";
  return module.exports;
});

System.registerDynamic("components/components/dialog/dialog.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<rl-form save=\"dialog.saveAndClose()\" saving=\"dialog.saving\" form=\"dialog.form\">\r\n\t<div class=\"modal-header\">\r\n\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"dialog.close()\">\r\n\t\t\t<span class=\"fa-stack\">\r\n\t\t\t\t<i class=\"close-bg fa fa-circle fa-stack-2x\"></i>\r\n\t\t\t\t<i class=\"close-icon fa fa-close fa-stack-1x\"></i>\r\n\t\t\t</span>\r\n\t\t</button>\r\n\t\t<div ng-transclude=\"headerSlot\"></div>\r\n\t\t<div class=\"clearfix \"></div>\r\n\t</div>\r\n\t<div class=\"modal-body\">\r\n\t\t<div ng-transclude=\"contentSlot\"></div>\r\n\t\t<div class=\"clearfix\"></div>\r\n\t</div>\r\n\t<div class=\"modal-footer\" ng-show=\"dialog.hasFooter\">\r\n\t\t<div class=\"footer-template\"></div>\r\n\t\t<div class=\"clearfix\"></div>\r\n\t</div>\r\n</rl-form>";
  return module.exports;
});

System.registerDynamic("components/components/dialog/dialog", ["angular", "../../services/dialog/dialog.service", "./autosaveDialogFooter.html", "./dialog.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var dialog_service_1 = $__require('../../services/dialog/dialog.service');
  exports.moduleName = 'rl.ui.components.dialog';
  exports.componentName = 'rlDialog';
  exports.controllerName = 'DialogController';
  var DialogController = (function() {
    function DialogController($scope, $element, $transclude, $compile, dialogService) {
      this.$scope = $scope;
      this.$element = $element;
      this.$transclude = $transclude;
      this.$compile = $compile;
      this.dialogService = dialogService;
    }
    DialogController.prototype.$onInit = function() {
      var _this = this;
      var unbind = this.$scope.$watch(function() {
        return _this.form;
      }, function(form) {
        if (form != null) {
          _this.dialogService.setForm(form);
          unbind();
        }
      });
    };
    DialogController.prototype.$postLink = function() {
      var _this = this;
      this.close = this.$scope.$parent.$close;
      this.dismiss = this.$scope.$parent.$dismiss;
      this.saveAndClose = this.$scope.$parent.$saveAndClose;
      var footerArea = this.$element.find('.footer-template');
      if (this.$transclude.isSlotFilled('footerSlot')) {
        this.$transclude(function(footer) {
          _this.hasFooter = (footer.length > 0);
          if (_this.hasFooter) {
            footerArea.append(footer);
          }
        }, null, 'footerSlot');
      } else if (this.autosave) {
        var footer = this.$compile($__require('./autosaveDialogFooter.html'))(this.$scope);
        this.hasFooter = true;
        footerArea.append(footer);
      }
    };
    DialogController.$inject = ['$scope', '$element', '$transclude', '$compile', dialog_service_1.serviceName];
    return DialogController;
  }());
  exports.DialogController = DialogController;
  var dialog = {
    transclude: {
      headerSlot: '?rlDialogHeader',
      contentSlot: '?rlDialogContent',
      footerSlot: '?rlDialogFooter'
    },
    template: $__require('./dialog.html'),
    controller: exports.controllerName,
    controllerAs: 'dialog',
    bindings: {autosave: '='}
  };
  angular.module(exports.moduleName, [dialog_service_1.moduleName]).component(exports.componentName, dialog).controller(exports.controllerName, DialogController);
  return module.exports;
});

System.registerDynamic("components/services/dialog/promptDialog.html", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "<div class=\"modal-body\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-xs-12\">\r\n\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"$dismiss()\">\r\n\t\t\t\t<span class=\"fa-stack\">\r\n\t\t\t\t\t<i class=\"close-bg fa fa-circle fa-stack-2x\"></i>\r\n\t\t\t\t\t<i class=\"close-icon fa fa-close fa-stack-1x\"></i>\r\n\t\t\t\t</span>\r\n\t\t\t</button>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t{{prompt.message}}\r\n\t<div class=\"clearfix\"></div>\r\n</div>\r\n<div class=\"modal-footer\">\r\n\t<button class=\"btn btn-danger\" type=\"button\" ng-click=\"$cancel()\"><i class=\"fa fa-times\"></i> {{prompt.cancelButton}}</button>\r\n\t<button class=\"btn btn-success\" type=\"button\" ng-click=\"$accept()\"><i class=\"fa fa-check\"></i> {{prompt.okButton}}</button>\r\n\t<div class=\"clearfix\"></div>\r\n</div>";
  return module.exports;
});

System.registerDynamic("components/services/dialog/dialog.service", ["angular", "lodash", "typescript-angular-utilities", "../../services/promise/promise.service", "./bootstrapModalDialog/bootstrapModalDialog.module", "../autosave/autosave.service", "../form/form.service", "../../components/dialog/dialog", "./promptDialog.html"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  var promise_service_1 = $__require('../../services/promise/promise.service');
  var bootstrapModalDialog = $__require('./bootstrapModalDialog/bootstrapModalDialog.module');
  exports.bootstrapModalDialog = bootstrapModalDialog;
  var autosave_service_1 = $__require('../autosave/autosave.service');
  var form_service_1 = $__require('../form/form.service');
  var dialog_1 = $__require('../../components/dialog/dialog');
  exports.componentName = dialog_1.componentName;
  exports.controllerName = dialog_1.controllerName;
  exports.DialogController = dialog_1.DialogController;
  exports.moduleName = 'rl.ui.services.dialog';
  exports.serviceName = 'dialog';
  var DialogService = (function() {
    function DialogService(dialog, $rootScope, autosaveFactory, promise, notification, formService) {
      var _this = this;
      this.dialog = dialog;
      this.$rootScope = $rootScope;
      this.autosaveFactory = autosaveFactory;
      this.promise = promise;
      this.notification = notification;
      this.formService = formService;
      this.autosaveCloseHandler = function(explicit) {
        if (explicit) {
          return true;
        }
        return _this.autosave.autosave(_this.data);
      };
    }
    DialogService.prototype.open = function(options, closeHandler) {
      var _this = this;
      var dialogInstance = this.dialog.open(options, closeHandler);
      dialogInstance.validateAndNotify = function() {
        var valid = _this.form.$valid;
        if (!valid) {
          _this.notification.warning(_this.formService.getAggregateError(_this.form));
        }
        return valid;
      };
      return dialogInstance;
    };
    DialogService.prototype.prompt = function(options) {
      options.okButton = options.okButton || 'Ok';
      options.cancelButton = options.cancelButton || 'Cancel';
      return this.dialog.prompt(options, $__require('./promptDialog.html'));
    };
    DialogService.prototype.openForm = function(options) {
      var _this = this;
      var dialogInstance = {
        close: function() {},
        dismiss: function() {},
        save: function() {},
        saveAndClose: function() {},
        validateAndNotify: function() {}
      };
      this.promise.resolvePromises(options.resolve).then(function(resolveData) {
        var scope = options.scope;
        if (scope == null) {
          scope = _this.$rootScope.$new();
          options.scope = scope;
        }
        if (options.data == null) {
          options.data = {};
        }
        if (options.triggers == null) {
          options.triggers = 'none';
        }
        _this.autosave = _this.autosaveFactory.getInstance({
          save: options.save,
          triggers: options.triggers
        });
        _this.data = _.extend(options.data, resolveData);
        scope.dialog = _this.data;
        var instance = _this.open(options, _this.autosaveCloseHandler);
        dialogInstance.close = instance.close;
        dialogInstance.dismiss = instance.dismiss;
        scope.$save = function() {
          return _this.autosave.validateAndSave(_this.data);
        };
        ;
        scope.$saveAndClose = function() {
          var promise = scope.$save();
          if (_.isBoolean(promise) && promise) {
            instance.close();
          } else if (_this.promise.isPromise(promise)) {
            promise.then(function() {
              instance.close();
            });
          }
          return promise;
        };
        dialogInstance.save = scope.$save;
        dialogInstance.saveAndClose = scope.$saveAndClose;
        dialogInstance.validateAndNotify = instance.validateAndNotify;
      });
      return dialogInstance;
    };
    DialogService.prototype.setForm = function(form) {
      if (this.autosave != null) {
        this.autosave.contentForm = form;
      }
      this.form = form;
    };
    return DialogService;
  }());
  exports.DialogService = DialogService;
  function dialogServiceProvider() {
    'use strict';
    var _this = this;
    var provider = {
      setImplementation: function(dialogImplementation) {
        _this.dialogImplementation = dialogImplementation;
      },
      $get: function(bootstrapModalDialog, $rootScope, autosaveFactory, promise, notification, formService) {
        var dialogImplementation = _this.dialogImplementation != null ? _this.dialogImplementation : bootstrapModalDialog;
        return new DialogService(dialogImplementation, $rootScope, autosaveFactory, promise, notification, formService);
      }
    };
    provider.$get.$inject = [bootstrapModalDialog.serviceName, '$rootScope', autosave_service_1.factoryName, promise_service_1.serviceName, typescript_angular_utilities_1.downgrade.notificationServiceName, form_service_1.serviceName];
    return provider;
  }
  exports.dialogServiceProvider = dialogServiceProvider;
  angular.module(exports.moduleName, [bootstrapModalDialog.moduleName, autosave_service_1.moduleName, typescript_angular_utilities_1.downgrade.moduleName, promise_service_1.moduleName, form_service_1.moduleName]).provider(exports.serviceName, dialogServiceProvider);
  return module.exports;
});

System.registerDynamic("components/services/documentWrapper/documentWrapper.service", ["angular", "jquery"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var $ = $__require('jquery');
  exports.moduleName = 'rl.ui.services.documentWrapper';
  exports.serviceName = 'documentWrapper';
  var DocumentService = (function() {
    function DocumentService() {
      this.documentControl = $(document);
    }
    DocumentService.prototype.height = function() {
      return this.documentControl.height();
    };
    return DocumentService;
  }());
  angular.module(exports.moduleName, []).service(exports.serviceName, DocumentService);
  return module.exports;
});

System.registerDynamic("components/services/form/form.service", ["angular", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  exports.moduleName = 'rl.ui.services.form';
  exports.serviceName = 'formService';
  var FormService = (function() {
    function FormService() {}
    FormService.prototype.getAggregateError = function(form) {
      var filteredForm = _.filter(form, function(prop) {
        return prop != null && prop.rlErrorMessage != null;
      });
      var errors = _.mapValues(filteredForm, 'rlErrorMessage');
      return _.first(errors);
    };
    return FormService;
  }());
  angular.module(exports.moduleName, []).service(exports.serviceName, FormService);
  return module.exports;
});

System.registerDynamic("components/services/jquery/jquery.service", ["angular"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  exports.moduleName = 'rl.utilities.services.jquery';
  exports.serviceName = 'jqueryUtility';
  var JQueryUtility = (function() {
    function JQueryUtility() {}
    JQueryUtility.prototype.getHtml = function(jquery) {
      return angular.element('<div>').append(jquery).html();
    };
    JQueryUtility.prototype.replaceContent = function(contentArea, newContent) {
      contentArea.empty();
      return contentArea.append(newContent);
    };
    return JQueryUtility;
  }());
  angular.module(exports.moduleName, []).service(exports.serviceName, JQueryUtility);
  return module.exports;
});

System.registerDynamic("components/services/promise/promise.service", ["angular", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  exports.moduleName = 'rl.utilities.services.promise';
  exports.serviceName = 'promiseUtility';
  var PromiseUtility = (function() {
    function PromiseUtility($q, $injector) {
      this.$q = $q;
      this.$injector = $injector;
    }
    PromiseUtility.prototype.isPromise = function(promise) {
      return _.isObject(promise) && _.isFunction(promise.then) && _.isFunction(promise.catch);
    };
    PromiseUtility.prototype.resolvePromises = function(resolves) {
      var _this = this;
      var promises = {};
      _.each(resolves, function(value, key) {
        if (_.isFunction(value) || _.isArray(value)) {
          promises[key] = (_this.$q.when(_this.$injector.invoke(value)));
        } else if (_.isString(value)) {
          promises[key] = (_this.$q.when(_this.$injector.get(value)));
        } else {
          promises[key] = (_this.$q.when(value));
        }
      });
      return this.$q.all(promises);
    };
    PromiseUtility.$inject = ['$q', '$injector'];
    return PromiseUtility;
  }());
  angular.module(exports.moduleName, []).service(exports.serviceName, PromiseUtility);
  return module.exports;
});

System.registerDynamic("components/services/templateLoader/templateLoader.service", ["angular", "lodash", "typescript-angular-utilities"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var _ = $__require('lodash');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  exports.moduleName = 'rl.utilities.services.templateLoader';
  exports.serviceName = 'templateLoader';
  var TemplateLoader = (function() {
    function TemplateLoader($interpolate, templateSelectorValue, objectUtility) {
      this.$interpolate = $interpolate;
      this.templateSelectorValue = templateSelectorValue;
      this.objectUtility = objectUtility;
    }
    TemplateLoader.prototype.loadTemplates = function(transclude) {
      var _this = this;
      var result = {
        templates: {},
        default: null,
        transclusionScope: null
      };
      transclude(function(clone, transclusionScope) {
        var templates = clone.filter(_this.templateSelectorValue);
        templates.each(function(index, template) {
          var templateElement = angular.element(template);
          var templateHtml = '<span>' + templateElement.html() + '</span>';
          var triggerAttribute = templateElement.attr('when-selector');
          if (!_this.objectUtility.isNullOrWhitespace(triggerAttribute)) {
            var trigger = _this.$interpolate(triggerAttribute)(transclusionScope);
            result.templates[trigger] = templateHtml;
          }
          var isDefault = templateElement.attr('default');
          if (!_.isUndefined(isDefault) && isDefault.toLowerCase() !== 'false') {
            result.default = templateHtml;
          }
        });
        result.transclusionScope = transclusionScope;
      });
      return result;
    };
    TemplateLoader.$inject = ['$interpolate', 'templateSelectorValue', typescript_angular_utilities_1.downgrade.objectServiceName];
    return TemplateLoader;
  }());
  angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName]).value('templateSelectorValue', 'template').service(exports.serviceName, TemplateLoader);
  return module.exports;
});

System.registerDynamic("components/services/windowWrapper/windowWrapper.service", ["angular", "jquery"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var $ = $__require('jquery');
  exports.moduleName = 'rl.ui.services.windowWrapper';
  exports.serviceName = 'windowWrapper';
  var WindowService = (function() {
    function WindowService() {
      this.windowControl = $(window);
    }
    WindowService.prototype.resize = function(callback) {
      this.windowControl.resize(callback);
    };
    WindowService.prototype.scrollTop = function() {
      return this.windowControl.scrollTop();
    };
    WindowService.prototype.scroll = function(handler) {
      this.windowControl.scroll(handler);
    };
    WindowService.prototype.height = function() {
      return this.windowControl.height();
    };
    return WindowService;
  }());
  angular.module(exports.moduleName, []).service(exports.serviceName, WindowService);
  return module.exports;
});

System.registerDynamic("components/services/services.module", ["angular", "./autosave/autosave.service", "./autosaveAction/autosaveAction.service", "./breakpoints/breakpoints.module", "./componentValidator/componentValidator.service", "./contentProvider/contentProvider.service", "./dialog/dialog.service", "./documentWrapper/documentWrapper.service", "./form/form.service", "./jquery/jquery.service", "./promise/promise.service", "./templateLoader/templateLoader.service", "./windowWrapper/windowWrapper.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  var autosave = $__require('./autosave/autosave.service');
  exports.autosave = autosave;
  var autosaveAction = $__require('./autosaveAction/autosaveAction.service');
  exports.autosaveAction = autosaveAction;
  var breakpoints = $__require('./breakpoints/breakpoints.module');
  exports.breakpoints = breakpoints;
  var componentValidator = $__require('./componentValidator/componentValidator.service');
  exports.componentValidator = componentValidator;
  var contentProvider = $__require('./contentProvider/contentProvider.service');
  exports.contentProvider = contentProvider;
  var dialog = $__require('./dialog/dialog.service');
  exports.dialog = dialog;
  var documentWrapper = $__require('./documentWrapper/documentWrapper.service');
  exports.documentWrapper = documentWrapper;
  var form = $__require('./form/form.service');
  exports.form = form;
  var jquery = $__require('./jquery/jquery.service');
  exports.jquery = jquery;
  var promise = $__require('./promise/promise.service');
  exports.promise = promise;
  var templateLoader = $__require('./templateLoader/templateLoader.service');
  exports.templateLoader = templateLoader;
  var windowWrapper = $__require('./windowWrapper/windowWrapper.service');
  exports.windowWrapper = windowWrapper;
  exports.moduleName = 'rl.ui.services';
  angular.module(exports.moduleName, [autosave.moduleName, autosaveAction.moduleName, breakpoints.moduleName, componentValidator.moduleName, contentProvider.moduleName, dialog.moduleName, documentWrapper.moduleName, form.moduleName, jquery.moduleName, promise.moduleName, templateLoader.moduleName, windowWrapper.moduleName]);
  return module.exports;
});

System.registerDynamic("components/types/formValidators", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    "use strict";
  })();
  return _retrieveGlobal();
});

System.registerDynamic("components/types/viewData", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    "use strict";
  })();
  return _retrieveGlobal();
});

System.registerDynamic("components/types/types.module", ["./formValidators", "./viewData"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ngModel = $__require('./formValidators');
  exports.ngModel = ngModel;
  var viewData = $__require('./viewData');
  exports.viewData = viewData;
  return module.exports;
});

System.registerDynamic("components/ui.module", ["angular", "angular-ui-bootstrap", "angular-sanitize", "typescript-angular-utilities", "../libraries/angular-bootstrap-slider/slider", "signature_pad", "./behaviors/behaviors.module", "./components/components.module", "./filters/filters.module", "./services/services.module", "./types/types.module"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  $__require('angular-ui-bootstrap');
  $__require('angular-sanitize');
  var typescript_angular_utilities_1 = $__require('typescript-angular-utilities');
  $__require('../libraries/angular-bootstrap-slider/slider');
  $__require('signature_pad');
  var behaviors = $__require('./behaviors/behaviors.module');
  exports.behaviors = behaviors;
  var components = $__require('./components/components.module');
  exports.components = components;
  var filters = $__require('./filters/filters.module');
  exports.filters = filters;
  var services = $__require('./services/services.module');
  exports.services = services;
  var types = $__require('./types/types.module');
  exports.types = types;
  exports.moduleName = 'rl.ui';
  angular.module(exports.moduleName, ['ui.bootstrap', 'ui.bootstrap-slider', 'ngSanitize', typescript_angular_utilities_1.downgrade.moduleName, behaviors.moduleName, components.moduleName, filters.moduleName, services.moduleName]);
  return module.exports;
});

//# sourceMappingURL=components.js.map