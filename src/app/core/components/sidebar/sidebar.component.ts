import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/', exact: true },
    { label: 'Tasks', icon: 'task', route: '/tasks' },
    { label: 'Calendar', icon: 'calendar_today', route: '/calendar' },
    { label: 'Analytics', icon: 'bar_chart', route: '/analytics' },
    { label: 'Team', icon: 'group', route: '/users' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];
}
