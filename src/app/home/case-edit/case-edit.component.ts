import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Case } from '../../model/case';
import { CasesService } from '../../services/cases.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-case-edit',
  templateUrl: './case-edit.component.html',
  styleUrls: ['./case-edit.component.scss']
})
export class CaseEditComponent implements OnInit {
  
    status: string;
    caseTypes: string[];
    casePriorityOptions: string[];
    caseStatusOptions: string[];
    ngbAddedDate: NgbDateStruct;
    ngbDueDate: NgbDateStruct;
    
    formSubmitted = false;
    newCaseForm: FormGroup;
    
    id: number;
    case: Case;
    
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
      
      // this.newCaseForm = this.formBuilder.group({
      //     case_number: { value: '', disabled: true},
      //     subject: ['', Validators.required],
      //     type: ['', Validators.required],
      //     status: ['', Validators.required],
      //     contractors: '',
      //     priority: ['', Validators.required],
      //     description: '',
      //     starred: 0,
      //     added_date: ['', Validators.required],
      //     due_date: ['', Validators.required],
      // });
      
      this.getCase();
    }
    
    
    // convenience getter for easy access to form fields
    get f() { 
      // console.log(this.newCaseForm);
      return this.newCaseForm.controls; 
    }
    
    getCase(): void {
      this.id = +this.route.snapshot.paramMap.get('id');
      console.log(this.id);
      
      this.caseService.getCase( this.id )
          .subscribe(
            caseById => { 
              this.case = caseById;
              console.log(this.case);
              
              var d1raw = this.case.added_date;
              var d1 = d1raw.substring(0, 10);
              var d1Arr = d1.split("-");
              this.ngbAddedDate = { year: parseInt(d1Arr[0]), month: parseInt(d1Arr[1]), day: parseInt(d1Arr[2]) };
              console.log(this.ngbAddedDate);
              
              var d2raw = this.case.due_date;
              var d2 = d2raw.substring(0, 10);
              var d2Arr = d2.split("-");
              this.ngbDueDate = { year: parseInt(d2Arr[0]), month: parseInt(d2Arr[1]), day: parseInt(d2Arr[2]) };
              console.log(this.ngbDueDate);
              
              this.newCaseForm = this.formBuilder.group({
                  case_number: { value: this.case.case_number, disabled: true},
                  subject: [this.case.subject, Validators.required],
                  type: [this.case.type, Validators.required],
                  status: [this.case.status, Validators.required],
                  contractors: this.case.contractors,
                  priority: [this.case.priority, Validators.required],
                  description: this.case.description,
                  starred: 0,
                  added_date: [this.ngbAddedDate, Validators.required],
                  due_date: [this.ngbDueDate, Validators.required],
              });
              
            }
      );
    }
    
    updateCase(): void {
      var updateCaseData = this.newCaseForm.getRawValue();
      updateCaseData.id = this.id;
      console.log(updateCaseData);
      this.caseService.updateCase( updateCaseData )
          .subscribe(
            updateCase => { 
              console.log(updateCase);
              if(updateCase.status == 'success'){
                this.router.navigate(['/case/view/' + updateCase.id]);
              }
            }
      );
    }
    
    
    public onUpdateCase() {
      this.formSubmitted = true;
      if (this.newCaseForm.invalid) {
        return;
      }
      console.log(this.newCaseForm.getRawValue());
      this.updateCase();
    }

}
