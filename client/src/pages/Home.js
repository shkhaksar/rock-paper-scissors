import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Layout, Tabs} from "antd";
import store from '@/store/store'
import styles from "@/App.module.css";
import PlayerListSider from "@/components/siders/PlayerListSider";
import LeaderboardSider from "@/components/siders/LeaderboardSider";
import {setupSocket} from "@/store/slices/socketSlice";
import DefaultLayout from "@/layouts/default";
import {withRouter} from "react-router-dom";
import Ready from "@/components/home/Ready";
import Game from "@/components/home/Game";

const {TabPane} = Tabs;
const {Sider, Content} = Layout;

class Home extends Component {

    componentDidMount() {
        store.dispatch(setupSocket())
    }

    render() {
        return (
            <DefaultLayout style={{height: '100%'}}>
                <Layout>
                    <Content className={styles.content}>
                        {this.props.game ? <Game/> : <Ready/>}
                    </Content>
                    <Sider className={styles.sider} width={350} theme="light">
                        <Tabs defaultActiveKey="players">
                            <TabPane tab="Online Players" key="players">
                                <PlayerListSider/>
                            </TabPane>
                            <TabPane tab="Leaderboard" key="leaderboard">
                                <LeaderboardSider/>
                            </TabPane>
                        </Tabs>
                    </Sider>
                </Layout>
            </DefaultLayout>
        );
    }
}

const mapStateToProps = state => ({
    connection: state.socket.connection,
    game: state.socket.game,
})

export default connect(mapStateToProps)(withRouter(Home));