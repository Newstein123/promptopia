import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utlis/database";
import User from "@models/user";

const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_SECRET_ID,
        })
    ],
    callbacks : {
        async session({session}) {
            if (session?.user?.email) {
                try {
                  await connectToDB();
            
                  // check if the user exist 
                  const sessionUser = await User.findOne({ email: session.user.email });
        
                  if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                  }
                } catch (error) {
                  console.log(error);
                }
              }
              
              return session;
        },
        async signIn({profile}) {
            try {
                await connectToDB();
    
                // check if the user exist 
                const userExists = await User.findOne({
                    email : profile.email
                })
                // if not create a user 
                if(!userExists) {
                    await User.create({
                        email : profile.email,
                        username : profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
    
                return true;
            } catch(error) {
                console.log(error)
            }
        }
    } 
})

export {handler as GET, handler as POST}