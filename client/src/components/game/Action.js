import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles/action.module.css'
import {connect} from "react-redux";
import {Card} from "antd";
import emoji from "react-easy-emoji";
import {Actions} from "@/constants/game";
import store from "@/store/store";
import {gameAction} from "@/store/slices/socketSlice";

class Action extends Component {

    render() {
        const emo = {
            [Actions.ROCK]: '✊',
            [Actions.PAPER]: '✋',
            [Actions.SCISSORS]: '✌',
        }

        const {gameActionTaken} = this.props

        return (
            <Card onClick={() => {
                if (!gameActionTaken)
                    store.dispatch(gameAction(this.props.type))
            }} hoverable={!gameActionTaken}
                  className={`${styles.wrapper} ${gameActionTaken ? styles.disabled : null}`}>
                <p className={styles.emoji}>{emoji(emo[this.props.type])}</p>
                <p className={styles.name}>{this.props.type}</p>
            </Card>
        );
    }
}

Action.propTypes = {
    type: PropTypes.oneOf(Object.values(Actions))
};


const mapStateToProps = state => ({
    gameActionTaken: state.socket.gameActionTaken,
})

export default connect(mapStateToProps)(Action);