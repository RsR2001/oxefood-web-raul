import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon,  } from 'semantic-ui-react';

class FormClienteRaul extends React.Component{
    render(){
    return(
<div>
    <div style={{marginTop: '3%'}}>
        <Container textAlign='justified' >
        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>
        <Divider/>
        <div style={{marginTop: '4%'}}>
            <Form>
                <Form.Group widths="equals">
                    <Form.Input
						required
						fluid
						label='Titulo'
						maxLength="100"
					/>
                    <Form.Input
						required
						fluid
						label='Codigo do Produto'
						maxLength="100"
									/>
                </Form.Group>
                <Form.Group>
                    <Form
                    fluid
                    label="Descrição"
                    maxLength="1000"
                    />
                </Form.Group>
            </Form>
        </div>
        </Container>
    </div>
</div>
    )
    }
    }
    export default FormClienteRaul;