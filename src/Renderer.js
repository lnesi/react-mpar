
import { Base64 } from "js-base64";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

export default class {
    constructor(classSelector, dictonary, document) {
        this.classSelector = classSelector;
        this.dictonary = dictonary;
        this.document = document;
        this.document.reactReduxMPA = this;
    }

    createState(preloadedState) {
        var state = preloadedState;
        _.each(this.document.querySelectorAll(this.classSelector), wrapper => {
            let definition = this.dictonary[wrapper.dataset.component];
            if (definition) {
                if (definition.reduxEnabled && definition.createState) {
                    let initialState = {};
                    initialState = JSON.parse(
                        Base64.decode(wrapper.dataset.state)
                    );
                    if (!state[wrapper.dataset.component])
                        state[wrapper.dataset.component] = {};
                    state[wrapper.dataset.component][wrapper.id] = initialState;
                }
            } else {
                throwError(
                    "Invalid component. Could not find '" +
                        wrapper.dataset.component +
                        "' in dictionary."
                );
            }
        });
        return state;
    }

    /* To be implemented when we need to dispatch redux updates */
    getStateBy(id) {
        let wrapper = this.getWrapperById(id);
        if (wrapper) {
            let stateEntry = {};
            stateEntry = JSON.parse(Base64.decode(wrapper.dataset.state));
            return stateEntry;
        }
    }

    unmount(id) {
        if (this.document.getElementById(id))
            ReactDOM.unmountComponentAtNode(this.document.getElementById(id));
    }

    unmountAll() {
        _.each(this.document.querySelectorAll(this.classSelector), wrapper => {
            ReactDOM.unmountComponentAtNode(wrapper);
        });
    }

    getWrapperById(id) {
        let wrapper = this.document.getElementById(id);

        if (wrapper) {
            return wrapper;
        } else {
            throwError(
                "Invalid wrapper ID. Could not find '" + id + "' in DOM."
            );
            return null;
        }
    }

    mount(id, callback = () => {}) {
        let wrapper = this.getWrapperById(id);
        if (wrapper) {
            let definition = this.dictonary[wrapper.dataset.component];
            if (definition) {
                let props = {};
                if (wrapper.dataset.props) {
                    props = JSON.parse(Base64.decode(wrapper.dataset.props));
                }

                this.render(definition, wrapper, props, callback);
            } else {
                throwError(
                    "Invalid component. Could not find '" +
                        wrapper.dataset.component
                );
            }
        }
    }

    render(definition, wrapper, props = {}, callback = () => {}) {
        const Component = definition.class;
        console.log("Rendering", wrapper.id);
        if (definition.reduxEnabled) {
            ReactDOM.render(
                <Provider store={this.store}>
                    <Component id={wrapper.id} {...props} />
                </Provider>,
                wrapper,
                callback
            );
        } else {
            ReactDOM.render(
                <React.Fragment>
                    <Component id={wrapper.id} {...props} />
                </React.Fragment>,
                wrapper,
                callback
            );
        }
    }

    renderAll() {
        if(this.store){
            this.store.dispatch({ type: "REACT_REDUX_MPA_RENDER_ALL_START" });
        }
        document.dispatchEvent(new Event("REACT_REDUX_MPA_RENDER_ALL_START"));
        console.time("React/Redux MPA Render Start");
        console.log("React/Redux MPA Render Start");
        if (this.document.querySelectorAll(this.classSelector).length > 0){
            this.renderStep(0);
        }else{
            this.finishRender();
        }
    }
    finishRender() {
        if(this.store){
            this.store.dispatch({ type: "REACT_REDUX_MPA_RENDER_ALL_END" });
        }
        document.dispatchEvent(new Event("REACT_REDUX_MPA_RENDER_ALL_END"));
        console.time("React/Redux MPA Render End");
        console.log("React/Redux MPA Render End");
    }
    renderStep(index = 0) {
        const element = this.document.querySelectorAll(this.classSelector)[
            index
        ];

        this.mount(element.id, () => {
            if (
                index <
                this.document.querySelectorAll(this.classSelector).length - 1
            ) {
                this.renderStep(index + 1);
            } else {
                this.finishRender();
            }
        });
    }
    setStore(store) {
        this.store = store;
        this.store.dispatch({ type: "REACT_REDUX_MPA_RENDER_SET_STORE" });
    }

    resetById(id) {
        this.unmount(id);
        this.mount(id);
    }
}

function throwError(message) {
    try {
        console.error(
            "%c  React/Redux MPA Renderer ",
            "background: #0483d8; color: #fff",
            message
        );
    } catch (e) {
        throw Error(message);
    }
}
