import ItemAction, {default as PayloadAction, DELETE_ITEM} from './app.actions';

import { Item } from './item.model';
import { AppState, initializeState } from './app.state';
import * as AppActions from './app.actions';
import { Action } from '@ngrx/store';

const initialState = initializeState();

// State reference
// AppState = {
//   entities: {};
//   backlog: number[];
//   doing: number[];
//   done: number[];
// }
///////////////////////


export function AppReducer(state: AppState = initialState, action: Action) {
  switch (action.type) {

    /**
     * Item entities
     */
    case AppActions.CREATE_ITEM:

      const newEntities = JSON.parse(JSON.stringify(state.entities));

      const item = (action as PayloadAction<Item>).payload;
      const key = item.id;
      newEntities[key] = item;

      return {
        ...state,
        entities: newEntities
      };

    case AppActions.GET_ITEM:
      const id = (action as PayloadAction<Item>).payload;
      return { ...state, Loaded: false, Loading: true };


    /**
     * Backlog list
     */
    case AppActions.ADD_BACKLOG:
      const newBacklog = JSON.parse(JSON.stringify(state.backlog));
      const toAddBacklog = (action as PayloadAction<number>).payload;
      if (newBacklog.indexOf(toAddBacklog) === -1) {
        newBacklog.push(toAddBacklog);
      }


      return {
        ...state,
        backlog: newBacklog
      };

    case AppActions.REM_BACKLOG:
      const idToRemove = (action as PayloadAction<number>).payload;
      return {
        ...state,
        backlog: state.backlog.filter((elem) => elem !== idToRemove)
      };

    /**
     * Doing list
     */
    case AppActions.ADD_DOING:
      const newDoing = JSON.parse(JSON.stringify(state.doing))
      const toAddDoing = (action as PayloadAction<number>).payload;
      if (newDoing.indexOf(toAddDoing) === -1) {
        newDoing.push(toAddDoing);
      }
      console.log('DOING')
      console.log(newDoing)

      return {
        ...state,
        doing: newDoing
      };

    case AppActions.REM_DOING:
      const idToRemoveDoing = (action as PayloadAction<number>).payload;
      return {
        ...state,
        doing: state.doing.filter((elem) => elem !== idToRemoveDoing)
      };

    /**
     * Done list
     */
    case AppActions.ADD_DONE:
      const newDone = JSON.parse(JSON.stringify(state.done));
      const toAddDone = (action as PayloadAction<number>).payload
      if (newDone.indexOf(toAddDone) === -1) {
        newDone.push(toAddDone);
      }

      return {
        ...state,
        done: newDone
      };

    case AppActions.REM_DONE:
      const idToRemoveDone = (action as PayloadAction<number>).payload;
      return {
        ...state,
        done: state.done.filter((elem) => elem !== idToRemoveDone)
      };


    default:
      return state;
  }
}
