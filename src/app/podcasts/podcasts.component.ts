import { Component } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Observable } from 'rxjs';
import { Media } from '../../models/media.model';
import { CommonModule } from '@angular/common';
import { MediaSource } from '../../models/source.model';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.scss'
})
export class PodcastsComponent {
  podcasts$: Observable<Media>;
  constructor(private mediaService: MediaService) {
    this.podcasts$ = this.mediaService.getPodcasts();
  }
  hasLink(sources: Array<MediaSource>) {
    return sources.some(e => e.type === 'link');
  }
}
