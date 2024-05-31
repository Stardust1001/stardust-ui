import { toRaw as vt, markRaw as ie, nextTick as le, watch as Fe, resolveComponent as u, openBlock as d, createElementBlock as w, createElementVNode as j, createVNode as p, withCtx as c, createTextVNode as C, Fragment as P, renderList as B, mergeProps as _, createBlock as f, renderSlot as x, toDisplayString as $, useCssVars as Te, resolveDirective as Z, withDirectives as R, createCommentVNode as k, vShow as Xe, pushScopeId as De, popScopeId as Ie, resolveDynamicComponent as te, createSlots as oe, withModifiers as Q, normalizeClass as Y, normalizeProps as Re, h as se, isVNode as lt, withKeys as Pe, normalizeStyle as St } from "vue";
const kt = (e) => {
  const { width: t, height: s } = e.getBoundingClientRect();
  e.width = t, e.height = s;
  const i = e.getContext("2d");
  class l {
    constructor(L, O, I, M, z, re, S) {
      this.x = L, this.y = O, this.radius = I, this.color = M, this.vx = z, this.vy = re, this.ctx = S;
    }
    update() {
      this.x += this.vx, this.y += this.vy, this.ctx.beginPath(), this.ctx.fillStyle = this.color, this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2), this.ctx.fill(), this.detectWall();
    }
    detectWall() {
      this.x < this.radius ? (this.x = this.radius, this.vx = -this.vx) : this.x + this.radius > t && (this.x = t - this.radius, this.vx = -this.vx), this.y < this.radius ? (this.y = this.radius, this.vy = -this.vy) : this.y + this.radius > s && (this.y = s - this.radius, this.vy = -this.vy);
    }
  }
  const n = () => i.clearRect(0, 0, t, s), o = (D) => Math.floor(Math.random() * D);
  let a = 0, r = 0.01, m = 0;
  const h = () => {
    const D = i.createLinearGradient(0, 0, t * 1.5, s * 1.5);
    m ? m-- : (a += r, a <= 0 && (a = 0, r = -r, m = y * 30), a >= 1 && (a = 1, r = -r, m = y * 30)), D.addColorStop(0, "rgba(250, 220, 20, 0.5)"), D.addColorStop(a, "rgba(20, 20, 20, 0.5)"), i.fillStyle = D, i.fillRect(0, 0, t, s);
  }, v = Math.floor(t / 100), b = Math.floor(s / 100), y = 20, T = Math.round(1e3 / y), V = Array.from({ length: 52 }).map(() => {
    const D = Math.floor(o(v + b) * 1.5 + o(5));
    let L = o(t), O = o(s);
    L = Math.min(Math.max(D, L), t - D), O = Math.min(Math.max(D, O), s - D);
    let I = o(2) ? (o(2) + 2) * v : (o(-1) - 2) * v, M = o(2) ? (o(2) + 2) * b : (o(-1) - 2) * b;
    return I = Math.floor(I / y), M = Math.floor(M / y), new l(
      L,
      O,
      D,
      `rgba(${o(256)}, ${o(256)}, ${o(256)}, ${(o(5) + 5) / 10})`,
      I,
      M,
      i
    );
  });
  let g, E;
  e.addEventListener("mouseover", (D) => {
    g = D.pageX, E = D.pageY;
  }), e.addEventListener("mousemove", (D) => {
    if (g === void 0) {
      g = D.pageX, E = D.pageY;
      return;
    }
    const L = D.pageX - g, O = D.pageY - E;
    V.forEach((I) => {
      I.x += L / y, I.y += O / y;
    }), g = D.pageX, E = D.pageY;
  });
  let F = Date.now(), q = null;
  const K = () => {
    Date.now() - F >= T && (n(), h(), V.forEach((D) => D.update()), F = Date.now()), q = requestAnimationFrame(K);
  };
  return q = requestAnimationFrame(K), () => cancelAnimationFrame(q);
}, $t = ({
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
  const h = r.measureText(e).width + t, v = s + t;
  for (let b = t / 2; b < n; b += v)
    for (let y = t / 2; y < l; y += h)
      r[o + "Text"](e, y, b);
  return a;
}, Ct = {
  pop: kt,
  createWatermark: $t
}, at = async (e) => {
  var i, l;
  const t = await ((i = e.formRef) == null ? void 0 : i.validate().then(() => !0).catch(() => !1)), s = await Promise.all((l = e.formItems) == null ? void 0 : l.filter((n) => {
    var o, a;
    return ((o = n.comp) == null ? void 0 : o.endsWith("XForm")) || ((a = n.comp) == null ? void 0 : a.endsWith("x-form"));
  }).map((n) => at(n.form)));
  return t && s.every((n) => n);
}, xt = (e, t) => {
  if (typeof e != "number") {
    const s = parseFloat(e) || null;
    if (typeof s != "number")
      return e;
    e = s;
  }
  return e.toFixed(t) * 1;
}, H = (e, t) => {
  const s = e.__v_isRef ? e.value : vt(e), { text: i = "text", value: l = "value" } = t, n = s.map((a) => typeof a == "object" ? { text: a[i], value: a[l], disabled: a.disabled, raw: ie(a) } : { text: a, value: a });
  if (!t.sort)
    return n;
  const o = typeof t.sort == "string" ? t.sort : t.text || "text";
  return n.sort((a, r) => a[o].localeCompare(r[o]));
}, { ElMessage: Vt, ElNotification: Et, ElMessageBox: At } = window.ElementPlus || {}, { showToast: Ot, showNotify: jt, showConfirmDialog: Ft } = window.vant || {}, X = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? ((i === "error" || i === "warning") && (t.type = "fail"), t["z-index"] || (t["z-index"] = 1e6), Ot(t)) : Vt({
    showClose: !0,
    grouping: !0,
    ...t
  });
}, pe = (e) => {
  let t = typeof e != "string" ? e : { message: e };
  t = {
    type: "error",
    duration: 3e3,
    ...t
  };
  const { isMobile: s = window.isMobile, type: i } = t;
  s ? (i === "error" && (t.type = "danger"), jt(t)) : Et({
    showClose: !0,
    ...t
  });
}, ee = (e) => {
  let t = null;
  const { isMobile: s = window.isMobile } = e;
  return s ? t = Ft(e) : t = At.confirm(
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
  X[e] = X[e[0]] = (t) => X({ type: e, ...typeof t != "string" ? t : { message: t } }), pe[e] = pe[e[0]] = (t) => pe({ type: e, ...typeof t != "string" ? t : { message: t } }), ee[e] = ee[e[0]] = (t) => ee({ type: e, ...t });
const { funcs: Tt } = StardustJs, Dt = (e, t, s) => {
  e.beforeEach(async (i, l) => !!i.matched.length || "/404");
}, It = (e, t, s) => {
  e.afterEach((i, l) => {
    var n;
    document.title = ((n = i.matched[i.matched.length - 1].meta) == null ? void 0 : n.title) || t.app.sitename;
  });
}, Rt = (e, t, s) => {
  e.beforeEach(async (i, l) => {
    var a;
    const n = i.matched[i.matched.length - 1].path.split("/:")[0];
    if (i.meta.acl === !1 || (a = i.meta) != null && a.visitable)
      return !0;
    for (; t.getters.logging; )
      await Tt.sleep(20);
    if (await le(), t.acl.paths.includes(n))
      return !0;
    const o = { redirectTo: i.path, ...i.query };
    return t.getters.logined && (o.error = "受限于您的账号权限，暂时无法访问 " + i.path + " 页面，如有需要请联系我们", X({ message: o.error, duration: 1e4 })), { path: t.acl.paths[0] || "/404", query: o };
  }), le(() => {
    let i = !1;
    Fe(() => t.acl.menus, (l) => {
      if (!i) {
        if (!l.length)
          return;
        i = !0;
      }
      const n = t.acl.paths, o = (a, r) => {
        var h, v, b, y, T, V, g;
        let m;
        a.redirect && !a.component ? m = a.redirect : m = [...r, a].reduce((E, F) => E + "/" + F.path, "").replace("//", "/"), a.meta || (a.meta = {}), a.meta.acl === !1 ? (h = a.children) == null || h.forEach((E) => {
          var F;
          E.meta || (E.meta = {}), (F = E.meta).acl || (F.acl = !1), o(E, [...r, a]);
        }) : (a.meta._hidden = a.meta.hidden, parent && (a.meta.hidden == null && ((b = a.meta).hidden ?? (b.hidden = (v = parent.meta) == null ? void 0 : v.hidden), a.meta = { ...a.meta }), a.meta.visitable == null && ((T = a.meta).visitable ?? (T.visitable = (y = parent.meta) == null ? void 0 : y.visitable), a.meta = { ...a.meta })), (V = a.children) == null || V.forEach((E) => o(E, [...r, a])), a.meta.hidden !== !1 && a.meta._hidden !== !0 && (a.meta.hidden = !n.includes(m), (g = a.children) != null && g.some((E) => E.meta.hidden === !1) && (a.meta.hidden = !1)));
      };
      s.forEach((a) => o(a, []));
    }, { immediate: !0 });
  });
}, Pt = {
  check404: Dt,
  setTitle: It,
  checkRolesPages: Rt
}, ce = () => ({
  form: {},
  initialForm: {},
  formItems: [],
  formRef: null,
  formRules: {},
  initialFormRules: {},
  _isBaseForm: !0
}), ot = (e = {}) => ({
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
  query: i = {},
  form: l = {}
} = {}) => ({
  table: {
    ...ot(i),
    ...e,
    columns: s
  },
  dialog: {
    ...fe(),
    ...t,
    form: l
  }
}), { funcs: Ve } = StardustJs, Mt = (e) => e.map((t) => {
  const s = Object.keys(t);
  for (let i of s)
    i.startsWith("ta_") ? (t.tableAttrs || (t.tableAttrs = {}), t.tableAttrs[i.slice(3)] = t[i], delete t[i]) : i.startsWith("fa_") && (t.formAttrs || (t.formAttrs = {}), t.formAttrs[i.slice(3)] = t[i], delete t[i]);
  return t;
}), Lt = (e, t) => {
  for (let s in e) {
    const i = e[s];
    !i || typeof i != "object" || (s === "table" && e[s]._isBaseTable && rt(i, t), s === "dialog" && e[s]._isBaseDialog && dt(i, t), s === "form" && e[s]._isBaseForm && ue(i, t));
  }
  return e;
}, rt = (e, t) => (e.columns.push(...t.filter((s) => s.visible === !1 ? s.canView : s.canView !== !1)), e), dt = (e, t) => (e.formItems = t.filter((s) => s.visible === !1 ? s.canAdd || s.canEdit : s.canAdd !== !1 || s.canEdit !== !1), ue(e, t), e), ue = (e, t) => (e._isBaseForm && !e._isBaseDialog && (e.formItems = t.filter((i) => i.visible !== !1)), ut(e.form, e.formItems), e.initialForm = Ve.deepCopy(e.form), e.initialFormRules = Ve.deepCopy(e.formRules), Fe(() => e.formItems, () => {
  ct(e);
}, { immediate: !0, deep: !0 }), e), ct = (e) => {
  const { formItems: t, initialFormRules: s } = e, i = t.filter((n) => {
    let { formAttrs: o = {}, required: a = !1 } = n;
    return a = "required" in o ? o.required : a, !n.hasOwnProperty("rules") && !e.initialFormRules.hasOwnProperty(n.prop) && a !== !1;
  }).map((n) => n.prop);
  if (Object.assign(e.formRules, Ve.deepCopy(s)), Object.keys(e.formRules).forEach((n) => {
    n in s || delete e.formRules[n];
  }), !i.length)
    return;
  const l = {};
  return i.forEach((n) => {
    if (e.formRules[n])
      return;
    const o = t.find((y) => y.prop === n), a = o.platform || e.platform || (window.isMobile ? "mobile" : "pc"), r = mt[a], m = [], h = "options" in o, b = { required: !0, message: `请${o.validator || o.asyncValidator ? "正确" : ""}${h ? "选择" : "输入"}${(o == null ? void 0 : o.label) || n}` };
    o.validator && (b.validator = (y, T) => a === "pc" ? o.validator(y, T) : o.validator(T, y)), o.asyncValidator && (b.asyncValidator = (y, T) => a === "pc" ? o.asyncValidator(y, T) : o.asyncValidator(T, y)), o.comp ? m.push({ ...b, trigger: r.change }) : m.push({ ...b, trigger: r.blur }), o.comp === "ElInputNumber" && m.push({ ...b, trigger: r.blur }), l[n] = m;
  }), Object.assign(e.formRules, l), e.formRules;
}, ut = (e, t, s = !0) => {
  const i = {};
  return t.forEach((l) => {
    var m, h;
    let n = "";
    const { type: o, options: a } = l, { multiple: r } = l.formAttrs || {};
    if (s && o === "number" || l.comp === "ElInputNumber")
      n = 0;
    else if (l.comp === "ElSwitch")
      n = !1;
    else if (a && ((m = l.comp) != null && m.endsWith("XCheckboxs") || (h = l.comp) != null && h.endsWith("x-checkboxs") || r))
      n = [];
    else if (l.comp === "ElDatePicker" && ["datetimerange", "daterange", "monthrange"].includes(l.type)) {
      const v = {
        datetimerange: "时间",
        daterange: "日期",
        monthrange: "月份"
      }[l.type];
      l["start-placeholder"] || (l["start-placeholder"] = "开始" + v), l["end-placeholder"] || (l["end-placeholder"] = "结束" + v), n = [];
    }
    i[l.prop] = n;
  }), Object.assign(e, { ...i, ...e }), e;
}, ht = (e, t) => {
  if (!e)
    return !0;
  const s = /[\^\*\$\~\!]?=/;
  let [i, l] = e.split(s);
  l = l.split("|");
  let n = t[i];
  typeof n == "number" ? n += "" : typeof n == "string" && (n = n.trim());
  const o = e.match(s)[0];
  return l.some((a) => o === "^=" ? n.startsWith(a) : o === "*=" ? n.includes(a) : o === "$=" ? n.endsWith(a) : o === "~=" ? !n.includes(a) : o === "!=" ? n !== a : a === n);
}, mt = {
  mobile: {
    blur: "onBlur",
    change: "onChange"
  },
  pc: {
    blur: "blur",
    change: "change"
  }
}, pt = {
  effects: Ct,
  validateForm: at,
  formatPrecision: xt,
  formatOptions: H,
  Message: X,
  Notify: pe,
  Confirm: ee,
  middlewares: Pt,
  baseForm: ce,
  baseTable: ot,
  baseDialog: fe,
  baseModel: Bt,
  initFields: Mt,
  initModel: Lt,
  initTable: rt,
  initDialog: dt,
  initForm: ue,
  initFormRules: ct,
  initDefaultForm: ut,
  isWhenMatched: ht,
  triggers: mt
}, { funcs: ye, highdict: Nt, dates: Ut } = window.StardustJs, { storage: we } = window.StardustBrowser, qt = [
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
class ft {
  constructor({ model: t, vue: s }) {
    if (this.model = t, this._bindMethods(), s) {
      const i = s.getCurrentInstance();
      Object.defineProperties(this, {
        vue: { get: () => s },
        vm: { get: () => i }
      }), this._initLifeHooks();
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
    return pt;
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
    return Ut;
  }
  get $highdict() {
    return Nt;
  }
  get $copy() {
    return ye.deepCopy;
  }
  get $sleep() {
    return ye.sleep;
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
    const t = [...Object.keys(this), ...this._getMethods()], s = Object.getOwnPropertyDescriptors(this.__proto__), i = Object.keys(s).filter((o) => o !== "constructor");
    Array.from(/* @__PURE__ */ new Set([...t, ...i])).filter((o) => typeof this[o] == "function").forEach((o) => {
      this[o] = this[o].bind(this);
    });
  }
  _initLifeHooks() {
    qt.forEach((t) => {
      this[t] && this.vue[t](this[t]);
    });
  }
  _evalAction() {
    var l;
    const { _action_: t, _action_params_: s, ...i } = this.query;
    t && this[t] && ((l = this[t]) == null || l.call(this, JSON.parse(s || "{}")), this.router.replace(this.route.path + "?" + ye.encodeQuery(i)));
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
const { funcs: We, highdict: ve, dates: Se } = StardustJs, { file: He, excel: he } = StardustBrowser;
class gt extends ft {
  constructor(t) {
    super(t);
    const { model: s, table: i, dialog: l, dbModelName: n = "", idField: o = "id", listProp: a = "data" } = t;
    this.table = i || (s == null ? void 0 : s.table), this.dialog = l || (s == null ? void 0 : s.dialog), this.dbModelName = n, this.idField = o, this.listProp = a, this._isSubmitting = !1, this._lastSearchParams = null, this._dbTable = null, this._unwatchs = [], le(() => {
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
    var t, s, i, l;
    if ((t = this.model) != null && t.form && ((s = this.dialog) != null && s.form))
      throw "conflict of model.form and dialog.form";
    return ((i = this.model) == null ? void 0 : i.form) || ((l = this.dialog) == null ? void 0 : l.form);
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
    if (this._lastSearchParams = null, t = t.replace(/,/g, " ").split(" ").filter((n) => n), !t.length)
      return this.handleSearch();
    let { searchFields: s, columns: i } = this.table;
    if (s.length || (s = [...new Set(i.filter((n) => typeof n.canSearch == "boolean" ? n.canSearch : n.prop && n.type !== "number" && !n.comp && !n.virtual).map((n) => n.prop))]), !s.length)
      return this.handleSearch();
    const l = [];
    return s.forEach((n) => {
      t.forEach((o) => {
        l.push({ [n]: { "[Op.like]": "%" + o + "%" } });
      });
    }), this.handleSearch({ where: { "[Op.or]": l } });
  }
  async handleSearch(t, { isInfinite: s = !1 } = {}) {
    if (t instanceof Event && (t = null), this.table.isInfinite = s, this.table.loading || !await this.beforeSearch(t))
      return;
    t = this.getSearchParams(t), this.injectSearchParams(t), this.table.loading = !0;
    const i = await this.search(t);
    let l = ve.get(i, this.listProp);
    return l = this.formatList(this._defaultFormatList(l, i), i), Object.assign(this.table, {
      list: l,
      total: i.total,
      loading: !1
    }), this.afterSearch(l, t, i), i;
  }
  async handleAdd() {
    await this.beforeAdd() && (this._resetForm(), Object.assign(this.dialog, {
      visible: !0,
      isEditing: !1
    }), await le(), await We.sleep(50), this._clearValidate(), this.afterAdd());
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
    }), await le(), (i = this.dialog.formRef) == null || i.validate().catch(Function())), this.afterEdit({ $index: t, row: s }));
  }
  async handleDelete({ $index: t, row: s }) {
    if (this.table.loading || !await this.beforeDelete({ $index: t, row: s }) || !await ee.w({ message: "确定要删除吗？", title: "警告" }))
      return;
    this.table.loading = !0;
    const l = this.getDeleteParams(s);
    this.injectDeleteParams(l);
    const n = await this.remove(l, s);
    this.table.loading = !1, !n.err && (this.afterDelete(n), this.handleSearch());
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
    } catch (i) {
      this._showError(i.data.err), t._loading = !1;
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
    const { list: i, selection: l, ref: n } = this.table;
    let o = l.length > 0 ? l : i;
    o = We.deepCopy(o), o = this.processExportingData(o);
    const a = this.processExportingColumns(n._visibleColumns, "current"), r = a.map((b) => b.prop), m = a.map((b) => b.label);
    o = o.map((b) => r.map((y) => b[y]));
    let h = null;
    t === "csv" ? h = he.export2Csv : h = he.export2Excel;
    let v = { list: i, header: m, data: o, filename: s };
    v = await this.processExporting(v), h(v), this.table.loading = !1;
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
    const i = await this.dbTable.search(this.getSearchExportParams());
    let l = i.data;
    l = this.formatList(l, i), l = this.processExportingData(l, "search");
    const n = this.processExportingColumns(this.table.ref._visibleColumns, "search-export"), o = n.map((h) => h.prop), a = n.map((h) => h.label);
    l = l.map((h) => o.map((v) => h[v]));
    let r = null;
    t === "csv" ? r = he.export2Csv : r = he.export2Excel;
    let m = { list: i.data, header: a, data: l, filename: s };
    m = await this.processExporting(m), r(m), this.table.loading = !1;
  }
  async handleImport() {
    var n, o;
    if (this.table.loading)
      return;
    const t = await He.select(".xlsx,.csv");
    this.table.loading = !0;
    const s = t.name.toLowerCase().endsWith(".csv"), i = await He.toType(t, s ? "text" : "arraybuffer");
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
      this.table.columns.forEach((m) => a[m.label] = m.prop);
      const r = Object.keys(l[0]);
      l = l.map((m) => {
        const h = {};
        return r.forEach((v) => h[a[v]] = m[v]), h;
      });
    }
    l = this.processImportingData(l), await this.dbTable.func(["bulkCreate", l]), X.s("导入成功"), this.table.loading = !1, this.handleSearch();
  }
  async handleMultiDelete() {
    if (this.table.loading)
      return;
    const { selection: t } = this.table;
    if (!t.length) {
      X.w("尚未选择要删除的数据");
      return;
    }
    if (!await ee.w({ title: "警告", message: `确定删除选中的 ${t.length} 条数据吗？` }))
      return;
    this.table.loading = !0;
    const i = t.map((l) => l[this.idField]);
    await this.dbTable.func(["destroy", {
      where: {
        [this.idField]: { "[Op.in]": i }
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
    const i = this.getAddParams(t);
    if (this.injectAddParams(i), !await this._checkAllNone(i)) {
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
    return this._isSubmitting = !1, l.err || X.s("保存成功"), this.router.go(-1), l;
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
    let i = null;
    try {
      if (this.dialog.isEditing) {
        const l = this.getUpdateParams(s);
        if (this.injectUpdateParams(l), !await this._checkAllNone(l))
          return this._isSubmitting = !1, !1;
        i = await this.update(l, this.dialog.editingRow[this.idField]);
      } else {
        const l = this.getAddParams(s);
        if (this.injectAddParams(l), !await this._checkAllNone(l))
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
    const { query: t } = this.table;
    if (!this.table.list.length)
      return await this.handleSearch(), t.page * t.limit >= this.table.total && (this.table.finished = !0), this.table.moreLoading = !1;
    const { loading: s, total: i } = this.table;
    if (s || !i || this.table.finished)
      return this.table.moreLoading = !1;
    if (t.page * t.limit >= i)
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
    const s = Object.keys(this.dialog.initialForm), i = {};
    return s.length ? s.forEach((l) => i[l] = t[l]) : Object.assign(i, t), this.dialog.formItems.forEach((l) => {
      let n = i[l.model || l.prop];
      l.type === "number" ? n = this.uiUtils.formatPrecision(n, l.precision || 3) * 1 : l.comp === "ElDatePicker" && (l.type === "datetime" ? n = Se.format(n) : (!l.type || l.type === "date") && (n = Se.format(n, "", !1))), i[l.model || l.prop] = n;
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
  afterSearch(t, s, i) {
    const l = JSON.stringify(s);
    if (this.table.query.count === !1 && this.table.needCount && l !== this._lastSearchParams) {
      const { page: n, limit: o, order: a, count: r, ...m } = s;
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
    const i = {};
    s.forEach((l) => i[l] = t[l]), await this.update(i, t[this.idField]), this.table.loading = !1;
  }
  _defaultFormatList(t, s) {
    const { columns: i, query: l } = this.table, { page: n, limit: o } = l;
    return t.forEach((a, r) => {
      a._idx = r + 1, a._index = (n - 1) * o + r + 1;
    }), i.forEach((a) => {
      let { prop: r, options: m } = a;
      const { format: h, autoFill: v } = a.tableAttrs || {}, { modelName: b } = a.formAttrs || {};
      if (b && v)
        t.forEach((y) => y[`_formatted_${r}`] = ""), this._fillRelatedField(t, a);
      else if (Array.isArray(m) && h !== !1) {
        const T = Fe(() => a.options, (V, g) => {
          const E = g ? this.table.list : t, F = zt(a);
          E.forEach((q, K) => {
            const D = q[r];
            q[`_formatted_${r}`] = F[D] || D;
          });
        }, { immediate: !0, deep: !0 });
        this._unwatchs.push(T);
      }
    }), t;
  }
  async _fillRelatedField(t, s) {
    const i = [...new Set(t.map((m) => m[s.prop]))];
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
    const r = ve.mapField(a.data, o, n);
    this.table.list.forEach((m) => {
      m[`_formatted_${s.prop}`] = r[m[s.prop]];
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
      let { formatter: o = n.formatter, tagValues: a = n.tagValues, options: r = n.options } = n.tableAttrs || {};
      !o && typeof a == "function" && (o = a), i[n.prop] = { formatter: o, tagValues: a, options: r };
    });
    const l = [...new Set(Object.keys(t[0]).concat(this.table.ref._visibleColumns.map((n) => n.prop).filter((n) => n)))];
    return t.forEach((n) => {
      l.forEach((o) => {
        var r, m, h, v;
        const a = n[o];
        if (n.hasOwnProperty("_formatted_" + o))
          return n[o] = n["_formatted_" + o];
        if ((r = i[o]) != null && r.formatter)
          return n[o] = i[o].formatter(a);
        if ((m = i[o]) != null && m.tagValues)
          return n[o] = i[o].tagValues[a];
        if ((h = i[o]) != null && h.options)
          return n[o] = ((v = i[o].options.find((b) => b.value === n[o])) == null ? void 0 : v.text) ?? n[o];
        typeof a == "boolean" ? n[o] = a && 1 || 0 : a instanceof Date ? (n[o] = Se.format(a), n[o].endsWith(" 00:00:00") && (n[o] = n[o].slice(0, -9))) : a === void 0 && (n[o] = ve.get(n, o));
      });
    }), t.forEach((n) => {
      l.forEach((o) => {
        n[o] && typeof n[o] == "object" && (n[o] = JSON.stringify(n[o]));
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
    return Object.values(t).some((l) => !s.includes(l)) ? !0 : ee.w({ message: "表单所有数据都是空，确定要继续提交吗？", title: "警告" });
  }
  _showError(t) {
    X(typeof t == "object" ? t.message || t.err || t.toString() : t);
  }
  get _isMobile() {
    var s, i;
    const t = ((s = this.table) == null ? void 0 : s.formRef) || ((i = this.dialog) == null ? void 0 : i.formRef);
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
const zt = (e) => {
  const { options: t, formAttrs: s = {} } = e, { text: i = "text", value: l = "value" } = s, n = {};
  return t && typeof t == "object" && typeof t[0] == "object" && t.forEach((o) => {
    n[o[l]] = o[i];
  }), n;
};
class Xt extends gt {
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
const Wt = {
  BaseController: ft,
  CrudController: gt,
  TempCrudController: Xt
}, A = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, l] of t)
    s[i] = l;
  return s;
}, Ht = {
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
      const e = ce(), t = Math.floor(24 / this.items.length), s = this.items.map((i) => ({ span: i.span || t, ...i }));
      return ue(e, s), e;
    },
    handleAdd() {
      this.groups.push(this.makeForm());
    },
    handleCopy(e, t) {
      this.groups.push(JSON.parse(JSON.stringify(e)));
    },
    async handleClear() {
      await ee.w({ message: "确定删除全部组吗？", title: "警告" }) && (this.groups = []);
    }
  }
}, Kt = { class: "x-array" }, Jt = { class: "group-operates" }, Yt = { class: "groups" };
function Gt(e, t, s, i, l, n) {
  const o = u("x-icon"), a = u("x-button"), r = u("x-form");
  return d(), w("div", Kt, [
    j("div", Jt, [
      p(a, {
        type: "primary",
        plain: "",
        class: "add-item",
        onClick: n.handleAdd
      }, {
        default: c(() => [
          p(o, {
            name: "Plus",
            class: "icon"
          }),
          C("添加一组 ")
        ]),
        _: 1
      }, 8, ["onClick"]),
      p(a, {
        type: "danger",
        plain: "",
        class: "clear-items",
        onClick: n.handleClear
      }, {
        default: c(() => [
          C("全部删除")
        ]),
        _: 1
      }, 8, ["onClick"])
    ]),
    j("div", Yt, [
      (d(!0), w(P, null, B(l.groups, (m, h) => (d(), w("div", {
        key: h,
        class: "group"
      }, [
        p(r, _({
          form: m,
          "hide-labels": "",
          gutter: 10
        }, e.$attrs, { class: "form" }), null, 16, ["form"]),
        p(a, {
          type: "success",
          plain: "",
          icon: "CopyDocument",
          onClick: (v) => n.handleCopy(m, h),
          class: "button"
        }, null, 8, ["onClick"]),
        p(a, {
          type: "danger",
          plain: "",
          icon: "DeleteFilled",
          onClick: (v) => l.groups.splice(h, 1),
          class: "button"
        }, null, 8, ["onClick"])
      ]))), 128))
    ])
  ]);
}
const Qt = /* @__PURE__ */ A(Ht, [["render", Gt], ["__scopeId", "data-v-424f69b7"]]), Zt = {
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
      return this.cols.forEach((i) => {
        const l = i.span || this.span;
        t.push(i), s += l, s >= 24 && (t = [], e.push(t), s = 0);
      }), e;
    }
  }
}, es = { class: "x-auto-rows" }, ts = { key: 1 };
function ss(e, t, s, i, l, n) {
  const o = u("x-col"), a = u("x-row");
  return d(), w("div", es, [
    (d(!0), w(P, null, B(n.rows, (r, m) => (d(), f(a, _({ key: m }, e.$attrs, {
      platform: e.$attrs.platform
    }), {
      default: c(() => [
        (d(!0), w(P, null, B(r, (h, v) => (d(), f(o, _(h, {
          span: n.isMobile ? h.xs || h.span || s.span : h.span || s.span,
          key: v,
          platform: e.$attrs.platform
        }), {
          default: c(() => [
            h.slot || e.$attrs.slot ? x(e.$slots, h.slot || e.$attrs.slot, {
              key: 0,
              col: h
            }) : (d(), w("span", ts, $(h.text), 1))
          ]),
          _: 2
        }, 1040, ["span", "platform"]))), 128))
      ]),
      _: 2
    }, 1040, ["platform"]))), 128))
  ]);
}
const ns = /* @__PURE__ */ A(Zt, [["render", ss]]), is = {
  name: "MobileXButton"
};
function ls(e, t, s, i, l, n) {
  const o = u("van-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const as = /* @__PURE__ */ A(is, [["render", ls]]), os = {
  name: "PcXButton"
};
function rs(e, t, s, i, l, n) {
  const o = u("el-button");
  return d(), f(o, null, {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  });
}
const ds = /* @__PURE__ */ A(os, [["render", rs]]), { funcs: cs } = StardustBrowser, us = ["index", "selection", "expand", "radio", "_index"], Be = {
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
        ...fe(),
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
          { label: "数据筛选", slot: "filter" },
          { label: "字体大小", slot: "font-sizes" }
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
          },
          fontSizes: [12, 12, 12]
        }
      }
    };
  },
  computed: {
    zoomedHeight() {
      return cs.calcPixel(this.height) * this.zoom + "px";
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
    },
    fontSizes() {
      return this.dialog.form.fontSizes;
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
    window.v = this, await this.init(), this.initDatasource();
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
      const e = this.datasource.columns.filter((t) => !us.includes(t.type));
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
      var L;
      const { categories: t, data: s, attr: i, summary: l, type: n, filter: o, grid: a, fontSizes: r } = e, m = {}, h = Array.isArray(t) && t.length || ((L = t == null ? void 0 : t.data) == null ? void 0 : L.length), v = h && (Array.isArray(t) ? t : t.data), b = typeof e.series == "string" ? e.series : e.series.data, y = (o == null ? void 0 : o.categories.limit) > -1, T = (o == null ? void 0 : o.series.limit) > -1, V = {}, g = [], E = /* @__PURE__ */ new Set(), F = [];
      s.forEach((O) => {
        var M;
        let I = O[b] || "未知";
        if (T && F.length >= o.series.limit && !F.includes(I)) {
          if (!o.series.mergeOthers)
            return;
          I = "其他";
        }
        if (h) {
          let z = v.map((re) => O[re]).join("/") || "未知";
          if (y && g.length >= o.categories.limit && !g.includes(z)) {
            if (!o.categories.mergeOthers)
              return;
            E.add(z), z = "其他";
          }
          V[z] || g.push(z), V[z] || (V[z] = {}), F.includes(I) || F.push(I), (M = V[z])[I] || (M[I] = []), V[z][I].push(O[i]);
        } else
          V[I] || F.push(I), V[I] || (V[I] = []), V[I].push(O[i]);
      });
      const q = h && !T ? [...new Set(s.map((O) => O[b]))] : F;
      if (h)
        for (let O in V)
          for (let I in V[O])
            V[O][I] = this.calcSummary(
              V[O][I],
              l,
              y && O === "其他" ? V[O][I].length / E.size : V[O][I].length
            );
      else
        for (let O in V)
          V[O] = this.calcSummary(V[O], l);
      let K = q;
      typeof e.series == "object" && e.series.formatter && (K = q.map((O) => e.series.formatter(O)));
      let D = [];
      h ? D = q.map((O, I) => ({
        name: K[I],
        type: n,
        label: { show: !0, position: "top" },
        data: g.map((M) => ({ name: M, value: V[M][O] }))
      })) : D = [
        {
          type: n,
          colorBy: "data",
          label: { show: !0, position: "top", fontSize: r[2] },
          data: q.map((O) => ({ name: O, value: V[O] }))
        }
      ], Object.assign(m, {
        legend: { data: K },
        xAxis: {
          type: "category",
          data: h ? t.formatter ? g.map((O) => t.formatter(O)) : g : b.formatter ? F.map((O) => b.formatter(O)) : F
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: r[1]
          }
        },
        series: D
      }, this.option, { grid: a }), this.update(m);
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
      }, e.xAxis && !((t = e.xAxis.axisLabel) != null && t.formatter) && ((s = e.xAxis).axisLabel || (s.axisLabel = { fontSize: this.fontSizes[0] }), e.xAxis.axisLabel.formatter = this.labelSplitFormatter(this.option.charsLimitPerLine || 5)), console.log(e), (i = this.chart) == null || i.setOption(e, !0);
    },
    labelSplitFormatter(e) {
      return (t) => t.length < e ? t : Array.from({
        length: Math.ceil(t.length / e)
      }).map((s, i) => t.slice(i * e, (i + 1) * e)).join(`
`);
    }
  }
}, Ke = () => {
  Te((e) => ({
    "7ea8e032": e.zoomedHeight,
    "1f7dd58c": e.zoom
  }));
}, Je = Be.setup;
Be.setup = Je ? (e, t) => (Ke(), Je(e, t)) : Ke;
const ge = (e) => (De("data-v-bd54d87e"), e = e(), Ie(), e), hs = { class: "x-chart" }, ms = {
  class: "chart",
  ref: "el"
}, ps = /* @__PURE__ */ ge(() => /* @__PURE__ */ j("span", null, "左", -1)), fs = /* @__PURE__ */ ge(() => /* @__PURE__ */ j("span", null, "上", -1)), gs = /* @__PURE__ */ ge(() => /* @__PURE__ */ j("span", null, "右", -1)), bs = /* @__PURE__ */ ge(() => /* @__PURE__ */ j("span", null, "下", -1));
function _s(e, t, s, i, l, n) {
  const o = u("pc-x-icon"), a = u("el-input-number"), r = u("el-col"), m = u("el-row"), h = u("el-checkbox"), v = u("el-tab-pane"), b = u("el-tabs"), y = u("x-form"), T = u("x-dialog"), V = Z("loading");
  return R((d(), w("div", hs, [
    j("div", ms, null, 512),
    s.datasource ? (d(), w("div", {
      key: 0,
      class: "settings flex-center",
      onClick: t[0] || (t[0] = (g) => l.dialog.visible = !0)
    }, [
      C(" 配置 "),
      p(o, { name: "Setting" })
    ])) : k("", !0),
    p(T, {
      modelValue: l.dialog.visible,
      "onUpdate:modelValue": t[15] || (t[15] = (g) => l.dialog.visible = g),
      title: "图表配置",
      drawer: "",
      width: "460",
      "submit-text": "生成图表",
      "cancel-text": "关闭",
      onSubmit: n.handleMakeChart,
      onCancel: t[16] || (t[16] = (g) => l.dialog.visible = !1)
    }, {
      default: c(() => [
        p(y, { dialog: l.dialog }, {
          grid: c(() => [
            p(m, {
              gutter: 5,
              class: "grid"
            }, {
              default: c(() => [
                p(r, { span: 12 }, {
                  default: c(() => [
                    ps,
                    p(a, {
                      modelValue: n.grid.left,
                      "onUpdate:modelValue": t[1] || (t[1] = (g) => n.grid.left = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    fs,
                    p(a, {
                      modelValue: n.grid.top,
                      "onUpdate:modelValue": t[2] || (t[2] = (g) => n.grid.top = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    gs,
                    p(a, {
                      modelValue: n.grid.right,
                      "onUpdate:modelValue": t[3] || (t[3] = (g) => n.grid.right = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 12 }, {
                  default: c(() => [
                    bs,
                    p(a, {
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
                    p(h, {
                      modelValue: n.categories.isLimit,
                      "onUpdate:modelValue": t[5] || (t[5] = (g) => n.categories.isLimit = g)
                    }, {
                      default: c(() => [
                        C("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    R(j("div", null, [
                      C(" 记录条数 "),
                      p(a, {
                        modelValue: n.categories.limit,
                        "onUpdate:modelValue": t[6] || (t[6] = (g) => n.categories.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(h, {
                        modelValue: n.categories.mergeOthers,
                        "onUpdate:modelValue": t[7] || (t[7] = (g) => n.categories.mergeOthers = g)
                      }, {
                        default: c(() => [
                          C("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Xe, n.categories.isLimit]
                    ])
                  ]),
                  _: 1
                }),
                p(v, {
                  label: "系列",
                  name: "系列"
                }, {
                  default: c(() => [
                    p(h, {
                      modelValue: n.series.isLimit,
                      "onUpdate:modelValue": t[8] || (t[8] = (g) => n.series.isLimit = g)
                    }, {
                      default: c(() => [
                        C("只使用前有限条记录")
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    R(j("div", null, [
                      C(" 记录条数 "),
                      p(a, {
                        modelValue: n.series.limit,
                        "onUpdate:modelValue": t[9] || (t[9] = (g) => n.series.limit = g),
                        min: 0,
                        precision: 0
                      }, null, 8, ["modelValue"]),
                      p(h, {
                        modelValue: n.series.mergeOthers,
                        "onUpdate:modelValue": t[10] || (t[10] = (g) => n.series.mergeOthers = g)
                      }, {
                        default: c(() => [
                          C("合并剩余项为其他")
                        ]),
                        _: 1
                      }, 8, ["modelValue"])
                    ], 512), [
                      [Xe, n.series.isLimit]
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
                    C(" X轴 "),
                    p(a, {
                      modelValue: n.fontSizes[0],
                      "onUpdate:modelValue": t[12] || (t[12] = (g) => n.fontSizes[0] = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 8 }, {
                  default: c(() => [
                    C(" Y轴 "),
                    p(a, {
                      modelValue: n.fontSizes[1],
                      "onUpdate:modelValue": t[13] || (t[13] = (g) => n.fontSizes[1] = g)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                p(r, { span: 8 }, {
                  default: c(() => [
                    C(" 值 "),
                    p(a, {
                      modelValue: n.fontSizes[2],
                      "onUpdate:modelValue": t[14] || (t[14] = (g) => n.fontSizes[2] = g)
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
    [V, l.loading]
  ]);
}
const ys = /* @__PURE__ */ A(Be, [["render", _s], ["__scopeId", "data-v-bd54d87e"]]), ws = {
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
        required: l,
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
        this._options = H(this.options, this);
      }
    }
  }
};
function vs(e, t, s, i, l, n) {
  const o = u("van-checkbox"), a = u("van-checkbox-group");
  return d(), f(a, _({
    class: ["mobile-x-checkboxs", s.plain ? "mobile-x-checkboxs--plain" : ""]
  }, n.attrs, {
    direction: s.direction,
    onChange: t[0] || (t[0] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), w(P, null, B(l._options, (r) => {
        var m;
        return d(), f(o, _(n.attrs, {
          disabled: (m = r.raw) == null ? void 0 : m.disabled,
          key: r.text,
          shape: s.shape,
          name: r.value
        }), {
          default: c(() => [
            C($(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "shape", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const Ss = /* @__PURE__ */ A(ws, [["render", vs], ["__scopeId", "data-v-f7122501"]]), ks = {
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
        this._options = H(e, this);
      }
    }
  }
}, $s = { key: 1 };
function Cs(e, t, s, i, l, n) {
  const o = u("el-checkbox"), a = u("el-checkbox-group");
  return d(), f(a, _({
    class: ["pc-x-checkboxs", s.plain ? "pc-x-checkboxs--plain" : ""]
  }, n.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onChange: t[1] || (t[1] = (r) => e.$emit("change", r))
  }), {
    default: c(() => [
      (d(!0), w(P, null, B(l._options, (r) => {
        var m;
        return d(), f(o, _(n.attrs, {
          disabled: (m = r.raw) == null ? void 0 : m.disabled,
          key: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? x(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), w("span", $s, $(r.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const xs = /* @__PURE__ */ A(ks, [["render", Cs], ["__scopeId", "data-v-4dd3721a"]]), Vs = {
  name: "MobileXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function Es(e, t, s, i, l, n) {
  const o = u("van-col");
  return d(), f(o, _(n.attrs, { class: "mobile-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const As = /* @__PURE__ */ A(Vs, [["render", Es]]), Os = {
  name: "PcXCol",
  inheritAttrs: !1,
  computed: {
    attrs() {
      const { text: e, slot: t, ...s } = this.$attrs;
      return s;
    }
  }
};
function js(e, t, s, i, l, n) {
  const o = u("el-col");
  return d(), f(o, _(n.attrs, { class: "pc-x-col" }), {
    default: c(() => [
      x(e.$slots, "default")
    ]),
    _: 3
  }, 16);
}
const Fs = /* @__PURE__ */ A(Os, [["render", js]]), Ts = {
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
}, Ds = { key: 1 }, Is = { key: 1 };
function Rs(e, t, s, i, l, n) {
  const o = u("van-button"), a = u("van-col"), r = u("van-row");
  return d(), f(te(s.actionsheet ? "van-action-sheet" : "van-dialog"), _({ width: "92%" }, e.$attrs, {
    show: n.visible,
    "onUpdate:show": t[0] || (t[0] = (m) => n.visible = m),
    class: "mobile-x-dialog",
    "show-confirm-button": n.canConfirm,
    "show-cancel-button": n.canCancel,
    onConfirm: n.handleConfirm,
    onCancel: n.handleCancel
  }), oe({ _: 2 }, [
    e.$slots.title || s.title ? {
      name: "title",
      fn: c(() => [
        e.$slots.title ? x(e.$slots, "title", { key: 0 }) : (d(), w("span", Ds, $(s.title), 1))
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
        e.$slots.title ? x(e.$slots, "title", { key: 0 }) : (d(), w("span", Is, $(s.title), 1))
      ]),
      key: "3"
    } : void 0,
    n.canConfirm || n.canCancel ? {
      name: "cancel",
      fn: c(() => [
        p(r, null, {
          default: c(() => [
            n.canCancel ? (d(), f(a, {
              key: 0,
              span: 12
            }, {
              default: c(() => [
                p(o, {
                  block: "",
                  onClick: Q(n.handleCancel, ["stop"])
                }, {
                  default: c(() => [
                    C($(s.cancelText), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ]),
              _: 1
            })) : k("", !0),
            n.canConfirm ? (d(), f(a, {
              key: 1,
              span: 12
            }, {
              default: c(() => [
                p(o, {
                  block: "",
                  style: { color: "var(--van-blue)" },
                  onClick: Q(n.handleConfirm, ["stop"])
                }, {
                  default: c(() => [
                    C($(s.submitText), 1)
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
const Ps = /* @__PURE__ */ A(Ts, [["render", Rs]]), Bs = {
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
}, Ms = {
  key: 1,
  class: "el-dialog__title"
};
function Ls(e, t, s, i, l, n) {
  const o = u("x-icon"), a = u("el-button");
  return d(), f(te(s.drawer ? "ElDrawer" : "ElDialog"), _({ draggable: s.draggable }, e.$attrs, {
    modelValue: n.visible,
    "onUpdate:modelValue": t[2] || (t[2] = (r) => n.visible = r),
    fullscreen: l.fullscreen,
    size: e.$attrs.width,
    class: ["pc-x-dialog", { "pc-x-drawer": s.drawer, "no-footer": !n.hasFooter }]
  }), {
    header: c(() => [
      e.$slots.header ? x(e.$slots, "header", { key: 0 }) : (d(), w("span", Ms, $(s.title), 1)),
      s.drawer ? k("", !0) : (d(), f(o, {
        key: 2,
        name: "FullScreen",
        class: "full el-dialog__headerbtn",
        style: { right: "50px" },
        onClick: n.handleToggleFullscreen
      }, null, 8, ["onClick"]))
    ]),
    footer: c(() => [
      e.$slots.footer ? x(e.$slots, "footer", { key: 0 }) : k("", !0),
      s.onSubmit || e.$parent.$attrs.onSubmit ? (d(), f(a, {
        key: 1,
        type: "primary",
        disabled: e.$attrs["submit-disabled"],
        onClick: t[0] || (t[0] = (r) => e.$emit("submit"))
      }, {
        default: c(() => [
          C($(s.submitText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0),
      s.onCancel || e.$parent.$attrs.onCancel ? (d(), f(a, {
        key: 2,
        disabled: e.$attrs["cancel-disabled"],
        onClick: t[1] || (t[1] = (r) => e.$emit("cancel"))
      }, {
        default: c(() => [
          C($(s.cancelText), 1)
        ]),
        _: 1
      }, 8, ["disabled"])) : k("", !0)
    ]),
    default: c(() => [
      e.$slots.default ? x(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  }, 16, ["draggable", "modelValue", "fullscreen", "size", "class"]);
}
const Ns = /* @__PURE__ */ A(Bs, [["render", Ls]]), Us = {
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
      const e = ce(), t = Math.floor(24 / this.items.length), s = this.items.map((i) => ({ span: i.span || t, ...i }));
      return ue(e, s), e;
    }
  }
}, qs = { class: "x-dict" };
function zs(e, t, s, i, l, n) {
  const o = u("x-form");
  return d(), w("div", qs, [
    p(o, _({
      form: l.form,
      "hide-labels": "",
      gutter: 10
    }, e.$attrs), null, 16, ["form"])
  ]);
}
const Xs = /* @__PURE__ */ A(Us, [["render", zs]]), J = {}, ne = {
  provinces: [],
  cities: [],
  counties: []
}, Ws = {
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
      Object.assign(J, this.areaList), ne.provinces = Object.entries(J.province_list).map((e) => ({ value: e[0], text: e[1] })), ne.cities = Object.entries(J.city_list).map((e) => ({ value: e[0], text: e[1] })), ne.counties = Object.entries(J.county_list).map((e) => ({ value: e[0], text: e[1] })), this.provinces = Object.freeze(ne.provinces);
    },
    async init() {
      this.inited = !1;
      const [e, t, s] = this.modelValue.split(this.seperator);
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
      ].slice(0, this.number).join(this.seperator);
      this.$emit("update:modelValue", e), this.$emit("change", e);
    }
  }
};
function Hs(e, t, s, i, l, n) {
  const o = u("x-select"), a = u("x-col"), r = u("x-row");
  return d(), f(r, {
    class: "x-district-select",
    gutter: 10
  }, {
    default: c(() => [
      p(a, { span: n.span }, {
        default: c(() => [
          p(o, {
            modelValue: l.province,
            "onUpdate:modelValue": t[0] || (t[0] = (m) => l.province = m),
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
          p(o, {
            modelValue: l.city,
            "onUpdate:modelValue": t[1] || (t[1] = (m) => l.city = m),
            options: l.cities,
            placeholder: "城市"
          }, null, 8, ["modelValue", "options"])
        ]),
        _: 1
      }, 8, ["span"])) : k("", !0),
      n.number > 2 ? (d(), f(a, {
        key: 1,
        span: n.span
      }, {
        default: c(() => [
          p(o, {
            modelValue: l.county,
            "onUpdate:modelValue": t[2] || (t[2] = (m) => l.county = m),
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
const Ks = /* @__PURE__ */ A(Ws, [["render", Hs]]);
function Js() {
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
function Ys() {
  const { dialog: e, form: t, model: s } = this.$props;
  return s || (e || t).form;
}
function Gs() {
  const { hideLabels: e, dialog: t, form: s } = this.$props;
  return (this.items || (t || s).formItems).map((l) => (delete l.visible, e ? {
    ...l,
    label: " ",
    _label: l.label
  } : l)).filter((l) => this.dialog ? this.dialog.isEditing ? l.canEdit !== !1 : l.canAdd !== !1 : !0).map((l) => Object.assign({}, l, l.formAttrs));
}
function Qs() {
  return this.useWhen ? this._items.filter((e) => {
    var t;
    return ht(e.when || ((t = e.formAttrs) == null ? void 0 : t.when), this._model);
  }) : this._items;
}
function Zs() {
  const { dialog: e, form: t, rules: s } = this.$props;
  return s || (e || t).formRules;
}
function en(e) {
  var i;
  let { placeholder: t, comp: s } = e;
  return t || (t = "options" in e || /(date|time)/i.test(s) ? "请选择" : "请输入", t += ((i = e.label) == null ? void 0 : i.trim()) || e._label || e.text || e.model || ""), t;
}
function tn(e) {
  return typeof e == "boolean" ? e.toString() : e;
}
const ae = {
  props: Js,
  computed: {
    _model: Ys,
    _items: Gs,
    _visibleItems: Qs,
    _rules: Zs
  },
  methods: {
    calcPlaceholder: en,
    formatModelValue: tn
  }
}, sn = {
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
function nn(e, t, s, i, l, n) {
  const o = u("mobile-x-form-item"), a = u("el-col"), r = u("el-row"), m = u("van-form");
  return d(), f(m, {
    ref: "formRef",
    class: Y(["mobile-x-form", { "hide-labels": s.hideLabels }])
  }, {
    default: c(() => [
      e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : k("", !0),
      p(r, {
        gutter: e.$attrs.gutter,
        justify: e.$attrs.justify,
        align: e.$attrs.align,
        tag: e.$attrs.tag
      }, {
        default: c(() => [
          (d(!0), w(P, null, B(e._visibleItems, (h, v) => (d(), f(a, {
            key: v,
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
              p(o, _({
                "label-width": s.labelWidth,
                "label-position": e.$attrs["label-position"] || "left"
              }, h, {
                rules: e._rules[h.prop] || h.rules,
                modelValue: e.formatModelValue(e._model[h.prop]),
                "onUpdate:modelValue": (b) => e._model[h.prop] = b,
                placeholder: e.calcPlaceholder(h)
              }), {
                default: c(() => [
                  h.slot ? x(e.$slots, h.slot, Re(_({ key: 0 }, h))) : k("", !0)
                ]),
                _: 2
              }, 1040, ["label-width", "label-position", "rules", "modelValue", "onUpdate:modelValue", "placeholder"])
            ]),
            _: 2
          }, 1032, ["span", "offset", "tag", "xs", "sm", "md", "lg", "xl"]))), 128))
        ]),
        _: 3
      }, 8, ["gutter", "justify", "align", "tag"]),
      e.$slots.default ? x(e.$slots, "default", { key: 1 }) : k("", !0)
    ]),
    _: 3
  }, 8, ["class"]);
}
const ln = /* @__PURE__ */ A(sn, [["render", nn]]), an = {
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
}, on = { key: 1 };
function rn(e, t, s, i, l, n) {
  const o = u("pc-x-form-item"), a = u("el-col"), r = u("el-row"), m = u("el-form"), h = u("el-collapse-item"), v = u("el-collapse");
  return d(), f(v, {
    modelValue: l.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (b) => l.activeNames = b),
    class: Y((s.useCollapse ? "use" : "no") + "-collapse")
  }, {
    default: c(() => [
      p(h, {
        name: l.activeNames[0]
      }, {
        title: c(() => [
          e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", on, $(s.title), 1))
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
              e.$slots.pre ? x(e.$slots, "pre", { key: 0 }) : k("", !0),
              p(r, {
                gutter: e.$attrs.gutter,
                justify: e.$attrs.justify,
                align: e.$attrs.align,
                tag: e.$attrs.tag
              }, {
                default: c(() => [
                  (d(!0), w(P, null, B(e._visibleItems, (b, y) => (d(), f(a, {
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
                        "onUpdate:modelValue": [(T) => e._model[b.prop] = T, (T) => b.onChange || null],
                        prop: b.prop || b.model,
                        clearable: b.clearable !== !1,
                        placeholder: e.calcPlaceholder(b)
                      }), {
                        default: c(() => [
                          b.slot ? x(e.$slots, b.slot, {
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
              e.$slots.default ? x(e.$slots, "default", { key: 1 }) : k("", !0)
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
const dn = /* @__PURE__ */ A(an, [["render", rn]]);
function cn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !lt(e);
}
const Ee = (e) => {
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
  const m = {
    ...i,
    "onUpdate:modelValue": (v) => l("update:modelValue", v)
  }, h = [];
  return o === "html" ? m.class = "comp-html" : n = u(n), a && (m.innerHTML = a), r && h.push(r), se(n, m, {
    default: () => h
  });
}, un = (e) => {
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
  let m;
  i.directives && typeof i.directives == "object" && (m = Object.entries(i.directives).map(([v, b]) => [Z(v), b]));
  let h;
  if (o && !s.label)
    h = n.default();
  else {
    let v = null;
    if (o)
      v = n.default();
    else if (a) {
      let b;
      v = p(u("el-tooltip"), {
        effect: "dark",
        content: r,
        placement: "bottom"
      }, cn(b = Ee(e)) ? b : {
        default: () => [b]
      });
    } else
      v = Ee(e);
    h = se(u("el-form-item"), {
      ...t,
      ...s
    }, {
      default: () => [v],
      label: () => se("span", {
        title: s.label,
        class: "overflow-text",
        style: {
          width: t.required ? parseInt(t.labelWidth) - 13 + "px" : t.labelWidth,
          display: "inline-block"
        }
      }, [s.label])
    });
  }
  return m ? R(h, m) : h;
}, hn = (e) => {
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
    modelValue: m
  } = t;
  let h;
  i.directives && typeof i.directives == "object" && (h = Object.entries(i.directives).map(([b, y]) => [Z(b), y]));
  let v;
  if (a && !s.label)
    v = n.default({
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
    a && s.label || r ? v = se(u("van-field"), b, {
      input: () => a && s.label ? n.default() : Ee(e)
    }) : v = se(u("van-field"), Object.assign(b, i));
  }
  return h ? R(v, h) : v;
}, mn = {
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
    return hn(this);
  }
}, Me = {
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
        required: m,
        format: h,
        style: v,
        html: b,
        class: y,
        ...T
      } = { ...this.$props, ...this.$attrs };
      return T;
    },
    width() {
      return this.$attrs.label ? this.labelWidth : "0px";
    }
  },
  render() {
    return un(this);
  }
}, Ye = () => {
  Te((e) => ({
    ba9709f0: e.width
  }));
}, Ge = Me.setup;
Me.setup = Ge ? (e, t) => (Ye(), Ge(e, t)) : Ye;
const pn = /* @__PURE__ */ A(Me, [["__scopeId", "data-v-d2cde1e2"]]), Qe = /* @__PURE__ */ Object.assign({}), fn = {
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
        const s = t.split("/").pop().split(".")[0], i = await Qe[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, gn = ["src"];
function bn(e, t, s, i, l, n) {
  const o = u("van-icon");
  return s.name.includes(":") ? (d(), w("span", {
    key: 0,
    class: Y(n.iconClass)
  }, null, 2)) : l.icons[s.name] ? (d(), w("img", {
    key: 1,
    src: l.icons[s.name],
    alt: "icon"
  }, null, 8, gn)) : (d(), f(o, _({ key: 2 }, e.$attrs, { name: s.name }), null, 16, ["name"]));
}
const _n = /* @__PURE__ */ A(fn, [["render", bn]]), Ze = /* @__PURE__ */ Object.assign({}), yn = {
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
        const s = t.split("/").pop().split(".")[0], i = await Ze[t]();
        e[s] = i.default;
      })), this.icons = e;
    }
  }
}, wn = ["src"];
function vn(e, t, s, i, l, n) {
  const o = u("el-icon");
  return s.name.includes(":") ? (d(), w("span", {
    key: 0,
    class: Y(n.iconClass)
  }, null, 2)) : l.icons[s.name] ? (d(), w("img", {
    key: 1,
    src: l.icons[s.name],
    alt: "icon"
  }, null, 8, wn)) : (d(), f(o, Re(_({ key: 2 }, e.$attrs)), {
    default: c(() => [
      (d(), f(te(s.name)))
    ]),
    _: 1
  }, 16));
}
const Sn = /* @__PURE__ */ A(yn, [["render", vn]]), { highdict: bt } = StardustJs, { storage: kn } = StardustBrowser, { local: _t } = kn, Le = ["index", "selection", "expand", "radio", "_index"];
function $n() {
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
function Cn() {
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
function xn() {
  const t = (this.$.attrs.platform || (window.isMobile ? "mobile" : "pc")) + "TableAttrs", s = {};
  return t in this && Object.assign(s, this[t]), Object.assign(s, this.$attrs), s;
}
function Vn() {
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
function En() {
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
function An() {
  const { table: e, loading: t } = this.$props;
  return t || (e == null ? void 0 : e.loading);
}
function On() {
  const { table: e, data: t } = this.$props;
  return t || (e == null ? void 0 : e.list) || [];
}
function jn() {
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
function Fn() {
  const { table: e, query: t } = this.$props;
  return t || (e == null ? void 0 : e.query);
}
function Tn() {
  const { table: e, total: t } = this.$props;
  return t || (e == null ? void 0 : e.total);
}
function Dn() {
  const { table: e, finished: t } = this.$props;
  return t ?? (e == null ? void 0 : e.finished);
}
function In() {
  const { table: e, selection: t } = this.$props;
  return t || (e == null ? void 0 : e.selection);
}
function Rn() {
  const { table: e, chartHeight: t } = this.$props;
  return t || (e == null ? void 0 : e.chartHeight) || "360px";
}
function Pn() {
  const { table: e, chartOption: t } = this.$props;
  return t || (e == null ? void 0 : e.chartOption) || [];
}
function Bn() {
  return this.onKeywordsSearch || this._listen["keywords-search"] ? (...e) => this._emit("keywords-search", ...e) : null;
}
function Mn() {
  return this.hideSearcher ? this.onSearch || this._listen.search ? () => this._emit("search") : null : this.onSearch || this._listen.search ? (e) => {
    e ? this._emit("search") : this.$refs.searcher.open();
  } : null;
}
function Ln() {
  return this.onAdd || this._listen.add ? () => this._emit("add") : null;
}
function Nn() {
  return this.onExport || this._listen.export ? () => this._emit("export") : null;
}
function Un() {
  return this.onSearchExport || this._listen["search-export"] ? () => this._emit("search-export") : null;
}
function qn() {
  return this.onImport || this._listen.import ? () => this._emit("import") : null;
}
function zn() {
  return this.onMultiDelete || this._listen["multi-delete"] ? () => this._emit("multi-delete") : null;
}
function Xn() {
  return this.onLoad || this._listen.load ? () => this._emit("load") : () => {
  };
}
function Wn() {
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
  return e.forEach((i) => {
    const l = "handle" + i.split("-").map((n) => n[0].toUpperCase() + n.slice(1)).join("");
    t[i] = this.controller[l];
  }), t;
}
function Hn() {
  const e = this._columns.filter((s) => s.type && Le.includes(s.type) || s.fixed === "left"), t = this.settings.columns.filter((s) => !s.hide && s.fixed !== "left").map((s) => {
    const i = this._columns.find((l) => l.prop === s.prop);
    return {
      sortable: "custom",
      ...i,
      width: s.width || i.width
    };
  });
  return e.concat(t);
}
function Kn() {
  const { table: e, uid: t } = this.$props;
  return t || (e == null ? void 0 : e.uid) || "";
}
function Jn() {
  const { plain: e } = this._attrs;
  return e || e === "";
}
function Yn() {
  const { "hide-header": e } = this._attrs;
  return e || e === "";
}
function Gn() {
  const { "hide-tools": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Qn() {
  const { "hide-searcher": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function Zn() {
  const { "hide-chart": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function ei() {
  const { "hide-settings": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function ti() {
  const { "hide-operates": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function si() {
  const { "hide-pagination": e } = this._attrs;
  return this.plain ? e !== !1 : e || e === "";
}
function ni() {
  return this._attrs["operates-width"] ?? 150;
}
function ii() {
  return this._attrs["operates-dropdown"];
}
function li() {
  return this._columns.filter((e) => !e.virtual && (!e.type || !Le.includes(e.type)));
}
function ai() {
  return this.table.searcherConfig ?? this._attrs["searcher-config"] ?? {};
}
function oi() {
  const e = this._uid && _t.getJson(`Settings[${this._uid}]`, {}) || {};
  e.columns || (e.columns = this._columns.filter((t) => t.label && t.prop && !(t.type && Le.includes(t.type))).map((t) => {
    const { prop: s, label: i, show: l, hide: n, width: o, virtual: a, fixed: r } = t;
    return { prop: s, label: i, show: l, hide: n, width: o, virtual: a, fixed: r };
  })), this.settings = e;
}
function ri(e) {
  _t.setJson(`Settings[${this._uid}]`, e);
}
function di(e, t) {
  const { prop: s } = t, i = e[s];
  let { format: l, formatter: n } = t.tableAttrs || t;
  if (n)
    return n(i, e);
  if (l = Array.isArray(t.options) ? l !== !1 : l, l) {
    const o = `_formatted_${s}`;
    if (o in e)
      return e[o];
  }
  return i === void 0 ? s.includes(".") || s.includes("[") ? bt.get(e, s, this.defaultValue) : this.defaultValue : i === "" ? this.defaultValue : i;
}
function ci(e, t) {
  return t.link ? t.link(e) : bt.get(e, t.linkProp || t.prop);
}
function ui(e) {
  if (["index", "selection", "expand"].includes(e.type))
    return !1;
  const { showOverflowTooltip: t } = e.tableAttrs || e;
  return t !== !1;
}
function hi(e) {
  this.params = e, this._emit("search", e);
}
function mi(e) {
  this.saveSettings(e), this.initSettings();
}
function pi(e, t, s, i) {
  const l = this.settings.columns.find((n) => n.prop === s.property);
  l && (l.width = e, this.saveSettings(this.settings)), this.onHeaderDragend && this.onHeaderDragend(e, t, s, i);
}
function fi(e) {
  this._selection && (this._selection.splice(0), this._selection.push(...e)), this.onSelectionChange && this.onSelectionChange(e);
}
function gi(e) {
  var t, s, i, l;
  this.onSortChange ? this.onSortChange(e) : Array.isArray(e) ? (s = (t = this.controller) == null ? void 0 : t.handleSortChange) == null || s.call(t, e) : e.column.sortable === "custom" && ((l = (i = this.controller) == null ? void 0 : i.handleSortChange) == null || l.call(i, e));
}
function bi(e) {
  this.checked = e.target.value * 1;
  const t = this._data[this.checked];
  this.table && (this.table.checked = t), this.onCheckedChange && this.onCheckedChange(t);
}
function _i(e) {
  e.length && (this.isMinus = !1, this.useCollapse || (this._useCollapse = !1));
}
function yi() {
  this.isMinus = !this.isMinus, this.isMinus ? (this._useCollapse = !0, this.activeNames = []) : (this._useCollapse = this.useCollapse, this.activeNames = ["name"]);
}
function wi() {
  this.isFullscreen = !this.isFullscreen, this.isFullscreen ? (this.zoom = document.documentElement.style.zoom, document.documentElement.style.zoom = 1) : document.documentElement.style.zoom = this.zoom;
}
function vi(e) {
  var i;
  let t = this._attrs["cell-class-name"] ? this._attrs["cell-class-name"](e) : "";
  const s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.class) {
    const l = s.tableAttrs.class;
    typeof l == "function" ? t += " " + l(e) : typeof l == "string" && (t += " " + l);
  }
  return t ? [...new Set(t.split(" "))].join(" ") : "";
}
function Si(e) {
  var i;
  const t = this._attrs["cell-style"] ? this._attrs["cell-style"](e) : {}, s = this._visibleColumns[e.columnIndex];
  if ((i = s == null ? void 0 : s.tableAttrs) != null && i.style) {
    const l = s.tableAttrs.style;
    typeof l == "function" ? Object.assign(t, l(e)) : typeof l == "object" && Object.assign(t, l);
  }
  return Object.keys(t) ? t : null;
}
function ki(e, t) {
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
function $i(e, t) {
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
function Ci(e) {
  return !!(this.onEdit || this._listen.edit) && e.editable !== !1 && !e.isEditing;
}
function xi(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Vi(e) {
  return !!(this.onRowEdit || this._listen["row-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Ei(e) {
  return !!(this.onCancelEdit || this._listen["cancel-edit"]) && this.table.isRowEdit && e.isEditing;
}
function Ai(e) {
  return !!(this.onDelete || this._listen.delete) && e.deletable !== !1;
}
function Oi(e, t) {
  const s = e.row[t.prop];
  return Array.isArray(s) ? s[0] : s;
}
function ji(e, t) {
  var i;
  const s = e.row[t.prop];
  return Array.isArray(s) ? s : ((i = t.previewSrcList) == null ? void 0 : i.call(t)) || [s];
}
function Fi(e, t) {
  const s = "on" + e.split("-").map((i) => i[0].toUpperCase() + i.slice(1)).join("");
  this[s] ? this[s](t) : this._listen[e] ? this._listen[e](t) : this.$emit(e, t);
}
function Ti() {
  this.zoom !== 1 && (document.documentElement.style.zoom = this.zoom);
}
const W = {
  props: $n,
  emits: Cn,
  computed: {
    _attrs: xn,
    domids: Vn,
    elTableAttrs: En,
    _loading: An,
    _data: On,
    _columns: jn,
    _query: Fn,
    _total: Tn,
    _finished: Dn,
    _selection: In,
    _chartHeight: Rn,
    _chartOption: Pn,
    _onKeywordsSearch: Bn,
    _onSearch: Mn,
    _onAdd: Ln,
    _onExport: Nn,
    _onSearchExport: Un,
    _onImport: qn,
    _onMultiDelete: zn,
    _onLoad: Xn,
    _listen: Wn,
    _visibleColumns: Hn,
    _uid: Kn,
    plain: Jn,
    hideHeader: Yn,
    hideTools: Gn,
    hideSearcher: Qn,
    hideChart: Zn,
    hideSettings: ei,
    hideOperates: ti,
    hidePagination: si,
    operatesWidth: ni,
    operatesDropdown: ii,
    searcherColumns: li,
    searcherConfig: ai
  },
  watch: {
    $route: Ti
  },
  methods: {
    initSettings: oi,
    saveSettings: ri,
    calcValue: di,
    calcLink: ci,
    calcOverflowTooltip: ui,
    handleSearch: hi,
    handleResetSettings: mi,
    handleHeaderDragend: pi,
    handleSelectionChange: fi,
    handleSortChange: gi,
    handleCheckedChange: bi,
    handleCollapseChange: _i,
    handleMinus: yi,
    handleToggleFullscreen: wi,
    cellClassName: vi,
    cellStyle: Si,
    calcTagType: ki,
    calcTagValue: $i,
    canEdit: Ci,
    canSave: xi,
    canRowEdit: Vi,
    canCancelEdit: Ei,
    canDelete: Ai,
    _imageSrc: Oi,
    _imagePreviewSrcList: ji,
    _emit: Fi
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
        const { infoAttrs: s = {}, ...i } = t, l = { span: this.span, ...i, ...s }, n = l.block || "基本信息";
        let o = e[n];
        o || (e[n] = o = [], o.span = 0), o.span + l.span > 24 && o.length ? o[o.length - 1].span += 24 - o.span : o.span += l.span, o.push(l);
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
}, et = () => {
  Te((e) => ({
    "5cf44854": e.labelWidth,
    "323265ec": e._labelAlign,
    "0e4e598f": e._valueAlign
  }));
}, tt = Ne.setup;
Ne.setup = tt ? (e, t) => (et(), tt(e, t)) : et;
const Di = { class: "x-info__label" }, Ii = { key: 1 }, Ri = { class: "x-info__value" }, Pi = { key: 2 };
function Bi(e, t, s, i, l, n) {
  const o = u("router-link"), a = u("el-col"), r = u("el-row"), m = u("el-collapse-item"), h = u("el-collapse");
  return d(), f(h, {
    modelValue: l.activeNames,
    "onUpdate:modelValue": t[0] || (t[0] = (v) => l.activeNames = v),
    class: Y(["x-info", { "hide-header": n.hideHeader }])
  }, {
    default: c(() => [
      (d(!0), w(P, null, B(n.blocks, (v, b) => (d(), f(m, {
        key: b,
        title: b,
        name: b
      }, {
        default: c(() => [
          p(r, {
            gutter: e.$attrs.gutter || 10
          }, {
            default: c(() => [
              (d(!0), w(P, null, B(v, (y) => (d(), f(a, _({
                key: y.prop,
                span: s.span
              }, y), {
                default: c(() => [
                  j("div", Di, [
                    e.$slots.label ? x(e.$slots, "label", {
                      key: 0,
                      label: y.label
                    }, void 0, !0) : (d(), w("span", Ii, $(y.label ? s.showColon ? y.label + "：" : y.label : ""), 1))
                  ]),
                  j("div", Ri, [
                    y.slot === "$link" ? (d(), f(o, {
                      key: 0,
                      to: y.to(s.data)
                    }, {
                      default: c(() => [
                        C($(n.calcLink(s.data, y)), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])) : y.slot ? x(e.$slots, y.slot, Re(_({ key: 1 }, { data: s.data, field: y, value: n.calcValue(s.data, y) })), void 0, !0) : (d(), w("span", Pi, $(n.calcValue(s.data, y)), 1))
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
const Mi = /* @__PURE__ */ A(Ne, [["render", Bi], ["__scopeId", "data-v-d4d685d3"]]), Li = {
  name: "XLooper",
  props: {
    compName: String,
    items: Array
  }
}, Ni = { key: 1 };
function Ui(e, t, s, i, l, n) {
  return d(), w("div", null, [
    (d(!0), w(P, null, B(s.items, (o, a) => (d(), f(te(s.compName), _({ key: a }, o), {
      default: c(() => [
        o.slot || e.$attrs.slot ? x(e.$slots, "default", {
          key: 0,
          item: o
        }) : (d(), w("span", Ni, $(o.text), 1))
      ]),
      _: 2
    }, 1040))), 128))
  ]);
}
const qi = /* @__PURE__ */ A(Li, [["render", Ui]]), zi = {
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
function Xi(e, t, s, i, l, n) {
  const o = u("van-col"), a = u("van-icon"), r = u("van-pagination"), m = u("van-row");
  return d(), f(m, {
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
            "onUpdate:modelValue": t[0] || (t[0] = (h) => s.query.page = h),
            "page-count": n.pageCount
          }), {
            "prev-text": c(() => [
              p(a, { name: "arrow-left" }),
              C(" 上一页 ")
            ]),
            "next-text": c(() => [
              C(" 下一页 "),
              p(a, { name: "arrow" })
            ]),
            page: c(({ text: h }) => [
              C($(h), 1)
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
const Wi = /* @__PURE__ */ A(zi, [["render", Xi]]), Hi = {
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
function Ki(e, t, s, i, l, n) {
  const o = u("el-pagination");
  return d(), f(o, _({
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
const Ji = /* @__PURE__ */ A(Hi, [["render", Ki]]), Yi = {
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
function Gi(e, t, s, i, l, n) {
  const o = u("van-picker"), a = u("van-popup");
  return d(), w(P, null, [
    j("span", {
      onClick: t[0] || (t[0] = (r) => e.$emit("show")),
      class: Y(`x-picker__${s.modelValue ? "value" : "placeholder"}`)
    }, $(n.text), 3),
    p(a, _({
      class: "x-picker",
      round: "",
      position: "bottom"
    }, e.$attrs, {
      show: n.visible,
      "onUpdate:show": t[2] || (t[2] = (r) => n.visible = r)
    }), {
      default: c(() => [
        p(o, _(e.$attrs, {
          modelValue: n.value,
          title: e.$attrs.title,
          columns: s.columns,
          onCancel: t[1] || (t[1] = (r) => e.$emit("cancel")),
          onConfirm: n.onConfirm
        }), null, 16, ["modelValue", "title", "columns", "onConfirm"])
      ]),
      _: 1
    }, 16, ["show"])
  ], 64);
}
const Qi = /* @__PURE__ */ A(Yi, [["render", Gi]]), Zi = {
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
        this._options = H(this.options, this);
      }
    }
  }
};
function el(e, t, s, i, l, n) {
  const o = u("van-radio"), a = u("van-radio-group");
  return d(), f(a, _({
    class: ["mobile-x-radios", s.plain ? "mobile-x-radios--plain" : ""]
  }, e.$attrs, { direction: s.direction }), {
    default: c(() => [
      (d(!0), w(P, null, B(l._options, (r) => {
        var m;
        return d(), f(o, _(e.$attrs, {
          disabled: (m = r.raw) == null ? void 0 : m.disabled,
          key: r.text,
          name: r.value
        }), {
          default: c(() => [
            C($(r.text), 1)
          ]),
          _: 2
        }, 1040, ["disabled", "name"]);
      }), 128))
    ]),
    _: 1
  }, 16, ["class", "direction"]);
}
const tl = /* @__PURE__ */ A(Zi, [["render", el]]), sl = {
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
        this._options = H(this.options, this);
      }
    }
  }
}, nl = { key: 1 };
function il(e, t, s, i, l, n) {
  const o = u("el-radio-group");
  return d(), f(o, _({
    class: ["pc-x-radios", s.plain ? "pc-x-radios--plain" : ""]
  }, n.attrs, {
    modelValue: s.modelValue,
    "onUpdate:modelValue": t[0] || (t[0] = (a) => e.$emit("update:modelValue", a)),
    onChange: t[1] || (t[1] = (a) => e.$emit("change", a))
  }), {
    default: c(() => [
      (d(!0), w(P, null, B(l._options, (a) => {
        var r;
        return d(), f(te(s.button ? "el-radio-button" : "el-radio"), _(n.attrs, {
          disabled: (r = a.raw) == null ? void 0 : r.disabled,
          key: a.text,
          value: a.value
        }), {
          default: c(() => [
            e.$slots.custom ? x(e.$slots, "custom", {
              key: 0,
              option: a,
              raw: a.raw
            }, void 0, !0) : (d(), w("span", nl, $(a.text), 1))
          ]),
          _: 2
        }, 1040, ["disabled", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "modelValue"]);
}
const ll = /* @__PURE__ */ A(sl, [["render", il], ["__scopeId", "data-v-1c8cf979"]]), al = {
  name: "MobileXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ol = { key: 1 };
function rl(e, t, s, i, l, n) {
  const o = u("mobile-x-col"), a = u("van-row");
  return d(), f(a, { class: "mobile-x-row" }, {
    default: c(() => [
      (d(!0), w(P, null, B(s.cols, (r, m) => (d(), f(o, _(r, {
        span: r.xs ?? r.span,
        key: m
      }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", ol, $(r.text), 1))
        ]),
        _: 2
      }, 1040, ["span"]))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const dl = /* @__PURE__ */ A(al, [["render", rl]]), cl = {
  name: "PcXRow",
  props: {
    cols: {
      type: Array,
      default: []
    }
  }
}, ul = { key: 1 };
function hl(e, t, s, i, l, n) {
  const o = u("pc-x-col"), a = u("el-row");
  return d(), f(a, { class: "pc-x-row" }, {
    default: c(() => [
      (d(!0), w(P, null, B(s.cols, (r, m) => (d(), f(o, _(r, { key: m }), {
        default: c(() => [
          r.slot || e.$attrs.slot ? x(e.$slots, r.slot || e.$attrs.slot, {
            key: 0,
            col: r
          }) : (d(), w("span", ul, $(r.text), 1))
        ]),
        _: 2
      }, 1040))), 128)),
      s.cols.length === 0 ? x(e.$slots, "default", { key: 0 }) : k("", !0)
    ]),
    _: 3
  });
}
const ml = /* @__PURE__ */ A(cl, [["render", hl]]), pl = {
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
function fl(e, t, s, i, l, n) {
  const o = u("van-icon"), a = u("van-field");
  return d(), f(a, _({ placeholder: "点此扫码" }, e.$attrs, {
    label: s._label,
    modelValue: s.modelValue,
    readonly: s.readonly,
    style: { padding: "0" },
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: n.handleClick
  }), {
    "right-icon": c(() => [
      p(o, {
        name: "scan",
        onClick: n.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["label", "modelValue", "readonly", "onClick"]);
}
const gl = /* @__PURE__ */ A(pl, [["render", fl]]), bl = {
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
function _l(e, t, s, i, l, n) {
  const o = u("el-button"), a = u("el-input");
  return d(), f(a, _(e.$attrs, {
    modelValue: s.modelValue,
    readonly: s.readonly,
    "onUpdate:modelValue": t[0] || (t[0] = (r) => e.$emit("update:modelValue", r)),
    onClick: n.handleClick
  }), {
    append: c(() => [
      p(o, {
        icon: "CameraFilled",
        onClick: n.handleScan
      }, null, 8, ["onClick"])
    ]),
    _: 1
  }, 16, ["modelValue", "readonly", "onClick"]);
}
const yl = /* @__PURE__ */ A(bl, [["render", _l]]), Ue = async (e, t, s) => {
  if (s.loading)
    return;
  s.loading = !0;
  const i = t == null ? void 0 : t.trim(), { text: l = "text", value: n = "value", labelTexts: o, params: a = {} } = s;
  a.attributes = [...new Set(a.attributes || [...o || [], l, n])], a.page || (a.page = 1), a.limit || (a.limit = 100), i && (a.where = a.where || {}, a.where[l] = a.where[l] || {}, a.where[l]["[Op.like]"] = `%${i}%`);
  const r = await e.search(s.modelName, a);
  s.options.splice(0, s.options.length, ...r.data), s.loading = !1;
}, Ae = (e, t) => !e || typeof e != "object" ? e : !t.labelTexts || !t.labelTexts.length ? e[t.text] : t.labelTexts.map((i) => e[i])[0], Oe = (e, t) => !e || typeof e != "object" || !t.labelTexts || t.labelTexts.length < 2 ? "" : "(" + t.labelTexts.map((i) => e[i]).slice(1).join(" - ") + ")", wl = {
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
        this._options = H(this.options, this);
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: H,
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
function vl(e, t, s, i, l, n) {
  const o = u("x-picker");
  return d(), w("div", {
    onClick: t[2] || (t[2] = (...a) => n.onClick && n.onClick(...a)),
    class: "mobile-x-select"
  }, [
    p(o, _(e.$attrs, {
      modelValue: l._value,
      "onUpdate:modelValue": n.onChange,
      show: l.visible,
      columns: l._options,
      onClick: t[0] || (t[0] = Q(() => {
      }, ["stop"])),
      onShow: n.onShow,
      onCancel: t[1] || (t[1] = (a) => l.visible = !1),
      onConfirm: n.onConfirm,
      onChange: n.onChange
    }), null, 16, ["modelValue", "onUpdate:modelValue", "show", "columns", "onShow", "onConfirm", "onChange"])
  ]);
}
const Sl = /* @__PURE__ */ A(wl, [["render", vl]]), kl = {
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
        const e = H(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = Ae(this.options[s], this), t._remark_ = Oe(this.options[s], this);
        }), this._options = ie(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: H,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = ie(this._options);
      const t = !this.$slots.custom && this.labelTexts;
      this.list = ie(this._options.filter((s) => {
        let i = s.text;
        return t && (i += s._main_ + s._remark_), i.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ue(this.service.restful, e, this);
    },
    calcMainLabel(e) {
      return Ae(e, this);
    },
    calcRemarkLabel(e) {
      return Oe(e, this);
    }
  }
}, $l = { key: 1 }, Cl = { class: "main" }, xl = { class: "remark" };
function Vl(e, t, s, i, l, n) {
  const o = u("el-option"), a = u("el-select");
  return d(), f(a, _({
    class: ["pc-x-select", s.plain ? "x-select--plain" : ""],
    loading: l.loading
  }, e.$attrs, {
    filterable: s.filterable,
    remote: s.remote,
    clearable: "",
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || n.filter,
    onKeyup: Pe(n.handleRemote, ["enter"])
  }), {
    default: c(() => [
      (d(!0), w(P, null, B(l.list, (r, m) => {
        var h;
        return d(), f(o, _(e.$attrs, {
          disabled: (h = r.raw) == null ? void 0 : h.disabled,
          key: r.value,
          label: r.text,
          value: r.value
        }), {
          default: c(() => [
            e.$slots.custom ? x(e.$slots, "custom", {
              key: 0,
              option: r,
              raw: r.raw
            }, void 0, !0) : (d(), w("span", $l, [
              j("span", Cl, $(r._main_), 1),
              j("span", xl, $(r._remark_), 1)
            ]))
          ]),
          _: 2
        }, 1040, ["disabled", "label", "value"]);
      }), 128))
    ]),
    _: 3
  }, 16, ["class", "loading", "filterable", "remote", "filter-method", "onKeyup"]);
}
const El = /* @__PURE__ */ A(kl, [["render", Vl], ["__scopeId", "data-v-20ab71e6"]]), Al = {
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
        const e = H(this.options, this);
        this.$slots.custom || e.forEach((t, s) => {
          t._main_ = Ae(this.options[s], this), t._remark_ = Oe(this.options[s], this);
        }), this._options = ie(e), this.list = this._options;
      }
    }
  },
  created() {
    this.modelName && this.remoteSearch();
  },
  methods: {
    formatOptions: H,
    handleRemote(e) {
      const t = e.target.value.trim();
      t !== this._last_keywords_ && (this._last_keywords_ = t, this.$attrs.remoteMethod ? this.$attrs.remoteMethod(t) : this.remoteSearch && this.remoteSearch(t));
    },
    filter(e) {
      if (e = e.trim(), !e)
        return this.list = ie(this._options);
      const t = !!this.$slots.custom;
      this.list = ie(this._options.filter((s) => {
        let i = s.text;
        return t || (i += s._main_ + s._remark_), i.includes(e);
      }));
    },
    remoteSearch(e) {
      if (!this.remote && !this.modelName)
        return this._options;
      Ue(this.service.restful, e, this);
    }
  }
}, Ol = { key: 1 }, jl = { class: "main" }, Fl = { class: "remark" };
function Tl(e, t, s, i, l, n) {
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
    "filter-method": s.remote ? void 0 : e.$attrs.filterMethod || n.filter,
    onKeyup: Pe(n.handleRemote, ["enter"])
  }), {
    default: c(({ item: a, index: r }) => [
      e.$slots.custom ? x(e.$slots, "custom", {
        key: 0,
        option: a,
        raw: a.raw
      }, void 0, !0) : (d(), w("span", Ol, [
        j("span", jl, $(a._main_), 1),
        j("span", Fl, $(a._remark_), 1)
      ]))
    ]),
    _: 3
  }, 16, ["class", "loading", "options", "filterable", "remote", "filter-method", "onKeyup"]);
}
const Dl = /* @__PURE__ */ A(Al, [["render", Tl], ["__scopeId", "data-v-70bc3765"]]), st = {
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
}, Il = [{
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
}], U = {
  XSelect: ["eq", "ne", "in", "notIn", "special"],
  XRadios: ["eq", "ne", "special"],
  XCheckboxs: ["eq", "ne", "in", "notIn", "special"],
  ElDatePicker: ["eq", "gt", "gte", "lt", "lte", "between", "special"],
  ElInputNumber: ["eq", "ne", "gt", "gte", "lt", "lte", "between", "special"],
  ElInput: ["eq", "ne", "like", "notLike", "between", "special"],
  universal: ["eq", "ne", "gt", "gte", "lt", "lte", "in", "like", "notIn", "notLike", "between", "special"]
};
U["x-select"] = U.XSelect;
U.XSelectV2 = U.XSelect;
U["x-select-v2"] = U.XSelect;
U["x-radios"] = U.XRadios;
U["x-checkboxs"] = U.XCheckboxs;
U["el-date-picker"] = U.ElDatePicker;
U["el-input-number"] = U.ElInputNumber;
U["el-input"] = U.ElInput;
function Rl() {
  const e = window.isMobile ? "small" : "", {
    $attrs: t,
    config: s,
    columns: i,
    visible: l,
    conditions: n,
    expression: o,
    handleSearch: a,
    handleReset: r,
    handleAdd: m,
    handleDelete: h,
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
      onClick: m
    }, {
      default: () => [C("新增条件")]
    }), p("div", {
      class: "conditions"
    }, [n.map((y, T) => p("div", {
      class: "condition flex-center",
      key: y.no
    }, [s.traditional ? null : p(u("el-button"), {
      type: "danger",
      size: e,
      plain: !0,
      onClick: () => h(T)
    }, {
      default: () => [C("X")]
    }), s.traditional ? null : p("span", {
      class: "title"
    }, [y.no]), p("div", {
      class: "expression"
    }, [s.traditional ? p(u("el-input"), {
      modelValue: y.item.label,
      readonly: !0
    }, null) : p(u("pc-x-select"), {
      modelValue: y.prop,
      onChange: (V) => v(y, V),
      options: i,
      text: "label",
      value: "prop"
    }, null), p(u("pc-x-select"), {
      modelValue: y.op,
      onChange: (V) => b(y, V),
      options: y.ops
    }, null), p("div", {
      class: "value-container"
    }, [Pl(this, y)])])]))]), s.traditional ? null : p(u("el-input"), _({
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
function Pl(e, t) {
  const s = (l) => se(u((l == null ? void 0 : l.component) || t.component), Object.assign({}, t.config, {
    modelValue: t.value,
    "onUpdate:modelValue": (n) => t.value = n,
    onKeyup: (n) => {
      n.key === "Enter" && e.handleSearch();
    }
  }, l)), i = {
    multiple: !1,
    "collapse-tags": !0
  };
  return t.op === "between" ? p("div", {
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
    options: Il
  }) : s();
}
const { storage: ke } = StardustBrowser, { deepCopy: Bl } = StardustJs.funcs, Ml = {
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
  render: Rl,
  methods: {
    init() {
      const e = this.uid && ke.local.getJson(this.key, this.config) || this.config;
      this.initConfig(Bl(e));
    },
    open() {
      this.visible = !0;
    },
    close() {
      this.visible = !1;
    },
    saveCache() {
      ke.local.setJson(this.key, {
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
        const { prop: l, op: n, value: o, universal: a } = i;
        i.item = this.columns.find((r) => r.prop === l), this.handleSelectField(i, l), this.handleSelectOp(i, n), i.value = o, i.ops = U[a ? "universal" : i.component].map((r) => st[r]);
      }), !e.conditionNo && ((s = e.conditions) != null && s.length) && (e.conditionNo = Math.max.apply(null, e.conditions.map((i) => i.no)) + 1), Object.assign(this, e);
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
      ke.local.remove(this.key), Object.assign(this, {
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
            const r = this.conditions.find((m) => m.no === a * 1);
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
      e.value = "", e.prop = t, e.item = this.columns.find((O) => O.prop === e.prop);
      const { options: s, type: i, formAttrs: l = {} } = e.item, n = { ...e.item, ...l }, {
        comp: o,
        universal: a,
        visible: r,
        canAdd: m,
        canEdit: h,
        required: v,
        slot: b,
        span: y,
        tableAttrs: T,
        formAttrs: V,
        tagTypes: g,
        tagValues: E,
        width: F,
        minWidth: q,
        disabled: K,
        readonly: D,
        ...L
      } = n;
      L.clearable ?? (L.clearable = !0), e.config = L, e.component = o || s && "XSelect" || i === "number" && "ElInputNumber" || "ElInput", e.ops = U[a ? "universal" : e.component].map((O) => st[O]), e.op = e.ops[0].value, e.component === "ElDatePicker" && (e.component = "ElInput", L.type = "date"), L.type === "textarea" && delete L.type;
    },
    handleSelectOp(e, t) {
      e.op = t, t === "between" ? e.value = ["", ""] : ["in", "notIn"].includes(t) && (e.value = []), (t === "special" || !["between", "in", "notIn"].includes(t) && Array.isArray(t)) && (e.value = "");
    }
  }
}, qe = /* @__PURE__ */ A(Ml, [["__scopeId", "data-v-da836e24"]]), Ll = {
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
}, Nl = { class: "mobile-x-table" }, Ul = {
  key: 1,
  class: "card"
}, ql = ["onClick"], zl = { class: "row-header flex-center" }, Xl = ["value", "checked"], Wl = { class: "label" }, Hl = { class: "value" }, Kl = ["value", "checked"], Jl = {
  key: 2,
  class: "index"
}, Yl = { class: "title" };
function Gl(e, t, s, i, l, n) {
  const o = u("searcher"), a = u("x-table-tools"), r = u("van-checkbox"), m = u("x-icon"), h = u("van-cell"), v = u("van-list"), b = u("x-pagination"), y = u("x-info"), T = u("van-popup"), V = u("van-action-sheet");
  return d(), w("div", Nl, [
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
    ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
    (s.mode || e._attrs.mode) === "card" ? (d(), w("div", Ul, [
      (d(!0), w(P, null, B(e._data, (g, E) => (d(), w("div", {
        key: E,
        class: "row",
        onClick: (F) => n.handleClickCard(E)
      }, [
        j("div", zl, [
          n.hasSelection ? (d(), f(r, {
            key: 0,
            modelValue: l.selected[E],
            "onUpdate:modelValue": (F) => l.selected[E] = F,
            shape: "square",
            class: "selection",
            onClick: t[0] || (t[0] = Q(() => {
            }, ["stop"]))
          }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
          p(m, {
            name: "ellipsis",
            class: "more",
            onClick: Q((F) => n.handleShowActionSheet(g, E), ["stop"])
          }, null, 8, ["onClick"])
        ]),
        n.hasRadio ? (d(), w("input", {
          key: 0,
          type: "radio",
          value: E,
          checked: E === l.checked,
          class: "radio",
          onClick: t[1] || (t[1] = Q(() => {
          }, ["stop"])),
          onChange: t[2] || (t[2] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
        }, null, 40, Xl)) : k("", !0),
        (d(!0), w(P, null, B(n.cols, (F, q) => (d(), w("div", {
          key: q,
          class: "field"
        }, [
          j("span", Wl, $(F.label) + ":", 1),
          j("span", Hl, $(e.calcValue(g, F)), 1)
        ]))), 128))
      ], 8, ql))), 128))
    ])) : (s.mode || e._attrs.mode) === "list" ? (d(), f(v, _({
      key: 2,
      class: "list"
    }, e._attrs, {
      onLoad: t[6] || (t[6] = (g) => e.$emit("search"))
    }), {
      default: c(() => [
        (d(!0), w(P, null, B(e._data, (g, E) => (d(), f(h, {
          key: E,
          "is-link": "",
          onClick: (F) => n.handleShowDetail(g, E)
        }, {
          default: c(() => [
            n.hasSelection ? (d(), f(r, {
              key: 0,
              modelValue: l.selected[E],
              "onUpdate:modelValue": (F) => l.selected[E] = F,
              shape: "square",
              class: "selection",
              onClick: t[3] || (t[3] = Q(() => {
              }, ["stop"]))
            }, null, 8, ["modelValue", "onUpdate:modelValue"])) : k("", !0),
            n.hasRadio ? (d(), w("input", {
              key: 1,
              type: "radio",
              value: E,
              checked: E === l.checked,
              class: "radio",
              onClick: t[4] || (t[4] = Q(() => {
              }, ["stop"])),
              onChange: t[5] || (t[5] = (...F) => e.handleCheckedChange && e.handleCheckedChange(...F))
            }, null, 40, Kl)) : k("", !0),
            n.hasIndex ? (d(), w("span", Jl, $(E + 1), 1)) : k("", !0),
            j("span", Yl, $(n.calcTitle(g)), 1)
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
    p(T, {
      show: l.popupVisible,
      "onUpdate:show": t[8] || (t[8] = (g) => l.popupVisible = g),
      position: "bottom",
      style: { height: "70%" }
    }, {
      default: c(() => [
        p(y, {
          data: l.scope.row,
          fields: n.infoFields,
          "value-align": "right"
        }, null, 8, ["data", "fields"])
      ]),
      _: 1
    }, 8, ["show"]),
    p(V, {
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
const Ql = /* @__PURE__ */ A(Ll, [["render", Gl], ["__scopeId", "data-v-84e93229"]]), Zl = {
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
}, ea = (e) => (De("data-v-a9d96f8a"), e = e(), Ie(), e), ta = {
  class: "table",
  ref: "colsTable"
}, sa = ["data-prop"], na = ["title", "onClick"], ia = /* @__PURE__ */ ea(() => /* @__PURE__ */ j("span", { class: "unit" }, "px", -1)), la = {
  class: "table",
  ref: "sortsTable"
}, aa = ["data-prop"];
function oa(e, t, s, i, l, n) {
  const o = u("el-button"), a = u("Sort"), r = u("el-icon"), m = u("ElCheckbox"), h = u("el-input-number"), v = u("el-tab-pane"), b = u("x-select"), y = u("x-radios"), T = u("el-tabs"), V = u("el-popover");
  return s.visible ? (d(), f(V, _({
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
      p(T, {
        modelValue: l.activeName,
        "onUpdate:modelValue": t[0] || (t[0] = (g) => l.activeName = g)
      }, {
        default: c(() => [
          n.hideColumns ? k("", !0) : (d(), f(v, {
            key: 0,
            name: "columns",
            label: "展示列"
          }, {
            default: c(() => [
              p(o, {
                type: "warning",
                plain: "",
                icon: "Close",
                onClick: n.handleResetColumns
              }, {
                default: c(() => [
                  C("重置")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", ta, [
                (d(!0), w(P, null, B(l.columns, (g) => (d(), w("div", {
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
                  p(m, {
                    modelValue: g.show,
                    "onUpdate:modelValue": (E) => g.show = E,
                    onChange: n.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  j("span", {
                    class: "label overflow-text",
                    title: g.label,
                    onClick: (E) => n.handleToggle(g)
                  }, $(g.label), 9, na),
                  p(h, {
                    modelValue: g.width,
                    "onUpdate:modelValue": (E) => g.width = E,
                    onChange: n.update
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"]),
                  ia
                ], 8, sa))), 128))
              ], 512)
            ]),
            _: 1
          })),
          n.hideSorts ? k("", !0) : (d(), f(v, {
            key: 1,
            name: "sorts",
            label: "多列排序"
          }, {
            default: c(() => [
              p(o, {
                type: "primary",
                plain: "",
                icon: "Plus",
                onClick: n.handleAddSort
              }, {
                default: c(() => [
                  C("添加排序")
                ]),
                _: 1
              }, 8, ["onClick"]),
              j("div", la, [
                (d(!0), w(P, null, B(l.sorts, (g, E) => (d(), w("div", {
                  key: g[0],
                  "data-prop": g[0],
                  class: "row flex-center"
                }, [
                  p(b, {
                    modelValue: g[0],
                    "onUpdate:modelValue": (F) => g[0] = F,
                    options: l.sortableColumns,
                    text: "label",
                    value: "prop",
                    teleported: !1,
                    clearable: !1
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(y, {
                    modelValue: g[1],
                    "onUpdate:modelValue": (F) => g[1] = F,
                    options: l.sortOptions
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  p(o, {
                    type: "danger",
                    plain: "",
                    icon: "DeleteFilled",
                    onClick: (F) => l.sorts.splice(E, 1)
                  }, null, 8, ["onClick"])
                ], 8, aa))), 128))
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
const yt = /* @__PURE__ */ A(Zl, [["render", oa], ["__scopeId", "data-v-a9d96f8a"]]), { highdict: ra } = StardustJs, da = {
  name: "PcXTable",
  inheritAttrs: !1,
  props: {
    ...W.props()
  },
  emits: [
    ...W.emits()
  ],
  components: { Searcher: qe, Settings: yt },
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
      const { remote: e, remoteMethod: t, search: s } = this._chartOption;
      if (s)
        return s();
      if (this.controller[t])
        return this.controller[t]();
      if (e && this.controller.getSearchParams) {
        const i = this.controller.getSearchParams(), l = await this.controller.search(i);
        let n = ra.get(l, this.controller.listProp);
        return n = this.controller.formatList(this.controller._defaultFormatList(n, l), l), n;
      }
      return this._data;
    },
    onPaging() {
      this.params.page && delete this.params.page, this._emit("search", this.params);
    }
  }
}, ca = {
  key: 1,
  class: "collapse-title"
}, ua = {
  key: 2,
  class: "collapse-title"
}, ha = /* @__PURE__ */ j("span", null, "-", -1), ma = ["value", "checked"], pa = { key: 1 };
function fa(e, t, s, i, l, n) {
  const o = u("searcher"), a = u("pc-x-icon"), r = u("settings"), m = u("pc-x-table-tools"), h = u("el-image"), v = u("el-tag"), b = u("router-link"), y = u("el-icon"), T = u("el-table-column"), V = u("el-button"), g = u("el-dropdown-item"), E = u("el-dropdown-menu"), F = u("el-dropdown"), q = u("el-table"), K = u("x-pagination"), D = u("el-collapse-item"), L = u("el-collapse"), O = u("x-chart"), I = u("x-dialog"), M = Z("domid"), z = Z("loading"), re = Z("el-table-infinite-scroll");
  return d(), w(P, null, [
    j("div", {
      class: Y(["pc-x-table", { fullscreen: l.isFullscreen, "hide-header": e.hideHeader }])
    }, [
      p(o, {
        ref: "searcher",
        uid: e._uid,
        columns: e.searcherColumns,
        config: e.searcherConfig,
        onSearch: e.handleSearch
      }, null, 8, ["uid", "columns", "config", "onSearch"]),
      p(L, {
        modelValue: l.activeNames,
        "onUpdate:modelValue": t[4] || (t[4] = (S) => l.activeNames = S),
        class: Y((l._useCollapse ? "use" : "no") + "-collapse"),
        onChange: e.handleCollapseChange
      }, {
        default: c(() => [
          p(D, {
            name: l.activeNames[0]
          }, {
            title: c(() => [
              e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : l.activeNames.length ? (d(), w("span", ca, $(e.title), 1)) : (d(), w("span", ua, [
                C($(e.title) + "，当前第 ", 1),
                j("span", null, $(e._query.page), 1),
                C(" 页，展示 "),
                j("span", null, $(e._data.length), 1),
                C(" 条数据， 共 "),
                j("span", null, $(e._total || e._data.length), 1),
                C(" 条数据 ")
              ]))
            ]),
            default: c(() => [
              x(e.$slots, "tools-top"),
              e.hideTools !== "" && e.hideTools !== !0 ? (d(), f(m, _({ key: 0 }, e._attrs, {
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
                    onClick: n.handleShowPieDialog
                  }, null, 8, ["onClick"])),
                  j("span", {
                    class: "minus",
                    onClick: t[0] || (t[0] = (...S) => e.handleMinus && e.handleMinus(...S))
                  }, [
                    p(a, { name: "FullScreen" }),
                    ha
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
              ]), 1040, ["domids", "onAdd", "onKeywordsSearch", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
              x(e.$slots, "tools-bottom"),
              R((d(), f(q, _({
                ref: "tableRef",
                "element-loading-text": "加载中..."
              }, e.elTableAttrs, {
                "infinite-scroll-disabled": e._finished,
                onHeaderDragend: e.handleHeaderDragend,
                onSelectionChange: e.handleSelectionChange,
                onSortChange: e.handleSortChange
              }), {
                default: c(() => [
                  (d(!0), w(P, null, B(e._visibleColumns, (S, G) => (d(), f(T, _(S, {
                    key: G,
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
                        }, null, 40, ma)) : S.slot === "$image" ? (d(), f(h, _({
                          key: 1,
                          src: e._imageSrc(N, S),
                          "preview-src-list": e._imagePreviewSrcList(N, S),
                          "preview-teleported": ""
                        }, S.imageAttrs), null, 16, ["src", "preview-src-list"])) : S.slot === "$tag" ? (d(), f(v, {
                          key: 2,
                          type: e.calcTagType(N, S)
                        }, {
                          default: c(() => [
                            C($(e.calcTagValue(N, S)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])) : S.slot === "$link" ? (d(), f(b, {
                          key: 3,
                          to: S.to(N.row)
                        }, {
                          default: c(() => [
                            C($(e.calcLink(N.row, S)), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"])) : S.slot === "$icon" ? (d(), f(y, {
                          key: 4,
                          class: "cell-icon"
                        }, {
                          default: c(() => [
                            (d(), f(te(N.row[S.prop])))
                          ]),
                          _: 2
                        }, 1024)) : S.slot ? x(e.$slots, S.slot, {
                          key: 5,
                          scope: N,
                          column: S,
                          value: N.row[S.prop]
                        }) : e.slotAll ? x(e.$slots, "all", {
                          key: 6,
                          scope: N,
                          column: S,
                          value: N.row[S.prop]
                        }) : (d(), w(P, { key: 7 }, [
                          S.comp === "ElSwitch" || e.table.isRowEdit && N.row.isEditing && (S.visible !== !1 || S.canEdit) ? (d(), f(te(S.comp || "ElInput"), _({ key: 0 }, { ...S, ...S.formAttrs }, {
                            modelValue: N.row[S.prop],
                            "onUpdate:modelValue": (_e) => N.row[S.prop] = _e,
                            disabled: !N.row.editable || !N.row.isEditing
                          }), null, 16, ["modelValue", "onUpdate:modelValue", "disabled"])) : (d(), w("span", pa, $(e.calcValue(N.row, S)), 1))
                        ], 64))
                      ]),
                      key: "0"
                    }
                  ]), 1040, ["min-width", "align", "resizable", "show-overflow-tooltip"]))), 128)),
                  e.hideOperates ? k("", !0) : (d(), f(T, {
                    key: 0,
                    label: "操作",
                    "min-width": e.operatesWidth,
                    align: e._attrs.operatesAlign || e._attrs.tableAlign || "center",
                    fixed: e._attrs.operatesFixed ?? "right"
                  }, {
                    default: c((S) => [
                      x(e.$slots, "operates-prefix", { scope: S }),
                      e.operatesDropdown ? (d(), f(F, {
                        key: 0,
                        class: "operates-dropdown"
                      }, {
                        dropdown: c(() => [
                          p(E, { class: "operates-dropdown-menu" }, {
                            default: c(() => [
                              e.canEdit(S.row) ? (d(), f(g, { key: 0 }, {
                                default: c(() => [
                                  R((d(), f(V, _({ type: "warning", ...e._attrs["edit-btn"] }, {
                                    icon: "edit",
                                    class: "x-table-edit",
                                    onClick: (G) => e._emit("edit", S)
                                  }), {
                                    default: c(() => [
                                      C($(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [M, e.domids.edit]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canSave(S.row) ? (d(), f(g, { key: 1 }, {
                                default: c(() => [
                                  R((d(), f(V, _({ type: "success", ...e._attrs["row-edit-btn"] }, {
                                    disabled: S.row._loading,
                                    icon: "collection",
                                    class: "x-table-row-edit",
                                    onClick: (G) => e._emit("row-edit", S)
                                  }), {
                                    default: c(() => [
                                      C($(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["disabled", "onClick"])), [
                                    [z, S.row._loading],
                                    [M, e.domids["row-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canCancelEdit(S.row) ? (d(), f(g, { key: 2 }, {
                                default: c(() => [
                                  R((d(), f(V, _({ type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                                    icon: "refresh-left",
                                    class: "x-table-cancel-edit",
                                    onClick: (G) => e._emit("cancel-edit", S)
                                  }), {
                                    default: c(() => [
                                      C($(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [M, e.domids["cancel-edit"]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0),
                              e.canDelete(S.row) ? (d(), f(g, { key: 3 }, {
                                default: c(() => [
                                  R((d(), f(V, _({ type: "danger", ...e._attrs["delete-btn"] }, {
                                    icon: "DeleteFilled",
                                    class: "x-table-delete",
                                    onClick: (G) => e._emit("delete", S)
                                  }), {
                                    default: c(() => [
                                      C($(e._attrs["delete-btn-text"] ?? "删除"), 1)
                                    ]),
                                    _: 2
                                  }, 1040, ["onClick"])), [
                                    [M, e.domids.delete]
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : k("", !0)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: c(() => [
                          R((d(), f(V, _({ type: "primary", ...e._attrs["operates-btn"] }, {
                            icon: "arrow-down",
                            class: "x-table-operates"
                          }), {
                            default: c(() => [
                              C($(e._attrs["operates-btn-text"] ?? "操作"), 1)
                            ]),
                            _: 1
                          }, 16)), [
                            [M, e.domids.operates]
                          ])
                        ]),
                        _: 2
                      }, 1024)) : k("", !0),
                      !e.operatesDropdown && e.canEdit(S.row) ? R((d(), f(V, _({ key: 1 }, { type: "warning", ...e._attrs["edit-btn"] }, {
                        icon: "edit",
                        class: "x-table-edit",
                        onClick: (G) => e._emit("edit", S)
                      }), {
                        default: c(() => [
                          C($(e._attrs["edit-btn-text"] ?? "编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [M, e.domids.edit]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canSave(S.row) ? R((d(), f(V, _({ key: 2 }, { type: "success", ...e._attrs["row-edit-btn"] }, {
                        disabled: S.row._loading,
                        icon: "collection",
                        class: "x-table-row-edit",
                        onClick: (G) => e._emit("row-edit", S)
                      }), {
                        default: c(() => [
                          C($(e._attrs["row-edit-btn-text"] ?? "保存"), 1)
                        ]),
                        _: 2
                      }, 1040, ["disabled", "onClick"])), [
                        [z, S.row._loading],
                        [M, e.domids["row-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canCancelEdit(S.row) ? R((d(), f(V, _({ key: 3 }, { type: "warning", ...e._attrs["cancel-edit-btn"] }, {
                        icon: "refresh-left",
                        class: "x-table-cancel-edit",
                        onClick: (G) => e._emit("cancel-edit", S)
                      }), {
                        default: c(() => [
                          C($(e._attrs["cancel-edit-btn-text"] ?? "取消编辑"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [M, e.domids["cancel-edit"]]
                      ]) : k("", !0),
                      !e.operatesDropdown && e.canDelete(S.row) ? R((d(), f(V, _({ key: 4 }, { type: "danger", ...e._attrs["delete-btn"] }, {
                        icon: "DeleteFilled",
                        class: "x-table-delete",
                        onClick: (G) => e._emit("delete", S)
                      }), {
                        default: c(() => [
                          C($(e._attrs["delete-btn-text"] ?? "删除"), 1)
                        ]),
                        _: 2
                      }, 1040, ["onClick"])), [
                        [M, e.domids.delete]
                      ]) : k("", !0),
                      x(e.$slots, "operates-suffix", { scope: S })
                    ]),
                    _: 3
                  }, 8, ["min-width", "align", "fixed"]))
                ]),
                _: 3
              }, 16, ["infinite-scroll-disabled", "onHeaderDragend", "onSelectionChange", "onSortChange"])), [
                [z, e._loading],
                [re, e._onLoad]
              ]),
              e._query && e._total && !e.hidePagination ? (d(), f(K, {
                key: 1,
                query: e._query,
                total: e._total,
                onSearch: n.onPaging
              }, null, 8, ["query", "total", "onSearch"])) : k("", !0)
            ]),
            _: 3
          }, 8, ["name"])
        ]),
        _: 3
      }, 8, ["modelValue", "class", "onChange"])
    ], 2),
    e.hideChart ? k("", !0) : (d(), f(I, {
      key: 0,
      modelValue: l.dialog.visible,
      "onUpdate:modelValue": t[5] || (t[5] = (S) => l.dialog.visible = S),
      title: "图表",
      width: "96%",
      onFullscreenchange: n.handleChartDialogFullscreen
    }, {
      default: c(() => [
        p(O, {
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
const ga = /* @__PURE__ */ A(da, [["render", fa]]), ba = {
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
}, _a = { class: "mobile-x-table-tools" }, ya = { key: 0 }, wa = { class: "tools" }, va = { class: "tools-end" };
function Sa(e, t, s, i, l, n) {
  const o = u("van-floating-bubble"), a = u("mobile-x-icon"), r = u("van-button"), m = Z("domid");
  return d(), w("div", _a, [
    e.$attrs.onAdd ? R((d(), w("div", ya, [
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
    ]) : k("", !0),
    j("div", wa, [
      x(e.$slots, "tools-prefix", {}, void 0, !0),
      e.$attrs.onSearch ? R((d(), f(r, _({ key: 0 }, { type: "success", ...s.searchBtn }, {
        class: "x-table-search",
        onClick: t[1] || (t[1] = (h) => e.$emit("search"))
      }), {
        default: c(() => [
          p(a, { name: "search" }),
          C(" 高级查询 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.search]
      ]) : k("", !0),
      e.$attrs.onMultiEdit ? R((d(), f(r, _({ key: 1 }, { type: "warning", ...s.multiEditBtn }, {
        class: "x-table-edit",
        onClick: t[2] || (t[2] = (h) => e.$emit("multi-edit"))
      }), {
        default: c(() => [
          p(a, { name: "edit" }),
          C(" 编辑 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["multi-edit"]]
      ]) : k("", !0),
      e.$attrs.onMultiDelete ? R((d(), f(r, _({ key: 2 }, { type: "danger", ...s.multiDeleteBtn }, {
        class: "x-table-multi-delete",
        onClick: t[3] || (t[3] = (h) => e.$emit("multi-delete"))
      }), {
        default: c(() => [
          p(a, { name: "DeleteFilled" }),
          C(" 批量删除 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["multi-delete"]]
      ]) : k("", !0),
      e.$attrs.onExport ? R((d(), f(r, _({ key: 3 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-export",
        onClick: t[4] || (t[4] = (h) => e.$emit("export"))
      }), {
        default: c(() => [
          p(a, { name: "printer" }),
          C(" 导出 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.export]
      ]) : k("", !0),
      e.$attrs.onSearchExport ? R((d(), f(r, _({ key: 4 }, { type: "success", ...s.exportBtn }, {
        class: "x-table-search-export",
        onClick: t[5] || (t[5] = (h) => e.$emit("search-export"))
      }), {
        default: c(() => [
          p(a, { name: "printer" }),
          C(" 查询导出 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids["search-export"]]
      ]) : k("", !0),
      e.$attrs.onImport ? R((d(), f(r, _({ key: 5 }, { type: "warning", ...s.importBtn }, {
        class: "x-table-import",
        onClick: t[6] || (t[6] = (h) => e.$emit("import"))
      }), {
        default: c(() => [
          p(a, { name: "UploadFilled" }),
          C(" 导入 ")
        ]),
        _: 1
      }, 16)), [
        [m, s.domids.import]
      ]) : k("", !0),
      x(e.$slots, "tools-suffix", {}, void 0, !0),
      j("div", va, [
        x(e.$slots, "tools-end", {}, void 0, !0)
      ])
    ])
  ]);
}
const ka = /* @__PURE__ */ A(ba, [["render", Sa], ["__scopeId", "data-v-dda9e446"]]), $a = {
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
}, Ca = { class: "tools" }, xa = { class: "tools-end flex-center" };
function Va(e, t, s, i, l, n) {
  const o = u("el-input"), a = u("el-button"), r = u("el-card"), m = Z("domid");
  return d(), f(r, {
    shadow: "hover",
    "body-style": { padding: "10px" },
    class: "pc-x-table-tools"
  }, {
    default: c(() => [
      j("div", Ca, [
        x(e.$slots, "tools-prefix", {}, void 0, !0),
        e.$attrs.onKeywordsSearch ? R((d(), f(o, {
          key: 0,
          modelValue: l.keywords,
          "onUpdate:modelValue": t[0] || (t[0] = (h) => l.keywords = h),
          placeholder: e.$attrs["keywords-placeholder"] || "输入关键词搜索",
          clearable: "",
          class: "keywords-search",
          onKeyup: t[1] || (t[1] = Pe((h) => e.$emit("keywords-search", l.keywords.trim()), ["enter"]))
        }, null, 8, ["modelValue", "placeholder"])), [
          [m, s.domids["keywords-search"]]
        ]) : k("", !0),
        e.$attrs.onSearch ? R((d(), f(a, _({ key: 1 }, { type: "success", ...s.searchBtn }, {
          icon: "search",
          class: "x-table-search",
          onClick: t[2] || (t[2] = (h) => e.$emit("search"))
        }), {
          default: c(() => [
            C($(e.$attrs["search-btn-text"] ?? "高级查询"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids.search]
        ]) : k("", !0),
        e.$attrs.onAdd ? R((d(), f(a, _({ key: 2 }, { type: "primary", ...s.addBtn }, {
          icon: "circle-plus-filled",
          class: "x-table-add",
          onClick: t[3] || (t[3] = (h) => e.$emit("add"))
        }), {
          default: c(() => [
            C($(e.$attrs["add-btn-text"] ?? "新增"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids.add]
        ]) : k("", !0),
        e.$attrs.onMultiEdit ? R((d(), f(a, _({ key: 3 }, { type: "warning", ...s.multiEditBtn }, {
          icon: "edit",
          class: "x-table-edit",
          onClick: t[4] || (t[4] = (h) => e.$emit("multi-edit"))
        }), {
          default: c(() => [
            C($(e.$attrs["edit-btn-text"] ?? "编辑"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids["multi-edit"]]
        ]) : k("", !0),
        e.$attrs.onMultiDelete ? R((d(), f(a, _({ key: 4 }, { type: "danger", ...s.multiDeleteBtn }, {
          icon: "DeleteFilled",
          class: "x-table-multi-delete",
          onClick: t[5] || (t[5] = (h) => e.$emit("multi-delete"))
        }), {
          default: c(() => [
            C($(e.$attrs["multi-delete-btn-text"] ?? "批量删除"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids["multi-delete"]]
        ]) : k("", !0),
        e.$attrs.onExport ? R((d(), f(a, _({ key: 5 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-export",
          onClick: t[6] || (t[6] = (h) => e.$emit("export"))
        }), {
          default: c(() => [
            C($(e.$attrs["export-btn-text"] ?? "导出"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids.export]
        ]) : k("", !0),
        e.$attrs.onSearchExport ? R((d(), f(a, _({ key: 6 }, { type: "success", ...s.exportBtn }, {
          icon: "printer",
          class: "x-table-search-export",
          onClick: t[7] || (t[7] = (h) => e.$emit("search-export"))
        }), {
          default: c(() => [
            C($(e.$attrs["search-export-btn-text"] ?? "查询导出"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids["search-export"]]
        ]) : k("", !0),
        e.$attrs.onImport ? R((d(), f(a, _({ key: 7 }, { type: "warning", ...s.importBtn }, {
          icon: "UploadFilled",
          class: "x-table-import",
          onClick: t[8] || (t[8] = (h) => e.$emit("import"))
        }), {
          default: c(() => [
            C($(e.$attrs["import-btn-text"] ?? "导入"), 1)
          ]),
          _: 1
        }, 16)), [
          [m, s.domids.import]
        ]) : k("", !0),
        x(e.$slots, "tools-suffix", {}, void 0, !0),
        j("div", xa, [
          x(e.$slots, "tools-end", {}, void 0, !0)
        ])
      ])
    ]),
    _: 3
  });
}
const Ea = /* @__PURE__ */ A($a, [["render", Va], ["__scopeId", "data-v-3d6b703b"]]);
function wt(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !lt(e);
}
const Aa = (e) => {
  const t = e._data.length > 0 && e.selected.size === e._data.length, s = !t && e.selected.size > 0, i = (l) => {
    l ? e._data.forEach((o, a) => e.selected.add(a)) : e.selected.clear();
    const n = l ? e._data.slice() : [];
    e.handleSelectionChange(n);
  };
  return p(u("el-checkbox"), {
    modelValue: t,
    indeterminate: s,
    onChange: i
  }, null);
}, Oa = (e, t) => {
  const {
    rowIndex: s,
    rowData: i
  } = e, l = () => {
    t.selected.has(s) ? t.selected.delete(s) : t.selected.add(s);
    const n = [...t.selected].map((o) => t._data[o]);
    t.handleSelectionChange(n);
  };
  return p(u("el-checkbox"), {
    modelValue: t.selected.has(s),
    onChange: l
  }, null);
}, ja = (e, t) => {
  const {
    page: s,
    limit: i
  } = t._query;
  return (s - 1) * i + e.rowIndex + 1;
}, Fa = (e, t) => {
  const {
    rowIndex: s
  } = e;
  return p("input", {
    type: "radio",
    value: s,
    checked: s === t.checked,
    onChange: t.handleCheckedChange
  }, null);
}, be = ([e, t, s, i, l, n]) => {
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
    type: i
  }, t._attrs[s + "-btn"], {
    icon: l,
    onClick: r
  }), wt(n) ? n : {
    default: () => [n]
  });
}, Ta = (e, t) => {
  if (t.canEdit(e.rowData))
    return be([e, t, "edit", "warning", "edit", "编辑"]);
}, Da = (e, t) => {
  if (t.canRowEdit(e.rowData))
    return be([e, t, "row-edit", "success", "collection", "保存"]);
}, Ia = (e, t) => {
  if (t.canCancelEdit(e.rowData))
    return be([e, t, "cancel-edit", "warning", "refresh-left", "取消编辑"]);
}, Ra = (e, t) => {
  if (t.canDelete(e.rowData))
    return be([e, t, "delete", "danger", "DeleteFilled", "删除"]);
}, Pa = (e, t) => {
  const {
    _attrs: s,
    $slots: i
  } = t, {
    slotRenderers: l = {}
  } = s;
  if (e.type === "selection")
    return (n) => Oa(n, t);
  if (e.type === "index")
    return (n) => ja(n, t);
  if (e.type === "radio")
    return (n) => Fa(n, t);
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
      const h = (b) => {
        o[a.prop] = b;
      }, v = a.comp || "ElInput";
      return se(u(v), {
        ...a,
        ...a.formAttrs,
        modelValue: o[a.prop],
        onInput: h,
        disabled: !o.editable || !o.isEditing
      });
    }
    const r = t.calcValue(n.rowData, e), {
      showOverflowTooltip: m
    } = a.tableAttrs || {};
    return m ? p(u("el-tooltip"), {
      content: r
    }, wt(r) ? r : {
      default: () => [r]
    }) : r;
  };
}, Ba = (e, t) => {
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
    return r.type === "selection" && (r.width = r.width || 46, r.headerCellRenderer = Aa(t)), r.cellRenderer = Pa(r, t), r;
  });
  return t.hideOperates || l.push({
    key: l.length,
    title: "操作",
    type: "operates",
    width: t.operatesWidth || 150,
    align: s.operatesAlign || s.tableAlign || "center",
    fixed: s.operatesFixed || "right",
    cellRenderer(n) {
      return p("div", {
        class: "operates"
      }, [i["operates-prefix"] ? i["operates-prefix"]() : null, Ta(n, t), Da(n, t), Ia(n, t), Ra(n, t), i["operates-suffix"] ? i["operates-suffix"]() : null]);
    }
  }), l;
}, Ma = {
  convertColumnsForTableV2: Ba
}, La = {
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
  components: { Searcher: qe, Settings: yt },
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
    convertColumnsForTableV2: Ma.convertColumnsForTableV2
  }
}, Na = { key: 1 };
function Ua(e, t, s, i, l, n) {
  const o = u("Searcher"), a = u("x-icon"), r = u("Settings"), m = u("x-table-tools"), h = u("el-table-v2"), v = u("el-auto-resizer"), b = u("x-pagination"), y = u("el-collapse-item"), T = u("el-collapse"), V = Z("loading");
  return d(), w("div", {
    class: Y(["pc-x-table-v2", { fullscreen: l.isFullscreen }])
  }, [
    p(o, {
      ref: "searcher",
      uid: e._uid,
      columns: e.searcherColumns,
      config: e.searcherConfig,
      onSearch: t[0] || (t[0] = (g) => e._emit("search", g))
    }, null, 8, ["uid", "columns", "config"]),
    p(T, {
      modelValue: l.activeNames,
      "onUpdate:modelValue": t[3] || (t[3] = (g) => l.activeNames = g),
      class: Y((e.useCollapse ? "use" : "no") + "-collapse")
    }, {
      default: c(() => [
        p(y, {
          name: l.activeNames[0]
        }, {
          title: c(() => [
            e.$slots["collapse-title"] ? x(e.$slots, "collapse-title", { key: 0 }) : (d(), w("span", Na, $(e.title), 1))
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
            ]), 1040, ["domids", "onAdd", "onSearch", "onExport", "onSearchExport", "onImport", "onMultiDelete"])) : k("", !0),
            p(v, {
              style: St({ height: s.height })
            }, {
              default: c(({ width: g, height: E }) => [
                R((d(), f(h, _({
                  ref: "tableRef",
                  "header-height": 46,
                  "row-height": 40
                }, e.elTableAttrs, {
                  data: e._data,
                  columns: n.convertColumnsForTableV2(e._visibleColumns, this),
                  fixed: s.fixed,
                  width: g,
                  height: E
                }), oe({ _: 2 }, [
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
                  [V, e._loading]
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
const qa = /* @__PURE__ */ A(La, [["render", Ua]]), $e = ["selection", "radio"], za = {
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
      $e.includes(t) && (e.columns.find((s) => s.type === "_index") || e.columns.unshift({ type: "_index" }), e.columns.find((s) => s.type === t) || e.columns.unshift({
        prop: "_index",
        type: t,
        fixed: "left",
        width: 55,
        label: t === "selection" ? "" : "单选"
      })), e.columns = e.columns.filter((s) => this.selectMode === s.type || !$e.includes(s.type));
    },
    handleSubmit() {
      const { table: e, selectMode: t } = this;
      if ($e.includes(t)) {
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
}, Xa = { class: "x-table-viewer" };
function Wa(e, t, s, i, l, n) {
  const o = u("x-dialog");
  return d(), w("div", Xa, [
    p(o, _(n._dialogAttrs, {
      modelValue: s.visible,
      "onUpdate:modelValue": t[1] || (t[1] = (a) => e.$emit("update:visible", a)),
      title: s.title,
      "before-close": n.handleBeforeClose,
      onSubmit: n.handleSubmit,
      onCancel: n.handleCancel
    }), {
      default: c(() => [
        (d(), f(te(s.useTableV2 ? "x-table-v2" : "x-table"), _({
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
const Ha = /* @__PURE__ */ A(za, [["render", Wa], ["__scopeId", "data-v-e6f36700"]]), Ka = {
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
}, Ja = { class: "mobile-x-tags" };
function Ya(e, t, s, i, l, n) {
  const o = u("van-tag");
  return d(), w("div", Ja, [
    (d(!0), w(P, null, B(n._data, (a, r) => (d(), f(o, _({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (m) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        C($(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const Ga = /* @__PURE__ */ A(Ka, [["render", Ya], ["__scopeId", "data-v-d8beefdf"]]), Qa = {
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
}, Za = { class: "pc-x-tags" };
function eo(e, t, s, i, l, n) {
  const o = u("el-tag");
  return d(), w("div", Za, [
    (d(!0), w(P, null, B(n._data, (a, r) => (d(), f(o, _({ key: r }, { ...e.$attrs, item: a }, {
      onClose: (m) => e.$emit("close", a[s.text], r)
    }), {
      default: c(() => [
        C($(a[s.text]), 1)
      ]),
      _: 2
    }, 1040, ["onClose"]))), 128))
  ]);
}
const to = /* @__PURE__ */ A(Qa, [["render", eo], ["__scopeId", "data-v-bd702be1"]]), so = {
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
}, no = { class: "x-tinymce" }, io = ["id", "innerHTML"];
function lo(e, t, s, i, l, n) {
  return d(), w("div", no, [
    j("textarea", {
      id: l.id,
      innerHTML: s.modelValue
    }, null, 8, io)
  ]);
}
const ao = /* @__PURE__ */ A(so, [["render", lo]]), oo = {
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
}, ze = (e) => (De("data-v-a3a105f3"), e = e(), Ie(), e), ro = { class: "mask" }, co = {
  key: 0,
  class: "el-upload__text"
}, uo = /* @__PURE__ */ ze(() => /* @__PURE__ */ j("em", null, "点击上传", -1)), ho = /* @__PURE__ */ ze(() => /* @__PURE__ */ j("br", null, null, -1)), mo = /* @__PURE__ */ ze(() => /* @__PURE__ */ j("br", null, null, -1)), po = {
  key: 0,
  class: "path"
};
function fo(e, t, s, i, l, n) {
  const o = u("pc-x-icon"), a = u("el-button"), r = u("el-upload");
  return d(), f(r, _({
    "file-list": l.fileList,
    "onUpdate:fileList": t[0] || (t[0] = (m) => l.fileList = m),
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
      j("div", ro, [
        p(o, { name: "upload-filled" }),
        l.disabled ? k("", !0) : (d(), w("div", co, [
          C(" 将文件拖到此处，或"),
          uo,
          ho,
          mo,
          s.needUpload && !l.disabled && l.fileList.length ? (d(), f(a, {
            key: 0,
            type: "success",
            onClick: Q(n.handleUploadAll, ["stop"])
          }, {
            default: c(() => [
              C(" 选择完毕，全部上传到服务器 ")
            ]),
            _: 1
          }, 8, ["onClick"])) : k("", !0)
        ]))
      ]),
      n.filepath ? (d(), w("div", po, $(s.modelValue), 1)) : k("", !0)
    ]),
    _: 1
  }, 16, ["file-list", "disabled", "action", "accept", "multiple", "on-success"]);
}
const go = /* @__PURE__ */ A(oo, [["render", fo], ["__scopeId", "data-v-a3a105f3"]]), bo = {
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
}, _o = ["src"];
function yo(e, t, s, i, l, n) {
  const o = u("Plus"), a = u("el-icon"), r = u("el-upload"), m = u("x-dialog");
  return d(), w(P, null, [
    p(r, _({
      "file-list": l.fileList,
      "onUpdate:fileList": [
        t[0] || (t[0] = (h) => l.fileList = h),
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
      modelValue: l.dialogVisible,
      "onUpdate:modelValue": t[1] || (t[1] = (h) => l.dialogVisible = h),
      actionsheet: "",
      title: "预览图片" + (l.previewingImage.name || "")
    }, {
      default: c(() => [
        j("img", {
          src: l.previewingImage.url,
          alt: "previewing-image",
          class: "previewing-image"
        }, null, 8, _o)
      ]),
      _: 1
    }, 8, ["modelValue", "title"])
  ], 64);
}
const wo = /* @__PURE__ */ A(bo, [["render", yo], ["__scopeId", "data-v-0afe3ea6"]]), Ce = {
  xarray: Qt,
  xautorows: ns,
  mobilexbutton: as,
  pcxbutton: ds,
  xchart: ys,
  mobilexcheckboxs: Ss,
  pcxcheckboxs: xs,
  mobilexcol: As,
  pcxcol: Fs,
  mobilexdialog: Ps,
  pcxdialog: Ns,
  xdict: Xs,
  xdistrictselect: Ks,
  mobilexform: ln,
  pcxform: dn,
  mobilexformitem: mn,
  pcxformitem: pn,
  mobilexicon: _n,
  pcxicon: Sn,
  xinfo: Mi,
  xlooper: qi,
  mobilexpagination: Wi,
  pcxpagination: Ji,
  xpicker: Qi,
  mobilexradios: tl,
  pcxradios: ll,
  mobilexrow: dl,
  pcxrow: ml,
  mobilexscan: gl,
  pcxscan: yl,
  mobilexselect: Sl,
  pcxselect: El,
  xselectv2: Dl,
  mobilextable: Ql,
  pcxtable: ga,
  mobilextabletools: ka,
  pcxtabletools: Ea,
  xtablev2: qa,
  xtableviewer: Ha,
  mobilextags: Ga,
  pcxtags: to,
  xtinymce: ao,
  xfileuploader: go,
  ximageuploader: wo
}, de = {};
for (let e in Ce)
  de[Ce[e].name] = Ce[e];
const { ElInfiniteScroll: nt } = window.ElementPlus || {}, me = ".el-scrollbar__wrap", it = (e, t) => {
  vo(e, t, [
    "infinite-scroll-disabled",
    "infinite-scroll-delay",
    "infinite-scroll-immediate",
    "infinite-scroll-distance"
  ]);
  const s = "infinite-scroll-distance", i = +(e.getAttribute(s) || 0);
  t.setAttribute(s, (i < 1 ? 1 : i) + "");
}, vo = (e, t, s) => {
  let i;
  s.forEach((l) => {
    i = e.getAttribute(l), i !== null ? t.setAttribute(l, i) : t.removeAttribute(l);
  });
}, So = {
  name: "el-table-infinite-scroll",
  mounted(e, t, s, i) {
    const l = e.querySelector(me);
    if (!l)
      throw new Error(`${me} element not found.`);
    l.style.overflowY = "auto", setTimeout(() => {
      !e.style.height && !e.style.maxHeight && (l.style.height = "400px", console.warn("el-table height required, otherwise will set scrollbar default height: 400px")), it(e, l), nt.mounted(l, t, s, i);
    }, 0);
  },
  updated(e) {
    it(e, e.querySelector(me));
  },
  unmounted(e, ...t) {
    const s = e.querySelector(me);
    nt.unmounted(s, ...t);
  }
}, xe = {
  ElTableInfiniteScroll: So
}, ko = (e) => ({
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
    return se(de[this.name], {
      platform: this.platform,
      ...this.$attrs
    }, this.$slots);
  }
}), je = (() => {
  const e = Object.keys(de), t = [...new Set(e.map((i) => i.replace(/(pc|mobile)/i, "")))], s = {};
  for (const i of e)
    /(pc|mobile)/i.test(i) && (s[i] = de[i]);
  for (const i of t)
    e.find((l) => /(pc|mobile)/i.test(l) && l.toLowerCase().includes(i.toLowerCase())) ? s[i] = ko(i) : s[i] = de[i];
  return s;
})(), $o = (e, t) => {
  for (let s in je)
    e.component(s, je[s]);
  for (let s in xe)
    e.directive(xe[s].name, xe[s]);
}, xo = {
  version: "1.5.79",
  ...je,
  ...pt,
  ...Wt,
  install: $o
};
export {
  ft as BaseController,
  ee as Confirm,
  gt as CrudController,
  X as Message,
  pe as Notify,
  Xt as TempCrudController,
  fe as baseDialog,
  ce as baseForm,
  Bt as baseModel,
  ot as baseTable,
  Wt as controllers,
  xo as default,
  Ct as effects,
  H as formatOptions,
  xt as formatPrecision,
  ut as initDefaultForm,
  dt as initDialog,
  Mt as initFields,
  ue as initForm,
  ct as initFormRules,
  Lt as initModel,
  rt as initTable,
  ht as isWhenMatched,
  mt as triggers,
  pt as utils,
  at as validateForm
};
