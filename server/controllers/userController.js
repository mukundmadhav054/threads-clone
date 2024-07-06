import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js"

const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body
        const user = await User.findOne({ $or: [{ email }, { username }] })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({ name, email, username, password: hashedPassword })
        await newUser.save()

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            res.status(201).json({ _id: newUser._id, name: newUser.name, email: newUser.email, username: newUser.username })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in signupUser:", error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) return res.status(400).json({ message: "Please provide username and password" })
        const user = await User.findOne({ username })
        const isPasswordCorrect = bcrypt.compare(password, user?.password || "")
        if (user && isPasswordCorrect) {
            generateTokenAndSetCookie(user._id, res)
            res.status(200).json({ _id: user._id, name: user.name, email: user.email, username: user.username })
        } else {
            res.status(400).json({ message: "Invalid username or password" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in loginUser:", error.message)
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in logoutUser:", error.message)
    }
}

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params
        const userToModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id)

        if (id == req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot follow/unfollow yourself" })
        }

        if (!userToModify || !currentUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const isFollowing = currentUser.following.includes(id)
        if (isFollowing) {
            // Unfollow User
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            return res.status(200).json({ message: "User unfollowed successfully" })
        } else {
            // Follow User
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            return res.status(200).json({ message: "User followed successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in followUnfollowUser:", error.message)
    }
}

const updateUser = async (req, res) => {
    const { name, email, username, password, profilePicture, bio } = req.body
    const userId = req.user._id
    try {
        let user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (req.params.id !== userId.toString()) {
            return res.status(403).json({ message: "You can not update the profile of other users" })
        }

        if (password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
        }

        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.profilePicture = profilePicture || user.profilePicture
        user.bio = bio || user.bio

        await user.save()

        res.status(200).json({ message: "Profile updated successfully", user })


    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in updateUser:", error.message)
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password").select("-updatedAt")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("Error in getUserProfile:", error.message)
    }
}

export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile }