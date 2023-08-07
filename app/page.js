import Image from 'next/image'
import Feed from '@components/Feeds'

export default function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'> Discover & Share </h1>
      <br  className='max-md:hidden'/>
      <span className='orange_gradient text-center'> AI-Powerd Prompts </span>
      <p className='desc text-center'> Promptopia is a AI works to discover, create and share creative prompts </p>
      
      {/* Feed  */}
      <Feed />
    </section>

  )
}
