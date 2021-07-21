const user = '/api/user';

export default {
  user: {
    list: { task: 'get', url: `${user}/list` },
    id: { task: 'get', url: '/users/#id' },
    create: { task: 'post', url: '/users' },
  },
};
