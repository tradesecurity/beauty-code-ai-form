import React, { useState } from "react";
import html2canvas from "html2canvas";
import "./index.css";

const App = () => {
  const [answers, setAnswers] = useState({
    gender: "",
    age: "",
    hydration: "",
    dryness: "",
    sensitivity: "",
    sebum: "",
    tzone: "",
    redness: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const captureScreen = () => {
    html2canvas(document.body).then((canvas) => {
      const link = document.createElement("a");
      link.download = "beautycode-report.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="survey-container">
      <h1>✨ BEAUTY CODE AI 설문지</h1>

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
          <option value="20s">20대</option>
          <option value="30s">30대</option>
          <option value="40s">40대 이상</option>
        </select>
      </div>

      <div className="question-item">
        <label>하루 수분 섭취량</label>
        <select name="hydration" onChange={handleChange}>
          <option value="">선택</option>
          <option value="low">500ml 이하</option>
          <option value="medium">500~1000ml</option>
          <option value="high">1L 이상</option>
        </select>
      </div>

      <div className="question-item">
        <label>세안 후 피부 당김</label>
        <select name="dryness" onChange={handleChange}>
          <option value="">선택</option>
          <option value="tight">심하게 당김</option>
          <option value="slight">약간 당김</option>
          <option value="none">당김 없음</option>
        </select>
      </div>

      <div className="question-item">
        <label>피부 민감도</label>
        <select name="sensitivity" onChange={handleChange}>
          <option value="">선택</option>
          <option value="sensitive">자주 민감</option>
          <option value="normal">보통</option>
          <option value="strong">둔감</option>
        </select>
      </div>

      <div className="question-item">
        <label>T존/U존 특성</label>
        <select name="tzone" onChange={handleChange}>
          <option value="">선택</option>
          <option value="dry">건조</option>
          <option value="oily">지성</option>
          <option value="balance">복합</option>
        </select>
      </div>

      <div className="question-item">
        <label>피부 혈색/톤</label>
        <select name="redness" onChange={handleChange}>
          <option value="">선택</option>
          <option value="yellow">노란기</option>
          <option value="red">붉은기</option>
          <option value="neutral">중간</option>
        </select>
      </div>

      <button onClick={captureScreen}>화면 캡처하기</button>
    </div>
  );
};

export default App;
