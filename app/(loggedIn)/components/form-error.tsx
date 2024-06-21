type FormErrorProps = {
  errorMessage: string | undefined
}

const FormError = ({ errorMessage }: FormErrorProps) => {
  return (
    <>
      <div className='mb-4'>
        {errorMessage && (
          <p className='py-2 text-sm text-red-500'>{errorMessage}</p>
        )}
      </div>
    </>
  )
}

export default FormError
