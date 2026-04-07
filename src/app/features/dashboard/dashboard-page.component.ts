import { Component, computed, signal } from '@angular/core';
import { TaskCounterCardComponent } from './task-counter-card/task-counter-card.component';
import { Statistic } from './models/statistic.interface';
import { DashboardToolbarComponent } from './dashboard-toolbar/dashboard-toolbar.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { Task, TaskStatus } from './models/task.interface';
import { ManageTaskService } from '../../shared/services/manage-task.service';
import { SearchService } from '../../shared/services/search.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormDialogComponent } from '../../shared/components/task-form-dialog/task-form-dialog.component';

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
tasks = signal<Task[]>([]);
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
  const searchTerm = this.searchService.searchTerm().trim().toLowerCase();

  return this.tasks().filter(task => {

    const matchStatus =
      this.filterStatus() === 'all' || task.status === this.filterStatus();

    const matchPriority =
      this.filterPriority() === 'all' || task.priority === this.filterPriority();

    const matchSearch =
      !searchTerm ||
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm) ||
      task.assignee.name.toLowerCase().includes(searchTerm);

    return matchStatus && matchPriority && matchSearch;
  });
});

constructor(
  private manageTaskService: ManageTaskService,
  private searchService: SearchService,
  private dialog: MatDialog,
) {}

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

onStatusUpdated(data: { task: Task, status: TaskStatus }) {
  this.tasks.update(currentTasks =>
    currentTasks.map(t =>
      t.id === data.task.id
        ? { ...t, status: data.status }
        : t
    )
  );
}

onAddClick() {
  this.dialog.open(TaskFormDialogComponent, {
    width: '640px',
    data: {
      mode: 'add',
    },
  });
   
  console.log('Add Task Clicked');
}
}
