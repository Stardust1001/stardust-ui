import { toRaw as Re, watch as Ie, resolveComponent as u, openBlock as r, createBlock as p, mergeProps as _, createElementBlock as g, Fragment as A, renderList as O, withCtx as d, renderSlot as y, toDisplayString as C, useCssVars as ge, createTextVNode as w, createSlots as X, resolveDynamicComponent as q, createCommentVNode as b, createVNode as m, normalizeProps as K, guardReactiveProps as ye, normalizeClass as U, h as P, isVNode as ve, createElementVNode as E, withModifiers as H, pushScopeId as oe, popScopeId as le, resolveDirective as Y, withDirectives as j, normalizeStyle as Ne } from "vue";
const F = (e, t) => {
  const n = e.__v_isRef ? e.value : Re(e);
  let l = n;
  if (typeof n[0] != "object" && (l = n.map((o) => ({ text: o, value: o }))), !t.sort)
    return l;
  const s = typeof t.sort == "string" ? t.sort : t.text || "text";
  return l.sort((o, i) => o[s].localeCompare(i[s]));
}, $e = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), ke = (e = {}) => ({
  loading: !1,
  query: {
    page: 1,
    limit: 10,
    order: [],
    ...e
  },
  total: 0,
  list: [],
  columns: [],
  tableRef: null,
  selection: [],
  checked: null,
  _isBaseTable: !0
}), we = () => ({
  ...$e(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), Te = () => ({
  table: ke(),
  dialog: we()
}), { funcs: te } = StardustJs, De = (e, t) => (Object.values(e).forEach((n) => {
  !n || typeof n != "object" || (n._isBaseTable ? Se(n, t) : n._isBaseDialog ? Ce(n, t) : n._isBaseForm && ie(n, t));
}), e), Se = (e, t) => (e.columns.push(...t.filter((n) => n.visible === !1 ? n.canView : n.canView !== !1)), e), Ce = (e, t) => (e.formItems = t.filter((n) => n.visible === !1 ? n.canAdd || n.canEdit : n.canAdd !== !1 || n.canEdit !== !1), ie(e, t), e), ie = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), Ee(e.form, e.formItems), e.initialForm = te.deepCopy(e.form), e.initialFormRules = te.deepCopy(e.formRules), Ie(() => e.formItems, () => {
  Ve(e);
}, { immediate: !0, deep: !0 }), e), Ve = (e) => {
  const { formItems: t, initialFormRules: n } = e, l = t.filter((o) => {
    let { formAttrs: i = {}, required: a = !1 } = o;
    return a = "required" in i ? i.required : a, !o.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(o.prop) && a !== !1;
  }).map((o) => o.prop);
  if (Object.assign(e.formRules, te.deepCopy(n)), Object.keys(e.formRules).forEach((o) => {
    o in n || delete e.formRules[o];
  }), !l.length)
    return;
  const s = {};
  return l.forEach((o) => {
    if (e.formRules[o])
      return;
    const i = t.find((R) => R.prop === o), a = i.platform || e.platform || (window.isMobile ? "mobile" : "pc"), c = xe[a], h = [], $ = { required: !0, message: `请${"options" in i ? "选择" : "输入"}${(i == null ? void 0 : i.label) || o}` };
    i.validator && ($.validator = i.validator), i.asyncValidator && ($.asyncValidator = i.asyncValidator), i.comp ? h.push({ ...$, trigger: c.change }) : h.push({ ...$, trigger: c.blur }), i.comp === "ElInputNumber" && h.push({ ...$, trigger: c.blur }), s[o] = h;
  }), Object.assign(e.formRules, s), e.formRules;
}, Ee = (e, t, n = !0) => {
  const l = {};
  return t.forEach((s) => {
    var h;
    let o = "";
    const { type: i, options: a } = s, { multiple: c } = s.formAttrs || {};
    if (n && i === "number" || s.comp === "ElInputNumber")
      o = 0;
    else if (s.comp === "ElSwitch")
      o = !1;
    else if (a && ((h = s.comp) != null && h.endsWith("XCheckboxs") || c))
      o = [];
    else if (s.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(s.type)) {
      const f = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[s.type];
      s["start-placeholder"] || (s["start-placeholder"] = "开始" + f), s["end-placeholder"] || (s["end-placeholder"] = "结束" + f), o = [];
    }
    l[s.prop] = o;
  }), Object.assign(e, { ...l, ...e }), e;
}, xe = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, Fe = {
  formatOptions: F,
  baseForm: $e,
  baseTable: ke,
  baseDialog: we,
  baseModel: Te,
  initModel: De,
  initTable: Se,
  initDialog: Ce,
  initForm: ie,
  initFormRules: Ve,
  initDefaultForm: Ee,
  triggers: xe
}, k = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, s] of t)
    n[l] = s;
  return n;
}, Me = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Xe(e, t, n, l, s, o) {
  const i = u("van-action-sheet");
  return r(), p(i, _(e.$attrs, {
    show: n.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => n.actionSheet.show = a),
    actions: n.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Ue = /* @__PURE__ */ k(Me, [["render", Xe]]), ze = {
  name: "XAutoRows",
  props: {
    span: {
      type: Number,
      default: 8
    },
    cols: {
      type: Array,
      default: []
    }
  },
  computed: {
    rows() {
      const e = [[]];
      let t = e[0], n = 0;
      return this.cols.forEach((l) => {
        const s = l.span || this.span;
        t.push(l), n += s, n >= 24 && (t = [], e.push(t), n = 0);
      }), e;
    }
  }
}, Pe = { class: "x-auto-rows" }, qe = { key: 1 };
function Le(e, t, n, l, s, o) {
  const i = u("XCol"), a = u("XRow");
  return r(), g("div", Pe, [
    (r(!0), g(A, null, O(o.rows, (c, h) => (r(), p(a, _({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: d(() => [
        (r(!0), g(A, null, O(c, (f, S) => (r(), p(i, _(f, {
          span: f.span || n.span,
          key: S,
          platform: e.$attrs.platform
        }), {
          default: d(() => [
            f.slot || e.$attrs.slot ? y(e.$slots, f.slot || e.$attrs.slot, {
              key: 0,
              col: f
            }) : (r(), g("span", qe, C(f.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const We = /* @__PURE__ */ k(ze, [["render", Le]]), He = {
  name: "MobileXButton"
};
function Je(e, t, n, l, s, o) {
  const i = u("van-button");
  return r(), p(i, null, {
    default: d(() => [
      y(e.$slots, "default")
    ]),
    _: 3
  });
}
const Ke = /* @__PURE__ */ k(He, [["render", Je]]), Ye = {
  name: "PcXButton"
};
function Ge(e, t, n, l, s, o) {
  const i = u("el-button");
  return r(), p(i, null, {
    default: d(() => [
      y(e.$slots, "default")
    ]),
    _: 3
  });
}
const Qe = /* @__PURE__ */ k(Ye, [["render", Ge]]);
const { funcs: Ze } = StardustBrowser, ae = {
  name: "XChart",
  props: {
    height: {
      type: String,
      default: "150px"
    },
    option: {
      type: Object,
      default: () => ({})
    },
    updator: Object
  },
  data() {
    return {
      zoom: 1
    };
  },
  computed: {
    zoomedHeight() {
      return Ze.calcPixel(this.height) * this.zoom + "px";
    },
    sidebarCollapse() {
      return this.$store.app.sidebarCollapse;
    }
  },
  watch: {
    zoomedHeight() {
      this.$nextTick(() => {
        var e;
        (e = this.chart) == null || e.resize();
      });
    },
    option: {
      handler: "update",
      immediate: !0
    },
    sidebarCollapse() {
      const e = (this.$store.app.toggleDuration || 0) * 1e3 + 50, t = 50;
      for (let n = 0; n < Math.ceil(e / t); n++)
        setTimeout(this.chart.resize, t * n);
    }
  },
  mounted() {
    this.chart = window.echarts.init(this.$refs.el), this.update(), document.addEventListener("resize", this.update), this.updator && (this.timer = setInterval(this.updator.handler.bind(this), this.updator.interval || 1e3));
  },
  beforeUnmount() {
    document.removeEventListener("resize", this.update), this.timer && clearInterval(this.timer);
  },
  methods: {
    update() {
      var e;
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1), (e = this.chart) == null || e.setOption({
        tooltip: {},
        ...this.option,
        grid: {
          left: 20,
          top: 10,
          right: 10,
          bottom: 20,
          ...this.option.grid
        }
      }, !0);
    }
  }
}, de = () => {
  ge((e) => ({
    "127c024a": e.zoomedHeight,
    "137ee0b8": e.zoom
  }));
}, ue = ae.setup;
ae.setup = ue ? (e, t) => (de(), ue(e, t)) : de;
const et = {
  class: "x-chart",
  ref: "el"
};
function tt(e, t, n, l, s, o) {
  return r(), g("div", et, null, 512);
}
const nt = /* @__PURE__ */ k(ae, [["render", tt], ["__scopeId", "data-v-0c2da986"]]), st = {
  name: "MobileXCheckboxs",
  inheritAttrs: !1,
  props: {
    text: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: "value"
    },
    shape: {
      type: String,
      default: "square"
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    sort: Boolean | String,
    options: Array | Object
  },
  computed: {
    attrs() {
      const {
        clearable: e,
        platform: t,
        placeholder: n,
        rules: l,
        required: s,
        ...o
      } = this.$attrs;
      return o;
    }
  },
  methods: {
    formatOptions: F
  }
};
function ot(e, t, n, l, s, o) {
  const i = u("van-checkbox"), a = u("van-checkbox-group");
  return r(), p(a, _({ class: "mobile-x-checkboxs" }, o.attrs, { direction: n.direction }), {
    default: d(() => [
      (r(!0), g(A, null, O(o.formatOptions(n.options, this), (c) => (r(), p(i, _(o.attrs, {
        key: c[n.text],
        shape: n.shape,
        name: c[n.value]
      }), {
        default: d(() => [
          w(C(c[n.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const lt = /* @__PURE__ */ k(st, [["render", ot]]), it = {
  name: "PcXCheckboxs",
  inheritAttrs: !1,
  props: {
    modelValue: Array,
    text: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: "value"
    },
    sort: Boolean | String,
    options: Array | Object
  },
  emits: ["update:modelValue"],
  computed: {
    attrs() {
      const {
        clearable: e,
        platform: t,
        placeholder: n,
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: F
  }
};
function at(e, t, n, l, s, o) {
  const i = u("el-checkbox"), a = u("el-checkbox-group");
  return r(), p(a, _({ class: "pc-x-checkboxs" }, o.attrs, {
    modelValue: n.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (c) => e.$emit("update:modelValue", c))
  }), {
    default: d(() => [
      (r(!0), g(A, null, O(o.formatOptions(n.options, this), (c) => (r(), p(i, _(o.attrs, {
        key: c[n.text],
        label: c[n.value]
      }), {
        default: d(() => [
          w(C(c[n.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const rt = /* @__PURE__ */ k(it, [["render", at]]), ct = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...n } = this.$attrs;
      return n;
    }
  }
};
function dt(e, t, n, l, s, o) {
  const i = u("van-col");
  return r(), p(i, _(o.attrs, { class: "mobile-x-col" }), {
    default: d(() => [
      y(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const ut = /* @__PURE__ */ k(ct, [["render", dt]]), pt = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...n } = this.$attrs;
      return n;
    }
  }
};
function mt(e, t, n, l, s, o) {
  const i = u("el-col");
  return r(), p(i, _(o.attrs, { class: "pc-x-col" }), {
    default: d(() => [
      y(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const ht = /* @__PURE__ */ k(pt, [["render", mt]]), ft = {
  name: "MobileXDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    "update:modelValue",
    "submit",
    "cancel"
  ],
  computed: {
    visible: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    }
  }
};
function _t(e, t, n, l, s, o) {
  const i = u("van-dialog");
  return r(), p(i, _({ width: "92%" }, e.$attrs, {
    show: o.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => o.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: t[1] || (t[1] = (a) => e.$emit("submit")),
    onCancel: t[2] || (t[2] = (a) => e.$emit("cancel"))
  }), X({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: d(() => [
        y(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: d(() => [
        y(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: d(() => [
        y(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button"]);
}
const bt = /* @__PURE__ */ k(ft, [["render", _t]]), gt = {
  name: "PcXDialog",
  props: {
    platform: String,
    drawer: {
      type: Boolean,
      default: !1
    },
    modelValue: {
      type: Boolean,
      default: !1
    },
    submitText: {
      type: String,
      default: "提交"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    draggable: {
      type: Boolean,
      default: !0
    },
    onSubmit: Function,
    onCancel: Function
  },
  emits: [
    "update:modelValue",
    "submit",
    "cancel",
    "fullscreenchange"
  ],
  data() {
    return {
      fullscreen: this.$attrs.fullscreen || !1
    };
  },
  computed: {
    visible: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    }
  },
  methods: {
    handleToggleFullscreen() {
      this.fullscreen = !this.fullscreen, this.$emit("fullscreenchange", this.fullscreen);
    }
  }
}, yt = {
  key: 1,
  class: "el-dialog__title"
};
function vt(e, t, n, l, s, o) {
  const i = u("x-icon"), a = u("el-button");
  return r(), p(q(n.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: n.draggable }, e.$attrs, {
    modelValue: o.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (c) => o.visible = c),
    fullscreen: s.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": n.drawer }]
  }), {
    header: d(() => [
      e.$slots.header ? y(e.$slots, "header", { key: 0 }) : (r(), g("span", yt, C(e.$attrs.title), 1)),
      n.drawer ? b("", !0) : (r(), p(i, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: o.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: d(() => [
      e.$slots.footer ? y(e.$slots, "footer", { key: 0 }) : b("", !0),
      n.onSubmit || e.$parent.$attrs.onSubmit ? (r(), p(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (c) => e.$emit("submit"))
      }, {
        default: d(() => [
          w(C(n.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : b("", !0),
      n.onCancel || e.$parent.$attrs.onCancel ? (r(), p(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (c) => e.$emit("cancel"))
      }, {
        default: d(() => [
          w(C(n.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : b("", !0)
    ]),
    default: d(() => [
      e.$slots.default ? y(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const $t = /* @__PURE__ */ k(gt, [["render", vt]]), T = {}, M = {
  provinces: [],
  cities: [],
  counties: []
}, kt = {
  name: "XDistrictSelect",
  props: {
    areaList: Object,
    modelValue: String,
    level: {
      type: String,
      default: "county"
    }
  },
  emits: ["update:modelValue", "change"],
  data() {
    return {
      inited: !0,
      province: "",
      city: "",
      county: "",
      provinces: Object.freeze(M.provinces),
      cities: [],
      counties: []
    };
  },
  computed: {
    number() {
      return { province: 1, city: 2, county: 3 }[this.level];
    },
    span() {
      return 24 / this.number;
    }
  },
  watch: {
    areaList: {
      handler: "initAreas",
      immediate: !0
    },
    province(e) {
      if (this.county || this.update(), this.city = this.county = "", !e) {
        this.cities = [], this.counties = [];
        return;
      }
      const t = e.slice(0, 2);
      this.cities = Object.freeze(M.cities.filter((n) => n.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(M.counties.filter((n) => n.value.slice(0, 4) === t));
    },
    county() {
      this.update();
    },
    modelValue: {
      handler: "init",
      immediate: !0
    }
  },
  methods: {
    initAreas() {
      Object.assign(T, this.areaList), M.provinces = Object.entries(T.province_list).map((e) => ({ value: e[0], text: e[1] })), M.cities = Object.entries(T.city_list).map((e) => ({ value: e[0], text: e[1] })), M.counties = Object.entries(T.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(M.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, n] = this.modelValue.split("/");
      if (e) {
        const l = Object.entries(T.province_list).find((s) => s[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(T.city_list).find((s) => s[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), n) {
        const l = Object.entries(T.county_list).find((s) => s[1] === n);
        this.county = l == null ? void 0 : l[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && T.province_list[this.province] || "",
        this.number > 1 && this.city && T.city_list[this.city] || "",
        this.number > 2 && this.county && T.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function wt(e, t, n, l, s, o) {
  const i = u("x-select"), a = u("x-col"), c = u("x-row");
  return r(), p(c, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: d(() => [
      m(a, { span: o.span }, {
        default: d(() => [
          m(i, {
            modelValue: s.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => s.province = h),
            options: s.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      o.number > 1 ? (r(), p(a, {
        key: 0,
        span: o.span
      }, {
        default: d(() => [
          m(i, {
            modelValue: s.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => s.city = h),
            options: s.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : b("", !0),
      o.number > 2 ? (r(), p(a, {
        key: 1,
        span: o.span
      }, {
        default: d(() => [
          m(i, {
            modelValue: s.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => s.county = h),
            options: s.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : b("", !0)
    ]),
    _: 1
  });
}
const St = /* @__PURE__ */ k(kt, [["render", wt]]);
function Ct() {
  return {
    dialog: Object,
    form: Object,
    model: Object,
    items: Array,
    rules: Object,
    fref: Object,
    hideLabels: {
      type: Boolean,
      default: !1
    }
  };
}
function Vt() {
  const { dialog: e, form: t, model: n } = this.$props;
  return n || (e || t).form;
}
function Et() {
  const { hideLabels: e, dialog: t, form: n } = this.$props;
  return (this.items || (t || n).formItems).map((s) => (delete s.visible, e ? {
    ...s,
    label: " ",
    _label: s.label
  } : s)).filter((s) => this.dialog ? this.dialog.isEditing ? s.canEdit !== !1 : s.canAdd !== !1 : !0).map((s) => Object.assign({}, s, s.formAttrs));
}
function xt() {
  const { dialog: e, form: t, rules: n } = this.$props;
  return n || (e || t).formRules;
}
function At(e) {
  var l;
  let { placeholder: t, comp: n } = e;
  return t || (t = "options" in e || /(date|time)/i.test(n) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
}
function Ot(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function jt(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const z = {
  props: Ct,
  computed: {
    _model: Vt,
    _items: Et,
    _rules: xt
  },
  methods: {
    calcPlaceholder: At,
    calcStyle: Ot,
    formatModelValue: jt
  }
}, Bt = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...z.props()
  },
  emits: ["update:fref"],
  computed: {
    ...z.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...z.methods
  }
};
function Rt(e, t, n, l, s, o) {
  const i = u("mobile-x-form-item"), a = u("van-cell-group"), c = u("van-form");
  return r(), p(c, {
    ref: "formRef",
    class: "mobile-x-form"
  }, {
    default: d(() => [
      e.$slots.pre ? y(e.$slots, "pre", { key: 0 }) : b("", !0),
      m(a, K(ye(e.$attrs)), {
        default: d(() => [
          (r(!0), g(A, null, O(e._items, (h, f) => (r(), p(i, _(h, {
            rules: e._rules[h.prop] || h.rules,
            key: f,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (S) => e._model[h.prop] = S,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: d(() => [
              h.slot ? y(e.$slots, h.slot, K(_({ key: 0 }, h))) : b("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? y(e.$slots, "default", { key: 1 }) : b("", !0)
    ]),
    _: 3
  }, 512);
}
const It = /* @__PURE__ */ k(Bt, [["render", Rt]]), Nt = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...z.props(),
    title: {
      type: String,
      default: "表单"
    },
    hideLabels: {
      type: Boolean,
      default: !1
    },
    labelWidth: {
      type: String,
      default: (e) => e.labelWidth || (e.dialog ? "100px" : "0px")
    },
    useCollapse: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:fref"],
  data() {
    return {
      activeNames: ["name"]
    };
  },
  computed: {
    ...z.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...z.methods
  }
}, Tt = { key: 1 };
function Dt(e, t, n, l, s, o) {
  const i = u("pc-x-form-item"), a = u("el-form"), c = u("el-collapse-item"), h = u("el-collapse");
  return r(), p(h, {
    modelValue: s.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (f) => s.activeNames = f),
    class: U((n.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: d(() => [
      m(c, {
        name: s.activeNames[0]
      }, {
        title: d(() => [
          e.$slots["collapse-title"] ? y(e.$slots, "collapse-title", { key: 0 }) : (r(), g("span", Tt, C(n.title), 1))
        ]),
        default: d(() => [
          m(a, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": n.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": n.hideLabels }]
          }), {
            default: d(() => [
              e.$slots.pre ? y(e.$slots, "pre", { key: 0 }) : b("", !0),
              (r(!0), g(A, null, O(e._items, (f, S) => (r(), p(i, _(f, {
                key: S,
                modelValue: e._model[f.prop],
                "onUpdate:modelValue": [($) => e._model[f.prop] = $, ($) => f.onChange || null],
                "label-width": n.labelWidth,
                prop: f.prop || f.model,
                clearable: f.clearable !== !1,
                placeholder: e.calcPlaceholder(f),
                style: e.calcStyle(f),
                "show-tooltip": e.$attrs.showTooltip || !1
              }), {
                default: d(() => [
                  f.slot ? y(e.$slots, f.slot, { key: 0 }) : b("", !0)
                ]),
                _: 2
              }, 1040, ["modelValue", "onUpdate:modelValue", "label-width", "prop", "clearable", "placeholder", "style", "show-tooltip"]))), 128)),
              e.$slots.default ? y(e.$slots, "default", { key: 1 }) : b("", !0)
            ]),
            _: 3
          }, 16, ["model", "rules", "label-width", "label-position", "class"])
        ]),
        _: 3
      }, 8, ["name"])
    ]),
    _: 3
  }, 8, ["modelValue", "class"]);
}
const Ft = /* @__PURE__ */ k(Nt, [["render", Dt]]);
function pe(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ve(e);
}
const ne = (e) => {
  const {
    $props: t,
    $attrs: n,
    attrs: l,
    $emit: s
  } = e;
  let {
    comp: o,
    compType: i,
    html: a,
    text: c
  } = t;
  const h = {
    ...l,
    "onUpdate:modelValue": (S) => s("update:modelValue", S)
  }, f = [];
  return i === "html" ? h.class = "comp-html" : o = u(o), a && (h.innerHTML = a), c && f.push(c), P(o, h, {
    default: () => f
  });
}, Mt = (e) => {
  const {
    $props: t,
    $attrs: n,
    attrs: l,
    $emit: s,
    $slots: o
  } = e, {
    slot: i,
    showTooltip: a,
    placeholder: c
  } = t;
  if (i && !n.label)
    return o.default();
  let h = null;
  if (a) {
    let f;
    h = m(u("el-tooltip"), {
      effect: "dark",
      content: c,
      placement: "bottom"
    }, pe(f = ne(e)) ? f : {
      default: () => [f]
    });
  } else
    h = ne(e);
  return m(u("el-form-item"), null, pe(h) ? h : {
    default: () => [h]
  });
}, Xt = (e) => {
  const {
    $props: t,
    $attrs: n,
    attrs: l,
    $emit: s,
    $slots: o,
    mValue: i
  } = e, {
    slot: a,
    comp: c,
    modelValue: h
  } = t;
  if (a && !n.label)
    return o.default({
      ...t,
      ...n
    });
  const f = {
    modelValue: i,
    "onUpdate:modelValue": (S) => s("update:modelValue", S)
  };
  return a && n.label || c ? P(u("van-field"), f, {
    input: () => a && n.label ? o.default() : ne(e)
  }) : (Object.assign(f, l), P(u("van-field"), f));
}, Ut = {
  name: "MobileXFormItem",
  props: {
    modelValue: Boolean | Number | String | Array,
    clearable: {
      type: Boolean,
      default: !0
    },
    // 接收下面这几个属性，为了避免这些属性被绑定到当前组件根节点上，在下面会进行过滤传给子组件
    comp: String,
    compType: String,
    options: Array,
    platform: String,
    iconSize: String | Number,
    min: Number,
    max: Number,
    maxlength: String | Number,
    buttonSize: String | Number,
    activeColor: String,
    slot: String,
    time: Number,
    percentage: Number,
    barHeight: String | Number,
    text: String,
    html: String
  },
  emits: ["update:modelValue"],
  computed: {
    attrs() {
      const {
        prop: e,
        label: t,
        platform: n,
        comp: l,
        compType: s,
        iconSize: o,
        slot: i,
        html: a,
        ...c
      } = { ...this.$props, ...this.$attrs };
      return c;
    },
    mValue: {
      get() {
        var e, t;
        return (e = this.comp) != null && e.endsWith("XSelect") || (t = this.comp) != null && t.endsWith("x-select") ? this.modelValue : "";
      },
      set(e) {
        var t, n;
        ((t = this.comp) != null && t.endsWith("XSelect") || (n = this.comp) != null && n.endsWith("x-select")) && this.$emit("update:modelValue", e);
      }
    }
  },
  render() {
    return Xt(this);
  }
};
const re = {
  name: "PcXFormItem",
  props: {
    modelValue: Boolean | Number | String | Array,
    comp: {
      type: String,
      default: "ElInput"
    },
    showTooltip: {
      type: Boolean,
      default: !1
    },
    labelWidth: String,
    // 接收下面这几个属性，为了避免这些属性被绑定到当前组件根节点上，在下面会进行过滤传给子组件
    compType: String,
    slot: String,
    span: Number,
    clearable: Boolean,
    html: String,
    text: String,
    options: Array,
    platform: String,
    placeholder: String,
    maxlength: String | Number,
    prefixIcon: String,
    suffixIcon: String,
    modelName: String,
    params: Object,
    labelTexts: Array,
    required: Boolean,
    minWidth: String | Number,
    _label: String
  },
  emits: ["update:modelValue"],
  computed: {
    attrs() {
      const {
        prop: e,
        label: t,
        platform: n,
        comp: l,
        slot: s,
        compType: o,
        span: i,
        offset: a,
        showTooltip: c,
        required: h,
        format: f,
        style: S,
        html: $,
        class: R,
        ...I
      } = { ...this.$props, ...this.$attrs };
      return I;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Mt(this);
  }
}, me = () => {
  ge((e) => ({
    ba9709f0: e.width
  }));
}, he = re.setup;
re.setup = he ? (e, t) => (me(), he(e, t)) : me;
const zt = /* @__PURE__ */ k(re, [["__scopeId", "data-v-d2cde1e2"]]), fe = /* @__PURE__ */ Object.assign({}), Pt = {
  name: "MobileXIcon",
  props: {
    name: String
  },
  data() {
    return {
      icons: {}
    };
  },
  created() {
    this.initIcons();
  },
  methods: {
    async initIcons() {
      const e = {};
      await Promise.all(Object.keys(fe).map(async (t) => {
        const n = t.split("/").pop().split(".")[0], l = await fe[t]();
        e[n] = l.default;
      })), this.icons = e;
    }
  }
}, qt = ["src"];
function Lt(e, t, n, l, s, o) {
  const i = u("van-icon");
  return s.icons[n.name] ? (r(), g("img", {
    key: 0,
    src: s.icons[n.name],
    alt: "icon"
  }, null, 8, qt)) : (r(), p(i, _({ key: 1 }, e.$attrs, { name: n.name }), null, 16, ["name"]));
}
const Wt = /* @__PURE__ */ k(Pt, [["render", Lt]]), _e = /* @__PURE__ */ Object.assign({}), Ht = {
  name: "PcXIcon",
  props: {
    name: String
  },
  data() {
    return {
      icons: {}
    };
  },
  created() {
    this.initIcons();
  },
  methods: {
    async initIcons() {
      const e = {};
      await Promise.all(Object.keys(_e).map(async (t) => {
        const n = t.split("/").pop().split(".")[0], l = await _e[t]();
        e[n] = l.default;
      })), this.icons = e;
    }
  }
}, Jt = ["src"];
function Kt(e, t, n, l, s, o) {
  const i = u("el-icon");
  return s.icons[n.name] ? (r(), g("img", {
    key: 0,
    src: s.icons[n.name],
    alt: "icon"
  }, null, 8, Jt)) : (r(), p(i, K(_({ key: 1 }, e.$attrs)), {
    default: d(() => [
      (r(), p(q(n.name)))
    ]),
    _: 1
  }, 16));
}
const Yt = /* @__PURE__ */ k(Ht, [["render", Kt]]), { highdict: Gt } = StardustJs, { storage: Qt } = StardustBrowser, { local: Ae } = Qt, ce = ["index", "selection", "expand", "radio", "_index"];
function Zt() {
  return {
    table: Object,
    loading: Boolean,
    data: Array,
    columns: Array,
    query: Object,
    total: Number,
    selection: Array,
    tref: Object,
    defaultValue: "",
    slotAll: {
      type: Boolean,
      default: !1
    },
    hideHeader: {
      type: Boolean,
      default: !1
    },
    hideTools: {
      type: Boolean,
      default: !1
    },
    operatesWidth: {
      type: [Number, String],
      default: 195
    },
    hideSettings: {
      type: Boolean,
      default: !1
    },
    onSelectionChange: Function,
    onSortChange: Function,
    onHeaderDragend: Function,
    onCheckedChange: Function,
    onSearch: Function,
    onAdd: Function,
    onEdit: Function,
    onDelete: Function,
    onRowEdit: Function,
    onCancelEdit: Function,
    onExport: Function,
    onSearchExport: Function,
    onImport: Function,
    onMultiEdit: Function,
    onMultiDelete: Function,
    controller: Object,
    listen: Array | String,
    title: {
      type: String,
      default: "表格"
    },
    useCollapse: {
      type: Boolean,
      default: !1
    },
    uid: String
  };
}
function en() {
  return [
    "update:tref",
    "search",
    "add",
    "edit",
    "row-edit",
    "cancel-edit",
    "delete",
    "export",
    "search-export"
  ];
}
function tn() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", n = { ...this.$attrs };
  return t in this && Object.assign(n, this[t]), n;
}
function nn() {
  const e = {};
  return ["search", "add", "multi-edit", "multi-delete", "export", "search-export", "import"].forEach((n) => e[n] = n), { ...e, ...this.$attrs.domids };
}
function sn() {
  const e = Object.keys(this._attrs).filter((n) => !n.endsWith("-btn")), t = {};
  return e.forEach((n) => t[n] = this._attrs[n]), delete t.platform, {
    border: !0,
    stripe: !0,
    fit: !0,
    "highlight-current-row": !0,
    ...t,
    data: this._data,
    "cell-class-name": this.cellClassName,
    "cell-style": this.cellStyle
  };
}
function on() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function ln() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function an() {
  const { $props: e, _query: t } = this, { table: n, columns: l } = e;
  return (l || (n == null ? void 0 : n.columns) || []).map((o) => o.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(i) {
      const { page: a, limit: c } = t;
      return (a - 1) * c + i + 1;
    }
  }, o, { type: "index" }) : o.type === "radio" ? Object.assign({ width: 60, label: "单选" }, o) : Object.assign({}, o, o.tableAttrs));
}
function rn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function cn() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function dn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function un() {
  return this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function pn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function mn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function hn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function fn() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function _n() {
  return this.onMultiEdit || this._listen["multi-edit"] ? () => this._emit("multi-edit") : null;
}
function bn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function gn() {
  if (!this.controller)
    return {};
  let e = this.listen;
  Array.isArray(this.listen) || (e = this.listen.split(","));
  const t = {};
  return e.forEach((n) => {
    const l = "handle" + n.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");
    t[n] = this.controller[l];
  }), t;
}
function yn() {
  const e = this._columns.filter((n) => n.type && ce.includes(n.type)), t = this.settings.columns.filter((n) => !n.hide).map((n) => {
    const l = this._columns.find((s) => s.prop === n.prop);
    return {
      sortable: "custom",
      ...l,
      width: n.width || l.width
    };
  });
  return e.concat(t);
}
function vn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function $n() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function kn() {
  return this._columns.filter((e) => !e.type || !ce.includes(e.type));
}
function wn() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function Sn() {
  const e = this._uid && Ae.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns = e.columns || this._columns.filter((t) => !t.type || !ce.includes(t.type)).map((t) => {
    const { prop: n, label: l, show: s, hide: o, width: i } = t;
    return { prop: n, label: l, show: s, hide: o, width: i };
  }), this.settings = e;
}
function Cn(e) {
  Ae.setJson(`Settings[${this._uid}]`, e);
}
function Vn(e, t) {
  const { prop: n } = t;
  let { format: l, formatter: s } = t.tableAttrs || t;
  l = Array.isArray(t.options) ? l !== !1 : l;
  const o = e[n];
  if (o == null || o === "")
    return this.defaultValue;
  if (l || s) {
    const i = `_formatted_${n}`;
    if (i in e)
      return e[i];
    if (s)
      return typeof s == "function" ? s(o, e, t) : Gt.get(e, s);
  }
  return o;
}
function En(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function xn(e) {
  this.params = e, this._emit("search", e);
}
function An(e) {
  this.saveSettings(e), this.initSettings();
}
function On(e, t, n, l) {
  const s = this.settings.columns.find((o) => o.prop === n.property);
  s && (s.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, n, l);
}
function jn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Bn(...e) {
  var t, n;
  this.onSortChange ? this.onSortChange(...e) : e[0].column.sortable === "custom" && ((n = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || n.call(t, ...e));
}
function Rn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function In() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Nn(e) {
  var l;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const n = this._visibleColumns[e.columnIndex];
  if ((l = n == null ? void 0 : n.tableAttrs) != null && l.class) {
    const s = n.tableAttrs.class;
    typeof s == "function" ? t += " " + s(e) : typeof s == "string" && (t += " " + s);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Tn(e) {
  var l;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, n = this._visibleColumns[e.columnIndex];
  if ((l = n == null ? void 0 : n.tableAttrs) != null && l.style) {
    const s = n.tableAttrs.style;
    typeof s == "function" ? Object.assign(t, s(e)) : typeof s == "object" && Object.assign(t, s);
  }
  return Object.keys(t) ? t : null;
}
function Dn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Fn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Mn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Xn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Un(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function zn(e, t) {
  const n = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[n] ? this[n](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Pn() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const B = {
  props: Zt,
  emits: en,
  computed: {
    _attrs: tn,
    domids: nn,
    elTableAttrs: sn,
    _loading: on,
    _data: ln,
    _columns: an,
    _query: rn,
    _total: cn,
    _selection: dn,
    _onSearch: un,
    _onAdd: pn,
    _onExport: mn,
    _onSearchExport: hn,
    _onImport: fn,
    _onMultiEdit: _n,
    _onMultiDelete: bn,
    _listen: gn,
    _visibleColumns: yn,
    _uid: vn,
    hideOperates: $n,
    searcherColumns: kn,
    searcherConfig: wn
  },
  watch: {
    $route: Pn
  },
  methods: {
    initSettings: Sn,
    saveSettings: Cn,
    calcValue: Vn,
    calcOverflowTooltip: En,
    handleSearch: xn,
    handleResetSettings: An,
    handleHeaderDragend: On,
    handleSelectionChange: jn,
    handleSortChange: Bn,
    handleCheckedChange: Rn,
    handleToggleFullscreen: In,
    cellClassName: Nn,
    cellStyle: Tn,
    canEdit: Dn,
    canSave: Fn,
    canRowEdit: Mn,
    canCancelEdit: Xn,
    canDelete: Un,
    _emit: zn
  }
};
const qn = {
  name: "XInfo",
  props: {
    data: Object,
    fields: Array,
    column: {
      type: Number,
      default: 24
    },
    border: {
      type: Boolean,
      default: !0
    },
    span: {
      type: Number,
      default: window.isMobile ? 24 : 8
    },
    labelSlot: {
      type: Boolean,
      default: !1
    },
    defaultValue: ""
  },
  computed: {
    blocks() {
      const e = {};
      return this.fields.filter((t) => t.prop).forEach((t) => {
        const { infoAttrs: n = {}, ...l } = t, s = { span: this.span, ...l, ...n }, o = s.block || "基本信息";
        let i = e[o];
        i || (e[o] = i = [], i.span = 0), i.span + s.span > 24 && i.length ? i[i.length - 1].span += 24 - i.span : i.span += s.span, i.push(s);
      }), e;
    },
    hideHeader() {
      const e = Object.keys(this.blocks);
      return e.length === 1 && e[0] === "基本信息";
    }
  },
  data() {
    return {
      activeNames: []
    };
  },
  created() {
    this.activeNames = Object.keys(this.blocks);
  },
  methods: {
    calcValue: B.methods.calcValue
  }
}, Ln = { key: 0 }, Wn = { key: 1 };
function Hn(e, t, n, l, s, o) {
  const i = u("el-descriptions-item"), a = u("el-descriptions"), c = u("el-collapse-item"), h = u("el-collapse");
  return r(), p(h, {
    modelValue: s.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (f) => s.activeNames = f),
    class: U(["x-info", { "hide-header": o.hideHeader }])
  }, {
    default: d(() => [
      (r(!0), g(A, null, O(o.blocks, (f, S) => (r(), p(c, {
        key: S,
        title: S,
        name: S
      }, {
        default: d(() => [
          m(a, {
            column: n.column,
            border: n.border
          }, {
            default: d(() => [
              (r(!0), g(A, null, O(f, ($) => (r(), p(i, _({
                key: $.prop
              }, $), X({
                default: d(() => [
                  $.slot ? (r(), g("span", Ln, [
                    y(e.$slots, $.slot, K(ye({ data: n.data, field: $, value: o.calcValue(n.data, $) })), void 0, !0)
                  ])) : (r(), g("span", Wn, C(o.calcValue(n.data, $)), 1))
                ]),
                _: 2
              }, [
                n.labelSlot ? {
                  name: "label",
                  fn: d(() => [
                    y(e.$slots, "label", {
                      label: $.label
                    }, void 0, !0)
                  ]),
                  key: "0"
                } : void 0
              ]), 1040))), 128))
            ]),
            _: 2
          }, 1032, ["column", "border"])
        ]),
        _: 2
      }, 1032, ["title", "name"]))), 128))
    ]),
    _: 3
  }, 8, ["modelValue", "class"]);
}
const Jn = /* @__PURE__ */ k(qn, [["render", Hn], ["__scopeId", "data-v-0c3b67a5"]]), Kn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Yn = { key: 1 };
function Gn(e, t, n, l, s, o) {
  return r(), g("div", null, [
    (r(!0), g(A, null, O(n.items, (i, a) => (r(), p(q(n.compName), _({ key: a }, i), {
      default: d(() => [
        i.slot || e.$attrs.slot ? y(e.$slots, "default", {
          key: 0,
          item: i
        }) : (r(), g("span", Yn, C(i.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Qn = /* @__PURE__ */ k(Kn, [["render", Gn]]), Zn = {
  name: "MobileXPagination",
  props: {
    query: Object,
    total: Number
  },
  emits: ["search"],
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.query.limit);
    }
  },
  watch: {
    "query.page"() {
      this.$emit("search");
    },
    "query.limit"() {
      this.$emit("search");
    }
  }
};
function es(e, t, n, l, s, o) {
  const i = u("van-icon"), a = u("van-pagination");
  return r(), p(a, _({ ...e.$attrs, ...e.mobilePagination || {} }, {
    modelValue: n.query.page,
    "onUpdate:modelValue": t[0] || (t[0] = (c) => n.query.page = c),
    "items-per-page": n.query.limit,
    "page-count": o.pageCount,
    "total-items": n.total
  }), {
    "prev-text": d(() => [
      m(i, { name: "arrow-left" })
    ]),
    "next-text": d(() => [
      m(i, { name: "arrow" })
    ]),
    page: d(({ text: c }) => [
      w(C(c), 1)
    ]),
    _: 1
  }, 16, ["modelValue", "items-per-page", "page-count", "total-items"]);
}
const ts = /* @__PURE__ */ k(Zn, [["render", es]]), ns = {
  name: "PcXPagination",
  props: {
    query: Object,
    total: Number
  },
  emits: ["search"],
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.query.limit);
    }
  },
  watch: {
    "query.page"() {
      this.$emit("search");
    },
    "query.limit"() {
      this.$emit("search");
    }
  }
};
function ss(e, t, n, l, s, o) {
  const i = u("el-pagination");
  return r(), p(i, _({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": n.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => n.query.page = a),
    "page-size": n.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => n.query.limit = a),
    "page-count": o.pageCount,
    total: n.total
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const os = /* @__PURE__ */ k(ns, [["render", ss]]), ls = {
  name: "XPicker",
  props: {
    modelValue: Boolean | Number | String,
    placeholder: String,
    show: Boolean,
    columns: Array
  },
  emits: [
    "show",
    "confirm",
    "cancel",
    "update:modelValue"
  ],
  computed: {
    visible: {
      get() {
        return this.show;
      },
      set(e) {
        this.$emit(e ? "show" : "cancel");
      }
    }
  },
  methods: {
    onConfirm(e) {
      this.$emit("confirm", e), this.$emit("update:modelValue", e);
    }
  }
};
function is(e, t, n, l, s, o) {
  const i = u("van-picker"), a = u("van-popup");
  return r(), g(A, null, [
    E("span", {
      onClick: t[0] || (t[0] = (c) => e.$emit("show")),
      class: U(`x-picker__${n.modelValue ? "value" : "placeholder"}`)
    }, C(n.modelValue || n.placeholder), 3),
    m(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: o.visible,
      "onUpdate:show": t[2] || (t[2] = (c) => o.visible = c)
    }), {
      default: d(() => [
        m(i, _(e.$attrs, {
          title: e.$attrs.title,
          columns: n.columns,
          onCancel: t[1] || (t[1] = (c) => e.$emit("cancel")),
          onConfirm: o.onConfirm
        }), null, 16, ["title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const as = /* @__PURE__ */ k(ls, [["render", is]]), rs = {
  name: "MobileXRadios",
  inheritAttrs: !1,
  props: {
    text: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: "value"
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    sort: Boolean | String,
    options: Array | Object
  },
  methods: {
    formatOptions: F
  }
};
function cs(e, t, n, l, s, o) {
  const i = u("van-radio"), a = u("van-radio-group");
  return r(), p(a, _({ class: "mobile-x-radios" }, e.$attrs, { direction: n.direction }), {
    default: d(() => [
      (r(!0), g(A, null, O(o.formatOptions(n.options, this), (c) => (r(), p(i, _(e.$attrs, {
        key: c[n.text],
        name: c[n.value]
      }), {
        default: d(() => [
          w(C(c[n.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const ds = /* @__PURE__ */ k(rs, [["render", cs]]), us = {
  name: "PcXRadios",
  inheritAttrs: !1,
  props: {
    modelValue: Number | String,
    text: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: "value"
    },
    button: {
      type: Boolean,
      default: !1
    },
    sort: Boolean | String,
    options: Array | Object
  },
  emits: ["update:modelValue"],
  computed: {
    attrs() {
      const {
        clearable: e,
        platform: t,
        placeholder: n,
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: F
  }
};
function ps(e, t, n, l, s, o) {
  const i = u("el-radio-group");
  return r(), p(i, _({ class: "pc-x-radios" }, o.attrs, {
    modelValue: n.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a))
  }), {
    default: d(() => [
      (r(!0), g(A, null, O(o.formatOptions(n.options, this), (a) => (r(), p(q(n.button ? "el-radio-button" : "el-radio"), _(o.attrs, {
        key: a[n.text],
        label: a[n.value]
      }), {
        default: d(() => [
          w(C(a[n.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const ms = /* @__PURE__ */ k(us, [["render", ps]]), hs = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, fs = { key: 1 };
function _s(e, t, n, l, s, o) {
  const i = u("MobileXCol"), a = u("van-row");
  return r(), p(a, { class: "mobile-x-row" }, {
    default: d(() => [
      (r(!0), g(A, null, O(n.cols, (c, h) => (r(), p(i, _(c, { key: h }), {
        default: d(() => [
          c.slot || e.$attrs.slot ? y(e.$slots, c.slot || e.$attrs.slot, {
            key: 0,
            col: c
          }) : (r(), g("span", fs, C(c.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      n.cols.length === 0 ? y(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  });
}
const bs = /* @__PURE__ */ k(hs, [["render", _s]]), gs = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ys = { key: 1 };
function vs(e, t, n, l, s, o) {
  const i = u("pc-x-col"), a = u("el-row");
  return r(), p(a, { class: "pc-x-row" }, {
    default: d(() => [
      (r(!0), g(A, null, O(n.cols, (c, h) => (r(), p(i, _(c, { key: h }), {
        default: d(() => [
          c.slot || e.$attrs.slot ? y(e.$slots, c.slot || e.$attrs.slot, {
            key: 0,
            col: c
          }) : (r(), g("span", ys, C(c.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      n.cols.length === 0 ? y(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  });
}
const $s = /* @__PURE__ */ k(gs, [["render", vs]]), Oe = async (e, t, n) => {
  n.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: s = "text", value: o = "value", labelTexts: i, params: a = {} } = n;
  a.attributes = [...new Set(a.attributes || [...i || [], s, o])], a.limit = a.limit || 20, l && (a.where = a.where || {}, a.where[s] = a.where[s] || {}, a.where[s]["[Op.like]"] = `%${l}%`);
  const c = await e.search(n.modelName, a);
  n.options.splice(0, n.options.length, ...c.data), n.loading = !1;
}, ks = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], ws = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", Ss = {
  name: "MobileXSelect",
  inheritAttrs: !1,
  props: {
    modelValue: Boolean | Number | String | Array,
    modelName: String,
    params: Object,
    text: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: "value"
    },
    sort: Boolean | String,
    options: Array | Object
  },
  emits: ["update:modelValue"],
  data() {
    return {
      visible: !1,
      _options: []
    };
  },
  computed: {
    formattedModelValue() {
      if (this.modelValue === "true" || this.modelValue === "false") {
        const e = this.modelValue === "true";
        return this._options.find((t) => t[this.value] === e)[this.text];
      }
      return this.modelValue;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = F(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: F,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Oe(this.$api.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Cs(e, t, n, l, s, o) {
  const i = u("XPicker");
  return r(), g("div", {
    onClick: t[5] || (t[5] = (...a) => o.onClick && o.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(i, _(e.$attrs, {
      modelValue: o.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: s.visible,
      columns: s._options,
      onClick: t[1] || (t[1] = H(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => s.visible = !0),
      onCancel: t[3] || (t[3] = (a) => s.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => s.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const Vs = /* @__PURE__ */ k(Ss, [["render", Cs]]);
const Es = {
  name: "PcXSelect",
  props: {
    modelName: String,
    params: Object,
    text: {
      type: String,
      default: "text"
    },
    labelTexts: Array,
    value: {
      type: String,
      default: "value"
    },
    filterable: {
      type: Boolean,
      default: !0
    },
    sort: Boolean | String,
    options: Array | Object,
    // 接收下面这几个属性，为了避免这些属性被绑定到当前组件根节点上，在下面会进行过滤传给子组件
    platform: String
  },
  data() {
    return {
      loading: !1,
      _options: []
    };
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = F(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: F,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Oe(this.$api.restful, e, this);
    },
    calcMainLabel(e) {
      return ks(e, this);
    },
    calcRemarkLabel(e) {
      return ws(e, this);
    }
  }
}, xs = { key: 1 }, As = { class: "main" }, Os = { class: "remark" };
function js(e, t, n, l, s, o) {
  const i = u("el-option"), a = u("el-select");
  return r(), p(a, _({
    class: "pc-x-select",
    loading: s.loading
  }, e.$attrs, {
    filterable: n.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || o.remoteSearch
  }), {
    default: d(() => [
      (r(!0), g(A, null, O(s._options, (c) => (r(), p(i, _(e.$attrs, {
        key: c[n.text],
        label: c[n.text],
        value: c[n.value]
      }), {
        default: d(() => [
          e.$slots.default ? y(e.$slots, "default", { key: 0 }, void 0, !0) : (r(), g("span", xs, [
            E("span", As, C(o.calcMainLabel(c)), 1),
            E("span", Os, C(o.calcRemarkLabel(c)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const Bs = /* @__PURE__ */ k(Es, [["render", js], ["__scopeId", "data-v-0baced1c"]]);
const Rs = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...B.props(),
    mode: String,
    platform: String,
    "max-height": String,
    height: String,
    slotRenderers: Object
  },
  emits: [
    ...B.emits()
  ],
  data() {
    return {
      popupVisible: !1,
      scope: {},
      selected: [],
      settings: {},
      checked: null
    };
  },
  computed: {
    ...B.computed,
    hasIndex() {
      return this._visibleColumns.some((e) => e.type === "index" || e.type === "_index");
    },
    hasSelection() {
      return this._visibleColumns.some((e) => e.type === "selection");
    },
    hasRadio() {
      return this._visibleColumns.some((e) => e.type === "radio");
    },
    cols() {
      return this._visibleColumns.filter((e) => !["index", "selection", "expand", "radio", "_index"].includes(e.type));
    },
    infoFields() {
      return this.cols.map((e) => ({
        ...e,
        slot: void 0,
        infoAttrs: {
          ...e.infoAttrs ?? {},
          slot: void 0
        }
      }));
    }
  },
  watch: {
    selected: {
      handler(e) {
        const t = [];
        e.forEach((n, l) => {
          n && t.push(this._data[l]);
        }), this.handleSelectionChange(t);
      },
      deep: !0
    }
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.$emit("update:tref", this);
  },
  methods: {
    ...B.methods,
    handleShowDetail(e, t) {
      this.scope = { row: e, $index: t }, this.popupVisible = !0;
    },
    calcTitle(e) {
      return typeof this._attrs.title == "function" ? this._attrs.title(e) : e[this.cols[0].prop];
    },
    handleEdit() {
      this.popupVisible = !1, this._emit("edit", this.scope);
    },
    handleDelete() {
      this.popupVisible = !1, this._emit("delete", this.scope);
    },
    handleClickCard(e) {
      this.hasSelection ? this.selected[e] = !this.selected[e] : this.hasRadio && this.handleCheckedChange({ target: { value: e } });
    },
    clearSelection() {
      this.selected = [], this.checked = null;
    }
  }
}, Is = { class: "mobile-x-table" }, Ns = {
  key: 1,
  class: "mobile-x-table card"
}, Ts = ["onClick"], Ds = ["value", "checked"], Fs = { class: "label" }, Ms = { class: "value" }, Xs = { class: "operates" }, Us = ["value", "checked"], zs = {
  key: 2,
  class: "index"
}, Ps = { class: "title" }, qs = { class: "operates" };
function Ls(e, t, n, l, s, o) {
  const i = u("x-table-tools"), a = u("van-checkbox"), c = u("van-button"), h = u("XCol"), f = u("XRow"), S = u("van-swipe-cell"), $ = u("van-cell"), R = u("van-list"), I = u("x-pagination"), L = u("XInfo"), N = u("van-popup");
  return r(), g("div", Is, [
    e.hideTools !== "" && e.hideTools !== !0 ? (r(), p(i, _({ key: 0 }, e._attrs, {
      domids: e.domids,
      onAdd: e._onAdd,
      onSearch: e._onSearch,
      onExport: e._onExport,
      onSearchExport: e._onSearchExport,
      onImport: e._onImport,
      onMultiDelete: e._onMultiDelete
    }), X({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: d(() => [
          y(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: d(() => [
          y(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : b("", !0),
    (n.mode || e._attrs.mode) === "card" ? (r(), g("div", Ns, [
      (r(!0), g(A, null, O(e._data, (v, x) => (r(), g("div", {
        key: x,
        class: "row",
        onClick: (V) => o.handleClickCard(x)
      }, [
        m(S, {
          onOpen: (V) => s.scope = { row: v, $index: x }
        }, {
          right: d(() => [
            E("div", Xs, [
              y(e.$slots, "operates-prefix", { scope: s.scope }, void 0, !0),
              e.hideOperates ? b("", !0) : (r(), p(f, {
                key: 0,
                gutter: 10
              }, {
                default: d(() => [
                  m(h, { span: 12 }, {
                    default: d(() => [
                      e.canEdit(s.scope) ? (r(), p(c, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, { onClick: o.handleEdit }), {
                        default: d(() => [
                          w(" 编辑 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : b("", !0)
                    ]),
                    _: 1
                  }),
                  m(h, { span: 12 }, {
                    default: d(() => [
                      e.canDelete(s.scope) ? (r(), p(c, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"] }, { onClick: o.handleDelete }), {
                        default: d(() => [
                          w(" 删除 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : b("", !0)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })),
              y(e.$slots, "operates-suffix", { scope: s.scope }, void 0, !0)
            ])
          ]),
          default: d(() => [
            o.hasSelection ? (r(), p(a, {
              key: 0,
              modelValue: s.selected[x],
              "onUpdate:modelValue": (V) => s.selected[x] = V,
              shape: "square",
              class: "selection",
              onClick: t[0] || (t[0] = H(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : b("", !0),
            o.hasRadio ? (r(), g("input", {
              key: 1,
              type: "radio",
              value: x,
              checked: x === s.checked,
              class: "radio",
              onClick: t[1] || (t[1] = H(() => {
              }, ["stop"])),
              onChange: t[2] || (t[2] = (...V) => e.handleCheckedChange && e.handleCheckedChange(...V))
            }, null, 40, Ds)) : b("", !0),
            (r(!0), g(A, null, O(o.cols, (V, W) => (r(), g("div", {
              key: W,
              class: "field"
            }, [
              E("span", Fs, C(V.label) + ":", 1),
              E("span", Ms, C(e.calcValue(v, V)), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1032, ["onOpen"])
      ], 8, Ts))), 128))
    ])) : (n.mode || e._attrs.mode) === "list" ? (r(), p(R, _({
      key: 2,
      class: "mobile-x-table list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (v) => e.$emit("search"))
    }), {
      default: d(() => [
        (r(!0), g(A, null, O(e._data, (v, x) => (r(), p($, {
          key: x,
          "is-link": "",
          onClick: (V) => o.handleShowDetail(v, x)
        }, {
          default: d(() => [
            o.hasSelection ? (r(), p(a, {
              key: 0,
              modelValue: s.selected[x],
              "onUpdate:modelValue": (V) => s.selected[x] = V,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = H(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : b("", !0),
            o.hasRadio ? (r(), g("input", {
              key: 1,
              type: "radio",
              value: x,
              checked: x === s.checked,
              class: "radio",
              onClick: t[4] || (t[4] = H(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...V) => e.handleCheckedChange && e.handleCheckedChange(...V))
            }, null, 40, Us)) : b("", !0),
            o.hasIndex ? (r(), g("span", zs, C(x + 1), 1)) : b("", !0),
            E("span", Ps, C(o.calcTitle(v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : b("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p(I, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (v) => e._emit("search"))
    }, null, 8, ["query", "total"])) : b("", !0),
    m(N, {
      show: s.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (v) => s.popupVisible = v),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: d(() => [
        m(L, {
          data: s.scope.row,
          fields: o.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"]),
        E("div", qs, [
          y(e.$slots, "operates-prefix", { scope: s.scope }, void 0, !0),
          e.hideOperates ? b("", !0) : (r(), p(f, {
            key: 0,
            gutter: 10
          }, {
            default: d(() => [
              m(h, { span: 12 }, {
                default: d(() => [
                  e.canEdit(s.scope) ? (r(), p(c, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"], block: !0 }, { onClick: o.handleEdit }), {
                    default: d(() => [
                      w(" 编辑 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : b("", !0)
                ]),
                _: 1
              }),
              m(h, { span: 12 }, {
                default: d(() => [
                  e.canDelete(s.scope) ? (r(), p(c, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"], block: !0 }, { onClick: o.handleDelete }), {
                    default: d(() => [
                      w(" 删除 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : b("", !0)
                ]),
                _: 1
              })
            ]),
            _: 1
          })),
          y(e.$slots, "operates-suffix", { scope: s.scope }, void 0, !0)
        ])
      ]),
      _: 3
    }, 8, ["show"])
  ]);
}
const Ws = /* @__PURE__ */ k(Rs, [["render", Ls], ["__scopeId", "data-v-d230adfe"]]), be = {
  eq: {
    text: "等于",
    value: "eq"
  },
  ne: {
    text: "不等于",
    value: "ne"
  },
  gt: {
    text: "大于",
    value: "gt"
  },
  gte: {
    text: "大于等于",
    value: "gte"
  },
  lt: {
    text: "小于",
    value: "lt"
  },
  lte: {
    text: "小于等于",
    value: "lte"
  },
  in: {
    text: "包含",
    value: "in"
  },
  like: {
    text: "模糊匹配",
    value: "like"
  },
  notIn: {
    text: "不包含",
    value: "notIn"
  },
  notLike: {
    text: "模糊不匹配",
    value: "notLike"
  },
  between: {
    text: "介于",
    value: "between"
  }
}, D = {
  XSelect: ["eq", "ne", "in", "notIn"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between"],
  ElInput: ["eq", "ne", "like", "notLike", "between"]
};
D["x-select"] = D.XSelect;
D["el-date-picker"] = D.ElDatePicker;
D["el-input-number"] = D.ElInputNumber;
D["el-input"] = D.ElInput;
function Hs() {
  const {
    columns: e,
    visible: t,
    conditions: n,
    expression: l,
    handleSearch: s,
    handleReset: o,
    handleAdd: i,
    handleDelete: a,
    handleSelectField: c,
    handleSelectOp: h
  } = this;
  return m(u("pc-x-dialog"), _({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": "查询"
  }, {
    modelValue: t,
    "onUpdate:modelValue": (f) => this.visible = f,
    onCancel: o,
    onSubmit: s
  }), {
    default: () => [m(u("el-button"), {
      type: "primary",
      icon: "plus",
      onClick: i
    }, {
      default: () => [w("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [n.map((f, S) => m("div", {
      class: "condition flex-center",
      key: f.no
    }, [m(u("el-button"), {
      type: "danger",
      size: "small",
      plain: !0,
      onClick: () => a(S)
    }, {
      default: () => [w("X")]
    }), m("span", {
      class: "title"
    }, [f.no]), m("div", {
      class: "expression"
    }, [m(u("pc-x-select"), {
      modelValue: f.prop,
      onChange: ($) => c(f, $),
      options: e,
      text: "label",
      value: "prop"
    }, null), m(u("pc-x-select"), {
      modelValue: f.op,
      onChange: ($) => h(f, $),
      options: f.ops
    }, null), Js(this, f)])]))]), m(u("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式"
    }, {
      modelValue: l,
      "onUpdate:modelValue": (f) => this.expression = f
    }), null)]
  });
}
function Js(e, t) {
  const n = (s) => P(u(t.component), Object.assign({
    modelValue: t.value,
    "onUpdate:modelValue": (o) => t.value = o
  }, t.item, t.item.formAttrs, s)), l = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? m("div", {
    class: "col-2"
  }, [n({
    ...l,
    modelValue: t.value[0],
    "onUpdate:modelValue": (s) => t.value[0] = s
  }), n({
    ...l,
    modelValue: t.value[1],
    "onUpdate:modelValue": (s) => t.value[1] = s
  })]) : ["in", "notIn"].includes(t.op) ? (l.multiple = !0, n(l)) : n();
}
const { storage: Q } = StardustBrowser, Ks = {
  name: "Searcher",
  props: {
    uid: String,
    columns: Array,
    config: Object
  },
  emits: ["search"],
  data() {
    return {
      visible: !1,
      conditionNo: 1,
      conditions: [],
      expression: ""
    };
  },
  computed: {
    key() {
      return `Searcher[${this.uid}]`;
    }
  },
  created() {
    this.uid && this.restoreCache();
  },
  render: Hs,
  methods: {
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      Q.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: n, component: l, ...s } = e;
          return s;
        }),
        expression: this.expression
      });
    },
    restoreCache() {
      var t, n;
      const e = Q.local.getJson(this.key, this.config);
      (t = e.conditions) == null || t.forEach((l) => {
        const { prop: s, op: o, value: i } = l;
        l.item = this.columns.find((a) => a.prop === s), this.handleSelectField(l, s), this.handleSelectOp(l, o), l.ops = D[l.component].map((a) => be[a]), l.value = i;
      }), !e.conditionNo && ((n = e.conditions) != null && n.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((l) => l.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        this.utils.message.Message({ type: "warning", message: t.toString() });
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      Q.local.remove(this.key), Object.assign(this, {
        visible: !1,
        conditionNo: 1,
        conditions: [],
        expression: ""
      }), this.restoreCache(), this.$emit("search", { where: {} });
    },
    calcParams() {
      const e = this.calcTree();
      if (!e)
        return;
      const t = (l, s) => {
        const o = [];
        s["[Op." + l.type + "]"] = o;
        for (let i of l.items)
          if (typeof i == "string") {
            const a = this.conditions.find((c) => c.no === i * 1);
            if (a) {
              if (!this.checkFilled(a))
                throw "条件不完整: " + i;
            } else
              throw "条件不存在: " + i;
            o.push(this.parseCondition(a));
          } else {
            const a = {};
            o.push(a), t(i, a);
          }
      }, n = {};
      return t(e, n), { where: n };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((s) => s.trim()), n = (s, o) => {
        for (; o.length; ) {
          const i = o.shift();
          if (["and", "or"].includes(i)) {
            if (s.type && s.type !== i)
              throw "串联不同逻辑表达式请使用小括号区分";
            s.type = i;
          } else if (i === "(") {
            const a = { type: "", items: [] };
            s.items.push(a), a._parent = s, n(a, o);
            break;
          } else
            i === ")" ? (n(s._parent, o), delete s._parent) : s.items.push(i);
        }
      }, l = { type: "", items: [] };
      return n(l, t), l.type = l.type || "and", l;
    },
    parseCondition(e) {
      let { prop: t, op: n, value: l } = e;
      const s = {};
      return (n === "like" || n === "notLike") && (l = "%" + l + "%"), s[t] = {
        [`[Op.${n}]`]: l
      }, s;
    },
    checkFilled(e) {
      if (!e.prop || !e.op)
        return !1;
      const t = Array.isArray(e.value) ? e.value : [e.value];
      return t.length && t.every((n) => typeof n != "string" || n.length);
    },
    handleAdd() {
      this.conditions.push({
        no: this.conditionNo++,
        prop: "",
        op: "",
        value: "",
        component: "ElInput",
        ops: [],
        item: {}
      });
    },
    handleDelete(e) {
      this.conditions.splice(e, 1);
    },
    handleSelectField(e, t) {
      e.value = "", e.prop = t, e.item = this.columns.find((o) => o.prop === e.prop);
      const { options: n, type: l, formAttrs: s = {} } = e.item;
      e.component = s.comp || n && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = D[e.component].map((o) => be[o]), e.op = e.ops[0].value, s.comp === "ElDatePicker" && (e.component = "ElInput", e.item.formAttrs.type = "date");
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), !["between", "in", "notIn"].includes(t) && Array.isArray(t) && (e.value = "");
    }
  }
}, je = /* @__PURE__ */ k(Ks, [["__scopeId", "data-v-e9987bfb"]]);
const Ys = {
  name: "Settings",
  props: {
    visible: Boolean,
    modelValue: Object
  },
  emits: ["update:modelValue", "reset"],
  data() {
    return {
      activeName: "columns",
      columns: []
    };
  },
  watch: {
    modelValue: {
      handler(e) {
        this.columns = e.columns.map((t) => ({
          ...t,
          show: t.show !== !1,
          width: t.width || t.minWidth
        }));
      },
      immediate: !0
    }
  },
  methods: {
    handleResetColumns() {
      const { columns: e, ...t } = this.modelValue;
      this.$emit("reset", t);
    },
    handleMove(e, t, n) {
      const l = t + n;
      this.columns.splice(t, 1), this.columns.splice(l, 0, e), this.update();
    },
    handleToggle(e) {
      e.show = !e.show, this.update();
    },
    update() {
      this.columns.forEach((e) => {
        e.hide = !e.show;
      }), this.$emit("update:modelValue", {
        ...this.modelValue,
        columns: this.columns.map((e) => {
          const { prop: t, label: n, show: l, hide: s, width: o } = e;
          return { prop: t, label: n, show: l, hide: s, width: o };
        })
      });
    }
  }
}, Gs = (e) => (oe("data-v-16737013"), e = e(), le(), e), Qs = { class: "table" }, Zs = ["title", "onClick"], eo = /* @__PURE__ */ Gs(() => /* @__PURE__ */ E("span", { class: "unit" }, "px", -1));
function to(e, t, n, l, s, o) {
  const i = u("el-button"), a = u("ElCheckbox"), c = u("el-input-number"), h = u("el-tab-pane"), f = u("el-tabs"), S = u("el-popover");
  return n.visible ? (r(), p(S, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: d(() => [
      m(i, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: d(() => [
      m(f, {
        modelValue: s.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = ($) => s.activeName = $)
      }, {
        default: d(() => [
          m(h, {
            name: "columns",
            label: "展示列"
          }, {
            default: d(() => [
              m(i, {
                type: "warning",
                icon: "Close",
                onClick: o.handleResetColumns
              }, {
                default: d(() => [
                  w("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              E("div", Qs, [
                (r(!0), g(A, null, O(s.columns, ($, R) => (r(), g("div", {
                  key: R,
                  class: "row flex-center"
                }, [
                  m(i, {
                    disabled: R === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: (I) => o.handleMove($, R, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  m(i, {
                    disabled: R === s.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: (I) => o.handleMove($, R, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  m(a, {
                    modelValue: $.show,
                    "onUpdate:modelValue": (I) => $.show = I,
                    onChange: o.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  E("span", {
                    class: "label overflow-text",
                    title: $.label,
                    onClick: (I) => o.handleToggle($)
                  }, C($.label), 9, Zs),
                  m(c, {
                    modelValue: $.width,
                    "onUpdate:modelValue": (I) => $.width = I,
                    onChange: o.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  eo
                ]))), 128))
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 16)) : b("", !0);
}
const Be = /* @__PURE__ */ k(Ys, [["render", to], ["__scopeId", "data-v-16737013"]]);
const no = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...B.props()
  },
  emits: [
    ...B.emits()
  ],
  components: { Searcher: je, Settings: Be },
  data() {
    return {
      searcher: null,
      isFullscreen: !1,
      zoom: 1,
      checked: null,
      activeNames: ["name"],
      settings: {},
      params: {}
    };
  },
  computed: {
    ...B.computed
  },
  watch: {
    ...B.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...B.methods
  }
}, so = { key: 1 }, oo = ["value", "checked"], lo = { key: 1 };
function io(e, t, n, l, s, o) {
  const i = u("searcher"), a = u("pc-x-icon"), c = u("settings"), h = u("pc-x-table-tools"), f = u("el-table-column"), S = u("el-button"), $ = u("el-table"), R = u("x-pagination"), I = u("el-collapse-item"), L = u("el-collapse"), N = Y("loading");
  return r(), g("div", {
    class: U(["pc-x-table", { fullscreen: s.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    m(i, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    m(L, {
      modelValue: s.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (v) => s.activeNames = v),
      class: U((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: d(() => [
        m(I, {
          name: s.activeNames[0]
        }, {
          title: d(() => [
            e.$slots["collapse-title"] ? y(e.$slots, "collapse-title", { key: 0 }) : (r(), g("span", so, C(e.title), 1))
          ]),
          default: d(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (r(), p(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), X({
              "tools-end": d(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(c, {
                  modelValue: s.settings,
                  "onUpdate:modelValue": t[0] || (t[0] = (v) => s.settings = v),
                  visible: !e.hideSettings,
                  width: e._attrs["cols-popover-width"] || 500,
                  onReset: e.handleResetSettings
                }, null, 8, ["modelValue", "visible", "width", "onReset"])
              ]),
              _: 2
            }, [
              e.$slots["tools-prefix"] ? {
                name: "tools-prefix",
                fn: d(() => [
                  y(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: d(() => [
                  y(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : b("", !0),
            j((r(), p($, _({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: d(() => [
                (r(!0), g(A, null, O(e._visibleColumns, (v, x) => (r(), p(f, _(v, {
                  key: x,
                  "min-width": v.minWidth,
                  align: v.align || e._attrs.tableAlign || "center",
                  resizable: v.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(v)
                }), X({ _: 2 }, [
                  ["selection", "index"].includes(v.type) ? void 0 : {
                    name: "default",
                    fn: d((V) => [
                      v.type === "radio" ? (r(), g("input", {
                        key: 0,
                        type: "radio",
                        value: V.$index,
                        checked: V.$index === s.checked,
                        onChange: t[1] || (t[1] = (...W) => e.handleCheckedChange && e.handleCheckedChange(...W))
                      }, null, 40, oo)) : v.slot ? y(e.$slots, v.slot, {
                        key: 1,
                        scope: V,
                        column: v
                      }) : e.slotAll ? y(e.$slots, "all", {
                        key: 2,
                        scope: V,
                        column: v
                      }) : (r(), g(A, { key: 3 }, [
                        v.comp === "ElSwitch" || e.table.isRowEdit && V.row.isEditing && (v.visible !== !1 || v.canEdit) ? (r(), p(q(v.comp || "ElInput"), _({ key: 0 }, { ...v, ...v.formAttrs }, {
                          modelValue: V.row[v.prop],
                          "onUpdate:modelValue": (W) => V.row[v.prop] = W,
                          disabled: !V.row.editable || !V.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (r(), g("span", lo, C(e.calcValue(V.row, v)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? b("", !0) : (r(), p(f, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: d((v) => [
                    y(e.$slots, "operates-prefix", { scope: v }),
                    e.canEdit(v.row) ? (r(), p(S, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (x) => e._emit("edit", v)
                    }), {
                      default: d(() => [
                        m(a, { name: "edit" }),
                        w(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : b("", !0),
                    e.canSave(v.row) ? j((r(), p(S, _({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: v.row._loading,
                      onClick: (x) => e._emit("row-edit", v)
                    }), {
                      default: d(() => [
                        m(a, { name: "collection" }),
                        w(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [N, v.row._loading]
                    ]) : b("", !0),
                    e.canCancelEdit(v.row) ? (r(), p(S, _({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (x) => e._emit("cancel-edit", v)
                    }), {
                      default: d(() => [
                        m(a, { name: "refresh-left" }),
                        w(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : b("", !0),
                    e.canDelete(v.row) ? (r(), p(S, _({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (x) => e._emit("delete", v)
                    }), {
                      default: d(() => [
                        m(a, { name: "DeleteFilled" }),
                        w(" 删除 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : b("", !0),
                    y(e.$slots, "operates-suffix", { scope: v })
                  ]),
                  _: 3
                }, 8, ["min-width", "align", "fixed"]))
              ]),
              _: 3
            }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
              [N, e._loading]
            ]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p(R, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (v) => e._emit("search", s.params))
            }, null, 8, ["query", "total"])) : b("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const ao = /* @__PURE__ */ k(no, [["render", io]]);
const ro = {
  name: "MobileXTableTools",
  inheritAttrs: !1,
  props: {
    searchBtn: Object,
    addBtn: Object,
    multiEditBtn: Object,
    multiDeleteBtn: Object,
    exportBtn: Object,
    importBtn: Object,
    domids: Object
  }
}, co = { class: "mobile-x-table-tools" }, uo = { class: "tools" }, po = { class: "tools-end" };
function mo(e, t, n, l, s, o) {
  const i = u("mobile-x-icon"), a = u("van-button"), c = Y("domid");
  return r(), g("div", co, [
    E("div", uo, [
      y(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? j((r(), p(a, _({ key: 0 }, { type: "success", ...n.searchBtn }, {
        onClick: t[0] || (t[0] = (h) => e.$emit("search"))
      }), {
        default: d(() => [
          m(i, { name: "search" }),
          w(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [c, n.domids.search]
      ]) : b("", !0),
      e.$attrs.onAdd ? j((r(), p(a, _({ key: 1 }, { type: "primary", ...n.addBtn }, {
        onClick: t[1] || (t[1] = (h) => e.$emit("add"))
      }), {
        default: d(() => [
          m(i, { name: "circle-plus-filled" }),
          w(" 新增 ")
        ]),
        _: 1
      }, 16)), [
        [c, n.domids.add]
      ]) : b("", !0),
      e.$attrs.onMultiEdit ? j((r(), p(a, _({ key: 2 }, { type: "warning", ...n.multiEditBtn }, {
        onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
      }), {
        default: d(() => [
          m(i, { name: "edit" }),
          w(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [c, n.domids["multi-edit"]]
      ]) : b("", !0),
      e.$attrs.onMultiDelete ? j((r(), p(a, _({ key: 3 }, { type: "danger", ...n.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
      }), {
        default: d(() => [
          m(i, { name: "DeleteFilled" }),
          w(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [c, n.domids["multi-delete"]]
      ]) : b("", !0),
      e.$attrs.onExport ? j((r(), p(a, _({ key: 4 }, { type: "success", ...n.exportBtn }, {
        onClick: t[4] || (t[4] = (h) => e.$emit("export"))
      }), {
        default: d(() => [
          m(i, { name: "printer" }),
          w(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [c, n.domids.export]
      ]) : b("", !0),
      e.$attrs.onSearchExport ? j((r(), p(a, _({ key: 5 }, { type: "success", ...n.exportBtn }, {
        onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
      }), {
        default: d(() => [
          m(i, { name: "printer" }),
          w(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [c, n.domids["search-export"]]
      ]) : b("", !0),
      e.$attrs.onImport ? j((r(), p(a, _({ key: 6 }, { type: "warning", ...n.importBtn }, {
        onClick: t[6] || (t[6] = (h) => e.$emit("import"))
      }), {
        default: d(() => [
          m(i, { name: "UploadFilled" }),
          w(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [c, n.domids.import]
      ]) : b("", !0),
      y(e.$slots, "tools-suffix", {}, void 0, !0),
      E("div", po, [
        y(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const ho = /* @__PURE__ */ k(ro, [["render", mo], ["__scopeId", "data-v-442404e2"]]);
const fo = {
  name: "PcXTableTools",
  inheritAttrs: !1,
  props: {
    searchBtn: Object,
    addBtn: Object,
    multiEditBtn: Object,
    multiDeleteBtn: Object,
    exportBtn: Object,
    importBtn: Object,
    domids: Object
  }
}, _o = { class: "tools" }, bo = { class: "tools-end flex-center" };
function go(e, t, n, l, s, o) {
  const i = u("pc-x-icon"), a = u("el-button"), c = u("el-card"), h = Y("domid");
  return r(), p(c, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: d(() => [
      E("div", _o, [
        y(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? j((r(), p(a, _({ key: 0 }, { type: "success", ...n.searchBtn }, {
          onClick: t[0] || (t[0] = (f) => e.$emit("search"))
        }), {
          default: d(() => [
            m(i, { name: "search" }),
            w(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, n.domids.search]
        ]) : b("", !0),
        e.$attrs.onAdd ? j((r(), p(a, _({ key: 1 }, { type: "primary", ...n.addBtn }, {
          onClick: t[1] || (t[1] = (f) => e.$emit("add"))
        }), {
          default: d(() => [
            m(i, { name: "circle-plus-filled" }),
            w(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, n.domids.add]
        ]) : b("", !0),
        e.$attrs.onMultiEdit ? j((r(), p(a, _({ key: 2 }, { type: "warning", ...n.multiEditBtn }, {
          onClick: t[2] || (t[2] = (f) => e.$emit("multi-edit"))
        }), {
          default: d(() => [
            m(i, { name: "edit" }),
            w(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, n.domids["multi-edit"]]
        ]) : b("", !0),
        e.$attrs.onMultiDelete ? j((r(), p(a, _({ key: 3 }, { type: "danger", ...n.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (f) => e.$emit("multi-delete"))
        }), {
          default: d(() => [
            m(i, { name: "DeleteFilled" }),
            w(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, n.domids["multi-delete"]]
        ]) : b("", !0),
        e.$attrs.onExport ? j((r(), p(a, _({ key: 4 }, { type: "success", ...n.exportBtn }, {
          onClick: t[4] || (t[4] = (f) => e.$emit("export"))
        }), {
          default: d(() => [
            m(i, { name: "printer" }),
            w(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, n.domids.export]
        ]) : b("", !0),
        e.$attrs.onSearchExport ? j((r(), p(a, _({ key: 5 }, { type: "success", ...n.exportBtn }, {
          onClick: t[5] || (t[5] = (f) => e.$emit("search-export"))
        }), {
          default: d(() => [
            m(i, { name: "printer" }),
            w(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, n.domids["search-export"]]
        ]) : b("", !0),
        e.$attrs.onImport ? j((r(), p(a, _({ key: 6 }, { type: "warning", ...n.importBtn }, {
          onClick: t[6] || (t[6] = (f) => e.$emit("import"))
        }), {
          default: d(() => [
            m(i, { name: "UploadFilled" }),
            w(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, n.domids.import]
        ]) : b("", !0),
        y(e.$slots, "tools-suffix", {}, void 0, !0),
        E("div", bo, [
          y(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const yo = /* @__PURE__ */ k(fo, [["render", go], ["__scopeId", "data-v-02d70f98"]]);
function vo(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ve(e);
}
const $o = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, n = !t && e.selected.size > 0, l = (s) => {
    s ? e._data.forEach((i, a) => e.selected.add(a)) : e.selected.clear();
    const o = s ? e._data.slice() : [];
    e.handleSelectionChange(o);
  };
  return m(u("el-checkbox"), {
    modelValue: t,
    indeterminate: n,
    onChange: l
  }, null);
}, ko = (e, t) => {
  const {
    rowIndex: n,
    rowData: l
  } = e, s = () => {
    t.selected.has(n) ? t.selected.delete(n) : t.selected.add(n);
    const o = [...t.selected].map((i) => t._data[i]);
    t.handleSelectionChange(o);
  };
  return m(u("el-checkbox"), {
    modelValue: t.selected.has(n),
    onChange: s
  }, null);
}, wo = (e, t) => {
  const {
    page: n,
    limit: l
  } = t._query;
  return (n - 1) * l + e.rowIndex + 1;
}, So = (e, t) => {
  const {
    rowIndex: n
  } = e;
  return m("input", {
    type: "radio",
    value: n,
    checked: n === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, G = ([e, t, n, l, s, o]) => {
  const {
    rowIndex: i,
    rowData: a
  } = e, c = () => {
    t._emit(n, {
      $index: i,
      row: a
    });
  };
  return m(u("el-button"), _({
    type: l
  }, t._attrs[n + "-btn"], {
    onClick: c
  }), {
    default: () => [m(u("x-icon"), {
      name: s
    }, null), o]
  });
}, Co = (e, t) => {
  if (t.canEdit(e.rowData))
    return G([e, t, "edit", "warning", "edit", "编辑"]);
}, Vo = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return G([e, t, "row-edit", "success", "collection", "保存"]);
}, Eo = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return G([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, xo = (e, t) => {
  if (t.canDelete(e.rowData))
    return G([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Ao = (e, t) => {
  const {
    _attrs: n,
    $slots: l
  } = t, {
    slotRenderers: s = {}
  } = n;
  if (e.type === "selection")
    return (o) => ko(o, t);
  if (e.type === "index")
    return (o) => wo(o, t);
  if (e.type === "radio")
    return (o) => So(o, t);
  if (e.slot) {
    if (s[e.slot])
      return s[e.slot];
    if (l[e.slot])
      return (o) => l[e.slot]({
        scope: {
          $index: o.rowIndex,
          row: o.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (o) => l.all({
      scope: {
        $index: o.rowIndex,
        row: o.rowData
      },
      column: e
    });
  return (o) => {
    const {
      rowData: i,
      column: a
    } = o;
    if (a.comp === "ElSwitch" || t.table.isRowEdit && i.isEditing && (a.visible !== !1 || a.canEdit)) {
      const f = ($) => {
        i[a.prop] = $;
      }, S = a.comp || "ElInput";
      return P(u(S), {
        ...a,
        ...a.formAttrs,
        modelValue: i[a.prop],
        onInput: f,
        disabled: !i.editable || !i.isEditing
      });
    }
    const c = t.calcValue(o.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? m(u("el-tooltip"), {
      content: c
    }, vo(c) ? c : {
      default: () => [c]
    }) : c;
  };
}, Oo = (e, t) => {
  const {
    _attrs: n,
    $slots: l
  } = t, s = e.map((o, i) => {
    const {
      tableAttrs: a = {}
    } = o, c = {
      ...o,
      key: i,
      dataKey: o.prop,
      title: o.label,
      width: o.width || a.width || o.minWidth || a.minWidth || o.maxWidth || a.maxWidth,
      align: o.align || n.tableAlign || "center"
    };
    return c.type === "selection" && (c.width = c.width || 46, c.headerCellRenderer = $o(t)), c.cellRenderer = Ao(c, t), c;
  });
  return t.hideOperates || s.push({
    key: s.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: n.operatesAlign || n.tableAlign || "center",
    fixed: n.operatesFixed || "right",
    cellRenderer(o) {
      return m("div", {
        class: "operates"
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, Co(o, t), Vo(o, t), Eo(o, t), xo(o, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), s;
}, jo = {
  convertColumnsForTableV2: Oo
};
const Bo = {
  name: "XTableV2",
  props: {
    ...B.props(),
    fixed: {
      type: Boolean,
      default: !0
    },
    height: {
      type: String,
      default: "60vh"
    }
  },
  emits: [
    ...B.emits()
  ],
  components: { Searcher: je, Settings: Be },
  data() {
    return {
      isFullscreen: !1,
      zoom: 1,
      selected: /* @__PURE__ */ new Set(),
      checked: null,
      activeNames: ["name"],
      settings: {}
    };
  },
  computed: {
    ...B.computed
  },
  watch: {
    ...B.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...B.methods,
    convertColumnsForTableV2: jo.convertColumnsForTableV2
  }
}, Ro = { key: 1 };
function Io(e, t, n, l, s, o) {
  const i = u("Searcher"), a = u("x-icon"), c = u("Settings"), h = u("x-table-tools"), f = u("el-table-v2"), S = u("el-auto-resizer"), $ = u("x-pagination"), R = u("el-collapse-item"), I = u("el-collapse"), L = Y("loading");
  return r(), g("div", {
    class: U(["pc-x-table-v2", { fullscreen: s.isFullscreen }])
  }, [
    m(i, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (N) => e._emit("search", N))
    }, null, 8, ["uid", "columns", "config"]),
    m(I, {
      modelValue: s.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (N) => s.activeNames = N),
      class: U((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: d(() => [
        m(R, {
          name: s.activeNames[0]
        }, {
          title: d(() => [
            e.$slots["collapse-title"] ? y(e.$slots, "collapse-title", { key: 0 }) : (r(), g("span", Ro, C(e.title), 1))
          ]),
          default: d(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (r(), p(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), X({
              "tools-end": d(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(c, {
                  modelValue: s.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (N) => s.settings = N),
                  visible: !e.hideSettings,
                  width: e._attrs["cols-popover-width"] || 500,
                  onReset: e.handleResetSettings
                }, null, 8, ["modelValue", "visible", "width", "onReset"])
              ]),
              _: 2
            }, [
              e.$slots["tools-prefix"] ? {
                name: "tools-prefix",
                fn: d(() => [
                  y(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: d(() => [
                  y(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : b("", !0),
            m(S, {
              style: Ne({ height: n.height })
            }, {
              default: d(({ width: N, height: v }) => [
                j((r(), p(f, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: o.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: n.fixed,
                  width: N,
                  height: v
                }), X({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: d(() => [
                      y(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: d(() => [
                      y(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: d(() => [
                      y(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [L, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p($, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (N) => e._emit("search"))
            }, null, 8, ["query", "total"])) : b("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const No = /* @__PURE__ */ k(Bo, [["render", Io]]);
const Z = ["selection", "radio"], To = {
  name: "XTableViewer",
  inheritAttrs: !1,
  props: {
    title: {
      type: String,
      default: "数据表查看器"
    },
    useTableV2: {
      type: Boolean,
      default: !1
    },
    visible: Boolean,
    selectMode: String,
    model: Object,
    controller: Object,
    dialogAttrs: Object,
    tableAttrs: Object
  },
  emits: [
    "update:visible",
    "select"
  ],
  computed: {
    table() {
      return this.model.table;
    },
    dialog() {
      return this.model.dialog;
    },
    _tableAttrs() {
      return {
        "max-height": "50vh",
        "hide-operates": !0,
        "hide-settings": !0,
        ...this.tableAttrs
      };
    },
    _dialogAttrs() {
      return {
        width: this.$attrs.width || (window.isMobile ? "92%" : "60%"),
        "submit-text": "确定",
        "close-on-click-modal": !1,
        "close-on-press-escape": !1,
        ...this.dialogAttrs
      };
    }
  },
  created() {
    this.init(), this.controller.handleSearch();
  },
  methods: {
    init() {
      const { table: e, selectMode: t } = this;
      Z.includes(t) && (e.columns.find((n) => n.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((n) => n.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((n) => this.selectMode === n.type || !Z.includes(n.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (Z.includes(t)) {
        let n = null;
        if (t === "selection" ? n = e.selection : t === "radio" && (n = e.checked), t === "selection" && !n.length || !n) {
          this.$message({ type: "warning", message: "未选择数据" }), this.handleCancel();
          return;
        }
        this.$emit("select", n), this.clearSelected();
      }
      this.handleCancel();
    },
    handleCancel() {
      this.$emit("update:visible", !1);
    },
    handleBeforeClose(e) {
      return e === "cancel" ? !0 : new Promise((t) => {
        const n = () => {
          this.handleCancel(), t(!0);
        };
        this._dialogAttrs["before-close"] ? this._dialogAttrs["before-close"](n) : n();
      });
    },
    clearSelected() {
      this.table.selection = [], this.table.checked = null, this.table.tableRef.clearSelection(), this.table.tableRef.$el.querySelectorAll('input[type="radio"]').forEach((t) => t.checked = !1);
    }
  }
}, Do = { class: "x-table-viewer" };
function Fo(e, t, n, l, s, o) {
  const i = u("x-dialog");
  return r(), g("div", Do, [
    m(i, _(o._dialogAttrs, {
      modelValue: n.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: n.title,
      "before-close": o.handleBeforeClose,
      onSubmit: o.handleSubmit,
      onCancel: o.handleCancel
    }), {
      default: d(() => [
        (r(), p(q(n.useTableV2 ? "x-table-v2" : "x-table"), _({
          tref: o.table.tableRef,
          "onUpdate:tref": t[0] || (t[0] = (a) => o.table.tableRef = a),
          table: o.table
        }, o._tableAttrs, {
          onSearch: n.controller.handleSearch
        }), null, 16, ["tref", "table", "onSearch"]))
      ]),
      _: 1
    }, 16, ["modelValue", "title", "before-close", "onSubmit", "onCancel"])
  ]);
}
const Mo = /* @__PURE__ */ k(To, [["render", Fo], ["__scopeId", "data-v-f5d31400"]]), Xo = {
  name: "XTinymce",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      id: "tm-" + Date.now().toString(16),
      instance: null
    };
  },
  watch: {
    modelValue(e) {
      var t;
      (t = this.instance) == null || t[0].setContent(e);
    }
  },
  mounted() {
    this.initEditor();
  },
  beforeUnmount() {
    this.instance && (this.instance[0].destroy(), this.instance = null);
  },
  methods: {
    async initEditor() {
      const e = await window.tinymce.init({
        selector: "textarea#" + this.id,
        height: 500,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount"
        ],
        toolbar: `
          undo redo | blocks | 
          bold italic backcolor | alignleft aligncenter 
          alignright alignjustify | bullist numlist outdent indent | 
          removeformat | help
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }
        `,
        placeholder: "请输入、编辑富文本内容~",
        ...this.config
      });
      this.instance = Object.freeze(e), this.addSaveButton();
    },
    handleSave() {
      this.$emit("update:modelValue", this.instance[0].getContent());
    },
    addSaveButton() {
      const e = document.querySelector(".tox-menubar"), t = e.childNodes[0].cloneNode(!0);
      t.textContent = "保存", t.style.color = "#409EFF", t.onclick = this.handleSave.bind(this), e.appendChild(t);
    }
  }
}, Uo = { class: "x-tinymce" }, zo = ["id", "innerHTML"];
function Po(e, t, n, l, s, o) {
  return r(), g("div", Uo, [
    E("textarea", {
      id: s.id,
      innerHTML: n.modelValue
    }, null, 8, zo)
  ]);
}
const qo = /* @__PURE__ */ k(Xo, [["render", Po]]);
const Lo = {
  name: "XFileUploader",
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    accept: String
  },
  emits: ["update:modelValue"],
  data() {
    return {
      action: `${this.$api.API_BASE_URL}/upload_file`
    };
  },
  computed: {
    filepath() {
      const e = this.modelValue;
      return Array.isArray(e) ? e[0] : e;
    }
  },
  methods: {
    onSuccess(e, t, n) {
      const l = this.$api.API_BASE_URL + "/" + e.filename;
      this.$emit("update:modelValue", l);
    }
  }
}, Wo = (e) => (oe("data-v-e756c8fc"), e = e(), le(), e), Ho = { class: "mask" }, Jo = /* @__PURE__ */ Wo(() => /* @__PURE__ */ E("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ w(" 将文件拖到此处，或"),
  /* @__PURE__ */ E("em", null, "点击上传")
], -1)), Ko = {
  key: 0,
  class: "path"
};
function Yo(e, t, n, l, s, o) {
  const i = u("x-icon"), a = u("el-upload");
  return r(), p(a, {
    drag: "",
    "show-file-list": !1,
    action: s.action,
    accept: n.accept,
    multiple: n.multiple,
    "on-success": o.onSuccess,
    class: "x-file-uploader"
  }, {
    default: d(() => [
      E("div", Ho, [
        m(i, { name: "upload-filled" }),
        Jo
      ]),
      o.filepath ? (r(), g("div", Ko, C(n.modelValue), 1)) : b("", !0)
    ]),
    _: 1
  }, 8, ["action", "accept", "multiple", "on-success"]);
}
const Go = /* @__PURE__ */ k(Lo, [["render", Yo], ["__scopeId", "data-v-e756c8fc"]]);
const Qo = {
  name: "XImageUploader",
  props: {
    modelValue: Array | String,
    multiple: Boolean
  },
  emits: ["update:modelValue"],
  data() {
    return {
      action: `${this.$api.API_BASE_URL}/upload_file`
    };
  },
  computed: {
    image() {
      const e = this.modelValue;
      return Array.isArray(e) ? e[0] : e;
    }
  },
  methods: {
    onSuccess(e, t, n) {
      const l = this.$api.API_BASE_URL + "/" + e.filename;
      this.$emit("update:modelValue", l);
    }
  }
}, Zo = (e) => (oe("data-v-c8f36d63"), e = e(), le(), e), el = { class: "mask" }, tl = /* @__PURE__ */ Zo(() => /* @__PURE__ */ E("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ w(" 将图片拖到此处，或"),
  /* @__PURE__ */ E("em", null, "点击上传")
], -1));
function nl(e, t, n, l, s, o) {
  const i = u("el-image"), a = u("x-icon"), c = u("el-upload");
  return r(), p(c, {
    drag: "",
    "show-file-list": !1,
    action: s.action,
    accept: "image/*",
    multiple: n.multiple,
    "on-success": o.onSuccess,
    class: "x-image-uploader"
  }, {
    default: d(() => [
      o.image ? (r(), p(i, {
        key: 0,
        src: o.image,
        alt: "upload-image",
        fit: "cover"
      }, null, 8, ["src"])) : b("", !0),
      E("div", el, [
        m(a, { name: "upload-filled" }),
        tl
      ])
    ]),
    _: 1
  }, 8, ["action", "multiple", "on-success"]);
}
const sl = /* @__PURE__ */ k(Qo, [["render", nl], ["__scopeId", "data-v-c8f36d63"]]), ee = {
  xactionsheet: Ue,
  xautorows: We,
  mobilexbutton: Ke,
  pcxbutton: Qe,
  xchart: nt,
  mobilexcheckboxs: lt,
  pcxcheckboxs: rt,
  mobilexcol: ut,
  pcxcol: ht,
  mobilexdialog: bt,
  pcxdialog: $t,
  xdistrictselect: St,
  mobilexform: It,
  pcxform: Ft,
  mobilexformitem: Ut,
  pcxformitem: zt,
  mobilexicon: Wt,
  pcxicon: Yt,
  xinfo: Jn,
  xlooper: Qn,
  mobilexpagination: ts,
  pcxpagination: os,
  xpicker: as,
  mobilexradios: ds,
  pcxradios: ms,
  mobilexrow: bs,
  pcxrow: $s,
  mobilexselect: Vs,
  pcxselect: Bs,
  mobilextable: Ws,
  pcxtable: ao,
  mobilextabletools: ho,
  pcxtabletools: yo,
  xtablev2: No,
  xtableviewer: Mo,
  xtinymce: qo,
  xfileuploader: Go,
  ximageuploader: sl
}, J = {};
for (let e in ee)
  J[ee[e].name] = ee[e];
const ol = (e) => ({
  props: {
    platform: {
      type: String,
      default: window.isMobile ? "mobile" : "pc"
    }
  },
  data() {
    return { name: "" };
  },
  created() {
    this.name = (this.platform.toLowerCase() === "pc" ? "Pc" : "Mobile") + e;
  },
  render() {
    return P(u(this.name), {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), se = (() => {
  const e = Object.keys(J), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], n = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (n[l] = J[l]);
  for (const l of t)
    e.find((s) => /(pc|mobile)/i.test(s) && s.toLowerCase().includes(l.toLowerCase())) ? n[l] = ol(l) : n[l] = J[l];
  return n;
})(), ll = (e, t) => {
  for (let n in se)
    e.component(n, se[n]);
}, al = {
  ...se,
  ...Fe,
  install: ll
};
export {
  al as default,
  Fe as utils
};
