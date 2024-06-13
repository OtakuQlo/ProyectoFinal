import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(UsuarioService);
  const token = user.desencryptContra(localStorage.getItem('tokenUser'));
  if (token == 'UsuarioOrdenalo') {
    if(localStorage.getItem('tokenPerfil')){
      history.back();
      return false;
    }
    return true;
  }
  history.back();
  return false;
};

export const AdminORDGuard: CanActivateChildFn = (route,state) => {
  const user = inject(UsuarioService);
  if (localStorage.getItem('tokenUser')) {
    const token = user.desencryptContra(localStorage.getItem('tokenUser'));
    if(token == 'AdminOrdenalo'){

    }
    if(localStorage.getItem('tokenPerfil')){
      history.back();
      return false;
    }
    return true;
  }
  history.back();
  return false;
}

export const HomeGuard: CanActivateFn = (route, state) => { 
  if(localStorage.getItem('tokenUser') || localStorage.getItem('tokenPerfil')){
    if(localStorage.getItem('tokenUser') && !localStorage.getItem('tokenPerfil')){
      window.location.href= '/Perfiles';
      return false;
    }else if(!localStorage.getItem('tokenUser') && localStorage.getItem('tokenPerfil')){
      window.location.href= '/Venta';
      return false;
    }
    window.location.href= '/Perfiles'
    return false;
  }
  
  return true;
};

export const PUGuard:CanActivateFn = (route, state) => {
  const user = inject(UsuarioService);
  if(localStorage.getItem('tokenPerfil') ){
    const token = user.desencryptContra(localStorage.getItem('tokenPerfil'));
    
    if(token == 'AdminPerf' || token == 'UserPerf'){
      return true;
    }else{
      history.back();
      return false;
    }
  }
  if(localStorage.getItem('tokenUser')){
    const token2 = user.desencryptContra(localStorage.getItem('tokenUser'));
    if(token2 == 'AdminOrdenalo'){
      return true;
    }
  }
  history.back();
  return false
};

export const AdminGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('tokenPerfil')){
    const user = inject(UsuarioService);
    const token = user.desencryptContra(localStorage.getItem('tokenPerfil'));
    if(token == 'AdminPerf'){
      return true;
    }else{
      history.back();
      return false;
    }
  }
  window.location.href = '/Home';
  return false
};

