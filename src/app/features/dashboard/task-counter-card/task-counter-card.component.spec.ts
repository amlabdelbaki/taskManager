import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCounterCardComponent } from './task-counter-card.component';

describe('TaskCounterCardComponent', () => {
  let component: TaskCounterCardComponent;
  let fixture: ComponentFixture<TaskCounterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCounterCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCounterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
