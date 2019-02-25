import { LightningElement, api, wire, track } from 'lwc';
import getTasks from '@salesforce/apex/TaskBoardController.getTasks';
import getUpdatedTasks from '@salesforce/apex/TaskBoardController.getUpdatedTasks';

export default class TaskBoard extends LightningElement {
    //Allows the component to be aware of the ID of the record (i.e. the Account)
    //that it is embedded on
    @api recordId;
    @track newStatus;
    @track oldStatus;
    @track taskId;
    taskNewLaneStatus;
    @track taskLanes = [
        {id: 1, title: "Not Started", name: "notStartedTasksLane", className: "notStartedTask", tasks: []},
        {id: 2, title: "In Progress", name: "inProgressTasksLane", className: "inProgressTask", tasks: []},
        {id: 3, title: "Completed", name: "completedTasksLane", className: "completedTask", tasks: []},
        {id: 4, title: "Waiting on someone else", name: "waitingOnSomeoneTasksLane", className: "waitingOnSomeoneTask", tasks: []},
        {id: 5, title: "Deferred", name: "deferredTasksLane", className: "deferredTask", tasks: []}
    ];
    
    // Initializes task records, lanes, etc.
    @wire(getTasks, { recordId: '$recordId' })
    processTasks({ error, data }) {

        if (data) {
            
            data.forEach(element => {
                this.taskLanes.forEach(lane => {
                    if (element.Status === lane.title) {
                        this.taskLanes[lane.id-1].tasks.push(element);
                    }
                });
            });
        } else if (error) {
            console.log(error);
        }
    }

    @wire(getUpdatedTasks, { recordId: '$recordId', taskId: '$taskId' , newStatus: '$newStatus' })
    updatedTasks({ error, data }) {
        if (data) {
            // If data, then filter out any tasks with old status
            // This should only leave tasks with the new status ** NOT WORKING AS PLANNED :P **
            this.taskLanes.forEach(lane => {
                lane.tasks.filter(task => {
                    if (task.ID === this.taskId) {
                        return task.Status !== this.oldStatus;
                    }
                    console.log(JSON.stringify(task));
                    return task;
                })
            })

            // data.forEach(element => {
            //     this.taskLanes.forEach(lane => {
            //         if (element.Status === lane.title) {
            //             let tempTasksArr = [];
            //             tempTasksArr.push(element);
            //             // console.log(JSON.stringify(tempTasksArr));
            //             this.taskLanes[lane.id-1].tasks = tempTasksArr;
            //         }
            //     });
            // });
        } else  if (error) {
            console.log(JSON.stringify(error));
        }
    }

    handleDragOver(event) {
        event.preventDefault();
        event.currentTarget.classList.add('dragged-over');
    }

    handleDragLeave(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('dragged-over');
    }

    handleDrop(event) {
        event.preventDefault();
        event.currentTarget.classList.remove('dragged-over');

        this.taskNewLaneStatus = event.currentTarget.dataset.lane;
        this.template.querySelector('c-task-card.moving').newLane(this.taskNewLaneStatus);
        this.template.querySelector('c-task-card.moving').classList.remove('moving');
    }

    handleDragging(event) {
        event.target.classList.add('moving');
    }

    handleTaskUpdate(event) {
        this.newStatus = this.taskNewLaneStatus;
        this.taskId = event.detail.taskId;
        this.oldStatus = event.detail.oldStatus;
    }
}