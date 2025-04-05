import React from "react";
import html2canvas from "html2canvas";

function App() {
  const handleCaptureClick = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "screenshot.png";
      link.href = imgData;
      link.click();
    });
  };

  return (
    <div>
      <h1>BEAUTY CODE AI 설문지</h1>
      <button onClick={handleCaptureClick}>화면 캡처하기</button>
    </div>
  );
}

export default App;
