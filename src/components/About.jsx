import { profile } from '../data/content.js'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <h2>About</h2>
        <span className="section-idx">(02)</span>
      </div>

      <div className="about-grid">
        <p className="about-statement reveal">
          I'm a <span className="serif-it">product designer</span> who now <em>builds</em> what I
          design. I turn fuzzy B2B problems into clear, scalable products, pairing UX craft with AI
          to move from <span className="serif-it">idea</span> to shipped interface, faster.
        </p>
        <div className="about-cols">
          <div className="reveal" data-d="1">
            <h4>// Approach</h4>
            <p>
              Research first, systems always. I design the structure behind a product, its flows,
              hierarchy and components, so it holds up as it grows.
            </p>
          </div>
          <div className="reveal" data-d="2">
            <h4>// Now</h4>
            <p>
              Freelance, available for B2B &amp; SaaS work. Full‑remote or hybrid. Comfortable owning
              a feature from problem framing to a working build.
            </p>
          </div>
          <div className="reveal" data-d="3">
            <h4>// Details</h4>
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
