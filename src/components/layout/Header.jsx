import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Info, Newspaper, Stethoscope, MessageCircle, User, HeartPulse, Shield, BookOpen, Video } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Logo = () => (
  <a href="/" className="flex items-center space-x-3 cursor-pointer">
    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    </div>
    <div>
      <h1 className="text-xl font-bold text-gray-900">Rougeole Maroc</h1>
      <p className="text-xs text-gray-500">Information & Prévention</p>
    </div>
  </a>
);

const NavButton = ({ onClick, icon: Icon, children }) => (
  <button 
    onClick={onClick}
    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
  >
    {Icon && <Icon className="w-4 h-4" />}
    <span>{children}</span>
  </button>
);

const LoginButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
  >
    <User className="w-4 h-4" />
    <span>Connexion</span>
  </button>
);

const MobileNavButton = ({ onClick, icon: Icon, children }) => (
    <button onClick={onClick} className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{children}</span>
    </button>
);

const MobileLoginButton = ({ onClick }) => (
    <button onClick={onClick} className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors w-fit">
        <User className="w-4 h-4" />
        <span>Connexion</span>
    </button>
);

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const DROPDOWN_ITEMS = [
  { icon: Info, label: 'À propos', section: 'about' },
  { icon: HeartPulse, label: 'Symptômes', section: 'symptoms' },
  { icon: Stethoscope, label: 'Diagnostic', section: 'diagnosis' },
  { icon: Shield, label: 'Prévention', section: 'prevention' },
  { icon: BookOpen, label: 'Publications', section: 'publications' },
  { icon: Video, label: 'Vidéos courtes', section: 'videos' },
  { icon: Newspaper, label: 'Actualités', section: 'news' },
];

const Header = ({ logoOnly }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  if (logoOnly) {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-16">
          <Logo />
        </div>
      </header>
    );
  }

  const handleNavClick = (section) => {
    if (section === 'login') {
      navigate('/auth');
      return;
    }
    if (section === 'chat') {
      window.open('/chatbot-standalone', '_blank');
      return;
    }
    // Sections ancrées
    if ([
      'symptoms', 'diagnosis', 'prevention', 'publications', 'videos',
      'about', 'news', 'treatment'
    ].includes(section)) {
      scrollToSection(section);
      setIsMenuOpen(false);
      return;
    }
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée",
      description: "Mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀"
    });
  };

  const navItems = [
    { icon: Info, label: 'À propos', section: 'about' },
    { icon: Newspaper, label: 'Actualités', section: 'news' },
    { icon: Stethoscope, label: 'Traitement', section: 'treatment' },
    { icon: HeartPulse, label: 'Symptômes', section: 'symptoms' },
    { icon: Stethoscope, label: 'Diagnostic', section: 'diagnosis' },
    { icon: Shield, label: 'Prévention', section: 'prevention' },
    { icon: BookOpen, label: 'Publications', section: 'publications' },
    { icon: Video, label: 'Vidéos courtes', section: 'videos' },
    { icon: MessageCircle, label: 'Chat', section: 'chat' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((v) => !v)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-700 font-semibold transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>À propos de la rougeole</span>
                <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col py-2 animate-fade-in">
                  {DROPDOWN_ITEMS.map(item => (
                    <button
                      key={item.section}
                      onClick={() => { handleNavClick(item.section); setIsDropdownOpen(false); }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a
              href="/guides/Circulaire_diffusion_manuel_rougeole.pdf"
              download
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold"
              style={{ textDecoration: 'none' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" /></svg>
              <span>Guide de prévention</span>
            </a>
            <NavButton onClick={() => handleNavClick('chat')} icon={MessageCircle}>Chat</NavButton>
            <LoginButton onClick={() => handleNavClick('login')} />
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((v) => !v)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-700 font-semibold transition-colors w-full justify-start"
                >
                  <Info className="w-4 h-4" />
                  <span>À propos de la rougeole</span>
                  <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col py-2 animate-fade-in">
                    {DROPDOWN_ITEMS.map(item => (
                      <button
                        key={item.section}
                        onClick={() => { handleNavClick(item.section); setIsDropdownOpen(false); setIsMenuOpen(false); }}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a
                href="/guides/Circulaire_diffusion_manuel_rougeole.pdf"
                download
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-semibold"
                style={{ textDecoration: 'none' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" /></svg>
                <span>Guide de prévention</span>
              </a>
              <MobileLoginButton onClick={() => handleNavClick('login')} />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;