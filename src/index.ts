#!/usr/bin/env node
import fs from "fs";
import path from "path";
import type { Task } from "./types/alias.js";
import { Status } from "./types/enum.js";

const dbPath = path.resolve(process.cwd(), "db.json");
let data: Task[] = [];

//Reading from db.json file
try {
  data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
} catch (err) {
  console.log("Error trying to read the file", err);
}

if (process.argv.length > 2) {
  // Creating a task[Create]
  if (process.argv[2] === "add") {
    if (process.argv.length === 3) {
      console.log("Please provide a description for the task");
      process.exit(1);
    } else if (process.argv.length === 4 && process.argv[3] !== undefined) {
      //Creating a task
      let task: Task = {
        id: data.length + 1,
        description: process.argv[3],
        status: Status.TODO,
        createdAt: new Date(Date.now()).toISOString(),
        updateAt: null,
      };

      // Adding the task to the db
      data.push(task);

      //Writing the task to the json file
      try {
        fs.writeFileSync(dbPath, JSON.stringify(data));
        console.log("Task added successfully!");
      } catch (err) {
        console.log("Error", err);
      }

      process.exit(1);
    } else {
      console.log("You've provided to many argument");
      process.exit(1);
    }
  }

  // Listing of Tasks[Read]
  else if (process.argv[2] === "list") {
    if (process.argv.length === 3) {
      console.log("==================== LIST OF TASK ====================");
      console.log(data);

      process.exit(1);
    } else if (process.argv[3] === "done" && process.argv.length === 4) {
      let completedTask: Task[] = [];
      completedTask = data.filter((el) => el.status === Status.DONE);

      if (completedTask.length === 0) {
        console.log("No task has been completed yet");
        process.exit(1);
      }
      console.log(
        "===================== LIST OF TASK IN PROGRESS ====================="
      );

      console.log(completedTask);
      process.exit(1);
    } else if (process.argv[3] === "in-progress" && process.argv.length === 4) {
      let completedTask: Task[] = [];
      completedTask = data.filter((el) => el.status === Status.INPROGRESS);

      if (completedTask.length === 0) {
        console.log("No task has been marked as in progress");
        process.exit(1);
      }

      console.log(
        "===================== LIST OF TASK IN PROGRESS ====================="
      );

      console.log(completedTask);
      process.exit(1);
    } else {
      console.log("Too many argument provided!");
    }
  }

  // Updating a task[Update]
  else if (
    process.argv[2] === "update" ||
    process.argv[2] === "mark-in-progress" ||
    process.argv[2] === "mark-done"
  ) {
    if (process.argv[2] === "update" && process.argv.length !== 5) {
      console.log(
        "Please provide the necessary argument in the form: 'task-cli update {task id} {new task description}'"
      );
      process.exit(1);
    } else if (process.argv[2] !== "update" && process.argv.length !== 4) {
      console.log(
        "Please provide the necessary argument in the form: 'task-cli mark-done/mark-in-progress {task id}"
      );
      process.exit(1);
    }
    const taskId: number | undefined = Number(process.argv[3]);

    if (Number.isNaN(taskId)) {
      console.log("Provide a valid task Id! Task id must be a number.");
      process.exit();
    }

    const task: Task | undefined = data.find((el) => el.id === taskId);

    if (!task) {
      console.log(`No task found with ID ${taskId}`);
      process.exit(1);
    }

    let newTask: Task;

    if (process.argv[2] === "update") {
      newTask = {
        id: task.id,
        description: process.argv[4]!,
        status: task.status,
        createdAt: task.createdAt,
        updateAt: new Date(Date.now()).toISOString(),
      };
    } else if (process.argv[2] === "mark-in-progress") {
      // Marking task as 'in-progress'
      newTask = {
        id: task.id,
        description: task.description,
        status: Status.INPROGRESS,
        createdAt: task.createdAt,
        updateAt: new Date(Date.now()).toISOString(),
      };
    } else if (process.argv[2] === "mark-done") {
      // Marking task as done
      newTask = {
        id: task.id,
        description: task.description,
        status: Status.DONE,
        createdAt: task.createdAt,
        updateAt: new Date(Date.now()).toISOString(),
      };
    }
      const newData = data.map((el) => {
        if (el.id === taskId) {
          return newTask;
        }
        return el;
      });

    try {
      fs.writeFileSync(dbPath, JSON.stringify(newData));

      console.log(`Task with ID ${taskId} updated successfully.`);
      process.exit(1);
    } catch (err) {
      console.log("Error while saving update", err);
      process.exit(1);
    }
  } else {
    console.log("command not found");
  }
} else {
  console.log("");
  process.exit(1);
}
