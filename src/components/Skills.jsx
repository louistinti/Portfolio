import { useContent } from '../hooks/useLang.jsx'

export default function Skills() {
  const { skills, tools, ui } = useContent()
  return (
    <section className="section" id="skills">
      <div className="section-head">
        <h2>{ui.skills.title}</h2>
        <span className="section-idx">(04)</span>
      </div>

      <div className="skills-grid">
        <div className="skill-list">
          {skills.map((s) => (
            <div className="skill-row reveal" key={s.n}>
              <span className="n">{s.n}</span>
              <span className="d">{s.d}</span>
            </div>
          ))}
        </div>

        <div className="tools-box reveal" data-d="1">
          <h4>{ui.skills.toolbox}</h4>
          <div className="tool-tags">
            {tools.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
