import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Download,
  Users,
  Heart
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Cálculo Preciso',
      description: 'Algoritmo avançado para cálculo preciso do IMC com suporte a múltiplos sistemas de unidades.'
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento',
      description: 'Monitore sua evolução com histórico detalhado e gráficos interativos do seu progresso.'
    },
    {
      icon: Shield,
      title: 'Dados Seguros',
      description: 'Seus dados ficam armazenados localmente no seu navegador com total privacidade e segurança.'
    },
    {
      icon: BarChart3,
      title: 'Análise Detalhada',
      description: 'Receba análises completas e recomendações personalizadas baseadas no seu IMC atual.'
    },
    {
      icon: Download,
      title: 'Exportação',
      description: 'Exporte seu histórico em CSV para compartilhar com profissionais de saúde.'
    },
    {
      icon: Users,
      title: 'Base Científica',
      description: 'Conteúdo baseado nas diretrizes da Organização Mundial da Saúde e pesquisas atualizadas.'
    }
  ];

  const stats = [
    { value: '18.5-24.9', label: 'Faixa de IMC Saudável' },
    { value: '2.1B', label: 'Adultos com Sobrepeso no Mundo' },
    { value: '650M', label: 'Adultos com Obesidade' },
    { value: '100+', label: 'Países Monitorados pela OMS' }
  ];

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              IMC Pro
            </h1>
            <p className="hero-subtitle">
              Calculadora Inteligente e Conteúdo Confiável
            </p>
            <p className="hero-description">
              Descubra seu Índice de Massa Corporal com precisão e receba orientações 
              personalizadas baseadas em diretrizes científicas internacionais para 
              melhorar sua saúde e qualidade de vida.
            </p>
            <div className="hero-buttons">
              <Link to="/imc" className="btn btn-primary">
                <Calculator size={20} />
                Calcular IMC Agora
              </Link>
              <Link to="/info" className="btn btn-secondary">
                <Heart size={20} />
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recursos Avançados</h2>
            <p className="section-subtitle">
              Tudo que você precisa para monitorar e entender sua saúde de forma profissional e precisa
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;