import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { c as contextRegistry } from './contextRegistry.js';

//https://stackoverflow.com/questions/60633526/how-to-use-an-external-third-party-library-in-stencil-js
function loadLibrary(url) {
  // TODO: Also check the global scope for "Sisense" and "Dashboard"
  if (document.querySelector(`script[src="${url}"]`)) {
    return Promise.resolve(); // already exists
  }
  const script = document.createElement('script');
  script.src = url;
  script.setAttribute('script-name', 'sisensejs');
  document.head.appendChild(script);
  const promise = new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
  });
  return promise;
}

const SisenseApp$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.loaded = createEvent(this, "loaded", 3);
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
    let src = new URL(`${this.url}/js/sisense.v1.js`);
    if(this.urlParams){
      src = src + '?' + this.urlParams;
    }
    if (this.wat) {
      src.searchParams.append('wat', 'true');
    }
    loadLibrary(src).then(() => {
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
    return (h("div", { id: "sisenseApp" }, h("slot", null)));
  }
  get el() { return this; }
  static get watchers() { return {
    "url": ["onUrlChange"]
  }; }
}, [4, "sisense-app", {
    "url": [1],
    "persist": [4],
    "wat": [1],
    "appContext": [32],
    "logout": [64],
    "getModel": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["sisense-app"];
  components.forEach(tagName => { switch (tagName) {
    case "sisense-app":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SisenseApp$1);
      }
      break;
  } });
}

const SisenseApp = SisenseApp$1;
const defineCustomElement = defineCustomElement$1;

export { SisenseApp, defineCustomElement };
