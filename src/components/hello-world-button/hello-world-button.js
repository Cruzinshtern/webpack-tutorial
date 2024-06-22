import './hello-world-button.css';

class HelloWorldButton {
    render() {
        const button = document.createElement('button');
        button.innerHTML = 'Hello World';
        button.classList.add('hello-world-button');
        button.onclick = function () {
            const p = document.createElement('p');
            p.innerHTML = 'Hello World';
            p.classList.add('hello-world-text');
            body.append(p);
        }
        const body = document.querySelector('body');
        body.append(button);
    }
}

export default HelloWorldButton;