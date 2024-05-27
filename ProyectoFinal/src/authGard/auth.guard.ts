import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { PerfilusuarioService } from '../../service/perfilusuario.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};

export const HomeGuard: CanActivateFn = (route, state) => {
  console.log("homeGuard");
  if (localStorage.getItem('token')) {
    return false;
  }
  return true;
};

export const AdminGuard:CanActivateChildFn  = (route, state) => {
  const perfil = inject(PerfilusuarioService)
  console.log("AdminGuard:"+perfil.getPerfilActivo().passadmin);
  if (perfil.getPerfilActivo().passadmin) {
    return true;
  }else{
    return false
  }
};

export const AdminOrdenaloGuard:CanActivateChildFn  = (route, state) => {
  let activo :any =localStorage.getItem('usuario');
  console.log(JSON.parse(activo).rol);
  if (JSON.parse(activo).rol == 2) {
    return true
  }else{
    return false;
  }
  
  // if (localStorage.getItem('token')) {
  //   return true;
  // }
  // return false;
};