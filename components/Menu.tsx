import React, { FC, useEffect, useRef } from "react";

interface IProps {
  children: React.ReactNode;
  callback: () => void;
  className?: string;
}
const Menu: FC<IProps> = ({ children, callback, className }) => {
  const wrapperRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        maxHeight: "calc(100vh - 140px)",
        position: "absolute",
        overflowY: "scroll",
        background: "#e8e2e2",
        zIndex: 2,
      }}
      className={className}
    >
      <div>{children}</div>
    </div>
  );
};
export default Menu;
