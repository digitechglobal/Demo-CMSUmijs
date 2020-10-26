// import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer, Table } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
// import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data';
import { createUser, updateUser, deleteUser, getUsers } from './service';

// const UserPage = () => {
//   return (
//     <>
//       This is user page !1
//     </>
//   )
// }

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading("Vui lòng chờ trong giây lát");
  try{
    await createUser({ ...fields });
    hide();
    message.success("Thêm thành công");
    return true;
  }catch (error) {
    hide();
    message.success("Thêm thất bại");
    return false;
  }
}

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading("Vui lòng chờ trong giây lát");
  try{
    await updateUser({
      firstName: fields.firstName,
      lastName: fields.lastName,
      gender: fields.gender,
      email: fields.email,
      password: fields.password,
      number: fields.number,
    });
    hide();
    message.success("Sửa thành công");
    return true;
  }catch (error) {
    hide();
    message.success("Sửa thất bại");
    return false;
  }
}

const handleDelete = async (fields: TableListItem) => {
  const hide = message.loading("Vui lòng chờ trong giây lát");
  try{
    await deleteUser({ ...fields });
    hide();
    message.success("Xóa thành công");
    return true;
  }catch (error) {
    hide();
    message.success("Xóa thất bại");
    return false;
  }
}

const handleDeleteSingle = async (fields: TableListItem) => {
  const hide = message.loading("Vui lòng chờ trong giây lát");
  try{
    await deleteUser({ ...fields });
    hide();
    message.success("Xóa thành công");
    return true;
  }catch (error) {
    hide();
    message.success("Xóa thất bại");
    return false;
  }
}

const dataSource = [
  {
    id: 1,
    firstName: 'Truong',
    lastName: 'Bien',
    email: 'truong0104@gmail.com',
    password: '123123',
    gender: 'male',
    number: '1231231',
  },
  {
    id: 2,
    firstName: 'Phuoc',
    lastName: 'Nguyen',
    email: 'Phuoc231@gmail.com',
    password: '123123',
    gender: 'male',
    number: '1231231',
  },
];

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: 'ID là duy nhất',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Không được để trống',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Tên',
      dataIndex: 'firstName',
      valueType: 'text',
    },
    {
      title: 'Họ',
      dataIndex: 'lastName',
      valueType: 'text',  
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      valueType: 'text',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      valueType: 'password',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'number',
      valueType: 'text',
    },
    {
      title: 'Lựa chọn',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            // onClick={() => {
            //   handleUpdateModalVisible(true);
            //   setStepFormValues(record);
            // }}
            // onClick={() => handleModalVisible(true)}
          >
            Sửa
          </a>
          <Divider type="vertical" />
          <a 
            onClick={async () => {
              // await handleDeleteSingle({id: Number(row?.id), firstName: '', lastName: '', gender: '', password: '', number: '', email: ''}); //
              console.log();
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Xóa
          </a>
        </>
      ),
    },
  ];

  <ProTable dataSource={dataSource} columns={columns} />;

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="Danh sách Users"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Thêm mới
          </Button>,
        ]}
        request={(params, sorter, filter) => getUsers()} //
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Da chon <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> Muc&nbsp;&nbsp;
              <span>
                Tong so cuoc goi dich vu {selectedRowsState.reduce((pre, item) => pre + item.id, 0)} 10nghin
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              // await handleDelete(selectedRowsState); //
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Xóa nhiều
          </Button>
          <Button type="primary">Thêm nhiều</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {/* {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null} */}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.id}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList