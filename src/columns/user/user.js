import { Popconfirm, Tooltip } from 'antd';
import React, { Fragment } from 'react';
import { Avatar, Button } from 'components';
import { routerLinks } from 'utils';
import { linkApi } from '../../variable';

const Column = ({ t, formatDate, listGender, handleEdit, handleDelete }) => {
  return [
    {
      title: t('Họ và tên'),
      name: 'name',
      tableItem: {
        filter: { type: 'search' },
        width: 200,
        fixed: window.innerWidth > 767,
        sorter: true,
        onCell: (data) => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: async () => {},
        }),
        render: (text) =>
          text && (
            <Avatar src="https://hinhanhdep.org/wp-content/uploads/2016/07/anh-avatar-girl-xinh.jpg" text={text} />
          ),
      },
      formItem: {
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Test'),
      name: 'Date',
      formItem: {
        type: 'date',
      },
    },
    {
      name: 'vehicles',
      formItem: {
        type: 'addable',
        textAdd: t('Add vehicle'),
        column: [
          {
            name: 'vehicleBrand',
            title: t('Hiệu xe'),
            formItem: {},
          },
          {
            name: 'licensePlate',
            title: t('Biển số xe'),
            formItem: {},
          },
        ],
      },
    },
    {
      name: 'gender',
      title: 'Gender',
      formItem: {
        type: 'select',
        rules: [{ type: 'required' }],
        onChange: (value, form) => console.log(value, form),
        list: listGender,
      },
    },
    {
      name: 'gender',
      title: 'Gender',
      formItem: {
        type: 'checkbox',
        rules: [{ type: 'required' }],
        onChange: (value, form) => console.log(value, form),
        list: listGender,
      },
    },
    {
      title: t('Color'),
      name: 'color',
      formItem: {
        type: 'color_button',
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Tên tài khoản'),
      name: 'username',
      tableItem: {
        filter: { type: 'search' },
        sorter: true,
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: 0 } }),
        render: (text) =>
          text && (
            <Avatar
              isGroup
              keySrc="avatarPath"
              keyName="fullName"
              text={[
                {
                  fullName: 'Văn A',
                },
                {
                  fullName: 'Quỳnh B',
                },
                {
                  fullName: 'Lê F',
                },
                {
                  fullName: 'Tân C',
                  avatarPath: 'https://hinhanhdep.org/wp-content/uploads/2016/07/anh-avatar-girl-xinh.jpg',
                },
                {
                  fullName: 'Nguyễn D',
                },
              ]}
            />
          ),
      },
      formItem: {
        type: 'textarea',
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('Thu nhập'),
      name: 'Currency',
      formItem: {
        mask: {
          alias: 'numeric',
          groupSeparator: '.',
          autoGroup: true,
          placeholder: '0',
          autoUnmask: true,
          digits: 2,
          digitsOptional: true,
          radixPoint: ',',
        },
      },
    },
    {
      title: t('Email'),
      name: 'email',
      tableItem: {
        filter: { type: 'search' },
        sorter: true,
      },
      formItem: {
        rules: [{ type: 'required' }, { type: 'email' }],
      },
    },
    {
      title: t('Trạng thái'),
      name: 'isActive',
      tableItem: {
        sorter: true,
        render: (text) => text && <i className="las la-check-circle la-2x" />,
      },
      formItem: {
        condition: (data) => !!data && data.id,
        type: 'switch',
      },
    },
    {
      title: t('Tag'),
      name: 'tag',
      formItem: {
        rules: [{ type: 'required' }],
        type: 'chips',
        col: 24,
      },
    },
    {
      title: t('Assign to'),
      name: 'assignTo',
      formItem: {
        rules: [{ type: 'required' }],
        type: 'tag',
        col: 24,
        convert: (data) => (data?.map ? data.map((_item) => _item?.id || _item) : data),
        tag: {
          api: routerLinks('User', 'api') + '/brief',
          params: (form, fullTextSearch, value) => ({
            fullTextSearch,
            filter: { containEmployees: value || [] },
          }),
          avatar: 'avatarPath',
          label: 'fullName',
          value: 'id',
        },
      },
    },
    {
      title: t('Attachment'),
      name: 'attachment',
      formItem: {
        type: 'upload',
        onlyImage: true,
        action: linkApi + '/auth/upload',
        keyImage: 'path',
      },
    },
    {
      title: t('Hoạt động'),
      tableItem: {
        width: 180,
        align: 'center',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' } }),
        render: (text, data) => (
          <Fragment>
            <Tooltip title={t('routes.admin.Layout.Edit')}>
              <Button type={'icon'} onClick={() => handleEdit(data)} className={'mr-2'}>
                <i className="las la-edit text-xl" />
              </Button>
            </Tooltip>
            <Tooltip title={t('routes.admin.Layout.Delete')}>
              <Popconfirm
                placement="left"
                title={t('components.datatable.areYouSureWant')}
                icon={<i className="las la-question-circle text-2xl text-yellow-500 absolute -top-0.5 -left-1" />}
                onConfirm={() => handleDelete(data.id)}
                okText={t('components.datatable.ok')}
                cancelText={t('components.datatable.cancel')}
              >
                <Button type={'icon'}>
                  <i className="las la-trash-alt text-xl" />
                </Button>
              </Popconfirm>
            </Tooltip>
          </Fragment>
        ),
      },
    },
  ];
};
export default Column;
