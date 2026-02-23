import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private themeSubject: BehaviorSubject<Theme>;
  public theme$: Observable<Theme>;

  constructor() {
    // Get saved theme or default to light
    const savedTheme = this.getSavedTheme();
    this.themeSubject = new BehaviorSubject<Theme>(savedTheme);
    this.theme$ = this.themeSubject.asObservable();
    
    // Apply initial theme
    this.applyTheme(savedTheme);
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme(): void {
    const newTheme: Theme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Set specific theme
   */
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.saveTheme(theme);
    this.applyTheme(theme);
  }

  /**
   * Check if dark theme is active
   */
  isDarkTheme(): boolean {
    return this.themeSubject.value === 'dark';
  }

  /**
   * Apply theme to document body
   */
  private applyTheme(theme: Theme): void {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  /**
   * Get saved theme from localStorage
   */
  private getSavedTheme(): Theme {
    const saved = localStorage.getItem(this.THEME_KEY);
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  }
}

