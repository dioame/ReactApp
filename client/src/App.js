import './App.css';
import AppNavigation from './components/AppNavigation';

import RecordListing from './components/RecordListing';

export default function App() {

  const appName = "Record System";
  
  return (
    <div className="App">
      <header className="App-header">
         <AppNavigation title={appName} />
        
      </header>
      <div className="myContent">
        <RecordListing/>
      </div>
      
    </div>
  );
}