import React from 'react'
import { delay, motion } from 'framer-motion'
const FloatingShape = ({color, size, top, left, delay}) => {
    return (
        <motion.div
            className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
            style={{
                top: top,
                left: left,
            }}
            animate={{
                y: [0, 100, 0],
                x: [0, 100, 0],
                rotate: [0, 360, 0],
            }}

            transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: delay,
            }}

            aria-hidden="true"

        />
    )
}

export default FloatingShape