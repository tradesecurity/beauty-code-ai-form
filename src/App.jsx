
import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    gender: "",
    age: "",
    waterIntake: "",
    tightness: "",
    trouble: "",

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const handleDownloadPDF = () => {
  const reportEl = document.getElementById("result-report");
  html2canvas(reportEl).then(canvas => {
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL("image/png");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.setFontSize(10);
    pdf.text("📎 참고 논문 목록: 1. Baumann, L. (2007). Cosmetic Dermatology: Principles and Practice. McGraw-Hill Education. 2. Berardesca, E., Maibach, H. (2003). Sensitive skin: An overview. Int J Cosmet Sci, 25(2), 65–76. 3. Rawlings, A. V., & Matts, P. J. (2005). Stratum corneum moisturization at the molecular level. J Invest Dermatol, 124(6), 1099–1110. 4. Korting, H. C., et al. (1992). Differences in the skin pH of men and women. Dermatology. 5. Luebberding, S., et al. (2013). Age-related changes in skin barrier function. Int J Cosmet Sci.", 10, height + 10, { maxWidth: 190 });
    pdf.save("BEAUTY_CODE_AI_피부진단.pdf");
  });
};
    sensitivity: "",
    sebum: "",
    tzone: "",
    bloodflow: "",
    result: null
  });

  const recommendations = {
    "🌊 AQUA-TYPE": [
      ["고보습 수분크림", "https://shop.example.com/aqua-cream"],
      ["수분 마스크팩", "https://shop.example.com/aqua-mask"],
      ["약산성 젤 클렌저", "https://shop.example.com/gel-cleanser"]
    ],
    "🔥 SEBUM-TYPE": [
      ["수분+진정 토너", "https://shop.example.com/sebum-toner"],
      ["유분 조절 크림", "https://shop.example.com/oil-control"],
      ["클레이 마스크", "https://shop.example.com/clay-mask"]
    ],
    "🌬 SENSITIVE-TYPE": [
      ["저자극 진정 앰플", "https://shop.example.com/ampoule"],
      ["무향 약산성 토너", "https://shop.example.com/mild-toner"],
      ["민감성 전용 선크림", "https://shop.example.com/sensitive-sun"]
    ],
    "🌗 COMBI-TYPE": [
      ["멀티밸런스 크림", "https://shop.example.com/combi-cream"],
      ["피지 조절 토너", "https://shop.example.com/sebum-toner"],
      ["보습 마스크팩", "https://shop.example.com/moist-mask"]
    ],
    "🧊 COOL-DULL-TYPE": [
      ["비타민C 세럼", "https://shop.example.com/vitamin-c"],
      ["각질 제거 패드", "https://shop.example.com/exfoliate"],
      ["광채 톤업 크림", "https://shop.example.com/tone-up"]
    ],
    "🌟 BALANCE-TYPE": [
      ["기초 수분 라인", "https://shop.example.com/balance-line"],
      ["자외선 차단제", "https://shop.example.com/sunblock"],
      ["영양크림", "https://shop.example.com/nutri-cream"]
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = diagnoseSkin(form);
    setForm({ ...form, result });
  };

  const diagnoseSkin = (data) => {
    const { waterIntake, tightness, sebum, sensitivity, tzone, bloodflow, trouble } = data;
    if (sensitivity === "예" || bloodflow === "없음") return "🌬 SENSITIVE-TYPE";
    if (sebum === "많음" && trouble === "자주") return "🔥 SEBUM-TYPE";
    if (tzone === "T존 지성 / U존 건성") return "🌗 COMBI-TYPE";
    if (waterIntake === "많이 마신다" && tightness === "당김이 있다") return "🌊 AQUA-TYPE";
    if (bloodflow === "칙칙하고 어둡다") return "🧊 COOL-DULL-TYPE";
    return "🌟 BALANCE-TYPE";
  };

  if (form.result) {
    return (
      <div id="result-report" className="p-4 max-w-xl mx-auto text-sm">
        <h1 className="text-xl font-bold mb-4">✨ 당신의 피부 유형</h1>
        <p className="text-lg mb-4">{form.result}</p>

        <h3 className="font-semibold mb-2">🛍 추천 제품</h3>
        <ul className="list-disc list-inside space-y-1">
          {recommendations[form.result].map(([name, link], idx) => (
            <li key={idx}>
              <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 underline">{name}</a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setForm({ ...form, result: null })}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        >
        <button onClick={handleDownloadPDF} className="ml-4 bg-green-500 text-white px-4 py-2 rounded">PDF 저장</button>
          다시 진단하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto text-sm">
      <h1 className="text-xl font-bold">🔬 BEAUTY CODE AI 설문지</h1>

      <label>성별
        <select name="gender" onChange={handleChange} required className="block w-full">
          <option value="">선택</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
          <option value="기타">기타</option>
        </select>
      </label>

      <label>연령대
        <select name="age" onChange={handleChange} required className="block w-full">
          <option value="">선택</option>
          <option>10대</option>
          <option>20대</option>
          <option>30대</option>
          <option>40대</option>
          <option>50대 이상</option>
        </select>
      </label>

      <label>하루 수분 섭취량
        <select name="waterIntake" onChange={handleChange} className="block w-full">
          <option value="">선택</option>
          <option value="적게 마신다">적게 마신다</option>
          <option value="보통">보통</option>
          <option value="많이 마신다">많이 마신다</option>
        </select>
      </label>

      <label>세안 후 피부 당김
        <select name="tightness" onChange={handleChange} className="block w-full">
          <option value="">선택</option>
          <option value="없다">없다</option>
          <option value="약간 있다">약간 있다</option>
          <option value="당김이 있다">당김이 있다</option>
        </select>
      </label>

      <label>트러블 빈도
        <select name="trouble" onChange={handleChange} className="block w-full">
          <option value="">선택</option>
          <option value="거의 없음">거의 없음</option>
          <option value="가끔">가끔</option>
          <option value="자주">자주</option>
        </select>
      </label>

      <label>피부 민감도
        <select name="sensitivity" onChange={handleChange} className="block w-full">
          <option value="">선택</option>
          <option value="아니다">아니다</option>
          <option value="예">예</option>
        </select>
      </label>

      <label>피지 분비량
        <select name="sebum" onChange={handleChange} className="block w-full">
          <option value="">선택</option>
          <option value="적음">적음</option>
          <option value="보통">보통</option>
          <option value="많음">많음</option>
        </select>
      </label>

      <label>T존/U존 특성
        <select name="tzone" onChange={handleChange} className="block w-full">
          <option value="">선택</option>
          <option>전체 고르게 중성</option>
          <option>T존 지성 / U존 건성</option>
          <option>T존 & U존 모두 지성</option>
        </select>
      </label>

      <label>피부 혈색/피로감
        <select name="bloodflow" onChange={handleChange} className="block w-full">
          <option value="">선택</option>
          <option value="맑고 밝다">맑고 밝다</option>
          <option value="약간 칙칙함">약간 칙칙함</option>
          <option value="칙칙하고 어둡다">칙칙하고 어둡다</option>
          <option value="없음">없음</option>
        </select>
      </label>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        피부 진단 제출
      </button>
    </form>
  );
}
