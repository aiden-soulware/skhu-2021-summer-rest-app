export default {
  user: {
    list: { task: 'get', url: '/users' },
    id: { task: 'get', url: '/users/#id' },
    create: { task: 'post', url: '/users' },
  },
};
