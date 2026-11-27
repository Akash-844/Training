"use client";

import { useEffect, useState } from "react";

type Props = {
  slug: string;
};

type Metal = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
};

type HistoryRecord = {
  id: number;
  price: string;
  currency: string;
  unit: string;
  source: string;
  benchmark: string;
  benchmarkDate: string;
};

export default function MetalHistory({ slug }: Props) {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [metal, setMetal] = useState<Metal | null>(null);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const limit = 10;

  useEffect(() => {
    let active = true;
    async function fetchHistory() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/metals/${slug}/history?limit=${limit}&offset=${offset}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        if (!active) return;
        setMetal(result.data.metal);
        setHistory(result.data.history);
        setTotal(result.pagination.total);
        setHasMore(result.pagination.hasMore);
      } catch {
        if (active) setError("Failed to fetch price history.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchHistory();
    return () => { active = false; };
  }, [slug, offset]);

  if (loading) {
    return <p>Loading price history...</p>;
  }

  if (error) return <p role="alert">{error}</p>;

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">{metal?.name} Price History</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Unit</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  {new Date(item.benchmarkDate).toLocaleDateString("en-IN")}
                </td>

                <td className="p-3">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </td>

                <td className="p-3">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total records: {total}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOffset(offset - limit)}
            disabled={offset === 0}
            className="rounded border px-4 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() => setOffset(offset + limit)}
            disabled={!hasMore}
            className="rounded border px-4 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
