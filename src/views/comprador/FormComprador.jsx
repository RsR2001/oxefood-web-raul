import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
class FormComprador extends React.Component{

	state = {
        nome:null,
        enderecoComercial:null,
        enderecoResidencial:null,
        comissao:null,
        trabahoHomeOffice:null,
        qtdComprasMediasMes:null,
        contratadoEm:null
	}
	salvar = () => {

		let compradorRequest = {

            nome: this.state.nome,
            enderecoComercial: this.state.enderecoComercial,
            enderecoResidencial: this.state.enderecoResidencial,
            comissao: this.state.comissao,
            trabahoHomeOffice: this.state.trabahoHomeOffice,
            qtdComprasMediasMes: this.state.qtdComprasMediasMes,
            contratadoEm: this.state.contratadoEm
		}
	
		axios.post("http://localhost:8080/api/comprador", compradorRequest)
		.then((response) => {
			console.log('Comprador cadastrado com sucesso.')
		})
		.catch((error) => {
			console.log('Erro ao incluir o um comprador.')
		})
	}


    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Comprador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										label='Nome'
										maxLength="100"
										value={this.state.nome}
			onChange={e => this.setState({nome: e.target.value})}

									/>

								</Form.Group>
								
								<Form.Group>

                                <Form.Input

										fluid
										label='endereço Comercial'
										width={6}
										value={this.state.enderecoComercial}
				onChange={e => this.setState({enderecoComercial: e.target.value})} 
										>	
									</Form.Input>

									<Form.Input
										fluid
										label='endereço Residencial'
                                        width={6}
										value={this.state.enderecoResidencial}
				onChange={e => this.setState({enderecoResidencial: e.target.value})}
										>
									</Form.Input>			

								</Form.Group>
<Form.Group>
<Form.Input
										fluid
										label='comissão'
                                        width={6}
										value={this.state.comissao}
				onChange={e => this.setState({comissao: e.target.value})}>
										<InputMask 
										mask="9999,99 BRL" /> 
									</Form.Input>

                                    <Form.Input
								required
								label="trabalha HomeOffice?"
								
								>			
									<fieldset value={this.state.trabahoHomeOffice}
									onChange={e => this.setState({trabahoHomeOffice: e.target.value})}	>
									<input type="radio" name = "sn" value={true} /><label>Sim</label>
									<input type="radio" name = "sn" value={false} /><label>Não</label>
									</fieldset>
								</Form.Input>

                                <Form.Input
										fluid
										label='qtdComprasMediasMes'
                                        width={6}
										value={this.state.qtdComprasMediasMes}
				onChange={e => this.setState({qtdComprasMediasMes: e.target.value})}>
									</Form.Input>
                                    
                                    <Form.Input
                                        fluid
                                        label='contratado Em...'
                                        width={6}
										value={this.state.contratadoEm}
				onChange={e => this.setState({contratadoEm: e.target.value})}
                                    >
                                        <InputMask 
                                            mask="99/99/9999" 
                                            maskChar={null}
                                            placeholder="Ex: 20/03/1985"
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
										<Link to={'/list-comprador'}>Voltar</Link>
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

export default FormComprador;