import { Card, Metric, Text } from "@tremor/react";
import { BookCopy, Clock, CopyCheck, Users } from "lucide-react";
import React from "react";

export default async function QuickStatsCards() {
  const studentCount = 253;
  const professorsCount = 123;
  const classesCount = 15;
  const lectureCount = 20;

  return (
    <>
      <div className="mt-4 flex flex-1 flex-wrap gap-4 md:flex-nowrap">
        <Card>
          <Text className="mb-2 flex items-center">
            <Users size={16} className="mr-2" />
            Students
          </Text>
          <Metric>{studentCount}</Metric>
        </Card>
        <Card>
          <Text className="mb-2 flex items-center">
            <Clock size={16} className="mr-2" />
            Professors
          </Text>
          <Metric>{professorsCount}</Metric>
        </Card>
        <Card>
          <Text className="mb-2 flex items-center">
            <BookCopy size={16} className="mr-2" />
            Classes
          </Text>
          <Metric>{classesCount}</Metric>
        </Card>
        <Card>
          <Text className="mb-2 flex items-center">
            <CopyCheck size={16} className="mr-2" />
            Lectures
          </Text>
          <Metric>{lectureCount}</Metric>
        </Card>
      </div>
    </>
  );
}
