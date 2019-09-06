import { AppUser } from './Model/app-user';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService  {

  isAdmin:boolean;
  constructor(private auth: AuthService) {
     
   }

   canActivate(): Observable<boolean> { 
    return this.auth.appUser$
    .pipe(map(todos => todos.isAdmin))
      
    }
}
