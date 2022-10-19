import { r as registerInstance, h, g as getElement } from './index-ea7c00cc.js';
import { c as contextRegistry } from './contextRegistry-bf2b2681.js';
import { w as wait } from './utils-a2d51dc2.js';

const SisenseFilters = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * The width of the filters panel
     */
    this.width = 200;
    /**
     * The height of the filters panel
     */
    this.height = 200;
  }
  connectedCallback() {
    contextRegistry.withNearestContext(this, 'sisense-dashboard', async (context) => {
      if (!this.filtersDiv) {
        await wait(0);
      }
      void context.renderFilters(this.filtersDiv);
    });
  }
  render() {
    return (h("div", { style: {
        width: this.width ? `${this.width}px` : '',
        height: this.height ? `${this.height}px` : '',
      }, ref: el => (this.filtersDiv = el) }));
  }
  get el() { return getElement(this); }
};

export { SisenseFilters as sisense_filters };
