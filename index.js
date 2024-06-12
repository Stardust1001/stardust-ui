import { toRaw as St, markRaw as le, nextTick as oe, watch as De, resolveComponent as u, openBlock as d, createElementBlock as v, createElementVNode as F, createVNode as p, withCtx as c, createTextVNode as x, Fragment as P, renderList as M, mergeProps as _, createBlock as f, renderSlot as V, toDisplayString as C, useCssVars as Ie, resolveDirective as ee, withDirectives as I, createCommentVNode as $, vShow as We, pushScopeId as Re, popScopeId as Pe, resolveDynamicComponent as se, createSlots as re, withModifiers as Z, normalizeClass as Y, h as ne, isVNode as ot, normalizeProps as kt, withKeys as Me, normalizeStyle as $t } from "vue";
const Ct = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class n {
    constructor(N, z, H, j, R, Q, S) {
      this.x = N, this.y = z, this.radius = H, this.color = j, this.vx = R, this.vy = Q, this.ctx = S;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => l.clearRect(0, 0, t, s), a = (T) => Math.floor(Math.random() * T);
  let o = 0, r = 0.01, m = 0;
  const h = () => {
    const T = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    m ? m-- : (o += r, o <= 0 && (o = 0, r = -r, m = y * 30), o >= 1 && (o = 1, r = -r, m = y * 30)), T.addColorStop(0, "rgba(250, 220, 20, 0.5)"), T.addColorStop(o, "rgba(20, 20, 20, 0.5)"), l.fillStyle = T, l.fillRect(0, 0, t, s);
  }, w = Math.floor(t / 100), g = Math.floor(s / 100), y = 20, D = Math.round(1e3 / y), E = Array.from({ length: 52 }).map(() => {
    const T = Math.floor(a(w + g) * 1.5 + a(5));
    let N = a(t), z = a(s);
    N = Math.min(Math.max(T, N), t - T), z = Math.min(Math.max(T, z), s - T);
    let H = a(2) ? (a(2) + 2) * w : (a(-1) - 2) * w, j = a(2) ? (a(2) + 2) * g : (a(-1) - 2) * g;
    return H = Math.floor(H / y), j = Math.floor(j / y), new n(
      N,
      z,
      T,
      `rgba(${a(256)}, ${a(256)}, ${a(256)}, ${(a(5) + 5) / 10})`,
      H,
      j,
      l
    );
  });
  let k, A;
  e.addEventListener("mouseover", (T) => {
    k = T.pageX, A = T.pageY;
  }), e.addEventListener("mousemove", (T) => {
    if (k === void 0) {
      k = T.pageX, A = T.pageY;
      return;
    }
    const N = T.pageX - k, z = T.pageY - A;
    E.forEach((H) => {
      H.x += N / y, H.y += z / y;
    }), k = T.pageX, A = T.pageY;
  });
  let b = Date.now(), U = null;
  const G = () => {
    Date.now() - b >= D && (i(), h(), E.forEach((T) => T.update()), b = Date.now()), U = requestAnimationFrame(G);
  };
  return U = requestAnimationFrame(G), () => cancelAnimationFrame(U);
}, xt = ({
  text: e,
  gap: t,
  fontSize: s,
  color: l,
  width: n = window.innerWidth,
  height: i = window.innerHeight,
  drawMode: a = "fill"
}) => {
  const o = document.createElement("canvas");
  o.width = n, o.height = i;
  const r = o.getContext("2d");
  r.font = `${s}px Arial`, r[a + "Style"] = l;
  const h = r.measureText(e).width + t, w = s + t;
  for (let g = t / 2; g < i; g += w)
    for (let y = t / 2; y < n; y += h)
      r[a + "Text"](e, y, g);
  return o;
}, Vt = {
  pop: Ct,
  createWatermark: xt
}, at = async (e) => {
  var l, n;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((i) => {
    var a, o;
    return ((a = i.comp) == null ? void 0 : a.endsWith("XForm")) || ((o = i.comp) == null ? void 0 : o.endsWith("x-form"));
  }).map((i) => at(i.form)));
  return t && s.every((i) => i);
}, Et = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, J = (e, t) => {
  const s = e.__v_isRef ? e.value : St(e), { text: l = "text", value: n = "value" } = t, i = s.map((o) => typeof o == "object" ? { text: o[l], value: o[n], disabled: o.disabled, raw: le(o) } : { text: o, value: o });
  if (!t.sort)
    return i;
  const a = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((o, r) => o[a].localeCompare(r[a]));
}, { ElMessage: At, ElNotification: Ot, ElMessageBox: jt } = window.ElementPlus || {}, { showToast: Ft, showNotify: Tt, showConfirmDialog: Dt } = window.vant || {}, X = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? ((l === "error" || l === "warning") && (t.type = "fail"), t["z-index"] || (t["z-index"] = 1e6), Ft(t)) : At({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, fe = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: l } = t;
  s ? (l === "error" && (t.type = "danger"), Tt(t)) : Ot({
    showClose: !0,
    ...t
  });
}, te = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = Dt(e) : t = jt.confirm(
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
  X[e] = X[e[0]] = (t) => X({ type: e, ...typeof t != "string" ? t : { message: t } }), fe[e] = fe[e[0]] = (t) => fe({ type: e, ...typeof t != "string" ? t : { message: t } }), te[e] = te[e[0]] = (t) => te({ type: e, ...t });
const { funcs: It } = StardustJs, Rt = (e, t, s) => {
  e.beforeEach(async (l, n) => !!l.matched.length || "/404");
}, Pt = (e, t, s) => {
  e.afterEach((l, n) => {
    var i;
    document.title = ((i = l.matched[l.matched.length - 1].meta) == null ? void 0 : i.title) || t.app.sitename;
  });
}, Mt = (e, t, s) => {
  e.beforeEach(async (l, n) => {
    var o;
    const i = l.matched[l.matched.length - 1].path.split("/:")[0];
    if (l.meta.acl === !1 || (o = l.meta) != null && o.visitable)
      return !0;
    for (; t.getters.logging; )
      await It.sleep(20);
    if (await oe(), t.acl.paths.includes(i))
      return !0;
    const a = { redirectTo: l.path, ...l.query };
    return t.getters.logined && (a.error = "受限于您的账号权限，暂时无法访问 " + l.path + " 页面，如有需要请联系我们", X({ message: a.error, duration: 1e4 })), { path: t.acl.paths[0] || "/404", query: a };
  }), oe(() => {
    let l = !1;
    De(() => t.acl.menus, (n) => {
      if (!l) {
        if (!n.length)
          return;
        l = !0;
      }
      const i = t.acl.paths, a = (o, r) => {
        var h, w, g, y, D, E, k;
        let m;
        o.redirect && !o.component ? m = o.redirect : m = [...r, o].reduce((A, b) => A + "/" + b.path, "").replace("//", "/"), o.meta || (o.meta = {}), o.meta.acl === !1 ? (h = o.children) == null || h.forEach((A) => {
          var b;
          A.meta || (A.meta = {}), (b = A.meta).acl || (b.acl = !1), a(A, [...r, o]);
        }) : (o.meta._hidden = o.meta.hidden, parent && (o.meta.hidden == null && ((g = o.meta).hidden ?? (g.hidden = (w = parent.meta) == null ? void 0 : w.hidden), o.meta = { ...o.meta }), o.meta.visitable == null && ((D = o.meta).visitable ?? (D.visitable = (y = parent.meta) == null ? void 0 : y.visitable), o.meta = { ...o.meta })), (E = o.children) == null || E.forEach((A) => a(A, [...r, o])), o.meta.hidden !== !1 && o.meta._hidden !== !0 && (o.meta.hidden = !i.includes(m), (k = o.children) != null && k.some((A) => A.meta.hidden === !1) && (o.meta.hidden = !1)));
      };
      s.forEach((o) => a(o, []));
    }, { immediate: !0 });
  });
}, Nt = {
  check404: Rt,
  setTitle: Pt,
  checkRolesPages: Mt
}, ce = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), rt = (e = {}) => ({
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
}), ge = () => ({
  ...ce(),
  visible: !1,
  isEditing: !1,
  editingIndex: "",
  editingRow: {},
  _isBaseDialog: !0
}), Bt = ({
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
    ...rt(l),
    ...e,
    columns: s
  },
  dialog: {
    ...ge(),
    ...t,
    form: n
  }
}), { funcs: Ae } = StardustJs, Lt = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let l of s)
    l.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[l.slice(3)] = t[l], delete t[l]) : l.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[l.slice(3)] = t[l], delete t[l]);
  return t;
}), Ut = (e, t) => {
  for (let s in e) {
    const l = e[s];
    !l || typeof l != "object" || (s === "table" && e[s]._isBaseTable && dt(l, t), s === "dialog" && e[s]._isBaseDialog && ct(l, t), s === "form" && e[s]._isBaseForm && ue(l, t));
  }
  return e;
}, dt = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), ct = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), ue(e, t), e), ue = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((l) => l.visible !== !1)), ht(e.form, e.formItems), e.initialForm = Ae.deepCopy(e.form), e.initialFormRules = Ae.deepCopy(e.formRules), De(() => e.formItems, () => {
  ut(e);
}, { immediate: !0, deep: !0 }), e), ut = (e) => {
  const { formItems: t, initialFormRules: s } = e, l = t.filter((i) => {
    let { formAttrs: a = {}, required: o = !1 } = i;
    return o = "required" in a ? a.required : o, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && o !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, Ae.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !l.length)
    return;
  const n = {};
  return l.forEach((i) => {
    if (e.formRules[i])
      return;
    const a = t.find((y) => y.prop === i), o = a.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = pt[o], m = [], h = "options" in a, g = { required: !0, message: `请${a.validator || a.asyncValidator ? "正确" : ""}${h ? "选择" : "输入"}${(a == null ? void 0 : a.label) || i}` };
    a.validator && (g.validator = (y, D) => o === "pc" ? a.validator(y, D) : a.validator(D, y)), a.asyncValidator && (g.asyncValidator = (y, D) => o === "pc" ? a.asyncValidator(y, D) : a.asyncValidator(D, y)), a.comp ? m.push({ ...g, trigger: r.change }) : m.push({ ...g, trigger: r.blur }), a.comp === "ElInputNumber" && m.push({ ...g, trigger: r.blur }), n[i] = m;
  }), Object.assign(e.formRules, n), e.formRules;
}, ht = (e, t, s = !0) => {
  const l = {};
  return t.forEach((n) => {
    var m, h;
    let i = "";
    const { type: a, options: o } = n, { multiple: r } = n.formAttrs || {};
    if (s && a === "number" || n.comp === "ElInputNumber")
      i = 0;
    else if (n.comp === "ElSwitch")
      i = !1;
    else if (o && ((m = n.comp) != null && m.endsWith("XCheckboxs") || (h = n.comp) != null && h.endsWith("x-checkboxs") || r))
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
}, mt = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [l, n] = e.split(s);
  n = n.split("|");
  let i = t[l];
  typeof i == "number" ? i += "" : typeof i == "string" && (i = i.trim());
  const a = e.match(s)[0];
  return n.some((o) => a === "^=" ? i.startsWith(o) : a === "*=" ? i.includes(o) : a === "$=" ? i.endsWith(o) : a === "~=" ? !i.includes(o) : a === "!=" ? i !== o : o === i);
}, pt = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, ft = {
  effects: Vt,
  validateForm: at,
  formatPrecision: Et,
  formatOptions: J,
  Message: X,
  Notify: fe,
  Confirm: te,
  middlewares: Nt,
  baseForm: ce,
  baseTable: rt,
  baseDialog: ge,
  baseModel: Bt,
  initFields: Lt,
  initModel: Ut,
  initTable: dt,
  initDialog: ct,
  initForm: ue,
  initFormRules: ut,
  initDefaultForm: ht,
  isWhenMatched: mt,
  triggers: pt
}, { funcs: ve, highdict: qt, dates: zt } = window.StardustJs, { storage: we } = window.StardustBrowser, Xt = [
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
class gt {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const l = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => l }
      }), this._initLifeHooks();
    }
    oe(this.onInit);
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
    return ft;
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
    return zt;
  }
  get $highdict() {
    return qt;
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
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.getOwnPropertyDescriptors(this.__proto__), l = Object.keys(s).filter((a) => a !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...l])).filter((a) => typeof this[a] == "function").forEach((a) => {
      this[a] = this[a].bind(this);
    });
  }
  _initLifeHooks() {
    Xt.forEach((t) => {
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
const { funcs: He, highdict: Se, dates: ke } = StardustJs, { file: Je, excel: he } = StardustBrowser;
class bt extends gt {
  constructor(t) {
    super(t);
    const { model: s, table: l, dialog: n, dbModelName: i = "", idField: a = "id", listProp: o = "data" } = t;
    this.table = l || (s == null ? void 0 : s.table), this.dialog = n || (s == null ? void 0 : s.dialog), this.dbModelName = i, this.idField = a, this.listProp = o, this._isSubmitting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], oe(() => {
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
      "_showError"
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
      t.forEach((a) => {
        n.push({ [i]: { "[Op.like]": "%" + a + "%" } });
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
    }), await oe(), await He.sleep(50), this._clearValidate(), this.afterAdd());
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
    if (this.table.loading || !await this.beforeDelete({ $index: t, row: s }) || !await te.w({ message: "确定要删除吗？", title: "警告" }))
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
      X("不支持的导出类型");
      return;
    }
    this.table.loading = !0;
    const { list: l, selection: n, ref: i } = this.table;
    let a = n.length > 0 ? n : l;
    a = He.deepCopy(a), a = this.processExportingData(a);
    const o = this.processExportingColumns(i._visibleColumns, "current"), r = o.map((g) => g.prop), m = o.map((g) => g.label);
    a = a.map((g) => r.map((y) => g[y]));
    let h = null;
    t === "csv" ? h = he.export2Csv : h = he.export2Excel;
    let w = { list: l, header: m, data: a, filename: s };
    w = await this.processExporting(w), h(w), this.table.loading = !1;
  }
  async handleSearchExport(t = this.exportType, s) {
    if (s || (s = this.table.ref.title || document.title), this.table.loading) {
      X.w("导出中...");
      return;
    }
    if (t = t || this.config.exportType || "csv", !["csv", "excel"].includes(t)) {
      X("不支持的导出类型");
      return;
    }
    this.table.loading = !0;
    const l = await this.dbTable.search(this.getSearchExportParams());
    let n = l.data;
    n = this.formatList(n, l), n = this.processExportingData(n, "search");
    const i = this.processExportingColumns(this.table.ref._visibleColumns, "search-export"), a = i.map((h) => h.prop), o = i.map((h) => h.label);
    n = n.map((h) => a.map((w) => h[w]));
    let r = null;
    t === "csv" ? r = he.export2Csv : r = he.export2Excel;
    let m = { list: l.data, header: o, data: n, filename: s };
    m = await this.processExporting(m), r(m), this.table.loading = !1;
  }
  async handleImport() {
    var i, a;
    if (this.table.loading)
      return;
    const t = await Je.select(".xlsx,.csv");
    this.table.loading = !0;
    const s = t.name.toLowerCase().endsWith(".csv"), l = await Je.toType(t, s ? "text" : "arraybuffer");
    let n = [];
    if (s)
      await ((i = window.DynamicLibs) == null ? void 0 : i.use("Papa")), n = window.Papa.parse(l, { header: !0 }).data;
    else {
      await ((a = window.DynamicLibs) == null ? void 0 : a.use("XLSX"));
      const o = window.XLSX.read(l, {}), r = Object.values(o.Sheets);
      n = XLSX.utils.sheet_to_json(r[0]);
    }
    if (n.length > 0) {
      const o = {};
      this.table.columns.forEach((m) => o[m.label] = m.prop);
      const r = Object.keys(n[0]);
      n = n.map((m) => {
        const h = {};
        return r.forEach((w) => h[o[w]] = m[w]), h;
      });
    }
    n = this.processImportingData(n), await this.dbTable.func(["bulkCreate", n]), X.s("导入成功"), this.table.loading = !1, this.handleSearch();
  }
  async handleMultiDelete() {
    if (this.table.loading)
      return;
    const { selection: t } = this.table;
    if (!t.length) {
      X.w("尚未选择要删除的数据");
      return;
    }
    if (!await te.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
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
      X.w("正在保存...");
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
    return this._isSubmitting = !1, n.err || X.s("保存成功"), this.router.go(-1), n;
  }
  async handleSubmit(t) {
    if (t = t instanceof Event ? null : t, this._isSubmitting)
      return X.w("正在提交..."), !1;
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
      const { page: i, limit: a, order: o, count: r, ...m } = s;
      this.dbTable.func(["count", m]).then((h) => this.table.total = h.data);
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
    const { columns: l, query: n } = this.table, { page: i, limit: a } = n;
    return t.forEach((o, r) => {
      o._idx = r + 1, o._index = (i - 1) * a + r + 1;
    }), l.forEach((o) => {
      let { prop: r, options: m } = o;
      const { format: h, autoFill: w } = o.tableAttrs || {}, { modelName: g } = o.formAttrs || {};
      if (g && w)
        t.forEach((y) => y[`_formatted_${r}`] = ""), this._fillRelatedField(t, o);
      else if (Array.isArray(m) && h !== !1) {
        const D = De(() => o.options, (E, k) => {
          const A = k ? this.table.list : t, b = Wt(o);
          A.forEach((U, G) => {
            const T = U[r];
            U[`_formatted_${r}`] = b[T] || T;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(D);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const l = [...new Set(t.map((m) => m[s.prop]))];
    if (!l.length)
      return;
    const { modelName: n, text: i, value: a } = s.formAttrs, o = await this.service.restful.search(n, {
      limit: -1,
      attributes: [i, a],
      where: {
        [a]: {
          "[Op.in]": l
        }
      }
    });
    if (!o.data.length)
      return;
    const r = Se.mapField(o.data, a, i);
    this.table.list.forEach((m) => {
      m[`_formatted_${s.prop}`] = r[m[s.prop]];
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
      let { formatter: a = i.formatter, tagValues: o = i.tagValues, options: r = i.options } = i.tableAttrs || {};
      !a && typeof o == "function" && (a = o), l[i.prop] = { formatter: a, tagValues: o, options: r };
    });
    const n = [...new Set(Object.keys(t[0]).concat(this.table.ref._visibleColumns.map((i) => i.prop).filter((i) => i)))];
    return t.forEach((i) => {
      n.forEach((a) => {
        var r, m, h, w;
        const o = i[a];
        if (i.hasOwnProperty("_formatted_" + a))
          return i[a] = i["_formatted_" + a];
        if ((r = l[a]) != null && r.formatter)
          return i[a] = l[a].formatter(o);
        if ((m = l[a]) != null && m.tagValues)
          return i[a] = l[a].tagValues[o];
        if ((h = l[a]) != null && h.options)
          return i[a] = ((w = l[a].options.find((g) => g.value === i[a])) == null ? void 0 : w.text) ?? i[a];
        typeof o == "boolean" ? i[a] = o && 1 || 0 : o instanceof Date ? (i[a] = ke.format(o), i[a].endsWith(" 00:00:00") && (i[a] = i[a].slice(0, -9))) : o === void 0 && (i[a] = Se.get(i, a));
      });
    }), t.forEach((i) => {
      n.forEach((a) => {
        i[a] && typeof i[a] == "object" && (i[a] = JSON.stringify(i[a]));
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
    return Object.values(t).some((n) => !s.includes(n)) ? !0 : te.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    X(typeof t == "object" ? t.message || t.err || t.toString() : t);
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
const Wt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: l = "text", value: n = "value" } = s, i = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((a) => {
    i[a[n]] = a[l];
  }), i;
};
class Ht extends bt {
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
const Jt = {
  BaseController: gt,
  CrudController: bt,
  TempCrudController: Ht
}, O = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [l, n] of t)
    s[l] = n;
  return s;
}, Kt = {
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
      const e = ce(), t = Math.floor(24 / this.items.length), s = this.items.map((l) => ({ span: l.span || t, ...l }));
      return ue(e, s), e;
    },
    handleAdd() {
      this.groups.push(this.makeForm());
    },
    handleCopy(e, t) {
      this.groups.push(JSON.parse(JSON.stringify(e)));
    },
    async handleClear() {
      await te.w({ message: "确定删除全部组吗？", title: "警告" }) && (this.groups = []);
    }
  }
}, Yt = { class: "x-array" }, Gt = { class: "group-operates" }, Qt = { class: "groups" };
function Zt(e, t, s, l, n, i) {
  const a = u("x-icon"), o = u("x-button"), r = u("x-form");
  return d(), v("div", Yt, [
    F("div", Gt, [
      p(o, {
        type: "primary",
        plain: "",
        class: "add-item",
        onClick: i.handleAdd
      }, {
        default: c(() => [
          p(a, {
            name: "Plus",
            class: "icon"
          }),
          x("添加一组 ")
        ]),
        _: 1
      }, 8, ["onClick"]),
      p(o, {
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
    F("div", Qt, [
      (d(!0), v(P, null, M(n.groups, (m, h) => (d(), v("div", {
        key: h,
        class: "group"
      }, [
        p(r, _({
          form: m,
          "hide-labels": "",
          gutter: 10,
          ref_for: !0
        }, e.$attrs, { class: "form" }), null, 16, ["form"]),
        p(o, {
          type: "success",
          plain: "",
          icon: "CopyDocument",
          onClick: (w) => i.handleCopy(m, h),
          class: "button"
        }, null, 8, ["onClick"]),
        p(o, {
          type: "danger",
          plain: "",
          icon: "DeleteFilled",
          onClick: (w) => n.groups.splice(h, 1),
          class: "button"
        }, null, 8, ["onClick"])
      ]))), 128))
    ])
  ]);
}
const es = /* @__PURE__ */ O(Kt, [["render", Zt], ["__scopeId", "data-v-424f69b7"]]), ts = {
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
}, ss = { class: "x-auto-rows" }, ns = { key: 1 };
function is(e, t, s, l, n, i) {
  const a = u("x-col"), o = u("x-row");
  return d(), v("div", ss, [
    (d(!0), v(P, null, M(i.rows, (r, m) => (d(), f(o, _({
      key: m,
      ref_for: !0
    }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), v(P, null, M(r, (h, w) => (d(), f(a, _({ ref_for: !0 }, h, {
          span: i.isMobile ? h.xs || h.span || s.span : h.span || s.span,
          key: w,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            h.slot || e.$attrs.slot ? V(e.$slots, h.slot || e.$attrs.slot, {
              key: 0,
              col: h
            }) : (d(), v("span", ns, C(h.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const ls = /* @__PURE__ */ O(ts, [["render", is]]), os = {
  name: "MobileXButton"
};
function as(e, t, s, l, n, i) {
  const a = u("van-button");
  return d(), f(a, null, {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  });
}
const rs = /* @__PURE__ */ O(os, [["render", as]]), ds = {
  name: "PcXButton"
};
function cs(e, t, s, l, n, i) {
  const a = u("el-button");
  return d(), f(a, null, {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  });
}
const us = /* @__PURE__ */ O(ds, [["render", cs]]), { funcs: hs } = StardustBrowser, ms = {
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
}, ps = [
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
    options: [],
    slot: "selects-formatters",
    formatters: []
  },
  {
    label: "值",
    prop: "attr",
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
  { label: "数据筛选", slot: "filter" },
  { label: "字体大小", slot: "font-sizes" }
], fs = {
  sort: "",
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
  },
  fontSizes: [12, 12, 12]
};
function gs() {
  return hs.calcPixel(this.height) * this.zoom + "px";
}
function bs() {
  return this.$store.app.sidebarCollapse;
}
function _s() {
  return this.dialog.form.grid;
}
function ys() {
  return this.dialog.form.filter.categories;
}
function vs() {
  return this.dialog.form.filter.series;
}
function ws() {
  return this.dialog.form.fontSizes;
}
const me = {
  props: ms,
  formItems: ps,
  form: fs,
  computed: {
    zoomedHeight: gs,
    sidebarCollapse: bs,
    grid: _s,
    categories: ys,
    series: vs,
    fontSizes: ws
  }
}, Ss = ["index", "selection", "expand", "radio", "_index"], $e = {
  原样: (e) => e,
  年份: (e) => format(e, "YYYY年"),
  月份: (e) => format(e, "MM月"),
  年月: (e) => format(e, "YYYY-MM"),
  年月日: (e) => format(e, "YYYY-MM-DD"),
  时分: (e) => format(e, "HH:mm"),
  时分秒: (e) => format(e, "HH:mm:ss")
}, ks = [
  { text: "原样", value: "" },
  { text: "升序", value: "asc" },
  { text: "降序", value: "desc" }
];
StardustJs.dates;
const Ne = {
  name: "XChart",
  props: {
    ...me.props
  },
  data() {
    return {
      zoom: 1,
      loading: !1,
      filterType: "分类",
      SORTS: ks,
      dialog: {
        ...ge(),
        formItems: me.formItems,
        form: me.form
      }
    };
  },
  computed: {
    ...me.computed
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
      const e = this.datasource.columns.filter((t) => !Ss.includes(t.type)).map((t) => {
        const s = { ...t };
        return s.formatters = ["原样"], (t.comp === "el-date-picker" || t.comp === "ElDatePicker" || t.type === "date") && (s.formatters = Object.keys($e)), s;
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
      (s = e.filter) != null && s.categories.isLimit || (e.filter.categories.mergeOthers = !1), (l = e.filter) != null && l.series.isLimit || (e.filter.series.mergeOthers = !1);
      let t = this.datasource.list;
      this.datasource.search && (t = await this.datasource.search()), e.data = t, this.setRich(e), this.loading = !1;
    },
    calcSummary(e, t, s) {
      let l;
      return (t === "sum" || t === "average") && (l = e.reduce((n, i) => n + i, 0).toFixed(3) * 1), t === "count" ? l = e.length : t === "average" ? e.length ? l = (l / (s || e.length)).toFixed(3) * 1 : l = void 0 : t === "first" ? l = e[0] : t === "last" ? l = e[e.length - 1] : (t === "max" || t === "min") && (l = Math[t].apply(null, e)), l;
    },
    setRich(e) {
      var H;
      const { categories: t, data: s, attr: l, summary: n, type: i, filter: a, grid: o, fontSizes: r } = e, m = {}, h = Array.isArray(t) && t.length || ((H = t == null ? void 0 : t.data) == null ? void 0 : H.length), w = h && (Array.isArray(t) ? t : t.data), g = typeof e.series == "string" ? e.series : e.series.data, y = (a == null ? void 0 : a.categories.limit) > -1, D = (a == null ? void 0 : a.series.limit) > -1, E = {}, k = [], A = /* @__PURE__ */ new Set(), b = [], U = e.series_formatter === "原样" ? null : $e[e.series_formatter], G = e.attr_formatter === "原样" ? null : $e[e.attr_formatter];
      console.log(s), s.forEach((j) => {
        var S;
        let R = (U ? U(j[g]) : j[g]) ?? "未知";
        if (D && b.length >= a.series.limit && !b.includes(R)) {
          if (!a.series.mergeOthers)
            return;
          R = "其他";
        }
        const Q = G ? G(j[l]) : j[l];
        if (h) {
          let L = w.map((B) => j[B]).join("/") || "未知";
          if (y && k.length >= a.categories.limit && !k.includes(L)) {
            if (!a.categories.mergeOthers)
              return;
            A.add(L), L = "其他";
          }
          E[L] || k.push(L), E[L] || (E[L] = {}), b.includes(R) || b.push(R), (S = E[L])[R] || (S[R] = []), E[L][R].push(Q);
        } else
          E[R] || b.push(R), E[R] || (E[R] = []), E[R].push(Q);
      });
      const T = h && !D ? [...new Set(s.map((j) => j[g]))] : b;
      if (h)
        for (let j in E)
          for (let R in E[j])
            E[j][R] = this.calcSummary(
              E[j][R],
              n,
              y && j === "其他" ? E[j][R].length / A.size : E[j][R].length
            );
      else
        for (let j in E)
          E[j] = this.calcSummary(E[j], n);
      let N = T;
      typeof e.series == "object" && e.series.formatter && (N = T.map((j) => e.series.formatter(j)));
      let z = [];
      h ? z = T.map((j, R) => ({
        name: N[R],
        type: i,
        label: { show: !0, position: "top" },
        data: k.map((Q) => ({ name: Q, value: E[Q][j] }))
      })) : z = [
        {
          type: i,
          colorBy: "data",
          label: { show: !0, position: "top", fontSize: r[2] },
          data: T.map((j) => ({ name: j, value: E[j] }))
        }
      ], Object.assign(m, {
        legend: { data: N },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? k.map((j) => t.formatter(j)) : k : g.formatter ? b.map((j) => g.formatter(j)) : b
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: r[1]
          }
        },
        series: z
      }, this.option, { grid: o }), this.update(m);
    },
    update(e = {}) {
      var t, s, l, n, i;
      if (this.zoom = 1 / (parseFloat(document.documentElement.style.zoom) || 1), e = {
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
      }, e.xAxis && !((t = e.xAxis.axisLabel) != null && t.formatter) && ((s = e.xAxis).axisLabel || (s.axisLabel = { fontSize: this.fontSizes[0] }), e.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)), this.dialog.form.sort && ((n = (l = e.series) == null ? void 0 : l[0]) != null && n.data.length)) {
        const a = this.dialog.form.sort === "asc" ? 1 : -1;
        e.series[0].data.sort((o, r) => (o.value - r.value) * a), e.xAxis.data = e.series[0].data.map((o) => o.name);
      }
      console.log(e), (i = this.chart) == null || i.setOption(e, !0);
    },
    labelSplitFormatter(e) {
      return (t) => t.length < e ? t : Array.from({
        length: Math.ceil(t.length / e)
      }).map((s, l) => t.slice(l * e, (l + 1) * e)).join(`
`);
    }
  }
}, Ke = () => {
  Ie((e) => ({
    "398629ba": e.zoomedHeight,
    fc3db1d8: e.zoom
  }));
}, Ye = Ne.setup;
Ne.setup = Ye ? (e, t) => (Ke(), Ye(e, t)) : Ke;
const be = (e) => (Re("data-v-aeef6705"), e = e(), Pe(), e), $s = { class: "x-chart" }, Cs = {
  class: "chart",
  ref: "el"
}, xs = /* @__PURE__ */ be(() => /* @__PURE__ */ F("span", null, "左", -1)), Vs = /* @__PURE__ */ be(() => /* @__PURE__ */ F("span", null, "上", -1)), Es = /* @__PURE__ */ be(() => /* @__PURE__ */ F("span", null, "右", -1)), As = /* @__PURE__ */ be(() => /* @__PURE__ */ F("span", null, "下", -1)), Os = { class: "sorts flex-center" };
function js(e, t, s, l, n, i) {
  const a = u("pc-x-icon"), o = u("x-select"), r = u("el-col"), m = u("el-row"), h = u("el-input-number"), w = u("x-radios"), g = u("el-checkbox"), y = u("el-tab-pane"), D = u("el-tabs"), E = u("x-form"), k = u("x-dialog"), A = ee("loading");
  return I((d(), v("div", $s, [
    F("div", Cs, null, 512),
    e.datasource ? (d(), v("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (b) => n.dialog.visible = !0)
    }, [
      x(" 配置 "),
      p(a, { name: "Setting" })
    ])) : $("", !0),
    p(k, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[16] || (t[16] = (b) => n.dialog.visible = b),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: i.handleMakeChart,
      onCancel: t[17] || (t[17] = (b) => n.dialog.visible = !1)
    }, {
      default: c(() => [
        p(E, { dialog: n.dialog }, {
          "selects-formatters": c(({ item: b }) => [
            p(m, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                p(r, { span: 12 }, {
                  default: c(() => [
                    p(o, _({
                      modelValue: n.dialog.form[b.prop],
                      "onUpdate:modelValue": (U) => n.dialog.form[b.prop] = U
                    }, b, {
                      onChange: (U) => i.handleCalcFormatters(b)
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ]),
                  _: 2
                }, 1024),
                p(r, { span: 12 }, {
                  default: c(() => [
                    p(o, {
                      modelValue: n.dialog.form[b.prop + "_formatter"],
                      "onUpdate:modelValue": (U) => n.dialog.form[b.prop + "_formatter"] = U,
                      options: b.formatters,
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
            p(m, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                p(r, { span: 12 }, {
                  default: c(() => [
                    xs,
                    p(h, {
                      modelValue: e.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (b) => e.grid.left = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    Vs,
                    p(h, {
                      modelValue: e.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (b) => e.grid.top = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    Es,
                    p(h, {
                      modelValue: e.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (b) => e.grid.right = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    As,
                    p(h, {
                      modelValue: e.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (b) => e.grid.bottom = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          filter: c(() => [
            F("label", Os, [
              x(" 排序方式 "),
              p(w, {
                modelValue: n.dialog.form.sort,
                "onUpdate:modelValue": t[5] || (t[5] = (b) => n.dialog.form.sort = b),
                options: n.SORTS
              }, null, 8, ["modelValue", "options"])
            ]),
            p(D, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[12] || (t[12] = (b) => n.filterType = b)
            }, {
              default: c(() => [
                p(y, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    p(g, {
                      modelValue: e.categories.isLimit,
                      "onUpdate:modelValue": t[6] || (t[6] = (b) => e.categories.isLimit = b)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    I(F("div", null, [
                      x(" 记录条数 "),
                      p(h, {
                        modelValue: e.categories.limit,
                        "onUpdate:modelValue": t[7] || (t[7] = (b) => e.categories.limit = b),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(g, {
                        modelValue: e.categories.mergeOthers,
                        "onUpdate:modelValue": t[8] || (t[8] = (b) => e.categories.mergeOthers = b)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [We, e.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                p(y, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    p(g, {
                      modelValue: e.series.isLimit,
                      "onUpdate:modelValue": t[9] || (t[9] = (b) => e.series.isLimit = b)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    I(F("div", null, [
                      x(" 记录条数 "),
                      p(h, {
                        modelValue: e.series.limit,
                        "onUpdate:modelValue": t[10] || (t[10] = (b) => e.series.limit = b),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(g, {
                        modelValue: e.series.mergeOthers,
                        "onUpdate:modelValue": t[11] || (t[11] = (b) => e.series.mergeOthers = b)
                      }, {
                        default: c(() => [
                          x("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [We, e.series.isLimit]
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          "font-sizes": c(() => [
            p(m, { gutter: 5 }, {
              default: c(() => [
                p(r, { span: 8 }, {
                  default: c(() => [
                    x(" X轴 "),
                    p(h, {
                      modelValue: e.fontSizes[0],
                      "onUpdate:modelValue": t[13] || (t[13] = (b) => e.fontSizes[0] = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 8 }, {
                  default: c(() => [
                    x(" Y轴 "),
                    p(h, {
                      modelValue: e.fontSizes[1],
                      "onUpdate:modelValue": t[14] || (t[14] = (b) => e.fontSizes[1] = b)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 8 }, {
                  default: c(() => [
                    x(" 值 "),
                    p(h, {
                      modelValue: e.fontSizes[2],
                      "onUpdate:modelValue": t[15] || (t[15] = (b) => e.fontSizes[2] = b)
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
    [A, n.loading]
  ]);
}
const Fs = /* @__PURE__ */ O(Ne, [["render", js], ["__scopeId", "data-v-aeef6705"]]), Ts = {
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
        this._options = J(this.options, this);
      }
    }
  }
};
function Ds(e, t, s, l, n, i) {
  const a = u("van-checkbox"), o = u("van-checkbox-group");
  return d(), f(o, _({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, i.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), v(P, null, M(n._options, (r) => {
        var m;
        return d(), f(a, _({ ref_for: !0 }, i.attrs, {
          disabled: (m = r.raw) == null ? void 0 : m.disabled,
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
const Is = /* @__PURE__ */ O(Ts, [["render", Ds], ["__scopeId", "data-v-f7122501"]]), Rs = {
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
        this._options = J(e, this);
      }
    }
  }
}, Ps = { key: 1 };
function Ms(e, t, s, l, n, i) {
  const a = u("el-checkbox"), o = u("el-checkbox-group");
  return d(), f(o, _({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), v(P, null, M(n._options, (r) => {
        var m;
        return d(), f(a, _({ ref_for: !0 }, i.attrs, {
          disabled: (m = r.raw) == null ? void 0 : m.disabled,
          key: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), v("span", Ps, C(r.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const Ns = /* @__PURE__ */ O(Rs, [["render", Ms], ["__scopeId", "data-v-4dd3721a"]]), Bs = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Ls(e, t, s, l, n, i) {
  const a = u("van-col");
  return d(), f(a, _(i.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Us = /* @__PURE__ */ O(Bs, [["render", Ls]]), qs = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function zs(e, t, s, l, n, i) {
  const a = u("el-col");
  return d(), f(a, _(i.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Xs = /* @__PURE__ */ O(qs, [["render", zs]]), Ws = {
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
}, Hs = { key: 1 }, Js = { key: 1 };
function Ks(e, t, s, l, n, i) {
  const a = u("van-button"), o = u("van-col"), r = u("van-row");
  return d(), f(se(s.actionsheet ? "van-action-sheet" : "van-dialog"), _({ width: "92%" }, e.$attrs, {
    show: i.visible,
    "onUpdate:show": t[0] || (t[0] = (m) => i.visible = m),
    class: "mobile-x-dialog",
    "show-confirm-button": i.canConfirm,
    "show-cancel-button": i.canCancel,
    onConfirm: i.handleConfirm,
    onCancel: i.handleCancel
  }), re({ _: 2 }, [
    e.$slots.title || s.title ? {
      name: "title",
      fn: c(() => [
        e.$slots.title ? V(e.$slots, "title", { key: 0 }) : (d(), v("span", Hs, C(s.title), 1))
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
        e.$slots.title ? V(e.$slots, "title", { key: 0 }) : (d(), v("span", Js, C(s.title), 1))
      ]),
      key: "3"
    } : void 0,
    i.canConfirm || i.canCancel ? {
      name: "cancel",
      fn: c(() => [
        p(r, null, {
          default: c(() => [
            i.canCancel ? (d(), f(o, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                p(a, {
                  block: "",
                  onClick: Z(i.handleCancel, ["stop"])
                }, {
                  default: c(() => [
                    x(C(s.cancelText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : $("", !0),
            i.canConfirm ? (d(), f(o, {
              key: 1,
              span: 12
            }, {
              default: c(() => [
                p(a, {
                  block: "",
                  style: { color: "var(--van-blue)" },
                  onClick: Z(i.handleConfirm, ["stop"])
                }, {
                  default: c(() => [
                    x(C(s.submitText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : $("", !0)
          ]),
          _: 1
        })
      ]),
      key: "4"
    } : void 0
  ]), 1040, ["show", "show-confirm-button", "show-cancel-button", "onConfirm", "onCancel"]);
}
const Ys = /* @__PURE__ */ O(Ws, [["render", Ks]]), Gs = {
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
}, Qs = {
  key: 1,
  class: "el-dialog__title"
};
function Zs(e, t, s, l, n, i) {
  const a = u("x-icon"), o = u("el-button");
  return d(), f(se(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer, "no-footer": !i.hasFooter }]
  }), {
    header: c(() => [
      e.$slots.header ? V(e.$slots, "header", { key: 0 }) : (d(), v("span", Qs, C(s.title), 1)),
      s.drawer ? $("", !0) : (d(), f(a, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? V(e.$slots, "footer", { key: 0 }) : $("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(o, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          x(C(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : $("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(o, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          x(C(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : $("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? V(e.$slots, "default", { key: 0 }) : $("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const en = /* @__PURE__ */ O(Gs, [["render", Zs]]), tn = {
  name: "XDict",
  props: {
    modelValue: Object | String | void 0,
    items: Array
  },
  emits: ["update:modelValue"],
  data() {
    return {
      form: ce()
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
      const e = ce(), t = Math.floor(24 / this.items.length), s = this.items.map((l) => ({ span: l.span || t, ...l }));
      return ue(e, s), e;
    }
  }
}, sn = { class: "x-dict" };
function nn(e, t, s, l, n, i) {
  const a = u("x-form");
  return d(), v("div", sn, [
    p(a, _({
      form: n.form,
      "hide-labels": "",
      gutter: 10
    }, e.$attrs), null, 16, ["form"])
  ]);
}
const ln = /* @__PURE__ */ O(tn, [["render", nn]]), K = {}, ie = {
  provinces: [],
  cities: [],
  counties: []
}, on = {
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
      provinces: Object.freeze(ie.provinces),
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
      this.cities = Object.freeze(ie.cities.filter((s) => s.value.slice(0, 2) === t));
    },
    city(e) {
      if (this.county || this.update(), this.county = "", !e) {
        this.counties = [];
        return;
      }
      const t = e.slice(0, 4);
      this.counties = Object.freeze(ie.counties.filter((s) => s.value.slice(0, 4) === t));
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
      Object.assign(K, this.areaList), ie.provinces = Object.entries(K.province_list).map((e) => ({ value: e[0], text: e[1] })), ie.cities = Object.entries(K.city_list).map((e) => ({ value: e[0], text: e[1] })), ie.counties = Object.entries(K.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(ie.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split(this.seperator);
      if (e) {
        const l = Object.entries(K.province_list).find((n) => n[1] === e);
        this.province = l == null ? void 0 : l[0];
      } else {
        this.province = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), t) {
        const l = Object.entries(K.city_list).find((n) => n[1] === t);
        this.city = l == null ? void 0 : l[0];
      } else {
        this.city = "", this.inited = !0;
        return;
      }
      if (await this.$nextTick(), s) {
        const l = Object.entries(K.county_list).find((n) => n[1] === s);
        this.county = l == null ? void 0 : l[0];
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
function an(e, t, s, l, n, i) {
  const a = u("x-select"), o = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      p(o, { span: i.span }, {
        default: c(() => [
          p(a, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (m) => n.province = m),
            options: n.provinces,
            placeholder: "省份"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"]),
      i.number > 1 ? (d(), f(o, {
        key: 0,
        span: i.span
      }, {
        default: c(() => [
          p(a, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (m) => n.city = m),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : $("", !0),
      i.number > 2 ? (d(), f(o, {
        key: 1,
        span: i.span
      }, {
        default: c(() => [
          p(a, {
            modelValue: n.county,
            "onUpdate:modelValue": t[2] || (t[2] = (m) => n.county = m),
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
const rn = /* @__PURE__ */ O(on, [["render", an]]);
function dn() {
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
function cn() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function un() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((n) => (delete n.visible, e ? {
    ...n,
    label: " ",
    _label: n.label
  } : n)).filter((n) => this.dialog ? this.dialog.isEditing ? n.canEdit !== !1 : n.canAdd !== !1 : !0).map((n) => Object.assign({}, n, n.formAttrs));
}
function hn() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return mt(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function mn() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function pn(e) {
  var l;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((l = e.label) == null ? void 0 : l.trim()) || e._label || e.text || e.model || ""), t;
}
function fn(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const ae = {
  props: dn,
  computed: {
    _model: cn,
    _items: un,
    _visibleItems: hn,
    _rules: mn
  },
  methods: {
    calcPlaceholder: pn,
    formatModelValue: fn
  }
}, gn = {
  name: "MobileXForm",
  inheritAttrs: !1,
  props: {
    ...ae.props(),
    hideLabels: {
      type: Boolean,
      default: !1
    },
    labelWidth: {
      type: Number | String,
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
function bn(e, t, s, l, n, i) {
  const a = u("mobile-x-form-item"), o = u("el-col"), r = u("el-row"), m = u("van-form");
  return d(), f(m, {
    ref: "formRef",
    class: Y(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? V(e.$slots, "pre", { key: 0 }) : $("", !0),
      p(r, {
        gutter: e.$attrs.gutter,
        justify: e.$attrs.justify,
        align: e.$attrs.align,
        tag: e.$attrs.tag
      }, {
        default: c(() => [
          (d(!0), v(P, null, M(e._visibleItems, (h, w) => (d(), f(o, {
            key: w,
            span: h.span,
            offset: h.offset,
            tag: h.tag,
            xs: h.xs,
            sm: h.sm,
            md: h.md,
            lg: h.lg,
            xl: h.xl
          }, {
            default: c(() => [
              p(a, _({
                "label-width": s.labelWidth,
                "label-position": e.$attrs["label-position"] || "left",
                ref_for: !0
              }, h, {
                rules: e._rules[h.prop] || h.rules,
                modelValue: e.formatModelValue(e._model[h.prop]),
                "onUpdate:modelValue": (g) => e._model[h.prop] = g,
                placeholder: e.calcPlaceholder(h)
              }), {
                default: c(() => [
                  h.slot ? V(e.$slots, h.slot, _({
                    key: 0,
                    ref_for: !0
                  }, h)) : $("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "label-position", "rules", "modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            _: 2
          }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
        ]),
        _: 3
      }, 8, ["gutter", "justify", "align", "tag"]),
      e.$slots.default ? V(e.$slots, "default", { key: 1 }) : $("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const _n = /* @__PURE__ */ O(gn, [["render", bn]]), yn = {
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
      type: Number | String,
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
}, vn = { key: 1 };
function wn(e, t, s, l, n, i) {
  const a = u("pc-x-form-item"), o = u("el-col"), r = u("el-row"), m = u("el-form"), h = u("el-collapse-item"), w = u("el-collapse");
  return d(), f(w, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (g) => n.activeNames = g),
    class: Y((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      p(h, {
        name: n.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", vn, C(s.title), 1))
        ]),
        default: c(() => [
          p(m, _({ ref: "formRef" }, e.$attrs, {
            model: e._model,
            rules: e._rules,
            "label-width": s.labelWidth,
            "label-position": e.$attrs["label-position"] || "right",
            class: ["pc-x-form", { "hide-labels": s.hideLabels }]
          }), {
            default: c(() => [
              e.$slots.pre ? V(e.$slots, "pre", { key: 0 }) : $("", !0),
              p(r, {
                gutter: e.$attrs.gutter,
                justify: e.$attrs.justify,
                align: e.$attrs.align,
                tag: e.$attrs.tag
              }, {
                default: c(() => [
                  (d(!0), v(P, null, M(e._visibleItems, (g, y) => (d(), f(o, {
                    key: y,
                    span: g.span,
                    offset: g.offset,
                    tag: g.tag,
                    xs: g.xs,
                    sm: g.sm,
                    md: g.md,
                    lg: g.lg,
                    xl: g.xl
                  }, {
                    default: c(() => [
                      p(a, _({
                        "label-width": s.labelWidth,
                        "show-tooltip": e.$attrs.showTooltip || !1,
                        ref_for: !0
                      }, g, {
                        modelValue: e._model[g.prop],
                        "onUpdate:modelValue": [(D) => e._model[g.prop] = D, (D) => g.onChange || null],
                        prop: g.prop || g.model,
                        clearable: g.clearable !== !1,
                        placeholder: e.calcPlaceholder(g)
                      }), {
                        default: c(() => [
                          g.slot ? V(e.$slots, g.slot, {
                            key: 0,
                            item: g,
                            index: y
                          }) : $("", !0)
                        ]),
                        _: 2
                      }, 1040, ["label-width", "show-tooltip", "modelValue", "onUpdate:modelValue", "prop", "clearable", "placeholder"])
                    ]),
                    _: 2
                  }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
                ]),
                _: 3
              }, 8, ["gutter", "justify", "align", "tag"]),
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
const Sn = /* @__PURE__ */ O(yn, [["render", wn]]);
function kn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ot(e);
}
const Oe = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: n
  } = e;
  let {
    comp: i,
    compType: a,
    html: o,
    text: r
  } = t;
  const m = {
    ...l,
    "onUpdate:modelValue": (w) => n("update:modelValue", w)
  }, h = [];
  return a === "html" ? m.class = "comp-html" : i = u(i), o && (m.innerHTML = o), r && h.push(r), ne(i, m, {
    default: () => h
  });
}, $n = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: n,
    $slots: i
  } = e, {
    slot: a,
    showTooltip: o,
    placeholder: r
  } = t;
  let m;
  l.directives && typeof l.directives == "object" && (m = Object.entries(l.directives).map(([w, g]) => [ee(w), g]));
  let h;
  if (a && !s.label)
    h = i.default();
  else {
    let w = null;
    if (a)
      w = i.default();
    else if (o) {
      let g;
      w = p(u("el-tooltip"), {
        effect: "dark",
        content: r,
        placement: "bottom"
      }, kn(g = Oe(e)) ? g : {
        default: () => [g]
      });
    } else
      w = Oe(e);
    h = ne(u("el-form-item"), {
      ...t,
      ...s
    }, {
      default: () => [w],
      label: () => ne("span", {
        title: s.label,
        class: "overflow-text",
        style: {
          width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
          display: "inline-block"
        }
      }, [s.label])
    });
  }
  return m ? I(h, m) : h;
}, Cn = (e) => {
  const {
    $props: t,
    $attrs: s,
    attrs: l,
    $emit: n,
    $slots: i,
    mValue: a
  } = e, {
    slot: o,
    comp: r,
    modelValue: m
  } = t;
  let h;
  l.directives && typeof l.directives == "object" && (h = Object.entries(l.directives).map(([g, y]) => [ee(g), y]));
  let w;
  if (o && !s.label)
    w = i.default({
      ...t,
      ...s
    });
  else {
    const g = {
      modelValue: a,
      labelWidth: s["label-width"],
      labelAlign: s["label-align"] ?? s["label-position"],
      "onUpdate:modelValue": (y) => n("update:modelValue", y)
    };
    o && s.label || r ? w = ne(u("van-field"), g, {
      input: () => o && s.label ? i.default() : Oe(e)
    }) : w = ne(u("van-field"), Object.assign(g, l));
  }
  return h ? I(w, h) : w;
}, xn = {
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
        slot: a,
        html: o,
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
    return Cn(this);
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
    labelWidth: Number | String,
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
        span: a,
        offset: o,
        showTooltip: r,
        required: m,
        format: h,
        style: w,
        html: g,
        class: y,
        ...D
      } = { ...this.$props, ...this.$attrs };
      return D;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return $n(this);
  }
}, Ge = () => {
  Ie((e) => ({
    "5e7bcfb7": e.width
  }));
}, Qe = Be.setup;
Be.setup = Qe ? (e, t) => (Ge(), Qe(e, t)) : Ge;
const Vn = /* @__PURE__ */ O(Be, [["__scopeId", "data-v-ee79171b"]]), Ze = /* @__PURE__ */ Object.assign({}), En = {
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
      await Promise.all(Object.keys(Ze).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await Ze[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, An = ["src"];
function On(e, t, s, l, n, i) {
  const a = u("van-icon");
  return s.name.includes(":") ? (d(), v("span", {
    key: 0,
    class: Y(i.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), v("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, An)) : (d(), f(a, _({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const jn = /* @__PURE__ */ O(En, [["render", On]]), et = /* @__PURE__ */ Object.assign({}), Fn = {
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
      await Promise.all(Object.keys(et).map(async (t) => {
        const s = t.split("/").pop().split(".")[0], l = await et[t]();
        e[s] = l.default;
      })), this.icons = e;
    }
  }
}, Tn = ["src"];
function Dn(e, t, s, l, n, i) {
  const a = u("el-icon");
  return s.name.includes(":") ? (d(), v("span", {
    key: 0,
    class: Y(i.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), v("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Tn)) : (d(), f(a, kt(_({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(se(s.name)))
    ]),
    _: 1
  }, 16));
}
const In = /* @__PURE__ */ O(Fn, [["render", Dn]]), { highdict: _t } = StardustJs, { storage: Rn } = StardustBrowser, { local: yt } = Rn, Le = ["index", "selection", "expand", "radio", "_index"];
function Pn() {
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
function Mn() {
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
function Nn() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function Bn() {
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
function Ln() {
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
function Un() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function qn() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function zn() {
  const { $props: e, _query: t } = this, { table: s, columns: l } = e;
  return (l || (s == null ? void 0 : s.columns) || []).map((i) => i.type === "_index" ? Object.assign({
    width: 60,
    label: "序号",
    index(a) {
      const { page: o, limit: r } = t;
      return (s.isInfinite ? 0 : (o - 1) * r) + a + 1;
    }
  }, i, { type: "index" }) : i.type === "radio" ? Object.assign({ width: 60, label: "单选" }, i) : Object.assign({}, i, i.tableAttrs));
}
function Xn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Wn() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function Hn() {
  const { table: e, finished: t } = this.$props;
  return t ?? (e == null ? void 0 : e.finished);
}
function Jn() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Kn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function Yn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || this._attrs.chartOption || {};
}
function Gn() {
  return this.onKeywordsSearch || this._listen["keywords-search"] ? (...e) => this._emit("keywords-search", ...e) : null;
}
function Qn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function Zn() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function ei() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function ti() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function si() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function ni() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function ii() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : () => {
  };
}
function li() {
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
function oi() {
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
function ai() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function ri() {
  const { plain: e } = this._attrs;
  return e || e === "";
}
function di() {
  const { "hide-header": e } = this._attrs;
  return e || e === "";
}
function ci() {
  const { "hide-tools": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function ui() {
  const { "hide-searcher": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function hi() {
  const { "hide-chart": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function mi() {
  const { "hide-settings": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function pi() {
  const { "hide-operates": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function fi() {
  const { "hide-pagination": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function gi() {
  return this._attrs["operates-width"] ?? 150;
}
function bi() {
  return this._attrs["operates-dropdown"];
}
function _i() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !Le.includes(e.type)));
}
function yi() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function vi() {
  const e = this._uid && yt.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Le.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: n, hide: i, width: a, virtual: o, fixed: r } = t;
    return { prop: s, label: l, show: n, hide: i, width: a, virtual: o, fixed: r };
  })), this.settings = e;
}
function wi(e) {
  yt.setJson(`Settings[${this._uid}]`, e);
}
function Si(e, t) {
  const { prop: s } = t, l = e[s];
  let { format: n, formatter: i } = t.tableAttrs || t;
  if (i)
    return i(l, e);
  if (n = Array.isArray(t.options) ? n !== !1 : n, n) {
    const a = `_formatted_${s}`;
    if (a in e)
      return e[a];
  }
  return l === void 0 ? s.includes(".") || s.includes("[") ? _t.get(e, s, this.defaultValue) : this.defaultValue : l === "" ? this.defaultValue : l;
}
function ki(e, t) {
  return t.link ? t.link(e) : _t.get(e, t.linkProp || t.prop);
}
function $i(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function Ci(e) {
  this.params = e, this._emit("search", e);
}
function xi(e) {
  this.saveSettings(e), this.initSettings();
}
function Vi(e, t, s, l) {
  const n = this.settings.columns.find((i) => i.prop === s.property);
  n && (n.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, l);
}
function Ei(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function Ai(e) {
  var t, s, l, n;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((n = (l = this.controller) == null ? void 0 : l.handleSortChange) == null || n.call(l, e));
}
function Oi(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function ji(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function Fi() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function Ti() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function Di(e) {
  var l;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.class) {
    const n = s.tableAttrs.class;
    typeof n == "function" ? t += " " + n(e) : typeof n == "string" && (t += " " + n);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Ii(e) {
  var l;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((l = s == null ? void 0 : s.tableAttrs) != null && l.style) {
    const n = s.tableAttrs.style;
    typeof n == "function" ? Object.assign(t, n(e)) : typeof n == "object" && Object.assign(t, n);
  }
  return Object.keys(t) ? t : null;
}
function Ri(e, t) {
  const { tagTypes: s, prop: l, options: n } = t, i = e.row[l];
  if (s) {
    if (typeof s == "function")
      return s(i, e, t);
    if (typeof s == "object")
      return s[i];
  } else if (n) {
    const a = n.find((o) => o[t.value || "value"] === i);
    if (a != null && a.tagType)
      return a.tagType;
  }
  return i ? "success" : "danger";
}
function Pi(e, t) {
  const { tagValues: s, prop: l, options: n } = t, i = e.row[l];
  if (s) {
    if (typeof s == "function")
      return s(i, e, t);
    if (typeof s == "object")
      return s[i];
  } else if (n) {
    const a = n.find((o) => o[t.value || "value"] === i);
    if (a)
      return a[t.text || "text"];
  }
  return i;
}
function Mi(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Ni(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Bi(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Li(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Ui(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function qi(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function zi(e, t) {
  var l;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((l = t.previewSrcList) == null ? void 0 : l.call(t)) || [s];
}
function Xi(e, t) {
  const s = "on" + e.split("-").map((l) => l[0].toUpperCase() + l.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Wi() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const W = {
  props: Pn,
  emits: Mn,
  computed: {
    _attrs: Nn,
    domids: Bn,
    elTableAttrs: Ln,
    _loading: Un,
    _data: qn,
    _columns: zn,
    _query: Xn,
    _total: Wn,
    _finished: Hn,
    _selection: Jn,
    _chartHeight: Kn,
    _chartOption: Yn,
    _onKeywordsSearch: Gn,
    _onSearch: Qn,
    _onAdd: Zn,
    _onExport: ei,
    _onSearchExport: ti,
    _onImport: si,
    _onMultiDelete: ni,
    _onLoad: ii,
    _listen: li,
    _visibleColumns: oi,
    _uid: ai,
    plain: ri,
    hideHeader: di,
    hideTools: ci,
    hideSearcher: ui,
    hideChart: hi,
    hideSettings: mi,
    hideOperates: pi,
    hidePagination: fi,
    operatesWidth: gi,
    operatesDropdown: bi,
    searcherColumns: _i,
    searcherConfig: yi
  },
  watch: {
    $route: Wi
  },
  methods: {
    initSettings: vi,
    saveSettings: wi,
    calcValue: Si,
    calcLink: ki,
    calcOverflowTooltip: $i,
    handleSearch: Ci,
    handleResetSettings: xi,
    handleHeaderDragend: Vi,
    handleSelectionChange: Ei,
    handleSortChange: Ai,
    handleCheckedChange: Oi,
    handleCollapseChange: ji,
    handleMinus: Fi,
    handleToggleFullscreen: Ti,
    cellClassName: Di,
    cellStyle: Ii,
    calcTagType: Ri,
    calcTagValue: Pi,
    canEdit: Mi,
    canSave: Ni,
    canRowEdit: Bi,
    canCancelEdit: Li,
    canDelete: Ui,
    _imageSrc: qi,
    _imagePreviewSrcList: zi,
    _emit: Xi
  }
}, Ue = {
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
      type: Number | String,
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
        let a = e[i];
        a || (e[i] = a = [], a.span = 0), a.span + n.span > 24 && a.length ? a[a.length - 1].span += 24 - a.span : a.span += n.span, a.push(n);
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
    calcValue: W.methods.calcValue,
    calcLink: W.methods.calcLink
  }
}, tt = () => {
  Ie((e) => ({
    "29b49346": e.labelWidth,
    "404ac708": e._labelAlign,
    "8812dfc2": e._valueAlign
  }));
}, st = Ue.setup;
Ue.setup = st ? (e, t) => (tt(), st(e, t)) : tt;
const Hi = { class: "x-info__label" }, Ji = { key: 1 }, Ki = { class: "x-info__value" }, Yi = { key: 2 };
function Gi(e, t, s, l, n, i) {
  const a = u("router-link"), o = u("el-col"), r = u("el-row"), m = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (w) => n.activeNames = w),
    class: Y(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), v(P, null, M(i.blocks, (w, g) => (d(), f(m, {
        key: g,
        title: g,
        name: g
      }, {
        default: c(() => [
          p(r, {
            gutter: e.$attrs.gutter || 10
          }, {
            default: c(() => [
              (d(!0), v(P, null, M(w, (y) => (d(), f(o, _({
                key: y.prop,
                span: s.span,
                ref_for: !0
              }, y), {
                default: c(() => [
                  F("div", Hi, [
                    e.$slots.label ? V(e.$slots, "label", {
                      key: 0,
                      label: y.label
                    }, void 0, !0) : (d(), v("span", Ji, C(y.label ? s.showColon ? y.label + "：" : y.label : ""), 1))
                  ]),
                  F("div", Ki, [
                    y.slot === "$link" ? (d(), f(a, {
                      key: 0,
                      to: y.to(s.data)
                    }, {
                      default: c(() => [
                        x(C(i.calcLink(s.data, y)), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])) : y.slot ? V(e.$slots, y.slot, _({
                      key: 1,
                      ref_for: !0
                    }, { data: s.data, field: y, value: i.calcValue(s.data, y) }), void 0, !0) : (d(), v("span", Yi, C(i.calcValue(s.data, y)), 1))
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
const Qi = /* @__PURE__ */ O(Ue, [["render", Gi], ["__scopeId", "data-v-d406cfaf"]]), Zi = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, el = { key: 1 };
function tl(e, t, s, l, n, i) {
  return d(), v("div", null, [
    (d(!0), v(P, null, M(s.items, (a, o) => (d(), f(se(s.compName), _({
      key: o,
      ref_for: !0
    }, a), {
      default: c(() => [
        a.slot || e.$attrs.slot ? V(e.$slots, "default", {
          key: 0,
          item: a
        }) : (d(), v("span", el, C(a.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const sl = /* @__PURE__ */ O(Zi, [["render", tl]]), nl = {
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
function il(e, t, s, l, n, i) {
  const a = u("van-col"), o = u("van-icon"), r = u("van-pagination"), m = u("van-row");
  return d(), f(m, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      p(a, { span: 6 }, {
        default: c(() => [
          F("span", null, "总计: " + C(s.total), 1)
        ]),
        _: 1
      }),
      p(a, { span: 18 }, {
        default: c(() => [
          p(r, _({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => s.query.page = h),
            "page-count": i.pageCount
          }), {
            "prev-text": c(() => [
              p(o, { name: "arrow-left" }),
              x(" 上一页 ")
            ]),
            "next-text": c(() => [
              x(" 下一页 "),
              p(o, { name: "arrow" })
            ]),
            page: c(({ text: h }) => [
              x(C(h), 1)
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
const ll = /* @__PURE__ */ O(nl, [["render", il]]), ol = {
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
function al(e, t, s, l, n, i) {
  const a = u("el-pagination");
  return d(), f(a, _({
    background: "",
    layout: "total, sizes, prev, pager, next, jumper"
  }, { ...e.$attrs, ...e.pcPagination || {} }, {
    "current-page": s.query.page,
    "onUpdate:currentPage": t[0] || (t[0] = (o) => s.query.page = o),
    "page-size": s.query.limit,
    "onUpdate:pageSize": t[1] || (t[1] = (o) => s.query.limit = o),
    "page-count": i.pageCount,
    total: s.total,
    class: "pc-x-pagination"
  }), null, 16, ["current-page", "page-size", "page-count", "total"]);
}
const rl = /* @__PURE__ */ O(ol, [["render", al]]), dl = {
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
function cl(e, t, s, l, n, i) {
  const a = u("van-picker"), o = u("van-popup");
  return d(), v(P, null, [
    F("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: Y(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, C(i.text), 3),
    p(o, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: c(() => [
        p(a, _(e.$attrs, {
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
const ul = /* @__PURE__ */ O(dl, [["render", cl]]), hl = {
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
function ml(e, t, s, l, n, i) {
  const a = u("van-radio"), o = u("van-radio-group");
  return d(), f(o, _({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), v(P, null, M(n._options, (r) => {
        var m;
        return d(), f(a, _({ ref_for: !0 }, e.$attrs, {
          disabled: (m = r.raw) == null ? void 0 : m.disabled,
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
const pl = /* @__PURE__ */ O(hl, [["render", ml]]), fl = {
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
        this._options = J(this.options, this);
      }
    }
  }
}, gl = { key: 1 };
function bl(e, t, s, l, n, i) {
  const a = u("el-radio-group");
  return d(), f(a, _({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (o) => e.$emit("update:modelValue", o)),
    onChange: t[1] || (t[1] = (o) => e.$emit("change", o))
  }), {
    default: c(() => [
      (d(!0), v(P, null, M(n._options, (o) => {
        var r;
        return d(), f(se(s.button ? "el-radio-button" : "el-radio"), _({ ref_for: !0 }, i.attrs, {
          disabled: (r = o.raw) == null ? void 0 : r.disabled,
          key: o.text,
          value: o.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: o,
              raw: o.raw
            }, void 0, !0) : (d(), v("span", gl, C(o.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const _l = /* @__PURE__ */ O(fl, [["render", bl], ["__scopeId", "data-v-1c8cf979"]]), yl = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, vl = { key: 1 };
function wl(e, t, s, l, n, i) {
  const a = u("mobile-x-col"), o = u("van-row");
  return d(), f(o, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), v(P, null, M(s.cols, (r, m) => (d(), f(a, _({ ref_for: !0 }, r, {
        span: r.xs ?? r.span,
        key: m
      }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", vl, C(r.text), 1))
        ]),
        _: 2
      }, 1040, ["span"]))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : $("", !0)
    ]),
    _: 3
  });
}
const Sl = /* @__PURE__ */ O(yl, [["render", wl]]), kl = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, $l = { key: 1 };
function Cl(e, t, s, l, n, i) {
  const a = u("pc-x-col"), o = u("el-row");
  return d(), f(o, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), v(P, null, M(s.cols, (r, m) => (d(), f(a, _({ ref_for: !0 }, r, { key: m }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", $l, C(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : $("", !0)
    ]),
    _: 3
  });
}
const xl = /* @__PURE__ */ O(kl, [["render", Cl]]), Vl = {
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
function El(e, t, s, l, n, i) {
  const a = u("van-icon"), o = u("van-field");
  return d(), f(o, _({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    "right-icon": c(() => [
      p(a, {
        name: "scan",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const Al = /* @__PURE__ */ O(Vl, [["render", El]]), Ol = {
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
function jl(e, t, s, l, n, i) {
  const a = u("el-button"), o = u("el-input");
  return d(), f(o, _(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: i.handleClick
  }), {
    append: c(() => [
      p(a, {
        icon: "CameraFilled",
        onClick: i.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const Fl = /* @__PURE__ */ O(Ol, [["render", jl]]), qe = async (e, t, s) => {
  if (s.loading)
    return;
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: a, params: o = {} } = s;
  o.attributes = [...new Set(o.attributes || [...a || [], n, i])], o.page || (o.page = 1), o.limit || (o.limit = 100), l && (o.where = o.where || {}, o.where[n] = o.where[n] || {}, o.where[n]["[Op.like]"] = `%${l}%`);
  const r = await e.search(s.modelName, o);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, je = (e, t) => !e || typeof e != "object" ? e : !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], Fe = (e, t) => !e || typeof e != "object" || !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", Tl = {
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
      qe(this.service.restful, e, this);
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
function Dl(e, t, s, l, n, i) {
  const a = u("x-picker");
  return d(), v("div", {
    onClick: t[2] || (t[2] = (...o) => i.onClick && i.onClick(...o)),
    class: "mobile-x-select"
  }, [
    p(a, _(e.$attrs, {
      modelValue: n._value,
      "onUpdate:modelValue": i.onChange,
      show: n.visible,
      columns: n._options,
      onClick: t[0] || (t[0] = Z(() => {
      }, ["stop"])),
      onShow: i.onShow,
      onCancel: t[1] || (t[1] = (o) => n.visible = !1),
      onConfirm: i.onConfirm,
      onChange: i.onChange
    }), null, 16, ["modelValue", "onUpdate:modelValue", "show", "columns", "onShow", "onConfirm", "onChange"])
  ]);
}
const Il = /* @__PURE__ */ O(Tl, [["render", Dl]]), Rl = {
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
        const e = J(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = je(this.options[s], this), t._remark_ = Fe(this.options[s], this);
        }), this._options = le(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: J,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = le(this._options);
      const t = !this.$slots.custom && this.labelTexts;
      this.list = le(this._options.filter((s) => {
        let l = s.text;
        return t && (l += s._main_ + s._remark_), l.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      qe(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return je(e, this);
    },
    calcRemarkLabel(e) {
      return Fe(e, this);
    }
  }
}, Pl = { key: 1 }, Ml = { class: "main" }, Nl = { class: "remark" };
function Bl(e, t, s, l, n, i) {
  const a = u("el-option"), o = u("el-select");
  return d(), f(o, _({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: n.loading
  }, e.$attrs, {
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || i.filter,
    onKeyup: Me(i.handleRemote, ["enter"])
  }), {
    default: c(() => [
      (d(!0), v(P, null, M(n.list, (r, m) => {
        var h;
        return d(), f(a, _({ ref_for: !0 }, e.$attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.value,
          label: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), v("span", Pl, [
              F("span", Ml, C(r._main_), 1),
              F("span", Nl, C(r._remark_), 1)
            ]))
          ]),
          _: 2
        }, 1040, ["disabled", "label", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote", "filter-method", "onKeyup"]);
}
const Ll = /* @__PURE__ */ O(Rl, [["render", Bl], ["__scopeId", "data-v-20ab71e6"]]), Ul = {
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
        const e = J(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = je(this.options[s], this), t._remark_ = Fe(this.options[s], this);
        }), this._options = le(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: J,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = le(this._options);
      const t = !!this.$slots.custom;
      this.list = le(this._options.filter((s) => {
        let l = s.text;
        return t || (l += s._main_ + s._remark_), l.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      qe(this.service.restful, e, this);
    }
  }
}, ql = { key: 1 }, zl = { class: "main" }, Xl = { class: "remark" };
function Wl(e, t, s, l, n, i) {
  const a = u("el-select-v2");
  return d(), f(a, _({
    class: ["pc-x-select-v2", s.plain ? "x-select-v2--plain" : ""],
    loading: n.loading
  }, e.$attrs, {
    options: n.list,
    props: { label: "text" },
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || i.filter,
    onKeyup: Me(i.handleRemote, ["enter"])
  }), {
    default: c(({ item: o, index: r }) => [
      e.$slots.custom ? V(e.$slots, "custom", {
        key: 0,
        option: o,
        raw: o.raw
      }, void 0, !0) : (d(), v("span", ql, [
        F("span", zl, C(o._main_), 1),
        F("span", Xl, C(o._remark_), 1)
      ]))
    ]),
    _: 3
  }, 16, ["class", "loading", "options", "filterable", "remote", "filter-method", "onKeyup"]);
}
const Hl = /* @__PURE__ */ O(Ul, [["render", Wl], ["__scopeId", "data-v-70bc3765"]]), nt = {
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
}, Jl = [{
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
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "in", "notIn", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "in", "notIn", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "in", "notIn", "special"],
  universal: ["eq", "ne", "gt", "gte", "lt", "lte", "in", "like", "notIn", "notLike", "between", "special"]
};
q["x-select"] = q.XSelect;
q.XSelectV2 = q.XSelect;
q["x-select-v2"] = q.XSelect;
q["x-radios"] = q.XRadios;
q["x-checkboxs"] = q.XCheckboxs;
q["el-date-picker"] = q.ElDatePicker;
q["el-input-number"] = q.ElInputNumber;
q["el-input"] = q.ElInput;
function Kl() {
  const e = window.isMobile ? "small" : "", {
    $attrs: t,
    config: s,
    columns: l,
    visible: n,
    conditions: i,
    expression: a,
    handleSearch: o,
    handleReset: r,
    handleAdd: m,
    handleDelete: h,
    handleSelectField: w,
    handleSelectOp: g
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
    modelValue: n,
    "onUpdate:modelValue": (y) => this.visible = y,
    onCancel: r,
    onSubmit: o
  }), {
    default: () => [s.traditional ? null : p(u("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: m
    }, {
      default: () => [x("新增条件")]
    }), p("div", {
      class: "conditions"
    }, [i.map((y, D) => p("div", {
      class: "condition flex-center",
      key: y.no
    }, [s.traditional ? null : p(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(D)
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
      onChange: (E) => w(y, E),
      options: l,
      text: "label",
      value: "prop"
    }, null), p(u("pc-x-select"), {
      modelValue: y.op,
      onChange: (E) => g(y, E),
      options: y.ops
    }, null), p("div", {
      class: "value-container"
    }, [Yl(this, y)])])]))]), s.traditional ? null : p(u("el-input"), _({
      type: "textarea",
      autosize: {
        minRows: 3,
        maxRows: 10
      },
      placeholder: "分组条件表达式, 使用 () and or 组合上述条件, 示例: 1, 1 and 2, (1 or 2) and 3"
    }, {
      modelValue: a,
      "onUpdate:modelValue": (y) => this.expression = y
    }), null)]
  });
}
function Yl(e, t) {
  const s = (n) => ne(u((n == null ? void 0 : n.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (i) => t.value = i,
    onKeyup: (i) => {
      i.key === "Enter" && e.handleSearch();
    }
  }, n)), l = {
    multiple: !1
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
  })]) : ["in", "notIn"].includes(t.op) ? (l.multiple = !0, t.item.options || (l.placeholder = "可以填写多项，用英文逗号分割"), s(l)) : t.op === "special" ? s({
    ...l,
    component: "x-select",
    placeholder: "请选择特殊值",
    options: Jl
  }) : s();
}
const { storage: Ce } = StardustBrowser, { deepCopy: Gl } = StardustJs.funcs, Ql = {
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
  render: Kl,
  methods: {
    init() {
      const e = this.uid && Ce.local.getJson(this.key, this.config) || this.config;
      this.initConfig(Gl(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      Ce.local.setJson(this.key, {
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
        const { prop: n, op: i, value: a, universal: o } = l;
        l.item = this.columns.find((r) => r.prop === n), this.handleSelectField(l, n), this.handleSelectOp(l, i), l.value = a, l.ops = q[o ? "universal" : l.component].map((r) => nt[r]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((l) => l.no)) + 1), Object.assign(this, e);
    },
    handleSearch() {
      let e = null;
      try {
        e = this.calcParams();
      } catch (t) {
        X.w(t.toString());
        return;
      }
      this.uid && e && this.saveCache(), e = e || { where: {} }, e.page = 1, this.$emit("search", e), this.visible = !1;
    },
    handleReset() {
      Ce.local.remove(this.key), Object.assign(this, {
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
        const i = [], a = "[Op." + l.type + "]";
        n[a] = i;
        for (let o of l.items)
          if (typeof o == "string") {
            const r = this.conditions.find((m) => m.no === o * 1);
            if (r) {
              if (!this.checkFilled(r)) {
                if (this.config.traditional || this.config.ignoreUnfilled)
                  continue;
                throw "条件不完整: " + o;
              }
            } else
              throw "条件不存在: " + o;
            i.push(this.parseCondition(r));
          } else {
            const r = {};
            i.push(r), t(o, r);
          }
        i.length || delete n[a];
      }, s = {};
      return t(e, s), { where: s };
    },
    calcTree() {
      const e = this.expression.trim().replaceAll("&&", "and").replaceAll("||", "or");
      if (!e)
        return null;
      const t = e.split(/(\(|\)|\s)/).filter((n) => n.trim()), s = (n, i) => {
        for (; i.length; ) {
          const a = i.shift();
          if (["and", "or"].includes(a)) {
            if (n.type && n.type !== a)
              throw "串联不同逻辑表达式请使用小括号区分";
            n.type = a;
          } else if (a === "(") {
            const o = { type: "", items: [] };
            n.items.push(o), o._parent = n, s(o, i);
            break;
          } else
            a === ")" ? (s(n._parent, i), delete n._parent) : n.items.push(a);
        }
      }, l = { type: "", items: [] };
      return s(l, t), l.type = l.type || "and", l;
    },
    parseCondition(e) {
      let { item: t, component: s, prop: l, op: n, value: i } = e;
      const a = {};
      if (n === "special") {
        const o = i.startsWith("NOT_"), r = i.startsWith("NE_");
        return i.includes("NULL") ? i = null : i.includes("BLANK") && (i = ""), o ? i = { "[Op.not]": i } : r && (i = { "[Op.ne]": i }), a[l] = i, a;
      }
      return (n === "like" || n === "notLike") && (i = "%" + i + "%"), (n === "in" || n === "notIn") && (t.options || (i = i.split(","), (s === "ElInputNumber" || s === "el-input-number" || e.type === "number") && (i = i.map(Number)))), a[l] = { [`[Op.${n}]`]: i }, a;
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
        comp: a,
        universal: o,
        visible: r,
        canAdd: m,
        canEdit: h,
        required: w,
        slot: g,
        span: y,
        tableAttrs: D,
        formAttrs: E,
        tagTypes: k,
        tagValues: A,
        width: b,
        minWidth: U,
        disabled: G,
        readonly: T,
        ...N
      } = i;
      N.clearable ?? (N.clearable = !0), e.config = N, e.component = a || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = q[o ? "universal" : e.component].map((z) => nt[z]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", N.type = "date"), N.type === "textarea" && delete N.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, ze = /* @__PURE__ */ O(Ql, [["__scopeId", "data-v-f8ded706"]]), Zl = {
  name: "MobileXTable",
  inheritAttrs: !1,
  props: {
    ...W.props(),
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
    ...W.emits()
  ],
  components: { Searcher: ze },
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
    ...W.computed,
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
    ...W.methods,
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
}, eo = { class: "mobile-x-table" }, to = {
  key: 1,
  class: "card"
}, so = ["onClick"], no = { class: "row-header flex-center" }, io = ["value", "checked"], lo = { class: "label" }, oo = { class: "value" }, ao = ["value", "checked"], ro = {
  key: 2,
  class: "index"
}, co = { class: "title" };
function uo(e, t, s, l, n, i) {
  const a = u("searcher"), o = u("x-table-tools"), r = u("van-checkbox"), m = u("x-icon"), h = u("van-cell"), w = u("van-list"), g = u("x-pagination"), y = u("x-info"), D = u("van-popup"), E = u("van-action-sheet");
  return d(), v("div", eo, [
    p(a, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(o, _({ key: 0 }, e._attrs, {
      domids: e.domids,
      onAdd: e._onAdd,
      onSearch: e._onSearch,
      onExport: e._onExport,
      onSearchExport: e._onSearchExport,
      onImport: e._onImport,
      onMultiDelete: e._onMultiDelete
    }), re({ _: 2 }, [
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
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : $("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), v("div", to, [
      (d(!0), v(P, null, M(e._data, (k, A) => (d(), v("div", {
        key: A,
        class: "row",
        onClick: (b) => i.handleClickCard(A)
      }, [
        F("div", no, [
          i.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[A],
            "onUpdate:modelValue": (b) => n.selected[A] = b,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = Z(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : $("", !0),
          p(m, {
            name: "ellipsis",
            class: "more",
            onClick: Z((b) => i.handleShowActionSheet(k, A), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        i.hasRadio ? (d(), v("input", {
          key: 0,
          type: "radio",
          value: A,
          checked: A === n.checked,
          class: "radio",
          onClick: t[1] || (t[1] = Z(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...b) => e.handleCheckedChange && e.handleCheckedChange(...b))
        }, null, 40, io)) : $("", !0),
        (d(!0), v(P, null, M(i.cols, (b, U) => (d(), v("div", {
          key: U,
          class: "field"
        }, [
          F("span", lo, C(b.label) + ":", 1),
          F("span", oo, C(e.calcValue(k, b)), 1)
        ]))), 128))
      ], 8, so))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(w, _({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (k) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), v(P, null, M(e._data, (k, A) => (d(), f(h, {
          key: A,
          "is-link": "",
          onClick: (b) => i.handleShowDetail(k, A)
        }, {
          default: c(() => [
            i.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[A],
              "onUpdate:modelValue": (b) => n.selected[A] = b,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = Z(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : $("", !0),
            i.hasRadio ? (d(), v("input", {
              key: 1,
              type: "radio",
              value: A,
              checked: A === n.checked,
              class: "radio",
              onClick: t[4] || (t[4] = Z(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...b) => e.handleCheckedChange && e.handleCheckedChange(...b))
            }, null, 40, ao)) : $("", !0),
            i.hasIndex ? (d(), v("span", ro, C(A + 1), 1)) : $("", !0),
            F("span", co, C(i.calcTitle(k)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : $("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(g, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (k) => e._emit("search"))
    }, null, 8, ["query", "total"])) : $("", !0),
    p(D, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (k) => n.popupVisible = k),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        p(y, {
          data: n.scope.row,
          fields: i.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(E, {
      show: n.actionSheetVisible,
      "onUpdate:show": t[9] || (t[9] = (k) => n.actionSheetVisible = k),
      actions: i.actions,
      "cancel-text": "取消",
      "close-on-click-action": "",
      onSelect: i.handleSelectAction,
      onCancel: t[10] || (t[10] = (k) => n.actionSheetVisible = !1)
    }, null, 8, ["show", "actions", "onSelect"])
  ]);
}
const ho = /* @__PURE__ */ O(Zl, [["render", uo], ["__scopeId", "data-v-84e93229"]]), mo = {
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
}, po = (e) => (Re("data-v-a9d96f8a"), e = e(), Pe(), e), fo = {
  class: "table",
  ref: "colsTable"
}, go = ["data-prop"], bo = ["title", "onClick"], _o = /* @__PURE__ */ po(() => /* @__PURE__ */ F("span", { class: "unit" }, "px", -1)), yo = {
  class: "table",
  ref: "sortsTable"
}, vo = ["data-prop"];
function wo(e, t, s, l, n, i) {
  const a = u("el-button"), o = u("Sort"), r = u("el-icon"), m = u("ElCheckbox"), h = u("el-input-number"), w = u("el-tab-pane"), g = u("x-select"), y = u("x-radios"), D = u("el-tabs"), E = u("el-popover");
  return s.visible ? (d(), f(E, _({
    key: 0,
    placement: "bottom",
    trigger: "hover",
    "popper-class": "table-settings"
  }, e.$attrs), {
    reference: c(() => [
      p(a, {
        class: "settings-reference",
        icon: "Setting"
      })
    ]),
    default: c(() => [
      p(D, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (k) => n.activeName = k)
      }, {
        default: c(() => [
          i.hideColumns ? $("", !0) : (d(), f(w, {
            key: 0,
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              p(a, {
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
              F("div", fo, [
                (d(!0), v(P, null, M(n.columns, (k) => (d(), v("div", {
                  key: k.prop,
                  "data-prop": k.prop,
                  class: "row flex-center"
                }, [
                  p(r, null, {
                    default: c(() => [
                      p(o)
                    ]),
                    _: 1
                  }),
                  p(m, {
                    modelValue: k.show,
                    "onUpdate:modelValue": (A) => k.show = A,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  F("span", {
                    class: "label overflow-text",
                    title: k.label,
                    onClick: (A) => i.handleToggle(k)
                  }, C(k.label), 9, bo),
                  p(h, {
                    modelValue: k.width,
                    "onUpdate:modelValue": (A) => k.width = A,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  _o
                ], 8, go))), 128))
              ], 512)
            ]),
            _: 1
          })),
          i.hideSorts ? $("", !0) : (d(), f(w, {
            key: 1,
            name: "sorts",
            label: "多列排序"
          }, {
            default: c(() => [
              p(a, {
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
              F("div", yo, [
                (d(!0), v(P, null, M(n.sorts, (k, A) => (d(), v("div", {
                  key: k[0],
                  "data-prop": k[0],
                  class: "row flex-center"
                }, [
                  p(g, {
                    modelValue: k[0],
                    "onUpdate:modelValue": (b) => k[0] = b,
                    options: n.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(y, {
                    modelValue: k[1],
                    "onUpdate:modelValue": (b) => k[1] = b,
                    options: n.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(a, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (b) => n.sorts.splice(A, 1)
                  }, null, 8, ["onClick"])
                ], 8, vo))), 128))
              ], 512)
            ]),
            _: 1
          }))
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  }, 16)) : $("", !0);
}
const vt = /* @__PURE__ */ O(mo, [["render", wo], ["__scopeId", "data-v-a9d96f8a"]]), { highdict: So } = StardustJs, ko = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...W.props()
  },
  emits: [
    ...W.emits()
  ],
  components: { Searcher: ze, Settings: vt },
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
        ...ge()
      }
    };
  },
  computed: {
    ...W.computed
  },
  watch: {
    ...W.watch,
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
    ...W.methods,
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
        const a = await this.controller.search(n);
        let o = So.get(a, this.controller.listProp);
        return o = this.controller.formatList(this.controller._defaultFormatList(o, a), a), this._lastList = o, o;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, $o = {
  key: 1,
  class: "collapse-title"
}, Co = {
  key: 2,
  class: "collapse-title"
}, xo = /* @__PURE__ */ F("span", null, "-", -1), Vo = ["value", "checked"], Eo = { key: 1 };
function Ao(e, t, s, l, n, i) {
  const a = u("searcher"), o = u("pc-x-icon"), r = u("settings"), m = u("pc-x-table-tools"), h = u("el-image"), w = u("el-tag"), g = u("router-link"), y = u("el-icon"), D = u("el-table-column"), E = u("el-button"), k = u("el-dropdown-item"), A = u("el-dropdown-menu"), b = u("el-dropdown"), U = u("el-table"), G = u("x-pagination"), T = u("el-collapse-item"), N = u("el-collapse"), z = u("x-chart"), H = u("x-dialog"), j = ee("domid"), R = ee("loading"), Q = ee("el-table-infinite-scroll");
  return d(), v(P, null, [
    F("div", {
      class: Y(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      p(a, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      p(N, {
        modelValue: n.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (S) => n.activeNames = S),
        class: Y((n._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          p(T, {
            name: n.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), v("span", $o, C(e.title), 1)) : (d(), v("span", Co, [
                x(C(e.title) + "，当前第 ", 1),
                F("span", null, C(e._query.page), 1),
                x(" 页，展示 "),
                F("span", null, C(e._data.length), 1),
                x(" 条数据， 共 "),
                F("span", null, C(e._total || e._data.length), 1),
                x(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              V(e.$slots, "tools-top"),
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(m, _({ key: 0 }, e._attrs, {
                domids: e.domids,
                onAdd: e._onAdd,
                onKeywordsSearch: e._onKeywordsSearch,
                onSearch: e._onSearch,
                onExport: e._onExport,
                onSearchExport: e._onSearchExport,
                onImport: e._onImport,
                onMultiDelete: e._onMultiDelete
              }), re({
                "tools-end": c(() => [
                  e.hideChart ? $("", !0) : (d(), f(o, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: i.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  F("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...S) => e.handleMinus && e.handleMinus(...S))
                  }, [
                    p(o, { name: "FullScreen" }),
                    xo
                  ]),
                  p(o, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  p(r, _({
                    modelValue: n.settings,
                    "onUpdate:modelValue": t[1] || (t[1] = (S) => n.settings = S)
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
              ]), 1040, ["domids", "onAdd", "onKeywordsSearch", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : $("", !0),
              V(e.$slots, "tools-bottom"),
              I((d(), f(U, _({
                ref: "tableRef",
                "element-loading-text": "加载中..."
              }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), v(P, null, M(e._visibleColumns, (S, L) => (d(), f(D, _({ ref_for: !0 }, S, {
                    key: L,
                    "min-width": S.minWidth,
                    align: S.align || e._attrs.tableAlign || "center",
                    resizable: S.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(S)
                  }), re({ _: 2 }, [
                    ["selection", "index"].includes(S.type) ? void 0 : {
                      name: "default",
                      fn: c((B) => [
                        S.type === "radio" ? (d(), v("input", {
                          key: 0,
                          type: "radio",
                          value: B.$index,
                          checked: B.$index === n.checked,
                          onChange: t[3] || (t[3] = (...ye) => e.handleCheckedChange && e.handleCheckedChange(...ye))
                        }, null, 40, Vo)) : S.slot === "$image" ? (d(), f(h, _({
                          key: 1,
                          src: e._imageSrc(B, S),
                          "preview-src-list": e._imagePreviewSrcList(B, S),
                          "preview-teleported": "",
                          ref_for: !0
                        }, S.imageAttrs), null, 16, ["src", "preview-src-list"])) : S.slot === "$tag" ? (d(), f(w, {
                          key: 2,
                          type: e.calcTagType(B, S)
                        }, {
                          default: c(() => [
                            x(C(e.calcTagValue(B, S)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : S.slot === "$link" ? (d(), f(g, {
                          key: 3,
                          to: S.to(B.row)
                        }, {
                          default: c(() => [
                            x(C(e.calcLink(B.row, S)), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"])) : S.slot === "$icon" ? (d(), f(y, {
                          key: 4,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(se(B.row[S.prop])))
                          ]),
                          _: 2
                        }, 1024)) : S.slot ? V(e.$slots, S.slot, {
                          key: 5,
                          scope: B,
                          column: S,
                          value: B.row[S.prop]
                        }) : e.slotAll ? V(e.$slots, "all", {
                          key: 6,
                          scope: B,
                          column: S,
                          value: B.row[S.prop]
                        }) : (d(), v(P, { key: 7 }, [
                          S.comp === "ElSwitch" || e.table.isRowEdit && B.row.isEditing && (S.visible !== !1 || S.canEdit) ? (d(), f(se(S.comp || "ElInput"), _({
                            key: 0,
                            ref_for: !0
                          }, { ...S, ...S.formAttrs }, {
                            modelValue: B.row[S.prop],
                            "onUpdate:modelValue": (ye) => B.row[S.prop] = ye,
                            disabled: !B.row.editable || !B.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), v("span", Eo, C(e.calcValue(B.row, S)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? $("", !0) : (d(), f(D, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((S) => [
                      V(e.$slots, "operates-prefix", { scope: S }),
                      e.operatesDropdown ? (d(), f(b, {
                        key: 0,
                        class: "operates-dropdown"
                      }, {
                        dropdown: c(() => [
                          p(A, { class: "operates-dropdown-menu" }, {
                            default: c(() => [
                              e.canEdit(S.row) ? (d(), f(k, { key: 0 }, {
                                default: c(() => [
                                  I((d(), f(E, _({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    class: "x-table-edit",
                                    onClick: (L) => e._emit("edit", S)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [j, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : $("", !0),
                              e.canSave(S.row) ? (d(), f(k, { key: 1 }, {
                                default: c(() => [
                                  I((d(), f(E, _({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: S.row._loading,
                                    icon: "collection",
                                    class: "x-table-row-edit",
                                    onClick: (L) => e._emit("row-edit", S)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [R, S.row._loading],
                                    [j, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : $("", !0),
                              e.canCancelEdit(S.row) ? (d(), f(k, { key: 2 }, {
                                default: c(() => [
                                  I((d(), f(E, _({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    class: "x-table-cancel-edit",
                                    onClick: (L) => e._emit("cancel-edit", S)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [j, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : $("", !0),
                              e.canDelete(S.row) ? (d(), f(k, { key: 3 }, {
                                default: c(() => [
                                  I((d(), f(E, _({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    class: "x-table-delete",
                                    onClick: (L) => e._emit("delete", S)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["delete-btn-text"] ?? "删除"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [j, e.domids.delete]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : $("", !0)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: c(() => [
                          I((d(), f(E, _({ type: "primary", ...e._attrs["operates-btn"] }, {
                            icon: "arrow-down",
                            class: "x-table-operates"
                          }), {
                            default: c(() => [
                              x(C(e._attrs["operates-btn-text"] ?? "操作"), 1)
                            ]),
                            _: 1
                          }, 16)), [
                            [j, e.domids.operates]
                          ])
                        ]),
                        _: 2
                      }, 1024)) : $("", !0),
                      !e.operatesDropdown && e.canEdit(S.row) ? I((d(), f(E, _({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        class: "x-table-edit",
                        onClick: (L) => e._emit("edit", S)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [j, e.domids.edit]
                      ]) : $("", !0),
                      !e.operatesDropdown && e.canSave(S.row) ? I((d(), f(E, _({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: S.row._loading,
                        icon: "collection",
                        class: "x-table-row-edit",
                        onClick: (L) => e._emit("row-edit", S)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [R, S.row._loading],
                        [j, e.domids["row-edit"]]
                      ]) : $("", !0),
                      !e.operatesDropdown && e.canCancelEdit(S.row) ? I((d(), f(E, _({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        class: "x-table-cancel-edit",
                        onClick: (L) => e._emit("cancel-edit", S)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [j, e.domids["cancel-edit"]]
                      ]) : $("", !0),
                      !e.operatesDropdown && e.canDelete(S.row) ? I((d(), f(E, _({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        class: "x-table-delete",
                        onClick: (L) => e._emit("delete", S)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["delete-btn-text"] ?? "删除"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [j, e.domids.delete]
                      ]) : $("", !0),
                      V(e.$slots, "operates-suffix", { scope: S })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["infinite-scroll-disabled", "onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [R, e._loading],
                [Q, e._onLoad]
              ]),
              e._query && e._total && !e.hidePagination ? (d(), f(G, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: i.onPaging
              }, null, 8, ["query", "total", "onSearch"])) : $("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? $("", !0) : (d(), f(H, {
      key: 0,
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (S) => n.dialog.visible = S),
      title: "图表",
      width: "96%",
      onFullscreenchange: i.handleChartDialogFullscreen
    }, {
      default: c(() => [
        p(z, {
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
const Oo = /* @__PURE__ */ O(ko, [["render", Ao]]), jo = {
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
}, Fo = { class: "mobile-x-table-tools" }, To = { key: 0 }, Do = { class: "tools" }, Io = { class: "tools-end" };
function Ro(e, t, s, l, n, i) {
  const a = u("van-floating-bubble"), o = u("mobile-x-icon"), r = u("van-button"), m = ee("domid");
  return d(), v("div", Fo, [
    e.$attrs.onAdd ? I((d(), v("div", To, [
      p(a, {
        axis: "xy",
        magnetic: "x",
        icon: "plus",
        class: "flex-center x-table-search",
        style: { position: "fixed", top: "0", "font-size": "22px", width: "40px", height: "40px", "background-color": "#1989fa", "border-radius": "50%", color: "white" },
        onClick: t[0] || (t[0] = (h) => e.$emit("add"))
      })
    ])), [
      [m, s.domids.add]
    ]) : $("", !0),
    F("div", Do, [
      V(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? I((d(), f(r, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        class: "x-table-search",
        onClick: t[1] || (t[1] = (h) => e.$emit("search"))
      }), {
        default: c(() => [
          p(o, { name: "search" }),
          x(" 高级查询 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.search]
      ]) : $("", !0),
      e.$attrs.onMultiEdit ? I((d(), f(r, _({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        class: "x-table-edit",
        onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          p(o, { name: "edit" }),
          x(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["multi-edit"]]
      ]) : $("", !0),
      e.$attrs.onMultiDelete ? I((d(), f(r, _({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        class: "x-table-multi-delete",
        onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          p(o, { name: "DeleteFilled" }),
          x(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["multi-delete"]]
      ]) : $("", !0),
      e.$attrs.onExport ? I((d(), f(r, _({ key: 3 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-export",
        onClick: t[4] || (t[4] = (h) => e.$emit("export"))
      }), {
        default: c(() => [
          p(o, { name: "printer" }),
          x(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.export]
      ]) : $("", !0),
      e.$attrs.onSearchExport ? I((d(), f(r, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-search-export",
        onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
      }), {
        default: c(() => [
          p(o, { name: "printer" }),
          x(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["search-export"]]
      ]) : $("", !0),
      e.$attrs.onImport ? I((d(), f(r, _({ key: 5 }, { type: "warning", ...s.importBtn }, {
        class: "x-table-import",
        onClick: t[6] || (t[6] = (h) => e.$emit("import"))
      }), {
        default: c(() => [
          p(o, { name: "UploadFilled" }),
          x(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.import]
      ]) : $("", !0),
      V(e.$slots, "tools-suffix", {}, void 0, !0),
      F("div", Io, [
        V(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const Po = /* @__PURE__ */ O(jo, [["render", Ro], ["__scopeId", "data-v-dda9e446"]]), Mo = {
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
}, No = { class: "tools" }, Bo = { class: "tools-end flex-center" };
function Lo(e, t, s, l, n, i) {
  const a = u("el-input"), o = u("el-button"), r = u("el-card"), m = ee("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      F("div", No, [
        V(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onKeywordsSearch ? I((d(), f(a, {
          key: 0,
          modelValue: n.keywords,
          "onUpdate:modelValue": t[0] || (t[0] = (h) => n.keywords = h),
          placeholder: e.$attrs["keywords-placeholder"] || "输入关键词搜索",
          clearable: "",
          class: "keywords-search",
          onKeyup: t[1] || (t[1] = Me((h) => e.$emit("keywords-search", n.keywords.trim()), ["enter"]))
        }, null, 8, ["modelValue", "placeholder"])), [
          [m, s.domids["keywords-search"]]
        ]) : $("", !0),
        e.$attrs.onSearch ? I((d(), f(o, _({ key: 1 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          class: "x-table-search",
          onClick: t[2] || (t[2] = (h) => e.$emit("search"))
        }), {
          default: c(() => [
            x(C(e.$attrs["search-btn-text"] ?? "高级查询"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids.search]
        ]) : $("", !0),
        e.$attrs.onAdd ? I((d(), f(o, _({ key: 2 }, { type: "primary", ...s.addBtn }, {
          icon: "circle-plus-filled",
          class: "x-table-add",
          onClick: t[3] || (t[3] = (h) => e.$emit("add"))
        }), {
          default: c(() => [
            x(C(e.$attrs["add-btn-text"] ?? "新增"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids.add]
        ]) : $("", !0),
        e.$attrs.onMultiEdit ? I((d(), f(o, _({ key: 3 }, { type: "warning", ...s.multiEditBtn }, {
          icon: "edit",
          class: "x-table-edit",
          onClick: t[4] || (t[4] = (h) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            x(C(e.$attrs["edit-btn-text"] ?? "编辑"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids["multi-edit"]]
        ]) : $("", !0),
        e.$attrs.onMultiDelete ? I((d(), f(o, _({ key: 4 }, { type: "danger", ...s.multiDeleteBtn }, {
          icon: "DeleteFilled",
          class: "x-table-multi-delete",
          onClick: t[5] || (t[5] = (h) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            x(C(e.$attrs["multi-delete-btn-text"] ?? "批量删除"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids["multi-delete"]]
        ]) : $("", !0),
        e.$attrs.onExport ? I((d(), f(o, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-export",
          onClick: t[6] || (t[6] = (h) => e.$emit("export"))
        }), {
          default: c(() => [
            x(C(e.$attrs["export-btn-text"] ?? "导出"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids.export]
        ]) : $("", !0),
        e.$attrs.onSearchExport ? I((d(), f(o, _({ key: 6 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-search-export",
          onClick: t[7] || (t[7] = (h) => e.$emit("search-export"))
        }), {
          default: c(() => [
            x(C(e.$attrs["search-export-btn-text"] ?? "查询导出"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids["search-export"]]
        ]) : $("", !0),
        e.$attrs.onImport ? I((d(), f(o, _({ key: 7 }, { type: "warning", ...s.importBtn }, {
          icon: "UploadFilled",
          class: "x-table-import",
          onClick: t[8] || (t[8] = (h) => e.$emit("import"))
        }), {
          default: c(() => [
            x(C(e.$attrs["import-btn-text"] ?? "导入"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids.import]
        ]) : $("", !0),
        V(e.$slots, "tools-suffix", {}, void 0, !0),
        F("div", Bo, [
          V(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Uo = /* @__PURE__ */ O(Mo, [["render", Lo], ["__scopeId", "data-v-3d6b703b"]]);
function wt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ot(e);
}
const qo = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, l = (n) => {
    n ? e._data.forEach((a, o) => e.selected.add(o)) : e.selected.clear();
    const i = n ? e._data.slice() : [];
    e.handleSelectionChange(i);
  };
  return p(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: l
  }, null);
}, zo = (e, t) => {
  const {
    rowIndex: s,
    rowData: l
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const i = [...t.selected].map((a) => t._data[a]);
    t.handleSelectionChange(i);
  };
  return p(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, Xo = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, Wo = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return p("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, _e = ([e, t, s, l, n, i]) => {
  const {
    rowIndex: a,
    rowData: o
  } = e, r = () => {
    t._emit(s, {
      $index: a,
      row: o
    });
  };
  return p(u("el-button"), _({
    type: l
  }, t._attrs[s + "-btn"], {
    icon: n,
    onClick: r
  }), wt(i) ? i : {
    default: () => [i]
  });
}, Ho = (e, t) => {
  if (t.canEdit(e.rowData))
    return _e([e, t, "edit", "warning", "edit", "编辑"]);
}, Jo = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return _e([e, t, "row-edit", "success", "collection", "保存"]);
}, Ko = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return _e([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Yo = (e, t) => {
  if (t.canDelete(e.rowData))
    return _e([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Go = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => zo(i, t);
  if (e.type === "index")
    return (i) => Xo(i, t);
  if (e.type === "radio")
    return (i) => Wo(i, t);
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
      rowData: a,
      column: o
    } = i;
    if (o.comp === "ElSwitch" || t.table.isRowEdit && a.isEditing && (o.visible !== !1 || o.canEdit)) {
      const h = (g) => {
        a[o.prop] = g;
      }, w = o.comp || "ElInput";
      return ne(u(w), {
        ...o,
        ...o.formAttrs,
        modelValue: a[o.prop],
        onInput: h,
        disabled: !a.editable || !a.isEditing
      });
    }
    const r = t.calcValue(i.rowData, e), {
      showOverflowTooltip: m
    } = o.tableAttrs || {};
    return m ? p(u("el-tooltip"), {
      content: r
    }, wt(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Qo = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, n = e.map((i, a) => {
    const {
      tableAttrs: o = {}
    } = i, r = {
      ...i,
      key: i.prop,
      dataKey: i.prop,
      title: i.label,
      width: i.width || o.width || i.minWidth || o.minWidth || i.maxWidth || o.maxWidth,
      align: i.align || s.tableAlign || "center"
    };
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = qo(t)), r.cellRenderer = Go(r, t), r;
  });
  return t.hideOperates || n.push({
    key: n.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 150,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(i) {
      return p("div", {
        class: "operates"
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, Ho(i, t), Jo(i, t), Ko(i, t), Yo(i, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), n;
}, Zo = {
  convertColumnsForTableV2: Qo
}, ea = {
  name: "XTableV2",
  props: {
    ...W.props(),
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
    ...W.emits()
  ],
  components: { Searcher: ze, Settings: vt },
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
    ...W.computed
  },
  watch: {
    ...W.watch,
    settings: "saveSettings"
  },
  created() {
    this.initSettings();
  },
  mounted() {
    this.table && (this.table.tableRef = this.$refs.tableRef), this.$emit("update:tref", this.$refs.tableRef);
  },
  methods: {
    ...W.methods,
    convertColumnsForTableV2: Zo.convertColumnsForTableV2
  }
}, ta = { key: 1 };
function sa(e, t, s, l, n, i) {
  const a = u("Searcher"), o = u("x-icon"), r = u("Settings"), m = u("x-table-tools"), h = u("el-table-v2"), w = u("el-auto-resizer"), g = u("x-pagination"), y = u("el-collapse-item"), D = u("el-collapse"), E = ee("loading");
  return d(), v("div", {
    class: Y(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    p(a, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (k) => e._emit("search", k))
    }, null, 8, ["uid", "columns", "config"]),
    p(D, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (k) => n.activeNames = k),
      class: Y((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        p(y, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", ta, C(e.title), 1))
          ]),
          default: c(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(m, _({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiDelete: e._onMultiDelete
            }), re({
              "tools-end": c(() => [
                p(o, {
                  name: "FullScreen",
                  class: "full",
                  onClick: e.handleToggleFullscreen
                }, null, 8, ["onClick"]),
                p(r, {
                  modelValue: n.settings,
                  "onUpdate:modelValue": t[1] || (t[1] = (k) => n.settings = k),
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
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : $("", !0),
            p(w, {
              style: $t({ height: s.height })
            }, {
              default: c(({ width: k, height: A }) => [
                I((d(), f(h, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: i.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: k,
                  height: A
                }), re({ _: 2 }, [
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
                  [E, e._loading]
                ])
              ]),
              _: 3
            }, 8, ["style"]),
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(g, {
              key: 1,
              query: e._query,
              total: e._total,
              onSearch: t[2] || (t[2] = (k) => e._emit("search"))
            }, null, 8, ["query", "total"])) : $("", !0)
          ]),
          _: 3
        }, 8, ["name"])
      ]),
      _: 3
    }, 8, ["modelValue", "class"])
  ], 2);
}
const na = /* @__PURE__ */ O(ea, [["render", sa]]), xe = ["selection", "radio"], ia = {
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
      xe.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !xe.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if (xe.includes(t)) {
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
}, la = { class: "x-table-viewer" };
function oa(e, t, s, l, n, i) {
  const a = u("x-dialog");
  return d(), v("div", la, [
    p(a, _(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (o) => e.$emit("update:visible", o)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: c(() => [
        (d(), f(se(s.useTableV2 ? "x-table-v2" : "x-table"), _({
          tref: i.table.tableRef,
          "onUpdate:tref": t[0] || (t[0] = (o) => i.table.tableRef = o),
          table: i.table
        }, i._tableAttrs, {
          onSearch: s.controller.handleSearch
        }), null, 16, ["tref", "table", "onSearch"]))
      ]),
      _: 1
    }, 16, ["modelValue", "title", "before-close", "onSubmit", "onCancel"])
  ]);
}
const aa = /* @__PURE__ */ O(ia, [["render", oa], ["__scopeId", "data-v-e6f36700"]]), ra = {
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
}, da = { class: "mobile-x-tags" };
function ca(e, t, s, l, n, i) {
  const a = u("van-tag");
  return d(), v("div", da, [
    (d(!0), v(P, null, M(i._data, (o, r) => (d(), f(a, _({
      key: r,
      ref_for: !0
    }, { ...e.$attrs, item: o }, {
      onClose: (m) => e.$emit("close", o[s.text], r)
    }), {
      default: c(() => [
        x(C(o[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const ua = /* @__PURE__ */ O(ra, [["render", ca], ["__scopeId", "data-v-d8beefdf"]]), ha = {
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
}, ma = { class: "pc-x-tags" };
function pa(e, t, s, l, n, i) {
  const a = u("el-tag");
  return d(), v("div", ma, [
    (d(!0), v(P, null, M(i._data, (o, r) => (d(), f(a, _({
      key: r,
      ref_for: !0
    }, { ...e.$attrs, item: o }, {
      onClose: (m) => e.$emit("close", o[s.text], r)
    }), {
      default: c(() => [
        x(C(o[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const fa = /* @__PURE__ */ O(ha, [["render", pa], ["__scopeId", "data-v-bd702be1"]]), ga = {
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
}, ba = { class: "x-tinymce" }, _a = ["id", "innerHTML"];
function ya(e, t, s, l, n, i) {
  return d(), v("div", ba, [
    F("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, _a)
  ]);
}
const va = /* @__PURE__ */ O(ga, [["render", ya]]), wa = {
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
}, Xe = (e) => (Re("data-v-a3a105f3"), e = e(), Pe(), e), Sa = { class: "mask" }, ka = {
  key: 0,
  class: "el-upload__text"
}, $a = /* @__PURE__ */ Xe(() => /* @__PURE__ */ F("em", null, "点击上传", -1)), Ca = /* @__PURE__ */ Xe(() => /* @__PURE__ */ F("br", null, null, -1)), xa = /* @__PURE__ */ Xe(() => /* @__PURE__ */ F("br", null, null, -1)), Va = {
  key: 0,
  class: "path"
};
function Ea(e, t, s, l, n, i) {
  const a = u("pc-x-icon"), o = u("el-button"), r = u("el-upload");
  return d(), f(r, _({
    "file-list": n.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (m) => n.fileList = m),
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
      F("div", Sa, [
        p(a, { name: "upload-filled" }),
        n.disabled ? $("", !0) : (d(), v("div", ka, [
          x(" 将文件拖到此处，或"),
          $a,
          Ca,
          xa,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(o, {
            key: 0,
            type: "success",
            onClick: Z(i.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              x(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : $("", !0)
        ]))
      ]),
      i.filepath ? (d(), v("div", Va, C(s.modelValue), 1)) : $("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const Aa = /* @__PURE__ */ O(wa, [["render", Ea], ["__scopeId", "data-v-a3a105f3"]]), Oa = {
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
      X({ type: "warning", message: "超出图片限制数量" });
    }
  }
}, ja = ["src"];
function Fa(e, t, s, l, n, i) {
  const a = u("Plus"), o = u("el-icon"), r = u("el-upload"), m = u("x-dialog");
  return d(), v(P, null, [
    p(r, _({
      "file-list": n.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (h) => n.fileList = h),
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
        p(o, null, {
          default: c(() => [
            p(a)
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["file-list", "onUpdate:fileList", "action", "multiple", "limit", "class", "on-preview", "on-exceed", "auto-upload", "on-remove"]),
    p(m, {
      modelValue: n.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (h) => n.dialogVisible = h),
      actionsheet: "",
      title: "预览图片" + (n.previewingImage.name || "")
    }, {
      default: c(() => [
        F("img", {
          src: n.previewingImage.url,
          alt: "previewing-image",
          class: "previewing-image"
        }, null, 8, ja)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const Ta = /* @__PURE__ */ O(Oa, [["render", Fa], ["__scopeId", "data-v-0afe3ea6"]]), Ve = {
  xarray: es,
  xautorows: ls,
  mobilexbutton: rs,
  pcxbutton: us,
  xchart: Fs,
  mobilexcheckboxs: Is,
  pcxcheckboxs: Ns,
  mobilexcol: Us,
  pcxcol: Xs,
  mobilexdialog: Ys,
  pcxdialog: en,
  xdict: ln,
  xdistrictselect: rn,
  mobilexform: _n,
  pcxform: Sn,
  mobilexformitem: xn,
  pcxformitem: Vn,
  mobilexicon: jn,
  pcxicon: In,
  xinfo: Qi,
  xlooper: sl,
  mobilexpagination: ll,
  pcxpagination: rl,
  xpicker: ul,
  mobilexradios: pl,
  pcxradios: _l,
  mobilexrow: Sl,
  pcxrow: xl,
  mobilexscan: Al,
  pcxscan: Fl,
  mobilexselect: Il,
  pcxselect: Ll,
  xselectv2: Hl,
  mobilextable: ho,
  pcxtable: Oo,
  mobilextabletools: Po,
  pcxtabletools: Uo,
  xtablev2: na,
  xtableviewer: aa,
  mobilextags: ua,
  pcxtags: fa,
  xtinymce: va,
  xfileuploader: Aa,
  ximageuploader: Ta
}, de = {};
for (let e in Ve)
  de[Ve[e].name] = Ve[e];
const { ElInfiniteScroll: it } = window.ElementPlus || {}, pe = ".el-scrollbar__wrap", lt = (e, t) => {
  Da(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", l = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (l < 1 ? 1 : l) + "");
}, Da = (e, t, s) => {
  let l;
  s.forEach((n) => {
    l = e.getAttribute(n), l !== null ? t.setAttribute(n, l) : t.removeAttribute(n);
  });
}, Ia = {
  name: "el-table-infinite-scroll",
  mounted(e, t, s, l) {
    const n = e.querySelector(pe);
    if (!n)
      throw new Error(`${pe} element not found.`);
    n.style.overflowY = "auto", setTimeout(() => {
      !e.style.height && !e.style.maxHeight && (n.style.height = "400px", console.warn("el-table height required, otherwise will set scrollbar default height: 400px")), lt(e, n), it.mounted(n, t, s, l);
    }, 0);
  },
  updated(e) {
    lt(e, e.querySelector(pe));
  },
  unmounted(e, ...t) {
    const s = e.querySelector(pe);
    it.unmounted(s, ...t);
  }
}, Ee = {
  ElTableInfiniteScroll: Ia
}, Ra = (e) => ({
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
    return ne(de[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), Te = (() => {
  const e = Object.keys(de), t = [...new Set(e.map((l) => l.replace(/(pc|mobile)/i, "")))], s = {};
  for (const l of e)
    /(pc|mobile)/i.test(l) && (s[l] = de[l]);
  for (const l of t)
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(l.toLowerCase())) ? s[l] = Ra(l) : s[l] = de[l];
  return s;
})(), Pa = (e, t) => {
  for (let s in Te)
    e.component(s, Te[s]);
  for (let s in Ee)
    e.directive(Ee[s].name, Ee[s]);
}, Na = {
  version: "1.6.6",
  ...Te,
  ...ft,
  ...Jt,
  install: Pa
};
export {
  gt as BaseController,
  te as Confirm,
  bt as CrudController,
  X as Message,
  fe as Notify,
  Ht as TempCrudController,
  ge as baseDialog,
  ce as baseForm,
  Bt as baseModel,
  rt as baseTable,
  Jt as controllers,
  Na as default,
  Vt as effects,
  J as formatOptions,
  Et as formatPrecision,
  ht as initDefaultForm,
  ct as initDialog,
  Lt as initFields,
  ue as initForm,
  ut as initFormRules,
  Ut as initModel,
  dt as initTable,
  mt as isWhenMatched,
  pt as triggers,
  ft as utils,
  at as validateForm
};
