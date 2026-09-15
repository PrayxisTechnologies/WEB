'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '@/app/landing.css';
import { getWhatsAppEnrollUrl } from '@/lib/whatsapp';

interface CertificateRecord {
  id: string;
  studentName: string;
  college: string;
  domain: string;
  duration: string;
  completionDate: string;
  grade: string;
  mentor: string;
  projectsCompleted: string;
  hash: string;
  image?: string;
}

const certificateDatabase: Record<string, CertificateRecord> = {
  'PRX-CS-2026-0001': {
    id: 'PRX-CS-2026-0001',
    studentName: 'John Smith',
    college: 'Cyber Security Institute, India',
    domain: 'Cyber Security Professional Certification',
    duration: 'Mandatory Course & Capstone Track with Distinction',
    completionDate: '21/08/2026',
    grade: 'Distinction (Best Award ★★★★★)',
    mentor: 'Aayush Jangir (Trainer) & Yashika Kanwar (HR Manager)',
    projectsCompleted: 'Offensive Penetration Testing & Capstone Defense Infrastructure',
    hash: 'SHA256: 7f8a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
    image: '/assets/prayxis_official_certificate.png',
  },
  'PRX-2024-8849': {
    id: 'PRX-2024-8849',
    studentName: 'Aditya Sharma',
    college: 'IIT Roorkee',
    domain: 'Artificial Intelligence & Machine Learning',
    duration: '2 Months (Industrial Live Internship)',
    completionDate: 'August 24, 2024',
    grade: 'A+ (Distinction - 94.6%)',
    mentor: 'Dr. R. K. Verma',
    projectsCompleted: 'Autonomous Lane Detection & NLP Sentiment Engine',
    hash: 'SHA256: 8f9b7c2a1e4d5678bc9012fae43198de77b',
    image: '/assets/prayxis_official_certificate.png',
  },
  'PRX-2024-1022': {
    id: 'PRX-2024-1022',
    studentName: 'Priya Deshmukh',
    college: 'NIT Nagpur',
    domain: 'Full Stack Web Development (MERN Stack)',
    duration: '3 Months (Live Guided Program)',
    completionDate: 'July 15, 2024',
    grade: 'A+ (Exemplary)',
    mentor: 'Vikramaditya Rao',
    projectsCompleted: 'Real-time Collaborative Whiteboard & E-Commerce API',
    hash: 'SHA256: 4c3b2a1e8f901234de567890bc1234fae99c',
    image: '/assets/prayxis_official_certificate.png',
  },
  'PRX-2024-5514': {
    id: 'PRX-2024-5514',
    studentName: 'Rohan Mehta',
    college: 'VIT Vellore',
    domain: 'Data Science & Predictive Analytics',
    duration: '1 Month (Fast-Track Internship)',
    completionDate: 'September 02, 2024',
    grade: 'Grade A (Distinction)',
    mentor: 'Ananya Sengupta',
    projectsCompleted: 'Financial Fraud Detection & Time Series Stock Forecaster',
    hash: 'SHA256: 99a8b7c6d5e4f3210123456789abcdef1234',
    image: '/assets/prayxis_official_certificate.png',
  },
  'PRX-2024-7731': {
    id: 'PRX-2024-7731',
    studentName: 'Aman Verma',
    college: 'Delhi Technological University (DTU)',
    domain: 'Cloud Computing & DevOps (AWS & Docker)',
    duration: '45 Days (Live Project Based)',
    completionDate: 'June 28, 2024',
    grade: 'A+ (Distinction - 96.2%)',
    mentor: 'Karan Malhotra',
    projectsCompleted: 'Automated CI/CD Kubernetes Deployment Pipeline',
    hash: 'SHA256: ee43219087654321bcda9876543210fedcba',
    image: '/assets/prayxis_official_certificate.png',
  },
};

export default function HomeClient() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [certQuery, setCertQuery] = useState('');
  const [certError, setCertError] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateRecord | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll Reveal Observer for Section Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal-init');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleVerify = (idToVerify?: string) => {
    setCertError(null);
    const id = (idToVerify || certQuery).trim().toUpperCase();
    if (!id) {
      setCertError('ID not valid! Please enter a Certificate ID.');
      showToast('ID not valid! Please enter a Certificate ID.');
      return;
    }

    const cert = certificateDatabase[id];
    if (cert) {
      setSelectedCert(cert);
      setIsCertModalOpen(true);
      setCertError(null);
    } else {
      setCertError(`ID not valid! Certificate "${id}" does not exist.`);
      showToast(`ID not valid! Certificate "${id}" does not exist.`);
    }
  };

  const handleEnrollClick = (courseTitle: string, duration: string, price: number | string = 99) => {
    if (currentUser) {
      router.push('/student/courses');
    } else {
      const isPriceHidden = price === 'Hidden' || price === 'hidden';
      const priceVal = typeof price === 'number' ? price : 0;
      const priceDisplay = isPriceHidden ? 'Custom Pricing' : `₹${priceVal}`;
      const waUrl = getWhatsAppEnrollUrl({
        userId: 'VISITOR_' + Math.random().toString(36).substring(2, 6),
        userName: 'New Student',
        userEmail: 'Interested Student',
        courseTitle: `${courseTitle} (${duration})`,
        price: priceVal,
        offer: isPriceHidden ? 'Executive Specialization Access' : `Special Offer ${priceDisplay}`,
      });
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="landing-container relative overflow-hidden">
      {/* Floating Animated Bubble Particles Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#00F0FF]/20 blur-xl animate-float-bubble" />
        <div className="absolute top-2/3 right-12 w-48 h-48 rounded-full bg-[#F59E0B]/20 blur-2xl animate-float-bubble" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-10 left-1/3 w-40 h-40 rounded-full bg-[#3B82F6]/20 blur-xl animate-float-bubble" style={{ animationDelay: '5s' }} />
      </div>

      {/* Top Bar */}
      <aside className="top-bar relative z-10">
        <div className="container">
          <div className="top-bar-inner">
            <div className="top-contact-list">
              <a
                href="https://wa.me/917877716367?text=Hello%20Prayxis%20Foundation,%20I%20want%20to%20know%20more%20about%20your%20internships."
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366', fontWeight: 700 }}
              >
                WhatsApp: +91 78777 16367
              </a>
              <a href="mailto:info@prayxis.in" style={{ color: 'var(--text-muted)' }}>
                info@prayxis.in
              </a>
            </div>
            <div>
              <span style={{ color: 'var(--gold-bright)', fontSize: '12px', fontWeight: 700 }}>
                ⚡ Admissions Open — Special Student Offer Active
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Navigation */}
      <header className="site-header relative z-10">
        <div className="container">
          <div className="nav-inner">
            <Link href="/" className="brand" title="Prayxis Home">
              <div className="brand-logo-wrap">
                <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="brand-logo-img" />
              </div>
              <div className="brand-titles">
                <div className="brand-name">
                  PRAY<span>XIS</span>
                </div>
                <div className="brand-caption">Foundation</div>
              </div>
            </Link>

            <nav className="nav-menu">
              <Link href="/courses" className="nav-link">Internships</Link>
              <a href="#about-us" className="nav-link">About Us</a>
              <a href="#why-join" className="nav-link">Why Join</a>
              <a href="#who-can-join" className="nav-link">Who Can Join</a>
              <a href="#verify" className="nav-link">Verify Certificate</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>

            <div className="nav-actions">
              <a href="#verify" className="btn btn-sm btn-outline-gold">
                Verify Certificate
              </a>
              <Link href="/login" className="btn btn-sm btn-outline-gold">
                Login
              </Link>
              <Link href="/register" className="btn btn-sm btn-primary" style={{ fontWeight: 800 }}>
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="hero-ybi-container">
          <div className="hero-bg-slider">
            <div className="hero-slide slide-1" style={{ backgroundImage: "url('/assets/hero_students.jpg')" }} />
            <div className="hero-slide slide-2" style={{ backgroundImage: "url('/assets/course_ai.jpg')" }} />
            <div className="hero-slide slide-3" style={{ backgroundImage: "url('/assets/course_analytics.jpg')" }} />
          </div>
          <div className="hero-bg-overlay" />

          <div className="container">
            <div className="hero-ybi-content">
              <div className="hero-top-badge">
                <span>🌟 Practical &amp; Project-Based Virtual Internship Platform</span>
              </div>

              <h1 className="hero-ybi-title">Industrial Software Engineering &amp; Cybersecurity Internships</h1>
              <div className="hero-ybi-underline" />

              <p className="hero-clean-lead">
                Practical, project-based live technical training for engineering students and tech aspirants across India. Learn directly from industry mentors and build production-grade software capstones in Full Stack, Ethical Hacking, Python, and AI.
              </p>

              <div className="hero-clean-meta">
                <span className="meta-item">⚡ Trained 2,00,000+ Interns</span>
                <span className="meta-item">🚀 Beginner to Advanced Tracks</span>
                <span className="meta-item">🎓 Verifiable Digital Certificate</span>
              </div>

              <div className="hero-cta-suite">
                <Link href="/register" className="hero-btn-primary">
                  <span>Get Started →</span>
                </Link>

                <div className="hero-live-row">
                  <Link href="/courses" className="hero-btn-secondary">Explore Programs</Link>
                  <a href="#verify" className="hero-btn-secondary">Verify Credential</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 PASTEL PILL STAT CARDS */}
        <section className="impact-pills-section">
          <div className="container">
            <div className="impact-pills-grid">
              <div className="pill-stat-card pill-pink reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.05s' }}>
                <div className="pill-number">300K+</div>
                <div className="pill-label">Career Growth</div>
              </div>

              <div className="pill-stat-card pill-yellow reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.15s' }}>
                <div className="pill-number">210K+</div>
                <div className="pill-label">Paid Learners</div>
              </div>

              <div className="pill-stat-card pill-green reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.25s' }}>
                <div className="pill-number">95%</div>
                <div className="pill-label">Career Growth</div>
              </div>

              <div className="pill-stat-card pill-blue reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.35s' }}>
                <div className="pill-number">4.9 / 5.0</div>
                <div className="pill-label">Course Rating</div>
              </div>
            </div>

            <div className="unlock-career-block reveal-init reveal-swipe-up">
              <h2 className="unlock-career-title">
                Unlock <span className="text-blue">Successful</span> Career For You with<br />
                Best <span className="text-red">Live</span> Training and Top MNC&apos;s <span className="text-blue">Projects</span> in <span className="text-red">Internships</span>!
              </h2>
              <div className="star-divider-bar">
                <span className="star-icon">☆</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT PRAYXIS FOUNDATION */}
        <section className="about-overview-section" id="about-us">
          <div className="container">
            <div className="about-overview-header reveal-init reveal-swipe-up">
              <div className="about-kicker-tag">Prayxis Foundation • Institutional Profile</div>
              <h2 className="about-overview-title">
                Empowering India&apos;s Next Generation with <span style={{ color: 'var(--gold-bright)' }}>Industry-Grade</span> Engineering
              </h2>
              <p className="about-overview-lead">
                Prayxis Foundation is a dedicated technical learning platform focused on industrial software training for engineering students and tech aspirants across India. We bridge the critical divide between university syllabi and modern software engineering through hands-on, production capstones with verifiable digital credentials.
              </p>
            </div>

            <div className="about-ledger-grid">
              <div className="about-ledger-card reveal-init reveal-swipe-left" style={{ transitionDelay: '0.1s' }}>
                <div className="ledger-num">01 / TECHNICAL METHODOLOGY</div>
                <h3 className="ledger-title">Hands-on Engineering</h3>
                <p className="ledger-desc">
                  Real-world production projects &amp; full stack capstone modules.
                </p>
              </div>

              <div className="about-ledger-card reveal-init reveal-swipe-right" style={{ transitionDelay: '0.2s' }}>
                <div className="ledger-num">02 / MENTOR GUIDANCE</div>
                <h3 className="ledger-title">1:1 Expert Support</h3>
                <p className="ledger-desc">
                  Structured daily learning &amp; code reviews from senior engineering mentors.
                </p>
              </div>

              <div className="about-ledger-card reveal-init reveal-swipe-left" style={{ transitionDelay: '0.3s' }}>
                <div className="ledger-num">03 / ACADEMIC REACH</div>
                <h3 className="ledger-title">2,00,000+ Students Impacted</h3>
                <p className="ledger-desc">
                  Engineers trained across 500+ university campuses and technical institutes pan-India.
                </p>
              </div>

              <div className="about-ledger-card reveal-init reveal-swipe-right" style={{ transitionDelay: '0.4s' }}>
                <div className="ledger-num">04 / CREDENTIAL ECOSYSTEM</div>
                <h3 className="ledger-title">Cryptographically Verifiable</h3>
                <p className="ledger-desc">
                  Tamper-proof digital certificates authenticated via unique serial keys and direct online verification.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY JOIN PRAYXIS */}
        <section className="why-join-section" id="why-join">
          <div className="container">
            <div className="why-join-header reveal-init reveal-swipe-up">
              <h2 className="why-join-title">Why Join Prayxis Foundation Internships?</h2>
              <div className="why-join-underline" />
              <p className="why-join-subtitle">
                Designed specifically for B.Tech, BCA, MCA, and Diploma students to gain production software experience.
              </p>
            </div>

            <div className="why-feature-grid">
              <div className="why-feature-card reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.05s' }}>
                <div className="why-icon-box">💻</div>
                <h3 className="why-card-title">Production Capstone Projects</h3>
                <p className="why-card-desc">
                  Build full-stack React, Node.js, and Python systems deployed on live cloud platforms instead of static demo apps.
                </p>
              </div>

              <div className="why-feature-card reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.15s' }}>
                <div className="why-icon-box">🛡️</div>
                <h3 className="why-card-title">Cyber Security &amp; Pentesting Labs</h3>
                <p className="why-card-desc">
                  Hands-on security testing with Nmap, Wireshark, web application vulnerabilities, and ethical hacking workflows.
                </p>
              </div>

              <div className="why-feature-card reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.25s' }}>
                <div className="why-icon-box">🎓</div>
                <h3 className="why-card-title">Verifiable Digital Certificate</h3>
                <p className="why-card-desc">
                  Receive authenticated digital credentials with unique verification IDs valid for college submissions and LinkedIn profiles.
                </p>
              </div>

              <div className="why-feature-card reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.35s' }}>
                <div className="why-icon-box">👨‍🏫</div>
                <h3 className="why-card-title">1:1 Mentor Guidance</h3>
                <p className="why-card-desc">
                  Direct WhatsApp mentor assistance, daily code reviews, and structured step-by-step resolution of technical bugs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO CAN JOIN SECTION */}
        <section className="who-can-join-section" id="who-can-join">
          <div className="container">
            <div className="who-card-container">
              <div className="who-grid">
                <div className="who-text-content">
                  <div className="who-badge">GRADUATES &amp; UNDERGRADUATES</div>
                  <h2 className="who-title">Who Can Join Prayxis Internships?</h2>
                  <div className="who-underline" />
                  <p className="who-lead-desc">
                    Our programs are crafted for any student or aspiring developer eager to build practical software engineering skills from zero to advanced level.
                  </p>

                  <div className="who-checklist">
                    <div className="who-check-item">
                      <span className="who-check-bullet">✔</span>
                      <span>Engineering Students (B.Tech / M.Tech - CS, IT, ECE, EE, Civil, Mech)</span>
                    </div>
                    <div className="who-check-item">
                      <span className="who-check-bullet">✔</span>
                      <span>Computer Application Students (BCA / MCA / Diploma)</span>
                    </div>
                    <div className="who-check-item">
                      <span className="who-check-bullet">✔</span>
                      <span>Beginners with zero prior coding experience</span>
                    </div>
                    <div className="who-check-item">
                      <span className="who-check-bullet">✔</span>
                      <span>Aspirants seeking industry capstone projects for resumes</span>
                    </div>
                  </div>

                  <div className="who-action-wrap">
                    <Link href="/register" className="btn btn-primary">
                      Register Now &amp; Select Domain →
                    </Link>
                  </div>
                </div>

                <div className="who-visual-content">
                  <img
                    src="/assets/who_can_join_visual.png"
                    alt="Who Can Join Prayxis Internship"
                    className="who-students-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE TOP INTERNSHIPS */}
        <section className="explore-section" id="internships">
          <div className="container">
            <div className="explore-main-heading">
              <h2 className="explore-title">🚀 Explore Top Internships in 2026</h2>
              <div className="explore-divider-bar" />
              <div style={{ marginTop: '10px' }}>
                <Link href="/courses" style={{ color: 'var(--gold-bright)', fontSize: '14px', fontWeight: 700, textDecoration: 'underline' }}>
                  Browse Full Academy Course Catalog &amp; Internships →
                </Link>
              </div>
            </div>

            {/* Infinite Running Domains Marquee Filter */}
            <div className="domains-marquee-container">
              <div className="domains-marquee-track">
                {[...Array(2)].map((_, groupIndex) => (
                  <div className="domains-marquee-group" key={groupIndex} aria-hidden={groupIndex === 1}>
                    <button
                      className={`domain-tag-btn ${activeFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('all')}
                    >
                      <span className="tag-sparkle">✦</span>
                      <span className="tag-label">All Internships</span>
                    </button>
                    <button
                      className={`domain-tag-btn ${activeFilter === 'web' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('web')}
                    >
                      <span className="tag-icon">💻</span>
                      <span className="tag-label">Full Stack Web Development</span>
                    </button>
                    <button
                      className={`domain-tag-btn ${activeFilter === 'cyber' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('cyber')}
                    >
                      <span className="tag-icon">🛡️</span>
                      <span className="tag-label">Basic Ethical Hacking</span>
                    </button>
                    <button
                      className={`domain-tag-btn ${activeFilter === 'python' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('python')}
                    >
                      <span className="tag-icon">🐍</span>
                      <span className="tag-label">Python Basics &amp; DSA</span>
                    </button>
                    <button
                      className={`domain-tag-btn ${activeFilter === 'ai' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('ai')}
                    >
                      <span className="tag-icon">🤖</span>
                      <span className="tag-label">AI &amp; Generative AI</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 15 Days Internship */}
            <div className="category-heading-block">
              <h3 className="category-title">
                🎓 15 Days Internship <span className="badge-red">[Project Based]</span>
              </h3>
              <div className="category-underline" />
            </div>

            <div className="internship-cards-grid">
              {/* Full Stack Web */}
              {(activeFilter === 'all' || activeFilter === 'web') && (
                <div className="internship-card reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.05s' }}>
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "url('/assets/course_analytics.jpg')" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 15 Days</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹49 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹999</span></div>
                        <div className="poster-main-title">FULL STACK WEB DEVELOPMENT</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Beginner Friendly</span>
                          <div className="poster-checklist">
                            <div>● Live Training Sessions</div>
                            <div>● 1:1 Mentor Guidance</div>
                            <div>● Internship Project</div>
                            <div>● Completion Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹49 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                          <span>info@prayxis.in</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-green">
                    <h4 className="internship-card-title">
                      <Link href="/courses/full-stack" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Full Stack Web Development (Frontend &amp; React)
                      </Link>
                    </h4>
                    <div style={{ marginBottom: '10px', fontSize: '12px' }}>
                      <Link href="/courses/full-stack" style={{ color: '#00F0FF', textDecoration: 'underline', fontWeight: 600 }}>
                        View Full Stack Syllabus &amp; Overview →
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Full Stack Web Development', '15 Days', 49)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹49)
                    </button>
                  </div>
                </div>
              )}

              {/* Basic Ethical Hacking */}
              {(activeFilter === 'all' || activeFilter === 'cyber') && (
                <div className="internship-card reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.15s' }}>
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "radial-gradient(circle at center, #2e1019 0%, #0d0f15 90%)" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 15 Days</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹49 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹999</span></div>
                        <div className="poster-main-title">BASIC ETHICAL HACKING</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Beginner Friendly</span>
                          <div className="poster-checklist">
                            <div>● Live Cyber Security Lab</div>
                            <div>● 1:1 Mentor Guidance</div>
                            <div>● Penetration Capstone</div>
                            <div>● Completion Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹49 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                          <span>info@prayxis.in</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-orange">
                    <h4 className="internship-card-title">Basic Ethical Hacking &amp; Cyber Defense</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Basic Ethical Hacking', '15 Days', 49)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹49)
                    </button>
                  </div>
                </div>
              )}

              {/* Python Basics */}
              {(activeFilter === 'all' || activeFilter === 'python') && (
                <div className="internship-card reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.25s' }}>
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "radial-gradient(circle at center, #1e294b 0%, #0a0c14 90%)" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 15 Days</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹49 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹999</span></div>
                        <div className="poster-main-title">PYTHON BASICS: ZERO SE</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Beginner Friendly</span>
                          <div className="poster-checklist">
                            <div>● Interactive Python IDE</div>
                            <div>● 1:1 Mentor Guidance</div>
                            <div>● 30-Day Day Modules</div>
                            <div>● Completion Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹49 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                          <span>info@prayxis.in</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-blue">
                    <h4 className="internship-card-title">Python Basics (Zero Se Interactive Track)</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Python Basics', '15 Days', 49)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹49)
                    </button>
                  </div>
                </div>
              )}

              {/* AI & GenAI */}
              {(activeFilter === 'all' || activeFilter === 'ai') && (
                <div className="internship-card reveal-init reveal-bubble-pop" style={{ transitionDelay: '0.35s' }}>
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "url('/assets/course_ai.jpg')" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 15 Days</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹49 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹999</span></div>
                        <div className="poster-main-title">AI &amp; GENERATIVE AI</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Beginner Friendly</span>
                          <div className="poster-checklist">
                            <div>● Prompt Engineering</div>
                            <div>● 1:1 Mentor Guidance</div>
                            <div>● LLM Agent Capstone</div>
                            <div>● Completion Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹49 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                          <span>info@prayxis.in</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-pink">
                    <h4 className="internship-card-title">Artificial Intelligence &amp; Generative AI</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Artificial Intelligence and Generative AI', '15 Days', 49)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹49)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 45 Days Master Internship */}
            <div className="category-heading-block">
              <h3 className="category-title">
                🎓 45 Days Master Internship <span className="badge-red">[Production Project Based]</span>
              </h3>
              <div className="category-underline" />
            </div>

            <div className="internship-cards-grid">
              {/* Card 1 */}
              {(activeFilter === 'all' || activeFilter === 'web') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "url('/assets/course_analytics.jpg')" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 45 Days</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹99 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹999</span></div>
                        <div className="poster-main-title">FULL STACK REACT &amp; NODE.JS</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Comprehensive</span>
                          <div className="poster-checklist">
                            <div>● Production Cloud Deploy</div>
                            <div>● Full Backend Architecture</div>
                            <div>● Real-Time Systems</div>
                            <div>● Verifiable Digital Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹99 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-green">
                    <h4 className="internship-card-title">
                      <Link href="/courses/full-stack" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Full Stack Web Development (React &amp; Node.js API)
                      </Link>
                    </h4>
                    <div style={{ marginBottom: '10px', fontSize: '12px' }}>
                      <Link href="/courses/full-stack" style={{ color: '#00F0FF', textDecoration: 'underline', fontWeight: 600 }}>
                        View Full Stack Syllabus &amp; Overview →
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Full Stack Web Development (React & Node.js API)', '45 Days', 99)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹99)
                    </button>
                  </div>
                </div>
              )}

              {/* Card 2 */}
              {(activeFilter === 'all' || activeFilter === 'cyber') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "radial-gradient(circle at center, #2e1019 0%, #0d0f15 90%)" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 45 Days</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹99 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹999</span></div>
                        <div className="poster-main-title">ETHICAL HACKING &amp; PEN TESTING</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Comprehensive</span>
                          <div className="poster-checklist">
                            <div>● SOC Analysis</div>
                            <div>● Bug Bounty Workflows</div>
                            <div>● Network Security</div>
                            <div>● Verifiable Digital Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹99 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-orange">
                    <h4 className="internship-card-title">Ethical Hacking &amp; Penetration Testing</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Ethical Hacking & Penetration Testing', '45 Days', 99)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹99)
                    </button>
                  </div>
                </div>
              )}

              {/* Card 3 */}
              {(activeFilter === 'all' || activeFilter === 'python') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "radial-gradient(circle at center, #1e294b 0%, #0a0c14 90%)" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 45 Days</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹99 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹999</span></div>
                        <div className="poster-main-title">PYTHON FULL STACK &amp; FASTAPI</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Comprehensive</span>
                          <div className="poster-checklist">
                            <div>● Microservices API</div>
                            <div>● Database Optimization</div>
                            <div>● Live Projects</div>
                            <div>● Verifiable Digital Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹99 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-blue">
                    <h4 className="internship-card-title">Python Full Stack &amp; FastAPI Microservices</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Python Full Stack & FastAPI', '45 Days', 99)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹99)
                    </button>
                  </div>
                </div>
              )}

              {/* Card 4 */}
              {(activeFilter === 'all' || activeFilter === 'ai') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "url('/assets/course_ai.jpg')" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 45 Days</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹99 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹999</span></div>
                        <div className="poster-main-title">DEEP LEARNING &amp; LLMS</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Comprehensive</span>
                          <div className="poster-checklist">
                            <div>● Neural Networks</div>
                            <div>● RAG Systems</div>
                            <div>● Production LLMs</div>
                            <div>● Verifiable Digital Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹99 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-pink">
                    <h4 className="internship-card-title">Artificial Intelligence &amp; Deep Learning Master Track</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('AI & Deep Learning Master Track', '45 Days', 99)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹99)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3 Months Advanced Internship */}
            <div className="category-heading-block" style={{ marginTop: '3rem' }}>
              <h3 className="category-title">
                🎓 3 Months Advanced Internship <span className="badge-red">[Industry Capstone Based]</span>
              </h3>
              <div className="category-underline" />
            </div>

            <div className="internship-cards-grid">
              {/* Card 1: Full Stack Enterprise */}
              {(activeFilter === 'all' || activeFilter === 'web') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "url('/assets/course_analytics.jpg')" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 3 Months</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹149 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹1,999</span></div>
                        <div className="poster-main-title">FULL STACK ENTERPRISE ARCHITECTURE</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Advanced Level</span>
                          <div className="poster-checklist">
                            <div>● Microservices &amp; Next.js 14</div>
                            <div>● AWS &amp; Docker Deployment</div>
                            <div>● Industry Capstone Project</div>
                            <div>● Senior Digital Credentials</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹149 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-green">
                    <h4 className="internship-card-title">Full Stack Enterprise Architecture</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Full Stack Enterprise Architecture', '3 Months', 149)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹149)
                    </button>
                  </div>
                </div>
              )}

              {/* Card 2: Cyber Security SOC */}
              {(activeFilter === 'all' || activeFilter === 'cyber') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "radial-gradient(circle at center, #2e1019 0%, #0d0f15 90%)" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 3 Months</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹149 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹1,999</span></div>
                        <div className="poster-main-title">ADVANCED CYBERSECURITY &amp; SOC OPS</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Advanced Level</span>
                          <div className="poster-checklist">
                            <div>● SIEM Splunk &amp; ELK Monitoring</div>
                            <div>● Threat Hunting &amp; Forensics</div>
                            <div>● Enterprise Cyber Defense</div>
                            <div>● Senior Digital Credentials</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹149 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-orange">
                    <h4 className="internship-card-title">Advanced Cybersecurity &amp; SOC Operations</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Advanced Cybersecurity & SOC Operations', '3 Months', 149)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹149)
                    </button>
                  </div>
                </div>
              )}

              {/* Card 3: AI & Autonomous Agents */}
              {(activeFilter === 'all' || activeFilter === 'ai') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "url('/assets/course_ai.jpg')" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 3 Months</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Ganesh Chaturthi Offer: ₹149 <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>₹1,999</span></div>
                        <div className="poster-main-title">AI &amp; AUTONOMOUS LLM AGENTS</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Advanced Level</span>
                          <div className="poster-checklist">
                            <div>● LangChain &amp; Multi-Agents</div>
                            <div>● Custom LLM Fine-Tuning</div>
                            <div>● Autonomous AI Workforce</div>
                            <div>● Senior Digital Credentials</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">SPECIAL OFFER ₹149 ONLY</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-pink">
                    <h4 className="internship-card-title">AI &amp; Autonomous LLM Agents</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('AI & Autonomous LLM Agents', '3 Months', 149)}
                      className="btn-enroll-blue"
                    >
                      🚀 Enroll Now (₹149)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6 Months Executive Internship */}
            <div className="category-heading-block" style={{ marginTop: '3rem' }}>
              <h3 className="category-title">
                🎓 6 Months Executive Internship <span className="badge-red">[Industry Specialization]</span>
              </h3>
              <div className="category-underline" />
            </div>

            <div className="internship-cards-grid">
              {/* Card 1: Cloud & DevOps */}
              {(activeFilter === 'all' || activeFilter === 'web') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "url('/assets/course_analytics.jpg')" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 6 Months</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Specialization Track: Price Hidden</div>
                        <div className="poster-main-title">EXECUTIVE CLOUD &amp; DEVOPS ARCHITECTURE</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Executive Track</span>
                          <div className="poster-checklist">
                            <div>● Multi-Cloud &amp; Kubernetes</div>
                            <div>● Terraform &amp; GitOps CI/CD</div>
                            <div>● 1:1 Senior Industry Mentorship</div>
                            <div>● Guaranteed Placement Support</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">PRICE UPON APPLICATION</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-blue">
                    <h4 className="internship-card-title">Executive Cloud &amp; DevOps Architecture</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Executive Cloud & DevOps Architecture', '6 Months', 'Hidden')}
                      className="btn-enroll-blue"
                    >
                      🚀 Request Access / Enroll
                    </button>
                  </div>
                </div>
              )}

              {/* Card 2: Executive LLMOps */}
              {(activeFilter === 'all' || activeFilter === 'ai') && (
                <div className="internship-card">
                  <div className="internship-poster poster-with-bg" style={{ backgroundImage: "url('/assets/course_ai.jpg')" }}>
                    <div className="poster-content-layer">
                      <div className="poster-top-bar">
                        <div className="poster-brand">
                          <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="poster-logo-img" />
                          <span className="poster-brand-text">PRAYXIS FOUNDATION</span>
                        </div>
                        <span className="poster-duration-badge">⏳ 6 Months</span>
                      </div>
                      <div>
                        <div className="poster-badge-free">Specialization Track: Price Hidden</div>
                        <div className="poster-main-title">EXECUTIVE LLMOPS &amp; AI ENGINEERING</div>
                        <div className="poster-details-row">
                          <span className="poster-badge-friendly">✔ Executive Track</span>
                          <div className="poster-checklist">
                            <div>● Distributed Model Training</div>
                            <div>● Model Distillation &amp; Governance</div>
                            <div>● Industrial Research Capstone</div>
                            <div>● Guaranteed Placement Support</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="poster-cta-btn">PRICE UPON APPLICATION</div>
                        <div className="poster-footer-strip">
                          <span>www.prayxis.com</span>
                          <span>(+91) 78777 16367</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="internship-card-body tint-pink">
                    <h4 className="internship-card-title">Executive LLMOps &amp; AI Engineering</h4>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick('Executive LLMOps & AI Engineering', '6 Months', 'Hidden')}
                      className="btn-enroll-blue"
                    >
                      🚀 Request Access / Enroll
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ANYTIME, ANYWHERE CLOUD HUB BANNER */}
        <section className="anytime-banner-section">
          <div className="container">
            <div className="anytime-card">
              <div className="anytime-left">
                <div className="anytime-kicker">Learn. Practice. Upskill.</div>
                <h2 className="anytime-title">
                  ANYTIME,<br />ANYWHERE!
                </h2>
                <div className="anytime-underline" />
                <p className="anytime-desc">
                  Your career companion is now at your fingertips. Access the <strong>PRAYXIS Foundation</strong> learning platform, live interactive coding IDE, and start your journey towards a high-growth tech career.
                </p>
              </div>

              <div className="anytime-center">
                <div className="platform-hub-box">
                  <div className="hub-top-header">
                    <div className="hub-title-tag">
                      <span className="live-pulse-dot" />
                      <span>PRAYXIS CLOUD HUB</span>
                    </div>
                    <span style={{ fontSize: '10.5px', color: 'var(--gold-bright)', fontWeight: 700 }}>
                      STUDENT ACTIVE
                    </span>
                  </div>

                  <div className="hub-item-row">
                    <div>
                      <div className="hub-item-info">Python Basics: Zero Se</div>
                      <div className="hub-item-sub">Day 01 Interactive Playground</div>
                    </div>
                    <span className="hub-item-status">IN PROGRESS</span>
                  </div>

                  <div className="hub-item-row">
                    <div>
                      <div className="hub-item-info">Full Stack Web Capstone</div>
                      <div className="hub-item-sub">MongoDB Atlas Synchronized</div>
                    </div>
                    <span className="hub-item-status">SUBMITTED</span>
                  </div>

                  <div className="hub-item-row">
                    <div>
                      <div className="hub-item-info">Credential Verification</div>
                      <div className="hub-item-sub">ID: PRX-CS-2026-0001</div>
                    </div>
                    <span className="hub-item-status">AUTHENTICATED</span>
                  </div>
                </div>
              </div>

              <div className="anytime-right">
                <div className="app-box-heading">
                  Access the <strong><span>PRAYXIS FOUNDATION</span> PORTAL</strong> and unlock endless opportunities.
                </div>

                <div className="anytime-badges-card">
                  <div>
                    <div className="badge-item-icon">★</div>
                    <div className="badge-item-label">Expert Mentors</div>
                  </div>
                  <div>
                    <div className="badge-item-icon">📍</div>
                    <div className="badge-item-label">Placement Support</div>
                  </div>
                  <div>
                    <div className="badge-item-icon">🛡️</div>
                    <div className="badge-item-label">Industry Recognized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATE VERIFICATION SECTION */}
        <section className="certificate-section" id="verify">
          <div className="container">
            <div className="cert-section-header">
              <h2 className="cert-header-title">
                <span>⛳</span> Download Your <span style={{ color: '#ef4444' }}>Internship Certificate</span> after Completion
              </h2>
              <div className="cert-header-underline" />
            </div>

            <div className="cert-grid">
              {/* Left: Certificate Preview */}
              <div
                className="cert-preview-frame"
                onClick={() => handleVerify()}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  background: '#0b0e17',
                  border: '2px solid var(--gold-border)',
                }}
              >
                <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10 }}>
                  <span
                    style={{
                      background: 'rgba(11, 14, 23, 0.9)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid var(--gold-bright)',
                      color: 'var(--gold-bright)',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    PREVIEW ONLY
                  </span>
                </div>

                <img
                  src="/assets/prayxis_official_certificate.png"
                  alt="Prayxis Verifiable Digital Certificate Preview"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />

                <div
                  style={{
                    background: '#080a11',
                    borderTop: '1px solid rgba(245,158,11,0.25)',
                    padding: '12px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>
                    Credential ID: <strong style={{ color: 'var(--gold-bright)' }}>{certQuery || 'Enter ID to Verify'}</strong>
                  </span>
                  <span style={{ color: '#25D366', fontWeight: 700 }}>
                    ● Digitally Verified
                  </span>
                </div>
              </div>

              {/* Right: Benefits & Instant Search */}
              <div className="cert-benefits-box">
                <h3 className="cert-benefits-title">
                  <span>🏆</span> Official Prayxis Credential
                </h3>

                <ul className="cert-benefits-list">
                  <li className="cert-benefit-item">
                    <span className="cert-benefit-check">✔</span>
                    <span>Digitally Verifiable with QR Code &amp; Unique ID</span>
                  </li>
                  <li className="cert-benefit-item">
                    <span className="cert-benefit-check">✔</span>
                    <span>Industry Standardized Technical Curriculum</span>
                  </li>
                  <li className="cert-benefit-item">
                    <span className="cert-benefit-check">✔</span>
                    <span>Accepted for College Credits &amp; Degree Submissions</span>
                  </li>
                  <li className="cert-benefit-item">
                    <span className="cert-benefit-check">✔</span>
                    <span>Directly Importable to LinkedIn Certifications &amp; Resumes</span>
                  </li>
                </ul>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '18px', marginTop: '8px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#cbd5e1', marginBottom: '6px' }}>
                    Instant Credential Check:
                  </h4>
                  <div className="verify-input-group">
                    <input
                      type="text"
                      className="verify-input"
                      value={certQuery}
                      onChange={(e) => {
                        setCertQuery(e.target.value);
                        setCertError(null);
                      }}
                      placeholder="Enter Certificate ID"
                      onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                    />
                    <button type="button" className="btn btn-primary" onClick={() => handleVerify()}>
                      Verify ID
                    </button>
                  </div>

                  {certError && (
                    <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 800, marginTop: '8px', display: 'flex', items: 'center', gap: '6px' }}>
                      <span>⚠️</span> {certError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer" id="contact">
        <div className="footer-pre-banner">
          <div className="container">
            <div className="footer-pre-inner">
              <div className="footer-pre-text">
                <h3>Ready to Build <span>Real Industry Projects</span>?</h3>
                <p>Join over 2,00,000+ engineering students upskilling with hands-on live internships.</p>
              </div>
              <div className="footer-pre-actions">
                <Link href="/courses" className="btn btn-primary">
                  Explore All Programs →
                </Link>
                <a
                  href="https://wa.me/917877716367?text=Hello%20Prayxis%20Foundation,%20I%20want%20to%20know%20more%20about%20your%20internships."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-footer-wa"
                  title="Chat on WhatsApp"
                >
                  <svg style={{ width: '22px', height: '22px', fill: 'currentColor' }} viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.115-.515-1.745-.72-2.85-2.493-2.937-2.608-.087-.116-.708-.941-.708-1.793s.448-1.272.607-1.446c.159-.175.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.453.748.972 1.21.668.594 1.232.778 1.406.864.174.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824zm-3.423-10.416c-5.523 0-10 4.477-10 10 0 1.767.459 3.427 1.261 4.877l-1.261 4.607 4.747-1.245c1.401.765 3.007 1.199 4.713 1.199 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Band */}
        <div className="container">
          <div className="footer-trust-band">
            <div className="trust-band-item">
              <span className="icon">
                <svg className="trust-icon-svg" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>
              </span>
              <span><strong>Practical</strong> Project Learning</span>
            </div>
            <div className="trust-band-item">
              <span className="icon">
                <svg className="trust-icon-svg" viewBox="0 0 24 24"><path d="M12 1L2 6v2h20V6L12 1zm-7 9v8h2v-8H5zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zm5 0v8h2v-8h-2zM2 20v2h20v-2H2z" /></svg>
              </span>
              <span><strong>1:1 Mentorship</strong> Support</span>
            </div>
            <div className="trust-band-item">
              <span className="icon">
                <svg className="trust-icon-svg" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" /></svg>
              </span>
              <span><strong>Verifiable</strong> QR / Hash Certificate</span>
            </div>
            <div className="trust-band-item">
              <span className="icon">
                <svg className="trust-icon-svg" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              </span>
              <span><strong>Direct WhatsApp:</strong> (+91) 78777 16367</span>
            </div>
          </div>
        </div>

        {/* 4 Column Footer */}
        <div className="container">
          <div className="footer-grid">
            {/* Col 1 */}
            <div>
              <Link href="/" className="brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div className="brand-logo-wrap" style={{ width: '40px', height: '40px' }}>
                  <img src="/assets/prayxis_logo.png?v=official" alt="Prayxis Technologies Official Logo" className="brand-logo-img" />
                </div>
                <div className="brand-titles">
                  <div className="brand-name" style={{ fontSize: '20px' }}>PRAY<span>XIS</span></div>
                  <div className="brand-caption">Foundation</div>
                </div>
              </Link>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '8px' }}>
                National industrial skill-development platform bridging the university curriculum with production-grade engineering, live cloud deployment, and accredited industry credentials.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                <span className="footer-social-btn">Project Based</span>
                <span className="footer-social-btn">1:1 Mentorship</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <div className="footer-col-title">Internship Tracks</div>
              <ul className="footer-links">
                <li><Link href="/courses">Full Stack Web (MERN)</Link></li>
                <li><Link href="/courses">Basic Ethical Hacking</Link></li>
                <li><Link href="/courses">Python Basics &amp; DSA</Link></li>
                <li><Link href="/courses">AI &amp; Generative AI</Link></li>
                <li><Link href="/courses">System Architecture</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="footer-col-title">Quick Links</div>
              <ul className="footer-links">
                <li><Link href="/courses">Explore Internships</Link></li>
                <li><a href="#about-us">About Prayxis</a></li>
                <li><a href="#why-join">Why Choose Prayxis</a></li>
                <li><a href="#who-can-join">Who Can Join</a></li>
                <li><a href="#verify">Verify Certificate</a></li>
                <li><Link href="/login">Student Login</Link></li>
                <li><Link href="/admin/login">Admin Console</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <div className="footer-col-title">Admissions &amp; Support</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <div><strong>National Headquarters</strong></div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Jaipur, Rajasthan, India - 302012</div>

                <div style={{ marginTop: '12px' }}>
                  <a
                    href="https://wa.me/917877716367"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-wa-card"
                  >
                    <div className="footer-wa-badge">● WhatsApp Support:</div>
                    <div style={{ color: '#25D366', fontWeight: 900, fontSize: '15px' }}>+91 78777 16367</div>
                  </a>
                </div>

                <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
                  Email: <a href="mailto:info@prayxis.in" style={{ color: 'var(--gold-bright)' }}>info@prayxis.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-inner">
              <div>
                © 2024–2026 <strong>PRAYXIS FOUNDATION</strong>. All Rights Reserved.
              </div>
              <div className="footer-bottom-links">
                <Link href="/courses">Internships</Link>
                <a href="#about-us">About</a>
                <a href="#verify">Verify Certificate</a>
                <Link href="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917877716367?text=Hello%20Prayxis%20Foundation,%20I%20want%20to%20know%20more%20about%20your%20internships."
        className="floating-whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp (+91 78777 16367)"
      >
        <svg className="wa-icon-svg" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.115-.515-1.745-.72-2.85-2.493-2.937-2.608-.087-.116-.708-.941-.708-1.793s.448-1.272.607-1.446c.159-.175.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.453.748.972 1.21.668.594 1.232.778 1.406.864.174.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824zm-3.423-10.416c-5.523 0-10 4.477-10 10 0 1.767.459 3.427 1.261 4.877l-1.261 4.607 4.747-1.245c1.401.765 3.007 1.199 4.713 1.199 5.522 0 10-4.477 10-10s-4.478-10-10-10z" />
        </svg>
      </a>

      {/* Certificate Verification Modal */}
      {isCertModalOpen && selectedCert && (
        <div className="modal-overlay active" onClick={() => setIsCertModalOpen(false)}>
          <div
            className="modal-card"
            style={{
              maxWidth: '680px',
              background: '#0f121d',
              color: '#ffffff',
              border: '1.5px solid var(--gold-border)',
              maxHeight: '92vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsCertModalOpen(false)}
            >
              ✕ Close
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', color: 'var(--gold-bright)', textTransform: 'uppercase' }}>
                  Official Verified Credential
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  Prayxis Certificate of Achievement
                </h3>
              </div>
              <span style={{ background: 'rgba(37, 211, 102, 0.15)', border: '1px solid #25D366', color: '#25D366', fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px' }}>
                ● Digitally Verified
              </span>
            </div>

            <div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(245, 158, 11, 0.3)', background: '#07090e' }}>
                <img
                  src={selectedCert.image || '/assets/prayxis_official_certificate.png'}
                  alt="Official Prayxis Digital Certificate Preview"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', marginTop: '14px', fontSize: '12.5px', lineHeight: '1.6' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>Recipient: <strong style={{ color: 'var(--gold-bright)' }}>{selectedCert.studentName}</strong></div>
                  <div>Credential ID: <strong style={{ color: '#ffffff' }}>{selectedCert.id}</strong></div>
                  <div>Track: <strong style={{ color: '#ffffff' }}>{selectedCert.domain}</strong></div>
                  <div>Completion: <strong style={{ color: '#ffffff' }}>{selectedCert.completionDate}</strong></div>
                  <div>Issuer: <strong style={{ color: '#ffffff' }}>Prayxis Foundation</strong></div>
                  <div>Grade: <strong style={{ color: '#25D366' }}>{selectedCert.grade}</strong></div>
                </div>
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed rgba(255,255,255,0.1)', fontFamily: 'monospace', fontSize: '10px', color: '#94a3b8' }}>
                  {selectedCert.hash}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn-sm btn-outline-gold"
                onClick={() => window.print()}
              >
                🖨️ Print / Save
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  showToast('Credential link copied for LinkedIn & Resume!');
                }}
              >
                Share Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#151924',
            border: '1.5px solid var(--gold-bright)',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            zIndex: 99999,
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
