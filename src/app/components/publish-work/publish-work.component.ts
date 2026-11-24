
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonItem,
  IonTextarea,
  IonButton
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
    IonButton
  ]
})
export class PublishWorkComponent {

  @Output() workPublished = new EventEmitter<string>();

  workDescription = '';

  publishWork(): void {

    const description = this.workDescription.trim();

    if (!description) {
      return;
    }

    this.workPublished.emit(description);

    this.workDescription = '';
  }
}
