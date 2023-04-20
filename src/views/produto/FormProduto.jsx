import React from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';


class FormProduto extends React.Component{

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
										label='Título'
										maxLength="100"
                                        placeholder="Informe o título do produto"
										value={this.state.titulo}
				onChange={e => this.setState({titulo: e.target.value})}
									/>

									<Form.Input
										fluid
                                        required
                                        width={9} 
                                        placeholder="Informe o código do produto" 
										label='Codigo do produto'>
                                        value={this.state.codigo}
				onChange={e => this.setState({codigo: e.target.value})}
									</Form.Input>

								</Form.Group>
                                <Form.Group>

                                <Form.TextArea  
								label='Descrição' 
                                placeholder='Informe a discrição do produto' 
                                width={16}
								value={this.state.descricao}
				onChange={e => this.setState({descricao: e.target.value})}
								 />
                                   

                                </Form.Group>
								
								<Form.Group>

									<Form.Input
										fluid
                                        required
										label='Valor unitário'
                                        width={6}
										value={this.state.valorUnitario}
				onChange={e => this.setState({valorUnitario: e.target.value})}
				>
								
									</Form.Input>

									<Form.Input
										fluid
										label='Tempo de entrega Mínimo em Minutos'
                                        placeholder="30"
                                        width={6}
										value={this.state.tempoEntregaMinimo}
				onChange={e => this.setState({tempoEntregaMinimo: e.target.value})}
										>
										
                                            
                                    
									</Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Tempo de entrega Máximo em Minutos'
                                        placeholder="40"
                                        width={6}
										value={this.state.tempoEntregaMaximo}
				onChange={e => this.setState({tempoEntregaMaximo: e.target.value})}
                                    >
                                     
                                            
                                     
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