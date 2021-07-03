import type {obj} from "./App";

//global.window.URL.createObjectURL = jest.fn();

export let onmessage:(e:MessageEvent<[obj<Array<string>>,Array<Array<string>>,(array:Array<string>)=>void ]>)=>void = function(e:MessageEvent<[obj<Array<string>>,Array<Array<string>>, (array:Array<string>)=>void]>) {
    let recursive:(objArray:obj<Array<string>>)=>Array<Array<string>> = function (objArray:obj<Array<string>>) {
        let cells:Array<string> = Object.keys(objArray),
            n:number = Math.sqrt(cells.length),
            indexCell:number = 0,
            returnArray:Array<Array<string>> = [],
            objArrayFlag:obj<Array<boolean>> = {},
            result:boolean = false;
        Object.entries(objArray).forEach((data:[string,Array<string>]):void=>{objArrayFlag[data[0]] = new Array<boolean>(data[1].length).fill(false);});
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
                    if(n===1)
                        returnArray.push(varIntermediate.concat());
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
    let boolArray: Array<string> = [];
    const locatedQueens:Array<Array<string>> = recursive(e.data[0]);
    locatedQueens.forEach((locatedQueen:Array<string>)=>{
        let newArray:string = e.data[1].map((elArray: Array<string>) => {
            return elArray.map<string>((str: string) => locatedQueen.includes(str)?String.fromCharCode(9819):".").join(" ")
        }).join('\n');
        if (!boolArray.includes(newArray))
            boolArray.push(newArray);
    });
    if(e.ports) e.ports[0].postMessage(boolArray);
    if(e.data[2]) e.data[2](boolArray);
    return;
}

function fn2workerURL(fn:(e:MessageEvent<[obj<Array<string>>,Array<Array<string>>,(array:Array<string>)=>void]>)=>void) {
    let blob:Blob = new Blob([`onmessage = ${fn.toString().replace(/e\.ports\[0\]\.|window\./g,"")}`], {type: 'application/javascript'})
    return URL.createObjectURL(blob)
}
export default fn2workerURL(onmessage);
