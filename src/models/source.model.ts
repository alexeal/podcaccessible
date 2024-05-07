export interface MediaSource {
    type: string; // acceptable values: podcast, video, link
    url: string; // url
    accessDescription: string;
}