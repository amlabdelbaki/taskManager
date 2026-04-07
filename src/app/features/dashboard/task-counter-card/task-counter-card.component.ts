import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-task-counter-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-counter-card.component.html',
  styleUrl: './task-counter-card.component.scss'
})
export class TaskCounterCardComponent {
  @Input() title = '';
  @Input() value = 0;
  @Input() icon = '';
  @Input() changeLabel = '';  
  @Input() changeType = 'positive'; // 'positive' | 'negative'  ;
  @Input() color = 'blue';
  @Input() id = '';
}
