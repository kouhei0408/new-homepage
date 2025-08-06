'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

type Item = { src: string; title: string; span?: number };

export default function Gallery({ items = [] }: { items?: Item[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Item | null>(null);

  // スクロールロック
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escで閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const onOpen = (item: Item) => {
    setActive(item);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    // 退場アニメ(200ms)が終わってからactiveをnullに
    setTimeout(() => setActive(null), 300);
  };

  return (
    <>
      <h2>Gallery / Works</h2>
      <p className="muted">最近のスナップや作った画像など。
        趣味が多め。
      </p>

      <div className="grid">
        {items.map((it, i) => (
          <article
            key={i}
            className="card hover-zoom"
            style={{ gridColumn: `span ${it.span ?? 4}` }}
          >
            <button
              type="button"
              className="thumb-btn"
              aria-label={`${it.title} を拡大表示`}
              onClick={() => onOpen(it)}
            >
              <AspectRatioThumb src={it.src} alt={it.title} />
            </button>
            <div className="body">{it.title}</div>
          </article>
        ))}
      </div>

      {typeof window !== 'undefined' &&
        createPortal(
          <Modal open={open} onClose={onClose} item={active} />,
          document.body
        )}

      <style jsx>{`
        .thumb-btn {
          display: block;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: zoom-in;
          width: 100%;
          text-align: inherit;
        }
      `}</style>
    </>
  );
}

/**
 * サムネイルを画像のアスペクト比に合わせて表示するためのカスタムコンポーネント
 */
function AspectRatioThumb({ src, alt }: { src: string; alt: string }) {
  const [ratio, setRatio] = useState<number | null>(null);

  // デフォルトは1:1、画像読み込み後に正しいアスペクト比に
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio ? `${ratio}` : '1 / 1',
        background: '#f4f4f4',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 600px) 100vw, 25vw"
        className="thumb"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
        onLoadingComplete={img => {
          if (img.naturalWidth && img.naturalHeight) {
            setRatio(img.naturalWidth / img.naturalHeight);
          }
        }}
      />
      <style jsx global>{`
        .thumb {
          transition: transform 0.2s;
        }
        .hover-zoom:hover .thumb {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}

function Modal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: Item | null;
}) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      // 2段階でenter発火を確実に
      let raf1 = 0, raf2 = 0;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setMounted(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    } else {
      setMounted(false); // leaveへ
      const t = setTimeout(() => setVisible(false), 300); // CSSと合わせる
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!visible || !item) return null;

  // open中かつ mounted=true で enter
  const state = open && mounted ? 'enter' : open ? '' : 'leave';

  return (
    <>
      <div role="dialog" aria-modal="true" className={`modal-root ${state}`}>
        <div className="backdrop" onClick={onClose} />
        <div className="content" role="document">
          <button type="button" aria-label="Close" className="icon-btn close" onClick={onClose}>
            {/* ミニマルなSVGアイコン（×） */}
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="img-wrap">
            <div className="img-inner">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="90vw"
                className="img"
                priority
                style={{ objectFit: 'contain', width: '100%', height: '100%', position: 'absolute', background: 'transparent' }}
              />
            </div>
          </div>

          <div className="caption">{item.title}</div>
        </div>

        <style jsx>{`
          .modal-root {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: grid;
            place-items: center;
            padding: 0;
          }
          .backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(2px);
            opacity: 0;
            transition: opacity 300ms ease-out;
          }
          .content {
            position: relative;
            width: min(90vw, 1100px);
            max-height: 90vh;
            z-index: 1;
            opacity: 0;
            transform: translateY(8px) scale(0.95);
            transition: transform 300ms ease-out, opacity 300ms ease-out;
            padding: 0;
          }
          .img-wrap {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: min(80vh, 70vw);
            background: transparent;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 12px 32px rgba(0,0,0,0.4);
            margin: 0;
          }
          .img-inner {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            background: transparent;
          }
          .img {
            object-fit: contain !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100%;
            max-height: 100%;
            position: absolute !important;
            left: 0;
            top: 0;
            background: transparent !important;
          }
          .caption { margin-top: 10px; color: #fff; text-align: center; font-size: 0.95rem; opacity: 0.95; }

          /* 入場（ゆっくりふわっと） */
          .modal-root.enter .backdrop { opacity: 1; }
          .modal-root.enter .content { opacity: 1; transform: translateY(0) scale(1); }

          /* 退場 */
          .modal-root.leave .backdrop { opacity: 0; }
          .modal-root.leave .content { opacity: 0; transform: translateY(8px) scale(0.95); }

          /* アイコンボタン（×） */
          .icon-btn {
            position: absolute;
            right: 8px;
            top: 8px;
            display: inline-grid;
            place-items: center;
            width: 36px;
            height: 36px;
            padding: 0;
            border: none;
            border-radius: 10px;
            background: rgba(20,20,20,0.55);
            color: rgba(255,255,255,0.9);
            backdrop-filter: saturate(120%) blur(4px);
            box-shadow: 0 2px 10px rgba(0,0,0,0.25);
            transition: background 160ms ease, transform 120ms ease, opacity 160ms ease;
            cursor: pointer;
          }
          .icon-btn:hover { background: rgba(30,30,30,0.65); }
          .icon-btn:active { transform: scale(0.96); }
          .icon-btn:focus-visible {
            outline: 2px solid rgba(255,255,255,0.6);
            outline-offset: 2px;
          }

          @media (max-width: 520px) {
            .icon-btn { right: 6px; top: 6px; width: 32px; height: 32px; border-radius: 8px; }
          }
        `}</style>
      </div>
    </>
  );
}