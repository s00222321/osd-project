import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { UserstateService } from './userstate.service';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amplify-cognito';
  userEmail: string | undefined; // current login
  userId: string | undefined;

  constructor(public userstate: UserstateService, public authenticator: AuthenticatorService, public router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const userAttributes = fetchUserAttributes();
      userAttributes.then(res => {
        this.userEmail = res.email;
        if (res['custom:usertype'] == "admin") {
          this.userstate.set_admin(true);
        } else {
          this.userstate.set_admin(false);
        }

        this.http.get<any>(`https://4tj9hau93k.execute-api.eu-west-1.amazonaws.com/v1/${this.userEmail}`).subscribe(response => {
          this.userId = response.id;
        }, error => {
          console.error('Error fetching user ID:', error);
        });
      });
    });
  }

  isUserAdmin(): boolean {
    return this.userstate.get_admin();
  }
}
