'use client';

import { FC, forwardRef, HTMLAttributes, ReactNode } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, IProps>(({ children, className, ...props }, ref) => {
  return (
    <div {...props} className={className}>
      <main
        ref={ref}
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
});

export default Content;
