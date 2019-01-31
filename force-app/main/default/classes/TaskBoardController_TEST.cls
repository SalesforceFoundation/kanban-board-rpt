@isTest
private with sharing class TaskBoardController_TEST {

    @isTest
    private static void shouldGetTasksForRecord() {
        Account testAccount = new Account(Name = 'Test Account');
        insert testAccount;
        List<Task> expectedTasks = new List<Task>();

        expectedTasks.add(
            new Task(
                WhatId = testAccount.Id,
                Subject = 'Launch recycling campaign'
            )
        );

        expectedTasks.add(
            new Task(
                WhatId = testAccount.Id,
                Subject = 'Confirm sponsor donations'
            )
        );

        insert expectedTasks;
        
        Task unexpectedTask = new Task(
            Subject = 'Some unrelated task'
        );
        insert unexpectedTask;

        Test.startTest();
        List<Task> retrievedTasks = TaskBoardController.getTasks(testAccount.Id);
        Test.stopTest();

        System.assertEquals(expectedTasks.size(), retrievedTasks.size(), 'The correct number of tasks should be retrieved');

        Set<Id> retrievedTaskIds = new Set<Id>();
        for (Task aTask : retrievedTasks) {
            retrievedTaskIds.add(aTask.Id);
        }

        for (Task aTask : expectedTasks) {
            System.assert(retrievedTaskIds.contains(aTask.Id), 'The tasks related Account should be retrieved');
        }

        System.assert(!retrievedTaskIds.contains(unexpectedTask.Id),
            'The tasks unrelated Account should not be retrieved');
    }

    @isTest
    private static void shouldCreateNewTasks(){
        System.assert(false, 'Implement test for TaskBoardController.saveTasks!');
    }

    @isTest
    private static void shouldUpdateTasks(){
        System.assert(false, 'Implement test for TaskBoardController.saveTasks!');
    }
}
