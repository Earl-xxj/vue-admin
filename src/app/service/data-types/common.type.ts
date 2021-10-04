export type Banner = {
    imageUrl: String;
    url: String;
    targetId: Number;
}
//热门歌单分类
export type HotTags = {
    id: number;
    name: string;
    position: number;
}

// 歌手
export type Singer = { 
    id: number;
    name: string;
    albumSize: number;
    picUrl: string;
}
// 歌曲
export type Song = { 
    id: number;
    name: string;
    url: string;
    ar: Singer[]; //歌手的集合
    al: { //歌曲所在专辑
        id:number,
        name: string,
        picUrl: string
    };
    dt: number; // 歌曲总时长
}
// 歌单
export type SongList = {
    id: number;
    name: string;
    playCount: number; //播放量
    picUrl: string;
    tracks: Song[];
}
//歌曲播放地址
export type SongUrl = {
    id: number;
    url: string;
}