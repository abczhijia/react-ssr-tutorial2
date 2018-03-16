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