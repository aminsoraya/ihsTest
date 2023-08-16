import React, { useEffect, useRef, useState } from 'react'
import { LinearProgress, Box, Typography, LinearProgressProps } from "@mui/material"

function LinearProgressWithLabel(props: LinearProgressProps & { value: number } & { counter: number } & { remaining: string }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap', fontSize: 10 }}>
                    {
                        `${props.counter} ${props.remaining}`
                    }
                </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}

interface IProps {
    callback: () => void;
    remaining: string
}
function CalculateLinearProgress({ callback, remaining }: IProps) {

    //variable to keep a timer function
    let timerInstance = useRef(0);

    //second
    const [counter, setCounter] = useState(60);
    const persistTime = useRef(60);

    //progress
    const [progress, setProgress] = useState(100);
    const persistProgress = useRef(100);
    let mounted = true;

    useEffect(() => {
        if (mounted)
            timer();

        return () => {
            mounted = false;
        }
    }, [])

    const timer = () => {
        timerInstance.current = window.setInterval(() => {
            persistTime.current = persistTime.current - 1;
            setCounter(persistTime.current);

            persistProgress.current = persistProgress.current - 1.66;
            setProgress(persistProgress.current);

        }, 1000)
    }

    useEffect(() => {
        let tmp = persistTime.current;
        if (tmp <= 0) {
            clearInterval(timerInstance.current);
            callback();
        }
    }, [counter])

    return (
        <LinearProgressWithLabel variant="determinate" color='info' value={progress} remaining={remaining} counter={counter} />
    )
}

export default CalculateLinearProgress