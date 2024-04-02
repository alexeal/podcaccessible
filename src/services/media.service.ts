import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Media } from '../models/media.model';
import PodcastsData  from "../data/podcasts.json";
import VideosData  from "../data/videos.json";

@Injectable({
  providedIn: 'root',
})
export class MediaService {

  constructor(private http: HttpClient) { }

  public getPodcasts(): Observable<Media> {
    return of(PodcastsData).pipe(
      map((res) => { return <Media><unknown>res; })
    );
  }

  public getVideos(): Observable<Media> {
    return of(VideosData).pipe(
      map((res) => { return <Media><unknown>res; })
    );
  }

}