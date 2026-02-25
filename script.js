let students = [];

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let id = studentId.value.trim();

  if (students.some(s => s.id === id)) {
    alert("Student ID already exists!");
    return;
  }

  let student = {
    id: id,
    name: name.value,
    email: email.value,
    password: password.value,
    age: age.value,
    gender: gender.value,
    form: parseInt(form.value),
    performance: []
  };

  students.push(student);
  this.reset();
  displayStudents();
});

document.getElementById("performanceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let student = students.find(s => s.id === perfId.value);

  if (!student) {
    alert("Student not found");
    return;
  }

  student.performance = [{
    form: student.form,
    subjects: {
      math: +math.value,
      english: +english.value,
      science: +science.value,
      social: +social.value
    }
  }];

  this.reset();
  displayStudents();
});

function average(student) {
  if (student.performance.length === 0) return "-";
  let s = student.performance[0].subjects;
  return ((s.math + s.english + s.science + s.social) / 4).toFixed(1);
}

function displayStudents() {
  studentTable.innerHTML = "";
  students.forEach((s, i) => {
    studentTable.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.form}</td>
        <td>${average(s)}</td>
        <td>
          <button onclick="promote(${i})">Promote</button>
          <button class="danger" onclick="removeStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function promote(index) {
  if (students[index].form < 4) {
    students[index].form++;
    students[index].performance = [];
    displayStudents();
  } else {
    alert("Already in Form 4");
  }
}

function removeStudent(index) {
  if (confirm("Delete this student?")) {
    students.splice(index, 1);
    displayStudents();
  }
}