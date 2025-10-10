import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils";

type Position = { left: number; width: number; opacity: number };

export const SlideTabs: React.FC = () => {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 });
    }
  }, [selected]);

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 });
        }
      }}
      className={cn("relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1 dark:border-white dark:bg-neutral-800")}
    >
    {["All Collection", "Social Post", "Videos", "Docs", "Links"].map((tab, i) => (
        <ForwardedTab
            key={tab}
            ref={(el) => {
            tabsRef.current[i] = el!; // ✅ void return
            }}
            setPosition={setPosition}
            onClick={() => setSelected(i)}
        >
            {tab}
        </ForwardedTab>
    ))}

      <Cursor position={position} />
    </ul>
  );
};

type TabProps = {
  children: React.ReactNode;
  setPosition: (pos: Position) => void;
  onClick: () => void;
};

const Tab: React.ForwardRefRenderFunction<HTMLLIElement, TabProps> = (
  { children, setPosition, onClick },
  ref
) => {
  const localRef = ref as React.RefObject<HTMLLIElement>;

  return (
    <li
      ref={localRef}
      onClick={onClick}
      onMouseEnter={() => {
        if (!localRef?.current) return;
        const { width } = localRef.current.getBoundingClientRect();
        setPosition({ left: localRef.current.offsetLeft, width, opacity: 1 });
      }}
      className={cn("relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base")}
    >
      {children}
    </li>
  );
};

const ForwardedTab = React.forwardRef(Tab);

type CursorProps = { position: Position };

const Cursor: React.FC<CursorProps> = ({ position }) => (
  <motion.li
    animate={{ ...position }}
    className={cn("absolute z-0 h-7 rounded-full bg-black dark:bg-white md:h-12")}
  />
);
