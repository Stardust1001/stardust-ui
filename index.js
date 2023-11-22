import { toRaw as st, nextTick as ee, watch as fe, resolveComponent as c, openBlock as d, createBlock as f, mergeProps as b, createElementBlock as _, Fragment as M, renderList as R, withCtx as h, renderSlot as S, toDisplayString as O, useCssVars as Fe, createTextVNode as V, createSlots as Y, resolveDynamicComponent as Q, createCommentVNode as w, createVNode as p, normalizeClass as z, normalizeProps as le, guardReactiveProps as Me, h as W, isVNode as Te, createElementVNode as B, withModifiers as J, pushScopeId as Be, popScopeId as Re, resolveDirective as se, withDirectives as T, normalizeStyle as nt } from "vue";
const it = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const i = e.getContext("2d");
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
  const o = () => i.clearRect(0, 0, t, s), l = (C) => Math.floor(Math.random() * C);
  let a = 0, r = 0.01, u = 0;
  const m = () => {
    const C = i.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    u ? u-- : (a += r, a <= 0 && (a = 0, r = -r, u = k * 30), a >= 1 && (a = 1, r = -r, u = k * 30)), C.addColorStop(0, "rgba(250, 220, 20, 0.5)"), C.addColorStop(a, "rgba(20, 20, 20, 0.5)"), i.fillStyle = C, i.fillRect(0, 0, t, s);
  }, v = Math.floor(t / 100), g = Math.floor(s / 100), k = 20, j = Math.round(1e3 / k), I = Array.from({ length: 52 }).map(() => {
    const C = Math.floor(l(v + g) * 1.5 + l(5));
    let x = l(t), U = l(s);
    x = Math.min(Math.max(C, x), t - C), U = Math.min(Math.max(C, U), s - C);
    let X = l(2) ? (l(2) + 2) * v : (l(-1) - 2) * v, Z = l(2) ? (l(2) + 2) * g : (l(-1) - 2) * g;
    return X = Math.floor(X / k), Z = Math.floor(Z / k), new n(
      x,
      U,
      C,
      `rgba(${l(256)}, ${l(256)}, ${l(256)}, ${(l(5) + 5) / 10})`,
      X,
      Z,
      i
    );
  });
  let E, A;
  e.addEventListener("mouseover", (C) => {
    E = C.pageX, A = C.pageY;
  }), e.addEventListener("mousemove", (C) => {
    if (E === void 0) {
      E = C.pageX, A = C.pageY;
      return;
    }
    const x = C.pageX - E, U = C.pageY - A;
    I.forEach((X) => {
      X.x += x / k, X.y += U / k;
    }), E = C.pageX, A = C.pageY;
  });
  let F = Date.now(), D = null;
  const y = () => {
    Date.now() - F >= j && (o(), m(), I.forEach((C) => C.update()), F = Date.now()), D = requestAnimationFrame(y);
  };
  return D = requestAnimationFrame(y), () => cancelAnimationFrame(D);
}, ot = ({
  text: e,
  gap: t,
  fontSize: s,
  color: i,
  width: n = window.innerWidth,
  height: o = window.innerHeight,
  drawMode: l = "fill"
}) => {
  const a = document.createElement("canvas");
  a.width = n, a.height = o;
  const r = a.getContext("2d");
  r.font = `${s}px Arial`, r[l + "Style"] = i;
  const m = r.measureText(e).width + t, v = s + t;
  for (let g = t / 2; g < o; g += v)
    for (let k = t / 2; k < n; k += m)
      r[l + "Text"](e, k, g);
  return a;
}, lt = {
  pop: it,
  createWatermark: ot
}, Ne = async (e) => {
  var i, n;
  const t = await ((i = e.formRef) == null ? void 0 : i.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((o) => {
    var l, a;
    return ((l = o.comp) == null ? void 0 : l.endsWith("XForm")) || ((a = o.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((o) => Ne(o.form)));
  return t && s.every((o) => o);
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
  let i = s;
  if (typeof s[0] != "object" && (i = s.map((o) => ({ text: o, value: o }))), !t.sort)
    return i;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((o, l) => o[n].localeCompare(l[n]));
}, { ElMessage: rt, ElNotification: dt, ElMessageBox: ct } = window.ElementPlus || {}, { showToast: ut, showNotify: ht, showConfirmDialog: mt } = window.vant || {}, K = (e) => {
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
}, ie = (e) => {
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
}, oe = (e) => {
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
  ), t.then(() => e.distinguishCancelAndClose ? "confirm" : !0).catch((i) => e.distinguishCancelAndClose ? i : !1);
};
for (let e of ["success", "warning", "info", "error", "primary", "loading", "fail", "html"])
  K[e] = K[e[0]] = (t) => K({ type: e, ...typeof t != "string" ? t : { message: t } }), ie[e] = ie[e[0]] = (t) => ie({ type: e, ...typeof t != "string" ? t : { message: t } }), oe[e] = oe[e[0]] = (t) => oe({ type: e, ...t });
const pt = (e, t, s) => {
  e.beforeEach((i, n, o) => {
    i.matched.length ? o() : o("/404");
  });
}, ft = (e, t, s) => {
  e.afterEach((i, n) => {
    const o = i.matched.map((l) => l.meta.title);
    document.title = [t.app.sitename, ...o].filter((l) => l).reverse().join("-");
  });
}, gt = (e, t, s) => {
  e.beforeEach((i, n, o) => {
    var l;
    return (l = i.meta) != null && l.visitable || t.acl.paths.includes(i.path) ? o() : (K.e("无权访问页面: " + i.path), o("/404"));
  }), ee(() => {
    fe(() => t.acl.menus, (i) => {
      const n = t.acl.paths, o = (l, a) => {
        var u, m, v, g, k;
        const r = (a != null && a.path ? a.path + "/" : "") + l.path;
        l.meta || (l.meta = {}), a && (l.meta.hidden == null && ((m = l.meta).hidden ?? (m.hidden = (u = a.meta) == null ? void 0 : u.hidden), l.meta = { ...l.meta }), l.meta.visitable == null && ((g = l.meta).visitable ?? (g.visitable = (v = a.meta) == null ? void 0 : v.visitable), l.meta = { ...l.meta })), l.meta.hidden !== !1 && (l.meta.hidden = !n.includes(r)), (k = l.children) == null || k.forEach((j) => o(j, l));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, bt = (e, t, s) => {
  e.beforeEach((i, n, o) => {
    i.name === "Login" && t.getters.logined && i.query.redirectTo ? o(i.query.redirectTo) : o();
  });
}, _t = {
  check404: pt,
  setTitle: ft,
  checkRolesPages: gt,
  redirectTo: bt
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
  const { formItems: t, initialFormRules: s } = e, i = t.filter((o) => {
    let { formAttrs: l = {}, required: a = !1 } = o;
    return a = "required" in l ? l.required : a, !o.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(o.prop) && a !== !1;
  }).map((o) => o.prop);
  if (Object.assign(e.formRules, he.deepCopy(s)), Object.keys(e.formRules).forEach((o) => {
    o in s || delete e.formRules[o];
  }), !i.length)
    return;
  const n = {};
  return i.forEach((o) => {
    if (e.formRules[o])
      return;
    const l = t.find((k) => k.prop === o), a = l.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = We[a], u = [], m = "options" in l, g = { required: !0, message: `请${l.validator || l.asyncValidator ? "正确" : ""}${m ? "选择" : "输入"}${(l == null ? void 0 : l.label) || o}` };
    l.validator && (g.validator = l.validator), l.asyncValidator && (g.asyncValidator = l.asyncValidator), l.comp ? u.push({ ...g, trigger: r.change }) : u.push({ ...g, trigger: r.blur }), l.comp === "ElInputNumber" && u.push({ ...g, trigger: r.blur }), n[o] = u;
  }), Object.assign(e.formRules, n), e.formRules;
}, Xe = (e, t, s = !0) => {
  const i = {};
  return t.forEach((n) => {
    var u, m;
    let o = "";
    const { type: l, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && l === "number" || n.comp === "ElInputNumber")
      o = 0;
    else if (n.comp === "ElSwitch")
      o = !1;
    else if (a && ((u = n.comp) != null && u.endsWith("XCheckboxs") || (m = n.comp) != null && m.endsWith("x-checkboxs") || r))
      o = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const v = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + v), n["end-placeholder"] || (n["end-placeholder"] = "结束" + v), o = [];
    }
    i[n.prop] = o;
  }), Object.assign(e, { ...i, ...e }), e;
}, ze = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [i, n] = e.split(s);
  n = n.split("|");
  let o = t[i];
  typeof o == "number" ? o += "" : typeof o == "string" && (o = o.trim());
  const l = e.match(s)[0];
  return n.some((a) => l === "^=" ? o.startsWith(a) : l === "*=" ? o.includes(a) : l === "$=" ? o.endsWith(a) : l === "~=" ? !o.includes(a) : l === "!=" ? o !== a : a === o);
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
  effects: lt,
  validateForm: Ne,
  formatPrecision: at,
  formatOptions: q,
  Message: K,
  Notify: ie,
  Confirm: oe,
  middlewares: _t,
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
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.getOwnPropertyDescriptors(this.__proto__), i = Object.keys(s).filter((l) => l !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...i])).filter((l) => typeof this[l] == "function").forEach((l) => {
      this[l] = this[l].bind(this);
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
    const { model: s, table: i, dialog: n, dbModelName: o = "", idField: l = "id", listProp: a = "data" } = t;
    this.table = i || (s == null ? void 0 : s.table) || null, this.dialog = n || (s == null ? void 0 : s.dialog) || null, this.dbModelName = o, this.idField = l, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], ee(() => {
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
      const n = this.getDeleteParams(s), o = await this.remove(n, s);
      o.err || (this.afterDelete(o), this.handleSearch());
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
    const { list: i, selection: n, ref: o } = this.table;
    let l = n.length > 0 ? n : i;
    l = Se.deepCopy(l), l = this.processExportingData(l);
    const a = this.processExportingColumns(o._visibleColumns, "current"), r = a.map((g) => g.prop), u = a.map((g) => g.label);
    l = l.map((g) => r.map((k) => g[k]));
    let m = null;
    t === "csv" ? m = ne.export2Csv : m = ne.export2Excel;
    let v = { header: u, data: l, filename: s };
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
    const i = await this.dbTable.search(this.getSearchExportParams());
    let n = i.data;
    n = this.formatList(n, i), n = this.processExportingData(n, "search");
    const o = this.processExportingColumns(this.table.ref._visibleColumns, "search"), l = o.map((m) => m.prop), a = o.map((m) => m.label);
    n = n.map((m) => l.map((v) => m[v]));
    let r = null;
    t === "csv" ? r = ne.export2Csv : r = ne.export2Excel;
    let u = { header: a, data: n, filename: s };
    u = await this.processExporting(u), r(u), this._isExporting = !1;
  }
  async handleImport() {
    const t = await ke.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), i = await ke.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      n = window.Papa.parse(i, { header: !0 }).data;
    else {
      const o = window.XLSX.read(i, {});
      n = XLSX.utils.sheet_to_json(o.Sheets.SheetJS);
    }
    if (n.length > 0) {
      const o = {};
      this.table.columns.forEach((a) => o[a.label] = a.prop);
      const l = Object.keys(n[0]);
      n = n.map((a) => {
        const r = {};
        return l.forEach((u) => r[o[u]] = a[u]), r;
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
    } catch (o) {
      this._showError(o.data.err), this._isSubmitting = !1;
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
      let o = i[n.model || n.prop];
      n.type === "number" ? o = this.uiUtils.formatPrecision(o, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? o = re.format(o) : (!n.type || n.type === "date") && (o = re.format(o, "", !1))), i[n.model || n.prop] = o;
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
      const { page: o, limit: l, order: a, count: r, ...u } = s;
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
    const { columns: i, query: n } = this.table, { page: o, limit: l } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (o - 1) * l + r + 1;
    }), i.forEach((a) => {
      let { prop: r, options: u } = a;
      const { format: m, formatter: v, autoFill: g } = a.tableAttrs || {}, { modelName: k } = a.formAttrs || {};
      if (k && g)
        t.forEach((j) => j[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(u) && m !== !1) {
        const I = fe(() => a.options, (E, A) => {
          const F = A ? this.table.list : t, D = wt(a);
          F.forEach((y, C) => {
            const x = y[r];
            y[`_formatted_${r}`] = D[x] || (v == null ? void 0 : v(x, y, C)) || x;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(I);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const i = [...new Set(t.map((u) => u[s.prop]))];
    if (!i.length)
      return;
    const { modelName: n, text: o, value: l } = s.formAttrs, a = await this.service.restful.search(n, {
      limit: -1,
      attributes: [o, l],
      where: {
        [l]: {
          "[Op.in]": i
        }
      }
    });
    if (!a.data.length)
      return;
    const r = $e.mapField(a.data, l, o);
    this.table.list.forEach((u) => {
      u[`_formatted_${s.prop}`] = r[u[s.prop]];
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
    this.table.ref._visibleColumns.forEach((o) => {
      let { formatter: l = o.formatter, tagValues: a = o.tagValues } = o.tableAttrs || {};
      !l && typeof a == "function" && (l = a), i[o.prop] = { formatter: l, tagValues: a };
    });
    const n = Object.keys(t[0]);
    return t.forEach((o) => {
      n.forEach((l) => {
        var r, u;
        const a = o[l];
        if (o.hasOwnProperty("_formatted_" + l))
          return o[l] = o["_formatted_" + l];
        if ((r = i[l]) != null && r.formatter)
          return o[l] = i[l].formatter(a);
        if ((u = i[l]) != null && u.tagValues)
          return o[l] = i[l].tagValues[a];
        typeof a == "boolean" ? o[l] = a && 1 || 0 : a instanceof Date ? (o[l] = re.format(a), o[l].endsWith(" 00:00:00") && (o[l] = o[l].slice(0, -9))) : typeof a == "object" && (o[l] = JSON.stringify(a));
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
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: n = "value" } = s, o = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((l) => {
    o[l[n]] = l[i];
  }), o;
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
}, $ = (e, t) => {
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
function Ct(e, t, s, i, n, o) {
  const l = c("van-action-sheet");
  return d(), f(l, b(e.$attrs, {
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
      return this.cols.forEach((i) => {
        const n = i.span || this.span;
        t.push(i), s += n, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, Vt = { class: "x-auto-rows" }, At = { key: 1 };
function Ot(e, t, s, i, n, o) {
  const l = c("x-col"), a = c("x-row");
  return d(), _("div", Vt, [
    (d(!0), _(M, null, R(o.rows, (r, u) => (d(), f(a, b({ key: u }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: h(() => [
        (d(!0), _(M, null, R(r, (m, v) => (d(), f(l, b(m, {
          span: m.span || s.span,
          key: v,
          platform: e.$attrs.platform
        }), {
          default: h(() => [
            m.slot || e.$attrs.slot ? S(e.$slots, m.slot || e.$attrs.slot, {
              key: 0,
              col: m
            }) : (d(), _("span", At, O(m.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const jt = /* @__PURE__ */ $(Et, [["render", Ot]]), Ft = {
  name: "MobileXButton"
};
function Mt(e, t, s, i, n, o) {
  const l = c("van-button");
  return d(), f(l, null, {
    default: h(() => [
      S(e.$slots, "default")
    ]),
    _: 3
  });
}
const Tt = /* @__PURE__ */ $(Ft, [["render", Mt]]), Bt = {
  name: "PcXButton"
};
function Rt(e, t, s, i, n, o) {
  const l = c("el-button");
  return d(), f(l, null, {
    default: h(() => [
      S(e.$slots, "default")
    ]),
    _: 3
  });
}
const Nt = /* @__PURE__ */ $(Bt, [["render", Rt]]);
const { funcs: It } = StardustBrowser, be = {
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
}, xe = be.setup;
be.setup = xe ? (e, t) => (Ce(), xe(e, t)) : Ce;
const Dt = {
  class: "x-chart",
  ref: "el"
};
function Ut(e, t, s, i, n, o) {
  return d(), _("div", Dt, null, 512);
}
const Pt = /* @__PURE__ */ $(be, [["render", Ut], ["__scopeId", "data-v-0c2da986"]]), Lt = {
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
        ...o
      } = this.$attrs;
      return o;
    }
  },
  methods: {
    formatOptions: q
  }
};
function qt(e, t, s, i, n, o) {
  const l = c("van-checkbox"), a = c("van-checkbox-group");
  return d(), f(a, b({ class: "mobile-x-checkboxs" }, o.attrs, { direction: s.direction }), {
    default: h(() => [
      (d(!0), _(M, null, R(o.formatOptions(s.options, this), (r) => (d(), f(l, b(o.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: h(() => [
          V(O(r[s.text]), 1)
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
        ...i
      } = this.$attrs;
      return i;
    }
  },
  methods: {
    formatOptions: q
  }
};
function Wt(e, t, s, i, n, o) {
  const l = c("el-checkbox"), a = c("el-checkbox-group");
  return d(), f(a, b({ class: "pc-x-checkboxs" }, o.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r))
  }), {
    default: h(() => [
      (d(!0), _(M, null, R(o.formatOptions(s.options, this), (r) => (d(), f(l, b(o.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: h(() => [
          V(O(r[s.text]), 1)
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
function Kt(e, t, s, i, n, o) {
  const l = c("van-col");
  return d(), f(l, b(o.attrs, { class: "mobile-x-col" }), {
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
function Qt(e, t, s, i, n, o) {
  const l = c("el-col");
  return d(), f(l, b(o.attrs, { class: "pc-x-col" }), {
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
  }
};
function ts(e, t, s, i, n, o) {
  const l = c("van-dialog");
  return d(), f(l, b({ width: "92%" }, e.$attrs, {
    show: o.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => o.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: t[1] || (t[1] = (a) => e.$emit("submit")),
    onCancel: t[2] || (t[2] = (a) => e.$emit("cancel"))
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
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button"]);
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
function os(e, t, s, i, n, o) {
  const l = c("x-icon"), a = c("el-button");
  return d(), f(Q(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: o.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => o.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: h(() => [
      e.$slots.header ? S(e.$slots, "header", { key: 0 }) : (d(), _("span", is, O(e.$attrs.title), 1)),
      s.drawer ? w("", !0) : (d(), f(l, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: o.handleToggleFullscreen
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
          V(O(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : w("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: h(() => [
          V(O(s.cancelText), 1)
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
const ls = /* @__PURE__ */ $(ns, [["render", os]]), P = {}, H = {
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
        const i = Object.entries(P.province_list).find((n) => n[1] === e);
        this.province = i == null ? void 0 : i[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const i = Object.entries(P.city_list).find((n) => n[1] === t);
        this.city = i == null ? void 0 : i[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const i = Object.entries(P.county_list).find((n) => n[1] === s);
        this.county = i == null ? void 0 : i[0];
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
function rs(e, t, s, i, n, o) {
  const l = c("x-select"), a = c("x-col"), r = c("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: h(() => [
      p(a, { span: o.span }, {
        default: h(() => [
          p(l, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (u) => n.province = u),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      o.number > 1 ? (d(), f(a, {
        key: 0,
        span: o.span
      }, {
        default: h(() => [
          p(l, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (u) => n.city = u),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : w("", !0),
      o.number > 2 ? (d(), f(a, {
        key: 1,
        span: o.span
      }, {
        default: h(() => [
          p(l, {
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
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
}
function gs(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function bs(e) {
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
    formatModelValue: bs
  }
}, _s = {
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
function ys(e, t, s, i, n, o) {
  const l = c("mobile-x-form-item"), a = c("van-cell-group"), r = c("van-form");
  return d(), f(r, {
    ref: "formRef",
    class: z(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: h(() => [
      e.$slots.pre ? S(e.$slots, "pre", { key: 0 }) : w("", !0),
      p(a, le(Me(e.$attrs)), {
        default: h(() => [
          (d(!0), _(M, null, R(e._visibleItems, (u, m) => (d(), f(l, b(u, {
            rules: e._rules[u.prop] || u.rules,
            key: m,
            modelValue: e.formatModelValue(e._model[u.prop]),
            "onUpdate:modelValue": (v) => e._model[u.prop] = v,
            placeholder: e.calcPlaceholder(u)
          }), {
            default: h(() => [
              u.slot ? S(e.$slots, u.slot, le(b({ key: 0 }, u))) : w("", !0)
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
const vs = /* @__PURE__ */ $(_s, [["render", ys]]), ws = {
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
function $s(e, t, s, i, n, o) {
  const l = c("pc-x-form-item"), a = c("el-form"), r = c("el-collapse-item"), u = c("el-collapse");
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
          e.$slots["collapse-title"] ? S(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", Ss, O(s.title), 1))
        ]),
        default: h(() => [
          p(a, b({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: h(() => [
              e.$slots.pre ? S(e.$slots, "pre", { key: 0 }) : w("", !0),
              (d(!0), _(M, null, R(e._visibleItems, (m, v) => (d(), f(l, b({
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
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Te(e);
}
const me = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: n
  } = e;
  let {
    comp: o,
    compType: l,
    html: a,
    text: r
  } = t;
  const u = {
    ...i,
    "onUpdate:modelValue": (v) => n("update:modelValue", v)
  }, m = [];
  return l === "html" ? u.class = "comp-html" : o = c(o), a && (u.innerHTML = a), r && m.push(r), W(o, u, {
    default: () => m
  });
}, xs = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: n,
    $slots: o
  } = e, {
    slot: l,
    showTooltip: a,
    placeholder: r
  } = t;
  if (l && !s.label)
    return o.default();
  let u = null;
  if (l)
    u = o.default();
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
    attrs: i,
    $emit: n,
    $slots: o,
    mValue: l
  } = e, {
    slot: a,
    comp: r,
    modelValue: u
  } = t;
  if (a && !s.label)
    return o.default({
      ...t,
      ...s
    });
  const m = {
    modelValue: l,
    "onUpdate:modelValue": (v) => n("update:modelValue", v)
  };
  return a && s.label || r ? W(c("van-field"), m, {
    input: () => a && s.label ? o.default() : me(e)
  }) : (Object.assign(m, i), W(c("van-field"), m));
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
        iconSize: o,
        slot: l,
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
const _e = {
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
        compType: o,
        span: l,
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
  Fe((e) => ({
    ba9709f0: e.width
  }));
}, Ve = _e.setup;
_e.setup = Ve ? (e, t) => (Ee(), Ve(e, t)) : Ee;
const As = /* @__PURE__ */ $(_e, [["__scopeId", "data-v-d2cde1e2"]]), Ae = /* @__PURE__ */ Object.assign({}), Os = {
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
function Fs(e, t, s, i, n, o) {
  const l = c("van-icon");
  return n.icons[s.name] ? (d(), _("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, js)) : (d(), f(l, b({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Ms = /* @__PURE__ */ $(Os, [["render", Fs]]), Oe = /* @__PURE__ */ Object.assign({}), Ts = {
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
function Rs(e, t, s, i, n, o) {
  const l = c("el-icon");
  return n.icons[s.name] ? (d(), _("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Bs)) : (d(), f(l, le(b({ key: 1 }, e.$attrs)), {
    default: h(() => [
      (d(), f(Q(s.name)))
    ]),
    _: 1
  }, 16));
}
const Ns = /* @__PURE__ */ $(Ts, [["render", Rs]]), { highdict: Is } = StardustJs, { storage: Ds } = StardustBrowser, { local: Ye } = Ds, ye = ["index", "selection", "expand", "radio", "_index"];
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
  const { $props: e, _query: t } = this, { table: s, columns: i } = e;
  return (i || (s == null ? void 0 : s.columns) || []).map((o) => o.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(l) {
      const { page: a, limit: r } = t;
      return (a - 1) * r + l + 1;
    }
  }, o, { type: "index" }) : o.type === "radio" ? Object.assign({ width: 60, label: "单选" }, o) : Object.assign({}, o, o.tableAttrs));
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
function on() {
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
function ln() {
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
    const { prop: s, label: i, show: n, hide: o, width: l } = t;
    return { prop: s, label: i, show: n, hide: o, width: l };
  })), this.settings = e;
}
function hn(e) {
  Ye.setJson(`Settings[${this._uid}]`, e);
}
function mn(e, t) {
  const { prop: s } = t;
  let { format: i, formatter: n } = t.tableAttrs || t;
  i = Array.isArray(t.options) ? i !== !1 : i;
  const o = e[s];
  if (o == null || o === "")
    return this.defaultValue;
  if (i || n) {
    const l = `_formatted_${s}`;
    if (l in e)
      return e[l];
    if (n)
      return typeof n == "function" ? n(o, e, t) : Is.get(e, n);
  }
  return o;
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
function bn(e, t, s, i) {
  const n = this.settings.columns.find((o) => o.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function _n(e) {
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
    _listen: on,
    _visibleColumns: ln,
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
    calcValue: mn,
    calcOverflowTooltip: pn,
    handleSearch: fn,
    handleResetSettings: gn,
    handleHeaderDragend: bn,
    handleSelectionChange: _n,
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
        const { infoAttrs: s = {}, ...i } = t, n = { span: this.span, ...i, ...s }, o = n.block || "基本信息";
        let l = e[o];
        l || (e[o] = l = [], l.span = 0), l.span + n.span > 24 && l.length ? l[l.length - 1].span += 24 - l.span : l.span += n.span, l.push(n);
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
function In(e, t, s, i, n, o) {
  const l = c("el-descriptions-item"), a = c("el-descriptions"), r = c("el-collapse-item"), u = c("el-collapse");
  return d(), f(u, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: z(["x-info", { "hide-header": o.hideHeader }])
  }, {
    default: h(() => [
      (d(!0), _(M, null, R(o.blocks, (m, v) => (d(), f(r, {
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
              (d(!0), _(M, null, R(m, (g) => (d(), f(l, b({
                key: g.prop
              }, g), Y({
                default: h(() => [
                  g.slot ? (d(), _("span", Rn, [
                    S(e.$slots, g.slot, le(Me({ data: s.data, field: g, value: o.calcValue(s.data, g) })), void 0, !0)
                  ])) : (d(), _("span", Nn, O(o.calcValue(s.data, g)), 1))
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
function Ln(e, t, s, i, n, o) {
  return d(), _("div", null, [
    (d(!0), _(M, null, R(s.items, (l, a) => (d(), f(Q(s.compName), b({ key: a }, l), {
      default: h(() => [
        l.slot || e.$attrs.slot ? S(e.$slots, "default", {
          key: 0,
          item: l
        }) : (d(), _("span", Pn, O(l.text), 1))
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
function zn(e, t, s, i, n, o) {
  const l = c("van-icon"), a = c("van-pagination");
  return d(), f(a, b({ ...e.$attrs, ...e.mobilePagination || {} }, {
    modelValue: s.query.page,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => s.query.page = r),
    "items-per-page": s.query.limit,
    "page-count": o.pageCount,
    "total-items": s.total
  }), {
    "prev-text": h(() => [
      p(l, { name: "arrow-left" })
    ]),
    "next-text": h(() => [
      p(l, { name: "arrow" })
    ]),
    page: h(({ text: r }) => [
      V(O(r), 1)
    ]),
    _: 1
  }, 16, ["modelValue", "items-per-page", "page-count", "total-items"]);
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
function Jn(e, t, s, i, n, o) {
  const l = c("el-pagination");
  return d(), f(l, b({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": s.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => s.query.page = a),
    "page-size": s.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => s.query.limit = a),
    "page-count": o.pageCount,
    total: s.total
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
function Gn(e, t, s, i, n, o) {
  const l = c("van-picker"), a = c("van-popup");
  return d(), _(M, null, [
    B("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: z(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, O(s.modelValue || s.placeholder), 3),
    p(a, b({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: o.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => o.visible = r)
    }), {
      default: h(() => [
        p(l, b(e.$attrs, {
          title: e.$attrs.title,
          columns: s.columns,
          onCancel: t[1] || (t[1] = (r) => e.$emit("cancel")),
          onConfirm: o.onConfirm
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
function ei(e, t, s, i, n, o) {
  const l = c("van-radio"), a = c("van-radio-group");
  return d(), f(a, b({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: h(() => [
      (d(!0), _(M, null, R(o.formatOptions(s.options, this), (r) => (d(), f(l, b(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: h(() => [
          V(O(r[s.text]), 1)
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
        ...i
      } = this.$attrs;
      return i;
    }
  },
  methods: {
    formatOptions: q
  }
};
function ni(e, t, s, i, n, o) {
  const l = c("el-radio-group");
  return d(), f(l, b({ class: "pc-x-radios" }, o.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a))
  }), {
    default: h(() => [
      (d(!0), _(M, null, R(o.formatOptions(s.options, this), (a) => (d(), f(Q(s.button ? "el-radio-button" : "el-radio"), b(o.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: h(() => [
          V(O(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const ii = /* @__PURE__ */ $(si, [["render", ni]]), oi = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, li = { key: 1 };
function ai(e, t, s, i, n, o) {
  const l = c("mobile-x-col"), a = c("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: h(() => [
      (d(!0), _(M, null, R(s.cols, (r, u) => (d(), f(l, b(r, { key: u }), {
        default: h(() => [
          r.slot || e.$attrs.slot ? S(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), _("span", li, O(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? S(e.$slots, "default", { key: 0 }) : w("", !0)
    ]),
    _: 3
  });
}
const ri = /* @__PURE__ */ $(oi, [["render", ai]]), di = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ci = { key: 1 };
function ui(e, t, s, i, n, o) {
  const l = c("pc-x-col"), a = c("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: h(() => [
      (d(!0), _(M, null, R(s.cols, (r, u) => (d(), f(l, b(r, { key: u }), {
        default: h(() => [
          r.slot || e.$attrs.slot ? S(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), _("span", ci, O(r.text), 1))
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
function pi(e, t, s, i, n, o) {
  const l = c("van-icon"), a = c("van-field");
  return d(), f(a, b({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: o.handleClick
  }), {
    "right-icon": h(() => [
      p(l, {
        name: "scan",
        onClick: o.handleScan
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
function bi(e, t, s, i, n, o) {
  const l = c("el-button"), a = c("el-input");
  return d(), f(a, b(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: o.handleClick
  }), {
    append: h(() => [
      p(l, {
        icon: "CameraFilled",
        onClick: o.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const _i = /* @__PURE__ */ $(gi, [["render", bi]]), Ge = async (e, t, s) => {
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: n = "text", value: o = "value", labelTexts: l, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...l || [], n, o])], a.limit = a.limit || 20, i && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${i}%`);
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
function Si(e, t, s, i, n, o) {
  const l = c("x-picker");
  return d(), _("div", {
    onClick: t[5] || (t[5] = (...a) => o.onClick && o.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(l, b(e.$attrs, {
      modelValue: o.formattedModelValue,
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
function Vi(e, t, s, i, n, o) {
  const l = c("el-option"), a = c("el-select");
  return d(), f(a, b({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || o.remoteSearch
  }), {
    default: h(() => [
      (d(!0), _(M, null, R(n._options, (r) => (d(), f(l, b(e.$attrs, {
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
          }, void 0, !0) : (d(), _("span", Ci, [
            B("span", xi, O(o.calcMainLabel(r)), 1),
            B("span", Ei, O(o.calcRemarkLabel(r)), 1)
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
    visible: i,
    conditions: n,
    expression: o,
    handleSearch: l,
    handleReset: a,
    handleAdd: r,
    handleDelete: u,
    handleSelectField: m,
    handleSelectOp: v
  } = this;
  return p(c("x-dialog"), b({
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
    onSubmit: l
  }), {
    default: () => [t.traditional ? null : p(c("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: r
    }, {
      default: () => [V("新增条件")]
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
      default: () => [V("X")]
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
    }, [Fi(this, g)])])]))]), t.traditional ? null : p(c("el-input"), b({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: o,
      "onUpdate:modelValue": (g) => this.expression = g
    }), null)]
  });
}
function Fi(e, t) {
  const s = (n) => W(c((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (o) => t.value = o
  }, n)), i = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? p("div", {
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
        const { prop: n, op: o, value: l } = i;
        i.item = this.columns.find((a) => a.prop === n), i.value = l, this.handleSelectField(i, n), this.handleSelectOp(i, o), i.ops = L[i.component].map((a) => je[a]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((i) => i.no)) + 1), Object.assign(this, e);
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
      const t = (i, n) => {
        const o = [], l = "[Op." + i.type + "]";
        n[l] = o;
        for (let a of i.items)
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
            o.push(this.parseCondition(r));
          } else {
            const r = {};
            o.push(r), t(a, r);
          }
        o.length || delete n[l];
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((n) => n.trim()), s = (n, o) => {
        for (; o.length; ) {
          const l = o.shift();
          if (["and", "or"].includes(l)) {
            if (n.type && n.type !== l)
              throw "串联不同逻辑表达式请使用小括号区分";
            n.type = l;
          } else if (l === "(") {
            const a = { type: "", items: [] };
            n.items.push(a), a._parent = n, s(a, o);
            break;
          } else
            l === ")" ? (s(n._parent, o), delete n._parent) : n.items.push(l);
        }
      }, i = { type: "", items: [] };
      return s(i, t), i.type = i.type || "and", i;
    },
    parseCondition(e) {
      let { prop: t, op: s, value: i } = e;
      const n = {};
      if (s === "special") {
        const o = i.startsWith("NOT_"), l = i.startsWith("NE_");
        return i.includes("NULL") ? i = null : i.includes("BLANK") && (i = ""), o ? i = { "[Op.not]": i } : l && (i = { "[Op.ne]": i }), n[t] = i, n;
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
      e.value = "", e.prop = t, e.item = this.columns.find((x) => x.prop === e.prop);
      const { options: s, type: i, formAttrs: n = {} } = e.item, o = { ...e.item, ...n }, {
        comp: l,
        visible: a,
        canAdd: r,
        canEdit: u,
        required: m,
        slot: v,
        span: g,
        tableAttrs: k,
        formAttrs: j,
        tagTypes: I,
        tagValues: E,
        width: A,
        minWidth: F,
        disabled: D,
        readonly: y,
        ...C
      } = o;
      C.clearable ?? (C.clearable = !0), e.config = C, e.component = l || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = L[e.component].map((x) => je[x]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", C.type = "date");
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, ve = /* @__PURE__ */ $(Mi, [["__scopeId", "data-v-46237e6f"]]);
const Ti = {
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
function zi(e, t, s, i, n, o) {
  const l = c("searcher"), a = c("x-table-tools"), r = c("van-checkbox"), u = c("x-icon"), m = c("van-cell"), v = c("van-list"), g = c("x-pagination"), k = c("x-info"), j = c("van-popup"), I = c("van-action-sheet");
  return d(), _("div", Bi, [
    p(l, {
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
    (s.mode || e._attrs.mode) === "card" ? (d(), _("div", Ri, [
      (d(!0), _(M, null, R(e._data, (E, A) => (d(), _("div", {
        key: A,
        class: "row",
        onClick: (F) => o.handleClickCard(A)
      }, [
        B("div", Ii, [
          o.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[A],
            "onUpdate:modelValue": (F) => n.selected[A] = F,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = J(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : w("", !0),
          p(u, {
            name: "ellipsis",
            class: "more",
            onClick: J((F) => o.handleShowActionSheet(E, A), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        o.hasRadio ? (d(), _("input", {
          key: 0,
          type: "radio",
          value: A,
          checked: A === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = J(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
        }, null, 40, Di)) : w("", !0),
        (d(!0), _(M, null, R(o.cols, (F, D) => (d(), _("div", {
          key: D,
          class: "field"
        }, [
          B("span", Ui, O(F.label) + ":", 1),
          B("span", Pi, O(e.calcValue(E, F)), 1)
        ]))), 128))
      ], 8, Ni))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(v, b({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (E) => e.$emit("search"))
    }), {
      default: h(() => [
        (d(!0), _(M, null, R(e._data, (E, A) => (d(), f(m, {
          key: A,
          "is-link": "",
          onClick: (F) => o.handleShowDetail(E, A)
        }, {
          default: h(() => [
            o.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[A],
              "onUpdate:modelValue": (F) => n.selected[A] = F,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = J(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : w("", !0),
            o.hasRadio ? (d(), _("input", {
              key: 1,
              type: "radio",
              value: A,
              checked: A === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = J(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
            }, null, 40, Li)) : w("", !0),
            o.hasIndex ? (d(), _("span", qi, O(A + 1), 1)) : w("", !0),
            B("span", Xi, O(o.calcTitle(E)), 1)
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
      onSearch: t[7] || (t[7] = (E) => e._emit("search"))
    }, null, 8, ["query", "total"])) : w("", !0),
    p(j, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (E) => n.popupVisible = E),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: h(() => [
        p(k, {
          data: n.scope.row,
          fields: o.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(I, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (E) => n.actionSheetVisible = E),
      actions: o.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: o.handleSelectAction,
      onCancel: t[10] || (t[10] = (E) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Wi = /* @__PURE__ */ $(Ti, [["render", zi], ["__scopeId", "data-v-ea854172"]]);
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
          const { prop: t, label: s, show: i, hide: n, width: o } = e;
          return { prop: t, label: s, show: i, hide: n, width: o };
        })
      });
    }
  }
}, Ji = (e) => (Be("data-v-c81e4a2f"), e = e(), Re(), e), Ki = { class: "table" }, Yi = ["title", "onClick"], Gi = /* @__PURE__ */ Ji(() => /* @__PURE__ */ B("span", { class: "unit" }, "px", -1));
function Qi(e, t, s, i, n, o) {
  const l = c("el-button"), a = c("ElCheckbox"), r = c("el-input-number"), u = c("el-tab-pane"), m = c("el-tabs"), v = c("el-popover");
  return s.visible ? (d(), f(v, b({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: h(() => [
      p(l, {
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
              p(l, {
                type: "warning",
                icon: "Close",
                onClick: o.handleResetColumns
              }, {
                default: h(() => [
                  V("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              B("div", Ki, [
                (d(!0), _(M, null, R(n.columns, (g, k) => (d(), _("div", {
                  key: k,
                  class: "row flex-center"
                }, [
                  p(l, {
                    disabled: k === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: (j) => o.handleMove(g, k, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  p(l, {
                    disabled: k === n.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: (j) => o.handleMove(g, k, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  p(a, {
                    modelValue: g.show,
                    "onUpdate:modelValue": (j) => g.show = j,
                    onChange: o.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  B("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (j) => o.handleToggle(g)
                  }, O(g.label), 9, Yi),
                  p(r, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (j) => g.width = j,
                    onChange: o.update
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
}, eo = { key: 1 }, to = ["value", "checked"], so = { key: 1 };
function no(e, t, s, i, n, o) {
  const l = c("searcher"), a = c("pc-x-icon"), r = c("settings"), u = c("pc-x-table-tools"), m = c("el-image"), v = c("el-tag"), g = c("el-table-column"), k = c("el-button"), j = c("el-table"), I = c("x-pagination"), E = c("el-collapse-item"), A = c("el-collapse"), F = se("domid"), D = se("loading");
  return d(), _("div", {
    class: z(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    p(l, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    p(A, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (y) => n.activeNames = y),
      class: z((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: h(() => [
        p(E, {
          name: n.activeNames[0]
        }, {
          title: h(() => [
            e.$slots["collapse-title"] ? S(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", eo, O(e.title), 1))
          ]),
          default: h(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(u, b({ key: 0 }, e._attrs, {
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
            T((d(), f(j, b({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: h(() => [
                (d(!0), _(M, null, R(e._visibleColumns, (y, C) => (d(), f(g, b(y, {
                  key: C,
                  "min-width": y.minWidth,
                  align: y.align || e._attrs.tableAlign || "center",
                  resizable: y.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(y)
                }), Y({ _: 2 }, [
                  ["selection", "index"].includes(y.type) ? void 0 : {
                    name: "default",
                    fn: h((x) => [
                      y.type === "radio" ? (d(), _("input", {
                        key: 0,
                        type: "radio",
                        value: x.$index,
                        checked: x.$index === n.checked,
                        onChange: t[1] || (t[1] = (...U) => e.handleCheckedChange && e.handleCheckedChange(...U))
                      }, null, 40, to)) : y.slot === "$image" ? (d(), f(m, b({
                        key: 1,
                        src: e._imageSrc(x, y),
                        "preview-src-list": e._imagePreviewSrcList(x, y),
                        "preview-teleported": ""
                      }, y.imageAttrs), null, 16, ["src", "preview-src-list"])) : y.slot === "$tag" ? (d(), f(v, {
                        key: 2,
                        type: e.calcTagType(x, y)
                      }, {
                        default: h(() => [
                          V(O(e.calcTagValue(x, y)), 1)
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
                      }) : (d(), _(M, { key: 5 }, [
                        y.comp === "ElSwitch" || e.table.isRowEdit && x.row.isEditing && (y.visible !== !1 || y.canEdit) ? (d(), f(Q(y.comp || "ElInput"), b({ key: 0 }, { ...y, ...y.formAttrs }, {
                          modelValue: x.row[y.prop],
                          "onUpdate:modelValue": (U) => x.row[y.prop] = U,
                          disabled: !x.row.editable || !x.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), _("span", so, O(e.calcValue(x.row, y)), 1))
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
                    e.canEdit(y.row) ? T((d(), f(k, b({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (C) => e._emit("edit", y)
                    }), {
                      default: h(() => [
                        p(a, { name: "edit" }),
                        V(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [F, e.domids.edit]
                    ]) : w("", !0),
                    e.canSave(y.row) ? T((d(), f(k, b({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: y.row._loading,
                      onClick: (C) => e._emit("row-edit", y)
                    }), {
                      default: h(() => [
                        p(a, { name: "collection" }),
                        V(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [D, y.row._loading],
                      [F, e.domids["row-edit"]]
                    ]) : w("", !0),
                    e.canCancelEdit(y.row) ? T((d(), f(k, b({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (C) => e._emit("cancel-edit", y)
                    }), {
                      default: h(() => [
                        p(a, { name: "refresh-left" }),
                        V(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [F, e.domids["cancel-edit"]]
                    ]) : w("", !0),
                    e.canDelete(y.row) ? T((d(), f(k, b({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (C) => e._emit("delete", y)
                    }), {
                      default: h(() => [
                        p(a, { name: "DeleteFilled" }),
                        V(" 删除 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [F, e.domids.delete]
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
const io = /* @__PURE__ */ $(Zi, [["render", no]]);
const oo = {
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
}, lo = { class: "mobile-x-table-tools" }, ao = { key: 0 }, ro = { class: "tools" }, co = { class: "tools-end" };
function uo(e, t, s, i, n, o) {
  const l = c("van-floating-bubble"), a = c("mobile-x-icon"), r = c("van-button"), u = se("domid");
  return d(), _("div", lo, [
    e.$attrs.onAdd ? T((d(), _("div", ao, [
      p(l, {
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
    B("div", ro, [
      S(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? T((d(), f(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (m) => e.$emit("search"))
      }), {
        default: h(() => [
          p(a, { name: "search" }),
          V(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids.search]
      ]) : w("", !0),
      e.$attrs.onMultiEdit ? T((d(), f(r, b({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
      }), {
        default: h(() => [
          p(a, { name: "edit" }),
          V(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids["multi-edit"]]
      ]) : w("", !0),
      e.$attrs.onMultiDelete ? T((d(), f(r, b({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
      }), {
        default: h(() => [
          p(a, { name: "DeleteFilled" }),
          V(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids["multi-delete"]]
      ]) : w("", !0),
      e.$attrs.onExport ? T((d(), f(r, b({ key: 3 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (m) => e.$emit("export"))
      }), {
        default: h(() => [
          p(a, { name: "printer" }),
          V(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids.export]
      ]) : w("", !0),
      e.$attrs.onSearchExport ? T((d(), f(r, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
      }), {
        default: h(() => [
          p(a, { name: "printer" }),
          V(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids["search-export"]]
      ]) : w("", !0),
      e.$attrs.onImport ? T((d(), f(r, b({ key: 5 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (m) => e.$emit("import"))
      }), {
        default: h(() => [
          p(a, { name: "UploadFilled" }),
          V(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [u, s.domids.import]
      ]) : w("", !0),
      S(e.$slots, "tools-suffix", {}, void 0, !0),
      B("div", co, [
        S(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const ho = /* @__PURE__ */ $(oo, [["render", uo], ["__scopeId", "data-v-6ef6b95e"]]);
const mo = {
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
}, po = { class: "tools" }, fo = { class: "tools-end flex-center" };
function go(e, t, s, i, n, o) {
  const l = c("pc-x-icon"), a = c("el-button"), r = c("el-card"), u = se("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: h(() => [
      B("div", po, [
        S(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? T((d(), f(a, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (m) => e.$emit("search"))
        }), {
          default: h(() => [
            p(l, { name: "search" }),
            V(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids.search]
        ]) : w("", !0),
        e.$attrs.onAdd ? T((d(), f(a, b({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (m) => e.$emit("add"))
        }), {
          default: h(() => [
            p(l, { name: "circle-plus-filled" }),
            V(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids.add]
        ]) : w("", !0),
        e.$attrs.onMultiEdit ? T((d(), f(a, b({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
        }), {
          default: h(() => [
            p(l, { name: "edit" }),
            V(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids["multi-edit"]]
        ]) : w("", !0),
        e.$attrs.onMultiDelete ? T((d(), f(a, b({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
        }), {
          default: h(() => [
            p(l, { name: "DeleteFilled" }),
            V(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids["multi-delete"]]
        ]) : w("", !0),
        e.$attrs.onExport ? T((d(), f(a, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (m) => e.$emit("export"))
        }), {
          default: h(() => [
            p(l, { name: "printer" }),
            V(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids.export]
        ]) : w("", !0),
        e.$attrs.onSearchExport ? T((d(), f(a, b({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
        }), {
          default: h(() => [
            p(l, { name: "printer" }),
            V(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids["search-export"]]
        ]) : w("", !0),
        e.$attrs.onImport ? T((d(), f(a, b({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (m) => e.$emit("import"))
        }), {
          default: h(() => [
            p(l, { name: "UploadFilled" }),
            V(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [u, s.domids.import]
        ]) : w("", !0),
        S(e.$slots, "tools-suffix", {}, void 0, !0),
        B("div", fo, [
          S(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const bo = /* @__PURE__ */ $(mo, [["render", go], ["__scopeId", "data-v-02d70f98"]]);
function _o(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Te(e);
}
const yo = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, i = (n) => {
    n ? e._data.forEach((l, a) => e.selected.add(a)) : e.selected.clear();
    const o = n ? e._data.slice() : [];
    e.handleSelectionChange(o);
  };
  return p(c("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: i
  }, null);
}, vo = (e, t) => {
  const {
    rowIndex: s,
    rowData: i
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const o = [...t.selected].map((l) => t._data[l]);
    t.handleSelectionChange(o);
  };
  return p(c("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, wo = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, So = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return p("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, ae = ([e, t, s, i, n, o]) => {
  const {
    rowIndex: l,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: l,
      row: a
    });
  };
  return p(c("el-button"), b({
    type: i
  }, t._attrs[s + "-btn"], {
    onClick: r
  }), {
    default: () => [p(c("x-icon"), {
      name: n
    }, null), o]
  });
}, $o = (e, t) => {
  if (t.canEdit(e.rowData))
    return ae([e, t, "edit", "warning", "edit", "编辑"]);
}, ko = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return ae([e, t, "row-edit", "success", "collection", "保存"]);
}, Co = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return ae([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, xo = (e, t) => {
  if (t.canDelete(e.rowData))
    return ae([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Eo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (o) => vo(o, t);
  if (e.type === "index")
    return (o) => wo(o, t);
  if (e.type === "radio")
    return (o) => So(o, t);
  if (e.slot) {
    if (n[e.slot])
      return n[e.slot];
    if (i[e.slot])
      return (o) => i[e.slot]({
        scope: {
          $index: o.rowIndex,
          row: o.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (o) => i.all({
      scope: {
        $index: o.rowIndex,
        row: o.rowData
      },
      column: e
    });
  return (o) => {
    const {
      rowData: l,
      column: a
    } = o;
    if (a.comp === "ElSwitch" || t.table.isRowEdit && l.isEditing && (a.visible !== !1 || a.canEdit)) {
      const m = (g) => {
        l[a.prop] = g;
      }, v = a.comp || "ElInput";
      return W(c(v), {
        ...a,
        ...a.formAttrs,
        modelValue: l[a.prop],
        onInput: m,
        disabled: !l.editable || !l.isEditing
      });
    }
    const r = t.calcValue(o.rowData, e), {
      showOverflowTooltip: u
    } = a.tableAttrs || {};
    return u ? p(c("el-tooltip"), {
      content: r
    }, _o(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Vo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, n = e.map((o, l) => {
    const {
      tableAttrs: a = {}
    } = o, r = {
      ...o,
      key: l,
      dataKey: o.prop,
      title: o.label,
      width: o.width || a.width || o.minWidth || a.minWidth || o.maxWidth || a.maxWidth,
      align: o.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = yo(t)), r.cellRenderer = Eo(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(o) {
      return p("div", {
        class: "operates"
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, $o(o, t), ko(o, t), Co(o, t), xo(o, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), n;
}, Ao = {
  convertColumnsForTableV2: Vo
};
const Oo = {
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
    convertColumnsForTableV2: Ao.convertColumnsForTableV2
  }
}, jo = { key: 1 };
function Fo(e, t, s, i, n, o) {
  const l = c("Searcher"), a = c("x-icon"), r = c("Settings"), u = c("x-table-tools"), m = c("el-table-v2"), v = c("el-auto-resizer"), g = c("x-pagination"), k = c("el-collapse-item"), j = c("el-collapse"), I = se("loading");
  return d(), _("div", {
    class: z(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    p(l, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (E) => e._emit("search", E))
    }, null, 8, ["uid", "columns", "config"]),
    p(j, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (E) => n.activeNames = E),
      class: z((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: h(() => [
        p(k, {
          name: n.activeNames[0]
        }, {
          title: h(() => [
            e.$slots["collapse-title"] ? S(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", jo, O(e.title), 1))
          ]),
          default: h(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(u, b({ key: 0 }, e._attrs, {
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
                  "onUpdate:modelValue": t[1] || (t[1] = (E) => n.settings = E),
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
              default: h(({ width: E, height: A }) => [
                T((d(), f(m, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: o.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: E,
                  height: A
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
              onSearch: t[2] || (t[2] = (E) => e._emit("search"))
            }, null, 8, ["query", "total"])) : w("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Mo = /* @__PURE__ */ $(Oo, [["render", Fo]]);
const ce = ["selection", "radio"], To = {
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
}, Bo = { class: "x-table-viewer" };
function Ro(e, t, s, i, n, o) {
  const l = c("x-dialog");
  return d(), _("div", Bo, [
    p(l, b(o._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": o.handleBeforeClose,
      onSubmit: o.handleSubmit,
      onCancel: o.handleCancel
    }), {
      default: h(() => [
        (d(), f(Q(s.useTableV2 ? "x-table-v2" : "x-table"), b({
          tref: o.table.tableRef,
          "onUpdate:tref": t[0] || (t[0] = (a) => o.table.tableRef = a),
          table: o.table
        }, o._tableAttrs, {
          onSearch: s.controller.handleSearch
        }), null, 16, ["tref", "table", "onSearch"]))
      ]),
      _: 1
    }, 16, ["modelValue", "title", "before-close", "onSubmit", "onCancel"])
  ]);
}
const No = /* @__PURE__ */ $(To, [["render", Ro], ["__scopeId", "data-v-f5d31400"]]), Io = {
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
}, Do = { class: "x-tinymce" }, Uo = ["id", "innerHTML"];
function Po(e, t, s, i, n, o) {
  return d(), _("div", Do, [
    B("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, Uo)
  ]);
}
const Lo = /* @__PURE__ */ $(Io, [["render", Po]]);
const qo = {
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
}, we = (e) => (Be("data-v-fe069681"), e = e(), Re(), e), Xo = { class: "mask" }, zo = {
  key: 0,
  class: "el-upload__text"
}, Wo = /* @__PURE__ */ we(() => /* @__PURE__ */ B("em", null, "点击上传", -1)), Ho = /* @__PURE__ */ we(() => /* @__PURE__ */ B("br", null, null, -1)), Jo = /* @__PURE__ */ we(() => /* @__PURE__ */ B("br", null, null, -1)), Ko = {
  key: 0,
  class: "path"
};
function Yo(e, t, s, i, n, o) {
  const l = c("pc-x-icon"), a = c("el-button"), r = c("el-upload");
  return d(), f(r, b({
    "file-list": n.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (u) => n.fileList = u),
    drag: "",
    disabled: n.disabled,
    action: o.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": o.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: h(() => [
      B("div", Xo, [
        p(l, { name: "upload-filled" }),
        n.disabled ? w("", !0) : (d(), _("div", zo, [
          V(" 将文件拖到此处，或"),
          Wo,
          Ho,
          Jo,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: J(o.handleUploadAll, ["stop"])
          }, {
            default: h(() => [
              V(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : w("", !0)
        ]))
      ]),
      o.filepath ? (d(), _("div", Ko, O(s.modelValue), 1)) : w("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Go = /* @__PURE__ */ $(qo, [["render", Yo], ["__scopeId", "data-v-fe069681"]]);
const Qo = {
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
}, Zo = ["src"];
function el(e, t, s, i, n, o) {
  const l = c("Plus"), a = c("el-icon"), r = c("el-upload"), u = c("el-dialog");
  return d(), _(M, null, [
    p(r, b({
      "file-list": s.modelValue,
      "onUpdate:fileList": t[0] || (t[0] = (m) => e.$emit("update:modelValue", m)),
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: o.limit,
      class: ["x-image-uploader", { disabled: e.$attrs.disabled || o.images.length >= o.limit }],
      "on-preview": o.handlePreview,
      "on-exceed": o.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1
    }), {
      default: h(() => [
        p(a, null, {
          default: h(() => [
            p(l)
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
        B("img", {
          src: n.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, Zo)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const tl = /* @__PURE__ */ $(Qo, [["render", el], ["__scopeId", "data-v-821cec65"]]), ue = {
  xactionsheet: xt,
  xautorows: jt,
  mobilexbutton: Tt,
  pcxbutton: Nt,
  xchart: Pt,
  mobilexcheckboxs: Xt,
  pcxcheckboxs: Ht,
  mobilexcol: Yt,
  pcxcol: Zt,
  mobilexdialog: ss,
  pcxdialog: ls,
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
  pcxscan: _i,
  mobilexselect: $i,
  pcxselect: Ai,
  mobilextable: Wi,
  pcxtable: io,
  mobilextabletools: ho,
  pcxtabletools: bo,
  xtablev2: Mo,
  xtableviewer: No,
  xtinymce: Lo,
  xfileuploader: Go,
  ximageuploader: tl
}, te = {};
for (let e in ue)
  te[ue[e].name] = ue[e];
const sl = (e) => ({
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
  const e = Object.keys(te), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = te[i]);
  for (const i of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(i.toLowerCase())) ? s[i] = sl(i) : s[i] = te[i];
  return s;
})(), nl = (e, t) => {
  for (let s in pe)
    e.component(s, pe[s]);
}, ol = {
  version: "1.0.119",
  ...pe,
  ...He,
  ...$t,
  install: nl
};
export {
  Je as BaseController,
  oe as Confirm,
  Ke as CrudController,
  K as Message,
  ie as Notify,
  St as TempCrudController,
  Ue as baseDialog,
  Ie as baseForm,
  yt as baseModel,
  De as baseTable,
  $t as controllers,
  ol as default,
  lt as effects,
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
