import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Links() {
  return (
    <div className="panel rise">
      <h2>Links</h2>
      <p className="muted">SNS/相互リンクはこちら。</p>
      <div className="grid links" style={{ gap: 14 }}>
        <a className="card link-item hover-lift" style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'center', gap: 14, padding: 14 }} href="https://x.com/toriba14" target="_blank" rel="noopener">
          <div className="logo x">
            <FaXTwitter size={24} />
          </div>
          <div>
            <div className="title">X (Twitter)</div>
            <div className="muted handle">@toriba14</div>
          </div>
        </a>
        <a className="card link-item hover-lift" style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'center', gap: 14, padding: 14 }} href="https://instagram.com/toriba14" target="_blank" rel="noopener">
          <div className="logo ig">
            <FaInstagram size={24} />
          </div>
          <div>
            <div className="title">Instagram</div>
            <div className="muted handle">@toriba14</div>
          </div>
        </a>
        <a className="card link-item hover-lift" style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'center', gap: 14, padding: 14 }} href="https://friend-website.com" target="_blank" rel="noopener">
          <div className="logo friend">
            <span role="img" aria-label="friend">🌐</span>
          </div>
          <div>
            <div className="title">友達のWebサイト</div>
            <div className="muted handle">https://spacer4719.f5.si/</div>
          </div>
        </a>
      </div>
    </div>
  );
}