import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { ENDERECO_API } from "../ultil/Constantes";

export default function FormComprador() {

	const { state } = useLocation();

	const [idComprador, setIdComprador] = useState();
	const [nome, setNome] = useState();
	const [enderecoComercial, setEnderecoComercial] = useState();
	const [enderecoResidencial, setEnderecoResidencial] = useState();
	const [comissao, setComissao] = useState();
	const [trabahoHomeOffice, setTrabahoHomeOffice] = useState();
	const [qtdComprasMediasMes, setQtdComprasMediasMes] = useState();
	const [contratadoEm, setContratadoEm] = useState();
	useEffect(() => {

		if (state != null && state.id != null) {

			axios.get(ENDERECO_API + "api/comprador/" + state.id)
				.then((response) => {
					setIdComprador(response.data.id)
					setNome(response.data.nome)
					setEnderecoComercial(response.data.enderecoComercial)
					setContratadoEm(formatarData(response.data.contradatoEm))
					setEnderecoResidencial(response.data.enderecoResidencial)
					setComissao(response.data.comissao)
					setTrabahoHomeOffice(response.data.trabahoHomeOffice)
					setQtdComprasMediasMes(response.data.qtdComprasMediasMes)
				})
		}
	}, [state])



	function salvar() {

		let compradorRequest = {

			nome: nome,
			enderecoComercial: enderecoComercial,
			enderecoResidencial: enderecoResidencial,
			comissao: comissao,
			trabahoHomeOffice: trabahoHomeOffice,
			qtdComprasMediasMes: qtdComprasMediasMes,
			contratadoEm: contratadoEm
		}
		if (idComprador != null) { //Alteração:

			axios.put(ENDERECO_API + "api/comprador/" + idComprador, compradorRequest)
				.then((response) => { console.log('Comprador alterado com sucesso.') })
				.catch((error) => { console.log('Erro ao alter um comprador.') })

		} else { //Cadastro:

			axios.post(ENDERECO_API + "api/comprador", compradorRequest)
				.then((response) => { console.log('Comprador cadastrado com sucesso.') })
				.catch((error) => { console.log('Erro ao incluir o comprador.') })
		}
	}
	function formatarData(dataParam) {

		if (dataParam == null || dataParam == '') {
			return ''
		}

		let dia = dataParam.substr(8, 2);
		let mes = dataParam.substr(5, 2);
		let ano = dataParam.substr(0, 4);
		let dataFormatada = dia + '/' + mes + '/' + ano;

		return dataFormatada
	}

	return (
		<div>

			<div style={{ marginTop: '3%' }}>

				<Container textAlign='justified' >

					<h2> <span style={{ color: 'darkgray' }}> Comprador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

					<Divider />

					<div style={{ marginTop: '4%' }}>

						<Form>

							<Form.Group widths='equal'>

								<Form.Input
									required
									fluid
									label='Nome'
									width={16}
									maxLength="50"
									value={nome}
									onChange={e => setNome(e.target.value)}
								/>

								<Form.Input
									fluid
									width={8}
									label='Valor de comissão'
									value={comissao}
									onChange={e => setComissao(e.target.value)} />

								<Form.Input
									fluid
									width={8}
									label='QTD Compras em Média no mês'
									value={qtdComprasMediasMes}
									onChange={e => setQtdComprasMediasMes(e.target.value)} />

								<Form.Input
									fluid
									label='Contratado Em'
									width={8}
								>
									<InputMask
										mask="99/99/9999"
										maskChar={null}
										placeholder="Ex: 20/03/1985"
										value={contratadoEm}
										onChange={e => setContratadoEm(e.target.value)}>
									</InputMask>
								</Form.Input>


							</Form.Group>

							<Form.Group>

								<Form.Input
									fluid
									label='Endereço Residencial'
									width={16}
									value={enderecoResidencial}
									onChange={e => setEnderecoComercial(e.target.value)} />
							</Form.Group>

							<Form.Group>

								<Form.Input
									fluid
									label='Endereço Comercial'
									width={16}
									value={enderecoComercial}
									onChange={e => setEnderecoComercial(e.target.value)} />


							</Form.Group>

							<Form.Group inline>


								<Form.Input
									required
									label="Trabalha em Home Office:"

								>
									<fieldset value={trabahoHomeOffice}
										onChange={e => setTrabahoHomeOffice(e.target.value)}	>
										<input type="radio" name="sn" value={true} /><label>Sim</label>
										<input type="radio" name="sn" value={false} /><label>Não</label>
									</fieldset>
								</Form.Input>

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