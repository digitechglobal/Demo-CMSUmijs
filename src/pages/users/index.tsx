// import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer, Table, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
// import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data';
import { createUser, updateUser, deleteUser, getUsers } from './service';

import { useEffect } from "react";
import { Modal, Input, Form, Select } from "antd";
import "antd/dist/antd.css";
import { onKeyPress } from "@/utils/utils"

var valueRow: TableListItem;

const { Option } = Select;

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;


// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not validate email!',
//     number: '${label} is not a validate number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading("Vui lòng chờ trong giây lát");
  try {
    await createUser({ ...fields });
    hide();
    message.success("Thêm thành công");

    return true;
  } catch (error) {
    hide();
    message.success("Thêm thất bại");
    return false;
  }
}

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading("Vui lòng chờ trong giây lát");
  try {
    await updateUser({ ...fields });
    hide();
    message.success("Sửa thành công");
    return true;
  } catch (error) {
    hide();
    message.success("Sửa thất bại");
    return false;
  }
}

const handleDelete = async (fields: TableListItem) => {
  const hide = message.loading("Vui lòng chờ trong giây lát");
  try {
    await deleteUser({ ...fields });
    hide();
    message.success("Xóa thành công");
    return true;
  } catch (error) {
    hide();
    message.success("Xóa thất bại");
    return false;
  }
}

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

function tableUser() {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [datasource, setDatasource] = useState([]);
  const [dataFormEdit, setDataFormEdit] = useState({});
  const [row, setRow] = useState<TableListItem>();
  const actionRef = useRef<ActionType>();
  const fontSize = 15;

  const onInsert = (values) => {
    handleAdd(values);
    peticionGet();
    openCloseModalInsert();
    console.log('Received values of form: ', values); //
  };
  const onUpdate = (values) => {
    handleUpdate(values);
    peticionGet();
    openCloseModalEdit();
    console.log('Received values of form: ', values); //
  };
  const onDelete = (values) => {
    handleDelete(valueRow);
    peticionGet();
    openCloseModalRemove();
    console.log('Received values of form: ', valueRow); //
    // handleChange();
  };

  const onOk = () => {
    form.submit();
  };

  const openCloseModalInsert = () => {
    form.resetFields();
    setDataFormEdit({});
    setModalInsertar(!modalInsertar);
  }

  const openCloseModalEdit = () => {
    setModalEditar(!modalEditar);
  }

  const openCloseModalRemove = () => {
    setModalEliminar(!modalEliminar);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    // setDatasource({
    //   ...datasource,
    //   [name]: value
    // });
    setDatasource(value);
    peticionGet();
    console.log(datasource);
  }

  const selected = (data, cas) => { // lay data tren row da click
    setDataFormEdit(data);
    // form.sets
    valueRow = data;
    form.setFieldsValue(data);
    (cas === "Edit") ? openCloseModalEdit() : openCloseModalRemove()
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: 'ID là duy nhất',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      valueType: 'text',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      valueType: 'text',
      render: (_, record) => (
        <Typography.Text style={{ fontSize: fontSize }}>
          {_}
        </Typography.Text>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      valueType: 'text',
      filters: [
        {
          text: 'Male',
          value: 'male',
        },
        {
          text: 'Female',
          value: 'John',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      valueType: 'text',
    },
    // {
    //   title: 'Password',
    //   dataIndex: 'password',
    //   valueType: 'password',

    //   // render: (text, record) => (
    //   //   <Input type = "password" value = record/> 
    //   // ),
    // },
    {
      title: 'Phone Number',
      dataIndex: 'number',
      valueType: 'text',
    },
    // {
    //   key: "detail",
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: 'Không được để trống',
    //       },
    //     ],
    //   },
    //   render: (dom, entity) => (
    //     <>
    //       <Button type="ghost" onClick={() => setRow(entity)}>Detail</Button>
    //     </>
    //   ),
    // },
    {
      title: "Options",
      key: "options",
      render: (record) => (
        <>
          <a type="primary" onClick={() => selected(record, "Edit")}>Edit</a>
          <Divider type="vertical" />
          <a color="#FF0000" onClick={() => selected(record, "Remove")}>Remove</a>
        </>
      ),
      // render: (_, record) => (
      //   <>
      //     <a
      //     // onClick={() => {
      //     //   handleUpdateModalVisible(true);
      //     //   setStepFormValues(record);
      //     // }}
      //     // onClick={() => handleModalVisible(true)}
      //     >
      //       Sửa
      //     </a>
      //     <Divider type="vertical" />
      //     <a
      //       onClick={async () => {
      //         // await handleDeleteSingle({id: Number(row?.id), firstName: '', lastName: '', gender: '', password: '', number: '', email: ''}); //
      //         console.log();
      //         actionRef.current?.reloadAndRest?.();
      //       }}
      //     >
      //       Xóa
      //     </a>
      //   </>
      // ),
    },
  ];


  const peticionGet = async () => {
    const result = await getUsers();
    // console.log("peticionGet -> result", result)
    if (result) {
      setDatasource(result.data);
    }
  };
  
  const getUser = setTimeout(() => {
    peticionGet()
  }, 3000);

  const [form] = Form.useForm();
  // const peticionGet=async()=>{
  //     await axios.get("http://192.168.100.26:4000/api/users")
  //     .then(response=>{
  //       setData(response.data);
  //     }).catch(error=>{
  //       console.log(error);
  //     })
  //       }
  const peticionPost = async () => { };
  const peticionPut = async () => { };
  const peticionDelete = async () => { };
  //   const peticionPost=async()=>{
  //     delete datasource.id;
  //     await axios.post(baseUrl, artista)
  //     .then(response=>{
  //       setData(data.concat(response.data));
  //       abrirCerrarModalInsertar();
  //     }).catch(error=>{
  //       console.log(error);
  //     })
  //       }

  //   const peticionPut=async()=>{
  //     await axios.put(baseUrl+"/"+artista.id, artista)
  //     .then(response=>{
  //       var dataAuxiliar=data;
  //       dataAuxiliar.map(elemento=>{
  //         if(elemento.id===artista.id){
  //           elemento.artista=artista.artista;
  //           elemento.pais=artista.pais;
  //           elemento.periodo=artista.periodo;
  //         }
  //       });
  //       setData(dataAuxiliar);
  //       abrirCerrarModalEditar();
  //     }).catch(error=>{
  //       console.log(error);
  //     })
  //       }


  //   const peticionDelete=async()=>{
  //     await axios.delete(baseUrl+"/"+artista.id)
  //     .then(response=>{
  //       setData(data.filter(elemento=>elemento.id!==artista.id));
  //       abrirCerrarModalEliminar();
  //     }).catch(error=>{
  //       console.log(error);
  //     })
  //       }

  useEffect(() => {
    getUser
  }, [datasource])

  return (
    <div className="App">
      <br />
      <br />
      <Button type="primary" className="botonInsertar" onClick={openCloseModalInsert}>Create new user</Button>
      <br />
      <br />
      <Table columns={columns} dataSource={datasource} />


      <Modal
        // visible={modalInsertar}
        // title="Insert User"
        // destroyOnClose={true}
        // onCancel={abrirCerrarModalInsertar}
        // onOk={onOk}
        // centered
        // footer={[
        //   <Button onClick={abrirCerrarModalInsertar}>Cancel</Button>,
        //   <Button type="primary" onClick={peticionPost}>Insert</Button>,
        // ]}
        title="Create New User"
        onOk={onOk}
        onCancel={openCloseModalInsert}
        visible={modalInsertar}
      >
        {/* <Form {...layout}>
          <Item label="Fist Name">
            <Input name="firstName" onChange={handleChange} value={datasource && datasource.firstName} />
          </Item>

          <Item label="Last Name">
            <Input name="lastName" onChange={handleChange} value={datasource && datasource.lastName} />
          </Item>

          <Item label="Gender">
            <Input name="gender" onChange={handleChange} value={datasource && datasource.gender} />
          </Item>

          <Item label="Password">
            <Input name="password" onChange={handleChange} value={datasource && datasource.password} />
          </Item>

          <Item label="Email">
            <Input name="email" onChange={handleChange} value={datasource && datasource.email} />
          </Item>

          <Item label="NumberPhone">
            <Input name="number" onChange={handleChange} value={datasource && datasource.number} />
          </Item>
        </Form> */}
        <Form form={form} layout="vertical" name="insertForm" onFinish={onInsert}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                type: 'string',
                required: true,
                message: 'first name is required'
              },
              {
                pattern: new RegExp(/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ./, ]+$/i),
                message: 'field accept only letters'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                type: 'string',
                required: true,
                message: 'last name is required'
              },
              {
                pattern: new RegExp(/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ./, ]+$/i),
                message: 'field accept only letters'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gender">
            <Input.Group compact>
              <Form.Item
                name={'gender'}
                noStyle
                rules={[{ required: true, message: 'Gender is required' }]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'email is required'
              }
            ]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                type: 'string',
                required: true, message: 'email is required'
              },
              {
                min: 3, message: 'Password must be minimum 3 characters.'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="number"
            label="Phone Number"
            rules={[
              {
                required: true,
                min: 10, max: 10, message: 'Phone number must be 10 characters.'
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>



      <Modal
        visible={modalEditar}
        title="Edit User"
        onCancel={openCloseModalEdit}
        onOk={onOk}
        centered
      // footer={[
      //   <Button onClick={openCloseModalEdit}>Cancel</Button>,
      //   <Button type="primary" onClick={onUpdate}>Edit</Button>,
      // ]}
      >

        <Form form={form} layout="vertical" name="editForm" onFinish={onUpdate}>
        <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                type: 'string',
                required: true,
                message: 'first name is required'
              },
              {
                pattern: new RegExp(/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ./, ]+$/i),
                message: 'field accept only letters'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                type: 'string',
                required: true,
                message: 'last name is required'
              },
              {
                pattern: new RegExp(/^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ./, ]+$/i),
                message: 'field accept only letters'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gender">
            <Input.Group compact>
              <Form.Item
                name={'gender'}
                noStyle
                rules={[{ required: true, message: 'Gender is required' }]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'email is required'
              }
            ]}
          >
            <Input placeholder="example@gmail.com" disabled={true}/>
          </Form.Item >
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                type: 'string',
                required: true, message: 'email is required'
              },
              {
                min: 10, message: 'Password must be minimum 3 characters.'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="number"
            label="Phone Number"
            rules={[
              {
                required: true,
                min: 10, max: 10, message: 'Phone number must be 10 characters.'
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>


      <Modal
        visible={modalEliminar}
        onCancel={openCloseModalRemove}
        onOk={onOk}
        centered
      // footer={[
      //   <Button onClick={openCloseModalRemove}>No</Button>,
      //   <Button type="primary" danger onClick={peticionDelete}>Yes</Button>,
      // ]}
      >
        <Form form={form} layout="vertical" name="deleteForm" onFinish={onDelete}>Are you sure you want to remove the user <b>{''}</b>?</Form>
      </Modal>
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
            title={'User ID: ' + row?.id}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
          // columns={columns}
          />
        )}
      </Drawer>
    </div>
  );
}

export default tableUser;