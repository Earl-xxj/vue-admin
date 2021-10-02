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


export type SongList = {
    id: number;
    name: string;
    playCount: number; //播放量
    picUrl: string;
}

export type Singer = {
    id: number;
    name: string;
    albumSize: number;
    picUrl: string;
}