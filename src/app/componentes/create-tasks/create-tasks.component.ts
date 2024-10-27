import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ITasks} from '../../core/interfaces/ITasks';
import {TaskService} from '../../core/servicios/task.service';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatList, MatListItem} from '@angular/material/list';
import {NgForOf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatButtonModule} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatTable, MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrl: './create-tasks.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormField,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIcon,
    MatListItem,
    MatList,
    NgForOf,
    MatIconButton,
    MatButtonModule,
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatTableModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateTasksComponent implements OnInit{

  displayedColumns: string[] = ['id', 'task', 'description', 'status','update', 'accion'];
  tasks: ITasks[] = [];
  dataSource: ITasks[] =[];
  isEditMode: boolean = false;
  taskForm: ITasks = {
    id: 0,
    title: '',
    description: '',
    estatus: 'OPEN',
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  };
  @ViewChild(MatTable) table?: { renderRows: () => void };

  ngOnInit(): void {
        this.loadTasks();
    }

  constructor(private service: TaskService, public cdr: ChangeDetectorRef) {}

  saveTask() {
    if (this.isEditMode) {
      this.service.updateTask(this.taskForm.id, this.taskForm).subscribe((data:ITasks)=>{
        this.resetForm();
        this.loadTasks();
      });
    } else {
      this.service.createTask(this.taskForm).subscribe( (data:ITasks) => {
         this.loadTasks();
         this.resetForm();
      });
    }
  }

  resetForm() {
    this.taskForm = {
      id: 0,
      title: '',
      description: '',
      estatus: 'OPEN',
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    this.isEditMode = false;
  }

  editTask(task: ITasks) {
    this.taskForm = { ...task };
    this.isEditMode = true;
  }

  deleteTask(id:number) {
    this.service.deleteTask(id).subscribe({
      next: () =>this.loadTasks(),
      error: () => alert('Failed to delete task')
    })
1  }

  loadTasks() {
    this.service.getTasks().subscribe((data:ITasks[]) =>{
      this.tasks = data;
      this.dataSource = data;
      this.table?.renderRows();
      this.cdr.detectChanges();
    });
  }
}
