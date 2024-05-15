import type { SVGProps } from 'react'
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion'

import { generateDirectoryTree } from '../../utils/tree'

function ChevronDownIc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='m6 9 6 6 6-6' />
    </svg>
  )
}

function FileTextIc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' />
      <path d='M14 2v4a2 2 0 0 0 2 2h4' />
      <path d='M10 9H8' />
      <path d='M16 13H8' />
      <path d='M16 17H8' />
    </svg>
  )
}

function Main() {
  const frame = useCurrentFrame()
  const opacity = Math.min(1, frame / 30)

  return (
    <AbsoluteFill className='bg-gradient-to-tr from-[#1a1a1a] to-[#0b0b0d] p-2'>
      <div style={{ opacity }}>
        <h1 className='text-gray-300 text-xl text-center'>source directory</h1>
        <Tree />
      </div>
    </AbsoluteFill>
  )
}

function Leaf({ file, children, depth }: { file: string; children: any; depth: number }) {
  return (
    <div
      style={{
        paddingLeft: `${depth + 10}px`
      }}
    >
      <div className='bg-clip-text text-transparent bg-gradient-to-t from-white to-gray-400 font-medium text-xs lg:text-sm flex gap-0.5 items-center py-0.5'>
        {children ? (
          <ChevronDownIc className='size-2 lg:size-3 text-white' />
        ) : (
          <FileTextIc className='size-2 lg:size-3 text-white mr-0.5' />
        )}
        {file}
      </div>
      {children && children.length > 0 && (
        <div>
          {children.map((leaf: any, index: number) => (
            <Leaf {...leaf} depth={depth + 1} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

function Tree() {
  const treeResult = generateDirectoryTree()
  return (
    <div className='mt-4'>
      {treeResult.map((tree: any, index: number) => (
        <Leaf {...tree} depth={1} key={index} />
      ))}
    </div>
  )
}

export function Showcase() {
  return (
    <>
      <Composition
        id='Empty'
        component={Main}
        durationInFrames={60}
        fps={30}
        width={300}
        height={513}
      />
    </>
  )
}
