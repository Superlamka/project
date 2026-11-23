
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonTextarea,
  IonButton
} from '@ionic/angular';

import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonTextarea,
    IonButton
  ]
})
export class Tab1Page {

  workDescription = '';

  constructor(private workService: WorkService) {}

  publishWork(): void {
    const description = this.workDescription.trim();

    if (!description) {
      return;
    }

    this.workService.addWork(description);

    this.workDescription = '';
  }
}
