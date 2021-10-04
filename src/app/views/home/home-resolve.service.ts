import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { forkJoin } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { first } from "rxjs/internal/operators";
import { Banner, HotTags, Singer, SongList } from "src/app/service/data-types/common.type";
import { HomeService } from "src/app/service/home.service";
import { SingerService } from "src/app/service/singer.service";

type HomeDataType = [Banner[], HotTags[], SongList[], Singer[]];

@Injectable()

export class HomeResolveService implements Resolve<HomeDataType> {
  constructor(
      private serve: HomeService, 
      private singerServe: SingerService
    ) {}

  resolve(): Observable<HomeDataType>|Promise<any>|any {
      return forkJoin([
        this.serve.getBanner(),
        this.serve.getHotTags(),
        this.serve.getPersonalized(),
        this.singerServe.getEnterSinger()
      ]).pipe(first());
  }
}