import { r as registerInstance, c as createEvent, h, g as getElement } from './index-ea7c00cc.js';
import { w as wait, d as debounce } from './utils-a2d51dc2.js';
import { c as contextRegistry } from './contextRegistry-bf2b2681.js';

const SisenseWidget = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.processResult = createEvent(this, "processResult", 3);
    this.ready = createEvent(this, "ready", 3);
    this.beforeQuery = createEvent(this, "beforeQuery", 3);
    this.loaded = createEvent(this, "loaded", 3);
  }
  async getHighchartsChart() {
    const ref = this.widgetHandle.getElementsByClassName('widget-body')[0];
    return ref
      ? window['Sisense'].internalScope.Highcharts.charts[ref.dataset.highchartsChart]
      : null;
  }
  async _getContext() {
    if (this.widgetContext) {
      return this.widgetContext;
    }
    return new Promise(resolve => {
      this.el.addEventListener('loaded', () => {
        resolve(this.widgetContext);
      }, { once: true });
    });
  }
  /**
   * @returns An object with readonly attributes that describe a widget. Based off of https://sisense.dev/reference/js/widget/.
   */
  async getModel() {
    const context = await this._getContext();
    if (!context) {
      return undefined;
    }
    const { oid, title, type, subtype, owner, userId, instanceType, datasource, metadata, style, } = context.$$model;
    return Object.freeze({
      oid,
      title,
      type,
      subtype,
      owner,
      userId,
      instanceType,
      datasource,
      metadata,
      style,
    });
  }
  idUpdatedHandler() {
    void this.loadWidget();
  }
  widthUpdatedHandler() {
    this.widgetContext.debouncedRefresh();
  }
  heightUpdatedHandler() {
    this.widgetContext.debouncedRefresh();
  }
  connectedCallback() {
    void this.loadWidget();
  }
  disconnectedCallback() {
    this.free();
  }
  async loadWidget() {
    const w = await contextRegistry.withNearestContext(this, 'sisense-dashboard', (context) => { var _a; return (_a = context.widgets.get(this.oid)) !== null && _a !== void 0 ? _a : context.widgets.load(this.oid); });
    if (!w)
      return;
    while (!this.widgetHandle) {
      console.debug('Widget waiting for handle', this.oid);
      await wait(0); // wait for widgetHandle to populate in initial render
    }
    w.container = this.widgetHandle;
    w.on('ready', () => {
      this.ready.emit();
    });
    w.on('processresult', (_, { result, reason }) => {
      this.processResult.emit({
        result,
        reason,
      });
    });
    w.on('beforequery', () => {
      this.beforeQuery.emit();
    });
    w.debouncedRefresh = debounce(w.refresh.bind(w), 250);
    this.widgetContext = w;
    this.loaded.emit();
    console.debug('Loaded Widget', this.oid);
    void contextRegistry.withNearestContext(this, 'sisense-dashboard', context => context.refresh());
  }
  free() {
    if (!this.widgetContext)
      return;
    console.debug('Freeing', this.oid);
    this.widgetContext.destroy();
    this.widgetContext.$$model.destroy();
    this.widgetContext = null;
  }
  render() {
    return (h("div", { style: {
        width: this.width ? `${this.width}px` : '',
        height: this.height ? `${this.height}px` : '',
      }, ref: el => (this.widgetHandle = el) }));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "oid": ["idUpdatedHandler"],
    "width": ["widthUpdatedHandler"],
    "height": ["heightUpdatedHandler"]
  }; }
};

export { SisenseWidget as sisense_widget };
