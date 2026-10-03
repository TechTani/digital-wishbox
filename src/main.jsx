import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChevronDown, Heart, Music2, Volume2, VolumeX } from "lucide-react";
import "./styles.css";

const reasons = [
  {
    text: "You always know how to make me smile, even on my darkest days.",
    art: "hug"
  },
  {
    text: "The way you look at me makes me feel like the most special person in the world.",
    art: "look"
  },
  {
    text: "You give the best hugs that instantly melt all my worries away.",
    art: "hug2"
  },
  {
    text: "You make even the smallest moments feel magical and unforgettable.",
    art: "kiss"
  },
  {
    text: "You support my dreams and always believe in me, even when I doubt myself.",
    art: "support"
  },
  {
    text: "Your laugh is my absolute favorite sound in the whole universe.",
    art: "laugh"
  }
];

function BearArt({ type = "hug" }) {
  const brown = "#d99b7d";
  const cream = "#fffaf6";
  const line = "#6f3926";
  const blush = "#f6bdc4";

  const variants = {
    hug: { bearX: 150, whiteX: 92, brownHead: true },
    look: { bearX: 148, whiteX: 91, brownHead: true },
    hug2: { bearX: 145, whiteX: 98, brownHead: true },
    kiss: { bearX: 146, whiteX: 91, brownHead: true },
    support: { bearX: 145, whiteX: 92, brownHead: true },
    laugh: { bearX: 147, whiteX: 93, brownHead: true }
  };
  const v = variants[type] || variants.hug;

  return (
    <svg className="bear-art" viewBox="0 0 260 210" aria-hidden="true">
      <g stroke={line} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx={v.bearX+4} cy="67" r="38" fill={brown}/>
        <circle cx={v.bearX-19} cy="35" r="13" fill={brown}/>
        <circle cx={v.bearX+25} cy="35" r="13" fill={brown}/>
        <circle cx={v.bearX+4} cy="67" r="32" fill={brown}/>
        <ellipse cx={v.bearX+7} cy="124" rx="35" ry="52" fill={brown}/>
        <circle cx={v.bearX-6} cy="63" r="5" fill={line} stroke="none"/>
        <circle cx={v.bearX+17} cy="63" r="5" fill={line} stroke="none"/>
        <circle cx={v.bearX+2} cy="76" r="6" fill="#f1c768" stroke="none"/>

        <circle cx={v.whiteX} cy="80" r="43" fill={cream}/>
        <circle cx={v.whiteX-25} cy="45" r="14" fill={cream}/>
        <circle cx={v.whiteX+22} cy="45" r="14" fill={cream}/>
        <ellipse cx={v.whiteX-2} cy="137" rx="38" ry="54" fill={cream}/>
        <circle cx={v.whiteX-13} cy="76" r="5" fill={line} stroke="none"/>
        <circle cx={v.whiteX+12} cy="76" r="5" fill={line} stroke="none"/>
        <ellipse cx={v.whiteX} cy="91" rx="6" ry="8" fill="#f17b83" stroke="none"/>
        <circle cx={v.whiteX-16} cy="93" r="7" fill={blush} stroke="none" opacity=".9"/>
        <circle cx={v.whiteX+16} cy="93" r="7" fill={blush} stroke="none" opacity=".9"/>

        <path d="M115 115 Q138 120 151 106" fill="none"/>
        <path d="M177 112 Q193 121 206 112" fill="none"/>
        <path d="M108 132 Q88 142 77 131" fill="none"/>
        <path d="M176 137 Q194 151 211 143" fill="none"/>
      </g>
      <path d="M45 35 C38 19 60 10 68 27 C76 10 98 19 89 37 C80 51 62 58 45 35Z" fill="#ff6e79"/>
      <path d="M214 26 C208 13 224 8 231 21 C238 8 253 15 247 29 C241 39 225 43 214 26Z" fill="#ff6e79"/>
    </svg>
  );
}

function Cloud({ className = "" }) {
  return <div className={`cloud ${className}`}><span/><span/><span/></div>;
}

function Confetti({ active }) {
  if (!active) return null;
  return <div className="confetti" aria-hidden="true">
    {Array.from({length: 80}, (_, i) => <i key={i} style={{
      left: `${(i*37)%100}%`,
      animationDelay: `${(i%18)*0.05}s`,
      transform: `rotate(${(i*47)%360}deg)`
    }} />)}
  </div>;
}

function App() {
  const [started, setStarted] = useState(false);
  const [reason, setReason] = useState(0);
  const [love, setLove] = useState(50);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const reasonsRef = useRef(null);
  const loveRef = useRef(null);
  const finalRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const nextReason = () => {
    setReason((r) => (r + 1) % reasons.length);
  };

  const begin = () => {
    setStarted(true);
    setTimeout(() => scrollTo(reasonsRef), 80);
  };

  const nextToLove = () => {
    setCelebrate(true);
    setTimeout(() => {
      scrollTo(loveRef);
      setCelebrate(false);
    }, 300);
  };

  const finalSurprise = () => {
    setCelebrate(true);
    setTimeout(() => {
      scrollTo(finalRef);
      setCelebrate(false);
    }, 300);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" && started) nextReason();
      if (e.key === "Escape") setEnvelopeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand"><span className="brand-heart"><Heart fill="currentColor" size={19}/></span> Digital Wishbox</div>
        <button className="make-btn" onClick={() => window.scrollTo({top:0, behavior:"smooth"})}>Make Yours</button>
      </header>

      <main>
        <section className="hero section">
          <Cloud className="c1"/><Cloud className="c2"/><Cloud className="c3"/>
          <div className="hero-art"><BearArt type="hug"/></div>
          <h1>Reasons Why I<br/><span>Love You</span> <span className="sparkle">💖</span></h1>
          <p className="from">From <b>BUBU</b> to <b>DUDU</b></p>
          <button className="primary" onClick={begin}>Start Exploring <ChevronDown/></button>
        </section>

        <section ref={reasonsRef} className={`reasons section ${started ? "started" : ""}`}>
          <Cloud className="c4"/>
          <h2>Because...</h2>
          <div className="reason-stage">
            <article className="reason-card" key={reason}>
              <div className="number">#{reason + 1}</div>
              <BearArt type={reasons[reason].art}/>
              <p>{reasons[reason].text}</p>
              <small>♡ Swipe me!</small>
            </article>
          </div>
          <button className="primary" onClick={nextReason}>Next Surprise <ChevronDown/></button>
          <div className="reason-dots">
            {reasons.map((_, i) => <button key={i} className={i === reason ? "active":""} onClick={() => setReason(i)} aria-label={`Reason ${i+1}`}/>)}
          </div>
        </section>

        <section className="million section">
          <div className="million-card">
            <h2>And a million<br/>more reasons!</h2>
            <div className="big-heart">💖</div>
          </div>
          <button className="primary" onClick={nextToLove}>Next Surprise <ChevronDown/></button>
        </section>

        <section ref={loveRef} className="love section">
          <Cloud className="c5"/>
          <div className="love-card">
            <h2>How much do<br/>you love me?</h2>
            <div className="slider-wrap">
              <input aria-label="How much do you love me?" type="range" min="0" max="100" value={love} onChange={e => setLove(+e.target.value)} />
            </div>
            <div className="love-answer">
              {love < 25 ? "A little bit..." : love < 55 ? "A whole lot! 💗" : love < 80 ? "To the moon! 🚀" : "INFINITY! 💖"}
            </div>
            <div className="love-art"><BearArt type="kiss"/></div>
            <div className="infinity">{love >= 80 ? "INFINITY! 💖" : `${love}% 💗`}</div>
          </div>
          <button className="primary" onClick={finalSurprise}>Final Surprise <ChevronDown/></button>
        </section>

        <section ref={finalRef} className="envelopes section">
          <div className="envelope-grid">
            <button className={`envelope ${envelopeOpen ? "opened":""}`} onClick={() => setEnvelopeOpen(v=>!v)}>
              <div className="env-flap"/>
              <div className="env-paper">I love you more than words can say. I'm always just a text or call away. 💕</div>
              <div className="env-label"><strong>Open When...</strong><span>You miss me 🥺</span></div>
            </button>
            <button className="envelope" onClick={() => setEnvelopeOpen(true)}>
              <div className="env-flap"/>
              <div className="env-paper">Whenever the world feels heavy, remember you never have to face it alone. ❤️</div>
              <div className="env-label"><strong>Open When...</strong><span>You need a hug 🫂</span></div>
            </button>
          </div>
          <div className="forever">
            <h2>Forever &<br/>Always ❤️</h2>
            <p>TANI ❤️ LOVE</p>
          </div>
        </section>
      </main>

      <button className="sound" onClick={() => setSound(v=>!v)} aria-label="Toggle music">
        {sound ? <Volume2 size={20}/> : <VolumeX size={20}/>}
      </button>
      <Confetti active={celebrate}/>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
