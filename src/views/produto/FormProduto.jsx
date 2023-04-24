import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

class FormProduto extends React.Component{

	state = {

		codigo: null,
		descricao: null,
		titulo: null,
		valorUnitario: null,
		tempoEntregaMinimo: null,
		tempoEntregaMaximo: null
	}

	salvar = () => {

		let produtoRequest = {

			codigo: this.state.codigo,
			descricao: this.state.descricao,
			titulo: this.state.titulo,
			valorUnitario: this.state.valorUnitario,
			tempoEntregaMinimo: this.state.tempoEntregaMinimo,
			tempoEntregaMaximo: this.state.tempoEntregaMaximo
		}

		axios.post("http://localhost:8080/api/produto", produtoRequest)
			.then((response) => {
				console.log('Produto cadastrado com sucesso.')
			})
			.catch((error) => {
				console.log('Erro ao incluir o produto.')
			})
	}

    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>
                                <Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										label='Nome do Produto'
										maxLength="100"
										value={this.state.titulo}
										onChange={e => this.setState({ titulo: e.target.value })}
									/>

									<Form.Input
                                        required
										fluid
										label='Codigo'
										maxLength="3"
										value={this.state.codigo}
										onChange={e => this.setState({ codigo: e.target.value })}/>


								</Form.Group>

                                <Form.Group widths='equal'>

									<Form.TextArea
										required
                                        placeholder="Descreva..."
										fluid
										label='Descrição'
										maxLength="100"
										value={this.state.descricao}
										onChange={e => this.setState({ descricao: e.target.value })}
									/>


								</Form.Group>


								
								<Form.Group>

									<Form.Input
										fluid
                                        input type="number"
                                        
										label='Valor Unitario'
                                        width={6}>
										<InputMask
                                        placeholder="000,00"
										number="100,00"
										value={this.state.valorUnitario}
										onChange={e => this.setState({ valorUnitario: e.target.value })} /> 
									</Form.Input>

									<Form.Input
                                        maxLength="2"
										fluid
										label='Tempo de Entrega Minimo em Minutos'
                                        width={6}>
										<InputMask 
										placeholder="30" 
										value={this.state.tempoEntregaMinimo}
										onChange={e => this.setState({ tempoEntregaMinimo: e.target.value })}/> 
									</Form.Input>

                                    <Form.Input
                                        maxLength="2"
                                        fluid
                                        input type="number"
                                        label='Tempo de Entrega Maximo em Minutos'
                                        width={6}
                                    >
                                        <InputMask 
                                            placeholder="40"
                                            maskChar={null}
											value={this.state.tempoEntregaMaximo}
										onChange={e => this.setState({ tempoEntregaMaximo: e.target.value })}
                                        /> 
                                    </Form.Input>

								</Form.Group>

								<Form.Group widths='equal' style={{marginTop: '4%'}}  className='form--empresa-salvar'>

									<Button
										type="button"
										inverted
										circular
										icon
										labelPosition='left'
										color='orange'
										onClick={this.listar}
										>
										<Icon name='reply' />
										Voltar
									</Button>

									<Container textAlign='right'>
										
										<Button
											inverted
											circular
											icon
											labelPosition='left'
											color='blue'
											floated='right'
											onClick={this.salvar}
										>
											<Icon name='save' />
											Salvar
										</Button>
										
									</Container>

								</Form.Group>

							</Form>
						</div>
                    </Container>
                </div>
			</div>
		)
	}
}

export default FormProduto;