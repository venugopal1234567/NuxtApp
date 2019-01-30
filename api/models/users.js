const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')


var UserSchema = new  mongoose.Schema({
    fullName: {
        type: String
    },
    password: {
        type:String,
        require:true,
        minlength:6
    },
    contact:{
        type: Array,
        require:true,
        unique:true
    } ,
    gender:{
        type: String

    },
    zipCode:{
        type:Number
    },
    tokens: [{
        access:{
           type:String,
           required:true
        },
        token:{
            type:String,
            required:true
        }

    }]
})

  UserSchema.methods.toJSON = function(){
    var newUser = this;
    var userObject = newUser.toObject();
    return _.pick(userObject, ['_id', 'phoneNumber']);

  }

UserSchema.methods.generateAuthToken = function (){
   var newUser = this;
   var access ='auth';
   var token = jwt.sign({_id:newUser._id.toHexString(), access},'abc123').toString();
   newUser.tokens.push({access, token});
   return newUser.save().then(() =>{
       return token;
   })
};

UserSchema.statics.findByToken = function(token){
    var users = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123')

    } catch(e){
        return Promise.reject();

    }
    return users.findOne({
       _id: decoded._id,
       'tokens.token': token,
       'tokens.access':'auth'
    })

}

UserSchema.statics.findByCredentials = function(phoneNumber, password){
    var users = this;
    return users.find({contact:phoneNumber}).then((user)=>{
        console.log(user[0])
        // let tempUser = JSON.parse(user)
        // console.log(tempUser)
        // console.log(password)
        // console.log(tempUser.fullName)
        // console.log(tempUser.password)
        // console.log(tempUser.gender)
       if(!user){
           return Promise.reject();
       }
       return new Promise((resolve, reject) =>{
           bcrypt.compare(password, user[0].password,(err, res)=>{
               console.log(res)
               if(res){
                   resolve(user[0])
               }else{
                   reject()
               }
           })
       })
    });


}

UserSchema.pre('save', function(next){
    var newUser = this;
   if(newUser.isModified('password')) {
       bcrypt.genSalt(10, (err, salt) =>{
           bcrypt.hash(newUser.password, salt, (err, hash) =>{
               newUser.password = hash;
               next()
           })
       })

   }else {
       next();
   }

})



var users = mongoose.model('users',UserSchema);

module.exports = {users}