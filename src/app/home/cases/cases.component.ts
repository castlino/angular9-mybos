import { Component, OnInit } from '@angular/core';
import { Case } from '../../model/case';
import { PaginatedCases } from '../../model/paginated-cases';
import { CasesService } from '../../services/cases.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  
  tableHeading: string[];
  loading: boolean;
  
  cases: Case[];
  
  paginatedCases: PaginatedCases;
  pageCount: number;
  pageNumber: number;
  pageStart: number;
  pageEnd: number;
  countTotal: number;
  pageCountMax: number;
  pageCountOptions: string[];
  
  searchString: string;

  constructor(
    private router: Router,
    private caseService: CasesService
  ) { }

  ngOnInit(): void {
    //this.getCases();
    this.pageCount = 2;
    this.pageNumber = 1;
    this.searchString = '';
    this.getPaginatedCases();
    
    this.tableHeading = ['#', 'Added', 'Subject', 'Type', 'Status', 'Assigned Contractors', 'Priority'];
    this.pageCountOptions = ['2', '4', '8'];
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
  
  getCaseTypeStats(): void {
    this.caseService.getCaseTypeStats('-2 month')
        //.pipe( delay(1000) )  // test loader display by adding delay.
        .subscribe(
          caseTypeStats => {
            console.log(caseTypeStats);
          }
    );
    
  }
  
  getPaginatedCases(): void {
    this.loading = true;
    this.caseService.getPaginatedCases(this.pageCount, this.pageNumber, this.searchString)
        //.pipe( delay(1000) )  // test loader display by adding delay.
        .subscribe(
          paginatedCases => {
            this.paginatedCases = paginatedCases;
            this.cases = paginatedCases.cases;
            this.pageStart = paginatedCases.start;
            this.pageEnd = paginatedCases.end;
            this.countTotal = paginatedCases.total;
            this.pageCountMax = paginatedCases.maxPage;
            this.loading = false;
          }
    );
  }

  public onGetStats() {
    this.getCaseTypeStats();
  }
  
  public onCountChange() {
    this.pageNumber = 1;  //Reset page number to 1.
    this.getPaginatedCases();
  }
  
  public onChangePageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getPaginatedCases();
  }
  
  public onSearchCases() {
    console.log('on search...' + this.searchString);
    this.pageNumber = 1;
    this.getPaginatedCases();
  }
  
  numberToCollection(n: number): any[] {
    return Array(n);
  }

}
