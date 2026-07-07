/* ===================================================
   AURA INSTITUTE & TECHNOLOGY — script.js
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  setTimeout(() => loader.classList.add('hidden'), 1800);

  /* ---------- SCROLL PROGRESS BAR ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  /* ---------- STICKY NAVBAR ---------- */
  const navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }

  /* ---------- SCROLL TO TOP BUTTON ---------- */
  const scrollTopBtn = document.getElementById('scroll-top');
  function updateScrollTopBtn() {
    if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  }
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Combined scroll listener */
  window.addEventListener('scroll', () => {
    updateProgress();
    updateNavbar();
    updateScrollTopBtn();
    highlightActiveNav();
  });
  updateProgress();
  updateNavbar();
  updateScrollTopBtn();

  /* ---------- HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- ACTIVE NAV LINK HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');
  function highlightActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = sec.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  }

  /* ---------- TYPING TEXT ANIMATION ---------- */
  const typingEl = document.getElementById('typing-text');
  const typingWords = [
    'Aura Institute',
    'Python Full Stack',
    'AI & Machine Learning',
    'Cyber Security',
    'SAP & Digital Marketing'
  ];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const currentWord = typingWords[wordIndex];
    if (!isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
      }
    }
    const speed = isDeleting ? 40 : 80;
    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* ---------- COUNTER ANIMATION (Intersection Observer) ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(update);
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealTargets = document.querySelectorAll(
    '.why-card, .course-card, .placement-card, .gal-item, .faq-item, .review-card, .counter-item, .section-header'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- COURSE FILTER ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
          card.classList.remove('reveal');
          card.classList.add('visible');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- GALLERY FILTER ---------- */
  const galFilters = document.querySelectorAll('.gal-filter');
  const galItems = document.querySelectorAll('.gal-item');

  galFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      galFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-gal');

      galItems.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-gal-cat') === cat) {
          item.classList.remove('filtered-out');
        } else {
          item.classList.add('filtered-out');
        }
      });
    });
  });

  /* ---------- GALLERY LIGHTBOX ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxInner = document.getElementById('lightbox-inner');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  galItems.forEach(item => {
    item.addEventListener('click', () => {
      const placeholder = item.querySelector('.gal-placeholder');
      const icon = placeholder.querySelector('i').className;
      const label = placeholder.querySelector('span').textContent;

      lightboxInner.innerHTML = `
        <i class="${icon}"></i>
        <h3>${label}</h3>
      `;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- REVIEWS / TESTIMONIALS SLIDER ---------- */
  const slider = document.getElementById('reviews-slider');
  const slides = document.querySelectorAll('.review-slide');
  const dotsContainer = document.getElementById('slider-dots');
  const prevBtn = document.getElementById('rev-prev');
  const nextBtn = document.getElementById('rev-next');
  let currentSlide = 0;
  let autoSlideTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.slider-dot');

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 5000);
  }
  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }
  startAutoSlide();

  /* ---------- FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(f => f.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- WHATSAPP ENQUIRY FORM ---------- */
  const submitBtn = document.getElementById('submit-enquiry');
  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const course = document.getElementById('course').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !course) {
      alert('Please fill in your Name, Phone Number, and select a Course before submitting.');
      return;
    }

    const finalMessage =
`Hello Aura Institute,

Name: ${name}
Phone: ${phone}
Course: ${course}
Message: ${message || 'N/A'}

I would like to know more details about the course.`;

    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappURL = `https://wa.me/919087751113?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  });

  /* ---------- AI ASSISTANT CHATBOT (rule-based, WhatsApp fallback) ---------- */
  const WA_NUMBER = '919087751113';
  const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  const chatMessages = document.getElementById('chatbot-messages');
  const chatForm = document.getElementById('chatbot-form');
  const chatInput = document.getElementById('chatbot-input');
  const chatSuggestions = document.getElementById('chatbot-suggestions');
  const chatClear = document.getElementById('chatbot-clear');

  if (chatForm) {

    // Knowledge base: each entry has trigger keywords + a reply (HTML allowed)
    const knowledgeBase = [
      {
        keywords: ['course', 'courses', 'programs', 'program', 'what do you offer', 'offerings'],
        reply: `We offer 15+ industry-aligned courses:<br><br>
          <strong>Programming:</strong> Python Full Stack, Java Full Stack, Web Development<br>
          <strong>Data & AI:</strong> Data Analytics, AI &amp; Machine Learning<br>
          <strong>Security:</strong> Cyber Security, Ethical Hacking<br>
          <strong>SAP:</strong> FICO, MM, ABAP<br>
          <strong>Other:</strong> Tally with GST, Digital Marketing, Meta Ads, Google Ads, Video Editing<br><br>
          Want details on any specific course? Just ask, like "Tell me about Python Full Stack".`
      },
      {
        keywords: ['python'],
        reply: `<strong>Python Full Stack</strong> — 6 months, Beginner to Advanced.<br>Covers Django, REST APIs, React, PostgreSQL &amp; AWS deployment. You'll build and deploy real production-ready web apps.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['java'],
        reply: `<strong>Java Full Stack</strong> — 6 months, Beginner to Advanced.<br>Covers Spring Boot, Microservices, Angular, MySQL &amp; Docker for enterprise-grade development.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['data analytics', 'data analyst', 'power bi', 'tableau'],
        reply: `<strong>Data Analytics</strong> — 4 months, Beginner to Pro.<br>Covers Excel, SQL, Power BI, Tableau &amp; Python for business-ready data skills.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['ai', 'machine learning', 'ml', 'artificial intelligence', 'deep learning'],
        reply: `<strong>AI &amp; Machine Learning</strong> — 5 months, Intermediate level.<br>Covers Deep Learning, Neural Networks, NLP, Computer Vision, TensorFlow, PyTorch &amp; model deployment.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['cyber security', 'cybersecurity', 'security course'],
        reply: `<strong>Cyber Security</strong> — 4 months, Beginner to Pro.<br>Covers network security, threat analysis, SOC operations and prep for CEH/CISSP certifications.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['ethical hacking', 'hacking', 'penetration testing', 'ceh'],
        reply: `<strong>Ethical Hacking</strong> — 3 months, Intermediate level.<br>Covers penetration testing, vulnerability assessment, bug bounty hunting &amp; CEH certification prep using Kali Linux, Metasploit &amp; Burp Suite.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['sap fico', 'fico'],
        reply: `<strong>SAP FICO</strong> — 3 months, Beginner to Pro.<br>Financial Accounting &amp; Controlling on SAP S/4HANA — GL, AP, AR modules.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['sap mm'],
        reply: `<strong>SAP MM</strong> — 3 months, Beginner to Pro.<br>Materials Management — procurement, inventory &amp; supply chain on SAP S/4HANA.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['sap abap', 'abap'],
        reply: `<strong>SAP ABAP</strong> — 3 months, Intermediate level.<br>Covers ABAP OOP, BAPI, RFC &amp; SmartForms for custom SAP development.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['sap'],
        reply: `We offer 3 SAP modules: <strong>SAP FICO</strong> (Finance), <strong>SAP MM</strong> (Materials Management) &amp; <strong>SAP ABAP</strong> (Programming). Each is 3 months. Which one interests you?`
      },
      {
        keywords: ['tally', 'gst'],
        reply: `<strong>Tally with GST</strong> — 2 months, Beginner friendly.<br>Covers Tally Prime, GST filing, TDS &amp; payroll — perfect for accounting careers.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['web development', 'web dev', 'website', 'html css'],
        reply: `<strong>Web Development</strong> — 4 months, Beginner to Pro.<br>Covers HTML, CSS, JavaScript, React &amp; Node.js for building modern websites.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['digital marketing', 'seo', 'sem'],
        reply: `<strong>Digital Marketing</strong> — 3 months, Beginner to Pro.<br>Covers SEO, SEM, Social Media, Content &amp; Email Marketing for business growth.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['meta ads', 'facebook ads', 'instagram ads'],
        reply: `<strong>Meta Ads</strong> — 6 weeks, Beginner friendly.<br>Covers Facebook &amp; Instagram advertising, campaign optimization &amp; ROAS improvement.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['google ads', 'ppc', 'adwords'],
        reply: `<strong>Google Ads</strong> — 6 weeks, Beginner friendly.<br>Covers Search, Display, Shopping &amp; YouTube ads with certified campaign management.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['video editing', 'premiere', 'after effects'],
        reply: `<strong>Video Editing</strong> — 2 months, Beginner to Pro.<br>Covers Premiere Pro, After Effects, color grading &amp; cinematic storytelling.<br><a href="#courses">View all courses ↓</a>`
      },
      {
        keywords: ['fee', 'fees', 'cost', 'price', 'pricing', 'how much', 'charges', 'emi'],
        reply: `Our fees are competitive and affordable, with <strong>EMI payment options</strong> and <strong>merit-based scholarships</strong> available. Exact fees vary by course.<br><br>Tap below and our team will share the latest fee details for your chosen course on WhatsApp instantly.<br><a class="wa-inline-btn" href="${waLink('Hi, I would like to know the fee structure for a course at Aura Institute.')}" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Get Fee Details</a>`
      },
      {
        keywords: ['placement', 'placements', 'job', 'jobs', 'salary', 'package', 'hire', 'hiring', 'companies'],
        reply: `We provide <strong>100% placement assistance</strong> with tie-ups across 200+ companies including TCS, Infosys, Wipro, HCL, Accenture &amp; Cognizant. Our placed students earn between ₹5.5 LPA – ₹9 LPA depending on the role.<br><br>We also run mock interviews and resume workshops.<br><a href="#placements">See placement records ↓</a>`
      },
      {
        keywords: ['timing', 'timings', 'schedule', 'batch', 'batches', 'when', 'morning', 'evening', 'weekend'],
        reply: `We offer flexible <strong>morning, afternoon, evening &amp; weekend batches</strong>, available in both online and offline modes. You can pick whatever suits your schedule.`
      },
      {
        keywords: ['demo', 'free class', 'trial'],
        reply: `Yes! We offer a <strong>free demo class</strong> before you enroll — no obligation. Want me to set one up for you on WhatsApp?<br><a class="wa-inline-btn" href="${waLink('Hi, I would like to book a free demo class at Aura Institute.')}" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Book Free Demo</a>`
      },
      {
        keywords: ['certificate', 'certification', 'certified'],
        reply: `Yes, all students receive an <strong>industry-recognized certificate</strong> on course completion. For certain courses we also help you prepare for globally recognized certifications like CEH and Google Ads Certification.`
      },
      {
        keywords: ['qualification', 'eligibility', 'eligible', 'minimum', 'degree', 'who can join'],
        reply: `Most courses are open to anyone with a <strong>10+2 qualification or a degree</strong>. No prior programming experience is needed for beginner courses — we start from the basics.`
      },
      {
        keywords: ['location', 'address', 'where', 'chennai'],
        reply: `We're located at:<br><strong>3-2, Radial Nagar, Anna Nagar West Extension, Chennai, Tamil Nadu 600101, India</strong><br><br><a class="wa-inline-btn" href="https://www.google.com/maps/search/?api=1&query=3-2%2C+Radial+Nagar%2C+Anna+Nagar+West+Extension%2C+Chennai%2C+Tamil+Nadu+600101%2C+India" target="_blank" rel="noopener" style="background:linear-gradient(135deg,#8B1A1A,#C0392B);"><i class="fas fa-location-dot"></i> Open in Google Maps</a> <a href="#contact" style="display:inline-block;margin-top:6px;">See map on this page ↓</a>`
      },
      {
        keywords: ['contact', 'phone', 'number', 'whatsapp', 'call'],
        reply: `You can reach us anytime on WhatsApp at <strong>+91 90877 51113</strong>.<br><a class="wa-inline-btn" href="${waLink('Hi, I have a question about Aura Institute.')}" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>`
      },
      {
        keywords: ['hi', 'hello', 'hey', 'vanakkam'],
        reply: `Hello! 👋 Ask me about our courses, fees, placements, batch timings, or anything else about Aura Institute.`
      },
      {
        keywords: ['thank', 'thanks', 'thank you'],
        reply: `You're welcome! 😊 Anything else you'd like to know?`
      },
      {
        keywords: ['trainer', 'trainers', 'faculty', 'teacher'],
        reply: `Our trainers are <strong>industry professionals with 10+ years of real-world experience</strong> in top MNCs — not just classroom teachers.`
      },
      {
        keywords: ['duration', 'how long', 'months'],
        reply: `Course duration varies — most run <strong>2 to 6 months</strong> depending on the program. Want the duration for a specific course? Just name it.`
      }
    ];

    function findReply(userText) {
      const text = userText.toLowerCase();
      let best = null, bestScore = 0;
      knowledgeBase.forEach(entry => {
        entry.keywords.forEach(kw => {
          if (text.includes(kw) && kw.length > bestScore) {
            bestScore = kw.length;
            best = entry.reply;
          }
        });
      });
      return best;
    }

    function fallbackReply(userText) {
      return `I don't have a direct answer for that yet, but our team can help right away on WhatsApp!<br><a class="wa-inline-btn" href="${waLink('Hi, I have a question: ' + userText)}" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Ask on WhatsApp</a>`;
    }

    function appendMessage(role, html) {
      const msg = document.createElement('div');
      msg.className = `chat-msg ${role}`;
      msg.innerHTML = `
        <div class="chat-avatar"><i class="fas ${role === 'user' ? 'fa-user' : 'fa-robot'}"></i></div>
        <div class="chat-bubble">${html}</div>
      `;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return msg;
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'chat-msg bot typing';
      typing.innerHTML = `
        <div class="chat-avatar"><i class="fas fa-robot"></i></div>
        <div class="chat-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>
      `;
      chatMessages.appendChild(typing);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return typing;
    }

    function handleUserMessage(text) {
      if (!text.trim()) return;
      appendMessage('user', escapeHtml(text));
      chatInput.value = '';
      const typingEl = showTyping();
      const delay = 500 + Math.random() * 500;
      setTimeout(() => {
        typingEl.remove();
        const reply = findReply(text) || fallbackReply(text);
        appendMessage('bot', reply);
      }, delay);
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserMessage(chatInput.value);
    });

    chatSuggestions.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        handleUserMessage(chip.getAttribute('data-q'));
      });
    });

    chatClear.addEventListener('click', () => {
      chatMessages.innerHTML = '';
      appendMessage('bot', `Hi! 👋 I'm the Aura Institute assistant. Ask me about courses, fees, placements, batch timings, or anything else. How can I help you today?`);
    });
  }

});
