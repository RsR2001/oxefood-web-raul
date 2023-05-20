import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';


class FormEntregador extends React.Component{
	state = {

		nome: null,
		cpf: null,
		rg: null,
		dataNascimento: null,
		foneCelular: null,
		foneFixo: null,
		qtdEntregasRealizadas: null,
		valorFrete: null,
		enderecoRua: null,
		enderecoNumero: null,
		enderecoBairro: null,
		enderecoCidade: null,
		enderecoCep: null,
		enderecoUf: null,
		enderecoComplemento: null,
		ativo: null

	}
	
	salvar = () => {

		let entregadorRequest = {

			nome: this.state.nome,
			cpf: this.state.cpf,
			rg: this.state.rg,
			dataNascimento: this.state.dataNascimento,
			foneCelular: this.state.foneCelular,
			foneFixo: this.state.foneFixo,
			qtdEntregasRealizadas: this.state.qtdEntregasRealizadas,
			valorFrete: this.state.valorFrete,
			enderecoRua: this.state.enderecoRua,
			enderecoNumero: this.state.enderecoNumero,
			enderecoBairro: this.state.enderecoBairro,
			enderecoCidade: this.state.enderecoCidade,
			enderecoCep: this.state.enderecoCep,
			enderecoUf: this.state.enderecoUf,
			enderecoComplemento: this.state.enderecoComplemento,
			ativo: this.state.ativo
		}
	
		axios.post("http://localhost:8080/api/entregador", entregadorRequest)
		.then((response) => {
			console.log('Entregador cadastrado com sucesso.')
		})
		.catch((error) => {
			console.log('Erro ao incluir o um entregador.')
		})
	}



    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

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

									<Form.Input
										fluid
										label='CPF'>	
										<InputMask 
										placeholder="xxx.xxx.xxx-xx"
										mask="999.999.999-99" 
										value={this.state.cpf}
										onChange={e => this.setState({cpf: e.target.value})}
										/> 
										
									</Form.Input>

                                    <Form.Input
										fluid
										label='Rg'>
										<InputMask 
										placeholder="x.xxx.xxx"
										mask="9.999.999" 
										value={this.state.rg}
										onChange={e => this.setState({rg: e.target.value})}/> 
										
									</Form.Input>
								</Form.Group>
								
								<Form.Group widths='equal'>

                                <Form.Input
                                        fluid
                                        label='Data Nascimento'
                                        width={6}
                                    >
                                        <InputMask 
                                            mask="99/99/9999" 
                                            maskChar={null}
                                            placeholder="Ex: 20/03/1985"
											value={this.state.dataNascimento}
											onChange={e => this.setState({dataNascimento: e.target.value})}
                                        /> 
                                    </Form.Input>

									<Form.Input
										fluid
										label='Fone Celular'
                                        width={6}
										>
										<InputMask 
										placeholder='(xx)xxxx-xxxx'
										mask="(99)99999-9999" 
										value={this.state.foneCelular}
										onChange={e => this.setState({foneCelular: e.target.value})}/> 
									</Form.Input>

									<Form.Input
										fluid
										label='Fone Fixo'
                                        width={6}>
										<InputMask 
										placeholder='(xx)xxxx-xxxx'
										mask="(99)99999-9999" 
										value={this.state.foneFixo}
										onChange={e => this.setState({foneFixo: e.target.value})}/> 
									</Form.Input>

                                    <Form.Input
										fluid
										label='Qntd entregas realizadas'
                                        width={4}>
										<InputMask 
										value={this.state.qtdEntregasRealizadas}
										onChange={e => this.setState({qtdEntregasRealizadas: e.target.value})}/> 
									</Form.Input>

                                    <Form.Input
										fluid
										label='Valor por frete'
                                        width={4}>
										<InputMask 
										mask="99.99" 
										value={this.state.valorFrete}
										onChange={e => this.setState({valorFrete: e.target.value})}/> 
									</Form.Input>

								</Form.Group>
                               
                                <Form.Group widths='equal'>
                                    <Form.Input
										required
										fluid
										label='Rua'
                                        width={13}
										maxLength="100"
										value={this.state.enderecoRua}
										onChange={e => this.setState({enderecoRua: e.target.value})}
									/>
                                <Form.Input
										required
										fluid
										label='Numero'
                                        width={3}>
										<InputMask  
										value={this.state.enderecoNumero}
										onChange={e => this.setState({enderecoNumero: e.target.value})}/> 
									</Form.Input>
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
										required
										fluid
										label='Bairro'
                                        width={7}
										maxLength="100"
										value={this.state.enderecoBairro}
										onChange={e => this.setState({enderecoBairro: e.target.value})}
										/>
                                	<Form.Input
										required
										fluid
										label='Cidade'
                                        width={7}
										value={this.state.enderecoCidade}
										onChange={e => this.setState({enderecoCidade: e.target.value})}
										/>
										
									

                                    <Form.Input
										fluid
										label='Cep'
                                        width={2}>
										<InputMask 
										mask="99999-999" 
										value={this.state.enderecoCep}
										onChange={e => this.setState({enderecoCep: e.target.value})}/> 
								    </Form.Input>
                                	</Form.Group>

									<Form.Input  label="Uf" 
								  		  	multiple=""
											>
								 	 <select 
									 	value={this.state.enderecoUf}
										onChange={e => this.setState({enderecoUf: e.target.value})}
										>
										<option value="" disabled selected hidden>Selecione</option>	
										<option value="AC">Acre</option>
										<option value="AL">Alagoas</option>
										<option value="AP">Amapá</option>
										<option value="AM">Amazonas</option>
										<option value="BA">Bahia</option>
										<option value="CE">Ceará</option>
										<option value="DF">Distrito Federal</option>
										<option value="ES">Espírito Santo</option>
										<option value="GO">Goiás</option>
										<option value="MA">Maranhão</option>
										<option value="MT">Mato Grosso</option>
										<option value="MS">Mato Grosso do Sul</option>
										<option value="MG">Minas Gerais</option>
										<option value="PA">Pará</option>
										<option value="PB">Paraíba</option>
										<option value="PR">Paraná</option>
										<option value="PE">Pernambuco</option>
										<option value="PI">Piauí</option>
										<option value="RJ">Rio de Janeiro</option>
										<option value="RN">Rio Grande do Norte</option>
										<option value="RS">Rio Grande do Sul</option>
										<option value="RO">Rondônia</option>
										<option value="RR">Roraima</option>
										<option value="SC">Santa Catarina</option>
										<option value="SP">São Paulo</option>
										<option value="SE">Sergipe</option>
										<option value="TO">Tocantins</option>
									</select>


									</Form.Input>	
								
								<Form.Input
										fluid
										label='Uf'
                                        width={16}>
										<InputMask 
										placeholder="Insira seu estado" 
										value={this.state.enderecoUf}
										
										/> 
								</Form.Input>
                                


								<Form.Group >
                                    <Form.Input
										fluid
										label='Complemento'
                                        width={16}
										value={this.state.enderecoComplemento}
										onChange={e => this.setState({enderecoComplemento: e.target.value})}>
									</Form.Input>
                                </Form.Group>
								
								<Form.Input
								required
								label="Ativo?"
								
								>			
									<fieldset value={this.state.ativo}
									onChange={e => this.setState({ativo: e.target.value})}	>
									<input type="radio" name = "sn" value={true} /><label>Sim</label>
									<input type="radio" name = "sn" value={false} /><label>Não</label>
									</fieldset>
								</Form.Input>		
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
										<Link to={'/list-entregador'}>Voltar</Link>
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
											salvar
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

export default  FormEntregador;
