import React, { useState, useEffect, useCallback } from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import './stylesProofRedux.css'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store';
import { login, loginUser, logout } from '../slices/userSlice';
import { useNavigate } from 'react-router';

const MainScreen = () => {

    const [stateMain, setStateMain] = useState(false);
    const [auxValue, setauxValue] = useState(false);


    const renderMainScreen = () => {
        setauxValue(!auxValue);
        //setStateMain(!stateMain);
    }

    const functionRender = () => {
    }

    const functionDependency = () => {
        return 'jejeje';
    }

    useEffect(() => {

    }, [ functionDependency ]);

    return (
        <div>
            <button className='button-' onClick={ renderMainScreen }>
                render main screen
            </button>
            <button className='button-' onClick={ functionDependency }>
                use effect with dependency
            </button>
            <p>{functionDependency()}</p>
            <div className='container'>
                <LeftSide functionRender={ functionRender }/>
                <RightSide />
            </div>
        </div>
    )
}

export default MainScreen
