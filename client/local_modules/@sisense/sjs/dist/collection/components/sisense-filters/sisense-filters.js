import { Component, h, Element, Prop } from '@stencil/core';
import { contextRegistry } from '../../contextRegistry';
import { wait } from '../../utils/utils';
export class SisenseFilters {
  constructor() {
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
  static get is() { return "sisense-filters"; }
  static get properties() { return {
    "width": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The width of the filters panel"
      },
      "attribute": "width",
      "reflect": false,
      "defaultValue": "200"
    },
    "height": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The height of the filters panel"
      },
      "attribute": "height",
      "reflect": false,
      "defaultValue": "200"
    }
  }; }
  static get elementRef() { return "el"; }
}
