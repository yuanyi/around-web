import '../styles/Register.css';
import { API_ROOT } from '../constants'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';



const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};



const RegistrationForm = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        let lastResponse;
        console.log('Received values of form: ', values);
        fetch(`${API_ROOT}/signup`, {
            method: 'POST',
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            }),
        }).then((response) => {
            lastResponse = response;
            return response.text();
        }, (error) => {
            console.log('Error');
        }).then((text) => {
            if (lastResponse.ok) {
                message.success(text);
                this.props.history.push('/login');
            } else {
                message.error(text);
            }
        });
    }


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = value => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }));
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}

            scrollToFirstError
            className="register-form"
        >
            <Form.Item
                name="Username"
                label="Username"
                rules={[

                    {
                        required: true,
                        message: 'Please input your Uername!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <div>
                    I already have an account, go back to <Link to="/Login">Login</Link>
                </div>
            </Form.Item>

        </Form>
    );
};

// export const Register = Form.create({ name: 'register' })(RegistrationForm);
export const Register = RegistrationForm;
// export const Register = Form.useForm(RegistrationForm);
