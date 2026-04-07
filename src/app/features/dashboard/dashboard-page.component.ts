import { Component, computed, signal } from '@angular/core';
import { TaskCounterCardComponent } from './task-counter-card/task-counter-card.component';
import { Statistic } from './models/statistic.interface';
import { DashboardToolbarComponent } from './dashboard-toolbar/dashboard-toolbar.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { Task, TaskStatus } from './models/task.interface';
import { ManageTaskService } from '../../shared/services/manage-task.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    TaskCounterCardComponent,
     DashboardToolbarComponent,
     TaskBoardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  tasks = signal<Task[]>([    {
      id: 'task-001',
      title: 'Design new homepage layout',
      description: 'Create wireframes and mockups for the new homepage redesign with modern UI elements',
      status: 'done',
      priority: 'high',
      dueDate: '', // Due in 2 days
      assignee: {
        id: 'user-001',
        name: 'John Doe',
        avatar: 'JD',
        email: 'john.doe@company.com'
      },
      tags: ['Design'],
      createdAt: '',
      updatedAt: '',
      isOverdue: false,
      completedAt: ''
    }]);
   stats: Statistic[] = [];

filterStatus = signal('all');
filterPriority = signal('all');

onStatusChange(status: string) {
  this.filterStatus.set(status);
}

onPriorityChange(priority: string) {
  this.filterPriority.set(priority);
}

filteredTasks = computed(() => {
  return this.tasks().filter(task => {

    const matchStatus =
      this.filterStatus() === 'all' || task.status === this.filterStatus();

    const matchPriority =
      this.filterPriority() === 'all' || task.priority === this.filterPriority();

    return matchStatus && matchPriority;
  });
});

constructor(private manageTaskService: ManageTaskService) {
}

ngOnInit() {
  this.getDashboardData();


}

getDashboardData() {
  this.manageTaskService.getDashboardData().subscribe((data: any) => {
    console.log(data,'Dashboard Data');
    this.tasks.set(data.tasks);
    this.stats = data.statistics;

  });
}
//  addDays(date, days) {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// }

// /**
//  * Format date as YYYY-MM-DD
//  */
//  formatDate(date) {
//   return date.toISOString().split('T')[0];
// }
onStatusUpdated(data: { task: Task, status: TaskStatus }) {

// this.tasks.update(currentTasks => {
//   console.log(Array.isArray(currentTasks)); // لازم true
//   return currentTasks;
// });
  this.tasks.update(currentTasks =>
    currentTasks.map(t =>
      t.id === data.task.id
        ? { ...t, status: data.status }
        : t
    )
  );
}

onAddClick() {
  // Logic to open a dialog or navigate to a task creation page
  console.log('Add Task Clicked');
}
}