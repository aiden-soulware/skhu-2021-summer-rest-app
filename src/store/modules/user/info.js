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
const validationMessages = {
  error: {
    firstName: 'Invalid First Name',
    lastName: 'Invalid Last Name',
    email: 'Invalid E-mail',
  },
  success: {
    firstName: 'Valid First Name',
    lastName: 'Valid Last Name',
    email: 'Valid E-mail',
  },
};
const informationMessages = {
  firstName: 'Please Fill in the First Name form',
  lastName: 'Please Fill in the Last Name form',
  email: 'Please Fill in the E-mail form',
};
export default { user, regExp, validationMessages, informationMessages };
