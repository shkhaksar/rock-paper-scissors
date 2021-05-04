import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import Auth from "@/layouts/auth";
import {unwrapResult} from '@reduxjs/toolkit'
import {Form, Input, Button, Card, message} from "antd";
import store from "@/store/store";
import {signup} from "@/store/slices/userSlice";

class Login extends Component {

    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.onFinish = this.onFinish.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('token'))
            this.props.history.push('/')
    }


    async onFinish(values) {
        try {
            unwrapResult(await store.dispatch(signup({
                name: values.name,
                email: values.email,
                password: values.password,
            })))
            message.success('Your account has been created successfully.')
            this.props.history.push('/login')
        } catch (err) {
            console.log(err)
            message.error('Please check your data.')
        }
    }

    render() {
        return (
            <Auth>
                <Card bodyStyle={{paddingBottom: 0}}>
                    <Form name="login" onFinish={this.onFinish} layout={"vertical"} ref={(form) => (this.form = form)}>
                        <Form.Item label="Full Name"
                                   name="name"
                                   rules={[
                                       {required: true, message: 'Please input your name!'}
                                   ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Email"
                                   name="email"
                                   rules={[
                                       {type: 'email', message: "Email is invalid!"},
                                       {required: true, message: 'Please input your email!'}
                                   ]}>
                            <Input type={"email"}/>
                        </Form.Item>
                        <Form.Item label="Password"
                                   name="password"
                                   rules={[
                                       {required: true, message: 'Please input your password!'},
                                       {min: 6, message: 'Password must be at least 6 character.'}
                                   ]}>
                            <Input type={"password"}/>
                        </Form.Item>
                        <Form.Item label="Confirm password" dependencies={['password']}
                                   hasFeedback
                                   name="confirm_password"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please confirm your password!',
                                       },
                                       ({getFieldValue}) => ({
                                           validator(rule, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject('The two passwords that you entered do not match!');
                                           },
                                       }),
                                   ]}>
                            <Input type={"password"}/>
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" loading={this.props.loading} htmlType="submit">
                                Signup
                            </Button>
                            <Button style={{marginTop: 10}} type={"link"} block>
                                <Link to="/login">Have an account? Login here</Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Auth>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.user.loading,
})

export default connect(mapStateToProps)(withRouter(Login));