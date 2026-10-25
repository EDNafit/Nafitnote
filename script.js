const qaList = document.getElementById("qaList");
const qaContent = document.getElementById("qaContent");
const toggleButton = document.getElementById("toggleButton");

function addTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

fetch("questions.json")
  .then((response) => {
    if (!response.ok) throw new Error("بارگذاری پرسش‌ها ناموفق بود.");
    return response.json();
  })
  .then((items) => {
    items.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "qa-item";

      const question = addTextElement("h2", "question", item.question);
      question.id = `question-${index + 1}`;
      article.appendChild(question);

      if (item.answer.trim()) {
        article.appendChild(addTextElement("p", "answer", item.answer));
      }

      qaList.appendChild(article);
    });
  })
  .catch(() => {
    qaList.textContent = "پرسش‌ها بارگذاری نشدند. لطفاً فایل questions.json و مسیر پروژه را بررسی کنید.";
  });

toggleButton.addEventListener("click", () => {
  const shouldFade = !qaContent.classList.contains("is-faded");
  qaContent.classList.toggle("is-faded", shouldFade);
  toggleButton.textContent = "اعمال";
  toggleButton.setAttribute("aria-expanded", String(!shouldFade));
});
