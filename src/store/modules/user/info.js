const reg = {
  name: /^[a-zA-Z]{2,20}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.]{1}[a-zA-Z]{2,3}$/i,
};

const regExp = {
  firstName: reg.name,
  lastName: reg.name,
  email: reg.email,
};
const validationMessages = {
  error: {
    firstName: 'Invalid First Name',
    lastName: 'Invalid Last Name',
    email: 'Invalid E-mail',
  },
  success: {
    firstName: ' ',
    lastName: ' ',
    email: ' ',
  },
};

let user = { firstName: '', lastName: '', email: '' };

export default {
  user,
  regExp,
  validationMessages,
};
