export interface Song {
    title: string,
    channel: {
        name: string,
        url: string,
    },
    url: string,
    thumbnail: string,
}