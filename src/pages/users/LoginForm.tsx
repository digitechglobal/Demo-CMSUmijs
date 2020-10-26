import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, message, InputNumber } from 'antd';
// import { Style } from 'jodit/src/modules';
import styles from './LoginForm.less';
import { Userlogin } from './service';
import { Login } from './data'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { colorToHex } from 'jodit/src/core/helpers';
import store from 'store';
import { connect, history, Dispatch} from 'umi';
import { ConnectState } from '@/models/connect';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const transfer = async () => {
    history.push("/user");
}
const login = async (fields: Login) => {
    const hide = message.loading("Vui lòng chờ trong giây lát");
    // try {
    //     await Userlogin({ ...fields });
    //     console.log('UserLogin Function -> currentUser', store.get('currentUser'));
    //     console.log('UserLogin Function -> accessToken', store.get('accessToken'));
    //     hide();
    //     // message.success("Đăng nhập thành công");
    //     // window.location.href = 'http://localhost:8000/#/user';
    //     await transfer();
    //     return true;
    // } catch (error) {
    //     hide();
    //     message.success("Đăng nhập thất bại");
    //     return false;
    // }

}

interface DemoProps {
    dispatch: Dispatch
    isSubmitting?: boolean
}

const Demo: React.FC<DemoProps> = (props) => {
    const { dispatch } = props;
    const onFinish = async (values) => {
        console.log('LoginForm -> Success:', values);
        dispatch( { type: "user/login" , payload: {...values} } )
        // login(values);
        // await transfer();
        // window.location.href = 'http://localhost:8000/#/user';
    };

    const onFinishFailed = (errorInfo) => {
        console.log('LoginForm -> Failed:', errorInfo);
    };

    return (
        <Form className={styles.form}
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label={<label className={styles.item}>Email</label>}
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>

            <Form.Item
                label={<label className={styles.item}>Password</label>}
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox className={styles.item} >Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
          </Button>
            </Form.Item>
        </Form>
    );
};
export default connect(({user, loading}:ConnectState) => ({
    isSubmitting: loading.effects["user/login"]
}))(Demo);