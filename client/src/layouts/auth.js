import React, {Component} from 'react';
import styles from './styles/auth.module.css';
import emoji from "react-easy-emoji";
import {Layout} from "antd";

const {Footer} = Layout;

class Auth extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <span className={styles.title}>{emoji('Rock ✊ Paper ✋ Scissors✌')}</span>
                <div>
                    {this.props.children}
                </div>
                <Footer className={styles.footer}>{emoji('Made with ❤ by Mehdi Este')}</Footer>
            </div>
        );
    }
}


export default Auth;