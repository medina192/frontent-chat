import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store';
import { login, loginUser, logout } from '../slices/userSlice';
import { useNavigate } from 'react-router';

interface LeftSideProps {
    stateMain: boolean
}

interface LeftSideProps1 {
    setStateMain: React.Dispatch<React.SetStateAction<boolean>>  // not re-render
}

interface LeftSideProps2 {  
    functionRender: () => void
}

const LeftSide = ({ functionRender } : LeftSideProps2) => {

    const [state, setState] = useState(false);

    //const user = useSelector((state: RootState) => state.user);
    //const socket = useSelector((state: RootState) => state.socket.socket);

    return (
        <div className='leftContainer'>
            <button className='button-' onClick={ () => setState(!state) }>
                Update state with use State
            </button>
            <button className='button-' 
                //onClick={() => setStateMain(c => !c) }
            >
                Update state with function of parent
            </button>
        </div>
    )
}

export default React.memo(LeftSide)
