import { toRaw as st, nextTick as ee, watch as fe, resolveComponent as c, openBlock as d, createBlock as f, mergeProps as _, createElementBlock as b, Fragment as F, renderList as R, withCtx as h, renderSlot as S, toDisplayString as A, useCssVars as Te, createTextVNode as E, createSlots as Y, resolveDynamicComponent as Q, createCommentVNode as w, createVNode as p, normalizeClass as z, normalizeProps as oe, guardReactiveProps as Fe, h as W, isVNode as Me, createElementVNode as M, withModifiers as J, pushScopeId as Be, popScopeId as Re, resolveDirective as se, withDirectives as B, normalizeStyle as nt } from "vue";
const it = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class n {
    constructor(x, U, X, Z, Ze, et, tt) {
      this.x = x, this.y = U, this.radius = X, this.color = Z, this.vx = Ze, this.vy = et, this.ctx = tt;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => l.clearRect(0, 0, t, s), o = (C) => Math.floor(Math.random() * C);
  let a = 0, r = 0.01, u = 0;
  const m = () => {
    const C = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    u ? u-- : (a += r, a <= 0 && (a = 0, r = -r, u = k * 30), a >= 1 && (a = 1, r = -r, u = k * 30)), C.addColorStop(0, "rgba(250, 220, 20, 0.5)"), C.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = C, l.fillRect(0, 0, t, s);
  }, v = Math.floor(t / 100), g = Math.floor(s / 100), k = 20, j = Math.round(1e3 / k), I = Array.from({ length: 52 }).map(() => {
    const C = Math.floor(o(v + g) * 1.5 + o(5));
    let x = o(t), U = o(s);
    x = Math.min(Math.max(C, x), t - C), U = Math.min(Math.max(C, U), s - C);
    let X = o(2) ? (o(2) + 2) * v : (o(-1) - 2) * v, Z = o(2) ? (o(2) + 2) * g : (o(-1) - 2) * g;
    return X = Math.floor(X / k), Z = Math.floor(Z / k), new n(
      x,
      U,
      C,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      X,
      Z,
      l
    );
  });
  let V, O;
  e.addEventListener("mouseover", (C) => {
    V = C.pageX, O = C.pageY;
  }), e.addEventListener("mousemove", (C) => {
    if (V === void 0) {
      V = C.pageX, O = C.pageY;
      return;
    }
    const x = C.pageX - V, U = C.pageY - O;
    I.forEach((X) => {
      X.x += x / k, X.y += U / k;
    }), V = C.pageX, O = C.pageY;
  });
  let T = Date.now(), D = null;
  const y = () => {
    Date.now() - T >= j && (i(), m(), I.forEach((C) => C.update()), T = Date.now()), D = requestAnimationFrame(y);
  };
  return D = requestAnimationFrame(y), () => cancelAnimationFrame(D);
}, lt = ({
  text: e,
  gap: t,
  fontSize: s,
  color: l,
  width: n = window.innerWidth,
  height: i = window.innerHeight,
  drawMode: o = "fill"
}) => {
  const a = document.createElement("canvas");
  a.width = n, a.height = i;
  const r = a.getContext("2d");
  r.font = `${s}px Arial`, r[o + "Style"] = l;
  const m = r.measureText(e).width + t, v = s + t;
  for (let g = t / 2; g < i; g += v)
    for (let k = t / 2; k < n; k += m)
      r[o + "Text"](e, k, g);
  return a;
}, ot = {
  pop: it,
  createWatermark: lt
}, Ne = async (e) => {
  var l, n;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((i) => {
    var o, a;
    return ((o = i.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = i.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((i) => Ne(i.form)));
  return t && s.every((i) => i);
}, at = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, q = (e, t) => {
  const s = e.__v_isRef ? e.value : st(e);
  let l = s;
  if (typeof s[0] != "object" && (l = s.map((i) => ({ text: i, value: i }))), !t.sort)
    return l;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return l.sort((i, o) => i[n].localeCompare(o[n]));
}, { ElMessage: rt, ElNotification: dt, ElMessageBox: ct } = window.ElementPlus || {}, { showToast: ut, showNotify: ht, showConfirmDialog: mt } = window.vant || {}, K = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? ((l === "error" || l === "warning") && (t.type = "fail"), ut(t)) : rt({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, ie = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? (l === "error" && (t.type = "danger"), ht(t)) : dt({
    showClose: !0,
    ...t
  });
}, le = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = mt(e) : t = ct.confirm(
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
  K[e] = K[e[0]] = (t) => K({ type: e, ...typeof t != "string" ? t : { message: t } }), ie[e] = ie[e[0]] = (t) => ie({ type: e, ...typeof t != "string" ? t : { message: t } }), le[e] = le[e[0]] = (t) => le({ type: e, ...t });
const pt = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    l.matched.length ? i() : i("/404");
  });
}, ft = (e, t, s) => {
  e.afterEach((l, n) => {
    const i = l.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...i].filter((o) => o).reverse().join("-");
  });
}, gt = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    var o;
    return (o = l.meta) != null && o.visitable || t.acl.paths.includes(l.path) ? i() : (K.e("无权访问页面: " + l.path), i("/404"));
  }), ee(() => {
    fe(() => t.acl.menus, (l) => {
      const n = t.acl.paths, i = (o, a) => {
        var u, m, v, g, k;
        const r = (a != null && a.path ? a.path + "/" : "") + o.path;
        o.meta || (o.meta = {}), o.meta._hidden = o.meta.hidden, a && (o.meta.hidden == null && ((m = o.meta).hidden ?? (m.hidden = (u = a.meta) == null ? void 0 : u.hidden), o.meta = { ...o.meta }), o.meta.visitable == null && ((g = o.meta).visitable ?? (g.visitable = (v = a.meta) == null ? void 0 : v.visitable), o.meta = { ...o.meta })), o.meta.hidden !== !1 && o.meta._hidden == null && (o.meta.hidden = !n.includes(r)), (k = o.children) == null || k.forEach((j) => i(j, o));
      };
      s.forEach(i);
    }, { immediate: !0 });
  });
}, _t = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    l.name === "Login" && t.getters.logined && l.query.redirectTo ? i(l.query.redirectTo) : i();
  });
}, bt = {
  check404: pt,
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
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && Pe(l, t), s === "dialog" && e[s]._isBaseDialog && Le(l, t), s === "form" && e[s]._isBaseForm && ge(l, t));
  }
  return e;
}, Pe = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), Le = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), ge(e, t), e), ge = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), Xe(e.form, e.formItems), e.initialForm = he.deepCopy(e.form), e.initialFormRules = he.deepCopy(e.formRules), fe(() => e.formItems, () => {
  qe(e);
}, { immediate: !0, deep: !0 }), e), qe = (e) => {
  const { formItems: t, initialFormRules: s } = e, l = t.filter((i) => {
    let { formAttrs: o = {}, required: a = !1 } = i;
    return a = "required" in o ? o.required : a, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && a !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, he.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !l.length)
    return;
  const n = {};
  return l.forEach((i) => {
    if (e.formRules[i])
      return;
    const o = t.find((k) => k.prop === i), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = We[a], u = [], m = "options" in o, g = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${m ? "选择" : "输入"}${(o == null ? void 0 : o.label) || i}` };
    o.validator && (g.validator = o.validator), o.asyncValidator && (g.asyncValidator = o.asyncValidator), o.comp ? u.push({ ...g, trigger: r.change }) : u.push({ ...g, trigger: r.blur }), o.comp === "ElInputNumber" && u.push({ ...g, trigger: r.blur }), n[i] = u;
  }), Object.assign(e.formRules, n), e.formRules;
}, Xe = (e, t, s = !0) => {
  const l = {};
  return t.forEach((n) => {
    var u, m;
    let i = "";
    const { type: o, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && o === "number" || n.comp === "ElInputNumber")
      i = 0;
    else if (n.comp === "ElSwitch")
      i = !1;
    else if (a && ((u = n.comp) != null && u.endsWith("XCheckboxs") || (m = n.comp) != null && m.endsWith("x-checkboxs") || r))
      i = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const v = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + v), n["end-placeholder"] || (n["end-placeholder"] = "结束" + v), i = [];
    }
    l[n.prop] = i;
  }), Object.assign(e, { ...l, ...e }), e;
}, ze = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [l, n] = e.split(s);
  n = n.split("|");
  let i = t[l];
  typeof i == "number" ? i += "" : typeof i == "string" && (i = i.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? i.startsWith(a) : o === "*=" ? i.includes(a) : o === "$=" ? i.endsWith(a) : o === "~=" ? !i.includes(a) : o === "!=" ? i !== a : a === i);
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
  formatOptions: q,
  Message: K,
  Notify: ie,
  Confirm: le,
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
      const l = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => l }
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
  _getMethods() {
    return [
      "_bindMethods",
      "_initLifeCycles",
      "_getMethods",
      "onInit"
    ];
  }
}
const { funcs: Se, highdict: $e, dates: re } = StardustJs, { file: ke, excel: ne } = StardustBrowser;
class Ke extends Je {
  constructor(t) {
    super(t);
    const { model: s, table: l, dialog: n, dbModelName: i = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = l || (s == null ? void 0 : s.table) || null, this.dialog = n || (s == null ? void 0 : s.dialog) || null, this.dbModelName = i, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], ee(() => {
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
    let l = $e.get(s, this.listProp);
    return l = this.formatList(this._defaultFormatList(l, s), s), Object.assign(this.table, {
      list: l,
      total: s.total,
      loading: !1
    }), this.afterSearch(l, t, s), s;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await ee(), await Se.sleep(50), this._clearValidate(), this.afterAdd());
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
    }), await ee(), (l = this.dialog.formRef) == null || l.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (!await this.beforeDelete({ $index: t, row: s }))
      return;
    if (await this.uiUtils.Confirm({
      message: "确定要删除吗？",
      title: "警告",
      type: "warning"
    })) {
      const n = this.getDeleteParams(s), i = await this.remove(n, s);
      i.err || (this.afterDelete(i), this.handleSearch());
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
    } catch (l) {
      this._showError(l.data.err), t._loading = !1;
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
    const { list: l, selection: n, ref: i } = this.table;
    let o = n.length > 0 ? n : l;
    o = Se.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(i._visibleColumns, "current"), r = a.map((g) => g.prop), u = a.map((g) => g.label);
    o = o.map((g) => r.map((k) => g[k]));
    let m = null;
    t === "csv" ? m = ne.export2Csv : m = ne.export2Excel;
    let v = { header: u, data: o, filename: s };
    v = await this.processExporting(v), m(v), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      this.uiUtils.Message({ type: "error", message: "不支持的导出类型" });
      return;
    }
    this._isExporting = !0;
    const l = await this.dbTable.search(this.getSearchExportParams());
    let n = l.data;
    n = this.formatList(n, l), n = this.processExportingData(n, "search");
    const i = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = i.map((m) => m.prop), a = i.map((m) => m.label);
    n = n.map((m) => o.map((v) => m[v]));
    let r = null;
    t === "csv" ? r = ne.export2Csv : r = ne.export2Excel;
    let u = { header: a, data: n, filename: s };
    u = await this.processExporting(u), r(u), this._isExporting = !1;
  }
  async handleImport() {
    const t = await ke.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), l = await ke.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      n = window.Papa.parse(l, { header: !0 }).data;
    else {
      const i = window.XLSX.read(l, {});
      n = XLSX.utils.sheet_to_json(i.Sheets.SheetJS);
    }
    if (n.length > 0) {
      const i = {};
      this.table.columns.forEach((a) => i[a.label] = a.prop);
      const o = Object.keys(n[0]);
      n = n.map((a) => {
        const r = {};
        return o.forEach((u) => r[i[u]] = a[u]), r;
      });
    }
    n = this.processImportingData(n), await this.dbTable.func(["bulkCreate", n]), this.uiUtils.Message({ type: "success", message: "导入成功" }), this.handleSearch();
  }
  handleMultiEdit() {
    const { selection: t, checked: s } = this.table, l = s || t[0];
    if (!l) {
      this.uiUtils.Message({ type: "warning", message: "尚未选择要编辑的数据" });
      return;
    }
    if (!s && t.length > 1) {
      this.uiUtils.Message({ type: "warning", message: "请仅选择一条数据进行编辑" });
      return;
    }
    this.handleEdit({ $index: l._idx, row: l });
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
    const l = t.map((n) => n[this.idField]);
    await this.dbTable.func(["destroy", {
      where: {
        [this.idField]: {
          "[Op.in]": l
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
    const l = this.getAddParams(t);
    if (!await this._checkAllNone(l)) {
      this._isSubmitting = !1;
      return;
    }
    let n = null;
    try {
      t[this.idField] ? n = await this.update(l, t[this.idField]) : n = await this.add(l);
    } catch (i) {
      this._showError(i.data.err), this._isSubmitting = !1;
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
    let l = null;
    try {
      if (this.dialog.isEditing) {
        const n = this.getUpdateParams(s);
        if (!await this._checkAllNone(n))
          return this._isSubmitting = !1, !1;
        l = await this.update(n, this.dialog.editingRow[this.idField]);
      } else {
        const n = this.getAddParams(s);
        if (!await this._checkAllNone(n))
          return this._isSubmitting = !1, !1;
        l = await this.add(n);
      }
    } catch (n) {
      return this._showError(n.data.err), this._isSubmitting = !1, !1;
    }
    return this.dialog.visible = !1, this._isSubmitting = !1, l.err || this.handleSearch(), this.afterSubmit(l), l;
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
    const s = Object.keys(this.dialog.initialForm), l = {};
    return s.length ? s.forEach((n) => l[n] = t[n]) : Object.assign(l, t), this.dialog.formItems.forEach((n) => {
      let i = l[n.model || n.prop];
      n.type === "number" ? i = this.uiUtils.formatPrecision(i, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? i = re.format(i) : (!n.type || n.type === "date") && (i = re.format(i, "", !1))), l[n.model || n.prop] = i;
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
  afterSearch(t, s, l) {
    const n = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && n !== this._lastSearchParams) {
      const { page: i, limit: o, order: a, count: r, ...u } = s;
      this.dbTable.func(["count", u]).then((m) => this.table.total = m.data);
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
    const { columns: l, query: n } = this.table, { page: i, limit: o } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (i - 1) * o + r + 1;
    }), l.forEach((a) => {
      let { prop: r, options: u } = a;
      const { format: m, formatter: v, autoFill: g } = a.tableAttrs || {}, { modelName: k } = a.formAttrs || {};
      if (k && g)
        t.forEach((j) => j[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(u) && m !== !1) {
        const I = fe(() => a.options, (V, O) => {
          const T = O ? this.table.list : t, D = wt(a);
          T.forEach((y, C) => {
            const x = y[r];
            y[`_formatted_${r}`] = D[x] || (v == null ? void 0 : v(x, y, C)) || x;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(I);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const l = [...new Set(t.map((u) => u[s.prop]))];
    if (!l.length)
      return;
    const { modelName: n, text: i, value: o } = s.formAttrs, a = await this.service.restful.search(n, {
      limit: -1,
      attributes: [i, o],
      where: {
        [o]: {
          "[Op.in]": l
        }
      }
    });
    if (!a.data.length)
      return;
    const r = $e.mapField(a.data, o, i);
    this.table.list.forEach((u) => {
      u[`_formatted_${s.prop}`] = r[u[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingColumns(t, s = "current") {
    return t.filter((l) => !["index", "selection", "expand", "radio", "_index"].includes(l.type)).filter((l) => !l._virtual);
  }
  processExportingData(t, s = "current") {
    if (!t.length)
      return t;
    const l = {};
    this.table.ref._visibleColumns.forEach((i) => {
      let { formatter: o = i.formatter, tagValues: a = i.tagValues } = i.tableAttrs || {};
      !o && typeof a == "function" && (o = a), l[i.prop] = { formatter: o, tagValues: a };
    });
    const n = Object.keys(t[0]);
    return t.forEach((i) => {
      n.forEach((o) => {
        var r, u;
        const a = i[o];
        if (i.hasOwnProperty("_formatted_" + o))
          return i[o] = i["_formatted_" + o];
        if ((r = l[o]) != null && r.formatter)
          return i[o] = l[o].formatter(a);
        if ((u = l[o]) != null && u.tagValues)
          return i[o] = l[o].tagValues[a];
        typeof a == "boolean" ? i[o] = a && 1 || 0 : a instanceof Date ? (i[o] = re.format(a), i[o].endsWith(" 00:00:00") && (i[o] = i[o].slice(0, -9))) : typeof a == "object" && (i[o] = JSON.stringify(a));
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
      this._isMobile ? s.validate().then(() => l(!0)).catch(() => l(!1)) : s.validate((n) => l(n)).catch(() => l(!1));
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
    var s, l;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((l = this.dialog) == null ? void 0 : l.formRef);
    return t ? t.$.attrs.class.indexOf("mobile") >= 0 : window.isMobile;
  }
}
const wt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: l = "text", value: n = "value" } = s, i = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    i[o[n]] = o[l];
  }), i;
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
    this.table.list = t.filter((l) => !s.includes(l));
  }
}
const $t = {
  BaseController: Je,
  CrudController: Ke,
  TempCrudController: St
}, $ = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [l, n] of t)
    s[l] = n;
  return s;
}, kt = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Ct(e, t, s, l, n, i) {
  const o = c("van-action-sheet");
  return d(), f(o, _(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const xt = /* @__PURE__ */ $(kt, [["render", Ct]]), Et = {
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
      return this.cols.forEach((l) => {
        const n = l.span || this.span;
        t.push(l), s += n, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, Vt = { class: "x-auto-rows" }, At = { key: 1 };
function Ot(e, t, s, l, n, i) {
  const o = c("x-col"), a = c("x-row");
  return d(), b("div", Vt, [
    (d(!0), b(F, null, R(i.rows, (r, u) => (d(), f(a, _({ key: u }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: h(() => [
        (d(!0), b(F, null, R(r, (m, v) => (d(), f(o, _(m, {
          span: m.span || s.span,
          key: v,
          platform: e.$attrs.platform
        }), {
          default: h(() => [
            m.slot || e.$attrs.slot ? S(e.$slots, m.slot || e.$attrs.slot, {
              key: 0,
              col: m
            }) : (d(), b("span", At, A(m.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const jt = /* @__PURE__ */ $(Et, [["render", Ot]]), Tt = {
  name: "MobileXButton"
};
function Ft(e, t, s, l, n, i) {
  const o = c("van-button");
  return d(), f(o, null, {
    default: h(() => [
      S(e.$slots, "default")
    ]),
    _: 3
  });
}
const Mt = /* @__PURE__ */ $(Tt, [["render", Ft]]), Bt = {
  name: "PcXButton"
};
function Rt(e, t, s, l, n, i) {
  const o = c("el-button");
  return d(), f(o, null, {
    default: h(() => [
      S(e.$slots, "default")
    ]),
    _: 3
  });
}
const Nt = /* @__PURE__ */ $(Bt, [["render", Rt]]);
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
  Te((e) => ({
    "127c024a": e.zoomedHeight,
    "137ee0b8": e.zoom
  }));
}, xe = _e.setup;
_e.setup = xe ? (e, t) => (Ce(), xe(e, t)) : Ce;
const Dt = {
  class: "x-chart",
  ref: "el"
};
function Ut(e, t, s, l, n, i) {
  return d(), b("div", Dt, null, 512);
}
const Pt = /* @__PURE__ */ $(_e, [["render", Ut], ["__scopeId", "data-v-0c2da986"]]), Lt = {
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
        rules: l,
        required: n,
        ...i
      } = this.$attrs;
      return i;
    }
  },
  methods: {
    formatOptions: q
  }
};
function qt(e, t, s, l, n, i) {
  const o = c("van-checkbox"), a = c("van-checkbox-group");
  return d(), f(a, _({ class: "mobile-x-checkboxs" }, i.attrs, { direction: s.direction }), {
    default: h(() => [
      (d(!0), b(F, null, R(i.formatOptions(s.options, this), (r) => (d(), f(o, _(i.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: h(() => [
          E(A(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Xt = /* @__PURE__ */ $(Lt, [["render", qt]]), zt = {
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
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: q
  }
};
function Wt(e, t, s, l, n, i) {
  const o = c("el-checkbox"), a = c("el-checkbox-group");
  return d(), f(a, _({ class: "pc-x-checkboxs" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r))
  }), {
    default: h(() => [
      (d(!0), b(F, null, R(i.formatOptions(s.options, this), (r) => (d(), f(o, _(i.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: h(() => [
          E(A(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const Ht = /* @__PURE__ */ $(zt, [["render", Wt]]), Jt = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Kt(e, t, s, l, n, i) {
  const o = c("van-col");
  return d(), f(o, _(i.attrs, { class: "mobile-x-col" }), {
    default: h(() => [
      S(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Yt = /* @__PURE__ */ $(Jt, [["render", Kt]]), Gt = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Qt(e, t, s, l, n, i) {
  const o = c("el-col");
  return d(), f(o, _(i.attrs, { class: "pc-x-col" }), {
    default: h(() => [
      S(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Zt = /* @__PURE__ */ $(Gt, [["render", Qt]]), es = {
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
  },
  methods: {
    async handleCancel() {
      await this.$nextTick(), this.visible = !0, await this.$nextTick(), this.$emit("cancel");
    },
    async handleConfirm() {
      await this.$nextTick(), this.visible = !0, await this.$nextTick(), this.$emit("submit");
    }
  }
};
function ts(e, t, s, l, n, i) {
  const o = c("van-dialog");
  return d(), f(o, _({ width: "92%" }, e.$attrs, {
    show: i.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => i.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: i.handleConfirm,
    onCancel: i.handleCancel
  }), Y({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: h(() => [
        S(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: h(() => [
        S(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: h(() => [
        S(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const ss = /* @__PURE__ */ $(es, [["render", ts]]), ns = {
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
function ls(e, t, s, l, n, i) {
  const o = c("x-icon"), a = c("el-button");
  return d(), f(Q(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: h(() => [
      e.$slots.header ? S(e.$slots, "header", { key: 0 }) : (d(), b("span", is, A(e.$attrs.title), 1)),
      s.drawer ? w("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: h(() => [
      e.$slots.footer ? S(e.$slots, "footer", { key: 0 }) : w("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: h(() => [
          E(A(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : w("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: h(() => [
          E(A(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : w("", !0)
    ]),
    default: h(() => [
      e.$slots.default ? S(e.$slots, "default", { key: 0 }) : w("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const os = /* @__PURE__ */ $(ns, [["render", ls]]), P = {}, H = {
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
      Object.assign(P, this.areaList), H.provinces = Object.entries(P.province_list).map((e) => ({ value: e[0], text: e[1] })), H.cities = Object.entries(P.city_list).map((e) => ({ value: e[0], text: e[1] })), H.counties = Object.entries(P.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(H.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const l = Object.entries(P.province_list).find((n) => n[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(P.city_list).find((n) => n[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const l = Object.entries(P.county_list).find((n) => n[1] === s);
        this.county = l == null ? void 0 : l[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && P.province_list[this.province] || "",
        this.number > 1 && this.city && P.city_list[this.city] || "",
        this.number > 2 && this.county && P.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function rs(e, t, s, l, n, i) {
  const o = c("x-select"), a = c("x-col"), r = c("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: h(() => [
      p(a, { span: i.span }, {
        default: h(() => [
          p(o, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (u) => n.province = u),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      i.number > 1 ? (d(), f(a, {
        key: 0,
        span: i.span
      }, {
        default: h(() => [
          p(o, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (u) => n.city = u),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : w("", !0),
      i.number > 2 ? (d(), f(a, {
        key: 1,
        span: i.span
      }, {
        default: h(() => [
          p(o, {
            modelValue: n.county,
            "onUpdate:modelValue": t[2] || (t[2] = (u) => n.county = u),
            options: n.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : w("", !0)
    ]),
    _: 1
  });
}
const ds = /* @__PURE__ */ $(as, [["render", rs]]);
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
function ms() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return ze(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function ps() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function fs(e) {
  var l;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
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
    _visibleItems: ms,
    _rules: ps
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
function ys(e, t, s, l, n, i) {
  const o = c("mobile-x-form-item"), a = c("van-cell-group"), r = c("van-form");
  return d(), f(r, {
    ref: "formRef",
    class: z(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: h(() => [
      e.$slots.pre ? S(e.$slots, "pre", { key: 0 }) : w("", !0),
      p(a, oe(Fe(e.$attrs)), {
        default: h(() => [
          (d(!0), b(F, null, R(e._visibleItems, (u, m) => (d(), f(o, _(u, {
            rules: e._rules[u.prop] || u.rules,
            key: m,
            modelValue: e.formatModelValue(e._model[u.prop]),
            "onUpdate:modelValue": (v) => e._model[u.prop] = v,
            placeholder: e.calcPlaceholder(u)
          }), {
            default: h(() => [
              u.slot ? S(e.$slots, u.slot, oe(_({ key: 0 }, u))) : w("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? S(e.$slots, "default", { key: 1 }) : w("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const vs = /* @__PURE__ */ $(bs, [["render", ys]]), ws = {
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
function $s(e, t, s, l, n, i) {
  const o = c("pc-x-form-item"), a = c("el-form"), r = c("el-collapse-item"), u = c("el-collapse");
  return d(), f(u, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: z((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: h(() => [
      p(r, {
        name: n.activeNames[0]
      }, {
        title: h(() => [
          e.$slots["collapse-title"] ? S(e.$slots, "collapse-title", { key: 0 }) : (d(), b("span", Ss, A(s.title), 1))
        ]),
        default: h(() => [
          p(a, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: h(() => [
              e.$slots.pre ? S(e.$slots, "pre", { key: 0 }) : w("", !0),
              (d(!0), b(F, null, R(e._visibleItems, (m, v) => (d(), f(o, _({
                "label-width": s.labelWidth,
                "show-tooltip": e.$attrs.showTooltip || !1
              }, m, {
                key: v,
                modelValue: e._model[m.prop],
                "onUpdate:modelValue": [(g) => e._model[m.prop] = g, (g) => m.onChange || null],
                prop: m.prop || m.model,
                clearable: m.clearable !== !1,
                placeholder: e.calcPlaceholder(m),
                style: e.calcStyle(m)
              }), {
                default: h(() => [
                  m.slot ? S(e.$slots, m.slot, { key: 0 }) : w("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
              e.$slots.default ? S(e.$slots, "default", { key: 1 }) : w("", !0)
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
const ks = /* @__PURE__ */ $(ws, [["render", $s]]);
function Cs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Me(e);
}
const me = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: n
  } = e;
  let {
    comp: i,
    compType: o,
    html: a,
    text: r
  } = t;
  const u = {
    ...l,
    "onUpdate:modelValue": (v) => n("update:modelValue", v)
  }, m = [];
  return o === "html" ? u.class = "comp-html" : i = c(i), a && (u.innerHTML = a), r && m.push(r), W(i, u, {
    default: () => m
  });
}, xs = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: n,
    $slots: i
  } = e, {
    slot: o,
    showTooltip: a,
    placeholder: r
  } = t;
  if (o && !s.label)
    return i.default();
  let u = null;
  if (o)
    u = i.default();
  else if (a) {
    let m;
    u = p(c("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Cs(m = me(e)) ? m : {
      default: () => [m]
    });
  } else
    u = me(e);
  return W(c("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [u],
    label: () => W("span", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
        display: "inline-block"
      }
    }, [s.label])
  });
}, Es = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: n,
    $slots: i,
    mValue: o
  } = e, {
    slot: a,
    comp: r,
    modelValue: u
  } = t;
  if (a && !s.label)
    return i.default({
      ...t,
      ...s
    });
  const m = {
    modelValue: o,
    "onUpdate:modelValue": (v) => n("update:modelValue", v)
  };
  return a && s.label || r ? W(c("van-field"), m, {
    input: () => a && s.label ? i.default() : me(e)
  }) : (Object.assign(m, l), W(c("van-field"), m));
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
        comp: l,
        compType: n,
        iconSize: i,
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
    return Es(this);
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
        comp: l,
        slot: n,
        compType: i,
        span: o,
        offset: a,
        showTooltip: r,
        required: u,
        format: m,
        style: v,
        html: g,
        class: k,
        ...j
      } = { ...this.$props, ...this.$attrs };
      return j;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return xs(this);
  }
}, Ee = () => {
  Te((e) => ({
    ba9709f0: e.width
  }));
}, Ve = be.setup;
be.setup = Ve ? (e, t) => (Ee(), Ve(e, t)) : Ee;
const As = /* @__PURE__ */ $(be, [["__scopeId", "data-v-d2cde1e2"]]), Ae = /* @__PURE__ */ Object.assign({}), Os = {
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
        const s = t.split("/").pop().split(".")[0], l = await Ae[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, js = ["src"];
function Ts(e, t, s, l, n, i) {
  const o = c("van-icon");
  return n.icons[s.name] ? (d(), b("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, js)) : (d(), f(o, _({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Fs = /* @__PURE__ */ $(Os, [["render", Ts]]), Oe = /* @__PURE__ */ Object.assign({}), Ms = {
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
        const s = t.split("/").pop().split(".")[0], l = await Oe[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Bs = ["src"];
function Rs(e, t, s, l, n, i) {
  const o = c("el-icon");
  return n.icons[s.name] ? (d(), b("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Bs)) : (d(), f(o, oe(_({ key: 1 }, e.$attrs)), {
    default: h(() => [
      (d(), f(Q(s.name)))
    ]),
    _: 1
  }, 16));
}
const Ns = /* @__PURE__ */ $(Ms, [["render", Rs]]), { highdict: Is } = StardustJs, { storage: Ds } = StardustBrowser, { local: Ye } = Ds, ye = ["index", "selection", "expand", "radio", "_index"];
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
  return [
    "search",
    "add",
    "multi-edit",
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
  const { $props: e, _query: t } = this, { table: s, columns: l } = e;
  return (l || (s == null ? void 0 : s.columns) || []).map((i) => i.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (a - 1) * r + o + 1;
    }
  }, i, { type: "index" }) : i.type === "radio" ? Object.assign({ width: 60, label: "单选" }, i) : Object.assign({}, i, i.tableAttrs));
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
    const l = "handle" + s.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[s] = this.controller[l];
  }), t;
}
function on() {
  const e = this._columns.filter((s) => s.type && ye.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const l = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...l,
      width: s.width || l.width
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
    const { prop: s, label: l, show: n, hide: i, width: o } = t;
    return { prop: s, label: l, show: n, hide: i, width: o };
  })), this.settings = e;
}
function hn(e) {
  Ye.setJson(`Settings[${this._uid}]`, e);
}
function mn(e, t) {
  const { prop: s } = t;
  let { format: l, formatter: n } = t.tableAttrs || t;
  l = Array.isArray(t.options) ? l !== !1 : l;
  const i = e[s];
  if (i == null || i === "")
    return this.defaultValue;
  if (l || n) {
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
    if (n)
      return typeof n == "function" ? n(i, e, t) : Is.get(e, n);
  }
  return i;
}
function pn(e) {
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
function _n(e, t, s, l) {
  const n = this.settings.columns.find((i) => i.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
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
  var l;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function $n(e) {
  var l;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function kn(e, t) {
  const { tagTypes: s, prop: l, options: n } = t, i = e.row[l];
  if (s) {
    if (typeof s == "function")
      return s(i, e, t);
    if (typeof s == "object")
      return s[i];
  } else if (n) {
    const o = n.find((a) => a[t.value || "value"] === i);
    if (o != null && o.tagType)
      return o.tagType;
  }
  return i ? "success" : "danger";
}
function Cn(e, t) {
  const { tagValues: s, prop: l, options: n } = t, i = e.row[l];
  if (s) {
    if (typeof s == "function")
      return s(i, e, t);
    if (typeof s == "object")
      return s[i];
  } else if (n) {
    const o = n.find((a) => a[t.value || "value"] === i);
    if (o)
      return o[t.text || "text"];
  }
  return i;
}
function xn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function En(e) {
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
function Tn(e, t) {
  var l;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((l = t.previewSrcList) == null ? void 0 : l.call(t)) || [s];
}
function Fn(e, t) {
  const s = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Mn() {
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
    $route: Mn
  },
  methods: {
    initSettings: un,
    saveSettings: hn,
    calcValue: mn,
    calcOverflowTooltip: pn,
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
    canEdit: xn,
    canSave: En,
    canRowEdit: Vn,
    canCancelEdit: An,
    canDelete: On,
    _imageSrc: jn,
    _imagePreviewSrcList: Tn,
    _emit: Fn
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
        const { infoAttrs: s = {}, ...l } = t, n = { span: this.span, ...l, ...s }, i = n.block || "基本信息";
        let o = e[i];
        o || (e[i] = o = [], o.span = 0), o.span + n.span > 24 && o.length ? o[o.length - 1].span += 24 - o.span : o.span += n.span, o.push(n);
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
function In(e, t, s, l, n, i) {
  const o = c("el-descriptions-item"), a = c("el-descriptions"), r = c("el-collapse-item"), u = c("el-collapse");
  return d(), f(u, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: z(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: h(() => [
      (d(!0), b(F, null, R(i.blocks, (m, v) => (d(), f(r, {
        key: v,
        title: v,
        name: v
      }, {
        default: h(() => [
          p(a, {
            column: s.column,
            border: s.border
          }, {
            default: h(() => [
              (d(!0), b(F, null, R(m, (g) => (d(), f(o, _({
                key: g.prop
              }, g), Y({
                default: h(() => [
                  g.slot ? (d(), b("span", Rn, [
                    S(e.$slots, g.slot, oe(Fe({ data: s.data, field: g, value: i.calcValue(s.data, g) })), void 0, !0)
                  ])) : (d(), b("span", Nn, A(i.calcValue(s.data, g)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: h(() => [
                    S(e.$slots, "label", {
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
const Dn = /* @__PURE__ */ $(Bn, [["render", In], ["__scopeId", "data-v-0c3b67a5"]]), Un = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Pn = { key: 1 };
function Ln(e, t, s, l, n, i) {
  return d(), b("div", null, [
    (d(!0), b(F, null, R(s.items, (o, a) => (d(), f(Q(s.compName), _({ key: a }, o), {
      default: h(() => [
        o.slot || e.$attrs.slot ? S(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), b("span", Pn, A(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const qn = /* @__PURE__ */ $(Un, [["render", Ln]]), Xn = {
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
function zn(e, t, s, l, n, i) {
  const o = c("van-col"), a = c("van-icon"), r = c("van-pagination"), u = c("van-row");
  return d(), f(u, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: h(() => [
      p(o, { span: 6 }, {
        default: h(() => [
          M("span", null, "总计: " + A(s.total), 1)
        ]),
        _: 1
      }),
      p(o, { span: 18 }, {
        default: h(() => [
          p(r, _({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (m) => s.query.page = m),
            "page-count": i.pageCount
          }), {
            "prev-text": h(() => [
              p(a, { name: "arrow-left" }),
              E(" 上一页 ")
            ]),
            "next-text": h(() => [
              E(" 下一页 "),
              p(a, { name: "arrow" })
            ]),
            page: h(({ text: m }) => [
              E(A(m), 1)
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
const Wn = /* @__PURE__ */ $(Xn, [["render", zn]]), Hn = {
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
function Jn(e, t, s, l, n, i) {
  const o = c("el-pagination");
  return d(), f(o, _({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": s.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => s.query.page = a),
    "page-size": s.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => s.query.limit = a),
    "page-count": i.pageCount,
    total: s.total,
    class: "pc-x-pagination"
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const Kn = /* @__PURE__ */ $(Hn, [["render", Jn]]), Yn = {
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
function Gn(e, t, s, l, n, i) {
  const o = c("van-picker"), a = c("van-popup");
  return d(), b(F, null, [
    M("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: z(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, A(s.modelValue || s.placeholder), 3),
    p(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: h(() => [
        p(o, _(e.$attrs, {
          title: e.$attrs.title,
          columns: s.columns,
          onCancel: t[1] || (t[1] = (r) => e.$emit("cancel")),
          onConfirm: i.onConfirm
        }), null, 16, ["title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const Qn = /* @__PURE__ */ $(Yn, [["render", Gn]]), Zn = {
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
    formatOptions: q
  }
};
function ei(e, t, s, l, n, i) {
  const o = c("van-radio"), a = c("van-radio-group");
  return d(), f(a, _({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: h(() => [
      (d(!0), b(F, null, R(i.formatOptions(s.options, this), (r) => (d(), f(o, _(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: h(() => [
          E(A(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const ti = /* @__PURE__ */ $(Zn, [["render", ei]]), si = {
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
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: q
  }
};
function ni(e, t, s, l, n, i) {
  const o = c("el-radio-group");
  return d(), f(o, _({ class: "pc-x-radios" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a))
  }), {
    default: h(() => [
      (d(!0), b(F, null, R(i.formatOptions(s.options, this), (a) => (d(), f(Q(s.button ? "el-radio-button" : "el-radio"), _(i.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: h(() => [
          E(A(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const ii = /* @__PURE__ */ $(si, [["render", ni]]), li = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, oi = { key: 1 };
function ai(e, t, s, l, n, i) {
  const o = c("mobile-x-col"), a = c("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: h(() => [
      (d(!0), b(F, null, R(s.cols, (r, u) => (d(), f(o, _(r, { key: u }), {
        default: h(() => [
          r.slot || e.$attrs.slot ? S(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), b("span", oi, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? S(e.$slots, "default", { key: 0 }) : w("", !0)
    ]),
    _: 3
  });
}
const ri = /* @__PURE__ */ $(li, [["render", ai]]), di = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ci = { key: 1 };
function ui(e, t, s, l, n, i) {
  const o = c("pc-x-col"), a = c("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: h(() => [
      (d(!0), b(F, null, R(s.cols, (r, u) => (d(), f(o, _(r, { key: u }), {
        default: h(() => [
          r.slot || e.$attrs.slot ? S(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), b("span", ci, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? S(e.$slots, "default", { key: 0 }) : w("", !0)
    ]),
    _: 3
  });
}
const hi = /* @__PURE__ */ $(di, [["render", ui]]), mi = {
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
function pi(e, t, s, l, n, i) {
  const o = c("van-icon"), a = c("van-field");
  return d(), f(a, _({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    "right-icon": h(() => [
      p(o, {
        name: "scan",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const fi = /* @__PURE__ */ $(mi, [["render", pi]]), gi = {
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
function _i(e, t, s, l, n, i) {
  const o = c("el-button"), a = c("el-input");
  return d(), f(a, _(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    append: h(() => [
      p(o, {
        icon: "CameraFilled",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const bi = /* @__PURE__ */ $(gi, [["render", _i]]), Ge = async (e, t, s) => {
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, i])], a.limit = a.limit || 20, l && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${l}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, yi = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], vi = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", wi = {
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
        this._options = q(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: q,
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
function Si(e, t, s, l, n, i) {
  const o = c("x-picker");
  return d(), b("div", {
    onClick: t[5] || (t[5] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(o, _(e.$attrs, {
      modelValue: i.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: n.visible,
      columns: n._options,
      onClick: t[1] || (t[1] = J(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => n.visible = !0),
      onCancel: t[3] || (t[3] = (a) => n.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => n.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const $i = /* @__PURE__ */ $(wi, [["render", Si]]);
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
        this._options = q(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: q,
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
}, Ci = { key: 1 }, xi = { class: "main" }, Ei = { class: "remark" };
function Vi(e, t, s, l, n, i) {
  const o = c("el-option"), a = c("el-select");
  return d(), f(a, _({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || i.remoteSearch
  }), {
    default: h(() => [
      (d(!0), b(F, null, R(n._options, (r) => (d(), f(o, _(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: h(() => [
          e.$slots.custom ? S(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (d(), b("span", Ci, [
            M("span", xi, A(i.calcMainLabel(r)), 1),
            M("span", Ei, A(i.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const Ai = /* @__PURE__ */ $(ki, [["render", Vi], ["__scopeId", "data-v-a37eab84"]]), je = {
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
}], L = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"]
};
L["x-select"] = L.XSelect;
L["el-date-picker"] = L.ElDatePicker;
L["el-input-number"] = L.ElInputNumber;
L["el-input"] = L.ElInput;
function ji() {
  const e = window.isMobile ? "small" : "", {
    config: t,
    columns: s,
    visible: l,
    conditions: n,
    expression: i,
    handleSearch: o,
    handleReset: a,
    handleAdd: r,
    handleDelete: u,
    handleSelectField: m,
    handleSelectOp: v
  } = this;
  return p(c("x-dialog"), _({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": "查询"
  }, {
    modelValue: l,
    "onUpdate:modelValue": (g) => this.visible = g,
    onCancel: a,
    onSubmit: o
  }), {
    default: () => [t.traditional ? null : p(c("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: r
    }, {
      default: () => [E("新增条件")]
    }), p("div", {
      class: "conditions"
    }, [n.map((g, k) => p("div", {
      class: "condition flex-center",
      key: g.no
    }, [t.traditional ? null : p(c("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => u(k)
    }, {
      default: () => [E("X")]
    }), t.traditional ? null : p("span", {
      class: "title"
    }, [g.no]), p("div", {
      class: "expression"
    }, [t.traditional ? p(c("el-input"), {
      modelValue: g.item.label,
      readonly: !0
    }, null) : p(c("pc-x-select"), {
      modelValue: g.prop,
      onChange: (j) => m(g, j),
      options: s,
      text: "label",
      value: "prop"
    }, null), p(c("pc-x-select"), {
      modelValue: g.op,
      onChange: (j) => v(g, j),
      options: g.ops
    }, null), p("div", {
      class: "value-container"
    }, [Ti(this, g)])])]))]), t.traditional ? null : p(c("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: i,
      "onUpdate:modelValue": (g) => this.expression = g
    }), null)]
  });
}
function Ti(e, t) {
  const s = (n) => W(c((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (i) => t.value = i
  }, n)), l = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? p("div", {
    class: "col-2"
  }, [s({
    ...l,
    modelValue: t.value[0],
    "onUpdate:modelValue": (n) => t.value[0] = n
  }), s({
    ...l,
    modelValue: t.value[1],
    "onUpdate:modelValue": (n) => t.value[1] = n
  })]) : ["in", "notIn"].includes(t.op) ? (l.multiple = !0, s(l)) : t.op === "special" ? s({
    ...l,
    component: "x-select",
    placeholder: "请选择特殊值",
    options: Oi
  }) : s();
}
const { storage: de } = StardustBrowser, Fi = {
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
          const { item: t, ops: s, component: l, ...n } = e;
          return n;
        }),
        expression: this.expression
      });
    },
    initConfig(e) {
      var t, s;
      (t = e.conditions) == null || t.forEach((l) => {
        const { prop: n, op: i, value: o } = l;
        l.item = this.columns.find((a) => a.prop === n), l.value = o, this.handleSelectField(l, n), this.handleSelectOp(l, i), l.ops = L[l.component].map((a) => je[a]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((l) => l.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        K({ type: "warning", message: t.toString() });
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
      const t = (l, n) => {
        const i = [], o = "[Op." + l.type + "]";
        n[o] = i;
        for (let a of l.items)
          if (typeof a == "string") {
            const r = this.conditions.find((u) => u.no === a * 1);
            if (r) {
              if (!this.checkFilled(r)) {
                if (this.config.traditional || this.config.ignoreUnfilled)
                  continue;
                throw "条件不完整: " + a;
              }
            } else
              throw "条件不存在: " + a;
            i.push(this.parseCondition(r));
          } else {
            const r = {};
            i.push(r), t(a, r);
          }
        i.length || delete n[o];
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((n) => n.trim()), s = (n, i) => {
        for (; i.length; ) {
          const o = i.shift();
          if (["and", "or"].includes(o)) {
            if (n.type && n.type !== o)
              throw "串联不同逻辑表达式请使用小括号区分";
            n.type = o;
          } else if (o === "(") {
            const a = { type: "", items: [] };
            n.items.push(a), a._parent = n, s(a, i);
            break;
          } else
            o === ")" ? (s(n._parent, i), delete n._parent) : n.items.push(o);
        }
      }, l = { type: "", items: [] };
      return s(l, t), l.type = l.type || "and", l;
    },
    parseCondition(e) {
      let { prop: t, op: s, value: l } = e;
      const n = {};
      if (s === "special") {
        const i = l.startsWith("NOT_"), o = l.startsWith("NE_");
        return l.includes("NULL") ? l = null : l.includes("BLANK") && (l = ""), i ? l = { "[Op.not]": l } : o && (l = { "[Op.ne]": l }), n[t] = l, n;
      }
      return (s === "like" || s === "notLike") && (l = "%" + l + "%"), n[t] = {
        [`[Op.${s}]`]: l
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
      e.value = "", e.prop = t, e.item = this.columns.find((x) => x.prop === e.prop);
      const { options: s, type: l, formAttrs: n = {} } = e.item, i = { ...e.item, ...n }, {
        comp: o,
        visible: a,
        canAdd: r,
        canEdit: u,
        required: m,
        slot: v,
        span: g,
        tableAttrs: k,
        formAttrs: j,
        tagTypes: I,
        tagValues: V,
        width: O,
        minWidth: T,
        disabled: D,
        readonly: y,
        ...C
      } = i;
      C.clearable ?? (C.clearable = !0), e.config = C, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = L[e.component].map((x) => je[x]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", C.type = "date");
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, ve = /* @__PURE__ */ $(Fi, [["__scopeId", "data-v-0dd718f3"]]);
const Mi = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...N.props(),
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
    ...N.emits()
  ],
  components: { Searcher: ve },
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
    ...N.methods,
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
}, Bi = { class: "mobile-x-table" }, Ri = {
  key: 1,
  class: "card"
}, Ni = ["onClick"], Ii = { class: "row-header flex-center" }, Di = ["value", "checked"], Ui = { class: "label" }, Pi = { class: "value" }, Li = ["value", "checked"], qi = {
  key: 2,
  class: "index"
}, Xi = { class: "title" };
function zi(e, t, s, l, n, i) {
  const o = c("searcher"), a = c("x-table-tools"), r = c("van-checkbox"), u = c("x-icon"), m = c("van-cell"), v = c("van-list"), g = c("x-pagination"), k = c("x-info"), j = c("van-popup"), I = c("van-action-sheet");
  return d(), b("div", Bi, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(a, _({ key: 0 }, e._attrs, {
      domids: e.domids,
      onAdd: e._onAdd,
      onSearch: e._onSearch,
      onExport: e._onExport,
      onSearchExport: e._onSearchExport,
      onImport: e._onImport,
      onMultiDelete: e._onMultiDelete
    }), Y({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: h(() => [
          S(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: h(() => [
          S(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : w("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), b("div", Ri, [
      (d(!0), b(F, null, R(e._data, (V, O) => (d(), b("div", {
        key: O,
        class: "row",
        onClick: (T) => i.handleClickCard(O)
      }, [
        M("div", Ii, [
          i.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[O],
            "onUpdate:modelValue": (T) => n.selected[O] = T,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = J(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : w("", !0),
          p(u, {
            name: "ellipsis",
            class: "more",
            onClick: J((T) => i.handleShowActionSheet(V, O), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        i.hasRadio ? (d(), b("input", {
          key: 0,
          type: "radio",
          value: O,
          checked: O === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = J(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
        }, null, 40, Di)) : w("", !0),
        (d(!0), b(F, null, R(i.cols, (T, D) => (d(), b("div", {
          key: D,
          class: "field"
        }, [
          M("span", Ui, A(T.label) + ":", 1),
          M("span", Pi, A(e.calcValue(V, T)), 1)
        ]))), 128))
      ], 8, Ni))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(v, _({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (V) => e.$emit("search"))
    }), {
      default: h(() => [
        (d(!0), b(F, null, R(e._data, (V, O) => (d(), f(m, {
          key: O,
          "is-link": "",
          onClick: (T) => i.handleShowDetail(V, O)
        }, {
          default: h(() => [
            i.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[O],
              "onUpdate:modelValue": (T) => n.selected[O] = T,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = J(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : w("", !0),
            i.hasRadio ? (d(), b("input", {
              key: 1,
              type: "radio",
              value: O,
              checked: O === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = J(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
            }, null, 40, Li)) : w("", !0),
            i.hasIndex ? (d(), b("span", qi, A(O + 1), 1)) : w("", !0),
            M("span", Xi, A(i.calcTitle(V)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : w("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(g, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (V) => e._emit("search"))
    }, null, 8, ["query", "total"])) : w("", !0),
    p(j, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (V) => n.popupVisible = V),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: h(() => [
        p(k, {
          data: n.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(I, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (V) => n.actionSheetVisible = V),
      actions: i.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: i.handleSelectAction,
      onCancel: t[10] || (t[10] = (V) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Wi = /* @__PURE__ */ $(Mi, [["render", zi], ["__scopeId", "data-v-5d189b00"]]);
const Hi = {
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
      const l = t + s;
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
          const { prop: t, label: s, show: l, hide: n, width: i } = e;
          return { prop: t, label: s, show: l, hide: n, width: i };
        })
      });
    }
  }
}, Ji = (e) => (Be("data-v-c81e4a2f"), e = e(), Re(), e), Ki = { class: "table" }, Yi = ["title", "onClick"], Gi = /* @__PURE__ */ Ji(() => /* @__PURE__ */ M("span", { class: "unit" }, "px", -1));
function Qi(e, t, s, l, n, i) {
  const o = c("el-button"), a = c("ElCheckbox"), r = c("el-input-number"), u = c("el-tab-pane"), m = c("el-tabs"), v = c("el-popover");
  return s.visible ? (d(), f(v, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: h(() => [
      p(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: h(() => [
      p(m, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => n.activeName = g)
      }, {
        default: h(() => [
          p(u, {
            name: "columns",
            label: "展示列"
          }, {
            default: h(() => [
              p(o, {
                type: "warning",
                icon: "Close",
                onClick: i.handleResetColumns
              }, {
                default: h(() => [
                  E("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              M("div", Ki, [
                (d(!0), b(F, null, R(n.columns, (g, k) => (d(), b("div", {
                  key: k,
                  class: "row flex-center"
                }, [
                  p(o, {
                    disabled: k === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: (j) => i.handleMove(g, k, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  p(o, {
                    disabled: k === n.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: (j) => i.handleMove(g, k, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  p(a, {
                    modelValue: g.show,
                    "onUpdate:modelValue": (j) => g.show = j,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  M("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (j) => i.handleToggle(g)
                  }, A(g.label), 9, Yi),
                  p(r, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (j) => g.width = j,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  Gi
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
  }, 16)) : w("", !0);
}
const Qe = /* @__PURE__ */ $(Hi, [["render", Qi], ["__scopeId", "data-v-c81e4a2f"]]);
const Zi = {
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
}, el = { key: 1 }, tl = ["value", "checked"], sl = { key: 1 };
function nl(e, t, s, l, n, i) {
  const o = c("searcher"), a = c("pc-x-icon"), r = c("settings"), u = c("pc-x-table-tools"), m = c("el-image"), v = c("el-tag"), g = c("el-table-column"), k = c("el-button"), j = c("el-table"), I = c("x-pagination"), V = c("el-collapse-item"), O = c("el-collapse"), T = se("domid"), D = se("loading");
  return d(), b("div", {
    class: z(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    p(O, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (y) => n.activeNames = y),
      class: z((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: h(() => [
        p(V, {
          name: n.activeNames[0]
        }, {
          title: h(() => [
            e.$slots["collapse-title"] ? S(e.$slots, "collapse-title", { key: 0 }) : (d(), b("span", el, A(e.title), 1))
          ]),
          default: h(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(u, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), Y({
              "tools-end": h(() => [
                p(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                p(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[0] || (t[0] = (y) => n.settings = y),
                  visible: !e.hideSettings,
                  width: e._attrs["cols-popover-width"] || 500,
                  onReset: e.handleResetSettings
                }, null, 8, ["modelValue", "visible", "width", "onReset"])
              ]),
              _: 2
            }, [
              e.$slots["tools-prefix"] ? {
                name: "tools-prefix",
                fn: h(() => [
                  S(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: h(() => [
                  S(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : w("", !0),
            B((d(), f(j, _({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: h(() => [
                (d(!0), b(F, null, R(e._visibleColumns, (y, C) => (d(), f(g, _(y, {
                  key: C,
                  "min-width": y.minWidth,
                  align: y.align || e._attrs.tableAlign || "center",
                  resizable: y.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(y)
                }), Y({ _: 2 }, [
                  ["selection", "index"].includes(y.type) ? void 0 : {
                    name: "default",
                    fn: h((x) => [
                      y.type === "radio" ? (d(), b("input", {
                        key: 0,
                        type: "radio",
                        value: x.$index,
                        checked: x.$index === n.checked,
                        onChange: t[1] || (t[1] = (...U) => e.handleCheckedChange && e.handleCheckedChange(...U))
                      }, null, 40, tl)) : y.slot === "$image" ? (d(), f(m, _({
                        key: 1,
                        src: e._imageSrc(x, y),
                        "preview-src-list": e._imagePreviewSrcList(x, y),
                        "preview-teleported": ""
                      }, y.imageAttrs), null, 16, ["src", "preview-src-list"])) : y.slot === "$tag" ? (d(), f(v, {
                        key: 2,
                        type: e.calcTagType(x, y)
                      }, {
                        default: h(() => [
                          E(A(e.calcTagValue(x, y)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])) : y.slot ? S(e.$slots, y.slot, {
                        key: 3,
                        scope: x,
                        column: y,
                        value: x.row[y.prop]
                      }) : e.slotAll ? S(e.$slots, "all", {
                        key: 4,
                        scope: x,
                        column: y,
                        value: x.row[y.prop]
                      }) : (d(), b(F, { key: 5 }, [
                        y.comp === "ElSwitch" || e.table.isRowEdit && x.row.isEditing && (y.visible !== !1 || y.canEdit) ? (d(), f(Q(y.comp || "ElInput"), _({ key: 0 }, { ...y, ...y.formAttrs }, {
                          modelValue: x.row[y.prop],
                          "onUpdate:modelValue": (U) => x.row[y.prop] = U,
                          disabled: !x.row.editable || !x.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), b("span", sl, A(e.calcValue(x.row, y)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? w("", !0) : (d(), f(g, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: h((y) => [
                    S(e.$slots, "operates-prefix", { scope: y }),
                    e.canEdit(y.row) ? B((d(), f(k, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (C) => e._emit("edit", y)
                    }), {
                      default: h(() => [
                        p(a, { name: "edit" }),
                        E(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [T, e.domids.edit]
                    ]) : w("", !0),
                    e.canSave(y.row) ? B((d(), f(k, _({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: y.row._loading,
                      onClick: (C) => e._emit("row-edit", y)
                    }), {
                      default: h(() => [
                        p(a, { name: "collection" }),
                        E(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [D, y.row._loading],
                      [T, e.domids["row-edit"]]
                    ]) : w("", !0),
                    e.canCancelEdit(y.row) ? B((d(), f(k, _({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (C) => e._emit("cancel-edit", y)
                    }), {
                      default: h(() => [
                        p(a, { name: "refresh-left" }),
                        E(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [T, e.domids["cancel-edit"]]
                    ]) : w("", !0),
                    e.canDelete(y.row) ? B((d(), f(k, _({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (C) => e._emit("delete", y)
                    }), {
                      default: h(() => [
                        p(a, { name: "DeleteFilled" }),
                        E(" 删除 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [T, e.domids.delete]
                    ]) : w("", !0),
                    S(e.$slots, "operates-suffix", { scope: y })
                  ]),
                  _: 3
                }, 8, ["min-width", "align", "fixed"]))
              ]),
              _: 3
            }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
              [D, e._loading]
            ]),
            e._query && e._total ? (d(), f(I, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (y) => e._emit("search", n.params))
            }, null, 8, ["query", "total"])) : w("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const il = /* @__PURE__ */ $(Zi, [["render", nl]]);
const ll = {
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
}, ol = { class: "mobile-x-table-tools" }, al = { key: 0 }, rl = { class: "tools" }, dl = { class: "tools-end" };
function cl(e, t, s, l, n, i) {
  const o = c("van-floating-bubble"), a = c("mobile-x-icon"), r = c("van-button"), u = se("domid");
  return d(), b("div", ol, [
    e.$attrs.onAdd ? B((d(), b("div", al, [
      p(o, {
        axis: "xy",
        magnetic: "x",
        icon: "plus",
        class: "flex-center",
        style: { position: "fixed", top: "0", "font-size": "22px", width: "40px", height: "40px", "background-color": "#1989fa", "border-radius": "50%", color: "white" },
        onClick: t[0] || (t[0] = (m) => e.$emit("add"))
      })
    ])), [
      [u, s.domids.add]
    ]) : w("", !0),
    M("div", rl, [
      S(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? B((d(), f(r, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (m) => e.$emit("search"))
      }), {
        default: h(() => [
          p(a, { name: "search" }),
          E(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids.search]
      ]) : w("", !0),
      e.$attrs.onMultiEdit ? B((d(), f(r, _({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
      }), {
        default: h(() => [
          p(a, { name: "edit" }),
          E(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids["multi-edit"]]
      ]) : w("", !0),
      e.$attrs.onMultiDelete ? B((d(), f(r, _({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
      }), {
        default: h(() => [
          p(a, { name: "DeleteFilled" }),
          E(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids["multi-delete"]]
      ]) : w("", !0),
      e.$attrs.onExport ? B((d(), f(r, _({ key: 3 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (m) => e.$emit("export"))
      }), {
        default: h(() => [
          p(a, { name: "printer" }),
          E(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids.export]
      ]) : w("", !0),
      e.$attrs.onSearchExport ? B((d(), f(r, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
      }), {
        default: h(() => [
          p(a, { name: "printer" }),
          E(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids["search-export"]]
      ]) : w("", !0),
      e.$attrs.onImport ? B((d(), f(r, _({ key: 5 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (m) => e.$emit("import"))
      }), {
        default: h(() => [
          p(a, { name: "UploadFilled" }),
          E(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids.import]
      ]) : w("", !0),
      S(e.$slots, "tools-suffix", {}, void 0, !0),
      M("div", dl, [
        S(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const ul = /* @__PURE__ */ $(ll, [["render", cl], ["__scopeId", "data-v-6ef6b95e"]]);
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
}, ml = { class: "tools" }, pl = { class: "tools-end flex-center" };
function fl(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-card"), u = se("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: h(() => [
      M("div", ml, [
        S(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? B((d(), f(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (m) => e.$emit("search"))
        }), {
          default: h(() => [
            p(o, { name: "search" }),
            E(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids.search]
        ]) : w("", !0),
        e.$attrs.onAdd ? B((d(), f(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (m) => e.$emit("add"))
        }), {
          default: h(() => [
            p(o, { name: "circle-plus-filled" }),
            E(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids.add]
        ]) : w("", !0),
        e.$attrs.onMultiEdit ? B((d(), f(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
        }), {
          default: h(() => [
            p(o, { name: "edit" }),
            E(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids["multi-edit"]]
        ]) : w("", !0),
        e.$attrs.onMultiDelete ? B((d(), f(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
        }), {
          default: h(() => [
            p(o, { name: "DeleteFilled" }),
            E(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids["multi-delete"]]
        ]) : w("", !0),
        e.$attrs.onExport ? B((d(), f(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (m) => e.$emit("export"))
        }), {
          default: h(() => [
            p(o, { name: "printer" }),
            E(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids.export]
        ]) : w("", !0),
        e.$attrs.onSearchExport ? B((d(), f(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
        }), {
          default: h(() => [
            p(o, { name: "printer" }),
            E(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids["search-export"]]
        ]) : w("", !0),
        e.$attrs.onImport ? B((d(), f(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (m) => e.$emit("import"))
        }), {
          default: h(() => [
            p(o, { name: "UploadFilled" }),
            E(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids.import]
        ]) : w("", !0),
        S(e.$slots, "tools-suffix", {}, void 0, !0),
        M("div", pl, [
          S(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const gl = /* @__PURE__ */ $(hl, [["render", fl], ["__scopeId", "data-v-02d70f98"]]);
function _l(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Me(e);
}
const bl = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, l = (n) => {
    n ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const i = n ? e._data.slice() : [];
    e.handleSelectionChange(i);
  };
  return p(c("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: l
  }, null);
}, yl = (e, t) => {
  const {
    rowIndex: s,
    rowData: l
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const i = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(i);
  };
  return p(c("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, vl = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, wl = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return p("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, ae = ([e, t, s, l, n, i]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return p(c("el-button"), _({
    type: l
  }, t._attrs[s + "-btn"], {
    onClick: r
  }), {
    default: () => [p(c("x-icon"), {
      name: n
    }, null), i]
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
}, xl = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => yl(i, t);
  if (e.type === "index")
    return (i) => vl(i, t);
  if (e.type === "radio")
    return (i) => wl(i, t);
  if (e.slot) {
    if (n[e.slot])
      return n[e.slot];
    if (l[e.slot])
      return (i) => l[e.slot]({
        scope: {
          $index: i.rowIndex,
          row: i.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (i) => l.all({
      scope: {
        $index: i.rowIndex,
        row: i.rowData
      },
      column: e
    });
  return (i) => {
    const {
      rowData: o,
      column: a
    } = i;
    if (a.comp === "ElSwitch" || t.table.isRowEdit && o.isEditing && (a.visible !== !1 || a.canEdit)) {
      const m = (g) => {
        o[a.prop] = g;
      }, v = a.comp || "ElInput";
      return W(c(v), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: m,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(i.rowData, e), {
      showOverflowTooltip: u
    } = a.tableAttrs || {};
    return u ? p(c("el-tooltip"), {
      content: r
    }, _l(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, El = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, n = e.map((i, o) => {
    const {
      tableAttrs: a = {}
    } = i, r = {
      ...i,
      key: o,
      dataKey: i.prop,
      title: i.label,
      width: i.width || a.width || i.minWidth || a.minWidth || i.maxWidth || a.maxWidth,
      align: i.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = bl(t)), r.cellRenderer = xl(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(i) {
      return p("div", {
        class: "operates"
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, Sl(i, t), $l(i, t), kl(i, t), Cl(i, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), n;
}, Vl = {
  convertColumnsForTableV2: El
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
function jl(e, t, s, l, n, i) {
  const o = c("Searcher"), a = c("x-icon"), r = c("Settings"), u = c("x-table-tools"), m = c("el-table-v2"), v = c("el-auto-resizer"), g = c("x-pagination"), k = c("el-collapse-item"), j = c("el-collapse"), I = se("loading");
  return d(), b("div", {
    class: z(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (V) => e._emit("search", V))
    }, null, 8, ["uid", "columns", "config"]),
    p(j, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (V) => n.activeNames = V),
      class: z((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: h(() => [
        p(k, {
          name: n.activeNames[0]
        }, {
          title: h(() => [
            e.$slots["collapse-title"] ? S(e.$slots, "collapse-title", { key: 0 }) : (d(), b("span", Ol, A(e.title), 1))
          ]),
          default: h(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(u, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), Y({
              "tools-end": h(() => [
                p(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                p(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (V) => n.settings = V),
                  visible: !e.hideSettings,
                  width: e._attrs["cols-popover-width"] || 500,
                  onReset: e.handleResetSettings
                }, null, 8, ["modelValue", "visible", "width", "onReset"])
              ]),
              _: 2
            }, [
              e.$slots["tools-prefix"] ? {
                name: "tools-prefix",
                fn: h(() => [
                  S(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: h(() => [
                  S(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : w("", !0),
            p(v, {
              style: nt({ height: s.height })
            }, {
              default: h(({ width: V, height: O }) => [
                B((d(), f(m, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: V,
                  height: O
                }), Y({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: h(() => [
                      S(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: h(() => [
                      S(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: h(() => [
                      S(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [I, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(g, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (V) => e._emit("search"))
            }, null, 8, ["query", "total"])) : w("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Tl = /* @__PURE__ */ $(Al, [["render", jl]]);
const ce = ["selection", "radio"], Fl = {
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
}, Ml = { class: "x-table-viewer" };
function Bl(e, t, s, l, n, i) {
  const o = c("x-dialog");
  return d(), b("div", Ml, [
    p(o, _(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: h(() => [
        (d(), f(Q(s.useTableV2 ? "x-table-v2" : "x-table"), _({
          tref: i.table.tableRef,
          "onUpdate:tref": t[0] || (t[0] = (a) => i.table.tableRef = a),
          table: i.table
        }, i._tableAttrs, {
          onSearch: s.controller.handleSearch
        }), null, 16, ["tref", "table", "onSearch"]))
      ]),
      _: 1
    }, 16, ["modelValue", "title", "before-close", "onSubmit", "onCancel"])
  ]);
}
const Rl = /* @__PURE__ */ $(Fl, [["render", Bl], ["__scopeId", "data-v-f5d31400"]]), Nl = {
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
function Ul(e, t, s, l, n, i) {
  return d(), b("div", Il, [
    M("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, Dl)
  ]);
}
const Pl = /* @__PURE__ */ $(Nl, [["render", Ul]]);
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
      const l = ((n = this.service) == null ? void 0 : n.API_BASE_URL) + "/" + e.filename;
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
        s = s.map((n) => l + n), this.$emit("update:modelValue", s);
      } catch (t) {
        return this.$message.error(t.toString());
      }
    }
  }
}, we = (e) => (Be("data-v-fe069681"), e = e(), Re(), e), ql = { class: "mask" }, Xl = {
  key: 0,
  class: "el-upload__text"
}, zl = /* @__PURE__ */ we(() => /* @__PURE__ */ M("em", null, "点击上传", -1)), Wl = /* @__PURE__ */ we(() => /* @__PURE__ */ M("br", null, null, -1)), Hl = /* @__PURE__ */ we(() => /* @__PURE__ */ M("br", null, null, -1)), Jl = {
  key: 0,
  class: "path"
};
function Kl(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-upload");
  return d(), f(r, _({
    "file-list": n.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (u) => n.fileList = u),
    drag: "",
    disabled: n.disabled,
    action: i.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": i.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: h(() => [
      M("div", ql, [
        p(o, { name: "upload-filled" }),
        n.disabled ? w("", !0) : (d(), b("div", Xl, [
          E(" 将文件拖到此处，或"),
          zl,
          Wl,
          Hl,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: J(i.handleUploadAll, ["stop"])
          }, {
            default: h(() => [
              E(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : w("", !0)
        ]))
      ]),
      i.filepath ? (d(), b("div", Jl, A(s.modelValue), 1)) : w("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Yl = /* @__PURE__ */ $(Ll, [["render", Kl], ["__scopeId", "data-v-fe069681"]]);
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
      K({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, Ql = ["src"];
function Zl(e, t, s, l, n, i) {
  const o = c("Plus"), a = c("el-icon"), r = c("el-upload"), u = c("el-dialog");
  return d(), b(F, null, [
    p(r, _({
      "file-list": s.modelValue,
      "onUpdate:fileList": t[0] || (t[0] = (m) => e.$emit("update:modelValue", m)),
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: i.limit,
      class: ["x-image-uploader", { disabled: e.$attrs.disabled || i.images.length >= i.limit }],
      "on-preview": i.handlePreview,
      "on-exceed": i.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1
    }), {
      default: h(() => [
        p(a, null, {
          default: h(() => [
            p(o)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload"]),
    p(u, {
      modelValue: n.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (m) => n.dialogVisible = m),
      title: "预览图片" + n.previewingImage.name
    }, {
      default: h(() => [
        M("img", {
          src: n.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, Ql)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const eo = /* @__PURE__ */ $(Gl, [["render", Zl], ["__scopeId", "data-v-821cec65"]]), ue = {
  xactionsheet: xt,
  xautorows: jt,
  mobilexbutton: Mt,
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
  mobilexicon: Fs,
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
  mobilextable: Wi,
  pcxtable: il,
  mobilextabletools: ul,
  pcxtabletools: gl,
  xtablev2: Tl,
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
    return W(te[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), pe = (() => {
  const e = Object.keys(te), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = te[l]);
  for (const l of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(l.toLowerCase())) ? s[l] = to(l) : s[l] = te[l];
  return s;
})(), so = (e, t) => {
  for (let s in pe)
    e.component(s, pe[s]);
}, io = {
  version: "1.0.129",
  ...pe,
  ...He,
  ...$t,
  install: so
};
export {
  Je as BaseController,
  le as Confirm,
  Ke as CrudController,
  K as Message,
  ie as Notify,
  St as TempCrudController,
  Ue as baseDialog,
  Ie as baseForm,
  yt as baseModel,
  De as baseTable,
  $t as controllers,
  io as default,
  ot as effects,
  q as formatOptions,
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
