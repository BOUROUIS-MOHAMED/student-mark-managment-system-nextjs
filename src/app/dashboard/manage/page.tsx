"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Manage() {
  const classModels = ["Class A", "Class B", "Class C"];
  const subjects = ["Math", "Physics", "Chemistry", "Biology", "English"];
  const students = Array.from({ length: 20 }, (_, i) => `Student ${i + 1}`);

  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [data, setData] = useState(
    students.map((student) => ({
      name: student,
      TP: null,
      DS: null,
      EXAM: null,
    })),
  );
  const [errors, setErrors] = useState<{
    TP: boolean;
    DS: boolean;
    EXAM: boolean;
  }>({
    TP: false,
    DS: false,
    EXAM: false,
  });

  // Handle changes in the table
  const handleInputChange = (
    index: number,
    column: "TP" | "DS" | "EXAM",
    value: string,
  ) => {
    const newData = [...data];

    if (value === "") {
      newData[index][column] = null;
    } else {
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        newData[index][column] = numericValue;
      }
    }

    setData(newData);
  };

  // Handle validation
  const validateTable = () => {
    const newErrors = { TP: false, DS: false, EXAM: false };

    ["TP", "DS", "EXAM"].forEach((column) => {
      const filledValues = data.map(
        (row) => row[column as keyof (typeof data)[0]],
      );
      const hasPartialFill =
        filledValues.some((val) => val !== null) &&
        filledValues.some((val) => val === null);

      if (hasPartialFill) {
        newErrors[column as keyof typeof newErrors] = true;
      }
    });

    setErrors(newErrors);
  };

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Manage</h1>

      {/* Class Dropdown */}
      <Select onValueChange={setSelectedClass}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Select Class" />
        </SelectTrigger>
        <SelectContent>
          {classModels.map((cls) => (
            <SelectItem key={cls} value={cls}>
              {cls}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Subject Dropdown (Appears After Class Selection) */}
      {selectedClass && (
        <Select onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((sub) => (
              <SelectItem key={sub} value={sub}>
                {sub}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Table (Appears After Subject Selection) */}
      {selectedSubject && (
        <div className="overflow-x-auto">
          <table className="mt-4 min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Student Name</th>
                <th className="border p-2">TP</th>
                <th className="border p-2">DS</th>
                <th className="border p-2">EXAM</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={row.name} className="text-center">
                  <td className="border p-2">{row.name}</td>
                  {["TP", "DS", "EXAM"].map((col) => (
                    <td
                      key={col}
                      className={`border p-2 ${errors[col as keyof typeof errors] ? "bg-red-200" : ""}`}
                    >
                      <Input
                        type="text"
                        className="text-center"
                        value={row[col as keyof typeof row] ?? ""}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            col as "TP" | "DS" | "EXAM",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Validate Button */}
          <Button className="mt-4" onClick={validateTable}>
            Validate
          </Button>
        </div>
      )}
    </div>
  );
}
