import React, {Component} from 'react';
import {List, Avatar} from "antd";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getAvatarColor} from "@/utils/user";

class PlayerListSider extends Component {

    render() {
        return (
            <div>
                <List size="small" itemLayout="horizontal" dataSource={this.props.onlineUsers}
                      renderItem={user => (
                          <List.Item>
                              <List.Item.Meta
                                  avatar={
                                      <Avatar style={{
                                          width: 50, height: 50, padding: 5,
                                          background: getAvatarColor(user.name[0])
                                      }} size="large">{user.name[0]}</Avatar>}
                                  title={<b>{user.name}</b>}
                                  description={user.state}
                              />
                          </List.Item>
                      )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    onlineUsers: state.socket.onlineUsers,
})

export default connect(mapStateToProps)(withRouter(PlayerListSider));
