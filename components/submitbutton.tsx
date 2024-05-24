import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

const SubmitButton = ({ normal, pending }) => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending}>
      {pending ? pending : normal}
    </Button>
  )
}

export default SubmitButton
