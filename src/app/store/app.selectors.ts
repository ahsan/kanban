import {createFeatureSelector, createSelector} from '@ngrx/store';

export const getState = createFeatureSelector<object>('kanban');

export const getEntities = createSelector(
  getState,
  (state) => {
    return state.entities;
  }
);

export const getBacklogIdsList = createSelector(
  getState,
  (state) => {
    console.log('BL: ', state.backlog)
    return state.backlog;
  }
);

export const getDoingIdsList = createSelector(
  getState,
  (state) => {
    return state.doing;
  }
);

export const getDoneIdsList = createSelector(
  getState,
  (state) => {
    return state.done;
  }
);

export const getBacklog = createSelector(
  getEntities,
  getBacklogIdsList,
  (entities, backlog) => {
    console.log('Entities: ', entities)
    console.log('backlog: ', backlog)
    const retArr = [];
    for (const id of backlog) {
      retArr.push(entities[id]);
    }
    console.log('BACKLOG')
    console.log(retArr)
    return retArr;
  }
);

export const getDoing = createSelector(
  getEntities,
  getDoingIdsList,
  (entities, doing) => {
    const retArr = [];
    for (const id of doing) {
      retArr.push(entities[id]);
    }
    return retArr;
  }
);

export const getDone = createSelector(
  getEntities,
  getDoneIdsList,
  (entities, done) => {
    const retArr = [];
    for (const id of done) {
      retArr.push(entities[id]);
    }
    return retArr;
  }
);
