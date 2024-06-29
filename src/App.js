import { useEffect } from 'react';
import './App.css';


function App() {
  
  useEffect(() => {
    tg.ready();
  }, [])


  return (
    <div className="App">
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
