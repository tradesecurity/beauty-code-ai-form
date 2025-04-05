// App.jsx
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    water: '',
    dryness: '',
    sensitivity: '',
    tzone: '',
    tone: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 임시 진단 로직 (피부 코드 유형 추정)
    const { dryness, sensitivity } = formData;
    let skinType = 'BALANCE-TYPE';

    if (dryness === '건조함' && sensitivity === '예민함') skinType = 'SENSITIVE-DRY';
    else if (dryness === '당김 없음' && sensitivity === '둔감함') skinType = 'OILY';
    else if (dryness === '건조함') skinType = 'DRY';
    else if (sensitivity === '예민함') skinType = 'SENSITIVE';

    // 추천 제품 링크 구성
    const productLinks = [
      {
        name: '기초 수분 라인',
        link: 'https://www.coupang.com/np/search?q=%EA%B8%B0%EC%B4%88%EC%88%98%EB%B6%84%EB%9D%BC%EC%9D%B8',
      },
      {
        name: '자외선 차단제',
        link: 'https://smartstore.naver.com/search?q=%EC%9E%90%EC%99%B8%EC%84%A0%20%EC%B0%A8%EB%8B%A8%EC%A0%9C',
      },
      {
        name: '영양크림',
        link: 'https://www.coupang.com/np/search?q=%EC%98%81%EC%96%91%ED%81%AC%EB%A6%BC',
      },
    ];

    setResult({ skinType, productLinks });
  };

  const captureScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'skin_result.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="survey-container">
      <h1>✨ BEAUTY CODE AI 설문지</h1>
      <form onSubmit={handleSubmit}>
        <div className="question-item">
          <label>성별</label>
          <select name="gender" onChange={handleChange} required>
            <option value="">선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>
        <div className="question-item">
          <label>연령대</label>
          <select name="age" onChange={handleChange} required>
            <option value="">선택</option>
            <option value="10대">10대</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대 이상">40대 이상</option>
          </select>
        </div>
        <div className="question-item">
          <label>하루 수분 섭취량</label>
          <select name="water" onChange={handleChange} required>
            <option value="">선택</option>
            <option value="500ml 이하">500ml 이하</option>
            <option value="500~1000ml">500~1000ml</option>
            <option value="1000ml 이상">1000ml 이상</option>
          </select>
        </div>
        <div className="question-item">
          <label>세안 후 피부 당김</label>
          <select name="dryness" onChange={handleChange} required>
            <option value="">선택</option>
            <option value="건조함">건조함</option>
            <option value="당김 없음">당김 없음</option>
          </select>
        </div>
        <div className="question-item">
          <label>피부 민감도</label>
          <select name="sensitivity" onChange={handleChange} required>
            <option value="">선택</option>
            <option value="예민함">예민함</option>
            <option value="둔감함">둔감함</option>
          </select>
        </div>
        <div className="question-item">
          <label>T존/U존 특성</label>
          <select name="tzone" onChange={handleChange} required>
            <option value="">선택</option>
            <option value="기름 많음">기름 많음</option>
            <option value="보통">보통</option>
            <option value="건조함">건조함</option>
          </select>
        </div>
        <div className="question-item">
          <label>피부 혈색/톤</label>
          <select name="tone" onChange={handleChange} required>
            <option value="">선택</option>
            <option value="맑고 밝음">맑고 밝음</option>
            <option value="붉은기 있음">붉은기 있음</option>
            <option value="노란기 있음">노란기 있음</option>
          </select>
        </div>
        <button type="submit">피부 진단 제출</button>
      </form>

      {result && (
        <div className="result-box">
          <h2>🌟 당신의 피부 유형</h2>
          <p>🌟 {result.skinType}</p>
          <h3>📊 추천 제품</h3>
          <ul>
            {result.productLinks.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={captureScreenshot}>화면 캡처하기</button>
        </div>
      )}
    </div>
  );
}

export default App;
