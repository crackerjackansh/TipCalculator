//Class to get element object and value using element ID
class ElementVal{
    constructor(inpId){
        this.inpId=inpId
    }
    // method-1
    // get element object by element id
    getElement(){
        var ele=document.getElementById(this.inpId)
        return ele
    }
    // method - 2
    // get value of element by using element id
    getValue(){
        // changing string to int
        var value = parseInt(this.getElement().value, 10);
        // check if value is not NaN
        value = isNaN(value) ? 0 : value;
        return value
    }
}



// object using ElementVal class to access Outputs of calculator 
let tipPerPerson = new ElementVal("tipPerPerson")
let amtPerPerson = new ElementVal("amtPerPerson")


// Class to Calculate Tip per person and Total per person
class Calc{
    constructor(amt,tip,split){
        this.amt=amt
        this.tip=tip
        this.split=split
    }
    // method - 1
    // to get value of amount
    amtValue(){
        return Number(this.amt.value)
    }
    // method - 2
    // to get value of tip
    tipValue(){
        return Number(this.tip.value)
    }
    // method - 3
    // to get value of split
    splitValue(){
        return Number(this.split.value)
    }
    // method - 4
    // to calculate tip per person
    tipCalc(){
        // Exception handling for Tip calculation
        var temp=((this.amtValue()*(this.tipValue()/100))/this.splitValue()).toFixed(2)
        // If Tip calculation gives NaN i.e., 0/0
        if(isNaN(temp)){
            return 0
        }
        // If Tip calculation gives infinity i.e., value/0
        else if(!isFinite(temp)){
            return (this.amtValue()*(this.tipValue()/100)).toFixed(2)
        }else{
            return temp
        }
        
    }
    // method - 5
    // to calculate final amount per person
    finalAmtCalc(){
        // Excpetion Handling for Final amount Calculation
        var temp=((this.amtValue()+(this.tipCalc()*this.splitValue()))/this.splitValue()).toFixed(2)
        // If Total amount per person calculation gives NaN i.e., 0/0
        if(isNaN(temp)){
            return 0
        }
        // If Total amount per person calculation gives infinity i.e., value/0
        else if(!isFinite(temp)){
            return (this.amtValue()+this.tipCalc()).toFixed(2)
        }
        else{
            return temp
        }
        
    }

}

// Objects using ElementVal class to access all input fields
let splitInput= new ElementVal("splitInput")
let tipInput= new ElementVal("tipInput")
let amtInput = new ElementVal("amtInput")

// Object using Calc class to get calculation of output
let result= new Calc(amtInput.getElement(),tipInput.getElement(),splitInput.getElement())




// Function to update output with updated calculation
function updateResult(){
    tipPerPerson.getElement().innerText = result.tipCalc()
    amtPerPerson.getElement().innerText = result.finalAmtCalc()
}

// Class to increament and decreament - tip and split input field
// it is child class of ElementVal
class IncDec extends ElementVal{
    constructor(inpId){
        // to get all information from its patrent class - ElementVal
        super(inpId)
    }
    
    // method - 1 
    // to increament Tip input field
    increament(){
        var val=this.getValue()
        if(this.inpId=="splitInput"){
            this.getElement().value = val+1
            // calling updateResult() - With every increament , update result 
            updateResult()
        }
        else if(this.inpId=="tipInput"){
            // if Input value of Tip >=100 , set input value to 100 i.e., No increament
            if(val>=100){
                this.getElement().value = 100
            }
            // if Input value of Tip <100 , we can increament
            else{
                this.getElement().value = val+1
            }
            // calling updateResult() - With every increament , update result 
            updateResult()
        }
        else{
            return
        }
        
    }
    // method - 2
    // to decreament Tip input field
    decreament(){
        var val=this.getValue()
        if(this.inpId=="splitInput"){
            // if Input value of split <= 1 , set input value to 0 i.e., No decreament
            if(val<=1){
                this.getElement().value = 1
            }
           // if Input value of split > 0 , we can decreament
            else{
                this.getElement().value = val-1
            }
            // calling updateResult() - With every decreament , update result
            updateResult()
        }
        else if(this.inpId=="tipInput"){
            // if Input value of tip <= 0 , set input value to 0 i.e., No decreament
            if(val<=0){
                this.getElement().value = 0
            }
            // if Input value of split > 0 , we can decreament
            else{
                this.getElement().value = val-1
            }
            // calling updateResult() - With every decreament , update result
            updateResult()
        }
        else{
            return
        }
    }
}

// objects to acess split and tip input field - using for increamment and decreament
    // onclick in input field in html is used to inc/dec on  clicking button
    // by calling member function of incDec class
let splitInputIncDec= new IncDec("splitInput")
let tipInputIncDec= new IncDec("tipInput")

// function to not take tip's input more than 100 , if its more than 100 --> set input to 100
function stopTipInput(){
    if(tipInput.getElement().value>=100){
        tipInput.getElement().value=100
    }
}

// Events to automatically update output with each input change
amtInput.getElement().addEventListener("input", function(){
    tipPerPerson.getElement().innerText = result.tipCalc()
    amtPerPerson.getElement().innerText = result.finalAmtCalc()
});
tipInput.getElement().addEventListener("input", function(){
    stopTipInput()
    tipPerPerson.getElement().innerText =result.tipCalc()
    amtPerPerson.getElement().innerText = result.finalAmtCalc()
});
splitInput.getElement().addEventListener("input", function(){
    tipPerPerson.getElement().innerText = result.tipCalc()
    amtPerPerson.getElement().innerText = result.finalAmtCalc()
});


// To change Currency Symbol
let selectCurrency=new ElementVal("selectCurrency")
let currencySign= document.getElementsByClassName("currencySign")
selectCurrency.getElement().addEventListener("change", function(){
    currencySign[0].innerText=selectCurrency.getElement().value
    currencySign[1].innerText=selectCurrency.getElement().value
});

