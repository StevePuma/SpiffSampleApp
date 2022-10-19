import type { Components, JSX } from "../types/components";

interface SisenseFilters extends Components.SisenseFilters, HTMLElement {}
export const SisenseFilters: {
  prototype: SisenseFilters;
  new (): SisenseFilters;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
