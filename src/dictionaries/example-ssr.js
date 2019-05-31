import SyncTestComponent from '../components/SyncTestComponent';
import AsyncTestComponent from '../components/AsyncTestComponent';
export default  {
    AsyncTestComponent: {
        class:AsyncTestComponent,
        name: "Async Test React Component",
        description: "This is a standalone react component can be either a single funcitonal component or a complete SPA",
        reduxEnabled: false,
        createState: false,
    },
    SyncTestComponent: {
        class:SyncTestComponent,
        name: "Sync Test React Component",
        description: "This is a standalone react component can be either a single funcitonal component or a complete SPA",
        reduxEnabled: false,
        createState: false,
    },
};
