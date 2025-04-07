"use client"
import React, {useCallback, useEffect, useState} from "react";
import {getTeacherClassroomById} from "@/app/dashboard/services/TeacherClassroomService";
import {TeacherClassroom} from "@/app/dashboard/Models/TeacherClassroom";


export default  function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [model, setModel] = useState<TeacherClassroom | null>(null);

  const loadData = useCallback(async () => {
    const response = await getTeacherClassroomById(params.id);
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
          <p>{model.teacher.name}</p>
          <p>{model.classroom.name}</p>

          <p>{model.createdAt.toLocaleString()}</p>
          <p>{model.updatedAt.toLocaleString()}</p>

        </div>
      )}
    </div>
  );
}
