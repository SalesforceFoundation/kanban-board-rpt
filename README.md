# Salesforce Development RPT

## Setup

### Install tools
First you'll need to install some tools on your machine. Please follow these steps in this Trailhead module to get started:

[Link to Trailhead instructions](https://trailhead.salesforce.com/content/learn/projects/set-up-your-lightning-web-components-developer-tools/install-development-tools?trail_id=build-lightning-web-components)

Make sure you:
* Sign up for pre-release Developer Edition org
* Enable Dev Hub in that Org
* Install the SFDX CLI with the pre-release enabled.
* Installed Visual Studio Code
    * While it is possible to use a different IDE/Editor, we will not be able to answer any questions regarding your set up and thus do not recommend doing so for this RPT
* Installed the Lightning Web Components extension in Visual Studio Code

### Authorize a Dev Hub
First you'll need to Authorize a Dev Hub. A Dev Hub allows you to create scratch orgs, which are basically developer environments hosted on Salesforce.

* In Visual Studio Code, press Command + Shift + P on macOS or Ctrl + Shift + P on Windows or Linux.
* Type sfdx.
* Select `SFDX: Authorize a Dev Hub`
* Log in using your pre-release Dev Hub org credentials
* Click Allow.
* After you authenticate in the browser, the CLI remembers your Dev Hub credentials and you should a success message in the Output window in VS Code

### Create a Default Scratch Org
A scratch org is an ephemeral salesforce instance that only lasts for 7 to 30 days (based on your settings) that is source control driven, meaning the only things that exist in it are the basic out of Salesforce features and anything you have in version control.

* In Visual Studio Code, press Command + Shift + P on macOS or Ctrl + Shift + P on Windows or Linux.
* Type sfdx.
* Select `SFDX: Create a Default Scratch Org....`
* Press Enter to accept the default `project-scratch-def.json`
* Press Enter to accept the default scratch org alias
* Press Enter to accept the default 7 days scratch org duration
* Be patient, creating a scratch org can take a minute. A success message will appear in Output window in Visual Studio Code once complete with a message like `Successfully created scratch org...`

### Push Source to Org
Now you need to push your source code to org.
* In Visual Studio Code, press Command + Shift + P on macOS or Ctrl + Shift + P on Windows or Linux.
* Type sfdx.
* Select `SFDX: Push Source to Default Scratch Org`
* Since is this is the first time your pushing your source code to your scratch org, this may take a minute. When complete, you'll see the results in the Output window in Visual Studio Code.
* This is the same command you'll use to push any changes you make your source code. This command does a diff and only pushes code that has actually changed, so subsequent pushes will be faster than the initial one.

### Add Test Data
Add some test data to your org. Run this command from the base folder of your project. It will run a script that inserts data into your scratch org.
sfdx force:apex:execute -f seed.apex

### Check Out Your Org in your Browser
* In Visual Studio Code, press Command + Shift + P on macOS or Ctrl + Shift + P on Windows or Linux.
* Type sfdx.
* Select `SFDX: Open Default Scratch Org`
* Click the grid menu icon next to Setup
* Select Account
* You should see We Can Can Recycling
*

## User Stories
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