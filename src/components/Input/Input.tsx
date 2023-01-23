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
    const[error, setError]=useState<string | null>(null);


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
            setError('New title is required...');
        }
    }

    //on enter-key adding func
    const onKeyDownAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if(event.key === 'Enter' && inputValue.trim() !== ''){
            props.getInputValue(event.currentTarget.value.trim());
            setInputValue('')
        } else {
            setError('New title is required...')
        }
        setError(null);
    }

    return (
        <div>

            <TextField
                size="small"
                id="outlined-basic"
                error={!!error}
                label={error ? error : 'Enter a new title...'}
                variant="outlined"
                sx={{
                    width: '200px',
                    maxHeight: '20px',
                    outline: 'red'
                }}
                value={inputValue}
                onChange={inputValueCatchingHandler}
                onKeyDown={onKeyDownAddTaskHandler}
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
        </div>
    );
};

