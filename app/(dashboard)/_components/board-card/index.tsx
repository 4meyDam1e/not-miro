"use client";


import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";
import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";
// import { useMutation } from "convex/react";

import { Footer } from "./footer";
import { Overlay } from "./overlay";
// import { Id } from "@/convex/_generated/dataModel";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavourite: boolean;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavourite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  /* Need to manually keep track of pending if done this way  */
  // const handleFavourite = useMutation(api.board.favourite);
  // const handleUnfavourite = useMutation(api.board.unfavourite);

  const {
    mutate: onFavourite,
    pending: pendingFavourite
  } = useApiMutation(api.board.favourite);
  const {
    mutate: onUnfavourite,
    pending: pendingUnfavourite
  } = useApiMutation(api.board.unfavourite);

  const toggleFavourite = () => {
    if (isFavourite) {
      // handleUnfavourite({ id: id as Id<"boards"> })
      onUnfavourite({ id })
        .catch(() => toast.error("Failed to unfavourite"));
    } else {
      // handleFavourite({ id: id as Id<"boards">, orgId })
      onFavourite({ id, orgId })
        .catch(() => toast.error("Failed to favourite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div
        className="group aspect-[100/127] border rounded-lg flex
      flex-col justify-between overflow-hidden"
      >
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button
              className="absolute top-1 right-1 opacity-0
              group-hover:opacity-100 transition-opacity px-3
              py-2 outline-none"
            >
              <MoreHorizontal
                className="text-white opacity-75
                hover:opacity-100 transition-opacity"
              />
            </button>
          </Actions>
        </div>

        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createAtLabel}
          isFavourite={isFavourite}
          onClick={toggleFavourite}
          disabled={pendingFavourite || pendingUnfavourite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg justify-between overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
