import { toRaw as St, markRaw as le, nextTick as oe, watch as De, resolveComponent as u, openBlock as d, createElementBlock as v, createElementVNode as T, createVNode as p, withCtx as c, createTextVNode as x, Fragment as P, renderList as B, mergeProps as y, createBlock as f, renderSlot as V, toDisplayString as C, useCssVars as Ie, resolveDirective as ee, withDirectives as I, createCommentVNode as $, vShow as We, pushScopeId as Re, popScopeId as Pe, resolveDynamicComponent as se, createSlots as re, withModifiers as Z, normalizeClass as Y, h as ne, isVNode as ot, normalizeProps as kt, withKeys as Me, normalizeStyle as $t } from "vue";
const Ct = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const l = e.getContext("2d");
  class n {
    constructor(L, z, H, F, R, Q, w) {
      this.x = L, this.y = z, this.radius = H, this.color = F, this.vx = R, this.vy = Q, this.ctx = w;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const i = () => l.clearRect(0, 0, t, s), o = (D) => Math.floor(Math.random() * D);
  let a = 0, r = 0.01, m = 0;
  const h = () => {
    const D = l.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    m ? m-- : (a += r, a <= 0 && (a = 0, r = -r, m = g * 30), a >= 1 && (a = 1, r = -r, m = g * 30)), D.addColorStop(0, "rgba(250, 220, 20, 0.5)"), D.addColorStop(a, "rgba(20, 20, 20, 0.5)"), l.fillStyle = D, l.fillRect(0, 0, t, s);
  }, S = Math.floor(t / 100), b = Math.floor(s / 100), g = 20, j = Math.round(1e3 / g), E = Array.from({ length: 52 }).map(() => {
    const D = Math.floor(o(S + b) * 1.5 + o(5));
    let L = o(t), z = o(s);
    L = Math.min(Math.max(D, L), t - D), z = Math.min(Math.max(D, z), s - D);
    let H = o(2) ? (o(2) + 2) * S : (o(-1) - 2) * S, F = o(2) ? (o(2) + 2) * b : (o(-1) - 2) * b;
    return H = Math.floor(H / g), F = Math.floor(F / g), new n(
      L,
      z,
      D,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      H,
      F,
      l
    );
  });
  let k, A;
  e.addEventListener("mouseover", (D) => {
    k = D.pageX, A = D.pageY;
  }), e.addEventListener("mousemove", (D) => {
    if (k === void 0) {
      k = D.pageX, A = D.pageY;
      return;
    }
    const L = D.pageX - k, z = D.pageY - A;
    E.forEach((H) => {
      H.x += L / g, H.y += z / g;
    }), k = D.pageX, A = D.pageY;
  });
  let _ = Date.now(), U = null;
  const G = () => {
    Date.now() - _ >= j && (i(), h(), E.forEach((D) => D.update()), _ = Date.now()), U = requestAnimationFrame(G);
  };
  return U = requestAnimationFrame(G), () => cancelAnimationFrame(U);
}, xt = ({
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
  const h = r.measureText(e).width + t, S = s + t;
  for (let b = t / 2; b < i; b += S)
    for (let g = t / 2; g < n; g += h)
      r[o + "Text"](e, g, b);
  return a;
}, Vt = {
  pop: Ct,
  createWatermark: xt
}, at = async (e) => {
  var l, n;
  const t = await ((l = e.formRef) == null ? void 0 : l.validate().then(() => !0).catch(() => !1)), s = await Promise.all((n = e.formItems) == null ? void 0 : n.filter((i) => {
    var o, a;
    return ((o = i.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = i.comp) == null ? void 0 : a.endsWith("x-form"));
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
  const s = e.__v_isRef ? e.value : St(e), { text: l = "text", value: n = "value" } = t, i = s.map((a) => typeof a == "object" ? { text: a[l], value: a[n], disabled: a.disabled, raw: le(a) } : { text: a, value: a });
  if (!t.sort)
    return i;
  const o = typeof t.sort == "string" ? t.sort : t.text || "text";
  return i.sort((a, r) => a[o].localeCompare(r[o]));
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
    var a;
    const i = l.matched[l.matched.length - 1].path.split("/:")[0];
    if (l.meta.acl === !1 || (a = l.meta) != null && a.visitable)
      return !0;
    for (; t.getters.logging; )
      await It.sleep(20);
    if (await oe(), t.acl.paths.includes(i))
      return !0;
    const o = { redirectTo: l.path, ...l.query };
    return t.getters.logined && (o.error = "受限于您的账号权限，暂时无法访问 " + l.path + " 页面，如有需要请联系我们", X({ message: o.error, duration: 1e4 })), { path: t.acl.paths[0] || "/404", query: o };
  }), oe(() => {
    let l = !1;
    De(() => t.acl.menus, (n) => {
      if (!l) {
        if (!n.length)
          return;
        l = !0;
      }
      const i = t.acl.paths, o = (a, r) => {
        var h, S, b, g, j, E, k;
        let m;
        a.redirect && !a.component ? m = a.redirect : m = [...r, a].reduce((A, _) => A + "/" + _.path, "").replace("//", "/"), a.meta || (a.meta = {}), a.meta.acl === !1 ? (h = a.children) == null || h.forEach((A) => {
          var _;
          A.meta || (A.meta = {}), (_ = A.meta).acl || (_.acl = !1), o(A, [...r, a]);
        }) : (a.meta._hidden = a.meta.hidden, parent && (a.meta.hidden == null && ((b = a.meta).hidden ?? (b.hidden = (S = parent.meta) == null ? void 0 : S.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((j = a.meta).visitable ?? (j.visitable = (g = parent.meta) == null ? void 0 : g.visitable), a.meta = { ...a.meta })), (E = a.children) == null || E.forEach((A) => o(A, [...r, a])), a.meta.hidden !== !1 && a.meta._hidden !== !0 && (a.meta.hidden = !i.includes(m), (k = a.children) != null && k.some((A) => A.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach((a) => o(a, []));
    }, { immediate: !0 });
  });
}, Bt = {
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
}), Lt = ({
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
}), { funcs: Ae } = StardustJs, Nt = (e) => e.map((t) => {
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
    let { formAttrs: o = {}, required: a = !1 } = i;
    return a = "required" in o ? o.required : a, !i.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(i.prop) && a !== !1;
  }).map((i) => i.prop);
  if (Object.assign(e.formRules, Ae.deepCopy(s)), Object.keys(e.formRules).forEach((i) => {
    i in s || delete e.formRules[i];
  }), !l.length)
    return;
  const n = {};
  return l.forEach((i) => {
    if (e.formRules[i])
      return;
    const o = t.find((g) => g.prop === i), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = pt[a], m = [], h = "options" in o, b = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${h ? "选择" : "输入"}${(o == null ? void 0 : o.label) || i}` };
    o.validator && (b.validator = (g, j) => a === "pc" ? o.validator(g, j) : o.validator(j, g)), o.asyncValidator && (b.asyncValidator = (g, j) => a === "pc" ? o.asyncValidator(g, j) : o.asyncValidator(j, g)), o.comp ? m.push({ ...b, trigger: r.change }) : m.push({ ...b, trigger: r.blur }), o.comp === "ElInputNumber" && m.push({ ...b, trigger: r.blur }), n[i] = m;
  }), Object.assign(e.formRules, n), e.formRules;
}, ht = (e, t, s = !0) => {
  const l = {};
  return t.forEach((n) => {
    var m, h;
    let i = "";
    const { type: o, options: a } = n, { multiple: r } = n.formAttrs || {};
    if (s && o === "number" || n.comp === "ElInputNumber")
      i = 0;
    else if (n.comp === "ElSwitch")
      i = !1;
    else if (a && ((m = n.comp) != null && m.endsWith("XCheckboxs") || (h = n.comp) != null && h.endsWith("x-checkboxs") || r))
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
  middlewares: Bt,
  baseForm: ce,
  baseTable: rt,
  baseDialog: ge,
  baseModel: Lt,
  initFields: Nt,
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
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.getOwnPropertyDescriptors(this.__proto__), l = Object.keys(s).filter((o) => o !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...l])).filter((o) => typeof this[o] == "function").forEach((o) => {
      this[o] = this[o].bind(this);
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
    const { model: s, table: l, dialog: n, dbModelName: i = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = l || (s == null ? void 0 : s.table), this.dialog = n || (s == null ? void 0 : s.dialog), this.dbModelName = i, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], oe(() => {
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
    let o = n.length > 0 ? n : l;
    o = He.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(i._visibleColumns, "current"), r = a.map((b) => b.prop), m = a.map((b) => b.label);
    o = o.map((b) => r.map((g) => b[g]));
    let h = null;
    t === "csv" ? h = he.export2Csv : h = he.export2Excel;
    let S = { list: l, header: m, data: o, filename: s };
    S = await this.processExporting(S), h(S), this.table.loading = !1;
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
    const i = this.processExportingColumns(this.table.ref._visibleColumns, "search-export"), o = i.map((h) => h.prop), a = i.map((h) => h.label);
    n = n.map((h) => o.map((S) => h[S]));
    let r = null;
    t === "csv" ? r = he.export2Csv : r = he.export2Excel;
    let m = { list: l.data, header: a, data: n, filename: s };
    m = await this.processExporting(m), r(m), this.table.loading = !1;
  }
  async handleImport() {
    var i, o;
    if (this.table.loading)
      return;
    const t = await Je.select(".xlsx,.csv");
    this.table.loading = !0;
    const s = t.name.toLowerCase().endsWith(".csv"), l = await Je.toType(t, s ? "text" : "arraybuffer");
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
      this.table.columns.forEach((m) => a[m.label] = m.prop);
      const r = Object.keys(n[0]);
      n = n.map((m) => {
        const h = {};
        return r.forEach((S) => h[a[S]] = m[S]), h;
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
      const { page: i, limit: o, order: a, count: r, ...m } = s;
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
    const { columns: l, query: n } = this.table, { page: i, limit: o } = n;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (i - 1) * o + r + 1;
    }), l.forEach((a) => {
      let { prop: r, options: m } = a;
      const { format: h, autoFill: S } = a.tableAttrs || {}, { modelName: b } = a.formAttrs || {};
      if (b && S)
        t.forEach((g) => g[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(m) && h !== !1) {
        const j = De(() => a.options, (E, k) => {
          const A = k ? this.table.list : t, _ = Wt(a);
          A.forEach((U, G) => {
            const D = U[r];
            U[`_formatted_${r}`] = _[D] || D;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(j);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const l = [...new Set(t.map((m) => m[s.prop]))];
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
      let { formatter: o = i.formatter, tagValues: a = i.tagValues, options: r = i.options } = i.tableAttrs || {};
      !o && typeof a == "function" && (o = a), l[i.prop] = { formatter: o, tagValues: a, options: r };
    });
    const n = [...new Set(Object.keys(t[0]).concat(this.table.ref._visibleColumns.map((i) => i.prop).filter((i) => i)))];
    return t.forEach((i) => {
      n.forEach((o) => {
        var r, m, h, S;
        const a = i[o];
        if (i.hasOwnProperty("_formatted_" + o))
          return i[o] = i["_formatted_" + o];
        if ((r = l[o]) != null && r.formatter)
          return i[o] = l[o].formatter(a);
        if ((m = l[o]) != null && m.tagValues)
          return i[o] = l[o].tagValues[a];
        if ((h = l[o]) != null && h.options)
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
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    i[o[n]] = o[l];
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
  const o = u("x-icon"), a = u("x-button"), r = u("x-form");
  return d(), v("div", Yt, [
    T("div", Gt, [
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
    T("div", Qt, [
      (d(!0), v(P, null, B(n.groups, (m, h) => (d(), v("div", {
        key: h,
        class: "group"
      }, [
        p(r, y({
          form: m,
          "hide-labels": "",
          gutter: 10,
          ref_for: !0
        }, e.$attrs, { class: "form" }), null, 16, ["form"]),
        p(a, {
          type: "success",
          plain: "",
          icon: "CopyDocument",
          onClick: (S) => i.handleCopy(m, h),
          class: "button"
        }, null, 8, ["onClick"]),
        p(a, {
          type: "danger",
          plain: "",
          icon: "DeleteFilled",
          onClick: (S) => n.groups.splice(h, 1),
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
  const o = u("x-col"), a = u("x-row");
  return d(), v("div", ss, [
    (d(!0), v(P, null, B(i.rows, (r, m) => (d(), f(a, y({
      key: m,
      ref_for: !0
    }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), v(P, null, B(r, (h, S) => (d(), f(o, y({ ref_for: !0 }, h, {
          span: i.isMobile ? h.xs || h.span || s.span : h.span || s.span,
          key: S,
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
  const o = u("van-button");
  return d(), f(o, null, {
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
  const o = u("el-button");
  return d(), f(o, null, {
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
const Be = {
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
      const { categories: t, data: s, attr: l, summary: n, type: i, filter: o, grid: a, fontSizes: r } = e, m = {}, h = Array.isArray(t) && t.length || ((H = t == null ? void 0 : t.data) == null ? void 0 : H.length), S = h && (Array.isArray(t) ? t : t.data), b = typeof e.series == "string" ? e.series : e.series.data, g = (o == null ? void 0 : o.categories.limit) > -1, j = (o == null ? void 0 : o.series.limit) > -1, E = {}, k = [], A = /* @__PURE__ */ new Set(), _ = [], U = e.series_formatter === "原样" ? null : $e[e.series_formatter], G = e.attr_formatter === "原样" ? null : $e[e.attr_formatter];
      console.log(s), s.forEach((F) => {
        var w;
        let R = (U ? U(F[b]) : F[b]) ?? "未知";
        if (j && _.length >= o.series.limit && !_.includes(R)) {
          if (!o.series.mergeOthers)
            return;
          R = "其他";
        }
        const Q = G ? G(F[l]) : F[l];
        if (h) {
          let N = S.map((M) => F[M]).join("/") || "未知";
          if (g && k.length >= o.categories.limit && !k.includes(N)) {
            if (!o.categories.mergeOthers)
              return;
            A.add(N), N = "其他";
          }
          E[N] || k.push(N), E[N] || (E[N] = {}), _.includes(R) || _.push(R), (w = E[N])[R] || (w[R] = []), E[N][R].push(Q);
        } else
          E[R] || _.push(R), E[R] || (E[R] = []), E[R].push(Q);
      });
      const D = h && !j ? [...new Set(s.map((F) => F[b]))] : _;
      if (h)
        for (let F in E)
          for (let R in E[F])
            E[F][R] = this.calcSummary(
              E[F][R],
              n,
              g && F === "其他" ? E[F][R].length / A.size : E[F][R].length
            );
      else
        for (let F in E)
          E[F] = this.calcSummary(E[F], n);
      let L = D;
      typeof e.series == "object" && e.series.formatter && (L = D.map((F) => e.series.formatter(F)));
      let z = [];
      h ? z = D.map((F, R) => ({
        name: L[R],
        type: i,
        label: { show: !0, position: "top" },
        data: k.map((Q) => ({ name: Q, value: E[Q][F] }))
      })) : z = [
        {
          type: i,
          colorBy: "data",
          label: { show: !0, position: "top", fontSize: r[2] },
          data: D.map((F) => ({ name: F, value: E[F] }))
        }
      ], Object.assign(m, {
        legend: { data: L },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? k.map((F) => t.formatter(F)) : k : b.formatter ? _.map((F) => b.formatter(F)) : _
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: r[1]
          }
        },
        series: z
      }, this.option, { grid: a }), this.update(m);
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
        const o = this.dialog.form.sort === "asc" ? 1 : -1;
        e.series[0].data.sort((a, r) => (a.value - r.value) * o), e.xAxis.data = e.series[0].data.map((a) => a.name);
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
}, Ye = Be.setup;
Be.setup = Ye ? (e, t) => (Ke(), Ye(e, t)) : Ke;
const be = (e) => (Re("data-v-aeef6705"), e = e(), Pe(), e), $s = { class: "x-chart" }, Cs = {
  class: "chart",
  ref: "el"
}, xs = /* @__PURE__ */ be(() => /* @__PURE__ */ T("span", null, "左", -1)), Vs = /* @__PURE__ */ be(() => /* @__PURE__ */ T("span", null, "上", -1)), Es = /* @__PURE__ */ be(() => /* @__PURE__ */ T("span", null, "右", -1)), As = /* @__PURE__ */ be(() => /* @__PURE__ */ T("span", null, "下", -1)), Os = { class: "sorts flex-center" };
function js(e, t, s, l, n, i) {
  const o = u("pc-x-icon"), a = u("x-select"), r = u("el-col"), m = u("el-row"), h = u("el-input-number"), S = u("x-radios"), b = u("el-checkbox"), g = u("el-tab-pane"), j = u("el-tabs"), E = u("x-form"), k = u("x-dialog"), A = ee("loading");
  return I((d(), v("div", $s, [
    T("div", Cs, null, 512),
    e.datasource ? (d(), v("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (_) => n.dialog.visible = !0)
    }, [
      x(" 配置 "),
      p(o, { name: "Setting" })
    ])) : $("", !0),
    p(k, {
      modelValue: n.dialog.visible,
      "onUpdate:modelValue": t[16] || (t[16] = (_) => n.dialog.visible = _),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: i.handleMakeChart,
      onCancel: t[17] || (t[17] = (_) => n.dialog.visible = !1)
    }, {
      default: c(() => [
        p(E, { dialog: n.dialog }, {
          "selects-formatters": c(({ item: _ }) => [
            p(m, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                p(r, { span: 12 }, {
                  default: c(() => [
                    p(a, y({
                      modelValue: n.dialog.form[_.prop],
                      "onUpdate:modelValue": (U) => n.dialog.form[_.prop] = U
                    }, _, {
                      onChange: (U) => i.handleCalcFormatters(_)
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "onChange"])
                  ]),
                  _: 2
                }, 1024),
                p(r, { span: 12 }, {
                  default: c(() => [
                    p(a, {
                      modelValue: n.dialog.form[_.prop + "_formatter"],
                      "onUpdate:modelValue": (U) => n.dialog.form[_.prop + "_formatter"] = U,
                      options: _.formatters,
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
                      "onUpdate:modelValue": t[1] || (t[1] = (_) => e.grid.left = _)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    Vs,
                    p(h, {
                      modelValue: e.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (_) => e.grid.top = _)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    Es,
                    p(h, {
                      modelValue: e.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (_) => e.grid.right = _)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    As,
                    p(h, {
                      modelValue: e.grid.bottom,
                      "onUpdate:modelValue": t[4] || (t[4] = (_) => e.grid.bottom = _)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          filter: c(() => [
            T("label", Os, [
              x(" 排序方式 "),
              p(S, {
                modelValue: n.dialog.form.sort,
                "onUpdate:modelValue": t[5] || (t[5] = (_) => n.dialog.form.sort = _),
                options: n.SORTS
              }, null, 8, ["modelValue", "options"])
            ]),
            p(j, {
              modelValue: n.filterType,
              "onUpdate:modelValue": t[12] || (t[12] = (_) => n.filterType = _)
            }, {
              default: c(() => [
                p(g, {
                  label: "分类",
                  name: "分类"
                }, {
                  default: c(() => [
                    p(b, {
                      modelValue: e.categories.isLimit,
                      "onUpdate:modelValue": t[6] || (t[6] = (_) => e.categories.isLimit = _)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    I(T("div", null, [
                      x(" 记录条数 "),
                      p(h, {
                        modelValue: e.categories.limit,
                        "onUpdate:modelValue": t[7] || (t[7] = (_) => e.categories.limit = _),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(b, {
                        modelValue: e.categories.mergeOthers,
                        "onUpdate:modelValue": t[8] || (t[8] = (_) => e.categories.mergeOthers = _)
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
                p(g, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    p(b, {
                      modelValue: e.series.isLimit,
                      "onUpdate:modelValue": t[9] || (t[9] = (_) => e.series.isLimit = _)
                    }, {
                      default: c(() => [
                        x("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    I(T("div", null, [
                      x(" 记录条数 "),
                      p(h, {
                        modelValue: e.series.limit,
                        "onUpdate:modelValue": t[10] || (t[10] = (_) => e.series.limit = _),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(b, {
                        modelValue: e.series.mergeOthers,
                        "onUpdate:modelValue": t[11] || (t[11] = (_) => e.series.mergeOthers = _)
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
                      "onUpdate:modelValue": t[13] || (t[13] = (_) => e.fontSizes[0] = _)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 8 }, {
                  default: c(() => [
                    x(" Y轴 "),
                    p(h, {
                      modelValue: e.fontSizes[1],
                      "onUpdate:modelValue": t[14] || (t[14] = (_) => e.fontSizes[1] = _)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 8 }, {
                  default: c(() => [
                    x(" 值 "),
                    p(h, {
                      modelValue: e.fontSizes[2],
                      "onUpdate:modelValue": t[15] || (t[15] = (_) => e.fontSizes[2] = _)
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
const Fs = /* @__PURE__ */ O(Be, [["render", js], ["__scopeId", "data-v-aeef6705"]]), Ts = {
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
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, y({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, i.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), v(P, null, B(n._options, (r) => {
        var m;
        return d(), f(o, y({ ref_for: !0 }, i.attrs, {
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
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, y({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), v(P, null, B(n._options, (r) => {
        var m;
        return d(), f(o, y({ ref_for: !0 }, i.attrs, {
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
const Bs = /* @__PURE__ */ O(Rs, [["render", Ms], ["__scopeId", "data-v-4dd3721a"]]), Ls = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Ns(e, t, s, l, n, i) {
  const o = u("van-col");
  return d(), f(o, y(i.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      V(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Us = /* @__PURE__ */ O(Ls, [["render", Ns]]), qs = {
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
  const o = u("el-col");
  return d(), f(o, y(i.attrs, { class: "pc-x-col" }), {
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
  const o = u("van-button"), a = u("van-col"), r = u("van-row");
  return d(), f(se(s.actionsheet ? "van-action-sheet" : "van-dialog"), y({ width: "92%" }, e.$attrs, {
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
            i.canCancel ? (d(), f(a, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                p(o, {
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
            i.canConfirm ? (d(), f(a, {
              key: 1,
              span: 12
            }, {
              default: c(() => [
                p(o, {
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
  const o = u("x-icon"), a = u("el-button");
  return d(), f(se(s.drawer ? "ElDrawer" : "ElDialog"), y({ draggable: s.draggable }, e.$attrs, {
    modelValue: i.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => i.visible = r),
    fullscreen: n.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer, "no-footer": !i.hasFooter }]
  }), {
    header: c(() => [
      e.$slots.header ? V(e.$slots, "header", { key: 0 }) : (d(), v("span", Qs, C(s.title), 1)),
      s.drawer ? $("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: i.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? V(e.$slots, "footer", { key: 0 }) : $("", !0),
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
      }, 8, ["disabled"])) : $("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
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
  const o = u("x-form");
  return d(), v("div", sn, [
    p(o, y({
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
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      p(a, { span: i.span }, {
        default: c(() => [
          p(o, {
            modelValue: n.province,
            "onUpdate:modelValue": t[0] || (t[0] = (m) => n.province = m),
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
          p(o, {
            modelValue: n.city,
            "onUpdate:modelValue": t[1] || (t[1] = (m) => n.city = m),
            options: n.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : $("", !0),
      i.number > 2 ? (d(), f(a, {
        key: 1,
        span: i.span
      }, {
        default: c(() => [
          p(o, {
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
function bn(e, t, s, l, n, i) {
  const o = u("mobile-x-form-item"), a = u("el-col"), r = u("el-row"), m = u("van-form");
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
          (d(!0), v(P, null, B(e._visibleItems, (h, S) => (d(), f(a, {
            key: S,
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
              p(o, y({
                "label-width": s.labelWidth,
                "label-position": e.$attrs["label-position"] || "left",
                ref_for: !0
              }, h, {
                rules: e._rules[h.prop] || h.rules,
                modelValue: e.formatModelValue(e._model[h.prop]),
                "onUpdate:modelValue": (b) => e._model[h.prop] = b,
                placeholder: e.calcPlaceholder(h)
              }), {
                default: c(() => [
                  h.slot ? V(e.$slots, h.slot, y({
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
}, vn = { key: 1 };
function wn(e, t, s, l, n, i) {
  const o = u("pc-x-form-item"), a = u("el-col"), r = u("el-row"), m = u("el-form"), h = u("el-collapse-item"), S = u("el-collapse");
  return d(), f(S, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (b) => n.activeNames = b),
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
          p(m, y({ ref: "formRef" }, e.$attrs, {
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
                  (d(!0), v(P, null, B(e._visibleItems, (b, g) => (d(), f(a, {
                    key: g,
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
                      p(o, y({
                        "label-width": s.labelWidth,
                        "show-tooltip": e.$attrs.showTooltip || !1,
                        ref_for: !0
                      }, b, {
                        modelValue: e._model[b.prop],
                        "onUpdate:modelValue": [(j) => e._model[b.prop] = j, (j) => b.onChange || null],
                        prop: b.prop || b.model,
                        clearable: b.clearable !== !1,
                        placeholder: e.calcPlaceholder(b)
                      }), {
                        default: c(() => [
                          b.slot ? V(e.$slots, b.slot, {
                            key: 0,
                            item: b,
                            index: g
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
    compType: o,
    html: a,
    text: r
  } = t;
  const m = {
    ...l,
    "onUpdate:modelValue": (S) => n("update:modelValue", S)
  }, h = [];
  return o === "html" ? m.class = "comp-html" : i = u(i), a && (m.innerHTML = a), r && h.push(r), ne(i, m, {
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
    modelValue: o,
    viewonly: a,
    slot: r,
    showTooltip: m,
    placeholder: h
  } = t;
  let S;
  l.directives && typeof l.directives == "object" && (S = Object.entries(l.directives).map(([g, j]) => [ee(g), j]));
  let b;
  if (r && !s.label)
    b = i.default();
  else {
    let g = null;
    if (r)
      g = i.default();
    else if (a)
      g = o;
    else if (m) {
      let j;
      g = p(u("el-tooltip"), {
        effect: "dark",
        content: h,
        placement: "bottom"
      }, kn(j = Oe(e)) ? j : {
        default: () => [j]
      });
    } else
      g = Oe(e);
    b = ne(u("el-form-item"), {
      ...t,
      ...s
    }, {
      default: () => [g],
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
  return S ? I(b, S) : b;
}, Cn = (e) => {
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
    comp: m,
    modelValue: h
  } = t;
  let S;
  l.directives && typeof l.directives == "object" && (S = Object.entries(l.directives).map(([g, j]) => [ee(g), j]));
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
      "onUpdate:modelValue": (j) => n("update:modelValue", j)
    };
    r && s.label || m ? b = ne(u("van-field"), g, {
      input: () => r && s.label ? i.default() : a ? h : Oe(e)
    }) : (a && Object.assign(g, {
      readonly: !0
    }), b = ne(u("van-field"), Object.assign(g, l)));
  }
  return S ? I(b, S) : b;
}, xn = {
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
    return Cn(this);
  }
}, Le = {
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
        required: m,
        format: h,
        style: S,
        html: b,
        class: g,
        ...j
      } = { ...this.$props, ...this.$attrs };
      return j;
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
    "70706ade": e.width
  }));
}, Qe = Le.setup;
Le.setup = Qe ? (e, t) => (Ge(), Qe(e, t)) : Ge;
const Vn = /* @__PURE__ */ O(Le, [["__scopeId", "data-v-dba34d65"]]), Ze = /* @__PURE__ */ Object.assign({}), En = {
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
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), v("span", {
    key: 0,
    class: Y(i.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), v("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, An)) : (d(), f(o, y({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
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
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), v("span", {
    key: 0,
    class: Y(i.iconClass)
  }, null, 2)) : n.icons[s.name] ? (d(), v("img", {
    key: 1,
    src: n.icons[s.name],
    alt: "icon"
  }, null, 8, Tn)) : (d(), f(o, kt(y({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(se(s.name)))
    ]),
    _: 1
  }, 16));
}
const In = /* @__PURE__ */ O(Fn, [["render", Dn]]), { highdict: _t } = StardustJs, { storage: Rn } = StardustBrowser, { local: yt } = Rn, Ne = ["index", "selection", "expand", "radio", "_index"];
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
function Bn() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function Ln() {
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
function Nn() {
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
    index(o) {
      const { page: a, limit: r } = t;
      return (s.isInfinite ? 0 : (a - 1) * r) + o + 1;
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
  const e = this._columns.filter((s) => s.type && Ne.includes(s.type) || s.fixed === "left"), t = this.settings.columns.filter((s) => !s.hide && s.fixed !== "left").map((s) => {
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
  return this._columns.filter((e) => !e.virtual && (!e.type || !Ne.includes(e.type)));
}
function yi() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function vi() {
  const e = this._uid && yt.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Ne.includes(t.type))).map((t) => {
    const { prop: s, label: l, show: n, hide: i, width: o, virtual: a, fixed: r } = t;
    return { prop: s, label: l, show: n, hide: i, width: o, virtual: a, fixed: r };
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
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
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
    const o = n.find((a) => a[t.value || "value"] === i);
    if (o != null && o.tagType)
      return o.tagType;
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
    const o = n.find((a) => a[t.value || "value"] === i);
    if (o)
      return o[t.text || "text"];
  }
  return i;
}
function Mi(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function Bi(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Li(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Ni(e) {
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
    _attrs: Bn,
    domids: Ln,
    elTableAttrs: Nn,
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
    canSave: Bi,
    canRowEdit: Li,
    canCancelEdit: Ni,
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
    calcValue: W.methods.calcValue,
    calcLink: W.methods.calcLink
  }
}, tt = () => {
  Ie((e) => ({
    a371add4: e.labelWidth,
    "24ca7ea8": e._labelAlign,
    "6c929762": e._valueAlign
  }));
}, st = Ue.setup;
Ue.setup = st ? (e, t) => (tt(), st(e, t)) : tt;
const Hi = { class: "x-info__label" }, Ji = { key: 1 }, Ki = { class: "x-info__value" }, Yi = ["href"], Gi = { key: 3 };
function Qi(e, t, s, l, n, i) {
  const o = u("router-link"), a = u("el-col"), r = u("el-row"), m = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: n.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (S) => n.activeNames = S),
    class: Y(["x-info", { "hide-header": i.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), v(P, null, B(i.blocks, (S, b) => (d(), f(m, {
        key: b,
        title: b,
        name: b
      }, {
        default: c(() => [
          p(r, {
            gutter: e.$attrs.gutter || 10
          }, {
            default: c(() => [
              (d(!0), v(P, null, B(S, (g) => (d(), f(a, y({
                key: g.prop,
                span: s.span,
                ref_for: !0
              }, g), {
                default: c(() => [
                  T("div", Hi, [
                    e.$slots.label ? V(e.$slots, "label", {
                      key: 0,
                      label: g.label
                    }, void 0, !0) : (d(), v("span", Ji, C(g.label ? s.showColon ? g.label + "：" : g.label : ""), 1))
                  ]),
                  T("div", Ki, [
                    g.slot === "$link" ? (d(), f(o, {
                      key: 0,
                      to: g.to(s.data)
                    }, {
                      default: c(() => [
                        x(C(i.calcLink(s.data, g)), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])) : g.slot === "$phone" ? (d(), v("a", {
                      key: 1,
                      href: `tel:${s.data[g.prop]}`
                    }, C(s.data[g.prop]), 9, Yi)) : g.slot ? V(e.$slots, g.slot, y({
                      key: 2,
                      ref_for: !0
                    }, { data: s.data, field: g, value: i.calcValue(s.data, g) }), void 0, !0) : (d(), v("span", Gi, C(i.calcValue(s.data, g)), 1))
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
const Zi = /* @__PURE__ */ O(Ue, [["render", Qi], ["__scopeId", "data-v-3eb12609"]]), el = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, tl = { key: 1 };
function sl(e, t, s, l, n, i) {
  return d(), v("div", null, [
    (d(!0), v(P, null, B(s.items, (o, a) => (d(), f(se(s.compName), y({
      key: a,
      ref_for: !0
    }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? V(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), v("span", tl, C(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const nl = /* @__PURE__ */ O(el, [["render", sl]]), il = {
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
function ll(e, t, s, l, n, i) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), m = u("van-row");
  return d(), f(m, {
    align: "center",
    class: "mobile-x-paginaiton"
  }, {
    default: c(() => [
      p(o, { span: 6 }, {
        default: c(() => [
          T("span", null, "总计: " + C(s.total), 1)
        ]),
        _: 1
      }),
      p(o, { span: 18 }, {
        default: c(() => [
          p(r, y({
            mode: "simple",
            "items-per-page": s.query.limit,
            "total-items": s.total
          }, { ...e.$attrs, ...e.mobilePagination || {} }, {
            modelValue: s.query.page,
            "onUpdate:modelValue": t[0] || (t[0] = (h) => s.query.page = h),
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
const ol = /* @__PURE__ */ O(il, [["render", ll]]), al = {
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
function rl(e, t, s, l, n, i) {
  const o = u("el-pagination");
  return d(), f(o, y({
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
const dl = /* @__PURE__ */ O(al, [["render", rl]]), cl = {
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
function ul(e, t, s, l, n, i) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), v(P, null, [
    T("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: Y(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, C(i.text), 3),
    p(a, y({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: i.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => i.visible = r)
    }), {
      default: c(() => [
        p(o, y(e.$attrs, {
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
const hl = /* @__PURE__ */ O(cl, [["render", ul]]), ml = {
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
function pl(e, t, s, l, n, i) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, y({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), v(P, null, B(n._options, (r) => {
        var m;
        return d(), f(o, y({ ref_for: !0 }, e.$attrs, {
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
const fl = /* @__PURE__ */ O(ml, [["render", pl]]), gl = {
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
}, bl = { key: 1 };
function _l(e, t, s, l, n, i) {
  const o = u("el-radio-group");
  return d(), f(o, y({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, i.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), v(P, null, B(n._options, (a) => {
        var r;
        return d(), f(se(s.button ? "el-radio-button" : "el-radio"), y({ ref_for: !0 }, i.attrs, {
          disabled: (r = a.raw) == null ? void 0 : r.disabled,
          key: a.text,
          value: a.value
        }), {
          default: c(() => [
            e.$slots.custom ? V(e.$slots, "custom", {
              key: 0,
              option: a,
              raw: a.raw
            }, void 0, !0) : (d(), v("span", bl, C(a.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const yl = /* @__PURE__ */ O(gl, [["render", _l], ["__scopeId", "data-v-1c8cf979"]]), vl = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, wl = { key: 1 };
function Sl(e, t, s, l, n, i) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), v(P, null, B(s.cols, (r, m) => (d(), f(o, y({ ref_for: !0 }, r, {
        span: r.xs ?? r.span,
        key: m
      }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", wl, C(r.text), 1))
        ]),
        _: 2
      }, 1040, ["span"]))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : $("", !0)
    ]),
    _: 3
  });
}
const kl = /* @__PURE__ */ O(vl, [["render", Sl]]), $l = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, Cl = { key: 1 };
function xl(e, t, s, l, n, i) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), v(P, null, B(s.cols, (r, m) => (d(), f(o, y({ ref_for: !0 }, r, { key: m }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? V(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), v("span", Cl, C(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? V(e.$slots, "default", { key: 0 }) : $("", !0)
    ]),
    _: 3
  });
}
const Vl = /* @__PURE__ */ O($l, [["render", xl]]), El = {
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
function Al(e, t, s, l, n, i) {
  const o = u("van-icon"), a = u("van-field");
  return d(), f(a, y({ placeholder: "点此扫码" }, e.$attrs, {
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
const Ol = /* @__PURE__ */ O(El, [["render", Al]]), jl = {
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
function Fl(e, t, s, l, n, i) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, y(e.$attrs, {
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
const Tl = /* @__PURE__ */ O(jl, [["render", Fl]]), qe = async (e, t, s) => {
  var m;
  if (s.loading)
    return;
  s.loading = !0;
  const l = t == null ? void 0 : t.trim(), { text: n = "text", value: i = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], n, i])], a.page || (a.page = 1), a.limit || (a.limit = 100), l && (a.where = a.where || {}, (o == null ? void 0 : o.length) > 1 ? a.where["[Op.or]"] = o.map((h) => ({
    [h]: { "[Op.like]": `%${l}%` }
  })) : ((m = a.where)[n] || (m[n] = {}), a.where[n]["[Op.like]"] = `%${l}%`));
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, je = (e, t) => !e || typeof e != "object" ? e : !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((l) => e[l])[0], Fe = (e, t) => !e || typeof e != "object" || !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((l) => e[l]).slice(1).join(" - ") + ")", Dl = {
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
function Il(e, t, s, l, n, i) {
  const o = u("x-picker");
  return d(), v("div", {
    onClick: t[2] || (t[2] = (...a) => i.onClick && i.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(o, y(e.$attrs, {
      modelValue: n._value,
      "onUpdate:modelValue": i.onChange,
      show: n.visible,
      columns: n._options,
      onClick: t[0] || (t[0] = Z(() => {
      }, ["stop"])),
      onShow: i.onShow,
      onCancel: t[1] || (t[1] = (a) => n.visible = !1),
      onConfirm: i.onConfirm,
      onChange: i.onChange
    }), null, 16, ["modelValue", "onUpdate:modelValue", "show", "columns", "onShow", "onConfirm", "onChange"])
  ]);
}
const Rl = /* @__PURE__ */ O(Dl, [["render", Il]]), Pl = {
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
}, Ml = { key: 1 }, Bl = { class: "main" }, Ll = { class: "remark" };
function Nl(e, t, s, l, n, i) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, y({
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
      (d(!0), v(P, null, B(n.list, (r, m) => {
        var h;
        return d(), f(o, y({ ref_for: !0 }, e.$attrs, {
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
            }, void 0, !0) : (d(), v("span", Ml, [
              T("span", Bl, C(r._main_), 1),
              T("span", Ll, C(r._remark_), 1)
            ]))
          ]),
          _: 2
        }, 1040, ["disabled", "label", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote", "filter-method", "onKeyup"]);
}
const Ul = /* @__PURE__ */ O(Pl, [["render", Nl], ["__scopeId", "data-v-20ab71e6"]]), ql = {
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
}, zl = { key: 1 }, Xl = { class: "main" }, Wl = { class: "remark" };
function Hl(e, t, s, l, n, i) {
  const o = u("el-select-v2");
  return d(), f(o, y({
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
    default: c(({ item: a, index: r }) => [
      e.$slots.custom ? V(e.$slots, "custom", {
        key: 0,
        option: a,
        raw: a.raw
      }, void 0, !0) : (d(), v("span", zl, [
        T("span", Xl, C(a._main_), 1),
        T("span", Wl, C(a._remark_), 1)
      ]))
    ]),
    _: 3
  }, 16, ["class", "loading", "options", "filterable", "remote", "filter-method", "onKeyup"]);
}
const Jl = /* @__PURE__ */ O(ql, [["render", Hl], ["__scopeId", "data-v-70bc3765"]]), nt = {
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
}, Kl = [{
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
function Yl() {
  const e = window.isMobile ? "small" : "", {
    $attrs: t,
    config: s,
    columns: l,
    visible: n,
    conditions: i,
    expression: o,
    handleSearch: a,
    handleReset: r,
    handleAdd: m,
    handleDelete: h,
    handleSelectField: S,
    handleSelectOp: b
  } = this;
  return p(u("x-dialog"), y({
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
    default: () => [s.traditional ? null : p(u("x-button"), {
      type: "primary",
      size: e,
      icon: "plus",
      onClick: m
    }, {
      default: () => [x("新增条件")]
    }), p("div", {
      class: "conditions"
    }, [i.map((g, j) => p("div", {
      class: "condition flex-center",
      key: g.no
    }, [s.traditional ? null : p(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(j)
    }, {
      default: () => [x("X")]
    }), s.traditional ? null : p("span", {
      class: "title"
    }, [g.no]), p("div", {
      class: "expression"
    }, [s.traditional ? p(u("el-input"), {
      modelValue: g.item.label,
      readonly: !0
    }, null) : p(u("pc-x-select"), {
      modelValue: g.prop,
      onChange: (E) => S(g, E),
      options: l,
      text: "label",
      value: "prop"
    }, null), p(u("pc-x-select"), {
      modelValue: g.op,
      onChange: (E) => b(g, E),
      options: g.ops
    }, null), p("div", {
      class: "value-container"
    }, [Gl(this, g)])])]))]), s.traditional ? null : p(u("el-input"), y({
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
function Gl(e, t) {
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
    options: Kl
  }) : s();
}
const { storage: Ce } = StardustBrowser, { deepCopy: Ql } = StardustJs.funcs, Zl = {
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
  render: Yl,
  methods: {
    init() {
      const e = this.uid && Ce.local.getJson(this.key, this.config) || this.config;
      this.initConfig(Ql(e));
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
        const { prop: n, op: i, value: o, universal: a } = l;
        l.item = this.columns.find((r) => r.prop === n), this.handleSelectField(l, n), this.handleSelectOp(l, i), l.value = o, l.ops = q[a ? "universal" : l.component].map((r) => nt[r]);
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
        const i = [], o = "[Op." + l.type + "]";
        n[o] = i;
        for (let a of l.items)
          if (typeof a == "string") {
            const r = this.conditions.find((m) => m.no === a * 1);
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
        canAdd: m,
        canEdit: h,
        required: S,
        slot: b,
        span: g,
        tableAttrs: j,
        formAttrs: E,
        tagTypes: k,
        tagValues: A,
        width: _,
        minWidth: U,
        disabled: G,
        readonly: D,
        ...L
      } = i;
      L.clearable ?? (L.clearable = !0), e.config = L, e.component = o || s && "XSelect" || l === "number" && "ElInputNumber" || "ElInput", e.ops = q[a ? "universal" : e.component].map((z) => nt[z]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", L.type = "date"), L.type === "textarea" && delete L.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, ze = /* @__PURE__ */ O(Zl, [["__scopeId", "data-v-f8ded706"]]), eo = {
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
}, to = { class: "mobile-x-table" }, so = {
  key: 1,
  class: "card"
}, no = ["onClick"], io = { class: "row-header flex-center" }, lo = ["value", "checked"], oo = { class: "label" }, ao = { class: "value" }, ro = ["value", "checked"], co = {
  key: 2,
  class: "index"
}, uo = { class: "title" };
function ho(e, t, s, l, n, i) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), m = u("x-icon"), h = u("van-cell"), S = u("van-list"), b = u("x-pagination"), g = u("x-info"), j = u("van-popup"), E = u("van-action-sheet");
  return d(), v("div", to, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: e.handleSearch
    }, null, 8, ["uid", "columns", "config", "onSearch"]),
    e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(a, y({ key: 0 }, e._attrs, {
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
    (s.mode || e._attrs.mode) === "card" ? (d(), v("div", so, [
      (d(!0), v(P, null, B(e._data, (k, A) => (d(), v("div", {
        key: A,
        class: "row",
        onClick: (_) => i.handleClickCard(A)
      }, [
        T("div", io, [
          i.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: n.selected[A],
            "onUpdate:modelValue": (_) => n.selected[A] = _,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = Z(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : $("", !0),
          p(m, {
            name: "ellipsis",
            class: "more",
            onClick: Z((_) => i.handleShowActionSheet(k, A), ["stop"])
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
          onChange: t[2] || (t[2] = (..._) => e.handleCheckedChange && e.handleCheckedChange(..._))
        }, null, 40, lo)) : $("", !0),
        (d(!0), v(P, null, B(i.cols, (_, U) => (d(), v("div", {
          key: U,
          class: "field"
        }, [
          T("span", oo, C(_.label) + ":", 1),
          T("span", ao, C(e.calcValue(k, _)), 1)
        ]))), 128))
      ], 8, no))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(S, y({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (k) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), v(P, null, B(e._data, (k, A) => (d(), f(h, {
          key: A,
          "is-link": "",
          onClick: (_) => i.handleShowDetail(k, A)
        }, {
          default: c(() => [
            i.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: n.selected[A],
              "onUpdate:modelValue": (_) => n.selected[A] = _,
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
              onChange: t[5] || (t[5] = (..._) => e.handleCheckedChange && e.handleCheckedChange(..._))
            }, null, 40, ro)) : $("", !0),
            i.hasIndex ? (d(), v("span", co, C(A + 1), 1)) : $("", !0),
            T("span", uo, C(i.calcTitle(k)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]),
      _: 1
    }, 16)) : $("", !0),
    e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(b, {
      key: 3,
      query: e._query,
      total: e._total,
      onSearch: t[7] || (t[7] = (k) => e._emit("search"))
    }, null, 8, ["query", "total"])) : $("", !0),
    p(j, {
      show: n.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (k) => n.popupVisible = k),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        p(g, {
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
const mo = /* @__PURE__ */ O(eo, [["render", ho], ["__scopeId", "data-v-84e93229"]]), po = {
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
}, fo = (e) => (Re("data-v-a9d96f8a"), e = e(), Pe(), e), go = {
  class: "table",
  ref: "colsTable"
}, bo = ["data-prop"], _o = ["title", "onClick"], yo = /* @__PURE__ */ fo(() => /* @__PURE__ */ T("span", { class: "unit" }, "px", -1)), vo = {
  class: "table",
  ref: "sortsTable"
}, wo = ["data-prop"];
function So(e, t, s, l, n, i) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), m = u("ElCheckbox"), h = u("el-input-number"), S = u("el-tab-pane"), b = u("x-select"), g = u("x-radios"), j = u("el-tabs"), E = u("el-popover");
  return s.visible ? (d(), f(E, y({
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
      p(j, {
        modelValue: n.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (k) => n.activeName = k)
      }, {
        default: c(() => [
          i.hideColumns ? $("", !0) : (d(), f(S, {
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
              T("div", go, [
                (d(!0), v(P, null, B(n.columns, (k) => (d(), v("div", {
                  key: k.prop,
                  "data-prop": k.prop,
                  class: "row flex-center"
                }, [
                  p(r, null, {
                    default: c(() => [
                      p(a)
                    ]),
                    _: 1
                  }),
                  p(m, {
                    modelValue: k.show,
                    "onUpdate:modelValue": (A) => k.show = A,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  T("span", {
                    class: "label overflow-text",
                    title: k.label,
                    onClick: (A) => i.handleToggle(k)
                  }, C(k.label), 9, _o),
                  p(h, {
                    modelValue: k.width,
                    "onUpdate:modelValue": (A) => k.width = A,
                    onChange: i.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  yo
                ], 8, bo))), 128))
              ], 512)
            ]),
            _: 1
          })),
          i.hideSorts ? $("", !0) : (d(), f(S, {
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
              T("div", vo, [
                (d(!0), v(P, null, B(n.sorts, (k, A) => (d(), v("div", {
                  key: k[0],
                  "data-prop": k[0],
                  class: "row flex-center"
                }, [
                  p(b, {
                    modelValue: k[0],
                    "onUpdate:modelValue": (_) => k[0] = _,
                    options: n.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(g, {
                    modelValue: k[1],
                    "onUpdate:modelValue": (_) => k[1] = _,
                    options: n.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (_) => n.sorts.splice(A, 1)
                  }, null, 8, ["onClick"])
                ], 8, wo))), 128))
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
const vt = /* @__PURE__ */ O(po, [["render", So], ["__scopeId", "data-v-a9d96f8a"]]), { highdict: ko } = StardustJs, $o = {
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
        const o = await this.controller.search(n);
        let a = ko.get(o, this.controller.listProp);
        return a = this.controller.formatList(this.controller._defaultFormatList(a, o), o), this._lastList = a, a;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, Co = {
  key: 1,
  class: "collapse-title"
}, xo = {
  key: 2,
  class: "collapse-title"
}, Vo = /* @__PURE__ */ T("span", null, "-", -1), Eo = ["value", "checked"], Ao = ["href"], Oo = { key: 1 };
function jo(e, t, s, l, n, i) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), m = u("pc-x-table-tools"), h = u("el-image"), S = u("el-tag"), b = u("router-link"), g = u("el-icon"), j = u("el-table-column"), E = u("el-button"), k = u("el-dropdown-item"), A = u("el-dropdown-menu"), _ = u("el-dropdown"), U = u("el-table"), G = u("x-pagination"), D = u("el-collapse-item"), L = u("el-collapse"), z = u("x-chart"), H = u("x-dialog"), F = ee("domid"), R = ee("loading"), Q = ee("el-table-infinite-scroll");
  return d(), v(P, null, [
    T("div", {
      class: Y(["pc-x-table", { fullscreen: n.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      p(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      p(L, {
        modelValue: n.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (w) => n.activeNames = w),
        class: Y((n._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          p(D, {
            name: n.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : n.activeNames.length ? (d(), v("span", Co, C(e.title), 1)) : (d(), v("span", xo, [
                x(C(e.title) + "，当前第 ", 1),
                T("span", null, C(e._query.page), 1),
                x(" 页，展示 "),
                T("span", null, C(e._data.length), 1),
                x(" 条数据， 共 "),
                T("span", null, C(e._total || e._data.length), 1),
                x(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              V(e.$slots, "tools-top"),
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(m, y({ key: 0 }, e._attrs, {
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
                  e.hideChart ? $("", !0) : (d(), f(a, {
                    key: 0,
                    name: "PieChart",
                    class: "chart",
                    onClick: i.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  T("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...w) => e.handleMinus && e.handleMinus(...w))
                  }, [
                    p(a, { name: "FullScreen" }),
                    Vo
                  ]),
                  p(a, {
                    name: "FullScreen",
                    class: "full",
                    onClick: e.handleToggleFullscreen
                  }, null, 8, ["onClick"]),
                  p(r, y({
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
              ]), 1040, ["domids", "onAdd", "onKeywordsSearch", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : $("", !0),
              V(e.$slots, "tools-bottom"),
              I((d(), f(U, y({
                ref: "tableRef",
                "element-loading-text": "加载中..."
              }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), v(P, null, B(e._visibleColumns, (w, N) => (d(), f(j, y({ ref_for: !0 }, w, {
                    key: N,
                    "min-width": w.minWidth,
                    align: w.align || e._attrs.tableAlign || "center",
                    resizable: w.resizable || !0,
                    "show-overflow-tooltip": e.calcOverflowTooltip(w)
                  }), re({ _: 2 }, [
                    ["selection", "index"].includes(w.type) ? void 0 : {
                      name: "default",
                      fn: c((M) => [
                        w.type === "radio" ? (d(), v("input", {
                          key: 0,
                          type: "radio",
                          value: M.$index,
                          checked: M.$index === n.checked,
                          onChange: t[3] || (t[3] = (...ye) => e.handleCheckedChange && e.handleCheckedChange(...ye))
                        }, null, 40, Eo)) : w.slot === "$image" ? (d(), f(h, y({
                          key: 1,
                          src: e._imageSrc(M, w),
                          "preview-src-list": e._imagePreviewSrcList(M, w),
                          "preview-teleported": "",
                          ref_for: !0
                        }, w.imageAttrs), null, 16, ["src", "preview-src-list"])) : w.slot === "$tag" ? (d(), f(S, {
                          key: 2,
                          type: e.calcTagType(M, w)
                        }, {
                          default: c(() => [
                            x(C(e.calcTagValue(M, w)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : w.slot === "$link" ? (d(), f(b, {
                          key: 3,
                          to: w.to(M.row)
                        }, {
                          default: c(() => [
                            x(C(e.calcLink(M.row, w)), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"])) : w.slot === "$phone" ? (d(), v("a", {
                          key: 4,
                          href: `tel:${M.row[w.prop]}`
                        }, C(M.row[w.prop]), 9, Ao)) : w.slot === "$icon" ? (d(), f(g, {
                          key: 5,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(se(M.row[w.prop])))
                          ]),
                          _: 2
                        }, 1024)) : w.slot ? V(e.$slots, w.slot, {
                          key: 6,
                          scope: M,
                          column: w,
                          value: M.row[w.prop]
                        }) : e.slotAll ? V(e.$slots, "all", {
                          key: 7,
                          scope: M,
                          column: w,
                          value: M.row[w.prop]
                        }) : (d(), v(P, { key: 8 }, [
                          w.comp === "ElSwitch" || e.table.isRowEdit && M.row.isEditing && (w.visible !== !1 || w.canEdit) ? (d(), f(se(w.comp || "ElInput"), y({
                            key: 0,
                            ref_for: !0
                          }, { ...w, ...w.formAttrs }, {
                            modelValue: M.row[w.prop],
                            "onUpdate:modelValue": (ye) => M.row[w.prop] = ye,
                            disabled: !M.row.editable || !M.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), v("span", Oo, C(e.calcValue(M.row, w)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? $("", !0) : (d(), f(j, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((w) => [
                      V(e.$slots, "operates-prefix", { scope: w }),
                      e.operatesDropdown ? (d(), f(_, {
                        key: 0,
                        class: "operates-dropdown"
                      }, {
                        dropdown: c(() => [
                          p(A, { class: "operates-dropdown-menu" }, {
                            default: c(() => [
                              e.canEdit(w.row) ? (d(), f(k, { key: 0 }, {
                                default: c(() => [
                                  I((d(), f(E, y({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    class: "x-table-edit",
                                    onClick: (N) => e._emit("edit", w)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [F, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : $("", !0),
                              e.canSave(w.row) ? (d(), f(k, { key: 1 }, {
                                default: c(() => [
                                  I((d(), f(E, y({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: w.row._loading,
                                    icon: "collection",
                                    class: "x-table-row-edit",
                                    onClick: (N) => e._emit("row-edit", w)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [R, w.row._loading],
                                    [F, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : $("", !0),
                              e.canCancelEdit(w.row) ? (d(), f(k, { key: 2 }, {
                                default: c(() => [
                                  I((d(), f(E, y({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    class: "x-table-cancel-edit",
                                    onClick: (N) => e._emit("cancel-edit", w)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [F, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : $("", !0),
                              e.canDelete(w.row) ? (d(), f(k, { key: 3 }, {
                                default: c(() => [
                                  I((d(), f(E, y({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    class: "x-table-delete",
                                    onClick: (N) => e._emit("delete", w)
                                  }), {
                                    default: c(() => [
                                      x(C(e._attrs["delete-btn-text"] ?? "删除"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [F, e.domids.delete]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : $("", !0)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: c(() => [
                          I((d(), f(E, y({ type: "primary", ...e._attrs["operates-btn"] }, {
                            icon: "arrow-down",
                            class: "x-table-operates"
                          }), {
                            default: c(() => [
                              x(C(e._attrs["operates-btn-text"] ?? "操作"), 1)
                            ]),
                            _: 1
                          }, 16)), [
                            [F, e.domids.operates]
                          ])
                        ]),
                        _: 2
                      }, 1024)) : $("", !0),
                      !e.operatesDropdown && e.canEdit(w.row) ? I((d(), f(E, y({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        class: "x-table-edit",
                        onClick: (N) => e._emit("edit", w)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [F, e.domids.edit]
                      ]) : $("", !0),
                      !e.operatesDropdown && e.canSave(w.row) ? I((d(), f(E, y({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: w.row._loading,
                        icon: "collection",
                        class: "x-table-row-edit",
                        onClick: (N) => e._emit("row-edit", w)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [R, w.row._loading],
                        [F, e.domids["row-edit"]]
                      ]) : $("", !0),
                      !e.operatesDropdown && e.canCancelEdit(w.row) ? I((d(), f(E, y({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        class: "x-table-cancel-edit",
                        onClick: (N) => e._emit("cancel-edit", w)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [F, e.domids["cancel-edit"]]
                      ]) : $("", !0),
                      !e.operatesDropdown && e.canDelete(w.row) ? I((d(), f(E, y({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        class: "x-table-delete",
                        onClick: (N) => e._emit("delete", w)
                      }), {
                        default: c(() => [
                          x(C(e._attrs["delete-btn-text"] ?? "删除"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [F, e.domids.delete]
                      ]) : $("", !0),
                      V(e.$slots, "operates-suffix", { scope: w })
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
      "onUpdate:modelValue": t[5] || (t[5] = (w) => n.dialog.visible = w),
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
const Fo = /* @__PURE__ */ O($o, [["render", jo]]), To = {
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
}, Do = { class: "mobile-x-table-tools" }, Io = { key: 0 }, Ro = { class: "tools" }, Po = { class: "tools-end" };
function Mo(e, t, s, l, n, i) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), m = ee("domid");
  return d(), v("div", Do, [
    e.$attrs.onAdd ? I((d(), v("div", Io, [
      p(o, {
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
    T("div", Ro, [
      V(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? I((d(), f(r, y({ key: 0 }, { type: "success", ...s.searchBtn }, {
        class: "x-table-search",
        onClick: t[1] || (t[1] = (h) => e.$emit("search"))
      }), {
        default: c(() => [
          p(a, { name: "search" }),
          x(" 高级查询 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.search]
      ]) : $("", !0),
      e.$attrs.onMultiEdit ? I((d(), f(r, y({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        class: "x-table-edit",
        onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          p(a, { name: "edit" }),
          x(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["multi-edit"]]
      ]) : $("", !0),
      e.$attrs.onMultiDelete ? I((d(), f(r, y({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        class: "x-table-multi-delete",
        onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          p(a, { name: "DeleteFilled" }),
          x(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["multi-delete"]]
      ]) : $("", !0),
      e.$attrs.onExport ? I((d(), f(r, y({ key: 3 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-export",
        onClick: t[4] || (t[4] = (h) => e.$emit("export"))
      }), {
        default: c(() => [
          p(a, { name: "printer" }),
          x(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.export]
      ]) : $("", !0),
      e.$attrs.onSearchExport ? I((d(), f(r, y({ key: 4 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-search-export",
        onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
      }), {
        default: c(() => [
          p(a, { name: "printer" }),
          x(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["search-export"]]
      ]) : $("", !0),
      e.$attrs.onImport ? I((d(), f(r, y({ key: 5 }, { type: "warning", ...s.importBtn }, {
        class: "x-table-import",
        onClick: t[6] || (t[6] = (h) => e.$emit("import"))
      }), {
        default: c(() => [
          p(a, { name: "UploadFilled" }),
          x(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.import]
      ]) : $("", !0),
      V(e.$slots, "tools-suffix", {}, void 0, !0),
      T("div", Po, [
        V(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const Bo = /* @__PURE__ */ O(To, [["render", Mo], ["__scopeId", "data-v-dda9e446"]]), Lo = {
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
}, No = { class: "tools" }, Uo = { class: "tools-end flex-center" };
function qo(e, t, s, l, n, i) {
  const o = u("el-input"), a = u("el-button"), r = u("el-card"), m = ee("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      T("div", No, [
        V(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onKeywordsSearch ? I((d(), f(o, {
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
        e.$attrs.onSearch ? I((d(), f(a, y({ key: 1 }, { type: "success", ...s.searchBtn }, {
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
        e.$attrs.onAdd ? I((d(), f(a, y({ key: 2 }, { type: "primary", ...s.addBtn }, {
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
        e.$attrs.onMultiEdit ? I((d(), f(a, y({ key: 3 }, { type: "warning", ...s.multiEditBtn }, {
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
        e.$attrs.onMultiDelete ? I((d(), f(a, y({ key: 4 }, { type: "danger", ...s.multiDeleteBtn }, {
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
        e.$attrs.onExport ? I((d(), f(a, y({ key: 5 }, { type: "success", ...s.exportBtn }, {
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
        e.$attrs.onSearchExport ? I((d(), f(a, y({ key: 6 }, { type: "success", ...s.exportBtn }, {
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
        e.$attrs.onImport ? I((d(), f(a, y({ key: 7 }, { type: "warning", ...s.importBtn }, {
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
        T("div", Uo, [
          V(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const zo = /* @__PURE__ */ O(Lo, [["render", qo], ["__scopeId", "data-v-3d6b703b"]]);
function wt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ot(e);
}
const Xo = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, l = (n) => {
    n ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const i = n ? e._data.slice() : [];
    e.handleSelectionChange(i);
  };
  return p(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: l
  }, null);
}, Wo = (e, t) => {
  const {
    rowIndex: s,
    rowData: l
  } = e, n = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const i = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(i);
  };
  return p(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: n
  }, null);
}, Ho = (e, t) => {
  const {
    page: s,
    limit: l
  } = t._query;
  return (s - 1) * l + e.rowIndex + 1;
}, Jo = (e, t) => {
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
    rowIndex: o,
    rowData: a
  } = e, r = () => {
    t._emit(s, {
      $index: o,
      row: a
    });
  };
  return p(u("el-button"), y({
    type: l
  }, t._attrs[s + "-btn"], {
    icon: n,
    onClick: r
  }), wt(i) ? i : {
    default: () => [i]
  });
}, Ko = (e, t) => {
  if (t.canEdit(e.rowData))
    return _e([e, t, "edit", "warning", "edit", "编辑"]);
}, Yo = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return _e([e, t, "row-edit", "success", "collection", "保存"]);
}, Go = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return _e([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Qo = (e, t) => {
  if (t.canDelete(e.rowData))
    return _e([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Zo = (e, t) => {
  const {
    _attrs: s,
    $slots: l
  } = t, {
    slotRenderers: n = {}
  } = s;
  if (e.type === "selection")
    return (i) => Wo(i, t);
  if (e.type === "index")
    return (i) => Ho(i, t);
  if (e.type === "radio")
    return (i) => Jo(i, t);
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
      const h = (b) => {
        o[a.prop] = b;
      }, S = a.comp || "ElInput";
      return ne(u(S), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: h,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(i.rowData, e), {
      showOverflowTooltip: m
    } = a.tableAttrs || {};
    return m ? p(u("el-tooltip"), {
      content: r
    }, wt(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, ea = (e, t) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Xo(t)), r.cellRenderer = Zo(r, t), r;
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
      }, [l["operates-prefix"] ? l["operates-prefix"]() : null, Ko(i, t), Yo(i, t), Go(i, t), Qo(i, t), l["operates-suffix"] ? l["operates-suffix"]() : null]);
    }
  }), n;
}, ta = {
  convertColumnsForTableV2: ea
}, sa = {
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
    convertColumnsForTableV2: ta.convertColumnsForTableV2
  }
}, na = { key: 1 };
function ia(e, t, s, l, n, i) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), m = u("x-table-tools"), h = u("el-table-v2"), S = u("el-auto-resizer"), b = u("x-pagination"), g = u("el-collapse-item"), j = u("el-collapse"), E = ee("loading");
  return d(), v("div", {
    class: Y(["pc-x-table-v2", { fullscreen: n.isFullscreen }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (k) => e._emit("search", k))
    }, null, 8, ["uid", "columns", "config"]),
    p(j, {
      modelValue: n.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (k) => n.activeNames = k),
      class: Y((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        p(g, {
          name: n.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? V(e.$slots, "collapse-title", { key: 0 }) : (d(), v("span", na, C(e.title), 1))
          ]),
          default: c(() => [
            e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(m, y({ key: 0 }, e._attrs, {
              domids: e.domids,
              onAdd: e._onAdd,
              onSearch: e._onSearch,
              onExport: e._onExport,
              onSearchExport: e._onSearchExport,
              onImport: e._onImport,
              onMultiDelete: e._onMultiDelete
            }), re({
              "tools-end": c(() => [
                p(a, {
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
            p(S, {
              style: $t({ height: s.height })
            }, {
              default: c(({ width: k, height: A }) => [
                I((d(), f(h, y({
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
            e._query && e._total && (e.onSearch || e._listen.search) ? (d(), f(b, {
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
const la = /* @__PURE__ */ O(sa, [["render", ia]]), xe = ["selection", "radio"], oa = {
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
}, aa = { class: "x-table-viewer" };
function ra(e, t, s, l, n, i) {
  const o = u("x-dialog");
  return d(), v("div", aa, [
    p(o, y(i._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": i.handleBeforeClose,
      onSubmit: i.handleSubmit,
      onCancel: i.handleCancel
    }), {
      default: c(() => [
        (d(), f(se(s.useTableV2 ? "x-table-v2" : "x-table"), y({
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
const da = /* @__PURE__ */ O(oa, [["render", ra], ["__scopeId", "data-v-e6f36700"]]), ca = {
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
}, ua = { class: "mobile-x-tags" };
function ha(e, t, s, l, n, i) {
  const o = u("van-tag");
  return d(), v("div", ua, [
    (d(!0), v(P, null, B(i._data, (a, r) => (d(), f(o, y({
      key: r,
      ref_for: !0
    }, { ...e.$attrs, item: a }, {
      onClose: (m) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        x(C(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const ma = /* @__PURE__ */ O(ca, [["render", ha], ["__scopeId", "data-v-d8beefdf"]]), pa = {
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
}, fa = { class: "pc-x-tags" };
function ga(e, t, s, l, n, i) {
  const o = u("el-tag");
  return d(), v("div", fa, [
    (d(!0), v(P, null, B(i._data, (a, r) => (d(), f(o, y({
      key: r,
      ref_for: !0
    }, { ...e.$attrs, item: a }, {
      onClose: (m) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        x(C(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const ba = /* @__PURE__ */ O(pa, [["render", ga], ["__scopeId", "data-v-bd702be1"]]), _a = {
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
}, ya = { class: "x-tinymce" }, va = ["id", "innerHTML"];
function wa(e, t, s, l, n, i) {
  return d(), v("div", ya, [
    T("textarea", {
      id: n.id,
      innerHTML: s.modelValue
    }, null, 8, va)
  ]);
}
const Sa = /* @__PURE__ */ O(_a, [["render", wa]]), ka = {
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
}, Xe = (e) => (Re("data-v-a3a105f3"), e = e(), Pe(), e), $a = { class: "mask" }, Ca = {
  key: 0,
  class: "el-upload__text"
}, xa = /* @__PURE__ */ Xe(() => /* @__PURE__ */ T("em", null, "点击上传", -1)), Va = /* @__PURE__ */ Xe(() => /* @__PURE__ */ T("br", null, null, -1)), Ea = /* @__PURE__ */ Xe(() => /* @__PURE__ */ T("br", null, null, -1)), Aa = {
  key: 0,
  class: "path"
};
function Oa(e, t, s, l, n, i) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), f(r, y({
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
      T("div", $a, [
        p(o, { name: "upload-filled" }),
        n.disabled ? $("", !0) : (d(), v("div", Ca, [
          x(" 将文件拖到此处，或"),
          xa,
          Va,
          Ea,
          s.needUpload && !n.disabled && n.fileList.length ? (d(), f(a, {
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
      i.filepath ? (d(), v("div", Aa, C(s.modelValue), 1)) : $("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const ja = /* @__PURE__ */ O(ka, [["render", Oa], ["__scopeId", "data-v-a3a105f3"]]), Fa = {
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
}, Ta = ["src"];
function Da(e, t, s, l, n, i) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), m = u("x-dialog");
  return d(), v(P, null, [
    p(r, y({
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
        p(a, null, {
          default: c(() => [
            p(o)
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
        T("img", {
          src: n.previewingImage.url,
          alt: "previewing-image",
          class: "previewing-image"
        }, null, 8, Ta)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const Ia = /* @__PURE__ */ O(Fa, [["render", Da], ["__scopeId", "data-v-0afe3ea6"]]), Ve = {
  xarray: es,
  xautorows: ls,
  mobilexbutton: rs,
  pcxbutton: us,
  xchart: Fs,
  mobilexcheckboxs: Is,
  pcxcheckboxs: Bs,
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
  xinfo: Zi,
  xlooper: nl,
  mobilexpagination: ol,
  pcxpagination: dl,
  xpicker: hl,
  mobilexradios: fl,
  pcxradios: yl,
  mobilexrow: kl,
  pcxrow: Vl,
  mobilexscan: Ol,
  pcxscan: Tl,
  mobilexselect: Rl,
  pcxselect: Ul,
  xselectv2: Jl,
  mobilextable: mo,
  pcxtable: Fo,
  mobilextabletools: Bo,
  pcxtabletools: zo,
  xtablev2: la,
  xtableviewer: da,
  mobilextags: ma,
  pcxtags: ba,
  xtinymce: Sa,
  xfileuploader: ja,
  ximageuploader: Ia
}, de = {};
for (let e in Ve)
  de[Ve[e].name] = Ve[e];
const { ElInfiniteScroll: it } = window.ElementPlus || {}, pe = ".el-scrollbar__wrap", lt = (e, t) => {
  Ra(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", l = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (l < 1 ? 1 : l) + "");
}, Ra = (e, t, s) => {
  let l;
  s.forEach((n) => {
    l = e.getAttribute(n), l !== null ? t.setAttribute(n, l) : t.removeAttribute(n);
  });
}, Pa = {
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
  ElTableInfiniteScroll: Pa
}, Ma = (e) => ({
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
    e.find((n) => /(pc|mobile)/i.test(n) && n.toLowerCase().includes(l.toLowerCase())) ? s[l] = Ma(l) : s[l] = de[l];
  return s;
})(), Ba = (e, t) => {
  for (let s in Te)
    e.component(s, Te[s]);
  for (let s in Ee)
    e.directive(Ee[s].name, Ee[s]);
}, Na = {
  version: "1.7.6",
  ...Te,
  ...ft,
  ...Jt,
  install: Ba
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
  Lt as baseModel,
  rt as baseTable,
  Jt as controllers,
  Na as default,
  Vt as effects,
  J as formatOptions,
  Et as formatPrecision,
  ht as initDefaultForm,
  ct as initDialog,
  Nt as initFields,
  ue as initForm,
  ut as initFormRules,
  Ut as initModel,
  dt as initTable,
  mt as isWhenMatched,
  pt as triggers,
  ft as utils,
  at as validateForm
};
