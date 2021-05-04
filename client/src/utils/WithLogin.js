import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import store from "@/store/store";
import {current, logout} from "@/store/slices/userSlice";
import {unwrapResult} from '@reduxjs/toolkit'
import {Spin} from "antd";
import {closeSocket} from "@/store/slices/socketSlice";

const mapStateToProps = state => ({
    loading: state.user.loading,
    user: state.user.user,
})

export default (Component) => connect(mapStateToProps)(class WithLogin extends React.Component {

    async componentDidMount() {
        if (localStorage.getItem('token')) {
            try {
                unwrapResult(await store.dispatch(current()))
            } catch (err) {
                store.dispatch(closeSocket())
                store.dispatch(logout())
                this.props.history.push('/login')
            }
        } else {
            store.dispatch(closeSocket())
            store.dispatch(logout())
            this.props.history.push('/login')
        }
    }

    render() {
        if (this.props.loading || this.props.user === null) {
            return <Spin/>
        } else {
            if (localStorage.getItem('token')) {
                return <Component {...this.props} />
            } else {
                return <Redirect to={'/login'}/>
            }
        }
    }
})