import type { Components, JSX } from "../types/components";

interface SisenseWidget extends Components.SisenseWidget, HTMLElement {}
export const SisenseWidget: {
  prototype: SisenseWidget;
  new (): SisenseWidget;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
