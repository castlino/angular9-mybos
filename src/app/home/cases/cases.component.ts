import { Component, OnInit } from '@angular/core';
import { Case } from '../../model/case';
import { CasesService } from '../../services/cases.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  
  cases: Case[];
  tableHeading: string[];

  constructor(
    private router: Router,
    private caseService: CasesService
  ) { }

  ngOnInit(): void {
    this.getCases();
    this.tableHeading = ['#', 'Added', 'Subject', 'Type', 'Status', 'Assigned Contractors', 'Priority'];
  }
  
  getCases(): void {
    this.caseService.getCases()
        .subscribe(cases => this.cases = cases);
  }

}
