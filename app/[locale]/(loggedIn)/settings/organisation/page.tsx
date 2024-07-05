import { getOrganisation } from '../actions'
import CreateOrgnisationForm from './create'
import UpdateOrgnisationForm from './update'

const CompanyPage = async () => {
  const { data: organisation } = await getOrganisation()

  return (
    <>
      {organisation ? (
        <UpdateOrgnisationForm organisation={organisation} />
      ) : (
        <CreateOrgnisationForm />
      )}
    </>
  )
}

export default CompanyPage
