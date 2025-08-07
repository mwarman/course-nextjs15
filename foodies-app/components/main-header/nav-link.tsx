'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import classes from './nav-link.module.css';
import { cn } from '@/utils/css';

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const path = usePathname();

  return (
    <Link href={href} className={cn(classes.link, { [classes.active]: path.startsWith(href) })}>
      {children}
    </Link>
  );
};

export default NavLink;
