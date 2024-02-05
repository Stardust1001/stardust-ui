import { toRaw as ut, nextTick as oe, watch as Ce, resolveComponent as u, openBlock as d, createBlock as f, mergeProps as b, createElementBlock as _, Fragment as B, renderList as M, withCtx as c, renderSlot as x, toDisplayString as T, useCssVars as We, resolveDirective as te, withDirectives as I, createElementVNode as j, createTextVNode as $, createVNode as m, createCommentVNode as S, vShow as Fe, pushScopeId as $e, popScopeId as xe, resolveDynamicComponent as G, createSlots as ne, normalizeClass as K, normalizeProps as ue, guardReactiveProps as He, h as Q, isVNode as Je, withModifiers as ee, normalizeStyle as ht } from "vue";
const mt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class i {
    constructor(V, D, L, N, le, v, H) {
      this.x = V, this.y = D, this.radius = L, this.color = N, this.vx = le, this.vy = v, this.ctx = H;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const n = () => l.clearRect(0, 0, t, s), o = (A) => Math.floor(Math.random() * A);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const A = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = O * 30), a >= 1 && (a = 1, r = -r, h = O * 30)), A.addColorStop(0, "rgba(250, 220, 20, 0.5)"), A.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = A, l.fillRect(0, 0, t, s);
  }, w = Math.floor(t / 100), y = Math.floor(s / 100), O = 20, k = Math.round(1e3 / O), R = Array.from({ length: 52 }).map(() => {
    const A = Math.floor(o(w + y) * 1.5 + o(5));
    let V = o(t), D = o(s);
    V = Math.min(Math.max(A, V), t - A), D = Math.min(Math.max(A, D), s - A);
    let L = o(2) ? (o(2) + 2) * w : (o(-1) - 2) * w, N = o(2) ? (o(2) + 2) * y : (o(-1) - 2) * y;
    return L = Math.floor(L / O), N = Math.floor(N / O), new i(
      V,
      D,
      A,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      L,
      N,
      l
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
    const V = A.pageX - g, D = A.pageY - C;
    R.forEach((L) => {
      L.x += V / O, L.y += D / O;
    }), g = A.pageX, C = A.pageY;
  });
  let F = Date.now(), q = null;
  const z = () => {
    Date.now() - F >= k && (n(), p(), R.forEach((A) => A.update()), F = Date.now()), q = requestAnimationFrame(z);
  };
  return q = requestAnimationFrame(z), () => cancelAnimationFrame(q);
}, pt = ({
  text: e,
  gap: t,
  fontSize: s,
  color: l,
  width: i = window.innerWidth,
  height: n = window.innerHeight,
  drawMode: o = "fill"
}) => {
  const a = document.createElement("canvas");
  a.width = i, a.height = n;
  const r = a.getContext("2d");
  r.font = `${s}px Arial`, r[o + "Style"] = l;
  const p = r.measureText(e).width + t, w = s + t;
  for (let y = t / 2; y < n; y += w)
    for (let O = t / 2; O < i; O += p)
      r[o + "Text"](e, O, y);
  return a;
}, ft = {
  pop: mt,
  createWatermark: pt
}, Ke = async (e) => {
  var l, i;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((i = e.formItems) == null ? void 0 : i.filter((n) => {
    var o, a;
    return ((o = n.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = n.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((n) => Ke(n.form)));
  return t && s.every((n) => n);
}, gt = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, Y = (e, t) => {
  const l = (e.__v_isRef ? e.value : ut(e)).map((n) => typeof n == "object" ? n : { text: n, value: n });
  if (!t.sort)
    return l;
  const i = typeof t.sort == "string" ? t.sort : t.text || "text";
  return l.sort((n, o) => n[i].localeCompare(o[i]));
}, { ElMessage: bt, ElNotification: _t, ElMessageBox: yt } = window.ElementPlus || {}, { showToast: vt, showNotify: wt, showConfirmDialog: St } = window.vant || {}, W = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? ((l === "error" || l === "warning") && (t.type = "fail"), vt(t)) : bt({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, ce = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? (l === "error" && (t.type = "danger"), wt(t)) : _t({
    showClose: !0,
    ...t
  });
}, se = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = St(e) : t = yt.confirm(
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
  W[e] = W[e[0]] = (t) => W({ type: e, ...typeof t != "string" ? t : { message: t } }), ce[e] = ce[e[0]] = (t) => ce({ type: e, ...typeof t != "string" ? t : { message: t } }), se[e] = se[e[0]] = (t) => se({ type: e, ...t });
const kt = (e, t, s) => {
  e.beforeEach((l, i, n) => {
    l.matched.length ? n() : n("/404");
  });
}, Ct = (e, t, s) => {
  e.afterEach((l, i) => {
    const n = l.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...n].filter((o) => o).reverse().join("-");
  });
}, $t = (e, t, s) => {
  e.beforeEach((l, i, n) => {
    var o;
    return l.meta.acl === !1 || (o = l.meta) != null && o.visitable || t.acl.paths.includes(l.path) ? n() : (W.e("无权访问页面: " + l.path), n(t.acl.paths[0] || "/404"));
  }), oe(() => {
    let l = !1;
    Ce(() => t.acl.menus, (i) => {
      if (!l) {
        if (!i.length)
          return;
        l = !0;
      }
      const n = t.acl.paths, o = (a, r) => {
        var p, w, y, O, k, R, g;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (p = a.children) == null || p.forEach((C) => {
          var F;
          C.meta || (C.meta = {}), (F = C.meta).acl || (F.acl = !1), o(C, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((y = a.meta).hidden ?? (y.hidden = (w = r.meta) == null ? void 0 : w.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((k = a.meta).visitable ?? (k.visitable = (O = r.meta) == null ? void 0 : O.visitable), a.meta = { ...a.meta })), (R = a.children) == null || R.forEach((C) => o(C, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !n.includes(h), (g = a.children) != null && g.some((C) => C.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, xt = (e, t, s) => {
  e.beforeEach((l, i, n) => {
    l.name === "Login" && t.getters.logined && l.query.redirectTo ? n(l.query.redirectTo) : n();
  });
}, Vt = {
  check404: kt,
  setTitle: Ct,
  checkRolesPages: $t,
  redirectTo: xt
}, Ye = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), Ge = (e = {}) => ({
  loading: !1,
  query: {
    page: 1,
    limit: 10,
    order: [],
    ...e
  },
  total: 0,
  moreLoading: !1,
  finished: !1,
  isInfinite: !1,
  list: [],
  columns: [],
  tableRef: null,
  selection: [],
  checked: null,
  _isBaseTable: !0
}), he = () => ({
  ...Ye(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), Et = ({
  table: e = {},
  dialog: t = {},
  columns: s = [
    { fixed: "left", type: "selection" },
    { type: "_index" }
  ],
  query: l = {},
  form: i = {}
} = {}) => ({
  table: {
    ...Ge(l),
    ...e,
    columns: s
  },
  dialog: {
    ...he(),
    ...t,
    form: i
  }
}), { funcs: we } = StardustJs, At = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let l of s)
    l.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[l.slice(3)] = t[l], delete t[l]) : l.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[l.slice(3)] = t[l], delete t[l]);
  return t;
}), Ot = (e, t) => {
  for (let s in e) {
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && Qe(l, t), s === "dialog" && e[s]._isBaseDialog && Ze(l, t), s === "form" && e[s]._isBaseForm && Ve(l, t));
  }
  return e;
}, Qe = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), Ze = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), Ve(e, t), e), Ve = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), tt(e.form, e.formItems), e.initialForm = we.deepCopy(e.form), e.initialFormRules = we.deepCopy(e.formRules), Ce(() => e.formItems, () => {
  et(e);
}, { immediate: !0, deep: !0 }), e), et = (e) => {
  const { formItems: t, initialFormRules: s } = e, l = t.filter((n) => {
    let { formAttrs: o = {}, required: a = !1 } = n;
    return a = "required" in o ? o.required : a, !n.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(n.prop) && a !== !1;
  }).map((n) => n.prop);
  if (Object.assign(e.formRules, we.deepCopy(s)), Object.keys(e.formRules).forEach((n) => {
    n in s || delete e.formRules[n];
  }), !l.length)
    return;
  const i = {};
  return l.forEach((n) => {
    if (e.formRules[n])
      return;
    const o = t.find((O) => O.prop === n), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = nt[a], h = [], p = "options" in o, y = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${p ? "选择" : "输入"}${(o == null ? void 0 : o.label) || n}` };
    o.validator && (y.validator = o.validator), o.asyncValidator && (y.asyncValidator = o.asyncValidator), o.comp ? h.push({ ...y, trigger: r.change }) : h.push({ ...y, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...y, trigger: r.blur }), i[n] = h;
  }), Object.assign(e.formRules, i), e.formRules;
}, tt = (e, t, s = !0) => {
  const l = {};
  return t.forEach((i) => {
    var h, p;
    let n = "";
    const { type: o, options: a } = i, { multiple: r } = i.formAttrs || {};
    if (s && o === "number" || i.comp === "ElInputNumber")
      n = 0;
    else if (i.comp === "ElSwitch")
      n = !1;
    else if (a && ((h = i.comp) != null && h.endsWith("XCheckboxs") || (p = i.comp) != null && p.endsWith("x-checkboxs") || r))
      n = [];
    else if (i.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(i.type)) {
      const w = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[i.type];
      i["start-placeholder"] || (i["start-placeholder"] = "开始" + w), i["end-placeholder"] || (i["end-placeholder"] = "结束" + w), n = [];
    }
    l[i.prop] = n;
  }), Object.assign(e, { ...l, ...e }), e;
}, st = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [l, i] = e.split(s);
  i = i.split("|");
  let n = t[l];
  typeof n == "number" ? n += "" : typeof n == "string" && (n = n.trim());
  const o = e.match(s)[0];
  return i.some((a) => o === "^=" ? n.startsWith(a) : o === "*=" ? n.includes(a) : o === "$=" ? n.endsWith(a) : o === "~=" ? !n.includes(a) : o === "!=" ? n !== a : a === n);
}, nt = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, it = {
  effects: ft,
  validateForm: Ke,
  formatPrecision: gt,
  formatOptions: Y,
  Message: W,
  Notify: ce,
  Confirm: se,
  middlewares: Vt,
  baseForm: Ye,
  baseTable: Ge,
  baseDialog: he,
  baseModel: Et,
  initFields: At,
  initModel: Ot,
  initTable: Qe,
  initDialog: Ze,
  initForm: Ve,
  initFormRules: et,
  initDefaultForm: tt,
  isWhenMatched: st,
  triggers: nt
};
class lt {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const l = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => l }
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
    return it;
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
const { funcs: De, highdict: Re, dates: ge } = StardustJs, { file: Ie, excel: re } = StardustBrowser;
class ot extends lt {
  constructor(t) {
    super(t);
    const { model: s, table: l, dialog: i, dbModelName: n = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = l || (s == null ? void 0 : s.table), this.dialog = i || (s == null ? void 0 : s.dialog), this.dbModelName = n, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], oe(() => {
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
  async handleSearch(t, { isInfinite: s = !1 } = {}) {
    if (this.table.isInfinite = s, !await this.beforeSearch(t))
      return;
    t = this.getSearchParams(t), this.table.loading = !0;
    const l = await this.search(t);
    let i = Re.get(l, this.listProp);
    return i = this.formatList(this._defaultFormatList(i, l), l), Object.assign(this.table, {
      list: i,
      total: l.total,
      loading: !1
    }), this.afterSearch(i, t, l), l;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await oe(), await De.sleep(50), this._clearValidate(), this.afterAdd());
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
    }), await oe(), (l = this.dialog.formRef) == null || l.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (!await this.beforeDelete({ $index: t, row: s }))
      return;
    if (await se.w({ message: "确定要删除吗？", title: "警告" })) {
      const i = this.getDeleteParams(s), n = await this.remove(i, s);
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
    const { list: l, selection: i, ref: n } = this.table;
    let o = i.length > 0 ? i : l;
    o = De.deepCopy(o), o = this.processExportingData(o);
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
    const l = await this.dbTable.search(this.getSearchExportParams());
    let i = l.data;
    i = this.formatList(i, l), i = this.processExportingData(i, "search");
    const n = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = n.map((p) => p.prop), a = n.map((p) => p.label);
    i = i.map((p) => o.map((w) => p[w]));
    let r = null;
    t === "csv" ? r = re.export2Csv : r = re.export2Excel;
    let h = { header: a, data: i, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    var n, o;
    const t = await Ie.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), l = await Ie.toType(t, s ? "text" : "arraybuffer");
    let i = [];
    if (s)
      await ((n = window.DynamicLibs) == null ? void 0 : n.use("Papa")), i = window.Papa.parse(l, { header: !0 }).data;
    else {
      await ((o = window.DynamicLibs) == null ? void 0 : o.use("XLSX"));
      const a = window.XLSX.read(l, {}), r = Object.values(a.Sheets);
      i = XLSX.utils.sheet_to_json(r[0]);
    }
    if (i.length > 0) {
      const a = {};
      this.table.columns.forEach((h) => a[h.label] = h.prop);
      const r = Object.keys(i[0]);
      i = i.map((h) => {
        const p = {};
        return r.forEach((w) => p[a[w]] = h[w]), p;
      });
    }
    i = this.processImportingData(i), await this.dbTable.func(["bulkCreate", i]), W.s("导入成功"), this.handleSearch();
  }
  async handleMultiDelete() {
    const { selection: t } = this.table;
    if (!t.length) {
      W.w("尚未选择要删除的数据");
      return;
    }
    if (!await se.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
      return;
    const l = t.map((i) => i[this.idField]);
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
    let i = null;
    try {
      t[this.idField] ? i = await this.update(l, t[this.idField]) : i = await this.add(l);
    } catch (n) {
      this._showError(n.data.err), this._isSubmitting = !1;
      return;
    }
    return this._isSubmitting = !1, i.err || W.s("保存成功"), this.router.go(-1), i;
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
        const i = this.getUpdateParams(s);
        if (!await this._checkAllNone(i))
          return this._isSubmitting = !1, !1;
        l = await this.update(i, this.dialog.editingRow[this.idField]);
      } else {
        const i = this.getAddParams(s);
        if (!await this._checkAllNone(i))
          return this._isSubmitting = !1, !1;
        l = await this.add(i);
      }
    } catch (i) {
      return this._showError(i.data.err), this._isSubmitting = !1, !1;
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
  async handleLoad() {
    if (!this.table.list.length)
      return await this.handleSearch(), this.table.moreLoading = !1;
    const { loading: t, query: s, total: l } = this.table;
    if (t || !l || this.table.finished)
      return this.table.moreLoading = !1;
    if (s.page * s.limit >= l)
      return this.table.moreLoading = !1, this.table.finished = !0;
    this.table.isInfinite = !0, this.table.loading = !0, s.page++;
    const i = this.table.list.slice();
    await this.handleSearch({}, { isInfinite: !0 }), this.table.loading = !0, await this.$sleep(50), this.table.list = i.concat(this.table.list), this.table.loading = !1, this.table.moreLoading = !1;
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
    return s.length ? s.forEach((i) => l[i] = t[i]) : Object.assign(l, t), this.dialog.formItems.forEach((i) => {
      let n = l[i.model || i.prop];
      i.type === "number" ? n = this.uiUtils.formatPrecision(n, i.precision || 3) * 1 : i.comp === "ElDatePicker" && (i.type === "datetime" ? n = ge.format(n) : (!i.type || i.type === "date") && (n = ge.format(n, "", !1))), l[i.model || i.prop] = n;
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
    const i = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && i !== this._lastSearchParams) {
      const { page: n, limit: o, order: a, count: r, ...h } = s;
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
    const { columns: l, query: i } = this.table, { page: n, limit: o } = i;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (n - 1) * o + r + 1;
    }), l.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: p, formatter: w, autoFill: y } = a.tableAttrs || {}, { modelName: O } = a.formAttrs || {};
      if (O && y)
        t.forEach((k) => k[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const R = Ce(() => a.options, (g, C) => {
          const F = C ? this.table.list : t, q = Tt(a);
          F.forEach((z, A) => {
            const V = z[r];
            z[`_formatted_${r}`] = q[V] || (w == null ? void 0 : w(V, z, A)) || V;
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
    const { modelName: i, text: n, value: o } = s.formAttrs, a = await this.service.restful.search(i, {
      limit: -1,
      attributes: [n, o],
      where: {
        [o]: {
          "[Op.in]": l
        }
      }
    });
    if (!a.data.length)
      return;
    const r = Re.mapField(a.data, o, n);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = r[h[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingColumns(t, s = "current") {
    return t.filter((l) => !["index", "selection", "expand", "radio", "_index"].includes(l.type)).filter((l) => !l.virtual);
  }
  processExportingData(t, s = "current") {
    if (!t.length)
      return t;
    const l = {};
    this.table.ref._visibleColumns.forEach((n) => {
      let { formatter: o = n.formatter, tagValues: a = n.tagValues } = n.tableAttrs || {};
      !o && typeof a == "function" && (o = a), l[n.prop] = { formatter: o, tagValues: a };
    });
    const i = Object.keys(t[0]);
    return t.forEach((n) => {
      i.forEach((o) => {
        var r, h;
        const a = n[o];
        if (n.hasOwnProperty("_formatted_" + o))
          return n[o] = n["_formatted_" + o];
        if ((r = l[o]) != null && r.formatter)
          return n[o] = l[o].formatter(a);
        if ((h = l[o]) != null && h.tagValues)
          return n[o] = l[o].tagValues[a];
        typeof a == "boolean" ? n[o] = a && 1 || 0 : a instanceof Date ? (n[o] = ge.format(a), n[o].endsWith(" 00:00:00") && (n[o] = n[o].slice(0, -9))) : typeof a == "object" && (n[o] = JSON.stringify(a));
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
      this._isMobile ? s.validate().then(() => l(!0)).catch(() => l(!1)) : s.validate((i) => l(i)).catch(() => l(!1));
    }) : !0;
  }
  _clearValidate(t = this.dialog.formRef) {
    t && (this._isMobile ? t.resetValidation() : t.clearValidate());
  }
  async _checkAllNone(t) {
    const s = [null, void 0, ""];
    return Object.values(t).some((i) => !s.includes(i)) ? !0 : se.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    W(typeof t == "object" ? t.message || t.err || t.toString() : t);
  }
  get _isMobile() {
    var s, l;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((l = this.dialog) == null ? void 0 : l.formRef);
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
const Tt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: l = "text", value: i = "value" } = s, n = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    n[o[i]] = o[l];
  }), n;
};
class jt extends ot {
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
const Ft = {
  BaseController: lt,
  CrudController: ot,
  TempCrudController: jt
}, E = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [l, i] of t)
    s[l] = i;
  return s;
}, Dt = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Rt(e, t, s, l, i, n) {
  const o = u("van-action-sheet");
  return d(), f(o, b(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const It = /* @__PURE__ */ E(Dt, [["render", Rt]]), Bt = {
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
        const i = l.span || this.span;
        t.push(l), s += i, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, Lt = { class: "x-auto-rows" }, Mt = { key: 1 };
function Nt(e, t, s, l, i, n) {
  const o = u("x-col"), a = u("x-row");
  return d(), _("div", Lt, [
    (d(!0), _(B, null, M(n.rows, (r, h) => (d(), f(a, b({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), _(B, null, M(r, (p, w) => (d(), f(o, b(p, {
          span: p.span || s.span,
          key: w,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            p.slot || e.$attrs.slot ? x(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), _("span", Mt, T(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const Pt = /* @__PURE__ */ E(Bt, [["render", Nt]]), Ut = {
  name: "MobileXButton"
};
function qt(e, t, s, l, i, n) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const Xt = /* @__PURE__ */ E(Ut, [["render", qt]]), zt = {
  name: "PcXButton"
};
function Wt(e, t, s, l, i, n) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const Ht = /* @__PURE__ */ E(zt, [["render", Wt]]), { funcs: Jt } = StardustBrowser, Kt = ["index", "selection", "expand", "radio", "_index"], Ee = {
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
        ...he(),
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
      return Jt.calcPixel(this.height) * this.zoom + "px";
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
      const e = this.datasource.columns.filter((t) => !Kt.includes(t.type));
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
      return (t === "sum" || t === "average") && (l = e.reduce((i, n) => i + n, 0).toFixed(3) * 1), t === "count" ? l = e.length : t === "average" ? e.length ? l = (l / (s || e.length)).toFixed(3) * 1 : l = void 0 : t === "first" ? l = e[0] : t === "last" ? l = e[e.length - 1] : (t === "max" || t === "min") && (l = Math[t].apply(null, e)), l;
    },
    setRich(e) {
      var A;
      const { categories: t, data: s, attr: l, summary: i, type: n, filter: o, grid: a } = e, r = {}, h = Array.isArray(t) && t.length || ((A = t == null ? void 0 : t.data) == null ? void 0 : A.length), p = h && (Array.isArray(t) ? t : t.data), w = typeof e.series == "string" ? e.series : e.series.data, y = (o == null ? void 0 : o.categories.limit) > -1, O = (o == null ? void 0 : o.series.limit) > -1, k = {}, R = [], g = /* @__PURE__ */ new Set(), C = [];
      s.forEach((V) => {
        var L;
        let D = V[w] || "未知";
        if (O && C.length >= o.series.limit && !C.includes(D)) {
          if (!o.series.mergeOthers)
            return;
          D = "其他";
        }
        if (h) {
          let N = p.map((le) => V[le]).join("/") || "未知";
          if (y && R.length >= o.categories.limit && !R.includes(N)) {
            if (!o.categories.mergeOthers)
              return;
            g.add(N), N = "其他";
          }
          k[N] || R.push(N), k[N] || (k[N] = {}), C.includes(D) || C.push(D), (L = k[N])[D] || (L[D] = []), k[N][D].push(V[l]);
        } else
          k[D] || C.push(D), k[D] || (k[D] = []), k[D].push(V[l]);
      });
      const F = h && !O ? [...new Set(s.map((V) => V[w]))] : C;
      if (h)
        for (let V in k)
          for (let D in k[V])
            k[V][D] = this.calcSummary(
              k[V][D],
              i,
              y && V === "其他" ? k[V][D].length / g.size : k[V][D].length
            );
      else
        for (let V in k)
          k[V] = this.calcSummary(k[V], i);
      let q = F;
      typeof e.series == "object" && e.series.formatter && (q = F.map((V) => e.series.formatter(V)));
      let z = [];
      h ? z = F.map((V, D) => ({
        name: q[D],
        type: n,
        label: { show: !0, position: "top" },
        data: R.map((L) => ({ name: L, value: k[L][V] }))
      })) : z = [
        {
          type: n,
          colorBy: "data",
          label: { show: !0, position: "top" },
          data: F.map((V) => ({ name: V, value: k[V] }))
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
      var t, s, l;
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
      }, e.xAxis && !((t = e.xAxis.axisLabel) != null && t.formatter) && ((s = e.xAxis).axisLabel || (s.axisLabel = {}), e.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)), console.log(e), (l = this.chart) == null || l.setOption(e, !0);
    },
    labelSplitFormatter(e) {
      return (t) => t.length < e ? t : Array.from({
        length: Math.ceil(t.length / e)
      }).map((s, l) => t.slice(l * e, (l + 1) * e)).join(`
`);
    }
  }
}, Be = () => {
  We((e) => ({
    "54b2baec": e.zoomedHeight,
    "2b79eb74": e.zoom
  }));
}, Le = Ee.setup;
Ee.setup = Le ? (e, t) => (Be(), Le(e, t)) : Be;
const me = (e) => ($e("data-v-94e70f82"), e = e(), xe(), e), Yt = { class: "x-chart" }, Gt = {
  class: "chart",
  ref: "el"
}, Qt = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "左", -1)), Zt = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "上", -1)), es = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "右", -1)), ts = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "下", -1));
function ss(e, t, s, l, i, n) {
  const o = u("pc-x-icon"), a = u("el-input-number"), r = u("el-col"), h = u("el-row"), p = u("el-checkbox"), w = u("el-tab-pane"), y = u("el-tabs"), O = u("x-form"), k = u("x-dialog"), R = te("loading");
  return I((d(), _("div", Yt, [
    j("div", Gt, null, 512),
    s.datasource ? (d(), _("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (g) => i.dialog.visible = !0)
    }, [
      $(" 配置 "),
      m(o, { name: "Setting" })
    ])) : S("", !0),
    m(k, {
      modelValue: i.dialog.visible,
      "onUpdate:modelValue": t[12] || (t[12] = (g) => i.dialog.visible = g),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: n.handleMakeChart,
      onCancel: t[13] || (t[13] = (g) => i.dialog.visible = !1)
    }, {
      default: c(() => [
        m(O, { dialog: i.dialog }, {
          grid: c(() => [
            m(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                m(r, { span: 12 }, {
                  default: c(() => [
                    Qt,
                    m(a, {
                      modelValue: n.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => n.grid.left = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Zt,
                    m(a, {
                      modelValue: n.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (g) => n.grid.top = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    es,
                    m(a, {
                      modelValue: n.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (g) => n.grid.right = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    ts,
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
              modelValue: i.filterType,
              "onUpdate:modelValue": t[11] || (t[11] = (g) => i.filterType = g)
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
                    I(j("div", null, [
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
                      [Fe, n.categories.isLimit]
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
                    I(j("div", null, [
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
                      [Fe, n.series.isLimit]
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
    [R, i.loading]
  ]);
}
const ns = /* @__PURE__ */ E(Ee, [["render", ss], ["__scopeId", "data-v-94e70f82"]]), is = {
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
        rules: l,
        required: i,
        ...n
      } = this.$attrs;
      return n;
    }
  },
  methods: {
    formatOptions: Y
  }
};
function ls(e, t, s, l, i, n) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, b({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, n.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), _(B, null, M(n.formatOptions(s.options, this), (r) => (d(), f(o, b(n.attrs, {
        key: r[s.text],
        shape: s.shape,
        name: r[s.value]
      }), {
        default: c(() => [
          $(T(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const os = /* @__PURE__ */ E(is, [["render", ls], ["__scopeId", "data-v-5d7abb69"]]), as = {
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
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: Y
  }
};
function rs(e, t, s, l, i, n) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, b({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, n.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), _(B, null, M(n.formatOptions(s.options, this), (r) => (d(), f(o, b(n.attrs, {
        key: r[s.text],
        label: r[s.value]
      }), {
        default: c(() => [
          $(T(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "modelValue"]);
}
const ds = /* @__PURE__ */ E(as, [["render", rs], ["__scopeId", "data-v-82200102"]]), cs = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function us(e, t, s, l, i, n) {
  const o = u("van-col");
  return d(), f(o, b(n.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const hs = /* @__PURE__ */ E(cs, [["render", us]]), ms = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function ps(e, t, s, l, i, n) {
  const o = u("el-col");
  return d(), f(o, b(n.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const fs = /* @__PURE__ */ E(ms, [["render", ps]]), gs = {
  name: "MobileXDialog",
  props: {
    actionsheet: {
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
    },
    canCancel() {
      return !!this.$attrs.onCancel || !!this.$parent.$attrs.onCancel;
    },
    canConfirm() {
      return !!this.$attrs.onSubmit || !!this.$parent.$attrs.onSubmit;
    }
  },
  methods: {
    async handleCancel() {
      this.actionsheet || (await this.$nextTick(), this.visible = !0, await this.$nextTick()), this.$emit("cancel");
    },
    async handleConfirm() {
      this.actionsheet || (await this.$nextTick(), this.visible = !0, await this.$nextTick()), this.$emit("submit");
    }
  }
}, bs = { key: 1 }, _s = { key: 1 };
function ys(e, t, s, l, i, n) {
  const o = u("van-col"), a = u("van-row");
  return d(), f(G(s.actionsheet ? "van-action-sheet" : "van-dialog"), b({ width: "92%" }, e.$attrs, {
    show: n.visible,
    "onUpdate:show": t[2] || (t[2] = (r) => n.visible = r),
    class: "mobile-x-dialog",
    "show-confirm-button": n.canConfirm,
    "show-cancel-button": n.canCancel,
    onConfirm: n.handleConfirm,
    onCancel: n.handleCancel
  }), ne({ _: 2 }, [
    e.$slots.title || s.title ? {
      name: "title",
      fn: c(() => [
        e.$slots.title ? x(e.$slots, "title", { key: 0 }) : (d(), _("span", bs, T(s.title), 1))
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
    } : void 0,
    e.$slots.title || s.title ? {
      name: "description",
      fn: c(() => [
        e.$slots.title ? x(e.$slots, "title", { key: 0 }) : (d(), _("span", _s, T(s.title), 1))
      ]),
      key: "3"
    } : void 0,
    n.canConfirm || n.canCancel ? {
      name: "cancel",
      fn: c(() => [
        m(a, { gutter: 10 }, {
          default: c(() => [
            n.canCancel ? (d(), f(o, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                j("span", {
                  onClick: t[0] || (t[0] = (...r) => n.handleCancel && n.handleCancel(...r))
                }, T(s.cancelText), 1)
              ]),
              _: 1
            })) : S("", !0),
            n.canConfirm ? (d(), f(o, {
              key: 1,
              span: 12
            }, {
              default: c(() => [
                j("span", {
                  style: { color: "var(--van-blue)" },
                  onClick: t[1] || (t[1] = (...r) => n.handleConfirm && n.handleConfirm(...r))
                }, T(s.submitText), 1)
              ]),
              _: 1
            })) : S("", !0)
          ]),
          _: 1
        })
      ]),
      key: "4"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const vs = /* @__PURE__ */ E(gs, [["render", ys]]), ws = {
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
}, Ss = {
  key: 1,
  class: "el-dialog__title"
};
function ks(e, t, s, l, i, n) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(G(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: n.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => n.visible = r),
    fullscreen: i.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: c(() => [
      e.$slots.header ? x(e.$slots, "header", { key: 0 }) : (d(), _("span", Ss, T(s.title), 1)),
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
          $(T(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : S("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          $(T(s.cancelText), 1)
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
const Cs = /* @__PURE__ */ E(ws, [["render", ks]]), J = {}, Z = {
  provinces: [],
  cities: [],
  counties: []
}, $s = {
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
      provinces: Object.freeze(Z.provinces),
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
      this.cities = Object.freeze(Z.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(Z.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(J, this.areaList), Z.provinces = Object.entries(J.province_list).map((e) => ({ value: e[0], text: e[1] })), Z.cities = Object.entries(J.city_list).map((e) => ({ value: e[0], text: e[1] })), Z.counties = Object.entries(J.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(Z.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const l = Object.entries(J.province_list).find((i) => i[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(J.city_list).find((i) => i[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const l = Object.entries(J.county_list).find((i) => i[1] === s);
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
function xs(e, t, s, l, i, n) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      m(a, { span: n.span }, {
        default: c(() => [
          m(o, {
            modelValue: i.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => i.province = h),
            options: i.provinces,
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
            modelValue: i.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => i.city = h),
            options: i.cities,
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
            modelValue: i.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => i.county = h),
            options: i.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : S("", !0)
    ]),
    _: 1
  });
}
const Vs = /* @__PURE__ */ E($s, [["render", xs]]);
function Es() {
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
function As() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function Os() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((i) => (delete i.visible, e ? {
    ...i,
    label: " ",
    _label: i.label
  } : i)).filter((i) => this.dialog ? this.dialog.isEditing ? i.canEdit !== !1 : i.canAdd !== !1 : !0).map((i) => Object.assign({}, i, i.formAttrs));
}
function Ts() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return st(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function js() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function Fs(e) {
  var l;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
}
function Ds(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function Rs(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const ie = {
  props: Es,
  computed: {
    _model: As,
    _items: Os,
    _visibleItems: Ts,
    _rules: js
  },
  methods: {
    calcPlaceholder: Fs,
    calcStyle: Ds,
    formatModelValue: Rs
  }
}, Is = {
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
function Bs(e, t, s, l, i, n) {
  const o = u("mobile-x-form-item"), a = u("van-cell-group"), r = u("van-form");
  return d(), f(r, {
    ref: "formRef",
    class: K(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : S("", !0),
      m(a, ue(He(e.$attrs)), {
        default: c(() => [
          (d(!0), _(B, null, M(e._visibleItems, (h, p) => (d(), f(o, b(h, {
            rules: e._rules[h.prop] || h.rules,
            key: p,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (w) => e._model[h.prop] = w,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: c(() => [
              h.slot ? x(e.$slots, h.slot, ue(b({ key: 0 }, h))) : S("", !0)
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
const Ls = /* @__PURE__ */ E(Is, [["render", Bs]]), Ms = {
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
}, Ns = { key: 1 };
function Ps(e, t, s, l, i, n) {
  const o = u("pc-x-form-item"), a = u("el-form"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: i.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => i.activeNames = p),
    class: K((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      m(r, {
        name: i.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", Ns, T(s.title), 1))
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
              (d(!0), _(B, null, M(e._visibleItems, (p, w) => (d(), f(o, b({
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
const Us = /* @__PURE__ */ E(Ms, [["render", Ps]]);
function qs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Je(e);
}
const Se = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: i
  } = e;
  let {
    comp: n,
    compType: o,
    html: a,
    text: r
  } = t;
  const h = {
    ...l,
    "onUpdate:modelValue": (w) => i("update:modelValue", w)
  }, p = [];
  return o === "html" ? h.class = "comp-html" : n = u(n), a && (h.innerHTML = a), r && p.push(r), Q(n, h, {
    default: () => p
  });
}, Xs = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: i,
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
    }, qs(p = Se(e)) ? p : {
      default: () => [p]
    });
  } else
    h = Se(e);
  return Q(u("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [h],
    label: () => Q("span", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
        display: "inline-block"
      }
    }, [s.label])
  });
}, zs = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: i,
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
    "onUpdate:modelValue": (w) => i("update:modelValue", w)
  };
  return a && s.label || r ? Q(u("van-field"), p, {
    input: () => a && s.label ? n.default() : Se(e)
  }) : (Object.assign(p, l), Q(u("van-field"), p));
}, Ws = {
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
        compType: i,
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
    return zs(this);
  }
}, Ae = {
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
        slot: i,
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
    return Xs(this);
  }
}, Me = () => {
  We((e) => ({
    ba9709f0: e.width
  }));
}, Ne = Ae.setup;
Ae.setup = Ne ? (e, t) => (Me(), Ne(e, t)) : Me;
const Hs = /* @__PURE__ */ E(Ae, [["__scopeId", "data-v-d2cde1e2"]]), Pe = /* @__PURE__ */ Object.assign({}), Js = {
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
      await Promise.all(Object.keys(Pe).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Pe[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Ks = ["src"];
function Ys(e, t, s, l, i, n) {
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), _("span", {
    key: 0,
    class: K(n.iconClass)
  }, null, 2)) : i.icons[s.name] ? (d(), _("img", {
    key: 1,
    src: i.icons[s.name],
    alt: "icon"
  }, null, 8, Ks)) : (d(), f(o, b({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Gs = /* @__PURE__ */ E(Js, [["render", Ys]]), Ue = /* @__PURE__ */ Object.assign({}), Qs = {
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
      await Promise.all(Object.keys(Ue).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Ue[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Zs = ["src"];
function en(e, t, s, l, i, n) {
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), _("span", {
    key: 0,
    class: K(n.iconClass)
  }, null, 2)) : i.icons[s.name] ? (d(), _("img", {
    key: 1,
    src: i.icons[s.name],
    alt: "icon"
  }, null, 8, Zs)) : (d(), f(o, ue(b({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(G(s.name)))
    ]),
    _: 1
  }, 16));
}
const tn = /* @__PURE__ */ E(Qs, [["render", en]]), { highdict: sn } = StardustJs, { storage: nn } = StardustBrowser, { local: at } = nn, Oe = ["index", "selection", "expand", "radio", "_index"];
function ln() {
  return {
    table: Object,
    loading: Boolean,
    data: Array,
    columns: Array,
    query: Object,
    total: Number,
    finished: Boolean,
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
function on() {
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
function an() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function rn() {
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
function dn() {
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
function cn() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function un() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function hn() {
  const { $props: e, _query: t } = this, { table: s, columns: l } = e;
  return (l || (s == null ? void 0 : s.columns) || []).map((n) => n.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (s.isInfinite ? 0 : (a - 1) * r) + o + 1;
    }
  }, n, { type: "index" }) : n.type === "radio" ? Object.assign({ width: 60, label: "单选" }, n) : Object.assign({}, n, n.tableAttrs));
}
function mn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function pn() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function fn() {
  const { table: e, finished: t } = this.$props;
  return t ?? (e == null ? void 0 : e.finished);
}
function gn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function bn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function _n() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function yn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function vn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function wn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function Sn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function kn() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function Cn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function $n() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : null;
}
function xn() {
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
  return e.forEach((l) => {
    const i = "handle" + l.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[l] = this.controller[i];
  }), t;
}
function Vn() {
  const e = this._columns.filter((s) => s.type && Oe.includes(s.type) || s.fixed === "left"), t = this.settings.columns.filter((s) => !s.hide && s.fixed !== "left").map((s) => {
    const l = this._columns.find((i) => i.prop === s.prop);
    return {
      sortable: "custom",
      ...l,
      width: s.width || l.width
    };
  });
  return e.concat(t);
}
function En() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function An() {
  return this.table.hideOperates || this._attrs["hide-operates"] !== void 0 && this._attrs["hide-operates"] !== !1;
}
function On() {
  return this.table.hidePagination || this._attrs["hide-pagination"] !== void 0 && this._attrs["hide-pagination"] !== !1;
}
function Tn() {
  return this.table.operatesWidth || this._attrs.operatesWidth || this._attrs["operates-width"];
}
function jn() {
  return this.table.hideChart || this._attrs["hide-chart"] !== void 0 && this._attrs["hide-chart"] !== !1;
}
function Fn() {
  return this._attrs["operates-dropdown"] !== void 0 && this._attrs["operates-dropdown"] !== !1;
}
function Dn() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !Oe.includes(e.type)));
}
function Rn() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function In() {
  const e = this._uid && at.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Oe.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: i, hide: n, width: o, virtual: a, fixed: r } = t;
    return { prop: s, label: l, show: i, hide: n, width: o, virtual: a, fixed: r };
  })), this.settings = e;
}
function Bn(e) {
  at.setJson(`Settings[${this._uid}]`, e);
}
function Ln(e, t) {
  const { prop: s } = t;
  let { format: l, formatter: i } = t.tableAttrs || t;
  l = Array.isArray(t.options) ? l !== !1 : l;
  const n = e[s];
  if (n == null || n === "")
    return this.defaultValue;
  if (l || i) {
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
    if (i)
      return typeof i == "function" ? i(n, e, t) : sn.get(e, i);
  }
  return n;
}
function Mn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function Nn(e) {
  this.params = e, this._emit("search", e);
}
function Pn(e) {
  this.saveSettings(e), this.initSettings();
}
function Un(e, t, s, l) {
  const i = this.settings.columns.find((n) => n.prop === s.property);
  i && (i.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
}
function qn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Xn(e) {
  var t, s, l, i;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((i = (l = this.controller) == null ? void 0 : l.handleSortChange) == null || i.call(l, e));
}
function zn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function Wn(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function Hn() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function Jn() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Kn(e) {
  var l;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const i = s.tableAttrs.class;
    typeof i == "function" ? t += " " + i(e) : typeof i == "string" && (t += " " + i);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Yn(e) {
  var l;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const i = s.tableAttrs.style;
    typeof i == "function" ? Object.assign(t, i(e)) : typeof i == "object" && Object.assign(t, i);
  }
  return Object.keys(t) ? t : null;
}
function Gn(e, t) {
  const { tagTypes: s, prop: l, options: i } = t, n = e.row[l];
  if (s) {
    if (typeof s == "function")
      return s(n, e, t);
    if (typeof s == "object")
      return s[n];
  } else if (i) {
    const o = i.find((a) => a[t.value || "value"] === n);
    if (o != null && o.tagType)
      return o.tagType;
  }
  return n ? "success" : "danger";
}
function Qn(e, t) {
  const { tagValues: s, prop: l, options: i } = t, n = e.row[l];
  if (s) {
    if (typeof s == "function")
      return s(n, e, t);
    if (typeof s == "object")
      return s[n];
  } else if (i) {
    const o = i.find((a) => a[t.value || "value"] === n);
    if (o)
      return o[t.text || "text"];
  }
  return n;
}
function Zn(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function ei(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function ti(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function si(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function ni(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function ii(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function li(e, t) {
  var l;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((l = t.previewSrcList) == null ? void 0 : l.call(t)) || [s];
}
function oi(e, t) {
  const s = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function ai() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const U = {
  props: ln,
  emits: on,
  computed: {
    _attrs: an,
    domids: rn,
    elTableAttrs: dn,
    _loading: cn,
    _data: un,
    _columns: hn,
    _query: mn,
    _total: pn,
    _finished: fn,
    _selection: gn,
    _chartHeight: bn,
    _chartOption: _n,
    _onSearch: yn,
    _onAdd: vn,
    _onExport: wn,
    _onSearchExport: Sn,
    _onImport: kn,
    _onMultiDelete: Cn,
    _onLoad: $n,
    _listen: xn,
    _visibleColumns: Vn,
    _uid: En,
    hideOperates: An,
    hidePagination: On,
    operatesWidth: Tn,
    hideChart: jn,
    operatesDropdown: Fn,
    searcherColumns: Dn,
    searcherConfig: Rn
  },
  watch: {
    $route: ai
  },
  methods: {
    initSettings: In,
    saveSettings: Bn,
    calcValue: Ln,
    calcOverflowTooltip: Mn,
    handleSearch: Nn,
    handleResetSettings: Pn,
    handleHeaderDragend: Un,
    handleSelectionChange: qn,
    handleSortChange: Xn,
    handleCheckedChange: zn,
    handleCollapseChange: Wn,
    handleMinus: Hn,
    handleToggleFullscreen: Jn,
    cellClassName: Kn,
    cellStyle: Yn,
    calcTagType: Gn,
    calcTagValue: Qn,
    canEdit: Zn,
    canSave: ei,
    canRowEdit: ti,
    canCancelEdit: si,
    canDelete: ni,
    _imageSrc: ii,
    _imagePreviewSrcList: li,
    _emit: oi
  }
}, ri = {
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
        const { infoAttrs: s = {}, ...l } = t, i = { span: this.span, ...l, ...s }, n = i.block || "基本信息";
        let o = e[n];
        o || (e[n] = o = [], o.span = 0), o.span + i.span > 24 && o.length ? o[o.length - 1].span += 24 - o.span : o.span += i.span, o.push(i);
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
}, di = { key: 0 }, ci = { key: 1 };
function ui(e, t, s, l, i, n) {
  const o = u("el-descriptions-item"), a = u("el-descriptions"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: i.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => i.activeNames = p),
    class: K(["x-info", { "hide-header": n.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), _(B, null, M(n.blocks, (p, w) => (d(), f(r, {
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
              (d(!0), _(B, null, M(p, (y) => (d(), f(o, b({
                key: y.prop
              }, y), ne({
                default: c(() => [
                  y.slot ? (d(), _("span", di, [
                    x(e.$slots, y.slot, ue(He({ data: s.data, field: y, value: n.calcValue(s.data, y) })), void 0, !0)
                  ])) : (d(), _("span", ci, T(n.calcValue(s.data, y)), 1))
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
const hi = /* @__PURE__ */ E(ri, [["render", ui], ["__scopeId", "data-v-0c3b67a5"]]), mi = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, pi = { key: 1 };
function fi(e, t, s, l, i, n) {
  return d(), _("div", null, [
    (d(!0), _(B, null, M(s.items, (o, a) => (d(), f(G(s.compName), b({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? x(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), _("span", pi, T(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const gi = /* @__PURE__ */ E(mi, [["render", fi]]), bi = {
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
function _i(e, t, s, l, i, n) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), h = u("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      m(o, { span: 6 }, {
        default: c(() => [
          j("span", null, "总计: " + T(s.total), 1)
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
              $(T(p), 1)
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
const yi = /* @__PURE__ */ E(bi, [["render", _i]]), vi = {
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
function wi(e, t, s, l, i, n) {
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
const Si = /* @__PURE__ */ E(vi, [["render", wi]]), ki = {
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
function Ci(e, t, s, l, i, n) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), _(B, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: K(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, T(s.modelValue || s.placeholder), 3),
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
const $i = /* @__PURE__ */ E(ki, [["render", Ci]]), xi = {
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
function Vi(e, t, s, l, i, n) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, b({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), _(B, null, M(n.formatOptions(s.options, this), (r) => (d(), f(o, b(e.$attrs, {
        key: r[s.text],
        name: r[s.value]
      }), {
        default: c(() => [
          $(T(r[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const Ei = /* @__PURE__ */ E(xi, [["render", Vi], ["__scopeId", "data-v-70a93fd1"]]), Ai = {
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
        ...l
      } = this.$attrs;
      return l;
    }
  },
  methods: {
    formatOptions: Y
  }
};
function Oi(e, t, s, l, i, n) {
  const o = u("el-radio-group");
  return d(), f(o, b({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, n.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), _(B, null, M(n.formatOptions(s.options, this), (a) => (d(), f(G(s.button ? "el-radio-button" : "el-radio"), b(n.attrs, {
        key: a[s.text],
        label: a[s.value]
      }), {
        default: c(() => [
          $(T(a[s.text]), 1)
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "modelValue"]);
}
const Ti = /* @__PURE__ */ E(Ai, [["render", Oi], ["__scopeId", "data-v-cfd9db24"]]), ji = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Fi = { key: 1 };
function Di(e, t, s, l, i, n) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), _(B, null, M(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), _("span", Fi, T(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const Ri = /* @__PURE__ */ E(ji, [["render", Di]]), Ii = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Bi = { key: 1 };
function Li(e, t, s, l, i, n) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), _(B, null, M(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), _("span", Bi, T(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const Mi = /* @__PURE__ */ E(Ii, [["render", Li]]), Ni = {
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
function Pi(e, t, s, l, i, n) {
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
const Ui = /* @__PURE__ */ E(Ni, [["render", Pi]]), qi = {
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
function Xi(e, t, s, l, i, n) {
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
const zi = /* @__PURE__ */ E(qi, [["render", Xi]]), rt = async (e, t, s) => {
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: i = "text", value: n = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], i, n])], a.limit = a.limit || 20, l && (a.where = a.where || {}, a.where[i] = a.where[i] || {}, a.where[i]["[Op.like]"] = `%${l}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, Wi = (e, t) => !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], Hi = (e, t) => !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", Ji = {
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
      rt(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function Ki(e, t, s, l, i, n) {
  const o = u("x-picker");
  return d(), _("div", {
    onClick: t[5] || (t[5] = (...a) => n.onClick && n.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(o, b(e.$attrs, {
      modelValue: n.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: i.visible,
      columns: i._options,
      onClick: t[1] || (t[1] = ee(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => i.visible = !0),
      onCancel: t[3] || (t[3] = (a) => i.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => i.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const Yi = /* @__PURE__ */ E(Ji, [["render", Ki]]), Gi = {
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
      rt(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return Wi(e, this);
    },
    calcRemarkLabel(e) {
      return Hi(e, this);
    }
  }
}, Qi = { key: 1 }, Zi = { class: "main" }, el = { class: "remark" };
function tl(e, t, s, l, i, n) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, b({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: i.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || n.remoteSearch
  }), {
    default: c(() => [
      (d(!0), _(B, null, M(i._options, (r) => (d(), f(o, b(e.$attrs, {
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
          }, void 0, !0) : (d(), _("span", Qi, [
            j("span", Zi, T(n.calcMainLabel(r)), 1),
            j("span", el, T(n.calcRemarkLabel(r)), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote-method"]);
}
const sl = /* @__PURE__ */ E(Gi, [["render", tl], ["__scopeId", "data-v-d36889f6"]]), qe = {
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
}, nl = [{
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
function il() {
  const e = window.isMobile ? "small" : "", {
    config: t,
    columns: s,
    visible: l,
    conditions: i,
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
      default: () => [$("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [i.map((y, O) => m("div", {
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
    }, [ll(this, y)])])]))]), t.traditional ? null : m(u("el-input"), b({
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
function ll(e, t) {
  const s = (i) => Q(u((i == null ? void 0 : i.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (n) => t.value = n
  }, i)), l = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? m("div", {
    class: "col-2"
  }, [s({
    ...l,
    modelValue: t.value[0],
    "onUpdate:modelValue": (i) => t.value[0] = i
  }), s({
    ...l,
    modelValue: t.value[1],
    "onUpdate:modelValue": (i) => t.value[1] = i
  })]) : ["in", "notIn"].includes(t.op) ? (l.multiple = !0, s(l)) : t.op === "special" ? s({
    ...l,
    component: "x-select",
    placeholder: "请选择特殊值",
    options: nl
  }) : s();
}
const { storage: be } = StardustBrowser, { deepCopy: ol } = StardustJs.funcs, al = {
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
  render: il,
  methods: {
    init() {
      const e = this.uid && be.local.getJson(this.key, this.config) || this.config;
      this.initConfig(ol(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      be.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: s, component: l, ...i } = e;
          return i;
        }),
        expression: this.expression
      });
    },
    initConfig(e) {
      var t, s;
      (t = e.conditions) == null || t.forEach((l) => {
        const { prop: i, op: n, value: o } = l;
        l.item = this.columns.find((a) => a.prop === i), this.handleSelectField(l, i), this.handleSelectOp(l, n), l.value = o, l.ops = X[l.component].map((a) => qe[a]);
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
      be.local.remove(this.key), Object.assign(this, {
        conditionNo: 1,
        conditions: [],
        expression: ""
      }), this.init();
    },
    calcParams() {
      const e = this.calcTree();
      if (!e)
        return;
      const t = (l, i) => {
        const n = [], o = "[Op." + l.type + "]";
        i[o] = n;
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
            n.push(this.parseCondition(r));
          } else {
            const r = {};
            n.push(r), t(a, r);
          }
        n.length || delete i[o];
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((i) => i.trim()), s = (i, n) => {
        for (; n.length; ) {
          const o = n.shift();
          if (["and", "or"].includes(o)) {
            if (i.type && i.type !== o)
              throw "串联不同逻辑表达式请使用小括号区分";
            i.type = o;
          } else if (o === "(") {
            const a = { type: "", items: [] };
            i.items.push(a), a._parent = i, s(a, n);
            break;
          } else
            o === ")" ? (s(i._parent, n), delete i._parent) : i.items.push(o);
        }
      }, l = { type: "", items: [] };
      return s(l, t), l.type = l.type || "and", l;
    },
    parseCondition(e) {
      let { prop: t, op: s, value: l } = e;
      const i = {};
      if (s === "special") {
        const n = l.startsWith("NOT_"), o = l.startsWith("NE_");
        return l.includes("NULL") ? l = null : l.includes("BLANK") && (l = ""), n ? l = { "[Op.not]": l } : o && (l = { "[Op.ne]": l }), i[t] = l, i;
      }
      return (s === "like" || s === "notLike") && (l = "%" + l + "%"), i[t] = {
        [`[Op.${s}]`]: l
      }, i;
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
      const { options: s, type: l, formAttrs: i = {} } = e.item, n = { ...e.item, ...i }, {
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
        minWidth: F,
        disabled: q,
        readonly: z,
        ...A
      } = n;
      A.clearable ?? (A.clearable = !0), e.config = A, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = X[e.component].map((V) => qe[V]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", A.type = "date"), A.type === "textarea" && delete A.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, Te = /* @__PURE__ */ E(al, [["__scopeId", "data-v-69b3e55b"]]), rl = {
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
  components: { Searcher: Te },
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
}, dl = { class: "mobile-x-table" }, cl = {
  key: 1,
  class: "card"
}, ul = ["onClick"], hl = { class: "row-header flex-center" }, ml = ["value", "checked"], pl = { class: "label" }, fl = { class: "value" }, gl = ["value", "checked"], bl = {
  key: 2,
  class: "index"
}, _l = { class: "title" };
function yl(e, t, s, l, i, n) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("x-icon"), p = u("van-cell"), w = u("van-list"), y = u("x-pagination"), O = u("x-info"), k = u("van-popup"), R = u("van-action-sheet");
  return d(), _("div", dl, [
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
    }), ne({ _: 2 }, [
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
    (s.mode || e._attrs.mode) === "card" ? (d(), _("div", cl, [
      (d(!0), _(B, null, M(e._data, (g, C) => (d(), _("div", {
        key: C,
        class: "row",
        onClick: (F) => n.handleClickCard(C)
      }, [
        j("div", hl, [
          n.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: i.selected[C],
            "onUpdate:modelValue": (F) => i.selected[C] = F,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = ee(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
          m(h, {
            name: "ellipsis",
            class: "more",
            onClick: ee((F) => n.handleShowActionSheet(g, C), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        n.hasRadio ? (d(), _("input", {
          key: 0,
          type: "radio",
          value: C,
          checked: C === i.checked,
          class: "radio",
          onClick: t[1] || (t[1] = ee(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
        }, null, 40, ml)) : S("", !0),
        (d(!0), _(B, null, M(n.cols, (F, q) => (d(), _("div", {
          key: q,
          class: "field"
        }, [
          j("span", pl, T(F.label) + ":", 1),
          j("span", fl, T(e.calcValue(g, F)), 1)
        ]))), 128))
      ], 8, ul))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(w, b({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (g) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), _(B, null, M(e._data, (g, C) => (d(), f(p, {
          key: C,
          "is-link": "",
          onClick: (F) => n.handleShowDetail(g, C)
        }, {
          default: c(() => [
            n.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: i.selected[C],
              "onUpdate:modelValue": (F) => i.selected[C] = F,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = ee(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
            n.hasRadio ? (d(), _("input", {
              key: 1,
              type: "radio",
              value: C,
              checked: C === i.checked,
              class: "radio",
              onClick: t[4] || (t[4] = ee(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
            }, null, 40, gl)) : S("", !0),
            n.hasIndex ? (d(), _("span", bl, T(C + 1), 1)) : S("", !0),
            j("span", _l, T(n.calcTitle(g)), 1)
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
      show: i.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (g) => i.popupVisible = g),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        m(O, {
          data: i.scope.row,
          fields: n.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    m(R, {
      show: i.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (g) => i.actionSheetVisible = g),
      actions: n.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: n.handleSelectAction,
      onCancel: t[10] || (t[10] = (g) => i.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const vl = /* @__PURE__ */ E(rl, [["render", yl], ["__scopeId", "data-v-84e93229"]]), wl = {
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
          const s = [...t.to.querySelectorAll(".row")].map((l) => l.dataset.prop);
          this.columns = s.map((l) => e[l]), this.update();
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
          const { prop: t, label: s, show: l, hide: i, width: n } = e;
          return { prop: t, label: s, show: l, hide: i, width: n };
        })
      });
    }
  }
}, Sl = (e) => ($e("data-v-a2f0fe24"), e = e(), xe(), e), kl = {
  class: "table",
  ref: "colsTable"
}, Cl = ["data-prop"], $l = ["title", "onClick"], xl = /* @__PURE__ */ Sl(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1)), Vl = {
  class: "table",
  ref: "sortsTable"
}, El = ["data-prop"];
function Al(e, t, s, l, i, n) {
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
        modelValue: i.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => i.activeName = g)
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
              j("div", kl, [
                (d(!0), _(B, null, M(i.columns, (g) => (d(), _("div", {
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
                  j("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (C) => n.handleToggle(g)
                  }, T(g.label), 9, $l),
                  m(p, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (C) => g.width = C,
                    onChange: n.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  xl
                ], 8, Cl))), 128))
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
              j("div", Vl, [
                (d(!0), _(B, null, M(i.sorts, (g, C) => (d(), _("div", {
                  key: g[0],
                  "data-prop": g[0],
                  class: "row flex-center"
                }, [
                  m(y, {
                    modelValue: g[0],
                    "onUpdate:modelValue": (F) => g[0] = F,
                    options: i.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(O, {
                    modelValue: g[1],
                    "onUpdate:modelValue": (F) => g[1] = F,
                    options: i.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (F) => i.sorts.splice(C, 1)
                  }, null, 8, ["onClick"])
                ], 8, El))), 128))
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
const dt = /* @__PURE__ */ E(wl, [["render", Al], ["__scopeId", "data-v-a2f0fe24"]]), { highdict: Ol } = StardustJs, Tl = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...U.props()
  },
  emits: [
    ...U.emits()
  ],
  components: { Searcher: Te, Settings: dt },
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
        ...he()
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
        const l = this.controller.getSearchParams(), i = await this.controller.search(l);
        let n = Ol.get(i, this.controller.listProp);
        return n = this.controller.formatList(this.controller._defaultFormatList(n, i), i), n;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, jl = {
  key: 1,
  class: "collapse-title"
}, Fl = {
  key: 2,
  class: "collapse-title"
}, Dl = /* @__PURE__ */ j("span", null, "-", -1), Rl = ["value", "checked"], Il = { key: 1 };
function Bl(e, t, s, l, i, n) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), p = u("el-image"), w = u("el-tag"), y = u("el-icon"), O = u("el-table-column"), k = u("el-button"), R = u("el-dropdown-item"), g = u("el-dropdown-menu"), C = u("el-dropdown"), F = u("el-table"), q = u("x-pagination"), z = u("el-collapse-item"), A = u("el-collapse"), V = u("x-chart"), D = u("x-dialog"), L = te("domid"), N = te("loading"), le = te("el-table-infinite-scroll");
  return d(), _(B, null, [
    j("div", {
      class: K(["pc-x-table", { fullscreen: i.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      m(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      m(A, {
        modelValue: i.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (v) => i.activeNames = v),
        class: K((i._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          m(z, {
            name: i.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : i.activeNames.length ? (d(), _("span", jl, T(e.title), 1)) : (d(), _("span", Fl, [
                $(T(e.title) + "，当前第 ", 1),
                j("span", null, T(e._query.page), 1),
                $(" 页，展示 "),
                j("span", null, T(e._data.length), 1),
                $(" 条数据， 共 "),
                j("span", null, T(e._total || e._data.length), 1),
                $(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              x(e.$slots, "tools-top"),
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, b({ key: 0 }, e._attrs, {
                domids: e.domids,
                onAdd: e._onAdd,
                onSearch: e._onSearch,
                onExport: e._onExport,
                onSearchExport: e._onSearchExport,
                onImport: e._onImport,
                onMultiDelete: e._onMultiDelete
              }), ne({
                "tools-end": c(() => [
                  e.hideChart ? S("", !0) : (d(), f(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: n.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  j("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...v) => e.handleMinus && e.handleMinus(...v))
                  }, [
                    m(a, { name: "FullScreen" }),
                    Dl
                  ]),
                  m(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  m(r, {
                    modelValue: i.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (v) => i.settings = v),
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
              x(e.$slots, "tools-bottom"),
              I((d(), f(F, b({ ref: "tableRef" }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), _(B, null, M(e._visibleColumns, (v, H) => (d(), f(O, b(v, {
                    key: H,
                    "min-width": v.minWidth,
                    align: v.align || e._attrs.tableAlign || "center",
                    resizable: v.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(v)
                  }), ne({ _: 2 }, [
                    ["selection", "index"].includes(v.type) ? void 0 : {
                      name: "default",
                      fn: c((P) => [
                        v.type === "radio" ? (d(), _("input", {
                          key: 0,
                          type: "radio",
                          value: P.$index,
                          checked: P.$index === i.checked,
                          onChange: t[3] || (t[3] = (...fe) => e.handleCheckedChange && e.handleCheckedChange(...fe))
                        }, null, 40, Rl)) : v.slot === "$image" ? (d(), f(p, b({
                          key: 1,
                          src: e._imageSrc(P, v),
                          "preview-src-list": e._imagePreviewSrcList(P, v),
                          "preview-teleported": ""
                        }, v.imageAttrs), null, 16, ["src", "preview-src-list"])) : v.slot === "$tag" ? (d(), f(w, {
                          key: 2,
                          type: e.calcTagType(P, v)
                        }, {
                          default: c(() => [
                            $(T(e.calcTagValue(P, v)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : v.slot === "$icon" ? (d(), f(y, {
                          key: 3,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(G(P.row[v.prop])))
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
                        }) : (d(), _(B, { key: 6 }, [
                          v.comp === "ElSwitch" || e.table.isRowEdit && P.row.isEditing && (v.visible !== !1 || v.canEdit) ? (d(), f(G(v.comp || "ElInput"), b({ key: 0 }, { ...v, ...v.formAttrs }, {
                            modelValue: P.row[v.prop],
                            "onUpdate:modelValue": (fe) => P.row[v.prop] = fe,
                            disabled: !P.row.editable || !P.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), _("span", Il, T(e.calcValue(P.row, v)), 1))
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
                                  I((d(), f(k, b({ type: "warning", ...e._attrs["edit-btn"] }, {
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
                                  I((d(), f(k, b({ type: "success", ...e._attrs["row-edit-btn"] }, {
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
                                  I((d(), f(k, b({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
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
                                  I((d(), f(k, b({ type: "danger", ...e._attrs["delete-btn"] }, {
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
                      !e.operatesDropdown && e.canEdit(v.row) ? I((d(), f(k, b({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
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
                      !e.operatesDropdown && e.canSave(v.row) ? I((d(), f(k, b({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
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
                      !e.operatesDropdown && e.canCancelEdit(v.row) ? I((d(), f(k, b({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
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
                      !e.operatesDropdown && e.canDelete(v.row) ? I((d(), f(k, b({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
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
              e._query && e._total && !e.hidePagination ? (d(), f(q, {
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
    e.hideChart ? S("", !0) : (d(), f(D, {
      key: 0,
      modelValue: i.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (v) => i.dialog.visible = v),
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
const Ll = /* @__PURE__ */ E(Tl, [["render", Bl]]), Ml = {
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
}, Nl = { class: "mobile-x-table-tools" }, Pl = { key: 0 }, Ul = { class: "tools" }, ql = { class: "tools-end" };
function Xl(e, t, s, l, i, n) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), h = te("domid");
  return d(), _("div", Nl, [
    e.$attrs.onAdd ? I((d(), _("div", Pl, [
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
    j("div", Ul, [
      x(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? I((d(), f(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
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
      e.$attrs.onMultiEdit ? I((d(), f(r, b({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
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
      e.$attrs.onMultiDelete ? I((d(), f(r, b({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
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
      e.$attrs.onExport ? I((d(), f(r, b({ key: 3 }, { type: "success", ...s.exportBtn }, {
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
      e.$attrs.onSearchExport ? I((d(), f(r, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
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
      e.$attrs.onImport ? I((d(), f(r, b({ key: 5 }, { type: "warning", ...s.importBtn }, {
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
      j("div", ql, [
        x(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const zl = /* @__PURE__ */ E(Ml, [["render", Xl], ["__scopeId", "data-v-6ef6b95e"]]), Wl = {
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
}, Hl = { class: "tools" }, Jl = { class: "tools-end flex-center" };
function Kl(e, t, s, l, i, n) {
  const o = u("el-button"), a = u("el-card"), r = te("domid");
  return d(), f(a, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      j("div", Hl, [
        x(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? I((d(), f(o, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
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
        e.$attrs.onAdd ? I((d(), f(o, b({ key: 1 }, { type: "primary", ...s.addBtn }, {
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
        e.$attrs.onMultiEdit ? I((d(), f(o, b({ key: 2 }, { type: "warning", ...s.multiEditBtn }, {
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
        e.$attrs.onMultiDelete ? I((d(), f(o, b({ key: 3 }, { type: "danger", ...s.multiDeleteBtn }, {
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
        e.$attrs.onExport ? I((d(), f(o, b({ key: 4 }, { type: "success", ...s.exportBtn }, {
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
        e.$attrs.onSearchExport ? I((d(), f(o, b({ key: 5 }, { type: "success", ...s.exportBtn }, {
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
        e.$attrs.onImport ? I((d(), f(o, b({ key: 6 }, { type: "warning", ...s.importBtn }, {
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
        j("div", Jl, [
          x(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Yl = /* @__PURE__ */ E(Wl, [["render", Kl], ["__scopeId", "data-v-368940cf"]]);
function ct(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Je(e);
}
const Gl = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, l = (i) => {
    i ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const n = i ? e._data.slice() : [];
    e.handleSelectionChange(n);
  };
  return m(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: l
  }, null);
}, Ql = (e, t) => {
  const {
    rowIndex: s,
    rowData: l
  } = e, i = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const n = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(n);
  };
  return m(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: i
  }, null);
}, Zl = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, eo = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return m("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, pe = ([e, t, s, l, i, n]) => {
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
    icon: i,
    onClick: r
  }), ct(n) ? n : {
    default: () => [n]
  });
}, to = (e, t) => {
  if (t.canEdit(e.rowData))
    return pe([e, t, "edit", "warning", "edit", "编辑"]);
}, so = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return pe([e, t, "row-edit", "success", "collection", "保存"]);
}, no = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return pe([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, io = (e, t) => {
  if (t.canDelete(e.rowData))
    return pe([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, lo = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: i = {}
  } = s;
  if (e.type === "selection")
    return (n) => Ql(n, t);
  if (e.type === "index")
    return (n) => Zl(n, t);
  if (e.type === "radio")
    return (n) => eo(n, t);
  if (e.slot) {
    if (i[e.slot])
      return i[e.slot];
    if (l[e.slot])
      return (n) => l[e.slot]({
        scope: {
          $index: n.rowIndex,
          row: n.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (n) => l.all({
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
      return Q(u(w), {
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
    }, ct(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, oo = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, i = e.map((n, o) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Gl(t)), r.cellRenderer = lo(r, t), r;
  });
  return t.hideOperates || i.push({
    key: i.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 195,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(n) {
      return m("div", {
        class: "operates"
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, to(n, t), so(n, t), no(n, t), io(n, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), i;
}, ao = {
  convertColumnsForTableV2: oo
}, ro = {
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
  components: { Searcher: Te, Settings: dt },
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
    convertColumnsForTableV2: ao.convertColumnsForTableV2
  }
}, co = { key: 1 };
function uo(e, t, s, l, i, n) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), p = u("el-table-v2"), w = u("el-auto-resizer"), y = u("x-pagination"), O = u("el-collapse-item"), k = u("el-collapse"), R = te("loading");
  return d(), _("div", {
    class: K(["pc-x-table-v2", { fullscreen: i.isFullscreen }])
  }, [
    m(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (g) => e._emit("search", g))
    }, null, 8, ["uid", "columns", "config"]),
    m(k, {
      modelValue: i.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (g) => i.activeNames = g),
      class: K((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        m(O, {
          name: i.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", co, T(e.title), 1))
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
            }), ne({
              "tools-end": c(() => [
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(r, {
                  modelValue: i.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (g) => i.settings = g),
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
              style: ht({ height: s.height })
            }, {
              default: c(({ width: g, height: C }) => [
                I((d(), f(p, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: n.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: g,
                  height: C
                }), ne({ _: 2 }, [
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
const ho = /* @__PURE__ */ E(ro, [["render", uo]]), _e = ["selection", "radio"], mo = {
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
      _e.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !_e.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (_e.includes(t)) {
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
}, po = { class: "x-table-viewer" };
function fo(e, t, s, l, i, n) {
  const o = u("x-dialog");
  return d(), _("div", po, [
    m(o, b(n._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": n.handleBeforeClose,
      onSubmit: n.handleSubmit,
      onCancel: n.handleCancel
    }), {
      default: c(() => [
        (d(), f(G(s.useTableV2 ? "x-table-v2" : "x-table"), b({
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
const go = /* @__PURE__ */ E(mo, [["render", fo], ["__scopeId", "data-v-e6f36700"]]), bo = {
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
}, _o = { class: "mobile-x-tags" };
function yo(e, t, s, l, i, n) {
  const o = u("van-tag");
  return d(), _("div", _o, [
    (d(!0), _(B, null, M(n._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a.text, r)
    }), {
      default: c(() => [
        $(T(a.text), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const vo = /* @__PURE__ */ E(bo, [["render", yo], ["__scopeId", "data-v-00235f22"]]), wo = {
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
}, So = { class: "pc-x-tags" };
function ko(e, t, s, l, i, n) {
  const o = u("el-tag");
  return d(), _("div", So, [
    (d(!0), _(B, null, M(n._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a.text, r)
    }), {
      default: c(() => [
        $(T(a.text), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Co = /* @__PURE__ */ E(wo, [["render", ko], ["__scopeId", "data-v-4674d140"]]), $o = {
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
}, xo = { class: "x-tinymce" }, Vo = ["id", "innerHTML"];
function Eo(e, t, s, l, i, n) {
  return d(), _("div", xo, [
    j("textarea", {
      id: i.id,
      innerHTML: s.modelValue
    }, null, 8, Vo)
  ]);
}
const Ao = /* @__PURE__ */ E($o, [["render", Eo]]), Oo = {
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
      var i;
      const l = ((i = this.service) == null ? void 0 : i.API_BASE_URL) + "/" + e.filename;
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
        s = s.map((i) => l + i), this.$emit("update:modelValue", s);
      } catch (t) {
        return this.$message.error(t.toString());
      }
    }
  }
}, je = (e) => ($e("data-v-a3a105f3"), e = e(), xe(), e), To = { class: "mask" }, jo = {
  key: 0,
  class: "el-upload__text"
}, Fo = /* @__PURE__ */ je(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), Do = /* @__PURE__ */ je(() => /* @__PURE__ */ j("br", null, null, -1)), Ro = /* @__PURE__ */ je(() => /* @__PURE__ */ j("br", null, null, -1)), Io = {
  key: 0,
  class: "path"
};
function Bo(e, t, s, l, i, n) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), f(r, b({
    "file-list": i.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (h) => i.fileList = h),
    drag: "",
    disabled: i.disabled,
    action: n.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": n.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: c(() => [
      j("div", To, [
        m(o, { name: "upload-filled" }),
        i.disabled ? S("", !0) : (d(), _("div", jo, [
          $(" 将文件拖到此处，或"),
          Fo,
          Do,
          Ro,
          s.needUpload && !i.disabled && i.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: ee(n.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              $(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : S("", !0)
        ]))
      ]),
      n.filepath ? (d(), _("div", Io, T(s.modelValue), 1)) : S("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Lo = /* @__PURE__ */ E(Oo, [["render", Bo], ["__scopeId", "data-v-a3a105f3"]]), Mo = {
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
}, No = ["src"];
function Po(e, t, s, l, i, n) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("el-dialog");
  return d(), _(B, null, [
    m(r, b({
      "file-list": i.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (p) => i.fileList = p),
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
      modelValue: i.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (p) => i.dialogVisible = p),
      title: "预览图片" + i.previewingImage.name
    }, {
      default: c(() => [
        j("img", {
          src: i.previewingImage.url,
          alt: "previewing-image"
        }, null, 8, No)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const Uo = /* @__PURE__ */ E(Mo, [["render", Po], ["__scopeId", "data-v-87a71ccc"]]), ye = {
  xactionsheet: It,
  xautorows: Pt,
  mobilexbutton: Xt,
  pcxbutton: Ht,
  xchart: ns,
  mobilexcheckboxs: os,
  pcxcheckboxs: ds,
  mobilexcol: hs,
  pcxcol: fs,
  mobilexdialog: vs,
  pcxdialog: Cs,
  xdistrictselect: Vs,
  mobilexform: Ls,
  pcxform: Us,
  mobilexformitem: Ws,
  pcxformitem: Hs,
  mobilexicon: Gs,
  pcxicon: tn,
  xinfo: hi,
  xlooper: gi,
  mobilexpagination: yi,
  pcxpagination: Si,
  xpicker: $i,
  mobilexradios: Ei,
  pcxradios: Ti,
  mobilexrow: Ri,
  pcxrow: Mi,
  mobilexscan: Ui,
  pcxscan: zi,
  mobilexselect: Yi,
  pcxselect: sl,
  mobilextable: vl,
  pcxtable: Ll,
  mobilextabletools: zl,
  pcxtabletools: Yl,
  xtablev2: ho,
  xtableviewer: go,
  mobilextags: vo,
  pcxtags: Co,
  xtinymce: Ao,
  xfileuploader: Lo,
  ximageuploader: Uo
}, ae = {};
for (let e in ye)
  ae[ye[e].name] = ye[e];
const { ElInfiniteScroll: Xe } = window.ElementPlus || {}, de = ".el-scrollbar__wrap", ze = (e, t) => {
  qo(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", l = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (l < 1 ? 1 : l) + "");
}, qo = (e, t, s) => {
  let l;
  s.forEach((i) => {
    l = e.getAttribute(i), l !== null ? t.setAttribute(i, l) : t.removeAttribute(i);
  });
}, Xo = {
  name: "el-table-infinite-scroll",
  mounted(e, t, s, l) {
    const i = e.querySelector(de);
    if (!i)
      throw new Error(`${de} element not found.`);
    i.style.overflowY = "auto", setTimeout(() => {
      !e.style.height && !e.style.maxHeight && (i.style.height = "400px", console.warn("el-table height required, otherwise will set scrollbar default height: 400px")), ze(e, i), Xe.mounted(i, t, s, l);
    }, 0);
  },
  updated(e) {
    ze(e, e.querySelector(de));
  },
  unmounted(e, ...t) {
    const s = e.querySelector(de);
    Xe.unmounted(s, ...t);
  }
}, ve = {
  ElTableInfiniteScroll: Xo
}, zo = (e) => ({
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
    return Q(ae[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), ke = (() => {
  const e = Object.keys(ae), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = ae[l]);
  for (const l of t)
    e.find((i) => /(pc|mobile)/i.test(i) && i.toLowerCase().includes(l.toLowerCase())) ? s[l] = zo(l) : s[l] = ae[l];
  return s;
})(), Wo = (e, t) => {
  for (let s in ke)
    e.component(s, ke[s]);
  for (let s in ve)
    e.directive(ve[s].name, ve[s]);
}, Jo = {
  version: "1.1.75",
  ...ke,
  ...it,
  ...Ft,
  install: Wo
};
export {
  lt as BaseController,
  se as Confirm,
  ot as CrudController,
  W as Message,
  ce as Notify,
  jt as TempCrudController,
  he as baseDialog,
  Ye as baseForm,
  Et as baseModel,
  Ge as baseTable,
  Ft as controllers,
  Jo as default,
  ft as effects,
  Y as formatOptions,
  gt as formatPrecision,
  tt as initDefaultForm,
  Ze as initDialog,
  At as initFields,
  Ve as initForm,
  et as initFormRules,
  Ot as initModel,
  Qe as initTable,
  st as isWhenMatched,
  nt as triggers,
  it as utils,
  Ke as validateForm
};
