import { toRaw as st, nextTick as ee, watch as fe, resolveComponent as u, openBlock as d, createBlock as m, mergeProps as _, createElementBlock as v, Fragment as O, renderList as T, withCtx as c, renderSlot as $, toDisplayString as V, useCssVars as Fe, createTextVNode as E, createSlots as K, resolveDynamicComponent as Q, createCommentVNode as y, createVNode as f, normalizeClass as X, normalizeProps as le, guardReactiveProps as Me, h as z, isVNode as Te, createElementVNode as j, withModifiers as Y, pushScopeId as Be, popScopeId as Re, resolveDirective as oe, withDirectives as R, normalizeStyle as nt } from "vue";
const it = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const i = e.getContext("2d");
  class n {
    constructor(M, W, q, Z, Ze, et, tt) {
      this.x = M, this.y = W, this.radius = q, this.color = Z, this.vx = Ze, this.vy = et, this.ctx = tt;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const l = () => i.clearRect(0, 0, t, s), o = (S) => Math.floor(Math.random() * S);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const S = i.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = C * 30), a >= 1 && (a = 1, r = -r, h = C * 30)), S.addColorStop(0, "rgba(250, 220, 20, 0.5)"), S.addColorStop(a, "rgba(20, 20, 20, 0.5)"), i.fillStyle = S, i.fillRect(0, 0, t, s);
  }, w = Math.floor(t / 100), g = Math.floor(s / 100), C = 20, A = Math.round(1e3 / C), D = Array.from({ length: 52 }).map(() => {
    const S = Math.floor(o(w + g) * 1.5 + o(5));
    let M = o(t), W = o(s);
    M = Math.min(Math.max(S, M), t - S), W = Math.min(Math.max(S, W), s - S);
    let q = o(2) ? (o(2) + 2) * w : (o(-1) - 2) * w, Z = o(2) ? (o(2) + 2) * g : (o(-1) - 2) * g;
    return q = Math.floor(q / C), Z = Math.floor(Z / C), new n(
      M,
      W,
      S,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      q,
      Z,
      i
    );
  });
  let F, I;
  e.addEventListener("mouseover", (S) => {
    F = S.pageX, I = S.pageY;
  }), e.addEventListener("mousemove", (S) => {
    if (F === void 0) {
      F = S.pageX, I = S.pageY;
      return;
    }
    const M = S.pageX - F, W = S.pageY - I;
    D.forEach((q) => {
      q.x += M / C, q.y += W / C;
    }), F = S.pageX, I = S.pageY;
  });
  let B = Date.now(), b = null;
  const x = () => {
    Date.now() - B >= A && (l(), p(), D.forEach((S) => S.update()), B = Date.now()), b = requestAnimationFrame(x);
  };
  return b = requestAnimationFrame(x), () => cancelAnimationFrame(b);
}, lt = ({
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
  const p = r.measureText(e).width + t, w = s + t;
  for (let g = t / 2; g < l; g += w)
    for (let C = t / 2; C < n; C += p)
      r[o + "Text"](e, C, g);
  return a;
}, ot = {
  pop: it,
  createWatermark: lt
}, Ne = async (e) => {
  var i, n;
  const t = await ((i = e.formRef) == null ? void 0 : i.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((l) => {
    var o, a;
    return ((o = l.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = l.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((l) => Ne(l.form)));
  return t && s.every((l) => l);
}, at = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, L = (e, t) => {
  const s = e.__v_isRef ? e.value : st(e);
  let i = s;
  if (typeof s[0] != "object" && (i = s.map((l) => ({ text: l, value: l }))), !t.sort)
    return i;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((l, o) => l[n].localeCompare(o[n]));
}, { ElMessage: rt, ElNotification: dt, ElMessageBox: ct } = window.ElementPlus || {}, { showToast: ut, showNotify: ht, showConfirmDialog: pt } = window.vant || {}, J = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? ((i === "error" || i === "warning") && (t.type = "fail"), ut(t)) : rt({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, ne = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? (i === "error" && (t.type = "danger"), ht(t)) : dt({
    showClose: !0,
    ...t
  });
}, ie = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = pt(e) : t = ct.confirm(
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
  J[e] = J[e[0]] = (t) => J({ type: e, ...typeof t != "string" ? t : { message: t } }), ne[e] = ne[e[0]] = (t) => ne({ type: e, ...typeof t != "string" ? t : { message: t } }), ie[e] = ie[e[0]] = (t) => ie({ type: e, ...t });
const mt = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    i.matched.length ? l() : l("/404");
  });
}, ft = (e, t, s) => {
  e.afterEach((i, n) => {
    const l = i.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...l].filter((o) => o).reverse().join("-");
  });
}, gt = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    var o;
    return (o = i.meta) != null && o.visitable || t.acl.paths.includes(i.path) ? l() : (J.e("无权访问页面: " + i.path), l("/404"));
  }), ee(() => {
    fe(() => t.acl.menus, (i) => {
      const n = t.acl.paths, l = (o, a) => {
        var h, p, w, g, C;
        const r = (a != null && a.path ? a.path + "/" : "") + o.path;
        o.meta || (o.meta = {}), a && (o.meta.hidden == null && ((p = o.meta).hidden ?? (p.hidden = (h = a.meta) == null ? void 0 : h.hidden), o.meta = { ...o.meta }), o.meta.visitable == null && ((g = o.meta).visitable ?? (g.visitable = (w = a.meta) == null ? void 0 : w.visitable), o.meta = { ...o.meta })), o.meta.hidden !== !1 && (o.meta.hidden = !n.includes(r)), (C = o.children) == null || C.forEach((A) => l(A, o));
      };
      s.forEach(l);
    }, { immediate: !0 });
  });
}, _t = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    i.name === "Login" && t.getters.logined && i.query.redirectTo ? l(i.query.redirectTo) : l();
  });
}, bt = {
  check404: mt,
  setTitle: ft,
  checkRolesPages: gt,
  redirectTo: _t
}, Ie = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), De = (e = {}) => ({
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
}), Ue = () => ({
  ...Ie(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), yt = () => ({
  table: De(),
  dialog: Ue()
}), { funcs: he } = StardustJs, vt = (e, t) => {
  for (let s in e) {
    const i = e[s];
    !i || typeof i != "object" || (s === "table" && e[s]._isBaseTable && Pe(i, t), s === "dialog" && e[s]._isBaseDialog && Le(i, t), s === "form" && e[s]._isBaseForm && ge(i, t));
  }
  return e;
}, Pe = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), Le = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), ge(e, t), e), ge = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((i) => i.visible !== !1)), Xe(e.form, e.formItems), e.initialForm = he.deepCopy(e.form), e.initialFormRules = he.deepCopy(e.formRules), fe(() => e.formItems, () => {
  qe(e);
}, { immediate: !0, deep: !0 }), e), qe = (e) => {
  const { formItems: t, initialFormRules: s } = e, i = t.filter((l) => {
    let { formAttrs: o = {}, required: a = !1 } = l;
    return a = "required" in o ? o.required : a, !l.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(l.prop) && a !== !1;
  }).map((l) => l.prop);
  if (Object.assign(e.formRules, he.deepCopy(s)), Object.keys(e.formRules).forEach((l) => {
    l in s || delete e.formRules[l];
  }), !i.length)
    return;
  const n = {};
  return i.forEach((l) => {
    if (e.formRules[l])
      return;
    const o = t.find((C) => C.prop === l), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = We[a], h = [], p = "options" in o, g = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${p ? "选择" : "输入"}${(o == null ? void 0 : o.label) || l}` };
    o.validator && (g.validator = o.validator), o.asyncValidator && (g.asyncValidator = o.asyncValidator), o.comp ? h.push({ ...g, trigger: r.change }) : h.push({ ...g, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...g, trigger: r.blur }), n[l] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, Xe = (e, t, s = !0) => {
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
      const w = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + w), n["end-placeholder"] || (n["end-placeholder"] = "结束" + w), l = [];
    }
    i[n.prop] = l;
  }), Object.assign(e, { ...i, ...e }), e;
}, ze = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [i, n] = e.split(s);
  n = n.split("|");
  let l = t[i];
  typeof l == "number" ? l += "" : typeof l == "string" && (l = l.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? l.startsWith(a) : o === "*=" ? l.includes(a) : o === "$=" ? l.endsWith(a) : o === "~=" ? !l.includes(a) : o === "!=" ? l !== a : a === l);
}, We = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, He = {
  effects: ot,
  validateForm: Ne,
  formatPrecision: at,
  formatOptions: L,
  Message: J,
  Notify: ne,
  Confirm: ie,
  middlewares: bt,
  baseForm: Ie,
  baseTable: De,
  baseDialog: Ue,
  baseModel: yt,
  initModel: vt,
  initTable: Pe,
  initDialog: Le,
  initForm: ge,
  initFormRules: qe,
  initDefaultForm: Xe,
  isWhenMatched: ze,
  triggers: We
};
class Je {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const i = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => i }
      }), this._initLifeCycles();
    }
    ee(this.onInit);
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
    throw "请自行注入 rouer";
  }
  get route() {
    return this.router.currentRoute.value;
  }
  get store() {
    throw "请自行注入 store";
  }
  get uiUtils() {
    return He;
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
const { funcs: Se, highdict: $e, dates: re } = StardustJs, { file: ke, excel: se } = StardustBrowser;
class Ke extends Je {
  constructor(t) {
    super(t);
    const { model: s, table: i, dialog: n, dbModelName: l = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = i || (s == null ? void 0 : s.table) || null, this.dialog = n || (s == null ? void 0 : s.dialog) || null, this.dbModelName = l, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], ee(() => {
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
      "handleMultiEdit",
      "handleMultiDelete",
      "handleSave",
      "handleSubmit",
      "handleCancel",
      "handleSortChange",
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
  async handleSearch(t) {
    if (!await this.beforeSearch(t))
      return;
    t = this.getSearchParams(t), this.table.loading = !0;
    const s = await this.search(t);
    let i = $e.get(s, this.listProp);
    return i = this.formatList(this._defaultFormatList(i, s), s), Object.assign(this.table, {
      list: i,
      total: s.total,
      loading: !1
    }), this.afterSearch(i, t, s), s;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await ee(), await Se.sleep(50), this._clearValidate(), this.afterAdd());
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
    }), await ee(), (i = this.dialog.formRef) == null || i.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (!await this.beforeDelete({ $index: t, row: s }))
      return;
    if (await this.uiUtils.Confirm({
      message: "确定要删除吗？",
      title: "警告",
      type: "warning"
    })) {
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
  async handleExport(t = this.exportType, s = "导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      this.uiUtils.Message({ type: "error", message: "不支持的导出类型" });
      return;
    }
    this._isExporting = !0;
    const { list: i, selection: n, ref: l } = this.table;
    let o = n.length > 0 ? n : i;
    o = Se.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(l._visibleColumns, "current"), r = a.map((g) => g.prop), h = a.map((g) => g.label);
    o = o.map((g) => r.map((C) => g[C]));
    let p = null;
    t === "csv" ? p = se.export2Csv : p = se.export2Excel;
    let w = { header: h, data: o, filename: s };
    w = await this.processExporting(w), p(w), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      this.uiUtils.Message({ type: "error", message: "不支持的导出类型" });
      return;
    }
    this._isExporting = !0;
    const i = await this.dbTable.search(this.getSearchExportParams());
    let n = i.data;
    n = this.formatList(n, i), n = this.processExportingData(n, "search");
    const l = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = l.map((p) => p.prop), a = l.map((p) => p.label);
    n = n.map((p) => o.map((w) => p[w]));
    let r = null;
    t === "csv" ? r = se.export2Csv : r = se.export2Excel;
    let h = { header: a, data: n, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    const t = await ke.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), i = await ke.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      n = window.Papa.parse(i, { header: !0 }).data;
    else {
      const l = window.XLSX.read(i, {});
      n = XLSX.utils.sheet_to_json(l.Sheets.SheetJS);
    }
    if (n.length > 0) {
      const l = {};
      this.table.columns.forEach((a) => l[a.label] = a.prop);
      const o = Object.keys(n[0]);
      n = n.map((a) => {
        const r = {};
        return o.forEach((h) => r[l[h]] = a[h]), r;
      });
    }
    n = this.processImportingData(n), await this.dbTable.func(["bulkCreate", n]), this.uiUtils.Message({ type: "success", message: "导入成功" }), this.handleSearch();
  }
  handleMultiEdit() {
    const { selection: t, checked: s } = this.table, i = s || t[0];
    if (!i) {
      this.uiUtils.Message({ type: "warning", message: "尚未选择要编辑的数据" });
      return;
    }
    if (!s && t.length > 1) {
      this.uiUtils.Message({ type: "warning", message: "请仅选择一条数据进行编辑" });
      return;
    }
    this.handleEdit({ $index: i._idx, row: i });
  }
  async handleMultiDelete() {
    const { selection: t } = this.table;
    if (!t.length) {
      this.uiUtils.Message({ type: "warning", message: "尚未选择要删除的数据" });
      return;
    }
    if (!await this.uiUtils.Confirm({
      type: "warning",
      title: "警告",
      message: `确定删除选中的 ${t.length} 条数据吗？`
    }))
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
    if (t = t instanceof Event ? this.model.form || this.model.dialog.form : t, this._isSubmitting)
      return;
    const s = this.model.formRef || this.model.dialog.formRef;
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
    return this._isSubmitting = !1, n.err || this.uiUtils.Message({ type: "success", message: "保存成功" }), this.router.go(-1), n;
  }
  async handleSubmit(t) {
    if (t = t instanceof Event ? null : t, this._isSubmitting || !this.dialog.visible)
      return !1;
    this._isSubmitting = !0;
    const s = t || this.dialog.form;
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
  handleSortChange({ prop: t, order: s }) {
    this.table.query.order = !t || !s ? [] : [
      [t, s.slice(0, -6)]
    ], this.handleSearch();
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
    return Object.assign({}, JSON.parse(this._lastSearchParams), t, this.table.query);
  }
  getAddParams(t) {
    const s = Object.keys(this.dialog.initialForm), i = {};
    return s.length ? s.forEach((n) => i[n] = t[n]) : Object.assign(i, t), this.dialog.formItems.forEach((n) => {
      let l = i[n.model || n.prop];
      n.type === "number" ? l = this.uiUtils.formatPrecision(l, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? l = re.format(l) : (!n.type || n.type === "date") && (l = re.format(l, "", !1))), i[n.model || n.prop] = l;
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
  _defaultFormatList(t, s) {
    const { columns: i, query: n } = this.table, { page: l, limit: o } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (l - 1) * o + r + 1;
    }), i.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: p, formatter: w, autoFill: g } = a.tableAttrs || {}, { modelName: C } = a.formAttrs || {};
      if (C && g)
        t.forEach((A) => A[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const D = fe(() => a.options, (F, I) => {
          const B = I ? this.table.list : t, b = wt(a);
          B.forEach((x, S) => {
            const M = x[r];
            x[`_formatted_${r}`] = b[M] || (w == null ? void 0 : w(M, x, S)) || M;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(D);
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
    const r = $e.mapField(a.data, o, l);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = r[h[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingColumns(t, s = "current") {
    return t.filter((i) => !["index", "selection", "expand", "radio", "_index"].includes(i.type)).filter((i) => !i._virtual);
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
        typeof a == "boolean" ? l[o] = a && 1 || 0 : a instanceof Date ? (l[o] = re.format(a), l[o].endsWith(" 00:00:00") && (l[o] = l[o].slice(0, -9))) : typeof a == "object" && (l[o] = JSON.stringify(a));
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
    return Object.values(t).some((n) => !s.includes(n)) ? !0 : await this.uiUtils.Confirm({
      message: "表单所有数据都是空，确定要继续提交吗？",
      title: "警告",
      type: "warning"
    });
  }
  _showError(t) {
    this.uiUtils.Message({
      type: "error",
      message: typeof t == "object" ? t.message || t.err || t.toString() : t
    });
  }
  get _isMobile() {
    var s, i;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((i = this.dialog) == null ? void 0 : i.formRef);
    return t ? t.$.attrs.class.indexOf("mobile") >= 0 : window.isMobile;
  }
}
const wt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: n = "value" } = s, l = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    l[o[n]] = o[i];
  }), l;
};
class St extends Ke {
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
const $t = {
  BaseController: Je,
  CrudController: Ke,
  TempCrudController: St
}, k = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, n] of t)
    s[i] = n;
  return s;
}, kt = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Ct(e, t, s, i, n, l) {
  const o = u("van-action-sheet");
  return d(), m(o, _(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Et = /* @__PURE__ */ k(kt, [["render", Ct]]), xt = {
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
}, Vt = { class: "x-auto-rows" }, At = { key: 1 };
function Ot(e, t, s, i, n, l) {
  const o = u("x-col"), a = u("x-row");
  return d(), v("div", Vt, [
    (d(!0), v(O, null, T(l.rows, (r, h) => (d(), m(a, _({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), v(O, null, T(r, (p, w) => (d(), m(o, _(p, {
          span: p.span || s.span,
          key: w,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            p.slot || e.$attrs.slot ? $(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), v("span", At, V(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const jt = /* @__PURE__ */ k(xt, [["render", Ot]]), Ft = {
  name: "MobileXButton"
};
function Mt(e, t, s, i, n, l) {
  const o = u("van-button");
  return d(), m(o, null, {
    default: c(() => [
      $(e.$slots, "default")
    ]),
    _: 3
  });
}
const Tt = /* @__PURE__ */ k(Ft, [["render", Mt]]), Bt = {
  name: "PcXButton"
};
function Rt(e, t, s, i, n, l) {
  const o = u("el-button");
  return d(), m(o, null, {
    default: c(() => [
      $(e.$slots, "default")
    ]),
    _: 3
  });
}
const Nt = /* @__PURE__ */ k(Bt, [["render", Rt]]);
const { funcs: It } = StardustBrowser, _e = {
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
      return It.calcPixel(this.height) * this.zoom + "px";
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
      for (let s = 0; s < Math.ceil(e / t); s++)
        setTimeout(this.chart.resize, t * s);
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
}, Ce = () => {
  Fe((e) => ({
    "127c024a": e.zoomedHeight,
    "137ee0b8": e.zoom
  }));
}, Ee = _e.setup;
_e.setup = Ee ? (e, t) => (Ce(), Ee(e, t)) : Ce;
const Dt = {
  class: "x-chart",
  ref: "el"
};
function Ut(e, t, s, i, n, l) {
  return d(), v("div", Dt, null, 512);
}
const Pt = /* @__PURE__ */ k(_e, [["render", Ut], ["__scopeId", "data-v-0c2da986"]]), Lt = {
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
        placeholder: s,
        rules: i,
        required: n,
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: L
  }
};
function qt(e, t, s, i, n, l) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), m(a, _({ class: "mobile-x-checkboxs" }, l.attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), v(O, null, T(l.formatOptions(s.options, this), (r) => (d(), m(o, _(l.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: c(() => [
          E(V(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Xt = /* @__PURE__ */ k(Lt, [["render", qt]]), zt = {
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
        placeholder: s,
        ...i
      } = this.$attrs;
      return i;
    }
  },
  methods: {
    formatOptions: L
  }
};
function Wt(e, t, s, i, n, l) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), m(a, _({ class: "pc-x-checkboxs" }, l.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r))
  }), {
    default: c(() => [
      (d(!0), v(O, null, T(l.formatOptions(s.options, this), (r) => (d(), m(o, _(l.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: c(() => [
          E(V(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const Ht = /* @__PURE__ */ k(zt, [["render", Wt]]), Jt = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Kt(e, t, s, i, n, l) {
  const o = u("van-col");
  return d(), m(o, _(l.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      $(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Yt = /* @__PURE__ */ k(Jt, [["render", Kt]]), Gt = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Qt(e, t, s, i, n, l) {
  const o = u("el-col");
  return d(), m(o, _(l.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      $(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Zt = /* @__PURE__ */ k(Gt, [["render", Qt]]), es = {
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
function ts(e, t, s, i, n, l) {
  const o = u("van-dialog");
  return d(), m(o, _({ width: "92%" }, e.$attrs, {
    show: l.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => l.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: t[1] || (t[1] = (a) => e.$emit("submit")),
    onCancel: t[2] || (t[2] = (a) => e.$emit("cancel"))
  }), K({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: c(() => [
        $(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: c(() => [
        $(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: c(() => [
        $(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button"]);
}
const ss = /* @__PURE__ */ k(es, [["render", ts]]), ns = {
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
}, is = {
  key: 1,
  class: "el-dialog__title"
};
function ls(e, t, s, i, n, l) {
  const o = u("x-icon"), a = u("el-button");
  return d(), m(Q(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: l.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => l.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: c(() => [
      e.$slots.header ? $(e.$slots, "header", { key: 0 }) : (d(), v("span", is, V(e.$attrs.title), 1)),
      s.drawer ? y("", !0) : (d(), m(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: l.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? $(e.$slots, "footer", { key: 0 }) : y("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), m(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          E(V(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : y("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), m(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          E(V(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : y("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? $(e.$slots, "default", { key: 0 }) : y("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const os = /* @__PURE__ */ k(ns, [["render", ls]]), U = {}, H = {
  provinces: [],
  cities: [],
  counties: []
}, as = {
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
      provinces: Object.freeze(H.provinces),
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
      this.cities = Object.freeze(H.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(H.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(U, this.areaList), H.provinces = Object.entries(U.province_list).map((e) => ({ value: e[0], text: e[1] })), H.cities = Object.entries(U.city_list).map((e) => ({ value: e[0], text: e[1] })), H.counties = Object.entries(U.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(H.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const i = Object.entries(U.province_list).find((n) => n[1] === e);
        this.province = i == null ? void 0 : i[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const i = Object.entries(U.city_list).find((n) => n[1] === t);
        this.city = i == null ? void 0 : i[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const i = Object.entries(U.county_list).find((n) => n[1] === s);
        this.county = i == null ? void 0 : i[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && U.province_list[this.province] || "",
        this.number > 1 && this.city && U.city_list[this.city] || "",
        this.number > 2 && this.county && U.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function rs(e, t, s, i, n, l) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), m(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      f(a, { span: l.span }, {
        default: c(() => [
          f(o, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => n.province = h),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      l.number > 1 ? (d(), m(a, {
        key: 0,
        span: l.span
      }, {
        default: c(() => [
          f(o, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => n.city = h),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : y("", !0),
      l.number > 2 ? (d(), m(a, {
        key: 1,
        span: l.span
      }, {
        default: c(() => [
          f(o, {
            modelValue: n.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => n.county = h),
            options: n.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : y("", !0)
    ]),
    _: 1
  });
}
const ds = /* @__PURE__ */ k(as, [["render", rs]]);
function cs() {
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
function us() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function hs() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function ps() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return ze(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function ms() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function fs(e) {
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
}
function gs(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function _s(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const G = {
  props: cs,
  computed: {
    _model: us,
    _items: hs,
    _visibleItems: ps,
    _rules: ms
  },
  methods: {
    calcPlaceholder: fs,
    calcStyle: gs,
    formatModelValue: _s
  }
}, bs = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...G.props(),
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
    ...G.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...G.methods
  }
};
function ys(e, t, s, i, n, l) {
  const o = u("mobile-x-form-item"), a = u("van-cell-group"), r = u("van-form");
  return d(), m(r, {
    ref: "formRef",
    class: X(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? $(e.$slots, "pre", { key: 0 }) : y("", !0),
      f(a, le(Me(e.$attrs)), {
        default: c(() => [
          (d(!0), v(O, null, T(e._visibleItems, (h, p) => (d(), m(o, _(h, {
            rules: e._rules[h.prop] || h.rules,
            key: p,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (w) => e._model[h.prop] = w,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: c(() => [
              h.slot ? $(e.$slots, h.slot, le(_({ key: 0 }, h))) : y("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? $(e.$slots, "default", { key: 1 }) : y("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const vs = /* @__PURE__ */ k(bs, [["render", ys]]), ws = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...G.props(),
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
    ...G.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...G.methods
  }
}, Ss = { key: 1 };
function $s(e, t, s, i, n, l) {
  const o = u("pc-x-form-item"), a = u("el-form"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), m(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: X((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      f(r, {
        name: n.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? $(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", Ss, V(s.title), 1))
        ]),
        default: c(() => [
          f(a, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: c(() => [
              e.$slots.pre ? $(e.$slots, "pre", { key: 0 }) : y("", !0),
              (d(!0), v(O, null, T(e._visibleItems, (p, w) => (d(), m(o, _({
                "label-width": s.labelWidth,
                "show-tooltip": e.$attrs.showTooltip || !1
              }, p, {
                key: w,
                modelValue: e._model[p.prop],
                "onUpdate:modelValue": [(g) => e._model[p.prop] = g, (g) => p.onChange || null],
                prop: p.prop || p.model,
                clearable: p.clearable !== !1,
                placeholder: e.calcPlaceholder(p),
                style: e.calcStyle(p)
              }), {
                default: c(() => [
                  p.slot ? $(e.$slots, p.slot, { key: 0 }) : y("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
              e.$slots.default ? $(e.$slots, "default", { key: 1 }) : y("", !0)
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
const ks = /* @__PURE__ */ k(ws, [["render", $s]]);
function Cs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Te(e);
}
const pe = (e) => {
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
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  }, p = [];
  return o === "html" ? h.class = "comp-html" : l = u(l), a && (h.innerHTML = a), r && p.push(r), z(l, h, {
    default: () => p
  });
}, Es = (e) => {
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
    h = f(u("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Cs(p = pe(e)) ? p : {
      default: () => [p]
    });
  } else
    h = pe(e);
  return z(u("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [h],
    label: () => z("span", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
        display: "inline-block"
      }
    }, [s.label])
  });
}, xs = (e) => {
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
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  };
  return a && s.label || r ? z(u("van-field"), p, {
    input: () => a && s.label ? l.default() : pe(e)
  }) : (Object.assign(p, i), z(u("van-field"), p));
}, Vs = {
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
    return xs(this);
  }
};
const be = {
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
        style: w,
        html: g,
        class: C,
        ...A
      } = { ...this.$props, ...this.$attrs };
      return A;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Es(this);
  }
}, xe = () => {
  Fe((e) => ({
    ba9709f0: e.width
  }));
}, Ve = be.setup;
be.setup = Ve ? (e, t) => (xe(), Ve(e, t)) : xe;
const As = /* @__PURE__ */ k(be, [["__scopeId", "data-v-d2cde1e2"]]), Ae = /* @__PURE__ */ Object.assign({}), Os = {
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
      await Promise.all(Object.keys(Ae).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await Ae[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, js = ["src"];
function Fs(e, t, s, i, n, l) {
  const o = u("van-icon");
  return n.icons[s.name] ? (d(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, js)) : (d(), m(o, _({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Ms = /* @__PURE__ */ k(Os, [["render", Fs]]), Oe = /* @__PURE__ */ Object.assign({}), Ts = {
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
      await Promise.all(Object.keys(Oe).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await Oe[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Bs = ["src"];
function Rs(e, t, s, i, n, l) {
  const o = u("el-icon");
  return n.icons[s.name] ? (d(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Bs)) : (d(), m(o, le(_({ key: 1 }, e.$attrs)), {
    default: c(() => [
      (d(), m(Q(s.name)))
    ]),
    _: 1
  }, 16));
}
const Ns = /* @__PURE__ */ k(Ts, [["render", Rs]]), { highdict: Is } = StardustJs, { storage: Ds } = StardustBrowser, { local: Ye } = Ds, ye = ["index", "selection", "expand", "radio", "_index"];
function Us() {
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
    hideSearcher: {
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
function Ps() {
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
function Ls() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = { ...this.$attrs };
  return t in this && Object.assign(s, this[t]), s;
}
function qs() {
  const e = {};
  return ["search", "add", "multi-edit", "multi-delete", "export", "search-export", "import"].forEach((s) => e[s] = s), { ...e, ...this.$attrs.domids };
}
function Xs() {
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
function zs() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function Ws() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function Hs() {
  const { $props: e, _query: t } = this, { table: s, columns: i } = e;
  return (i || (s == null ? void 0 : s.columns) || []).map((l) => l.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (a - 1) * r + o + 1;
    }
  }, l, { type: "index" }) : l.type === "radio" ? Object.assign({ width: 60, label: "单选" }, l) : Object.assign({}, l, l.tableAttrs));
}
function Js() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Ks() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function Ys() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Gs() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function Qs() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Zs() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function en() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function tn() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function sn() {
  return this.onMultiEdit || this._listen["multi-edit"] ? () => this._emit("multi-edit") : null;
}
function nn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function ln() {
  if (!this.controller)
    return {};
  let e = this.listen;
  Array.isArray(this.listen) || (e = this.listen.split(","));
  const t = {};
  return e.forEach((s) => {
    const i = "handle" + s.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[s] = this.controller[i];
  }), t;
}
function on() {
  const e = this._columns.filter((s) => s.type && ye.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const i = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...i,
      width: s.width || i.width
    };
  });
  return e.concat(t);
}
function an() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function rn() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function dn() {
  return this._columns.filter((e) => !e.type || !ye.includes(e.type));
}
function cn() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function un() {
  const e = this._uid && Ye.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && ye.includes(t.type))).map((t) => {
    const { prop: s, label: i, show: n, hide: l, width: o } = t;
    return { prop: s, label: i, show: n, hide: l, width: o };
  })), this.settings = e;
}
function hn(e) {
  Ye.setJson(`Settings[${this._uid}]`, e);
}
function pn(e, t) {
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
      return typeof n == "function" ? n(l, e, t) : Is.get(e, n);
  }
  return l;
}
function mn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function fn(e) {
  this.params = e, this._emit("search", e);
}
function gn(e) {
  this.saveSettings(e), this.initSettings();
}
function _n(e, t, s, i) {
  const n = this.settings.columns.find((l) => l.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function bn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function yn(...e) {
  var t, s;
  this.onSortChange ? this.onSortChange(...e) : e[0].column.sortable === "custom" && ((s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, ...e));
}
function vn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function wn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Sn(e) {
  var i;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function $n(e) {
  var i;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function kn(e, t) {
  const { tagTypes: s, prop: i } = t, n = e.row[i];
  if (s) {
    if (typeof s == "function")
      return s(n, e, t);
    if (typeof s == "object")
      return s[n];
  }
  return n ? "success" : "danger";
}
function Cn(e, t) {
  const { tagValues: s, prop: i } = t, n = e.row[i];
  if (s) {
    if (typeof s == "function")
      return s(n, e, t);
    if (typeof s == "object")
      return s[n];
  }
  return n;
}
function En(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function xn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Vn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function An(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function On(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function jn(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function Fn(e, t) {
  var i;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((i = t.previewSrcList) == null ? void 0 : i.call(t)) || [s];
}
function Mn(e, t) {
  const s = "on" + e.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Tn() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const N = {
  props: Us,
  emits: Ps,
  computed: {
    _attrs: Ls,
    domids: qs,
    elTableAttrs: Xs,
    _loading: zs,
    _data: Ws,
    _columns: Hs,
    _query: Js,
    _total: Ks,
    _selection: Ys,
    _onSearch: Gs,
    _onAdd: Qs,
    _onExport: Zs,
    _onSearchExport: en,
    _onImport: tn,
    _onMultiEdit: sn,
    _onMultiDelete: nn,
    _listen: ln,
    _visibleColumns: on,
    _uid: an,
    hideOperates: rn,
    searcherColumns: dn,
    searcherConfig: cn
  },
  watch: {
    $route: Tn
  },
  methods: {
    initSettings: un,
    saveSettings: hn,
    calcValue: pn,
    calcOverflowTooltip: mn,
    handleSearch: fn,
    handleResetSettings: gn,
    handleHeaderDragend: _n,
    handleSelectionChange: bn,
    handleSortChange: yn,
    handleCheckedChange: vn,
    handleToggleFullscreen: wn,
    cellClassName: Sn,
    cellStyle: $n,
    calcTagType: kn,
    calcTagValue: Cn,
    canEdit: En,
    canSave: xn,
    canRowEdit: Vn,
    canCancelEdit: An,
    canDelete: On,
    _imageSrc: jn,
    _imagePreviewSrcList: Fn,
    _emit: Mn
  }
};
const Bn = {
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
    calcValue: N.methods.calcValue
  }
}, Rn = { key: 0 }, Nn = { key: 1 };
function In(e, t, s, i, n, l) {
  const o = u("el-descriptions-item"), a = u("el-descriptions"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), m(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: X(["x-info", { "hide-header": l.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), v(O, null, T(l.blocks, (p, w) => (d(), m(r, {
        key: w,
        title: w,
        name: w
      }, {
        default: c(() => [
          f(a, {
            column: s.column,
            border: s.border
          }, {
            default: c(() => [
              (d(!0), v(O, null, T(p, (g) => (d(), m(o, _({
                key: g.prop
              }, g), K({
                default: c(() => [
                  g.slot ? (d(), v("span", Rn, [
                    $(e.$slots, g.slot, le(Me({ data: s.data, field: g, value: l.calcValue(s.data, g) })), void 0, !0)
                  ])) : (d(), v("span", Nn, V(l.calcValue(s.data, g)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: c(() => [
                    $(e.$slots, "label", {
                      label: g.label
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
const Dn = /* @__PURE__ */ k(Bn, [["render", In], ["__scopeId", "data-v-0c3b67a5"]]), Un = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Pn = { key: 1 };
function Ln(e, t, s, i, n, l) {
  return d(), v("div", null, [
    (d(!0), v(O, null, T(s.items, (o, a) => (d(), m(Q(s.compName), _({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? $(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), v("span", Pn, V(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const qn = /* @__PURE__ */ k(Un, [["render", Ln]]), Xn = {
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
function zn(e, t, s, i, n, l) {
  const o = u("van-icon"), a = u("van-pagination");
  return d(), m(a, _({ ...e.$attrs, ...e.mobilePagination || {} }, {
    modelValue: s.query.page,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => s.query.page = r),
    "items-per-page": s.query.limit,
    "page-count": l.pageCount,
    "total-items": s.total
  }), {
    "prev-text": c(() => [
      f(o, { name: "arrow-left" })
    ]),
    "next-text": c(() => [
      f(o, { name: "arrow" })
    ]),
    page: c(({ text: r }) => [
      E(V(r), 1)
    ]),
    _: 1
  }, 16, ["modelValue", "items-per-page", "page-count", "total-items"]);
}
const Wn = /* @__PURE__ */ k(Xn, [["render", zn]]), Hn = {
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
function Jn(e, t, s, i, n, l) {
  const o = u("el-pagination");
  return d(), m(o, _({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": s.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => s.query.page = a),
    "page-size": s.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => s.query.limit = a),
    "page-count": l.pageCount,
    total: s.total
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const Kn = /* @__PURE__ */ k(Hn, [["render", Jn]]), Yn = {
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
function Gn(e, t, s, i, n, l) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), v(O, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: X(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, V(s.modelValue || s.placeholder), 3),
    f(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: l.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => l.visible = r)
    }), {
      default: c(() => [
        f(o, _(e.$attrs, {
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
const Qn = /* @__PURE__ */ k(Yn, [["render", Gn]]), Zn = {
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
    formatOptions: L
  }
};
function ei(e, t, s, i, n, l) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), m(a, _({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), v(O, null, T(l.formatOptions(s.options, this), (r) => (d(), m(o, _(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: c(() => [
          E(V(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const ti = /* @__PURE__ */ k(Zn, [["render", ei]]), si = {
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
        placeholder: s,
        ...i
      } = this.$attrs;
      return i;
    }
  },
  methods: {
    formatOptions: L
  }
};
function ni(e, t, s, i, n, l) {
  const o = u("el-radio-group");
  return d(), m(o, _({ class: "pc-x-radios" }, l.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a))
  }), {
    default: c(() => [
      (d(!0), v(O, null, T(l.formatOptions(s.options, this), (a) => (d(), m(Q(s.button ? "el-radio-button" : "el-radio"), _(l.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: c(() => [
          E(V(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const ii = /* @__PURE__ */ k(si, [["render", ni]]), li = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, oi = { key: 1 };
function ai(e, t, s, i, n, l) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), m(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), v(O, null, T(s.cols, (r, h) => (d(), m(o, _(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? $(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", oi, V(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? $(e.$slots, "default", { key: 0 }) : y("", !0)
    ]),
    _: 3
  });
}
const ri = /* @__PURE__ */ k(li, [["render", ai]]), di = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ci = { key: 1 };
function ui(e, t, s, i, n, l) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), m(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), v(O, null, T(s.cols, (r, h) => (d(), m(o, _(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? $(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", ci, V(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? $(e.$slots, "default", { key: 0 }) : y("", !0)
    ]),
    _: 3
  });
}
const hi = /* @__PURE__ */ k(di, [["render", ui]]), pi = {
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
function mi(e, t, s, i, n, l) {
  const o = u("van-icon"), a = u("van-field");
  return d(), m(a, _({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: l.handleClick
  }), {
    "right-icon": c(() => [
      f(o, {
        name: "scan",
        onClick: l.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const fi = /* @__PURE__ */ k(pi, [["render", mi]]), gi = {
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
function _i(e, t, s, i, n, l) {
  const o = u("el-button"), a = u("el-input");
  return d(), m(a, _(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: l.handleClick
  }), {
    append: c(() => [
      f(o, {
        icon: "CameraFilled",
        onClick: l.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const bi = /* @__PURE__ */ k(gi, [["render", _i]]), Ge = async (e, t, s) => {
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: n = "text", value: l = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, l])], a.limit = a.limit || 20, i && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${i}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, yi = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((i) => e[i])[0], vi = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((i) => e[i]).slice(1).join(" - ") + ")", wi = {
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
        this._options = L(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: L,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Ge(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Si(e, t, s, i, n, l) {
  const o = u("x-picker");
  return d(), v("div", {
    onClick: t[5] || (t[5] = (...a) => l.onClick && l.onClick(...a)),
    class: "mobile-x-select"
  }, [
    f(o, _(e.$attrs, {
      modelValue: l.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: n.visible,
      columns: n._options,
      onClick: t[1] || (t[1] = Y(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => n.visible = !0),
      onCancel: t[3] || (t[3] = (a) => n.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => n.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const $i = /* @__PURE__ */ k(wi, [["render", Si]]);
const ki = {
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
        this._options = L(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: L,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ge(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return yi(e, this);
    },
    calcRemarkLabel(e) {
      return vi(e, this);
    }
  }
}, Ci = { key: 1 }, Ei = { class: "main" }, xi = { class: "remark" };
function Vi(e, t, s, i, n, l) {
  const o = u("el-option"), a = u("el-select");
  return d(), m(a, _({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || l.remoteSearch
  }), {
    default: c(() => [
      (d(!0), v(O, null, T(n._options, (r) => (d(), m(o, _(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: c(() => [
          e.$slots.custom ? $(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (d(), v("span", Ci, [
            j("span", Ei, V(l.calcMainLabel(r)), 1),
            j("span", xi, V(l.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const Ai = /* @__PURE__ */ k(ki, [["render", Vi], ["__scopeId", "data-v-a37eab84"]]), je = {
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
}, Oi = [{
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
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"]
};
P["x-select"] = P.XSelect;
P["el-date-picker"] = P.ElDatePicker;
P["el-input-number"] = P.ElInputNumber;
P["el-input"] = P.ElInput;
function ji() {
  const e = window.isMobile ? "small" : "", {
    config: t,
    columns: s,
    visible: i,
    conditions: n,
    expression: l,
    handleSearch: o,
    handleReset: a,
    handleAdd: r,
    handleDelete: h,
    handleSelectField: p,
    handleSelectOp: w
  } = this;
  return f(u("x-dialog"), _({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": "查询"
  }, {
    modelValue: i,
    "onUpdate:modelValue": (g) => this.visible = g,
    onCancel: a,
    onSubmit: o
  }), {
    default: () => [t.traditional ? null : f(u("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: r
    }, {
      default: () => [E("新增条件")]
    }), f("div", {
      class: "conditions"
    }, [n.map((g, C) => f("div", {
      class: "condition flex-center",
      key: g.no
    }, [t.traditional ? null : f(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(C)
    }, {
      default: () => [E("X")]
    }), t.traditional ? null : f("span", {
      class: "title"
    }, [g.no]), f("div", {
      class: "expression"
    }, [t.traditional ? f(u("el-input"), {
      modelValue: g.item.label,
      readonly: !0
    }, null) : f(u("pc-x-select"), {
      modelValue: g.prop,
      onChange: (A) => p(g, A),
      options: s,
      text: "label",
      value: "prop"
    }, null), f(u("pc-x-select"), {
      modelValue: g.op,
      onChange: (A) => w(g, A),
      options: g.ops
    }, null), f("div", {
      class: "value-container"
    }, [Fi(this, g)])])]))]), t.traditional ? null : f(u("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: l,
      "onUpdate:modelValue": (g) => this.expression = g
    }), null)]
  });
}
function Fi(e, t) {
  const s = (n) => z(u((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (l) => t.value = l
  }, n)), i = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? f("div", {
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
    options: Oi
  }) : s();
}
const { storage: de } = StardustBrowser, Mi = {
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
    const e = this.uid && de.local.getJson(this.key, this.config) || this.config;
    this.initConfig(e);
  },
  render: ji,
  methods: {
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      de.local.setJson(this.key, {
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
        const { prop: n, op: l, value: o } = i;
        i.item = this.columns.find((a) => a.prop === n), i.value = o, this.handleSelectField(i, n), this.handleSelectOp(i, l), i.ops = P[i.component].map((a) => je[a]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((i) => i.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        J({ type: "warning", message: t.toString() });
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      de.local.remove(this.key), Object.assign(this, {
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
      e.value = "", e.prop = t, e.item = this.columns.find((M) => M.prop === e.prop);
      const { options: s, type: i, formAttrs: n = {} } = e.item, l = { ...e.item, ...n }, {
        comp: o,
        visible: a,
        canAdd: r,
        canEdit: h,
        required: p,
        slot: w,
        span: g,
        tableAttrs: C,
        formAttrs: A,
        tagTypes: D,
        tagValues: F,
        width: I,
        minWidth: B,
        disabled: b,
        readonly: x,
        ...S
      } = l;
      S.clearable ?? (S.clearable = !0), e.config = S, e.component = o || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = P[e.component].map((M) => je[M]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", S.type = "date");
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, ve = /* @__PURE__ */ k(Mi, [["__scopeId", "data-v-46237e6f"]]);
const Ti = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...N.props(),
    mode: String,
    platform: String,
    "max-height": String,
    height: String,
    slotRenderers: Object
  },
  emits: [
    ...N.emits()
  ],
  components: { Searcher: ve },
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
    ...N.computed,
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
        e.forEach((s, i) => {
          s && t.push(this._data[i]);
        }), this.handleSelectionChange(t);
      },
      deep: !0
    }
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this, this.table.ref = this), this.$emit("update:tref", this);
  },
  methods: {
    ...N.methods,
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
}, Bi = { class: "mobile-x-table" }, Ri = {
  key: 1,
  class: "mobile-x-table card"
}, Ni = ["onClick"], Ii = ["value", "checked"], Di = { class: "label" }, Ui = { class: "value" }, Pi = { class: "operates" }, Li = ["value", "checked"], qi = {
  key: 2,
  class: "index"
}, Xi = { class: "title" }, zi = { class: "operates" };
function Wi(e, t, s, i, n, l) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("van-button"), p = u("x-col"), w = u("x-row"), g = u("van-swipe-cell"), C = u("van-cell"), A = u("van-list"), D = u("x-pagination"), F = u("x-info"), I = u("van-popup");
  return d(), v("div", Bi, [
    f(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    e.hideTools !== "" && e.hideTools !== !0 ? (d(), m(a, _({ key: 0 }, e._attrs, {
      domids: e.domids,
      onAdd: e._onAdd,
      onSearch: e._onSearch,
      onExport: e._onExport,
      onSearchExport: e._onSearchExport,
      onImport: e._onImport,
      onMultiDelete: e._onMultiDelete
    }), K({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: c(() => [
          $(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: c(() => [
          $(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : y("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), v("div", Ri, [
      (d(!0), v(O, null, T(e._data, (B, b) => (d(), v("div", {
        key: b,
        class: "row",
        onClick: (x) => l.handleClickCard(b)
      }, [
        f(g, {
          onOpen: (x) => n.scope = { row: B, $index: b }
        }, {
          right: c(() => [
            j("div", Pi, [
              $(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
              e.hideOperates ? y("", !0) : (d(), m(w, {
                key: 0,
                gutter: 10
              }, {
                default: c(() => [
                  f(p, { span: 12 }, {
                    default: c(() => [
                      e.canEdit(n.scope) ? (d(), m(h, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, { onClick: l.handleEdit }), {
                        default: c(() => [
                          E(" 编辑 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : y("", !0)
                    ]),
                    _: 1
                  }),
                  f(p, { span: 12 }, {
                    default: c(() => [
                      e.canDelete(n.scope) ? (d(), m(h, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"] }, { onClick: l.handleDelete }), {
                        default: c(() => [
                          E(" 删除 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : y("", !0)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })),
              $(e.$slots, "operates-suffix", { scope: n.scope }, void 0, !0)
            ])
          ]),
          default: c(() => [
            l.hasSelection ? (d(), m(r, {
              key: 0,
              modelValue: n.selected[b],
              "onUpdate:modelValue": (x) => n.selected[b] = x,
              shape: "square",
              class: "selection",
              onClick: t[0] || (t[0] = Y(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : y("", !0),
            l.hasRadio ? (d(), v("input", {
              key: 1,
              type: "radio",
              value: b,
              checked: b === n.checked,
              class: "radio",
              onClick: t[1] || (t[1] = Y(() => {
              }, ["stop"])),
              onChange: t[2] || (t[2] = (...x) => e.handleCheckedChange && e.handleCheckedChange(...x))
            }, null, 40, Ii)) : y("", !0),
            (d(!0), v(O, null, T(l.cols, (x, S) => (d(), v("div", {
              key: S,
              class: "field"
            }, [
              j("span", Di, V(x.label) + ":", 1),
              j("span", Ui, V(e.calcValue(B, x)), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1032, ["onOpen"])
      ], 8, Ni))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), m(A, _({
      key: 2,
      class: "mobile-x-table list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (B) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), v(O, null, T(e._data, (B, b) => (d(), m(C, {
          key: b,
          "is-link": "",
          onClick: (x) => l.handleShowDetail(B, b)
        }, {
          default: c(() => [
            l.hasSelection ? (d(), m(r, {
              key: 0,
              modelValue: n.selected[b],
              "onUpdate:modelValue": (x) => n.selected[b] = x,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = Y(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : y("", !0),
            l.hasRadio ? (d(), v("input", {
              key: 1,
              type: "radio",
              value: b,
              checked: b === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = Y(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...x) => e.handleCheckedChange && e.handleCheckedChange(...x))
            }, null, 40, Li)) : y("", !0),
            l.hasIndex ? (d(), v("span", qi, V(b + 1), 1)) : y("", !0),
            j("span", Xi, V(l.calcTitle(B)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : y("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), m(D, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (B) => e._emit("search"))
    }, null, 8, ["query", "total"])) : y("", !0),
    f(I, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (B) => n.popupVisible = B),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        f(F, {
          data: n.scope.row,
          fields: l.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"]),
        j("div", zi, [
          $(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
          e.hideOperates ? y("", !0) : (d(), m(w, {
            key: 0,
            gutter: 10
          }, {
            default: c(() => [
              f(p, { span: 12 }, {
                default: c(() => [
                  e.canEdit(n.scope) ? (d(), m(h, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"], block: !0 }, { onClick: l.handleEdit }), {
                    default: c(() => [
                      E(" 编辑 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : y("", !0)
                ]),
                _: 1
              }),
              f(p, { span: 12 }, {
                default: c(() => [
                  e.canDelete(n.scope) ? (d(), m(h, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"], block: !0 }, { onClick: l.handleDelete }), {
                    default: c(() => [
                      E(" 删除 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : y("", !0)
                ]),
                _: 1
              })
            ]),
            _: 1
          })),
          $(e.$slots, "operates-suffix", { scope: n.scope }, void 0, !0)
        ])
      ]),
      _: 3
    }, 8, ["show"])
  ]);
}
const Hi = /* @__PURE__ */ k(Ti, [["render", Wi], ["__scopeId", "data-v-e47e7aad"]]);
const Ji = {
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
    handleMove(e, t, s) {
      const i = t + s;
      this.columns.splice(t, 1), this.columns.splice(i, 0, e), this.update();
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
}, Ki = (e) => (Be("data-v-c81e4a2f"), e = e(), Re(), e), Yi = { class: "table" }, Gi = ["title", "onClick"], Qi = /* @__PURE__ */ Ki(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1));
function Zi(e, t, s, i, n, l) {
  const o = u("el-button"), a = u("ElCheckbox"), r = u("el-input-number"), h = u("el-tab-pane"), p = u("el-tabs"), w = u("el-popover");
  return s.visible ? (d(), m(w, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: c(() => [
      f(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: c(() => [
      f(p, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => n.activeName = g)
      }, {
        default: c(() => [
          f(h, {
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              f(o, {
                type: "warning",
                icon: "Close",
                onClick: l.handleResetColumns
              }, {
                default: c(() => [
                  E("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", Yi, [
                (d(!0), v(O, null, T(n.columns, (g, C) => (d(), v("div", {
                  key: C,
                  class: "row flex-center"
                }, [
                  f(o, {
                    disabled: C === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: (A) => l.handleMove(g, C, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  f(o, {
                    disabled: C === n.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: (A) => l.handleMove(g, C, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  f(a, {
                    modelValue: g.show,
                    "onUpdate:modelValue": (A) => g.show = A,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  j("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (A) => l.handleToggle(g)
                  }, V(g.label), 9, Gi),
                  f(r, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (A) => g.width = A,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  Qi
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
  }, 16)) : y("", !0);
}
const Qe = /* @__PURE__ */ k(Ji, [["render", Zi], ["__scopeId", "data-v-c81e4a2f"]]);
const el = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...N.props()
  },
  emits: [
    ...N.emits()
  ],
  components: { Searcher: ve, Settings: Qe },
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
    ...N.computed
  },
  watch: {
    ...N.watch,
    settings: "saveSettings"
  },
  created() {
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
    ...N.methods
  }
}, tl = { key: 1 }, sl = ["value", "checked"], nl = { key: 1 };
function il(e, t, s, i, n, l) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), p = u("el-image"), w = u("el-tag"), g = u("el-table-column"), C = u("el-button"), A = u("el-table"), D = u("x-pagination"), F = u("el-collapse-item"), I = u("el-collapse"), B = oe("loading");
  return d(), v("div", {
    class: X(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    f(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    f(I, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (b) => n.activeNames = b),
      class: X((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        f(F, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? $(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", tl, V(e.title), 1))
          ]),
          default: c(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), m(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), K({
              "tools-end": c(() => [
                f(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                f(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[0] || (t[0] = (b) => n.settings = b),
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
                  $(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  $(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : y("", !0),
            R((d(), m(A, _({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: c(() => [
                (d(!0), v(O, null, T(e._visibleColumns, (b, x) => (d(), m(g, _(b, {
                  key: x,
                  "min-width": b.minWidth,
                  align: b.align || e._attrs.tableAlign || "center",
                  resizable: b.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(b)
                }), K({ _: 2 }, [
                  ["selection", "index"].includes(b.type) ? void 0 : {
                    name: "default",
                    fn: c((S) => [
                      b.type === "radio" ? (d(), v("input", {
                        key: 0,
                        type: "radio",
                        value: S.$index,
                        checked: S.$index === n.checked,
                        onChange: t[1] || (t[1] = (...M) => e.handleCheckedChange && e.handleCheckedChange(...M))
                      }, null, 40, sl)) : b.slot === "$image" ? (d(), m(p, _({
                        key: 1,
                        src: e._imageSrc(S, b),
                        "preview-src-list": e._imagePreviewSrcList(S, b),
                        "preview-teleported": ""
                      }, b.imageAttrs), null, 16, ["src", "preview-src-list"])) : b.slot === "$tag" ? (d(), m(w, {
                        key: 2,
                        type: e.calcTagType(S, b)
                      }, {
                        default: c(() => [
                          E(V(e.calcTagValue(S, b)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])) : b.slot ? $(e.$slots, b.slot, {
                        key: 3,
                        scope: S,
                        column: b,
                        value: S.row[b.prop]
                      }) : e.slotAll ? $(e.$slots, "all", {
                        key: 4,
                        scope: S,
                        column: b,
                        value: S.row[b.prop]
                      }) : (d(), v(O, { key: 5 }, [
                        b.comp === "ElSwitch" || e.table.isRowEdit && S.row.isEditing && (b.visible !== !1 || b.canEdit) ? (d(), m(Q(b.comp || "ElInput"), _({ key: 0 }, { ...b, ...b.formAttrs }, {
                          modelValue: S.row[b.prop],
                          "onUpdate:modelValue": (M) => S.row[b.prop] = M,
                          disabled: !S.row.editable || !S.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), v("span", nl, V(e.calcValue(S.row, b)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? y("", !0) : (d(), m(g, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: c((b) => [
                    $(e.$slots, "operates-prefix", { scope: b }),
                    e.canEdit(b.row) ? (d(), m(C, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (x) => e._emit("edit", b)
                    }), {
                      default: c(() => [
                        f(a, { name: "edit" }),
                        E(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : y("", !0),
                    e.canSave(b.row) ? R((d(), m(C, _({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: b.row._loading,
                      onClick: (x) => e._emit("row-edit", b)
                    }), {
                      default: c(() => [
                        f(a, { name: "collection" }),
                        E(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [B, b.row._loading]
                    ]) : y("", !0),
                    e.canCancelEdit(b.row) ? (d(), m(C, _({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (x) => e._emit("cancel-edit", b)
                    }), {
                      default: c(() => [
                        f(a, { name: "refresh-left" }),
                        E(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : y("", !0),
                    e.canDelete(b.row) ? (d(), m(C, _({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (x) => e._emit("delete", b)
                    }), {
                      default: c(() => [
                        f(a, { name: "DeleteFilled" }),
                        E(" 删除 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : y("", !0),
                    $(e.$slots, "operates-suffix", { scope: b })
                  ]),
                  _: 3
                }, 8, ["min-width", "align", "fixed"]))
              ]),
              _: 3
            }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
              [B, e._loading]
            ]),
            e._query && e._total ? (d(), m(D, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (b) => e._emit("search", n.params))
            }, null, 8, ["query", "total"])) : y("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const ll = /* @__PURE__ */ k(el, [["render", il]]);
const ol = {
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
}, al = { class: "mobile-x-table-tools" }, rl = { class: "tools" }, dl = { class: "tools-end" };
function cl(e, t, s, i, n, l) {
  const o = u("mobile-x-icon"), a = u("van-button"), r = oe("domid");
  return d(), v("div", al, [
    j("div", rl, [
      $(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? R((d(), m(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[0] || (t[0] = (h) => e.$emit("search"))
      }), {
        default: c(() => [
          f(o, { name: "search" }),
          E(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.search]
      ]) : y("", !0),
      e.$attrs.onAdd ? R((d(), m(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
        onClick: t[1] || (t[1] = (h) => e.$emit("add"))
      }), {
        default: c(() => [
          f(o, { name: "circle-plus-filled" }),
          E(" 新增 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.add]
      ]) : y("", !0),
      e.$attrs.onMultiEdit ? R((d(), m(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          f(o, { name: "edit" }),
          E(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["multi-edit"]]
      ]) : y("", !0),
      e.$attrs.onMultiDelete ? R((d(), m(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          f(o, { name: "DeleteFilled" }),
          E(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["multi-delete"]]
      ]) : y("", !0),
      e.$attrs.onExport ? R((d(), m(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (h) => e.$emit("export"))
      }), {
        default: c(() => [
          f(o, { name: "printer" }),
          E(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.export]
      ]) : y("", !0),
      e.$attrs.onSearchExport ? R((d(), m(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
      }), {
        default: c(() => [
          f(o, { name: "printer" }),
          E(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["search-export"]]
      ]) : y("", !0),
      e.$attrs.onImport ? R((d(), m(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (h) => e.$emit("import"))
      }), {
        default: c(() => [
          f(o, { name: "UploadFilled" }),
          E(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.import]
      ]) : y("", !0),
      $(e.$slots, "tools-suffix", {}, void 0, !0),
      j("div", dl, [
        $(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const ul = /* @__PURE__ */ k(ol, [["render", cl], ["__scopeId", "data-v-0a1cd672"]]);
const hl = {
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
}, pl = { class: "tools" }, ml = { class: "tools-end flex-center" };
function fl(e, t, s, i, n, l) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-card"), h = oe("domid");
  return d(), m(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      j("div", pl, [
        $(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? R((d(), m(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (p) => e.$emit("search"))
        }), {
          default: c(() => [
            f(o, { name: "search" }),
            E(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : y("", !0),
        e.$attrs.onAdd ? R((d(), m(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (p) => e.$emit("add"))
        }), {
          default: c(() => [
            f(o, { name: "circle-plus-filled" }),
            E(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : y("", !0),
        e.$attrs.onMultiEdit ? R((d(), m(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (p) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            f(o, { name: "edit" }),
            E(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : y("", !0),
        e.$attrs.onMultiDelete ? R((d(), m(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (p) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            f(o, { name: "DeleteFilled" }),
            E(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : y("", !0),
        e.$attrs.onExport ? R((d(), m(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (p) => e.$emit("export"))
        }), {
          default: c(() => [
            f(o, { name: "printer" }),
            E(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : y("", !0),
        e.$attrs.onSearchExport ? R((d(), m(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (p) => e.$emit("search-export"))
        }), {
          default: c(() => [
            f(o, { name: "printer" }),
            E(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : y("", !0),
        e.$attrs.onImport ? R((d(), m(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (p) => e.$emit("import"))
        }), {
          default: c(() => [
            f(o, { name: "UploadFilled" }),
            E(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : y("", !0),
        $(e.$slots, "tools-suffix", {}, void 0, !0),
        j("div", ml, [
          $(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const gl = /* @__PURE__ */ k(hl, [["render", fl], ["__scopeId", "data-v-02d70f98"]]);
function _l(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Te(e);
}
const bl = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, i = (n) => {
    n ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const l = n ? e._data.slice() : [];
    e.handleSelectionChange(l);
  };
  return f(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: i
  }, null);
}, yl = (e, t) => {
  const {
    rowIndex: s,
    rowData: i
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const l = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(l);
  };
  return f(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, vl = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, wl = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return f("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, ae = ([e, t, s, i, n, l]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return f(u("el-button"), _({
    type: i
  }, t._attrs[s + "-btn"], {
    onClick: r
  }), {
    default: () => [f(u("x-icon"), {
      name: n
    }, null), l]
  });
}, Sl = (e, t) => {
  if (t.canEdit(e.rowData))
    return ae([e, t, "edit", "warning", "edit", "编辑"]);
}, $l = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return ae([e, t, "row-edit", "success", "collection", "保存"]);
}, kl = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return ae([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Cl = (e, t) => {
  if (t.canDelete(e.rowData))
    return ae([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, El = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (l) => yl(l, t);
  if (e.type === "index")
    return (l) => vl(l, t);
  if (e.type === "radio")
    return (l) => wl(l, t);
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
      const p = (g) => {
        o[a.prop] = g;
      }, w = a.comp || "ElInput";
      return z(u(w), {
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
    return h ? f(u("el-tooltip"), {
      content: r
    }, _l(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, xl = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, n = e.map((l, o) => {
    const {
      tableAttrs: a = {}
    } = l, r = {
      ...l,
      key: o,
      dataKey: l.prop,
      title: l.label,
      width: l.width || a.width || l.minWidth || a.minWidth || l.maxWidth || a.maxWidth,
      align: l.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = bl(t)), r.cellRenderer = El(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(l) {
      return f("div", {
        class: "operates"
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, Sl(l, t), $l(l, t), kl(l, t), Cl(l, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), n;
}, Vl = {
  convertColumnsForTableV2: xl
};
const Al = {
  name: "XTableV2",
  props: {
    ...N.props(),
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
    ...N.emits()
  ],
  components: { Searcher: ve, Settings: Qe },
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
    ...N.computed
  },
  watch: {
    ...N.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...N.methods,
    convertColumnsForTableV2: Vl.convertColumnsForTableV2
  }
}, Ol = { key: 1 };
function jl(e, t, s, i, n, l) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), p = u("el-table-v2"), w = u("el-auto-resizer"), g = u("x-pagination"), C = u("el-collapse-item"), A = u("el-collapse"), D = oe("loading");
  return d(), v("div", {
    class: X(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    f(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (F) => e._emit("search", F))
    }, null, 8, ["uid", "columns", "config"]),
    f(A, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (F) => n.activeNames = F),
      class: X((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        f(C, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? $(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", Ol, V(e.title), 1))
          ]),
          default: c(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), m(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), K({
              "tools-end": c(() => [
                f(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                f(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (F) => n.settings = F),
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
                  $(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  $(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : y("", !0),
            f(w, {
              style: nt({ height: s.height })
            }, {
              default: c(({ width: F, height: I }) => [
                R((d(), m(p, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: l.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: F,
                  height: I
                }), K({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: c(() => [
                      $(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: c(() => [
                      $(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: c(() => [
                      $(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [D, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), m(g, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (F) => e._emit("search"))
            }, null, 8, ["query", "total"])) : y("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Fl = /* @__PURE__ */ k(Al, [["render", jl]]);
const ce = ["selection", "radio"], Ml = {
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
      ce.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !ce.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (ce.includes(t)) {
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
}, Tl = { class: "x-table-viewer" };
function Bl(e, t, s, i, n, l) {
  const o = u("x-dialog");
  return d(), v("div", Tl, [
    f(o, _(l._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": l.handleBeforeClose,
      onSubmit: l.handleSubmit,
      onCancel: l.handleCancel
    }), {
      default: c(() => [
        (d(), m(Q(s.useTableV2 ? "x-table-v2" : "x-table"), _({
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
const Rl = /* @__PURE__ */ k(Ml, [["render", Bl], ["__scopeId", "data-v-f5d31400"]]), Nl = {
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
}, Il = { class: "x-tinymce" }, Dl = ["id", "innerHTML"];
function Ul(e, t, s, i, n, l) {
  return d(), v("div", Il, [
    j("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, Dl)
  ]);
}
const Pl = /* @__PURE__ */ k(Nl, [["render", Ul]]);
const Ll = {
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
}, we = (e) => (Be("data-v-fe069681"), e = e(), Re(), e), ql = { class: "mask" }, Xl = {
  key: 0,
  class: "el-upload__text"
}, zl = /* @__PURE__ */ we(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), Wl = /* @__PURE__ */ we(() => /* @__PURE__ */ j("br", null, null, -1)), Hl = /* @__PURE__ */ we(() => /* @__PURE__ */ j("br", null, null, -1)), Jl = {
  key: 0,
  class: "path"
};
function Kl(e, t, s, i, n, l) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), m(r, _({
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
      j("div", ql, [
        f(o, { name: "upload-filled" }),
        n.disabled ? y("", !0) : (d(), v("div", Xl, [
          E(" 将文件拖到此处，或"),
          zl,
          Wl,
          Hl,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), m(a, {
            key: 0,
            type: "success",
            onClick: Y(l.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              E(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : y("", !0)
        ]))
      ]),
      l.filepath ? (d(), v("div", Jl, V(s.modelValue), 1)) : y("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Yl = /* @__PURE__ */ k(Ll, [["render", Kl], ["__scopeId", "data-v-fe069681"]]);
const Gl = {
  name: "XImageUploader",
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    action: String
  },
  emits: ["update:modelValue"],
  data() {
    return {
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
      return this.modelValue.map((e) => e.url);
    }
  },
  methods: {
    handlePreview(e) {
      this.previewingImage = e, this.dialogVisible = !0;
    },
    handleExceed(e, t) {
      J({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, Ql = ["src"];
function Zl(e, t, s, i, n, l) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("el-dialog");
  return d(), v(O, null, [
    f(r, _({
      "file-list": s.modelValue,
      "onUpdate:fileList": t[0] || (t[0] = (p) => e.$emit("update:modelValue", p)),
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: l.limit,
      class: ["x-image-uploader", { disabled: e.$attrs.disabled || l.images.length >= l.limit }],
      "on-preview": l.handlePreview,
      "on-exceed": l.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1
    }), {
      default: c(() => [
        f(a, null, {
          default: c(() => [
            f(o)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload"]),
    f(h, {
      modelValue: n.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (p) => n.dialogVisible = p),
      title: "预览图片" + n.previewingImage.name
    }, {
      default: c(() => [
        j("img", {
          src: n.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, Ql)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const eo = /* @__PURE__ */ k(Gl, [["render", Zl], ["__scopeId", "data-v-821cec65"]]), ue = {
  xactionsheet: Et,
  xautorows: jt,
  mobilexbutton: Tt,
  pcxbutton: Nt,
  xchart: Pt,
  mobilexcheckboxs: Xt,
  pcxcheckboxs: Ht,
  mobilexcol: Yt,
  pcxcol: Zt,
  mobilexdialog: ss,
  pcxdialog: os,
  xdistrictselect: ds,
  mobilexform: vs,
  pcxform: ks,
  mobilexformitem: Vs,
  pcxformitem: As,
  mobilexicon: Ms,
  pcxicon: Ns,
  xinfo: Dn,
  xlooper: qn,
  mobilexpagination: Wn,
  pcxpagination: Kn,
  xpicker: Qn,
  mobilexradios: ti,
  pcxradios: ii,
  mobilexrow: ri,
  pcxrow: hi,
  mobilexscan: fi,
  pcxscan: bi,
  mobilexselect: $i,
  pcxselect: Ai,
  mobilextable: Hi,
  pcxtable: ll,
  mobilextabletools: ul,
  pcxtabletools: gl,
  xtablev2: Fl,
  xtableviewer: Rl,
  xtinymce: Pl,
  xfileuploader: Yl,
  ximageuploader: eo
}, te = {};
for (let e in ue)
  te[ue[e].name] = ue[e];
const to = (e) => ({
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
    return z(te[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), me = (() => {
  const e = Object.keys(te), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = te[i]);
  for (const i of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(i.toLowerCase())) ? s[i] = to(i) : s[i] = te[i];
  return s;
})(), so = (e, t) => {
  for (let s in me)
    e.component(s, me[s]);
}, io = {
  version: "1.0.113",
  ...me,
  ...He,
  ...$t,
  install: so
};
export {
  Je as BaseController,
  ie as Confirm,
  Ke as CrudController,
  J as Message,
  ne as Notify,
  St as TempCrudController,
  Ue as baseDialog,
  Ie as baseForm,
  yt as baseModel,
  De as baseTable,
  $t as controllers,
  io as default,
  ot as effects,
  L as formatOptions,
  at as formatPrecision,
  Xe as initDefaultForm,
  Le as initDialog,
  ge as initForm,
  qe as initFormRules,
  vt as initModel,
  Pe as initTable,
  ze as isWhenMatched,
  We as triggers,
  He as utils,
  Ne as validateForm
};
