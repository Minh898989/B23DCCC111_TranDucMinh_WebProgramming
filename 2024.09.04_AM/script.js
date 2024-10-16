class Student {
    constructor(id, fullName, gender, dob, hometown) {
        this.id = id;
        this.fullName = fullName;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManagement {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    }

    addOrUpdateStudent(student) {
        const index = this.students.findIndex(stu => stu.id === student.id);
        if (index === -1) {
            this.students.push(student);
        } else {
            this.students[index] = student;
        }
        this.save();
        this.displayStudents();
    }

    save() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    displayStudents() {
        const studentList = document.getElementById('studentList');
        studentList.innerHTML = '';

        this.students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.fullName}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="editStudent('${student.id}')">Sửa</button>
                    <button onclick="deleteStudent('${student.id}')">Xóa</button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }

    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.save();
        this.displayStudents();
    }

    findStudentById(id) {
        return this.students.find(student => student.id === id);
    }
}

const studentManagement = new StudentManagement();
studentManagement.displayStudents();

function addOrUpdateStudent() {
    const id = document.getElementById('studentId').value;
    const fullName = document.getElementById('fullName').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('hometown').value;


    if (id === '' || fullName === '' || dob === '' || hometown === '') {
        alert('Please fill in all fields');
        return;
    }

    const newStudent = new Student(id, fullName, gender, dob, hometown);
    studentManagement.addOrUpdateStudent(newStudent);
    clearForm();
}

function editStudent(id) {
    const student = studentManagement.findStudentById(id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('fullName').value = student.fullName;
        document.getElementById('gender').value = student.gender;
        document.getElementById('dob').value = student.dob;
        document.getElementById('hometown').value = student.hometown;

    }
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        studentManagement.deleteStudent(id);
    }
}

function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('hometown').value = '';

}