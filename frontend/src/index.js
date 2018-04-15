import './styles/bootstrap-social.css'
import './styles/bootstrap-reboot.css'
import './styles/bootstrap-grid.css'
import './styles/main.scss';
import './styles/fontawesome.css';
import './styles/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './Store/ConfigureStore';
import { Provider } from 'react-redux'; 
import App from './containers/App';
import Homepage from './containers/Home/Homepage'

ReactDOM.render(<Provider store={store}>
                    < App/>
                </Provider>, document.getElementById('root'));


