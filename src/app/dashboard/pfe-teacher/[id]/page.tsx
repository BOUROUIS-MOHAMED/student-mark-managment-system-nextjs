"use client"
import React, {useCallback, useEffect, useState} from "react";

import {Pfe} from "@/app/dashboard/Models/Pfe";
import {getPfeById} from "@/app/dashboard/services/PfeService";


export default  function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [model, setModel] = useState<Pfe | null>(null);


  const loadData = useCallback(async () => {
    const response = await getPfeById(params.id);
    console.log(response);

    if (response.status) {
      setModel(response.data!);

    } else {

      setModel(null);
    }
  }, []); // ✅ Dependencies are properly managed

  useEffect(() => {
    loadData();
  }, [loadData]); // ✅ No more infinite re-renders



  return (
    <div>
      <p>Info</p>
      {!model && <p>Error: nothing founded with ID: {params.id}</p>}
      {!!model && (
        <div>
          <p>{model.name}</p>
          <p>{model.status}</p>
          <p>{model.createdAt.toLocaleString()}</p>
          <p>{model.updatedAt.toLocaleString()}</p>

        </div>
      )}
    </div>
  );
}
