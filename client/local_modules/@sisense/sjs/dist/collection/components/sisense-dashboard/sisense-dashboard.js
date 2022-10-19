import { Component, h, State, Event, Prop, Method, Element, } from '@stencil/core';
import { debounce } from '../../utils/utils';
import { contextRegistry } from '../../contextRegistry';
import { newDashboard } from '../../globals';
export class SisenseDashboard {
  constructor() {
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
  static get is() { return "sisense-dashboard"; }
  static get properties() { return {
    "oid": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "The ID of an existing dashboard - if omitted, a \"blank\" temporary dashboard is created instead"
      },
      "attribute": "oid",
      "reflect": false,
      "defaultValue": "undefined"
    },
    "datasource": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "DataSource",
        "resolved": "{ fullname: string; id: string; address: string; database: string; live: boolean; title: string; }",
        "references": {
          "DataSource": {
            "location": "import",
            "path": "../../types"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "Datasource used for a \"blank\" dashboard"
      }
    }
  }; }
  static get states() { return {
    "dashboardContext": {}
  }; }
  static get events() { return [{
      "method": "filtersChanged",
      "name": "filtersChanged",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when filters are changed"
      },
      "complexType": {
        "original": "{\n    items: Filter[];\n    type: 'add' | 'remove' | 'update';\n  }",
        "resolved": "{ items: Filter[]; type: \"add\" | \"remove\" | \"update\"; }",
        "references": {
          "Filter": {
            "location": "import",
            "path": "../../types"
          }
        }
      }
    }, {
      "method": "refreshed",
      "name": "refreshed",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when dashboard has refreshed"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "loaded",
      "name": "loaded",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when dashboard has loaded"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "getModel": {
      "complexType": {
        "signature": "() => Promise<DashboardModel>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "DashboardModel": {
            "location": "import",
            "path": "../../types"
          }
        },
        "return": "Promise<DashboardModel>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "applyFilters": {
      "complexType": {
        "signature": "(filters: Filter[]) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "Filter": {
            "location": "import",
            "path": "../../types"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "removeFilters": {
      "complexType": {
        "signature": "(filters: Filter[]) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "Filter": {
            "location": "import",
            "path": "../../types"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "clearFilters": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "refresh": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
}
