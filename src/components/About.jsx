import { useContent, useLang } from '../hooks/useLang.jsx'

// Accroche riche (spans stylés) par langue — gardée en JSX plutôt qu'en data
// pour contrôler finement la mise en emphase.
const STATEMENT = {
  en: (
    <>
      I'm a <span className="serif-it">product designer</span> who now <em>builds</em> what I
      design. I turn fuzzy B2B problems into clear, scalable products, pairing UX craft with AI to
      move from <span className="serif-it">idea</span> to shipped interface, faster.
    </>
  ),
  fr: (
    <>
      Je suis un <span className="serif-it">product designer</span> qui <em>construit</em> désormais
      ce qu'il conçoit. Je transforme des problèmes B2B flous en produits clairs et scalables, en
      mariant le craft UX et l'IA pour passer de l'<span className="serif-it">idée</span> à
      l'interface livrée, plus vite.
    </>
  ),
}

export default function About() {
  const { profile, ui } = useContent()
  const { lang } = useLang()
  const a = ui.about
  return (
    <section className="section" id="about">
      <div className="section-head">
        <h2>{a.title}</h2>
        <span className="section-idx">(02)</span>
      </div>

      <div className="about-grid">
        <div className="about-top">
          <p className="about-statement reveal">{STATEMENT[lang]}</p>
          <figure className="about-portrait reveal" data-d="1">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} />
            ) : (
              <span className="about-portrait__ph">{a.portrait}</span>
            )}
          </figure>
        </div>
        {/* Grille attendue par le CSS : .about-cols = [1fr | colonne photo].
            Approche + Actuellement vivent côte à côte dans __main (colonne
            large), Détails dans la colonne de droite, sous le portrait. */}
        <div className="about-cols">
          <div className="about-cols__main">
            <div className="reveal" data-d="1">
              <h4>{a.approach.h}</h4>
              <p>{a.approach.p}</p>
            </div>
            <div className="reveal" data-d="2">
              <h4>{a.now.h}</h4>
              <p>{a.now.p}</p>
            </div>
          </div>
          <div className="reveal about-details" data-d="3">
            <h4>{a.details}</h4>
            <p className="about-meta">
              <span>{profile.name}</span>
              <span>{profile.location}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
