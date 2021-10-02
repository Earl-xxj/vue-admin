import { Component, Input, OnInit, Output, TemplateRef, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {

  @Input() activeIdx = 0;
  // static: 静态视图
  @ViewChild('dot', {static: true}) dotRef: TemplateRef<any>;

  @Output() changeSlide = new EventEmitter<'pre' | 'next'>();

  constructor() { }

  ngOnInit() {
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type);
  }
}
