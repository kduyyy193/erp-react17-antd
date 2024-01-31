import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { useAuth } from 'globalContext';
import { DataTable, ModalForm, ModalDrag, Button } from 'components';
import { ColumnUser } from 'columns/user';
import { UserService } from 'services/user';
const Page = () => {
  const { t } = useTranslation();
  // changePermission permission
  const { formatDate } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [listGender, set_listGender] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const init = async () => {
      await set_listGender([
        {
          value: 'Male',
          label: 'Male',
        },
        {
          value: 'Female',
          label: 'Female',
        },
      ]);
    };
    init();
  }, [pathname]);

  const dataTableRef = useRef();
  const modalFormRef = useRef();
  const modalDragRef = useRef();
  return (
    <Fragment>
      <DataTable
        ref={dataTableRef}
        onRow={(data) => ({
          onDoubleClick: (event) => {},
        })}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        pageSizeRender={(sizePage) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from, to, total) => 'Hiển thị ' + from + '-' + to + ' / Tổng số ' + total + ' danh mục'}
        Get={UserService.get}
        columns={ColumnUser({
          t,
          formatDate,
          handleEdit: modalFormRef?.current?.handleEdit,
          handleDelete: modalFormRef?.current?.handleDelete,
        })}
        rightHeader={
          <Fragment>
            <Button onClick={() => modalDragRef?.current?.handleShow()} className={'mr-2'}>
              <i className="las la-plus mr-1" />
              {t('Vai trò')}
            </Button>
            <Button onClick={() => modalFormRef?.current?.handleEdit()}>
              <i className="las la-plus mr-1" />
              {t('Tạo mới')}
            </Button>
          </Fragment>
        }
      />
      <ModalForm
        ref={modalFormRef}
        title={(data) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleChange={async () => await dataTableRef?.current?.onChange()}
        columns={ColumnUser({
          t,
          formatDate,
          listGender,
        })}
        GetById={UserService.getById}
        Post={UserService.post}
        Put={UserService.put}
        Delete={UserService.delete}
        widthModal={600}
        idElement={'user'}
      />
      <ModalDrag
        ref={modalDragRef}
        title={() => t('Vai trò')}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        columns={ColumnUser({ t })}
        Get={() => [
          {
            id: '1',
            name: 'Biên tập viên',
          },
          {
            id: '2',
            name: 'Người dùng',
          },
          {
            id: '3',
            name: 'Quản trị viên',
          },
          {
            id: '4',
            name: 'Thanh tra',
          },
          {
            id: '5',
            name: 'Trưởng phòng',
          },
        ]}
        Put={UserService.put}
        Post={UserService.post}
        Delete={UserService.delete}
        GetById={UserService.getById}
        widthForm={1200}
        isReloadLoadToSave={true}
        idElement={'role'}
      />
    </Fragment>
  );
};
export default Page;
