import { toRaw as ot, nextTick as le, watch as we, resolveComponent as u, openBlock as d, createBlock as f, mergeProps as b, createElementBlock as w, Fragment as N, renderList as U, withCtx as c, renderSlot as x, toDisplayString as j, useCssVars as Pe, resolveDirective as ie, withDirectives as B, createElementVNode as T, createTextVNode as C, createVNode as m, createCommentVNode as S, vShow as Oe, pushScopeId as Se, popScopeId as ke, createSlots as te, resolveDynamicComponent as se, normalizeClass as Y, normalizeProps as de, guardReactiveProps as Le, h as G, isVNode as qe, withModifiers as Z, normalizeStyle as at } from "vue";
const rt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class n {
    constructor(V, D, I, M, _, H, P) {
      this.x = V, this.y = D, this.radius = I, this.color = M, this.vx = _, this.vy = H, this.ctx = P;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => l.clearRect(0, 0, t, s), o = (A) => Math.floor(Math.random() * A);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const A = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = O * 30), a >= 1 && (a = 1, r = -r, h = O * 30)), A.addColorStop(0, "rgba(250, 220, 20, 0.5)"), A.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = A, l.fillRect(0, 0, t, s);
  }, v = Math.floor(t / 100), y = Math.floor(s / 100), O = 20, k = Math.round(1e3 / O), R = Array.from({ length: 52 }).map(() => {
    const A = Math.floor(o(v + y) * 1.5 + o(5));
    let V = o(t), D = o(s);
    V = Math.min(Math.max(A, V), t - A), D = Math.min(Math.max(A, D), s - A);
    let I = o(2) ? (o(2) + 2) * v : (o(-1) - 2) * v, M = o(2) ? (o(2) + 2) * y : (o(-1) - 2) * y;
    return I = Math.floor(I / O), M = Math.floor(M / O), new n(
      V,
      D,
      A,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      I,
      M,
      l
    );
  });
  let g, $;
  e.addEventListener("mouseover", (A) => {
    g = A.pageX, $ = A.pageY;
  }), e.addEventListener("mousemove", (A) => {
    if (g === void 0) {
      g = A.pageX, $ = A.pageY;
      return;
    }
    const V = A.pageX - g, D = A.pageY - $;
    R.forEach((I) => {
      I.x += V / O, I.y += D / O;
    }), g = A.pageX, $ = A.pageY;
  });
  let F = Date.now(), q = null;
  const z = () => {
    Date.now() - F >= k && (i(), p(), R.forEach((A) => A.update()), F = Date.now()), q = requestAnimationFrame(z);
  };
  return q = requestAnimationFrame(z), () => cancelAnimationFrame(q);
}, dt = ({
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
  const p = r.measureText(e).width + t, v = s + t;
  for (let y = t / 2; y < i; y += v)
    for (let O = t / 2; O < n; O += p)
      r[o + "Text"](e, O, y);
  return a;
}, ct = {
  pop: rt,
  createWatermark: dt
}, Xe = async (e) => {
  var l, n;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((i) => {
    var o, a;
    return ((o = i.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = i.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((i) => Xe(i.form)));
  return t && s.every((i) => i);
}, ut = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, K = (e, t) => {
  const s = e.__v_isRef ? e.value : ot(e);
  let l = s;
  if (typeof s[0] != "object" && (l = s.map((i) => ({ text: i, value: i }))), !t.sort)
    return l;
  const n = typeof t.sort == "string" ? t.sort : t.text || "text";
  return l.sort((i, o) => i[n].localeCompare(o[n]));
}, { ElMessage: ht, ElNotification: mt, ElMessageBox: pt } = window.ElementPlus || {}, { showToast: ft, showNotify: gt, showConfirmDialog: bt } = window.vant || {}, W = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? ((l === "error" || l === "warning") && (t.type = "fail"), ft(t)) : ht({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, re = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? (l === "error" && (t.type = "danger"), gt(t)) : mt({
    showClose: !0,
    ...t
  });
}, ee = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = bt(e) : t = pt.confirm(
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
  W[e] = W[e[0]] = (t) => W({ type: e, ...typeof t != "string" ? t : { message: t } }), re[e] = re[e[0]] = (t) => re({ type: e, ...typeof t != "string" ? t : { message: t } }), ee[e] = ee[e[0]] = (t) => ee({ type: e, ...t });
const _t = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    l.matched.length ? i() : i("/404");
  });
}, yt = (e, t, s) => {
  e.afterEach((l, n) => {
    const i = l.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...i].filter((o) => o).reverse().join("-");
  });
}, vt = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    var o;
    return l.meta.acl === !1 || (o = l.meta) != null && o.visitable || t.acl.paths.includes(l.path) ? i() : (W.e("无权访问页面: " + l.path), i(t.acl.paths[0] || "/404"));
  }), le(() => {
    let l = !1;
    we(() => t.acl.menus, (n) => {
      if (!l) {
        if (!n.length)
          return;
        l = !0;
      }
      const i = t.acl.paths, o = (a, r) => {
        var p, v, y, O, k, R, g;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (p = a.children) == null || p.forEach(($) => {
          var F;
          $.meta || ($.meta = {}), (F = $.meta).acl || (F.acl = !1), o($, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((y = a.meta).hidden ?? (y.hidden = (v = r.meta) == null ? void 0 : v.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((k = a.meta).visitable ?? (k.visitable = (O = r.meta) == null ? void 0 : O.visitable), a.meta = { ...a.meta })), (R = a.children) == null || R.forEach(($) => o($, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !i.includes(h), (g = a.children) != null && g.some(($) => $.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, wt = (e, t, s) => {
  e.beforeEach((l, n, i) => {
    l.name === "Login" && t.getters.logined && l.query.redirectTo ? i(l.query.redirectTo) : i();
  });
}, St = {
  check404: _t,
  setTitle: yt,
  checkRolesPages: vt,
  redirectTo: wt
}, ze = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), We = (e = {}) => ({
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
}), ce = () => ({
  ...ze(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), kt = ({
  table: e = {},
  dialog: t = {},
  columns: s = [
    { fixed: "left", type: "selection" },
    { type: "_index" }
  ],
  query: l = {},
  form: n = {}
} = {}) => ({
  table: {
    ...We(l),
    ...e,
    columns: s
  },
  dialog: {
    ...ce(),
    ...t,
    form: n
  }
}), { funcs: _e } = StardustJs, $t = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let l of s)
    l.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[l.slice(3)] = t[l], delete t[l]) : l.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[l.slice(3)] = t[l], delete t[l]);
  return t;
}), Ct = (e, t) => {
  for (let s in e) {
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && He(l, t), s === "dialog" && e[s]._isBaseDialog && Je(l, t), s === "form" && e[s]._isBaseForm && $e(l, t));
  }
  return e;
}, He = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), Je = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), $e(e, t), e), $e = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), Ye(e.form, e.formItems), e.initialForm = _e.deepCopy(e.form), e.initialFormRules = _e.deepCopy(e.formRules), we(() => e.formItems, () => {
  Ke(e);
}, { immediate: !0, deep: !0 }), e), Ke = (e) => {
  const { formItems: t, initialFormRules: s } = e, l = t.filter((i) => {
    let { formAttrs: o = {}, required: a = !1 } = i;
    return a = "required" in o ? o.required : a, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && a !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, _e.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !l.length)
    return;
  const n = {};
  return l.forEach((i) => {
    if (e.formRules[i])
      return;
    const o = t.find((O) => O.prop === i), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = Qe[a], h = [], p = "options" in o, y = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${p ? "选择" : "输入"}${(o == null ? void 0 : o.label) || i}` };
    o.validator && (y.validator = o.validator), o.asyncValidator && (y.asyncValidator = o.asyncValidator), o.comp ? h.push({ ...y, trigger: r.change }) : h.push({ ...y, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...y, trigger: r.blur }), n[i] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, Ye = (e, t, s = !0) => {
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
      const v = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + v), n["end-placeholder"] || (n["end-placeholder"] = "结束" + v), i = [];
    }
    l[n.prop] = i;
  }), Object.assign(e, { ...l, ...e }), e;
}, Ge = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [l, n] = e.split(s);
  n = n.split("|");
  let i = t[l];
  typeof i == "number" ? i += "" : typeof i == "string" && (i = i.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? i.startsWith(a) : o === "*=" ? i.includes(a) : o === "$=" ? i.endsWith(a) : o === "~=" ? !i.includes(a) : o === "!=" ? i !== a : a === i);
}, Qe = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, Ze = {
  effects: ct,
  validateForm: Xe,
  formatPrecision: ut,
  formatOptions: K,
  Message: W,
  Notify: re,
  Confirm: ee,
  middlewares: St,
  baseForm: ze,
  baseTable: We,
  baseDialog: ce,
  baseModel: kt,
  initFields: $t,
  initModel: Ct,
  initTable: He,
  initDialog: Je,
  initForm: $e,
  initFormRules: Ke,
  initDefaultForm: Ye,
  isWhenMatched: Ge,
  triggers: Qe
};
class et {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const l = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => l }
      }), this._initLifeCycles();
    }
    le(this.onInit);
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
    return Ze;
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
const { funcs: Te, highdict: Fe, dates: pe } = StardustJs, { file: je, excel: ae } = StardustBrowser;
class tt extends et {
  constructor(t) {
    super(t);
    const { model: s, table: l, dialog: n, dbModelName: i = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = l || (s == null ? void 0 : s.table), this.dialog = n || (s == null ? void 0 : s.dialog), this.dbModelName = i, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], le(() => {
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
  get form() {
    var t, s;
    return ((t = this.model) == null ? void 0 : t.form) || ((s = this.dialog) == null ? void 0 : s.form);
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
    let l = Fe.get(s, this.listProp);
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
    }), await le(), await Te.sleep(50), this._clearValidate(), this.afterAdd());
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
    }), await le(), (l = this.dialog.formRef) == null || l.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (!await this.beforeDelete({ $index: t, row: s }))
      return;
    if (await ee.w({ message: "确定要删除吗？", title: "警告" })) {
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
      W("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const { list: l, selection: n, ref: i } = this.table;
    let o = n.length > 0 ? n : l;
    o = Te.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(i._visibleColumns, "current"), r = a.map((y) => y.prop), h = a.map((y) => y.label);
    o = o.map((y) => r.map((O) => y[O]));
    let p = null;
    t === "csv" ? p = ae.export2Csv : p = ae.export2Excel;
    let v = { header: h, data: o, filename: s };
    v = await this.processExporting(v), p(v), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      W("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const l = await this.dbTable.search(this.getSearchExportParams());
    let n = l.data;
    n = this.formatList(n, l), n = this.processExportingData(n, "search");
    const i = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = i.map((p) => p.prop), a = i.map((p) => p.label);
    n = n.map((p) => o.map((v) => p[v]));
    let r = null;
    t === "csv" ? r = ae.export2Csv : r = ae.export2Excel;
    let h = { header: a, data: n, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    var i, o;
    const t = await je.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), l = await je.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      await ((i = window.DynamicLibs) == null ? void 0 : i.use("Papa")), n = window.Papa.parse(l, { header: !0 }).data;
    else {
      await ((o = window.DynamicLibs) == null ? void 0 : o.use("XLSX"));
      const a = window.XLSX.read(l, {}), r = Object.values(a.Sheets);
      n = XLSX.utils.sheet_to_json(r[0]);
    }
    if (n.length > 0) {
      const a = {};
      this.table.columns.forEach((h) => a[h.label] = h.prop);
      const r = Object.keys(n[0]);
      n = n.map((h) => {
        const p = {};
        return r.forEach((v) => p[a[v]] = h[v]), p;
      });
    }
    n = this.processImportingData(n), await this.dbTable.func(["bulkCreate", n]), W.s("导入成功"), this.handleSearch();
  }
  async handleMultiDelete() {
    const { selection: t } = this.table;
    if (!t.length) {
      W.w("尚未选择要删除的数据");
      return;
    }
    if (!await ee.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
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
    if (t = t instanceof Event ? this.form : t, this._isSubmitting)
      return;
    const s = this.model.formRef || this.dialog.formRef;
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
    return this._isSubmitting = !1, n.err || W.s("保存成功"), this.router.go(-1), n;
  }
  async handleSubmit(t) {
    if (t = t instanceof Event ? null : t, this._isSubmitting || !this.dialog.visible)
      return !1;
    this._isSubmitting = !0;
    const s = t || this.form;
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
    return t != null && t.page && (this.table.query.page = t.page), t != null && t.limit && (this.table.query.limit = t.limit), Object.assign({}, JSON.parse(this._lastSearchParams), this.table.query, t);
  }
  getAddParams(t) {
    const s = Object.keys(this.dialog.initialForm), l = {};
    return s.length ? s.forEach((n) => l[n] = t[n]) : Object.assign(l, t), this.dialog.formItems.forEach((n) => {
      let i = l[n.model || n.prop];
      n.type === "number" ? i = this.uiUtils.formatPrecision(i, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? i = pe.format(i) : (!n.type || n.type === "date") && (i = pe.format(i, "", !1))), l[n.model || n.prop] = i;
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
      const { format: p, formatter: v, autoFill: y } = a.tableAttrs || {}, { modelName: O } = a.formAttrs || {};
      if (O && y)
        t.forEach((k) => k[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const R = we(() => a.options, (g, $) => {
          const F = $ ? this.table.list : t, q = xt(a);
          F.forEach((z, A) => {
            const V = z[r];
            z[`_formatted_${r}`] = q[V] || (v == null ? void 0 : v(V, z, A)) || V;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(R);
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
    const r = Fe.mapField(a.data, o, i);
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
        typeof a == "boolean" ? i[o] = a && 1 || 0 : a instanceof Date ? (i[o] = pe.format(a), i[o].endsWith(" 00:00:00") && (i[o] = i[o].slice(0, -9))) : typeof a == "object" && (i[o] = JSON.stringify(a));
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
    return Object.values(t).some((n) => !s.includes(n)) ? !0 : ee.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    W(typeof t == "object" ? t.message || t.err || t.toString() : t);
  }
  get _isMobile() {
    var s, l;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((l = this.dialog) == null ? void 0 : l.formRef);
    return t ? t.$.attrs.class.indexOf("mobile") >= 0 : window.isMobile;
  }
}
const xt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: l = "text", value: n = "value" } = s, i = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    i[o[n]] = o[l];
  }), i;
};
class Vt extends tt {
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
const Et = {
  BaseController: et,
  CrudController: tt,
  TempCrudController: Vt
}, E = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [l, n] of t)
    s[l] = n;
  return s;
}, At = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Ot(e, t, s, l, n, i) {
  const o = u("van-action-sheet");
  return d(), f(o, b(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Tt = /* @__PURE__ */ E(At, [["render", Ot]]), Ft = {
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
}, jt = { class: "x-auto-rows" }, Dt = { key: 1 };
function Rt(e, t, s, l, n, i) {
  const o = u("x-col"), a = u("x-row");
  return d(), w("div", jt, [
    (d(!0), w(N, null, U(i.rows, (r, h) => (d(), f(a, b({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), w(N, null, U(r, (p, v) => (d(), f(o, b(p, {
          span: p.span || s.span,
          key: v,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            p.slot || e.$attrs.slot ? x(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), w("span", Dt, j(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const Bt = /* @__PURE__ */ E(Ft, [["render", Rt]]), Nt = {
  name: "MobileXButton"
};
function It(e, t, s, l, n, i) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const Mt = /* @__PURE__ */ E(Nt, [["render", It]]), Ut = {
  name: "PcXButton"
};
function Pt(e, t, s, l, n, i) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const Lt = /* @__PURE__ */ E(Ut, [["render", Pt]]);
const { funcs: qt } = StardustBrowser, Xt = ["index", "selection", "expand", "radio", "_index"], Ce = {
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
        ...ce(),
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
      return qt.calcPixel(this.height) * this.zoom + "px";
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
  async mounted() {
    await this.init(), this.initDatasource();
  },
  beforeUnmount() {
    document.removeEventListener("resize", this.update), this.timer && clearInterval(this.timer);
  },
  methods: {
    async init() {
      var e;
      await ((e = window.DynamicLibs) == null ? void 0 : e.use("echarts")), this.chart && this.$refs.el.removeAttribute("_echarts_instance_"), this.chart = window.echarts.init(this.$refs.el), this.update(), document.removeEventListener("resize", this.update), document.addEventListener("resize", this.update), this.updator && (this.timer = setInterval(this.updator.handler.bind(this), this.updator.interval || 1e3));
    },
    initDatasource() {
      if (!this.datasource)
        return;
      const e = this.datasource.columns.filter((t) => !Xt.includes(t.type));
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
      return (t === "sum" || t === "average") && (l = e.reduce((n, i) => n + i, 0).toFixed(3) * 1), t === "count" ? l = e.length : t === "average" ? e.length ? l = (l / (s || e.length)).toFixed(3) * 1 : l = void 0 : t === "first" ? l = e[0] : t === "last" ? l = e[e.length - 1] : (t === "max" || t === "min") && (l = Math[t].apply(null, e)), l;
    },
    setRich(e) {
      var A;
      const { categories: t, data: s, attr: l, summary: n, type: i, filter: o, grid: a } = e, r = {}, h = Array.isArray(t) && t.length || ((A = t == null ? void 0 : t.data) == null ? void 0 : A.length), p = h && (Array.isArray(t) ? t : t.data), v = typeof e.series == "string" ? e.series : e.series.data, y = (o == null ? void 0 : o.categories.limit) > -1, O = (o == null ? void 0 : o.series.limit) > -1, k = {}, R = [], g = /* @__PURE__ */ new Set(), $ = [];
      s.forEach((V) => {
        var I;
        let D = V[v] || "未知";
        if (O && $.length >= o.series.limit && !$.includes(D)) {
          if (!o.series.mergeOthers)
            return;
          D = "其他";
        }
        if (h) {
          let M = p.map((_) => V[_]).join("/") || "未知";
          if (y && R.length >= o.categories.limit && !R.includes(M)) {
            if (!o.categories.mergeOthers)
              return;
            g.add(M), M = "其他";
          }
          k[M] || R.push(M), k[M] || (k[M] = {}), $.includes(D) || $.push(D), (I = k[M])[D] || (I[D] = []), k[M][D].push(V[l]);
        } else
          k[D] || $.push(D), k[D] || (k[D] = []), k[D].push(V[l]);
      });
      const F = h && !O ? [...new Set(s.map((V) => V[v]))] : $;
      if (h)
        for (let V in k)
          for (let D in k[V])
            k[V][D] = this.calcSummary(
              k[V][D],
              n,
              y && V === "其他" ? k[V][D].length / g.size : k[V][D].length
            );
      else
        for (let V in k)
          k[V] = this.calcSummary(k[V], n);
      let q = F;
      typeof e.series == "object" && e.series.formatter && (q = F.map((V) => e.series.formatter(V)));
      let z = [];
      h ? z = F.map((V, D) => ({
        name: q[D],
        type: i,
        label: { show: !0, position: "top" },
        data: R.map((I) => ({ name: I, value: k[I][V] }))
      })) : z = [
        {
          type: i,
          colorBy: "data",
          label: { show: !0, position: "top" },
          data: F.map((V) => ({ name: V, value: k[V] }))
        }
      ], Object.assign(r, {
        legend: { data: q },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? R.map((V) => t.formatter(V)) : R : v.formatter ? $.map((V) => v.formatter(V)) : $
        },
        yAxis: { type: "value" },
        series: z
      }, this.option, { grid: a }), this.update(r);
    },
    update(e = {}) {
      var t;
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1), e = {
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
        },
        legend: {
          padding: [0, 60],
          ...e.legend
        }
      }, (t = this.chart) == null || t.setOption(e, !0);
    }
  }
}, De = () => {
  Pe((e) => ({
    e1109eaa: e.zoomedHeight,
    bf45a1f6: e.zoom
  }));
}, Re = Ce.setup;
Ce.setup = Re ? (e, t) => (De(), Re(e, t)) : De;
const ue = (e) => (Se("data-v-18088c79"), e = e(), ke(), e), zt = { class: "x-chart" }, Wt = {
  class: "chart",
  ref: "el"
}, Ht = /* @__PURE__ */ ue(() => /* @__PURE__ */ T("span", null, "左", -1)), Jt = /* @__PURE__ */ ue(() => /* @__PURE__ */ T("span", null, "上", -1)), Kt = /* @__PURE__ */ ue(() => /* @__PURE__ */ T("span", null, "右", -1)), Yt = /* @__PURE__ */ ue(() => /* @__PURE__ */ T("span", null, "下", -1));
function Gt(e, t, s, l, n, i) {
  const o = u("pc-x-icon"), a = u("el-input-number"), r = u("el-col"), h = u("el-row"), p = u("el-checkbox"), v = u("el-tab-pane"), y = u("el-tabs"), O = u("x-form"), k = u("x-dialog"), R = ie("loading");
  return B((d(), w("div", zt, [
    T("div", Wt, null, 512),
    s.datasource ? (d(), w("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (g) => n.dialog.visible = !0)
    }, [
      C(" 配置 "),
      m(o, { name: "Setting" })
    ])) : S("", !0),
    m(k, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[12] || (t[12] = (g) => n.dialog.visible = g),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: i.handleMakeChart,
      onCancel: t[13] || (t[13] = (g) => n.dialog.visible = !1)
    }, {
      default: c(() => [
        m(O, { dialog: n.dialog }, {
          grid: c(() => [
            m(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                m(r, { span: 12 }, {
                  default: c(() => [
                    Ht,
                    m(a, {
                      modelValue: i.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => i.grid.left = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Jt,
                    m(a, {
                      modelValue: i.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (g) => i.grid.top = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Kt,
                    m(a, {
                      modelValue: i.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (g) => i.grid.right = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Yt,
                    m(a, {
                      modelValue: i.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (g) => i.grid.bottom = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          filter: c(() => [
            m(y, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[11] || (t[11] = (g) => n.filterType = g)
            }, {
              default: c(() => [
                m(v, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    m(p, {
                      modelValue: i.categories.isLimit,
                      "onUpdate:modelValue": t[5] || (t[5] = (g) => i.categories.isLimit = g)
                    }, {
                      default: c(() => [
                        C("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    B(T("div", null, [
                      C(" 记录条数 "),
                      m(a, {
                        modelValue: i.categories.limit,
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => i.categories.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: i.categories.mergeOthers,
                        "onUpdate:modelValue": t[7] || (t[7] = (g) => i.categories.mergeOthers = g)
                      }, {
                        default: c(() => [
                          C("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Oe, i.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                m(v, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    m(p, {
                      modelValue: i.series.isLimit,
                      "onUpdate:modelValue": t[8] || (t[8] = (g) => i.series.isLimit = g)
                    }, {
                      default: c(() => [
                        C("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    B(T("div", null, [
                      C(" 记录条数 "),
                      m(a, {
                        modelValue: i.series.limit,
                        "onUpdate:modelValue": t[9] || (t[9] = (g) => i.series.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: i.series.mergeOthers,
                        "onUpdate:modelValue": t[10] || (t[10] = (g) => i.series.mergeOthers = g)
                      }, {
                        default: c(() => [
                          C("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Oe, i.series.isLimit]
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
    [R, n.loading]
  ]);
}
const Qt = /* @__PURE__ */ E(Ce, [["render", Gt], ["__scopeId", "data-v-18088c79"]]), Zt = {
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
    formatOptions: K
  }
};
function es(e, t, s, l, n, i) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, b({ class: "mobile-x-checkboxs" }, i.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), w(N, null, U(i.formatOptions(s.options, this), (r) => (d(), f(o, b(i.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: c(() => [
          C(j(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const ts = /* @__PURE__ */ E(Zt, [["render", es]]), ss = {
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
    formatOptions: K
  }
};
function ns(e, t, s, l, n, i) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, b({ class: "pc-x-checkboxs" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), w(N, null, U(i.formatOptions(s.options, this), (r) => (d(), f(o, b(i.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: c(() => [
          C(j(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const is = /* @__PURE__ */ E(ss, [["render", ns]]), ls = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function os(e, t, s, l, n, i) {
  const o = u("van-col");
  return d(), f(o, b(i.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const as = /* @__PURE__ */ E(ls, [["render", os]]), rs = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function ds(e, t, s, l, n, i) {
  const o = u("el-col");
  return d(), f(o, b(i.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const cs = /* @__PURE__ */ E(rs, [["render", ds]]), us = {
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
function hs(e, t, s, l, n, i) {
  const o = u("van-dialog");
  return d(), f(o, b({ width: "92%" }, e.$attrs, {
    show: i.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => i.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: i.handleConfirm,
    onCancel: i.handleCancel
  }), te({ _: 2 }, [
    e.$slots.title ? {
      name: "title",
      fn: c(() => [
        x(e.$slots, "title")
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: c(() => [
        x(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: c(() => [
        x(e.$slots, "default")
      ]),
      key: "2"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const ms = /* @__PURE__ */ E(us, [["render", hs]]), ps = {
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
}, fs = {
  key: 1,
  class: "el-dialog__title"
};
function gs(e, t, s, l, n, i) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(se(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: c(() => [
      e.$slots.header ? x(e.$slots, "header", { key: 0 }) : (d(), w("span", fs, j(e.$attrs.title), 1)),
      s.drawer ? S("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? x(e.$slots, "footer", { key: 0 }) : S("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          C(j(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : S("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          C(j(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : S("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? x(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const bs = /* @__PURE__ */ E(ps, [["render", gs]]), J = {}, Q = {
  provinces: [],
  cities: [],
  counties: []
}, _s = {
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
      provinces: Object.freeze(Q.provinces),
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
      this.cities = Object.freeze(Q.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(Q.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(J, this.areaList), Q.provinces = Object.entries(J.province_list).map((e) => ({ value: e[0], text: e[1] })), Q.cities = Object.entries(J.city_list).map((e) => ({ value: e[0], text: e[1] })), Q.counties = Object.entries(J.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(Q.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const l = Object.entries(J.province_list).find((n) => n[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(J.city_list).find((n) => n[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const l = Object.entries(J.county_list).find((n) => n[1] === s);
        this.county = l == null ? void 0 : l[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && J.province_list[this.province] || "",
        this.number > 1 && this.city && J.city_list[this.city] || "",
        this.number > 2 && this.county && J.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function ys(e, t, s, l, n, i) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      m(a, { span: i.span }, {
        default: c(() => [
          m(o, {
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
        default: c(() => [
          m(o, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => n.city = h),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : S("", !0),
      i.number > 2 ? (d(), f(a, {
        key: 1,
        span: i.span
      }, {
        default: c(() => [
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
const vs = /* @__PURE__ */ E(_s, [["render", ys]]);
function ws() {
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
function Ss() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function ks() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function $s() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return Ge(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function Cs() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function xs(e) {
  var l;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
}
function Vs(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function Es(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const ne = {
  props: ws,
  computed: {
    _model: Ss,
    _items: ks,
    _visibleItems: $s,
    _rules: Cs
  },
  methods: {
    calcPlaceholder: xs,
    calcStyle: Vs,
    formatModelValue: Es
  }
}, As = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...ne.props(),
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
    ...ne.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...ne.methods
  }
};
function Os(e, t, s, l, n, i) {
  const o = u("mobile-x-form-item"), a = u("van-cell-group"), r = u("van-form");
  return d(), f(r, {
    ref: "formRef",
    class: Y(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : S("", !0),
      m(a, de(Le(e.$attrs)), {
        default: c(() => [
          (d(!0), w(N, null, U(e._visibleItems, (h, p) => (d(), f(o, b(h, {
            rules: e._rules[h.prop] || h.rules,
            key: p,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (v) => e._model[h.prop] = v,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: c(() => [
              h.slot ? x(e.$slots, h.slot, de(b({ key: 0 }, h))) : S("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? x(e.$slots, "default", { key: 1 }) : S("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const Ts = /* @__PURE__ */ E(As, [["render", Os]]), Fs = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...ne.props(),
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
    ...ne.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...ne.methods
  }
}, js = { key: 1 };
function Ds(e, t, s, l, n, i) {
  const o = u("pc-x-form-item"), a = u("el-form"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: Y((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      m(r, {
        name: n.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", js, j(s.title), 1))
        ]),
        default: c(() => [
          m(a, b({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs.labelPosition || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: c(() => [
              e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : S("", !0),
              (d(!0), w(N, null, U(e._visibleItems, (p, v) => (d(), f(o, b({
                "label-width": s.labelWidth,
                "show-tooltip": e.$attrs.showTooltip || !1
              }, p, {
                key: v,
                modelValue: e._model[p.prop],
                "onUpdate:modelValue": [(y) => e._model[p.prop] = y, (y) => p.onChange || null],
                prop: p.prop || p.model,
                clearable: p.clearable !== !1,
                placeholder: e.calcPlaceholder(p),
                style: e.calcStyle(p)
              }), {
                default: c(() => [
                  p.slot ? x(e.$slots, p.slot, { key: 0 }) : S("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
              e.$slots.default ? x(e.$slots, "default", { key: 1 }) : S("", !0)
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
const Rs = /* @__PURE__ */ E(Fs, [["render", Ds]]);
function Bs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !qe(e);
}
const ye = (e) => {
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
    "onUpdate:modelValue": (v) => n("update:modelValue", v)
  }, p = [];
  return o === "html" ? h.class = "comp-html" : i = u(i), a && (h.innerHTML = a), r && p.push(r), G(i, h, {
    default: () => p
  });
}, Ns = (e) => {
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
    h = m(u("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Bs(p = ye(e)) ? p : {
      default: () => [p]
    });
  } else
    h = ye(e);
  return G(u("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [h],
    label: () => G("span", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
        display: "inline-block"
      }
    }, [s.label])
  });
}, Is = (e) => {
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
    "onUpdate:modelValue": (v) => n("update:modelValue", v)
  };
  return a && s.label || r ? G(u("van-field"), p, {
    input: () => a && s.label ? i.default() : ye(e)
  }) : (Object.assign(p, l), G(u("van-field"), p));
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
    return Is(this);
  }
};
const xe = {
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
        style: v,
        html: y,
        class: O,
        ...k
      } = { ...this.$props, ...this.$attrs };
      return k;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Ns(this);
  }
}, Be = () => {
  Pe((e) => ({
    ba9709f0: e.width
  }));
}, Ne = xe.setup;
xe.setup = Ne ? (e, t) => (Be(), Ne(e, t)) : Be;
const Us = /* @__PURE__ */ E(xe, [["__scopeId", "data-v-d2cde1e2"]]), Ie = /* @__PURE__ */ Object.assign({}), Ps = {
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
      await Promise.all(Object.keys(Ie).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Ie[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Ls = ["src"];
function qs(e, t, s, l, n, i) {
  const o = u("van-icon");
  return n.icons[s.name] ? (d(), w("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Ls)) : (d(), f(o, b({ key: 1 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Xs = /* @__PURE__ */ E(Ps, [["render", qs]]), Me = /* @__PURE__ */ Object.assign({}), zs = {
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
}, Ws = ["src"];
function Hs(e, t, s, l, n, i) {
  const o = u("el-icon");
  return n.icons[s.name] ? (d(), w("img", {
    key: 0,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Ws)) : (d(), f(o, de(b({ key: 1 }, e.$attrs)), {
    default: c(() => [
      (d(), f(se(s.name)))
    ]),
    _: 1
  }, 16));
}
const Js = /* @__PURE__ */ E(zs, [["render", Hs]]), { highdict: Ks } = StardustJs, { storage: Ys } = StardustBrowser, { local: st } = Ys, Ve = ["index", "selection", "expand", "radio", "_index"];
function Gs() {
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
function Qs() {
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
function Zs() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = { ...this.$attrs };
  return t in this && Object.assign(s, this[t]), s;
}
function en() {
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
function tn() {
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
function sn() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function nn() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function ln() {
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
function on() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function an() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function rn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function dn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function cn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function un() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function hn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function mn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function pn() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function fn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function gn() {
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
function bn() {
  const e = this._columns.filter((s) => s.type && Ve.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const l = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...l,
      width: s.width || l.width
    };
  });
  return e.concat(t);
}
function _n() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function yn() {
  return this.table.hideOperates || this.$attrs["hide-operates"] !== void 0 && this.$attrs["hide-operates"] !== !1;
}
function vn() {
  return this.table.hideChart || this.$attrs["hide-chart"] !== void 0 && this.$attrs["hide-chart"] !== !1;
}
function wn() {
  return this.$attrs["operates-dropdown"] !== void 0 && this.$attrs["operates-dropdown"] !== !1;
}
function Sn() {
  return this._columns.filter((e) => !e.type || !Ve.includes(e.type));
}
function kn() {
  return this.table.searcherConfig ?? this.$attrs["searcher-config"] ?? {};
}
function $n() {
  const e = this._uid && st.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Ve.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: n, hide: i, width: o } = t;
    return { prop: s, label: l, show: n, hide: i, width: o };
  })), this.settings = e;
}
function Cn(e) {
  st.setJson(`Settings[${this._uid}]`, e);
}
function xn(e, t) {
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
      return typeof n == "function" ? n(i, e, t) : Ks.get(e, n);
  }
  return i;
}
function Vn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function En(e) {
  this.params = e, this._emit("search", e);
}
function An(e) {
  this.saveSettings(e), this.initSettings();
}
function On(e, t, s, l) {
  const n = this.settings.columns.find((i) => i.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
}
function Tn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Fn(e) {
  var t, s, l, n;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((n = (l = this.controller) == null ? void 0 : l.handleSortChange) == null || n.call(l, e));
}
function jn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function Dn(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function Rn() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function Bn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Nn(e) {
  var l;
  let t = this.$attrs["cell-class-name"] ? this.$attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function In(e) {
  var l;
  const t = this.$attrs["cell-style"] ? this.$attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function Mn(e, t) {
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
function Un(e, t) {
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
function Pn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Ln(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function qn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Xn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function zn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function Wn(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function Hn(e, t) {
  var l;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((l = t.previewSrcList) == null ? void 0 : l.call(t)) || [s];
}
function Jn(e, t) {
  const s = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Kn() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const L = {
  props: Gs,
  emits: Qs,
  computed: {
    _attrs: Zs,
    domids: en,
    elTableAttrs: tn,
    _loading: sn,
    _data: nn,
    _columns: ln,
    _query: on,
    _total: an,
    _selection: rn,
    _chartOption: dn,
    _onSearch: cn,
    _onAdd: un,
    _onExport: hn,
    _onSearchExport: mn,
    _onImport: pn,
    _onMultiDelete: fn,
    _listen: gn,
    _visibleColumns: bn,
    _uid: _n,
    hideOperates: yn,
    hideChart: vn,
    operatesDropdown: wn,
    searcherColumns: Sn,
    searcherConfig: kn
  },
  watch: {
    $route: Kn
  },
  methods: {
    initSettings: $n,
    saveSettings: Cn,
    calcValue: xn,
    calcOverflowTooltip: Vn,
    handleSearch: En,
    handleResetSettings: An,
    handleHeaderDragend: On,
    handleSelectionChange: Tn,
    handleSortChange: Fn,
    handleCheckedChange: jn,
    handleCollapseChange: Dn,
    handleMinus: Rn,
    handleToggleFullscreen: Bn,
    cellClassName: Nn,
    cellStyle: In,
    calcTagType: Mn,
    calcTagValue: Un,
    canEdit: Pn,
    canSave: Ln,
    canRowEdit: qn,
    canCancelEdit: Xn,
    canDelete: zn,
    _imageSrc: Wn,
    _imagePreviewSrcList: Hn,
    _emit: Jn
  }
};
const Yn = {
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
}, Gn = { key: 0 }, Qn = { key: 1 };
function Zn(e, t, s, l, n, i) {
  const o = u("el-descriptions-item"), a = u("el-descriptions"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: Y(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), w(N, null, U(i.blocks, (p, v) => (d(), f(r, {
        key: v,
        title: v,
        name: v
      }, {
        default: c(() => [
          m(a, {
            column: s.column,
            border: s.border
          }, {
            default: c(() => [
              (d(!0), w(N, null, U(p, (y) => (d(), f(o, b({
                key: y.prop
              }, y), te({
                default: c(() => [
                  y.slot ? (d(), w("span", Gn, [
                    x(e.$slots, y.slot, de(Le({ data: s.data, field: y, value: i.calcValue(s.data, y) })), void 0, !0)
                  ])) : (d(), w("span", Qn, j(i.calcValue(s.data, y)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: c(() => [
                    x(e.$slots, "label", {
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
const ei = /* @__PURE__ */ E(Yn, [["render", Zn], ["__scopeId", "data-v-0c3b67a5"]]), ti = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, si = { key: 1 };
function ni(e, t, s, l, n, i) {
  return d(), w("div", null, [
    (d(!0), w(N, null, U(s.items, (o, a) => (d(), f(se(s.compName), b({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? x(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), w("span", si, j(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const ii = /* @__PURE__ */ E(ti, [["render", ni]]), li = {
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
function oi(e, t, s, l, n, i) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), h = u("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      m(o, { span: 6 }, {
        default: c(() => [
          T("span", null, "总计: " + j(s.total), 1)
        ]),
        _: 1
      }),
      m(o, { span: 18 }, {
        default: c(() => [
          m(r, b({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (p) => s.query.page = p),
            "page-count": i.pageCount
          }), {
            "prev-text": c(() => [
              m(a, { name: "arrow-left" }),
              C(" 上一页 ")
            ]),
            "next-text": c(() => [
              C(" 下一页 "),
              m(a, { name: "arrow" })
            ]),
            page: c(({ text: p }) => [
              C(j(p), 1)
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
const ai = /* @__PURE__ */ E(li, [["render", oi]]), ri = {
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
function di(e, t, s, l, n, i) {
  const o = u("el-pagination");
  return d(), f(o, b({
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
const ci = /* @__PURE__ */ E(ri, [["render", di]]), ui = {
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
function hi(e, t, s, l, n, i) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), w(N, null, [
    T("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: Y(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, j(s.modelValue || s.placeholder), 3),
    m(a, b({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: c(() => [
        m(o, b(e.$attrs, {
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
const mi = /* @__PURE__ */ E(ui, [["render", hi]]), pi = {
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
    formatOptions: K
  }
};
function fi(e, t, s, l, n, i) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, b({ class: "mobile-x-radios" }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), w(N, null, U(i.formatOptions(s.options, this), (r) => (d(), f(o, b(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: c(() => [
          C(j(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["direction"]);
}
const gi = /* @__PURE__ */ E(pi, [["render", fi]]), bi = {
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
    formatOptions: K
  }
};
function _i(e, t, s, l, n, i) {
  const o = u("el-radio-group");
  return d(), f(o, b({ class: "pc-x-radios" }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), w(N, null, U(i.formatOptions(s.options, this), (a) => (d(), f(se(s.button ? "el-radio-button" : "el-radio"), b(i.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: c(() => [
          C(j(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["modelValue"]);
}
const yi = /* @__PURE__ */ E(bi, [["render", _i]]), vi = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, wi = { key: 1 };
function Si(e, t, s, l, n, i) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), w(N, null, U(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", wi, j(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const ki = /* @__PURE__ */ E(vi, [["render", Si]]), $i = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Ci = { key: 1 };
function xi(e, t, s, l, n, i) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), w(N, null, U(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", Ci, j(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const Vi = /* @__PURE__ */ E($i, [["render", xi]]), Ei = {
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
function Ai(e, t, s, l, n, i) {
  const o = u("van-icon"), a = u("van-field");
  return d(), f(a, b({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    "right-icon": c(() => [
      m(o, {
        name: "scan",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const Oi = /* @__PURE__ */ E(Ei, [["render", Ai]]), Ti = {
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
function Fi(e, t, s, l, n, i) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, b(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    append: c(() => [
      m(o, {
        icon: "CameraFilled",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const ji = /* @__PURE__ */ E(Ti, [["render", Fi]]), nt = async (e, t, s) => {
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, i])], a.limit = a.limit || 20, l && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${l}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, Di = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], Ri = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", Bi = {
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
        this._options = K(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: K,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      nt(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Ni(e, t, s, l, n, i) {
  const o = u("x-picker");
  return d(), w("div", {
    onClick: t[5] || (t[5] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(o, b(e.$attrs, {
      modelValue: i.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: n.visible,
      columns: n._options,
      onClick: t[1] || (t[1] = Z(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => n.visible = !0),
      onCancel: t[3] || (t[3] = (a) => n.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => n.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const Ii = /* @__PURE__ */ E(Bi, [["render", Ni]]);
const Mi = {
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
        this._options = K(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: K,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      nt(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return Di(e, this);
    },
    calcRemarkLabel(e) {
      return Ri(e, this);
    }
  }
}, Ui = { key: 1 }, Pi = { class: "main" }, Li = { class: "remark" };
function qi(e, t, s, l, n, i) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, b({
    class: "pc-x-select",
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || i.remoteSearch
  }), {
    default: c(() => [
      (d(!0), w(N, null, U(n._options, (r) => (d(), f(o, b(e.$attrs, {
        key: r[s.text],
        label: r[s.text],
        value: r[s.value]
      }), {
        default: c(() => [
          e.$slots.custom ? x(e.$slots, "custom", {
            key: 0,
            option: r,
            text: s.text,
            value: s.value
          }, void 0, !0) : (d(), w("span", Ui, [
            T("span", Pi, j(i.calcMainLabel(r)), 1),
            T("span", Li, j(i.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["loading", "filterable", "remote-method"]);
}
const Xi = /* @__PURE__ */ E(Mi, [["render", qi], ["__scopeId", "data-v-a37eab84"]]), Ue = {
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
}, zi = [{
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
}], X = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  XRadios: ["eq", "ne", "special"],
  XCheckboxs: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"]
};
X["x-select"] = X.XSelect;
X["x-radios"] = X.XRadios;
X["x-checkboxs"] = X.XCheckboxs;
X["el-date-picker"] = X.ElDatePicker;
X["el-input-number"] = X.ElInputNumber;
X["el-input"] = X.ElInput;
function Wi() {
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
    handleSelectOp: v
  } = this;
  return m(u("x-dialog"), b({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": "查询"
  }, {
    modelValue: l,
    "onUpdate:modelValue": (y) => this.visible = y,
    onCancel: a,
    onSubmit: o
  }), {
    default: () => [t.traditional ? null : m(u("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: r
    }, {
      default: () => [C("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [n.map((y, O) => m("div", {
      class: "condition flex-center",
      key: y.no
    }, [t.traditional ? null : m(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(O)
    }, {
      default: () => [C("X")]
    }), t.traditional ? null : m("span", {
      class: "title"
    }, [y.no]), m("div", {
      class: "expression"
    }, [t.traditional ? m(u("el-input"), {
      modelValue: y.item.label,
      readonly: !0
    }, null) : m(u("pc-x-select"), {
      modelValue: y.prop,
      onChange: (k) => p(y, k),
      options: s,
      text: "label",
      value: "prop"
    }, null), m(u("pc-x-select"), {
      modelValue: y.op,
      onChange: (k) => v(y, k),
      options: y.ops
    }, null), m("div", {
      class: "value-container"
    }, [Hi(this, y)])])]))]), t.traditional ? null : m(u("el-input"), b({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: i,
      "onUpdate:modelValue": (y) => this.expression = y
    }), null)]
  });
}
function Hi(e, t) {
  const s = (n) => G(u((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
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
    options: zi
  }) : s();
}
const { storage: fe } = StardustBrowser, { deepCopy: Ji } = StardustJs.funcs, Ki = {
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
  render: Wi,
  methods: {
    init() {
      const e = this.uid && fe.local.getJson(this.key, this.config) || this.config;
      this.initConfig(Ji(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      fe.local.setJson(this.key, {
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
        l.item = this.columns.find((a) => a.prop === n), this.handleSelectField(l, n), this.handleSelectOp(l, i), l.value = o, l.ops = X[l.component].map((a) => Ue[a]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((l) => l.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        W({ type: "warning", message: t.toString() });
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, e.page = 1, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      fe.local.remove(this.key), Object.assign(this, {
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
      e.value = "", e.prop = t, e.item = this.columns.find((V) => V.prop === e.prop);
      const { options: s, type: l, formAttrs: n = {} } = e.item, i = { ...e.item, ...n }, {
        comp: o,
        visible: a,
        canAdd: r,
        canEdit: h,
        required: p,
        slot: v,
        span: y,
        tableAttrs: O,
        formAttrs: k,
        tagTypes: R,
        tagValues: g,
        width: $,
        minWidth: F,
        disabled: q,
        readonly: z,
        ...A
      } = i;
      A.clearable ?? (A.clearable = !0), e.config = A, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = X[e.component].map((V) => Ue[V]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", A.type = "date"), A.type === "textarea" && delete A.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, Ee = /* @__PURE__ */ E(Ki, [["__scopeId", "data-v-69b3e55b"]]);
const Yi = {
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
  components: { Searcher: Ee },
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
}, Gi = { class: "mobile-x-table" }, Qi = {
  key: 1,
  class: "card"
}, Zi = ["onClick"], el = { class: "row-header flex-center" }, tl = ["value", "checked"], sl = { class: "label" }, nl = { class: "value" }, il = ["value", "checked"], ll = {
  key: 2,
  class: "index"
}, ol = { class: "title" };
function al(e, t, s, l, n, i) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("x-icon"), p = u("van-cell"), v = u("van-list"), y = u("x-pagination"), O = u("x-info"), k = u("van-popup"), R = u("van-action-sheet");
  return d(), w("div", Gi, [
    m(o, {
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
    }), te({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: c(() => [
          x(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: c(() => [
          x(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), w("div", Qi, [
      (d(!0), w(N, null, U(e._data, (g, $) => (d(), w("div", {
        key: $,
        class: "row",
        onClick: (F) => i.handleClickCard($)
      }, [
        T("div", el, [
          i.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[$],
            "onUpdate:modelValue": (F) => n.selected[$] = F,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = Z(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
          m(h, {
            name: "ellipsis",
            class: "more",
            onClick: Z((F) => i.handleShowActionSheet(g, $), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        i.hasRadio ? (d(), w("input", {
          key: 0,
          type: "radio",
          value: $,
          checked: $ === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = Z(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
        }, null, 40, tl)) : S("", !0),
        (d(!0), w(N, null, U(i.cols, (F, q) => (d(), w("div", {
          key: q,
          class: "field"
        }, [
          T("span", sl, j(F.label) + ":", 1),
          T("span", nl, j(e.calcValue(g, F)), 1)
        ]))), 128))
      ], 8, Zi))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(v, b({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (g) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), w(N, null, U(e._data, (g, $) => (d(), f(p, {
          key: $,
          "is-link": "",
          onClick: (F) => i.handleShowDetail(g, $)
        }, {
          default: c(() => [
            i.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[$],
              "onUpdate:modelValue": (F) => n.selected[$] = F,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = Z(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
            i.hasRadio ? (d(), w("input", {
              key: 1,
              type: "radio",
              value: $,
              checked: $ === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = Z(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
            }, null, 40, il)) : S("", !0),
            i.hasIndex ? (d(), w("span", ll, j($ + 1), 1)) : S("", !0),
            T("span", ol, j(i.calcTitle(g)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : S("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(y, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (g) => e._emit("search"))
    }, null, 8, ["query", "total"])) : S("", !0),
    m(k, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (g) => n.popupVisible = g),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        m(O, {
          data: n.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    m(R, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (g) => n.actionSheetVisible = g),
      actions: i.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: i.handleSelectAction,
      onCancel: t[10] || (t[10] = (g) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const rl = /* @__PURE__ */ E(Yi, [["render", al], ["__scopeId", "data-v-5d189b00"]]);
const dl = {
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
  async mounted() {
    var e;
    await ((e = window.DynamicLibs) == null ? void 0 : e.use("Sortable")), this.initDraggable();
  },
  beforeUnmount() {
    var e;
    (e = this.sortable) == null || e.destroy();
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
}, cl = (e) => (Se("data-v-038a7bd3"), e = e(), ke(), e), ul = {
  class: "table",
  ref: "colsTable"
}, hl = ["data-prop"], ml = ["title", "onClick"], pl = /* @__PURE__ */ cl(() => /* @__PURE__ */ T("span", { class: "unit" }, "px", -1)), fl = {
  class: "table",
  ref: "sortsTable"
}, gl = ["data-prop"];
function bl(e, t, s, l, n, i) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), h = u("ElCheckbox"), p = u("el-input-number"), v = u("el-tab-pane"), y = u("x-select"), O = u("x-radios"), k = u("el-tabs"), R = u("el-popover");
  return s.visible ? (d(), f(R, b({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: c(() => [
      m(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: c(() => [
      m(k, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => n.activeName = g)
      }, {
        default: c(() => [
          m(v, {
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              m(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: i.handleResetColumns
              }, {
                default: c(() => [
                  C("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              T("div", ul, [
                (d(!0), w(N, null, U(n.columns, (g) => (d(), w("div", {
                  key: g.prop,
                  "data-prop": g.prop,
                  class: "row flex-center"
                }, [
                  m(r, null, {
                    default: c(() => [
                      m(a)
                    ]),
                    _: 1
                  }),
                  m(h, {
                    modelValue: g.show,
                    "onUpdate:modelValue": ($) => g.show = $,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  T("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: ($) => i.handleToggle(g)
                  }, j(g.label), 9, ml),
                  m(p, {
                    modelValue: g.width,
                    "onUpdate:modelValue": ($) => g.width = $,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  pl
                ], 8, hl))), 128))
              ], 512)
            ]),
            _: 1
          }),
          m(v, {
            name: "sorts",
            label: "多列排序"
          }, {
            default: c(() => [
              m(o, {
                type: "primary",
                plain: "",
                icon: "Plus",
                onClick: i.handleAddSort
              }, {
                default: c(() => [
                  C("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              T("div", fl, [
                (d(!0), w(N, null, U(n.sorts, (g, $) => (d(), w("div", {
                  key: g[0],
                  "data-prop": g[0],
                  class: "row flex-center"
                }, [
                  m(y, {
                    modelValue: g[0],
                    "onUpdate:modelValue": (F) => g[0] = F,
                    options: n.columns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(O, {
                    modelValue: g[1],
                    "onUpdate:modelValue": (F) => g[1] = F,
                    options: n.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (F) => n.sorts.splice($, 1)
                  }, null, 8, ["onClick"])
                ], 8, gl))), 128))
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
const it = /* @__PURE__ */ E(dl, [["render", bl], ["__scopeId", "data-v-038a7bd3"]]);
const { highdict: _l } = StardustJs, yl = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...L.props()
  },
  emits: [
    ...L.emits()
  ],
  components: { Searcher: Ee, Settings: it },
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
        ...ce()
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
      this.dialog.visible = !0, await this.$nextTick(), this.table && (this.table.chartRef = this.$refs.chartRef), await this.$refs.chartRef.init(), this.$refs.chartRef.initDatasource();
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
        let i = _l.get(n, this.controller.listProp);
        return i = this.controller.formatList(this.controller._defaultFormatList(i, n), n), i;
      }
      return this._data;
    }
  }
}, vl = {
  key: 1,
  class: "collapse-title"
}, wl = {
  key: 2,
  class: "collapse-title"
}, Sl = /* @__PURE__ */ T("span", null, "-", -1), kl = ["value", "checked"], $l = { key: 1 };
function Cl(e, t, s, l, n, i) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), p = u("el-image"), v = u("el-tag"), y = u("el-icon"), O = u("el-table-column"), k = u("el-button"), R = u("el-dropdown-item"), g = u("el-dropdown-menu"), $ = u("el-dropdown"), F = u("el-table"), q = u("x-pagination"), z = u("el-collapse-item"), A = u("el-collapse"), V = u("x-chart"), D = u("x-dialog"), I = ie("domid"), M = ie("loading");
  return d(), w(N, null, [
    T("div", {
      class: Y(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      m(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      m(A, {
        modelValue: n.activeNames,
        "onUpdate:modelValue": t[5] || (t[5] = (_) => n.activeNames = _),
        class: Y((n._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          m(z, {
            name: n.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), w("span", vl, j(e.title), 1)) : (d(), w("span", wl, [
                C(j(e.title) + "，当前第 ", 1),
                T("span", null, j(e._query.page), 1),
                C(" 页，展示 "),
                T("span", null, j(e._data.length), 1),
                C(" 条数据， 共 "),
                T("span", null, j(e._total || e._data.length), 1),
                C(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, b({ key: 0 }, e._attrs, {
                domids: e.domids,
                onAdd: e._onAdd,
                onSearch: e._onSearch,
                onExport: e._onExport,
                onSearchExport: e._onSearchExport,
                onImport: e._onImport,
                onMultiDelete: e._onMultiDelete
              }), te({
                "tools-end": c(() => [
                  e.hideChart ? S("", !0) : (d(), f(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: i.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  T("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (..._) => e.handleMinus && e.handleMinus(..._))
                  }, [
                    m(a, { name: "FullScreen" }),
                    Sl
                  ]),
                  m(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  m(r, {
                    modelValue: n.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (_) => n.settings = _),
                    visible: !e.hideSettings,
                    width: e._attrs["cols-popover-width"] || 500,
                    onSort: t[2] || (t[2] = (_) => e.$emit("sort", _)),
                    onReset: e.handleResetSettings,
                    onSortChange: e.handleSortChange
                  }, null, 8, ["modelValue", "visible", "width", "onReset", "onSortChange"])
                ]),
                _: 2
              }, [
                e.$slots["tools-prefix"] ? {
                  name: "tools-prefix",
                  fn: c(() => [
                    x(e.$slots, "tools-prefix")
                  ]),
                  key: "0"
                } : void 0,
                e.$slots["tools-suffix"] ? {
                  name: "tools-suffix",
                  fn: c(() => [
                    x(e.$slots, "tools-suffix")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
              B((d(), f(F, b({ ref: "tableRef" }, e.elTableAttrs, {
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), w(N, null, U(e._visibleColumns, (_, H) => (d(), f(O, b(_, {
                    key: H,
                    "min-width": _.minWidth,
                    align: _.align || e._attrs.tableAlign || "center",
                    resizable: _.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(_)
                  }), te({ _: 2 }, [
                    ["selection", "index"].includes(_.type) ? void 0 : {
                      name: "default",
                      fn: c((P) => [
                        _.type === "radio" ? (d(), w("input", {
                          key: 0,
                          type: "radio",
                          value: P.$index,
                          checked: P.$index === n.checked,
                          onChange: t[3] || (t[3] = (...me) => e.handleCheckedChange && e.handleCheckedChange(...me))
                        }, null, 40, kl)) : _.slot === "$image" ? (d(), f(p, b({
                          key: 1,
                          src: e._imageSrc(P, _),
                          "preview-src-list": e._imagePreviewSrcList(P, _),
                          "preview-teleported": ""
                        }, _.imageAttrs), null, 16, ["src", "preview-src-list"])) : _.slot === "$tag" ? (d(), f(v, {
                          key: 2,
                          type: e.calcTagType(P, _)
                        }, {
                          default: c(() => [
                            C(j(e.calcTagValue(P, _)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : _.slot === "$icon" ? (d(), f(y, {
                          key: 3,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(se(P.row[_.prop])))
                          ]),
                          _: 2
                        }, 1024)) : _.slot ? x(e.$slots, _.slot, {
                          key: 4,
                          scope: P,
                          column: _,
                          value: P.row[_.prop]
                        }) : e.slotAll ? x(e.$slots, "all", {
                          key: 5,
                          scope: P,
                          column: _,
                          value: P.row[_.prop]
                        }) : (d(), w(N, { key: 6 }, [
                          _.comp === "ElSwitch" || e.table.isRowEdit && P.row.isEditing && (_.visible !== !1 || _.canEdit) ? (d(), f(se(_.comp || "ElInput"), b({ key: 0 }, { ..._, ..._.formAttrs }, {
                            modelValue: P.row[_.prop],
                            "onUpdate:modelValue": (me) => P.row[_.prop] = me,
                            disabled: !P.row.editable || !P.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), w("span", $l, j(e.calcValue(P.row, _)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? S("", !0) : (d(), f(O, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed || "right"
                  }, {
                    default: c((_) => [
                      x(e.$slots, "operates-prefix", { scope: _ }),
                      e.operatesDropdown ? (d(), f($, { key: 0 }, {
                        dropdown: c(() => [
                          m(g, null, {
                            default: c(() => [
                              e.canEdit(_.row) ? (d(), f(R, { key: 0 }, {
                                default: c(() => [
                                  B((d(), f(k, b({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    onClick: (H) => e._emit("edit", _)
                                  }), {
                                    default: c(() => [
                                      C(" 编辑 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [I, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : S("", !0),
                              e.canSave(_.row) ? (d(), f(R, { key: 1 }, {
                                default: c(() => [
                                  B((d(), f(k, b({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: _.row._loading,
                                    icon: "collection",
                                    onClick: (H) => e._emit("row-edit", _)
                                  }), {
                                    default: c(() => [
                                      C(" 保存 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [M, _.row._loading],
                                    [I, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : S("", !0),
                              e.canCancelEdit(_.row) ? (d(), f(R, { key: 2 }, {
                                default: c(() => [
                                  B((d(), f(k, b({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    onClick: (H) => e._emit("cancel-edit", _)
                                  }), {
                                    default: c(() => [
                                      C(" 取消编辑 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [I, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : S("", !0),
                              e.canDelete(_.row) ? (d(), f(R, { key: 3 }, {
                                default: c(() => [
                                  B((d(), f(k, b({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    onClick: (H) => e._emit("delete", _)
                                  }), {
                                    default: c(() => [
                                      C(" 删除 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [I, e.domids.delete]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : S("", !0)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: c(() => [
                          m(k, b({ type: "primary", ...e._attrs["operates-btn"] }, { icon: "arrow-down" }), {
                            default: c(() => [
                              C(" 操作 ")
                            ]),
                            _: 1
                          }, 16)
                        ]),
                        _: 2
                      }, 1024)) : S("", !0),
                      !e.operatesDropdown && e.canEdit(_.row) ? B((d(), f(k, b({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        onClick: (H) => e._emit("edit", _)
                      }), {
                        default: c(() => [
                          C(" 编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [I, e.domids.edit]
                      ]) : S("", !0),
                      !e.operatesDropdown && e.canSave(_.row) ? B((d(), f(k, b({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: _.row._loading,
                        icon: "collection",
                        onClick: (H) => e._emit("row-edit", _)
                      }), {
                        default: c(() => [
                          C(" 保存 ")
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [M, _.row._loading],
                        [I, e.domids["row-edit"]]
                      ]) : S("", !0),
                      !e.operatesDropdown && e.canCancelEdit(_.row) ? B((d(), f(k, b({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        onClick: (H) => e._emit("cancel-edit", _)
                      }), {
                        default: c(() => [
                          C(" 取消编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [I, e.domids["cancel-edit"]]
                      ]) : S("", !0),
                      !e.operatesDropdown && e.canDelete(_.row) ? B((d(), f(k, b({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        onClick: (H) => e._emit("delete", _)
                      }), {
                        default: c(() => [
                          C(" 删除 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [I, e.domids.delete]
                      ]) : S("", !0),
                      x(e.$slots, "operates-suffix", { scope: _ })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [M, e._loading]
              ]),
              e._query && e._total ? (d(), f(q, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: t[4] || (t[4] = (_) => e._emit("search", n.params))
              }, null, 8, ["query", "total"])) : S("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? S("", !0) : (d(), f(D, {
      key: 0,
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[6] || (t[6] = (_) => n.dialog.visible = _),
      title: "图表",
      width: "96%",
      onFullscreenchange: i.handleChartDialogFullscreen
    }, {
      default: c(() => [
        m(V, {
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
const xl = /* @__PURE__ */ E(yl, [["render", Cl]]);
const Vl = {
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
}, El = { class: "mobile-x-table-tools" }, Al = { key: 0 }, Ol = { class: "tools" }, Tl = { class: "tools-end" };
function Fl(e, t, s, l, n, i) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), h = ie("domid");
  return d(), w("div", El, [
    e.$attrs.onAdd ? B((d(), w("div", Al, [
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
    T("div", Ol, [
      x(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? B((d(), f(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (p) => e.$emit("search"))
      }), {
        default: c(() => [
          m(a, { name: "search" }),
          C(" 查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : S("", !0),
      e.$attrs.onMultiEdit ? B((d(), f(r, b({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        onClick: t[2] || (t[2] = (p) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          m(a, { name: "edit" }),
          C(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : S("", !0),
      e.$attrs.onMultiDelete ? B((d(), f(r, b({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        onClick: t[3] || (t[3] = (p) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          m(a, { name: "DeleteFilled" }),
          C(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : S("", !0),
      e.$attrs.onExport ? B((d(), f(r, b({ key: 3 }, { type: "success", ...s.exportBtn }, {
        onClick: t[4] || (t[4] = (p) => e.$emit("export"))
      }), {
        default: c(() => [
          m(a, { name: "printer" }),
          C(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : S("", !0),
      e.$attrs.onSearchExport ? B((d(), f(r, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
        onClick: t[5] || (t[5] = (p) => e.$emit("search-export"))
      }), {
        default: c(() => [
          m(a, { name: "printer" }),
          C(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : S("", !0),
      e.$attrs.onImport ? B((d(), f(r, b({ key: 5 }, { type: "warning", ...s.importBtn }, {
        onClick: t[6] || (t[6] = (p) => e.$emit("import"))
      }), {
        default: c(() => [
          m(a, { name: "UploadFilled" }),
          C(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : S("", !0),
      x(e.$slots, "tools-suffix", {}, void 0, !0),
      T("div", Tl, [
        x(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const jl = /* @__PURE__ */ E(Vl, [["render", Fl], ["__scopeId", "data-v-6ef6b95e"]]);
const Dl = {
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
}, Rl = { class: "tools" }, Bl = { class: "tools-end flex-center" };
function Nl(e, t, s, l, n, i) {
  const o = u("el-button"), a = u("el-card"), r = ie("domid");
  return d(), f(a, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      T("div", Rl, [
        x(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? B((d(), f(o, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          onClick: t[0] || (t[0] = (h) => e.$emit("search"))
        }), {
          default: c(() => [
            C(" 查询 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.search]
        ]) : S("", !0),
        e.$attrs.onAdd ? B((d(), f(o, b({ key: 1 }, { type: "primary", ...s.addBtn }, {
          icon: "circle-plus-filled",
          onClick: t[1] || (t[1] = (h) => e.$emit("add"))
        }), {
          default: c(() => [
            C(" 新增 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.add]
        ]) : S("", !0),
        e.$attrs.onMultiEdit ? B((d(), f(o, b({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
          icon: "edit",
          onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            C(" 编辑 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids["multi-edit"]]
        ]) : S("", !0),
        e.$attrs.onMultiDelete ? B((d(), f(o, b({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
          icon: "DeleteFilled",
          onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            C(" 批量删除 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids["multi-delete"]]
        ]) : S("", !0),
        e.$attrs.onExport ? B((d(), f(o, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          onClick: t[4] || (t[4] = (h) => e.$emit("export"))
        }), {
          default: c(() => [
            C(" 导出 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.export]
        ]) : S("", !0),
        e.$attrs.onSearchExport ? B((d(), f(o, b({ key: 5 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
        }), {
          default: c(() => [
            C(" 查询导出 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids["search-export"]]
        ]) : S("", !0),
        e.$attrs.onImport ? B((d(), f(o, b({ key: 6 }, { type: "warning", ...s.importBtn }, {
          icon: "UploadFilled",
          onClick: t[6] || (t[6] = (h) => e.$emit("import"))
        }), {
          default: c(() => [
            C(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.import]
        ]) : S("", !0),
        x(e.$slots, "tools-suffix", {}, void 0, !0),
        T("div", Bl, [
          x(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Il = /* @__PURE__ */ E(Dl, [["render", Nl], ["__scopeId", "data-v-368940cf"]]);
function lt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !qe(e);
}
const Ml = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, l = (n) => {
    n ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const i = n ? e._data.slice() : [];
    e.handleSelectionChange(i);
  };
  return m(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: l
  }, null);
}, Ul = (e, t) => {
  const {
    rowIndex: s,
    rowData: l
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const i = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(i);
  };
  return m(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, Pl = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, Ll = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return m("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, he = ([e, t, s, l, n, i]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return m(u("el-button"), b({
    type: l
  }, t._attrs[s + "-btn"], {
    icon: n,
    onClick: r
  }), lt(i) ? i : {
    default: () => [i]
  });
}, ql = (e, t) => {
  if (t.canEdit(e.rowData))
    return he([e, t, "edit", "warning", "edit", "编辑"]);
}, Xl = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return he([e, t, "row-edit", "success", "collection", "保存"]);
}, zl = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return he([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Wl = (e, t) => {
  if (t.canDelete(e.rowData))
    return he([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Hl = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => Ul(i, t);
  if (e.type === "index")
    return (i) => Pl(i, t);
  if (e.type === "radio")
    return (i) => Ll(i, t);
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
      const p = (y) => {
        o[a.prop] = y;
      }, v = a.comp || "ElInput";
      return G(u(v), {
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
    return h ? m(u("el-tooltip"), {
      content: r
    }, lt(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Jl = (e, t) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Ml(t)), r.cellRenderer = Hl(r, t), r;
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
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, ql(i, t), Xl(i, t), zl(i, t), Wl(i, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), n;
}, Kl = {
  convertColumnsForTableV2: Jl
};
const Yl = {
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
  components: { Searcher: Ee, Settings: it },
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
    convertColumnsForTableV2: Kl.convertColumnsForTableV2
  }
}, Gl = { key: 1 };
function Ql(e, t, s, l, n, i) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), p = u("el-table-v2"), v = u("el-auto-resizer"), y = u("x-pagination"), O = u("el-collapse-item"), k = u("el-collapse"), R = ie("loading");
  return d(), w("div", {
    class: Y(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    m(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (g) => e._emit("search", g))
    }, null, 8, ["uid", "columns", "config"]),
    m(k, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (g) => n.activeNames = g),
      class: Y((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        m(O, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", Gl, j(e.title), 1))
          ]),
          default: c(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, b({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiDelete: e._onMultiDelete
            }), te({
              "tools-end": c(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (g) => n.settings = g),
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
                  x(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  x(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
            m(v, {
              style: at({ height: s.height })
            }, {
              default: c(({ width: g, height: $ }) => [
                B((d(), f(p, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: g,
                  height: $
                }), te({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: c(() => [
                      x(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: c(() => [
                      x(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: c(() => [
                      x(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [R, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(y, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (g) => e._emit("search"))
            }, null, 8, ["query", "total"])) : S("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Zl = /* @__PURE__ */ E(Yl, [["render", Ql]]);
const ge = ["selection", "radio"], eo = {
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
      ge.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !ge.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (ge.includes(t)) {
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
}, to = { class: "x-table-viewer" };
function so(e, t, s, l, n, i) {
  const o = u("x-dialog");
  return d(), w("div", to, [
    m(o, b(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: c(() => [
        (d(), f(se(s.useTableV2 ? "x-table-v2" : "x-table"), b({
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
const no = /* @__PURE__ */ E(eo, [["render", so], ["__scopeId", "data-v-f5d31400"]]), io = {
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
}, lo = { class: "x-tinymce" }, oo = ["id", "innerHTML"];
function ao(e, t, s, l, n, i) {
  return d(), w("div", lo, [
    T("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, oo)
  ]);
}
const ro = /* @__PURE__ */ E(io, [["render", ao]]);
const co = {
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
}, Ae = (e) => (Se("data-v-fe069681"), e = e(), ke(), e), uo = { class: "mask" }, ho = {
  key: 0,
  class: "el-upload__text"
}, mo = /* @__PURE__ */ Ae(() => /* @__PURE__ */ T("em", null, "点击上传", -1)), po = /* @__PURE__ */ Ae(() => /* @__PURE__ */ T("br", null, null, -1)), fo = /* @__PURE__ */ Ae(() => /* @__PURE__ */ T("br", null, null, -1)), go = {
  key: 0,
  class: "path"
};
function bo(e, t, s, l, n, i) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), f(r, b({
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
    default: c(() => [
      T("div", uo, [
        m(o, { name: "upload-filled" }),
        n.disabled ? S("", !0) : (d(), w("div", ho, [
          C(" 将文件拖到此处，或"),
          mo,
          po,
          fo,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: Z(i.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              C(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : S("", !0)
        ]))
      ]),
      i.filepath ? (d(), w("div", go, j(s.modelValue), 1)) : S("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const _o = /* @__PURE__ */ E(co, [["render", bo], ["__scopeId", "data-v-fe069681"]]);
const yo = {
  name: "XImageUploader",
  props: {
    modelValue: Array | String,
    multiple: Boolean,
    action: String
  },
  emits: ["update:modelValue"],
  data() {
    return {
      fileList: [],
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
      return this.fileList.map((e) => e.url);
    }
  },
  watch: {
    modelValue: {
      handler(e) {
        this.fileList = Array.isArray(e) ? e : e ? [{ url: e }] : [];
      },
      immediate: !0
    }
  },
  methods: {
    handleSelect() {
      this.$emit("update:modelValue", this.fileList);
    },
    handleRemove(...e) {
      var t, s;
      this.$emit("update:modelValue", this.fileList), (s = (t = this.$attrs)["on-remove"]) == null || s.call(t, ...e);
    },
    handlePreview(e) {
      this.previewingImage = e, this.dialogVisible = !0;
    },
    handleExceed(e, t) {
      W({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, vo = ["src"];
function wo(e, t, s, l, n, i) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("el-dialog");
  return d(), w(N, null, [
    m(r, b({
      "file-list": n.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (p) => n.fileList = p),
        i.handleSelect
      ],
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: i.limit,
      class: ["x-image-uploader", { disabled: e.$attrs.disabled || i.images.length >= i.limit }],
      "on-preview": i.handlePreview,
      "on-exceed": i.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1,
      "on-remove": i.handleRemove
    }), {
      default: c(() => [
        m(a, null, {
          default: c(() => [
            m(o)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "onUpdate:fileList", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload", "on-remove"]),
    m(h, {
      modelValue: n.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (p) => n.dialogVisible = p),
      title: "预览图片" + n.previewingImage.name
    }, {
      default: c(() => [
        T("img", {
          src: n.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, vo)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const So = /* @__PURE__ */ E(yo, [["render", wo], ["__scopeId", "data-v-e7280895"]]), be = {
  xactionsheet: Tt,
  xautorows: Bt,
  mobilexbutton: Mt,
  pcxbutton: Lt,
  xchart: Qt,
  mobilexcheckboxs: ts,
  pcxcheckboxs: is,
  mobilexcol: as,
  pcxcol: cs,
  mobilexdialog: ms,
  pcxdialog: bs,
  xdistrictselect: vs,
  mobilexform: Ts,
  pcxform: Rs,
  mobilexformitem: Ms,
  pcxformitem: Us,
  mobilexicon: Xs,
  pcxicon: Js,
  xinfo: ei,
  xlooper: ii,
  mobilexpagination: ai,
  pcxpagination: ci,
  xpicker: mi,
  mobilexradios: gi,
  pcxradios: yi,
  mobilexrow: ki,
  pcxrow: Vi,
  mobilexscan: Oi,
  pcxscan: ji,
  mobilexselect: Ii,
  pcxselect: Xi,
  mobilextable: rl,
  pcxtable: xl,
  mobilextabletools: jl,
  pcxtabletools: Il,
  xtablev2: Zl,
  xtableviewer: no,
  xtinymce: ro,
  xfileuploader: _o,
  ximageuploader: So
}, oe = {};
for (let e in be)
  oe[be[e].name] = be[e];
const ko = (e) => ({
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
    return G(oe[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), ve = (() => {
  const e = Object.keys(oe), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = oe[l]);
  for (const l of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(l.toLowerCase())) ? s[l] = ko(l) : s[l] = oe[l];
  return s;
})(), $o = (e, t) => {
  for (let s in ve)
    e.component(s, ve[s]);
}, xo = {
  version: "1.0.200",
  ...ve,
  ...Ze,
  ...Et,
  install: $o
};
export {
  et as BaseController,
  ee as Confirm,
  tt as CrudController,
  W as Message,
  re as Notify,
  Vt as TempCrudController,
  ce as baseDialog,
  ze as baseForm,
  kt as baseModel,
  We as baseTable,
  Et as controllers,
  xo as default,
  ct as effects,
  K as formatOptions,
  ut as formatPrecision,
  Ye as initDefaultForm,
  Je as initDialog,
  $t as initFields,
  $e as initForm,
  Ke as initFormRules,
  Ct as initModel,
  He as initTable,
  Ge as isWhenMatched,
  Qe as triggers,
  Ze as utils,
  Xe as validateForm
};
