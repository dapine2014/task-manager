import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTasksComponent } from './create-tasks.component';
import {TaskService} from '../../core/servicios/task.service';
import {ITasks} from '../../core/interfaces/ITasks';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {ChangeDetectorRef} from '@angular/core';

describe('CreateTasksComponent', () => {
  let component: CreateTasksComponent;
  let fixture: ComponentFixture<CreateTasksComponent>;
  let service: TaskService;
  let mockTaskService:any;

  let mockTable: { renderRows: () => void };
  let mockCDR: jasmine.SpyObj<ChangeDetectorRef>;

  // Mock tasks data
  const tasks: ITasks[] = [{
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    estatus: 'OPEN',
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  }];

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['createTask', 'updateTask', 'getTasks']);

    mockTable = { renderRows: jasmine.createSpy('renderRows') };
    mockCDR = jasmine.createSpyObj('ChangeDetectorRef', [
      'detectChanges',
      'markForCheck',
      'detach',
      'checkNoChanges',
      'reattach'
    ]);

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: TaskService, useValue: mockTaskService } ]
    }).compileComponents();

    service = TestBed.inject(TaskService);

    service.createTask = mockTaskService.createTask.and.returnValue(of({}));
    service.updateTask = mockTaskService.updateTask.and.returnValue(of({}));
    service.getTasks = mockTaskService.getTasks.and.returnValue(of(tasks));

    fixture = TestBed.createComponent(CreateTasksComponent);
    component = fixture.componentInstance;

    component.table = mockTable;
    component.cdr = mockCDR;
    service = mockTaskService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // This is the new test code
  it('should reset form', () => {
    component.resetForm();

    const expectedForm = {
      id: 0,
      title: '',
      description: '',
      estatus: 'OPEN',
      fechaCreacion: component.taskForm.fechaCreacion,
      fechaActualizacion: component.taskForm.fechaActualizacion
    };

    expect(component.isEditMode).toBeFalse();
    expect(component.taskForm).toEqual(expectedForm);
  });

  it('should edit task', () => {
    const taskToEdit = tasks[0];
    component.editTask(taskToEdit);

    expect(component.isEditMode).toBeTrue();
    expect(component.taskForm).toEqual(taskToEdit);
  });

  it('should load tasks', () => {
    mockTaskService.getTasks.and.returnValue(of(tasks));

    component.loadTasks();

    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(tasks);
    expect(component.dataSource).toEqual(tasks);
    expect(component.table!.renderRows).toHaveBeenCalled(); // Usar '!' para asegurar a TypeScript que table no es nulo
    expect(component.cdr.detectChanges).toHaveBeenCalled();
  });

  describe('saveTask', () => {
    it('should update task when in edit mode', () => {
      component.isEditMode = true;
      component.taskForm = tasks[0]; // usa una tarea mock

      component.saveTask();

      expect(mockTaskService.updateTask).toHaveBeenCalled();
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(tasks[0].id, tasks[0]); // espera que se llame con el id y datos de la tarea
      expect(mockTaskService.getTasks).toHaveBeenCalled();
    });

    it('should create task when not in edit mode', () => {
      component.isEditMode = false;
      component.taskForm = tasks[0]; // usa una tarea mock

      component.saveTask();

      expect(mockTaskService.createTask).toHaveBeenCalled();
      expect(mockTaskService.createTask).toHaveBeenCalledWith(tasks[0]); // espera que se llame con los datos de la tarea
      expect(mockTaskService.getTasks).toHaveBeenCalled();
    });
  });
});
