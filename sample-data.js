
db = db.getSiblingDB('zenClassDB');


db.users.insertMany([
  {
    name: "John Doe",
    email: "john.doe@example.com",
    batch: "B30WD",
    joined_date: new Date("2020-08-15"),
    phone: "9876543210",
    education: "B.Tech"
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    batch: "B30WD",
    joined_date: new Date("2020-08-15"),
    phone: "9876543211",
    education: "MCA"
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    batch: "B30WD",
    joined_date: new Date("2020-08-15"),
    phone: "9876543212",
    education: "B.Sc"
  },
  {
    name: "Bob Brown",
    email: "bob.brown@example.com",
    batch: "B31WD",
    joined_date: new Date("2020-09-01"),
    phone: "9876543213",
    education: "B.E"
  }
]);


const users = db.users.find().toArray();
const user1Id = users[0]._id;
const user2Id = users[1]._id;
const user3Id = users[2]._id;
const user4Id = users[3]._id;


db.mentors.insertMany([
  {
    name: "Mentor One",
    email: "mentor.one@example.com",
    expertise: ["JavaScript", "React", "Node.js"],
    experience: 5
  },
  {
    name: "Mentor Two",
    email: "mentor.two@example.com",
    expertise: ["MongoDB", "Express", "Python"],
    experience: 7
  },
  {
    name: "Mentor Three",
    email: "mentor.three@example.com",
    expertise: ["Data Structures", "Algorithms", "Java"],
    experience: 6
  }
]);

const mentors = db.mentors.find().toArray();
const mentor1Id = mentors[0]._id;
const mentor2Id = mentors[1]._id;
const mentor3Id = mentors[2]._id;


db.topics.insertMany([
  {
    topic_name: "JavaScript Basics",
    description: "Introduction to JavaScript",
    taught_date: new Date("2020-09-25"),
    duration: 120,
    mentor_id: mentor1Id
  },
  {
    topic_name: "React Components",
    description: "Understanding React component lifecycle",
    taught_date: new Date("2020-10-05"),
    duration: 180,
    mentor_id: mentor1Id
  },
  {
    topic_name: "MongoDB Introduction",
    description: "Basics of MongoDB and document model",
    taught_date: new Date("2020-10-12"),
    duration: 150,
    mentor_id: mentor2Id
  },
  {
    topic_name: "Express Middleware",
    description: "Express.js middleware and routing",
    taught_date: new Date("2020-10-20"),
    duration: 120,
    mentor_id: mentor2Id
  },
  {
    topic_name: "Data Structures",
    description: "Arrays, Linked Lists, Stacks, Queues",
    taught_date: new Date("2020-10-25"),
    duration: 180,
    mentor_id: mentor3Id
  },
  {
    topic_name: "Node.js Fundamentals",
    description: "Node.js architecture and modules",
    taught_date: new Date("2020-11-05"),
    duration: 150,
    mentor_id: mentor1Id
  }
]);

const topics = db.topics.find().toArray();
const topic1Id = topics[0]._id;
const topic2Id = topics[1]._id;
const topic3Id = topics[2]._id;
const topic4Id = topics[3]._id;
const topic5Id = topics[4]._id;


db.tasks.insertMany([
  {
    task_name: "JavaScript Exercise",
    topic_id: topic1Id,
    description: "Complete 5 JavaScript problems",
    assigned_date: new Date("2020-09-26"),
    deadline: new Date("2020-09-30")
  },
  {
    task_name: "React ToDo App",
    topic_id: topic2Id,
    description: "Create a simple ToDo application using React",
    assigned_date: new Date("2020-10-06"),
    deadline: new Date("2020-10-10")
  },
  {
    task_name: "MongoDB CRUD Operations",
    topic_id: topic3Id,
    description: "Implement CRUD operations using MongoDB",
    assigned_date: new Date("2020-10-13"),
    deadline: new Date("2020-10-17")
  },
  {
    task_name: "Express API",
    topic_id: topic4Id,
    description: "Build a RESTful API using Express.js",
    assigned_date: new Date("2020-10-21"),
    deadline: new Date("2020-10-25")
  },
  {
    task_name: "DS Implementation",
    topic_id: topic5Id,
    description: "Implement linked list and stack",
    assigned_date: new Date("2020-10-26"),
    deadline: new Date("2020-10-31")
  }
]);
