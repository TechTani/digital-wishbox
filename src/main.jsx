import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChevronDown, Heart, Music2, Volume2, VolumeX } from "lucide-react";
import "./styles.css";
import duduBubu01 from "./assets/dudu-bubu-01.jpg";
import duduBubu02 from "./assets/dudu-bubu-02.jpg";
import duduBubu03 from "./assets/dudu-bubu-03.jpg";
import duduBubu04 from "./assets/dudu-bubu-04.jpg";
import duduBubu05 from "./assets/dudu-bubu-05.jpg";
import duduBubu06 from "./assets/dudu-bubu-06.jpg";
import duduBubu07 from "./assets/dudu-bubu-07.jpg";
import duduBubu08 from "./assets/dudu-bubu-08.jpg";
import duduBubu09 from "./assets/dudu-bubu-09.jpg";
import duduBubu10 from "./assets/dudu-bubu-10.jpg";

const reasons = [
  { text: "You always know how to make me smile, even on my darkest days.", image: duduBubu01 },
  { text: "The way you look at me makes me feel like the most special person in the world.", image: duduBubu02 },
  { text: "You give the best hugs that instantly melt all my worries away.", image: duduBubu03 },
  { text: "You make even the smallest moments feel magical and unforgettable.", image: duduBubu04 },
  { text: "You support my dreams and always believe in me, even when I doubt myself.", image: duduBubu05 },
  { text: "Your laugh is my absolute favorite sound in the whole universe.", image: duduBubu06 },
  { text: "Even doing ordinary things with you feels special.", image: duduBubu07 },
  { text: "You are my favorite person to spend quiet moments with.", image: duduBubu08 },
  { text: "You make me feel loved, safe, and completely understood.", image: duduBubu09 },
  { text: "No matter what happens, I will always choose you. ❤️", image: duduBubu10 }
];

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
          <div className="hero-art photo-art"><img src={duduBubu04} alt="Dudu and Bubu" /></div>
          <h1>Reasons Why I<br/><span>Love You</span> <span className="sparkle">💖</span></h1>
          <p className="from">From <b>Aditya</b> to <b>Samyuktha</b></p>
          <button className="primary" onClick={begin}>Start Exploring <ChevronDown/></button>
        </section>

        <section ref={reasonsRef} className={`reasons section ${started ? "started" : ""}`}>
          <Cloud className="c4"/>
          <h2>Because...</h2>
          <div className="reason-stage">
            <article className="reason-card" key={reason}>
              <div className="number">#{reason + 1}</div>
              <img className="reason-image" src={reasons[reason].image} alt="Dudu and Bubu" />
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
            <div className="love-art photo-art"><img src={duduBubu10} alt="Dudu and Bubu" /></div>
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
            <p>Aditya ❤️ Samyuktha</p>
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
