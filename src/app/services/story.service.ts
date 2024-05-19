import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor() {}

  allStories: any = [
    { name: 'Story1', points: '5', date: 'Sat May 18 2024 14:28:46' },
    { name: 'Story2', points: '2', date: 'Sat May 18 2024 14:28:46' },
    { name: 'Story3', points: '3', date: 'Sat May 18 2024 14:28:46' },
    { name: 'Story4', points: '4', date: 'Sat May 18 2024 14:28:46' },
    { name: 'Story5', points: '5', date: 'Sat May 18 2024 14:28:46' },
    { name: 'Story7', points: '4', date: 'Sat May 18 2024 14:28:46' },
    { name: 'Story8', points: '2', date: 'Sat May 18 2024 14:28:46' },
    { name: 'Story9', points: '1', date: 'Sat May 18 2024 14:28:46' },
  ];

  selectedStories: any = [];
}
