# TASK TRACKER
### Adding a new task
To create a new task use:
`task-cli add "Buy groceries"`
 <!-- Output: Task added successfully (ID: 1) -->

### Updating and deleting tasks
The command below is to update and existing task and as well delete a task respectively
`task-cli update 1 "Buy groceries and cook dinner"`
`task-cli delete 1`

### Marking a task as in progress or done
use the command below to mark a task as in-progress or done
`task-cli mark-in-progress 1`
`task-cli mark-done 1`

### Listing all taskst 
Use this command to list all task
`task-cli list`

### Listing tasks by status
Use the command below to list task whose status are "done", "todo" and "in-progress"
`task-cli list done`
`task-cli list todo`
`task-cli list in-progress`
