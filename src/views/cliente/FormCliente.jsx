import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { ENDERECO_API } from '../../views/ultil/Constantes';
import { mensagemErro, notifyError, notifySuccess } from '../../views/ultil/Ultil';

export default function FormCliente() {

	const { state } = useLocation();

	const [idCliente, setIdCliente] = useState();
	const [nome, setNome] = useState();
	const [cpf, setCpf] = useState();
	const [dataNascimento, setDataNascimento] = useState();
	const [foneCelular, setFoneCelular] = useState();
	const [foneFixo, setFoneFixo] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	useEffect(() => {

		if (state != null && state.id != null) {

			axios.get(ENDERECO_API + "api/cliente/" + state.id)
				.then((response) => {
					setIdCliente(response.data.id)
					setNome(response.data.nome)
					setCpf(response.data.cpf)
					setDataNascimento(formatarData(response.data.dataNascimento))
					setFoneCelular(response.data.foneCelular)
					setFoneFixo(response.data.foneFixo)
					setEmail(response.data.email)
				    setPassword(response.data.password)
				})
		}

		
	}, [state])

	function salvar() {

		let clienteRequest = {

			nome: nome,
			cpf: cpf,
			dataNascimento: dataNascimento,
			foneCelular: foneCelular,
			foneFixo: foneFixo,
			email: email,
			password: password

		}

		if (idCliente != null) { //Alteração:

			axios.put(ENDERECO_API + "api/cliente/" + idCliente, clienteRequest)
				.then((response) => { console.log('Cliente alterado com sucesso.') })
				.catch((error) => { console.log('Erro ao alter um cliente.') })

		} else { //Cadastro:

			axios.post(ENDERECO_API + "api/cliente", clienteRequest)
				.then((response) => {
					notifySuccess('Cliente cadastrado com sucesso.')
				})
				.catch((error) => {
					if (error.response) {
						notifyError(error.response.data.errors[0].defaultMessage)
					} else {
						notifyError(mensagemErro)
					}
				})
		}
	}

	function formatarData(dataParam) {

		if (dataParam == null || dataParam == '') {
			return ''
		}

		let dia = dataParam[2];
		let mes = dataParam[1];
		let ano = dataParam[0];
		let dataFormatada = dia + '/' + mes + '/' + ano;

		return dataFormatada
	}

	return (
		<div>


			<div style={{ marginTop: '3%' }}>
				<MenuSistema />
				<Container textAlign='justified' >

					{idCliente === undefined &&
						<h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
					}
					{idCliente != undefined &&
						<h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
					}

					<Divider />

					<div style={{ marginTop: '4%' }}>

						<Form>

							<Form.Group widths='equal'>

								<Form.Input
									required
									fluid
									label='Nome'
									maxLength="100"
									value={nome}
									onChange={e => setNome(e.target.value)}
								/>

								<Form.Input
									fluid
									label='CPF'>
									<InputMask
										mask="999.999.999-99"
										value={cpf}
										onChange={e => setCpf(e.target.value)}
									/>
								</Form.Input>

							</Form.Group>
							<Form.Group>

								<Form.Input
									fluid
									label='Fone Celular'
									width={6}>
									<InputMask
										mask="(99) 9999.9999"
										value={foneCelular}
										onChange={e => setFoneCelular(e.target.value)}
									/>
								</Form.Input>

								<Form.Input
									fluid
									label='Fone Fixo'
									width={6}>
									<InputMask
										mask="(99) 9999.9999"
										value={foneFixo}
										onChange={e => setFoneFixo(e.target.value)}
									/>
								</Form.Input>

								<Form.Input
									fluid
									label='Data Nascimento'
									width={6}
								>
									<InputMask
										mask="99/99/9999"
										maskChar={null}
										placeholder="Ex: 20/03/1985"
										value={dataNascimento}
										onChange={e => setDataNascimento(e.target.value)}
									/>
								</Form.Input>
							</Form.Group>
							
							<Form.Group>
								<Form.Input
									fluid
									label='email'
									width={6}
									placeholder="Ex: ALGUMEMAIL@GMAIL.COM"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								<Form.Input
									fluid
									label='Senha'
									width={6}
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</Form.Group>

							<Form.Group widths='equal' style={{ marginTop: '4%' }} className='form--empresa-salvar'>

								<Button
									type="button"
									inverted
									circular
									icon
									labelPosition='left'
									color='orange'
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
		</div>
	)

}