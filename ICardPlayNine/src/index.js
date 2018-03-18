import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash'
import Appli from './Card'
const Stars=(props)=>{
       //let stars=[];
      // for(let i=0;i<noofStars;i++){
      // stars.push(<i key={i} className="fa fa-star"></i>);
    //  }

    return(
        <div className="col-5">
              {_.range(props.starcount).map(i=><i key={i} className="fa fa-star"></i>)}
           </div>
    );
}

const Button=(props)=>{
    let button;
    switch(props.answerIsCorrect){

            case true:
                button= <button className="btn btn-success" onClick={props.acceptClick}>
                <i className="fa fa-check"></i>
                </button>;break;
            

            case false:
             button= <button  className="btn btn-danger" >
             <i className="fa fa-times"></i>
             </button>;break;

            default:
            button= <button  className="btn" disabled={props.selectedNo.length==0} onClick={props.verifyClick}>=</button>
    }
    
    return(
        <div className="col-2 text-center">
           {button}
           <br/><br/>
           <button className="btn btn-warning btn-sm" disabled={props.redrawNo==0} onClick={props.redrawStar}><i className="fa fa-refresh"></i>{props.redrawNo}</button>
            </div>
    );
}

const Answer=(props)=>{
    return(
        <div className="col-5">
         {props.selectedNo.map((number,i)=><span key={i} onClick={()=>props.unSelCLick(number)}>
         {number}
         </span>)}
          </div>
    );
}

const Numbers=(props)=>{
    const returnCss=(num)=>{
        if(props.selectedNo.indexOf(num)>=0) {
         return ('selected');
        }
        if(props.usedNo.indexOf(num)>=0) {
            return ('used');
           }
    };
    return(
        <div className="card text-center">
        <div>
       {Number.list.map((num,i)=><span key={i} className={returnCss(num)} onClick={()=>props.NumClick(num)}>
            {num}       
       </span>)}
          </div> 
            </div>
    );
}
Number.list=_.range(1,10);
const DoneFrame=(props)=>{
    return(
        <div className="text-center">
           <h2> {props.doneStatus}</h2>
           <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
            </div>
    );
    
}

 var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };
class Game extends React.Component{
    static initialState=()=>({
        selectedNumber: [],
        noofStars :1+Math.floor(Math.random()*9),
        answerIsCorrect:null,
        usedNumbers:[],
        redraw:5,
        doneStatus:null
    });
    state=Game.initialState();
    
    selNumClick=(clickedNumber)=>{
        if(this.state.selectedNumber.indexOf(clickedNumber)>=0){ return;}
        this.setState(prevState=>({
            selectedNumber:prevState.selectedNumber.concat(clickedNumber),
            answerIsCorrect:null
        }));
    };
    unSelNumClick=(unSelnum)=>{
        this.setState(prevState=>({
            selectedNumber:prevState.selectedNumber.filter(no=>no!=unSelnum),
            answerIsCorrect:null
        }));
    }
    verifyAnswer=()=>{
       this.setState(prevState=>({
        answerIsCorrect:prevState.noofStars==prevState.selectedNumber.reduce((acc,n)=>acc+n,0)
       }));

    }
    acceptAnswer=()=>{
        this.setState(prevState=>({
            usedNumbers:prevState.usedNumbers.concat(prevState.selectedNumber),
            selectedNumber:[],
            answerIsCorrect:null,
            noofStars:1+Math.floor(Math.random()*9)
        }),this.updateDoneStatus);
    }

    redrawStar=()=>{
        if(this.state.redraw==0){return;}
        this.setState(prevState=>({            
            selectedNumber:[],
            noofStars:1+Math.floor(Math.random()*9),
            answerIsCorrect:null,
            redraw:prevState.redraw-1
        }),this.updateDoneStatus);
    }

    possibleCombination=({noofStars,usedNumbers})=>{
        const possibleNos=_.range(1,10).filter(num=>usedNumbers.indexOf(num)===-1);
        alert(noofStars);
        return (possibleCombinationSum(possibleNos,noofStars));
    }
    updateDoneStatus=()=>{
        this.setState(prevState=>{
           if(prevState.usedNumbers.length==9){
                return {doneStatus:'Done-Nice!'};
           }
           if(prevState.redraw===0 && !this.possibleCombination(prevState)){
               return{doneStatus:'Game Over!'}
           }            
        });
    }
    resetGameFn=()=>{
        this.setState(Game.initialState());
    }
    render(){
        return(
          <div className="container">
            <h4>  Play Nine</h4>
            <hr />
                <div className="row">
                    <Stars starcount={this.state.noofStars}/>
                    <Button selectedNo={this.state.selectedNumber} redrawNo={this.state.redraw} redrawStar={this.redrawStar} verifyClick={this.verifyAnswer} acceptClick={this.acceptAnswer}answerIsCorrect={this.state.answerIsCorrect}/>
                    <Answer selectedNo={this.state.selectedNumber} unSelCLick={this.unSelNumClick}/>
                </div>
            <br />
                <div>
                    {this.state.doneStatus ? <DoneFrame doneStatus={this.state.doneStatus} resetGame={this.resetGameFn}/>:
                    <Numbers usedNo={this.state.usedNumbers} selectedNo={this.state.selectedNumber}  NumClick={this.selNumClick}/>}
                   <br/>                  

                </div>
                    
              </div>  
        );
    }
}
class AppGame extends React.Component{
    render(){
        return(
            <div>
        <Game />
        </div>
        );
    }
}
ReactDOM.render(<AppGame />,document.getElementById('root'));