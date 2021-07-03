import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App ,{ loading, outputError } from "./App";

let locatedQueens:Array<{n:number,result:number|string}> = [
    {
        n: -1,
        result: 1
    },
    {
      n:0,
      result: outputError
    },
    {
        n: 1,
        result: 1
    },
    {
        n:2,
        result: 0
    },
    {
        n:3,
        result: 0
    },
    {
        n:4,
        result: 2
    },
    {
        n:5,
        result: 10
    },
    {
        n:6,
        result: 4
    },
    {
        n:7,
        result: 40
    },
    {
        n:8,
        result: 92
    }
];
locatedQueens.forEach(({n,result}:{n:number, result:number|string})=>{
    test (`onmessage n=${n}, result=${result}`, function() {
        render(<App />);
        fireEvent.change(screen.getByLabelText(/n/i), {
            target: {value: n},
        })
        fireEvent.click(screen.getByText(/Найти/i));
        let newCount:HTMLElement;
        do {
            newCount= screen.getByTestId("count-element");
        } while (newCount.innerHTML === loading )
        expect(newCount).toMatchObject({innerHTML:result.toString()});
    });
})

