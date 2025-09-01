declare module '@paystack/inline-js' {
    interface PaystackOptions {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref?: string;
        reference?: string;
        callback?: (response: any) => void;
        onSuccess?: (response: any) => void;
        onClose?: () => void;
        metadata?: Record<string, any>;
        channels?: string[];
        plan?: string;
        quantity?: number;
        subaccount?: string;
        transaction_charge?: number;
        bearer?: string;
        [key: string]: any;
    }

    interface PaystackResponse {
        reference: string;
        status: string;
        trans: string;
        transaction: string;
        trxref: string;
    }

    export default class PaystackPop {
        constructor();
        newTransaction(options: PaystackOptions): void;
        static setup(options: PaystackOptions): {
            openIframe: () => void;
        };
    }
}