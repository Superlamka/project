
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular';

import { WorkService } from '../services/work.service';
import { WorkCardComponent, ResponseSubmission } from '../components/work-card/work-card.component';
import {
  Work,
  WorkCategory,
  WORK_CATEGORIES
} from '../models/work.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    WorkCardComponent
  ]
})
export class Tab2Page {

  works$ = this.workService.works$;

  readonly categories = WORK_CATEGORIES;
  selectedCategory: WorkCategory | 'all' = 'all';


  constructor(private workService: WorkService) {}

  onResponseSubmitted(
    workId: string,
    response: ResponseSubmission
  ): void {

    this.workService.addResponse(
      workId,
      response.message,
      response.contactInfo
    );
  }

  selectCategory(category: WorkCategory | 'all'): void {
    this.selectedCategory = category;
  }

  getVisibleWorks(works: Work[]): Work[] {
    if (this.selectedCategory === 'all') {
      return works;
    }

    return works.filter(work => work.category === this.selectedCategory);
  }
}
