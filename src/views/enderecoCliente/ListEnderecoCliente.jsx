import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { ENDERECO_API } from '../../views/ultil/Constantes';

export default function ListEnderecoCliente() {

    const [lista, setLista] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    useEffect(() => {

        carregarLista();

    }, [])

    function carregarLista() {

        axios.get(ENDERECO_API + "api/enderecocliente/")
            .then((response) => {
                setLista(response.data)
            })

    }

    function confirmaRemover(id) {

        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete(ENDERECO_API + 'api/enderecocliente/' + idRemover)
            .then((response) => {

                setOpenModal(false)
                console.log('Endereço do cliente removido com sucesso.')

                axios.get(ENDERECO_API + "api/enderecocliente/")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                setOpenModal(false)
                console.log('Erro ao remover um Endereço do cliente.')
            })
    };

    return (
        <div>

            <div style={{ marginTop: '3%' }}>
            <MenuSistema />
                <Container textAlign='justified' >

                    <h2> Endereço do cliente</h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-endereco-cliente'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>rua</Table.HeaderCell>
                                    <Table.HeaderCell>numero</Table.HeaderCell>
                                    <Table.HeaderCell>bairro</Table.HeaderCell>
                                    <Table.HeaderCell>cep</Table.HeaderCell>
                                    <Table.HeaderCell>cidade</Table.HeaderCell>
                                    <Table.HeaderCell>estado</Table.HeaderCell>
                                    <Table.HeaderCell>complemento</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista !== undefined && lista.map(ec => (

                                    <Table.Row key={ec.id}>
                                        <Table.Cell>{ec.rua}</Table.Cell>
                                        <Table.Cell>{ec.numero}</Table.Cell>
                                        <Table.Cell>{ec.bairro}</Table.Cell>
                                        <Table.Cell>{ec.cep}</Table.Cell>
                                        <Table.Cell>{ec.cidade}</Table.Cell>
                                        <Table.Cell>{ec.estado}</Table.Cell>
                                        <Table.Cell>{ec.complemento}</Table.Cell>


                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste endereço do cliente'
                                                icon>
                                                <Link to="/form-endereco-cliente" state={{ id: ec.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este endereço do cliente'
                                                icon
                                                onClick={e => confirmaRemover(ec.id)}>
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
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}