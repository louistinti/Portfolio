export default function Marquee() {
  const Item = () => (
    <span>
      Product Design <span className="dot">◆</span> UX / UI <span className="dot">◆</span> AI Builder{' '}
      <span className="dot">◆</span> B2B &amp; SaaS <span className="dot">◆</span>{' '}
      <span className="o">Systems</span> <span className="dot">◆</span>
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
