import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from './styles/playing.module.css'
import {Actions} from "@/constants/game";
import store from "@/store/store";
import {gameAction} from "@/store/slices/socketSlice";
import {random} from "@/utils/game";
import {Row, Col, Progress} from "antd";
import Action from "@/components/game/Action";

class Preparing extends Component {

    state = {
        actionTimer: null,
        actionCountdown: 10,
    }

    componentDidMount() {
        this.setActionTimer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {gameActionTaken} = this.props
        const {gameActionTaken: prevGameActionTaken} = prevProps

        if (!prevGameActionTaken && gameActionTaken) { //Player has taken an action
            this.setState({actionTimer: null, actionCountdown: 10})
            clearInterval(this.state.actionTimer);
        }
    }

    setActionTimer() {
        const timer = setInterval(() => {
            let countdown = this.state.actionCountdown
            if (this.state.actionCountdown === 1) {
                this.setState({actionTimer: null, actionCountdown: 10})
                store.dispatch(gameAction(random(Actions)))
                clearInterval(timer);
            } else {
                countdown--;
                this.setState({actionCountdown: countdown})
            }
        }, 1000);
        this.setState({actionTimer: timer})
    }

    render() {
        let {user, game} = this.props
        let opponent = game[user.id]?.opponent
        opponent = {...opponent, ...game[opponent.id]}
        return (
            <div className={styles.wrapper}>
                <span>{this.props.gameActionTaken ? `Waiting for ${opponent.name}` : 'Take an action before times run out'}</span>
                <Progress percent={100 - (this.state.actionCountdown * 10)} showInfo={!this.props.gameActionTaken}
                          format={() => this.state.actionCountdown}/>
                <Row gutter={16} justify={"center"}>
                    <Col span={8}>
                        <Action type={Actions.ROCK}/>
                    </Col>
                    <Col span={8}>
                        <Action type={Actions.PAPER}/>
                    </Col>
                    <Col span={8}>
                        <Action type={Actions.SCISSORS}/>
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    game: state.socket.game,
    gameActionTaken: state.socket.gameActionTaken,
    user: state.user.user,
})

export default connect(mapStateToProps)(Preparing);