'use client'

import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

const NoSsr: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export default dynamic(() => Promise.resolve(NoSsr), { ssr: false });
