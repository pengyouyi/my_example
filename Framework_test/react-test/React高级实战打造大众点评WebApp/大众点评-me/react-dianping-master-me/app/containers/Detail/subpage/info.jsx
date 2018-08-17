import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DetailInfo from '../../../components/DetailInfo/index.jsx'

import { getInfoData } from '../../../fetch/detail/detai.js'

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            info: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.info ?
                    <DetailInfo data={this.state.info}/> :
                    ''
                }
            </div>
        )
    }
    componentDidMount() {
        var id = this.props.id;
        var result = getInfoData(id);
        result.then(res => {
            return res.json()
        }).then(json => {
            this.setState({
                info: json
            })
        })
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default Info
module.exports = Info