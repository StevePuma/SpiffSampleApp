import { EventEmitter } from '../../stencil-public-runtime';
import { AppModel } from '../../types';
export declare class SisenseApp {
  el: HTMLElement;
  private appContext;
  /**
   * Base Sisense instance URL, e.g. https://sisense.example.com
   */
  url: string;
  /**
   * If true, persist filter changes
   */
  persist?: boolean;
  /**
   * Web access token
   */
  wat?: string;
  /**
   * Fires when the Sisense app has loaded
   */
  loaded: EventEmitter;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): void;
  onUrlChange(newUrl: any, oldUrl: any): void;
  loadSisenseJS(): void;
  logout(): Promise<void>;
  _getContext(): Promise<any>;
  getModel(): Promise<AppModel>;
  loadSisense(): void;
  render(): any;
}
