import CardAnimation from './CardAnimation'

interface Service {
  text: string
  color: string
  delay: number
}

const CardFeature = ({ services }: { services: Service[] }) => {
  // {{ edit_1 }}

  return (
    <div className="flex justify-center items-center">
      {services.map((service, index) => (
        <CardAnimation
          key={index}
          text={service.text}
          color={service.color}
          delay={service.delay}
        />
      ))}
    </div>
  )
}

export default CardFeature
