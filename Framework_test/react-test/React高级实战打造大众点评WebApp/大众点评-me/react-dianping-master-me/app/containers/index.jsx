import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore.js'
import {CITYNAME} from '../config/localStoreKey.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFormOtherFile from '../actions/userinfo.js'


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div>
                {/* <h1>header</h1> */}
                {
                    this.state.initDone ?
                    this.props.children :
                    <div>'加载中...'</div>
                }
            </div>
        )
    }
    componentDidMount() {
        let cityName = LocalStore.getItem(CITYNAME);
        console.log(cityName);
        if (cityName == null) {
            cityName = '北京';
        }
        console.log(cityName);
        // 将城市信息存储到redux中
        this.props.userInfoActions.update({
            cityName: cityName,
        })

        this.setState(
            {initDone : true}
        )
    }
}


function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFormOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


