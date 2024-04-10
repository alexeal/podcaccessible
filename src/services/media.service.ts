import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Media } from '../models/media.model';
import PodcastsData from "../data/podcasts.json";
import VideosData from "../data/videos.json";

@Injectable({
  providedIn: 'root',
})
export class MediaService {

  constructor(private http: HttpClient) { }

  private sortData(data : typeof PodcastsData | typeof VideosData): void {
    if(JSON.stringify(data).length > 2) {
      data.sort(function (a: any, b: any) {
        return a.title && b.title && a.title.localeCompare(b.title);
      });
    }
  }

  public getPodcasts(): Observable<Media> {
    this.sortData(PodcastsData);
    return of(PodcastsData).pipe(
      map((res) => { return <Media><unknown>res; })
    );
  }

  public getVideos(): Observable<Media> {
    this.sortData(VideosData);
    return of(VideosData).pipe(
      map((res) => { return <Media><unknown>res; })
    );
  }

}