
import React, { useState } from 'react';
import SurveyForm from './components/SurveyForm';
import ResultPage from './components/ResultPage';

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="App">
      {!result ? (
        <SurveyForm onSubmit={setResult} />
      ) : (
        <ResultPage result={result} />
      )}
    </div>
  );
}

export default App;
