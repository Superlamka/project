
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private worksSubject = new BehaviorSubject<string[]>([]);

  works$ = this.worksSubject.asObservable();

  addWork(work: string): void {
    const currentWorks = this.worksSubject.value;

    this.worksSubject.next([
      work,
      ...currentWorks
    ]);
  }
}
