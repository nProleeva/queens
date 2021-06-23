import React, {FormEvent, useEffect, useRef, useState} from 'react';
import worker_script from "./worker";
import './App.css';

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
    const [valueInput, setInput] = useState<string>("8");
    const form = useRef<HTMLFormElement>(null);
    const objArray = useRef<obj<Array<string>>>({});
    const [count, setCount] = useState<number|string>();
    const myWorker = useRef<Worker>();

    function download(data:string, filename:string, type:string):void {
        let file:Blob = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }

    useEffect(()=>{
        if (window.Worker && !myWorker.current) {
            myWorker.current = new Worker(worker_script);
            myWorker.current.addEventListener("message", (e:MessageEvent):void => {
                if(e.data.length) download(e.data.join('\n'), `queens${n.current}.txt`, "text/html");
                n.current = 0;
                setCount(e.data.length);
            }, false);
        }
    },[])

    useEffect(()=>{
        if(n.current) {
            let array: Array<Array<string>> = [[]];
            objArray.current = {};
            for (let i = 0; i < n.current; i++) {
                array.push([]);
                for (let j = 0; j < n.current; j++)
                    array[i].push(`${i}${j}`);
            }
            array.forEach((el1: Array<string>, index1: number) => {
                el1.forEach((el2: string, index2: number) => {
                    objArray.current[el2] = [];
                    for (let i = 0; i < n.current; i++) {
                        if (i === index1) continue;
                        for (let j = 0; j < n.current; j++) {
                            if (j === index2 || Math.abs(j - index2) === Math.abs(i - index1)) continue;
                            objArray.current[el2].push(`${i}${j}`);
                        }
                    }
                })
            })
            myWorker.current?.postMessage([objArray.current,array]);
        }
    },[count])
    function onSubmit(event:FormEvent):void {
        n.current = parseInt((form.current?.elements as FormElements).n.value);
        setCount("Загрузка...");
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
                <input type="text" value={valueInput} name="n" onChange={handleChange} id="n" disabled={typeof count==="string"?true:false}/>
                <input type="submit" value={"Найти"} disabled={typeof count==="string"?true:false}/>
            </form>
            <div className="count">
                {count}
            </div>
        </React.Fragment>
    );
}

export default App;
