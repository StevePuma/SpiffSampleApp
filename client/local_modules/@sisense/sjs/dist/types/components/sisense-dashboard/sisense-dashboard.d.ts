import { EventEmitter } from '../../stencil-public-runtime';
import { DashboardModel, DataSource, Filter } from '../../types';
export declare class SisenseDashboard {
  el: HTMLElement;
  /**
   * The ID of an existing dashboard - if omitted, a "blank" temporary dashboard is created instead
   */
  oid?: string;
  /**
   * Datasource used for a "blank" dashboard
   */
  datasource?: DataSource;
  dashboardContext: any;
  /**
   * Fires when filters are changed
   */
  filtersChanged: EventEmitter<{
    items: Filter[];
    type: 'add' | 'remove' | 'update';
  }>;
  /**
   * Fires when dashboard has refreshed
   */
  refreshed: EventEmitter;
  /**
   * Fires when dashboard has loaded
   */
  loaded: EventEmitter;
  loadDashboard(): Promise<void>;
  _getContext(): Promise<any>;
  getModel(): Promise<DashboardModel>;
  applyFilters(filters: Filter[]): Promise<void>;
  removeFilters(filters: Filter[]): Promise<void>;
  clearFilters(): Promise<void>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  refresh(): Promise<void>;
  render(): any;
}
