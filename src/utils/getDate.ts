export default function getDate(dt: any, timezone: any): DateFormat {
  const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
  const utc_milliseconds = utc_seconds * 1000;
  const local_date = new Date(utc_milliseconds).toUTCString().split(" ");
  return formatDate(local_date);
}

const formatDate = (arr: string[]): DateFormat => {
  let split = arr[4].split(":");
  let date: DateFormat = {
    week: arr[0],
    day: arr[1],
    month: arr[2],
    year: arr[3],
    hour: split[0],
    minute: split[1],
  };
  return date;
};

export type DateFormat = {
  week: string;
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
};
