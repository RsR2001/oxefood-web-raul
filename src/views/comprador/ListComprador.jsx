import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';

class ListComprador extends React.Component{

    state = {
 
        listaCompradores: []
       
    }
 
    componentDidMount = () => {
       
        this.carregarLista();
       
    }
    carregarLista = () => {

        axios.get("http://localhost:8080/api/comprador")
        .then((response) => {
           
            this.setState({
                listaCompradores: response.data
            })
        })
 
    };
 
    formatarData = (dataParam) => {
 
        let data = new Date(dataParam);
        let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
        let mes = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
        let dataFormatada = dia + "/" + mes + "/" + data.getFullYear();
       
        return dataFormatada
    };
    render(){
        return(
            <div>
 
                <div style={{marginTop: '3%'}}>
 
                    <Container textAlign='justified' >
 
                        <h2> Comprador </h2>
 
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
                                <Link to={'/form-comprador'}>Novo</Link>
                            </Button>
                            <br/><br/><br/>
                      
                           <Table color='orange' sortable celled>

                               <Table.Header>
                                   <Table.Row>
                                       <Table.HeaderCell>Nome</Table.HeaderCell>
                                       <Table.HeaderCell>enderecoComercial</Table.HeaderCell>
                                       <Table.HeaderCell>enderecoResidencial</Table.HeaderCell>
                                       <Table.HeaderCell>comissao</Table.HeaderCell>
                                       <Table.HeaderCell>trabahoHomeOffice</Table.HeaderCell>
                                       <Table.HeaderCell>qtdComprasMediasMes</Table.HeaderCell>
                                       <Table.HeaderCell>contratadoEm</Table.HeaderCell>
                                       <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                   </Table.Row>
                               </Table.Header>
                          
                               <Table.Body>

                                   { this.state.listaCompradores.map(comprador => (

                                       <Table.Row>
                                           <Table.Cell>{comprador.nome}</Table.Cell>
                                           <Table.Cell>{comprador.enderecoComercial}</Table.Cell>
                                           <Table.Cell>{comprador.enderecoResidencial}</Table.Cell>
                                           <Table.Cell>{comprador.comissao}</Table.Cell>
                                           <Table.Cell>{comprador.trabahoHomeOffice}</Table.Cell>
                                           <Table.Cell>{comprador.qtdComprasMediasMes}</Table.Cell>
                                           <Table.Cell>{this.formatarData(comprador.contratadoEm)}</Table.Cell>
                                           <Table.Cell textAlign='center'>
                                              
                                               <Button
                                                   inverted
                                                   circular
                                                   icon='edit'
                                                   color='blue'
                                                   itle='Clique aqui para editar os dados deste comprador' /> &nbsp;
                                                   <Button
                                                   inverted
                                                   circular
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este comprador' />

                                           </Table.Cell>
                                       </Table.Row>
                                   ))}

                               </Table.Body>
                           </Table>
                       </div>
                   </Container>
               </div>
           </div>
       )
   }
}

export default ListComprador;

 