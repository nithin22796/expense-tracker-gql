import { users } from '../dummyData/data.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const userResolver = {
    Query: {
        authUser: async(_, __, context) => {
            try {
                const user = await context.getUser();
                return user;
            } catch (err) {
                console.error("Error in authuser: ", err);
                throw new Error(err.message || "Internal Server error");
            }
        },
        user: async (_, {userId}) => {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.error("Error in user: ", err);
                throw new Error(err.message || "Internal Server error");
            }
        }
    },
    Mutation: {
        signUp: async (_, {input}, context) => {
            try {
                const { username, password, name, gender } = input;
                if (!username || !name || !gender || !password) {
                    throw new Error("All fields are required");
                }

                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender === 'male' ? boyProfilePic : girlProfilePic
                })

                await newUser.save();
                await context.login(newUser);

                return newUser;
            } catch (err) {
                console.error("Error in signup: ", err);
                throw new Error(err.message || "Internal Server error");
            }
        },
        login: async (_, {input}, context) => {
            try {
                const { username, password } = input;
                const {user} = await context.authenticate("graphql-local", { username, password });
                await context.login(user);
                return user;
            } catch (err) {
                console.error("Error in login: ", err);
                throw new Error(err.message || "Internal Server error");
            }
        },
        logout: async (_, __, context) => {
            try {
                await context.logout();
                req.session.destroy((err) => {
                    if (err) throw err;
                });
                req.clearCookie("connect.sid");

                return { message: "Logged out successfully"}
            } catch (err) {
                console.error("Error in logout: ", err);
                throw new Error(err.message || "Internal Server error");
            }
        }
    }
}

export default userResolver;