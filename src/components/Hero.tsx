import Image from 'next/image';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Hero() {
    return (
        <>
            <div className="lead">
                <span className="tag"><span className="glow-dot" /> 高校生 / toriba14</span>
                <h1>Kouheiのホームページ</h1>
                <p className="subtitle">
                    作ったもの、ハマっていることをまとめた個人ページ
                    比較的自由に組めるようにしてます
                </p>
                <div className="actions">
                    <a className="btn accent" href="#about">もっと見る</a>
                    <a className="btn" href="https://x.com/toriba14" target="_blank" rel="noopener">
                        <FaXTwitter style={{ marginRight: '8px' }} /> X(旧Twitter) ↗
                    </a>
                    <a className="btn" href="https://instagram.com/toriba14" target="_blank" rel="noopener">
                        <FaInstagram style={{ marginRight: '8px' }} /> Instagram ↗
                    </a>
                </div>
            </div>
            <div className="avatar-wrap">
                <div className="avatar tilt">
                    <Image src="/assets/avatar.jpg" alt="toriba14 avatar" width={720} height={720} priority />
                </div>
                <div className="orb s" />
                <div className="orb l" />
            </div>
        </>
    );
}