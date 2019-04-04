# React MRR: React Multipage Application Renderer

The following library helps to approach server side rendered from traditional CMS to integrate with React.

## Demo usage
```
import ReactMPAR from 'react-mpar';

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

const renderer=new ReactMPAR(".test_class_name",dictionary,document);

renderer.renderAll();

```
