
document.getElementById("survey-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const type = form.water.value === "1~2L 이상" && form.tightness.value === "전혀 없음" ? "BALANCE-TYPE" : "DRY-TYPE";

  document.getElementById("skin-type").textContent = type;

  const products = [
    { name: "기초 수분 라인", coupang: "https://link.coupang.com/base", smartstore: "https://smartstore.naver.com/base" },
    { name: "자외선 차단제", coupang: "https://link.coupang.com/sunblock", smartstore: "https://smartstore.naver.com/sunblock" },
    { name: "영양크림", coupang: "https://link.coupang.com/cream", smartstore: "https://smartstore.naver.com/cream" }
  ];

  const list = document.getElementById("product-links");
  list.innerHTML = "";
  products.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${p.name}</strong>:
      <a href="${p.coupang}" target="_blank">쿠팡</a> |
      <a href="${p.smartstore}" target="_blank">스마트스토어</a>`;
    list.appendChild(li);
  });

  document.getElementById("result").classList.remove("hidden");
});
