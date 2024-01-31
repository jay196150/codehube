"use client"

import { useTrack, useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import React, { useEffect, useRef, useState } from 'react'
import { FullScreenControl } from './fullscreen-control'
import { useEventListener } from 'usehooks-ts'
import { VolumnControl } from './volume-control'

interface LiveVideoProps {
    participant: Participant
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null); 
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volumn, setVolumn] = useState(0);
   
    const onVolumnChange = ( value : number ) => {
         setVolumn(+value);

         if( videoRef?.current ){
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
         }
    }

    const toggleMute = () => {
        const isMuted = volumn === 0;
        setVolumn( isMuted ? 50 : 0 );

        if( videoRef?.current ){
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullscreen);
    }

    useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef)

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else if (wrapperRef?.current) {
            wrapperRef.current.requestFullscreen();
            setIsFullscreen(true);
        }
    }


    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        });

    useEffect( () => {
        onVolumnChange(0);
    } , [] )    

    return (
        <div
            ref={wrapperRef}
            className='relative h-full flex'>
            <video ref={videoRef} width="100%" />
            <div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
                <div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4'>
                    <VolumnControl onChange={ onVolumnChange } value={ volumn } onToggle={ toggleMute } />
                    <FullScreenControl isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
                </div>
            </div>
        </div>
    )
}

export default LiveVideo