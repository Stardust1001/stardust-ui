import { toRaw as it, nextTick as te, watch as _e, resolveComponent as c, openBlock as d, createBlock as g, mergeProps as y, createElementBlock as v, Fragment as M, renderList as I, withCtx as u, renderSlot as C, toDisplayString as R, useCssVars as Ne, resolveDirective as Z, withDirectives as D, createElementVNode as j, createTextVNode as x, createVNode as m, createCommentVNode as S, vShow as Ve, pushScopeId as ye, popScopeId as ve, createSlots as G, resolveDynamicComponent as ee, normalizeClass as W, normalizeProps as oe, guardReactiveProps as Ie, h as H, isVNode as Ue, withModifiers as K, normalizeStyle as lt } from "vue";
const ot = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class n {
    constructor(f, T, F, N, ce, st, nt) {
      this.x = f, this.y = T, this.radius = F, this.color = N, this.vx = ce, this.vy = st, this.ctx = nt;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => l.clearRect(0, 0, t, s), o = (E) => Math.floor(Math.random() * E);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const E = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = A * 30), a >= 1 && (a = 1, r = -r, h = A * 30)), E.addColorStop(0, "rgba(250, 220, 20, 0.5)"), E.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = E, l.fillRect(0, 0, t, s);
  }, w = Math.floor(t / 100), _ = Math.floor(s / 100), A = 20, $ = Math.round(1e3 / A), B = Array.from({ length: 52 }).map(() => {
    const E = Math.floor(o(w + _) * 1.5 + o(5));
    let f = o(t), T = o(s);
    f = Math.min(Math.max(E, f), t - E), T = Math.min(Math.max(E, T), s - E);
    let F = o(2) ? (o(2) + 2) * w : (o(-1) - 2) * w, N = o(2) ? (o(2) + 2) * _ : (o(-1) - 2) * _;
    return F = Math.floor(F / A), N = Math.floor(N / A), new n(
      f,
      T,
      E,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      F,
      N,
      l
    );
  });
  let b, k;
  e.addEventListener("mouseover", (E) => {
    b = E.pageX, k = E.pageY;
  }), e.addEventListener("mousemove", (E) => {
    if (b === void 0) {
      b = E.pageX, k = E.pageY;
      return;
    }
    const f = E.pageX - b, T = E.pageY - k;
    B.forEach((F) => {
      F.x += f / A, F.y += T / A;
    }), b = E.pageX, k = E.pageY;
  });
  let O = Date.now(), P = null;
  const U = () => {
    Date.now() - O >= $ && (i(), p(), B.forEach((E) => E.update()), O = Date.now()), P = requestAnimationFrame(U);
  };
  return P = requestAnimationFrame(U), () => cancelAnimationFrame(P);
}, at = ({
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
  const p = r.measureText(e).width + t, w = s + t;
  for (let _ = t / 2; _ < i; _ += w)
    for (let A = t / 2; A < n; A += p)
      r[o + "Text"](e, A, _);
  return a;
}, rt = {
  pop: ot,
  createWatermark: at
}, Pe = async (e) => {
  var l, n;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((i) => {
    var o, a;
    return ((o = i.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = i.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((i) => Pe(i.form)));
  return t && s.every((i) => i);
}, dt = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, z = (e, t) => {
  const s = e.__v_isRef ? e.value : it(e);
  let l = s;
  if (typeof s[0] != "object" && (l = s.map((i) => ({ text: i, value: i }))), !t.sort)
    return l;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return l.sort((i, o) => i[n].localeCompare(o[n]));
}, { ElMessage: ct, ElNotification: ut, ElMessageBox: ht } = window.ElementPlus || {}, { showToast: mt, showNotify: pt, showConfirmDialog: ft } = window.vant || {}, Y = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? ((l === "error" || l === "warning") && (t.type = "fail"), mt(t)) : ct({
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
  s ? (l === "error" && (t.type = "danger"), pt(t)) : ut({
    showClose: !0,
    ...t
  });
}, le = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = ft(e) : t = ht.confirm(
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
  Y[e] = Y[e[0]] = (t) => Y({ type: e, ...typeof t != "string" ? t : { message: t } }), ie[e] = ie[e[0]] = (t) => ie({ type: e, ...typeof t != "string" ? t : { message: t } }), le[e] = le[e[0]] = (t) => le({ type: e, ...t });
const gt = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    l.matched.length ? i() : i("/404");
  });
}, bt = (e, t, s) => {
  e.afterEach((l, n) => {
    const i = l.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...i].filter((o) => o).reverse().join("-");
  });
}, _t = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    var o;
    return l.meta.acl === !1 || (o = l.meta) != null && o.visitable || t.acl.paths.includes(l.path) ? i() : (Y.e("无权访问页面: " + l.path), i(t.acl.paths[0] || "/404"));
  }), te(() => {
    let l = !1;
    _e(() => t.acl.menus, (n) => {
      if (!l) {
        if (!n.length)
          return;
        l = !0;
      }
      const i = t.acl.paths, o = (a, r) => {
        var p, w, _, A, $, B, b;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (p = a.children) == null || p.forEach((k) => {
          var O;
          k.meta || (k.meta = {}), (O = k.meta).acl || (O.acl = !1), o(k, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((_ = a.meta).hidden ?? (_.hidden = (w = r.meta) == null ? void 0 : w.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && (($ = a.meta).visitable ?? ($.visitable = (A = r.meta) == null ? void 0 : A.visitable), a.meta = { ...a.meta })), (B = a.children) == null || B.forEach((k) => o(k, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !i.includes(h), (b = a.children) != null && b.some((k) => k.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, yt = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    l.name === "Login" && t.getters.logined && l.query.redirectTo ? i(l.query.redirectTo) : i();
  });
}, vt = {
  check404: gt,
  setTitle: bt,
  checkRolesPages: _t,
  redirectTo: yt
}, Le = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), qe = (e = {}) => ({
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
}), ae = () => ({
  ...Le(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), wt = () => ({
  table: qe(),
  dialog: ae()
}), { funcs: fe } = StardustJs, St = (e, t) => {
  for (let s in e) {
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && Xe(l, t), s === "dialog" && e[s]._isBaseDialog && ze(l, t), s === "form" && e[s]._isBaseForm && we(l, t));
  }
  return e;
}, Xe = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), ze = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), we(e, t), e), we = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), He(e.form, e.formItems), e.initialForm = fe.deepCopy(e.form), e.initialFormRules = fe.deepCopy(e.formRules), _e(() => e.formItems, () => {
  We(e);
}, { immediate: !0, deep: !0 }), e), We = (e) => {
  const { formItems: t, initialFormRules: s } = e, l = t.filter((i) => {
    let { formAttrs: o = {}, required: a = !1 } = i;
    return a = "required" in o ? o.required : a, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && a !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, fe.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !l.length)
    return;
  const n = {};
  return l.forEach((i) => {
    if (e.formRules[i])
      return;
    const o = t.find((A) => A.prop === i), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = Ke[a], h = [], p = "options" in o, _ = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${p ? "选择" : "输入"}${(o == null ? void 0 : o.label) || i}` };
    o.validator && (_.validator = o.validator), o.asyncValidator && (_.asyncValidator = o.asyncValidator), o.comp ? h.push({ ..._, trigger: r.change }) : h.push({ ..._, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ..._, trigger: r.blur }), n[i] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, He = (e, t, s = !0) => {
  const l = {};
  return t.forEach((n) => {
    var h, p;
    let i = "";
    const { type: o, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && o === "number" || n.comp === "ElInputNumber")
      i = 0;
    else if (n.comp === "ElSwitch")
      i = !1;
    else if (a && ((h = n.comp) != null && h.endsWith("XCheckboxs") || (p = n.comp) != null && p.endsWith("x-checkboxs") || r))
      i = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const w = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + w), n["end-placeholder"] || (n["end-placeholder"] = "结束" + w), i = [];
    }
    l[n.prop] = i;
  }), Object.assign(e, { ...l, ...e }), e;
}, Je = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [l, n] = e.split(s);
  n = n.split("|");
  let i = t[l];
  typeof i == "number" ? i += "" : typeof i == "string" && (i = i.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? i.startsWith(a) : o === "*=" ? i.includes(a) : o === "$=" ? i.endsWith(a) : o === "~=" ? !i.includes(a) : o === "!=" ? i !== a : a === i);
}, Ke = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, Ye = {
  effects: rt,
  validateForm: Pe,
  formatPrecision: dt,
  formatOptions: z,
  Message: Y,
  Notify: ie,
  Confirm: le,
  middlewares: vt,
  baseForm: Le,
  baseTable: qe,
  baseDialog: ae,
  baseModel: wt,
  initModel: St,
  initTable: Xe,
  initDialog: ze,
  initForm: we,
  initFormRules: We,
  initDefaultForm: He,
  isWhenMatched: Je,
  triggers: Ke
};
class Ge {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const l = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => l }
      }), this._initLifeCycles();
    }
    te(this.onInit);
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
    return Ye;
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
const { funcs: Ee, highdict: Ae, dates: ue } = StardustJs, { file: Oe, excel: ne } = StardustBrowser;
class Qe extends Ge {
  constructor(t) {
    super(t);
    const { model: s, table: l, dialog: n, dbModelName: i = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = l || (s == null ? void 0 : s.table) || null, this.dialog = n || (s == null ? void 0 : s.dialog) || null, this.dbModelName = i, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], te(() => {
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
    let l = Ae.get(s, this.listProp);
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
    }), await te(), await Ee.sleep(50), this._clearValidate(), this.afterAdd());
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
    }), await te(), (l = this.dialog.formRef) == null || l.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
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
    o = Ee.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(i._visibleColumns, "current"), r = a.map((_) => _.prop), h = a.map((_) => _.label);
    o = o.map((_) => r.map((A) => _[A]));
    let p = null;
    t === "csv" ? p = ne.export2Csv : p = ne.export2Excel;
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
    const l = await this.dbTable.search(this.getSearchExportParams());
    let n = l.data;
    n = this.formatList(n, l), n = this.processExportingData(n, "search");
    const i = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = i.map((p) => p.prop), a = i.map((p) => p.label);
    n = n.map((p) => o.map((w) => p[w]));
    let r = null;
    t === "csv" ? r = ne.export2Csv : r = ne.export2Excel;
    let h = { header: a, data: n, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    const t = await Oe.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), l = await Oe.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      n = window.Papa.parse(l, { header: !0 }).data;
    else {
      const i = window.XLSX.read(l, {}), o = Object.values(i.Sheets);
      n = XLSX.utils.sheet_to_json(o[0]);
    }
    if (n.length > 0) {
      const i = {};
      this.table.columns.forEach((a) => i[a.label] = a.prop);
      const o = Object.keys(n[0]);
      n = n.map((a) => {
        const r = {};
        return o.forEach((h) => r[i[h]] = a[h]), r;
      });
    }
    n = this.processImportingData(n), await this.dbTable.func(["bulkCreate", n]), this.uiUtils.Message({ type: "success", message: "导入成功" }), this.handleSearch();
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
      n.type === "number" ? i = this.uiUtils.formatPrecision(i, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? i = ue.format(i) : (!n.type || n.type === "date") && (i = ue.format(i, "", !1))), l[n.model || n.prop] = i;
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
      const { page: i, limit: o, order: a, count: r, ...h } = s;
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
    const { columns: l, query: n } = this.table, { page: i, limit: o } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (i - 1) * o + r + 1;
    }), l.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: p, formatter: w, autoFill: _ } = a.tableAttrs || {}, { modelName: A } = a.formAttrs || {};
      if (A && _)
        t.forEach(($) => $[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const B = _e(() => a.options, (b, k) => {
          const O = k ? this.table.list : t, P = kt(a);
          O.forEach((U, E) => {
            const f = U[r];
            U[`_formatted_${r}`] = P[f] || (w == null ? void 0 : w(f, U, E)) || f;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(B);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const l = [...new Set(t.map((h) => h[s.prop]))];
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
    const r = Ae.mapField(a.data, o, i);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = r[h[s.prop]];
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
        var r, h;
        const a = i[o];
        if (i.hasOwnProperty("_formatted_" + o))
          return i[o] = i["_formatted_" + o];
        if ((r = l[o]) != null && r.formatter)
          return i[o] = l[o].formatter(a);
        if ((h = l[o]) != null && h.tagValues)
          return i[o] = l[o].tagValues[a];
        typeof a == "boolean" ? i[o] = a && 1 || 0 : a instanceof Date ? (i[o] = ue.format(a), i[o].endsWith(" 00:00:00") && (i[o] = i[o].slice(0, -9))) : typeof a == "object" && (i[o] = JSON.stringify(a));
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
const kt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: l = "text", value: n = "value" } = s, i = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    i[o[n]] = o[l];
  }), i;
};
class $t extends Qe {
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
const Ct = {
  BaseController: Ge,
  CrudController: Qe,
  TempCrudController: $t
}, V = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [l, n] of t)
    s[l] = n;
  return s;
}, xt = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Vt(e, t, s, l, n, i) {
  const o = c("van-action-sheet");
  return d(), g(o, y(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Et = /* @__PURE__ */ V(xt, [["render", Vt]]), At = {
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
}, Ot = { class: "x-auto-rows" }, Tt = { key: 1 };
function jt(e, t, s, l, n, i) {
  const o = c("x-col"), a = c("x-row");
  return d(), v("div", Ot, [
    (d(!0), v(M, null, I(i.rows, (r, h) => (d(), g(a, y({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: u(() => [
        (d(!0), v(M, null, I(r, (p, w) => (d(), g(o, y(p, {
          span: p.span || s.span,
          key: w,
          platform: e.$attrs.platform
        }), {
          default: u(() => [
            p.slot || e.$attrs.slot ? C(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), v("span", Tt, R(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const Ft = /* @__PURE__ */ V(At, [["render", jt]]), Rt = {
  name: "MobileXButton"
};
function Bt(e, t, s, l, n, i) {
  const o = c("van-button");
  return d(), g(o, null, {
    default: u(() => [
      C(e.$slots, "default")
    ]),
    _: 3
  });
}
const Mt = /* @__PURE__ */ V(Rt, [["render", Bt]]), Dt = {
  name: "PcXButton"
};
function Nt(e, t, s, l, n, i) {
  const o = c("el-button");
  return d(), g(o, null, {
    default: u(() => [
      C(e.$slots, "default")
    ]),
    _: 3
  });
}
const It = /* @__PURE__ */ V(Dt, [["render", Nt]]);
const { funcs: Ut } = StardustBrowser, Pt = ["index", "selection", "expand", "radio", "_index"], Se = {
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
        ...ae(),
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
      return Ut.calcPixel(this.height) * this.zoom + "px";
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
  mounted() {
    this.init(), this.initDatasource();
  },
  beforeUnmount() {
    document.removeEventListener("resize", this.update), this.timer && clearInterval(this.timer);
  },
  methods: {
    init() {
      this.chart && this.$refs.el.removeAttribute("_echarts_instance_"), this.chart = window.echarts.init(this.$refs.el), this.update(), document.removeEventListener("resize", this.update), document.addEventListener("resize", this.update), this.updator && (this.timer = setInterval(this.updator.handler.bind(this), this.updator.interval || 1e3));
    },
    initDatasource() {
      if (!this.datasource)
        return;
      const e = this.datasource.columns.filter((t) => !Pt.includes(t.type));
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
      return (t === "sum" || t === "average") && (l = e.reduce((n, i) => n + i, 0)), t === "count" ? l = e.length : t === "average" ? e.length ? l = (l / (s || e.length)).toFixed(2) * 1 : l = void 0 : t === "first" ? l = e[0] : t === "last" ? l = e[e.length - 1] : (t === "max" || t === "min") && (l = Math[t].apply(null, e)), l;
    },
    setRich(e) {
      var E;
      const { categories: t, data: s, attr: l, summary: n, type: i, filter: o, grid: a } = e, r = {}, h = Array.isArray(t) && t.length || ((E = t == null ? void 0 : t.data) == null ? void 0 : E.length), p = h && (Array.isArray(t) ? t : t.data), w = typeof e.series == "string" ? e.series : e.series.data, _ = (o == null ? void 0 : o.categories.limit) > -1, A = (o == null ? void 0 : o.series.limit) > -1, $ = {}, B = [], b = /* @__PURE__ */ new Set(), k = [];
      s.forEach((f) => {
        var F;
        let T = f[w] || "未知";
        if (h) {
          let N = p.map((ce) => f[ce]).join("/") || "未知";
          if (_ && B.length >= o.categories.limit && !B.includes(N)) {
            if (!o.categories.mergeOthers)
              return;
            b.add(N), N = "其他";
          }
          $[N] || B.push(N), $[N] || ($[N] = {}), (F = $[N])[T] || (F[T] = []), $[N][T].push(f[l]);
        } else {
          if (A && k.length >= o.series.limit && !k.includes(T)) {
            if (!o.series.mergeOthers)
              return;
            T = "其他";
          }
          $[T] || k.push(T), $[T] || ($[T] = []), $[T].push(f[l]);
        }
      });
      const O = h ? [...new Set(s.map((f) => f[w]))] : k;
      if (h)
        for (let f in $)
          for (let T in $[f])
            $[f][T] = this.calcSummary(
              $[f][T],
              n,
              _ && f === "其他" ? $[f][T].length / b.size : $[f][T].length
            );
      else
        for (let f in $)
          $[f] = this.calcSummary($[f], n);
      let P = O;
      typeof e.series == "object" && e.series.formatter && (P = O.map((f) => e.series.formatter(f)));
      let U = [];
      h ? U = O.map((f, T) => ({
        name: P[T],
        type: i,
        label: { show: !0, position: "top" },
        data: B.map((F) => ({ name: F, value: $[F][f] }))
      })) : U = O.map((f, T) => ({
        name: P[T],
        type: i,
        label: { show: !0, position: "top" },
        data: O.map((F) => ({ name: F, value: F === f ? $[f] : void 0 }))
      })), Object.assign(r, {
        legend: { data: P },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? B.map((f) => t.formatter(f)) : B : w.formatter ? k.map((f) => w.formatter(f)) : k
        },
        yAxis: { type: "value" },
        series: U
      }, this.option, { grid: a }), this.update(r);
    },
    update(e = {}) {
      var t;
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1), (t = this.chart) == null || t.setOption({
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
        }
      }, !0);
    }
  }
}, Te = () => {
  Ne((e) => ({
    "169569da": e.zoomedHeight,
    "3b6fb16d": e.zoom
  }));
}, je = Se.setup;
Se.setup = je ? (e, t) => (Te(), je(e, t)) : Te;
const re = (e) => (ye("data-v-679d28b4"), e = e(), ve(), e), Lt = { class: "x-chart" }, qt = {
  class: "chart",
  ref: "el"
}, Xt = /* @__PURE__ */ re(() => /* @__PURE__ */ j("span", null, "左", -1)), zt = /* @__PURE__ */ re(() => /* @__PURE__ */ j("span", null, "上", -1)), Wt = /* @__PURE__ */ re(() => /* @__PURE__ */ j("span", null, "右", -1)), Ht = /* @__PURE__ */ re(() => /* @__PURE__ */ j("span", null, "下", -1));
function Jt(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-input-number"), r = c("el-col"), h = c("el-row"), p = c("el-checkbox"), w = c("el-tab-pane"), _ = c("el-tabs"), A = c("x-form"), $ = c("x-dialog"), B = Z("loading");
  return D((d(), v("div", Lt, [
    j("div", qt, null, 512),
    s.datasource ? (d(), v("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (b) => n.dialog.visible = !0)
    }, [
      x(" 配置 "),
      m(o, { name: "Setting" })
    ])) : S("", !0),
    m($, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[12] || (t[12] = (b) => n.dialog.visible = b),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: i.handleMakeChart,
      onCancel: t[13] || (t[13] = (b) => n.dialog.visible = !1)
    }, {
      default: u(() => [
        m(A, { dialog: n.dialog }, {
          grid: u(() => [
            m(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: u(() => [
                m(r, { span: 12 }, {
                  default: u(() => [
                    Xt,
                    m(a, {
                      modelValue: i.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (b) => i.grid.left = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: u(() => [
                    zt,
                    m(a, {
                      modelValue: i.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (b) => i.grid.top = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: u(() => [
                    Wt,
                    m(a, {
                      modelValue: i.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (b) => i.grid.right = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: u(() => [
                    Ht,
                    m(a, {
                      modelValue: i.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (b) => i.grid.bottom = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          filter: u(() => [
            m(_, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[11] || (t[11] = (b) => n.filterType = b)
            }, {
              default: u(() => [
                m(w, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: u(() => [
                    m(p, {
                      modelValue: i.categories.isLimit,
                      "onUpdate:modelValue": t[5] || (t[5] = (b) => i.categories.isLimit = b)
                    }, {
                      default: u(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    D(j("div", null, [
                      x(" 记录条数 "),
                      m(a, {
                        modelValue: i.categories.limit,
                        "onUpdate:modelValue": t[6] || (t[6] = (b) => i.categories.limit = b),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: i.categories.mergeOthers,
                        "onUpdate:modelValue": t[7] || (t[7] = (b) => i.categories.mergeOthers = b)
                      }, {
                        default: u(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Ve, i.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                m(w, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: u(() => [
                    m(p, {
                      modelValue: i.series.isLimit,
                      "onUpdate:modelValue": t[8] || (t[8] = (b) => i.series.isLimit = b)
                    }, {
                      default: u(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    D(j("div", null, [
                      x(" 记录条数 "),
                      m(a, {
                        modelValue: i.series.limit,
                        "onUpdate:modelValue": t[9] || (t[9] = (b) => i.series.limit = b),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: i.series.mergeOthers,
                        "onUpdate:modelValue": t[10] || (t[10] = (b) => i.series.mergeOthers = b)
                      }, {
                        default: u(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Ve, i.series.isLimit]
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
    [B, n.loading]
  ]);
}
const Kt = /* @__PURE__ */ V(Se, [["render", Jt], ["__scopeId", "data-v-679d28b4"]]), Yt = {
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
  emits: ["change"],
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
    formatOptions: z
  }
};
function Gt(e, t, s, l, n, i) {
  const o = c("van-checkbox"), a = c("van-checkbox-group");
  return d(), g(a, y({ class: "mobile-x-checkboxs" }, i.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: u(() => [
      (d(!0), v(M, null, I(i.formatOptions(s.options, this), (r) => (d(), g(o, y(i.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: u(() => [
          x(R(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Qt = /* @__PURE__ */ V(Yt, [["render", Gt]]), Zt = {
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
  emits: ["update:modelValue", "change"],
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
    formatOptions: z
  }
};
function es(e, t, s, l, n, i) {
  const o = c("el-checkbox"), a = c("el-checkbox-group");
  return d(), g(a, y({ class: "pc-x-checkboxs" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: u(() => [
      (d(!0), v(M, null, I(i.formatOptions(s.options, this), (r) => (d(), g(o, y(i.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: u(() => [
          x(R(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const ts = /* @__PURE__ */ V(Zt, [["render", es]]), ss = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function ns(e, t, s, l, n, i) {
  const o = c("van-col");
  return d(), g(o, y(i.attrs, { class: "mobile-x-col" }), {
    default: u(() => [
      C(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const is = /* @__PURE__ */ V(ss, [["render", ns]]), ls = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function os(e, t, s, l, n, i) {
  const o = c("el-col");
  return d(), g(o, y(i.attrs, { class: "pc-x-col" }), {
    default: u(() => [
      C(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const as = /* @__PURE__ */ V(ls, [["render", os]]), rs = {
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
function ds(e, t, s, l, n, i) {
  const o = c("van-dialog");
  return d(), g(o, y({ width: "92%" }, e.$attrs, {
    show: i.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => i.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: i.handleConfirm,
    onCancel: i.handleCancel
  }), G({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: u(() => [
        C(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: u(() => [
        C(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: u(() => [
        C(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const cs = /* @__PURE__ */ V(rs, [["render", ds]]), us = {
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
}, hs = {
  key: 1,
  class: "el-dialog__title"
};
function ms(e, t, s, l, n, i) {
  const o = c("x-icon"), a = c("el-button");
  return d(), g(ee(s.drawer ? "ElDrawer" : "ElDialog"), y({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: u(() => [
      e.$slots.header ? C(e.$slots, "header", { key: 0 }) : (d(), v("span", hs, R(e.$attrs.title), 1)),
      s.drawer ? S("", !0) : (d(), g(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: u(() => [
      e.$slots.footer ? C(e.$slots, "footer", { key: 0 }) : S("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), g(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: u(() => [
          x(R(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : S("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), g(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: u(() => [
          x(R(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : S("", !0)
    ]),
    default: u(() => [
      e.$slots.default ? C(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const ps = /* @__PURE__ */ V(us, [["render", ms]]), X = {}, J = {
  provinces: [],
  cities: [],
  counties: []
}, fs = {
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
      provinces: Object.freeze(J.provinces),
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
      this.cities = Object.freeze(J.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(J.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(X, this.areaList), J.provinces = Object.entries(X.province_list).map((e) => ({ value: e[0], text: e[1] })), J.cities = Object.entries(X.city_list).map((e) => ({ value: e[0], text: e[1] })), J.counties = Object.entries(X.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(J.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const l = Object.entries(X.province_list).find((n) => n[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(X.city_list).find((n) => n[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const l = Object.entries(X.county_list).find((n) => n[1] === s);
        this.county = l == null ? void 0 : l[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && X.province_list[this.province] || "",
        this.number > 1 && this.city && X.city_list[this.city] || "",
        this.number > 2 && this.county && X.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function gs(e, t, s, l, n, i) {
  const o = c("x-select"), a = c("x-col"), r = c("x-row");
  return d(), g(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: u(() => [
      m(a, { span: i.span }, {
        default: u(() => [
          m(o, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => n.province = h),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      i.number > 1 ? (d(), g(a, {
        key: 0,
        span: i.span
      }, {
        default: u(() => [
          m(o, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => n.city = h),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : S("", !0),
      i.number > 2 ? (d(), g(a, {
        key: 1,
        span: i.span
      }, {
        default: u(() => [
          m(o, {
            modelValue: n.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => n.county = h),
            options: n.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : S("", !0)
    ]),
    _: 1
  });
}
const bs = /* @__PURE__ */ V(fs, [["render", gs]]);
function _s() {
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
function ys() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function vs() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function ws() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return Je(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function Ss() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function ks(e) {
  var l;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
}
function $s(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function Cs(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const Q = {
  props: _s,
  computed: {
    _model: ys,
    _items: vs,
    _visibleItems: ws,
    _rules: Ss
  },
  methods: {
    calcPlaceholder: ks,
    calcStyle: $s,
    formatModelValue: Cs
  }
}, xs = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...Q.props(),
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
    ...Q.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...Q.methods
  }
};
function Vs(e, t, s, l, n, i) {
  const o = c("mobile-x-form-item"), a = c("van-cell-group"), r = c("van-form");
  return d(), g(r, {
    ref: "formRef",
    class: W(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: u(() => [
      e.$slots.pre ? C(e.$slots, "pre", { key: 0 }) : S("", !0),
      m(a, oe(Ie(e.$attrs)), {
        default: u(() => [
          (d(!0), v(M, null, I(e._visibleItems, (h, p) => (d(), g(o, y(h, {
            rules: e._rules[h.prop] || h.rules,
            key: p,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (w) => e._model[h.prop] = w,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: u(() => [
              h.slot ? C(e.$slots, h.slot, oe(y({ key: 0 }, h))) : S("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? C(e.$slots, "default", { key: 1 }) : S("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const Es = /* @__PURE__ */ V(xs, [["render", Vs]]), As = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...Q.props(),
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
    ...Q.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...Q.methods
  }
}, Os = { key: 1 };
function Ts(e, t, s, l, n, i) {
  const o = c("pc-x-form-item"), a = c("el-form"), r = c("el-collapse-item"), h = c("el-collapse");
  return d(), g(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: W((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: u(() => [
      m(r, {
        name: n.activeNames[0]
      }, {
        title: u(() => [
          e.$slots["collapse-title"] ? C(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", Os, R(s.title), 1))
        ]),
        default: u(() => [
          m(a, y({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: u(() => [
              e.$slots.pre ? C(e.$slots, "pre", { key: 0 }) : S("", !0),
              (d(!0), v(M, null, I(e._visibleItems, (p, w) => (d(), g(o, y({
                "label-width": s.labelWidth,
                "show-tooltip": e.$attrs.showTooltip || !1
              }, p, {
                key: w,
                modelValue: e._model[p.prop],
                "onUpdate:modelValue": [(_) => e._model[p.prop] = _, (_) => p.onChange || null],
                prop: p.prop || p.model,
                clearable: p.clearable !== !1,
                placeholder: e.calcPlaceholder(p),
                style: e.calcStyle(p)
              }), {
                default: u(() => [
                  p.slot ? C(e.$slots, p.slot, { key: 0 }) : S("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
              e.$slots.default ? C(e.$slots, "default", { key: 1 }) : S("", !0)
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
const js = /* @__PURE__ */ V(As, [["render", Ts]]);
function Fs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ue(e);
}
const ge = (e) => {
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
  const h = {
    ...l,
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  }, p = [];
  return o === "html" ? h.class = "comp-html" : i = c(i), a && (h.innerHTML = a), r && p.push(r), H(i, h, {
    default: () => p
  });
}, Rs = (e) => {
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
  let h = null;
  if (o)
    h = i.default();
  else if (a) {
    let p;
    h = m(c("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Fs(p = ge(e)) ? p : {
      default: () => [p]
    });
  } else
    h = ge(e);
  return H(c("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [h],
    label: () => H("span", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
        display: "inline-block"
      }
    }, [s.label])
  });
}, Bs = (e) => {
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
    modelValue: h
  } = t;
  if (a && !s.label)
    return i.default({
      ...t,
      ...s
    });
  const p = {
    modelValue: o,
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  };
  return a && s.label || r ? H(c("van-field"), p, {
    input: () => a && s.label ? i.default() : ge(e)
  }) : (Object.assign(p, l), H(c("van-field"), p));
}, Ms = {
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
    return Bs(this);
  }
};
const ke = {
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
        required: h,
        format: p,
        style: w,
        html: _,
        class: A,
        ...$
      } = { ...this.$props, ...this.$attrs };
      return $;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Rs(this);
  }
}, Fe = () => {
  Ne((e) => ({
    ba9709f0: e.width
  }));
}, Re = ke.setup;
ke.setup = Re ? (e, t) => (Fe(), Re(e, t)) : Fe;
const Ds = /* @__PURE__ */ V(ke, [["__scopeId", "data-v-d2cde1e2"]]), Be = /* @__PURE__ */ Object.assign({}), Ns = {
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
      await Promise.all(Object.keys(Be).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Be[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Is = ["src"];
function Us(e, t, s, l, n, i) {
  const o = c("van-icon");
  return n.icons[s.name] ? (d(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Is)) : (d(), g(o, y({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Ps = /* @__PURE__ */ V(Ns, [["render", Us]]), Me = /* @__PURE__ */ Object.assign({}), Ls = {
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
      await Promise.all(Object.keys(Me).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Me[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, qs = ["src"];
function Xs(e, t, s, l, n, i) {
  const o = c("el-icon");
  return n.icons[s.name] ? (d(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, qs)) : (d(), g(o, oe(y({ key: 1 }, e.$attrs)), {
    default: u(() => [
      (d(), g(ee(s.name)))
    ]),
    _: 1
  }, 16));
}
const zs = /* @__PURE__ */ V(Ls, [["render", Xs]]), { highdict: Ws } = StardustJs, { storage: Hs } = StardustBrowser, { local: Ze } = Hs, $e = ["index", "selection", "expand", "radio", "_index"];
function Js() {
  return {
    table: Object,
    loading: Boolean,
    data: Array,
    columns: Array,
    query: Object,
    total: Number,
    selection: Array,
    chartOption: Object,
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
function Ks() {
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
function Ys() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = { ...this.$attrs };
  return t in this && Object.assign(s, this[t]), s;
}
function Gs() {
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
function Qs() {
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
function Zs() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function en() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function tn() {
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
function sn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function nn() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function ln() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function on() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function an() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function rn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function dn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function cn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function un() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function hn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function mn() {
  if (!this.controller)
    return {};
  let e = this.listen;
  Array.isArray(this.listen) || (e = this.listen.split(",")), e.includes("*") && (e = [.../* @__PURE__ */ new Set([
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
  return e.forEach((s) => {
    const l = "handle" + s.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[s] = this.controller[l];
  }), t;
}
function pn() {
  const e = this._columns.filter((s) => s.type && $e.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const l = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...l,
      width: s.width || l.width
    };
  });
  return e.concat(t);
}
function fn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function gn() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function bn() {
  return this.table.hideChart || this.$attrs["hide-chart"] !== void 0 && this.$attrs["hide-chart"] !== !1;
}
function _n() {
  return this._columns.filter((e) => !e.type || !$e.includes(e.type));
}
function yn() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function vn() {
  const e = this._uid && Ze.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && $e.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: n, hide: i, width: o } = t;
    return { prop: s, label: l, show: n, hide: i, width: o };
  })), this.settings = e;
}
function wn(e) {
  Ze.setJson(`Settings[${this._uid}]`, e);
}
function Sn(e, t) {
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
      return typeof n == "function" ? n(i, e, t) : Ws.get(e, n);
  }
  return i;
}
function kn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function $n(e) {
  this.params = e, this._emit("search", e);
}
function Cn(e) {
  this.saveSettings(e), this.initSettings();
}
function xn(e, t, s, l) {
  const n = this.settings.columns.find((i) => i.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
}
function Vn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function En(e) {
  var t, s, l, n;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((n = (l = this.controller) == null ? void 0 : l.handleSortChange) == null || n.call(l, e));
}
function An(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function On(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function Tn() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function jn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Fn(e) {
  var l;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Rn(e) {
  var l;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function Bn(e, t) {
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
function Mn(e, t) {
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
function Dn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Nn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function In(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Un(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Pn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function Ln(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function qn(e, t) {
  var l;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((l = t.previewSrcList) == null ? void 0 : l.call(t)) || [s];
}
function Xn(e, t) {
  const s = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function zn() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const L = {
  props: Js,
  emits: Ks,
  computed: {
    _attrs: Ys,
    domids: Gs,
    elTableAttrs: Qs,
    _loading: Zs,
    _data: en,
    _columns: tn,
    _query: sn,
    _total: nn,
    _selection: ln,
    _chartOption: on,
    _onSearch: an,
    _onAdd: rn,
    _onExport: dn,
    _onSearchExport: cn,
    _onImport: un,
    _onMultiDelete: hn,
    _listen: mn,
    _visibleColumns: pn,
    _uid: fn,
    hideOperates: gn,
    hideChart: bn,
    searcherColumns: _n,
    searcherConfig: yn
  },
  watch: {
    $route: zn
  },
  methods: {
    initSettings: vn,
    saveSettings: wn,
    calcValue: Sn,
    calcOverflowTooltip: kn,
    handleSearch: $n,
    handleResetSettings: Cn,
    handleHeaderDragend: xn,
    handleSelectionChange: Vn,
    handleSortChange: En,
    handleCheckedChange: An,
    handleCollapseChange: On,
    handleMinus: Tn,
    handleToggleFullscreen: jn,
    cellClassName: Fn,
    cellStyle: Rn,
    calcTagType: Bn,
    calcTagValue: Mn,
    canEdit: Dn,
    canSave: Nn,
    canRowEdit: In,
    canCancelEdit: Un,
    canDelete: Pn,
    _imageSrc: Ln,
    _imagePreviewSrcList: qn,
    _emit: Xn
  }
};
const Wn = {
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
    calcValue: L.methods.calcValue
  }
}, Hn = { key: 0 }, Jn = { key: 1 };
function Kn(e, t, s, l, n, i) {
  const o = c("el-descriptions-item"), a = c("el-descriptions"), r = c("el-collapse-item"), h = c("el-collapse");
  return d(), g(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: W(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: u(() => [
      (d(!0), v(M, null, I(i.blocks, (p, w) => (d(), g(r, {
        key: w,
        title: w,
        name: w
      }, {
        default: u(() => [
          m(a, {
            column: s.column,
            border: s.border
          }, {
            default: u(() => [
              (d(!0), v(M, null, I(p, (_) => (d(), g(o, y({
                key: _.prop
              }, _), G({
                default: u(() => [
                  _.slot ? (d(), v("span", Hn, [
                    C(e.$slots, _.slot, oe(Ie({ data: s.data, field: _, value: i.calcValue(s.data, _) })), void 0, !0)
                  ])) : (d(), v("span", Jn, R(i.calcValue(s.data, _)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: u(() => [
                    C(e.$slots, "label", {
                      label: _.label
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
const Yn = /* @__PURE__ */ V(Wn, [["render", Kn], ["__scopeId", "data-v-0c3b67a5"]]), Gn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Qn = { key: 1 };
function Zn(e, t, s, l, n, i) {
  return d(), v("div", null, [
    (d(!0), v(M, null, I(s.items, (o, a) => (d(), g(ee(s.compName), y({ key: a }, o), {
      default: u(() => [
        o.slot || e.$attrs.slot ? C(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), v("span", Qn, R(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const ei = /* @__PURE__ */ V(Gn, [["render", Zn]]), ti = {
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
function si(e, t, s, l, n, i) {
  const o = c("van-col"), a = c("van-icon"), r = c("van-pagination"), h = c("van-row");
  return d(), g(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: u(() => [
      m(o, { span: 6 }, {
        default: u(() => [
          j("span", null, "总计: " + R(s.total), 1)
        ]),
        _: 1
      }),
      m(o, { span: 18 }, {
        default: u(() => [
          m(r, y({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (p) => s.query.page = p),
            "page-count": i.pageCount
          }), {
            "prev-text": u(() => [
              m(a, { name: "arrow-left" }),
              x(" 上一页 ")
            ]),
            "next-text": u(() => [
              x(" 下一页 "),
              m(a, { name: "arrow" })
            ]),
            page: u(({ text: p }) => [
              x(R(p), 1)
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
const ni = /* @__PURE__ */ V(ti, [["render", si]]), ii = {
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
function li(e, t, s, l, n, i) {
  const o = c("el-pagination");
  return d(), g(o, y({
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
const oi = /* @__PURE__ */ V(ii, [["render", li]]), ai = {
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
function ri(e, t, s, l, n, i) {
  const o = c("van-picker"), a = c("van-popup");
  return d(), v(M, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: W(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, R(s.modelValue || s.placeholder), 3),
    m(a, y({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: u(() => [
        m(o, y(e.$attrs, {
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
const di = /* @__PURE__ */ V(ai, [["render", ri]]), ci = {
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
    formatOptions: z
  }
};
function ui(e, t, s, l, n, i) {
  const o = c("van-radio"), a = c("van-radio-group");
  return d(), g(a, y({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: u(() => [
      (d(!0), v(M, null, I(i.formatOptions(s.options, this), (r) => (d(), g(o, y(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: u(() => [
          x(R(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const hi = /* @__PURE__ */ V(ci, [["render", ui]]), mi = {
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
  emits: ["update:modelValue", "change"],
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
    formatOptions: z
  }
};
function pi(e, t, s, l, n, i) {
  const o = c("el-radio-group");
  return d(), g(o, y({ class: "pc-x-radios" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: u(() => [
      (d(!0), v(M, null, I(i.formatOptions(s.options, this), (a) => (d(), g(ee(s.button ? "el-radio-button" : "el-radio"), y(i.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: u(() => [
          x(R(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const fi = /* @__PURE__ */ V(mi, [["render", pi]]), gi = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, bi = { key: 1 };
function _i(e, t, s, l, n, i) {
  const o = c("mobile-x-col"), a = c("van-row");
  return d(), g(a, { class: "mobile-x-row" }, {
    default: u(() => [
      (d(!0), v(M, null, I(s.cols, (r, h) => (d(), g(o, y(r, { key: h }), {
        default: u(() => [
          r.slot || e.$attrs.slot ? C(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", bi, R(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? C(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const yi = /* @__PURE__ */ V(gi, [["render", _i]]), vi = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, wi = { key: 1 };
function Si(e, t, s, l, n, i) {
  const o = c("pc-x-col"), a = c("el-row");
  return d(), g(a, { class: "pc-x-row" }, {
    default: u(() => [
      (d(!0), v(M, null, I(s.cols, (r, h) => (d(), g(o, y(r, { key: h }), {
        default: u(() => [
          r.slot || e.$attrs.slot ? C(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", wi, R(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? C(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const ki = /* @__PURE__ */ V(vi, [["render", Si]]), $i = {
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
function Ci(e, t, s, l, n, i) {
  const o = c("van-icon"), a = c("van-field");
  return d(), g(a, y({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    "right-icon": u(() => [
      m(o, {
        name: "scan",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const xi = /* @__PURE__ */ V($i, [["render", Ci]]), Vi = {
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
function Ei(e, t, s, l, n, i) {
  const o = c("el-button"), a = c("el-input");
  return d(), g(a, y(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    append: u(() => [
      m(o, {
        icon: "CameraFilled",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const Ai = /* @__PURE__ */ V(Vi, [["render", Ei]]), et = async (e, t, s) => {
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, i])], a.limit = a.limit || 20, l && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${l}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, Oi = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], Ti = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", ji = {
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
        this._options = z(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: z,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      et(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Fi(e, t, s, l, n, i) {
  const o = c("x-picker");
  return d(), v("div", {
    onClick: t[5] || (t[5] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(o, y(e.$attrs, {
      modelValue: i.formattedModelValue,
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
const Ri = /* @__PURE__ */ V(ji, [["render", Fi]]);
const Bi = {
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
        this._options = z(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: z,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      et(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return Oi(e, this);
    },
    calcRemarkLabel(e) {
      return Ti(e, this);
    }
  }
}, Mi = { key: 1 }, Di = { class: "main" }, Ni = { class: "remark" };
function Ii(e, t, s, l, n, i) {
  const o = c("el-option"), a = c("el-select");
  return d(), g(a, y({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || i.remoteSearch
  }), {
    default: u(() => [
      (d(!0), v(M, null, I(n._options, (r) => (d(), g(o, y(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: u(() => [
          e.$slots.custom ? C(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (d(), v("span", Mi, [
            j("span", Di, R(i.calcMainLabel(r)), 1),
            j("span", Ni, R(i.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const Ui = /* @__PURE__ */ V(Bi, [["render", Ii], ["__scopeId", "data-v-a37eab84"]]), De = {
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
}, Pi = [{
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
}], q = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  XRadios: ["eq", "ne", "special"],
  XCheckboxs: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"]
};
q["x-select"] = q.XSelect;
q["x-radios"] = q.XRadios;
q["x-checkboxs"] = q.XCheckboxs;
q["el-date-picker"] = q.ElDatePicker;
q["el-input-number"] = q.ElInputNumber;
q["el-input"] = q.ElInput;
function Li() {
  const e = window.isMobile ? "small" : "", {
    config: t,
    columns: s,
    visible: l,
    conditions: n,
    expression: i,
    handleSearch: o,
    handleReset: a,
    handleAdd: r,
    handleDelete: h,
    handleSelectField: p,
    handleSelectOp: w
  } = this;
  return m(c("x-dialog"), y({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": "查询"
  }, {
    modelValue: l,
    "onUpdate:modelValue": (_) => this.visible = _,
    onCancel: a,
    onSubmit: o
  }), {
    default: () => [t.traditional ? null : m(c("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: r
    }, {
      default: () => [x("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [n.map((_, A) => m("div", {
      class: "condition flex-center",
      key: _.no
    }, [t.traditional ? null : m(c("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(A)
    }, {
      default: () => [x("X")]
    }), t.traditional ? null : m("span", {
      class: "title"
    }, [_.no]), m("div", {
      class: "expression"
    }, [t.traditional ? m(c("el-input"), {
      modelValue: _.item.label,
      readonly: !0
    }, null) : m(c("pc-x-select"), {
      modelValue: _.prop,
      onChange: ($) => p(_, $),
      options: s,
      text: "label",
      value: "prop"
    }, null), m(c("pc-x-select"), {
      modelValue: _.op,
      onChange: ($) => w(_, $),
      options: _.ops
    }, null), m("div", {
      class: "value-container"
    }, [qi(this, _)])])]))]), t.traditional ? null : m(c("el-input"), y({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: i,
      "onUpdate:modelValue": (_) => this.expression = _
    }), null)]
  });
}
function qi(e, t) {
  const s = (n) => H(c((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (i) => t.value = i
  }, n)), l = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? m("div", {
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
    options: Pi
  }) : s();
}
const { storage: he } = StardustBrowser, Xi = {
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
  render: Li,
  methods: {
    init() {
      const e = this.uid && he.local.getJson(this.key, this.config) || this.config;
      this.initConfig(e);
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      he.local.setJson(this.key, {
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
        l.item = this.columns.find((a) => a.prop === n), l.value = o, this.handleSelectField(l, n), this.handleSelectOp(l, i), l.ops = q[l.component].map((a) => De[a]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((l) => l.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        Y({ type: "warning", message: t.toString() });
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      he.local.remove(this.key), Object.assign(this, {
        conditionNo: 1,
        conditions: [],
        expression: ""
      }), this.init();
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
            const r = this.conditions.find((h) => h.no === a * 1);
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
      e.value = "", e.prop = t, e.item = this.columns.find((f) => f.prop === e.prop);
      const { options: s, type: l, formAttrs: n = {} } = e.item, i = { ...e.item, ...n }, {
        comp: o,
        visible: a,
        canAdd: r,
        canEdit: h,
        required: p,
        slot: w,
        span: _,
        tableAttrs: A,
        formAttrs: $,
        tagTypes: B,
        tagValues: b,
        width: k,
        minWidth: O,
        disabled: P,
        readonly: U,
        ...E
      } = i;
      E.clearable ?? (E.clearable = !0), e.config = E, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = q[e.component].map((f) => De[f]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", E.type = "date"), E.type === "textarea" && delete E.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, Ce = /* @__PURE__ */ V(Xi, [["__scopeId", "data-v-d86a354a"]]);
const zi = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...L.props(),
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
    ...L.emits()
  ],
  components: { Searcher: Ce },
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
    ...L.computed,
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
    ...L.methods,
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
}, Wi = { class: "mobile-x-table" }, Hi = {
  key: 1,
  class: "card"
}, Ji = ["onClick"], Ki = { class: "row-header flex-center" }, Yi = ["value", "checked"], Gi = { class: "label" }, Qi = { class: "value" }, Zi = ["value", "checked"], el = {
  key: 2,
  class: "index"
}, tl = { class: "title" };
function sl(e, t, s, l, n, i) {
  const o = c("searcher"), a = c("x-table-tools"), r = c("van-checkbox"), h = c("x-icon"), p = c("van-cell"), w = c("van-list"), _ = c("x-pagination"), A = c("x-info"), $ = c("van-popup"), B = c("van-action-sheet");
  return d(), v("div", Wi, [
    m(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    e.hideTools !== "" && e.hideTools !== !0 ? (d(), g(a, y({ key: 0 }, e._attrs, {
      domids: e.domids,
      onAdd: e._onAdd,
      onSearch: e._onSearch,
      onExport: e._onExport,
      onSearchExport: e._onSearchExport,
      onImport: e._onImport,
      onMultiDelete: e._onMultiDelete
    }), G({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: u(() => [
          C(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: u(() => [
          C(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), v("div", Hi, [
      (d(!0), v(M, null, I(e._data, (b, k) => (d(), v("div", {
        key: k,
        class: "row",
        onClick: (O) => i.handleClickCard(k)
      }, [
        j("div", Ki, [
          i.hasSelection ? (d(), g(r, {
            key: 0,
            modelValue: n.selected[k],
            "onUpdate:modelValue": (O) => n.selected[k] = O,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = K(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
          m(h, {
            name: "ellipsis",
            class: "more",
            onClick: K((O) => i.handleShowActionSheet(b, k), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        i.hasRadio ? (d(), v("input", {
          key: 0,
          type: "radio",
          value: k,
          checked: k === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = K(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...O) => e.handleCheckedChange && e.handleCheckedChange(...O))
        }, null, 40, Yi)) : S("", !0),
        (d(!0), v(M, null, I(i.cols, (O, P) => (d(), v("div", {
          key: P,
          class: "field"
        }, [
          j("span", Gi, R(O.label) + ":", 1),
          j("span", Qi, R(e.calcValue(b, O)), 1)
        ]))), 128))
      ], 8, Ji))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), g(w, y({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (b) => e.$emit("search"))
    }), {
      default: u(() => [
        (d(!0), v(M, null, I(e._data, (b, k) => (d(), g(p, {
          key: k,
          "is-link": "",
          onClick: (O) => i.handleShowDetail(b, k)
        }, {
          default: u(() => [
            i.hasSelection ? (d(), g(r, {
              key: 0,
              modelValue: n.selected[k],
              "onUpdate:modelValue": (O) => n.selected[k] = O,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = K(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
            i.hasRadio ? (d(), v("input", {
              key: 1,
              type: "radio",
              value: k,
              checked: k === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = K(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...O) => e.handleCheckedChange && e.handleCheckedChange(...O))
            }, null, 40, Zi)) : S("", !0),
            i.hasIndex ? (d(), v("span", el, R(k + 1), 1)) : S("", !0),
            j("span", tl, R(i.calcTitle(b)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : S("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), g(_, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (b) => e._emit("search"))
    }, null, 8, ["query", "total"])) : S("", !0),
    m($, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (b) => n.popupVisible = b),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: u(() => [
        m(A, {
          data: n.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    m(B, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (b) => n.actionSheetVisible = b),
      actions: i.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: i.handleSelectAction,
      onCancel: t[10] || (t[10] = (b) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const nl = /* @__PURE__ */ V(zi, [["render", sl], ["__scopeId", "data-v-5d189b00"]]);
const il = {
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
        }));
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
  mounted() {
    this.initDraggable();
  },
  beforeUnmount() {
    this.sortable.destroy();
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
      this.sorts.push([this.columns[0].prop, "asc", this.columns[0].label]);
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
          const { prop: t, label: s, show: l, hide: n, width: i } = e;
          return { prop: t, label: s, show: l, hide: n, width: i };
        })
      });
    }
  }
}, ll = (e) => (ye("data-v-a85ab3d3"), e = e(), ve(), e), ol = {
  class: "table",
  ref: "colsTable"
}, al = ["data-prop"], rl = ["title", "onClick"], dl = /* @__PURE__ */ ll(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1)), cl = {
  class: "table",
  ref: "sortsTable"
}, ul = ["data-prop"];
function hl(e, t, s, l, n, i) {
  const o = c("el-button"), a = c("Sort"), r = c("el-icon"), h = c("ElCheckbox"), p = c("el-input-number"), w = c("el-tab-pane"), _ = c("x-select"), A = c("x-radios"), $ = c("el-tabs"), B = c("el-popover");
  return s.visible ? (d(), g(B, y({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: u(() => [
      m(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: u(() => [
      m($, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (b) => n.activeName = b)
      }, {
        default: u(() => [
          m(w, {
            name: "columns",
            label: "展示列"
          }, {
            default: u(() => [
              m(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: i.handleResetColumns
              }, {
                default: u(() => [
                  x("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", ol, [
                (d(!0), v(M, null, I(n.columns, (b) => (d(), v("div", {
                  key: b.prop,
                  "data-prop": b.prop,
                  class: "row flex-center"
                }, [
                  m(r, null, {
                    default: u(() => [
                      m(a)
                    ]),
                    _: 1
                  }),
                  m(h, {
                    modelValue: b.show,
                    "onUpdate:modelValue": (k) => b.show = k,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  j("span", {
                    class: "label overflow-text",
                    title: b.label,
                    onClick: (k) => i.handleToggle(b)
                  }, R(b.label), 9, rl),
                  m(p, {
                    modelValue: b.width,
                    "onUpdate:modelValue": (k) => b.width = k,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  dl
                ], 8, al))), 128))
              ], 512)
            ]),
            _: 1
          }),
          m(w, {
            name: "sorts",
            label: "多列排序"
          }, {
            default: u(() => [
              m(o, {
                type: "primary",
                plain: "",
                icon: "Plus",
                onClick: i.handleAddSort
              }, {
                default: u(() => [
                  x("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", cl, [
                (d(!0), v(M, null, I(n.sorts, (b, k) => (d(), v("div", {
                  key: b[0],
                  "data-prop": b[0],
                  class: "row flex-center"
                }, [
                  m(_, {
                    modelValue: b[0],
                    "onUpdate:modelValue": (O) => b[0] = O,
                    options: n.columns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(A, {
                    modelValue: b[1],
                    "onUpdate:modelValue": (O) => b[1] = O,
                    options: n.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (O) => n.sorts.splice(k, 1)
                  }, null, 8, ["onClick"])
                ], 8, ul))), 128))
              ], 512)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 16)) : S("", !0);
}
const tt = /* @__PURE__ */ V(il, [["render", hl], ["__scopeId", "data-v-a85ab3d3"]]);
const { highdict: ml } = StardustJs, pl = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...L.props()
  },
  emits: [
    ...L.emits()
  ],
  components: { Searcher: Ce, Settings: tt },
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
        ...ae()
      }
    };
  },
  computed: {
    ...L.computed
  },
  watch: {
    ...L.watch,
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
    ...L.methods,
    async handleShowPieDialog() {
      this.dialog.visible = !0, await this.$nextTick(), this.table && (this.table.chartRef = this.$refs.chartRef), this.$refs.chartRef.init(), this.$refs.chartRef.initDatasource();
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
        const l = this.controller.getSearchParams(), n = await this.controller.search(l);
        let i = ml.get(n, this.controller.listProp);
        return i = this.controller.formatList(this.controller._defaultFormatList(i, n), n), i;
      }
      return this._data;
    }
  }
}, fl = {
  key: 1,
  class: "collapse-title"
}, gl = {
  key: 2,
  class: "collapse-title"
}, bl = /* @__PURE__ */ j("span", null, "-", -1), _l = ["value", "checked"], yl = { key: 1 };
function vl(e, t, s, l, n, i) {
  const o = c("searcher"), a = c("pc-x-icon"), r = c("settings"), h = c("pc-x-table-tools"), p = c("el-image"), w = c("el-tag"), _ = c("el-table-column"), A = c("el-button"), $ = c("el-table"), B = c("x-pagination"), b = c("el-collapse-item"), k = c("el-collapse"), O = c("x-chart"), P = c("x-dialog"), U = Z("domid"), E = Z("loading");
  return d(), v(M, null, [
    j("div", {
      class: W(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      m(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      m(k, {
        modelValue: n.activeNames,
        "onUpdate:modelValue": t[5] || (t[5] = (f) => n.activeNames = f),
        class: W((n._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: u(() => [
          m(b, {
            name: n.activeNames[0]
          }, {
            title: u(() => [
              e.$slots["collapse-title"] ? C(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), v("span", fl, R(e.title), 1)) : (d(), v("span", gl, [
                x(R(e.title) + "，当前第 ", 1),
                j("span", null, R(e._query.page), 1),
                x(" 页，展示 "),
                j("span", null, R(e._data.length), 1),
                x(" 条数据， 共 "),
                j("span", null, R(e._total || e._data.length), 1),
                x(" 条数据 ")
              ]))
            ]),
            default: u(() => [
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), g(h, y({ key: 0 }, e._attrs, {
                domids: e.domids,
                onAdd: e._onAdd,
                onSearch: e._onSearch,
                onExport: e._onExport,
                onSearchExport: e._onSearchExport,
                onImport: e._onImport,
                onMultiDelete: e._onMultiDelete
              }), G({
                "tools-end": u(() => [
                  e.hideChart ? S("", !0) : (d(), g(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: i.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  j("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...f) => e.handleMinus && e.handleMinus(...f))
                  }, [
                    m(a, { name: "FullScreen" }),
                    bl
                  ]),
                  m(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  m(r, {
                    modelValue: n.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (f) => n.settings = f),
                    visible: !e.hideSettings,
                    width: e._attrs["cols-popover-width"] || 500,
                    onSort: t[2] || (t[2] = (f) => e.$emit("sort", f)),
                    onReset: e.handleResetSettings,
                    onSortChange: e.handleSortChange
                  }, null, 8, ["modelValue", "visible", "width", "onReset", "onSortChange"])
                ]),
                _: 2
              }, [
                e.$slots["tools-prefix"] ? {
                  name: "tools-prefix",
                  fn: u(() => [
                    C(e.$slots, "tools-prefix")
                  ]),
                  key: "0"
                } : void 0,
                e.$slots["tools-suffix"] ? {
                  name: "tools-suffix",
                  fn: u(() => [
                    C(e.$slots, "tools-suffix")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
              D((d(), g($, y({ ref: "tableRef" }, e.elTableAttrs, {
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: u(() => [
                  (d(!0), v(M, null, I(e._visibleColumns, (f, T) => (d(), g(_, y(f, {
                    key: T,
                    "min-width": f.minWidth,
                    align: f.align || e._attrs.tableAlign || "center",
                    resizable: f.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(f)
                  }), G({ _: 2 }, [
                    ["selection", "index"].includes(f.type) ? void 0 : {
                      name: "default",
                      fn: u((F) => [
                        f.type === "radio" ? (d(), v("input", {
                          key: 0,
                          type: "radio",
                          value: F.$index,
                          checked: F.$index === n.checked,
                          onChange: t[3] || (t[3] = (...N) => e.handleCheckedChange && e.handleCheckedChange(...N))
                        }, null, 40, _l)) : f.slot === "$image" ? (d(), g(p, y({
                          key: 1,
                          src: e._imageSrc(F, f),
                          "preview-src-list": e._imagePreviewSrcList(F, f),
                          "preview-teleported": ""
                        }, f.imageAttrs), null, 16, ["src", "preview-src-list"])) : f.slot === "$tag" ? (d(), g(w, {
                          key: 2,
                          type: e.calcTagType(F, f)
                        }, {
                          default: u(() => [
                            x(R(e.calcTagValue(F, f)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : f.slot ? C(e.$slots, f.slot, {
                          key: 3,
                          scope: F,
                          column: f,
                          value: F.row[f.prop]
                        }) : e.slotAll ? C(e.$slots, "all", {
                          key: 4,
                          scope: F,
                          column: f,
                          value: F.row[f.prop]
                        }) : (d(), v(M, { key: 5 }, [
                          f.comp === "ElSwitch" || e.table.isRowEdit && F.row.isEditing && (f.visible !== !1 || f.canEdit) ? (d(), g(ee(f.comp || "ElInput"), y({ key: 0 }, { ...f, ...f.formAttrs }, {
                            modelValue: F.row[f.prop],
                            "onUpdate:modelValue": (N) => F.row[f.prop] = N,
                            disabled: !F.row.editable || !F.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), v("span", yl, R(e.calcValue(F.row, f)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? S("", !0) : (d(), g(_, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed || "right"
                  }, {
                    default: u((f) => [
                      C(e.$slots, "operates-prefix", { scope: f }),
                      e.canEdit(f.row) ? D((d(), g(A, y({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        onClick: (T) => e._emit("edit", f)
                      }), {
                        default: u(() => [
                          m(a, { name: "edit" }),
                          x(" 编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [U, e.domids.edit]
                      ]) : S("", !0),
                      e.canSave(f.row) ? D((d(), g(A, y({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: f.row._loading,
                        onClick: (T) => e._emit("row-edit", f)
                      }), {
                        default: u(() => [
                          m(a, { name: "collection" }),
                          x(" 保存 ")
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [E, f.row._loading],
                        [U, e.domids["row-edit"]]
                      ]) : S("", !0),
                      e.canCancelEdit(f.row) ? D((d(), g(A, y({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        onClick: (T) => e._emit("cancel-edit", f)
                      }), {
                        default: u(() => [
                          m(a, { name: "refresh-left" }),
                          x(" 取消编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [U, e.domids["cancel-edit"]]
                      ]) : S("", !0),
                      e.canDelete(f.row) ? D((d(), g(A, y({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        onClick: (T) => e._emit("delete", f)
                      }), {
                        default: u(() => [
                          m(a, { name: "DeleteFilled" }),
                          x(" 删除 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [U, e.domids.delete]
                      ]) : S("", !0),
                      C(e.$slots, "operates-suffix", { scope: f })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [E, e._loading]
              ]),
              e._query && e._total ? (d(), g(B, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: t[4] || (t[4] = (f) => e._emit("search", n.params))
              }, null, 8, ["query", "total"])) : S("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? S("", !0) : (d(), g(P, {
      key: 0,
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[6] || (t[6] = (f) => n.dialog.visible = f),
      title: "图表",
      width: "96%",
      onFullscreenchange: i.handleChartDialogFullscreen
    }, {
      default: u(() => [
        m(O, {
          ref: "chartRef",
          height: "360",
          option: e._chartOption,
          datasource: { columns: e._columns, search: i.search }
        }, null, 8, ["option", "datasource"])
      ]),
      _: 1
    }, 8, ["modelValue", "onFullscreenchange"]))
  ], 64);
}
const wl = /* @__PURE__ */ V(pl, [["render", vl]]);
const Sl = {
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
}, kl = { class: "mobile-x-table-tools" }, $l = { key: 0 }, Cl = { class: "tools" }, xl = { class: "tools-end" };
function Vl(e, t, s, l, n, i) {
  const o = c("van-floating-bubble"), a = c("mobile-x-icon"), r = c("van-button"), h = Z("domid");
  return d(), v("div", kl, [
    e.$attrs.onAdd ? D((d(), v("div", $l, [
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
    ]) : S("", !0),
    j("div", Cl, [
      C(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? D((d(), g(r, y({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (p) => e.$emit("search"))
      }), {
        default: u(() => [
          m(a, { name: "search" }),
          x(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : S("", !0),
      e.$attrs.onMultiEdit ? D((d(), g(r, y({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (p) => e.$emit("multi-edit"))
      }), {
        default: u(() => [
          m(a, { name: "edit" }),
          x(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : S("", !0),
      e.$attrs.onMultiDelete ? D((d(), g(r, y({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (p) => e.$emit("multi-delete"))
      }), {
        default: u(() => [
          m(a, { name: "DeleteFilled" }),
          x(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : S("", !0),
      e.$attrs.onExport ? D((d(), g(r, y({ key: 3 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (p) => e.$emit("export"))
      }), {
        default: u(() => [
          m(a, { name: "printer" }),
          x(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : S("", !0),
      e.$attrs.onSearchExport ? D((d(), g(r, y({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (p) => e.$emit("search-export"))
      }), {
        default: u(() => [
          m(a, { name: "printer" }),
          x(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : S("", !0),
      e.$attrs.onImport ? D((d(), g(r, y({ key: 5 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (p) => e.$emit("import"))
      }), {
        default: u(() => [
          m(a, { name: "UploadFilled" }),
          x(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : S("", !0),
      C(e.$slots, "tools-suffix", {}, void 0, !0),
      j("div", xl, [
        C(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const El = /* @__PURE__ */ V(Sl, [["render", Vl], ["__scopeId", "data-v-6ef6b95e"]]);
const Al = {
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
}, Ol = { class: "tools" }, Tl = { class: "tools-end flex-center" };
function jl(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-card"), h = Z("domid");
  return d(), g(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: u(() => [
      j("div", Ol, [
        C(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? D((d(), g(a, y({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (p) => e.$emit("search"))
        }), {
          default: u(() => [
            m(o, { name: "search" }),
            x(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : S("", !0),
        e.$attrs.onAdd ? D((d(), g(a, y({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (p) => e.$emit("add"))
        }), {
          default: u(() => [
            m(o, { name: "circle-plus-filled" }),
            x(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : S("", !0),
        e.$attrs.onMultiEdit ? D((d(), g(a, y({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (p) => e.$emit("multi-edit"))
        }), {
          default: u(() => [
            m(o, { name: "edit" }),
            x(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : S("", !0),
        e.$attrs.onMultiDelete ? D((d(), g(a, y({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (p) => e.$emit("multi-delete"))
        }), {
          default: u(() => [
            m(o, { name: "DeleteFilled" }),
            x(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : S("", !0),
        e.$attrs.onExport ? D((d(), g(a, y({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (p) => e.$emit("export"))
        }), {
          default: u(() => [
            m(o, { name: "printer" }),
            x(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : S("", !0),
        e.$attrs.onSearchExport ? D((d(), g(a, y({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (p) => e.$emit("search-export"))
        }), {
          default: u(() => [
            m(o, { name: "printer" }),
            x(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : S("", !0),
        e.$attrs.onImport ? D((d(), g(a, y({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (p) => e.$emit("import"))
        }), {
          default: u(() => [
            m(o, { name: "UploadFilled" }),
            x(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : S("", !0),
        C(e.$slots, "tools-suffix", {}, void 0, !0),
        j("div", Tl, [
          C(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Fl = /* @__PURE__ */ V(Al, [["render", jl], ["__scopeId", "data-v-02d70f98"]]);
function Rl(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ue(e);
}
const Bl = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, l = (n) => {
    n ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const i = n ? e._data.slice() : [];
    e.handleSelectionChange(i);
  };
  return m(c("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: l
  }, null);
}, Ml = (e, t) => {
  const {
    rowIndex: s,
    rowData: l
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const i = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(i);
  };
  return m(c("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, Dl = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, Nl = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return m("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, de = ([e, t, s, l, n, i]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return m(c("el-button"), y({
    type: l
  }, t._attrs[s + "-btn"], {
    onClick: r
  }), {
    default: () => [m(c("x-icon"), {
      name: n
    }, null), i]
  });
}, Il = (e, t) => {
  if (t.canEdit(e.rowData))
    return de([e, t, "edit", "warning", "edit", "编辑"]);
}, Ul = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return de([e, t, "row-edit", "success", "collection", "保存"]);
}, Pl = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return de([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Ll = (e, t) => {
  if (t.canDelete(e.rowData))
    return de([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, ql = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => Ml(i, t);
  if (e.type === "index")
    return (i) => Dl(i, t);
  if (e.type === "radio")
    return (i) => Nl(i, t);
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
      const p = (_) => {
        o[a.prop] = _;
      }, w = a.comp || "ElInput";
      return H(c(w), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: p,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(i.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? m(c("el-tooltip"), {
      content: r
    }, Rl(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Xl = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, n = e.map((i, o) => {
    const {
      tableAttrs: a = {}
    } = i, r = {
      ...i,
      key: i.prop,
      dataKey: i.prop,
      title: i.label,
      width: i.width || a.width || i.minWidth || a.minWidth || i.maxWidth || a.maxWidth,
      align: i.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Bl(t)), r.cellRenderer = ql(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(i) {
      return m("div", {
        class: "operates"
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, Il(i, t), Ul(i, t), Pl(i, t), Ll(i, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), n;
}, zl = {
  convertColumnsForTableV2: Xl
};
const Wl = {
  name: "XTableV2",
  props: {
    ...L.props(),
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
    ...L.emits()
  ],
  components: { Searcher: Ce, Settings: tt },
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
    ...L.computed
  },
  watch: {
    ...L.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...L.methods,
    convertColumnsForTableV2: zl.convertColumnsForTableV2
  }
}, Hl = { key: 1 };
function Jl(e, t, s, l, n, i) {
  const o = c("Searcher"), a = c("x-icon"), r = c("Settings"), h = c("x-table-tools"), p = c("el-table-v2"), w = c("el-auto-resizer"), _ = c("x-pagination"), A = c("el-collapse-item"), $ = c("el-collapse"), B = Z("loading");
  return d(), v("div", {
    class: W(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    m(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (b) => e._emit("search", b))
    }, null, 8, ["uid", "columns", "config"]),
    m($, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (b) => n.activeNames = b),
      class: W((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: u(() => [
        m(A, {
          name: n.activeNames[0]
        }, {
          title: u(() => [
            e.$slots["collapse-title"] ? C(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", Hl, R(e.title), 1))
          ]),
          default: u(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), g(h, y({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiDelete: e._onMultiDelete
            }), G({
              "tools-end": u(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (b) => n.settings = b),
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
                  C(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: u(() => [
                  C(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
            m(w, {
              style: lt({ height: s.height })
            }, {
              default: u(({ width: b, height: k }) => [
                D((d(), g(p, y({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: b,
                  height: k
                }), G({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: u(() => [
                      C(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: u(() => [
                      C(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: u(() => [
                      C(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [B, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), g(_, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (b) => e._emit("search"))
            }, null, 8, ["query", "total"])) : S("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Kl = /* @__PURE__ */ V(Wl, [["render", Jl]]);
const me = ["selection", "radio"], Yl = {
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
      me.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !me.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (me.includes(t)) {
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
}, Gl = { class: "x-table-viewer" };
function Ql(e, t, s, l, n, i) {
  const o = c("x-dialog");
  return d(), v("div", Gl, [
    m(o, y(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: u(() => [
        (d(), g(ee(s.useTableV2 ? "x-table-v2" : "x-table"), y({
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
const Zl = /* @__PURE__ */ V(Yl, [["render", Ql], ["__scopeId", "data-v-f5d31400"]]), eo = {
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
}, to = { class: "x-tinymce" }, so = ["id", "innerHTML"];
function no(e, t, s, l, n, i) {
  return d(), v("div", to, [
    j("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, so)
  ]);
}
const io = /* @__PURE__ */ V(eo, [["render", no]]);
const lo = {
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
}, xe = (e) => (ye("data-v-fe069681"), e = e(), ve(), e), oo = { class: "mask" }, ao = {
  key: 0,
  class: "el-upload__text"
}, ro = /* @__PURE__ */ xe(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), co = /* @__PURE__ */ xe(() => /* @__PURE__ */ j("br", null, null, -1)), uo = /* @__PURE__ */ xe(() => /* @__PURE__ */ j("br", null, null, -1)), ho = {
  key: 0,
  class: "path"
};
function mo(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-upload");
  return d(), g(r, y({
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
    default: u(() => [
      j("div", oo, [
        m(o, { name: "upload-filled" }),
        n.disabled ? S("", !0) : (d(), v("div", ao, [
          x(" 将文件拖到此处，或"),
          ro,
          co,
          uo,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), g(a, {
            key: 0,
            type: "success",
            onClick: K(i.handleUploadAll, ["stop"])
          }, {
            default: u(() => [
              x(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : S("", !0)
        ]))
      ]),
      i.filepath ? (d(), v("div", ho, R(s.modelValue), 1)) : S("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const po = /* @__PURE__ */ V(lo, [["render", mo], ["__scopeId", "data-v-fe069681"]]);
const fo = {
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
      Y({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, go = ["src"];
function bo(e, t, s, l, n, i) {
  const o = c("Plus"), a = c("el-icon"), r = c("el-upload"), h = c("el-dialog");
  return d(), v(M, null, [
    m(r, y({
      "file-list": s.modelValue,
      "onUpdate:fileList": t[0] || (t[0] = (p) => e.$emit("update:modelValue", p)),
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
      default: u(() => [
        m(a, null, {
          default: u(() => [
            m(o)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload"]),
    m(h, {
      modelValue: n.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (p) => n.dialogVisible = p),
      title: "预览图片" + n.previewingImage.name
    }, {
      default: u(() => [
        j("img", {
          src: n.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, go)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const _o = /* @__PURE__ */ V(fo, [["render", bo], ["__scopeId", "data-v-821cec65"]]), pe = {
  xactionsheet: Et,
  xautorows: Ft,
  mobilexbutton: Mt,
  pcxbutton: It,
  xchart: Kt,
  mobilexcheckboxs: Qt,
  pcxcheckboxs: ts,
  mobilexcol: is,
  pcxcol: as,
  mobilexdialog: cs,
  pcxdialog: ps,
  xdistrictselect: bs,
  mobilexform: Es,
  pcxform: js,
  mobilexformitem: Ms,
  pcxformitem: Ds,
  mobilexicon: Ps,
  pcxicon: zs,
  xinfo: Yn,
  xlooper: ei,
  mobilexpagination: ni,
  pcxpagination: oi,
  xpicker: di,
  mobilexradios: hi,
  pcxradios: fi,
  mobilexrow: yi,
  pcxrow: ki,
  mobilexscan: xi,
  pcxscan: Ai,
  mobilexselect: Ri,
  pcxselect: Ui,
  mobilextable: nl,
  pcxtable: wl,
  mobilextabletools: El,
  pcxtabletools: Fl,
  xtablev2: Kl,
  xtableviewer: Zl,
  xtinymce: io,
  xfileuploader: po,
  ximageuploader: _o
}, se = {};
for (let e in pe)
  se[pe[e].name] = pe[e];
const yo = (e) => ({
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
    return H(se[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), be = (() => {
  const e = Object.keys(se), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = se[l]);
  for (const l of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(l.toLowerCase())) ? s[l] = yo(l) : s[l] = se[l];
  return s;
})(), vo = (e, t) => {
  for (let s in be)
    e.component(s, be[s]);
}, So = {
  version: "1.0.172",
  ...be,
  ...Ye,
  ...Ct,
  install: vo
};
export {
  Ge as BaseController,
  le as Confirm,
  Qe as CrudController,
  Y as Message,
  ie as Notify,
  $t as TempCrudController,
  ae as baseDialog,
  Le as baseForm,
  wt as baseModel,
  qe as baseTable,
  Ct as controllers,
  So as default,
  rt as effects,
  z as formatOptions,
  dt as formatPrecision,
  He as initDefaultForm,
  ze as initDialog,
  we as initForm,
  We as initFormRules,
  St as initModel,
  Xe as initTable,
  Je as isWhenMatched,
  Ke as triggers,
  Ye as utils,
  Pe as validateForm
};
