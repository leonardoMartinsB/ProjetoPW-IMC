import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-title">404</div>
          <h1 className="not-found-subtitle">Página Não Encontrada</h1>
          <p className="not-found-description">
            A página que você está procurando não existe ou foi movida. 
            Verifique o URL ou navegue pelas opções abaixo para retornar 
            ao conteúdo principal.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <Home size={20} />
              Voltar para Home
            </Link>
            <Link to="/imc" className="btn btn-secondary">
              <ArrowLeft size={20} />
              Ir para Calculadora
            </Link>
          </div>
          <div style={{ marginTop: '40px', padding: '20px', background: 'var(--gray-100)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ color: 'var(--gray-600)', fontSize: '14px', textAlign: 'center' }}>
              <Search size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Se você acredita que isso é um erro, entre em contato com o suporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;