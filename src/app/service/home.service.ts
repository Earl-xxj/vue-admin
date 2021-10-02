import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Banner, HotTags, SongList } from './data-types/common.type';
import { API_CONFIG, ServiceModule } from './service.module';
import { map } from 'rxjs/internal/operators';

@Injectable({
  // providedIn: 'root'// root 默认是 appModule 
    providedIn: ServiceModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private baseUrl: string) { }

  //获取轮播图
  getBanner() : Observable<Banner[]> {
    return this.http.get(`${this.baseUrl}/banner`)
    .pipe(map((res: { banners: Banner[]}) => res.banners));
  }

  // 获取热门标签
  getHotTags() :Observable<HotTags[]> {
    return this.http.get(`${this.baseUrl}/playlist/hot`)
    .pipe(map((res: { tags: HotTags[]}) => {
      return res.tags.sort((x, y) => x.position - y.position).slice(0, 5)
    }))
  }

  // 获取推荐歌单
  getPersonalized(num = 16) :Observable<SongList[]> {
    return this.http.get(`${this.baseUrl}/personalized?limit=${num}`)
    .pipe(map((res: { result: SongList[]}) => res.result))
  }
}
