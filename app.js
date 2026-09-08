(() => {
  "use strict";

  const TOTAL_QUESTIONS = 10;
  const MAX_SCORE = 30;

  const elements = {
    welcome: document.querySelector("#welcome-screen"),
    quiz: document.querySelector("#quiz-screen"),
    result: document.querySelector("#result-screen"),
    start: document.querySelector("#start-button"),
    modeDialog: document.querySelector("#mode-dialog"),
    modeClose: document.querySelector("#mode-close"),
    modeButtons: [...document.querySelectorAll("[data-quiz-mode]")],
    quit: document.querySelector("#quit-button"),
    restart: document.querySelector("#restart-button"),
    counter: document.querySelector("#question-counter"),
    difficulty: document.querySelector("#difficulty-label"),
    category: document.querySelector("#question-category"),
    title: document.querySelector("#question-title"),
    answers: document.querySelector("#answers"),
    progressTrack: document.querySelector("#progress-track"),
    progressBar: document.querySelector("#progress-bar"),
    dialog: document.querySelector("#feedback-dialog"),
    feedbackScore: document.querySelector("#feedback-score"),
    feedbackTitle: document.querySelector("#feedback-title"),
    feedbackText: document.querySelector("#feedback-text"),
    next: document.querySelector("#next-button"),
    resultTitle: document.querySelector("#result-title"),
    resultDescription: document.querySelector("#result-description"),
    scoreNumber: document.querySelector("#score-number"),
    scoreRing: document.querySelector(".score-ring"),
    strength: document.querySelector("#strength-text"),
    growth: document.querySelector("#growth-text"),
    nameInput: document.querySelector("#certificate-name"),
    namePreview: document.querySelector("#certificate-name-preview"),
    certificateLevel: document.querySelector("#certificate-level"),
    certificateScore: document.querySelector("#certificate-score"),
    certificateDate: document.querySelector("#certificate-date"),
    certificateSeal: document.querySelector("#certificate-seal"),
    download: document.querySelector("#download-certificate"),
    copy: document.querySelector("#copy-result"),
    toast: document.querySelector("#toast"),
    themeColor: document.querySelector('meta[name="theme-color"]'),
  };

  const difficultyLabels = {
    light: {
      easy: "Розминка на чілі",
      medium: "AI уже прокинувся",
      hard: "Мем-бос рівень",
    },
    hard: {
      easy: "Легка розминка",
      medium: "Робочий режим",
      hard: "AI boss level",
    },
  };

  const modeMeta = {
    light: {
      themeColor: "#f2f7ff",
      certificateTitle: "СЕРТИФІКАТ AI НА ЧІЛІ",
      certificateSeal: "Печатка синьої пігулки",
      accent: "#1677ff",
      accentDark: "#0d5cba",
      accentSoft: "#dcecff",
      secondarySoft: "#def6ff",
    },
    hard: {
      themeColor: "#fff5f6",
      certificateTitle: "СЕРТИФІКАТ ГЛИБОКОЇ AI-НОРИ",
      certificateSeal: "Печатка червоної пігулки",
      accent: "#db2c4b",
      accentDark: "#991b32",
      accentSoft: "#ffe0e6",
      secondarySoft: "#ffe8e4",
    },
  };

  const feedbackTitles = {
    0: [
      "Оце була пастка",
      "AI хитро посміхнувся",
      "Ой, цифрові граблі",
      "Цей раунд за AI",
      "Сміливо. Але повз",
    ],
    1: [
      "Тут є ризик",
      "Сміливо, але слизько",
      "Нюанс уже махає рукою",
      "AI десь підклав граблі",
      "Інтуїція була близько",
    ],
    2: [
      "Майже в яблучко",
      "Хороший хід",
      "Ще пів кроку — і вау",
      "AI вже трохи нервує",
      "Тепленько. Дуже тепленько",
    ],
    3: [
      "Ого, сильний хід",
      "А ти точно не новачок",
      "AI знімає капелюха",
      "Оце було професійно",
      "Бомба-ракета відповідь",
    ],
  };

  const lightFeedbackTitles = {
    0: [
      "Капібара не схвалює",
      "Ой, це був цифровий банан",
      "AI тихенько хихикає",
      "План був красивий",
      "Граблі сказали «дзень»",
    ],
    1: [
      "Майже, але з вайбом хаосу",
      "AI підняв одну брову",
      "Сюжет закрутив не туди",
      "Сміливо. Трошки небезпечно",
      "Тут мем переміг логіку",
    ],
    2: [
      "О, уже пахне перемогою",
      "AI перестав нервувати",
      "Ще ложечку контексту",
      "Дуже близько до магії",
      "Капібара киває",
    ],
    3: [
      "AI аплодує стоячи",
      "Оце ти красиво зайшов",
      "Синя пігулка працює",
      "Майстер легкого AI",
      "Бум! Просто в яблучко",
    ],
  };

  const domainByCategory = {
    "Промпти": "craft",
    "Ітерації": "craft",
    "Підсумки": "craft",
    "Дизайн задачі": "craft",
    "Структура даних": "craft",
    "Перевірка": "critical",
    "Актуальність": "critical",
    "Візуальні дані": "critical",
    "Докази": "critical",
    "Оцінювання": "critical",
    "Пошук знань": "critical",
    "Невизначеність": "critical",
    "Приватність": "safety",
    "AI-безпека": "safety",
    "Високий ризик": "safety",
    "Доступи агента": "safety",
    "Справедливість": "safety",
    "Безпечні дії": "safety",
    "Можливості AI": "workflow",
    "Креатив": "craft",
    "Зображення": "craft",
    "Музика": "craft",
    "Відео": "craft",
    "Промпти без болю": "craft",
    "Брейншторм": "craft",
    "Голос і текст": "workflow",
    "Голос": "workflow",
    "Аудіо": "workflow",
    "Презентації": "workflow",
    "Робочі лайфхаки": "workflow",
    "Зустрічі": "workflow",
    "Вибір інструмента": "workflow",
    "Переклад": "critical",
    "Пошук": "critical",
    "AI-міфи": "critical",
    "Дані": "critical",
    "Робота з джерелами": "critical",
    "AI-агенти": "safety",
    "Майбутнє роботи": "workflow",
  };

  const domainCopy = {
    craft: {
      strength: "Ти вмієш ставити AI нормальні задачі, а не просто кричати «зроби красиво».",
      growth: "Прокачай структуру промптів, приклади й чіткі формати результату.",
    },
    critical: {
      strength: "Твій внутрішній фактчекер не засинає, навіть коли AI звучить дуже впевнено.",
      growth: "Частіше перевіряй джерела, актуальність і межі впевненості моделі.",
    },
    safety: {
      strength: "Ти добре відчуваєш, де AI потрібні ремені безпеки й людський контроль.",
      growth: "Зверни більше уваги на приватність, prompt injection і права AI-агентів.",
    },
    workflow: {
      strength: "Ти бачиш AI як частину робочого процесу, а не чарівну кнопку на всі випадки.",
      growth: "Будуй повторювані workflow з критеріями якості, перевіркою та відповідальним власником.",
    },
  };

  const lightDomainCopy = {
    craft: {
      strength: "Ти вмієш розбудити креативний режим AI й не годуєш його запитами з одного слова.",
      growth: "Додавай у запити більше стилю, контексту й дивних обмежень — там живуть найкращі ідеї.",
    },
    critical: {
      strength: "Твій детектор AI-нісенітниць пищить саме тоді, коли треба.",
      growth: "Не купуйся на впевнений тон: перевіряй свіжість даних, джерела й занадто красиві відео.",
    },
    safety: {
      strength: "Ти не роздаєш AI паролі, чужі голоси й ключі від офісу. Уже перемога.",
      growth: "Пам’ятай про згоду людей, приватні дані та кнопку підтвердження перед великими діями.",
    },
    workflow: {
      strength: "Ти приблизно знаєш, кого кликати: чат, генератор картинок, транскрипцію чи AI для слайдів.",
      growth: "Підбирай інструмент під формат задачі й завжди залишай людину на фінальному контролі.",
    },
  };

  const state = {
    mode: null,
    questions: [],
    currentIndex: 0,
    score: 0,
    answers: [],
    locked: false,
    profile: null,
    domainResult: null,
    random: Math.random,
    lastFeedbackTitle: {},
  };

  let toastTimer = null;

  function hashSeed(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    let current = seed >>> 0;
    return () => {
      current += 0x6d2b79f5;
      let value = current;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createRandom() {
    const seedParam = new URLSearchParams(window.location.search).get("seed");
    if (seedParam) return seededRandom(hashSeed(seedParam));

    if (window.crypto?.getRandomValues) {
      const seed = new Uint32Array(1);
      window.crypto.getRandomValues(seed);
      return seededRandom(seed[0]);
    }

    return Math.random;
  }

  function shuffled(items, random) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function selectQuestions(random) {
    const bank = state.mode === "light" ? window.LIGHT_QUESTIONS : window.QUIZ_QUESTIONS;
    if (!Array.isArray(bank) || bank.length !== 30) {
      throw new Error("Question bank is missing or incomplete");
    }

    const take = (difficulty, amount) =>
      shuffled(
        bank.filter((question) => question.difficulty === difficulty),
        random,
      ).slice(0, amount);

    return [...take("easy", 3), ...take("medium", 4), ...take("hard", 3)];
  }

  function openModeChooser() {
    elements.modeDialog.showModal();
    elements.modeButtons[0].focus();
  }

  function closeModeChooser() {
    elements.modeDialog.close();
    elements.start.focus({ preventScroll: true });
  }

  function chooseMode(mode) {
    state.mode = mode;
    document.body.dataset.mode = mode;
    elements.themeColor.content = modeMeta[mode].themeColor;
    elements.modeDialog.close();
    startQuiz();
  }

  function showScreen(target) {
    for (const screen of [elements.welcome, elements.quiz, elements.result]) {
      screen.hidden = screen !== target;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startQuiz() {
    if (!state.mode) {
      openModeChooser();
      return;
    }

    try {
      state.random = createRandom();
      state.questions = selectQuestions(state.random);
    } catch (error) {
      showToast("Не вдалося завантажити банк запитань. Онови сторінку й спробуй ще раз.");
      return;
    }

    state.currentIndex = 0;
    state.score = 0;
    state.answers = [];
    state.locked = false;
    state.profile = null;
    state.domainResult = null;
    state.lastFeedbackTitle = {};
    elements.nameInput.value = "";
    showScreen(elements.quiz);
    renderQuestion();
  }

  function renderQuestion() {
    const question = state.questions[state.currentIndex];
    state.locked = false;

    elements.counter.textContent = `Питання ${state.currentIndex + 1} із ${TOTAL_QUESTIONS}`;
    elements.difficulty.textContent = difficultyLabels[state.mode][question.difficulty];
    elements.difficulty.dataset.level = question.difficulty;
    elements.category.textContent = question.category;
    elements.title.textContent = question.question;
    elements.progressTrack.setAttribute("aria-valuenow", String(state.currentIndex + 1));
    elements.progressBar.style.transform = `scaleX(${state.currentIndex + 1})`;
    elements.answers.replaceChildren();

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.dataset.option = option.id;
      button.setAttribute("aria-label", `${option.id}. ${option.text}`);
      button.innerHTML = `
        <span class="answer-key" aria-hidden="true">${option.id}</span>
        <span class="answer-text"></span>
      `;
      button.querySelector(".answer-text").textContent = option.text;
      button.addEventListener("click", () => selectAnswer(index));
      elements.answers.append(button);
    });

    elements.title.setAttribute("tabindex", "-1");
    elements.title.focus({ preventScroll: true });
  }

  function selectAnswer(optionIndex) {
    if (state.locked || elements.quiz.hidden) return;

    const question = state.questions[state.currentIndex];
    const option = question.options[optionIndex];
    if (!option) return;

    state.locked = true;
    state.score += option.score;
    state.answers.push({
      questionId: question.id,
      category: question.category,
      difficulty: question.difficulty,
      score: option.score,
    });

    const buttons = [...elements.answers.querySelectorAll("button")];
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === optionIndex) button.classList.add("is-selected");
    });

    elements.dialog.dataset.score = String(option.score);
    elements.feedbackScore.textContent = `+${option.score}`;
    elements.feedbackTitle.textContent = pickFeedbackTitle(option.score);
    elements.feedbackText.textContent = option.feedback;
    elements.next.textContent =
      state.currentIndex === TOTAL_QUESTIONS - 1 ? "Показати результат" : "Далі";

    elements.dialog.showModal();
    elements.next.focus();
  }

  function pickFeedbackTitle(score) {
    const titles = state.mode === "light" ? lightFeedbackTitles[score] : feedbackTitles[score];
    const previous = state.lastFeedbackTitle[score];
    const available = titles.filter((title) => title !== previous);
    const title = available[Math.floor(state.random() * available.length)];
    state.lastFeedbackTitle[score] = title;
    return title;
  }

  function continueQuiz() {
    elements.dialog.close();
    state.currentIndex += 1;

    if (state.currentIndex >= TOTAL_QUESTIONS) {
      renderResult();
      return;
    }

    renderQuestion();
  }

  function getProfile(score) {
    if (state.mode === "light") {
      if (score <= 10) {
        return {
          title: "AI-турист із картою догори дриґом",
          description:
            "Ти вже зайшов у AI-світ, але поки фотографуєш кожен кущ і питаєш, де тут вихід. Усе прекрасно: ще кілька спроб — і цифрові капібари визнають тебе своїм.",
        };
      }
      if (score <= 17) {
        return {
          title: "AI-мемолог-початківець",
          description:
            "Ти вже знаєш, який інструмент кликати на допомогу, і не просиш калькулятор намалювати кота. Трохи більше практики — і жарти стануть точнішими за прогнози погоди.",
        };
      }
      if (score <= 23) {
        return {
          title: "AI-напарник на чілі",
          description:
            "Ти впевнено розрізняєш магію, маркетинг і реально корисні AI-функції. Рутину вже можна віддавати машинам, а собі залишати каву, рішення й оплески.",
        };
      }
      return {
        title: "Верховний приборкувач AI",
        description:
          "Ти пройшов синю пігулку так, ніби сам писав інструкцію до Матриці. AI слухається, інструменти не плутаються, а цифрові граблі чемно переходять на інший бік дороги.",
      };
    }

    if (score <= 10) {
      return {
        title: "AI-кошенятко",
        description:
          "Ти тільки випускаєш кігтики в AI-світі — і це нормальна стартова точка. Кілька правильних звичок, трохи практики, і скоро промпти самі почнуть тебе поважати.",
      };
    }
    if (score <= 17) {
      return {
        title: "AI-дослідник",
        description:
          "Ти вже не тицяєш у AI навмання й бачиш, де він реально корисний. Ще трохи системності — і випадкові вдалі відповіді перетворяться на стабільно сильний результат.",
      };
    }
    if (score <= 23) {
      return {
        title: "AI-пілот",
        description:
          "Ти впевнено тримаєш штурвал: даєш контекст, перевіряєш результат і не віддаєш AI ключі від усього офісу. Наступна зупинка — складні workflow та вимірювана якість.",
      };
    }
    return {
      title: "AI-бомба-ракета",
      description:
        "Блін, це справді сильно. Ти не просто користуєшся AI, а розумієш, як зробити його корисним, контрольованим і безпечним. Залишилося масштабувати практики й допомагати іншим не наступати на цифрові граблі.",
    };
  }

  function calculateDomains() {
    const domains = {
      craft: { score: 0, max: 0 },
      critical: { score: 0, max: 0 },
      safety: { score: 0, max: 0 },
      workflow: { score: 0, max: 0 },
    };

    state.answers.forEach((answer) => {
      const domain = domainByCategory[answer.category] || "workflow";
      domains[domain].score += answer.score;
      domains[domain].max += 3;
    });

    const ranked = Object.entries(domains)
      .filter(([, value]) => value.max > 0)
      .map(([name, value]) => ({ name, ratio: value.score / value.max }))
      .sort((a, b) => b.ratio - a.ratio);

    return {
      strength: ranked[0]?.name || "workflow",
      growth: ranked.at(-1)?.name || "craft",
    };
  }

  function renderResult() {
    const percent = Math.round((state.score / MAX_SCORE) * 100);
    state.profile = getProfile(state.score);
    state.domainResult = calculateDomains();
    const activeDomainCopy = state.mode === "light" ? lightDomainCopy : domainCopy;

    elements.resultTitle.textContent = state.profile.title;
    elements.resultDescription.textContent = state.profile.description;
    elements.scoreNumber.textContent = `${percent}%`;
    elements.scoreRing.style.setProperty("--score-angle", `${percent * 3.6}deg`);
    elements.strength.textContent = activeDomainCopy[state.domainResult.strength].strength;
    elements.growth.textContent = activeDomainCopy[state.domainResult.growth].growth;

    elements.certificateLevel.textContent = state.profile.title;
    elements.certificateScore.textContent = `${state.score} із ${MAX_SCORE} балів · ${percent}% AI-форми`;
    elements.certificateSeal.textContent = modeMeta[state.mode].certificateSeal;
    elements.certificateDate.textContent = new Intl.DateTimeFormat("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    updateCertificateName();
    showScreen(elements.result);
    elements.resultTitle.setAttribute("tabindex", "-1");
    elements.resultTitle.focus({ preventScroll: true });
  }

  function displayName() {
    return elements.nameInput.value.trim() || "таємничий AI-ентузіаст";
  }

  function updateCertificateName() {
    elements.namePreview.textContent = displayName();
  }

  function wrapCanvasText(context, text, centerX, startY, maxWidth, lineHeight) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";

    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    });
    if (line) lines.push(line);

    lines.forEach((value, index) => context.fillText(value, centerX, startY + index * lineHeight));
    return lines.length;
  }

  function drawCertificate() {
    const canvas = document.createElement("canvas");
    canvas.width = 1800;
    canvas.height = 1125;
    const context = canvas.getContext("2d");
    const percent = Math.round((state.score / MAX_SCORE) * 100);
    const name = displayName();
    const date = elements.certificateDate.textContent;
    const theme = modeMeta[state.mode];

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = theme.accentSoft;
    context.beginPath();
    context.arc(1680, 90, 290, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = theme.secondarySoft;
    context.beginPath();
    context.arc(110, 1050, 330, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "#102230";
    context.lineWidth = 8;
    context.strokeRect(46, 46, canvas.width - 92, canvas.height - 92);

    context.strokeStyle = theme.accent;
    context.lineWidth = 24;
    context.beginPath();
    context.arc(120, 120, 48, Math.PI * 0.15, Math.PI * 1.85);
    context.stroke();

    context.fillStyle = "#102230";
    context.textAlign = "left";
    context.font = "800 31px Segoe UI, Arial, sans-serif";
    context.fillText("AI ШАРОМЕТР", 205, 132);

    context.textAlign = "center";
    context.fillStyle = theme.accentDark;
    context.font = "800 24px Segoe UI, Arial, sans-serif";
    context.fillText(theme.certificateTitle, 900, 240);

    context.fillStyle = "#5b6b76";
    context.font = "400 28px Segoe UI, Arial, sans-serif";
    context.fillText("Цим надзвичайно серйозним документом підтверджуємо, що", 900, 325);

    context.fillStyle = "#102230";
    context.font = "800 70px Segoe UI, Arial, sans-serif";
    const nameLines = wrapCanvasText(context, name, 900, 445, 1400, 78);
    const afterNameY = 445 + nameLines * 78 + 5;

    context.fillStyle = "#5b6b76";
    context.font = "400 28px Segoe UI, Arial, sans-serif";
    context.fillText("пройшов або пройшла 10 AI-випробувань і отримує рівень", 900, afterNameY);

    context.fillStyle = theme.accentDark;
    context.font = "850 60px Segoe UI, Arial, sans-serif";
    const levelLines = wrapCanvasText(context, state.profile.title, 900, afterNameY + 100, 1380, 66);

    context.fillStyle = "#102230";
    context.font = "700 31px Segoe UI, Arial, sans-serif";
    context.fillText(
      `${state.score} із ${MAX_SCORE} балів · ${percent}% AI-форми`,
      900,
      afterNameY + 100 + levelLines * 66 + 22,
    );

    context.textAlign = "left";
    context.fillStyle = "#5b6b76";
    context.font = "600 24px Segoe UI, Arial, sans-serif";
    context.fillText(date, 105, 1010);

    context.textAlign = "right";
    context.fillText(theme.certificateSeal, 1695, 1010);

    return canvas;
  }

  function downloadCertificate() {
    const canvas = drawCertificate();
    const safeName = displayName()
      .toLocaleLowerCase("uk-UA")
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-|-$/g, "") || "ai-entuziast";

    canvas.toBlob((blob) => {
      if (!blob) {
        showToast("Не вдалося створити PNG. Спробуй ще раз.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-sharometr-${safeName}.png`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      showToast("Сертифікат завантажено. Рамку обираєш самостійно.");
    }, "image/png");
  }

  async function copyResult() {
    const percent = Math.round((state.score / MAX_SCORE) * 100);
    const modeLabel = state.mode === "light" ? "синя пігулка · AI на чілі" : "червона пігулка · AI без страховки";
    const text = `Мій результат в AI Шарометрі (${modeLabel}): ${state.profile.title} — ${state.score}/${MAX_SCORE} (${percent}%).`;

    try {
      await navigator.clipboard.writeText(text);
      showToast("Результат скопійовано.");
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      showToast("Результат скопійовано.");
    }
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 3400);
  }

  function resetToWelcome() {
    if (elements.dialog.open) elements.dialog.close();
    if (elements.modeDialog.open) elements.modeDialog.close();
    state.mode = null;
    state.questions = [];
    state.answers = [];
    state.score = 0;
    state.currentIndex = 0;
    delete document.body.dataset.mode;
    elements.themeColor.content = "#f3f8fa";
    showScreen(elements.welcome);
    elements.start.focus({ preventScroll: true });
  }

  document.addEventListener("keydown", (event) => {
    if (elements.quiz.hidden || elements.dialog.open || state.locked) return;
    const key = event.key.toUpperCase();
    const letterIndex = ["A", "B", "C", "D"].indexOf(key);
    const numberIndex = ["1", "2", "3", "4"].indexOf(key);
    const optionIndex = letterIndex >= 0 ? letterIndex : numberIndex;
    if (optionIndex >= 0) {
      event.preventDefault();
      selectAnswer(optionIndex);
    }
  });

  elements.dialog.addEventListener("cancel", (event) => event.preventDefault());
  elements.modeDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModeChooser();
  });
  elements.start.addEventListener("click", startQuiz);
  elements.modeClose.addEventListener("click", closeModeChooser);
  elements.modeButtons.forEach((button) => {
    button.addEventListener("click", () => chooseMode(button.dataset.quizMode));
  });
  elements.next.addEventListener("click", continueQuiz);
  elements.quit.addEventListener("click", resetToWelcome);
  elements.restart.addEventListener("click", startQuiz);
  elements.nameInput.addEventListener("input", updateCertificateName);
  elements.download.addEventListener("click", downloadCertificate);
  elements.copy.addEventListener("click", copyResult);
})();
