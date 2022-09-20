import { createCustomError } from '../errors/custom-error.js';
import { asyncWrapper } from '../middleware/async.js';
import { Task } from '../models/task.js';

const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({success : true, tasks});
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({success : true, task, msg : 'Successfully Created'});
})

const getTask = asyncWrapper(async (req, res, next) => {
    const {id:taskId} = req.params;
    const task = await Task.findById(taskId);
    if(!task){
        return next(createCustomError(`No task with id : ${taskId} found`, 404));
    }
    res.status(200).json({success : true, task});
})

const updateTask = asyncWrapper(async (req, res, next) => { 
    const {id:taskId} = req.params;
    const task = await Task.findByIdAndUpdate(taskId, req.body, {
        new : true,
        runValidators : true
    });
    if(!task){
        return next(createCustomError(`No task with id : ${taskId} found`, 404));
    }
    res.status(200).json({success : true, task, msg : 'Successfully Updated.'});
})

const deleteTask = asyncWrapper(async (req, res, next) => {
    const {id:taskId} = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if(!task){
        return next(createCustomError(`No task with id : ${taskId} found`, 404));
    }
    res.status(200).json({success : true, msg : 'Successfully Deleted.'});
})

export { createTask, deleteTask, getTask, getTasks, updateTask };