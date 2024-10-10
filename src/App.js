import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import ServiceStatusList from "./components/ServiceStatusList";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <ServiceStatusList/>
      </div>
    </Provider>
  );
}

export default App;
