import express from 'express'
import { Book } from '../models/bookModels.js'


const router = express.Router()

// Route for saving a new Book

router.post('/', async (req, res)=>{
    try {
        if(
           !req.body.title ||
           !req.body.author ||
           !req.body.publishedYear
        ){
            return res.status(400).send({
                message: "Send all required fields: title, author, publishedYear"
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear
        }

        const book = await Book.create(newBook)

        return res.status(201).send(book)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Route for getting all books
router.get("/", async (req, res)=>{
    try {
        const books = await Book.find({})
        res.status(200).json(books)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})
// Route for getting  book by id
router.get("/:id", async (req, res)=>{
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})


// Update a Book

router.put('/:id', async (req, res) => { 
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishedYear"
            })
        }

        const { id } = req.params

        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).json({ message: "Book not found" })
        }

        return res.status(200).send({ message: "Book has been updated successfully" })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message
        })
    }
})


// Delete a book

router.delete('/:id',async (req, res)=>{
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)
        if( !result ){
            return res.status(404).json({ message: "the book not found!" })
        }
        return res.status(200).send({ message: "the book has been deleted successfully!" })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }

})

export default router