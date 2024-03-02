import { toRaw as mt, markRaw as pt, nextTick as oe, watch as Ce, resolveComponent as u, openBlock as d, createBlock as f, mergeProps as b, createElementBlock as _, Fragment as B, renderList as M, withCtx as c, renderSlot as $, toDisplayString as A, useCssVars as He, resolveDirective as te, withDirectives as I, createElementVNode as j, createTextVNode as x, createVNode as m, createCommentVNode as S, vShow as De, pushScopeId as $e, popScopeId as xe, resolveDynamicComponent as Q, createSlots as ne, withModifiers as G, normalizeClass as Y, normalizeProps as ue, guardReactiveProps as Je, h as Z, isVNode as Ke, normalizeStyle as ft } from "vue";
const gt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const i = e.getContext("2d");
  class n {
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
  const l = () => i.clearRect(0, 0, t, s), o = (O) => Math.floor(Math.random() * O);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const O = i.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = T * 30), a >= 1 && (a = 1, r = -r, h = T * 30)), O.addColorStop(0, "rgba(250, 220, 20, 0.5)"), O.addColorStop(a, "rgba(20, 20, 20, 0.5)"), i.fillStyle = O, i.fillRect(0, 0, t, s);
  }, w = Math.floor(t / 100), y = Math.floor(s / 100), T = 20, k = Math.round(1e3 / T), R = Array.from({ length: 52 }).map(() => {
    const O = Math.floor(o(w + y) * 1.5 + o(5));
    let V = o(t), D = o(s);
    V = Math.min(Math.max(O, V), t - O), D = Math.min(Math.max(O, D), s - O);
    let L = o(2) ? (o(2) + 2) * w : (o(-1) - 2) * w, N = o(2) ? (o(2) + 2) * y : (o(-1) - 2) * y;
    return L = Math.floor(L / T), N = Math.floor(N / T), new n(
      V,
      D,
      O,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      L,
      N,
      i
    );
  });
  let g, C;
  e.addEventListener("mouseover", (O) => {
    g = O.pageX, C = O.pageY;
  }), e.addEventListener("mousemove", (O) => {
    if (g === void 0) {
      g = O.pageX, C = O.pageY;
      return;
    }
    const V = O.pageX - g, D = O.pageY - C;
    R.forEach((L) => {
      L.x += V / T, L.y += D / T;
    }), g = O.pageX, C = O.pageY;
  });
  let F = Date.now(), X = null;
  const z = () => {
    Date.now() - F >= k && (l(), p(), R.forEach((O) => O.update()), F = Date.now()), X = requestAnimationFrame(z);
  };
  return X = requestAnimationFrame(z), () => cancelAnimationFrame(X);
}, bt = ({
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
  const p = r.measureText(e).width + t, w = s + t;
  for (let y = t / 2; y < l; y += w)
    for (let T = t / 2; T < n; T += p)
      r[o + "Text"](e, T, y);
  return a;
}, _t = {
  pop: gt,
  createWatermark: bt
}, Ye = async (e) => {
  var i, n;
  const t = await ((i = e.formRef) == null ? void 0 : i.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((l) => {
    var o, a;
    return ((o = l.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = l.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((l) => Ye(l.form)));
  return t && s.every((l) => l);
}, yt = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, J = (e, t) => {
  const s = e.__v_isRef ? e.value : mt(e), { text: i = "text", value: n = "value" } = t, l = s.map((a) => typeof a == "object" ? { text: a[i], value: a[n], raw: pt(a) } : { text: a, value: a });
  if (!t.sort)
    return l;
  const o = typeof t.sort == "string" ? t.sort : t.text || "text";
  return l.sort((a, r) => a[o].localeCompare(r[o]));
}, { ElMessage: vt, ElNotification: wt, ElMessageBox: St } = window.ElementPlus || {}, { showToast: kt, showNotify: Ct, showConfirmDialog: $t } = window.vant || {}, W = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? ((i === "error" || i === "warning") && (t.type = "fail"), t["z-index"] || (t["z-index"] = 1e6), kt(t)) : vt({
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
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? (i === "error" && (t.type = "danger"), Ct(t)) : wt({
    showClose: !0,
    ...t
  });
}, se = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = $t(e) : t = St.confirm(
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
  W[e] = W[e[0]] = (t) => W({ type: e, ...typeof t != "string" ? t : { message: t } }), ce[e] = ce[e[0]] = (t) => ce({ type: e, ...typeof t != "string" ? t : { message: t } }), se[e] = se[e[0]] = (t) => se({ type: e, ...t });
const xt = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    i.matched.length ? l() : l("/404");
  });
}, Vt = (e, t, s) => {
  e.afterEach((i, n) => {
    const l = i.matched.map((o) => o.meta.title);
    document.title = [t.app.sitename, ...l].filter((o) => o).reverse().join("-");
  });
}, Et = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    var o;
    return i.meta.acl === !1 || (o = i.meta) != null && o.visitable || t.acl.paths.includes(i.path) ? l() : (W.e("无权访问页面: " + i.path), l(t.acl.paths[0] || "/404"));
  }), oe(() => {
    let i = !1;
    Ce(() => t.acl.menus, (n) => {
      if (!i) {
        if (!n.length)
          return;
        i = !0;
      }
      const l = t.acl.paths, o = (a, r) => {
        var p, w, y, T, k, R, g;
        const h = (r != null && r.path ? r.path + "/" : "") + a.path;
        a.meta || (a.meta = {}), a.meta.acl === !1 ? (p = a.children) == null || p.forEach((C) => {
          var F;
          C.meta || (C.meta = {}), (F = C.meta).acl || (F.acl = !1), o(C, a);
        }) : (a.meta._hidden = a.meta.hidden, r && (a.meta.hidden == null && ((y = a.meta).hidden ?? (y.hidden = (w = r.meta) == null ? void 0 : w.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((k = a.meta).visitable ?? (k.visitable = (T = r.meta) == null ? void 0 : T.visitable), a.meta = { ...a.meta })), (R = a.children) == null || R.forEach((C) => o(C, a)), a.meta.hidden !== !1 && a.meta._hidden == null && (a.meta.hidden = !l.includes(h), (g = a.children) != null && g.some((C) => C.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach(o);
    }, { immediate: !0 });
  });
}, At = (e, t, s) => {
  e.beforeEach((i, n, l) => {
    i.name === "Login" && t.getters.logined && i.query.redirectTo ? l(i.query.redirectTo) : l();
  });
}, Ot = {
  check404: xt,
  setTitle: Vt,
  checkRolesPages: Et,
  redirectTo: At
}, Ge = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), Qe = (e = {}) => ({
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
  ...Ge(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), Tt = ({
  table: e = {},
  dialog: t = {},
  columns: s = [
    { fixed: "left", type: "selection" },
    { type: "_index" }
  ],
  query: i = {},
  form: n = {}
} = {}) => ({
  table: {
    ...Qe(i),
    ...e,
    columns: s
  },
  dialog: {
    ...he(),
    ...t,
    form: n
  }
}), { funcs: we } = StardustJs, jt = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let i of s)
    i.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[i.slice(3)] = t[i], delete t[i]) : i.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[i.slice(3)] = t[i], delete t[i]);
  return t;
}), Ft = (e, t) => {
  for (let s in e) {
    const i = e[s];
    !i || typeof i != "object" || (s === "table" && e[s]._isBaseTable && Ze(i, t), s === "dialog" && e[s]._isBaseDialog && et(i, t), s === "form" && e[s]._isBaseForm && Ve(i, t));
  }
  return e;
}, Ze = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), et = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), Ve(e, t), e), Ve = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((i) => i.visible !== !1)), st(e.form, e.formItems), e.initialForm = we.deepCopy(e.form), e.initialFormRules = we.deepCopy(e.formRules), Ce(() => e.formItems, () => {
  tt(e);
}, { immediate: !0, deep: !0 }), e), tt = (e) => {
  const { formItems: t, initialFormRules: s } = e, i = t.filter((l) => {
    let { formAttrs: o = {}, required: a = !1 } = l;
    return a = "required" in o ? o.required : a, !l.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(l.prop) && a !== !1;
  }).map((l) => l.prop);
  if (Object.assign(e.formRules, we.deepCopy(s)), Object.keys(e.formRules).forEach((l) => {
    l in s || delete e.formRules[l];
  }), !i.length)
    return;
  const n = {};
  return i.forEach((l) => {
    if (e.formRules[l])
      return;
    const o = t.find((T) => T.prop === l), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = it[a], h = [], p = "options" in o, y = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${p ? "选择" : "输入"}${(o == null ? void 0 : o.label) || l}` };
    o.validator && (y.validator = o.validator), o.asyncValidator && (y.asyncValidator = o.asyncValidator), o.comp ? h.push({ ...y, trigger: r.change }) : h.push({ ...y, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...y, trigger: r.blur }), n[l] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, st = (e, t, s = !0) => {
  const i = {};
  return t.forEach((n) => {
    var h, p;
    let l = "";
    const { type: o, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && o === "number" || n.comp === "ElInputNumber")
      l = 0;
    else if (n.comp === "ElSwitch")
      l = !1;
    else if (a && ((h = n.comp) != null && h.endsWith("XCheckboxs") || (p = n.comp) != null && p.endsWith("x-checkboxs") || r))
      l = [];
    else if (n.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(n.type)) {
      const w = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + w), n["end-placeholder"] || (n["end-placeholder"] = "结束" + w), l = [];
    }
    i[n.prop] = l;
  }), Object.assign(e, { ...i, ...e }), e;
}, nt = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [i, n] = e.split(s);
  n = n.split("|");
  let l = t[i];
  typeof l == "number" ? l += "" : typeof l == "string" && (l = l.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? l.startsWith(a) : o === "*=" ? l.includes(a) : o === "$=" ? l.endsWith(a) : o === "~=" ? !l.includes(a) : o === "!=" ? l !== a : a === l);
}, it = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, lt = {
  effects: _t,
  validateForm: Ye,
  formatPrecision: yt,
  formatOptions: J,
  Message: W,
  Notify: ce,
  Confirm: se,
  middlewares: Ot,
  baseForm: Ge,
  baseTable: Qe,
  baseDialog: he,
  baseModel: Tt,
  initFields: jt,
  initModel: Ft,
  initTable: Ze,
  initDialog: et,
  initForm: Ve,
  initFormRules: tt,
  initDefaultForm: st,
  isWhenMatched: nt,
  triggers: it
};
class ot {
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
    throw "请自行注入 router";
  }
  get route() {
    return this.router.currentRoute.value;
  }
  get params() {
    return this.route.params;
  }
  get query() {
    return this.route.query;
  }
  get store() {
    throw "请自行注入 store";
  }
  get uiUtils() {
    return lt;
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
const { funcs: Re, highdict: Ie, dates: ge } = StardustJs, { file: Be, excel: re } = StardustBrowser;
class at extends ot {
  constructor(t) {
    super(t);
    const { model: s, table: i, dialog: n, dbModelName: l = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = i || (s == null ? void 0 : s.table), this.dialog = n || (s == null ? void 0 : s.dialog), this.dbModelName = l, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._isExporting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], oe(() => {
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
    var t, s, i, n;
    if ((t = this.model) != null && t.form && ((s = this.dialog) != null && s.form))
      throw "conflict of model.form and dialog.form";
    return ((i = this.model) == null ? void 0 : i.form) || ((n = this.dialog) == null ? void 0 : n.form);
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
      "updatePartials",
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
    const i = await this.search(t);
    let n = Ie.get(i, this.listProp);
    return n = this.formatList(this._defaultFormatList(n, i), i), Object.assign(this.table, {
      list: n,
      total: i.total,
      loading: !1
    }), this.afterSearch(n, t, i), i;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await oe(), await Re.sleep(50), this._clearValidate(), this.afterAdd());
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
    if (await se.w({ message: "确定要删除吗？", title: "警告" })) {
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
      W("不支持的导出类型");
      return;
    }
    this._isExporting = !0;
    const { list: i, selection: n, ref: l } = this.table;
    let o = n.length > 0 ? n : i;
    o = Re.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(l._visibleColumns, "current"), r = a.map((y) => y.prop), h = a.map((y) => y.label);
    o = o.map((y) => r.map((T) => y[T]));
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
    let n = i.data;
    n = this.formatList(n, i), n = this.processExportingData(n, "search");
    const l = this.processExportingColumns(this.table.ref._visibleColumns, "search"), o = l.map((p) => p.prop), a = l.map((p) => p.label);
    n = n.map((p) => o.map((w) => p[w]));
    let r = null;
    t === "csv" ? r = re.export2Csv : r = re.export2Excel;
    let h = { header: a, data: n, filename: s };
    h = await this.processExporting(h), r(h), this._isExporting = !1;
  }
  async handleImport() {
    var l, o;
    const t = await Be.select(".xlsx,.csv"), s = t.name.toLowerCase().endsWith(".csv"), i = await Be.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      await ((l = window.DynamicLibs) == null ? void 0 : l.use("Papa")), n = window.Papa.parse(i, { header: !0 }).data;
    else {
      await ((o = window.DynamicLibs) == null ? void 0 : o.use("XLSX"));
      const a = window.XLSX.read(i, {}), r = Object.values(a.Sheets);
      n = XLSX.utils.sheet_to_json(r[0]);
    }
    if (n.length > 0) {
      const a = {};
      this.table.columns.forEach((h) => a[h.label] = h.prop);
      const r = Object.keys(n[0]);
      n = n.map((h) => {
        const p = {};
        return r.forEach((w) => p[a[w]] = h[w]), p;
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
    if (!await se.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
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
    let n = null;
    try {
      t[this.idField] ? n = await this.update(i, t[this.idField]) : n = await this.add(i);
    } catch (l) {
      this._showError(l.data.err), this._isSubmitting = !1;
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
  async handleLoad() {
    const { query: t } = this.table;
    if (!this.table.list.length)
      return await this.handleSearch(), t.page * t.limit >= this.table.total && (this.table.finished = !0), this.table.moreLoading = !1;
    const { loading: s, total: i } = this.table;
    if (s || !i || this.table.finished)
      return this.table.moreLoading = !1;
    if (t.page * t.limit >= i)
      return this.table.moreLoading = !1, this.table.finished = !0;
    this.table.isInfinite = !0, this.table.loading = !0, t.page++;
    const n = this.table.list.slice();
    await this.handleSearch({}, { isInfinite: !0 }), this.table.loading = !0, await this.$sleep(50), this.table.list = n.concat(this.table.list), this.table.loading = !1, this.table.moreLoading = !1;
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
    return s.length ? s.forEach((n) => i[n] = t[n]) : Object.assign(i, t), this.dialog.formItems.forEach((n) => {
      let l = i[n.model || n.prop];
      n.type === "number" ? l = this.uiUtils.formatPrecision(l, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? l = ge.format(l) : (!n.type || n.type === "date") && (l = ge.format(l, "", !1))), i[n.model || n.prop] = l;
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
  async updatePartials({ row: t }, s = []) {
    if (!s.length)
      return;
    this.table.loading = !0;
    const i = {};
    s.forEach((n) => i[n] = t[n]), await this.update(i, t[this.idField]), this.table.loading = !1;
  }
  _defaultFormatList(t, s) {
    const { columns: i, query: n } = this.table, { page: l, limit: o } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (l - 1) * o + r + 1;
    }), i.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: p, formatter: w, autoFill: y } = a.tableAttrs || {}, { modelName: T } = a.formAttrs || {};
      if (T && y)
        t.forEach((k) => k[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const R = Ce(() => a.options, (g, C) => {
          const F = C ? this.table.list : t, X = Dt(a);
          F.forEach((z, O) => {
            const V = z[r];
            z[`_formatted_${r}`] = X[V] || (w == null ? void 0 : w(V, z, O)) || V;
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
    const r = Ie.mapField(a.data, o, l);
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
        typeof a == "boolean" ? l[o] = a && 1 || 0 : a instanceof Date ? (l[o] = ge.format(a), l[o].endsWith(" 00:00:00") && (l[o] = l[o].slice(0, -9))) : typeof a == "object" && (l[o] = JSON.stringify(a));
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
    return Object.values(t).some((n) => !s.includes(n)) ? !0 : se.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
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
const Dt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: n = "value" } = s, l = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    l[o[n]] = o[i];
  }), l;
};
class Rt extends at {
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
const It = {
  BaseController: ot,
  CrudController: at,
  TempCrudController: Rt
}, E = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, n] of t)
    s[i] = n;
  return s;
}, Bt = {
  name: "XActionSheet",
  props: {
    actionSheet: Object
  }
};
function Lt(e, t, s, i, n, l) {
  const o = u("van-action-sheet");
  return d(), f(o, b(e.$attrs, {
    show: s.actionSheet.show,
    "onUpdate:show": t[0] || (t[0] = (a) => s.actionSheet.show = a),
    actions: s.actionSheet.actions
  }), null, 16, ["show", "actions"]);
}
const Mt = /* @__PURE__ */ E(Bt, [["render", Lt]]), Nt = {
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
}, Pt = { class: "x-auto-rows" }, Ut = { key: 1 };
function qt(e, t, s, i, n, l) {
  const o = u("x-col"), a = u("x-row");
  return d(), _("div", Pt, [
    (d(!0), _(B, null, M(l.rows, (r, h) => (d(), f(a, b({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), _(B, null, M(r, (p, w) => (d(), f(o, b(p, {
          span: p.span || s.span,
          key: w,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            p.slot || e.$attrs.slot ? $(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), _("span", Ut, A(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const Xt = /* @__PURE__ */ E(Nt, [["render", qt]]), zt = {
  name: "MobileXButton"
};
function Wt(e, t, s, i, n, l) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      $(e.$slots, "default")
    ]),
    _: 3
  });
}
const Ht = /* @__PURE__ */ E(zt, [["render", Wt]]), Jt = {
  name: "PcXButton"
};
function Kt(e, t, s, i, n, l) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      $(e.$slots, "default")
    ]),
    _: 3
  });
}
const Yt = /* @__PURE__ */ E(Jt, [["render", Kt]]), { funcs: Gt } = StardustBrowser, Qt = ["index", "selection", "expand", "radio", "_index"], Ee = {
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
      return Gt.calcPixel(this.height) * this.zoom + "px";
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
      const e = this.datasource.columns.filter((t) => !Qt.includes(t.type));
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
      return (t === "sum" || t === "average") && (i = e.reduce((n, l) => n + l, 0).toFixed(3) * 1), t === "count" ? i = e.length : t === "average" ? e.length ? i = (i / (s || e.length)).toFixed(3) * 1 : i = void 0 : t === "first" ? i = e[0] : t === "last" ? i = e[e.length - 1] : (t === "max" || t === "min") && (i = Math[t].apply(null, e)), i;
    },
    setRich(e) {
      var O;
      const { categories: t, data: s, attr: i, summary: n, type: l, filter: o, grid: a } = e, r = {}, h = Array.isArray(t) && t.length || ((O = t == null ? void 0 : t.data) == null ? void 0 : O.length), p = h && (Array.isArray(t) ? t : t.data), w = typeof e.series == "string" ? e.series : e.series.data, y = (o == null ? void 0 : o.categories.limit) > -1, T = (o == null ? void 0 : o.series.limit) > -1, k = {}, R = [], g = /* @__PURE__ */ new Set(), C = [];
      s.forEach((V) => {
        var L;
        let D = V[w] || "未知";
        if (T && C.length >= o.series.limit && !C.includes(D)) {
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
          k[N] || R.push(N), k[N] || (k[N] = {}), C.includes(D) || C.push(D), (L = k[N])[D] || (L[D] = []), k[N][D].push(V[i]);
        } else
          k[D] || C.push(D), k[D] || (k[D] = []), k[D].push(V[i]);
      });
      const F = h && !T ? [...new Set(s.map((V) => V[w]))] : C;
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
      let X = F;
      typeof e.series == "object" && e.series.formatter && (X = F.map((V) => e.series.formatter(V)));
      let z = [];
      h ? z = F.map((V, D) => ({
        name: X[D],
        type: l,
        label: { show: !0, position: "top" },
        data: R.map((L) => ({ name: L, value: k[L][V] }))
      })) : z = [
        {
          type: l,
          colorBy: "data",
          label: { show: !0, position: "top" },
          data: F.map((V) => ({ name: V, value: k[V] }))
        }
      ], Object.assign(r, {
        legend: { data: X },
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
}, Le = () => {
  He((e) => ({
    "54b2baec": e.zoomedHeight,
    "2b79eb74": e.zoom
  }));
}, Me = Ee.setup;
Ee.setup = Me ? (e, t) => (Le(), Me(e, t)) : Le;
const me = (e) => ($e("data-v-94e70f82"), e = e(), xe(), e), Zt = { class: "x-chart" }, es = {
  class: "chart",
  ref: "el"
}, ts = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "左", -1)), ss = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "上", -1)), ns = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "右", -1)), is = /* @__PURE__ */ me(() => /* @__PURE__ */ j("span", null, "下", -1));
function ls(e, t, s, i, n, l) {
  const o = u("pc-x-icon"), a = u("el-input-number"), r = u("el-col"), h = u("el-row"), p = u("el-checkbox"), w = u("el-tab-pane"), y = u("el-tabs"), T = u("x-form"), k = u("x-dialog"), R = te("loading");
  return I((d(), _("div", Zt, [
    j("div", es, null, 512),
    s.datasource ? (d(), _("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (g) => n.dialog.visible = !0)
    }, [
      x(" 配置 "),
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
      onSubmit: l.handleMakeChart,
      onCancel: t[13] || (t[13] = (g) => n.dialog.visible = !1)
    }, {
      default: c(() => [
        m(T, { dialog: n.dialog }, {
          grid: c(() => [
            m(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                m(r, { span: 12 }, {
                  default: c(() => [
                    ts,
                    m(a, {
                      modelValue: l.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => l.grid.left = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    ss,
                    m(a, {
                      modelValue: l.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (g) => l.grid.top = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    ns,
                    m(a, {
                      modelValue: l.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (g) => l.grid.right = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    is,
                    m(a, {
                      modelValue: l.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (g) => l.grid.bottom = g)
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
                m(w, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    m(p, {
                      modelValue: l.categories.isLimit,
                      "onUpdate:modelValue": t[5] || (t[5] = (g) => l.categories.isLimit = g)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    I(j("div", null, [
                      x(" 记录条数 "),
                      m(a, {
                        modelValue: l.categories.limit,
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => l.categories.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: l.categories.mergeOthers,
                        "onUpdate:modelValue": t[7] || (t[7] = (g) => l.categories.mergeOthers = g)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [De, l.categories.isLimit]
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
                      modelValue: l.series.isLimit,
                      "onUpdate:modelValue": t[8] || (t[8] = (g) => l.series.isLimit = g)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    I(j("div", null, [
                      x(" 记录条数 "),
                      m(a, {
                        modelValue: l.series.limit,
                        "onUpdate:modelValue": t[9] || (t[9] = (g) => l.series.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(p, {
                        modelValue: l.series.mergeOthers,
                        "onUpdate:modelValue": t[10] || (t[10] = (g) => l.series.mergeOthers = g)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [De, l.series.isLimit]
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
const os = /* @__PURE__ */ E(Ee, [["render", ls], ["__scopeId", "data-v-94e70f82"]]), as = {
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
  data() {
    return {
      _options: []
    };
  },
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
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = J(this.options, this);
      }
    }
  }
};
function rs(e, t, s, i, n, l) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, b({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, l.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), _(B, null, M(n._options, (r) => (d(), f(o, b(l.attrs, {
        key: r.text,
        shape: s.shape,
        name: r.value
      }), {
        default: c(() => [
          x(A(r.text), 1)
        ]),
        _: 2
      }, 1040, ["shape", "name"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const ds = /* @__PURE__ */ E(as, [["render", rs], ["__scopeId", "data-v-64dce36e"]]), cs = {
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
  data() {
    return {
      _options: []
    };
  },
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
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler(e) {
        this._options = J(e, this);
      }
    }
  }
}, us = { key: 1 };
function hs(e, t, s, i, n, l) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, b({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, l.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), _(B, null, M(n._options, (r) => (d(), f(o, b(l.attrs, {
        key: r.text,
        label: r.value
      }), {
        default: c(() => [
          e.$slots.custom ? $(e.$slots, "custom", {
            key: 0,
            option: r,
            raw: r.raw
          }, void 0, !0) : (d(), _("span", us, A(r.text), 1))
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const ms = /* @__PURE__ */ E(cs, [["render", hs], ["__scopeId", "data-v-9aba84fc"]]), ps = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function fs(e, t, s, i, n, l) {
  const o = u("van-col");
  return d(), f(o, b(l.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      $(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const gs = /* @__PURE__ */ E(ps, [["render", fs]]), bs = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function _s(e, t, s, i, n, l) {
  const o = u("el-col");
  return d(), f(o, b(l.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      $(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const ys = /* @__PURE__ */ E(bs, [["render", _s]]), vs = {
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
      await this.$nextTick(), this.visible = !0, await this.$nextTick(), this.$emit("cancel");
    },
    async handleConfirm() {
      await this.$nextTick(), this.visible = !0, await this.$nextTick(), this.$emit("submit");
    }
  }
}, ws = { key: 1 }, Ss = { key: 1 };
function ks(e, t, s, i, n, l) {
  const o = u("van-button"), a = u("van-col"), r = u("van-row");
  return d(), f(Q(s.actionsheet ? "van-action-sheet" : "van-dialog"), b({ width: "92%" }, e.$attrs, {
    show: l.visible,
    "onUpdate:show": t[0] || (t[0] = (h) => l.visible = h),
    class: "mobile-x-dialog",
    "show-confirm-button": l.canConfirm,
    "show-cancel-button": l.canCancel,
    onConfirm: l.handleConfirm,
    onCancel: l.handleCancel
  }), ne({ _: 2 }, [
    e.$slots.title || s.title ? {
      name: "title",
      fn: c(() => [
        e.$slots.title ? $(e.$slots, "title", { key: 0 }) : (d(), _("span", ws, A(s.title), 1))
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: c(() => [
        $(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: c(() => [
        $(e.$slots, "default")
      ]),
      key: "2"
    } : void 0,
    e.$slots.title || s.title ? {
      name: "description",
      fn: c(() => [
        e.$slots.title ? $(e.$slots, "title", { key: 0 }) : (d(), _("span", Ss, A(s.title), 1))
      ]),
      key: "3"
    } : void 0,
    l.canConfirm || l.canCancel ? {
      name: "cancel",
      fn: c(() => [
        m(r, null, {
          default: c(() => [
            l.canCancel ? (d(), f(a, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                m(o, {
                  block: "",
                  onClick: G(l.handleCancel, ["stop"])
                }, {
                  default: c(() => [
                    x(A(s.cancelText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : S("", !0),
            l.canConfirm ? (d(), f(a, {
              key: 1,
              span: 12
            }, {
              default: c(() => [
                m(o, {
                  block: "",
                  style: { color: "var(--van-blue)" },
                  onClick: G(l.handleConfirm, ["stop"])
                }, {
                  default: c(() => [
                    x(A(s.submitText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
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
const Cs = /* @__PURE__ */ E(vs, [["render", ks]]), $s = {
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
}, xs = {
  key: 1,
  class: "el-dialog__title"
};
function Vs(e, t, s, i, n, l) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(Q(s.drawer ? "ElDrawer" : "ElDialog"), b({ draggable: s.draggable }, e.$attrs, {
    modelValue: l.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => l.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer }]
  }), {
    header: c(() => [
      e.$slots.header ? $(e.$slots, "header", { key: 0 }) : (d(), _("span", xs, A(s.title), 1)),
      s.drawer ? S("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: l.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? $(e.$slots, "footer", { key: 0 }) : S("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          x(A(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : S("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          x(A(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : S("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? $(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const Es = /* @__PURE__ */ E($s, [["render", Vs]]), K = {}, ee = {
  provinces: [],
  cities: [],
  counties: []
}, As = {
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
      provinces: Object.freeze(ee.provinces),
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
      this.cities = Object.freeze(ee.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(ee.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(K, this.areaList), ee.provinces = Object.entries(K.province_list).map((e) => ({ value: e[0], text: e[1] })), ee.cities = Object.entries(K.city_list).map((e) => ({ value: e[0], text: e[1] })), ee.counties = Object.entries(K.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(ee.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split("/");
      if (e) {
        const i = Object.entries(K.province_list).find((n) => n[1] === e);
        this.province = i == null ? void 0 : i[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const i = Object.entries(K.city_list).find((n) => n[1] === t);
        this.city = i == null ? void 0 : i[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const i = Object.entries(K.county_list).find((n) => n[1] === s);
        this.county = i == null ? void 0 : i[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && K.province_list[this.province] || "",
        this.number > 1 && this.city && K.city_list[this.city] || "",
        this.number > 2 && this.county && K.county_list[this.county] || ""
      ].slice(0, this.number).join("/");
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function Os(e, t, s, i, n, l) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      m(a, { span: l.span }, {
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
      l.number > 1 ? (d(), f(a, {
        key: 0,
        span: l.span
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
      l.number > 2 ? (d(), f(a, {
        key: 1,
        span: l.span
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
const Ts = /* @__PURE__ */ E(As, [["render", Os]]);
function js() {
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
function Fs() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function Ds() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function Rs() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return nt(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function Is() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function Bs(e) {
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
}
function Ls(e) {
  const t = { ...e.style };
  return "itemWidth" in this && (t.width = this.itemWidth), e.span && (t.width = e.span / 24 * 100 + "%"), e.offset && (t.marginLeft = e.offset / 24 * 100 + "%"), t;
}
function Ms(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const ie = {
  props: js,
  computed: {
    _model: Fs,
    _items: Ds,
    _visibleItems: Rs,
    _rules: Is
  },
  methods: {
    calcPlaceholder: Bs,
    calcStyle: Ls,
    formatModelValue: Ms
  }
}, Ns = {
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
function Ps(e, t, s, i, n, l) {
  const o = u("mobile-x-form-item"), a = u("van-cell-group"), r = u("van-form");
  return d(), f(r, {
    ref: "formRef",
    class: Y(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? $(e.$slots, "pre", { key: 0 }) : S("", !0),
      m(a, ue(Je(e.$attrs)), {
        default: c(() => [
          (d(!0), _(B, null, M(e._visibleItems, (h, p) => (d(), f(o, b(h, {
            rules: e._rules[h.prop] || h.rules,
            key: p,
            modelValue: e.formatModelValue(e._model[h.prop]),
            "onUpdate:modelValue": (w) => e._model[h.prop] = w,
            placeholder: e.calcPlaceholder(h)
          }), {
            default: c(() => [
              h.slot ? $(e.$slots, h.slot, ue(b({ key: 0 }, h))) : S("", !0)
            ]),
            _: 2
          }, 1040, ["rules", "modelValue", "onUpdate:modelValue", "placeholder"]))), 128))
        ]),
        _: 3
      }, 16),
      e.$slots.default ? $(e.$slots, "default", { key: 1 }) : S("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const Us = /* @__PURE__ */ E(Ns, [["render", Ps]]), qs = {
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
}, Xs = { key: 1 };
function zs(e, t, s, i, n, l) {
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
          e.$slots["collapse-title"] ? $(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", Xs, A(s.title), 1))
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
              e.$slots.pre ? $(e.$slots, "pre", { key: 0 }) : S("", !0),
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
                  p.slot ? $(e.$slots, p.slot, { key: 0 }) : S("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder", "style"]))), 128)),
              e.$slots.default ? $(e.$slots, "default", { key: 1 }) : S("", !0)
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
const Ws = /* @__PURE__ */ E(qs, [["render", zs]]);
function Hs(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ke(e);
}
const Se = (e) => {
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
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  }, p = [];
  return o === "html" ? h.class = "comp-html" : l = u(l), a && (h.innerHTML = a), r && p.push(r), Z(l, h, {
    default: () => p
  });
}, Js = (e) => {
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
    let p;
    h = m(u("el-tooltip"), {
      effect: "dark",
      content: r,
      placement: "bottom"
    }, Hs(p = Se(e)) ? p : {
      default: () => [p]
    });
  } else
    h = Se(e);
  return Z(u("el-form-item"), {
    ...t,
    ...s
  }, {
    default: () => [h],
    label: () => Z("span", {
      title: s.label,
      class: "overflow-text",
      style: {
        width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
        display: "inline-block"
      }
    }, [s.label])
  });
}, Ks = (e) => {
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
  const p = {
    modelValue: o,
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  };
  return a && s.label || r ? Z(u("van-field"), p, {
    input: () => a && s.label ? l.default() : Se(e)
  }) : (Object.assign(p, i), Z(u("van-field"), p));
}, Ys = {
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
    return Ks(this);
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
        comp: i,
        slot: n,
        compType: l,
        span: o,
        offset: a,
        showTooltip: r,
        required: h,
        format: p,
        style: w,
        html: y,
        class: T,
        ...k
      } = { ...this.$props, ...this.$attrs };
      return k;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Js(this);
  }
}, Ne = () => {
  He((e) => ({
    ba9709f0: e.width
  }));
}, Pe = Ae.setup;
Ae.setup = Pe ? (e, t) => (Ne(), Pe(e, t)) : Ne;
const Gs = /* @__PURE__ */ E(Ae, [["__scopeId", "data-v-d2cde1e2"]]), Ue = /* @__PURE__ */ Object.assign({}), Qs = {
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
      await Promise.all(Object.keys(Ue).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await Ue[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, Zs = ["src"];
function en(e, t, s, i, n, l) {
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), _("span", {
    key: 0,
    class: Y(l.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), _("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Zs)) : (d(), f(o, b({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const tn = /* @__PURE__ */ E(Qs, [["render", en]]), qe = /* @__PURE__ */ Object.assign({}), sn = {
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
      await Promise.all(Object.keys(qe).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], i = await qe[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, nn = ["src"];
function ln(e, t, s, i, n, l) {
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), _("span", {
    key: 0,
    class: Y(l.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), _("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, nn)) : (d(), f(o, ue(b({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(Q(s.name)))
    ]),
    _: 1
  }, 16));
}
const on = /* @__PURE__ */ E(sn, [["render", ln]]), { highdict: an } = StardustJs, { storage: rn } = StardustBrowser, { local: rt } = rn, Oe = ["index", "selection", "expand", "radio", "_index"];
function dn() {
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
function cn() {
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
function un() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function hn() {
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
function mn() {
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
function pn() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function fn() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function gn() {
  const { $props: e, _query: t } = this, { table: s, columns: i } = e;
  return (i || (s == null ? void 0 : s.columns) || []).map((l) => l.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (s.isInfinite ? 0 : (a - 1) * r) + o + 1;
    }
  }, l, { type: "index" }) : l.type === "radio" ? Object.assign({ width: 60, label: "单选" }, l) : Object.assign({}, l, l.tableAttrs));
}
function bn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function _n() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function yn() {
  const { table: e, finished: t } = this.$props;
  return t ?? (e == null ? void 0 : e.finished);
}
function vn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function wn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function Sn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function kn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function Cn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function $n() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function xn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function Vn() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function En() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function An() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : () => {
  };
}
function On() {
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
    "delete"
  ])]);
  const t = {};
  return e.forEach((i) => {
    const n = "handle" + i.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
    t[i] = this.controller[n];
  }), t;
}
function Tn() {
  const e = this._columns.filter((s) => s.type && Oe.includes(s.type) || s.fixed === "left"), t = this.settings.columns.filter((s) => !s.hide && s.fixed !== "left").map((s) => {
    const i = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...i,
      width: s.width || i.width
    };
  });
  return e.concat(t);
}
function jn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function Fn() {
  return this.table.hideHeader || this._attrs["hide-header"] !== void 0 && this._attrs["hide-header"] !== !1;
}
function Dn() {
  return this.table.hideTools || this._attrs["hide-tools"] !== void 0 && this._attrs["hide-tools"] !== !1;
}
function Rn() {
  return this.table.hideSearcher || this._attrs["hide-searcher"] !== void 0 && this._attrs["hide-searcher"] !== !1;
}
function In() {
  return this.table.hideChart || this._attrs["hide-chart"] !== void 0 && this._attrs["hide-chart"] !== !1;
}
function Bn() {
  return this.table.hideSettings || this._attrs["hide-settings"] !== void 0 && this._attrs["hide-settings"] !== !1;
}
function Ln() {
  return this.table.hideOperates || this._attrs["hide-operates"] !== void 0 && this._attrs["hide-operates"] !== !1;
}
function Mn() {
  return this.table.hidePagination || this._attrs["hide-pagination"] !== void 0 && this._attrs["hide-pagination"] !== !1;
}
function Nn() {
  return this.table.operatesWidth || this._attrs.operatesWidth || this._attrs["operates-width"] || 150;
}
function Pn() {
  return this._attrs["operates-dropdown"] !== void 0 && this._attrs["operates-dropdown"] !== !1;
}
function Un() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !Oe.includes(e.type)));
}
function qn() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function Xn() {
  const e = this._uid && rt.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Oe.includes(t.type))).map((t) => {
    const { prop: s, label: i, show: n, hide: l, width: o, virtual: a, fixed: r } = t;
    return { prop: s, label: i, show: n, hide: l, width: o, virtual: a, fixed: r };
  })), this.settings = e;
}
function zn(e) {
  rt.setJson(`Settings[${this._uid}]`, e);
}
function Wn(e, t) {
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
      return typeof n == "function" ? n(l, e, t) : an.get(e, n);
  }
  return l;
}
function Hn(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function Jn(e) {
  this.params = e, this._emit("search", e);
}
function Kn(e) {
  this.saveSettings(e), this.initSettings();
}
function Yn(e, t, s, i) {
  const n = this.settings.columns.find((l) => l.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function Gn(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Qn(e) {
  var t, s, i, n;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((n = (i = this.controller) == null ? void 0 : i.handleSortChange) == null || n.call(i, e));
}
function Zn(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function ei(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function ti() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function si() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function ni(e) {
  var i;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function ii(e) {
  var i;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function li(e, t) {
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
function oi(e, t) {
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
function ai(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function ri(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function di(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function ci(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function ui(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function hi(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function mi(e, t) {
  var i;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((i = t.previewSrcList) == null ? void 0 : i.call(t)) || [s];
}
function pi(e, t) {
  const s = "on" + e.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function fi() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const q = {
  props: dn,
  emits: cn,
  computed: {
    _attrs: un,
    domids: hn,
    elTableAttrs: mn,
    _loading: pn,
    _data: fn,
    _columns: gn,
    _query: bn,
    _total: _n,
    _finished: yn,
    _selection: vn,
    _chartHeight: wn,
    _chartOption: Sn,
    _onSearch: kn,
    _onAdd: Cn,
    _onExport: $n,
    _onSearchExport: xn,
    _onImport: Vn,
    _onMultiDelete: En,
    _onLoad: An,
    _listen: On,
    _visibleColumns: Tn,
    _uid: jn,
    hideHeader: Fn,
    hideTools: Dn,
    hideSearcher: Rn,
    hideChart: In,
    hideSettings: Bn,
    hideOperates: Ln,
    hidePagination: Mn,
    operatesWidth: Nn,
    operatesDropdown: Pn,
    searcherColumns: Un,
    searcherConfig: qn
  },
  watch: {
    $route: fi
  },
  methods: {
    initSettings: Xn,
    saveSettings: zn,
    calcValue: Wn,
    calcOverflowTooltip: Hn,
    handleSearch: Jn,
    handleResetSettings: Kn,
    handleHeaderDragend: Yn,
    handleSelectionChange: Gn,
    handleSortChange: Qn,
    handleCheckedChange: Zn,
    handleCollapseChange: ei,
    handleMinus: ti,
    handleToggleFullscreen: si,
    cellClassName: ni,
    cellStyle: ii,
    calcTagType: li,
    calcTagValue: oi,
    canEdit: ai,
    canSave: ri,
    canRowEdit: di,
    canCancelEdit: ci,
    canDelete: ui,
    _imageSrc: hi,
    _imagePreviewSrcList: mi,
    _emit: pi
  }
}, gi = {
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
    calcValue: q.methods.calcValue
  }
}, bi = { key: 0 }, _i = { key: 1 };
function yi(e, t, s, i, n, l) {
  const o = u("el-descriptions-item"), a = u("el-descriptions"), r = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (p) => n.activeNames = p),
    class: Y(["x-info", { "hide-header": l.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), _(B, null, M(l.blocks, (p, w) => (d(), f(r, {
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
                  y.slot ? (d(), _("span", bi, [
                    $(e.$slots, y.slot, ue(Je({ data: s.data, field: y, value: l.calcValue(s.data, y) })), void 0, !0)
                  ])) : (d(), _("span", _i, A(l.calcValue(s.data, y)), 1))
                ]),
                _: 2
              }, [
                s.labelSlot ? {
                  name: "label",
                  fn: c(() => [
                    $(e.$slots, "label", {
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
const vi = /* @__PURE__ */ E(gi, [["render", yi], ["__scopeId", "data-v-0c3b67a5"]]), wi = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Si = { key: 1 };
function ki(e, t, s, i, n, l) {
  return d(), _("div", null, [
    (d(!0), _(B, null, M(s.items, (o, a) => (d(), f(Q(s.compName), b({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? $(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), _("span", Si, A(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Ci = /* @__PURE__ */ E(wi, [["render", ki]]), $i = {
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
function xi(e, t, s, i, n, l) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), h = u("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      m(o, { span: 6 }, {
        default: c(() => [
          j("span", null, "总计: " + A(s.total), 1)
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
            "page-count": l.pageCount
          }), {
            "prev-text": c(() => [
              m(a, { name: "arrow-left" }),
              x(" 上一页 ")
            ]),
            "next-text": c(() => [
              x(" 下一页 "),
              m(a, { name: "arrow" })
            ]),
            page: c(({ text: p }) => [
              x(A(p), 1)
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
const Vi = /* @__PURE__ */ E($i, [["render", xi]]), Ei = {
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
function Ai(e, t, s, i, n, l) {
  const o = u("el-pagination");
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
const Oi = /* @__PURE__ */ E(Ei, [["render", Ai]]), Ti = {
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
function ji(e, t, s, i, n, l) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), _(B, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: Y(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, A(s.modelValue || s.placeholder), 3),
    m(a, b({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: l.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => l.visible = r)
    }), {
      default: c(() => [
        m(o, b(e.$attrs, {
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
const Fi = /* @__PURE__ */ E(Ti, [["render", ji]]), Di = {
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
  data() {
    return {
      _options: []
    };
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = J(this.options, this);
      }
    }
  }
};
function Ri(e, t, s, i, n, l) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, b({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), _(B, null, M(n._options, (r) => (d(), f(o, b(e.$attrs, {
        key: r.text,
        name: r.value
      }), {
        default: c(() => [
          x(A(r.text), 1)
        ]),
        _: 2
      }, 1040, ["name"]))), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const Ii = /* @__PURE__ */ E(Di, [["render", Ri], ["__scopeId", "data-v-0fd8723f"]]), Bi = {
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
  data() {
    return {
      _options: []
    };
  },
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
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = J(this.options, this);
      }
    }
  }
}, Li = { key: 1 };
function Mi(e, t, s, i, n, l) {
  const o = u("el-radio-group");
  return d(), f(o, b({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, l.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), _(B, null, M(n._options, (a) => (d(), f(Q(s.button ? "el-radio-button" : "el-radio"), b(l.attrs, {
        key: a.text,
        label: a.value
      }), {
        default: c(() => [
          e.$slots.custom ? $(e.$slots, "custom", {
            key: 0,
            option: a,
            raw: a.raw
          }, void 0, !0) : (d(), _("span", Li, A(a.text), 1))
        ]),
        _: 2
      }, 1040, ["label"]))), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const Ni = /* @__PURE__ */ E(Bi, [["render", Mi], ["__scopeId", "data-v-5922d9e1"]]), Pi = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Ui = { key: 1 };
function qi(e, t, s, i, n, l) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), _(B, null, M(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? $(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), _("span", Ui, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? $(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const Xi = /* @__PURE__ */ E(Pi, [["render", qi]]), zi = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Wi = { key: 1 };
function Hi(e, t, s, i, n, l) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), _(B, null, M(s.cols, (r, h) => (d(), f(o, b(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? $(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), _("span", Wi, A(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? $(e.$slots, "default", { key: 0 }) : S("", !0)
    ]),
    _: 3
  });
}
const Ji = /* @__PURE__ */ E(zi, [["render", Hi]]), Ki = {
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
function Yi(e, t, s, i, n, l) {
  const o = u("van-icon"), a = u("van-field");
  return d(), f(a, b({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: l.handleClick
  }), {
    "right-icon": c(() => [
      m(o, {
        name: "scan",
        onClick: l.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const Gi = /* @__PURE__ */ E(Ki, [["render", Yi]]), Qi = {
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
function Zi(e, t, s, i, n, l) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, b(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: l.handleClick
  }), {
    append: c(() => [
      m(o, {
        icon: "CameraFilled",
        onClick: l.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const el = /* @__PURE__ */ E(Qi, [["render", Zi]]), Te = async (e, t, s) => {
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: n = "text", value: l = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, l])], a.limit = a.limit || 20, i && (a.where = a.where || {}, a.where[n] = a.where[n] || {}, a.where[n]["[Op.like]"] = `%${i}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, dt = (e, t) => !e || typeof e != "object" ? e : !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((i) => e[i])[0], ct = (e, t) => !e || typeof e != "object" || !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((i) => e[i]).slice(1).join(" - ") + ")", tl = {
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
      var t;
      let e = this.modelValue;
      return (e === "true" || e === "false") && (e = e === "true"), ((t = this._options.find((s) => s.value === e)) == null ? void 0 : t.text) ?? "";
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = J(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: J,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Te(this.service.restful, e, this);
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || (this.visible = !0);
    }
  }
};
function sl(e, t, s, i, n, l) {
  const o = u("x-picker");
  return d(), _("div", {
    onClick: t[5] || (t[5] = (...a) => l.onClick && l.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(o, b(e.$attrs, {
      modelValue: l.formattedModelValue,
      "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a.selectedValues[0])),
      show: n.visible,
      columns: n._options,
      onClick: t[1] || (t[1] = G(() => {
      }, ["stop"])),
      onShow: t[2] || (t[2] = (a) => n.visible = !0),
      onCancel: t[3] || (t[3] = (a) => n.visible = !1),
      onConfirm: t[4] || (t[4] = (a) => n.visible = !1)
    }), null, 16, ["modelValue", "show", "columns"])
  ]);
}
const nl = /* @__PURE__ */ E(tl, [["render", sl]]), il = {
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
        this._options = J(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: J,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Te(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return dt(e, this);
    },
    calcRemarkLabel(e) {
      return ct(e, this);
    }
  }
}, ll = { key: 1 }, ol = { class: "main" }, al = { class: "remark" };
function rl(e, t, s, i, n, l) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, b({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || l.remoteSearch
  }), {
    default: c(() => [
      (d(!0), _(B, null, M(n._options, (r, h) => (d(), f(o, b(e.$attrs, {
        key: r.value,
        label: r.text,
        value: r.value
      }), {
        default: c(() => [
          e.$slots.custom ? $(e.$slots, "custom", {
            key: 0,
            option: r,
            raw: r.raw
          }, void 0, !0) : (d(), _("span", ll, [
            j("span", ol, A(l.calcMainLabel(s.options[h])), 1),
            j("span", al, A(l.calcRemarkLabel(s.options[h])), 1)
          ]))
        ]),
        _: 2
      }, 1040, ["label", "value"]))), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote-method"]);
}
const dl = /* @__PURE__ */ E(il, [["render", rl], ["__scopeId", "data-v-f40a3d2e"]]), cl = {
  name: "XSelectV2",
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
    options: Array | Object
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
        this._options = J(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: J,
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Te(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return dt(e, this);
    },
    calcRemarkLabel(e) {
      return ct(e, this);
    }
  }
}, ul = { key: 1 }, hl = { class: "main" }, ml = { class: "remark" };
function pl(e, t, s, i, n, l) {
  const o = u("el-select-v2");
  return d(), f(o, b({
    class: ["pc-x-select-v2", s.plain ? "x-select-v2--plain" : ""],
    loading: n.loading
  }, e.$attrs, {
    options: n._options,
    props: { label: "text" },
    filterable: s.filterable,
    clearable: "",
    "remote-method": e.$attrs.remoteMethod || l.remoteSearch
  }), {
    default: c(({ item: a, index: r }) => [
      e.$slots.custom ? $(e.$slots, "custom", {
        key: 0,
        option: e.option,
        raw: e.option.raw
      }, void 0, !0) : (d(), _("span", ul, [
        j("span", hl, A(l.calcMainLabel(s.options[r])), 1),
        j("span", ml, A(l.calcRemarkLabel(s.options[r])), 1)
      ]))
    ]),
    _: 3
  }, 16, ["class", "loading", "options", "filterable", "remote-method"]);
}
const fl = /* @__PURE__ */ E(cl, [["render", pl], ["__scopeId", "data-v-3dc27006"]]), Xe = {
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
}, gl = [{
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
}], P = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  XRadios: ["eq", "ne", "special"],
  XCheckboxs: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"]
};
P["x-select"] = P.XSelect;
P.XSelectV2 = P.XSelect;
P["x-select-v2"] = P.XSelect;
P["x-radios"] = P.XRadios;
P["x-checkboxs"] = P.XCheckboxs;
P["el-date-picker"] = P.ElDatePicker;
P["el-input-number"] = P.ElInputNumber;
P["el-input"] = P.ElInput;
function bl() {
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
      default: () => [x("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [n.map((y, T) => m("div", {
      class: "condition flex-center",
      key: y.no
    }, [t.traditional ? null : m(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(T)
    }, {
      default: () => [x("X")]
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
    }, [_l(this, y)])])]))]), t.traditional ? null : m(u("el-input"), b({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: l,
      "onUpdate:modelValue": (y) => this.expression = y
    }), null)]
  });
}
function _l(e, t) {
  const s = (n) => Z(u((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (l) => t.value = l
  }, n)), i = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? m("div", {
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
    options: gl
  }) : s();
}
const { storage: be } = StardustBrowser, { deepCopy: yl } = StardustJs.funcs, vl = {
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
  render: bl,
  methods: {
    init() {
      const e = this.uid && be.local.getJson(this.key, this.config) || this.config;
      this.initConfig(yl(e));
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
        i.item = this.columns.find((a) => a.prop === n), this.handleSelectField(i, n), this.handleSelectOp(i, l), i.value = o, i.ops = P[i.component].map((a) => Xe[a]);
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
      e.value = "", e.prop = t, e.item = this.columns.find((V) => V.prop === e.prop);
      const { options: s, type: i, formAttrs: n = {} } = e.item, l = { ...e.item, ...n }, {
        comp: o,
        visible: a,
        canAdd: r,
        canEdit: h,
        required: p,
        slot: w,
        span: y,
        tableAttrs: T,
        formAttrs: k,
        tagTypes: R,
        tagValues: g,
        width: C,
        minWidth: F,
        disabled: X,
        readonly: z,
        ...O
      } = l;
      O.clearable ?? (O.clearable = !0), e.config = O, e.component = o || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = P[e.component].map((V) => Xe[V]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", O.type = "date"), O.type === "textarea" && delete O.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, je = /* @__PURE__ */ E(vl, [["__scopeId", "data-v-69b3e55b"]]), wl = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...q.props(),
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
    ...q.emits()
  ],
  components: { Searcher: je },
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
    ...q.computed,
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
    ...q.methods,
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
}, Sl = { class: "mobile-x-table" }, kl = {
  key: 1,
  class: "card"
}, Cl = ["onClick"], $l = { class: "row-header flex-center" }, xl = ["value", "checked"], Vl = { class: "label" }, El = { class: "value" }, Al = ["value", "checked"], Ol = {
  key: 2,
  class: "index"
}, Tl = { class: "title" };
function jl(e, t, s, i, n, l) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("x-icon"), p = u("van-cell"), w = u("van-list"), y = u("x-pagination"), T = u("x-info"), k = u("van-popup"), R = u("van-action-sheet");
  return d(), _("div", Sl, [
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
          $(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: c(() => [
          $(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), _("div", kl, [
      (d(!0), _(B, null, M(e._data, (g, C) => (d(), _("div", {
        key: C,
        class: "row",
        onClick: (F) => l.handleClickCard(C)
      }, [
        j("div", $l, [
          l.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[C],
            "onUpdate:modelValue": (F) => n.selected[C] = F,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = G(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
          m(h, {
            name: "ellipsis",
            class: "more",
            onClick: G((F) => l.handleShowActionSheet(g, C), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        l.hasRadio ? (d(), _("input", {
          key: 0,
          type: "radio",
          value: C,
          checked: C === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = G(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
        }, null, 40, xl)) : S("", !0),
        (d(!0), _(B, null, M(l.cols, (F, X) => (d(), _("div", {
          key: X,
          class: "field"
        }, [
          j("span", Vl, A(F.label) + ":", 1),
          j("span", El, A(e.calcValue(g, F)), 1)
        ]))), 128))
      ], 8, Cl))), 128))
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
          onClick: (F) => l.handleShowDetail(g, C)
        }, {
          default: c(() => [
            l.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[C],
              "onUpdate:modelValue": (F) => n.selected[C] = F,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = G(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : S("", !0),
            l.hasRadio ? (d(), _("input", {
              key: 1,
              type: "radio",
              value: C,
              checked: C === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = G(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
            }, null, 40, Al)) : S("", !0),
            l.hasIndex ? (d(), _("span", Ol, A(C + 1), 1)) : S("", !0),
            j("span", Tl, A(l.calcTitle(g)), 1)
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
        m(T, {
          data: n.scope.row,
          fields: l.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    m(R, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (g) => n.actionSheetVisible = g),
      actions: l.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: l.handleSelectAction,
      onCancel: t[10] || (t[10] = (g) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Fl = /* @__PURE__ */ E(wl, [["render", jl], ["__scopeId", "data-v-84e93229"]]), Dl = {
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
          const { prop: t, label: s, show: i, hide: n, width: l } = e;
          return { prop: t, label: s, show: i, hide: n, width: l };
        })
      });
    }
  }
}, Rl = (e) => ($e("data-v-a2f0fe24"), e = e(), xe(), e), Il = {
  class: "table",
  ref: "colsTable"
}, Bl = ["data-prop"], Ll = ["title", "onClick"], Ml = /* @__PURE__ */ Rl(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1)), Nl = {
  class: "table",
  ref: "sortsTable"
}, Pl = ["data-prop"];
function Ul(e, t, s, i, n, l) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), h = u("ElCheckbox"), p = u("el-input-number"), w = u("el-tab-pane"), y = u("x-select"), T = u("x-radios"), k = u("el-tabs"), R = u("el-popover");
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
          m(w, {
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              m(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: l.handleResetColumns
              }, {
                default: c(() => [
                  x("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", Il, [
                (d(!0), _(B, null, M(n.columns, (g) => (d(), _("div", {
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
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  j("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (C) => l.handleToggle(g)
                  }, A(g.label), 9, Ll),
                  m(p, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (C) => g.width = C,
                    onChange: l.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  Ml
                ], 8, Bl))), 128))
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
                onClick: l.handleAddSort
              }, {
                default: c(() => [
                  x("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", Nl, [
                (d(!0), _(B, null, M(n.sorts, (g, C) => (d(), _("div", {
                  key: g[0],
                  "data-prop": g[0],
                  class: "row flex-center"
                }, [
                  m(y, {
                    modelValue: g[0],
                    "onUpdate:modelValue": (F) => g[0] = F,
                    options: n.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(T, {
                    modelValue: g[1],
                    "onUpdate:modelValue": (F) => g[1] = F,
                    options: n.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (F) => n.sorts.splice(C, 1)
                  }, null, 8, ["onClick"])
                ], 8, Pl))), 128))
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
const ut = /* @__PURE__ */ E(Dl, [["render", Ul], ["__scopeId", "data-v-a2f0fe24"]]), { highdict: ql } = StardustJs, Xl = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...q.props()
  },
  emits: [
    ...q.emits()
  ],
  components: { Searcher: je, Settings: ut },
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
    ...q.computed
  },
  watch: {
    ...q.watch,
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
    ...q.methods,
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
        const i = this.controller.getSearchParams(), n = await this.controller.search(i);
        let l = ql.get(n, this.controller.listProp);
        return l = this.controller.formatList(this.controller._defaultFormatList(l, n), n), l;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, zl = {
  key: 1,
  class: "collapse-title"
}, Wl = {
  key: 2,
  class: "collapse-title"
}, Hl = /* @__PURE__ */ j("span", null, "-", -1), Jl = ["value", "checked"], Kl = { key: 1 };
function Yl(e, t, s, i, n, l) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), p = u("el-image"), w = u("el-tag"), y = u("el-icon"), T = u("el-table-column"), k = u("el-button"), R = u("el-dropdown-item"), g = u("el-dropdown-menu"), C = u("el-dropdown"), F = u("el-table"), X = u("x-pagination"), z = u("el-collapse-item"), O = u("el-collapse"), V = u("x-chart"), D = u("x-dialog"), L = te("domid"), N = te("loading"), le = te("el-table-infinite-scroll");
  return d(), _(B, null, [
    j("div", {
      class: Y(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      m(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      m(O, {
        modelValue: n.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (v) => n.activeNames = v),
        class: Y((n._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          m(z, {
            name: n.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? $(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), _("span", zl, A(e.title), 1)) : (d(), _("span", Wl, [
                x(A(e.title) + "，当前第 ", 1),
                j("span", null, A(e._query.page), 1),
                x(" 页，展示 "),
                j("span", null, A(e._data.length), 1),
                x(" 条数据， 共 "),
                j("span", null, A(e._total || e._data.length), 1),
                x(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              $(e.$slots, "tools-top"),
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
                    onClick: l.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  j("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...v) => e.handleMinus && e.handleMinus(...v))
                  }, [
                    m(a, { name: "FullScreen" }),
                    Hl
                  ]),
                  m(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  m(r, {
                    modelValue: n.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (v) => n.settings = v),
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
                    $(e.$slots, "tools-prefix")
                  ]),
                  key: "0"
                } : void 0,
                e.$slots["tools-suffix"] ? {
                  name: "tools-suffix",
                  fn: c(() => [
                    $(e.$slots, "tools-suffix")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
              $(e.$slots, "tools-bottom"),
              I((d(), f(F, b({ ref: "tableRef" }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), _(B, null, M(e._visibleColumns, (v, H) => (d(), f(T, b(v, {
                    key: H,
                    "min-width": v.minWidth,
                    align: v.align || e._attrs.tableAlign || "center",
                    resizable: v.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(v)
                  }), ne({ _: 2 }, [
                    ["selection", "index"].includes(v.type) ? void 0 : {
                      name: "default",
                      fn: c((U) => [
                        v.type === "radio" ? (d(), _("input", {
                          key: 0,
                          type: "radio",
                          value: U.$index,
                          checked: U.$index === n.checked,
                          onChange: t[3] || (t[3] = (...fe) => e.handleCheckedChange && e.handleCheckedChange(...fe))
                        }, null, 40, Jl)) : v.slot === "$image" ? (d(), f(p, b({
                          key: 1,
                          src: e._imageSrc(U, v),
                          "preview-src-list": e._imagePreviewSrcList(U, v),
                          "preview-teleported": ""
                        }, v.imageAttrs), null, 16, ["src", "preview-src-list"])) : v.slot === "$tag" ? (d(), f(w, {
                          key: 2,
                          type: e.calcTagType(U, v)
                        }, {
                          default: c(() => [
                            x(A(e.calcTagValue(U, v)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : v.slot === "$icon" ? (d(), f(y, {
                          key: 3,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(Q(U.row[v.prop])))
                          ]),
                          _: 2
                        }, 1024)) : v.slot ? $(e.$slots, v.slot, {
                          key: 4,
                          scope: U,
                          column: v,
                          value: U.row[v.prop]
                        }) : e.slotAll ? $(e.$slots, "all", {
                          key: 5,
                          scope: U,
                          column: v,
                          value: U.row[v.prop]
                        }) : (d(), _(B, { key: 6 }, [
                          v.comp === "ElSwitch" || e.table.isRowEdit && U.row.isEditing && (v.visible !== !1 || v.canEdit) ? (d(), f(Q(v.comp || "ElInput"), b({ key: 0 }, { ...v, ...v.formAttrs }, {
                            modelValue: U.row[v.prop],
                            "onUpdate:modelValue": (fe) => U.row[v.prop] = fe,
                            disabled: !U.row.editable || !U.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), _("span", Kl, A(e.calcValue(U.row, v)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? S("", !0) : (d(), f(T, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((v) => [
                      $(e.$slots, "operates-prefix", { scope: v }),
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
                                      x(" 编辑 ")
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
                                      x(" 保存 ")
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
                                      x(" 取消编辑 ")
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
                                      x(" 删除 ")
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
                              x(" 操作 ")
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
                          x(" 编辑 ")
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
                          x(" 保存 ")
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
                          x(" 取消编辑 ")
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
                          x(" 删除 ")
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [L, e.domids.delete]
                      ]) : S("", !0),
                      $(e.$slots, "operates-suffix", { scope: v })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["infinite-scroll-disabled", "onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [N, e._loading],
                [le, e._onLoad]
              ]),
              e._query && e._total && !e.hidePagination ? (d(), f(X, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: l.onPaging
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
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (v) => n.dialog.visible = v),
      title: "图表",
      width: "96%",
      onFullscreenchange: l.handleChartDialogFullscreen
    }, {
      default: c(() => [
        m(V, {
          ref: "chartRef",
          height: e._chartHeight,
          option: e._chartOption,
          datasource: { columns: e._columns, search: l.search }
        }, null, 8, ["height", "option", "datasource"])
      ]),
      _: 1
    }, 8, ["modelValue", "onFullscreenchange"]))
  ], 64);
}
const Gl = /* @__PURE__ */ E(Xl, [["render", Yl]]), Ql = {
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
}, Zl = { class: "mobile-x-table-tools" }, eo = { key: 0 }, to = { class: "tools" }, so = { class: "tools-end" };
function no(e, t, s, i, n, l) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), h = te("domid");
  return d(), _("div", Zl, [
    e.$attrs.onAdd ? I((d(), _("div", eo, [
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
    j("div", to, [
      $(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? I((d(), f(r, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
        onClick: t[1] || (t[1] = (p) => e.$emit("search"))
      }), {
        default: c(() => [
          m(a, { name: "search" }),
          x(" 查询 ")
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
          x(" 编辑 ")
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
          x(" 批量删除 ")
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
          x(" 导出 ")
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
          x(" 查询导出 ")
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
          x(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : S("", !0),
      $(e.$slots, "tools-suffix", {}, void 0, !0),
      j("div", so, [
        $(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const io = /* @__PURE__ */ E(Ql, [["render", no], ["__scopeId", "data-v-6ef6b95e"]]), lo = {
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
}, oo = { class: "tools" }, ao = { class: "tools-end flex-center" };
function ro(e, t, s, i, n, l) {
  const o = u("el-button"), a = u("el-card"), r = te("domid");
  return d(), f(a, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      j("div", oo, [
        $(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onSearch ? I((d(), f(o, b({ key: 0 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          onClick: t[0] || (t[0] = (h) => e.$emit("search"))
        }), {
          default: c(() => [
            x(" 查询 ")
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
            x(" 新增 ")
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
            x(" 编辑 ")
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
            x(" 批量删除 ")
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
            x(" 导出 ")
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
            x(" 查询导出 ")
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
            x(" 导入 ")
          ]),
          _: 1
        }, 16)), [
          [r, s.domids.import]
        ]) : S("", !0),
        $(e.$slots, "tools-suffix", {}, void 0, !0),
        j("div", ao, [
          $(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const co = /* @__PURE__ */ E(lo, [["render", ro], ["__scopeId", "data-v-368940cf"]]);
function ht(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Ke(e);
}
const uo = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, i = (n) => {
    n ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const l = n ? e._data.slice() : [];
    e.handleSelectionChange(l);
  };
  return m(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: i
  }, null);
}, ho = (e, t) => {
  const {
    rowIndex: s,
    rowData: i
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const l = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(l);
  };
  return m(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, mo = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, po = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return m("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, pe = ([e, t, s, i, n, l]) => {
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
    icon: n,
    onClick: r
  }), ht(l) ? l : {
    default: () => [l]
  });
}, fo = (e, t) => {
  if (t.canEdit(e.rowData))
    return pe([e, t, "edit", "warning", "edit", "编辑"]);
}, go = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return pe([e, t, "row-edit", "success", "collection", "保存"]);
}, bo = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return pe([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, _o = (e, t) => {
  if (t.canDelete(e.rowData))
    return pe([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, yo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (l) => ho(l, t);
  if (e.type === "index")
    return (l) => mo(l, t);
  if (e.type === "radio")
    return (l) => po(l, t);
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
      const p = (y) => {
        o[a.prop] = y;
      }, w = a.comp || "ElInput";
      return Z(u(w), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: p,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(l.rowData, e), {
      showOverflowTooltip: h
    } = a.tableAttrs || {};
    return h ? m(u("el-tooltip"), {
      content: r
    }, ht(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, vo = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, n = e.map((l, o) => {
    const {
      tableAttrs: a = {}
    } = l, r = {
      ...l,
      key: l.prop,
      dataKey: l.prop,
      title: l.label,
      width: l.width || a.width || l.minWidth || a.minWidth || l.maxWidth || a.maxWidth,
      align: l.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = uo(t)), r.cellRenderer = yo(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 150,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(l) {
      return m("div", {
        class: "operates"
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, fo(l, t), go(l, t), bo(l, t), _o(l, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), n;
}, wo = {
  convertColumnsForTableV2: vo
}, So = {
  name: "XTableV2",
  props: {
    ...q.props(),
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
    ...q.emits()
  ],
  components: { Searcher: je, Settings: ut },
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
    ...q.computed
  },
  watch: {
    ...q.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...q.methods,
    convertColumnsForTableV2: wo.convertColumnsForTableV2
  }
}, ko = { key: 1 };
function Co(e, t, s, i, n, l) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), p = u("el-table-v2"), w = u("el-auto-resizer"), y = u("x-pagination"), T = u("el-collapse-item"), k = u("el-collapse"), R = te("loading");
  return d(), _("div", {
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
        m(T, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? $(e.$slots, "collapse-title", { key: 0 }) : (d(), _("span", ko, A(e.title), 1))
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
                  $(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  $(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : S("", !0),
            m(w, {
              style: ft({ height: s.height })
            }, {
              default: c(({ width: g, height: C }) => [
                I((d(), f(p, b({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: l.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: g,
                  height: C
                }), ne({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: c(() => [
                      $(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: c(() => [
                      $(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: c(() => [
                      $(e.$slots, "overlay")
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
const $o = /* @__PURE__ */ E(So, [["render", Co]]), _e = ["selection", "radio"], xo = {
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
}, Vo = { class: "x-table-viewer" };
function Eo(e, t, s, i, n, l) {
  const o = u("x-dialog");
  return d(), _("div", Vo, [
    m(o, b(l._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": l.handleBeforeClose,
      onSubmit: l.handleSubmit,
      onCancel: l.handleCancel
    }), {
      default: c(() => [
        (d(), f(Q(s.useTableV2 ? "x-table-v2" : "x-table"), b({
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
const Ao = /* @__PURE__ */ E(xo, [["render", Eo], ["__scopeId", "data-v-e6f36700"]]), Oo = {
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
}, To = { class: "mobile-x-tags" };
function jo(e, t, s, i, n, l) {
  const o = u("van-tag");
  return d(), _("div", To, [
    (d(!0), _(B, null, M(l._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a.text, r)
    }), {
      default: c(() => [
        x(A(a.text), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Fo = /* @__PURE__ */ E(Oo, [["render", jo], ["__scopeId", "data-v-00235f22"]]), Do = {
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
}, Ro = { class: "pc-x-tags" };
function Io(e, t, s, i, n, l) {
  const o = u("el-tag");
  return d(), _("div", Ro, [
    (d(!0), _(B, null, M(l._data, (a, r) => (d(), f(o, b({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a.text, r)
    }), {
      default: c(() => [
        x(A(a.text), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Bo = /* @__PURE__ */ E(Do, [["render", Io], ["__scopeId", "data-v-4674d140"]]), Lo = {
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
}, Mo = { class: "x-tinymce" }, No = ["id", "innerHTML"];
function Po(e, t, s, i, n, l) {
  return d(), _("div", Mo, [
    j("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, No)
  ]);
}
const Uo = /* @__PURE__ */ E(Lo, [["render", Po]]), qo = {
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
}, Fe = (e) => ($e("data-v-a3a105f3"), e = e(), xe(), e), Xo = { class: "mask" }, zo = {
  key: 0,
  class: "el-upload__text"
}, Wo = /* @__PURE__ */ Fe(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), Ho = /* @__PURE__ */ Fe(() => /* @__PURE__ */ j("br", null, null, -1)), Jo = /* @__PURE__ */ Fe(() => /* @__PURE__ */ j("br", null, null, -1)), Ko = {
  key: 0,
  class: "path"
};
function Yo(e, t, s, i, n, l) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
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
    default: c(() => [
      j("div", Xo, [
        m(o, { name: "upload-filled" }),
        n.disabled ? S("", !0) : (d(), _("div", zo, [
          x(" 将文件拖到此处，或"),
          Wo,
          Ho,
          Jo,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: G(l.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              x(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : S("", !0)
        ]))
      ]),
      l.filepath ? (d(), _("div", Ko, A(s.modelValue), 1)) : S("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Go = /* @__PURE__ */ E(qo, [["render", Yo], ["__scopeId", "data-v-a3a105f3"]]), Qo = {
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
}, Zo = ["src"];
function ea(e, t, s, i, n, l) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("x-dialog");
  return d(), _(B, null, [
    m(r, b({
      "file-list": n.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (p) => n.fileList = p),
        l.handleSelect
      ],
      action: s.action,
      "list-type": "picture-card",
      accept: "image/*",
      multiple: s.multiple,
      limit: l.limit,
      class: ["x-image-uploader", { disabled: e.$attrs.disabled || l.images.length >= l.limit }],
      "on-preview": l.handlePreview,
      "on-exceed": l.handleExceed
    }, e.$attrs, {
      "auto-upload": e.$attrs.autoUpload || !1,
      "on-remove": l.handleRemove
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
      actionsheet: "",
      title: "预览图片" + (n.previewingImage.name || "")
    }, {
      default: c(() => [
        j("img", {
          src: n.previewingImage.url,
          alt: "previewing-image",
          class: "previewing-image"
        }, null, 8, Zo)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const ta = /* @__PURE__ */ E(Qo, [["render", ea], ["__scopeId", "data-v-0afe3ea6"]]), ye = {
  xactionsheet: Mt,
  xautorows: Xt,
  mobilexbutton: Ht,
  pcxbutton: Yt,
  xchart: os,
  mobilexcheckboxs: ds,
  pcxcheckboxs: ms,
  mobilexcol: gs,
  pcxcol: ys,
  mobilexdialog: Cs,
  pcxdialog: Es,
  xdistrictselect: Ts,
  mobilexform: Us,
  pcxform: Ws,
  mobilexformitem: Ys,
  pcxformitem: Gs,
  mobilexicon: tn,
  pcxicon: on,
  xinfo: vi,
  xlooper: Ci,
  mobilexpagination: Vi,
  pcxpagination: Oi,
  xpicker: Fi,
  mobilexradios: Ii,
  pcxradios: Ni,
  mobilexrow: Xi,
  pcxrow: Ji,
  mobilexscan: Gi,
  pcxscan: el,
  mobilexselect: nl,
  pcxselect: dl,
  xselectv2: fl,
  mobilextable: Fl,
  pcxtable: Gl,
  mobilextabletools: io,
  pcxtabletools: co,
  xtablev2: $o,
  xtableviewer: Ao,
  mobilextags: Fo,
  pcxtags: Bo,
  xtinymce: Uo,
  xfileuploader: Go,
  ximageuploader: ta
}, ae = {};
for (let e in ye)
  ae[ye[e].name] = ye[e];
const { ElInfiniteScroll: ze } = window.ElementPlus || {}, de = ".el-scrollbar__wrap", We = (e, t) => {
  sa(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", i = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (i < 1 ? 1 : i) + "");
}, sa = (e, t, s) => {
  let i;
  s.forEach((n) => {
    i = e.getAttribute(n), i !== null ? t.setAttribute(n, i) : t.removeAttribute(n);
  });
}, na = {
  name: "el-table-infinite-scroll",
  mounted(e, t, s, i) {
    const n = e.querySelector(de);
    if (!n)
      throw new Error(`${de} element not found.`);
    n.style.overflowY = "auto", setTimeout(() => {
      !e.style.height && !e.style.maxHeight && (n.style.height = "400px", console.warn("el-table height required, otherwise will set scrollbar default height: 400px")), We(e, n), ze.mounted(n, t, s, i);
    }, 0);
  },
  updated(e) {
    We(e, e.querySelector(de));
  },
  unmounted(e, ...t) {
    const s = e.querySelector(de);
    ze.unmounted(s, ...t);
  }
}, ve = {
  ElTableInfiniteScroll: na
}, ia = (e) => ({
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
    return Z(ae[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), ke = (() => {
  const e = Object.keys(ae), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = ae[i]);
  for (const i of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(i.toLowerCase())) ? s[i] = ia(i) : s[i] = ae[i];
  return s;
})(), la = (e, t) => {
  for (let s in ke)
    e.component(s, ke[s]);
  for (let s in ve)
    e.directive(ve[s].name, ve[s]);
}, aa = {
  version: "1.2.27",
  ...ke,
  ...lt,
  ...It,
  install: la
};
export {
  ot as BaseController,
  se as Confirm,
  at as CrudController,
  W as Message,
  ce as Notify,
  Rt as TempCrudController,
  he as baseDialog,
  Ge as baseForm,
  Tt as baseModel,
  Qe as baseTable,
  It as controllers,
  aa as default,
  _t as effects,
  J as formatOptions,
  yt as formatPrecision,
  st as initDefaultForm,
  et as initDialog,
  jt as initFields,
  Ve as initForm,
  tt as initFormRules,
  Ft as initModel,
  Ze as initTable,
  nt as isWhenMatched,
  it as triggers,
  lt as utils,
  Ye as validateForm
};
