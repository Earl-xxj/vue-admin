import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner, HotTags, Singer, SongList, SongUrl, Song } from './data-types/common.type';
import { API_CONFIG, ServiceModule } from './service.module';
import { map } from 'rxjs/internal/operators';


@Injectable({
  // providedIn: 'root'// root 默认是 appModule 
    providedIn: ServiceModule
})
export class SongService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private baseUrl: string) { }

  //获取歌曲播放地址
  getSongUrl(ids: string) : Observable<SongUrl[]> {
    // const params = new HttpParams({ fromString: queryString.stringify(ids) })
    const params = new HttpParams().set('id', ids);
    return this.http.get(`${this.baseUrl}/song/url`, { params })
    .pipe(map((res: { data: SongUrl[]}) => res.data));
  }

  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const idstr = songArr.map(item => item.id).join(',');
    return this.getSongUrl(idstr).pipe(map(urls => this.generateSongList(songArr, urls)));
    // return Observable.create(observer => {
    //   this.getSongUrl(idstr).subscribe(urls => {
    //     observer.next(this.generateSongList(songArr, urls));
    //   })
    // })
  }

  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result = [];
    songs.forEach(item => {
      const url = urls.find(url => url.id === item.id).url;

      if (url) {
        result.push({ ...item, url })
      }
    });
    return result;
  }
}
