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
    return await Course
        .find({ isPublished: 'true'})
        .or([ {tags: 'fronend'}, {tags: 'backend'}])
        .sort({price: -1})          
        .select({name: 1, author: 1});
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();


// async function updateCourse(id) {
//     //Query First
//     const result = await Course.update({_id: id}, {
//         $set: {
//             author: 'Simona',
//             isPublished: false
//         }
//     });
//     console.log(result);
//     //Update first
// }

// updateCourse('5ececb1366286d4e04524ffe');

async function updateAndFindCourse(id) {
    //Query First
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Simona',
            isPublished: true
        }
    }, {new: true});
    console.log(course);
}

updateAndFindCourse('5a6900fff467be65019a9001');