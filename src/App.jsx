import React, { useState } from 'react';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({
    gender: '',
    age: '',
    hydration: '',
    tightness: '',
    sensitivity: '',
    tone: '',
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="survey-container">
      <h1>✨ BEAUTY CODE AI 설문지</h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="question-item">
            <label>성별</label>
            <select name="gender" onChange={handleChange}>
              <option value="">선택</option>
              <option value="female">여성</option>
              <option value="male">남성</option>
            </select>
          </div>
          <div className="question-item">
            <label>연령대</label>
            <select name="age" onChange={handleChange}>
              <option value="">선택</option>
              <option value="10s">10대</option>
              <option value="20s">20대</option>
              <option value="30s">30대</option>
              <option value="40s">40대</option>
              <option value="50s">50대 이상</option>
            </select>
          </div>
          <button type="submit">피부 진단 제출</button>
        </form>
      ) : (
        <div>
          <h2>진단 결과</h2>
          <p>당신의 피부 유형은 AI 분석 결과에 따라 안내됩니다.</p>
        </div>
      )}
    </div>
  );
}

export default App;
