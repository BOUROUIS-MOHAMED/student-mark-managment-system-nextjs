"use client"
import React, {useCallback, useEffect, useState} from "react";
import {TeacherCourse} from "@/app/dashboard/Models/TeacherCourse";
import {getTeacherCourseById} from "@/app/dashboard/services/TeacherCourseService";



export default  function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [model, setModel] = useState<TeacherCourse | null>(null);


  const loadData = useCallback(async () => {
    const response = await getTeacherCourseById(params.id);
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
          <p>{model.course.name}</p>
          <p>{model.createdAt.toLocaleString()}</p>
          <p>{model.updatedAt.toLocaleString()}</p>

        </div>
      )}
    </div>
  );
}
