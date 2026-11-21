import { useEffect, useState } from 'react';
import { Check, Copy, Mail, MessageSquare, X } from 'lucide-react';

interface CollaborationModalProps {
  isOpen: boolean;
  initialSubject?: string;
  onClose: () => void;
}

const TOPICS = [
  'Student Initiative',
  'Tech & Python Collaboration',
  'Creative Design / PDD',
  'Developer Partnership',
];

export function CollaborationModal({ isOpen, initialSubject = '', onClose }: CollaborationModalProps) {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0]);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setMessage(initialSubject);
    }
  }, [initialSubject]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formattedSubject = encodeURIComponent(`[Portfolio] ${selectedTopic}${senderName ? ` — ${senderName}` : ''}`);
  const formattedBody = encodeURIComponent(
    `Hello Bagus Fitra Abdillah,\n\nTopic: ${selectedTopic}\n${senderName ? `From: ${senderName}\n` : ''}\n${message || 'I would like to discuss a potential collaboration with you.'}`
  );

  const mailtoHref = `mailto:bagusabdillah107@gmail.com?subject=${formattedSubject}&body=${formattedBody}`;
  const whatsappHref = `https://wa.me/6285267761853?text=${encodeURIComponent(
    `Hello Bagus, I'm reaching out regarding *${selectedTopic}*${senderName ? ` (${senderName})` : ''}. ${message || ''}`
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('bagusabdillah107@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="collab-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#121212] border border-[#D91E2A]/45 rounded-2xl overflow-hidden shadow-2xl crimson-glow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/10 bg-[#1A1A1A]/60">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D91E2A]">
              Direct Inquiry
            </span>
            <h3
              id="collab-modal-title"
              className="font-condensed text-3xl font-bold uppercase tracking-tight text-white mt-0.5"
            >
              Start a Collaboration
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close collaboration dialog"
            className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-white/10 hover:border-[#D91E2A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Collaboration Focus
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-left border transition-colors cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-[#D91E2A]/15 border-[#D91E2A] text-white'
                      : 'bg-[#1A1A1A] border-white/10 text-neutral-300 hover:border-white/25'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="collab-name"
              className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
            >
              Your Name or Organization
            </label>
            <input
              id="collab-name"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. HIMALA ITPLN / Ahmad"
              className="w-full px-3.5 py-2.5 rounded bg-[#1A1A1A] border border-white/15 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D91E2A] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="collab-message"
              className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
            >
              Project Brief or Note
            </label>
            <textarea
              id="collab-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share timeline, goals, or role details..."
              className="w-full px-3.5 py-2.5 rounded bg-[#1A1A1A] border border-white/15 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D91E2A] transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href={mailtoHref}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#D91E2A] hover:bg-[#FF3342] text-white text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              <span>Send via Email</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1A1A1A] border border-white/20 hover:border-[#D91E2A] text-white text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-[#D91E2A]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <span>bagusabdillah107@gmail.com</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white font-medium transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#D91E2A]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
