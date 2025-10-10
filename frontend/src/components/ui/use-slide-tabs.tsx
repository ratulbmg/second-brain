import { cn } from "../../utils";
import { SlideTabs } from "../ui/slide-tabs";

export default function UseSlideTabs() {
  return (
    <div className={cn("w-full grid h-screen place-content-center bg-white dark:bg-black")}>
      <SlideTabs />
    </div>
  );
}
