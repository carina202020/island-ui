import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from "rxjs/operators";
@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  validateForm: FormGroup;
  constructor(public fb: FormBuilder) {
    // this.validateForm.valueChanges.pipe(distinctUntilChanged()).subscribe(newValue=>{
    //   console.log("g");
    //   // if(newValue >= 10){
    //   //   // set previous value
    //   //   const oldValue = this.validateForm.value;
    //   //   console.log("old value = ", oldValue)
    //   //   this.validateForm.patchValue(oldValue);
    //   // }
    // })
   }

  ngOnInit(): void {
   
  
   

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      comment: [null],
      service: [null, [Validators.required]]
    });
    this.onChanges();
  }
  onChanges(): void {
    this.validateForm.valueChanges.subscribe(val => {
     console.log("fff")
    });
  }
  submitForm(){

  }
  
}
