import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Media } from '../../models/media.model';
import { MediaSource } from '../../models/source.model';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss'
})
export class PodcastsComponent {
  podcasts$: Observable<Array<Media>>;
  searchQuery$ = new BehaviorSubject<string>('');
  isSearching = false;
  constructor(private mediaService: MediaService, private activatedRoute: ActivatedRoute) {
    this.podcasts$ = combineLatest([
      this.searchQuery$,
      this.mediaService.getPodcasts()
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
