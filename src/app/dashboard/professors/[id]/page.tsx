"use client"
import React, {useCallback, useEffect, useState} from "react";
import {Teacher} from "@/app/dashboard/Models/Teacher";
import {getAllTeachers, getTeacherById} from "@/app/dashboard/services/TeacherService";


export default  function IndividualStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const [teacher, setTeacher] = useState<Teacher | null>(null);


  const loadData = useCallback(async () => {
    const response = await getTeacherById(params.id);
    console.log(response);

    if (response.status) {
      setTeacher(response.data!);

    } else {

      setTeacher(null);
    }
  }, []); // ✅ Dependencies are properly managed

  useEffect(() => {
    loadData();
  }, [loadData]); // ✅ No more infinite re-renders



  return (
    <div>
      <p>Info</p>
      {!teacher && <p>Error: nothing founded with ID: {params.id}</p>}
      {!!teacher && (
        <div>
          <p>{teacher.name}</p>
          <p>{teacher.uuid}</p>
          <p>{teacher.email}</p>
          <p>{teacher.phone}</p>
          <p>{teacher.createdAt.toLocaleString()}</p>
          <p>{teacher.updatedAt.toLocaleString()}</p>

        </div>
      )}
    </div>
  );
}
