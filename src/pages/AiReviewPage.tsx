import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { askAi } from "../api/client";

export default function AiReviewPage() {
  const [prompt, setPrompt] = useState("");

  const reviewMutation = useMutation({
    mutationFn: askAi,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const notes = prompt.trim();
    if (notes.length < 20 || notes.length > 2000) return;

    reviewMutation.mutate(notes);
  }

  const review = reviewMutation.data;

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">AI Aquarium Review</h1>
      <p>Describe your aquarium care, and the AI will review your notes.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="aquarium-notes" className="block font-medium">
          Aquarium notes
        </label>

        <textarea
          id="aquarium-notes"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          minLength={20}
          maxLength={2000}
          required
          rows={7}
          className="w-full rounded-lg border p-3"
          placeholder="Describe your tank, fish, water conditions, and care routine..."
        />

        <p className="text-sm text-slate-500">
          Enter 20–2000 characters ({prompt.trim().length}/2000).
        </p>

        <button
          type="submit"
          disabled={
            reviewMutation.isPending ||
            prompt.trim().length < 20 ||
            prompt.trim().length > 2000
          }
          className="rounded-lg bg-teal-800 px-5 py-3 font-semibold text-white disabled:opacity-50"
        >
          {reviewMutation.isPending ? "Reviewing..." : "Get AI Review"}
        </button>
      </form>

      {reviewMutation.isError && (
        <p role="alert" className="text-red-600">
          {reviewMutation.error.message}
        </p>
      )}

      {review && (
        <section className="space-y-4 rounded-xl border bg-white p-5">
          <h2 className="text-xl font-semibold">Review</h2>
          <p><strong>Status:</strong> {review.status}</p>
          <p><strong>Summary:</strong> {review.summary}</p>

          <div>
            <h3 className="font-semibold">Strengths</h3>
            <ul className="list-disc pl-6">
              {review.strengths.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Suggested improvements</h3>
            <ul className="list-disc pl-6">
              {review.improvements.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}