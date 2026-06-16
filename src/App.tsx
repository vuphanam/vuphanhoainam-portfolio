/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Sparkles, RotateCcw, Clock, Layers, ArrowUpCircle, 
  Sun, Moon, Mail, Linkedin, Briefcase, Award, Code, 
  MessageSquare, Terminal, ExternalLink, ShieldCheck, MapPin, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_DATA } from './data';
import HeartEffect from './components/HeartEffect';
import BalloonEffect from './components/BalloonEffect';

interface LogEntry {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'primary';
}

type TabType = 'profile' | 'projects' | 'experience' | 'playground' | 'contact';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Contact form submission state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Session states for Hearts
  const [heartActive, setHeartActive] = useState<boolean>(false);
  const [heartTimeLeft, setHeartTimeLeft] = useState<number>(0); 

  // Session states for Balloons
  const [balloonsActive, setBalloonsActive] = useState<boolean>(false);
  const [balloonsTimeLeft, setBalloonsTimeLeft] = useState<number>(0);

  // UTC and Local Time
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

  // History log state
  const [historyLogs, setHistoryLogs] = useState<LogEntry[]>([
    {
      id: 'init',
      time: new Date().toLocaleTimeString(),
      message: 'Meteorological and credentials database calibrated.',
      type: 'info',
    }
  ]);

  // Timers refs
  const heartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const balloonsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clock interval
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Add a log helper
  const addLog = (message: string, type: 'info' | 'success' | 'warning' | 'primary') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      time: new Date().toLocaleTimeString(),
      message,
      type,
    };
    setHistoryLogs((prev) => [newLog, ...prev].slice(0, 8)); 
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      addLog(`Theme transitioned to ${next ? 'Slate Night' : 'Alabaster Day'} mode.`, 'info');
      return next;
    });
  };

  // Switch tab helper
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    addLog(`Viewport navigated to section: ${tab.toUpperCase()}`, 'info');
  };

  // Hearts trigger
  const triggerHearts = () => {
    if (heartTimerRef.current) {
      clearInterval(heartTimerRef.current);
    }
    setHeartActive(true);
    setHeartTimeLeft(5000);
    addLog('Cascading Heart generation sequences initialized.', 'primary');

    const tick = 100;
    heartTimerRef.current = setInterval(() => {
      setHeartTimeLeft((prev) => {
        if (prev <= tick) {
          if (heartTimerRef.current) clearInterval(heartTimerRef.current);
          setHeartActive(false);
          addLog('Heart generation sequence finished successfully.', 'success');
          return 0;
        }
        return prev - tick;
      });
    }, tick);
  };

  // Balloons trigger
  const triggerBalloons = () => {
    if (balloonsTimerRef.current) {
      clearInterval(balloonsTimerRef.current);
    }
    setBalloonsActive(true);
    setBalloonsTimeLeft(5000);
    addLog('Aerodynamic Balloon lift vector sequences initialized.', 'warning');

    const tick = 100;
    balloonsTimerRef.current = setInterval(() => {
      setBalloonsTimeLeft((prev) => {
        if (prev <= tick) {
          if (balloonsTimerRef.current) clearInterval(balloonsTimerRef.current);
          setBalloonsActive(false);
          addLog('Balloon lift sequence completed successfully.', 'success');
          return 0;
        }
        return prev - tick;
      });
    }, tick);
  };

  // Reset active triggers
  const resetAllEffects = () => {
    if (heartTimerRef.current) clearInterval(heartTimerRef.current);
    if (balloonsTimerRef.current) clearInterval(balloonsTimerRef.current);
    setHeartActive(false);
    setHeartTimeLeft(0);
    setBalloonsActive(false);
    setBalloonsTimeLeft(0);
    addLog('All active physical gravity simulators put on Standby.', 'warning');
  };

  // Contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      addLog('Contact form verification failure: Missing fields.', 'warning');
      return;
    }

    addLog(`Initiating outbound SMTP dispatch pipeline for ${formName}...`, 'info');

    try {
      const response = await fetch('/api/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        addLog(`Message dispatched successfully via SMTP pipeline.`, 'success');
        setTimeout(() => {
          setIsSubmitted(false);
          setFormName('');
          setFormEmail('');
          setFormMessage('');
        }, 4500);
      } else {
        addLog(`Outbound transmission failure: ${data.error || 'Server error'}`, 'warning');
      }
    } catch (error: any) {
      addLog(`Network transmission error: ${error.message || 'Unable to connect to API'}`, 'warning');
    }
  };

  useEffect(() => {
    return () => {
      if (heartTimerRef.current) clearInterval(heartTimerRef.current);
      if (balloonsTimerRef.current) clearInterval(balloonsTimerRef.current);
    };
  }, []);

  const heartProgress = (heartTimeLeft / 5000) * 100;
  const balloonsProgress = (balloonsTimeLeft / 5000) * 100;

  return (
    <div 
      id="app-root" 
      className={`min-h-screen font-sans flex flex-col relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-850'
      }`}
    >
      
      {/* Background Grid Accent */}
      <div 
        className={`absolute inset-0 [background-size:20px_20px] opacity-75 pointer-events-none transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)]' 
            : 'bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]'
        }`} 
      />

      {/* Atmospheric Canvas Effects */}
      <HeartEffect isActive={heartActive} />
      <BalloonEffect isActive={balloonsActive} />

      {/* Primary Top Header bar */}
      <header 
        id="app-navigation-header" 
        className={`w-full border-b py-4 px-6 flex flex-col sm:flex-row items-center justify-between z-30 transition-colors duration-300 shadow-xs relative ${
          isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}
      >
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="bg-indigo-600 text-white p-2.5 rounded-lg shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight font-display text-slate-900 dark:text-white">
                Vu Phan Hoai Nam
              </h1>
              <span className="text-[10px] uppercase font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-sm font-semibold tracking-wider border border-indigo-200/20">
                PORTFOLIO
              </span>
            </div>
            <p className={`text-xs font-mono mt-0.5 transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Junior Backend Developer
            </p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center space-x-3">
          {/* Quick timing widget */}
          <div className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg border font-mono text-xs ${
            isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{currentTime}</span>
          </div>

          {/* Quick social links */}
          <a 
            href={PORTFOLIO_DATA.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-2 rounded-lg border transition-all hover:scale-105 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
            }`}
            title="Linkedin Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a 
            href={`mailto:${PORTFOLIO_DATA.email}`}
            className={`p-2 rounded-lg border transition-all hover:scale-105 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
            }`}
            title="Direct e-Mail Link"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Light/Dark Toggle */}
          <button
            id="btn-app-toggle-theme"
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg border transition-all hover:scale-105 cursor-pointer flex items-center justify-center ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
            title="Toggle Visual Theme Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Container Workspace */}
      <main id="app-main-view" className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-4 gap-6 z-30">
        
        {/* Left Column: Navigation Sidebar */}
        <aside id="portfolio-sidebar" className="lg:col-span-1 flex flex-col gap-5">
          {/* Quick mini-profile card */}
          <div className={`p-5 rounded-xl border flex flex-col items-center text-center transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="relative group mb-3">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold font-display shadow-lg select-none">
                NV
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white dark:border-slate-900 w-4 h-4 rounded-full" title="Active Code Server" />
            </div>
            
            <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-white font-display">
              {PORTFOLIO_DATA.fullName}
            </h2>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <MapPin className="w-3 h-3 text-indigo-500" />
              <span>Vietnam</span>
            </div>

            <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-800 my-4" />

            <div className="w-full flex flex-col gap-1.5 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                Simulation Controls
              </span>
              
              <button 
                id="sidebar-effect-hearts"
                onClick={triggerHearts}
                className={`w-full py-2 px-3 rounded-lg text-xs font-mono font-medium border flex items-center justify-between transition-all cursor-pointer ${
                  heartActive 
                    ? 'border-red-500/50 bg-red-500/10 text-red-500 font-semibold' 
                    : isDarkMode
                      ? 'border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-300' 
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-600'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Heart className={`w-3.5 h-3.5 ${heartActive ? 'fill-red-500' : ''}`} />
                  Hearts Sequence
                </span>
                <span className="text-[90%] opacity-80">{heartActive ? 'Active' : 'Deploy'}</span>
              </button>

              <button 
                id="sidebar-effect-balloons"
                onClick={triggerBalloons}
                className={`w-full py-2 px-3 rounded-lg text-xs font-mono font-medium border flex items-center justify-between transition-all cursor-pointer ${
                  balloonsActive 
                    ? 'border-rose-500/50 bg-rose-500/10 text-rose-500 font-semibold' 
                    : isDarkMode
                      ? 'border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-300' 
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-600'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <ArrowUpCircle className="w-3.5 h-3.5" />
                  Balloons Float
                </span>
                <span className="text-[90%] opacity-80">{balloonsActive ? 'Active' : 'Deploy'}</span>
              </button>
            </div>
          </div>

          {/* Core App Navigation Menu */}
          <nav className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold px-3 mb-1">
              Main Registry Indexes
            </span>

            <button
              id="nav-tab-profile"
              onClick={() => handleTabChange('profile')}
              className={`w-full py-2.5 px-4 rounded-lg text-left text-sm font-medium transition-all flex items-center space-x-3 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-150 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span className="truncate">Professional Profile</span>
            </button>

            <button
              id="nav-tab-projects"
              onClick={() => handleTabChange('projects')}
              className={`w-full py-2.5 px-4 rounded-lg text-left text-sm font-medium transition-all flex items-center space-x-3 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-150 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Code className="w-4 h-4 shrink-0" />
              <span className="truncate">Engineering Projects</span>
            </button>

            <button
              id="nav-tab-experience"
              onClick={() => handleTabChange('experience')}
              className={`w-full py-2.5 px-4 rounded-lg text-left text-sm font-medium transition-all flex items-center space-x-3 cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-150 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span className="truncate">Work Milestones</span>
            </button>

            <button
              id="nav-tab-playground"
              onClick={() => handleTabChange('playground')}
              className={`w-full py-2.5 px-4 rounded-lg text-left text-sm font-medium transition-all flex items-center space-x-3 cursor-pointer ${
                activeTab === 'playground'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-150 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-4 h-4 shrink-0" />
              <span className="truncate">Physics Lab Deck</span>
            </button>

            <button
              id="nav-tab-contact"
              onClick={() => handleTabChange('contact')}
              className={`w-full py-2.5 px-4 rounded-lg text-left text-sm font-medium transition-all flex items-center space-x-3 cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-150 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">Outbound Dispatch</span>
            </button>
          </nav>

          {/* Quick Metrology Terminal */}
          <div className={`p-4 rounded-xl border flex flex-col gap-2 transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-100/60 border-slate-200'
          }`}>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
              METRIC MONITORS
            </span>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Active Emitter</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {heartActive ? 'Hearts' : balloonsActive ? 'Balloons' : 'Standby'}
              </span>
            </div>
            {/* Meter 1: Heart */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Hearts Vector</span>
                <span className="text-slate-500">{(heartTimeLeft/1000).toFixed(1)}s</span>
              </div>
              <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-100" style={{ width: `${heartProgress}%` }} />
              </div>
            </div>
            {/* Meter 2: Balloon */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Balloon Vector</span>
                <span className="text-slate-500">{(balloonsTimeLeft/1000).toFixed(1)}s</span>
              </div>
              <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 transition-all duration-100" style={{ width: `${balloonsProgress}%` }} />
              </div>
            </div>
          </div>
        </aside>

        {/* Right Section: Multi-Pane Dashboard Deck */}
        <section id="portfolio-deck-pane" className="lg:col-span-3 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            
            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.22 }}
                className={`p-6 md:p-8 rounded-2xl border flex flex-col gap-6 shadow-xs ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-indigo-500 font-semibold uppercase mb-2">
                    <Award className="w-3.5 h-3.5" />
                    <span>Executive Summary</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
                    Engineering Excellence & Professional Focus
                  </h3>
                  <p className={`mt-4 text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-650 text-slate-705 text-slate-600'}`}>
                    {PORTFOLIO_DATA.aboutMe}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                  {PORTFOLIO_DATA.skills.map((skillGroup) => (
                    <div 
                      key={skillGroup.category}
                      className={`p-4 rounded-xl border ${
                        isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/50 border-slate-100'
                      }`}
                    >
                      <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-indigo-500 mb-3">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {skillGroup.items.map((item) => (
                          <span 
                            key={item}
                            className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                              isDarkMode 
                                ? 'bg-slate-900 border-slate-800 text-slate-350 hover:border-slate-700' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Action */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <button 
                    onClick={() => handleTabChange('contact')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer group transition-all"
                  >
                    <span>Request Collaboration</span>
                    <MessageSquare className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <a 
                    href={PORTFOLIO_DATA.linkedin}
                    target="_blank" 
                    rel="noreferrer"
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                      isDarkMode 
                        ? 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white' 
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Connect on LinkedIn</span>
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-5"
              >
                <div className={`p-6 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2 text-xs font-mono text-indigo-500 font-semibold uppercase mb-2">
                    <Code className="w-3.5 h-3.5" />
                    <span>Engineering Registry</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
                    Crafted Systems & Applications
                  </h3>
                  <p className="text-sm mt-1 text-slate-500 leading-relaxed">
                    A catalog of highly optimized applications built for fluent interactivity, low overhead, and persistent cloud synchronization.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {PORTFOLIO_DATA.projects.map((project, idx) => (
                    <div 
                      key={project.title}
                      className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 shadow-lg shadow-slate-950/20' : 'bg-white border-slate-200 shadow-xs shadow-slate-100'
                      }`}
                    >
                      <div>
                        {/* Upper row header */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 bg-indigo-550/10 dark:bg-indigo-950/40 text-indigo-500 px-2 py-0.5 rounded-sm">
                            {project.category}
                          </span>
                          {project.metric && (
                            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-sm flex items-center gap-1 font-semibold border border-emerald-500/10">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                              {project.metric}
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display">
                          {project.title}
                        </h4>
                        {project.period && (
                          <div className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 mt-1 mb-3">
                            {project.period}
                          </div>
                        )}
                        <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {project.description}
                        </p>
                      </div>

                      {/* Lower tech indicators */}
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: EXPERIENCE */}
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col gap-6"
              >
                <div className={`p-6 rounded-2xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center space-x-2 text-xs font-mono text-indigo-500 font-semibold uppercase mb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Chronicle registry</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
                    Carrier History Timeline
                  </h3>
                  <p className="text-sm mt-1 text-slate-500">
                    A timeline outlining engineering operations, leadership responsibilities, and key metrics attained.
                  </p>
                </div>

                <div className="relative border-l border-indigo-200 dark:border-indigo-950 ml-4 py-3 flex flex-col gap-8">
                  {PORTFOLIO_DATA.experience.map((exp) => (
                    <div key={exp.role} className="relative pl-7 group">
                      
                      {/* Timeline dot */}
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-950 transition-transform group-hover:scale-125 duration-200" />

                      <div className={`p-5 rounded-xl border flex flex-col gap-3 transition-all duration-300 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}>
                        
                        {/* Upper info block */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 border-b border-slate-100 dark:border-slate-800/60 pb-3">
                          <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                              {exp.role}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                              <span className="text-xs font-semibold text-indigo-500 font-mono">
                                {exp.company}
                              </span>
                              {exp.location && (
                                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                                  • {exp.location}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs font-mono font-medium text-slate-400">
                            {exp.period}
                          </span>
                        </div>

                        {/* Achievements list */}
                        <ul className="flex flex-col gap-2">
                          {exp.achievements.map((item, idx) => (
                            <li key={idx} className="flex items-start text-xs leading-normal">
                              <span className="text-indigo-500 text-base leading-none mr-2 select-none">•</span>
                              <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: PLAYGROUND */}
            {activeTab === 'playground' && (
              <motion.div
                key="playground"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.22 }}
                className={`w-full border rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 shadow-slate-950/40' : 'bg-white border-slate-200 shadow-slate-200/50'
                }`}
              >
                {/* Header Console Section */}
                <div className={`p-6 md:p-8 border-b transition-colors duration-300 ${
                  isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/50 border-slate-100'
                }`}>
                  <div className="flex items-center space-x-2 text-xs font-mono text-indigo-500 font-medium tracking-wider uppercase mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interactive Fluid Simulator Panel</span>
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold tracking-tight font-display ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    Atmospheric Projections
                  </h2>
                  <p className={`mt-2 text-sm leading-relaxed max-w-lg transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-505 text-slate-500'
                  }`}>
                    Trigger physics-restricted fluid movements. Select a button to begin a 5.0-second simulation cycle. The layers execute on hardware-accelerated planes.
                  </p>
                </div>

                {/* Core Controls Section */}
                <div className="p-6 md:p-8 flex flex-col gap-6">
                  
                  {/* The Buttons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Hearts Button Card */}
                    <button
                      id="btn-trigger-hearts"
                      onClick={triggerHearts}
                      className={`relative group flex flex-col items-center justify-center p-6 rounded-lg border-2 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                        heartActive 
                          ? 'border-red-500 bg-red-500/10' 
                          : isDarkMode 
                            ? 'border-slate-800 bg-slate-950/40 hover:border-red-500/50' 
                            : 'border-slate-200 bg-white hover:border-red-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className={`p-4 rounded-full mb-3.5 transition-transform duration-300 group-hover:scale-110 ${
                        heartActive ? 'bg-red-500 text-white shadow-md shadow-red-500/20' : 'bg-red-50 dark:bg-red-950/20 text-red-500'
                      }`}>
                        <Heart fill={heartActive ? 'currentColor' : 'none'} className="w-6 h-6 animate-pulse" />
                      </div>
                      
                      <h3 className={`text-base font-semibold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        Red Hearts Sequence
                      </h3>
                      <p className={`mt-1.5 text-xs transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Double-size crimson shapes cascading downwards.
                      </p>

                      <span className={`mt-3 text-xs font-mono font-medium px-2 py-0.5 rounded-full transition-colors ${
                        isDarkMode ? 'bg-slate-800 text-slate-350' : 'bg-slate-100 text-slate-600'
                      }`}>
                        5.0s Limit
                      </span>
                    </button>

                    {/* Balloons Button Card */}
                    <button
                      id="btn-trigger-balloons"
                      onClick={triggerBalloons}
                      className={`relative group flex flex-col items-center justify-center p-6 rounded-lg border-2 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                        balloonsActive 
                          ? 'border-rose-500 bg-rose-500/10' 
                          : isDarkMode 
                            ? 'border-slate-800 bg-slate-950/40 hover:border-rose-500/50' 
                            : 'border-slate-200 bg-white hover:border-rose-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      <div className={`p-4 rounded-full mb-3.5 transition-transform duration-300 group-hover:scale-110 ${
                        balloonsActive ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' : 'bg-rose-50 dark:bg-rose-950/20 text-rose-500'
                      }`}>
                        <ArrowUpCircle className="w-6 h-6" />
                      </div>
                      
                      <h3 className={`text-base font-semibold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                        Balloons Sequence
                      </h3>
                      <p className={`mt-1.5 text-xs transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Pastel aerodynamic balloons ascending upwards.
                      </p>

                      <span className={`mt-3 text-xs font-mono font-medium px-2 py-0.5 rounded-full transition-colors ${
                        isDarkMode ? 'bg-slate-800 text-slate-355 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        5.0s Limit
                      </span>
                    </button>

                  </div>

                  {/* Live Progress Monitoring Meters */}
                  <div 
                    id="live-monitoring-panel" 
                    className={`border rounded-lg p-5 flex flex-col gap-4 transition-colors duration-300 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className={`flex items-center justify-between border-b pb-2 ${
                      isDarkMode ? 'border-slate-800' : 'border-slate-200/60'
                    }`}>
                      <span className={`text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        Live Cycle Metrology
                      </span>
                      {(heartActive || balloonsActive) && (
                        <button 
                          onClick={resetAllEffects}
                          className="text-xs font-medium text-rose-500 hover:text-rose-600 cursor-pointer flex items-center gap-1 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          Halt Projection
                        </button>
                      )}
                    </div>

                    {/* Grid Meters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Heart meter */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className={`font-medium flex items-center gap-1.5 ${isDarkMode ? 'text-slate-350' : 'text-slate-700'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${heartActive ? 'bg-red-500 animate-ping' : 'bg-slate-400'}`} />
                            Red Hearts System
                          </span>
                          <span className="text-slate-500">
                            {heartActive ? `${(heartTimeLeft / 1000).toFixed(1)}s` : 'Standby'}
                          </span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'}`}>
                          <motion.div 
                            className="h-full bg-red-500 rounded-full"
                            animate={{ width: `${heartProgress}%` }}
                            transition={{ duration: 0.1, ease: 'linear' }}
                          />
                        </div>
                      </div>

                      {/* Balloon meter */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className={`font-medium flex items-center gap-1.5 ${isDarkMode ? 'text-slate-350' : 'text-slate-700'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${balloonsActive ? 'bg-rose-500 animate-ping' : 'bg-slate-400'}`} />
                            Balloons System
                          </span>
                          <span className="text-slate-500">
                            {balloonsActive ? `${(balloonsTimeLeft / 1000).toFixed(1)}s` : 'Standby'}
                          </span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'}`}>
                          <motion.div 
                            className="h-full bg-rose-500 rounded-full"
                            animate={{ width: `${balloonsProgress}%` }}
                            transition={{ duration: 0.1, ease: 'linear' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real-time event log */}
                  <div id="event-terminal-log" className="flex flex-col gap-2">
                    <span className={`text-xs font-mono font-semibold tracking-wider uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Console Event Log Buffer
                    </span>
                    <div className={`font-mono text-xs p-4 rounded-lg min-h-[140px] max-h-[180px] overflow-y-auto flex flex-col gap-1.5 border shadow-inner scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent ${
                      isDarkMode ? 'bg-slate-950 text-slate-300 border-slate-900' : 'bg-slate-950 text-slate-300 border-slate-900/40'
                    }`}>
                      <AnimatePresence initial={false}>
                        {historyLogs.map((log) => {
                          const typeColor = 
                            log.type === 'primary' ? 'text-sky-400' :
                            log.type === 'warning' ? 'text-rose-450 text-rose-400' :
                            log.type === 'success' ? 'text-emerald-450 text-emerald-400' : 
                            'text-slate-400';

                          return (
                            <motion.div
                              key={log.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              className="flex items-start space-x-2 border-b border-slate-900 pb-1.5 last:border-b-0 leading-tight"
                            >
                              <span className="text-slate-500 shrink-0">[{log.time}]</span>
                              <span className={`font-semibold shrink-0 uppercase tracking-tight text-[10px] px-1 rounded-sm bg-slate-800 ${typeColor}`}>
                                {log.type}
                              </span>
                              <span>{log.message}</span>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB: CONTACT */}
            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.22 }}
                className={`p-6 md:p-8 rounded-2xl border flex flex-col gap-6 shadow-xs ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-indigo-500 font-semibold uppercase mb-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Communication Pipeline</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
                    Simulate Message Outbound Dispatch
                  </h3>
                  <p className="text-sm mt-1 text-slate-500">
                    Submit custom queries, technical requests or project criteria directly below.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="form"
                      onSubmit={handleContactSubmit}
                      className="flex flex-col gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                            Identified Name
                          </label>
                          <input 
                            type="text" 
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="John Doe"
                            className={`w-full px-4 py-2 rounded-lg border text-sm font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' 
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                            }`}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                            Identified contact Email
                          </label>
                          <input 
                            type="email" 
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="sender@corp.com"
                            className={`w-full px-4 py-2 rounded-lg border text-sm font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                              isDarkMode 
                                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' 
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                          Brief text details
                        </label>
                        <textarea 
                          rows={4}
                          required
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Your outstanding project requirements go here..."
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors ${
                            isDarkMode 
                              ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' 
                              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                      </div>

                      <button 
                        type="submit"
                        className="self-start px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-xs group"
                      >
                        <span>Dispatch Signal</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      className="py-12 flex flex-col items-center justify-center text-center gap-4 border border-dashed border-emerald-500/20 rounded-xl bg-emerald-500/[0.02]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="p-3 bg-emerald-500 text-white rounded-full">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-emerald-500 font-display">
                          Inbound Dispatch Acknowledged
                        </h4>
                        <p className="text-xs text-slate-400 font-mono mt-1 leading-relaxed max-w-sm mx-auto">
                          Digital packet successfully queued on server. Outbound transmission pipeline active.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

          </AnimatePresence>
        </section>

      </main>

      {/* Footer System Credits */}
      <footer className="w-full text-center py-6 text-[10px] text-slate-500 font-mono uppercase tracking-widest pointer-events-none z-10 transition-colors duration-300">
        Simulation Code Node Core v1.1.2 • Vu Phan Hoai Nam Portfolio
      </footer>
    </div>
  );
}
