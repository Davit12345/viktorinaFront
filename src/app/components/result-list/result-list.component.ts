import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
})
export class ResultListComponent implements OnInit {
  @Input() resultList: any

  constructor() {
  }

  ngOnInit() {
  }

}
