import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedComponent } from './authenticated.component';
import { EmailVerificationComponent } from 'src/app/authenticated/email-verification/email-verification.component';
import { ExamAdministrationComponent } from 'src/app/authenticated/exam-administration/exam-administration.component';
import { ExamSolutionComponent } from 'src/app/authenticated/exam-solution/exam-solution.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamAdminActionsComponent } from 'src/app/authenticated/exam-administration/exam-admin-actions/exam-admin-actions.component';
import { ExamAdminListComponent } from 'src/app/authenticated/exam-administration/exam-admin-list/exam-admin-list.component';
import { ExamCreationComponent } from 'src/app/authenticated/exam-administration/exam-creation/exam-creation.component';
import { ExamSolutionActionsComponent } from 'src/app/authenticated/exam-solution/exam-solution-actions/exam-solution-actions.component';
import { ExamSolutionListComponent } from 'src/app/authenticated/exam-solution/exam-solution-list/exam-solution-list.component';
import { SolutionComponent } from 'src/app/authenticated/exam-solution/solution/solution.component';
import { UsersListComponent } from 'src/app/authenticated/exam-solution/users-list/users-list.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { NavbarComponent } from './navbar/navbar.component';
import { VerifiedGuard } from '../../guards/verified.guard';


let routes = [
  {
    path: "", component: AuthenticatedComponent,
    children: [
      { path: "email-verification", component: EmailVerificationComponent },
      { path: "exam-admin", component: ExamAdministrationComponent },
      { path: "exam-solution", component: ExamSolutionComponent }
    ]
  }
]

@NgModule({
  declarations: [
    AuthenticatedComponent,
    EmailVerificationComponent,
    ExamAdminActionsComponent,
    ExamAdminListComponent,
    ExamCreationComponent,
    ExamAdministrationComponent,
    ExamSolutionActionsComponent,
    ExamSolutionListComponent,
    SolutionComponent,
    UsersListComponent,
    NavbarComponent,
    ExamSolutionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    ClickOutsideModule,
  ]
})
export class AuthenticatedModule { }
