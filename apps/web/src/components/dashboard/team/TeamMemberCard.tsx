import { Clock } from "components/icons/Clock";
import { ExclamationTriangle } from "components/icons/ExclamationTriangle";

export default function TeamMemberCard(props: {
  userName: string | undefined;
  isPending: boolean;
  isAdmin: boolean;
}) {
  if (!props.userName) {
    return;
  }
  return (
    <div className="flex w-full items-center justify-between rounded-md border border-lightText px-4 py-2 dark:border-darkText">
      <div className="flex items-center justify-center gap-4">
        <span className="flex size-10 items-center justify-center rounded-full border border-accent text-accent">
          {props.userName.charAt(0).toUpperCase()}
        </span>
        <p>{props.userName}</p>
      </div>
      <>
        {props.isPending ? (
          <Clock className="size-5 stroke-yellow-500" />
        ) : (
          <></>
        )}
      </>
      <>
        {props.isAdmin ? (
          <ExclamationTriangle className="size-5 stroke-danger" />
        ) : (
          <></>
        )}
      </>
    </div>
  );
}
