import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  title = 'reactive-form';
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // emails: this.fb.array([this.createEmailFormGroup()]),
      address: this.fb.array([this.createAddressFormGroup()]),
      skills: this.fb.array([this.createSkillsFormGroup()]),
      password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(20)]]
    });
  }

  // get emails(): FormArray {
  //   return this.form.get('emails') as FormArray;
  // }
  get address(): FormArray {
    return this.form.get('address') as FormArray;
  }
  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  // createEmailFormGroup(): FormGroup {
  //   return this.fb.group({
  //     email: ['', [Validators.required, Validators.email]]
  //   });
  // }

  createAddressFormGroup() {
    return this.fb.group({
      addressType: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  createSkillsFormGroup() {
    return this.fb.group({
      skill: ['', [Validators.required]]
    });
  }

  // addEmail(): void {
  //   this.emails.push(this.createEmailFormGroup());
  // }

  addAddress(): void {
    this.address.push(this.createAddressFormGroup());
  }

  addSkill(): void {
    this.skills.push(this.createSkillsFormGroup());
  }

  // removeEmail(index: number): void {
  //   this.emails.removeAt(index);
  // }

  removeAddress(index: number): void {
    this.address.removeAt(index);
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log("Form is invalid");
      return;
    }

    console.log("Form Submitted Successfully!");
    console.log(this.form.value); 
    this.onReset()
  }

  onReset(){
    this.form.reset();
  }

  get isFormValid() {
    return this.form.valid;
  }

  // isEmailRemoveEnabled(index: number) {
  //   return this.emails.at(index).get('email')?.valid;
  // }

  isAddressRemoveEnabled(index: number) {
    return this.address.at(index).valid;
  }

  isSkillRemoveEnabled(index: number) {
    return this.skills.at(index).valid;
  }

  // isEmailFormInvalid(i: number): boolean {
  //   const emailForm = this.emails.at(i);
  //   return !emailForm.valid || !emailForm.get('email')?.value;
  // }

  isAddressFormInvalid(i: number): boolean {
    const addressForm = this.address.at(i);
    return !addressForm.valid || !addressForm.get('street')?.value || !addressForm.get('city')?.value;
  }

  isSkillFormInvalid(): boolean {
    return this.skills.at(0).get('skill')?.value === '' || !this.skills.at(0).valid;
  }
}
