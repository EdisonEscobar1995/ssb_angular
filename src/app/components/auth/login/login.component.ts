import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private readonly router: Router) {
    this.authService
      .isLoggedInSubject()
      .subscribe((loggedin) => {
        if (loggedin) {
          router.navigate(['/home']);
        }
      });
  }

  ngOnInit() {
    this.authService.completeAuthentication();
  }

  ngOnDestroy() {
    this.authService.isLoggedInSubject().unsubscribe();
  }

}
