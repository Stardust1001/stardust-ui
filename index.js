import { toRaw as et, watch as je, nextTick as ee, resolveComponent as u, openBlock as c, createBlock as p, mergeProps as _, createElementBlock as v, Fragment as j, renderList as T, withCtx as d, renderSlot as w, toDisplayString as A, useCssVars as Re, createTextVNode as $, createSlots as H, resolveDynamicComponent as G, createCommentVNode as g, createVNode as f, normalizeProps as se, guardReactiveProps as Me, normalizeClass as J, h as Y, isVNode as Te, createElementVNode as O, withModifiers as W, pushScopeId as pe, popScopeId as me, resolveDirective as ne, withDirectives as F, normalizeStyle as tt } from "vue";
const st = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const o = e.getContext("2d");
  class n {
    constructor(X, q, L, Q, Ge, Qe, Ze) {
      this.x = X, this.y = q, this.radius = L, this.color = Q, this.vx = Ge, this.vy = Qe, this.ctx = Ze;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => o.clearRect(0, 0, t, s), l = (E) => Math.floor(Math.random() * E);
  let a = 0, r = 0.01, h = 0;
  const m = () => {
    const E = o.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = x * 30), a >= 1 && (a = 1, r = -r, h = x * 30)), E.addColorStop(0, "rgba(250, 220, 20, 0.5)"), E.addColorStop(a, "rgba(20, 20, 20, 0.5)"), o.fillStyle = E, o.fillRect(0, 0, t, s);
  }, S = Math.floor(t / 100), y = Math.floor(s / 100), x = 20, M = Math.round(1e3 / x), D = Array.from({ length: 52 }).map(() => {
    const E = Math.floor(l(S + y) * 1.5 + l(5));
    let X = l(t), q = l(s);
    X = Math.min(Math.max(E, X), t - E), q = Math.min(Math.max(E, q), s - E);
    let L = l(2) ? (l(2) + 2) * S : (l(-1) - 2) * S, Q = l(2) ? (l(2) + 2) * y : (l(-1) - 2) * y;
    return L = Math.floor(L / x), Q = Math.floor(Q / x), new n(
      X,
      q,
      E,
      `rgba(${l(256)}, ${l(256)}, ${l(256)}, ${(l(5) + 5) / 10})`,
      L,
      Q,
      o
    );
  });
  let R, b;
  e.addEventListener("mouseover", (E) => {
    R = E.pageX, b = E.pageY;
  }), e.addEventListener("mousemove", (E) => {
    if (R === void 0) {
      R = E.pageX, b = E.pageY;
      return;
    }
    const X = E.pageX - R, q = E.pageY - b;
    D.forEach((L) => {
      L.x += X / x, L.y += q / x;
    }), R = E.pageX, b = E.pageY;
  });
  let V = Date.now(), C = null;
  const N = () => {
    Date.now() - V >= M && (i(), m(), D.forEach((E) => E.update()), V = Date.now()), C = requestAnimationFrame(N);
  };
  return C = requestAnimationFrame(N), () => cancelAnimationFrame(C);
}, nt = ({
  text: e,
  gap: t,
  fontSize: s,
  color: o,
  width: n = window.innerWidth,
  height: i = window.innerHeight,
  drawMode: l = "fill"
}) => {
  const a = document.createElement("canvas");
  a.width = n, a.height = i;
  const r = a.getContext("2d");
  r.font = `${s}px Arial`, r[l + "Style"] = o;
  const m = r.measureText(e).width + t, S = s + t;
  for (let y = t / 2; y < i; y += S)
    for (let x = t / 2; x < n; x += m)
      r[l + "Text"](e, x, y);
  return a;
}, ot = {
  pop: st,
  createWatermark: nt
}, it = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, P = (e, t) => {
  const s = e.__v_isRef ? e.value : et(e);
  let o = s;
  if (typeof s[0] != "object" && (o = s.map((i) => ({ text: i, value: i }))), !t.sort)
    return o;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return o.sort((i, l) => i[n].localeCompare(l[n]));
}, { ElMessage: lt, ElNotification: at, ElMessageBox: rt } = window.ElementPlus || {}, { showToast: ct, showNotify: dt, showConfirmDialog: ut } = window.vant || {}, Fe = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: o } = t;
  s ? ((o === "error" || o === "warning") && (t.type = "fail"), ct(t)) : lt({
    showClose: !0,
    ...t
  });
}, ht = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: o } = t;
  s ? (o === "error" && (t.type = "danger"), dt(t)) : at({
    showClose: !0,
    ...t
  });
}, pt = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = ut(e) : t = rt.confirm(
    e.message || "",
    e.title || "",
    {
      draggable: !0,
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: e.type || "info"
    }
  ), t.then(() => !0).catch(() => !1);
}, mt = (e, t) => {
  e.beforeEach((s, o, n) => {
    s.matched.length ? n() : n("/404");
  });
}, ft = (e, t) => {
  e.afterEach((s, o) => {
    const n = s.matched.map((i) => i.meta.title);
    document.title = [t.app.sitename, ...n].filter((i) => i).reverse().join("-");
  });
}, _t = (e, t) => {
  e.beforeEach((s, o, n) => {
    !s.meta.roles || s.meta.roles.some((l) => t.getters.userRoles.includes(l)) ? n() : n("/");
  });
}, bt = (e, t) => {
  e.beforeEach((s, o, n) => {
    s.name === "Login" && t.getters.logined && s.query.redirectTo ? n(s.query.redirectTo) : n();
  });
}, gt = {
  check404: mt,
  setTitle: ft,
  checkRolesPages: _t,
  redirectTo: bt
}, Be = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), Ne = (e = {}) => ({
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
}), De = () => ({
  ...Be(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), yt = () => ({
  table: Ne(),
  dialog: De()
}), { funcs: de } = StardustJs, vt = (e, t) => {
  for (let s in e) {
    const o = e[s];
    !o || typeof o != "object" || (s === "table" && e[s]._isBaseTable && Ie(o, t), s === "dialog" && e[s]._isBaseDialog && Ue(o, t), s === "form" && e[s]._isBaseForm && fe(o, t));
  }
  return e;
}, Ie = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), Ue = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), fe(e, t), e), fe = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((o) => o.visible !== !1)), Le(e.form, e.formItems), e.initialForm = de.deepCopy(e.form), e.initialFormRules = de.deepCopy(e.formRules), je(() => e.formItems, () => {
  Pe(e);
}, { immediate: !0, deep: !0 }), e), Pe = (e) => {
  const { formItems: t, initialFormRules: s } = e, o = t.filter((i) => {
    let { formAttrs: l = {}, required: a = !1 } = i;
    return a = "required" in l ? l.required : a, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && a !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, de.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !o.length)
    return;
  const n = {};
  return o.forEach((i) => {
    if (e.formRules[i])
      return;
    const l = t.find((x) => x.prop === i), a = l.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = Xe[a], h = [], y = { required: !0, message: `请${"options" in l ? "选择" : "输入"}${(l == null ? void 0 : l.label) || i}` };
    l.validator && (y.validator = l.validator), l.asyncValidator && (y.asyncValidator = l.asyncValidator), l.comp ? h.push({ ...y, trigger: r.change }) : h.push({ ...y, trigger: r.blur }), l.comp === "ElInputNumber" && h.push({ ...y, trigger: r.blur }), n[i] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, Le = (e, t, s = !0) => {
  const o = {};
  return t.forEach((n) => {
    var h;
    let i = "";
    const { type: l, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && l === "number" || n.comp === "ElInputNumber")
      i = 0;
    else if (n.comp === "ElSwitch")
      i = !1;
    else if (a && ((h = n.comp) != null && h.endsWith("XCheckboxs") || r))
      i = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const m = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + m), n["end-placeholder"] || (n["end-placeholder"] = "结束" + m), i = [];
    }
    o[n.prop] = i;
  }), Object.assign(e, { ...o, ...e }), e;
}, Xe = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, qe = {
  effects: ot,
  formatPrecision: it,
  formatOptions: P,
  Message: Fe,
  Notify: ht,
  Confirm: pt,
  middlewares: gt,
  baseForm: Be,
  baseTable: Ne,
  baseDialog: De,
  baseModel: yt,
  initModel: vt,
  initTable: Ie,
  initDialog: Ue,
  initForm: fe,
  initFormRules: Pe,
  initDefaultForm: Le,
  triggers: Xe
};
class ze {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const o = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: {
          get: () => s
        },
        vm: {
          get: () => o
        }
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
    return qe;
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
  _bindMethods() {
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.keys(Object.getOwnPropertyDescriptors(this.__proto__)).filter((i) => i !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...s])).filter((i) => typeof this[i] == "function").forEach((i) => {
      this[i] = this[i].bind(this);
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
const { funcs: ie, highdict: we, dates: le } = StardustJs, { file: Se, excel: Z } = StardustBrowser;
class We extends ze {
  constructor(t) {
    super(t);
    const { model: s, table: o, dialog: n, dbModelName: i = "", idField: l = "id", listProp: a = "data" } = t;
    this.table = o || (s == null ? void 0 : s.table) || null, this.dialog = n || (s == null ? void 0 : s.dialog) || null, this.dbModelName = i, this.idField = l, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], ee(() => {
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
      "afterSearch",
      "afterDelete",
      "afterSubmit",
      "_defaultFormatList",
      "_fillRelatedField",
      "formatList",
      "processExportingHeader",
      "processExportingData",
      "processImportingData",
      "_resetForm",
      "_trimForm",
      "_validateForm",
      "_checkAllNone",
      "_showError"
    ];
  }
  async handleSearch(t) {
    t = this.getSearchParams(t), this.table.loading = !0;
    const s = await this.search(t);
    let o = we.get(s, this.listProp);
    return o = this.formatList(this._defaultFormatList(o, s), s), Object.assign(this.table, {
      list: o,
      total: s.total,
      loading: !1
    }), this.afterSearch(o, t, s), s;
  }
  async handleAdd() {
    this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await ee(), await ie.sleep(50);
    const t = this.dialog.formRef;
    t && (this._isMobile ? t.resetValidation() : t.clearValidate());
  }
  async handleEdit({ $index: t, row: s }) {
    var o;
    this.table.isRowEdit ? (s.originData = JSON.stringify(s), s.isEditing = !0) : (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !0,
      editingIndex: t,
      editingRow: s,
      form: {
        ...this.dialog.form,
        ...s
      }
    }), await ee(), (o = this.dialog.formRef) == null || o.validate().catch(Function()));
  }
  async handleDelete({ row: t }) {
    if (await this.uiUtils.Confirm({
      message: "确定要删除吗？",
      title: "警告",
      type: "warning"
    })) {
      const o = this.getDeleteParams(t), n = await this.remove(o, t);
      n.err || (this.afterDelete(n), this.handleSearch());
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
    } catch (o) {
      this._showError(o.data.err), t._loading = !1;
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
    const { list: o, selection: n, columns: i } = this.table;
    let l = i;
    l = l.filter((S) => S.type !== "selection");
    let a = n.length > 0 ? n : o;
    if (a = ie.deepCopy(a), a = this.processExportingData(a), a.length) {
      const S = Object.keys(a[0]);
      l = l.filter((y) => S.includes(y.prop));
    }
    const r = l.map((S) => S.prop), h = this.processExportingHeader(l.map((S) => S.label));
    a = a.map((S) => r.map((y) => S[y]));
    let m = null;
    t === "csv" ? m = Z.export2Csv : m = Z.export2Excel, m({ header: h, data: a, filename: s }), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      this.uiUtils.Message({ type: "error", message: "不支持的导出类型" });
      return;
    }
    this._isExporting = !0;
    const o = await this.dbTable.search(this.getSearchExportParams()), n = this.processExportingHeader(o.data.length && Object.keys(o.data[0]) || [], "search");
    let i = o.data.map((a) => Object.values(a));
    i = ie.deepCopy(i), i = this.processExportingData(i, "search");
    let l = null;
    t === "csv" ? l = Z.export2Csv : l = Z.export2Excel, l({ header: n, data: i, filename: s }), this._isExporting = !1;
  }
  async handleImport() {
    const t = await Se.select(".xls,.xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), o = await Se.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      n = window.Papa.parse(o, { header: !0 }).data;
    else {
      const i = window.XLSX.read(o, {});
      n = XLSX.utils.sheet_to_json(i.Sheets.SheetJS);
    }
    if (n.length > 0) {
      const i = {};
      this.table.columns.forEach((a) => i[a.label] = a.prop);
      const l = Object.keys(n[0]);
      n = n.map((a) => {
        const r = {};
        return l.forEach((h) => r[i[h]] = a[h]), r;
      });
    }
    n = this.processImportingData(n), await this.dbTable.func(["bulkCreate", n]), this.uiUtils.Message({ type: "success", message: "导入成功" }), this.handleSearch();
  }
  handleMultiEdit() {
    const { selection: t, checked: s } = this.table, o = s || t[0];
    if (!o) {
      this.uiUtils.Message({ type: "warning", message: "尚未选择要编辑的数据" });
      return;
    }
    if (!s && t.length > 1) {
      this.uiUtils.Message({ type: "warning", message: "请仅选择一条数据进行编辑" });
      return;
    }
    this.handleEdit({ $index: o._idx, row: o });
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
    const o = t.map((n) => n[this.idField]);
    await this.dbTable.func(["destroy", {
      where: {
        [this.idField]: {
          "[Op.in]": o
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
    const o = this.getAddParams(t);
    if (!await this._checkAllNone(o)) {
      this._isSubmitting = !1;
      return;
    }
    let n = null;
    try {
      t[this.idField] ? n = await this.update(o, t[this.idField]) : n = await this.add(o);
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
    let o = null;
    try {
      if (this.dialog.isEditing) {
        const n = this.getUpdateParams(s);
        if (!await this._checkAllNone(n))
          return this._isSubmitting = !1, !1;
        o = await this.update(n, this.dialog.editingRow[this.idField]);
      } else {
        const n = this.getAddParams(s);
        if (!await this._checkAllNone(n))
          return this._isSubmitting = !1, !1;
        o = await this.add(n);
      }
    } catch (n) {
      return this._showError(n.data.err), this._isSubmitting = !1, !1;
    }
    return this.dialog.visible = !1, this._isSubmitting = !1, o.err || this.handleSearch(), this.afterSubmit(o), o;
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
    const s = Object.keys(this.dialog.initialForm), o = {};
    return s.length ? s.forEach((n) => o[n] = t[n]) : Object.assign(o, t), this.dialog.formItems.forEach((n) => {
      let i = o[n.model];
      n.type === "number" ? i = this.uiUtils.formatPrecision(i, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? i = le.format(i) : (!n.type || n.type === "date") && (i = le.format(i, "", !1))), o[n.model] = i;
    }), o;
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
    return Object.assign({}, this.getSearchParams(), { page: 1, limit: -1 });
  }
  afterSearch(t, s, o) {
    const n = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && n !== this._lastSearchParams) {
      const { page: i, limit: l, order: a, count: r, ...h } = s;
      this.dbTable.func(["count", h]).then((m) => this.table.total = m.data);
    }
    return t;
  }
  afterDelete(t) {
    return t;
  }
  afterSubmit(t) {
    return t;
  }
  _defaultFormatList(t, s) {
    const { columns: o, query: n } = this.table, { page: i, limit: l } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (i - 1) * l + r + 1;
    }), o.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: m, formatter: S, autoFill: y } = a.tableAttrs || {}, { modelName: x } = a.formAttrs || {};
      if (x && y)
        t.forEach((M) => M[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && m !== !1) {
        const D = je(() => a.options, (R, b) => {
          const V = b ? this.table.list : t, C = wt(a);
          V.forEach((N) => {
            const E = N[r];
            N[`_formatted_${r}`] = C[E] || (S == null ? void 0 : S(E)) || E;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(D);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const o = [...new Set(t.map((h) => h[s.prop]))];
    if (!o.length)
      return;
    const { modelName: n, text: i, value: l } = s.formAttrs, a = await this.service.restful.search(n, {
      limit: -1,
      attributes: [i, l],
      where: {
        [l]: {
          "[Op.in]": o
        }
      }
    });
    if (!a.data.length)
      return;
    const r = we.mapField(a.data, l, i);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = r[h[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingHeader(t, s = "current") {
    return s === "search" ? t.map((o) => {
      const n = this.table.columns.find((i) => i.prop === o);
      return n ? n.label : o;
    }) : t;
  }
  processExportingData(t, s = "current") {
    if (!t.length)
      return t;
    const o = Object.keys(t[0]);
    return t.forEach((n) => {
      o.forEach((i) => {
        const l = n[i];
        typeof l == "boolean" ? n[i] = l && 1 || 0 : l instanceof Date ? (n[i] = le.format(l), n[i].endsWith(" 00:00:00") && (n[i] = n[i].slice(0, -9))) : typeof l == "object" && (n[i] = JSON.stringify(l));
      });
    }), t;
  }
  processImportingData(t) {
    return t.forEach((s) => {
      delete s[this.idField], delete s._index;
    }), t;
  }
  _resetForm() {
    this.dialog.form = JSON.parse(JSON.stringify(this.dialog.initialForm));
  }
  _trimForm() {
    const { form: t } = this.dialog, s = {};
    Object.keys(t).forEach((o) => {
      t[o] == null ? s[o] = "" : t[o].trim && (s[o] = t[o].trim());
    }), Object.assign(t, s);
  }
  _validateForm(t) {
    const s = t || this.dialog.formRef;
    return s ? new Promise((o) => {
      this._isMobile ? s.validate().then(() => o(!0)).catch(() => o(!1)) : s.validate((n) => o(n)).catch(() => o(!1));
    }) : !0;
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
    var s, o;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((o = this.dialog) == null ? void 0 : o.formRef);
    return t ? t.$.attrs.class.indexOf("mobile") >= 0 : window.isMobile;
  }
}
const wt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: o = "text", value: n = "value" } = s, i = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((l) => {
    i[l[n]] = l[o];
  }), i;
};
class St extends We {
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
    this.table.list = t.filter((o) => !s.includes(o));
  }
}
const kt = {
  BaseController: ze,
  CrudController: We,
  TempCrudController: St
}, k = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, n] of t)
    s[o] = n;
  return s;
}, $t = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Ct(e, t, s, o, n, i) {
  const l = u("van-action-sheet");
  return c(), p(l, _(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const xt = /* @__PURE__ */ k($t, [["render", Ct]]), Et = {
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
      return this.cols.forEach((o) => {
        const n = o.span || this.span;
        t.push(o), s += n, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, Vt = { class: "x-auto-rows" }, At = { key: 1 };
function Ot(e, t, s, o, n, i) {
  const l = u("XCol"), a = u("XRow");
  return c(), v("div", Vt, [
    (c(!0), v(j, null, T(i.rows, (r, h) => (c(), p(a, _({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: d(() => [
        (c(!0), v(j, null, T(r, (m, S) => (c(), p(l, _(m, {
          span: m.span || s.span,
          key: S,
          platform: e.$attrs.platform
        }), {
          default: d(() => [
            m.slot || e.$attrs.slot ? w(e.$slots, m.slot || e.$attrs.slot, {
              key: 0,
              col: m
            }) : (c(), v("span", At, A(m.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const jt = /* @__PURE__ */ k(Et, [["render", Ot]]), Rt = {
  name: "MobileXButton"
};
function Mt(e, t, s, o, n, i) {
  const l = u("van-button");
  return c(), p(l, null, {
    default: d(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  });
}
const Tt = /* @__PURE__ */ k(Rt, [["render", Mt]]), Ft = {
  name: "PcXButton"
};
function Bt(e, t, s, o, n, i) {
  const l = u("el-button");
  return c(), p(l, null, {
    default: d(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  });
}
const Nt = /* @__PURE__ */ k(Ft, [["render", Bt]]);
const { funcs: Dt } = StardustBrowser, _e = {
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
      return Dt.calcPixel(this.height) * this.zoom + "px";
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
}, ke = () => {
  Re((e) => ({
    "127c024a": e.zoomedHeight,
    "137ee0b8": e.zoom
  }));
}, $e = _e.setup;
_e.setup = $e ? (e, t) => (ke(), $e(e, t)) : ke;
const It = {
  class: "x-chart",
  ref: "el"
};
function Ut(e, t, s, o, n, i) {
  return c(), v("div", It, null, 512);
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
        rules: o,
        required: n,
        ...i
      } = this.$attrs;
      return i;
    }
  },
  methods: {
    formatOptions: P
  }
};
function Xt(e, t, s, o, n, i) {
  const l = u("van-checkbox"), a = u("van-checkbox-group");
  return c(), p(a, _({ class: "mobile-x-checkboxs" }, i.attrs, { direction: s.direction }), {
    default: d(() => [
      (c(!0), v(j, null, T(i.formatOptions(s.options, this), (r) => (c(), p(l, _(i.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: d(() => [
          $(A(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const qt = /* @__PURE__ */ k(Lt, [["render", Xt]]), zt = {
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
        ...o
      } = this.$attrs;
      return o;
    }
  },
  methods: {
    formatOptions: P
  }
};
function Wt(e, t, s, o, n, i) {
  const l = u("el-checkbox"), a = u("el-checkbox-group");
  return c(), p(a, _({ class: "pc-x-checkboxs" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r))
  }), {
    default: d(() => [
      (c(!0), v(j, null, T(i.formatOptions(s.options, this), (r) => (c(), p(l, _(i.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: d(() => [
          $(A(r[s.text]), 1)
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
function Kt(e, t, s, o, n, i) {
  const l = u("van-col");
  return c(), p(l, _(i.attrs, { class: "mobile-x-col" }), {
    default: d(() => [
      w(e.$slots, "default")
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
function Qt(e, t, s, o, n, i) {
  const l = u("el-col");
  return c(), p(l, _(i.attrs, { class: "pc-x-col" }), {
    default: d(() => [
      w(e.$slots, "default")
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
function ts(e, t, s, o, n, i) {
  const l = u("van-dialog");
  return c(), p(l, _({ width: "92%" }, e.$attrs, {
    show: i.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => i.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: t[1] || (t[1] = (a) => e.$emit("submit")),
    onCancel: t[2] || (t[2] = (a) => e.$emit("cancel"))
  }), H({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: d(() => [
        w(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: d(() => [
        w(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: d(() => [
        w(e.$slots, "default")
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
}, os = {
  key: 1,
  class: "el-dialog__title"
};
function is(e, t, s, o, n, i) {
  const l = u("x-icon"), a = u("el-button");
  return c(), p(G(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: d(() => [
      e.$slots.header ? w(e.$slots, "header", { key: 0 }) : (c(), v("span", os, A(e.$attrs.title), 1)),
      s.drawer ? g("", !0) : (c(), p(l, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: d(() => [
      e.$slots.footer ? w(e.$slots, "footer", { key: 0 }) : g("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (c(), p(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: d(() => [
          $(A(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : g("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (c(), p(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: d(() => [
          $(A(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : g("", !0)
    ]),
    default: d(() => [
      e.$slots.default ? w(e.$slots, "default", { key: 0 }) : g("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const ls = /* @__PURE__ */ k(ns, [["render", is]]), I = {}, z = {
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
      provinces: Object.freeze(z.provinces),
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
      this.cities = Object.freeze(z.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(z.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(I, this.areaList), z.provinces = Object.entries(I.province_list).map((e) => ({ value: e[0], text: e[1] })), z.cities = Object.entries(I.city_list).map((e) => ({ value: e[0], text: e[1] })), z.counties = Object.entries(I.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(z.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const o = Object.entries(I.province_list).find((n) => n[1] === e);
        this.province = o == null ? void 0 : o[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const o = Object.entries(I.city_list).find((n) => n[1] === t);
        this.city = o == null ? void 0 : o[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const o = Object.entries(I.county_list).find((n) => n[1] === s);
        this.county = o == null ? void 0 : o[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && I.province_list[this.province] || "",
        this.number > 1 && this.city && I.city_list[this.city] || "",
        this.number > 2 && this.county && I.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function rs(e, t, s, o, n, i) {
  const l = u("x-select"), a = u("x-col"), r = u("x-row");
  return c(), p(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: d(() => [
      f(a, { span: i.span }, {
        default: d(() => [
          f(l, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => n.province = h),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      i.number > 1 ? (c(), p(a, {
        key: 0,
        span: i.span
      }, {
        default: d(() => [
          f(l, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => n.city = h),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : g("", !0),
      i.number > 2 ? (c(), p(a, {
        key: 1,
        span: i.span
      }, {
        default: d(() => [
          f(l, {
            modelValue: n.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => n.county = h),
            options: n.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : g("", !0)
    ]),
    _: 1
  });
}
const cs = /* @__PURE__ */ k(as, [["render", rs]]);
function ds() {
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
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function ms(e) {
  var o;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((o = e.label) == null ? void 0 : o.trim()) || e._label || e.text || e.model || ""), t;
}
function fs(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function _s(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const K = {
  props: ds,
  computed: {
    _model: us,
    _items: hs,
    _rules: ps
  },
  methods: {
    calcPlaceholder: ms,
    calcStyle: fs,
    formatModelValue: _s
  }
}, bs = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...K.props()
  },
  emits: ["update:fref"],
  computed: {
    ...K.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...K.methods
  }
};
function gs(e, t, s, o, n, i) {
  const l = u("mobile-x-form-item"), a = u("van-cell-group"), r = u("van-form");
  return c(), p(r, {
    ref: "formRef",
    class: "mobile-x-form"
  }, {
    default: d(() => [
      e.$slots.pre ? w(e.$slots, "pre", { key: 0 }) : g("", !0),
      f(a, se(Me(e.$attrs)), {
        default: d(() => [
          (c(!0), v(j, null, T(e._items, (h, m) => (c(), p(l, _(h, {
            rules: e._rules[h.prop] || h.rules,
            key: m,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (S) => e._model[h.prop] = S,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: d(() => [
              h.slot ? w(e.$slots, h.slot, se(_({ key: 0 }, h))) : g("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? w(e.$slots, "default", { key: 1 }) : g("", !0)
    ]),
    _: 3
  }, 512);
}
const ys = /* @__PURE__ */ k(bs, [["render", gs]]), vs = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...K.props(),
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
    ...K.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...K.methods
  }
}, ws = { key: 1 };
function Ss(e, t, s, o, n, i) {
  const l = u("pc-x-form-item"), a = u("el-form"), r = u("el-collapse-item"), h = u("el-collapse");
  return c(), p(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: J((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: d(() => [
      f(r, {
        name: n.activeNames[0]
      }, {
        title: d(() => [
          e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (c(), v("span", ws, A(s.title), 1))
        ]),
        default: d(() => [
          f(a, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: d(() => [
              e.$slots.pre ? w(e.$slots, "pre", { key: 0 }) : g("", !0),
              (c(!0), v(j, null, T(e._items, (m, S) => (c(), p(l, _(m, {
                key: S,
                modelValue: e._model[m.prop],
                "onUpdate:modelValue": [(y) => e._model[m.prop] = y, (y) => m.onChange || null],
                "label-width": s.labelWidth,
                prop: m.prop || m.model,
                clearable: m.clearable !== !1,
                placeholder: e.calcPlaceholder(m),
                style: e.calcStyle(m),
                "show-tooltip": e.$attrs.showTooltip || !1
              }), {
                default: d(() => [
                  m.slot ? w(e.$slots, m.slot, { key: 0 }) : g("", !0)
                ]),
                _: 2
              }, 1040, ["modelValue", "onUpdate:modelValue", "label-width", "prop", "clearable", "placeholder", "style", "show-tooltip"]))), 128)),
              e.$slots.default ? w(e.$slots, "default", { key: 1 }) : g("", !0)
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
const ks = /* @__PURE__ */ k(vs, [["render", Ss]]);
function Ce(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Te(e);
}
const ue = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: o,
    $emit: n
  } = e;
  let {
    comp: i,
    compType: l,
    html: a,
    text: r
  } = t;
  const h = {
    ...o,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  }, m = [];
  return l === "html" ? h.class = "comp-html" : i = u(i), a && (h.innerHTML = a), r && m.push(r), Y(i, h, {
    default: () => m
  });
}, $s = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: o,
    $emit: n,
    $slots: i
  } = e, {
    slot: l,
    showTooltip: a,
    placeholder: r
  } = t;
  if (l && !s.label)
    return i.default();
  let h = null;
  if (l)
    h = i.default();
  else if (a) {
    let m;
    h = f(u("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Ce(m = ue(e)) ? m : {
      default: () => [m]
    });
  } else
    h = ue(e);
  return f(u("el-form-item"), null, Ce(h) ? h : {
    default: () => [h]
  });
}, Cs = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: o,
    $emit: n,
    $slots: i,
    mValue: l
  } = e, {
    slot: a,
    comp: r,
    modelValue: h
  } = t;
  if (a && !s.label)
    return i.default({
      ...t,
      ...s
    });
  const m = {
    modelValue: l,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  };
  return a && s.label || r ? Y(u("van-field"), m, {
    input: () => a && s.label ? i.default() : ue(e)
  }) : (Object.assign(m, o), Y(u("van-field"), m));
}, xs = {
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
        comp: o,
        compType: n,
        iconSize: i,
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
    return Cs(this);
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
        comp: o,
        slot: n,
        compType: i,
        span: l,
        offset: a,
        showTooltip: r,
        required: h,
        format: m,
        style: S,
        html: y,
        class: x,
        ...M
      } = { ...this.$props, ...this.$attrs };
      return M;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return $s(this);
  }
}, xe = () => {
  Re((e) => ({
    ba9709f0: e.width
  }));
}, Ee = be.setup;
be.setup = Ee ? (e, t) => (xe(), Ee(e, t)) : xe;
const Es = /* @__PURE__ */ k(be, [["__scopeId", "data-v-d2cde1e2"]]), Ve = /* @__PURE__ */ Object.assign({}), Vs = {
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
      await Promise.all(Object.keys(Ve).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], o = await Ve[t]();
        e[s] = o.default;
      })), this.icons = e;
    }
  }
}, As = ["src"];
function Os(e, t, s, o, n, i) {
  const l = u("van-icon");
  return n.icons[s.name] ? (c(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, As)) : (c(), p(l, _({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const js = /* @__PURE__ */ k(Vs, [["render", Os]]), Ae = /* @__PURE__ */ Object.assign({}), Rs = {
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
      await Promise.all(Object.keys(Ae).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], o = await Ae[t]();
        e[s] = o.default;
      })), this.icons = e;
    }
  }
}, Ms = ["src"];
function Ts(e, t, s, o, n, i) {
  const l = u("el-icon");
  return n.icons[s.name] ? (c(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Ms)) : (c(), p(l, se(_({ key: 1 }, e.$attrs)), {
    default: d(() => [
      (c(), p(G(s.name)))
    ]),
    _: 1
  }, 16));
}
const Fs = /* @__PURE__ */ k(Rs, [["render", Ts]]), { highdict: Bs } = StardustJs, { storage: Ns } = StardustBrowser, { local: He } = Ns, ge = ["index", "selection", "expand", "radio", "_index"];
function Ds() {
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
function Is() {
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
function Us() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = { ...this.$attrs };
  return t in this && Object.assign(s, this[t]), s;
}
function Ps() {
  const e = {};
  return ["search", "add", "multi-edit", "multi-delete", "export", "search-export", "import"].forEach((s) => e[s] = s), { ...e, ...this.$attrs.domids };
}
function Ls() {
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
function Xs() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function qs() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function zs() {
  const { $props: e, _query: t } = this, { table: s, columns: o } = e;
  return (o || (s == null ? void 0 : s.columns) || []).map((i) => i.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(l) {
      const { page: a, limit: r } = t;
      return (a - 1) * r + l + 1;
    }
  }, i, { type: "index" }) : i.type === "radio" ? Object.assign({ width: 60, label: "单选" }, i) : Object.assign({}, i, i.tableAttrs));
}
function Ws() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Hs() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function Js() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Ks() {
  return this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function Ys() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Gs() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function Qs() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function Zs() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function en() {
  return this.onMultiEdit || this._listen["multi-edit"] ? () => this._emit("multi-edit") : null;
}
function tn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function sn() {
  if (!this.controller)
    return {};
  let e = this.listen;
  Array.isArray(this.listen) || (e = this.listen.split(","));
  const t = {};
  return e.forEach((s) => {
    const o = "handle" + s.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[s] = this.controller[o];
  }), t;
}
function nn() {
  const e = this._columns.filter((s) => s.type && ge.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const o = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...o,
      width: s.width || o.width
    };
  });
  return e.concat(t);
}
function on() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function ln() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function an() {
  return this._columns.filter((e) => !e.type || !ge.includes(e.type));
}
function rn() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function cn() {
  const e = this._uid && He.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns = e.columns || this._columns.filter((t) => !t.type || !ge.includes(t.type)).map((t) => {
    const { prop: s, label: o, show: n, hide: i, width: l } = t;
    return { prop: s, label: o, show: n, hide: i, width: l };
  }), this.settings = e;
}
function dn(e) {
  He.setJson(`Settings[${this._uid}]`, e);
}
function un(e, t) {
  const { prop: s } = t;
  let { format: o, formatter: n } = t.tableAttrs || t;
  o = Array.isArray(t.options) ? o !== !1 : o;
  const i = e[s];
  if (i == null || i === "")
    return this.defaultValue;
  if (o || n) {
    const l = `_formatted_${s}`;
    if (l in e)
      return e[l];
    if (n)
      return typeof n == "function" ? n(i, e, t) : Bs.get(e, n);
  }
  return i;
}
function hn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function pn(e) {
  this.params = e, this._emit("search", e);
}
function mn(e) {
  this.saveSettings(e), this.initSettings();
}
function fn(e, t, s, o) {
  const n = this.settings.columns.find((i) => i.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, o);
}
function _n(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function bn(...e) {
  var t, s;
  this.onSortChange ? this.onSortChange(...e) : e[0].column.sortable === "custom" && ((s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, ...e));
}
function gn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function yn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function vn(e) {
  var o;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((o = s == null ? void 0 : s.tableAttrs) != null && o.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function wn(e) {
  var o;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((o = s == null ? void 0 : s.tableAttrs) != null && o.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function Sn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function kn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function $n(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Cn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function xn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function En(e, t) {
  const s = "on" + e.split("-").map((o) => o[0].toUpperCase() + o.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Vn() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const B = {
  props: Ds,
  emits: Is,
  computed: {
    _attrs: Us,
    domids: Ps,
    elTableAttrs: Ls,
    _loading: Xs,
    _data: qs,
    _columns: zs,
    _query: Ws,
    _total: Hs,
    _selection: Js,
    _onSearch: Ks,
    _onAdd: Ys,
    _onExport: Gs,
    _onSearchExport: Qs,
    _onImport: Zs,
    _onMultiEdit: en,
    _onMultiDelete: tn,
    _listen: sn,
    _visibleColumns: nn,
    _uid: on,
    hideOperates: ln,
    searcherColumns: an,
    searcherConfig: rn
  },
  watch: {
    $route: Vn
  },
  methods: {
    initSettings: cn,
    saveSettings: dn,
    calcValue: un,
    calcOverflowTooltip: hn,
    handleSearch: pn,
    handleResetSettings: mn,
    handleHeaderDragend: fn,
    handleSelectionChange: _n,
    handleSortChange: bn,
    handleCheckedChange: gn,
    handleToggleFullscreen: yn,
    cellClassName: vn,
    cellStyle: wn,
    canEdit: Sn,
    canSave: kn,
    canRowEdit: $n,
    canCancelEdit: Cn,
    canDelete: xn,
    _emit: En
  }
};
const An = {
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
        const { infoAttrs: s = {}, ...o } = t, n = { span: this.span, ...o, ...s }, i = n.block || "基本信息";
        let l = e[i];
        l || (e[i] = l = [], l.span = 0), l.span + n.span > 24 && l.length ? l[l.length - 1].span += 24 - l.span : l.span += n.span, l.push(n);
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
}, On = { key: 0 }, jn = { key: 1 };
function Rn(e, t, s, o, n, i) {
  const l = u("el-descriptions-item"), a = u("el-descriptions"), r = u("el-collapse-item"), h = u("el-collapse");
  return c(), p(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: J(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: d(() => [
      (c(!0), v(j, null, T(i.blocks, (m, S) => (c(), p(r, {
        key: S,
        title: S,
        name: S
      }, {
        default: d(() => [
          f(a, {
            column: s.column,
            border: s.border
          }, {
            default: d(() => [
              (c(!0), v(j, null, T(m, (y) => (c(), p(l, _({
                key: y.prop
              }, y), H({
                default: d(() => [
                  y.slot ? (c(), v("span", On, [
                    w(e.$slots, y.slot, se(Me({ data: s.data, field: y, value: i.calcValue(s.data, y) })), void 0, !0)
                  ])) : (c(), v("span", jn, A(i.calcValue(s.data, y)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: d(() => [
                    w(e.$slots, "label", {
                      label: y.label
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
const Mn = /* @__PURE__ */ k(An, [["render", Rn], ["__scopeId", "data-v-0c3b67a5"]]), Tn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Fn = { key: 1 };
function Bn(e, t, s, o, n, i) {
  return c(), v("div", null, [
    (c(!0), v(j, null, T(s.items, (l, a) => (c(), p(G(s.compName), _({ key: a }, l), {
      default: d(() => [
        l.slot || e.$attrs.slot ? w(e.$slots, "default", {
          key: 0,
          item: l
        }) : (c(), v("span", Fn, A(l.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Nn = /* @__PURE__ */ k(Tn, [["render", Bn]]), Dn = {
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
function In(e, t, s, o, n, i) {
  const l = u("van-icon"), a = u("van-pagination");
  return c(), p(a, _({ ...e.$attrs, ...e.mobilePagination || {} }, {
    modelValue: s.query.page,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => s.query.page = r),
    "items-per-page": s.query.limit,
    "page-count": i.pageCount,
    "total-items": s.total
  }), {
    "prev-text": d(() => [
      f(l, { name: "arrow-left" })
    ]),
    "next-text": d(() => [
      f(l, { name: "arrow" })
    ]),
    page: d(({ text: r }) => [
      $(A(r), 1)
    ]),
    _: 1
  }, 16, ["modelValue", "items-per-page", "page-count", "total-items"]);
}
const Un = /* @__PURE__ */ k(Dn, [["render", In]]), Pn = {
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
function Ln(e, t, s, o, n, i) {
  const l = u("el-pagination");
  return c(), p(l, _({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": s.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => s.query.page = a),
    "page-size": s.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => s.query.limit = a),
    "page-count": i.pageCount,
    total: s.total
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const Xn = /* @__PURE__ */ k(Pn, [["render", Ln]]), qn = {
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
function zn(e, t, s, o, n, i) {
  const l = u("van-picker"), a = u("van-popup");
  return c(), v(j, null, [
    O("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: J(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, A(s.modelValue || s.placeholder), 3),
    f(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: d(() => [
        f(l, _(e.$attrs, {
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
const Wn = /* @__PURE__ */ k(qn, [["render", zn]]), Hn = {
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
function Jn(e, t, s, o, n, i) {
  const l = u("van-radio"), a = u("van-radio-group");
  return c(), p(a, _({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: d(() => [
      (c(!0), v(j, null, T(i.formatOptions(s.options, this), (r) => (c(), p(l, _(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: d(() => [
          $(A(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Kn = /* @__PURE__ */ k(Hn, [["render", Jn]]), Yn = {
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
        ...o
      } = this.$attrs;
      return o;
    }
  },
  methods: {
    formatOptions: P
  }
};
function Gn(e, t, s, o, n, i) {
  const l = u("el-radio-group");
  return c(), p(l, _({ class: "pc-x-radios" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a))
  }), {
    default: d(() => [
      (c(!0), v(j, null, T(i.formatOptions(s.options, this), (a) => (c(), p(G(s.button ? "el-radio-button" : "el-radio"), _(i.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: d(() => [
          $(A(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const Qn = /* @__PURE__ */ k(Yn, [["render", Gn]]), Zn = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, eo = { key: 1 };
function to(e, t, s, o, n, i) {
  const l = u("MobileXCol"), a = u("van-row");
  return c(), p(a, { class: "mobile-x-row" }, {
    default: d(() => [
      (c(!0), v(j, null, T(s.cols, (r, h) => (c(), p(l, _(r, { key: h }), {
        default: d(() => [
          r.slot || e.$attrs.slot ? w(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (c(), v("span", eo, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? w(e.$slots, "default", { key: 0 }) : g("", !0)
    ]),
    _: 3
  });
}
const so = /* @__PURE__ */ k(Zn, [["render", to]]), no = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, oo = { key: 1 };
function io(e, t, s, o, n, i) {
  const l = u("pc-x-col"), a = u("el-row");
  return c(), p(a, { class: "pc-x-row" }, {
    default: d(() => [
      (c(!0), v(j, null, T(s.cols, (r, h) => (c(), p(l, _(r, { key: h }), {
        default: d(() => [
          r.slot || e.$attrs.slot ? w(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (c(), v("span", oo, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? w(e.$slots, "default", { key: 0 }) : g("", !0)
    ]),
    _: 3
  });
}
const lo = /* @__PURE__ */ k(no, [["render", io]]), Je = async (e, t, s) => {
  s.loading = !0;
  const o = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: l, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...l || [], n, i])], a.limit = a.limit || 20, o && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${o}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, ao = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((o) => e[o])[0], ro = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((o) => e[o]).slice(1).join(" - ") + ")", co = {
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
      Je(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function uo(e, t, s, o, n, i) {
  const l = u("XPicker");
  return c(), v("div", {
    onClick: t[5] || (t[5] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    f(l, _(e.$attrs, {
      modelValue: i.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: n.visible,
      columns: n._options,
      onClick: t[1] || (t[1] = W(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => n.visible = !0),
      onCancel: t[3] || (t[3] = (a) => n.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => n.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const ho = /* @__PURE__ */ k(co, [["render", uo]]);
const po = {
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
      Je(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return ao(e, this);
    },
    calcRemarkLabel(e) {
      return ro(e, this);
    }
  }
}, mo = { key: 1 }, fo = { class: "main" }, _o = { class: "remark" };
function bo(e, t, s, o, n, i) {
  const l = u("el-option"), a = u("el-select");
  return c(), p(a, _({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || i.remoteSearch
  }), {
    default: d(() => [
      (c(!0), v(j, null, T(n._options, (r) => (c(), p(l, _(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: d(() => [
          e.$slots.custom ? w(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (c(), v("span", mo, [
            O("span", fo, A(i.calcMainLabel(r)), 1),
            O("span", _o, A(i.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const go = /* @__PURE__ */ k(po, [["render", bo], ["__scopeId", "data-v-a37eab84"]]);
const yo = {
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
        e.forEach((s, o) => {
          s && t.push(this._data[o]);
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
}, vo = { class: "mobile-x-table" }, wo = {
  key: 1,
  class: "mobile-x-table card"
}, So = ["onClick"], ko = ["value", "checked"], $o = { class: "label" }, Co = { class: "value" }, xo = { class: "operates" }, Eo = ["value", "checked"], Vo = {
  key: 2,
  class: "index"
}, Ao = { class: "title" }, Oo = { class: "operates" };
function jo(e, t, s, o, n, i) {
  const l = u("x-table-tools"), a = u("van-checkbox"), r = u("van-button"), h = u("XCol"), m = u("XRow"), S = u("van-swipe-cell"), y = u("van-cell"), x = u("van-list"), M = u("x-pagination"), D = u("XInfo"), R = u("van-popup");
  return c(), v("div", vo, [
    e.hideTools !== "" && e.hideTools !== !0 ? (c(), p(l, _({ key: 0 }, e._attrs, {
      domids: e.domids,
      onAdd: e._onAdd,
      onSearch: e._onSearch,
      onExport: e._onExport,
      onSearchExport: e._onSearchExport,
      onImport: e._onImport,
      onMultiDelete: e._onMultiDelete
    }), H({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: d(() => [
          w(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: d(() => [
          w(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : g("", !0),
    (s.mode || e._attrs.mode) === "card" ? (c(), v("div", wo, [
      (c(!0), v(j, null, T(e._data, (b, V) => (c(), v("div", {
        key: V,
        class: "row",
        onClick: (C) => i.handleClickCard(V)
      }, [
        f(S, {
          onOpen: (C) => n.scope = { row: b, $index: V }
        }, {
          right: d(() => [
            O("div", xo, [
              w(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
              e.hideOperates ? g("", !0) : (c(), p(m, {
                key: 0,
                gutter: 10
              }, {
                default: d(() => [
                  f(h, { span: 12 }, {
                    default: d(() => [
                      e.canEdit(n.scope) ? (c(), p(r, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, { onClick: i.handleEdit }), {
                        default: d(() => [
                          $(" 编辑 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : g("", !0)
                    ]),
                    _: 1
                  }),
                  f(h, { span: 12 }, {
                    default: d(() => [
                      e.canDelete(n.scope) ? (c(), p(r, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"] }, { onClick: i.handleDelete }), {
                        default: d(() => [
                          $(" 删除 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : g("", !0)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })),
              w(e.$slots, "operates-suffix", { scope: n.scope }, void 0, !0)
            ])
          ]),
          default: d(() => [
            i.hasSelection ? (c(), p(a, {
              key: 0,
              modelValue: n.selected[V],
              "onUpdate:modelValue": (C) => n.selected[V] = C,
              shape: "square",
              class: "selection",
              onClick: t[0] || (t[0] = W(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : g("", !0),
            i.hasRadio ? (c(), v("input", {
              key: 1,
              type: "radio",
              value: V,
              checked: V === n.checked,
              class: "radio",
              onClick: t[1] || (t[1] = W(() => {
              }, ["stop"])),
              onChange: t[2] || (t[2] = (...C) => e.handleCheckedChange && e.handleCheckedChange(...C))
            }, null, 40, ko)) : g("", !0),
            (c(!0), v(j, null, T(i.cols, (C, N) => (c(), v("div", {
              key: N,
              class: "field"
            }, [
              O("span", $o, A(C.label) + ":", 1),
              O("span", Co, A(e.calcValue(b, C)), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1032, ["onOpen"])
      ], 8, So))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (c(), p(x, _({
      key: 2,
      class: "mobile-x-table list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (b) => e.$emit("search"))
    }), {
      default: d(() => [
        (c(!0), v(j, null, T(e._data, (b, V) => (c(), p(y, {
          key: V,
          "is-link": "",
          onClick: (C) => i.handleShowDetail(b, V)
        }, {
          default: d(() => [
            i.hasSelection ? (c(), p(a, {
              key: 0,
              modelValue: n.selected[V],
              "onUpdate:modelValue": (C) => n.selected[V] = C,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = W(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : g("", !0),
            i.hasRadio ? (c(), v("input", {
              key: 1,
              type: "radio",
              value: V,
              checked: V === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = W(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...C) => e.handleCheckedChange && e.handleCheckedChange(...C))
            }, null, 40, Eo)) : g("", !0),
            i.hasIndex ? (c(), v("span", Vo, A(V + 1), 1)) : g("", !0),
            O("span", Ao, A(i.calcTitle(b)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : g("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (c(), p(M, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (b) => e._emit("search"))
    }, null, 8, ["query", "total"])) : g("", !0),
    f(R, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (b) => n.popupVisible = b),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: d(() => [
        f(D, {
          data: n.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"]),
        O("div", Oo, [
          w(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
          e.hideOperates ? g("", !0) : (c(), p(m, {
            key: 0,
            gutter: 10
          }, {
            default: d(() => [
              f(h, { span: 12 }, {
                default: d(() => [
                  e.canEdit(n.scope) ? (c(), p(r, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"], block: !0 }, { onClick: i.handleEdit }), {
                    default: d(() => [
                      $(" 编辑 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : g("", !0)
                ]),
                _: 1
              }),
              f(h, { span: 12 }, {
                default: d(() => [
                  e.canDelete(n.scope) ? (c(), p(r, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"], block: !0 }, { onClick: i.handleDelete }), {
                    default: d(() => [
                      $(" 删除 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : g("", !0)
                ]),
                _: 1
              })
            ]),
            _: 1
          })),
          w(e.$slots, "operates-suffix", { scope: n.scope }, void 0, !0)
        ])
      ]),
      _: 3
    }, 8, ["show"])
  ]);
}
const Ro = /* @__PURE__ */ k(yo, [["render", jo], ["__scopeId", "data-v-01a3cacf"]]), Oe = {
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
}, Mo = [{
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
  value: "NOT_BLANK"
}], U = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"]
};
U["x-select"] = U.XSelect;
U["el-date-picker"] = U.ElDatePicker;
U["el-input-number"] = U.ElInputNumber;
U["el-input"] = U.ElInput;
function To() {
  const {
    columns: e,
    visible: t,
    conditions: s,
    expression: o,
    handleSearch: n,
    handleReset: i,
    handleAdd: l,
    handleDelete: a,
    handleSelectField: r,
    handleSelectOp: h
  } = this;
  return f(u("pc-x-dialog"), _({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": "查询"
  }, {
    modelValue: t,
    "onUpdate:modelValue": (m) => this.visible = m,
    onCancel: i,
    onSubmit: n
  }), {
    default: () => [f(u("el-button"), {
      type: "primary",
      icon: "plus",
      onClick: l
    }, {
      default: () => [$("新增条件")]
    }), f("div", {
      class: "conditions"
    }, [s.map((m, S) => f("div", {
      class: "condition flex-center",
      key: m.no
    }, [f(u("el-button"), {
      type: "danger",
      size: "small",
      plain: !0,
      onClick: () => a(S)
    }, {
      default: () => [$("X")]
    }), f("span", {
      class: "title"
    }, [m.no]), f("div", {
      class: "expression"
    }, [f(u("pc-x-select"), {
      modelValue: m.prop,
      onChange: (y) => r(m, y),
      options: e,
      text: "label",
      value: "prop"
    }, null), f(u("pc-x-select"), {
      modelValue: m.op,
      onChange: (y) => h(m, y),
      options: m.ops
    }, null), f("div", {
      class: "value-container"
    }, [Fo(this, m)])])]))]), f(u("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式"
    }, {
      modelValue: o,
      "onUpdate:modelValue": (m) => this.expression = m
    }), null)]
  });
}
function Fo(e, t) {
  const s = (n) => Y(u((n == null ? void 0 : n.component) || t.component), Object.assign({
    modelValue: t.value,
    "onUpdate:modelValue": (i) => t.value = i
  }, t.item, t.item.formAttrs, n)), o = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? f("div", {
    class: "col-2"
  }, [s({
    ...o,
    modelValue: t.value[0],
    "onUpdate:modelValue": (n) => t.value[0] = n
  }), s({
    ...o,
    modelValue: t.value[1],
    "onUpdate:modelValue": (n) => t.value[1] = n
  })]) : ["in", "notIn"].includes(t.op) ? (o.multiple = !0, s(o)) : t.op === "special" ? s({
    ...o,
    component: "XSelect",
    placeholder: "请选择特殊值",
    options: Mo
  }) : s();
}
const { storage: ae } = StardustBrowser, Bo = {
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
  render: To,
  methods: {
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      ae.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: s, component: o, ...n } = e;
          return n;
        }),
        expression: this.expression
      });
    },
    restoreCache() {
      var t, s;
      const e = ae.local.getJson(this.key, this.config);
      (t = e.conditions) == null || t.forEach((o) => {
        const { prop: n, op: i, value: l } = o;
        o.item = this.columns.find((a) => a.prop === n), this.handleSelectField(o, n), this.handleSelectOp(o, i), o.ops = U[o.component].map((a) => Oe[a]), o.value = l;
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((o) => o.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        Fe({ type: "warning", message: t.toString() });
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      ae.local.remove(this.key), Object.assign(this, {
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
      const t = (o, n) => {
        const i = [];
        n["[Op." + o.type + "]"] = i;
        for (let l of o.items)
          if (typeof l == "string") {
            const a = this.conditions.find((r) => r.no === l * 1);
            if (a) {
              if (!this.checkFilled(a))
                throw "条件不完整: " + l;
            } else
              throw "条件不存在: " + l;
            i.push(this.parseCondition(a));
          } else {
            const a = {};
            i.push(a), t(l, a);
          }
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((n) => n.trim()), s = (n, i) => {
        for (; i.length; ) {
          const l = i.shift();
          if (["and", "or"].includes(l)) {
            if (n.type && n.type !== l)
              throw "串联不同逻辑表达式请使用小括号区分";
            n.type = l;
          } else if (l === "(") {
            const a = { type: "", items: [] };
            n.items.push(a), a._parent = n, s(a, i);
            break;
          } else
            l === ")" ? (s(n._parent, i), delete n._parent) : n.items.push(l);
        }
      }, o = { type: "", items: [] };
      return s(o, t), o.type = o.type || "and", o;
    },
    parseCondition(e) {
      let { prop: t, op: s, value: o } = e;
      const n = {};
      if (s === "special") {
        const i = o.startsWith("NOT_");
        return o.includes("NULL") ? o = null : o.includes("BLANK") && (o = ""), i && (o = { "[Op.not]": o }), n[t] = o, n;
      }
      return (s === "like" || s === "notLike") && (o = "%" + o + "%"), n[t] = {
        [`[Op.${s}]`]: o
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
      e.value = "", e.prop = t, e.item = this.columns.find((i) => i.prop === e.prop);
      const { options: s, type: o, formAttrs: n = {} } = e.item;
      e.component = n.comp || s && "XSelect" || o === "number" && "ElInputNumber" || "ElInput", e.ops = U[e.component].map((i) => Oe[i]), e.op = e.ops[0].value, n.comp === "ElDatePicker" && (e.component = "ElInput", e.item.formAttrs.type = "date");
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, Ke = /* @__PURE__ */ k(Bo, [["__scopeId", "data-v-c77ebd79"]]);
const No = {
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
      const o = t + s;
      this.columns.splice(t, 1), this.columns.splice(o, 0, e), this.update();
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
          const { prop: t, label: s, show: o, hide: n, width: i } = e;
          return { prop: t, label: s, show: o, hide: n, width: i };
        })
      });
    }
  }
}, Do = (e) => (pe("data-v-c81e4a2f"), e = e(), me(), e), Io = { class: "table" }, Uo = ["title", "onClick"], Po = /* @__PURE__ */ Do(() => /* @__PURE__ */ O("span", { class: "unit" }, "px", -1));
function Lo(e, t, s, o, n, i) {
  const l = u("el-button"), a = u("ElCheckbox"), r = u("el-input-number"), h = u("el-tab-pane"), m = u("el-tabs"), S = u("el-popover");
  return s.visible ? (c(), p(S, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: d(() => [
      f(l, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: d(() => [
      f(m, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (y) => n.activeName = y)
      }, {
        default: d(() => [
          f(h, {
            name: "columns",
            label: "展示列"
          }, {
            default: d(() => [
              f(l, {
                type: "warning",
                icon: "Close",
                onClick: i.handleResetColumns
              }, {
                default: d(() => [
                  $("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              O("div", Io, [
                (c(!0), v(j, null, T(n.columns, (y, x) => (c(), v("div", {
                  key: x,
                  class: "row flex-center"
                }, [
                  f(l, {
                    disabled: x === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: (M) => i.handleMove(y, x, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  f(l, {
                    disabled: x === n.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: (M) => i.handleMove(y, x, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  f(a, {
                    modelValue: y.show,
                    "onUpdate:modelValue": (M) => y.show = M,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  O("span", {
                    class: "label overflow-text",
                    title: y.label,
                    onClick: (M) => i.handleToggle(y)
                  }, A(y.label), 9, Uo),
                  f(r, {
                    modelValue: y.width,
                    "onUpdate:modelValue": (M) => y.width = M,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  Po
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
  }, 16)) : g("", !0);
}
const Ye = /* @__PURE__ */ k(No, [["render", Lo], ["__scopeId", "data-v-c81e4a2f"]]);
const Xo = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...B.props()
  },
  emits: [
    ...B.emits()
  ],
  components: { Searcher: Ke, Settings: Ye },
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
}, qo = { key: 1 }, zo = ["value", "checked"], Wo = { key: 1 };
function Ho(e, t, s, o, n, i) {
  const l = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), m = u("el-table-column"), S = u("el-button"), y = u("el-table"), x = u("x-pagination"), M = u("el-collapse-item"), D = u("el-collapse"), R = ne("loading");
  return c(), v("div", {
    class: J(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    f(l, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    f(D, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (b) => n.activeNames = b),
      class: J((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: d(() => [
        f(M, {
          name: n.activeNames[0]
        }, {
          title: d(() => [
            e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (c(), v("span", qo, A(e.title), 1))
          ]),
          default: d(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (c(), p(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), H({
              "tools-end": d(() => [
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
                fn: d(() => [
                  w(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: d(() => [
                  w(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : g("", !0),
            F((c(), p(y, _({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: d(() => [
                (c(!0), v(j, null, T(e._visibleColumns, (b, V) => (c(), p(m, _(b, {
                  key: V,
                  "min-width": b.minWidth,
                  align: b.align || e._attrs.tableAlign || "center",
                  resizable: b.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(b)
                }), H({ _: 2 }, [
                  ["selection", "index"].includes(b.type) ? void 0 : {
                    name: "default",
                    fn: d((C) => [
                      b.type === "radio" ? (c(), v("input", {
                        key: 0,
                        type: "radio",
                        value: C.$index,
                        checked: C.$index === n.checked,
                        onChange: t[1] || (t[1] = (...N) => e.handleCheckedChange && e.handleCheckedChange(...N))
                      }, null, 40, zo)) : b.slot ? w(e.$slots, b.slot, {
                        key: 1,
                        scope: C,
                        column: b,
                        value: C.row[b.prop]
                      }) : e.slotAll ? w(e.$slots, "all", {
                        key: 2,
                        scope: C,
                        column: b,
                        value: C.row[b.prop]
                      }) : (c(), v(j, { key: 3 }, [
                        b.comp === "ElSwitch" || e.table.isRowEdit && C.row.isEditing && (b.visible !== !1 || b.canEdit) ? (c(), p(G(b.comp || "ElInput"), _({ key: 0 }, { ...b, ...b.formAttrs }, {
                          modelValue: C.row[b.prop],
                          "onUpdate:modelValue": (N) => C.row[b.prop] = N,
                          disabled: !C.row.editable || !C.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (c(), v("span", Wo, A(e.calcValue(C.row, b)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? g("", !0) : (c(), p(m, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: d((b) => [
                    w(e.$slots, "operates-prefix", { scope: b }),
                    e.canEdit(b.row) ? (c(), p(S, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (V) => e._emit("edit", b)
                    }), {
                      default: d(() => [
                        f(a, { name: "edit" }),
                        $(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : g("", !0),
                    e.canSave(b.row) ? F((c(), p(S, _({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: b.row._loading,
                      onClick: (V) => e._emit("row-edit", b)
                    }), {
                      default: d(() => [
                        f(a, { name: "collection" }),
                        $(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [R, b.row._loading]
                    ]) : g("", !0),
                    e.canCancelEdit(b.row) ? (c(), p(S, _({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (V) => e._emit("cancel-edit", b)
                    }), {
                      default: d(() => [
                        f(a, { name: "refresh-left" }),
                        $(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : g("", !0),
                    e.canDelete(b.row) ? (c(), p(S, _({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (V) => e._emit("delete", b)
                    }), {
                      default: d(() => [
                        f(a, { name: "DeleteFilled" }),
                        $(" 删除 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : g("", !0),
                    w(e.$slots, "operates-suffix", { scope: b })
                  ]),
                  _: 3
                }, 8, ["min-width", "align", "fixed"]))
              ]),
              _: 3
            }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
              [R, e._loading]
            ]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (c(), p(x, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (b) => e._emit("search", n.params))
            }, null, 8, ["query", "total"])) : g("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Jo = /* @__PURE__ */ k(Xo, [["render", Ho]]);
const Ko = {
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
}, Yo = { class: "mobile-x-table-tools" }, Go = { class: "tools" }, Qo = { class: "tools-end" };
function Zo(e, t, s, o, n, i) {
  const l = u("mobile-x-icon"), a = u("van-button"), r = ne("domid");
  return c(), v("div", Yo, [
    O("div", Go, [
      w(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? F((c(), p(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[0] || (t[0] = (h) => e.$emit("search"))
      }), {
        default: d(() => [
          f(l, { name: "search" }),
          $(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.search]
      ]) : g("", !0),
      e.$attrs.onAdd ? F((c(), p(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
        onClick: t[1] || (t[1] = (h) => e.$emit("add"))
      }), {
        default: d(() => [
          f(l, { name: "circle-plus-filled" }),
          $(" 新增 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.add]
      ]) : g("", !0),
      e.$attrs.onMultiEdit ? F((c(), p(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
      }), {
        default: d(() => [
          f(l, { name: "edit" }),
          $(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["multi-edit"]]
      ]) : g("", !0),
      e.$attrs.onMultiDelete ? F((c(), p(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
      }), {
        default: d(() => [
          f(l, { name: "DeleteFilled" }),
          $(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["multi-delete"]]
      ]) : g("", !0),
      e.$attrs.onExport ? F((c(), p(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (h) => e.$emit("export"))
      }), {
        default: d(() => [
          f(l, { name: "printer" }),
          $(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.export]
      ]) : g("", !0),
      e.$attrs.onSearchExport ? F((c(), p(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
      }), {
        default: d(() => [
          f(l, { name: "printer" }),
          $(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["search-export"]]
      ]) : g("", !0),
      e.$attrs.onImport ? F((c(), p(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (h) => e.$emit("import"))
      }), {
        default: d(() => [
          f(l, { name: "UploadFilled" }),
          $(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.import]
      ]) : g("", !0),
      w(e.$slots, "tools-suffix", {}, void 0, !0),
      O("div", Qo, [
        w(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const ei = /* @__PURE__ */ k(Ko, [["render", Zo], ["__scopeId", "data-v-442404e2"]]);
const ti = {
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
}, si = { class: "tools" }, ni = { class: "tools-end flex-center" };
function oi(e, t, s, o, n, i) {
  const l = u("pc-x-icon"), a = u("el-button"), r = u("el-card"), h = ne("domid");
  return c(), p(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: d(() => [
      O("div", si, [
        w(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? F((c(), p(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (m) => e.$emit("search"))
        }), {
          default: d(() => [
            f(l, { name: "search" }),
            $(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : g("", !0),
        e.$attrs.onAdd ? F((c(), p(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (m) => e.$emit("add"))
        }), {
          default: d(() => [
            f(l, { name: "circle-plus-filled" }),
            $(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : g("", !0),
        e.$attrs.onMultiEdit ? F((c(), p(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
        }), {
          default: d(() => [
            f(l, { name: "edit" }),
            $(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : g("", !0),
        e.$attrs.onMultiDelete ? F((c(), p(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
        }), {
          default: d(() => [
            f(l, { name: "DeleteFilled" }),
            $(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : g("", !0),
        e.$attrs.onExport ? F((c(), p(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (m) => e.$emit("export"))
        }), {
          default: d(() => [
            f(l, { name: "printer" }),
            $(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : g("", !0),
        e.$attrs.onSearchExport ? F((c(), p(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
        }), {
          default: d(() => [
            f(l, { name: "printer" }),
            $(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : g("", !0),
        e.$attrs.onImport ? F((c(), p(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (m) => e.$emit("import"))
        }), {
          default: d(() => [
            f(l, { name: "UploadFilled" }),
            $(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : g("", !0),
        w(e.$slots, "tools-suffix", {}, void 0, !0),
        O("div", ni, [
          w(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const ii = /* @__PURE__ */ k(ti, [["render", oi], ["__scopeId", "data-v-02d70f98"]]);
function li(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Te(e);
}
const ai = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, o = (n) => {
    n ? e._data.forEach((l, a) => e.selected.add(a)) : e.selected.clear();
    const i = n ? e._data.slice() : [];
    e.handleSelectionChange(i);
  };
  return f(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: o
  }, null);
}, ri = (e, t) => {
  const {
    rowIndex: s,
    rowData: o
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const i = [...t.selected].map((l) => t._data[l]);
    t.handleSelectionChange(i);
  };
  return f(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, ci = (e, t) => {
  const {
    page: s,
    limit: o
  } = t._query;
  return (s - 1) * o + e.rowIndex + 1;
}, di = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return f("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, oe = ([e, t, s, o, n, i]) => {
  const {
    rowIndex: l,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: l,
      row: a
    });
  };
  return f(u("el-button"), _({
    type: o
  }, t._attrs[s + "-btn"], {
    onClick: r
  }), {
    default: () => [f(u("x-icon"), {
      name: n
    }, null), i]
  });
}, ui = (e, t) => {
  if (t.canEdit(e.rowData))
    return oe([e, t, "edit", "warning", "edit", "编辑"]);
}, hi = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return oe([e, t, "row-edit", "success", "collection", "保存"]);
}, pi = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return oe([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, mi = (e, t) => {
  if (t.canDelete(e.rowData))
    return oe([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, fi = (e, t) => {
  const {
    _attrs: s,
    $slots: o
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => ri(i, t);
  if (e.type === "index")
    return (i) => ci(i, t);
  if (e.type === "radio")
    return (i) => di(i, t);
  if (e.slot) {
    if (n[e.slot])
      return n[e.slot];
    if (o[e.slot])
      return (i) => o[e.slot]({
        scope: {
          $index: i.rowIndex,
          row: i.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (i) => o.all({
      scope: {
        $index: i.rowIndex,
        row: i.rowData
      },
      column: e
    });
  return (i) => {
    const {
      rowData: l,
      column: a
    } = i;
    if (a.comp === "ElSwitch" || t.table.isRowEdit && l.isEditing && (a.visible !== !1 || a.canEdit)) {
      const m = (y) => {
        l[a.prop] = y;
      }, S = a.comp || "ElInput";
      return Y(u(S), {
        ...a,
        ...a.formAttrs,
        modelValue: l[a.prop],
        onInput: m,
        disabled: !l.editable || !l.isEditing
      });
    }
    const r = t.calcValue(i.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? f(u("el-tooltip"), {
      content: r
    }, li(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, _i = (e, t) => {
  const {
    _attrs: s,
    $slots: o
  } = t, n = e.map((i, l) => {
    const {
      tableAttrs: a = {}
    } = i, r = {
      ...i,
      key: l,
      dataKey: i.prop,
      title: i.label,
      width: i.width || a.width || i.minWidth || a.minWidth || i.maxWidth || a.maxWidth,
      align: i.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = ai(t)), r.cellRenderer = fi(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(i) {
      return f("div", {
        class: "operates"
      }, [o["operates-prefix"] ? o["operates-prefix"]() : null, ui(i, t), hi(i, t), pi(i, t), mi(i, t), o["operates-suffix"] ? o["operates-suffix"]() : null]);
    }
  }), n;
}, bi = {
  convertColumnsForTableV2: _i
};
const gi = {
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
  components: { Searcher: Ke, Settings: Ye },
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
    convertColumnsForTableV2: bi.convertColumnsForTableV2
  }
}, yi = { key: 1 };
function vi(e, t, s, o, n, i) {
  const l = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), m = u("el-table-v2"), S = u("el-auto-resizer"), y = u("x-pagination"), x = u("el-collapse-item"), M = u("el-collapse"), D = ne("loading");
  return c(), v("div", {
    class: J(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    f(l, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (R) => e._emit("search", R))
    }, null, 8, ["uid", "columns", "config"]),
    f(M, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (R) => n.activeNames = R),
      class: J((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: d(() => [
        f(x, {
          name: n.activeNames[0]
        }, {
          title: d(() => [
            e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (c(), v("span", yi, A(e.title), 1))
          ]),
          default: d(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (c(), p(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), H({
              "tools-end": d(() => [
                f(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                f(r, {
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
                fn: d(() => [
                  w(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: d(() => [
                  w(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : g("", !0),
            f(S, {
              style: tt({ height: s.height })
            }, {
              default: d(({ width: R, height: b }) => [
                F((c(), p(m, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: R,
                  height: b
                }), H({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: d(() => [
                      w(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: d(() => [
                      w(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: d(() => [
                      w(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [D, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (c(), p(y, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (R) => e._emit("search"))
            }, null, 8, ["query", "total"])) : g("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const wi = /* @__PURE__ */ k(gi, [["render", vi]]);
const re = ["selection", "radio"], Si = {
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
      re.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !re.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (re.includes(t)) {
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
}, ki = { class: "x-table-viewer" };
function $i(e, t, s, o, n, i) {
  const l = u("x-dialog");
  return c(), v("div", ki, [
    f(l, _(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: d(() => [
        (c(), p(G(s.useTableV2 ? "x-table-v2" : "x-table"), _({
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
const Ci = /* @__PURE__ */ k(Si, [["render", $i], ["__scopeId", "data-v-f5d31400"]]), xi = {
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
}, Ei = { class: "x-tinymce" }, Vi = ["id", "innerHTML"];
function Ai(e, t, s, o, n, i) {
  return c(), v("div", Ei, [
    O("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, Vi)
  ]);
}
const Oi = /* @__PURE__ */ k(xi, [["render", Ai]]);
const ji = {
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
      const o = ((n = this.service) == null ? void 0 : n.API_BASE_URL) + "/" + e.filename;
      this.$emit("update:modelValue", o);
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
        const o = (this.baseURL || this.service.API_BASE_URL) + "/";
        s = s.map((n) => o + n), this.$emit("update:modelValue", s);
      } catch (t) {
        return this.$message.error(t.toString());
      }
    }
  }
}, ye = (e) => (pe("data-v-fe069681"), e = e(), me(), e), Ri = { class: "mask" }, Mi = {
  key: 0,
  class: "el-upload__text"
}, Ti = /* @__PURE__ */ ye(() => /* @__PURE__ */ O("em", null, "点击上传", -1)), Fi = /* @__PURE__ */ ye(() => /* @__PURE__ */ O("br", null, null, -1)), Bi = /* @__PURE__ */ ye(() => /* @__PURE__ */ O("br", null, null, -1)), Ni = {
  key: 0,
  class: "path"
};
function Di(e, t, s, o, n, i) {
  const l = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return c(), p(r, _({
    "file-list": n.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (h) => n.fileList = h),
    drag: "",
    disabled: n.disabled,
    action: i.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": i.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: d(() => [
      O("div", Ri, [
        f(l, { name: "upload-filled" }),
        n.disabled ? g("", !0) : (c(), v("div", Mi, [
          $(" 将文件拖到此处，或"),
          Ti,
          Fi,
          Bi,
          s.needUpload && !n.disabled && n.fileList.length ? (c(), p(a, {
            key: 0,
            type: "success",
            onClick: W(i.handleUploadAll, ["stop"])
          }, {
            default: d(() => [
              $(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : g("", !0)
        ]))
      ]),
      i.filepath ? (c(), v("div", Ni, A(s.modelValue), 1)) : g("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Ii = /* @__PURE__ */ k(ji, [["render", Di], ["__scopeId", "data-v-fe069681"]]);
const Ui = {
  name: "XImageUploader",
  props: {
    modelValue: Array | String,
    multiple: Boolean,
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
    image() {
      const e = this.modelValue;
      return Array.isArray(e) ? e[0] : e;
    }
  },
  methods: {
    onSuccess(e, t, s) {
      const o = this.$api.API_BASE_URL + "/" + e.filename;
      this.$emit("update:modelValue", o);
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
        const o = (this.baseURL || this.service.API_BASE_URL) + "/";
        s = s.map((n) => o + n), this.$emit("update:modelValue", s);
      } catch (t) {
        return this.$message.error(t.toString());
      }
    }
  }
}, ve = (e) => (pe("data-v-c1111863"), e = e(), me(), e), Pi = { class: "mask" }, Li = { class: "el-upload__text" }, Xi = /* @__PURE__ */ ve(() => /* @__PURE__ */ O("em", null, "点击上传", -1)), qi = /* @__PURE__ */ ve(() => /* @__PURE__ */ O("br", null, null, -1)), zi = /* @__PURE__ */ ve(() => /* @__PURE__ */ O("br", null, null, -1));
function Wi(e, t, s, o, n, i) {
  const l = u("x-icon"), a = u("el-button"), r = u("el-image"), h = u("el-upload");
  return c(), p(h, _({
    "file-list": n.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (m) => n.fileList = m),
    drag: "",
    disabled: n.disabled,
    action: s.action,
    accept: "image/*",
    multiple: s.multiple,
    "on-success": i.onSuccess,
    "auto-upload": !1,
    class: "x-image-uploader"
  }, e.$attrs), {
    default: d(() => [
      O("div", Pi, [
        f(l, { name: "upload-filled" }),
        O("div", Li, [
          $(" 将图片拖到此处，或"),
          Xi,
          qi,
          zi,
          s.needUpload && !n.disabled && n.fileList.length ? (c(), p(a, {
            key: 0,
            type: "success",
            onClick: W(i.handleUploadAll, ["stop"])
          }, {
            default: d(() => [
              $(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : g("", !0)
        ])
      ]),
      i.image ? (c(), p(r, {
        key: 0,
        src: i.image,
        alt: "upload-image",
        fit: "cover"
      }, null, 8, ["src"])) : g("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "multiple", "on-success"]);
}
const Hi = /* @__PURE__ */ k(Ui, [["render", Wi], ["__scopeId", "data-v-c1111863"]]), ce = {
  xactionsheet: xt,
  xautorows: jt,
  mobilexbutton: Tt,
  pcxbutton: Nt,
  xchart: Pt,
  mobilexcheckboxs: qt,
  pcxcheckboxs: Ht,
  mobilexcol: Yt,
  pcxcol: Zt,
  mobilexdialog: ss,
  pcxdialog: ls,
  xdistrictselect: cs,
  mobilexform: ys,
  pcxform: ks,
  mobilexformitem: xs,
  pcxformitem: Es,
  mobilexicon: js,
  pcxicon: Fs,
  xinfo: Mn,
  xlooper: Nn,
  mobilexpagination: Un,
  pcxpagination: Xn,
  xpicker: Wn,
  mobilexradios: Kn,
  pcxradios: Qn,
  mobilexrow: so,
  pcxrow: lo,
  mobilexselect: ho,
  pcxselect: go,
  mobilextable: Ro,
  pcxtable: Jo,
  mobilextabletools: ei,
  pcxtabletools: ii,
  xtablev2: wi,
  xtableviewer: Ci,
  xtinymce: Oi,
  xfileuploader: Ii,
  ximageuploader: Hi
}, te = {};
for (let e in ce)
  te[ce[e].name] = ce[e];
const Ji = (e) => ({
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
    return Y(u(this.name), {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), he = (() => {
  const e = Object.keys(te), t = [...new Set(e.map((o) => o.replace(/(pc|mobile)/i, "")))], s = {};
  for (const o of e)
    /(pc|mobile)/i.test(o) && (s[o] = te[o]);
  for (const o of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(o.toLowerCase())) ? s[o] = Ji(o) : s[o] = te[o];
  return s;
})(), Ki = (e, t) => {
  for (let s in he)
    e.component(s, he[s]);
}, Gi = {
  version: "1.0.20",
  ...he,
  ...qe,
  ...kt,
  install: Ki
};
export {
  ze as BaseController,
  pt as Confirm,
  We as CrudController,
  Fe as Message,
  ht as Notify,
  St as TempCrudController,
  De as baseDialog,
  Be as baseForm,
  yt as baseModel,
  Ne as baseTable,
  kt as controllers,
  Gi as default,
  ot as effects,
  P as formatOptions,
  it as formatPrecision,
  Le as initDefaultForm,
  Ue as initDialog,
  fe as initForm,
  Pe as initFormRules,
  vt as initModel,
  Ie as initTable,
  Xe as triggers,
  qe as utils
};
