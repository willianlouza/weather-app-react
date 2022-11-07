import dayClear from "../../assets/backgrounds/day-clear.jpg";
import dayCloud from "../../assets/backgrounds/day-cloud.jpg";
import dayMisc from "../../assets/backgrounds/day-misc.jpg";
import dayRain from "../../assets/backgrounds/day-rain.jpg";
import daySnow from "../../assets/backgrounds/day-snow.jpg";
import nightClear from "../../assets/backgrounds/night-clear.jpg";
import nightCloud from "../../assets/backgrounds/night-cloud.jpg";
import nightMisc from "../../assets/backgrounds/night-misc.jpg";
import nightRain from "../../assets/backgrounds/night-rain.jpg";
import nightSnow from "../../assets/backgrounds/night-snow.jpg";
import thunder from "../../assets/backgrounds/thunder.jpg";

export function getBackground(isDay: boolean, desc: string): string {
  switch (desc) {
    case "clear":
      return isDay ? dayClear : nightClear;
    case "cloud":
      return isDay ? dayCloud : nightCloud;
    case "misc":
      return isDay ? dayMisc : nightMisc;
    case "rain":
      return isDay ? dayRain : nightRain;
    case "snow":
      return isDay ? daySnow : nightSnow;
    case "thunder":
      return thunder;
    default:
      break;
  }
  return "";
}

export function findDescription(id: number): string {
  if (id === 800) {
    return "clear";
  } else if (id >= 200 && id <= 232) {
    return "thunder";
  } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
    return "rain";
  } else if (id >= 600 && id <= 622) {
    return "snow";
  } else if (id >= 701 && id <= 781) {
    return "misc";
  } else if (id >= 801 && id <= 804) {
    return "cloud";
  }
  return "";
}
