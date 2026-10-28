import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const projects = [
  {
    name: 'Akone',
    period: 'Oct 2026',
    summary:
      'A platform of small, realistic Python puzzles that you solve by reading and reasoning through the code, fixing a single planted bug or writing a function from scratch in an in-browser editor with live type checking, running it in a real shell streamed over a websocket into a sandboxed Docker container, judging solutions against the original tests server-side, and offering an AI assistant that answers Python questions while refusing anything that would give the puzzle away.',
    stack: ['React', 'FastAPI', 'Supabase', 'Docker', 'OpenAI', 'Astro'],
    repo: 'https://github.com/bobbyjames839/puzzle',
    demo: 'https://akone.dev',
    demoLabel: 'Live site',
  },
  {
    name: 'Glucose Monitor',
    period: 'Apr 2026',
    summary:
      'A FastAPI service that polls FreeStyle LibreLink for live CGM readings around the clock, stores them in Postgres and rolls each day up into time-in-range, average and standard-deviation statistics, pushes threshold alerts to a phone through Expo with configurable limits and silencing, and exposes the whole history to an OpenAI tool-calling chat endpoint that can query summaries or individual readings to explain spikes and lows.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'OpenAI', 'APScheduler', 'Expo'],
    repo: 'https://github.com/bobbyjames839/diabetes-workflow-backend',
  },
  {
    name: 'Bobee',
    period: 'Jun 2025',
    summary:
      'An AI journalling and reflection app that turns voice notes into transcripts and written insights, charts mood and productivity trends over time, and answers questions through a personalised chatbot built on your stored profile context.',
    stack: ['React Native', 'Node.js', 'Firebase', 'OpenAI', 'Render'],
    repo: 'https://github.com/bobbyjames839/bobee-backend',
    demo: 'https://www.youtube.com/watch?v=fFQEB0aCTBg',
  },
  {
    name: 'ChatGPT Clone',
    period: 'Jul 2024',
    summary:
      'A lightweight ChatGPT-style web app with real-time token streaming, persistent conversation memory and context windowing, layered system and user prompts alongside model and temperature controls, and session history kept behind auth with secure persistence.',
    stack: ['ReactJS', 'Flask', 'Firebase', 'OpenAI', 'Stripe'],
    demo: 'https://www.youtube.com/watch?v=G8Z5GTUMJG8',
  },
  {
    name: 'Calendar Booking System',
    period: 'Aug 2024',
    summary:
      'A multi-role scheduling platform for salons offering client self-service booking against real-time slot availability, a stylist dashboard with daily and weekly calendars and drag-to-reschedule, automated email confirmations and cancellations, and support for blocked time, PTO and recurring schedule templates.',
    stack: ['ReactJS', 'Flask', 'Firebase', 'Netlify'],
    repo: 'https://github.com/bobbyjames839/calendar',
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

const linkClass =
  'flex items-center gap-2 text-sm text-zinc-500 hover:text-violet-700 transition-colors';

function BackgroundBlobs() {
  return (
    <div className="blob-layer" aria-hidden="true">
      <span className="blob blob-violet" />
      <span className="blob blob-sky" />
      <span className="blob blob-rose" />
      <span className="blob blob-amber" />
    </div>
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

function FooterLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-x-8 gap-y-3 pb-4 pt-8 ${className}`}>
      <a href="mailto:bobbyjames839@gmail.com" className={linkClass}>
        <EmailIcon /> bobbyjames839@gmail.com
      </a>
      <a href="https://github.com/bobbyjames839" target="_blank" rel="noopener noreferrer" className={linkClass}>
        <GitHubIcon /> GitHub
      </a>
      <a href="https://www.linkedin.com/in/bobby-davidson1/" target="_blank" rel="noopener noreferrer" className={linkClass}>
        <LinkedInIcon /> LinkedIn
      </a>
    </div>
  );
}

/**
 * Momentum scrolling: the wheel updates a target offset and rAF eases the real
 * scroll position toward it, which is what gives sites that "weighted" feel.
 * Trackpads and touch already have native inertia, so only mouse wheels are
 * intercepted — and nothing is if the user asked for reduced motion.
 */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let target = window.scrollY;
    let current = target;
    let frame = 0;
    let running = false;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const animate = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        running = false;
      }
      window.scrollTo(0, current);
      if (running) frame = requestAnimationFrame(animate);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;                 // pinch-zoom
      if (e.deltaMode !== 0) return;         // line/page scrolling, leave native
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      e.preventDefault();
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY));
      if (!running) {
        running = true;
        current = window.scrollY;
        frame = requestAnimationFrame(animate);
      }
    };

    // Keyboard, scrollbar drags and anchor jumps bypass the wheel handler.
    const onScroll = () => { if (!running) { target = window.scrollY; current = target; } };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function Home() {
  return (
    <main className="min-h-screen flex flex-col px-6 relative">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h1 className="fade-up fade-up-1 text-5xl sm:text-7xl font-semibold tracking-tight leading-tight pb-2 mb-4 gradient-text-animated">
          Bobby Davidson
        </h1>

        <p className="fade-up fade-up-2 flex items-center gap-3 text-zinc-500 text-sm tracking-wide mb-12">
          <span className="hero-rule" />
          Software Engineer at <span className="text-zinc-900 font-medium">Deutsche Bank</span>
          <span className="hero-rule" />
        </p>

        <a href="#/work" className="fade-up fade-up-3 work-link text-sm font-medium text-violet-700">
          View my work
          <span className="work-link-arrow">→</span>
        </a>
      </div>

      <FooterLinks className="fade-up fade-up-4" />
    </main>
  );
}

function Work() {
  return (
    <main className="min-h-screen flex flex-col px-6">
      <div className="w-full max-w-4xl mx-auto flex-1 pt-24">

        <header className="flex flex-col items-center text-center mb-20">
          <h1 className="fade-up fade-up-1 text-4xl sm:text-6xl font-semibold tracking-tight leading-tight pb-2 mb-4 gradient-text-animated">
            Work
          </h1>
          <p className="fade-up fade-up-2 flex items-center gap-3 text-zinc-500 text-sm tracking-wide">
            <span className="hero-rule" />
            A few things I&rsquo;ve built
            <span className="hero-rule" />
          </p>
        </header>

        <div className="flex flex-col gap-5 pb-16">
          {projects.map(p => (
            <AnimatedSection key={p.name}>
              <article className="tile">
                <div className="w-full flex items-baseline justify-between gap-4 mb-3">
                  <h2 className="text-lg font-medium tracking-tight text-zinc-900">{p.name}</h2>
                  <span className="text-xs text-zinc-400 shrink-0 ml-auto text-right">{p.period}</span>
                </div>

                <p className="text-sm leading-relaxed text-zinc-600 mb-5">{p.summary}</p>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400">
                  {p.stack.map((t, i) => (
                    <span key={t}>
                      {i > 0 && <span className="mr-2 text-zinc-300">·</span>}
                      {t}
                    </span>
                  ))}
                </div>

                {(('repo' in p && p.repo) || ('demo' in p && p.demo)) && (
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
                    {'repo' in p && p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-link text-sm font-medium text-violet-700"
                      >
                        <GitHubIcon /> Code
                      </a>
                    )}
                    {'demo' in p && p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-link text-sm font-medium text-violet-700"
                      >
                        {'demoLabel' in p && p.demoLabel ? p.demoLabel : 'Demo video'}
                        <span className="work-link-arrow">→</span>
                      </a>
                    )}
                  </div>
                )}
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <FooterLinks />
    </main>
  );
}

function App() {
  const hash = useHashRoute();
  const isWork = hash.startsWith('#/work');
  useSmoothScroll();

  useEffect(() => { window.scrollTo(0, 0); }, [isWork]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans relative overflow-hidden">
      <BackgroundBlobs />
      <div className="relative z-10">
        {isWork ? <Work /> : <Home />}
      </div>
    </div>
  );
}

export default App;
