import HelloWorldButton from './components/hello-world-button/hello-world-button.js';
import Heading from './components/heading/heading.js';
// import addImage from './add-image.js';

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render(); 
const heading = new Heading();
heading.render();
const heading2 = new Heading();
heading2.render();
// addImage();

if (process.env.NODE_ENV === 'production') {
    console.log('production mode');
} else {
    console.log('development mode');
}

