
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput
} from '@ionic/angular';

import { Work } from '../../models/work.model';

export interface ResponseSubmission {
  message: string;
  contactInfo: string;
}

@Component({
  selector: 'app-work-card',
  standalone: true,
  templateUrl: './work-card.component.html',
  styleUrls: ['./work-card.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput
  ]
})
export class WorkCardComponent {

  @Input() work!: Work;

  @Output() responseSubmitted =
    new EventEmitter<ResponseSubmission>();

  showResponseForm = false;

  responseMessage = '';
  contactInfo = '';

  toggleResponseForm(): void {
    this.showResponseForm = !this.showResponseForm;
  }

  submitResponse(): void {

    const message = this.responseMessage.trim();
    const contact = this.contactInfo.trim();

    if (!message || !contact) {
      return;
    }

    this.responseSubmitted.emit({
      message,
      contactInfo: contact
    });

    this.responseMessage = '';
    this.contactInfo = '';
    this.showResponseForm = false;
  }
}
