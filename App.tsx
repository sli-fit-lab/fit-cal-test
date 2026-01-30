import React, { useState, useMemo, useEffect } from 'react';
import CalendarHeader from './components/CalendarHeader';
import EventPanel from './components/EventPanel';
import EmbedModal from './components/EmbedModal';
import { CURRENT_YEAR, WEEKDAYS, DEFAULT_EVENTS } from './constants';
import { CalendarEvent, DayInfo } from './types';

const App: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const eventsMap = useMemo(() => {
    const map = new Map<string, CalendarEvent>();
    DEFAULT_EVENTS.forEach(event => map.set(event.date, event));
    return map;
  }, []);

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
  };

  const daysInMonth = useMemo((): DayInfo[] => {
    const days: DayInfo[] = [];
    const firstDay = new Date(CURRENT_YEAR, currentMonth, 1);
    const lastDay = new Date(CURRENT_YEAR, currentMonth + 1, 0);
    const today = new Date();
    
    let startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(CURRENT_YEAR, currentMonth, -i);
      days.push({ date, isCurrentMonth: false, isToday: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(CURRENT_YEAR, currentMonth, i);
      const isoStr = date.toISOString().split('T')[0];
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
        event: eventsMap.get(isoStr)
      });
    }

    const endPadding = 42 - days.length;
    for (let i = 1; i <= endPadding; i++) {
      const date = new Date(CURRENT_YEAR, currentMonth + 1, i);
      days.push({ date, isCurrentMonth: false, isToday: false });
    }

    return days;
  }, [currentMonth, eventsMap]);

  const selectedEvent = selectedDate ? eventsMap.get(selectedDate.toISOString().split('T')[0]) : undefined;

  return (
    <div className="w-[1200px] h-[800px] bg-[#FAFAF9] flex items-center justify-center overflow-hidden mx-auto">
      {/* Container: 1000px Breite, 600px Höhe */}
      <div className="w-[1000px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(19,90,84,0.15)] border border-[#dddddd] flex flex-col lg:flex-row overflow-hidden ring-1 ring-[#135a54]/5">
        
        {/* Kalender-Hauptbereich */}
        <div className="flex-1 flex flex-col p-10 bg-white relative">
          <CalendarHeader 
            currentMonth={currentMonth} 
            onPrevMonth={() => currentMonth > 0 && setCurrentMonth(m => m - 1)} 
            onNextMonth={() => currentMonth < 11 && setCurrentMonth(m => m + 1)}
            onToday={() => {
              const now = new Date();
              setCurrentMonth(now.getMonth());
              setSelectedDate(now);
            }}
            canGoPrev={currentMonth > 0}
            canGoNext={currentMonth < 11}
          />

          <div className="mt-8 flex-1">
            <div className="grid grid-cols-7 mb-3">
              {WEEKDAYS.map(day => (
                <div key={day} className="text-center text-[10px] font-bold text-[#6f817f] uppercase tracking-[0.3em] py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 lg:gap-2">
              {daysInMonth.map((day, idx) => {
                const isSelected = selectedDate ? isSameDay(selectedDate, day.date) : false;
                const hasEvent = !!day.event;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(day.date)}
                    className={`
                      relative aspect-square flex items-center justify-center transition-all duration-300 calendar-grid-item
                      ${day.isCurrentMonth ? 'text-[#545454]' : 'text-[#dddddd]'}
                    `}
                  >
                    {/* Innerer Kreis für kleinere Markierung */}
                    <div className={`
                      w-11 h-11 flex flex-col items-center justify-center rounded-full transition-all duration-300
                      ${isSelected ? 'bg-[#135a54] text-white shadow-lg shadow-[#135a54]/20 scale-110 z-10 font-bold' : 'hover:bg-[#d5f2e3]/60'}
                      ${day.isToday && !isSelected ? 'ring-2 ring-[#9bdbbf] bg-[#d5f2e3]/40 text-[#135a54] font-bold' : ''}
                      ${hasEvent && !isSelected && !day.isToday ? 'bg-[#9bdbbf]/10' : ''}
                    `}>
                      <span className="text-sm lg:text-lg font-semibold tracking-tight">
                        {day.date.getDate()}
                      </span>
                      
                      {hasEvent && (
                        <span className={`
                          absolute bottom-2 w-[4px] h-[4px] rounded-full
                          ${isSelected ? 'bg-white' : 'bg-[#135a54]'}
                        `} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-8 left-8 p-3 bg-white border border-[#dddddd] rounded-xl shadow-sm text-[#135a54] hover:bg-[#135a54] hover:text-white transition-all flex items-center gap-2 group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Einbetten</span>
            </button>
          )}
        </div>

        {/* Sidebar für Event-Details in #d5f2e3 (Ohne Header-Bar) */}
        <div className="w-[350px] bg-[#d5f2e3] border-l border-[#135a54]/10 flex flex-col p-10 overflow-y-auto">
          <div className="flex-1">
            <EventPanel 
              selectedDate={selectedDate} 
              event={selectedEvent} 
            />
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#135a54]/20 text-center">
             <span className="text-[10px] font-bold text-[#135a54] uppercase tracking-[0.3em] opacity-60">Fit Reisen Kalender</span>
          </div>
        </div>
      </div>

      <EmbedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;