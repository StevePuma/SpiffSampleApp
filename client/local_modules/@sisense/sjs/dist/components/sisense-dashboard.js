import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { d as debounce } from './utils.js';
import { c as contextRegistry } from './contextRegistry.js';

function newDashboard() {
  return new window['Dashboard']();
}

const SisenseDashboard$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.filtersChanged = createEvent(this, "filtersChanged", 3);
    this.refreshed = createEvent(this, "refreshed", 3);
    this.loaded = createEvent(this, "loaded", 3);
    /**
     * The ID of an existing dashboard - if omitted, a "blank" temporary dashboard is created instead
     */
    this.oid = undefined;
  }
  async loadDashboard() {
    const d = await contextRegistry.withNearestContext(this, 'sisense-app', (context) => {
      if (this.oid)
        return context.dashboards.load(this.oid);
      const dashboard = newDashboard();
      if (this.datasource) {
        dashboard.datasource = this.datasource;
      }
      context.dashboards.add(dashboard);
      return dashboard;
    });
    if (!d)
      return;
    d.debouncedRefresh = debounce(d.refresh.bind(d), 1000);
    d.on('filterschanged', (_, { items, type }) => {
      this.filtersChanged.emit({ items, type });
    });
    d.on('refreshend', () => {
      this.refreshed.emit();
    });
    this.dashboardContext = d;
    this.loaded.emit();
  }
  async _getContext() {
    if (this.dashboardContext) {
      return this.dashboardContext;
    }
    return new Promise(resolve => {
      this.el.addEventListener('loaded', () => {
        resolve(this.dashboardContext);
      }, { once: true });
    });
  }
  async getModel() {
    var _a, _b;
    const context = await this._getContext();
    const model = context === null || context === void 0 ? void 0 : context.$$model;
    return (model &&
      Object.freeze({
        filters: (_a = model.filters) === null || _a === void 0 ? void 0 : _a.$$items,
        widgets: (_b = model.widgets) === null || _b === void 0 ? void 0 : _b.$$widgets,
        oid: model.oid,
        title: model.title,
        description: model.description,
        instanceType: model.instanceType,
        owner: model.owner,
        userId: model.userId,
        datasource: model.datasource,
        defaultFilters: model.defaultFilters,
      }));
  }
  async applyFilters(filters) {
    const context = await this._getContext();
    filters.forEach(filter => {
      var _a, _b;
      (_b = (_a = context === null || context === void 0 ? void 0 : context.$$model) === null || _a === void 0 ? void 0 : _a.filters) === null || _b === void 0 ? void 0 : _b.update({ jaql: filter }, { save: false });
    });
    context.debouncedRefresh();
  }
  async removeFilters(filters) {
    const context = await this._getContext();
    filters.forEach(filter => {
      var _a, _b;
      if (filter.dim) {
        (_b = (_a = context === null || context === void 0 ? void 0 : context.$$model) === null || _a === void 0 ? void 0 : _a.filters) === null || _b === void 0 ? void 0 : _b.remove(filter.dim);
      }
    });
    context.debouncedRefresh();
  }
  async clearFilters() {
    var _a, _b;
    const context = await this._getContext();
    (_b = (_a = context === null || context === void 0 ? void 0 : context.$$model) === null || _a === void 0 ? void 0 : _a.filters) === null || _b === void 0 ? void 0 : _b.clear();
    context.debouncedRefresh();
  }
  connectedCallback() {
    contextRegistry.register(this);
    void this.loadDashboard();
  }
  disconnectedCallback() {
    contextRegistry.unregister(this);
  }
  async refresh() {
    const context = await this._getContext();
    context.debouncedRefresh();
  }
  render() {
    return h("slot", null);
  }
  get el() { return this; }
}, [4, "sisense-dashboard", {
    "oid": [1],
    "datasource": [16],
    "dashboardContext": [32],
    "getModel": [64],
    "applyFilters": [64],
    "removeFilters": [64],
    "clearFilters": [64],
    "refresh": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["sisense-dashboard"];
  components.forEach(tagName => { switch (tagName) {
    case "sisense-dashboard":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SisenseDashboard$1);
      }
      break;
  } });
}

const SisenseDashboard = SisenseDashboard$1;
const defineCustomElement = defineCustomElement$1;

export { SisenseDashboard, defineCustomElement };
