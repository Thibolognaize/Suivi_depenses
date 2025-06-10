"use client";

import React from "react";
import EditForm from "@/app/components/EditForm";
import { Suspense } from "react";

const EditItem = () => {
    return (
        <Suspense fallback={
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">Chargement...</div>
          </main>
        }>
            <EditForm />
        </Suspense>
    );
};

export default EditItem;