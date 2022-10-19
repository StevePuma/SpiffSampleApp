'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1daca150.js');
const contextRegistry = require('./contextRegistry-e7f31452.js');

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

const SisenseApp = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.loaded = index.createEvent(this, "loaded", 3);
    /**
     * If true, persist filter changes
     */
    this.persist = false;
  }
  connectedCallback() {
    contextRegistry.contextRegistry.register(this);
  }
  disconnectedCallback() {
    contextRegistry.contextRegistry.unregister(this);
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
    return (index.h("div", { id: "sisenseApp" }, index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "url": ["onUrlChange"]
  }; }
};

exports.sisense_app = SisenseApp;
