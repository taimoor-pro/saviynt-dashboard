import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ProfileSettings from '../../features/settings/profilesettings'
import { setPageTitle } from '../../redux/slices/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Settings"}))
      }, [])


    return(
        <ProfileSettings />
    )
}

export default InternalPage