// src/app/edit-commande/page.tsx
import { Suspense } from 'react';
import EditCommande from '@/app/components/EditCommande';

export default function EditCommandePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditCommande />
    </Suspense>
  );
}
