import { HighchartsChart, WidgetModel } from '../../types';
export declare class SisenseWidget {
  private widgetHandle;
  private widgetContext;
  getHighchartsChart(): Promise<HighchartsChart>;
  el: HTMLElement;
  _getContext(): Promise<any>;
  /**
   * @returns An object with readonly attributes that describe a widget. Based off of https://sisense.dev/reference/js/widget/.
   */
  getModel(): Promise<WidgetModel>;
  /**
   * The ID of an existing widget
   */
  oid: string;
  idUpdatedHandler(): void;
  /**
   * The width of the widget
   */
  width: number;
  widthUpdatedHandler(): void;
  /**
   * The height of the widget
   */
  height: number;
  heightUpdatedHandler(): void;
  /**
   * Fires during the widget's native result processing. Allows for
   * customization of the result being rendered. "reason" specifies the event
   * that caused this to fire (e.g. "dashboardrefreshed").
   */
  private processResult;
  /**
   * Fires when widget has finished rendering.
   */
  private ready;
  /**
   * Fires before the query is executed.
   */
  private beforeQuery;
  /**
   * Fires when widget is loaded into the dashboard object.
   */
  private loaded;
  connectedCallback(): void;
  disconnectedCallback(): void;
  loadWidget(): Promise<void>;
  free(): void;
  render(): any;
}
