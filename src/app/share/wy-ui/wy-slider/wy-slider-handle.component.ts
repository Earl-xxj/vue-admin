import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WysliderStyle } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider-handle',
  template: `<div class="wy-slider-handle" [style]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderHandleComponent implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyOffset: number;
  style: WysliderStyle = {}
  constructor() { }
  

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wyOffset']) {
      this.style[this.wyVertical ? 'bottom' : 'left'] = this.wyOffset + '%';
    }
    throw new Error('Method not implemented.');
  }

}
