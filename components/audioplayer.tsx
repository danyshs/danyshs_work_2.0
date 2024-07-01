// components/AudioPlayer.tsx
import React, { FC } from 'react';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: FC<AudioPlayerProps> = ({ src }) => (
  <audio autoPlay>
    <source src={src} type="audio/mpeg" />
  </audio>
);

export default AudioPlayer;