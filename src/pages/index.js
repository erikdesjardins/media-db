import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

render((
    <Router history={browserHistory}>
        <Route path="/" component={null}>
			<IndexRoute component={null}/>
            <Route path="items" component={null}>
                <Route path="items/:id" component={null}/>
            </Route>
            <Route path="items/by/:type/:query" component={null}>
                <Route path="items/by/:type/:query/:id" component={null}/>
            </Route>
            <Route path="item/:id" component={null}/>
			<Route path="random" component={null}/>
            <Route path="tabs" component={null}/>
            <Route path="storage" component={null}/>
            <Route path="*" component={null}/>
        </Route>
    </Router>
), document.body);
