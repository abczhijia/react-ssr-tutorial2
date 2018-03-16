import React from 'react';
import { getProjectDetail } from '../../share/api';

const __IS_BROWSER__ = typeof window === 'object' && window === window.window;

export default class Detail extends React.Component {
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

    prefetch(query) {
        return getProjectDetail(query.id);
    }

    render() {
        const { prefetch } = this.state;
        const { project } = prefetch;
        return <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <b>{project.updated_on}</b>
        </div>;
    }
}