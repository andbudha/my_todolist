import React, {useState} from 'react';

type TitleChangerPropsType = {
    title: string
}
export const TitleChanger = (props: TitleChangerPropsType) => {
    const[editTitle, setEditTitle] = useState(false);

    const setEditTitleHandler = () => {
      setEditTitle(!editTitle);
    }

    return (
        <>
            {editTitle
                ? <input value={props.title} autoFocus onBlur={setEditTitleHandler}/>
                : <span onDoubleClick={setEditTitleHandler}>{props.title}</span>}


        </>
    );
};

