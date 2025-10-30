#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Status } from "./types/enum.js";
const dbPath = path.resolve(process.cwd(), "db.json");
let data = [];
console.log(process.argv);
//Reading from db.json file
try {
    data = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}
catch (err) {
    console.log("Error trying to read the file", err);
}
if (process.argv.length > 2) {
    // Creating a task[Create]
    if (process.argv[2] === "add") {
        if (process.argv.length === 3) {
            console.log("Please provide a description for the task");
            process.exit(1);
        }
        else if (process.argv.length === 4 && process.argv[3] !== undefined) {
            //Creating a task
            let task = {
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
            }
            catch (err) {
                console.log("Error", err);
            }
            process.exit(1);
        }
        else {
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
        }
        else if (process.argv[3] === "done" && process.argv.length === 4) {
            let completedTask = [];
            completedTask = data.filter((el) => el.status === Status.DONE);
            if (completedTask.length === 0) {
                console.log("No task has been completed yet");
                process.exit(1);
            }
            console.log("===================== LIST OF TASK IN PROGRESS =====================");
            console.log(completedTask);
            process.exit(1);
        }
        else if (process.argv[3] === "in-progress" && process.argv.length === 4) {
            let completedTask = [];
            completedTask = data.filter((el) => el.status === Status.INPROGRESS);
            if (completedTask.length === 0) {
                console.log("No task has been marked as in progress");
                process.exit(1);
            }
            console.log("===================== LIST OF TASK IN PROGRESS =====================");
            console.log(completedTask);
            process.exit(1);
        }
        else {
            console.log("Too many argument provided!");
        }
    }
    // Updating a task[Update]
    else if (process.argv[2] === "updating") {
    }
    // Marking task as 'in-progress'
    else if (process.argv[2] === "mark-in-progress") {
    }
    // Marking task as done
    else if (process.argv[2] === "mark-done") {
    }
    else {
        console.log("command not found");
    }
}
else {
    console.log("");
    process.exit(1);
}
//# sourceMappingURL=index.js.map