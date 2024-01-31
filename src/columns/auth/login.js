const Column = ({ t }) => {
  return [
    {
      name: 'email',
      title: t('columns.auth.login.Username'),
      formItem: {
        placeholder: t('columns.auth.login.Enter Username'),
        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
      },
    },
    {
      name: 'password',
      title: t('columns.auth.login.password'),
      formItem: {
        placeholder: t('columns.auth.login.Enter Password'),
        type: 'password',
        rules: [{ type: 'required' }, { type: 'min', value: 6 }],
      },
    },
  ];
};
export default Column;
