"use client";
export default function JobsError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>We couldnt load the available jobs.</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
