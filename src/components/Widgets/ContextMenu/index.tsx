import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { subMenuAnimate } from "@/components/variants/dropDown";
import { subMenuTypes } from "@/components/types/common";
import classNames from "classnames";

interface contextMenuProps {
  targetId: string;
  options: subMenuTypes[];
  onClickHandel: (
    type: string,
    modal_name: string,
    action_type: string
  ) => void;
  isMultiple: boolean;
}

const ContextMenu = ({
  targetId,
  options,
  onClickHandel,
  isMultiple,
}: contextMenuProps) => {
  const [contextData, setContextData] = useState({
    visible: false,
    posX: 0,
    posY: 0,
  });
  const contextRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const contextMenuEventHandler = (event: any) => {
      const targetElement = document.getElementById(targetId);
      if (targetElement && targetElement.contains(event.target)) {
        event.preventDefault();
        setContextData({
          visible: true,
          posX: event.clientX,
          posY: event.clientY,
        });
      } else if (
        contextRef.current &&
        !contextRef.current.contains(event.target)
      ) {
        setContextData({ ...contextData, visible: false });
      }
    };

    const offClickHandler = (event: any) => {
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setContextData({ ...contextData, visible: false });
      }
    };

    document.addEventListener("contextmenu", contextMenuEventHandler);
    document.addEventListener("click", offClickHandler);
    return () => {
      document.removeEventListener("contextmenu", contextMenuEventHandler);
      document.removeEventListener("click", offClickHandler);
    };
  }, [contextData, targetId]);

  useLayoutEffect(() => {
    if (
      contextData.posX + contextRef?.current!.offsetWidth >
      window.innerWidth
    ) {
      setContextData({
        ...contextData,
        posX: contextData.posX - contextRef?.current!.offsetWidth,
      });
    }
    if (
      contextData.posY + contextRef?.current!.offsetHeight >
      window.innerHeight
    ) {
      setContextData({
        ...contextData,
        posY: contextData.posY - contextRef?.current!.offsetHeight,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial="exit"
      animate={contextData.visible ? "enter" : "exit"}
      variants={subMenuAnimate}
      ref={contextRef}
      className="z-20"
      style={{
        position: "absolute",
        display: `${contextData.visible ? "block" : "none"}`,
        left: "50%",
        top: "50%",
        boxShadow: "-1px 2px 7px 0px #888888",
        background: "#ffffff",
        borderRadius: "6px",
        width: 200,
      }}
    >
      <motion.div className={`py-1`}>
        {options.map((option, index) => (
          <li
            key={index}
            className={classNames(
              `list-none text-sm font-medium  px-3 py-2 selection:bg-blue-400  hover:bg-blue-400 border-b border-b-gray-100 hover:text-white flex gap-4 ${option.text_color}`,
              isMultiple &&
                option.is_multiple !== isMultiple &&
                `cursor-not-allowed text-gray-300 hover:bg-none`
            )}
            onClick={(event) => {
              isMultiple && option.is_multiple !== isMultiple
                ? ""
                : onClickHandel(
                    option.type,
                    option.modal_name,
                    option.action_type
                  );
              setContextData({
                visible: false,
                posX: 0,
                posY: 0,
              });
              // if(isMultiple){
              //    if (option.is_multiple === isMultiple) {
              // onClickHandel(option.type, option.modal_name, option.action_type)
              // setContextData({
              //   visible: false,
              //   posX: 0,
              //   posY: 0,
              // })
              //  }
              // }else{

              // }
            }}
          >
            {option.icon}
            {option.name}
          </li>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ContextMenu;
