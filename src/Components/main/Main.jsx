import {Container, Player, PlayerStopped,} from "./Styles/Main.js";
import ReactPlayer from 'react-player/youtube'
import {useContext} from "react";
import { Layout, theme, Avatar, List, Tooltip, Input } from 'antd';
import { PlayCircleOutlined, UnorderedListOutlined }from '@ant-design/icons';

import {useParams} from "react-router-dom";
import {io} from "socket.io-client";
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
import {PlayerContext} from "../../Context/RoomContext.jsx";

function Main(){

    const socket = io('http://192.168.2.21:3001');
    const {id} = useParams();

    const {Search} = Input;
    const {  Content } = Layout;
    const {playlist, musicPlaying,setMusicPlaying, currentMusicPlaying, setCurrentMusicPlaying, roomInfo,playMusic,handleSearchMusic,serachLoading,results,addMusicToPlaylist} = useContext(PlayerContext)

   async function SendMusics(item){
       await socket.emit('musicAndUserInfo',{
            idRoom: id,
            musicSelectedInfo:item,
            userName: 'Admin',
            userCPF: ' ',
        })

    }


    function handleNextSong(){

        // Se houver músicas na playlist 
        if (playlist.length > 0) {
            playlist.forEach((music, index) =>{
                if(music === currentMusicPlaying){
                    const nextSong = index + 1
                    setCurrentMusicPlaying(playlist[nextSong])
                    if(nextSong === index){
                        setCurrentMusicPlaying('')
                    }
                }
            })

        } else {
            console.log("Playlist vazia");
            setCurrentMusicPlaying('') // Define currentPlaying como null se a playlist estiver vazia
        }
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return(
        <Container>

            <Layout>

                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,


                        }}
                    >
                        <h1>{roomInfo ? roomInfo.roomSpecs.name : ' '}</h1>
                        {
                           currentMusicPlaying.length > 0 ? (
                               currentMusicPlaying.map((music) =>{
                                  if(music.musicURL === musicPlaying){
                                       return (<Alert
                                           banner
                                           type="info"
                                           key={music.musicURL}
                                           message={
                                               <Marquee pauseOnHover gradient={false}>
                                                   <b>Tocando agora: </b> {music.musicSelected}
                                                   <b>Enviado por: </b>{music.userName}
                                               </Marquee>
                                           }
                                       />)
                                   }
                               })
                           ):null
                        }

                        <Player>
                            {musicPlaying ? (
                                < ReactPlayer
                                    url={musicPlaying}
                                    controls={true}
                                    width='auto'
                                    height='36rem'
                                    playing={true}
                                    onEnded={handleNextSong}
                                >
                                < /ReactPlayer>

                            ) : (<PlayerStopped>
                            </PlayerStopped>)
                            }
                        </Player>
                    </div>
                </Content>

                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >

                        <Search placeholder="Procure sua Música Favorita" enterButton="Pesquisar" loading={serachLoading} size="large"  onSearch={handleSearchMusic} />
                        <br/>
                        <br/>

                        <h1>Playlist</h1>
                        <List
                            pagination={
                                'bottom'
                            }
                            itemLayout='vertical'
                            size='large'
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
                                    <Tooltip title='Tocar agora' placement='top'>
                                        <PlayCircleOutlined onClick={() => {setMusicPlaying(item.musicSelectedInfo.musicUrl); playMusic(item)}}
                                                            style={{fontSize: '20px', marginRight: '20px'}}/>
                                    </Tooltip>
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
            

        </Container>
    )
}

export default Main;