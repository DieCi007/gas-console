import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthStoreService } from '../../../auth/service/auth-store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authStore: AuthStoreService
  ) {
  }

  isLogged = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebarClick(): void {
    this.toggleSidebar.emit();
  }

  ngOnInit(): void {
    this.authStore.me$.pipe(
      tap(me => this.isLogged = !!me)
    ).subscribe();
  }
}
