import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Students } from '../../Models/students';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
  studentForm: FormGroup;
  students: Students[] = [];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      materia: this.fb.array([]),
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get materia(): FormArray {
    return this.studentForm.get('materia') as FormArray;
  }

  addMateria() {
    this.materia.push(this.fb.control('', Validators.required));
  }

  removeMateria(index: number) {
    this.materia.removeAt(index);
  }

  submitForm() {
    if (this.studentForm.valid) {
      const newStudent: Students = {
        matricula: this.studentForm.value.matricula,
        nombre: this.studentForm.value.nombre,
        apellido: this.studentForm.value.apellido,
        materia: this.studentForm.value.materia,
        email: this.studentForm.value.email,
        edad: Number(this.studentForm.value.edad) // Convertir a número
      };
      this.students.push(newStudent);
      this.studentForm.reset();
      this.materia.clear();
    }
  }

  removeStudent(index: number) {
    this.students.splice(index, 1);
  }
}
