import React, {ChangeEvent, useState} from 'react';

type TitleChangerPropsType = {
    title: string
    callBack:(newTitle: string)=> void
}
export const TitleChanger = (props: TitleChangerPropsType) => {

    //input edit state
    const[editTitle, setEditTitle] = useState(false);

    //input value state
    const[newTitle, setNewTitle]=useState(props.title);

    //input on/off function
    const setEditTitleHandler = () => {
      setEditTitle(!editTitle);
      props.callBack(newTitle);
    }

    //input value catching func
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

