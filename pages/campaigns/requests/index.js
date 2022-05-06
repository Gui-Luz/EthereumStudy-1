import React, { Component } from "react";
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call()
        const summary = await campaign.methods.getSummary().call();
        const approversCount = summary[3];

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );

        return { address, requests, requestCount, approversCount }
    }

    renderRow() {
        return this.props.requests.map((request, index) =>{
            return <RequestRow 
                    approversCount={this.props.approversCount}
                    id={index}
                    request={request} 
                    key={index}
                    address={this.props.address}/>;
        })
    }


    render () {
        const { Header, Row, HeaderCell, Body } = Table;


     return (
         <Layout>
             <h3>Requests</h3>
             <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary floated="right" style={{ marginBottom: 10}}>Add request</Button>
                </a>
             </Link>
             <Table>
                 <Header>
                     <Row>
                         <HeaderCell>Id</HeaderCell>
                         <HeaderCell>Description</HeaderCell>
                         <HeaderCell>Amount</HeaderCell>
                         <HeaderCell>Recipient</HeaderCell>
                         <HeaderCell>Approval Count</HeaderCell>
                         <HeaderCell>Approve</HeaderCell>
                         <HeaderCell>Finalize</HeaderCell>
                     </Row>
                 </Header>
                 <Body>
                     {this.renderRow()}
                 </Body>
             </Table>
             <div> Found {this.props.requestCount}</div>
         </Layout>
         
     );
 }}

 export default RequestIndex