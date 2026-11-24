
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Work, WorkResponse } from '../models/work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private worksSubject = new BehaviorSubject<Work[]>([]);

  works$ = this.worksSubject.asObservable();

  addWork(description: string): void {

    const newWork: Work = {
      id: crypto.randomUUID(),
      description,
      createdAt: new Date(),
      responses: []
    };

    const currentWorks = this.worksSubject.value;

    this.worksSubject.next([
      newWork,
      ...currentWorks
    ]);
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

    this.worksSubject.next(updatedWorks);
  }
}
