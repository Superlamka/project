
import { Component } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/angular';

import { PublishWorkComponent } from '../components/publish-work/publish-work.component';
import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PublishWorkComponent
  ]
})
export class Tab1Page {

  constructor(private workService: WorkService) {}

  onWorkPublished(description: string): void {
    this.workService.addWork(description);
  }
}
