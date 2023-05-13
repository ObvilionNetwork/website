import React, { Component, Suspense  } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';
import '../assets/scss/scrollbar.css'

import Loader from './layout/Loader'
import Aux from "./components/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../routes";

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {
    render() {
        const menu = routes.map((route, index) => {
          return (route.component) ? (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
          ) : (null);
        });

        // <Route path="/" component={AdminLayout} />

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Switch>
                            {menu}

                            <Route path="/admin" component={AdminLayout} />

                            <Route component = {routes[0].component} status={404} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default App;
