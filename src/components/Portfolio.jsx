import { useEffect } from 'react'
import { useInteractions } from '../hooks/useInteractions.js'
import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import Marquee from './Marquee.jsx'
import About from './About.jsx'
import Work from './Work.jsx'
import Skills from './Skills.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'

export default function Portfolio() {
  useInteractions()

  // Arrivée depuis l'étude de cas : on défile vers la section visée
  // (#work via « All work »), sinon on repart du haut.
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    const el = id && document.getElementById(id)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    else window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
