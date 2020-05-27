const mongoose = require('mongoose');

//Connect to DB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('Could not connect to MongoDB', error));

//Create schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema); //class

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Simona',
        tags: ['node', 'backend'],
        isPublished: true
    }); //object, where there is many to many relationiship between courses and tags
    
    const result = await course.save(); //returns a promise
}

createCourse();

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author: 'Mosh', isPublished: 'true'})
        .skip((pageNumber - 1) * pageSize) //skip prevous pages
        .limit(pageSize)
        .sort({name: 1})          
        .select({name: 1, tags: 1});
    console.log(courses);
}

getCourses();