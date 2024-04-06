import './App.css';
import AutoCompleteInput from './components/AutoCompleteInput';
import { STATES } from './data/AutoCompleteData';

function App() {
  return (
    <div className="App">
      Hello
      <br/ >
      <AutoCompleteInput label={'Search for states'} data={STATES}/>
    </div>
  );
}

export default App;
