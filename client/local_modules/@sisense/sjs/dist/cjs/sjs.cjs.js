'use strict';

const index = require('./index-1daca150.js');

/*
 Stencil Client Patch Browser v2.15.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('sjs.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["sisense-app.cjs",[[4,"sisense-app",{"url":[1],"urlParams":[1],"persist":[4],"wat":[1],"appContext":[32],"logout":[64],"getModel":[64]}]]],["sisense-dashboard.cjs",[[4,"sisense-dashboard",{"oid":[1],"datasource":[16],"dashboardContext":[32],"getModel":[64],"applyFilters":[64],"removeFilters":[64],"clearFilters":[64],"refresh":[64]}]]],["sisense-filters.cjs",[[0,"sisense-filters",{"width":[2],"height":[2]}]]],["sisense-widget.cjs",[[0,"sisense-widget",{"oid":[1],"width":[2],"height":[2],"widgetContext":[32],"getHighchartsChart":[64],"getModel":[64]}]]]], options);
});
