import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../ultil/Constantes';

class ListEntregador extends React.Component{

   state = {

       listaEntregadores: [],
       openModal: false,
       idRemover: null
    }

   componentDidMount = () => {
      
       this.carregarLista();
      
    }
   carregarLista = () => {

    axios.get(ENDERECO_API + "api/entregador")
    .then((response) => {
       
        this.setState({
            listaEntregadores: response.data
            })
        })

    };

    formatarData = (dataParam) => {

       let dataFormatada = dataParam

        return dataFormatada
    };

    confirmaRemover = (id) => {

        this.setState({
            openModal: true,
            idRemover: id
             })  
        }
        
        remover = async () => {

            await axios.delete(ENDERECO_API + 'api/entregador/' + this.state.idRemover)
            .then((response) => {
       
                this.setState({ openModal: false })
                console.log('Entregador removido com sucesso.')
       
                axios.get(ENDERECO_API + "api/entregador")
                .then((response) => {
               
                    this.setState({
                        listaEntregadores: response.data
                    })
                })
            })
            .catch((error) => {
                this.setState({  openModal: false })
                console.log('Erro ao remover um entregador.')
            })
     };
     

        setOpenModal = (val) => {

            this.setState({
                openModal: val
            })
       
        };
     

render(){
    return(
        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>
        
                        <Button
                            inverted
                            circular
                            icon
                            labelPosition='left'
                            color='orange'
                            floated='right'
                        >
                            <Icon name='clipboard outline' />
                            <Link to={'/form-entregador'}>Novo</Link>
                        </Button>
                        <br/><br/><br/>
                      
                        <Table color='orange' sortable celled style={{marginLeft:'-20%'}}>

                            <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell>Nome</Table.HeaderCell>
                                  <Table.HeaderCell>CPF</Table.HeaderCell>
                                  <Table.HeaderCell>Rg</Table.HeaderCell>
                                  <Table.HeaderCell>Data Nascimento</Table.HeaderCell>
                                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                  <Table.HeaderCell>Entregas Realizadas</Table.HeaderCell>
                                  <Table.HeaderCell>Valor Por Frete</Table.HeaderCell>
                                  <Table.HeaderCell>Rua</Table.HeaderCell>
                                  <Table.HeaderCell>Numero</Table.HeaderCell>
                                  <Table.HeaderCell>Bairro</Table.HeaderCell>
                                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                                  <Table.HeaderCell>Cep</Table.HeaderCell>
                                  <Table.HeaderCell>Uf</Table.HeaderCell>
                                  <Table.HeaderCell>Complemento</Table.HeaderCell>
                                  <Table.HeaderCell>Ativo</Table.HeaderCell>
                                  
                                  
                                  <Table.HeaderCell textAlign='center' width={3} style={{paddingRight:'40px', paddingLeft:'40px'}}>Ações</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                     
                            <Table.Body>

                             { this.state.listaEntregadores.map(entregador => (

                                <Table.Row>
                                    <Table.Cell>{entregador.nome}</Table.Cell>
                                    <Table.Cell>{entregador.cpf}</Table.Cell>
                                    <Table.Cell>{entregador.rg}</Table.Cell>
                                    <Table.Cell>{this.formatarData(entregador.dataNascimento)}</Table.Cell>
                                    <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                    <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                    <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                    <Table.Cell>{entregador.valorFrete}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoRua}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoNumero}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoBairro}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoCidade}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoCep}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoUf}</Table.Cell>
                                    <Table.Cell>{entregador.enderecoComplemento}</Table.Cell>
                                    <Table.Cell>{entregador.ativo}</Table.Cell>
                                      

                                    <Table.Cell textAlign='center'>
                                    
                                    <Button
                                            inverted
                                            circular
                                            icon ="eye icon"
                                            color='pink'
                                            title='Visualizar entregadores' /> &nbsp;
                                        <Button
                                        inverted
                                        circular
                                        color='green'
                                        title='Clique aqui para editar os dados deste entregador'
                                        icon>
                                            <Link to="/form-entregador" state={{id: entregador.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                                    </Button> &nbsp;
                                    <Button
                                                   inverted
                                                   circular
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este cliente' 
                                                    onClick={e => this.confirmaRemover(entregador.id)}>
                                                        <Icon name='trash' />
                                                    </Button>
                                        </Table.Cell>
                                </Table.Row>
                            ))}
                            </Table.Body>
                        </Table>
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
}

export default ListEntregador;