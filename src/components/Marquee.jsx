export default function Marquee() {
  const Item = () => (
    <span>
      <span className="o">Product Design</span> <span className="dot">◆</span> UX / UI{' '}
      <span className="dot">◆</span> <span className="o">AI Builder</span>{' '}
      <span className="dot">◆</span> B2B &amp; SaaS <span className="dot">◆</span>{' '}
      <span className="o">Design systems</span> <span className="dot">◆</span> Automation{' '}
      <span className="dot">◆</span>
    </span>
  )

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <Item />
        <Item />
      </div>
    </div>
  )
}
