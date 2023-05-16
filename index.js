import { toRaw as ze, watch as Ce, nextTick as K, resolveComponent as u, openBlock as r, createBlock as p, mergeProps as _, createElementBlock as y, Fragment as A, renderList as O, withCtx as d, renderSlot as w, toDisplayString as E, useCssVars as Ee, createTextVNode as $, createSlots as X, resolveDynamicComponent as W, createCommentVNode as b, createVNode as f, normalizeProps as G, guardReactiveProps as Ve, normalizeClass as q, h as L, isVNode as xe, createElementVNode as x, withModifiers as H, pushScopeId as ce, popScopeId as de, resolveDirective as Q, withDirectives as R, normalizeStyle as Le } from "vue";
const We = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, B = (e, t) => {
  const s = e.__v_isRef ? e.value : ze(e);
  let i = s;
  if (typeof s[0] != "object" && (i = s.map((o) => ({ text: o, value: o }))), !t.sort)
    return i;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((o, l) => o[n].localeCompare(l[n]));
}, { ElMessage: He, ElNotification: Je, ElMessageBox: Ke } = window.ElementPlus || {}, { showToast: Ye, showNotify: Ge, showConfirmDialog: Qe } = window.vant || {}, Ze = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? ((i === "error" || i === "warning") && (t.type = "fail"), Ye(t)) : He({
    showClose: !0,
    ...t
  });
}, et = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? (i === "error" && (t.type = "danger"), Ge(t)) : Je({
    showClose: !0,
    ...t
  });
}, tt = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = Qe(e) : t = Ke.confirm(
    e.message || "",
    e.title || "",
    {
      draggable: !0,
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: e.type || "info"
    }
  ), t.then(() => !0).catch(() => !1);
}, Ae = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), Oe = (e = {}) => ({
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
}), je = () => ({
  ...Ae(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), st = () => ({
  table: Oe(),
  dialog: je()
}), { funcs: le } = StardustJs, nt = (e, t) => (Object.values(e).forEach((s) => {
  !s || typeof s != "object" || (s._isBaseTable ? Me(s, t) : s._isBaseDialog ? Re(s, t) : s._isBaseForm && ue(s, t));
}), e), Me = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), Re = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), ue(e, t), e), ue = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((i) => i.visible !== !1)), Te(e.form, e.formItems), e.initialForm = le.deepCopy(e.form), e.initialFormRules = le.deepCopy(e.formRules), Ce(() => e.formItems, () => {
  Fe(e);
}, { immediate: !0, deep: !0 }), e), Fe = (e) => {
  const { formItems: t, initialFormRules: s } = e, i = t.filter((o) => {
    let { formAttrs: l = {}, required: a = !1 } = o;
    return a = "required" in l ? l.required : a, !o.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(o.prop) && a !== !1;
  }).map((o) => o.prop);
  if (Object.assign(e.formRules, le.deepCopy(s)), Object.keys(e.formRules).forEach((o) => {
    o in s || delete e.formRules[o];
  }), !i.length)
    return;
  const n = {};
  return i.forEach((o) => {
    if (e.formRules[o])
      return;
    const l = t.find((j) => j.prop === o), a = l.platform || e.platform || (window.isMobile ? "mobile" : "pc"), c = De[a], h = [], g = { required: !0, message: `请${"options" in l ? "选择" : "输入"}${(l == null ? void 0 : l.label) || o}` };
    l.validator && (g.validator = l.validator), l.asyncValidator && (g.asyncValidator = l.asyncValidator), l.comp ? h.push({ ...g, trigger: c.change }) : h.push({ ...g, trigger: c.blur }), l.comp === "ElInputNumber" && h.push({ ...g, trigger: c.blur }), n[o] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, Te = (e, t, s = !0) => {
  const i = {};
  return t.forEach((n) => {
    var h;
    let o = "";
    const { type: l, options: a } = n, { multiple: c } = n.formAttrs || {};
    if (s && l === "number" || n.comp === "ElInputNumber")
      o = 0;
    else if (n.comp === "ElSwitch")
      o = !1;
    else if (a && ((h = n.comp) != null && h.endsWith("XCheckboxs") || c))
      o = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const m = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + m), n["end-placeholder"] || (n["end-placeholder"] = "结束" + m), o = [];
    }
    i[n.prop] = o;
  }), Object.assign(e, { ...i, ...e }), e;
}, De = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, Ie = {
  formatPrecision: We,
  formatOptions: B,
  Message: Ze,
  Notify: et,
  Confirm: tt,
  baseForm: Ae,
  baseTable: Oe,
  baseDialog: je,
  baseModel: st,
  initModel: nt,
  initTable: Me,
  initDialog: Re,
  initForm: ue,
  initFormRules: Fe,
  initDefaultForm: Te,
  triggers: De
};
class Be {
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
    K(this.onInit);
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
    return Ie;
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
const { funcs: te, highdict: fe, dates: se } = StardustJs, { file: _e, excel: J } = StardustBrowser;
class Ne extends Be {
  constructor(t) {
    super(t);
    const { model: s, table: i, dialog: n, dbModelName: o = "", idField: l = "id", listProp: a = "data" } = t;
    this.table = i || (s == null ? void 0 : s.table) || null, this.dialog = n || (s == null ? void 0 : s.dialog) || null, this.dbModelName = o, this.idField = l, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], K(() => {
      this.router.afterEach(() => {
        this._unwatchs.forEach((c) => c());
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
    let i = fe.get(s, this.listProp);
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
    }), await K(), await te.sleep(50);
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
    }), await K(), (i = this.dialog.formRef) == null || i.validate().catch(Function()));
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
    const { list: i, selection: n, columns: o } = this.table;
    let l = o;
    l = l.filter((g) => g.type !== "selection");
    let a = n.length > 0 ? n : i;
    a = te.deepCopy(a), a = this.processExportingData(a);
    const c = Object.keys(a[0]);
    l = l.filter((g) => c.includes(g.prop));
    const h = l.map((g) => g.prop), m = this.processExportingHeader(l.map((g) => g.label));
    a = a.map((g) => h.map((j) => g[j]));
    let k = null;
    t === "csv" ? k = J.export2Csv : k = J.export2Excel, k({ header: m, data: a, filename: s }), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      this.uiUtils.Message({ type: "error", message: "不支持的导出类型" });
      return;
    }
    this._isExporting = !0;
    const i = await this.dbTable.search(this.getSearchExportParams()), n = this.processExportingHeader(i.data.length && Object.keys(i.data[0]) || [], "search");
    let o = i.data.map((a) => Object.values(a));
    o = te.deepCopy(o), o = this.processExportingData(o, "search");
    let l = null;
    t === "csv" ? l = J.export2Csv : l = J.export2Excel, l({ header: n, data: o, filename: s }), this._isExporting = !1;
  }
  async handleImport() {
    const t = await _e.select(".xls,.xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), i = await _e.toType(t, s ? "text" : "arraybuffer");
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
        const c = {};
        return l.forEach((h) => c[o[h]] = a[h]), c;
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
      let o = i[n.model];
      n.type === "number" ? o = this.uiUtils.formatPrecision(o, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? o = se.format(o) : (!n.type || n.type === "date") && (o = se.format(o, "", !1))), i[n.model] = o;
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
    return Object.assign({}, this.getSearchParams(), { page: 1, limit: -1 });
  }
  afterSearch(t, s, i) {
    const n = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && n !== this._lastSearchParams) {
      const { page: o, limit: l, order: a, count: c, ...h } = s;
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
    const { columns: i, query: n } = this.table, { page: o, limit: l } = n;
    return t.forEach((a, c) => {
      a._idx = c + 1, a._index = (o - 1) * l + c + 1;
    }), i.forEach((a) => {
      let { prop: c, options: h } = a;
      const { format: m, formatter: k, autoFill: g } = a.tableAttrs || {}, { modelName: j } = a.formAttrs || {};
      if (j && g)
        t.forEach((M) => M[`_formatted_${c}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && m !== !1) {
        const P = Ce(() => a.options, (T, v) => {
          const V = v ? this.table.list : t, C = ot(a);
          V.forEach((N) => {
            const ee = N[c];
            N[`_formatted_${c}`] = C[ee] || (k == null ? void 0 : k(ee)) || ee;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(P);
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
    const c = fe.mapField(a.data, l, o);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = c[h[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingHeader(t, s = "current") {
    return s === "search" ? t.map((i) => {
      const n = this.table.columns.find((o) => o.prop === i);
      return n ? n.label : i;
    }) : t;
  }
  processExportingData(t, s = "current") {
    if (!t.length)
      return t;
    const i = Object.keys(t[0]);
    return t.forEach((n) => {
      i.forEach((o) => {
        const l = n[o];
        typeof l == "boolean" ? n[o] = l && 1 || 0 : l instanceof Date ? (n[o] = se.format(l), n[o].endsWith(" 00:00:00") && (n[o] = n[o].slice(0, -9))) : typeof l == "object" && (n[o] = JSON.stringify(l));
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
const ot = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: n = "value" } = s, o = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((l) => {
    o[l[n]] = l[i];
  }), o;
};
class it extends Ne {
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
const lt = {
  BaseController: Be,
  CrudController: Ne,
  TempCrudController: it
}, S = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, n] of t)
    s[i] = n;
  return s;
}, at = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function rt(e, t, s, i, n, o) {
  const l = u("van-action-sheet");
  return r(), p(l, _(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const ct = /* @__PURE__ */ S(at, [["render", rt]]), dt = {
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
}, ut = { class: "x-auto-rows" }, ht = { key: 1 };
function pt(e, t, s, i, n, o) {
  const l = u("XCol"), a = u("XRow");
  return r(), y("div", ut, [
    (r(!0), y(A, null, O(o.rows, (c, h) => (r(), p(a, _({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: d(() => [
        (r(!0), y(A, null, O(c, (m, k) => (r(), p(l, _(m, {
          span: m.span || s.span,
          key: k,
          platform: e.$attrs.platform
        }), {
          default: d(() => [
            m.slot || e.$attrs.slot ? w(e.$slots, m.slot || e.$attrs.slot, {
              key: 0,
              col: m
            }) : (r(), y("span", ht, E(m.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const mt = /* @__PURE__ */ S(dt, [["render", pt]]), ft = {
  name: "MobileXButton"
};
function _t(e, t, s, i, n, o) {
  const l = u("van-button");
  return r(), p(l, null, {
    default: d(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  });
}
const bt = /* @__PURE__ */ S(ft, [["render", _t]]), gt = {
  name: "PcXButton"
};
function yt(e, t, s, i, n, o) {
  const l = u("el-button");
  return r(), p(l, null, {
    default: d(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  });
}
const vt = /* @__PURE__ */ S(gt, [["render", yt]]);
const { funcs: wt } = StardustBrowser, he = {
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
      return wt.calcPixel(this.height) * this.zoom + "px";
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
}, be = () => {
  Ee((e) => ({
    "127c024a": e.zoomedHeight,
    "137ee0b8": e.zoom
  }));
}, ge = he.setup;
he.setup = ge ? (e, t) => (be(), ge(e, t)) : be;
const St = {
  class: "x-chart",
  ref: "el"
};
function kt(e, t, s, i, n, o) {
  return r(), y("div", St, null, 512);
}
const $t = /* @__PURE__ */ S(he, [["render", kt], ["__scopeId", "data-v-0c2da986"]]), Ct = {
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
    formatOptions: B
  }
};
function Et(e, t, s, i, n, o) {
  const l = u("van-checkbox"), a = u("van-checkbox-group");
  return r(), p(a, _({ class: "mobile-x-checkboxs" }, o.attrs, { direction: s.direction }), {
    default: d(() => [
      (r(!0), y(A, null, O(o.formatOptions(s.options, this), (c) => (r(), p(l, _(o.attrs, {
        key: c[s.text],
        shape: s.shape,
        name: c[s.value]
      }), {
        default: d(() => [
          $(E(c[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Vt = /* @__PURE__ */ S(Ct, [["render", Et]]), xt = {
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
    formatOptions: B
  }
};
function At(e, t, s, i, n, o) {
  const l = u("el-checkbox"), a = u("el-checkbox-group");
  return r(), p(a, _({ class: "pc-x-checkboxs" }, o.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (c) => e.$emit("update:modelValue", c))
  }), {
    default: d(() => [
      (r(!0), y(A, null, O(o.formatOptions(s.options, this), (c) => (r(), p(l, _(o.attrs, {
        key: c[s.text],
        label: c[s.value]
      }), {
        default: d(() => [
          $(E(c[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const Ot = /* @__PURE__ */ S(xt, [["render", At]]), jt = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Mt(e, t, s, i, n, o) {
  const l = u("van-col");
  return r(), p(l, _(o.attrs, { class: "mobile-x-col" }), {
    default: d(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Rt = /* @__PURE__ */ S(jt, [["render", Mt]]), Ft = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Tt(e, t, s, i, n, o) {
  const l = u("el-col");
  return r(), p(l, _(o.attrs, { class: "pc-x-col" }), {
    default: d(() => [
      w(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Dt = /* @__PURE__ */ S(Ft, [["render", Tt]]), It = {
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
function Bt(e, t, s, i, n, o) {
  const l = u("van-dialog");
  return r(), p(l, _({ width: "92%" }, e.$attrs, {
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
const Nt = /* @__PURE__ */ S(It, [["render", Bt]]), Pt = {
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
}, Ut = {
  key: 1,
  class: "el-dialog__title"
};
function Xt(e, t, s, i, n, o) {
  const l = u("x-icon"), a = u("el-button");
  return r(), p(W(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: o.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (c) => o.visible = c),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: d(() => [
      e.$slots.header ? w(e.$slots, "header", { key: 0 }) : (r(), y("span", Ut, E(e.$attrs.title), 1)),
      s.drawer ? b("", !0) : (r(), p(l, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: o.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: d(() => [
      e.$slots.footer ? w(e.$slots, "footer", { key: 0 }) : b("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (r(), p(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (c) => e.$emit("submit"))
      }, {
        default: d(() => [
          $(E(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : b("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (r(), p(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (c) => e.$emit("cancel"))
      }, {
        default: d(() => [
          $(E(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : b("", !0)
    ]),
    default: d(() => [
      e.$slots.default ? w(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const qt = /* @__PURE__ */ S(Pt, [["render", Xt]]), D = {}, U = {
  provinces: [],
  cities: [],
  counties: []
}, zt = {
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
      provinces: Object.freeze(U.provinces),
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
      this.cities = Object.freeze(U.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(U.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(D, this.areaList), U.provinces = Object.entries(D.province_list).map((e) => ({ value: e[0], text: e[1] })), U.cities = Object.entries(D.city_list).map((e) => ({ value: e[0], text: e[1] })), U.counties = Object.entries(D.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(U.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const i = Object.entries(D.province_list).find((n) => n[1] === e);
        this.province = i == null ? void 0 : i[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const i = Object.entries(D.city_list).find((n) => n[1] === t);
        this.city = i == null ? void 0 : i[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const i = Object.entries(D.county_list).find((n) => n[1] === s);
        this.county = i == null ? void 0 : i[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && D.province_list[this.province] || "",
        this.number > 1 && this.city && D.city_list[this.city] || "",
        this.number > 2 && this.county && D.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function Lt(e, t, s, i, n, o) {
  const l = u("x-select"), a = u("x-col"), c = u("x-row");
  return r(), p(c, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: d(() => [
      f(a, { span: o.span }, {
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
      o.number > 1 ? (r(), p(a, {
        key: 0,
        span: o.span
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
      }, 8, ["span"])) : b("", !0),
      o.number > 2 ? (r(), p(a, {
        key: 1,
        span: o.span
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
      }, 8, ["span"])) : b("", !0)
    ]),
    _: 1
  });
}
const Wt = /* @__PURE__ */ S(zt, [["render", Lt]]);
function Ht() {
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
function Jt() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function Kt() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function Yt() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function Gt(e) {
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
}
function Qt(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function Zt(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const z = {
  props: Ht,
  computed: {
    _model: Jt,
    _items: Kt,
    _rules: Yt
  },
  methods: {
    calcPlaceholder: Gt,
    calcStyle: Qt,
    formatModelValue: Zt
  }
}, es = {
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
function ts(e, t, s, i, n, o) {
  const l = u("mobile-x-form-item"), a = u("van-cell-group"), c = u("van-form");
  return r(), p(c, {
    ref: "formRef",
    class: "mobile-x-form"
  }, {
    default: d(() => [
      e.$slots.pre ? w(e.$slots, "pre", { key: 0 }) : b("", !0),
      f(a, G(Ve(e.$attrs)), {
        default: d(() => [
          (r(!0), y(A, null, O(e._items, (h, m) => (r(), p(l, _(h, {
            rules: e._rules[h.prop] || h.rules,
            key: m,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (k) => e._model[h.prop] = k,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: d(() => [
              h.slot ? w(e.$slots, h.slot, G(_({ key: 0 }, h))) : b("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? w(e.$slots, "default", { key: 1 }) : b("", !0)
    ]),
    _: 3
  }, 512);
}
const ss = /* @__PURE__ */ S(es, [["render", ts]]), ns = {
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
}, os = { key: 1 };
function is(e, t, s, i, n, o) {
  const l = u("pc-x-form-item"), a = u("el-form"), c = u("el-collapse-item"), h = u("el-collapse");
  return r(), p(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: q((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: d(() => [
      f(c, {
        name: n.activeNames[0]
      }, {
        title: d(() => [
          e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (r(), y("span", os, E(s.title), 1))
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
              e.$slots.pre ? w(e.$slots, "pre", { key: 0 }) : b("", !0),
              (r(!0), y(A, null, O(e._items, (m, k) => (r(), p(l, _(m, {
                key: k,
                modelValue: e._model[m.prop],
                "onUpdate:modelValue": [(g) => e._model[m.prop] = g, (g) => m.onChange || null],
                "label-width": s.labelWidth,
                prop: m.prop || m.model,
                clearable: m.clearable !== !1,
                placeholder: e.calcPlaceholder(m),
                style: e.calcStyle(m),
                "show-tooltip": e.$attrs.showTooltip || !1
              }), {
                default: d(() => [
                  m.slot ? w(e.$slots, m.slot, { key: 0 }) : b("", !0)
                ]),
                _: 2
              }, 1040, ["modelValue", "onUpdate:modelValue", "label-width", "prop", "clearable", "placeholder", "style", "show-tooltip"]))), 128)),
              e.$slots.default ? w(e.$slots, "default", { key: 1 }) : b("", !0)
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
const ls = /* @__PURE__ */ S(ns, [["render", is]]);
function ye(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !xe(e);
}
const ae = (e) => {
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
    text: c
  } = t;
  const h = {
    ...i,
    "onUpdate:modelValue": (k) => n("update:modelValue", k)
  }, m = [];
  return l === "html" ? h.class = "comp-html" : o = u(o), a && (h.innerHTML = a), c && m.push(c), L(o, h, {
    default: () => m
  });
}, as = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: n,
    $slots: o
  } = e, {
    slot: l,
    showTooltip: a,
    placeholder: c
  } = t;
  if (l && !s.label)
    return o.default();
  let h = null;
  if (a) {
    let m;
    h = f(u("el-tooltip"), {
      effect: "dark",
      content: c,
      placement: "bottom"
    }, ye(m = ae(e)) ? m : {
      default: () => [m]
    });
  } else
    h = ae(e);
  return f(u("el-form-item"), null, ye(h) ? h : {
    default: () => [h]
  });
}, rs = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: n,
    $slots: o,
    mValue: l
  } = e, {
    slot: a,
    comp: c,
    modelValue: h
  } = t;
  if (a && !s.label)
    return o.default({
      ...t,
      ...s
    });
  const m = {
    modelValue: l,
    "onUpdate:modelValue": (k) => n("update:modelValue", k)
  };
  return a && s.label || c ? L(u("van-field"), m, {
    input: () => a && s.label ? o.default() : ae(e)
  }) : (Object.assign(m, i), L(u("van-field"), m));
}, cs = {
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
        var t, s;
        ((t = this.comp) != null && t.endsWith("XSelect") || (s = this.comp) != null && s.endsWith("x-select")) && this.$emit("update:modelValue", e);
      }
    }
  },
  render() {
    return rs(this);
  }
};
const pe = {
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
        showTooltip: c,
        required: h,
        format: m,
        style: k,
        html: g,
        class: j,
        ...M
      } = { ...this.$props, ...this.$attrs };
      return M;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return as(this);
  }
}, ve = () => {
  Ee((e) => ({
    ba9709f0: e.width
  }));
}, we = pe.setup;
pe.setup = we ? (e, t) => (ve(), we(e, t)) : ve;
const ds = /* @__PURE__ */ S(pe, [["__scopeId", "data-v-d2cde1e2"]]), Se = /* @__PURE__ */ Object.assign({}), us = {
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
      await Promise.all(Object.keys(Se).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await Se[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, hs = ["src"];
function ps(e, t, s, i, n, o) {
  const l = u("van-icon");
  return n.icons[s.name] ? (r(), y("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, hs)) : (r(), p(l, _({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const ms = /* @__PURE__ */ S(us, [["render", ps]]), ke = /* @__PURE__ */ Object.assign({}), fs = {
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
      await Promise.all(Object.keys(ke).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await ke[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, _s = ["src"];
function bs(e, t, s, i, n, o) {
  const l = u("el-icon");
  return n.icons[s.name] ? (r(), y("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, _s)) : (r(), p(l, G(_({ key: 1 }, e.$attrs)), {
    default: d(() => [
      (r(), p(W(s.name)))
    ]),
    _: 1
  }, 16));
}
const gs = /* @__PURE__ */ S(fs, [["render", bs]]), { highdict: ys } = StardustJs, { storage: vs } = StardustBrowser, { local: Pe } = vs, me = ["index", "selection", "expand", "radio", "_index"];
function ws() {
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
function Ss() {
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
function ks() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = { ...this.$attrs };
  return t in this && Object.assign(s, this[t]), s;
}
function $s() {
  const e = {};
  return ["search", "add", "multi-edit", "multi-delete", "export", "search-export", "import"].forEach((s) => e[s] = s), { ...e, ...this.$attrs.domids };
}
function Cs() {
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
function Es() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function Vs() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function xs() {
  const { $props: e, _query: t } = this, { table: s, columns: i } = e;
  return (i || (s == null ? void 0 : s.columns) || []).map((o) => o.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(l) {
      const { page: a, limit: c } = t;
      return (a - 1) * c + l + 1;
    }
  }, o, { type: "index" }) : o.type === "radio" ? Object.assign({ width: 60, label: "单选" }, o) : Object.assign({}, o, o.tableAttrs));
}
function As() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Os() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function js() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Ms() {
  return this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function Rs() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Fs() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function Ts() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function Ds() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function Is() {
  return this.onMultiEdit || this._listen["multi-edit"] ? () => this._emit("multi-edit") : null;
}
function Bs() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function Ns() {
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
function Ps() {
  const e = this._columns.filter((s) => s.type && me.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const i = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...i,
      width: s.width || i.width
    };
  });
  return e.concat(t);
}
function Us() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function Xs() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function qs() {
  return this._columns.filter((e) => !e.type || !me.includes(e.type));
}
function zs() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function Ls() {
  const e = this._uid && Pe.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns = e.columns || this._columns.filter((t) => !t.type || !me.includes(t.type)).map((t) => {
    const { prop: s, label: i, show: n, hide: o, width: l } = t;
    return { prop: s, label: i, show: n, hide: o, width: l };
  }), this.settings = e;
}
function Ws(e) {
  Pe.setJson(`Settings[${this._uid}]`, e);
}
function Hs(e, t) {
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
      return typeof n == "function" ? n(o, e, t) : ys.get(e, n);
  }
  return o;
}
function Js(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function Ks(e) {
  this.params = e, this._emit("search", e);
}
function Ys(e) {
  this.saveSettings(e), this.initSettings();
}
function Gs(e, t, s, i) {
  const n = this.settings.columns.find((o) => o.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function Qs(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Zs(...e) {
  var t, s;
  this.onSortChange ? this.onSortChange(...e) : e[0].column.sortable === "custom" && ((s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, ...e));
}
function en(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function tn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function sn(e) {
  var i;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function nn(e) {
  var i;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function on(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function ln(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function an(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function rn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function cn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function dn(e, t) {
  const s = "on" + e.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function un() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const F = {
  props: ws,
  emits: Ss,
  computed: {
    _attrs: ks,
    domids: $s,
    elTableAttrs: Cs,
    _loading: Es,
    _data: Vs,
    _columns: xs,
    _query: As,
    _total: Os,
    _selection: js,
    _onSearch: Ms,
    _onAdd: Rs,
    _onExport: Fs,
    _onSearchExport: Ts,
    _onImport: Ds,
    _onMultiEdit: Is,
    _onMultiDelete: Bs,
    _listen: Ns,
    _visibleColumns: Ps,
    _uid: Us,
    hideOperates: Xs,
    searcherColumns: qs,
    searcherConfig: zs
  },
  watch: {
    $route: un
  },
  methods: {
    initSettings: Ls,
    saveSettings: Ws,
    calcValue: Hs,
    calcOverflowTooltip: Js,
    handleSearch: Ks,
    handleResetSettings: Ys,
    handleHeaderDragend: Gs,
    handleSelectionChange: Qs,
    handleSortChange: Zs,
    handleCheckedChange: en,
    handleToggleFullscreen: tn,
    cellClassName: sn,
    cellStyle: nn,
    canEdit: on,
    canSave: ln,
    canRowEdit: an,
    canCancelEdit: rn,
    canDelete: cn,
    _emit: dn
  }
};
const hn = {
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
    calcValue: F.methods.calcValue
  }
}, pn = { key: 0 }, mn = { key: 1 };
function fn(e, t, s, i, n, o) {
  const l = u("el-descriptions-item"), a = u("el-descriptions"), c = u("el-collapse-item"), h = u("el-collapse");
  return r(), p(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: q(["x-info", { "hide-header": o.hideHeader }])
  }, {
    default: d(() => [
      (r(!0), y(A, null, O(o.blocks, (m, k) => (r(), p(c, {
        key: k,
        title: k,
        name: k
      }, {
        default: d(() => [
          f(a, {
            column: s.column,
            border: s.border
          }, {
            default: d(() => [
              (r(!0), y(A, null, O(m, (g) => (r(), p(l, _({
                key: g.prop
              }, g), X({
                default: d(() => [
                  g.slot ? (r(), y("span", pn, [
                    w(e.$slots, g.slot, G(Ve({ data: s.data, field: g, value: o.calcValue(s.data, g) })), void 0, !0)
                  ])) : (r(), y("span", mn, E(o.calcValue(s.data, g)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: d(() => [
                    w(e.$slots, "label", {
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
const _n = /* @__PURE__ */ S(hn, [["render", fn], ["__scopeId", "data-v-0c3b67a5"]]), bn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, gn = { key: 1 };
function yn(e, t, s, i, n, o) {
  return r(), y("div", null, [
    (r(!0), y(A, null, O(s.items, (l, a) => (r(), p(W(s.compName), _({ key: a }, l), {
      default: d(() => [
        l.slot || e.$attrs.slot ? w(e.$slots, "default", {
          key: 0,
          item: l
        }) : (r(), y("span", gn, E(l.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const vn = /* @__PURE__ */ S(bn, [["render", yn]]), wn = {
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
function Sn(e, t, s, i, n, o) {
  const l = u("van-icon"), a = u("van-pagination");
  return r(), p(a, _({ ...e.$attrs, ...e.mobilePagination || {} }, {
    modelValue: s.query.page,
    "onUpdate:modelValue": t[0] || (t[0] = (c) => s.query.page = c),
    "items-per-page": s.query.limit,
    "page-count": o.pageCount,
    "total-items": s.total
  }), {
    "prev-text": d(() => [
      f(l, { name: "arrow-left" })
    ]),
    "next-text": d(() => [
      f(l, { name: "arrow" })
    ]),
    page: d(({ text: c }) => [
      $(E(c), 1)
    ]),
    _: 1
  }, 16, ["modelValue", "items-per-page", "page-count", "total-items"]);
}
const kn = /* @__PURE__ */ S(wn, [["render", Sn]]), $n = {
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
function Cn(e, t, s, i, n, o) {
  const l = u("el-pagination");
  return r(), p(l, _({
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
const En = /* @__PURE__ */ S($n, [["render", Cn]]), Vn = {
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
function xn(e, t, s, i, n, o) {
  const l = u("van-picker"), a = u("van-popup");
  return r(), y(A, null, [
    x("span", {
      onClick: t[0] || (t[0] = (c) => e.$emit("show")),
      class: q(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, E(s.modelValue || s.placeholder), 3),
    f(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: o.visible,
      "onUpdate:show": t[2] || (t[2] = (c) => o.visible = c)
    }), {
      default: d(() => [
        f(l, _(e.$attrs, {
          title: e.$attrs.title,
          columns: s.columns,
          onCancel: t[1] || (t[1] = (c) => e.$emit("cancel")),
          onConfirm: o.onConfirm
        }), null, 16, ["title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const An = /* @__PURE__ */ S(Vn, [["render", xn]]), On = {
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
    formatOptions: B
  }
};
function jn(e, t, s, i, n, o) {
  const l = u("van-radio"), a = u("van-radio-group");
  return r(), p(a, _({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: d(() => [
      (r(!0), y(A, null, O(o.formatOptions(s.options, this), (c) => (r(), p(l, _(e.$attrs, {
        key: c[s.text],
        name: c[s.value]
      }), {
        default: d(() => [
          $(E(c[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Mn = /* @__PURE__ */ S(On, [["render", jn]]), Rn = {
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
    formatOptions: B
  }
};
function Fn(e, t, s, i, n, o) {
  const l = u("el-radio-group");
  return r(), p(l, _({ class: "pc-x-radios" }, o.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a))
  }), {
    default: d(() => [
      (r(!0), y(A, null, O(o.formatOptions(s.options, this), (a) => (r(), p(W(s.button ? "el-radio-button" : "el-radio"), _(o.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: d(() => [
          $(E(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const Tn = /* @__PURE__ */ S(Rn, [["render", Fn]]), Dn = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, In = { key: 1 };
function Bn(e, t, s, i, n, o) {
  const l = u("MobileXCol"), a = u("van-row");
  return r(), p(a, { class: "mobile-x-row" }, {
    default: d(() => [
      (r(!0), y(A, null, O(s.cols, (c, h) => (r(), p(l, _(c, { key: h }), {
        default: d(() => [
          c.slot || e.$attrs.slot ? w(e.$slots, c.slot || e.$attrs.slot, {
            key: 0,
            col: c
          }) : (r(), y("span", In, E(c.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? w(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  });
}
const Nn = /* @__PURE__ */ S(Dn, [["render", Bn]]), Pn = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Un = { key: 1 };
function Xn(e, t, s, i, n, o) {
  const l = u("pc-x-col"), a = u("el-row");
  return r(), p(a, { class: "pc-x-row" }, {
    default: d(() => [
      (r(!0), y(A, null, O(s.cols, (c, h) => (r(), p(l, _(c, { key: h }), {
        default: d(() => [
          c.slot || e.$attrs.slot ? w(e.$slots, c.slot || e.$attrs.slot, {
            key: 0,
            col: c
          }) : (r(), y("span", Un, E(c.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? w(e.$slots, "default", { key: 0 }) : b("", !0)
    ]),
    _: 3
  });
}
const qn = /* @__PURE__ */ S(Pn, [["render", Xn]]), Ue = async (e, t, s) => {
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: n = "text", value: o = "value", labelTexts: l, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...l || [], n, o])], a.limit = a.limit || 20, i && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${i}%`);
  const c = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...c.data), s.loading = !1;
}, zn = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((i) => e[i])[0], Ln = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((i) => e[i]).slice(1).join(" - ") + ")", Wn = {
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
        this._options = B(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: B,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Ue(this.$api.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Hn(e, t, s, i, n, o) {
  const l = u("XPicker");
  return r(), y("div", {
    onClick: t[5] || (t[5] = (...a) => o.onClick && o.onClick(...a)),
    class: "mobile-x-select"
  }, [
    f(l, _(e.$attrs, {
      modelValue: o.formattedModelValue,
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
const Jn = /* @__PURE__ */ S(Wn, [["render", Hn]]);
const Kn = {
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
        this._options = B(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: B,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ue(this.$api.restful, e, this);
    },
    calcMainLabel(e) {
      return zn(e, this);
    },
    calcRemarkLabel(e) {
      return Ln(e, this);
    }
  }
}, Yn = { key: 1 }, Gn = { class: "main" }, Qn = { class: "remark" };
function Zn(e, t, s, i, n, o) {
  const l = u("el-option"), a = u("el-select");
  return r(), p(a, _({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || o.remoteSearch
  }), {
    default: d(() => [
      (r(!0), y(A, null, O(n._options, (c) => (r(), p(l, _(e.$attrs, {
        key: c[s.text],
        label: c[s.text],
        value: c[s.value]
      }), {
        default: d(() => [
          e.$slots.default ? w(e.$slots, "default", { key: 0 }, void 0, !0) : (r(), y("span", Yn, [
            x("span", Gn, E(o.calcMainLabel(c)), 1),
            x("span", Qn, E(o.calcRemarkLabel(c)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const eo = /* @__PURE__ */ S(Kn, [["render", Zn], ["__scopeId", "data-v-0baced1c"]]);
const to = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...F.props(),
    mode: String,
    platform: String,
    "max-height": String,
    height: String,
    slotRenderers: Object
  },
  emits: [
    ...F.emits()
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
    ...F.computed,
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
    this.$emit("update:tref", this);
  },
  methods: {
    ...F.methods,
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
}, so = { class: "mobile-x-table" }, no = {
  key: 1,
  class: "mobile-x-table card"
}, oo = ["onClick"], io = ["value", "checked"], lo = { class: "label" }, ao = { class: "value" }, ro = { class: "operates" }, co = ["value", "checked"], uo = {
  key: 2,
  class: "index"
}, ho = { class: "title" }, po = { class: "operates" };
function mo(e, t, s, i, n, o) {
  const l = u("x-table-tools"), a = u("van-checkbox"), c = u("van-button"), h = u("XCol"), m = u("XRow"), k = u("van-swipe-cell"), g = u("van-cell"), j = u("van-list"), M = u("x-pagination"), P = u("XInfo"), T = u("van-popup");
  return r(), y("div", so, [
    e.hideTools !== "" && e.hideTools !== !0 ? (r(), p(l, _({ key: 0 }, e._attrs, {
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
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : b("", !0),
    (s.mode || e._attrs.mode) === "card" ? (r(), y("div", no, [
      (r(!0), y(A, null, O(e._data, (v, V) => (r(), y("div", {
        key: V,
        class: "row",
        onClick: (C) => o.handleClickCard(V)
      }, [
        f(k, {
          onOpen: (C) => n.scope = { row: v, $index: V }
        }, {
          right: d(() => [
            x("div", ro, [
              w(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
              e.hideOperates ? b("", !0) : (r(), p(m, {
                key: 0,
                gutter: 10
              }, {
                default: d(() => [
                  f(h, { span: 12 }, {
                    default: d(() => [
                      e.canEdit(n.scope) ? (r(), p(c, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, { onClick: o.handleEdit }), {
                        default: d(() => [
                          $(" 编辑 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : b("", !0)
                    ]),
                    _: 1
                  }),
                  f(h, { span: 12 }, {
                    default: d(() => [
                      e.canDelete(n.scope) ? (r(), p(c, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"] }, { onClick: o.handleDelete }), {
                        default: d(() => [
                          $(" 删除 ")
                        ]),
                        _: 1
                      }, 16, ["onClick"])) : b("", !0)
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
            o.hasSelection ? (r(), p(a, {
              key: 0,
              modelValue: n.selected[V],
              "onUpdate:modelValue": (C) => n.selected[V] = C,
              shape: "square",
              class: "selection",
              onClick: t[0] || (t[0] = H(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : b("", !0),
            o.hasRadio ? (r(), y("input", {
              key: 1,
              type: "radio",
              value: V,
              checked: V === n.checked,
              class: "radio",
              onClick: t[1] || (t[1] = H(() => {
              }, ["stop"])),
              onChange: t[2] || (t[2] = (...C) => e.handleCheckedChange && e.handleCheckedChange(...C))
            }, null, 40, io)) : b("", !0),
            (r(!0), y(A, null, O(o.cols, (C, N) => (r(), y("div", {
              key: N,
              class: "field"
            }, [
              x("span", lo, E(C.label) + ":", 1),
              x("span", ao, E(e.calcValue(v, C)), 1)
            ]))), 128))
          ]),
          _: 2
        }, 1032, ["onOpen"])
      ], 8, oo))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (r(), p(j, _({
      key: 2,
      class: "mobile-x-table list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (v) => e.$emit("search"))
    }), {
      default: d(() => [
        (r(!0), y(A, null, O(e._data, (v, V) => (r(), p(g, {
          key: V,
          "is-link": "",
          onClick: (C) => o.handleShowDetail(v, V)
        }, {
          default: d(() => [
            o.hasSelection ? (r(), p(a, {
              key: 0,
              modelValue: n.selected[V],
              "onUpdate:modelValue": (C) => n.selected[V] = C,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = H(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : b("", !0),
            o.hasRadio ? (r(), y("input", {
              key: 1,
              type: "radio",
              value: V,
              checked: V === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = H(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...C) => e.handleCheckedChange && e.handleCheckedChange(...C))
            }, null, 40, co)) : b("", !0),
            o.hasIndex ? (r(), y("span", uo, E(V + 1), 1)) : b("", !0),
            x("span", ho, E(o.calcTitle(v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : b("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p(M, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (v) => e._emit("search"))
    }, null, 8, ["query", "total"])) : b("", !0),
    f(T, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (v) => n.popupVisible = v),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: d(() => [
        f(P, {
          data: n.scope.row,
          fields: o.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"]),
        x("div", po, [
          w(e.$slots, "operates-prefix", { scope: n.scope }, void 0, !0),
          e.hideOperates ? b("", !0) : (r(), p(m, {
            key: 0,
            gutter: 10
          }, {
            default: d(() => [
              f(h, { span: 12 }, {
                default: d(() => [
                  e.canEdit(n.scope) ? (r(), p(c, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"], block: !0 }, { onClick: o.handleEdit }), {
                    default: d(() => [
                      $(" 编辑 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : b("", !0)
                ]),
                _: 1
              }),
              f(h, { span: 12 }, {
                default: d(() => [
                  e.canDelete(n.scope) ? (r(), p(c, _({ key: 0 }, { type: "danger", ...e._attrs["delete-btn"], block: !0 }, { onClick: o.handleDelete }), {
                    default: d(() => [
                      $(" 删除 ")
                    ]),
                    _: 1
                  }, 16, ["onClick"])) : b("", !0)
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
const fo = /* @__PURE__ */ S(to, [["render", mo], ["__scopeId", "data-v-d230adfe"]]), $e = {
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
function _o() {
  const {
    columns: e,
    visible: t,
    conditions: s,
    expression: i,
    handleSearch: n,
    handleReset: o,
    handleAdd: l,
    handleDelete: a,
    handleSelectField: c,
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
    }, [s.map((m, k) => f("div", {
      class: "condition flex-center",
      key: m.no
    }, [f(u("el-button"), {
      type: "danger",
      size: "small",
      plain: !0,
      onClick: () => a(k)
    }, {
      default: () => [$("X")]
    }), f("span", {
      class: "title"
    }, [m.no]), f("div", {
      class: "expression"
    }, [f(u("pc-x-select"), {
      modelValue: m.prop,
      onChange: (g) => c(m, g),
      options: e,
      text: "label",
      value: "prop"
    }, null), f(u("pc-x-select"), {
      modelValue: m.op,
      onChange: (g) => h(m, g),
      options: m.ops
    }, null), bo(this, m)])]))]), f(u("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式"
    }, {
      modelValue: i,
      "onUpdate:modelValue": (m) => this.expression = m
    }), null)]
  });
}
function bo(e, t) {
  const s = (n) => L(u(t.component), Object.assign({
    modelValue: t.value,
    "onUpdate:modelValue": (o) => t.value = o
  }, t.item, t.item.formAttrs, n)), i = {
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
  })]) : ["in", "notIn"].includes(t.op) ? (i.multiple = !0, s(i)) : s();
}
const { storage: ne } = StardustBrowser, go = {
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
  render: _o,
  methods: {
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      ne.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: s, component: i, ...n } = e;
          return n;
        }),
        expression: this.expression
      });
    },
    restoreCache() {
      var t, s;
      const e = ne.local.getJson(this.key, this.config);
      (t = e.conditions) == null || t.forEach((i) => {
        const { prop: n, op: o, value: l } = i;
        i.item = this.columns.find((a) => a.prop === n), this.handleSelectField(i, n), this.handleSelectOp(i, o), i.ops = I[i.component].map((a) => $e[a]), i.value = l;
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((i) => i.no)) + 1), Object.assign(this, e);
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
      ne.local.remove(this.key), Object.assign(this, {
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
            const a = this.conditions.find((c) => c.no === l * 1);
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
      e.component = n.comp || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = I[e.component].map((o) => $e[o]), e.op = e.ops[0].value, n.comp === "ElDatePicker" && (e.component = "ElInput", e.item.formAttrs.type = "date");
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), !["between", "in", "notIn"].includes(t) && Array.isArray(t) && (e.value = "");
    }
  }
}, Xe = /* @__PURE__ */ S(go, [["__scopeId", "data-v-e9987bfb"]]);
const yo = {
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
}, vo = (e) => (ce("data-v-16737013"), e = e(), de(), e), wo = { class: "table" }, So = ["title", "onClick"], ko = /* @__PURE__ */ vo(() => /* @__PURE__ */ x("span", { class: "unit" }, "px", -1));
function $o(e, t, s, i, n, o) {
  const l = u("el-button"), a = u("ElCheckbox"), c = u("el-input-number"), h = u("el-tab-pane"), m = u("el-tabs"), k = u("el-popover");
  return s.visible ? (r(), p(k, _({
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
        "onUpdate:modelValue": t[0] || (t[0] = (g) => n.activeName = g)
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
                onClick: o.handleResetColumns
              }, {
                default: d(() => [
                  $("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              x("div", wo, [
                (r(!0), y(A, null, O(n.columns, (g, j) => (r(), y("div", {
                  key: j,
                  class: "row flex-center"
                }, [
                  f(l, {
                    disabled: j === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: (M) => o.handleMove(g, j, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  f(l, {
                    disabled: j === n.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: (M) => o.handleMove(g, j, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  f(a, {
                    modelValue: g.show,
                    "onUpdate:modelValue": (M) => g.show = M,
                    onChange: o.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  x("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (M) => o.handleToggle(g)
                  }, E(g.label), 9, So),
                  f(c, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (M) => g.width = M,
                    onChange: o.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  ko
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
const qe = /* @__PURE__ */ S(yo, [["render", $o], ["__scopeId", "data-v-16737013"]]);
const Co = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...F.props()
  },
  emits: [
    ...F.emits()
  ],
  components: { Searcher: Xe, Settings: qe },
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
    ...F.computed
  },
  watch: {
    ...F.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...F.methods
  }
}, Eo = { key: 1 }, Vo = ["value", "checked"], xo = { key: 1 };
function Ao(e, t, s, i, n, o) {
  const l = u("searcher"), a = u("pc-x-icon"), c = u("settings"), h = u("pc-x-table-tools"), m = u("el-table-column"), k = u("el-button"), g = u("el-table"), j = u("x-pagination"), M = u("el-collapse-item"), P = u("el-collapse"), T = Q("loading");
  return r(), y("div", {
    class: q(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    f(l, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    f(P, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (v) => n.activeNames = v),
      class: q((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: d(() => [
        f(M, {
          name: n.activeNames[0]
        }, {
          title: d(() => [
            e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (r(), y("span", Eo, E(e.title), 1))
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
                f(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                f(c, {
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
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : b("", !0),
            R((r(), p(g, _({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: d(() => [
                (r(!0), y(A, null, O(e._visibleColumns, (v, V) => (r(), p(m, _(v, {
                  key: V,
                  "min-width": v.minWidth,
                  align: v.align || e._attrs.tableAlign || "center",
                  resizable: v.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(v)
                }), X({ _: 2 }, [
                  ["selection", "index"].includes(v.type) ? void 0 : {
                    name: "default",
                    fn: d((C) => [
                      v.type === "radio" ? (r(), y("input", {
                        key: 0,
                        type: "radio",
                        value: C.$index,
                        checked: C.$index === n.checked,
                        onChange: t[1] || (t[1] = (...N) => e.handleCheckedChange && e.handleCheckedChange(...N))
                      }, null, 40, Vo)) : v.slot ? w(e.$slots, v.slot, {
                        key: 1,
                        scope: C,
                        column: v
                      }) : e.slotAll ? w(e.$slots, "all", {
                        key: 2,
                        scope: C,
                        column: v
                      }) : (r(), y(A, { key: 3 }, [
                        v.comp === "ElSwitch" || e.table.isRowEdit && C.row.isEditing && (v.visible !== !1 || v.canEdit) ? (r(), p(W(v.comp || "ElInput"), _({ key: 0 }, { ...v, ...v.formAttrs }, {
                          modelValue: C.row[v.prop],
                          "onUpdate:modelValue": (N) => C.row[v.prop] = N,
                          disabled: !C.row.editable || !C.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (r(), y("span", xo, E(e.calcValue(C.row, v)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? b("", !0) : (r(), p(m, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: d((v) => [
                    w(e.$slots, "operates-prefix", { scope: v }),
                    e.canEdit(v.row) ? (r(), p(k, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (V) => e._emit("edit", v)
                    }), {
                      default: d(() => [
                        f(a, { name: "edit" }),
                        $(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : b("", !0),
                    e.canSave(v.row) ? R((r(), p(k, _({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: v.row._loading,
                      onClick: (V) => e._emit("row-edit", v)
                    }), {
                      default: d(() => [
                        f(a, { name: "collection" }),
                        $(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [T, v.row._loading]
                    ]) : b("", !0),
                    e.canCancelEdit(v.row) ? (r(), p(k, _({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (V) => e._emit("cancel-edit", v)
                    }), {
                      default: d(() => [
                        f(a, { name: "refresh-left" }),
                        $(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : b("", !0),
                    e.canDelete(v.row) ? (r(), p(k, _({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (V) => e._emit("delete", v)
                    }), {
                      default: d(() => [
                        f(a, { name: "DeleteFilled" }),
                        $(" 删除 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])) : b("", !0),
                    w(e.$slots, "operates-suffix", { scope: v })
                  ]),
                  _: 3
                }, 8, ["min-width", "align", "fixed"]))
              ]),
              _: 3
            }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
              [T, e._loading]
            ]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p(j, {
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
const Oo = /* @__PURE__ */ S(Co, [["render", Ao]]);
const jo = {
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
}, Mo = { class: "mobile-x-table-tools" }, Ro = { class: "tools" }, Fo = { class: "tools-end" };
function To(e, t, s, i, n, o) {
  const l = u("mobile-x-icon"), a = u("van-button"), c = Q("domid");
  return r(), y("div", Mo, [
    x("div", Ro, [
      w(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? R((r(), p(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[0] || (t[0] = (h) => e.$emit("search"))
      }), {
        default: d(() => [
          f(l, { name: "search" }),
          $(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [c, s.domids.search]
      ]) : b("", !0),
      e.$attrs.onAdd ? R((r(), p(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
        onClick: t[1] || (t[1] = (h) => e.$emit("add"))
      }), {
        default: d(() => [
          f(l, { name: "circle-plus-filled" }),
          $(" 新增 ")
        ]),
        _: 1
      }, 16)), [
        [c, s.domids.add]
      ]) : b("", !0),
      e.$attrs.onMultiEdit ? R((r(), p(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
      }), {
        default: d(() => [
          f(l, { name: "edit" }),
          $(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [c, s.domids["multi-edit"]]
      ]) : b("", !0),
      e.$attrs.onMultiDelete ? R((r(), p(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
      }), {
        default: d(() => [
          f(l, { name: "DeleteFilled" }),
          $(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [c, s.domids["multi-delete"]]
      ]) : b("", !0),
      e.$attrs.onExport ? R((r(), p(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (h) => e.$emit("export"))
      }), {
        default: d(() => [
          f(l, { name: "printer" }),
          $(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [c, s.domids.export]
      ]) : b("", !0),
      e.$attrs.onSearchExport ? R((r(), p(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
      }), {
        default: d(() => [
          f(l, { name: "printer" }),
          $(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [c, s.domids["search-export"]]
      ]) : b("", !0),
      e.$attrs.onImport ? R((r(), p(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (h) => e.$emit("import"))
      }), {
        default: d(() => [
          f(l, { name: "UploadFilled" }),
          $(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [c, s.domids.import]
      ]) : b("", !0),
      w(e.$slots, "tools-suffix", {}, void 0, !0),
      x("div", Fo, [
        w(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const Do = /* @__PURE__ */ S(jo, [["render", To], ["__scopeId", "data-v-442404e2"]]);
const Io = {
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
}, Bo = { class: "tools" }, No = { class: "tools-end flex-center" };
function Po(e, t, s, i, n, o) {
  const l = u("pc-x-icon"), a = u("el-button"), c = u("el-card"), h = Q("domid");
  return r(), p(c, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: d(() => [
      x("div", Bo, [
        w(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? R((r(), p(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (m) => e.$emit("search"))
        }), {
          default: d(() => [
            f(l, { name: "search" }),
            $(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : b("", !0),
        e.$attrs.onAdd ? R((r(), p(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (m) => e.$emit("add"))
        }), {
          default: d(() => [
            f(l, { name: "circle-plus-filled" }),
            $(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : b("", !0),
        e.$attrs.onMultiEdit ? R((r(), p(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
        }), {
          default: d(() => [
            f(l, { name: "edit" }),
            $(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : b("", !0),
        e.$attrs.onMultiDelete ? R((r(), p(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
        }), {
          default: d(() => [
            f(l, { name: "DeleteFilled" }),
            $(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : b("", !0),
        e.$attrs.onExport ? R((r(), p(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (m) => e.$emit("export"))
        }), {
          default: d(() => [
            f(l, { name: "printer" }),
            $(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : b("", !0),
        e.$attrs.onSearchExport ? R((r(), p(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
        }), {
          default: d(() => [
            f(l, { name: "printer" }),
            $(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : b("", !0),
        e.$attrs.onImport ? R((r(), p(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (m) => e.$emit("import"))
        }), {
          default: d(() => [
            f(l, { name: "UploadFilled" }),
            $(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : b("", !0),
        w(e.$slots, "tools-suffix", {}, void 0, !0),
        x("div", No, [
          w(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Uo = /* @__PURE__ */ S(Io, [["render", Po], ["__scopeId", "data-v-02d70f98"]]);
function Xo(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !xe(e);
}
const qo = (e) => {
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
}, zo = (e, t) => {
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
}, Lo = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, Wo = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return f("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, Z = ([e, t, s, i, n, o]) => {
  const {
    rowIndex: l,
    rowData: a
  } = e, c = () => {
    t._emit(s, {
      $index: l,
      row: a
    });
  };
  return f(u("el-button"), _({
    type: i
  }, t._attrs[s + "-btn"], {
    onClick: c
  }), {
    default: () => [f(u("x-icon"), {
      name: n
    }, null), o]
  });
}, Ho = (e, t) => {
  if (t.canEdit(e.rowData))
    return Z([e, t, "edit", "warning", "edit", "编辑"]);
}, Jo = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return Z([e, t, "row-edit", "success", "collection", "保存"]);
}, Ko = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return Z([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Yo = (e, t) => {
  if (t.canDelete(e.rowData))
    return Z([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Go = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (o) => zo(o, t);
  if (e.type === "index")
    return (o) => Lo(o, t);
  if (e.type === "radio")
    return (o) => Wo(o, t);
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
      }, k = a.comp || "ElInput";
      return L(u(k), {
        ...a,
        ...a.formAttrs,
        modelValue: l[a.prop],
        onInput: m,
        disabled: !l.editable || !l.isEditing
      });
    }
    const c = t.calcValue(o.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? f(u("el-tooltip"), {
      content: c
    }, Xo(c) ? c : {
      default: () => [c]
    }) : c;
  };
}, Qo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, n = e.map((o, l) => {
    const {
      tableAttrs: a = {}
    } = o, c = {
      ...o,
      key: l,
      dataKey: o.prop,
      title: o.label,
      width: o.width || a.width || o.minWidth || a.minWidth || o.maxWidth || a.maxWidth,
      align: o.align || s.tableAlign || "center"
    };
    return c.type === "selection" && (c.width = c.width || 46, c.headerCellRenderer = qo(t)), c.cellRenderer = Go(c, t), c;
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
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, Ho(o, t), Jo(o, t), Ko(o, t), Yo(o, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), n;
}, Zo = {
  convertColumnsForTableV2: Qo
};
const ei = {
  name: "XTableV2",
  props: {
    ...F.props(),
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
    ...F.emits()
  ],
  components: { Searcher: Xe, Settings: qe },
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
    ...F.computed
  },
  watch: {
    ...F.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...F.methods,
    convertColumnsForTableV2: Zo.convertColumnsForTableV2
  }
}, ti = { key: 1 };
function si(e, t, s, i, n, o) {
  const l = u("Searcher"), a = u("x-icon"), c = u("Settings"), h = u("x-table-tools"), m = u("el-table-v2"), k = u("el-auto-resizer"), g = u("x-pagination"), j = u("el-collapse-item"), M = u("el-collapse"), P = Q("loading");
  return r(), y("div", {
    class: q(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    f(l, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (T) => e._emit("search", T))
    }, null, 8, ["uid", "columns", "config"]),
    f(M, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (T) => n.activeNames = T),
      class: q((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: d(() => [
        f(j, {
          name: n.activeNames[0]
        }, {
          title: d(() => [
            e.$slots["collapse-title"] ? w(e.$slots, "collapse-title", { key: 0 }) : (r(), y("span", ti, E(e.title), 1))
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
                f(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                f(c, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (T) => n.settings = T),
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
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : b("", !0),
            f(k, {
              style: Le({ height: s.height })
            }, {
              default: d(({ width: T, height: v }) => [
                R((r(), p(m, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: o.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: T,
                  height: v
                }), X({ _: 2 }, [
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
                  [P, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (r(), p(g, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (T) => e._emit("search"))
            }, null, 8, ["query", "total"])) : b("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const ni = /* @__PURE__ */ S(ei, [["render", si]]);
const oe = ["selection", "radio"], oi = {
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
      oe.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !oe.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (oe.includes(t)) {
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
}, ii = { class: "x-table-viewer" };
function li(e, t, s, i, n, o) {
  const l = u("x-dialog");
  return r(), y("div", ii, [
    f(l, _(o._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": o.handleBeforeClose,
      onSubmit: o.handleSubmit,
      onCancel: o.handleCancel
    }), {
      default: d(() => [
        (r(), p(W(s.useTableV2 ? "x-table-v2" : "x-table"), _({
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
const ai = /* @__PURE__ */ S(oi, [["render", li], ["__scopeId", "data-v-f5d31400"]]), ri = {
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
}, ci = { class: "x-tinymce" }, di = ["id", "innerHTML"];
function ui(e, t, s, i, n, o) {
  return r(), y("div", ci, [
    x("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, di)
  ]);
}
const hi = /* @__PURE__ */ S(ri, [["render", ui]]);
const pi = {
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
    onSuccess(e, t, s) {
      const i = this.$api.API_BASE_URL + "/" + e.filename;
      this.$emit("update:modelValue", i);
    }
  }
}, mi = (e) => (ce("data-v-e756c8fc"), e = e(), de(), e), fi = { class: "mask" }, _i = /* @__PURE__ */ mi(() => /* @__PURE__ */ x("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ $(" 将文件拖到此处，或"),
  /* @__PURE__ */ x("em", null, "点击上传")
], -1)), bi = {
  key: 0,
  class: "path"
};
function gi(e, t, s, i, n, o) {
  const l = u("x-icon"), a = u("el-upload");
  return r(), p(a, {
    drag: "",
    "show-file-list": !1,
    action: n.action,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": o.onSuccess,
    class: "x-file-uploader"
  }, {
    default: d(() => [
      x("div", fi, [
        f(l, { name: "upload-filled" }),
        _i
      ]),
      o.filepath ? (r(), y("div", bi, E(s.modelValue), 1)) : b("", !0)
    ]),
    _: 1
  }, 8, ["action", "accept", "multiple", "on-success"]);
}
const yi = /* @__PURE__ */ S(pi, [["render", gi], ["__scopeId", "data-v-e756c8fc"]]);
const vi = {
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
    onSuccess(e, t, s) {
      const i = this.$api.API_BASE_URL + "/" + e.filename;
      this.$emit("update:modelValue", i);
    }
  }
}, wi = (e) => (ce("data-v-c8f36d63"), e = e(), de(), e), Si = { class: "mask" }, ki = /* @__PURE__ */ wi(() => /* @__PURE__ */ x("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ $(" 将图片拖到此处，或"),
  /* @__PURE__ */ x("em", null, "点击上传")
], -1));
function $i(e, t, s, i, n, o) {
  const l = u("el-image"), a = u("x-icon"), c = u("el-upload");
  return r(), p(c, {
    drag: "",
    "show-file-list": !1,
    action: n.action,
    accept: "image/*",
    multiple: s.multiple,
    "on-success": o.onSuccess,
    class: "x-image-uploader"
  }, {
    default: d(() => [
      o.image ? (r(), p(l, {
        key: 0,
        src: o.image,
        alt: "upload-image",
        fit: "cover"
      }, null, 8, ["src"])) : b("", !0),
      x("div", Si, [
        f(a, { name: "upload-filled" }),
        ki
      ])
    ]),
    _: 1
  }, 8, ["action", "multiple", "on-success"]);
}
const Ci = /* @__PURE__ */ S(vi, [["render", $i], ["__scopeId", "data-v-c8f36d63"]]), ie = {
  xactionsheet: ct,
  xautorows: mt,
  mobilexbutton: bt,
  pcxbutton: vt,
  xchart: $t,
  mobilexcheckboxs: Vt,
  pcxcheckboxs: Ot,
  mobilexcol: Rt,
  pcxcol: Dt,
  mobilexdialog: Nt,
  pcxdialog: qt,
  xdistrictselect: Wt,
  mobilexform: ss,
  pcxform: ls,
  mobilexformitem: cs,
  pcxformitem: ds,
  mobilexicon: ms,
  pcxicon: gs,
  xinfo: _n,
  xlooper: vn,
  mobilexpagination: kn,
  pcxpagination: En,
  xpicker: An,
  mobilexradios: Mn,
  pcxradios: Tn,
  mobilexrow: Nn,
  pcxrow: qn,
  mobilexselect: Jn,
  pcxselect: eo,
  mobilextable: fo,
  pcxtable: Oo,
  mobilextabletools: Do,
  pcxtabletools: Uo,
  xtablev2: ni,
  xtableviewer: ai,
  xtinymce: hi,
  xfileuploader: yi,
  ximageuploader: Ci
}, Y = {};
for (let e in ie)
  Y[ie[e].name] = ie[e];
const Ei = (e) => ({
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
    return L(u(this.name), {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), re = (() => {
  const e = Object.keys(Y), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = Y[i]);
  for (const i of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(i.toLowerCase())) ? s[i] = Ei(i) : s[i] = Y[i];
  return s;
})(), Vi = (e, t) => {
  for (let s in re)
    e.component(s, re[s]);
}, Ai = {
  ...re,
  ...Ie,
  ...lt,
  install: Vi
};
export {
  Be as BaseController,
  tt as Confirm,
  Ne as CrudController,
  Ze as Message,
  et as Notify,
  it as TempCrudController,
  je as baseDialog,
  Ae as baseForm,
  st as baseModel,
  Oe as baseTable,
  lt as controllers,
  Ai as default,
  B as formatOptions,
  We as formatPrecision,
  Te as initDefaultForm,
  Re as initDialog,
  ue as initForm,
  Fe as initFormRules,
  nt as initModel,
  Me as initTable,
  De as triggers,
  Ie as utils
};
