import React, {Component} from "react";

export default class ViewBook extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return(
            <div >
                {this.props.book.title}
            </div>
        )
    }
}