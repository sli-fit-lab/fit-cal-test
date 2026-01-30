import React, { useState, useEffect } from 'react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('embed');
        setCustomUrl(url.origin + url.pathname);
      } catch (e) {
        setCustomUrl(window.location.href.split('?')[0]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getEmbedUrl = () => {
    try {
      const url = new URL(customUrl);
      url.searchParams.set('embed', 'true');
      return url.toString();
    } catch (e) {
      return `${customUrl}${customUrl.includes('?') ? '&' : '?'}embed=true`;
    }
  };

  const iframeCode = `<iframe src="${getEmbedUrl()}" width="1200" height="800" style="border:none; border-radius:32px; overflow:hidden;" scrolling="no" title="Interactive Calendar"></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Veröffentlichen & Einbetten</h3>
            <p className="text-xs text-gray-500 mt-1">Nutze diesen Code für dein CMS.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[#135a54] text-white text-[10px] flex items-center justify-center font-bold">1</span>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Public App URL</label>
            </div>
            <input 
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://sli-fit-lab.github.io/fit-cal-test"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#135a54]/20 focus:border-[#135a54] outline-none transition-all"
            />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[#135a54] text-white text-[10px] flex items-center justify-center font-bold">2</span>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Einbettungscode (1200x800)</label>
            </div>
            <div className="relative group">
              <textarea
                readOnly
                value={iframeCode}
                className="w-full h-28 p-4 bg-gray-900 border border-gray-800 rounded-2xl text-[11px] font-mono text-emerald-300 focus:outline-none resize-none"
              />
              <button
                onClick={copyToClipboard}
                className={`absolute bottom-3 right-3 px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#135a54] text-white hover:bg-opacity-90 active:scale-95 shadow-xl shadow-[#135a54]/20'
                }`}
              >
                {copied ? 'Kopiert!' : 'Code kopieren'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#135a54] text-white flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-xl">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <div>
            <p className="text-xs font-bold">CMS Hinweis</p>
            <p className="text-[10px] opacity-80">Der Iframe ist auf exakt 1200px Breite und 800px Höhe optimiert.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedModal;