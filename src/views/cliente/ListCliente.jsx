import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { ENDERECO_API } from '../ultil/Constantes';

class ListCliente extends React.Component {

    state = {

        listaClientes: [],
        openModal: false,
        idRemover: null

    }

    componentDidMount = () => {

        this.carregarLista();

    }
    carregarLista = () => {

        axios.get(ENDERECO_API + "api/cliente")
            .then((response) => {

                this.setState({
                    listaClientes: response.data
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

        await axios.delete(ENDERECO_API + 'api/cliente/' + this.state.idRemover)
            .then((response) => {

                this.setState({ openModal: false })
                console.log('Cliente removido com sucesso.')

                axios.get(ENDERECO_API + "api/cliente")
                    .then((response) => {

                        this.setState({
                            listaClientes: response.data
                        })
                    })
            })
            .catch((error) => {
                this.setState({ openModal: false })
                console.log('Erro ao remover um cliente.')
            })
    };


    setOpenModal = (val) => {

        this.setState({
            openModal: val
        })

    };

    render() {
        return (
            <div>

                <div style={{ marginTop: '3%' }}>
                <MenuSistema />
                    <Container textAlign='justified' >

                        <h2> Cliente </h2>

                        <Divider />

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                floated='right'
                            >
                                <Icon name='clipboard outline' />
                                <Link to={'/form-cliente'}>Novo</Link>
                            </Button>
                            <br /><br /><br />

                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Nome</Table.HeaderCell>
                                        <Table.HeaderCell>CPF</Table.HeaderCell>
                                        <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                        <Table.HeaderCell>Rua</Table.HeaderCell>
                                        <Table.HeaderCell>Número</Table.HeaderCell>
                                        <Table.HeaderCell>Bairro</Table.HeaderCell>
                                        <Table.HeaderCell>CEP</Table.HeaderCell>
                                        <Table.HeaderCell>Cidade</Table.HeaderCell>
                                        <Table.HeaderCell>Estado</Table.HeaderCell>
                                        <Table.HeaderCell>Complemento</Table.HeaderCell>   
                                        <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>

                                    {this.state.listaClientes.map(cliente => (

                                        <Table.Row>
                                            <Table.Cell>{cliente.nome}</Table.Cell>
                                            <Table.Cell>{cliente.cpf}</Table.Cell>
                                            <Table.Cell>{this.formatarData(cliente.dataNascimento)}</Table.Cell>
                                            <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                            <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                            <Table.Cell>{cliente.endereco.rua}</Table.Cell>
                                            <Table.Cell>{cliente.endereco.numero}</Table.Cell>
                                            <Table.Cell>{cliente.endereco.bairro}</Table.Cell>
                                            <Table.Cell>{cliente.endereco.cep}</Table.Cell>
                                            <Table.Cell>{cliente.endereco.cidade}</Table.Cell>
                                            <Table.Cell>{cliente.endereco.estado}</Table.Cell>
                                            <Table.Cell>{cliente.endereco.complemento}</Table.Cell>
                                            <Table.Cell textAlign='center'>

                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste cliente'
                                                    icon>
                                                    <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    icon='trash'
                                                    color='red'
                                                    title='Clique aqui para remover este cliente'
                                                    onClick={e => this.confirmaRemover(cliente.id)}>
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
                        <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
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

export default ListCliente;