import React, {Component} from 'react';
import {connect} from 'react-redux'
import styles from "./styles/default.module.css";
import emoji from "react-easy-emoji";
import {Avatar, Badge, Dropdown, Layout, Menu} from "antd";
import {ConnectionStatus} from "@/constants/socket";
import store from "@/store/store";
import {logout} from "@/store/slices/userSlice";
import {withRouter} from "react-router-dom";
import {closeSocket} from "@/store/slices/socketSlice";
import {getAvatarColor} from "@/utils/user";

const {Header, Footer} = Layout;

class Default extends Component {

    constructor(props) {
        super(props);
        this.status = {
            [ConnectionStatus.CONNECTED]: styles.connected,
            [ConnectionStatus.DISCONNECTED]: styles.disconnected,
            [ConnectionStatus.CONNECTING]: styles.connecting
        }

        this.accountMenu = <Menu>
            <Menu.Item key="account">
                Account Settings
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="logout" onClick={() => {
                store.dispatch(closeSocket())
                store.dispatch(logout())
                this.props.history.push('/login')
            }}>
                Logout
            </Menu.Item>
        </Menu>;
    }


    render() {
        return (
            <Layout style={{height: '100%'}}>
                <Header className={styles.header}>
                    <span className={styles.title}>{emoji('Rock ✊ Paper ✋ Scissors✌')}</span>
                    <Dropdown overlay={this.accountMenu}>
                        <div className={styles.profile}>
                            <span className={styles.name}>{this.props.user?.name}</span>
                            <span>
                                <Badge count={<span
                                    className={`${styles.status} ${this.status[this.props.connection]}`}/>}>
                                    <Avatar style={{
                                        background: getAvatarColor(this.props.user?.name[0])
                                    }} className={styles.avatar} size="large">{this.props.user?.name[0]}</Avatar>
                                </Badge>
                            </span>
                        </div>
                    </Dropdown>
                </Header>
                {this.props.children}
                <Footer className={styles.footer}>{emoji('Made with ❤ by Mehdi Este')}</Footer>
            </Layout>
        );
    }
}

Default.propTypes = {};

const mapStateToProps = state => ({
    connection: state.socket.connection,
    user: state.user.user,
})

export default connect(mapStateToProps)(withRouter(Default));