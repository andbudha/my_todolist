import {v1} from "uuid";

test('The correct task must be deleted', ()=>{

    const todolistID1 = v1();

    const todolistID2 = v1();

    const startState = {
        [todolistID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    };

});