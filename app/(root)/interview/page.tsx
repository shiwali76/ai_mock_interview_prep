import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-semibold mb-4">Interview generation</h3>
      <Agent
        userName={user?.name || "Guest"}
      />
    </div>
  );
};

export default Page;