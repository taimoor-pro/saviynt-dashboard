import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Customers from '../../features/customers'
import { setPageTitle } from '../../redux/slices/headerSlice'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Customers"}))
      }, [])


    return(
        <Customers />
    )
}

export default InternalPage