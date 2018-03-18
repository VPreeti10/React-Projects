import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Button extends React.Component{
     buttonClick=()=>{
        this.props.clickAction(this.props.incrementValue)
     };
    render(){
        return(
            <button onClick={this.buttonClick}>{this.props.incrementValue}</button>
        );
    }
}

    const Result=function(props){
            return(
        <div>{props.label}</div>
        );
    };
    
       class Mix extends React.Component{

        state={incrementor:0}

        incrementCount = (incrementValue) =>{
        this.setState((prevState) =>{
                return{
                    incrementor :prevState.incrementor+incrementValue
                }
            });
        }


        
           render(){
               return(
                   <div>
                       <Button incrementValue={1} clickAction={this.incrementCount}/>

                       <Button incrementValue={5} clickAction={this.incrementCount}/>

                       <Button incrementValue={10} clickAction={this.incrementCount}/>
                       <Result label={this.state.incrementor} />
                       </div>
               )
           }
       }   
    ReactDOM.render(<Mix />, document.getElementById('root'));
    














//var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
//ReactDOM.render(element, document.getElementById('root'));



//registerServiceWorker();
