import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const initialState = {
  email: null,
  token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action) => {
        const { token } = action.payload;
        let email = action.payload.email;
  
        // Decode the token to extract email if available
        try {
          const decoded = jwtDecode(token);
          email = decoded.email || email; // Use decoded email if present
        } catch (error) {
          console.error("Invalid token:", error);
        }
  
        console.log("User set:", email, token); // Debugging - check if values are correct
  
        state.email = email;
        state.token = token;
      },
      logoutUser: (state) => {
        state.email = null;
        state.token = null;
        localStorage.removeItem("authToken"); // Clear token from localStorage
      },
    },
  });
  
  export const { setUser, logoutUser } = userSlice.actions;
  export default userSlice.reducer;
  

