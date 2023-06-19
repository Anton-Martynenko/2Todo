import {TasksStateType, TodolistsType} from "../App";
import {AddTodolistAC, todolistsReducer} from "./todolists-Reducer";
import {tasksReducer} from "./tasks-Reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistsType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newTodolistId)
    expect(idFromTodolists).toBe(action.newTodolistId)
})