"use client"
import React, {useCallback, useEffect, useState} from 'react'
import {Student} from "@/app/dashboard/Models/Student";
import {getStudentById} from "@/app/dashboard/services/StudentService";


export default  function IndividualStudentPage({
  params,
}: {
  params: { id: string }
}) {
  const [model, setModel] = useState<Student | null>(null);


  const loadData = useCallback(async () => {
    const response = await getStudentById(params.id);
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
      <p>IndividualStudentPage</p>
      {!model && <p>Error: Student doesn&apos;t exist with ID: {params.id}</p>}
      {!!model && (
        <div>
          <p>{model.name}</p>
          <p>{model.email}</p>
          <p>{model.classroom!=null?model.classroom.name:""}</p>
          <p>{model.createdAt.toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}
