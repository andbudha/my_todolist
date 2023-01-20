import React from 'react';

type TitleChangerPropsType = {
    title: string
}
export const TitleChanger = (props: TitleChangerPropsType) => {
    return (
        <>
            <span>{props.title}</span>
        </>
    );
};

