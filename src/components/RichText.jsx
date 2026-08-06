// Mini rich-text partagé : **gras** → <strong>, *accent* → surlignage couleur,
// `touche` → <kbd>. Suffit pour le contenu éditorial (études de cas, home).
// Extrait de CaseStudy.jsx pour être réutilisé par les sections de la home.
export default function RichText({ text }) {
  if (text == null) return null
  if (typeof text !== 'string') return text
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*') && p.endsWith('*'))
      return (
        <span className="serif-it" key={i}>
          {p.slice(1, -1)}
        </span>
      )
    if (p.startsWith('`') && p.endsWith('`')) return <kbd key={i}>{p.slice(1, -1)}</kbd>
    return p
  })
}
