import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task, TaskStatus } from '../models/task.interface';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CdkDropList, CdkDrag,CommonModule,TaskCardComponent,DragDropModule],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss'
})
export class TaskColumnComponent {
  @Input() title = '';
  @Input() tasks: any[] = [];
  @Input() status: TaskStatus = 'todo';
  @Input() connectedLists: string[] = [];
  @Input() dragDisabled = false;
  @Output() taskDropped = new EventEmitter<{
    event: any;
    status: TaskStatus;
  }>();

drop(event: any) {
  const newStatus = event.container.id as TaskStatus; //
  this.taskDropped.emit({
    event,
      status: newStatus
  });
}

trackById(index: number, task: Task) {
  return task.id;
}
getConnectedListIds(status: TaskStatus): string[] {
return this.dragDisabled ? [] : this.connectedLists.filter(id => id !== status)
}
}
