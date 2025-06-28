import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SignInForm = ({ onSwitch }) => (
  <div className="w-full flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold mb-6 text-red-600">Connexion</h2>
    <form className="w-full space-y-4 max-w-sm">
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
      <input type="password" placeholder="Mot de passe" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
      <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">Se connecter</button>
    </form>
    <button className="mt-4 text-sm text-gray-500 hover:text-red-600" onClick={onSwitch}>Pas de compte ? S'inscrire</button>
  </div>
);

const SignUpForm = ({ onSwitch }) => (
  <div className="w-full flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold mb-6 text-red-600">Inscription</h2>
    <form className="w-full space-y-4 max-w-sm">
      <input type="text" placeholder="Nom complet" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
      <input type="password" placeholder="Mot de passe" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
      <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">S'inscrire</button>
    </form>
    <button className="mt-4 text-sm text-gray-500 hover:text-red-600" onClick={onSwitch}>Déjà un compte ? Se connecter</button>
  </div>
);

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname === '/auth/signup';

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8">
        {isSignup ? (
          <SignUpForm onSwitch={() => navigate('/auth')} />
        ) : (
          <SignInForm onSwitch={() => navigate('/auth/signup')} />
        )}
      </div>
    </section>
  );
};

export default AuthPage; 