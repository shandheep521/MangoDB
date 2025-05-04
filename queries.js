
db = db.getSiblingDB('zenClassDB');

print("\n1. Topics taught in October 2020:");
const octoberTopics = db.topics.find({
  taught_date: {
    $gte: new Date("2020-10-01"),
    $lte: new Date("2020-10-31")
  }
}).toArray();

octoberTopics.forEach(topic => {
  print(`Topic: ${topic.topic_name}, Date: ${topic.taught_date.toDateString()}`);
});

print("\nTasks assigned in October 2020:");
const octoberTasks = db.tasks.find({
  assigned_date: {
    $gte: new Date("2020-10-01"),
    $lte: new Date("2020-10-31")
  }
}).toArray();

octoberTasks.forEach(task => {
  print(`Task: ${task.task_name}, Assigned: ${task.assigned_date.toDateString()}`);
});

print("\n2. Company drives between Oct 15-31, 2020:");
const octoberDrives = db.company_drives.find({
  drive_date: {
    $gte: new Date("2020-10-15"),
    $lte: new Date("2020-10-31")
  }
}).toArray();

octoberDrives.forEach(drive => {
  print(`Company: ${drive.company_name}, Date: ${drive.drive_date.toDateString()}`);
});

print("\n3. Students who appeared for placement drives:");
const driveParticipants = db.drive_participants.aggregate([
  {
    $match: { status: "appeared" }
  },
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "student"
    }
  },
  {
    $lookup: {
      from: "company_drives",
      localField: "drive_id",
      foreignField: "_id",
      as: "drive"
    }
  },
  {
    $project: {
      student_name: { $arrayElemAt: ["$student.name", 0] },
      company_name: { $arrayElemAt: ["$drive.company_name", 0] },
      drive_date: { $arrayElemAt: ["$drive.drive_date", 0] },
      result: 1
    }
  }
]).toArray();

driveParticipants.forEach(participant => {
  print(`Student: ${participant.student_name}, Company: ${participant.company_name}, Date: ${participant.drive_date.toDateString()}, Result: ${participant.result}`);
});

print("\n4. Number of problems solved by each user in codekata:");
const problemsSolved = db.codekata.aggregate([
  {
    $match: { status: "solved" }
  },
  {
    $group: {
      _id: "$user_id",
      problems_solved: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user_details"
    }
  },
  {
    $project: {
      user_name: { $arrayElemAt: ["$user_details.name", 0] },
      problems_solved: 1
    }
  }
]).toArray();

problemsSolved.forEach(user => {
  print(`User: ${user.user_name}, Problems Solved: ${user.problems_solved}`);
});

print("\n5. Mentors with more than 15 mentees:");
const mentorsWithManyMentees = db.mentorship.aggregate([
  {
    $group: {
      _id: "$mentor_id",
      mentee_count: { $sum: 1 }
    }
  },
  {
    $match: {
      mentee_count: { $gt: 15 }
    }
  },
  {
    $lookup: {
      from: "mentors",
      localField: "_id",
      foreignField: "_id",
      as: "mentor_details"
    }
  },
  {
    $project: {
      mentor_name: { $arrayElemAt: ["$mentor_details.name", 0] },
      mentee_count: 1
    }
  }
]).toArray();

mentorsWithManyMentees.forEach(mentor => {
  print(`Mentor: ${mentor.mentor_name}, Mentees: ${mentor.mentee_count}`);
});

print("\n6. Users absent and not submitted tasks between Oct 15-31, 2020:");
const absentUsersNoSubmission = db.attendance.aggregate([
  {
    $match: {
      date: {
        $gte: new Date("2020-10-15"),
        $lte: new Date("2020-10-31")
      },
      status: "absent"
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user_details"
    }
  },
  {
    $lookup: {
      from: "task_submissions",
      let: { userId: "$user_id" },
      pipeline: [
        {
          $lookup: {
            from: "tasks",
            localField: "task_id",
            foreignField: "_id",
            as: "task_details"
          }
        },
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$user_id", "$$userId"] },
                {
                  $gte: [
                    { $arrayElemAt: ["$task_details.deadline", 0] },
                    new Date("2020-10-15")
                  ]
                },
                {
                  $lte: [
                    { $arrayElemAt: ["$task_details.deadline", 0] },
                    new Date("2020-10-31")
                  ]
                }
              ]
            }
          }
        }
      ],
      as: "submitted_tasks"
    }
  },
  {
    $match: {
      "submitted_tasks": { $size: 0 }
    }
  },
  {
    $group: {
      _id: null,
      absent_users_with_no_submission: { $sum: 1 },
      users: { $push: { $arrayElemAt: ["$user_details.name", 0] } }
    }
  }
]).toArray();

if (absentUsersNoSubmission.length > 0) {
  print(`Count: ${absentUsersNoSubmission[0].absent_users_with_no_submission}`);
  print(`Users: ${absentUsersNoSubmission[0].users.join(', ')}`);
} else {
  print("No users found who were absent and didn't submit tasks in the given period.");
}
