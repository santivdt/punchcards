import Hero from './components/hero'

const IndexPage = async () => {
  return (
    <>
      <div className='h-[calc(100vh-200px)] max-h-[1000px] flex items-start lg:items-center'>
        <Hero />
      </div>
    </>
  )
}

export default IndexPage
