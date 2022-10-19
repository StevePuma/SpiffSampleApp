import { Component, h, State, Prop, Watch, Event, Method, Element, } from '@stencil/core';
import { debounce, wait } from '../../utils/utils';
import { contextRegistry } from '../../contextRegistry';
export class SisenseWidget {
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
  static get is() { return "sisense-widget"; }
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
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The ID of an existing widget"
      },
      "attribute": "oid",
      "reflect": false
    },
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
        "text": "The width of the widget"
      },
      "attribute": "width",
      "reflect": false
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
        "text": "The height of the widget"
      },
      "attribute": "height",
      "reflect": false
    }
  }; }
  static get states() { return {
    "widgetContext": {}
  }; }
  static get events() { return [{
      "method": "processResult",
      "name": "processResult",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires during the widget's native result processing. Allows for\ncustomization of the result being rendered. \"reason\" specifies the event\nthat caused this to fire (e.g. \"dashboardrefreshed\")."
      },
      "complexType": {
        "original": "{\n    result: any;\n    reason: string;\n  }",
        "resolved": "{ result: any; reason: string; }",
        "references": {}
      }
    }, {
      "method": "ready",
      "name": "ready",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when widget has finished rendering."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "beforeQuery",
      "name": "beforeQuery",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires before the query is executed."
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
        "text": "Fires when widget is loaded into the dashboard object."
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "getHighchartsChart": {
      "complexType": {
        "signature": "() => Promise<HighchartsChart>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "HighchartsChart": {
            "location": "import",
            "path": "../../types"
          }
        },
        "return": "Promise<unknown>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "getModel": {
      "complexType": {
        "signature": "() => Promise<WidgetModel>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "WidgetModel": {
            "location": "import",
            "path": "../../types"
          }
        },
        "return": "Promise<WidgetModel>"
      },
      "docs": {
        "text": "",
        "tags": [{
            "name": "returns",
            "text": "An object with readonly attributes that describe a widget. Based off of https://sisense.dev/reference/js/widget/."
          }]
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "oid",
      "methodName": "idUpdatedHandler"
    }, {
      "propName": "width",
      "methodName": "widthUpdatedHandler"
    }, {
      "propName": "height",
      "methodName": "heightUpdatedHandler"
    }]; }
}
