import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { map, pluck, tap, filter, distinctUntilChanged, takeUntil } from 'rxjs/internal/operators';
import { inArray } from 'src/app/utils/array';
import { limitNumInRange } from 'src/app/utils/number';
import { sliderEvent, getElementOffset } from './wy-slider-helper';
import { SilderEventObserverConfig } from './wy-slider-type';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderComponent implements OnInit {
  @Input() wyVertical = false;
  @Input() wyMin = 0;
  @Input() wyMax = 100;
  @ViewChild('wySlider', { static: true }) private wySlider: ElementRef;
  private sliderDom: HTMLDivElement;
  private startEvent$: Observable<number>;
  private moveEvent$: Observable<number>;
  private endEvent$: Observable<Event>;
  constructor(@Inject(DOCUMENT) private Doc: Document) {
    
  }

  ngOnInit() {
    this.sliderDom = this.wySlider.nativeElement;
    // console.log('el', this.wySlider.nativeElement)
    this.createDraggingObservables();
    this.subscribeStart(['start']);
  }

  /**
   * 滑块 slider 需要绑定的事件：
   * pc： mousedowm、 mousemove、 mouseup |event.pageX || event.pageY
   * mobile：touchstart、 touchmove、touchend | event.touches[0].pageX || event.touches[0]pageY
   */
  private createDraggingObservables () {
    const orientFiled = this.wyVertical ? 'pageY' : 'pageX';
    const mouse: SilderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientFiled]
    };
    const touch: SilderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: ['touches','0',orientFiled]
    };

    [mouse, touch].forEach(source => {
      const { start, move, end, filter:filterFunc, pluckKey } = source;
      source.startPlucked$ = fromEvent(this.sliderDom, start)
      .pipe(
        filter(filterFunc),
        tap(sliderEvent),
        pluck(...pluckKey),
        map((position: number) => this.findCloseValue(position))
      );

      source.end$ = fromEvent(this.Doc, end);
      source.moveResolve$ = fromEvent(this.Doc, move)
      .pipe(
        filter(filterFunc), 
        tap(sliderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.findCloseValue(position)),
        takeUntil(source.end$)
      );
    });

    this.startEvent$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.moveEvent$ = merge(mouse.moveResolve$, touch.moveResolve$);
    this.endEvent$ = merge(mouse.end$, touch.end$);
  }

  private findCloseValue(position: number): number {
    // 获取滑块silder 总长度
    const sliderWid = this.getSliderWid();
    // 获取slider 滑块 左端点/上端点的位置 position
    const silderSatrt = this.getSliderStartPosition();
    // 滑块当前位置 / 滑块总长
    let ratio = (position  - silderSatrt) / sliderWid;
    ratio = limitNumInRange(ratio, 0,1);
    const ratioReal = this.wyVertical ? 1 - ratio : ratio;
    /**
     * position / 滑块长度 === (val -min) / (max - min)
     * vs
     * ratio === (val - min) / (max - min)
     */
    return (this.wyMax - this.wyMin) * ratioReal + this.wyMin
  }

  private getSliderWid(): number {
    return this.wyVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth;
  }

  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.wyVertical ? offset.top : offset.left;
  }

  private subscribeStart(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.startEvent$) {
      this.startEvent$.subscribe(this.onDragStart.bind(this));
    }
    if (inArray(events, 'move') && this.moveEvent$) {
      this.moveEvent$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'end') && this.endEvent$) {
      this.endEvent$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private onDragStart(value: number) {
    console.log(value, 'val')
  }
  private onDragMove(value: number) {

  }
  private onDragEnd() {

  }
}
