'use strict'

import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number, 
        required: true,
        unique: true
    }
}, {
    versionKey: false
})

export default model('user', userSchema)