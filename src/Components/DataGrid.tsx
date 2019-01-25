import * as React from 'react';
import {
    DetailsList,
    DetailsListLayoutMode,
    IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { IProducts } from '../../model/common_models';
import { IconButton } from 'office-ui-fabric-react';

let columnDefs: any;
let id: any;

interface IMyCompomentState {
    products: IProducts[];
    columns: any[];
}

interface IMyCompomentProps {
    product: IProducts[];
}

export class DataGrid extends React.Component<IMyCompomentProps, IMyCompomentState>
{
    constructor(props: IMyCompomentProps) {
        super(props);
        this.state = {
            products: [],
            columns: [],
        };
    }

    public generateColumns(data: any[]) {
        let columnDefinitions: any = [];
        id = -1;
        data.map(object => {
            Object
                .keys(object)
                .map(value => {
                    const mappedColumn = {
                        name: value,
                        key: value,
                        fieldName: value,
                        isResizable: true,
                        ariaLabel: 'Operations for value'
                    }
                    columnDefinitions.push(mappedColumn);
                })
        })
        // Remove duplicate columnsb
        columnDefinitions = columnDefinitions.filter((column: any, index: any, self: any) =>
            index === self.findIndex((colAtIndex: any) => (
                colAtIndex.key === column.key
            ))
        )
        return columnDefinitions;
    }


    public render() {
        columnDefs = this.generateColumns(this.props.product);
        return (
            <div>
                <DetailsList
                    items={this.props.product}
                    columns={columnDefs}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    onItemInvoked={this._onItemInvoked}
                    onRenderItemColumn={this.onRenderItemColumn}
                />
            </div>
        );
    }

    public _onItemInvoked(item: any): void {
        alert(`Doppelklick: ${item.ProductID}`);
    }

    public delteProduct = (item: any) => {
        alert(`Delete: ${item.ID}`);
    }

    public onRenderItemColumn = (item: any, index: number, column: IColumn): JSX.Element => {
        if (column.fieldName === 'Delete') {
            return <IconButton onClick={this.delteProduct} iconProps={{ iconName: 'Delete' }}>Delete</IconButton>;
        }
        if (column.fieldName === 'Edit') {
            return <IconButton iconProps={{ iconName: 'Edit' }}>Delete</IconButton>;
        }
        if (column.fieldName === 'ID') {
            id++;
            return <div> {id} </div>;
        }
        return item[column.fieldName!];
    }

}

export default DataGrid;