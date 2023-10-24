import { toRaw as Qe, watch as xe, nextTick as ee, resolveComponent as u, openBlock as d, createBlock as m, mergeProps as _, createElementBlock as y, Fragment as O, renderList as F, withCtx as c, renderSlot as w, toDisplayString as A, useCssVars as Ve, createTextVNode as $, createSlots as H, resolveDynamicComponent as G, createCommentVNode as g, createVNode as f, normalizeProps as se, guardReactiveProps as Ae, normalizeClass as J, h as X, isVNode as Oe, createElementVNode as j, withModifiers as K, pushScopeId as je, popScopeId as Me, resolveDirective as ne, withDirectives as T, normalizeStyle as Ze } from "vue";
const et = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const i = e.getContext("2d");
  class n {
    constructor(q, z, L, Q, Ke, Ye, Ge) {
      this.x = q, this.y = z, this.radius = L, this.color = Q, this.vx = Ke, this.vy = Ye, this.ctx = Ge;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const o = () => i.clearRect(0, 0, t, s), l = (x) => Math.floor(Math.random() * x);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const x = i.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = E * 30), a >= 1 && (a = 1, r = -r, h = E * 30)), x.addColorStop(0, "rgba(250, 220, 20, 0.5)"), x.addColorStop(a, "rgba(20, 20, 20, 0.5)"), i.fillStyle = x, i.fillRect(0, 0, t, s);
  }, S = Math.floor(t / 100), v = Math.floor(s / 100), E = 20, R = Math.round(1e3 / E), D = Array.from({ length: 52 }).map(() => {
    const x = Math.floor(l(S + v) * 1.5 + l(5));
    let q = l(t), z = l(s);
    q = Math.min(Math.max(x, q), t - x), z = Math.min(Math.max(x, z), s - x);
    let L = l(2) ? (l(2) + 2) * S : (l(-1) - 2) * S, Q = l(2) ? (l(2) + 2) * v : (l(-1) - 2) * v;
    return L = Math.floor(L / E), Q = Math.floor(Q / E), new n(
      q,
      z,
      x,
      `rgba(${l(256)}, ${l(256)}, ${l(256)}, ${(l(5) + 5) / 10})`,
      L,
      Q,
      i
    );
  });
  let M, b;
  e.addEventListener("mouseover", (x) => {
    M = x.pageX, b = x.pageY;
  }), e.addEventListener("mousemove", (x) => {
    if (M === void 0) {
      M = x.pageX, b = x.pageY;
      return;
    }
    const q = x.pageX - M, z = x.pageY - b;
    D.forEach((L) => {
      L.x += q / E, L.y += z / E;
    }), M = x.pageX, b = x.pageY;
  });
  let V = Date.now(), C = null;
  const N = () => {
    Date.now() - V >= R && (o(), p(), D.forEach((x) => x.update()), V = Date.now()), C = requestAnimationFrame(N);
  };
  return C = requestAnimationFrame(N), () => cancelAnimationFrame(C);
}, tt = ({
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
  const p = r.measureText(e).width + t, S = s + t;
  for (let v = t / 2; v < o; v += S)
    for (let E = t / 2; E < n; E += p)
      r[l + "Text"](e, E, v);
  return a;
}, st = {
  pop: et,
  createWatermark: tt
}, nt = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, P = (e, t) => {
  const s = e.__v_isRef ? e.value : Qe(e);
  let i = s;
  if (typeof s[0] != "object" && (i = s.map((o) => ({ text: o, value: o }))), !t.sort)
    return i;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((o, l) => o[n].localeCompare(l[n]));
}, { ElMessage: it, ElNotification: ot, ElMessageBox: lt } = window.ElementPlus || {}, { showToast: at, showNotify: rt, showConfirmDialog: dt } = window.vant || {}, pe = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? ((i === "error" || i === "warning") && (t.type = "fail"), at(t)) : it({
    showClose: !0,
    ...t
  });
}, ct = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? (i === "error" && (t.type = "danger"), rt(t)) : ot({
    showClose: !0,
    ...t
  });
}, ut = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = dt(e) : t = lt.confirm(
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
}, ht = (e, t) => {
  e.beforeEach((s, i, n) => {
    s.matched.length ? n() : n("/404");
  });
}, pt = (e, t) => {
  e.afterEach((s, i) => {
    const n = s.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...n].filter((o) => o).reverse().join("-");
  });
}, mt = (e, t) => {
  e.beforeEach((s, i, n) => {
    !s.meta.roles || s.meta.roles.some((l) => t.getters.userRoles.includes(l)) ? n() : n("/");
  });
}, ft = (e, t) => {
  e.beforeEach((s, i, n) => {
    s.name === "Login" && t.getters.logined && s.query.redirectTo ? n(s.query.redirectTo) : n();
  });
}, _t = {
  check404: ht,
  setTitle: pt,
  checkRolesPages: mt,
  redirectTo: ft
}, Re = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), Fe = (e = {}) => ({
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
}), Te = () => ({
  ...Re(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), bt = () => ({
  table: Fe(),
  dialog: Te()
}), { funcs: ce } = StardustJs, gt = (e, t) => {
  for (let s in e) {
    const i = e[s];
    !i || typeof i != "object" || (s === "table" && e[s]._isBaseTable && Be(i, t), s === "dialog" && e[s]._isBaseDialog && Ne(i, t), s === "form" && e[s]._isBaseForm && me(i, t));
  }
  return e;
}, Be = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), Ne = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), me(e, t), e), me = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((i) => i.visible !== !1)), Ie(e.form, e.formItems), e.initialForm = ce.deepCopy(e.form), e.initialFormRules = ce.deepCopy(e.formRules), xe(() => e.formItems, () => {
  De(e);
}, { immediate: !0, deep: !0 }), e), De = (e) => {
  const { formItems: t, initialFormRules: s } = e, i = t.filter((o) => {
    let { formAttrs: l = {}, required: a = !1 } = o;
    return a = "required" in l ? l.required : a, !o.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(o.prop) && a !== !1;
  }).map((o) => o.prop);
  if (Object.assign(e.formRules, ce.deepCopy(s)), Object.keys(e.formRules).forEach((o) => {
    o in s || delete e.formRules[o];
  }), !i.length)
    return;
  const n = {};
  return i.forEach((o) => {
    if (e.formRules[o])
      return;
    const l = t.find((E) => E.prop === o), a = l.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = Ue[a], h = [], v = { required: !0, message: `请${"options" in l ? "选择" : "输入"}${(l == null ? void 0 : l.label) || o}` };
    l.validator && (v.validator = l.validator), l.asyncValidator && (v.asyncValidator = l.asyncValidator), l.comp ? h.push({ ...v, trigger: r.change }) : h.push({ ...v, trigger: r.blur }), l.comp === "ElInputNumber" && h.push({ ...v, trigger: r.blur }), n[o] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, Ie = (e, t, s = !0) => {
  const i = {};
  return t.forEach((n) => {
    var h;
    let o = "";
    const { type: l, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && l === "number" || n.comp === "ElInputNumber")
      o = 0;
    else if (n.comp === "ElSwitch")
      o = !1;
    else if (a && ((h = n.comp) != null && h.endsWith("XCheckboxs") || r))
      o = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const p = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + p), n["end-placeholder"] || (n["end-placeholder"] = "结束" + p), o = [];
    }
    i[n.prop] = o;
  }), Object.assign(e, { ...i, ...e }), e;
}, Ue = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, Pe = {
  effects: st,
  formatPrecision: nt,
  formatOptions: P,
  Message: pe,
  Notify: ct,
  Confirm: ut,
  middlewares: _t,
  baseForm: Re,
  baseTable: Fe,
  baseDialog: Te,
  baseModel: bt,
  initModel: gt,
  initTable: Be,
  initDialog: Ne,
  initForm: me,
  initFormRules: De,
  initDefaultForm: Ie,
  triggers: Ue
};
class Le {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const i = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: {
          get: () => s
        },
        vm: {
          get: () => i
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
    return Pe;
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
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.keys(Object.getOwnPropertyDescriptors(this.__proto__)).filter((o) => o !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...s])).filter((o) => typeof this[o] == "function").forEach((o) => {
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
const { funcs: oe, highdict: ge, dates: le } = StardustJs, { file: ye, excel: Z } = StardustBrowser;
class Xe extends Le {
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
      "afterSearch",
      "afterDelete",
      "afterSubmit",
      "_defaultFormatList",
      "_fillRelatedField",
      "formatList",
      "processExportingColumns",
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
    let i = ge.get(s, this.listProp);
    return i = this.formatList(this._defaultFormatList(i, s), s), Object.assign(this.table, {
      list: i,
      total: s.total,
      loading: !1
    }), this.afterSearch(i, t, s), s;
  }
  async handleAdd() {
    this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await ee(), await oe.sleep(50);
    const t = this.dialog.formRef;
    t && (this._isMobile ? t.resetValidation() : t.clearValidate());
  }
  async handleEdit({ $index: t, row: s }) {
    var i;
    this.table.isRowEdit ? (s.originData = JSON.stringify(s), s.isEditing = !0) : (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !0,
      editingIndex: t,
      editingRow: s,
      form: {
        ...this.dialog.form,
        ...s
      }
    }), await ee(), (i = this.dialog.formRef) == null || i.validate().catch(Function()));
  }
  async handleDelete({ row: t }) {
    if (await this.uiUtils.Confirm({
      message: "确定要删除吗？",
      title: "警告",
      type: "warning"
    })) {
      const i = this.getDeleteParams(t), n = await this.remove(i, t);
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
    l = oe.deepCopy(l), l = this.processExportingData(l), l.length && Object.keys(l[0]);
    const a = this.processExportingColumns(o._visibleColumns, "current"), r = a.map((S) => S.prop), h = a.map((S) => S.label);
    l = l.map((S) => r.map((v) => S[v]));
    let p = null;
    t === "csv" ? p = Z.export2Csv : p = Z.export2Excel, p({ header: h, data: l, filename: s }), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      this.uiUtils.Message({ type: "error", message: "不支持的导出类型" });
      return;
    }
    this._isExporting = !0;
    const i = this.processExportingColumns(this.table.ref._visibleColumns, "search"), n = i.map((h) => h.prop), o = i.map((h) => h.label);
    let a = (await this.dbTable.search(this.getSearchExportParams())).data.map((h) => n.map((p) => h[p]));
    a = oe.deepCopy(a), a = this.processExportingData(a, "search");
    let r = null;
    t === "csv" ? r = Z.export2Csv : r = Z.export2Excel, r({ header: o, data: a, filename: s }), this._isExporting = !1;
  }
  async handleImport() {
    const t = await ye.select(".xls,.xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), i = await ye.toType(t, s ? "text" : "arraybuffer");
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
        return l.forEach((h) => r[o[h]] = a[h]), r;
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
      n.type === "number" ? o = this.uiUtils.formatPrecision(o, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? o = le.format(o) : (!n.type || n.type === "date") && (o = le.format(o, "", !1))), i[n.model || n.prop] = o;
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
  afterSearch(t, s, i) {
    const n = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && n !== this._lastSearchParams) {
      const { page: o, limit: l, order: a, count: r, ...h } = s;
      this.dbTable.func(["count", h]).then((p) => this.table.total = p.data);
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
    const { columns: i, query: n } = this.table, { page: o, limit: l } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (o - 1) * l + r + 1;
    }), i.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: p, formatter: S, autoFill: v } = a.tableAttrs || {}, { modelName: E } = a.formAttrs || {};
      if (E && v)
        t.forEach((R) => R[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const D = xe(() => a.options, (M, b) => {
          const V = b ? this.table.list : t, C = yt(a);
          V.forEach((N) => {
            const x = N[r];
            N[`_formatted_${r}`] = C[x] || (S == null ? void 0 : S(x)) || x;
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
    const r = ge.mapField(a.data, l, o);
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
    const i = Object.keys(t[0]);
    return t.forEach((n) => {
      i.forEach((o) => {
        const l = n[o];
        typeof l == "boolean" ? n[o] = l && 1 || 0 : l instanceof Date ? (n[o] = le.format(l), n[o].endsWith(" 00:00:00") && (n[o] = n[o].slice(0, -9))) : typeof l == "object" && (n[o] = JSON.stringify(l));
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
const yt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: n = "value" } = s, o = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((l) => {
    o[l[n]] = l[i];
  }), o;
};
class vt extends Xe {
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
const wt = {
  BaseController: Le,
  CrudController: Xe,
  TempCrudController: vt
}, k = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, n] of t)
    s[i] = n;
  return s;
}, St = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function kt(e, t, s, i, n, o) {
  const l = u("van-action-sheet");
  return d(), m(l, _(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const $t = /* @__PURE__ */ k(St, [["render", kt]]), Ct = {
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
}, Et = { class: "x-auto-rows" }, xt = { key: 1 };
function Vt(e, t, s, i, n, o) {
  const l = u("XCol"), a = u("XRow");
  return d(), y("div", Et, [
    (d(!0), y(O, null, F(o.rows, (r, h) => (d(), m(a, _({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), y(O, null, F(r, (p, S) => (d(), m(l, _(p, {
          span: p.span || s.span,
          key: S,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            p.slot || e.$attrs.slot ? w(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), y("span", xt, A(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const At = /* @__PURE__ */ k(Ct, [["render", Vt]]), Ot = {
  name: "MobileXButton"
};
function jt(e, t, s, i, n, o) {
  const l = u("van-button");
  return d(), m(l, null, {
    default: c(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  });
}
const Mt = /* @__PURE__ */ k(Ot, [["render", jt]]), Rt = {
  name: "PcXButton"
};
function Ft(e, t, s, i, n, o) {
  const l = u("el-button");
  return d(), m(l, null, {
    default: c(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  });
}
const Tt = /* @__PURE__ */ k(Rt, [["render", Ft]]);
const { funcs: Bt } = StardustBrowser, fe = {
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
      return Bt.calcPixel(this.height) * this.zoom + "px";
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
}, ve = () => {
  Ve((e) => ({
    "127c024a": e.zoomedHeight,
    "137ee0b8": e.zoom
  }));
}, we = fe.setup;
fe.setup = we ? (e, t) => (ve(), we(e, t)) : ve;
const Nt = {
  class: "x-chart",
  ref: "el"
};
function Dt(e, t, s, i, n, o) {
  return d(), y("div", Nt, null, 512);
}
const It = /* @__PURE__ */ k(fe, [["render", Dt], ["__scopeId", "data-v-0c2da986"]]), Ut = {
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
    formatOptions: P
  }
};
function Pt(e, t, s, i, n, o) {
  const l = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), m(a, _({ class: "mobile-x-checkboxs" }, o.attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), y(O, null, F(o.formatOptions(s.options, this), (r) => (d(), m(l, _(o.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: c(() => [
          $(A(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Lt = /* @__PURE__ */ k(Ut, [["render", Pt]]), Xt = {
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
    formatOptions: P
  }
};
function qt(e, t, s, i, n, o) {
  const l = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), m(a, _({ class: "pc-x-checkboxs" }, o.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r))
  }), {
    default: c(() => [
      (d(!0), y(O, null, F(o.formatOptions(s.options, this), (r) => (d(), m(l, _(o.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: c(() => [
          $(A(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const zt = /* @__PURE__ */ k(Xt, [["render", qt]]), Wt = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Ht(e, t, s, i, n, o) {
  const l = u("van-col");
  return d(), m(l, _(o.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Jt = /* @__PURE__ */ k(Wt, [["render", Ht]]), Kt = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Yt(e, t, s, i, n, o) {
  const l = u("el-col");
  return d(), m(l, _(o.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Gt = /* @__PURE__ */ k(Kt, [["render", Yt]]), Qt = {
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
function Zt(e, t, s, i, n, o) {
  const l = u("van-dialog");
  return d(), m(l, _({ width: "92%" }, e.$attrs, {
    show: o.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => o.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: t[1] || (t[1] = (a) => e.$emit("submit")),
    onCancel: t[2] || (t[2] = (a) => e.$emit("cancel"))
  }), H({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: c(() => [
        w(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: c(() => [
        w(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: c(() => [
        w(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button"]);
}
const es = /* @__PURE__ */ k(Qt, [["render", Zt]]), ts = {
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
}, ss = {
  key: 1,
  class: "el-dialog__title"
};
function ns(e, t, s, i, n, o) {
  const l = u("x-icon"), a = u("el-button");
  return d(), m(G(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: o.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => o.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: c(() => [
      e.$slots.header ? w(e.$slots, "header", { key: 0 }) : (d(), y("span", ss, A(e.$attrs.title), 1)),
      s.drawer ? g("", !0) : (d(), m(l, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: o.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? w(e.$slots, "footer", { key: 0 }) : g("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), m(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          $(A(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : g("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), m(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          $(A(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : g("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? w(e.$slots, "default", { key: 0 }) : g("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const is = /* @__PURE__ */ k(ts, [["render", ns]]), I = {}, W = {
  provinces: [],
  cities: [],
  counties: []
}, os = {
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
      provinces: Object.freeze(W.provinces),
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
      this.cities = Object.freeze(W.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(W.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(I, this.areaList), W.provinces = Object.entries(I.province_list).map((e) => ({ value: e[0], text: e[1] })), W.cities = Object.entries(I.city_list).map((e) => ({ value: e[0], text: e[1] })), W.counties = Object.entries(I.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(W.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const i = Object.entries(I.province_list).find((n) => n[1] === e);
        this.province = i == null ? void 0 : i[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const i = Object.entries(I.city_list).find((n) => n[1] === t);
        this.city = i == null ? void 0 : i[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const i = Object.entries(I.county_list).find((n) => n[1] === s);
        this.county = i == null ? void 0 : i[0];
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
function ls(e, t, s, i, n, o) {
  const l = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), m(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      f(a, { span: o.span }, {
        default: c(() => [
          f(l, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => n.province = h),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      o.number > 1 ? (d(), m(a, {
        key: 0,
        span: o.span
      }, {
        default: c(() => [
          f(l, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => n.city = h),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : g("", !0),
      o.number > 2 ? (d(), m(a, {
        key: 1,
        span: o.span
      }, {
        default: c(() => [
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
const as = /* @__PURE__ */ k(os, [["render", ls]]);
function rs() {
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
function ds() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function cs() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function us() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function hs(e) {
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
}
function ps(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function ms(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const Y = {
  props: rs,
  computed: {
    _model: ds,
    _items: cs,
    _rules: us
  },
  methods: {
    calcPlaceholder: hs,
    calcStyle: ps,
    formatModelValue: ms
  }
}, fs = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...Y.props()
  },
  emits: ["update:fref"],
  computed: {
    ...Y.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...Y.methods
  }
};
function _s(e, t, s, i, n, o) {
  const l = u("mobile-x-form-item"), a = u("van-cell-group"), r = u("van-form");
  return d(), m(r, {
    ref: "formRef",
    class: "mobile-x-form"
  }, {
    default: c(() => [
      e.$slots.pre ? w(e.$slots, "pre", { key: 0 }) : g("", !0),
      f(a, se(Ae(e.$attrs)), {
        default: c(() => [
          (d(!0), y(O, null, F(e._items, (h, p) => (d(), m(l, _(h, {
            rules: e._rules[h.prop] || h.rules,
            key: p,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (S) => e._model[h.prop] = S,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: c(() => [
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
const bs = /* @__PURE__ */ k(fs, [["render", _s]]), gs = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...Y.props(),
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
    ...Y.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...Y.methods
  }
}, ys = { key: 1 };
function vs(e, t, s, i, n, o) {
  const l = u("pc-x-form-item"), a = u("el-form"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), m(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: J((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      f(r, {
        name: n.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (d(), y("span", ys, A(s.title), 1))
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
              e.$slots.pre ? w(e.$slots, "pre", { key: 0 }) : g("", !0),
              (d(!0), y(O, null, F(e._items, (p, S) => (d(), m(l, _({
                "label-width": s.labelWidth,
                "show-tooltip": e.$attrs.showTooltip || !1
              }, p, {
                key: S,
                modelValue: e._model[p.prop],
                "onUpdate:modelValue": [(v) => e._model[p.prop] = v, (v) => p.onChange || null],
                prop: p.prop || p.model,
                clearable: p.clearable !== !1,
                placeholder: e.calcPlaceholder(p),
                style: e.calcStyle(p)
              }), {
                default: c(() => [
                  p.slot ? w(e.$slots, p.slot, { key: 0 }) : g("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
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
const ws = /* @__PURE__ */ k(gs, [["render", vs]]);
function Ss(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Oe(e);
}
const ue = (e) => {
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
  const h = {
    ...i,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  }, p = [];
  return l === "html" ? h.class = "comp-html" : o = u(o), a && (h.innerHTML = a), r && p.push(r), X(o, h, {
    default: () => p
  });
}, ks = (e) => {
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
  let h = null;
  if (l)
    h = o.default();
  else if (a) {
    let p;
    h = f(u("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Ss(p = ue(e)) ? p : {
      default: () => [p]
    });
  } else
    h = ue(e);
  return X(u("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [h],
    label: () => X("div", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: e.width
      }
    }, [s.label])
  });
}, $s = (e) => {
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
    modelValue: h
  } = t;
  if (a && !s.label)
    return o.default({
      ...t,
      ...s
    });
  const p = {
    modelValue: l,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  };
  return a && s.label || r ? X(u("van-field"), p, {
    input: () => a && s.label ? o.default() : ue(e)
  }) : (Object.assign(p, i), X(u("van-field"), p));
}, Cs = {
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
    return $s(this);
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
        required: h,
        format: p,
        style: S,
        html: v,
        class: E,
        ...R
      } = { ...this.$props, ...this.$attrs };
      return R;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return ks(this);
  }
}, Se = () => {
  Ve((e) => ({
    ba9709f0: e.width
  }));
}, ke = _e.setup;
_e.setup = ke ? (e, t) => (Se(), ke(e, t)) : Se;
const Es = /* @__PURE__ */ k(_e, [["__scopeId", "data-v-d2cde1e2"]]), $e = /* @__PURE__ */ Object.assign({}), xs = {
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
      await Promise.all(Object.keys($e).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await $e[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Vs = ["src"];
function As(e, t, s, i, n, o) {
  const l = u("van-icon");
  return n.icons[s.name] ? (d(), y("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Vs)) : (d(), m(l, _({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Os = /* @__PURE__ */ k(xs, [["render", As]]), Ce = /* @__PURE__ */ Object.assign({}), js = {
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
      await Promise.all(Object.keys(Ce).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await Ce[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Ms = ["src"];
function Rs(e, t, s, i, n, o) {
  const l = u("el-icon");
  return n.icons[s.name] ? (d(), y("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Ms)) : (d(), m(l, se(_({ key: 1 }, e.$attrs)), {
    default: c(() => [
      (d(), m(G(s.name)))
    ]),
    _: 1
  }, 16));
}
const Fs = /* @__PURE__ */ k(js, [["render", Rs]]), { highdict: Ts } = StardustJs, { storage: Bs } = StardustBrowser, { local: qe } = Bs, ze = ["index", "selection", "expand", "radio", "_index"];
function Ns() {
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
function Ds() {
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
function Is() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = { ...this.$attrs };
  return t in this && Object.assign(s, this[t]), s;
}
function Us() {
  const e = {};
  return ["search", "add", "multi-edit", "multi-delete", "export", "search-export", "import"].forEach((s) => e[s] = s), { ...e, ...this.$attrs.domids };
}
function Ps() {
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
function Ls() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function Xs() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function qs() {
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
function zs() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Ws() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function Hs() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Js() {
  return this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function Ks() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Ys() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function Gs() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function Qs() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function Zs() {
  return this.onMultiEdit || this._listen["multi-edit"] ? () => this._emit("multi-edit") : null;
}
function en() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function tn() {
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
function sn() {
  const e = this._columns.filter((s) => s.type && ze.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const i = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...i,
      width: s.width || i.width
    };
  });
  return e.concat(t);
}
function nn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function on() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function ln() {
  return this._columns.filter((e) => !e.type || !ze.includes(e.type));
}
function an() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function rn() {
  const e = this._uid && qe.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop).map((t) => {
    const { prop: s, label: i, show: n, hide: o, width: l } = t;
    return { prop: s, label: i, show: n, hide: o, width: l };
  })), this.settings = e;
}
function dn(e) {
  qe.setJson(`Settings[${this._uid}]`, e);
}
function cn(e, t) {
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
      return typeof n == "function" ? n(o, e, t) : Ts.get(e, n);
  }
  return o;
}
function un(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function hn(e) {
  this.params = e, this._emit("search", e);
}
function pn(e) {
  this.saveSettings(e), this.initSettings();
}
function mn(e, t, s, i) {
  const n = this.settings.columns.find((o) => o.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function fn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function _n(...e) {
  var t, s;
  this.onSortChange ? this.onSortChange(...e) : e[0].column.sortable === "custom" && ((s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, ...e));
}
function bn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function gn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function yn(e) {
  var i;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function vn(e) {
  var i;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function wn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Sn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function kn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function $n(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Cn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function En(e, t) {
  const s = "on" + e.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function xn() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const B = {
  props: Ns,
  emits: Ds,
  computed: {
    _attrs: Is,
    domids: Us,
    elTableAttrs: Ps,
    _loading: Ls,
    _data: Xs,
    _columns: qs,
    _query: zs,
    _total: Ws,
    _selection: Hs,
    _onSearch: Js,
    _onAdd: Ks,
    _onExport: Ys,
    _onSearchExport: Gs,
    _onImport: Qs,
    _onMultiEdit: Zs,
    _onMultiDelete: en,
    _listen: tn,
    _visibleColumns: sn,
    _uid: nn,
    hideOperates: on,
    searcherColumns: ln,
    searcherConfig: an
  },
  watch: {
    $route: xn
  },
  methods: {
    initSettings: rn,
    saveSettings: dn,
    calcValue: cn,
    calcOverflowTooltip: un,
    handleSearch: hn,
    handleResetSettings: pn,
    handleHeaderDragend: mn,
    handleSelectionChange: fn,
    handleSortChange: _n,
    handleCheckedChange: bn,
    handleToggleFullscreen: gn,
    cellClassName: yn,
    cellStyle: vn,
    canEdit: wn,
    canSave: Sn,
    canRowEdit: kn,
    canCancelEdit: $n,
    canDelete: Cn,
    _emit: En
  }
};
const Vn = {
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
    calcValue: B.methods.calcValue
  }
}, An = { key: 0 }, On = { key: 1 };
function jn(e, t, s, i, n, o) {
  const l = u("el-descriptions-item"), a = u("el-descriptions"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), m(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: J(["x-info", { "hide-header": o.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), y(O, null, F(o.blocks, (p, S) => (d(), m(r, {
        key: S,
        title: S,
        name: S
      }, {
        default: c(() => [
          f(a, {
            column: s.column,
            border: s.border
          }, {
            default: c(() => [
              (d(!0), y(O, null, F(p, (v) => (d(), m(l, _({
                key: v.prop
              }, v), H({
                default: c(() => [
                  v.slot ? (d(), y("span", An, [
                    w(e.$slots, v.slot, se(Ae({ data: s.data, field: v, value: o.calcValue(s.data, v) })), void 0, !0)
                  ])) : (d(), y("span", On, A(o.calcValue(s.data, v)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: c(() => [
                    w(e.$slots, "label", {
                      label: v.label
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
const Mn = /* @__PURE__ */ k(Vn, [["render", jn], ["__scopeId", "data-v-0c3b67a5"]]), Rn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Fn = { key: 1 };
function Tn(e, t, s, i, n, o) {
  return d(), y("div", null, [
    (d(!0), y(O, null, F(s.items, (l, a) => (d(), m(G(s.compName), _({ key: a }, l), {
      default: c(() => [
        l.slot || e.$attrs.slot ? w(e.$slots, "default", {
          key: 0,
          item: l
        }) : (d(), y("span", Fn, A(l.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Bn = /* @__PURE__ */ k(Rn, [["render", Tn]]), Nn = {
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
function Dn(e, t, s, i, n, o) {
  const l = u("van-icon"), a = u("van-pagination");
  return d(), m(a, _({ ...e.$attrs, ...e.mobilePagination || {} }, {
    modelValue: s.query.page,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => s.query.page = r),
    "items-per-page": s.query.limit,
    "page-count": o.pageCount,
    "total-items": s.total
  }), {
    "prev-text": c(() => [
      f(l, { name: "arrow-left" })
    ]),
    "next-text": c(() => [
      f(l, { name: "arrow" })
    ]),
    page: c(({ text: r }) => [
      $(A(r), 1)
    ]),
    _: 1
  }, 16, ["modelValue", "items-per-page", "page-count", "total-items"]);
}
const In = /* @__PURE__ */ k(Nn, [["render", Dn]]), Un = {
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
function Pn(e, t, s, i, n, o) {
  const l = u("el-pagination");
  return d(), m(l, _({
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
const Ln = /* @__PURE__ */ k(Un, [["render", Pn]]), Xn = {
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
function qn(e, t, s, i, n, o) {
  const l = u("van-picker"), a = u("van-popup");
  return d(), y(O, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: J(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, A(s.modelValue || s.placeholder), 3),
    f(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: o.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => o.visible = r)
    }), {
      default: c(() => [
        f(l, _(e.$attrs, {
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
const zn = /* @__PURE__ */ k(Xn, [["render", qn]]), Wn = {
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
function Hn(e, t, s, i, n, o) {
  const l = u("van-radio"), a = u("van-radio-group");
  return d(), m(a, _({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), y(O, null, F(o.formatOptions(s.options, this), (r) => (d(), m(l, _(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: c(() => [
          $(A(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Jn = /* @__PURE__ */ k(Wn, [["render", Hn]]), Kn = {
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
    formatOptions: P
  }
};
function Yn(e, t, s, i, n, o) {
  const l = u("el-radio-group");
  return d(), m(l, _({ class: "pc-x-radios" }, o.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a))
  }), {
    default: c(() => [
      (d(!0), y(O, null, F(o.formatOptions(s.options, this), (a) => (d(), m(G(s.button ? "el-radio-button" : "el-radio"), _(o.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: c(() => [
          $(A(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const Gn = /* @__PURE__ */ k(Kn, [["render", Yn]]), Qn = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Zn = { key: 1 };
function ei(e, t, s, i, n, o) {
  const l = u("MobileXCol"), a = u("van-row");
  return d(), m(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), y(O, null, F(s.cols, (r, h) => (d(), m(l, _(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? w(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), y("span", Zn, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? w(e.$slots, "default", { key: 0 }) : g("", !0)
    ]),
    _: 3
  });
}
const ti = /* @__PURE__ */ k(Qn, [["render", ei]]), si = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ni = { key: 1 };
function ii(e, t, s, i, n, o) {
  const l = u("pc-x-col"), a = u("el-row");
  return d(), m(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), y(O, null, F(s.cols, (r, h) => (d(), m(l, _(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? w(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), y("span", ni, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? w(e.$slots, "default", { key: 0 }) : g("", !0)
    ]),
    _: 3
  });
}
const oi = /* @__PURE__ */ k(si, [["render", ii]]), We = async (e, t, s) => {
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: n = "text", value: o = "value", labelTexts: l, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...l || [], n, o])], a.limit = a.limit || 20, i && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${i}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, li = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((i) => e[i])[0], ai = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((i) => e[i]).slice(1).join(" - ") + ")", ri = {
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
      We(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function di(e, t, s, i, n, o) {
  const l = u("XPicker");
  return d(), y("div", {
    onClick: t[5] || (t[5] = (...a) => o.onClick && o.onClick(...a)),
    class: "mobile-x-select"
  }, [
    f(l, _(e.$attrs, {
      modelValue: o.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: n.visible,
      columns: n._options,
      onClick: t[1] || (t[1] = K(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => n.visible = !0),
      onCancel: t[3] || (t[3] = (a) => n.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => n.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const ci = /* @__PURE__ */ k(ri, [["render", di]]);
const ui = {
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
      We(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return li(e, this);
    },
    calcRemarkLabel(e) {
      return ai(e, this);
    }
  }
}, hi = { key: 1 }, pi = { class: "main" }, mi = { class: "remark" };
function fi(e, t, s, i, n, o) {
  const l = u("el-option"), a = u("el-select");
  return d(), m(a, _({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || o.remoteSearch
  }), {
    default: c(() => [
      (d(!0), y(O, null, F(n._options, (r) => (d(), m(l, _(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: c(() => [
          e.$slots.custom ? w(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (d(), y("span", hi, [
            j("span", pi, A(o.calcMainLabel(r)), 1),
            j("span", mi, A(o.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const _i = /* @__PURE__ */ k(ui, [["render", fi], ["__scopeId", "data-v-a37eab84"]]);
const bi = {
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
}, gi = { class: "mobile-x-table" }, yi = {
  key: 1,
  class: "mobile-x-table card"
}, vi = ["onClick"], wi = ["value", "checked"], Si = { class: "label" }, ki = { class: "value" }, $i = { class: "operates" }, Ci = ["value", "checked"], Ei = {
  key: 2,
  class: "index"
}, xi = { class: "title" }, Vi = { class: "operates" };
function Ai(e, t, s, i, n, o) {
  const l = u("x-table-tools"), a = u("van-checkbox"), r = u("van-button"), h = u("XCol"), p = u("XRow"), S = u("van-swipe-cell"), v = u("van-cell"), E = u("van-list"), R = u("x-pagination"), D = u("XInfo"), M = u("van-popup");
  return d(), y("div", gi, [
    e.hideTools !== "" && e.hideTools !== !0 ? (d(), m(l, _({ key: 0 }, e._attrs, {
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
        fn: c(() => [
          w(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: c(() => [
          w(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : g("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), y("div", yi, [
      (d(!0), y(O, null, F(e._data, (b, V) => (d(), y("div", {
        key: V,
        class: "row",
        onClick: (C) => o.handleClickCard(V)
      }, [
        f(S, {
          onOpen: (C) => n.scope = { row: b, $index: V }
        }, {
          right: c(() => [
            j("div", $i, [
              w(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
              e.hideOperates ? g("", !0) : (d(), m(p, {
                key: 0,
                gutter: 10
              }, {
                default: c(() => [
                  f(h, { span: 12 }, {
                    default: c(() => [
                      e.canEdit(n.scope) ? (d(), m(r, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, { onClick: o.handleEdit }), {
                        default: c(() => [
                          $(" 编辑 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : g("", !0)
                    ]),
                    _: 1
                  }),
                  f(h, { span: 12 }, {
                    default: c(() => [
                      e.canDelete(n.scope) ? (d(), m(r, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"] }, { onClick: o.handleDelete }), {
                        default: c(() => [
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
          default: c(() => [
            o.hasSelection ? (d(), m(a, {
              key: 0,
              modelValue: n.selected[V],
              "onUpdate:modelValue": (C) => n.selected[V] = C,
              shape: "square",
              class: "selection",
              onClick: t[0] || (t[0] = K(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : g("", !0),
            o.hasRadio ? (d(), y("input", {
              key: 1,
              type: "radio",
              value: V,
              checked: V === n.checked,
              class: "radio",
              onClick: t[1] || (t[1] = K(() => {
              }, ["stop"])),
              onChange: t[2] || (t[2] = (...C) => e.handleCheckedChange && e.handleCheckedChange(...C))
            }, null, 40, wi)) : g("", !0),
            (d(!0), y(O, null, F(o.cols, (C, N) => (d(), y("div", {
              key: N,
              class: "field"
            }, [
              j("span", Si, A(C.label) + ":", 1),
              j("span", ki, A(e.calcValue(b, C)), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1032, ["onOpen"])
      ], 8, vi))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), m(E, _({
      key: 2,
      class: "mobile-x-table list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (b) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), y(O, null, F(e._data, (b, V) => (d(), m(v, {
          key: V,
          "is-link": "",
          onClick: (C) => o.handleShowDetail(b, V)
        }, {
          default: c(() => [
            o.hasSelection ? (d(), m(a, {
              key: 0,
              modelValue: n.selected[V],
              "onUpdate:modelValue": (C) => n.selected[V] = C,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = K(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : g("", !0),
            o.hasRadio ? (d(), y("input", {
              key: 1,
              type: "radio",
              value: V,
              checked: V === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = K(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...C) => e.handleCheckedChange && e.handleCheckedChange(...C))
            }, null, 40, Ci)) : g("", !0),
            o.hasIndex ? (d(), y("span", Ei, A(V + 1), 1)) : g("", !0),
            j("span", xi, A(o.calcTitle(b)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : g("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), m(R, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (b) => e._emit("search"))
    }, null, 8, ["query", "total"])) : g("", !0),
    f(M, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (b) => n.popupVisible = b),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        f(D, {
          data: n.scope.row,
          fields: o.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"]),
        j("div", Vi, [
          w(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
          e.hideOperates ? g("", !0) : (d(), m(p, {
            key: 0,
            gutter: 10
          }, {
            default: c(() => [
              f(h, { span: 12 }, {
                default: c(() => [
                  e.canEdit(n.scope) ? (d(), m(r, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"], block: !0 }, { onClick: o.handleEdit }), {
                    default: c(() => [
                      $(" 编辑 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : g("", !0)
                ]),
                _: 1
              }),
              f(h, { span: 12 }, {
                default: c(() => [
                  e.canDelete(n.scope) ? (d(), m(r, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"], block: !0 }, { onClick: o.handleDelete }), {
                    default: c(() => [
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
const Oi = /* @__PURE__ */ k(bi, [["render", Ai], ["__scopeId", "data-v-97a0d027"]]), Ee = {
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
}, ji = [{
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
function Mi() {
  const {
    columns: e,
    visible: t,
    conditions: s,
    expression: i,
    handleSearch: n,
    handleReset: o,
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
    "onUpdate:modelValue": (p) => this.visible = p,
    onCancel: o,
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
    }, [s.map((p, S) => f("div", {
      class: "condition flex-center",
      key: p.no
    }, [f(u("el-button"), {
      type: "danger",
      size: "small",
      plain: !0,
      onClick: () => a(S)
    }, {
      default: () => [$("X")]
    }), f("span", {
      class: "title"
    }, [p.no]), f("div", {
      class: "expression"
    }, [f(u("pc-x-select"), {
      modelValue: p.prop,
      onChange: (v) => r(p, v),
      options: e,
      text: "label",
      value: "prop"
    }, null), f(u("pc-x-select"), {
      modelValue: p.op,
      onChange: (v) => h(p, v),
      options: p.ops
    }, null), f("div", {
      class: "value-container"
    }, [Ri(this, p)])])]))]), f(u("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式"
    }, {
      modelValue: i,
      "onUpdate:modelValue": (p) => this.expression = p
    }), null)]
  });
}
function Ri(e, t) {
  const s = (n) => X(u((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.item, t.item.formAttrs, n, {
    modelValue: t.value,
    "onUpdate:modelValue": (o) => t.value = o
  })), i = {
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
    component: "XSelect",
    placeholder: "请选择特殊值",
    options: ji
  }) : s();
}
const { storage: ae } = StardustBrowser, Fi = {
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
    const e = this.uid && ae.local.getJson(this.key, this.config) || this.config;
    this.initConfig(e);
  },
  render: Mi,
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
        i.item = this.columns.find((a) => a.prop === n), this.handleSelectField(i, n), this.handleSelectOp(i, o), i.ops = U[i.component].map((a) => Ee[a]), i.value = l;
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((i) => i.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        pe({ type: "warning", message: t.toString() });
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
      const t = (i, n) => {
        const o = [];
        n["[Op." + i.type + "]"] = o;
        for (let l of i.items)
          if (typeof l == "string") {
            const a = this.conditions.find((r) => r.no === l * 1);
            if (a) {
              if (!this.checkFilled(a))
                throw "条件不完整: " + l;
            } else
              throw "条件不存在: " + l;
            o.push(this.parseCondition(a));
          } else {
            const a = {};
            o.push(a), t(l, a);
          }
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
        const o = i.startsWith("NOT_");
        return i.includes("NULL") ? i = null : i.includes("BLANK") && (i = ""), o && (i = { "[Op.not]": i }), n[t] = i, n;
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
      e.value = "", e.prop = t, e.item = this.columns.find((o) => o.prop === e.prop);
      const { options: s, type: i, formAttrs: n = {} } = e.item;
      e.component = n.comp || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = U[e.component].map((o) => Ee[o]), e.op = e.ops[0].value, n.comp === "ElDatePicker" && (e.component = "ElInput", e.item.formAttrs.type = "date");
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, He = /* @__PURE__ */ k(Fi, [["__scopeId", "data-v-28cb9e8f"]]);
const Ti = {
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
}, Bi = (e) => (je("data-v-c81e4a2f"), e = e(), Me(), e), Ni = { class: "table" }, Di = ["title", "onClick"], Ii = /* @__PURE__ */ Bi(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1));
function Ui(e, t, s, i, n, o) {
  const l = u("el-button"), a = u("ElCheckbox"), r = u("el-input-number"), h = u("el-tab-pane"), p = u("el-tabs"), S = u("el-popover");
  return s.visible ? (d(), m(S, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: c(() => [
      f(l, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: c(() => [
      f(p, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (v) => n.activeName = v)
      }, {
        default: c(() => [
          f(h, {
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              f(l, {
                type: "warning",
                icon: "Close",
                onClick: o.handleResetColumns
              }, {
                default: c(() => [
                  $("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", Ni, [
                (d(!0), y(O, null, F(n.columns, (v, E) => (d(), y("div", {
                  key: E,
                  class: "row flex-center"
                }, [
                  f(l, {
                    disabled: E === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: (R) => o.handleMove(v, E, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  f(l, {
                    disabled: E === n.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: (R) => o.handleMove(v, E, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  f(a, {
                    modelValue: v.show,
                    "onUpdate:modelValue": (R) => v.show = R,
                    onChange: o.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  j("span", {
                    class: "label overflow-text",
                    title: v.label,
                    onClick: (R) => o.handleToggle(v)
                  }, A(v.label), 9, Di),
                  f(r, {
                    modelValue: v.width,
                    "onUpdate:modelValue": (R) => v.width = R,
                    onChange: o.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  Ii
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
const Je = /* @__PURE__ */ k(Ti, [["render", Ui], ["__scopeId", "data-v-c81e4a2f"]]);
const Pi = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...B.props()
  },
  emits: [
    ...B.emits()
  ],
  components: { Searcher: He, Settings: Je },
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
    ...B.methods
  }
}, Li = { key: 1 }, Xi = ["value", "checked"], qi = { key: 1 };
function zi(e, t, s, i, n, o) {
  const l = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), p = u("el-table-column"), S = u("el-button"), v = u("el-table"), E = u("x-pagination"), R = u("el-collapse-item"), D = u("el-collapse"), M = ne("loading");
  return d(), y("div", {
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
      default: c(() => [
        f(R, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (d(), y("span", Li, A(e.title), 1))
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
            }), H({
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
                  w(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  w(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : g("", !0),
            T((d(), m(v, _({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: c(() => [
                (d(!0), y(O, null, F(e._visibleColumns, (b, V) => (d(), m(p, _(b, {
                  key: V,
                  "min-width": b.minWidth,
                  align: b.align || e._attrs.tableAlign || "center",
                  resizable: b.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(b)
                }), H({ _: 2 }, [
                  ["selection", "index"].includes(b.type) ? void 0 : {
                    name: "default",
                    fn: c((C) => [
                      b.type === "radio" ? (d(), y("input", {
                        key: 0,
                        type: "radio",
                        value: C.$index,
                        checked: C.$index === n.checked,
                        onChange: t[1] || (t[1] = (...N) => e.handleCheckedChange && e.handleCheckedChange(...N))
                      }, null, 40, Xi)) : b.slot ? w(e.$slots, b.slot, {
                        key: 1,
                        scope: C,
                        column: b,
                        value: C.row[b.prop]
                      }) : e.slotAll ? w(e.$slots, "all", {
                        key: 2,
                        scope: C,
                        column: b,
                        value: C.row[b.prop]
                      }) : (d(), y(O, { key: 3 }, [
                        b.comp === "ElSwitch" || e.table.isRowEdit && C.row.isEditing && (b.visible !== !1 || b.canEdit) ? (d(), m(G(b.comp || "ElInput"), _({ key: 0 }, { ...b, ...b.formAttrs }, {
                          modelValue: C.row[b.prop],
                          "onUpdate:modelValue": (N) => C.row[b.prop] = N,
                          disabled: !C.row.editable || !C.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), y("span", qi, A(e.calcValue(C.row, b)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? g("", !0) : (d(), m(p, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: c((b) => [
                    w(e.$slots, "operates-prefix", { scope: b }),
                    e.canEdit(b.row) ? (d(), m(S, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (V) => e._emit("edit", b)
                    }), {
                      default: c(() => [
                        f(a, { name: "edit" }),
                        $(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : g("", !0),
                    e.canSave(b.row) ? T((d(), m(S, _({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: b.row._loading,
                      onClick: (V) => e._emit("row-edit", b)
                    }), {
                      default: c(() => [
                        f(a, { name: "collection" }),
                        $(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [M, b.row._loading]
                    ]) : g("", !0),
                    e.canCancelEdit(b.row) ? (d(), m(S, _({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (V) => e._emit("cancel-edit", b)
                    }), {
                      default: c(() => [
                        f(a, { name: "refresh-left" }),
                        $(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : g("", !0),
                    e.canDelete(b.row) ? (d(), m(S, _({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (V) => e._emit("delete", b)
                    }), {
                      default: c(() => [
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
              [M, e._loading]
            ]),
            e._query && e._total ? (d(), m(E, {
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
const Wi = /* @__PURE__ */ k(Pi, [["render", zi]]);
const Hi = {
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
}, Ji = { class: "mobile-x-table-tools" }, Ki = { class: "tools" }, Yi = { class: "tools-end" };
function Gi(e, t, s, i, n, o) {
  const l = u("mobile-x-icon"), a = u("van-button"), r = ne("domid");
  return d(), y("div", Ji, [
    j("div", Ki, [
      w(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? T((d(), m(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[0] || (t[0] = (h) => e.$emit("search"))
      }), {
        default: c(() => [
          f(l, { name: "search" }),
          $(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.search]
      ]) : g("", !0),
      e.$attrs.onAdd ? T((d(), m(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
        onClick: t[1] || (t[1] = (h) => e.$emit("add"))
      }), {
        default: c(() => [
          f(l, { name: "circle-plus-filled" }),
          $(" 新增 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.add]
      ]) : g("", !0),
      e.$attrs.onMultiEdit ? T((d(), m(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          f(l, { name: "edit" }),
          $(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["multi-edit"]]
      ]) : g("", !0),
      e.$attrs.onMultiDelete ? T((d(), m(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          f(l, { name: "DeleteFilled" }),
          $(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["multi-delete"]]
      ]) : g("", !0),
      e.$attrs.onExport ? T((d(), m(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (h) => e.$emit("export"))
      }), {
        default: c(() => [
          f(l, { name: "printer" }),
          $(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.export]
      ]) : g("", !0),
      e.$attrs.onSearchExport ? T((d(), m(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
      }), {
        default: c(() => [
          f(l, { name: "printer" }),
          $(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids["search-export"]]
      ]) : g("", !0),
      e.$attrs.onImport ? T((d(), m(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (h) => e.$emit("import"))
      }), {
        default: c(() => [
          f(l, { name: "UploadFilled" }),
          $(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [r, s.domids.import]
      ]) : g("", !0),
      w(e.$slots, "tools-suffix", {}, void 0, !0),
      j("div", Yi, [
        w(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const Qi = /* @__PURE__ */ k(Hi, [["render", Gi], ["__scopeId", "data-v-442404e2"]]);
const Zi = {
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
}, eo = { class: "tools" }, to = { class: "tools-end flex-center" };
function so(e, t, s, i, n, o) {
  const l = u("pc-x-icon"), a = u("el-button"), r = u("el-card"), h = ne("domid");
  return d(), m(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      j("div", eo, [
        w(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? T((d(), m(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (p) => e.$emit("search"))
        }), {
          default: c(() => [
            f(l, { name: "search" }),
            $(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : g("", !0),
        e.$attrs.onAdd ? T((d(), m(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (p) => e.$emit("add"))
        }), {
          default: c(() => [
            f(l, { name: "circle-plus-filled" }),
            $(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : g("", !0),
        e.$attrs.onMultiEdit ? T((d(), m(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (p) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            f(l, { name: "edit" }),
            $(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : g("", !0),
        e.$attrs.onMultiDelete ? T((d(), m(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (p) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            f(l, { name: "DeleteFilled" }),
            $(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : g("", !0),
        e.$attrs.onExport ? T((d(), m(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (p) => e.$emit("export"))
        }), {
          default: c(() => [
            f(l, { name: "printer" }),
            $(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : g("", !0),
        e.$attrs.onSearchExport ? T((d(), m(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (p) => e.$emit("search-export"))
        }), {
          default: c(() => [
            f(l, { name: "printer" }),
            $(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : g("", !0),
        e.$attrs.onImport ? T((d(), m(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (p) => e.$emit("import"))
        }), {
          default: c(() => [
            f(l, { name: "UploadFilled" }),
            $(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : g("", !0),
        w(e.$slots, "tools-suffix", {}, void 0, !0),
        j("div", to, [
          w(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const no = /* @__PURE__ */ k(Zi, [["render", so], ["__scopeId", "data-v-02d70f98"]]);
function io(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Oe(e);
}
const oo = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, i = (n) => {
    n ? e._data.forEach((l, a) => e.selected.add(a)) : e.selected.clear();
    const o = n ? e._data.slice() : [];
    e.handleSelectionChange(o);
  };
  return f(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: i
  }, null);
}, lo = (e, t) => {
  const {
    rowIndex: s,
    rowData: i
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const o = [...t.selected].map((l) => t._data[l]);
    t.handleSelectionChange(o);
  };
  return f(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, ao = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, ro = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return f("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, ie = ([e, t, s, i, n, o]) => {
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
    type: i
  }, t._attrs[s + "-btn"], {
    onClick: r
  }), {
    default: () => [f(u("x-icon"), {
      name: n
    }, null), o]
  });
}, co = (e, t) => {
  if (t.canEdit(e.rowData))
    return ie([e, t, "edit", "warning", "edit", "编辑"]);
}, uo = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return ie([e, t, "row-edit", "success", "collection", "保存"]);
}, ho = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return ie([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, po = (e, t) => {
  if (t.canDelete(e.rowData))
    return ie([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, mo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (o) => lo(o, t);
  if (e.type === "index")
    return (o) => ao(o, t);
  if (e.type === "radio")
    return (o) => ro(o, t);
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
      const p = (v) => {
        l[a.prop] = v;
      }, S = a.comp || "ElInput";
      return X(u(S), {
        ...a,
        ...a.formAttrs,
        modelValue: l[a.prop],
        onInput: p,
        disabled: !l.editable || !l.isEditing
      });
    }
    const r = t.calcValue(o.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? f(u("el-tooltip"), {
      content: r
    }, io(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, fo = (e, t) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = oo(t)), r.cellRenderer = mo(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(o) {
      return f("div", {
        class: "operates"
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, co(o, t), uo(o, t), ho(o, t), po(o, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), n;
}, _o = {
  convertColumnsForTableV2: fo
};
const bo = {
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
  components: { Searcher: He, Settings: Je },
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
    convertColumnsForTableV2: _o.convertColumnsForTableV2
  }
}, go = { key: 1 };
function yo(e, t, s, i, n, o) {
  const l = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), p = u("el-table-v2"), S = u("el-auto-resizer"), v = u("x-pagination"), E = u("el-collapse-item"), R = u("el-collapse"), D = ne("loading");
  return d(), y("div", {
    class: J(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    f(l, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (M) => e._emit("search", M))
    }, null, 8, ["uid", "columns", "config"]),
    f(R, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (M) => n.activeNames = M),
      class: J((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        f(E, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (d(), y("span", go, A(e.title), 1))
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
            }), H({
              "tools-end": c(() => [
                f(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                f(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (M) => n.settings = M),
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
                  w(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  w(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : g("", !0),
            f(S, {
              style: Ze({ height: s.height })
            }, {
              default: c(({ width: M, height: b }) => [
                T((d(), m(p, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: o.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: M,
                  height: b
                }), H({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: c(() => [
                      w(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: c(() => [
                      w(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: c(() => [
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
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), m(v, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (M) => e._emit("search"))
            }, null, 8, ["query", "total"])) : g("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const vo = /* @__PURE__ */ k(bo, [["render", yo]]);
const re = ["selection", "radio"], wo = {
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
}, So = { class: "x-table-viewer" };
function ko(e, t, s, i, n, o) {
  const l = u("x-dialog");
  return d(), y("div", So, [
    f(l, _(o._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": o.handleBeforeClose,
      onSubmit: o.handleSubmit,
      onCancel: o.handleCancel
    }), {
      default: c(() => [
        (d(), m(G(s.useTableV2 ? "x-table-v2" : "x-table"), _({
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
const $o = /* @__PURE__ */ k(wo, [["render", ko], ["__scopeId", "data-v-f5d31400"]]), Co = {
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
}, Eo = { class: "x-tinymce" }, xo = ["id", "innerHTML"];
function Vo(e, t, s, i, n, o) {
  return d(), y("div", Eo, [
    j("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, xo)
  ]);
}
const Ao = /* @__PURE__ */ k(Co, [["render", Vo]]);
const Oo = {
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
}, be = (e) => (je("data-v-fe069681"), e = e(), Me(), e), jo = { class: "mask" }, Mo = {
  key: 0,
  class: "el-upload__text"
}, Ro = /* @__PURE__ */ be(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), Fo = /* @__PURE__ */ be(() => /* @__PURE__ */ j("br", null, null, -1)), To = /* @__PURE__ */ be(() => /* @__PURE__ */ j("br", null, null, -1)), Bo = {
  key: 0,
  class: "path"
};
function No(e, t, s, i, n, o) {
  const l = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), m(r, _({
    "file-list": n.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (h) => n.fileList = h),
    drag: "",
    disabled: n.disabled,
    action: o.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": o.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: c(() => [
      j("div", jo, [
        f(l, { name: "upload-filled" }),
        n.disabled ? g("", !0) : (d(), y("div", Mo, [
          $(" 将文件拖到此处，或"),
          Ro,
          Fo,
          To,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), m(a, {
            key: 0,
            type: "success",
            onClick: K(o.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              $(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : g("", !0)
        ]))
      ]),
      o.filepath ? (d(), y("div", Bo, A(s.modelValue), 1)) : g("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Do = /* @__PURE__ */ k(Oo, [["render", No], ["__scopeId", "data-v-fe069681"]]);
const Io = {
  name: "XImageUploader",
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    action: String
  },
  emits: ["update:modelValue"],
  data() {
    return {
      disabled: !1,
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
      pe({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, Uo = ["src"];
function Po(e, t, s, i, n, o) {
  const l = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("el-dialog");
  return d(), y(O, null, [
    f(r, _({
      "file-list": s.modelValue,
      "onUpdate:fileList": t[0] || (t[0] = (p) => e.$emit("update:modelValue", p)),
      disabled: n.disabled,
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: o.limit,
      class: "x-image-uploader",
      "on-preview": o.handlePreview,
      "on-exceed": o.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1
    }), {
      default: c(() => [
        f(a, null, {
          default: c(() => [
            f(l)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "disabled", "action", "multiple", "limit", "on-preview", "on-exceed", "auto-upload"]),
    f(h, {
      modelValue: n.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (p) => n.dialogVisible = p),
      title: "预览图片" + n.previewingImage.name
    }, {
      default: c(() => [
        j("img", {
          src: n.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, Uo)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const Lo = /* @__PURE__ */ k(Io, [["render", Po], ["__scopeId", "data-v-903decb1"]]), de = {
  xactionsheet: $t,
  xautorows: At,
  mobilexbutton: Mt,
  pcxbutton: Tt,
  xchart: It,
  mobilexcheckboxs: Lt,
  pcxcheckboxs: zt,
  mobilexcol: Jt,
  pcxcol: Gt,
  mobilexdialog: es,
  pcxdialog: is,
  xdistrictselect: as,
  mobilexform: bs,
  pcxform: ws,
  mobilexformitem: Cs,
  pcxformitem: Es,
  mobilexicon: Os,
  pcxicon: Fs,
  xinfo: Mn,
  xlooper: Bn,
  mobilexpagination: In,
  pcxpagination: Ln,
  xpicker: zn,
  mobilexradios: Jn,
  pcxradios: Gn,
  mobilexrow: ti,
  pcxrow: oi,
  mobilexselect: ci,
  pcxselect: _i,
  mobilextable: Oi,
  pcxtable: Wi,
  mobilextabletools: Qi,
  pcxtabletools: no,
  xtablev2: vo,
  xtableviewer: $o,
  xtinymce: Ao,
  xfileuploader: Do,
  ximageuploader: Lo
}, te = {};
for (let e in de)
  te[de[e].name] = de[e];
const Xo = (e) => ({
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
    return X(u(this.name), {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), he = (() => {
  const e = Object.keys(te), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = te[i]);
  for (const i of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(i.toLowerCase())) ? s[i] = Xo(i) : s[i] = te[i];
  return s;
})(), qo = (e, t) => {
  for (let s in he)
    e.component(s, he[s]);
}, Wo = {
  version: "1.0.45",
  ...he,
  ...Pe,
  ...wt,
  install: qo
};
export {
  Le as BaseController,
  ut as Confirm,
  Xe as CrudController,
  pe as Message,
  ct as Notify,
  vt as TempCrudController,
  Te as baseDialog,
  Re as baseForm,
  bt as baseModel,
  Fe as baseTable,
  wt as controllers,
  Wo as default,
  st as effects,
  P as formatOptions,
  nt as formatPrecision,
  Ie as initDefaultForm,
  Ne as initDialog,
  me as initForm,
  De as initFormRules,
  gt as initModel,
  Be as initTable,
  Ue as triggers,
  Pe as utils
};
