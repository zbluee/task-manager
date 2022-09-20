import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'name must be provided'],
        maxlength : [20, 'must less than 20 characters'],
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    }
});

const Task = mongoose.model('Task', taskSchema);

export {Task};
