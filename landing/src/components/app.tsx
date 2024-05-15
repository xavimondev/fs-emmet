import { Player } from '@remotion/player'

import { Main } from './remotion/showcase'

export function App() {
  return (
    <Player
      className='rounded-xl'
      component={Main}
      durationInFrames={60}
      compositionWidth={300}
      compositionHeight={513}
      fps={30}
      style={{
        width: 300,
        height: 513
      }}
      controls={false}
      autoPlay
    />
  )
}
