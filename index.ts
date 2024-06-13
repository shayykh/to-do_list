#!/usr/bin/env node

import inquirer from 'inquirer'
console.log('Welcome to the To Do List App')

let todos: string[] = []

async function mainMenu () {
    const answer = await inquirer.prompt({
        type: 'list',
        message: 'Choose an operation:',
        name: 'operation',
        choices: ['Add', 'Update', 'View', 'Delete', 'Exit']
    })
    return answer.operation
}

async function addTodo () {
    const answer = await inquirer.prompt({
        type: 'input',
        message: 'Add items to the list:',
        name: 'todo'
    })
    todos.push(answer.todo)
    console.log('Updated list:')
    todos.forEach(todo => console.log(todo))
}

async function updateTodo () {
    const answer = await inquirer.prompt({
        type: 'list',
        message: 'Choose an item to update:',
        name: 'todo',
        choices: todos
    })

    const newTodo = await inquirer.prompt({
        type: 'input',
        message: 'Enter the new value:',
        name: 'todo'
    })

    const index = todos.indexOf(answer.todo)
    if (index !== -1) {
        todos[index] = newTodo.todo
    }
    console.log('Updated list:')
    todos.forEach(todo => console.log(todo))
}

function viewTodos () {
    console.log('* TO DO LIST *')
    todos.forEach(todo => console.log(todo))
}

async function deleteTodo () {
    const answer = await inquirer.prompt({
        type: 'list',
        message: 'Choose an item to delete:',
        name: 'todo',
        choices: todos
    })

    todos = todos.filter(todo => todo !== answer.todo)
    console.log('Updated list:')
    todos.forEach(todo => console.log(todo))
}

async function manageTodos () {
    let running = true
    while (running) {
        const operation = await mainMenu()
        
        switch (operation) {
        case 'Add':
            await addTodo()
            break
        case 'Update':
            await updateTodo()
            break
        case 'View':
            viewTodos()
            break
        case 'Delete':
            await deleteTodo()
            break
        case 'Exit':
            running = false
            break
        }
    }
}

manageTodos()