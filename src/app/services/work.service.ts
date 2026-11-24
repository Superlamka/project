
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Work, WorkResponse } from '../models/work.model';
import { WorkStorageService } from './storage/work-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private worksSubject: BehaviorSubject<Work[]>;

  works$;

  constructor(
    private workStorageService: WorkStorageService
  ) {

    // Load previously saved work when the service starts.
    const savedWorks = this.workStorageService.getWorks();

    this.worksSubject = new BehaviorSubject<Work[]>(savedWorks);

    this.works$ = this.worksSubject.asObservable();
  }

  addWork(description: string): void {

    const newWork: Work = {
      id: crypto.randomUUID(),
      description,
      createdAt: new Date(),
      responses: []
    };

    const currentWorks = this.worksSubject.value;

    const updatedWorks = [
      newWork,
      ...currentWorks
    ];

    this.updateWorks(updatedWorks);
  }

  addResponse(
    workId: string,
    message: string,
    contactInfo: string
  ): void {

    const newResponse: WorkResponse = {
      id: crypto.randomUUID(),
      message,
      contactInfo,
      createdAt: new Date()
    };

    const updatedWorks = this.worksSubject.value.map(work => {

      if (work.id !== workId) {
        return work;
      }

      return {
        ...work,
        responses: [
          ...work.responses,
          newResponse
        ]
      };
    });

    this.updateWorks(updatedWorks);
  }

  private updateWorks(works: Work[]): void {

    // Update application state.
    this.worksSubject.next(works);

    // Persist the updated data.
    this.workStorageService.saveWorks(works);
  }


  updateWork(workId: string, description: string): void {

    const updatedWorks = this.worksSubject.value.map(work => {

      if (work.id !== workId) {
        return work;
      }

      return {
        ...work,
        description
      };
    });

    this.updateWorks(updatedWorks);
  }


  deleteWork(workId: string): void {

    const updatedWorks = this.worksSubject.value.filter(
      work => work.id !== workId
    );

    this.updateWorks(updatedWorks);
  }


  clearWorks(): void {
  this.workStorageService.clearWorks();
  this.worksSubject.next([]);
  }
}
