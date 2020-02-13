/** used to set/get items to/from localState */
export enum LOCAL_STORAGE_KEYS {
  'ORGANIZATION_ID' = 'ORGANIZATION_ID',
  'PROJECT_ID' = 'PROJECT_ID',
  'TABLE_ROWS_PER_PAGE' = 'TABLE_ROWS_PER_PAGE',
}

export interface BooleanById {
  [id: string]: boolean;
}

export interface BooleanByIndex {
  [index: number]: boolean;
}

export interface GenericById<T> {
  [id: string]: T;
}

export interface GenericByIndex<T> {
  [id: string]: T;
}

export enum HUES {
  'red' = 'red',
  'orange' = 'orange',
  'purple' = 'purple',
  'pink' = 'pink',
  'green' = 'green',
  'yellow' = 'yellow',
  'blue' = 'blue',
  'monochrome' = 'monochrome',
}

export const HUE_VALUES: string[] = Object.keys(HUES).map(hue => hue);

export const DEFAULT_HUES = [HUES.red, HUES.orange, HUES.purple];