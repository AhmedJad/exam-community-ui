import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamAdministrationComponent } from './exam-administration.component';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamCreationComponent } from './exam-creation/exam-creation.component';
import { NavbarModule } from '../shared/components/navbar/navbar.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: ExamAdministrationComponent
  }
];

@NgModule({
  declarations: [
    ExamAdministrationComponent,
    ActionsComponent,
    ExamListComponent,
    ExamCreationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    SidebarModule,
    NgxSpinnerModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExamAdministrationModule { }
