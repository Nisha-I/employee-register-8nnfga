import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.employeeService.getData();
    this.resetForm()
  }

  ngSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == "")
      this.employeeService.insertEmployee(employeeForm.value);
    else
      this.employeeService.updateEmployee(employeeForm.value)
    this.resetForm(employeeForm);
    this.toastr.success('Submitted Successfully', 'Employee Register');
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.employeeService.selectedEmployee = {
      $key: '',
      name: '',
      position: '',
      office: '',
      salary: 0
    }
  }
}