import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';

class ListEntregador extends React.Component{

    state = {
 
        listaEntregadores: []
    }
 
    componentDidMount = () => {
       
        this.carregarLista();
       
    }
    carregarLista = () => {

        axios.get("http://localhost:8080/api/entregador")
        .then((response) => {
           
            this.setState({
                listaEntregadores: response.data
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
 
                        <h2> Entregadores </h2>
 
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
                      
                           <Table color='orange' sortable celled style={{marginLeft:'-50%'}}>

                               <Table.Header>
                                   <Table.Row>
                                       <Table.HeaderCell>Nome</Table.HeaderCell>
                                       <Table.HeaderCell>CPF</Table.HeaderCell>
                                       <Table.HeaderCell>Rg</Table.HeaderCell>
                                       <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                       <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                       <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                       <Table.HeaderCell>Qtd. Entregas Realizadas</Table.HeaderCell>
                                       <Table.HeaderCell>Valor de Frete</Table.HeaderCell>
                                       <Table.HeaderCell>Endereço Rua</Table.HeaderCell>
                                       <Table.HeaderCell>Endereço Número</Table.HeaderCell>
                                       <Table.HeaderCell>Endereço Bairro</Table.HeaderCell>
                                       <Table.HeaderCell>Endereço Cidade</Table.HeaderCell>
                                       <Table.HeaderCell>Endereço Cep</Table.HeaderCell>
                                       <Table.HeaderCell>Endereço Uf</Table.HeaderCell>
                                       <Table.HeaderCell>Endereço Complemento</Table.HeaderCell>
                                       <Table.HeaderCell>ativo</Table.HeaderCell>
                                       <Table.HeaderCell textAlign='center' width={2} style={{paddingRight:'40px', paddingLeft:'40px'}}>Ações</Table.HeaderCell>                                   </Table.Row>
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
                                                   icon='edit'
                                                   color='blue'
                                                   itle='Clique aqui para editar os dados deste Entregador' /> &nbsp;
                                                   <Button
                                                   inverted
                                                   circular
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este Entregador' />
                                                  <Button
                                                   inverted
                                                   circular
                                                   icon='eye'
                                                   color='yellow'
                                                   title='Clique aqui para remover este Entregador' />
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

export default ListEntregador;

 