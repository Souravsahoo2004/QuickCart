import { Inngest } from "inngest";
import ConnectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// inngest fuction to save data to db
export const syncUserCreation = inngest.createFunction(
  {
    id:'sync-user-from-clerk'
  },
  {
    event:'clerk/user.created'},
    async({event})=>
    {
     const { id,first_name,last_name,email_addresses , image_url,created_at } = event.data;
     const userData = {
           _id:id,
           email:email_addresses[0].email_address,
           name : first_name + ' ' + last_name,
           imageUrl:image_url,
     }
     // save data to db
     // ...
     await ConnectDB()
        await user.create(userData)
     
    
    }
  
)

//inngest data update to db
export const  syncUserUpdation = inngest.createFunction
(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk/user.updated',
    },
    async({event})=>
    {
     const { id,first_name,last_name,email_addresses , image_url,created_at } = event.data;
     const userData = {
           _id:id,
           email:email_addresses[0].email_address,
           name : first_name + ' ' + last_name,
           imageUrl:image_url,
     }
     await ConnectDB()
    await user.findByIdAndUpdate(id,userData)
    }
    
)

// ingesst function to delete the user data from db 

export const  syncUserDeletion = inngest.createFunction
(
    {
        id: 'delete-user-from-clerk'
    },
    {
        event: 'clerk/user.deleted',
    },
    async({event})=>
    {
     const { id } = event.data;
     await ConnectDB()
    await user.findByIdAndDelete(id)
    }
    
)