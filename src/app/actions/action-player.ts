export enum ActionPlayerType {
  GET_ALL_PLAYERS = '[PLAYERS] get all players',
  GET_ALL_PLAYER_SELECTED = '[PLAYERS] get all players selected',
  GET_ALL_PLAYER_SEARCH = '[PLAYERS] get all players search',
  NEW_PLAYER = '[PLAYER] get new player',
  ON_CHANGE_STATUS_PLAYER = '[PLAYER] on change status player',
  ON_EDIT_PLAYER = '[PLAYER] on edit player',
  ON_DELETE_PLAYER = '[PLAYER] on delete player',
}

export interface ActionPlayer<T> {
  type: ActionPlayerType;
  payload?: T;
}
