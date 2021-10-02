import { Component, Input, OnInit } from '@angular/core';
import { SongList } from 'src/app/service/data-types/common.type';

@Component({
  selector: 'app-singel-sheet',
  templateUrl: './singel-sheet.component.html',
  styleUrls: ['./singel-sheet.component.less']
})
export class SingelSheetComponent implements OnInit {
  @Input() sheet: SongList;
  constructor() { }

  ngOnInit() {
  }

}
