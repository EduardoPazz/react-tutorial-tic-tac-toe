import React, { useEffect, useState } from 'react';

// export default class Test extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = { count: 0 };
//         this.setCount = this.setCount.bind(this);
//     }

//     setCount(newCount) {
//         this.setState(() => ({ count: newCount }));
//     }

//     render() {
//         <>
//             <p>You clicked {this.state.count}</p>
//             <button onClick={() => setCount(this.state.count + 1)}>
//                 Click Me!
//             </button>
//         </>
//     };
// }
 

export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, updateCount] = useState(0);

  const clickMessage = count => `You clicked ${count} times`;

  useEffect(() => document.title = clickMessage(count));

  return (
    <div>
      <p>{clickMessage(count)}</p>
      <button onClick={() => updateCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
}