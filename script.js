(() => {
  const list = document.getElementById('qaList');
  const button = document.getElementById('applyButton');
  const countLabel = document.getElementById('countLabel');
  const data = Array.isArray(window.QA_DATA) ? window.QA_DATA : [];

  data.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'qa-card';
    const question = document.createElement('h2');
    question.className = 'question';
    question.textContent = `${(index + 1).toLocaleString('fa-IR')}. ${item.question}`;
    const answer = document.createElement('div');
    answer.className = 'answer';
    answer.textContent = item.answer;
    card.append(question, answer);
    list.append(card);
  });

  countLabel.textContent = `${data.length.toLocaleString('fa-IR')} پرسش و پاسخ`;
  let visible = true;
  let animating = false;
  button.addEventListener('click', () => {
    if (animating) return;
    animating = true;
    if (visible) {
      list.classList.add('is-fading');
      window.setTimeout(() => {
        list.classList.add('is-hidden');
        list.classList.remove('is-fading');
        button.setAttribute('aria-expanded', 'false');
        visible = false;
        animating = false;
      }, 230);
    } else {
      list.classList.remove('is-hidden');
      list.classList.add('is-fading');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        list.classList.remove('is-fading');
        button.setAttribute('aria-expanded', 'true');
        visible = true;
        window.setTimeout(() => { animating = false; }, 230);
      }));
    }
  });
})();
