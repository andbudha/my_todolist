import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
            <input
                className={error ? 'error' : ''}
                value={inputValue}
                onChange={inputValueCatchingHandler}
                onKeyDown={onKeyDownAddTaskHandler}
            />
            <button onClick={taskAddingHandler}>+</button>
            {error ? <div className='error-message'>Task is required!</div> : ''}
        </div>
    );
};

