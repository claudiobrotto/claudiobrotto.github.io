module myportfolio {
    export interface IStock {
        isin: string;
        name: string;
        [index: string]: any;
    }

    export interface IDividend {
        ISIN: string;
        Date: string;
        Amount: number;
    }

    export interface IQuotation {
        isin: string;
        date: Date;
        price: number;
    }

    export interface IUser {
        key: string;
        name: string;
        picture: string;
        accessToken: string;
    }
    
    export interface IConfiguration {
        list: {
            columns: {
                names: { [index: string]: string };
                visibility: string[];
                typeIsNumber: string[];
                filterable: string[];
                sortOrder: string[];
            }
        };
    }

    export interface ICartServiceState {
        carts: ICart[];
        currentCart: ICart;
    }

    export interface ICart {
        key: string;
        name: string;
        items: IStock[];
    }

    export interface ICartState {
        key: string;
        name: string;
        items: string[];
    }

}