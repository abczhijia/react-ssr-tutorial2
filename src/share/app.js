import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

export default class App extends React.Component {
    render() {
        return <div>
            <Switch>
                {
                    routes.map(({ path, exact, component: Comp }) => {
                        return <Route key={path} path={path} exact={exact} render={(props) => <Comp {...props}/>}/>;
                    })
                }
            </Switch>
        </div>;
    }
}