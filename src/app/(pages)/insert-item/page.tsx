// src/app/insert-item/page.tsx
'use client';
import React from 'react';
import AddForm from '@/app/components/AddForm';
import { Suspense } from "react";

const InsertItem = () => {
  return (
    <div>
      <Suspense>
        <AddForm />
      </Suspense>
    </div>
  );
};

export default InsertItem;
