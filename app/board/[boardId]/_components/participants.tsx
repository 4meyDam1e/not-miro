"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

import { UserAvatar } from "./user-avatar";

const MAX_SHOWN_OTHER_USERS = 1;

export const Participants = () => {
  const otherUsers = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = otherUsers.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div
      className="absolute h-12 top-2 right-2 bg-white rounded-md
      p-3 flex items-center shadow-md"
    >
      <div className="flex gap-x-2">
        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
            borderColor={connectionIdToColor(currentUser.connectionId)}
          />
        )}

        {otherUsers.slice(0, MAX_SHOWN_OTHER_USERS)
          .map(({ connectionId, info }) => {
            return (
              <UserAvatar
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "T"}
                borderColor={connectionIdToColor(connectionId)}
              />
            );
          })
        }

        {hasMoreUsers && (
          <UserAvatar
            name={`${otherUsers.length - MAX_SHOWN_OTHER_USERS} more`}
            fallback={`+${otherUsers.length - MAX_SHOWN_OTHER_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

// In order to use in Loading, which is a server component.
// Participants.Skeleton = function ParticipantsSkeleton() {
export const ParticipantsSkeleton = () => {
  return (
    <div
      className="absolute h-12 top-2 right-2 bg-white rounded-md
      p-3 flex items-center shadow-md w-[100px]"
    />
  );
}