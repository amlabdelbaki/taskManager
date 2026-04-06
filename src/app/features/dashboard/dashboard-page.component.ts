import { Component, computed, signal } from '@angular/core';
import { TaskCounterCardComponent } from './task-counter-card/task-counter-card.component';
import { Statistic } from './models/statistic.interface';
import { DashboardToolbarComponent } from './dashboard-toolbar/dashboard-toolbar.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [TaskCounterCardComponent, DashboardToolbarComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  readonly stats: Statistic[] = [
    {
      id: '1',
      title: 'Total Tasks',
      value: 24,
      icon: 'assignment',
      changeLabel: '+12 this week',
      changeType: 'positive',
      color: 'blue',
    },
    {
      id: '2',
      title: 'Completed',
      value: 18,
      icon: 'check_circle',
      changeLabel: '+8 today',
      changeType: 'positive',
      color: 'green',
    },
    {
      id: '3',
      title: 'In Progress',
      value: 4,
      icon: 'hourglass_empty',
      changeLabel: 'Same as yesterday',
      changeType: 'neutral',
      color: 'grey',
    },
    {
      id: '4',
      title: 'Overdue',
      value: 2,
      icon: 'warning',
      changeLabel: '+3 today',
      changeType: 'negative',
      color: 'red',
    },
  ];

filterStatus = signal('all');
filterPriority = signal('');

onStatusChange(status: string) {
  this.filterStatus.set(status);
}

onPriorityChange(priority: string) {
  this.filterPriority.set(priority);
}



onAddClick() {
  console.log('Add Task Clicked');
}
}