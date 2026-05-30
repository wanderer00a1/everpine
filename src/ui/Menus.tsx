import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<any>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenuContextType {
  open?: (id: number) => void;
  close?: () => void;
  openId?: number | null;
  position?: pos | null;
  setPosition?: Dispatch<SetStateAction<pos | null>>;
}

interface MenuT {
  children?: ReactElement | ReactNode;
  id?: number;
  onClick?: () => void;
  icon?: ReactElement | ReactNode;
  disabled?: boolean;
}

interface pos {
  x: number;
  y: number;
}

const MenusContext = createContext<MenuContextType | undefined>(undefined);

function Menus({ children }: MenuT) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<pos | null>(null);
  const close = () => setOpenId(0);
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: MenuT) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Context must be used within Menu");
  }
  const { openId, open, close, setPosition } = context;

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const rect = target?.closest("button")?.getBoundingClientRect();

    setPosition!({
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      x: window.innerWidth - rect?.width! - rect?.x!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      y: rect?.y! + rect?.height! + 8,
    });
    if (openId === null || openId !== id) {
      open?.(id!);
    } else {
      close?.();
    }
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: MenuT) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Context must be used within Menu");
  }
  const { openId, position, close } = context;

  const ref = useOutsideClick(close!, false);

  if (openId !== id) return null;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}{" "}
    </StyledList>,
    document.body,
  );
}

function Button({ children, onClick, icon, disabled }: MenuT) {
  const context = useContext(MenusContext);
  if (!context) {
    throw new Error("Context must used within Menu");
  }
  const { close } = context;
  function handleClick() {
    onClick?.();
    close?.();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;

Menus.List = List;

Menus.Button = Button;

export default Menus;
