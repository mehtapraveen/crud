import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmploymentModel } from './employee-dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient ) { }

  postEmployee(data:any){
    return this.http.post<any>('http://localhost:3000/employeeData',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  getEmployees():Observable<EmploymentModel[]>{
    return this.http.get<EmploymentModel[]>('http://localhost:3000/employeeData')
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployee(data:any,id:number){
    return this.http.put<any>('http://localhost:3000/employeeData/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmployee(id:number){
    return this.http.delete<any>('http://localhost:3000/employeeData/'+id)
     .pipe(map((res:any)=>{
      return res;
    }))
  }
}
