import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { CasesComponent } from './cases/cases.component';
import { CaseViewComponent } from './case-view/case-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TimeDisplayComponent } from '../shared/time-display/time-display.component';
import { CaseNewComponent } from './case-new/case-new.component';
import { ActionItemsComponent } from './widgets/action-items/action-items.component';
import { ManagementReportsComponent } from './widgets/management-reports/management-reports.component';
import { BuildingSummaryComponent } from './widgets/building-summary/building-summary.component';
import { WorkOrdersComponent } from './widgets/work-orders/work-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuardService ],
    children: [
      { path: 'cases', component: CasesComponent },
      { path: 'case/view/:id', component: CaseViewComponent },
      { path: 'case/new', component: CaseNewComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent, PieChartComponent, DoughnutChartComponent, CasesComponent, CaseViewComponent, DashboardComponent, TimeDisplayComponent, CaseNewComponent, ActionItemsComponent, ManagementReportsComponent, BuildingSummaryComponent, WorkOrdersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class HomeModule { }
