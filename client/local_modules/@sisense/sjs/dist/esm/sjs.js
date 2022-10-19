import { p as promiseResolve, b as bootstrapLazy } from './index-ea7c00cc.js';

/*
 Stencil Client Patch Browser v2.15.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["sisense-app",[[4,"sisense-app",{"url":[1],"urlParams":[1],"persist":[4],"wat":[1],"appContext":[32],"logout":[64],"getModel":[64]}]]],["sisense-dashboard",[[4,"sisense-dashboard",{"oid":[1],"datasource":[16],"dashboardContext":[32],"getModel":[64],"applyFilters":[64],"removeFilters":[64],"clearFilters":[64],"refresh":[64]}]]],["sisense-filters",[[0,"sisense-filters",{"width":[2],"height":[2]}]]],["sisense-widget",[[0,"sisense-widget",{"oid":[1],"width":[2],"height":[2],"widgetContext":[32],"getHighchartsChart":[64],"getModel":[64]}]]]], options);
});
