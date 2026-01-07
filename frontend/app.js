const API_BASE_URL = "http://localhost:8000";

const ragInput = document.getElementById("rag-input");
const storeBtn = document.getElementById("store-btn");
const storeStatus = document.getElementById("store-status");

const questionInput = document.getElementById("question-input");
const askBtn = document.getElementById("ask-btn");

const answerEl = document.getElementById("answer");
const retrievedEl = document.getElementById("retrieved");

const showStatus = (message, isError = false) => {
  storeStatus.textContent = message;
  storeStatus.style.color = isError ? "#dc2626" : "#16a34a";
};

storeBtn.addEventListener("click", async () => {
  const text = ragInput.value.trim();
  if (!text) {
    showStatus("지식을 입력해주세요.", true);
    return;
  }

  showStatus("저장 중...");

  try {
    const response = await fetch(`${API_BASE_URL}/rag/store`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || "저장 실패");
    }

    showStatus("지식이 저장되었습니다.");
    ragInput.value = "";
  } catch (error) {
    showStatus(`오류: ${error.message}`, true);
  }
});

askBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();
  if (!question) {
    answerEl.textContent = "질문을 입력해주세요.";
    return;
  }

  answerEl.textContent = "답변 생성 중...";
  retrievedEl.innerHTML = "";

  try {
    const response = await fetch(`${API_BASE_URL}/chat/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.detail || "질문 실패");
    }

    const data = await response.json();
    answerEl.textContent = data.answer;

    data.retrieved_documents.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = `${doc.text} (score: ${doc.score?.toFixed(3) ?? "N/A"})`;
      retrievedEl.appendChild(li);
    });
  } catch (error) {
    answerEl.textContent = `오류: ${error.message}`;
  }
});
