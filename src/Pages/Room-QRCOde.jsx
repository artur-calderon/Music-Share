import { Button,  Form, Input } from 'antd';
import './RoomQR.css'
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { Layout, theme, Avatar, List, Tooltip } from 'antd';
import {  UnorderedListOutlined }from '@ant-design/icons';
import {io} from 'socket.io-client'
import {PlayerContext} from "../Context/RoomContext.jsx";



function RoomQRCode(){
    const socket = io('http://192.168.2.21:3001');
    const {Search} = Input;
    const {  Content } = Layout;
    const {id} = useParams();
    const { handleSearchMusic,serachLoading,results,getInfoRoom,roomInfo } = useContext(PlayerContext)

    const [isLogin, setLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name:'',
        cpf:''
    })

    useEffect(() => {

        getInfoRoom(id)

    }, [id]);


    async function SendMusics(item){
       await socket.emit('musicAndUserInfo',{
            idRoom: id,
            musicSelectedInfo:item,
            userName:userInfo.name
        })

    }
    const onFinish = (values) => {
        setUserInfo({
            name: values.name,
            cpf: values.cpf,
        })
        socket.emit('joinRoom',{
            idRoom: id,
            userName: values.name,
            userCPF: values.cpf,
        })
        setLogin(true)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function Login(){
        return (
           <Layout>
            <h3>Bem vindo a Sala: {roomInfo.roomSpecs.name}</h3>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Nome"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Digite seu nome',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="CPF"
                name="cpf"
                rules={[
                    {
                        required: true,
                        message: 'Digite seu CPF',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Entrar
                </Button>
            </Form.Item>
        </Form>
   </Layout>
    )
    }

    function Logged(){
        const {
            token: { colorBgContainer, borderRadiusLG },
        } = theme.useToken();
        return(
        <Layout>
            <Content
                style={{
                    margin: '24px 16px 0',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 460,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,

                    }}
                >
                    <h3>Bem vindo a Sala: {roomInfo.roomSpecs.name}</h3>
                    <Search placeholder="Procure sua Música Favorita" enterButton="Pesquisar" loading={serachLoading}
                            size="large" onSearch={handleSearchMusic}/>
                    <br/>
                    <br/>

                    <h1>Resultados</h1>
                    <List
                        pagination={
                            'bottom'
                        }
                        dataSource={results}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        src={item.musicSelectedInfo.imageUrl}/>
                                    }
                                    title={item.musicSelectedInfo.title}
                                    description={item.musicSelectedInfo.description}
                                />

                                <Tooltip title='Adicionar à Playlist' placement='top'>
                                    <UnorderedListOutlined onClick={() => SendMusics(item.musicSelectedInfo)}
                                                           style={{fontSize: '20px'}}/>
                                </Tooltip>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
        </Layout>
        )
    }

    return (
        <div className='container2'>
            {isLogin ? (<Logged></Logged>) : <Login></Login>}
        </div>
    )
}

export default RoomQRCode;
