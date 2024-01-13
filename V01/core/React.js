
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


function render(el, container) {
    const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type);

    Object.keys(el.props).filter(key => key !== 'children').forEach(key => dom[key] = el.props[key]);


    if (el.props.children) {
        el.props.children.forEach(child => render(child, dom));
    }

    container.append(dom);
}

const React = {
    createElement,
    render
}

export default React;