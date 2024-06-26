import { toRaw as $t, markRaw as se, nextTick as ie, watch as Fe, resolveComponent as u, openBlock as d, createElementBlock as y, createElementVNode as j, createVNode as m, withCtx as c, createTextVNode as x, Fragment as I, renderList as R, mergeProps as _, createBlock as f, renderSlot as V, toDisplayString as C, useCssVars as De, resolveDirective as G, withDirectives as F, createCommentVNode as k, vShow as Xe, pushScopeId as Ie, popScopeId as Re, resolveDynamicComponent as Z, createSlots as oe, withModifiers as Y, normalizeClass as J, h as ee, isVNode as ot, normalizeProps as Ct, withKeys as Pe, normalizeStyle as xt } from "vue";
const Vt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class n {
    constructor(B, z, W, q, ae, _e, w) {
      this.x = B, this.y = z, this.radius = W, this.color = q, this.vx = ae, this.vy = _e, this.ctx = w;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => l.clearRect(0, 0, t, s), o = (D) => Math.floor(Math.random() * D);
  let a = 0, r = 0.01, h = 0;
  const p = () => {
    const D = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    h ? h-- : (a += r, a <= 0 && (a = 0, r = -r, h = g * 30), a >= 1 && (a = 1, r = -r, h = g * 30)), D.addColorStop(0, "rgba(250, 220, 20, 0.5)"), D.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = D, l.fillRect(0, 0, t, s);
  }, S = Math.floor(t / 100), b = Math.floor(s / 100), g = 20, A = Math.round(1e3 / g), T = Array.from({ length: 52 }).map(() => {
    const D = Math.floor(o(S + b) * 1.5 + o(5));
    let B = o(t), z = o(s);
    B = Math.min(Math.max(D, B), t - D), z = Math.min(Math.max(D, z), s - D);
    let W = o(2) ? (o(2) + 2) * S : (o(-1) - 2) * S, q = o(2) ? (o(2) + 2) * b : (o(-1) - 2) * b;
    return W = Math.floor(W / g), q = Math.floor(q / g), new n(
      B,
      z,
      D,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      W,
      q,
      l
    );
  });
  let $, E;
  e.addEventListener("mouseover", (D) => {
    $ = D.pageX, E = D.pageY;
  }), e.addEventListener("mousemove", (D) => {
    if ($ === void 0) {
      $ = D.pageX, E = D.pageY;
      return;
    }
    const B = D.pageX - $, z = D.pageY - E;
    T.forEach((W) => {
      W.x += B / g, W.y += z / g;
    }), $ = D.pageX, E = D.pageY;
  });
  let v = Date.now(), L = null;
  const ne = () => {
    Date.now() - v >= A && (i(), p(), T.forEach((D) => D.update()), v = Date.now()), L = requestAnimationFrame(ne);
  };
  return L = requestAnimationFrame(ne), () => cancelAnimationFrame(L);
}, Et = ({
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
  const p = r.measureText(e).width + t, S = s + t;
  for (let b = t / 2; b < i; b += S)
    for (let g = t / 2; g < n; g += p)
      r[o + "Text"](e, g, b);
  return a;
}, At = {
  pop: Vt,
  createWatermark: Et
}, at = async (e) => {
  var l, n;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((i) => {
    var o, a;
    return ((o = i.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = i.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((i) => at(i.form)));
  return t && s.every((i) => i);
}, Ot = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, X = (e, t) => {
  const s = e.__v_isRef ? e.value : $t(e), { text: l = "text", value: n = "value" } = t, i = s.map((a) => typeof a == "object" ? { text: a[l], value: a[n], disabled: a.disabled, raw: se(a) } : { text: a, value: a });
  if (!t.sort)
    return i;
  const o = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((a, r) => a[o].localeCompare(r[o]));
}, { ElMessage: jt, ElNotification: Tt, ElMessageBox: rt } = window.ElementPlus || {}, { showToast: Ft, showNotify: Dt, showConfirmDialog: It } = window.vant || {}, N = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? ((l === "error" || l === "warning") && (t.type = "fail"), t["z-index"] || (t["z-index"] = 1e6), Ft(t)) : jt({
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
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? (l === "error" && (t.type = "danger"), Dt(t)) : Tt({
    showClose: !0,
    ...t
  });
}, Q = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = It(e) : t = rt.confirm(
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
}, Rt = (e) => {
  if (isMobile)
    throw "暂不支持移动端 Prompt";
  return rt.prompt(e.message, e.title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPattern: /\w+/,
    inputErrorMessage: "请输入",
    ...e
  }).then(({ value: t }) => t).catch(() => "");
};
for (let e of ["success", "warning", "info", "error", "primary", "loading", "fail", "html"])
  N[e] = N[e[0]] = (t) => N({ type: e, ...typeof t != "string" ? t : { message: t } }), me[e] = me[e[0]] = (t) => me({ type: e, ...typeof t != "string" ? t : { message: t } }), Q[e] = Q[e[0]] = (t) => Q({ type: e, ...t });
const { funcs: Pt } = StardustJs, Mt = (e, t, s) => {
  e.beforeEach(async (l, n) => !!l.matched.length || "/404");
}, Bt = (e, t, s) => {
  e.afterEach((l, n) => {
    var i;
    document.title = ((i = l.matched[l.matched.length - 1].meta) == null ? void 0 : i.title) || t.app.sitename;
  });
}, Lt = (e, t, s) => {
  e.beforeEach(async (l, n) => {
    var a;
    const i = l.matched[l.matched.length - 1].path.split("/:")[0];
    if (l.meta.acl === !1 || (a = l.meta) != null && a.visitable)
      return !0;
    for (; t.getters.logging; )
      await Pt.sleep(20);
    if (await ie(), t.acl.paths.includes(i))
      return !0;
    const o = { redirectTo: l.path, ...l.query };
    return t.getters.logined && (o.error = "受限于您的账号权限，暂时无法访问 " + l.path + " 页面，如有需要请联系我们", N({ message: o.error, duration: 1e4 })), { path: t.acl.paths[0] || "/404", query: o };
  }), ie(() => {
    let l = !1;
    Fe(() => t.acl.menus, (n) => {
      if (!l) {
        if (!n.length)
          return;
        l = !0;
      }
      const i = t.acl.paths, o = (a, r) => {
        var p, S, b, g, A, T, $;
        let h;
        a.redirect && !a.component ? h = a.redirect : h = [...r, a].reduce((E, v) => E + "/" + v.path, "").replace("//", "/"), a.meta || (a.meta = {}), a.meta.acl === !1 ? (p = a.children) == null || p.forEach((E) => {
          var v;
          E.meta || (E.meta = {}), (v = E.meta).acl || (v.acl = !1), o(E, [...r, a]);
        }) : (a.meta._hidden = a.meta.hidden, parent && (a.meta.hidden == null && ((b = a.meta).hidden ?? (b.hidden = (S = parent.meta) == null ? void 0 : S.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((A = a.meta).visitable ?? (A.visitable = (g = parent.meta) == null ? void 0 : g.visitable), a.meta = { ...a.meta })), (T = a.children) == null || T.forEach((E) => o(E, [...r, a])), a.meta.hidden !== !1 && a.meta._hidden !== !0 && (a.meta.hidden = !i.includes(h), ($ = a.children) != null && $.some((E) => E.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach((a) => o(a, []));
    }, { immediate: !0 });
  });
}, Nt = {
  check404: Mt,
  setTitle: Bt,
  checkRolesPages: Lt
}, de = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), dt = (e = {}) => ({
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
}), fe = () => ({
  ...de(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), Ut = ({
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
    ...dt(l),
    ...e,
    columns: s
  },
  dialog: {
    ...fe(),
    ...t,
    form: n
  }
}), { funcs: Ee } = StardustJs, qt = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let l of s)
    l.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[l.slice(3)] = t[l], delete t[l]) : l.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[l.slice(3)] = t[l], delete t[l]);
  return t;
}), zt = (e, t) => {
  for (let s in e) {
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && ct(l, t), s === "dialog" && e[s]._isBaseDialog && ut(l, t), s === "form" && e[s]._isBaseForm && ce(l, t));
  }
  return e;
}, ct = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), ut = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), ce(e, t), e), ce = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), pt(e.form, e.formItems), e.initialForm = Ee.deepCopy(e.form), e.initialFormRules = Ee.deepCopy(e.formRules), Fe(() => e.formItems, () => {
  ht(e);
}, { immediate: !0, deep: !0 }), e), ht = (e) => {
  const { formItems: t, initialFormRules: s } = e, l = t.filter((i) => {
    let { formAttrs: o = {}, required: a = !1 } = i;
    return a = "required" in o ? o.required : a, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && a !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, Ee.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !l.length)
    return;
  const n = {};
  return l.forEach((i) => {
    if (e.formRules[i])
      return;
    const o = t.find((g) => g.prop === i), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = ft[a], h = [], p = "options" in o, b = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${p ? "选择" : "输入"}${(o == null ? void 0 : o.label) || i}` };
    o.validator && (b.validator = (g, A) => a === "pc" ? o.validator(g, A) : o.validator(A, g)), o.asyncValidator && (b.asyncValidator = (g, A) => a === "pc" ? o.asyncValidator(g, A) : o.asyncValidator(A, g)), o.comp ? h.push({ ...b, trigger: r.change }) : h.push({ ...b, trigger: r.blur }), o.comp === "ElInputNumber" && h.push({ ...b, trigger: r.blur }), n[i] = h;
  }), Object.assign(e.formRules, n), e.formRules;
}, pt = (e, t, s = !0) => {
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
      const S = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[n.type];
      n["start-placeholder"] || (n["start-placeholder"] = "开始" + S), n["end-placeholder"] || (n["end-placeholder"] = "结束" + S), i = [];
    }
    l[n.prop] = i;
  }), Object.assign(e, { ...l, ...e }), e;
}, mt = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [l, n] = e.split(s);
  n = n.split("|");
  let i = t[l];
  typeof i == "number" ? i += "" : typeof i == "string" && (i = i.trim());
  const o = e.match(s)[0];
  return n.some((a) => o === "^=" ? i.startsWith(a) : o === "*=" ? i.includes(a) : o === "$=" ? i.endsWith(a) : o === "~=" ? !i.includes(a) : o === "!=" ? i !== a : a === i);
}, ft = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, gt = {
  effects: At,
  validateForm: at,
  formatPrecision: Ot,
  formatOptions: X,
  Message: N,
  Notify: me,
  Confirm: Q,
  Prompt: Rt,
  middlewares: Nt,
  baseForm: de,
  baseTable: dt,
  baseDialog: fe,
  baseModel: Ut,
  initFields: qt,
  initModel: zt,
  initTable: ct,
  initDialog: ut,
  initForm: ce,
  initFormRules: ht,
  initDefaultForm: pt,
  isWhenMatched: mt,
  triggers: ft
}, { funcs: ve, highdict: Xt, dates: Wt } = window.StardustJs, { storage: we } = window.StardustBrowser, Ht = [
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
];
class bt {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const l = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => l }
      }), this._initLifeHooks();
    }
    ie(this.onInit);
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
    return gt;
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
    return Wt;
  }
  get $highdict() {
    return Xt;
  }
  get $copy() {
    return ve.deepCopy;
  }
  get $sleep() {
    return ve.sleep;
  }
  get $storage() {
    return we;
  }
  get $local() {
    return we.local;
  }
  get $session() {
    return we.session;
  }
  _bindMethods() {
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.getOwnPropertyDescriptors(this.__proto__), l = Object.keys(s).filter((o) => o !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...l])).filter((o) => typeof this[o] == "function").forEach((o) => {
      this[o] = this[o].bind(this);
    });
  }
  _initLifeHooks() {
    Ht.forEach((t) => {
      this[t] && this.vue[t](this[t]);
    });
  }
  _evalAction() {
    var n;
    const { _action_: t, _action_params_: s, ...l } = this.query;
    t && this[t] && ((n = this[t]) == null || n.call(this, JSON.parse(s || "{}")), this.router.replace(this.route.path + "?" + ve.encodeQuery(l)));
  }
  _getMethods() {
    return [
      "_bindMethods",
      "_initLifeHooks",
      "_evalAction",
      "_getMethods",
      "onInit"
    ];
  }
}
const { funcs: We, highdict: Se, dates: ke } = StardustJs, { file: He, excel: ue } = StardustBrowser;
class _t extends bt {
  constructor(t) {
    super(t);
    const { model: s, table: l, dialog: n, dbModelName: i = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = l || (s == null ? void 0 : s.table), this.dialog = n || (s == null ? void 0 : s.dialog), this.dbModelName = i, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], ie(() => {
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
    var t, s, l, n;
    if ((t = this.model) != null && t.form && ((s = this.dialog) != null && s.form))
      throw "conflict of model.form and dialog.form";
    return ((l = this.model) == null ? void 0 : l.form) || ((n = this.dialog) == null ? void 0 : n.form);
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
      "formatList",
      "processExportingColumns",
      "processExportingData",
      "processExporting",
      "processImportingData",
      "_defaultFormatList",
      "_fillRelatedField",
      "_resetForm",
      "_clearValidate",
      "_trimForm",
      "_validateForm",
      "_checkAllNone",
      "_showError",
      "_focusDialogInput"
    ];
  }
  onInit() {
    super.onInit(), this.table && this.handleSearch();
  }
  async handleKeywordsSearch(t) {
    if (this._lastSearchParams = null, t = t.replace(/,/g, " ").split(" ").filter((i) => i), !t.length)
      return this.handleSearch();
    let { searchFields: s, columns: l } = this.table;
    if (s.length || (s = [...new Set(l.filter((i) => typeof i.canSearch == "boolean" ? i.canSearch : i.prop && i.type !== "number" && !i.comp && !i.virtual).map((i) => i.prop))]), !s.length)
      return this.handleSearch();
    const n = [];
    return s.forEach((i) => {
      t.forEach((o) => {
        n.push({ [i]: { "[Op.like]": "%" + o + "%" } });
      });
    }), this.handleSearch({ where: { "[Op.or]": n } });
  }
  async handleSearch(t, { isInfinite: s = !1 } = {}) {
    if (t instanceof Event && (t = null), this.table.isInfinite = s, this.table.loading || !await this.beforeSearch(t))
      return;
    t = this.getSearchParams(t), this.injectSearchParams(t), this.table.loading = !0;
    const l = await this.search(t);
    let n = Se.get(l, this.listProp);
    return n = this.formatList(this._defaultFormatList(n, l), l), Object.assign(this.table, {
      list: n,
      total: l.total,
      loading: !1
    }), this.afterSearch(n, t, l), l;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await ie(), await We.sleep(50), this._clearValidate(), this._focusDialogInput(), this.afterAdd());
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
    }), await ie(), (l = this.dialog.formRef) == null || l.validate().catch(Function()), this._focusDialogInput()), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (this.table.loading || !await this.beforeDelete({ $index: t, row: s }) || !await Q.w({ message: "确定要删除吗？", title: "警告" }))
      return;
    this.table.loading = !0;
    const n = this.getDeleteParams(s);
    this.injectDeleteParams(n);
    const i = await this.remove(n, s);
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
    } catch (l) {
      this._showError(l.data.err), t._loading = !1;
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
      N("不支持的导出类型");
      return;
    }
    this.table.loading = !0;
    const { list: l, selection: n, ref: i } = this.table;
    let o = n.length > 0 ? n : l;
    o = We.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(i._visibleColumns, "current"), r = a.map((b) => b.prop), h = a.map((b) => b.label);
    o = o.map((b) => r.map((g) => b[g]));
    let p = null;
    t === "csv" ? p = ue.export2Csv : p = ue.export2Excel;
    let S = { list: l, header: h, data: o, filename: s };
    S = await this.processExporting(S), p(S), this.table.loading = !1;
  }
  async handleSearchExport(t = this.exportType, s) {
    if (s || (s = this.table.ref.title || document.title), this.table.loading) {
      N.w("导出中...");
      return;
    }
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      N("不支持的导出类型");
      return;
    }
    this.table.loading = !0;
    const l = await this.dbTable.search(this.getSearchExportParams());
    let n = l.data;
    n = this.formatList(n, l), n = this.processExportingData(n, "search");
    const i = this.processExportingColumns(this.table.ref._visibleColumns, "search-export"), o = i.map((p) => p.prop), a = i.map((p) => p.label);
    n = n.map((p) => o.map((S) => p[S]));
    let r = null;
    t === "csv" ? r = ue.export2Csv : r = ue.export2Excel;
    let h = { list: l.data, header: a, data: n, filename: s };
    h = await this.processExporting(h), r(h), this.table.loading = !1;
  }
  async handleImport() {
    var i, o;
    if (this.table.loading)
      return;
    const t = await He.select(".xlsx,.csv");
    this.table.loading = !0;
    const s = t.name.toLowerCase().endsWith(".csv"), l = await He.toType(t, s ? "text" : "arraybuffer");
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
        return r.forEach((S) => p[a[S]] = h[S]), p;
      });
    }
    n = this.processImportingData(n), await this.dbTable.func(["bulkCreate", n]), N.s("导入成功"), this.table.loading = !1, this.handleSearch();
  }
  async handleMultiDelete() {
    if (this.table.loading)
      return;
    const { selection: t } = this.table;
    if (!t.length) {
      N.w("尚未选择要删除的数据");
      return;
    }
    if (!await Q.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
      return;
    this.table.loading = !0;
    const l = t.map((n) => n[this.idField]);
    await this.dbTable.func(["destroy", {
      where: {
        [this.idField]: { "[Op.in]": l }
      }
    }]), this.table.loading = !1, this.handleSearch();
  }
  async handleSave(t) {
    if (t = t instanceof Event ? this.form : t, this._isSubmitting) {
      N.w("正在保存...");
      return;
    }
    const s = this.model.formRef || this.dialog.formRef;
    if (!await this._validateForm(s))
      return;
    this._isSubmitting = !0;
    const l = this.getAddParams(t);
    if (this.injectAddParams(l), !await this._checkAllNone(l)) {
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
    return this._isSubmitting = !1, n.err || N.s("保存成功"), this.router.go(-1), n;
  }
  async handleSubmit(t) {
    if (t = t instanceof Event ? null : t, this._isSubmitting)
      return N.w("正在提交..."), !1;
    if (!this.dialog.visible)
      return !1;
    this._isSubmitting = !0;
    const s = t || this.form;
    if (!t && ((this.dialog.shouldTrim || !0) && this._trimForm(), !await this._validateForm()))
      return this._isSubmitting = !1, !1;
    let l = null;
    try {
      if (this.dialog.isEditing) {
        const n = this.getUpdateParams(s);
        if (this.injectUpdateParams(n), !await this._checkAllNone(n))
          return this._isSubmitting = !1, !1;
        l = await this.update(n, this.dialog.editingRow[this.idField]);
      } else {
        const n = this.getAddParams(s);
        if (this.injectAddParams(n), !await this._checkAllNone(n))
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
  async handleLoad() {
    const { query: t } = this.table;
    if (!this.table.list.length)
      return await this.handleSearch(), t.page * t.limit >= this.table.total && (this.table.finished = !0), this.table.moreLoading = !1;
    const { loading: s, total: l } = this.table;
    if (s || !l || this.table.finished)
      return this.table.moreLoading = !1;
    if (t.page * t.limit >= l)
      return this.table.moreLoading = !1, this.table.finished = !0;
    this.table.isInfinite = !0, t.page++;
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
  getSearchParams(t, s = !0) {
    return s && (t != null && t.page && (this.table.query.page = t.page), t != null && t.limit && (this.table.query.limit = t.limit)), Object.assign({ where: {} }, JSON.parse(this._lastSearchParams), this.table.query, t);
  }
  getAddParams(t) {
    const s = Object.keys(this.dialog.initialForm), l = {};
    return s.length ? s.forEach((n) => l[n] = t[n]) : Object.assign(l, t), this.dialog.formItems.forEach((n) => {
      let i = l[n.model || n.prop];
      n.type === "number" ? i = this.uiUtils.formatPrecision(i, n.precision || 3) * 1 : n.comp === "ElDatePicker" && (n.type === "datetime" ? i = ke.format(i) : (!n.type || n.type === "date") && (i = ke.format(i, "", !1))), l[n.model || n.prop] = i;
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
    this.injectAddParams(t);
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
  afterSearch(t, s, l) {
    const n = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && n !== this._lastSearchParams) {
      const { page: i, limit: o, order: a, count: r, ...h } = s;
      this.dbTable.func(["count", h]).then((p) => this.table.total = p.data);
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
    const l = {};
    s.forEach((n) => l[n] = t[n]), await this.update(l, t[this.idField]), this.table.loading = !1;
  }
  _defaultFormatList(t, s) {
    const { columns: l, query: n } = this.table, { page: i, limit: o } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (i - 1) * o + r + 1;
    }), l.forEach((a) => {
      let { prop: r, options: h } = a;
      const { format: p, autoFill: S } = a.tableAttrs || {}, { modelName: b } = a.formAttrs || {};
      if (b && S)
        t.forEach((g) => g[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(h) && p !== !1) {
        const A = Fe(() => a.options, (T, $) => {
          const E = $ ? this.table.list : t, v = Jt(a);
          E.forEach((L, ne) => {
            const D = L[r];
            L[`_formatted_${r}`] = v[D] || D;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(A);
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
    const r = Se.mapField(a.data, o, i);
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
    this.table.ref._visibleColumns.forEach((i) => {
      let { formatter: o = i.formatter, tagValues: a = i.tagValues, options: r = i.options } = i.tableAttrs || {};
      !o && typeof a == "function" && (o = a), l[i.prop] = { formatter: o, tagValues: a, options: r };
    });
    const n = [...new Set(Object.keys(t[0]).concat(this.table.ref._visibleColumns.map((i) => i.prop).filter((i) => i)))];
    return t.forEach((i) => {
      n.forEach((o) => {
        var r, h, p, S;
        const a = i[o];
        if (i.hasOwnProperty("_formatted_" + o))
          return i[o] = i["_formatted_" + o];
        if ((r = l[o]) != null && r.formatter)
          return i[o] = l[o].formatter(a);
        if ((h = l[o]) != null && h.tagValues)
          return i[o] = l[o].tagValues[a];
        if ((p = l[o]) != null && p.options)
          return i[o] = ((S = l[o].options.find((b) => b.value === i[o])) == null ? void 0 : S.text) ?? i[o];
        typeof a == "boolean" ? i[o] = a && 1 || 0 : a instanceof Date ? (i[o] = ke.format(a), i[o].endsWith(" 00:00:00") && (i[o] = i[o].slice(0, -9))) : a === void 0 && (i[o] = Se.get(i, o));
      });
    }), t.forEach((i) => {
      n.forEach((o) => {
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
    return Object.values(t).some((n) => !s.includes(n)) ? !0 : Q.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    N(typeof t == "object" ? t.message || t.err || t.toString() : t);
  }
  _focusDialogInput() {
    const t = document.querySelector(".el-dialog");
    let s = [...t.querySelectorAll("input")].filter((n) => !n.disabled && !n.readonly), l = s.find((n) => n.type === "text" || n.type === "number");
    l || (s = [...t.querySelectorAll("textarea")].filter((n) => !n.disabled && !n.readonly), l = s[0]), l == null || l.focus();
  }
  get _isMobile() {
    var s, l;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((l = this.dialog) == null ? void 0 : l.formRef);
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
const Jt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: l = "text", value: n = "value" } = s, i = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    i[o[n]] = o[l];
  }), i;
};
class Kt extends _t {
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
const Yt = {
  BaseController: bt,
  CrudController: _t,
  TempCrudController: Kt
}, O = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [l, n] of t)
    s[l] = n;
  return s;
}, Gt = {
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
      const e = de(), t = Math.floor(24 / this.items.length), s = this.items.map((l) => ({ span: l.span || t, ...l }));
      return ce(e, s), e;
    },
    handleAdd() {
      this.groups.push(this.makeForm());
    },
    handleCopy(e, t) {
      this.groups.push(JSON.parse(JSON.stringify(e)));
    },
    async handleClear() {
      await Q.w({ message: "确定删除全部组吗？", title: "警告" }) && (this.groups = []);
    }
  }
}, Qt = { class: "x-array" }, Zt = { class: "group-operates" }, es = { class: "groups" };
function ts(e, t, s, l, n, i) {
  const o = u("x-icon"), a = u("x-button"), r = u("x-form");
  return d(), y("div", Qt, [
    j("div", Zt, [
      m(a, {
        type: "primary",
        plain: "",
        class: "add-item",
        onClick: i.handleAdd
      }, {
        default: c(() => [
          m(o, {
            name: "Plus",
            class: "icon"
          }),
          x("添加一组 ")
        ]),
        _: 1
      }, 8, ["onClick"]),
      m(a, {
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
    j("div", es, [
      (d(!0), y(I, null, R(n.groups, (h, p) => (d(), y("div", {
        key: p,
        class: "group"
      }, [
        m(r, _({
          form: h,
          "hide-labels": "",
          gutter: 10,
          ref_for: !0
        }, e.$attrs, { class: "form" }), null, 16, ["form"]),
        m(a, {
          type: "success",
          plain: "",
          icon: "CopyDocument",
          onClick: (S) => i.handleCopy(h, p),
          class: "button"
        }, null, 8, ["onClick"]),
        m(a, {
          type: "danger",
          plain: "",
          icon: "DeleteFilled",
          onClick: (S) => n.groups.splice(p, 1),
          class: "button"
        }, null, 8, ["onClick"])
      ]))), 128))
    ])
  ]);
}
const ss = /* @__PURE__ */ O(Gt, [["render", ts], ["__scopeId", "data-v-424f69b7"]]), ns = {
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
      return this.cols.forEach((l) => {
        const n = l.span || this.span;
        t.push(l), s += n, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, is = { class: "x-auto-rows" }, ls = { key: 1 };
function os(e, t, s, l, n, i) {
  const o = u("x-col"), a = u("x-row");
  return d(), y("div", is, [
    (d(!0), y(I, null, R(i.rows, (r, h) => (d(), f(a, _({
      key: h,
      ref_for: !0
    }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), y(I, null, R(r, (p, S) => (d(), f(o, _({ ref_for: !0 }, p, {
          span: i.isMobile ? p.xs || p.span || s.span : p.span || s.span,
          key: S,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            p.slot || e.$attrs.slot ? V(e.$slots, p.slot || e.$attrs.slot, {
              key: 0,
              col: p
            }) : (d(), y("span", ls, C(p.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const as = /* @__PURE__ */ O(ns, [["render", os]]), rs = {
  name: "MobileXButton"
};
function ds(e, t, s, l, n, i) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  });
}
const cs = /* @__PURE__ */ O(rs, [["render", ds]]), us = {
  name: "PcXButton"
};
function hs(e, t, s, l, n, i) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  });
}
const ps = /* @__PURE__ */ O(us, [["render", hs]]), { funcs: ms } = StardustBrowser, fs = {
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
}, gs = [
  {
    label: "分类",
    prop: "category",
    comp: "x-select",
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
    options: [],
    slot: "selects-formatters",
    formatters: []
  },
  {
    label: "值",
    prop: "value",
    comp: "x-select",
    clearable: !1,
    required: !0,
    text: "label",
    value: "prop",
    options: [],
    slot: "selects-formatters",
    formatters: []
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
    prop: "chartType",
    comp: "x-select",
    clearable: !1,
    required: !0,
    options: [
      { text: "柱状图", value: "bar" },
      { text: "折线图", value: "line" },
      { text: "饼图", value: "pie" }
    ]
  },
  { label: "边距", slot: "grid" },
  { label: "数据筛选", slot: "filter" },
  { label: "字体大小", slot: "font-sizes" }
], bs = {
  sort: "",
  category: "",
  series: "",
  value: "",
  summary: "count",
  chartType: "bar",
  grid: {
    left: 30,
    top: 40,
    right: 20,
    bottom: 30
  },
  filter: {
    category: { isLimit: !1, limit: 10, mergeOthers: !1 },
    series: { isLimit: !1, limit: 10, mergeOthers: !1 }
  },
  fontSizes: [12, 12, 12]
};
function _s() {
  return ms.calcPixel(this.height) * this.zoom + "px";
}
function ys() {
  return this.$store.app.sidebarCollapse;
}
function vs() {
  return this.dialog.form.grid;
}
function ws() {
  return this.dialog.form.filter.category;
}
function Ss() {
  return this.dialog.form.filter.series;
}
function ks() {
  return this.dialog.form.fontSizes;
}
const he = {
  props: fs,
  formItems: gs,
  form: bs,
  computed: {
    zoomedHeight: _s,
    sidebarCollapse: ys,
    grid: vs,
    category: ws,
    series: Ss,
    fontSizes: ks
  }
}, $s = ["index", "selection", "expand", "radio", "_index"], Cs = {
  原样: (e) => e,
  年份: (e) => format(e, "YYYY年"),
  月份: (e) => format(e, "MM月"),
  年月: (e) => format(e, "YYYY-MM"),
  年月日: (e) => format(e, "YYYY-MM-DD"),
  时分: (e) => format(e, "HH:mm"),
  时分秒: (e) => format(e, "HH:mm:ss")
}, xs = [
  { text: "原样", value: "" },
  { text: "升序", value: "asc" },
  { text: "降序", value: "desc" }
], { StardustEcharts: yt } = StardustBrowser;
var lt;
(lt = window.echarts) == null || lt.registerTransform(yt.grouping);
const Me = {
  name: "XChart",
  props: {
    ...he.props
  },
  data() {
    return {
      zoom: 1,
      loading: !1,
      filterType: "分类",
      SORTS: xs,
      dialog: {
        ...fe(),
        formItems: he.formItems,
        form: he.form
      }
    };
  },
  computed: {
    ...he.computed
  },
  watch: {
    option: {
      handler: "update",
      immediate: !0
    },
    zoomedHeight() {
      this.$nextTick(() => {
        var e;
        (e = this.chart) == null || e.resize();
      });
    },
    sidebarCollapse() {
      const e = (this.$store.app.toggleDuration || 0) * 1e3 + 50, t = 50;
      for (let s = 0; s < Math.ceil(e / t); s++)
        setTimeout(this.chart.resize, t * s);
    }
  },
  mounted() {
    window.v = this, this.init();
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
      const e = this.datasource.columns.filter((t) => !$s.includes(t.type)).map((t) => {
        const s = { ...t };
        return s.formatters = ["原样"], (t.comp === "el-date-picker" || t.comp === "ElDatePicker" || t.type === "date") && (s.formatters = Object.keys(Cs)), s;
      });
      this.dialog.formItems.slice(0, 3).forEach((t) => t.options = e), this.handleMakeChart();
    },
    handleCalcFormatters(e) {
      const t = this.dialog.form[e.prop];
      if (!t)
        return e.formatters = [];
      e.formatters = e.options.find((s) => s.prop === t).formatters;
    },
    async handleMakeChart() {
      var s, l;
      if (this.loading)
        return;
      this.dialog.visible = !1, this.loading = !0;
      const e = { ...this.dialog.form };
      (s = e.filter) != null && s.category.isLimit || (e.filter.category.mergeOthers = !1), (l = e.filter) != null && l.series.isLimit || (e.filter.series.mergeOthers = !1);
      let t = this.datasource.list;
      this.datasource.search && (t = await this.datasource.search()), e.data = t, this.setRich(e), this.loading = !1;
    },
    setRich(e) {
      const { data: t, category: s, series: l, value: n, summary: i, chartType: o, filter: a, grid: r, fontSizes: h } = e;
      if (!l || !n)
        return;
      const p = this.datasource.columns.map((T) => T.prop), S = t.map((T) => p.map(($) => T[$])), b = {
        dimensions: p,
        source: S,
        category: s,
        series: l,
        value: n,
        summary: i,
        chartType: o
      }, g = yt.generateOptions(b), A = {
        dataset: [
          { dimensions: p, source: S }
        ]
      };
      A.dataset = [A.dataset[0], ...g.dataset], A.series = g.series, this.update(A);
    },
    update(e = {}) {
      var s, l, n;
      this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1);
      const t = {
        tooltip: {},
        toolbox: { feature: { saveAsImage: {} } },
        xAxis: { type: "category" },
        yAxis: {},
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
      };
      t.xAxis && !((s = t.xAxis.axisLabel) != null && s.formatter) && ((l = t.xAxis).axisLabel || (l.axisLabel = { fontSize: this.fontSizes[0] }), t.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)), (n = this.chart) == null || n.setOption(t, !0);
    },
    labelSplitFormatter(e) {
      return (t) => t.length < e ? t : Array.from({
        length: Math.ceil(t.length / e)
      }).map((s, l) => t.slice(l * e, (l + 1) * e)).join(`
`);
    }
  }
}, Je = () => {
  De((e) => ({
    f73add56: e.zoomedHeight,
    "4ebf4ca2": e.zoom
  }));
}, Ke = Me.setup;
Me.setup = Ke ? (e, t) => (Je(), Ke(e, t)) : Je;
const ge = (e) => (Ie("data-v-226b6044"), e = e(), Re(), e), Vs = { class: "x-chart" }, Es = {
  class: "chart",
  ref: "el"
}, As = /* @__PURE__ */ ge(() => /* @__PURE__ */ j("span", null, "左", -1)), Os = /* @__PURE__ */ ge(() => /* @__PURE__ */ j("span", null, "上", -1)), js = /* @__PURE__ */ ge(() => /* @__PURE__ */ j("span", null, "右", -1)), Ts = /* @__PURE__ */ ge(() => /* @__PURE__ */ j("span", null, "下", -1)), Fs = { class: "sorts flex-center" };
function Ds(e, t, s, l, n, i) {
  const o = u("pc-x-icon"), a = u("x-select"), r = u("el-col"), h = u("el-row"), p = u("el-input-number"), S = u("x-radios"), b = u("el-checkbox"), g = u("el-tab-pane"), A = u("el-tabs"), T = u("x-form"), $ = u("x-dialog"), E = G("loading");
  return F((d(), y("div", Vs, [
    j("div", Es, null, 512),
    e.datasource ? (d(), y("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (v) => n.dialog.visible = !0)
    }, [
      x(" 配置 "),
      m(o, { name: "Setting" })
    ])) : k("", !0),
    m($, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[16] || (t[16] = (v) => n.dialog.visible = v),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: i.handleMakeChart,
      onCancel: t[17] || (t[17] = (v) => n.dialog.visible = !1)
    }, {
      default: c(() => [
        m(T, { dialog: n.dialog }, {
          "selects-formatters": c(({ item: v }) => [
            m(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                m(r, { span: 12 }, {
                  default: c(() => [
                    m(a, _({
                      modelValue: n.dialog.form[v.prop],
                      "onUpdate:modelValue": (L) => n.dialog.form[v.prop] = L
                    }, v, {
                      onChange: (L) => i.handleCalcFormatters(v)
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ]),
                  _: 2
                }, 1024),
                m(r, { span: 12 }, {
                  default: c(() => [
                    m(a, {
                      modelValue: n.dialog.form[v.prop + "_formatter"],
                      "onUpdate:modelValue": (L) => n.dialog.form[v.prop + "_formatter"] = L,
                      options: v.formatters,
                      placeholder: "格式化方式"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024)
          ]),
          grid: c(() => [
            m(h, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                m(r, { span: 12 }, {
                  default: c(() => [
                    As,
                    m(p, {
                      modelValue: e.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (v) => e.grid.left = v)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Os,
                    m(p, {
                      modelValue: e.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (v) => e.grid.top = v)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    js,
                    m(p, {
                      modelValue: e.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (v) => e.grid.right = v)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 12 }, {
                  default: c(() => [
                    Ts,
                    m(p, {
                      modelValue: e.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (v) => e.grid.bottom = v)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          filter: c(() => [
            j("label", Fs, [
              x(" 排序方式 "),
              m(S, {
                modelValue: n.dialog.form.sort,
                "onUpdate:modelValue": t[5] || (t[5] = (v) => n.dialog.form.sort = v),
                options: n.SORTS
              }, null, 8, ["modelValue", "options"])
            ]),
            m(A, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[12] || (t[12] = (v) => n.filterType = v)
            }, {
              default: c(() => [
                m(g, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    m(b, {
                      modelValue: e.category.isLimit,
                      "onUpdate:modelValue": t[6] || (t[6] = (v) => e.category.isLimit = v)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    F(j("div", null, [
                      x(" 记录条数 "),
                      m(p, {
                        modelValue: e.category.limit,
                        "onUpdate:modelValue": t[7] || (t[7] = (v) => e.category.limit = v),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(b, {
                        modelValue: e.category.mergeOthers,
                        "onUpdate:modelValue": t[8] || (t[8] = (v) => e.category.mergeOthers = v)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Xe, e.category.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                m(g, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    m(b, {
                      modelValue: e.series.isLimit,
                      "onUpdate:modelValue": t[9] || (t[9] = (v) => e.series.isLimit = v)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    F(j("div", null, [
                      x(" 记录条数 "),
                      m(p, {
                        modelValue: e.series.limit,
                        "onUpdate:modelValue": t[10] || (t[10] = (v) => e.series.limit = v),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      m(b, {
                        modelValue: e.series.mergeOthers,
                        "onUpdate:modelValue": t[11] || (t[11] = (v) => e.series.mergeOthers = v)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Xe, e.series.isLimit]
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          "font-sizes": c(() => [
            m(h, { gutter: 5 }, {
              default: c(() => [
                m(r, { span: 8 }, {
                  default: c(() => [
                    x(" X轴 "),
                    m(p, {
                      modelValue: e.fontSizes[0],
                      "onUpdate:modelValue": t[13] || (t[13] = (v) => e.fontSizes[0] = v)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 8 }, {
                  default: c(() => [
                    x(" Y轴 "),
                    m(p, {
                      modelValue: e.fontSizes[1],
                      "onUpdate:modelValue": t[14] || (t[14] = (v) => e.fontSizes[1] = v)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                m(r, { span: 8 }, {
                  default: c(() => [
                    x(" 值 "),
                    m(p, {
                      modelValue: e.fontSizes[2],
                      "onUpdate:modelValue": t[15] || (t[15] = (v) => e.fontSizes[2] = v)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["dialog"])
      ]),
      _: 1
    }, 8, ["modelValue", "onSubmit"])
  ])), [
    [E, n.loading]
  ]);
}
const Is = /* @__PURE__ */ O(Me, [["render", Ds], ["__scopeId", "data-v-226b6044"]]), Rs = {
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
        rules: l,
        required: n,
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
        this._options = X(this.options, this);
      }
    }
  }
};
function Ps(e, t, s, l, n, i) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, _({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, i.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), y(I, null, R(n._options, (r) => {
        var h;
        return d(), f(o, _({ ref_for: !0 }, i.attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          shape: s.shape,
          name: r.value
        }), {
          default: c(() => [
            x(C(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "shape", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const Ms = /* @__PURE__ */ O(Rs, [["render", Ps], ["__scopeId", "data-v-f7122501"]]), Bs = {
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
        ...l
      } = this.$attrs;
      return l;
    }
  },
  watch: {
    options: {
      immediate: !0,
      deep: !0,
      handler(e) {
        this._options = X(e, this);
      }
    }
  }
}, Ls = { key: 1 };
function Ns(e, t, s, l, n, i) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, _({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), y(I, null, R(n._options, (r) => {
        var h;
        return d(), f(o, _({ ref_for: !0 }, i.attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), y("span", Ls, C(r.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const Us = /* @__PURE__ */ O(Bs, [["render", Ns], ["__scopeId", "data-v-4dd3721a"]]), qs = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function zs(e, t, s, l, n, i) {
  const o = u("van-col");
  return d(), f(o, _(i.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Xs = /* @__PURE__ */ O(qs, [["render", zs]]), Ws = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Hs(e, t, s, l, n, i) {
  const o = u("el-col");
  return d(), f(o, _(i.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Js = /* @__PURE__ */ O(Ws, [["render", Hs]]), Ks = {
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
}, Ys = { key: 1 }, Gs = { key: 1 };
function Qs(e, t, s, l, n, i) {
  const o = u("van-button"), a = u("van-col"), r = u("van-row");
  return d(), f(Z(s.actionsheet ? "van-action-sheet" : "van-dialog"), _({ width: "92%" }, e.$attrs, {
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
        e.$slots.title ? V(e.$slots, "title", { key: 0 }) : (d(), y("span", Ys, C(s.title), 1))
      ]),
      key: "0"
    } : void 0,
    e.$slots.header ? {
      name: "header",
      fn: c(() => [
        V(e.$slots, "header")
      ]),
      key: "1"
    } : void 0,
    e.$slots.default ? {
      name: "default",
      fn: c(() => [
        V(e.$slots, "default")
      ]),
      key: "2"
    } : void 0,
    e.$slots.title || s.title ? {
      name: "description",
      fn: c(() => [
        e.$slots.title ? V(e.$slots, "title", { key: 0 }) : (d(), y("span", Gs, C(s.title), 1))
      ]),
      key: "3"
    } : void 0,
    i.canConfirm || i.canCancel ? {
      name: "cancel",
      fn: c(() => [
        m(r, null, {
          default: c(() => [
            i.canCancel ? (d(), f(a, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                m(o, {
                  block: "",
                  onClick: Y(i.handleCancel, ["stop"])
                }, {
                  default: c(() => [
                    x(C(s.cancelText), 1)
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
                m(o, {
                  block: "",
                  style: { color: "var(--van-blue)" },
                  onClick: Y(i.handleConfirm, ["stop"])
                }, {
                  default: c(() => [
                    x(C(s.submitText), 1)
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
const Zs = /* @__PURE__ */ O(Ks, [["render", Qs]]), en = {
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
}, tn = {
  key: 1,
  class: "el-dialog__title"
};
function sn(e, t, s, l, n, i) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(Z(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer, "no-footer": !i.hasFooter }]
  }), {
    header: c(() => [
      e.$slots.header ? V(e.$slots, "header", { key: 0 }) : (d(), y("span", tn, C(s.title), 1)),
      s.drawer ? k("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? V(e.$slots, "footer", { key: 0 }) : k("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          x(C(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          x(C(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? V(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const nn = /* @__PURE__ */ O(en, [["render", sn]]), ln = {
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
      const e = de(), t = Math.floor(24 / this.items.length), s = this.items.map((l) => ({ span: l.span || t, ...l }));
      return ce(e, s), e;
    }
  }
}, on = { class: "x-dict" };
function an(e, t, s, l, n, i) {
  const o = u("x-form");
  return d(), y("div", on, [
    m(o, _({
      form: n.form,
      "hide-labels": "",
      gutter: 10
    }, e.$attrs), null, 16, ["form"])
  ]);
}
const rn = /* @__PURE__ */ O(ln, [["render", an]]), H = {}, te = {
  provinces: [],
  cities: [],
  counties: []
}, dn = {
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
      provinces: Object.freeze(te.provinces),
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
      this.cities = Object.freeze(te.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(te.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(H, this.areaList), te.provinces = Object.entries(H.province_list).map((e) => ({ value: e[0], text: e[1] })), te.cities = Object.entries(H.city_list).map((e) => ({ value: e[0], text: e[1] })), te.counties = Object.entries(H.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(te.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split(this.seperator);
      if (e) {
        const l = Object.entries(H.province_list).find((n) => n[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(H.city_list).find((n) => n[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const l = Object.entries(H.county_list).find((n) => n[1] === s);
        this.county = l == null ? void 0 : l[0];
      } else
        this.county = "";
      this.inited = !0, this.update();
    },
    update() {
      if (!this.inited)
        return;
      let e = [
        this.province && H.province_list[this.province] || "",
        this.number > 1 && this.city && H.city_list[this.city] || "",
        this.number > 2 && this.county && H.county_list[this.county] || ""
      ].slice(0, this.number).join(this.seperator);
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function cn(e, t, s, l, n, i) {
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
      }, 8, ["span"])) : k("", !0),
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
      }, 8, ["span"])) : k("", !0)
    ]),
    _: 1
  });
}
const un = /* @__PURE__ */ O(dn, [["render", cn]]);
function hn() {
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
function pn() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function mn() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n, i) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label,
    prop: n.prop || "_" + i
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function fn() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return mt(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function gn() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function bn(e) {
  var l;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
}
function _n(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const le = {
  props: hn,
  computed: {
    _model: pn,
    _items: mn,
    _visibleItems: fn,
    _rules: gn
  },
  methods: {
    calcPlaceholder: bn,
    formatModelValue: _n
  }
}, yn = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...le.props(),
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
    ...le.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...le.methods
  }
};
function vn(e, t, s, l, n, i) {
  const o = u("mobile-x-form-item"), a = u("el-col"), r = u("el-row"), h = u("van-form");
  return d(), f(h, {
    ref: "formRef",
    class: J(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? V(e.$slots, "pre", { key: 0 }) : k("", !0),
      m(r, {
        gutter: e.$attrs.gutter,
        justify: e.$attrs.justify,
        align: e.$attrs.align,
        tag: e.$attrs.tag
      }, {
        default: c(() => [
          (d(!0), y(I, null, R(e._visibleItems, (p, S) => (d(), f(a, {
            key: p.prop,
            span: p.span,
            offset: p.offset,
            tag: p.tag,
            xs: p.xs,
            sm: p.sm,
            md: p.md,
            lg: p.lg,
            xl: p.xl
          }, {
            default: c(() => [
              m(o, _({
                "label-width": s.labelWidth,
                "label-position": e.$attrs["label-position"] || "left",
                ref_for: !0
              }, p, {
                rules: e._rules[p.prop] || p.rules,
                modelValue: e.formatModelValue(e._model[p.prop]),
                "onUpdate:modelValue": (b) => e._model[p.prop] = b,
                placeholder: e.calcPlaceholder(p)
              }), {
                default: c(() => [
                  p.slot ? V(e.$slots, p.slot, _({
                    key: 0,
                    ref_for: !0
                  }, p)) : k("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "label-position", "rules", "modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            _: 2
          }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
        ]),
        _: 3
      }, 8, ["gutter", "justify", "align", "tag"]),
      e.$slots.default ? V(e.$slots, "default", { key: 1 }) : k("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const wn = /* @__PURE__ */ O(yn, [["render", vn]]), Sn = {
  name: "PcXForm",
  inheritAttrs: !1,
  props: {
    ...le.props(),
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
    ...le.computed
  },
  mounted() {
    const e = this.dialog ?? this.form;
    e && (e.formRef = this.$refs.formRef), this.$emit("update:fref", this.$refs.formRef);
  },
  methods: {
    ...le.methods
  }
}, kn = { key: 1 };
function $n(e, t, s, l, n, i) {
  const o = u("pc-x-form-item"), a = u("el-col"), r = u("el-row"), h = u("el-form"), p = u("el-collapse-item"), S = u("el-collapse");
  return d(), f(S, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (b) => n.activeNames = b),
    class: J((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      m(p, {
        name: n.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), y("span", kn, C(s.title), 1))
        ]),
        default: c(() => [
          m(h, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs["label-position"] || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: c(() => [
              e.$slots.pre ? V(e.$slots, "pre", { key: 0 }) : k("", !0),
              m(r, {
                gutter: e.$attrs.gutter,
                justify: e.$attrs.justify,
                align: e.$attrs.align,
                tag: e.$attrs.tag
              }, {
                default: c(() => [
                  (d(!0), y(I, null, R(e._visibleItems, (b, g) => (d(), f(a, {
                    key: b.prop,
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
                      m(o, _({
                        "label-width": s.labelWidth,
                        "show-tooltip": e.$attrs.showTooltip || !1,
                        ref_for: !0
                      }, b, {
                        modelValue: e._model[b.prop],
                        "onUpdate:modelValue": [(A) => e._model[b.prop] = A, (A) => b.onChange || null],
                        prop: b.prop || b.model,
                        clearable: b.clearable !== !1,
                        placeholder: e.calcPlaceholder(b)
                      }), {
                        default: c(() => [
                          b.slot ? V(e.$slots, b.slot, {
                            key: 0,
                            item: b,
                            index: g
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
              e.$slots.default ? V(e.$slots, "default", { key: 1 }) : k("", !0)
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
const Cn = /* @__PURE__ */ O(Sn, [["render", $n]]);
function xn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ot(e);
}
const Ae = (e) => {
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
  }, p = [];
  return o === "html" ? h.class = "comp-html" : i = u(i), a && (h.innerHTML = a), r && p.push(r), ee(i, h, {
    default: () => p
  });
}, Vn = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: n,
    $slots: i
  } = e, {
    modelValue: o,
    viewonly: a,
    slot: r,
    showTooltip: h,
    placeholder: p
  } = t;
  let S;
  l.directives && typeof l.directives == "object" && (S = Object.entries(l.directives).map(([g, A]) => [G(g), A]));
  let b;
  if (r && !s.label)
    b = i.default();
  else {
    let g = null;
    if (r)
      g = i.default();
    else if (a)
      g = o;
    else if (h) {
      let A;
      g = m(u("el-tooltip"), {
        effect: "dark",
        content: p,
        placement: "bottom"
      }, xn(A = Ae(e)) ? A : {
        default: () => [A]
      });
    } else
      g = Ae(e);
    b = ee(u("el-form-item"), {
      ...t,
      ...s
    }, {
      default: () => [g],
      label: () => ee("span", {
        title: s.label,
        class: "overflow-text",
        style: {
          width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
          display: "inline-block"
        }
      }, [s.label])
    });
  }
  return S ? F(b, S) : b;
}, En = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: n,
    $slots: i,
    mValue: o
  } = e, {
    viewonly: a,
    slot: r,
    comp: h,
    modelValue: p
  } = t;
  let S;
  l.directives && typeof l.directives == "object" && (S = Object.entries(l.directives).map(([g, A]) => [G(g), A]));
  let b;
  if (r && !s.label)
    b = i.default({
      ...t,
      ...s
    });
  else {
    const g = {
      modelValue: o,
      labelWidth: s["label-width"],
      labelAlign: s["label-align"] ?? s["label-position"],
      "onUpdate:modelValue": (A) => n("update:modelValue", A)
    };
    r && s.label || h ? b = ee(u("van-field"), g, {
      input: () => r && s.label ? i.default() : a ? p : Ae(e)
    }) : (a && Object.assign(g, {
      readonly: !0
    }), b = ee(u("van-field"), Object.assign(g, l)));
  }
  return S ? F(b, S) : b;
}, An = {
  name: "MobileXFormItem",
  props: {
    modelValue: Boolean | Number | String | Array,
    clearable: {
      type: Boolean,
      default: !0
    },
    viewonly: {
      type: Boolean,
      default: !1
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
    return En(this);
  }
}, Be = {
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
    viewonly: {
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
        style: S,
        html: b,
        class: g,
        ...A
      } = { ...this.$props, ...this.$attrs };
      return A;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return Vn(this);
  }
}, Ye = () => {
  De((e) => ({
    "70706ade": e.width
  }));
}, Ge = Be.setup;
Be.setup = Ge ? (e, t) => (Ye(), Ge(e, t)) : Ye;
const On = /* @__PURE__ */ O(Be, [["__scopeId", "data-v-dba34d65"]]), Qe = /* @__PURE__ */ Object.assign({}), jn = {
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
      await Promise.all(Object.keys(Qe).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Qe[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Tn = ["src"];
function Fn(e, t, s, l, n, i) {
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), y("span", {
    key: 0,
    class: J(i.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), y("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Tn)) : (d(), f(o, _({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const Dn = /* @__PURE__ */ O(jn, [["render", Fn]]), Ze = /* @__PURE__ */ Object.assign({}), In = {
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
      await Promise.all(Object.keys(Ze).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Ze[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Rn = ["src"];
function Pn(e, t, s, l, n, i) {
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), y("span", {
    key: 0,
    class: J(i.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), y("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Rn)) : (d(), f(o, Ct(_({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(Z(s.name)))
    ]),
    _: 1
  }, 16));
}
const Mn = /* @__PURE__ */ O(In, [["render", Pn]]), { highdict: vt } = StardustJs, { storage: Bn } = StardustBrowser, { local: wt } = Bn, Le = ["index", "selection", "expand", "radio", "_index"];
function Ln() {
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
function Nn() {
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
function Un() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function qn() {
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
function zn() {
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
function Xn() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function Wn() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function Hn() {
  const { $props: e, _query: t } = this, { table: s, columns: l } = e;
  return (l || (s == null ? void 0 : s.columns) || []).map((i) => i.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(o) {
      const { page: a, limit: r } = t;
      return (s.isInfinite ? 0 : (a - 1) * r) + o + 1;
    }
  }, i, { type: "index" }) : i.type === "radio" ? Object.assign({ width: 60, label: "单选" }, i) : Object.assign({}, i, i.tableAttrs));
}
function Jn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Kn() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function Yn() {
  const { table: e, finished: t } = this.$props;
  return t ?? (e == null ? void 0 : e.finished);
}
function Gn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Qn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function Zn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || this._attrs.chartOption || {};
}
function ei() {
  return this.onKeywordsSearch || this._listen["keywords-search"] ? (...e) => this._emit("keywords-search", ...e) : null;
}
function ti() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function si() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function ni() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function ii() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function li() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function oi() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function ai() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : () => {
  };
}
function ri() {
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
  return e.forEach((l) => {
    const n = "handle" + l.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
    t[l] = this.controller[n];
  }), t;
}
function di() {
  const e = this._columns.filter((s) => s.type && Le.includes(s.type) || s.fixed === "left"), t = this.settings.columns.filter((s) => !s.hide && s.fixed !== "left").map((s) => {
    const l = this._columns.find((n) => n.prop === s.prop);
    return {
      sortable: "custom",
      ...l,
      width: s.width || l.width
    };
  });
  return e.concat(t);
}
function ci() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function ui() {
  const { plain: e } = this._attrs;
  return e || e === "";
}
function hi() {
  const { "hide-header": e } = this._attrs;
  return e || e === "";
}
function pi() {
  const { "hide-tools": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function mi() {
  const { "hide-searcher": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function fi() {
  const { "hide-chart": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function gi() {
  const { "hide-settings": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function bi() {
  const { "hide-operates": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function _i() {
  const { "hide-pagination": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function yi() {
  return this._attrs["operates-width"] ?? 150;
}
function vi() {
  return this._attrs["operates-dropdown"];
}
function wi() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !Le.includes(e.type)));
}
function Si() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function ki() {
  const e = this._uid && wt.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Le.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: n, hide: i, width: o, virtual: a, fixed: r } = t;
    return { prop: s, label: l, show: n, hide: i, width: o, virtual: a, fixed: r };
  })), this.settings = e;
}
function $i(e) {
  wt.setJson(`Settings[${this._uid}]`, e);
}
function Ci(e, t) {
  const { prop: s } = t, l = e[s];
  let { format: n, formatter: i } = t.tableAttrs || t;
  if (i)
    return i(l, e);
  if (n = Array.isArray(t.options) ? n !== !1 : n, n) {
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
  }
  return l === void 0 ? s.includes(".") || s.includes("[") ? vt.get(e, s, this.defaultValue) : this.defaultValue : l === "" ? this.defaultValue : l;
}
function xi(e, t) {
  return t.link ? t.link(e) : vt.get(e, t.linkProp || t.prop);
}
function Vi(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function Ei(e) {
  this.params = e, this._emit("search", e);
}
function Ai(e) {
  this.saveSettings(e), this.initSettings();
}
function Oi(e, t, s, l) {
  const n = this.settings.columns.find((i) => i.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
}
function ji(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Ti(e) {
  var t, s, l, n;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((n = (l = this.controller) == null ? void 0 : l.handleSortChange) == null || n.call(l, e));
}
function Fi(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function Di(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function Ii() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function Ri() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Pi(e) {
  var l;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Mi(e) {
  var l;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function Bi(e, t) {
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
function Li(e, t) {
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
function Ni(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Ui(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function qi(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function zi(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Xi(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function Wi(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function Hi(e, t) {
  var l;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((l = t.previewSrcList) == null ? void 0 : l.call(t)) || [s];
}
function Ji(e, t) {
  const s = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Ki() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const U = {
  props: Ln,
  emits: Nn,
  computed: {
    _attrs: Un,
    domids: qn,
    elTableAttrs: zn,
    _loading: Xn,
    _data: Wn,
    _columns: Hn,
    _query: Jn,
    _total: Kn,
    _finished: Yn,
    _selection: Gn,
    _chartHeight: Qn,
    _chartOption: Zn,
    _onKeywordsSearch: ei,
    _onSearch: ti,
    _onAdd: si,
    _onExport: ni,
    _onSearchExport: ii,
    _onImport: li,
    _onMultiDelete: oi,
    _onLoad: ai,
    _listen: ri,
    _visibleColumns: di,
    _uid: ci,
    plain: ui,
    hideHeader: hi,
    hideTools: pi,
    hideSearcher: mi,
    hideChart: fi,
    hideSettings: gi,
    hideOperates: bi,
    hidePagination: _i,
    operatesWidth: yi,
    operatesDropdown: vi,
    searcherColumns: wi,
    searcherConfig: Si
  },
  watch: {
    $route: Ki
  },
  methods: {
    initSettings: ki,
    saveSettings: $i,
    calcValue: Ci,
    calcLink: xi,
    calcOverflowTooltip: Vi,
    handleSearch: Ei,
    handleResetSettings: Ai,
    handleHeaderDragend: Oi,
    handleSelectionChange: ji,
    handleSortChange: Ti,
    handleCheckedChange: Fi,
    handleCollapseChange: Di,
    handleMinus: Ii,
    handleToggleFullscreen: Ri,
    cellClassName: Pi,
    cellStyle: Mi,
    calcTagType: Bi,
    calcTagValue: Li,
    canEdit: Ni,
    canSave: Ui,
    canRowEdit: qi,
    canCancelEdit: zi,
    canDelete: Xi,
    _imageSrc: Wi,
    _imagePreviewSrcList: Hi,
    _emit: Ji
  }
}, Ne = {
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
        const { infoAttrs: s = {}, ...l } = t, n = { span: this.span, ...l, ...s }, i = n.block || "基本信息";
        let o = e[i];
        o || (e[i] = o = [], o.span = 0), o.span + n.span > 24 && o.length ? o[o.length - 1].span += 24 - o.span : o.span += n.span, o.push(n);
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
    calcValue: U.methods.calcValue,
    calcLink: U.methods.calcLink
  }
}, et = () => {
  De((e) => ({
    a371add4: e.labelWidth,
    "24ca7ea8": e._labelAlign,
    "6c929762": e._valueAlign
  }));
}, tt = Ne.setup;
Ne.setup = tt ? (e, t) => (et(), tt(e, t)) : et;
const Yi = { class: "x-info__label" }, Gi = { key: 1 }, Qi = { class: "x-info__value" }, Zi = ["href"], el = { key: 3 };
function tl(e, t, s, l, n, i) {
  const o = u("router-link"), a = u("el-col"), r = u("el-row"), h = u("el-collapse-item"), p = u("el-collapse");
  return d(), f(p, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (S) => n.activeNames = S),
    class: J(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), y(I, null, R(i.blocks, (S, b) => (d(), f(h, {
        key: b,
        title: b,
        name: b
      }, {
        default: c(() => [
          m(r, {
            gutter: e.$attrs.gutter || 10
          }, {
            default: c(() => [
              (d(!0), y(I, null, R(S, (g) => (d(), f(a, _({
                key: g.prop,
                span: s.span,
                ref_for: !0
              }, g), {
                default: c(() => [
                  j("div", Yi, [
                    e.$slots.label ? V(e.$slots, "label", {
                      key: 0,
                      label: g.label
                    }, void 0, !0) : (d(), y("span", Gi, C(g.label ? s.showColon ? g.label + "：" : g.label : ""), 1))
                  ]),
                  j("div", Qi, [
                    g.slot === "$link" ? (d(), f(o, {
                      key: 0,
                      to: g.to(s.data)
                    }, {
                      default: c(() => [
                        x(C(i.calcLink(s.data, g)), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])) : g.slot === "$phone" ? (d(), y("a", {
                      key: 1,
                      href: `tel:${s.data[g.prop]}`
                    }, C(s.data[g.prop]), 9, Zi)) : g.slot ? V(e.$slots, g.slot, _({
                      key: 2,
                      ref_for: !0
                    }, { data: s.data, field: g, value: i.calcValue(s.data, g) }), void 0, !0) : (d(), y("span", el, C(i.calcValue(s.data, g)), 1))
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
const sl = /* @__PURE__ */ O(Ne, [["render", tl], ["__scopeId", "data-v-3eb12609"]]), nl = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, il = { key: 1 };
function ll(e, t, s, l, n, i) {
  return d(), y("div", null, [
    (d(!0), y(I, null, R(s.items, (o, a) => (d(), f(Z(s.compName), _({
      key: a,
      ref_for: !0
    }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? V(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), y("span", il, C(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const ol = /* @__PURE__ */ O(nl, [["render", ll]]), al = {
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
function rl(e, t, s, l, n, i) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), h = u("van-row");
  return d(), f(h, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      m(o, { span: 6 }, {
        default: c(() => [
          j("span", null, "总计: " + C(s.total), 1)
        ]),
        _: 1
      }),
      m(o, { span: 18 }, {
        default: c(() => [
          m(r, _({
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
              x(" 上一页 ")
            ]),
            "next-text": c(() => [
              x(" 下一页 "),
              m(a, { name: "arrow" })
            ]),
            page: c(({ text: p }) => [
              x(C(p), 1)
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
const dl = /* @__PURE__ */ O(al, [["render", rl]]), cl = {
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
function ul(e, t, s, l, n, i) {
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
const hl = /* @__PURE__ */ O(cl, [["render", ul]]), pl = {
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
function ml(e, t, s, l, n, i) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), y(I, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: J(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, C(i.text), 3),
    m(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: c(() => [
        m(o, _(e.$attrs, {
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
const fl = /* @__PURE__ */ O(pl, [["render", ml]]), gl = {
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
        this._options = X(this.options, this);
      }
    }
  }
};
function bl(e, t, s, l, n, i) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, _({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), y(I, null, R(n._options, (r) => {
        var h;
        return d(), f(o, _({ ref_for: !0 }, e.$attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.text,
          name: r.value
        }), {
          default: c(() => [
            x(C(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const _l = /* @__PURE__ */ O(gl, [["render", bl]]), yl = {
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
        this._options = X(this.options, this);
      }
    }
  }
}, vl = { key: 1 };
function wl(e, t, s, l, n, i) {
  const o = u("el-radio-group");
  return d(), f(o, _({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), y(I, null, R(n._options, (a) => {
        var r;
        return d(), f(Z(s.button ? "el-radio-button" : "el-radio"), _({ ref_for: !0 }, i.attrs, {
          disabled: (r = a.raw) == null ? void 0 : r.disabled,
          key: a.text,
          value: a.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: a,
              raw: a.raw
            }, void 0, !0) : (d(), y("span", vl, C(a.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const Sl = /* @__PURE__ */ O(yl, [["render", wl], ["__scopeId", "data-v-1c8cf979"]]), kl = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, $l = { key: 1 };
function Cl(e, t, s, l, n, i) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), y(I, null, R(s.cols, (r, h) => (d(), f(o, _({ ref_for: !0 }, r, {
        span: r.xs ?? r.span,
        key: h
      }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), y("span", $l, C(r.text), 1))
        ]),
        _: 2
      }, 1040, ["span"]))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const xl = /* @__PURE__ */ O(kl, [["render", Cl]]), Vl = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, El = { key: 1 };
function Al(e, t, s, l, n, i) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), y(I, null, R(s.cols, (r, h) => (d(), f(o, _({ ref_for: !0 }, r, { key: h }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), y("span", El, C(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const Ol = /* @__PURE__ */ O(Vl, [["render", Al]]), jl = {
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
function Tl(e, t, s, l, n, i) {
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
      m(o, {
        name: "scan",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const Fl = /* @__PURE__ */ O(jl, [["render", Tl]]), Dl = {
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
function Il(e, t, s, l, n, i) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, _(e.$attrs, {
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
const Rl = /* @__PURE__ */ O(Dl, [["render", Il]]), Ue = async (e, t, s) => {
  if (s.loading || s.options._loading)
    return;
  s.loading = !0, s.options._loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: o, $attrs: a, params: r = {} } = s;
  r.attributes = [...new Set(r.attributes || [...o || [], n, i])], r.page || (r.page = 1), r.limit || (r.limit = 20), r.where || (r.where = {});
  const h = [];
  a.modelValue !== void 0 && a.modelValue !== "" && h.push({ [i]: a.modelValue }), l && ((o == null ? void 0 : o.length) > 1 ? h.push(...o.map((S) => ({
    [S]: { "[Op.like]": `%${l}%` }
  }))) : h.push({ [n]: { "[Op.like]": `%${l}%` } })), h.length && (r.where["[Op.or]"] = h);
  const p = await e.search(s.modelName, r);
  s.options.splice(0, s.options.length, ...p.data), s.loading = !1, s.options._loading = !1;
}, Oe = (e, t) => !e || typeof e != "object" ? e : !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], je = (e, t) => !e || typeof e != "object" || !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", Pl = {
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
      Ue(this.service.restful, e, this);
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
function Ml(e, t, s, l, n, i) {
  const o = u("x-picker");
  return d(), y("div", {
    onClick: t[2] || (t[2] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    m(o, _(e.$attrs, {
      modelValue: n._value,
      "onUpdate:modelValue": i.onChange,
      show: n.visible,
      columns: n._options,
      onClick: t[0] || (t[0] = Y(() => {
      }, ["stop"])),
      onShow: i.onShow,
      onCancel: t[1] || (t[1] = (a) => n.visible = !1),
      onConfirm: i.onConfirm,
      onChange: i.onChange
    }), null, 16, ["modelValue", "onUpdate:modelValue", "show", "columns", "onShow", "onConfirm", "onChange"])
  ]);
}
const Bl = /* @__PURE__ */ O(Pl, [["render", Ml]]), Ll = {
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
        const e = X(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = Oe(this.options[s], this), t._remark_ = je(this.options[s], this);
        }), this._options = se(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: X,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = se(this._options);
      const t = !this.$slots.custom && this.labelTexts;
      this.list = se(this._options.filter((s) => {
        let l = s.text;
        return t && (l += s._main_ + s._remark_), l.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ue(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return Oe(e, this);
    },
    calcRemarkLabel(e) {
      return je(e, this);
    }
  }
}, Nl = { key: 1 }, Ul = { class: "main" }, ql = { class: "remark" };
function zl(e, t, s, l, n, i) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, _({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || i.filter,
    onKeyup: Pe(i.handleRemote, ["enter"])
  }), {
    default: c(() => [
      (d(!0), y(I, null, R(n.list, (r, h) => {
        var p;
        return d(), f(o, _({ ref_for: !0 }, e.$attrs, {
          disabled: (p = r.raw) == null ? void 0 : p.disabled,
          key: r.value,
          label: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), y("span", Nl, [
              j("span", Ul, C(r._main_), 1),
              j("span", ql, C(r._remark_), 1)
            ]))
          ]),
          _: 2
        }, 1040, ["disabled", "label", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote", "filter-method", "onKeyup"]);
}
const Xl = /* @__PURE__ */ O(Ll, [["render", zl], ["__scopeId", "data-v-20ab71e6"]]), Wl = {
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
        const e = X(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = Oe(this.options[s], this), t._remark_ = je(this.options[s], this);
        }), this._options = se(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: X,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = se(this._options);
      const t = !!this.$slots.custom;
      this.list = se(this._options.filter((s) => {
        let l = s.text;
        return t || (l += s._main_ + s._remark_), l.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ue(this.service.restful, e, this);
    }
  }
}, Hl = { key: 1 }, Jl = { class: "main" }, Kl = { class: "remark" };
function Yl(e, t, s, l, n, i) {
  const o = u("el-select-v2");
  return d(), f(o, _({
    class: ["pc-x-select-v2", s.plain ? "x-select-v2--plain" : ""],
    loading: n.loading
  }, e.$attrs, {
    options: n.list,
    props: { label: "text" },
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || i.filter,
    onKeyup: Pe(i.handleRemote, ["enter"])
  }), {
    default: c(({ item: a, index: r }) => [
      e.$slots.custom ? V(e.$slots, "custom", {
        key: 0,
        option: a,
        raw: a.raw
      }, void 0, !0) : (d(), y("span", Hl, [
        j("span", Jl, C(a._main_), 1),
        j("span", Kl, C(a._remark_), 1)
      ]))
    ]),
    _: 3
  }, 16, ["class", "loading", "options", "filterable", "remote", "filter-method", "onKeyup"]);
}
const Gl = /* @__PURE__ */ O(Wl, [["render", Yl], ["__scopeId", "data-v-70bc3765"]]), st = {
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
}, Ql = [{
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
}], M = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  XRadios: ["eq", "ne", "special"],
  XCheckboxs: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "in", "notIn", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "in", "notIn", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "in", "notIn", "special"],
  universal: ["eq", "ne", "gt", "gte", "lt", "lte", "in", "like", "notIn", "notLike", "between", "special"]
};
M["x-select"] = M.XSelect;
M.XSelectV2 = M.XSelect;
M["x-select-v2"] = M.XSelect;
M["x-radios"] = M.XRadios;
M["x-checkboxs"] = M.XCheckboxs;
M["el-date-picker"] = M.ElDatePicker;
M["el-input-number"] = M.ElInputNumber;
M["el-input"] = M.ElInput;
function Zl() {
  const e = window.isMobile ? "small" : "", {
    $attrs: t,
    config: s,
    columns: l,
    visible: n,
    conditions: i,
    expression: o,
    handleSearch: a,
    handleReset: r,
    handleAdd: h,
    handleDelete: p,
    handleSelectField: S,
    handleSelectOp: b
  } = this;
  return m(u("x-dialog"), _({
    "append-to-body": !0,
    drawer: !0,
    width: "700px",
    title: t.title || "自定义查询",
    class: "searcher",
    "cancel-text": "重置",
    "submit-text": t["submit-text"] || "查询"
  }, {
    modelValue: n,
    "onUpdate:modelValue": (g) => this.visible = g,
    onCancel: r,
    onSubmit: a
  }), {
    default: () => [s.traditional ? null : m(u("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: h
    }, {
      default: () => [x("新增条件")]
    }), m("div", {
      class: "conditions"
    }, [i.map((g, A) => m("div", {
      class: "condition flex-center",
      key: g.no
    }, [s.traditional ? null : m(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => p(A)
    }, {
      default: () => [x("X")]
    }), s.traditional ? null : m("span", {
      class: "title"
    }, [g.no]), m("div", {
      class: "expression"
    }, [s.traditional ? m(u("el-input"), {
      modelValue: g.item.label,
      readonly: !0
    }, null) : m(u("pc-x-select"), {
      modelValue: g.prop,
      onChange: (T) => S(g, T),
      options: l,
      text: "label",
      value: "prop"
    }, null), m(u("pc-x-select"), {
      modelValue: g.op,
      onChange: (T) => b(g, T),
      options: g.ops
    }, null), m("div", {
      class: "value-container"
    }, [eo(this, g)])])]))]), s.traditional ? null : m(u("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: o,
      "onUpdate:modelValue": (g) => this.expression = g
    }), null)]
  });
}
function eo(e, t) {
  const s = (n) => ee(u((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (i) => t.value = i,
    onKeyup: (i) => {
      i.key === "Enter" && e.handleSearch();
    }
  }, n)), l = {
    multiple: !1
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
  })]) : ["in", "notIn"].includes(t.op) ? (l.multiple = !0, t.item.options || (l.placeholder = "可以填写多项，用英文逗号分割"), s(l)) : t.op === "special" ? s({
    ...l,
    component: "x-select",
    placeholder: "请选择特殊值",
    options: Ql
  }) : s();
}
const { storage: $e } = StardustBrowser, { deepCopy: to } = StardustJs.funcs, so = {
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
  render: Zl,
  methods: {
    init() {
      const e = this.uid && $e.local.getJson(this.key, this.config) || this.config;
      this.initConfig(to(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      $e.local.setJson(this.key, {
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
        const { prop: n, op: i, value: o, universal: a } = l;
        l.item = this.columns.find((r) => r.prop === n), this.handleSelectField(l, n), this.handleSelectOp(l, i), l.value = o, l.ops = M[a ? "universal" : l.component].map((r) => st[r]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((l) => l.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        N.w(t.toString());
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, e.page = 1, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      $e.local.remove(this.key), Object.assign(this, {
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
      const e = this.expression.trim().replaceAll("&&", "and").replaceAll("||", "or");
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
      let { item: t, component: s, prop: l, op: n, value: i } = e;
      const o = {};
      if (n === "special") {
        const a = i.startsWith("NOT_"), r = i.startsWith("NE_");
        return i.includes("NULL") ? i = null : i.includes("BLANK") && (i = ""), a ? i = { "[Op.not]": i } : r && (i = { "[Op.ne]": i }), o[l] = i, o;
      }
      return (n === "like" || n === "notLike") && (i = "%" + i + "%"), (n === "in" || n === "notIn") && (t.options || (i = i.split(","), (s === "ElInputNumber" || s === "el-input-number" || e.type === "number") && (i = i.map(Number)))), o[l] = { [`[Op.${n}]`]: i }, o;
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
      e.value = "", e.prop = t, e.item = this.columns.find((z) => z.prop === e.prop);
      const { options: s, type: l, formAttrs: n = {} } = e.item, i = { ...e.item, ...n }, {
        comp: o,
        universal: a,
        visible: r,
        canAdd: h,
        canEdit: p,
        required: S,
        slot: b,
        span: g,
        tableAttrs: A,
        formAttrs: T,
        tagTypes: $,
        tagValues: E,
        width: v,
        minWidth: L,
        disabled: ne,
        readonly: D,
        ...B
      } = i;
      B.clearable ?? (B.clearable = !0), e.config = B, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = M[a ? "universal" : e.component].map((z) => st[z]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", B.type = "date"), B.type === "textarea" && delete B.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, qe = /* @__PURE__ */ O(so, [["__scopeId", "data-v-f8ded706"]]), no = {
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
  components: { Searcher: qe },
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
}, io = { class: "mobile-x-table" }, lo = {
  key: 1,
  class: "card"
}, oo = ["onClick"], ao = { class: "row-header flex-center" }, ro = ["value", "checked"], co = { class: "label" }, uo = { class: "value" }, ho = ["value", "checked"], po = {
  key: 2,
  class: "index"
}, mo = { class: "title" };
function fo(e, t, s, l, n, i) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), h = u("x-icon"), p = u("van-cell"), S = u("van-list"), b = u("x-pagination"), g = u("x-info"), A = u("van-popup"), T = u("van-action-sheet");
  return d(), y("div", io, [
    m(o, {
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
          V(e.$slots, "tools-prefix", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0,
      e.$slots["tools-suffix"] ? {
        name: "tools-suffix",
        fn: c(() => [
          V(e.$slots, "tools-suffix", {}, void 0, !0)
        ]),
        key: "1"
      } : void 0
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), y("div", lo, [
      (d(!0), y(I, null, R(e._data, ($, E) => (d(), y("div", {
        key: E,
        class: "row",
        onClick: (v) => i.handleClickCard(E)
      }, [
        j("div", ao, [
          i.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[E],
            "onUpdate:modelValue": (v) => n.selected[E] = v,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = Y(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
          m(h, {
            name: "ellipsis",
            class: "more",
            onClick: Y((v) => i.handleShowActionSheet($, E), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        i.hasRadio ? (d(), y("input", {
          key: 0,
          type: "radio",
          value: E,
          checked: E === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = Y(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...v) => e.handleCheckedChange && e.handleCheckedChange(...v))
        }, null, 40, ro)) : k("", !0),
        (d(!0), y(I, null, R(i.cols, (v, L) => (d(), y("div", {
          key: L,
          class: "field"
        }, [
          j("span", co, C(v.label) + ":", 1),
          j("span", uo, C(e.calcValue($, v)), 1)
        ]))), 128))
      ], 8, oo))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(S, _({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = ($) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), y(I, null, R(e._data, ($, E) => (d(), f(p, {
          key: E,
          "is-link": "",
          onClick: (v) => i.handleShowDetail($, E)
        }, {
          default: c(() => [
            i.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[E],
              "onUpdate:modelValue": (v) => n.selected[E] = v,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = Y(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
            i.hasRadio ? (d(), y("input", {
              key: 1,
              type: "radio",
              value: E,
              checked: E === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = Y(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...v) => e.handleCheckedChange && e.handleCheckedChange(...v))
            }, null, 40, ho)) : k("", !0),
            i.hasIndex ? (d(), y("span", po, C(E + 1), 1)) : k("", !0),
            j("span", mo, C(i.calcTitle($)), 1)
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
      onSearch: t[7] || (t[7] = ($) => e._emit("search"))
    }, null, 8, ["query", "total"])) : k("", !0),
    m(A, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = ($) => n.popupVisible = $),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        m(g, {
          data: n.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    m(T, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = ($) => n.actionSheetVisible = $),
      actions: i.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: i.handleSelectAction,
      onCancel: t[10] || (t[10] = ($) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const go = /* @__PURE__ */ O(no, [["render", fo], ["__scopeId", "data-v-84e93229"]]), bo = {
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
          const { prop: t, label: s, show: l, hide: n, width: i } = e;
          return { prop: t, label: s, show: l, hide: n, width: i };
        })
      });
    }
  }
}, _o = (e) => (Ie("data-v-a9d96f8a"), e = e(), Re(), e), yo = {
  class: "table",
  ref: "colsTable"
}, vo = ["data-prop"], wo = ["title", "onClick"], So = /* @__PURE__ */ _o(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1)), ko = {
  class: "table",
  ref: "sortsTable"
}, $o = ["data-prop"];
function Co(e, t, s, l, n, i) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), h = u("ElCheckbox"), p = u("el-input-number"), S = u("el-tab-pane"), b = u("x-select"), g = u("x-radios"), A = u("el-tabs"), T = u("el-popover");
  return s.visible ? (d(), f(T, _({
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
      m(A, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = ($) => n.activeName = $)
      }, {
        default: c(() => [
          i.hideColumns ? k("", !0) : (d(), f(S, {
            key: 0,
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
                  x("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", yo, [
                (d(!0), y(I, null, R(n.columns, ($) => (d(), y("div", {
                  key: $.prop,
                  "data-prop": $.prop,
                  class: "row flex-center"
                }, [
                  m(r, null, {
                    default: c(() => [
                      m(a)
                    ]),
                    _: 1
                  }),
                  m(h, {
                    modelValue: $.show,
                    "onUpdate:modelValue": (E) => $.show = E,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  j("span", {
                    class: "label overflow-text",
                    title: $.label,
                    onClick: (E) => i.handleToggle($)
                  }, C($.label), 9, wo),
                  m(p, {
                    modelValue: $.width,
                    "onUpdate:modelValue": (E) => $.width = E,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  So
                ], 8, vo))), 128))
              ], 512)
            ]),
            _: 1
          })),
          i.hideSorts ? k("", !0) : (d(), f(S, {
            key: 1,
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
                  x("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", ko, [
                (d(!0), y(I, null, R(n.sorts, ($, E) => (d(), y("div", {
                  key: $[0],
                  "data-prop": $[0],
                  class: "row flex-center"
                }, [
                  m(b, {
                    modelValue: $[0],
                    "onUpdate:modelValue": (v) => $[0] = v,
                    options: n.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(g, {
                    modelValue: $[1],
                    "onUpdate:modelValue": (v) => $[1] = v,
                    options: n.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  m(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (v) => n.sorts.splice(E, 1)
                  }, null, 8, ["onClick"])
                ], 8, $o))), 128))
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
const St = /* @__PURE__ */ O(bo, [["render", Co], ["__scopeId", "data-v-a9d96f8a"]]), { highdict: xo } = StardustJs, Vo = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...U.props()
  },
  emits: [
    ...U.emits()
  ],
  components: { Searcher: qe, Settings: St },
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
        ...fe()
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
      const { remote: e, query: t, remoteMethod: s, search: l } = this._chartOption;
      if (l)
        return l();
      if (this.controller[s])
        return this.controller[s]();
      if (e && this.controller.getSearchParams) {
        const n = this.controller.getSearchParams({ page: 1, limit: 100, ...t }, !1), i = JSON.stringify(n);
        if (i === this._lastSearchParams)
          return this._lastList;
        this._lastSearchParams = i;
        const o = await this.controller.search(n);
        let a = xo.get(o, this.controller.listProp);
        return a = this.controller.formatList(this.controller._defaultFormatList(a, o), o), this._lastList = a, a;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, Eo = {
  key: 1,
  class: "collapse-title"
}, Ao = {
  key: 2,
  class: "collapse-title"
}, Oo = /* @__PURE__ */ j("span", null, "-", -1), jo = ["value", "checked"], To = ["href"], Fo = { key: 1 };
function Do(e, t, s, l, n, i) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), h = u("pc-x-table-tools"), p = u("el-image"), S = u("el-tag"), b = u("router-link"), g = u("el-icon"), A = u("el-table-column"), T = u("el-button"), $ = u("el-dropdown-item"), E = u("el-dropdown-menu"), v = u("el-dropdown"), L = u("el-table"), ne = u("x-pagination"), D = u("el-collapse-item"), B = u("el-collapse"), z = u("x-chart"), W = u("x-dialog"), q = G("domid"), ae = G("loading"), _e = G("el-table-infinite-scroll");
  return d(), y(I, null, [
    j("div", {
      class: J(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      m(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      m(B, {
        modelValue: n.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (w) => n.activeNames = w),
        class: J((n._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          m(D, {
            name: n.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), y("span", Eo, C(e.title), 1)) : (d(), y("span", Ao, [
                x(C(e.title) + "，当前第 ", 1),
                j("span", null, C(e._query.page), 1),
                x(" 页，展示 "),
                j("span", null, C(e._data.length), 1),
                x(" 条数据， 共 "),
                j("span", null, C(e._total || e._data.length), 1),
                x(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              V(e.$slots, "tools-top"),
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
                    onClick: t[0] || (t[0] = (...w) => e.handleMinus && e.handleMinus(...w))
                  }, [
                    m(a, { name: "FullScreen" }),
                    Oo
                  ]),
                  m(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  m(r, _({
                    modelValue: n.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (w) => n.settings = w)
                  }, { ...e._attrs.settings, ...e.$attrs }, {
                    visible: !e.hideSettings,
                    width: e._attrs["cols-popover-width"] || 500,
                    onSort: t[2] || (t[2] = (w) => e.$emit("sort", w)),
                    onReset: e.handleResetSettings,
                    onSortChange: e.handleSortChange
                  }), null, 16, ["modelValue", "visible", "width", "onReset", "onSortChange"])
                ]),
                _: 2
              }, [
                e.$slots["tools-prefix"] ? {
                  name: "tools-prefix",
                  fn: c(() => [
                    V(e.$slots, "tools-prefix")
                  ]),
                  key: "0"
                } : void 0,
                e.$slots["tools-suffix"] ? {
                  name: "tools-suffix",
                  fn: c(() => [
                    V(e.$slots, "tools-suffix")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["domids", "onAdd", "onKeywordsSearch", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
              V(e.$slots, "tools-bottom"),
              F((d(), f(L, _({
                ref: "tableRef",
                "element-loading-text": "加载中..."
              }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), y(I, null, R(e._visibleColumns, (w, K) => (d(), f(A, _({ ref_for: !0 }, w, {
                    key: K,
                    "min-width": w.minWidth,
                    align: w.align || e._attrs.tableAlign || "center",
                    resizable: w.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(w)
                  }), oe({ _: 2 }, [
                    ["selection", "index"].includes(w.type) ? void 0 : {
                      name: "default",
                      fn: c((P) => [
                        w.type === "radio" ? (d(), y("input", {
                          key: 0,
                          type: "radio",
                          value: P.$index,
                          checked: P.$index === n.checked,
                          onChange: t[3] || (t[3] = (...ye) => e.handleCheckedChange && e.handleCheckedChange(...ye))
                        }, null, 40, jo)) : w.slot === "$image" ? (d(), f(p, _({
                          key: 1,
                          src: e._imageSrc(P, w),
                          "preview-src-list": e._imagePreviewSrcList(P, w),
                          "preview-teleported": "",
                          ref_for: !0
                        }, w.imageAttrs), null, 16, ["src", "preview-src-list"])) : w.slot === "$tag" ? (d(), f(S, {
                          key: 2,
                          type: e.calcTagType(P, w)
                        }, {
                          default: c(() => [
                            x(C(e.calcTagValue(P, w)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : w.slot === "$link" ? (d(), f(b, {
                          key: 3,
                          to: w.to(P.row)
                        }, {
                          default: c(() => [
                            x(C(e.calcLink(P.row, w)), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"])) : w.slot === "$phone" ? (d(), y("a", {
                          key: 4,
                          href: `tel:${P.row[w.prop]}`
                        }, C(P.row[w.prop]), 9, To)) : w.slot === "$icon" ? (d(), f(g, {
                          key: 5,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(Z(P.row[w.prop])))
                          ]),
                          _: 2
                        }, 1024)) : w.slot ? V(e.$slots, w.slot, {
                          key: 6,
                          scope: P,
                          column: w,
                          value: P.row[w.prop]
                        }) : e.slotAll ? V(e.$slots, "all", {
                          key: 7,
                          scope: P,
                          column: w,
                          value: P.row[w.prop]
                        }) : (d(), y(I, { key: 8 }, [
                          w.comp === "ElSwitch" || e.table.isRowEdit && P.row.isEditing && (w.visible !== !1 || w.canEdit) ? (d(), f(Z(w.comp || "ElInput"), _({
                            key: 0,
                            ref_for: !0
                          }, { ...w, ...w.formAttrs }, {
                            modelValue: P.row[w.prop],
                            "onUpdate:modelValue": (ye) => P.row[w.prop] = ye,
                            disabled: !P.row.editable || !P.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), y("span", Fo, C(e.calcValue(P.row, w)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? k("", !0) : (d(), f(A, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((w) => [
                      V(e.$slots, "operates-prefix", { scope: w }),
                      e.operatesDropdown ? (d(), f(v, {
                        key: 0,
                        class: "operates-dropdown"
                      }, {
                        dropdown: c(() => [
                          m(E, { class: "operates-dropdown-menu" }, {
                            default: c(() => [
                              e.canEdit(w.row) ? (d(), f($, { key: 0 }, {
                                default: c(() => [
                                  F((d(), f(T, _({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    class: "x-table-edit",
                                    onClick: (K) => e._emit("edit", w)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [q, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canSave(w.row) ? (d(), f($, { key: 1 }, {
                                default: c(() => [
                                  F((d(), f(T, _({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: w.row._loading,
                                    icon: "collection",
                                    class: "x-table-row-edit",
                                    onClick: (K) => e._emit("row-edit", w)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [ae, w.row._loading],
                                    [q, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canCancelEdit(w.row) ? (d(), f($, { key: 2 }, {
                                default: c(() => [
                                  F((d(), f(T, _({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    class: "x-table-cancel-edit",
                                    onClick: (K) => e._emit("cancel-edit", w)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [q, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canDelete(w.row) ? (d(), f($, { key: 3 }, {
                                default: c(() => [
                                  F((d(), f(T, _({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    class: "x-table-delete",
                                    onClick: (K) => e._emit("delete", w)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["delete-btn-text"] ?? "删除"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [q, e.domids.delete]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: c(() => [
                          F((d(), f(T, _({ type: "primary", ...e._attrs["operates-btn"] }, {
                            icon: "arrow-down",
                            class: "x-table-operates"
                          }), {
                            default: c(() => [
                              x(C(e._attrs["operates-btn-text"] ?? "操作"), 1)
                            ]),
                            _: 1
                          }, 16)), [
                            [q, e.domids.operates]
                          ])
                        ]),
                        _: 2
                      }, 1024)) : k("", !0),
                      !e.operatesDropdown && e.canEdit(w.row) ? F((d(), f(T, _({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        class: "x-table-edit",
                        onClick: (K) => e._emit("edit", w)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [q, e.domids.edit]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canSave(w.row) ? F((d(), f(T, _({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: w.row._loading,
                        icon: "collection",
                        class: "x-table-row-edit",
                        onClick: (K) => e._emit("row-edit", w)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [ae, w.row._loading],
                        [q, e.domids["row-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canCancelEdit(w.row) ? F((d(), f(T, _({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        class: "x-table-cancel-edit",
                        onClick: (K) => e._emit("cancel-edit", w)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [q, e.domids["cancel-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canDelete(w.row) ? F((d(), f(T, _({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        class: "x-table-delete",
                        onClick: (K) => e._emit("delete", w)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["delete-btn-text"] ?? "删除"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [q, e.domids.delete]
                      ]) : k("", !0),
                      V(e.$slots, "operates-suffix", { scope: w })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["infinite-scroll-disabled", "onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [ae, e._loading],
                [_e, e._onLoad]
              ]),
              e._query && e._total && !e.hidePagination ? (d(), f(ne, {
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
    e.hideChart ? k("", !0) : (d(), f(W, {
      key: 0,
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (w) => n.dialog.visible = w),
      title: "图表",
      width: "96%",
      onFullscreenchange: i.handleChartDialogFullscreen
    }, {
      default: c(() => [
        m(z, {
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
const Io = /* @__PURE__ */ O(Vo, [["render", Do]]), Ro = {
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
}, Po = { class: "mobile-x-table-tools" }, Mo = { key: 0 }, Bo = { class: "tools" }, Lo = { class: "tools-end" };
function No(e, t, s, l, n, i) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), h = G("domid");
  return d(), y("div", Po, [
    e.$attrs.onAdd ? F((d(), y("div", Mo, [
      m(o, {
        axis: "xy",
        magnetic: "x",
        icon: "plus",
        class: "flex-center x-table-search",
        style: { position: "fixed", top: "0", "font-size": "22px", width: "40px", height: "40px", "background-color": "#1989fa", "border-radius": "50%", color: "white" },
        onClick: t[0] || (t[0] = (p) => e.$emit("add"))
      })
    ])), [
      [h, s.domids.add]
    ]) : k("", !0),
    j("div", Bo, [
      V(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? F((d(), f(r, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        class: "x-table-search",
        onClick: t[1] || (t[1] = (p) => e.$emit("search"))
      }), {
        default: c(() => [
          m(a, { name: "search" }),
          x(" 高级查询 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.search]
      ]) : k("", !0),
      e.$attrs.onMultiEdit ? F((d(), f(r, _({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        class: "x-table-edit",
        onClick: t[2] || (t[2] = (p) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          m(a, { name: "edit" }),
          x(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-edit"]]
      ]) : k("", !0),
      e.$attrs.onMultiDelete ? F((d(), f(r, _({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        class: "x-table-multi-delete",
        onClick: t[3] || (t[3] = (p) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          m(a, { name: "DeleteFilled" }),
          x(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["multi-delete"]]
      ]) : k("", !0),
      e.$attrs.onExport ? F((d(), f(r, _({ key: 3 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-export",
        onClick: t[4] || (t[4] = (p) => e.$emit("export"))
      }), {
        default: c(() => [
          m(a, { name: "printer" }),
          x(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.export]
      ]) : k("", !0),
      e.$attrs.onSearchExport ? F((d(), f(r, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-search-export",
        onClick: t[5] || (t[5] = (p) => e.$emit("search-export"))
      }), {
        default: c(() => [
          m(a, { name: "printer" }),
          x(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids["search-export"]]
      ]) : k("", !0),
      e.$attrs.onImport ? F((d(), f(r, _({ key: 5 }, { type: "warning", ...s.importBtn }, {
        class: "x-table-import",
        onClick: t[6] || (t[6] = (p) => e.$emit("import"))
      }), {
        default: c(() => [
          m(a, { name: "UploadFilled" }),
          x(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [h, s.domids.import]
      ]) : k("", !0),
      V(e.$slots, "tools-suffix", {}, void 0, !0),
      j("div", Lo, [
        V(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const Uo = /* @__PURE__ */ O(Ro, [["render", No], ["__scopeId", "data-v-dda9e446"]]), qo = {
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
}, zo = { class: "tools" }, Xo = { class: "tools-end flex-center" };
function Wo(e, t, s, l, n, i) {
  const o = u("el-input"), a = u("el-button"), r = u("el-card"), h = G("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      j("div", zo, [
        V(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onKeywordsSearch ? F((d(), f(o, {
          key: 0,
          modelValue: n.keywords,
          "onUpdate:modelValue": t[0] || (t[0] = (p) => n.keywords = p),
          placeholder: e.$attrs["keywords-placeholder"] || "输入关键词搜索",
          clearable: "",
          class: "keywords-search",
          onKeyup: t[1] || (t[1] = Pe((p) => e.$emit("keywords-search", n.keywords.trim()), ["enter"]))
        }, null, 8, ["modelValue", "placeholder"])), [
          [h, s.domids["keywords-search"]]
        ]) : k("", !0),
        e.$attrs.onSearch ? F((d(), f(a, _({ key: 1 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          class: "x-table-search",
          onClick: t[2] || (t[2] = (p) => e.$emit("search"))
        }), {
          default: c(() => [
            x(C(e.$attrs["search-btn-text"] ?? "高级查询"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.search]
        ]) : k("", !0),
        e.$attrs.onAdd ? F((d(), f(a, _({ key: 2 }, { type: "primary", ...s.addBtn }, {
          icon: "circle-plus-filled",
          class: "x-table-add",
          onClick: t[3] || (t[3] = (p) => e.$emit("add"))
        }), {
          default: c(() => [
            x(C(e.$attrs["add-btn-text"] ?? "新增"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.add]
        ]) : k("", !0),
        e.$attrs.onMultiEdit ? F((d(), f(a, _({ key: 3 }, { type: "warning", ...s.multiEditBtn }, {
          icon: "edit",
          class: "x-table-edit",
          onClick: t[4] || (t[4] = (p) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            x(C(e.$attrs["edit-btn-text"] ?? "编辑"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-edit"]]
        ]) : k("", !0),
        e.$attrs.onMultiDelete ? F((d(), f(a, _({ key: 4 }, { type: "danger", ...s.multiDeleteBtn }, {
          icon: "DeleteFilled",
          class: "x-table-multi-delete",
          onClick: t[5] || (t[5] = (p) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            x(C(e.$attrs["multi-delete-btn-text"] ?? "批量删除"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["multi-delete"]]
        ]) : k("", !0),
        e.$attrs.onExport ? F((d(), f(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-export",
          onClick: t[6] || (t[6] = (p) => e.$emit("export"))
        }), {
          default: c(() => [
            x(C(e.$attrs["export-btn-text"] ?? "导出"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.export]
        ]) : k("", !0),
        e.$attrs.onSearchExport ? F((d(), f(a, _({ key: 6 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-search-export",
          onClick: t[7] || (t[7] = (p) => e.$emit("search-export"))
        }), {
          default: c(() => [
            x(C(e.$attrs["search-export-btn-text"] ?? "查询导出"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids["search-export"]]
        ]) : k("", !0),
        e.$attrs.onImport ? F((d(), f(a, _({ key: 7 }, { type: "warning", ...s.importBtn }, {
          icon: "UploadFilled",
          class: "x-table-import",
          onClick: t[8] || (t[8] = (p) => e.$emit("import"))
        }), {
          default: c(() => [
            x(C(e.$attrs["import-btn-text"] ?? "导入"), 1)
          ]),
          _: 1
        }, 16)), [
          [h, s.domids.import]
        ]) : k("", !0),
        V(e.$slots, "tools-suffix", {}, void 0, !0),
        j("div", Xo, [
          V(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Ho = /* @__PURE__ */ O(qo, [["render", Wo], ["__scopeId", "data-v-3d6b703b"]]);
function kt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ot(e);
}
const Jo = (e) => {
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
}, Ko = (e, t) => {
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
}, Yo = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, Go = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return m("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, be = ([e, t, s, l, n, i]) => {
  const {
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return m(u("el-button"), _({
    type: l
  }, t._attrs[s + "-btn"], {
    icon: n,
    onClick: r
  }), kt(i) ? i : {
    default: () => [i]
  });
}, Qo = (e, t) => {
  if (t.canEdit(e.rowData))
    return be([e, t, "edit", "warning", "edit", "编辑"]);
}, Zo = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return be([e, t, "row-edit", "success", "collection", "保存"]);
}, ea = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return be([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, ta = (e, t) => {
  if (t.canDelete(e.rowData))
    return be([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, sa = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => Ko(i, t);
  if (e.type === "index")
    return (i) => Yo(i, t);
  if (e.type === "radio")
    return (i) => Go(i, t);
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
      const p = (b) => {
        o[a.prop] = b;
      }, S = a.comp || "ElInput";
      return ee(u(S), {
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
    }, kt(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, na = (e, t) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Jo(t)), r.cellRenderer = sa(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 150,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(i) {
      return m("div", {
        class: "operates"
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, Qo(i, t), Zo(i, t), ea(i, t), ta(i, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), n;
}, ia = {
  convertColumnsForTableV2: na
}, la = {
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
  components: { Searcher: qe, Settings: St },
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
    convertColumnsForTableV2: ia.convertColumnsForTableV2
  }
}, oa = { key: 1 };
function aa(e, t, s, l, n, i) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), h = u("x-table-tools"), p = u("el-table-v2"), S = u("el-auto-resizer"), b = u("x-pagination"), g = u("el-collapse-item"), A = u("el-collapse"), T = G("loading");
  return d(), y("div", {
    class: J(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    m(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = ($) => e._emit("search", $))
    }, null, 8, ["uid", "columns", "config"]),
    m(A, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = ($) => n.activeNames = $),
      class: J((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        m(g, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), y("span", oa, C(e.title), 1))
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
                m(a, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                m(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = ($) => n.settings = $),
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
                  V(e.$slots, "tools-prefix")
                ]),
                key: "0"
              } : void 0,
              e.$slots["tools-suffix"] ? {
                name: "tools-suffix",
                fn: c(() => [
                  V(e.$slots, "tools-suffix")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
            m(S, {
              style: xt({ height: s.height })
            }, {
              default: c(({ width: $, height: E }) => [
                F((d(), f(p, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: $,
                  height: E
                }), oe({ _: 2 }, [
                  e.$slots.footer ? {
                    name: "footer",
                    fn: c(() => [
                      V(e.$slots, "footer")
                    ]),
                    key: "0"
                  } : void 0,
                  e.$slots.empty ? {
                    name: "empty",
                    fn: c(() => [
                      V(e.$slots, "empty")
                    ]),
                    key: "1"
                  } : void 0,
                  e.$slots.overlay ? {
                    name: "overlay",
                    fn: c(() => [
                      V(e.$slots, "overlay")
                    ]),
                    key: "2"
                  } : void 0
                ]), 1040, ["data", "columns", "fixed", "width", "height"])), [
                  [T, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(b, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = ($) => e._emit("search"))
            }, null, 8, ["query", "total"])) : k("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const ra = /* @__PURE__ */ O(la, [["render", aa]]), Ce = ["selection", "radio"], da = {
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
      Ce.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !Ce.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (Ce.includes(t)) {
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
}, ca = { class: "x-table-viewer" };
function ua(e, t, s, l, n, i) {
  const o = u("x-dialog");
  return d(), y("div", ca, [
    m(o, _(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: c(() => [
        (d(), f(Z(s.useTableV2 ? "x-table-v2" : "x-table"), _({
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
const ha = /* @__PURE__ */ O(da, [["render", ua], ["__scopeId", "data-v-e6f36700"]]), pa = {
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
}, ma = { class: "mobile-x-tags" };
function fa(e, t, s, l, n, i) {
  const o = u("van-tag");
  return d(), y("div", ma, [
    (d(!0), y(I, null, R(i._data, (a, r) => (d(), f(o, _({
      key: r,
      ref_for: !0
    }, { ...e.$attrs, item: a }, {
      onClose: (h) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        x(C(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const ga = /* @__PURE__ */ O(pa, [["render", fa], ["__scopeId", "data-v-d8beefdf"]]), ba = {
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
}, _a = { class: "pc-x-tags" };
function ya(e, t, s, l, n, i) {
  const o = u("el-tag");
  return d(), y("div", _a, [
    (d(!0), y(I, null, R(i._data, (a, r) => (d(), f(o, _({
      key: r,
      ref_for: !0
    }, { ...e.$attrs, item: a }, {
      type: a.type || e.$attrs.type,
      onClose: (h) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        x(C(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["type", "onClose"]))), 128))
  ]);
}
const va = /* @__PURE__ */ O(ba, [["render", ya], ["__scopeId", "data-v-6c839bc3"]]), wa = {
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
      id: "tm-" + Date.now().toString(16)
    };
  },
  watch: {
    modelValue(e) {
      var t;
      e !== this._content && ((t = this.instance) == null || t.setContent(e));
    }
  },
  mounted() {
    this.initEditor();
  },
  beforeUnmount() {
    this.instance && (this.instance.destroy(), this.instance = null);
  },
  methods: {
    async initEditor() {
      const e = await window.tinymce.init({
        language: "zh_CN",
        language_url: "./lib/tinymce/zh_CN.js",
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
      }), t = e[e.length - 1];
      t.on("change", (s) => {
        this._content = t.getContent(), this.$emit("update:modelValue", this._content);
      }), t.on("input", (s) => {
        this._content = s.target.innerHTML, this.$emit("update:modelValue", this._content);
      }), this.instance = t, window._tinymce_instances_ = e;
    }
  }
}, Sa = { class: "x-tinymce" }, ka = ["id", "innerHTML"];
function $a(e, t, s, l, n, i) {
  return d(), y("div", Sa, [
    j("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, ka)
  ]);
}
const Ca = /* @__PURE__ */ O(wa, [["render", $a]]), xa = {
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
}, ze = (e) => (Ie("data-v-a3a105f3"), e = e(), Re(), e), Va = { class: "mask" }, Ea = {
  key: 0,
  class: "el-upload__text"
}, Aa = /* @__PURE__ */ ze(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), Oa = /* @__PURE__ */ ze(() => /* @__PURE__ */ j("br", null, null, -1)), ja = /* @__PURE__ */ ze(() => /* @__PURE__ */ j("br", null, null, -1)), Ta = {
  key: 0,
  class: "path"
};
function Fa(e, t, s, l, n, i) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
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
    default: c(() => [
      j("div", Va, [
        m(o, { name: "upload-filled" }),
        n.disabled ? k("", !0) : (d(), y("div", Ea, [
          x(" 将文件拖到此处，或"),
          Aa,
          Oa,
          ja,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: Y(i.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              x(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : k("", !0)
        ]))
      ]),
      i.filepath ? (d(), y("div", Ta, C(s.modelValue), 1)) : k("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Da = /* @__PURE__ */ O(xa, [["render", Fa], ["__scopeId", "data-v-a3a105f3"]]), Ia = {
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
      N({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, Ra = ["src"];
function Pa(e, t, s, l, n, i) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), h = u("x-dialog");
  return d(), y(I, null, [
    m(r, _({
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
      actionsheet: "",
      title: "预览图片" + (n.previewingImage.name || "")
    }, {
      default: c(() => [
        j("img", {
          src: n.previewingImage.url,
          alt: "previewing-image",
          class: "previewing-image"
        }, null, 8, Ra)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const Ma = /* @__PURE__ */ O(Ia, [["render", Pa], ["__scopeId", "data-v-0afe3ea6"]]), xe = {
  xarray: ss,
  xautorows: as,
  mobilexbutton: cs,
  pcxbutton: ps,
  xchart: Is,
  mobilexcheckboxs: Ms,
  pcxcheckboxs: Us,
  mobilexcol: Xs,
  pcxcol: Js,
  mobilexdialog: Zs,
  pcxdialog: nn,
  xdict: rn,
  xdistrictselect: un,
  mobilexform: wn,
  pcxform: Cn,
  mobilexformitem: An,
  pcxformitem: On,
  mobilexicon: Dn,
  pcxicon: Mn,
  xinfo: sl,
  xlooper: ol,
  mobilexpagination: dl,
  pcxpagination: hl,
  xpicker: fl,
  mobilexradios: _l,
  pcxradios: Sl,
  mobilexrow: xl,
  pcxrow: Ol,
  mobilexscan: Fl,
  pcxscan: Rl,
  mobilexselect: Bl,
  pcxselect: Xl,
  xselectv2: Gl,
  mobilextable: go,
  pcxtable: Io,
  mobilextabletools: Uo,
  pcxtabletools: Ho,
  xtablev2: ra,
  xtableviewer: ha,
  mobilextags: ga,
  pcxtags: va,
  xtinymce: Ca,
  xfileuploader: Da,
  ximageuploader: Ma
}, re = {};
for (let e in xe)
  re[xe[e].name] = xe[e];
const { ElInfiniteScroll: nt } = window.ElementPlus || {}, pe = ".el-scrollbar__wrap", it = (e, t) => {
  Ba(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", l = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (l < 1 ? 1 : l) + "");
}, Ba = (e, t, s) => {
  let l;
  s.forEach((n) => {
    l = e.getAttribute(n), l !== null ? t.setAttribute(n, l) : t.removeAttribute(n);
  });
}, La = {
  name: "el-table-infinite-scroll",
  mounted(e, t, s, l) {
    const n = e.querySelector(pe);
    if (!n)
      throw new Error(`${pe} element not found.`);
    n.style.overflowY = "auto", setTimeout(() => {
      !e.style.height && !e.style.maxHeight && (n.style.height = "400px", console.warn("el-table height required, otherwise will set scrollbar default height: 400px")), it(e, n), nt.mounted(n, t, s, l);
    }, 0);
  },
  updated(e) {
    it(e, e.querySelector(pe));
  },
  unmounted(e, ...t) {
    const s = e.querySelector(pe);
    nt.unmounted(s, ...t);
  }
}, Ve = {
  ElTableInfiniteScroll: La
}, Na = (e) => ({
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
    return ee(re[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), Te = (() => {
  const e = Object.keys(re), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = re[l]);
  for (const l of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(l.toLowerCase())) ? s[l] = Na(l) : s[l] = re[l];
  return s;
})(), Ua = (e, t) => {
  for (let s in Te)
    e.component(s, Te[s]);
  for (let s in Ve)
    e.directive(Ve[s].name, Ve[s]);
}, za = {
  version: "1.8.7",
  ...Te,
  ...gt,
  ...Yt,
  install: Ua
};
export {
  bt as BaseController,
  Q as Confirm,
  _t as CrudController,
  N as Message,
  me as Notify,
  Rt as Prompt,
  Kt as TempCrudController,
  fe as baseDialog,
  de as baseForm,
  Ut as baseModel,
  dt as baseTable,
  Yt as controllers,
  za as default,
  At as effects,
  X as formatOptions,
  Ot as formatPrecision,
  pt as initDefaultForm,
  ut as initDialog,
  qt as initFields,
  ce as initForm,
  ht as initFormRules,
  zt as initModel,
  ct as initTable,
  mt as isWhenMatched,
  ft as triggers,
  gt as utils,
  at as validateForm
};
