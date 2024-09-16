import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, inject, LOCALE_ID } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Media } from '../../models/media.model';
import { MediaSource } from '../../models/source.model';
import { MediaService } from '../../services/media.service';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class PodcastsComponent {
  private mediaService: MediaService = inject(MediaService);

  podcasts$: Observable<Array<Media>>;
  searchQuery$ = new BehaviorSubject<string>('');
  searchEnabled$ = new BehaviorSubject<boolean | null>(null);
  isSearching = false;
  constructor() {
    this.podcasts$ = combineLatest([
      this.searchQuery$,
      this.searchEnabled$,
      this.mediaService.getPodcasts(),
    ]).pipe(
      map(([searchQuery, searchEnabled, data]) => {
        this.isSearching = searchQuery !== '' || searchEnabled === true;

        let dataFiltred = data;

        if (searchEnabled === true) {
          dataFiltred = dataFiltred.filter((x) => x['enabled'] === true);
        }

        return dataFiltred.filter((x) =>
          x['title']
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        );
      })
    );
  }
  hasLink(sources: Array<MediaSource>) {
    return sources.some((e) => e.type === 'link');
  }
  onSearchUpdated(searchQuery: string) {
    this.searchQuery$.next(searchQuery);
  }
  onFilterEnabled(searchEnabled: boolean | null) {
    this.searchEnabled$.next(searchEnabled);
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
