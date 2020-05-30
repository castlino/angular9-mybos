import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Case } from '../../model/case';
import { CasesService } from '../../services/cases.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-case-new',
  templateUrl: './case-new.component.html',
  styleUrls: ['./case-new.component.scss']
})
export class CaseNewComponent implements OnInit {

  status: string;
  caseTypes: string[];
  casePriorityOptions: string[];
  caseStatusOptions: string[];
  ngbAddedDate: NgbDateStruct;
  ngbDueDate: NgbDateStruct;
  
  formSubmitted = false;
  newCaseForm: FormGroup;
  
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseService: CasesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.status = '';
    this.caseTypes = ['Other', 'gardening', 'Defects', 'Renovations', 'Cleaning', 'Repair & Maintenance'];
    this.casePriorityOptions = ['Low', 'Medium', 'High', 'Urgent'];
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
    
    this.newCaseForm = this.formBuilder.group({
        case_number: '000',
        subject: ['', Validators.required],
        type: ['', Validators.required],
        status: ['', Validators.required],
        contractors: '',
        priority: ['', Validators.required],
        description: '',
        added_date: ['', Validators.required],
        due_date: ['', Validators.required],
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.newCaseForm.controls; }
  
  createNewCase(): void {
    this.caseService.createCase( this.newCaseForm.getRawValue() )
        .subscribe(
          newCase => { 
            console.log(newCase);
            if(newCase.status == 'success'){
              this.router.navigate(['/case/view/' + newCase.id]);
            }
          }
    );
  }
  
  public onSaveNewCase() {
    this.formSubmitted = true;
    if (this.newCaseForm.invalid) {
      return;
    }
    console.log(this.newCaseForm.getRawValue());
    this.createNewCase();
  }

}
