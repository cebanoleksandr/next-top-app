import Menu from "@/app/(site)/components/Menu";
import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import Image from "next/image";
import logo from "../../public/logo.svg";
import Search from "@/app/(site)/components/Search";

interface IProps extends HTMLAttributes<HTMLElement> {}

const Sidebar: FC<IProps> = ({ className, ...props }) => {
  return (
    <aside className={cn(className, 'grid content-start gap-5')} {...props}>
      <Image src={logo} className="mt-8" alt="" />
      <Search />
      <Menu />
    </aside>
  );
};

export default Sidebar;
