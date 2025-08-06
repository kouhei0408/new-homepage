import Image from 'next/image';

export default function Hero() {
    return (
        <>
            <div className="lead">
                <span className="tag"><span className="glow-dot" /> 高校生 / toriba14</span>
                <h1>やりたいようにやる</h1>
                <p className="subtitle">
                    作ったもの、ハマっていることをまとめた個人ページ。
                    なんでもいけるような感じにしました
                </p>
                <div className="actions">
                    <a className="btn accent" href="#about">もっと見る</a>
                    <a className="btn" href="https://x.com/toriba14" target="_blank" rel="noopener">X を見る ↗</a>
                    <a className="btn" href="https://instagram.com/toriba14" target="_blank" rel="noopener">Instagram ↗</a>
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