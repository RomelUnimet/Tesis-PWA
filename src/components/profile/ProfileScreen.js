import React from 'react'
import { motion } from "framer-motion"


export const ProfileScreen = () => {
    return (
        <motion.div
            initial={{opacity:1}}
            animate={{opacity:1}}
            exit={{opacity:1}}
            transition={{duration:0}}
        >
            <h1> ProfileScreen </h1>
        </motion.div>
    )
}
