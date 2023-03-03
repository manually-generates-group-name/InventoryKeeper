import _ from 'lodash';

function demoArraySnipping(leftD, rightD) {
    const fruits = [];
    fruits.push("banana", "apple", "peach", "plum", "orange", "mango", "pineapple");
    return _.dropRight(_.drop(fruits, leftD), rightD) // Perform left drop then right drop
}

const DrakeAPI = () => {
    demoArraySnipping(1, 2);
    const fruits = [];
    fruits.push("banana", "apple", "peach", "plum", "orange", "mango", "pineapple");
    return(
        <div className="Drake">
            <h1>Hello from Drake</h1>
            <p>Full List of Fruits:</p>
            <ul>
                {fruits.map(item => {
                return <li>{item}</li>;
                })}
            </ul>
            <p>Dropped List of Fruits 1 left 2 right:</p>
            <ul>
                {demoArraySnipping(1, 2).map(item => {
                return <li>{item}</li>;
                })}
            </ul>
        </div>
    )
}

export default DrakeAPI