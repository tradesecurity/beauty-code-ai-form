
import React, { useState } from 'react';
import questions from '../data/questions';

function SurveyForm({ onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <div key={index}>
          <label>{q.question}</label>
          <select onChange={(e) => handleChange(q.key, e.target.value)} required>
            <option value="">선택</option>
            {q.options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit">피부 진단 제출</button>
    </form>
  );
}

export default SurveyForm;
