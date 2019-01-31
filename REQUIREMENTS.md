# Requirements

First, fork this repository - do not make branches of this repository.

During this sprint your scrum team is building a kanban board for managing tasks on an account. The first user story for creating the kanban board to display task records has already been completed. The second user story was started, but unfortunately the developer needed to hop off the story to work on something else. They handed it off to you informed you that they created two Lightning Web Components and one Apex Controller so far:

* Lightning Web Components
    * taskBoard - container for all the lanes and the tasks in that lane (each lane represents a Task status)
    * taskCard - holds an individual task
* Apex
    * TaskBoardController
        * contains controller methods exposed to the Lightning Web Components
    * TaskBoardController_TEST
        * contains test methods for TaskBoardController

Your job is to complete the rest of User Story 2 and User Story 3:

```
User Story 1:
    As a user
    I want to see all of my Task for a record in a kanban board
    So that I can more easily view all of the tasks for a record at once

Acceptance Criteria
    GIVEN the following Task Status values:
        'Not Started'
        'In Progress'
        'Completed'
        'Waiting on someone else'
        'Deferred'
    WHEN a record page is loaded
    THEN I should see a lane for each Status, even if there is no Task in that Status

    GIVEN a record with tasks associated to it
    WHEN the kanban board is loaded on a record's page
    THEN I should see a card for each Task in the correct lane based on its Status

    GIVEN a record with tasks associated to it
    WHEN the Task card is displayed on the kanban board
    THEN the card should display values for the following fields for the Task
        Owner
        Due Date
        Comments
Status: Completed!
```

```
User Story 2:
    As a user
    I want to edit the Comments on the Task cards on the board
    So that I can quickly add notes while reviewing the tasks

Acceptance Criteria:
    GIVEN a record with tasks associated to it
    WHEN the task card is displayed on the kanban board
    THEN a button with a pencil icon should be displayed on the card

    GIVEN a task card on kanban board
    WHEN the button with a pencil icon is clicked
    THEN an editable text area should be displayed so that Comments can be edited
        AND a button with a Checkmark icon should be displayed
        AND a button with an X icon should be displayed

    GIVEN a task card on kanban board that is being edited
    WHEN the button with X icon is clicked
    THEN the card should display as it did before pencil icon was clicked

    GIVEN a task card on kanban board that is being edited
    WHEN the comments are edited
        AND the button with Checkmark icon is clicked
    THEN the card should close the editable text area
        AND the card's Comments should be updated with the value that was entered while editing
        AND the Task should be updated in the database

Status: In Progress
```

```
User Story 3:
    As a user
    I want to drag the Task cards to different lanes
    So that I can quickly update the Status of the tasks
    Status: Not Started

Acceptance Criteria:
    GIVEN a Task in a lane in the kanban board
    WHEN the task card is dragged to another lane
    THEN then the task should be removed from it's original lane
        AND appear in the lane it was dragged to
        AND the Task's Status should be updated to the value of the lane it was dragged to in the database
Status: Not Started
```

Additional Notes

* Please refrain from using an external JavaScript libraries (i.e. React, Vue, jQuery). While we recognize that these libraries are useful, we want to gauge your ability to create solutions without these options.

* Please refrain from using Appexchange apps or declarative features such as formula fields, rollup summary fields, process builder or workflow for this answer. Please use only Apex, JavaScript, Lightning Components, etc.

* __We’re not looking for production-ready code__, but rather a workable starting architecture and design, code that meets the acceptance criteria as best as possible, and a brief list of outstanding issues needing to still be resolved or left unclear in the user-acceptance criteria or user story. 

* We encourage you to also refactor any code you see in the test. Some code is commented to call out where improvements can be made, but also feel free to make any improvements you deem necessary.

* __At Salesforce.org, work/life balance is important to us.__ Therefore we ask that you spend enough time on this exercise as you deem fit for your lifestyle.  Again, we are not looking for a complete solution but rather enough data to get a sense of your problem solving and coding skills, as well as the ability to discuss your solution with others.

Once your solution is complete, please send us a link to your forked repository with your solution so that our team can review.
