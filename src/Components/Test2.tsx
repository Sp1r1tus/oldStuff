import * as React from 'react';
import { IProducts } from '../../model/common_models';
import DataGrid from '../Components/DataGrid';
import { DefaultButton, Fabric } from 'office-ui-fabric-react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib-commonjs/MessageBar'
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

interface IMyCompomentState {
    products: IProducts[];
    showMessageBar: boolean;
}

interface IMyCompomentProps {
    data?: any;
}

export class Test2 extends React.Component<IMyCompomentProps, IMyCompomentState> {
    private Id: any;
    private Descr: any;
    constructor(props: IMyCompomentProps) {
        super(props);
        this.Id = React.createRef()
        this.Descr = React.createRef()
        this.state = {
            products: [],
            showMessageBar: false
        };
    }

    public componentDidMount() {
        this.getProducts();
    }
    public getProducts = () => {
        fetch('http://localhost:4000/sqlRequests')
            .then(response => response.json())
            //  .then(response => {
            //    console.log(response)
            //    return response.json();
            //  })
            // .then(response => {
            //    console.log(response)
            //    console.log(response.data.recordset)
            // })
            .then(response => this.setState({ products: response.data.recordset }))
            .catch(err => console.error(err))
    };



    public handleSubmit = () => {
        if (this.Id.current.value === "") {
            this.setState({ showMessageBar: true })
            setTimeout(() => {
                this.setState({ showMessageBar: false })
            }
                , 3000);
        } else {
            fetch('http://localhost:4000/sqlRequests', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tID: this.Id.current.value,
                    Descr: this.Descr.current.value,
                })
            })
            this.setState({
                products: [...this.state.products, { ID: this.Id.current.value, Descr: this.Descr.current.value }]
            });
            console.log(this.state.products);

        }
    }

    public render() {
        return (
            <div>
                <div>
                    {this.state.showMessageBar && <MessageBar
                        messageBarType={MessageBarType.error}
                        isMultiline={false}
                        dismissButtonAriaLabel="Close"
                    >
                        Es wurden nicht alle Textfelder befüllt!
                    </MessageBar>}
                </div>

                <DataGrid product={this.state.products} />
                <h2> Produkt Page</h2>
                {this.state.products ?
                    this.state.products.map((item) =>
                        <div key={item.ID}>
                            {item.Descr} </div>
                    )
                    :
                    <h3> Wait... data is fetching </h3>
                }
                <Fabric>
                    <DefaultButton onClick={this.handleSubmit} >
                        post DATA to SQL
                    </DefaultButton>
                    <input type="text" ref={this.Id} />

                    <input type="text" ref={this.Descr} />

                </Fabric>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-lg12">
                        <div className="excel">
                            <FilePond
                                allowMultiple={false}
                                name="Excel"
                                server="http://localhost:4000/Excel"
                            />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Test2;