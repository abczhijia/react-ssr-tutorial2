import React from 'react';
import { Link } from 'react-router-dom';

export default class Detail extends React.Component {
    render() {
        return <div>Detail Page <Link to="/">To Home</Link></div>;
    }
}