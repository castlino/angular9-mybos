import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { Case } from '../../model/case';
import { CasesService } from '../../services/cases.service';


@Component({
  selector: 'app-case-new',
  templateUrl: './case-new.component.html',
  styleUrls: ['./case-new.component.scss']
})
export class CaseNewComponent implements OnInit {

  status: string;
  public newCaseForm: FormGroup;
  
  
  constructor(
    private route: ActivatedRoute,
    private caseService: CasesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.status = '';
    
    this.newCaseForm = this.formBuilder.group({
        case_number: '000',
        subject: '',
        type: '',
        status: '',
        contractors: '',
        priority: '',
        description: '',
        added_date: '',
        due_date: ''
    });
  }
  
  // setCaseStatus(): void {
  //   this.caseService.createCase( this.case )
  //       .subscribe(
  //         newCase => { 
  //           console.log(newCase);
  //           if(newCase == 'success'){
  //               this.status = 'success';
  //           }
  //         }
  //   );
  // }

}
