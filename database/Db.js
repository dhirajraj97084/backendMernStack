import { connect } from "mongoose";


const databaseConnection=async()=>{
    try {
        await connect('mongodb+srv://dhirajtiwari97084:enotebook4545@enotebook.psiam.mongodb.net/');
        console.log("****DATABSE CONNECTION SUCCESSFULLY****");
    } catch (error) {
      console.log("your database connection failed");  
    }
}

export default databaseConnection;