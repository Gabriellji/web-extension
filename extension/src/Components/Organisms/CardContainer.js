import React, { useEffect, useContext } from 'react'
import { Context } from '../../Context/Context'
import Card from '../Molecules/Card'
import './CardContainer.css'

const CardGroup = () => {
    const context = useContext(Context)
    const addPicture = useEffect(() => {
        let images = []
        const saveImages = async () => {
            for (let i = 0; i < window.localStorage.length; i++) {
                images = [...images, JSON.parse(window.localStorage.getItem(i))]
            }
        }
        const saveToContext = async () => {
            context.browserPictures.length !== images.length &&
                context.setBrowserPictures(images)
        }
        saveImages().then(saveToContext())
    }, [context.browserPictures])
    const showEvent = (index) => {
        !context.picturesToSave.includes(context.browserPictures[index]) &&
            context.setPicturesToSave([
                ...context.picturesToSave,
                context.browserPictures[index],
            ])
    }
    return (
        <div className="cardcontainer">
            {context.browserPictures.length > 0 &&
                context.browserPictures.map((picture, index) => (
                    <Card
                        filename={picture.filename}
                        key={index}
                        index={index}
                        url={picture.src}
                        action={showEvent}
                    />
                ))}
        </div>
    )
}

export default CardGroup