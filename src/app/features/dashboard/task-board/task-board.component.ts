import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TaskColumnComponent } from '../task-column/task-column.component';
import { Task, TaskStatus } from '../models/task.interface';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [TaskColumnComponent, CommonModule, DragDropModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent {
  @Input() tasks: Task[] = [];
  @Output() statusUpdated = new EventEmitter<{
    task: Task;
    status: TaskStatus;
  }>();
  isMobile = this.checkIsMobile();

  columns: { key: TaskStatus; title: string }[] = [
    { key: 'todo', title: 'To Do' },
    { key: 'in_progress', title: 'In Progress' },
    { key: 'done', title: 'Done' },
  ];

  getTasksByStatus(status: string) {
    return this.tasks.filter((t) => t.status === status);
  }

  drop(data: { event: CdkDragDrop<Task[]>; status: TaskStatus }) {
    const event = data.event;
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const task = data.event.item.data;

      this.statusUpdated.emit({
        task,
        status: data.status,
      });
    }
  }


  getConnectedList() {
    return this.columns.map((c) => c.key);
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.isMobile = this.checkIsMobile();
  }

  private checkIsMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }
}


