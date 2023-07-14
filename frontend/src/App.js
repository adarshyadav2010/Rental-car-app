import logo from './logo.svg';
import './App.css';
import AppRouter from './components/router/AppRouter';
import StateContexts from './components/context/StateContext';

function App() {
  return (
    <div>
      <StateContexts>
        <AppRouter/>
      </StateContexts>
    </div>
  );
}

export default App;
