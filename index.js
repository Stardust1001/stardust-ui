import { toRaw as nt, nextTick as te, watch as ge, resolveComponent as c, openBlock as d, createBlock as g, mergeProps as b, createElementBlock as v, Fragment as R, renderList as D, withCtx as u, renderSlot as V, toDisplayString as j, useCssVars as Re, resolveDirective as Z, withDirectives as M, createElementVNode as F, createTextVNode as E, createVNode as p, createCommentVNode as $, vShow as ke, createSlots as G, resolveDynamicComponent as ee, normalizeClass as W, normalizeProps as oe, guardReactiveProps as Me, h as H, isVNode as Be, withModifiers as K, pushScopeId as De, popScopeId as Ne, normalizeStyle as it } from "vue";
const lt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class n {
    constructor(f, B, O, q, et, tt, st) {
      this.x = f, this.y = B, this.radius = O, this.color = q, this.vx = et, this.vy = tt, this.ctx = st;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => l.clearRect(0, 0, t, s), o = (y) => Math.floor(Math.random() * y);
  let a = 0, r = 0.01, h = 0;
  const m = () => {
    const y = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = w * 30), a >= 1 && (a = 1, r = -r, h = w * 30)), y.addColorStop(0, "rgba(250, 220, 20, 0.5)"), y.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = y, l.fillRect(0, 0, t, s);
  }, k = Math.floor(t / 100), _ = Math.floor(s / 100), w = 20, x = Math.round(1e3 / w), N = Array.from({ length: 52 }).map(() => {
    const y = Math.floor(o(k + _) * 1.5 + o(5));
    let f = o(t), B = o(s);
    f = Math.min(Math.max(y, f), t - y), B = Math.min(Math.max(y, B), s - y);
    let O = o(2) ? (o(2) + 2) * k : (o(-1) - 2) * k, q = o(2) ? (o(2) + 2) * _ : (o(-1) - 2) * _;
    return O = Math.floor(O / w), q = Math.floor(q / w), new n(
      f,
      B,
      y,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      O,
      q,
      l
    );
  });
  let S, C;
  e.addEventListener("mouseover", (y) => {
    S = y.pageX, C = y.pageY;
  }), e.addEventListener("mousemove", (y) => {
    if (S === void 0) {
      S = y.pageX, C = y.pageY;
      return;
    }
    const f = y.pageX - S, B = y.pageY - C;
    N.forEach((O) => {
      O.x += f / w, O.y += B / w;
    }), S = y.pageX, C = y.pageY;
  });
  let T = Date.now(), P = null;
  const I = () => {
    Date.now() - T >= x && (i(), m(), N.forEach((y) => y.update()), T = Date.now()), P = requestAnimationFrame(I);
  };
  return P = requestAnimationFrame(I), () => cancelAnimationFrame(P);
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
  const m = r.measureText(e).width + t, k = s + t;
  for (let _ = t / 2; _ < i; _ += k)
    for (let w = t / 2; w < n; w += m)
      r[o + "Text"](e, w, _);
  return a;
}, at = {
  pop: lt,
  createWatermark: ot
}, Ie = async (e) => {
  var l, n;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((i) => {
    var o, a;
    return ((o = i.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = i.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((i) => Ie(i.form)));
  return t && s.every((i) => i);
}, rt = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, z = (e, t) => {
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
    ge(() => t.acl.menus, (n) => {
      if (!l) {
        if (!n.length)
          return;
        l = !0;
      }
      const i = t.acl.paths, o = (a, r) => {
        var m, k, _, w, x, N, S;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (m = a.children) == null || m.forEach((C) => {
          var T;
          C.meta || (C.meta = {}), (T = C.meta).acl || (T.acl = !1), o(C, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((_ = a.meta).hidden ?? (_.hidden = (k = r.meta) == null ? void 0 : k.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((x = a.meta).visitable ?? (x.visitable = (w = r.meta) == null ? void 0 : w.visitable), a.meta = { ...a.meta })), (N = a.children) == null || N.forEach((C) => o(C, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !i.includes(h), (S = a.children) != null && S.some((C) => C.meta.hidden === !1) && (a.meta.hidden = !1)));
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
}), ae = () => ({
  ...Ue(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), vt = () => ({
  table: Pe(),
  dialog: ae()
}), { funcs: me } = StardustJs, wt = (e, t) => {
  for (let s in e) {
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && Le(l, t), s === "dialog" && e[s]._isBaseDialog && qe(l, t), s === "form" && e[s]._isBaseForm && be(l, t));
  }
  return e;
}, Le = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), qe = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), be(e, t), e), be = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), ze(e.form, e.formItems), e.initialForm = me.deepCopy(e.form), e.initialFormRules = me.deepCopy(e.formRules), ge(() => e.formItems, () => {
  Xe(e);
}, { immediate: !0, deep: !0 }), e), Xe = (e) => {
  const { formItems: t, initialFormRules: s } = e, l = t.filter((i) => {
    let { formAttrs: o = {}, required: a = !1 } = i;
    return a = "required" in o ? o.required : a, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && a !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, me.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !l.length)
    return;
  const n = {};
  return l.forEach((i) => {
    if (e.formRules[i])
      return;
    const o = t.find((w) => w.prop === i), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = He[a], h = [], m = "options" in o, _ = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${m ? "选择" : "输入"}${(o == null ? void 0 : o.label) || i}` };
    o.validator && (_.validator = o.validator), o.asyncValidator && (_.asyncValidator = o.asyncValidator), o.comp ? h.push({ ..._, trigger: r.change }) : h.push({ ..._, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ..._, trigger: r.blur }), n[i] = h;
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
      const k = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + k), n["end-placeholder"] || (n["end-placeholder"] = "结束" + k), i = [];
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
  validateForm: Ie,
  formatPrecision: rt,
  formatOptions: z,
  Message: Y,
  Notify: ie,
  Confirm: le,
  middlewares: yt,
  baseForm: Ue,
  baseTable: Pe,
  baseDialog: ae,
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
const { funcs: $e, highdict: Ce, dates: de } = StardustJs, { file: xe, excel: ne } = StardustBrowser;
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
    const a = this.processExportingColumns(i._visibleColumns, "current"), r = a.map((_) => _.prop), h = a.map((_) => _.label);
    o = o.map((_) => r.map((w) => _[w]));
    let m = null;
    t === "csv" ? m = ne.export2Csv : m = ne.export2Excel;
    let k = { header: h, data: o, filename: s };
    k = await this.processExporting(k), m(k), this._isExporting = !1;
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
    n = n.map((m) => o.map((k) => m[k]));
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
      n.type === "number" ? i = this.uiUtils.formatPrecision(i, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? i = de.format(i) : (!n.type || n.type === "date") && (i = de.format(i, "", !1))), l[n.model || n.prop] = i;
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
      const { format: m, formatter: k, autoFill: _ } = a.tableAttrs || {}, { modelName: w } = a.formAttrs || {};
      if (w && _)
        t.forEach((x) => x[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && m !== !1) {
        const N = ge(() => a.options, (S, C) => {
          const T = C ? this.table.list : t, P = St(a);
          T.forEach((I, y) => {
            const f = I[r];
            I[`_formatted_${r}`] = P[f] || (k == null ? void 0 : k(f, I, y)) || f;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(N);
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
        typeof a == "boolean" ? i[o] = a && 1 || 0 : a instanceof Date ? (i[o] = de.format(a), i[o].endsWith(" 00:00:00") && (i[o] = i[o].slice(0, -9))) : typeof a == "object" && (i[o] = JSON.stringify(a));
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
}, A = (e, t) => {
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
  return d(), g(o, b(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Vt = /* @__PURE__ */ A(Ct, [["render", xt]]), Et = {
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
function Tt(e, t, s, l, n, i) {
  const o = c("x-col"), a = c("x-row");
  return d(), v("div", At, [
    (d(!0), v(R, null, D(i.rows, (r, h) => (d(), g(a, b({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: u(() => [
        (d(!0), v(R, null, D(r, (m, k) => (d(), g(o, b(m, {
          span: m.span || s.span,
          key: k,
          platform: e.$attrs.platform
        }), {
          default: u(() => [
            m.slot || e.$attrs.slot ? V(e.$slots, m.slot || e.$attrs.slot, {
              key: 0,
              col: m
            }) : (d(), v("span", Ot, j(m.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const jt = /* @__PURE__ */ A(Et, [["render", Tt]]), Ft = {
  name: "MobileXButton"
};
function Rt(e, t, s, l, n, i) {
  const o = c("van-button");
  return d(), g(o, null, {
    default: u(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  });
}
const Mt = /* @__PURE__ */ A(Ft, [["render", Rt]]), Bt = {
  name: "PcXButton"
};
function Dt(e, t, s, l, n, i) {
  const o = c("el-button");
  return d(), g(o, null, {
    default: u(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  });
}
const Nt = /* @__PURE__ */ A(Bt, [["render", Dt]]);
const { funcs: It } = StardustBrowser, Ut = ["index", "selection", "expand", "radio", "_index"], _e = {
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
      return It.calcPixel(this.height) * this.zoom + "px";
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
      const e = this.datasource.columns.filter((t) => !Ut.includes(t.type));
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
      var I;
      const { categories: t, data: s, attr: l, summary: n, type: i, filter: o } = e, a = {}, r = Array.isArray(t) && t.length || ((I = t == null ? void 0 : t.data) == null ? void 0 : I.length), h = r && (Array.isArray(t) ? t : t.data), m = typeof e.series == "string" ? e.series : e.series.data, k = (o == null ? void 0 : o.categories.limit) > -1, _ = (o == null ? void 0 : o.series.limit) > -1, w = {}, x = [], N = /* @__PURE__ */ new Set(), S = [];
      s.forEach((y) => {
        var B;
        let f = y[m] || "未知";
        if (r) {
          let O = h.map((q) => y[q]).join("/") || "未知";
          if (k && x.length >= o.categories.limit && !x.includes(O)) {
            if (!o.categories.mergeOthers)
              return;
            N.add(O), O = "其他";
          }
          w[O] || x.push(O), w[O] || (w[O] = {}), (B = w[O])[f] || (B[f] = []), w[O][f].push(y[l]);
        } else {
          if (_ && S.length >= o.series.limit && !S.includes(f)) {
            if (!o.series.mergeOthers)
              return;
            f = "其他";
          }
          w[f] || S.push(f), w[f] || (w[f] = []), w[f].push(y[l]);
        }
      });
      const C = r ? [...new Set(s.map((y) => y[m]))] : S;
      if (r)
        for (let y in w)
          for (let f in w[y])
            w[y][f] = this.calcSummary(
              w[y][f],
              n,
              k && y === "其他" ? w[y][f].length / N.size : w[y][f].length
            );
      else
        for (let y in w)
          w[y] = this.calcSummary(w[y], n);
      let T = C;
      typeof e.series == "object" && e.series.formatter && (T = C.map((y) => e.series.formatter(y)));
      let P = [];
      r ? P = C.map((y, f) => ({
        name: T[f],
        type: i,
        label: { show: !0, position: "top" },
        data: x.map((B) => ({ name: B, value: w[B][y] }))
      })) : P = C.map((y, f) => ({
        name: T[f],
        type: i,
        label: { show: !0, position: "top" },
        data: C.map((B) => ({ name: B, value: B === y ? w[y] : void 0 }))
      })), Object.assign(a, {
        legend: { data: T },
        xAxis: {
          type: "category",
          data: r ? t.formatter ? x.map((y) => t.formatter(y)) : x : m.formatter ? S.map((y) => m.formatter(y)) : S
        },
        yAxis: { type: "value" },
        series: P
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
  Re((e) => ({
    f3058c2a: e.zoomedHeight,
    a5c00f76: e.zoom
  }));
}, Ee = _e.setup;
_e.setup = Ee ? (e, t) => (Ve(), Ee(e, t)) : Ve;
const Pt = { class: "x-chart" }, Lt = {
  class: "chart",
  ref: "el"
};
function qt(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-checkbox"), r = c("el-input-number"), h = c("el-tab-pane"), m = c("el-tabs"), k = c("x-form"), _ = c("x-dialog"), w = Z("loading");
  return M((d(), v("div", Pt, [
    F("div", Lt, null, 512),
    s.datasource ? (d(), v("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (x) => n.dialog.visible = !0)
    }, [
      E(" 配置 "),
      p(o, { name: "Setting" })
    ])) : $("", !0),
    p(_, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[8] || (t[8] = (x) => n.dialog.visible = x),
      title: "图表配置",
      drawer: "",
      width: "360",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: i.handleMakeChart,
      onCancel: t[9] || (t[9] = (x) => n.dialog.visible = !1)
    }, {
      default: u(() => [
        p(k, { dialog: n.dialog }, {
          filter: u(() => [
            p(m, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[7] || (t[7] = (x) => n.filterType = x)
            }, {
              default: u(() => [
                p(h, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: u(() => [
                    p(a, {
                      modelValue: i.categories.isLimit,
                      "onUpdate:modelValue": t[1] || (t[1] = (x) => i.categories.isLimit = x)
                    }, {
                      default: u(() => [
                        E("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    M(F("div", null, [
                      E(" 记录条数 "),
                      p(r, {
                        modelValue: i.categories.limit,
                        "onUpdate:modelValue": t[2] || (t[2] = (x) => i.categories.limit = x),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(a, {
                        modelValue: i.categories.mergeOthers,
                        "onUpdate:modelValue": t[3] || (t[3] = (x) => i.categories.mergeOthers = x)
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
                      "onUpdate:modelValue": t[4] || (t[4] = (x) => i.series.isLimit = x)
                    }, {
                      default: u(() => [
                        E("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    M(F("div", null, [
                      E(" 记录条数 "),
                      p(r, {
                        modelValue: i.series.limit,
                        "onUpdate:modelValue": t[5] || (t[5] = (x) => i.series.limit = x),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(a, {
                        modelValue: i.series.mergeOthers,
                        "onUpdate:modelValue": t[6] || (t[6] = (x) => i.series.mergeOthers = x)
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
    [w, n.loading]
  ]);
}
const Xt = /* @__PURE__ */ A(_e, [["render", qt], ["__scopeId", "data-v-66d40c81"]]), zt = {
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
function Wt(e, t, s, l, n, i) {
  const o = c("van-checkbox"), a = c("van-checkbox-group");
  return d(), g(a, b({ class: "mobile-x-checkboxs" }, i.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: u(() => [
      (d(!0), v(R, null, D(i.formatOptions(s.options, this), (r) => (d(), g(o, b(i.attrs, {
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
const Ht = /* @__PURE__ */ A(zt, [["render", Wt]]), Jt = {
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
function Kt(e, t, s, l, n, i) {
  const o = c("el-checkbox"), a = c("el-checkbox-group");
  return d(), g(a, b({ class: "pc-x-checkboxs" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: u(() => [
      (d(!0), v(R, null, D(i.formatOptions(s.options, this), (r) => (d(), g(o, b(i.attrs, {
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
const Yt = /* @__PURE__ */ A(Jt, [["render", Kt]]), Gt = {
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
  return d(), g(o, b(i.attrs, { class: "mobile-x-col" }), {
    default: u(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Zt = /* @__PURE__ */ A(Gt, [["render", Qt]]), es = {
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
  return d(), g(o, b(i.attrs, { class: "pc-x-col" }), {
    default: u(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const ss = /* @__PURE__ */ A(es, [["render", ts]]), ns = {
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
  return d(), g(o, b({ width: "92%" }, e.$attrs, {
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
        V(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: u(() => [
        V(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: u(() => [
        V(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const ls = /* @__PURE__ */ A(ns, [["render", is]]), os = {
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
  return d(), g(ee(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: u(() => [
      e.$slots.header ? V(e.$slots, "header", { key: 0 }) : (d(), v("span", as, j(e.$attrs.title), 1)),
      s.drawer ? $("", !0) : (d(), g(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: u(() => [
      e.$slots.footer ? V(e.$slots, "footer", { key: 0 }) : $("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), g(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: u(() => [
          E(j(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : $("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), g(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: u(() => [
          E(j(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : $("", !0)
    ]),
    default: u(() => [
      e.$slots.default ? V(e.$slots, "default", { key: 0 }) : $("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const ds = /* @__PURE__ */ A(os, [["render", rs]]), X = {}, J = {
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
function us(e, t, s, l, n, i) {
  const o = c("x-select"), a = c("x-col"), r = c("x-row");
  return d(), g(r, {
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
      i.number > 1 ? (d(), g(a, {
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
      }, 8, ["span"])) : $("", !0),
      i.number > 2 ? (d(), g(a, {
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
      }, 8, ["span"])) : $("", !0)
    ]),
    _: 1
  });
}
const hs = /* @__PURE__ */ A(cs, [["render", us]]);
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
  return d(), g(r, {
    ref: "formRef",
    class: W(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: u(() => [
      e.$slots.pre ? V(e.$slots, "pre", { key: 0 }) : $("", !0),
      p(a, oe(Me(e.$attrs)), {
        default: u(() => [
          (d(!0), v(R, null, D(e._visibleItems, (h, m) => (d(), g(o, b(h, {
            rules: e._rules[h.prop] || h.rules,
            key: m,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (k) => e._model[h.prop] = k,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: u(() => [
              h.slot ? V(e.$slots, h.slot, oe(b({ key: 0 }, h))) : $("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? V(e.$slots, "default", { key: 1 }) : $("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const ks = /* @__PURE__ */ A(ws, [["render", Ss]]), $s = {
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
  return d(), g(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: W((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: u(() => [
      p(r, {
        name: n.activeNames[0]
      }, {
        title: u(() => [
          e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", Cs, j(s.title), 1))
        ]),
        default: u(() => [
          p(a, b({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: u(() => [
              e.$slots.pre ? V(e.$slots, "pre", { key: 0 }) : $("", !0),
              (d(!0), v(R, null, D(e._visibleItems, (m, k) => (d(), g(o, b({
                "label-width": s.labelWidth,
                "show-tooltip": e.$attrs.showTooltip || !1
              }, m, {
                key: k,
                modelValue: e._model[m.prop],
                "onUpdate:modelValue": [(_) => e._model[m.prop] = _, (_) => m.onChange || null],
                prop: m.prop || m.model,
                clearable: m.clearable !== !1,
                placeholder: e.calcPlaceholder(m),
                style: e.calcStyle(m)
              }), {
                default: u(() => [
                  m.slot ? V(e.$slots, m.slot, { key: 0 }) : $("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
              e.$slots.default ? V(e.$slots, "default", { key: 1 }) : $("", !0)
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
const Vs = /* @__PURE__ */ A($s, [["render", xs]]);
function Es(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Be(e);
}
const pe = (e) => {
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
    "onUpdate:modelValue": (k) => n("update:modelValue", k)
  }, m = [];
  return o === "html" ? h.class = "comp-html" : i = c(i), a && (h.innerHTML = a), r && m.push(r), H(i, h, {
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
    }, Es(m = pe(e)) ? m : {
      default: () => [m]
    });
  } else
    h = pe(e);
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
    "onUpdate:modelValue": (k) => n("update:modelValue", k)
  };
  return a && s.label || r ? H(c("van-field"), m, {
    input: () => a && s.label ? i.default() : pe(e)
  }) : (Object.assign(m, l), H(c("van-field"), m));
}, Ts = {
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
        style: k,
        html: _,
        class: w,
        ...x
      } = { ...this.$props, ...this.$attrs };
      return x;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return As(this);
  }
}, Ae = () => {
  Re((e) => ({
    ba9709f0: e.width
  }));
}, Oe = ye.setup;
ye.setup = Oe ? (e, t) => (Ae(), Oe(e, t)) : Ae;
const js = /* @__PURE__ */ A(ye, [["__scopeId", "data-v-d2cde1e2"]]), Te = /* @__PURE__ */ Object.assign({}), Fs = {
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
      await Promise.all(Object.keys(Te).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Te[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Rs = ["src"];
function Ms(e, t, s, l, n, i) {
  const o = c("van-icon");
  return n.icons[s.name] ? (d(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Rs)) : (d(), g(o, b({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Bs = /* @__PURE__ */ A(Fs, [["render", Ms]]), je = /* @__PURE__ */ Object.assign({}), Ds = {
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
}, Ns = ["src"];
function Is(e, t, s, l, n, i) {
  const o = c("el-icon");
  return n.icons[s.name] ? (d(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Ns)) : (d(), g(o, oe(b({ key: 1 }, e.$attrs)), {
    default: u(() => [
      (d(), g(ee(s.name)))
    ]),
    _: 1
  }, 16));
}
const Us = /* @__PURE__ */ A(Ds, [["render", Is]]), { highdict: Ps } = StardustJs, { storage: Ls } = StardustBrowser, { local: Ge } = Ls, ve = ["index", "selection", "expand", "radio", "_index"];
function qs() {
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
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function tn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function sn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function nn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function ln() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function on() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
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
  return this.table.hideChart || this.$attrs["hide-chart"] !== void 0 && this.$attrs["hide-chart"] !== !1;
}
function mn() {
  return this._columns.filter((e) => !e.type || !ve.includes(e.type));
}
function pn() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function fn() {
  const e = this._uid && Ge.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && ve.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: n, hide: i, width: o } = t;
    return { prop: s, label: l, show: n, hide: i, width: o };
  })), this.settings = e;
}
function gn(e) {
  Ge.setJson(`Settings[${this._uid}]`, e);
}
function bn(e, t) {
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
function _n(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function yn(e) {
  this.params = e, this._emit("search", e);
}
function vn(e) {
  this.saveSettings(e), this.initSettings();
}
function wn(e, t, s, l) {
  const n = this.settings.columns.find((i) => i.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
}
function Sn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function kn(e) {
  var t, s, l, n;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((n = (l = this.controller) == null ? void 0 : l.handleSortChange) == null || n.call(l, e));
}
function $n(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function Cn(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function xn() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function Vn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function En(e) {
  var l;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function An(e) {
  var l;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function On(e, t) {
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
function Tn(e, t) {
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
function jn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Fn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Rn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Mn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Bn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function Dn(e, t) {
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
function Un() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const U = {
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
    _chartOption: en,
    _onSearch: tn,
    _onAdd: sn,
    _onExport: nn,
    _onSearchExport: ln,
    _onImport: on,
    _onMultiDelete: an,
    _listen: rn,
    _visibleColumns: dn,
    _uid: cn,
    hideOperates: un,
    hideChart: hn,
    searcherColumns: mn,
    searcherConfig: pn
  },
  watch: {
    $route: Un
  },
  methods: {
    initSettings: fn,
    saveSettings: gn,
    calcValue: bn,
    calcOverflowTooltip: _n,
    handleSearch: yn,
    handleResetSettings: vn,
    handleHeaderDragend: wn,
    handleSelectionChange: Sn,
    handleSortChange: kn,
    handleCheckedChange: $n,
    handleCollapseChange: Cn,
    handleMinus: xn,
    handleToggleFullscreen: Vn,
    cellClassName: En,
    cellStyle: An,
    calcTagType: On,
    calcTagValue: Tn,
    canEdit: jn,
    canSave: Fn,
    canRowEdit: Rn,
    canCancelEdit: Mn,
    canDelete: Bn,
    _imageSrc: Dn,
    _imagePreviewSrcList: Nn,
    _emit: In
  }
};
const Pn = {
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
    calcValue: U.methods.calcValue
  }
}, Ln = { key: 0 }, qn = { key: 1 };
function Xn(e, t, s, l, n, i) {
  const o = c("el-descriptions-item"), a = c("el-descriptions"), r = c("el-collapse-item"), h = c("el-collapse");
  return d(), g(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: W(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: u(() => [
      (d(!0), v(R, null, D(i.blocks, (m, k) => (d(), g(r, {
        key: k,
        title: k,
        name: k
      }, {
        default: u(() => [
          p(a, {
            column: s.column,
            border: s.border
          }, {
            default: u(() => [
              (d(!0), v(R, null, D(m, (_) => (d(), g(o, b({
                key: _.prop
              }, _), G({
                default: u(() => [
                  _.slot ? (d(), v("span", Ln, [
                    V(e.$slots, _.slot, oe(Me({ data: s.data, field: _, value: i.calcValue(s.data, _) })), void 0, !0)
                  ])) : (d(), v("span", qn, j(i.calcValue(s.data, _)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: u(() => [
                    V(e.$slots, "label", {
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
const zn = /* @__PURE__ */ A(Pn, [["render", Xn], ["__scopeId", "data-v-0c3b67a5"]]), Wn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Hn = { key: 1 };
function Jn(e, t, s, l, n, i) {
  return d(), v("div", null, [
    (d(!0), v(R, null, D(s.items, (o, a) => (d(), g(ee(s.compName), b({ key: a }, o), {
      default: u(() => [
        o.slot || e.$attrs.slot ? V(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), v("span", Hn, j(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Kn = /* @__PURE__ */ A(Wn, [["render", Jn]]), Yn = {
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
function Gn(e, t, s, l, n, i) {
  const o = c("van-col"), a = c("van-icon"), r = c("van-pagination"), h = c("van-row");
  return d(), g(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: u(() => [
      p(o, { span: 6 }, {
        default: u(() => [
          F("span", null, "总计: " + j(s.total), 1)
        ]),
        _: 1
      }),
      p(o, { span: 18 }, {
        default: u(() => [
          p(r, b({
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
const Qn = /* @__PURE__ */ A(Yn, [["render", Gn]]), Zn = {
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
function ei(e, t, s, l, n, i) {
  const o = c("el-pagination");
  return d(), g(o, b({
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
const ti = /* @__PURE__ */ A(Zn, [["render", ei]]), si = {
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
function ni(e, t, s, l, n, i) {
  const o = c("van-picker"), a = c("van-popup");
  return d(), v(R, null, [
    F("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: W(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, j(s.modelValue || s.placeholder), 3),
    p(a, b({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: u(() => [
        p(o, b(e.$attrs, {
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
const ii = /* @__PURE__ */ A(si, [["render", ni]]), li = {
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
function oi(e, t, s, l, n, i) {
  const o = c("van-radio"), a = c("van-radio-group");
  return d(), g(a, b({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: u(() => [
      (d(!0), v(R, null, D(i.formatOptions(s.options, this), (r) => (d(), g(o, b(e.$attrs, {
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
const ai = /* @__PURE__ */ A(li, [["render", oi]]), ri = {
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
function di(e, t, s, l, n, i) {
  const o = c("el-radio-group");
  return d(), g(o, b({ class: "pc-x-radios" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: u(() => [
      (d(!0), v(R, null, D(i.formatOptions(s.options, this), (a) => (d(), g(ee(s.button ? "el-radio-button" : "el-radio"), b(i.attrs, {
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
const ci = /* @__PURE__ */ A(ri, [["render", di]]), ui = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, hi = { key: 1 };
function mi(e, t, s, l, n, i) {
  const o = c("mobile-x-col"), a = c("van-row");
  return d(), g(a, { class: "mobile-x-row" }, {
    default: u(() => [
      (d(!0), v(R, null, D(s.cols, (r, h) => (d(), g(o, b(r, { key: h }), {
        default: u(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", hi, j(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : $("", !0)
    ]),
    _: 3
  });
}
const pi = /* @__PURE__ */ A(ui, [["render", mi]]), fi = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, gi = { key: 1 };
function bi(e, t, s, l, n, i) {
  const o = c("pc-x-col"), a = c("el-row");
  return d(), g(a, { class: "pc-x-row" }, {
    default: u(() => [
      (d(!0), v(R, null, D(s.cols, (r, h) => (d(), g(o, b(r, { key: h }), {
        default: u(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", gi, j(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : $("", !0)
    ]),
    _: 3
  });
}
const _i = /* @__PURE__ */ A(fi, [["render", bi]]), yi = {
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
function vi(e, t, s, l, n, i) {
  const o = c("van-icon"), a = c("van-field");
  return d(), g(a, b({ placeholder: "点此扫码" }, e.$attrs, {
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
const wi = /* @__PURE__ */ A(yi, [["render", vi]]), Si = {
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
function ki(e, t, s, l, n, i) {
  const o = c("el-button"), a = c("el-input");
  return d(), g(a, b(e.$attrs, {
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
const $i = /* @__PURE__ */ A(Si, [["render", ki]]), Qe = async (e, t, s) => {
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, i])], a.limit = a.limit || 20, l && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${l}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, Ci = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], xi = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", Vi = {
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
      Qe(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Ei(e, t, s, l, n, i) {
  const o = c("x-picker");
  return d(), v("div", {
    onClick: t[5] || (t[5] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(o, b(e.$attrs, {
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
const Ai = /* @__PURE__ */ A(Vi, [["render", Ei]]);
const Oi = {
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
      Qe(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return Ci(e, this);
    },
    calcRemarkLabel(e) {
      return xi(e, this);
    }
  }
}, Ti = { key: 1 }, ji = { class: "main" }, Fi = { class: "remark" };
function Ri(e, t, s, l, n, i) {
  const o = c("el-option"), a = c("el-select");
  return d(), g(a, b({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || i.remoteSearch
  }), {
    default: u(() => [
      (d(!0), v(R, null, D(n._options, (r) => (d(), g(o, b(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: u(() => [
          e.$slots.custom ? V(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (d(), v("span", Ti, [
            F("span", ji, j(i.calcMainLabel(r)), 1),
            F("span", Fi, j(i.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const Mi = /* @__PURE__ */ A(Oi, [["render", Ri], ["__scopeId", "data-v-a37eab84"]]), Fe = {
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
function Di() {
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
    handleSelectOp: k
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
    modelValue: l,
    "onUpdate:modelValue": (_) => this.visible = _,
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
    }, [n.map((_, w) => p("div", {
      class: "condition flex-center",
      key: _.no
    }, [t.traditional ? null : p(c("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(w)
    }, {
      default: () => [E("X")]
    }), t.traditional ? null : p("span", {
      class: "title"
    }, [_.no]), p("div", {
      class: "expression"
    }, [t.traditional ? p(c("el-input"), {
      modelValue: _.item.label,
      readonly: !0
    }, null) : p(c("pc-x-select"), {
      modelValue: _.prop,
      onChange: (x) => m(_, x),
      options: s,
      text: "label",
      value: "prop"
    }, null), p(c("pc-x-select"), {
      modelValue: _.op,
      onChange: (x) => k(_, x),
      options: _.ops
    }, null), p("div", {
      class: "value-container"
    }, [Ni(this, _)])])]))]), t.traditional ? null : p(c("el-input"), b({
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
function Ni(e, t) {
  const s = (n) => H(c((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
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
const { storage: ce } = StardustBrowser, Ii = {
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
  render: Di,
  methods: {
    init() {
      const e = this.uid && ce.local.getJson(this.key, this.config) || this.config;
      this.initConfig(e);
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      ce.local.setJson(this.key, {
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
        l.item = this.columns.find((a) => a.prop === n), l.value = o, this.handleSelectField(l, n), this.handleSelectOp(l, i), l.ops = L[l.component].map((a) => Fe[a]);
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
      ce.local.remove(this.key), Object.assign(this, {
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
        required: m,
        slot: k,
        span: _,
        tableAttrs: w,
        formAttrs: x,
        tagTypes: N,
        tagValues: S,
        width: C,
        minWidth: T,
        disabled: P,
        readonly: I,
        ...y
      } = i;
      y.clearable ?? (y.clearable = !0), e.config = y, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = L[e.component].map((f) => Fe[f]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", y.type = "date"), y.type === "textarea" && delete y.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, we = /* @__PURE__ */ A(Ii, [["__scopeId", "data-v-d86a354a"]]);
const Ui = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...U.props(),
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
    ...U.emits()
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
    ...U.computed,
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
    ...U.methods,
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
}, Pi = { class: "mobile-x-table" }, Li = {
  key: 1,
  class: "card"
}, qi = ["onClick"], Xi = { class: "row-header flex-center" }, zi = ["value", "checked"], Wi = { class: "label" }, Hi = { class: "value" }, Ji = ["value", "checked"], Ki = {
  key: 2,
  class: "index"
}, Yi = { class: "title" };
function Gi(e, t, s, l, n, i) {
  const o = c("searcher"), a = c("x-table-tools"), r = c("van-checkbox"), h = c("x-icon"), m = c("van-cell"), k = c("van-list"), _ = c("x-pagination"), w = c("x-info"), x = c("van-popup"), N = c("van-action-sheet");
  return d(), v("div", Pi, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    e.hideTools !== "" && e.hideTools !== !0 ? (d(), g(a, b({ key: 0 }, e._attrs, {
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
          V(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: u(() => [
          V(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : $("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), v("div", Li, [
      (d(!0), v(R, null, D(e._data, (S, C) => (d(), v("div", {
        key: C,
        class: "row",
        onClick: (T) => i.handleClickCard(C)
      }, [
        F("div", Xi, [
          i.hasSelection ? (d(), g(r, {
            key: 0,
            modelValue: n.selected[C],
            "onUpdate:modelValue": (T) => n.selected[C] = T,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = K(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : $("", !0),
          p(h, {
            name: "ellipsis",
            class: "more",
            onClick: K((T) => i.handleShowActionSheet(S, C), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        i.hasRadio ? (d(), v("input", {
          key: 0,
          type: "radio",
          value: C,
          checked: C === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = K(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
        }, null, 40, zi)) : $("", !0),
        (d(!0), v(R, null, D(i.cols, (T, P) => (d(), v("div", {
          key: P,
          class: "field"
        }, [
          F("span", Wi, j(T.label) + ":", 1),
          F("span", Hi, j(e.calcValue(S, T)), 1)
        ]))), 128))
      ], 8, qi))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), g(k, b({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (S) => e.$emit("search"))
    }), {
      default: u(() => [
        (d(!0), v(R, null, D(e._data, (S, C) => (d(), g(m, {
          key: C,
          "is-link": "",
          onClick: (T) => i.handleShowDetail(S, C)
        }, {
          default: u(() => [
            i.hasSelection ? (d(), g(r, {
              key: 0,
              modelValue: n.selected[C],
              "onUpdate:modelValue": (T) => n.selected[C] = T,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = K(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : $("", !0),
            i.hasRadio ? (d(), v("input", {
              key: 1,
              type: "radio",
              value: C,
              checked: C === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = K(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
            }, null, 40, Ji)) : $("", !0),
            i.hasIndex ? (d(), v("span", Ki, j(C + 1), 1)) : $("", !0),
            F("span", Yi, j(i.calcTitle(S)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : $("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), g(_, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (S) => e._emit("search"))
    }, null, 8, ["query", "total"])) : $("", !0),
    p(x, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (S) => n.popupVisible = S),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: u(() => [
        p(w, {
          data: n.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(N, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (S) => n.actionSheetVisible = S),
      actions: i.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: i.handleSelectAction,
      onCancel: t[10] || (t[10] = (S) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Qi = /* @__PURE__ */ A(Ui, [["render", Gi], ["__scopeId", "data-v-5d189b00"]]);
const Zi = {
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
}, el = (e) => (De("data-v-a85ab3d3"), e = e(), Ne(), e), tl = {
  class: "table",
  ref: "colsTable"
}, sl = ["data-prop"], nl = ["title", "onClick"], il = /* @__PURE__ */ el(() => /* @__PURE__ */ F("span", { class: "unit" }, "px", -1)), ll = {
  class: "table",
  ref: "sortsTable"
}, ol = ["data-prop"];
function al(e, t, s, l, n, i) {
  const o = c("el-button"), a = c("Sort"), r = c("el-icon"), h = c("ElCheckbox"), m = c("el-input-number"), k = c("el-tab-pane"), _ = c("x-select"), w = c("x-radios"), x = c("el-tabs"), N = c("el-popover");
  return s.visible ? (d(), g(N, b({
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
      p(x, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (S) => n.activeName = S)
      }, {
        default: u(() => [
          p(k, {
            name: "columns",
            label: "展示列"
          }, {
            default: u(() => [
              p(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: i.handleResetColumns
              }, {
                default: u(() => [
                  E("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              F("div", tl, [
                (d(!0), v(R, null, D(n.columns, (S) => (d(), v("div", {
                  key: S.prop,
                  "data-prop": S.prop,
                  class: "row flex-center"
                }, [
                  p(r, null, {
                    default: u(() => [
                      p(a)
                    ]),
                    _: 1
                  }),
                  p(h, {
                    modelValue: S.show,
                    "onUpdate:modelValue": (C) => S.show = C,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  F("span", {
                    class: "label overflow-text",
                    title: S.label,
                    onClick: (C) => i.handleToggle(S)
                  }, j(S.label), 9, nl),
                  p(m, {
                    modelValue: S.width,
                    "onUpdate:modelValue": (C) => S.width = C,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  il
                ], 8, sl))), 128))
              ], 512)
            ]),
            _: 1
          }),
          p(k, {
            name: "sorts",
            label: "多列排序"
          }, {
            default: u(() => [
              p(o, {
                type: "primary",
                plain: "",
                icon: "Plus",
                onClick: i.handleAddSort
              }, {
                default: u(() => [
                  E("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              F("div", ll, [
                (d(!0), v(R, null, D(n.sorts, (S, C) => (d(), v("div", {
                  key: S[0],
                  "data-prop": S[0],
                  class: "row flex-center"
                }, [
                  p(_, {
                    modelValue: S[0],
                    "onUpdate:modelValue": (T) => S[0] = T,
                    options: n.columns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(w, {
                    modelValue: S[1],
                    "onUpdate:modelValue": (T) => S[1] = T,
                    options: n.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (T) => n.sorts.splice(C, 1)
                  }, null, 8, ["onClick"])
                ], 8, ol))), 128))
              ], 512)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 16)) : $("", !0);
}
const Ze = /* @__PURE__ */ A(Zi, [["render", al], ["__scopeId", "data-v-a85ab3d3"]]);
const { highdict: rl } = StardustJs, dl = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...U.props()
  },
  emits: [
    ...U.emits()
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
      _useCollapse: !1,
      dialog: {
        ...ae()
      }
    };
  },
  computed: {
    ...U.computed
  },
  watch: {
    ...U.watch,
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
    ...U.methods,
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
        return this.controller[t];
      if (e && this.controller.getSearchParams) {
        const l = this.controller.getSearchParams(), n = await this.controller.search(l);
        let i = rl.get(n, this.controller.listProp);
        return i = this.controller.formatList(this.controller._defaultFormatList(i, n), n), i;
      }
      return this._data;
    }
  }
}, cl = {
  key: 1,
  class: "collapse-title"
}, ul = {
  key: 2,
  class: "collapse-title"
}, hl = /* @__PURE__ */ F("span", null, "-", -1), ml = ["value", "checked"], pl = { key: 1 };
function fl(e, t, s, l, n, i) {
  const o = c("searcher"), a = c("pc-x-icon"), r = c("settings"), h = c("pc-x-table-tools"), m = c("el-image"), k = c("el-tag"), _ = c("el-table-column"), w = c("el-button"), x = c("el-table"), N = c("x-pagination"), S = c("el-collapse-item"), C = c("el-collapse"), T = c("x-chart"), P = c("x-dialog"), I = Z("domid"), y = Z("loading");
  return d(), v(R, null, [
    F("div", {
      class: W(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      p(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      p(C, {
        modelValue: n.activeNames,
        "onUpdate:modelValue": t[5] || (t[5] = (f) => n.activeNames = f),
        class: W((n._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: u(() => [
          p(S, {
            name: n.activeNames[0]
          }, {
            title: u(() => [
              e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), v("span", cl, j(e.title), 1)) : (d(), v("span", ul, [
                E(j(e.title) + "，当前第 ", 1),
                F("span", null, j(e._query.page), 1),
                E(" 页，展示 "),
                F("span", null, j(e._data.length), 1),
                E(" 条数据， 共 "),
                F("span", null, j(e._total || e._data.length), 1),
                E(" 条数据 ")
              ]))
            ]),
            default: u(() => [
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), g(h, b({ key: 0 }, e._attrs, {
                domids: e.domids,
                onAdd: e._onAdd,
                onSearch: e._onSearch,
                onExport: e._onExport,
                onSearchExport: e._onSearchExport,
                onImport: e._onImport,
                onMultiDelete: e._onMultiDelete
              }), G({
                "tools-end": u(() => [
                  e.hideChart ? $("", !0) : (d(), g(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: i.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  F("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...f) => e.handleMinus && e.handleMinus(...f))
                  }, [
                    p(a, { name: "FullScreen" }),
                    hl
                  ]),
                  p(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  p(r, {
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
                    V(e.$slots, "tools-prefix")
                  ]),
                  key: "0"
                } : void 0,
                e.$slots["tools-suffix"] ? {
                  name: "tools-suffix",
                  fn: u(() => [
                    V(e.$slots, "tools-suffix")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : $("", !0),
              M((d(), g(x, b({ ref: "tableRef" }, e.elTableAttrs, {
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: u(() => [
                  (d(!0), v(R, null, D(e._visibleColumns, (f, B) => (d(), g(_, b(f, {
                    key: B,
                    "min-width": f.minWidth,
                    align: f.align || e._attrs.tableAlign || "center",
                    resizable: f.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(f)
                  }), G({ _: 2 }, [
                    ["selection", "index"].includes(f.type) ? void 0 : {
                      name: "default",
                      fn: u((O) => [
                        f.type === "radio" ? (d(), v("input", {
                          key: 0,
                          type: "radio",
                          value: O.$index,
                          checked: O.$index === n.checked,
                          onChange: t[3] || (t[3] = (...q) => e.handleCheckedChange && e.handleCheckedChange(...q))
                        }, null, 40, ml)) : f.slot === "$image" ? (d(), g(m, b({
                          key: 1,
                          src: e._imageSrc(O, f),
                          "preview-src-list": e._imagePreviewSrcList(O, f),
                          "preview-teleported": ""
                        }, f.imageAttrs), null, 16, ["src", "preview-src-list"])) : f.slot === "$tag" ? (d(), g(k, {
                          key: 2,
                          type: e.calcTagType(O, f)
                        }, {
                          default: u(() => [
                            E(j(e.calcTagValue(O, f)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : f.slot ? V(e.$slots, f.slot, {
                          key: 3,
                          scope: O,
                          column: f,
                          value: O.row[f.prop]
                        }) : e.slotAll ? V(e.$slots, "all", {
                          key: 4,
                          scope: O,
                          column: f,
                          value: O.row[f.prop]
                        }) : (d(), v(R, { key: 5 }, [
                          f.comp === "ElSwitch" || e.table.isRowEdit && O.row.isEditing && (f.visible !== !1 || f.canEdit) ? (d(), g(ee(f.comp || "ElInput"), b({ key: 0 }, { ...f, ...f.formAttrs }, {
                            modelValue: O.row[f.prop],
                            "onUpdate:modelValue": (q) => O.row[f.prop] = q,
                            disabled: !O.row.editable || !O.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), v("span", pl, j(e.calcValue(O.row, f)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? $("", !0) : (d(), g(_, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed || "right"
                  }, {
                    default: u((f) => [
                      V(e.$slots, "operates-prefix", { scope: f }),
                      e.canEdit(f.row) ? M((d(), g(w, b({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        onClick: (B) => e._emit("edit", f)
                      }), {
                        default: u(() => [
                          p(a, { name: "edit" }),
                          E(" 编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [I, e.domids.edit]
                      ]) : $("", !0),
                      e.canSave(f.row) ? M((d(), g(w, b({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: f.row._loading,
                        onClick: (B) => e._emit("row-edit", f)
                      }), {
                        default: u(() => [
                          p(a, { name: "collection" }),
                          E(" 保存 ")
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [y, f.row._loading],
                        [I, e.domids["row-edit"]]
                      ]) : $("", !0),
                      e.canCancelEdit(f.row) ? M((d(), g(w, b({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        onClick: (B) => e._emit("cancel-edit", f)
                      }), {
                        default: u(() => [
                          p(a, { name: "refresh-left" }),
                          E(" 取消编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [I, e.domids["cancel-edit"]]
                      ]) : $("", !0),
                      e.canDelete(f.row) ? M((d(), g(w, b({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        onClick: (B) => e._emit("delete", f)
                      }), {
                        default: u(() => [
                          p(a, { name: "DeleteFilled" }),
                          E(" 删除 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [I, e.domids.delete]
                      ]) : $("", !0),
                      V(e.$slots, "operates-suffix", { scope: f })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [y, e._loading]
              ]),
              e._query && e._total ? (d(), g(N, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: t[4] || (t[4] = (f) => e._emit("search", n.params))
              }, null, 8, ["query", "total"])) : $("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? $("", !0) : (d(), g(P, {
      key: 0,
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[6] || (t[6] = (f) => n.dialog.visible = f),
      title: "图表",
      width: "96%",
      onFullscreenchange: i.handleChartDialogFullscreen
    }, {
      default: u(() => [
        p(T, {
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
const gl = /* @__PURE__ */ A(dl, [["render", fl]]);
const bl = {
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
}, _l = { class: "mobile-x-table-tools" }, yl = { key: 0 }, vl = { class: "tools" }, wl = { class: "tools-end" };
function Sl(e, t, s, l, n, i) {
  const o = c("van-floating-bubble"), a = c("mobile-x-icon"), r = c("van-button"), h = Z("domid");
  return d(), v("div", _l, [
    e.$attrs.onAdd ? M((d(), v("div", yl, [
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
    ]) : $("", !0),
    F("div", vl, [
      V(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? M((d(), g(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (m) => e.$emit("search"))
      }), {
        default: u(() => [
          p(a, { name: "search" }),
          E(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : $("", !0),
      e.$attrs.onMultiEdit ? M((d(), g(r, b({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
      }), {
        default: u(() => [
          p(a, { name: "edit" }),
          E(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : $("", !0),
      e.$attrs.onMultiDelete ? M((d(), g(r, b({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
      }), {
        default: u(() => [
          p(a, { name: "DeleteFilled" }),
          E(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : $("", !0),
      e.$attrs.onExport ? M((d(), g(r, b({ key: 3 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (m) => e.$emit("export"))
      }), {
        default: u(() => [
          p(a, { name: "printer" }),
          E(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : $("", !0),
      e.$attrs.onSearchExport ? M((d(), g(r, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
      }), {
        default: u(() => [
          p(a, { name: "printer" }),
          E(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : $("", !0),
      e.$attrs.onImport ? M((d(), g(r, b({ key: 5 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (m) => e.$emit("import"))
      }), {
        default: u(() => [
          p(a, { name: "UploadFilled" }),
          E(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : $("", !0),
      V(e.$slots, "tools-suffix", {}, void 0, !0),
      F("div", wl, [
        V(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const kl = /* @__PURE__ */ A(bl, [["render", Sl], ["__scopeId", "data-v-6ef6b95e"]]);
const $l = {
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
}, Cl = { class: "tools" }, xl = { class: "tools-end flex-center" };
function Vl(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-card"), h = Z("domid");
  return d(), g(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: u(() => [
      F("div", Cl, [
        V(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? M((d(), g(a, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (m) => e.$emit("search"))
        }), {
          default: u(() => [
            p(o, { name: "search" }),
            E(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : $("", !0),
        e.$attrs.onAdd ? M((d(), g(a, b({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (m) => e.$emit("add"))
        }), {
          default: u(() => [
            p(o, { name: "circle-plus-filled" }),
            E(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : $("", !0),
        e.$attrs.onMultiEdit ? M((d(), g(a, b({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
        }), {
          default: u(() => [
            p(o, { name: "edit" }),
            E(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : $("", !0),
        e.$attrs.onMultiDelete ? M((d(), g(a, b({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
        }), {
          default: u(() => [
            p(o, { name: "DeleteFilled" }),
            E(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : $("", !0),
        e.$attrs.onExport ? M((d(), g(a, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (m) => e.$emit("export"))
        }), {
          default: u(() => [
            p(o, { name: "printer" }),
            E(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : $("", !0),
        e.$attrs.onSearchExport ? M((d(), g(a, b({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
        }), {
          default: u(() => [
            p(o, { name: "printer" }),
            E(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : $("", !0),
        e.$attrs.onImport ? M((d(), g(a, b({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (m) => e.$emit("import"))
        }), {
          default: u(() => [
            p(o, { name: "UploadFilled" }),
            E(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : $("", !0),
        V(e.$slots, "tools-suffix", {}, void 0, !0),
        F("div", xl, [
          V(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const El = /* @__PURE__ */ A($l, [["render", Vl], ["__scopeId", "data-v-02d70f98"]]);
function Al(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Be(e);
}
const Ol = (e) => {
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
}, Tl = (e, t) => {
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
}, jl = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, Fl = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return p("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, re = ([e, t, s, l, n, i]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return p(c("el-button"), b({
    type: l
  }, t._attrs[s + "-btn"], {
    onClick: r
  }), {
    default: () => [p(c("x-icon"), {
      name: n
    }, null), i]
  });
}, Rl = (e, t) => {
  if (t.canEdit(e.rowData))
    return re([e, t, "edit", "warning", "edit", "编辑"]);
}, Ml = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return re([e, t, "row-edit", "success", "collection", "保存"]);
}, Bl = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return re([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Dl = (e, t) => {
  if (t.canDelete(e.rowData))
    return re([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Nl = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => Tl(i, t);
  if (e.type === "index")
    return (i) => jl(i, t);
  if (e.type === "radio")
    return (i) => Fl(i, t);
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
      const m = (_) => {
        o[a.prop] = _;
      }, k = a.comp || "ElInput";
      return H(c(k), {
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
    }, Al(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Il = (e, t) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Ol(t)), r.cellRenderer = Nl(r, t), r;
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
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, Rl(i, t), Ml(i, t), Bl(i, t), Dl(i, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), n;
}, Ul = {
  convertColumnsForTableV2: Il
};
const Pl = {
  name: "XTableV2",
  props: {
    ...U.props(),
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
    ...U.emits()
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
    ...U.computed
  },
  watch: {
    ...U.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...U.methods,
    convertColumnsForTableV2: Ul.convertColumnsForTableV2
  }
}, Ll = { key: 1 };
function ql(e, t, s, l, n, i) {
  const o = c("Searcher"), a = c("x-icon"), r = c("Settings"), h = c("x-table-tools"), m = c("el-table-v2"), k = c("el-auto-resizer"), _ = c("x-pagination"), w = c("el-collapse-item"), x = c("el-collapse"), N = Z("loading");
  return d(), v("div", {
    class: W(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (S) => e._emit("search", S))
    }, null, 8, ["uid", "columns", "config"]),
    p(x, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (S) => n.activeNames = S),
      class: W((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: u(() => [
        p(w, {
          name: n.activeNames[0]
        }, {
          title: u(() => [
            e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", Ll, j(e.title), 1))
          ]),
          default: u(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), g(h, b({ key: 0 }, e._attrs, {
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
                  "onUpdate:modelValue": t[1] || (t[1] = (S) => n.settings = S),
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
                  V(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: u(() => [
                  V(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : $("", !0),
            p(k, {
              style: it({ height: s.height })
            }, {
              default: u(({ width: S, height: C }) => [
                M((d(), g(m, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: S,
                  height: C
                }), G({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: u(() => [
                      V(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: u(() => [
                      V(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: u(() => [
                      V(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [N, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), g(_, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (S) => e._emit("search"))
            }, null, 8, ["query", "total"])) : $("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Xl = /* @__PURE__ */ A(Pl, [["render", ql]]);
const ue = ["selection", "radio"], zl = {
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
      ue.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !ue.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (ue.includes(t)) {
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
}, Wl = { class: "x-table-viewer" };
function Hl(e, t, s, l, n, i) {
  const o = c("x-dialog");
  return d(), v("div", Wl, [
    p(o, b(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: u(() => [
        (d(), g(ee(s.useTableV2 ? "x-table-v2" : "x-table"), b({
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
const Jl = /* @__PURE__ */ A(zl, [["render", Hl], ["__scopeId", "data-v-f5d31400"]]), Kl = {
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
}, Yl = { class: "x-tinymce" }, Gl = ["id", "innerHTML"];
function Ql(e, t, s, l, n, i) {
  return d(), v("div", Yl, [
    F("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, Gl)
  ]);
}
const Zl = /* @__PURE__ */ A(Kl, [["render", Ql]]);
const eo = {
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
}, Se = (e) => (De("data-v-fe069681"), e = e(), Ne(), e), to = { class: "mask" }, so = {
  key: 0,
  class: "el-upload__text"
}, no = /* @__PURE__ */ Se(() => /* @__PURE__ */ F("em", null, "点击上传", -1)), io = /* @__PURE__ */ Se(() => /* @__PURE__ */ F("br", null, null, -1)), lo = /* @__PURE__ */ Se(() => /* @__PURE__ */ F("br", null, null, -1)), oo = {
  key: 0,
  class: "path"
};
function ao(e, t, s, l, n, i) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-upload");
  return d(), g(r, b({
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
      F("div", to, [
        p(o, { name: "upload-filled" }),
        n.disabled ? $("", !0) : (d(), v("div", so, [
          E(" 将文件拖到此处，或"),
          no,
          io,
          lo,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), g(a, {
            key: 0,
            type: "success",
            onClick: K(i.handleUploadAll, ["stop"])
          }, {
            default: u(() => [
              E(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : $("", !0)
        ]))
      ]),
      i.filepath ? (d(), v("div", oo, j(s.modelValue), 1)) : $("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const ro = /* @__PURE__ */ A(eo, [["render", ao], ["__scopeId", "data-v-fe069681"]]);
const co = {
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
}, uo = ["src"];
function ho(e, t, s, l, n, i) {
  const o = c("Plus"), a = c("el-icon"), r = c("el-upload"), h = c("el-dialog");
  return d(), v(R, null, [
    p(r, b({
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
        F("img", {
          src: n.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, uo)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const mo = /* @__PURE__ */ A(co, [["render", ho], ["__scopeId", "data-v-821cec65"]]), he = {
  xactionsheet: Vt,
  xautorows: jt,
  mobilexbutton: Mt,
  pcxbutton: Nt,
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
  mobilexformitem: Ts,
  pcxformitem: js,
  mobilexicon: Bs,
  pcxicon: Us,
  xinfo: zn,
  xlooper: Kn,
  mobilexpagination: Qn,
  pcxpagination: ti,
  xpicker: ii,
  mobilexradios: ai,
  pcxradios: ci,
  mobilexrow: pi,
  pcxrow: _i,
  mobilexscan: wi,
  pcxscan: $i,
  mobilexselect: Ai,
  pcxselect: Mi,
  mobilextable: Qi,
  pcxtable: gl,
  mobilextabletools: kl,
  pcxtabletools: El,
  xtablev2: Xl,
  xtableviewer: Jl,
  xtinymce: Zl,
  xfileuploader: ro,
  ximageuploader: mo
}, se = {};
for (let e in he)
  se[he[e].name] = he[e];
const po = (e) => ({
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
}), fe = (() => {
  const e = Object.keys(se), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = se[l]);
  for (const l of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(l.toLowerCase())) ? s[l] = po(l) : s[l] = se[l];
  return s;
})(), fo = (e, t) => {
  for (let s in fe)
    e.component(s, fe[s]);
}, bo = {
  version: "1.0.168",
  ...fe,
  ...Je,
  ...$t,
  install: fo
};
export {
  Ke as BaseController,
  le as Confirm,
  Ye as CrudController,
  Y as Message,
  ie as Notify,
  kt as TempCrudController,
  ae as baseDialog,
  Ue as baseForm,
  vt as baseModel,
  Pe as baseTable,
  $t as controllers,
  bo as default,
  at as effects,
  z as formatOptions,
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
  Ie as validateForm
};
