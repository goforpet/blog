import React from 'react';

export default function PageHeader({ title, subtitle }) {
  return (
    <header className="header">
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <h1 className="title">{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </div>
        </section>
      </div>
    </header>
  );
}
