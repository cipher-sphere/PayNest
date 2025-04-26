import mongoose, { mongo } from 'mongoose';

mongoose.connect("mongodb+srv://ciphersphere:oldmonklovesme@paynest-cluster.tgbabyg.mongodb.net/paynest")
    .then(() => {
        console.log('Connected to mongoDB');
    })
    .catch(err => console.log('could not connect to db', err));

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstname:{
        type:String,
        required:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        maxLength:50
    }
})

const user = mongoose.model('user',userSchema);

module.exports({
    user,
})