/* ============================================
   ELECTOGUIDE v2 — Interactive Election Assistant
   Powered by Gemini AI (Now Secure via Backend API)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initScrollProgress();
    initBackToTop();
    initHeroCounters();
    initScrollAnimations();
    initDemocracyStats();
    initTimeline();
    initSteps();
    initQuiz();
    initChecklist();
    initFAQ();
    initCountdown();
    initEligibility();
    initArena();
    initPulse();
    initLanguage();
});

/* ============================================
   COUNTDOWN TIMER
   ============================================ */

function initCountdown() {
    const electionDate = new Date();
    electionDate.setDate(electionDate.getDate() + 180); // 180 days from now
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = electionDate.getTime() - now;
        
        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (document.getElementById('countDays')) {
            document.getElementById('countDays').innerText = days.toString().padStart(2, '0');
            document.getElementById('countHours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('countMinutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('countSeconds').innerText = seconds.toString().padStart(2, '0');
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ============================================
   PARTICLE BACKGROUND
   ============================================ */

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.hue = Math.random() > 0.5 ? 271 : 187;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
            ctx.fill();
        }
    }

    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */

function initScrollProgress() {
    const bar = document.getElementById('scrollProgressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = `${progress}%`;
    });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================
   NAVIGATION
   ============================================ */

function initNavigation() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        links.classList.toggle('open');
    });

    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            links.classList.remove('open');
        });
    });

    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 200;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        links.querySelectorAll('.nav-link:not(.nav-link-cta)').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   HERO COUNTERS
   ============================================ */

function initHeroCounters() {
    const counters = document.querySelectorAll('.hero-stats .stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target, '+');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, suffix = '') {
    let current = 0;
    const increment = target / 40;
    const stepTime = 1500 / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.round(current) + suffix;
    }, stepTime);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.overview-card, .step-card').forEach(el => {
        observer.observe(el);
    });
}

/* ============================================
   DEMOCRACY STATS
   ============================================ */

function initDemocracyStats() {
    const cards = document.querySelectorAll('.stats-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const valueEl = entry.target.querySelector('.stats-value');
                if (valueEl) {
                    const target = parseInt(valueEl.getAttribute('data-count'));
                    animateCounter(valueEl, target, '');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    cards.forEach(c => observer.observe(c));
}

/* ============================================
   TIMELINE DATA & LOGIC
   ============================================ */

const timelineData = [
    {
        phase: 'Phase 1', label: 'Announcement', duration: 'Day 0', icon: '📢',
        title: 'Election Announcement',
        description: 'The Election Commission officially announces the election schedule, including key dates for nominations, campaigning, voting, and counting. The Model Code of Conduct comes into effect immediately upon announcement, governing the behavior of political parties and candidates.',
        activities: ['Official notification published in government gazette', 'Model Code of Conduct activated', 'Election schedule and phases announced', 'Electoral officers appointed for constituencies', 'Security arrangements initiated', 'Media briefing and public communication']
    },
    {
        phase: 'Phase 2', label: 'Nomination', duration: 'Day 1-7', icon: '📝',
        title: 'Candidate Nominations',
        description: 'Aspiring candidates file their nomination papers with the Returning Officer. Each candidate must submit required documents, security deposit, and declarations. After the filing deadline, a scrutiny of all nominations is conducted to verify eligibility, followed by a period for withdrawal.',
        activities: ['Candidates file nomination papers', 'Security deposits submitted', 'Affidavits and asset declarations filed', 'Scrutiny of nomination papers by Returning Officer', 'Candidates can withdraw nominations', 'Final list of contesting candidates published']
    },
    {
        phase: 'Phase 3', label: 'Campaigning', duration: 'Day 7-21', icon: '📣',
        title: 'Election Campaigning',
        description: 'Political parties and candidates campaign across constituencies through rallies, door-to-door canvassing, media advertisements, and social media outreach. Strict regulations govern campaign spending, content, and conduct to ensure a level playing field. Campaigning must cease 48 hours before voting begins.',
        activities: ['Public rallies and political meetings', 'Door-to-door canvassing and outreach', 'Print, broadcast, and digital advertising', 'Manifesto releases and debates', 'Campaign expenditure monitoring', 'Campaign silence period 48 hours before voting']
    },
    {
        phase: 'Phase 4', label: 'Preparation', duration: 'Day 20-22', icon: '🏗️',
        title: 'Poll Preparation',
        description: 'Extensive logistical preparation begins in the days before voting. Polling stations are set up with proper facilities, electronic voting machines are tested and deployed, security personnel are positioned, and voter awareness campaigns reach their peak.',
        activities: ['Polling station infrastructure setup', 'Electronic voting machine deployment and testing', 'Voter slips distributed to registered voters', 'Security forces deployed to sensitive areas', 'Training sessions for polling officials', 'Mock polls conducted at every booth']
    },
    {
        phase: 'Phase 5', label: 'Voting Day', duration: 'Day 23', icon: '🗳️',
        title: 'Polling / Voting Day',
        description: 'Citizens exercise their franchise at designated polling stations. Voters are identified using photo ID, their names are verified on the electoral roll, indelible ink is applied, and they cast their vote using an electronic voting machine or ballot paper.',
        activities: ['Polling stations open at designated time', 'Voter identity verification and authentication', 'Indelible ink application to prevent duplicate voting', 'Votes cast on electronic voting machines', 'Polling agents from all parties monitor proceedings', 'Voter Verified Paper Audit Trail (VVPAT) records maintained']
    },
    {
        phase: 'Phase 6', label: 'Counting', duration: 'Day 26', icon: '🔢',
        title: 'Vote Counting',
        description: 'Votes are counted under strict supervision at designated counting centers. Postal ballots are counted first, followed by electronic voting machine results round by round. Candidates, their agents, and election observers are present throughout.',
        activities: ['Counting centers secured and sealed', 'Postal ballots counted first', 'EVM votes counted round by round', 'VVPAT verification of randomly selected machines', 'Real-time trend updates published', 'Counting agents from all parties present']
    },
    {
        phase: 'Phase 7', label: 'Results', duration: 'Day 26-27', icon: '🏆',
        title: 'Results & Formation',
        description: 'After counting is completed, results are formally declared by the Returning Officer for each constituency. The winning candidate receives a certificate of election. The party or coalition with the majority is invited to form the government.',
        activities: ['Official results declared constituency-wise', 'Certificates of election issued to winners', 'Overall results tabulated and published', 'Majority party/coalition invited to form government', 'Oath of office ceremony for elected representatives', 'Peaceful and orderly transition of power']
    }
];

function initTimeline() {
    const container = document.getElementById('timelineContainer');
    const itemsWrap = document.createElement('div');
    itemsWrap.className = 'timeline-items';

    timelineData.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'timeline-item';
        el.setAttribute('data-index', index);
        el.innerHTML = `
            <div class="timeline-node"></div>
            <span class="timeline-label">${item.label}</span>
            <span class="timeline-duration">${item.duration}</span>
        `;
        el.addEventListener('click', () => activateTimeline(index));
        itemsWrap.appendChild(el);
    });

    container.appendChild(itemsWrap);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateTimeline(0);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(container);
}

function activateTimeline(index) {
    const items = document.querySelectorAll('.timeline-item');
    const progress = document.getElementById('timelineProgress');
    const detailPanel = document.getElementById('detailPanelContent');
    const data = timelineData[index];

    items.forEach((item, i) => item.classList.toggle('active', i === index));
    progress.style.width = `${((index + 1) / timelineData.length) * 100}%`;

    detailPanel.innerHTML = `
        <div class="detail-header">
            <div class="detail-icon">${data.icon}</div>
            <div>
                <span class="detail-phase">${data.phase} · ${data.duration}</span>
                <h3 class="detail-title">${data.title}</h3>
            </div>
        </div>
        <p class="detail-description">${data.description}</p>
        <div class="detail-activities">
            ${data.activities.map(a => `
                <div class="detail-activity">
                    <span class="activity-check">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <span>${a}</span>
                </div>
            `).join('')}
        </div>
    `;

    detailPanel.style.opacity = '0';
    detailPanel.style.transform = 'translateY(10px)';
    requestAnimationFrame(() => {
        detailPanel.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        detailPanel.style.opacity = '1';
        detailPanel.style.transform = 'translateY(0)';
    });
}

/* ============================================
   VOTING STEPS
   ============================================ */

const stepsData = [
    { title: 'Check Your Registration', description: 'Before election day, verify that you are registered to vote. Visit the official election commission website or contact your local election office to confirm your registration status and polling station.', tip: 'Register early! Most jurisdictions have a registration deadline several weeks before the election.' },
    { title: 'Know Your Polling Station', description: 'Find out the exact location of your assigned polling station. Note the address, opening hours, and accessibility information. Your polling station is usually based on your registered residential address.', tip: 'Visit the polling station beforehand to familiarize yourself with the location and plan your route.' },
    { title: 'Gather Required Documents', description: 'Prepare a valid government-issued photo ID such as a voter ID card, passport, driving license, or any other accepted identification.', tip: 'Check the official list of accepted IDs well in advance. Some regions may require specific documents.' },
    { title: 'Research Candidates & Issues', description: 'Study the candidates running in your constituency. Review their manifestos, track records, and positions on issues that matter to you.', tip: 'Use official sources and non-partisan voter guides for balanced information about candidates.' },
    { title: 'Arrive at the Polling Station', description: 'On election day, go to your designated polling station. Upon arrival, join the queue in an orderly manner. Polling officials will guide you through the process.', tip: 'Go early in the morning to avoid long queues. Carry water and weather-appropriate clothing.' },
    { title: 'Identity Verification', description: 'Present your photo ID to the polling officer. Your name will be checked against the electoral roll. Once verified, your finger will be marked with indelible ink.', tip: 'The indelible ink mark is a security measure. Do not try to remove it — it will fade naturally.' },
    { title: 'Cast Your Vote', description: 'Enter the voting booth for complete privacy. Press the button next to your chosen candidate on the EVM or mark your ballot paper. A VVPAT slip may print for verification.', tip: 'Take your time in the booth. Ensure you press the correct button before leaving.' },
    { title: 'Leave and Encourage Others', description: 'After casting your vote, leave the polling station quietly. Encourage family, friends, and community members to exercise their right to vote.', tip: 'Share your voting experience (not your choice!) on social media to inspire others to vote.' }
];

function initSteps() {
    const container = document.getElementById('stepsContainer');
    stepsData.forEach((step, index) => {
        const el = document.createElement('div');
        el.className = 'step-card';
        el.setAttribute('data-delay', index * 100);
        el.innerHTML = `
            <div class="step-number">${String(index + 1).padStart(2, '0')}</div>
            <div class="step-info">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
                <div class="step-tip">${step.tip}</div>
            </div>
        `;
        container.appendChild(el);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    container.querySelectorAll('.step-card').forEach(el => observer.observe(el));
}

/* ============================================
   ELECTION QUIZ
   ============================================ */

const quizData = [
    {
        question: 'What is the minimum voting age in most democratic countries?',
        options: ['16 years', '18 years', '21 years', '25 years'],
        correct: 1,
        explanation: 'The minimum voting age in most democracies worldwide is 18 years.'
    },
    {
        question: 'What does EVM stand for?',
        options: ['Electronic Vote Manager', 'Election Verification Machine', 'Electronic Voting Machine', 'Electoral Vote Mechanism'],
        correct: 2,
        explanation: 'EVM stands for Electronic Voting Machine, used to record and count votes electronically.'
    },
    {
        question: 'What is the "Model Code of Conduct"?',
        options: ['A law passed by parliament', 'Guidelines for fair elections', 'A voter registration form', 'A type of ballot paper'],
        correct: 1,
        explanation: 'The Model Code of Conduct is a set of guidelines that govern the behavior of parties and candidates during elections.'
    },
    {
        question: 'When must election campaigning stop before voting day?',
        options: ['12 hours before', '24 hours before', '48 hours before', '72 hours before'],
        correct: 2,
        explanation: 'All campaigning must cease 48 hours before the start of polling — this is known as the "silence period".'
    },
    {
        question: 'What is VVPAT?',
        options: ['Voter Verified Paper Audit Trail', 'Vote Validation Post Assessment Test', 'Verified Voting Process And Tracking', 'Voter Verification And Paper Trail'],
        correct: 0,
        explanation: 'VVPAT (Voter Verified Paper Audit Trail) is a device that prints a paper slip after each vote for verification.'
    },
    {
        question: 'What is the purpose of indelible ink on a voter\'s finger?',
        options: ['To identify the voter\'s party', 'To prevent duplicate voting', 'To count the total voters', 'To verify identity'],
        correct: 1,
        explanation: 'Indelible ink is applied to prevent a person from voting more than once in the same election.'
    },
    {
        question: 'In a First-Past-The-Post (FPTP) system, how is the winner decided?',
        options: ['Must get 50%+ votes', 'Most votes wins', 'Through a runoff', 'Electoral college decides'],
        correct: 1,
        explanation: 'In FPTP, the candidate with the most votes wins — there is no requirement for a majority (50%+).'
    },
    {
        question: 'Which country has the largest electorate in the world?',
        options: ['United States', 'China', 'India', 'Indonesia'],
        correct: 2,
        explanation: 'India has the largest electorate in the world with over 900 million eligible voters.'
    },
    {
        question: 'What are postal ballots used for?',
        options: ['Counting mail deliveries', 'Allowing certain voters to vote remotely', 'Registering new voters', 'Training election officials'],
        correct: 1,
        explanation: 'Postal ballots allow specific categories of voters (military, disabled, etc.) to vote remotely by mail.'
    },
    {
        question: 'What happens if two candidates receive exactly the same number of votes?',
        options: ['Both win', 'Re-election is held', 'Drawing of lots', 'The older candidate wins'],
        correct: 2,
        explanation: 'In most jurisdictions, a tie is resolved by drawing of lots — a random selection method.'
    }
];

let quizState = { current: 0, score: 0, answered: false };

function initQuiz() {
    loadQuizQuestion();
    document.getElementById('quizNextBtn').addEventListener('click', nextQuizQuestion);
    document.getElementById('quizRetryBtn').addEventListener('click', retryQuiz);
}

function loadQuizQuestion() {
    const q = quizData[quizState.current];
    document.getElementById('quizQuestionNum').textContent = `Question ${quizState.current + 1} of ${quizData.length}`;
    document.getElementById('quizScore').textContent = `Score: ${quizState.score}`;
    document.getElementById('quizProgressFill').style.width = `${((quizState.current) / quizData.length) * 100}%`;
    document.getElementById('quizQuestion').textContent = q.question;
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('quizNextBtn').style.display = 'none';
    quizState.answered = false;

    const optionsContainer = document.getElementById('quizOptions');
    const letters = ['A', 'B', 'C', 'D'];
    optionsContainer.innerHTML = q.options.map((opt, i) => `
        <div class="quiz-option" data-index="${i}" onclick="selectQuizOption(${i})">
            <div class="quiz-option-letter">${letters[i]}</div>
            <span>${opt}</span>
        </div>
    `).join('');
}

function selectQuizOption(index) {
    if (quizState.answered) return;
    quizState.answered = true;

    const q = quizData[quizState.current];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');

    options.forEach(opt => opt.classList.add('disabled'));
    options[q.correct].classList.add('correct');

    if (index === q.correct) {
        quizState.score++;
        feedback.textContent = `✅ Correct! ${q.explanation}`;
        feedback.className = 'quiz-feedback correct';
    } else {
        options[index].classList.add('wrong');
        feedback.textContent = `❌ Incorrect. ${q.explanation}`;
        feedback.className = 'quiz-feedback wrong';
    }

    document.getElementById('quizScore').textContent = `Score: ${quizState.score}`;
    document.getElementById('quizNextBtn').style.display = 'inline-flex';
    document.getElementById('quizNextBtn').querySelector('span').textContent =
        quizState.current === quizData.length - 1 ? 'See Results' : 'Next Question';
}

function nextQuizQuestion() {
    quizState.current++;
    if (quizState.current >= quizData.length) {
        showQuizResults();
    } else {
        loadQuizQuestion();
    }
}

function showQuizResults() {
    const resultsEl = document.getElementById('quizResults');
    const percentage = Math.round((quizState.score / quizData.length) * 100);

    let icon, title, message;
    if (percentage >= 80) {
        icon = '🏆'; title = 'Outstanding!';
        message = 'You are an election expert! Your knowledge of the democratic process is impressive.';
    } else if (percentage >= 60) {
        icon = '🌟'; title = 'Well Done!';
        message = 'You have good knowledge! Review the sections above to fill in a few gaps.';
    } else if (percentage >= 40) {
        icon = '📚'; title = 'Good Effort!';
        message = 'You\'re on the right track. Explore our timeline and FAQ sections to learn more.';
    } else {
        icon = '💪'; title = 'Keep Learning!';
        message = 'Democracy is a journey. Browse through our guide to boost your election knowledge!';
    }

    document.getElementById('quizResultsIcon').textContent = icon;
    document.getElementById('quizResultsTitle').textContent = title;
    document.getElementById('quizResultsScore').textContent = `You scored ${quizState.score} out of ${quizData.length} (${percentage}%)`;
    document.getElementById('quizResultsMessage').textContent = message;
    resultsEl.style.display = 'flex';
}

function retryQuiz() {
    quizState = { current: 0, score: 0, answered: false };
    document.getElementById('quizResults').style.display = 'none';
    loadQuizQuestion();
}

// Make it globally accessible for onclick
window.selectQuizOption = selectQuizOption;

/* ============================================
   VOTER READINESS CHECKLIST
   ============================================ */

const checklistData = [
    { text: 'Verify voter registration status', desc: 'Check online or at your local office', emoji: '📋' },
    { text: 'Locate your polling station', desc: 'Find the address and note directions', emoji: '📍' },
    { text: 'Prepare valid photo ID', desc: 'Voter ID, passport, or driving license', emoji: '🪪' },
    { text: 'Research candidates and issues', desc: 'Read manifestos and positions', emoji: '🔍' },
    { text: 'Note polling station timings', desc: 'Know when it opens and closes', emoji: '⏰' },
    { text: 'Plan your route and transport', desc: 'Avoid delays on election day', emoji: '🚗' },
    { text: 'Set a reminder for election day', desc: 'Don\'t miss your chance to vote!', emoji: '🔔' },
    { text: 'Charge your phone', desc: 'For digital ID and navigation', emoji: '🔋' },
    { text: 'Prepare for weather conditions', desc: 'Carry umbrella, water, or sunscreen', emoji: '☂️' },
    { text: 'Inform family and friends', desc: 'Encourage them to vote too!', emoji: '👨‍👩‍👧‍👦' }
];

function initChecklist() {
    const container = document.getElementById('checklistItems');
    const saved = JSON.parse(localStorage.getItem('electoguide_checklist') || '{}');

    checklistData.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = `checklist-item${saved[index] ? ' checked' : ''}`;
        el.innerHTML = `
            <div class="checklist-checkbox">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="checklist-text">
                <h4>${item.text}</h4>
                <p>${item.desc}</p>
            </div>
            <div class="checklist-emoji">${item.emoji}</div>
        `;
        el.addEventListener('click', () => {
            el.classList.toggle('checked');
            const state = JSON.parse(localStorage.getItem('electoguide_checklist') || '{}');
            if (el.classList.contains('checked')) {
                state[index] = true;
            } else {
                delete state[index];
            }
            localStorage.setItem('electoguide_checklist', JSON.stringify(state));
            updateChecklistProgress();
        });
        container.appendChild(el);
    });

    updateChecklistProgress();
}

function updateChecklistProgress() {
    const total = checklistData.length;
    const checked = document.querySelectorAll('.checklist-item.checked').length;
    const percent = Math.round((checked / total) * 100);
    const circumference = 2 * Math.PI * 54; // r=54

    document.getElementById('checklistPercentage').textContent = `${percent}%`;
    const circle = document.getElementById('checklistCircle');
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference - (circumference * percent / 100);
}

/* ============================================
   ELIGIBILITY CHECKER
   ============================================ */

function initEligibility() {
    const form = document.getElementById('eligibilityForm');
    if(!form) return;
    
    const resultDiv = document.getElementById('eligibilityResult');
    const resetBtn = document.getElementById('btnResetEligibility');
    
    const docCheckboxes = document.querySelectorAll('input[name="docs"]');
    const noneCheckbox = document.getElementById('docNone');
    
    docCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb.checked) noneCheckbox.checked = false;
        });
    });
    
    noneCheckbox.addEventListener('change', () => {
        if (noneCheckbox.checked) {
            docCheckboxes.forEach(cb => cb.checked = false);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const age = parseInt(document.getElementById('eligAge').value);
        const citizen = document.getElementById('eligCitizen').value;
        const selectedDocs = Array.from(document.querySelectorAll('input[name="docs"]:checked')).map(cb => cb.value);
        const noneSelected = noneCheckbox.checked;
        
        let status = 'error';
        let title = '';
        let message = '';
        let icon = '';
        let missing = [];
        
        if (age < 18) {
            status = 'error';
            icon = '🙅‍♂️';
            title = 'Not Yet Eligible';
            message = `You must be at least 18 years old to vote. You have ${18 - age} more year(s) to go! Learn about the process in the meantime.`;
        } else if (citizen === 'no') {
            status = 'error';
            icon = '🌍';
            title = 'Not Eligible';
            message = 'Voting in national elections is strictly reserved for citizens of the country.';
        } else {
            // Age >= 18 and Citizen
            if (noneSelected || selectedDocs.length === 0) {
                status = 'warning';
                icon = '⚠️';
                title = 'Action Required';
                message = 'You meet the basic age and citizenship requirements, but you need primary ID documents to register and vote.';
                missing = [
                    'You need to acquire a Voter ID.',
                    'You will need proof of identity (like a Passport, Aadhar, SSN) and proof of address to apply for a Voter ID.'
                ];
            } else if (!selectedDocs.includes('Voter ID')) {
                status = 'warning';
                icon = '📝';
                title = 'Registration Mode';
                message = `You are eligible to vote, but you don't have a Voter ID yet. You can use your ${selectedDocs.join(' or ')} to register immediately!`;
                missing = [
                    'Apply for a Voter ID online or at your local election office.',
                    'Check registration deadlines for the upcoming election.'
                ];
            } else {
                status = 'success';
                icon = '🎉';
                title = 'Fully Eligible!';
                message = 'You have everything you need to cast your ballot. Just make sure your name is actively listed on the electoral roll.';
            }
        }
        
        // Render Result
        const titleEl = document.getElementById('resultTitle');
        titleEl.textContent = title;
        titleEl.className = `result-title ${status}`;
        
        document.getElementById('resultIconWrap').textContent = icon;
        document.getElementById('resultMessage').textContent = message;
        
        const missingEl = document.getElementById('resultMissing');
        if (missing.length > 0) {
            missingEl.innerHTML = '<strong>What you need to do next:</strong><ul>' + missing.map(m => `<li>${m}</li>`).join('') + '</ul>';
            missingEl.classList.add('show');
        } else {
            missingEl.classList.remove('show');
        }
        
        form.style.display = 'none';
        resultDiv.style.display = 'block';
    });
    
    resetBtn.addEventListener('click', () => {
        form.reset();
        resultDiv.style.display = 'none';
        form.style.display = 'block';
    });
}

/* ============================================
   FAQ DATA & LOGIC
   ============================================ */

const faqData = [
    { category: 'eligibility', question: 'Who is eligible to vote in an election?', answer: 'Generally, any citizen who has attained the age of 18 years on or before the qualifying date and is registered in the electoral roll is eligible to vote. You must be a citizen of the country, not disqualified under any law, and registered at a valid residential address.' },
    { category: 'eligibility', question: 'How do I register to vote?', answer: 'You can register to vote through your national or state election commission\'s website, by visiting your local election office, or through voter registration drives. You will need to fill out a registration form with your personal details and provide identity/address proof.' },
    { category: 'eligibility', question: 'Can I vote if I have moved to a new address?', answer: 'Yes, but you need to update your voter registration with your new address by submitting a change of address form to the election commission, either online or at the local election office. Do this before the registration deadline.' },
    { category: 'eligibility', question: 'Is there an upper age limit for voting?', answer: 'No, there is no upper age limit for voting. As long as a citizen is registered in the electoral roll and is not disqualified under any law, they can vote regardless of their age.' },
    { category: 'process', question: 'What happens on election day?', answer: 'On election day, registered voters go to their designated polling station, present their photo ID for verification, and cast their vote using an Electronic Voting Machine (EVM) or ballot paper in a private booth.' },
    { category: 'process', question: 'What is an Electronic Voting Machine (EVM)?', answer: 'An EVM is an electronic device for recording votes. It has a Control Unit (with the presiding officer) and a Ballot Unit (in the voting booth). Voters press a button next to their chosen candidate. EVMs are standalone, not networked.' },
    { category: 'process', question: 'What is VVPAT and how does it work?', answer: 'VVPAT (Voter Verified Paper Audit Trail) prints a paper slip showing the candidate\'s name and symbol after each vote. The slip is displayed for 7 seconds before dropping into a sealed box for physical verification.' },
    { category: 'process', question: 'Can I vote by mail or absentee ballot?', answer: 'Absentee voting is available for specific categories: armed forces, government employees on duty, voters with disabilities, and senior citizens above a certain age. Rules vary by jurisdiction.' },
    { category: 'rules', question: 'What is the Model Code of Conduct?', answer: 'The Model Code of Conduct is guidelines issued by the Election Commission governing behavior of political parties, candidates, and government during elections. It comes into effect from election announcement.' },
    { category: 'rules', question: 'Can political parties campaign near polling stations?', answer: 'No, campaigning is prohibited within 100-200 meters of polling stations. All campaigning must cease 48 hours before polling (the "silence period").' },
    { category: 'rules', question: 'What are the rules on election spending?', answer: 'Strict limits exist on candidate campaign spending. Candidates must maintain detailed expense accounts and submit them to the Election Commission. Exceeding limits can lead to disqualification.' },
    { category: 'rules', question: 'Is voting mandatory?', answer: 'In most democracies, voting is a right, not mandatory. However, some countries (Australia, Belgium, Brazil) have compulsory voting laws with penalties for not voting.' },
    { category: 'results', question: 'How are votes counted?', answer: 'On counting day, EVMs from each constituency go to counting centers. Postal ballots are counted first, then EVM results round by round. Candidates, agents, and observers are present.' },
    { category: 'results', question: 'What happens if there is a tie?', answer: 'A tie is usually decided by drawing of lots in the presence of the Returning Officer. This is the most common resolution method.' },
    { category: 'results', question: 'Can election results be challenged?', answer: 'Yes, results can be challenged by filing an election petition in the designated court (usually High Court) within a specified timeframe on grounds of corrupt practices or irregularities.' },
    { category: 'results', question: 'How is the winner determined?', answer: 'In FPTP systems, the candidate with the most votes wins — no majority required. The party/coalition with the most seats forms the government.' }
];

function initFAQ() {
    const list = document.getElementById('faqList');
    const catBtns = document.querySelectorAll('.faq-cat-btn');

    faqData.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'faq-item';
        el.setAttribute('data-category', item.category);
        el.innerHTML = `
            <div class="faq-question" id="faqQ${index}">
                <span>${item.question}</span>
                <div class="faq-toggle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-inner">${item.answer}</div>
            </div>
        `;
        el.querySelector('.faq-question').addEventListener('click', () => {
            const wasOpen = el.classList.contains('open');
            list.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
            if (!wasOpen) el.classList.add('open');
        });
        list.appendChild(el);
    });

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-category');
            list.querySelectorAll('.faq-item').forEach(item => {
                item.classList.toggle('hidden', cat !== 'all' && item.getAttribute('data-category') !== cat);
            });
        });
    });
}

/* ============================================
   GEMINI AI CHATBOT
   ============================================ */

let chatHistory = [];

function initChatbot() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSendBtn');
    const suggestions = document.getElementById('chatSuggestions');
    const clearBtn = document.getElementById('chatClearBtn');

    function sendMessage(text) {
        if (!text.trim()) return;

        appendMessage('user', escapeHtml(text));
        input.value = '';
        sendBtn.disabled = true;

        // Add to history for context
        chatHistory.push({ role: 'user', parts: [{ text: text }] });

        const typingEl = appendTyping();

        callGeminiAPI(text)
            .then(response => {
                typingEl.remove();
                appendMessage('bot', response);
                chatHistory.push({ role: 'model', parts: [{ text: response }] });
                sendBtn.disabled = false;
            })
            .catch(error => {
                typingEl.remove();
                appendMessage('bot', `<p class="message-error">⚠️ Sorry, I couldn't process that request. Please try again.</p><p class="message-error" style="font-size:12px;">${escapeHtml(error.message)}</p>`);
                sendBtn.disabled = false;
            });
    }

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !sendBtn.disabled) sendMessage(input.value);
    });

    suggestions.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => sendMessage(chip.textContent));
    });

    clearBtn.addEventListener('click', () => {
        const messages = document.getElementById('chatMessages');
        messages.innerHTML = `
            <div class="chat-message bot-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>Chat cleared! I'm ready for new questions about elections and democracy. What would you like to know?</p>
                </div>
            </div>
        `;
        chatHistory = [];
    });

    // Handle Quick Actions
    const quickActions = document.getElementById('chatQuickActions');
    if (quickActions) {
        quickActions.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => sendMessage(btn.dataset.query));
        });
    }
}

async function callGeminiAPI(userMessage) {
    const systemPrompt = `You are ElectoBot, an expert AI assistant specialized in elections, voting, and democratic processes worldwide. 

Your role:
- Answer questions about election processes, voter registration, voting methods, election rules, counting procedures, and government formation
- Cover elections in any country when asked, but default to general democratic principles
- Be educational, accurate, and easy to understand
- Use bullet points and structured formatting when helpful
- Keep responses concise but thorough (2-4 paragraphs max)
- Use relevant emojis sparingly to make responses engaging
- If asked about non-election topics, politely redirect to election-related discussion

Format your responses in clean HTML using <p>, <ul>, <li>, <strong> tags only. Do not use markdown. Do not use heading tags.`;

    const contents = [
        {
            role: 'user',
            parts: [{ text: systemPrompt + '\n\nNow answer this question: ' + userMessage }]
        }
    ];

    // Add recent chat history for context (last 6 messages)
    if (chatHistory.length > 1) {
        const recentHistory = chatHistory.slice(-6);
        contents.push(...recentHistory);
    }

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                role: 'user',
                parts: [{ text: systemPrompt + '\n\nConversation context:\n' + 
                    chatHistory.slice(-6).map(m => `${m.role}: ${m.parts[0].text}`).join('\n') +
                    '\n\nNow answer this new question: ' + userMessage
                }]
            }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || `API returned status ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
    }

    throw new Error('No response generated. Please try again.');
}

function appendMessage(type, content) {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-message ${type}-message`;

    if (type === 'user') {
        div.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content"><p>${content}</p></div>
        `;
    } else {
        div.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">${content}</div>
        `;
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
}

function appendTyping() {
    const messages = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-message bot-message typing';
    div.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ============================================
   CANDIDATE ARENA LOGIC
   ============================================ */

const candidateData = [
    {
        id: 1, name: 'Elena Rodriguez', party: 'Progressive Alliance', role: 'Former Governor',
        type: 'progressive', avatar: '👩‍💼', tag: 'Top Rated',
        vision: 'A sustainable future built on clean energy and social equity.',
        policies: ['Carbon neutrality by 2035', 'Universal healthcare expansion', 'Higher education tuition reform', 'Investment in public transit']
    },
    {
        id: 2, name: 'Marcus Sterling', party: 'Unity Party', role: 'Tech Entrepreneur',
        type: 'independent', avatar: '👨‍💻', tag: 'Innovator',
        vision: 'Leveraging technology to modernize governance and boost economy.',
        policies: ['Digital government transformation', 'Startup tax incentives', 'STEM education initiative', 'Blockchain-based voting pilot']
    },
    {
        id: 3, name: 'David Chen', party: 'Tradition First', role: 'Business Leader',
        type: 'conservative', avatar: '👨‍💼', tag: 'Experienced',
        vision: 'Strengthening the economy through fiscal responsibility and deregulation.',
        policies: ['Corporate tax reduction', 'Deregulation of energy sector', 'Border security enhancement', 'Small business grants']
    },
    {
        id: 4, name: 'Sarah Jenkins', party: 'Green Roots', role: 'Environmental Scientist',
        type: 'progressive', avatar: '👩‍🔬', tag: 'Eco-Focus',
        vision: 'Protecting our planet while creating millions of green jobs.',
        policies: ['National reforestation project', 'Ban on single-use plastics', 'Green manufacturing subsidies', 'Wildlife protection act']
    },
    {
        id: 5, name: 'Robert Vance', party: 'Liberty Union', role: 'Constitutional Lawyer',
        type: 'conservative', avatar: '👨‍⚖️', tag: 'Policy Expert',
        vision: 'Preserving individual liberties and limited government intervention.',
        policies: ['Flat tax implementation', 'Judicial reform', 'Protection of property rights', 'Federal spending caps']
    },
    {
        id: 6, name: 'Aisha Khan', party: 'Global Citizens', role: 'Human Rights Advocate',
        type: 'independent', avatar: '👩‍⚖️', tag: 'Global Vision',
        vision: 'A connected nation thriving through international cooperation.',
        policies: ['Expanded trade agreements', 'Refugee support programs', 'Global health partnerships', 'Cultural exchange initiatives']
    }
];

let selectedCandidates = new Set();

function initArena() {
    const grid = document.getElementById('arenaGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const compareBar = document.getElementById('arenaCompareBar');
    const launchBtn = document.getElementById('btnLaunchCompare');
    const modal = document.getElementById('compareModal');
    const closeBtn = document.getElementById('closeCompareModal');

    if (!grid) return;

    renderCandidates('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCandidates(btn.dataset.filter);
        });
    });

    if (launchBtn) {
        launchBtn.addEventListener('click', () => {
            const candidates = Array.from(selectedCandidates).map(id => candidateData.find(c => c.id === id));
            renderComparison(candidates);
            modal.classList.add('active');
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

    function renderCandidates(filter) {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? candidateData : candidateData.filter(c => c.type === filter);

        filtered.forEach((c, index) => {
            const card = document.createElement('div');
            card.className = `candidate-card${selectedCandidates.has(c.id) ? ' selected' : ''}`;
            card.style.animationDelay = `${index * 50}ms`;
            card.innerHTML = `
                <div class="candidate-avatar">${c.avatar}</div>
                <div class="candidate-party">${c.party}</div>
                <h3 class="candidate-name">${c.name}</h3>
                <div class="candidate-role">${c.role}</div>
                <div class="candidate-tag">${c.tag}</div>
                <button class="btn btn-secondary btn-compare" onclick="toggleCandidateSelection(${c.id}, this)">
                    ${selectedCandidates.has(c.id) ? 'Remove' : 'Select for Comparison'}
                </button>
            `;
            grid.appendChild(card);
        });
    }

    window.toggleCandidateSelection = (id, btn) => {
        const card = btn.closest('.candidate-card');
        if (selectedCandidates.has(id)) {
            selectedCandidates.delete(id);
            card.classList.remove('selected');
            btn.textContent = 'Select for Comparison';
        } else {
            if (selectedCandidates.size >= 3) {
                alert('You can compare up to 3 candidates at a time.');
                return;
            }
            selectedCandidates.add(id);
            card.classList.add('selected');
            btn.textContent = 'Remove';
        }
        updateCompareBar();
    };

    function updateCompareBar() {
        const count = selectedCandidates.size;
        const compareCountEl = document.getElementById('compareCount');
        if (compareCountEl) compareCountEl.textContent = count;
        if (compareBar) compareBar.style.display = count >= 2 ? 'flex' : 'none';
    }

    function renderComparison(candidates) {
        const table = document.getElementById('compareTable');
        if (!table) return;
        
        let html = '<tr><th>Feature</th>';
        
        candidates.forEach(c => {
            html += `
                <td class="compare-candidate-header">
                    <div class="candidate-avatar">${c.avatar}</div>
                    <h4>${c.name}</h4>
                    <span class="candidate-party">${c.party}</span>
                </td>
            `;
        });
        html += '</tr>';

        // Background
        html += `<tr><th>Background</th>${candidates.map(c => `<td>${c.role}</td>`).join('')}</tr>`;
        
        // Vision
        html += `<tr><th>Main Vision</th>${candidates.map(c => `<td>${c.vision}</td>`).join('')}</tr>`;
        
        // Key Policies
        html += `<tr><th>Key Policies</th>${candidates.map(c => `
            <td>
                <ul class="policy-list">
                    ${c.policies.map(p => `<li>${p}</li>`).join('')}
                </ul>
            </td>
        `).join('')}</tr>`;

        table.innerHTML = html;
    }
}

/* ============================================
   VOTER'S PULSE LOGIC
   ============================================ */

function initPulse() {
    const pollOptions = document.querySelectorAll('.poll-option-btn');
    const totalVotesEl = document.getElementById('totalVotes');
    
    if (!pollOptions.length) return;
    
    // Initial random state
    let votes = [420, 280, 350, 198];
    let totalVotes = votes.reduce((a, b) => a + b, 0);
    let voted = localStorage.getItem('electoguide_voted');

    updatePollVisuals();

    if (voted) {
        const votedId = parseInt(voted);
        pollOptions.forEach(btn => {
            btn.classList.add('voted');
            if (parseInt(btn.dataset.id) === votedId) btn.style.borderColor = 'var(--accent-purple)';
        });
    }

    pollOptions.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (localStorage.getItem('electoguide_voted')) return;

            votes[index]++;
            totalVotes++;
            localStorage.setItem('electoguide_voted', btn.dataset.id);
            
            pollOptions.forEach(b => b.classList.add('voted'));
            btn.style.borderColor = 'var(--accent-purple)';
            
            updatePollVisuals();
            
            // Success animation
            btn.style.transform = 'scale(0.98)';
            setTimeout(() => btn.style.transform = '', 100);
        });
    });

    function updatePollVisuals() {
        if (totalVotesEl) totalVotesEl.textContent = `Total Votes: ${totalVotes.toLocaleString()}`;
        pollOptions.forEach((btn, i) => {
            const percent = Math.round((votes[i] / totalVotes) * 100);
            btn.querySelector('.option-percent').textContent = `${percent}%`;
            btn.querySelector('.bar-fill').style.width = `${percent}%`;
            btn.querySelector('.option-bar').style.width = `${percent}%`;
        });
    }
}

/* ============================================
   LANGUAGE SUPPORT LOGIC
   ============================================ */

function initLanguage() {
    const langSelect = document.getElementById('langSelect');
    if (!langSelect) return;

    const translations = {
        en: {
            overview: "Overview", timeline: "Timeline", steps: "Steps", 
            arena: "Arena", quiz: "Quiz", checklist: "Checklist", 
            faq: "FAQ", assistant: "Ask AI"
        },
        es: {
            overview: "Visión General", timeline: "Cronograma", steps: "Pasos", 
            arena: "Arena", quiz: "Cuestionario", checklist: "Lista", 
            faq: "Preguntas", assistant: "IA"
        },
        hi: {
            overview: "सिंहावलोकन", timeline: "समयरेखा", steps: "चरण", 
            arena: "अखाड़ा", quiz: "प्रश्नोत्तरी", checklist: "चेकलिस्ट", 
            faq: "प्रश्नोत्तर", assistant: "एआई सहायक"
        }
    };

    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        const t = translations[lang];

        // Update Nav Links
        document.getElementById('navOverview').textContent = t.overview;
        document.getElementById('navTimeline').textContent = t.timeline;
        document.getElementById('navSteps').textContent = t.steps;
        document.getElementById('navArena').textContent = t.arena;
        document.getElementById('navQuiz').textContent = t.quiz;
        document.getElementById('navChecklist').textContent = t.checklist;
        document.getElementById('navFAQ').textContent = t.faq;
        document.getElementById('navAssistant').querySelector('span:last-child').textContent = t.assistant;

        // Visual feedback
        document.body.classList.add('switching-lang');
        setTimeout(() => document.body.classList.remove('switching-lang'), 300);
    });
}

/* ============================================
   FIND MY BOOTH LOGIC
   ============================================ */

function initBoothSearch() {
    const input = document.getElementById('boothSearch');
    const btn = document.getElementById('btnFindBooth');
    const results = document.getElementById('boothResults');
    const boothName = document.getElementById('boothName');
    const boothAddress = document.getElementById('boothAddress');

    if (!btn) return;

    const mockBooths = [
        { name: 'Central High School Gym', address: '123 Democracy Way, District 4' },
        { name: 'Community Center Hall B', address: '45 Liberty Avenue, North Sector' },
        { name: 'Public Library Annex', address: '89 Civic Square, West End' },
        { name: 'Elementary School Cafeteria', address: '12 Education Lane, South District' }
    ];

    btn.addEventListener('click', () => {
        const query = input.value.trim();
        if (!query) return;

        btn.disabled = true;
        btn.textContent = 'Searching...';

        // Simulate network delay
        setTimeout(() => {
            const randomBooth = mockBooths[Math.floor(Math.random() * mockBooths.length)];
            boothName.textContent = randomBooth.name;
            boothAddress.textContent = randomBooth.address;
            
            results.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Search Booth';

            // Scroll to results
            results.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 800);
    });
}
