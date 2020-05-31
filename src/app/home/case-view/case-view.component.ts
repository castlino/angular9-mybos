import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Case } from '../../model/case';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.scss']
})
export class CaseViewComponent implements OnInit {
  loading: boolean;
  updatingStatus: boolean;
  updatedStatus: boolean;
  
  id: number;
  case: Case;
  caseStatus: string;
  caseStar: number;
  caseStatusOptions: string[];

  constructor(
    private route: ActivatedRoute,
    private caseService: CasesService
  ) { }

  ngOnInit(): void {
    this.updatingStatus = false;
    this.updatedStatus = false;
    this.getCase();
    this.caseStatusOptions = [
      'In Progress', 
      'Completed',
      'Deleted',
      'New Custom',
      'New Type 1',
      'New Type 1',
      'Awaiting Invoice',
      'Awaiting Contractor',
      'Awaiting Approval',
      'Approval 1',
      'Approval 2'
    ];
    
  }
  
  getCase(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.caseStatus = "Completed";
    
    this.caseService.getCase( this.id )
        .subscribe(
          caseById => { 
            this.case = caseById;
            console.log(this.case);
            this.caseStatus = this.case.status;
            this.caseStar = this.case.starred;
          }
    );
  }
  
  setCaseStatus(): void {
    this.caseService.setCaseStatus( this.id,  this.caseStatus )
        .subscribe(
          caseStatusUpdateResult => { 
            console.log(caseStatusUpdateResult);
            this.updatingStatus = false;
            if(caseStatusUpdateResult == 'success'){
                this.updatedStatus = true;
            }
          }
    );
  }
  
  setCaseStar(): void {
    if(this.caseStar == 1){
      this.caseStar = 0;
    }else{
      this.caseStar = 1;
    }
    this.caseService.setCaseStar( this.id,  this.caseStar )
        .subscribe(
          caseStar => { 
                console.log(caseStar);
                if(caseStar == "1") {
                  this.caseStar = 1;
                }
          }
    );
  }
  
  public onCaseStatusChanged() {
    this.updatingStatus = true;
    this.updatedStatus = false;
    console.log(this.id);
  
    console.log(this.caseStatus);
    this.setCaseStatus();
  }
  
  public onCaseStarChanged() {
    console.log(this.id);
    this.setCaseStar();
  }

}
