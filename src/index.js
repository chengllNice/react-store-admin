import React from 'react';
import ReactDOM from 'react-dom';
// import App from './views/App';
import '@/assets/css/common.scss'
import * as serviceWorker from './serviceWorker';
import Route from '@/routers/index'
import Store from '@/redux/index'
import { Provider } from 'react-redux'
import { AppContainer} from 'react-hot-loader'
import '@/mock'



const render = (Component) => {
  ReactDOM.render(
    <Provider store={Store}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </Provider>,
    document.getElementById('root'));
};

render(Route);

if (module.hot) {
  module.hot.accept('./routers/', () => {
    render(Route);
  })
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
