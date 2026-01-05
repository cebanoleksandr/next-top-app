'use client';

import { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import cn from "classnames";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import Content from "./Content";
import Footer from "@/components/layouts/Footer";
import Up from "@/components/UI/Up";

interface IMainLayout {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayout) => {
  const [isSkipLinkVisible, setIsSkipLinkVisible] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      bodyRef.current?.focus();
    }

    setIsSkipLinkVisible(false);
  };

  return (
    <div className="wrapper">
      <a
        href="#"
        tabIndex={0}
        className={cn("block fixed left-25 top-0 overflow-hidden h-0 bg-[var(--primary)] text-white", {
          "h-auto": isSkipLinkVisible
        })}
        onFocus={() => setIsSkipLinkVisible(true)}
        onBlur={() => setIsSkipLinkVisible(false)}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>

      <div className="md:hidden">
        <Header className="header" />
      </div>

      <Sidebar className="sidebar" />

      <Content className="main" ref={bodyRef}>
        {children}
      </Content>

      <Footer className="footer" />

      <Up />
    </div>
  );
};

export default MainLayout;