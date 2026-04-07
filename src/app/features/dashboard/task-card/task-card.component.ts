import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Task } from '../models/task.interface';
import { TaskFormDialogComponent } from '../../../shared/components/task-form-dialog/task-form-dialog.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task: Task | null = null;

  constructor(private dialog: MatDialog) {}

  stopEvent(event: Event): void {
    event.stopPropagation();
  }

  onEdit(event: Event): void {
    event.stopPropagation();

    if (!this.task) {
      return;
    }

    this.dialog.open(TaskFormDialogComponent, {
      width: '640px',
      data: {
        mode: 'edit',
        task: this.task,
      },
    });
  }
}
