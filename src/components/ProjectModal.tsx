import { useEffect, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onCollaborate: (subject: string) => void;
}

export function ProjectModal({ project, onClose, onCollaborate }: ProjectModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  useEffect(() => {
    setCopiedCode(false);
  }, [project]);

  if (!project) return null;

  const handleCopyCode = async () => {
    if (!project.codeSnippet) return;
    try {
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // Clipboard fallback ignored silently
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#121212] border border-[#D91E2A]/40 rounded-2xl overflow-hidden shadow-2xl crimson-glow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/10 bg-[#1A1A1A]/60">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-[#D91E2A]">
              <span>Project {project.number}</span>
              <span aria-hidden="true" className="text-neutral-500">·</span>
              <span className="text-neutral-400">{project.organization}</span>
              <span aria-hidden="true" className="text-neutral-500">·</span>
              <span className="text-neutral-400">{project.timeframe}</span>
            </div>
            <h3
              id="project-modal-title"
              className="font-condensed text-3xl font-bold uppercase tracking-tight text-white mt-1"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-white/10 hover:border-[#D91E2A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Role &amp; Context</p>
            <p className="text-sm font-semibold text-white">{project.role}</p>
            <p className="text-sm text-[#9A9A9A] mt-2 leading-relaxed">{project.summary}</p>
          </div>

          {project.codeSnippet && (
            <div className="rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/40">
                <span className="text-[11px] font-mono text-neutral-400">algorithm_solver.py · Python 3.12</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D91E2A]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Key Deliverables</p>
            <ul className="space-y-2.5">
              {project.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-200 leading-relaxed">
                  <span className="text-[#D91E2A] font-bold mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Tools &amp; Competencies</p>
            <p className="text-xs text-neutral-300 font-medium tracking-wide">
              {project.tools.join('  ·  ')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#1A1A1A]/40 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
            {project.footerTag}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/15 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-white/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onCollaborate(`Collaboration regarding ${project.title}`);
              }}
              className="px-5 py-2 rounded-full bg-[#D91E2A] hover:bg-[#FF3342] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Discuss Similar Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
