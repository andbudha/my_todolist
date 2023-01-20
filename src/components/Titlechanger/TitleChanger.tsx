import React, {ChangeEvent, useState} from 'react';

type TitleChangerPropsType = {
    title: string
}
export const TitleChanger = (props: TitleChangerPropsType) => {

    //input edit state
    const[editTitle, setEditTitle] = useState(false);

    //input value state
    const[newTitle, setNewTitle]=useState('');

    const setEditTitleHandler = () => {
      setEditTitle(!editTitle);
    }

    const inputValueCatchingHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return (
        <>
            {editTitle
                ? <input value={newTitle} autoFocus onBlur={setEditTitleHandler} onChange={inputValueCatchingHandler}/>
                : <span onDoubleClick={setEditTitleHandler}>{props.title}</span>}


        </>
    );
};

