import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '@src/app';
import '@src/style/reset.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
