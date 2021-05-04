import React, {Component} from 'react';
import {Table} from "antd";
import {connect} from "react-redux";

class LeaderboardSider extends Component {


    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'W',
            dataIndex: 'wins',
            width: 15
        },
        {
            title: 'L',
            dataIndex: 'losses',
            width: 15
        },
    ];

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Table size="small" pagination={false} dataSource={this.props.leaderboard} columns={this.columns}/>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    leaderboard: state.socket.leaderboard,
    gameActionTaken: state.socket.gameActionTaken,
    user: state.user.user,
})

export default connect(mapStateToProps)(LeaderboardSider);