export default {
  user: {
    list: { task: 'get', url: `/user/list` },
    id: { task: 'get', url: `/user/#id` },
    email: { task: 'post', url: `/user/email` },
    create: { task: 'post', url: `/user/create` },
    update: { task: 'post', url: `/user/update` },
    delete: { task: 'post', url: `/user/delete` },
  },
  s3: {
    upload: { task: 'uploadFile', url: `/s3/upload` },
    delete: { task: 'post', url: `/s3/delete` },
  },
};
