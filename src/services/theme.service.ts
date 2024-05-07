import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkMode = false;

  get darkMode(): boolean {
    return this._darkMode;
  }

  toggleTheme(): void {
    this._darkMode = !this._darkMode;
    this.updateTheme();
  }

  updateTheme(): void {
    if (this._darkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem("theme", "dark-theme");
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem("theme", "default");
    }
  }

  getCurrentTheme(): void {
    if (localStorage.getItem("theme") && localStorage.getItem("theme") === "dark-theme") {
      this._darkMode = true;
    } else {
      this._darkMode = false;
    }
    this.updateTheme();
  }
}
