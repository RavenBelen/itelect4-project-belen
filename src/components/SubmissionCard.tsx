import type { Submission } from "../types";

interface SubmissionCardProps {
  submission: Submission;
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  return (
    <div>
      <h2>Submission Information</h2>
      <p>ID: {submission.id}</p>
      <p>Title: {submission.title}</p>
      <p>Status: {submission.status}</p>
    </div>
  );
}

export default SubmissionCard;