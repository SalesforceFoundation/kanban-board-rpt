# Salesforce Development RPT

Before you start, make sure to fork this repo and pull down to your machine. All instructions assume you are in the base of the project in your terminal
This document provides information on how to set up your machine to do Salesforce development needed for this RPT.
[Click here for RPT Assignment Details](REQUIREMENTS.md)

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
`sfdx force:apex:execute -f seed.apex`

### Check Out Your Org in your Browser
* In Visual Studio Code, press Command + Shift + P on macOS or Ctrl + Shift + P on Windows or Linux.
* Type sfdx.
* Select `SFDX: Open Default Scratch Org`
* Click the grid menu icon next to Setup for to open the App Launcher

![App Launcher Screenshot](images/appLauncher.png)
* Select Accounts

![Select account tab](images/selectAccountTab.png)
* Select the List view `All`

![All list view](images/allListView.png)
* Click on `We Can Can Recycling`
* This is the "Record Page". You should see a basic kanban board like this:

![Kanban Board](images/kanbanBoard.png)
* Should you need to add more tasks, you can do so by clicking the "Add" button under "New Task"

![Add new tasks](images/newTasks.png)

## Running Tests
To run Apex tests:
* In Visual Studio Code, press Command + Shift + P on macOS or Ctrl + Shift + P on Windows or Linux.
* Type sfdx.
* Select `SFDX: Invoke Apex Tests`
* Select the test class you want to run (i.e. TaskBoardController_TEST)
* This will run the tests in your scratch org and you will see the results of the tests in VS Code in the Output window

To Run LWC tests locally on your machine:
* At the base of your project folder run `npm install`
* After that successfully installs, run `npm run test:unit`
* LWC tests are found in the `__tests__` folder in your `lwc` folder. There are some tests in the components folders already to help you get started.