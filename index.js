import { toRaw as pt, markRaw as se, nextTick as ae, watch as Ve, resolveComponent as u, openBlock as d, createBlock as f, mergeProps as b, createElementBlock as y, Fragment as B, renderList as N, withCtx as c, renderSlot as x, toDisplayString as O, useCssVars as Ge, resolveDirective as ne, withDirectives as R, createElementVNode as T, createTextVNode as C, createVNode as m, createCommentVNode as k, vShow as Me, pushScopeId as Ee, popScopeId as Ae, resolveDynamicComponent as Q, createSlots as le, withModifiers as G, normalizeClass as K, normalizeProps as Oe, h as Z, isVNode as Qe, guardReactiveProps as ft, normalizeStyle as gt } from "vue";
const bt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const i = e.getContext("2d");
  class n {
    constructor(E, F, U, M, ee, fe, _) {
      this.x = E, this.y = F, this.radius = U, this.color = M, this.vx = ee, this.vy = fe, this.ctx = _;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const l = () => i.clearRect(0, 0, t, s), o = (I) => Math.floor(Math.random() * I);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const I = i.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = w * 30), a >= 1 && (a = 1, r = -r, h = w * 30)), I.addColorStop(0, "rgba(250, 220, 20, 0.5)"), I.addColorStop(a, "rgba(20, 20, 20, 0.5)"), i.fillStyle = I, i.fillRect(0, 0, t, s);
  }, S = Math.floor(t / 100), v = Math.floor(s / 100), w = 20, V = Math.round(1e3 / w), j = Array.from({ length: 52 }).map(() => {
    const I = Math.floor(o(S + v) * 1.5 + o(5));
    let E = o(t), F = o(s);
    E = Math.min(Math.max(I, E), t - I), F = Math.min(Math.max(I, F), s - I);
    let U = o(2) ? (o(2) + 2) * S : (o(-1) - 2) * S, M = o(2) ? (o(2) + 2) * v : (o(-1) - 2) * v;
    return U = Math.floor(U / w), M = Math.floor(M / w), new n(
      E,
      F,
      I,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      U,
      M,
      i
    );
  });
  let g, $;
  e.addEventListener("mouseover", (I) => {
    g = I.pageX, $ = I.pageY;
  }), e.addEventListener("mousemove", (I) => {
    if (g === void 0) {
      g = I.pageX, $ = I.pageY;
      return;
    }
    const E = I.pageX - g, F = I.pageY - $;
    j.forEach((U) => {
      U.x += E / w, U.y += F / w;
    }), g = I.pageX, $ = I.pageY;
  });
  let D = Date.now(), X = null;
  const z = () => {
    Date.now() - D >= V && (l(), p(), j.forEach((I) => I.update()), D = Date.now()), X = requestAnimationFrame(z);
  };
  return X = requestAnimationFrame(z), () => cancelAnimationFrame(X);
}, _t = ({
  text: e,
  gap: t,
  fontSize: s,
  color: i,
  width: n = window.innerWidth,
  height: l = window.innerHeight,
  drawMode: o = "fill"
}) => {
  const a = document.createElement("canvas");
  a.width = n, a.height = l;
  const r = a.getContext("2d");
  r.font = `${s}px Arial`, r[o + "Style"] = i;
  const p = r.measureText(e).width + t, S = s + t;
  for (let v = t / 2; v < l; v += S)
    for (let w = t / 2; w < n; w += p)
      r[o + "Text"](e, w, v);
  return a;
}, yt = {
  pop: bt,
  createWatermark: _t
}, Ze = async (e) => {
  var i, n;
  const t = await ((i = e.formRef) == null ? void 0 : i.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((l) => {
    var o, a;
    return ((o = l.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = l.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((l) => Ze(l.form)));
  return t && s.every((l) => l);
}, vt = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, H = (e, t) => {
  const s = e.__v_isRef ? e.value : pt(e), { text: i = "text", value: n = "value" } = t, l = s.map((a) => typeof a == "object" ? { text: a[i], value: a[n], disabled: a.disabled, raw: se(a) } : { text: a, value: a });
  if (!t.sort)
    return l;
  const o = typeof t.sort == "string" ? t.sort : t.text || "text";
  return l.sort((a, r) => a[o].localeCompare(r[o]));
}, { ElMessage: wt, ElNotification: St, ElMessageBox: kt } = window.ElementPlus || {}, { showToast: $t, showNotify: Ct, showConfirmDialog: xt } = window.vant || {}, W = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? ((i === "error" || i === "warning") && (t.type = "fail"), t["z-index"] || (t["z-index"] = 1e6), $t(t)) : wt({
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
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? (i === "error" && (t.type = "danger"), Ct(t)) : St({
    showClose: !0,
    ...t
  });
}, ie = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = xt(e) : t = kt.confirm(
    e.message || "",
    e.title || "",
    {
      draggable: !0,
      ...e,
      type: e.type || "info",
      confirmButtonText: e.confirmButtonText || "确定",
      cancelButtonText: e.cancelButtonText || "取消"
    }
  ), t.then(() => e.distinguishCancelAndClose ? "confirm" : !0).catch((i) => e.distinguishCancelAndClose ? i : !1);
};
for (let e of ["success", "warning", "info", "error", "primary", "loading", "fail", "html"])
  W[e] = W[e[0]] = (t) => W({ type: e, ...typeof t != "string" ? t : { message: t } }), ue[e] = ue[e[0]] = (t) => ue({ type: e, ...typeof t != "string" ? t : { message: t } }), ie[e] = ie[e[0]] = (t) => ie({ type: e, ...t });
const Vt = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    i.matched.length ? l() : l("/404");
  });
}, Et = (e, t, s) => {
  e.afterEach((i, n) => {
    document.title = t.app.sitename + "-" + i.matched[i.matched.length - 1].meta.title;
  });
}, At = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    var o;
    return i.meta.acl === !1 || (o = i.meta) != null && o.visitable || t.acl.paths.includes(i.path) ? l() : (W.e("无权访问页面: " + i.path), l(t.acl.paths[0] || "/404"));
  }), ae(() => {
    let i = !1;
    Ve(() => t.acl.menus, (n) => {
      if (!i) {
        if (!n.length)
          return;
        i = !0;
      }
      const l = t.acl.paths, o = (a, r) => {
        var p, S, v, w, V, j, g;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (p = a.children) == null || p.forEach(($) => {
          var D;
          $.meta || ($.meta = {}), (D = $.meta).acl || (D.acl = !1), o($, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((v = a.meta).hidden ?? (v.hidden = (S = r.meta) == null ? void 0 : S.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((V = a.meta).visitable ?? (V.visitable = (w = r.meta) == null ? void 0 : w.visitable), a.meta = { ...a.meta })), (j = a.children) == null || j.forEach(($) => o($, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !l.includes(h), (g = a.children) != null && g.some(($) => $.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, Ot = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    i.name === "Login" && t.getters.logined && i.query.redirectTo ? l(i.query.redirectTo) : l();
  });
}, jt = {
  check404: Vt,
  setTitle: Et,
  checkRolesPages: At,
  redirectTo: Ot
}, et = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), tt = (e = {}) => ({
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
  _isBaseTable: !0
}), he = () => ({
  ...et(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), Tt = ({
  table: e = {},
  dialog: t = {},
  columns: s = [
    { fixed: "left", type: "selection" },
    { type: "_index" }
  ],
  query: i = {},
  form: n = {}
} = {}) => ({
  table: {
    ...tt(i),
    ...e,
    columns: s
  },
  dialog: {
    ...he(),
    ...t,
    form: n
  }
}), { funcs: Se } = StardustJs, Ft = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let i of s)
    i.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[i.slice(3)] = t[i], delete t[i]) : i.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[i.slice(3)] = t[i], delete t[i]);
  return t;
}), Dt = (e, t) => {
  for (let s in e) {
    const i = e[s];
    !i || typeof i != "object" || (s === "table" && e[s]._isBaseTable && st(i, t), s === "dialog" && e[s]._isBaseDialog && nt(i, t), s === "form" && e[s]._isBaseForm && je(i, t));
  }
  return e;
}, st = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), nt = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), je(e, t), e), je = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((i) => i.visible !== !1)), lt(e.form, e.formItems), e.initialForm = Se.deepCopy(e.form), e.initialFormRules = Se.deepCopy(e.formRules), Ve(() => e.formItems, () => {
  it(e);
}, { immediate: !0, deep: !0 }), e), it = (e) => {
  const { formItems: t, initialFormRules: s } = e, i = t.filter((l) => {
    let { formAttrs: o = {}, required: a = !1 } = l;
    return a = "required" in o ? o.required : a, !l.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(l.prop) && a !== !1;
  }).map((l) => l.prop);
  if (Object.assign(e.formRules, Se.deepCopy(s)), Object.keys(e.formRules).forEach((l) => {
    l in s || delete e.formRules[l];
  }), !i.length)
    return;
  const n = {};
  return i.forEach((l) => {
    if (e.formRules[l])
      return;
    const o = t.find((w) => w.prop === l), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = at[a], h = [], p = "options" in o, v = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${p ? "选择" : "输入"}${(o == null ? void 0 : o.label) || l}` };
    o.validator && (v.validator = o.validator), o.asyncValidator && (v.asyncValidator = o.asyncValidator), o.comp ? h.push({ ...v, trigger: r.change }) : h.push({ ...v, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...v, trigger: r.blur }), n[l] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, lt = (e, t, s = !0) => {
  const i = {};
  return t.forEach((n) => {
    var h, p;
    let l = "";
    const { type: o, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && o === "number" || n.comp === "ElInputNumber")
      l = 0;
    else if (n.comp === "ElSwitch")
      l = !1;
    else if (a && ((h = n.comp) != null && h.endsWith("XCheckboxs") || (p = n.comp) != null && p.endsWith("x-checkboxs") || r))
      l = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const S = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + S), n["end-placeholder"] || (n["end-placeholder"] = "结束" + S), l = [];
    }
    i[n.prop] = l;
  }), Object.assign(e, { ...i, ...e }), e;
}, ot = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [i, n] = e.split(s);
  n = n.split("|");
  let l = t[i];
  typeof l == "number" ? l += "" : typeof l == "string" && (l = l.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? l.startsWith(a) : o === "*=" ? l.includes(a) : o === "$=" ? l.endsWith(a) : o === "~=" ? !l.includes(a) : o === "!=" ? l !== a : a === l);
}, at = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, rt = {
  effects: yt,
  validateForm: Ze,
  formatPrecision: vt,
  formatOptions: H,
  Message: W,
  Notify: ue,
  Confirm: ie,
  middlewares: jt,
  baseForm: et,
  baseTable: tt,
  baseDialog: he,
  baseModel: Tt,
  initFields: Ft,
  initModel: Dt,
  initTable: st,
  initDialog: nt,
  initForm: je,
  initFormRules: it,
  initDefaultForm: lt,
  isWhenMatched: ot,
  triggers: at
};
class dt {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const i = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => i }
      }), this._initLifeCycles();
    }
    ae(this.onInit);
  }
  onInit() {
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
    return rt;
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
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.getOwnPropertyDescriptors(this.__proto__), i = Object.keys(s).filter((o) => o !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...i])).filter((o) => typeof this[o] == "function").forEach((o) => {
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
  _getMethods() {
    return [
      "_bindMethods",
      "_initLifeCycles",
      "_getMethods",
      "onInit"
    ];
  }
}
const { funcs: Ne, highdict: Le, dates: be } = StardustJs, { file: Pe, excel: de } = StardustBrowser;
class ct extends dt {
  constructor(t) {
    super(t);
    const { model: s, table: i, dialog: n, dbModelName: l = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = i || (s == null ? void 0 : s.table), this.dialog = n || (s == null ? void 0 : s.dialog), this.dbModelName = l, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], ae(() => {
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
    var t, s, i, n;
    if ((t = this.model) != null && t.form && ((s = this.dialog) != null && s.form))
      throw "conflict of model.form and dialog.form";
    return ((i = this.model) == null ? void 0 : i.form) || ((n = this.dialog) == null ? void 0 : n.form);
  }
  _getMethods() {
    return [
      ...super._getMethods(),
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
    this.table && this.handleSearch();
  }
  async handleSearch(t, { isInfinite: s = !1 } = {}) {
    if (this.table.isInfinite = s, this.table.loading || !await this.beforeSearch(t))
      return;
    t = this.getSearchParams(t), this.table.loading = !0;
    const i = await this.search(t);
    let n = Le.get(i, this.listProp);
    return n = this.formatList(this._defaultFormatList(n, i), i), Object.assign(this.table, {
      list: n,
      total: i.total,
      loading: !1
    }), this.afterSearch(n, t, i), i;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await ae(), await Ne.sleep(50), this._clearValidate(), this.afterAdd());
  }
  async handleEdit({ $index: t, row: s }) {
    var i;
    await this.beforeEdit({ $index: t, row: s }) && (this.table.isRowEdit ? (s.originData = JSON.stringify(s), s.isEditing = !0) : (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !0,
      editingIndex: t,
      editingRow: s,
      form: {
        ...this.dialog.form,
        ...s
      }
    }), await ae(), (i = this.dialog.formRef) == null || i.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (!await this.beforeDelete({ $index: t, row: s }))
      return;
    if (await ie.w({ message: "确定要删除吗？", title: "警告" })) {
      const n = this.getDeleteParams(s), l = await this.remove(n, s);
      l.err || (this.afterDelete(l), this.handleSearch());
    }
  }
  async handleRowEdit({ row: t }) {
    if (t._loading)
      return;
    t._loading = !0;
    const s = this.getUpdateParams(t);
    if (!await this._checkAllNone(s)) {
      t._loading = !1;
      return;
    }
    try {
      await this.update(s, t[this.idField]);
    } catch (i) {
      this._showError(i.data.err), t._loading = !1;
      return;
    }
    delete t.originData, t.isEditing = !1, t._loading = !1;
  }
  async handleCancelEdit({ row: t }) {
    Object.assign(t, JSON.parse(t.originData)), delete t.originData, t.isEditing = !1;
  }
  async handleExport(t = this.exportType, s = document.title) {
    if (this._isExporting)
      return;
    if (t instanceof Event && (t = ""), t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      W("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const { list: i, selection: n, ref: l } = this.table;
    let o = n.length > 0 ? n : i;
    o = Ne.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(l._visibleColumns, "current"), r = a.map((v) => v.prop), h = a.map((v) => v.label);
    o = o.map((v) => r.map((w) => v[w]));
    let p = null;
    t === "csv" ? p = de.export2Csv : p = de.export2Excel;
    let S = { header: h, data: o, filename: s };
    S = await this.processExporting(S), p(S), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      W("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const i = await this.dbTable.search(this.getSearchExportParams());
    let n = i.data;
    n = this.formatList(n, i), n = this.processExportingData(n, "search");
    const l = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = l.map((p) => p.prop), a = l.map((p) => p.label);
    n = n.map((p) => o.map((S) => p[S]));
    let r = null;
    t === "csv" ? r = de.export2Csv : r = de.export2Excel;
    let h = { header: a, data: n, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    var l, o;
    const t = await Pe.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), i = await Pe.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      await ((l = window.DynamicLibs) == null ? void 0 : l.use("Papa")), n = window.Papa.parse(i, { header: !0 }).data;
    else {
      await ((o = window.DynamicLibs) == null ? void 0 : o.use("XLSX"));
      const a = window.XLSX.read(i, {}), r = Object.values(a.Sheets);
      n = XLSX.utils.sheet_to_json(r[0]);
    }
    if (n.length > 0) {
      const a = {};
      this.table.columns.forEach((h) => a[h.label] = h.prop);
      const r = Object.keys(n[0]);
      n = n.map((h) => {
        const p = {};
        return r.forEach((S) => p[a[S]] = h[S]), p;
      });
    }
    n = this.processImportingData(n), await this.dbTable.func(["bulkCreate", n]), W.s("导入成功"), this.handleSearch();
  }
  async handleMultiDelete() {
    const { selection: t } = this.table;
    if (!t.length) {
      W.w("尚未选择要删除的数据");
      return;
    }
    if (!await ie.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
      return;
    const i = t.map((n) => n[this.idField]);
    await this.dbTable.func(["destroy", {
      where: {
        [this.idField]: {
          "[Op.in]": i
        }
      }
    }]), this.handleSearch();
  }
  async handleSave(t) {
    if (t = t instanceof Event ? this.form : t, this._isSubmitting)
      return;
    const s = this.model.formRef || this.dialog.formRef;
    if (!await this._validateForm(s))
      return;
    this._isSubmitting = !0;
    const i = this.getAddParams(t);
    if (!await this._checkAllNone(i)) {
      this._isSubmitting = !1;
      return;
    }
    let n = null;
    try {
      t[this.idField] ? n = await this.update(i, t[this.idField]) : n = await this.add(i);
    } catch (l) {
      this._showError(l.data.err), this._isSubmitting = !1;
      return;
    }
    return this._isSubmitting = !1, n.err || W.s("保存成功"), this.router.go(-1), n;
  }
  async handleSubmit(t) {
    if (t = t instanceof Event ? null : t, this._isSubmitting || !this.dialog.visible)
      return !1;
    this._isSubmitting = !0;
    const s = t || this.form;
    if (!t && ((this.dialog.shouldTrim || !0) && this._trimForm(), !await this._validateForm()))
      return this._isSubmitting = !1, !1;
    let i = null;
    try {
      if (this.dialog.isEditing) {
        const n = this.getUpdateParams(s);
        if (!await this._checkAllNone(n))
          return this._isSubmitting = !1, !1;
        i = await this.update(n, this.dialog.editingRow[this.idField]);
      } else {
        const n = this.getAddParams(s);
        if (!await this._checkAllNone(n))
          return this._isSubmitting = !1, !1;
        i = await this.add(n);
      }
    } catch (n) {
      return this._showError(n.data.err), this._isSubmitting = !1, !1;
    }
    return this.dialog.visible = !1, this._isSubmitting = !1, i.err || this.handleSearch(), this.afterSubmit(i), i;
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
      const { prop: s, order: i } = t;
      this.table.query.order = !s || !i ? [] : [
        [s, i.slice(0, -6)]
      ];
    }
    this.handleSearch();
  }
  async handleLoad() {
    const { query: t } = this.table;
    if (!this.table.list.length)
      return await this.handleSearch(), t.page * t.limit >= this.table.total && (this.table.finished = !0), this.table.moreLoading = !1;
    const { loading: s, total: i } = this.table;
    if (s || !i || this.table.finished)
      return this.table.moreLoading = !1;
    if (t.page * t.limit >= i)
      return this.table.moreLoading = !1, this.table.finished = !0;
    this.table.isInfinite = !0, this.table.loading = !0, t.page++;
    const n = this.table.list.slice();
    await this.handleSearch({}, { isInfinite: !0 }), this.table.loading = !0, await this.$sleep(50), this.table.list = n.concat(this.table.list), this.table.loading = !1, this.table.moreLoading = !1;
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
    const s = Object.keys(this.dialog.initialForm), i = {};
    return s.length ? s.forEach((n) => i[n] = t[n]) : Object.assign(i, t), this.dialog.formItems.forEach((n) => {
      let l = i[n.model || n.prop];
      n.type === "number" ? l = this.uiUtils.formatPrecision(l, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? l = be.format(l) : (!n.type || n.type === "date") && (l = be.format(l, "", !1))), i[n.model || n.prop] = l;
    }), i;
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
    return Object.assign({}, this.getSearchParams(), {
      page: 1,
      limit: -1,
      attributes: this.processExportingColumns(this.table.ref._visibleColumns, "search").map((t) => t.prop)
    });
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
  afterSearch(t, s, i) {
    const n = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && n !== this._lastSearchParams) {
      const { page: l, limit: o, order: a, count: r, ...h } = s;
      this.dbTable.func(["count", h]).then((p) => this.table.total = p.data);
    }
    return t;
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
    const i = {};
    s.forEach((n) => i[n] = t[n]), await this.update(i, t[this.idField]), this.table.loading = !1;
  }
  _defaultFormatList(t, s) {
    const { columns: i, query: n } = this.table, { page: l, limit: o } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (l - 1) * o + r + 1;
    }), i.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: p, formatter: S, autoFill: v } = a.tableAttrs || {}, { modelName: w } = a.formAttrs || {};
      if (w && v)
        t.forEach((V) => V[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const j = Ve(() => a.options, (g, $) => {
          const D = $ ? this.table.list : t, X = It(a);
          D.forEach((z, I) => {
            const E = z[r];
            z[`_formatted_${r}`] = X[E] || (S == null ? void 0 : S(E, z, I)) || E;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(j);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const i = [...new Set(t.map((h) => h[s.prop]))];
    if (!i.length)
      return;
    const { modelName: n, text: l, value: o } = s.formAttrs, a = await this.service.restful.search(n, {
      limit: -1,
      attributes: [l, o],
      where: {
        [o]: {
          "[Op.in]": i
        }
      }
    });
    if (!a.data.length)
      return;
    const r = Le.mapField(a.data, o, l);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = r[h[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingColumns(t, s = "current") {
    return t.filter((i) => !["index", "selection", "expand", "radio", "_index"].includes(i.type)).filter((i) => !i.virtual);
  }
  processExportingData(t, s = "current") {
    if (!t.length)
      return t;
    const i = {};
    this.table.ref._visibleColumns.forEach((l) => {
      let { formatter: o = l.formatter, tagValues: a = l.tagValues } = l.tableAttrs || {};
      !o && typeof a == "function" && (o = a), i[l.prop] = { formatter: o, tagValues: a };
    });
    const n = Object.keys(t[0]);
    return t.forEach((l) => {
      n.forEach((o) => {
        var r, h;
        const a = l[o];
        if (l.hasOwnProperty("_formatted_" + o))
          return l[o] = l["_formatted_" + o];
        if ((r = i[o]) != null && r.formatter)
          return l[o] = i[o].formatter(a);
        if ((h = i[o]) != null && h.tagValues)
          return l[o] = i[o].tagValues[a];
        typeof a == "boolean" ? l[o] = a && 1 || 0 : a instanceof Date ? (l[o] = be.format(a), l[o].endsWith(" 00:00:00") && (l[o] = l[o].slice(0, -9))) : typeof a == "object" && (l[o] = JSON.stringify(a));
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
    Object.keys(t).forEach((i) => {
      t[i] == null ? s[i] = "" : t[i].trim && (s[i] = t[i].trim());
    }), Object.assign(t, s);
  }
  _validateForm(t) {
    const s = t || this.dialog.formRef;
    return s ? new Promise((i) => {
      this._isMobile ? s.validate().then(() => i(!0)).catch(() => i(!1)) : s.validate((n) => i(n)).catch(() => i(!1));
    }) : !0;
  }
  _clearValidate(t = this.dialog.formRef) {
    t && (this._isMobile ? t.resetValidation() : t.clearValidate());
  }
  async _checkAllNone(t) {
    const s = [null, void 0, ""];
    return Object.values(t).some((n) => !s.includes(n)) ? !0 : ie.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    W(typeof t == "object" ? t.message || t.err || t.toString() : t);
  }
  get _isMobile() {
    var s, i;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((i = this.dialog) == null ? void 0 : i.formRef);
    return t ? t.$.attrs.class.indexOf("mobile") >= 0 : window.isMobile;
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
const It = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: n = "value" } = s, l = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    l[o[n]] = o[i];
  }), l;
};
class Rt extends ct {
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
    this.table.list = t.filter((i) => !s.includes(i));
  }
}
const Bt = {
  BaseController: dt,
  CrudController: ct,
  TempCrudController: Rt
}, A = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, n] of t)
    s[i] = n;
  return s;
}, Mt = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Nt(e, t, s, i, n, l) {
  const o = u("van-action-sheet");
  return d(), f(o, b(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Lt = /* @__PURE__ */ A(Mt, [["render", Nt]]), Pt = {
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
      let t = e[0], s = 0;
      return this.cols.forEach((i) => {
        const n = i.span || this.span;
        t.push(i), s += n, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, Ut = { class: "x-auto-rows" }, qt = { key: 1 };
function Xt(e, t, s, i, n, l) {
  const o = u("x-col"), a = u("x-row");
  return d(), y("div", Ut, [
    (d(!0), y(B, null, N(l.rows, (r, h) => (d(), f(a, b({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), y(B, null, N(r, (p, S) => (d(), f(o, b(p, {
          span: p.span || s.span,
          key: S,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            p.slot || e.$attrs.slot ? x(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), y("span", qt, O(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const zt = /* @__PURE__ */ A(Pt, [["render", Xt]]), Wt = {
  name: "MobileXButton"
};
function Ht(e, t, s, i, n, l) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const Jt = /* @__PURE__ */ A(Wt, [["render", Ht]]), Kt = {
  name: "PcXButton"
};
function Yt(e, t, s, i, n, l) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const Gt = /* @__PURE__ */ A(Kt, [["render", Yt]]), { funcs: Qt } = StardustBrowser, Zt = ["index", "selection", "expand", "radio", "_index"], Te = {
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
      return Qt.calcPixel(this.height) * this.zoom + "px";
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
      const e = this.datasource.columns.filter((t) => !Zt.includes(t.type));
      this.dialog.formItems.slice(0, 3).forEach((t) => t.options = e), this.handleMakeChart();
    },
    async handleMakeChart() {
      var s, i;
      this.dialog.visible = !1, this.loading = !0;
      const e = { ...this.dialog.form };
      (s = e.filter) != null && s.categories.isLimit || (e.filter.categories.mergeOthers = !1), (i = e.filter) != null && i.series.isLimit || (e.filter.series.mergeOthers = !1);
      let t = this.datasource.list;
      this.datasource.search && (t = await this.datasource.search()), e.data = t, this.setRich(e), this.loading = !1;
    },
    calcSummary(e, t, s) {
      let i;
      return (t === "sum" || t === "average") && (i = e.reduce((n, l) => n + l, 0).toFixed(3) * 1), t === "count" ? i = e.length : t === "average" ? e.length ? i = (i / (s || e.length)).toFixed(3) * 1 : i = void 0 : t === "first" ? i = e[0] : t === "last" ? i = e[e.length - 1] : (t === "max" || t === "min") && (i = Math[t].apply(null, e)), i;
    },
    setRich(e) {
      var I;
      const { categories: t, data: s, attr: i, summary: n, type: l, filter: o, grid: a } = e, r = {}, h = Array.isArray(t) && t.length || ((I = t == null ? void 0 : t.data) == null ? void 0 : I.length), p = h && (Array.isArray(t) ? t : t.data), S = typeof e.series == "string" ? e.series : e.series.data, v = (o == null ? void 0 : o.categories.limit) > -1, w = (o == null ? void 0 : o.series.limit) > -1, V = {}, j = [], g = /* @__PURE__ */ new Set(), $ = [];
      s.forEach((E) => {
        var U;
        let F = E[S] || "未知";
        if (w && $.length >= o.series.limit && !$.includes(F)) {
          if (!o.series.mergeOthers)
            return;
          F = "其他";
        }
        if (h) {
          let M = p.map((ee) => E[ee]).join("/") || "未知";
          if (v && j.length >= o.categories.limit && !j.includes(M)) {
            if (!o.categories.mergeOthers)
              return;
            g.add(M), M = "其他";
          }
          V[M] || j.push(M), V[M] || (V[M] = {}), $.includes(F) || $.push(F), (U = V[M])[F] || (U[F] = []), V[M][F].push(E[i]);
        } else
          V[F] || $.push(F), V[F] || (V[F] = []), V[F].push(E[i]);
      });
      const D = h && !w ? [...new Set(s.map((E) => E[S]))] : $;
      if (h)
        for (let E in V)
          for (let F in V[E])
            V[E][F] = this.calcSummary(
              V[E][F],
              n,
              v && E === "其他" ? V[E][F].length / g.size : V[E][F].length
            );
      else
        for (let E in V)
          V[E] = this.calcSummary(V[E], n);
      let X = D;
      typeof e.series == "object" && e.series.formatter && (X = D.map((E) => e.series.formatter(E)));
      let z = [];
      h ? z = D.map((E, F) => ({
        name: X[F],
        type: l,
        label: { show: !0, position: "top" },
        data: j.map((U) => ({ name: U, value: V[U][E] }))
      })) : z = [
        {
          type: l,
          colorBy: "data",
          label: { show: !0, position: "top" },
          data: D.map((E) => ({ name: E, value: V[E] }))
        }
      ], Object.assign(r, {
        legend: { data: X },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? j.map((E) => t.formatter(E)) : j : S.formatter ? $.map((E) => S.formatter(E)) : $
        },
        yAxis: { type: "value" },
        series: z
      }, this.option, { grid: a }), this.update(r);
    },
    update(e = {}) {
      var t, s, i;
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
      }, e.xAxis && !((t = e.xAxis.axisLabel) != null && t.formatter) && ((s = e.xAxis).axisLabel || (s.axisLabel = {}), e.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)), console.log(e), (i = this.chart) == null || i.setOption(e, !0);
    },
    labelSplitFormatter(e) {
      return (t) => t.length < e ? t : Array.from({
        length: Math.ceil(t.length / e)
      }).map((s, i) => t.slice(i * e, (i + 1) * e)).join(`
`);
    }
  }
}, Ue = () => {
  Ge((e) => ({
    "54b2baec": e.zoomedHeight,
    "2b79eb74": e.zoom
  }));
}, qe = Te.setup;
Te.setup = qe ? (e, t) => (Ue(), qe(e, t)) : Ue;
const me = (e) => (Ee("data-v-94e70f82"), e = e(), Ae(), e), es = { class: "x-chart" }, ts = {
  class: "chart",
  ref: "el"
}, ss = /* @__PURE__ */ me(() => /* @__PURE__ */ T("span", null, "左", -1)), ns = /* @__PURE__ */ me(() => /* @__PURE__ */ T("span", null, "上", -1)), is = /* @__PURE__ */ me(() => /* @__PURE__ */ T("span", null, "右", -1)), ls = /* @__PURE__ */ me(() => /* @__PURE__ */ T("span", null, "下", -1));
function os(e, t, s, i, n, l) {
  const o = u("pc-x-icon"), a = u("el-input-number"), r = u("el-col"), h = u("el-row"), p = u("el-checkbox"), S = u("el-tab-pane"), v = u("el-tabs"), w = u("x-form"), V = u("x-dialog"), j = ne("loading");
  return R((d(), y("div", es, [
    T("div", ts, null, 512),
    s.datasource ? (d(), y("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (g) => n.dialog.visible = !0)
    }, [
      C(" 配置 "),
      m(o, { name: "Setting" })
    ])) : k("", !0),
    m(V, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[12] || (t[12] = (g) => n.dialog.visible = g),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: l.handleMakeChart,
      onCancel: t[13] || (t[13] = (g) => n.dialog.visible = !1)
    }, {
      default: c(() => [
        m(w, { dialog: n.dialog }, {
          grid: c(() => [
            m(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                m(r, { span: 12 }, {
                  default: c(() => [
                    ss,
                    m(a, {
                      modelValue: l.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => l.grid.left = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    ns,
                    m(a, {
                      modelValue: l.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (g) => l.grid.top = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    is,
                    m(a, {
                      modelValue: l.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (g) => l.grid.right = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    ls,
                    m(a, {
                      modelValue: l.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (g) => l.grid.bottom = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          filter: c(() => [
            m(v, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[11] || (t[11] = (g) => n.filterType = g)
            }, {
              default: c(() => [
                m(S, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    m(p, {
                      modelValue: l.categories.isLimit,
                      "onUpdate:modelValue": t[5] || (t[5] = (g) => l.categories.isLimit = g)
                    }, {
                      default: c(() => [
                        C("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    R(T("div", null, [
                      C(" 记录条数 "),
                      m(a, {
                        modelValue: l.categories.limit,
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => l.categories.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: l.categories.mergeOthers,
                        "onUpdate:modelValue": t[7] || (t[7] = (g) => l.categories.mergeOthers = g)
                      }, {
                        default: c(() => [
                          C("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Me, l.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                m(S, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    m(p, {
                      modelValue: l.series.isLimit,
                      "onUpdate:modelValue": t[8] || (t[8] = (g) => l.series.isLimit = g)
                    }, {
                      default: c(() => [
                        C("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    R(T("div", null, [
                      C(" 记录条数 "),
                      m(a, {
                        modelValue: l.series.limit,
                        "onUpdate:modelValue": t[9] || (t[9] = (g) => l.series.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: l.series.mergeOthers,
                        "onUpdate:modelValue": t[10] || (t[10] = (g) => l.series.mergeOthers = g)
                      }, {
                        default: c(() => [
                          C("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Me, l.series.isLimit]
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
    [j, n.loading]
  ]);
}
const as = /* @__PURE__ */ A(Te, [["render", os], ["__scopeId", "data-v-94e70f82"]]), rs = {
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
        rules: i,
        required: n,
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
        this._options = H(this.options, this);
      }
    }
  }
};
function ds(e, t, s, i, n, l) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, b({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, l.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), y(B, null, N(n._options, (r) => {
        var h;
        return d(), f(o, b(l.attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          shape: s.shape,
          name: r.value
        }), {
          default: c(() => [
            C(O(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "shape", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const cs = /* @__PURE__ */ A(rs, [["render", ds], ["__scopeId", "data-v-f7122501"]]), us = {
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
        ...i
      } = this.$attrs;
      return i;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler(e) {
        this._options = H(e, this);
      }
    }
  }
}, hs = { key: 1 };
function ms(e, t, s, i, n, l) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, b({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, l.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), y(B, null, N(n._options, (r) => {
        var h;
        return d(), f(o, b(l.attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? x(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), y("span", hs, O(r.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const ps = /* @__PURE__ */ A(us, [["render", ms], ["__scopeId", "data-v-4dd3721a"]]), fs = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function gs(e, t, s, i, n, l) {
  const o = u("van-col");
  return d(), f(o, b(l.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const bs = /* @__PURE__ */ A(fs, [["render", gs]]), _s = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function ys(e, t, s, i, n, l) {
  const o = u("el-col");
  return d(), f(o, b(l.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const vs = /* @__PURE__ */ A(_s, [["render", ys]]), ws = {
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
}, Ss = { key: 1 }, ks = { key: 1 };
function $s(e, t, s, i, n, l) {
  const o = u("van-button"), a = u("van-col"), r = u("van-row");
  return d(), f(Q(s.actionsheet ? "van-action-sheet" : "van-dialog"), b({ width: "92%" }, e.$attrs, {
    show: l.visible,
    "onUpdate:show": t[0] || (t[0] = (h) => l.visible = h),
    class: "mobile-x-dialog",
    "show-confirm-button": l.canConfirm,
    "show-cancel-button": l.canCancel,
    onConfirm: l.handleConfirm,
    onCancel: l.handleCancel
  }), le({ _: 2 }, [
    e.$slots.title || s.title ? {
      name: "title",
      fn: c(() => [
        e.$slots.title ? x(e.$slots, "title", { key: 0 }) : (d(), y("span", Ss, O(s.title), 1))
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: c(() => [
        x(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: c(() => [
        x(e.$slots, "default")
      ]),
      key: "2"
    } : void 0,
    e.$slots.title || s.title ? {
      name: "description",
      fn: c(() => [
        e.$slots.title ? x(e.$slots, "title", { key: 0 }) : (d(), y("span", ks, O(s.title), 1))
      ]),
      key: "3"
    } : void 0,
    l.canConfirm || l.canCancel ? {
      name: "cancel",
      fn: c(() => [
        m(r, null, {
          default: c(() => [
            l.canCancel ? (d(), f(a, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                m(o, {
                  block: "",
                  onClick: G(l.handleCancel, ["stop"])
                }, {
                  default: c(() => [
                    C(O(s.cancelText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : k("", !0),
            l.canConfirm ? (d(), f(a, {
              key: 1,
              span: 12
            }, {
              default: c(() => [
                m(o, {
                  block: "",
                  style: { color: "var(--van-blue)" },
                  onClick: G(l.handleConfirm, ["stop"])
                }, {
                  default: c(() => [
                    C(O(s.submitText), 1)
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
const Cs = /* @__PURE__ */ A(ws, [["render", $s]]), xs = {
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
    }
  },
  methods: {
    handleToggleFullscreen() {
      this.fullscreen = !this.fullscreen, this.$emit("fullscreenchange", this.fullscreen);
    }
  }
}, Vs = {
  key: 1,
  class: "el-dialog__title"
};
function Es(e, t, s, i, n, l) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(Q(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: l.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => l.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: c(() => [
      e.$slots.header ? x(e.$slots, "header", { key: 0 }) : (d(), y("span", Vs, O(s.title), 1)),
      s.drawer ? k("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: l.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? x(e.$slots, "footer", { key: 0 }) : k("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          C(O(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          C(O(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? x(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const As = /* @__PURE__ */ A(xs, [["render", Es]]), J = {}, te = {
  provinces: [],
  cities: [],
  counties: []
}, Os = {
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
      Object.assign(J, this.areaList), te.provinces = Object.entries(J.province_list).map((e) => ({ value: e[0], text: e[1] })), te.cities = Object.entries(J.city_list).map((e) => ({ value: e[0], text: e[1] })), te.counties = Object.entries(J.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(te.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const i = Object.entries(J.province_list).find((n) => n[1] === e);
        this.province = i == null ? void 0 : i[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const i = Object.entries(J.city_list).find((n) => n[1] === t);
        this.city = i == null ? void 0 : i[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const i = Object.entries(J.county_list).find((n) => n[1] === s);
        this.county = i == null ? void 0 : i[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && J.province_list[this.province] || "",
        this.number > 1 && this.city && J.city_list[this.city] || "",
        this.number > 2 && this.county && J.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function js(e, t, s, i, n, l) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      m(a, { span: l.span }, {
        default: c(() => [
          m(o, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => n.province = h),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      l.number > 1 ? (d(), f(a, {
        key: 0,
        span: l.span
      }, {
        default: c(() => [
          m(o, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => n.city = h),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : k("", !0),
      l.number > 2 ? (d(), f(a, {
        key: 1,
        span: l.span
      }, {
        default: c(() => [
          m(o, {
            modelValue: n.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => n.county = h),
            options: n.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : k("", !0)
    ]),
    _: 1
  });
}
const Ts = /* @__PURE__ */ A(Os, [["render", js]]);
function Fs() {
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
function Ds() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function Is() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function Rs() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return ot(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function Bs() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function Ms(e) {
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
}
function Ns(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const oe = {
  props: Fs,
  computed: {
    _model: Ds,
    _items: Is,
    _visibleItems: Rs,
    _rules: Bs
  },
  methods: {
    calcPlaceholder: Ms,
    formatModelValue: Ns
  }
}, Ls = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...oe.props(),
    hideLabels: {
      type: Boolean,
      default: !1
    },
    useWhen: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:fref"],
  computed: {
    ...oe.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...oe.methods
  }
};
function Ps(e, t, s, i, n, l) {
  const o = u("mobile-x-form-item"), a = u("el-col"), r = u("el-row"), h = u("van-form");
  return d(), f(h, {
    ref: "formRef",
    class: K(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : k("", !0),
      m(r, {
        gutter: e.$attrs.gutter,
        justify: e.$attrs.justify,
        align: e.$attrs.align,
        tag: e.$attrs.tag
      }, {
        default: c(() => [
          (d(!0), y(B, null, N(e._visibleItems, (p, S) => (d(), f(a, {
            key: S,
            span: p.span,
            offset: p.offset,
            tag: p.tag,
            xs: p.xs,
            sm: p.sm,
            md: p.md,
            lg: p.lg,
            xl: p.xl
          }, {
            default: c(() => [
              m(o, b(p, {
                rules: e._rules[p.prop] || p.rules,
                modelValue: e.formatModelValue(e._model[p.prop]),
                "onUpdate:modelValue": (v) => e._model[p.prop] = v,
                placeholder: e.calcPlaceholder(p)
              }), {
                default: c(() => [
                  p.slot ? x(e.$slots, p.slot, Oe(b({ key: 0 }, p))) : k("", !0)
                ]),
                _: 2
              }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            _: 2
          }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
        ]),
        _: 3
      }, 8, ["gutter", "justify", "align", "tag"]),
      e.$slots.default ? x(e.$slots, "default", { key: 1 }) : k("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const Us = /* @__PURE__ */ A(Ls, [["render", Ps]]), qs = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...oe.props(),
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
    ...oe.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...oe.methods
  }
}, Xs = { key: 1 };
function zs(e, t, s, i, n, l) {
  const o = u("pc-x-form-item"), a = u("el-col"), r = u("el-row"), h = u("el-form"), p = u("el-collapse-item"), S = u("el-collapse");
  return d(), f(S, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (v) => n.activeNames = v),
    class: K((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      m(p, {
        name: n.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), y("span", Xs, O(s.title), 1))
        ]),
        default: c(() => [
          m(h, b({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs["label-position"] || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: c(() => [
              e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : k("", !0),
              m(r, {
                gutter: e.$attrs.gutter,
                justify: e.$attrs.justify,
                align: e.$attrs.align,
                tag: e.$attrs.tag
              }, {
                default: c(() => [
                  (d(!0), y(B, null, N(e._visibleItems, (v, w) => (d(), f(a, {
                    key: w,
                    span: v.span,
                    offset: v.offset,
                    tag: v.tag,
                    xs: v.xs,
                    sm: v.sm,
                    md: v.md,
                    lg: v.lg,
                    xl: v.xl
                  }, {
                    default: c(() => [
                      m(o, b({
                        "label-width": s.labelWidth,
                        "show-tooltip": e.$attrs.showTooltip || !1
                      }, v, {
                        modelValue: e._model[v.prop],
                        "onUpdate:modelValue": [(V) => e._model[v.prop] = V, (V) => v.onChange || null],
                        prop: v.prop || v.model,
                        clearable: v.clearable !== !1,
                        placeholder: e.calcPlaceholder(v)
                      }), {
                        default: c(() => [
                          v.slot ? x(e.$slots, v.slot, { key: 0 }) : k("", !0)
                        ]),
                        _: 2
                      }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder"])
                    ]),
                    _: 2
                  }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
                ]),
                _: 3
              }, 8, ["gutter", "justify", "align", "tag"]),
              e.$slots.default ? x(e.$slots, "default", { key: 1 }) : k("", !0)
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
const Ws = /* @__PURE__ */ A(qs, [["render", zs]]);
function Hs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Qe(e);
}
const ke = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: n
  } = e;
  let {
    comp: l,
    compType: o,
    html: a,
    text: r
  } = t;
  const h = {
    ...i,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  }, p = [];
  return o === "html" ? h.class = "comp-html" : l = u(l), a && (h.innerHTML = a), r && p.push(r), Z(l, h, {
    default: () => p
  });
}, Js = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: n,
    $slots: l
  } = e, {
    slot: o,
    showTooltip: a,
    placeholder: r
  } = t;
  if (o && !s.label)
    return l.default();
  let h = null;
  if (o)
    h = l.default();
  else if (a) {
    let p;
    h = m(u("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Hs(p = ke(e)) ? p : {
      default: () => [p]
    });
  } else
    h = ke(e);
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
}, Ks = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: n,
    $slots: l,
    mValue: o
  } = e, {
    slot: a,
    comp: r,
    modelValue: h
  } = t;
  if (a && !s.label)
    return l.default({
      ...t,
      ...s
    });
  const p = {
    modelValue: o,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  };
  return a && s.label || r ? Z(u("van-field"), p, {
    input: () => a && s.label ? l.default() : ke(e)
  }) : (Object.assign(p, i), Z(u("van-field"), p));
}, Ys = {
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
        comp: i,
        compType: n,
        iconSize: l,
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
    return Ks(this);
  }
}, Fe = {
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
        comp: i,
        slot: n,
        compType: l,
        span: o,
        offset: a,
        showTooltip: r,
        required: h,
        format: p,
        style: S,
        html: v,
        class: w,
        ...V
      } = { ...this.$props, ...this.$attrs };
      return V;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Js(this);
  }
}, Xe = () => {
  Ge((e) => ({
    ba9709f0: e.width
  }));
}, ze = Fe.setup;
Fe.setup = ze ? (e, t) => (Xe(), ze(e, t)) : Xe;
const Gs = /* @__PURE__ */ A(Fe, [["__scopeId", "data-v-d2cde1e2"]]), We = /* @__PURE__ */ Object.assign({}), Qs = {
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
      await Promise.all(Object.keys(We).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await We[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Zs = ["src"];
function en(e, t, s, i, n, l) {
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), y("span", {
    key: 0,
    class: K(l.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), y("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Zs)) : (d(), f(o, b({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const tn = /* @__PURE__ */ A(Qs, [["render", en]]), He = /* @__PURE__ */ Object.assign({}), sn = {
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
      await Promise.all(Object.keys(He).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await He[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, nn = ["src"];
function ln(e, t, s, i, n, l) {
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), y("span", {
    key: 0,
    class: K(l.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), y("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, nn)) : (d(), f(o, Oe(b({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(Q(s.name)))
    ]),
    _: 1
  }, 16));
}
const on = /* @__PURE__ */ A(sn, [["render", ln]]), { highdict: an } = StardustJs, { storage: rn } = StardustBrowser, { local: ut } = rn, De = ["index", "selection", "expand", "radio", "_index"];
function dn() {
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
function cn() {
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
function un() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function hn() {
  const e = {};
  return [
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
function mn() {
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
function pn() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function fn() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function gn() {
  const { $props: e, _query: t } = this, { table: s, columns: i } = e;
  return (i || (s == null ? void 0 : s.columns) || []).map((l) => l.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (s.isInfinite ? 0 : (a - 1) * r) + o + 1;
    }
  }, l, { type: "index" }) : l.type === "radio" ? Object.assign({ width: 60, label: "单选" }, l) : Object.assign({}, l, l.tableAttrs));
}
function bn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function _n() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function yn() {
  const { table: e, finished: t } = this.$props;
  return t ?? (e == null ? void 0 : e.finished);
}
function vn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function wn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function Sn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function kn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function $n() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Cn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function xn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function Vn() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function En() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function An() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : () => {
  };
}
function On() {
  var s;
  if (!this.controller || !((s = this.listen) != null && s.length))
    return {};
  let e = this.listen.split(",");
  e.includes("*") && (e = [.../* @__PURE__ */ new Set([
    ...e,
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
  return e.forEach((i) => {
    const n = "handle" + i.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
    t[i] = this.controller[n];
  }), t;
}
function jn() {
  const e = this._columns.filter((s) => s.type && De.includes(s.type) || s.fixed === "left"), t = this.settings.columns.filter((s) => !s.hide && s.fixed !== "left").map((s) => {
    const i = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...i,
      width: s.width || i.width
    };
  });
  return e.concat(t);
}
function Tn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function Fn() {
  const { plain: e } = this._attrs;
  return e || e === "";
}
function Dn() {
  const { "hide-header": e } = this._attrs;
  return e || e === "";
}
function In() {
  const { "hide-tools": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Rn() {
  const { "hide-searcher": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Bn() {
  const { "hide-chart": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Mn() {
  const { "hide-settings": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Nn() {
  const { "hide-operates": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Ln() {
  const { "hide-pagination": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Pn() {
  return this._attrs["operates-width"] ?? 150;
}
function Un() {
  return this._attrs["operates-dropdown"];
}
function qn() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !De.includes(e.type)));
}
function Xn() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function zn() {
  const e = this._uid && ut.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && De.includes(t.type))).map((t) => {
    const { prop: s, label: i, show: n, hide: l, width: o, virtual: a, fixed: r } = t;
    return { prop: s, label: i, show: n, hide: l, width: o, virtual: a, fixed: r };
  })), this.settings = e;
}
function Wn(e) {
  ut.setJson(`Settings[${this._uid}]`, e);
}
function Hn(e, t) {
  const { prop: s } = t;
  let { format: i, formatter: n } = t.tableAttrs || t;
  i = Array.isArray(t.options) ? i !== !1 : i;
  const l = e[s];
  if (l == null || l === "")
    return this.defaultValue;
  if (i || n) {
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
    if (n)
      return typeof n == "function" ? n(l, e, t) : an.get(e, n);
  }
  return l;
}
function Jn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function Kn(e) {
  this.params = e, this._emit("search", e);
}
function Yn(e) {
  this.saveSettings(e), this.initSettings();
}
function Gn(e, t, s, i) {
  const n = this.settings.columns.find((l) => l.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function Qn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Zn(e) {
  var t, s, i, n;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((n = (i = this.controller) == null ? void 0 : i.handleSortChange) == null || n.call(i, e));
}
function ei(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function ti(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function si() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function ni() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function ii(e) {
  var i;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function li(e) {
  var i;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function oi(e, t) {
  const { tagTypes: s, prop: i, options: n } = t, l = e.row[i];
  if (s) {
    if (typeof s == "function")
      return s(l, e, t);
    if (typeof s == "object")
      return s[l];
  } else if (n) {
    const o = n.find((a) => a[t.value || "value"] === l);
    if (o != null && o.tagType)
      return o.tagType;
  }
  return l ? "success" : "danger";
}
function ai(e, t) {
  const { tagValues: s, prop: i, options: n } = t, l = e.row[i];
  if (s) {
    if (typeof s == "function")
      return s(l, e, t);
    if (typeof s == "object")
      return s[l];
  } else if (n) {
    const o = n.find((a) => a[t.value || "value"] === l);
    if (o)
      return o[t.text || "text"];
  }
  return l;
}
function ri(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function di(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function ci(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function ui(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function hi(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function mi(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function pi(e, t) {
  var i;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((i = t.previewSrcList) == null ? void 0 : i.call(t)) || [s];
}
function fi(e, t) {
  const s = "on" + e.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function gi() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const q = {
  props: dn,
  emits: cn,
  computed: {
    _attrs: un,
    domids: hn,
    elTableAttrs: mn,
    _loading: pn,
    _data: fn,
    _columns: gn,
    _query: bn,
    _total: _n,
    _finished: yn,
    _selection: vn,
    _chartHeight: wn,
    _chartOption: Sn,
    _onSearch: kn,
    _onAdd: $n,
    _onExport: Cn,
    _onSearchExport: xn,
    _onImport: Vn,
    _onMultiDelete: En,
    _onLoad: An,
    _listen: On,
    _visibleColumns: jn,
    _uid: Tn,
    plain: Fn,
    hideHeader: Dn,
    hideTools: In,
    hideSearcher: Rn,
    hideChart: Bn,
    hideSettings: Mn,
    hideOperates: Nn,
    hidePagination: Ln,
    operatesWidth: Pn,
    operatesDropdown: Un,
    searcherColumns: qn,
    searcherConfig: Xn
  },
  watch: {
    $route: gi
  },
  methods: {
    initSettings: zn,
    saveSettings: Wn,
    calcValue: Hn,
    calcOverflowTooltip: Jn,
    handleSearch: Kn,
    handleResetSettings: Yn,
    handleHeaderDragend: Gn,
    handleSelectionChange: Qn,
    handleSortChange: Zn,
    handleCheckedChange: ei,
    handleCollapseChange: ti,
    handleMinus: si,
    handleToggleFullscreen: ni,
    cellClassName: ii,
    cellStyle: li,
    calcTagType: oi,
    calcTagValue: ai,
    canEdit: ri,
    canSave: di,
    canRowEdit: ci,
    canCancelEdit: ui,
    canDelete: hi,
    _imageSrc: mi,
    _imagePreviewSrcList: pi,
    _emit: fi
  }
}, bi = {
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
        const { infoAttrs: s = {}, ...i } = t, n = { span: this.span, ...i, ...s }, l = n.block || "基本信息";
        let o = e[l];
        o || (e[l] = o = [], o.span = 0), o.span + n.span > 24 && o.length ? o[o.length - 1].span += 24 - o.span : o.span += n.span, o.push(n);
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
    calcValue: q.methods.calcValue
  }
}, _i = { key: 0 }, yi = { key: 1 };
function vi(e, t, s, i, n, l) {
  const o = u("router-link"), a = u("el-descriptions-item"), r = u("el-descriptions"), h = u("el-collapse-item"), p = u("el-collapse");
  return d(), f(p, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (S) => n.activeNames = S),
    class: K(["x-info", { "hide-header": l.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), y(B, null, N(l.blocks, (S, v) => (d(), f(h, {
        key: v,
        title: v,
        name: v
      }, {
        default: c(() => [
          m(r, {
            column: s.column,
            border: s.border
          }, {
            default: c(() => [
              (d(!0), y(B, null, N(S, (w) => (d(), f(a, b({
                key: w.prop
              }, w), le({
                default: c(() => [
                  w.slot ? (d(), y("span", _i, [
                    w.slot === "link" ? (d(), f(o, {
                      key: 0,
                      to: w.to(s.data)
                    }, {
                      default: c(() => [
                        C(O(w.link ? w.link(s.data) : s.data[w.linkProp || w.prop]), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])) : k("", !0),
                    x(e.$slots, w.slot, Oe(ft({ data: s.data, field: w, value: l.calcValue(s.data, w) })), void 0, !0)
                  ])) : (d(), y("span", yi, O(l.calcValue(s.data, w)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: c(() => [
                    x(e.$slots, "label", {
                      label: w.label
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
const wi = /* @__PURE__ */ A(bi, [["render", vi], ["__scopeId", "data-v-1d6eadb0"]]), Si = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, ki = { key: 1 };
function $i(e, t, s, i, n, l) {
  return d(), y("div", null, [
    (d(!0), y(B, null, N(s.items, (o, a) => (d(), f(Q(s.compName), b({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? x(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), y("span", ki, O(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Ci = /* @__PURE__ */ A(Si, [["render", $i]]), xi = {
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
function Vi(e, t, s, i, n, l) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), h = u("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      m(o, { span: 6 }, {
        default: c(() => [
          T("span", null, "总计: " + O(s.total), 1)
        ]),
        _: 1
      }),
      m(o, { span: 18 }, {
        default: c(() => [
          m(r, b({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (p) => s.query.page = p),
            "page-count": l.pageCount
          }), {
            "prev-text": c(() => [
              m(a, { name: "arrow-left" }),
              C(" 上一页 ")
            ]),
            "next-text": c(() => [
              C(" 下一页 "),
              m(a, { name: "arrow" })
            ]),
            page: c(({ text: p }) => [
              C(O(p), 1)
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
const Ei = /* @__PURE__ */ A(xi, [["render", Vi]]), Ai = {
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
function Oi(e, t, s, i, n, l) {
  const o = u("el-pagination");
  return d(), f(o, b({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": s.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => s.query.page = a),
    "page-size": s.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => s.query.limit = a),
    "page-count": l.pageCount,
    total: s.total,
    class: "pc-x-pagination"
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const ji = /* @__PURE__ */ A(Ai, [["render", Oi]]), Ti = {
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
function Fi(e, t, s, i, n, l) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), y(B, null, [
    T("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: K(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, O(s.modelValue || s.placeholder), 3),
    m(a, b({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: l.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => l.visible = r)
    }), {
      default: c(() => [
        m(o, b(e.$attrs, {
          title: e.$attrs.title,
          columns: s.columns,
          onCancel: t[1] || (t[1] = (r) => e.$emit("cancel")),
          onConfirm: l.onConfirm
        }), null, 16, ["title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const Di = /* @__PURE__ */ A(Ti, [["render", Fi]]), Ii = {
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
        this._options = H(this.options, this);
      }
    }
  }
};
function Ri(e, t, s, i, n, l) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, b({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), y(B, null, N(n._options, (r) => {
        var h;
        return d(), f(o, b(e.$attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          name: r.value
        }), {
          default: c(() => [
            C(O(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const Bi = /* @__PURE__ */ A(Ii, [["render", Ri], ["__scopeId", "data-v-667a10bc"]]), Mi = {
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
        ...i
      } = this.$attrs;
      return i;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = H(this.options, this);
      }
    }
  }
}, Ni = { key: 1 };
function Li(e, t, s, i, n, l) {
  const o = u("el-radio-group");
  return d(), f(o, b({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, l.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), y(B, null, N(n._options, (a) => {
        var r;
        return d(), f(Q(s.button ? "el-radio-button" : "el-radio"), b(l.attrs, {
          disabled: (r = a.raw) == null ? void 0 : r.disabled,
          key: a.text,
          value: a.value
        }), {
          default: c(() => [
            e.$slots.custom ? x(e.$slots, "custom", {
              key: 0,
              option: a,
              raw: a.raw
            }, void 0, !0) : (d(), y("span", Ni, O(a.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const Pi = /* @__PURE__ */ A(Mi, [["render", Li], ["__scopeId", "data-v-1c8cf979"]]), Ui = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, qi = { key: 1 };
function Xi(e, t, s, i, n, l) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), y(B, null, N(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), y("span", qi, O(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const zi = /* @__PURE__ */ A(Ui, [["render", Xi]]), Wi = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Hi = { key: 1 };
function Ji(e, t, s, i, n, l) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), y(B, null, N(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), y("span", Hi, O(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const Ki = /* @__PURE__ */ A(Wi, [["render", Ji]]), Yi = {
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
function Gi(e, t, s, i, n, l) {
  const o = u("van-icon"), a = u("van-field");
  return d(), f(a, b({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: l.handleClick
  }), {
    "right-icon": c(() => [
      m(o, {
        name: "scan",
        onClick: l.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const Qi = /* @__PURE__ */ A(Yi, [["render", Gi]]), Zi = {
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
function el(e, t, s, i, n, l) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, b(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: l.handleClick
  }), {
    append: c(() => [
      m(o, {
        icon: "CameraFilled",
        onClick: l.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const tl = /* @__PURE__ */ A(Zi, [["render", el]]), Ie = async (e, t, s) => {
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: n = "text", value: l = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, l])], a.limit = a.limit || 20, i && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${i}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, $e = (e, t) => !e || typeof e != "object" ? e : !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((i) => e[i])[0], Ce = (e, t) => !e || typeof e != "object" || !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((i) => e[i]).slice(1).join(" - ") + ")", sl = {
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
      var t;
      let e = this.modelValue;
      return (e === "true" || e === "false") && (e = e === "true"), ((t = this._options.find((s) => s.value === e)) == null ? void 0 : t.text) ?? "";
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = H(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: H,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Ie(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function nl(e, t, s, i, n, l) {
  const o = u("x-picker");
  return d(), y("div", {
    onClick: t[5] || (t[5] = (...a) => l.onClick && l.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(o, b(e.$attrs, {
      modelValue: l.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: n.visible,
      columns: n._options,
      onClick: t[1] || (t[1] = G(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => n.visible = !0),
      onCancel: t[3] || (t[3] = (a) => n.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => n.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const il = /* @__PURE__ */ A(sl, [["render", nl]]), ll = {
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
        const e = H(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = $e(this.options[s], this), t._remark_ = Ce(this.options[s], this);
        }), this._options = se(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: H,
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = se(this._options);
      const t = !!this.$slots.custom;
      this.list = se(this._options.filter((s) => {
        let i = s.text;
        return t || (i += s._main_ + s._remark_), i.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ie(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return $e(e, this);
    },
    calcRemarkLabel(e) {
      return Ce(e, this);
    }
  }
}, ol = { key: 1 }, al = { class: "main" }, rl = { class: "remark" };
function dl(e, t, s, i, n, l) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, b({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "filter-method": e.$attrs.filterMethod || l.filter,
    "remote-method": e.$attrs.remoteMethod || l.remoteSearch
  }), {
    default: c(() => [
      (d(!0), y(B, null, N(n._options, (r, h) => {
        var p;
        return d(), f(o, b(e.$attrs, {
          disabled: (p = r.raw) == null ? void 0 : p.disabled,
          key: r.value,
          label: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? x(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), y("span", ol, [
              T("span", al, O(r._main_), 1),
              T("span", rl, O(r._remark_), 1)
            ]))
          ]),
          _: 2
        }, 1040, ["disabled", "label", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "filter-method", "remote-method"]);
}
const cl = /* @__PURE__ */ A(ll, [["render", dl], ["__scopeId", "data-v-341f5486"]]), ul = {
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
        const e = H(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = $e(this.options[s], this), t._remark_ = Ce(this.options[s], this);
        }), this._options = se(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: H,
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = se(this._options);
      const t = !!this.$slots.custom;
      this.list = se(this._options.filter((s) => {
        let i = s.text;
        return t || (i += s._main_ + s._remark_), i.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ie(this.service.restful, e, this);
    }
  }
}, hl = { key: 1 }, ml = { class: "main" }, pl = { class: "remark" };
function fl(e, t, s, i, n, l) {
  const o = u("el-select-v2");
  return d(), f(o, b({
    class: ["pc-x-select-v2", s.plain ? "x-select-v2--plain" : ""],
    loading: n.loading
  }, e.$attrs, {
    options: n.list,
    props: { label: "text" },
    filterable: s.filterable,
    clearable: "",
    "filter-method": e.$attrs.filterMethod || l.filter,
    "remote-method": e.$attrs.remoteMethod || l.remoteSearch
  }), {
    default: c(({ item: a, index: r }) => [
      e.$slots.custom ? x(e.$slots, "custom", {
        key: 0,
        option: a,
        raw: a.raw
      }, void 0, !0) : (d(), y("span", hl, [
        T("span", ml, O(a._main_), 1),
        T("span", pl, O(a._remark_), 1)
      ]))
    ]),
    _: 3
  }, 16, ["class", "loading", "options", "filterable", "filter-method", "remote-method"]);
}
const gl = /* @__PURE__ */ A(ul, [["render", fl], ["__scopeId", "data-v-9aa1016e"]]), Je = {
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
}, bl = [{
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
}], P = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  XRadios: ["eq", "ne", "special"],
  XCheckboxs: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"],
  universal: ["eq", "ne", "gt", "gte", "lt", "lte", "in", "like", "notIn", "notLike", "between", "special"]
};
P["x-select"] = P.XSelect;
P.XSelectV2 = P.XSelect;
P["x-select-v2"] = P.XSelect;
P["x-radios"] = P.XRadios;
P["x-checkboxs"] = P.XCheckboxs;
P["el-date-picker"] = P.ElDatePicker;
P["el-input-number"] = P.ElInputNumber;
P["el-input"] = P.ElInput;
function _l() {
  const e = window.isMobile ? "small" : "", {
    $attrs: t,
    config: s,
    columns: i,
    visible: n,
    conditions: l,
    expression: o,
    handleSearch: a,
    handleReset: r,
    handleAdd: h,
    handleDelete: p,
    handleSelectField: S,
    handleSelectOp: v
  } = this;
  return m(u("x-dialog"), b({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: t.title || "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": t["submit-text"] || "查询"
  }, {
    modelValue: n,
    "onUpdate:modelValue": (w) => this.visible = w,
    onCancel: r,
    onSubmit: a
  }), {
    default: () => [s.traditional ? null : m(u("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: h
    }, {
      default: () => [C("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [l.map((w, V) => m("div", {
      class: "condition flex-center",
      key: w.no
    }, [s.traditional ? null : m(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => p(V)
    }, {
      default: () => [C("X")]
    }), s.traditional ? null : m("span", {
      class: "title"
    }, [w.no]), m("div", {
      class: "expression"
    }, [s.traditional ? m(u("el-input"), {
      modelValue: w.item.label,
      readonly: !0
    }, null) : m(u("pc-x-select"), {
      modelValue: w.prop,
      onChange: (j) => S(w, j),
      options: i,
      text: "label",
      value: "prop"
    }, null), m(u("pc-x-select"), {
      modelValue: w.op,
      onChange: (j) => v(w, j),
      options: w.ops
    }, null), m("div", {
      class: "value-container"
    }, [yl(this, w)])])]))]), s.traditional ? null : m(u("el-input"), b({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: o,
      "onUpdate:modelValue": (w) => this.expression = w
    }), null)]
  });
}
function yl(e, t) {
  const s = (n) => Z(u((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (l) => t.value = l
  }, n)), i = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? m("div", {
    class: "col-2"
  }, [s({
    ...i,
    modelValue: t.value[0],
    "onUpdate:modelValue": (n) => t.value[0] = n
  }), s({
    ...i,
    modelValue: t.value[1],
    "onUpdate:modelValue": (n) => t.value[1] = n
  })]) : ["in", "notIn"].includes(t.op) ? (i.multiple = !0, s(i)) : t.op === "special" ? s({
    ...i,
    component: "x-select",
    placeholder: "请选择特殊值",
    options: bl
  }) : s();
}
const { storage: _e } = StardustBrowser, { deepCopy: vl } = StardustJs.funcs, wl = {
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
  render: _l,
  methods: {
    init() {
      const e = this.uid && _e.local.getJson(this.key, this.config) || this.config;
      this.initConfig(vl(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      _e.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: s, component: i, ...n } = e;
          return n;
        }),
        expression: this.expression
      });
    },
    initConfig(e) {
      var t, s;
      (t = e.conditions) == null || t.forEach((i) => {
        const { prop: n, op: l, value: o, universal: a } = i;
        i.item = this.columns.find((r) => r.prop === n), this.handleSelectField(i, n), this.handleSelectOp(i, l), i.value = o, i.ops = P[a ? "universal" : i.component].map((r) => Je[r]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((i) => i.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        W({ type: "warning", message: t.toString() });
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, e.page = 1, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      _e.local.remove(this.key), Object.assign(this, {
        conditionNo: 1,
        conditions: [],
        expression: ""
      }), this.init();
    },
    calcParams() {
      const e = this.calcTree();
      if (!e)
        return;
      const t = (i, n) => {
        const l = [], o = "[Op." + i.type + "]";
        n[o] = l;
        for (let a of i.items)
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
            l.push(this.parseCondition(r));
          } else {
            const r = {};
            l.push(r), t(a, r);
          }
        l.length || delete n[o];
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((n) => n.trim()), s = (n, l) => {
        for (; l.length; ) {
          const o = l.shift();
          if (["and", "or"].includes(o)) {
            if (n.type && n.type !== o)
              throw "串联不同逻辑表达式请使用小括号区分";
            n.type = o;
          } else if (o === "(") {
            const a = { type: "", items: [] };
            n.items.push(a), a._parent = n, s(a, l);
            break;
          } else
            o === ")" ? (s(n._parent, l), delete n._parent) : n.items.push(o);
        }
      }, i = { type: "", items: [] };
      return s(i, t), i.type = i.type || "and", i;
    },
    parseCondition(e) {
      let { prop: t, op: s, value: i } = e;
      const n = {};
      if (s === "special") {
        const l = i.startsWith("NOT_"), o = i.startsWith("NE_");
        return i.includes("NULL") ? i = null : i.includes("BLANK") && (i = ""), l ? i = { "[Op.not]": i } : o && (i = { "[Op.ne]": i }), n[t] = i, n;
      }
      return (s === "like" || s === "notLike") && (i = "%" + i + "%"), n[t] = {
        [`[Op.${s}]`]: i
      }, n;
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
      e.value = "", e.prop = t, e.item = this.columns.find((F) => F.prop === e.prop);
      const { options: s, type: i, formAttrs: n = {} } = e.item, l = { ...e.item, ...n }, {
        comp: o,
        universal: a,
        visible: r,
        canAdd: h,
        canEdit: p,
        required: S,
        slot: v,
        span: w,
        tableAttrs: V,
        formAttrs: j,
        tagTypes: g,
        tagValues: $,
        width: D,
        minWidth: X,
        disabled: z,
        readonly: I,
        ...E
      } = l;
      E.clearable ?? (E.clearable = !0), e.config = E, e.component = o || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = P[a ? "universal" : e.component].map((F) => Je[F]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", E.type = "date"), E.type === "textarea" && delete E.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, Re = /* @__PURE__ */ A(wl, [["__scopeId", "data-v-872870a1"]]), Sl = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...q.props(),
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
    ...q.emits()
  ],
  components: { Searcher: Re },
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
    ...q.computed,
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
        e.forEach((s, i) => {
          s && t.push(this._data[i]);
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
    ...q.methods,
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
}, kl = { class: "mobile-x-table" }, $l = {
  key: 1,
  class: "card"
}, Cl = ["onClick"], xl = { class: "row-header flex-center" }, Vl = ["value", "checked"], El = { class: "label" }, Al = { class: "value" }, Ol = ["value", "checked"], jl = {
  key: 2,
  class: "index"
}, Tl = { class: "title" };
function Fl(e, t, s, i, n, l) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("x-icon"), p = u("van-cell"), S = u("van-list"), v = u("x-pagination"), w = u("x-info"), V = u("van-popup"), j = u("van-action-sheet");
  return d(), y("div", kl, [
    m(o, {
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
    }), le({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: c(() => [
          x(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: c(() => [
          x(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), y("div", $l, [
      (d(!0), y(B, null, N(e._data, (g, $) => (d(), y("div", {
        key: $,
        class: "row",
        onClick: (D) => l.handleClickCard($)
      }, [
        T("div", xl, [
          l.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[$],
            "onUpdate:modelValue": (D) => n.selected[$] = D,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = G(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
          m(h, {
            name: "ellipsis",
            class: "more",
            onClick: G((D) => l.handleShowActionSheet(g, $), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        l.hasRadio ? (d(), y("input", {
          key: 0,
          type: "radio",
          value: $,
          checked: $ === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = G(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...D) => e.handleCheckedChange && e.handleCheckedChange(...D))
        }, null, 40, Vl)) : k("", !0),
        (d(!0), y(B, null, N(l.cols, (D, X) => (d(), y("div", {
          key: X,
          class: "field"
        }, [
          T("span", El, O(D.label) + ":", 1),
          T("span", Al, O(e.calcValue(g, D)), 1)
        ]))), 128))
      ], 8, Cl))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(S, b({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (g) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), y(B, null, N(e._data, (g, $) => (d(), f(p, {
          key: $,
          "is-link": "",
          onClick: (D) => l.handleShowDetail(g, $)
        }, {
          default: c(() => [
            l.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[$],
              "onUpdate:modelValue": (D) => n.selected[$] = D,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = G(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
            l.hasRadio ? (d(), y("input", {
              key: 1,
              type: "radio",
              value: $,
              checked: $ === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = G(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...D) => e.handleCheckedChange && e.handleCheckedChange(...D))
            }, null, 40, Ol)) : k("", !0),
            l.hasIndex ? (d(), y("span", jl, O($ + 1), 1)) : k("", !0),
            T("span", Tl, O(l.calcTitle(g)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : k("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(v, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (g) => e._emit("search"))
    }, null, 8, ["query", "total"])) : k("", !0),
    m(V, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (g) => n.popupVisible = g),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        m(w, {
          data: n.scope.row,
          fields: l.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    m(j, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (g) => n.actionSheetVisible = g),
      actions: l.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: l.handleSelectAction,
      onCancel: t[10] || (t[10] = (g) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Dl = /* @__PURE__ */ A(Sl, [["render", Fl], ["__scopeId", "data-v-84e93229"]]), Il = {
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
          const s = [...t.to.querySelectorAll(".row")].map((i) => i.dataset.prop);
          this.columns = s.map((i) => e[i]), this.update();
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
          const { prop: t, label: s, show: i, hide: n, width: l } = e;
          return { prop: t, label: s, show: i, hide: n, width: l };
        })
      });
    }
  }
}, Rl = (e) => (Ee("data-v-a2f0fe24"), e = e(), Ae(), e), Bl = {
  class: "table",
  ref: "colsTable"
}, Ml = ["data-prop"], Nl = ["title", "onClick"], Ll = /* @__PURE__ */ Rl(() => /* @__PURE__ */ T("span", { class: "unit" }, "px", -1)), Pl = {
  class: "table",
  ref: "sortsTable"
}, Ul = ["data-prop"];
function ql(e, t, s, i, n, l) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), h = u("ElCheckbox"), p = u("el-input-number"), S = u("el-tab-pane"), v = u("x-select"), w = u("x-radios"), V = u("el-tabs"), j = u("el-popover");
  return s.visible ? (d(), f(j, b({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: c(() => [
      m(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: c(() => [
      m(V, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => n.activeName = g)
      }, {
        default: c(() => [
          m(S, {
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              m(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: l.handleResetColumns
              }, {
                default: c(() => [
                  C("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              T("div", Bl, [
                (d(!0), y(B, null, N(n.columns, (g) => (d(), y("div", {
                  key: g.prop,
                  "data-prop": g.prop,
                  class: "row flex-center"
                }, [
                  m(r, null, {
                    default: c(() => [
                      m(a)
                    ]),
                    _: 1
                  }),
                  m(h, {
                    modelValue: g.show,
                    "onUpdate:modelValue": ($) => g.show = $,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  T("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: ($) => l.handleToggle(g)
                  }, O(g.label), 9, Nl),
                  m(p, {
                    modelValue: g.width,
                    "onUpdate:modelValue": ($) => g.width = $,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  Ll
                ], 8, Ml))), 128))
              ], 512)
            ]),
            _: 1
          }),
          m(S, {
            name: "sorts",
            label: "多列排序"
          }, {
            default: c(() => [
              m(o, {
                type: "primary",
                plain: "",
                icon: "Plus",
                onClick: l.handleAddSort
              }, {
                default: c(() => [
                  C("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              T("div", Pl, [
                (d(!0), y(B, null, N(n.sorts, (g, $) => (d(), y("div", {
                  key: g[0],
                  "data-prop": g[0],
                  class: "row flex-center"
                }, [
                  m(v, {
                    modelValue: g[0],
                    "onUpdate:modelValue": (D) => g[0] = D,
                    options: n.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(w, {
                    modelValue: g[1],
                    "onUpdate:modelValue": (D) => g[1] = D,
                    options: n.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (D) => n.sorts.splice($, 1)
                  }, null, 8, ["onClick"])
                ], 8, Ul))), 128))
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
const ht = /* @__PURE__ */ A(Il, [["render", ql], ["__scopeId", "data-v-a2f0fe24"]]), { highdict: Xl } = StardustJs, zl = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...q.props()
  },
  emits: [
    ...q.emits()
  ],
  components: { Searcher: Re, Settings: ht },
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
    ...q.computed
  },
  watch: {
    ...q.watch,
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
    ...q.methods,
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
        const i = this.controller.getSearchParams(), n = await this.controller.search(i);
        let l = Xl.get(n, this.controller.listProp);
        return l = this.controller.formatList(this.controller._defaultFormatList(l, n), n), l;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, Wl = {
  key: 1,
  class: "collapse-title"
}, Hl = {
  key: 2,
  class: "collapse-title"
}, Jl = /* @__PURE__ */ T("span", null, "-", -1), Kl = ["value", "checked"], Yl = { key: 1 };
function Gl(e, t, s, i, n, l) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), p = u("el-image"), S = u("el-tag"), v = u("router-link"), w = u("el-icon"), V = u("el-table-column"), j = u("el-button"), g = u("el-dropdown-item"), $ = u("el-dropdown-menu"), D = u("el-dropdown"), X = u("el-table"), z = u("x-pagination"), I = u("el-collapse-item"), E = u("el-collapse"), F = u("x-chart"), U = u("x-dialog"), M = ne("domid"), ee = ne("loading"), fe = ne("el-table-infinite-scroll");
  return d(), y(B, null, [
    T("div", {
      class: K(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      m(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      m(E, {
        modelValue: n.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (_) => n.activeNames = _),
        class: K((n._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          m(I, {
            name: n.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), y("span", Wl, O(e.title), 1)) : (d(), y("span", Hl, [
                C(O(e.title) + "，当前第 ", 1),
                T("span", null, O(e._query.page), 1),
                C(" 页，展示 "),
                T("span", null, O(e._data.length), 1),
                C(" 条数据， 共 "),
                T("span", null, O(e._total || e._data.length), 1),
                C(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              x(e.$slots, "tools-top"),
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, b({ key: 0 }, e._attrs, {
                domids: e.domids,
                onAdd: e._onAdd,
                onSearch: e._onSearch,
                onExport: e._onExport,
                onSearchExport: e._onSearchExport,
                onImport: e._onImport,
                onMultiDelete: e._onMultiDelete
              }), le({
                "tools-end": c(() => [
                  e.hideChart ? k("", !0) : (d(), f(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: l.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  T("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (..._) => e.handleMinus && e.handleMinus(..._))
                  }, [
                    m(a, { name: "FullScreen" }),
                    Jl
                  ]),
                  m(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  m(r, {
                    modelValue: n.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (_) => n.settings = _),
                    visible: !e.hideSettings,
                    width: e._attrs["cols-popover-width"] || 500,
                    onSort: t[2] || (t[2] = (_) => e.$emit("sort", _)),
                    onReset: e.handleResetSettings,
                    onSortChange: e.handleSortChange
                  }, null, 8, ["modelValue", "visible", "width", "onReset", "onSortChange"])
                ]),
                _: 2
              }, [
                e.$slots["tools-prefix"] ? {
                  name: "tools-prefix",
                  fn: c(() => [
                    x(e.$slots, "tools-prefix")
                  ]),
                  key: "0"
                } : void 0,
                e.$slots["tools-suffix"] ? {
                  name: "tools-suffix",
                  fn: c(() => [
                    x(e.$slots, "tools-suffix")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
              x(e.$slots, "tools-bottom"),
              R((d(), f(X, b({ ref: "tableRef" }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), y(B, null, N(e._visibleColumns, (_, Y) => (d(), f(V, b(_, {
                    key: Y,
                    "min-width": _.minWidth,
                    align: _.align || e._attrs.tableAlign || "center",
                    resizable: _.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(_)
                  }), le({ _: 2 }, [
                    ["selection", "index"].includes(_.type) ? void 0 : {
                      name: "default",
                      fn: c((L) => [
                        _.type === "radio" ? (d(), y("input", {
                          key: 0,
                          type: "radio",
                          value: L.$index,
                          checked: L.$index === n.checked,
                          onChange: t[3] || (t[3] = (...ge) => e.handleCheckedChange && e.handleCheckedChange(...ge))
                        }, null, 40, Kl)) : _.slot === "$image" ? (d(), f(p, b({
                          key: 1,
                          src: e._imageSrc(L, _),
                          "preview-src-list": e._imagePreviewSrcList(L, _),
                          "preview-teleported": ""
                        }, _.imageAttrs), null, 16, ["src", "preview-src-list"])) : _.slot === "$tag" ? (d(), f(S, {
                          key: 2,
                          type: e.calcTagType(L, _)
                        }, {
                          default: c(() => [
                            C(O(e.calcTagValue(L, _)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : _.slot === "link" ? (d(), f(v, {
                          key: 3,
                          to: _.to(L)
                        }, {
                          default: c(() => [
                            C(O(_.link ? _.link(L) : L.row[_.linkProp || _.prop]), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"])) : _.slot === "$icon" ? (d(), f(w, {
                          key: 4,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(Q(L.row[_.prop])))
                          ]),
                          _: 2
                        }, 1024)) : _.slot ? x(e.$slots, _.slot, {
                          key: 5,
                          scope: L,
                          column: _,
                          value: L.row[_.prop]
                        }) : e.slotAll ? x(e.$slots, "all", {
                          key: 6,
                          scope: L,
                          column: _,
                          value: L.row[_.prop]
                        }) : (d(), y(B, { key: 7 }, [
                          _.comp === "ElSwitch" || e.table.isRowEdit && L.row.isEditing && (_.visible !== !1 || _.canEdit) ? (d(), f(Q(_.comp || "ElInput"), b({ key: 0 }, { ..._, ..._.formAttrs }, {
                            modelValue: L.row[_.prop],
                            "onUpdate:modelValue": (ge) => L.row[_.prop] = ge,
                            disabled: !L.row.editable || !L.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), y("span", Yl, O(e.calcValue(L.row, _)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? k("", !0) : (d(), f(V, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((_) => [
                      x(e.$slots, "operates-prefix", { scope: _ }),
                      e.operatesDropdown ? (d(), f(D, {
                        key: 0,
                        class: "operates-dropdown"
                      }, {
                        dropdown: c(() => [
                          m($, { class: "operates-dropdown-menu" }, {
                            default: c(() => [
                              e.canEdit(_.row) ? (d(), f(g, { key: 0 }, {
                                default: c(() => [
                                  R((d(), f(j, b({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    onClick: (Y) => e._emit("edit", _)
                                  }), {
                                    default: c(() => [
                                      C(" 编辑 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [M, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canSave(_.row) ? (d(), f(g, { key: 1 }, {
                                default: c(() => [
                                  R((d(), f(j, b({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: _.row._loading,
                                    icon: "collection",
                                    onClick: (Y) => e._emit("row-edit", _)
                                  }), {
                                    default: c(() => [
                                      C(" 保存 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [ee, _.row._loading],
                                    [M, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canCancelEdit(_.row) ? (d(), f(g, { key: 2 }, {
                                default: c(() => [
                                  R((d(), f(j, b({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    onClick: (Y) => e._emit("cancel-edit", _)
                                  }), {
                                    default: c(() => [
                                      C(" 取消编辑 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [M, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canDelete(_.row) ? (d(), f(g, { key: 3 }, {
                                default: c(() => [
                                  R((d(), f(j, b({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    onClick: (Y) => e._emit("delete", _)
                                  }), {
                                    default: c(() => [
                                      C(" 删除 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [M, e.domids.delete]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: c(() => [
                          m(j, b({ type: "primary", ...e._attrs["operates-btn"] }, { icon: "arrow-down" }), {
                            default: c(() => [
                              C(" 操作 ")
                            ]),
                            _: 1
                          }, 16)
                        ]),
                        _: 2
                      }, 1024)) : k("", !0),
                      !e.operatesDropdown && e.canEdit(_.row) ? R((d(), f(j, b({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        onClick: (Y) => e._emit("edit", _)
                      }), {
                        default: c(() => [
                          C(" 编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [M, e.domids.edit]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canSave(_.row) ? R((d(), f(j, b({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: _.row._loading,
                        icon: "collection",
                        onClick: (Y) => e._emit("row-edit", _)
                      }), {
                        default: c(() => [
                          C(" 保存 ")
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [ee, _.row._loading],
                        [M, e.domids["row-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canCancelEdit(_.row) ? R((d(), f(j, b({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        onClick: (Y) => e._emit("cancel-edit", _)
                      }), {
                        default: c(() => [
                          C(" 取消编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [M, e.domids["cancel-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canDelete(_.row) ? R((d(), f(j, b({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        onClick: (Y) => e._emit("delete", _)
                      }), {
                        default: c(() => [
                          C(" 删除 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [M, e.domids.delete]
                      ]) : k("", !0),
                      x(e.$slots, "operates-suffix", { scope: _ })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["infinite-scroll-disabled", "onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [ee, e._loading],
                [fe, e._onLoad]
              ]),
              e._query && e._total && !e.hidePagination ? (d(), f(z, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: l.onPaging
              }, null, 8, ["query", "total", "onSearch"])) : k("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? k("", !0) : (d(), f(U, {
      key: 0,
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (_) => n.dialog.visible = _),
      title: "图表",
      width: "96%",
      onFullscreenchange: l.handleChartDialogFullscreen
    }, {
      default: c(() => [
        m(F, {
          ref: "chartRef",
          height: e._chartHeight,
          option: e._chartOption,
          datasource: { columns: e._columns, search: l.search }
        }, null, 8, ["height", "option", "datasource"])
      ]),
      _: 1
    }, 8, ["modelValue", "onFullscreenchange"]))
  ], 64);
}
const Ql = /* @__PURE__ */ A(zl, [["render", Gl]]), Zl = {
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
}, eo = { class: "mobile-x-table-tools" }, to = { key: 0 }, so = { class: "tools" }, no = { class: "tools-end" };
function io(e, t, s, i, n, l) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), h = ne("domid");
  return d(), y("div", eo, [
    e.$attrs.onAdd ? R((d(), y("div", to, [
      m(o, {
        axis: "xy",
        magnetic: "x",
        icon: "plus",
        class: "flex-center",
        style: { position: "fixed", top: "0", "font-size": "22px", width: "40px", height: "40px", "background-color": "#1989fa", "border-radius": "50%", color: "white" },
        onClick: t[0] || (t[0] = (p) => e.$emit("add"))
      })
    ])), [
      [h, s.domids.add]
    ]) : k("", !0),
    T("div", so, [
      x(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? R((d(), f(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (p) => e.$emit("search"))
      }), {
        default: c(() => [
          m(a, { name: "search" }),
          C(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : k("", !0),
      e.$attrs.onMultiEdit ? R((d(), f(r, b({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (p) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          m(a, { name: "edit" }),
          C(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : k("", !0),
      e.$attrs.onMultiDelete ? R((d(), f(r, b({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (p) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          m(a, { name: "DeleteFilled" }),
          C(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : k("", !0),
      e.$attrs.onExport ? R((d(), f(r, b({ key: 3 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (p) => e.$emit("export"))
      }), {
        default: c(() => [
          m(a, { name: "printer" }),
          C(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : k("", !0),
      e.$attrs.onSearchExport ? R((d(), f(r, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (p) => e.$emit("search-export"))
      }), {
        default: c(() => [
          m(a, { name: "printer" }),
          C(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : k("", !0),
      e.$attrs.onImport ? R((d(), f(r, b({ key: 5 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (p) => e.$emit("import"))
      }), {
        default: c(() => [
          m(a, { name: "UploadFilled" }),
          C(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : k("", !0),
      x(e.$slots, "tools-suffix", {}, void 0, !0),
      T("div", no, [
        x(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const lo = /* @__PURE__ */ A(Zl, [["render", io], ["__scopeId", "data-v-6ef6b95e"]]), oo = {
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
}, ao = { class: "tools" }, ro = { class: "tools-end flex-center" };
function co(e, t, s, i, n, l) {
  const o = u("el-button"), a = u("el-card"), r = ne("domid");
  return d(), f(a, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      T("div", ao, [
        x(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? R((d(), f(o, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          onClick: t[0] || (t[0] = (h) => e.$emit("search"))
        }), {
          default: c(() => [
            C(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.search]
        ]) : k("", !0),
        e.$attrs.onAdd ? R((d(), f(o, b({ key: 1 }, { type: "primary", ...s.addBtn }, {
          icon: "circle-plus-filled",
          onClick: t[1] || (t[1] = (h) => e.$emit("add"))
        }), {
          default: c(() => [
            C(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.add]
        ]) : k("", !0),
        e.$attrs.onMultiEdit ? R((d(), f(o, b({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          icon: "edit",
          onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            C(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids["multi-edit"]]
        ]) : k("", !0),
        e.$attrs.onMultiDelete ? R((d(), f(o, b({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          icon: "DeleteFilled",
          onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            C(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids["multi-delete"]]
        ]) : k("", !0),
        e.$attrs.onExport ? R((d(), f(o, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          onClick: t[4] || (t[4] = (h) => e.$emit("export"))
        }), {
          default: c(() => [
            C(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.export]
        ]) : k("", !0),
        e.$attrs.onSearchExport ? R((d(), f(o, b({ key: 5 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
        }), {
          default: c(() => [
            C(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids["search-export"]]
        ]) : k("", !0),
        e.$attrs.onImport ? R((d(), f(o, b({ key: 6 }, { type: "warning", ...s.importBtn }, {
          icon: "UploadFilled",
          onClick: t[6] || (t[6] = (h) => e.$emit("import"))
        }), {
          default: c(() => [
            C(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.import]
        ]) : k("", !0),
        x(e.$slots, "tools-suffix", {}, void 0, !0),
        T("div", ro, [
          x(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const uo = /* @__PURE__ */ A(oo, [["render", co], ["__scopeId", "data-v-368940cf"]]);
function mt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Qe(e);
}
const ho = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, i = (n) => {
    n ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const l = n ? e._data.slice() : [];
    e.handleSelectionChange(l);
  };
  return m(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: i
  }, null);
}, mo = (e, t) => {
  const {
    rowIndex: s,
    rowData: i
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const l = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(l);
  };
  return m(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, po = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, fo = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return m("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, pe = ([e, t, s, i, n, l]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return m(u("el-button"), b({
    type: i
  }, t._attrs[s + "-btn"], {
    icon: n,
    onClick: r
  }), mt(l) ? l : {
    default: () => [l]
  });
}, go = (e, t) => {
  if (t.canEdit(e.rowData))
    return pe([e, t, "edit", "warning", "edit", "编辑"]);
}, bo = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return pe([e, t, "row-edit", "success", "collection", "保存"]);
}, _o = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return pe([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, yo = (e, t) => {
  if (t.canDelete(e.rowData))
    return pe([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, vo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (l) => mo(l, t);
  if (e.type === "index")
    return (l) => po(l, t);
  if (e.type === "radio")
    return (l) => fo(l, t);
  if (e.slot) {
    if (n[e.slot])
      return n[e.slot];
    if (i[e.slot])
      return (l) => i[e.slot]({
        scope: {
          $index: l.rowIndex,
          row: l.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (l) => i.all({
      scope: {
        $index: l.rowIndex,
        row: l.rowData
      },
      column: e
    });
  return (l) => {
    const {
      rowData: o,
      column: a
    } = l;
    if (a.comp === "ElSwitch" || t.table.isRowEdit && o.isEditing && (a.visible !== !1 || a.canEdit)) {
      const p = (v) => {
        o[a.prop] = v;
      }, S = a.comp || "ElInput";
      return Z(u(S), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: p,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(l.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? m(u("el-tooltip"), {
      content: r
    }, mt(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, wo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, n = e.map((l, o) => {
    const {
      tableAttrs: a = {}
    } = l, r = {
      ...l,
      key: l.prop,
      dataKey: l.prop,
      title: l.label,
      width: l.width || a.width || l.minWidth || a.minWidth || l.maxWidth || a.maxWidth,
      align: l.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = ho(t)), r.cellRenderer = vo(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 150,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(l) {
      return m("div", {
        class: "operates"
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, go(l, t), bo(l, t), _o(l, t), yo(l, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), n;
}, So = {
  convertColumnsForTableV2: wo
}, ko = {
  name: "XTableV2",
  props: {
    ...q.props(),
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
    ...q.emits()
  ],
  components: { Searcher: Re, Settings: ht },
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
    ...q.computed
  },
  watch: {
    ...q.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...q.methods,
    convertColumnsForTableV2: So.convertColumnsForTableV2
  }
}, $o = { key: 1 };
function Co(e, t, s, i, n, l) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), p = u("el-table-v2"), S = u("el-auto-resizer"), v = u("x-pagination"), w = u("el-collapse-item"), V = u("el-collapse"), j = ne("loading");
  return d(), y("div", {
    class: K(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    m(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (g) => e._emit("search", g))
    }, null, 8, ["uid", "columns", "config"]),
    m(V, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (g) => n.activeNames = g),
      class: K((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        m(w, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), y("span", $o, O(e.title), 1))
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
            }), le({
              "tools-end": c(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (g) => n.settings = g),
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
                  x(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  x(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
            m(S, {
              style: gt({ height: s.height })
            }, {
              default: c(({ width: g, height: $ }) => [
                R((d(), f(p, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: l.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: g,
                  height: $
                }), le({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: c(() => [
                      x(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: c(() => [
                      x(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: c(() => [
                      x(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [j, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(v, {
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
const xo = /* @__PURE__ */ A(ko, [["render", Co]]), ye = ["selection", "radio"], Vo = {
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
      ye.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !ye.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (ye.includes(t)) {
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
}, Eo = { class: "x-table-viewer" };
function Ao(e, t, s, i, n, l) {
  const o = u("x-dialog");
  return d(), y("div", Eo, [
    m(o, b(l._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": l.handleBeforeClose,
      onSubmit: l.handleSubmit,
      onCancel: l.handleCancel
    }), {
      default: c(() => [
        (d(), f(Q(s.useTableV2 ? "x-table-v2" : "x-table"), b({
          tref: l.table.tableRef,
          "onUpdate:tref": t[0] || (t[0] = (a) => l.table.tableRef = a),
          table: l.table
        }, l._tableAttrs, {
          onSearch: s.controller.handleSearch
        }), null, 16, ["tref", "table", "onSearch"]))
      ]),
      _: 1
    }, 16, ["modelValue", "title", "before-close", "onSubmit", "onCancel"])
  ]);
}
const Oo = /* @__PURE__ */ A(Vo, [["render", Ao], ["__scopeId", "data-v-e6f36700"]]), jo = {
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
}, To = { class: "mobile-x-tags" };
function Fo(e, t, s, i, n, l) {
  const o = u("van-tag");
  return d(), y("div", To, [
    (d(!0), y(B, null, N(l._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        C(O(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Do = /* @__PURE__ */ A(jo, [["render", Fo], ["__scopeId", "data-v-d8beefdf"]]), Io = {
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
}, Ro = { class: "pc-x-tags" };
function Bo(e, t, s, i, n, l) {
  const o = u("el-tag");
  return d(), y("div", Ro, [
    (d(!0), y(B, null, N(l._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        C(O(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Mo = /* @__PURE__ */ A(Io, [["render", Bo], ["__scopeId", "data-v-bd702be1"]]), No = {
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
}, Lo = { class: "x-tinymce" }, Po = ["id", "innerHTML"];
function Uo(e, t, s, i, n, l) {
  return d(), y("div", Lo, [
    T("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, Po)
  ]);
}
const qo = /* @__PURE__ */ A(No, [["render", Uo]]), Xo = {
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
      var n;
      const i = ((n = this.service) == null ? void 0 : n.API_BASE_URL) + "/" + e.filename;
      this.$emit("update:modelValue", i);
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
        const i = (this.baseURL || this.service.API_BASE_URL) + "/";
        s = s.map((n) => i + n), this.$emit("update:modelValue", s);
      } catch (t) {
        return this.$message.error(t.toString());
      }
    }
  }
}, Be = (e) => (Ee("data-v-a3a105f3"), e = e(), Ae(), e), zo = { class: "mask" }, Wo = {
  key: 0,
  class: "el-upload__text"
}, Ho = /* @__PURE__ */ Be(() => /* @__PURE__ */ T("em", null, "点击上传", -1)), Jo = /* @__PURE__ */ Be(() => /* @__PURE__ */ T("br", null, null, -1)), Ko = /* @__PURE__ */ Be(() => /* @__PURE__ */ T("br", null, null, -1)), Yo = {
  key: 0,
  class: "path"
};
function Go(e, t, s, i, n, l) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), f(r, b({
    "file-list": n.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (h) => n.fileList = h),
    drag: "",
    disabled: n.disabled,
    action: l.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": l.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: c(() => [
      T("div", zo, [
        m(o, { name: "upload-filled" }),
        n.disabled ? k("", !0) : (d(), y("div", Wo, [
          C(" 将文件拖到此处，或"),
          Ho,
          Jo,
          Ko,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: G(l.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              C(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : k("", !0)
        ]))
      ]),
      l.filepath ? (d(), y("div", Yo, O(s.modelValue), 1)) : k("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Qo = /* @__PURE__ */ A(Xo, [["render", Go], ["__scopeId", "data-v-a3a105f3"]]), Zo = {
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
      W({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, ea = ["src"];
function ta(e, t, s, i, n, l) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("x-dialog");
  return d(), y(B, null, [
    m(r, b({
      "file-list": n.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (p) => n.fileList = p),
        l.handleSelect
      ],
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: l.limit,
      class: ["x-image-uploader", { disabled: e.$attrs.disabled || l.images.length >= l.limit }],
      "on-preview": l.handlePreview,
      "on-exceed": l.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1,
      "on-remove": l.handleRemove
    }), {
      default: c(() => [
        m(a, null, {
          default: c(() => [
            m(o)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "onUpdate:fileList", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload", "on-remove"]),
    m(h, {
      modelValue: n.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (p) => n.dialogVisible = p),
      actionsheet: "",
      title: "预览图片" + (n.previewingImage.name || "")
    }, {
      default: c(() => [
        T("img", {
          src: n.previewingImage.url,
          alt: "previewing-image",
          class: "previewing-image"
        }, null, 8, ea)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const sa = /* @__PURE__ */ A(Zo, [["render", ta], ["__scopeId", "data-v-0afe3ea6"]]), ve = {
  xactionsheet: Lt,
  xautorows: zt,
  mobilexbutton: Jt,
  pcxbutton: Gt,
  xchart: as,
  mobilexcheckboxs: cs,
  pcxcheckboxs: ps,
  mobilexcol: bs,
  pcxcol: vs,
  mobilexdialog: Cs,
  pcxdialog: As,
  xdistrictselect: Ts,
  mobilexform: Us,
  pcxform: Ws,
  mobilexformitem: Ys,
  pcxformitem: Gs,
  mobilexicon: tn,
  pcxicon: on,
  xinfo: wi,
  xlooper: Ci,
  mobilexpagination: Ei,
  pcxpagination: ji,
  xpicker: Di,
  mobilexradios: Bi,
  pcxradios: Pi,
  mobilexrow: zi,
  pcxrow: Ki,
  mobilexscan: Qi,
  pcxscan: tl,
  mobilexselect: il,
  pcxselect: cl,
  xselectv2: gl,
  mobilextable: Dl,
  pcxtable: Ql,
  mobilextabletools: lo,
  pcxtabletools: uo,
  xtablev2: xo,
  xtableviewer: Oo,
  mobilextags: Do,
  pcxtags: Mo,
  xtinymce: qo,
  xfileuploader: Qo,
  ximageuploader: sa
}, re = {};
for (let e in ve)
  re[ve[e].name] = ve[e];
const { ElInfiniteScroll: Ke } = window.ElementPlus || {}, ce = ".el-scrollbar__wrap", Ye = (e, t) => {
  na(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", i = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (i < 1 ? 1 : i) + "");
}, na = (e, t, s) => {
  let i;
  s.forEach((n) => {
    i = e.getAttribute(n), i !== null ? t.setAttribute(n, i) : t.removeAttribute(n);
  });
}, ia = {
  name: "el-table-infinite-scroll",
  mounted(e, t, s, i) {
    const n = e.querySelector(ce);
    if (!n)
      throw new Error(`${ce} element not found.`);
    n.style.overflowY = "auto", setTimeout(() => {
      !e.style.height && !e.style.maxHeight && (n.style.height = "400px", console.warn("el-table height required, otherwise will set scrollbar default height: 400px")), Ye(e, n), Ke.mounted(n, t, s, i);
    }, 0);
  },
  updated(e) {
    Ye(e, e.querySelector(ce));
  },
  unmounted(e, ...t) {
    const s = e.querySelector(ce);
    Ke.unmounted(s, ...t);
  }
}, we = {
  ElTableInfiniteScroll: ia
}, la = (e) => ({
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
}), xe = (() => {
  const e = Object.keys(re), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = re[i]);
  for (const i of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(i.toLowerCase())) ? s[i] = la(i) : s[i] = re[i];
  return s;
})(), oa = (e, t) => {
  for (let s in xe)
    e.component(s, xe[s]);
  for (let s in we)
    e.directive(we[s].name, we[s]);
}, ra = {
  version: "1.2.76",
  ...xe,
  ...rt,
  ...Bt,
  install: oa
};
export {
  dt as BaseController,
  ie as Confirm,
  ct as CrudController,
  W as Message,
  ue as Notify,
  Rt as TempCrudController,
  he as baseDialog,
  et as baseForm,
  Tt as baseModel,
  tt as baseTable,
  Bt as controllers,
  ra as default,
  yt as effects,
  H as formatOptions,
  vt as formatPrecision,
  lt as initDefaultForm,
  nt as initDialog,
  Ft as initFields,
  je as initForm,
  it as initFormRules,
  Dt as initModel,
  st as initTable,
  ot as isWhenMatched,
  at as triggers,
  rt as utils,
  Ze as validateForm
};
