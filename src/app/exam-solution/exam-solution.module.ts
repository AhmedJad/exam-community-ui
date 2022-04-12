import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamSolutionComponent } from './exam-solution.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from '../shared/components/navbar/navbar.module';
import { UsersListComponent } from './users-list/users-list.component';
import { ExamsListComponent } from './exams-list/exams-list.component';
import { SolutionComponent } from './solution/solution.component';
import { ActionsComponent } from './actions/actions.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: ExamSolutionComponent
  }
];

@NgModule({
  declarations: [
    ExamSolutionComponent,
    UsersListComponent,
    ExamsListComponent,
    SolutionComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    NgxSpinnerModule,
    FormsModule
  ]
})
export class ExamSolutionModule { }
