import { LightningElement,api } from 'lwc';

export default class TestrecordId extends LightningElement {
    @api recordId;
    connectedCallback(){
        console.log('RRRR recordId ',this.recordId);
    }
    renderedCallback(){
        console.log('RRRR render ',this.recordId);
    }
}