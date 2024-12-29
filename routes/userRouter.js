const {Router}=require('express');
const {createUser,loginUser}=require('../controllers/userControler');
const router=Router();
router.post('/create_user',createUser);
router.post('/login',loginUser);
module.exports=router;