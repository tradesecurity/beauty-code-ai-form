
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    skinType: "건성",
    tightness: "가끔 있다",
    concerns: ["트러블", "탄력 저하"],
    recommendation: ["약산성 클렌저", "수분 진정 크림", "민감성 전용 선크림"]
  });

  const [submitted, setSubmitted] = useState(false);
  const reportRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("beauty-code-report.pdf");
  };

  if (submitted) {
    return (
      <div ref={reportRef} style={{ maxWidth: 480, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
        <h2>🌟 피부 진단 리포트</h2>
        <p><strong>이름:</strong> {form.name}</p>
        <p><strong>피부 타입:</strong> {form.skinType}</p>
        <p><strong>세안 후 당김:</strong> {form.tightness}</p>
        <p><strong>피부 고민:</strong> {form.concerns.join(", ")}</p>
        <p><strong>추천 제품:</strong></p>
        <ul>
          {form.recommendation.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <button onClick={handleDownloadPDF} style={{ marginTop: 20, padding: 10, background: "#444", color: "#fff" }}>
          PDF 저장하기
        </button>

        <div style={{ marginTop: 30 }}>
          <h4>🔗 공유하기</h4>
          <a href="https://sharer.kakao.com/talk?url=https://beauty-code-ai-form.vercel.app&text=당신의 피부 진단 결과를 확인해보세요!" target="_blank" rel="noreferrer">
            카카오톡 공유
          </a>
          <br />
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            인스타그램 공유하기
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto", padding: 20 }}>
      <h2>BEAUTY CODE AI 설문지</h2>
      <label>
        이름: <input type="text" name="name" onChange={handleChange} required />
      </label>
      <br /><br />
      <label>
        피부 타입:
        <select name="skinType" onChange={handleChange} defaultValue={form.skinType}>
          <option value="건성">건성</option>
          <option value="중성">중성</option>
          <option value="지성">지성</option>
        </select>
      </label>
      <br /><br />
      <label>
        세안 후 당김:
        <select name="tightness" onChange={handleChange} defaultValue={form.tightness}>
          <option value="항상 있다">항상 있다</option>
          <option value="가끔 있다">가끔 있다</option>
          <option value="없다">없다</option>
        </select>
      </label>
      <br /><br />
      <button type="submit">제출하기</button>
    </form>
  );
}
