import type { Components, JSX } from "../types/components";

interface SisenseDashboard extends Components.SisenseDashboard, HTMLElement {}
export const SisenseDashboard: {
  prototype: SisenseDashboard;
  new (): SisenseDashboard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
