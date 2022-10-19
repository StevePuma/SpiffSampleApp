import type { Components, JSX } from "../types/components";

interface SisenseApp extends Components.SisenseApp, HTMLElement {}
export const SisenseApp: {
  prototype: SisenseApp;
  new (): SisenseApp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
