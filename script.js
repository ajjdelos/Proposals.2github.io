// JavaScript Code for Obligations & Contracts Educational Platform

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Dark/Light Theme Toggle ---
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const currentTheme = localStorage.getItem("theme") || "light";
    
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // --- 2. Responsive Mobile Drawer Navigation ---
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const closeSidebarBtn = document.getElementById("close-sidebar-btn");
    const sidebar = document.getElementById("sidebar");

    mobileMenuBtn.addEventListener("click", () => sidebar.classList.add("open"));
    closeSidebarBtn.addEventListener("click", () => sidebar.classList.remove("open"));

    // --- 3. Proposal 1: Student Profile LocalStorage Sync ---
    const profileFields = ['student-name', 'student-number', 'student-course', 'year-level', 'school-year', 'subject-name'];
    
    // Load saved details
    profileFields.forEach(id => {
        const input = document.getElementById(id);
        const savedValue = localStorage.getItem(id);
        if (savedValue !== null && input) {
            input.value = savedValue;
        }
        
        // Auto save on input
        if (input) {
            input.addEventListener("input", (e) => {
                localStorage.setItem(id, e.target.value);
            });
        }
    });

    // --- 4. Content Module Tabs ---
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabPanels.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const target = btn.getAttribute("data-tab");
            document.getElementById(target).classList.add("active");
        });
    });

    // Accordions
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            item.classList.toggle("open");
        });
    });

    // --- 5. Legal Dictionary Search ---
    const legalTerms = [
        { term: "Mora", def: "Delay in the fulfillment of an obligation. Can be Mora Solvendi (debtor delay) or Mora Accipiendi (creditor delay)." },
        { term: "Dolo", def: "Fraud or deliberate intent to evade the normal fulfillment of an obligation (Art. 1170)." },
        { term: "Culpa", def: "Fault or negligence consisting of the omission of diligence required by the nature of the obligation." },
        { term: "Fortuitous Event", def: "An extraordinary event which could not be foreseen, or which, though foreseen, was inevitable (Caso Fortuito)." },
        { term: "Solutio Indebiti", def: "Payment by mistake of something that is not legally due, giving rise to an obligation to return it." },
        { term: "Negotiorum Gestio", def: "Voluntary management of the property or affairs of another without their knowledge or consent." }
    ];

    const dictGrid = document.getElementById("dictionary-grid");
    const dictSearchInput = document.getElementById("dict-search-input");

    function renderDictionary(filter = "") {
        dictGrid.innerHTML = "";
        const filtered = legalTerms.filter(t => 
            t.term.toLowerCase().includes(filter.toLowerCase()) || 
            t.def.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
            dictGrid.innerHTML = "<p>No matching legal terms found.</p>";
            return;
        }

        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "dict-card";
            card.innerHTML = `<h4>${item.term}</h4><p>${item.def}</p>`;
            dictGrid.appendChild(card);
        });
    }

    renderDictionary();
    dictSearchInput.addEventListener("input", (e) => renderDictionary(e.target.value));

    // --- 6. Scenario Practice ---
    const scenarios = [
        {
            title: "Case 1: Solutio Indebiti (Bank Transfer Error)",
            text: "Mark accidentally transfers ₱50,000 via mobile banking to Sarah's bank account instead of his supplier. Is Sarah legally obligated to return the money?",
            expert: "YES. Under Art. 2154 (Solutio Indebiti), if something is received when there is no right to demand it, and it was unduly delivered through mistake, the obligation to return it arises."
        },
        {
            title: "Case 2: Fortuitous Event & Specific Goods",
            text: "John promises to deliver a specific racehorse named 'Lightning' to Pedro on Friday. On Thursday night, Lightning is struck by lightning during an unprecedented storm and dies. Is John liable for damages?",
            expert: "NO. Under Art. 1262, an obligation which consists in the delivery of a determinate thing is extinguished if it is lost or destroyed without the fault of the debtor and before he has incurred in delay."
        },
        {
            title: "Case 3: Solidary Liability in Business Loans",
            text: "Anna and Bob sign a promissory note stating: 'We solidarily promise to pay Bank X the amount of ₱100,000.' Can Bank X collect the full ₱100,000 from Anna alone?",
            expert: "YES. Under Art. 1216, the creditor may proceed against any one of the solidary debtors or all of them simultaneously. Anna can be required to pay the full amount."
        }
    ];

    const scenarioSelector = document.getElementById("scenario-selector");
    const scenarioTitle = document.getElementById("scenario-title");
    const scenarioText = document.getElementById("scenario-text");
    const checkScenarioBtn = document.getElementById("check-scenario-btn");
    const scenarioFeedback = document.getElementById("scenario-feedback");
    const scenarioExpertText = document.getElementById("scenario-expert-text");

    function loadScenario(index) {
        const item = scenarios[index];
        scenarioTitle.textContent = item.title;
        scenarioText.textContent = item.text;
        scenarioExpertText.textContent = item.expert;
        scenarioFeedback.classList.add("hidden");
        document.getElementById("user-reasoning").value = "";
    }

    scenarioSelector.addEventListener("change", (e) => loadScenario(e.target.value));
    checkScenarioBtn.addEventListener("click", () => scenarioFeedback.classList.remove("hidden"));
    loadScenario(0);

    // --- 7. Interactive Flashcards ---
    const flashcardsData = [
        { category: "General Provisions", q: "What is an Obligation under Art. 1156?", a: "A juridical necessity to give, to do, or not to do." },
        { category: "Sources", q: "What are the 5 sources of obligations?", a: "Law, Contracts, Quasi-Contracts, Acts/Omissions punished by Law (Delicts), and Quasi-Delicts." },
        { category: "Extinction", q: "What is Novation?", a: "The total or partial substitution or modification of an obligation by a new valid one." },
        { category: "Contracts", q: "What makes a contract Voidable?", a: "When consent is vitiated by mistake, violence, intimidation, undue influence, or fraud." },
        { category: "Quasi-Contracts", q: "Define Negotiorum Gestio.", a: "Voluntary management of another's abandoned property/business without their consent." }
    ];

    let currentFcIndex = 0;
    const flashcardEl = document.getElementById("flashcard");
    const fcCategory = document.getElementById("fc-category");
    const fcQuestion = document.getElementById("fc-question");
    const fcAnswer = document.getElementById("fc-answer");
    const fcIndex = document.getElementById("fc-index");
    const fcTotal = document.getElementById("fc-total");

    fcTotal.textContent = flashcardsData.length;

    function renderFlashcard() {
        flashcardEl.classList.remove("flipped");
        const fc = flashcardsData[currentFcIndex];
        fcCategory.textContent = fc.category;
        fcQuestion.textContent = fc.q;
        fcAnswer.textContent = fc.a;
        fcIndex.textContent = currentFcIndex + 1;
    }

    flashcardEl.addEventListener("click", () => flashcardEl.classList.toggle("flipped"));

    document.getElementById("next-fc-btn").addEventListener("click", () => {
        currentFcIndex = (currentFcIndex + 1) % flashcardsData.length;
        renderFlashcard();
    });

    document.getElementById("prev-fc-btn").addEventListener("click", () => {
        currentFcIndex = (currentFcIndex - 1 + flashcardsData.length) % flashcardsData.length;
        renderFlashcard();
    });

    renderFlashcard();

    // --- 8. Assessment Quiz Engine ---
    const quizData = [
        {
            question: "Which of the following is NOT one of the 5 sources of obligations under Art. 1157?",
            options: ["Law", "Contracts", "Quasi-Contracts", "Natural Intention"],
            correct: 3,
            explanation: "Art. 1157 lists Law, Contracts, Quasi-Contracts, Delicts, and Quasi-Delicts. 'Natural Intention' is not a source of civil obligations."
        },
        {
            question: "An obligation where performance depends upon a future and uncertain event is called a:",
            options: ["Pure Obligation", "Conditional Obligation", "Obligation with a Period", "Joint Obligation"],
            correct: 1,
            explanation: "A conditional obligation is one whose acquisition or extinguishment depends upon a future and uncertain event."
        },
        {
            question: "Payment made by mistake to a person not entitled to receive it gives rise to:",
            options: ["Negotiorum Gestio", "Solutio Indebiti", "Delict", "Novation"],
            correct: 1,
            explanation: "Solutio Indebiti occurs when something is delivered by mistake when there is no right to demand it."
        }
    ];

    let currentQuizIndex = 0;
    let score = 0;

    const quizQuestionTitle = document.getElementById("quiz-question-title");
    const quizOptionsContainer = document.getElementById("quiz-options-container");
    const quizExplanation = document.getElementById("quiz-explanation");
    const nextQuizBtn = document.getElementById("next-quiz-btn");
    const resetQuizBtn = document.getElementById("reset-quiz-btn");
    const quizScoreBadge = document.getElementById("quiz-score-badge");
    const quizProgressFill = document.getElementById("quiz-progress-fill");

    function renderQuiz() {
        if (currentQuizIndex >= quizData.length) {
            quizQuestionTitle.textContent = `Quiz Completed! Your Score: ${score} / ${quizData.length}`;
            quizOptionsContainer.innerHTML = "";
            quizExplanation.classList.add("hidden");
            nextQuizBtn.classList.add("hidden");
            quizProgressFill.style.width = "100%";
            return;
        }

        const q = quizData[currentQuizIndex];
        quizQuestionTitle.textContent = `Q${currentQuizIndex + 1}: ${q.question}`;
        quizOptionsContainer.innerHTML = "";
        quizExplanation.classList.add("hidden");
        nextQuizBtn.classList.add("hidden");

        const progressPercent = ((currentQuizIndex) / quizData.length) * 100;
        quizProgressFill.style.width = `${progressPercent}%`;

        q.options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.className = "option-btn";
            btn.textContent = opt;
            btn.addEventListener("click", () => handleAnswer(idx));
            quizOptionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(selectedIndex) {
        const q = quizData[currentQuizIndex];
        const buttons = quizOptionsContainer.querySelectorAll(".option-btn");

        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.correct) {
                btn.classList.add("correct");
            } else if (idx === selectedIndex) {
                btn.classList.add("wrong");
            }
        });

        if (selectedIndex === q.correct) {
            score++;
            quizScoreBadge.textContent = `Score: ${score} / ${quizData.length}`;
        }

        quizExplanation.textContent = `Explanation: ${q.explanation}`;
        quizExplanation.classList.remove("hidden");
        nextQuizBtn.classList.remove("hidden");
    }

    nextQuizBtn.addEventListener("click", () => {
        currentQuizIndex++;
        renderQuiz();
    });

    resetQuizBtn.addEventListener("click", () => {
        currentQuizIndex = 0;
        score = 0;
        quizScoreBadge.textContent = `Score: 0 / ${quizData.length}`;
        renderQuiz();
    });

    renderQuiz();
});
