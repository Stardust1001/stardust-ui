import { toRaw as nt, nextTick as te, watch as fe, resolveComponent as c, openBlock as d, createBlock as f, mergeProps as b, createElementBlock as v, Fragment as B, renderList as N, withCtx as u, renderSlot as E, toDisplayString as j, useCssVars as Me, resolveDirective as Z, withDirectives as M, createElementVNode as F, createTextVNode as A, createVNode as p, createCommentVNode as C, vShow as ke, createSlots as G, resolveDynamicComponent as ee, normalizeClass as z, normalizeProps as oe, guardReactiveProps as Be, h as W, isVNode as Re, withModifiers as K, pushScopeId as Ne, popScopeId as Ie, normalizeStyle as it } from "vue";
const lt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const i = e.getContext("2d");
  class n {
    constructor($, R, D, H, et, tt, st) {
      this.x = $, this.y = R, this.radius = D, this.color = H, this.vx = et, this.vy = tt, this.ctx = st;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const l = () => i.clearRect(0, 0, t, s), o = (g) => Math.floor(Math.random() * g);
  let a = 0, r = 0.01, h = 0;
  const m = () => {
    const g = i.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = w * 30), a >= 1 && (a = 1, r = -r, h = w * 30)), g.addColorStop(0, "rgba(250, 220, 20, 0.5)"), g.addColorStop(a, "rgba(20, 20, 20, 0.5)"), i.fillStyle = g, i.fillRect(0, 0, t, s);
  }, k = Math.floor(t / 100), _ = Math.floor(s / 100), w = 20, V = Math.round(1e3 / w), I = Array.from({ length: 52 }).map(() => {
    const g = Math.floor(o(k + _) * 1.5 + o(5));
    let $ = o(t), R = o(s);
    $ = Math.min(Math.max(g, $), t - g), R = Math.min(Math.max(g, R), s - g);
    let D = o(2) ? (o(2) + 2) * k : (o(-1) - 2) * k, H = o(2) ? (o(2) + 2) * _ : (o(-1) - 2) * _;
    return D = Math.floor(D / w), H = Math.floor(H / w), new n(
      $,
      R,
      g,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      D,
      H,
      i
    );
  });
  let S, x;
  e.addEventListener("mouseover", (g) => {
    S = g.pageX, x = g.pageY;
  }), e.addEventListener("mousemove", (g) => {
    if (S === void 0) {
      S = g.pageX, x = g.pageY;
      return;
    }
    const $ = g.pageX - S, R = g.pageY - x;
    I.forEach((D) => {
      D.x += $ / w, D.y += R / w;
    }), S = g.pageX, x = g.pageY;
  });
  let T = Date.now(), U = null;
  const y = () => {
    Date.now() - T >= V && (l(), m(), I.forEach((g) => g.update()), T = Date.now()), U = requestAnimationFrame(y);
  };
  return U = requestAnimationFrame(y), () => cancelAnimationFrame(U);
}, ot = ({
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
  const m = r.measureText(e).width + t, k = s + t;
  for (let _ = t / 2; _ < l; _ += k)
    for (let w = t / 2; w < n; w += m)
      r[o + "Text"](e, w, _);
  return a;
}, at = {
  pop: lt,
  createWatermark: ot
}, De = async (e) => {
  var i, n;
  const t = await ((i = e.formRef) == null ? void 0 : i.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((l) => {
    var o, a;
    return ((o = l.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = l.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((l) => De(l.form)));
  return t && s.every((l) => l);
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
  let i = s;
  if (typeof s[0] != "object" && (i = s.map((l) => ({ text: l, value: l }))), !t.sort)
    return i;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((l, o) => l[n].localeCompare(o[n]));
}, { ElMessage: dt, ElNotification: ct, ElMessageBox: ut } = window.ElementPlus || {}, { showToast: ht, showNotify: mt, showConfirmDialog: pt } = window.vant || {}, Y = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? ((i === "error" || i === "warning") && (t.type = "fail"), ht(t)) : dt({
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
  s ? (i === "error" && (t.type = "danger"), mt(t)) : ct({
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
  ), t.then(() => e.distinguishCancelAndClose ? "confirm" : !0).catch((i) => e.distinguishCancelAndClose ? i : !1);
};
for (let e of ["success", "warning", "info", "error", "primary", "loading", "fail", "html"])
  Y[e] = Y[e[0]] = (t) => Y({ type: e, ...typeof t != "string" ? t : { message: t } }), ie[e] = ie[e[0]] = (t) => ie({ type: e, ...typeof t != "string" ? t : { message: t } }), le[e] = le[e[0]] = (t) => le({ type: e, ...t });
const ft = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    i.matched.length ? l() : l("/404");
  });
}, gt = (e, t, s) => {
  e.afterEach((i, n) => {
    const l = i.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...l].filter((o) => o).reverse().join("-");
  });
}, bt = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    var o;
    return i.meta.acl === !1 || (o = i.meta) != null && o.visitable || t.acl.paths.includes(i.path) ? l() : (Y.e("无权访问页面: " + i.path), l(t.acl.paths[0] || "/404"));
  }), te(() => {
    let i = !1;
    fe(() => t.acl.menus, (n) => {
      if (!i) {
        if (!n.length)
          return;
        i = !0;
      }
      const l = t.acl.paths, o = (a, r) => {
        var m, k, _, w, V, I, S;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (m = a.children) == null || m.forEach((x) => {
          var T;
          x.meta || (x.meta = {}), (T = x.meta).acl || (T.acl = !1), o(x, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((_ = a.meta).hidden ?? (_.hidden = (k = r.meta) == null ? void 0 : k.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((V = a.meta).visitable ?? (V.visitable = (w = r.meta) == null ? void 0 : w.visitable), a.meta = { ...a.meta })), (I = a.children) == null || I.forEach((x) => o(x, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !l.includes(h), (S = a.children) != null && S.some((x) => x.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, _t = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    i.name === "Login" && t.getters.logined && i.query.redirectTo ? l(i.query.redirectTo) : l();
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
    const i = e[s];
    !i || typeof i != "object" || (s === "table" && e[s]._isBaseTable && Le(i, t), s === "dialog" && e[s]._isBaseDialog && qe(i, t), s === "form" && e[s]._isBaseForm && be(i, t));
  }
  return e;
}, Le = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), qe = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), be(e, t), e), be = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((i) => i.visible !== !1)), ze(e.form, e.formItems), e.initialForm = he.deepCopy(e.form), e.initialFormRules = he.deepCopy(e.formRules), fe(() => e.formItems, () => {
  Xe(e);
}, { immediate: !0, deep: !0 }), e), Xe = (e) => {
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
    const o = t.find((w) => w.prop === l), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = He[a], h = [], m = "options" in o, _ = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${m ? "选择" : "输入"}${(o == null ? void 0 : o.label) || l}` };
    o.validator && (_.validator = o.validator), o.asyncValidator && (_.asyncValidator = o.asyncValidator), o.comp ? h.push({ ..._, trigger: r.change }) : h.push({ ..._, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ..._, trigger: r.blur }), n[l] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, ze = (e, t, s = !0) => {
  const i = {};
  return t.forEach((n) => {
    var h, m;
    let l = "";
    const { type: o, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && o === "number" || n.comp === "ElInputNumber")
      l = 0;
    else if (n.comp === "ElSwitch")
      l = !1;
    else if (a && ((h = n.comp) != null && h.endsWith("XCheckboxs") || (m = n.comp) != null && m.endsWith("x-checkboxs") || r))
      l = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const k = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + k), n["end-placeholder"] || (n["end-placeholder"] = "结束" + k), l = [];
    }
    i[n.prop] = l;
  }), Object.assign(e, { ...i, ...e }), e;
}, We = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [i, n] = e.split(s);
  n = n.split("|");
  let l = t[i];
  typeof l == "number" ? l += "" : typeof l == "string" && (l = l.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? l.startsWith(a) : o === "*=" ? l.includes(a) : o === "$=" ? l.endsWith(a) : o === "~=" ? !l.includes(a) : o === "!=" ? l !== a : a === l);
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
      const i = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => i }
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
const { funcs: $e, highdict: Ce, dates: re } = StardustJs, { file: xe, excel: ne } = StardustBrowser;
class Ye extends Ke {
  constructor(t) {
    super(t);
    const { model: s, table: i, dialog: n, dbModelName: l = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = i || (s == null ? void 0 : s.table) || null, this.dialog = n || (s == null ? void 0 : s.dialog) || null, this.dbModelName = l, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], te(() => {
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
    let i = Ce.get(s, this.listProp);
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
    }), await te(), await $e.sleep(50), this._clearValidate(), this.afterAdd());
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
    }), await te(), (i = this.dialog.formRef) == null || i.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
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
    o = $e.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(l._visibleColumns, "current"), r = a.map((_) => _.prop), h = a.map((_) => _.label);
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
    const i = await this.dbTable.search(this.getSearchExportParams());
    let n = i.data;
    n = this.formatList(n, i), n = this.processExportingData(n, "search");
    const l = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = l.map((m) => m.prop), a = l.map((m) => m.label);
    n = n.map((m) => o.map((k) => m[k]));
    let r = null;
    t === "csv" ? r = ne.export2Csv : r = ne.export2Excel;
    let h = { header: a, data: n, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    const t = await xe.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), i = await xe.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      n = window.Papa.parse(i, { header: !0 }).data;
    else {
      const l = window.XLSX.read(i, {}), o = Object.values(l.Sheets);
      n = XLSX.utils.sheet_to_json(o[0]);
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
    const { columns: i, query: n } = this.table, { page: l, limit: o } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (l - 1) * o + r + 1;
    }), i.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: m, formatter: k, autoFill: _ } = a.tableAttrs || {}, { modelName: w } = a.formAttrs || {};
      if (w && _)
        t.forEach((V) => V[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && m !== !1) {
        const I = fe(() => a.options, (S, x) => {
          const T = x ? this.table.list : t, U = St(a);
          T.forEach((y, g) => {
            const $ = y[r];
            y[`_formatted_${r}`] = U[$] || (k == null ? void 0 : k($, y, g)) || $;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(I);
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
    const r = Ce.mapField(a.data, o, l);
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
const St = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: n = "value" } = s, l = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    l[o[n]] = o[i];
  }), l;
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
    this.table.list = t.filter((i) => !s.includes(i));
  }
}
const $t = {
  BaseController: Ke,
  CrudController: Ye,
  TempCrudController: kt
}, O = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, n] of t)
    s[i] = n;
  return s;
}, Ct = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function xt(e, t, s, i, n, l) {
  const o = c("van-action-sheet");
  return d(), f(o, b(e.$attrs, {
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
      return this.cols.forEach((i) => {
        const n = i.span || this.span;
        t.push(i), s += n, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, At = { class: "x-auto-rows" }, Ot = { key: 1 };
function Tt(e, t, s, i, n, l) {
  const o = c("x-col"), a = c("x-row");
  return d(), v("div", At, [
    (d(!0), v(B, null, N(l.rows, (r, h) => (d(), f(a, b({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: u(() => [
        (d(!0), v(B, null, N(r, (m, k) => (d(), f(o, b(m, {
          span: m.span || s.span,
          key: k,
          platform: e.$attrs.platform
        }), {
          default: u(() => [
            m.slot || e.$attrs.slot ? E(e.$slots, m.slot || e.$attrs.slot, {
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
const jt = /* @__PURE__ */ O(Et, [["render", Tt]]), Ft = {
  name: "MobileXButton"
};
function Mt(e, t, s, i, n, l) {
  const o = c("van-button");
  return d(), f(o, null, {
    default: u(() => [
      E(e.$slots, "default")
    ]),
    _: 3
  });
}
const Bt = /* @__PURE__ */ O(Ft, [["render", Mt]]), Rt = {
  name: "PcXButton"
};
function Nt(e, t, s, i, n, l) {
  const o = c("el-button");
  return d(), f(o, null, {
    default: u(() => [
      E(e.$slots, "default")
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
      var s, i;
      this.dialog.visible = !1, this.loading = !0;
      const e = { ...this.dialog.form };
      (s = e.filter) != null && s.categories.isLimit || (e.filter.categories.mergeOthers = !1), (i = e.filter) != null && i.series.isLimit || (e.filter.series.mergeOthers = !1);
      let t = this.datasource.list;
      this.datasource.getList && (t = await this.datasource.getList()), e.data = t, this.setRich(e), this.loading = !1;
    },
    calcSummary(e, t, s) {
      let i;
      return (t === "sum" || t === "average") && (i = e.reduce((n, l) => n + l, 0)), t === "count" ? i = e.length : t === "average" ? e.length ? i = (i / (s || e.length)).toFixed(2) * 1 : i = void 0 : t === "first" ? i = e[0] : t === "last" ? i = e[e.length - 1] : (t === "max" || t === "min") && (i = Math[t].apply(null, e)), i;
    },
    setRich(e) {
      var y;
      const { categories: t, data: s, attr: i, summary: n, type: l, filter: o } = e, a = {}, r = Array.isArray(t) && t.length || ((y = t == null ? void 0 : t.data) == null ? void 0 : y.length), h = r && (Array.isArray(t) ? t : t.data), m = typeof e.series == "string" ? e.series : e.series.data, k = (o == null ? void 0 : o.categories.limit) > -1, _ = (o == null ? void 0 : o.series.limit) > -1, w = {}, V = [], I = /* @__PURE__ */ new Set(), S = [];
      s.forEach((g) => {
        var R;
        let $ = g[m] || "未知";
        if (r) {
          let D = h.map((H) => g[H]).join("/") || "未知";
          if (k && V.length >= o.categories.limit && !V.includes(D)) {
            if (!o.categories.mergeOthers)
              return;
            I.add(D), D = "其他";
          }
          w[D] || V.push(D), w[D] || (w[D] = {}), (R = w[D])[$] || (R[$] = []), w[D][$].push(g[i]);
        } else {
          if (_ && S.length >= o.series.limit && !S.includes($)) {
            if (!o.series.mergeOthers)
              return;
            $ = "其他";
          }
          w[$] || S.push($), w[$] || (w[$] = []), w[$].push(g[i]);
        }
      });
      const x = r ? [...new Set(s.map((g) => g[m]))] : S;
      if (r)
        for (let g in w)
          for (let $ in w[g])
            w[g][$] = this.calcSummary(
              w[g][$],
              n,
              k && g === "其他" ? w[g][$].length / I.size : w[g][$].length
            );
      else
        for (let g in w)
          w[g] = this.calcSummary(w[g], n);
      let T = x;
      typeof e.series == "object" && e.series.formatter && (T = x.map((g) => e.series.formatter(g)));
      let U = [];
      r ? U = x.map((g, $) => ({
        name: T[$],
        type: l,
        label: { show: !0, position: "top" },
        data: V.map((R) => ({ name: R, value: w[R][g] }))
      })) : U = x.map((g, $) => ({
        name: T[$],
        type: l,
        label: { show: !0, position: "top" },
        data: x.map((R) => ({ name: R, value: R === g ? w[g] : void 0 }))
      })), Object.assign(a, {
        legend: { data: T },
        xAxis: {
          type: "category",
          data: r ? t.formatter ? V.map((g) => t.formatter(g)) : V : m.formatter ? S.map((g) => m.formatter(g)) : S
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
  Me((e) => ({
    afd4065c: e.zoomedHeight,
    "2fa1922c": e.zoom
  }));
}, Ee = _e.setup;
_e.setup = Ee ? (e, t) => (Ve(), Ee(e, t)) : Ve;
const Pt = { class: "x-chart" }, Lt = {
  class: "chart",
  ref: "el"
};
function qt(e, t, s, i, n, l) {
  const o = c("pc-x-icon"), a = c("el-checkbox"), r = c("el-input-number"), h = c("el-tab-pane"), m = c("el-tabs"), k = c("x-form"), _ = c("x-dialog"), w = Z("loading");
  return M((d(), v("div", Pt, [
    F("div", Lt, null, 512),
    s.datasource ? (d(), v("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (V) => n.dialog.visible = !0)
    }, [
      A(" 配置 "),
      p(o, { name: "Setting" })
    ])) : C("", !0),
    p(_, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[8] || (t[8] = (V) => n.dialog.visible = V),
      title: "图表配置",
      drawer: "",
      width: "360",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: l.handleMakeChart,
      onCancel: t[9] || (t[9] = (V) => n.dialog.visible = !1)
    }, {
      default: u(() => [
        p(k, { dialog: n.dialog }, {
          filter: u(() => [
            p(m, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[7] || (t[7] = (V) => n.filterType = V)
            }, {
              default: u(() => [
                p(h, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: u(() => [
                    p(a, {
                      modelValue: l.categories.isLimit,
                      "onUpdate:modelValue": t[1] || (t[1] = (V) => l.categories.isLimit = V)
                    }, {
                      default: u(() => [
                        A("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    M(F("div", null, [
                      A(" 记录条数 "),
                      p(r, {
                        modelValue: l.categories.limit,
                        "onUpdate:modelValue": t[2] || (t[2] = (V) => l.categories.limit = V),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(a, {
                        modelValue: l.categories.mergeOthers,
                        "onUpdate:modelValue": t[3] || (t[3] = (V) => l.categories.mergeOthers = V)
                      }, {
                        default: u(() => [
                          A("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [ke, l.categories.isLimit]
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
                      modelValue: l.series.isLimit,
                      "onUpdate:modelValue": t[4] || (t[4] = (V) => l.series.isLimit = V)
                    }, {
                      default: u(() => [
                        A("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    M(F("div", null, [
                      A(" 记录条数 "),
                      p(r, {
                        modelValue: l.series.limit,
                        "onUpdate:modelValue": t[5] || (t[5] = (V) => l.series.limit = V),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(a, {
                        modelValue: l.series.mergeOthers,
                        "onUpdate:modelValue": t[6] || (t[6] = (V) => l.series.mergeOthers = V)
                      }, {
                        default: u(() => [
                          A("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [ke, l.series.isLimit]
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
        rules: i,
        required: n,
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: X
  }
};
function Wt(e, t, s, i, n, l) {
  const o = c("van-checkbox"), a = c("van-checkbox-group");
  return d(), f(a, b({ class: "mobile-x-checkboxs" }, l.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: u(() => [
      (d(!0), v(B, null, N(l.formatOptions(s.options, this), (r) => (d(), f(o, b(l.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: u(() => [
          A(j(r[s.text]), 1)
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
        ...i
      } = this.$attrs;
      return i;
    }
  },
  methods: {
    formatOptions: X
  }
};
function Kt(e, t, s, i, n, l) {
  const o = c("el-checkbox"), a = c("el-checkbox-group");
  return d(), f(a, b({ class: "pc-x-checkboxs" }, l.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: u(() => [
      (d(!0), v(B, null, N(l.formatOptions(s.options, this), (r) => (d(), f(o, b(l.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: u(() => [
          A(j(r[s.text]), 1)
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
function Qt(e, t, s, i, n, l) {
  const o = c("van-col");
  return d(), f(o, b(l.attrs, { class: "mobile-x-col" }), {
    default: u(() => [
      E(e.$slots, "default")
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
function ts(e, t, s, i, n, l) {
  const o = c("el-col");
  return d(), f(o, b(l.attrs, { class: "pc-x-col" }), {
    default: u(() => [
      E(e.$slots, "default")
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
function is(e, t, s, i, n, l) {
  const o = c("van-dialog");
  return d(), f(o, b({ width: "92%" }, e.$attrs, {
    show: l.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => l.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: l.handleConfirm,
    onCancel: l.handleCancel
  }), G({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: u(() => [
        E(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: u(() => [
        E(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: u(() => [
        E(e.$slots, "default")
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
function rs(e, t, s, i, n, l) {
  const o = c("x-icon"), a = c("el-button");
  return d(), f(ee(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: l.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => l.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: u(() => [
      e.$slots.header ? E(e.$slots, "header", { key: 0 }) : (d(), v("span", as, j(e.$attrs.title), 1)),
      s.drawer ? C("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: l.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: u(() => [
      e.$slots.footer ? E(e.$slots, "footer", { key: 0 }) : C("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: u(() => [
          A(j(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : C("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: u(() => [
          A(j(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : C("", !0)
    ]),
    default: u(() => [
      e.$slots.default ? E(e.$slots, "default", { key: 0 }) : C("", !0)
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
        const i = Object.entries(q.province_list).find((n) => n[1] === e);
        this.province = i == null ? void 0 : i[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const i = Object.entries(q.city_list).find((n) => n[1] === t);
        this.city = i == null ? void 0 : i[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const i = Object.entries(q.county_list).find((n) => n[1] === s);
        this.county = i == null ? void 0 : i[0];
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
function us(e, t, s, i, n, l) {
  const o = c("x-select"), a = c("x-col"), r = c("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: u(() => [
      p(a, { span: l.span }, {
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
      l.number > 1 ? (d(), f(a, {
        key: 0,
        span: l.span
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
      l.number > 2 ? (d(), f(a, {
        key: 1,
        span: l.span
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
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
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
function Ss(e, t, s, i, n, l) {
  const o = c("mobile-x-form-item"), a = c("van-cell-group"), r = c("van-form");
  return d(), f(r, {
    ref: "formRef",
    class: z(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: u(() => [
      e.$slots.pre ? E(e.$slots, "pre", { key: 0 }) : C("", !0),
      p(a, oe(Be(e.$attrs)), {
        default: u(() => [
          (d(!0), v(B, null, N(e._visibleItems, (h, m) => (d(), f(o, b(h, {
            rules: e._rules[h.prop] || h.rules,
            key: m,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (k) => e._model[h.prop] = k,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: u(() => [
              h.slot ? E(e.$slots, h.slot, oe(b({ key: 0 }, h))) : C("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? E(e.$slots, "default", { key: 1 }) : C("", !0)
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
function xs(e, t, s, i, n, l) {
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
          e.$slots["collapse-title"] ? E(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", Cs, j(s.title), 1))
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
              e.$slots.pre ? E(e.$slots, "pre", { key: 0 }) : C("", !0),
              (d(!0), v(B, null, N(e._visibleItems, (m, k) => (d(), f(o, b({
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
                  m.slot ? E(e.$slots, m.slot, { key: 0 }) : C("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
              e.$slots.default ? E(e.$slots, "default", { key: 1 }) : C("", !0)
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
    "onUpdate:modelValue": (k) => n("update:modelValue", k)
  }, m = [];
  return o === "html" ? h.class = "comp-html" : l = c(l), a && (h.innerHTML = a), r && m.push(r), W(l, h, {
    default: () => m
  });
}, As = (e) => {
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
  const m = {
    modelValue: o,
    "onUpdate:modelValue": (k) => n("update:modelValue", k)
  };
  return a && s.label || r ? W(c("van-field"), m, {
    input: () => a && s.label ? l.default() : me(e)
  }) : (Object.assign(m, i), W(c("van-field"), m));
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
        comp: i,
        slot: n,
        compType: l,
        span: o,
        offset: a,
        showTooltip: r,
        required: h,
        format: m,
        style: k,
        html: _,
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
    return As(this);
  }
}, Ae = () => {
  Me((e) => ({
    ba9709f0: e.width
  }));
}, Oe = ye.setup;
ye.setup = Oe ? (e, t) => (Ae(), Oe(e, t)) : Ae;
const js = /* @__PURE__ */ O(ye, [["__scopeId", "data-v-d2cde1e2"]]), Te = /* @__PURE__ */ Object.assign({}), Fs = {
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
        const s = t.split("/").pop().split(".")[0], i = await Te[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Ms = ["src"];
function Bs(e, t, s, i, n, l) {
  const o = c("van-icon");
  return n.icons[s.name] ? (d(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Ms)) : (d(), f(o, b({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Rs = /* @__PURE__ */ O(Fs, [["render", Bs]]), je = /* @__PURE__ */ Object.assign({}), Ns = {
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
        const s = t.split("/").pop().split(".")[0], i = await je[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Is = ["src"];
function Ds(e, t, s, i, n, l) {
  const o = c("el-icon");
  return n.icons[s.name] ? (d(), v("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Is)) : (d(), f(o, oe(b({ key: 1 }, e.$attrs)), {
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
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function an() {
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
    const i = "handle" + s.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[s] = this.controller[i];
  }), t;
}
function rn() {
  const e = this._columns.filter((s) => s.type && ve.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const i = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...i,
      width: s.width || i.width
    };
  });
  return e.concat(t);
}
function dn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function cn() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function un() {
  return this._columns.filter((e) => !e.type || !ve.includes(e.type));
}
function hn() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function mn() {
  const e = this._uid && Ge.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && ve.includes(t.type))).map((t) => {
    const { prop: s, label: i, show: n, hide: l, width: o } = t;
    return { prop: s, label: i, show: n, hide: l, width: o };
  })), this.settings = e;
}
function pn(e) {
  Ge.setJson(`Settings[${this._uid}]`, e);
}
function fn(e, t) {
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
      return typeof n == "function" ? n(l, e, t) : Ps.get(e, n);
  }
  return l;
}
function gn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function bn(e) {
  this.params = e, this._emit("search", e);
}
function _n(e) {
  this.saveSettings(e), this.initSettings();
}
function yn(e, t, s, i) {
  const n = this.settings.columns.find((l) => l.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function vn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function wn(e) {
  var t, s, i, n;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((n = (i = this.controller) == null ? void 0 : i.handleSortChange) == null || n.call(i, e));
}
function Sn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function kn(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function $n() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function Cn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function xn(e) {
  var i;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Vn(e) {
  var i;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function En(e, t) {
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
function An(e, t) {
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
function On(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Tn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function jn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Fn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Mn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function Bn(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function Rn(e, t) {
  var i;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((i = t.previewSrcList) == null ? void 0 : i.call(t)) || [s];
}
function Nn(e, t) {
  const s = "on" + e.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function In() {
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
    _onMultiDelete: on,
    _listen: an,
    _visibleColumns: rn,
    _uid: dn,
    hideOperates: cn,
    searcherColumns: un,
    searcherConfig: hn
  },
  watch: {
    $route: In
  },
  methods: {
    initSettings: mn,
    saveSettings: pn,
    calcValue: fn,
    calcOverflowTooltip: gn,
    handleSearch: bn,
    handleResetSettings: _n,
    handleHeaderDragend: yn,
    handleSelectionChange: vn,
    handleSortChange: wn,
    handleCheckedChange: Sn,
    handleCollapseChange: kn,
    handleMinus: $n,
    handleToggleFullscreen: Cn,
    cellClassName: xn,
    cellStyle: Vn,
    calcTagType: En,
    calcTagValue: An,
    canEdit: On,
    canSave: Tn,
    canRowEdit: jn,
    canCancelEdit: Fn,
    canDelete: Mn,
    _imageSrc: Bn,
    _imagePreviewSrcList: Rn,
    _emit: Nn
  }
};
const Dn = {
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
    calcValue: P.methods.calcValue
  }
}, Un = { key: 0 }, Pn = { key: 1 };
function Ln(e, t, s, i, n, l) {
  const o = c("el-descriptions-item"), a = c("el-descriptions"), r = c("el-collapse-item"), h = c("el-collapse");
  return d(), f(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (m) => n.activeNames = m),
    class: z(["x-info", { "hide-header": l.hideHeader }])
  }, {
    default: u(() => [
      (d(!0), v(B, null, N(l.blocks, (m, k) => (d(), f(r, {
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
              (d(!0), v(B, null, N(m, (_) => (d(), f(o, b({
                key: _.prop
              }, _), G({
                default: u(() => [
                  _.slot ? (d(), v("span", Un, [
                    E(e.$slots, _.slot, oe(Be({ data: s.data, field: _, value: l.calcValue(s.data, _) })), void 0, !0)
                  ])) : (d(), v("span", Pn, j(l.calcValue(s.data, _)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: u(() => [
                    E(e.$slots, "label", {
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
const qn = /* @__PURE__ */ O(Dn, [["render", Ln], ["__scopeId", "data-v-0c3b67a5"]]), Xn = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, zn = { key: 1 };
function Wn(e, t, s, i, n, l) {
  return d(), v("div", null, [
    (d(!0), v(B, null, N(s.items, (o, a) => (d(), f(ee(s.compName), b({ key: a }, o), {
      default: u(() => [
        o.slot || e.$attrs.slot ? E(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), v("span", zn, j(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Hn = /* @__PURE__ */ O(Xn, [["render", Wn]]), Jn = {
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
function Kn(e, t, s, i, n, l) {
  const o = c("van-col"), a = c("van-icon"), r = c("van-pagination"), h = c("van-row");
  return d(), f(h, {
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
            "page-count": l.pageCount
          }), {
            "prev-text": u(() => [
              p(a, { name: "arrow-left" }),
              A(" 上一页 ")
            ]),
            "next-text": u(() => [
              A(" 下一页 "),
              p(a, { name: "arrow" })
            ]),
            page: u(({ text: m }) => [
              A(j(m), 1)
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
const Yn = /* @__PURE__ */ O(Jn, [["render", Kn]]), Gn = {
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
function Qn(e, t, s, i, n, l) {
  const o = c("el-pagination");
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
const Zn = /* @__PURE__ */ O(Gn, [["render", Qn]]), ei = {
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
function ti(e, t, s, i, n, l) {
  const o = c("van-picker"), a = c("van-popup");
  return d(), v(B, null, [
    F("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: z(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, j(s.modelValue || s.placeholder), 3),
    p(a, b({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: l.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => l.visible = r)
    }), {
      default: u(() => [
        p(o, b(e.$attrs, {
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
const si = /* @__PURE__ */ O(ei, [["render", ti]]), ni = {
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
function ii(e, t, s, i, n, l) {
  const o = c("van-radio"), a = c("van-radio-group");
  return d(), f(a, b({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: u(() => [
      (d(!0), v(B, null, N(l.formatOptions(s.options, this), (r) => (d(), f(o, b(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: u(() => [
          A(j(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const li = /* @__PURE__ */ O(ni, [["render", ii]]), oi = {
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
        ...i
      } = this.$attrs;
      return i;
    }
  },
  methods: {
    formatOptions: X
  }
};
function ai(e, t, s, i, n, l) {
  const o = c("el-radio-group");
  return d(), f(o, b({ class: "pc-x-radios" }, l.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: u(() => [
      (d(!0), v(B, null, N(l.formatOptions(s.options, this), (a) => (d(), f(ee(s.button ? "el-radio-button" : "el-radio"), b(l.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: u(() => [
          A(j(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const ri = /* @__PURE__ */ O(oi, [["render", ai]]), di = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ci = { key: 1 };
function ui(e, t, s, i, n, l) {
  const o = c("mobile-x-col"), a = c("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: u(() => [
      (d(!0), v(B, null, N(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: u(() => [
          r.slot || e.$attrs.slot ? E(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", ci, j(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? E(e.$slots, "default", { key: 0 }) : C("", !0)
    ]),
    _: 3
  });
}
const hi = /* @__PURE__ */ O(di, [["render", ui]]), mi = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, pi = { key: 1 };
function fi(e, t, s, i, n, l) {
  const o = c("pc-x-col"), a = c("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: u(() => [
      (d(!0), v(B, null, N(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: u(() => [
          r.slot || e.$attrs.slot ? E(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", pi, j(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? E(e.$slots, "default", { key: 0 }) : C("", !0)
    ]),
    _: 3
  });
}
const gi = /* @__PURE__ */ O(mi, [["render", fi]]), bi = {
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
function _i(e, t, s, i, n, l) {
  const o = c("van-icon"), a = c("van-field");
  return d(), f(a, b({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: l.handleClick
  }), {
    "right-icon": u(() => [
      p(o, {
        name: "scan",
        onClick: l.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const yi = /* @__PURE__ */ O(bi, [["render", _i]]), vi = {
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
function wi(e, t, s, i, n, l) {
  const o = c("el-button"), a = c("el-input");
  return d(), f(a, b(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: l.handleClick
  }), {
    append: u(() => [
      p(o, {
        icon: "CameraFilled",
        onClick: l.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const Si = /* @__PURE__ */ O(vi, [["render", wi]]), Qe = async (e, t, s) => {
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: n = "text", value: l = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, l])], a.limit = a.limit || 20, i && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${i}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, ki = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((i) => e[i])[0], $i = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((i) => e[i]).slice(1).join(" - ") + ")", Ci = {
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
function xi(e, t, s, i, n, l) {
  const o = c("x-picker");
  return d(), v("div", {
    onClick: t[5] || (t[5] = (...a) => l.onClick && l.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(o, b(e.$attrs, {
      modelValue: l.formattedModelValue,
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
const Vi = /* @__PURE__ */ O(Ci, [["render", xi]]);
const Ei = {
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
      return ki(e, this);
    },
    calcRemarkLabel(e) {
      return $i(e, this);
    }
  }
}, Ai = { key: 1 }, Oi = { class: "main" }, Ti = { class: "remark" };
function ji(e, t, s, i, n, l) {
  const o = c("el-option"), a = c("el-select");
  return d(), f(a, b({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || l.remoteSearch
  }), {
    default: u(() => [
      (d(!0), v(B, null, N(n._options, (r) => (d(), f(o, b(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: u(() => [
          e.$slots.custom ? E(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (d(), v("span", Ai, [
            F("span", Oi, j(l.calcMainLabel(r)), 1),
            F("span", Ti, j(l.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const Fi = /* @__PURE__ */ O(Ei, [["render", ji], ["__scopeId", "data-v-a37eab84"]]), Fe = {
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
}, Mi = [{
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
function Bi() {
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
    modelValue: i,
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
      default: () => [A("新增条件")]
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
      default: () => [A("X")]
    }), t.traditional ? null : p("span", {
      class: "title"
    }, [_.no]), p("div", {
      class: "expression"
    }, [t.traditional ? p(c("el-input"), {
      modelValue: _.item.label,
      readonly: !0
    }, null) : p(c("pc-x-select"), {
      modelValue: _.prop,
      onChange: (V) => m(_, V),
      options: s,
      text: "label",
      value: "prop"
    }, null), p(c("pc-x-select"), {
      modelValue: _.op,
      onChange: (V) => k(_, V),
      options: _.ops
    }, null), p("div", {
      class: "value-container"
    }, [Ri(this, _)])])]))]), t.traditional ? null : p(c("el-input"), b({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: l,
      "onUpdate:modelValue": (_) => this.expression = _
    }), null)]
  });
}
function Ri(e, t) {
  const s = (n) => W(c((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (l) => t.value = l
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
    options: Mi
  }) : s();
}
const { storage: de } = StardustBrowser, Ni = {
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
  render: Bi,
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
        i.item = this.columns.find((a) => a.prop === n), i.value = o, this.handleSelectField(i, n), this.handleSelectOp(i, l), i.ops = L[i.component].map((a) => Fe[a]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((i) => i.no)) + 1), Object.assign(this, e);
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
      e.value = "", e.prop = t, e.item = this.columns.find(($) => $.prop === e.prop);
      const { options: s, type: i, formAttrs: n = {} } = e.item, l = { ...e.item, ...n }, {
        comp: o,
        visible: a,
        canAdd: r,
        canEdit: h,
        required: m,
        slot: k,
        span: _,
        tableAttrs: w,
        formAttrs: V,
        tagTypes: I,
        tagValues: S,
        width: x,
        minWidth: T,
        disabled: U,
        readonly: y,
        ...g
      } = l;
      g.clearable ?? (g.clearable = !0), e.config = g, e.component = o || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = L[e.component].map(($) => Fe[$]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", g.type = "date"), g.type === "textarea" && delete g.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, we = /* @__PURE__ */ O(Ni, [["__scopeId", "data-v-d86a354a"]]);
const Ii = {
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
}, Di = { class: "mobile-x-table" }, Ui = {
  key: 1,
  class: "card"
}, Pi = ["onClick"], Li = { class: "row-header flex-center" }, qi = ["value", "checked"], Xi = { class: "label" }, zi = { class: "value" }, Wi = ["value", "checked"], Hi = {
  key: 2,
  class: "index"
}, Ji = { class: "title" };
function Ki(e, t, s, i, n, l) {
  const o = c("searcher"), a = c("x-table-tools"), r = c("van-checkbox"), h = c("x-icon"), m = c("van-cell"), k = c("van-list"), _ = c("x-pagination"), w = c("x-info"), V = c("van-popup"), I = c("van-action-sheet");
  return d(), v("div", Di, [
    p(o, {
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
    }), G({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: u(() => [
          E(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: u(() => [
          E(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : C("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), v("div", Ui, [
      (d(!0), v(B, null, N(e._data, (S, x) => (d(), v("div", {
        key: x,
        class: "row",
        onClick: (T) => l.handleClickCard(x)
      }, [
        F("div", Li, [
          l.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[x],
            "onUpdate:modelValue": (T) => n.selected[x] = T,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = K(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : C("", !0),
          p(h, {
            name: "ellipsis",
            class: "more",
            onClick: K((T) => l.handleShowActionSheet(S, x), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        l.hasRadio ? (d(), v("input", {
          key: 0,
          type: "radio",
          value: x,
          checked: x === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = K(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
        }, null, 40, qi)) : C("", !0),
        (d(!0), v(B, null, N(l.cols, (T, U) => (d(), v("div", {
          key: U,
          class: "field"
        }, [
          F("span", Xi, j(T.label) + ":", 1),
          F("span", zi, j(e.calcValue(S, T)), 1)
        ]))), 128))
      ], 8, Pi))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(k, b({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (S) => e.$emit("search"))
    }), {
      default: u(() => [
        (d(!0), v(B, null, N(e._data, (S, x) => (d(), f(m, {
          key: x,
          "is-link": "",
          onClick: (T) => l.handleShowDetail(S, x)
        }, {
          default: u(() => [
            l.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[x],
              "onUpdate:modelValue": (T) => n.selected[x] = T,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = K(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : C("", !0),
            l.hasRadio ? (d(), v("input", {
              key: 1,
              type: "radio",
              value: x,
              checked: x === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = K(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
            }, null, 40, Wi)) : C("", !0),
            l.hasIndex ? (d(), v("span", Hi, j(x + 1), 1)) : C("", !0),
            F("span", Ji, j(l.calcTitle(S)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : C("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(_, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (S) => e._emit("search"))
    }, null, 8, ["query", "total"])) : C("", !0),
    p(V, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (S) => n.popupVisible = S),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: u(() => [
        p(w, {
          data: n.scope.row,
          fields: l.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(I, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (S) => n.actionSheetVisible = S),
      actions: l.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: l.handleSelectAction,
      onCancel: t[10] || (t[10] = (S) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Yi = /* @__PURE__ */ O(Ii, [["render", Ki], ["__scopeId", "data-v-5d189b00"]]);
const Gi = {
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
  methods: {
    initDraggable() {
      const e = {};
      this.columns.forEach((t) => e[t.prop] = t), new window.Sortable(this.$refs.colsTable, {
        sort: !0,
        draggable: ".row",
        onEnd: (t) => {
          const s = [...t.to.querySelectorAll(".row")].map((i) => i.dataset.prop);
          this.columns = s.map((i) => e[i]), this.update();
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
          const { prop: t, label: s, show: i, hide: n, width: l } = e;
          return { prop: t, label: s, show: i, hide: n, width: l };
        })
      });
    }
  }
}, Qi = (e) => (Ne("data-v-cdb9b2c4"), e = e(), Ie(), e), Zi = {
  class: "table",
  ref: "colsTable"
}, el = ["data-prop"], tl = ["title", "onClick"], sl = /* @__PURE__ */ Qi(() => /* @__PURE__ */ F("span", { class: "unit" }, "px", -1)), nl = {
  class: "table",
  ref: "sortsTable"
}, il = ["data-prop"];
function ll(e, t, s, i, n, l) {
  const o = c("el-button"), a = c("Sort"), r = c("el-icon"), h = c("ElCheckbox"), m = c("el-input-number"), k = c("el-tab-pane"), _ = c("x-select"), w = c("x-radios"), V = c("el-tabs"), I = c("el-popover");
  return s.visible ? (d(), f(I, b({
    key: 0,
    placement: "bottom",
    trigger: "click",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: u(() => [
      p(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: u(() => [
      p(V, {
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
                onClick: l.handleResetColumns
              }, {
                default: u(() => [
                  A("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              F("div", Zi, [
                (d(!0), v(B, null, N(n.columns, (S) => (d(), v("div", {
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
                    "onUpdate:modelValue": (x) => S.show = x,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  F("span", {
                    class: "label overflow-text",
                    title: S.label,
                    onClick: (x) => l.handleToggle(S)
                  }, j(S.label), 9, tl),
                  p(m, {
                    modelValue: S.width,
                    "onUpdate:modelValue": (x) => S.width = x,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  sl
                ], 8, el))), 128))
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
                onClick: l.handleAddSort
              }, {
                default: u(() => [
                  A("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              F("div", nl, [
                (d(!0), v(B, null, N(n.sorts, (S, x) => (d(), v("div", {
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
                    onClick: (T) => n.sorts.splice(x, 1)
                  }, null, 8, ["onClick"])
                ], 8, il))), 128))
              ], 512)
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
const Ze = /* @__PURE__ */ O(Gi, [["render", ll], ["__scopeId", "data-v-cdb9b2c4"]]);
const ol = {
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
}, al = {
  key: 1,
  class: "collapse-title"
}, rl = {
  key: 2,
  class: "collapse-title"
}, dl = /* @__PURE__ */ F("span", null, "-", -1), cl = ["value", "checked"], ul = { key: 1 };
function hl(e, t, s, i, n, l) {
  const o = c("searcher"), a = c("pc-x-icon"), r = c("settings"), h = c("pc-x-table-tools"), m = c("el-image"), k = c("el-tag"), _ = c("el-table-column"), w = c("el-button"), V = c("el-table"), I = c("x-pagination"), S = c("el-collapse-item"), x = c("el-collapse"), T = Z("domid"), U = Z("loading");
  return d(), v("div", {
    class: z(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    p(x, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[5] || (t[5] = (y) => n.activeNames = y),
      class: z((n._useCollapse ? "use" : "no") + "-collapse"),
      onChange: e.handleCollapseChange
    }, {
      default: u(() => [
        p(S, {
          name: n.activeNames[0]
        }, {
          title: u(() => [
            e.$slots["collapse-title"] ? E(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), v("span", al, j(e.title), 1)) : (d(), v("span", rl, [
              A(j(e.title) + "，当前第 ", 1),
              F("span", null, j(e._query.page), 1),
              A(" 页，展示 "),
              F("span", null, j(e._data.length), 1),
              A(" 条数据， 共 "),
              F("span", null, j(e._total || e._data.length), 1),
              A(" 条数据 ")
            ]))
          ]),
          default: u(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, b({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiDelete: e._onMultiDelete
            }), G({
              "tools-end": u(() => [
                F("span", {
                  class: "minus",
                  onClick: t[0] || (t[0] = (...y) => e.handleMinus && e.handleMinus(...y))
                }, [
                  p(a, { name: "FullScreen" }),
                  dl
                ]),
                p(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                p(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (y) => n.settings = y),
                  visible: !e.hideSettings,
                  width: e._attrs["cols-popover-width"] || 500,
                  onSort: t[2] || (t[2] = (y) => e.$emit("sort", y)),
                  onReset: e.handleResetSettings,
                  onSortChange: e.handleSortChange
                }, null, 8, ["modelValue", "visible", "width", "onReset", "onSortChange"])
              ]),
              _: 2
            }, [
              e.$slots["tools-prefix"] ? {
                name: "tools-prefix",
                fn: u(() => [
                  E(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: u(() => [
                  E(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : C("", !0),
            M((d(), f(V, b({ ref: "tableRef" }, e.elTableAttrs, {
              onHeaderDragend: e.handleHeaderDragend,
              onSelectionChange: e.handleSelectionChange,
              onSortChange: e.handleSortChange
            }), {
              default: u(() => [
                (d(!0), v(B, null, N(e._visibleColumns, (y, g) => (d(), f(_, b(y, {
                  key: g,
                  "min-width": y.minWidth,
                  align: y.align || e._attrs.tableAlign || "center",
                  resizable: y.resizable || !0,
                  "show-overflow-tooltip": e.calcOverflowTooltip(y)
                }), G({ _: 2 }, [
                  ["selection", "index"].includes(y.type) ? void 0 : {
                    name: "default",
                    fn: u(($) => [
                      y.type === "radio" ? (d(), v("input", {
                        key: 0,
                        type: "radio",
                        value: $.$index,
                        checked: $.$index === n.checked,
                        onChange: t[3] || (t[3] = (...R) => e.handleCheckedChange && e.handleCheckedChange(...R))
                      }, null, 40, cl)) : y.slot === "$image" ? (d(), f(m, b({
                        key: 1,
                        src: e._imageSrc($, y),
                        "preview-src-list": e._imagePreviewSrcList($, y),
                        "preview-teleported": ""
                      }, y.imageAttrs), null, 16, ["src", "preview-src-list"])) : y.slot === "$tag" ? (d(), f(k, {
                        key: 2,
                        type: e.calcTagType($, y)
                      }, {
                        default: u(() => [
                          A(j(e.calcTagValue($, y)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])) : y.slot ? E(e.$slots, y.slot, {
                        key: 3,
                        scope: $,
                        column: y,
                        value: $.row[y.prop]
                      }) : e.slotAll ? E(e.$slots, "all", {
                        key: 4,
                        scope: $,
                        column: y,
                        value: $.row[y.prop]
                      }) : (d(), v(B, { key: 5 }, [
                        y.comp === "ElSwitch" || e.table.isRowEdit && $.row.isEditing && (y.visible !== !1 || y.canEdit) ? (d(), f(ee(y.comp || "ElInput"), b({ key: 0 }, { ...y, ...y.formAttrs }, {
                          modelValue: $.row[y.prop],
                          "onUpdate:modelValue": (R) => $.row[y.prop] = R,
                          disabled: !$.row.editable || !$.row.isEditing
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), v("span", ul, j(e.calcValue($.row, y)), 1))
                      ], 64))
                    ]),
                    key: "0"
                  }
                ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                e.hideOperates ? C("", !0) : (d(), f(_, {
                  key: 0,
                  label: "操作",
                  "min-width": e.operatesWidth,
                  align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                  fixed: e._attrs.operatesFixed || "right"
                }, {
                  default: u((y) => [
                    E(e.$slots, "operates-prefix", { scope: y }),
                    e.canEdit(y.row) ? M((d(), f(w, b({ key: 0 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                      onClick: (g) => e._emit("edit", y)
                    }), {
                      default: u(() => [
                        p(a, { name: "edit" }),
                        A(" 编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [T, e.domids.edit]
                    ]) : C("", !0),
                    e.canSave(y.row) ? M((d(), f(w, b({ key: 1 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                      disabled: y.row._loading,
                      onClick: (g) => e._emit("row-edit", y)
                    }), {
                      default: u(() => [
                        p(a, { name: "collection" }),
                        A(" 保存 ")
                      ]),
                      _: 2
                    }, 1040, ["disabled", "onClick"])), [
                      [U, y.row._loading],
                      [T, e.domids["row-edit"]]
                    ]) : C("", !0),
                    e.canCancelEdit(y.row) ? M((d(), f(w, b({ key: 2 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                      onClick: (g) => e._emit("cancel-edit", y)
                    }), {
                      default: u(() => [
                        p(a, { name: "refresh-left" }),
                        A(" 取消编辑 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [T, e.domids["cancel-edit"]]
                    ]) : C("", !0),
                    e.canDelete(y.row) ? M((d(), f(w, b({ key: 3 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                      onClick: (g) => e._emit("delete", y)
                    }), {
                      default: u(() => [
                        p(a, { name: "DeleteFilled" }),
                        A(" 删除 ")
                      ]),
                      _: 2
                    }, 1040, ["onClick"])), [
                      [T, e.domids.delete]
                    ]) : C("", !0),
                    E(e.$slots, "operates-suffix", { scope: y })
                  ]),
                  _: 3
                }, 8, ["min-width", "align", "fixed"]))
              ]),
              _: 3
            }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
              [U, e._loading]
            ]),
            e._query && e._total ? (d(), f(I, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[4] || (t[4] = (y) => e._emit("search", n.params))
            }, null, 8, ["query", "total"])) : C("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class", "onChange"])
  ], 2);
}
const ml = /* @__PURE__ */ O(ol, [["render", hl]]);
const pl = {
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
}, fl = { class: "mobile-x-table-tools" }, gl = { key: 0 }, bl = { class: "tools" }, _l = { class: "tools-end" };
function yl(e, t, s, i, n, l) {
  const o = c("van-floating-bubble"), a = c("mobile-x-icon"), r = c("van-button"), h = Z("domid");
  return d(), v("div", fl, [
    e.$attrs.onAdd ? M((d(), v("div", gl, [
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
    F("div", bl, [
      E(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? M((d(), f(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (m) => e.$emit("search"))
      }), {
        default: u(() => [
          p(a, { name: "search" }),
          A(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : C("", !0),
      e.$attrs.onMultiEdit ? M((d(), f(r, b({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
      }), {
        default: u(() => [
          p(a, { name: "edit" }),
          A(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : C("", !0),
      e.$attrs.onMultiDelete ? M((d(), f(r, b({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
      }), {
        default: u(() => [
          p(a, { name: "DeleteFilled" }),
          A(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : C("", !0),
      e.$attrs.onExport ? M((d(), f(r, b({ key: 3 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (m) => e.$emit("export"))
      }), {
        default: u(() => [
          p(a, { name: "printer" }),
          A(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : C("", !0),
      e.$attrs.onSearchExport ? M((d(), f(r, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
      }), {
        default: u(() => [
          p(a, { name: "printer" }),
          A(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : C("", !0),
      e.$attrs.onImport ? M((d(), f(r, b({ key: 5 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (m) => e.$emit("import"))
      }), {
        default: u(() => [
          p(a, { name: "UploadFilled" }),
          A(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : C("", !0),
      E(e.$slots, "tools-suffix", {}, void 0, !0),
      F("div", _l, [
        E(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const vl = /* @__PURE__ */ O(pl, [["render", yl], ["__scopeId", "data-v-6ef6b95e"]]);
const wl = {
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
}, Sl = { class: "tools" }, kl = { class: "tools-end flex-center" };
function $l(e, t, s, i, n, l) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-card"), h = Z("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: u(() => [
      F("div", Sl, [
        E(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? M((d(), f(a, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
          onClick: t[0] || (t[0] = (m) => e.$emit("search"))
        }), {
          default: u(() => [
            p(o, { name: "search" }),
            A(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : C("", !0),
        e.$attrs.onAdd ? M((d(), f(a, b({ key: 1 }, { type: "primary", ...s.addBtn }, {
          onClick: t[1] || (t[1] = (m) => e.$emit("add"))
        }), {
          default: u(() => [
            p(o, { name: "circle-plus-filled" }),
            A(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : C("", !0),
        e.$attrs.onMultiEdit ? M((d(), f(a, b({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
        }), {
          default: u(() => [
            p(o, { name: "edit" }),
            A(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : C("", !0),
        e.$attrs.onMultiDelete ? M((d(), f(a, b({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
        }), {
          default: u(() => [
            p(o, { name: "DeleteFilled" }),
            A(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : C("", !0),
        e.$attrs.onExport ? M((d(), f(a, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
          onClick: t[4] || (t[4] = (m) => e.$emit("export"))
        }), {
          default: u(() => [
            p(o, { name: "printer" }),
            A(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : C("", !0),
        e.$attrs.onSearchExport ? M((d(), f(a, b({ key: 5 }, { type: "success", ...s.exportBtn }, {
          onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
        }), {
          default: u(() => [
            p(o, { name: "printer" }),
            A(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : C("", !0),
        e.$attrs.onImport ? M((d(), f(a, b({ key: 6 }, { type: "warning", ...s.importBtn }, {
          onClick: t[6] || (t[6] = (m) => e.$emit("import"))
        }), {
          default: u(() => [
            p(o, { name: "UploadFilled" }),
            A(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : C("", !0),
        E(e.$slots, "tools-suffix", {}, void 0, !0),
        F("div", kl, [
          E(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Cl = /* @__PURE__ */ O(wl, [["render", $l], ["__scopeId", "data-v-02d70f98"]]);
function xl(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Re(e);
}
const Vl = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, i = (n) => {
    n ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const l = n ? e._data.slice() : [];
    e.handleSelectionChange(l);
  };
  return p(c("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: i
  }, null);
}, El = (e, t) => {
  const {
    rowIndex: s,
    rowData: i
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const l = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(l);
  };
  return p(c("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, Al = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, Ol = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return p("input", {
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
  return p(c("el-button"), b({
    type: i
  }, t._attrs[s + "-btn"], {
    onClick: r
  }), {
    default: () => [p(c("x-icon"), {
      name: n
    }, null), l]
  });
}, Tl = (e, t) => {
  if (t.canEdit(e.rowData))
    return ae([e, t, "edit", "warning", "edit", "编辑"]);
}, jl = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return ae([e, t, "row-edit", "success", "collection", "保存"]);
}, Fl = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return ae([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Ml = (e, t) => {
  if (t.canDelete(e.rowData))
    return ae([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Bl = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (l) => El(l, t);
  if (e.type === "index")
    return (l) => Al(l, t);
  if (e.type === "radio")
    return (l) => Ol(l, t);
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
      const m = (_) => {
        o[a.prop] = _;
      }, k = a.comp || "ElInput";
      return W(c(k), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: m,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(l.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? p(c("el-tooltip"), {
      content: r
    }, xl(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Rl = (e, t) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Vl(t)), r.cellRenderer = Bl(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(l) {
      return p("div", {
        class: "operates"
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, Tl(l, t), jl(l, t), Fl(l, t), Ml(l, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), n;
}, Nl = {
  convertColumnsForTableV2: Rl
};
const Il = {
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
    convertColumnsForTableV2: Nl.convertColumnsForTableV2
  }
}, Dl = { key: 1 };
function Ul(e, t, s, i, n, l) {
  const o = c("Searcher"), a = c("x-icon"), r = c("Settings"), h = c("x-table-tools"), m = c("el-table-v2"), k = c("el-auto-resizer"), _ = c("x-pagination"), w = c("el-collapse-item"), V = c("el-collapse"), I = Z("loading");
  return d(), v("div", {
    class: z(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (S) => e._emit("search", S))
    }, null, 8, ["uid", "columns", "config"]),
    p(V, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (S) => n.activeNames = S),
      class: z((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: u(() => [
        p(w, {
          name: n.activeNames[0]
        }, {
          title: u(() => [
            e.$slots["collapse-title"] ? E(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", Dl, j(e.title), 1))
          ]),
          default: u(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, b({ key: 0 }, e._attrs, {
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
                  E(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: u(() => [
                  E(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiEdit", "onMultiDelete"])) : C("", !0),
            p(k, {
              style: it({ height: s.height })
            }, {
              default: u(({ width: S, height: x }) => [
                M((d(), f(m, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: l.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: S,
                  height: x
                }), G({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: u(() => [
                      E(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: u(() => [
                      E(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: u(() => [
                      E(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [I, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(_, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (S) => e._emit("search"))
            }, null, 8, ["query", "total"])) : C("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Pl = /* @__PURE__ */ O(Il, [["render", Ul]]);
const ce = ["selection", "radio"], Ll = {
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
}, ql = { class: "x-table-viewer" };
function Xl(e, t, s, i, n, l) {
  const o = c("x-dialog");
  return d(), v("div", ql, [
    p(o, b(l._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": l.handleBeforeClose,
      onSubmit: l.handleSubmit,
      onCancel: l.handleCancel
    }), {
      default: u(() => [
        (d(), f(ee(s.useTableV2 ? "x-table-v2" : "x-table"), b({
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
const zl = /* @__PURE__ */ O(Ll, [["render", Xl], ["__scopeId", "data-v-f5d31400"]]), Wl = {
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
}, Hl = { class: "x-tinymce" }, Jl = ["id", "innerHTML"];
function Kl(e, t, s, i, n, l) {
  return d(), v("div", Hl, [
    F("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, Jl)
  ]);
}
const Yl = /* @__PURE__ */ O(Wl, [["render", Kl]]);
const Gl = {
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
}, Se = (e) => (Ne("data-v-fe069681"), e = e(), Ie(), e), Ql = { class: "mask" }, Zl = {
  key: 0,
  class: "el-upload__text"
}, eo = /* @__PURE__ */ Se(() => /* @__PURE__ */ F("em", null, "点击上传", -1)), to = /* @__PURE__ */ Se(() => /* @__PURE__ */ F("br", null, null, -1)), so = /* @__PURE__ */ Se(() => /* @__PURE__ */ F("br", null, null, -1)), no = {
  key: 0,
  class: "path"
};
function io(e, t, s, i, n, l) {
  const o = c("pc-x-icon"), a = c("el-button"), r = c("el-upload");
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
    default: u(() => [
      F("div", Ql, [
        p(o, { name: "upload-filled" }),
        n.disabled ? C("", !0) : (d(), v("div", Zl, [
          A(" 将文件拖到此处，或"),
          eo,
          to,
          so,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: K(l.handleUploadAll, ["stop"])
          }, {
            default: u(() => [
              A(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : C("", !0)
        ]))
      ]),
      l.filepath ? (d(), v("div", no, j(s.modelValue), 1)) : C("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const lo = /* @__PURE__ */ O(Gl, [["render", io], ["__scopeId", "data-v-fe069681"]]);
const oo = {
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
}, ao = ["src"];
function ro(e, t, s, i, n, l) {
  const o = c("Plus"), a = c("el-icon"), r = c("el-upload"), h = c("el-dialog");
  return d(), v(B, null, [
    p(r, b({
      "file-list": s.modelValue,
      "onUpdate:fileList": t[0] || (t[0] = (m) => e.$emit("update:modelValue", m)),
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
        }, null, 8, ao)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const co = /* @__PURE__ */ O(oo, [["render", ro], ["__scopeId", "data-v-821cec65"]]), ue = {
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
  mobilexformitem: Ts,
  pcxformitem: js,
  mobilexicon: Rs,
  pcxicon: Us,
  xinfo: qn,
  xlooper: Hn,
  mobilexpagination: Yn,
  pcxpagination: Zn,
  xpicker: si,
  mobilexradios: li,
  pcxradios: ri,
  mobilexrow: hi,
  pcxrow: gi,
  mobilexscan: yi,
  pcxscan: Si,
  mobilexselect: Vi,
  pcxselect: Fi,
  mobilextable: Yi,
  pcxtable: ml,
  mobilextabletools: vl,
  pcxtabletools: Cl,
  xtablev2: Pl,
  xtableviewer: zl,
  xtinymce: Yl,
  xfileuploader: lo,
  ximageuploader: co
}, se = {};
for (let e in ue)
  se[ue[e].name] = ue[e];
const uo = (e) => ({
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
  const e = Object.keys(se), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = se[i]);
  for (const i of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(i.toLowerCase())) ? s[i] = uo(i) : s[i] = se[i];
  return s;
})(), ho = (e, t) => {
  for (let s in pe)
    e.component(s, pe[s]);
}, po = {
  version: "1.0.167",
  ...pe,
  ...Je,
  ...$t,
  install: ho
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
  po as default,
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
