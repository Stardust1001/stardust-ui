import { toRaw as yt, markRaw as ie, nextTick as le, watch as Oe, resolveComponent as u, openBlock as d, createElementBlock as w, createElementVNode as j, createVNode as p, withCtx as c, createTextVNode as x, Fragment as P, renderList as M, mergeProps as _, createBlock as f, renderSlot as E, toDisplayString as $, useCssVars as je, resolveDirective as Q, withDirectives as I, createCommentVNode as k, vShow as qe, pushScopeId as Fe, popScopeId as Te, resolveDynamicComponent as ee, createSlots as oe, withModifiers as G, normalizeClass as J, normalizeProps as De, h as te, isVNode as nt, withKeys as Re, normalizeStyle as vt } from "vue";
const wt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const n = e.getContext("2d");
  class l {
    constructor(A, D, U, B, se, be, S) {
      this.x = A, this.y = D, this.radius = U, this.color = B, this.vx = se, this.vy = be, this.ctx = S;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => n.clearRect(0, 0, t, s), o = (R) => Math.floor(Math.random() * R);
  let a = 0, r = 0.01, h = 0;
  const m = () => {
    const R = n.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = y * 30), a >= 1 && (a = 1, r = -r, h = y * 30)), R.addColorStop(0, "rgba(250, 220, 20, 0.5)"), R.addColorStop(a, "rgba(20, 20, 20, 0.5)"), n.fillStyle = R, n.fillRect(0, 0, t, s);
  }, v = Math.floor(t / 100), b = Math.floor(s / 100), y = 20, V = Math.round(1e3 / y), F = Array.from({ length: 52 }).map(() => {
    const R = Math.floor(o(v + b) * 1.5 + o(5));
    let A = o(t), D = o(s);
    A = Math.min(Math.max(R, A), t - R), D = Math.min(Math.max(R, D), s - R);
    let U = o(2) ? (o(2) + 2) * v : (o(-1) - 2) * v, B = o(2) ? (o(2) + 2) * b : (o(-1) - 2) * b;
    return U = Math.floor(U / y), B = Math.floor(B / y), new l(
      A,
      D,
      R,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      U,
      B,
      n
    );
  });
  let g, C;
  e.addEventListener("mouseover", (R) => {
    g = R.pageX, C = R.pageY;
  }), e.addEventListener("mousemove", (R) => {
    if (g === void 0) {
      g = R.pageX, C = R.pageY;
      return;
    }
    const A = R.pageX - g, D = R.pageY - C;
    F.forEach((U) => {
      U.x += A / y, U.y += D / y;
    }), g = R.pageX, C = R.pageY;
  });
  let T = Date.now(), z = null;
  const H = () => {
    Date.now() - T >= V && (i(), m(), F.forEach((R) => R.update()), T = Date.now()), z = requestAnimationFrame(H);
  };
  return z = requestAnimationFrame(H), () => cancelAnimationFrame(z);
}, St = ({
  text: e,
  gap: t,
  fontSize: s,
  color: n,
  width: l = window.innerWidth,
  height: i = window.innerHeight,
  drawMode: o = "fill"
}) => {
  const a = document.createElement("canvas");
  a.width = l, a.height = i;
  const r = a.getContext("2d");
  r.font = `${s}px Arial`, r[o + "Style"] = n;
  const m = r.measureText(e).width + t, v = s + t;
  for (let b = t / 2; b < i; b += v)
    for (let y = t / 2; y < l; y += m)
      r[o + "Text"](e, y, b);
  return a;
}, kt = {
  pop: wt,
  createWatermark: St
}, it = async (e) => {
  var n, l;
  const t = await ((n = e.formRef) == null ? void 0 : n.validate().then(() => !0).catch(() => !1)), s = await Promise.all((l = e.formItems) == null ? void 0 : l.filter((i) => {
    var o, a;
    return ((o = i.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = i.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((i) => it(i.form)));
  return t && s.every((i) => i);
}, $t = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, W = (e, t) => {
  const s = e.__v_isRef ? e.value : yt(e), { text: n = "text", value: l = "value" } = t, i = s.map((a) => typeof a == "object" ? { text: a[n], value: a[l], disabled: a.disabled, raw: ie(a) } : { text: a, value: a });
  if (!t.sort)
    return i;
  const o = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((a, r) => a[o].localeCompare(r[o]));
}, { ElMessage: Ct, ElNotification: xt, ElMessageBox: Vt } = window.ElementPlus || {}, { showToast: Et, showNotify: At, showConfirmDialog: Ot } = window.vant || {}, q = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: n } = t;
  s ? ((n === "error" || n === "warning") && (t.type = "fail"), t["z-index"] || (t["z-index"] = 1e6), Et(t)) : Ct({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, me = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: n } = t;
  s ? (n === "error" && (t.type = "danger"), At(t)) : xt({
    showClose: !0,
    ...t
  });
}, Z = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = Ot(e) : t = Vt.confirm(
    e.message || "",
    e.title || "",
    {
      draggable: !0,
      ...e,
      type: e.type || "info",
      confirmButtonText: e.confirmButtonText || "确定",
      cancelButtonText: e.cancelButtonText || "取消"
    }
  ), t.then(() => e.distinguishCancelAndClose ? "confirm" : !0).catch((n) => e.distinguishCancelAndClose ? n : !1);
};
for (let e of ["success", "warning", "info", "error", "primary", "loading", "fail", "html"])
  q[e] = q[e[0]] = (t) => q({ type: e, ...typeof t != "string" ? t : { message: t } }), me[e] = me[e[0]] = (t) => me({ type: e, ...typeof t != "string" ? t : { message: t } }), Z[e] = Z[e[0]] = (t) => Z({ type: e, ...t });
const { funcs: jt } = StardustJs, Ft = (e, t, s) => {
  e.beforeEach(async (n, l) => !!n.matched.length || "/404");
}, Tt = (e, t, s) => {
  e.afterEach((n, l) => {
    var i;
    document.title = ((i = n.matched[n.matched.length - 1].meta) == null ? void 0 : i.title) || t.app.sitename;
  });
}, Dt = (e, t, s) => {
  e.beforeEach(async (n, l) => {
    var a;
    const i = n.matched[n.matched.length - 1].path.split("/:")[0];
    if (n.meta.acl === !1 || (a = n.meta) != null && a.visitable)
      return !0;
    for (; t.getters.logging; )
      await jt.sleep(20);
    if (await le(), t.acl.paths.includes(i))
      return !0;
    t.getters.logined && q.e("无权访问页面: " + n.path);
    const o = { redirectTo: n.path, ...n.query };
    return { path: t.acl.paths[0] || "/404", query: o };
  }), le(() => {
    let n = !1;
    Oe(() => t.acl.menus, (l) => {
      if (!n) {
        if (!l.length)
          return;
        n = !0;
      }
      const i = t.acl.paths, o = (a, r) => {
        var m, v, b, y, V, F, g;
        let h;
        a.redirect && !a.component ? h = a.redirect : h = [...r, a].reduce((C, T) => C + "/" + T.path, "").replace("//", "/"), a.meta || (a.meta = {}), a.meta.acl === !1 ? (m = a.children) == null || m.forEach((C) => {
          var T;
          C.meta || (C.meta = {}), (T = C.meta).acl || (T.acl = !1), o(C, [...r, a]);
        }) : (a.meta._hidden = a.meta.hidden, parent && (a.meta.hidden == null && ((b = a.meta).hidden ?? (b.hidden = (v = parent.meta) == null ? void 0 : v.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((V = a.meta).visitable ?? (V.visitable = (y = parent.meta) == null ? void 0 : y.visitable), a.meta = { ...a.meta })), (F = a.children) == null || F.forEach((C) => o(C, [...r, a])), a.meta.hidden !== !1 && a.meta._hidden !== !0 && (a.meta.hidden = !i.includes(h), (g = a.children) != null && g.some((C) => C.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach((a) => o(a, []));
    }, { immediate: !0 });
  });
}, Rt = {
  check404: Ft,
  setTitle: Tt,
  checkRolesPages: Dt
}, de = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), lt = (e = {}) => ({
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
  searchFields: [],
  _isBaseTable: !0
}), pe = () => ({
  ...de(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), It = ({
  table: e = {},
  dialog: t = {},
  columns: s = [
    { fixed: "left", type: "selection" },
    { type: "_index" }
  ],
  query: n = {},
  form: l = {}
} = {}) => ({
  table: {
    ...lt(n),
    ...e,
    columns: s
  },
  dialog: {
    ...pe(),
    ...t,
    form: l
  }
}), { funcs: Ce } = StardustJs, Pt = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let n of s)
    n.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[n.slice(3)] = t[n], delete t[n]) : n.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[n.slice(3)] = t[n], delete t[n]);
  return t;
}), Bt = (e, t) => {
  for (let s in e) {
    const n = e[s];
    !n || typeof n != "object" || (s === "table" && e[s]._isBaseTable && at(n, t), s === "dialog" && e[s]._isBaseDialog && ot(n, t), s === "form" && e[s]._isBaseForm && ce(n, t));
  }
  return e;
}, at = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), ot = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), ce(e, t), e), ce = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((n) => n.visible !== !1)), dt(e.form, e.formItems), e.initialForm = Ce.deepCopy(e.form), e.initialFormRules = Ce.deepCopy(e.formRules), Oe(() => e.formItems, () => {
  rt(e);
}, { immediate: !0, deep: !0 }), e), rt = (e) => {
  const { formItems: t, initialFormRules: s } = e, n = t.filter((i) => {
    let { formAttrs: o = {}, required: a = !1 } = i;
    return a = "required" in o ? o.required : a, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && a !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, Ce.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !n.length)
    return;
  const l = {};
  return n.forEach((i) => {
    if (e.formRules[i])
      return;
    const o = t.find((y) => y.prop === i), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = ut[a], h = [], m = "options" in o, b = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${m ? "选择" : "输入"}${(o == null ? void 0 : o.label) || i}` };
    o.validator && (b.validator = (y, V) => a === "pc" ? o.validator(y, V) : o.validator(V, y)), o.asyncValidator && (b.asyncValidator = (y, V) => a === "pc" ? o.asyncValidator(y, V) : o.asyncValidator(V, y)), o.comp ? h.push({ ...b, trigger: r.change }) : h.push({ ...b, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...b, trigger: r.blur }), l[i] = h;
  }), Object.assign(e.formRules, l), e.formRules;
}, dt = (e, t, s = !0) => {
  const n = {};
  return t.forEach((l) => {
    var h, m;
    let i = "";
    const { type: o, options: a } = l, { multiple: r } = l.formAttrs || {};
    if (s && o === "number" || l.comp === "ElInputNumber")
      i = 0;
    else if (l.comp === "ElSwitch")
      i = !1;
    else if (a && ((h = l.comp) != null && h.endsWith("XCheckboxs") || (m = l.comp) != null && m.endsWith("x-checkboxs") || r))
      i = [];
    else if (l.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(l.type)) {
      const v = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[l.type];
      l["start-placeholder"] || (l["start-placeholder"] = "开始" + v), l["end-placeholder"] || (l["end-placeholder"] = "结束" + v), i = [];
    }
    n[l.prop] = i;
  }), Object.assign(e, { ...n, ...e }), e;
}, ct = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [n, l] = e.split(s);
  l = l.split("|");
  let i = t[n];
  typeof i == "number" ? i += "" : typeof i == "string" && (i = i.trim());
  const o = e.match(s)[0];
  return l.some((a) => o === "^=" ? i.startsWith(a) : o === "*=" ? i.includes(a) : o === "$=" ? i.endsWith(a) : o === "~=" ? !i.includes(a) : o === "!=" ? i !== a : a === i);
}, ut = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, ht = {
  effects: kt,
  validateForm: it,
  formatPrecision: $t,
  formatOptions: W,
  Message: q,
  Notify: me,
  Confirm: Z,
  middlewares: Rt,
  baseForm: de,
  baseTable: lt,
  baseDialog: pe,
  baseModel: It,
  initFields: Pt,
  initModel: Bt,
  initTable: at,
  initDialog: ot,
  initForm: ce,
  initFormRules: rt,
  initDefaultForm: dt,
  isWhenMatched: ct,
  triggers: ut
}, { funcs: Mt } = StardustJs;
class mt {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const n = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => n }
      }), this._initLifeCycles();
    }
    le(this.onInit);
  }
  onInit() {
    this._evalAction();
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
    return ht;
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
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.getOwnPropertyDescriptors(this.__proto__), n = Object.keys(s).filter((o) => o !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...n])).filter((o) => typeof this[o] == "function").forEach((o) => {
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
  _evalAction() {
    var l;
    const { _action_: t, _action_params_: s, ...n } = this.query;
    t && this[t] && ((l = this[t]) == null || l.call(this, JSON.parse(s || "{}")), this.router.replace(this.route.path + "?" + Mt.encodeQuery(n)));
  }
  _getMethods() {
    return [
      "_bindMethods",
      "_initLifeCycles",
      "_evalAction",
      "_getMethods",
      "onInit"
    ];
  }
}
const { funcs: Xe, highdict: ye, dates: ve } = StardustJs, { file: ze, excel: ue } = StardustBrowser;
class pt extends mt {
  constructor(t) {
    super(t);
    const { model: s, table: n, dialog: l, dbModelName: i = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = n || (s == null ? void 0 : s.table), this.dialog = l || (s == null ? void 0 : s.dialog), this.dbModelName = i, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], le(() => {
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
    var t, s, n, l;
    if ((t = this.model) != null && t.form && ((s = this.dialog) != null && s.form))
      throw "conflict of model.form and dialog.form";
    return ((n = this.model) == null ? void 0 : n.form) || ((l = this.dialog) == null ? void 0 : l.form);
  }
  _getMethods() {
    return [
      ...super._getMethods(),
      "handleKeywordsSearch",
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
      "injectSearchParams",
      "injectAddParams",
      "injectUpdateParams",
      "injectDeleteParams",
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
    super.onInit(), this.table && this.handleSearch();
  }
  async handleKeywordsSearch(t) {
    if (this._lastSearchParams = null, t = t.replace(/,/g, " ").split(" ").filter((i) => i), !t.length)
      return this.handleSearch();
    let { searchFields: s, columns: n } = this.table;
    if (s.length || (s = [...new Set(n.filter((i) => typeof i.canSearch == "boolean" ? i.canSearch : i.prop && i.type !== "number" && !i.comp && !i.virtual).map((i) => i.prop))]), !s.length)
      return this.handleSearch();
    const l = [];
    return s.forEach((i) => {
      t.forEach((o) => {
        l.push({ [i]: { "[Op.like]": "%" + o + "%" } });
      });
    }), this.handleSearch({ where: { "[Op.or]": l } });
  }
  async handleSearch(t, { isInfinite: s = !1 } = {}) {
    if (t instanceof Event && (t = null), this.table.isInfinite = s, this.table.loading || !await this.beforeSearch(t))
      return;
    t = this.getSearchParams(t), this.injectSearchParams(t), this.table.loading = !0;
    const n = await this.search(t);
    let l = ye.get(n, this.listProp);
    return l = this.formatList(this._defaultFormatList(l, n), n), Object.assign(this.table, {
      list: l,
      total: n.total,
      loading: !1
    }), this.afterSearch(l, t, n), n;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await le(), await Xe.sleep(50), this._clearValidate(), this.afterAdd());
  }
  async handleEdit({ $index: t, row: s }) {
    var n;
    await this.beforeEdit({ $index: t, row: s }) && (this.table.isRowEdit ? (s.originData = JSON.stringify(s), s.isEditing = !0) : (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !0,
      editingIndex: t,
      editingRow: s,
      form: {
        ...this.dialog.form,
        ...s
      }
    }), await le(), (n = this.dialog.formRef) == null || n.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (this.table.loading || !await this.beforeDelete({ $index: t, row: s }) || !await Z.w({ message: "确定要删除吗？", title: "警告" }))
      return;
    this.table.loading = !0;
    const l = this.getDeleteParams(s);
    this.injectDeleteParams(l);
    const i = await this.remove(l, s);
    this.table.loading = !1, !i.err && (this.afterDelete(i), this.handleSearch());
  }
  async handleRowEdit({ row: t }) {
    if (t._loading)
      return;
    t._loading = !0;
    const s = this.getUpdateParams(t);
    if (this.injectUpdateParams(s), !await this._checkAllNone(s)) {
      t._loading = !1;
      return;
    }
    try {
      await this.update(s, t[this.idField]);
    } catch (n) {
      this._showError(n.data.err), t._loading = !1;
      return;
    }
    delete t.originData, t.isEditing = !1, t._loading = !1;
  }
  async handleCancelEdit({ row: t }) {
    Object.assign(t, JSON.parse(t.originData)), delete t.originData, t.isEditing = !1;
  }
  async handleExport(t = this.exportType, s) {
    if (s || (s = this.table.ref.title || document.title), this.table.loading)
      return;
    if (t instanceof Event && (t = ""), t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      q("不支持的导出类型");
      return;
    }
    this.table.loading = !0;
    const { list: n, selection: l, ref: i } = this.table;
    let o = l.length > 0 ? l : n;
    o = Xe.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(i._visibleColumns, "current"), r = a.map((b) => b.prop), h = a.map((b) => b.label);
    o = o.map((b) => r.map((y) => b[y]));
    let m = null;
    t === "csv" ? m = ue.export2Csv : m = ue.export2Excel;
    let v = { list: n, header: h, data: o, filename: s };
    v = await this.processExporting(v), m(v), this.table.loading = !1;
  }
  async handleSearchExport(t = this.exportType, s) {
    if (s || (s = this.table.ref.title || document.title), this.table.loading) {
      q.w("导出中...");
      return;
    }
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      q("不支持的导出类型");
      return;
    }
    this.table.loading = !0;
    const n = await this.dbTable.search(this.getSearchExportParams());
    let l = n.data;
    l = this.formatList(l, n), l = this.processExportingData(l, "search");
    const i = this.processExportingColumns(this.table.ref._visibleColumns, "search-export"), o = i.map((m) => m.prop), a = i.map((m) => m.label);
    l = l.map((m) => o.map((v) => m[v]));
    let r = null;
    t === "csv" ? r = ue.export2Csv : r = ue.export2Excel;
    let h = { list: n.data, header: a, data: l, filename: s };
    h = await this.processExporting(h), r(h), this.table.loading = !1;
  }
  async handleImport() {
    var i, o;
    if (this.table.loading)
      return;
    const t = await ze.select(".xlsx,.csv");
    this.table.loading = !0;
    const s = t.name.toLowerCase().endsWith(".csv"), n = await ze.toType(t, s ? "text" : "arraybuffer");
    let l = [];
    if (s)
      await ((i = window.DynamicLibs) == null ? void 0 : i.use("Papa")), l = window.Papa.parse(n, { header: !0 }).data;
    else {
      await ((o = window.DynamicLibs) == null ? void 0 : o.use("XLSX"));
      const a = window.XLSX.read(n, {}), r = Object.values(a.Sheets);
      l = XLSX.utils.sheet_to_json(r[0]);
    }
    if (l.length > 0) {
      const a = {};
      this.table.columns.forEach((h) => a[h.label] = h.prop);
      const r = Object.keys(l[0]);
      l = l.map((h) => {
        const m = {};
        return r.forEach((v) => m[a[v]] = h[v]), m;
      });
    }
    l = this.processImportingData(l), await this.dbTable.func(["bulkCreate", l]), q.s("导入成功"), this.table.loading = !1, this.handleSearch();
  }
  async handleMultiDelete() {
    if (this.table.loading)
      return;
    const { selection: t } = this.table;
    if (!t.length) {
      q.w("尚未选择要删除的数据");
      return;
    }
    if (!await Z.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
      return;
    this.table.loading = !0;
    const n = t.map((l) => l[this.idField]);
    await this.dbTable.func(["destroy", {
      where: {
        [this.idField]: { "[Op.in]": n }
      }
    }]), this.table.loading = !1, this.handleSearch();
  }
  async handleSave(t) {
    if (t = t instanceof Event ? this.form : t, this._isSubmitting) {
      q.w("正在保存...");
      return;
    }
    const s = this.model.formRef || this.dialog.formRef;
    if (!await this._validateForm(s))
      return;
    this._isSubmitting = !0;
    const n = this.getAddParams(t);
    if (this.injectAddParams(n), !await this._checkAllNone(n)) {
      this._isSubmitting = !1;
      return;
    }
    let l = null;
    try {
      t[this.idField] ? l = await this.update(n, t[this.idField]) : l = await this.add(n);
    } catch (i) {
      this._showError(i.data.err), this._isSubmitting = !1;
      return;
    }
    return this._isSubmitting = !1, l.err || q.s("保存成功"), this.router.go(-1), l;
  }
  async handleSubmit(t) {
    if (t = t instanceof Event ? null : t, this._isSubmitting)
      return q.w("正在提交..."), !1;
    if (!this.dialog.visible)
      return !1;
    this._isSubmitting = !0;
    const s = t || this.form;
    if (!t && ((this.dialog.shouldTrim || !0) && this._trimForm(), !await this._validateForm()))
      return this._isSubmitting = !1, !1;
    let n = null;
    try {
      if (this.dialog.isEditing) {
        const l = this.getUpdateParams(s);
        if (this.injectUpdateParams(l), !await this._checkAllNone(l))
          return this._isSubmitting = !1, !1;
        n = await this.update(l, this.dialog.editingRow[this.idField]);
      } else {
        const l = this.getAddParams(s);
        if (this.injectAddParams(l), !await this._checkAllNone(l))
          return this._isSubmitting = !1, !1;
        n = await this.add(l);
      }
    } catch (l) {
      return this._showError(l.data.err), this._isSubmitting = !1, !1;
    }
    return this.dialog.visible = !1, this._isSubmitting = !1, n.err || this.handleSearch(), this.afterSubmit(n), n;
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
      const { prop: s, order: n } = t;
      this.table.query.order = !s || !n ? [] : [
        [s, n.slice(0, -6)]
      ];
    }
    this.handleSearch();
  }
  async handleLoad() {
    const { query: t } = this.table;
    if (!this.table.list.length)
      return await this.handleSearch(), t.page * t.limit >= this.table.total && (this.table.finished = !0), this.table.moreLoading = !1;
    const { loading: s, total: n } = this.table;
    if (s || !n || this.table.finished)
      return this.table.moreLoading = !1;
    if (t.page * t.limit >= n)
      return this.table.moreLoading = !1, this.table.finished = !0;
    this.table.isInfinite = !0, t.page++;
    const l = this.table.list.slice();
    await this.handleSearch({}, { isInfinite: !0 }), this.table.loading = !0, await this.$sleep(50), this.table.list = l.concat(this.table.list), this.table.loading = !1, this.table.moreLoading = !1;
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
    return t != null && t.page && (this.table.query.page = t.page), t != null && t.limit && (this.table.query.limit = t.limit), Object.assign({ where: {} }, JSON.parse(this._lastSearchParams), this.table.query, t);
  }
  getAddParams(t) {
    const s = Object.keys(this.dialog.initialForm), n = {};
    return s.length ? s.forEach((l) => n[l] = t[l]) : Object.assign(n, t), this.dialog.formItems.forEach((l) => {
      let i = n[l.model || l.prop];
      l.type === "number" ? i = this.uiUtils.formatPrecision(i, l.precision || 3) * 1 : l.comp === "ElDatePicker" && (l.type === "datetime" ? i = ve.format(i) : (!l.type || l.type === "date") && (i = ve.format(i, "", !1))), n[l.model || l.prop] = i;
    }), n;
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
    const t = this.getSearchParams();
    return this.injectSearchParams(t), Object.assign({}, t, {
      page: 1,
      limit: -1,
      attributes: this.processExportingColumns(this.table.ref._visibleColumns, "search-attributes").map((s) => s.prop)
    });
  }
  injectSearchParams(t) {
  }
  injectAddParams(t) {
  }
  injectUpdateParams(t) {
  }
  injectDeleteParams(t) {
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
  afterSearch(t, s, n) {
    const l = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && l !== this._lastSearchParams) {
      const { page: i, limit: o, order: a, count: r, ...h } = s;
      this.dbTable.func(["count", h]).then((m) => this.table.total = m.data);
    }
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
    const n = {};
    s.forEach((l) => n[l] = t[l]), await this.update(n, t[this.idField]), this.table.loading = !1;
  }
  _defaultFormatList(t, s) {
    const { columns: n, query: l } = this.table, { page: i, limit: o } = l;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (i - 1) * o + r + 1;
    }), n.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: m, autoFill: v } = a.tableAttrs || {}, { modelName: b } = a.formAttrs || {};
      if (b && v)
        t.forEach((y) => y[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && m !== !1) {
        const V = Oe(() => a.options, (F, g) => {
          const C = g ? this.table.list : t, T = Nt(a);
          C.forEach((z, H) => {
            const R = z[r];
            z[`_formatted_${r}`] = T[R] || R;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(V);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const n = [...new Set(t.map((h) => h[s.prop]))];
    if (!n.length)
      return;
    const { modelName: l, text: i, value: o } = s.formAttrs, a = await this.service.restful.search(l, {
      limit: -1,
      attributes: [i, o],
      where: {
        [o]: {
          "[Op.in]": n
        }
      }
    });
    if (!a.data.length)
      return;
    const r = ye.mapField(a.data, o, i);
    this.table.list.forEach((h) => {
      h[`_formatted_${s.prop}`] = r[h[s.prop]];
    });
  }
  formatList(t, s) {
    return t;
  }
  processExportingColumns(t, s = "current") {
    return t.filter((n) => !["index", "selection", "expand", "radio", "_index"].includes(n.type)).filter((n) => !n.virtual);
  }
  processExportingData(t, s = "current") {
    if (!t.length)
      return t;
    const n = {};
    this.table.ref._visibleColumns.forEach((i) => {
      let { formatter: o = i.formatter, tagValues: a = i.tagValues, options: r = i.options } = i.tableAttrs || {};
      !o && typeof a == "function" && (o = a), n[i.prop] = { formatter: o, tagValues: a, options: r };
    });
    const l = [...new Set(Object.keys(t[0]).concat(this.table.ref._visibleColumns.map((i) => i.prop).filter((i) => i)))];
    return t.forEach((i) => {
      l.forEach((o) => {
        var r, h, m, v;
        const a = i[o];
        if (i.hasOwnProperty("_formatted_" + o))
          return i[o] = i["_formatted_" + o];
        if ((r = n[o]) != null && r.formatter)
          return i[o] = n[o].formatter(a);
        if ((h = n[o]) != null && h.tagValues)
          return i[o] = n[o].tagValues[a];
        if ((m = n[o]) != null && m.options)
          return i[o] = ((v = n[o].options.find((b) => b.value === i[o])) == null ? void 0 : v.text) ?? i[o];
        typeof a == "boolean" ? i[o] = a && 1 || 0 : a instanceof Date ? (i[o] = ve.format(a), i[o].endsWith(" 00:00:00") && (i[o] = i[o].slice(0, -9))) : a === void 0 && (i[o] = ye.get(i, o));
      });
    }), t.forEach((i) => {
      l.forEach((o) => {
        i[o] && typeof i[o] == "object" && (i[o] = JSON.stringify(i[o]));
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
    Object.keys(t).forEach((n) => {
      t[n] == null ? s[n] = "" : t[n].trim && (s[n] = t[n].trim());
    }), Object.assign(t, s);
  }
  _validateForm(t) {
    const s = t || this.dialog.formRef;
    return s ? new Promise((n) => {
      this._isMobile ? s.validate().then(() => n(!0)).catch(() => n(!1)) : s.validate((l) => n(l)).catch(() => n(!1));
    }) : !0;
  }
  _clearValidate(t = this.dialog.formRef) {
    t && (this._isMobile ? t.resetValidation() : t.clearValidate());
  }
  async _checkAllNone(t) {
    const s = [null, void 0, ""];
    return Object.values(t).some((l) => !s.includes(l)) ? !0 : Z.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    q(typeof t == "object" ? t.message || t.err || t.toString() : t);
  }
  get _isMobile() {
    var s, n;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((n = this.dialog) == null ? void 0 : n.formRef);
    return t ? t.$.attrs.class.indexOf("mobile") >= 0 : window.isMobile;
  }
  onKeywordsSearch(...t) {
    return this.handleKeywordsSearch(...t);
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
const Nt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: n = "text", value: l = "value" } = s, i = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    i[o[l]] = o[n];
  }), i;
};
class Lt extends pt {
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
    this.table.list = t.filter((n) => !s.includes(n));
  }
}
const Ut = {
  BaseController: mt,
  CrudController: pt,
  TempCrudController: Lt
}, O = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, l] of t)
    s[n] = l;
  return s;
}, qt = {
  name: "XArray",
  props: {
    modelValue: Array | String | void 0,
    items: Array
  },
  emits: ["update:modelValue"],
  data() {
    return {
      groups: []
    };
  },
  watch: {
    modelValue: {
      immediate: !0,
      deep: !0,
      handler: "makeGroups"
    },
    items: {
      deep: !0,
      handler: "makeGroups"
    },
    groups: {
      deep: !0,
      handler() {
        const e = this.groups.map((t) => t.form);
        JSON.stringify(this.modelValue) !== JSON.stringify(e) && this.$emit("update:modelValue", e);
      }
    }
  },
  methods: {
    makeGroups() {
      let e = this.modelValue;
      (!Array.isArray(e) || !e.length) && (e = [{}]), this.groups = e.map((t) => {
        const s = this.makeForm();
        return Object.assign(s.form, t), s;
      });
    },
    makeForm() {
      const e = de(), t = Math.floor(24 / this.items.length), s = this.items.map((n) => ({ span: n.span || t, ...n }));
      return ce(e, s), e;
    },
    handleAdd() {
      this.groups.push(this.makeForm());
    },
    handleCopy(e, t) {
      this.groups.push(JSON.parse(JSON.stringify(e)));
    },
    async handleClear() {
      await Z.w({ message: "确定删除全部组吗？", title: "警告" }) && (this.groups = []);
    }
  }
}, Xt = { class: "x-array" }, zt = { class: "group-operates" }, Wt = { class: "groups" };
function Ht(e, t, s, n, l, i) {
  const o = u("x-icon"), a = u("x-button"), r = u("x-form");
  return d(), w("div", Xt, [
    j("div", zt, [
      p(a, {
        type: "primary",
        plain: "",
        class: "add-item",
        onClick: i.handleAdd
      }, {
        default: c(() => [
          p(o, {
            name: "Plus",
            class: "icon"
          }),
          x("添加一组 ")
        ]),
        _: 1
      }, 8, ["onClick"]),
      p(a, {
        type: "danger",
        plain: "",
        class: "clear-items",
        onClick: i.handleClear
      }, {
        default: c(() => [
          x("全部删除")
        ]),
        _: 1
      }, 8, ["onClick"])
    ]),
    j("div", Wt, [
      (d(!0), w(P, null, M(l.groups, (h, m) => (d(), w("div", {
        key: m,
        class: "group"
      }, [
        p(r, _({
          form: h,
          "hide-labels": "",
          gutter: 10
        }, e.$attrs, { class: "form" }), null, 16, ["form"]),
        p(a, {
          type: "success",
          plain: "",
          icon: "CopyDocument",
          onClick: (v) => i.handleCopy(h, m),
          class: "button"
        }, null, 8, ["onClick"]),
        p(a, {
          type: "danger",
          plain: "",
          icon: "DeleteFilled",
          onClick: (v) => l.groups.splice(m, 1),
          class: "button"
        }, null, 8, ["onClick"])
      ]))), 128))
    ])
  ]);
}
const Kt = /* @__PURE__ */ O(qt, [["render", Ht], ["__scopeId", "data-v-424f69b7"]]), Jt = {
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
    isMobile() {
      return this.$attrs.platform === "mobile";
    },
    rows() {
      const e = [[]];
      let t = e[0], s = 0;
      return this.cols.forEach((n) => {
        const l = n.span || this.span;
        t.push(n), s += l, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, Yt = { class: "x-auto-rows" }, Gt = { key: 1 };
function Qt(e, t, s, n, l, i) {
  const o = u("x-col"), a = u("x-row");
  return d(), w("div", Yt, [
    (d(!0), w(P, null, M(i.rows, (r, h) => (d(), f(a, _({ key: h }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), w(P, null, M(r, (m, v) => (d(), f(o, _(m, {
          span: i.isMobile ? m.xs || m.span || s.span : m.span || s.span,
          key: v,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            m.slot || e.$attrs.slot ? E(e.$slots, m.slot || e.$attrs.slot, {
              key: 0,
              col: m
            }) : (d(), w("span", Gt, $(m.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const Zt = /* @__PURE__ */ O(Jt, [["render", Qt]]), es = {
  name: "MobileXButton"
};
function ts(e, t, s, n, l, i) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      E(e.$slots, "default")
    ]),
    _: 3
  });
}
const ss = /* @__PURE__ */ O(es, [["render", ts]]), ns = {
  name: "PcXButton"
};
function is(e, t, s, n, l, i) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      E(e.$slots, "default")
    ]),
    _: 3
  });
}
const ls = /* @__PURE__ */ O(ns, [["render", is]]), { funcs: as } = StardustBrowser, os = ["index", "selection", "expand", "radio", "_index"], Ie = {
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
        ...pe(),
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
      return as.calcPixel(this.height) * this.zoom + "px";
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
      const e = this.datasource.columns.filter((t) => !os.includes(t.type));
      this.dialog.formItems.slice(0, 3).forEach((t) => t.options = e), this.handleMakeChart();
    },
    async handleMakeChart() {
      var s, n;
      this.dialog.visible = !1, this.loading = !0;
      const e = { ...this.dialog.form };
      (s = e.filter) != null && s.categories.isLimit || (e.filter.categories.mergeOthers = !1), (n = e.filter) != null && n.series.isLimit || (e.filter.series.mergeOthers = !1);
      let t = this.datasource.list;
      this.datasource.search && (t = await this.datasource.search()), e.data = t, this.setRich(e), this.loading = !1;
    },
    calcSummary(e, t, s) {
      let n;
      return (t === "sum" || t === "average") && (n = e.reduce((l, i) => l + i, 0).toFixed(3) * 1), t === "count" ? n = e.length : t === "average" ? e.length ? n = (n / (s || e.length)).toFixed(3) * 1 : n = void 0 : t === "first" ? n = e[0] : t === "last" ? n = e[e.length - 1] : (t === "max" || t === "min") && (n = Math[t].apply(null, e)), n;
    },
    setRich(e) {
      var R;
      const { categories: t, data: s, attr: n, summary: l, type: i, filter: o, grid: a } = e, r = {}, h = Array.isArray(t) && t.length || ((R = t == null ? void 0 : t.data) == null ? void 0 : R.length), m = h && (Array.isArray(t) ? t : t.data), v = typeof e.series == "string" ? e.series : e.series.data, b = (o == null ? void 0 : o.categories.limit) > -1, y = (o == null ? void 0 : o.series.limit) > -1, V = {}, F = [], g = /* @__PURE__ */ new Set(), C = [];
      s.forEach((A) => {
        var U;
        let D = A[v] || "未知";
        if (y && C.length >= o.series.limit && !C.includes(D)) {
          if (!o.series.mergeOthers)
            return;
          D = "其他";
        }
        if (h) {
          let B = m.map((se) => A[se]).join("/") || "未知";
          if (b && F.length >= o.categories.limit && !F.includes(B)) {
            if (!o.categories.mergeOthers)
              return;
            g.add(B), B = "其他";
          }
          V[B] || F.push(B), V[B] || (V[B] = {}), C.includes(D) || C.push(D), (U = V[B])[D] || (U[D] = []), V[B][D].push(A[n]);
        } else
          V[D] || C.push(D), V[D] || (V[D] = []), V[D].push(A[n]);
      });
      const T = h && !y ? [...new Set(s.map((A) => A[v]))] : C;
      if (h)
        for (let A in V)
          for (let D in V[A])
            V[A][D] = this.calcSummary(
              V[A][D],
              l,
              b && A === "其他" ? V[A][D].length / g.size : V[A][D].length
            );
      else
        for (let A in V)
          V[A] = this.calcSummary(V[A], l);
      let z = T;
      typeof e.series == "object" && e.series.formatter && (z = T.map((A) => e.series.formatter(A)));
      let H = [];
      h ? H = T.map((A, D) => ({
        name: z[D],
        type: i,
        label: { show: !0, position: "top" },
        data: F.map((U) => ({ name: U, value: V[U][A] }))
      })) : H = [
        {
          type: i,
          colorBy: "data",
          label: { show: !0, position: "top" },
          data: T.map((A) => ({ name: A, value: V[A] }))
        }
      ], Object.assign(r, {
        legend: { data: z },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? F.map((A) => t.formatter(A)) : F : v.formatter ? C.map((A) => v.formatter(A)) : C
        },
        yAxis: { type: "value" },
        series: H
      }, this.option, { grid: a }), this.update(r);
    },
    update(e = {}) {
      var t, s, n;
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
      }, e.xAxis && !((t = e.xAxis.axisLabel) != null && t.formatter) && ((s = e.xAxis).axisLabel || (s.axisLabel = {}), e.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)), console.log(e), (n = this.chart) == null || n.setOption(e, !0);
    },
    labelSplitFormatter(e) {
      return (t) => t.length < e ? t : Array.from({
        length: Math.ceil(t.length / e)
      }).map((s, n) => t.slice(n * e, (n + 1) * e)).join(`
`);
    }
  }
}, We = () => {
  je((e) => ({
    "54b2baec": e.zoomedHeight,
    "2b79eb74": e.zoom
  }));
}, He = Ie.setup;
Ie.setup = He ? (e, t) => (We(), He(e, t)) : We;
const fe = (e) => (Fe("data-v-94e70f82"), e = e(), Te(), e), rs = { class: "x-chart" }, ds = {
  class: "chart",
  ref: "el"
}, cs = /* @__PURE__ */ fe(() => /* @__PURE__ */ j("span", null, "左", -1)), us = /* @__PURE__ */ fe(() => /* @__PURE__ */ j("span", null, "上", -1)), hs = /* @__PURE__ */ fe(() => /* @__PURE__ */ j("span", null, "右", -1)), ms = /* @__PURE__ */ fe(() => /* @__PURE__ */ j("span", null, "下", -1));
function ps(e, t, s, n, l, i) {
  const o = u("pc-x-icon"), a = u("el-input-number"), r = u("el-col"), h = u("el-row"), m = u("el-checkbox"), v = u("el-tab-pane"), b = u("el-tabs"), y = u("x-form"), V = u("x-dialog"), F = Q("loading");
  return I((d(), w("div", rs, [
    j("div", ds, null, 512),
    s.datasource ? (d(), w("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (g) => l.dialog.visible = !0)
    }, [
      x(" 配置 "),
      p(o, { name: "Setting" })
    ])) : k("", !0),
    p(V, {
      modelValue: l.dialog.visible,
      "onUpdate:modelValue": t[12] || (t[12] = (g) => l.dialog.visible = g),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: i.handleMakeChart,
      onCancel: t[13] || (t[13] = (g) => l.dialog.visible = !1)
    }, {
      default: c(() => [
        p(y, { dialog: l.dialog }, {
          grid: c(() => [
            p(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                p(r, { span: 12 }, {
                  default: c(() => [
                    cs,
                    p(a, {
                      modelValue: i.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => i.grid.left = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    us,
                    p(a, {
                      modelValue: i.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (g) => i.grid.top = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    hs,
                    p(a, {
                      modelValue: i.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (g) => i.grid.right = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    ms,
                    p(a, {
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
            p(b, {
              modelValue: l.filterType,
              "onUpdate:modelValue": t[11] || (t[11] = (g) => l.filterType = g)
            }, {
              default: c(() => [
                p(v, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    p(m, {
                      modelValue: i.categories.isLimit,
                      "onUpdate:modelValue": t[5] || (t[5] = (g) => i.categories.isLimit = g)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    I(j("div", null, [
                      x(" 记录条数 "),
                      p(a, {
                        modelValue: i.categories.limit,
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => i.categories.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(m, {
                        modelValue: i.categories.mergeOthers,
                        "onUpdate:modelValue": t[7] || (t[7] = (g) => i.categories.mergeOthers = g)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [qe, i.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                p(v, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    p(m, {
                      modelValue: i.series.isLimit,
                      "onUpdate:modelValue": t[8] || (t[8] = (g) => i.series.isLimit = g)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    I(j("div", null, [
                      x(" 记录条数 "),
                      p(a, {
                        modelValue: i.series.limit,
                        "onUpdate:modelValue": t[9] || (t[9] = (g) => i.series.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(m, {
                        modelValue: i.series.mergeOthers,
                        "onUpdate:modelValue": t[10] || (t[10] = (g) => i.series.mergeOthers = g)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [qe, i.series.isLimit]
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
    [F, l.loading]
  ]);
}
const fs = /* @__PURE__ */ O(Ie, [["render", ps], ["__scopeId", "data-v-94e70f82"]]), gs = {
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
        rules: n,
        required: l,
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
        this._options = W(this.options, this);
      }
    }
  }
};
function bs(e, t, s, n, l, i) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, _({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, i.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), w(P, null, M(l._options, (r) => {
        var h;
        return d(), f(o, _(i.attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          shape: s.shape,
          name: r.value
        }), {
          default: c(() => [
            x($(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "shape", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const _s = /* @__PURE__ */ O(gs, [["render", bs], ["__scopeId", "data-v-f7122501"]]), ys = {
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
        ...n
      } = this.$attrs;
      return n;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler(e) {
        this._options = W(e, this);
      }
    }
  }
}, vs = { key: 1 };
function ws(e, t, s, n, l, i) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, _({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), w(P, null, M(l._options, (r) => {
        var h;
        return d(), f(o, _(i.attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? E(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), w("span", vs, $(r.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const Ss = /* @__PURE__ */ O(ys, [["render", ws], ["__scopeId", "data-v-4dd3721a"]]), ks = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function $s(e, t, s, n, l, i) {
  const o = u("van-col");
  return d(), f(o, _(i.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      E(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Cs = /* @__PURE__ */ O(ks, [["render", $s]]), xs = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Vs(e, t, s, n, l, i) {
  const o = u("el-col");
  return d(), f(o, _(i.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      E(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Es = /* @__PURE__ */ O(xs, [["render", Vs]]), As = {
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
}, Os = { key: 1 }, js = { key: 1 };
function Fs(e, t, s, n, l, i) {
  const o = u("van-button"), a = u("van-col"), r = u("van-row");
  return d(), f(ee(s.actionsheet ? "van-action-sheet" : "van-dialog"), _({ width: "92%" }, e.$attrs, {
    show: i.visible,
    "onUpdate:show": t[0] || (t[0] = (h) => i.visible = h),
    class: "mobile-x-dialog",
    "show-confirm-button": i.canConfirm,
    "show-cancel-button": i.canCancel,
    onConfirm: i.handleConfirm,
    onCancel: i.handleCancel
  }), oe({ _: 2 }, [
    e.$slots.title || s.title ? {
      name: "title",
      fn: c(() => [
        e.$slots.title ? E(e.$slots, "title", { key: 0 }) : (d(), w("span", Os, $(s.title), 1))
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: c(() => [
        E(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: c(() => [
        E(e.$slots, "default")
      ]),
      key: "2"
    } : void 0,
    e.$slots.title || s.title ? {
      name: "description",
      fn: c(() => [
        e.$slots.title ? E(e.$slots, "title", { key: 0 }) : (d(), w("span", js, $(s.title), 1))
      ]),
      key: "3"
    } : void 0,
    i.canConfirm || i.canCancel ? {
      name: "cancel",
      fn: c(() => [
        p(r, null, {
          default: c(() => [
            i.canCancel ? (d(), f(a, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                p(o, {
                  block: "",
                  onClick: G(i.handleCancel, ["stop"])
                }, {
                  default: c(() => [
                    x($(s.cancelText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : k("", !0),
            i.canConfirm ? (d(), f(a, {
              key: 1,
              span: 12
            }, {
              default: c(() => [
                p(o, {
                  block: "",
                  style: { color: "var(--van-blue)" },
                  onClick: G(i.handleConfirm, ["stop"])
                }, {
                  default: c(() => [
                    x($(s.submitText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : k("", !0)
          ]),
          _: 1
        })
      ]),
      key: "4"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const Ts = /* @__PURE__ */ O(As, [["render", Fs]]), Ds = {
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
    },
    hasFooter() {
      return this.onSubmit || this.$parent.$attrs.onSubmit || this.onCancel || this.$parent.$attrs.onCancel || this.$slots.footer;
    }
  },
  methods: {
    handleToggleFullscreen() {
      this.fullscreen = !this.fullscreen, this.$emit("fullscreenchange", this.fullscreen);
    }
  }
}, Rs = {
  key: 1,
  class: "el-dialog__title"
};
function Is(e, t, s, n, l, i) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(ee(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: l.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer, "no-footer": !i.hasFooter }]
  }), {
    header: c(() => [
      e.$slots.header ? E(e.$slots, "header", { key: 0 }) : (d(), w("span", Rs, $(s.title), 1)),
      s.drawer ? k("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? E(e.$slots, "footer", { key: 0 }) : k("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          x($(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          x($(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? E(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const Ps = /* @__PURE__ */ O(Ds, [["render", Is]]), Bs = {
  name: "XDict",
  props: {
    modelValue: Object | String | void 0,
    items: Array
  },
  emits: ["update:modelValue"],
  data() {
    return {
      form: de()
    };
  },
  watch: {
    items: {
      immediate: !0,
      deep: !0,
      handler() {
        this.form = this.makeForm();
      }
    },
    "form.form": {
      deep: !0,
      handler() {
        this.$emit("update:modelValue", this.form.form);
      }
    }
  },
  methods: {
    makeForm() {
      const e = de(), t = Math.floor(24 / this.items.length), s = this.items.map((n) => ({ span: n.span || t, ...n }));
      return ce(e, s), e;
    }
  }
}, Ms = { class: "x-dict" };
function Ns(e, t, s, n, l, i) {
  const o = u("x-form");
  return d(), w("div", Ms, [
    p(o, _({
      form: l.form,
      "hide-labels": "",
      gutter: 10
    }, e.$attrs), null, 16, ["form"])
  ]);
}
const Ls = /* @__PURE__ */ O(Bs, [["render", Ns]]), K = {}, ne = {
  provinces: [],
  cities: [],
  counties: []
}, Us = {
  name: "XDistrictSelect",
  props: {
    areaList: Object,
    modelValue: String,
    seperator: {
      type: String,
      default: "/"
    },
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
      provinces: Object.freeze(ne.provinces),
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
      this.cities = Object.freeze(ne.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(ne.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(K, this.areaList), ne.provinces = Object.entries(K.province_list).map((e) => ({ value: e[0], text: e[1] })), ne.cities = Object.entries(K.city_list).map((e) => ({ value: e[0], text: e[1] })), ne.counties = Object.entries(K.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(ne.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split(this.seperator);
      if (e) {
        const n = Object.entries(K.province_list).find((l) => l[1] === e);
        this.province = n == null ? void 0 : n[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const n = Object.entries(K.city_list).find((l) => l[1] === t);
        this.city = n == null ? void 0 : n[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const n = Object.entries(K.county_list).find((l) => l[1] === s);
        this.county = n == null ? void 0 : n[0];
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
      ].slice(0, this.number).join(this.seperator);
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function qs(e, t, s, n, l, i) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      p(a, { span: i.span }, {
        default: c(() => [
          p(o, {
            modelValue: l.province,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => l.province = h),
            options: l.provinces,
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
          p(o, {
            modelValue: l.city,
            "onUpdate:modelValue": t[1] || (t[1] = (h) => l.city = h),
            options: l.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : k("", !0),
      i.number > 2 ? (d(), f(a, {
        key: 1,
        span: i.span
      }, {
        default: c(() => [
          p(o, {
            modelValue: l.county,
            "onUpdate:modelValue": t[2] || (t[2] = (h) => l.county = h),
            options: l.counties,
            placeholder: "县区"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : k("", !0)
    ]),
    _: 1
  });
}
const Xs = /* @__PURE__ */ O(Us, [["render", qs]]);
function zs() {
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
function Ws() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function Hs() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((l) => (delete l.visible, e ? {
    ...l,
    label: " ",
    _label: l.label
  } : l)).filter((l) => this.dialog ? this.dialog.isEditing ? l.canEdit !== !1 : l.canAdd !== !1 : !0).map((l) => Object.assign({}, l, l.formAttrs));
}
function Ks() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return ct(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function Js() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function Ys(e) {
  var n;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((n = e.label) == null ? void 0 : n.trim()) || e._label || e.text || e.model || ""), t;
}
function Gs(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const ae = {
  props: zs,
  computed: {
    _model: Ws,
    _items: Hs,
    _visibleItems: Ks,
    _rules: Js
  },
  methods: {
    calcPlaceholder: Ys,
    formatModelValue: Gs
  }
}, Qs = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...ae.props(),
    hideLabels: {
      type: Boolean,
      default: !1
    },
    labelWidth: {
      type: String,
      default: (e) => e.labelWidth || "80px"
    },
    useWhen: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:fref"],
  computed: {
    ...ae.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...ae.methods
  }
};
function Zs(e, t, s, n, l, i) {
  const o = u("mobile-x-form-item"), a = u("el-col"), r = u("el-row"), h = u("van-form");
  return d(), f(h, {
    ref: "formRef",
    class: J(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? E(e.$slots, "pre", { key: 0 }) : k("", !0),
      p(r, {
        gutter: e.$attrs.gutter,
        justify: e.$attrs.justify,
        align: e.$attrs.align,
        tag: e.$attrs.tag
      }, {
        default: c(() => [
          (d(!0), w(P, null, M(e._visibleItems, (m, v) => (d(), f(a, {
            key: v,
            span: m.span,
            offset: m.offset,
            tag: m.tag,
            xs: m.xs,
            sm: m.sm,
            md: m.md,
            lg: m.lg,
            xl: m.xl
          }, {
            default: c(() => [
              p(o, _({
                "label-width": s.labelWidth,
                "label-position": e.$attrs["label-position"] || "left"
              }, m, {
                rules: e._rules[m.prop] || m.rules,
                modelValue: e.formatModelValue(e._model[m.prop]),
                "onUpdate:modelValue": (b) => e._model[m.prop] = b,
                placeholder: e.calcPlaceholder(m)
              }), {
                default: c(() => [
                  m.slot ? E(e.$slots, m.slot, De(_({ key: 0 }, m))) : k("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "label-position", "rules", "modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            _: 2
          }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
        ]),
        _: 3
      }, 8, ["gutter", "justify", "align", "tag"]),
      e.$slots.default ? E(e.$slots, "default", { key: 1 }) : k("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const en = /* @__PURE__ */ O(Qs, [["render", Zs]]), tn = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...ae.props(),
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
    ...ae.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...ae.methods
  }
}, sn = { key: 1 };
function nn(e, t, s, n, l, i) {
  const o = u("pc-x-form-item"), a = u("el-col"), r = u("el-row"), h = u("el-form"), m = u("el-collapse-item"), v = u("el-collapse");
  return d(), f(v, {
    modelValue: l.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (b) => l.activeNames = b),
    class: J((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      p(m, {
        name: l.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? E(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", sn, $(s.title), 1))
        ]),
        default: c(() => [
          p(h, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs["label-position"] || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: c(() => [
              e.$slots.pre ? E(e.$slots, "pre", { key: 0 }) : k("", !0),
              p(r, {
                gutter: e.$attrs.gutter,
                justify: e.$attrs.justify,
                align: e.$attrs.align,
                tag: e.$attrs.tag
              }, {
                default: c(() => [
                  (d(!0), w(P, null, M(e._visibleItems, (b, y) => (d(), f(a, {
                    key: y,
                    span: b.span,
                    offset: b.offset,
                    tag: b.tag,
                    xs: b.xs,
                    sm: b.sm,
                    md: b.md,
                    lg: b.lg,
                    xl: b.xl
                  }, {
                    default: c(() => [
                      p(o, _({
                        "label-width": s.labelWidth,
                        "show-tooltip": e.$attrs.showTooltip || !1
                      }, b, {
                        modelValue: e._model[b.prop],
                        "onUpdate:modelValue": [(V) => e._model[b.prop] = V, (V) => b.onChange || null],
                        prop: b.prop || b.model,
                        clearable: b.clearable !== !1,
                        placeholder: e.calcPlaceholder(b)
                      }), {
                        default: c(() => [
                          b.slot ? E(e.$slots, b.slot, {
                            key: 0,
                            item: b,
                            index: y
                          }) : k("", !0)
                        ]),
                        _: 2
                      }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder"])
                    ]),
                    _: 2
                  }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
                ]),
                _: 3
              }, 8, ["gutter", "justify", "align", "tag"]),
              e.$slots.default ? E(e.$slots, "default", { key: 1 }) : k("", !0)
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
const ln = /* @__PURE__ */ O(tn, [["render", nn]]);
function an(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !nt(e);
}
const xe = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: n,
    $emit: l
  } = e;
  let {
    comp: i,
    compType: o,
    html: a,
    text: r
  } = t;
  const h = {
    ...n,
    "onUpdate:modelValue": (v) => l("update:modelValue", v)
  }, m = [];
  return o === "html" ? h.class = "comp-html" : i = u(i), a && (h.innerHTML = a), r && m.push(r), te(i, h, {
    default: () => m
  });
}, on = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: n,
    $emit: l,
    $slots: i
  } = e, {
    slot: o,
    showTooltip: a,
    placeholder: r
  } = t;
  let h;
  n.directives && typeof n.directives == "object" && (h = Object.entries(n.directives).map(([v, b]) => [Q(v), b]));
  let m;
  if (o && !s.label)
    m = i.default();
  else {
    let v = null;
    if (o)
      v = i.default();
    else if (a) {
      let b;
      v = p(u("el-tooltip"), {
        effect: "dark",
        content: r,
        placement: "bottom"
      }, an(b = xe(e)) ? b : {
        default: () => [b]
      });
    } else
      v = xe(e);
    m = te(u("el-form-item"), {
      ...t,
      ...s
    }, {
      default: () => [v],
      label: () => te("span", {
        title: s.label,
        class: "overflow-text",
        style: {
          width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
          display: "inline-block"
        }
      }, [s.label])
    });
  }
  return h ? I(m, h) : m;
}, rn = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: n,
    $emit: l,
    $slots: i,
    mValue: o
  } = e, {
    slot: a,
    comp: r,
    modelValue: h
  } = t;
  let m;
  n.directives && typeof n.directives == "object" && (m = Object.entries(n.directives).map(([b, y]) => [Q(b), y]));
  let v;
  if (a && !s.label)
    v = i.default({
      ...t,
      ...s
    });
  else {
    const b = {
      modelValue: o,
      labelWidth: s["label-width"],
      labelAlign: s["label-align"] ?? s["label-position"],
      "onUpdate:modelValue": (y) => l("update:modelValue", y)
    };
    a && s.label || r ? v = te(u("van-field"), b, {
      input: () => a && s.label ? i.default() : xe(e)
    }) : v = te(u("van-field"), Object.assign(b, n));
  }
  return m ? I(v, m) : v;
}, dn = {
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
        comp: n,
        compType: l,
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
    return rn(this);
  }
}, Pe = {
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
        comp: n,
        slot: l,
        compType: i,
        span: o,
        offset: a,
        showTooltip: r,
        required: h,
        format: m,
        style: v,
        html: b,
        class: y,
        ...V
      } = { ...this.$props, ...this.$attrs };
      return V;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return on(this);
  }
}, Ke = () => {
  je((e) => ({
    ba9709f0: e.width
  }));
}, Je = Pe.setup;
Pe.setup = Je ? (e, t) => (Ke(), Je(e, t)) : Ke;
const cn = /* @__PURE__ */ O(Pe, [["__scopeId", "data-v-d2cde1e2"]]), Ye = /* @__PURE__ */ Object.assign({}), un = {
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
      await Promise.all(Object.keys(Ye).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], n = await Ye[t]();
        e[s] = n.default;
      })), this.icons = e;
    }
  }
}, hn = ["src"];
function mn(e, t, s, n, l, i) {
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), w("span", {
    key: 0,
    class: J(i.iconClass)
  }, null, 2)) : l.icons[s.name] ? (d(), w("img", {
    key: 1,
    src: l.icons[s.name],
    alt: "icon"
  }, null, 8, hn)) : (d(), f(o, _({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const pn = /* @__PURE__ */ O(un, [["render", mn]]), Ge = /* @__PURE__ */ Object.assign({}), fn = {
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
      await Promise.all(Object.keys(Ge).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], n = await Ge[t]();
        e[s] = n.default;
      })), this.icons = e;
    }
  }
}, gn = ["src"];
function bn(e, t, s, n, l, i) {
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), w("span", {
    key: 0,
    class: J(i.iconClass)
  }, null, 2)) : l.icons[s.name] ? (d(), w("img", {
    key: 1,
    src: l.icons[s.name],
    alt: "icon"
  }, null, 8, gn)) : (d(), f(o, De(_({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(ee(s.name)))
    ]),
    _: 1
  }, 16));
}
const _n = /* @__PURE__ */ O(fn, [["render", bn]]), { highdict: ft } = StardustJs, { storage: yn } = StardustBrowser, { local: gt } = yn, Be = ["index", "selection", "expand", "radio", "_index"];
function vn() {
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
    onKeywordsSearch: Function,
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
function wn() {
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
function Sn() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function kn() {
  const e = {};
  return [
    "keywords-search",
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
    "operates"
  ].forEach((s) => e[s] = s), { ...e, ...this.$attrs.domids };
}
function $n() {
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
function Cn() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function xn() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function Vn() {
  const { $props: e, _query: t } = this, { table: s, columns: n } = e;
  return (n || (s == null ? void 0 : s.columns) || []).map((i) => i.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (s.isInfinite ? 0 : (a - 1) * r) + o + 1;
    }
  }, i, { type: "index" }) : i.type === "radio" ? Object.assign({ width: 60, label: "单选" }, i) : Object.assign({}, i, i.tableAttrs));
}
function En() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function An() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function On() {
  const { table: e, finished: t } = this.$props;
  return t ?? (e == null ? void 0 : e.finished);
}
function jn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Fn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function Tn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function Dn() {
  return this.onKeywordsSearch || this._listen["keywords-search"] ? (...e) => this._emit("keywords-search", ...e) : null;
}
function Rn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function In() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Pn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function Bn() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function Mn() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function Nn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function Ln() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : () => {
  };
}
function Un() {
  var s;
  if (!this.controller || !((s = this.listen) != null && s.length))
    return {};
  let e = this.listen.split(",");
  e.includes("*") && (e = [.../* @__PURE__ */ new Set([
    ...e,
    "keywords-search",
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
  return e.forEach((n) => {
    const l = "handle" + n.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
    t[n] = this.controller[l];
  }), t;
}
function qn() {
  const e = this._columns.filter((s) => s.type && Be.includes(s.type) || s.fixed === "left"), t = this.settings.columns.filter((s) => !s.hide && s.fixed !== "left").map((s) => {
    const n = this._columns.find((l) => l.prop === s.prop);
    return {
      sortable: "custom",
      ...n,
      width: s.width || n.width
    };
  });
  return e.concat(t);
}
function Xn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function zn() {
  const { plain: e } = this._attrs;
  return e || e === "";
}
function Wn() {
  const { "hide-header": e } = this._attrs;
  return e || e === "";
}
function Hn() {
  const { "hide-tools": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Kn() {
  const { "hide-searcher": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Jn() {
  const { "hide-chart": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Yn() {
  const { "hide-settings": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Gn() {
  const { "hide-operates": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Qn() {
  const { "hide-pagination": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Zn() {
  return this._attrs["operates-width"] ?? 150;
}
function ei() {
  return this._attrs["operates-dropdown"];
}
function ti() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !Be.includes(e.type)));
}
function si() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function ni() {
  const e = this._uid && gt.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Be.includes(t.type))).map((t) => {
    const { prop: s, label: n, show: l, hide: i, width: o, virtual: a, fixed: r } = t;
    return { prop: s, label: n, show: l, hide: i, width: o, virtual: a, fixed: r };
  })), this.settings = e;
}
function ii(e) {
  gt.setJson(`Settings[${this._uid}]`, e);
}
function li(e, t) {
  const { prop: s } = t, n = e[s];
  let { format: l, formatter: i } = t.tableAttrs || t;
  if (i)
    return i(n, e);
  if (l = Array.isArray(t.options) ? l !== !1 : l, l) {
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
  }
  return n === void 0 ? s.includes(".") || s.includes("[") ? ft.get(e, s, this.defaultValue) : this.defaultValue : n === "" ? this.defaultValue : n;
}
function ai(e, t) {
  return t.link ? t.link(e) : ft.get(e, t.linkProp || t.prop);
}
function oi(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function ri(e) {
  this.params = e, this._emit("search", e);
}
function di(e) {
  this.saveSettings(e), this.initSettings();
}
function ci(e, t, s, n) {
  const l = this.settings.columns.find((i) => i.prop === s.property);
  l && (l.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, n);
}
function ui(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function hi(e) {
  var t, s, n, l;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((l = (n = this.controller) == null ? void 0 : n.handleSortChange) == null || l.call(n, e));
}
function mi(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function pi(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function fi() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function gi() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function bi(e) {
  var n;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((n = s == null ? void 0 : s.tableAttrs) != null && n.class) {
    const l = s.tableAttrs.class;
    typeof l == "function" ? t += " " + l(e) : typeof l == "string" && (t += " " + l);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function _i(e) {
  var n;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((n = s == null ? void 0 : s.tableAttrs) != null && n.style) {
    const l = s.tableAttrs.style;
    typeof l == "function" ? Object.assign(t, l(e)) : typeof l == "object" && Object.assign(t, l);
  }
  return Object.keys(t) ? t : null;
}
function yi(e, t) {
  const { tagTypes: s, prop: n, options: l } = t, i = e.row[n];
  if (s) {
    if (typeof s == "function")
      return s(i, e, t);
    if (typeof s == "object")
      return s[i];
  } else if (l) {
    const o = l.find((a) => a[t.value || "value"] === i);
    if (o != null && o.tagType)
      return o.tagType;
  }
  return i ? "success" : "danger";
}
function vi(e, t) {
  const { tagValues: s, prop: n, options: l } = t, i = e.row[n];
  if (s) {
    if (typeof s == "function")
      return s(i, e, t);
    if (typeof s == "object")
      return s[i];
  } else if (l) {
    const o = l.find((a) => a[t.value || "value"] === i);
    if (o)
      return o[t.text || "text"];
  }
  return i;
}
function wi(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Si(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function ki(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function $i(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Ci(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function xi(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function Vi(e, t) {
  var n;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((n = t.previewSrcList) == null ? void 0 : n.call(t)) || [s];
}
function Ei(e, t) {
  const s = "on" + e.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Ai() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const X = {
  props: vn,
  emits: wn,
  computed: {
    _attrs: Sn,
    domids: kn,
    elTableAttrs: $n,
    _loading: Cn,
    _data: xn,
    _columns: Vn,
    _query: En,
    _total: An,
    _finished: On,
    _selection: jn,
    _chartHeight: Fn,
    _chartOption: Tn,
    _onKeywordsSearch: Dn,
    _onSearch: Rn,
    _onAdd: In,
    _onExport: Pn,
    _onSearchExport: Bn,
    _onImport: Mn,
    _onMultiDelete: Nn,
    _onLoad: Ln,
    _listen: Un,
    _visibleColumns: qn,
    _uid: Xn,
    plain: zn,
    hideHeader: Wn,
    hideTools: Hn,
    hideSearcher: Kn,
    hideChart: Jn,
    hideSettings: Yn,
    hideOperates: Gn,
    hidePagination: Qn,
    operatesWidth: Zn,
    operatesDropdown: ei,
    searcherColumns: ti,
    searcherConfig: si
  },
  watch: {
    $route: Ai
  },
  methods: {
    initSettings: ni,
    saveSettings: ii,
    calcValue: li,
    calcLink: ai,
    calcOverflowTooltip: oi,
    handleSearch: ri,
    handleResetSettings: di,
    handleHeaderDragend: ci,
    handleSelectionChange: ui,
    handleSortChange: hi,
    handleCheckedChange: mi,
    handleCollapseChange: pi,
    handleMinus: fi,
    handleToggleFullscreen: gi,
    cellClassName: bi,
    cellStyle: _i,
    calcTagType: yi,
    calcTagValue: vi,
    canEdit: wi,
    canSave: Si,
    canRowEdit: ki,
    canCancelEdit: $i,
    canDelete: Ci,
    _imageSrc: xi,
    _imagePreviewSrcList: Vi,
    _emit: Ei
  }
}, Me = {
  name: "XInfo",
  props: {
    data: Object,
    fields: Array,
    span: {
      type: Number,
      default: window.isMobile ? 24 : 8
    },
    showColon: {
      type: Boolean,
      default: !1
    },
    labelWidth: {
      type: String,
      default: "80px"
    },
    labelSlot: {
      type: Boolean,
      default: !1
    },
    align: String,
    labelAlign: String,
    valueAlign: String,
    defaultValue: ""
  },
  computed: {
    blocks() {
      const e = {};
      return this.fields.filter((t) => t.prop).forEach((t) => {
        const { infoAttrs: s = {}, ...n } = t, l = { span: this.span, ...n, ...s }, i = l.block || "基本信息";
        let o = e[i];
        o || (e[i] = o = [], o.span = 0), o.span + l.span > 24 && o.length ? o[o.length - 1].span += 24 - o.span : o.span += l.span, o.push(l);
      }), e;
    },
    hideHeader() {
      const e = Object.keys(this.blocks);
      return e.length === 1 && e[0] === "基本信息";
    },
    _labelAlign() {
      return this.labelAlign || this.align || "left";
    },
    _valueAlign() {
      return this.valueAlign || this.align || "left";
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
    calcValue: X.methods.calcValue,
    calcLink: X.methods.calcLink
  }
}, Qe = () => {
  je((e) => ({
    "5cf44854": e.labelWidth,
    "323265ec": e._labelAlign,
    "0e4e598f": e._valueAlign
  }));
}, Ze = Me.setup;
Me.setup = Ze ? (e, t) => (Qe(), Ze(e, t)) : Qe;
const Oi = { class: "x-info__label" }, ji = { key: 1 }, Fi = { class: "x-info__value" }, Ti = { key: 2 };
function Di(e, t, s, n, l, i) {
  const o = u("router-link"), a = u("el-col"), r = u("el-row"), h = u("el-collapse-item"), m = u("el-collapse");
  return d(), f(m, {
    modelValue: l.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (v) => l.activeNames = v),
    class: J(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), w(P, null, M(i.blocks, (v, b) => (d(), f(h, {
        key: b,
        title: b,
        name: b
      }, {
        default: c(() => [
          p(r, {
            gutter: e.$attrs.gutter || 10
          }, {
            default: c(() => [
              (d(!0), w(P, null, M(v, (y) => (d(), f(a, _({
                key: y.prop,
                span: s.span
              }, y), {
                default: c(() => [
                  j("div", Oi, [
                    e.$slots.label ? E(e.$slots, "label", {
                      key: 0,
                      label: y.label
                    }, void 0, !0) : (d(), w("span", ji, $(y.label ? s.showColon ? y.label + "：" : y.label : ""), 1))
                  ]),
                  j("div", Fi, [
                    y.slot === "$link" ? (d(), f(o, {
                      key: 0,
                      to: y.to(s.data)
                    }, {
                      default: c(() => [
                        x($(i.calcLink(s.data, y)), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])) : y.slot ? E(e.$slots, y.slot, De(_({ key: 1 }, { data: s.data, field: y, value: i.calcValue(s.data, y) })), void 0, !0) : (d(), w("span", Ti, $(i.calcValue(s.data, y)), 1))
                  ])
                ]),
                _: 2
              }, 1040, ["span"]))), 128))
            ]),
            _: 2
          }, 1032, ["gutter"])
        ]),
        _: 2
      }, 1032, ["title", "name"]))), 128))
    ]),
    _: 3
  }, 8, ["modelValue", "class"]);
}
const Ri = /* @__PURE__ */ O(Me, [["render", Di], ["__scopeId", "data-v-d4d685d3"]]), Ii = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Pi = { key: 1 };
function Bi(e, t, s, n, l, i) {
  return d(), w("div", null, [
    (d(!0), w(P, null, M(s.items, (o, a) => (d(), f(ee(s.compName), _({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? E(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), w("span", Pi, $(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const Mi = /* @__PURE__ */ O(Ii, [["render", Bi]]), Ni = {
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
function Li(e, t, s, n, l, i) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), h = u("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      p(o, { span: 6 }, {
        default: c(() => [
          j("span", null, "总计: " + $(s.total), 1)
        ]),
        _: 1
      }),
      p(o, { span: 18 }, {
        default: c(() => [
          p(r, _({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (m) => s.query.page = m),
            "page-count": i.pageCount
          }), {
            "prev-text": c(() => [
              p(a, { name: "arrow-left" }),
              x(" 上一页 ")
            ]),
            "next-text": c(() => [
              x(" 下一页 "),
              p(a, { name: "arrow" })
            ]),
            page: c(({ text: m }) => [
              x($(m), 1)
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
const Ui = /* @__PURE__ */ O(Ni, [["render", Li]]), qi = {
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
function Xi(e, t, s, n, l, i) {
  const o = u("el-pagination");
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
const zi = /* @__PURE__ */ O(qi, [["render", Xi]]), Wi = {
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
    },
    value() {
      return [this.modelValue];
    },
    text() {
      var e;
      return ((e = this.columns.find((t) => t.value === this.modelValue)) == null ? void 0 : e.text) ?? this.placeholder;
    }
  },
  methods: {
    onConfirm(e) {
      this.$emit("confirm", e), this.$emit("update:modelValue", e);
    }
  }
};
function Hi(e, t, s, n, l, i) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), w(P, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: J(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, $(i.text), 3),
    p(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: c(() => [
        p(o, _(e.$attrs, {
          modelValue: i.value,
          title: e.$attrs.title,
          columns: s.columns,
          onCancel: t[1] || (t[1] = (r) => e.$emit("cancel")),
          onConfirm: i.onConfirm
        }), null, 16, ["modelValue", "title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const Ki = /* @__PURE__ */ O(Wi, [["render", Hi]]), Ji = {
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
        this._options = W(this.options, this);
      }
    }
  }
};
function Yi(e, t, s, n, l, i) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, _({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), w(P, null, M(l._options, (r) => {
        var h;
        return d(), f(o, _(e.$attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          name: r.value
        }), {
          default: c(() => [
            x($(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const Gi = /* @__PURE__ */ O(Ji, [["render", Yi]]), Qi = {
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
        ...n
      } = this.$attrs;
      return n;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = W(this.options, this);
      }
    }
  }
}, Zi = { key: 1 };
function el(e, t, s, n, l, i) {
  const o = u("el-radio-group");
  return d(), f(o, _({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), w(P, null, M(l._options, (a) => {
        var r;
        return d(), f(ee(s.button ? "el-radio-button" : "el-radio"), _(i.attrs, {
          disabled: (r = a.raw) == null ? void 0 : r.disabled,
          key: a.text,
          value: a.value
        }), {
          default: c(() => [
            e.$slots.custom ? E(e.$slots, "custom", {
              key: 0,
              option: a,
              raw: a.raw
            }, void 0, !0) : (d(), w("span", Zi, $(a.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const tl = /* @__PURE__ */ O(Qi, [["render", el], ["__scopeId", "data-v-1c8cf979"]]), sl = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, nl = { key: 1 };
function il(e, t, s, n, l, i) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), w(P, null, M(s.cols, (r, h) => (d(), f(o, _(r, {
        span: r.xs ?? r.span,
        key: h
      }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? E(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", nl, $(r.text), 1))
        ]),
        _: 2
      }, 1040, ["span"]))), 128)),
      s.cols.length === 0 ? E(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const ll = /* @__PURE__ */ O(sl, [["render", il]]), al = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ol = { key: 1 };
function rl(e, t, s, n, l, i) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), w(P, null, M(s.cols, (r, h) => (d(), f(o, _(r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? E(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", ol, $(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? E(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const dl = /* @__PURE__ */ O(al, [["render", rl]]), cl = {
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
function ul(e, t, s, n, l, i) {
  const o = u("van-icon"), a = u("van-field");
  return d(), f(a, _({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    "right-icon": c(() => [
      p(o, {
        name: "scan",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const hl = /* @__PURE__ */ O(cl, [["render", ul]]), ml = {
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
function pl(e, t, s, n, l, i) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, _(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    append: c(() => [
      p(o, {
        icon: "CameraFilled",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const fl = /* @__PURE__ */ O(ml, [["render", pl]]), Ne = async (e, t, s) => {
  if (s.loading)
    return;
  s.loading = !0;
  const n = t == null ? void 0 : t.trim(), { text: l = "text", value: i = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], l, i])], a.page || (a.page = 1), a.limit || (a.limit = 100), n && (a.where = a.where || {}, a.where[l] = a.where[l] || {}, a.where[l]["[Op.like]"] = `%${n}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, Ve = (e, t) => !e || typeof e != "object" ? e : !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((n) => e[n])[0], Ee = (e, t) => !e || typeof e != "object" || !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((n) => e[n]).slice(1).join(" - ") + ")", gl = {
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
  emits: ["update:modelValue", "change"],
  data() {
    return {
      visible: !1,
      _value: void 0,
      _options: []
    };
  },
  watch: {
    modelValue(e) {
      this._value = e;
    },
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        this._options = W(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: W,
    remoteSearch(e) {
      if (!this.modelName)
        return this._options;
      Ne(this.service.restful, e, this);
    },
    onShow() {
      this.visible = !0;
    },
    onClick(e) {
      e.target.classList.contains("van-overlay") || this.onShow();
    },
    onConfirm() {
      (this._value == null || this._value === "") && (this._value = this._options[0].value), this.visible = !1, this.$emit("update:modelValue", this._value), this.$emit("change", this._value);
    },
    onChange(e) {
      this._value = e.selectedValues[0];
    }
  }
};
function bl(e, t, s, n, l, i) {
  const o = u("x-picker");
  return d(), w("div", {
    onClick: t[2] || (t[2] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(o, _(e.$attrs, {
      modelValue: l._value,
      "onUpdate:modelValue": i.onChange,
      show: l.visible,
      columns: l._options,
      onClick: t[0] || (t[0] = G(() => {
      }, ["stop"])),
      onShow: i.onShow,
      onCancel: t[1] || (t[1] = (a) => l.visible = !1),
      onConfirm: i.onConfirm,
      onChange: i.onChange
    }), null, 16, ["modelValue", "onUpdate:modelValue", "show", "columns", "onShow", "onConfirm", "onChange"])
  ]);
}
const _l = /* @__PURE__ */ O(gl, [["render", bl]]), yl = {
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
    remote: {
      type: Boolean,
      default: !1
    },
    sort: Boolean | String,
    options: Array | Object,
    // 接收下面这几个属性，为了避免这些属性被绑定到当前组件根节点上，在下面会进行过滤传给子组件
    platform: String
  },
  data() {
    return {
      loading: !1,
      _options: [],
      list: []
    };
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        const e = W(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = Ve(this.options[s], this), t._remark_ = Ee(this.options[s], this);
        }), this._options = ie(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: W,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = ie(this._options);
      const t = !this.$slots.custom && this.labelTexts;
      this.list = ie(this._options.filter((s) => {
        let n = s.text;
        return t && (n += s._main_ + s._remark_), n.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ne(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return Ve(e, this);
    },
    calcRemarkLabel(e) {
      return Ee(e, this);
    }
  }
}, vl = { key: 1 }, wl = { class: "main" }, Sl = { class: "remark" };
function kl(e, t, s, n, l, i) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, _({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: l.loading
  }, e.$attrs, {
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || i.filter,
    onKeyup: Re(i.handleRemote, ["enter"])
  }), {
    default: c(() => [
      (d(!0), w(P, null, M(l.list, (r, h) => {
        var m;
        return d(), f(o, _(e.$attrs, {
          disabled: (m = r.raw) == null ? void 0 : m.disabled,
          key: r.value,
          label: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? E(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), w("span", vl, [
              j("span", wl, $(r._main_), 1),
              j("span", Sl, $(r._remark_), 1)
            ]))
          ]),
          _: 2
        }, 1040, ["disabled", "label", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote", "filter-method", "onKeyup"]);
}
const $l = /* @__PURE__ */ O(yl, [["render", kl], ["__scopeId", "data-v-20ab71e6"]]), Cl = {
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
    remote: {
      type: Boolean,
      default: !1
    },
    sort: Boolean | String,
    options: Array | Object
  },
  data() {
    return {
      loading: !1,
      _options: [],
      list: []
    };
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler() {
        const e = W(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = Ve(this.options[s], this), t._remark_ = Ee(this.options[s], this);
        }), this._options = ie(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: W,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = ie(this._options);
      const t = !!this.$slots.custom;
      this.list = ie(this._options.filter((s) => {
        let n = s.text;
        return t || (n += s._main_ + s._remark_), n.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ne(this.service.restful, e, this);
    }
  }
}, xl = { key: 1 }, Vl = { class: "main" }, El = { class: "remark" };
function Al(e, t, s, n, l, i) {
  const o = u("el-select-v2");
  return d(), f(o, _({
    class: ["pc-x-select-v2", s.plain ? "x-select-v2--plain" : ""],
    loading: l.loading
  }, e.$attrs, {
    options: l.list,
    props: { label: "text" },
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || i.filter,
    onKeyup: Re(i.handleRemote, ["enter"])
  }), {
    default: c(({ item: a, index: r }) => [
      e.$slots.custom ? E(e.$slots, "custom", {
        key: 0,
        option: a,
        raw: a.raw
      }, void 0, !0) : (d(), w("span", xl, [
        j("span", Vl, $(a._main_), 1),
        j("span", El, $(a._remark_), 1)
      ]))
    ]),
    _: 3
  }, 16, ["class", "loading", "options", "filterable", "remote", "filter-method", "onKeyup"]);
}
const Ol = /* @__PURE__ */ O(Cl, [["render", Al], ["__scopeId", "data-v-70bc3765"]]), et = {
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
}, jl = [{
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
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"],
  universal: ["eq", "ne", "gt", "gte", "lt", "lte", "in", "like", "notIn", "notLike", "between", "special"]
};
L["x-select"] = L.XSelect;
L.XSelectV2 = L.XSelect;
L["x-select-v2"] = L.XSelect;
L["x-radios"] = L.XRadios;
L["x-checkboxs"] = L.XCheckboxs;
L["el-date-picker"] = L.ElDatePicker;
L["el-input-number"] = L.ElInputNumber;
L["el-input"] = L.ElInput;
function Fl() {
  const e = window.isMobile ? "small" : "", {
    $attrs: t,
    config: s,
    columns: n,
    visible: l,
    conditions: i,
    expression: o,
    handleSearch: a,
    handleReset: r,
    handleAdd: h,
    handleDelete: m,
    handleSelectField: v,
    handleSelectOp: b
  } = this;
  return p(u("x-dialog"), _({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: t.title || "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": t["submit-text"] || "查询"
  }, {
    modelValue: l,
    "onUpdate:modelValue": (y) => this.visible = y,
    onCancel: r,
    onSubmit: a
  }), {
    default: () => [s.traditional ? null : p(u("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: h
    }, {
      default: () => [x("新增条件")]
    }), p("div", {
      class: "conditions"
    }, [i.map((y, V) => p("div", {
      class: "condition flex-center",
      key: y.no
    }, [s.traditional ? null : p(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => m(V)
    }, {
      default: () => [x("X")]
    }), s.traditional ? null : p("span", {
      class: "title"
    }, [y.no]), p("div", {
      class: "expression"
    }, [s.traditional ? p(u("el-input"), {
      modelValue: y.item.label,
      readonly: !0
    }, null) : p(u("pc-x-select"), {
      modelValue: y.prop,
      onChange: (F) => v(y, F),
      options: n,
      text: "label",
      value: "prop"
    }, null), p(u("pc-x-select"), {
      modelValue: y.op,
      onChange: (F) => b(y, F),
      options: y.ops
    }, null), p("div", {
      class: "value-container"
    }, [Tl(this, y)])])]))]), s.traditional ? null : p(u("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: o,
      "onUpdate:modelValue": (y) => this.expression = y
    }), null)]
  });
}
function Tl(e, t) {
  const s = (l) => te(u((l == null ? void 0 : l.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (i) => t.value = i,
    onKeyup: (i) => {
      i.key === "Enter" && e.handleSearch();
    }
  }, l)), n = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? p("div", {
    class: "col-2"
  }, [s({
    ...n,
    modelValue: t.value[0],
    "onUpdate:modelValue": (l) => t.value[0] = l
  }), s({
    ...n,
    modelValue: t.value[1],
    "onUpdate:modelValue": (l) => t.value[1] = l
  })]) : ["in", "notIn"].includes(t.op) ? (n.multiple = !0, s(n)) : t.op === "special" ? s({
    ...n,
    component: "x-select",
    placeholder: "请选择特殊值",
    options: jl
  }) : s();
}
const { storage: we } = StardustBrowser, { deepCopy: Dl } = StardustJs.funcs, Rl = {
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
  render: Fl,
  methods: {
    init() {
      const e = this.uid && we.local.getJson(this.key, this.config) || this.config;
      this.initConfig(Dl(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      we.local.setJson(this.key, {
        conditionNo: this.conditionNo,
        conditions: this.conditions.map((e) => {
          const { item: t, ops: s, component: n, ...l } = e;
          return l;
        }),
        expression: this.expression
      });
    },
    initConfig(e) {
      var t, s;
      (t = e.conditions) == null || t.forEach((n) => {
        const { prop: l, op: i, value: o, universal: a } = n;
        n.item = this.columns.find((r) => r.prop === l), this.handleSelectField(n, l), this.handleSelectOp(n, i), n.value = o, n.ops = L[a ? "universal" : n.component].map((r) => et[r]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((n) => n.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        q.w(t.toString());
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, e.page = 1, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      we.local.remove(this.key), Object.assign(this, {
        conditionNo: 1,
        conditions: [],
        expression: ""
      }), this.init();
    },
    calcParams() {
      const e = this.calcTree();
      if (!e)
        return;
      const t = (n, l) => {
        const i = [], o = "[Op." + n.type + "]";
        l[o] = i;
        for (let a of n.items)
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
        i.length || delete l[o];
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim();
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((l) => l.trim()), s = (l, i) => {
        for (; i.length; ) {
          const o = i.shift();
          if (["and", "or"].includes(o)) {
            if (l.type && l.type !== o)
              throw "串联不同逻辑表达式请使用小括号区分";
            l.type = o;
          } else if (o === "(") {
            const a = { type: "", items: [] };
            l.items.push(a), a._parent = l, s(a, i);
            break;
          } else
            o === ")" ? (s(l._parent, i), delete l._parent) : l.items.push(o);
        }
      }, n = { type: "", items: [] };
      return s(n, t), n.type = n.type || "and", n;
    },
    parseCondition(e) {
      let { prop: t, op: s, value: n } = e;
      const l = {};
      if (s === "special") {
        const i = n.startsWith("NOT_"), o = n.startsWith("NE_");
        return n.includes("NULL") ? n = null : n.includes("BLANK") && (n = ""), i ? n = { "[Op.not]": n } : o && (n = { "[Op.ne]": n }), l[t] = n, l;
      }
      return (s === "like" || s === "notLike") && (n = "%" + n + "%"), l[t] = {
        [`[Op.${s}]`]: n
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
      e.value = "", e.prop = t, e.item = this.columns.find((D) => D.prop === e.prop);
      const { options: s, type: n, formAttrs: l = {} } = e.item, i = { ...e.item, ...l }, {
        comp: o,
        universal: a,
        visible: r,
        canAdd: h,
        canEdit: m,
        required: v,
        slot: b,
        span: y,
        tableAttrs: V,
        formAttrs: F,
        tagTypes: g,
        tagValues: C,
        width: T,
        minWidth: z,
        disabled: H,
        readonly: R,
        ...A
      } = i;
      A.clearable ?? (A.clearable = !0), e.config = A, e.component = o || s && "XSelect" || n === "number" && "ElInputNumber" || "ElInput", e.ops = L[a ? "universal" : e.component].map((D) => et[D]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", A.type = "date"), A.type === "textarea" && delete A.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, Le = /* @__PURE__ */ O(Rl, [["__scopeId", "data-v-da836e24"]]), Il = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...X.props(),
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
    ...X.emits()
  ],
  components: { Searcher: Le },
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
    ...X.computed,
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
        e.forEach((s, n) => {
          s && t.push(this._data[n]);
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
    ...X.methods,
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
}, Pl = { class: "mobile-x-table" }, Bl = {
  key: 1,
  class: "card"
}, Ml = ["onClick"], Nl = { class: "row-header flex-center" }, Ll = ["value", "checked"], Ul = { class: "label" }, ql = { class: "value" }, Xl = ["value", "checked"], zl = {
  key: 2,
  class: "index"
}, Wl = { class: "title" };
function Hl(e, t, s, n, l, i) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("x-icon"), m = u("van-cell"), v = u("van-list"), b = u("x-pagination"), y = u("x-info"), V = u("van-popup"), F = u("van-action-sheet");
  return d(), w("div", Pl, [
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
    }), oe({ _: 2 }, [
      e.$slots["tools-prefix"] ? {
        name: "tools-prefix",
        fn: c(() => [
          E(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: c(() => [
          E(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), w("div", Bl, [
      (d(!0), w(P, null, M(e._data, (g, C) => (d(), w("div", {
        key: C,
        class: "row",
        onClick: (T) => i.handleClickCard(C)
      }, [
        j("div", Nl, [
          i.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: l.selected[C],
            "onUpdate:modelValue": (T) => l.selected[C] = T,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = G(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
          p(h, {
            name: "ellipsis",
            class: "more",
            onClick: G((T) => i.handleShowActionSheet(g, C), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        i.hasRadio ? (d(), w("input", {
          key: 0,
          type: "radio",
          value: C,
          checked: C === l.checked,
          class: "radio",
          onClick: t[1] || (t[1] = G(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
        }, null, 40, Ll)) : k("", !0),
        (d(!0), w(P, null, M(i.cols, (T, z) => (d(), w("div", {
          key: z,
          class: "field"
        }, [
          j("span", Ul, $(T.label) + ":", 1),
          j("span", ql, $(e.calcValue(g, T)), 1)
        ]))), 128))
      ], 8, Ml))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(v, _({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (g) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), w(P, null, M(e._data, (g, C) => (d(), f(m, {
          key: C,
          "is-link": "",
          onClick: (T) => i.handleShowDetail(g, C)
        }, {
          default: c(() => [
            i.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: l.selected[C],
              "onUpdate:modelValue": (T) => l.selected[C] = T,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = G(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
            i.hasRadio ? (d(), w("input", {
              key: 1,
              type: "radio",
              value: C,
              checked: C === l.checked,
              class: "radio",
              onClick: t[4] || (t[4] = G(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...T) => e.handleCheckedChange && e.handleCheckedChange(...T))
            }, null, 40, Xl)) : k("", !0),
            i.hasIndex ? (d(), w("span", zl, $(C + 1), 1)) : k("", !0),
            j("span", Wl, $(i.calcTitle(g)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : k("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(b, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (g) => e._emit("search"))
    }, null, 8, ["query", "total"])) : k("", !0),
    p(V, {
      show: l.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (g) => l.popupVisible = g),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        p(y, {
          data: l.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(F, {
      show: l.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (g) => l.actionSheetVisible = g),
      actions: i.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: i.handleSelectAction,
      onCancel: t[10] || (t[10] = (g) => l.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const Kl = /* @__PURE__ */ O(Il, [["render", Hl], ["__scopeId", "data-v-84e93229"]]), Jl = {
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
  computed: {
    hideColumns() {
      const e = this.$attrs["hide-settings-columns"];
      return e === "" || e === !0;
    },
    hideSorts() {
      const e = this.$attrs["hide-settings-sorts"];
      return e === "" || e === !0;
    }
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
          const s = [...t.to.querySelectorAll(".row")].map((n) => n.dataset.prop);
          this.columns = s.map((n) => e[n]), this.update();
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
          const { prop: t, label: s, show: n, hide: l, width: i } = e;
          return { prop: t, label: s, show: n, hide: l, width: i };
        })
      });
    }
  }
}, Yl = (e) => (Fe("data-v-a9d96f8a"), e = e(), Te(), e), Gl = {
  class: "table",
  ref: "colsTable"
}, Ql = ["data-prop"], Zl = ["title", "onClick"], ea = /* @__PURE__ */ Yl(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1)), ta = {
  class: "table",
  ref: "sortsTable"
}, sa = ["data-prop"];
function na(e, t, s, n, l, i) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), h = u("ElCheckbox"), m = u("el-input-number"), v = u("el-tab-pane"), b = u("x-select"), y = u("x-radios"), V = u("el-tabs"), F = u("el-popover");
  return s.visible ? (d(), f(F, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: c(() => [
      p(o, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: c(() => [
      p(V, {
        modelValue: l.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => l.activeName = g)
      }, {
        default: c(() => [
          i.hideColumns ? k("", !0) : (d(), f(v, {
            key: 0,
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              p(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: i.handleResetColumns
              }, {
                default: c(() => [
                  x("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", Gl, [
                (d(!0), w(P, null, M(l.columns, (g) => (d(), w("div", {
                  key: g.prop,
                  "data-prop": g.prop,
                  class: "row flex-center"
                }, [
                  p(r, null, {
                    default: c(() => [
                      p(a)
                    ]),
                    _: 1
                  }),
                  p(h, {
                    modelValue: g.show,
                    "onUpdate:modelValue": (C) => g.show = C,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  j("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (C) => i.handleToggle(g)
                  }, $(g.label), 9, Zl),
                  p(m, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (C) => g.width = C,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  ea
                ], 8, Ql))), 128))
              ], 512)
            ]),
            _: 1
          })),
          i.hideSorts ? k("", !0) : (d(), f(v, {
            key: 1,
            name: "sorts",
            label: "多列排序"
          }, {
            default: c(() => [
              p(o, {
                type: "primary",
                plain: "",
                icon: "Plus",
                onClick: i.handleAddSort
              }, {
                default: c(() => [
                  x("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", ta, [
                (d(!0), w(P, null, M(l.sorts, (g, C) => (d(), w("div", {
                  key: g[0],
                  "data-prop": g[0],
                  class: "row flex-center"
                }, [
                  p(b, {
                    modelValue: g[0],
                    "onUpdate:modelValue": (T) => g[0] = T,
                    options: l.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(y, {
                    modelValue: g[1],
                    "onUpdate:modelValue": (T) => g[1] = T,
                    options: l.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (T) => l.sorts.splice(C, 1)
                  }, null, 8, ["onClick"])
                ], 8, sa))), 128))
              ], 512)
            ]),
            _: 1
          }))
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 16)) : k("", !0);
}
const bt = /* @__PURE__ */ O(Jl, [["render", na], ["__scopeId", "data-v-a9d96f8a"]]), { highdict: ia } = StardustJs, la = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...X.props()
  },
  emits: [
    ...X.emits()
  ],
  components: { Searcher: Le, Settings: bt },
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
        ...pe()
      }
    };
  },
  computed: {
    ...X.computed
  },
  watch: {
    ...X.watch,
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
    ...X.methods,
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
        const n = this.controller.getSearchParams(), l = await this.controller.search(n);
        let i = ia.get(l, this.controller.listProp);
        return i = this.controller.formatList(this.controller._defaultFormatList(i, l), l), i;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, aa = {
  key: 1,
  class: "collapse-title"
}, oa = {
  key: 2,
  class: "collapse-title"
}, ra = /* @__PURE__ */ j("span", null, "-", -1), da = ["value", "checked"], ca = { key: 1 };
function ua(e, t, s, n, l, i) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), m = u("el-image"), v = u("el-tag"), b = u("router-link"), y = u("el-icon"), V = u("el-table-column"), F = u("el-button"), g = u("el-dropdown-item"), C = u("el-dropdown-menu"), T = u("el-dropdown"), z = u("el-table"), H = u("x-pagination"), R = u("el-collapse-item"), A = u("el-collapse"), D = u("x-chart"), U = u("x-dialog"), B = Q("domid"), se = Q("loading"), be = Q("el-table-infinite-scroll");
  return d(), w(P, null, [
    j("div", {
      class: J(["pc-x-table", { fullscreen: l.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      p(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      p(A, {
        modelValue: l.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (S) => l.activeNames = S),
        class: J((l._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          p(R, {
            name: l.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? E(e.$slots, "collapse-title", { key: 0 }) : l.activeNames.length ? (d(), w("span", aa, $(e.title), 1)) : (d(), w("span", oa, [
                x($(e.title) + "，当前第 ", 1),
                j("span", null, $(e._query.page), 1),
                x(" 页，展示 "),
                j("span", null, $(e._data.length), 1),
                x(" 条数据， 共 "),
                j("span", null, $(e._total || e._data.length), 1),
                x(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              E(e.$slots, "tools-top"),
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, _({ key: 0 }, e._attrs, {
                domids: e.domids,
                onAdd: e._onAdd,
                onKeywordsSearch: e._onKeywordsSearch,
                onSearch: e._onSearch,
                onExport: e._onExport,
                onSearchExport: e._onSearchExport,
                onImport: e._onImport,
                onMultiDelete: e._onMultiDelete
              }), oe({
                "tools-end": c(() => [
                  e.hideChart ? k("", !0) : (d(), f(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: i.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  j("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...S) => e.handleMinus && e.handleMinus(...S))
                  }, [
                    p(a, { name: "FullScreen" }),
                    ra
                  ]),
                  p(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  p(r, _({
                    modelValue: l.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (S) => l.settings = S)
                  }, { ...e._attrs.settings, ...e.$attrs }, {
                    visible: !e.hideSettings,
                    width: e._attrs["cols-popover-width"] || 500,
                    onSort: t[2] || (t[2] = (S) => e.$emit("sort", S)),
                    onReset: e.handleResetSettings,
                    onSortChange: e.handleSortChange
                  }), null, 16, ["modelValue", "visible", "width", "onReset", "onSortChange"])
                ]),
                _: 2
              }, [
                e.$slots["tools-prefix"] ? {
                  name: "tools-prefix",
                  fn: c(() => [
                    E(e.$slots, "tools-prefix")
                  ]),
                  key: "0"
                } : void 0,
                e.$slots["tools-suffix"] ? {
                  name: "tools-suffix",
                  fn: c(() => [
                    E(e.$slots, "tools-suffix")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["domids", "onAdd", "onKeywordsSearch", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
              E(e.$slots, "tools-bottom"),
              I((d(), f(z, _({
                ref: "tableRef",
                "element-loading-text": "加载中..."
              }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), w(P, null, M(e._visibleColumns, (S, Y) => (d(), f(V, _(S, {
                    key: Y,
                    "min-width": S.minWidth,
                    align: S.align || e._attrs.tableAlign || "center",
                    resizable: S.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(S)
                  }), oe({ _: 2 }, [
                    ["selection", "index"].includes(S.type) ? void 0 : {
                      name: "default",
                      fn: c((N) => [
                        S.type === "radio" ? (d(), w("input", {
                          key: 0,
                          type: "radio",
                          value: N.$index,
                          checked: N.$index === l.checked,
                          onChange: t[3] || (t[3] = (..._e) => e.handleCheckedChange && e.handleCheckedChange(..._e))
                        }, null, 40, da)) : S.slot === "$image" ? (d(), f(m, _({
                          key: 1,
                          src: e._imageSrc(N, S),
                          "preview-src-list": e._imagePreviewSrcList(N, S),
                          "preview-teleported": ""
                        }, S.imageAttrs), null, 16, ["src", "preview-src-list"])) : S.slot === "$tag" ? (d(), f(v, {
                          key: 2,
                          type: e.calcTagType(N, S)
                        }, {
                          default: c(() => [
                            x($(e.calcTagValue(N, S)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : S.slot === "$link" ? (d(), f(b, {
                          key: 3,
                          to: S.to(N)
                        }, {
                          default: c(() => [
                            x($(e.calcLink(N.row, S)), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"])) : S.slot === "$icon" ? (d(), f(y, {
                          key: 4,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(ee(N.row[S.prop])))
                          ]),
                          _: 2
                        }, 1024)) : S.slot ? E(e.$slots, S.slot, {
                          key: 5,
                          scope: N,
                          column: S,
                          value: N.row[S.prop]
                        }) : e.slotAll ? E(e.$slots, "all", {
                          key: 6,
                          scope: N,
                          column: S,
                          value: N.row[S.prop]
                        }) : (d(), w(P, { key: 7 }, [
                          S.comp === "ElSwitch" || e.table.isRowEdit && N.row.isEditing && (S.visible !== !1 || S.canEdit) ? (d(), f(ee(S.comp || "ElInput"), _({ key: 0 }, { ...S, ...S.formAttrs }, {
                            modelValue: N.row[S.prop],
                            "onUpdate:modelValue": (_e) => N.row[S.prop] = _e,
                            disabled: !N.row.editable || !N.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), w("span", ca, $(e.calcValue(N.row, S)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? k("", !0) : (d(), f(V, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((S) => [
                      E(e.$slots, "operates-prefix", { scope: S }),
                      e.operatesDropdown ? (d(), f(T, {
                        key: 0,
                        class: "operates-dropdown"
                      }, {
                        dropdown: c(() => [
                          p(C, { class: "operates-dropdown-menu" }, {
                            default: c(() => [
                              e.canEdit(S.row) ? (d(), f(g, { key: 0 }, {
                                default: c(() => [
                                  I((d(), f(F, _({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    class: "x-table-edit",
                                    onClick: (Y) => e._emit("edit", S)
                                  }), {
                                    default: c(() => [
                                      x($(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [B, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canSave(S.row) ? (d(), f(g, { key: 1 }, {
                                default: c(() => [
                                  I((d(), f(F, _({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: S.row._loading,
                                    icon: "collection",
                                    class: "x-table-row-edit",
                                    onClick: (Y) => e._emit("row-edit", S)
                                  }), {
                                    default: c(() => [
                                      x($(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [se, S.row._loading],
                                    [B, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canCancelEdit(S.row) ? (d(), f(g, { key: 2 }, {
                                default: c(() => [
                                  I((d(), f(F, _({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    class: "x-table-cancel-edit",
                                    onClick: (Y) => e._emit("cancel-edit", S)
                                  }), {
                                    default: c(() => [
                                      x($(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [B, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canDelete(S.row) ? (d(), f(g, { key: 3 }, {
                                default: c(() => [
                                  I((d(), f(F, _({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    class: "x-table-delete",
                                    onClick: (Y) => e._emit("delete", S)
                                  }), {
                                    default: c(() => [
                                      x($(e._attrs["delete-btn-text"] ?? "删除"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [B, e.domids.delete]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: c(() => [
                          I((d(), f(F, _({ type: "primary", ...e._attrs["operates-btn"] }, {
                            icon: "arrow-down",
                            class: "x-table-operates"
                          }), {
                            default: c(() => [
                              x($(e._attrs["operates-btn-text"] ?? "操作"), 1)
                            ]),
                            _: 1
                          }, 16)), [
                            [B, e.domids.operates]
                          ])
                        ]),
                        _: 2
                      }, 1024)) : k("", !0),
                      !e.operatesDropdown && e.canEdit(S.row) ? I((d(), f(F, _({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        class: "x-table-edit",
                        onClick: (Y) => e._emit("edit", S)
                      }), {
                        default: c(() => [
                          x($(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [B, e.domids.edit]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canSave(S.row) ? I((d(), f(F, _({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: S.row._loading,
                        icon: "collection",
                        class: "x-table-row-edit",
                        onClick: (Y) => e._emit("row-edit", S)
                      }), {
                        default: c(() => [
                          x($(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [se, S.row._loading],
                        [B, e.domids["row-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canCancelEdit(S.row) ? I((d(), f(F, _({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        class: "x-table-cancel-edit",
                        onClick: (Y) => e._emit("cancel-edit", S)
                      }), {
                        default: c(() => [
                          x($(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [B, e.domids["cancel-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canDelete(S.row) ? I((d(), f(F, _({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        class: "x-table-delete",
                        onClick: (Y) => e._emit("delete", S)
                      }), {
                        default: c(() => [
                          x($(e._attrs["delete-btn-text"] ?? "删除"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [B, e.domids.delete]
                      ]) : k("", !0),
                      E(e.$slots, "operates-suffix", { scope: S })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["infinite-scroll-disabled", "onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [se, e._loading],
                [be, e._onLoad]
              ]),
              e._query && e._total && !e.hidePagination ? (d(), f(H, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: i.onPaging
              }, null, 8, ["query", "total", "onSearch"])) : k("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? k("", !0) : (d(), f(U, {
      key: 0,
      modelValue: l.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (S) => l.dialog.visible = S),
      title: "图表",
      width: "96%",
      onFullscreenchange: i.handleChartDialogFullscreen
    }, {
      default: c(() => [
        p(D, {
          ref: "chartRef",
          height: e._chartHeight,
          option: e._chartOption,
          datasource: { columns: e._columns, search: i.search }
        }, null, 8, ["height", "option", "datasource"])
      ]),
      _: 1
    }, 8, ["modelValue", "onFullscreenchange"]))
  ], 64);
}
const ha = /* @__PURE__ */ O(la, [["render", ua]]), ma = {
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
}, pa = { class: "mobile-x-table-tools" }, fa = { key: 0 }, ga = { class: "tools" }, ba = { class: "tools-end" };
function _a(e, t, s, n, l, i) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), h = Q("domid");
  return d(), w("div", pa, [
    e.$attrs.onAdd ? I((d(), w("div", fa, [
      p(o, {
        axis: "xy",
        magnetic: "x",
        icon: "plus",
        class: "flex-center x-table-search",
        style: { position: "fixed", top: "0", "font-size": "22px", width: "40px", height: "40px", "background-color": "#1989fa", "border-radius": "50%", color: "white" },
        onClick: t[0] || (t[0] = (m) => e.$emit("add"))
      })
    ])), [
      [h, s.domids.add]
    ]) : k("", !0),
    j("div", ga, [
      E(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? I((d(), f(r, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        class: "x-table-search",
        onClick: t[1] || (t[1] = (m) => e.$emit("search"))
      }), {
        default: c(() => [
          p(a, { name: "search" }),
          x(" 高级查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : k("", !0),
      e.$attrs.onMultiEdit ? I((d(), f(r, _({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        class: "x-table-edit",
        onClick: t[2] || (t[2] = (m) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          p(a, { name: "edit" }),
          x(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : k("", !0),
      e.$attrs.onMultiDelete ? I((d(), f(r, _({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        class: "x-table-multi-delete",
        onClick: t[3] || (t[3] = (m) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          p(a, { name: "DeleteFilled" }),
          x(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : k("", !0),
      e.$attrs.onExport ? I((d(), f(r, _({ key: 3 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-export",
        onClick: t[4] || (t[4] = (m) => e.$emit("export"))
      }), {
        default: c(() => [
          p(a, { name: "printer" }),
          x(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : k("", !0),
      e.$attrs.onSearchExport ? I((d(), f(r, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-search-export",
        onClick: t[5] || (t[5] = (m) => e.$emit("search-export"))
      }), {
        default: c(() => [
          p(a, { name: "printer" }),
          x(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : k("", !0),
      e.$attrs.onImport ? I((d(), f(r, _({ key: 5 }, { type: "warning", ...s.importBtn }, {
        class: "x-table-import",
        onClick: t[6] || (t[6] = (m) => e.$emit("import"))
      }), {
        default: c(() => [
          p(a, { name: "UploadFilled" }),
          x(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : k("", !0),
      E(e.$slots, "tools-suffix", {}, void 0, !0),
      j("div", ba, [
        E(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const ya = /* @__PURE__ */ O(ma, [["render", _a], ["__scopeId", "data-v-dda9e446"]]), va = {
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
  },
  data() {
    return {
      keywords: ""
    };
  }
}, wa = { class: "tools" }, Sa = { class: "tools-end flex-center" };
function ka(e, t, s, n, l, i) {
  const o = u("el-input"), a = u("el-button"), r = u("el-card"), h = Q("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      j("div", wa, [
        E(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onKeywordsSearch ? I((d(), f(o, {
          key: 0,
          modelValue: l.keywords,
          "onUpdate:modelValue": t[0] || (t[0] = (m) => l.keywords = m),
          placeholder: e.$attrs["keywords-placeholder"] || "输入关键词搜索",
          clearable: "",
          class: "keywords-search",
          onKeyup: t[1] || (t[1] = Re((m) => e.$emit("keywords-search", l.keywords.trim()), ["enter"]))
        }, null, 8, ["modelValue", "placeholder"])), [
          [h, s.domids["keywords-search"]]
        ]) : k("", !0),
        e.$attrs.onSearch ? I((d(), f(a, _({ key: 1 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          class: "x-table-search",
          onClick: t[2] || (t[2] = (m) => e.$emit("search"))
        }), {
          default: c(() => [
            x($(e.$attrs["search-btn-text"] ?? "高级查询"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : k("", !0),
        e.$attrs.onAdd ? I((d(), f(a, _({ key: 2 }, { type: "primary", ...s.addBtn }, {
          icon: "circle-plus-filled",
          class: "x-table-add",
          onClick: t[3] || (t[3] = (m) => e.$emit("add"))
        }), {
          default: c(() => [
            x($(e.$attrs["add-btn-text"] ?? "新增"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : k("", !0),
        e.$attrs.onMultiEdit ? I((d(), f(a, _({ key: 3 }, { type: "warning", ...s.multiEditBtn }, {
          icon: "edit",
          class: "x-table-edit",
          onClick: t[4] || (t[4] = (m) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            x($(e.$attrs["edit-btn-text"] ?? "编辑"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : k("", !0),
        e.$attrs.onMultiDelete ? I((d(), f(a, _({ key: 4 }, { type: "danger", ...s.multiDeleteBtn }, {
          icon: "DeleteFilled",
          class: "x-table-multi-delete",
          onClick: t[5] || (t[5] = (m) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            x($(e.$attrs["multi-delete-btn-text"] ?? "批量删除"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : k("", !0),
        e.$attrs.onExport ? I((d(), f(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-export",
          onClick: t[6] || (t[6] = (m) => e.$emit("export"))
        }), {
          default: c(() => [
            x($(e.$attrs["export-btn-text"] ?? "导出"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : k("", !0),
        e.$attrs.onSearchExport ? I((d(), f(a, _({ key: 6 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-search-export",
          onClick: t[7] || (t[7] = (m) => e.$emit("search-export"))
        }), {
          default: c(() => [
            x($(e.$attrs["search-export-btn-text"] ?? "查询导出"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : k("", !0),
        e.$attrs.onImport ? I((d(), f(a, _({ key: 7 }, { type: "warning", ...s.importBtn }, {
          icon: "UploadFilled",
          class: "x-table-import",
          onClick: t[8] || (t[8] = (m) => e.$emit("import"))
        }), {
          default: c(() => [
            x($(e.$attrs["import-btn-text"] ?? "导入"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : k("", !0),
        E(e.$slots, "tools-suffix", {}, void 0, !0),
        j("div", Sa, [
          E(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const $a = /* @__PURE__ */ O(va, [["render", ka], ["__scopeId", "data-v-3d6b703b"]]);
function _t(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !nt(e);
}
const Ca = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, n = (l) => {
    l ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const i = l ? e._data.slice() : [];
    e.handleSelectionChange(i);
  };
  return p(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: n
  }, null);
}, xa = (e, t) => {
  const {
    rowIndex: s,
    rowData: n
  } = e, l = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const i = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(i);
  };
  return p(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: l
  }, null);
}, Va = (e, t) => {
  const {
    page: s,
    limit: n
  } = t._query;
  return (s - 1) * n + e.rowIndex + 1;
}, Ea = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return p("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, ge = ([e, t, s, n, l, i]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return p(u("el-button"), _({
    type: n
  }, t._attrs[s + "-btn"], {
    icon: l,
    onClick: r
  }), _t(i) ? i : {
    default: () => [i]
  });
}, Aa = (e, t) => {
  if (t.canEdit(e.rowData))
    return ge([e, t, "edit", "warning", "edit", "编辑"]);
}, Oa = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return ge([e, t, "row-edit", "success", "collection", "保存"]);
}, ja = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return ge([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Fa = (e, t) => {
  if (t.canDelete(e.rowData))
    return ge([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Ta = (e, t) => {
  const {
    _attrs: s,
    $slots: n
  } = t, {
    slotRenderers: l = {}
  } = s;
  if (e.type === "selection")
    return (i) => xa(i, t);
  if (e.type === "index")
    return (i) => Va(i, t);
  if (e.type === "radio")
    return (i) => Ea(i, t);
  if (e.slot) {
    if (l[e.slot])
      return l[e.slot];
    if (n[e.slot])
      return (i) => n[e.slot]({
        scope: {
          $index: i.rowIndex,
          row: i.rowData
        },
        column: e
      });
  } else if (t.slotAll)
    return (i) => n.all({
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
      const m = (b) => {
        o[a.prop] = b;
      }, v = a.comp || "ElInput";
      return te(u(v), {
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
    return h ? p(u("el-tooltip"), {
      content: r
    }, _t(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Da = (e, t) => {
  const {
    _attrs: s,
    $slots: n
  } = t, l = e.map((i, o) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Ca(t)), r.cellRenderer = Ta(r, t), r;
  });
  return t.hideOperates || l.push({
    key: l.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 150,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(i) {
      return p("div", {
        class: "operates"
      }, [n["operates-prefix"] ? n["operates-prefix"]() : null, Aa(i, t), Oa(i, t), ja(i, t), Fa(i, t), n["operates-suffix"] ? n["operates-suffix"]() : null]);
    }
  }), l;
}, Ra = {
  convertColumnsForTableV2: Da
}, Ia = {
  name: "XTableV2",
  props: {
    ...X.props(),
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
    ...X.emits()
  ],
  components: { Searcher: Le, Settings: bt },
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
    ...X.computed
  },
  watch: {
    ...X.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...X.methods,
    convertColumnsForTableV2: Ra.convertColumnsForTableV2
  }
}, Pa = { key: 1 };
function Ba(e, t, s, n, l, i) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), m = u("el-table-v2"), v = u("el-auto-resizer"), b = u("x-pagination"), y = u("el-collapse-item"), V = u("el-collapse"), F = Q("loading");
  return d(), w("div", {
    class: J(["pc-x-table-v2", { fullscreen: l.isFullscreen }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (g) => e._emit("search", g))
    }, null, 8, ["uid", "columns", "config"]),
    p(V, {
      modelValue: l.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (g) => l.activeNames = g),
      class: J((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        p(y, {
          name: l.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? E(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", Pa, $(e.title), 1))
          ]),
          default: c(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(h, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiDelete: e._onMultiDelete
            }), oe({
              "tools-end": c(() => [
                p(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                p(r, {
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
                  E(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  E(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
            p(v, {
              style: vt({ height: s.height })
            }, {
              default: c(({ width: g, height: C }) => [
                I((d(), f(m, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: g,
                  height: C
                }), oe({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: c(() => [
                      E(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: c(() => [
                      E(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: c(() => [
                      E(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [F, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(b, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (g) => e._emit("search"))
            }, null, 8, ["query", "total"])) : k("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const Ma = /* @__PURE__ */ O(Ia, [["render", Ba]]), Se = ["selection", "radio"], Na = {
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
      Se.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !Se.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (Se.includes(t)) {
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
}, La = { class: "x-table-viewer" };
function Ua(e, t, s, n, l, i) {
  const o = u("x-dialog");
  return d(), w("div", La, [
    p(o, _(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: c(() => [
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
const qa = /* @__PURE__ */ O(Na, [["render", Ua], ["__scopeId", "data-v-e6f36700"]]), Xa = {
  name: "MobileXTags",
  props: {
    data: Array,
    text: {
      type: String,
      default: "text"
    }
  },
  emits: ["close"],
  computed: {
    _data() {
      var e;
      return (e = this.data) != null && e.length ? this.data.map((t) => typeof t == "object" ? t : { text: t }) : [];
    }
  }
}, za = { class: "mobile-x-tags" };
function Wa(e, t, s, n, l, i) {
  const o = u("van-tag");
  return d(), w("div", za, [
    (d(!0), w(P, null, M(i._data, (a, r) => (d(), f(o, _({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        x($(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Ha = /* @__PURE__ */ O(Xa, [["render", Wa], ["__scopeId", "data-v-d8beefdf"]]), Ka = {
  name: "PcXTags",
  props: {
    data: Array,
    text: {
      type: String,
      default: "text"
    }
  },
  emits: ["close"],
  computed: {
    _data() {
      var e;
      return (e = this.data) != null && e.length ? this.data.map((t) => typeof t == "object" ? t : { text: t }) : [];
    }
  }
}, Ja = { class: "pc-x-tags" };
function Ya(e, t, s, n, l, i) {
  const o = u("el-tag");
  return d(), w("div", Ja, [
    (d(!0), w(P, null, M(i._data, (a, r) => (d(), f(o, _({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        x($(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Ga = /* @__PURE__ */ O(Ka, [["render", Ya], ["__scopeId", "data-v-bd702be1"]]), Qa = {
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
}, Za = { class: "x-tinymce" }, eo = ["id", "innerHTML"];
function to(e, t, s, n, l, i) {
  return d(), w("div", Za, [
    j("textarea", {
      id: l.id,
      innerHTML: s.modelValue
    }, null, 8, eo)
  ]);
}
const so = /* @__PURE__ */ O(Qa, [["render", to]]), no = {
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
      const n = ((l = this.service) == null ? void 0 : l.API_BASE_URL) + "/" + e.filename;
      this.$emit("update:modelValue", n);
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
        const n = (this.baseURL || this.service.API_BASE_URL) + "/";
        s = s.map((l) => n + l), this.$emit("update:modelValue", s);
      } catch (t) {
        return this.$message.error(t.toString());
      }
    }
  }
}, Ue = (e) => (Fe("data-v-a3a105f3"), e = e(), Te(), e), io = { class: "mask" }, lo = {
  key: 0,
  class: "el-upload__text"
}, ao = /* @__PURE__ */ Ue(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), oo = /* @__PURE__ */ Ue(() => /* @__PURE__ */ j("br", null, null, -1)), ro = /* @__PURE__ */ Ue(() => /* @__PURE__ */ j("br", null, null, -1)), co = {
  key: 0,
  class: "path"
};
function uo(e, t, s, n, l, i) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), f(r, _({
    "file-list": l.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (h) => l.fileList = h),
    drag: "",
    disabled: l.disabled,
    action: i.actionUrl,
    accept: s.accept,
    multiple: s.multiple,
    "on-success": i.onSuccess,
    "auto-upload": !1,
    class: "x-file-uploader"
  }, e.$attrs), {
    default: c(() => [
      j("div", io, [
        p(o, { name: "upload-filled" }),
        l.disabled ? k("", !0) : (d(), w("div", lo, [
          x(" 将文件拖到此处，或"),
          ao,
          oo,
          ro,
          s.needUpload && !l.disabled && l.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: G(i.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              x(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : k("", !0)
        ]))
      ]),
      i.filepath ? (d(), w("div", co, $(s.modelValue), 1)) : k("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const ho = /* @__PURE__ */ O(no, [["render", uo], ["__scopeId", "data-v-a3a105f3"]]), mo = {
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
      q({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, po = ["src"];
function fo(e, t, s, n, l, i) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("x-dialog");
  return d(), w(P, null, [
    p(r, _({
      "file-list": l.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (m) => l.fileList = m),
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
        p(a, null, {
          default: c(() => [
            p(o)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "onUpdate:fileList", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload", "on-remove"]),
    p(h, {
      modelValue: l.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (m) => l.dialogVisible = m),
      actionsheet: "",
      title: "预览图片" + (l.previewingImage.name || "")
    }, {
      default: c(() => [
        j("img", {
          src: l.previewingImage.url,
          alt: "previewing-image",
          class: "previewing-image"
        }, null, 8, po)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const go = /* @__PURE__ */ O(mo, [["render", fo], ["__scopeId", "data-v-0afe3ea6"]]), ke = {
  xarray: Kt,
  xautorows: Zt,
  mobilexbutton: ss,
  pcxbutton: ls,
  xchart: fs,
  mobilexcheckboxs: _s,
  pcxcheckboxs: Ss,
  mobilexcol: Cs,
  pcxcol: Es,
  mobilexdialog: Ts,
  pcxdialog: Ps,
  xdict: Ls,
  xdistrictselect: Xs,
  mobilexform: en,
  pcxform: ln,
  mobilexformitem: dn,
  pcxformitem: cn,
  mobilexicon: pn,
  pcxicon: _n,
  xinfo: Ri,
  xlooper: Mi,
  mobilexpagination: Ui,
  pcxpagination: zi,
  xpicker: Ki,
  mobilexradios: Gi,
  pcxradios: tl,
  mobilexrow: ll,
  pcxrow: dl,
  mobilexscan: hl,
  pcxscan: fl,
  mobilexselect: _l,
  pcxselect: $l,
  xselectv2: Ol,
  mobilextable: Kl,
  pcxtable: ha,
  mobilextabletools: ya,
  pcxtabletools: $a,
  xtablev2: Ma,
  xtableviewer: qa,
  mobilextags: Ha,
  pcxtags: Ga,
  xtinymce: so,
  xfileuploader: ho,
  ximageuploader: go
}, re = {};
for (let e in ke)
  re[ke[e].name] = ke[e];
const { ElInfiniteScroll: tt } = window.ElementPlus || {}, he = ".el-scrollbar__wrap", st = (e, t) => {
  bo(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", n = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (n < 1 ? 1 : n) + "");
}, bo = (e, t, s) => {
  let n;
  s.forEach((l) => {
    n = e.getAttribute(l), n !== null ? t.setAttribute(l, n) : t.removeAttribute(l);
  });
}, _o = {
  name: "el-table-infinite-scroll",
  mounted(e, t, s, n) {
    const l = e.querySelector(he);
    if (!l)
      throw new Error(`${he} element not found.`);
    l.style.overflowY = "auto", setTimeout(() => {
      !e.style.height && !e.style.maxHeight && (l.style.height = "400px", console.warn("el-table height required, otherwise will set scrollbar default height: 400px")), st(e, l), tt.mounted(l, t, s, n);
    }, 0);
  },
  updated(e) {
    st(e, e.querySelector(he));
  },
  unmounted(e, ...t) {
    const s = e.querySelector(he);
    tt.unmounted(s, ...t);
  }
}, $e = {
  ElTableInfiniteScroll: _o
}, yo = (e) => ({
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
    return te(re[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), Ae = (() => {
  const e = Object.keys(re), t = [...new Set(e.map((n) => n.replace(/(pc|mobile)/i, "")))], s = {};
  for (const n of e)
    /(pc|mobile)/i.test(n) && (s[n] = re[n]);
  for (const n of t)
    e.find((l) => /(pc|mobile)/i.test(l) && l.toLowerCase().includes(n.toLowerCase())) ? s[n] = yo(n) : s[n] = re[n];
  return s;
})(), vo = (e, t) => {
  for (let s in Ae)
    e.component(s, Ae[s]);
  for (let s in $e)
    e.directive($e[s].name, $e[s]);
}, So = {
  version: "1.5.67",
  ...Ae,
  ...ht,
  ...Ut,
  install: vo
};
export {
  mt as BaseController,
  Z as Confirm,
  pt as CrudController,
  q as Message,
  me as Notify,
  Lt as TempCrudController,
  pe as baseDialog,
  de as baseForm,
  It as baseModel,
  lt as baseTable,
  Ut as controllers,
  So as default,
  kt as effects,
  W as formatOptions,
  $t as formatPrecision,
  dt as initDefaultForm,
  ot as initDialog,
  Pt as initFields,
  ce as initForm,
  rt as initFormRules,
  Bt as initModel,
  at as initTable,
  ct as isWhenMatched,
  ut as triggers,
  ht as utils,
  it as validateForm
};
