import fetch from 'isomorphic-fetch';

export function get(path) {
    return fetch(`http://localhost:3000/api${path}`).then(res => res.json());
}

export function getProjectList() {
    return get('/projects.json');
}

export function getProjectDetail(id) {
    return get(`/projects/${id}.json`);
}