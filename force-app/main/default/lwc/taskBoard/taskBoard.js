import { LightningElement, api, wire, track } from 'lwc';
import getTasks from '@salesforce/apex/TaskBoardController.getTasks';

export default class TaskBoard extends LightningElement {
    //Allows the component to be aware of the ID of the record (i.e. the Account)
    //that it is embedded on
    @api recordId;

    @track taskLanes = [
        {id: 1, title: "Not Started", name: "notStartedTasksLane", tasks: []},
        {id: 2, title: "In Progress", name: "inProgressTasksLane", tasks: []},
        {id: 3, title: "Completed", name: "completedTasksLane", tasks: []},
        {id: 4, title: "Waiting on someone else", name: "waitingOnSomeoneTasksLane", tasks: []},
        {id: 5, title: "Deferred", name: "deferredTasksLane", tasks: []}
    ];
    
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
}