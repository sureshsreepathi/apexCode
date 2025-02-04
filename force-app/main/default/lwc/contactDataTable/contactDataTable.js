import { LightningElement,api,track,wire } from 'lwc';
import getContactRecords from '@salesforce/apex/getAccountRelatedContactRecords.getContactRecords';
import createContact from '@salesforce/apex/getAccountRelatedContactRecords.createContact';
import deleteContact from '@salesforce/apex/getAccountRelatedContactRecords.deleteContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactDataTable extends LightningElement {
    @api recordId;
    @track contacts = [];
    @track error;
    @track isAddModalOpen = false;
    @track firstName = '';
    @track lastName = '';
    @track email = '';
    @track isConfirmationModalOpen = false;
    @track isDeleteDisabled = true;
    @track selectRecords = [];
    @track displayedContacts = [];
    @track currentPage = 1;
    @track pageSize = 5; // Number of records per page
    @track totalPages = 1;
    columns = [
        {
            label:"First Name", fieldName:"FirstName", type : "text"
        },
        {
            label:"Last Name", fieldName:"LastName", type : "text"
        },
        {
            label:"Email", fieldName:"Email", type : "email"
        }
    ];

    @wire(getContactRecords,{accountId : '$recordId'})
    loadContact({data,error}){
        console.log('RRR data ',data);
        if(data){
            this.contacts = data;
            this.totalPages = Math.ceil(this.contacts.length / this.pageSize);
            this.updateDisplayedContacts();
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = [];
            this.showToast('Error', 'Error fetching contacts', 'error');
        }
             
    }   
    updateDisplayedContacts() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.displayedContacts = this.contacts.slice(start, end);
    }
    handleNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updateDisplayedContacts();
        }
    }
 
    handlePrevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateDisplayedContacts();
        }
    }

    get isPrevDisabled() {
        return this.currentPage <= 1;
    }

    get isNextDisabled() {
        return this.currentPage >= this.totalPages;
    }

    createContactHandler(){
        this.isAddModalOpen = true;
    }


    closeAddModal() {
        this.isAddModalOpen = false;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
    }

    handleInputChange(event){
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    saveContact(){
        const newContact = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            AccountId: this.recordId
        };
        console.log('fields:'+newContact);
        createContact({ newContact })
            .then((contactRecord) => {
                    this.contacts = [...this.contacts,contactRecord];
                    this.totalPages = Math.ceil(this.contacts.length / this.pageSize);
                this.updateDisplayedContacts();
                this.showToast('Success', 'Contact added successfully', 'success');
                this.closeAddModal();
                // this.loadContacts();
                // this.loadContactCount();
            })
            .catch((error) => {
                this.showToast('Please Fill fields', error.body.message, 'error');
            });
    }



    handleCheckboxChange(event){
        const selectedRows = event.detail.selectedRows;
        this.selectRecords = selectedRows;
        this.isDeleteDisabled = this.selectRecords.length === 0;
    }
    deleteHandler(){
        if(this.selectRecords.length > 0){
            this.isConfirmationModalOpen = true;
        }else {
            this.showToast('Warning', 'Please select at least one contact to delete.', 'warning');
        }
    }
    closeConfirmationModal(){
        this.isConfirmationModalOpen = false;
    }
    deleteRecord(){
        const contactIds = this.selectRecords.map((contact) => contact.Id);
        Promise.all(contactIds.map((id) => deleteContact({ contactId: id })))
            .then(() => {
                this.contacts = this.contacts.filter(contact => !contactIds.includes(contact.Id));
                this.totalPages = Math.ceil(this.contacts.length / this.pageSize);
                this.updateDisplayedContacts();
                this.showToast('Success', 'Selected contacts deleted successfully', 'success');
                this.closeConfirmationModal();
                this.selectRecords = [];
            })
            .catch((error) => {
                this.showToast('Error', error.body.message, 'error');
            });
    }
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}