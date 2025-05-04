
db = db.getSiblingDB('zenClassDB');


db.users.drop();
db.codekata.drop();
db.attendance.drop();
db.topics.drop();
db.tasks.drop();
db.task_submissions.drop();
db.company_drives.drop();
db.drive_participants.drop();
db.mentors.drop();
db.mentorship.drop();


db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "batch", "joined_date"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "must be a valid email address and is required"
        },
        batch: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        joined_date: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        phone: {
          bsonType: "string",
          description: "must be a string"
        },
        education: {
          bsonType: "string",
          description: "must be a string"
        }
      }
    }
  }
});

db.createCollection("codekata", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "problem_id", "solved_on", "status"],
      properties: {
        user_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        problem_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        solved_on: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        status: {
          bsonType: "string",
          enum: ["solved", "attempted", "unsolved"],
          description: "must be one of the enum values and is required"
        }
      }
    }
  }
});

db.createCollection("attendance", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "date", "status"],
      properties: {
        user_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        date: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        status: {
          bsonType: "string",
          enum: ["present", "absent"],
          description: "must be present or absent and is required"
        },
        session_id: {
          bsonType: "objectId",
          description: "must be an objectId"
        }
      }
    }
  }
});

db.createCollection("topics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["topic_name", "taught_date"],
      properties: {
        topic_name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        description: {
          bsonType: "string",
          description: "must be a string"
        },
        taught_date: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        duration: {
          bsonType: "int",
          description: "must be an integer representing minutes"
        },
        mentor_id: {
          bsonType: "objectId",
          description: "must be an objectId"
        }
      }
    }
  }
});

db.createCollection("tasks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["task_name", "assigned_date", "deadline"],
      properties: {
        task_name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        topic_id: {
          bsonType: "objectId",
          description: "must be an objectId"
        },
        description: {
          bsonType: "string",
          description: "must be a string"
        },
        assigned_date: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        deadline: {
          bsonType: "date",
          description: "must be a date and is required"
        }
      }
    }
  }
});

// Create Task Submissions Collection with Schema Validation
db.createCollection("task_submissions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "task_id", "submission_date", "status"],
      properties: {
        user_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        task_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        submission_date: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        submission_link: {
          bsonType: "string",
          description: "must be a string"
        },
        status: {
          bsonType: "string",
          enum: ["submitted", "evaluated", "pending"],
          description: "must be one of the enum values and is required"
        }
      }
    }
  }
});

db.createCollection("company_drives", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["company_name", "drive_date"],
      properties: {
        company_name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        drive_date: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        description: {
          bsonType: "string",
          description: "must be a string"
        },
        location: {
          bsonType: "string",
          description: "must be a string"
        },
        requirements: {
          bsonType: "string",
          description: "must be a string"
        }
      }
    }
  }
});


db.createCollection("drive_participants", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["drive_id", "user_id", "status"],
      properties: {
        drive_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        user_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        status: {
          bsonType: "string",
          enum: ["registered", "appeared", "absent"],
          description: "must be one of the enum values and is required"
        },
        result: {
          bsonType: "string",
          enum: ["selected", "rejected", "pending"],
          description: "must be one of the enum values"
        }
      }
    }
  }
});

db.createCollection("mentors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "must be a valid email address and is required"
        },
        expertise: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "must be an array of strings"
        },
        experience: {
          bsonType: "int",
          description: "must be an integer representing years"
        }
      }
    }
  }
});

db.createCollection("mentorship", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["mentor_id", "mentee_id", "start_date"],
      properties: {
        mentor_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        mentee_id: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        start_date: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        end_date: {
          bsonType: "date",
          description: "must be a date"
        }
      }
    }
  }
});

print("Database schema with validation created successfully");
