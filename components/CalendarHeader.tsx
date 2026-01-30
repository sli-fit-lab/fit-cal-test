import React from 'react';
import { MONTH_NAMES, CURRENT_YEAR } from '../constants';

interface CalendarHeaderProps {
  currentMonth: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth,
  onToday,
  canGoPrev,
  canGoNext
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#dddddd] sticky top-0 bg-white z-10">
      <div className="flex flex-col">
        <h2 className="text-4xl font-bold text-[#135a54] tracking-tight leading-none font-header">
          {MONTH_NAMES[currentMonth]}
        </h2>
        <span className="text-[9px] font-bold text-[#6f817f] uppercase tracking-[0.2em] mt-2">{CURRENT_YEAR}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onToday}
          className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#545454] hover:text-[#135a54] transition-all border border-[#dddddd] rounded-full hover:bg-[#FAFAF9]"
        >
          Heute
        </button>

        <div className="flex items-center bg-[#dddddd]/30 p-0.5 rounded-lg">
          <button
            onClick={onPrevMonth}
            disabled={!canGoPrev}
            className={`p-1.5 rounded-md transition-all ${
              canGoPrev ? 'text-[#135a54] hover:bg-white hover:shadow-sm' : 'text-[#6f817f]/30 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={onNextMonth}
            disabled={!canGoNext}
            className={`p-1.5 rounded-md transition-all ${
              canGoNext ? 'text-[#135a54] hover:bg-white hover:shadow-sm' : 'text-[#6f817f]/30 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;