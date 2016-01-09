import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

render((
    <Router history={browserHistory}>
        <Route path="/" component={}>
            <Route path="items" component={}>
                <Route path="items/:id" component={}/>
            </Route>
            <Route path="items/by/:type/:query" component={}>
                <Route path="items/by/:type/:query/:id"/>
            </Route>
            <Route path="item/:id" component={}/>
            <Route path="tabs" component={}/>
            <Route path="*" component={}/>
        </Route>
    </Router>
), document.body);
