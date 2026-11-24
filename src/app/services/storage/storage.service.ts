
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  private readonly prefix = 'artisan-marketplace:';

  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(this.prefix + key);

      if (value === null) {
        return null;
      }

      return JSON.parse(value) as T;

    } catch (error) {
      console.error('Error reading local storage:', error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(
        this.prefix + key,
        JSON.stringify(value)
      );

    } catch (error) {
      console.error('Error writing to local storage:', error);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}
