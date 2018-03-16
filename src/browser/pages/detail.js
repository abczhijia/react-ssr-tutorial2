import React from 'react';
import BasePage from '../components/base_page';
import { getProjectDetail } from '../../share/api';

export default class Detail extends BasePage {

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