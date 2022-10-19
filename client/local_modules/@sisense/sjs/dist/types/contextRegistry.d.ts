export declare type ContextProvider = {
  el: Element;
  _getContext: () => Promise<any>;
};
export declare type ContextConsumer = {
  el: Element;
};
export declare const contextRegistry: {
  register: (contextProvider: ContextProvider) => void;
  unregister: (contextProvider: ContextProvider) => void;
  withNearestContext: (contextConsumer: ContextConsumer, ancestorTagName: string, cb: (context: any) => any) => Promise<any>;
};
export declare const getTagName: ({ el }: ContextConsumer | ContextProvider) => string;
