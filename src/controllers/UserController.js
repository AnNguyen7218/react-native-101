// import httpClient from './HttpClient';

class UserController {
  constructor() {
    this.basePath = '/users';
  }
  // fake call api
  login = (email, name) => {email, name}
  
  logout = () => null;
}

export default new UserController();
