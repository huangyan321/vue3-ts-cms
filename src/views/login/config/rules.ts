export const rules = {
  username: [
    {
      pattern: /^[0-9a-zA-Z]{3,}$/,
      message: 'Please input at least 6 char'
    },
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur'
    }
  ]
}
