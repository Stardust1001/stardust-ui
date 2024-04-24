import { toRaw as yt, markRaw as se, nextTick as oe, watch as Ee, resolveComponent as u, openBlock as d, createElementBlock as w, Fragment as P, renderList as M, createBlock as f, mergeProps as b, withCtx as c, renderSlot as V, toDisplayString as A, useCssVars as Ae, resolveDirective as ne, withDirectives as R, createElementVNode as j, createTextVNode as x, createVNode as p, createCommentVNode as k, vShow as Ue, pushScopeId as Oe, popScopeId as je, resolveDynamicComponent as Q, createSlots as ae, withModifiers as G, normalizeClass as J, normalizeProps as Te, h as Z, isVNode as st, withKeys as Fe, normalizeStyle as wt } from "vue";
const vt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class i {
    constructor(E, D, q, B, ee, fe, v) {
      this.x = E, this.y = D, this.radius = q, this.color = B, this.vx = ee, this.vy = fe, this.ctx = v;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const n = () => l.clearRect(0, 0, t, s), o = (I) => Math.floor(Math.random() * I);
  let a = 0, r = 0.01, h = 0;
  const m = () => {
    const I = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = _ * 30), a >= 1 && (a = 1, r = -r, h = _ * 30)), I.addColorStop(0, "rgba(250, 220, 20, 0.5)"), I.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = I, l.fillRect(0, 0, t, s);
  }, S = Math.floor(t / 100), y = Math.floor(s / 100), _ = 20, $ = Math.round(1e3 / _), T = Array.from({ length: 52 }).map(() => {
    const I = Math.floor(o(S + y) * 1.5 + o(5));
    let E = o(t), D = o(s);
    E = Math.min(Math.max(I, E), t - I), D = Math.min(Math.max(I, D), s - I);
    let q = o(2) ? (o(2) + 2) * S : (o(-1) - 2) * S, B = o(2) ? (o(2) + 2) * y : (o(-1) - 2) * y;
    return q = Math.floor(q / _), B = Math.floor(B / _), new i(
      E,
      D,
      I,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      q,
      B,
      l
    );
  });
  let g, C;
  e.addEventListener("mouseover", (I) => {
    g = I.pageX, C = I.pageY;
  }), e.addEventListener("mousemove", (I) => {
    if (g === void 0) {
      g = I.pageX, C = I.pageY;
      return;
    }
    const E = I.pageX - g, D = I.pageY - C;
    T.forEach((q) => {
      q.x += E / _, q.y += D / _;
    }), g = I.pageX, C = I.pageY;
  });
  let F = Date.now(), z = null;
  const H = () => {
    Date.now() - F >= $ && (n(), m(), T.forEach((I) => I.update()), F = Date.now()), z = requestAnimationFrame(H);
  };
  return z = requestAnimationFrame(H), () => cancelAnimationFrame(z);
}, St = ({
  text: e,
  gap: t,
  fontSize: s,
  color: l,
  width: i = window.innerWidth,
  height: n = window.innerHeight,
  drawMode: o = "fill"
}) => {
  const a = document.createElement("canvas");
  a.width = i, a.height = n;
  const r = a.getContext("2d");
  r.font = `${s}px Arial`, r[o + "Style"] = l;
  const m = r.measureText(e).width + t, S = s + t;
  for (let y = t / 2; y < n; y += S)
    for (let _ = t / 2; _ < i; _ += m)
      r[o + "Text"](e, _, y);
  return a;
}, kt = {
  pop: vt,
  createWatermark: St
}, nt = async (e) => {
  var l, i;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((i = e.formItems) == null ? void 0 : i.filter((n) => {
    var o, a;
    return ((o = n.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = n.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((n) => nt(n.form)));
  return t && s.every((n) => n);
}, Ct = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, W = (e, t) => {
  const s = e.__v_isRef ? e.value : yt(e), { text: l = "text", value: i = "value" } = t, n = s.map((a) => typeof a == "object" ? { text: a[l], value: a[i], disabled: a.disabled, raw: se(a) } : { text: a, value: a });
  if (!t.sort)
    return n;
  const o = typeof t.sort == "string" ? t.sort : t.text || "text";
  return n.sort((a, r) => a[o].localeCompare(r[o]));
}, { ElMessage: $t, ElNotification: xt, ElMessageBox: Vt } = window.ElementPlus || {}, { showToast: Et, showNotify: At, showConfirmDialog: Ot } = window.vant || {}, N = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? ((l === "error" || l === "warning") && (t.type = "fail"), t["z-index"] || (t["z-index"] = 1e6), Et(t)) : $t({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, ue = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? (l === "error" && (t.type = "danger"), At(t)) : xt({
    showClose: !0,
    ...t
  });
}, ie = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = Ot(e) : t = Vt.confirm(
    e.message || "",
    e.title || "",
    {
      draggable: !0,
      ...e,
      type: e.type || "info",
      confirmButtonText: e.confirmButtonText || "确定",
      cancelButtonText: e.cancelButtonText || "取消"
    }
  ), t.then(() => e.distinguishCancelAndClose ? "confirm" : !0).catch((l) => e.distinguishCancelAndClose ? l : !1);
};
for (let e of ["success", "warning", "info", "error", "primary", "loading", "fail", "html"])
  N[e] = N[e[0]] = (t) => N({ type: e, ...typeof t != "string" ? t : { message: t } }), ue[e] = ue[e[0]] = (t) => ue({ type: e, ...typeof t != "string" ? t : { message: t } }), ie[e] = ie[e[0]] = (t) => ie({ type: e, ...t });
const jt = (e, t, s) => {
  e.beforeEach((l, i, n) => {
    l.matched.length ? n() : n("/404");
  });
}, Tt = (e, t, s) => {
  e.afterEach((l, i) => {
    var n;
    document.title = ((n = l.matched[l.matched.length - 1].meta) == null ? void 0 : n.title) || t.app.sitename;
  });
}, Ft = (e, t, s) => {
  e.beforeEach((l, i, n) => {
    var a;
    const o = l.matched[l.matched.length - 1].path.split("/:")[0];
    return l.meta.acl === !1 || (a = l.meta) != null && a.visitable || t.acl.paths.includes(o) ? n() : (t.getters.logined && N.e("无权访问页面: " + l.path), n(t.acl.paths[0] || "/404?redirectTo=" + (l.query.redirectTo || l.path)));
  }), oe(() => {
    let l = !1;
    Ee(() => t.acl.menus, (i) => {
      if (!l) {
        if (!i.length)
          return;
        l = !0;
      }
      const n = t.acl.paths, o = (a, r) => {
        var m, S, y, _, $, T, g;
        const h = [...r, a].reduce((C, F) => C + "/" + F.path, "").replace("//", "/");
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (m = a.children) == null || m.forEach((C) => {
          var F;
          C.meta || (C.meta = {}), (F = C.meta).acl || (F.acl = !1), o(C, [...r, a]);
        }) : (a.meta._hidden = a.meta.hidden, parent && (a.meta.hidden == null && ((y = a.meta).hidden ?? (y.hidden = (S = parent.meta) == null ? void 0 : S.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && (($ = a.meta).visitable ?? ($.visitable = (_ = parent.meta) == null ? void 0 : _.visitable), a.meta = { ...a.meta })), (T = a.children) == null || T.forEach((C) => o(C, [...r, a])), a.meta.hidden !== !1 && a.meta._hidden !== !0 && (a.meta.hidden = !n.includes(h), (g = a.children) != null && g.some((C) => C.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach((a) => o(a, []));
    }, { immediate: !0 });
  });
}, Dt = (e, t, s) => {
  e.beforeEach((l, i, n) => {
    l.name === "Login" && t.getters.logined && l.query.redirectTo ? n(l.query.redirectTo) : n();
  });
}, It = {
  check404: jt,
  setTitle: Tt,
  checkRolesPages: Ft,
  redirectTo: Dt
}, it = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), lt = (e = {}) => ({
  loading: !1,
  query: {
    page: 1,
    limit: 10,
    order: [],
    ...e
  },
  total: 0,
  moreLoading: !1,
  finished: !1,
  isInfinite: !1,
  list: [],
  columns: [],
  tableRef: null,
  selection: [],
  checked: null,
  searchFields: [],
  _isBaseTable: !0
}), he = () => ({
  ...it(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), Rt = ({
  table: e = {},
  dialog: t = {},
  columns: s = [
    { fixed: "left", type: "selection" },
    { type: "_index" }
  ],
  query: l = {},
  form: i = {}
} = {}) => ({
  table: {
    ...lt(l),
    ...e,
    columns: s
  },
  dialog: {
    ...he(),
    ...t,
    form: i
  }
}), { funcs: ke } = StardustJs, Pt = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let l of s)
    l.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[l.slice(3)] = t[l], delete t[l]) : l.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[l.slice(3)] = t[l], delete t[l]);
  return t;
}), Bt = (e, t) => {
  for (let s in e) {
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && at(l, t), s === "dialog" && e[s]._isBaseDialog && ot(l, t), s === "form" && e[s]._isBaseForm && De(l, t));
  }
  return e;
}, at = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), ot = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), De(e, t), e), De = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), dt(e.form, e.formItems), e.initialForm = ke.deepCopy(e.form), e.initialFormRules = ke.deepCopy(e.formRules), Ee(() => e.formItems, () => {
  rt(e);
}, { immediate: !0, deep: !0 }), e), rt = (e) => {
  const { formItems: t, initialFormRules: s } = e, l = t.filter((n) => {
    let { formAttrs: o = {}, required: a = !1 } = n;
    return a = "required" in o ? o.required : a, !n.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(n.prop) && a !== !1;
  }).map((n) => n.prop);
  if (Object.assign(e.formRules, ke.deepCopy(s)), Object.keys(e.formRules).forEach((n) => {
    n in s || delete e.formRules[n];
  }), !l.length)
    return;
  const i = {};
  return l.forEach((n) => {
    if (e.formRules[n])
      return;
    const o = t.find((_) => _.prop === n), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = ut[a], h = [], m = "options" in o, y = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${m ? "选择" : "输入"}${(o == null ? void 0 : o.label) || n}` };
    o.validator && (y.validator = (_, $) => a === "pc" ? o.validator(_, $) : o.validator($, _)), o.asyncValidator && (y.asyncValidator = (_, $) => a === "pc" ? o.asyncValidator(_, $) : o.asyncValidator($, _)), o.comp ? h.push({ ...y, trigger: r.change }) : h.push({ ...y, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...y, trigger: r.blur }), i[n] = h;
  }), Object.assign(e.formRules, i), e.formRules;
}, dt = (e, t, s = !0) => {
  const l = {};
  return t.forEach((i) => {
    var h, m;
    let n = "";
    const { type: o, options: a } = i, { multiple: r } = i.formAttrs || {};
    if (s && o === "number" || i.comp === "ElInputNumber")
      n = 0;
    else if (i.comp === "ElSwitch")
      n = !1;
    else if (a && ((h = i.comp) != null && h.endsWith("XCheckboxs") || (m = i.comp) != null && m.endsWith("x-checkboxs") || r))
      n = [];
    else if (i.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(i.type)) {
      const S = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[i.type];
      i["start-placeholder"] || (i["start-placeholder"] = "开始" + S), i["end-placeholder"] || (i["end-placeholder"] = "结束" + S), n = [];
    }
    l[i.prop] = n;
  }), Object.assign(e, { ...l, ...e }), e;
}, ct = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [l, i] = e.split(s);
  i = i.split("|");
  let n = t[l];
  typeof n == "number" ? n += "" : typeof n == "string" && (n = n.trim());
  const o = e.match(s)[0];
  return i.some((a) => o === "^=" ? n.startsWith(a) : o === "*=" ? n.includes(a) : o === "$=" ? n.endsWith(a) : o === "~=" ? !n.includes(a) : o === "!=" ? n !== a : a === n);
}, ut = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, ht = {
  effects: kt,
  validateForm: nt,
  formatPrecision: Ct,
  formatOptions: W,
  Message: N,
  Notify: ue,
  Confirm: ie,
  middlewares: It,
  baseForm: it,
  baseTable: lt,
  baseDialog: he,
  baseModel: Rt,
  initFields: Pt,
  initModel: Bt,
  initTable: at,
  initDialog: ot,
  initForm: De,
  initFormRules: rt,
  initDefaultForm: dt,
  isWhenMatched: ct,
  triggers: ut
}, { funcs: Mt } = StardustJs;
class mt {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const l = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => l }
      }), this._initLifeCycles();
    }
    oe(this.onInit);
  }
  onInit() {
    this._evalAction();
  }
  get app() {
    throw "请自行注入 app";
  }
  get $el() {
    return this.vm && this.vm.ctx.$el || null;
  }
  get router() {
    throw "请自行注入 router";
  }
  get route() {
    return this.router.currentRoute.value;
  }
  get params() {
    return this.route.params;
  }
  get query() {
    return this.route.query;
  }
  get store() {
    throw "请自行注入 store";
  }
  get uiUtils() {
    return ht;
  }
  get service() {
    throw "请自行注入 service";
  }
  get $api() {
    return this.service.api;
  }
  get $request() {
    return this.service.request;
  }
  get $restful() {
    return this.service.restful;
  }
  get config() {
    return this.app.config.globalProperties;
  }
  get $js() {
    return window.StardustJs;
  }
  get $browser() {
    return window.StardustBrowser;
  }
  get $dates() {
    var t;
    return (t = this.$js) == null ? void 0 : t.dates;
  }
  get $highdict() {
    var t;
    return (t = this.$js) == null ? void 0 : t.highdict;
  }
  get $copy() {
    var t;
    return (t = this.$js) == null ? void 0 : t.funcs.deepCopy;
  }
  get $sleep() {
    var t;
    return (t = this.$js) == null ? void 0 : t.funcs.sleep;
  }
  get $storage() {
    var t;
    return (t = this.$browser) == null ? void 0 : t.storage;
  }
  get $local() {
    var t;
    return (t = this.$storage) == null ? void 0 : t.local;
  }
  get $session() {
    var t;
    return (t = this.$storage) == null ? void 0 : t.session;
  }
  _bindMethods() {
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.getOwnPropertyDescriptors(this.__proto__), l = Object.keys(s).filter((o) => o !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...l])).filter((o) => typeof this[o] == "function").forEach((o) => {
      this[o] = this[o].bind(this);
    });
  }
  _initLifeCycles() {
    [
      "onBeforeMount",
      "onMounted",
      "onBeforeUpdate",
      "onUpdated",
      "onBeforeUnmount",
      "onUnmounted",
      "onErrorCaptured",
      "onRenderTracked",
      "onRenderTriggered",
      "onActivated",
      "onDeactivated"
    ].forEach((s) => {
      this[s] && this.vue[s](this[s]);
    });
  }
  _evalAction() {
    var i;
    const { _action_: t, _action_params_: s, ...l } = this.query;
    t && this[t] && ((i = this[t]) == null || i.call(this, JSON.parse(s || "{}")), this.router.replace(this.route.path + "?" + Mt.encodeQuery(l)));
  }
  _getMethods() {
    return [
      "_bindMethods",
      "_initLifeCycles",
      "_evalAction",
      "_getMethods",
      "onInit"
    ];
  }
}
const { funcs: qe, highdict: be, dates: _e } = StardustJs, { file: Xe, excel: de } = StardustBrowser;
class pt extends mt {
  constructor(t) {
    super(t);
    const { model: s, table: l, dialog: i, dbModelName: n = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = l || (s == null ? void 0 : s.table), this.dialog = i || (s == null ? void 0 : s.dialog), this.dbModelName = n, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isImporting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], oe(() => {
      this.router.afterEach(() => {
        this._unwatchs.forEach((r) => r());
      });
    });
  }
  get dbTable() {
    if (!this._dbTable) {
      let [t, s] = this.dbModelName.split(".");
      s || (t = "", s = t), this._dbTable = new this.service.Table(t, s);
    }
    return this._dbTable;
  }
  get form() {
    var t, s, l, i;
    if ((t = this.model) != null && t.form && ((s = this.dialog) != null && s.form))
      throw "conflict of model.form and dialog.form";
    return ((l = this.model) == null ? void 0 : l.form) || ((i = this.dialog) == null ? void 0 : i.form);
  }
  _getMethods() {
    return [
      ...super._getMethods(),
      "handleKeywordsSearch",
      "handleSearch",
      "handleAdd",
      "handleEdit",
      "handleDelete",
      "handleRowEdit",
      "handleExport",
      "handleSearchExport",
      "handleImport",
      "handleMultiDelete",
      "handleSave",
      "handleSubmit",
      "handleCancel",
      "handleSortChange",
      "handleLoad",
      "onSearch",
      "onAdd",
      "onEdit",
      "onDelete",
      "onSubmit",
      "onCancel",
      "onRowEdit",
      "onCancelEdit",
      "onExport",
      "onSearchExport",
      "onImport",
      "onMultiDelete",
      "search",
      "add",
      "update",
      "remove",
      "getSearchParams",
      "getAddParams",
      "getUpdateParams",
      "getDeleteParams",
      "getSearchExportParams",
      "injectSearchParams",
      "injectAddParams",
      "injectUpdateParams",
      "injectDeleteParams",
      "beforeSearch",
      "beforeAdd",
      "beforeEdit",
      "beforeDelete",
      "afterSearch",
      "afterAdd",
      "afterEdit",
      "afterDelete",
      "afterSubmit",
      "updatePartials",
      "_defaultFormatList",
      "_fillRelatedField",
      "formatList",
      "processExportingColumns",
      "processExportingData",
      "processExporting",
      "processImportingData",
      "_resetForm",
      "_clearValidate",
      "_trimForm",
      "_validateForm",
      "_checkAllNone",
      "_showError"
    ];
  }
  onInit() {
    super.onInit(), this.table && this.handleSearch();
  }
  async handleKeywordsSearch(t) {
    if (this._lastSearchParams = null, t = t.replace(/,/g, " ").split(" ").filter((n) => n), !t.length)
      return this.handleSearch();
    let { searchFields: s, columns: l } = this.table;
    if (s.length || (s = [...new Set(l.filter((n) => typeof n.canSearch == "boolean" ? n.canSearch : n.prop && n.type !== "number" && !n.comp && !n.virtual).map((n) => n.prop))]), !s.length)
      return this.handleSearch();
    const i = [];
    return s.forEach((n) => {
      t.forEach((o) => {
        i.push({ [n]: { "[Op.like]": "%" + o + "%" } });
      });
    }), this.handleSearch({ where: { "[Op.or]": i } });
  }
  async handleSearch(t, { isInfinite: s = !1 } = {}) {
    if (t instanceof Event && (t = null), this.table.isInfinite = s, this.table.loading || !await this.beforeSearch(t))
      return;
    t = this.getSearchParams(t), this.injectSearchParams(t), this.table.loading = !0;
    const l = await this.search(t);
    let i = be.get(l, this.listProp);
    return i = this.formatList(this._defaultFormatList(i, l), l), Object.assign(this.table, {
      list: i,
      total: l.total,
      loading: !1
    }), this.afterSearch(i, t, l), l;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await oe(), await qe.sleep(50), this._clearValidate(), this.afterAdd());
  }
  async handleEdit({ $index: t, row: s }) {
    var l;
    await this.beforeEdit({ $index: t, row: s }) && (this.table.isRowEdit ? (s.originData = JSON.stringify(s), s.isEditing = !0) : (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !0,
      editingIndex: t,
      editingRow: s,
      form: {
        ...this.dialog.form,
        ...s
      }
    }), await oe(), (l = this.dialog.formRef) == null || l.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (this.table.loading || !await this.beforeDelete({ $index: t, row: s }) || !await ie.w({ message: "确定要删除吗？", title: "警告" }))
      return;
    this.table.loading = !0;
    const i = this.getDeleteParams(s);
    this.injectDeleteParams(i);
    const n = await this.remove(i, s);
    this.table.loading = !1, !n.err && (this.afterDelete(n), this.handleSearch());
  }
  async handleRowEdit({ row: t }) {
    if (t._loading)
      return;
    t._loading = !0;
    const s = this.getUpdateParams(t);
    if (this.injectUpdateParams(s), !await this._checkAllNone(s)) {
      t._loading = !1;
      return;
    }
    try {
      await this.update(s, t[this.idField]);
    } catch (l) {
      this._showError(l.data.err), t._loading = !1;
      return;
    }
    delete t.originData, t.isEditing = !1, t._loading = !1;
  }
  async handleCancelEdit({ row: t }) {
    Object.assign(t, JSON.parse(t.originData)), delete t.originData, t.isEditing = !1;
  }
  async handleExport(t = this.exportType, s = document.title) {
    if (this._isExporting) {
      N.w("导出中...");
      return;
    }
    if (t instanceof Event && (t = ""), t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      N("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const { list: l, selection: i, ref: n } = this.table;
    let o = i.length > 0 ? i : l;
    o = qe.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(n._visibleColumns, "current"), r = a.map((y) => y.prop), h = a.map((y) => y.label);
    o = o.map((y) => r.map((_) => y[_]));
    let m = null;
    t === "csv" ? m = de.export2Csv : m = de.export2Excel;
    let S = { list: l, header: h, data: o, filename: s };
    S = await this.processExporting(S), m(S), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting) {
      N.w("导出中...");
      return;
    }
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      N("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const l = await this.dbTable.search(this.getSearchExportParams());
    let i = l.data;
    i = this.formatList(i, l), i = this.processExportingData(i, "search");
    const n = this.processExportingColumns(this.table.ref._visibleColumns, "search-export"), o = n.map((m) => m.prop), a = n.map((m) => m.label);
    i = i.map((m) => o.map((S) => m[S]));
    let r = null;
    t === "csv" ? r = de.export2Csv : r = de.export2Excel;
    let h = { list: l.data, header: a, data: i, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    var n, o;
    if (this._isImporting) {
      N.w("导入中...");
      return;
    }
    const t = await Xe.select(".xlsx,.csv");
    this._isImporting = !0;
    const s = t.name.toLowerCase().endsWith(".csv"), l = await Xe.toType(t, s ? "text" : "arraybuffer");
    let i = [];
    if (s)
      await ((n = window.DynamicLibs) == null ? void 0 : n.use("Papa")), i = window.Papa.parse(l, { header: !0 }).data;
    else {
      await ((o = window.DynamicLibs) == null ? void 0 : o.use("XLSX"));
      const a = window.XLSX.read(l, {}), r = Object.values(a.Sheets);
      i = XLSX.utils.sheet_to_json(r[0]);
    }
    if (i.length > 0) {
      const a = {};
      this.table.columns.forEach((h) => a[h.label] = h.prop);
      const r = Object.keys(i[0]);
      i = i.map((h) => {
        const m = {};
        return r.forEach((S) => m[a[S]] = h[S]), m;
      });
    }
    i = this.processImportingData(i), await this.dbTable.func(["bulkCreate", i]), N.s("导入成功"), this._isImporting = !1, this.handleSearch();
  }
  async handleMultiDelete() {
    if (this.table.loading)
      return;
    const { selection: t } = this.table;
    if (!t.length) {
      N.w("尚未选择要删除的数据");
      return;
    }
    if (!await ie.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
      return;
    this.table.loading = !0;
    const l = t.map((i) => i[this.idField]);
    await this.dbTable.func(["destroy", {
      where: {
        [this.idField]: { "[Op.in]": l }
      }
    }]), this.table.loading = !1, this.handleSearch();
  }
  async handleSave(t) {
    if (t = t instanceof Event ? this.form : t, this._isSubmitting) {
      N.w("正在保存...");
      return;
    }
    const s = this.model.formRef || this.dialog.formRef;
    if (!await this._validateForm(s))
      return;
    this._isSubmitting = !0;
    const l = this.getAddParams(t);
    if (this.injectAddParams(l), !await this._checkAllNone(l)) {
      this._isSubmitting = !1;
      return;
    }
    let i = null;
    try {
      t[this.idField] ? i = await this.update(l, t[this.idField]) : i = await this.add(l);
    } catch (n) {
      this._showError(n.data.err), this._isSubmitting = !1;
      return;
    }
    return this._isSubmitting = !1, i.err || N.s("保存成功"), this.router.go(-1), i;
  }
  async handleSubmit(t) {
    if (t = t instanceof Event ? null : t, this._isSubmitting)
      return N.w("正在提交..."), !1;
    if (!this.dialog.visible)
      return !1;
    this._isSubmitting = !0;
    const s = t || this.form;
    if (!t && ((this.dialog.shouldTrim || !0) && this._trimForm(), !await this._validateForm()))
      return this._isSubmitting = !1, !1;
    let l = null;
    try {
      if (this.dialog.isEditing) {
        const i = this.getUpdateParams(s);
        if (this.injectUpdateParams(i), !await this._checkAllNone(i))
          return this._isSubmitting = !1, !1;
        l = await this.update(i, this.dialog.editingRow[this.idField]);
      } else {
        const i = this.getAddParams(s);
        if (this.injectAddParams(i), !await this._checkAllNone(i))
          return this._isSubmitting = !1, !1;
        l = await this.add(i);
      }
    } catch (i) {
      return this._showError(i.data.err), this._isSubmitting = !1, !1;
    }
    return this.dialog.visible = !1, this._isSubmitting = !1, l.err || this.handleSearch(), this.afterSubmit(l), l;
  }
  handleCancel() {
    this.dialog.visible = !1;
  }
  handleSortChange(t) {
    if (!t)
      this.table.query.order = [];
    else if (Array.isArray(t))
      this.table.query.order = t;
    else {
      const { prop: s, order: l } = t;
      this.table.query.order = !s || !l ? [] : [
        [s, l.slice(0, -6)]
      ];
    }
    this.handleSearch();
  }
  async handleLoad() {
    const { query: t } = this.table;
    if (!this.table.list.length)
      return await this.handleSearch(), t.page * t.limit >= this.table.total && (this.table.finished = !0), this.table.moreLoading = !1;
    const { loading: s, total: l } = this.table;
    if (s || !l || this.table.finished)
      return this.table.moreLoading = !1;
    if (t.page * t.limit >= l)
      return this.table.moreLoading = !1, this.table.finished = !0;
    this.table.isInfinite = !0, t.page++;
    const i = this.table.list.slice();
    await this.handleSearch({}, { isInfinite: !0 }), this.table.loading = !0, await this.$sleep(50), this.table.list = i.concat(this.table.list), this.table.loading = !1, this.table.moreLoading = !1;
  }
  get(t) {
    return this.dbTable.get(t);
  }
  search(t) {
    return this._lastSearchParams = JSON.stringify(t), this.dbTable.search(t);
  }
  add(t) {
    return this.dbTable.add(t);
  }
  update(t, s) {
    return this.dbTable.update(s, t);
  }
  remove(t, s) {
    return this.dbTable.remove(t[this.idField]);
  }
  getSearchParams(t) {
    return t != null && t.page && (this.table.query.page = t.page), t != null && t.limit && (this.table.query.limit = t.limit), Object.assign({ where: {} }, JSON.parse(this._lastSearchParams), this.table.query, t);
  }
  getAddParams(t) {
    const s = Object.keys(this.dialog.initialForm), l = {};
    return s.length ? s.forEach((i) => l[i] = t[i]) : Object.assign(l, t), this.dialog.formItems.forEach((i) => {
      let n = l[i.model || i.prop];
      i.type === "number" ? n = this.uiUtils.formatPrecision(n, i.precision || 3) * 1 : i.comp === "ElDatePicker" && (i.type === "datetime" ? n = _e.format(n) : (!i.type || i.type === "date") && (n = _e.format(n, "", !1))), l[i.model || i.prop] = n;
    }), l;
  }
  getUpdateParams(t) {
    return this.getAddParams(t);
  }
  getDeleteParams(t) {
    return {
      [this.idField]: t[this.idField]
    };
  }
  getSearchExportParams() {
    const t = this.getSearchParams();
    return this.injectSearchParams(t), Object.assign({}, t, {
      page: 1,
      limit: -1,
      attributes: this.processExportingColumns(this.table.ref._visibleColumns, "search-attributes").map((s) => s.prop)
    });
  }
  injectSearchParams(t) {
  }
  injectAddParams(t) {
  }
  injectUpdateParams(t) {
  }
  injectDeleteParams(t) {
  }
  beforeSearch(t) {
    return !0;
  }
  beforeAdd() {
    return !0;
  }
  beforeEdit({ $index: t, row: s }) {
    return !0;
  }
  beforeDelete({ $index: t, row: s }) {
    return !0;
  }
  afterSearch(t, s, l) {
    const i = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && i !== this._lastSearchParams) {
      const { page: n, limit: o, order: a, count: r, ...h } = s;
      this.dbTable.func(["count", h]).then((m) => this.table.total = m.data);
    }
  }
  afterAdd() {
  }
  afterEdit({ $index: t, row: s }) {
  }
  afterDelete(t) {
  }
  afterSubmit(t) {
  }
  async updatePartials({ row: t }, s = []) {
    if (!s.length)
      return;
    this.table.loading = !0;
    const l = {};
    s.forEach((i) => l[i] = t[i]), await this.update(l, t[this.idField]), this.table.loading = !1;
  }
  _defaultFormatList(t, s) {
    const { columns: l, query: i } = this.table, { page: n, limit: o } = i;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (n - 1) * o + r + 1;
    }), l.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: m, autoFill: S } = a.tableAttrs || {}, { modelName: y } = a.formAttrs || {};
      if (y && S)
        t.forEach((_) => _[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && m !== !1) {
        const $ = Ee(() => a.options, (T, g) => {
          const C = g ? this.table.list : t, F = Lt(a);
          C.forEach((z, H) => {
            const I = z[r];
            z[`_formatted_${r}`] = F[I] || I;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push($);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const l = [...new Set(t.map((h) => h[s.prop]))];
    if (!l.length)
      return;
    const { modelName: i, text: n, value: o } = s.formAttrs, a = await this.service.restful.search(i, {
      limit: -1,
      attributes: [n, o],
      where: {
        [o]: {
          "[Op.in]": l
        }
      }
    });
    if (!a.data.length)
      return;
    const r = be.mapField(a.data, o, n);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = r[h[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingColumns(t, s = "current") {
    return t.filter((l) => !["index", "selection", "expand", "radio", "_index"].includes(l.type)).filter((l) => !l.virtual);
  }
  processExportingData(t, s = "current") {
    if (!t.length)
      return t;
    const l = {};
    this.table.ref._visibleColumns.forEach((n) => {
      let { formatter: o = n.formatter, tagValues: a = n.tagValues, options: r = n.options } = n.tableAttrs || {};
      !o && typeof a == "function" && (o = a), l[n.prop] = { formatter: o, tagValues: a, options: r };
    });
    const i = [...new Set(Object.keys(t[0]).concat(this.table.ref._visibleColumns.map((n) => n.prop).filter((n) => n)))];
    return t.forEach((n) => {
      i.forEach((o) => {
        var r, h, m, S;
        const a = n[o];
        if (n.hasOwnProperty("_formatted_" + o))
          return n[o] = n["_formatted_" + o];
        if ((r = l[o]) != null && r.formatter)
          return n[o] = l[o].formatter(a);
        if ((h = l[o]) != null && h.tagValues)
          return n[o] = l[o].tagValues[a];
        if ((m = l[o]) != null && m.options)
          return n[o] = ((S = l[o].options.find((y) => y.value === n[o])) == null ? void 0 : S.text) ?? n[o];
        typeof a == "boolean" ? n[o] = a && 1 || 0 : a instanceof Date ? (n[o] = _e.format(a), n[o].endsWith(" 00:00:00") && (n[o] = n[o].slice(0, -9))) : a === void 0 && (n[o] = be.get(n, o));
      });
    }), t.forEach((n) => {
      i.forEach((o) => {
        n[o] && typeof n[o] == "object" && (n[o] = JSON.stringify(n[o]));
      });
    }), t;
  }
  processExporting(t) {
    return t;
  }
  processImportingData(t) {
    return t.forEach((s) => {
      delete s[this.idField], delete s._index;
    }), t;
  }
  _resetForm(t = this.dialog) {
    t.form = JSON.parse(JSON.stringify(t.initialForm));
  }
  _trimForm() {
    const { form: t } = this.dialog, s = {};
    Object.keys(t).forEach((l) => {
      t[l] == null ? s[l] = "" : t[l].trim && (s[l] = t[l].trim());
    }), Object.assign(t, s);
  }
  _validateForm(t) {
    const s = t || this.dialog.formRef;
    return s ? new Promise((l) => {
      this._isMobile ? s.validate().then(() => l(!0)).catch(() => l(!1)) : s.validate((i) => l(i)).catch(() => l(!1));
    }) : !0;
  }
  _clearValidate(t = this.dialog.formRef) {
    t && (this._isMobile ? t.resetValidation() : t.clearValidate());
  }
  async _checkAllNone(t) {
    const s = [null, void 0, ""];
    return Object.values(t).some((i) => !s.includes(i)) ? !0 : ie.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    N(typeof t == "object" ? t.message || t.err || t.toString() : t);
  }
  get _isMobile() {
    var s, l;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((l = this.dialog) == null ? void 0 : l.formRef);
    return t ? t.$.attrs.class.indexOf("mobile") >= 0 : window.isMobile;
  }
  onKeywordsSearch(...t) {
    return this.handleKeywordsSearch(...t);
  }
  onSearch(...t) {
    return this.handleSearch(...t);
  }
  onAdd(...t) {
    return this.handleAdd(...t);
  }
  onEdit(...t) {
    return this.handleEdit(...t);
  }
  onDelete(...t) {
    return this.handleDelete(...t);
  }
  onSubmit(...t) {
    return this.handleSubmit(...t);
  }
  onCancel(...t) {
    return this.handleCancel(...t);
  }
  onRowEdit(...t) {
    return this.handleRowEdit(...t);
  }
  onCancelEdit(...t) {
    return this.handleCancelEdit(...t);
  }
  onExport(...t) {
    return this.handleExport(...t);
  }
  onSearchExport(...t) {
    return this.handleSearchExport(...t);
  }
  onImport(...t) {
    return this.handleImport(...t);
  }
  onMultiDelete(...t) {
    return this.handleMultiDelete(...t);
  }
}
const Lt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: l = "text", value: i = "value" } = s, n = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    n[o[i]] = o[l];
  }), n;
};
class Nt extends pt {
  handleAdd() {
    const t = this.table.list.length, s = {
      _index: t + 1,
      isEditing: !0
    };
    this.table.list.push(s), this.handleEdit({ $index: t, row: s });
  }
  handleDelete({ $index: t, row: s }) {
    this.table.list.splice(t, 1);
  }
  handleRowEdit({ row: t }) {
    t.isEditing = !1;
  }
  handleSubmit(t) {
    this.dialog.visible = !1;
  }
  handleMultiDelete() {
    const { list: t, selection: s } = this.table;
    this.table.list = t.filter((l) => !s.includes(l));
  }
}
const Ut = {
  BaseController: mt,
  CrudController: pt,
  TempCrudController: Nt
}, O = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [l, i] of t)
    s[l] = i;
  return s;
}, qt = {
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
    isMobile() {
      return this.$attrs.platform === "mobile";
    },
    rows() {
      const e = [[]];
      let t = e[0], s = 0;
      return this.cols.forEach((l) => {
        const i = l.span || this.span;
        t.push(l), s += i, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, Xt = { class: "x-auto-rows" }, zt = { key: 1 };
function Wt(e, t, s, l, i, n) {
  const o = u("x-col"), a = u("x-row");
  return d(), w("div", Xt, [
    (d(!0), w(P, null, M(n.rows, (r, h) => (d(), f(a, b({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), w(P, null, M(r, (m, S) => (d(), f(o, b(m, {
          span: n.isMobile ? m.xs || m.span || s.span : m.span || s.span,
          key: S,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            m.slot || e.$attrs.slot ? V(e.$slots, m.slot || e.$attrs.slot, {
              key: 0,
              col: m
            }) : (d(), w("span", zt, A(m.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const Ht = /* @__PURE__ */ O(qt, [["render", Wt]]), Kt = {
  name: "MobileXButton"
};
function Jt(e, t, s, l, i, n) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  });
}
const Yt = /* @__PURE__ */ O(Kt, [["render", Jt]]), Gt = {
  name: "PcXButton"
};
function Qt(e, t, s, l, i, n) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  });
}
const Zt = /* @__PURE__ */ O(Gt, [["render", Qt]]), { funcs: es } = StardustBrowser, ts = ["index", "selection", "expand", "radio", "_index"], Ie = {
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
    updator: Object,
    datasource: Object
  },
  data() {
    return {
      zoom: 1,
      loading: !1,
      filterType: "分类",
      dialog: {
        ...he(),
        formItems: [
          {
            label: "分类",
            prop: "categories",
            comp: "x-select",
            multiple: !0,
            "collapse-tags": !0,
            clearable: !1,
            text: "label",
            value: "prop",
            options: []
          },
          {
            label: "系列",
            prop: "series",
            comp: "x-select",
            clearable: !1,
            required: !0,
            text: "label",
            value: "prop",
            options: []
          },
          {
            label: "值",
            prop: "attr",
            comp: "x-select",
            clearable: !1,
            required: !0,
            text: "label",
            value: "prop",
            options: []
          },
          {
            label: "汇总方式",
            prop: "summary",
            comp: "x-select",
            clearable: !1,
            required: !0,
            options: [
              { text: "求和", value: "sum" },
              { text: "平均", value: "average" },
              { text: "首个", value: "first" },
              { text: "最后一个", value: "last" },
              { text: "最大值", value: "max" },
              { text: "最小值", value: "min" },
              { text: "个数", value: "count" }
            ]
          },
          {
            label: "图表类型",
            prop: "type",
            comp: "x-select",
            clearable: !1,
            required: !0,
            options: [
              { text: "柱状图", value: "bar" },
              { text: "折线图", value: "line" }
            ]
          },
          { label: "边距", slot: "grid" },
          { label: "数据筛选", slot: "filter" }
        ],
        form: {
          categories: [],
          series: "",
          attr: "",
          summary: "count",
          type: "bar",
          grid: {
            left: 30,
            top: 40,
            right: 20,
            bottom: 30
          },
          filter: {
            categories: { isLimit: !1, limit: 10, mergeOthers: !1 },
            series: { isLimit: !1, limit: 10, mergeOthers: !1 }
          }
        }
      }
    };
  },
  computed: {
    zoomedHeight() {
      return es.calcPixel(this.height) * this.zoom + "px";
    },
    sidebarCollapse() {
      return this.$store.app.sidebarCollapse;
    },
    grid() {
      return this.dialog.form.grid;
    },
    categories() {
      return this.dialog.form.filter.categories;
    },
    series() {
      return this.dialog.form.filter.series;
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
      for (let s = 0; s < Math.ceil(e / t); s++)
        setTimeout(this.chart.resize, t * s);
    }
  },
  async mounted() {
    await this.init(), this.initDatasource();
  },
  beforeUnmount() {
    document.removeEventListener("resize", this.update), this.timer && clearInterval(this.timer);
  },
  methods: {
    async init() {
      var e;
      await ((e = window.DynamicLibs) == null ? void 0 : e.use("echarts")), this.chart && this.$refs.el.removeAttribute("_echarts_instance_"), this.chart = window.echarts.init(this.$refs.el), this.update(), document.removeEventListener("resize", this.update), document.addEventListener("resize", this.update), this.updator && (this.timer = setInterval(this.updator.handler.bind(this), this.updator.interval || 1e3));
    },
    initDatasource() {
      if (!this.datasource)
        return;
      const e = this.datasource.columns.filter((t) => !ts.includes(t.type));
      this.dialog.formItems.slice(0, 3).forEach((t) => t.options = e), this.handleMakeChart();
    },
    async handleMakeChart() {
      var s, l;
      this.dialog.visible = !1, this.loading = !0;
      const e = { ...this.dialog.form };
      (s = e.filter) != null && s.categories.isLimit || (e.filter.categories.mergeOthers = !1), (l = e.filter) != null && l.series.isLimit || (e.filter.series.mergeOthers = !1);
      let t = this.datasource.list;
      this.datasource.search && (t = await this.datasource.search()), e.data = t, this.setRich(e), this.loading = !1;
    },
    calcSummary(e, t, s) {
      let l;
      return (t === "sum" || t === "average") && (l = e.reduce((i, n) => i + n, 0).toFixed(3) * 1), t === "count" ? l = e.length : t === "average" ? e.length ? l = (l / (s || e.length)).toFixed(3) * 1 : l = void 0 : t === "first" ? l = e[0] : t === "last" ? l = e[e.length - 1] : (t === "max" || t === "min") && (l = Math[t].apply(null, e)), l;
    },
    setRich(e) {
      var I;
      const { categories: t, data: s, attr: l, summary: i, type: n, filter: o, grid: a } = e, r = {}, h = Array.isArray(t) && t.length || ((I = t == null ? void 0 : t.data) == null ? void 0 : I.length), m = h && (Array.isArray(t) ? t : t.data), S = typeof e.series == "string" ? e.series : e.series.data, y = (o == null ? void 0 : o.categories.limit) > -1, _ = (o == null ? void 0 : o.series.limit) > -1, $ = {}, T = [], g = /* @__PURE__ */ new Set(), C = [];
      s.forEach((E) => {
        var q;
        let D = E[S] || "未知";
        if (_ && C.length >= o.series.limit && !C.includes(D)) {
          if (!o.series.mergeOthers)
            return;
          D = "其他";
        }
        if (h) {
          let B = m.map((ee) => E[ee]).join("/") || "未知";
          if (y && T.length >= o.categories.limit && !T.includes(B)) {
            if (!o.categories.mergeOthers)
              return;
            g.add(B), B = "其他";
          }
          $[B] || T.push(B), $[B] || ($[B] = {}), C.includes(D) || C.push(D), (q = $[B])[D] || (q[D] = []), $[B][D].push(E[l]);
        } else
          $[D] || C.push(D), $[D] || ($[D] = []), $[D].push(E[l]);
      });
      const F = h && !_ ? [...new Set(s.map((E) => E[S]))] : C;
      if (h)
        for (let E in $)
          for (let D in $[E])
            $[E][D] = this.calcSummary(
              $[E][D],
              i,
              y && E === "其他" ? $[E][D].length / g.size : $[E][D].length
            );
      else
        for (let E in $)
          $[E] = this.calcSummary($[E], i);
      let z = F;
      typeof e.series == "object" && e.series.formatter && (z = F.map((E) => e.series.formatter(E)));
      let H = [];
      h ? H = F.map((E, D) => ({
        name: z[D],
        type: n,
        label: { show: !0, position: "top" },
        data: T.map((q) => ({ name: q, value: $[q][E] }))
      })) : H = [
        {
          type: n,
          colorBy: "data",
          label: { show: !0, position: "top" },
          data: F.map((E) => ({ name: E, value: $[E] }))
        }
      ], Object.assign(r, {
        legend: { data: z },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? T.map((E) => t.formatter(E)) : T : S.formatter ? C.map((E) => S.formatter(E)) : C
        },
        yAxis: { type: "value" },
        series: H
      }, this.option, { grid: a }), this.update(r);
    },
    update(e = {}) {
      var t, s, l;
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1), e = {
        tooltip: {},
        toolbox: { feature: { saveAsImage: {} } },
        ...this.option,
        ...e,
        grid: {
          left: 30,
          top: 40,
          right: 20,
          bottom: 20,
          ...this.option.grid,
          ...e.grid
        },
        legend: {
          padding: [0, 60],
          ...e.legend
        }
      }, e.xAxis && !((t = e.xAxis.axisLabel) != null && t.formatter) && ((s = e.xAxis).axisLabel || (s.axisLabel = {}), e.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)), console.log(e), (l = this.chart) == null || l.setOption(e, !0);
    },
    labelSplitFormatter(e) {
      return (t) => t.length < e ? t : Array.from({
        length: Math.ceil(t.length / e)
      }).map((s, l) => t.slice(l * e, (l + 1) * e)).join(`
`);
    }
  }
}, ze = () => {
  Ae((e) => ({
    "54b2baec": e.zoomedHeight,
    "2b79eb74": e.zoom
  }));
}, We = Ie.setup;
Ie.setup = We ? (e, t) => (ze(), We(e, t)) : ze;
const me = (e) => (Oe("data-v-94e70f82"), e = e(), je(), e), ss = { class: "x-chart" }, ns = {
  class: "chart",
  ref: "el"
}, is = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "左", -1)), ls = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "上", -1)), as = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "右", -1)), os = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "下", -1));
function rs(e, t, s, l, i, n) {
  const o = u("pc-x-icon"), a = u("el-input-number"), r = u("el-col"), h = u("el-row"), m = u("el-checkbox"), S = u("el-tab-pane"), y = u("el-tabs"), _ = u("x-form"), $ = u("x-dialog"), T = ne("loading");
  return R((d(), w("div", ss, [
    j("div", ns, null, 512),
    s.datasource ? (d(), w("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (g) => i.dialog.visible = !0)
    }, [
      x(" 配置 "),
      p(o, { name: "Setting" })
    ])) : k("", !0),
    p($, {
      modelValue: i.dialog.visible,
      "onUpdate:modelValue": t[12] || (t[12] = (g) => i.dialog.visible = g),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: n.handleMakeChart,
      onCancel: t[13] || (t[13] = (g) => i.dialog.visible = !1)
    }, {
      default: c(() => [
        p(_, { dialog: i.dialog }, {
          grid: c(() => [
            p(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                p(r, { span: 12 }, {
                  default: c(() => [
                    is,
                    p(a, {
                      modelValue: n.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => n.grid.left = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    ls,
                    p(a, {
                      modelValue: n.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (g) => n.grid.top = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    as,
                    p(a, {
                      modelValue: n.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (g) => n.grid.right = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    os,
                    p(a, {
                      modelValue: n.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (g) => n.grid.bottom = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          filter: c(() => [
            p(y, {
              modelValue: i.filterType,
              "onUpdate:modelValue": t[11] || (t[11] = (g) => i.filterType = g)
            }, {
              default: c(() => [
                p(S, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    p(m, {
                      modelValue: n.categories.isLimit,
                      "onUpdate:modelValue": t[5] || (t[5] = (g) => n.categories.isLimit = g)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    R(j("div", null, [
                      x(" 记录条数 "),
                      p(a, {
                        modelValue: n.categories.limit,
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => n.categories.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(m, {
                        modelValue: n.categories.mergeOthers,
                        "onUpdate:modelValue": t[7] || (t[7] = (g) => n.categories.mergeOthers = g)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Ue, n.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                p(S, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    p(m, {
                      modelValue: n.series.isLimit,
                      "onUpdate:modelValue": t[8] || (t[8] = (g) => n.series.isLimit = g)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    R(j("div", null, [
                      x(" 记录条数 "),
                      p(a, {
                        modelValue: n.series.limit,
                        "onUpdate:modelValue": t[9] || (t[9] = (g) => n.series.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(m, {
                        modelValue: n.series.mergeOthers,
                        "onUpdate:modelValue": t[10] || (t[10] = (g) => n.series.mergeOthers = g)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Ue, n.series.isLimit]
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["dialog"])
      ]),
      _: 1
    }, 8, ["modelValue", "onSubmit"])
  ])), [
    [T, i.loading]
  ]);
}
const ds = /* @__PURE__ */ O(Ie, [["render", rs], ["__scopeId", "data-v-94e70f82"]]), cs = {
  name: "MobileXCheckboxs",
  inheritAttrs: !1,
  props: {
    text: {
      type: String,
      default: "text"
    },
    plain: {
      type: Boolean,
      default: !1
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
  emits: ["change"],
  data() {
    return {
      _options: []
    };
  },
  computed: {
    attrs() {
      const {
        clearable: e,
        platform: t,
        placeholder: s,
        rules: l,
        required: i,
        ...n
      } = this.$attrs;
      return n;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = W(this.options, this);
      }
    }
  }
};
function us(e, t, s, l, i, n) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, b({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, n.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), w(P, null, M(i._options, (r) => {
        var h;
        return d(), f(o, b(n.attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          shape: s.shape,
          name: r.value
        }), {
          default: c(() => [
            x(A(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "shape", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const hs = /* @__PURE__ */ O(cs, [["render", us], ["__scopeId", "data-v-f7122501"]]), ms = {
  name: "PcXCheckboxs",
  inheritAttrs: !1,
  props: {
    modelValue: Array,
    plain: {
      type: Boolean,
      default: !1
    },
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
  emits: ["update:modelValue", "change"],
  data() {
    return {
      _options: []
    };
  },
  computed: {
    attrs() {
      const {
        clearable: e,
        platform: t,
        placeholder: s,
        ...l
      } = this.$attrs;
      return l;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler(e) {
        this._options = W(e, this);
      }
    }
  }
}, ps = { key: 1 };
function fs(e, t, s, l, i, n) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, b({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, n.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), w(P, null, M(i._options, (r) => {
        var h;
        return d(), f(o, b(n.attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), w("span", ps, A(r.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const gs = /* @__PURE__ */ O(ms, [["render", fs], ["__scopeId", "data-v-4dd3721a"]]), bs = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function _s(e, t, s, l, i, n) {
  const o = u("van-col");
  return d(), f(o, b(n.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const ys = /* @__PURE__ */ O(bs, [["render", _s]]), ws = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function vs(e, t, s, l, i, n) {
  const o = u("el-col");
  return d(), f(o, b(n.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Ss = /* @__PURE__ */ O(ws, [["render", vs]]), ks = {
  name: "MobileXDialog",
  props: {
    actionsheet: {
      type: Boolean,
      default: !1
    },
    modelValue: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: "详情"
    },
    submitText: {
      type: String,
      default: "提交"
    },
    cancelText: {
      type: String,
      default: "取消"
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
    },
    canCancel() {
      return !!this.$attrs.onCancel || !!this.$parent.$attrs.onCancel;
    },
    canConfirm() {
      return !!this.$attrs.onSubmit || !!this.$parent.$attrs.onSubmit;
    }
  },
  methods: {
    async handleCancel() {
      await this.$nextTick(), this.visible = !0, await this.$nextTick(), this.$emit("cancel");
    },
    async handleConfirm() {
      await this.$nextTick(), this.visible = !0, await this.$nextTick(), this.$emit("submit");
    }
  }
}, Cs = { key: 1 }, $s = { key: 1 };
function xs(e, t, s, l, i, n) {
  const o = u("van-button"), a = u("van-col"), r = u("van-row");
  return d(), f(Q(s.actionsheet ? "van-action-sheet" : "van-dialog"), b({ width: "92%" }, e.$attrs, {
    show: n.visible,
    "onUpdate:show": t[0] || (t[0] = (h) => n.visible = h),
    class: "mobile-x-dialog",
    "show-confirm-button": n.canConfirm,
    "show-cancel-button": n.canCancel,
    onConfirm: n.handleConfirm,
    onCancel: n.handleCancel
  }), ae({ _: 2 }, [
    e.$slots.title || s.title ? {
      name: "title",
      fn: c(() => [
        e.$slots.title ? V(e.$slots, "title", { key: 0 }) : (d(), w("span", Cs, A(s.title), 1))
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: c(() => [
        V(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: c(() => [
        V(e.$slots, "default")
      ]),
      key: "2"
    } : void 0,
    e.$slots.title || s.title ? {
      name: "description",
      fn: c(() => [
        e.$slots.title ? V(e.$slots, "title", { key: 0 }) : (d(), w("span", $s, A(s.title), 1))
      ]),
      key: "3"
    } : void 0,
    n.canConfirm || n.canCancel ? {
      name: "cancel",
      fn: c(() => [
        p(r, null, {
          default: c(() => [
            n.canCancel ? (d(), f(a, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                p(o, {
                  block: "",
                  onClick: G(n.handleCancel, ["stop"])
                }, {
                  default: c(() => [
                    x(A(s.cancelText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : k("", !0),
            n.canConfirm ? (d(), f(a, {
              key: 1,
              span: 12
            }, {
              default: c(() => [
                p(o, {
                  block: "",
                  style: { color: "var(--van-blue)" },
                  onClick: G(n.handleConfirm, ["stop"])
                }, {
                  default: c(() => [
                    x(A(s.submitText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : k("", !0)
          ]),
          _: 1
        })
      ]),
      key: "4"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const Vs = /* @__PURE__ */ O(ks, [["render", xs]]), Es = {
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
    title: {
      type: String,
      default: "详情"
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
    },
    hasFooter() {
      return this.onSubmit || this.$parent.$attrs.onSubmit || this.onCancel || this.$parent.$attrs.onCancel || this.$slots.footer;
    }
  },
  methods: {
    handleToggleFullscreen() {
      this.fullscreen = !this.fullscreen, this.$emit("fullscreenchange", this.fullscreen);
    }
  }
}, As = {
  key: 1,
  class: "el-dialog__title"
};
function Os(e, t, s, l, i, n) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(Q(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: n.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => n.visible = r),
    fullscreen: i.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer, "no-footer": !n.hasFooter }]
  }), {
    header: c(() => [
      e.$slots.header ? V(e.$slots, "header", { key: 0 }) : (d(), w("span", As, A(s.title), 1)),
      s.drawer ? k("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: n.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? V(e.$slots, "footer", { key: 0 }) : k("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          x(A(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          x(A(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? V(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const js = /* @__PURE__ */ O(Es, [["render", Os]]), K = {}, te = {
  provinces: [],
  cities: [],
  counties: []
}, Ts = {
  name: "XDistrictSelect",
  props: {
    areaList: Object,
    modelValue: String,
    seperator: {
      type: String,
      default: "/"
    },
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
      provinces: Object.freeze(te.provinces),
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
      this.cities = Object.freeze(te.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(te.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(K, this.areaList), te.provinces = Object.entries(K.province_list).map((e) => ({ value: e[0], text: e[1] })), te.cities = Object.entries(K.city_list).map((e) => ({ value: e[0], text: e[1] })), te.counties = Object.entries(K.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(te.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split(this.seperator);
      if (e) {
        const l = Object.entries(K.province_list).find((i) => i[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(K.city_list).find((i) => i[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const l = Object.entries(K.county_list).find((i) => i[1] === s);
        this.county = l == null ? void 0 : l[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && K.province_list[this.province] || "",
        this.number > 1 && this.city && K.city_list[this.city] || "",
        this.number > 2 && this.county && K.county_list[this.county] || ""
      ].slice(0, this.number).join(this.seperator);
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function Fs(e, t, s, l, i, n) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      p(a, { span: n.span }, {
        default: c(() => [
          p(o, {
            modelValue: i.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => i.province = h),
            options: i.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      n.number > 1 ? (d(), f(a, {
        key: 0,
        span: n.span
      }, {
        default: c(() => [
          p(o, {
            modelValue: i.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => i.city = h),
            options: i.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : k("", !0),
      n.number > 2 ? (d(), f(a, {
        key: 1,
        span: n.span
      }, {
        default: c(() => [
          p(o, {
            modelValue: i.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => i.county = h),
            options: i.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : k("", !0)
    ]),
    _: 1
  });
}
const Ds = /* @__PURE__ */ O(Ts, [["render", Fs]]);
function Is() {
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
function Rs() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function Ps() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((i) => (delete i.visible, e ? {
    ...i,
    label: " ",
    _label: i.label
  } : i)).filter((i) => this.dialog ? this.dialog.isEditing ? i.canEdit !== !1 : i.canAdd !== !1 : !0).map((i) => Object.assign({}, i, i.formAttrs));
}
function Bs() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return ct(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function Ms() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function Ls(e) {
  var l;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
}
function Ns(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const le = {
  props: Is,
  computed: {
    _model: Rs,
    _items: Ps,
    _visibleItems: Bs,
    _rules: Ms
  },
  methods: {
    calcPlaceholder: Ls,
    formatModelValue: Ns
  }
}, Us = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...le.props(),
    hideLabels: {
      type: Boolean,
      default: !1
    },
    labelWidth: {
      type: String,
      default: (e) => e.labelWidth || "80px"
    },
    useWhen: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:fref"],
  computed: {
    ...le.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...le.methods
  }
};
function qs(e, t, s, l, i, n) {
  const o = u("mobile-x-form-item"), a = u("el-col"), r = u("el-row"), h = u("van-form");
  return d(), f(h, {
    ref: "formRef",
    class: J(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? V(e.$slots, "pre", { key: 0 }) : k("", !0),
      p(r, {
        gutter: e.$attrs.gutter,
        justify: e.$attrs.justify,
        align: e.$attrs.align,
        tag: e.$attrs.tag
      }, {
        default: c(() => [
          (d(!0), w(P, null, M(e._visibleItems, (m, S) => (d(), f(a, {
            key: S,
            span: m.span,
            offset: m.offset,
            tag: m.tag,
            xs: m.xs,
            sm: m.sm,
            md: m.md,
            lg: m.lg,
            xl: m.xl
          }, {
            default: c(() => [
              p(o, b({
                "label-width": s.labelWidth,
                "label-position": e.$attrs["label-position"] || "left"
              }, m, {
                rules: e._rules[m.prop] || m.rules,
                modelValue: e.formatModelValue(e._model[m.prop]),
                "onUpdate:modelValue": (y) => e._model[m.prop] = y,
                placeholder: e.calcPlaceholder(m)
              }), {
                default: c(() => [
                  m.slot ? V(e.$slots, m.slot, Te(b({ key: 0 }, m))) : k("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "label-position", "rules", "modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            _: 2
          }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
        ]),
        _: 3
      }, 8, ["gutter", "justify", "align", "tag"]),
      e.$slots.default ? V(e.$slots, "default", { key: 1 }) : k("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const Xs = /* @__PURE__ */ O(Us, [["render", qs]]), zs = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...le.props(),
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
    },
    useWhen: {
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
    ...le.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...le.methods
  }
}, Ws = { key: 1 };
function Hs(e, t, s, l, i, n) {
  const o = u("pc-x-form-item"), a = u("el-col"), r = u("el-row"), h = u("el-form"), m = u("el-collapse-item"), S = u("el-collapse");
  return d(), f(S, {
    modelValue: i.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (y) => i.activeNames = y),
    class: J((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      p(m, {
        name: i.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", Ws, A(s.title), 1))
        ]),
        default: c(() => [
          p(h, b({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs["label-position"] || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: c(() => [
              e.$slots.pre ? V(e.$slots, "pre", { key: 0 }) : k("", !0),
              p(r, {
                gutter: e.$attrs.gutter,
                justify: e.$attrs.justify,
                align: e.$attrs.align,
                tag: e.$attrs.tag
              }, {
                default: c(() => [
                  (d(!0), w(P, null, M(e._visibleItems, (y, _) => (d(), f(a, {
                    key: _,
                    span: y.span,
                    offset: y.offset,
                    tag: y.tag,
                    xs: y.xs,
                    sm: y.sm,
                    md: y.md,
                    lg: y.lg,
                    xl: y.xl
                  }, {
                    default: c(() => [
                      p(o, b({
                        "label-width": s.labelWidth,
                        "show-tooltip": e.$attrs.showTooltip || !1
                      }, y, {
                        modelValue: e._model[y.prop],
                        "onUpdate:modelValue": [($) => e._model[y.prop] = $, ($) => y.onChange || null],
                        prop: y.prop || y.model,
                        clearable: y.clearable !== !1,
                        placeholder: e.calcPlaceholder(y)
                      }), {
                        default: c(() => [
                          y.slot ? V(e.$slots, y.slot, { key: 0 }) : k("", !0)
                        ]),
                        _: 2
                      }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder"])
                    ]),
                    _: 2
                  }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
                ]),
                _: 3
              }, 8, ["gutter", "justify", "align", "tag"]),
              e.$slots.default ? V(e.$slots, "default", { key: 1 }) : k("", !0)
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
const Ks = /* @__PURE__ */ O(zs, [["render", Hs]]);
function Js(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !st(e);
}
const Ce = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: i
  } = e;
  let {
    comp: n,
    compType: o,
    html: a,
    text: r
  } = t;
  const h = {
    ...l,
    "onUpdate:modelValue": (S) => i("update:modelValue", S)
  }, m = [];
  return o === "html" ? h.class = "comp-html" : n = u(n), a && (h.innerHTML = a), r && m.push(r), Z(n, h, {
    default: () => m
  });
}, Ys = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: i,
    $slots: n
  } = e, {
    slot: o,
    showTooltip: a,
    placeholder: r
  } = t;
  if (o && !s.label)
    return n.default();
  let h = null;
  if (o)
    h = n.default();
  else if (a) {
    let m;
    h = p(u("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Js(m = Ce(e)) ? m : {
      default: () => [m]
    });
  } else
    h = Ce(e);
  return Z(u("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [h],
    label: () => Z("span", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
        display: "inline-block"
      }
    }, [s.label])
  });
}, Gs = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: i,
    $slots: n,
    mValue: o
  } = e, {
    slot: a,
    comp: r,
    modelValue: h
  } = t;
  if (a && !s.label)
    return n.default({
      ...t,
      ...s
    });
  const m = {
    modelValue: o,
    labelWidth: s["label-width"],
    labelAlign: s["label-align"] ?? s["label-position"],
    "onUpdate:modelValue": (S) => i("update:modelValue", S)
  };
  return a && s.label || r ? Z(u("van-field"), m, {
    input: () => a && s.label ? n.default() : Ce(e)
  }) : (Object.assign(m, l), Z(u("van-field"), m));
}, Qs = {
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
        platform: s,
        comp: l,
        compType: i,
        iconSize: n,
        slot: o,
        html: a,
        ...r
      } = { ...this.$props, ...this.$attrs };
      return r;
    },
    mValue: {
      get() {
        var e, t;
        return (e = this.comp) != null && e.endsWith("XSelect") || (t = this.comp) != null && t.endsWith("x-select") ? this.modelValue : "";
      },
      set(e) {
        var t, s;
        ((t = this.comp) != null && t.endsWith("XSelect") || (s = this.comp) != null && s.endsWith("x-select")) && this.$emit("update:modelValue", e);
      }
    }
  },
  render() {
    return Gs(this);
  }
}, Re = {
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
        platform: s,
        comp: l,
        slot: i,
        compType: n,
        span: o,
        offset: a,
        showTooltip: r,
        required: h,
        format: m,
        style: S,
        html: y,
        class: _,
        ...$
      } = { ...this.$props, ...this.$attrs };
      return $;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Ys(this);
  }
}, He = () => {
  Ae((e) => ({
    ba9709f0: e.width
  }));
}, Ke = Re.setup;
Re.setup = Ke ? (e, t) => (He(), Ke(e, t)) : He;
const Zs = /* @__PURE__ */ O(Re, [["__scopeId", "data-v-d2cde1e2"]]), Je = /* @__PURE__ */ Object.assign({}), en = {
  name: "MobileXIcon",
  props: {
    name: String
  },
  data() {
    return {
      icons: {}
    };
  },
  computed: {
    iconClass() {
      const [e, t] = this.name.split(":");
      return "icon--" + e + " icon--" + e + "--" + t;
    }
  },
  created() {
    this.initIcons();
  },
  methods: {
    async initIcons() {
      const e = {};
      await Promise.all(Object.keys(Je).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Je[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, tn = ["src"];
function sn(e, t, s, l, i, n) {
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), w("span", {
    key: 0,
    class: J(n.iconClass)
  }, null, 2)) : i.icons[s.name] ? (d(), w("img", {
    key: 1,
    src: i.icons[s.name],
    alt: "icon"
  }, null, 8, tn)) : (d(), f(o, b({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const nn = /* @__PURE__ */ O(en, [["render", sn]]), Ye = /* @__PURE__ */ Object.assign({}), ln = {
  name: "PcXIcon",
  props: {
    name: String
  },
  data() {
    return {
      icons: {}
    };
  },
  computed: {
    iconClass() {
      const [e, t] = this.name.split(":");
      return "icon--" + e + " icon--" + e + "--" + t;
    }
  },
  created() {
    this.initIcons();
  },
  methods: {
    async initIcons() {
      const e = {};
      await Promise.all(Object.keys(Ye).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Ye[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, an = ["src"];
function on(e, t, s, l, i, n) {
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), w("span", {
    key: 0,
    class: J(n.iconClass)
  }, null, 2)) : i.icons[s.name] ? (d(), w("img", {
    key: 1,
    src: i.icons[s.name],
    alt: "icon"
  }, null, 8, an)) : (d(), f(o, Te(b({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(Q(s.name)))
    ]),
    _: 1
  }, 16));
}
const rn = /* @__PURE__ */ O(ln, [["render", on]]), { highdict: ft } = StardustJs, { storage: dn } = StardustBrowser, { local: gt } = dn, Pe = ["index", "selection", "expand", "radio", "_index"];
function cn() {
  return {
    table: Object,
    loading: Boolean,
    data: Array,
    columns: Array,
    query: Object,
    total: Number,
    finished: Boolean,
    selection: Array,
    chartHeight: String,
    chartOption: Object,
    tref: Object,
    defaultValue: "",
    slotAll: {
      type: Boolean,
      default: !1
    },
    onSelectionChange: Function,
    onSortChange: Function,
    onHeaderDragend: Function,
    onCheckedChange: Function,
    onKeywordsSearch: Function,
    onSearch: Function,
    onAdd: Function,
    onEdit: Function,
    onDelete: Function,
    onRowEdit: Function,
    onCancelEdit: Function,
    onExport: Function,
    onSearchExport: Function,
    onImport: Function,
    onMultiDelete: Function,
    onLoad: Function,
    controller: Object,
    listen: {
      type: String,
      default: "*"
    },
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
function un() {
  return [
    "update:tref",
    "search",
    "add",
    "edit",
    "row-edit",
    "cancel-edit",
    "delete",
    "export",
    "search-export",
    "load"
  ];
}
function hn() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function mn() {
  const e = {};
  return [
    "keywords-search",
    "search",
    "add",
    "multi-delete",
    "export",
    "search-export",
    "import",
    "edit",
    "row-edit",
    "cancel-edit",
    "delete"
  ].forEach((s) => e[s] = s), { ...e, ...this.$attrs.domids };
}
function pn() {
  const e = Object.keys(this._attrs).filter((s) => !s.endsWith("-btn")), t = {};
  return e.forEach((s) => t[s] = this._attrs[s]), delete t.platform, {
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
function fn() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function gn() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function bn() {
  const { $props: e, _query: t } = this, { table: s, columns: l } = e;
  return (l || (s == null ? void 0 : s.columns) || []).map((n) => n.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (s.isInfinite ? 0 : (a - 1) * r) + o + 1;
    }
  }, n, { type: "index" }) : n.type === "radio" ? Object.assign({ width: 60, label: "单选" }, n) : Object.assign({}, n, n.tableAttrs));
}
function _n() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function yn() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function wn() {
  const { table: e, finished: t } = this.$props;
  return t ?? (e == null ? void 0 : e.finished);
}
function vn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Sn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function kn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function Cn() {
  return this.onKeywordsSearch || this._listen["keywords-search"] ? (...e) => this._emit("keywords-search", ...e) : null;
}
function $n() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function xn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Vn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function En() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function An() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function On() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function jn() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : () => {
  };
}
function Tn() {
  var s;
  if (!this.controller || !((s = this.listen) != null && s.length))
    return {};
  let e = this.listen.split(",");
  e.includes("*") && (e = [.../* @__PURE__ */ new Set([
    ...e,
    "keywords-search",
    "search",
    "add",
    "multi-delete",
    "export",
    "search-export",
    "import",
    "edit",
    "row-edit",
    "cancel-edit",
    "delete"
  ])]);
  const t = {};
  return e.forEach((l) => {
    const i = "handle" + l.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[l] = this.controller[i];
  }), t;
}
function Fn() {
  const e = this._columns.filter((s) => s.type && Pe.includes(s.type) || s.fixed === "left"), t = this.settings.columns.filter((s) => !s.hide && s.fixed !== "left").map((s) => {
    const l = this._columns.find((i) => i.prop === s.prop);
    return {
      sortable: "custom",
      ...l,
      width: s.width || l.width
    };
  });
  return e.concat(t);
}
function Dn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function In() {
  const { plain: e } = this._attrs;
  return e || e === "";
}
function Rn() {
  const { "hide-header": e } = this._attrs;
  return e || e === "";
}
function Pn() {
  const { "hide-tools": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Bn() {
  const { "hide-searcher": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Mn() {
  const { "hide-chart": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Ln() {
  const { "hide-settings": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Nn() {
  const { "hide-operates": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Un() {
  const { "hide-pagination": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function qn() {
  return this._attrs["operates-width"] ?? 150;
}
function Xn() {
  return this._attrs["operates-dropdown"];
}
function zn() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !Pe.includes(e.type)));
}
function Wn() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function Hn() {
  const e = this._uid && gt.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Pe.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: i, hide: n, width: o, virtual: a, fixed: r } = t;
    return { prop: s, label: l, show: i, hide: n, width: o, virtual: a, fixed: r };
  })), this.settings = e;
}
function Kn(e) {
  gt.setJson(`Settings[${this._uid}]`, e);
}
function Jn(e, t) {
  const { prop: s } = t, l = e[s];
  let { format: i, formatter: n } = t.tableAttrs || t;
  if (n)
    return n(l, e);
  if (i = Array.isArray(t.options) ? i !== !1 : i, i) {
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
  }
  return l === void 0 ? s.includes(".") || s.includes("[") ? ft.get(e, s, this.defaultValue) : this.defaultValue : l === "" ? this.defaultValue : l;
}
function Yn(e, t) {
  return t.link ? t.link(e) : ft.get(e, t.linkProp || t.prop);
}
function Gn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function Qn(e) {
  this.params = e, this._emit("search", e);
}
function Zn(e) {
  this.saveSettings(e), this.initSettings();
}
function ei(e, t, s, l) {
  const i = this.settings.columns.find((n) => n.prop === s.property);
  i && (i.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
}
function ti(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function si(e) {
  var t, s, l, i;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((i = (l = this.controller) == null ? void 0 : l.handleSortChange) == null || i.call(l, e));
}
function ni(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function ii(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function li() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function ai() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function oi(e) {
  var l;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const i = s.tableAttrs.class;
    typeof i == "function" ? t += " " + i(e) : typeof i == "string" && (t += " " + i);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function ri(e) {
  var l;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const i = s.tableAttrs.style;
    typeof i == "function" ? Object.assign(t, i(e)) : typeof i == "object" && Object.assign(t, i);
  }
  return Object.keys(t) ? t : null;
}
function di(e, t) {
  const { tagTypes: s, prop: l, options: i } = t, n = e.row[l];
  if (s) {
    if (typeof s == "function")
      return s(n, e, t);
    if (typeof s == "object")
      return s[n];
  } else if (i) {
    const o = i.find((a) => a[t.value || "value"] === n);
    if (o != null && o.tagType)
      return o.tagType;
  }
  return n ? "success" : "danger";
}
function ci(e, t) {
  const { tagValues: s, prop: l, options: i } = t, n = e.row[l];
  if (s) {
    if (typeof s == "function")
      return s(n, e, t);
    if (typeof s == "object")
      return s[n];
  } else if (i) {
    const o = i.find((a) => a[t.value || "value"] === n);
    if (o)
      return o[t.text || "text"];
  }
  return n;
}
function ui(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function hi(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function mi(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function pi(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function fi(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function gi(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function bi(e, t) {
  var l;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((l = t.previewSrcList) == null ? void 0 : l.call(t)) || [s];
}
function _i(e, t) {
  const s = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function yi() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const X = {
  props: cn,
  emits: un,
  computed: {
    _attrs: hn,
    domids: mn,
    elTableAttrs: pn,
    _loading: fn,
    _data: gn,
    _columns: bn,
    _query: _n,
    _total: yn,
    _finished: wn,
    _selection: vn,
    _chartHeight: Sn,
    _chartOption: kn,
    _onKeywordsSearch: Cn,
    _onSearch: $n,
    _onAdd: xn,
    _onExport: Vn,
    _onSearchExport: En,
    _onImport: An,
    _onMultiDelete: On,
    _onLoad: jn,
    _listen: Tn,
    _visibleColumns: Fn,
    _uid: Dn,
    plain: In,
    hideHeader: Rn,
    hideTools: Pn,
    hideSearcher: Bn,
    hideChart: Mn,
    hideSettings: Ln,
    hideOperates: Nn,
    hidePagination: Un,
    operatesWidth: qn,
    operatesDropdown: Xn,
    searcherColumns: zn,
    searcherConfig: Wn
  },
  watch: {
    $route: yi
  },
  methods: {
    initSettings: Hn,
    saveSettings: Kn,
    calcValue: Jn,
    calcLink: Yn,
    calcOverflowTooltip: Gn,
    handleSearch: Qn,
    handleResetSettings: Zn,
    handleHeaderDragend: ei,
    handleSelectionChange: ti,
    handleSortChange: si,
    handleCheckedChange: ni,
    handleCollapseChange: ii,
    handleMinus: li,
    handleToggleFullscreen: ai,
    cellClassName: oi,
    cellStyle: ri,
    calcTagType: di,
    calcTagValue: ci,
    canEdit: ui,
    canSave: hi,
    canRowEdit: mi,
    canCancelEdit: pi,
    canDelete: fi,
    _imageSrc: gi,
    _imagePreviewSrcList: bi,
    _emit: _i
  }
}, Be = {
  name: "XInfo",
  props: {
    data: Object,
    fields: Array,
    span: {
      type: Number,
      default: window.isMobile ? 24 : 8
    },
    showColon: {
      type: Boolean,
      default: !1
    },
    labelWidth: {
      type: String,
      default: "80px"
    },
    labelSlot: {
      type: Boolean,
      default: !1
    },
    align: String,
    labelAlign: String,
    valueAlign: String,
    defaultValue: ""
  },
  computed: {
    blocks() {
      const e = {};
      return this.fields.filter((t) => t.prop).forEach((t) => {
        const { infoAttrs: s = {}, ...l } = t, i = { span: this.span, ...l, ...s }, n = i.block || "基本信息";
        let o = e[n];
        o || (e[n] = o = [], o.span = 0), o.span + i.span > 24 && o.length ? o[o.length - 1].span += 24 - o.span : o.span += i.span, o.push(i);
      }), e;
    },
    hideHeader() {
      const e = Object.keys(this.blocks);
      return e.length === 1 && e[0] === "基本信息";
    },
    _labelAlign() {
      return this.labelAlign || this.align || "left";
    },
    _valueAlign() {
      return this.valueAlign || this.align || "left";
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
    calcValue: X.methods.calcValue,
    calcLink: X.methods.calcLink
  }
}, Ge = () => {
  Ae((e) => ({
    "5cf44854": e.labelWidth,
    "323265ec": e._labelAlign,
    "0e4e598f": e._valueAlign
  }));
}, Qe = Be.setup;
Be.setup = Qe ? (e, t) => (Ge(), Qe(e, t)) : Ge;
const wi = { class: "x-info__label" }, vi = { key: 1 }, Si = { class: "x-info__value" }, ki = { key: 2 };
function Ci(e, t, s, l, i, n) {
  const o = u("router-link"), a = u("el-col"), r = u("el-row"), h = u("el-collapse-item"), m = u("el-collapse");
  return d(), f(m, {
    modelValue: i.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (S) => i.activeNames = S),
    class: J(["x-info", { "hide-header": n.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), w(P, null, M(n.blocks, (S, y) => (d(), f(h, {
        key: y,
        title: y,
        name: y
      }, {
        default: c(() => [
          p(r, {
            gutter: e.$attrs.gutter || 10
          }, {
            default: c(() => [
              (d(!0), w(P, null, M(S, (_) => (d(), f(a, b({
                key: _.prop,
                span: s.span
              }, _), {
                default: c(() => [
                  j("div", wi, [
                    e.$slots.label ? V(e.$slots, "label", {
                      key: 0,
                      label: _.label
                    }, void 0, !0) : (d(), w("span", vi, A(_.label ? s.showColon ? _.label + "：" : _.label : ""), 1))
                  ]),
                  j("div", Si, [
                    _.slot === "$link" ? (d(), f(o, {
                      key: 0,
                      to: _.to(s.data)
                    }, {
                      default: c(() => [
                        x(A(n.calcLink(s.data, _)), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])) : _.slot ? V(e.$slots, _.slot, Te(b({ key: 1 }, { data: s.data, field: _, value: n.calcValue(s.data, _) })), void 0, !0) : (d(), w("span", ki, A(n.calcValue(s.data, _)), 1))
                  ])
                ]),
                _: 2
              }, 1040, ["span"]))), 128))
            ]),
            _: 2
          }, 1032, ["gutter"])
        ]),
        _: 2
      }, 1032, ["title", "name"]))), 128))
    ]),
    _: 3
  }, 8, ["modelValue", "class"]);
}
const $i = /* @__PURE__ */ O(Be, [["render", Ci], ["__scopeId", "data-v-d4d685d3"]]), xi = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Vi = { key: 1 };
function Ei(e, t, s, l, i, n) {
  return d(), w("div", null, [
    (d(!0), w(P, null, M(s.items, (o, a) => (d(), f(Q(s.compName), b({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? V(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), w("span", Vi, A(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Ai = /* @__PURE__ */ O(xi, [["render", Ei]]), Oi = {
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
function ji(e, t, s, l, i, n) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), h = u("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      p(o, { span: 6 }, {
        default: c(() => [
          j("span", null, "总计: " + A(s.total), 1)
        ]),
        _: 1
      }),
      p(o, { span: 18 }, {
        default: c(() => [
          p(r, b({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (m) => s.query.page = m),
            "page-count": n.pageCount
          }), {
            "prev-text": c(() => [
              p(a, { name: "arrow-left" }),
              x(" 上一页 ")
            ]),
            "next-text": c(() => [
              x(" 下一页 "),
              p(a, { name: "arrow" })
            ]),
            page: c(({ text: m }) => [
              x(A(m), 1)
            ]),
            _: 1
          }, 16, ["items-per-page", "total-items", "modelValue", "page-count"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Ti = /* @__PURE__ */ O(Oi, [["render", ji]]), Fi = {
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
function Di(e, t, s, l, i, n) {
  const o = u("el-pagination");
  return d(), f(o, b({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": s.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => s.query.page = a),
    "page-size": s.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => s.query.limit = a),
    "page-count": n.pageCount,
    total: s.total,
    class: "pc-x-pagination"
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const Ii = /* @__PURE__ */ O(Fi, [["render", Di]]), Ri = {
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
    },
    value() {
      return [this.modelValue];
    },
    text() {
      var e;
      return ((e = this.columns.find((t) => t.value === this.modelValue)) == null ? void 0 : e.text) ?? this.placeholder;
    }
  },
  methods: {
    onConfirm(e) {
      this.$emit("confirm", e), this.$emit("update:modelValue", e);
    }
  }
};
function Pi(e, t, s, l, i, n) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), w(P, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: J(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, A(n.text), 3),
    p(a, b({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: n.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => n.visible = r)
    }), {
      default: c(() => [
        p(o, b(e.$attrs, {
          modelValue: n.value,
          title: e.$attrs.title,
          columns: s.columns,
          onCancel: t[1] || (t[1] = (r) => e.$emit("cancel")),
          onConfirm: n.onConfirm
        }), null, 16, ["modelValue", "title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const Bi = /* @__PURE__ */ O(Ri, [["render", Pi]]), Mi = {
  name: "MobileXRadios",
  inheritAttrs: !1,
  props: {
    text: {
      type: String,
      default: "text"
    },
    plain: {
      type: Boolean,
      default: !1
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
  data() {
    return {
      _options: []
    };
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = W(this.options, this);
      }
    }
  }
};
function Li(e, t, s, l, i, n) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, b({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), w(P, null, M(i._options, (r) => {
        var h;
        return d(), f(o, b(e.$attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          name: r.value
        }), {
          default: c(() => [
            x(A(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const Ni = /* @__PURE__ */ O(Mi, [["render", Li], ["__scopeId", "data-v-667a10bc"]]), Ui = {
  name: "PcXRadios",
  inheritAttrs: !1,
  props: {
    modelValue: Number | String,
    plain: {
      type: Boolean,
      default: !1
    },
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
  emits: ["update:modelValue", "change"],
  data() {
    return {
      _options: []
    };
  },
  computed: {
    attrs() {
      const {
        clearable: e,
        platform: t,
        placeholder: s,
        ...l
      } = this.$attrs;
      return l;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = W(this.options, this);
      }
    }
  }
}, qi = { key: 1 };
function Xi(e, t, s, l, i, n) {
  const o = u("el-radio-group");
  return d(), f(o, b({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, n.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), w(P, null, M(i._options, (a) => {
        var r;
        return d(), f(Q(s.button ? "el-radio-button" : "el-radio"), b(n.attrs, {
          disabled: (r = a.raw) == null ? void 0 : r.disabled,
          key: a.text,
          value: a.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: a,
              raw: a.raw
            }, void 0, !0) : (d(), w("span", qi, A(a.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const zi = /* @__PURE__ */ O(Ui, [["render", Xi], ["__scopeId", "data-v-1c8cf979"]]), Wi = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Hi = { key: 1 };
function Ki(e, t, s, l, i, n) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), w(P, null, M(s.cols, (r, h) => (d(), f(o, b(r, {
        span: r.xs ?? r.span,
        key: h
      }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", Hi, A(r.text), 1))
        ]),
        _: 2
      }, 1040, ["span"]))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const Ji = /* @__PURE__ */ O(Wi, [["render", Ki]]), Yi = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Gi = { key: 1 };
function Qi(e, t, s, l, i, n) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), w(P, null, M(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", Gi, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const Zi = /* @__PURE__ */ O(Yi, [["render", Qi]]), el = {
  name: "MobileXScan",
  props: {
    modelValue: String,
    _label: {
      type: String,
      default: "扫码"
    },
    readonly: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  methods: {
    handleClick() {
      this.readonly && this.handleScan();
    },
    async handleScan() {
      const e = await StardustBrowser.funcs.scanCode();
      this.$emit("update:modelValue", e);
    }
  }
};
function tl(e, t, s, l, i, n) {
  const o = u("van-icon"), a = u("van-field");
  return d(), f(a, b({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: n.handleClick
  }), {
    "right-icon": c(() => [
      p(o, {
        name: "scan",
        onClick: n.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const sl = /* @__PURE__ */ O(el, [["render", tl]]), nl = {
  name: "PcXScan",
  props: {
    modelValue: String,
    readonly: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  methods: {
    handleClick() {
      this.readonly && this.handleScan();
    },
    async handleScan() {
      const e = await StardustBrowser.funcs.scanCode();
      this.$emit("update:modelValue", e);
    }
  }
};
function il(e, t, s, l, i, n) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, b(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: n.handleClick
  }), {
    append: c(() => [
      p(o, {
        icon: "CameraFilled",
        onClick: n.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const ll = /* @__PURE__ */ O(nl, [["render", il]]), Me = async (e, t, s) => {
  if (s.loading)
    return;
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: i = "text", value: n = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], i, n])], a.page || (a.page = 1), a.limit || (a.limit = 100), l && (a.where = a.where || {}, a.where[i] = a.where[i] || {}, a.where[i]["[Op.like]"] = `%${l}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, $e = (e, t) => !e || typeof e != "object" ? e : !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], xe = (e, t) => !e || typeof e != "object" || !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", al = {
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
  emits: ["update:modelValue", "change"],
  data() {
    return {
      visible: !1,
      _value: void 0,
      _options: []
    };
  },
  watch: {
    modelValue(e) {
      this._value = e;
    },
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = W(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: W,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Me(this.service.restful, e, this);
    },
    onShow() {
      this.visible = !0;
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || this.onShow();
    },
    onConfirm() {
      (this._value == null || this._value === "") && (this._value = this._options[0].value), this.visible = !1, this.$emit("update:modelValue", this._value), this.$emit("change", this._value);
    },
    onChange(e) {
      this._value = e.selectedValues[0];
    }
  }
};
function ol(e, t, s, l, i, n) {
  const o = u("x-picker");
  return d(), w("div", {
    onClick: t[2] || (t[2] = (...a) => n.onClick && n.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(o, b(e.$attrs, {
      modelValue: i._value,
      "onUpdate:modelValue": n.onChange,
      show: i.visible,
      columns: i._options,
      onClick: t[0] || (t[0] = G(() => {
      }, ["stop"])),
      onShow: n.onShow,
      onCancel: t[1] || (t[1] = (a) => i.visible = !1),
      onConfirm: n.onConfirm,
      onChange: n.onChange
    }), null, 16, ["modelValue", "onUpdate:modelValue", "show", "columns", "onShow", "onConfirm", "onChange"])
  ]);
}
const rl = /* @__PURE__ */ O(al, [["render", ol]]), dl = {
  name: "PcXSelect",
  props: {
    modelName: String,
    params: Object,
    plain: {
      type: Boolean,
      default: !1
    },
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
    remote: {
      type: Boolean,
      default: !1
    },
    sort: Boolean | String,
    options: Array | Object,
    // 接收下面这几个属性，为了避免这些属性被绑定到当前组件根节点上，在下面会进行过滤传给子组件
    platform: String
  },
  data() {
    return {
      loading: !1,
      _options: [],
      list: []
    };
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        const e = W(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = $e(this.options[s], this), t._remark_ = xe(this.options[s], this);
        }), this._options = se(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: W,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = se(this._options);
      const t = !this.$slots.custom && this.labelTexts;
      this.list = se(this._options.filter((s) => {
        let l = s.text;
        return t && (l += s._main_ + s._remark_), l.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Me(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return $e(e, this);
    },
    calcRemarkLabel(e) {
      return xe(e, this);
    }
  }
}, cl = { key: 1 }, ul = { class: "main" }, hl = { class: "remark" };
function ml(e, t, s, l, i, n) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, b({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: i.loading
  }, e.$attrs, {
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || n.filter,
    onKeyup: Fe(n.handleRemote, ["enter"])
  }), {
    default: c(() => [
      (d(!0), w(P, null, M(i.list, (r, h) => {
        var m;
        return d(), f(o, b(e.$attrs, {
          disabled: (m = r.raw) == null ? void 0 : m.disabled,
          key: r.value,
          label: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), w("span", cl, [
              j("span", ul, A(r._main_), 1),
              j("span", hl, A(r._remark_), 1)
            ]))
          ]),
          _: 2
        }, 1040, ["disabled", "label", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote", "filter-method", "onKeyup"]);
}
const pl = /* @__PURE__ */ O(dl, [["render", ml], ["__scopeId", "data-v-20ab71e6"]]), fl = {
  name: "XSelectV2",
  props: {
    modelName: String,
    params: Object,
    plain: {
      type: Boolean,
      default: !1
    },
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
    remote: {
      type: Boolean,
      default: !1
    },
    sort: Boolean | String,
    options: Array | Object
  },
  data() {
    return {
      loading: !1,
      _options: [],
      list: []
    };
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        const e = W(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = $e(this.options[s], this), t._remark_ = xe(this.options[s], this);
        }), this._options = se(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: W,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = se(this._options);
      const t = !!this.$slots.custom;
      this.list = se(this._options.filter((s) => {
        let l = s.text;
        return t || (l += s._main_ + s._remark_), l.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Me(this.service.restful, e, this);
    }
  }
}, gl = { key: 1 }, bl = { class: "main" }, _l = { class: "remark" };
function yl(e, t, s, l, i, n) {
  const o = u("el-select-v2");
  return d(), f(o, b({
    class: ["pc-x-select-v2", s.plain ? "x-select-v2--plain" : ""],
    loading: i.loading
  }, e.$attrs, {
    options: i.list,
    props: { label: "text" },
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || n.filter,
    onKeyup: Fe(n.handleRemote, ["enter"])
  }), {
    default: c(({ item: a, index: r }) => [
      e.$slots.custom ? V(e.$slots, "custom", {
        key: 0,
        option: a,
        raw: a.raw
      }, void 0, !0) : (d(), w("span", gl, [
        j("span", bl, A(a._main_), 1),
        j("span", _l, A(a._remark_), 1)
      ]))
    ]),
    _: 3
  }, 16, ["class", "loading", "options", "filterable", "remote", "filter-method", "onKeyup"]);
}
const wl = /* @__PURE__ */ O(fl, [["render", yl], ["__scopeId", "data-v-70bc3765"]]), Ze = {
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
  },
  special: {
    text: "特殊值",
    value: "special"
  }
}, vl = [{
  text: "NULL",
  value: "NULL"
}, {
  text: "空文本",
  value: "BLANK"
}, {
  text: "非NULL",
  value: "NOT_NULL"
}, {
  text: "非空文本",
  value: "NE_BLANK"
}], U = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  XRadios: ["eq", "ne", "special"],
  XCheckboxs: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"],
  universal: ["eq", "ne", "gt", "gte", "lt", "lte", "in", "like", "notIn", "notLike", "between", "special"]
};
U["x-select"] = U.XSelect;
U.XSelectV2 = U.XSelect;
U["x-select-v2"] = U.XSelect;
U["x-radios"] = U.XRadios;
U["x-checkboxs"] = U.XCheckboxs;
U["el-date-picker"] = U.ElDatePicker;
U["el-input-number"] = U.ElInputNumber;
U["el-input"] = U.ElInput;
function Sl() {
  const e = window.isMobile ? "small" : "", {
    $attrs: t,
    config: s,
    columns: l,
    visible: i,
    conditions: n,
    expression: o,
    handleSearch: a,
    handleReset: r,
    handleAdd: h,
    handleDelete: m,
    handleSelectField: S,
    handleSelectOp: y
  } = this;
  return p(u("x-dialog"), b({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: t.title || "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": t["submit-text"] || "查询"
  }, {
    modelValue: i,
    "onUpdate:modelValue": (_) => this.visible = _,
    onCancel: r,
    onSubmit: a
  }), {
    default: () => [s.traditional ? null : p(u("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: h
    }, {
      default: () => [x("新增条件")]
    }), p("div", {
      class: "conditions"
    }, [n.map((_, $) => p("div", {
      class: "condition flex-center",
      key: _.no
    }, [s.traditional ? null : p(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => m($)
    }, {
      default: () => [x("X")]
    }), s.traditional ? null : p("span", {
      class: "title"
    }, [_.no]), p("div", {
      class: "expression"
    }, [s.traditional ? p(u("el-input"), {
      modelValue: _.item.label,
      readonly: !0
    }, null) : p(u("pc-x-select"), {
      modelValue: _.prop,
      onChange: (T) => S(_, T),
      options: l,
      text: "label",
      value: "prop"
    }, null), p(u("pc-x-select"), {
      modelValue: _.op,
      onChange: (T) => y(_, T),
      options: _.ops
    }, null), p("div", {
      class: "value-container"
    }, [kl(this, _)])])]))]), s.traditional ? null : p(u("el-input"), b({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: o,
      "onUpdate:modelValue": (_) => this.expression = _
    }), null)]
  });
}
function kl(e, t) {
  const s = (i) => Z(u((i == null ? void 0 : i.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (n) => t.value = n
  }, i)), l = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? p("div", {
    class: "col-2"
  }, [s({
    ...l,
    modelValue: t.value[0],
    "onUpdate:modelValue": (i) => t.value[0] = i
  }), s({
    ...l,
    modelValue: t.value[1],
    "onUpdate:modelValue": (i) => t.value[1] = i
  })]) : ["in", "notIn"].includes(t.op) ? (l.multiple = !0, s(l)) : t.op === "special" ? s({
    ...l,
    component: "x-select",
    placeholder: "请选择特殊值",
    options: vl
  }) : s();
}
const { storage: ye } = StardustBrowser, { deepCopy: Cl } = StardustJs.funcs, $l = {
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
    this.init();
  },
  render: Sl,
  methods: {
    init() {
      const e = this.uid && ye.local.getJson(this.key, this.config) || this.config;
      this.initConfig(Cl(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      ye.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: s, component: l, ...i } = e;
          return i;
        }),
        expression: this.expression
      });
    },
    initConfig(e) {
      var t, s;
      (t = e.conditions) == null || t.forEach((l) => {
        const { prop: i, op: n, value: o, universal: a } = l;
        l.item = this.columns.find((r) => r.prop === i), this.handleSelectField(l, i), this.handleSelectOp(l, n), l.value = o, l.ops = U[a ? "universal" : l.component].map((r) => Ze[r]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((l) => l.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        N({ type: "warning", message: t.toString() });
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, e.page = 1, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      ye.local.remove(this.key), Object.assign(this, {
        conditionNo: 1,
        conditions: [],
        expression: ""
      }), this.init();
    },
    calcParams() {
      const e = this.calcTree();
      if (!e)
        return;
      const t = (l, i) => {
        const n = [], o = "[Op." + l.type + "]";
        i[o] = n;
        for (let a of l.items)
          if (typeof a == "string") {
            const r = this.conditions.find((h) => h.no === a * 1);
            if (r) {
              if (!this.checkFilled(r)) {
                if (this.config.traditional || this.config.ignoreUnfilled)
                  continue;
                throw "条件不完整: " + a;
              }
            } else
              throw "条件不存在: " + a;
            n.push(this.parseCondition(r));
          } else {
            const r = {};
            n.push(r), t(a, r);
          }
        n.length || delete i[o];
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((i) => i.trim()), s = (i, n) => {
        for (; n.length; ) {
          const o = n.shift();
          if (["and", "or"].includes(o)) {
            if (i.type && i.type !== o)
              throw "串联不同逻辑表达式请使用小括号区分";
            i.type = o;
          } else if (o === "(") {
            const a = { type: "", items: [] };
            i.items.push(a), a._parent = i, s(a, n);
            break;
          } else
            o === ")" ? (s(i._parent, n), delete i._parent) : i.items.push(o);
        }
      }, l = { type: "", items: [] };
      return s(l, t), l.type = l.type || "and", l;
    },
    parseCondition(e) {
      let { prop: t, op: s, value: l } = e;
      const i = {};
      if (s === "special") {
        const n = l.startsWith("NOT_"), o = l.startsWith("NE_");
        return l.includes("NULL") ? l = null : l.includes("BLANK") && (l = ""), n ? l = { "[Op.not]": l } : o && (l = { "[Op.ne]": l }), i[t] = l, i;
      }
      return (s === "like" || s === "notLike") && (l = "%" + l + "%"), i[t] = {
        [`[Op.${s}]`]: l
      }, i;
    },
    checkFilled(e) {
      if (!e.prop || !e.op)
        return !1;
      const t = Array.isArray(e.value) ? e.value : [e.value];
      return t.length && t.every((s) => typeof s != "string" || s.length);
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
      e.value = "", e.prop = t, e.item = this.columns.find((D) => D.prop === e.prop);
      const { options: s, type: l, formAttrs: i = {} } = e.item, n = { ...e.item, ...i }, {
        comp: o,
        universal: a,
        visible: r,
        canAdd: h,
        canEdit: m,
        required: S,
        slot: y,
        span: _,
        tableAttrs: $,
        formAttrs: T,
        tagTypes: g,
        tagValues: C,
        width: F,
        minWidth: z,
        disabled: H,
        readonly: I,
        ...E
      } = n;
      E.clearable ?? (E.clearable = !0), e.config = E, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = U[a ? "universal" : e.component].map((D) => Ze[D]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", E.type = "date"), E.type === "textarea" && delete E.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, Le = /* @__PURE__ */ O($l, [["__scopeId", "data-v-872870a1"]]), xl = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...X.props(),
    mode: {
      type: String,
      default: "card"
    },
    platform: String,
    "max-height": String,
    height: String,
    slotRenderers: Object
  },
  emits: [
    ...X.emits()
  ],
  components: { Searcher: Le },
  data() {
    return {
      popupVisible: !1,
      scope: {},
      selected: [],
      settings: {},
      checked: null,
      actionSheetVisible: !1
    };
  },
  computed: {
    ...X.computed,
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
    },
    actions() {
      const e = this.$route.path.slice(1).replaceAll("/", ":"), t = this.$store.acl.buttons.map((s) => s.perms).filter((s) => s.startsWith(e)).map((s) => s.split(":").pop());
      return [
        { name: "操作", disabled: !0 },
        { name: "详情" },
        { name: "编辑", color: "#07c160", domid: "edit" },
        { name: "删除", color: "#eb6f6f", domid: "delete" }
      ].filter((s) => !s.domid || t.includes(this.domids[s.domid]));
    }
  },
  watch: {
    selected: {
      handler(e) {
        const t = [];
        e.forEach((s, l) => {
          s && t.push(this._data[l]);
        }), this.handleSelectionChange(t);
      },
      deep: !0
    }
  },
  created() {
    window.v = this, this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this, this.table.ref = this), this.$emit("update:tref", this);
  },
  methods: {
    ...X.methods,
    handleShowDetail(e, t) {
      this.scope = { row: e, $index: t }, this.popupVisible = !0;
    },
    calcTitle(e) {
      return typeof this._attrs.title == "function" ? this._attrs.title(e) : e[this.cols[0].prop];
    },
    handleEdit() {
      this._emit("edit", this.scope);
    },
    handleDelete() {
      this._emit("delete", this.scope);
    },
    handleClickCard(e) {
      this.hasSelection ? this.selected[e] = !this.selected[e] : this.hasRadio && this.handleCheckedChange({ target: { value: e } });
    },
    handleShowActionSheet(e, t) {
      this.scope = { row: e, $index: t }, this.actionSheetVisible = !0;
    },
    handleSelectAction(e, t) {
      e.name === "详情" ? this.handleShowDetail(this.scope.row, this.scope.$index) : e.name === "编辑" ? this.handleEdit() : e.name === "删除" && this.handleDelete();
    },
    clearSelection() {
      this.selected = [], this.checked = null;
    }
  }
}, Vl = { class: "mobile-x-table" }, El = {
  key: 1,
  class: "card"
}, Al = ["onClick"], Ol = { class: "row-header flex-center" }, jl = ["value", "checked"], Tl = { class: "label" }, Fl = { class: "value" }, Dl = ["value", "checked"], Il = {
  key: 2,
  class: "index"
}, Rl = { class: "title" };
function Pl(e, t, s, l, i, n) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("x-icon"), m = u("van-cell"), S = u("van-list"), y = u("x-pagination"), _ = u("x-info"), $ = u("van-popup"), T = u("van-action-sheet");
  return d(), w("div", Vl, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(a, b({ key: 0 }, e._attrs, {
      domids: e.domids,
      onAdd: e._onAdd,
      onSearch: e._onSearch,
      onExport: e._onExport,
      onSearchExport: e._onSearchExport,
      onImport: e._onImport,
      onMultiDelete: e._onMultiDelete
    }), ae({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: c(() => [
          V(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: c(() => [
          V(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), w("div", El, [
      (d(!0), w(P, null, M(e._data, (g, C) => (d(), w("div", {
        key: C,
        class: "row",
        onClick: (F) => n.handleClickCard(C)
      }, [
        j("div", Ol, [
          n.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: i.selected[C],
            "onUpdate:modelValue": (F) => i.selected[C] = F,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = G(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
          p(h, {
            name: "ellipsis",
            class: "more",
            onClick: G((F) => n.handleShowActionSheet(g, C), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        n.hasRadio ? (d(), w("input", {
          key: 0,
          type: "radio",
          value: C,
          checked: C === i.checked,
          class: "radio",
          onClick: t[1] || (t[1] = G(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
        }, null, 40, jl)) : k("", !0),
        (d(!0), w(P, null, M(n.cols, (F, z) => (d(), w("div", {
          key: z,
          class: "field"
        }, [
          j("span", Tl, A(F.label) + ":", 1),
          j("span", Fl, A(e.calcValue(g, F)), 1)
        ]))), 128))
      ], 8, Al))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(S, b({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (g) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), w(P, null, M(e._data, (g, C) => (d(), f(m, {
          key: C,
          "is-link": "",
          onClick: (F) => n.handleShowDetail(g, C)
        }, {
          default: c(() => [
            n.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: i.selected[C],
              "onUpdate:modelValue": (F) => i.selected[C] = F,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = G(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
            n.hasRadio ? (d(), w("input", {
              key: 1,
              type: "radio",
              value: C,
              checked: C === i.checked,
              class: "radio",
              onClick: t[4] || (t[4] = G(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
            }, null, 40, Dl)) : k("", !0),
            n.hasIndex ? (d(), w("span", Il, A(C + 1), 1)) : k("", !0),
            j("span", Rl, A(n.calcTitle(g)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : k("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(y, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (g) => e._emit("search"))
    }, null, 8, ["query", "total"])) : k("", !0),
    p($, {
      show: i.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (g) => i.popupVisible = g),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        p(_, {
          data: i.scope.row,
          fields: n.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(T, {
      show: i.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (g) => i.actionSheetVisible = g),
      actions: n.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: n.handleSelectAction,
      onCancel: t[10] || (t[10] = (g) => i.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Bl = /* @__PURE__ */ O(xl, [["render", Pl], ["__scopeId", "data-v-84e93229"]]), Ml = {
  name: "Settings",
  props: {
    visible: Boolean,
    modelValue: Object
  },
  emits: ["update:modelValue", "reset", "sort-change"],
  data() {
    return {
      activeName: "columns",
      columns: [],
      sortableColumns: [],
      sorts: [],
      sortOptions: [
        { text: "升序", value: "asc" },
        { text: "降序", value: "desc" }
      ]
    };
  },
  watch: {
    modelValue: {
      handler(e) {
        this.columns = e.columns.map((t) => ({
          ...t,
          show: t.show !== !1,
          width: t.width || t.minWidth
        })), this.sortableColumns = this.columns.filter((t) => !t.virtual);
      },
      immediate: !0
    },
    sorts: {
      handler(e) {
        this.$emit("sort-change", e.map((t) => t.slice(0, 2)));
      },
      deep: !0
    }
  },
  async mounted() {
    var e;
    await ((e = window.DynamicLibs) == null ? void 0 : e.use("Sortable")), this.initDraggable();
  },
  beforeUnmount() {
    var e;
    (e = this.sortable) == null || e.destroy();
  },
  methods: {
    initDraggable() {
      const e = {};
      this.columns.forEach((t) => e[t.prop] = t), this.sortable = new window.Sortable(this.$refs.colsTable, {
        sort: !0,
        draggable: ".row",
        onEnd: (t) => {
          const s = [...t.to.querySelectorAll(".row")].map((l) => l.dataset.prop);
          this.columns = s.map((l) => e[l]), this.update();
        }
      });
    },
    handleAddSort() {
      this.sorts.push([this.sortableColumns[0].prop, "asc", this.sortableColumns[0].label]);
    },
    handleResetColumns() {
      const { columns: e, ...t } = this.modelValue;
      this.$emit("reset", t);
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
          const { prop: t, label: s, show: l, hide: i, width: n } = e;
          return { prop: t, label: s, show: l, hide: i, width: n };
        })
      });
    }
  }
}, Ll = (e) => (Oe("data-v-a2f0fe24"), e = e(), je(), e), Nl = {
  class: "table",
  ref: "colsTable"
}, Ul = ["data-prop"], ql = ["title", "onClick"], Xl = /* @__PURE__ */ Ll(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1)), zl = {
  class: "table",
  ref: "sortsTable"
}, Wl = ["data-prop"];
function Hl(e, t, s, l, i, n) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), h = u("ElCheckbox"), m = u("el-input-number"), S = u("el-tab-pane"), y = u("x-select"), _ = u("x-radios"), $ = u("el-tabs"), T = u("el-popover");
  return s.visible ? (d(), f(T, b({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: c(() => [
      p(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: c(() => [
      p($, {
        modelValue: i.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => i.activeName = g)
      }, {
        default: c(() => [
          p(S, {
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              p(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: n.handleResetColumns
              }, {
                default: c(() => [
                  x("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", Nl, [
                (d(!0), w(P, null, M(i.columns, (g) => (d(), w("div", {
                  key: g.prop,
                  "data-prop": g.prop,
                  class: "row flex-center"
                }, [
                  p(r, null, {
                    default: c(() => [
                      p(a)
                    ]),
                    _: 1
                  }),
                  p(h, {
                    modelValue: g.show,
                    "onUpdate:modelValue": (C) => g.show = C,
                    onChange: n.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  j("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (C) => n.handleToggle(g)
                  }, A(g.label), 9, ql),
                  p(m, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (C) => g.width = C,
                    onChange: n.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  Xl
                ], 8, Ul))), 128))
              ], 512)
            ]),
            _: 1
          }),
          p(S, {
            name: "sorts",
            label: "多列排序"
          }, {
            default: c(() => [
              p(o, {
                type: "primary",
                plain: "",
                icon: "Plus",
                onClick: n.handleAddSort
              }, {
                default: c(() => [
                  x("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", zl, [
                (d(!0), w(P, null, M(i.sorts, (g, C) => (d(), w("div", {
                  key: g[0],
                  "data-prop": g[0],
                  class: "row flex-center"
                }, [
                  p(y, {
                    modelValue: g[0],
                    "onUpdate:modelValue": (F) => g[0] = F,
                    options: i.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(_, {
                    modelValue: g[1],
                    "onUpdate:modelValue": (F) => g[1] = F,
                    options: i.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (F) => i.sorts.splice(C, 1)
                  }, null, 8, ["onClick"])
                ], 8, Wl))), 128))
              ], 512)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 16)) : k("", !0);
}
const bt = /* @__PURE__ */ O(Ml, [["render", Hl], ["__scopeId", "data-v-a2f0fe24"]]), { highdict: Kl } = StardustJs, Jl = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...X.props()
  },
  emits: [
    ...X.emits()
  ],
  components: { Searcher: Le, Settings: bt },
  data() {
    return {
      searcher: null,
      isMinus: !1,
      isFullscreen: !1,
      zoom: 1,
      checked: null,
      activeNames: ["name"],
      settings: {},
      params: {},
      _useCollapse: !1,
      dialog: {
        ...he()
      }
    };
  },
  computed: {
    ...X.computed
  },
  watch: {
    ...X.watch,
    settings: "saveSettings"
  },
  created() {
    this._useCollapse = this.useCollapse;
  },
  watch: {
    _uid: "initSettings",
    _columns: {
      deep: !0,
      immediate: !0,
      handler: "initSettings"
    }
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef, this.table.ref = this), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...X.methods,
    async handleShowPieDialog() {
      this.dialog.visible = !0, await this.$nextTick(), this.table && (this.table.chartRef = this.$refs.chartRef), await this.$refs.chartRef.init(), this.$refs.chartRef.initDatasource();
    },
    async handleChartDialogFullscreen() {
      await this.$nextTick(), this.$refs.chartRef.chart.resize();
    },
    async search() {
      const { remote: e, remoteMethod: t, search: s } = this._chartOption;
      if (s)
        return s();
      if (this.controller[t])
        return this.controller[t]();
      if (e && this.controller.getSearchParams) {
        const l = this.controller.getSearchParams(), i = await this.controller.search(l);
        let n = Kl.get(i, this.controller.listProp);
        return n = this.controller.formatList(this.controller._defaultFormatList(n, i), i), n;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, Yl = {
  key: 1,
  class: "collapse-title"
}, Gl = {
  key: 2,
  class: "collapse-title"
}, Ql = /* @__PURE__ */ j("span", null, "-", -1), Zl = ["value", "checked"], ea = { key: 1 };
function ta(e, t, s, l, i, n) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), m = u("el-image"), S = u("el-tag"), y = u("router-link"), _ = u("el-icon"), $ = u("el-table-column"), T = u("el-button"), g = u("el-dropdown-item"), C = u("el-dropdown-menu"), F = u("el-dropdown"), z = u("el-table"), H = u("x-pagination"), I = u("el-collapse-item"), E = u("el-collapse"), D = u("x-chart"), q = u("x-dialog"), B = ne("domid"), ee = ne("loading"), fe = ne("el-table-infinite-scroll");
  return d(), w(P, null, [
    j("div", {
      class: J(["pc-x-table", { fullscreen: i.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      p(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      p(E, {
        modelValue: i.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (v) => i.activeNames = v),
        class: J((i._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          p(I, {
            name: i.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : i.activeNames.length ? (d(), w("span", Yl, A(e.title), 1)) : (d(), w("span", Gl, [
                x(A(e.title) + "，当前第 ", 1),
                j("span", null, A(e._query.page), 1),
                x(" 页，展示 "),
                j("span", null, A(e._data.length), 1),
                x(" 条数据， 共 "),
                j("span", null, A(e._total || e._data.length), 1),
                x(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              V(e.$slots, "tools-top"),
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, b({ key: 0 }, e._attrs, {
                domids: e.domids,
                onAdd: e._onAdd,
                onKeywordsSearch: e._onKeywordsSearch,
                onSearch: e._onSearch,
                onExport: e._onExport,
                onSearchExport: e._onSearchExport,
                onImport: e._onImport,
                onMultiDelete: e._onMultiDelete
              }), ae({
                "tools-end": c(() => [
                  e.hideChart ? k("", !0) : (d(), f(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: n.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  j("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...v) => e.handleMinus && e.handleMinus(...v))
                  }, [
                    p(a, { name: "FullScreen" }),
                    Ql
                  ]),
                  p(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  p(r, {
                    modelValue: i.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (v) => i.settings = v),
                    visible: !e.hideSettings,
                    width: e._attrs["cols-popover-width"] || 500,
                    onSort: t[2] || (t[2] = (v) => e.$emit("sort", v)),
                    onReset: e.handleResetSettings,
                    onSortChange: e.handleSortChange
                  }, null, 8, ["modelValue", "visible", "width", "onReset", "onSortChange"])
                ]),
                _: 2
              }, [
                e.$slots["tools-prefix"] ? {
                  name: "tools-prefix",
                  fn: c(() => [
                    V(e.$slots, "tools-prefix")
                  ]),
                  key: "0"
                } : void 0,
                e.$slots["tools-suffix"] ? {
                  name: "tools-suffix",
                  fn: c(() => [
                    V(e.$slots, "tools-suffix")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["domids", "onAdd", "onKeywordsSearch", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
              V(e.$slots, "tools-bottom"),
              R((d(), f(z, b({
                ref: "tableRef",
                "element-loading-text": "加载中..."
              }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), w(P, null, M(e._visibleColumns, (v, Y) => (d(), f($, b(v, {
                    key: Y,
                    "min-width": v.minWidth,
                    align: v.align || e._attrs.tableAlign || "center",
                    resizable: v.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(v)
                  }), ae({ _: 2 }, [
                    ["selection", "index"].includes(v.type) ? void 0 : {
                      name: "default",
                      fn: c((L) => [
                        v.type === "radio" ? (d(), w("input", {
                          key: 0,
                          type: "radio",
                          value: L.$index,
                          checked: L.$index === i.checked,
                          onChange: t[3] || (t[3] = (...ge) => e.handleCheckedChange && e.handleCheckedChange(...ge))
                        }, null, 40, Zl)) : v.slot === "$image" ? (d(), f(m, b({
                          key: 1,
                          src: e._imageSrc(L, v),
                          "preview-src-list": e._imagePreviewSrcList(L, v),
                          "preview-teleported": ""
                        }, v.imageAttrs), null, 16, ["src", "preview-src-list"])) : v.slot === "$tag" ? (d(), f(S, {
                          key: 2,
                          type: e.calcTagType(L, v)
                        }, {
                          default: c(() => [
                            x(A(e.calcTagValue(L, v)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : v.slot === "$link" ? (d(), f(y, {
                          key: 3,
                          to: v.to(L)
                        }, {
                          default: c(() => [
                            x(A(e.calcLink(L.row, v)), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"])) : v.slot === "$icon" ? (d(), f(_, {
                          key: 4,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(Q(L.row[v.prop])))
                          ]),
                          _: 2
                        }, 1024)) : v.slot ? V(e.$slots, v.slot, {
                          key: 5,
                          scope: L,
                          column: v,
                          value: L.row[v.prop]
                        }) : e.slotAll ? V(e.$slots, "all", {
                          key: 6,
                          scope: L,
                          column: v,
                          value: L.row[v.prop]
                        }) : (d(), w(P, { key: 7 }, [
                          v.comp === "ElSwitch" || e.table.isRowEdit && L.row.isEditing && (v.visible !== !1 || v.canEdit) ? (d(), f(Q(v.comp || "ElInput"), b({ key: 0 }, { ...v, ...v.formAttrs }, {
                            modelValue: L.row[v.prop],
                            "onUpdate:modelValue": (ge) => L.row[v.prop] = ge,
                            disabled: !L.row.editable || !L.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), w("span", ea, A(e.calcValue(L.row, v)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? k("", !0) : (d(), f($, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((v) => [
                      V(e.$slots, "operates-prefix", { scope: v }),
                      e.operatesDropdown ? (d(), f(F, {
                        key: 0,
                        class: "operates-dropdown"
                      }, {
                        dropdown: c(() => [
                          p(C, { class: "operates-dropdown-menu" }, {
                            default: c(() => [
                              e.canEdit(v.row) ? (d(), f(g, { key: 0 }, {
                                default: c(() => [
                                  R((d(), f(T, b({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    onClick: (Y) => e._emit("edit", v)
                                  }), {
                                    default: c(() => [
                                      x(" 编辑 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [B, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canSave(v.row) ? (d(), f(g, { key: 1 }, {
                                default: c(() => [
                                  R((d(), f(T, b({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: v.row._loading,
                                    icon: "collection",
                                    onClick: (Y) => e._emit("row-edit", v)
                                  }), {
                                    default: c(() => [
                                      x(" 保存 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [ee, v.row._loading],
                                    [B, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canCancelEdit(v.row) ? (d(), f(g, { key: 2 }, {
                                default: c(() => [
                                  R((d(), f(T, b({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    onClick: (Y) => e._emit("cancel-edit", v)
                                  }), {
                                    default: c(() => [
                                      x(" 取消编辑 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [B, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canDelete(v.row) ? (d(), f(g, { key: 3 }, {
                                default: c(() => [
                                  R((d(), f(T, b({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    onClick: (Y) => e._emit("delete", v)
                                  }), {
                                    default: c(() => [
                                      x(" 删除 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [B, e.domids.delete]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: c(() => [
                          p(T, b({ type: "primary", ...e._attrs["operates-btn"] }, { icon: "arrow-down" }), {
                            default: c(() => [
                              x(" 操作 ")
                            ]),
                            _: 1
                          }, 16)
                        ]),
                        _: 2
                      }, 1024)) : k("", !0),
                      !e.operatesDropdown && e.canEdit(v.row) ? R((d(), f(T, b({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        onClick: (Y) => e._emit("edit", v)
                      }), {
                        default: c(() => [
                          x(" 编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [B, e.domids.edit]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canSave(v.row) ? R((d(), f(T, b({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: v.row._loading,
                        icon: "collection",
                        onClick: (Y) => e._emit("row-edit", v)
                      }), {
                        default: c(() => [
                          x(" 保存 ")
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [ee, v.row._loading],
                        [B, e.domids["row-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canCancelEdit(v.row) ? R((d(), f(T, b({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        onClick: (Y) => e._emit("cancel-edit", v)
                      }), {
                        default: c(() => [
                          x(" 取消编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [B, e.domids["cancel-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canDelete(v.row) ? R((d(), f(T, b({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        onClick: (Y) => e._emit("delete", v)
                      }), {
                        default: c(() => [
                          x(" 删除 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [B, e.domids.delete]
                      ]) : k("", !0),
                      V(e.$slots, "operates-suffix", { scope: v })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["infinite-scroll-disabled", "onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [ee, e._loading],
                [fe, e._onLoad]
              ]),
              e._query && e._total && !e.hidePagination ? (d(), f(H, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: n.onPaging
              }, null, 8, ["query", "total", "onSearch"])) : k("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? k("", !0) : (d(), f(q, {
      key: 0,
      modelValue: i.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (v) => i.dialog.visible = v),
      title: "图表",
      width: "96%",
      onFullscreenchange: n.handleChartDialogFullscreen
    }, {
      default: c(() => [
        p(D, {
          ref: "chartRef",
          height: e._chartHeight,
          option: e._chartOption,
          datasource: { columns: e._columns, search: n.search }
        }, null, 8, ["height", "option", "datasource"])
      ]),
      _: 1
    }, 8, ["modelValue", "onFullscreenchange"]))
  ], 64);
}
const sa = /* @__PURE__ */ O(Jl, [["render", ta]]), na = {
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
}, ia = { class: "mobile-x-table-tools" }, la = { key: 0 }, aa = { class: "tools" }, oa = { class: "tools-end" };
function ra(e, t, s, l, i, n) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), h = ne("domid");
  return d(), w("div", ia, [
    e.$attrs.onAdd ? R((d(), w("div", la, [
      p(o, {
        axis: "xy",
        magnetic: "x",
        icon: "plus",
        class: "flex-center x-table-search",
        style: { position: "fixed", top: "0", "font-size": "22px", width: "40px", height: "40px", "background-color": "#1989fa", "border-radius": "50%", color: "white" },
        onClick: t[0] || (t[0] = (m) => e.$emit("add"))
      })
    ])), [
      [h, s.domids.add]
    ]) : k("", !0),
    j("div", aa, [
      V(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? R((d(), f(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
        class: "x-table-search",
        onClick: t[1] || (t[1] = (m) => e.$emit("search"))
      }), {
        default: c(() => [
          p(a, { name: "search" }),
          x(" 高级查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : k("", !0),
      e.$attrs.onMultiEdit ? R((d(), f(r, b({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        class: "x-table-edit",
        onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          p(a, { name: "edit" }),
          x(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : k("", !0),
      e.$attrs.onMultiDelete ? R((d(), f(r, b({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        class: "x-table-multi-delete",
        onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          p(a, { name: "DeleteFilled" }),
          x(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : k("", !0),
      e.$attrs.onExport ? R((d(), f(r, b({ key: 3 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-export",
        onClick: t[4] || (t[4] = (m) => e.$emit("export"))
      }), {
        default: c(() => [
          p(a, { name: "printer" }),
          x(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : k("", !0),
      e.$attrs.onSearchExport ? R((d(), f(r, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-search-export",
        onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
      }), {
        default: c(() => [
          p(a, { name: "printer" }),
          x(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : k("", !0),
      e.$attrs.onImport ? R((d(), f(r, b({ key: 5 }, { type: "warning", ...s.importBtn }, {
        class: "x-table-import",
        onClick: t[6] || (t[6] = (m) => e.$emit("import"))
      }), {
        default: c(() => [
          p(a, { name: "UploadFilled" }),
          x(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : k("", !0),
      V(e.$slots, "tools-suffix", {}, void 0, !0),
      j("div", oa, [
        V(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const da = /* @__PURE__ */ O(na, [["render", ra], ["__scopeId", "data-v-dda9e446"]]), ca = {
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
  },
  data() {
    return {
      keywords: ""
    };
  }
}, ua = { class: "tools" }, ha = { class: "tools-end flex-center" };
function ma(e, t, s, l, i, n) {
  const o = u("el-input"), a = u("el-button"), r = u("el-card"), h = ne("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      j("div", ua, [
        V(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onKeywordsSearch ? R((d(), f(o, {
          key: 0,
          modelValue: i.keywords,
          "onUpdate:modelValue": t[0] || (t[0] = (m) => i.keywords = m),
          placeholder: e.$attrs["keywords-placeholder"] || "输入关键词搜索",
          clearable: "",
          class: "keywords-search",
          onKeyup: t[1] || (t[1] = Fe((m) => e.$emit("keywords-search", i.keywords.trim()), ["enter"]))
        }, null, 8, ["modelValue", "placeholder"])), [
          [h, s.domids["keywords-search"]]
        ]) : k("", !0),
        e.$attrs.onSearch ? R((d(), f(a, b({ key: 1 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          class: "x-table-search",
          onClick: t[2] || (t[2] = (m) => e.$emit("search"))
        }), {
          default: c(() => [
            x(" 高级查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : k("", !0),
        e.$attrs.onAdd ? R((d(), f(a, b({ key: 2 }, { type: "primary", ...s.addBtn }, {
          icon: "circle-plus-filled",
          class: "x-table-add",
          onClick: t[3] || (t[3] = (m) => e.$emit("add"))
        }), {
          default: c(() => [
            x(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : k("", !0),
        e.$attrs.onMultiEdit ? R((d(), f(a, b({ key: 3 }, { type: "warning", ...s.multiEditBtn }, {
          icon: "edit",
          class: "x-table-edit",
          onClick: t[4] || (t[4] = (m) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            x(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : k("", !0),
        e.$attrs.onMultiDelete ? R((d(), f(a, b({ key: 4 }, { type: "danger", ...s.multiDeleteBtn }, {
          icon: "DeleteFilled",
          class: "x-table-multi-delete",
          onClick: t[5] || (t[5] = (m) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            x(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : k("", !0),
        e.$attrs.onExport ? R((d(), f(a, b({ key: 5 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-export",
          onClick: t[6] || (t[6] = (m) => e.$emit("export"))
        }), {
          default: c(() => [
            x(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : k("", !0),
        e.$attrs.onSearchExport ? R((d(), f(a, b({ key: 6 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-search-export",
          onClick: t[7] || (t[7] = (m) => e.$emit("search-export"))
        }), {
          default: c(() => [
            x(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : k("", !0),
        e.$attrs.onImport ? R((d(), f(a, b({ key: 7 }, { type: "warning", ...s.importBtn }, {
          icon: "UploadFilled",
          class: "x-table-import",
          onClick: t[8] || (t[8] = (m) => e.$emit("import"))
        }), {
          default: c(() => [
            x(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : k("", !0),
        V(e.$slots, "tools-suffix", {}, void 0, !0),
        j("div", ha, [
          V(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const pa = /* @__PURE__ */ O(ca, [["render", ma], ["__scopeId", "data-v-714f3287"]]);
function _t(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !st(e);
}
const fa = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, l = (i) => {
    i ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const n = i ? e._data.slice() : [];
    e.handleSelectionChange(n);
  };
  return p(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: l
  }, null);
}, ga = (e, t) => {
  const {
    rowIndex: s,
    rowData: l
  } = e, i = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const n = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(n);
  };
  return p(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: i
  }, null);
}, ba = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, _a = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return p("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, pe = ([e, t, s, l, i, n]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return p(u("el-button"), b({
    type: l
  }, t._attrs[s + "-btn"], {
    icon: i,
    onClick: r
  }), _t(n) ? n : {
    default: () => [n]
  });
}, ya = (e, t) => {
  if (t.canEdit(e.rowData))
    return pe([e, t, "edit", "warning", "edit", "编辑"]);
}, wa = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return pe([e, t, "row-edit", "success", "collection", "保存"]);
}, va = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return pe([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Sa = (e, t) => {
  if (t.canDelete(e.rowData))
    return pe([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, ka = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: i = {}
  } = s;
  if (e.type === "selection")
    return (n) => ga(n, t);
  if (e.type === "index")
    return (n) => ba(n, t);
  if (e.type === "radio")
    return (n) => _a(n, t);
  if (e.slot) {
    if (i[e.slot])
      return i[e.slot];
    if (l[e.slot])
      return (n) => l[e.slot]({
        scope: {
          $index: n.rowIndex,
          row: n.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (n) => l.all({
      scope: {
        $index: n.rowIndex,
        row: n.rowData
      },
      column: e
    });
  return (n) => {
    const {
      rowData: o,
      column: a
    } = n;
    if (a.comp === "ElSwitch" || t.table.isRowEdit && o.isEditing && (a.visible !== !1 || a.canEdit)) {
      const m = (y) => {
        o[a.prop] = y;
      }, S = a.comp || "ElInput";
      return Z(u(S), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: m,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(n.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? p(u("el-tooltip"), {
      content: r
    }, _t(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Ca = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, i = e.map((n, o) => {
    const {
      tableAttrs: a = {}
    } = n, r = {
      ...n,
      key: n.prop,
      dataKey: n.prop,
      title: n.label,
      width: n.width || a.width || n.minWidth || a.minWidth || n.maxWidth || a.maxWidth,
      align: n.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = fa(t)), r.cellRenderer = ka(r, t), r;
  });
  return t.hideOperates || i.push({
    key: i.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 150,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(n) {
      return p("div", {
        class: "operates"
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, ya(n, t), wa(n, t), va(n, t), Sa(n, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), i;
}, $a = {
  convertColumnsForTableV2: Ca
}, xa = {
  name: "XTableV2",
  props: {
    ...X.props(),
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
    ...X.emits()
  ],
  components: { Searcher: Le, Settings: bt },
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
    ...X.computed
  },
  watch: {
    ...X.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...X.methods,
    convertColumnsForTableV2: $a.convertColumnsForTableV2
  }
}, Va = { key: 1 };
function Ea(e, t, s, l, i, n) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), m = u("el-table-v2"), S = u("el-auto-resizer"), y = u("x-pagination"), _ = u("el-collapse-item"), $ = u("el-collapse"), T = ne("loading");
  return d(), w("div", {
    class: J(["pc-x-table-v2", { fullscreen: i.isFullscreen }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (g) => e._emit("search", g))
    }, null, 8, ["uid", "columns", "config"]),
    p($, {
      modelValue: i.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (g) => i.activeNames = g),
      class: J((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        p(_, {
          name: i.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", Va, A(e.title), 1))
          ]),
          default: c(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, b({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiDelete: e._onMultiDelete
            }), ae({
              "tools-end": c(() => [
                p(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                p(r, {
                  modelValue: i.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (g) => i.settings = g),
                  visible: !e.hideSettings,
                  width: e._attrs["cols-popover-width"] || 500,
                  onReset: e.handleResetSettings
                }, null, 8, ["modelValue", "visible", "width", "onReset"])
              ]),
              _: 2
            }, [
              e.$slots["tools-prefix"] ? {
                name: "tools-prefix",
                fn: c(() => [
                  V(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  V(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
            p(S, {
              style: wt({ height: s.height })
            }, {
              default: c(({ width: g, height: C }) => [
                R((d(), f(m, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: n.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: g,
                  height: C
                }), ae({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: c(() => [
                      V(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: c(() => [
                      V(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: c(() => [
                      V(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [T, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(y, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (g) => e._emit("search"))
            }, null, 8, ["query", "total"])) : k("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Aa = /* @__PURE__ */ O(xa, [["render", Ea]]), we = ["selection", "radio"], Oa = {
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
      we.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !we.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (we.includes(t)) {
        let s = null;
        if (t === "selection" ? s = e.selection : t === "radio" && (s = e.checked), t === "selection" && !s.length || !s) {
          this.$message({ type: "warning", message: "未选择数据" }), this.handleCancel();
          return;
        }
        this.$emit("select", s), this.clearSelected();
      }
      this.handleCancel();
    },
    handleCancel() {
      this.$emit("update:visible", !1);
    },
    handleBeforeClose(e) {
      return e === "cancel" ? !0 : new Promise((t) => {
        const s = () => {
          this.handleCancel(), t(!0);
        };
        this._dialogAttrs["before-close"] ? this._dialogAttrs["before-close"](s) : s();
      });
    },
    clearSelected() {
      this.table.selection = [], this.table.checked = null, this.table.tableRef.clearSelection(), this.table.tableRef.$el.querySelectorAll('input[type="radio"]').forEach((t) => t.checked = !1);
    }
  }
}, ja = { class: "x-table-viewer" };
function Ta(e, t, s, l, i, n) {
  const o = u("x-dialog");
  return d(), w("div", ja, [
    p(o, b(n._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": n.handleBeforeClose,
      onSubmit: n.handleSubmit,
      onCancel: n.handleCancel
    }), {
      default: c(() => [
        (d(), f(Q(s.useTableV2 ? "x-table-v2" : "x-table"), b({
          tref: n.table.tableRef,
          "onUpdate:tref": t[0] || (t[0] = (a) => n.table.tableRef = a),
          table: n.table
        }, n._tableAttrs, {
          onSearch: s.controller.handleSearch
        }), null, 16, ["tref", "table", "onSearch"]))
      ]),
      _: 1
    }, 16, ["modelValue", "title", "before-close", "onSubmit", "onCancel"])
  ]);
}
const Fa = /* @__PURE__ */ O(Oa, [["render", Ta], ["__scopeId", "data-v-e6f36700"]]), Da = {
  name: "MobileXTags",
  props: {
    data: Array,
    text: {
      type: String,
      default: "text"
    }
  },
  emits: ["close"],
  computed: {
    _data() {
      var e;
      return (e = this.data) != null && e.length ? this.data.map((t) => typeof t == "object" ? t : { text: t }) : [];
    }
  }
}, Ia = { class: "mobile-x-tags" };
function Ra(e, t, s, l, i, n) {
  const o = u("van-tag");
  return d(), w("div", Ia, [
    (d(!0), w(P, null, M(n._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        x(A(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Pa = /* @__PURE__ */ O(Da, [["render", Ra], ["__scopeId", "data-v-d8beefdf"]]), Ba = {
  name: "PcXTags",
  props: {
    data: Array,
    text: {
      type: String,
      default: "text"
    }
  },
  emits: ["close"],
  computed: {
    _data() {
      var e;
      return (e = this.data) != null && e.length ? this.data.map((t) => typeof t == "object" ? t : { text: t }) : [];
    }
  }
}, Ma = { class: "pc-x-tags" };
function La(e, t, s, l, i, n) {
  const o = u("el-tag");
  return d(), w("div", Ma, [
    (d(!0), w(P, null, M(n._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        x(A(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Na = /* @__PURE__ */ O(Ba, [["render", La], ["__scopeId", "data-v-bd702be1"]]), Ua = {
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
        language: "zh_CN",
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
}, qa = { class: "x-tinymce" }, Xa = ["id", "innerHTML"];
function za(e, t, s, l, i, n) {
  return d(), w("div", qa, [
    j("textarea", {
      id: i.id,
      innerHTML: s.modelValue
    }, null, 8, Xa)
  ]);
}
const Wa = /* @__PURE__ */ O(Ua, [["render", za]]), Ha = {
  name: "XFileUploader",
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    accept: String,
    baseURL: String,
    needUpload: Boolean,
    action: String
  },
  emits: ["update:modelValue"],
  data() {
    return {
      disabled: !1,
      fileList: []
    };
  },
  computed: {
    actionUrl() {
      var e;
      return this.action || (this.baseURL || ((e = this.service) == null ? void 0 : e.API_BASE_URL)) + "/common/upload_files";
    },
    filepath() {
      const e = this.modelValue;
      return Array.isArray(e) ? e[0] : e;
    }
  },
  methods: {
    onSuccess(e, t, s) {
      var i;
      const l = ((i = this.service) == null ? void 0 : i.API_BASE_URL) + "/" + e.filename;
      this.$emit("update:modelValue", l);
    },
    async handleUploadAll() {
      this.disabled = !0;
      const e = new FormData();
      this.fileList.forEach((t) => e.append("file", t.raw));
      try {
        let s = (await this.service.request(this.actionUrl, {
          method: "POST",
          headers: this.$attrs.headers ?? {},
          data: e
        })).data.filename;
        s = Array.isArray(s) ? s : [s];
        const l = (this.baseURL || this.service.API_BASE_URL) + "/";
        s = s.map((i) => l + i), this.$emit("update:modelValue", s);
      } catch (t) {
        return this.$message.error(t.toString());
      }
    }
  }
}, Ne = (e) => (Oe("data-v-a3a105f3"), e = e(), je(), e), Ka = { class: "mask" }, Ja = {
  key: 0,
  class: "el-upload__text"
}, Ya = /* @__PURE__ */ Ne(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), Ga = /* @__PURE__ */ Ne(() => /* @__PURE__ */ j("br", null, null, -1)), Qa = /* @__PURE__ */ Ne(() => /* @__PURE__ */ j("br", null, null, -1)), Za = {
  key: 0,
  class: "path"
};
function eo(e, t, s, l, i, n) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), f(r, b({
    "file-list": i.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (h) => i.fileList = h),
    drag: "",
    disabled: i.disabled,
    action: n.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": n.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: c(() => [
      j("div", Ka, [
        p(o, { name: "upload-filled" }),
        i.disabled ? k("", !0) : (d(), w("div", Ja, [
          x(" 将文件拖到此处，或"),
          Ya,
          Ga,
          Qa,
          s.needUpload && !i.disabled && i.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: G(n.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              x(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : k("", !0)
        ]))
      ]),
      n.filepath ? (d(), w("div", Za, A(s.modelValue), 1)) : k("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const to = /* @__PURE__ */ O(Ha, [["render", eo], ["__scopeId", "data-v-a3a105f3"]]), so = {
  name: "XImageUploader",
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    action: String
  },
  emits: ["update:modelValue"],
  data() {
    return {
      fileList: [],
      previewingImage: {},
      dialogVisible: !1
    };
  },
  computed: {
    actionUrl() {
      var e;
      return this.action || ((e = this.service) == null ? void 0 : e.API_BASE_URL) + "/common/upload_files";
    },
    limit() {
      return this.$attrs.limit || (this.multiple ? 1e9 : 1);
    },
    images() {
      return this.fileList.map((e) => e.url);
    }
  },
  watch: {
    modelValue: {
      handler(e) {
        this.fileList = Array.isArray(e) ? e : e ? [{ url: e }] : [];
      },
      immediate: !0
    }
  },
  methods: {
    handleSelect() {
      this.$emit("update:modelValue", this.fileList);
    },
    handleRemove(...e) {
      var t, s;
      this.$emit("update:modelValue", this.fileList), (s = (t = this.$attrs)["on-remove"]) == null || s.call(t, ...e);
    },
    handlePreview(e) {
      this.previewingImage = e, this.dialogVisible = !0;
    },
    handleExceed(e, t) {
      N({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, no = ["src"];
function io(e, t, s, l, i, n) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("x-dialog");
  return d(), w(P, null, [
    p(r, b({
      "file-list": i.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (m) => i.fileList = m),
        n.handleSelect
      ],
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: n.limit,
      class: ["x-image-uploader", { disabled: e.$attrs.disabled || n.images.length >= n.limit }],
      "on-preview": n.handlePreview,
      "on-exceed": n.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1,
      "on-remove": n.handleRemove
    }), {
      default: c(() => [
        p(a, null, {
          default: c(() => [
            p(o)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "onUpdate:fileList", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload", "on-remove"]),
    p(h, {
      modelValue: i.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (m) => i.dialogVisible = m),
      actionsheet: "",
      title: "预览图片" + (i.previewingImage.name || "")
    }, {
      default: c(() => [
        j("img", {
          src: i.previewingImage.url,
          alt: "previewing-image",
          class: "previewing-image"
        }, null, 8, no)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const lo = /* @__PURE__ */ O(so, [["render", io], ["__scopeId", "data-v-0afe3ea6"]]), ve = {
  xautorows: Ht,
  mobilexbutton: Yt,
  pcxbutton: Zt,
  xchart: ds,
  mobilexcheckboxs: hs,
  pcxcheckboxs: gs,
  mobilexcol: ys,
  pcxcol: Ss,
  mobilexdialog: Vs,
  pcxdialog: js,
  xdistrictselect: Ds,
  mobilexform: Xs,
  pcxform: Ks,
  mobilexformitem: Qs,
  pcxformitem: Zs,
  mobilexicon: nn,
  pcxicon: rn,
  xinfo: $i,
  xlooper: Ai,
  mobilexpagination: Ti,
  pcxpagination: Ii,
  xpicker: Bi,
  mobilexradios: Ni,
  pcxradios: zi,
  mobilexrow: Ji,
  pcxrow: Zi,
  mobilexscan: sl,
  pcxscan: ll,
  mobilexselect: rl,
  pcxselect: pl,
  xselectv2: wl,
  mobilextable: Bl,
  pcxtable: sa,
  mobilextabletools: da,
  pcxtabletools: pa,
  xtablev2: Aa,
  xtableviewer: Fa,
  mobilextags: Pa,
  pcxtags: Na,
  xtinymce: Wa,
  xfileuploader: to,
  ximageuploader: lo
}, re = {};
for (let e in ve)
  re[ve[e].name] = ve[e];
const { ElInfiniteScroll: et } = window.ElementPlus || {}, ce = ".el-scrollbar__wrap", tt = (e, t) => {
  ao(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", l = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (l < 1 ? 1 : l) + "");
}, ao = (e, t, s) => {
  let l;
  s.forEach((i) => {
    l = e.getAttribute(i), l !== null ? t.setAttribute(i, l) : t.removeAttribute(i);
  });
}, oo = {
  name: "el-table-infinite-scroll",
  mounted(e, t, s, l) {
    const i = e.querySelector(ce);
    if (!i)
      throw new Error(`${ce} element not found.`);
    i.style.overflowY = "auto", setTimeout(() => {
      !e.style.height && !e.style.maxHeight && (i.style.height = "400px", console.warn("el-table height required, otherwise will set scrollbar default height: 400px")), tt(e, i), et.mounted(i, t, s, l);
    }, 0);
  },
  updated(e) {
    tt(e, e.querySelector(ce));
  },
  unmounted(e, ...t) {
    const s = e.querySelector(ce);
    et.unmounted(s, ...t);
  }
}, Se = {
  ElTableInfiniteScroll: oo
}, ro = (e) => ({
  name: e,
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
    return Z(re[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), Ve = (() => {
  const e = Object.keys(re), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = re[l]);
  for (const l of t)
    e.find((i) => /(pc|mobile)/i.test(i) && i.toLowerCase().includes(l.toLowerCase())) ? s[l] = ro(l) : s[l] = re[l];
  return s;
})(), co = (e, t) => {
  for (let s in Ve)
    e.component(s, Ve[s]);
  for (let s in Se)
    e.directive(Se[s].name, Se[s]);
}, ho = {
  version: "1.5.25",
  ...Ve,
  ...ht,
  ...Ut,
  install: co
};
export {
  mt as BaseController,
  ie as Confirm,
  pt as CrudController,
  N as Message,
  ue as Notify,
  Nt as TempCrudController,
  he as baseDialog,
  it as baseForm,
  Rt as baseModel,
  lt as baseTable,
  Ut as controllers,
  ho as default,
  kt as effects,
  W as formatOptions,
  Ct as formatPrecision,
  dt as initDefaultForm,
  ot as initDialog,
  Pt as initFields,
  De as initForm,
  rt as initFormRules,
  Bt as initModel,
  at as initTable,
  ct as isWhenMatched,
  ut as triggers,
  ht as utils,
  nt as validateForm
};
