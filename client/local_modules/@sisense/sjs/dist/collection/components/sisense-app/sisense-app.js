import { Component, h, Prop, State, Method, Event, Element, Watch, } from '@stencil/core';
import Libloader from '../../utils/libloader';
import { contextRegistry } from '../../contextRegistry';
export class SisenseApp {
  constructor() {
    /**
     * If true, persist filter changes
     */
    this.persist = false;
  }
  connectedCallback() {
    contextRegistry.register(this);
  }
  disconnectedCallback() {
    contextRegistry.unregister(this);
  }
  componentWillLoad() {
    this.loadSisenseJS();
  }
  onUrlChange(newUrl, oldUrl) {
    if (newUrl !== oldUrl)
      this.loadSisenseJS();
  }
  loadSisenseJS() {
    if (!this.url) {
      return;
    }
    const src = new URL(`${this.url}/js/sisense.v1.js`);
    if (this.wat) {
      src.searchParams.append('wat', 'true');
    }
    Libloader(src).then(() => {
      console.debug('SisenseJS Downloaded');
      this.loadSisense();
    });
  }
  async logout() {
    this.appContext.$$dashboard.$identity.signout();
  }
  async _getContext() {
    if (this.appContext) {
      return this.appContext;
    }
    return new Promise(resolve => {
      this.el.addEventListener('loaded', () => {
        resolve(this.appContext);
      }, { once: true });
    });
  }
  async getModel() {
    await this._getContext();
    const prism = window['Sisense'].internalScope.prism;
    const { version, license: { isTrial }, user, } = prism;
    return Object.freeze({
      version,
      isTrial,
      user: Object.freeze({
        oid: user._id,
        email: user.email,
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: Object.freeze({
          oid: user.roleId,
          name: user.roleName,
        }),
      }),
    });
  }
  // Load SisenseJS
  loadSisense() {
    console.debug(`Sisense.connect('${this.url}', ${this.persist}, ${JSON.stringify(this.wat)})`);
    window['Sisense'].connect(this.url, this.persist, this.wat).then(app => {
      console.debug('Connected to', this.url);
      this.appContext = app;
      this.loaded.emit();
    });
  }
  render() {
    return (h("div", { id: "sisenseApp" },
      h("slot", null)));
  }
  static get is() { return "sisense-app"; }
  static get properties() { return {
    "url": {
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
        "text": "Base Sisense instance URL, e.g. https://sisense.example.com"
      },
      "attribute": "url",
      "reflect": false
    },
    "persist": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": "If true, persist filter changes"
      },
      "attribute": "persist",
      "reflect": false,
      "defaultValue": "false"
    },
    "wat": {
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
        "text": "Web access token"
      },
      "attribute": "wat",
      "reflect": false
    }
  }; }
  static get states() { return {
    "appContext": {}
  }; }
  static get events() { return [{
      "method": "loaded",
      "name": "loaded",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Fires when the Sisense app has loaded"
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "logout": {
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
    "getModel": {
      "complexType": {
        "signature": "() => Promise<AppModel>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "AppModel": {
            "location": "import",
            "path": "../../types"
          }
        },
        "return": "Promise<AppModel>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "url",
      "methodName": "onUrlChange"
    }]; }
}
