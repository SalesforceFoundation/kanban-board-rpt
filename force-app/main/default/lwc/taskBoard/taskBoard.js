import { LightningElement, api, wire, track } from 'lwc';
import getTasks from '@salesforce/apex/TaskBoardController.getTasks';

export default class TaskBoard extends LightningElement {
    //Allows the component to be aware of the ID of the record (i.e. the Account)
    //that it is embedded on
    @api recordId;
    @track taskLanes = [
        {id: 1, title: "Not Started", name: "notStartedTasksLane", className: "notStartedTask", tasks: []},
        {id: 2, title: "In Progress", name: "inProgressTasksLane", className: "inProgressTask", tasks: []},
        {id: 3, title: "Completed", name: "completedTasksLane", className: "completedTask", tasks: []},
        {id: 4, title: "Waiting on someone else", name: "waitingOnSomeoneTasksLane", className: "waitingOnSomeoneTask", tasks: []},
        {id: 5, title: "Deferred", name: "deferredTasksLane", className: "deferredTask", tasks: []}
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

        let newLane = event.currentTarget.dataset.lane;
        this.template.querySelector('c-task-card.moving').newLane(newLane);
        this.template.querySelector('c-task-card.moving').classList.remove('moving');
    }

    handleDragging(event) {
        event.target.classList.add('moving');
    }
}