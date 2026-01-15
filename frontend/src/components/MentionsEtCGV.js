import React from 'react';

export default function MentionsEtCGV() {
  return (
    <section className="legal-section" style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 className="adelia" style={{ textAlign: 'center', marginBottom: '40px' }}>Mentions Légales & CGV</h1>

      <div className="legal-block" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <p style={{ marginBottom: '30px' }}>
          Vous pouvez télécharger nos Mentions Légales et Conditions Générales de Vente au format PDF en cliquant sur le bouton ci-dessous :
        </p>
        <a
          href="/cgu.pdf"
          download="Mentions_Legales_et_CGV_Oceane_Loze.pdf"
          className="adelia"
          style={{
            display: 'inline-block',
            padding: '15px 30px',
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1.2rem'
          }}
        >
          Télécharger le PDF
        </a>
      </div>
    </section>
  );
}
