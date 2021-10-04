/**
 * 使用 resolve
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { map } from 'rxjs/internal/operators';
import { Banner, HotTags, SongList, Singer } from 'src/app/service/data-types/common.type';
import { SheetService } from 'src/app/service/sheet.service';


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
    private route: ActivatedRoute,
    private sheetServe: SheetService
    ) { 
      this.route.data.pipe(map(item => item.homeData)).subscribe(([banners,tags,songList,enterSingerList]) => {
        this.banners = banners;
        this.tags = tags;
        this.songList = songList;
        this.enterSingerList = enterSingerList;
      })
  }

  
  onPlaySheet(id: number) {
    console.log(id, 'oooo')
    // getSongSheetDetail
    this.sheetServe.playSheet(id).subscribe(res => {
      console.log(res, 'res')
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
