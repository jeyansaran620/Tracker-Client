import React from 'react';
import propTypes from 'prop-types';
import { hostname } from '../hostname';
import { withRouter } from 'react-router-dom';
import {  Button } from 'reactstrap';

class ViewCustomer extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            fetchError : ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}customers/${this.props.match.params.id}`, headers)
        .then(response => response.json())
        .then(json => 
            {
               this.setState({
                    customer : json
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'customer fetch Went Wrong !!!'
                });
            })
    }

    deleteCus()
    {
        const headers = {
            method: 'DELETE',
            credentials: 'include'
        };

        fetch( `${hostname}customers/${this.props.match.params.id}`, headers)
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
    const {fetchError, customer } = this.state;

    if (fetchError !== '')
     {
         return (
            <h3 style={{color:"floralWhite"}}>{fetchError}</h3>
    )}
    else if(customer === null)
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
                    <div>Customer Name: {customer.name}</div>
                </div>
                <div className="row p-2" >
                    <div>Customer Id: {customer._id}</div>
                </div>
                <div className="row p-2">
                    <div>Mail Id: {customer.mailId}</div>
                </div>
                <div className="row p-2">
                    <div>Location: {customer.location}</div>
                </div>
                <div className="row p-2">
                <Button  className="col-5 m-1" style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                        onClick={() =>  this.props.history.push(`/ModCustomer/${this.props.match.params.id}`)}>Modify Details</Button>
            
                <Button className="col-5 m-1" style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                        onClick={() => this.deleteCus()}>Delete Customer</Button>
                </div>
                </div>
        )
    }
}
}

ViewCustomer.propTypes = {
    history: propTypes.object,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string,
      }),
    })
  };

  
export default  withRouter(ViewCustomer);