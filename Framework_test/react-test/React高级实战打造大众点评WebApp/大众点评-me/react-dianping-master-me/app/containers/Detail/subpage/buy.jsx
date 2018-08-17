import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import * as storeActionsFromFile from '../../../actions/store'

import BuyAndStore from '../../../components/BuyAndStore/index'

import './style.less'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        }
    }
    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
        )
    }
    componentDidMount() {
        this.checkStoreState();
    }
    // 验证登录
    loginCheck() {
        const id = this.props.id;
        const userinfo = this.props.userinfo;
        if (!userinfo.username) {
            // 跳转到登录页
            hashHistory.push('/Login/' + encodeURIComponent('/detail/') + id);
            return false;
        }
        return true

    }
    // 检验当前商品是否被收藏
    checkStoreState() {
        const id = this.props.id;
        const store = this.props.store;
    
        store.some(item => {
            if (item.id === id) {
                this.setState({
                    isStore: true
                })
                return true
            }
        })
    }
    // 收藏事件
    storeHandle() {
        // 验证登录
        const loginFlag = this.loginCheck();
        if( !loginFlag) {
            return
        }

        const id = this.props.id;
        const storeActions = this.props.storeActions;
        if(this.state.isStore) {
            storeActions.rm({id: id})
        } else {
            storeActions.add({id: id})
        }
        this.setState({
            isStore: !this.state.isStore
        })
    }
    // 购买事件
    buyHandle() {
      // 验证登录
      const loginFlag = this.loginCheck();
      if( !loginFlag) {
          return
      }
      // 购买流程

      // 跳转到用户主页
      hashHistory.push('/User')
    }
}


function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)