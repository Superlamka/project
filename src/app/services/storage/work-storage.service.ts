
import { Injectable } from '@angular/core';

import { Work } from '../../models/work.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class WorkStorageService {

  private readonly storageKey = 'works';

  constructor(private storageService: StorageService) {}

  getWorks(): Work[] {

    const works = this.storageService.get<Work[]>(
      this.storageKey
    );

    if (!works) {
      return [];
    }

    // JSON does not preserve Date objects.
    // Convert date strings back into Date instances.
    return works.map(work => ({
      ...work,
      createdAt: new Date(work.createdAt),
      responses: (work.responses ?? []).map(response => ({
        ...response,
        createdAt: new Date(response.createdAt)
      }))
    }));
  }

  saveWorks(works: Work[]): void {
    this.storageService.set(this.storageKey, works);
  }

  clearWorks(): void {
    this.storageService.remove(this.storageKey);
  }
}
