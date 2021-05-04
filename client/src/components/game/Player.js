import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './styles/player.module.css'
import {Avatar, Progress, Card} from "antd";
import {getAvatarColor} from "@/utils/user";

class Player extends Component {


    scoreMapper = {
        0: 0,
        1: 50,
        2: 75,
        3: 100,
    }

    render() {
        const {player} = this.props
        return (
            <Card className={styles.card}>
                <Card.Meta
                    avatar={<Avatar style={{background: getAvatarColor(this.props.player?.name[0])}}
                                    className={styles.avatar}>{this.props.player?.name[0]}</Avatar>}
                    title={<span className={styles.name}>{this.props.displayName}</span>}
                    description={<Progress strokeWidth={15} strokeColor={"limegreen"}
                                           percent={this.scoreMapper[player.score]}
                                           showInfo={false} steps={3}/>}
                />
            </Card>
        );
    }
}

Player.propTypes = {
    player: PropTypes.object.isRequired,
    displayName: PropTypes.string.isRequired
};

export default Player;