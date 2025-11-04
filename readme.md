# TASK TRACKER
This application runs in the terminal and its purpose is to help you create tasks and track the task all in the terminal  
Run the command `npm link` to create a link for the command "task-cli" in the node file on your computer  
project url : https://roadmap.sh/projects/task-tracker

### Adding a new task
To create a new task use:  
`task-cli add "Buy groceries"`
 <!-- Output: Task added successfully (ID: 1) -->

### Updating and deleting tasks
The command below is to update and existing task and as well delete a task respectively  
`task-cli update {taskId} "Buy groceries and cook dinner"`  
`task-cli delete {taskId}`

### Marking a task as in progress or done
use the command below to mark a task as in-progress or done  
`task-cli mark-in-progress {taskId}`  
`task-cli mark-done {taskId}`

### Listing all tasks 
Use this command to list all task  
`task-cli list`

### Listing tasks by status
Use the command below to list task whose status are "done", "todo" and "in-progress"
`task-cli list done`  
`task-cli list todo`  
`task-cli list in-progress`
