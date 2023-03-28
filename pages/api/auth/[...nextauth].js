import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/src/services/login";
import { helpers } from "@/src/helpers/common"

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Next-Login',
            credentials: {
                // khai bao thong tin nhap data tu input cua form login
                username: {
                    label: 'Username',
                    type: 'text'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials, req){
                // xu ly goi call api o day
                // lay du lieu tu form login gui len
                const username = credentials.username;
                const password = credentials.password;
                const res = await loginUser(username, password);
                if(!helpers.isEmptyObject(res)) {
                    return res;
                } else {
                    throw new Error(res.message);
                }
                return null;
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user, account}) {
            if(user && account){
                return {
                    ...token,
                    accessToken: user.token
                }
            }
            return token
        },
        async session({session, token}){
            session.user.accessToken = token.accessToken;

            return session
        }
    },
    theme: {
        colorScheme: 'auto', // 'dark', 'light',
        brandColor: '',
        logo: ''
    },
    debug: process.env.NODE_ENV === 'development'
})