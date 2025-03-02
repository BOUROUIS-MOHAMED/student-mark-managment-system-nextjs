import React from "react";
import { api } from "@/app/trpc/server";
import fakeData from "@/app/dashboard/fake-data/fakeData";

export default async function IndividualStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const data = fakeData.classes.find(
    (value) => value.id.toString() === params.id.toString(),
  );

  return (
    <div>
      <p>IndividualStudentPage</p>
      {!data && <p>Error: Class doesn&apos;t exist with ID: {params.id}</p>}
      {!!data && (
        <div>
          <p>{data.class_name}</p>
          <p>{data.class_level}</p>
          <p>{data.department}</p>
        </div>
      )}
    </div>
  );
}
