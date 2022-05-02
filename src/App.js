import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import {store} from './store'


function App() {
  return (
    <div className="">
      <Provider store={store}>

        <AppRouter/>

      </Provider>
      
    </div>
  );
}

export default App;
