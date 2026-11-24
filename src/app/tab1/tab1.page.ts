
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  AlertController
} from '@ionic/angular';

import { PublishWorkComponent } from '../components/publish-work/publish-work.component';

import { CustomerWorkCardComponent } from '../components/customer-work-card/customer-work-card.component';

import { WorkService } from '../services/work.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PublishWorkComponent,
    CustomerWorkCardComponent
  ]
})
export class Tab1Page {

  works$ = this.workService.works$;

  constructor(
    private workService: WorkService,
    private alertController: AlertController
  ) {}

  onWorkPublished(description: string): void {
    this.workService.addWork(description);
  }


  onWorkUpdated(
    update: { id: string; description: string }
  ): void {

    this.workService.updateWork(
      update.id,
      update.description
    );
  }

  async confirmDelete(workId: string): Promise<void> {

    const alert = await this.alertController.create({
      header: 'Delete work?',
      message: 'Are you sure you want to delete this work and all its responses?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.workService.deleteWork(workId);
          }
        }
      ]
    });

    await alert.present();
  }
}
