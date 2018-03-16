import React from 'react';
import BasePage from '../components/base_page';
import { Link } from 'react-router-dom';
import { getProjectList } from '../../share/api';

export default class Home extends BasePage {
    prefetch() {
        return getProjectList();
    }

    render() {
        const { prefetch } = this.state;

        // prefetch数据加载出来之前，可以展示loading
        if (this.prefetch && !prefetch) {
            return <div>loading ...</div>;
        }

        const { projects } = prefetch;

        return <div>Home Page
            {
                projects.map(item => {
                    return <div key={item.id}>
                        <h1><Link to={`/detail?id=${item.id}`}>{item.name}</Link></h1>
                        <p>{item.description}</p>
                    </div>;
                })
            }
        </div>;
    }
}