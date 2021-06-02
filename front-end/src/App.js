import { Provider } from 'react-redux';
import applicationStore from './dataStore/applicationStore'
import { MainPage } from './MainPage';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Provider store={applicationStore}>
        <MainPage />
      </Provider>
    </div>
  );
}

export default App;
