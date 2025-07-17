import { auth } from "@/auth";

export default async function DebugPage() {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
}
