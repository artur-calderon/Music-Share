import {createContext, useState} from "react";
import axios from "axios";

export const PlayerContext = createContext({})

export const PlayerContextProvider = ({children}) => {
    const [results, setResults] = useState([])
    const [serachLoading, setSearchLoading] = useState(false)
    const [musicPlaying, setMusicPlaying] = useState('')
    // const [userInfo, setUserInfo] = useState({})
    const [roomInfo, setRoomInfo] = useState({
        roomSpecs:{
            autor:" ",
            genero:" ",
            name:" "
        }
    });
    //Context
    const [currentMusicPlaying, setCurrentMusicPlaying] = useState([])
    const [playlist, setPlaylist] = useState([])
    //Context

    function addMusicToPlaylist(music){
        console.log(music.musicSelectedInfo.musicUrl)
        const musicDuplicated = playlist.find((musi) =>  {return musi.musicSelectedInfo.musicUrl})
        console.log(musicDuplicated)

        if(musicDuplicated){
            return
        }else{
            setPlaylist(prevState => [...prevState,music])
        }
    }


    async function getInfoRoom(id) {
        await axios.get(`http://192.168.2.21:3001/insideRoom/${id}`

        ).then(function (res) {
            setRoomInfo(res.data)

        })
    }

    function playMusic(music){
        // setCurrentMusicPlaying(music)
        console.log(music)
        setCurrentMusicPlaying([
            ...currentMusicPlaying, {
                userName: music.userName,
                musicSelected: music.musicSelectedInfo.title,
                musicURL:music.musicSelectedInfo.musicUrl
            }
        ])
    }

    async function  handleSearchMusic(text){
        setSearchLoading(true)
        setResults([])
        try {
            await axios.post('http://localhost:3001/searchMusic', {
                "search": text
            }).then((res) => {
                const newResults = res.data.map(itens => ({
                    musicSelectedInfo: {
                        musicUrl: `https://www.youtube.com/watch?v=${itens.id.videoId}`,
                        title: itens.snippet.title,
                        imageUrl: itens.snippet.thumbnails.medium.url,
                        description: itens.snippet.description
                    }
                }));
                setResults(prevState => [...prevState, ...newResults]);
                setSearchLoading(false)
            })

        }catch (e){
            console.log(e)
        }
    }



    return(
        <PlayerContext.Provider value={{getInfoRoom,roomInfo,playlist, musicPlaying,setMusicPlaying, currentMusicPlaying, setCurrentMusicPlaying,playMusic,handleSearchMusic,serachLoading,results,addMusicToPlaylist ,setPlaylist}}>
            {children}
        </PlayerContext.Provider>
    )
}


