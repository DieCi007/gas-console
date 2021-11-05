import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthStoreService } from './auth/service/auth-store.service';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private title: Title,
    private authStore: AuthStoreService,
    private authService: AuthService
  ) {
  }

  username: string;
  isLoggedIn = false;

  ngOnInit(): void {
    this.title.setTitle('Console');
    this.authStore.me$.pipe(
      tap(me => {
        this.username = me?.username;
        this.isLoggedIn = !!me;
      })
    ).subscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
