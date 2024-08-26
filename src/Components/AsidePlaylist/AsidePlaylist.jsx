import {Avatar, ConfigProvider, Layout, List, Tooltip,} from 'antd';
import {DeleteOutlined, PlayCircleOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {PlayerContext} from "../../Context/RoomContext.jsx";


function AsidePlaylist(){
const {playlist, playMusic,setPlaylist,setMusicPlaying} = useContext(PlayerContext)
const {Content} = Layout

console.log(playlist)

    function removeMusicFromPlaylist(music){
        const findMusicToRemove = playlist.find(musica => musica.musicUrl === music)
        const removeMusic = playlist.filter(musicaToRemove => {
           return musicaToRemove !== findMusicToRemove
        })
        setPlaylist(removeMusic)

    }
    return(
        <ConfigProvider theme={{
            components:{
                Layout: {
                    colorBgLayout:'White',

                }
            }
        }
        }>
            <Layout style={{padding:'20px'}}>
                <Content
                    style={{height:'auto'}}
                >

            <h1>Playlist</h1>
                    {playlist.length > 0 ? (
                        <List
                            pagination={'bottom'}
                            itemLayout='vertical'
                            size='large'
                            dataSource={playlist}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Tooltip title='Tocar agora' placement='top' key='play'>
                                            <PlayCircleOutlined onClick={() => {setMusicPlaying(item.musicSelectedInfo.musicUrl); playMusic(item)}}
                                                                style={{fontSize: '20px', marginRight: '20px'}}/>
                                        </Tooltip>,
                                        <Tooltip title='Remover da Playlist' placement='top' key='add-to-playlist'>
                                            <DeleteOutlined  onClick={() => removeMusicFromPlaylist(item.musicUrl)}
                                                             style={{fontSize: '20px'}}/>
                                        </Tooltip>
                                    ]}
                                    extra={
                                        <img
                                            width={150}
                                            alt="logo"
                                            src={item.musicSelectedInfo.imageUrl}
                                        />
                                    }>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            src='https://cdn-icons-png.flaticon.com/512/149/149071.png'/>
                                        }
                                        title={item.musicSelectedInfo.title}
                                        description={'Enviado por: ' + item.userName}
                                    />

                                </List.Item>
                            )}
                        />
                    ): (<List></List>)}

                </Content>
            </Layout>


        </ConfigProvider>
    )
}
export default AsidePlaylist;