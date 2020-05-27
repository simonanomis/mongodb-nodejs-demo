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
    const courses = await Course
        .find({ author: 'Mosh', isPublished: 'true'})
        .limit(2)
        .sort({name: 1})          //ASC = 1, DESC = -1 
        .select({ name: 1, tags: 1 });  
         //which properties we want to return from query
    console.log(courses);
}

getCourses();