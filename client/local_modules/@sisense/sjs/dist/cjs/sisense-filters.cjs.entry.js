'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1daca150.js');
const contextRegistry = require('./contextRegistry-e7f31452.js');
const utils = require('./utils-d991fa0f.js');

const SisenseFilters = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    contextRegistry.contextRegistry.withNearestContext(this, 'sisense-dashboard', async (context) => {
      if (!this.filtersDiv) {
        await utils.wait(0);
      }
      void context.renderFilters(this.filtersDiv);
    });
  }
  render() {
    return (index.h("div", { style: {
        width: this.width ? `${this.width}px` : '',
        height: this.height ? `${this.height}px` : '',
      }, ref: el => (this.filtersDiv = el) }));
  }
  get el() { return index.getElement(this); }
};

exports.sisense_filters = SisenseFilters;
