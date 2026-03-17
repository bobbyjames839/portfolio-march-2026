import React, { useEffect, useRef } from 'react';
import './App.css';

const technologies = ['TypeScript', 'JavaScript', 'Python', 'C++', 'Node.js', 'Flask', 'FastAPI', 'Next.js', 'ReactJS', 'SQL'];

const experiences = [
  { company: 'Deutsche Bank', role: 'Full Stack Developer', period: 'Jan 2026 – Present' },
  { company: 'Deutsche Bank', role: 'Full Stack Engineer Intern', period: 'Jun 2025 – Aug 2025' },
  { company: 'Avanade', role: 'Data & AI Intern', period: 'Jun 2024 – Aug 2024' },
];

const education = [
  {
    institution: 'University College London',
    period: '2022 – 2025',
    degree: 'BSc Biochemistry',
    grade: 'First Class Honours',
    modules: [
      { name: 'Python for Bioscience Research (Final Exam)', grade: '96%' },
      { name: 'Dissertation: Deep Learning in NMR', grade: '82%' },
    ],
  },
  {
    institution: 'A Levels',
    period: '2020 – 2022',
    subjects: [
      { subject: 'Biology', grade: 'A*' },
      { subject: 'Chemistry', grade: 'A*' },
      { subject: 'Mathematics', grade: 'A*' },
      { subject: 'EPQ', grade: 'A*' },
    ],
  },
];

const projects = [
  {
    name: 'Bobee',
    tag: 'On AppStore',
    period: 'Jun 2025',
    summary: 'AI journalling & reflection app.',
    stack: ['React Native', 'Node.js', 'Firebase', 'OpenAI', 'Render'],
    highlights: [
      'Voice note → transcript + insight pipeline',
      'Mood & productivity trend charts',
      'Personalised chatbot using stored profile context',
    ],
    demo: 'https://www.youtube.com/watch?v=fFQEB0aCTBg',
  },
  {
    name: 'ChatGPT Clone',
    period: 'Jul 2024',
    summary: 'Lightweight ChatGPT-style web app.',
    stack: ['ReactJS', 'Flask', 'Firebase', 'OpenAI', 'Stripe'],
    highlights: [
      'Token streaming responses (real-time reveal)',
      'Persistent conversation memory & context windowing',
      'System / user prompt layering + model & temperature controls',
      'Session history stored with auth & secure persistence',
    ],
    demo: 'https://www.youtube.com/watch?v=G8Z5GTUMJG8',
  },
  {
    name: 'Calendar Booking System',
    period: 'Aug 2024',
    summary: 'Multi-role scheduling & appointment platform for salons.',
    stack: ['ReactJS', 'Flask', 'Firebase', 'Netlify'],
    highlights: [
      'Client self-service booking with real-time slot availability',
      'Stylist dashboard: daily/weekly calendar, drag-to-reschedule',
      'Automated email confirmations & cancellations',
      'Blocked time / PTO & recurring schedule templates',
    ],
  },
  {
    name: 'Insulin Dose Predictor',
    period: 'Jun 2024',
    summary: 'ML tool estimating mealtime insulin dose.',
    stack: ['React', 'Flask', 'Scikit-learn'],
    highlights: [
      'Food entry with Open Food API → auto carb & macro parsing',
      'Feature set: carbs, time-of-day, pre-meal glucose, activity level, +10',
      'Random Forest Regressor tuned for MAE < 1.0U',
      'Confidence band + warning when uncertainty high',
    ],
  },
];

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.56v-2.05c-3.2.7-3.87-1.37-3.87-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.73 1.27 3.4.97.1-.77.4-1.28.72-1.57-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.18 3.17-1.18.63 1.65.23 2.87.11 3.17.75.8 1.2 1.82 1.2 3.08 0 4.43-2.69 5.4-5.25 5.69.41.36.77 1.07.77 2.17v3.22c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-2">
      <span className="section-heading-accent" />
      {children}
    </h2>
  );
}

function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollFade();
  return <div ref={ref} className={`scroll-fade ${className}`}>{children}</div>;
}

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-zinc-950/80 backdrop-blur border-b border-zinc-800 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold tracking-tight gradient-text">BD</span>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="#experience" className="nav-link hover:text-white transition-colors">Experience</a>
            <a href="#work" className="nav-link hover:text-white transition-colors">Work</a>
            <a href="#contact" className="nav-link hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6">

        {/* Hero */}
        <section className="pt-40 pb-24 border-b border-zinc-800 relative">
          <div className="hero-glow" />
          <p className="fade-up fade-up-1 text-violet-400 text-xs tracking-widest uppercase mb-4 z-10 relative">Full Stack Developer</p>
          <h1 className="fade-up fade-up-2 text-5xl font-bold mb-3 gradient-text-animated">Bobby Davidson</h1>
          <p className="fade-up fade-up-3 text-zinc-400 text-lg mb-8">Building products at Deutsche Bank</p>

          <div className="fade-up fade-up-4 flex flex-wrap gap-3 mb-10">
            <a href="mailto:bobbyjames839@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-violet-300 hover:border-violet-800 transition-all">
              <EmailIcon /> bobbyjames839@gmail.com
            </a>
            <a href="https://github.com/bobbyjames839" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-violet-300 hover:border-violet-800 transition-all">
              <GitHubIcon /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/bobby-davidson1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-violet-300 hover:border-violet-800 transition-all">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>

          <div className="fade-up fade-up-5 flex flex-wrap gap-2">
            {technologies.map(t => (
              <span key={t} className="tech-pill px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300">{t}</span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24 border-b border-zinc-800">
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col gap-3">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.role + exp.period}>
                <div className="card-hover bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <span className="font-medium text-violet-300 text-sm">{exp.company}</span>
                    <span className="text-xs text-zinc-500 shrink-0">{exp.period}</span>
                  </div>
                  <span className="text-sm text-zinc-400">{exp.role}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="py-24 border-b border-zinc-800">
          <SectionHeading>Education</SectionHeading>
          <div className="flex flex-col gap-3">
            {education.map(item => (
              <AnimatedSection key={item.institution}>
                <div className="card-hover bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <span className="font-medium text-violet-300 text-sm">{item.institution}</span>
                    <span className="text-xs text-zinc-500 shrink-0">{item.period}</span>
                  </div>
                  {'degree' in item && (
                    <>
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-zinc-400">{item.degree}</span>
                        <span className="text-violet-400 font-medium">{item.grade}</span>
                      </div>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Notable Modules</p>
                      <ul className="space-y-1.5">
                        {item.modules!.map(m => (
                          <li key={m.name} className="flex justify-between text-sm gap-4">
                            <span className="text-zinc-400">{m.name}</span>
                            <span className="text-violet-400 font-medium shrink-0">{m.grade}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {'subjects' in item && (
                    <ul className="grid grid-cols-2 gap-1.5 mt-1">
                      {item.subjects!.map(s => (
                        <li key={s.subject} className="flex justify-between text-sm">
                          <span className="text-zinc-400">{s.subject}</span>
                          <span className="text-violet-400 font-medium">{s.grade}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Work */}
        <section id="work" className="py-24 border-b border-zinc-800">
          <SectionHeading>Work</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map(p => (
              <AnimatedSection key={p.name}>
                <div className="card-hover bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white text-sm">{p.name}</h3>
                        {'tag' in p && p.tag && (
                          <span className="text-xs px-2 py-0.5 bg-violet-950 border border-violet-800 rounded-full text-violet-400">{p.tag}</span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500 shrink-0">{p.period}</span>
                    </div>
                    <p className="text-sm text-zinc-400">{p.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map(t => (
                      <span key={t} className="text-xs px-2 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-violet-300">{t}</span>
                    ))}
                  </div>

                  <ul className="space-y-1.5 flex-1">
                    {p.highlights.map(h => (
                      <li key={h} className="text-sm text-zinc-400 flex gap-2">
                        <span className="text-violet-600 shrink-0 mt-0.5">–</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {'demo' in p && p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-violet-400 border border-violet-800 rounded-lg px-4 py-2 text-center hover:bg-violet-950 hover:text-violet-300 transition-all"
                    >
                      Demo Video
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24">
          <SectionHeading>Contact</SectionHeading>
          <AnimatedSection>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:bobbyjames839@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-violet-300 hover:border-violet-800 transition-all">
                <EmailIcon /> bobbyjames839@gmail.com
              </a>
              <a href="https://github.com/bobbyjames839" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-violet-300 hover:border-violet-800 transition-all">
                <GitHubIcon /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/bobby-davidson1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-violet-300 hover:border-violet-800 transition-all">
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </AnimatedSection>
        </section>

      </main>

      <footer className="border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-5 text-zinc-600 text-sm">
          © {new Date().getFullYear()} Bobby Davidson
        </div>
      </footer>

    </div>
  );
}

export default App;
