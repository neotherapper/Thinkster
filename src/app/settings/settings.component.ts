import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../shared';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User = new User();
  settingsForm: FormGroup;
  errors = {};
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    Object.assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout(): void {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

    submitForm(): void {
      this.isSubmitting = true;
      // update the model
      this.updateUser(this.settingsForm.value);

      this.userService.update(this.user)
        .subscribe(
            updatedUser => {
              // TODO: create the profile page
              // this.router.navigateByUrl('/profile/' + updatedUser.username);
            },
            err => {
              this.errors = err;
              this.isSubmitting = false;
            }
          );
    }

    updateUser(values: object) {
      Object.assign(this.user, values);
    }
}
