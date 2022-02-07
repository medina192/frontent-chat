import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store';
import { login, loginUser, logout } from '../slices/userSlice';
import { useNavigate } from 'react-router';

const RightSide = () => {

    const [state, setState] = useState(false);

    console.log('right side');


    const user = useSelector((state: RootState) => state.user);


    const dispatch = useAppDispatch()

    useEffect(() => {

        
        
        return () => {
            
        }
    }, [])


    const dispathcWholeUser = () => {
        /*
        dispatch(login(
            {
                isLogged: true,
                name: 'Alejandro',
                uid: '8348u'
            }
        ))
        */

        //dispatch(logout())
        
    }

    return (
        <div className='rightContainer'>
            <button className='button-' onClick={ () => setState(!state) }>
                Update state with use State
            </button>

            <button className='button-' onClick={ dispathcWholeUser }>
                Update whole user
            </button>


        </div>
    )
}

export default RightSide
