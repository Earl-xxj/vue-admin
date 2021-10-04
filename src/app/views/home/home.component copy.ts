/**
 * 未使用 resolve
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { map } from 'rxjs/internal/operators';
import { Banner, HotTags, SongList, Singer } from 'src/app/service/data-types/common.type';
import { HomeService } from 'src/app/service/home.service';
import { SingerService } from 'src/app/service/singer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  banners: Banner[];
  tags: HotTags[];
  songList: SongList[];
  enterSingerList: Singer[];
  carouselActiveIdx = 0;
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;
  constructor(
    private serve: HomeService, 
    private singerServe: SingerService,
    ) { 
    this.getBanner();
    this.getHotTags();
    this.getPersonalized();
    this.getEnterSingers();
  }
  //获取轮播图
  getBanner() {
    this.serve.getBanner().subscribe(banners => {
      console.log('banners', banners);
      this.banners = banners;
    })
  }
  // 获取热门标签
  getHotTags() {
    this.serve.getHotTags().subscribe(res => {
      console.log('getHotTags', res);
      this.tags = res;
    })
  }
  // 获取推荐歌单
  getPersonalized() {
    this.serve.getPersonalized().subscribe(res => {
      console.log('getPersonalized', res);
      this.songList = res;
    })
  }
  getEnterSingers() {
    this.singerServe.getEnterSinger().subscribe(res => {
      console.log(res,'singer')
      this.enterSingerList = res;
    })
  }
  ngOnInit() {
  }
  // 轮播切换
  onBeforeChange({to}) {
    this.carouselActiveIdx = to;
  }
  // 轮播左右箭头切换
  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

}
