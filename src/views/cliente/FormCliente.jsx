import axios from "axios";
import React, { default as React, default as React, useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormCliente () {

	const { state } = useLocation();
	const [nome, setNome] = useState();
	const [cpf, setCpf] = useState();
	const [dataNascimento, setDataNascimento] = useState();
	const [foneCelular, setFoneCelular] = useState();
	const [foneFixo, setFoneFixo] = useState();

	useEffect(() => {
		if (state != null && state.id != null) {
			axios.get(ENDERECO_API + "api/cliente/" + state.id)
.then((response) => {
						   setIdCliente(response.data.id)
						   setNome(response.data.nome)
						   setCpf(response.data.cpf)
						   setDataNascimento(response.data.dataNascimento)
						   setFoneCelular(response.data.foneCelular)
						   setFoneFixo(response.data.foneFixo)
			})
		}
}, [state])


function salvar() {

	let clienteRequest = {
		nome: nome,
		cpf: cpf,
		dataNascimento: dataNascimento,
		foneCelular: foneCelular,
		foneFixo: foneFixo
	}
   
	if (idCliente != null) { //Alteração:
		axios.put(ENDERECO_API + "api/cliente/" + idCliente, clienteRequest)
		.then((response) => { console.log('Cliente alterado com sucesso.') })
		.catch((error) => { console.log('Erro ao alter um cliente.') })
	} else { //Cadastro:
		axios.post(ENDERECO_API + "api/cliente", clienteRequest)
		.then((response) => { console.log('Cliente cadastrado com sucesso.') })
		.catch((error) => { console.log('Erro ao incluir o cliente.') })
	}

}




        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										label='Nome'
										maxLength="100"
										value={nome}
			onChange={e =>setState(target.value)}

									/>

									<Form.Input
										fluid
										label='CPF'
										value={cpf}
				onChange={e => setState(target.value)} 
										>
										<InputMask 
										mask="999.999.999-99"/>
										
									</Form.Input>

								</Form.Group>
								
								<Form.Group>

									<Form.Input
										fluid
										label='Fone Celular'
                                        width={6}
										value={foneCelular}
				onChange={e =>setState(target.value)}
										>
										<InputMask 
										mask="(99) 9999.9999" /> 
										
									</Form.Input>

									<Form.Input
										fluid
										label='Fone Fixo'
                                        width={6}
										value={foneFixo}
				onChange={e => setState(target.value)}>
										<InputMask 
										mask="(99) 9999.9999" /> 
									</Form.Input>
                                    <Form.Input
                                        fluid
                                        label='Data Nascimento'
                                        width={6}
										value={dataNascimento}
				onChange={e => setState(target.value)}
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
										<Link to={'/list-cliente'}>Voltar</Link>
									</Button>

									<Container textAlign='right'>
										
									<Button
                                       inverted
                                       circular
                                       icon
                                       labelPosition='left'
                                       color='blue'
                                       floated='right'
                                       onClick={() => salvar()}
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
				<Modal
                   			basic
                   			onClose={() => this.setOpenModal(false)}
                   			onOpen={() => this.setOpenModal(true)}
                   			open={this.state.openModal}
               			>
                   			<Header icon>
                       				<Icon name='trash' />
                       				<div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
                   			</Header>
                   			<Modal.Actions>
                       				<Button basic color='red' inverted onClick={() => this.setOpenModal(false)}>
                       					<Icon name='remove' /> Não
                       				</Button>
                       				<Button color='green' inverted onClick={() => this.remover()}>
                       					<Icon name='checkmark' /> Sim
                       				</Button>
                   			</Modal.Actions>
               			</Modal>

			</div>
		)
	
}

