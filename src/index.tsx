import './styles/styles.scss';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import App from '@/Components/App';

const root = document.getElementById('root');

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);

container.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);