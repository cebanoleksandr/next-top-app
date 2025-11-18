import Menu from "@/app/(site)/components/Menu";
import { FC, HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLElement> {}

const Sidebar: FC<IProps> = ({ className, ...props }) => {
  return (
    <aside className={`${className}`} {...props}>
      <Menu />
    </aside>
  );
};

export default Sidebar;
