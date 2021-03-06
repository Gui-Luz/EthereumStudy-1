import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from "../../ethereum/factory";
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class CampaignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        try{
            this.setState({
                loading: true, 
                errorMessage: ''
            });
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        }catch (err) {
            this.setState({ errorMessage: err.message });

        };
        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <h3>New Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })} 
                            labelPosition='right' label='wei'/>
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>
                      Create!  
                    </Button>
                </Form>
            </Layout>
        )
    };
}

export default CampaignNew;