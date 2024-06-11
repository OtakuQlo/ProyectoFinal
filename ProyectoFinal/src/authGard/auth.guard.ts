import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('tokenUser')) {
    if(localStorage.getItem('tokenPerfil')){
      history.back();
      return false;
    }
    return true;
  }
  history.back();
  return false;
};

export const HomeGuard: CanActivateFn = (route, state) => { 
  if(localStorage.getItem('tokenUser') || localStorage.getItem('tokenPerfil')){
    if(localStorage.getItem('tokenUser') && !localStorage.getItem('tokenPerfil')){
      console.log('No pasa Perfil');
      window.location.href= '/Perfiles';
      return false;
    }else if(!localStorage.getItem('tokenUser') && localStorage.getItem('tokenPerfil')){
      console.log('No pasa User');
      window.location.href= '/Venta';
      return false;
    }
    window.location.href= '/Perfiles'
    return false;
  }
  console.log('Pasa');
  return true;
};

export const PUGuard:CanActivateChildFn = (route, state) => {
  if(localStorage.getItem('tokenPerfil')){
    const user = inject(UsuarioService);
    const token = user.desencryptContra(localStorage.getItem('tokenPerfil'));
    if(token == 'UserPerf' || token == 'AdminPerf'){
      return true;
    }else{
      history.back();
      return false;
    }
  }
  history.back();
  return false
};

export const AdminGuard: CanActivateFn = (route, state) => {
  const user = inject(UsuarioService);
  const token = user.desencryptContra(localStorage.getItem('tokenPerfil'))
  if (localStorage.getItem('tokenPerfil')) {
    if(token == 'AdminPerf'){
      return true;
    }
  }
  history.back();
  return false
};

export const AdminOrdenaloGuard:CanActivateChildFn  = (route, state) => {
  let activo :any =localStorage.getItem('usuario');
  console.log(JSON.parse(activo).rol);
  if (JSON.parse(activo).rol == 2) {
    return true
  }else{
    return false;
  }

};