
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonLabel,
  IonItem,
  IonTextarea
} from '@ionic/angular';

import { Work } from '../../models/work.model';

export interface WorkUpdate {
  id: string;
  description: string;
}

@Component({
  selector: 'app-customer-work-card',
  standalone: true,
  templateUrl: './customer-work-card.component.html',
  styleUrls: ['./customer-work-card.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonLabel,
    IonItem,
    IonTextarea
  ]
})
export class CustomerWorkCardComponent {

  @Input() work!: Work;

  @Output() deleteRequested = new EventEmitter<string>();

  @Output() updateRequested = new EventEmitter<WorkUpdate>();

  isEditing = false;

  editedDescription = '';

  startEditing(): void {
    this.editedDescription = this.work.description;
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.editedDescription = '';
  }

  saveChanges(): void {

    const description = this.editedDescription.trim();

    if (!description) {
      return;
    }

    if (description === this.work.description) {
      this.cancelEditing();
      return;
    }

    this.updateRequested.emit({
      id: this.work.id,
      description
    });

    this.isEditing = false;
    this.editedDescription = '';
  }

  deleteWork(): void {
    this.deleteRequested.emit(this.work.id);
  }
}
