const fs = require("fs");

function generateDataset() {
  const students = [];
  const professors = [];
  const classes = [
    {
      id: 1,
      class_name: "CS101",
      class_level: "Undergraduate",
      department: "Computer Science",
    },
    {
      id: 2,
      class_name: "MATH101",
      class_level: "Undergraduate",
      department: "Mathematics",
    },
    {
      id: 3,
      class_name: "PHYS101",
      class_level: "Undergraduate",
      department: "Physics",
    },
  ];

  const subjects = [
    {
      id: 1,
      name: "Introduction to Programming",
      description: "Basic programming concepts and algorithms.",
      class: classes[0],
    },
    {
      id: 2,
      name: "Discrete Mathematics",
      description: "Logic, sets, and combinatorics.",
      class: classes[1],
    },
    {
      id: 3,
      name: "Classical Mechanics",
      description: "Newtonian mechanics and motion.",
      class: classes[2],
    },
    {
      id: 4,
      name: "Data Structures",
      description: "Understanding of data organization and management.",
      class: classes[0],
    },
    {
      id: 5,
      name: "Calculus I",
      description: "Fundamental principles of calculus.",
      class: classes[1],
    },
    {
      id: 6,
      name: "Quantum Mechanics",
      description: "The study of quantum phenomena.",
      class: classes[2],
    },
    {
      id: 7,
      name: "Algorithms",
      description: "The theory and practice of algorithms.",
      class: classes[0],
    },
    {
      id: 8,
      name: "Linear Algebra",
      description: "Matrix operations and vector spaces.",
      class: classes[1],
    },
    {
      id: 9,
      name: "Electromagnetism",
      description: "Study of electric and magnetic fields.",
      class: classes[2],
    },
    {
      id: 10,
      name: "Software Engineering",
      description: "The development of large-scale software systems.",
      class: classes[0],
    },
    {
      id: 11,
      name: "Probability and Statistics",
      description: "Understanding of probability and statistical methods.",
      class: classes[1],
    },
    {
      id: 12,
      name: "Thermodynamics",
      description: "Study of energy and heat transfer.",
      class: classes[2],
    },
  ];

  const professorsList = [
    {
      id: 1,
      username: "professor1",
      firstName: "John",
      lastName: "Doe",
      email: "prof1@university.com",
      cin: "123456789",
      password: "profpass1",
      role: "professor",
      phone: "555-2001",
      department: "Computer Science",
      grade: "Associate Professor",
    },
    {
      id: 2,
      username: "professor2",
      firstName: "Jane",
      lastName: "Smith",
      email: "prof2@university.com",
      cin: "987654321",
      password: "profpass2",
      role: "professor",
      phone: "555-2002",
      department: "Mathematics",
      grade: "Assistant Professor",
    },
    {
      id: 3,
      username: "professor3",
      firstName: "Jim",
      lastName: "Brown",
      email: "prof3@university.com",
      cin: "555555555",
      password: "profpass3",
      role: "professor",
      phone: "555-2003",
      department: "Physics",
      grade: "Professor",
    },
    {
      id: 4,
      username: "professor4",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "prof4@university.com",
      cin: "654987321",
      password: "profpass4",
      role: "professor",
      phone: "555-2004",
      department: "Computer Science",
      grade: "Senior Professor",
    },
    {
      id: 5,
      username: "professor5",
      firstName: "Michael",
      lastName: "Davis",
      email: "prof5@university.com",
      cin: "321654987",
      password: "profpass5",
      role: "professor",
      phone: "555-2005",
      department: "Mathematics",
      grade: "Associate Professor",
    },
    {
      id: 6,
      username: "professor6",
      firstName: "Laura",
      lastName: "Miller",
      email: "prof6@university.com",
      cin: "987321654",
      password: "profpass6",
      role: "professor",
      phone: "555-2006",
      department: "Physics",
      grade: "Assistant Professor",
    },
    {
      id: 7,
      username: "professor7",
      firstName: "David",
      lastName: "Wilson",
      email: "prof7@university.com",
      cin: "654321987",
      password: "profpass7",
      role: "professor",
      phone: "555-2007",
      department: "Computer Science",
      grade: "Professor",
    },
    {
      id: 8,
      username: "professor8",
      firstName: "Emily",
      lastName: "Taylor",
      email: "prof8@university.com",
      cin: "321987654",
      password: "profpass8",
      role: "professor",
      phone: "555-2008",
      department: "Mathematics",
      grade: "Senior Professor",
    },
  ];

  // Generate 60 students with first and last name
  for (let i = 1; i <= 60; i++) {
    students.push({
      id: i,
      username: `student${i}`,
      firstName: `FirstName${i}`,
      lastName: `LastName${i}`,
      email: `student${i}@university.com`,
      cin: `CIN${i}`,
      password: `password${i}`,
      role: "student",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      email_univ: `student${i}@university.com`,
      phone: `555-${1000 + i}`,
    });
  }

  // Generate projects
  const projects = [];
  for (let i = 1; i <= 13; i++) {
    projects.push({
      id: i,
      code: `P${i}`,
      name: `Project ${i}`,
      studentOne: students[i % 60],
      studentTwo: students[(i + 1) % 60],
      encadrant: professorsList[i % 8],
      rapporteur: professorsList[(i + 1) % 8],
      president_jury: professorsList[(i + 2) % 8],
      datePresentation: new Date(),
      type: "Project",
      mark: ["A", "B", "C", "D", "E"][i % 5],
      note: "Excellent",
      result: i % 2,
      presentation_link: `https://example.com/project${i}`,
      rapport_link: `https://example.com/rapport${i}`,
      project_link: `https://example.com/project${i}_link`,
    });
  }

  // Generate enrollments
  const enrollments = [];
  for (let i = 1; i <= 23; i++) {
    enrollments.push({
      id: i,
      professor: professorsList[i % 8],
      subject: subjects[i % 12],
      classModel: classes[i % 3],
      coe_subject: 10,
      coe_tp: 10,
      coe_ex: 10,
      coe_ds: 10,
    });
  }

  // Generate results for each combination of student, professor, and subject
  const results = [];
  students.forEach((student) => {
    professorsList.forEach((professor) => {
      subjects.forEach((subject) => {
        results.push({
          id: results.length + 1,
          student: student,
          enrollment:
            enrollments[Math.floor(Math.random() * enrollments.length)],
          note_ds: Math.floor(Math.random() * 20),
          note_tp: Math.floor(Math.random() * 20),
          note_ex: Math.floor(Math.random() * 20),
          year: new Date(),
          semester: Math.floor(Math.random() * 2) + 1,
          result_status: "Pass",
        });
      });
    });
  });

  return {
    students,
    professors: professorsList,
    classes,
    subjects,
    projects,
    enrollments,
    results,
  };
}

// Generate the dataset and write it to a file
const dataset = generateDataset();
const jsonData = JSON.stringify(dataset, null, 2);

fs.writeFileSync("dataset.json", jsonData, "utf8");
console.log("Dataset written to dataset.json");
