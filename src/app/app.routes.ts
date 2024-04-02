import { RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { PodcastComponent } from './podcasts/podcast/podcast.component';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './videos/video/video.component';
import { HomeComponent } from './home/home.component';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
    constructor(private readonly title: Title) {
        super();
    }

    override updateTitle(routerState: RouterStateSnapshot) {
        const title = this.buildTitle(routerState);
        if (title !== undefined) {
            this.title.setTitle(`Podcaccessible | ${title}`);
        }
    }
}

export const routes: Routes = [
    { path: 'home', component: HomeComponent, title: 'Accueil' },
    {
        path: 'podcasts', component: PodcastsComponent, title:'Podcasts',
        children: [
            { path: 'podcast', component: PodcastComponent }
        ]
    },
    {
        path: 'videos', component: VideosComponent, title:'Videos',
        children: [
            { path: 'podcast', component: VideoComponent }
        ]
    },
    { path: '', component: HomeComponent, title:'Accueil'}
];
