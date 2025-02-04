// 
//  ****************************************************************************************************
// @Name  of the Lwc   : accountOpportunityRecordsDisplay.js
// @Description        : component used to fetch Account Records
// @Author             : Suresh
// @Created Date       : 30/1/2025 
// *****************************************************************************************************
// 

import { LightningElement,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAccounts from '@salesforce/apex/accountRelatedOpportunityModal.accountRecordsToDisplay';
 
export default class AccountOpportunityRecordsDisplay extends NavigationMixin(LightningElement) {
    @track accounts = [];
    @track error;
    @track displayedAccounts = [];
    @track currentPage = 1;
    @track pageSize = 5; // Number of records per page
    @track totalPages = 1;

    connectedCallback() {
        this.loadAccounts();
    }

    loadAccounts() {
        getAccounts() // Imperative Call
            .then(result => {
                this.accounts = result;
                this.totalPages = Math.ceil(this.accounts.length / this.pageSize);
                this.updateDisplayedContacts();
                this.error = undefined;
                console.log('Fetched Accounts:', this.accounts);
            })
            .catch(error => {
                this.error = error;
                this.accounts = [];
                this.showToast('Error', 'Error fetching accounts', 'error');
                console.error('Error:', error);
            });
    }
 

    handleViewOpportunities(event) {
        const accountId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'OpportunityDisplay'  // page name
            },
                state: {
                    c__recordId: accountId
            }
        });
    }

    // Navigate to "/relatedopportunities?c__recordId=..."
    // handleViewOpportunities(event) {
    //     const accountId = event.currentTarget.dataset.id;
 
    // // Define PageReference
    // const pageRef = {
    //     type: 'standard__webPage',
    //     attributes: {
    //         url: `/opportunitydisplay?c__recordId=${accountId}` // Correct URL format
    //     }
    // };
 
    // // Navigate using NavigationMixin
    // this[NavigationMixin.Navigate](pageRef);
    // }

    updateDisplayedContacts() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.displayedAccounts = this.accounts.slice(start, end);
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
}
 
//  @wire(getAccounts)
// wiredAccounts({ error, data }) {
//     if (data) {
//         this.accounts = data;
//         this.error = undefined;
//     } else if (error) {
//         this.error = error;
//         this.accounts = [];
//     }
// }