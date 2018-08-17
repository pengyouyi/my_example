import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './item/index'

import './style.less'

class OrderListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const data = this.props.data;
        const submitComment = this.props.submitComment;
        return (
            <div>
                {
                    data.map((item,index) => {
                      return <Item key={index} data={item} submitComment={submitComment}/>
                    })
                }
            </div>
        )
    }
}

module.exports = OrderListComponent