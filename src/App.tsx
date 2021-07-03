import React, {FormEvent, useEffect, useRef, useState} from 'react';
import worker_script, {onmessage} from "./worker";
import './App.css';

export let loading:string = "Загрузка...";
export let outputError:string = 'доски NaN * NaN не существует'

//global.window.URL.createObjectURL = jest.fn();
//global.window.URL.revokeObjectURL = jest.fn();

export interface obj<T> {
    [key: string]: T
}
interface FormElements extends HTMLCollection {
    n: HTMLInputElement
}
declare var Blob: {
    prototype: Blob;
    new (): Blob;
    new (request: Array<string>, mime?: {type:string}): Blob;
}


function App() {
    const n = useRef<number>(0);
    const time = useRef<number>(0);
    const [valueInput, setInput] = useState<string>("8");
    const form = useRef<HTMLFormElement>(null);
    const [count, setCount] = useState<number|string>();
    const myWorker = useRef<Worker>();

    function download(data:string, filename:string, type:string):void {
        let file:Blob = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            let a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }

    function onmessageWorker(e:MessageEvent<Array<string>>):void {
        console.log(`n = ${n.current}, ${(+ Date.now() - time.current)}ms - время нахождения всевозможных значений`);
        if(e.data.length) download(e.data.join('\n'), `queens${n.current}.txt`, "text/html");
        n.current = 0;
        setCount(e.data.length);
    }

    useEffect(()=>{
        if (window.Worker && !myWorker.current) {
            myWorker.current = new Worker(worker_script);
            myWorker.current.addEventListener("message", onmessageWorker, false);
        }
    },[])

    useEffect(()=>{
        if (n.current) {
            time.current = (+ Date.now());
            let array: Array<Array<string>> = [],
                objArray: obj<Array<string>> = {};
            for (let i = 0; i < n.current; i++) {
                array.push([]);
                for (let j = 0; j < n.current; j++)
                    array[i].push(`${i}${j}`);
            }
            array.forEach((el1: Array<string>, index1: number) => {
                el1.forEach((el2: string, index2: number) => {
                    objArray[el2] = [];
                    for (let i = 0; i < n.current; i++) {
                        if (i === index1) continue;
                        for (let j = 0; j < n.current; j++) {
                            if (j === index2 || Math.abs(j - index2) === Math.abs(i - index1)) continue;
                            objArray[el2].push(`${i}${j}`);
                        }
                    }
                })
            })
            if (myWorker.current) myWorker.current.postMessage([objArray,array]);
            else {
                let e:{data:[obj<Array<string>>,Array<Array<string>>,(array:Array<string>)=>void]} = {data:[objArray,array,function(array:Array<string>):void {
                    onmessageWorker({data:array} as MessageEvent<Array<string>>)
                }]};
                onmessage(e as MessageEvent<[obj<Array<string>>,Array<Array<string>>,(array:Array<string>)=>void]>);
            }
        }
        else if (count === loading) setCount(outputError);
    },[count])
    function onSubmit(event:FormEvent):void {
        n.current = parseInt((form.current?.elements as FormElements).n.value);
        setCount(loading);
        event.preventDefault();
        event.stopPropagation();
    }
    function handleChange(event:React.ChangeEvent<HTMLInputElement>):void {
        setInput((/[1-9][0-9]?/.exec(event.target.value) as string|null)||'');
    }
    return (
        <React.Fragment>
            <h3>Задача о Ферзях</h3>
            <form onSubmit={onSubmit} ref={form}>
                <label htmlFor="n">n =</label>
                <input type="text" value={valueInput} name="n" onChange={handleChange} id="n" disabled={count===loading?true:false}/>
                <input type="submit" value={"Найти"} disabled={count===loading?true:false}/>
            </form>
            <div className="count" data-testid="count-element">
                {count}
            </div>
        </React.Fragment>
    );
}

export default App;
