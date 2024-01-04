import Alluser from '../model/userschema.js';
import bcrypt from 'bcrypt';


export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const oldUser = await Alluser.findOne({ email });
    if (oldUser) {
      return res.send({ error: 'User Exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
  
    const newUser = new Alluser({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
  
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(422).json({ success: false, message: 'Error saving user' });
  }
};
  
export const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Alluser.findOne({ email });
  
      if (!user) {
        return res.json("notexist");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        res.json("exist");
      } 
      else {
        res.json("passwordMismatch");
      }
    } 
    catch (e) {
      console.error('Error checking email:', e);
      res.status(422).json("error");
    }
};

export const getData = async(req,res)=> {
    try{
        const userdata = await Alluser.find();
        res.status(201).json(userdata);
        console.log(userdata);
    }
    catch(error){
        res.status(422).json(error);
    }
}

export const getUser = async(req,res) => {
    try{
      console.log(req.params);
      const {id} = req.params;
      const userindividual = await Alluser.findById({_id:id});
      console.log(userindividual);
      res.status(201).json(userindividual);
    }
    catch(error){
      res.status(422).json(error);
    }
}

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, gender, heardAbout, city, state } = req.body;
    let hashedPassword;

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updatedUserData = {
      name,
      email,
      password: hashedPassword, 
      phone,
      gender,
      heardAbout,
      city,
      state,
    };
    const editedUser = await Alluser.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    res.status(201).json(editedUser);
  } catch (error) {
    res.status(422).json(error);
  }
};

export const deleteUser = async(req,res) =>{
    try{
      const {id} = req.params;
      const deleteuser = await Alluser.findByIdAndDelete({_id:id});
      res.status(201).json(deleteuser);
    }
    catch(error){
      res.status(422).json(error);
    }
}