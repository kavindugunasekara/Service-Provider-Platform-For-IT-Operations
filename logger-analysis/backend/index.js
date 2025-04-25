// backend/index.js

const express = require('express');
const app = express();
const port = 5000;
const connectDB = require('./Database/Dbconnection');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const userService = require('./Services/userService');

const AiService = require('./Services/Anotomyfind');
const Users = require('./Model/Dbmodel');

connectDB();


app.use(cors());

// Middleware to handle JSON requests
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'Static'));  // Save files to "Static" folder
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);  // Preserve original filename
    }
    
  });
  
  const upload = multer({ storage });

// Define a route


app.post('/register', async (req, res) => {
    const userData = req.body;

  
    const response = await userService.Register(userData);

    res.status(response.statusCode).json(response);
  });

  app.post('/login', async (req, res) => {
    const response =  await userService.Login(req.body)

    res.status(response.statusCode).json(response);
  });

  app.post('/upload',upload.single('logfile'), async (req,res)=>{
    const userData = req.body;

    if (req.file) {
      // Add the file path to the user data
      userData.file = '/Static/' + req.file.filename;
    }

    const response =  await userService.Logfileupload(userData)
    console.log(response);
    res.status(response.statusCode).json(response);
  })



  app.post('/logfiles', async (req, res) => {
    const response =  await userService.getLogfile(req.body);
    res.status(response.statusCode).json(response);
  });


  app.get("/getlogfiles", async (req, res) => {


    const response =  await userService.getLogfile(req.query);
    res.status(response.statusCode).json(response);

  })

  app.get("/user/me", async (req, res) => {


    const response =  await userService.getUser(req.query);
    res.status(response.statusCode).json(response);

  })


  app.post('/analyze', async ( req,res)=>{

    const response = await userService.Analysis(req.body);
    res.status(response.statusCode).json(response)
  })


  
  app.put('/update', async ( req,res)=>{

    const response = await userService.Update(req.body);
    res.status(response.statusCode).json(response)
  })


  app.delete('/delete', async (req, res) => {

    const response = await userService.Deletefile(req.query);
    res.status(response.statusCode).json(response)

  })


  app.get('/user-summary', async (req, res) => {

    const response = await userService.userSummary(req.query);
    res.status(response.statusCode).json(response)

  })

  app.get('/admin/users', async (req,res) =>{

    const response = await userService.getAllUsersWithStats(req.query);
    res.status(response.statusCode).json(response);

  })


  app.put('/user/status',async (req,res)=>{


    const response = await userService.userStatus(req.body);
    res.status(response.statusCode).json(response);

  })


  app.delete('/user/:id',async (req,res)=>{

    const { id } = req.params;

    const response = await userService.userDelete(id);
    res.status(response.statusCode).json(response);

  })

  app.post('/anatomyfind', async  (req,res)=>{

    try {
      const result = await AiService.Anotomyfind(req.body);
      
      // Send response with appropriate status code
      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error("Route handler error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your request."
      });
    }
  });


  

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
