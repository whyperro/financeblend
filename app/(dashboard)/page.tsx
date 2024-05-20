'use client'

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const {onOpen} = useNewAccount();
  return (
    <main>
      <Button onClick={onOpen}>Nueva acc</Button>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
  