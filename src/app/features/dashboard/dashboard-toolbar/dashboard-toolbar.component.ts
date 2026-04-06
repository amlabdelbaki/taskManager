import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard-toolbar',
  standalone: true,
  imports: [
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard-toolbar.component.html',
  styleUrl: './dashboard-toolbar.component.scss',
})
export class DashboardToolbarComponent {
  @Output() statusChange = new EventEmitter<string>();
  @Output() priorityChange = new EventEmitter<string>();
  @Output() addTask = new EventEmitter<void>();

  selectedPriority = '';

  onTabChange(index: number): void {
    const map = ['all', 'todo', 'in-progress', 'done'];
    this.statusChange.emit(map[index] ?? 'all');
  }

  onPriorityChange(priority: string): void {
    this.priorityChange.emit(priority);
  }

  onAddClick(): void {
    this.addTask.emit();
  }
}
