'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1daca150.js');
const utils = require('./utils-d991fa0f.js');
const contextRegistry = require('./contextRegistry-e7f31452.js');

function newDashboard() {
  return new window['Dashboard']();
}

const SisenseDashboard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.filtersChanged = index.createEvent(this, "filtersChanged", 3);
    this.refreshed = index.createEvent(this, "refreshed", 3);
    this.loaded = index.createEvent(this, "loaded", 3);
    /**
     * The ID of an existing dashboard - if omitted, a "blank" temporary dashboard is created instead
     */
    this.oid = undefined;
  }
  async loadDashboard() {
    const d = await contextRegistry.contextRegistry.withNearestContext(this, 'sisense-app', (context) => {
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
    d.debouncedRefresh = utils.debounce(d.refresh.bind(d), 1000);
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
    contextRegistry.contextRegistry.register(this);
    void this.loadDashboard();
  }
  disconnectedCallback() {
    contextRegistry.contextRegistry.unregister(this);
  }
  async refresh() {
    const context = await this._getContext();
    context.debouncedRefresh();
  }
  render() {
    return index.h("slot", null);
  }
  get el() { return index.getElement(this); }
};

exports.sisense_dashboard = SisenseDashboard;
