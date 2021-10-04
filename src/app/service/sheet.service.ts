import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Banner, HotTags, Singer, Song, SongList } from './data-types/common.type';
import { API_CONFIG, ServiceModule } from './service.module';
import { map, pluck, switchMap } from 'rxjs/internal/operators';
import queryString from 'query-string'
import { SongService } from './song.service';

@Injectable({
  // providedIn: 'root'// root 默认是 appModule 
    providedIn: ServiceModule
})
export class SheetService {

  constructor(
    private http: HttpClient, 
    @Inject(API_CONFIG) private baseUrl: string,
    private songServe: SongService
  ) { }

  //获取歌单详情
  getSongSheetDetail(id: number): Observable<SongList> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get(`${this.baseUrl}/playlist/detail`, { params })
    .pipe(map((res: { playlist: SongList}) => res.playlist));
  }

  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id)
    .pipe(pluck('tracks'), switchMap(tracks => this.songServe.getSongList(tracks)))
  }
}
