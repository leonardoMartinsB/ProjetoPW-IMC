import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Activity size={24} />
              IMC Pro
            </Link>
            <p className="footer-description">
              Calculadora inteligente e conteúdo confiável para sua jornada de saúde. 
              Ferramentas profissionais para cuidado pessoal baseadas em evidências científicas.
            </p>
          </div>
          
          <div className="footer-links">
            <h3>Navegação</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/imc">Calculadora IMC</Link></li>
              <li><Link to="/info">Informações</Link></li>
              <li><Link to="/history">Histórico</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Informações</h3>
            <ul>
              <li>Baseado nas diretrizes da OMS</li>
              <li>Para fins educacionais</li>
              <li>
                <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
                contato@imcpro.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 IMC Pro. Todos os direitos reservados.</p>
          <p>
            Feito com <Heart size={16} style={{ display: 'inline', color: 'var(--red-500)' }} /> 
            para sua saúde
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;