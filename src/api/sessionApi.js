import api from './apiService';

class Session {
  static login(user) {
    return api.post('/users/sign_in', user);
  }

  static logout() {
    return api.delete('/users/sign_out');
  }

  static signUp(user) {
    return api.post('/users', user);
  }

  static forgot(user,redirect_url) {
    return api.post('/users/password', {email: user.email, redirect_url: redirect_url});
  }
  static reset(user,headers) {
    return api.putWithCustomHeaders('/users/password', {password: user.password, password_confirmation: user.passwordConfirmation}, headers);
  }

}

export default Session;
