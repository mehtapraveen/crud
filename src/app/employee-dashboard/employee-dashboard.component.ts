import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmploymentModel } from '../shared/employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  
  employeeForm!: FormGroup;
  employeeModelobj: EmploymentModel = new EmploymentModel()
  employedata!: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private api:ApiService, private _myFb:FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm= this._myFb.group({
      firstName: [''],
      lastName: [''],
      emailId :[''],
      mobileNo:[''],
      salary:['']

    })
    this.getEmployeeDetails()
  }


  clickAdd(){
    this.employeeForm.reset();
    this.showAdd=true;
    this.showUpdate=false
  }

  postEmployeDetails(){
    this.employeeModelobj.firstName = this.employeeForm.value.firstName;
    this.employeeModelobj.lastName = this.employeeForm.value.lastName;
    this.employeeModelobj.emailId = this.employeeForm.value.emailId;
    this.employeeModelobj.mobileNo = this.employeeForm.value.mobileNo;
    this.employeeModelobj.salary = this.employeeForm.value.salary;
   

    this.api.postEmployee(this.employeeModelobj)
    .subscribe((res)=>{
      console.log(res)
      alert('Employe Added');
      
      const ref = document.getElementById('cancel')
      ref?.click()
      this.employeeForm.reset()
      this.getEmployeeDetails()
    });
    (err:any)=>{
      alert('something went wrong')
    }
  }
  getEmployeeDetails(){
    this.api.getEmployees()
    .subscribe((res:any)=>{
      this.employedata=res
    })
  };

  deleteEmployeDetails(row : any){
    
    this.api.deleteEmployee(row.id)
    .subscribe((res:any)=>{
      alert('employee deleted')
      console.log(res)
      this.getEmployeeDetails()
    });

    
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true
    this.employeeModelobj.id=row.id
    this.employeeForm.controls["firstName"].setValue(row.firstName)
    this.employeeForm.controls["lastName"].setValue(row.lastName)
    this.employeeForm.controls["emailId"].setValue(row.emailId)
    this.employeeForm.controls["mobileNo"].setValue(row.mobileNo)
    this.employeeForm.controls["salary"].setValue(row.salary)
  }

  updateEmployeeDetails(){
    this.employeeModelobj.firstName = this.employeeForm.value.firstName;
    this.employeeModelobj.lastName = this.employeeForm.value.lastName;
    this.employeeModelobj.emailId = this.employeeForm.value.emailId;
    this.employeeModelobj.mobileNo = this.employeeForm.value.mobileNo;
    this.employeeModelobj.salary = this.employeeForm.value.salary;
    this.api.updateEmployee(this.employeeModelobj,this.employeeModelobj.id)
    .subscribe((res)=>{
      alert('employe updated')
      const ref = document.getElementById('cancel')
      ref?.click()
      this.getEmployeeDetails()
    });
    (err:any)=>{
     alert('something went wrong')
    }
  }
}
