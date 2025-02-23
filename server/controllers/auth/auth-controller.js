const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../../models/user.model.js')




 const registerUser=async(req,res)=>{
    const {username,email,password}=req.body
    if(!username||!email||!password){
        return res.status(400).json({message:'All fields are required',success:false})
    }
    try{

        const checkUser=await User.findOne({
            $or:[{email},{username}]
    });
        if(checkUser){
            return res.status(400).json({message:'User already exists',success:false})
        }
        const hashedPassword=await bcrypt.hash(password,12) 
        new User({
            username,
            email,
            password:hashedPassword
        }).save()
        return res.status(200).json({message:'User registered successfully' ,success:true})
    } catch(err){
            return res.status(500).json({message:'Internal server error',success:false})
        }
}

const loginUser=async(req,res)=>{
    const {username,password}=req.body
    if(!username||!password){
        return res.status(400).json({message:'All fields are required'})
    }

    try{

        const checkUser=await User.findOne({username})
        if(!checkUser){
            return res.status(400).json({message:'Invalid credentials',success:false})
        }
        const isPasswordCorrect=await bcrypt.compare(password,checkUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:'Incorrect password',success:false})
        }

        const token=jwt.sign({id:checkUser._id, username:checkUser.username,email:checkUser.email,role:checkUser.role},'shwewryyr',{expiresIn:'1h'})
        // res.cookie('token',token,{httpOnly:true,secure:true}).json(
        //     {message:'User logged in successfully',
        //     success:true,
        //     user:{
        //         username:checkUser.username,
        //         email:checkUser.email,
        //         role:checkUser.role,
        //         id:checkUser._id
        //     }
        //     })

        res.status(200).json({
            success:true,
            message:'Logged in successfully',
            token,
            user:{
                        username:checkUser.username,
                        email:checkUser.email,
                        role:checkUser.role,
                        id:checkUser._id
                    }
                    
        })

    }catch(err){
            return res.status(500).json({message:'Internal server error'})
        }
}

const logoutUser=(req,res)=>{
    res.clearCookie('token').json({message:'User logged out successfully',success:true})
}

const authmiddleware=(req,res,next)=>{

    const authHeader=req.headers['authorization']

    const token= authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message:'Unauthorized',success:false})
    }
    try{
        const decoded=jwt.verify(token,'shwewryyr')
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({message:'Unauthorized',success:false})
    }
}

module.exports={registerUser,loginUser,logoutUser,authmiddleware}