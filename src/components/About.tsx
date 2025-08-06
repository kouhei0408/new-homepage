type Profile = {
    software: string[];
    intro: string;
    likes: string[];
    doing: string[];
    tools: string[];
    bgm: string[];
    favorites: string[];
    note: string;
};

export default function About({ profile }: { profile: Profile }) {
    return (
        <div className="panel rise">
            <h2>About me</h2>
            <p className="muted">{profile.intro}</p>
            <div className="about-grid">
                <div className="list">
                    <div className="item hover-lift">
                        <div className="icon">★</div>
                        <div>
                            <strong>好きなこと</strong>
                            <div className="text">{profile.likes.join(' / ')}</div>
                        </div>
                    </div>
                    <div className="item hover-lift">
                        <div className="icon">⌘</div>
                        <div>
                            <strong>今やってること</strong>
                            <div className="text">{profile.doing.join('、')}</div>
                        </div>
                    </div>
                    <div className="item hover-lift">
                        <div className="icon">⚡</div>
                        <div>
                            <strong>ツール</strong>
                            <div className="text">{profile.tools.join(' / ')}</div>
                        </div>
                    </div>
                    <div className="item hover-lift">
                        <div className="icon">⚡</div>
                        <div>
                            <strong>使えるソフト,言語とか</strong>
                            <div className="text">{profile.software.join(' / ')}</div>
                        </div>
                    </div>
                </div>
                <div className="list">
                    <div className="item hover-lift">
                        <div className="icon">🎧</div>
                        <div>
                            <strong>最近聴いてる曲</strong>
                            <div className="text">{profile.bgm.join('/')}</div>
                        </div>
                    </div>
                    <div className="item hover-lift">
                        <div className="icon">📷</div>
                        <div>
                            <strong>好きな被写体</strong>
                            <div className="text">{profile.favorites.join('/')}</div>
                        </div>
                    </div>
                    <div className="item hover-lift">
                        <div className="icon">🌙</div>
                        <div>
                            <strong>ひとこと</strong>
                            <div className="text">{profile.note}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}