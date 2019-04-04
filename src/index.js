import ReactReduxRenderer from './Renderer';
import TestComponent from './TestComponent';

const dictionary = {
    TestComponent: {
        class: TestComponent,
        name: "Test React Component",
        description: "This is a standalone react component can be either a single funcitonal component or a complete SPA",
        reduxEnabled: false,
        createState: false,
    },
};



const renderer=new ReactReduxRenderer(".test_class_name",dictionary,document);

renderer.renderAll();
