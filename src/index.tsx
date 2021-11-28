import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '@src/app';
import '@style/reset.css';
import '@style/global.css';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
