import React, { useState } from 'react';

const App = () => {
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    setResult({
      skinType: 'BALANCE-TYPE',
      products: [
        {
          name: '기초 수분 라인',
          coupang: 'https://www.coupang.com/np/search?q=기초+수분+라인',
          smartstore: 'https://smartstore.naver.com/search?q=기초+수분+라인'
        },
        {
          name: '자외선 차단제',
          coupang: 'https://www.coupang.com/np/search?q=자외선+차단제',
          smartstore: 'https://smartstore.naver.com/search?q=자외선+차단제'
        },
        {
          name: '영양크림',
          coupang: 'https://www.coupang.com/np/search?q=영양크림',
          smartstore: 'https://smartstore.naver.com/search?q=영양크림'
        }
      ]
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>💛 BEAUTY CODE AI 설문지</h1>
      <button onClick={handleSubmit}>피부 진단 제출</button>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>✨ 당신의 피부 유형: {result.skinType}</h2>
          <h3>🧴 추천 제품</h3>
          <ul>
            {result.products.map((product, idx) => (
              <li key={idx}>
                {product.name} |
                <a href={product.coupang} target="_blank"> 쿠팡 </a> |
                <a href={product.smartstore} target="_blank"> 스마트스토어 </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;