import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { Observable, of, tap } from 'rxjs';
import { LikesService } from './likes-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService);
  private likesService = inject(LikesService);
// This service initializes the application by checking for a stored user in localStorage
  inIt() {   
    return this.accountService.refreshToken().pipe(
      tap(user => {
        if (user) {
          this.accountService.setCurrentUser(user);
          this.accountService.startTokenRefreshInterval();
        }
      })
    )

  }
}
