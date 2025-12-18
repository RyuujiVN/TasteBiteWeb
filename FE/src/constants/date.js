import dayjs from "dayjs";

const today = dayjs(Date.now());
const tomorrow = dayjs(Date.now()).add(1, 'day');
const dayAfterTomorrow = dayjs(Date.now()).add(2, 'day');
const timeOptions = Array.from({
  length: 22 - 8
}, (_, i) => {
  const start = 8 + i;
  const end = start + 1;

  const pad = (time) => time.toString().padStart(2, "0")

  return {
    value: `${pad(start)}:00-${pad(end)}:00`,
    label: `${pad(start)}:00 - ${pad(end)}:00`,
  }
})

export const date = {
  today: today,
  tomorrow: tomorrow,
  dayAfterTomorrow: dayAfterTomorrow,
  timeOptions: timeOptions
}