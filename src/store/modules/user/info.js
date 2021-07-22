const reg = {
  name: /^[a-zA-Z]{1,20}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.]{1}[a-zA-Z]{2,3}$/i,
};

const user = { firstName: '', lastName: '', email: '' };

const regExp = {
  firstName: reg.name,
  lastName: reg.name,
  email: reg.email,
};
const messages = {
  error: {
    firstName: 'Invalid first name',
    lastName: 'Invalid last name',
    email: 'Invalid e-mail',
  },
  success: {
    firstName: 'Valid first name',
    lastName: 'Valid last name',
    email: 'Valid e-mail',
  },
};

export default { user, regExp, messages };
