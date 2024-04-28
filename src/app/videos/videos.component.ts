import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Media } from '../../models/media.model';
import { MediaSource } from '../../models/source.model';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {
  videos$: Observable<Array<Media>>;
  searchQuery$ = new BehaviorSubject<string>('');
  isSearching = false;
  constructor(private mediaService: MediaService) {
    this.videos$ = combineLatest([
      this.searchQuery$,
      this.mediaService.getVideos()
    ])
      .pipe(
        map(
          ([searchQuery, data]) => {
            this.isSearching = searchQuery !== '';
            return data.filter(x => x['title'].toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
          }
        )
      );
  }
  hasLink(sources: Array<MediaSource>) {
    return sources.some(e => e.type === 'link');
  }
  onSearchUpdated(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
