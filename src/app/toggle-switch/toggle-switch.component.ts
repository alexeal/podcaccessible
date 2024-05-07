import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.themeService.getCurrentTheme();
    this.isDarkMode = this.themeService.darkMode;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.code && event.code === 'Space') {
      this.themeService.toggleTheme();
    }
  }
}
