import React from 'react';
import { Metadata } from 'next';

import './globals.css';
import MainHeader from '@/components/main-header/main-header';

export const metadata: Metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <MainHeader />

        {children}
      </body>
    </html>
  );
};

export default RootLayout;
