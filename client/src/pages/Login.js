import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router-dom";
import Auth from "@/layouts/auth";
import {unwrapResult} from '@reduxjs/toolkit'
import {Form, Input, Button, Card, message} from "antd";
import store from "@/store/store";
import {login} from "@/store/slices/userSlice";

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
            unwrapResult(await store.dispatch(login({
                email: values.email,
                password: values.password,
            })))
            this.props.history.push('/')
        } catch (err) {
            console.log(err)
            message.error('Check your email or password!')
        }
    }

    render() {
        return (
            <Auth>
                <Card bodyStyle={{paddingBottom: 0}}>
                    <Form name="login" onFinish={this.onFinish} layout={"vertical"} ref={(form) => (this.form = form)}>
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
                                       {required: true, message: 'Please input your password!'}
                                   ]}>
                            <Input type={"password"}/>
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" loading={this.props.loading} htmlType="submit">
                                Login
                            </Button>
                            <Button style={{marginTop: 10}} type={"link"} block>
                                <Link to="/signup">Don't you have account? Register here</Link>
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