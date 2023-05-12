import React from 'react'
import Card from './Card';

import image1 from "../assets/Image1.jpg";
import image2 from '../assets/Image2.jpg'
import image3 from '../assets/Image3.png'
import image4 from '../assets/Image4.jpg'
import image5 from '../assets/Image5.jpg'
import image6 from '../assets/Image6.jpg'

const cards=[
    {
        id: 1,
        title: "LMAD",
        text: 'Canal de LMAD',
        image: image1,
        url: "https://www.fcfm.uanl.mx/licenciatura/multimedia-y-animacion-digital",
    },
    {
        id: 2,
        title: "LCC",
        text: 'Canal de LCC',
        image: image6,
        url: "https://www.fcfm.uanl.mx/licenciatura/ciencias-computacionales",
    },
    {
        id: 3,
        title: "LSTI",
        text: 'Canal de LSTI',
        image: image3,
        url: "https://www.fcfm.uanl.mx/licenciatura/seguridad-en-tecnologias-de-informacion",
    },
    {
        id: 4,
        title: "Actuaria",
        text: 'Canal de Acturia',
        image: image4,
        url: "https://www.fcfm.uanl.mx/licenciatura/actuaria",
    },
    {
        id: 5,
        title: "Matematicas",
        text: 'Canal de Matematicas',
        image: image2,
        url: "https://www.fcfm.uanl.mx/licenciatura/matematicas",
    },
    {
        id: 6,
        title: "Fisica",
        text: 'Canal de Fisica',
        image: image5,
        url: "https://www.fcfm.uanl.mx/licenciatura/fisica",
    },
]

function Cards() {
  return (
    <div className="container d-flex justify-content-center align align-items-center h-100">
        <div className="row">
            {
                cards.map((card)=>(
                    <div className="col-md-4" key={card.id}>
                 <Card title={card.title} imageSource={card.image} url={card.url} text={card.text}/>
            </div>
                ))
            }
        </div>
    </div>
  )
}

export default Cards