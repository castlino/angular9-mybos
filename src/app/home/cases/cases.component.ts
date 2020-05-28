import { Component, OnInit } from '@angular/core';
import { Case } from '../../model/case';
import { CasesService } from '../../services/cases.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  
  cases: Case[];
  tableHeading: string[];
  loading: boolean;

  constructor(
    private router: Router,
    private caseService: CasesService
  ) { }

  ngOnInit(): void {
    this.getCases();
    this.tableHeading = ['#', 'Added', 'Subject', 'Type', 'Status', 'Assigned Contractors', 'Priority'];
    
    
  }
  
  getCases(): void {
    this.loading = true;
    this.caseService.getCases()
        //.pipe( delay(1000) )  // test loader display by adding delay.
        .subscribe(
          cases => {
            this.cases = cases;
            this.loading = false;
          }
    );
    
  }

}
