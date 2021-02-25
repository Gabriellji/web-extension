import { findAllByTitle } from '@testing-library/react'
import React, { useContext, useState, useEffect } from 'react'
import { Context } from './../../Context/Context'
import Input from '../Atoms/Input'
import Image from '../Atoms/Image'
import Text from '../Atoms/Text'

const CaptionForm = () => {
    const context = useContext(Context)
    const [images, setImages] = useState(context.picturesToSave)
    const [reload, setReload] = useState(false)
    const [userAlbum, setUserAlbum] = useState([])

    const fetchAlbums = async () => {
        fetch('http://localhost:4000/profiles/my_albums', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-auth-token': context.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setUserAlbum(data)
            })
    }

    useEffect(() => {
        setReload(false)
        fetchAlbums()
    }, [reload])
    return (
        <div className="h-4/5 w-5/6 flex flex-row flex-wrap  items-center justify-around overflow-x-auto">
            {images.map((image) => (
                <form
                    onChange={(e) => {
                        e.preventDefault()
                        e.target.id === 'filename'
                            ? (image.filename = e.target.value)
                            : e.target.id === 'caption'
                            ? (image.caption = e.target.value)
                            : (image.album = e.target.value)
                        context.setPicturesToSave(images)
                        setReload(true)
                    }}
                >
                    <div className="h-3/5 m-small flex flex-col flex-wrap items-center justify-around">
                        <Image
                            height="1/2"
                            width="auto"
                            borderRadius="small"
                            url={image.src}
                            filename={image.filename}
                        />
                        <div>
                            <div className="m-small">
                                <Text
                                    text="Title:"
                                    color="dark"
                                    fontWeight="normal"
                                    textSize="small"
                                />
                                <Input
                                    text="Title"
                                    textWeight="200"
                                    bgColor="light"
                                    width="52"
                                    height="8"
                                    border="2"
                                    borderColor="grey"
                                    borderRadius="small"
                                    type="text"
                                    id="filename"
                                    value={image.filename}
                                />
                            </div>
                            <div className="m-small">
                                <Text
                                    text="Caption:"
                                    color="dark"
                                    fontWeight="normal"
                                    textSize="small"
                                />
                                <Input
                                    text="Caption"
                                    textWeight="200"
                                    bgColor="light"
                                    width="52"
                                    height="8"
                                    border="2"
                                    borderColor="grey"
                                    borderRadius="small"
                                    type="text"
                                    id="caption"
                                    value={image.caption}
                                />
                            </div>
                            <div>
                                <select
                                    name="album"
                                    id="album"
                                    required
                                    className={`
                                font-main
                                font-normal
                                text-center
                                align-middle
                                bg-primary 
                                text-light
                                text-small 
                                w-36 
                                h-8 
                                rounded-small
                                hover:bg-grey
                                hover:text-primary
                                transition duration-500
                                focus:outline-none
                                active:outline-none
                            `}
                                >
                                    <option value="" selected disabled hidden>
                                        Choose album
                                    </option>
                                    {userAlbum.map((album, index) => (
                                        <option key={index} value={album._id}>
                                            {album.album_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
            ))}
        </div>
    )
}

export default CaptionForm
