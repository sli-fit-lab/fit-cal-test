
import { CalendarEvent } from './types';

export const CURRENT_YEAR = new Date().getFullYear();

export const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

// Startet mit Montag für die deutsche Lokalisierung
export const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

/**
 * 📅 IHRE TERMINE
 */
export const DEFAULT_EVENTS: CalendarEvent[] = [
  {
    date: "2025-03-25",
    title: "Jahres-Klausurtagung",
    description: "Ein dreitägiges Event mit Fokus auf Teambuilding und kreative Workshops in den Bergen.",
    type: 'social'
  },
  {
    date: "2025-04-12",
    title: "Produkt-Launch: Version 2.0",
    description: "Offizielle Einführung unserer neuesten Features. Alle Teams in Bereitschaft für Support.",
    type: 'deadline'
  },
  {
    date: "2025-05-01",
    title: "Global Tech Gipfel",
    description: "Keynote-Präsentation über die Zukunft von KI-gesteuerten Schnittstellen.",
    type: 'meeting'
  },
  {
    date: "2025-06-20",
    title: "Community-Tag",
    description: "Tag der offenen Tür für unsere Nutzer und Mitwirkende. Snacks und Goodies inklusive!",
    type: 'social'
  }
];
