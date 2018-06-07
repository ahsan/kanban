import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  backlogCards = [
    'one',
    'this is a long item',
  ];
  doingCards = [
  ];
  doneCards = [
  ];

  ngOnInit(): void {
  }

  moveToDoing(card) {
    console.log(card)
  }

  moveToDone(card) {
    console.log(card)
  }

}
