interface obj<T> {
    [key: string]: T
}

let onmessage:(e:MessageEvent)=>void = function(e:MessageEvent) {
    let recursive:(objArray:obj<Array<string>>)=>Array<Array<string>> = function (objArray:obj<Array<string>>) {
        let cells:Array<string> = Object.keys(objArray),
            n:number = Math.sqrt(cells.length),
            indexCell:number = 0,
            returnArray:Array<Array<string>> = [],
            objArrayFlag:obj<Array<boolean>> = {},
            result:boolean = false;
        Object.entries(objArray).forEach(([key,value]:[string,Array<string>])=>objArrayFlag[key] = new Array<boolean>(value.length).fill(false));
        function pushCell(intermediateArray:Array<string>,item:string):void {
            intermediateArray.forEach((el:string)=>{
                objArrayFlag[el][objArray[el].indexOf(item)] = true;
                objArrayFlag[item][objArray[item].indexOf(el)] = true;
            });
        }
        let funcReturn:(varItems?:Array<string>,varIntermediate?:Array<string>)=>void = function (varItems:Array<string> = objArray[cells[indexCell]],varIntermediate:Array<string> = [cells[indexCell]]):void {
            if(cells.length !== indexCell) {
                varItems.forEach((item:string)=>{
                    let newItems = objArray[item].filter((el:string,index:number)=>varItems.includes(el));
                    if((varIntermediate.length + newItems.length + 1 - n) >= 0 && varIntermediate.some((el:string)=>!objArrayFlag[el][objArray[el].indexOf(item)])) {
                        if(varIntermediate.length < 2) pushCell(varIntermediate, item);
                        varIntermediate.push(item);
                        if (newItems.length) funcReturn(newItems, varIntermediate);
                        else if (varIntermediate.length === n) returnArray.push(varIntermediate.concat());
                        varIntermediate.pop();
                    }
                })
                if(varIntermediate.length===1) {
                    indexCell++;
                    let items:Array<string>,
                        intermediateArray:Array<string>;
                    if(indexCell!==cells.length) {
                        items = objArray[cells[indexCell]];
                        intermediateArray = [cells[indexCell]];
                    }
                    else {
                        items = [];
                        intermediateArray = [];
                    }
                    funcReturn(items, intermediateArray);
                }
            }
            else {
                result = true;
                return;
            }

            if(result) return;
        }
        funcReturn();
        return returnArray;
    }
    let boolArray: Array<string> = [],
        time:number = (+ Date.now());
    const locatedQueens:Array<Array<string>> = recursive(e.data[0]);
    for (let locatedQueen of locatedQueens) {
        let newArray:string = e.data[1]?.map((elArray: Array<string>) => {
            return elArray.map<string>((str: string) => locatedQueen.includes(str)?String.fromCharCode(9819):".").join(" ")
        }).join('\n');
        if (!boolArray.includes(newArray))
            boolArray.push(newArray);
    }
    console.log(`${(+ Date.now() - time)}ms - время нахождения всевозможных значений`);
    e.ports[0].postMessage(boolArray);
}

function fn2workerURL(fn:(e:MessageEvent)=>void) {
    var blob = new Blob(['onmessage = '+fn.toString().replace(/e\.ports\[0\]\./g,"")], {type: 'application/javascript'})
    return URL.createObjectURL(blob)
}
export default fn2workerURL(onmessage);