
import React from 'react';

function ResultPage({ result }) {
  return (
    <div>
      <h2>✨ BEAUTY CODE AI 설문 테스트</h2>
      <p>당신의 답변 결과:</p>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default ResultPage;
