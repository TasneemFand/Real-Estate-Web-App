import { useFetchAgent } from "../hooks/useFetchAgent";
import profileImg from "../../../assets/Profile image.png";
import { Button } from "@/components/ui/button";

export const AgentInfo = () => {
  const { data: agent, isLoading } = useFetchAgent();
  return (
    <div className="flex justify-center">
      {isLoading ? (
        <p className="text-2xl text-foreground">loading...</p>
      ) : (
        <div className="flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-solid border-[#E4E4E4] bg-white p-8">
          <img src={profileImg} className="h-20 w-20" />
          <span className="text-base font-semibold text-foreground ">
            {agent.username}
          </span>
          <span className="text-secondary-foreground"></span>
          <p className="text-base font-semibold text-foreground">
            {agent.allProperties?.length} Properties
          </p>
          <div className="flex gap-4">
            <Button className="rounded-sm bg-primary px-3 py-3 text-white">
              Message
            </Button>
            <Button className="rounded-sm bg-green-600 px-4 py-4 text-white">
              Call
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
