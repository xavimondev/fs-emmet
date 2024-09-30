import { useMemo, useState } from 'react'
import { Player } from '@remotion/player'

import { Main } from './remotion/showcase'

export default function VideoEditor() {
  const [userInput, setText] = useState('')

  const inputProps = useMemo(() => {
    return {
      userInput
    }
  }, [userInput])

  return (
    <div className='flex flex-row items-center'>
      <p className='text-gray-300 text-2xl w-full'>
        A video showcasing vscode extension:
        <input type='text' value={userInput} onChange={(e) => setText(e.target.value)} />
      </p>
      <div className='rounded-xl'>
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
          inputProps={inputProps}
        />
      </div>
    </div>
  )
}
