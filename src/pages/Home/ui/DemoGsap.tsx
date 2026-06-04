import { Box } from "@/shared/ui";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function DemoGsap() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".sceneTo1",
        {
          duration: 2,
          borderRadius: "0px",
          backgroundColor: "#014422",
          ease: "power1.out",
          repeat: -1,
          yoyo: true,
        },
        {
          duration: 2,
          borderRadius: "24px",
          backgroundColor: "#090f86",
          ease: "power1.out",
          repeat: -1,
          yoyo: true,
        },
      );
    },
    { scope: root },
  );

  return (
    <Box ref={root} className="relative flex flex-col gap-10">
      <Box
        size={130}
        text="fromTo()"
        className="sceneTo1"
        background="#014422"
      />
    </Box>
  );
}
