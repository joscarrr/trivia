import kissAudio from '../../audio/kiss.mp3';
import niceAudio from '../../audio/nice.mp3';
import oijosukeAudio from '../../audio/oijosuke.mp3';
import sadAudio from '../../audio/sad.mp3';
import theWorldAudio from '../../audio/theworldsound.mp3';
import yayAudio from '../../audio/yay.mp3';
import oscarImage from '../../images/oscar.JPG';
import shoesukeImage from '../../images/shoesuke.webp';
import theWorldImage from '../../images/theworld.jpeg';
import metalPipeVideo from '../../videos/metalpipe.mp4';

export const questions = [
  {
    id: 'shoesuke',
    prompt: '¿Quién es él?',
    media: {
      type: 'image',
      src: shoesukeImage,
      alt: 'Shoeske',
    },
    correctAudio: oijosukeAudio,
    incorrectAudio: sadAudio,
    answers: [
      { id: 'a', type: 'text', content: 'Shoeske', correct: true },
      { id: 'b', type: 'text', content: 'Tilín', correct: false },
      { id: 'c', type: 'text', content: 'Netanyahu', correct: false },
    ],
  },
  {
    id: 'metalpipe',
    prompt: '¿Qué estamos escuchando?',
    media: {
      type: 'video',
      src: metalPipeVideo,
      label: 'Video para escuchar',
    },
    correctAudio: niceAudio,
    incorrectAudio: sadAudio,
    answers: [
      { id: 'a', type: 'text', content: 'Pluma de ganso súper ligera', correct: false },
      { id: 'b', type: 'text', content: 'Mozart', correct: false },
      {
        id: 'c',
        type: 'text',
        content: 'Tubo de acero galvanizado de 3/4',
        correct: true,
      },
    ],
  },
  {
    id: 'oscar',
    prompt: '¿Quién es este personaje?',
    media: {
      type: 'image',
      src: oscarImage,
      alt: 'Oscar',
    },
    correctAudio: yayAudio,
    incorrectAudio: sadAudio,
    answers: [
      { id: 'a', type: 'text', content: 'Brad Pitt', correct: false },
      { id: 'b', type: 'text', content: 'Oscar', correct: true },
      { id: 'c', type: 'text', content: 'Tom Cruise', correct: false },
    ],
  },
  {
    id: 'first-kiss',
    prompt: '¿Dónde fue nuestro primer beso?',
    correctEffect: {
      type: 'kiss',
      audio: kissAudio,
    },
    answers: [
      { id: 'a', type: 'text', content: 'China', correct: false },
      { id: 'b', type: 'text', content: 'Israel', correct: false },
      { id: 'c', type: 'text', content: 'Pista de hielo', correct: true },
    ],
  },
  {
    id: 'the-world',
    prompt: '¿Qué dice DIO en esta escena?',
    media: {
      type: 'image',
      src: theWorldImage,
      alt: 'DIO',
    },
    correctEffect: {
      type: 'timeStop',
      audio: theWorldAudio,
    },
    answers: [
      { id: 'a', type: 'text', content: 'Miau', correct: false },
      { id: 'b', type: 'text', content: 'ZA WARUDOOOO', correct: true },
      { id: 'c', type: 'text', content: 'OK 👍', correct: false },
    ],
  },
];
