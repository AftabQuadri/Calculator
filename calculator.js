

// Get references to the buttons and the textarea
const buttons = document.querySelectorAll('.button');
const textarea=document.getElementById('userinput');
let openBracketsCount = 0;

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const id = button.id;
        const value=button.textContent;
        switch (id) {
            case 'bakspace':
                let text = textarea.value;
                if (text !== '') {
                    textarea.value = text.slice(0, text.length-1);
                }
                break;
            case 'allclear':
                textarea.value = '';
                break;
            case 'multiply':
                if(textarea.value=='' || textarea.value[textarea.value.length-1]=='x'){
                    //do nothing
                }
                else if(textarea.value.includes('(') || textarea.value.includes(')')){
                    textarea.value+='x';

                }
                else if(textarea.value[textarea.value.length-1]=='+'||textarea.value[textarea.value.length-1]=='-'||textarea.value[textarea.value.length-1]=='/'){
                    textarea.value=textarea.value.substring(0,textarea.value.length-1)+'x';
                }
                else if(textarea.value.includes('-')||textarea.value.includes('+')||textarea.value.includes('x')||textarea.value.includes('/')){
                   let result= evaluate(textarea.value);
                   textarea.value=result+'x';
                }
                
                else{
                    textarea.value+='x';
                }
                break;
            
            case 'division':
                if(textarea.value=='' || textarea.value[textarea.value.length-1]=='/'){
                    //do nothing
                }
                else if(textarea.value.includes('(') || textarea.value.includes(')')){
                    textarea.value+='/';

                }
                else if(textarea.value[textarea.value.length-1]=='+'||textarea.value[textarea.value.length-1]=='-'||textarea.value[textarea.value.length-1]=='x'){
                    textarea.value=textarea.value.substring(0,textarea.value.length-1)+'/';
                }
                else if(textarea.value.includes('-')||textarea.value.includes('+')||textarea.value.includes('x')||textarea.value.includes('/')){
                   let result= evaluate(textarea.value);
                   textarea.value=result+'/';
                }
                else{
                    textarea.value+='/';
                }
                break;
            
            case 'plus':
            if(textarea.value=='' || textarea.value[textarea.value.length-1]=='+'){
                //do nothing
            }
            else if(textarea.value.includes('(') || textarea.value.includes(')')){
                textarea.value+='+';

            }
            else if(textarea.value[textarea.value.length-1]=='x'||textarea.value[textarea.value.length-1]=='-'||textarea.value[textarea.value.length-1]=='/'){
                textarea.value=textarea.value.substring(0,textarea.value.length-1)+'+';
            }
            else if(textarea.value.includes('-')||textarea.value.includes('+')||textarea.value.includes('x')||textarea.value.includes('/')){
               let result= evaluate(textarea.value);
               textarea.value=result+'+';
            }
            else if(textarea.value.includes('(') || textarea.value.includes(')')){
                textarea.value+='+';

            }
            else{
                textarea.value+='+';
            }
            break;
        
            case 'minus':
                if(textarea.value=='' || textarea.value[textarea.value.length-1]=='-' ){
                    //do nothing
                }
                // else if(textarea.value[0]=='-'){
                //     textarea.value+='+(-';
                //     openBracketsCount++;
                // }
                else if(textarea.value.includes('(') || textarea.value.includes(')')){
                    textarea.value+='-';

                }
               else if(textarea.value[textarea.value.length-1]=='+'||textarea.value[textarea.value.length-1]=='x'||textarea.value[textarea.value.length-1]=='/'){
                    textarea.value=textarea.value.substring(0,textarea.value.length-1)+'-';
                }
                else if(textarea.value.includes('-')||textarea.value.includes('+')||textarea.value.includes('x')||textarea.value.includes('/')){
                  
                    let result= evaluate(textarea.value);
                   textarea.value=result+'-';
                }
                else if(textarea.value[textarea.value.length-1]=='+'||textarea.value[textarea.value.length-1]=='x'||textarea.value[textarea.value.length-1]=='/'){
                    textarea.value[textarea.value.length-1]='-';
                }
                else if(textarea.value.includes('(') || textarea.value.includes(')')){
                    textarea.value+='-';

                }
                else{
                    textarea.value+='-';
                }
                break;
            case 'dot':
                let num=textarea.value;

                if(num.includes('.')){
                    //do nothing
                    let operatorArr=['+','-','x','/'];
                    for(let i=0;i<operatorArr.length;i++){
                        if(num.includes(operatorArr[i])){
                            let numbers=num.split(operatorArr[i]);
                            if(numbers[1].includes(value)){
                                //do nothing
                            }
                            else{
                                textarea.value+=value;
                            }
                        }
                    }
                }
                else if(textarea.value==''){
                    textarea.value='0'+value;
                }
                else{
                    textarea.value+=value;
                }
                // Specific logic for these buttons if needed
                break;
            case 'equals':
            evaluate(textarea.value);
            break;
            case 'root':
                if(textarea.value==''){
                textarea.value+='√';
            }
            else{
                textarea.value+='x'+'√';
            }
                break;
            case 'square':
                if(textarea.value=='' || textarea.value[textarea.value.length-1]=='√'){
                    //do nothing
                }
                else{
                    textarea.value+='²';
                }
                break;
            case '(':
                textarea.value+='(';
                openBracketsCount++;
                // console.log(openBracketsCount);
                break;
            case ')':
                // console.log("closed bracket");
                // console.log(openBracketsCount);
                if (openBracketsCount > 0) {
                    if(textarea.value.slice(-1) !== '(' && textarea.value.slice(-1)!=='+'  && textarea.value.slice(-1)!=='x' && textarea.value.slice(-1)!=='/' && textarea.value.slice(-1)!=='-' ){
                        textarea.value += ')';
                        openBracketsCount--;
                    }
                
                    }
                break;
            default:
                if(textarea.value.includes('²') && textarea.value[textarea.value.length-1]!='+' && textarea.value[textarea.value.length-1]!='-'&&textarea.value[textarea.value.length-1]!='x' &&textarea.value[textarea.value.length-1]!='/'){
                    
                    evaluate(textarea.value);//if the 
                    textarea.value+='x'+value;
                }
                else{
                textarea.value += value;
                }
                break;
        }
    });
});
function evaluate(params) {
    console.log("Param: "+params);
    if(openBracketsCount>0){
        for (let index = openBracketsCount; index >0; index--) {
            params+=')';
            
        }
    }
    console.log("evaluate");
    let plus='+';
    let minus='-';
    let multiply='x';
    let divide='/';
    let root='√';
    let square='²';
    let result=params;
    let openBracket='(';
    let closedBracket=')';
    if(params.includes(openBracket) || params.includes(closedBracket)){
        //check if all the opening brackets closed
        console.log("includes bracket");
        if(openBracketsCount>0){
            for(let i=0;i<openBracketsCount;i++){
                params+=')';
                openBracketsCount--;//closing all the open brackets
                console.log("closing brackets");
            }
        //now we have valid number of brackets so now we do our operation
        }
        //separate non bracket elements and bracket elements
        // let newParameters=params.substring(indexof)
        let result=removeBracketAndEvaluate(params);
        console.log(result);
        // let newResult=evaluate(newParam);
        return result;
    }
    if(params[params.length-1]==plus||params[params.length-1]==minus
        ||params[params.length-1]==multiply
        ||params[params.length-1]==divide){
            return result;
    }

    else if(textarea.value[0]=='-'){
        let newValue=textarea.value.substring(1);
        textarea.value='';

        if(newValue.includes(plus)){
            let newValueArr=newValue.split(plus);
            if(Number.parseFloat(newValueArr[0])>Number.parseFloat(newValueArr[1])){
               result=Number.parseFloat(newValueArr[0])-Number.parseFloat(newValueArr[1]);
                result='-'+result;
            }else{
             result=Number.parseFloat(newValueArr[1])-Number.parseFloat(newValueArr[0]);
            }
           
        }
        if(newValue.includes(minus)){
            let newValueArr=newValue.split(minus);
            result=Number.parseInt(newValueArr[0])+Number.parseInt(newValueArr[1]);
            console.log(result);
            result='-'+result;
            
        }
        if(newValue.includes(multiply)||newValue.includes(divide)){
            console.log(newValue);
            textarea.value='';
            result='-'+evaluate(newValue);
        }
        textarea.value=result;
        return result;
    }
    else if(params.includes(root)){
        let numbers=params.split(root);
        let firstNum=numbers[0];
        console.log(firstNum);
        let secondNum=numbers[1];
        if(parseFloat(firstNum)==0){
        result=Math.sqrt(parseFloat(secondNum));
        }
        else{
            
            let temp=evaluate(secondNum);
            console.log(temp);
            result=firstNum+""+squareRoot(temp);
            console.log(firstNum);
            result=evaluate(result);
            //write logic to give x sign befor root
        }
    }
    else if(params.includes(square)){
        let operatorArr=['+','-','x','/'];
                for (let index = 0; index < operatorArr.length; 
                    index++) {
                    const element = operatorArr[index];
                    if(params.includes(element)){
                        let numbers=params.split(element);
                        if(numbers[0].includes(square)){
                            let resultOfSquare=squareR(numbers[0]);
                            console.log(resultOfSquare+element+numbers[1]);
                            evaluate(resultOfSquare+element+numbers[1]);
                            return;
                        }
                        else{
                            let resultOfSquare=squareR(numbers[1]);
                            evaluate(numbers[0]+element+resultOfSquare);
                            return;
                        }
                    }
                    result=squareR(params);
                    
                }
    }
    else if(params.includes(divide)){
        let divisionResult=divideAndReturnResult(params);
        let numbers=params.split(divide);
        let firstNum=parseFloat(numbers[0]);
        let secondNum=parseFloat(numbers[1]);
        if(secondNum=='0'){
            result='∞';
        }
        else{
        result=firstNum/secondNum;
        console.log("Division result: "+result);
    }
    }
    else if(params.includes(multiply)){
        console.log("multiply");
        let numbers=params.split(multiply);
        let firstNum=parseFloat(numbers[0]);
        let secondNum=parseFloat(numbers[1]);
        console.log("first number: "+firstNum);
        console.log("second number: "+secondNum);
        console.log("chcking if firstnum is naan: "+isNaN(firstNum));
        if(isNaN(firstNum)){
            result=secondNum;
        }
        else{
            result=firstNum*secondNum;
        }

        console.log("Multiplication result: "+result);
    }
    else if(params.includes(plus)){
        let numbers=params.split(plus);
        let firstNum=parseFloat(numbers[0]);
        let secondNum=parseFloat(numbers[1]);
        result=firstNum+secondNum;
        console.log("Result of Additon: "+result);
    }
    else if(params.includes(minus)){
        let numbers=params.split(minus);
        console.log("minus");
        let firstNum=parseFloat(numbers[0]);
        let secondNum=parseFloat(numbers[1]);
        result=firstNum-secondNum;
        console.log("Minus result: "+result);
    }
    
    
    textarea.value=result;
    return result;
}
function squareR(params) {
    return Math.pow(parseFloat(params),2);
}
function squareRoot(params) {
    return Math.sqrt(parseFloat(params))
}
function bracketFun(params){
    
}
function removeBracketAndEvaluate(params) {
    let result;
        if(params.includes('(')|| params.includes(')')){
            let firstIndexOfClosingBracket=params.indexOf(')');
            let endString=params.substring(firstIndexOfClosingBracket+1,params.length);//string after the closing bracket
            let startString=params.substring(0,firstIndexOfClosingBracket);//string till the start of closing bracket
            let lastIndexOfOpeningBracketInStartString=startString.lastIndexOf("(");
            let stringToEvaluate=startString.substring(lastIndexOfOpeningBracketInStartString+1,startString.length);//string between the two brackets
            console.log("String to evaluate: "+stringToEvaluate);
            let stringBeforeTheLastOpeningBracket=startString.substring(0,lastIndexOfOpeningBracketInStartString);//string before opening bracket
            console.log(""+stringToEvaluate);
            result=evaluate(stringToEvaluate);
            console.log("Result: "+result);
            if(stringBeforeTheLastOpeningBracket.slice(-1)!='+' || stringBeforeTheLastOpeningBracket.slice(-1)!='-' ||stringBeforeTheLastOpeningBracket.slice(-1)!='x'||stringBeforeTheLastOpeningBracket.slice(-1)!='/'){
                stringBeforeTheLastOpeningBracket+='x';
                console.log("string before the last opening bracket.. adding a x: "+stringBeforeTheLastOpeningBracket);
            }
            console.log("New Argument: "+stringBeforeTheLastOpeningBracket+result+endString);
            return removeBracketAndEvaluate(stringBeforeTheLastOpeningBracket+result+endString); //this line has a bug
        
        }else{
            console.log("no brackets found hence returning result");
            console.log(params);
            let result=evaluate(params);
            console.log(result);
            return result;
        
        
        }
           
}

function divideAndReturnResult(params) {
    let divide='/';
    let numbers=params.split(divide);
    let tempResult1=numbers[0],tempResult2=numbers[1];
    if(numbers[0].includes('+') ||numbers[0].includes('-') ||numbers[0].includes('*') ||numbers[0].includes('/')){
        tempResult1=evaluate(numbers[0]);
    }
    if(numbers[1].includes('+') ||numbers[1].includes('-') ||numbers[1].includes('*') ||numbers[1].includes('/')){
        tempResult2= evaluate(numbers[1]);
    }
    console.log();
    return parseFloat(tempResult1)/parseFloat(tempResult2);
}
