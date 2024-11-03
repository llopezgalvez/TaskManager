import { Schema, model } from "mongoose"

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLeght: [10, "Please enter a title of 10 or more characters"]
    },
    description: {
        type: String,
        minLeght: [10, "Plese enter a description of 10 or more characters"],
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    empleado: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    }

},
    { versionKey: false }
)

export default model('task', taskSchema)