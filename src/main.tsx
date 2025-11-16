import './styles/index.scss'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import {Provider} from "react-redux";
import {setupStore} from "./app/store/store.ts";

const store = setupStore();

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
)
