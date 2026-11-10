import { cloneElement, isValidElement, useId } from "react";

const POSITION_CLASSES = {
  top: {
    bubble: "bottom-full mb-3 translate-y-1",
    arrow: "top-full -mt-1.5 border-r border-b",
  },
  bottom: {
    bubble: "top-full mt-3 -translate-y-1",
    arrow: "bottom-full -mb-1.5 border-l border-t",
  },
};

export const Tooltip = ({ content, children, position = "top" }) => {
  const id = useId();
  const classes = POSITION_CLASSES[position] ?? POSITION_CLASSES.top;

  const trigger = isValidElement(children)
    ? cloneElement(children, { "aria-describedby": id })
    : children;

  return (
    <span className="group/tooltip relative inline-flex">
      {trigger}
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-xl border border-purple-500/30 bg-gray-900/95 px-3 py-2 text-xs font-medium text-white shadow-lg shadow-purple-900/30 backdrop-blur opacity-0 transition-all duration-300 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 ${classes.bubble}`}
      >
        <span className="bg-gradient-to-r from-primary-300 to-purple-300 bg-clip-text text-transparent">
          {content}
        </span>
        <span
          aria-hidden="true"
          className={`absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-purple-500/30 bg-gray-900 ${classes.arrow}`}
        />
      </span>
    </span>
  );
};
