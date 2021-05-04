import React, {Component} from 'react';
import {connect} from 'react-redux'
import styles from './styles/ready.module.css';
import {Button} from "antd";
import {matchmaking} from "@/store/slices/socketSlice";
import store from "@/store/store";
import {ConnectionStatus} from "@/constants/socket";

class Ready extends Component {

    render() {
        return (
            <div className={styles.wrapper}>
                <h1 className={styles.welcome}>Welcome, Please press the "start" button to start a game</h1>
                <Button className={styles.start} loading={this.props.matchmaking}
                        disabled={this.props.connection !== ConnectionStatus.CONNECTED}
                        onClick={() => store.dispatch(matchmaking())} size="large"
                        type="primary">{this.props.matchmaking ? "Finding a player" : "Start"}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    matchmaking: state.socket.matchmaking,
    connection: state.socket.connection,
})

export default connect(mapStateToProps)(Ready);