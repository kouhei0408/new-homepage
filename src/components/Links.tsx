export default function Links() {
  return (
    <div className="panel rise">
      <h2>Links</h2>
      <p className="muted">SNSはこちら。気軽にフォローどうぞ。</p>
      <div className="grid links" style={{ gap: 14 }}>
        <a className="card link-item hover-lift" style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'center', gap: 14, padding: 14 }} href="https://x.com/toriba14" target="_blank" rel="noopener">
          <div className="logo x">X</div>
          <div>
            <div className="title">X (Twitter)</div>
            <div className="muted handle">@toriba14</div>
          </div>
        </a>
        <a className="card link-item hover-lift" style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'center', gap: 14, padding: 14 }} href="https://instagram.com/toriba14" target="_blank" rel="noopener">
          <div className="logo ig" />
          <div>
            <div className="title">Instagram</div>
            <div className="muted handle">@toriba14</div>
          </div>
        </a>
      </div>
    </div>
  );
}