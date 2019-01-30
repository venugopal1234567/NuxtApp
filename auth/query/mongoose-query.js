const {mongoose} = require('./../db/mongoose')
const { users } = require("./../models/users");


id = '5c3b2cd246845417c42e413f'


users.find({_id:id}).then((userdetail)=>{
    console.log('User Details',userdetail)
});


users.findOne({_id:id}).then((userdetail)=>{
    console.log('User Details',userdetail)
});



users.findById(id).then((userdetail)=>{
    console.log('User Details by id',userdetail)
});


users.findById(id).then((userdetail)=>{
    if(!userdetail){
        console.log('Error cannot find id')
    }
    console.log('User Details by id',userdetail)
});
