import { Fragment } from "react";

function ListGroup() {
    const items = [
        'Milano',
        'Genova',
        'Torino'
    ];

    return  (
            <Fragment>
                <h1>List</h1>
                {items.map((item) => <li key={item}>{item}</li>)}
            </Fragment>);
}

export default ListGroup;