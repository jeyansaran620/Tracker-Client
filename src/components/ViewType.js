import React from 'react';
import { Card, Button, CardTitle } from 'reactstrap';
import propTypes from 'prop-types';
import { hostname } from '../hostname';
import { withRouter } from 'react-router-dom';

class ViewType extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            fetchError : ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}types/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    type : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'type fetch Went Wrong !!!'
                });
            })
        }

    deleteType()
    {
        const headers = {
            method: 'DELETE',
            credentials: 'include'
        };

        fetch( `${hostname}types/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
                console.log(json);
                this.props.history.push(`/Home`);
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'type delete Went Wrong !!!'
                });
            })
    }

render()
{
    const {fetchError, type } = this.state;

    if (fetchError !== '')
     {
         return (
            <h3 style={{color:"floralWhite"}}>{fetchError}</h3>
    )}
    else if(type === null)
    {
        return (
             <h3 style={{color:"floralWhite"}}>Loading</h3>
        )
    }
    else
    {
        return(
            <div className="container" >
                <div className="row p-2">
                    <div>Type Name: {type.name}</div>
                </div>
                <div className="row p-2" >
                    <div>Type Id: {type._id}</div>
                </div>
                <div className="row p-2">
                    <div>Description: {type.description}</div>
                </div>

                <div className="row p-2">
                <Button  className="col-5 m-1" style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                        onClick={() =>  this.props.history.push(`/ModType/${this.props.match.params.id}`)}>Modify Details</Button>

                <Button className="col-5 m-1" style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                        onClick={() => this.deleteType()}>Delete Type</Button>
                </div>
                <h6 style={{color:"red"}}>Deleting a Type, deletes all Tools under it.</h6>
               
               
                <div className="row p-2">
                    <div className="container">
                    <div className="row">Tools in this Type:</div>
                    <div className="row">
                    {
                    type.tools.length === 0 ? <h5>No Tools by now</h5>
                    :
                     type.tools.reverse().map((tool,i) =>{
                         return(
                              <Card body outline color="secondary" key ={i} className="col-11 col-sm-5 m-2">
                                    <CardTitle tag="h5">{tool}</CardTitle>
                                    <Button onClick={() =>  this.props.history.push(`/ViewTool/${tool}`)} >View Tool</Button>
                                </Card>
                        )})
                    }
                    </div>
                    </div>
                    

                </div>
            </div>
        )
    }
}
}

ViewType.propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    }),
    history: propTypes.object
  };

  
export default withRouter(ViewType);