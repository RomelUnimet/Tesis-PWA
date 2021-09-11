import React from 'react'
import { motion } from "framer-motion"


export const ProfileScreen = () => {
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:1}}
        >
            <h1> ProfileScreen </h1>
        </motion.div>
    )
}
