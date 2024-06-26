import { useFormStatus } from 'react-dom'
import { Button } from '../../../components/ui/button'

type SubmitButtonProps = {
  normal: string
  going: string
}

const SubmitButton = ({ normal, going }: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? going : normal}
    </Button>
  )
}

export default SubmitButton
