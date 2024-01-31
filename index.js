import { toRaw as at, nextTick as oe, watch as Se, resolveComponent as u, openBlock as d, createBlock as f, mergeProps as b, createElementBlock as _, Fragment as I, renderList as M, withCtx as c, renderSlot as x, toDisplayString as D, useCssVars as Ue, resolveDirective as ee, withDirectives as B, createElementVNode as F, createTextVNode as $, createVNode as m, createCommentVNode as S, vShow as De, pushScopeId as ke, popScopeId as Ce, createSlots as se, resolveDynamicComponent as ne, normalizeClass as K, normalizeProps as ce, guardReactiveProps as qe, h as G, isVNode as Xe, withModifiers as Z, normalizeStyle as rt } from "vue";
const dt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const i = e.getContext("2d");
  class l {
    constructor(V, j, L, N, le, v, H) {
      this.x = V, this.y = j, this.radius = L, this.color = N, this.vx = le, this.vy = v, this.ctx = H;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const n = () => i.clearRect(0, 0, t, s), o = (A) => Math.floor(Math.random() * A);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const A = i.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = O * 30), a >= 1 && (a = 1, r = -r, h = O * 30)), A.addColorStop(0, "rgba(250, 220, 20, 0.5)"), A.addColorStop(a, "rgba(20, 20, 20, 0.5)"), i.fillStyle = A, i.fillRect(0, 0, t, s);
  }, w = Math.floor(t / 100), y = Math.floor(s / 100), O = 20, k = Math.round(1e3 / O), R = Array.from({ length: 52 }).map(() => {
    const A = Math.floor(o(w + y) * 1.5 + o(5));
    let V = o(t), j = o(s);
    V = Math.min(Math.max(A, V), t - A), j = Math.min(Math.max(A, j), s - A);
    let L = o(2) ? (o(2) + 2) * w : (o(-1) - 2) * w, N = o(2) ? (o(2) + 2) * y : (o(-1) - 2) * y;
    return L = Math.floor(L / O), N = Math.floor(N / O), new l(
      V,
      j,
      A,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      L,
      N,
      i
    );
  });
  let g, C;
  e.addEventListener("mouseover", (A) => {
    g = A.pageX, C = A.pageY;
  }), e.addEventListener("mousemove", (A) => {
    if (g === void 0) {
      g = A.pageX, C = A.pageY;
      return;
    }
    const V = A.pageX - g, j = A.pageY - C;
    R.forEach((L) => {
      L.x += V / O, L.y += j / O;
    }), g = A.pageX, C = A.pageY;
  });
  let T = Date.now(), q = null;
  const z = () => {
    Date.now() - T >= k && (n(), p(), R.forEach((A) => A.update()), T = Date.now()), q = requestAnimationFrame(z);
  };
  return q = requestAnimationFrame(z), () => cancelAnimationFrame(q);
}, ct = ({
  text: e,
  gap: t,
  fontSize: s,
  color: i,
  width: l = window.innerWidth,
  height: n = window.innerHeight,
  drawMode: o = "fill"
}) => {
  const a = document.createElement("canvas");
  a.width = l, a.height = n;
  const r = a.getContext("2d");
  r.font = `${s}px Arial`, r[o + "Style"] = i;
  const p = r.measureText(e).width + t, w = s + t;
  for (let y = t / 2; y < n; y += w)
    for (let O = t / 2; O < l; O += p)
      r[o + "Text"](e, O, y);
  return a;
}, ut = {
  pop: dt,
  createWatermark: ct
}, ze = async (e) => {
  var i, l;
  const t = await ((i = e.formRef) == null ? void 0 : i.validate().then(() => !0).catch(() => !1)), s = await Promise.all((l = e.formItems) == null ? void 0 : l.filter((n) => {
    var o, a;
    return ((o = n.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = n.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((n) => ze(n.form)));
  return t && s.every((n) => n);
}, ht = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, Y = (e, t) => {
  const i = (e.__v_isRef ? e.value : at(e)).map((n) => typeof n == "object" ? n : { text: n, value: n });
  if (!t.sort)
    return i;
  const l = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((n, o) => n[l].localeCompare(o[l]));
}, { ElMessage: mt, ElNotification: pt, ElMessageBox: ft } = window.ElementPlus || {}, { showToast: gt, showNotify: bt, showConfirmDialog: _t } = window.vant || {}, W = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? ((i === "error" || i === "warning") && (t.type = "fail"), gt(t)) : mt({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, de = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? (i === "error" && (t.type = "danger"), bt(t)) : pt({
    showClose: !0,
    ...t
  });
}, te = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = _t(e) : t = ft.confirm(
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
  W[e] = W[e[0]] = (t) => W({ type: e, ...typeof t != "string" ? t : { message: t } }), de[e] = de[e[0]] = (t) => de({ type: e, ...typeof t != "string" ? t : { message: t } }), te[e] = te[e[0]] = (t) => te({ type: e, ...t });
const yt = (e, t, s) => {
  e.beforeEach((i, l, n) => {
    i.matched.length ? n() : n("/404");
  });
}, vt = (e, t, s) => {
  e.afterEach((i, l) => {
    const n = i.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...n].filter((o) => o).reverse().join("-");
  });
}, wt = (e, t, s) => {
  e.beforeEach((i, l, n) => {
    var o;
    return i.meta.acl === !1 || (o = i.meta) != null && o.visitable || t.acl.paths.includes(i.path) ? n() : (W.e("无权访问页面: " + i.path), n(t.acl.paths[0] || "/404"));
  }), oe(() => {
    let i = !1;
    Se(() => t.acl.menus, (l) => {
      if (!i) {
        if (!l.length)
          return;
        i = !0;
      }
      const n = t.acl.paths, o = (a, r) => {
        var p, w, y, O, k, R, g;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (p = a.children) == null || p.forEach((C) => {
          var T;
          C.meta || (C.meta = {}), (T = C.meta).acl || (T.acl = !1), o(C, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((y = a.meta).hidden ?? (y.hidden = (w = r.meta) == null ? void 0 : w.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((k = a.meta).visitable ?? (k.visitable = (O = r.meta) == null ? void 0 : O.visitable), a.meta = { ...a.meta })), (R = a.children) == null || R.forEach((C) => o(C, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !n.includes(h), (g = a.children) != null && g.some((C) => C.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, St = (e, t, s) => {
  e.beforeEach((i, l, n) => {
    i.name === "Login" && t.getters.logined && i.query.redirectTo ? n(i.query.redirectTo) : n();
  });
}, kt = {
  check404: yt,
  setTitle: vt,
  checkRolesPages: wt,
  redirectTo: St
}, We = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), He = (e = {}) => ({
  loading: !1,
  query: {
    page: 1,
    limit: 10,
    order: [],
    ...e
  },
  total: 0,
  infiniteScrollDisabled: !1,
  isInfinite: !1,
  list: [],
  columns: [],
  tableRef: null,
  selection: [],
  checked: null,
  _isBaseTable: !0
}), ue = () => ({
  ...We(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), Ct = ({
  table: e = {},
  dialog: t = {},
  columns: s = [
    { fixed: "left", type: "selection" },
    { type: "_index" }
  ],
  query: i = {},
  form: l = {}
} = {}) => ({
  table: {
    ...He(i),
    ...e,
    columns: s
  },
  dialog: {
    ...ue(),
    ...t,
    form: l
  }
}), { funcs: ye } = StardustJs, $t = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let i of s)
    i.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[i.slice(3)] = t[i], delete t[i]) : i.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[i.slice(3)] = t[i], delete t[i]);
  return t;
}), xt = (e, t) => {
  for (let s in e) {
    const i = e[s];
    !i || typeof i != "object" || (s === "table" && e[s]._isBaseTable && Je(i, t), s === "dialog" && e[s]._isBaseDialog && Ke(i, t), s === "form" && e[s]._isBaseForm && $e(i, t));
  }
  return e;
}, Je = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), Ke = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), $e(e, t), e), $e = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((i) => i.visible !== !1)), Ge(e.form, e.formItems), e.initialForm = ye.deepCopy(e.form), e.initialFormRules = ye.deepCopy(e.formRules), Se(() => e.formItems, () => {
  Ye(e);
}, { immediate: !0, deep: !0 }), e), Ye = (e) => {
  const { formItems: t, initialFormRules: s } = e, i = t.filter((n) => {
    let { formAttrs: o = {}, required: a = !1 } = n;
    return a = "required" in o ? o.required : a, !n.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(n.prop) && a !== !1;
  }).map((n) => n.prop);
  if (Object.assign(e.formRules, ye.deepCopy(s)), Object.keys(e.formRules).forEach((n) => {
    n in s || delete e.formRules[n];
  }), !i.length)
    return;
  const l = {};
  return i.forEach((n) => {
    if (e.formRules[n])
      return;
    const o = t.find((O) => O.prop === n), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = Ze[a], h = [], p = "options" in o, y = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${p ? "选择" : "输入"}${(o == null ? void 0 : o.label) || n}` };
    o.validator && (y.validator = o.validator), o.asyncValidator && (y.asyncValidator = o.asyncValidator), o.comp ? h.push({ ...y, trigger: r.change }) : h.push({ ...y, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...y, trigger: r.blur }), l[n] = h;
  }), Object.assign(e.formRules, l), e.formRules;
}, Ge = (e, t, s = !0) => {
  const i = {};
  return t.forEach((l) => {
    var h, p;
    let n = "";
    const { type: o, options: a } = l, { multiple: r } = l.formAttrs || {};
    if (s && o === "number" || l.comp === "ElInputNumber")
      n = 0;
    else if (l.comp === "ElSwitch")
      n = !1;
    else if (a && ((h = l.comp) != null && h.endsWith("XCheckboxs") || (p = l.comp) != null && p.endsWith("x-checkboxs") || r))
      n = [];
    else if (l.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(l.type)) {
      const w = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[l.type];
      l["start-placeholder"] || (l["start-placeholder"] = "开始" + w), l["end-placeholder"] || (l["end-placeholder"] = "结束" + w), n = [];
    }
    i[l.prop] = n;
  }), Object.assign(e, { ...i, ...e }), e;
}, Qe = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [i, l] = e.split(s);
  l = l.split("|");
  let n = t[i];
  typeof n == "number" ? n += "" : typeof n == "string" && (n = n.trim());
  const o = e.match(s)[0];
  return l.some((a) => o === "^=" ? n.startsWith(a) : o === "*=" ? n.includes(a) : o === "$=" ? n.endsWith(a) : o === "~=" ? !n.includes(a) : o === "!=" ? n !== a : a === n);
}, Ze = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, et = {
  effects: ut,
  validateForm: ze,
  formatPrecision: ht,
  formatOptions: Y,
  Message: W,
  Notify: de,
  Confirm: te,
  middlewares: kt,
  baseForm: We,
  baseTable: He,
  baseDialog: ue,
  baseModel: Ct,
  initFields: $t,
  initModel: xt,
  initTable: Je,
  initDialog: Ke,
  initForm: $e,
  initFormRules: Ye,
  initDefaultForm: Ge,
  isWhenMatched: Qe,
  triggers: Ze
};
class tt {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const i = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => i }
      }), this._initLifeCycles();
    }
    oe(this.onInit);
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
    return et;
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
const { funcs: Fe, highdict: Te, dates: fe } = StardustJs, { file: je, excel: re } = StardustBrowser;
class st extends tt {
  constructor(t) {
    super(t);
    const { model: s, table: i, dialog: l, dbModelName: n = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = i || (s == null ? void 0 : s.table), this.dialog = l || (s == null ? void 0 : s.dialog), this.dbModelName = n, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._isLoading = !0, this._loadingList = [], this._dbTable = null, this._unwatchs = [], oe(() => {
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
      "handleLoad",
      "onSearch",
      "onAdd",
      "onEdit",
      "onDelete",
      "onSubmit",
      "onCancel",
      "onRowEdit",
      "onCancelEdit",
      "onExport",
      "onSearchExport",
      "onImport",
      "onMultiDelete",
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
    let i = Te.get(s, this.listProp);
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
    }), await oe(), await Fe.sleep(50), this._clearValidate(), this.afterAdd());
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
    }), await oe(), (i = this.dialog.formRef) == null || i.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (!await this.beforeDelete({ $index: t, row: s }))
      return;
    if (await te.w({ message: "确定要删除吗？", title: "警告" })) {
      const l = this.getDeleteParams(s), n = await this.remove(l, s);
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
      W("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const { list: i, selection: l, ref: n } = this.table;
    let o = l.length > 0 ? l : i;
    o = Fe.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(n._visibleColumns, "current"), r = a.map((y) => y.prop), h = a.map((y) => y.label);
    o = o.map((y) => r.map((O) => y[O]));
    let p = null;
    t === "csv" ? p = re.export2Csv : p = re.export2Excel;
    let w = { header: h, data: o, filename: s };
    w = await this.processExporting(w), p(w), this._isExporting = !1;
  }
  async handleSearchExport(t = this.exportType, s = "查询导出数据") {
    if (this._isExporting)
      return;
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      W("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const i = await this.dbTable.search(this.getSearchExportParams());
    let l = i.data;
    l = this.formatList(l, i), l = this.processExportingData(l, "search");
    const n = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = n.map((p) => p.prop), a = n.map((p) => p.label);
    l = l.map((p) => o.map((w) => p[w]));
    let r = null;
    t === "csv" ? r = re.export2Csv : r = re.export2Excel;
    let h = { header: a, data: l, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    var n, o;
    const t = await je.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), i = await je.toType(t, s ? "text" : "arraybuffer");
    let l = [];
    if (s)
      await ((n = window.DynamicLibs) == null ? void 0 : n.use("Papa")), l = window.Papa.parse(i, { header: !0 }).data;
    else {
      await ((o = window.DynamicLibs) == null ? void 0 : o.use("XLSX"));
      const a = window.XLSX.read(i, {}), r = Object.values(a.Sheets);
      l = XLSX.utils.sheet_to_json(r[0]);
    }
    if (l.length > 0) {
      const a = {};
      this.table.columns.forEach((h) => a[h.label] = h.prop);
      const r = Object.keys(l[0]);
      l = l.map((h) => {
        const p = {};
        return r.forEach((w) => p[a[w]] = h[w]), p;
      });
    }
    l = this.processImportingData(l), await this.dbTable.func(["bulkCreate", l]), W.s("导入成功"), this.handleSearch();
  }
  async handleMultiDelete() {
    const { selection: t } = this.table;
    if (!t.length) {
      W.w("尚未选择要删除的数据");
      return;
    }
    if (!await te.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
      return;
    const i = t.map((l) => l[this.idField]);
    await this.dbTable.func(["destroy", {
      where: {
        [this.idField]: {
          "[Op.in]": i
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
    const i = this.getAddParams(t);
    if (!await this._checkAllNone(i)) {
      this._isSubmitting = !1;
      return;
    }
    let l = null;
    try {
      t[this.idField] ? l = await this.update(i, t[this.idField]) : l = await this.add(i);
    } catch (n) {
      this._showError(n.data.err), this._isSubmitting = !1;
      return;
    }
    return this._isSubmitting = !1, l.err || W.s("保存成功"), this.router.go(-1), l;
  }
  async handleSubmit(t) {
    if (t = t instanceof Event ? null : t, this._isSubmitting || !this.dialog.visible)
      return !1;
    this._isSubmitting = !0;
    const s = t || this.form;
    if (!t && ((this.dialog.shouldTrim || !0) && this._trimForm(), !await this._validateForm()))
      return this._isSubmitting = !1, !1;
    let i = null;
    try {
      if (this.dialog.isEditing) {
        const l = this.getUpdateParams(s);
        if (!await this._checkAllNone(l))
          return this._isSubmitting = !1, !1;
        i = await this.update(l, this.dialog.editingRow[this.idField]);
      } else {
        const l = this.getAddParams(s);
        if (!await this._checkAllNone(l))
          return this._isSubmitting = !1, !1;
        i = await this.add(l);
      }
    } catch (l) {
      return this._showError(l.data.err), this._isSubmitting = !1, !1;
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
  async handleLoad() {
    const { loading: t, query: s, total: i } = this.table;
    this.table.isInfinite = !0, !(this._isLoading || t || !i) && (this._isLoading = !0, this._loadingList = this.table.list.slice(), s.page++, s.page * s.limit >= i && (this.table.infiniteScrollDisabled = !0));
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
    const s = Object.keys(this.dialog.initialForm), i = {};
    return s.length ? s.forEach((l) => i[l] = t[l]) : Object.assign(i, t), this.dialog.formItems.forEach((l) => {
      let n = i[l.model || l.prop];
      l.type === "number" ? n = this.uiUtils.formatPrecision(n, l.precision || 3) * 1 : l.comp === "ElDatePicker" && (l.type === "datetime" ? n = fe.format(n) : (!l.type || l.type === "date") && (n = fe.format(n, "", !1))), i[l.model || l.prop] = n;
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
    const l = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && l !== this._lastSearchParams) {
      const { page: n, limit: o, order: a, count: r, ...h } = s;
      this.dbTable.func(["count", h]).then((p) => this.table.total = p.data);
    }
    return this._isLoading && (this.table.isInfinite = !0, this.table.list = this._loadingList.concat(t), this._isLoading = !1), t;
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
    const { columns: i, query: l } = this.table, { page: n, limit: o } = l;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (n - 1) * o + r + 1;
    }), i.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: p, formatter: w, autoFill: y } = a.tableAttrs || {}, { modelName: O } = a.formAttrs || {};
      if (O && y)
        t.forEach((k) => k[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const R = Se(() => a.options, (g, C) => {
          const T = C ? this.table.list : t, q = Vt(a);
          T.forEach((z, A) => {
            const V = z[r];
            z[`_formatted_${r}`] = q[V] || (w == null ? void 0 : w(V, z, A)) || V;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(R);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const i = [...new Set(t.map((h) => h[s.prop]))];
    if (!i.length)
      return;
    const { modelName: l, text: n, value: o } = s.formAttrs, a = await this.service.restful.search(l, {
      limit: -1,
      attributes: [n, o],
      where: {
        [o]: {
          "[Op.in]": i
        }
      }
    });
    if (!a.data.length)
      return;
    const r = Te.mapField(a.data, o, n);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = r[h[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingColumns(t, s = "current") {
    return t.filter((i) => !["index", "selection", "expand", "radio", "_index"].includes(i.type)).filter((i) => !i.virtual);
  }
  processExportingData(t, s = "current") {
    if (!t.length)
      return t;
    const i = {};
    this.table.ref._visibleColumns.forEach((n) => {
      let { formatter: o = n.formatter, tagValues: a = n.tagValues } = n.tableAttrs || {};
      !o && typeof a == "function" && (o = a), i[n.prop] = { formatter: o, tagValues: a };
    });
    const l = Object.keys(t[0]);
    return t.forEach((n) => {
      l.forEach((o) => {
        var r, h;
        const a = n[o];
        if (n.hasOwnProperty("_formatted_" + o))
          return n[o] = n["_formatted_" + o];
        if ((r = i[o]) != null && r.formatter)
          return n[o] = i[o].formatter(a);
        if ((h = i[o]) != null && h.tagValues)
          return n[o] = i[o].tagValues[a];
        typeof a == "boolean" ? n[o] = a && 1 || 0 : a instanceof Date ? (n[o] = fe.format(a), n[o].endsWith(" 00:00:00") && (n[o] = n[o].slice(0, -9))) : typeof a == "object" && (n[o] = JSON.stringify(a));
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
      this._isMobile ? s.validate().then(() => i(!0)).catch(() => i(!1)) : s.validate((l) => i(l)).catch(() => i(!1));
    }) : !0;
  }
  _clearValidate(t = this.dialog.formRef) {
    t && (this._isMobile ? t.resetValidation() : t.clearValidate());
  }
  async _checkAllNone(t) {
    const s = [null, void 0, ""];
    return Object.values(t).some((l) => !s.includes(l)) ? !0 : te.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    W(typeof t == "object" ? t.message || t.err || t.toString() : t);
  }
  get _isMobile() {
    var s, i;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((i = this.dialog) == null ? void 0 : i.formRef);
    return t ? t.$.attrs.class.indexOf("mobile") >= 0 : window.isMobile;
  }
  onSearch(...t) {
    return this.handleSearch(...t);
  }
  onAdd(...t) {
    return this.handleAdd(...t);
  }
  onEdit(...t) {
    return this.handleEdit(...t);
  }
  onDelete(...t) {
    return this.handleDelete(...t);
  }
  onSubmit(...t) {
    return this.handleSubmit(...t);
  }
  onCancel(...t) {
    return this.handleCancel(...t);
  }
  onRowEdit(...t) {
    return this.handleRowEdit(...t);
  }
  onCancelEdit(...t) {
    return this.handleCancelEdit(...t);
  }
  onExport(...t) {
    return this.handleExport(...t);
  }
  onSearchExport(...t) {
    return this.handleSearchExport(...t);
  }
  onImport(...t) {
    return this.handleImport(...t);
  }
  onMultiDelete(...t) {
    return this.handleMultiDelete(...t);
  }
}
const Vt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: l = "value" } = s, n = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    n[o[l]] = o[i];
  }), n;
};
class Et extends st {
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
const At = {
  BaseController: tt,
  CrudController: st,
  TempCrudController: Et
}, E = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, l] of t)
    s[i] = l;
  return s;
}, Ot = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Dt(e, t, s, i, l, n) {
  const o = u("van-action-sheet");
  return d(), f(o, b(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Ft = /* @__PURE__ */ E(Ot, [["render", Dt]]), Tt = {
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
        const l = i.span || this.span;
        t.push(i), s += l, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, jt = { class: "x-auto-rows" }, Rt = { key: 1 };
function Bt(e, t, s, i, l, n) {
  const o = u("x-col"), a = u("x-row");
  return d(), _("div", jt, [
    (d(!0), _(I, null, M(n.rows, (r, h) => (d(), f(a, b({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), _(I, null, M(r, (p, w) => (d(), f(o, b(p, {
          span: p.span || s.span,
          key: w,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            p.slot || e.$attrs.slot ? x(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), _("span", Rt, D(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const It = /* @__PURE__ */ E(Tt, [["render", Bt]]), Lt = {
  name: "MobileXButton"
};
function Mt(e, t, s, i, l, n) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const Nt = /* @__PURE__ */ E(Lt, [["render", Mt]]), Pt = {
  name: "PcXButton"
};
function Ut(e, t, s, i, l, n) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const qt = /* @__PURE__ */ E(Pt, [["render", Ut]]), { funcs: Xt } = StardustBrowser, zt = ["index", "selection", "expand", "radio", "_index"], xe = {
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
        ...ue(),
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
      return Xt.calcPixel(this.height) * this.zoom + "px";
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
      const e = this.datasource.columns.filter((t) => !zt.includes(t.type));
      this.dialog.formItems.slice(0, 3).forEach((t) => t.options = e), this.handleMakeChart();
    },
    async handleMakeChart() {
      var s, i;
      this.dialog.visible = !1, this.loading = !0;
      const e = { ...this.dialog.form };
      (s = e.filter) != null && s.categories.isLimit || (e.filter.categories.mergeOthers = !1), (i = e.filter) != null && i.series.isLimit || (e.filter.series.mergeOthers = !1);
      let t = this.datasource.list;
      this.datasource.search && (t = await this.datasource.search()), e.data = t, this.setRich(e), this.loading = !1;
    },
    calcSummary(e, t, s) {
      let i;
      return (t === "sum" || t === "average") && (i = e.reduce((l, n) => l + n, 0).toFixed(3) * 1), t === "count" ? i = e.length : t === "average" ? e.length ? i = (i / (s || e.length)).toFixed(3) * 1 : i = void 0 : t === "first" ? i = e[0] : t === "last" ? i = e[e.length - 1] : (t === "max" || t === "min") && (i = Math[t].apply(null, e)), i;
    },
    setRich(e) {
      var A;
      const { categories: t, data: s, attr: i, summary: l, type: n, filter: o, grid: a } = e, r = {}, h = Array.isArray(t) && t.length || ((A = t == null ? void 0 : t.data) == null ? void 0 : A.length), p = h && (Array.isArray(t) ? t : t.data), w = typeof e.series == "string" ? e.series : e.series.data, y = (o == null ? void 0 : o.categories.limit) > -1, O = (o == null ? void 0 : o.series.limit) > -1, k = {}, R = [], g = /* @__PURE__ */ new Set(), C = [];
      s.forEach((V) => {
        var L;
        let j = V[w] || "未知";
        if (O && C.length >= o.series.limit && !C.includes(j)) {
          if (!o.series.mergeOthers)
            return;
          j = "其他";
        }
        if (h) {
          let N = p.map((le) => V[le]).join("/") || "未知";
          if (y && R.length >= o.categories.limit && !R.includes(N)) {
            if (!o.categories.mergeOthers)
              return;
            g.add(N), N = "其他";
          }
          k[N] || R.push(N), k[N] || (k[N] = {}), C.includes(j) || C.push(j), (L = k[N])[j] || (L[j] = []), k[N][j].push(V[i]);
        } else
          k[j] || C.push(j), k[j] || (k[j] = []), k[j].push(V[i]);
      });
      const T = h && !O ? [...new Set(s.map((V) => V[w]))] : C;
      if (h)
        for (let V in k)
          for (let j in k[V])
            k[V][j] = this.calcSummary(
              k[V][j],
              l,
              y && V === "其他" ? k[V][j].length / g.size : k[V][j].length
            );
      else
        for (let V in k)
          k[V] = this.calcSummary(k[V], l);
      let q = T;
      typeof e.series == "object" && e.series.formatter && (q = T.map((V) => e.series.formatter(V)));
      let z = [];
      h ? z = T.map((V, j) => ({
        name: q[j],
        type: n,
        label: { show: !0, position: "top" },
        data: R.map((L) => ({ name: L, value: k[L][V] }))
      })) : z = [
        {
          type: n,
          colorBy: "data",
          label: { show: !0, position: "top" },
          data: T.map((V) => ({ name: V, value: k[V] }))
        }
      ], Object.assign(r, {
        legend: { data: q },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? R.map((V) => t.formatter(V)) : R : w.formatter ? C.map((V) => w.formatter(V)) : C
        },
        yAxis: { type: "value" },
        series: z
      }, this.option, { grid: a }), this.update(r);
    },
    update(e = {}) {
      var t, s, i;
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
      }, e.xAxis && !((t = e.xAxis.axisLabel) != null && t.formatter) && ((s = e.xAxis).axisLabel || (s.axisLabel = {}), e.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)), console.log(e), (i = this.chart) == null || i.setOption(e, !0);
    },
    labelSplitFormatter(e) {
      return (t) => t.length < e ? t : Array.from({
        length: Math.ceil(t.length / e)
      }).map((s, i) => t.slice(i * e, (i + 1) * e)).join(`
`);
    }
  }
}, Re = () => {
  Ue((e) => ({
    "54b2baec": e.zoomedHeight,
    "2b79eb74": e.zoom
  }));
}, Be = xe.setup;
xe.setup = Be ? (e, t) => (Re(), Be(e, t)) : Re;
const he = (e) => (ke("data-v-94e70f82"), e = e(), Ce(), e), Wt = { class: "x-chart" }, Ht = {
  class: "chart",
  ref: "el"
}, Jt = /* @__PURE__ */ he(() => /* @__PURE__ */ F("span", null, "左", -1)), Kt = /* @__PURE__ */ he(() => /* @__PURE__ */ F("span", null, "上", -1)), Yt = /* @__PURE__ */ he(() => /* @__PURE__ */ F("span", null, "右", -1)), Gt = /* @__PURE__ */ he(() => /* @__PURE__ */ F("span", null, "下", -1));
function Qt(e, t, s, i, l, n) {
  const o = u("pc-x-icon"), a = u("el-input-number"), r = u("el-col"), h = u("el-row"), p = u("el-checkbox"), w = u("el-tab-pane"), y = u("el-tabs"), O = u("x-form"), k = u("x-dialog"), R = ee("loading");
  return B((d(), _("div", Wt, [
    F("div", Ht, null, 512),
    s.datasource ? (d(), _("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (g) => l.dialog.visible = !0)
    }, [
      $(" 配置 "),
      m(o, { name: "Setting" })
    ])) : S("", !0),
    m(k, {
      modelValue: l.dialog.visible,
      "onUpdate:modelValue": t[12] || (t[12] = (g) => l.dialog.visible = g),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: n.handleMakeChart,
      onCancel: t[13] || (t[13] = (g) => l.dialog.visible = !1)
    }, {
      default: c(() => [
        m(O, { dialog: l.dialog }, {
          grid: c(() => [
            m(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                m(r, { span: 12 }, {
                  default: c(() => [
                    Jt,
                    m(a, {
                      modelValue: n.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => n.grid.left = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Kt,
                    m(a, {
                      modelValue: n.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (g) => n.grid.top = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Yt,
                    m(a, {
                      modelValue: n.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (g) => n.grid.right = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Gt,
                    m(a, {
                      modelValue: n.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (g) => n.grid.bottom = g)
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
              modelValue: l.filterType,
              "onUpdate:modelValue": t[11] || (t[11] = (g) => l.filterType = g)
            }, {
              default: c(() => [
                m(w, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    m(p, {
                      modelValue: n.categories.isLimit,
                      "onUpdate:modelValue": t[5] || (t[5] = (g) => n.categories.isLimit = g)
                    }, {
                      default: c(() => [
                        $("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    B(F("div", null, [
                      $(" 记录条数 "),
                      m(a, {
                        modelValue: n.categories.limit,
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => n.categories.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: n.categories.mergeOthers,
                        "onUpdate:modelValue": t[7] || (t[7] = (g) => n.categories.mergeOthers = g)
                      }, {
                        default: c(() => [
                          $("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [De, n.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                m(w, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    m(p, {
                      modelValue: n.series.isLimit,
                      "onUpdate:modelValue": t[8] || (t[8] = (g) => n.series.isLimit = g)
                    }, {
                      default: c(() => [
                        $("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    B(F("div", null, [
                      $(" 记录条数 "),
                      m(a, {
                        modelValue: n.series.limit,
                        "onUpdate:modelValue": t[9] || (t[9] = (g) => n.series.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: n.series.mergeOthers,
                        "onUpdate:modelValue": t[10] || (t[10] = (g) => n.series.mergeOthers = g)
                      }, {
                        default: c(() => [
                          $("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [De, n.series.isLimit]
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
    [R, l.loading]
  ]);
}
const Zt = /* @__PURE__ */ E(xe, [["render", Qt], ["__scopeId", "data-v-94e70f82"]]), es = {
  name: "MobileXCheckboxs",
  inheritAttrs: !1,
  props: {
    text: {
      type: String,
      default: "text"
    },
    plain: {
      type: Boolean,
      default: !1
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
        required: l,
        ...n
      } = this.$attrs;
      return n;
    }
  },
  methods: {
    formatOptions: Y
  }
};
function ts(e, t, s, i, l, n) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, b({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, n.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), _(I, null, M(n.formatOptions(s.options, this), (r) => (d(), f(o, b(n.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: c(() => [
          $(D(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const ss = /* @__PURE__ */ E(es, [["render", ts], ["__scopeId", "data-v-5d7abb69"]]), ns = {
  name: "PcXCheckboxs",
  inheritAttrs: !1,
  props: {
    modelValue: Array,
    plain: {
      type: Boolean,
      default: !1
    },
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
    formatOptions: Y
  }
};
function is(e, t, s, i, l, n) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, b({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, n.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), _(I, null, M(n.formatOptions(s.options, this), (r) => (d(), f(o, b(n.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: c(() => [
          $(D(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "modelValue"]);
}
const ls = /* @__PURE__ */ E(ns, [["render", is], ["__scopeId", "data-v-82200102"]]), os = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function as(e, t, s, i, l, n) {
  const o = u("van-col");
  return d(), f(o, b(n.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const rs = /* @__PURE__ */ E(os, [["render", as]]), ds = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function cs(e, t, s, i, l, n) {
  const o = u("el-col");
  return d(), f(o, b(n.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const us = /* @__PURE__ */ E(ds, [["render", cs]]), hs = {
  name: "MobileXDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: "详情"
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
}, ms = { key: 1 };
function ps(e, t, s, i, l, n) {
  const o = u("van-dialog");
  return d(), f(o, b({ width: "92%" }, e.$attrs, {
    show: n.visible,
    "onUpdate:show": t[0] || (t[0] = (a) => n.visible = a),
    class: "mobile-x-dialog",
    "show-confirm-button": !!e.$attrs.onSubmit || !!e.$parent.$attrs.onSubmit,
    "show-cancel-button": !!e.$attrs.onCancel || !!e.$parent.$attrs.onCancel,
    onConfirm: n.handleConfirm,
    onCancel: n.handleCancel
  }), se({ _: 2 }, [
    e.$slots.title || s.title ? {
      name: "title",
      fn: c(() => [
        e.$slots.title ? x(e.$slots, "title", { key: 0 }) : (d(), _("span", ms, D(s.title), 1))
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
const fs = /* @__PURE__ */ E(hs, [["render", ps]]), gs = {
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
    title: {
      type: String,
      default: "详情"
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
}, bs = {
  key: 1,
  class: "el-dialog__title"
};
function _s(e, t, s, i, l, n) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(ne(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: n.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => n.visible = r),
    fullscreen: l.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: c(() => [
      e.$slots.header ? x(e.$slots, "header", { key: 0 }) : (d(), _("span", bs, D(s.title), 1)),
      s.drawer ? S("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: n.handleToggleFullscreen
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
          $(D(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : S("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          $(D(s.cancelText), 1)
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
const ys = /* @__PURE__ */ E(gs, [["render", _s]]), J = {}, Q = {
  provinces: [],
  cities: [],
  counties: []
}, vs = {
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
        const i = Object.entries(J.province_list).find((l) => l[1] === e);
        this.province = i == null ? void 0 : i[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const i = Object.entries(J.city_list).find((l) => l[1] === t);
        this.city = i == null ? void 0 : i[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const i = Object.entries(J.county_list).find((l) => l[1] === s);
        this.county = i == null ? void 0 : i[0];
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
function ws(e, t, s, i, l, n) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      m(a, { span: n.span }, {
        default: c(() => [
          m(o, {
            modelValue: l.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => l.province = h),
            options: l.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      n.number > 1 ? (d(), f(a, {
        key: 0,
        span: n.span
      }, {
        default: c(() => [
          m(o, {
            modelValue: l.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => l.city = h),
            options: l.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : S("", !0),
      n.number > 2 ? (d(), f(a, {
        key: 1,
        span: n.span
      }, {
        default: c(() => [
          m(o, {
            modelValue: l.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => l.county = h),
            options: l.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : S("", !0)
    ]),
    _: 1
  });
}
const Ss = /* @__PURE__ */ E(vs, [["render", ws]]);
function ks() {
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
function Cs() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function $s() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((l) => (delete l.visible, e ? {
    ...l,
    label: " ",
    _label: l.label
  } : l)).filter((l) => this.dialog ? this.dialog.isEditing ? l.canEdit !== !1 : l.canAdd !== !1 : !0).map((l) => Object.assign({}, l, l.formAttrs));
}
function xs() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return Qe(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function Vs() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function Es(e) {
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
}
function As(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function Os(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const ie = {
  props: ks,
  computed: {
    _model: Cs,
    _items: $s,
    _visibleItems: xs,
    _rules: Vs
  },
  methods: {
    calcPlaceholder: Es,
    calcStyle: As,
    formatModelValue: Os
  }
}, Ds = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...ie.props(),
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
    ...ie.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...ie.methods
  }
};
function Fs(e, t, s, i, l, n) {
  const o = u("mobile-x-form-item"), a = u("van-cell-group"), r = u("van-form");
  return d(), f(r, {
    ref: "formRef",
    class: K(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : S("", !0),
      m(a, ce(qe(e.$attrs)), {
        default: c(() => [
          (d(!0), _(I, null, M(e._visibleItems, (h, p) => (d(), f(o, b(h, {
            rules: e._rules[h.prop] || h.rules,
            key: p,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (w) => e._model[h.prop] = w,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: c(() => [
              h.slot ? x(e.$slots, h.slot, ce(b({ key: 0 }, h))) : S("", !0)
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
const Ts = /* @__PURE__ */ E(Ds, [["render", Fs]]), js = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...ie.props(),
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
    ...ie.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...ie.methods
  }
}, Rs = { key: 1 };
function Bs(e, t, s, i, l, n) {
  const o = u("pc-x-form-item"), a = u("el-form"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: l.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => l.activeNames = p),
    class: K((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      m(r, {
        name: l.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", Rs, D(s.title), 1))
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
              (d(!0), _(I, null, M(e._visibleItems, (p, w) => (d(), f(o, b({
                "label-width": s.labelWidth,
                "show-tooltip": e.$attrs.showTooltip || !1
              }, p, {
                key: w,
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
const Is = /* @__PURE__ */ E(js, [["render", Bs]]);
function Ls(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Xe(e);
}
const ve = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: l
  } = e;
  let {
    comp: n,
    compType: o,
    html: a,
    text: r
  } = t;
  const h = {
    ...i,
    "onUpdate:modelValue": (w) => l("update:modelValue", w)
  }, p = [];
  return o === "html" ? h.class = "comp-html" : n = u(n), a && (h.innerHTML = a), r && p.push(r), G(n, h, {
    default: () => p
  });
}, Ms = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: l,
    $slots: n
  } = e, {
    slot: o,
    showTooltip: a,
    placeholder: r
  } = t;
  if (o && !s.label)
    return n.default();
  let h = null;
  if (o)
    h = n.default();
  else if (a) {
    let p;
    h = m(u("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Ls(p = ve(e)) ? p : {
      default: () => [p]
    });
  } else
    h = ve(e);
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
}, Ns = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: i,
    $emit: l,
    $slots: n,
    mValue: o
  } = e, {
    slot: a,
    comp: r,
    modelValue: h
  } = t;
  if (a && !s.label)
    return n.default({
      ...t,
      ...s
    });
  const p = {
    modelValue: o,
    "onUpdate:modelValue": (w) => l("update:modelValue", w)
  };
  return a && s.label || r ? G(u("van-field"), p, {
    input: () => a && s.label ? n.default() : ve(e)
  }) : (Object.assign(p, i), G(u("van-field"), p));
}, Ps = {
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
        compType: l,
        iconSize: n,
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
    return Ns(this);
  }
}, Ve = {
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
        slot: l,
        compType: n,
        span: o,
        offset: a,
        showTooltip: r,
        required: h,
        format: p,
        style: w,
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
    return Ms(this);
  }
}, Ie = () => {
  Ue((e) => ({
    ba9709f0: e.width
  }));
}, Le = Ve.setup;
Ve.setup = Le ? (e, t) => (Ie(), Le(e, t)) : Ie;
const Us = /* @__PURE__ */ E(Ve, [["__scopeId", "data-v-d2cde1e2"]]), Me = /* @__PURE__ */ Object.assign({}), qs = {
  name: "MobileXIcon",
  props: {
    name: String
  },
  data() {
    return {
      icons: {}
    };
  },
  computed: {
    iconClass() {
      const [e, t] = this.name.split(":");
      return "icon--" + e + " icon--" + e + "--" + t;
    }
  },
  created() {
    this.initIcons();
  },
  methods: {
    async initIcons() {
      const e = {};
      await Promise.all(Object.keys(Me).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await Me[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Xs = ["src"];
function zs(e, t, s, i, l, n) {
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), _("span", {
    key: 0,
    class: K(n.iconClass)
  }, null, 2)) : l.icons[s.name] ? (d(), _("img", {
    key: 1,
    src: l.icons[s.name],
    alt: "icon"
  }, null, 8, Xs)) : (d(), f(o, b({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Ws = /* @__PURE__ */ E(qs, [["render", zs]]), Ne = /* @__PURE__ */ Object.assign({}), Hs = {
  name: "PcXIcon",
  props: {
    name: String
  },
  data() {
    return {
      icons: {}
    };
  },
  computed: {
    iconClass() {
      const [e, t] = this.name.split(":");
      return "icon--" + e + " icon--" + e + "--" + t;
    }
  },
  created() {
    this.initIcons();
  },
  methods: {
    async initIcons() {
      const e = {};
      await Promise.all(Object.keys(Ne).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await Ne[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Js = ["src"];
function Ks(e, t, s, i, l, n) {
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), _("span", {
    key: 0,
    class: K(n.iconClass)
  }, null, 2)) : l.icons[s.name] ? (d(), _("img", {
    key: 1,
    src: l.icons[s.name],
    alt: "icon"
  }, null, 8, Js)) : (d(), f(o, ce(b({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(ne(s.name)))
    ]),
    _: 1
  }, 16));
}
const Ys = /* @__PURE__ */ E(Hs, [["render", Ks]]), { highdict: Gs } = StardustJs, { storage: Qs } = StardustBrowser, { local: nt } = Qs, Ee = ["index", "selection", "expand", "radio", "_index"];
function Zs() {
  return {
    table: Object,
    loading: Boolean,
    data: Array,
    columns: Array,
    query: Object,
    total: Number,
    infiniteScrollDisabled: Boolean,
    selection: Array,
    chartHeight: String,
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
    hidePagination: {
      type: Boolean,
      default: !1
    },
    hideTools: {
      type: Boolean,
      default: !1
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
    onLoad: Function,
    controller: Object,
    listen: {
      type: String,
      default: "*"
    },
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
function en() {
  return [
    "update:tref",
    "search",
    "add",
    "edit",
    "row-edit",
    "cancel-edit",
    "delete",
    "export",
    "search-export",
    "load"
  ];
}
function tn() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = { ...this.$attrs };
  return t in this && Object.assign(s, this[t]), s;
}
function sn() {
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
function nn() {
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
function ln() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function on() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function an() {
  const { $props: e, _query: t } = this, { table: s, columns: i } = e;
  return (i || (s == null ? void 0 : s.columns) || []).map((n) => n.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (s.isInfinite ? 0 : (a - 1) * r) + o + 1;
    }
  }, n, { type: "index" }) : n.type === "radio" ? Object.assign({ width: 60, label: "单选" }, n) : Object.assign({}, n, n.tableAttrs));
}
function rn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function dn() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function cn() {
  const { table: e, infiniteScrollDisabled: t } = this.$props;
  return t ?? (e == null ? void 0 : e.infiniteScrollDisabled);
}
function un() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function hn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function mn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function pn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function fn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function gn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function bn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function _n() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function yn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function vn() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : null;
}
function wn() {
  var s;
  if (!this.controller || !((s = this.listen) != null && s.length))
    return {};
  let e = this.listen.split(",");
  e.includes("*") && (e = [.../* @__PURE__ */ new Set([
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
    "delete",
    "load"
  ])]);
  const t = {};
  return e.forEach((i) => {
    const l = "handle" + i.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[i] = this.controller[l];
  }), t;
}
function Sn() {
  const e = this._columns.filter((s) => s.type && Ee.includes(s.type)), t = this.settings.columns.filter((s) => !s.hide).map((s) => {
    const i = this._columns.find((l) => l.prop === s.prop);
    return {
      sortable: "custom",
      ...i,
      width: s.width || i.width
    };
  });
  return e.concat(t);
}
function kn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function Cn() {
  return this.table.hideOperates || this._attrs["hide-operates"] !== void 0 && this._attrs["hide-operates"] !== !1;
}
function $n() {
  return this.table.operatesWidth || this._attrs.operatesWidth || this._attrs["operates-width"];
}
function xn() {
  return this.table.hideChart || this._attrs["hide-chart"] !== void 0 && this._attrs["hide-chart"] !== !1;
}
function Vn() {
  return this._attrs["operates-dropdown"] !== void 0 && this._attrs["operates-dropdown"] !== !1;
}
function En() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !Ee.includes(e.type)));
}
function An() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function On() {
  const e = this._uid && nt.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Ee.includes(t.type))).map((t) => {
    const { prop: s, label: i, show: l, hide: n, width: o, virtual: a } = t;
    return { prop: s, label: i, show: l, hide: n, width: o, virtual: a };
  })), this.settings = e;
}
function Dn(e) {
  nt.setJson(`Settings[${this._uid}]`, e);
}
function Fn(e, t) {
  const { prop: s } = t;
  let { format: i, formatter: l } = t.tableAttrs || t;
  i = Array.isArray(t.options) ? i !== !1 : i;
  const n = e[s];
  if (n == null || n === "")
    return this.defaultValue;
  if (i || l) {
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
    if (l)
      return typeof l == "function" ? l(n, e, t) : Gs.get(e, l);
  }
  return n;
}
function Tn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function jn(e) {
  this.params = e, this._emit("search", e);
}
function Rn(e) {
  this.saveSettings(e), this.initSettings();
}
function Bn(e, t, s, i) {
  const l = this.settings.columns.find((n) => n.prop === s.property);
  l && (l.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function In(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Ln(e) {
  var t, s, i, l;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((l = (i = this.controller) == null ? void 0 : i.handleSortChange) == null || l.call(i, e));
}
function Mn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function Nn(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function Pn() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function Un() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function qn(e) {
  var i;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.class) {
    const l = s.tableAttrs.class;
    typeof l == "function" ? t += " " + l(e) : typeof l == "string" && (t += " " + l);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Xn(e) {
  var i;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.style) {
    const l = s.tableAttrs.style;
    typeof l == "function" ? Object.assign(t, l(e)) : typeof l == "object" && Object.assign(t, l);
  }
  return Object.keys(t) ? t : null;
}
function zn(e, t) {
  const { tagTypes: s, prop: i, options: l } = t, n = e.row[i];
  if (s) {
    if (typeof s == "function")
      return s(n, e, t);
    if (typeof s == "object")
      return s[n];
  } else if (l) {
    const o = l.find((a) => a[t.value || "value"] === n);
    if (o != null && o.tagType)
      return o.tagType;
  }
  return n ? "success" : "danger";
}
function Wn(e, t) {
  const { tagValues: s, prop: i, options: l } = t, n = e.row[i];
  if (s) {
    if (typeof s == "function")
      return s(n, e, t);
    if (typeof s == "object")
      return s[n];
  } else if (l) {
    const o = l.find((a) => a[t.value || "value"] === n);
    if (o)
      return o[t.text || "text"];
  }
  return n;
}
function Hn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Jn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Kn(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Yn(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Gn(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function Qn(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function Zn(e, t) {
  var i;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((i = t.previewSrcList) == null ? void 0 : i.call(t)) || [s];
}
function ei(e, t) {
  const s = "on" + e.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function ti() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const U = {
  props: Zs,
  emits: en,
  computed: {
    _attrs: tn,
    domids: sn,
    elTableAttrs: nn,
    _loading: ln,
    _data: on,
    _columns: an,
    _query: rn,
    _total: dn,
    _infiniteScrollDisabled: cn,
    _selection: un,
    _chartHeight: hn,
    _chartOption: mn,
    _onSearch: pn,
    _onAdd: fn,
    _onExport: gn,
    _onSearchExport: bn,
    _onImport: _n,
    _onMultiDelete: yn,
    _onLoad: vn,
    _listen: wn,
    _visibleColumns: Sn,
    _uid: kn,
    hideOperates: Cn,
    operatesWidth: $n,
    hideChart: xn,
    operatesDropdown: Vn,
    searcherColumns: En,
    searcherConfig: An
  },
  watch: {
    $route: ti
  },
  methods: {
    initSettings: On,
    saveSettings: Dn,
    calcValue: Fn,
    calcOverflowTooltip: Tn,
    handleSearch: jn,
    handleResetSettings: Rn,
    handleHeaderDragend: Bn,
    handleSelectionChange: In,
    handleSortChange: Ln,
    handleCheckedChange: Mn,
    handleCollapseChange: Nn,
    handleMinus: Pn,
    handleToggleFullscreen: Un,
    cellClassName: qn,
    cellStyle: Xn,
    calcTagType: zn,
    calcTagValue: Wn,
    canEdit: Hn,
    canSave: Jn,
    canRowEdit: Kn,
    canCancelEdit: Yn,
    canDelete: Gn,
    _imageSrc: Qn,
    _imagePreviewSrcList: Zn,
    _emit: ei
  }
}, si = {
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
        const { infoAttrs: s = {}, ...i } = t, l = { span: this.span, ...i, ...s }, n = l.block || "基本信息";
        let o = e[n];
        o || (e[n] = o = [], o.span = 0), o.span + l.span > 24 && o.length ? o[o.length - 1].span += 24 - o.span : o.span += l.span, o.push(l);
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
}, ni = { key: 0 }, ii = { key: 1 };
function li(e, t, s, i, l, n) {
  const o = u("el-descriptions-item"), a = u("el-descriptions"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: l.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => l.activeNames = p),
    class: K(["x-info", { "hide-header": n.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), _(I, null, M(n.blocks, (p, w) => (d(), f(r, {
        key: w,
        title: w,
        name: w
      }, {
        default: c(() => [
          m(a, {
            column: s.column,
            border: s.border
          }, {
            default: c(() => [
              (d(!0), _(I, null, M(p, (y) => (d(), f(o, b({
                key: y.prop
              }, y), se({
                default: c(() => [
                  y.slot ? (d(), _("span", ni, [
                    x(e.$slots, y.slot, ce(qe({ data: s.data, field: y, value: n.calcValue(s.data, y) })), void 0, !0)
                  ])) : (d(), _("span", ii, D(n.calcValue(s.data, y)), 1))
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
const oi = /* @__PURE__ */ E(si, [["render", li], ["__scopeId", "data-v-0c3b67a5"]]), ai = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, ri = { key: 1 };
function di(e, t, s, i, l, n) {
  return d(), _("div", null, [
    (d(!0), _(I, null, M(s.items, (o, a) => (d(), f(ne(s.compName), b({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? x(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), _("span", ri, D(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const ci = /* @__PURE__ */ E(ai, [["render", di]]), ui = {
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
function hi(e, t, s, i, l, n) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), h = u("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      m(o, { span: 6 }, {
        default: c(() => [
          F("span", null, "总计: " + D(s.total), 1)
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
            "page-count": n.pageCount
          }), {
            "prev-text": c(() => [
              m(a, { name: "arrow-left" }),
              $(" 上一页 ")
            ]),
            "next-text": c(() => [
              $(" 下一页 "),
              m(a, { name: "arrow" })
            ]),
            page: c(({ text: p }) => [
              $(D(p), 1)
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
const mi = /* @__PURE__ */ E(ui, [["render", hi]]), pi = {
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
function fi(e, t, s, i, l, n) {
  const o = u("el-pagination");
  return d(), f(o, b({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": s.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (a) => s.query.page = a),
    "page-size": s.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (a) => s.query.limit = a),
    "page-count": n.pageCount,
    total: s.total,
    class: "pc-x-pagination"
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const gi = /* @__PURE__ */ E(pi, [["render", fi]]), bi = {
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
function _i(e, t, s, i, l, n) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), _(I, null, [
    F("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: K(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, D(s.modelValue || s.placeholder), 3),
    m(a, b({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: n.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => n.visible = r)
    }), {
      default: c(() => [
        m(o, b(e.$attrs, {
          title: e.$attrs.title,
          columns: s.columns,
          onCancel: t[1] || (t[1] = (r) => e.$emit("cancel")),
          onConfirm: n.onConfirm
        }), null, 16, ["title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const yi = /* @__PURE__ */ E(bi, [["render", _i]]), vi = {
  name: "MobileXRadios",
  inheritAttrs: !1,
  props: {
    text: {
      type: String,
      default: "text"
    },
    plain: {
      type: Boolean,
      default: !1
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
    formatOptions: Y
  }
};
function wi(e, t, s, i, l, n) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, b({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), _(I, null, M(n.formatOptions(s.options, this), (r) => (d(), f(o, b(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: c(() => [
          $(D(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const Si = /* @__PURE__ */ E(vi, [["render", wi], ["__scopeId", "data-v-70a93fd1"]]), ki = {
  name: "PcXRadios",
  inheritAttrs: !1,
  props: {
    modelValue: Number | String,
    plain: {
      type: Boolean,
      default: !1
    },
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
    formatOptions: Y
  }
};
function Ci(e, t, s, i, l, n) {
  const o = u("el-radio-group");
  return d(), f(o, b({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, n.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), _(I, null, M(n.formatOptions(s.options, this), (a) => (d(), f(ne(s.button ? "el-radio-button" : "el-radio"), b(n.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: c(() => [
          $(D(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "modelValue"]);
}
const $i = /* @__PURE__ */ E(ki, [["render", Ci], ["__scopeId", "data-v-cfd9db24"]]), xi = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Vi = { key: 1 };
function Ei(e, t, s, i, l, n) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), _(I, null, M(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), _("span", Vi, D(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const Ai = /* @__PURE__ */ E(xi, [["render", Ei]]), Oi = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Di = { key: 1 };
function Fi(e, t, s, i, l, n) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), _(I, null, M(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), _("span", Di, D(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const Ti = /* @__PURE__ */ E(Oi, [["render", Fi]]), ji = {
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
function Ri(e, t, s, i, l, n) {
  const o = u("van-icon"), a = u("van-field");
  return d(), f(a, b({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: n.handleClick
  }), {
    "right-icon": c(() => [
      m(o, {
        name: "scan",
        onClick: n.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const Bi = /* @__PURE__ */ E(ji, [["render", Ri]]), Ii = {
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
function Li(e, t, s, i, l, n) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, b(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: n.handleClick
  }), {
    append: c(() => [
      m(o, {
        icon: "CameraFilled",
        onClick: n.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const Mi = /* @__PURE__ */ E(Ii, [["render", Li]]), it = async (e, t, s) => {
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: l = "text", value: n = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], l, n])], a.limit = a.limit || 20, i && (a.where = a.where || {}, a.where[l] = a.where[l] || {}, a.where[l]["[Op.like]"] = `%${i}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, Ni = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((i) => e[i])[0], Pi = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((i) => e[i]).slice(1).join(" - ") + ")", Ui = {
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
        this._options = Y(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: Y,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      it(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function qi(e, t, s, i, l, n) {
  const o = u("x-picker");
  return d(), _("div", {
    onClick: t[5] || (t[5] = (...a) => n.onClick && n.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(o, b(e.$attrs, {
      modelValue: n.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: l.visible,
      columns: l._options,
      onClick: t[1] || (t[1] = Z(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => l.visible = !0),
      onCancel: t[3] || (t[3] = (a) => l.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => l.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const Xi = /* @__PURE__ */ E(Ui, [["render", qi]]), zi = {
  name: "PcXSelect",
  props: {
    modelName: String,
    params: Object,
    plain: {
      type: Boolean,
      default: !1
    },
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
        this._options = Y(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: Y,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      it(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return Ni(e, this);
    },
    calcRemarkLabel(e) {
      return Pi(e, this);
    }
  }
}, Wi = { key: 1 }, Hi = { class: "main" }, Ji = { class: "remark" };
function Ki(e, t, s, i, l, n) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, b({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: l.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || n.remoteSearch
  }), {
    default: c(() => [
      (d(!0), _(I, null, M(l._options, (r) => (d(), f(o, b(e.$attrs, {
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
          }, void 0, !0) : (d(), _("span", Wi, [
            F("span", Hi, D(n.calcMainLabel(r)), 1),
            F("span", Ji, D(n.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote-method"]);
}
const Yi = /* @__PURE__ */ E(zi, [["render", Ki], ["__scopeId", "data-v-d36889f6"]]), Pe = {
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
}, Gi = [{
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
function Qi() {
  const e = window.isMobile ? "small" : "", {
    config: t,
    columns: s,
    visible: i,
    conditions: l,
    expression: n,
    handleSearch: o,
    handleReset: a,
    handleAdd: r,
    handleDelete: h,
    handleSelectField: p,
    handleSelectOp: w
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
    modelValue: i,
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
      default: () => [$("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [l.map((y, O) => m("div", {
      class: "condition flex-center",
      key: y.no
    }, [t.traditional ? null : m(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(O)
    }, {
      default: () => [$("X")]
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
      onChange: (k) => w(y, k),
      options: y.ops
    }, null), m("div", {
      class: "value-container"
    }, [Zi(this, y)])])]))]), t.traditional ? null : m(u("el-input"), b({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: n,
      "onUpdate:modelValue": (y) => this.expression = y
    }), null)]
  });
}
function Zi(e, t) {
  const s = (l) => G(u((l == null ? void 0 : l.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (n) => t.value = n
  }, l)), i = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? m("div", {
    class: "col-2"
  }, [s({
    ...i,
    modelValue: t.value[0],
    "onUpdate:modelValue": (l) => t.value[0] = l
  }), s({
    ...i,
    modelValue: t.value[1],
    "onUpdate:modelValue": (l) => t.value[1] = l
  })]) : ["in", "notIn"].includes(t.op) ? (i.multiple = !0, s(i)) : t.op === "special" ? s({
    ...i,
    component: "x-select",
    placeholder: "请选择特殊值",
    options: Gi
  }) : s();
}
const { storage: ge } = StardustBrowser, { deepCopy: el } = StardustJs.funcs, tl = {
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
  render: Qi,
  methods: {
    init() {
      const e = this.uid && ge.local.getJson(this.key, this.config) || this.config;
      this.initConfig(el(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      ge.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: s, component: i, ...l } = e;
          return l;
        }),
        expression: this.expression
      });
    },
    initConfig(e) {
      var t, s;
      (t = e.conditions) == null || t.forEach((i) => {
        const { prop: l, op: n, value: o } = i;
        i.item = this.columns.find((a) => a.prop === l), this.handleSelectField(i, l), this.handleSelectOp(i, n), i.value = o, i.ops = X[i.component].map((a) => Pe[a]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((i) => i.no)) + 1), Object.assign(this, e);
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
      ge.local.remove(this.key), Object.assign(this, {
        conditionNo: 1,
        conditions: [],
        expression: ""
      }), this.init();
    },
    calcParams() {
      const e = this.calcTree();
      if (!e)
        return;
      const t = (i, l) => {
        const n = [], o = "[Op." + i.type + "]";
        l[o] = n;
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
            n.push(this.parseCondition(r));
          } else {
            const r = {};
            n.push(r), t(a, r);
          }
        n.length || delete l[o];
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((l) => l.trim()), s = (l, n) => {
        for (; n.length; ) {
          const o = n.shift();
          if (["and", "or"].includes(o)) {
            if (l.type && l.type !== o)
              throw "串联不同逻辑表达式请使用小括号区分";
            l.type = o;
          } else if (o === "(") {
            const a = { type: "", items: [] };
            l.items.push(a), a._parent = l, s(a, n);
            break;
          } else
            o === ")" ? (s(l._parent, n), delete l._parent) : l.items.push(o);
        }
      }, i = { type: "", items: [] };
      return s(i, t), i.type = i.type || "and", i;
    },
    parseCondition(e) {
      let { prop: t, op: s, value: i } = e;
      const l = {};
      if (s === "special") {
        const n = i.startsWith("NOT_"), o = i.startsWith("NE_");
        return i.includes("NULL") ? i = null : i.includes("BLANK") && (i = ""), n ? i = { "[Op.not]": i } : o && (i = { "[Op.ne]": i }), l[t] = i, l;
      }
      return (s === "like" || s === "notLike") && (i = "%" + i + "%"), l[t] = {
        [`[Op.${s}]`]: i
      }, l;
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
      const { options: s, type: i, formAttrs: l = {} } = e.item, n = { ...e.item, ...l }, {
        comp: o,
        visible: a,
        canAdd: r,
        canEdit: h,
        required: p,
        slot: w,
        span: y,
        tableAttrs: O,
        formAttrs: k,
        tagTypes: R,
        tagValues: g,
        width: C,
        minWidth: T,
        disabled: q,
        readonly: z,
        ...A
      } = n;
      A.clearable ?? (A.clearable = !0), e.config = A, e.component = o || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = X[e.component].map((V) => Pe[V]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", A.type = "date"), A.type === "textarea" && delete A.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, Ae = /* @__PURE__ */ E(tl, [["__scopeId", "data-v-69b3e55b"]]), sl = {
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
  components: { Searcher: Ae },
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
}, nl = { class: "mobile-x-table" }, il = {
  key: 1,
  class: "card"
}, ll = ["onClick"], ol = { class: "row-header flex-center" }, al = ["value", "checked"], rl = { class: "label" }, dl = { class: "value" }, cl = ["value", "checked"], ul = {
  key: 2,
  class: "index"
}, hl = { class: "title" };
function ml(e, t, s, i, l, n) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("x-icon"), p = u("van-cell"), w = u("van-list"), y = u("x-pagination"), O = u("x-info"), k = u("van-popup"), R = u("van-action-sheet");
  return d(), _("div", nl, [
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
    }), se({ _: 2 }, [
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
    (s.mode || e._attrs.mode) === "card" ? (d(), _("div", il, [
      (d(!0), _(I, null, M(e._data, (g, C) => (d(), _("div", {
        key: C,
        class: "row",
        onClick: (T) => n.handleClickCard(C)
      }, [
        F("div", ol, [
          n.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: l.selected[C],
            "onUpdate:modelValue": (T) => l.selected[C] = T,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = Z(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
          m(h, {
            name: "ellipsis",
            class: "more",
            onClick: Z((T) => n.handleShowActionSheet(g, C), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        n.hasRadio ? (d(), _("input", {
          key: 0,
          type: "radio",
          value: C,
          checked: C === l.checked,
          class: "radio",
          onClick: t[1] || (t[1] = Z(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
        }, null, 40, al)) : S("", !0),
        (d(!0), _(I, null, M(n.cols, (T, q) => (d(), _("div", {
          key: q,
          class: "field"
        }, [
          F("span", rl, D(T.label) + ":", 1),
          F("span", dl, D(e.calcValue(g, T)), 1)
        ]))), 128))
      ], 8, ll))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(w, b({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (g) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), _(I, null, M(e._data, (g, C) => (d(), f(p, {
          key: C,
          "is-link": "",
          onClick: (T) => n.handleShowDetail(g, C)
        }, {
          default: c(() => [
            n.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: l.selected[C],
              "onUpdate:modelValue": (T) => l.selected[C] = T,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = Z(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
            n.hasRadio ? (d(), _("input", {
              key: 1,
              type: "radio",
              value: C,
              checked: C === l.checked,
              class: "radio",
              onClick: t[4] || (t[4] = Z(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
            }, null, 40, cl)) : S("", !0),
            n.hasIndex ? (d(), _("span", ul, D(C + 1), 1)) : S("", !0),
            F("span", hl, D(n.calcTitle(g)), 1)
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
      show: l.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (g) => l.popupVisible = g),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        m(O, {
          data: l.scope.row,
          fields: n.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    m(R, {
      show: l.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (g) => l.actionSheetVisible = g),
      actions: n.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: n.handleSelectAction,
      onCancel: t[10] || (t[10] = (g) => l.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const pl = /* @__PURE__ */ E(sl, [["render", ml], ["__scopeId", "data-v-84e93229"]]), fl = {
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
      sortableColumns: [],
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
        })), this.sortableColumns = this.columns.filter((t) => !t.virtual);
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
          const s = [...t.to.querySelectorAll(".row")].map((i) => i.dataset.prop);
          this.columns = s.map((i) => e[i]), this.update();
        }
      });
    },
    handleAddSort() {
      this.sorts.push([this.sortableColumns[0].prop, "asc", this.sortableColumns[0].label]);
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
          const { prop: t, label: s, show: i, hide: l, width: n } = e;
          return { prop: t, label: s, show: i, hide: l, width: n };
        })
      });
    }
  }
}, gl = (e) => (ke("data-v-a2f0fe24"), e = e(), Ce(), e), bl = {
  class: "table",
  ref: "colsTable"
}, _l = ["data-prop"], yl = ["title", "onClick"], vl = /* @__PURE__ */ gl(() => /* @__PURE__ */ F("span", { class: "unit" }, "px", -1)), wl = {
  class: "table",
  ref: "sortsTable"
}, Sl = ["data-prop"];
function kl(e, t, s, i, l, n) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), h = u("ElCheckbox"), p = u("el-input-number"), w = u("el-tab-pane"), y = u("x-select"), O = u("x-radios"), k = u("el-tabs"), R = u("el-popover");
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
        modelValue: l.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => l.activeName = g)
      }, {
        default: c(() => [
          m(w, {
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              m(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: n.handleResetColumns
              }, {
                default: c(() => [
                  $("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              F("div", bl, [
                (d(!0), _(I, null, M(l.columns, (g) => (d(), _("div", {
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
                    "onUpdate:modelValue": (C) => g.show = C,
                    onChange: n.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  F("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (C) => n.handleToggle(g)
                  }, D(g.label), 9, yl),
                  m(p, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (C) => g.width = C,
                    onChange: n.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  vl
                ], 8, _l))), 128))
              ], 512)
            ]),
            _: 1
          }),
          m(w, {
            name: "sorts",
            label: "多列排序"
          }, {
            default: c(() => [
              m(o, {
                type: "primary",
                plain: "",
                icon: "Plus",
                onClick: n.handleAddSort
              }, {
                default: c(() => [
                  $("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              F("div", wl, [
                (d(!0), _(I, null, M(l.sorts, (g, C) => (d(), _("div", {
                  key: g[0],
                  "data-prop": g[0],
                  class: "row flex-center"
                }, [
                  m(y, {
                    modelValue: g[0],
                    "onUpdate:modelValue": (T) => g[0] = T,
                    options: l.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(O, {
                    modelValue: g[1],
                    "onUpdate:modelValue": (T) => g[1] = T,
                    options: l.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (T) => l.sorts.splice(C, 1)
                  }, null, 8, ["onClick"])
                ], 8, Sl))), 128))
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
const lt = /* @__PURE__ */ E(fl, [["render", kl], ["__scopeId", "data-v-a2f0fe24"]]), { highdict: Cl } = StardustJs, $l = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...U.props()
  },
  emits: [
    ...U.emits()
  ],
  components: { Searcher: Ae, Settings: lt },
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
        ...ue()
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
        const i = this.controller.getSearchParams(), l = await this.controller.search(i);
        let n = Cl.get(l, this.controller.listProp);
        return n = this.controller.formatList(this.controller._defaultFormatList(n, l), l), n;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, xl = {
  key: 1,
  class: "collapse-title"
}, Vl = {
  key: 2,
  class: "collapse-title"
}, El = /* @__PURE__ */ F("span", null, "-", -1), Al = ["value", "checked"], Ol = { key: 1 };
function Dl(e, t, s, i, l, n) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), p = u("el-image"), w = u("el-tag"), y = u("el-icon"), O = u("el-table-column"), k = u("el-button"), R = u("el-dropdown-item"), g = u("el-dropdown-menu"), C = u("el-dropdown"), T = u("el-table"), q = u("x-pagination"), z = u("el-collapse-item"), A = u("el-collapse"), V = u("x-chart"), j = u("x-dialog"), L = ee("domid"), N = ee("loading"), le = ee("el-table-infinite-scroll");
  return d(), _(I, null, [
    F("div", {
      class: K(["pc-x-table", { fullscreen: l.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      m(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      m(A, {
        modelValue: l.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (v) => l.activeNames = v),
        class: K((l._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          m(z, {
            name: l.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : l.activeNames.length ? (d(), _("span", xl, D(e.title), 1)) : (d(), _("span", Vl, [
                $(D(e.title) + "，当前第 ", 1),
                F("span", null, D(e._query.page), 1),
                $(" 页，展示 "),
                F("span", null, D(e._data.length), 1),
                $(" 条数据， 共 "),
                F("span", null, D(e._total || e._data.length), 1),
                $(" 条数据 ")
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
              }), se({
                "tools-end": c(() => [
                  e.hideChart ? S("", !0) : (d(), f(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: n.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  F("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...v) => e.handleMinus && e.handleMinus(...v))
                  }, [
                    m(a, { name: "FullScreen" }),
                    El
                  ]),
                  m(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  m(r, {
                    modelValue: l.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (v) => l.settings = v),
                    visible: !e.hideSettings,
                    width: e._attrs["cols-popover-width"] || 500,
                    onSort: t[2] || (t[2] = (v) => e.$emit("sort", v)),
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
              B((d(), f(T, b({ ref: "tableRef" }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._infiniteScrollDisabled,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), _(I, null, M(e._visibleColumns, (v, H) => (d(), f(O, b(v, {
                    key: H,
                    "min-width": v.minWidth,
                    align: v.align || e._attrs.tableAlign || "center",
                    resizable: v.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(v)
                  }), se({ _: 2 }, [
                    ["selection", "index"].includes(v.type) ? void 0 : {
                      name: "default",
                      fn: c((P) => [
                        v.type === "radio" ? (d(), _("input", {
                          key: 0,
                          type: "radio",
                          value: P.$index,
                          checked: P.$index === l.checked,
                          onChange: t[3] || (t[3] = (...pe) => e.handleCheckedChange && e.handleCheckedChange(...pe))
                        }, null, 40, Al)) : v.slot === "$image" ? (d(), f(p, b({
                          key: 1,
                          src: e._imageSrc(P, v),
                          "preview-src-list": e._imagePreviewSrcList(P, v),
                          "preview-teleported": ""
                        }, v.imageAttrs), null, 16, ["src", "preview-src-list"])) : v.slot === "$tag" ? (d(), f(w, {
                          key: 2,
                          type: e.calcTagType(P, v)
                        }, {
                          default: c(() => [
                            $(D(e.calcTagValue(P, v)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : v.slot === "$icon" ? (d(), f(y, {
                          key: 3,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(ne(P.row[v.prop])))
                          ]),
                          _: 2
                        }, 1024)) : v.slot ? x(e.$slots, v.slot, {
                          key: 4,
                          scope: P,
                          column: v,
                          value: P.row[v.prop]
                        }) : e.slotAll ? x(e.$slots, "all", {
                          key: 5,
                          scope: P,
                          column: v,
                          value: P.row[v.prop]
                        }) : (d(), _(I, { key: 6 }, [
                          v.comp === "ElSwitch" || e.table.isRowEdit && P.row.isEditing && (v.visible !== !1 || v.canEdit) ? (d(), f(ne(v.comp || "ElInput"), b({ key: 0 }, { ...v, ...v.formAttrs }, {
                            modelValue: P.row[v.prop],
                            "onUpdate:modelValue": (pe) => P.row[v.prop] = pe,
                            disabled: !P.row.editable || !P.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), _("span", Ol, D(e.calcValue(P.row, v)), 1))
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
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((v) => [
                      x(e.$slots, "operates-prefix", { scope: v }),
                      e.operatesDropdown ? (d(), f(C, {
                        key: 0,
                        class: "operates-dropdown"
                      }, {
                        dropdown: c(() => [
                          m(g, { class: "operates-dropdown-menu" }, {
                            default: c(() => [
                              e.canEdit(v.row) ? (d(), f(R, { key: 0 }, {
                                default: c(() => [
                                  B((d(), f(k, b({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    onClick: (H) => e._emit("edit", v)
                                  }), {
                                    default: c(() => [
                                      $(" 编辑 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [L, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : S("", !0),
                              e.canSave(v.row) ? (d(), f(R, { key: 1 }, {
                                default: c(() => [
                                  B((d(), f(k, b({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: v.row._loading,
                                    icon: "collection",
                                    onClick: (H) => e._emit("row-edit", v)
                                  }), {
                                    default: c(() => [
                                      $(" 保存 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [N, v.row._loading],
                                    [L, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : S("", !0),
                              e.canCancelEdit(v.row) ? (d(), f(R, { key: 2 }, {
                                default: c(() => [
                                  B((d(), f(k, b({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    onClick: (H) => e._emit("cancel-edit", v)
                                  }), {
                                    default: c(() => [
                                      $(" 取消编辑 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [L, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : S("", !0),
                              e.canDelete(v.row) ? (d(), f(R, { key: 3 }, {
                                default: c(() => [
                                  B((d(), f(k, b({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    onClick: (H) => e._emit("delete", v)
                                  }), {
                                    default: c(() => [
                                      $(" 删除 ")
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [L, e.domids.delete]
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
                              $(" 操作 ")
                            ]),
                            _: 1
                          }, 16)
                        ]),
                        _: 2
                      }, 1024)) : S("", !0),
                      !e.operatesDropdown && e.canEdit(v.row) ? B((d(), f(k, b({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        onClick: (H) => e._emit("edit", v)
                      }), {
                        default: c(() => [
                          $(" 编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [L, e.domids.edit]
                      ]) : S("", !0),
                      !e.operatesDropdown && e.canSave(v.row) ? B((d(), f(k, b({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: v.row._loading,
                        icon: "collection",
                        onClick: (H) => e._emit("row-edit", v)
                      }), {
                        default: c(() => [
                          $(" 保存 ")
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [N, v.row._loading],
                        [L, e.domids["row-edit"]]
                      ]) : S("", !0),
                      !e.operatesDropdown && e.canCancelEdit(v.row) ? B((d(), f(k, b({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        onClick: (H) => e._emit("cancel-edit", v)
                      }), {
                        default: c(() => [
                          $(" 取消编辑 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [L, e.domids["cancel-edit"]]
                      ]) : S("", !0),
                      !e.operatesDropdown && e.canDelete(v.row) ? B((d(), f(k, b({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        onClick: (H) => e._emit("delete", v)
                      }), {
                        default: c(() => [
                          $(" 删除 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [L, e.domids.delete]
                      ]) : S("", !0),
                      x(e.$slots, "operates-suffix", { scope: v })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["infinite-scroll-disabled", "onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [N, e._loading],
                [le, e._onLoad]
              ]),
              e._query && e._total && e.hidePagination !== "" && e.hidePagination !== !0 ? (d(), f(q, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: n.onPaging
              }, null, 8, ["query", "total", "onSearch"])) : S("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? S("", !0) : (d(), f(j, {
      key: 0,
      modelValue: l.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (v) => l.dialog.visible = v),
      title: "图表",
      width: "96%",
      onFullscreenchange: n.handleChartDialogFullscreen
    }, {
      default: c(() => [
        m(V, {
          ref: "chartRef",
          height: e._chartHeight,
          option: e._chartOption,
          datasource: { columns: e._columns, search: n.search }
        }, null, 8, ["height", "option", "datasource"])
      ]),
      _: 1
    }, 8, ["modelValue", "onFullscreenchange"]))
  ], 64);
}
const Fl = /* @__PURE__ */ E($l, [["render", Dl]]), Tl = {
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
}, jl = { class: "mobile-x-table-tools" }, Rl = { key: 0 }, Bl = { class: "tools" }, Il = { class: "tools-end" };
function Ll(e, t, s, i, l, n) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), h = ee("domid");
  return d(), _("div", jl, [
    e.$attrs.onAdd ? B((d(), _("div", Rl, [
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
    F("div", Bl, [
      x(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? B((d(), f(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (p) => e.$emit("search"))
      }), {
        default: c(() => [
          m(a, { name: "search" }),
          $(" 查询 ")
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
          $(" 编辑 ")
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
          $(" 批量删除 ")
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
          $(" 导出 ")
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
          $(" 查询导出 ")
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
          $(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : S("", !0),
      x(e.$slots, "tools-suffix", {}, void 0, !0),
      F("div", Il, [
        x(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const Ml = /* @__PURE__ */ E(Tl, [["render", Ll], ["__scopeId", "data-v-6ef6b95e"]]), Nl = {
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
}, Pl = { class: "tools" }, Ul = { class: "tools-end flex-center" };
function ql(e, t, s, i, l, n) {
  const o = u("el-button"), a = u("el-card"), r = ee("domid");
  return d(), f(a, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      F("div", Pl, [
        x(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? B((d(), f(o, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          onClick: t[0] || (t[0] = (h) => e.$emit("search"))
        }), {
          default: c(() => [
            $(" 查询 ")
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
            $(" 新增 ")
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
            $(" 编辑 ")
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
            $(" 批量删除 ")
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
            $(" 导出 ")
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
            $(" 查询导出 ")
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
            $(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.import]
        ]) : S("", !0),
        x(e.$slots, "tools-suffix", {}, void 0, !0),
        F("div", Ul, [
          x(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Xl = /* @__PURE__ */ E(Nl, [["render", ql], ["__scopeId", "data-v-368940cf"]]);
function ot(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Xe(e);
}
const zl = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, i = (l) => {
    l ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const n = l ? e._data.slice() : [];
    e.handleSelectionChange(n);
  };
  return m(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: i
  }, null);
}, Wl = (e, t) => {
  const {
    rowIndex: s,
    rowData: i
  } = e, l = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const n = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(n);
  };
  return m(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: l
  }, null);
}, Hl = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, Jl = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return m("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, me = ([e, t, s, i, l, n]) => {
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
    type: i
  }, t._attrs[s + "-btn"], {
    icon: l,
    onClick: r
  }), ot(n) ? n : {
    default: () => [n]
  });
}, Kl = (e, t) => {
  if (t.canEdit(e.rowData))
    return me([e, t, "edit", "warning", "edit", "编辑"]);
}, Yl = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return me([e, t, "row-edit", "success", "collection", "保存"]);
}, Gl = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return me([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Ql = (e, t) => {
  if (t.canDelete(e.rowData))
    return me([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Zl = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: l = {}
  } = s;
  if (e.type === "selection")
    return (n) => Wl(n, t);
  if (e.type === "index")
    return (n) => Hl(n, t);
  if (e.type === "radio")
    return (n) => Jl(n, t);
  if (e.slot) {
    if (l[e.slot])
      return l[e.slot];
    if (i[e.slot])
      return (n) => i[e.slot]({
        scope: {
          $index: n.rowIndex,
          row: n.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (n) => i.all({
      scope: {
        $index: n.rowIndex,
        row: n.rowData
      },
      column: e
    });
  return (n) => {
    const {
      rowData: o,
      column: a
    } = n;
    if (a.comp === "ElSwitch" || t.table.isRowEdit && o.isEditing && (a.visible !== !1 || a.canEdit)) {
      const p = (y) => {
        o[a.prop] = y;
      }, w = a.comp || "ElInput";
      return G(u(w), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: p,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(n.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? m(u("el-tooltip"), {
      content: r
    }, ot(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, eo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, l = e.map((n, o) => {
    const {
      tableAttrs: a = {}
    } = n, r = {
      ...n,
      key: n.prop,
      dataKey: n.prop,
      title: n.label,
      width: n.width || a.width || n.minWidth || a.minWidth || n.maxWidth || a.maxWidth,
      align: n.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = zl(t)), r.cellRenderer = Zl(r, t), r;
  });
  return t.hideOperates || l.push({
    key: l.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(n) {
      return m("div", {
        class: "operates"
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, Kl(n, t), Yl(n, t), Gl(n, t), Ql(n, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), l;
}, to = {
  convertColumnsForTableV2: eo
}, so = {
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
  components: { Searcher: Ae, Settings: lt },
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
    convertColumnsForTableV2: to.convertColumnsForTableV2
  }
}, no = { key: 1 };
function io(e, t, s, i, l, n) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), p = u("el-table-v2"), w = u("el-auto-resizer"), y = u("x-pagination"), O = u("el-collapse-item"), k = u("el-collapse"), R = ee("loading");
  return d(), _("div", {
    class: K(["pc-x-table-v2", { fullscreen: l.isFullscreen }])
  }, [
    m(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (g) => e._emit("search", g))
    }, null, 8, ["uid", "columns", "config"]),
    m(k, {
      modelValue: l.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (g) => l.activeNames = g),
      class: K((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        m(O, {
          name: l.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", no, D(e.title), 1))
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
            }), se({
              "tools-end": c(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(r, {
                  modelValue: l.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (g) => l.settings = g),
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
            m(w, {
              style: rt({ height: s.height })
            }, {
              default: c(({ width: g, height: C }) => [
                B((d(), f(p, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: n.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: g,
                  height: C
                }), se({ _: 2 }, [
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
const lo = /* @__PURE__ */ E(so, [["render", io]]), be = ["selection", "radio"], oo = {
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
      be.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !be.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (be.includes(t)) {
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
}, ao = { class: "x-table-viewer" };
function ro(e, t, s, i, l, n) {
  const o = u("x-dialog");
  return d(), _("div", ao, [
    m(o, b(n._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": n.handleBeforeClose,
      onSubmit: n.handleSubmit,
      onCancel: n.handleCancel
    }), {
      default: c(() => [
        (d(), f(ne(s.useTableV2 ? "x-table-v2" : "x-table"), b({
          tref: n.table.tableRef,
          "onUpdate:tref": t[0] || (t[0] = (a) => n.table.tableRef = a),
          table: n.table
        }, n._tableAttrs, {
          onSearch: s.controller.handleSearch
        }), null, 16, ["tref", "table", "onSearch"]))
      ]),
      _: 1
    }, 16, ["modelValue", "title", "before-close", "onSubmit", "onCancel"])
  ]);
}
const co = /* @__PURE__ */ E(oo, [["render", ro], ["__scopeId", "data-v-e6f36700"]]), uo = {
  name: "MobileXTags",
  props: {
    data: Array
  },
  emits: ["close"],
  computed: {
    _data() {
      var e;
      return (e = this.data) != null && e.length ? this.data.map((t) => typeof t == "object" ? t : { text: t }) : [];
    }
  }
}, ho = { class: "mobile-x-tags" };
function mo(e, t, s, i, l, n) {
  const o = u("van-tag");
  return d(), _("div", ho, [
    (d(!0), _(I, null, M(n._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a.text, r)
    }), {
      default: c(() => [
        $(D(a.text), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const po = /* @__PURE__ */ E(uo, [["render", mo], ["__scopeId", "data-v-00235f22"]]), fo = {
  name: "PcXTags",
  props: {
    data: Array
  },
  emits: ["close"],
  computed: {
    _data() {
      var e;
      return (e = this.data) != null && e.length ? this.data.map((t) => typeof t == "object" ? t : { text: t }) : [];
    }
  }
}, go = { class: "pc-x-tags" };
function bo(e, t, s, i, l, n) {
  const o = u("el-tag");
  return d(), _("div", go, [
    (d(!0), _(I, null, M(n._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a.text, r)
    }), {
      default: c(() => [
        $(D(a.text), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const _o = /* @__PURE__ */ E(fo, [["render", bo], ["__scopeId", "data-v-4674d140"]]), yo = {
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
}, vo = { class: "x-tinymce" }, wo = ["id", "innerHTML"];
function So(e, t, s, i, l, n) {
  return d(), _("div", vo, [
    F("textarea", {
      id: l.id,
      innerHTML: s.modelValue
    }, null, 8, wo)
  ]);
}
const ko = /* @__PURE__ */ E(yo, [["render", So]]), Co = {
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
      var l;
      const i = ((l = this.service) == null ? void 0 : l.API_BASE_URL) + "/" + e.filename;
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
        s = s.map((l) => i + l), this.$emit("update:modelValue", s);
      } catch (t) {
        return this.$message.error(t.toString());
      }
    }
  }
}, Oe = (e) => (ke("data-v-a3a105f3"), e = e(), Ce(), e), $o = { class: "mask" }, xo = {
  key: 0,
  class: "el-upload__text"
}, Vo = /* @__PURE__ */ Oe(() => /* @__PURE__ */ F("em", null, "点击上传", -1)), Eo = /* @__PURE__ */ Oe(() => /* @__PURE__ */ F("br", null, null, -1)), Ao = /* @__PURE__ */ Oe(() => /* @__PURE__ */ F("br", null, null, -1)), Oo = {
  key: 0,
  class: "path"
};
function Do(e, t, s, i, l, n) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), f(r, b({
    "file-list": l.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (h) => l.fileList = h),
    drag: "",
    disabled: l.disabled,
    action: n.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": n.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: c(() => [
      F("div", $o, [
        m(o, { name: "upload-filled" }),
        l.disabled ? S("", !0) : (d(), _("div", xo, [
          $(" 将文件拖到此处，或"),
          Vo,
          Eo,
          Ao,
          s.needUpload && !l.disabled && l.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: Z(n.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              $(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : S("", !0)
        ]))
      ]),
      n.filepath ? (d(), _("div", Oo, D(s.modelValue), 1)) : S("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Fo = /* @__PURE__ */ E(Co, [["render", Do], ["__scopeId", "data-v-a3a105f3"]]), To = {
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
}, jo = ["src"];
function Ro(e, t, s, i, l, n) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("el-dialog");
  return d(), _(I, null, [
    m(r, b({
      "file-list": l.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (p) => l.fileList = p),
        n.handleSelect
      ],
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: n.limit,
      class: ["x-image-uploader", { disabled: e.$attrs.disabled || n.images.length >= n.limit }],
      "on-preview": n.handlePreview,
      "on-exceed": n.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1,
      "on-remove": n.handleRemove
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
      modelValue: l.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (p) => l.dialogVisible = p),
      title: "预览图片" + l.previewingImage.name
    }, {
      default: c(() => [
        F("img", {
          src: l.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, jo)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const Bo = /* @__PURE__ */ E(To, [["render", Ro], ["__scopeId", "data-v-87a71ccc"]]), _e = {
  xactionsheet: Ft,
  xautorows: It,
  mobilexbutton: Nt,
  pcxbutton: qt,
  xchart: Zt,
  mobilexcheckboxs: ss,
  pcxcheckboxs: ls,
  mobilexcol: rs,
  pcxcol: us,
  mobilexdialog: fs,
  pcxdialog: ys,
  xdistrictselect: Ss,
  mobilexform: Ts,
  pcxform: Is,
  mobilexformitem: Ps,
  pcxformitem: Us,
  mobilexicon: Ws,
  pcxicon: Ys,
  xinfo: oi,
  xlooper: ci,
  mobilexpagination: mi,
  pcxpagination: gi,
  xpicker: yi,
  mobilexradios: Si,
  pcxradios: $i,
  mobilexrow: Ai,
  pcxrow: Ti,
  mobilexscan: Bi,
  pcxscan: Mi,
  mobilexselect: Xi,
  pcxselect: Yi,
  mobilextable: pl,
  pcxtable: Fl,
  mobilextabletools: Ml,
  pcxtabletools: Xl,
  xtablev2: lo,
  xtableviewer: co,
  mobilextags: po,
  pcxtags: _o,
  xtinymce: ko,
  xfileuploader: Fo,
  ximageuploader: Bo
}, ae = {};
for (let e in _e)
  ae[_e[e].name] = _e[e];
const Io = (e) => ({
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
    return G(ae[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), we = (() => {
  const e = Object.keys(ae), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = ae[i]);
  for (const i of t)
    e.find((l) => /(pc|mobile)/i.test(l) && l.toLowerCase().includes(i.toLowerCase())) ? s[i] = Io(i) : s[i] = ae[i];
  return s;
})(), Lo = (e, t) => {
  for (let s in we)
    e.component(s, we[s]);
}, No = {
  version: "1.1.53",
  ...we,
  ...et,
  ...At,
  install: Lo
};
export {
  tt as BaseController,
  te as Confirm,
  st as CrudController,
  W as Message,
  de as Notify,
  Et as TempCrudController,
  ue as baseDialog,
  We as baseForm,
  Ct as baseModel,
  He as baseTable,
  At as controllers,
  No as default,
  ut as effects,
  Y as formatOptions,
  ht as formatPrecision,
  Ge as initDefaultForm,
  Ke as initDialog,
  $t as initFields,
  $e as initForm,
  Ye as initFormRules,
  xt as initModel,
  Je as initTable,
  Qe as isWhenMatched,
  Ze as triggers,
  et as utils,
  ze as validateForm
};
