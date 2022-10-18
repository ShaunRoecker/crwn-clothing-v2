import { useSelector, useDispatch } from "react-redux";
import {
    increment,
    decrement,
    reset,
    incrementByAmount
} from './counterSlice';
import { useState } from "react";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount, setIncrementAmount] = useState(0);

    const addValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }

    return (
        <section>
            <p>{count}</p>
            <div className="ma3">
                <button className="ma3 shadow-1" 
                    onClick={() => dispatch(increment())}>
                        +</button>
                <button className="ma3 shadow-1" 
                    onClick={() => dispatch(decrement())}>
                        -</button>
            </div>

            <input
                type="text"
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(e.target.value)}
            />

            <div>
                <button className="ma3 shadow-1" 
                    onClick={() => dispatch(incrementByAmount(addValue))}>
                        Add Amount</button>
                <button className="ma3 shadow-1" 
                    onClick={resetAll}>
                        Reset</button>
            </div>
        </section>
    )
}
export default Counter