import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner, HotTags, Singer, SongList } from './data-types/common.type';
import { API_CONFIG, ServiceModule } from './service.module';
import { map } from 'rxjs/internal/operators';
import queryString from 'query-string'
type SingerParams = {
  offset: number;
  limit: number;
  cat?: number;
}

const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: 5001
}
@Injectable({
  // providedIn: 'root'// root 默认是 appModule 
    providedIn: ServiceModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private baseUrl: string) { }

  //获取入住歌手
  getEnterSinger(args: SingerParams = defaultParams) : Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) })
    return this.http.get(`${this.baseUrl}/artist/list`, { params })
    .pipe(map((res: { artists: Singer[]}) => res.artists));
  }
}
