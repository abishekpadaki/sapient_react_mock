import React from 'react'
import {NavbarComponent} from '../../components/navbar/index'
import SideProfile from '../../components/side_profile_details/index'
import {RequestSaForEmailComponent} from '../../components/requestSaForEmailCard/index'
import {RequestHrForRegistrationComponent} from '../../components/requestHrForRegistrationCard/index'
import {FeedbackDeatilsCardComponent} from '../../components/feedbackDetailsCard/index'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as allactions from '../../actions/actionCreators';
import { ViewFeedbackDatabase } from '../../components/viewallfbdb/viewfbdb';
// import Container from 'react-bootstrap/Container'

export class Dashboard extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.login.userDetails);
        
        // props.FetchRequests();
        // props.FetchFeedbackHistory();
        // // console.log(props)
    }
    
    getFeedbackData = (props) => {
        const res = this.props.allfeedBacks.filter((p,i) =>
        p.OracleId === this.props.login.userDetails.oracleId);

        return res
    }

    getRequests = (props) => {
        const res1 = this.props.allrequests.filter((p,i) =>
        p.OracleId === this.props.login.userDetails.oracleId);

        return res1
    }

    

    render(){
        // console.log(this.getFeedbackData())
        // console.log(this.props.login.FirstName)
        // console.log(this.props)
        let reqview;
        // console.log(this.props.login.userDetails.role)
        if(this.props.login.userDetails.role=="HR"){
        // console.log(this.props.login.userDetails.FirstName)
        reqview=<React.Fragment>
                
                <Row>
                    <FeedbackDeatilsCardComponent  {...this.props} res={this.getFeedbackData()}/>
                </Row>
                <Row>
                
                        <RequestSaForEmailComponent/>
                    
                </Row>
                   
            </React.Fragment>;
        
    }
    else if(this.props.login.userDetails.role=="SuperAdmin"){
        reqview=<React.Fragment>
                
               
         <Row>
            <Col md={8}>
                <ViewFeedbackDatabase {...this.props}/>
                </Col> 
                
        </Row>
   
</React.Fragment>;
    }

    else{
        // console.log(this.props.login.FirstName);

        reqview=<React.Fragment>
            <Row>
                    <FeedbackDeatilsCardComponent  {...this.props} res={this.getFeedbackData()}/>
                </Row>
       
                 <Row>
                    <Col md={4}>
                        <RequestHrForRegistrationComponent/>
                    </Col> 
                    <Col md={3}>
                        <RequestSaForEmailComponent/>
                    </Col> 
                </Row>
                
            
        
    </React.Fragment>;
    }

    return( 
    <React.Fragment>
    <NavbarComponent role={this.props.login.userDetails.role} res={this.getRequests()} {...this.props}/>
                
        <Row>
            <Col md={4}>
                <SideProfile {...this.props}/>
            </Col>
            <Col md={8}>
               
                {reqview}
            </Col>
        </Row>
                </React.Fragment>)
}
}

function mapStateToProps(store){
    // console.log(store);
    return {
        login:store.users,
        allregistrations:store.registrations,
        allfeedBacks:store.feedBack,
        allsearchCards:store.searchCards,
        allrequests:store.requests        
}
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators(allactions,dispatcher)
}

export var MainDashboard  = connect(mapStateToProps,mapDispatchToProps)(Dashboard);