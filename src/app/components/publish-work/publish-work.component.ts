
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkCategory, WORK_CATEGORIES } from '../../models/work.model';

import {
  IonItem,
  IonTextarea,
  IonButton,
  IonSelectOption,
  IonSelect
} from '@ionic/angular';

@Component({
  selector: 'app-publish-work',
  standalone: true,
  templateUrl: './publish-work.component.html',
  styleUrls: ['./publish-work.component.scss'],
  imports: [
    FormsModule,
    IonItem,
    IonTextarea,
    IonButton,
    CommonModule,
    IonSelect,
    IonSelectOption,
  ]
})
export class PublishWorkComponent {

  @Output() workPublished = new EventEmitter<{
    description: string;
    category: WorkCategory;
    }>();

  readonly categories = WORK_CATEGORIES;
  workDescription = '';
  selectedCategory: WorkCategory | null = null;

  publishWork(): void {
    const description = this.workDescription.trim();

    if (!description || !this.selectedCategory) {
      return;
    }

    this.workPublished.emit({
      description,
      category: this.selectedCategory
    });

    this.workDescription = '';
    this.selectedCategory = null;
  }
}
