import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from './styles/preparing.module.css'
import {Actions, States} from "@/constants/game";
import store from "@/store/store";
import {gameReady} from "@/store/slices/socketSlice";
import emoji from "react-easy-emoji";
import {Row, Col, Divider} from "antd";

class Preparing extends Component {

    state = {
        readyTimer: null,
        readyCountdown: 5
    }


    componentDidMount() {
        this.setReadyTimer()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {game} = this.props
        const {game: prevGame} = prevProps

        if (prevGame?.state !== States.PREPARING && game?.state === States.PREPARING)
            this.setReadyTimer()
    }

    setReadyTimer() {
        const timer = setInterval(() => {
            let countdown = this.state.readyCountdown
            if (this.state.readyCountdown === 1) {
                this.setState({readyTimer: null, readyCountdown: 0})
                store.dispatch(gameReady())
                clearInterval(timer);
            } else {
                countdown--;
                this.setState({readyCountdown: countdown})
            }
        }, 1000);
        this.setState({readyTimer: timer})
    }

    emo = {
        [Actions.ROCK]: '✊',
        [Actions.PAPER]: '✋',
        [Actions.SCISSORS]: '✌',
    }

    renderAction(user, isYou) {
        if (user.score === 0 && !user.action) {
            return <div className={styles.profile}>
                <div className={styles.name}>{isYou ? 'You' : user.name}</div>
                <div>
                    <span className={styles.wins}>Wins: {user.wins}</span>
                    <Divider type={"vertical"}/>
                    <span className={styles.losses}>Losses: {user.losses}</span>
                </div>

            </div>
        } else {
            return <div className={styles.profile}>
                <div className={styles.name}>{isYou ? 'You' : user.name}</div>
                <Divider/>
                <div className={styles.emoji}>{emoji(this.emo[user.action])}</div>
            </div>
        }
    }

    render() {
        let {user, game} = this.props
        let opponent = game[user.id]?.opponent
        user = {...user, ...game[user.id]}
        opponent = {...opponent, ...game[opponent.id]}

        let winnerName = 'No one';
        let winnerColor = 'none';
        if (game.winner !== -1) {
            winnerName = game.winner === user.id ? 'You' : opponent.name
            winnerColor = game.winner === user.id ? 'green' : 'red'
        }

        return (
            <Row className={styles.wrapper} gutter={8} justify={"center"}>
                <Col span={8}>
                    {this.renderAction(user, true)}
                </Col>
                <Col span={8}>
                    {user.score === 0 && !user.action
                        ? <div>
                            {`The game will start in ${this.state.readyCountdown}`}
                        </div>
                        : <div>
                            <p style={{color: winnerColor}}
                               className={styles.winnerName}>{`${winnerName} won the round!`}</p>
                            <Divider/>
                            <p>{`The next round will start in ${this.state.readyCountdown}`}</p>
                        </div>}
                </Col>
                <Col span={8}>
                    {this.renderAction(opponent, false)}
                </Col>
            </Row>

        );
    }
}


const mapStateToProps = state => ({
    game: state.socket.game,
    user: state.user.user,
})

export default connect(mapStateToProps)(Preparing);