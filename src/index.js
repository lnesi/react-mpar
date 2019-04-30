import ReactMPAR from './ReactMPAR';
//import TestComponent from './TestComponent';

const dictionary = {
    TestComponent: {
        classLoader:()=>import("./TestComponent"),
        name: "Test React Component",
        description: "This is a standalone react component can be either a single funcitonal component or a complete SPA",
        reduxEnabled: false,
        createState: false,
    },
};

const renderer=new ReactMPAR(".test_class_name",dictionary,document);

renderer.renderAll();
