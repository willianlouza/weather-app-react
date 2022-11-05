export default function capitalizeLetters(text: string): string {
  let arr = text.split(" ");
  let result = arr.map((el) => el.charAt(0).toLocaleUpperCase() + el.slice(1));
  return result.join(" ");
}
