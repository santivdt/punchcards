import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

const SubmitButton = ({ normal, going }) => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? going : normal}
    </Button>
  )
}

export default SubmitButton
