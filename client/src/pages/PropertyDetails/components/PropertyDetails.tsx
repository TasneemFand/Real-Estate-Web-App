import { Button } from "@/components/ui/button";
import { AgentInfo } from "./AgentInfo";
import { PropertyInfo } from "./PropertyInfo";

export const PropertyDetails = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4 p-5">
      <PropertyInfo />
      <div className="flex flex-col gap-3">
        <AgentInfo />
        <Button className="mt-auto w-full bg-primary px-3 py-3 text-white">
          Book Now
        </Button>
      </div>
    </div>
  );
};
