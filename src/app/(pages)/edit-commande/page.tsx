"use client";

import React from "react";
import EditForm from "@/app/components/EditForm";
import { Suspense } from "react";

const EditItem = () => {
  return (
  <div>
    <Suspense>
      <EditForm />
    </Suspense>
  </div>
  );
};

export default EditItem;