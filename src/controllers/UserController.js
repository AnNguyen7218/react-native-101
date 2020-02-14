class UserController {
  // fake call api
  login = (email, name) => ({email, name});
  logout = () => null;
}

export default new UserController();
