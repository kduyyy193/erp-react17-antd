import axios from 'axios';

import { routerLinks } from 'utils';
import { keyRefreshToken, keyToken } from '../../variable';
// import { Message } from 'components';

export const AuthService = {
  nameLink: 'Auth',
  login: async (values) => {
    // const { data } = await axios.post(`${routerLinks(AuthService.nameLink, 'api')}/login`, values);
    // const { user, accessToken, refreshToken } = data.data;
    // return {
    //   accessToken,
    //   refreshToken,
    //   ...user,
    // };
    return {
      // ...data,
      data: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiMSIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjI0MzY5Mjk3LCJleHAiOjE2MjQ0NTU2OTcsImlhdCI6MTYyNDM2OTI5NywiaXNzIjoiaHR0cHM6Ly90cnVuZy5uZXQubGV2aW5jaXRlc3QuY29tL2FwaS8ifQ.bGF2dbIZMwEEKbTuTjRJE_kkEyX0znDSQMji1bpIjQU',
        avatarPath: 'https://talkpro.edu.vn/wp-content/uploads/2017/11/avatar-girl-xinh-6.jpg',
        createdBy: 1,
        createdDate: '2021-03-17T16:12:50',
        email: 'admin@admin.com',
        employeeId: 1,
        id: 2,
        isDisabled: false,
        name: 'Nguyễn Văn A',
      },
    };
  },
  profile: async () => {
    const { data } = await axios.get(`${routerLinks(AuthService.nameLink, 'api')}/profile`);
    return data;
  },
  logout: async () => await axios.get(`${routerLinks(AuthService.nameLink, 'api')}/logout`),
  refresh: async () => {
    const { data } = await axios.get(`${routerLinks(AuthService.nameLink, 'api')}/refresh`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(keyRefreshToken),
      },
    });
    if (data) {
      const { accessToken } = data.data;
      localStorage.setItem(keyToken, accessToken);
      axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
      return 'Bearer ' + accessToken;
    }
  },
};

export const UserService = {
  nameLink: 'User',
  get: async (params) => {
    // const { data } = await axios.get(routerLinks(UserService.nameLink, "api"), {
    //   params,
    // });
    // return data;
    return {
      data: [
        {
          id: 1,
          name: 'Nguyễn Văn 1',
          username: 'UserName1',
          email: 'email1@gmail.com',
          isActive: false,
          tag: ['a1'],
        },
        {
          id: 2,
          name: 'Nguyễn Văn 2',
          username: 'UserName2',
          email: 'email2@gmail.com',
          isActive: true,
          tag: ['a2'],
        },
        {
          id: 3,
          name: 'Nguyễn Văn 3',
          username: 'UserName3',
          email: 'email3@gmail.com',
          isActive: false,
          tag: ['a3'],
        },
        {
          id: 4,
          name: 'Nguyễn Văn 4',
          username: 'UserName4',
          email: 'email4@gmail.com',
          isActive: true,
          tag: ['a4'],
        },
        {
          id: 5,
          name: 'Nguyễn Văn 5',
          username: 'UserName5',
          email: 'email5@gmail.com',
          isActive: false,
          tag: ['a5'],
        },
        {
          id: 6,
          name: 'Nguyễn Văn 6',
          username: 'UserName6',
          email: 'email6@gmail.com',
          isActive: true,
          tag: ['a6'],
        },
        {
          id: 7,
          name: 'Nguyễn Văn 7',
          username: 'UserName7',
          email: 'email7@gmail.com',
          isActive: false,
          tag: ['a7'],
        },
        {
          id: 8,
          name: 'Nguyễn Văn 8',
          username: 'UserName8',
          email: 'email8@gmail.com',
          isActive: true,
          tag: ['a8'],
        },
        {
          id: 9,
          name: 'Nguyễn Văn 9',
          username: 'UserName9',
          email: 'email9@gmail.com',
          isActive: false,
          tag: ['a9'],
        },
        {
          id: 10,
          name: 'Nguyễn Văn 10',
          username: 'UserName10',
          email: 'email10@gmail.com',
          isActive: true,
          tag: ['a10'],
        },
      ],
      count: 20,
    };
  },
  getById: async (id) => {
    // const { data } = await axios.get(
    //   `${routerLinks(UserService.nameLink, "api")}/${id}`
    // );
    // return data;
    return { data: { id } };
  },
  post: async (values) => {
    // const { data } = await axios.post(
    //   routerLinks(UserService.nameLink, "api"),
    //   values
    // );
    // if (data.message) Message.success({text: data.message});
    // return data;
    return values;
  },
  put: async (values, id) => {
    // const { data } = await axios.put(
    //   `${routerLinks(UserService.nameLink, "api")}/${id}`,
    //   values
    // );
    // if (data.message) Message.success({text: data.message});
    // return data;
    return values;
  },
  delete: async (id) => {
    // const { data } = await axios.delete(
    //   `${routerLinks(UserService.nameLink, "api")}/${id}`
    // );
    // if (data.message) Message.success({text: data.message});
    // return data;
    return { id };
  },
};
