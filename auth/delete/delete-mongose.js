const {mongoose} = require('./../db/mongoose');
const { users } = require("./../models/users");

//Remove all
// users.remove({}).then((result)=>{
//     console.log(result);
// })

users.findByIdAndRemove('5c3b604303dae52d4d4958c9').then((result)=>{
    console.log(result);
},(e)=>{
    console.log(e);
})