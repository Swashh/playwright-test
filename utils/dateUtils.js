export function formatCurrentDate() {
  const date = new Date();
  return date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
  });
}
