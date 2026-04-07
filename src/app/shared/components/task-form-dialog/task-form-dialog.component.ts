import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskPriority, TaskStatus } from '../../../features/dashboard/models/task.interface';

export interface TaskFormDialogData {
  mode: 'add' | 'edit';
  task?: Task;
}

export interface TaskFormDialogResult {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignee: string;
}

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './task-form-dialog.component.html',
  styleUrl: './task-form-dialog.component.scss',
})
export class TaskFormDialogComponent implements OnInit{
   priorities: { value: TaskPriority; label: string }[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  form:any;

  readonly statuses: { value: TaskStatus; label: string }[] = [
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormDialogComponent, TaskFormDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormDialogData,
  ) {}

 ngOnInit() {
   this.form = this.formBuilder.group({
    title: [this.data.task?.title ?? '', [Validators.required, Validators.maxLength(120)]],
    description: [this.data.task?.description ?? '', [Validators.maxLength(1000)]],
    priority: [this.data.task?.priority ?? 'medium' as TaskPriority, Validators.required],
    status: [this.data.task?.status ?? 'todo' as TaskStatus, Validators.required],
    dueDate: [this.getInitialDueDate()],
    assignee: [this.data.task?.assignee.name ?? '', [Validators.maxLength(120)]],
  });

 }
   dialogTitle(): string {
    return this.data.mode === 'edit' ? 'Edit Task' : 'Add New Task';
  }

   submitLabel(): string {
    return this.data.mode === 'edit' ? 'Save Changes' : 'Add Task';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const dueDate = formValue.dueDate instanceof Date
      ? formValue.dueDate.toISOString()
      : new Date(formValue.dueDate ?? '').toISOString();

    this.dialogRef.close({
      title: formValue.title?.trim() ?? '',
      description: formValue.description?.trim() ?? '',
      priority: formValue.priority as TaskPriority,
      status: formValue.status as TaskStatus,
      dueDate,
      assignee: formValue.assignee?.trim() ?? '',
    });
  }

  private getInitialDueDate(): Date | null {
    if (!this.data.task?.dueDate) {
      return null;
    }

    return new Date(this.data.task.dueDate);
  }
}
