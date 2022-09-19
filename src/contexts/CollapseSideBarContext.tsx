import React, { createContext, ReactElement, useState } from 'react';
import { IPropsTypes } from 'src/types/props';

interface IState {
  isCollapse: boolean;
  isHover: boolean;
  isClick: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const initialState: IState = {
  isCollapse: false,
  isHover: false,
  isClick: false,
  onToggle: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

const CollapseSideBarContext = createContext(initialState);

export default function CollapseSideBarProvider({ children }: IPropsTypes<ReactElement>) {
  const [collapse, setCollapse] = useState({
    click: false,
    hover: false,
  });

  const handleToggle = () => {
    setCollapse((prev) => ({ ...prev, click: !prev.click }));
  };

  const handleMouseLeave = () => {
    if (collapse.click) {
      setCollapse((prev) => ({ ...prev, hover: false }));
    }
  };

  const handleMouseEnter = () => {
    if (collapse.click) {
      setCollapse((prev) => ({ ...prev, hover: true }));
    }
  };
  return (
    <CollapseSideBarContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        isHover: collapse.hover,
        isClick: collapse.click,
        onToggle: handleToggle,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }}
    >
      {children}
    </CollapseSideBarContext.Provider>
  );
}

export { CollapseSideBarContext };
