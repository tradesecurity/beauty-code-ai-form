import React from "react";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>✨ BEAUTY CODE AI 설문 테스트</h1>
      <p>당신의 피부유형은 <strong>BSCT (뷰티 아쿠아 타입)</strong>입니다.</p>
      <h2>🧬 피부 특성</h2>
      <ul>
        <li>수분 보유력 우수</li>
        <li>피부 톤 맑음</li>
        <li>민감도 낮음</li>
      </ul>
      <h2>🛍️ 추천 제품</h2>
      <ul>
        <li><a href="#">라로슈포제 시카플라스트 밤 B5+</a></li>
        <li><a href="#">닥터지 레드 블레미쉬 수딩크림</a></li>
      </ul>
      <footer>
        <p style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
          참고 문헌: Baumann (2007), Rawlings & Harding (2004) 외.
        </p>
      </footer>
    </div>
  );
}

export default App;