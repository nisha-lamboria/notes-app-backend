const express=require('express');
const router=express.Router();
const {getNotes,setNote,updateNote,deleteNote}=require('../controllers/noteController');
const {protect}=require('../middleware/authMiddleware');


router.get('/',protect,getNotes);

router.post('/',protect,setNote);

router.put('/:id',protect,updateNote);

router.delete('/:id',protect,deleteNote);

module.exports=router;