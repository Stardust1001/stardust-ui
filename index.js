import { resolveComponent as d, openBlock as r, createBlock as p, mergeProps as _, createElementBlock as g, Fragment as x, renderList as E, withCtx as u, renderSlot as y, toDisplayString as C, useCssVars as ye, toRaw as Te, watch as Me, createTextVNode as k, createSlots as D, resolveDynamicComponent as q, createCommentVNode as b, createVNode as m, normalizeProps as J, guardReactiveProps as ve, normalizeClass as F, h as U, isVNode as Se, createElementVNode as V, withModifiers as H, pushScopeId as oe, popScopeId as ne, resolveDirective as K, withDirectives as A, normalizeStyle as Be } from "vue";
const $ = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, n] of t)
    o[s] = n;
  return o;
}, Re = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function ze(e, t, o, s, n, l) {
  const i = d("van-action-sheet");
  return r(), p(i, _(e.$attrs, {
    show: o.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => o.actionSheet.show = a),
    actions: o.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Ie = /* @__PURE__ */ $(Re, [["render", ze]]), Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ie
}, Symbol.toStringTag, { value: "Module" })), Ne = {
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
      let t = e[0], o = 0;
      return this.cols.forEach((s) => {
        const n = s.span || this.span;
        t.push(s), o += n, o >= 24 && (t = [], e.push(t), o = 0);
      }), e;
    }
  }
}, De = { class: "x-auto-rows" }, Fe = { key: 1 };
function Xe(e, t, o, s, n, l) {
  const i = d("XCol"), a = d("XRow");
  return r(), g("div", De, [
    (r(!0), g(x, null, E(l.rows, (c, f) => (r(), p(a, _({ key: f }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: u(() => [
        (r(!0), g(x, null, E(c, (h, w) => (r(), p(i, _(h, {
          span: h.span || o.span,
          key: w,
          platform: e.$attrs.platform
        }), {
          default: u(() => [
            h.slot || e.$attrs.slot ? y(e.$slots, h.slot || e.$attrs.slot, {
              key: 0,
              col: h
            }) : (r(), g("span", Fe, C(h.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const Ue = /* @__PURE__ */ $(Ne, [["render", Xe]]), qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ue
}, Symbol.toStringTag, { value: "Module" })), Le = {
  name: "MobileXButton"
};
function We(e, t, o, s, n, l) {
  const i = d("van-button");
  return r(), p(i, null, {
    default: u(() => [
      y(e.$slots, "default")
    ]),
    _: 3
  });
}
const He = /* @__PURE__ */ $(Le, [["render", We]]), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: He
}, Symbol.toStringTag, { value: "Module" })), Ke = {
  name: "PcXButton"
};
function Ye(e, t, o, s, n, l) {
  const i = d("el-button");
  return r(), p(i, null, {
    default: u(() => [
      y(e.$slots, "default")
    ]),
    _: 3
  });
}
const Ze = /* @__PURE__ */ $(Ke, [["render", Ye]]), Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ze
}, Symbol.toStringTag, { value: "Module" }));
const { funcs: Qe } = StardustBrowser, le = {
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
      return Qe.calcPixel(this.height) * this.zoom + "px";
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
      for (let o = 0; o < Math.ceil(e / t); o++)
        setTimeout(this.chart.resize, t * o);
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
}, ue = () => {
  ye((e) => ({
    "127c024a": e.zoomedHeight,
    "137ee0b8": e.zoom
  }));
}, de = le.setup;
le.setup = de ? (e, t) => (ue(), de(e, t)) : ue;
const et = {
  class: "x-chart",
  ref: "el"
};
function tt(e, t, o, s, n, l) {
  return r(), g("div", et, null, 512);
}
const ot = /* @__PURE__ */ $(le, [["render", tt], ["__scopeId", "data-v-0c2da986"]]), nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ot
}, Symbol.toStringTag, { value: "Module" })), P = (e, t) => {
  const o = e.__v_isRef ? e.value : Te(e);
  let s = o;
  if (typeof o[0] != "object" && (s = o.map((l) => ({ text: l, value: l }))), !t.sort)
    return s;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return s.sort((l, i) => l[n].localeCompare(i[n]));
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
}), lt = () => ({
  table: ke(),
  dialog: we()
}), { funcs: Q } = StardustJs, st = (e, t) => (Object.values(e).forEach((o) => {
  !o || typeof o != "object" || (o._isBaseTable ? Ce(o, t) : o._isBaseDialog ? Oe(o, t) : o._isBaseForm && se(o, t));
}), e), Ce = (e, t) => (e.columns.push(...t.filter((o) => o.visible === !1 ? o.canView : o.canView !== !1)), e), Oe = (e, t) => (e.formItems = t.filter((o) => o.visible === !1 ? o.canAdd || o.canEdit : o.canAdd !== !1 || o.canEdit !== !1), se(e, t), e), se = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((s) => s.visible !== !1)), je(e.form, e.formItems), e.initialForm = Q.deepCopy(e.form), e.initialFormRules = Q.deepCopy(e.formRules), Me(() => e.formItems, () => {
  Ve(e);
}, { immediate: !0, deep: !0 }), e), Ve = (e) => {
  const { formItems: t, initialFormRules: o } = e, s = t.filter((l) => {
    let { formAttrs: i = {}, required: a = !1 } = l;
    return a = "required" in i ? i.required : a, !l.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(l.prop) && a !== !1;
  }).map((l) => l.prop);
  if (Object.assign(e.formRules, Q.deepCopy(o)), Object.keys(e.formRules).forEach((l) => {
    l in o || delete e.formRules[l];
  }), !s.length)
    return;
  const n = {};
  return s.forEach((l) => {
    if (e.formRules[l])
      return;
    const i = t.find((M) => M.prop === l), a = i.platform || e.platform || (window.isMobile ? "mobile" : "pc"), c = xe[a], f = [], S = { required: !0, message: `请${"options" in i ? "选择" : "输入"}${(i == null ? void 0 : i.label) || l}` };
    i.validator && (S.validator = i.validator), i.asyncValidator && (S.asyncValidator = i.asyncValidator), i.comp ? f.push({ ...S, trigger: c.change }) : f.push({ ...S, trigger: c.blur }), i.comp === "ElInputNumber" && f.push({ ...S, trigger: c.blur }), n[l] = f;
  }), Object.assign(e.formRules, n), e.formRules;
}, je = (e, t, o = !0) => {
  const s = {};
  return t.forEach((n) => {
    var f;
    let l = "";
    const { type: i, options: a } = n, { multiple: c } = n.formAttrs || {};
    if (o && i === "number" || n.comp === "ElInputNumber")
      l = 0;
    else if (n.comp === "ElSwitch")
      l = !1;
    else if (a && ((f = n.comp) != null && f.endsWith("XCheckboxs") || c))
      l = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const h = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + h), n["end-placeholder"] || (n["end-placeholder"] = "结束" + h), l = [];
    }
    s[n.prop] = l;
  }), Object.assign(e, { ...s, ...e }), e;
}, xe = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, it = {
  formatOptions: P,
  baseForm: $e,
  baseTable: ke,
  baseDialog: we,
  baseModel: lt,
  initModel: st,
  initTable: Ce,
  initDialog: Oe,
  initForm: se,
  initFormRules: Ve,
  initDefaultForm: je,
  triggers: xe
}, at = {
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
        placeholder: o,
        rules: s,
        required: n,
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: P
  }
};
function rt(e, t, o, s, n, l) {
  const i = d("van-checkbox"), a = d("van-checkbox-group");
  return r(), p(a, _({ class: "mobile-x-checkboxs" }, l.attrs, { direction: o.direction }), {
    default: u(() => [
      (r(!0), g(x, null, E(l.formatOptions(o.options, this), (c) => (r(), p(i, _(l.attrs, {
        key: c[o.text],
        shape: o.shape,
        name: c[o.value]
      }), {
        default: u(() => [
          k(C(c[o.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const ct = /* @__PURE__ */ $(at, [["render", rt]]), ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ct
}, Symbol.toStringTag, { value: "Module" })), dt = {
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
        placeholder: o,
        ...s
      } = this.$attrs;
      return s;
    }
  },
  methods: {
    formatOptions: P
  }
};
function pt(e, t, o, s, n, l) {
  const i = d("el-checkbox"), a = d("el-checkbox-group");
  return r(), p(a, _({ class: "pc-x-checkboxs" }, l.attrs, {
    modelValue: o.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (c) => e.$emit("update:modelValue", c))
  }), {
    default: u(() => [
      (r(!0), g(x, null, E(l.formatOptions(o.options, this), (c) => (r(), p(i, _(l.attrs, {
        key: c[o.text],
        label: c[o.value]
      }), {
        default: u(() => [
          k(C(c[o.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const mt = /* @__PURE__ */ $(dt, [["render", pt]]), ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mt
}, Symbol.toStringTag, { value: "Module" })), ht = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...o } = this.$attrs;
      return o;
    }
  }
};
function _t(e, t, o, s, n, l) {
  const i = d("van-col");
  return r(), p(i, _(l.attrs, { class: "mobile-x-col" }), {
    default: u(() => [
      y(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const bt = /* @__PURE__ */ $(ht, [["render", _t]]), gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bt
}, Symbol.toStringTag, { value: "Module" })), yt = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...o } = this.$attrs;
      return o;
    }
  }
};
function vt(e, t, o, s, n, l) {
  const i = d("el-col");
  return r(), p(i, _(l.attrs, { class: "pc-x-col" }), {
    default: u(() => [
      y(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const St = /* @__PURE__ */ $(yt, [["render", vt]]), $t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: St
}, Symbol.toStringTag, { value: "Module" })), kt = {
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
function wt(e, t, o, s, n, l) {
  const i = d("van-dialog");
  return r(), p(i, _({ width: "92%" }, e.$attrs, {
    show: l.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => l.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: t[1] || (t[1] = (a) => e.$emit("submit")),
    onCancel: t[2] || (t[2] = (a) => e.$emit("cancel"))
  }), D({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: u(() => [
        y(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: u(() => [
        y(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: u(() => [
        y(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button"]);
}
const Ct = /* @__PURE__ */ $(kt, [["render", wt]]), Ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ct
}, Symbol.toStringTag, { value: "Module" })), Vt = {
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
}, jt = {
  key: 1,
  class: "el-dialog__title"
};
function xt(e, t, o, s, n, l) {
  const i = d("x-icon"), a = d("el-button");
  return r(), p(q(o.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: o.draggable }, e.$attrs, {
    modelValue: l.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (c) => l.visible = c),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": o.drawer }]
  }), {
    header: u(() => [
      e.$slots.header ? y(e.$slots, "header", { key: 0 }) : (r(), g("span", jt, C(e.$attrs.title), 1)),
      o.drawer ? b("", !0) : (r(), p(i, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: l.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: u(() => [
      e.$slots.footer ? y(e.$slots, "footer", { key: 0 }) : b("", !0),
      o.onSubmit || e.$parent.$attrs.onSubmit ? (r(), p(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (c) => e.$emit("submit"))
      }, {
        default: u(() => [
          k(C(o.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : b("", !0),
      o.onCancel || e.$parent.$attrs.onCancel ? (r(), p(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (c) => e.$emit("cancel"))
      }, {
        default: u(() => [
          k(C(o.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : b("", !0)
    ]),
    default: u(() => [
      e.$slots.default ? y(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const Et = /* @__PURE__ */ $(Vt, [["render", xt]]), At = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Et
}, Symbol.toStringTag, { value: "Module" })), z = {}, N = {
  provinces: [],
  cities: [],
  counties: []
}, Tt = {
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
      provinces: Object.freeze(N.provinces),
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
      this.cities = Object.freeze(N.cities.filter((o) => o.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(N.counties.filter((o) => o.value.slice(0, 4) === t));
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
      Object.assign(z, this.areaList), N.provinces = Object.entries(z.province_list).map((e) => ({ value: e[0], text: e[1] })), N.cities = Object.entries(z.city_list).map((e) => ({ value: e[0], text: e[1] })), N.counties = Object.entries(z.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(N.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, o] = this.modelValue.split("/");
      if (e) {
        const s = Object.entries(z.province_list).find((n) => n[1] === e);
        this.province = s == null ? void 0 : s[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const s = Object.entries(z.city_list).find((n) => n[1] === t);
        this.city = s == null ? void 0 : s[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), o) {
        const s = Object.entries(z.county_list).find((n) => n[1] === o);
        this.county = s == null ? void 0 : s[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && z.province_list[this.province] || "",
        this.number > 1 && this.city && z.city_list[this.city] || "",
        this.number > 2 && this.county && z.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function Mt(e, t, o, s, n, l) {
  const i = d("x-select"), a = d("x-col"), c = d("x-row");
  return r(), p(c, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: u(() => [
      m(a, { span: l.span }, {
        default: u(() => [
          m(i, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (f) => n.province = f),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      l.number > 1 ? (r(), p(a, {
        key: 0,
        span: l.span
      }, {
        default: u(() => [
          m(i, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (f) => n.city = f),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : b("", !0),
      l.number > 2 ? (r(), p(a, {
        key: 1,
        span: l.span
      }, {
        default: u(() => [
          m(i, {
            modelValue: n.county,
            "onUpdate:modelValue": t[2] || (t[2] = (f) => n.county = f),
            options: n.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : b("", !0)
    ]),
    _: 1
  });
}
const Bt = /* @__PURE__ */ $(Tt, [["render", Mt]]), Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bt
}, Symbol.toStringTag, { value: "Module" }));
function zt() {
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
function It() {
  const { dialog: e, form: t, model: o } = this.$props;
  return o || (e || t).form;
}
function Pt() {
  const { hideLabels: e, dialog: t, form: o } = this.$props;
  return (this.items || (t || o).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function Nt() {
  const { dialog: e, form: t, rules: o } = this.$props;
  return o || (e || t).formRules;
}
function Dt(e) {
  var s;
  let { placeholder: t, comp: o } = e;
  return t || (t = "options" in e || /(date|time)/i.test(o) ? "请选择" : "请输入", t += ((s = e.label) == null ? void 0 : s.trim()) || e._label || e.text || e.model || ""), t;
}
function Ft(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function Xt(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const X = {
  props: zt,
  computed: {
    _model: It,
    _items: Pt,
    _rules: Nt
  },
  methods: {
    calcPlaceholder: Dt,
    calcStyle: Ft,
    formatModelValue: Xt
  }
}, Ut = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...X.props()
  },
  emits: ["update:fref"],
  computed: {
    ...X.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...X.methods
  }
};
function qt(e, t, o, s, n, l) {
  const i = d("mobile-x-form-item"), a = d("van-cell-group"), c = d("van-form");
  return r(), p(c, {
    ref: "formRef",
    class: "mobile-x-form"
  }, {
    default: u(() => [
      e.$slots.pre ? y(e.$slots, "pre", { key: 0 }) : b("", !0),
      m(a, J(ve(e.$attrs)), {
        default: u(() => [
          (r(!0), g(x, null, E(e._items, (f, h) => (r(), p(i, _(f, {
            rules: e._rules[f.prop] || f.rules,
            key: h,
            modelValue: e.formatModelValue(e._model[f.prop]),
            "onUpdate:modelValue": (w) => e._model[f.prop] = w,
            placeholder: e.calcPlaceholder(f)
          }), {
            default: u(() => [
              f.slot ? y(e.$slots, f.slot, J(_({ key: 0 }, f))) : b("", !0)
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
const Lt = /* @__PURE__ */ $(Ut, [["render", qt]]), Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lt
}, Symbol.toStringTag, { value: "Module" })), Ht = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...X.props(),
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
    ...X.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...X.methods
  }
}, Jt = { key: 1 };
function Kt(e, t, o, s, n, l) {
  const i = d("pc-x-form-item"), a = d("el-form"), c = d("el-collapse-item"), f = d("el-collapse");
  return r(), p(f, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (h) => n.activeNames = h),
    class: F((o.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: u(() => [
      m(c, {
        name: n.activeNames[0]
      }, {
        title: u(() => [
          e.$slots["collapse-title"] ? y(e.$slots, "collapse-title", { key: 0 }) : (r(), g("span", Jt, C(o.title), 1))
        ]),
        default: u(() => [
          m(a, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": o.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": o.hideLabels }]
          }), {
            default: u(() => [
              e.$slots.pre ? y(e.$slots, "pre", { key: 0 }) : b("", !0),
              (r(!0), g(x, null, E(e._items, (h, w) => (r(), p(i, _(h, {
                key: w,
                modelValue: e._model[h.prop],
                "onUpdate:modelValue": [(S) => e._model[h.prop] = S, (S) => h.onChange || null],
                "label-width": o.labelWidth,
                prop: h.prop || h.model,
                clearable: h.clearable !== !1,
                placeholder: e.calcPlaceholder(h),
                style: e.calcStyle(h),
                "show-tooltip": e.$attrs.showTooltip || !1
              }), {
                default: u(() => [
                  h.slot ? y(e.$slots, h.slot, { key: 0 }) : b("", !0)
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
const Yt = /* @__PURE__ */ $(Ht, [["render", Kt]]), Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" }));
function pe(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Se(e);
}
const ee = (e) => {
  const {
    $props: t,
    $attrs: o,
    attrs: s,
    $emit: n
  } = e;
  let {
    comp: l,
    compType: i,
    html: a,
    text: c
  } = t;
  const f = {
    ...s,
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  }, h = [];
  return i === "html" ? f.class = "comp-html" : l = d(l), a && (f.innerHTML = a), c && h.push(c), U(l, f, {
    default: () => h
  });
}, Gt = (e) => {
  const {
    $props: t,
    $attrs: o,
    attrs: s,
    $emit: n,
    $slots: l
  } = e, {
    slot: i,
    showTooltip: a,
    placeholder: c
  } = t;
  if (i && !o.label)
    return l.default();
  let f = null;
  if (a) {
    let h;
    f = m(d("el-tooltip"), {
      effect: "dark",
      content: c,
      placement: "bottom"
    }, pe(h = ee(e)) ? h : {
      default: () => [h]
    });
  } else
    f = ee(e);
  return m(d("el-form-item"), null, pe(f) ? f : {
    default: () => [f]
  });
}, Qt = (e) => {
  const {
    $props: t,
    $attrs: o,
    attrs: s,
    $emit: n,
    $slots: l,
    mValue: i
  } = e, {
    slot: a,
    comp: c,
    modelValue: f
  } = t;
  if (a && !o.label)
    return l.default({
      ...t,
      ...o
    });
  const h = {
    modelValue: i,
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  };
  return a && o.label || c ? U(d("van-field"), h, {
    input: () => a && o.label ? l.default() : ee(e)
  }) : (Object.assign(h, s), U(d("van-field"), h));
}, eo = {
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
        platform: o,
        comp: s,
        compType: n,
        iconSize: l,
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
        var t, o;
        ((t = this.comp) != null && t.endsWith("XSelect") || (o = this.comp) != null && o.endsWith("x-select")) && this.$emit("update:modelValue", e);
      }
    }
  },
  render() {
    return Qt(this);
  }
}, to = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: eo
}, Symbol.toStringTag, { value: "Module" }));
const ie = {
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
        platform: o,
        comp: s,
        slot: n,
        compType: l,
        span: i,
        offset: a,
        showTooltip: c,
        required: f,
        format: h,
        style: w,
        html: S,
        class: M,
        ...B
      } = { ...this.$props, ...this.$attrs };
      return B;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Gt(this);
  }
}, me = () => {
  ye((e) => ({
    ba9709f0: e.width
  }));
}, fe = ie.setup;
ie.setup = fe ? (e, t) => (me(), fe(e, t)) : me;
const oo = /* @__PURE__ */ $(ie, [["__scopeId", "data-v-d2cde1e2"]]), no = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: oo
}, Symbol.toStringTag, { value: "Module" })), he = /* @__PURE__ */ Object.assign({}), lo = {
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
      await Promise.all(Object.keys(he).map(async (t) => {
        const o = t.split("/").pop().split(".")[0], s = await he[t]();
        e[o] = s.default;
      })), this.icons = e;
    }
  }
}, so = ["src"];
function io(e, t, o, s, n, l) {
  const i = d("van-icon");
  return n.icons[o.name] ? (r(), g("img", {
    key: 0,
    src: n.icons[o.name],
    alt: "icon"
  }, null, 8, so)) : (r(), p(i, _({ key: 1 }, e.$attrs, { name: o.name }), null, 16, ["name"]));
}
const ao = /* @__PURE__ */ $(lo, [["render", io]]), ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ao
}, Symbol.toStringTag, { value: "Module" })), _e = /* @__PURE__ */ Object.assign({}), co = {
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
        const o = t.split("/").pop().split(".")[0], s = await _e[t]();
        e[o] = s.default;
      })), this.icons = e;
    }
  }
}, uo = ["src"];
function po(e, t, o, s, n, l) {
  const i = d("el-icon");
  return n.icons[o.name] ? (r(), g("img", {
    key: 0,
    src: n.icons[o.name],
    alt: "icon"
  }, null, 8, uo)) : (r(), p(i, J(_({ key: 1 }, e.$attrs)), {
    default: u(() => [
      (r(), p(q(o.name)))
    ]),
    _: 1
  }, 16));
}
const mo = /* @__PURE__ */ $(co, [["render", po]]), fo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mo
}, Symbol.toStringTag, { value: "Module" })), { highdict: ho } = StardustJs, { storage: _o } = StardustBrowser, { local: Ee } = _o, ae = ["index", "selection", "expand", "radio", "_index"];
function bo() {
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
function go() {
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
function yo() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", o = { ...this.$attrs };
  return t in this && Object.assign(o, this[t]), o;
}
function vo() {
  const e = {};
  return ["search", "add", "multi-edit", "multi-delete", "export", "search-export", "import"].forEach((o) => e[o] = o), { ...e, ...this.$attrs.domids };
}
function So() {
  const e = Object.keys(this._attrs).filter((o) => !o.endsWith("-btn")), t = {};
  return e.forEach((o) => t[o] = this._attrs[o]), delete t.platform, {
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
function $o() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function ko() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function wo() {
  const { $props: e, _query: t } = this, { table: o, columns: s } = e;
  return (s || (o == null ? void 0 : o.columns) || []).map((l) => l.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(i) {
      const { page: a, limit: c } = t;
      return (a - 1) * c + i + 1;
    }
  }, l, { type: "index" }) : l.type === "radio" ? Object.assign({ width: 60, label: "单选" }, l) : Object.assign({}, l, l.tableAttrs));
}
function Co() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Oo() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function Vo() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function jo() {
  return this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function xo() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Eo() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function Ao() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function To() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function Mo() {
  return this.onMultiEdit || this._listen["multi-edit"] ? () => this._emit("multi-edit") : null;
}
function Bo() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function Ro() {
  if (!this.controller)
    return {};
  let e = this.listen;
  Array.isArray(this.listen) || (e = this.listen.split(","));
  const t = {};
  return e.forEach((o) => {
    const s = "handle" + o.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[o] = this.controller[s];
  }), t;
}
function zo() {
  const e = this._columns.filter((o) => o.type && ae.includes(o.type)), t = this.settings.columns.filter((o) => !o.hide).map((o) => {
    const s = this._columns.find((n) => n.prop === o.prop);
    return {
      sortable: "custom",
      ...s,
      width: o.width || s.width
    };
  });
  return e.concat(t);
}
function Io() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function Po() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function No() {
  return this._columns.filter((e) => !e.type || !ae.includes(e.type));
}
function Do() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function Fo() {
  const e = this._uid && Ee.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns = e.columns || this._columns.filter((t) => !t.type || !ae.includes(t.type)).map((t) => {
    const { prop: o, label: s, show: n, hide: l, width: i } = t;
    return { prop: o, label: s, show: n, hide: l, width: i };
  }), this.settings = e;
}
function Xo(e) {
  Ee.setJson(`Settings[${this._uid}]`, e);
}
function Uo(e, t) {
  const { prop: o } = t;
  let { format: s, formatter: n } = t.tableAttrs || t;
  s = Array.isArray(t.options) ? s !== !1 : s;
  const l = e[o];
  if (l == null || l === "")
    return this.defaultValue;
  if (s || n) {
    const i = `_formatted_${o}`;
    if (i in e)
      return e[i];
    if (n)
      return typeof n == "function" ? n(l, e, t) : ho.get(e, n);
  }
  return l;
}
function qo(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function Lo(e) {
  this.params = e, this._emit("search", e);
}
function Wo(e) {
  this.saveSettings(e), this.initSettings();
}
function Ho(e, t, o, s) {
  const n = this.settings.columns.find((l) => l.prop === o.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, o, s);
}
function Jo(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Ko(...e) {
  var t, o;
  this.onSortChange ? this.onSortChange(...e) : e[0].column.sortable === "custom" && ((o = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || o.call(t, ...e));
}
function Yo(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function Zo() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Go(e) {
  var s;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const o = this._visibleColumns[e.columnIndex];
  if ((s = o == null ? void 0 : o.tableAttrs) != null && s.class) {
    const n = o.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Qo(e) {
  var s;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, o = this._visibleColumns[e.columnIndex];
  if ((s = o == null ? void 0 : o.tableAttrs) != null && s.style) {
    const n = o.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function en(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function tn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function on(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function nn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function ln(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function sn(e, t) {
  const o = "on" + e.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join("");
  this[o] ? this[o](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function an() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const T = {
  props: bo,
  emits: go,
  computed: {
    _attrs: yo,
    domids: vo,
    elTableAttrs: So,
    _loading: $o,
    _data: ko,
    _columns: wo,
    _query: Co,
    _total: Oo,
    _selection: Vo,
    _onSearch: jo,
    _onAdd: xo,
    _onExport: Eo,
    _onSearchExport: Ao,
    _onImport: To,
    _onMultiEdit: Mo,
    _onMultiDelete: Bo,
    _listen: Ro,
    _visibleColumns: zo,
    _uid: Io,
    hideOperates: Po,
    searcherColumns: No,
    searcherConfig: Do
  },
  watch: {
    $route: an
  },
  methods: {
    initSettings: Fo,
    saveSettings: Xo,
    calcValue: Uo,
    calcOverflowTooltip: qo,
    handleSearch: Lo,
    handleResetSettings: Wo,
    handleHeaderDragend: Ho,
    handleSelectionChange: Jo,
    handleSortChange: Ko,
    handleCheckedChange: Yo,
    handleToggleFullscreen: Zo,
    cellClassName: Go,
    cellStyle: Qo,
    canEdit: en,
    canSave: tn,
    canRowEdit: on,
    canCancelEdit: nn,
    canDelete: ln,
    _emit: sn
  }
};
const rn = {
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
        const { infoAttrs: o = {}, ...s } = t, n = { span: this.span, ...s, ...o }, l = n.block || "基本信息";
        let i = e[l];
        i || (e[l] = i = [], i.span = 0), i.span + n.span > 24 && i.length ? i[i.length - 1].span += 24 - i.span : i.span += n.span, i.push(n);
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
    calcValue: T.methods.calcValue
  }
}, cn = { key: 0 }, un = { key: 1 };
function dn(e, t, o, s, n, l) {
  const i = d("el-descriptions-item"), a = d("el-descriptions"), c = d("el-collapse-item"), f = d("el-collapse");
  return r(), p(f, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (h) => n.activeNames = h),
    class: F(["x-info", { "hide-header": l.hideHeader }])
  }, {
    default: u(() => [
      (r(!0), g(x, null, E(l.blocks, (h, w) => (r(), p(c, {
        key: w,
        title: w,
        name: w
      }, {
        default: u(() => [
          m(a, {
            column: o.column,
            border: o.border
          }, {
            default: u(() => [
              (r(!0), g(x, null, E(h, (S) => (r(), p(i, _({
                key: S.prop
              }, S), D({
                default: u(() => [
                  S.slot ? (r(), g("span", cn, [
                    y(e.$slots, S.slot, J(ve({ data: o.data, field: S, value: l.calcValue(o.data, S) })), void 0, !0)
                  ])) : (r(), g("span", un, C(l.calcValue(o.data, S)), 1))
                ]),
                _: 2
              }, [
                o.labelSlot ? {
                  name: "label",
                  fn: u(() => [
                    y(e.$slots, "label", {
                      label: S.label
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
const pn = /* @__PURE__ */ $(rn, [["render", dn], ["__scopeId", "data-v-0c3b67a5"]]), mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pn
}, Symbol.toStringTag, { value: "Module" })), fn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, hn = { key: 1 };
function _n(e, t, o, s, n, l) {
  return r(), g("div", null, [
    (r(!0), g(x, null, E(o.items, (i, a) => (r(), p(q(o.compName), _({ key: a }, i), {
      default: u(() => [
        i.slot || e.$attrs.slot ? y(e.$slots, "default", {
          key: 0,
          item: i
        }) : (r(), g("span", hn, C(i.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const bn = /* @__PURE__ */ $(fn, [["render", _n]]), gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bn
}, Symbol.toStringTag, { value: "Module" })), yn = {
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
function vn(e, t, o, s, n, l) {
  const i = d("van-icon"), a = d("van-pagination");
  return r(), p(a, _({ ...e.$attrs, ...e.mobilePagination || {} }, {
    modelValue: o.query.page,
    "onUpdate:modelValue": t[0] || (t[0] = (c) => o.query.page = c),
    "items-per-page": o.query.limit,
    "page-count": l.pageCount,
    "total-items": o.total
  }), {
    "prev-text": u(() => [
      m(i, { name: "arrow-left" })
    ]),
    "next-text": u(() => [
      m(i, { name: "arrow" })
    ]),
    page: u(({ text: c }) => [
      k(C(c), 1)
    ]),
    _: 1
  }, 16, ["modelValue", "items-per-page", "page-count", "total-items"]);
}
const Sn = /* @__PURE__ */ $(yn, [["render", vn]]), $n = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sn
}, Symbol.toStringTag, { value: "Module" })), kn = {
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
function wn(e, t, o, s, n, l) {
  const i = d("el-pagination");
  return r(), p(i, _({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": o.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => o.query.page = a),
    "page-size": o.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => o.query.limit = a),
    "page-count": l.pageCount,
    total: o.total
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const Cn = /* @__PURE__ */ $(kn, [["render", wn]]), On = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cn
}, Symbol.toStringTag, { value: "Module" })), Vn = {
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
function jn(e, t, o, s, n, l) {
  const i = d("van-picker"), a = d("van-popup");
  return r(), g(x, null, [
    V("span", {
      onClick: t[0] || (t[0] = (c) => e.$emit("show")),
      class: F(`x-picker__${o.modelValue ? "value" : "placeholder"}`)
    }, C(o.modelValue || o.placeholder), 3),
    m(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: l.visible,
      "onUpdate:show": t[2] || (t[2] = (c) => l.visible = c)
    }), {
      default: u(() => [
        m(i, _(e.$attrs, {
          title: e.$attrs.title,
          columns: o.columns,
          onCancel: t[1] || (t[1] = (c) => e.$emit("cancel")),
          onConfirm: l.onConfirm
        }), null, 16, ["title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const xn = /* @__PURE__ */ $(Vn, [["render", jn]]), En = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xn
}, Symbol.toStringTag, { value: "Module" })), An = {
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
    formatOptions: P
  }
};
function Tn(e, t, o, s, n, l) {
  const i = d("van-radio"), a = d("van-radio-group");
  return r(), p(a, _({ class: "mobile-x-radios" }, e.$attrs, { direction: o.direction }), {
    default: u(() => [
      (r(!0), g(x, null, E(l.formatOptions(o.options, this), (c) => (r(), p(i, _(e.$attrs, {
        key: c[o.text],
        name: c[o.value]
      }), {
        default: u(() => [
          k(C(c[o.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Mn = /* @__PURE__ */ $(An, [["render", Tn]]), Bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mn
}, Symbol.toStringTag, { value: "Module" })), Rn = {
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
        placeholder: o,
        ...s
      } = this.$attrs;
      return s;
    }
  },
  methods: {
    formatOptions: P
  }
};
function zn(e, t, o, s, n, l) {
  const i = d("el-radio-group");
  return r(), p(i, _({ class: "pc-x-radios" }, l.attrs, {
    modelValue: o.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a))
  }), {
    default: u(() => [
      (r(!0), g(x, null, E(l.formatOptions(o.options, this), (a) => (r(), p(q(o.button ? "el-radio-button" : "el-radio"), _(l.attrs, {
        key: a[o.text],
        label: a[o.value]
      }), {
        default: u(() => [
          k(C(a[o.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const In = /* @__PURE__ */ $(Rn, [["render", zn]]), Pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: In
}, Symbol.toStringTag, { value: "Module" })), Nn = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Dn = { key: 1 };
function Fn(e, t, o, s, n, l) {
  const i = d("MobileXCol"), a = d("van-row");
  return r(), p(a, { class: "mobile-x-row" }, {
    default: u(() => [
      (r(!0), g(x, null, E(o.cols, (c, f) => (r(), p(i, _(c, { key: f }), {
        default: u(() => [
          c.slot || e.$attrs.slot ? y(e.$slots, c.slot || e.$attrs.slot, {
            key: 0,
            col: c
          }) : (r(), g("span", Dn, C(c.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      o.cols.length === 0 ? y(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  });
}
const Xn = /* @__PURE__ */ $(Nn, [["render", Fn]]), Un = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" })), qn = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Ln = { key: 1 };
function Wn(e, t, o, s, n, l) {
  const i = d("pc-x-col"), a = d("el-row");
  return r(), p(a, { class: "pc-x-row" }, {
    default: u(() => [
      (r(!0), g(x, null, E(o.cols, (c, f) => (r(), p(i, _(c, { key: f }), {
        default: u(() => [
          c.slot || e.$attrs.slot ? y(e.$slots, c.slot || e.$attrs.slot, {
            key: 0,
            col: c
          }) : (r(), g("span", Ln, C(c.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      o.cols.length === 0 ? y(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  });
}
const Hn = /* @__PURE__ */ $(qn, [["render", Wn]]), Jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hn
}, Symbol.toStringTag, { value: "Module" })), Ae = async (e, t, o) => {
  o.loading = !0;
  const s = t == null ? void 0 : t.trim(), { text: n = "text", value: l = "value", labelTexts: i, params: a = {} } = o;
  a.attributes = [...new Set(a.attributes || [...i || [], n, l])], a.limit = a.limit || 20, s && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${s}%`);
  const c = await e.search(o.modelName, a);
  o.options.splice(0, o.options.length, ...c.data), o.loading = !1;
}, Kn = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((s) => e[s])[0], Yn = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((s) => e[s]).slice(1).join(" - ") + ")", Zn = {
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
        this._options = P(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: P,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Ae(this.$api.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Gn(e, t, o, s, n, l) {
  const i = d("XPicker");
  return r(), g("div", {
    onClick: t[5] || (t[5] = (...a) => l.onClick && l.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(i, _(e.$attrs, {
      modelValue: l.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: n.visible,
      columns: n._options,
      onClick: t[1] || (t[1] = H(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => n.visible = !0),
      onCancel: t[3] || (t[3] = (a) => n.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => n.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const Qn = /* @__PURE__ */ $(Zn, [["render", Gn]]), el = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qn
}, Symbol.toStringTag, { value: "Module" }));
const tl = {
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
        this._options = P(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: P,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ae(this.$api.restful, e, this);
    },
    calcMainLabel(e) {
      return Kn(e, this);
    },
    calcRemarkLabel(e) {
      return Yn(e, this);
    }
  }
}, ol = { key: 1 }, nl = { class: "main" }, ll = { class: "remark" };
function sl(e, t, o, s, n, l) {
  const i = d("el-option"), a = d("el-select");
  return r(), p(a, _({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: o.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || l.remoteSearch
  }), {
    default: u(() => [
      (r(!0), g(x, null, E(n._options, (c) => (r(), p(i, _(e.$attrs, {
        key: c[o.text],
        label: c[o.text],
        value: c[o.value]
      }), {
        default: u(() => [
          e.$slots.default ? y(e.$slots, "default", { key: 0 }, void 0, !0) : (r(), g("span", ol, [
            V("span", nl, C(l.calcMainLabel(c)), 1),
            V("span", ll, C(l.calcRemarkLabel(c)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const il = /* @__PURE__ */ $(tl, [["render", sl], ["__scopeId", "data-v-0baced1c"]]), al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: il
}, Symbol.toStringTag, { value: "Module" }));
const rl = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...T.props(),
    mode: String,
    platform: String,
    "max-height": String,
    height: String,
    slotRenderers: Object
  },
  emits: [
    ...T.emits()
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
    ...T.computed,
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
        e.forEach((o, s) => {
          o && t.push(this._data[s]);
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
    ...T.methods,
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
}, cl = { class: "mobile-x-table" }, ul = {
  key: 1,
  class: "mobile-x-table card"
}, dl = ["onClick"], pl = ["value", "checked"], ml = { class: "label" }, fl = { class: "value" }, hl = { class: "operates" }, _l = ["value", "checked"], bl = {
  key: 2,
  class: "index"
}, gl = { class: "title" }, yl = { class: "operates" };
function vl(e, t, o, s, n, l) {
  const i = d("x-table-tools"), a = d("van-checkbox"), c = d("van-button"), f = d("XCol"), h = d("XRow"), w = d("van-swipe-cell"), S = d("van-cell"), M = d("van-list"), B = d("x-pagination"), L = d("XInfo"), R = d("van-popup");
  return r(), g("div", cl, [
    e.hideTools !== "" && e.hideTools !== !0 ? (r(), p(i, _({ key: 0 }, e._attrs, {
      domids: e.domids,
      onAdd: e._onAdd,
      onSearch: e._onSearch,
      onExport: e._onExport,
      onSearchExport: e._onSearchExport,
      onImport: e._onImport,
      onMultiDelete: e._onMultiDelete
    }), D({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: u(() => [
          y(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: u(() => [
          y(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : b("", !0),
    (o.mode || e._attrs.mode) === "card" ? (r(), g("div", ul, [
      (r(!0), g(x, null, E(e._data, (v, j) => (r(), g("div", {
        key: j,
        class: "row",
        onClick: (O) => l.handleClickCard(j)
      }, [
        m(w, {
          onOpen: (O) => n.scope = { row: v, $index: j }
        }, {
          right: u(() => [
            V("div", hl, [
              y(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
              e.hideOperates ? b("", !0) : (r(), p(h, {
                key: 0,
                gutter: 10
              }, {
                default: u(() => [
                  m(f, { span: 12 }, {
                    default: u(() => [
                      e.canEdit(n.scope) ? (r(), p(c, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, { onClick: l.handleEdit }), {
                        default: u(() => [
                          k(" 编辑 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : b("", !0)
                    ]),
                    _: 1
                  }),
                  m(f, { span: 12 }, {
                    default: u(() => [
                      e.canDelete(n.scope) ? (r(), p(c, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"] }, { onClick: l.handleDelete }), {
                        default: u(() => [
                          k(" 删除 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : b("", !0)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })),
              y(e.$slots, "operates-suffix", { scope: n.scope }, void 0, !0)
            ])
          ]),
          default: u(() => [
            l.hasSelection ? (r(), p(a, {
              key: 0,
              modelValue: n.selected[j],
              "onUpdate:modelValue": (O) => n.selected[j] = O,
              shape: "square",
              class: "selection",
              onClick: t[0] || (t[0] = H(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : b("", !0),
            l.hasRadio ? (r(), g("input", {
              key: 1,
              type: "radio",
              value: j,
              checked: j === n.checked,
              class: "radio",
              onClick: t[1] || (t[1] = H(() => {
              }, ["stop"])),
              onChange: t[2] || (t[2] = (...O) => e.handleCheckedChange && e.handleCheckedChange(...O))
            }, null, 40, pl)) : b("", !0),
            (r(!0), g(x, null, E(l.cols, (O, W) => (r(), g("div", {
              key: W,
              class: "field"
            }, [
              V("span", ml, C(O.label) + ":", 1),
              V("span", fl, C(e.calcValue(v, O)), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1032, ["onOpen"])
      ], 8, dl))), 128))
    ])) : (o.mode || e._attrs.mode) === "list" ? (r(), p(M, _({
      key: 2,
      class: "mobile-x-table list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (v) => e.$emit("search"))
    }), {
      default: u(() => [
        (r(!0), g(x, null, E(e._data, (v, j) => (r(), p(S, {
          key: j,
          "is-link": "",
          onClick: (O) => l.handleShowDetail(v, j)
        }, {
          default: u(() => [
            l.hasSelection ? (r(), p(a, {
              key: 0,
              modelValue: n.selected[j],
              "onUpdate:modelValue": (O) => n.selected[j] = O,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = H(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : b("", !0),
            l.hasRadio ? (r(), g("input", {
              key: 1,
              type: "radio",
              value: j,
              checked: j === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = H(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...O) => e.handleCheckedChange && e.handleCheckedChange(...O))
            }, null, 40, _l)) : b("", !0),
            l.hasIndex ? (r(), g("span", bl, C(j + 1), 1)) : b("", !0),
            V("span", gl, C(l.calcTitle(v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : b("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p(B, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (v) => e._emit("search"))
    }, null, 8, ["query", "total"])) : b("", !0),
    m(R, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (v) => n.popupVisible = v),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: u(() => [
        m(L, {
          data: n.scope.row,
          fields: l.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"]),
        V("div", yl, [
          y(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
          e.hideOperates ? b("", !0) : (r(), p(h, {
            key: 0,
            gutter: 10
          }, {
            default: u(() => [
              m(f, { span: 12 }, {
                default: u(() => [
                  e.canEdit(n.scope) ? (r(), p(c, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"], block: !0 }, { onClick: l.handleEdit }), {
                    default: u(() => [
                      k(" 编辑 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : b("", !0)
                ]),
                _: 1
              }),
              m(f, { span: 12 }, {
                default: u(() => [
                  e.canDelete(n.scope) ? (r(), p(c, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"], block: !0 }, { onClick: l.handleDelete }), {
                    default: u(() => [
                      k(" 删除 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : b("", !0)
                ]),
                _: 1
              })
            ]),
            _: 1
          })),
          y(e.$slots, "operates-suffix", { scope: n.scope }, void 0, !0)
        ])
      ]),
      _: 3
    }, 8, ["show"])
  ]);
}
const Sl = /* @__PURE__ */ $(rl, [["render", vl], ["__scopeId", "data-v-d230adfe"]]), $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sl
}, Symbol.toStringTag, { value: "Module" })), be = {
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
}, I = {
  XSelect: ["eq", "ne", "in", "notIn"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between"],
  ElInput: ["eq", "ne", "like", "notLike", "between"]
};
I["x-select"] = I.XSelect;
I["el-date-picker"] = I.ElDatePicker;
I["el-input-number"] = I.ElInputNumber;
I["el-input"] = I.ElInput;
function kl() {
  const {
    columns: e,
    visible: t,
    conditions: o,
    expression: s,
    handleSearch: n,
    handleReset: l,
    handleAdd: i,
    handleDelete: a,
    handleSelectField: c,
    handleSelectOp: f
  } = this;
  return m(d("pc-x-dialog"), _({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": "查询"
  }, {
    modelValue: t,
    "onUpdate:modelValue": (h) => this.visible = h,
    onCancel: l,
    onSubmit: n
  }), {
    default: () => [m(d("el-button"), {
      type: "primary",
      icon: "plus",
      onClick: i
    }, {
      default: () => [k("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [o.map((h, w) => m("div", {
      class: "condition flex-center",
      key: h.no
    }, [m(d("el-button"), {
      type: "danger",
      size: "small",
      plain: !0,
      onClick: () => a(w)
    }, {
      default: () => [k("X")]
    }), m("span", {
      class: "title"
    }, [h.no]), m("div", {
      class: "expression"
    }, [m(d("pc-x-select"), {
      modelValue: h.prop,
      onChange: (S) => c(h, S),
      options: e,
      text: "label",
      value: "prop"
    }, null), m(d("pc-x-select"), {
      modelValue: h.op,
      onChange: (S) => f(h, S),
      options: h.ops
    }, null), wl(this, h)])]))]), m(d("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式"
    }, {
      modelValue: s,
      "onUpdate:modelValue": (h) => this.expression = h
    }), null)]
  });
}
function wl(e, t) {
  const o = (n) => U(d(t.component), Object.assign({
    modelValue: t.value,
    "onUpdate:modelValue": (l) => t.value = l
  }, t.item, t.item.formAttrs, n)), s = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? m("div", {
    class: "col-2"
  }, [o({
    ...s,
    modelValue: t.value[0],
    "onUpdate:modelValue": (n) => t.value[0] = n
  }), o({
    ...s,
    modelValue: t.value[1],
    "onUpdate:modelValue": (n) => t.value[1] = n
  })]) : ["in", "notIn"].includes(t.op) ? (s.multiple = !0, o(s)) : o();
}
const { storage: Z } = StardustBrowser, Cl = {
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
  render: kl,
  methods: {
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      Z.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: o, component: s, ...n } = e;
          return n;
        }),
        expression: this.expression
      });
    },
    restoreCache() {
      var t, o;
      const e = Z.local.getJson(this.key, this.config);
      (t = e.conditions) == null || t.forEach((s) => {
        const { prop: n, op: l, value: i } = s;
        s.item = this.columns.find((a) => a.prop === n), this.handleSelectField(s, n), this.handleSelectOp(s, l), s.ops = I[s.component].map((a) => be[a]), s.value = i;
      }), !e.conditionNo && ((o = e.conditions) != null && o.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((s) => s.no)) + 1), Object.assign(this, e);
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
      Z.local.remove(this.key), Object.assign(this, {
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
      const t = (s, n) => {
        const l = [];
        n["[Op." + s.type + "]"] = l;
        for (let i of s.items)
          if (typeof i == "string") {
            const a = this.conditions.find((c) => c.no === i * 1);
            if (a) {
              if (!this.checkFilled(a))
                throw "条件不完整: " + i;
            } else
              throw "条件不存在: " + i;
            l.push(this.parseCondition(a));
          } else {
            const a = {};
            l.push(a), t(i, a);
          }
      }, o = {};
      return t(e, o), { where: o };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((n) => n.trim()), o = (n, l) => {
        for (; l.length; ) {
          const i = l.shift();
          if (["and", "or"].includes(i)) {
            if (n.type && n.type !== i)
              throw "串联不同逻辑表达式请使用小括号区分";
            n.type = i;
          } else if (i === "(") {
            const a = { type: "", items: [] };
            n.items.push(a), a._parent = n, o(a, l);
            break;
          } else
            i === ")" ? (o(n._parent, l), delete n._parent) : n.items.push(i);
        }
      }, s = { type: "", items: [] };
      return o(s, t), s.type = s.type || "and", s;
    },
    parseCondition(e) {
      let { prop: t, op: o, value: s } = e;
      const n = {};
      return (o === "like" || o === "notLike") && (s = "%" + s + "%"), n[t] = {
        [`[Op.${o}]`]: s
      }, n;
    },
    checkFilled(e) {
      if (!e.prop || !e.op)
        return !1;
      const t = Array.isArray(e.value) ? e.value : [e.value];
      return t.length && t.every((o) => typeof o != "string" || o.length);
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
      e.value = "", e.prop = t, e.item = this.columns.find((l) => l.prop === e.prop);
      const { options: o, type: s, formAttrs: n = {} } = e.item;
      e.component = n.comp || o && "XSelect" || s === "number" && "ElInputNumber" || "ElInput", e.ops = I[e.component].map((l) => be[l]), e.op = e.ops[0].value, n.comp === "ElDatePicker" && (e.component = "ElInput", e.item.formAttrs.type = "date");
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), !["between", "in", "notIn"].includes(t) && Array.isArray(t) && (e.value = "");
    }
  }
}, re = /* @__PURE__ */ $(Cl, [["__scopeId", "data-v-e9987bfb"]]), Ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: re
}, Symbol.toStringTag, { value: "Module" }));
const Vl = {
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
    handleMove(e, t, o) {
      const s = t + o;
      this.columns.splice(t, 1), this.columns.splice(s, 0, e), this.update();
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
          const { prop: t, label: o, show: s, hide: n, width: l } = e;
          return { prop: t, label: o, show: s, hide: n, width: l };
        })
      });
    }
  }
}, jl = (e) => (oe("data-v-16737013"), e = e(), ne(), e), xl = { class: "table" }, El = ["title", "onClick"], Al = /* @__PURE__ */ jl(() => /* @__PURE__ */ V("span", { class: "unit" }, "px", -1));
function Tl(e, t, o, s, n, l) {
  const i = d("el-button"), a = d("ElCheckbox"), c = d("el-input-number"), f = d("el-tab-pane"), h = d("el-tabs"), w = d("el-popover");
  return o.visible ? (r(), p(w, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: u(() => [
      m(i, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: u(() => [
      m(h, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (S) => n.activeName = S)
      }, {
        default: u(() => [
          m(f, {
            name: "columns",
            label: "展示列"
          }, {
            default: u(() => [
              m(i, {
                type: "warning",
                icon: "Close",
                onClick: l.handleResetColumns
              }, {
                default: u(() => [
                  k("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              V("div", xl, [
                (r(!0), g(x, null, E(n.columns, (S, M) => (r(), g("div", {
                  key: M,
                  class: "row flex-center"
                }, [
                  m(i, {
                    disabled: M === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: (B) => l.handleMove(S, M, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  m(i, {
                    disabled: M === n.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: (B) => l.handleMove(S, M, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  m(a, {
                    modelValue: S.show,
                    "onUpdate:modelValue": (B) => S.show = B,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  V("span", {
                    class: "label overflow-text",
                    title: S.label,
                    onClick: (B) => l.handleToggle(S)
                  }, C(S.label), 9, El),
                  m(c, {
                    modelValue: S.width,
                    "onUpdate:modelValue": (B) => S.width = B,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  Al
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
const ce = /* @__PURE__ */ $(Vl, [["render", Tl], ["__scopeId", "data-v-16737013"]]), Ml = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ce
}, Symbol.toStringTag, { value: "Module" }));
const Bl = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...T.props()
  },
  emits: [
    ...T.emits()
  ],
  components: { Searcher: re, Settings: ce },
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
    ...T.computed
  },
  watch: {
    ...T.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...T.methods
  }
}, Rl = { key: 1 }, zl = ["value", "checked"], Il = { key: 1 };
function Pl(e, t, o, s, n, l) {
  const i = d("searcher"), a = d("pc-x-icon"), c = d("settings"), f = d("pc-x-table-tools"), h = d("el-table-column"), w = d("el-button"), S = d("el-table"), M = d("x-pagination"), B = d("el-collapse-item"), L = d("el-collapse"), R = K("loading");
  return r(), g("div", {
    class: F(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    m(i, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    m(L, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (v) => n.activeNames = v),
      class: F((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: u(() => [
        m(B, {
          name: n.activeNames[0]
        }, {
          title: u(() => [
            e.$slots["collapse-title"] ? y(e.$slots, "collapse-title", { key: 0 }) : (r(), g("span", Rl, C(e.title), 1))
          ]),
          default: u(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (r(), p(f, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), D({
              "tools-end": u(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(c, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[0] || (t[0] = (v) => n.settings = v),
                  visible: !e.hideSettings,
                  width: e._attrs["cols-popover-width"] || 500,
                  onReset: e.handleResetSettings
                }, null, 8, ["modelValue", "visible", "width", "onReset"])
              ]),
              _: 2
            }, [
              e.$slots["tools-prefix"] ? {
                name: "tools-prefix",
                fn: u(() => [
                  y(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: u(() => [
                  y(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : b("", !0),
            A((r(), p(S, _({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: u(() => [
                (r(!0), g(x, null, E(e._visibleColumns, (v, j) => (r(), p(h, _(v, {
                  key: j,
                  "min-width": v.minWidth,
                  align: v.align || e._attrs.tableAlign || "center",
                  resizable: v.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(v)
                }), D({ _: 2 }, [
                  ["selection", "index"].includes(v.type) ? void 0 : {
                    name: "default",
                    fn: u((O) => [
                      v.type === "radio" ? (r(), g("input", {
                        key: 0,
                        type: "radio",
                        value: O.$index,
                        checked: O.$index === n.checked,
                        onChange: t[1] || (t[1] = (...W) => e.handleCheckedChange && e.handleCheckedChange(...W))
                      }, null, 40, zl)) : v.slot ? y(e.$slots, v.slot, {
                        key: 1,
                        scope: O,
                        column: v
                      }) : e.slotAll ? y(e.$slots, "all", {
                        key: 2,
                        scope: O,
                        column: v
                      }) : (r(), g(x, { key: 3 }, [
                        v.comp === "ElSwitch" || e.table.isRowEdit && O.row.isEditing && (v.visible !== !1 || v.canEdit) ? (r(), p(q(v.comp || "ElInput"), _({ key: 0 }, { ...v, ...v.formAttrs }, {
                          modelValue: O.row[v.prop],
                          "onUpdate:modelValue": (W) => O.row[v.prop] = W,
                          disabled: !O.row.editable || !O.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (r(), g("span", Il, C(e.calcValue(O.row, v)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? b("", !0) : (r(), p(h, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: u((v) => [
                    y(e.$slots, "operates-prefix", { scope: v }),
                    e.canEdit(v.row) ? (r(), p(w, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (j) => e._emit("edit", v)
                    }), {
                      default: u(() => [
                        m(a, { name: "edit" }),
                        k(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : b("", !0),
                    e.canSave(v.row) ? A((r(), p(w, _({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: v.row._loading,
                      onClick: (j) => e._emit("row-edit", v)
                    }), {
                      default: u(() => [
                        m(a, { name: "collection" }),
                        k(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [R, v.row._loading]
                    ]) : b("", !0),
                    e.canCancelEdit(v.row) ? (r(), p(w, _({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (j) => e._emit("cancel-edit", v)
                    }), {
                      default: u(() => [
                        m(a, { name: "refresh-left" }),
                        k(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : b("", !0),
                    e.canDelete(v.row) ? (r(), p(w, _({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (j) => e._emit("delete", v)
                    }), {
                      default: u(() => [
                        m(a, { name: "DeleteFilled" }),
                        k(" 删除 ")
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
              [R, e._loading]
            ]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p(M, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (v) => e._emit("search", n.params))
            }, null, 8, ["query", "total"])) : b("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Nl = /* @__PURE__ */ $(Bl, [["render", Pl]]), Dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nl
}, Symbol.toStringTag, { value: "Module" }));
const Fl = {
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
}, Xl = { class: "mobile-x-table-tools" }, Ul = { class: "tools" }, ql = { class: "tools-end" };
function Ll(e, t, o, s, n, l) {
  const i = d("mobile-x-icon"), a = d("van-button"), c = K("domid");
  return r(), g("div", Xl, [
    V("div", Ul, [
      y(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? A((r(), p(a, _({ key: 0 }, { type: "success", ...o.searchBtn }, {
        onClick: t[0] || (t[0] = (f) => e.$emit("search"))
      }), {
        default: u(() => [
          m(i, { name: "search" }),
          k(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [c, o.domids.search]
      ]) : b("", !0),
      e.$attrs.onAdd ? A((r(), p(a, _({ key: 1 }, { type: "primary", ...o.addBtn }, {
        onClick: t[1] || (t[1] = (f) => e.$emit("add"))
      }), {
        default: u(() => [
          m(i, { name: "circle-plus-filled" }),
          k(" 新增 ")
        ]),
        _: 1
      }, 16)), [
        [c, o.domids.add]
      ]) : b("", !0),
      e.$attrs.onMultiEdit ? A((r(), p(a, _({ key: 2 }, { type: "warning", ...o.multiEditBtn }, {
        onClick: t[2] || (t[2] = (f) => e.$emit("multi-edit"))
      }), {
        default: u(() => [
          m(i, { name: "edit" }),
          k(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [c, o.domids["multi-edit"]]
      ]) : b("", !0),
      e.$attrs.onMultiDelete ? A((r(), p(a, _({ key: 3 }, { type: "danger", ...o.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (f) => e.$emit("multi-delete"))
      }), {
        default: u(() => [
          m(i, { name: "DeleteFilled" }),
          k(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [c, o.domids["multi-delete"]]
      ]) : b("", !0),
      e.$attrs.onExport ? A((r(), p(a, _({ key: 4 }, { type: "success", ...o.exportBtn }, {
        onClick: t[4] || (t[4] = (f) => e.$emit("export"))
      }), {
        default: u(() => [
          m(i, { name: "printer" }),
          k(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [c, o.domids.export]
      ]) : b("", !0),
      e.$attrs.onSearchExport ? A((r(), p(a, _({ key: 5 }, { type: "success", ...o.exportBtn }, {
        onClick: t[5] || (t[5] = (f) => e.$emit("search-export"))
      }), {
        default: u(() => [
          m(i, { name: "printer" }),
          k(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [c, o.domids["search-export"]]
      ]) : b("", !0),
      e.$attrs.onImport ? A((r(), p(a, _({ key: 6 }, { type: "warning", ...o.importBtn }, {
        onClick: t[6] || (t[6] = (f) => e.$emit("import"))
      }), {
        default: u(() => [
          m(i, { name: "UploadFilled" }),
          k(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [c, o.domids.import]
      ]) : b("", !0),
      y(e.$slots, "tools-suffix", {}, void 0, !0),
      V("div", ql, [
        y(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const Wl = /* @__PURE__ */ $(Fl, [["render", Ll], ["__scopeId", "data-v-442404e2"]]), Hl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wl
}, Symbol.toStringTag, { value: "Module" }));
const Jl = {
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
}, Kl = { class: "tools" }, Yl = { class: "tools-end flex-center" };
function Zl(e, t, o, s, n, l) {
  const i = d("pc-x-icon"), a = d("el-button"), c = d("el-card"), f = K("domid");
  return r(), p(c, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: u(() => [
      V("div", Kl, [
        y(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? A((r(), p(a, _({ key: 0 }, { type: "success", ...o.searchBtn }, {
          onClick: t[0] || (t[0] = (h) => e.$emit("search"))
        }), {
          default: u(() => [
            m(i, { name: "search" }),
            k(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [f, o.domids.search]
        ]) : b("", !0),
        e.$attrs.onAdd ? A((r(), p(a, _({ key: 1 }, { type: "primary", ...o.addBtn }, {
          onClick: t[1] || (t[1] = (h) => e.$emit("add"))
        }), {
          default: u(() => [
            m(i, { name: "circle-plus-filled" }),
            k(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [f, o.domids.add]
        ]) : b("", !0),
        e.$attrs.onMultiEdit ? A((r(), p(a, _({ key: 2 }, { type: "warning", ...o.multiEditBtn }, {
          onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
        }), {
          default: u(() => [
            m(i, { name: "edit" }),
            k(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [f, o.domids["multi-edit"]]
        ]) : b("", !0),
        e.$attrs.onMultiDelete ? A((r(), p(a, _({ key: 3 }, { type: "danger", ...o.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
        }), {
          default: u(() => [
            m(i, { name: "DeleteFilled" }),
            k(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [f, o.domids["multi-delete"]]
        ]) : b("", !0),
        e.$attrs.onExport ? A((r(), p(a, _({ key: 4 }, { type: "success", ...o.exportBtn }, {
          onClick: t[4] || (t[4] = (h) => e.$emit("export"))
        }), {
          default: u(() => [
            m(i, { name: "printer" }),
            k(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [f, o.domids.export]
        ]) : b("", !0),
        e.$attrs.onSearchExport ? A((r(), p(a, _({ key: 5 }, { type: "success", ...o.exportBtn }, {
          onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
        }), {
          default: u(() => [
            m(i, { name: "printer" }),
            k(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [f, o.domids["search-export"]]
        ]) : b("", !0),
        e.$attrs.onImport ? A((r(), p(a, _({ key: 6 }, { type: "warning", ...o.importBtn }, {
          onClick: t[6] || (t[6] = (h) => e.$emit("import"))
        }), {
          default: u(() => [
            m(i, { name: "UploadFilled" }),
            k(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [f, o.domids.import]
        ]) : b("", !0),
        y(e.$slots, "tools-suffix", {}, void 0, !0),
        V("div", Yl, [
          y(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Gl = /* @__PURE__ */ $(Jl, [["render", Zl], ["__scopeId", "data-v-02d70f98"]]), Ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gl
}, Symbol.toStringTag, { value: "Module" }));
function es(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Se(e);
}
const ts = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, o = !t && e.selected.size > 0, s = (n) => {
    n ? e._data.forEach((i, a) => e.selected.add(a)) : e.selected.clear();
    const l = n ? e._data.slice() : [];
    e.handleSelectionChange(l);
  };
  return m(d("el-checkbox"), {
    modelValue: t,
    indeterminate: o,
    onChange: s
  }, null);
}, os = (e, t) => {
  const {
    rowIndex: o,
    rowData: s
  } = e, n = () => {
    t.selected.has(o) ? t.selected.delete(o) : t.selected.add(o);
    const l = [...t.selected].map((i) => t._data[i]);
    t.handleSelectionChange(l);
  };
  return m(d("el-checkbox"), {
    modelValue: t.selected.has(o),
    onChange: n
  }, null);
}, ns = (e, t) => {
  const {
    page: o,
    limit: s
  } = t._query;
  return (o - 1) * s + e.rowIndex + 1;
}, ls = (e, t) => {
  const {
    rowIndex: o
  } = e;
  return m("input", {
    type: "radio",
    value: o,
    checked: o === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, Y = ([e, t, o, s, n, l]) => {
  const {
    rowIndex: i,
    rowData: a
  } = e, c = () => {
    t._emit(o, {
      $index: i,
      row: a
    });
  };
  return m(d("el-button"), _({
    type: s
  }, t._attrs[o + "-btn"], {
    onClick: c
  }), {
    default: () => [m(d("x-icon"), {
      name: n
    }, null), l]
  });
}, ss = (e, t) => {
  if (t.canEdit(e.rowData))
    return Y([e, t, "edit", "warning", "edit", "编辑"]);
}, is = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return Y([e, t, "row-edit", "success", "collection", "保存"]);
}, as = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return Y([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, rs = (e, t) => {
  if (t.canDelete(e.rowData))
    return Y([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, cs = (e, t) => {
  const {
    _attrs: o,
    $slots: s
  } = t, {
    slotRenderers: n = {}
  } = o;
  if (e.type === "selection")
    return (l) => os(l, t);
  if (e.type === "index")
    return (l) => ns(l, t);
  if (e.type === "radio")
    return (l) => ls(l, t);
  if (e.slot) {
    if (n[e.slot])
      return n[e.slot];
    if (s[e.slot])
      return (l) => s[e.slot]({
        scope: {
          $index: l.rowIndex,
          row: l.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (l) => s.all({
      scope: {
        $index: l.rowIndex,
        row: l.rowData
      },
      column: e
    });
  return (l) => {
    const {
      rowData: i,
      column: a
    } = l;
    if (a.comp === "ElSwitch" || t.table.isRowEdit && i.isEditing && (a.visible !== !1 || a.canEdit)) {
      const h = (S) => {
        i[a.prop] = S;
      }, w = a.comp || "ElInput";
      return U(d(w), {
        ...a,
        ...a.formAttrs,
        modelValue: i[a.prop],
        onInput: h,
        disabled: !i.editable || !i.isEditing
      });
    }
    const c = t.calcValue(l.rowData, e), {
      showOverflowTooltip: f
    } = a.tableAttrs || {};
    return f ? m(d("el-tooltip"), {
      content: c
    }, es(c) ? c : {
      default: () => [c]
    }) : c;
  };
}, us = (e, t) => {
  const {
    _attrs: o,
    $slots: s
  } = t, n = e.map((l, i) => {
    const {
      tableAttrs: a = {}
    } = l, c = {
      ...l,
      key: i,
      dataKey: l.prop,
      title: l.label,
      width: l.width || a.width || l.minWidth || a.minWidth || l.maxWidth || a.maxWidth,
      align: l.align || o.tableAlign || "center"
    };
    return c.type === "selection" && (c.width = c.width || 46, c.headerCellRenderer = ts(t)), c.cellRenderer = cs(c, t), c;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: o.operatesAlign || o.tableAlign || "center",
    fixed: o.operatesFixed || "right",
    cellRenderer(l) {
      return m("div", {
        class: "operates"
      }, [s["operates-prefix"] ? s["operates-prefix"]() : null, ss(l, t), is(l, t), as(l, t), rs(l, t), s["operates-suffix"] ? s["operates-suffix"]() : null]);
    }
  }), n;
}, ds = {
  convertColumnsForTableV2: us
};
const ps = {
  name: "XTableV2",
  props: {
    ...T.props(),
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
    ...T.emits()
  ],
  components: { Searcher: re, Settings: ce },
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
    ...T.computed
  },
  watch: {
    ...T.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...T.methods,
    convertColumnsForTableV2: ds.convertColumnsForTableV2
  }
}, ms = { key: 1 };
function fs(e, t, o, s, n, l) {
  const i = d("Searcher"), a = d("x-icon"), c = d("Settings"), f = d("x-table-tools"), h = d("el-table-v2"), w = d("el-auto-resizer"), S = d("x-pagination"), M = d("el-collapse-item"), B = d("el-collapse"), L = K("loading");
  return r(), g("div", {
    class: F(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    m(i, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (R) => e._emit("search", R))
    }, null, 8, ["uid", "columns", "config"]),
    m(B, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (R) => n.activeNames = R),
      class: F((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: u(() => [
        m(M, {
          name: n.activeNames[0]
        }, {
          title: u(() => [
            e.$slots["collapse-title"] ? y(e.$slots, "collapse-title", { key: 0 }) : (r(), g("span", ms, C(e.title), 1))
          ]),
          default: u(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (r(), p(f, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), D({
              "tools-end": u(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(c, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (R) => n.settings = R),
                  visible: !e.hideSettings,
                  width: e._attrs["cols-popover-width"] || 500,
                  onReset: e.handleResetSettings
                }, null, 8, ["modelValue", "visible", "width", "onReset"])
              ]),
              _: 2
            }, [
              e.$slots["tools-prefix"] ? {
                name: "tools-prefix",
                fn: u(() => [
                  y(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: u(() => [
                  y(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : b("", !0),
            m(w, {
              style: Be({ height: o.height })
            }, {
              default: u(({ width: R, height: v }) => [
                A((r(), p(h, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: l.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: o.fixed,
                  width: R,
                  height: v
                }), D({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: u(() => [
                      y(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: u(() => [
                      y(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: u(() => [
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
            e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p(S, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (R) => e._emit("search"))
            }, null, 8, ["query", "total"])) : b("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const hs = /* @__PURE__ */ $(ps, [["render", fs]]), _s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hs
}, Symbol.toStringTag, { value: "Module" }));
const G = ["selection", "radio"], bs = {
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
      G.includes(t) && (e.columns.find((o) => o.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((o) => o.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((o) => this.selectMode === o.type || !G.includes(o.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (G.includes(t)) {
        let o = null;
        if (t === "selection" ? o = e.selection : t === "radio" && (o = e.checked), t === "selection" && !o.length || !o) {
          this.$message({ type: "warning", message: "未选择数据" }), this.handleCancel();
          return;
        }
        this.$emit("select", o), this.clearSelected();
      }
      this.handleCancel();
    },
    handleCancel() {
      this.$emit("update:visible", !1);
    },
    handleBeforeClose(e) {
      return e === "cancel" ? !0 : new Promise((t) => {
        const o = () => {
          this.handleCancel(), t(!0);
        };
        this._dialogAttrs["before-close"] ? this._dialogAttrs["before-close"](o) : o();
      });
    },
    clearSelected() {
      this.table.selection = [], this.table.checked = null, this.table.tableRef.clearSelection(), this.table.tableRef.$el.querySelectorAll('input[type="radio"]').forEach((t) => t.checked = !1);
    }
  }
}, gs = { class: "x-table-viewer" };
function ys(e, t, o, s, n, l) {
  const i = d("x-dialog");
  return r(), g("div", gs, [
    m(i, _(l._dialogAttrs, {
      modelValue: o.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: o.title,
      "before-close": l.handleBeforeClose,
      onSubmit: l.handleSubmit,
      onCancel: l.handleCancel
    }), {
      default: u(() => [
        (r(), p(q(o.useTableV2 ? "x-table-v2" : "x-table"), _({
          tref: l.table.tableRef,
          "onUpdate:tref": t[0] || (t[0] = (a) => l.table.tableRef = a),
          table: l.table
        }, l._tableAttrs, {
          onSearch: o.controller.handleSearch
        }), null, 16, ["tref", "table", "onSearch"]))
      ]),
      _: 1
    }, 16, ["modelValue", "title", "before-close", "onSubmit", "onCancel"])
  ]);
}
const vs = /* @__PURE__ */ $(bs, [["render", ys], ["__scopeId", "data-v-f5d31400"]]), Ss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vs
}, Symbol.toStringTag, { value: "Module" })), $s = {
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
}, ks = { class: "x-tinymce" }, ws = ["id", "innerHTML"];
function Cs(e, t, o, s, n, l) {
  return r(), g("div", ks, [
    V("textarea", {
      id: n.id,
      innerHTML: o.modelValue
    }, null, 8, ws)
  ]);
}
const Os = /* @__PURE__ */ $($s, [["render", Cs]]), Vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Os
}, Symbol.toStringTag, { value: "Module" }));
const js = {
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
    onSuccess(e, t, o) {
      const s = this.$api.API_BASE_URL + "/" + e.filename;
      this.$emit("update:modelValue", s);
    }
  }
}, xs = (e) => (oe("data-v-e756c8fc"), e = e(), ne(), e), Es = { class: "mask" }, As = /* @__PURE__ */ xs(() => /* @__PURE__ */ V("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ k(" 将文件拖到此处，或"),
  /* @__PURE__ */ V("em", null, "点击上传")
], -1)), Ts = {
  key: 0,
  class: "path"
};
function Ms(e, t, o, s, n, l) {
  const i = d("x-icon"), a = d("el-upload");
  return r(), p(a, {
    drag: "",
    "show-file-list": !1,
    action: n.action,
    accept: o.accept,
    multiple: o.multiple,
    "on-success": l.onSuccess,
    class: "x-file-uploader"
  }, {
    default: u(() => [
      V("div", Es, [
        m(i, { name: "upload-filled" }),
        As
      ]),
      l.filepath ? (r(), g("div", Ts, C(o.modelValue), 1)) : b("", !0)
    ]),
    _: 1
  }, 8, ["action", "accept", "multiple", "on-success"]);
}
const Bs = /* @__PURE__ */ $(js, [["render", Ms], ["__scopeId", "data-v-e756c8fc"]]), Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bs
}, Symbol.toStringTag, { value: "Module" }));
const zs = {
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
    onSuccess(e, t, o) {
      const s = this.$api.API_BASE_URL + "/" + e.filename;
      this.$emit("update:modelValue", s);
    }
  }
}, Is = (e) => (oe("data-v-c8f36d63"), e = e(), ne(), e), Ps = { class: "mask" }, Ns = /* @__PURE__ */ Is(() => /* @__PURE__ */ V("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ k(" 将图片拖到此处，或"),
  /* @__PURE__ */ V("em", null, "点击上传")
], -1));
function Ds(e, t, o, s, n, l) {
  const i = d("el-image"), a = d("x-icon"), c = d("el-upload");
  return r(), p(c, {
    drag: "",
    "show-file-list": !1,
    action: n.action,
    accept: "image/*",
    multiple: o.multiple,
    "on-success": l.onSuccess,
    class: "x-image-uploader"
  }, {
    default: u(() => [
      l.image ? (r(), p(i, {
        key: 0,
        src: l.image,
        alt: "upload-image",
        fit: "cover"
      }, null, 8, ["src"])) : b("", !0),
      V("div", Ps, [
        m(a, { name: "upload-filled" }),
        Ns
      ])
    ]),
    _: 1
  }, 8, ["action", "multiple", "on-success"]);
}
const Fs = /* @__PURE__ */ $(zs, [["render", Ds], ["__scopeId", "data-v-c8f36d63"]]), Xs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fs
}, Symbol.toStringTag, { value: "Module" }));
const ge = /* @__PURE__ */ Object.assign({ "./components/xactionsheet/xactionsheet.vue": Pe, "./components/xautorows/xautorows.vue": qe, "./components/xbutton/mobile.vue": Je, "./components/xbutton/pc.vue": Ge, "./components/xchart/xchart.vue": nt, "./components/xcheckboxs/mobile.vue": ut, "./components/xcheckboxs/pc.vue": ft, "./components/xcol/mobile.vue": gt, "./components/xcol/pc.vue": $t, "./components/xdialog/mobile.vue": Ot, "./components/xdialog/pc.vue": At, "./components/xdistrictselect/xdistrictselect.vue": Rt, "./components/xform/mobile.vue": Wt, "./components/xform/pc.vue": Zt, "./components/xformitem/mobile.vue": to, "./components/xformitem/pc.vue": no, "./components/xicon/mobile.vue": ro, "./components/xicon/pc.vue": fo, "./components/xinfo/xinfo.vue": mn, "./components/xlooper/xlooper.vue": gn, "./components/xpagination/mobile.vue": $n, "./components/xpagination/pc.vue": On, "./components/xpicker/xpicker.vue": En, "./components/xradios/mobile.vue": Bn, "./components/xradios/pc.vue": Pn, "./components/xrow/mobile.vue": Un, "./components/xrow/pc.vue": Jn, "./components/xselect/mobile.vue": el, "./components/xselect/pc.vue": al, "./components/xtable/mobile.vue": $l, "./components/xtable/pc.vue": Dl, "./components/xtable/searcher.vue": Ol, "./components/xtable/settings.vue": Ml, "./components/xtabletools/mobile.vue": Hl, "./components/xtabletools/pc.vue": Ql, "./components/xtablev2/xtablev2.vue": _s, "./components/xtableviewer/xtableviewer.vue": Ss, "./components/xtinymce/xtinymce.vue": Vs, "./components/xuploader/xfileuploader.vue": Rs, "./components/xuploader/ximageuploader.vue": Xs }), Us = (e) => ({
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
    return U(d(this.name), {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), te = (() => {
  const e = {};
  for (const n in ge) {
    const l = ge[n].default;
    /X[A-Z][a-z]/.test(l.name) && (e[l.name] = l);
  }
  const t = Object.keys(e), o = [...new Set(t.map((n) => n.replace(/(pc|mobile)/i, "")))], s = {};
  for (const n of t)
    /(pc|mobile)/i.test(n) && (s[n] = e[n]);
  for (const n of o)
    t.find((l) => /(pc|mobile)/i.test(l) && l.toLowerCase().includes(n.toLowerCase())) ? s[n] = Us(n) : s[n] = e[n];
  return s;
})(), qs = (e, t) => {
  for (let o in te)
    e.component(o, te[o]);
}, Ws = {
  ...te,
  ...it,
  install: qs
};
export {
  Ws as default,
  it as utils
};
