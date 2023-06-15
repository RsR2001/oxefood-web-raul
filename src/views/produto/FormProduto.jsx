import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { ENDERECO_API } from "../ultil/Constantes";

export default function FormProduto() {
	
	const { state } = useLocation();

	const [idProduto, setIdProduto] = useState();
	const [codigo, setCodigo] = useState();
	const [titulo, setTitulo] = useState();
	const [descricao, setDescricao] = useState();
	const [valorUnitario, setValorUnitario] = useState();
	const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
	const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

	useEffect(() => {

		if (state != null && state.id != null) {
			
			axios.get(ENDERECO_API + "api/produto/" + state.id)
			.then((response) => {
				setIdProduto(response.data.id)
				setCodigo(response.data.codigo)
				setTitulo(response.data.titulo)
				setDescricao(response.data.descricao)
				setValorUnitario(response.data.valorUnitario)
				setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
				setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
			})
		}
			}, [state])

	function salvar()  {

		let produtoRequest = {

				codigo: codigo,
				titulo: titulo,
				descricao: descricao,
				valorUnitario: valorUnitario,
				tempoEntregaMinimo: tempoEntregaMinimo,
				tempoEntregaMaximo: tempoEntregaMaximo
				
			}
		
		if (idProduto != null) { //Alteração:

			axios.put(ENDERECO_API + "api/produto/" + idProduto, produtoRequest)
			.then((response) => { console.log('Entregador alterado com sucesso.') })
			.catch((error) => { console.log('Erro ao alter um Entregador.') })

		} else { //Cadastro:

			axios.post(ENDERECO_API + "api/produto", produtoRequest)
			.then((response) => { console.log('Entregador cadastrado com sucesso.') })
			.catch((error) => { console.log('Erro ao incluir o Entregador.') })
		}
	}
	

    
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
										label='Titulo'
										maxLength="100"
                                        placeholder="Informe o Titulo do Produto"
										value={titulo}
										onChange={e => setTitulo( e.target.value)}
									/>

									<Form.Input
										required
                                        fluid
										label='Código do produto'
                                        placeholder="Informe o Titulo do Produto"
										value={codigo}
										onChange={e => setCodigo(e.target.value)}
                                        >
                                        
									
									</Form.Input>
                                        
								</Form.Group>
								
                                <Form.Group
										label='Código do produto'
                        					>
                                        
                                        <Form.TextArea label ="Descrição"
										 
										
										placeholder='Informe a Descrição do produto' 
                                        width={16}
										value={descricao}
										onChange={e => setDescricao(e.target.value)}/>
										
									</Form.Group>
                            
								<Form.Group>

									<Form.Input
										fluid
										label='Valor Unitário'
                                        width={4}>
										<InputMask 
										mask="99.99" 
										value={valorUnitario}
										onChange={e => setValorUnitario(e.target.value)}/> 
									</Form.Input>

									<Form.Input
										fluid
										label='Tempo de Entrega Minimo em minutos'
                                        width={9}>
										<InputMask 
										mask="99" 
										value={tempoEntregaMinimo}
										onChange={e => setTempoEntregaMinimo( e.target.value)}/> 
									</Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Tempo de Entrega Minimo em minutos'
                                        width={6}
                                    >
                                        <InputMask 
                                            mask="99"
											value={tempoEntregaMaximo}
											onChange={e => setTempoEntregaMaximo(e.target.value)} 
                                            
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
										
										>
										<Icon name='reply' />
										<Link to={'/list-produto'}>Voltar</Link>
										
									</Button>

									<Container textAlign='right'>
										
										<Button
											inverted
											circular
											icon
											labelPosition='left'
											color='blue'
											floated='right'
											onClick={() =>salvar()}
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

