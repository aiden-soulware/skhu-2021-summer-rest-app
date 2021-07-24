export default {
  user: {
    list: { task: 'get', url: `/user/list` },
    id: { task: 'get', url: `/user/#id` },
    email: { task: 'post', url: `/user/email` },
    create: { task: 'post', url: `/user/create` },
  },
  s3: {
    upload: { task: 'uploadFile', url: `/s3/upload` },
  },
};
