import { formatDistanceToNow } from "date-fns";

export const TimeAgo = ({ createdAt }) => {
  return (
    <span>
      {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
    </span>
  );
}