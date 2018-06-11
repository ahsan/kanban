///<reference path="store/app.actions.ts"/>
import { Component, OnInit } from '@angular/core';
import { Item } from './store/item.model';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { Observable } from 'rxjs';
import { getBacklog, getDoing, getDone, getEntities } from './store/app.selectors';
import {
  ADD_BACKLOG, ADD_DOING, ADD_DONE, CREATE_ITEM, CreateItem, default as PayloadAction, REM_BACKLOG, REM_DOING,
  REM_DONE
} from './store/app.actions';
import {DialogComponent} from './dialog/dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentCardNum = 0;
  itemEntities$: Observable<object>;
  backlogList$: Observable<Item[]>;
  doingList$: Observable<Item[]>;
  doneList$: Observable<Item[]>;



  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.itemEntities$ = this.store.select(getEntities);
    this.backlogList$ = this.store.select(getBacklog);
    this.doingList$ = this.store.select(getDoing);
    this.doneList$ = this.store.select(getDone);

    this.createItem('First');
    this.createItem('Second');
    this.moveToBacklog(0);
    this.moveToBacklog(1);
    this.moveToDoing(0);
    this.moveToDone(1);

  }

  createItem(text: string) {
    const card = {
      id: this.currentCardNum++,
      text: text
    };
    const createItemAction: PayloadAction<Item> = {
      type: CREATE_ITEM,
      payload: card
    };
    this.store.dispatch(createItemAction);
    this.moveToBacklog(card.id);
    return card;
  }

  moveToBacklog(id: number) {
    const addBacklog: PayloadAction<number> = { type: ADD_BACKLOG, payload: id };
    const remDoing: PayloadAction<number> = { type: REM_DOING, payload: id };
    const remDone: PayloadAction<number> = { type: REM_DONE, payload: id };
    this.store.dispatch(addBacklog);
    this.store.dispatch(remDoing);
    this.store.dispatch(remDone);
  }

  moveToDoing(id: number) {
    const remBacklog: PayloadAction<number> = { type: REM_BACKLOG, payload: id };
    const addDoing: PayloadAction<number> = { type: ADD_DOING, payload: id };
    const remDone: PayloadAction<number> = { type: REM_DONE, payload: id };
    this.store.dispatch(remBacklog);
    this.store.dispatch(addDoing);
    this.store.dispatch(remDone);
  }

  moveToDone(id: number) {
    const remBacklog: PayloadAction<number> = { type: REM_BACKLOG, payload: id };
    const remDoing: PayloadAction<number> = { type: REM_DOING, payload: id };
    const addDone: PayloadAction<number> = { type: ADD_DONE, payload: id };
    this.store.dispatch(remBacklog);
    this.store.dispatch(remDoing);
    this.store.dispatch(addDone);
  }


  /**
   * Dialog
   */

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { text: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createItem(result);
    });
  }

}
