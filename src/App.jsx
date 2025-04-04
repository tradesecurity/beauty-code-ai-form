
import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    gender: "",
    age: "",
    waterIntake: "",
    sleepHours: "",
    sunExposure: "",
    exercise: "",
    tightness: "",
    trouble: "",
    sensitivity: "",
    sebum: "",
    concern: [],
    tzone: "",
    bloodflow: "",
    result: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        concern: checked
          ? [...prev.concern, value]
          : prev.concern.filter((c) => c !== value)
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = diagnoseSkin(form);
    setForm({ ...form, result });
  };

  const diagnoseSkin = (data) => {
    const { waterIntake, tightness, sebum, sensitivity, tzone, bloodflow } = data;

    if (sensitivity === "예" || bloodflow === "없음") return "🌬 SENSITIVE-TYPE";
    if (sebum === "많음" && data.trouble === "자주") return "🔥 SEBUM-TYPE";
    if (tzone === "T존 지성 / U존 건성") return "🌗 COMBI-TYPE";
    if (waterIntake === "많이 마신다" && tightness === "당김이 있다") return "🌊 AQUA-TYPE";
    if (bloodflow === "칙칙하고 어둡다") return "🧊 COOL-DULL-TYPE";
    return "🌟 BALANCE-TYPE";
  };

  if (form.result) {
    return (
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-4">✨ 당신의 피부 유형</h1>
        <p className="text-lg">{form.result}</p>
        <button
          onClick={() => setForm({ ...form, result: null })}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
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

      <label>피부 민감도 (붉어짐, 자극 등)
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
