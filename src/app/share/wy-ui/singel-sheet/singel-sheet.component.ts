import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SongList } from 'src/app/service/data-types/common.type';

@Component({
  selector: 'app-singel-sheet',
  templateUrl: './singel-sheet.component.html',
  styleUrls: ['./singel-sheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingelSheetComponent implements OnInit {
  @Input() sheet: SongList;
  @Output() onPlay = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  playSheet(id: number) {
    this.onPlay.emit(id)
  }
}
