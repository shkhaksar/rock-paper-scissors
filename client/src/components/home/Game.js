import React, {Component} from 'react';
import styles from './styles/game.module.css';
import {connect} from "react-redux";
import Player from "@/components/game/Player";
import {Row, Col, Divider} from "antd";
import {States} from "@/constants/game";
import GameResult from "@/components/game/GameResult";
import Preparing from "@/components/game/Preparing";
import Playing from "@/components/game/Playing";

class Game extends Component {

    renderGame(game) {
        switch (game.state) {
            case States.PREPARING:
                return <Preparing/>
            case States.PLAYING:
                return <Playing/>
            case States.GAME_RESULT:
                return <GameResult/>
            default:
                return <div>Error!</div>
        }
    }

    render() {
        let {user, game} = this.props
        let opponent = game[user.id]?.opponent
        user = {...user, ...game[user.id]}
        opponent = {...opponent, ...game[opponent.id]}

        return (
            <div className={styles.wrapper}>
                <Row gutter={16}>
                    <Col offset={3} span={7}>
                        <Player player={user} displayName={"You"}/>
                    </Col>
                    <Col className={styles.vs} span={4}>
                        <span>VS.</span>
                    </Col>
                    <Col span={7}>
                        <Player player={opponent} displayName={opponent?.name}/>
                    </Col>
                </Row>
                <Divider/>
                <div className={styles.context}>
                    {this.renderGame(game)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    game: state.socket.game,
    gameActionTaken: state.socket.gameActionTaken,
    user: state.user.user,
})

export default connect(mapStateToProps)(Game);