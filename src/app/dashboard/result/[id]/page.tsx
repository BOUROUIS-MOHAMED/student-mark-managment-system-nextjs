import React from "react";
import { api } from "@/app/trpc/server";
import fakeData from "@/app/dashboard/fake-data/fakeData";

export default async function IndividualStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const data = fakeData.results.find(
    (value) => value.id.toString() === params.id.toString(),
  );
  return (
    <div>
      <p>IndividualStudentPage</p>
      {!data && <p>Error: Result doesn&apos;t exist with ID: {params.id}</p>}
      {!!data && (
        <div>
          <p>{data.id}</p>
          <p>
            {data.year.toString()}--semester {data.semester}
          </p>
          <p>{data.id}</p>
          <p>student:{data.student.firstName}</p>
          <p>professor:{data.enrollment.professor.firstName}</p>
          <p>subject:{data.enrollment.subject.name}</p>
          <p>class:{data.enrollment.classModel.class_name}</p>
          <p>{data.note_ds}</p>
          <p>{data.note_tp}</p>
          <p>{data.note_ex}</p>
          <p>{data.result_status}</p>
        </div>
      )}
    </div>
  );
}
