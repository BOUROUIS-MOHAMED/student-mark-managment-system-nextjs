"use client"
import React, {useCallback, useEffect, useState} from "react";
import {Classroom} from "@/app/dashboard/Models/Classroom";
import {getClassroomById} from "@/app/dashboard/services/ClassroomService";
import {Course} from "@/app/dashboard/Models/Course";
import {getCourseById} from "@/app/dashboard/services/CourseService";


export default  function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [model, setModel] = useState<Course | null>(null);


  const loadData = useCallback(async () => {
    const response = await getCourseById(params.id);
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
          <p>{model.description}</p>
          <p>{model.createdAt.toLocaleString()}</p>
          <p>{model.updatedAt.toLocaleString()}</p>

        </div>
      )}
    </div>
  );
}
