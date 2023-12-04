import { toRaw as nt, nextTick as te, watch as fe, resolveComponent as c, openBlock as d, createBlock as f, mergeProps as _, createElementBlock as w, Fragment as B, renderList as I, withCtx as u, renderSlot as x, toDisplayString as j, useCssVars as Fe, resolveDirective as Z, withDirectives as F, createElementVNode as T, createTextVNode as E, createVNode as p, createCommentVNode as C, vShow as ke, createSlots as G, resolveDynamicComponent as ee, normalizeClass as z, normalizeProps as oe, guardReactiveProps as Be, h as W, isVNode as Re, withModifiers as K, pushScopeId as Ne, popScopeId as Ie, normalizeStyle as it } from "vue";
const lt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class n {
    constructor(k, R, N, H, et, tt, st) {
      this.x = k, this.y = R, this.radius = N, this.color = H, this.vx = et, this.vy = tt, this.ctx = st;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => l.clearRect(0, 0, t, s), o = (b) => Math.floor(Math.random() * b);
  let a = 0, r = 0.01, h = 0;
  const m = () => {
    const b = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = y * 30), a >= 1 && (a = 1, r = -r, h = y * 30)), b.addColorStop(0, "rgba(250, 220, 20, 0.5)"), b.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = b, l.fillRect(0, 0, t, s);
  }, S = Math.floor(t / 100), g = Math.floor(s / 100), y = 20, $ = Math.round(1e3 / y), D = Array.from({ length: 52 }).map(() => {
    const b = Math.floor(o(S + g) * 1.5 + o(5));
    let k = o(t), R = o(s);
    k = Math.min(Math.max(b, k), t - b), R = Math.min(Math.max(b, R), s - b);
    let N = o(2) ? (o(2) + 2) * S : (o(-1) - 2) * S, H = o(2) ? (o(2) + 2) * g : (o(-1) - 2) * g;
    return N = Math.floor(N / y), H = Math.floor(H / y), new n(
      k,
      R,
      b,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      N,
      H,
      l
    );
  });
  let A, V;
  e.addEventListener("mouseover", (b) => {
    A = b.pageX, V = b.pageY;
  }), e.addEventListener("mousemove", (b) => {
    if (A === void 0) {
      A = b.pageX, V = b.pageY;
      return;
    }
    const k = b.pageX - A, R = b.pageY - V;
    D.forEach((N) => {
      N.x += k / y, N.y += R / y;
    }), A = b.pageX, V = b.pageY;
  });
  let M = Date.now(), U = null;
  const v = () => {
    Date.now() - M >= $ && (i(), m(), D.forEach((b) => b.update()), M = Date.now()), U = requestAnimationFrame(v);
  };
  return U = requestAnimationFrame(v), () => cancelAnimationFrame(U);
}, ot = ({
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
  const m = r.measureText(e).width + t, S = s + t;
  for (let g = t / 2; g < i; g += S)
    for (let y = t / 2; y < n; y += m)
      r[o + "Text"](e, y, g);
  return a;
}, at = {
  pop: lt,
  createWatermark: ot
}, De = async (e) => {
  var l, n;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((i) => {
    var o, a;
    return ((o = i.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = i.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((i) => De(i.form)));
  return t && s.every((i) => i);
}, rt = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, X = (e, t) => {
  const s = e.__v_isRef ? e.value : nt(e);
  let l = s;
  if (typeof s[0] != "object" && (l = s.map((i) => ({ text: i, value: i }))), !t.sort)
    return l;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return l.sort((i, o) => i[n].localeCompare(o[n]));
}, { ElMessage: dt, ElNotification: ct, ElMessageBox: ut } = window.ElementPlus || {}, { showToast: ht, showNotify: mt, showConfirmDialog: pt } = window.vant || {}, Y = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? ((l === "error" || l === "warning") && (t.type = "fail"), ht(t)) : dt({
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
  s ? (l === "error" && (t.type = "danger"), mt(t)) : ct({
    showClose: !0,
    ...t
  });
}, le = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = pt(e) : t = ut.confirm(
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
const ft = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    l.matched.length ? i() : i("/404");
  });
}, gt = (e, t, s) => {
  e.afterEach((l, n) => {
    const i = l.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...i].filter((o) => o).reverse().join("-");
  });
}, bt = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    var o;
    return l.meta.acl === !1 || (o = l.meta) != null && o.visitable || t.acl.paths.includes(l.path) ? i() : (Y.e("无权访问页面: " + l.path), i(t.acl.paths[0] || "/404"));
  }), te(() => {
    let l = !1;
    fe(() => t.acl.menus, (n) => {
      if (!l) {
        if (!n.length)
          return;
        l = !0;
      }
      const i = t.acl.paths, o = (a, r) => {
        var m, S, g, y, $, D, A;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (m = a.children) == null || m.forEach((V) => {
          var M;
          V.meta || (V.meta = {}), (M = V.meta).acl || (M.acl = !1), o(V, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((g = a.meta).hidden ?? (g.hidden = (S = r.meta) == null ? void 0 : S.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && (($ = a.meta).visitable ?? ($.visitable = (y = r.meta) == null ? void 0 : y.visitable), a.meta = { ...a.meta })), (D = a.children) == null || D.forEach((V) => o(V, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !i.includes(h), (A = a.children) != null && A.some((V) => V.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, _t = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    l.name === "Login" && t.getters.logined && l.query.redirectTo ? i(l.query.redirectTo) : i();
  });
}, yt = {
  check404: ft,
  setTitle: gt,
  checkRolesPages: bt,
  redirectTo: _t
}, Ue = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), Pe = (e = {}) => ({
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
}), ge = () => ({
  ...Ue(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), vt = () => ({
  table: Pe(),
  dialog: ge()
}), { funcs: he } = StardustJs, wt = (e, t) => {
  for (let s in e) {
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && Le(l, t), s === "dialog" && e[s]._isBaseDialog && qe(l, t), s === "form" && e[s]._isBaseForm && be(l, t));
  }
  return e;
}, Le = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), qe = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), be(e, t), e), be = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), ze(e.form, e.formItems), e.initialForm = he.deepCopy(e.form), e.initialFormRules = he.deepCopy(e.formRules), fe(() => e.formItems, () => {
  Xe(e);
}, { immediate: !0, deep: !0 }), e), Xe = (e) => {
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
    const o = t.find((y) => y.prop === i), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = He[a], h = [], m = "options" in o, g = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${m ? "选择" : "输入"}${(o == null ? void 0 : o.label) || i}` };
    o.validator && (g.validator = o.validator), o.asyncValidator && (g.asyncValidator = o.asyncValidator), o.comp ? h.push({ ...g, trigger: r.change }) : h.push({ ...g, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...g, trigger: r.blur }), n[i] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, ze = (e, t, s = !0) => {
  const l = {};
  return t.forEach((n) => {
    var h, m;
    let i = "";
    const { type: o, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && o === "number" || n.comp === "ElInputNumber")
      i = 0;
    else if (n.comp === "ElSwitch")
      i = !1;
    else if (a && ((h = n.comp) != null && h.endsWith("XCheckboxs") || (m = n.comp) != null && m.endsWith("x-checkboxs") || r))
      i = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const S = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + S), n["end-placeholder"] || (n["end-placeholder"] = "结束" + S), i = [];
    }
    l[n.prop] = i;
  }), Object.assign(e, { ...l, ...e }), e;
}, We = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [l, n] = e.split(s);
  n = n.split("|");
  let i = t[l];
  typeof i == "number" ? i += "" : typeof i == "string" && (i = i.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? i.startsWith(a) : o === "*=" ? i.includes(a) : o === "$=" ? i.endsWith(a) : o === "~=" ? !i.includes(a) : o === "!=" ? i !== a : a === i);
}, He = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, Je = {
  effects: at,
  validateForm: De,
  formatPrecision: rt,
  formatOptions: X,
  Message: Y,
  Notify: ie,
  Confirm: le,
  middlewares: yt,
  baseForm: Ue,
  baseTable: Pe,
  baseDialog: ge,
  baseModel: vt,
  initModel: wt,
  initTable: Le,
  initDialog: qe,
  initForm: be,
  initFormRules: Xe,
  initDefaultForm: ze,
  isWhenMatched: We,
  triggers: He
};
class Ke {
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
    return Je;
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
const { funcs: $e, highdict: Ce, dates: re } = StardustJs, { file: xe, excel: ne } = StardustBrowser;
class Ye extends Ke {
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
    let l = Ce.get(s, this.listProp);
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
    }), await te(), await $e.sleep(50), this._clearValidate(), this.afterAdd());
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
    o = $e.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(i._visibleColumns, "current"), r = a.map((g) => g.prop), h = a.map((g) => g.label);
    o = o.map((g) => r.map((y) => g[y]));
    let m = null;
    t === "csv" ? m = ne.export2Csv : m = ne.export2Excel;
    let S = { header: h, data: o, filename: s };
    S = await this.processExporting(S), m(S), this._isExporting = !1;
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
    n = n.map((m) => o.map((S) => m[S]));
    let r = null;
    t === "csv" ? r = ne.export2Csv : r = ne.export2Excel;
    let h = { header: a, data: n, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    const t = await xe.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), l = await xe.toType(t, s ? "text" : "arraybuffer");
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
        return o.forEach((h) => r[i[h]] = a[h]), r;
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
      const { page: i, limit: o, order: a, count: r, ...h } = s;
      this.dbTable.func(["count", h]).then((m) => this.table.total = m.data);
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
      const { format: m, formatter: S, autoFill: g } = a.tableAttrs || {}, { modelName: y } = a.formAttrs || {};
      if (y && g)
        t.forEach(($) => $[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && m !== !1) {
        const D = fe(() => a.options, (A, V) => {
          const M = V ? this.table.list : t, U = St(a);
          M.forEach((v, b) => {
            const k = v[r];
            v[`_formatted_${r}`] = U[k] || (S == null ? void 0 : S(k, v, b)) || k;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(D);
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
    const r = Ce.mapField(a.data, o, i);
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
const St = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: l = "text", value: n = "value" } = s, i = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    i[o[n]] = o[l];
  }), i;
};
class kt extends Ye {
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
  BaseController: Ke,
  CrudController: Ye,
  TempCrudController: kt
}, O = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [l, n] of t)
    s[l] = n;
  return s;
}, Ct = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function xt(e, t, s, l, n, i) {
  const o = c("van-action-sheet");
  return d(), f(o, _(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Vt = /* @__PURE__ */ O(Ct, [["render", xt]]), Et = {
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
}, At = { class: "x-auto-rows" }, Ot = { key: 1 };
function Mt(e, t, s, l, n, i) {
  const o = c("x-col"), a = c("x-row");
  return d(), w("div", At, [
    (d(!0), w(B, null, I(i.rows, (r, h) => (d(), f(a, _({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: u(() => [
        (d(!0), w(B, null, I(r, (m, S) => (d(), f(o, _(m, {
          span: m.span || s.span,
          key: S,
          platform: e.$attrs.platform
        }), {
          default: u(() => [
            m.slot || e.$attrs.slot ? x(e.$slots, m.slot || e.$attrs.slot, {
              key: 0,
              col: m
            }) : (d(), w("span", Ot, j(m.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const jt = /* @__PURE__ */ O(Et, [["render", Mt]]), Tt = {
  name: "MobileXButton"
};
function Ft(e, t, s, l, n, i) {
  const o = c("van-button");
  return d(), f(o, null, {
    default: u(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const Bt = /* @__PURE__ */ O(Tt, [["render", Ft]]), Rt = {
  name: "PcXButton"
};
function Nt(e, t, s, l, n, i) {
  const o = c("el-button");
  return d(), f(o, null, {
    default: u(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const It = /* @__PURE__ */ O(Rt, [["render", Nt]]);
const { funcs: Dt } = StardustBrowser, Ut = ["index", "selection", "expand", "radio", "_index"], _e = {
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
        ...ge(),
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
          { label: "数据筛选", slot: "filter" }
        ],
        form: {
          categories: [],
          series: "",
          attr: "",
          summary: "count",
          type: "bar",
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
      return Dt.calcPixel(this.height) * this.zoom + "px";
    },
    sidebarCollapse() {
      return this.$store.app.sidebarCollapse;
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
    this.chart = window.echarts.init(this.$refs.el), this.update(), document.addEventListener("resize", this.update), this.updator && (this.timer = setInterval(this.updator.handler.bind(this), this.updator.interval || 1e3)), this.initDatasource();
  },
  beforeUnmount() {
    document.removeEventListener("resize", this.update), this.timer && clearInterval(this.timer);
  },
  methods: {
    initDatasource() {
      if (!this.datasource)
        return;
      const e = this.datasource.columns.filter((t) => !Ut.includes(t.type));
      this.dialog.formItems.slice(0, 3).forEach((t) => t.options = e), this.handleMakeChart();
    },
    async handleMakeChart() {
      var s, l;
      this.dialog.visible = !1, this.loading = !0;
      const e = { ...this.dialog.form };
      (s = e.filter) != null && s.categories.isLimit || (e.filter.categories.mergeOthers = !1), (l = e.filter) != null && l.series.isLimit || (e.filter.series.mergeOthers = !1);
      let t = this.datasource.list;
      this.datasource.getList && (t = await this.datasource.getList()), e.data = t, this.setRich(e), this.loading = !1;
    },
    calcSummary(e, t, s) {
      let l;
      return (t === "sum" || t === "average") && (l = e.reduce((n, i) => n + i, 0)), t === "count" ? l = e.length : t === "average" ? e.length ? l = (l / (s || e.length)).toFixed(2) * 1 : l = void 0 : t === "first" ? l = e[0] : t === "last" ? l = e[e.length - 1] : (t === "max" || t === "min") && (l = Math[t].apply(null, e)), l;
    },
    setRich(e) {
      var v;
      const { categories: t, data: s, attr: l, summary: n, type: i, filter: o } = e, a = {}, r = Array.isArray(t) && t.length || ((v = t == null ? void 0 : t.data) == null ? void 0 : v.length), h = r && (Array.isArray(t) ? t : t.data), m = typeof e.series == "string" ? e.series : e.series.data, S = (o == null ? void 0 : o.categories.limit) > -1, g = (o == null ? void 0 : o.series.limit) > -1, y = {}, $ = [], D = /* @__PURE__ */ new Set(), A = [];
      s.forEach((b) => {
        var R;
        let k = b[m] || "未知";
        if (r) {
          let N = h.map((H) => b[H]).join("/") || "未知";
          if (S && $.length >= o.categories.limit && !$.includes(N)) {
            if (!o.categories.mergeOthers)
              return;
            D.add(N), N = "其他";
          }
          y[N] || $.push(N), y[N] || (y[N] = {}), (R = y[N])[k] || (R[k] = []), y[N][k].push(b[l]);
        } else {
          if (g && A.length >= o.series.limit && !A.includes(k)) {
            if (!o.series.mergeOthers)
              return;
            k = "其他";
          }
          y[k] || A.push(k), y[k] || (y[k] = []), y[k].push(b[l]);
        }
      });
      const V = r ? [...new Set(s.map((b) => b[m]))] : A;
      if (r)
        for (let b in y)
          for (let k in y[b])
            y[b][k] = this.calcSummary(
              y[b][k],
              n,
              S && b === "其他" ? y[b][k].length / D.size : y[b][k].length
            );
      else
        for (let b in y)
          y[b] = this.calcSummary(y[b], n);
      let M = V;
      typeof e.series == "object" && e.series.formatter && (M = V.map((b) => e.series.formatter(b)));
      let U = [];
      r ? U = V.map((b, k) => ({
        name: M[k],
        type: i,
        label: { show: !0, position: "top" },
        data: $.map((R) => ({ name: R, value: y[R][b] }))
      })) : U = V.map((b, k) => ({
        name: M[k],
        type: i,
        label: { show: !0, position: "top" },
        data: V.map((R) => ({ name: R, value: R === b ? y[b] : void 0 }))
      })), Object.assign(a, {
        legend: { data: M },
        xAxis: {
          type: "category",
          data: r ? t.formatter ? $.map((b) => t.formatter(b)) : $ : m.formatter ? A.map((b) => m.formatter(b)) : A
        },
        yAxis: { type: "value" },
        series: U
      }, this.option), this.update(a);
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
}, Ve = () => {
  Fe((e) => ({
    afd4065c: e.zoomedHeight,
    "2fa1922c": e.zoom
  }));
}, Ee = _e.setup;
_e.setup = Ee ? (e, t) => (Ve(), Ee(e, t)) : Ve;
const Pt = { class: "x-chart" }, Lt = {
  class: "chart",
  ref: "el"
};
function qt(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-checkbox"), r = c("el-input-number"), h = c("el-tab-pane"), m = c("el-tabs"), S = c("x-form"), g = c("x-dialog"), y = Z("loading");
  return F((d(), w("div", Pt, [
    T("div", Lt, null, 512),
    s.datasource ? (d(), w("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = ($) => n.dialog.visible = !0)
    }, [
      E(" 配置 "),
      p(o, { name: "Setting" })
    ])) : C("", !0),
    p(g, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[8] || (t[8] = ($) => n.dialog.visible = $),
      title: "图表配置",
      drawer: "",
      width: "360",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: i.handleMakeChart,
      onCancel: t[9] || (t[9] = ($) => n.dialog.visible = !1)
    }, {
      default: u(() => [
        p(S, { dialog: n.dialog }, {
          filter: u(() => [
            p(m, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[7] || (t[7] = ($) => n.filterType = $)
            }, {
              default: u(() => [
                p(h, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: u(() => [
                    p(a, {
                      modelValue: i.categories.isLimit,
                      "onUpdate:modelValue": t[1] || (t[1] = ($) => i.categories.isLimit = $)
                    }, {
                      default: u(() => [
                        E("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    F(T("div", null, [
                      E(" 记录条数 "),
                      p(r, {
                        modelValue: i.categories.limit,
                        "onUpdate:modelValue": t[2] || (t[2] = ($) => i.categories.limit = $),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(a, {
                        modelValue: i.categories.mergeOthers,
                        "onUpdate:modelValue": t[3] || (t[3] = ($) => i.categories.mergeOthers = $)
                      }, {
                        default: u(() => [
                          E("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [ke, i.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                p(h, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: u(() => [
                    p(a, {
                      modelValue: i.series.isLimit,
                      "onUpdate:modelValue": t[4] || (t[4] = ($) => i.series.isLimit = $)
                    }, {
                      default: u(() => [
                        E("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    F(T("div", null, [
                      E(" 记录条数 "),
                      p(r, {
                        modelValue: i.series.limit,
                        "onUpdate:modelValue": t[5] || (t[5] = ($) => i.series.limit = $),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(a, {
                        modelValue: i.series.mergeOthers,
                        "onUpdate:modelValue": t[6] || (t[6] = ($) => i.series.mergeOthers = $)
                      }, {
                        default: u(() => [
                          E("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [ke, i.series.isLimit]
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
    [y, n.loading]
  ]);
}
const Xt = /* @__PURE__ */ O(_e, [["render", qt], ["__scopeId", "data-v-02dac42e"]]), zt = {
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
    formatOptions: X
  }
};
function Wt(e, t, s, l, n, i) {
  const o = c("van-checkbox"), a = c("van-checkbox-group");
  return d(), f(a, _({ class: "mobile-x-checkboxs" }, i.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: u(() => [
      (d(!0), w(B, null, I(i.formatOptions(s.options, this), (r) => (d(), f(o, _(i.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: u(() => [
          E(j(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const Ht = /* @__PURE__ */ O(zt, [["render", Wt]]), Jt = {
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
    formatOptions: X
  }
};
function Kt(e, t, s, l, n, i) {
  const o = c("el-checkbox"), a = c("el-checkbox-group");
  return d(), f(a, _({ class: "pc-x-checkboxs" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: u(() => [
      (d(!0), w(B, null, I(i.formatOptions(s.options, this), (r) => (d(), f(o, _(i.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: u(() => [
          E(j(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const Yt = /* @__PURE__ */ O(Jt, [["render", Kt]]), Gt = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Qt(e, t, s, l, n, i) {
  const o = c("van-col");
  return d(), f(o, _(i.attrs, { class: "mobile-x-col" }), {
    default: u(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Zt = /* @__PURE__ */ O(Gt, [["render", Qt]]), es = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function ts(e, t, s, l, n, i) {
  const o = c("el-col");
  return d(), f(o, _(i.attrs, { class: "pc-x-col" }), {
    default: u(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const ss = /* @__PURE__ */ O(es, [["render", ts]]), ns = {
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
function is(e, t, s, l, n, i) {
  const o = c("van-dialog");
  return d(), f(o, _({ width: "92%" }, e.$attrs, {
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
        x(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: u(() => [
        x(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: u(() => [
        x(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const ls = /* @__PURE__ */ O(ns, [["render", is]]), os = {
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
}, as = {
  key: 1,
  class: "el-dialog__title"
};
function rs(e, t, s, l, n, i) {
  const o = c("x-icon"), a = c("el-button");
  return d(), f(ee(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: u(() => [
      e.$slots.header ? x(e.$slots, "header", { key: 0 }) : (d(), w("span", as, j(e.$attrs.title), 1)),
      s.drawer ? C("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: u(() => [
      e.$slots.footer ? x(e.$slots, "footer", { key: 0 }) : C("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: u(() => [
          E(j(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : C("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: u(() => [
          E(j(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : C("", !0)
    ]),
    default: u(() => [
      e.$slots.default ? x(e.$slots, "default", { key: 0 }) : C("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const ds = /* @__PURE__ */ O(os, [["render", rs]]), q = {}, J = {
  provinces: [],
  cities: [],
  counties: []
}, cs = {
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
      Object.assign(q, this.areaList), J.provinces = Object.entries(q.province_list).map((e) => ({ value: e[0], text: e[1] })), J.cities = Object.entries(q.city_list).map((e) => ({ value: e[0], text: e[1] })), J.counties = Object.entries(q.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(J.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const l = Object.entries(q.province_list).find((n) => n[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(q.city_list).find((n) => n[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const l = Object.entries(q.county_list).find((n) => n[1] === s);
        this.county = l == null ? void 0 : l[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && q.province_list[this.province] || "",
        this.number > 1 && this.city && q.city_list[this.city] || "",
        this.number > 2 && this.county && q.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function us(e, t, s, l, n, i) {
  const o = c("x-select"), a = c("x-col"), r = c("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: u(() => [
      p(a, { span: i.span }, {
        default: u(() => [
          p(o, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => n.province = h),
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
        default: u(() => [
          p(o, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => n.city = h),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : C("", !0),
      i.number > 2 ? (d(), f(a, {
        key: 1,
        span: i.span
      }, {
        default: u(() => [
          p(o, {
            modelValue: n.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => n.county = h),
            options: n.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : C("", !0)
    ]),
    _: 1
  });
}
const hs = /* @__PURE__ */ O(cs, [["render", us]]);
function ms() {
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
function ps() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function fs() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function gs() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return We(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function bs() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function _s(e) {
  var l;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
}
function ys(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function vs(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const Q = {
  props: ms,
  computed: {
    _model: ps,
    _items: fs,
    _visibleItems: gs,
    _rules: bs
  },
  methods: {
    calcPlaceholder: _s,
    calcStyle: ys,
    formatModelValue: vs
  }
}, ws = {
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
function Ss(e, t, s, l, n, i) {
  const o = c("mobile-x-form-item"), a = c("van-cell-group"), r = c("van-form");
  return d(), f(r, {
    ref: "formRef",
    class: z(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: u(() => [
      e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : C("", !0),
      p(a, oe(Be(e.$attrs)), {
        default: u(() => [
          (d(!0), w(B, null, I(e._visibleItems, (h, m) => (d(), f(o, _(h, {
            rules: e._rules[h.prop] || h.rules,
            key: m,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (S) => e._model[h.prop] = S,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: u(() => [
              h.slot ? x(e.$slots, h.slot, oe(_({ key: 0 }, h))) : C("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? x(e.$slots, "default", { key: 1 }) : C("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const ks = /* @__PURE__ */ O(ws, [["render", Ss]]), $s = {
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
}, Cs = { key: 1 };
function xs(e, t, s, l, n, i) {
  const o = c("pc-x-form-item"), a = c("el-form"), r = c("el-collapse-item"), h = c("el-collapse");
  return d(), f(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: z((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: u(() => [
      p(r, {
        name: n.activeNames[0]
      }, {
        title: u(() => [
          e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", Cs, j(s.title), 1))
        ]),
        default: u(() => [
          p(a, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: u(() => [
              e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : C("", !0),
              (d(!0), w(B, null, I(e._visibleItems, (m, S) => (d(), f(o, _({
                "label-width": s.labelWidth,
                "show-tooltip": e.$attrs.showTooltip || !1
              }, m, {
                key: S,
                modelValue: e._model[m.prop],
                "onUpdate:modelValue": [(g) => e._model[m.prop] = g, (g) => m.onChange || null],
                prop: m.prop || m.model,
                clearable: m.clearable !== !1,
                placeholder: e.calcPlaceholder(m),
                style: e.calcStyle(m)
              }), {
                default: u(() => [
                  m.slot ? x(e.$slots, m.slot, { key: 0 }) : C("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
              e.$slots.default ? x(e.$slots, "default", { key: 1 }) : C("", !0)
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
const Vs = /* @__PURE__ */ O($s, [["render", xs]]);
function Es(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Re(e);
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
  const h = {
    ...l,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  }, m = [];
  return o === "html" ? h.class = "comp-html" : i = c(i), a && (h.innerHTML = a), r && m.push(r), W(i, h, {
    default: () => m
  });
}, As = (e) => {
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
    let m;
    h = p(c("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Es(m = me(e)) ? m : {
      default: () => [m]
    });
  } else
    h = me(e);
  return W(c("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [h],
    label: () => W("span", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
        display: "inline-block"
      }
    }, [s.label])
  });
}, Os = (e) => {
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
  const m = {
    modelValue: o,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  };
  return a && s.label || r ? W(c("van-field"), m, {
    input: () => a && s.label ? i.default() : me(e)
  }) : (Object.assign(m, l), W(c("van-field"), m));
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
    return Os(this);
  }
};
const ye = {
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
        format: m,
        style: S,
        html: g,
        class: y,
        ...$
      } = { ...this.$props, ...this.$attrs };
      return $;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return As(this);
  }
}, Ae = () => {
  Fe((e) => ({
    ba9709f0: e.width
  }));
}, Oe = ye.setup;
ye.setup = Oe ? (e, t) => (Ae(), Oe(e, t)) : Ae;
const js = /* @__PURE__ */ O(ye, [["__scopeId", "data-v-d2cde1e2"]]), Me = /* @__PURE__ */ Object.assign({}), Ts = {
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
      await Promise.all(Object.keys(Me).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Me[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Fs = ["src"];
function Bs(e, t, s, l, n, i) {
  const o = c("van-icon");
  return n.icons[s.name] ? (d(), w("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Fs)) : (d(), f(o, _({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Rs = /* @__PURE__ */ O(Ts, [["render", Bs]]), je = /* @__PURE__ */ Object.assign({}), Ns = {
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
      await Promise.all(Object.keys(je).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await je[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Is = ["src"];
function Ds(e, t, s, l, n, i) {
  const o = c("el-icon");
  return n.icons[s.name] ? (d(), w("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Is)) : (d(), f(o, oe(_({ key: 1 }, e.$attrs)), {
    default: u(() => [
      (d(), f(ee(s.name)))
    ]),
    _: 1
  }, 16));
}
const Us = /* @__PURE__ */ O(Ns, [["render", Ds]]), { highdict: Ps } = StardustJs, { storage: Ls } = StardustBrowser, { local: Ge } = Ls, ve = ["index", "selection", "expand", "radio", "_index"];
function qs() {
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
function Xs() {
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
function zs() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = { ...this.$attrs };
  return t in this && Object.assign(s, this[t]), s;
}
function Ws() {
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
function Hs() {
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
function Js() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function Ks() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function Ys() {
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
function Gs() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Qs() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function Zs() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function en() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function tn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function sn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function nn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function ln() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function on() {
  return this.onMultiEdit || this._listen["multi-edit"] ? () => this._emit("multi-edit") : null;
}
function an() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function rn() {
  if (!this.controller)
    return {};
  let e = this.listen;
  Array.isArray(this.listen) || (e = this.listen.split(",")), e.includes("*") && (e = [.../* @__PURE__ */ new Set([
    ...e,
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
  ])]);
  const t = {};
  return e.forEach((s) => {
    const l = "handle" + s.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[s] = this.controller[l];
  }), t;
}
function dn() {
  const e = this._columns.filter((s) => s.type && ve.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const l = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...l,
      width: s.width || l.width
    };
  });
  return e.concat(t);
}
function cn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function un() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function hn() {
  return this._columns.filter((e) => !e.type || !ve.includes(e.type));
}
function mn() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function pn() {
  const e = this._uid && Ge.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && ve.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: n, hide: i, width: o } = t;
    return { prop: s, label: l, show: n, hide: i, width: o };
  })), this.settings = e;
}
function fn(e) {
  Ge.setJson(`Settings[${this._uid}]`, e);
}
function gn(e, t) {
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
      return typeof n == "function" ? n(i, e, t) : Ps.get(e, n);
  }
  return i;
}
function bn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function _n(e) {
  this.params = e, this._emit("search", e);
}
function yn(e) {
  this.saveSettings(e), this.initSettings();
}
function vn(e, t, s, l) {
  const n = this.settings.columns.find((i) => i.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
}
function wn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Sn(...e) {
  var t, s;
  this.onSortChange ? this.onSortChange(...e) : e[0].column.sortable === "custom" && ((s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, ...e));
}
function kn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function $n(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function Cn() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function xn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Vn(e) {
  var l;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function En(e) {
  var l;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function An(e, t) {
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
function On(e, t) {
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
function Mn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function jn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Tn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Fn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Bn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function Rn(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function Nn(e, t) {
  var l;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((l = t.previewSrcList) == null ? void 0 : l.call(t)) || [s];
}
function In(e, t) {
  const s = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Dn() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const P = {
  props: qs,
  emits: Xs,
  computed: {
    _attrs: zs,
    domids: Ws,
    elTableAttrs: Hs,
    _loading: Js,
    _data: Ks,
    _columns: Ys,
    _query: Gs,
    _total: Qs,
    _selection: Zs,
    _onSearch: en,
    _onAdd: tn,
    _onExport: sn,
    _onSearchExport: nn,
    _onImport: ln,
    _onMultiEdit: on,
    _onMultiDelete: an,
    _listen: rn,
    _visibleColumns: dn,
    _uid: cn,
    hideOperates: un,
    searcherColumns: hn,
    searcherConfig: mn
  },
  watch: {
    $route: Dn
  },
  methods: {
    initSettings: pn,
    saveSettings: fn,
    calcValue: gn,
    calcOverflowTooltip: bn,
    handleSearch: _n,
    handleResetSettings: yn,
    handleHeaderDragend: vn,
    handleSelectionChange: wn,
    handleSortChange: Sn,
    handleCheckedChange: kn,
    handleCollapseChange: $n,
    handleMinus: Cn,
    handleToggleFullscreen: xn,
    cellClassName: Vn,
    cellStyle: En,
    calcTagType: An,
    calcTagValue: On,
    canEdit: Mn,
    canSave: jn,
    canRowEdit: Tn,
    canCancelEdit: Fn,
    canDelete: Bn,
    _imageSrc: Rn,
    _imagePreviewSrcList: Nn,
    _emit: In
  }
};
const Un = {
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
    calcValue: P.methods.calcValue
  }
}, Pn = { key: 0 }, Ln = { key: 1 };
function qn(e, t, s, l, n, i) {
  const o = c("el-descriptions-item"), a = c("el-descriptions"), r = c("el-collapse-item"), h = c("el-collapse");
  return d(), f(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: z(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: u(() => [
      (d(!0), w(B, null, I(i.blocks, (m, S) => (d(), f(r, {
        key: S,
        title: S,
        name: S
      }, {
        default: u(() => [
          p(a, {
            column: s.column,
            border: s.border
          }, {
            default: u(() => [
              (d(!0), w(B, null, I(m, (g) => (d(), f(o, _({
                key: g.prop
              }, g), G({
                default: u(() => [
                  g.slot ? (d(), w("span", Pn, [
                    x(e.$slots, g.slot, oe(Be({ data: s.data, field: g, value: i.calcValue(s.data, g) })), void 0, !0)
                  ])) : (d(), w("span", Ln, j(i.calcValue(s.data, g)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: u(() => [
                    x(e.$slots, "label", {
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
const Xn = /* @__PURE__ */ O(Un, [["render", qn], ["__scopeId", "data-v-0c3b67a5"]]), zn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Wn = { key: 1 };
function Hn(e, t, s, l, n, i) {
  return d(), w("div", null, [
    (d(!0), w(B, null, I(s.items, (o, a) => (d(), f(ee(s.compName), _({ key: a }, o), {
      default: u(() => [
        o.slot || e.$attrs.slot ? x(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), w("span", Wn, j(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Jn = /* @__PURE__ */ O(zn, [["render", Hn]]), Kn = {
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
function Yn(e, t, s, l, n, i) {
  const o = c("van-col"), a = c("van-icon"), r = c("van-pagination"), h = c("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: u(() => [
      p(o, { span: 6 }, {
        default: u(() => [
          T("span", null, "总计: " + j(s.total), 1)
        ]),
        _: 1
      }),
      p(o, { span: 18 }, {
        default: u(() => [
          p(r, _({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (m) => s.query.page = m),
            "page-count": i.pageCount
          }), {
            "prev-text": u(() => [
              p(a, { name: "arrow-left" }),
              E(" 上一页 ")
            ]),
            "next-text": u(() => [
              E(" 下一页 "),
              p(a, { name: "arrow" })
            ]),
            page: u(({ text: m }) => [
              E(j(m), 1)
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
const Gn = /* @__PURE__ */ O(Kn, [["render", Yn]]), Qn = {
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
function Zn(e, t, s, l, n, i) {
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
const ei = /* @__PURE__ */ O(Qn, [["render", Zn]]), ti = {
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
function si(e, t, s, l, n, i) {
  const o = c("van-picker"), a = c("van-popup");
  return d(), w(B, null, [
    T("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: z(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, j(s.modelValue || s.placeholder), 3),
    p(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: u(() => [
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
const ni = /* @__PURE__ */ O(ti, [["render", si]]), ii = {
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
    formatOptions: X
  }
};
function li(e, t, s, l, n, i) {
  const o = c("van-radio"), a = c("van-radio-group");
  return d(), f(a, _({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: u(() => [
      (d(!0), w(B, null, I(i.formatOptions(s.options, this), (r) => (d(), f(o, _(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: u(() => [
          E(j(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const oi = /* @__PURE__ */ O(ii, [["render", li]]), ai = {
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
    formatOptions: X
  }
};
function ri(e, t, s, l, n, i) {
  const o = c("el-radio-group");
  return d(), f(o, _({ class: "pc-x-radios" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: u(() => [
      (d(!0), w(B, null, I(i.formatOptions(s.options, this), (a) => (d(), f(ee(s.button ? "el-radio-button" : "el-radio"), _(i.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: u(() => [
          E(j(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const di = /* @__PURE__ */ O(ai, [["render", ri]]), ci = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ui = { key: 1 };
function hi(e, t, s, l, n, i) {
  const o = c("mobile-x-col"), a = c("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: u(() => [
      (d(!0), w(B, null, I(s.cols, (r, h) => (d(), f(o, _(r, { key: h }), {
        default: u(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", ui, j(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : C("", !0)
    ]),
    _: 3
  });
}
const mi = /* @__PURE__ */ O(ci, [["render", hi]]), pi = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, fi = { key: 1 };
function gi(e, t, s, l, n, i) {
  const o = c("pc-x-col"), a = c("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: u(() => [
      (d(!0), w(B, null, I(s.cols, (r, h) => (d(), f(o, _(r, { key: h }), {
        default: u(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", fi, j(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : C("", !0)
    ]),
    _: 3
  });
}
const bi = /* @__PURE__ */ O(pi, [["render", gi]]), _i = {
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
function yi(e, t, s, l, n, i) {
  const o = c("van-icon"), a = c("van-field");
  return d(), f(a, _({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    "right-icon": u(() => [
      p(o, {
        name: "scan",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const vi = /* @__PURE__ */ O(_i, [["render", yi]]), wi = {
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
function Si(e, t, s, l, n, i) {
  const o = c("el-button"), a = c("el-input");
  return d(), f(a, _(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    append: u(() => [
      p(o, {
        icon: "CameraFilled",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const ki = /* @__PURE__ */ O(wi, [["render", Si]]), Qe = async (e, t, s) => {
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, i])], a.limit = a.limit || 20, l && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${l}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, $i = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], Ci = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", xi = {
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
        this._options = X(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: X,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Qe(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Vi(e, t, s, l, n, i) {
  const o = c("x-picker");
  return d(), w("div", {
    onClick: t[5] || (t[5] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(o, _(e.$attrs, {
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
const Ei = /* @__PURE__ */ O(xi, [["render", Vi]]);
const Ai = {
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
        this._options = X(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: X,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Qe(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return $i(e, this);
    },
    calcRemarkLabel(e) {
      return Ci(e, this);
    }
  }
}, Oi = { key: 1 }, Mi = { class: "main" }, ji = { class: "remark" };
function Ti(e, t, s, l, n, i) {
  const o = c("el-option"), a = c("el-select");
  return d(), f(a, _({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || i.remoteSearch
  }), {
    default: u(() => [
      (d(!0), w(B, null, I(n._options, (r) => (d(), f(o, _(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: u(() => [
          e.$slots.custom ? x(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (d(), w("span", Oi, [
            T("span", Mi, j(i.calcMainLabel(r)), 1),
            T("span", ji, j(i.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const Fi = /* @__PURE__ */ O(Ai, [["render", Ti], ["__scopeId", "data-v-a37eab84"]]), Te = {
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
}, Bi = [{
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
  XRadios: ["eq", "ne", "special"],
  XCheckboxs: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"]
};
L["x-select"] = L.XSelect;
L["x-radios"] = L.XRadios;
L["x-checkboxs"] = L.XCheckboxs;
L["el-date-picker"] = L.ElDatePicker;
L["el-input-number"] = L.ElInputNumber;
L["el-input"] = L.ElInput;
function Ri() {
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
    handleSelectField: m,
    handleSelectOp: S
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
    }, [n.map((g, y) => p("div", {
      class: "condition flex-center",
      key: g.no
    }, [t.traditional ? null : p(c("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(y)
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
      onChange: ($) => m(g, $),
      options: s,
      text: "label",
      value: "prop"
    }, null), p(c("pc-x-select"), {
      modelValue: g.op,
      onChange: ($) => S(g, $),
      options: g.ops
    }, null), p("div", {
      class: "value-container"
    }, [Ni(this, g)])])]))]), t.traditional ? null : p(c("el-input"), _({
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
function Ni(e, t) {
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
    options: Bi
  }) : s();
}
const { storage: de } = StardustBrowser, Ii = {
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
  render: Ri,
  methods: {
    init() {
      const e = this.uid && de.local.getJson(this.key, this.config) || this.config;
      this.initConfig(e);
    },
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
        l.item = this.columns.find((a) => a.prop === n), l.value = o, this.handleSelectField(l, n), this.handleSelectOp(l, i), l.ops = L[l.component].map((a) => Te[a]);
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
      de.local.remove(this.key), Object.assign(this, {
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
      e.value = "", e.prop = t, e.item = this.columns.find((k) => k.prop === e.prop);
      const { options: s, type: l, formAttrs: n = {} } = e.item, i = { ...e.item, ...n }, {
        comp: o,
        visible: a,
        canAdd: r,
        canEdit: h,
        required: m,
        slot: S,
        span: g,
        tableAttrs: y,
        formAttrs: $,
        tagTypes: D,
        tagValues: A,
        width: V,
        minWidth: M,
        disabled: U,
        readonly: v,
        ...b
      } = i;
      b.clearable ?? (b.clearable = !0), e.config = b, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = L[e.component].map((k) => Te[k]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", b.type = "date"), b.type === "textarea" && delete b.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, we = /* @__PURE__ */ O(Ii, [["__scopeId", "data-v-d86a354a"]]);
const Di = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...P.props(),
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
    ...P.emits()
  ],
  components: { Searcher: we },
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
    ...P.computed,
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
    ...P.methods,
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
}, Ui = { class: "mobile-x-table" }, Pi = {
  key: 1,
  class: "card"
}, Li = ["onClick"], qi = { class: "row-header flex-center" }, Xi = ["value", "checked"], zi = { class: "label" }, Wi = { class: "value" }, Hi = ["value", "checked"], Ji = {
  key: 2,
  class: "index"
}, Ki = { class: "title" };
function Yi(e, t, s, l, n, i) {
  const o = c("searcher"), a = c("x-table-tools"), r = c("van-checkbox"), h = c("x-icon"), m = c("van-cell"), S = c("van-list"), g = c("x-pagination"), y = c("x-info"), $ = c("van-popup"), D = c("van-action-sheet");
  return d(), w("div", Ui, [
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
    }), G({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: u(() => [
          x(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: u(() => [
          x(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : C("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), w("div", Pi, [
      (d(!0), w(B, null, I(e._data, (A, V) => (d(), w("div", {
        key: V,
        class: "row",
        onClick: (M) => i.handleClickCard(V)
      }, [
        T("div", qi, [
          i.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[V],
            "onUpdate:modelValue": (M) => n.selected[V] = M,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = K(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : C("", !0),
          p(h, {
            name: "ellipsis",
            class: "more",
            onClick: K((M) => i.handleShowActionSheet(A, V), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        i.hasRadio ? (d(), w("input", {
          key: 0,
          type: "radio",
          value: V,
          checked: V === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = K(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...M) => e.handleCheckedChange && e.handleCheckedChange(...M))
        }, null, 40, Xi)) : C("", !0),
        (d(!0), w(B, null, I(i.cols, (M, U) => (d(), w("div", {
          key: U,
          class: "field"
        }, [
          T("span", zi, j(M.label) + ":", 1),
          T("span", Wi, j(e.calcValue(A, M)), 1)
        ]))), 128))
      ], 8, Li))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(S, _({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (A) => e.$emit("search"))
    }), {
      default: u(() => [
        (d(!0), w(B, null, I(e._data, (A, V) => (d(), f(m, {
          key: V,
          "is-link": "",
          onClick: (M) => i.handleShowDetail(A, V)
        }, {
          default: u(() => [
            i.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[V],
              "onUpdate:modelValue": (M) => n.selected[V] = M,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = K(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : C("", !0),
            i.hasRadio ? (d(), w("input", {
              key: 1,
              type: "radio",
              value: V,
              checked: V === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = K(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...M) => e.handleCheckedChange && e.handleCheckedChange(...M))
            }, null, 40, Hi)) : C("", !0),
            i.hasIndex ? (d(), w("span", Ji, j(V + 1), 1)) : C("", !0),
            T("span", Ki, j(i.calcTitle(A)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : C("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(g, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (A) => e._emit("search"))
    }, null, 8, ["query", "total"])) : C("", !0),
    p($, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (A) => n.popupVisible = A),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: u(() => [
        p(y, {
          data: n.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(D, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (A) => n.actionSheetVisible = A),
      actions: i.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: i.handleSelectAction,
      onCancel: t[10] || (t[10] = (A) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Gi = /* @__PURE__ */ O(Di, [["render", Yi], ["__scopeId", "data-v-5d189b00"]]);
const Qi = {
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
}, Zi = (e) => (Ne("data-v-c81e4a2f"), e = e(), Ie(), e), el = { class: "table" }, tl = ["title", "onClick"], sl = /* @__PURE__ */ Zi(() => /* @__PURE__ */ T("span", { class: "unit" }, "px", -1));
function nl(e, t, s, l, n, i) {
  const o = c("el-button"), a = c("ElCheckbox"), r = c("el-input-number"), h = c("el-tab-pane"), m = c("el-tabs"), S = c("el-popover");
  return s.visible ? (d(), f(S, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: u(() => [
      p(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: u(() => [
      p(m, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => n.activeName = g)
      }, {
        default: u(() => [
          p(h, {
            name: "columns",
            label: "展示列"
          }, {
            default: u(() => [
              p(o, {
                type: "warning",
                icon: "Close",
                onClick: i.handleResetColumns
              }, {
                default: u(() => [
                  E("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              T("div", el, [
                (d(!0), w(B, null, I(n.columns, (g, y) => (d(), w("div", {
                  key: y,
                  class: "row flex-center"
                }, [
                  p(o, {
                    disabled: y === 0,
                    circle: "",
                    icon: "arrow-up",
                    type: "primary",
                    class: "move",
                    onClick: ($) => i.handleMove(g, y, -1)
                  }, null, 8, ["disabled", "onClick"]),
                  p(o, {
                    disabled: y === n.columns.length - 1,
                    circle: "",
                    icon: "arrow-down",
                    type: "success",
                    class: "move",
                    onClick: ($) => i.handleMove(g, y, 1)
                  }, null, 8, ["disabled", "onClick"]),
                  p(a, {
                    modelValue: g.show,
                    "onUpdate:modelValue": ($) => g.show = $,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  T("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: ($) => i.handleToggle(g)
                  }, j(g.label), 9, tl),
                  p(r, {
                    modelValue: g.width,
                    "onUpdate:modelValue": ($) => g.width = $,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  sl
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
  }, 16)) : C("", !0);
}
const Ze = /* @__PURE__ */ O(Qi, [["render", nl], ["__scopeId", "data-v-c81e4a2f"]]);
const il = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...P.props()
  },
  emits: [
    ...P.emits()
  ],
  components: { Searcher: we, Settings: Ze },
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
      _useCollapse: !1
    };
  },
  computed: {
    ...P.computed
  },
  watch: {
    ...P.watch,
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
    ...P.methods
  }
}, ll = {
  key: 1,
  class: "collapse-title"
}, ol = {
  key: 2,
  class: "collapse-title"
}, al = /* @__PURE__ */ T("span", null, "-", -1), rl = ["value", "checked"], dl = { key: 1 };
function cl(e, t, s, l, n, i) {
  const o = c("searcher"), a = c("pc-x-icon"), r = c("settings"), h = c("pc-x-table-tools"), m = c("el-image"), S = c("el-tag"), g = c("el-table-column"), y = c("el-button"), $ = c("el-table"), D = c("x-pagination"), A = c("el-collapse-item"), V = c("el-collapse"), M = Z("domid"), U = Z("loading");
  return d(), w("div", {
    class: z(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    p(V, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[4] || (t[4] = (v) => n.activeNames = v),
      class: z((n._useCollapse ? "use" : "no") + "-collapse"),
      onChange: e.handleCollapseChange
    }, {
      default: u(() => [
        p(A, {
          name: n.activeNames[0]
        }, {
          title: u(() => [
            e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), w("span", ll, j(e.title), 1)) : (d(), w("span", ol, [
              E(j(e.title) + "，当前第 ", 1),
              T("span", null, j(e._query.page), 1),
              E(" 页，展示 "),
              T("span", null, j(e._data.length), 1),
              E(" 条数据， 共 "),
              T("span", null, j(e._total || e._data.length), 1),
              E(" 条数据 ")
            ]))
          ]),
          default: u(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), G({
              "tools-end": u(() => [
                T("span", {
                  class: "minus",
                  onClick: t[0] || (t[0] = (...v) => e.handleMinus && e.handleMinus(...v))
                }, [
                  p(a, { name: "FullScreen" }),
                  al
                ]),
                p(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                p(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (v) => n.settings = v),
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
                  x(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: u(() => [
                  x(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : C("", !0),
            F((d(), f($, _({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: u(() => [
                (d(!0), w(B, null, I(e._visibleColumns, (v, b) => (d(), f(g, _(v, {
                  key: b,
                  "min-width": v.minWidth,
                  align: v.align || e._attrs.tableAlign || "center",
                  resizable: v.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(v)
                }), G({ _: 2 }, [
                  ["selection", "index"].includes(v.type) ? void 0 : {
                    name: "default",
                    fn: u((k) => [
                      v.type === "radio" ? (d(), w("input", {
                        key: 0,
                        type: "radio",
                        value: k.$index,
                        checked: k.$index === n.checked,
                        onChange: t[2] || (t[2] = (...R) => e.handleCheckedChange && e.handleCheckedChange(...R))
                      }, null, 40, rl)) : v.slot === "$image" ? (d(), f(m, _({
                        key: 1,
                        src: e._imageSrc(k, v),
                        "preview-src-list": e._imagePreviewSrcList(k, v),
                        "preview-teleported": ""
                      }, v.imageAttrs), null, 16, ["src", "preview-src-list"])) : v.slot === "$tag" ? (d(), f(S, {
                        key: 2,
                        type: e.calcTagType(k, v)
                      }, {
                        default: u(() => [
                          E(j(e.calcTagValue(k, v)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])) : v.slot ? x(e.$slots, v.slot, {
                        key: 3,
                        scope: k,
                        column: v,
                        value: k.row[v.prop]
                      }) : e.slotAll ? x(e.$slots, "all", {
                        key: 4,
                        scope: k,
                        column: v,
                        value: k.row[v.prop]
                      }) : (d(), w(B, { key: 5 }, [
                        v.comp === "ElSwitch" || e.table.isRowEdit && k.row.isEditing && (v.visible !== !1 || v.canEdit) ? (d(), f(ee(v.comp || "ElInput"), _({ key: 0 }, { ...v, ...v.formAttrs }, {
                          modelValue: k.row[v.prop],
                          "onUpdate:modelValue": (R) => k.row[v.prop] = R,
                          disabled: !k.row.editable || !k.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), w("span", dl, j(e.calcValue(k.row, v)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? C("", !0) : (d(), f(g, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: u((v) => [
                    x(e.$slots, "operates-prefix", { scope: v }),
                    e.canEdit(v.row) ? F((d(), f(y, _({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (b) => e._emit("edit", v)
                    }), {
                      default: u(() => [
                        p(a, { name: "edit" }),
                        E(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [M, e.domids.edit]
                    ]) : C("", !0),
                    e.canSave(v.row) ? F((d(), f(y, _({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: v.row._loading,
                      onClick: (b) => e._emit("row-edit", v)
                    }), {
                      default: u(() => [
                        p(a, { name: "collection" }),
                        E(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [U, v.row._loading],
                      [M, e.domids["row-edit"]]
                    ]) : C("", !0),
                    e.canCancelEdit(v.row) ? F((d(), f(y, _({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (b) => e._emit("cancel-edit", v)
                    }), {
                      default: u(() => [
                        p(a, { name: "refresh-left" }),
                        E(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [M, e.domids["cancel-edit"]]
                    ]) : C("", !0),
                    e.canDelete(v.row) ? F((d(), f(y, _({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (b) => e._emit("delete", v)
                    }), {
                      default: u(() => [
                        p(a, { name: "DeleteFilled" }),
                        E(" 删除 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [M, e.domids.delete]
                    ]) : C("", !0),
                    x(e.$slots, "operates-suffix", { scope: v })
                  ]),
                  _: 3
                }, 8, ["min-width", "align", "fixed"]))
              ]),
              _: 3
            }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
              [U, e._loading]
            ]),
            e._query && e._total ? (d(), f(D, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[3] || (t[3] = (v) => e._emit("search", n.params))
            }, null, 8, ["query", "total"])) : C("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class", "onChange"])
  ], 2);
}
const ul = /* @__PURE__ */ O(il, [["render", cl]]);
const hl = {
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
}, ml = { class: "mobile-x-table-tools" }, pl = { key: 0 }, fl = { class: "tools" }, gl = { class: "tools-end" };
function bl(e, t, s, l, n, i) {
  const o = c("van-floating-bubble"), a = c("mobile-x-icon"), r = c("van-button"), h = Z("domid");
  return d(), w("div", ml, [
    e.$attrs.onAdd ? F((d(), w("div", pl, [
      p(o, {
        axis: "xy",
        magnetic: "x",
        icon: "plus",
        class: "flex-center",
        style: { position: "fixed", top: "0", "font-size": "22px", width: "40px", height: "40px", "background-color": "#1989fa", "border-radius": "50%", color: "white" },
        onClick: t[0] || (t[0] = (m) => e.$emit("add"))
      })
    ])), [
      [h, s.domids.add]
    ]) : C("", !0),
    T("div", fl, [
      x(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? F((d(), f(r, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (m) => e.$emit("search"))
      }), {
        default: u(() => [
          p(a, { name: "search" }),
          E(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : C("", !0),
      e.$attrs.onMultiEdit ? F((d(), f(r, _({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
      }), {
        default: u(() => [
          p(a, { name: "edit" }),
          E(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : C("", !0),
      e.$attrs.onMultiDelete ? F((d(), f(r, _({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
      }), {
        default: u(() => [
          p(a, { name: "DeleteFilled" }),
          E(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : C("", !0),
      e.$attrs.onExport ? F((d(), f(r, _({ key: 3 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (m) => e.$emit("export"))
      }), {
        default: u(() => [
          p(a, { name: "printer" }),
          E(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : C("", !0),
      e.$attrs.onSearchExport ? F((d(), f(r, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
      }), {
        default: u(() => [
          p(a, { name: "printer" }),
          E(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : C("", !0),
      e.$attrs.onImport ? F((d(), f(r, _({ key: 5 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (m) => e.$emit("import"))
      }), {
        default: u(() => [
          p(a, { name: "UploadFilled" }),
          E(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : C("", !0),
      x(e.$slots, "tools-suffix", {}, void 0, !0),
      T("div", gl, [
        x(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const _l = /* @__PURE__ */ O(hl, [["render", bl], ["__scopeId", "data-v-6ef6b95e"]]);
const yl = {
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
}, vl = { class: "tools" }, wl = { class: "tools-end flex-center" };
function Sl(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-card"), h = Z("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: u(() => [
      T("div", vl, [
        x(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? F((d(), f(a, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (m) => e.$emit("search"))
        }), {
          default: u(() => [
            p(o, { name: "search" }),
            E(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : C("", !0),
        e.$attrs.onAdd ? F((d(), f(a, _({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (m) => e.$emit("add"))
        }), {
          default: u(() => [
            p(o, { name: "circle-plus-filled" }),
            E(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : C("", !0),
        e.$attrs.onMultiEdit ? F((d(), f(a, _({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
        }), {
          default: u(() => [
            p(o, { name: "edit" }),
            E(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : C("", !0),
        e.$attrs.onMultiDelete ? F((d(), f(a, _({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
        }), {
          default: u(() => [
            p(o, { name: "DeleteFilled" }),
            E(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : C("", !0),
        e.$attrs.onExport ? F((d(), f(a, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (m) => e.$emit("export"))
        }), {
          default: u(() => [
            p(o, { name: "printer" }),
            E(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : C("", !0),
        e.$attrs.onSearchExport ? F((d(), f(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
        }), {
          default: u(() => [
            p(o, { name: "printer" }),
            E(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : C("", !0),
        e.$attrs.onImport ? F((d(), f(a, _({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (m) => e.$emit("import"))
        }), {
          default: u(() => [
            p(o, { name: "UploadFilled" }),
            E(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : C("", !0),
        x(e.$slots, "tools-suffix", {}, void 0, !0),
        T("div", wl, [
          x(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const kl = /* @__PURE__ */ O(yl, [["render", Sl], ["__scopeId", "data-v-02d70f98"]]);
function $l(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Re(e);
}
const Cl = (e) => {
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
}, xl = (e, t) => {
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
}, Vl = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, El = (e, t) => {
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
}, Al = (e, t) => {
  if (t.canEdit(e.rowData))
    return ae([e, t, "edit", "warning", "edit", "编辑"]);
}, Ol = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return ae([e, t, "row-edit", "success", "collection", "保存"]);
}, Ml = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return ae([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, jl = (e, t) => {
  if (t.canDelete(e.rowData))
    return ae([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Tl = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => xl(i, t);
  if (e.type === "index")
    return (i) => Vl(i, t);
  if (e.type === "radio")
    return (i) => El(i, t);
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
      }, S = a.comp || "ElInput";
      return W(c(S), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: m,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(i.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? p(c("el-tooltip"), {
      content: r
    }, $l(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Fl = (e, t) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Cl(t)), r.cellRenderer = Tl(r, t), r;
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
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, Al(i, t), Ol(i, t), Ml(i, t), jl(i, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), n;
}, Bl = {
  convertColumnsForTableV2: Fl
};
const Rl = {
  name: "XTableV2",
  props: {
    ...P.props(),
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
    ...P.emits()
  ],
  components: { Searcher: we, Settings: Ze },
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
    ...P.computed
  },
  watch: {
    ...P.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...P.methods,
    convertColumnsForTableV2: Bl.convertColumnsForTableV2
  }
}, Nl = { key: 1 };
function Il(e, t, s, l, n, i) {
  const o = c("Searcher"), a = c("x-icon"), r = c("Settings"), h = c("x-table-tools"), m = c("el-table-v2"), S = c("el-auto-resizer"), g = c("x-pagination"), y = c("el-collapse-item"), $ = c("el-collapse"), D = Z("loading");
  return d(), w("div", {
    class: z(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (A) => e._emit("search", A))
    }, null, 8, ["uid", "columns", "config"]),
    p($, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (A) => n.activeNames = A),
      class: z((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: u(() => [
        p(y, {
          name: n.activeNames[0]
        }, {
          title: u(() => [
            e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", Nl, j(e.title), 1))
          ]),
          default: u(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiEdit: e._onMultiEdit,
              onMultiDelete: e._onMultiDelete
            }), G({
              "tools-end": u(() => [
                p(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                p(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (A) => n.settings = A),
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
                  x(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: u(() => [
                  x(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : C("", !0),
            p(S, {
              style: it({ height: s.height })
            }, {
              default: u(({ width: A, height: V }) => [
                F((d(), f(m, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: A,
                  height: V
                }), G({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: u(() => [
                      x(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: u(() => [
                      x(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: u(() => [
                      x(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [D, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(g, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (A) => e._emit("search"))
            }, null, 8, ["query", "total"])) : C("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Dl = /* @__PURE__ */ O(Rl, [["render", Il]]);
const ce = ["selection", "radio"], Ul = {
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
}, Pl = { class: "x-table-viewer" };
function Ll(e, t, s, l, n, i) {
  const o = c("x-dialog");
  return d(), w("div", Pl, [
    p(o, _(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: u(() => [
        (d(), f(ee(s.useTableV2 ? "x-table-v2" : "x-table"), _({
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
const ql = /* @__PURE__ */ O(Ul, [["render", Ll], ["__scopeId", "data-v-f5d31400"]]), Xl = {
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
}, zl = { class: "x-tinymce" }, Wl = ["id", "innerHTML"];
function Hl(e, t, s, l, n, i) {
  return d(), w("div", zl, [
    T("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, Wl)
  ]);
}
const Jl = /* @__PURE__ */ O(Xl, [["render", Hl]]);
const Kl = {
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
}, Se = (e) => (Ne("data-v-fe069681"), e = e(), Ie(), e), Yl = { class: "mask" }, Gl = {
  key: 0,
  class: "el-upload__text"
}, Ql = /* @__PURE__ */ Se(() => /* @__PURE__ */ T("em", null, "点击上传", -1)), Zl = /* @__PURE__ */ Se(() => /* @__PURE__ */ T("br", null, null, -1)), eo = /* @__PURE__ */ Se(() => /* @__PURE__ */ T("br", null, null, -1)), to = {
  key: 0,
  class: "path"
};
function so(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-upload");
  return d(), f(r, _({
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
      T("div", Yl, [
        p(o, { name: "upload-filled" }),
        n.disabled ? C("", !0) : (d(), w("div", Gl, [
          E(" 将文件拖到此处，或"),
          Ql,
          Zl,
          eo,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: K(i.handleUploadAll, ["stop"])
          }, {
            default: u(() => [
              E(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : C("", !0)
        ]))
      ]),
      i.filepath ? (d(), w("div", to, j(s.modelValue), 1)) : C("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const no = /* @__PURE__ */ O(Kl, [["render", so], ["__scopeId", "data-v-fe069681"]]);
const io = {
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
}, lo = ["src"];
function oo(e, t, s, l, n, i) {
  const o = c("Plus"), a = c("el-icon"), r = c("el-upload"), h = c("el-dialog");
  return d(), w(B, null, [
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
      default: u(() => [
        p(a, null, {
          default: u(() => [
            p(o)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload"]),
    p(h, {
      modelValue: n.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (m) => n.dialogVisible = m),
      title: "预览图片" + n.previewingImage.name
    }, {
      default: u(() => [
        T("img", {
          src: n.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, lo)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const ao = /* @__PURE__ */ O(io, [["render", oo], ["__scopeId", "data-v-821cec65"]]), ue = {
  xactionsheet: Vt,
  xautorows: jt,
  mobilexbutton: Bt,
  pcxbutton: It,
  xchart: Xt,
  mobilexcheckboxs: Ht,
  pcxcheckboxs: Yt,
  mobilexcol: Zt,
  pcxcol: ss,
  mobilexdialog: ls,
  pcxdialog: ds,
  xdistrictselect: hs,
  mobilexform: ks,
  pcxform: Vs,
  mobilexformitem: Ms,
  pcxformitem: js,
  mobilexicon: Rs,
  pcxicon: Us,
  xinfo: Xn,
  xlooper: Jn,
  mobilexpagination: Gn,
  pcxpagination: ei,
  xpicker: ni,
  mobilexradios: oi,
  pcxradios: di,
  mobilexrow: mi,
  pcxrow: bi,
  mobilexscan: vi,
  pcxscan: ki,
  mobilexselect: Ei,
  pcxselect: Fi,
  mobilextable: Gi,
  pcxtable: ul,
  mobilextabletools: _l,
  pcxtabletools: kl,
  xtablev2: Dl,
  xtableviewer: ql,
  xtinymce: Jl,
  xfileuploader: no,
  ximageuploader: ao
}, se = {};
for (let e in ue)
  se[ue[e].name] = ue[e];
const ro = (e) => ({
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
    return W(se[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), pe = (() => {
  const e = Object.keys(se), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = se[l]);
  for (const l of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(l.toLowerCase())) ? s[l] = ro(l) : s[l] = se[l];
  return s;
})(), co = (e, t) => {
  for (let s in pe)
    e.component(s, pe[s]);
}, ho = {
  version: "1.0.165",
  ...pe,
  ...Je,
  ...$t,
  install: co
};
export {
  Ke as BaseController,
  le as Confirm,
  Ye as CrudController,
  Y as Message,
  ie as Notify,
  kt as TempCrudController,
  ge as baseDialog,
  Ue as baseForm,
  vt as baseModel,
  Pe as baseTable,
  $t as controllers,
  ho as default,
  at as effects,
  X as formatOptions,
  rt as formatPrecision,
  ze as initDefaultForm,
  qe as initDialog,
  be as initForm,
  Xe as initFormRules,
  wt as initModel,
  Le as initTable,
  We as isWhenMatched,
  He as triggers,
  Je as utils,
  De as validateForm
};
