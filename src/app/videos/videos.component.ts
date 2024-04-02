import { Component } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Observable } from 'rxjs';
import { Media } from '../../models/media.model';
import { MediaSource } from '../../models/source.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {
  videos$: Observable<Media>;
  constructor(private mediaService: MediaService) {
    this.videos$ = this.mediaService.getVideos();
  }
  hasLink(sources: Array<MediaSource>) {
    return sources.some(e => e.type === 'link');
  }
}
