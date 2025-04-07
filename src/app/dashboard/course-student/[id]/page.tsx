"use client"
import React, {useCallback, useEffect, useState} from "react";

import {getCourseStudentById} from "@/app/dashboard/services/CourseStudentService";
import {CourseStudent} from "@/app/dashboard/Models/CourseStudent";


export default  function DetailsPage({
  params,
}: {
  params: { courseId: string,studentId: string };
}) {
  const [model, setModel] = useState<CourseStudent | null>(null);


  const loadData = useCallback(async () => {
    const response = await getCourseStudentById(params.courseId,params.studentId);
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
      {!model && <p>Error: nothing founded with ID: </p>}
      {!!model && (
        <div>
          <p>{model.student.name}</p>
          <p>{model.course.name}</p>

     {/*     <p>{model.createdAt.toLocaleString()}</p>
          <p>{model.updatedAt.toLocaleString()}</p>
*/}
        </div>
      )}
    </div>
  );
}
