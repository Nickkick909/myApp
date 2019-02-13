class Student {
    firstName: String;
    lastName: String;
    admissionYear: number;

    constructor(firstName: String, lastName: String, 
        adYear: number) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.admissionYear = adYear;
        }

};

let student1: Student = new Student("Bob", "Jones", 2019);
let student2: Student = new Student("Jerry", "Smalls", 2015);
let student3: Student = new Student("Caroline", "Catone", 2016);
let student4: Student = new Student("Jennifer", " Laurence", 2017);
let student5: Student = new Student("Nick", "Cannon", 2018);
var students = new Array();
students.push(student1, student2, student3, student4, student5);
//console.log(student1.firstName); 
var i : number;
for(i= 0; i<5; i++) {
    console.log(students[i].firstName + " " 
    + students[i].lastName + " will graduate in ");
    if(students[i].admissionYear == 2014)
        console.log("0 years");
    if(students[i].admissionYear == 2015)
        console.log("1 years");
    if(students[i].admissionYear == 2016)
        console.log("2 years");
    if(students[i].admissionYear == 2017)
        console.log("3 years");
    if(students[i].admissionYear == 2018)
        console.log("4 years");
    if(students[i].admissionYear == 2019)
        console.log("5 years");
}

