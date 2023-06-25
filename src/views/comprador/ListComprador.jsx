import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../ultil/Constantes';

class ListComprador extends React.Component {

    state = {

        listaCompradores: [],
        openModal: false,
        idRemover: null

    }

    componentDidMount = () => {

        this.carregarLista();

    }
    carregarLista = () => {

        axios.get(ENDERECO_API + "api/comprador")
            .then((response) => {

                this.setState({
                    listaCompradores: response.data
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

        await axios.delete(ENDERECO_API + 'api/comprador/' + this.state.idRemover)
            .then((response) => {

                this.setState({ openModal: false })
                console.log('Comprador removido com sucesso.')

                axios.get(ENDERECO_API + "api/comprador")
                    .then((response) => {

                        this.setState({
                            listaCompradores: response.data
                        })
                    })
            })
            .catch((error) => {
                this.setState({ openModal: false })
                console.log('Erro ao remover um comprador.')
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

                    <Container textAlign='justified' >

                        <h2> Comprador </h2>

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
                                <Link to={'/form-comprador'}>Novo</Link>
                            </Button>
                            <br /><br /><br />

                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Nome</Table.HeaderCell>
                                        <Table.HeaderCell>Endereco Comercial</Table.HeaderCell>
                                        <Table.HeaderCell>Endereco Residencial</Table.HeaderCell>
                                        <Table.HeaderCell>Comissão</Table.HeaderCell>
                                        <Table.HeaderCell>Trabalho Home Office</Table.HeaderCell>
                                        <Table.HeaderCell>Quantidade compras medias mês</Table.HeaderCell>
                                        <Table.HeaderCell>Contratado Em</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>

                                    {this.state.listaCompradores.map(comprador => (

                                        <Table.Row>
                                            <Table.Cell>{comprador.nome}</Table.Cell>
                                            <Table.Cell>{comprador.enderecoComercial}</Table.Cell>
                                            <Table.Cell>{comprador.enderecoResidencial}</Table.Cell>
                                            <Table.Cell>{comprador.comissao}</Table.Cell>
                                            <Table.Cell>{comprador.trabalhoHomeOffice}</Table.Cell>
                                            <Table.Cell>{comprador.qtdComprasMediasMes}</Table.Cell>
                                            <Table.Cell>{this.formatarData(comprador.contratadoEm)}</Table.Cell>
                                            <Table.Cell textAlign='center'>

                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste comprador'
                                                    icon>
                                                    <Link to="/form-comprador" state={{ id: comprador.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;
                                                <Button
                                                    inverted
                                                    circular
                                                    icon='trash'
                                                    color='red'
                                                    title='Clique aqui pararemover este comprador'
                                                    onClick={e => this.confirmaRemover(comprador.id)}>
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

export default ListComprador;