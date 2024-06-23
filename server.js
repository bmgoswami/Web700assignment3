/********************************************************************************* 
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
*  Name: BHAVYA GOSWAMI Student ID:148780232 Date: 22-06-2024_
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var collegeData = require("./modules/collegeData");

// Route to serve home.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// Route to serve all students or students by course
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => res.json(data))
            .catch(err => res.json({ message: err }));
    } else {
        collegeData.getAllStudents()
            .then(data => res.json(data))
            .catch(err => res.json({ message: err }));
    }
});

// Route to serve all TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }));
});

// Route to serve all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }));
});

// Route to serve a single student by student number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(data => res.json(data))
        .catch(err => res.json({ message: err }));
});

// Route to serve about.html
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// Route to serve htmlDemo.html
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

// 404 error handling
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Initialize collegeData and start the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port: ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.log("Unable to start server: ", err);
    });
