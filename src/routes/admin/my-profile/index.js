import React, { useEffect, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useAuth } from 'globalContext';
import { Form, Spin } from 'components';
import { ColumnRegister } from '../../../columns/auth';
import { Form as FormAnt } from 'antd';
import { AuthService } from '../../../services/user';

const Page = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const [values, setValues] = useState(user);

  const submit = async (values) => {
    setValues(values);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AuthService.profile();
      setValues(data);
      setIsLoading(false);
    };
    fetchData();
  }, [pathname]);

  return (
    <Fragment>
      <Spin className="intro-x" spinning={isLoading}>
        <Form
          form={form}
          className="intro-x"
          columns={ColumnRegister({ t })}
          textSubmit={t('routes.auth.login.Log In')}
          handSubmit={submit}
          disableSubmit={isLoading}
          values={values}
        />
      </Spin>
    </Fragment>
  );
};
export default Page;
