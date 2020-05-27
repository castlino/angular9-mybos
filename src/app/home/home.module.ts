import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { CasesComponent } from './cases/cases.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ AuthGuardService ],
    children: [
      { path: 'cases', component: CasesComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent, PieChartComponent, CasesComponent, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ChartsModule
  ]
})
export class HomeModule { }
