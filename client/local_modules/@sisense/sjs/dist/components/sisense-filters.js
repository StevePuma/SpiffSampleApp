import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { c as contextRegistry } from './contextRegistry.js';
import { w as wait } from './utils.js';

const SisenseFilters$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  get el() { return this; }
}, [0, "sisense-filters", {
    "width": [2],
    "height": [2]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["sisense-filters"];
  components.forEach(tagName => { switch (tagName) {
    case "sisense-filters":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SisenseFilters$1);
      }
      break;
  } });
}

const SisenseFilters = SisenseFilters$1;
const defineCustomElement = defineCustomElement$1;

export { SisenseFilters, defineCustomElement };
