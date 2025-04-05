import React, { useState } from "react";
import html2canvas from "html2canvas";

function App() {
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const skinType = "BALANCE-TYPE";
    const recommendations = [
      {
        name: "기초 수분 라인",
        coupang: "https://www.coupang.com/np/search?q=기초+수분+라인",
        smartstore: "https://smartstore.naver.com/search?q=기초+수분+라인"
      },
      {
        name: "자외선 차단제",
        coupang: "https://www.coupang.com/np/search?q=자외선+차단제",
        smartstore: "https://smartstore.naver.com/search?q=자외선+차단제"
      },
      {
        name: "영양크림",
        coupang: "https://www.coupang.com/np/search?q=영양크림",
        smartstore: "https://smartstore.naver.com/search?q=영양크림"
      }
    ];
    setResult({ skinType, recommendations });
  };

  const handleDownload = () => {
    html2canvas(document.querySelector(".result-box")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "skin-diagnosis-result.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🧴 BEAUTY CODE AI 설문 테스트</h1>
      <button onClick={handleSubmit}>피부 진단 제출</button>

      {result && (
        <div className="result-box" style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd" }}>
          <h2>✨ 당신의 피부 유형</h2>
          <p><strong>{result.skinType}</strong></p>
          <h3>🔍 추천 제품</h3>
          <ul>
            {result.recommendations.map((item, idx) => (
              <li key={idx}>
                {item.name} -
                <a href={item.coupang} target="_blank" rel="noreferrer"> 쿠팡</a> |
                <a href={item.smartstore} target="_blank" rel="noreferrer"> 스마트스토어</a>
              </li>
            ))}
          </ul>
          <button onClick={handleDownload} style={{ marginTop: "10px" }}>
            🖨️ 결과 PDF 이미지 저장
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
