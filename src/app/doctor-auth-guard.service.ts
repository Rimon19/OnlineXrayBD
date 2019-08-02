import { AppUser } from './Model/app-user';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DoctorAuthGuardService implements CanActivate {
  
  
  constructor(private auth: AuthService) { }

  canActivate(): Observable<boolean> { 
    return this.auth.appUser$
    .pipe(map(todos => todos.isDoctor))

    }
}
