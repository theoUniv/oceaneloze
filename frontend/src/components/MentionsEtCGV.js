import React from 'react';

export default function MentionsEtCGV() {
  return (
    <section className="legal-section" style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 className="adelia" style={{ textAlign: 'center', marginBottom: '40px' }}>Mentions Légales & CGV</h1>

      {/* Mentions légales */}
      <div className="legal-block" style={{ marginBottom: '50px' }}>
        <h2 className="adelia" style={{ marginBottom: '20px' }}>Mentions légales</h2>
        <p><strong>Propriétaire du site :</strong> Océane Loze — Entreprise Individuelle</p>
        <p><strong>SIRET :</strong> 977 785 039 00016</p>
        <p><strong>Email :</strong> oceane.loze.photo@gmail.com</p>
        <p><strong>Responsable de la publication :</strong> Océane Loze</p>
        <p><strong>Hébergement :</strong> Hostinger International Ltd. — 61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
        <p><strong>Activité :</strong> Photographe — prestations sur réservation ou devis</p>
      </div>

      {/* CGV */}
      <div className="legal-block" style={{ marginBottom: '50px' }}>
        <h2 className="adelia" style={{ marginBottom: '20px' }}>Conditions Générales de Vente</h2>
        <p><strong>1. Objet :</strong> Les présentes conditions encadrent les prestations photographiques proposées par Océane Loze. Le site ne permet pas d'achat en ligne, uniquement la prise de contact et la réservation.</p>
        <p><strong>2. Réservation :</strong> Toute demande effectuée via le formulaire n'est confirmée qu'après validation écrite par la photographe.</p>
        <p><strong>3. Tarifs :</strong> Les prix affichés sont indicatifs. Les tarifs définitifs sont confirmés sur devis.</p>
        <p><strong>4. Paiement :</strong> Le paiement s'effectue le jour de la séance ou selon les modalités indiquées dans le devis.</p>
        <p><strong>5. Annulation :</strong> Toute annulation doit être signalée au plus tôt. Une nouvelle date peut être proposée en cas d'imprévu majeur.</p>
        <p><strong>6. Livraison :</strong> Les photos sont livrées via une galerie privée, sous 1 à 3 semaines selon la prestation.</p>
        <p><strong>7. Propriété intellectuelle :</strong> Les photos restent protégées par le droit d'auteur. Le client obtient un droit d'usage personnel.</p>
        <p><strong>8. Droit à l’image :</strong> Une autorisation écrite est demandée pour toute utilisation des images par la photographe.</p>
      </div>

      {/* Politique de confidentialité */}
      <div className="legal-block">
        <h2 className="adelia" style={{ marginBottom: '20px' }}>Politique de confidentialité</h2>
        <p><strong>Données collectées :</strong> nom, email, téléphone, date souhaitée et message via le formulaire.</p>
        <p><strong>Finalité :</strong> répondre aux demandes, établir un devis, planifier une séance.</p>
        <p><strong>Conservation :</strong> maximum 12 mois hors clients actifs.</p>
        <p><strong>Partage :</strong> aucune donnée n'est vendue ou transmise à des tiers.</p>
        <p><strong>Droits :</strong> vous pouvez demander l'accès, la modification ou la suppression de vos données en écrivant à l'adresse fournie ci‑dessus.</p>
        <p><strong>Cookies :</strong> uniquement des cookies techniques nécessaires au bon fonctionnement du site.</p>
      </div>
    </section>
  );
}
