import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const questions = [
  {
    id: 1,
    text: "수분 섭취량은 어느 정도인가요?",
    options: ["매우 부족", "부족", "보통", "충분", "매우 충분"],
  },
  {
    id: 2,
    text: "세안 후 피부 당김을 느끼시나요?",
    options: ["항상 당김", "자주 느껴짐", "보통", "약간 있음", "전혀 없음"],
  },
  {
    id: 3,
    text: "트러블 발생 빈도는 어떤가요?",
    options: ["항상 있음", "자주", "보통", "가끔", "없음"],
  },
  {
    id: 4,
    text: "피부 민감도는 어떤가요?",
    options: ["매우 민감", "민감", "보통", "약간 둔감", "매우 둔감"],
  },
  {
    id: 5,
    text: "피부 혈색/톤은 어떤가요?",
    options: ["매우 어두움", "어두움", "보통", "밝음", "매우 밝음"],
  },
];

const getScore = (index) => index + 1;

const diagnose = (answers) => {
  const hydration = (getScore(answers[0]) + (6 - getScore(answers[1]))) / 2;
  const sensitivity = getScore(answers[3]);
  const trouble = getScore(answers[2]);
  const tone = getScore(answers[4]);

  const H = hydration <= 2.5 ? "D" : hydration <= 3.4 ? "B" : "O";
  const S = sensitivity <= 2.5 ? "R" : "S";
  const T = trouble <= 2.5 ? "C" : "T";
  const C = tone <= 2.5 ? "M" : "T";

  const code = H + S + T + C;

  const types = {
    BSCT: "뷰티 아쿠아 (수분 많고 민감하며 깨끗한 피부)",
    DRTM: "뷰티 레디언트 (건조하지만 강하고 트러블 있음)",
    ORCM: "뷰티 밸런스 (유분 많지만 건강하고 깨끗한 피부)",
    DSCT: "뷰티 민감 (건조하고 예민하며 트러블 있음)",
    BRCT: "뷰티 내추럴 (균형잡힌 건강한 피부)",
    OSCM: "뷰티 파워 (지성 + 민감하지만 혈색 좋고 강함)",
  };

  return {
    code,
    description: types[code] || "커스텀 피부 코드 (당신만의 고유 피부유형)"
  };
};

export default function App() {
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleChange = (qIndex, optIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.length === questions.length) {
      setResult(diagnose(answers));
    } else {
      alert("모든 문항에 응답해주세요.");
    }
  };

  const handleDownload = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("beauty_code_result.pdf");
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">💎 피부유형 자가진단 테스트</h1>
      {!result ? (
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={q.id}>
              <p className="font-semibold mb-1">{q.text}</p>
              <div className="space-y-1">
                {q.options.map((opt, j) => (
                  <label key={j} className="block">
                    <input
                      type="radio"
                      name={`q${i}`}
                      checked={answers[i] === j}
                      onChange={() => handleChange(i, j)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            결과 확인
          </button>
        </div>
      ) : (
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold">당신의 BEAUTY CODE</h2>
          <p className="text-3xl mt-2">{result.code}</p>
          <p className="mt-4">{result.description}</p>
          <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            결과 PDF 저장
          </button>
          <button
            onClick={() => setResult(null)}
            className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            다시 진단하기
          </button>
        </div>
      )}
    </div>
  );
}