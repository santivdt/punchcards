import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

type SubmitButtonProps = {
  normal: string
  going: string
  disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  normal,
  going,
  disabled = false,
}) => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={(disabled && !pending) || pending}>
      {pending ? going : normal}
    </Button>
  )
}

export default SubmitButton
