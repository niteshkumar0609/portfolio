import { useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowDownToLine, ArrowUpRight, Braces, Check, Code2, Layers3, Layout, Monitor, MousePointer2, Smartphone, Sparkles, Star } from 'lucide-react'
import Tilt from './Tilt'

const colors = [
  { name: 'Violet', value: '#bea6ff' },
  { name: 'Blue', value: '#9cc9ff' },
  { name: 'Mint', value: '#9fe2c5' },
]
const pattern = `import { useState } from 'react'

export function SaveButton() {
  const [saved, setSaved] = useState(false)

  return (
    <button
      aria-pressed={saved}
      onClick={() => setSaved(!saved)}
    >
      {saved ? 'Saved' : 'Save for later'}
    </button>
  )
}`

export default function InterfaceLab() {
  const [accent, setAccent] = useState(colors[0])
  const [mobile, setMobile] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [depth, setDepth] = useState(true)
  const reduced = useReducedMotion()

  return <section id="playground" className="section interface-section" aria-labelledby="lab-title">
    <div className="container">
      <div className="lab-heading"><div><div className="section-label">INTERACTIVE / BUILT FOR THIS PORTFOLIO</div><h2 id="lab-title">Don’t just look.<br /><span>Try the interface.</span></h2></div><p>A little frontend craft you can actually interact with.<br />React state, responsive layouts, and considered motion.</p></div>
      <div className="interface-lab" style={{ '--lab-accent': accent.value } as CSSProperties}>
        <aside className="lab-controls" aria-label="Interface customization">
          <span className="lab-control-kicker"><Sparkles size={15} /> INTERFACE LAB</span>
          <h3>Small details.<br />A better experience.</h3>
          <p>This is a live component built for this portfolio. Adjust the design and explore how it responds.</p>
          <div className="lab-control-group"><span>01 / Accent color</span><div className="lab-swatches" role="group" aria-label="Accent color">{colors.map(color => <button key={color.name} aria-pressed={color.name === accent.name} aria-label={`${color.name} accent`} onClick={() => setAccent(color)} style={{ '--swatch': color.value } as CSSProperties}><i />{color.name}{color.name === accent.name && <Check size={12} />}</button>)}</div></div>
          <div className="lab-control-group"><span>02 / Responsive layout</span><div className="lab-segment" role="group" aria-label="Preview layout"><button aria-pressed={!mobile} onClick={() => setMobile(false)}><Monitor size={15} />Desktop</button><button aria-pressed={mobile} onClick={() => setMobile(true)}><Smartphone size={15} />Mobile</button></div></div>
          <div className="lab-depth-control"><div><Layers3 size={16} /><span>Perspective interaction<small>{reduced ? 'Reduced motion is respected' : 'Move your cursor over the preview'}</small></span></div><button role="switch" aria-label="Enable 3D perspective" aria-checked={depth} onClick={() => setDepth(!depth)}><i /></button></div>
          <div className="lab-built"><Code2 size={14} />React · TypeScript · Tailwind · Motion</div>
        </aside>
        <div className={`lab-stage ${depth ? 'depth-on' : ''}`}>
          <div className="lab-stage-grid" aria-hidden="true" />
          <div className="lab-stage-top"><span><i /> LIVE COMPONENT</span><div className="lab-view-tabs" role="group" aria-label="Component view"><button aria-pressed={!showCode} onClick={() => setShowCode(false)}><Layout size={13} />Preview</button><button aria-pressed={showCode} onClick={() => setShowCode(true)}><Braces size={13} />Pattern</button></div></div>
          <Tilt className={`lab-preview ${mobile ? 'preview-mobile' : ''}`} enabled={depth && !showCode}>
            <div className="lab-window">
              <div className="lab-browser-bar"><span className="window-dots"><i /><i /><i /></span><span>{showCode ? 'SaveButton.tsx / component pattern' : 'portfolio / live interface study'}</span><Code2 size={13} /></div>
              <AnimatePresence mode="wait" initial={false}>
                {showCode ? <m.pre key="code" className="lab-code" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><code>{pattern}</code></m.pre> : <m.div key="preview" className="lab-preview-content" initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="mini-nav"><strong>nk<span>.</span></strong><span>DESIGN × ENGINEERING</span><span className="mini-status"><i /> React</span></div>
                  <div className="mini-content"><div className="mini-copy"><div className="mini-eyebrow">THIS PORTFOLIO, IN MINIATURE</div><h3>Interfaces with<br /><span>intention.</span></h3><p>A responsive React experience with reusable components, accessible controls, and thoughtful motion.</p><a href="/projects/">Explore the work<ArrowUpRight size={13} /></a></div><div className="mini-sculpture" aria-hidden="true"><div className="sculpture-orbit orbit-one" /><div className="sculpture-orbit orbit-two" /><div className="sculpture-core"><Code2 size={29} /></div><span className="sculpture-point" /></div></div>
                  <div className="mini-features"><span><Layout size={14} />Responsive</span><span><MousePointer2 size={14} />Interactive</span><span><Sparkles size={14} />Considered</span></div>
                  <div className="mini-bottom"><span>Try a component state →</span><button aria-pressed={saved} onClick={() => setSaved(!saved)}><Star size={13} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved' : 'Save for later'}</button></div>
                </m.div>}
              </AnimatePresence>
            </div>
          </Tilt>
          <div className="lab-stage-bottom"><span aria-live="polite">{accent.name} accent · {mobile ? 'Mobile' : 'Desktop'} layout{saved ? ' · Saved' : ''}</span><span>REAL UI. REAL INTERACTIONS.</span></div>
        </div>
      </div>
      <div className="frontend-proof"><div><span className="proof-icon"><Code2 size={20} /></span><span><strong>The portfolio is a project, too.</strong><small>React + TypeScript components, responsive CSS, keyboard-accessible controls, and browser-tested interactions.</small></span></div><a href="https://github.com/niteshkumar0609/portfolio" target="_blank" rel="noopener noreferrer">Explore the source<ArrowUpRight size={16} /></a><a href="/resume.pdf" download="Nitesh-Kumar-Resume.pdf" className="proof-resume" aria-label="Download resume PDF"><ArrowDownToLine size={17} /></a></div>
    </div>
  </section>
}
