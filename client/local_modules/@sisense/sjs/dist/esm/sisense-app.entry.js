import { r as registerInstance, c as createEvent, h, g as getElement } from './index-ea7c00cc.js';
import { c as contextRegistry } from './contextRegistry-bf2b2681.js';

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
    registerInstance(this, hostRef);
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
    if (this.urlParams) {
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
    delete window["SisenseAppContext"];
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
    if(window['SisenseAppContext']){
      this.appContext = window['SisenseAppContext'];
      this.loaded.emit();
      return;
    }
    console.debug(`Sisense.connect('${this.url}', ${this.persist}, ${JSON.stringify(this.wat)})`);
    window['Sisense'].connect(this.url, this.persist, this.wat).then(app => {
      console.debug('Connected to', this.url);
      this.appContext = app;
      window['SisenseAppContext'] = app;
      this.loaded.emit();
    });
  }
  render() {
    return (h("div", { id: "sisenseApp" }, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "url": ["onUrlChange"]
  }; }
};

export { SisenseApp as sisense_app };
