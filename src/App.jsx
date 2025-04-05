import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const App = () => {
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const skinType = 'BALANCE-TYPE';
    const products = [
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
    ];
    setResult({ skinType, products });
  };

  const captureResult = () => {
    html2canvas(document.getElementById("result")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "skin_diagnosis_result.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1>💡 BEAUTY CODE AI 설문 테스트</h1>
      <button onClick={handleSubmit}>피부 진단 제출</button>
      {result && (
        <div id="result" style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc" }}>
          <h2>✨ 당신의 피부 유형: {result.skinType || '진단 중...'}</h2>
          <ul>
            {result.products.map((item, idx) => (
              <li key={idx}>
                {item.name} | 
                <a href={item.coupang} target="_blank" rel="noopener noreferrer"> 쿠팡 </a> | 
                <a href={item.smartstore} target="_blank" rel="noopener noreferrer"> 스마트스토어 </a>
              </li>
            ))}
          </ul>
          <button onClick={captureResult}>📸 결과 저장</button>
        </div>
      )}
    </div>
  );
};

export default App;