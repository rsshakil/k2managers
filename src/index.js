import { Settings } from 'luxon';
import React from 'react';
import 'react-day-picker/dist/style.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/App';
import { store } from './store/store';
import './styles/style.css';
Settings.defaultZone = 'Japan';
const root = ReactDOM.createRoot(document.getElementById('root'));

// if (process.env.NODE_ENV !== 'production') {
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
// } else {
//     root.render(
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
// }
