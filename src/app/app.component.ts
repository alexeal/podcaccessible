import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MediaService } from '../services/media.service';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    ToggleSwitchComponent,
    BreadcrumbComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MediaService
  ],
})
export class AppComponent {

}
