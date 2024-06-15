export default function Page(): JSX.Element {


  const talkDetails = {
    title: 'MEV',
    description: 'description'
  }

  return (
    <main>
      <div>
        {talkDetails.title}
      </div>
      <div>
        {talkDetails.description}
      </div>
      <div>

      </div>

    </main>

  )
}
