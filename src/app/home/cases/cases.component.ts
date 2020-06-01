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
  casesStatistics: any;

  chkbxJar = [];
  isAllChkbxClear: boolean;
  
  caseStatusfilters: string[];
  currentCaseStatusfilter: string;

  constructor(
    private router: Router,
    private caseService: CasesService
  ) { }

  ngOnInit(): void {
    //this.getCases();
    this.pageCount = 2;
    this.pageNumber = 1;
    this.searchString = '';
    
    
    this.tableHeading = ['#', 'Added', 'Subject', 'Type', 'Status', 'Assigned Contractors', 'Priority'];
    this.caseStatusfilters = ['Current Cases', 'Completed', 'Overdue', 'Trash', 'Starred'];
    this.currentCaseStatusfilter = 'Current Cases';
    this.pageCountOptions = ['2', '4', '8'];
    this.isAllChkbxClear = true;
    
    this.getPaginatedCases();
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
    this.caseService.getPaginatedCases(this.pageCount, this.pageNumber, this.searchString, this.currentCaseStatusfilter)
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
            
            this.cases.forEach((value, index) => {
              this.chkbxJar.push({ id: value.case_number, checked: 0 });
            });
            console.log(this.chkbxJar);
            
            this.getCaseStatusStats();  // Call this here so it happens right after the pagination call..
          }
    );
  }
  
  setCaseStar(ndx: number): void {
    var starStatus = 1;
    if(this.cases[ndx].starred == 1){
      starStatus = 0;
    }
    this.caseService.setCaseStar( this.cases[ndx].id,  starStatus )
        .subscribe(
          caseStar => { 
                console.log(caseStar);
                if(caseStar == "1") {
                  this.cases[ndx].starred = 1;
                }else{
                  this.cases[ndx].starred = 0;
                }
                
                this.getCaseStatusStats();  // Call status statistcs to update counts.
          }
    );
  }
  
  getNextCaseNumber(): void {
    this.caseService.getNextCaseNumber()
        .subscribe(
          nextCase => { 
                console.log(nextCase);
          }
    );
  }
  
  getCaseStatusStats(): void {
    this.caseService.getCaseStatusStats()
        .subscribe(
          caseStatusStats => {
            console.log(caseStatusStats);
            this.casesStatistics = caseStatusStats;
          }
    );
  }

  public onGetStats() {
    this.getCaseStatusStats();
    // event.stopPropagation();
    // //this.getCaseTypeStats();
    // console.log(this.cases);
    // console.log(this.cases[1]);
    // this.cases[1].type = 'lino';
  }
  
  public onCaseStarChanged(ndx: number) {
    event.stopPropagation();
    console.log(ndx);
    this.setCaseStar(ndx);
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
  
  public onChangeStatusFilter(selectedStatusFilter: string) {
    this.pageNumber = 1;
    this.currentCaseStatusfilter = selectedStatusFilter;
    this.getPaginatedCases();
  }
  
  public onChkbxTicked(ndx: number) {
    event.stopPropagation();
    console.log(this.chkbxJar);
    if(this.chkbxJar[ndx].checked == 1){
      this.chkbxJar[ndx].checked = 0;
    }else{
      this.chkbxJar[ndx].checked = 1;
    }
    
    //check if all is clear
    this.isAllChkbxClear = true;
    this.chkbxJar.forEach((value, index) => {
      if(value.checked){
        this.isAllChkbxClear = false;
      }
    });
  }
  
  numberToCollection(n: number): any[] {
    return Array(n);
  }

}
