// 创建 app 节点
const dom = document.createElement('div');

dom.id = 'app';

document.querySelector('#root').append(dom);

// 给app节点创建 文本节点
const text = document.createTextNode('Hello World1');

dom.append(text);

document.querySelector('#root').append(document.createElement('hr'))

// v2 变量

const el = {
    type: 'div',
    props: {
        id: 'app',
        children: [

        ]
    }
}

const textEl = {
    type: 'TEXT_ELEMENT',
    props: {
        nodeValue: 'Hello World2'
    }
}

const dom_v2 = document.createElement(el.type);

dom_v2.id = el.props.id;

document.querySelector('#root').append(dom_v2);

// 给app节点创建 文本节点
const text_v2 = document.createTextNode(textEl.props.nodeValue);

dom_v2.append(text_v2);

document.querySelector('#root').append(document.createElement('hr'))


// v3 函数式

function createTextNode(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text
        }
    }
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => typeof child === 'object' ? child : createTextNode(child))
        }
    }
}

const textEl_v3 = createTextNode('Hello World3');

const App = createElement('div', { id: 'app' }, textEl_v3);

const dom_v3 = document.createElement(App.type);

dom_v3.id = App.props.id;

document.querySelector('#root').append(dom_v3);

// 给app节点创建 文本节点
const text_v3 = document.createTextNode(textEl_v3.props.nodeValue);

dom_v3.append(text_v3);

document.querySelector('#root').append(document.createElement('hr'))

// v4 函数式再封装

function render(el, container) {
    const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type);

    Object.keys(el.props).filter(key => key !== 'children').forEach(key => dom[key] = el.props[key]);


    if (el.props.children) {
        el.props.children.forEach(child => render(child, dom));
    }

    container.append(dom);
}

const App_v4 = createElement('div', { id: 'app' }, 'Hello World4', 'v4');

render(App_v4, document.querySelector('#root'));

document.querySelector('#root').append(document.createElement('hr'))


// v5 函数式重构

const ReactDom = {
    createToot(container) {
        return {
            render(el) {
                render(el, container);
            }
        }
    }
}

ReactDom.createToot(document.querySelector('#root')).render(createElement('div', { id: 'app' }, 'Hello World5', 'v5'));