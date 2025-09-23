import { UpdateTransactionButton } from "@/app/(protected)/debug/update-transaction-button";
import { WiseTextInput } from "@/lib/components";

export default function DebugPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Debug Page</h1>
        <UpdateTransactionButton />
      </div>
      <WiseTextInput money />
      <WiseTextInput />
      <hr />
    </div>
  );
}
