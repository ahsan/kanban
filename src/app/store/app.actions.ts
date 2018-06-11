import { Action } from '@ngrx/store';
import { Item } from './item.model';

// Extend @ngrx's Action to contain payload
export default interface PayloadAction<T> extends Action {
  payload: T;
}


/**
 * Item entities
 */
export const CREATE_ITEM = '[Item] Create';
export const GET_ITEM =    '[Item] Read';
export const DELETE_ITEM = '[Item] Delete';

export class CreateItem implements PayloadAction<Item> {
  readonly type = CREATE_ITEM;
  payload: Item;

  constructor(payload: Item) {
    this.payload = payload;
  }
}

export class GetItem implements PayloadAction<number> {
  readonly type = GET_ITEM;
  payload: number;
  constructor(itemId: number) { this.payload = itemId; }
}


/**
 * Backlog list
 */
export const ADD_BACKLOG = '[Item] Add to backlog';
export const REM_BACKLOG = '[Item] Remove from backlog';

export class AddToBacklog implements PayloadAction<number> {
  readonly type = ADD_BACKLOG;
  payload: number;
  constructor(itemId: number) { this.payload = itemId; }
}

export class RemoveFromBacklog implements Action {
  readonly type = REM_BACKLOG;
  payload: number;
  constructor(itemId: number) { this.payload = itemId; }
}


/**
 * Doing list
 */
export const ADD_DOING =   '[Item] Add to doing';
export const REM_DOING =   '[Item] Remove from doing';

export class AddToDoing implements PayloadAction<number> {
  readonly type = ADD_DOING;
  payload: number;
  constructor(itemId: number) { this.payload = itemId; }
}

export class RemoveFromDoing implements Action {
  readonly type = REM_DOING;
  payload: number;
  constructor(itemId: number) { this.payload = itemId; }
}

/**
 * Done list
 */
export const ADD_DONE =    '[Item] Add to done';
export const REM_DONE =    '[Item] Remove from done';

export class AddToDone implements PayloadAction<number> {
  readonly type = ADD_DONE;
  payload: number;
  constructor(itemId: number) { this.payload = itemId; }
}

export class RemoveFromDone implements Action {
  readonly type = REM_DONE;
  payload: number;
  constructor(itemId: number) { this.payload = itemId; }
}


// Export a type of all actions
export type AppActions = CreateItem | GetItem | AddToBacklog |
  RemoveFromBacklog | AddToDoing | RemoveFromDoing |
  AddToDone | RemoveFromDone;
