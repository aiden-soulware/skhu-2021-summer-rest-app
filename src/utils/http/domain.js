const user = '/user';

export default {
  user: {
    list: { task: 'get', url: `${user}/list` },
    id: { task: 'get', url: `${user}/#id` },
  },
};
