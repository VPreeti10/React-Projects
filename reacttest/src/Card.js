import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios'

const Card =(props)=>{
    return(
       <div style={{margin:'1em'}}>
           <img width="75" src={props.avatar_url} />
           <div style={{display:'inline-block',margin:10}}>
               <div style={{fontSize:'1.25em',fontWeight:'bold'}}>{props.name}</div>
               <div>{props.Company}</div>
               <div>{props.someOther}</div>
           </div>
       </div>
    );
}

const CardList=(props)=>{
    return(
        <div>
            {props.card.map(card=><Card {...card}/>)}
        </div>
    );
}

class Form extends React.Component{
   
    state={username:''};

    handleSubmit=(event)=>{
        event.preventDefault();     
        axios.get('https://api.github.com/users/'+this.state.username).then(response=>{
         this.props.onsubmit(response.data);
    });
    }

    handeUsernameChange=(event)=>{
        this.setState({username:event.target.value});    
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.username}
                onChange={this.handeUsernameChange}name="txtName" placeholder="GitHub username"/>
                <button type="Submit">Add Card</button>
                </form>
        );
    }
}
class Appli extends React.Component{
    state={
        data :[
        //     { name:"Paul", Company:"Facebbok" ,avatar_url:"https://avatars1.githubusercontent.com/u/8445?v=4",someOther:"abc"},
     
        //     { name:"Preethi", Company:"Google" ,avatar_url:"https://avatars0.githubusercontent.com/u/1?v=4",someOther:"def" }
         ]
    };
    addNewCard=(cardInfo)=>{
        this.setState(prevState=>({
        data:prevState.data.concat(cardInfo)
        }));
          
    }
    render(){
        return(
            <div>
                <Form onsubmit={this.addNewCard}/>
                <CardList card={this.state.data}/>
            </div>

        );
    }
}
export default Appli;
ReactDOM.render(<Appli />,document.getElementById('cards'));













