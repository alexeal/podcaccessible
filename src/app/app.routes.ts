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
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        title: 'Accueil', 
        data: { breadcrumb: 'Accueil' },
        component: HomeComponent,
        children: [
            {
                path: 'podcasts',
                title: 'Podcasts',
                data: { breadcrumb: 'Podcasts' },
                component: PodcastsComponent,
                children: [
                    { path: 'podcast', data: { breadcrumb: 'Podcast' }, component: PodcastComponent }
                ]
            },
            {
                path: 'videos',
                title: 'Videos',
                data: { breadcrumb: 'Vidéos' },
                component: VideosComponent,
                children: [
                    { path: 'video', data: { breadcrumb: 'Video' }, component: VideoComponent }
                ]
            }
        ]
    }
];
