const Util = (name, type) => {
  const array = {
    Login: '/auth/login',
    Dashboard: '/',
    User: '/user',
    MyProfile: '/my-profile',
  }; // 💬 generate link to here

  const apis = {
    Dashboard: '/dashboard',
    User: '/user',
    Auth: '/auth',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
