import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div>Authenticated users only</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}
