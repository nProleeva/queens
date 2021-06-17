import React, {FormEvent, useEffect, useRef, useState} from 'react';
import './App.css';

interface obj<T> {
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
    const [n, setN] = useState<number>(0);
    const [valueInput, setInput] = useState<string>("8");
    const form = useRef<HTMLFormElement>(null);
    const objArray = useRef<obj<Array<string>>>({});
    const [count, setCount] = useState<number|string>("");

    function download(data:string, filename:string, type:string) {
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

    async function recursive() {
        let cells:Array<string> = Object.keys(objArray.current),
            indexCell:number = 0,
            items:Array<string> = objArray.current[cells[indexCell]],
            tt:Array<string> = [cells[indexCell]],
            returnArray:Array<Array<string>> = [],
            objArrayFlag:obj<Array<boolean>> = {},
            result:boolean = false,
            promise = new Promise<Array<Array<string>>>((resolve) => {
          Object.entries(objArray.current).forEach(([key,value]:[string,Array<string>])=>objArrayFlag[key] = new Array<boolean>(value.length).fill(false));
          function pushCell(varTt:Array<string>,item:string):void {
              varTt.forEach((el:string)=>{
                  objArrayFlag[el][objArray.current[el].indexOf(item)] = true;
                  objArrayFlag[item][objArray.current[item].indexOf(el)] = true;
              });
          }
          function funcReturn(varItems:Array<string> = items,varTt:Array<string> = tt.concat()):void {
              if(cells.length !== indexCell) {
                  varItems.forEach((item:string)=>{
                      let newItems = objArray.current[item].filter((el:string,index:number)=>varItems.includes(el));
                      if((varTt.length + newItems.length + 1 - n) >= 0 && varTt.some((el:string)=>!objArrayFlag[el][objArray.current[el].indexOf(item)])) {
                          if(varTt.length < 2)
                              pushCell(varTt, item);
                          varTt.push(item);
                          if (newItems.length) {
                              funcReturn(newItems, varTt);
                          } else if (varTt.length === n) {
                              returnArray.push(varTt.concat());
                          }
                          varTt.pop();
                      }
                  })
                  if(varTt.length===1) {
                      indexCell++;
                      if(indexCell!==cells.length) {
                          items = objArray.current[cells[indexCell]];
                          tt = [cells[indexCell]];
                      }
                      else {
                          items = [];
                          tt = [];
                      }
                      funcReturn(items, tt);
                  }
              }
              else {
                  result = true;
                  return;
              }

              if(result) return;
          }
          funcReturn();
          resolve(returnArray);
        });
        return promise;
    }

    useEffect(()=>{
        if(n) {
            let array: Array<Array<string>> = [[]];
            objArray.current = {};
            for (let i = 0; i < n; i++) {
                array.push([]);
                for (let j = 0; j < n; j++)
                    array[i].push(`${i}${j}`);
            }
            array.forEach((el1: Array<string>, index1: number) => {
                el1.forEach((el2: string, index2: number) => {
                    objArray.current[el2] = [];
                    for (let i = 0; i < n; i++) {
                        if (i === index1) continue;
                        for (let j = 0; j < n; j++) {
                            if (j === index2 || Math.abs(j - index2) === Math.abs(i - index1)) continue;
                            objArray.current[el2].push(`${i}${j}`);
                        }
                    }
                })
            })
            let boolArray: Array<string> = [],
                time:number = (+ Date.now());
            recursive().then((locatedQueens: Array<Array<string>>) => {
                for (let locatedQueen of locatedQueens) {
                    let newArray:string = array?.map((elArray: Array<string>) => {
                        return elArray.map<string>((str: string) => locatedQueen.includes(str)?String.fromCharCode(9819):".").join(" ")
                    }).join('\n');
                    if (!boolArray.includes(newArray))
                        boolArray.push(newArray);
                }
                console.log(`n=${n}, ${(+ Date.now() - time)}ms - время нахождения всевозможных значений`);
                if(boolArray.length) download(boolArray.join('\n'), `queens${n}.txt`, "text/html");
                setCount(boolArray.length);
            });
        }
    },[n])
    function onSubmit(event:FormEvent):void {
        setN(parseInt((form.current?.elements as FormElements).n.value));
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
                <input type="text" value={valueInput} name="n" onChange={handleChange} id="n"/>
                <input type="submit" value={"Найти"}/>
            </form>
            <div className="count">
                {count}
            </div>
        </React.Fragment>
    );
}

export default App;
