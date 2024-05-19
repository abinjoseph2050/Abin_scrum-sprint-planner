import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStoryComponent } from './add-story/add-story.component';
import { StoryService } from './services/story.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'scrum-sprint-planner';
  storiesOptions!: EChartsOption;

  constructor(private dialog: MatDialog, private storyService: StoryService) {}

  currentDate: any = '';
  allStories: any[] = [];
  selectedStories: any[] = [];
  sprintPoint: any = '';
  deleteActive = false;

  ngOnInit() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);

    this.allStories = this.storyService.allStories;
    this.selectedStories = this.storyService.selectedStories;
    this.loadChart();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(AddStoryComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.afterClosed();
    });
  }

  afterClosed() {
    this.allStories = this.storyService.allStories;
    this.loadChart();
  }

  clearAll() {
    const confirmed = confirm('Are you sure you want to delete all stories?');
    if (confirmed) {
      this.allStories = [];
      this.selectedStories = [];
      this.storyService.allStories = [];
      this.storyService.selectedStories = [];
      this.loadChart();
    }
  }

  clearSelected() {
    const confirmed = confirm(
      'Are you sure you want to delete selected stories?'
    );
    if (confirmed) {
      this.selectedStories = [];
      this.storyService.selectedStories = [];
    }
  }

  deleteStory(id: any) {
    this.deleteActive = true;
    this.storyService.allStories.splice(id, 1);
    this.allStories = this.storyService.allStories;
    this.autoSelectStories();
    this.deleteActive = false;
    this.loadChart();
  }

  setPoint(event: any) {
    this.sprintPoint = event;
  }

  autoSelectStories() {
    if (this.sprintPoint != '') {
      this.selectedStories = [];
      this.storyService.selectedStories = [];

      let toSort = this.allStories.sort(
        (a: any, b: any) => b.points - a.points
      );

      let count = 0;
      for (const story of toSort) {
        let storyPoints = Number(story.points);
        if (count + storyPoints <= Number(this.sprintPoint)) {
          this.selectedStories.push(story);
          count += storyPoints;
        }
      }
      this.storyService.selectedStories = this.selectedStories;
    } else {
      if (!this.deleteActive) {
        alert('Enter sprint target!');
      }
    }
  }

  loadChart() {
    let xAxisData: any[] = [];
    let seriesData: any[] = [];
    this.allStories.forEach((story: any) => {
      xAxisData.push(story.name);
      seriesData.push({
        value: Number(story.points),
        groupId: story.name,
      });
    });

    this.storiesOptions = {
      xAxis: {
        data: xAxisData,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(212,215,221, 0.7)',
            type: 'dashed',
          },
        },
      },
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        containLabel: true,
      },
      dataGroupId: '',
      animationDurationUpdate: 500,
      series: [
        {
          type: 'bar',
          id: 'sales',
          data: seriesData,
          barWidth: 20,
          barHeight: '-100%',
          barGap: '20',
          itemStyle: {
            normal: {
              color: '#c186e8',
              opacity: 1,
              borderRadius: [21, 21, 0, 0],
              borderColor: 'transparent',
            },
            emphasis: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#c186e8' },
                  { offset: 1, color: '#cdb7db' },
                ],
              },
              transition: 'color 0.5s',
            },
          },
        },
      ] as echarts.SeriesOption,
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.54)',
        padding: 5,
        extraCssText: 'border-radius: 8px;',
        textStyle: {
          color: '#000',
          fontSize: 13,
        },
        axisPointer: {
          type: 'none',
        },
        trigger: 'axis',
        formatter: function (params: any) {
          var value = '<b>' + params[0].value + '</b>';
          return '<b>' + params[0].name + '</b>' + ': <br> Points ' + value;
        },
      },
    };
  }
}
