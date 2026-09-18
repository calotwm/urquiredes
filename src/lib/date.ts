export const TODAY = new Date('2026-09-18T12:00:00')

export function startOfWeek(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day + 6) % 7 // Monday-based
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfWeek(date: Date) {
  const start = startOfWeek(date)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function buildMonthGrid(year: number, month: number) {
  const first = new Date(year, month, 1)
  const start = startOfWeek(first)
  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push(d)
  }
  return days
}

export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export const WEEKDAY_NAMES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
