import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from './styles/game-result.module.css'
import {Result, Button} from 'antd';
import {SmileOutlined, FrownOutlined} from '@ant-design/icons';
import {matchmaking as matchMakingAction} from "@/store/slices/socketSlice";
import store from "@/store/store";

class GameResult extends Component {

    render() {
        const {user, game, matchmaking} = this.props
        const isWinner = user.id === game.winner

        return (
            <Result
                status={isWinner ? "info" : "error"}
                icon={isWinner ? <SmileOutlined/> : <FrownOutlined/>}
                title={
                    <p className={styles.title}>{isWinner ? "Congratulations, You Won, Keep going!" : "You lost the game but you can do better next time."}</p>
                }
                extra={<Button loading={matchmaking} onClick={() => store.dispatch(matchMakingAction())} size={"large"}
                               type="primary">{this.props.matchmaking ? "Finding a player" : "Another game"}</Button>}
            />
        );
    }
}


const mapStateToProps = state => ({
    game: state.socket.game,
    matchmaking: state.socket.matchmaking,
    user: state.user.user,
})

export default connect(mapStateToProps)(GameResult);