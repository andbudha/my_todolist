import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './Input.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type InputPropsType = {
    getInputValue:(inputValue: string)=> void
}

export const Input = (props: InputPropsType) => {

    //input value state
    const[inputValue, setInputValue]=useState('');

    //error state
    const[error, setError]=useState<boolean>(false);


    //input value catching func
    const inputValueCatchingHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    //task adding func
    const taskAddingHandler = () => {
        if (inputValue.trim() !== '') {
            props.getInputValue(inputValue.trim());
            setInputValue('');
        } else {
            setError(true);
        }
    }

    //on enter-key adding func
    const onKeyDownAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if(event.key === 'Enter' && inputValue.trim() !== ''){
            props.getInputValue(event.currentTarget.value.trim());
            setInputValue('')
        } else {
            setError(true)
        }
        setError(false);
    }

    return (
        <div>

            <TextField
                size="small"
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{
                    width: '200px',
                    maxHeight: '20px'
                }}
            />
            {/*
            <input
                className={error ? 'error' : ''}
                value={inputValue}
                onChange={inputValueCatchingHandler}
                onKeyDown={onKeyDownAddTaskHandler}
            />
            */}


            {/*<button onClick={taskAddingHandler}>+</button>*/}

            <Button
                size="small"
                variant="contained"
                onClick={taskAddingHandler}
                sx={{
                    minWidth: 39,
                    minHeight: 39,
                }}
            >+</Button>
            {error ? <div className='error-message'>Task is required!</div> : ''}
        </div>
    );
};

