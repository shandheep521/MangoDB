#MongoDB Database

This project implements a MongoDB database for a Zen class programme. It includes collections for users, code challenges (codekata), attendance, topics, tasks, company drives, mentors, and mentorship relationships.

## Collections

1. **users** - Store user information
2. **codekata** - Track problems solved by users
3. **attendance** - Record user attendance
4. **topics** - Store topic information
5. **tasks** - Store task information
6. **task_submissions** - Track task submissions
7. **company_drives** - Store company drive details
8. **drive_participants** - Track users participating in drives
9. **mentors** - Store mentor information
10. **mentorship** - Track mentor-mentee relationships

## Files

- **schema.js** - Database schema and collections structure
- **sample-data.js** - Sample data insertion
- **queries.js** - MongoDB queries for the specified tasks

## Queries Implemented

1. Find all the topics and tasks which are taught in the month of October
2. Find all the company drives which appeared between 15 Oct-2020 and 31-Oct-2020
3. Find all the company drives and students who appeared for the placement
4. Find the number of problems solved by each user in codekata
5. Find all the mentors with more than 15 mentees
6. Find the number of users who are absent and did not submit tasks between 15 Oct-2020 and 31-Oct-2020

