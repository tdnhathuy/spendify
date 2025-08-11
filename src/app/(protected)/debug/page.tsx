import { WiseButton } from "@/lib/components/wise/button/wise-button";
import { client } from "@/lib/configs";

export default function DebugPage() {
  return (
    <form
      action={async (e) => {
        "use server";
        try {
          const trans = await client.get("transaction", {
            prefixUrl: "http://localhost:3000/api/",
          });
          console.log("trans", trans);
        } catch (error) {
          console.log("error", error);
        }
        // await prisma.transaction.deleteMany({});
        // console.log("e", e);
        // console.log("1", 1);
      }}
    >
      <WiseButton type="submit">Clear all Transaction</WiseButton>
    </form>
  );
}
