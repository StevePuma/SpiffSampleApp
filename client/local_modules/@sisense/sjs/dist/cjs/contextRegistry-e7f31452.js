'use strict';

/**
 * This allows Sisense elements to communicate with each other without
 * exposing public methods on the elements themselves
 */
function createInternalRegistry() {
  const providers = new Map([]);
  const register = (contextProvider) => {
    providers.set(contextProvider.el, contextProvider);
  };
  const unregister = (contextProvider) => {
    providers.delete(contextProvider.el);
  };
  const withNearestContext = (contextConsumer, ancestorTagName, cb) => {
    const ancestorEl = contextConsumer.el.closest(ancestorTagName);
    if (!ancestorEl) {
      throw new Error(`contextRegistry: ${getTagName(contextConsumer)}: Unable to locate ancestor ${ancestorTagName}`);
    }
    const provider = providers.get(ancestorEl);
    if (!provider) {
      throw new Error(`contextRegistry: ${getTagName(contextConsumer)}: Unable to locate provider via ${ancestorTagName}`);
    }
    return provider._getContext().then(cb);
  };
  return {
    register,
    unregister,
    withNearestContext,
  };
}
const contextRegistry = createInternalRegistry();
const getTagName = ({ el }) => el === null || el === void 0 ? void 0 : el.tagName.toLowerCase();

exports.contextRegistry = contextRegistry;
