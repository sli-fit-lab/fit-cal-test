
export interface CalendarEvent {
  date: string; // ISO format YYYY-MM-DD
  title: string;
  description: string;
  type: 'holiday' | 'meeting' | 'social' | 'deadline';
}

export interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  event?: CalendarEvent;
}
