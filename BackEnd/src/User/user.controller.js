'use strict'

import User from './user.model.js'
import {encrypt, checkPassword} from '../utils/validator.js'
import {generateJwt} from '../utils/jwt.js'

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        if (!user) return res.status(403).send({ message: 'Please fill in all required fields'})
        await user.save()
        return res.status(200).send({ message: 'User saved successfully', user})
    } catch (error) {
        console.error(error)
        if(error.keyValue.email) return res.status(400).send({message: `Email ${error.keyValue.email} is already taken`})
        if(error.keyValue.phone) return res.status(400).send({message: `Phone ${error.keyValue.phone} is already taken`})        
        return res.status(500).send({message: 'Error registering user', error})
    }
}

export const login = async (req, res) => {
    try {
        let {phone, email, password} = req.body
        let user = await User.findOne({$or: [{phone}, {email}]})
        if (user && (await checkPassword(password, user.password))) {
            let loggedUser = {
                uid: user._id, 
                phone: user.phone,
                email: user.email,
            }
            let token = await generateJwt(loggedUser)
            return res.status(200).send({message: `Welcome ${user.name} ${user.surname}`, token})
        }
        return res.status(401).send({message: 'Invalid credentials'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error logging in user', error})
    }
}

export const updateUser = async (req, res) => {
    try {
        let {passwordOld, passwordNew, ...userData} = req.body
        let userId = req.user._id.toString()
        if (passwordOld && passwordNew) {
            let user = await User.findById(userId)
            if (!user) return res.status(404).send({message: 'User not found'})
            if (!(await checkPassword(passwordOld, user.password))) {
                return res.status(401).send({message: 'Invalid password'})
            }
            userData.password = await encrypt(passwordNew)
        }
        let user = await User.findByIdAndUpdate(userId, userData, {new: true})
        if(!user) return res.status(401).send({message: 'User not found'})
        const loggedUser = await generateJwt({
            uid: user._id, 
            phone: user.phone,
            email: user.email,
        })
        return res.status(200).send({message: 'User updated successfully', user, token: loggedUser})
    } catch (error) {
        console.error(error)
        if(error.keyValue.email) return res.status(400).send({message: `Email ${error.keyValue.email} is already taken`})
        if(error.keyValue.phone) return res.status(400).send({message: `Phone ${error.keyValue.phone} is already taken`})
        return res.status(500).send({message: 'Error updating user', error})
    }
}