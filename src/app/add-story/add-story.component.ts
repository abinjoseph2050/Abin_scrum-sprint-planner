import { Component } from '@angular/core';
import { StoryService } from '../services/story.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrl: './add-story.component.scss',
})
export class AddStoryComponent {
  storyName: string = '';
  storyPoint: number | null = null;

  constructor(
    private storyService: StoryService,
    private dialogRef: MatDialogRef<AddStoryComponent>
  ) {}

  setName(event: any) {
    this.storyName = event;
  }

  setPoint(event: any) {
    this.storyPoint = event;
  }

  addStory() {
    if (this.storyName == '') {
      alert('Enter story name!');
    } else if (!this.storyPoint) {
      alert('Enter story point!');
    }
    if (this.storyName && this.storyPoint !== null) {
      let isExist = false;
      this.storyService.allStories.forEach((story: any) => {
        if (story.name === this.storyName) {
          isExist = true;
        }
      });

      if (!isExist) {
        this.storyService.allStories.push({
          name: this.storyName,
          points: this.storyPoint,
          date: new Date(),
        });
        isExist = false;
        this.dialogRef.close();
      } else {
        alert('Story Exists!, Use another name');
      }
    }
  }
}
