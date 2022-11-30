const validation = {
  name: { required: 'Name is required.' },
  lastName: { required: 'Last name is required.' },
  organisation: { required: 'Organisation is required.' },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      message: 'Email address is invalid.'
    }
  },
  phone: {
    required: 'Phone number is required.',
    pattern: {
      value: /^(\([0-9]{3}\)|[0-9]{3}-)\s?[0-9]{3}-[0-9]{4}$/,
      message: 'Phone number is invalid.'
    }
  }

}

export default validation