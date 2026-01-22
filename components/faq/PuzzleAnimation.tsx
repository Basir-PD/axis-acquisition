import PuzzlePiece from './PuzzlePiece'

const PuzzleAnimation = () => {
  const services = [
    { delay: 0.2 },

    // { text: 'Maintenance', color: '#FF4500', delay: 1 },
  ]

  return (
    <div className="w-full h-full ">
      {services.map((service, index) => (
        <PuzzlePiece key={index} delay={service.delay} text={''} color={''} />
      ))}
    </div>
  )
}

export default PuzzleAnimation
