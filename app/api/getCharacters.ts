export default async function (...args: unknown[]) {
  const res = await fetch(...args);
  return await res.json();
}
