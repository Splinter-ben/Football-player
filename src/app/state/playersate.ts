export enum StateStatus {
  LOADING,
  LOADED,
  ERROR,
}

export interface DataState<T> {
  dataStateStatus: StateStatus;
  dataState?: T;
  dataStateError?: string;
};
