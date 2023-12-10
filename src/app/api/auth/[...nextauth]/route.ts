import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
// Auth for Google Login

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret:process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ]
})

export {handler as GET, handler as POST};