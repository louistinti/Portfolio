import { useEffect, useState } from 'react'
import { useInteractions } from '../hooks/useInteractions.js'
import { useReveals } from '../anim/useReveals.js'
import { scrollToTarget } from '../anim/useLenis.js'
import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import Marquee from './Marquee.jsx'
import About from './About.jsx'
import Work from './Work.jsx'
import Skills from './Skills.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'
import ContactModal from './ContactModal.jsx'

export default function Portfolio() {
  useInteractions()
  useReveals()

  // État de la modale "Let's talk" remonté ici pour que le Nav (bouton Contact
  // du header) et la section Contact partagent la même modale — le bouton du
  // haut l'ouvre directement, sans faire défiler jusqu'en bas.
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = () => setContactOpen(true)

  // Arrivée depuis l'étude de cas : on défile vers la section visée
  // (#work via « All work »), sinon on repart du haut. Immédiat : ce
  // repositionnement se joue derrière le rideau de transition.
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    const el = id && document.getElementById(id)
    if (el) requestAnimationFrame(() => scrollToTarget(el, { immediate: true }))
    else scrollToTarget(0, { immediate: true })
  }, [])

  return (
    <>
      <Nav onContact={openContact} />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Contact onContact={openContact} />
      </main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
