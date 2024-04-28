import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Media } from '../models/media.model';
import MediasJsonData from "../data/medias.json";

@Injectable({
  providedIn: 'root',
})
export class MediaService {

  constructor(private http: HttpClient) { }
  private medias: Array<Media> = [];

  private setMediasListFromJson(data: typeof MediasJsonData, mediaType: string): void {
    if (JSON.stringify(data).length > 2) {
      data.sort(function (a: any, b: any) {
        return a.title && b.title && a.title.localeCompare(b.title);
      });
    }
    data = data.filter(obj => obj['mediaType'] === mediaType);
    for (const iterator of data) {
      this.medias.push(<Media><unknown>iterator);
    }
  }

  public getPodcasts(): Observable<Array<Media>> {
    this.medias = []; // reset data
    this.setMediasListFromJson(MediasJsonData, 'podcast');
    return of(this.medias);
  }

  public getVideos(): Observable<Array<Media>> {
    this.medias = []; // reset data
    this.setMediasListFromJson(MediasJsonData, 'video');
    return of(this.medias);
  }

}