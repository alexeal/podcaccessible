import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Media } from '../models/media.model';
import MediasData from "../data/medias.json";

@Injectable({
  providedIn: 'root',
})
export class MediaService {

  constructor(private http: HttpClient) { }

  private sortData(data : typeof MediasData): void {
    if(JSON.stringify(data).length > 2) {
      data.sort(function (a: any, b: any) {
        return a.title && b.title && a.title.localeCompare(b.title);
      });
    }
  }

  private filterByMediaType(data : typeof MediasData, mediaType: string) {
    return data.filter(obj => obj['mediaType'] === mediaType);
  }

  public getPodcasts(): Observable<Media> {
    this.sortData(MediasData);
    return of(this.filterByMediaType(MediasData, 'podcast')).pipe(
      map((res) => { return <Media><unknown>res; })
    );
  }

  public getVideos(): Observable<Media> {
    this.sortData(MediasData);
    console.log(MediasData)
    return of(this.filterByMediaType(MediasData, 'video')).pipe(
      map((res) => { return <Media><unknown>res; })
    );
  }

}