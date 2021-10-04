import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WysliderStyle } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider-track',
  template: `<div class="wy-slider-track" [style]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderTrackComponent implements OnInit, OnChanges {
  @Input() wyVertical = false;
  @Input() wyLength: number;
  style: WysliderStyle = {}
  constructor() { }
  

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wyLength']) {
      if (this.wyVertical) {
        this.style.height = this.wyLength + '%';
        this.style.left = 'none';
        this.style.width = 'none';
      } else {
        this.style.width = this.wyLength + '%';
        this.style.bottom = 'none';
        this.style.height = 'none';
      }
      this.style[this.wyVertical ? 'bottom' : 'left'] = this.wyLength + '%';
    }
    throw new Error('Method not implemented.');
  }
}
