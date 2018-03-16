import React from 'react';
import { Link } from 'react-router-dom';
import { getProjectList } from '../../share/api';

const __IS_BROWSER__ = typeof window === 'object' && window === window.window;

export default class Home extends React.Component {
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

    prefetch() {
        return getProjectList();
    }

    render() {
        const { prefetch } = this.state;
        const { projects } = prefetch;

        return <div>Home Page
            {
                projects.map(item => {
                    return <div key={item.id}>
                        <h1><a href={`/detail?id=${item.id}`}>{item.name}</a></h1>
                        <p>{item.description}</p>
                    </div>;
                })
            }
        </div>;
    }
}