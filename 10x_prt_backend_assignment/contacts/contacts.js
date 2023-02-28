const express = require("express")
const mongoose = require("mongoose")
const Contacts = require("./contactsModel")
const app = express()
const router = express.Router()
app.use(express.json())

router.post("/v1/contacts", async (req, res) => {
    try{
        const {firstName, lastName, email, phone} = req.body
        const userContact = new Contacts({
            firstName, lastName, email, phone
        })
        const contactRegisterd = await userContact.save()
        res.status(201).send(contactRegisterd)
    }
    catch(err){
        console.log(err)
    }
})

router.get("/v1/contacts", async (req, res) => {
    try{
        const contactsData = await Contacts.find().sort({_id:-1})
        res.status(200).json(contactsData)
    }
    catch(err){
        res.status(406).json({
            status: "Failed",
            message: err.message
        })
    }
})

router.get("/v1/contacts/:id", async (req, res) => {
    try{
        const contactId = req.params.id
        const userId = await Contacts.findOne({_id: contactId})
        // console.log(contactId, userId)
        // res.json({contactId: contactId, userId: userId._id})
        if(userId){
          res.status(200).send(userId)
        }
        else{
            res.status(404).json({"error": "There is no contact with that id"})
        }
    }
    catch(err){
        console.log(err)
    }
})

router.delete("/v1/contacts/:id", async (req, res) => {
    try{
        const contactId = await Contacts.deleteOne({_id: req.params.id})
        if(contactId.deletedCount == true){
            res.sendStatus(204)
        }
        else{
            res.sendStatus(204)
        }
    }
    catch(err){
        console.log(err)
    }
})

router.put("/v1/contacts/:id", async(req, res) => {
    try{
        const contactId = req.body.params
        const putContactId =  await Contacts.updateOne({_id: req.params.id}, {$set: req.body});
        if(putContactId.modifiedCount == true){
            res.sendStatus(200)
        }
        else{
            res.status(404).json({error: "There is no contact with that id"})
        }
    }
    catch(err){
        console.log(err)
    }
})

router.patch("/v1/contacts/:id", async(req, res) => {
    try{
        const contactId = req.params.id
        const patchContactId = await Contacts.findByIdAndUpdate({_id: contactId}, {$set: req.body});
        if(patchContactId.modifiedCount == true){
            res.sendStatus(204)
        }
        else{
            res.status(404).json({error: "There is no contact with that id"})
        }
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router

