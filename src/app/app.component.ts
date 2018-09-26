import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {promise} from 'selenium-webdriver';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /*
  @ViewChild('f') formEle;
  defaultQuestion = 'teacher';
  answer = '';
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.formEle.setValue({
      logins: {
        userName: 'hello',
        mail: 'asd@asd.asd'
      },
      questionAnswer: 't',
      question: 'teacher'
    });
  }
  // onSubmit(f: NgForm) {
  //   console.log(f);
  // }
  onSubmit() {
    console.log(this.formEle);
  }
  */
  signForm: FormGroup;
  forbiddenUsername = ['name', 'ram'];

  ngOnInit() {
    this.signForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      }),
      answer: new FormControl(null),
      hobbies: new FormArray([])
    });
    this.signForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    this.signForm.setValue({
      // set all value of form
    });
    this.signForm.patchValue({
      // set any value of form not require all value
    });

  }
  onSubmit() {
    console.log(this.signForm);
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signForm.get('hobbies')).push(control);
  }
  forbiddenName(control: FormControl): { [s: string]: boolean} {
    if (this.forbiddenUsername.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    } else {
      return null;
    }
  }

  forbiddenEmails(control: FormControl): promise<any> | Observable<any> {
    const promiseValue = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promiseValue;
  }
}
