import React from 'react';
import qs from 'qs';

const __IS_BROWSER__ = typeof window === 'object' && window === window.window;

export default class BasePage extends React.Component {
    constructor(props) {
        super(props);

        let prefetch;

        //如果是浏览器环境，则将node传过来的数据window.__INITIAL_DATA__保存到state中，并删除元数据（避免路由切换重复赋值）
        //否则，则是node环境，可以直接从staticContext中取出数据
        if (__IS_BROWSER__) {
            prefetch = window.__INITIAL_DATA__;
            delete window.__INITIAL_DATA__;
        } else {
            prefetch = this.props.staticContext.prefetch;
        }

        this.state = { prefetch };
    }

    componentDidMount() {
        //react-router v4 不再在location中提供query字段了，需要自己将search转成query对象
        const query = qs.parse(this.props.location.search.replace(/^\?/, ''));

        //如果定义了prefetch函数，并且this.state.prefetch中没有数据，则在浏览器端执行prefetch函数，并初始化数据
        if (this.prefetch && !this.state.prefetch) {
            this.prefetch(query).then(prefetch => {
                this.setState({ prefetch });
            });
        }
    }
}