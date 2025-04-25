const Auth = require("../Auth/auth");
const Users = require("../Model/Dbmodel");
const crypto = require('crypto');
const fs = require("fs");
const path = require("path");

const userService = {

    async Register(userData) {
      const { email,password,companyName,userRole,userpkg} = userData;
    
      // Check for required fields
      if ( !email || !password || !companyName || !userRole ) {
        
        return { success: false, statusCode: 400, error: 'Missing required fields' };
      }
  
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return { success: false, statusCode: 409, error: 'Email already exists' }; 
      }
  
    
        // Proceed with user registration and delete the temporary code
     
    
      const { salt, hash } = this.hashPassword(password);
    
      const user = new Users({
  
        email,
        userrole:userRole,
        company:companyName,
        password:hash,
        salt,
        rdate:Date(),
        userpkg,
        user_status:"Active"
      });

    
      try {
        await user.save();
        return { success: true, statusCode: 201, message: 'User registered successfully!' };
      } catch (error) {
        console.log(error)
        return { success: false, statusCode: 400, error: error.message };
      }
    },



    async Login(loginData) {
        const { email, password } = loginData;
    
        if (!email || !password) {
          return { success: false, statusCode: 400, error: 'Email and password are required' };
        }

    
        try {
          const user = await Users.findOne({ email });
          if (!user) {
            return { success: false, statusCode: 404, error: 'User not found or Not Already Sign Up' }; 
          }
    
          const isValid = this.validatePassword(password, user.password, user.salt);
          if (!isValid) {
 
            return { success: false, statusCode: 401, error: 'Invalid password' }; 
          }

          const token = Auth.createToken(user._id, user.email);
    
          return { success: true, statusCode: 201, user: { id: user._id, email: user.email}, token }; 
        } catch (error) {
          return { success: false, statusCode: 500, error: 'Internal server error' }; 
        }
      },


    hashPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return { salt, hash };
      },


      
     validatePassword(password, hash, salt) {
    if (!hash || !salt) {
      return false; 
    }

    const hashToCompare = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hashToCompare === hash; 
  },



  async Update(userData) {
    const { email, password, company, userrole, userpkg } = userData;

    if (!email || !company || !userrole) {
        return { success: false, statusCode: 400, error: "Missing required fields" };
    }

    console.log(userData);

    try {
        const existingUser = await Users.findOne({ email });

        if (!existingUser) {
            return { success: false, statusCode: 404, error: "User not found" };
        }

        // Update user details
        existingUser.email = email;
        existingUser.userrole = userrole;
        existingUser.company = company;
        existingUser.userpkg = userpkg;

        // Update password only if it's provided
        if (password) {
          // Check if password length is less than 25 characters
          if (password.length < 25) {
              const { salt, hash } = this.hashPassword(password);
              existingUser.password = hash;
              existingUser.salt = salt;
          } else {
              
              // You can also throw an error or set a validation flag here if necessary
          }
      }
      

        await existingUser.save();

        return { success: true, statusCode: 200, message: "User updated successfully!" };
    } catch (error) {
        console.log(error);
        return { success: false, statusCode: 500, error: "Internal server error" };
    }
},



  async Logfileupload(userData) {
    const { email, file } = userData;
    console.log(email, file);
    
    // Check if email or file path is missing
    if (!email || !file) {
      return { success: false, statusCode: 400, error: 'Missing required fields' };
    }
  
    // Find the user by email
    const existingUser = await Users.findOne({ email });
  
    // If user does not exist
    if (!existingUser) {
      return { success: false, statusCode: 404, error: 'User not found' };
    }
  
    try {
      // Check if the file field is an array. If it's not, convert it to an array
      if (!Array.isArray(existingUser.file)) {
        existingUser.file = [existingUser.file];  // If file is not an array, make it an array
      }
  
      // Add the new file path to the array
      existingUser.file.push(file);  // Append the new file path
  
      // Save the updated user document
      await existingUser.save();
  
      return { success: true, statusCode: 201, message: 'Log file uploaded successfully!' };
    } catch (error) {
      console.log(error);
      return { success: false, statusCode: 400, error: error.message };
    }
  },


  
  async getUser(Data) {
    const { email } = Data;

    if (!email) {
        return { success: false, statusCode: 400, error: "Email is required" };
    }

    try {
        // Find user but exclude the password field
        const user = await Users.findOne({ email });

        if (!user) {
            return { success: false, statusCode: 404, error: "User not found or not signed up" };
        }

        return { success: true, statusCode: 200, user };
    } catch (error) {
        return { success: false, statusCode: 500, error: "Internal server error" };
    }
},



hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
  },


  
 validatePassword(password, hash, salt) {
if (!hash || !salt) {
  return false; 
}

const hashToCompare = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
return hashToCompare === hash; 
},



  async getLogfile(userData) {
    const { email } = userData;
  
    // Check if email is missing
    if (!email) {
      return { success: false, statusCode: 400, error: 'Missing required fields' };
    }
  
    try {
      // Find the user by email
      const existingUser = await Users.findOne({ email });
  
      // If user does not exist
      if (!existingUser) {
        return { success: false, statusCode: 404, error: 'User not found' };
      }
  
      // Retrieve the user's files array
      const userFiles = existingUser.file || []; 
  
      return { 
        success: true, 
        statusCode: 200, 
        files: userFiles, 
        message: 'User files retrieved successfully!' 
      };
    } catch (error) {
      console.error(error);
      return { success: false, statusCode: 500, error: error.message };
    }
  },


  
  async  Analysis(userData) {
    const { file } = userData;

    if (!file) {
      return {
        success: false,
        statusCode: 400,
        error: "File name is required.",
      };
    }
  
    try {
      console.log(`Received file path: ${file}`);
  
      // Resolve the correct file path in the root directory
      const filePath = path.join(process.cwd(), file); // `process.cwd()` ensures it's in the root folder
  
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return {
          success: false,
          statusCode: 404,
          error: "File not found on the server.",
        };
      }
  
      // Read the file content
      const fileContent = fs.readFileSync(filePath, "utf-8");
  
      console.log("Extracted Text:");
      console.log(fileContent); // Logs file content to console
  
      return {
        success: true,
        statusCode: 200,
        message: "File received and text extracted successfully!",
        content: fileContent, // Optionally return extracted text
      };
    } catch (error) {
      console.error("Error reading file:", error.message);
      return {
        success: false,
        statusCode: 500,
        error: "Failed to read the file.",
      };
    }
  },


  async Deletefile(userData) {
    const { file, email } = userData;
    console.log(email, file);
    
    // Check if email or file path is missing
    if (!email || !file) {
      return { success: false, statusCode: 400, error: 'Missing required fields' };
    }
  
    // Find the user by email
    const existingUser = await Users.findOne({ email });
  
    // If user does not exist
    if (!existingUser) {
      return { success: false, statusCode: 404, error: 'User not found' };
    }
  
    try {
      // Check if the file field is an array. If it's not, initialize it as an array.
      if (!Array.isArray(existingUser.file)) {
        existingUser.file = [];
      }

      // Remove the file from the user's file array
      existingUser.file = existingUser.file.filter(existingFile => existingFile !== file);
  
      // Save the updated user document
      await existingUser.save();
  
      return { success: true, statusCode: 200, message: 'Log file deleted successfully!' };
    } catch (error) {
      console.log(error);
      return { success: false, statusCode: 400, error: error.message };
    }
  },

  async  userSummary() {
    try {
      const allUsers = await Users.find();
  
      const totalUsers = allUsers.length;
      const activeUsers = allUsers.filter(u => u.user_status === "Active").length;
      const heldUsers = allUsers.filter(u => u.user_status === "Hold").length;
  
      const totalFileUploads = allUsers.reduce((acc, user) => {
        return acc + (user.file ? user.file.length : 0);
      }, 0);
  
      return {
        success: true,
        statusCode: 200,
        data: {
          totalUsers,
          activeUsers,
          heldUsers,
          totalFileUploads,
        },
      };
    } catch (error) {
      console.error("User summary error:", error);
      return {
        success: false,
        statusCode: 400,
        error: error.message,
      };
    }
  },



async getAllUsersWithStats() {
  try {
    const allUsers = await Users.find();

    const userData = await Promise.all(allUsers.map(async (user) => {
      const totalFilesForUser = user.file ? user.file.length : 0;

      const formattedDate = user.rdate
        ? new Date(user.rdate).toLocaleString("en-US", { timeZone: "Asia/Colombo" })
        : new Date('2025-04-25T08:40:39.000Z').toLocaleString("en-US", { timeZone: "Asia/Colombo" });

      return {
        id: user._id,
        email: user.email,
        status: user.user_status || 'Active',
        package: user.userpkg || 'Trial',
        filesUploaded: totalFilesForUser,
        registrationDate: formattedDate
      };
    }));

    return {
      success: true,
      statusCode: 200,
      data: userData
    };
    
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      error: error.message,
    };
  }
},

async userStatus(userData) {
  try {
    const { userId, status } = userData;

    // Find user and update status
    const user = await Users.findById(userId);
    if (!user) {
      return { success: false,statusCode: 404, message: 'User not found' };
    }


    user.user_status = status;
    await user.save();

    return { success: true,statusCode: 200, message: 'Status updated successfully' };
  } catch (err) {
    return{ success: false,tatusCode: 500, message: 'Internal Server Error' };
  }


},

async userDelete (id){

  try {
    const user = await Users.findByIdAndDelete(id);

    if (!user) {
      return { success: false,statusCode: 404, message: 'User not found' };
    }

    return { success: true,statusCode: 200, message: 'User deleted successfully' };
  } catch (err) {

    return{ success: false,tatusCode: 500, message: 'Internal Server Error' };
  }
}



    
}  

module.exports = userService;