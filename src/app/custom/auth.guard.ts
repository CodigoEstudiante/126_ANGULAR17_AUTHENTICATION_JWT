import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from '../services/acceso.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
     debugger;
     const token = localStorage.getItem("token") || "";
     const router = inject(Router);

     const accesoService = inject(AccesoService)
     if(token != ""){
          return accesoService.validarToken(token).pipe(
               map(data => {
                    if(data.isSuccess){
                         return true
                    } else{
                         router.navigate([''])
                         return false;
                    }
               }),
               catchError(error => {
                    router.navigate([''])
                         return of(false);
               })
          )
     }else {
          // router.navigateByUrl("");
          // return false
          const url = router.createUrlTree([""])
          return url;
     }
  
};
